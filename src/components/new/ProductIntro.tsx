// ProductIntro - 产品介绍组件
// 支持两种变体：图标型（APP/工具推荐）和预览型（功能展示）
// 设计参考：通用的软件推荐视频布局

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

// ============ 类型定义 ============

export interface TagItem {
  text: string;
  prefix?: string; // 前缀符号，如 "+"、"•"
}

export interface ProductInfo {
  category: string; // 分类，如 "语音转文字"
  name: string; // 产品名，如 "闪电说"
  subtitle: string; // 副标题，如 "速度快、功能强、多API支持"
  tags: TagItem[]; // 顶部横向标签
  featureTags?: string[]; // 中部特性标签
  featureList?: string[]; // 特性列表（预览型用）
}

export interface ProductIntroProps {
  // 编号和页面信息
  index: number; // 序号，如 1, 2, 3
  totalCount?: number; // 总数量，用于进度指示

  // 产品信息
  product: ProductInfo;

  // 布局变体
  variant: 'icon' | 'preview';

  // 变体 A: 图标型
  icon?: React.ReactNode; // 图标元素
  iconBgColor?: string; // 图标背景色
  showAudioWave?: boolean; // 是否显示音波动画

  // 变体 B: 预览型
  previewImage?: string; // 预览图URL
  previewContent?: React.ReactNode; // 自定义预览内容

  // 底部动态文字
  rotatingTexts?: string[]; // 轮播文字，如 ["说话", "打字效率高"]

  // 右侧角标
  cornerTag?: string; // 右上角标签，如 "完全免费"

  // 动画配置
  startDelay?: number;
}

// ============ 子组件 ============

// 音波动画组件
const AudioWave: React.FC<{ frame: number; color: string }> = ({ frame, color }) => {
  const bars = 8;
  const barWidth = 4;
  const gap = 3;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: gap,
        height: 24,
      }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        // 每个柱子有不同的相位和频率
        const phase = (i * Math.PI) / 4;
        const speed = 0.15 + i * 0.02;
        const height = interpolate(
          Math.sin(frame * speed + phase),
          [-1, 1],
          [4, 20],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: height,
              backgroundColor: color,
              borderRadius: 2,
              opacity: 0.6 + Math.sin(frame * speed + phase) * 0.4,
            }}
          />
        );
      })}
    </div>
  );
};

// 编号标签组件（左上角）
const IndexTag: React.FC<{
  index: number;
  category: string;
  name: string;
  frame: number;
  themeColor: string;
}> = ({ index, category, name, frame, themeColor }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const x = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = spring({
    frame,
    fps: 30,
    config: SPRING_PRESETS.snappy,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: 80,
        display: 'flex',
        alignItems: 'center',
        gap: SIZES.spacing.md,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
      }}
    >
      {/* 序号圆圈 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 16px',
          backgroundColor: `${COLORS.backgroundElevated}80`,
          borderRadius: SIZES.radius.lg,
          border: `1px solid ${COLORS.backgroundSecondary}`,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            backgroundColor: themeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.background,
            fontFamily: FONTS.mono,
          }}
        >
          {String(index).padStart(2, '0')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 11,
              color: COLORS.textTertiary,
              fontFamily: FONTS.text,
              letterSpacing: '0.5px',
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: 14,
              color: COLORS.text,
              fontFamily: FONTS.display,
              fontWeight: 600,
            }}
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

// 右上角标签
const CornerTag: React.FC<{ text: string; frame: number }> = ({ text, frame }) => {
  const opacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame: frame - 10,
    fps: 30,
    config: SPRING_PRESETS.bouncy,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        right: 80,
        padding: '12px 24px',
        backgroundColor: `${COLORS.backgroundElevated}60`,
        borderRadius: SIZES.radius.lg,
        border: `1px solid ${COLORS.backgroundSecondary}`,
        opacity,
        transform: `scale(${0.9 + scale * 0.1})`,
      }}
    >
      <span
        style={{
          fontSize: SIZES.h3,
          color: COLORS.text,
          fontFamily: FONTS.display,
          fontWeight: 600,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// 顶部横向标签组
const TopTags: React.FC<{ tags: TagItem[]; frame: number; startDelay: number; themeColor: string }> = ({
  tags,
  frame,
  startDelay,
  themeColor,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: SIZES.spacing.md,
        justifyContent: 'center',
        marginBottom: SIZES.spacing.xxl,
      }}
    >
      {tags.map((tag, i) => {
        const itemFrame = Math.max(0, frame - startDelay - i * 5);
        const opacity = interpolate(itemFrame, [0, 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const y = interpolate(itemFrame, [0, 15], [-15, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });
        const scale = spring({
          frame: itemFrame,
          fps: 30,
          config: SPRING_PRESETS.snappy,
        });

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              backgroundColor: `${COLORS.backgroundElevated}40`,
              borderRadius: SIZES.radius.xl,
              border: `1px solid ${COLORS.backgroundSecondary}`,
              opacity,
              transform: `translateY(${y}px) scale(${0.95 + scale * 0.05})`,
            }}
          >
            {tag.prefix && (
              <span style={{ color: themeColor, fontSize: 12 }}>{tag.prefix}</span>
            )}
            <span
              style={{
                fontSize: SIZES.caption,
                color: COLORS.textSecondary,
                fontFamily: FONTS.text,
              }}
            >
              {tag.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// 图标展示区（变体 A）
const IconDisplay: React.FC<{
  icon: React.ReactNode;
  bgColor: string;
  frame: number;
  showAudioWave: boolean;
}> = ({ icon, bgColor, frame, showAudioWave }) => {
  const mainScale = spring({
    frame: frame - 20,
    fps: 30,
    config: SPRING_PRESETS.heavy,
  });

  const glowOpacity = interpolate(frame, [20, 40, 60], [0, 0.6, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.spacing.xl,
      }}
    >
      {/* 图标容器 */}
      <div
        style={{
          position: 'relative',
          width: 200,
          height: 200,
          transform: `scale(${0.8 + mainScale * 0.2})`,
        }}
      >
        {/* 光晕背景 */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            background: `radial-gradient(circle, ${bgColor}${Math.floor(glowOpacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
        {/* 图标背景 */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            borderRadius: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 60px ${bgColor}40`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 内部光效 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
            }}
          />
          {icon}
        </div>
      </div>

      {/* 音波动画 */}
      {showAudioWave && (
        <div style={{ opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: 'clamp' }) }}>
          <AudioWave frame={frame} color={bgColor} />
        </div>
      )}
    </div>
  );
};

// 预览展示区（变体 B）
const PreviewDisplay: React.FC<{
  previewImage?: string;
  previewContent?: React.ReactNode;
  frame: number;
}> = ({ previewImage, previewContent, frame }) => {
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const x = interpolate(frame, [20, 40], [-50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = spring({
    frame: frame - 20,
    fps: 30,
    config: SPRING_PRESETS.smooth,
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px) scale(${0.95 + scale * 0.05})`,
      }}
    >
      {previewContent || (
        <div
          style={{
            width: 280,
            height: 400,
            backgroundColor: COLORS.backgroundElevated,
            borderRadius: SIZES.radius.xxl,
            border: `1px solid ${COLORS.backgroundSecondary}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {previewImage ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLORS.backgroundSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.textSecondary,
                fontSize: SIZES.caption,
              }}
            >
              预览图片
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.textSecondary,
                fontSize: SIZES.body,
              }}
            >
              预览区域
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 右侧信息区
const InfoPanel: React.FC<{
  product: ProductInfo;
  frame: number;
  startDelay: number;
  themeColor: string;
}> = ({ product, frame, startDelay, themeColor }) => {
  const categoryOpacity = interpolate(frame - startDelay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleSpring = spring({
    frame: frame - startDelay - 5,
    fps: 30,
    config: SPRING_PRESETS.bouncy,
  });

  const subtitleOpacity = interpolate(frame - startDelay - 15, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SIZES.spacing.lg,
        maxWidth: 500,
      }}
    >
      {/* 分类标签 */}
      <div
        style={{
          fontSize: SIZES.body,
          color: themeColor,
          fontFamily: FONTS.text,
          letterSpacing: '2px',
          opacity: categoryOpacity,
        }}
      >
        {product.category}
      </div>

      {/* 产品名称 */}
      <h2
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: COLORS.text,
          fontFamily: FONTS.display,
          letterSpacing: '-1px',
          lineHeight: 1.1,
          margin: 0,
          transform: `scale(${0.9 + titleSpring * 0.1}) translateY(${(1 - titleSpring) * 20}px)`,
          opacity: interpolate(frame - startDelay - 5, [0, 15], [0, 1], { extrapolateLeft: 'clamp' }),
        }}
      >
        {product.name}
      </h2>

      {/* 副标题 */}
      <p
        style={{
          fontSize: SIZES.h4,
          color: COLORS.textSecondary,
          fontFamily: FONTS.text,
          lineHeight: 1.5,
          margin: 0,
          opacity: subtitleOpacity,
        }}
      >
        {product.subtitle}
      </p>

      {/* 特性标签 */}
      {product.featureTags && product.featureTags.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: SIZES.spacing.md,
            marginTop: SIZES.spacing.md,
            flexWrap: 'wrap',
          }}
        >
          {product.featureTags.map((tag, i) => {
            const itemFrame = Math.max(0, frame - startDelay - 25 - i * 5);
            const opacity = interpolate(itemFrame, [0, 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const scale = spring({
              frame: itemFrame,
              fps: 30,
              config: SPRING_PRESETS.snappy,
            });

            return (
              <div
                key={i}
                style={{
                  padding: '10px 20px',
                  backgroundColor: `${themeColor}15`,
                  borderRadius: SIZES.radius.xl,
                  border: `1px solid ${themeColor}30`,
                  opacity,
                  transform: `scale(${0.9 + scale * 0.1})`,
                }}
              >
                <span
                  style={{
                    fontSize: SIZES.body,
                    color: COLORS.text,
                    fontFamily: FONTS.display,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 特性列表 */}
      {product.featureList && product.featureList.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: `${SIZES.spacing.lg}px 0 0 0`,
            display: 'flex',
            flexDirection: 'column',
            gap: SIZES.spacing.md,
          }}
        >
          {product.featureList.map((item, i) => {
            const itemFrame = Math.max(0, frame - startDelay - 25 - i * 4);
            const opacity = interpolate(itemFrame, [0, 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const x = interpolate(itemFrame, [0, 12], [-20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });

            return (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SIZES.spacing.md,
                  opacity,
                  transform: `translateX(${x}px)`,
                }}
              >
                <span style={{ color: themeColor, fontSize: 18 }}>•</span>
                <span
                  style={{
                    fontSize: SIZES.h4,
                    color: COLORS.text,
                    fontFamily: FONTS.text,
                  }}
                >
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// 底部进度和轮播文字
const BottomBar: React.FC<{
  rotatingTexts?: string[];
  index: number;
  totalCount: number;
  frame: number;
  themeColor: string;
  productName: string;
}> = ({ rotatingTexts, index, totalCount, frame, themeColor, productName }) => {
  const opacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 进度条宽度
  const progress = (index / totalCount) * 100;
  const progressWidth = interpolate(frame, [50, 80], [0, progress], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 轮播文字动画
  const getCurrentText = () => {
    if (!rotatingTexts || rotatingTexts.length === 0) return null;
    const cycleDuration = 60; // 2秒一个周期
    const currentIndex = Math.floor(frame / cycleDuration) % rotatingTexts.length;
    return rotatingTexts[currentIndex];
  };

  const currentText = getCurrentText();
  const textOpacity = interpolate(frame % 60, [0, 10, 50, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: 80,
        right: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.spacing.lg,
        opacity,
      }}
    >
      {/* 轮播文字 */}
      {currentText && (
        <div
          style={{
            fontSize: SIZES.h3,
            color: themeColor,
            fontFamily: FONTS.display,
            fontWeight: 600,
            opacity: textOpacity,
            transform: `scale(${0.95 + textOpacity * 0.05})`,
          }}
        >
          {currentText}
        </div>
      )}

      {/* 底部信息条 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: SIZES.spacing.md,
          width: '100%',
        }}
      >
        <span
          style={{
            fontSize: SIZES.caption,
            color: themeColor,
            fontFamily: FONTS.display,
            fontWeight: 600,
          }}
        >
          {productName}
        </span>
        <div
          style={{
            flex: 1,
            height: 3,
            backgroundColor: COLORS.backgroundElevated,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressWidth}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${themeColor}, ${COLORS.primary})`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// 分页指示器（右上角）
const PageIndicators: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        right: 80,
        display: 'flex',
        gap: 6,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: i === index - 1 ? COLORS.primary : COLORS.backgroundElevated,
            transition: 'background-color 0.3s',
          }}
        />
      ))}
    </div>
  );
};

// ============ 主组件 ============

export const ProductIntro: React.FC<ProductIntroProps> = ({
  index,
  totalCount = 4,
  product,
  variant,
  icon,
  iconBgColor = COLORS.extended.orange,
  showAudioWave = true,
  previewImage,
  previewContent,
  rotatingTexts,
  cornerTag,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig(); // 保持 hook 调用但不使用返回值

  // 使用图标背景色作为主题色
  const themeColor = iconBgColor;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        padding: `${120}px ${80}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景渐变 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 40% at 30% 50%, ${themeColor}08 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 70% 70%, ${COLORS.primary}05 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* 编号标签 */}
      <IndexTag
        index={index}
        category={product.category}
        name={product.name}
        frame={frame - startDelay}
        themeColor={themeColor}
      />

      {/* 右上角标签或分页指示器 */}
      {cornerTag ? (
        <CornerTag text={cornerTag} frame={frame - startDelay} />
      ) : (
        <PageIndicators index={index} total={totalCount} />
      )}

      {/* 主内容区 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 顶部标签组 */}
        <TopTags
          tags={product.tags}
          frame={frame - startDelay}
          startDelay={10}
          themeColor={themeColor}
        />

        {/* 中间展示区 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 100,
            marginTop: SIZES.spacing.xl,
          }}
        >
          {/* 左侧展示区 */}
          {variant === 'icon' ? (
            <IconDisplay
              icon={icon || <DefaultIcon color={COLORS.background} />}
              bgColor={iconBgColor}
              frame={frame - startDelay}
              showAudioWave={showAudioWave}
            />
          ) : (
            <PreviewDisplay
              previewImage={previewImage}
              previewContent={previewContent}
              frame={frame - startDelay}
            />
          )}

          {/* 右侧信息区 */}
          <InfoPanel
            product={product}
            frame={frame - startDelay}
            startDelay={15}
            themeColor={themeColor}
          />
        </div>
      </div>

      {/* 底部栏 */}
      <BottomBar
        rotatingTexts={rotatingTexts}
        index={index}
        totalCount={totalCount}
        frame={frame - startDelay}
        themeColor={themeColor}
        productName={product.name}
      />
    </AbsoluteFill>
  );
};

// 默认图标
const DefaultIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default ProductIntro;
