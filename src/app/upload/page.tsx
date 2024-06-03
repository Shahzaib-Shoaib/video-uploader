"use client";
import { addVideotoDatabase, getUserData } from "../firebase/firebaseUtils";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import IDmaker from "../../../utils/IDmaker";
import storage from "../firebase/firebase";
import { useState } from "react";

export default function Upload() {
  const data: any = getUserData();

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    const promises: any[] = [];
    images.map((image: any) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress, "prog");

          setProgress(progress);
        },
        (error: any) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls: any) => {
              setUrls((prevState): any => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        console.log("All images uploaded");
        console.log(urls);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: any) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage: any = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState): any => [...prevState, newImage]);
    }
  };

  const video = {
    uploaderID: IDmaker(
      data[0]?.email != null ? data[0].email : "idk@gmail.com"
    ),
    videoUrl: "https://example.com/video1.mp4",
    thumbnailUrl: "https://example.com/photo1.jpeg",
    title: "Video 1",
    createdTime: new Date().toISOString(),
  };

  function uploadVideo() {
    addVideotoDatabase(video, data);
    handleUpload();
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Upload Video{" "}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-white"
              >
                Video Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-white"
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
                        onChange={handleChange}
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
              className="text-white bg-indigo-500 border-0 py-1 px-4 mt-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
              onClick={handleUpload}
            >
              Upload
            </button>
            {/* <progress value={progress} max="100" className="rounded-sm ml-7" /> */}
            <p className="text-white">{progress}%</p>

            {urls.map((url, i) => (
              <span key={i} className="flex-row">
                <img
                  key={i}
                  style={{ width: "100px" }}
                  src={url || "http://via.placeholder.com/300"}
                  alt="firebase-image"
                />
              </span>
            ))}
            {/* <div className="col-span-full">
              <label
                htmlFor="video"
                className="block text-sm font-medium leading-6 text-white"
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
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    MP4 up to 10MB
                  </p>
                </div>
              </div>
            </div> */}

            <div>
              <button className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
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
