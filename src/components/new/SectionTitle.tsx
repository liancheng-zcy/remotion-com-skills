// SectionTitle - 章节标题组件
// 用于视频分段，简洁有力

import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface SectionTitleProps {
  title: string;
  sectionNumber?: number;  // 章节序号，如 "01"
  description?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  sectionNumber,
  description,
}) => {
  const frame = useCurrentFrame();

  // 序号动画
  const numberProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  // 标题从左滑入
  const titleX = interpolate(frame, [8, 28], [-60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 描述淡入
  const descOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 指示条
  const barScale = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 200,
        paddingRight: 200,
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 400,
          fontWeight: 700,
          color: COLORS.backgroundElevated,
          fontFamily: FONTS.display,
          opacity: 0.5,
          lineHeight: 1,
        }}
      >
        {sectionNumber?.toString().padStart(2, '0')}
      </div>

      {/* 左侧指示条 */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: '50%',
          width: 4,
          height: 120,
          backgroundColor: COLORS.primary,
          transform: `translateY(-50%) scaleY(${barScale})`,
          borderRadius: 2,
        }}
      />

      {/* 内容区 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* 序号 */}
        {sectionNumber && (
          <div
            style={{
              fontSize: SIZES.h4,
              color: COLORS.primary,
              fontFamily: FONTS.mono,
              fontWeight: 500,
              marginBottom: SIZES.spacing.sm,
              opacity: numberProgress,
              transform: `translateX(${(1 - numberProgress) * -20}px)`,
              letterSpacing: '2px',
            }}
          >
            {String(sectionNumber).padStart(2, '0')}
          </div>
        )}

        {/* 标题 */}
        <h2
          style={{
            fontSize: SIZES.h1,
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: FONTS.display,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
            marginBottom: description ? SIZES.spacing.md : 0,
          }}
        >
          {title}
        </h2>

        {/* 描述 */}
        {description && (
          <p
            style={{
              fontSize: SIZES.h4,
              color: COLORS.textSecondary,
              fontFamily: FONTS.text,
              lineHeight: 1.6,
              maxWidth: 800,
              opacity: descOpacity,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* 底部进度指示 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 120,
          right: 120,
          height: 2,
          backgroundColor: COLORS.backgroundElevated,
          borderRadius: 1,
        }}
      >
        <div
          style={{
            width: '20%',
            height: '100%',
            backgroundColor: COLORS.primary,
            borderRadius: 1,
            opacity: interpolate(frame, [30, 50], [0, 1], {
              extrapolateLeft: 'clamp',
            }),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
