"use client";

import React, { useEffect, useRef, useState } from "react";
import { PieChart, BarChart } from "@/once-ui/modules";
import { Row } from "@/once-ui/components";

const ChartWrapper = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Trigger once
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 40px 0px",
        threshold: 0.2,
      }
    );

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={chartRef} style={{ minHeight: "580px", position: "relative" }}>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        {visible && (
          <Row
            fillWidth
            gap="m"
            marginBottom="xl"
            className="space-y-4"
            align="center"
          >
            <PieChart
              title="Tech Impact Focus"
              legend={{ display: true, position: "bottom-center" }}
              ring={{ inner: 40, outer: 70 }}
              series={{ key: "value" }}
              origo={{ x: 50, y: 40 }}
              data={[
                { name: "AI/LLM Innovation", value: 30 },
                { name: "Product Development", value: 20 },
                { name: "System Design & Architecture", value: 20 },
                { name: "Security & Compliance", value: 15 },
                { name: "Cloud & Infrastructure", value: 15 },               
              ]}
            />

            <BarChart
              title="Technical Experience (7+ Years)"
              axis="x"
              barWidth="xl"
              legend={{ position: "bottom-center" }}
              series={[{ key: "Years", color: "violet" }]}
              data={[
                { label: "TypeScript", Years: 7 },
                { label: "React", Years: 7 },
                { label: "Node.js", Years: 6 },
                { label: "Python", Years: 7 },
                { label: "Go", Years: 6 },
                { label: "GraphQL", Years: 5 },
                { label: "AWS", Years: 7 },
                { label: "PostgreSQL", Years: 6 },
                { label: "MySQL", Years: 6 },
              ]}
            />
          </Row>
        )}
      </div>
    </div>
  );
};

export default ChartWrapper;
