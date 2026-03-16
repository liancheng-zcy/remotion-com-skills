// Remotion 产品介绍视频 - 完整场景组合
// 视频结构：开场 -> 章节 -> 5大特性 -> 代码演示 -> 结尾CTA

import React from 'react';
import {
  AbsoluteFill,
  Series,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  spring,
} from 'remotion';
import {
  HeroTitle,
  SectionTitle,
  FeatureGrid,
  CodeTerminal,
  LightSweep,
  ArrowRight,
} from '../../components/new';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';
import { SPRING_PRESETS } from '../../design-system/animations';

// ============================================
// Scene 1: 开场大标题 (0-4s)
// ============================================
export const IntroHero: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <HeroTitle
        title="Remotion"
        subtitle="用 React 创造视频"
        tags={["程序化视频", "React 生态", "开发者首选"]}
      />
    </AbsoluteFill>
  );
};

// ============================================
// Scene 2: 章节引入 (4-8s)
// ============================================
export const IntroSection: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <SectionTitle
        sectionNumber={1}
        title="为什么选择 Remotion？"
        description="5 大核心特性，重新定义视频创作"
      />
    </AbsoluteFill>
  );
};

// ============================================
// Scene 3: 5大特性展示 (8-18s)
// ============================================
export const IntroFeatures: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <FeatureGrid
        features={[
          {
            icon: 'code',
            title: 'React 驱动',
            description: '使用熟悉的 React 语法和组件化思维创建视频，无需学习新工具',
          },
          {
            icon: 'zap',
            title: '程序化动画',
            description: '精确的帧级动画控制，spring 物理动画、interpolate 插值随心所欲',
          },
          {
            icon: 'lock',
            title: 'TypeScript 支持',
            description: '完整的类型安全，智能提示和自动补全，让开发更高效',
          },
          {
            icon: 'copy',
            title: '组件化复用',
            description: '像搭积木一样组合视频组件，一次开发，多处复用',
          },
          {
            icon: 'star',
            title: '高质量输出',
            description: '支持 4K、60fps、透明通道，专业级视频渲染品质',
          },
        ]}
        columns={3}
      />
    </AbsoluteFill>
  );
};

// ============================================
// Scene 4: 代码演示 (18-28s)
// ============================================
export const IntroCodeDemo: React.FC = () => {
  const code = `import { useCurrentFrame, interpolate } from 'remotion';

export const MyVideo = () => {
  const frame = useCurrentFrame();

  // 动画随时间变化
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <div style={{ opacity }}>
      Hello Remotion!
    </div>
  );
};`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px',
      }}
    >
      <div
        style={{
          fontSize: '56px',
          fontFamily: FONTS.display,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        代码即视频
      </div>
      <CodeTerminal
        code={code}
        language="typescript"
        filename="MyVideo.tsx"
        typingSpeed={0.8}
        showLineNumbers={true}
      />
    </AbsoluteFill>
  );
};

// ============================================
// Scene 5: 结尾CTA (28-33s)
// ============================================
export const IntroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame: frame - 10,
    fps,
    config: SPRING_PRESETS.bouncy,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      {/* 主标题 */}
      <div
        style={{
          fontSize: SIZES.h1,
          fontFamily: FONTS.display,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        开始用代码创造视频
      </div>

      {/* 命令行 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 40px',
          backgroundColor: COLORS.backgroundElevated,
          borderRadius: '16px',
          border: `1px solid ${COLORS.primary}40`,
          transform: `scale(${0.9 + scale * 0.1})`,
        }}
      >
        <div
          style={{
            fontSize: SIZES.h3,
            fontFamily: FONTS.mono,
            color: COLORS.primary,
            fontWeight: 600,
          }}
        >
          npx create-video@latest
        </div>
        <ArrowRight size={32} color={COLORS.primary} strokeWidth={2} />
      </div>

      {/* 官网链接 */}
      <div
        style={{
          marginTop: '40px',
          fontSize: SIZES.body,
          fontFamily: FONTS.text,
          color: COLORS.textSecondary,
        }}
      >
        remotion.dev
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// 完整视频合成 (使用 Series 串联所有场景)
// ============================================
export const RemotionIntroVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Series>
        {/* Scene 1: 开场 - 4秒 */}
        <Series.Sequence durationInFrames={4 * fps}>
          <IntroHero />
        </Series.Sequence>

        {/* Transition: LightSweep */}
        <Series.Sequence durationInFrames={fps}>
          <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
            <IntroHero />
          </AbsoluteFill>
          <LightSweep duration={30} height={1080} />
        </Series.Sequence>

        {/* Scene 2: 章节引入 - 4秒 */}
        <Series.Sequence durationInFrames={4 * fps}>
          <IntroSection />
        </Series.Sequence>

        {/* Transition: LightSweep (替代 Fade) */}
        <Series.Sequence durationInFrames={fps}>
          <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
            <IntroSection />
          </AbsoluteFill>
          <LightSweep duration={30} height={1080} />
        </Series.Sequence>

        {/* Scene 3: 5大特性 - 10秒 */}
        <Series.Sequence durationInFrames={10 * fps}>
          <IntroFeatures />
        </Series.Sequence>

        {/* Transition: LightSweep */}
        <Series.Sequence durationInFrames={fps}>
          <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
            <IntroFeatures />
          </AbsoluteFill>
          <LightSweep duration={30} height={1080} />
        </Series.Sequence>

        {/* Scene 4: 代码演示 - 10秒 */}
        <Series.Sequence durationInFrames={10 * fps}>
          <IntroCodeDemo />
        </Series.Sequence>

        {/* Transition: LightSweep (替代 Fade) */}
        <Series.Sequence durationInFrames={fps}>
          <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
            <IntroCodeDemo />
          </AbsoluteFill>
          <LightSweep duration={30} height={1080} />
        </Series.Sequence>

        {/* Scene 5: CTA - 5秒 */}
        <Series.Sequence durationInFrames={5 * fps}>
          <IntroCTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

// ============================================
// 导出单个场景供独立预览
// ============================================
export const RemotionIntroHero = IntroHero;
export const RemotionIntroSection = IntroSection;
export const RemotionIntroFeatures = IntroFeatures;
export const RemotionIntroCodeDemo = IntroCodeDemo;
export const RemotionIntroCTA = IntroCTA;
