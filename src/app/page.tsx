"use client";
import Header from "@/components/header";

import { getAllVideosFromDB, useUserData } from "./firebase/firebaseUtils";

export default function Home() {
  const userData = useUserData();
  const videosData = getAllVideosFromDB();

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
            videosData.map((video: any, index: any) => (
              <div key={index}>
                <div className="">
                  <div className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4">
                    <div className="flex h-60 flex-col justify-between overflow-hidden">
                      <img
                        src={video.thumbnailUrl}
                        className=" h-full w-full object-fill duration-200"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden bg-white px-6 py-8">
                      <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold">
                        {video.title}{" "}
                      </h5>
                      <p className="mb-8 text-gray-600">{video.createdTime}</p>
                      <div className="flex justify-between">
                        <a
                          href="#"
                          className="group text-lg font-bold focus:text-indigo-600 hover:text-indigo-600"
                        >
                          <span>▷ </span>
                          <span className=""> Watch Now</span>
                        </a>
                        <div className="max-w-full flex-none lg:px-4">
                          <h5 className="text-lg font-bold">
                            {video.uploaderID}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

Home.requireAuth = true;
