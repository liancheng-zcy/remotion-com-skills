// TypewriterText - 打字机文字组件
// 逐字显示文字，模拟有人在输入的效果

import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface TypewriterTextProps {
  text: string;
  speed?: number; // 每帧显示的字符数，默认 2（即每2帧一个字符）
  cursorBlinkSpeed?: number; // 光标闪烁速度（帧）
  showCursor?: boolean;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  startDelay?: number;
  lineHeight?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 2,
  cursorBlinkSpeed = 15,
  showCursor = true,
  fontSize = SIZES.h3,
  color = COLORS.text,
  fontFamily = FONTS.display,
  startDelay = 0,
  lineHeight = 1.6,
  maxWidth = 1000,
  align = 'left',
}) => {
  const frame = useCurrentFrame();

  const itemFrame = Math.max(0, frame - startDelay);

  // 计算应该显示的字符数
  const charsToShow = Math.min(
    Math.floor(itemFrame / speed),
    text.length
  );

  const displayedText = text.slice(0, charsToShow);

  // 光标闪烁
  const cursorOpacity = showCursor
    ? interpolate(
        (frame % cursorBlinkSpeed) / cursorBlinkSpeed,
        [0, 0.5, 1],
        [1, 0, 1]
      )
    : 0;

  // 整体入场
  const containerOpacity = interpolate(itemFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize: fontSize,
        fontFamily: fontFamily,
        color: color,
        lineHeight: lineHeight,
        maxWidth: maxWidth,
        textAlign: align,
        opacity: containerOpacity,
        wordBreak: 'break-word',
      }}
    >
      {displayedText}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: 3,
            height: fontSize * 0.8,
            backgroundColor: COLORS.primary,
            marginLeft: 4,
            verticalAlign: 'middle',
            opacity: cursorOpacity,
          }}
        />
      )}
    </div>
  );
};

// 带背景容器的打字机组件
interface TypewriterSceneProps {
  text: string;
  title?: string;
  subtitle?: string;
  speed?: number;
  startDelay?: number;
}

export const TypewriterScene: React.FC<TypewriterSceneProps> = ({
  text,
  title,
  subtitle,
  speed = 2,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();

  const itemFrame = Math.max(0, frame - startDelay);

  // 标题入场
  const titleOpacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(itemFrame, [0, 15], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 副标题入场
  const subtitleOpacity = interpolate(itemFrame - 8, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${SIZES.spacing.xxxl}px ${SIZES.spacing.xxxl * 2}px`,
      }}
    >
      {/* 标题 */}
      {title && (
        <div
          style={{
            fontSize: SIZES.h2,
            fontFamily: FONTS.display,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: subtitle ? SIZES.spacing.xs : SIZES.spacing.xl,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </div>
      )}

      {/* 副标题 */}
      {subtitle && (
        <div
          style={{
            fontSize: SIZES.h4,
            fontFamily: FONTS.text,
            color: COLORS.textSecondary,
            marginBottom: SIZES.spacing.xl,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* 打字机文字 */}
      <TypewriterText
        text={text}
        speed={speed}
        fontSize={SIZES.h2}
        maxWidth={1400}
        startDelay={startDelay + (title ? 20 : 0)}
      />
    </AbsoluteFill>
  );
};

// 多行打字机 - 支持多段文字依次显示
interface MultiLineTypewriterProps {
  lines: Array<{
    text: string;
    color?: string;
    fontSize?: number;
    indent?: boolean;
  }>;
  speed?: number;
  lineDelay?: number; // 行间延迟
  startDelay?: number;
}

export const MultiLineTypewriter: React.FC<MultiLineTypewriterProps> = ({
  lines,
  speed = 2,
  lineDelay = 30,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${SIZES.spacing.xxxl}px ${SIZES.spacing.xxxl * 2}px`,
      }}
    >
      <div style={{ maxWidth: 1400, width: '100%' }}>
        {lines.map((line, index) => {
          const lineStartFrame = startDelay + index * lineDelay;
          const lineItemFrame = Math.max(0, frame - lineStartFrame);

          // 计算该行应该显示的字符数
          const charsToShow = Math.min(
            Math.floor(lineItemFrame / speed),
            line.text.length
          );

          const displayedText = line.text.slice(0, charsToShow);
          const isLastLine = index === lines.length - 1;
          const isLineComplete = charsToShow >= line.text.length;
          const showCursor = isLastLine || !isLineComplete;

          // 光标闪烁
          const cursorOpacity = showCursor
            ? interpolate(
                (frame % 15) / 15,
                [0, 0.5, 1],
                [1, 0, 1]
              )
            : 0;

          return (
            <div
              key={index}
              style={{
                fontSize: line.fontSize || SIZES.h2,
                fontFamily: FONTS.text,
                color: line.color || COLORS.text,
                lineHeight: 1.6,
                marginLeft: line.indent ? SIZES.spacing.xl : 0,
                marginBottom: SIZES.spacing.lg,
              }}
            >
              {displayedText}
              <span
                style={{
                  display: 'inline-block',
                  width: 4,
                  height: (line.fontSize || SIZES.h2) * 0.75,
                  backgroundColor: COLORS.primary,
                  marginLeft: 6,
                  verticalAlign: 'middle',
                  opacity: cursorOpacity,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
