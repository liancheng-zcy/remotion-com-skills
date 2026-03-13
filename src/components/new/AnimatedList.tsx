// AnimatedList - 带动画的列表组件
// 适用于要点展示、功能列表等

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS, FONTS, SIZES, DURATIONS, STAGGER } from '../../design-system/tokens';
import { SPRING_PRESETS, entranceAnimations } from '../../design-system/animations';
import { Check, Computer, Bot, Penguin, IconProps } from './Icons';

// 图标映射
const iconMap: Record<string, React.FC<IconProps>> = {
  computer: Computer,
  bot: Bot,
  penguin: Penguin,
  check: Check,
};

interface ListItem {
  title: string;
  description?: string;
  icon?: 'computer' | 'bot' | 'penguin' | 'check' | string;
}

interface AnimatedListProps {
  items: ListItem[];
  variant?: 'numbered' | 'bulleted' | 'card';
  showCheck?: boolean;
  startDelay?: number;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  variant = 'card',
  showCheck = false,
  startDelay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: SIZES.spacing.xxl,
      }}
    >
      <div style={{ maxWidth: 900, width: '100%' }}>
        {items.map((item, index) => {
          const itemFrame = Math.max(0, frame - startDelay - index * STAGGER.slow);
          const itemSpring = spring({
            frame: itemFrame,
            fps,
            config: SPRING_PRESETS.bouncy,
          });
          const itemOpacity = entranceAnimations.fade(itemFrame, DURATIONS.normal);
          const translateX = interpolate(itemFrame, [0, DURATIONS.normal], [-50, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // 勾选动画
          const checkProgress = showCheck
            ? interpolate(itemFrame - 20, [0, 15], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 0;

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: SIZES.spacing.md,
                padding: variant === 'card' ? SIZES.spacing.lg : `${SIZES.spacing.sm}px 0`,
                backgroundColor: variant === 'card' ? COLORS.backgroundElevated : 'transparent',
                borderRadius: variant === 'card' ? SIZES.radius.md : 0,
                border: variant === 'card' ? `1px solid ${COLORS.backgroundSecondary}` : 'none',
                transform: `translateX(${translateX}px) scale(${0.95 + itemSpring * 0.05})`,
                opacity: itemOpacity,
              }}
            >
              {/* 序号/图标区域 */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: showCheck
                    ? `rgba(52, 199, 89, ${checkProgress})`
                    : COLORS.primary,
                  color: '#fff',
                  borderRadius: variant === 'card' ? SIZES.radius.sm : '50%',
                  fontSize: 18,
                  fontWeight: 600,
                  marginRight: SIZES.spacing.md,
                  flexShrink: 0,
                  fontFamily: FONTS.text,
                  transition: 'background-color 0.3s',
                }}
              >
                {showCheck ? (
                  <Check size={20} color="#fff" />
                ) : item.icon ? (
                  (() => {
                    const IconComponent = iconMap[item.icon];
                    return IconComponent ? <IconComponent size={20} color="#fff" /> : <span>{index + 1}</span>;
                  })()
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* 内容区域 */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: SIZES.h4,
                    fontWeight: 600,
                    color: COLORS.text,
                    marginBottom: item.description ? SIZES.spacing.xs : 0,
                    fontFamily: FONTS.display,
                  }}
                >
                  {item.title}
                </div>
                {item.description && (
                  <div
                    style={{
                      fontSize: SIZES.body,
                      color: COLORS.textSecondary,
                      lineHeight: 1.5,
                      fontFamily: FONTS.text,
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
