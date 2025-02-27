"use client";

import React from "react";
import { motion } from "framer-motion";
import { AmChartsWorldMap } from "@/components/ui/amcharts-world-map";

const GlobalPartner = () => {
  // 定义全球各地点的坐标
  const locations = [
    { name: "Taipei, Taiwan", lat: 25.033, lng: 121.5654 },
    { name: "Shanghai, China", lat: 31.2304, lng: 121.4737 },
    { name: "Suzhou, China", lat: 31.299, lng: 120.5853 },
    { name: "Chongqing, China", lat: 29.4316, lng: 106.9123 },
    { name: "Hai Phong, Vietnam", lat: 20.8449, lng: 106.6881 },
    { name: "Chennai, India", lat: 13.0827, lng: 80.2707 },
    { name: "Batam, Indonesia", lat: 1.0456, lng: 104.0304 },
    { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
    { name: "Sacramento, California, USA", lat: 38.5816, lng: -121.4944 },
    { name: "Lousville, Indiana, USA", lat: 38.2527, lng: -85.7585 },
    { name: "Juarez, Mexico", lat: 31.6904, lng: -106.4245 },
    { name: "Ostrava, Czech", lat: 49.8209, lng: 18.2625 },
  ];

  return (
    <div className="w-full h-full text-white">
      <div className="container mx-auto px-4 py-12 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 h-full mt-24">
          {/* 左侧文字内容 */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
              Your Global Partner
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              PEGATRON Corporation's mission is to achieve worldwide service
              coverage. Individual branches are located all over the world so
              that this strategic goal can be fulfilled. All are in constant
              contact with the central headquarters in Taipei City, Taiwan. With
              global market coverage, we strongly contribute to our ability to
              meet the needs of each of our clients and achieve the highest
              quality services in the industry.
            </p>
            <div className="pt-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-6 py-3 rounded-full transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* 右侧世界地图 */}
          <motion.div
            className="h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AmChartsWorldMap
              locations={locations}
              centralLocation={locations[0]}
              lineColor="#f59e0b"
              dotColor="#f59e0b"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPartner;
