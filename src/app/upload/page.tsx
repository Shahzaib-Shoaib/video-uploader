"use client";
import getUserData from "../firebase/getUserData";

import { ref, set } from "firebase/database";
import { database } from "../firebase/firebase";

export default function Upload() {
  const data: any = getUserData();
  const videoFolder = {
    video1: {
      url: "https://example.com/video1.mp4",
      name: "Video 1",
      updatedTime: new Date().toISOString(),
    },
    video2: {
      url: "https://example.com/video2.mp4",
      name: "Video 2",
      updatedTime: new Date().toISOString(),
    },
    // Add more videos as needed
  };

  //   const tobobo = data[1].toString()

  // Reference to the 'videos' node in the database
  const videosRef = ref(database, "data/" + data[1] + "/videos");

  function uploadVideo() {
    console.log("op");

    set(videosRef, videoFolder)
      .then(() => {
        console.log("Videos data set successfully!", videosRef, videosRef);
      })
      .catch((error) => {
        console.error(
          "Error setting videos data:",
          error,
          videosRef,
          videosRef
        );
      });
  }
  //   uploadVideo()

  console.log(data);

  return (
    <div className="text-white">
      <p> {data[1]}</p>
      <button className="bg-white text-black" onClick={uploadVideo}>
        Upload
      </button>
    </div>
  );
}
