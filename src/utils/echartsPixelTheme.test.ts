import { describe, it, expect } from 'vitest';
import {
  pixelColors,
  pixelFont,
  getPixelBarOption,
  getPixelPieOption,
  getPixelLineOption,
} from './echartsPixelTheme';

describe('pixelColors', () => {
  it('should have expense color', () => {
    expect(pixelColors.expense).toBe('#e74c3c');
  });

  it('should have income color', () => {
    expect(pixelColors.income).toBe('#27ae60');
  });

  it('should have wood colors', () => {
    expect(pixelColors.woodDark).toBe('#6e3b0b');
    expect(pixelColors.woodMid).toBe('#8b5a2b');
    expect(pixelColors.woodLight).toBe('#a07040');
  });

  it('should have bg colors', () => {
    expect(pixelColors.bg).toBe('#f4d03f');
    expect(pixelColors.bgLight).toBe('#f7dc6f');
  });

  it('should have text colors', () => {
    expect(pixelColors.text).toBe('#5d4037');
    expect(pixelColors.textLight).toBe('#8d6e63');
  });

  it('should have grid color', () => {
    expect(pixelColors.grid).toBe('#d4a574');
  });
});

describe('pixelFont', () => {
  it('should contain PixelFont family', () => {
    expect(pixelFont).toContain('PixelFont');
  });
});

describe('getPixelBarOption', () => {
  const sampleData = [
    { date: '1', expense: 100, income: 200 },
    { date: '2', expense: 150, income: 250 },
  ];

  it('should generate bar option with both expense and income', () => {
    const option = getPixelBarOption(sampleData, true, true);

    expect(option.series).toHaveLength(2);
    expect(option.series[0].name).toBe('支出');
    expect(option.series[1].name).toBe('收入');
    expect(option.xAxis.data).toEqual(['1', '2']);
    expect(option.yAxis.min).toBe(0);
    expect(option.grid).toBeDefined();
    expect(option.tooltip).toBeDefined();
  });

  it('should generate bar option with expense only', () => {
    const option = getPixelBarOption(sampleData, true, false);

    expect(option.series).toHaveLength(1);
    expect(option.series[0].name).toBe('支出');
  });

  it('should generate bar option with income only', () => {
    const option = getPixelBarOption(sampleData, false, true);

    expect(option.series).toHaveLength(1);
    expect(option.series[0].name).toBe('收入');
  });

  it('should generate bar option with no data', () => {
    const option = getPixelBarOption([], false, false);

    expect(option.series).toHaveLength(0);
  });

  it('should set borderRadius to 0 for pixel style', () => {
    const option = getPixelBarOption(sampleData, true, true);

    expect(option.series[0].itemStyle.borderRadius).toBe(0);
    expect(option.series[1].itemStyle.borderRadius).toBe(0);
  });

  it('should set barWidth to 60%', () => {
    const option = getPixelBarOption(sampleData, true, true);

    expect(option.series[0].barWidth).toBe('60%');
    expect(option.series[1].barWidth).toBe('60%');
  });
});

describe('getPixelPieOption', () => {
  it('should generate pie option with data', () => {
    const data = [
      { name: '餐饮', value: 300 },
      { name: '交通', value: 100 },
    ];

    const option = getPixelPieOption(data);

    expect(option.series).toHaveLength(1);
    expect(option.series[0].type).toBe('pie');
    expect(option.series[0].data).toEqual(data);
    expect(option.series[0].radius).toEqual(['40%', '70%']);
    expect(option.series[0].itemStyle.borderRadius).toBe(0);
    expect(option.tooltip).toBeDefined();
  });

  it('should generate pie option with empty data', () => {
    const option = getPixelPieOption([]);

    expect(option.series[0].data).toEqual([]);
  });

  it('should have color palette', () => {
    const option = getPixelPieOption([]);

    expect(option.color).toHaveLength(12);
    expect(option.color[0]).toBe('#e74c3c');
  });
});

describe('getPixelLineOption', () => {
  it('should generate line option with data', () => {
    const data = [
      { date: '1', value: 100 },
      { date: '2', value: 200 },
    ];

    const option = getPixelLineOption(data);

    expect(option.series).toHaveLength(1);
    expect(option.series[0].type).toBe('line');
    expect(option.series[0].smooth).toBe(false);
    expect(option.series[0].symbol).toBe('rect');
    expect(option.xAxis.data).toEqual(['1', '2']);
  });

  it('should format large Y-axis values with k suffix', () => {
    const data = [
      { date: '1', value: 5000 },
    ];

    const option = getPixelLineOption(data);
    const formatter = option.yAxis.axisLabel.formatter;

    expect(formatter(1000)).toBe('1k');
    expect(formatter(500)).toBe('500');
  });
});
