// EvolutionTree - 演进树组件
// 用于展示技术/概念的演进历程，适合"从XX到YY"的发展时间线

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

// 阶段数据
interface EvolutionStage {
  year: string;
  name: string;
  description?: string;
  color?: keyof typeof COLOR_MAP;
  breakthrough?: boolean;
  icon?: string;
}

// 组件 Props
interface EvolutionTreeProps {
  title?: string;
  subtitle?: string;
  stages: EvolutionStage[];
  direction?: 'horizontal' | 'vertical';
  showTimeline?: boolean;
  startDelay?: number;
  stageDelay?: number;
}

// 颜色映射
const COLOR_MAP: Record<string, string> = {
  primary: COLORS.primary,
  success: COLORS.success,
  warning: COLORS.warning,
  error: COLORS.error,
  info: COLORS.info,
  blue: COLORS.extended.blue,
  green: COLORS.extended.green,
  purple: COLORS.extended.purple,
  orange: COLORS.extended.orange,
  pink: COLORS.extended.pink,
  cyan: COLORS.extended.cyan,
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

  const y = interpolate(itemFrame, [0, 20], [-30, 0], {
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
        transform: `translateY(${y}px) scale(${0.9 + scale * 0.1})`,
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

// 阶段节点组件
const StageNode: React.FC<{
  stage: EvolutionStage;
  index: number;
  isHorizontal: boolean;
  frame: number;
  fps: number;
  startDelay: number;
  stageDelay: number;
}> = ({ stage, index, isHorizontal, frame, fps, startDelay, stageDelay }) => {
  const color = COLOR_MAP[stage.color || 'primary'] || COLORS.primary;
  const itemFrame = Math.max(0, frame - startDelay - index * stageDelay);

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

  const translateOffset = isHorizontal
    ? { x: -50, y: 0 }
    : { x: 0, y: -30 };

  const x = interpolate(itemFrame, [0, 20], [translateOffset.x, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const y = interpolate(itemFrame, [0, 20], [translateOffset.y, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 突破点特殊效果
  const pulse = stage.breakthrough
    ? interpolate(
        (frame % 40),
        [0, 20, 40],
        [1, 1.15, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 1;

  const glowOpacity = stage.breakthrough
    ? interpolate(
        (frame % 40),
        [0, 20, 40],
        [0.3, 0.6, 0.3],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 0;

  const nodeSize = stage.breakthrough ? 80 : 60;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'column' : 'row',
        alignItems: 'center',
        gap: SIZES.spacing.lg,
        opacity,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {/* 节点圆圈 */}
      <div
        style={{
          position: 'relative',
          width: nodeSize,
          height: nodeSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 突破点光晕 */}
        {stage.breakthrough && (
          <div
            style={{
              position: 'absolute',
              inset: -20,
              background: `radial-gradient(circle, ${color}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: `scale(${pulse})`,
            }}
          />
        )}

        {/* 节点背景 */}
        <div
          style={{
            width: nodeSize,
            height: nodeSize,
            borderRadius: '50%',
            backgroundColor: stage.breakthrough ? `${color}30` : `${COLORS.backgroundElevated}80`,
            border: `3px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale})`,
            boxShadow: stage.breakthrough
              ? `0 0 40px ${color}60`
              : `0 0 20px ${color}30`,
          }}
        >
          <span
            style={{
              fontSize: stage.breakthrough ? SIZES.h2 : SIZES.h3,
              fontFamily: FONTS.display,
              fontWeight: 700,
              color,
            }}
          >
            {stage.icon || index + 1}
          </span>
        </div>

        {/* 年份标签 */}
        <div
          style={{
            position: 'absolute',
            bottom: -28,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: SIZES.caption,
            fontFamily: FONTS.mono,
            color: COLORS.textSecondary,
            whiteSpace: 'nowrap',
          }}
        >
          {stage.year}
        </div>
      </div>

      {/* 内容卡片 */}
      <div
        style={{
          backgroundColor: `${COLORS.backgroundElevated}60`,
          borderRadius: SIZES.radius.lg,
          border: `1px solid ${color}40`,
          padding: `${SIZES.spacing.lg}px`,
          minWidth: isHorizontal ? 180 : 280,
          maxWidth: isHorizontal ? 200 : 320,
          transform: `scale(${scale})`,
        }}
      >
        {/* 名称 */}
        <div
          style={{
            fontSize: SIZES.h4,
            fontFamily: FONTS.display,
            fontWeight: 600,
            color: stage.breakthrough ? color : COLORS.text,
            marginBottom: SIZES.spacing.xs,
          }}
        >
          {stage.name}
          {stage.breakthrough && (
            <span
              style={{
                marginLeft: SIZES.spacing.sm,
                fontSize: SIZES.caption,
                color: COLORS.warning,
              }}
            >
              ★ 突破
            </span>
          )}
        </div>

        {/* 描述 */}
        {stage.description && (
          <div
            style={{
              fontSize: SIZES.caption,
              fontFamily: FONTS.text,
              color: COLORS.textSecondary,
              lineHeight: 1.5,
            }}
          >
            {stage.description}
          </div>
        )}
      </div>
    </div>
  );
};

// 连接线组件
const TimelineConnector: React.FC<{
  stages: EvolutionStage[];
  isHorizontal: boolean;
  frame: number;
  startDelay: number;
  stageDelay: number;
}> = ({ stages, isHorizontal, frame, startDelay, stageDelay }) => {
  const segments = stages.length - 1;

  return (
    <div
      style={{
        position: 'absolute',
        ...(isHorizontal
          ? {
              top: 40,
              left: 100,
              right: 100,
              height: 4,
            }
          : {
              left: 40,
              top: 150,
              bottom: 100,
              width: 4,
            }),
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: 2,
        zIndex: 0,
      }}
    >
      {/* 进度填充 */}
      {Array.from({ length: segments }).map((_, i) => {
        const segmentFrame = Math.max(0, frame - startDelay - i * stageDelay - 10);
        const progress = interpolate(segmentFrame, [0, 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...(isHorizontal
                ? {
                    left: `${(i / segments) * 100}%`,
                    width: `${(1 / segments) * progress * 100}%`,
                    top: 0,
                    bottom: 0,
                  }
                : {
                    top: `${(i / segments) * 100}%`,
                    height: `${(1 / segments) * progress * 100}%`,
                    left: 0,
                    right: 0,
                  }),
              background: `linear-gradient(${isHorizontal ? 90 : 180}deg, ${COLORS.primary}, ${COLORS.success})`,
              borderRadius: 2,
            }}
          />
        );
      })}

      {/* 箭头终点 */}
      <div
        style={{
          position: 'absolute',
          ...(isHorizontal
            ? { right: -8, top: -4 }
            : { bottom: -8, left: -4 }),
          width: 0,
          height: 0,
          borderStyle: 'solid',
          ...(isHorizontal
            ? {
                borderWidth: '6px 0 6px 10px',
                borderColor: `transparent transparent transparent ${COLORS.primary}`,
              }
            : {
                borderWidth: '10px 6px 0 6px',
                borderColor: `${COLORS.primary} transparent transparent transparent`,
              }),
        }}
      />
    </div>
  );
};

// 主组件
export const EvolutionTree: React.FC<EvolutionTreeProps> = ({
  title,
  subtitle,
  stages,
  direction = 'horizontal',
  showTimeline = true,
  startDelay = 0,
  stageDelay = 15,
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

      {/* 演进树容器 */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: isHorizontal ? 'flex-start' : 'center',
          justifyContent: 'center',
          gap: isHorizontal ? 60 : 40,
          padding: `${SIZES.spacing.xxl}px`,
        }}
      >
        {/* 时间线 */}
        {showTimeline && (
          <TimelineConnector
            stages={stages}
            isHorizontal={isHorizontal}
            frame={frame}
            startDelay={startDelay + 20}
            stageDelay={stageDelay}
          />
        )}

        {/* 阶段节点 */}
        {stages.map((stage, index) => (
          <StageNode
            key={index}
            stage={stage}
            index={index}
            isHorizontal={isHorizontal}
            frame={frame}
            fps={fps}
            startDelay={startDelay + 20}
            stageDelay={stageDelay}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default EvolutionTree;
