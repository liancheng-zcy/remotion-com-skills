// DemoScenes - 新组件库演示场景

import { Composition, Folder } from 'remotion';
import {
  HeroTitle,
  SectionTitle,
  CodeTerminal,
  AnimatedList,
  FeatureGrid,
  MetricRow,
  FadeTransition,
  ZoomBlurTransition,
  LightSweep,
} from '../../components/new/index';

const FPS = 30;

// Demo 1: HeroTitle 展示
const DemoHeroTitle: React.FC = () => {
  return (
    <HeroTitle
      title="OpenClaw"
      subtitle="完全新手指南"
      tags={["AI 编码助手", "开源免费", "自托管部署"]}
    />
  );
};

// Demo 2: SectionTitle 展示
const DemoSectionTitle: React.FC = () => {
  return (
    <SectionTitle
      sectionNumber={2}
      title="为什么选择 自定义组件库+自定义skills"
      description="将通用的技巧，私有化标准化为自己的私有财富"
    />
  );
};

// Demo 3: CodeTerminal 展示
const DemoCodeTerminal: React.FC = () => {
  return (
    <CodeTerminal
      code={`# 给编码工具安装remotion-best-practices 
        npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices
        `}
      language="bash"
      filename="install-node.sh"
      typingSpeed={1}
      lineDelay={3}
      showLineNumbers={true}
    />
  );
};

// Demo 4: AnimatedList 展示
const DemoAnimatedList: React.FC = () => {
  return (
    <AnimatedList
      items={[
        {
          title: '闲置 Windows 电脑即可',
          description: '无需购买新设备，利用现有资源',
          icon: 'computer',
        },
        {
          title: '更适合运行 AI 助手系统',
          description: '原生支持，生态完善',
          icon: 'bot',
        },
        {
          title: '推荐系统：Ubuntu 22.04 LTS',
          description: '长期支持，稳定性好',
          icon: 'penguin',
        },
      ]}
      variant="card"
      startDelay={10}
    />
  );
};

// Demo 5: FeatureGrid 展示
const DemoFeatureGrid: React.FC = () => {
  return (
    <FeatureGrid
      features={[
        {
          icon: 'zap',
          title: '极速响应',
          description: '基于本地部署，响应速度快，无需等待',
        },
        {
          icon: 'lock',
          title: '隐私安全',
          description: '数据完全本地存储，不上传云端',
        },
        {
          icon: 'wrench',
          title: '高度可定制',
          description: '支持自定义技能、工作流和配置',
        },
      ]}
      columns={3}
    />
  );
};

// Demo 6: MetricRow 展示
const DemoMetricRow: React.FC = () => {
  return (
    <MetricRow
      metrics={[
        {
          value: 10000,
          suffix: '+',
          label: '活跃用户',
          description: '全球范围内',
        },
        {
          value: 99,
          suffix: '%',
          label: '正常运行时间',
          description: '企业级稳定性',
        },
        {
          value: 50,
          suffix: '+',
          label: '可用技能',
          description: '持续更新中',
        },
      ]}
    />
  );
};

// Demo 7: 转场效果演示（展示场景内入场/出场动画）
const DemoTransition: React.FC = () => {
  return (
    <FadeTransition duration={20}>
      <ZoomBlurTransition duration={25}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <LightSweep duration={45} height={1080} />
          <HeroTitle
            title="remotion-bese-practices + 自定义规范"
            subtitle="实现标准化 + 省时 + 产出"
          />
        </div>
      </ZoomBlurTransition>
    </FadeTransition>
  );
};

// 导出 Root 配置
export const DemoCompositions = () => {
  return (
    <>
      <Folder name="新组件库演示">
        <Composition
          id="DemoHeroTitle"
          component={DemoHeroTitle}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoSectionTitle"
          component={DemoSectionTitle}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoCodeTerminal"
          component={DemoCodeTerminal}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoAnimatedList"
          component={DemoAnimatedList}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoFeatureGrid"
          component={DemoFeatureGrid}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoMetricRow"
          component={DemoMetricRow}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoTransition"
          component={DemoTransition}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};

export {
  DemoHeroTitle,
  DemoSectionTitle,
  DemoCodeTerminal,
  DemoAnimatedList,
  DemoFeatureGrid,
  DemoMetricRow,
  DemoTransition,
};
