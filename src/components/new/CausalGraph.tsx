// CausalGraph - 因果关系图谱组件
// 用于展示知识图谱、因果关系、节点连接等场景

import React, { useMemo } from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  AbsoluteFill,
  random,
} from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';
import { SPRING_PRESETS } from '../../design-system/animations';

// 扩展颜色映射
const EXTENDED_COLORS: Record<string, string> = {
  error: COLORS.error,
  warning: COLORS.warning,
  success: COLORS.success,
  info: COLORS.info,
  primary: COLORS.primary,
  orange: COLORS.extended.orange,
  yellow: COLORS.extended.yellow,
  green: COLORS.extended.green,
  teal: COLORS.extended.teal,
  cyan: COLORS.extended.cyan,
  blue: COLORS.extended.blue,
  indigo: COLORS.extended.indigo,
  purple: COLORS.extended.purple,
  pink: COLORS.extended.pink,
  red: COLORS.extended.red,
};

// 节点类型
export interface CausalNode {
  id: string;
  label: string;
  color: keyof typeof EXTENDED_COLORS;
  x?: number; // 相对位置 0-1
  y?: number; // 相对位置 0-1
}

// 连线类型
export interface CausalEdge {
  from: string;
  to: string;
  label: string;
  type?: 'cause' | 'fix' | 'related' | 'leadsTo';
}

// 引用类型
export interface QuoteData {
  text: string;
  source?: string;
}

// 组件 Props
interface CausalGraphProps {
  title?: string;
  subtitle?: string;
  highlightWords?: Record<string, keyof typeof EXTENDED_COLORS>;
  nodes?: CausalNode[];
  edges?: CausalEdge[];
  quote?: QuoteData;
  showParticles?: boolean;
  startDelay?: number;
}

// 粒子网络背景组件
const ParticleNetwork: React.FC<{ frame: number; startDelay: number }> = ({
  frame,
  startDelay,
}) => {
  const particles = useMemo(() => {
    const count = 30;
    const width = 1920;
    const height = 1080;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random(`x-${i}`) * width,
      y: random(`y-${i}`) * height,
      size: random(`size-${i}`) * 3 + 1,
      opacity: random(`opacity-${i}`) * 0.5 + 0.2,
      speedX: (random(`speedX-${i}`) - 0.5) * 0.3,
      speedY: (random(`speedY-${i}`) - 0.5) * 0.3,
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
        {/* 连接线 */}
        {particles.map((p1, i) =>
          particles.slice(i + 1).map((p2, j) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 250) return null;
            const lineOpacity = (1 - dist / 250) * 0.3 * opacity;
            return (
              <line
                key={`${i}-${j}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={COLORS.primary}
                strokeWidth={1}
                opacity={lineOpacity}
              />
            );
          })
        )}
        {/* 粒子点 */}
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.x + (frame % 1000) * p.speedX}
            cy={p.y + (frame % 1000) * p.speedY}
            r={p.size}
            fill={COLORS.primary}
            opacity={p.opacity * opacity}
          />
        ))}
      </svg>
    </div>
  );
};

// 因果节点组件
const Node: React.FC<{
  node: CausalNode;
  index: number;
  frame: number;
  fps: number;
  startDelay: number;
}> = ({ node, index, frame, fps, startDelay }) => {
  const color = EXTENDED_COLORS[node.color] || COLORS.primary;
  const itemFrame = Math.max(0, frame - startDelay - index * 10);

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

  // 呼吸效果
  const breathe = interpolate(
    (frame + index * 50) % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 计算位置
  const centerX = 960;
  const centerY = 720;
  const nodeX = centerX + (node.x || 0.5) * 700 - 350;
  const nodeY = centerY + (node.y || 0.5) * 300 - 150;

  return (
    <div
      style={{
        position: 'absolute',
        left: nodeX,
        top: nodeY,
        transform: `translate(-50%, -50%) scale(${scale * breathe})`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.spacing.sm,
      }}
    >
      {/* 节点光晕 */}
      <div
        style={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          transform: 'scale(1.5)',
        }}
      />
      {/* 节点主体 */}
      <div
        style={{
          padding: `${SIZES.spacing.md}px ${SIZES.spacing.lg}px`,
          backgroundColor: `${COLORS.backgroundElevated}E0`,
          borderRadius: SIZES.radius.lg,
          border: `2px solid ${color}`,
          boxShadow: `0 0 30px ${color}40`,
        }}
      >
        <span
          style={{
            fontSize: SIZES.h3,
            fontFamily: FONTS.display,
            fontWeight: 700,
            color,
            letterSpacing: '-0.02em',
          }}
        >
          {node.label}
        </span>
      </div>
    </div>
  );
};

// 连接线和箭头组件
const Edge: React.FC<{
  edge: CausalEdge;
  nodes: CausalNode[];
  index: number;
  frame: number;
  startDelay: number;
}> = ({ edge, nodes, index, frame, startDelay }) => {
  const fromNode = nodes.find((n) => n.id === edge.from);
  const toNode = nodes.find((n) => n.id === edge.to);

  if (!fromNode || !toNode) return null;

  const centerX = 960;
  const centerY = 720;
  const fromX = centerX + (fromNode.x || 0.5) * 700 - 350;
  const fromY = centerY + (fromNode.y || 0.5) * 300 - 150;
  const toX = centerX + (toNode.x || 0.5) * 700 - 350;
  const toY = centerY + (toNode.y || 0.5) * 300 - 150;

  // 连线动画
  const lineFrame = Math.max(0, frame - startDelay - 30 - index * 8);
  const lineProgress = interpolate(lineFrame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 标签动画
  const labelOpacity = interpolate(lineFrame - 15, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 计算中点和角度
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);
  const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));

  // 根据类型选择颜色
  const getEdgeColor = () => {
    switch (edge.type) {
      case 'cause':
        return COLORS.error;
      case 'fix':
        return COLORS.success;
      case 'leadsTo':
        return COLORS.warning;
      default:
        return COLORS.textSecondary;
    }
  };

  const edgeColor = getEdgeColor();

  return (
    <>
      {/* 连接线 */}
      <div
        style={{
          position: 'absolute',
          left: fromX,
          top: fromY,
          width: distance * lineProgress,
          height: 2,
          background: `linear-gradient(90deg, ${edgeColor}, ${edgeColor}80)`,
          transformOrigin: 'left center',
          transform: `rotate(${angle}deg)`,
          opacity: lineProgress,
        }}
      />
      {/* 箭头 */}
      {lineProgress > 0.8 && (
        <div
          style={{
            position: 'absolute',
            left: toX - 30 * Math.cos((angle * Math.PI) / 180),
            top: toY - 30 * Math.sin((angle * Math.PI) / 180),
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            opacity: interpolate(lineFrame - 20, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
            }),
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M2 8 L14 8 M10 4 L14 8 L10 12"
              stroke={edgeColor}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      {/* 关系标签 */}
      <div
        style={{
          position: 'absolute',
          left: midX,
          top: midY - 35 - index * 30,
          transform: 'translate(-50%, -50%)',
          padding: `${SIZES.spacing.xs}px ${SIZES.spacing.sm}px`,
          backgroundColor: `${COLORS.background}90`,
          borderRadius: SIZES.radius.sm,
          border: `1px solid ${edgeColor}60`,
          opacity: labelOpacity,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontSize: SIZES.caption,
            fontFamily: FONTS.text,
            color: edgeColor,
            fontWeight: 500,
          }}
        >
          — {edge.label} →
        </span>
      </div>
    </>
  );
};

// 引用卡片组件
const QuoteCard: React.FC<{
  quote: QuoteData;
  frame: number;
  startDelay: number;
}> = ({ quote, frame, startDelay }) => {
  const itemFrame = Math.max(0, frame - startDelay - 15);

  const opacity = interpolate(itemFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const y = interpolate(itemFrame, [0, 20], [40, 0], {
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
        top: 260,
        left: '50%',
        transform: `translate(-50%, ${y}px) scale(${0.95 + scale * 0.05})`,
        opacity,
        maxWidth: 1000,
        padding: `${SIZES.spacing.lg}px ${SIZES.spacing.xl}px`,
        backgroundColor: `${COLORS.backgroundElevated}90`,
        borderRadius: SIZES.radius.lg,
        border: `1px solid ${COLORS.backgroundSecondary}`,
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* 左侧指示条 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 4,
          height: '60%',
          backgroundColor: COLORS.primary,
          borderRadius: '0 2px 2px 0',
        }}
      />
      {/* 引号装饰 */}
      <div
        style={{
          fontSize: SIZES.h2,
          fontFamily: FONTS.display,
          color: COLORS.primary,
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
          fontSize: SIZES.body,
          fontFamily: FONTS.text,
          color: COLORS.text,
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}
      >
        {quote.text}
      </div>
      {/* 来源 */}
      {quote.source && (
        <div
          style={{
            marginTop: SIZES.spacing.md,
            fontSize: SIZES.caption,
            fontFamily: FONTS.text,
            color: COLORS.textSecondary,
          }}
        >
          —— {quote.source}
        </div>
      )}
    </div>
  );
};

// 高亮标题组件
const HighlightedTitle: React.FC<{
  title: string;
  highlightWords?: Record<string, keyof typeof EXTENDED_COLORS>;
  isTitleMode?: boolean;
  frame: number;
  startDelay: number;
}> = ({ title, highlightWords, isTitleMode = false, frame, startDelay }) => {
  const itemFrame = Math.max(0, frame - startDelay);

  const opacity = interpolate(itemFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const y = interpolate(itemFrame, [0, 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 解析标题，应用高亮
  const renderTitle = () => {
    if (!highlightWords) {
      return (
        <span style={{ color: COLORS.text }}>{title}</span>
      );
    }

    const parts: React.ReactNode[] = [];
    let remainingText = title;
    let keyIndex = 0;

    Object.entries(highlightWords).forEach(([word, colorKey]) => {
      const color = EXTENDED_COLORS[colorKey] || COLORS.primary;
      const index = remainingText.indexOf(word);
      if (index !== -1) {
        if (index > 0) {
          parts.push(
            <span key={`text-${keyIndex++}`}>
              {remainingText.slice(0, index)}
            </span>
          );
        }
        parts.push(
          <span
            key={`highlight-${keyIndex++}`}
            style={{
              color,
              textShadow: `0 0 40px ${color}60`,
              fontWeight: 800,
            }}
          >
            {word}
          </span>
        );
        remainingText = remainingText.slice(index + word.length);
      }
    });

    if (remainingText) {
      parts.push(<span key={`text-${keyIndex++}`}>{remainingText}</span>);
    }

    return parts;
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: isTitleMode ? 200 : 120,
        left: '50%',
        transform: `translate(-50%, ${y}px)`,
        opacity,
        textAlign: 'center',
        maxWidth: 1600,
        padding: '0 40px',
        width: '100%',
      }}
    >
      <h1
        style={{
          fontSize: isTitleMode ? SIZES.h2 : SIZES.h3,
          fontFamily: FONTS.display,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.4,
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {renderTitle()}
      </h1>
    </div>
  );
};

// 主组件
export const CausalGraph: React.FC<CausalGraphProps> = ({
  title,
  subtitle,
  highlightWords,
  nodes = [],
  edges = [],
  quote,
  showParticles = true,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 判断是否是标题模式（无节点时，标题更大）
  const isTitleMode = nodes.length === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 粒子网络背景 */}
      {showParticles && <ParticleNetwork frame={frame} startDelay={startDelay} />}

      {/* 标题 */}
      {title && (
        <HighlightedTitle
          title={title}
          highlightWords={highlightWords}
          isTitleMode={isTitleMode}
          frame={frame}
          startDelay={startDelay + 10}
        />
      )}

      {/* 副标题 */}
      {subtitle && (
        <div
          style={{
            position: 'absolute',
            top: isTitleMode ? 300 : 190,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: interpolate(frame - startDelay - 25, [0, 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span
            style={{
              fontSize: SIZES.body,
              fontFamily: FONTS.text,
              color: COLORS.textSecondary,
            }}
          >
            {subtitle}
          </span>
        </div>
      )}

      {/* 引用卡片 */}
      {quote && <QuoteCard quote={quote} frame={frame} startDelay={startDelay} />}

      {/* 因果节点 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {nodes.map((node, index) => (
          <Node
            key={node.id}
            node={node}
            index={index}
            frame={frame}
            fps={fps}
            startDelay={startDelay + 30}
          />
        ))}
      </div>

      {/* 连接线 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {edges.map((edge, index) => (
          <Edge
            key={`${edge.from}-${edge.to}-${index}`}
            edge={edge}
            nodes={nodes}
            index={index}
            frame={frame}
            startDelay={startDelay + 40}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default CausalGraph;
