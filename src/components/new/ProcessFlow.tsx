// ProcessFlow - 流程步骤组件
// 用于展示工作流程、处理步骤、状态流转等

import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
  Easing,
} from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';
import { SPRING_PRESETS } from '../../design-system/animations';

// 颜色映射
const COLOR_MAP: Record<string, string> = {
  primary: COLORS.primary,
  success: COLORS.success,
  warning: COLORS.warning,
  error: COLORS.error,
  info: COLORS.info,
  text: COLORS.text,
  textSecondary: COLORS.textSecondary,
};

// 步骤状态
interface FlowStep {
  label: string;
  description?: string;
  status: 'complete' | 'active' | 'pending';
  icon?: string;
  color?: keyof typeof COLOR_MAP;
}

// 组件 Props
interface ProcessFlowProps {
  title?: string;
  subtitle?: string;
  steps: FlowStep[];
  direction?: 'horizontal' | 'vertical';
  showProgress?: boolean;
  startDelay?: number;
  stepDelay?: number;
}

// 获取状态颜色
const getStatusColor = (status: FlowStep['status'], customColor?: keyof typeof COLOR_MAP): string => {
  if (customColor) return COLOR_MAP[customColor] || COLORS.primary;
  switch (status) {
    case 'complete':
      return COLORS.success;
    case 'active':
      return COLORS.primary;
    case 'pending':
      return COLORS.textSecondary;
    default:
      return COLORS.textSecondary;
  }
};

// 获取状态图标
const getStatusIcon = (status: FlowStep['status'], customIcon?: string): string => {
  if (customIcon) return customIcon;
  switch (status) {
    case 'complete':
      return '✓';
    case 'active':
      return '●';
    case 'pending':
      return '○';
    default:
      return '○';
  }
};

// 标题组件
const Title: React.FC<{
  title: string;
  subtitle?: string;
  frame: number;
  startDelay: number;
}> = ({ title, subtitle, frame, startDelay }) => {
  const itemFrame = Math.max(0, frame - startDelay);

  const opacity = interpolate(itemFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const y = interpolate(itemFrame, [0, 20], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = spring({
    frame: itemFrame,
    fps: 30,
    config: SPRING_PRESETS.smooth,
  });

  return (
    <div
      style={{
        textAlign: 'center',
        opacity,
        transform: `translateY(${y}px) scale(${0.95 + scale * 0.05})`,
        marginBottom: SIZES.spacing.xxl,
      }}
    >
      <h1
        style={{
          fontSize: SIZES.h1,
          fontFamily: FONTS.display,
          fontWeight: 700,
          color: COLORS.text,
          margin: `0 0 ${SIZES.spacing.md}px 0`,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: SIZES.h3,
            fontFamily: FONTS.text,
            color: COLORS.textSecondary,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// 步骤节点组件
const StepNode: React.FC<{
  step: FlowStep;
  index: number;
  isLast: boolean;
  direction: 'horizontal' | 'vertical';
  frame: number;
  fps: number;
  startDelay: number;
  stepDelay: number;
}> = ({ step, index, isLast, direction, frame, fps, startDelay, stepDelay }) => {
  const color = getStatusColor(step.status, step.color);
  const icon = getStatusIcon(step.status, step.icon);
  const itemFrame = Math.max(0, frame - startDelay - index * stepDelay);

  // 弹性入场
  const scale = spring({
    frame: itemFrame,
    fps,
    config: SPRING_PRESETS.bouncy,
  });

  const opacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 连接线进度
  const lineProgress = isLast
    ? 1
    : interpolate(itemFrame - 20, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  // 活跃状态呼吸效果
  const breathe = step.status === 'active'
    ? interpolate(
        (frame % 60),
        [0, 30, 60],
        [1, 1.1, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 1;

  const isHorizontal = direction === 'horizontal';
  const size = 64;
  const lineLength = isHorizontal ? 120 : 100;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'column' : 'row',
        alignItems: 'center',
        opacity,
      }}
    >
      {/* 步骤节点 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SIZES.spacing.md,
        }}
      >
        {/* 图标圆圈 */}
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: step.status === 'pending' ? 'transparent' : `${color}20`,
            border: `3px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale * breathe})`,
            boxShadow: step.status === 'active' ? `0 0 30px ${color}60` : 'none',
            transition: 'none',
          }}
        >
          <span
            style={{
              fontSize: SIZES.h3,
              fontFamily: FONTS.display,
              fontWeight: 700,
              color,
            }}
          >
            {icon}
          </span>
        </div>

        {/* 标签 */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: isHorizontal ? 140 : 200,
          }}
        >
          <div
            style={{
              fontSize: SIZES.body,
              fontFamily: FONTS.display,
              fontWeight: 600,
              color: step.status === 'pending' ? COLORS.textSecondary : COLORS.text,
              marginBottom: SIZES.spacing.xs,
            }}
          >
            {step.label}
          </div>
          {step.description && (
            <div
              style={{
                fontSize: SIZES.caption,
                fontFamily: FONTS.text,
                color: COLORS.textSecondary,
                lineHeight: 1.5,
              }}
            >
              {step.description}
            </div>
          )}
        </div>
      </div>

      {/* 连接线 */}
      {!isLast && (
        <div
          style={{
            width: isHorizontal ? lineLength : 3,
            height: isHorizontal ? 3 : lineLength,
            margin: isHorizontal ? `${SIZES.spacing.lg}px 0` : `0 ${SIZES.spacing.lg}px`,
            backgroundColor: COLORS.backgroundSecondary,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: COLORS.success,
              transform: isHorizontal
                ? `scaleX(${lineProgress})`
                : `scaleY(${lineProgress})`,
              transformOrigin: isHorizontal ? 'left center' : 'center top',
            }}
          />
        </div>
      )}
    </div>
  );
};

// 进度指示器
const ProgressIndicator: React.FC<{
  steps: FlowStep[];
  frame: number;
  startDelay: number;
}> = ({ steps, frame, startDelay }) => {
  const completedCount = steps.filter((s) => s.status === 'complete').length;
  const activeCount = steps.filter((s) => s.status === 'active').length;
  const progress = (completedCount + activeCount * 0.5) / steps.length;

  const itemFrame = Math.max(0, frame - startDelay);
  const width = interpolate(itemFrame, [30, 50], [0, progress * 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(itemFrame, [30, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 400,
        height: 6,
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: 3,
        marginTop: SIZES.spacing.xxl,
        opacity,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${COLORS.success}, ${COLORS.primary})`,
          borderRadius: 3,
          transition: 'none',
        }}
      />
    </div>
  );
};

// 主组件
export const ProcessFlow: React.FC<ProcessFlowProps> = ({
  title,
  subtitle,
  steps,
  direction = 'horizontal',
  showProgress = true,
  startDelay = 0,
  stepDelay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isHorizontal = direction === 'horizontal';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.spacing.xxxl,
      }}
    >
      {/* 标题 */}
      {title && (
        <Title
          title={title}
          subtitle={subtitle}
          frame={frame}
          startDelay={startDelay}
        />
      )}

      {/* 流程步骤 */}
      <div
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: isHorizontal ? 'flex-start' : 'flex-start',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {steps.map((step, index) => (
          <StepNode
            key={index}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            direction={direction}
            frame={frame}
            fps={fps}
            startDelay={startDelay + 20}
            stepDelay={stepDelay}
          />
        ))}
      </div>

      {/* 进度指示器 */}
      {showProgress && (
        <ProgressIndicator
          steps={steps}
          frame={frame}
          startDelay={startDelay + steps.length * stepDelay}
        />
      )}
    </AbsoluteFill>
  );
};

export default ProcessFlow;
