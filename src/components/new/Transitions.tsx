// Transitions - 转场效果组件
// 提供专业的场景切换动画

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS } from '../../design-system/tokens';

interface TransitionOverlayProps {
  children: React.ReactNode;
}

// 淡入淡出转场
export const FadeTransition: React.FC<TransitionOverlayProps & { duration?: number }> = ({
  children,
  duration = 20,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 入场
  const enterProgress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // 出场
  const exitProgress = interpolate(
    frame,
    [durationInFrames - duration, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.quad),
    }
  );

  const opacity = Math.min(enterProgress, exitProgress);

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: COLORS.background,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 滑动转场
interface SlideTransitionProps extends TransitionOverlayProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  direction = 'right',
  duration = 25,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // 入场
  const getEnterOffset = () => {
    const progress = interpolate(frame, [0, duration], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });
    switch (direction) {
      case 'left': return { x: width * progress, y: 0 };
      case 'right': return { x: -width * progress, y: 0 };
      case 'up': return { x: 0, y: height * progress };
      case 'down': return { x: 0, y: -height * progress };
    }
  };

  // 出场
  const getExitOffset = () => {
    const progress = interpolate(frame, [durationInFrames - duration, durationInFrames], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.cubic),
    });
    switch (direction) {
      case 'left': return { x: -width * progress, y: 0 };
      case 'right': return { x: width * progress, y: 0 };
      case 'up': return { x: 0, y: -height * progress };
      case 'down': return { x: 0, y: height * progress };
    }
  };

  const enter = getEnterOffset();
  const exit = getExitOffset();

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${enter.x + exit.x}px, ${enter.y + exit.y}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 光晕扫过效果（影视飓风风格）
export const LightSweep: React.FC<{ duration?: number; height?: number }> = ({ duration = 30, height = 1080 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const progress = interpolate(frame, [0, duration], [-0.3, 1.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  const x = progress * width;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          height: height,
          left: x - 200,
          width: 400,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), ${COLORS.primary}30, rgba(255,255,255,0.1), transparent)`,
          transform: 'skewX(-20deg)',
        }}
      />
    </AbsoluteFill>
  );
};

// 缩放模糊转场
export const ZoomBlurTransition: React.FC<TransitionOverlayProps & { duration?: number }> = ({
  children,
  duration = 20,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 入场：从大到小
  const enterScale = interpolate(frame, [0, duration], [1.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // 出场：从小到大+淡出
  const exitScale = interpolate(
    frame,
    [durationInFrames - duration, durationInFrames],
    [1, 1.15],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - duration, durationInFrames - 5],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = frame > durationInFrames - duration ? exitOpacity : 1;
  const scale = frame > durationInFrames - duration ? exitScale : enterScale;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        opacity,
        backgroundColor: COLORS.background,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 幕布拉开效果
export const CurtainReveal: React.FC<TransitionOverlayProps & { duration?: number }> = ({
  children,
  duration = 25,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  const curtainWidth = (width / 2) * (1 - progress);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {children}

      {/* 左侧幕布 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: curtainWidth,
          bottom: 0,
          backgroundColor: COLORS.background,
          zIndex: 100,
        }}
      />

      {/* 右侧幕布 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: curtainWidth,
          bottom: 0,
          backgroundColor: COLORS.background,
          zIndex: 100,
        }}
      />
    </div>
  );
};
