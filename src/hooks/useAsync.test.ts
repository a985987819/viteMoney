import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAsync } from './useAsync';

describe('useAsync hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const { result } = renderHook(() => useAsync(mockFn, { immediate: false }));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('should handle async function execution', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const { result } = renderHook(() => useAsync(mockFn, { immediate: false }));

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle error', async () => {
    const mockError = new Error('Test error');
    const mockFn = vi.fn().mockRejectedValue(mockError);
    const { result } = renderHook(() => useAsync(mockFn, { immediate: false }));

    await act(async () => {
      try {
        await result.current.execute();
      } catch (error) {
        // Expected error
      }
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.data).toBeNull();
  });

  it('should reset state when reset is called', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const { result } = renderHook(() => useAsync(mockFn, { immediate: false }));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toBe('success');

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn();
    const mockFn = vi.fn().mockResolvedValue('success');
    const { result } = renderHook(() => useAsync(mockFn, { immediate: false, onSuccess }));

    await act(async () => {
      await result.current.execute();
    });

    expect(onSuccess).toHaveBeenCalledWith('success');
  });

  it('should call onError callback on error', async () => {
    const mockError = new Error('Test error');
    const onError = vi.fn();
    const mockFn = vi.fn().mockRejectedValue(mockError);
    const { result } = renderHook(() => useAsync(mockFn, { immediate: false, onError }));

    await act(async () => {
      try {
        await result.current.execute();
      } catch {
        // Expected
      }
    });

    expect(onError).toHaveBeenCalledWith(mockError);
  });
});
