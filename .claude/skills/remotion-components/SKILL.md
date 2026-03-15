# Remotion 组件库 Skill

## 概述

本 Skill 帮助用户基于私有 Remotion 组件库生成视频组件代码。设计风格：**Apple 极简 + 影视飓风质感**。

核心功能：

1. **优先匹配现有组件** - 18+ 已标准化组件
2. **按标准创建新组件** - 无法匹配时生成符合设计系统的新组件
3. **自然语言转换** - 将描述直接转为 Remotion 代码

### 设计理念

- **Apple 基因**：纯黑背景 (#000000) + 苹果蓝主色 (#007AFF) + SF Pro 字体
- **影视飓风质感**：深空配色、电影级光效、有机动画
- **星空主题支持**：扩展色板支持星云紫、极光绿、恒星黄等科幻配色
- **大字号冲击**：Hero 120px，H1 88px，确保视频冲击力

---

## 组件库快速映射表

当用户描述需求时，优先选择以下对应组件：

| 用户描述关键词 | 使用组件 | 导入路径 |
|--------------|---------|---------|
| "大标题" "开场" "封面" | `HeroTitle` | `src/components/new` |
| "章节标题" "第N节" "进度" | `SectionTitle` | `src/components/new` |
| "代码" "终端" "命令行" | `CodeTerminal` | `src/components/new` |
| "列表" "条目" "功能点" | `AnimatedList` | `src/components/new` |
| "卡片" "特性" "功能介绍" | `FeatureCard` / `FeatureGrid` | `src/components/new` |
| "数据" "指标" "数字" | `MetricCard` / `MetricRow` | `src/components/new` |
| "表格" "对比" "数据行" | `DataTable` | `src/components/new` |
| "打字机" "逐字" "输入效果" | `TypewriterText` | `src/components/new` |
| "引用" "高亮" "重点" | `HighlightQuote` | `src/components/new` |
| "弹幕" "评论" "飘字" | `CommentBubble` / `CommentBarrage` | `src/components/new` |
| "流程" "步骤" "顺序" | `ProcessFlow` | `src/components/new` |
| "时间线" "演进" "历程" | `EvolutionTree` | `src/components/new` |
| "图谱" "关系" "网络" | `KnowledgeWeb` / `CausalGraph` | `src/components/new` |
| "对比" "优劣" "选择" | `ComparisonCards` | `src/components/new` |
| "产品介绍" "App展示" | `ProductIntro` | `src/components/new` |
| "淡入淡出" | `FadeTransition` | `src/components/new` |
| "光扫过" "扫光" | `LightSweep` | `src/components/new` |
| "滑动" "切换" | `SlideTransition` | `src/components/new` |

---

## 设计系统标准（强制遵循）

### 必须使用的设计常量

```typescript
// 颜色 - Apple + 影视飓风风格
import { COLORS } from './design-system/tokens';

// 主色调
// COLORS.primary = '#007AFF' (苹果蓝)
// COLORS.primaryDark = '#0051D5'
// COLORS.primaryLight = '#3399FF'

// 背景色 (影视飓风深空风格)
// COLORS.background = '#000000' (纯黑底色)
// COLORS.backgroundElevated = '#1C1C1E' (卡片背景)
// COLORS.backgroundSecondary = '#2C2C2E'

// 文字色
// COLORS.text = '#FFFFFF' (高亮白)
// COLORS.textSecondary = '#8E8E93' (星尘灰)
// COLORS.textTertiary = '#636366' (深空灰)

// 系统色 (影视级调色)
// COLORS.success = '#34C759' (科技绿)
// COLORS.warning = '#FF9500' (能量橙)
// COLORS.error = '#FF3B30' (警示红)
// COLORS.info = '#5AC8FA' (信息青)

// 扩展色板 (星空/科技渐变)
// COLORS.extended = {
//   orange: '#FF9500',    // 星云橙
//   yellow: '#FFCC00',    // 恒星黄
//   green: '#34C759',     // 极光绿
//   teal: '#5AC8FA',      // 科技青
//   cyan: '#32ADE6',      // 电光蓝
//   blue: '#007AFF',      // 苹果蓝
//   indigo: '#5856D6',    // 深空紫
//   purple: '#AF52DE',    // 星云紫
//   pink: '#FF2D55',      // 极光粉
//   red: '#FF3B30',       // 脉冲红
// }

// 渐变预设
// COLORS.gradient.primary = ['#007AFF', '#5856D6'] (蓝紫渐变)
// COLORS.gradient.glow = ['rgba(0, 122, 255, 0.3)', 'rgba(0, 122, 255, 0)']

// 字体
import { FONTS } from './design-system/tokens';
// FONTS.display = 'SF Pro Display, -apple-system, sans-serif'
// FONTS.text = 'SF Pro Text, -apple-system, sans-serif'
// FONTS.mono = 'JetBrains Mono, SF Mono, monospace'

// 字号（大字号设计）
import { SIZES } from './design-system/tokens';
// SIZES.hero = 120px
// SIZES.h1 = 88px
// SIZES.h2 = 56px
// SIZES.h3 = 40px
// SIZES.body = 20px

// 动画
import { SPRING_PRESETS, EASING_PRESETS } from './design-system/animations';
// SPRING_PRESETS.smooth = { damping: 200, stiffness: 100 }
// SPRING_PRESETS.bouncy = { damping: 15, stiffness: 120 }
// SPRING_PRESETS.snappy = { damping: 20, stiffness: 200 }
```

### 动画实现标准

```typescript
// ✅ 正确：使用 useCurrentFrame + spring/interpolate
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: SPRING_PRESETS.bouncy,
});

const opacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateLeft: 'clamp',
  easing: EASING_PRESETS.easeOut,
});
```

### 禁止事项

- ❌ **禁止 CSS 动画** (`@keyframes`, `animation`)
- ❌ **禁止 Tailwind 动画类** (`animate-*`, `transition-*`)
- ❌ **禁止 emoji** - 使用 `src/components/new/Icons.tsx` 中的 SVG 图标
- ❌ **禁止硬编码颜色** - 必须使用 `COLORS` 常量

---

## 图标使用标准

### 可用图标（50+）

```typescript
import {
  Zap,           // 闪电/速度
  Lock,          // 锁/安全
  Computer,      // 电脑
  Bot,           // 机器人/AI
  Terminal,      // 终端
  Code,          // 代码
  Cloud,         // 云
  Database,      // 数据库
  Network,       // 网络
  Check,         // 勾选
  Close,         // 关闭
  ArrowRight,    // 箭头
  Download,      // 下载
  Settings,      // 设置
  // ... 更多
} from './components/new/Icons';
```

### 图标映射规则

当用户描述涉及以下概念时，自动映射对应图标：

| 概念 | 图标 |
|-----|------|
| 速度、性能、快 | `Zap` |
| 安全、隐私、锁 | `Lock` |
| AI、机器人、智能 | `Bot` |
| 代码、开发、编程 | `Code` / `Terminal` |
| 云端、服务器 | `Cloud` |
| 数据、存储 | `Database` |
| 网络、连接 | `Network` |
| 完成、成功 | `Check` |
| 电脑、设备 | `Computer` |
| 设置、配置 | `Settings` |
| 下载、保存 | `Download` |
| 箭头、下一步 | `ArrowRight` |

---

## 代码生成模板

### 1. 匹配现有组件 - 直接提供使用代码

当用户需求可以匹配现有组件时，直接提供导入和使用代码：

**示例**：用户说"创建一个大标题开场，主题是AI编程助手，带3个标签"

**输出**：
```tsx
import { HeroTitle } from './components/new';

<HeroTitle
  title="AI 编程助手"
  subtitle="完全新手指南"
  tags={["开源免费", "本地部署", "隐私安全"]}
/>
```

### 2. 无匹配时 - 生成符合标准的新组件

当现有组件无法满足需求时，生成符合以下模板的新组件：

```tsx
// {{ComponentName}} - {{Description}}

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

interface {{ComponentName}}Props {
  // 定义 Props
  title?: string;
  startDelay?: number;
}

export const {{ComponentName}}: React.FC<{{ComponentName}}Props> = ({
  title = '',
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 动画逻辑
  const progress = spring({
    frame: frame - startDelay,
    fps,
    config: SPRING_PRESETS.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.spacing.xxxl,
      }}
    >
      {/* 组件内容 */}
    </AbsoluteFill>
  );
};
```

---

## 完整使用示例

### 示例 1: 匹配现有组件

**用户输入**：
> "创建一个展示产品特性的卡片网格，包含3个特性：快速响应、安全可靠、易于使用"

**处理逻辑**：
1. 识别关键词："卡片" "特性" "网格" → 匹配 `FeatureGrid`
2. 识别特性列表 → 映射为 `features` 数组
3. 自动选择图标：快速→Zap, 安全→Lock, 易于→Settings

**输出代码**：
```tsx
import { FeatureGrid } from './components/new';

<FeatureGrid
  features={[
    { icon: 'zap', title: '快速响应', description: '毫秒级响应速度' },
    { icon: 'lock', title: '安全可靠', description: '企业级安全防护' },
    { icon: 'settings', title: '易于使用', description: '简洁直观的界面' },
  ]}
  columns={3}
/>
```

### 示例 2: 生成新组件

**用户输入**：
> "创建一个圆形进度条，显示下载进度 0-100%"

**处理逻辑**：
1. 搜索现有组件：无匹配（没有圆形进度条组件）
2. 生成新组件 `CircularProgress`
3. 遵循设计系统：使用 COLORS.primary, SPRING_PRESETS.smooth

**输出代码**：
```tsx
// CircularProgress - 圆形进度条组件

import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';
import { SPRING_PRESETS } from '../../design-system/animations';

interface CircularProgressProps {
  progress: number;      // 0-100
  size?: number;
  strokeWidth?: number;
  startDelay?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 200,
  strokeWidth = 12,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const animatedProgress = spring({
    frame: frame - startDelay,
    fps,
    config: SPRING_PRESETS.smooth,
  });

  const currentProgress = interpolate(
    animatedProgress,
    [0, 1],
    [0, progress]
  );

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentProgress / 100) * circumference;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLORS.backgroundSecondary}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          fontSize: SIZES.h2,
          fontFamily: FONTS.display,
          color: COLORS.text,
        }}
      >
        {Math.round(currentProgress)}%
      </div>
    </AbsoluteFill>
  );
};
```

---

## 组件详细文档

### HeroTitle - 大标题开场

**适用场景**：视频开场、章节封面

**Props**：
| 属性 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| title | string | ✅ | 主标题 |
| subtitle | string | - | 副标题 |
| tags | string[] | - | 标签数组 |
| titleDelay | number | - | 标题动画延迟(帧) |

**示例**：
```tsx
<HeroTitle
  title="OpenClaw"
  subtitle="AI 编码助手完全指南"
  tags={["开源免费", "本地部署"]}
/>
```

### CodeTerminal - 代码终端

**适用场景**：代码演示、命令行操作展示

**Props**：
| 属性 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| code | string | ✅ | 代码内容 |
| language | string | - | 语言类型 |
| filename | string | - | 文件名标签 |
| typingSpeed | number | - | 打字速度 |
| showLineNumbers | boolean | - | 显示行号 |

### FeatureCard / FeatureGrid - 特性卡片

**适用场景**：产品特性展示、功能介绍

**Props (FeatureCard)**：
| 属性 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| icon | string | ✅ | 图标名称 |
| title | string | ✅ | 标题 |
| description | string | ✅ | 描述 |
| delay | number | - | 入场延迟 |

**Props (FeatureGrid)**：
| 属性 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| features | FeatureItem[] | ✅ | 特性数组 |
| columns | 2/3/4 | - | 列数 |

### ProcessFlow - 流程步骤

**适用场景**：工作流程、处理步骤

**Props**：
| 属性 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| title | string | - | 流程标题 |
| steps | FlowStep[] | ✅ | 步骤数组 |
| direction | 'horizontal'/'vertical' | - | 布局方向 |
| showProgress | boolean | - | 显示进度条 |

**示例**：
```tsx
<ProcessFlow
  title="Agent 工作流程"
  steps={[
    { label: '接收任务', description: '解析用户意图', status: 'complete' },
    { label: '规划步骤', status: 'complete' },
    { label: '执行操作', status: 'active' },
    { label: '返回结果', status: 'pending' },
  ]}
/>
```

### EvolutionTree - 演进树

**适用场景**：技术发展时间线、版本演进

**Props**：
| 属性 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| title | string | - | 标题 |
| subtitle | string | - | 副标题 |
| stages | EvolutionStage[] | ✅ | 阶段数组 |
| direction | 'horizontal'/'vertical' | - | 方向 |

**示例**：
```tsx
<EvolutionTree
  title="大模型发展历程"
  stages={[
    { year: '2017', name: 'Transformer', description: 'Attention机制', color: 'blue' },
    { year: '2020', name: 'GPT-3', description: '175B参数', breakthrough: true },
  ]}
/>
```

---

## 工作流程

当用户请求生成 Remotion 组件时：

1. **分析需求** - 提取关键词：组件类型、数据内容、动画偏好

2. **匹配组件** - 查表找到最接近的现有组件
   - 匹配成功 → 提供组件使用代码
   - 匹配失败 → 进入步骤3

3. **生成新组件** - 使用标准模板生成
   - 强制导入设计系统常量
   - 使用 useCurrentFrame + spring 实现动画
   - 使用 AbsoluteFill + flex 布局
   - 禁止 CSS 动画和 emoji

4. **输出结果** - 提供完整代码 + 使用说明

---

## 提示词转换速查

| 自然语言 | Remotion 代码 |
|---------|--------------|
| "黑色背景" "深空背景" | `backgroundColor: COLORS.background` |
| "苹果蓝" "主色调" | `color: COLORS.primary` |
| "星云紫" "紫色强调" | `color: COLORS.extended.purple` |
| "极光绿" "科技绿" | `color: COLORS.extended.green` |
| "恒星黄" "能量黄" | `color: COLORS.extended.yellow` |
| "电光青" "科技青" | `color: COLORS.extended.cyan` |
| "蓝紫渐变" | `COLORS.gradient.primary` |
| "光晕渐变" | `COLORS.gradient.glow` |
| "弹性动画" | `spring({ config: SPRING_PRESETS.bouncy })` |
| "平滑淡入" | `interpolate(frame, [0, 20], [0, 1])` |
| "大标题" "主标题" | `fontSize: SIZES.hero` |
| "正文字号" | `fontSize: SIZES.body` |
| "苹果字体" "标题字体" | `fontFamily: FONTS.display` |
| "等宽字体" "代码字体" | `fontFamily: FONTS.mono` |
| "卡片背景" | `backgroundColor: COLORS.backgroundElevated` |
| "次要文字" "灰色文字" | `color: COLORS.textSecondary` |
