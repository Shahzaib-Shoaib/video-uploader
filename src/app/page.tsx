"use client";
import Header from "@/components/header";

import { useAllVideosFromDB, useUserData } from "./firebase/firebaseUtils";
import VideoCard from "@/components/videoCard";

export default function Home() {
  const userData = useUserData();
  const videosData = useAllVideosFromDB();

  console.log(videosData);

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="">
          {userData &&
            userData.map((user: any, index: any) => (
              <div key={index}>
                <p>{user.email}</p>
                <p>{user.uid}</p>
              </div>
            ))}
        </div>

        <div className="mx-auto my-10 grid  max-w-screen-xl gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {videosData &&
            videosData.map((video: any) => (
              <VideoCard video={video} key={video.createdTime} />
            ))}
        </div>
      </div>
    </>
  );
}

Home.requireAuth = true;
