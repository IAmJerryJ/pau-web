import React from "react";
import Image from "next/image";

const Career = () => {
  return (
    <div className="mx-auto py-16 px-4 flex justify-center bg-[#f5f5f5] w-full">
      <div className="flex flex-col md:flex-row items-center max-w-full">
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square border-2 border-gray-300 rounded-md overflow-hidden">
            <Image
              src="/CareerBackground.jpg"
              alt="Career at Pegatron"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 p-16 rounded-md">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700 text-lg">
            Our team is a group of dedicated professionals who are passionate
            about what they do. We are a team of hardworking individuals who are
            committed to providing the best possible service to our clients.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-8">
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Career;
