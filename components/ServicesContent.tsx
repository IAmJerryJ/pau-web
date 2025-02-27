"use client";

import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ServicesBanner from "@/components/ServicesBanner";
import Footer from "@/components/Footer";

// 服务内容数据
interface ServiceData {
  id: string;
  title: string;
  description?: string;
  image?: string;
  features?: string[];
  component?: React.ReactNode;
  isFullBanner?: boolean;
  isContactSection?: boolean;
}

const servicesData: ServiceData[] = [
  {
    id: "global-partner",
    title: "Your Global Partner",
    component: <ServicesBanner />,
    isFullBanner: true,
  },
  {
    id: "service-1",
    title: "Repair",
    description:
      "We provide professional repair services for all types of equipment, ensuring your devices are in top condition.",
    image: "/services/service1.jpg",
    features: [
      "Advanced repair facilities",
      "Strict quality control processes",
      "Flexible production scale",
      "Fast delivery times",
    ],
  },
  {
    id: "service-2",
    title: "Scooter",
    description:
      "We offer high-quality electric scooters for sale and maintenance services, ensuring your mobility needs are met.",
    image: "/services/service2.jpg",
    features: [
      "24/7 technical support",
      "Professional repair services",
      "Preventive maintenance plans",
      "Remote diagnostic capabilities",
    ],
  },
  {
    id: "service-3",
    title: "Warehousing and Logistics",
    description:
      "We provide complete warehousing and logistics solutions to help you efficiently manage inventory and delivery.",
    image: "/services/service3.jpg",
    features: [
      "Modern warehousing facilities",
      "Real-time inventory tracking",
      "Global delivery network",
      "Custom logistics solutions",
    ],
  },
  {
    id: "service-4",
    title: "R&D",
    description:
      "Our R&D team is dedicated to innovation, developing cutting-edge technology solutions for our clients.",
    image: "/services/service4.jpg",
    features: [
      "Professional R&D team",
      "Latest technology applications",
      "Custom product development",
      "Continuous innovation process",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    isContactSection: true,
  },
];

const ServicesContent = () => {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 初始化窗口尺寸
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 处理滚动事件，包括滚动条拖动
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      // 如果滚动变化太小，则忽略
      if (Math.abs(scrollDelta) < 10) return;

      setIsScrolling(true);

      // 确定滚动方向
      const isScrollingDown = scrollDelta > 0;

      // 获取当前活动标签的索引
      const currentIndex = servicesData.findIndex(
        (service) => service.id === activeTab
      );

      // 计算目标索引
      let targetIndex = currentIndex;
      if (isScrollingDown && currentIndex < servicesData.length - 1) {
        // 向下滚动
        targetIndex = currentIndex + 1;
      } else if (!isScrollingDown && currentIndex > 0) {
        // 向上滚动
        targetIndex = currentIndex - 1;
      }

      // 如果目标索引与当前索引不同，则滚动到目标区域
      if (targetIndex !== currentIndex) {
        const targetSection = sectionsRef.current[targetIndex];
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          });

          setActiveTab(servicesData[targetIndex].id);
        }
      }

      // 更新最后滚动位置
      setLastScrollY(currentScrollY);

      // 滚动完成后重置状态
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, isScrolling, lastScrollY]);

  // 处理鼠标滚轮事件，任何滚动都会切换 section
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // 阻止默认滚动行为

      if (isScrolling) return;

      setIsScrolling(true);

      // 确定滚动方向
      const isScrollingDown = e.deltaY > 0;

      // 获取当前活动标签的索引
      const currentIndex = servicesData.findIndex(
        (service) => service.id === activeTab
      );

      // 计算目标索引
      let targetIndex = currentIndex;
      if (isScrollingDown && currentIndex < servicesData.length - 1) {
        // 向下滚动
        targetIndex = currentIndex + 1;
      } else if (!isScrollingDown && currentIndex > 0) {
        // 向上滚动
        targetIndex = currentIndex - 1;
      }

      // 如果目标索引与当前索引不同，则滚动到目标区域
      if (targetIndex !== currentIndex) {
        const targetSection = sectionsRef.current[targetIndex];
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          });

          setActiveTab(servicesData[targetIndex].id);
        }
      }

      // 更新最后滚动位置
      setLastScrollY(window.scrollY);

      // 滚动完成后重置状态
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    // 添加事件监听器，阻止默认滚动
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeTab, isScrolling]);

  // 处理触摸滑动事件（移动设备）
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // 如果滑动距离太小，则忽略
      if (Math.abs(diff) < 50) return;

      setIsScrolling(true);

      // 确定滚动方向
      const isScrollingDown = diff > 0;

      // 获取当前活动标签的索引
      const currentIndex = servicesData.findIndex(
        (service) => service.id === activeTab
      );

      // 计算目标索引
      let targetIndex = currentIndex;
      if (isScrollingDown && currentIndex < servicesData.length - 1) {
        // 向下滚动
        targetIndex = currentIndex + 1;
      } else if (!isScrollingDown && currentIndex > 0) {
        // 向上滚动
        targetIndex = currentIndex - 1;
      }

      // 如果目标索引与当前索引不同，则滚动到目标区域
      if (targetIndex !== currentIndex) {
        e.preventDefault();

        const targetSection = sectionsRef.current[targetIndex];
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          });

          setActiveTab(servicesData[targetIndex].id);
        }
      }

      // 更新最后滚动位置
      setLastScrollY(window.scrollY);

      // 滚动完成后重置状态
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);

      // 重置触摸起始位置
      touchStartY = touchY;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeTab, isScrolling]);

  // 点击标签时滚动到对应部分
  const scrollToSection = (id: string) => {
    if (isScrolling) return;

    const index = servicesData.findIndex((service) => service.id === id);
    if (index !== -1 && sectionsRef.current[index]) {
      setIsScrolling(true);
      setActiveTab(id);

      window.scrollTo({
        top: sectionsRef.current[index]?.offsetTop || 0,
        behavior: "smooth",
      });

      // 更新最后滚动位置
      setLastScrollY(sectionsRef.current[index]?.offsetTop || 0);

      // 滚动完成后重置滚动状态
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  // 初始化时禁用滚动条
  useEffect(() => {
    // 禁用滚动条但保持页面可滚动
    document.documentElement.style.scrollbarWidth = "none"; // Firefox

    // 为 Chrome/Safari 添加样式
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      
      /* IE/Edge */
      html {
        -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // 恢复滚动条
      document.documentElement.style.scrollbarWidth = "";
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f5f5f5] w-full overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={(value) => scrollToSection(value)}
        className="w-full"
      >
        {/* 固定在左侧的垂直标签栏 */}
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 ml-4 md:ml-8">
          <TabsList className="flex flex-col w-full h-auto space-y-4 bg-transparent p-0">
            {servicesData.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className={cn(
                  "justify-start text-left w-full py-3 px-4 rounded-full transition-all duration-300",
                  activeTab === service.id
                    ? "bg-primary text-white shadow-lg scale-110"
                    : "bg-white/80 text-gray-700 hover:bg-white"
                )}
              >
                <span className="hidden md:inline">{service.title}</span>
                <span className="inline md:hidden">
                  {service.id.includes("global")
                    ? "GP"
                    : service.id.split("-")[1]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* 全屏内容区域 */}
        <div className="w-full">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                sectionsRef.current[index] = el;
              }}
              id={service.id}
              className="h-screen w-full flex items-center justify-center"
              style={{
                height: `${windowHeight}px`,
                width: `${windowWidth}px`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <TabsContent value={service.id} className="m-0 p-0 w-full h-full">
                {service.isFullBanner ? (
                  // 全屏 Banner 组件
                  <div className="w-full h-full flex flex-col">
                    <div className="w-full" style={{ height: "25%" }}>
                      {service.component}
                    </div>
                    <div
                      className="w-full bg-gradient-to-b from-gray-900 to-gray-900/90"
                      style={{ height: "75%" }}
                    >
                      <motion.div
                        className="container mx-auto px-4 h-full flex items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                ) : service.isContactSection ? (
                  // 联系我们部分 + Footer
                  <div className="w-full h-full flex flex-col">
                    <div className="container mx-auto px-4 flex-grow flex flex-col justify-center items-center">
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto text-center mb-12"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold text-yellow-600 mb-6">
                          Get in Touch
                        </h2>
                        <p className="text-gray-700 text-lg mb-8">
                          We're here to help with all your service needs.
                          Contact us today to learn more about our services or
                          to request a quote.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              Visit Us
                            </h3>
                            <p className="text-gray-600">
                              Unit 4/5 Talavera Rd, <br />
                              Macquarie Park NSW 2113
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              Email Us
                            </h3>
                            <p className="text-gray-600">
                              info@pegatron.com.au
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              Call Us
                            </h3>
                            <p className="text-gray-600">+61 2 9888 9999</p>
                          </div>
                        </div>
                        <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                          Contact Us
                        </button>
                      </motion.div>
                    </div>
                    <Footer />
                  </div>
                ) : (
                  // 常规服务内容
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-10 max-w-6xl mx-auto"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-3xl font-bold text-yellow-600 mb-8">
                        {service.title}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-6 order-2 md:order-1">
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {service.description}
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                              Features
                            </h3>
                            <ul className="space-y-3">
                              {service.features?.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                  <span className="mr-2 text-primary text-xl">
                                    •
                                  </span>
                                  <span className="text-gray-700">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                          <Image
                            src={service.image || ""}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </TabsContent>
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ServicesContent;
