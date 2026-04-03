/**
 * 像素风格 ECharts 主题配置
 * 模拟星露谷物语的像素艺术风格
 */

// 像素风格颜色
export const pixelColors = {
  // 支出 - 暖红色
  expense: '#e74c3c',
  expenseLight: '#ff6b6b',
  // 收入 - 草绿色
  income: '#27ae60',
  incomeLight: '#51cf66',
  // 木质色调
  woodDark: '#6e3b0b',
  woodMid: '#8b5a2b',
  woodLight: '#a07040',
  // 背景色
  bg: '#f4d03f',
  bgLight: '#f7dc6f',
  // 文字色
  text: '#5d4037',
  textLight: '#8d6e63',
  // 网格线
  grid: '#d4a574',
};

// 像素字体
export const pixelFont = "'PixelFont', 'Courier New', monospace";

/**
 * 计算合适的Y轴最大值，使柱状图高度更合理
 * 避免某一天数据很高时其他数据几乎看不见
 */
const calculateYAxisMax = (data: any[], showExpense: boolean, showIncome: boolean): number => {
  let maxValue = 0;
  data.forEach(d => {
    if (showExpense) maxValue = Math.max(maxValue, d.expense);
    if (showIncome) maxValue = Math.max(maxValue, d.income);
  });

  // 如果没有数据，返回一个默认值
  if (maxValue === 0) return 100;

  // 使用分位数计算，避免极端值影响
  // 将所有值排序，取90%分位数作为参考
  const allValues: number[] = [];
  data.forEach(d => {
    if (showExpense && d.expense > 0) allValues.push(d.expense);
    if (showIncome && d.income > 0) allValues.push(d.income);
  });

  if (allValues.length === 0) return 100;

  allValues.sort((a, b) => a - b);
  const percentile90 = allValues[Math.floor(allValues.length * 0.9)] || maxValue;

  // 取最大值和90%分位数的加权平均，使极端值不会完全主导
  // 这样可以让大部分数据都有一定高度显示
  const adjustedMax = Math.max(maxValue * 0.3, percentile90 * 1.2);

  // 向上取整到合适的刻度
  const magnitude = Math.pow(10, Math.floor(Math.log10(adjustedMax)));
  return Math.ceil(adjustedMax / magnitude) * magnitude;
};

/**
 * 获取像素风格柱状图配置
 */
export const getPixelBarOption = (data: any[], showExpense: boolean, showIncome: boolean): any => {
  const series: any[] = [];

  // 计算合适的Y轴最大值
  const yAxisMax = calculateYAxisMax(data, showExpense, showIncome);

  if (showExpense) {
    series.push({
      name: '支出',
      type: 'bar',
      data: data.map(d => d.expense),
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: pixelColors.expenseLight },
            { offset: 1, color: pixelColors.expense }
          ]
        },
        borderRadius: 0, // 像素风格不使用圆角
        borderWidth: 2,
        borderColor: pixelColors.woodDark,
        shadowBlur: 0,
        shadowColor: 'transparent',
      },
      barWidth: '60%',
      // 像素风格 - 添加边框效果
      emphasis: {
        itemStyle: {
          borderWidth: 3,
          borderColor: pixelColors.woodDark,
        }
      }
    });
  }

  if (showIncome) {
    series.push({
      name: '收入',
      type: 'bar',
      data: data.map(d => d.income),
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: pixelColors.incomeLight },
            { offset: 1, color: pixelColors.income }
          ]
        },
        borderRadius: 0,
        borderWidth: 2,
        borderColor: pixelColors.woodDark,
      },
      barWidth: '60%',
      emphasis: {
        itemStyle: {
          borderWidth: 3,
          borderColor: pixelColors.woodDark,
        }
      }
    });
  }

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(93, 64, 55, 0.1)'
        }
      },
      backgroundColor: pixelColors.bg,
      borderColor: pixelColors.woodDark,
      borderWidth: 2,
      textStyle: {
        color: pixelColors.text,
        fontFamily: pixelFont,
        fontSize: 12,
      },
      padding: 10,
      formatter: (params: any) => {
        const date = params[0]?.axisValue;
        let result = `<div style="font-weight:bold;margin-bottom:4px;">${date}日</div>`;
        params.forEach((p: any) => {
          if (p.value > 0) {
            result += `<div style="display:flex;align-items:center;margin:2px 0;">
              <span style="display:inline-block;width:10px;height:10px;background:${p.color.colorStops ? p.color.colorStops[0].color : p.color};border:1px solid ${pixelColors.woodDark};margin-right:6px;"></span>
              <span>${p.seriesName}: ¥${p.value.toFixed(2)}</span>
            </div>`;
          }
        });
        return result;
      },
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '8%',
      top: '8%',
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.date),
      axisLine: {
        show: true,
        lineStyle: {
          color: pixelColors.woodDark,
          width: 2,
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: pixelColors.woodDark,
          width: 2,
        }
      },
      axisLabel: {
        interval: 4,
        fontSize: 10,
        color: pixelColors.text,
        fontFamily: pixelFont,
        fontWeight: 'bold',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: pixelColors.grid,
          width: 1,
          type: 'solid',
        }
      }
    },
    yAxis: {
      type: 'value',
      show: false,
      // 设置最小值为0，最大值使用计算后的值
      // 这样可以让大部分数据都有合理的高度显示
      min: 0,
      max: yAxisMax,
    },
    series,
    animation: true,
    animationDuration: 300,
    animationEasing: 'linear',
  };
};

/**
 * 获取像素风格饼图配置
 */
export const getPixelPieOption = (data: any[]): any => {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: pixelColors.bg,
      borderColor: pixelColors.woodDark,
      borderWidth: 2,
      textStyle: {
        color: pixelColors.text,
        fontFamily: pixelFont,
        fontSize: 12,
      },
      formatter: (params: any) => {
        return `<div style="font-weight:bold;">${params.name}</div>
                <div>¥${params.value.toFixed(2)} (${params.percent}%)</div>`;
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        data: data,
        itemStyle: {
          borderRadius: 0,
          borderWidth: 3,
          borderColor: pixelColors.woodDark,
        },
        label: {
          show: true,
          fontFamily: pixelFont,
          fontSize: 11,
          color: pixelColors.text,
          fontWeight: 'bold',
          formatter: '{b}\n¥{c}',
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 10,
          lineStyle: {
            color: pixelColors.woodDark,
            width: 2,
          }
        },
        emphasis: {
          itemStyle: {
            borderWidth: 4,
            shadowBlur: 0,
          },
          label: {
            fontSize: 13,
          }
        }
      }
    ],
    color: [
      '#e74c3c', '#f39c12', '#f1c40f', '#27ae60',
      '#3498db', '#9b59b6', '#e91e63', '#00bcd4',
      '#ff5722', '#795548', '#607d8b', '#3f51b5'
    ],
    animation: true,
    animationDuration: 500,
    animationEasing: 'linear',
  };
};

/**
 * 获取像素风格折线图配置
 */
export const getPixelLineOption = (data: any[]): any => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: pixelColors.bg,
      borderColor: pixelColors.woodDark,
      borderWidth: 2,
      textStyle: {
        color: pixelColors.text,
        fontFamily: pixelFont,
        fontSize: 12,
      },
    },
    grid: {
      left: '8%',
      right: '4%',
      bottom: '12%',
      top: '8%',
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.date),
      axisLine: {
        lineStyle: {
          color: pixelColors.woodDark,
          width: 2,
        }
      },
      axisTick: {
        lineStyle: {
          color: pixelColors.woodDark,
          width: 2,
        }
      },
      axisLabel: {
        fontFamily: pixelFont,
        color: pixelColors.text,
        fontSize: 10,
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: pixelColors.woodDark,
          width: 2,
        }
      },
      axisTick: {
        lineStyle: {
          color: pixelColors.woodDark,
          width: 2,
        }
      },
      axisLabel: {
        fontFamily: pixelFont,
        color: pixelColors.text,
        fontSize: 10,
        formatter: (value: number) => {
          if (value >= 1000) {
            return (value / 1000).toFixed(0) + 'k';
          }
          return value.toFixed(0);
        }
      },
      splitLine: {
        lineStyle: {
          color: pixelColors.grid,
          width: 1,
          type: 'dashed',
        }
      }
    },
    series: [
      {
        type: 'line',
        data: data.map(d => d.value),
        smooth: false, // 像素风格使用直线
        symbol: 'rect', // 方形标记
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: pixelColors.woodDark,
        },
        itemStyle: {
          color: pixelColors.bg,
          borderColor: pixelColors.woodDark,
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(244, 208, 63, 0.5)' },
              { offset: 1, color: 'rgba(244, 208, 63, 0.1)' }
            ]
          }
        }
      }
    ],
    animation: true,
    animationDuration: 500,
    animationEasing: 'linear',
  };
};
