"use client";

import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ServicesBanner from "@/components/ServicesBanner";
import Footer from "@/components/Footer";
import GlobalPartner from "@/components/GlobalPartner";
import RepairService from "@/components/RepairService";

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
  isFullComponent?: boolean;
}

const servicesData: ServiceData[] = [
  {
    id: "global-partner",
    title: "Your Global Partner",
    component: <ServicesBanner />,
    isFullBanner: true,
  },
  {
    id: "repair-service",
    title: "Repair Services",
    component: <RepairService />,
    isFullComponent: true,
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

  // 确保TabsContent内容始终可见
  useEffect(() => {
    console.log("activeTab changed:", activeTab);

    // 直接操作DOM，确保当前活动标签的内容可见
    servicesData.forEach((service) => {
      // 获取内容元素
      const contentElement = document.getElementById(`content-${service.id}`);
      if (!contentElement) {
        console.log(`Content not found: content-${service.id}`);
        return;
      }

      // 设置显示状态
      if (service.id === activeTab) {
        console.log(`Show content: ${service.id}`);
        contentElement.style.display = "block";
        contentElement.style.opacity = "1";

        // 确保内容在DOM中可见
        setTimeout(() => {
          // 强制重绘
          contentElement.style.display = "none";
          // 在下一个微任务中恢复显示
          setTimeout(() => {
            contentElement.style.display = "block";
            console.log(
              `Content ${service.id} has been repainted and displayed`
            );
          }, 0);
        }, 5);
      } else {
        console.log(`Hide content: ${service.id}`);
        contentElement.style.display = "none";
        contentElement.style.opacity = "0";
      }
    });
  }, [activeTab, servicesData]);

  // 在组件挂载时初始化所有TabsContent
  useEffect(() => {
    console.log("初始化所有TabsContent");

    // 确保所有TabsContent都已创建
    const initializeTabsContent = () => {
      servicesData.forEach((service, index) => {
        // 创建或获取内容容器
        let contentElement = document.getElementById(`content-${service.id}`);

        if (!contentElement) {
          console.log(`Create content element: content-${service.id}`);

          // 如果内容元素不存在，创建一个
          contentElement = document.createElement("div");
          contentElement.id = `content-${service.id}`;
          contentElement.className = "m-0 p-0 w-full h-full";
          contentElement.setAttribute("role", "tabpanel");
          contentElement.setAttribute(
            "data-state",
            service.id === activeTab ? "active" : "inactive"
          );
          contentElement.setAttribute("data-orientation", "vertical");

          // 设置样式
          contentElement.style.display =
            service.id === activeTab ? "block" : "none";
          contentElement.style.opacity = service.id === activeTab ? "1" : "0";
          contentElement.style.transition = "opacity 0.5s ease-in-out";

          // 获取section元素并添加内容
          const sectionElement = sectionsRef.current[index];
          if (sectionElement) {
            sectionElement.appendChild(contentElement);
          }
        } else {
          console.log(`Content element already exists: content-${service.id}`);

          // 更新现有元素的状态
          contentElement.setAttribute(
            "data-state",
            service.id === activeTab ? "active" : "inactive"
          );
          contentElement.style.display =
            service.id === activeTab ? "block" : "none";
          contentElement.style.opacity = service.id === activeTab ? "1" : "0";
          contentElement.style.transition = "opacity 0.5s ease-in-out";
        }
      });
    };

    // 在DOM更新后执行初始化
    setTimeout(initializeTabsContent, 100);
  }, [servicesData, activeTab]);

  // 处理滚动事件，包括滚动条拖动
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      // 如果滚动变化太小，则忽略
      if (Math.abs(scrollDelta) < 10) return;

      setIsScrolling(true);
      console.log(
        "Scroll event triggered, direction:",
        scrollDelta > 0 ? "down" : "up"
      );

      // 确定滚动方向
      const isScrollingDown = scrollDelta > 0;

      // 获取当前活动标签的索引
      const currentIndex = servicesData.findIndex(
        (service) => service.id === activeTab
      );
      console.log(
        "Current active tab index:",
        currentIndex,
        "Tab ID:",
        activeTab
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
      console.log(
        "Target tab index:",
        targetIndex,
        "Tab ID:",
        servicesData[targetIndex]?.id
      );

      // 如果目标索引与当前索引不同，则滚动到目标区域
      if (targetIndex !== currentIndex) {
        const targetSection = sectionsRef.current[targetIndex];
        if (targetSection) {
          console.log(
            "Preparing to scroll to target section:",
            servicesData[targetIndex].id
          );

          // 先淡出当前内容
          const currentContent = document.getElementById(
            `content-${activeTab}`
          );
          if (currentContent) {
            currentContent.style.opacity = "0";
            currentContent.style.transition = "opacity 0.3s ease-out";
          }

          // 延迟更新活动标签，等待淡出动画完成
          setTimeout(() => {
            // 更新活动标签
            setActiveTab(servicesData[targetIndex].id);

            // 确保内容可见
            servicesData.forEach((service, idx) => {
              const content = document.getElementById(`content-${service.id}`);
              if (content) {
                if (idx === targetIndex) {
                  content.style.display = "block";
                  // 使用setTimeout确保display更新后再设置opacity
                  setTimeout(() => {
                    content.style.opacity = "1";
                    content.style.transition = "opacity 0.5s ease-in";
                  }, 10);
                } else {
                  // 延迟隐藏其他内容，等待淡出完成
                  setTimeout(() => {
                    content.style.display = "none";
                  }, 300);
                }
              }
            });

            // 滚动到目标位置
            window.scrollTo({
              top: targetSection.offsetTop,
              behavior: "smooth",
            });

            // 更新最后滚动位置
            setLastScrollY(targetSection.offsetTop);

            // 滚动完成后重置状态
            setTimeout(() => {
              console.log("Scroll completed, resetting isScrolling");
              setIsScrolling(false);
            }, 800);
          }, 300); // 等待淡出动画完成
        }
      } else {
        console.log(
          "Target index is the same as the current index, no scrolling"
        );
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, isScrolling, lastScrollY, servicesData]);

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
          // 先淡出当前内容
          const currentContent = document.getElementById(
            `content-${activeTab}`
          );
          if (currentContent) {
            currentContent.style.opacity = "0";
            currentContent.style.transition = "opacity 0.3s ease-out";
          }

          // 延迟更新活动标签，等待淡出动画完成
          setTimeout(() => {
            // 更新活动标签
            setActiveTab(servicesData[targetIndex].id);

            // 确保内容可见
            servicesData.forEach((service, idx) => {
              const content = document.getElementById(`content-${service.id}`);
              if (content) {
                if (idx === targetIndex) {
                  content.style.display = "block";
                  // 使用setTimeout确保display更新后再设置opacity
                  setTimeout(() => {
                    content.style.opacity = "1";
                    content.style.transition = "opacity 0.5s ease-in";
                  }, 10);
                } else {
                  // 延迟隐藏其他内容，等待淡出完成
                  setTimeout(() => {
                    content.style.display = "none";
                  }, 300);
                }
              }
            });

            // 滚动到目标位置
            window.scrollTo({
              top: targetSection.offsetTop,
              behavior: "smooth",
            });

            // 更新最后滚动位置
            setLastScrollY(targetSection.offsetTop);

            // 滚动完成后重置状态
            setTimeout(() => {
              setIsScrolling(false);
            }, 800);
          }, 300); // 等待淡出动画完成
        }
      } else {
        setIsScrolling(false);
      }
    };

    // 添加事件监听器，阻止默认滚动
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeTab, isScrolling, lastScrollY, servicesData]);

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
          // 先淡出当前内容
          const currentContent = document.getElementById(
            `content-${activeTab}`
          );
          if (currentContent) {
            currentContent.style.opacity = "0";
            currentContent.style.transition = "opacity 0.3s ease-out";
          }

          // 延迟更新活动标签，等待淡出动画完成
          setTimeout(() => {
            // 更新活动标签
            setActiveTab(servicesData[targetIndex].id);

            // 确保内容可见
            servicesData.forEach((service, idx) => {
              const content = document.getElementById(`content-${service.id}`);
              if (content) {
                if (idx === targetIndex) {
                  content.style.display = "block";
                  // 使用setTimeout确保display更新后再设置opacity
                  setTimeout(() => {
                    content.style.opacity = "1";
                    content.style.transition = "opacity 0.5s ease-in";
                  }, 10);
                } else {
                  // 延迟隐藏其他内容，等待淡出完成
                  setTimeout(() => {
                    content.style.display = "none";
                  }, 300);
                }
              }
            });

            // 滚动到目标位置
            window.scrollTo({
              top: targetSection.offsetTop,
              behavior: "smooth",
            });

            // 更新最后滚动位置
            setLastScrollY(targetSection.offsetTop);

            // 滚动完成后重置状态
            setTimeout(() => {
              setIsScrolling(false);
            }, 800);
          }, 300); // 等待淡出动画完成
        }
      } else {
        setIsScrolling(false);
      }

      // 重置触摸起始位置
      touchStartY = touchY;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeTab, isScrolling, lastScrollY, servicesData]);

  // 点击标签时滚动到对应部分
  const scrollToSection = (id: string) => {
    if (isScrolling) return;

    const index = servicesData.findIndex((service) => service.id === id);
    if (index !== -1 && sectionsRef.current[index]) {
      setIsScrolling(true);

      // 先淡出当前内容
      const currentContent = document.getElementById(`content-${activeTab}`);
      if (currentContent) {
        currentContent.style.opacity = "0";
        currentContent.style.transition = "opacity 0.3s ease-out";
      }

      // 延迟更新活动标签，等待淡出动画完成
      setTimeout(() => {
        // 更新活动标签
        setActiveTab(id);

        // 确保内容可见
        servicesData.forEach((service, idx) => {
          const content = document.getElementById(`content-${service.id}`);
          if (content) {
            if (idx === index) {
              content.style.display = "block";
              // 使用setTimeout确保display更新后再设置opacity
              setTimeout(() => {
                content.style.opacity = "1";
                content.style.transition = "opacity 0.5s ease-in";
              }, 10);
            } else {
              // 延迟隐藏其他内容，等待淡出完成
              setTimeout(() => {
                content.style.display = "none";
              }, 300);
            }
          }
        });

        // 确保在下一个渲染周期执行滚动
        setTimeout(() => {
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
        }, 10);
      }, 300); // 等待淡出动画完成
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
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-gray-900 to-gray-900/90 w-full overflow-hidden"
      style={{ minHeight: "100vh" }} // 确保容器至少有一个视口高度
    >
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
              onClick={() => {
                if (activeTab !== service.id && !isScrolling) {
                  setIsScrolling(true);
                  setActiveTab(service.id);

                  window.scrollTo({
                    top: sectionsRef.current[index]?.offsetTop || 0,
                    behavior: "smooth",
                  });

                  setLastScrollY(sectionsRef.current[index]?.offsetTop || 0);

                  setTimeout(() => {
                    setIsScrolling(false);
                  }, 800);
                }
              }}
            >
              <div
                id={`content-${service.id}`}
                className="m-0 p-0 w-full h-full"
                style={{
                  display: service.id === activeTab ? "block" : "none",
                  opacity: service.id === activeTab ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
                role="tabpanel"
                data-state={service.id === activeTab ? "active" : "inactive"}
                data-orientation="vertical"
              >
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
                      >
                        <GlobalPartner />
                      </motion.div>
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
                ) : service.isFullComponent ? (
                  // 全屏组件，与GlobalPartner相同的背景色
                  <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-900/90 flex items-center justify-center">
                    {service.component}
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
              </div>
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ServicesContent;
