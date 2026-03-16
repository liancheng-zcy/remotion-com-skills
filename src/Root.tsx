import "./index.css";
import { Composition, Folder } from "remotion";
import {
  DemoHeroTitle,
  DemoSectionTitle,
  DemoCodeTerminal,
  DemoAnimatedList,
  DemoFeatureGrid,
  DemoMetricRow,
  DemoTransition,
} from "./scenes/demo/DemoScenes";
import {
  DemoDataTable,
  DemoProgressTable,
  DemoHighlightQuote,
  DemoDataHighlight,
  DemoTypewriter,
  DemoMultiLineTypewriter,
  DemoCommentBubble,
  DemoBottomComment,
  DemoCausalGraph,
  DemoCausalGraphTitle,
  DemoComparisonCards,
  DemoComparisonCardsTriple,
  DemoProcessFlowHorizontal,
  DemoProcessFlowVertical,
  DemoEvolutionTreeHorizontal,
  DemoProductIntroIcon,
  DemoProductIntroPreview,
} from "./scenes/demo/NewComponentsDemo";
import {
  RemotionIntroVideo,
  RemotionIntroHero,
  RemotionIntroSection,
  RemotionIntroFeatures,
  RemotionIntroCodeDemo,
  RemotionIntroCTA,
} from "./scenes/demo/RemotionIntro";
import {
  RemotionBestPracticesScene,
  RemotionBestPracticesHero,
} from "./scenes/demo/RemotionBestPracticesIntro";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="基础组件">
        {/* 基础组件 */}
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

      <Folder name="数据与表格">
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
      </Folder>

      <Folder name="文字与互动">
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
      </Folder>

      <Folder name="知识图谱">
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

      <Folder name="Remotion-Intro">
        {/* 完整视频 - 33秒 */}
        <Composition
          id="RemotionIntroVideo"
          component={RemotionIntroVideo}
          durationInFrames={33 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        {/* 独立场景预览 */}
        <Composition
          id="RemotionIntroHero"
          component={RemotionIntroHero}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="RemotionIntroSection"
          component={RemotionIntroSection}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="RemotionIntroFeatures"
          component={RemotionIntroFeatures}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="RemotionIntroCodeDemo"
          component={RemotionIntroCodeDemo}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="RemotionIntroCTA"
          component={RemotionIntroCTA}
          durationInFrames={5 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Skill介绍">
        {/* Remotion Best Practices Skill 介绍 */}
        <Composition
          id="RemotionBestPracticesScene"
          component={RemotionBestPracticesScene}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="RemotionBestPracticesHero"
          component={RemotionBestPracticesHero}
          durationInFrames={10 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
