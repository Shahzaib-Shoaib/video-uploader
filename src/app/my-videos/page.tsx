"use client";
import Header from "@/components/header";
import React from "react";
import { useUserData } from "../firebase/firebaseUtils";
import VideoCard from "@/components/videoCard";

export default function myVideos() {
  const data: any = useUserData();
  function transformVideoData(data: any) {
    if (!data) return [];
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  }
  const transformedVideoData = transformVideoData(data[0]?.videos);

  return (
    <>
      <Header />
      <div className="mx-auto my-10 grid  max-w-screen-xl gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {transformedVideoData &&
          transformedVideoData.map((video: any) => (
            <VideoCard video={video} key={video.createdTime} />
          ))}
      </div>
    </>
  );
}
