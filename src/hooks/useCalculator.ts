import { useState, useMemo } from 'react';

type Operator = '+' | '-';

export interface UseCalculatorReturn {
  /** 当前显示金额（含运算符拼接字符串） */
  amount: string;
  /** 是否有运算符 */
  hasOperator: boolean;
  /** 当前运算符 */
  operator: Operator | null;
  /** 第一操作数 */
  firstOperand: string;
  /** 第二操作数 */
  secondOperand: string;
  /** 是否可以计算（有完整表达式） */
  canCalculate: boolean;
  handleNumberClick: (num: string) => void;
  handleDelete: () => void;
  handleOperatorClick: (op: Operator) => void;
  handleCalculate: () => void;
  calculate: () => string;
  reset: () => void;
  setAmount: (amount: string) => void;
}

const useCalculator = (initialAmount = ''): UseCalculatorReturn => {
  const [hasOperator, setHasOperator] = useState(false);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [firstOperand, setFirstOperand] = useState('');
  const [secondOperand, setSecondOperand] = useState('');
  const [amount, setInternalAmount] = useState(initialAmount);

  const setAmount = (newAmount: string) => {
    setInternalAmount(newAmount);
  };

  const canCalculate = useMemo(() => {
    return hasOperator && !!operator && !!firstOperand && !!secondOperand;
  }, [hasOperator, operator, firstOperand, secondOperand]);

  const calculate = (): string => {
    if (!operator || !firstOperand || !secondOperand) return amount;

    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    let result = 0;

    if (operator === '+') {
      result = num1 + num2;
    } else if (operator === '-') {
      result = num1 - num2;
    }

    return result.toFixed(2).replace(/\.00$/, '');
  };

  const handleNumberClick = (num: string) => {
    if (hasOperator && operator) {
      if (num === '.' && secondOperand.includes('.')) return;
      if (secondOperand.includes('.') && secondOperand.split('.')[1]?.length >= 2) return;
      if (secondOperand === '0' && num !== '.') {
        setSecondOperand(num);
      } else {
        setSecondOperand(secondOperand + num);
      }
      setAmount(firstOperand + operator + (secondOperand + num));
      return;
    }

    if (num === '.' && amount.includes('.')) return;
    if (amount.includes('.') && amount.split('.')[1]?.length >= 2) return;
    if (amount === '0' && num !== '.') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDelete = () => {
    if (hasOperator && operator) {
      if (secondOperand) {
        const newSecond = secondOperand.slice(0, -1);
        setSecondOperand(newSecond);
        setAmount(firstOperand + operator + newSecond);
        if (!newSecond) {
          setHasOperator(false);
          setOperator(null);
          setAmount(firstOperand);
        }
        return;
      }
      setHasOperator(false);
      setOperator(null);
      setAmount(firstOperand);
      return;
    }
    setAmount(amount.slice(0, -1));
  };

  const handleOperatorClick = (op: Operator) => {
    if (!amount || amount === '0') return;

    // If already has a complete expression (operand + operator + operand), calculate then switch
    if (hasOperator && operator && firstOperand && secondOperand) {
      const result = calculate();
      setFirstOperand(result);
      setSecondOperand('');
      setOperator(op);
      setAmount(result + op);
      return;
    }

    // Replace trailing operator if present
    const lastChar = amount.slice(-1);
    if (lastChar === '+' || lastChar === '-') {
      setOperator(op);
      setAmount(amount.slice(0, -1) + op);
      return;
    }

    setFirstOperand(amount);
    setOperator(op);
    setHasOperator(true);
    setAmount(amount + op);
  };

  const handleCalculate = () => {
    const result = calculate();
    setAmount(result);
    setFirstOperand('');
    setSecondOperand('');
    setOperator(null);
    setHasOperator(false);
  };

  const reset = () => {
    setAmount('');
    setFirstOperand('');
    setSecondOperand('');
    setOperator(null);
    setHasOperator(false);
  };

  return {
    amount: amount,
    setAmount,
    hasOperator,
    operator,
    firstOperand,
    secondOperand,
    canCalculate,
    handleNumberClick,
    handleDelete,
    handleOperatorClick,
    handleCalculate,
    calculate,
    reset,
  };
};

export default useCalculator;
