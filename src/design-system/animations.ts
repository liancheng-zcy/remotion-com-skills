// 动画预设和工具函数
import { spring, interpolate, Easing } from 'remotion';

// Spring 动画预设
export const SPRING_PRESETS = {
  // 平滑无弹跳 - 适合稳重动画
  smooth: { damping: 200, stiffness: 100 },

  // 快速响应 - 适合 UI 元素
  snappy: { damping: 20, stiffness: 200 },

  // 轻微弹性 - 适合标题等主要内容
  bouncy: { damping: 15, stiffness: 120 },

  // 厚重感 - 适合大元素入场
  heavy: { damping: 15, stiffness: 80, mass: 2 },

  // 弹性活泼 - 适合小元素
  playful: { damping: 8, stiffness: 100 },
};

// Easing 预设
export const EASING_PRESETS = {
  linear: Easing.linear,
  easeIn: Easing.in(Easing.quad),
  easeOut: Easing.out(Easing.quad),
  easeInOut: Easing.inOut(Easing.quad),
  easeOutBack: Easing.out(Easing.back(1.7)),
  easeOutExpo: Easing.out(Easing.exp),
};

// 入场动画工具函数
export const entranceAnimations = {
  // 淡入
  fade: (frame: number, duration: number) =>
    interpolate(frame, [0, duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),

  // 从下方滑入
  slideUp: (frame: number, duration: number, distance: number = 30) => ({
    opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    translateY: interpolate(frame, [0, duration], [distance, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASING_PRESETS.easeOutBack,
    }),
  }),

  // 从左侧滑入
  slideLeft: (frame: number, duration: number, distance: number = 30) => ({
    opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    translateX: interpolate(frame, [0, duration], [-distance, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASING_PRESETS.easeOutBack,
    }),
  }),

  // 缩放淡入
  scale: (frame: number, duration: number) => ({
    opacity: interpolate(frame, [0, duration * 0.5], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    scale: interpolate(frame, [0, duration], [0.8, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASING_PRESETS.easeOutBack,
    }),
  }),

  // 打字机效果 - 返回应该显示的字符数
  typewriter: (frame: number, speed: number, totalChars: number) => {
    const charsToShow = Math.min(Math.floor(frame / speed), totalChars);
    return charsToShow;
  },
};

// 使用 spring 的入场动画
export const springEntrance = {
  // 弹性缩放
  bounceScale: (frame: number, fps: number, delay: number = 0) =>
    spring({
      frame: frame - delay,
      fps,
      config: SPRING_PRESETS.bouncy,
    }),

  // 平滑缩放
  smoothScale: (frame: number, fps: number, delay: number = 0) =>
    spring({
      frame: frame - delay,
      fps,
      config: SPRING_PRESETS.smooth,
    }),

  // 厚重入场
  heavyScale: (frame: number, fps: number, delay: number = 0) =>
    spring({
      frame: frame - delay,
      fps,
      config: SPRING_PRESETS.heavy,
    }),
};

// 装饰动画
export const decorativeAnimations = {
  // 线条宽度展开
  lineExpand: (frame: number, duration: number, maxWidth: number) =>
    interpolate(frame, [0, duration], [0, maxWidth], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASING_PRESETS.easeOutExpo,
    }),

  // 光晕扫过效果
  glowSweep: (frame: number, duration: number, width: number) => {
    const progress = interpolate(frame, [0, duration], [-0.2, 1.2], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return progress * width;
  },

  // 呼吸效果（用于装饰元素）
  breathe: (frame: number, fps: number) => {
    const cycle = (frame / fps) % 2; // 2秒一个周期
    return interpolate(cycle, [0, 1, 2], [1, 1.05, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  },
};
