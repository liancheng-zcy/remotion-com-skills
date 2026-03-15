// ComparisonCards - 对比卡片组组件
// 用于展示两个或多个概念的对比，如"优点vs缺点"、"被选择vs被淘汰"

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

// 单个对比项
interface ComparisonItem {
  label: string;
  description?: string;
  color: keyof typeof COLOR_MAP;
  icon?: string;
  details?: string[];
}

// 组件 Props
interface ComparisonCardsProps {
  title?: string;
  subtitle?: string;
  items: ComparisonItem[];
  footer?: string;
  highlightWords?: Record<string, keyof typeof COLOR_MAP>;
  layout?: 'horizontal' | 'vertical';
  showParticles?: boolean;
  startDelay?: number;
}

// 粒子网络背景
const ParticleNetwork: React.FC<{ frame: number; startDelay: number }> = ({
  frame,
  startDelay,
}) => {
  // 生成固定随机位置
  const particles = React.useMemo(() => {
    const count = 25;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: ((i * 137.5) % 100) / 100, // 黄金角分布
      y: ((i * 73.3) % 100) / 100,
      size: 2 + (i % 3),
      opacity: 0.3 + (i % 5) * 0.1,
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
            const x1 = p1.x * 1920;
            const y1 = p1.y * 1080;
            const x2 = p2.x * 1920;
            const y2 = p2.y * 1080;
            const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            if (dist > 300) return null;
            const lineOpacity = (1 - dist / 300) * 0.2 * opacity;
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
        {/* 粒子点 */}
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

// 高亮标题组件
const HighlightedTitle: React.FC<{
  title: string;
  highlightWords?: Record<string, keyof typeof COLOR_MAP>;
  frame: number;
  startDelay: number;
}> = ({ title, highlightWords, frame, startDelay }) => {
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

  const scale = spring({
    frame: itemFrame,
    fps: 30,
    config: SPRING_PRESETS.bouncy,
  });

  // 解析标题，应用高亮
  const renderTitle = () => {
    if (!highlightWords) {
      return <span style={{ color: COLORS.text }}>{title}</span>;
    }

    const parts: React.ReactNode[] = [];
    let remainingText = title;
    let keyIndex = 0;

    Object.entries(highlightWords).forEach(([word, colorKey]) => {
      const color = COLOR_MAP[colorKey] || COLORS.primary;
      const index = remainingText.indexOf(word);
      if (index !== -1) {
        if (index > 0) {
          parts.push(
            <span key={`text-${keyIndex++}`}>{remainingText.slice(0, index)}</span>
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
        transform: `translateY(${y}px) scale(${0.95 + scale * 0.05})`,
        opacity,
        textAlign: 'center',
        marginBottom: SIZES.spacing.xl,
      }}
    >
      <h1
        style={{
          fontSize: SIZES.hero,
          fontFamily: FONTS.display,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {renderTitle()}
      </h1>
    </div>
  );
};

// 副标题组件
const Subtitle: React.FC<{
  subtitle: string;
  frame: number;
  startDelay: number;
}> = ({ subtitle, frame, startDelay }) => {
  const itemFrame = Math.max(0, frame - startDelay);

  const opacity = interpolate(itemFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        textAlign: 'center',
        opacity,
        marginBottom: SIZES.spacing.xxl,
      }}
    >
      <span
        style={{
          fontSize: SIZES.h3,
          fontFamily: FONTS.text,
          color: COLORS.textSecondary,
          letterSpacing: '0.1em',
        }}
      >
        {subtitle}
      </span>
    </div>
  );
};

// 对比卡片组件
const ComparisonCard: React.FC<{
  item: ComparisonItem;
  index: number;
  total: number;
  frame: number;
  fps: number;
  startDelay: number;
}> = ({ item, index, total, frame, fps, startDelay }) => {
  const color = COLOR_MAP[item.color] || COLORS.primary;
  const itemFrame = Math.max(0, frame - startDelay - index * 15);

  // 弹性入场
  const scale = spring({
    frame: itemFrame,
    fps,
    config: SPRING_PRESETS.bouncy,
  });

  const opacity = interpolate(itemFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const x = interpolate(itemFrame, [0, 20], [index === 0 ? -50 : 50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 呼吸效果
  const breathe = interpolate(
    (frame + index * 30) % 60,
    [0, 30, 60],
    [1, 1.02, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 计算卡片宽度
  const cardWidth = total === 2 ? 420 : 320;

  return (
    <div
      style={{
        width: cardWidth,
        transform: `translateX(${x}px) scale(${scale * breathe})`,
        opacity,
      }}
    >
      {/* 卡片光晕 */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          background: `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)`,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* 卡片主体 */}
      <div
        style={{
          position: 'relative',
          backgroundColor: `${COLORS.backgroundElevated}90`,
          borderRadius: SIZES.radius.xl,
          border: `2px solid ${color}60`,
          padding: `${SIZES.spacing.xl}px`,
          backdropFilter: 'blur(20px)',
          boxShadow: `0 0 40px ${color}20`,
        }}
      >
        {/* 顶部颜色条 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            borderRadius: `${SIZES.radius.xl}px ${SIZES.radius.xl}px 0 0`,
          }}
        />

        {/* 标签 */}
        <div
          style={{
            fontSize: SIZES.h2,
            fontFamily: FONTS.display,
            fontWeight: 700,
            color,
            textAlign: 'center',
            marginBottom: SIZES.spacing.md,
            textShadow: `0 0 30px ${color}60`,
          }}
        >
          {item.label}
        </div>

        {/* 描述 */}
        {item.description && (
          <div
            style={{
              fontSize: SIZES.body,
              fontFamily: FONTS.text,
              color: COLORS.text,
              textAlign: 'center',
              lineHeight: 1.6,
              marginBottom: SIZES.spacing.md,
            }}
          >
            {item.description}
          </div>
        )}

        {/* 详情列表 */}
        {item.details && item.details.length > 0 && (
          <div
            style={{
              marginTop: SIZES.spacing.md,
              paddingTop: SIZES.spacing.md,
              borderTop: `1px solid ${COLORS.backgroundSecondary}`,
            }}
          >
            {item.details.map((detail, i) => (
              <div
                key={i}
                style={{
                  fontSize: SIZES.caption,
                  fontFamily: FONTS.text,
                  color: COLORS.textSecondary,
                  marginBottom: SIZES.spacing.xs,
                  paddingLeft: SIZES.spacing.md,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color,
                  }}
                >
                  •
                </span>
                {detail}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// VS 标识
const VersusBadge: React.FC<{
  frame: number;
  startDelay: number;
}> = ({ frame, startDelay }) => {
  const itemFrame = Math.max(0, frame - startDelay);

  const scale = spring({
    frame: itemFrame,
    fps: 30,
    config: { damping: 10, stiffness: 150 },
  });

  const rotate = interpolate(itemFrame, [0, 30], [-180, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(2)),
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: COLORS.backgroundElevated,
          border: `2px solid ${COLORS.primary}60`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 20px ${COLORS.primary}40`,
        }}
      >
        <span
          style={{
            fontSize: SIZES.body,
            fontFamily: FONTS.display,
            fontWeight: 700,
            color: COLORS.primary,
          }}
        >
          VS
        </span>
      </div>
    </div>
  );
};

// 底部说明
const Footer: React.FC<{
  footer: string;
  frame: number;
  startDelay: number;
}> = ({ footer, frame, startDelay }) => {
  const itemFrame = Math.max(0, frame - startDelay);

  const opacity = interpolate(itemFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const y = interpolate(itemFrame, [0, 20], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        textAlign: 'center',
        opacity,
        transform: `translateY(${y}px)`,
        marginTop: SIZES.spacing.xxl,
      }}
    >
      <span
        style={{
          fontSize: SIZES.h4,
          fontFamily: FONTS.text,
          color: COLORS.warning,
          fontWeight: 500,
          textShadow: `0 0 20px ${COLORS.warning}40`,
        }}
      >
        {footer}
      </span>
    </div>
  );
};

// 主组件
export const ComparisonCards: React.FC<ComparisonCardsProps> = ({
  title,
  subtitle,
  items,
  footer,
  highlightWords,
  layout = 'horizontal',
  showParticles = true,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
      {/* 粒子背景 */}
      {showParticles && <ParticleNetwork frame={frame} startDelay={startDelay} />}

      {/* 标题区域 */}
      {title && (
        <HighlightedTitle
          title={title}
          highlightWords={highlightWords}
          frame={frame}
          startDelay={startDelay + 10}
        />
      )}

      {/* 副标题 */}
      {subtitle && <Subtitle subtitle={subtitle} frame={frame} startDelay={startDelay + 30} />}

      {/* 对比卡片容器 */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: layout === 'horizontal' ? 'row' : 'column',
          gap: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* VS 标识（只有两个项目时显示） */}
        {items.length === 2 && <VersusBadge frame={frame} startDelay={startDelay + 40} />}

        {/* 卡片 */}
        {items.map((item, index) => (
          <ComparisonCard
            key={index}
            item={item}
            index={index}
            total={items.length}
            frame={frame}
            fps={fps}
            startDelay={startDelay + 40}
          />
        ))}
      </div>

      {/* 底部说明 */}
      {footer && <Footer footer={footer} frame={frame} startDelay={startDelay + 80} />}
    </AbsoluteFill>
  );
};

export default ComparisonCards;
