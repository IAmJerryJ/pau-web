"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/CompanyEnvironment.module.css";

const CompanyEnvironment = () => {
  // 图片数据
  const environmentImages = [
    { id: 1, src: "/environment/env1.jpg", alt: "环境图片 1" },
    { id: 2, src: "/environment/env2.jpg", alt: "环境图片 2" },
    { id: 3, src: "/environment/env3.jpg", alt: "环境图片 3" },
    { id: 4, src: "/environment/env4.jpg", alt: "环境图片 4" },
    { id: 5, src: "/environment/en5.jpg", alt: "环境图片 5" },
  ];

  // 状态管理：当前查看的大图
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // 打开大图模态框
  const openModal = (image: { src: string; alt: string }) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden"; // 防止背景滚动
  };

  // 关闭大图模态框
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // 恢复背景滚动
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className={styles.container}>
        <h2 className={styles.title}>Company Environment</h2>
        <div className={styles.bentoGrid}>
          {environmentImages.map((image) => (
            <div
              key={image.id}
              className={styles.bentoBox}
              onClick={() => openModal(image)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 大图查看模态框 */}
        {selectedImage && (
          <div className={styles.modal} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <div className={styles.modalImageContainer}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className={styles.modalImage}
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyEnvironment;
