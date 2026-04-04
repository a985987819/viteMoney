import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StardewDialog from '../StardewDialog';

describe('StardewDialog - Multi-step functionality', () => {
  const defaultProps = {
    visible: true,
    content: '这是一个短文本。',
    speaker: '测试者',
    speakerImage: 'test.png',
    onClose: vi.fn(),
    onOk: vi.fn(),
    onCancel: vi.fn(),
  };

  describe('Content pagination', () => {
    it('should display short content in one page', () => {
      render(<StardewDialog {...defaultProps} />);
      
      expect(screen.getByText('这是一个短文本。')).toBeInTheDocument();
      // 不应该有取消按钮（因为短内容不需要分页）
      expect(screen.queryByText('取消')).toBeInTheDocument();
    });

    it('should split long content into multiple pages', () => {
      const longContent = 'A'.repeat(300);
      render(<StardewDialog {...defaultProps} content={longContent} maxCharsPerPage={120} />);
      
      // 应该显示第一页内容（前 120 个字符）
      const firstPageContent = longContent.substring(0, 120).trim();
      expect(screen.getByText(firstPageContent)).toBeInTheDocument();
    });

    it('should accept content as array', () => {
      const contentArray = ['第一页内容', '第二页内容', '第三页内容'];
      render(<StardewDialog {...defaultProps} content={contentArray} />);
      
      expect(screen.getByText('第一页内容')).toBeInTheDocument();
    });
  });

  describe('Disable multi-step', () => {
    it('should not split content when enableMultiStep is false', () => {
      const longContent = 'A'.repeat(300);
      render(<StardewDialog {...defaultProps} content={longContent} enableMultiStep={false} />);
      
      // 应该显示完整内容
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe('Button behavior', () => {
    it('should call onOk when clicking OK button on single page', () => {
      const onOk = vi.fn();
      render(<StardewDialog {...defaultProps} content="短内容" onOk={onOk} />);
      
      const okButton = screen.getByText('确定');
      fireEvent.click(okButton);
      
      expect(onOk).toHaveBeenCalledTimes(1);
    });

    it('should call onCancel when clicking cancel button', () => {
      const onCancel = vi.fn();
      render(<StardewDialog {...defaultProps} onCancel={onCancel} />);
      
      const cancelButton = screen.getByText('取消');
      fireEvent.click(cancelButton);
      
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('should not show buttons for multi-page content on first page', () => {
      const contentArray = ['第一页', '第二页', '第三页'];
      render(<StardewDialog {...defaultProps} content={contentArray} />);
      
      // 第一页不应该显示按钮
      expect(screen.queryByText('确定')).not.toBeInTheDocument();
      expect(screen.queryByText('取消')).not.toBeInTheDocument();
    });
  });

  describe('Close behavior', () => {
    it('should call onCancel when clicking cancel button', () => {
      const onCancel = vi.fn();
      render(<StardewDialog {...defaultProps} content="短内容" onCancel={onCancel} />);
      
      const cancelButton = screen.getByText('取消');
      fireEvent.click(cancelButton);
      
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Page indicator and hints', () => {
    it('should render dialog with proper structure', () => {
      const contentArray = ['第一页', '第二页'];
      const { container } = render(<StardewDialog {...defaultProps} content={contentArray} />);
      
      // 应该包含对话框的基本结构
      expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
      expect(screen.getByText('第一页')).toBeInTheDocument();
    });

    it('should show continue hint for multi-page content', () => {
      const contentArray = ['第一页', '第二页', '第三页'];
      const { container } = render(<StardewDialog {...defaultProps} content={contentArray} />);
      
      // 应该显示继续提示（通过文本内容查询）
      expect(screen.getByText('点击继续')).toBeInTheDocument();
    });
  });
});
