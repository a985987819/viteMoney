import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCalculator from './useCalculator';

class FakeMouseEvent {
  target: unknown;
  constructor(type: string, props: Record<string, unknown>) {
    Object.assign(this, props);
  }
}

describe('useCalculator hook', () => {
  it('should handle single digit input', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberClick('5');
    });

    expect(result.current.amount).toBe('5');
  });

  it('should handle multi-digit input (1 then 2 then 3 -> 123)', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleNumberClick('2');
    });
    act(() => {
      result.current.handleNumberClick('3');
    });

    expect(result.current.amount).toBe('123');
  });

  it('should replace leading zero with non-zero digit', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('5');
    });

    expect(result.current.amount).toBe('5');
  });

  it('should not allow multiple decimal points', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleNumberClick('.');
    });
    act(() => {
      result.current.handleNumberClick('2');
    });
    // Second decimal should be ignored
    act(() => {
      result.current.handleNumberClick('.');
    });

    expect(result.current.amount).toBe('1.2');
  });

  it('should limit decimal places to 2', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleNumberClick('.');
    });
    act(() => {
      result.current.handleNumberClick('2');
    });
    act(() => {
      result.current.handleNumberClick('3');
    });
    // 4th decimal should be ignored
    act(() => {
      result.current.handleNumberClick('4');
    });

    expect(result.current.amount).toBe('1.23');
  });

  it('should append operator to amount', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('5');
    });
    act(() => {
      result.current.handleOperatorClick('+');
    });

    expect(result.current.amount).toBe('5+');
    expect(result.current.hasOperator).toBe(true);
    expect(result.current.firstOperand).toBe('5');
    expect(result.current.operator).toBe('+');
  });

  it('should switch operators when no second operand', () => {
    const { result } = renderHook(() => useCalculator('0'));

    // Enter "5+"
    act(() => {
      result.current.handleNumberClick('5');
    });
    act(() => {
      result.current.handleOperatorClick('+');
    });

    // Switch operator: trailing '+' should be replaced with '-'
    act(() => {
      result.current.handleOperatorClick('-');
    });

    expect(result.current.amount).toBe('5-');
    expect(result.current.operator).toBe('-');
    expect(result.current.hasOperator).toBe(true);
  });

  it('should do nothing when amount is empty or zero', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleOperatorClick('+');
    });

    expect(result.current.hasOperator).toBe(false);
    expect(result.current.firstOperand).toBe('');
  });

  it('should calculate addition', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleOperatorClick('+');
    });
    act(() => {
      result.current.handleNumberClick('2');
    });

    expect(result.current.canCalculate).toBe(true);

    act(() => {
      result.current.handleCalculate();
    });

    expect(result.current.amount).toBe('3');
    expect(result.current.canCalculate).toBe(false);
    expect(result.current.hasOperator).toBe(false);
  });

  it('should calculate subtraction', () => {
    const { result } = renderHook(() => useCalculator('0'));

    // Enter "10"
    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleNumberClick('0');
    });
    act(() => {
      result.current.handleOperatorClick('-');
    });
    act(() => {
      result.current.handleNumberClick('3');
    });

    act(() => {
      result.current.handleCalculate();
    });

    expect(result.current.amount).toBe('7');
  });

  it('should format result and strip trailing zeros (1+2=3)', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleOperatorClick('+');
    });
    act(() => {
      result.current.handleNumberClick('2');
    });

    act(() => {
      result.current.handleCalculate();
    });

    expect(result.current.amount).toBe('3');
  });

  it('should delete last digit', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleNumberClick('2');
    });
    act(() => {
      result.current.handleNumberClick('3');
    });

    act(() => {
      result.current.handleDelete();
    });

    expect(result.current.amount).toBe('12');
  });

  it('should remove operator when deleting at its position', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('5');
    });
    act(() => {
      result.current.handleOperatorClick('+');
    });

    act(() => {
      result.current.handleDelete();
    });

    expect(result.current.hasOperator).toBe(false);
    expect(result.current.amount).toBe('5');
  });

  it('should clear all calculator state on reset', () => {
    const { result } = renderHook(() => useCalculator('0'));

    act(() => {
      result.current.handleNumberClick('1');
    });
    act(() => {
      result.current.handleOperatorClick('+');
    });
    act(() => {
      result.current.handleNumberClick('2');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.amount).toBe('');
    expect(result.current.hasOperator).toBe(false);
    expect(result.current.firstOperand).toBe('');
    expect(result.current.secondOperand).toBe('');
  });

  it('should set amount programmatically', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setAmount('100');
    });

    expect(result.current.amount).toBe('100');
  });
});
