import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../index';

describe('EmptyState component', () => {
  it('should render with default icon', () => {
    render(<EmptyState />);

    const img = screen.getByAltText('empty');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('fall in faint.png'));
  });

  it('should render with custom title', () => {
    render(<EmptyState title="自定义标题" />);

    expect(screen.getByText('自定义标题')).toBeInTheDocument();
  });

  it('should render with custom description', () => {
    render(<EmptyState description="自定义描述" />);

    expect(screen.getByText('自定义描述')).toBeInTheDocument();
  });

  it('should render with custom icon', () => {
    render(<EmptyState icon="custom-icon.png" />);

    const img = screen.getByAltText('empty');
    expect(img).toHaveAttribute('src', 'custom-icon.png');
  });

  it('should render with action button', () => {
    const onAction = vi.fn();
    render(<EmptyState onAction={onAction} showAction={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call onAction when button is clicked', async () => {
    const onAction = vi.fn();
    render(<EmptyState onAction={onAction} showAction={true} />);

    const button = screen.getByRole('button');
    button.click();

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('should not render action button when showAction is false', () => {
    render(<EmptyState showAction={false} onAction={vi.fn()} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
