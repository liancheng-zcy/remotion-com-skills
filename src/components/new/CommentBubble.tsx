// CommentBubble - 弹幕/评论气泡组件
// 用于增加互动感，模拟观众评论飞过效果

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface CommentBubbleProps {
  text: string;
  startFrame: number; // 开始显示的帧
  duration?: number; // 显示持续时间（帧）
  yPosition?: number; // 垂直位置（百分比 0-100）
  direction?: 'left' | 'right'; // 飞入方向
  variant?: 'default' | 'highlight' | 'question' | 'negative';
  avatar?: string; // 可选的头像文字（如 "A"）
}

export const CommentBubble: React.FC<CommentBubbleProps> = ({
  text,
  startFrame,
  duration = 120,
  yPosition = 20,
  direction = 'right',
  variant = 'default',
  avatar,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // 只在显示时间段内渲染
  const endFrame = startFrame + duration;
  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const relativeFrame = frame - startFrame;

  // 获取颜色
  const getVariantColor = () => {
    switch (variant) {
      case 'highlight':
        return {
          bg: `${COLORS.primary}20`,
          border: COLORS.primary,
          text: COLORS.text,
        };
      case 'question':
        return {
          bg: `${COLORS.warning}20`,
          border: COLORS.warning,
          text: COLORS.text,
        };
      case 'negative':
        return {
          bg: `${COLORS.error}20`,
          border: COLORS.error,
          text: COLORS.text,
        };
      default:
        return {
          bg: `${COLORS.backgroundElevated}80`,
          border: COLORS.backgroundSecondary,
          text: COLORS.text,
        };
    }
  };

  const colors = getVariantColor();

  // 入场动画（前15帧）
  const enterProgress = Math.min(relativeFrame / 15, 1);
  const enterX = direction === 'right'
    ? interpolate(enterProgress, [0, 1], [-400, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      })
    : interpolate(enterProgress, [0, 1], [width + 400, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      });

  const enterOpacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const enterScale = interpolate(relativeFrame, [0, 15], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });

  // 出场动画（最后20帧）
  const exitProgress = Math.max(0, (relativeFrame - (duration - 20)) / 20);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitX = interpolate(exitProgress, [0, 1], [0, direction === 'right' ? 200 : -200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

  const opacity = exitProgress > 0 ? exitOpacity : enterOpacity;
  const translateX = enterX + exitX;

  return (
    <div
      style={{
        position: 'absolute',
        left: direction === 'right' ? SIZES.spacing.xl : undefined,
        right: direction === 'left' ? SIZES.spacing.xl : undefined,
        top: `${yPosition}%`,
        transform: `translateX(${translateX}px) scale(${enterScale})`,
        opacity,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: SIZES.spacing.sm,
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: SIZES.radius.xl,
          padding: `${SIZES.spacing.md}px ${SIZES.spacing.lg}px`,
          backdropFilter: 'blur(8px)',
          maxWidth: 400,
        }}
      >
        {/* 头像 */}
        {avatar && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: SIZES.body,
              fontFamily: FONTS.display,
              color: COLORS.background,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {avatar}
          </div>
        )}

        {/* 评论文字 */}
        <div
          style={{
            fontSize: SIZES.h4,
            fontFamily: FONTS.text,
            color: colors.text,
            lineHeight: 1.5,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

// 弹幕容器 - 管理多个弹幕
interface CommentBarrageProps {
  comments: Array<{
    text: string;
    startFrame: number;
    duration?: number;
    yPosition?: number;
    direction?: 'left' | 'right';
    variant?: 'default' | 'highlight' | 'question' | 'negative';
    avatar?: string;
  }>;
}

export const CommentBarrage: React.FC<CommentBarrageProps> = ({ comments }) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {comments.map((comment, index) => (
        <CommentBubble
          key={index}
          text={comment.text}
          startFrame={comment.startFrame}
          duration={comment.duration}
          yPosition={comment.yPosition}
          direction={comment.direction}
          variant={comment.variant}
          avatar={comment.avatar}
        />
      ))}
    </AbsoluteFill>
  );
};

// 底部评论栏 - 固定在底部的评论展示
interface BottomCommentProps {
  comments: Array<{
    text: string;
    author?: string;
    avatar?: string;
    variant?: 'default' | 'highlight' | 'question';
  }>;
  activeIndex: number; // 当前显示的评论索引
  startDelay?: number;
}

export const BottomComment: React.FC<BottomCommentProps> = ({
  comments,
  activeIndex,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();

  const activeComment = comments[activeIndex];
  if (!activeComment) return null;

  const itemFrame = Math.max(0, frame - startDelay);

  // 入场动画
  const containerY = interpolate(itemFrame, [0, 20], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const containerOpacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const getVariantColor = () => {
    switch (activeComment.variant) {
      case 'highlight':
        return COLORS.primary;
      case 'question':
        return COLORS.warning;
      default:
        return COLORS.backgroundElevated;
    }
  };

  const accentColor = getVariantColor();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: SIZES.spacing.xxl,
        left: SIZES.spacing.xxl,
        right: SIZES.spacing.xxl,
        transform: `translateY(${containerY}px)`,
        opacity: containerOpacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: SIZES.spacing.md,
          backgroundColor: `${COLORS.backgroundElevated}90`,
          borderRadius: SIZES.radius.lg,
          padding: SIZES.spacing.lg,
          borderLeft: `4px solid ${accentColor}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* 头像 */}
        {activeComment.avatar && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: SIZES.body,
              fontFamily: FONTS.display,
              color: COLORS.background,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {activeComment.avatar}
          </div>
        )}

        <div style={{ flex: 1 }}>
          {/* 作者名 */}
          {activeComment.author && (
            <div
              style={{
                fontSize: SIZES.body,
                fontFamily: FONTS.display,
                color: COLORS.textSecondary,
                fontWeight: 600,
                marginBottom: SIZES.spacing.xs,
              }}
            >
              {activeComment.author}
            </div>
          )}

          {/* 评论内容 */}
          <div
            style={{
              fontSize: SIZES.h4,
              fontFamily: FONTS.text,
              color: COLORS.text,
              lineHeight: 1.5,
            }}
          >
            {activeComment.text}
          </div>
        </div>
      </div>
    </div>
  );
};

// 互动按钮效果 - 点赞/评论数增长
interface InteractionCounterProps {
  likes?: number;
  comments?: number;
  shares?: number;
  position?: 'top-right' | 'bottom-right';
  startDelay?: number;
}

export const InteractionCounter: React.FC<InteractionCounterProps> = ({
  likes = 0,
  comments = 0,
  shares = 0,
  position = 'bottom-right',
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();

  const itemFrame = Math.max(0, frame - startDelay);

  // 容器入场
  const containerOpacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const containerY = interpolate(itemFrame, [0, 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const isTop = position === 'top-right';

  return (
    <div
      style={{
        position: 'absolute',
        right: SIZES.spacing.xl,
        top: isTop ? SIZES.spacing.xl : undefined,
        bottom: isTop ? undefined : SIZES.spacing.xl,
        display: 'flex',
        flexDirection: 'column',
        gap: SIZES.spacing.md,
        opacity: containerOpacity,
        transform: `translateY(${containerY}px)`,
      }}
    >
      {/* 点赞 */}
      {likes > 0 && (
        <CounterItem icon="♥" value={likes} color={COLORS.error} delay={0} frame={itemFrame} />
      )}

      {/* 评论 */}
      {comments > 0 && (
        <CounterItem icon="💬" value={comments} color={COLORS.text} delay={5} frame={itemFrame} />
      )}

      {/* 分享 */}
      {shares > 0 && (
        <CounterItem icon="↗" value={shares} color={COLORS.text} delay={10} frame={itemFrame} />
      )}
    </div>
  );
};

// 计数器单项
interface CounterItemProps {
  icon: string;
  value: number;
  color: string;
  delay: number;
  frame: number;
}

const CounterItem: React.FC<CounterItemProps> = ({ icon, value, color, delay, frame }) => {
  const itemFrame = Math.max(0, frame - delay);

  // 数字增长动画
  const countProgress = Math.min(itemFrame / 30, 1);
  const currentValue = Math.floor(value * countProgress);

  // 格式化数字
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const opacity = interpolate(itemFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: SIZES.spacing.xs,
        opacity,
      }}
    >
      <span style={{ fontSize: SIZES.h4, color }}>{icon}</span>
      <span
        style={{
          fontSize: SIZES.h4,
          fontFamily: FONTS.display,
          color: COLORS.text,
          fontWeight: 600,
          minWidth: 60,
        }}
      >
        {formatNumber(currentValue)}
      </span>
    </div>
  );
};
