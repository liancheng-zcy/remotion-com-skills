# Remotion 科技视频组件库

<p align="center">
  <img src="https://img.shields.io/badge/Remotion-4.0-007AFF?style=flat-square" alt="Remotion 4.0">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square" alt="TypeScript 5.0">
  <img src="https://img.shields.io/badge/Style-Apple-000000?style=flat-square" alt="Apple Style">
</p>

专业的 Remotion 视频组件库，打造 **苹果风格** + **影视飓风质感** 的科技类视频内容。

**目标**: 面向 AI 科技区 Up 主的可复用组件库，开箱即用。

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动预览 (http://localhost:3000)
npm run dev

# 渲染视频
npx remotion render src/index.ts <CompositionID> out/video.mp4

# 升级 Remotion
npx remotion upgrade
```

---

## 组件库标准

### 设计理念

- **Apple 风格**: 纯黑背景 (#000000) + 苹果蓝主色 (#007AFF)
- **有机动画**: Spring 物理动画，避免机械感
- **专业图标**: 50+ SVG 图标，禁止 emoji
- **大字号设计**: Hero 120px，H1 88px，确保视频冲击力

### 设计系统 (`src/design-system/`)

| 文件 | 内容 |
|------|------|
| `tokens.ts` | 颜色、字体、尺寸、间距常量 |
| `animations.ts` | Spring 预设、入场动画、缓动函数 |

**颜色规范**:
```tsx
import { COLORS } from './design-system/tokens';
// 背景: #000000
// 主色: #007AFF
// 卡片: #1C1C1E
// 主文字: #FFFFFF
// 次文字: #8E8E93
```

**字体规范**:
```tsx
import { FONTS } from './design-system/tokens';
// Display: SF Pro Display (标题)
// Text: SF Pro Text (正文)
// Mono: JetBrains Mono (代码)
```

---

## 组件目录

### 核心组件 (`src/components/new/`)

#### 1. HeroTitle - 大标题开场
大标题开场组件，带光晕扫过效果和标签组。

```tsx
import { HeroTitle } from './components/new';

<HeroTitle
  title="OpenClaw"
  subtitle="完全新手指南"
  tags={["AI 编码助手", "开源免费", "自托管部署"]}
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | 必填 | 主标题 |
| subtitle | string | - | 副标题 |
| tags | string[] | [] | 标签数组 |
| titleDelay | number | 5 | 标题动画延迟(帧) |
| subtitleDelay | number | 25 | 副标题延迟(帧) |

---

#### 2. SectionTitle - 章节标题
带序号、进度条和左侧指示器的章节标题。

```tsx
import { SectionTitle } from './components/new';

<SectionTitle
  sectionNumber={1}
  title="什么是 OpenClaw?"
  progress={0.3}
/>
```

---

#### 3. CodeTerminal - 代码终端
macOS 终端风格的代码展示，支持逐行输入动画和语法高亮。

```tsx
import { CodeTerminal } from './components/new';

<CodeTerminal
  code={`npm install -g openclaw`}
  language="bash"
  filename="install.sh"
  typingSpeed={1}
  showLineNumbers={true}
/>
```

---

#### 4. AnimatedList - 动画列表
带动画效果的列表组件，支持图标和多种样式变体。

```tsx
import { AnimatedList } from './components/new';

<AnimatedList
  items={[
    { title: '特性一', description: '描述文字', icon: 'zap' },
    { title: '特性二', description: '描述文字', icon: 'lock' },
  ]}
  variant="card" // 'default' | 'card' | 'minimal'
/>
```

---

#### 5. FeatureCard / FeatureGrid - 特性卡片
特性展示卡片，支持网格布局。

```tsx
import { FeatureCard, FeatureGrid } from './components/new';

<FeatureGrid
  features={[
    { icon: 'zap', title: '极速响应', description: '...' },
    { icon: 'lock', title: '隐私安全', description: '...' },
  ]}
  columns={3}
/>
```

---

#### 6. MetricCard / MetricRow - 数据指标
带数字滚动动画的数据指标卡片。

```tsx
import { MetricCard, MetricRow } from './components/new';

<MetricRow>
  <MetricCard value={99.9} suffix="%" label="准确率" />
  <MetricCard value={1000} prefix="¥" label="节省金额" />
</MetricRow>
```

---

#### 7. TypewriterText - 打字机文字
逐字显示文字，模拟打字效果。

```tsx
import { TypewriterText, TypewriterScene } from './components/new';

<TypewriterScene
  title="核心观点"
  text="人工智能技术正在改变软件开发的方式..."
  speed={2}
/>
```

---

#### 8. DataTable / ProgressTable - 数据表格
支持逐行显现动画和高亮的数据表格。

```tsx
import { DataTable } from './components/new';

<DataTable
  columns={[
    { key: 'name', title: '名称' },
    { key: 'value', title: '数值', align: 'right' },
  ]}
  data={[{ name: '项目A', value: '100%' }]}
  highlightRow={0}
/>
```

---

#### 9. HighlightQuote / DataHighlight - 高亮引用
引用卡片和数据高亮展示。

```tsx
import { HighlightQuote } from './components/new';

<HighlightQuote
  quote="人工智能将改变一切"
  source="科技日报"
  highlightWords={{ "人工智能": "primary", "改变": "warning" }}
/>
```

---

#### 10. CommentBubble / CommentBarrage - 弹幕评论
评论气泡和弹幕效果组件。

```tsx
import { CommentBarrage, BottomComment } from './components/new';

<CommentBarrage
  comments={[
    { text: '太棒了！', user: '用户A', avatar: '...' },
  ]}
/>
```

---

#### 11. CausalGraph - 因果关系图谱
知识图谱、因果关系展示，支持节点、连线和粒子背景。

```tsx
import { CausalGraph } from './components/new';

<CausalGraph
  title="问题分析"
  nodes={[
    { id: '1', label: '问题A', color: 'error', x: 0.2, y: 0.3 },
    { id: '2', label: '原因B', color: 'warning', x: 0.8, y: 0.7 },
  ]}
  edges={[
    { from: '1', to: '2', label: '导致', type: 'cause' },
  ]}
  showParticles={true}
/>
```

---

#### 12. Transitions - 转场效果
5 种专业转场效果。

```tsx
import {
  FadeTransition,
  SlideTransition,
  LightSweep,
  ZoomBlurTransition,
  CurtainReveal,
} from './components/new';

// 使用示例
<LightSweep duration={30} height={1080} />
```

| 转场 | 效果 |
|------|------|
| FadeTransition | 淡入淡出 |
| SlideTransition | 滑动切换 |
| LightSweep | 光扫过效果 |
| ZoomBlurTransition | 缩放模糊 |
| CurtainReveal | 幕布揭开 |

**注意**: LightSweep 需要指定 `height` 参数避免透明问题。

---

#### 12. ComparisonCards - 对比卡片组
展示两个或多个概念的对比，如"被选择 vs 被淘汰"，带粒子背景和动画效果。

```tsx
import { ComparisonCards } from './components/new';

<ComparisonCards
  title="优胜劣汰"
  subtitle="自然选择"
  highlightWords={{
    '优胜': 'green',
    '劣汰': 'red',
  }}
  items={[
    {
      label: '被选择',
      description: '胶囊被更多人正确使用',
      color: 'success',
      details: ['优点1', '优点2']
    },
    {
      label: '被淘汰',
      description: '胶囊无法被正确使用',
      color: 'error',
    },
  ]}
  footer="贡献者获得相应收益"
  showParticles={true}
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 主标题（支持关键词高亮） |
| subtitle | string | - | 副标题 |
| items | ComparisonItem[] | 必填 | 对比项数组 |
| footer | string | - | 底部说明文字 |
| highlightWords | object | - | 关键词高亮映射 |
| showParticles | boolean | true | 是否显示粒子背景 |

---

#### 13. ProcessFlow - 流程步骤
展示工作流程、处理步骤，支持横向/纵向布局，带进度指示器。

```tsx
import { ProcessFlow } from './components/new';

// 横向流程
<ProcessFlow
  title="Agent 工作流程"
  steps={[
    { label: '接收任务', description: '解析用户意图', status: 'complete' },
    { label: '规划步骤', status: 'complete' },
    { label: '执行操作', status: 'active' },
    { label: '返回结果', status: 'pending' },
  ]}
  direction="horizontal"
  showProgress={true}
/>

// 纵向流程
<ProcessFlow
  title="模型部署流程"
  steps={[...]}
  direction="vertical"
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 流程标题 |
| subtitle | string | - | 副标题 |
| steps | FlowStep[] | 必填 | 步骤数组 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 布局方向 |
| showProgress | boolean | true | 是否显示进度条 |

---

#### 14. EvolutionTree - 演进树
展示技术/概念的演进历程，适合"从XX到YY"的发展时间线，带突破点标记。

```tsx
import { EvolutionTree } from './components/new';

// 横向时间线
<EvolutionTree
  title="大模型发展历程"
  subtitle="从Transformer到GPT-4的技术演进"
  stages={[
    { year: '2017', name: 'Transformer', description: 'Attention机制', color: 'blue' },
    { year: '2018', name: 'BERT', description: '双向编码', color: 'purple', breakthrough: true },
    { year: '2020', name: 'GPT-3', description: '175B参数', color: 'green', breakthrough: true },
    { year: '2022', name: 'ChatGPT', description: '对话能力', color: 'orange', breakthrough: true },
  ]}
  direction="horizontal"
  showTimeline={true}
/>

// 纵向时间线
<EvolutionTree
  title="AI Agent 演进"
  stages={[...]}
  direction="vertical"
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 标题 |
| subtitle | string | - | 副标题 |
| stages | EvolutionStage[] | 必填 | 阶段数组 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 布局方向 |
| showTimeline | boolean | true | 是否显示时间线 |

---

#### 15. KnowledgeWeb - 知识网络
复杂知识网络关系图，支持中心节点+周围节点的网状结构，带连接线和标签。

```tsx
import { KnowledgeWeb } from './components/new';

<KnowledgeWeb
  title="AI Agent 技术栈"
  subtitle="核心组件与关联关系"
  centerNode={{ id: 'agent', label: 'Agent', color: 'primary', size: 'large' }}
  surroundingNodes={[
    { id: 'llm', label: 'LLM', color: 'blue', category: 'core' },
    { id: 'memory', label: 'Memory', color: 'purple', category: 'core' },
    { id: 'tools', label: 'Tools', color: 'green', category: 'extension' },
  ]}
  connections={[
    { from: 'agent', to: 'llm', label: '调用', color: 'blue' },
    { from: 'agent', to: 'memory', label: '存储', color: 'purple' },
    { from: 'agent', to: 'tools', label: '执行', color: 'green' },
  ]}
  showParticles={true}
/>
```

**Props**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 标题 |
| subtitle | string | - | 副标题 |
| centerNode | WebNode | - | 中心节点 |
| surroundingNodes | WebNode[] | 必填 | 周围节点数组 |
| connections | WebConnection[] | 必填 | 连接关系数组 |
| showParticles | boolean | true | 是否显示粒子背景 |

---

### 图标库 (`src/components/new/Icons.tsx`)

**50+ SVG 图标**，来源: Heroicons (MIT) + Lucide (ISC)，开源可商用。

**科技类**: Computer, Bot, Terminal, Code, Database, Network, Cpu, Cloud
**操作类**: Check, Plus, Minus, Close, ArrowRight, Download, Upload
**通用类**: User, File, Folder, Calendar, Clock, Settings, Zap, Lock

```tsx
import { Zap, Lock, Computer, IconProps } from './components/new/Icons';

<Zap size={24} color="#007AFF" strokeWidth={2} />
```

**重要**: 禁止使用 emoji，始终使用专业 SVG 图标。

---

## 动画规范

### 必须遵循

- ✅ 全部使用 `useCurrentFrame()` 驱动动画
- ✅ 使用 `spring()` 实现物理动画
- ✅ 使用 `interpolate()` 配合缓动函数
- ✅ 列表项错开动画使用帧延迟

### 禁止事项

- ❌ **禁止使用 CSS 动画** (Remotion 不支持)
- ❌ **禁止使用 Tailwind 动画类** (animate-*, transition-*)
- ❌ **禁止使用 emoji** (使用 SVG 图标)
- ❌ 避免机械计时，使用有机缓动

### 代码示例

```tsx
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Spring 动画
const scale = spring({
  frame,
  fps,
  config: { damping: 25, stiffness: 100 },
});

// 插值动画
const opacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateLeft: 'clamp',
  easing: Easing.out(Easing.quad),
});
```

---

## 项目结构

```
src/
├── design-system/          # 设计系统
│   ├── tokens.ts          # 设计常量
│   └── animations.ts      # 动画工具
├── components/new/         # 组件库
│   ├── index.ts           # 统一导出
│   ├── HeroTitle.tsx
│   ├── SectionTitle.tsx
│   ├── CodeTerminal.tsx
│   ├── AnimatedList.tsx
│   ├── FeatureCard.tsx
│   ├── MetricCard.tsx
│   ├── TypewriterText.tsx
│   ├── DataTable.tsx
│   ├── HighlightQuote.tsx
│   ├── CommentBubble.tsx
│   ├── CausalGraph.tsx
│   ├── Transitions.tsx
│   └── Icons.tsx          # 图标库
├── scenes/                # 场景组合
│   └── demo/
│       └── NewComponentsDemo.tsx
├── Root.tsx               # Composition 定义
└── index.ts               # 入口
```

---

## 开发指南

### 添加新组件

1. 在 `src/components/new/` 创建组件文件
2. 在 `src/components/new/index.ts` 导出
3. 使用设计系统常量 (`tokens.ts`)
4. 使用动画工具 (`animations.ts`)
5. 禁止使用 CSS 动画和 emoji

### 组件模板

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface MyComponentProps {
  title: string;
  startDelay?: number;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 动画逻辑
  const progress = spring({
    frame: frame - startDelay,
    fps,
    config: { damping: 25, stiffness: 100 },
  });

  return (
    <div style={{ backgroundColor: COLORS.background }}>
      <h1 style={{ fontFamily: FONTS.display, fontSize: SIZES.h1 }}>
        {title}
      </h1>
    </div>
  );
};
```

---

## 依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| remotion | 4.0.434 | 视频生成核心 |
| @remotion/transitions | latest | 场景转场 |
| react | 19.2.3 | UI 框架 |
| tailwindcss | 4.0.0 | 样式工具 |
| typescript | 5.0.0 | 类型系统 |

---

## 路线图

- [x] HeroTitle - 大标题开场
- [x] SectionTitle - 章节标题
- [x] CodeTerminal - 代码终端
- [x] AnimatedList - 动画列表
- [x] FeatureCard - 特性卡片
- [x] MetricCard - 数据指标
- [x] Transitions - 转场效果
- [x] Icons - 图标库 (50+)
- [x] TypewriterText - 打字机文字
- [x] DataTable - 数据表格
- [x] HighlightQuote - 高亮引用
- [x] CommentBubble - 弹幕评论
- [x] CausalGraph - 因果关系图谱
- [x] ComparisonCards - 对比卡片组
- [x] ProcessFlow - 流程步骤
- [x] EvolutionTree - 演进树
- [x] KnowledgeWeb - 知识网络
- [ ] AudioWaveform - 音频波形
- [ ] Chart components - 图表组件
- [ ] Voiceover sync - 配音同步
- [ ] Light leaks - 光晕效果

---

## License

组件库代码基于 MIT 协议开源。

图标来源:
- Heroicons (MIT License)
- Lucide (ISC License)

---

## 相关链接

- [Remotion 文档](https://www.remotion.dev/docs)
- [Remotion Discord](https://discord.gg/6VzzNDwUwV)
