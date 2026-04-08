import { useRef, useState, useCallback } from 'react';
import { Modal, Button, message } from 'antd';
import { ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { RecordItem } from '../../api/record';
import styles from './index.module.scss';

interface ShareReceiptProps {
  date: string;
  records: RecordItem[];
  trigger?: React.ReactNode;
}

interface CategoryStat {
  category: string;
  categoryIcon: string;
  count: number;
  amount: number;
}

/**
 * 生成小票分享图片
 */
const ShareReceipt = ({ date, records, trigger }: ShareReceiptProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // 计算统计数据
  const calculateStats = useCallback(() => {
    const categoryMap = new Map<string, CategoryStat>();
    let totalExpense = 0;
    let totalIncome = 0;

    records.forEach(record => {
      const key = record.category;
      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          category: record.category,
          categoryIcon: record.categoryIcon,
          count: 0,
          amount: 0,
        });
      }
      const stat = categoryMap.get(key)!;
      stat.count += 1;
      stat.amount += record.amount;

      if (record.type === 'expense') {
        totalExpense += record.amount;
      } else {
        totalIncome += record.amount;
      }
    });

    const categoryStats = Array.from(categoryMap.values()).sort((a, b) => b.amount - a.amount);

    return {
      categoryStats,
      totalExpense,
      totalIncome,
      balance: totalIncome - totalExpense,
      count: records.length,
    };
  }, [records]);

  // 生成条形码数据
  const generateBarcode = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `No.${dayjs().format('YYYYMMDD')}${String(random).padStart(4, '0')}`;
  };

  // 绘制小票
  const drawReceipt = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stats = calculateStats();
    const barcode = generateBarcode();

    // 设置画布尺寸
    const width = 375; // 手机宽度
    const lineHeight = 24;
    const headerHeight = 120;
    const categoryHeaderHeight = 40;
    const categoryRowHeight = 32;
    const summaryHeight = 140;
    const barcodeHeight = 80;
    const footerHeight = 60;
    const padding = 20;

    const contentHeight = headerHeight +
      categoryHeaderHeight +
      (stats.categoryStats.length * categoryRowHeight) +
      summaryHeight +
      barcodeHeight +
      footerHeight +
      (padding * 2);

    canvas.width = width * 2; // 高清屏
    canvas.height = contentHeight * 2;
    ctx.scale(2, 2);

    // 白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, contentHeight);

    // 设置字体
    ctx.font = '14px monospace';
    ctx.fillStyle = '#333333';

    let y = padding;

    // 标题
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('享受记账乐趣，为财务自由做准备～', width / 2, y + 20);

    // 分隔线（虚线）
    y += 50;
    ctx.strokeStyle = '#333333';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    ctx.setLineDash([]);

    // 小票信息
    y += 30;
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('小票日期:', padding, y);
    ctx.textAlign = 'right';
    ctx.fillText(`${date} ${dayjs().format('HH:mm')}`, width - padding, y);

    y += 25;
    ctx.textAlign = 'left';
    ctx.fillText('小票单号:', padding, y);
    ctx.textAlign = 'right';
    ctx.fillText(barcode, width - padding, y);

    // 分隔线
    y += 20;
    ctx.strokeStyle = '#333333';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    ctx.setLineDash([]);

    // 表头
    y += 30;
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('分类', padding, y);
    ctx.textAlign = 'center';
    ctx.fillText('笔数', width / 2, y);
    ctx.textAlign = 'right';
    ctx.fillText('金额', width - padding, y);

    // 分隔线
    y += 10;
    ctx.strokeStyle = '#333333';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    ctx.setLineDash([]);

    // 分类数据
    y += 25;
    ctx.font = '14px monospace';
    stats.categoryStats.forEach((stat) => {
      ctx.textAlign = 'left';
      ctx.fillText(`${stat.categoryIcon} ${stat.category}`, padding, y);
      ctx.textAlign = 'center';
      ctx.fillText(String(stat.count), width / 2, y);
      ctx.textAlign = 'right';
      const sign = stat.amount < 0 ? '' : '-';
      ctx.fillText(`${sign}¥${stat.amount.toFixed(2)}`, width - padding, y);
      y += categoryRowHeight;
    });

    // 分隔线
    y += 5;
    ctx.strokeStyle = '#333333';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    ctx.setLineDash([]);

    // 汇总
    y += 30;
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('记账笔数:', padding, y);
    ctx.textAlign = 'right';
    ctx.fillText(String(stats.count), width - padding, y);

    y += 25;
    ctx.textAlign = 'left';
    ctx.fillText('支出合计:', padding, y);
    ctx.textAlign = 'right';
    ctx.fillText(`¥${stats.totalExpense.toFixed(2)}`, width - padding, y);

    y += 25;
    ctx.textAlign = 'left';
    ctx.fillText('收入合计:', padding, y);
    ctx.textAlign = 'right';
    ctx.fillText(`¥${stats.totalIncome.toFixed(2)}`, width - padding, y);

    y += 25;
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('结余:', padding, y);
    ctx.textAlign = 'right';
    const balanceSign = stats.balance >= 0 ? '' : '-';
    ctx.fillText(`${balanceSign}¥${Math.abs(stats.balance).toFixed(2)}`, width - padding, y);

    // 条形码
    y += 40;
    ctx.fillStyle = '#333333';
    const barcodeY = y;
    const barcodeHeight2 = 50;
    const lineWidth = 2;
    let x = padding + 20;

    // 绘制条形码线条
    for (let i = 0; i < 60; i++) {
      const w = Math.random() > 0.5 ? lineWidth : lineWidth * 2;
      ctx.fillRect(x, barcodeY, w, barcodeHeight2);
      x += w + 1;
    }

    // 条形码文字
    y += barcodeHeight2 + 20;
    ctx.font = '12px monospace';
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.fillText(barcode, width / 2, y);

    // 生成图片
    const dataUrl = canvas.toDataURL('image/png');
    setImageUrl(dataUrl);
  }, [date, records, calculateStats]);

  // 打开分享弹窗
  const handleOpen = () => {
    setIsModalOpen(true);
    // 延迟绘制，确保 canvas 已渲染
    setTimeout(() => {
      drawReceipt();
    }, 100);
  };

  // 保存图片
  const handleSave = () => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.download = `记账小票_${date}.png`;
    link.href = imageUrl;
    link.click();

    message.success('图片已保存');
  };

  // 分享图片
  const handleShare = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `记账小票_${date}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: '记账小票',
          text: `${date} 的记账记录`,
        });
      } else {
        // 不支持分享，直接保存
        handleSave();
      }
    } catch (error) {
      console.error('Share error:', error);
      handleSave();
    }
  };

  return (
    <>
      {trigger ? (
        <span onClick={handleOpen}>{trigger}</span>
      ) : (
        <ShareAltOutlined onClick={handleOpen} />
      )}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
        centered
        className={styles.shareModal}
      >
        <div className={styles.receiptContainer}>
          <canvas
            ref={canvasRef}
            className={styles.receiptCanvas}
            style={{ display: 'none' }}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="记账小票"
              className={styles.receiptImage}
            />
          )}
        </div>
        <div className={styles.actionButtons}>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleSave}
            className={styles.saveBtn}
          >
            保存图片
          </Button>
          <Button
            type="primary"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            className={styles.shareActionBtn}
          >
            分享
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ShareReceipt;
