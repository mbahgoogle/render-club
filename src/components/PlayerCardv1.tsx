import React from "react";
import { TopPlayer } from "../types/schema";
import { CircleFlag } from "react-circle-flags";
import {
  FaFutbol as Football,
  FaBirthdayCake as Birthday,
  FaCalendar as Calendar,
} from "react-icons/fa";

import { TbSoccerField as Field } from "react-icons/tb";

import { BsPSquareFill as Position
} from "react-icons/bs";
import { MdStadium as Stadium,
  MdAccessTimeFilled as Time
 } from "react-icons/md";

import { getLogoCode } from "../utils/getLogoClub";
import { getCountryCode } from "../utils/getCountryCode";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { useCurrentFrame, interpolate, useVideoConfig, staticFile } from "remotion";



// Load fonts
const { fontFamily: robotoFont } = loadRoboto();
const { fontFamily: robotoMonoFont } = loadRobotoMono();
const { fontFamily: interFont } = loadInter();
const { fontFamily: RubikFont } = loadRubik();
const { fontFamily: PoppinsFont } = loadPoppins();


export const PlayerCard: React.FC<{
  person: TopPlayer & { club_logo?: string };
  style?: React.CSSProperties;
} > = ({ person, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const end = person.goals || 0;

  // Hitung durasi dalam frames
  let durationInFrames;
  if (end >= 600) {
    durationInFrames = fps * 2.5; // 2.5 detik untuk assist dan goals di atas 600
  } else if (end >= 300) {
    durationInFrames = fps * 2.5; // 2.5 detik untuk assist dan goals di atas 300
  } else {
    durationInFrames = Math.max(fps * 3, end * 5); // Minimal 3 detik untuk assist kecil
  }

  // Gunakan interpolate untuk animasi yang lebih halus
  const progress = interpolate(
    frame,
    [0, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Gunakan fungsi easing untuk animasi yang lebih natural
  const easedProgress = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  
  const displayedScores = Math.round(end * easedProgress);
  const HeightConfig = useVideoConfig().height * 0.94;
  return (
    <div
      className="flex justify-center items-center p-0"
      style={{
        ...style,
        height: "100%",
        fontFamily: `${robotoFont}, Arial, sans-serif`,
      }}
    >
      {/* Card dengan desain modern dan profesional */}
      <div className="w-[600px] bg-white rounded-xl shadow-5xl" style={{height: HeightConfig}}>
        {/* Header dengan gradien biru */}
        <div className="relative h-100 rounded-t-xl overflow-hidden" style={{ backgroundImage: `url(${staticFile('background/grass_mini.jpg')})`, backgroundSize: 'cover' }}>
          {/* Rank badge */}
          <div className="absolute bottom-10 left-6 w-30 h-30 flex items-center justify-center bg-gray-700 text-white font-semibold text-5xl rounded-full shadow-md" style={{fontFamily: RubikFont}}>
            {person.rank && (
                <>{person.rank}</>
            )}
          </div>

          {/* Pemain - Avatar */}
          {/* Proxy URL: https://aiodlobyyq.cloudimg.io/v7/ */}

          
            <div className="absolute top-10 right-35 w-80 h-80 flex items-center justify-center overflow-hidden rounded-full shadow-md">
            <img
              src={
                person.image_url ||
                `https://i.pravatar.cc/400?img=${(person.rank % 70) + 1}`
              }
              alt={person.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(person.name) +
                  "&background=random&size=256";
              }}
            />

            </div>

          
          {/* Pola dekoratif di background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-64 h-64 -mr-20 -mt-20 rounded-full bg-gray-400"></div>
            <div className="absolute left-0 bottom-0 w-32 h-32 -ml-10 -mb-10 rounded-full bg-gray-500"></div>
          </div>
        </div>

        {/* Player info dengan spacing yang lebih baik */}
        <div className="pt-8 px-6 pb-4">
          <div className="flex flex-col items-center text-center">
            {/* Player name dan info */}
            <div className="flex-grow">
              <h1 className="text-6xl font-bold text-gray-800">
                {person.jersey_name || person.name.split(" ").pop()}
              </h1>
              <p className="text-2xl text-gray-500 mt-2 font-extrabold tracking-wider" style={{ fontFamily: RubikFont}}>{person.name}</p>
              
                <div className="flex justify-center mt-4">
                <span className="bg-gray-800 text-white px-6 py-3 font-bold rounded-full flex items-center gap-3 text-3xl" style={{ willChange: "transform, opacity", fontFamily: RubikFont }}>
                  {person.nation}{" "}
                  {getCountryCode(person.nation_code) ? (
                  <CircleFlag
                    countryCode={getCountryCode(person.nation_code)}
                    height="50"
                    width="50"
                  />
                   ) : (
                  "🌍"
                  )}
                </span>
                </div>
            </div>
          </div>
        </div>

       

        {/* Assists and goals counter dengan desain clean */}
        <div className="px-6 py-4 bg-gray-800 border-t text-5xl border-b border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-gray-200 font-bold" style={{ fontFamily: robotoMonoFont }}>
              TOTAL GOALS
            </p>
            <div className="flex items-center gap-2 bg-gray-600 rounded-md px-3 py-2">
              <Football className="w-12 h-12 text-gray-200" />
              <span className="text-white font-bold" style={{ fontFamily: robotoMonoFont }}>
               {displayedScores}
              </span>
            </div>
          </div>
        </div>

        {/* Player details dengan grid layout yang lebih elegan */}
        <div className="grid grid-cols-2 gap-8 p-5">
          {/* year */}
          <div className="flex items-center text-left gap-4">
            <Calendar className="h-9 w-9 text-green-600" />
            <div>
                <p className="text-1xl text-gray-400 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Years</p>
                {person.period && (
                <p className="text-3xl font-extrabold" style={{ fontFamily: interFont}}> {person.period}</p>
                )}
            </div>
          </div>

          {/* Apps */}
          <div className="flex items-center text-left gap-4">
            <Field className="h-9 w-9 text-red-500" />
            <div>
            <p className="text-1xl text-gray-400 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Appearances</p>
              <p className="text-3xl font-extrabold" style={{ fontFamily: interFont}}>{person.appearances}</p>
            </div>
          </div>

          {/* Minutes Played */}
          <div className="flex items-center text-left gap-4">
            <Time className="h-9 w-9 text-amber-500" />
            <div>
                <p className="text-1xl text-gray-400 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Minutes Played</p>
                <p className="text-3xl font-extrabold" style={{ fontFamily: interFont}}>{person.minutes_played ? person.minutes_played.toLocaleString() : "N/A"}</p>
            </div>
          </div>

          {/* Birth Date */}
          <div className="flex items-center text-left gap-4">
            <Birthday className="h-9 w-9 text-purple-500" />
            <div>
              <p className="text-1xl text-gray-400 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Birthday</p>
              <p className="text-3xl font-extrabold" style={{ fontFamily: interFont}}>{person.date_of_birth || "N/A"}</p>
            </div>
          </div>

          {/* Team - Full width */}
          <div className="col-span-2 flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
            <Stadium className="h-12 w-12 text-gray-300" />
            <div>
              <p className="text-1xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>Team</p>
                <p className="text-3xl text-gray-50 font-bold">{person.club || "N/A"}</p>
            </div>
          </div>

          {/* Position - Full width */}
          <div className="col-span-2 flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
            <Position className="h-12 w-12 text-gray-300" />
            <div>
              <p className="text-1xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>Position</p>
              <p className="text-3xl text-gray-50 font-extrabold">{person.position || "Midfielder"}</p>
            </div>
          </div>

        </div>

      
        {/* Logo Klub Bola */}
        <div className="flex justify-center items-center py-2">
          <div className="w-45 h-45 flex items-center justify-center overflow-hidden bg-gray-0 rounded-md">
            <img
              src={getLogoCode(person.club)}
              alt="Club Logo"
              className="w-full h-full object-contain py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
