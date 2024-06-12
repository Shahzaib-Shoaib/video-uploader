import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export function useUserData() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(
        "https://video-uploader-432f2-default-rtdb.firebaseio.com/data.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const fetchedUserData: any = [];

          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const userData = data[key];
              if (userData.email == session?.user?.email) {
                console.log(userData.uid, key);
                fetchedUserData.push(userData);
                fetchedUserData.push(key);
              }
            }
          }
          setUserData(fetchedUserData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [session, status]);

  return userData;
}

export function addVideotoDatabase(videoData: any, data: any) {
  fetch(
    `https://video-uploader-432f2-default-rtdb.firebaseio.com/data/${data[1]}/videos.json`,
    {
      method: "POST",
      body: JSON.stringify(videoData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(() => {
    console.log("Video added to database successfully");
  });
}

export function addVideotoMainDatabase(videoData: any) {
  fetch(
    `https://video-uploader-432f2-default-rtdb.firebaseio.com/videos.json`,
    {
      method: "POST",
      body: JSON.stringify(videoData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(() => {
    console.log("Video added to database successfully");
  });
}

export function useAllVideosFromDB() {
  const [videosData, setVideosData] = useState<any>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://video-uploader-432f2-default-rtdb.firebaseio.com/videos.json"
        );
        const data = await response.json();

        const fetchedVideoData: any = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setVideosData(fetchedVideoData);
      } catch (error) {
        console.error("Error fetching data:");
      }
    };

    fetchVideos();
  }, []);

  return videosData;
}
