// HeroTitle - 大标题开场组件（优化版，去除 AI 感）
// Apple 风格设计，更自然有机的动画

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface HeroTitleProps {
  title: string;
  subtitle?: string;
  tags?: string[];
  titleDelay?: number;
  subtitleDelay?: number;
  tagsDelay?: number;
}

// 有机的缓动函数（去除机械感）
const organicEasing = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const smoothEasing = Easing.bezier(0.4, 0, 0.2, 1);

export const HeroTitle: React.FC<HeroTitleProps> = ({
  title,
  subtitle,
  tags = [],
  titleDelay = 5,
  subtitleDelay = 25,
  tagsDelay = 45,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // 标题整体入场（更自然的弹性）
  const titleSpring = spring({
    frame: frame - titleDelay,
    fps,
    config: { damping: 28, stiffness: 90, mass: 1.2 }, // 更重的质感
  });

  // 标题透明度
  const titleOpacity = interpolate(frame - titleDelay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: smoothEasing,
  });

  // 副标题入场
  const subtitleSpring = spring({
    frame: frame - subtitleDelay,
    fps,
    config: { damping: 35, stiffness: 100 }, // 更平滑
  });

  const subtitleOpacity = interpolate(frame - subtitleDelay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 装饰线条（有机的宽度展开）
  const lineProgress = interpolate(frame - subtitleDelay - 5, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: organicEasing,
  });
  const lineWidth = lineProgress * 100;

  // 更自然的光晕效果（多层+呼吸感）
  const glowBreath = interpolate(frame, [0, 60, 120], [0, 1, 0.6], {
    extrapolateRight: 'clamp',
  });
  const glowX = interpolate(frame - titleDelay, [0, 90], [-100, width + 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // 标签入场（错开+有机延迟）
  const getTagAnimation = (index: number) => {
    const baseDelay = tagsDelay + index * 10; // 10帧间隔，更自然
    const tagProgress = interpolate(frame - baseDelay, [0, 18], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: organicEasing,
    });
    return {
      opacity: tagProgress,
      y: interpolate(frame - baseDelay, [0, 18], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
      scale: interpolate(frame - baseDelay, [0, 18], [0.9, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.back(1.2)),
      }),
    };
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.spacing.xxxl,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景质感层 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 50% 40%, ${COLORS.backgroundElevated}40 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 50% 60%, ${COLORS.primary}08 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* 光晕效果（更柔和自然） */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: glowX,
          width: 400,
          height: 200,
          background: `radial-gradient(ellipse, ${COLORS.primary}${Math.floor(glowBreath * 30).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 顶部装饰线（细线） */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: 1,
          height: interpolate(titleSpring, [0, 1], [0, 60]),
          background: `linear-gradient(to bottom, ${COLORS.primary}, transparent)`,
          transform: 'translateX(-50%)',
          opacity: titleOpacity,
        }}
      />

      {/* 主标题 */}
      <h1
        style={{
          fontSize: SIZES.hero,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: 'center',
          letterSpacing: '-2px', // 更紧凑，更有设计感
          lineHeight: 1.1,
          marginBottom: subtitle ? SIZES.spacing.lg : 0,
          fontFamily: FONTS.display,
          opacity: titleOpacity,
          transform: `scale(${0.92 + titleSpring * 0.08}) translateY(${(1 - titleSpring) * 30}px)`,
          textShadow: '0 0 80px rgba(0, 122, 255, 0.15)',
        }}
      >
        {title}
      </h1>

      {/* 副标题 */}
      {subtitle && (
        <>
          <p
            style={{
              fontSize: SIZES.h2,
              color: COLORS.primary,
              textAlign: 'center',
              letterSpacing: '2px',
              fontFamily: FONTS.text,
              fontWeight: 400,
              opacity: subtitleOpacity,
              transform: `translateY(${(1 - subtitleSpring) * 15}px)`,
              marginBottom: SIZES.spacing.md,
            }}
          >
            {subtitle}
          </p>

          {/* 装饰线条（更精致） */}
          <div
            style={{
              width: lineWidth,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
              marginTop: SIZES.spacing.md,
              marginBottom: SIZES.spacing.xl,
              opacity: subtitleOpacity * lineProgress,
            }}
          />
        </>
      )}

      {/* 标签组（更宽松的布局） */}
      {tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: SIZES.spacing.md,
            marginTop: SIZES.spacing.lg,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {tags.map((tag, index) => {
            const anim = getTagAnimation(index);
            return (
              <div
                key={index}
                style={{
                  padding: `${SIZES.spacing.sm}px ${SIZES.spacing.lg}px`,
                  backgroundColor: `${COLORS.backgroundElevated}80`,
                  borderRadius: SIZES.radius.xl,
                  color: COLORS.textSecondary,
                  fontSize: SIZES.body,
                  fontFamily: FONTS.text,
                  border: `1px solid ${COLORS.backgroundSecondary}`,
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {tag}
              </div>
            );
          })}
        </div>
      )}

      {/* 底部装饰 */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
          opacity: interpolate(frame - tagsDelay - tags.length * 10, [0, 20], [0, 1], {
            extrapolateLeft: 'clamp',
          }),
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: COLORS.textSecondary,
              opacity: 0.4 + i * 0.2,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
