// NewComponentsDemo - 新组件演示场景
// 展示 DataTable、HighlightQuote、TypewriterText、CommentBubble

import React from 'react';
import { Composition, Folder, AbsoluteFill } from 'remotion';
import {
  HeroTitle,
  DataTable,
  ProgressTable,
  HighlightQuote,
  DataHighlight,
  TypewriterScene,
  MultiLineTypewriter,
  CommentBarrage,
  BottomComment,
  FadeTransition,
  CausalGraph,
  ComparisonCards,
  ProcessFlow,
  EvolutionTree,
  ProductIntro,
  Zap,
} from '../../components/new/index';
import { COLORS } from '../../design-system/tokens';

const FPS = 30;

// Demo 1: DataTable - Benchmark 对比表
const DemoDataTable: React.FC = () => {
  const columns = [
    { key: 'metric', title: '指标', width: 280, align: 'left' as const },
    { key: 'gpt54', title: 'GPT-5.4', width: 200, align: 'center' as const },
    { key: 'gpt52', title: 'GPT-5.2', width: 200, align: 'center' as const },
    { key: 'improvement', title: '提升幅度', width: 180, align: 'right' as const },
  ];

  const data = [
    { metric: 'GDPval (职业工作模拟)', gpt54: '83.0%', gpt52: '70.9%', improvement: '+12.1%' },
    { metric: 'SWE-Bench Pro (编程)', gpt54: '57.7%', gpt52: '55.6%', improvement: '+2.1%' },
    { metric: 'OSWorld-Verified (操作电脑)', gpt54: '75.0%', gpt52: '47.3%', improvement: '+27.7% 🚀' },
    { metric: 'BrowseComp (深度网络研究)', gpt54: '82.7%', gpt52: '65.8%', improvement: '+16.9%' },
  ];

  return (
    <DataTable
      title="硬实力数据对比"
      columns={columns}
      data={data}
      highlightColumn="gpt54"
      highlightRow={2}
      startDelay={10}
      rowDelay={8}
    />
  );
};

// Demo 2: ProgressTable - 推荐指数
const DemoProgressTable: React.FC = () => {
  const rows = [
    { label: '企业用户', value: 5, maxValue: 5, color: COLORS.success },
    { label: '开发者', value: 4, maxValue: 5, color: COLORS.primary },
    { label: '普通用户', value: 3, maxValue: 5, color: COLORS.warning },
    { label: '研究者', value: 4, maxValue: 5, color: COLORS.info },
  ];

  return (
    <ProgressTable
      title="适合人群推荐指数"
      rows={rows}
      startDelay={10}
      rowDelay={10}
    />
  );
};

// Demo 3: HighlightQuote - 高亮引用
const DemoHighlightQuote: React.FC = () => {
  return (
    <HighlightQuote
      quote="GDPval 83% 是最亮眼的——这意味着 GPT-5.4 在模拟44种职业工作时，有83%的概率能达到或超越人类专业人员的水平。"
      source="我的解读"
      variant="primary"
      size="lg"
      startDelay={10}
    />
  );
};

// Demo 4: DataHighlight - 数据高亮卡片
const DemoDataHighlight: React.FC = () => {
  return (
    <DataHighlight
      value="83%"
      label="GDPval"
      description="模拟44种职业工作，达到或超越人类专业人员的水平"
      trend={{ value: 12.1, isPositive: true }}
      variant="primary"
      startDelay={10}
    />
  );
};

// Demo 5: TypewriterText - 打字机效果
const DemoTypewriter: React.FC = () => {
  return (
    <TypewriterScene
      title="写在前面"
      subtitle="ChatGPT 5.4 深度测评"
      text="就在昨天，OpenAI 悄咪咪地发布了 GPT-5.4。没有发布会，没有倒计时，甚至没有 CEO 站台发推——这很不对劲。"
      speed={2}
      startDelay={15}
    />
  );
};

// Demo 6: MultiLineTypewriter - 多行打字机
const DemoMultiLineTypewriter: React.FC = () => {
  const lines = [
    { text: "✅ GDPval 83% 是最亮眼的——这意味着它真的能干活了", color: COLORS.success },
    { text: "✅ OSWorld 75% 是个惊喜——终于能自己操作电脑了", color: COLORS.success },
    { text: "❌ SWE-Bench Pro +2.1% 有点尴尬...", color: COLORS.error, indent: true },
    { text: "合着编程能力提升这么点？", color: COLORS.textSecondary, indent: true },
  ];

  return (
    <MultiLineTypewriter
      lines={lines}
      speed={2}
      lineDelay={60}
      startDelay={10}
    />
  );
};

// Demo 7: CommentBubble - 弹幕评论
const DemoCommentBubble: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        position: 'relative',
      }}
    >
      {/* 主内容 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 20,
          }}
        >
          GPT-5.4
        </div>
        <div
          style={{
            fontSize: 32,
            color: COLORS.textSecondary,
          }}
        >
          是王炸还是挤牙膏？
        </div>
      </div>

      {/* 弹幕 */}
      <CommentBarrage
        comments={[
          { text: '这么强？', startFrame: 30, yPosition: 15, direction: 'right', variant: 'highlight', avatar: 'A' },
          { text: '价格劝退...', startFrame: 60, yPosition: 35, direction: 'left', variant: 'negative', avatar: 'B' },
          { text: '编程才提升2.1%？', startFrame: 90, yPosition: 55, direction: 'right', variant: 'question', avatar: 'C' },
          { text: '83% GDPval 确实牛逼', startFrame: 120, yPosition: 25, direction: 'left', variant: 'highlight', avatar: 'D' },
          { text: '企业用户狂喜', startFrame: 150, yPosition: 70, direction: 'right', variant: 'default', avatar: 'E' },
        ]}
      />
    </AbsoluteFill>
  );
};

// Demo 8: BottomComment - 底部评论
const DemoBottomComment: React.FC = () => {
  const activeIndex = 0;

  const comments = [
    { text: '这提升幅度，OpenAI 也开始挤牙膏了？', author: '网友A', avatar: 'A', variant: 'question' as const },
    { text: '原生计算机使用能力才是重头戏！', author: '网友B', avatar: 'B', variant: 'highlight' as const },
    { text: '价格涨了50%，值不值还得看实际效果', author: '网友C', avatar: 'C', variant: 'default' as const },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
        position: 'relative',
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          color: COLORS.text,
          marginBottom: 40,
        }}
      >
        网友评论
      </div>
      <div
        style={{
          fontSize: 28,
          color: COLORS.textSecondary,
          maxWidth: 800,
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        GPT-5.4 发布后，网友反应褒贬不一。有人认为这是 AI 走向实用的关键一步，也有人质疑提升幅度不够...
      </div>

      {/* 底部评论 */}
      <BottomComment comments={comments} activeIndex={activeIndex} startDelay={60} />
    </AbsoluteFill>
  );
};

// Demo 9: 完整场景组合 - GPT-5.4 测评文章
const DemoFullArticle: React.FC = () => {
  return (
    <FadeTransition duration={20}>
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HeroTitle
          title="ChatGPT 5.4"
          subtitle="深度测评：是王炸还是挤牙膏？"
          tags={["AI", "GPT-5.4", "测评"]}
        />
      </AbsoluteFill>
    </FadeTransition>
  );
};

// Demo 10: CausalGraph - 知识图谱因果关系（图1风格）
const DemoCausalGraph: React.FC = () => {
  return (
    <CausalGraph
      title="举个例子"
      subtitle="知识图谱只记两句话"
      quote={{
        text: "3月15日，用户反馈页面打不开，查了半天发现是数据库挂了，重启了一下好了。",
        source: "运维日志"
      }}
      nodes={[
        { id: 'db-down', label: '数据库挂了', color: 'error', x: 0.2, y: 0.3 },
        { id: 'page-error', label: '页面打不开', color: 'warning', x: 0.8, y: 0.3 },
        { id: 'restart-db', label: '重启数据库', color: 'success', x: 0.5, y: 0.8 },
      ]}
      edges={[
        { from: 'db-down', to: 'page-error', label: '导致', type: 'cause' },
        { from: 'restart-db', to: 'db-down', label: '修复', type: 'fix' },
      ]}
      showParticles={true}
    />
  );
};

// Demo 11: CausalGraph - 大字标题（图2风格）
const DemoCausalGraphTitle: React.FC = () => {
  return (
    <CausalGraph
      title="一个 Agent 踩过的坑 所有 Agent 都不再踩"
      highlightWords={{
        '踩过的坑': 'orange',
        '所有 Agent': 'blue',
        '都不再踩': 'success',
      }}
      subtitle="分布式经验共享网络 · 让每个 Agent 都能进化"
      showParticles={true}
    />
  );
};

// Demo 12: ComparisonCards - 对比卡片组（EvoMap风格）
const DemoComparisonCards: React.FC = () => {
  return (
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
          description: '胶囊 被更多人正确使用',
          color: 'success',
        },
        {
          label: '被淘汰',
          description: '胶囊 无法被正确使用',
          color: 'error',
        },
      ]}
      footer="贡献者获得相应收益"
      showParticles={true}
    />
  );
};

// Demo 13: ComparisonCards - 三列对比
const DemoComparisonCardsTriple: React.FC = () => {
  return (
    <ComparisonCards
      title="模型能力对比"
      items={[
        {
          label: 'GPT-4',
          description: '稳定可靠，生态丰富',
          color: 'blue',
          details: ['代码能力强', '多模态支持', 'API成熟'],
        },
        {
          label: 'GPT-5',
          description: '性能更强，价格更高',
          color: 'green',
          details: ['推理能力↑', '上下文更长', '成本增加50%'],
        },
        {
          label: 'Claude',
          description: '长文本专家，创意突出',
          color: 'purple',
          details: ['200K上下文', '文学性好', '代码稍弱'],
        },
      ]}
      footer="根据需求选择合适的模型"
      showParticles={true}
    />
  );
};

// Demo 14: ProcessFlow - 横向流程
const DemoProcessFlowHorizontal: React.FC = () => {
  return (
    <ProcessFlow
      title="Agent 工作流程"
      subtitle="从任务接收到结果返回的完整流程"
      steps={[
        { label: '接收任务', description: '解析用户意图', status: 'complete', icon: '1' },
        { label: '规划步骤', description: '制定执行计划', status: 'complete', icon: '2' },
        { label: '执行操作', description: '调用工具完成', status: 'active', icon: '3' },
        { label: '返回结果', description: '总结输出答案', status: 'pending', icon: '4' },
      ]}
      direction="horizontal"
      showProgress={true}
    />
  );
};

// Demo 15: ProcessFlow - 纵向流程
const DemoProcessFlowVertical: React.FC = () => {
  return (
    <ProcessFlow
      title="模型部署流程"
      steps={[
        { label: '模型训练', status: 'complete', color: 'success' },
        { label: '模型评估', status: 'complete', color: 'success' },
        { label: '量化压缩', status: 'active', color: 'warning' },
        { label: '服务部署', status: 'pending', color: 'info' },
        { label: '监控运维', status: 'pending', color: 'info' },
      ]}
      direction="vertical"
      showProgress={true}
    />
  );
};

// Demo 16: EvolutionTree - 大模型发展历程（横向）
const DemoEvolutionTreeHorizontal: React.FC = () => {
  return (
    <EvolutionTree
      title="大模型发展历程"
      subtitle="从Transformer到GPT-4的技术演进"
      stages={[
        {
          year: '2017',
          name: 'Transformer',
          description: 'Attention is All You Need',
          color: 'blue',
          icon: 'T',
        },
        {
          year: '2018',
          name: 'BERT',
          description: '双向编码器表示',
          color: 'purple',
          breakthrough: true,
          icon: 'B',
        },
        {
          year: '2020',
          name: 'GPT-3',
          description: '175B参数，开启大模型时代',
          color: 'green',
          breakthrough: true,
          icon: '3',
        },
        {
          year: '2022',
          name: 'ChatGPT',
          description: '对话能力革命性突破',
          color: 'orange',
          breakthrough: true,
          icon: 'C',
        },
        {
          year: '2023',
          name: 'GPT-4',
          description: '多模态，推理能力大幅提升',
          color: 'primary',
          breakthrough: true,
          icon: '4',
        },
      ]}
      direction="horizontal"
      showTimeline={true}
    />
  );
};

// Demo 17: ProductIntro - 图标型（闪电说风格）
const DemoProductIntroIcon: React.FC = () => {
  return (
    <ProductIntro
      index={2}
      totalCount={4}
      variant="icon"
      icon={<Zap size={80} color="#000000" strokeWidth={1.5} />}
      iconBgColor="#FF9500"
      showAudioWave={true}
      cornerTag="说话更高效"
      rotatingTexts={["说话", "打字效率高"]}
      product={{
        category: "语音转文字",
        name: "闪电说",
        subtitle: "速度快、功能强、多API支持",
        tags: [
          { text: "延迟低", prefix: "+" },
          { text: "识别准", prefix: "+" },
          { text: "多模型接入", prefix: "+" },
          { text: "本地私有化", prefix: "+" },
        ],
        featureTags: ["速度快", "功能强", "多API", "本地部署"],
      }}
    />
  );
};

// Demo 18: ProductIntro - 预览型（通义千问风格）
const DemoProductIntroPreview: React.FC = () => {
  return (
    <ProductIntro
      index={4}
      totalCount={4}
      variant="preview"
      cornerTag="完全免费"
      rotatingTexts={["完全免费良心！"]}
      previewContent={
        <div
          style={{
            width: 280,
            height: 380,
            backgroundColor: COLORS.backgroundElevated,
            borderRadius: 20,
            border: `1px solid ${COLORS.backgroundSecondary}`,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: COLORS.text,
              fontWeight: 600,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>📋</span>
            <span>会议纪要</span>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: COLORS.background,
              borderRadius: 12,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '8px 12px',
                backgroundColor: COLORS.backgroundElevated,
                borderRadius: 8,
                fontSize: 13,
                color: COLORS.text,
              }}
            >
              <span style={{ color: COLORS.textSecondary }}>王工</span>
              <br />
              我这周先出方案。
            </div>
            <div
              style={{
                alignSelf: 'flex-end',
                padding: '8px 12px',
                backgroundColor: `${COLORS.primary}20`,
                borderRadius: 8,
                fontSize: 13,
                color: COLORS.text,
              }}
            >
              <span style={{ color: COLORS.primary }}>AI助手</span>
              <br />
              我在听，稍后自动生成会议纪要。
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              padding: '12px',
              backgroundColor: `${COLORS.success}15`,
              borderRadius: 8,
              fontSize: 12,
              color: COLORS.success,
              textAlign: 'center',
            }}
          >
            ✓ 完全免费
          </div>
        </div>
      }
      product={{
        category: "会议纪要",
        name: "通义千问",
        subtitle: "多人识别、自动总结",
        tags: [
          { text: "自动记录", prefix: "+" },
          { text: "多人分离", prefix: "+" },
          { text: "要点总结", prefix: "+" },
          { text: "免费良心", prefix: "+" },
        ],
        featureList: [
          "多人识别",
          "自动总结",
          "区分发言人",
          "完全免费",
        ],
      }}
    />
  );
};

// 导出 Root 配置
export const NewComponentsDemo = () => {
  return (
    <>
      <Folder name="新组件演示">
        <Composition
          id="DemoDataTable"
          component={DemoDataTable}
          durationInFrames={6 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoProgressTable"
          component={DemoProgressTable}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoHighlightQuote"
          component={DemoHighlightQuote}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoDataHighlight"
          component={DemoDataHighlight}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoTypewriter"
          component={DemoTypewriter}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoMultiLineTypewriter"
          component={DemoMultiLineTypewriter}
          durationInFrames={12 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoCommentBubble"
          component={DemoCommentBubble}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoBottomComment"
          component={DemoBottomComment}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoFullArticle"
          component={DemoFullArticle}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoCausalGraph"
          component={DemoCausalGraph}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoCausalGraphTitle"
          component={DemoCausalGraphTitle}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoComparisonCards"
          component={DemoComparisonCards}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoComparisonCardsTriple"
          component={DemoComparisonCardsTriple}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoProcessFlowHorizontal"
          component={DemoProcessFlowHorizontal}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoProcessFlowVertical"
          component={DemoProcessFlowVertical}
          durationInFrames={12 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoEvolutionTreeHorizontal"
          component={DemoEvolutionTreeHorizontal}
          durationInFrames={12 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoProductIntroIcon"
          component={DemoProductIntroIcon}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="DemoProductIntroPreview"
          component={DemoProductIntroPreview}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};

export {
  DemoDataTable,
  DemoProgressTable,
  DemoHighlightQuote,
  DemoDataHighlight,
  DemoTypewriter,
  DemoMultiLineTypewriter,
  DemoCommentBubble,
  DemoBottomComment,
  DemoFullArticle,
  DemoCausalGraph,
  DemoCausalGraphTitle,
  DemoComparisonCards,
  DemoComparisonCardsTriple,
  DemoProcessFlowHorizontal,
  DemoProcessFlowVertical,
  DemoEvolutionTreeHorizontal,
  DemoProductIntroIcon,
  DemoProductIntroPreview,
};
