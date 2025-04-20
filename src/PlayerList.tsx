import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
  delayRender,
  continueRender,
  Audio,
  OffthreadVideo,
  staticFile,
} from "remotion";
import React, { useMemo, useEffect, useState } from "react";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import { TopPlayer, validateTopPlayers, } from "./types/schema";
import { PlayerCard } from "./components/PlayerCardv1";
import { getLogoCode } from "./utils/getLogoClub";


// import rawTopPlayers from "../public/en/afc_bournemouth_top_goals.json";
// import rawTopPlayers from "../public/en/arsenal_fc_top_goals.json";
// import rawTopPlayers from "../public/en/aston_villa_top_goals.json";
// import rawTopPlayers from "../public/en/brentford_fc_top_goals.json";
// import rawTopPlayers from "../public/en/brighton_&_hove_albion_top_goals.json";

// import rawTopPlayers from "../public/en/chelsea_fc_top_goals.json";
// import rawTopPlayers from "../public/en/crystal_palace_top_goals.json";
// import rawTopPlayers from "../public/en/everton_fc_top_goals.json";
// import rawTopPlayers from "../public/en/fulham_fc_top_goals.json";
import rawTopPlayers from "../public/en/ipswich_town_top_goals.json";

// import rawTopPlayers from "../public/en/leicester_city_top_goals.json";
// import rawTopPlayers from "../public/en/liverpool_fc_top_goals.json";
// import rawTopPlayers from "../public/en/manchester_city_top_goals.json";
// import rawTopPlayers from "../public/en/manchester_united_top_goals.json";
// import rawTopPlayers from "../public/en/newcastle_united_top_goals.json";

// import rawTopPlayers from "../public/en/nottingham_forest_top_goals.json";
// import rawTopPlayers from "../public/en/southampton_fc_top_goals.json";
// import rawTopPlayers from "../public/en/tottenham_hotspur_top_goals.json";
// import rawTopPlayers from "../public/en/west_ham_united_top_goals.json";
// import rawTopPlayers from "../public/en/wolverhampton_wanderers_top_goals.json";


const { fontFamily: rubikFont } = loadRubik();

const getStaticCardPosition = (index: number, screenWidth: number) => {
  const startPosition = screenWidth / 2 - 1300;
  return startPosition + index * 650;
};

const IntroTitle: React.FC<{ person?: TopPlayer }> = ({ person }) => {  
  const frame = useCurrentFrame();

  if (!person) {
    return null; // Jika person tidak ada, jangan render apapun
  }

  const logoSlideDown = useMemo(
    () =>
      interpolate(frame, [0, 15], [0, 5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    [frame]
  );

  const titleSlideUp = useMemo(
    () =>
      interpolate(frame, [0, 25], [100, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    [frame]
  );

  const subtitleSlideUp = useMemo(
    () =>
      interpolate(frame, [15, 40], [100, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    [frame]
  );

  const presenetBySlideUp = useMemo(
    () =>
      interpolate(frame, [15, 40], [100, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    [frame]
  );

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: rubikFont,
        overflow: "hidden",
      }}
    >
      {/* Logo Klub */}
      <div
        className="flex justify-center items-center pb-5"
        style={{ transform: `translateY(${logoSlideDown}%)` }}
      >
        <div className="w-150 h-150 flex items-center justify-center overflow-hidden rounded-xl">
          <img
            src={getLogoCode(person.club)}
            alt="Club Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Judul */}
      <h1
        style={{
          fontSize: "7rem",
          fontWeight: "900",
          transform: `translateY(${titleSlideUp}%)`,
        }}
      >
        {person.club}
      </h1>
      
      <h2
        style={{
          fontSize: "5rem",
          fontWeight: "700",
          transform: `translateY(${subtitleSlideUp}%)`,
        }}
      >
        All-Time Top Scorers
      </h2>

      <h2
        style={{
          fontSize: "4rem",
          fontWeight: "700",
          transform: `translateY(${subtitleSlideUp}%)`,
        }}
      >
        A Legacy of Goals, A History of Greatness
      </h2>

      <h3
        style={{
          fontSize: "3rem",
          fontWeight: "600",
          transform: `translateY(${presenetBySlideUp}%)`,
        }}
      >
        Present by: DANGO BALL
      </h3>
    </div>
  );
};


export const PlayerList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, } = useVideoConfig();
  const [handle] = useState(() => delayRender("timeout-60000")); // Tambahkan timeout 60 detik
  const [validatedData, setValidatedData] = useState<TopPlayer[]>([]);

  useEffect(() => {
    const processData = async () => {
      try {
        const data = validateTopPlayers(rawTopPlayers).reverse();
        setValidatedData(data);
        continueRender(handle); // Panggil continueRender setelah data berhasil diproses
      } catch (error) {
        console.error("Data validation error:", error);
        continueRender(handle); // Pastikan continueRender tetap dipanggil meskipun terjadi error
      }
    };
    processData();
  }, [handle]);

  const introDelay = 120;
  const totalDuration = fps * 200; // 210 detik
  const cardsToShow = 30;
  const initialDelay = 30;
  const cardEntryDuration = 30;
  const staggerDelay = 100;
  const mainCardsAnimationDuration = initialDelay + 4 * cardEntryDuration;
  const scrollDuration = totalDuration - mainCardsAnimationDuration;

  const memoizedData = useMemo(() => validatedData.slice(0, cardsToShow), [validatedData, cardsToShow]);

  const scrollX = useMemo(
    () =>
      interpolate(frame - mainCardsAnimationDuration, [0, scrollDuration], [0, -650 * (cardsToShow - 1)], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      }),
    [frame, mainCardsAnimationDuration, scrollDuration, cardsToShow]
  );

  // Sesuaikan tinggi kartu berdasarkan resolusi video
  const cardHeight = height * 0.5; // Misalnya, setengah dari tinggi video

  return (
    <AbsoluteFill>
      {/* Intro Sequence */}
      <Sequence from={0} durationInFrames={introDelay}>
        <div className="grass">
          {memoizedData.length > 0 && <IntroTitle person={memoizedData[0]} />}
        </div>
      </Sequence>

      {/* Player List Animation */}
      <Sequence from={introDelay} durationInFrames={totalDuration}>
        <div className="grass">
          <div className="w-full flex items-center justify-center">
        <div className="flex gap-4" style={{ transform: `translateX(${scrollX}px)` }}>
          {memoizedData.map((person, index) => {
        const isMainCard = index < 4;
        const delay = isMainCard
          ? initialDelay + index * cardEntryDuration
          : mainCardsAnimationDuration + (index - 4) * staggerDelay;

        const initialPosition = getStaticCardPosition(index, width);

        const slideUpOffset = isMainCard
          ? interpolate(frame - delay - introDelay, [0, 30], [200, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
          : 0;

        const bounceEffect = spring({
          frame: frame - delay - introDelay,
          from: 1,
          to: 0,
          fps,
          config: {
        damping: 10, // Lebih smooth
        stiffness: 90,
        mass: 0.5,
          },
        });

        return (
          <div
        key={person.rank}
        className="absolute pt-10"
        style={{
          left: initialPosition,
          opacity: interpolate(frame - delay - introDelay, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
          }),
          transform: `translateY(${slideUpOffset + bounceEffect * 20}px)`,
        }}
          >
        <PlayerCard person={person} style={{ height: cardHeight }} />
          </div>
        );
          })}
        </div>
          </div>
        </div>
        <Audio
          volume={(f) =>
        interpolate(
          f,
          [0, 30, totalDuration - 10 * fps, totalDuration],
          [0, 0.5, 0.5, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
          }
          src={staticFile("_audio/parzival_william_rosati.mp3")}
          startFrom={120}
        />
      </Sequence>
      
      <Sequence from={12090}>
        <OffthreadVideo
          src={staticFile("_audio/outro.mp4")}
          style={{ width: "100%", height: "100%" }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
