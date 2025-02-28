"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

interface Product {
  title: string;
  category: string;
  src: string;
  content: React.ReactNode;
}

const ManufacturingServices = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const products: Product[] = [
    {
      title: "Scooter",
      category: "Electric Mobility",
      src: "/Scooter.jpg",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Our electric scooters are designed with cutting-edge technology and
            manufactured with precision. We offer customizable production
            solutions to meet your specific requirements.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>High-quality materials and components</li>
            <li>Energy-efficient battery systems</li>
            <li>Customizable designs and features</li>
            <li>Rigorous quality control standards</li>
          </ul>
        </div>
      ),
    },
    {
      title: "ATM",
      category: "Financial Technology",
      src: "/ATM.jpg",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            We manufacture reliable and secure ATM systems with advanced
            security features. Our manufacturing process ensures durability and
            consistent performance.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Advanced security protocols</li>
            <li>Durable hardware components</li>
            <li>User-friendly interfaces</li>
            <li>Customizable branding options</li>
          </ul>
        </div>
      ),
    },
    {
      title: "iPhone",
      category: "Mobile Devices",
      src: "/IPhone.jpg",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Our manufacturing facilities are equipped to produce high-quality
            mobile devices with precision and efficiency. We specialize in
            component assembly and quality testing.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Precision component assembly</li>
            <li>Comprehensive quality testing</li>
            <li>Advanced display technologies</li>
            <li>Efficient production processes</li>
          </ul>
        </div>
      ),
    },
    {
      title: "MacBook",
      category: "Computing Devices",
      src: "/Macbook.jpg",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            We offer manufacturing solutions for premium computing devices,
            focusing on precision engineering and quality assurance throughout
            the production process.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Aluminum unibody construction</li>
            <li>High-resolution display assembly</li>
            <li>Thermal management systems</li>
            <li>Comprehensive testing protocols</li>
          </ul>
        </div>
      ),
    },
    {
      title: "AirPods",
      category: "Audio Accessories",
      src: "/Airpods.jpg",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Our manufacturing capabilities extend to precision audio
            accessories, with a focus on miniaturization and wireless technology
            integration.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Miniaturized component assembly</li>
            <li>Wireless connectivity solutions</li>
            <li>Battery optimization techniques</li>
            <li>Acoustic performance testing</li>
          </ul>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const checkScrollability = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;

        // 添加5px的缓冲区，确保更精确的检测
        setCanScrollLeft(scrollLeft > 5);

        // 只有当滚动到最右侧（考虑5px的误差）时才禁用右侧按钮
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
      }
    };

    // 初始检查
    checkScrollability();

    // 添加滚动事件监听器
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollability);
    }

    // 添加窗口大小变化事件监听器
    window.addEventListener("resize", checkScrollability);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollability);
      }
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current && canScrollLeft) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && canScrollRight) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full text-white">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          className="space-y-8 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
            Manufacturing Services
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            With state-of-the-art facilities and experienced teams, we provide
            comprehensive manufacturing services across various product
            categories. Our precision engineering and quality control ensure
            exceptional products that meet the highest standards.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 pt-4 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                className="relative rounded-xl overflow-hidden cursor-pointer group min-w-[250px] md:min-w-[300px] mx-3 snap-center"
                style={{ aspectRatio: "1/2" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProduct(product)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={product.src}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium opacity-80">
                    {product.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {product.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* 滚动箭头 */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              className={`h-10 w-10 rounded-full ${
                canScrollLeft
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-800/50 cursor-not-allowed"
              } flex items-center justify-center transition-colors`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <IconArrowNarrowLeft className="h-6 w-6 text-white" />
            </button>
            <button
              className={`h-10 w-10 rounded-full ${
                canScrollRight
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-800/50 cursor-not-allowed"
              } flex items-center justify-center transition-colors`}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <IconArrowNarrowRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedProduct(null)}
              />
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-auto relative z-10"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <button
                  className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 rounded-full p-2"
                  onClick={() => setSelectedProduct(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative h-64 md:h-auto md:w-1/3 rounded-lg overflow-hidden">
                    <Image
                      src={selectedProduct.src}
                      alt={selectedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-sm font-medium text-primary">
                      {selectedProduct.category}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedProduct.title}
                    </h2>
                    <div className="text-gray-700 dark:text-gray-300">
                      {selectedProduct.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ManufacturingServices;
