// MetricCard - 数据指标卡片
// 用于展示数字、统计数据，带数字滚动动画

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface MetricCardProps {
  value: number;
  suffix?: string;        // 后缀，如 "%", "x", "+"
  prefix?: string;        // 前缀，如 "$"
  label: string;
  description?: string;
  delay?: number;
}

// 数字滚动动画
const AnimatedNumber: React.FC<{
  value: number;
  frame: number;
  delay: number;
  duration: number;
}> = ({ value, frame, delay, duration }) => {
  const progress = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 使用指数缓动让大数字滚动更快
  const easedProgress = Math.pow(progress, 0.8);
  const currentValue = Math.floor(easedProgress * value);

  // 格式化数字（添加千分位）
  const formatted = currentValue.toLocaleString();

  return <span>{formatted}</span>;
};

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const itemFrame = Math.max(0, frame - delay);

  // 卡片入场
  const cardSpring = spring({
    frame: itemFrame,
    fps,
    config: { damping: 25, stiffness: 120 },
  });

  const cardOpacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  // 标签入场
  const labelOpacity = interpolate(itemFrame - 10, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  // 描述入场
  const descOpacity = interpolate(itemFrame - 20, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        minWidth: 280,
        padding: `${SIZES.spacing.xl}px ${SIZES.spacing.xxl}px`,
        backgroundColor: `${COLORS.backgroundElevated}40`,
        borderRadius: SIZES.radius.lg,
        border: `1px solid ${COLORS.backgroundSecondary}`,
        opacity: cardOpacity,
        transform: `scale(${0.96 + cardSpring * 0.04})`,
        backdropFilter: 'blur(20px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 顶部渐变 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
          opacity: 0.5,
        }}
      />

      {/* 数字 */}
      <div
        style={{
          fontSize: SIZES.hero,
          fontWeight: 700,
          color: COLORS.text,
          fontFamily: FONTS.display,
          letterSpacing: '-2px',
          lineHeight: 1,
          marginBottom: SIZES.spacing.sm,
        }}
      >
        <span style={{ color: COLORS.primary }}>{prefix}</span>
        <AnimatedNumber value={value} frame={frame} delay={delay + 10} duration={40} />
        <span style={{ color: COLORS.primary, fontSize: SIZES.h1 }}>{suffix}</span>
      </div>

      {/* 标签 */}
      <div
        style={{
          fontSize: SIZES.h4,
          color: COLORS.textSecondary,
          fontFamily: FONTS.text,
          fontWeight: 500,
          opacity: labelOpacity,
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>

      {/* 描述 */}
      {description && (
        <div
          style={{
            fontSize: SIZES.body,
            color: COLORS.textTertiary,
            fontFamily: FONTS.text,
            marginTop: SIZES.spacing.sm,
            opacity: descOpacity,
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

// 多个指标的横向展示
interface MetricRowProps {
  metrics: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    description?: string;
  }>;
}

export const MetricRow: React.FC<MetricRowProps> = ({ metrics }) => {
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
          gap: SIZES.spacing.xl,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            value={metric.value}
            suffix={metric.suffix}
            prefix={metric.prefix}
            label={metric.label}
            description={metric.description}
            delay={index * 15}
          />
        ))}
      </div>
    </div>
  );
};
