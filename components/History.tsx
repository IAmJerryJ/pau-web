"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

// 历史事件数据
interface HistoryEvent {
  year: number;
  title: string;
  content: string;
  image: string;
}

const historyEvents: HistoryEvent[] = [
  {
    year: 2025,
    title: "5 million repaired devices",
    content:
      "The constant increase of capacities and production quality over the years allowed us to reach a significant milestone. In 2022 we repaired the jubilee five millionth piece of electronic device.",
    image: "/2025.jpeg",
  },
  {
    year: 2024,
    title: "Manufactured 5 million pieces",
    content:
      "After five successful years on the market, we have already produced more than ten million pieces of quality electronics from a wide product portfolio.",
    image: "/2024.png",
  },
  {
    year: 2021,
    title: "Service division",
    content:
      "In 2021, we expanded by service division. With an initial capacity of 4,000 repaired units per month, our clients gained the opportunity to use a wide range of service solution.",
    image: "/2021.png",
  },
  {
    year: 2019,
    title: "Start of production",
    content:
      "In 2005 PEGATRON Australia begins its operations on the market. Large-scale production is launched on a production area exceeding 25,000 m².",
    image: "/2019.png",
  },
  {
    year: 2018,
    title: "Foundation stone laying",
    content:
      "Representatives of the Taiwanese HQ, with the participation of the mayor of the city of Sydney lay the foundation stone of construction of the Australian branch facility.",
    image: "/2018.jpg",
  },
];

const History = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev < historyEvents.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <div className="w-full pb-12 pt-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          {/* 左侧内容 */}
          <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-sm min-h-[600px] flex flex-col justify-between">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">
                {historyEvents[selectedIndex].year} -{" "}
                {historyEvents[selectedIndex].title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {historyEvents[selectedIndex].content}
              </p>
            </div>
            <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
              <Image
                src={historyEvents[selectedIndex].image}
                alt={`${historyEvents[selectedIndex].year} - ${historyEvents[selectedIndex].title}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 右侧时间轴和导航 */}
          <div className="w-full md:w-1/4 flex flex-col">
            <div className="flex justify-center mb-4">
              <button
                onClick={handlePrevious}
                disabled={selectedIndex === 0}
                className={cn(
                  "p-2 rounded-full hover:bg-gray-100 transition-colors",
                  selectedIndex === 0 ? "text-gray-300" : "text-gray-700"
                )}
              >
                <ChevronUp className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {historyEvents.map((event, index) => (
                <div
                  key={event.year}
                  onClick={() => setSelectedIndex(index)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="flex items-center cursor-pointer"
                >
                  <div
                    className={cn(
                      "w-16 h-16 min-w-[4rem] min-h-[4rem] flex items-center justify-center text-lg font-bold transition-colors",
                      selectedIndex === index
                        ? "bg-yellow-500 text-white"
                        : hoverIndex === index
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {event.year}
                  </div>
                  <div
                    className={cn(
                      "ml-4 font-medium transition-colors",
                      selectedIndex === index
                        ? "text-yellow-500"
                        : hoverIndex === index
                        ? "text-gray-700"
                        : "text-gray-700"
                    )}
                  >
                    {event.title}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleNext}
                disabled={selectedIndex === historyEvents.length - 1}
                className={cn(
                  "p-2 rounded-full hover:bg-gray-100 transition-colors",
                  selectedIndex === historyEvents.length - 1
                    ? "text-gray-300"
                    : "text-gray-700"
                )}
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
