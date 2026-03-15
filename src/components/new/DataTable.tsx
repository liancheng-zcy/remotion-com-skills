// DataTable - 数据表格组件
// 用于展示对比数据，支持逐行显现动画和高亮

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from '../../design-system/tokens';

interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

interface TableRow {
  [key: string]: React.ReactNode;
}

interface DataTableProps {
  columns: TableColumn[];
  data: TableRow[];
  highlightColumn?: string; // 要高亮的列key
  highlightRow?: number; // 要高亮的行索引
  title?: string;
  startDelay?: number;
  rowDelay?: number; // 行间动画延迟
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  highlightColumn,
  highlightRow,
  title,
  startDelay = 0,
  rowDelay = 8,
}) => {
  const frame = useCurrentFrame();

  // 标题入场
  const titleOpacity = interpolate(frame - startDelay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame - startDelay, [0, 15], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 表头入场
  const headerOpacity = interpolate(frame - startDelay - 10, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.spacing.xxl,
      }}
    >
      {/* 标题 */}
      {title && (
        <div
          style={{
            fontSize: SIZES.h2,
            fontFamily: FONTS.display,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: SIZES.spacing.xl,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </div>
      )}

      {/* 表格 */}
      <div
        style={{
          width: '100%',
          maxWidth: 1400,
          opacity: headerOpacity,
        }}
      >
        {/* 表头 */}
        <div
          style={{
            display: 'flex',
            borderBottom: `2px solid ${COLORS.primary}60`,
            paddingBottom: SIZES.spacing.md,
            marginBottom: SIZES.spacing.md,
          }}
        >
          {columns.map((col) => (
            <div
              key={col.key}
              style={{
                flex: col.width ? undefined : 1,
                width: col.width,
                fontSize: SIZES.h4,
                fontFamily: FONTS.display,
                fontWeight: 600,
                color: COLORS.primary,
                textAlign: col.align || 'left',
                padding: `0 ${SIZES.spacing.sm}px`,
              }}
            >
              {col.title}
            </div>
          ))}
        </div>

        {/* 表体 */}
        <div>
          {data.map((row, rowIndex) => {
            const rowFrame = Math.max(0, frame - startDelay - 15 - rowIndex * rowDelay);

            // 行入场动画
            const rowOpacity = interpolate(rowFrame, [0, 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const rowX = interpolate(rowFrame, [0, 15], [-30, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });

            const isHighlighted = highlightRow === rowIndex;

            return (
              <div
                key={rowIndex}
                style={{
                  display: 'flex',
                  padding: `${SIZES.spacing.md}px 0`,
                  borderBottom: `1px solid ${COLORS.backgroundSecondary}`,
                  backgroundColor: isHighlighted ? `${COLORS.primary}15` : 'transparent',
                  borderRadius: SIZES.radius.md,
                  opacity: rowOpacity,
                  transform: `translateX(${rowX}px)`,
                  transition: 'none',
                }}
              >
                {columns.map((col) => {
                  const isColHighlighted = highlightColumn === col.key;
                  const cellContent = row[col.key];

                  return (
                    <div
                      key={col.key}
                      style={{
                        flex: col.width ? undefined : 1,
                        width: col.width,
                        fontSize: SIZES.h4,
                        fontFamily: FONTS.text,
                        color: isColHighlighted ? COLORS.primary : COLORS.text,
                        fontWeight: isColHighlighted ? 600 : 400,
                        textAlign: col.align || 'left',
                        padding: `0 ${SIZES.spacing.sm}px`,
                      }}
                    >
                      {cellContent}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 带进度条的表格行（用于推荐指数等）
interface ProgressRowProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  delay?: number;
  frame: number;
  fps: number;
}

export const ProgressRow: React.FC<ProgressRowProps> = ({
  label,
  value,
  maxValue = 5,
  color = COLORS.primary,
  delay = 0,
  frame,
  fps,
}) => {
  const itemFrame = Math.max(0, frame - delay);

  // 入场动画
  const opacity = interpolate(itemFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateX = interpolate(itemFrame, [0, 15], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 进度条动画
  const progressScale = spring({
    frame: itemFrame - 5,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const percentage = (value / maxValue) * 100;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: `${SIZES.spacing.md}px 0`,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {/* 标签 */}
      <div
        style={{
          width: 180,
          fontSize: SIZES.h4,
          fontFamily: FONTS.text,
          color: COLORS.text,
          fontWeight: 500,
        }}
      >
        {label}
      </div>

      {/* 进度条背景 */}
      <div
        style={{
          flex: 1,
          height: 12,
          backgroundColor: COLORS.backgroundSecondary,
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {/* 进度条填充 */}
        <div
          style={{
            width: `${percentage * progressScale}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 6,
          }}
        />
      </div>

      {/* 数值 */}
      <div
        style={{
          width: 80,
          textAlign: 'right',
          fontSize: SIZES.h4,
          fontFamily: FONTS.display,
          color: COLORS.text,
          fontWeight: 600,
          marginLeft: SIZES.spacing.md,
        }}
      >
        {value.toFixed(1)}
      </div>
    </div>
  );
};

// 进度表格组件
interface ProgressTableProps {
  title?: string;
  rows: Array<{
    label: string;
    value: number;
    maxValue?: number;
    color?: string;
  }>;
  startDelay?: number;
  rowDelay?: number;
}

export const ProgressTable: React.FC<ProgressTableProps> = ({
  title,
  rows,
  startDelay = 0,
  rowDelay = 10,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // 标题入场
  const titleOpacity = interpolate(frame - startDelay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame - startDelay, [0, 15], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.spacing.xxl,
      }}
    >
      {/* 标题 */}
      {title && (
        <div
          style={{
            fontSize: SIZES.h2,
            fontFamily: FONTS.display,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: SIZES.spacing.xl,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </div>
      )}

      {/* 进度行列表 */}
      <div style={{ width: '100%', maxWidth: 1000 }}>
        {rows.map((row, index) => (
          <ProgressRow
            key={index}
            label={row.label}
            value={row.value}
            maxValue={row.maxValue}
            color={row.color}
            delay={startDelay + 15 + index * rowDelay}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
