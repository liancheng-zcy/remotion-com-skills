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

const FPS = 30;

export const RemotionRoot: React.FC = () => {
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
