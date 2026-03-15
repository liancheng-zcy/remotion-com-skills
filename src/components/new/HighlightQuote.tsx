// HighlightQuote - 高亮引用组件
// 用于强调重点数据或关键结论，左侧有色块指示

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface HighlightQuoteProps {
  quote: string;
  source?: string;
  variant?: 'primary' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  startDelay?: number;
  accentOnLeft?: boolean;
}

export const HighlightQuote: React.FC<HighlightQuoteProps> = ({
  quote,
  source,
  variant = 'primary',
  size = 'md',
  startDelay = 0,
  accentOnLeft = true,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // 获取颜色
  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'info':
        return COLORS.info;
      default:
        return COLORS.primary;
    }
  };

  const variantColor = getVariantColor();

  // 获取字号
  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return SIZES.h3;
      case 'lg':
        return SIZES.h1;
      default:
        return SIZES.h2;
    }
  };

  const fontSize = getFontSize();
  const itemFrame = Math.max(0, frame - startDelay);

  // 整体容器入场
  const containerOpacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const containerScale = spring({
    frame: itemFrame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // 左侧/右侧指示条动画
  const barHeight = interpolate(itemFrame, [5, 30], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  // 文字入场（逐词或整体）
  const textOpacity = interpolate(itemFrame - 10, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textX = interpolate(itemFrame - 10, [0, 15], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 来源文字入场
  const sourceOpacity = interpolate(itemFrame - 20, [0, 12], [0, 1], {
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
        padding: SIZES.spacing.xxl,
        opacity: containerOpacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          maxWidth: 1200,
          transform: `scale(${containerScale})`,
        }}
      >
        {/* 左侧/右侧色块指示条 */}
        {accentOnLeft && (
          <div
            style={{
              width: 6,
              height: `${barHeight}%`,
              backgroundColor: variantColor,
              borderRadius: 3,
              marginRight: SIZES.spacing.lg,
              alignSelf: 'center',
              minHeight: 60,
            }}
          />
        )}

        {/* 引用内容 */}
        <div
          style={{
            flex: 1,
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          {/* 引号装饰 */}
          <div
            style={{
              fontSize: fontSize * 1.5,
              fontFamily: FONTS.display,
              color: variantColor,
              opacity: 0.5,
              lineHeight: 0.5,
              marginBottom: SIZES.spacing.sm,
            }}
          >
            "
          </div>

          {/* 引用文字 */}
          <div
            style={{
              fontSize: fontSize,
              fontFamily: FONTS.display,
              fontWeight: 600,
              color: COLORS.text,
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
            }}
          >
            {quote}
          </div>

          {/* 来源 */}
          {source && (
            <div
              style={{
                marginTop: SIZES.spacing.md,
                fontSize: SIZES.h4,
                fontFamily: FONTS.text,
                color: COLORS.textSecondary,
                opacity: sourceOpacity,
              }}
            >
              —— {source}
            </div>
          )}
        </div>

        {/* 右侧色块指示条（如果需要） */}
        {!accentOnLeft && (
          <div
            style={{
              width: 6,
              height: `${barHeight}%`,
              backgroundColor: variantColor,
              borderRadius: 3,
              marginLeft: SIZES.spacing.lg,
              alignSelf: 'center',
              minHeight: 60,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

// 数据高亮卡片 - 用于展示单个关键数据点
interface DataHighlightProps {
  value: string;
  label: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'primary' | 'success' | 'warning';
  startDelay?: number;
}

export const DataHighlight: React.FC<DataHighlightProps> = ({
  value,
  label,
  description,
  trend,
  variant = 'primary',
  startDelay = 0,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      default:
        return COLORS.primary;
    }
  };

  const variantColor = getVariantColor();
  const itemFrame = Math.max(0, frame - startDelay);

  // 卡片入场
  const cardOpacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardScale = spring({
    frame: itemFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  // 数值数字滚动效果
  const valueY = interpolate(itemFrame - 5, [0, 20], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const valueOpacity = interpolate(itemFrame - 5, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 标签入场
  const labelOpacity = interpolate(itemFrame - 15, [0, 12], [0, 1], {
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
        padding: SIZES.spacing.xxl,
        opacity: cardOpacity,
      }}
    >
      <div
        style={{
          backgroundColor: `${COLORS.backgroundElevated}80`,
          borderRadius: SIZES.radius.xl,
          padding: `${SIZES.spacing.xxl}px ${SIZES.spacing.xxxl}px`,
          border: `1px solid ${variantColor}30`,
          textAlign: 'center',
          transform: `scale(${cardScale})`,
          minWidth: 400,
        }}
      >
        {/* 标签 */}
        <div
          style={{
            fontSize: SIZES.body,
            fontFamily: FONTS.text,
            color: COLORS.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: SIZES.spacing.sm,
            opacity: labelOpacity,
          }}
        >
          {label}
        </div>

        {/* 数值 */}
        <div
          style={{
            fontSize: SIZES.hero,
            fontFamily: FONTS.display,
            fontWeight: 800,
            color: variantColor,
            lineHeight: 1,
            opacity: valueOpacity,
            transform: `translateY(${valueY}px)`,
          }}
        >
          {value}
        </div>

        {/* 趋势 */}
        {trend && (
          <div
            style={{
              marginTop: SIZES.spacing.md,
              fontSize: SIZES.h4,
              fontFamily: FONTS.display,
              color: trend.isPositive ? COLORS.success : COLORS.error,
              fontWeight: 600,
              opacity: labelOpacity,
            }}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}

        {/* 描述 */}
        {description && (
          <div
            style={{
              marginTop: SIZES.spacing.lg,
              fontSize: SIZES.body,
              fontFamily: FONTS.text,
              color: COLORS.textSecondary,
              maxWidth: 500,
              lineHeight: 1.5,
              opacity: labelOpacity,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
