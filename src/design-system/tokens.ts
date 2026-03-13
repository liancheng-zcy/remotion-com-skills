// 设计系统 - 统一的设计 Tokens
// Apple 风格主题

export const COLORS = {
  // 主色调
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#3399FF',

  // 背景色
  background: '#000000',
  backgroundElevated: '#1C1C1E',
  backgroundSecondary: '#2C2C2E',

  // 文字色
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',

  // 系统色
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // 渐变
  gradient: {
    primary: ['#007AFF', '#5856D6'],
    glow: ['rgba(0, 122, 255, 0.3)', 'rgba(0, 122, 255, 0)'],
  },
};

export const FONTS = {
  // 主字体
  display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
  text: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
  mono: '"SF Mono", "Fira Code", "JetBrains Mono", Monaco, Consolas, monospace',
};

export const SIZES = {
  // 标题字号（增大，更有冲击力）
  hero: 120,      // 从 96 增大到 120
  h1: 88,         // 从 72 增大到 88
  h2: 56,         // 从 48 增大到 56
  h3: 40,         // 从 32 增大到 40
  h4: 28,         // 从 24 增大到 28
  body: 20,       // 从 18 增大到 20
  caption: 16,    // 从 14 增大到 16

  // 间距
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
    xxxl: 96,
  },

  // 圆角
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
};

// 动画时长（帧数，基于 30fps）
export const DURATIONS = {
  fast: 10,      // 0.33s
  normal: 20,    // 0.66s
  slow: 30,      // 1s
  slower: 45,    // 1.5s
  slowest: 60,   // 2s
};

// 延迟（用于列表项错开动画）
export const STAGGER = {
  fast: 5,
  normal: 8,
  slow: 12,
};
