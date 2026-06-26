import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  month: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  gradientFrom: string;
  gradientTo: string;
  gradientId: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, gradientFrom, gradientTo, gradientId }) => {
  const pathRef = useRef<SVGPathElement>(null);

  const width = 400;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue;

  const points = data.map((point, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
    return { x, y, value: point.value, month: point.month };
  });

  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlPointX = (current.x + next.x) / 2;

      path += ` C ${controlPointX} ${current.y}, ${controlPointX} ${next.y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const linePath = createSmoothPath(points);

  const areaPath = linePath +
    ` L ${points[points.length - 1].x} ${height - padding.bottom}` +
    ` L ${points[0].x} ${height - padding.bottom} Z`;

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
    }
  }, []);

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>

          <linearGradient id={`${gradientId}-area`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.15" />
            <stop offset="100%" stopColor={gradientFrom} stopOpacity="0.02" />
          </linearGradient>

          <filter id={`${gradientId}-glow`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={areaPath}
          fill={`url(#${gradientId}-area)`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${gradientId}-glow)`}
          initial={{ strokeDashoffset: pathRef.current?.getTotalLength() || 1000 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />

        {points.map((point, index) => (
          <g key={index}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="white"
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="cursor-pointer"
            />

            <motion.circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill={`url(#${gradientId})`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            />

            <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
              <rect
                x={point.x - 30}
                y={point.y - 45}
                width="60"
                height="30"
                rx="6"
                fill="#1f2937"
                opacity="0.95"
              />
              <text
                x={point.x}
                y={point.y - 28}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
              >
                {point.value.toLocaleString()}
              </text>
            </g>
          </g>
        ))}

        {points.map((point, index) => (
          <motion.text
            key={`label-${index}`}
            x={point.x}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            fontSize="11"
            fill="#6b7280"
            fontWeight="500"
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.08 }}
          >
            {point.month}
          </motion.text>
        ))}
      </svg>
    </div>
  );
};

export default LineChart;
