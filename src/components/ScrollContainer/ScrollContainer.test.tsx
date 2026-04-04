import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollContainer } from '../index';

describe('ScrollContainer component', () => {
  it('should render children', () => {
    render(
      <ScrollContainer>
        <div data-testid="content">Test Content</div>
      </ScrollContainer>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <ScrollContainer className="custom-class">
        <div>Content</div>
      </ScrollContainer>
    );

    const container = screen.getByText('Content').parentElement;
    expect(container).toHaveClass('_scrollContainer_be15aa');
    expect(container).toHaveClass('custom-class');
  });

  it('should call onScrollEnd when scrolling to bottom', () => {
    const onScrollEnd = vi.fn();
    
    // Mock scrollHeight and clientHeight
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 500,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 100,
    });
    
    render(
      <ScrollContainer onScrollEnd={onScrollEnd} scrollEndThreshold={50}>
        <div style={{ height: '500px' }}>Tall Content</div>
      </ScrollContainer>
    );

    const container = screen.getByText('Tall Content').parentElement;
    if (container) {
      container.scrollTop = 400;
      container.dispatchEvent(new Event('scroll'));
      
      expect(onScrollEnd).toHaveBeenCalled();
    }
    
    // Restore
    vi.restoreAllMocks();
  });
});
