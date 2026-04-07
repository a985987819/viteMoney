import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBoolean } from './useBoolean';

describe('useBoolean hook', () => {
  describe('initialization', () => {
    it('should initialize with false as default', () => {
      const { result } = renderHook(() => useBoolean());

      expect(result.current.value).toBe(false);
    });

    it('should initialize with custom value true', () => {
      const { result } = renderHook(() => useBoolean(true));

      expect(result.current.value).toBe(true);
    });

    it('should initialize with custom value false', () => {
      const { result } = renderHook(() => useBoolean(false));

      expect(result.current.value).toBe(false);
    });
  });

  describe('setTrue', () => {
    it('should set value to true', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setTrue();
      });

      expect(result.current.value).toBe(true);
    });
  });

  describe('setFalse', () => {
    it('should set value to false', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.setFalse();
      });

      expect(result.current.value).toBe(false);
    });
  });

  describe('toggle', () => {
    it('should toggle from false to true', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(true);
    });

    it('should toggle from true to false', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(false);
    });

    it('should toggle back and forth', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(true);
    });
  });

  describe('setValue', () => {
    it('should accept a direct value', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setValue(true);
      });

      expect(result.current.value).toBe(true);
    });

    it('should accept an updater function', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setValue(prev => !prev);
      });

      expect(result.current.value).toBe(true);
    });
  });
});
