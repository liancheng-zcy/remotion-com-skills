// FeatureCard - 特性卡片组件
// 用于展示功能特性，带图标和描述

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';
import { Zap, Lock, Wrench, IconProps } from './Icons';

interface FeatureCardProps {
  icon: 'zap' | 'lock' | 'wrench' | string; // 图标名称
  title: string;
  description: string;
  delay?: number;
}

// 图标映射
const iconMap: Record<string, React.FC<IconProps>> = {
  zap: Zap,
  lock: Lock,
  wrench: Wrench,
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const itemFrame = Math.max(0, frame - delay);

  // 整体入场
  const scale = spring({
    frame: itemFrame,
    fps,
    config: { damping: 25, stiffness: 100, mass: 1 },
  });

  const opacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const y = interpolate(itemFrame, [0, 20], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 图标缩放
  const iconScale = spring({
    frame: itemFrame - 5,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  // 描述文字延迟入场
  const descOpacity = interpolate(itemFrame - 10, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 获取图标组件
  const IconComponent = iconMap[icon] || Zap;

  return (
    <div
      style={{
        width: 380,
        padding: SIZES.spacing.xl,
        backgroundColor: `${COLORS.backgroundElevated}60`,
        borderRadius: SIZES.radius.lg,
        border: `1px solid ${COLORS.backgroundSecondary}`,
        opacity: opacity,
        transform: `scale(${0.95 + scale * 0.05}) translateY(${y}px)`,
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 顶部光晕 */}
      <div
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          background: `radial-gradient(circle, ${COLORS.primary}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* 图标 */}
      <div
        style={{
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${COLORS.primary}15`,
          borderRadius: SIZES.radius.md,
          marginBottom: SIZES.spacing.lg,
          transform: `scale(${iconScale})`,
          border: `1px solid ${COLORS.primary}30`,
        }}
      >
        <IconComponent size={28} color={COLORS.primary} />
      </div>

      {/* 标题 */}
      <h3
        style={{
          fontSize: SIZES.h3,
          fontWeight: 600,
          color: COLORS.text,
          fontFamily: FONTS.display,
          marginBottom: SIZES.spacing.sm,
          letterSpacing: '-0.5px',
        }}
      >
        {title}
      </h3>

      {/* 描述 */}
      <p
        style={{
          fontSize: SIZES.body,
          color: COLORS.textSecondary,
          fontFamily: FONTS.text,
          lineHeight: 1.6,
          opacity: descOpacity,
        }}
      >
        {description}
      </p>

      {/* 底部装饰线 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
          opacity: interpolate(itemFrame - 15, [0, 20], [0, 0.5], {
            extrapolateLeft: 'clamp',
          }),
        }}
      />
    </div>
  );
};

// 多个卡片的网格布局
interface FeatureGridProps {
  features: Array<{
    icon: 'zap' | 'lock' | 'wrench' | string;
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
}) => {

  const getColumnGap = () => {
    switch (columns) {
      case 2: return 60;
      case 3: return 40;
      case 4: return 30;
      default: return 40;
    }
  };

  const getRowGap = () => 40;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SIZES.spacing.xxxl,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: `${getRowGap()}px ${getColumnGap()}px`,
          maxWidth: columns === 2 ? 900 : columns === 3 ? 1300 : 1700,
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={15 + index * 12}
          />
        ))}
      </div>
    </div>
  );
};
