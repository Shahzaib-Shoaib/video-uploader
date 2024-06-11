"use client";
import {
  addVideotoDatabase,
  addVideotoMainDatabase,
  useUserData,
} from "../firebase/firebaseUtils";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import IDmaker from "../../../utils/IDmaker";
import storage from "../firebase/firebase";
import { useState } from "react";

export default function Upload() {
  const data: any = useUserData();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>([]);
  const [video, setVideo] = useState<any>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [imageProgress, setImageProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const handleUploadImage = () => {
    const promises: any[] = [];
    if (!image) {
      console.log("No image selected");
      return;
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    promises.push(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const imageProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(imageProgress, "prog");

        setImageProgress(imageProgress);
      },
      (error: any) => {
        console.log(error);
      },
      async () => {
        await storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()

          .then((imageUrl) => {
            setImageUrl(imageUrl);
          });
      }
    );

    Promise.all(promises)
      .then(() => {
        console.log("All images uploaded");
        console.log(imageUrl);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeImage = (e: any) => {
    if (e.target.files.length > 0) {
      const newImage: any = e.target.files[0];
      newImage["id"] = Math.random();
      setImage(newImage);
    }
  };

  const handleUploadVideo = () => {
    const promises: any[] = [];
    if (!video) {
      console.log("No video selected");
      return;
    }

    const uploadTask = storage.ref(`videos/${video.name}`).put(video);
    promises.push(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const videoProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(videoProgress, "prog");

        setVideoProgress(videoProgress);
      },
      (error: any) => {
        console.log(error);
      },
      async () => {
        await storage
          .ref("videos")
          .child(video.name)

          .getDownloadURL()

          .then((videoUrl) => {
            setVideoUrl(videoUrl);
          });
      }
    );

    Promise.all(promises)
      .then(() => {
        console.log("All videos uploaded");
        console.log(videoUrl);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeVideo = (e: any) => {
    if (e.target.files.length > 0) {
      const newVideo: any = e.target.files[0];
      newVideo["id"] = Math.random();
      setVideo(newVideo);
    } else {
      console.log("no uploaded videos found");
    }
  };

  const videoData = {
    uploaderID: IDmaker(
      data[0]?.email != null ? data[0].email : "idk@gmail.com"
    ),
    videoUrl: videoUrl,
    thumbnailUrl: imageUrl,
    title: title,
    createdTime: new Date().toISOString(),
  };

  function upload() {
    handleUploadImage();
    handleUploadVideo();
    addVideotoDatabase(videoData, data);
    addVideotoMainDatabase(videoData);
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Upload Video{" "}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 "
              >
                Video Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full rounded-md border-1 border-gray-300 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 "
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 bg-white/5">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="cover-photo"
                      className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="cover-photo"
                        name="cover-photo"
                        type="file"
                        className="sr-only"
                        onChange={handleChangeImage}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>
            </div>
            <button
              className=" bg-indigo-500 text-white border-0 py-1 px-4 mt-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
              onClick={handleUploadImage}
            >
              Upload
            </button>
            <p className="">{imageProgress}%</p>

            <span className="flex-row">
              <img
                style={{ width: "100px" }}
                src={imageUrl || "http://via.placeholder.com/300"}
                alt="firebase-image"
              />
            </span>
            <div className="col-span-full">
              <label
                htmlFor="video"
                className="block text-sm font-medium leading-6 "
              >
                Video
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 bg-white/5">
                <div className="text-center">
                  <VideoCameraIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />

                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="video"
                      className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="video"
                        name="video"
                        type="file"
                        className="sr-only"
                        onChange={handleChangeVideo}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    MP4 up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <button
              className=" bg-indigo-500 text-white border-0 py-1 px-4 mt-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
              onClick={handleUploadVideo}
              // disabled=""
            >
              Upload
            </button>
            <p className="">{videoProgress}%</p>

            <span className="flex-row">
              <img
                style={{ width: "100px" }}
                src={videoUrl || "http://via.placeholder.com/300"}
                alt="firebase-image"
              />
            </span>
            <div>
              <button
                className="disabled:opacity-40 flex w-full justify-center rounded-md text-white bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={upload}
                disabled={!videoUrl || !imageUrl}
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="text-black bg-white" onClick={uploadVideo}>
        Upload
      </button> */}
    </>
  );
}
