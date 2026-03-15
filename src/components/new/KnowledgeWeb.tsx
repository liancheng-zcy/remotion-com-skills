// KnowledgeWeb - 知识网络组件
// 用于展示复杂知识网络关系，比 CausalGraph 更灵活的多层级网状结构

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

// 网络节点
interface WebNode {
  id: string;
  label: string;
  color?: keyof typeof COLOR_MAP;
  size?: 'small' | 'medium' | 'large';
  category?: string;
  x?: number; // 0-1 相对位置
  y?: number; // 0-1 相对位置
}

// 连接关系
interface WebConnection {
  from: string;
  to: string;
  label?: string;
  color?: keyof typeof COLOR_MAP;
  style?: 'solid' | 'dashed' | 'dotted';
}

// 组件 Props
interface KnowledgeWebProps {
  title?: string;
  subtitle?: string;
  centerNode?: WebNode;
  surroundingNodes: WebNode[];
  connections: WebConnection[];
  showParticles?: boolean;
  startDelay?: number;
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
  red: COLORS.extended.red,
  yellow: COLORS.extended.yellow,
  teal: COLORS.extended.teal,
};

// 节点大小
const NODE_SIZES = {
  small: { node: 60, font: SIZES.body },
  medium: { node: 100, font: SIZES.h4 },
  large: { node: 140, font: SIZES.h3 },
};

// 粒子背景
const ParticleNetwork: React.FC<{ frame: number; startDelay: number }> = ({
  frame,
  startDelay,
}) => {
  const particles = React.useMemo(() => {
    const count = 30;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: ((i * 137.5) % 100) / 100,
      y: ((i * 73.3) % 100) / 100,
      size: 2 + (i % 3),
      opacity: 0.2 + (i % 5) * 0.08,
    }));
  }, []);

  const opacity = interpolate(frame - startDelay, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg width="1920" height="1080" style={{ position: 'absolute' }}>
        {particles.map((p1, i) =>
          particles.slice(i + 1).map((p2, j) => {
            const x1 = p1.x * 1920;
            const y1 = p1.y * 1080;
            const x2 = p2.x * 1920;
            const y2 = p2.y * 1080;
            const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            if (dist > 250) return null;
            const lineOpacity = (1 - dist / 250) * 0.15 * opacity;
            return (
              <line
                key={`${i}-${j}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={COLORS.primary}
                strokeWidth={1}
                opacity={lineOpacity}
              />
            );
          })
        )}
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.x * 1920}
            cy={p.y * 1080}
            r={p.size}
            fill={COLORS.primary}
            opacity={p.opacity * opacity}
          />
        ))}
      </svg>
    </div>
  );
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
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity,
        transform: `translateY(${y}px) scale(${0.95 + scale * 0.05})`,
        zIndex: 10,
      }}
    >
      <h1
        style={{
          fontSize: SIZES.h1,
          fontFamily: FONTS.display,
          fontWeight: 700,
          color: COLORS.text,
          margin: `0 0 ${SIZES.spacing.sm}px 0`,
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

// 网络节点组件
const NetworkNode: React.FC<{
  node: WebNode;
  isCenter: boolean;
  index: number;
  frame: number;
  fps: number;
  startDelay: number;
}> = ({ node, isCenter, index, frame, fps, startDelay }) => {
  const color = COLOR_MAP[node.color || 'primary'] || COLORS.primary;
  const size = NODE_SIZES[node.size || 'medium'];
  const itemFrame = Math.max(0, frame - startDelay - index * 8);

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

  // 中心节点呼吸效果
  const breathe = isCenter
    ? interpolate(
        (frame % 50),
        [0, 25, 50],
        [1, 1.05, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 1;

  // 计算位置
  const x = (node.x ?? 0.5) * 1920;
  const y = (node.y ?? 0.5) * 1080;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - size.node / 2,
        top: y - size.node / 2,
        width: size.node,
        height: size.node,
        opacity,
        transform: `scale(${scale * breathe})`,
        zIndex: isCenter ? 5 : 3,
      }}
    >
      {/* 节点光晕 */}
      <div
        style={{
          position: 'absolute',
          inset: -15,
          background: `radial-gradient(circle, ${color}${isCenter ? '40' : '20'} 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: isCenter ? 0.8 : 0.5,
        }}
      />

      {/* 节点主体 */}
      <div
        style={{
          width: size.node,
          height: size.node,
          borderRadius: '50%',
          backgroundColor: isCenter ? `${color}40` : `${COLORS.backgroundElevated}90`,
          border: `${isCenter ? 3 : 2}px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isCenter
            ? `0 0 50px ${color}60`
            : `0 0 20px ${color}30`,
        }}
      >
        <span
          style={{
            fontSize: size.font,
            fontFamily: FONTS.display,
            fontWeight: isCenter ? 700 : 600,
            color,
            textAlign: 'center',
            padding: 8,
            lineHeight: 1.2,
            maxWidth: size.node - 16,
            wordWrap: 'break-word',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {node.label}
        </span>
      </div>
    </div>
  );
};

// 连接线组件
const ConnectionLine: React.FC<{
  connection: WebConnection;
  nodes: WebNode[];
  centerNode?: WebNode;
  index: number;
  frame: number;
  startDelay: number;
}> = ({ connection, nodes, centerNode, index, frame, startDelay }) => {
  const fromNode = connection.from === centerNode?.id
    ? centerNode
    : nodes.find((n) => n.id === connection.from);
  const toNode = connection.to === centerNode?.id
    ? centerNode
    : nodes.find((n) => n.id === connection.to);

  if (!fromNode || !toNode) return null;

  const color = COLOR_MAP[connection.color || 'primary'] || COLORS.primary;
  const itemFrame = Math.max(0, frame - startDelay - index * 5);

  const opacity = interpolate(itemFrame, [0, 15], [0, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const progress = interpolate(itemFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const x1 = (fromNode.x ?? 0.5) * 1920;
  const y1 = (fromNode.y ?? 0.5) * 1080;
  const x2 = (toNode.x ?? 0.5) * 1920;
  const y2 = (toNode.y ?? 0.5) * 1080;

  // 计算路径上的点
  const currentX = x1 + (x2 - x1) * progress;
  const currentY = y1 + (y2 - y1) * progress;

  const strokeDasharray = connection.style === 'dashed' ? '8,4' : connection.style === 'dotted' ? '2,4' : 'none';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* 连接线 */}
      <line
        x1={x1}
        y1={y1}
        x2={currentX}
        y2={currentY}
        stroke={color}
        strokeWidth={2}
        opacity={opacity}
        strokeDasharray={strokeDasharray}
      />

      {/* 标签 */}
      {connection.label && progress > 0.5 && (
        <g opacity={interpolate(progress, [0.5, 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
          <rect
            x={(x1 + x2) / 2 - 30}
            y={(y1 + y2) / 2 - 12}
            width={60}
            height={24}
            rx={4}
            fill={`${COLORS.background}90`}
            stroke={color}
            strokeWidth={1}
          />
          <text
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2 + 4}
            textAnchor="middle"
            fill={color}
            fontSize={12}
            fontFamily={FONTS.text}
          >
            {connection.label}
          </text>
        </g>
      )}
    </svg>
  );
};

// 主组件
export const KnowledgeWeb: React.FC<KnowledgeWebProps> = ({
  title,
  subtitle,
  centerNode,
  surroundingNodes,
  connections,
  showParticles = true,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 如果没有提供位置，自动计算周围节点位置
  const positionedNodes = React.useMemo(() => {
    return surroundingNodes.map((node, index) => {
      if (node.x !== undefined && node.y !== undefined) return node;

      const total = surroundingNodes.length;
      const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
      const radius = 0.3; // 距离中心的半径比例，增大避免重叠

      return {
        ...node,
        x: 0.5 + Math.cos(angle) * radius,
        y: 0.5 + Math.sin(angle) * radius,
      };
    });
  }, [surroundingNodes]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        overflow: 'hidden',
      }}
    >
      {/* 粒子背景 */}
      {showParticles && <ParticleNetwork frame={frame} startDelay={startDelay} />}

      {/* 标题 */}
      {title && (
        <Title
          title={title}
          subtitle={subtitle}
          frame={frame}
          startDelay={startDelay}
        />
      )}

      {/* 连接线 */}
      {connections.map((conn, index) => (
        <ConnectionLine
          key={`conn-${index}`}
          connection={conn}
          nodes={positionedNodes}
          centerNode={centerNode}
          index={index}
          frame={frame}
          startDelay={startDelay + 20}
        />
      ))}

      {/* 中心节点 */}
      {centerNode && (
        <NetworkNode
          node={{ ...centerNode, x: 0.5, y: 0.5 }}
          isCenter={true}
          index={0}
          frame={frame}
          fps={fps}
          startDelay={startDelay + 10}
        />
      )}

      {/* 周围节点 */}
      {positionedNodes.map((node, index) => (
        <NetworkNode
          key={node.id}
          node={node}
          isCenter={false}
          index={index + 1}
          frame={frame}
          fps={fps}
          startDelay={startDelay + 20}
        />
      ))}
    </AbsoluteFill>
  );
};

export default KnowledgeWeb;
