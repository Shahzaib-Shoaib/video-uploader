import React from "react";

export default function VideoCard(video: any) {
  return (
    <div>
      <div key={video.video.createdTime}>
        <div className="">
          <div className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4">
            <div className="flex h-60 flex-col justify-between overflow-hidden">
              <img
                src={video.video.thumbnailUrl}
                className=" h-full w-full object-fill duration-200"
              />
            </div>
            <div className="flex-1 overflow-hidden bg-white px-6 py-8">
              <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold">
                {video.video.title}{" "}
              </h5>
              <p className="mb-8 text-gray-600">{video.video.createdTime}</p>
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
                    {video.video.uploaderID}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
