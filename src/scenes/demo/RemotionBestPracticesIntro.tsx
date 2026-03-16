// RemotionBestPracticesIntro - Remotion Best Practices Skill 产品介绍
// 用于录制 Skill 推荐视频

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ProductIntro, Code } from '../../components/new';
import { COLORS } from '../../design-system/tokens';

// 图标组件
const SkillIcon: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 120,
      height: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      {/* 播放按钮 */}
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <polygon points="10 8 16 12 10 16" fill={color} />
      {/* 代码符号 */}
      <polyline points="8 4 4 8 8 12" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <polyline points="16 4 20 8 16 12" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  </div>
);

// 产品 1: Remotion Best Practices Skill 介绍
export const RemotionBestPracticesHero: React.FC = () => {
  return (
    <ProductIntro
      index={1}
      totalCount={1}
      product={{
        category: "Claude Skill",
        name: "Remotion Best Practices",
        subtitle: "Remotion 视频开发最佳实践指南，包含组件库、设计系统和动画规范",
        tags: [
          { text: "视频开发", prefix: "•" },
          { text: "React组件", prefix: "•" },
          { text: "Skill推荐", prefix: "+" },
        ],
        featureTags: ["18+ 组件", "设计系统", "动画预设"],
      }}
      variant="icon"
      icon={<SkillIcon color="#FFFFFF" />}
      iconBgColor={COLORS.extended.purple}
      showAudioWave={true}
      cornerTag="完全免费"
      rotatingTexts={["专业视频组件", "开箱即用", "影视飓风质感"]}
      startDelay={0}
    />
  );
};

// 完整的视频场景 (10秒)
export const RemotionBestPracticesScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      <RemotionBestPracticesHero />
    </AbsoluteFill>
  );
};

export default RemotionBestPracticesScene;
