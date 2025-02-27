"use client";

import React, { useLayoutEffect, useRef } from "react";

// 定义位置接口
interface Location {
  name: string;
  lat: number;
  lng: number;
  value?: number;
}

interface AmChartsWorldMapProps {
  locations: Location[];
  centralLocation?: Location;
  lineColor?: string;
  dotColor?: string;
}

export function AmChartsWorldMap({
  locations = [],
  centralLocation,
  lineColor = "#f59e0b",
  dotColor = "#f59e0b",
}: AmChartsWorldMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);

  // 使用useLayoutEffect确保DOM准备好后再创建图表
  useLayoutEffect(() => {
    // 动态导入amcharts库，因为它是客户端库
    const initChart = async () => {
      // 导入必要的amcharts模块
      const am5 = await import("@amcharts/amcharts5");
      const am5map = await import("@amcharts/amcharts5/map");
      const am5geo = await import("@amcharts/amcharts5-geodata/worldLow");
      const am5themes_Animated = await import(
        "@amcharts/amcharts5/themes/Animated"
      );

      // 如果已经有图表实例，则销毁它
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }

      // 创建根元素
      const root = am5.Root.new(chartRef.current!);
      chartInstanceRef.current = root;

      // 禁用amCharts水印
      root._logo?.dispose();

      // 设置主题
      root.setThemes([am5themes_Animated.default.new(root)]);

      // 创建地图图表
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "none", // 禁用平移
          panY: "none", // 禁用平移
          projection: am5map.geoMercator(),
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingTop: 0,
          wheelX: "none", // 禁用水平滚轮缩放
          wheelY: "none", // 禁用垂直滚轮缩放
          pinchZoom: false, // 禁用捏合缩放
        })
      );

      // 创建多边形系列（国家轮廓）- 基础浅蓝色
      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geo.default,
          exclude: ["AQ"], // 排除南极洲
          fill: am5.color(0xd9edf7), // 浅蓝色填充
          stroke: am5.color(0xaed6f1), // 浅蓝色边框
        })
      );

      // 设置多边形悬停状态
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0xc5e1f5),
      });

      // 定义需要高亮的国家/地区
      const highlightedCountries = [
        "TW", // Taiwan
        "CN", // China
        "VN", // Vietnam
        "IN", // India
        "ID", // Indonesia
        "JP", // Japan
        "AU", // Australia
        "NZ", // New Zealand
        "US", // USA
        "MX", // Mexico
        // 欧洲国家
        "AT",
        "BE",
        "BG",
        "HR",
        "CY",
        "CZ",
        "DK",
        "EE",
        "FI",
        "FR",
        "DE",
        "GR",
        "HU",
        "IE",
        "IT",
        "LV",
        "LT",
        "LU",
        "MT",
        "NL",
        "PL",
        "PT",
        "RO",
        "SK",
        "SI",
        "ES",
        "SE",
        "GB",
        "CH",
        "NO",
      ];

      // 创建高亮国家的多边形系列
      const highlightPolygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geo.default,
          include: highlightedCountries,
          fill: am5.color(0x3182bd), // 深蓝色填充
          stroke: am5.color(0x2171b5), // 深蓝色边框
        })
      );

      // 设置高亮多边形悬停状态
      highlightPolygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0x4292c6),
      });

      // 创建点系列（位置标记）
      const pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      );

      // 配置点的外观
      pointSeries.bullets.push(() => {
        // 创建圆形子弹
        const circle = am5.Circle.new(root, {
          radius: 6,
          fill: am5.color(dotColor),
          fillOpacity: 0.8,
          tooltipText: "{name}",
        });

        // 添加脉冲动画
        const pulseCircle = am5.Circle.new(root, {
          radius: 6,
          fill: am5.color(dotColor),
          fillOpacity: 0,
        });

        // 创建脉冲动画
        const pulseAnimation = (target: any) => {
          target.animate({
            key: "radius",
            from: 6,
            to: 20,
            duration: 1500,
            loops: Infinity,
            easing: am5.ease.out(am5.ease.cubic),
          });
          target.animate({
            key: "fillOpacity",
            from: 0.8,
            to: 0,
            duration: 1500,
            loops: Infinity,
            easing: am5.ease.out(am5.ease.cubic),
          });
        };

        // 启动脉冲动画
        pulseAnimation(pulseCircle);

        // 创建容器包含圆形和脉冲
        const container = am5.Container.new(root, {});
        container.children.push(pulseCircle);
        container.children.push(circle);

        return am5.Bullet.new(root, {
          sprite: container,
        });
      });

      // 添加位置数据
      const data = locations.map((location) => ({
        geometry: {
          type: "Point",
          coordinates: [location.lng, location.lat],
        },
        name: location.name,
        value: location.value || 1,
      }));

      pointSeries.data.setAll(data);

      // 确保地图显示整个世界
      polygonSeries.events.on("datavalidated", function () {
        chart.zoomToGeoPoint({ longitude: 10, latitude: 20 }, 1);
      });

      // 设置初始缩放级别和位置
      chart.appear(1000, 100);
    };

    initChart();

    // 清理函数
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }
    };
  }, [locations, centralLocation, lineColor, dotColor]);

  return (
    <div
      ref={chartRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ background: "#ffffff" }}
    ></div>
  );
}
