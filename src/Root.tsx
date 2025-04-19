import { Composition } from "remotion";
import { PlayerList } from "./PlayerList";
import './index.css'; 

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PlayerListCard"
        component={PlayerList}
        durationInFrames={60*210} // default 60*200 or 60*10
        fps={60}
        width={2560}
        height={1440}
      />
    </>
  );
};