"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// 用于数字动画的自定义钩子
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(percentage * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

// 格式化数字为带逗号的字符串
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const RepairService = () => {
  const repairedCount = useCountUp(3500000, 3000);
  const areaCount = useCountUp(18000, 3000);
  const yearsCount = useCountUp(6, 1500);

  return (
    <div className="w-full h-full text-white">
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* 左侧文字内容 */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
              Repair Services
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We realize that speed is an essential element in providing of
              services. That's why we designed a unique concept of the repair
              process, thanks to which we can handle more than 80 % of the
              received orders in a single day. All service operations are
              performed by regularly trained and certified employees under the
              supervision of strict quality standards. Our service portfolio is
              widely diversified and grows according to demand of our clients.
            </p>

            {/* 动态数字统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <motion.div
                className="bg-gray-800/50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-3xl font-bold text-yellow-500">
                  {formatNumber(repairedCount)}
                </div>
                <div className="text-gray-400 mt-2">pcs products repaired</div>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-3xl font-bold text-yellow-500">
                  {formatNumber(areaCount)} m<sup>2</sup>
                </div>
                <div className="text-gray-400 mt-2">of factory area</div>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="text-3xl font-bold text-yellow-500">
                  {yearsCount}
                </div>
                <div className="text-gray-400 mt-2">years on the market</div>
              </motion.div>
            </div>
          </motion.div>

          {/* 右侧图片 */}
          <motion.div
            className="relative h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/services/repair-service.jpg"
              alt="Repair Service"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RepairService;
