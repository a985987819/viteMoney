import { useState, useEffect, useMemo } from 'react';
import {
  getCategoryMapping,
  getSubCategoryMapping,
  getCategoryIcon,
  expenseCategoryList,
  incomeCategoryList,
  getSubCategories,
  type CategoryMapping,
  type SubCategoryMapping,
} from '../constants/categoryIconMapping';
import { getAllCategories, type Category } from '../api/category';
import { useAuth } from './useAuth';

export interface CategoryOption {
  value: string;
  label: string;
  icon: string;
  englishName: string;
  type: 'expense' | 'income';
}

export interface SubCategoryOption {
  value: string;
  label: string;
  icon: string;
  englishName: string;
}

export interface SubCategoryMap {
  [key: string]: string[];
}

// 将映射分类转换为选项格式
const convertMappingToOptions = (mappings: CategoryMapping[]): CategoryOption[] => {
  return mappings.map(mapping => ({
    value: mapping.standardName,
    label: mapping.standardName,
    icon: mapping.defaultIcon,
    englishName: mapping.englishName,
    type: mapping.type,
  }));
};

// 查找分类映射（优先子分类，再找主分类）
const findMapping = (name: string): {
  subCategory?: SubCategoryMapping;
  mainCategory: CategoryMapping | null;
} => {
  const subMatch = getSubCategoryMapping(name);
  if (subMatch) {
    return { subCategory: subMatch.subCategory, mainCategory: subMatch.parentCategory };
  }
  const mainMatch = getCategoryMapping(name);
  if (mainMatch) {
    return { mainCategory: mainMatch };
  }
  return { mainCategory: null };
};

// 将子分类转换为选项格式
const convertSubCategoriesToOptions = (subCategories: SubCategoryMapping[]): SubCategoryOption[] => {
  return subCategories.map(sub => ({
    value: sub.name,
    label: sub.name,
    icon: sub.defaultIcon,
    englishName: sub.englishName,
  }));
};

export const useCategories = () => {
  const { isLoggedIn } = useAuth();
  const [apiCategories, setApiCategories] = useState<{ expense: Category[]; income: Category[] } | null>(null);
  const [loading, setLoading] = useState(false);

  // 从 API 获取分类
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      getAllCategories()
        .then(data => {
          setApiCategories(data);
        })
        .catch(error => {
          console.error('Failed to fetch categories:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  // 支出分类选项 - 使用映射文件
  const expenseCategoryOptions = useMemo<CategoryOption[]>(() => {
    if (apiCategories?.expense) {
      return apiCategories.expense.map(cat => {
        const mapping = getCategoryMapping(cat.name);
        return {
          value: cat.name,
          label: cat.name,
          icon: mapping?.defaultIcon || cat.icon || getCategoryIcon(cat.name),
          englishName: mapping?.englishName || 'other_expense',
          type: 'expense' as const,
        };
      });
    }
    // 使用映射文件中的支出分类
    return convertMappingToOptions(expenseCategoryList);
  }, [apiCategories]);

  // 收入分类选项 - 使用映射文件
  const incomeCategoryOptions = useMemo<CategoryOption[]>(() => {
    if (apiCategories?.income) {
      return apiCategories.income.map(cat => {
        const mapping = getCategoryMapping(cat.name);
        return {
          value: cat.name,
          label: cat.name,
          icon: mapping?.defaultIcon || cat.icon || getCategoryIcon(cat.name),
          englishName: mapping?.englishName || 'other_income',
          type: 'income' as const,
        };
      });
    }
    // 使用映射文件中的收入分类
    return convertMappingToOptions(incomeCategoryList);
  }, [apiCategories]);

  // 所有分类选项（用于定时记账等场景）
  const allCategoryOptions = useMemo<CategoryOption[]>(() => {
    return [...expenseCategoryOptions, ...incomeCategoryOptions];
  }, [expenseCategoryOptions, incomeCategoryOptions]);

  // 子分类映射（主分类名 -> 子分类名数组）
  const subCategoryMap = useMemo<SubCategoryMap>(() => {
    const map: SubCategoryMap = {};

    // 从映射文件构建子分类映射
    [...expenseCategoryList, ...incomeCategoryList].forEach(cat => {
      map[cat.standardName] = cat.subCategories.map(sub => sub.name);
    });

    // 如果有API数据，覆盖本地数据
    if (apiCategories) {
      [...apiCategories.expense, ...apiCategories.income].forEach(cat => {
        if (cat.subCategories && cat.subCategories.length > 0) {
          map[cat.name] = cat.subCategories;
        }
      });
    }

    return map;
  }, [apiCategories]);

  // 获取指定主分类的子分类选项
  const getSubCategoryOptions = (mainCategoryName: string): SubCategoryOption[] => {
    // 先从映射文件获取
    const subCategories = getSubCategories(mainCategoryName);
    if (subCategories.length > 0) {
      return convertSubCategoriesToOptions(subCategories);
    }

    // 从子分类映射获取
    const subNames = subCategoryMap[mainCategoryName] || [];
    return subNames.map(name => {
      const subMatch = getSubCategoryMapping(name);
      if (subMatch) {
        return {
          value: subMatch.subCategory.name,
          label: subMatch.subCategory.name,
          icon: subMatch.subCategory.defaultIcon,
          englishName: subMatch.subCategory.englishName,
        };
      }
      return {
        value: name,
        label: name,
        icon: '📦',
        englishName: 'other',
      };
    });
  };

  // 获取分类图标 - 使用映射文件
  const getIcon = (categoryName: string, subCategoryName?: string): string => {
    // 如果提供了子分类，优先使用子分类图标
    if (subCategoryName) {
      const sub = findMapping(subCategoryName);
      if (sub.subCategory) return sub.subCategory.defaultIcon;
    }

    const mapping = findMapping(categoryName);
    if (mapping.mainCategory) {
      return mapping.subCategory?.defaultIcon || mapping.mainCategory.defaultIcon;
    }

    // 再从选项列表查找
    const option = allCategoryOptions.find(c => c.value === categoryName);
    return option?.icon || '📦';
  };

  // 获取分类英文名称（用于CDN图标路径）
  const getEnglishName = (categoryName: string, subCategoryName?: string): string => {
    // 如果提供了子分类，优先使用子分类的英文名称
    if (subCategoryName) {
      const sub = findMapping(subCategoryName);
      if (sub.subCategory) return sub.subCategory.englishName;
    }

    const mapping = findMapping(categoryName);
    if (mapping.mainCategory) {
      return mapping.subCategory?.englishName || mapping.mainCategory.englishName;
    }

    return 'other_expense';
  };

  // 获取分类类型
  const getType = (categoryName: string): 'expense' | 'income' | null => {
    return findMapping(categoryName).mainCategory?.type || null;
  };

  // 标准化分类名称
  const normalizeName = (categoryName: string): string => {
    return findMapping(categoryName).mainCategory?.standardName || categoryName;
  };

  // 标准化子分类名称
  const normalizeSubCategoryName = (subCategoryName: string): string => {
    return findMapping(subCategoryName).subCategory?.name || subCategoryName;
  };

  // 智能匹配分类和子分类
  const matchCategory = (
    categoryInput: string,
    subCategoryInput?: string
  ): {
    mainCategory: CategoryMapping | null;
    subCategory: SubCategoryMapping | null;
  } => {
    // 如果有子分类输入，优先匹配子分类
    if (subCategoryInput) {
      const sub = findMapping(subCategoryInput);
      if (sub.subCategory) {
        return { mainCategory: sub.mainCategory, subCategory: sub.subCategory };
      }
    }

    const sub = findMapping(categoryInput);
    if (sub.subCategory) {
      return { mainCategory: sub.mainCategory, subCategory: sub.subCategory };
    }

    return sub.mainCategory ? { mainCategory: sub.mainCategory, subCategory: null } : { mainCategory: null, subCategory: null };
  };

  return {
    // 分类选项
    expenseCategoryOptions,
    incomeCategoryOptions,
    allCategoryOptions,
    // 子分类相关
    subCategoryMap,
    getSubCategoryOptions,
    // 工具函数
    getIcon,
    getEnglishName,
    getType,
    normalizeName,
    normalizeSubCategoryName,
    matchCategory,
    loading,
  };
};

export default useCategories;
