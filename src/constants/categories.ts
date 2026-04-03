/**
 * 新的分类数据结构
 * 使用精灵图图标系统
 */

export interface SubCategory {
  id: string;
  name: string;
  icon: string; // 精灵图图标ID
}

export interface MainCategory {
  id: string;
  name: string;
  icon: string; // 精灵图图标ID
  subCategories: SubCategory[];
}

// 支出分类
export const expenseCategories: MainCategory[] = [
  {
    id: 'food',
    name: '饮食',
    icon: 'food',
    subCategories: [
      { id: 'food_1', name: '买菜', icon: 'food_1' },
      { id: 'food_2', name: '外食', icon: 'food_2' },
      { id: 'food_3', name: '奶茶', icon: 'food_3' },
      { id: 'food_4', name: '咖啡', icon: 'food_4' },
      { id: 'food_5', name: '零食', icon: 'food_5' },
      { id: 'food_6', name: '外卖', icon: 'food_6' },
    ],
  },
  {
    id: 'housing',
    name: '住房',
    icon: 'housing',
    subCategories: [
      { id: 'housing_1', name: '房租', icon: 'housing_1' },
      { id: 'housing_2', name: '水电', icon: 'housing_2' },
      { id: 'housing_3', name: '物业', icon: 'housing_3' },
      { id: 'housing_4', name: '网费', icon: 'housing_4' },
      { id: 'housing_5', name: '维修', icon: 'housing_5' },
      { id: 'housing_6', name: '酒店', icon: 'housing_6' },
    ],
  },
  {
    id: 'transport',
    name: '交通',
    icon: 'transport',
    subCategories: [
      { id: 'transport_1', name: '公交', icon: 'transport_1' },
      { id: 'transport_2', name: '打车', icon: 'transport_2' },
      { id: 'transport_3', name: '油费', icon: 'transport_3' },
      { id: 'transport_4', name: '停车', icon: 'transport_4' },
      { id: 'transport_5', name: '保养', icon: 'transport_5' },
    ],
  },
  {
    id: 'clothing',
    name: '服饰',
    icon: 'clothing',
    subCategories: [
      { id: 'clothing_1', name: '衣鞋', icon: 'clothing_1' },
      { id: 'clothing_2', name: '护肤', icon: 'clothing_2' },
      { id: 'clothing_3', name: '饰品', icon: 'clothing_3' },
      { id: 'clothing_4', name: '干洗', icon: 'clothing_4' },
    ],
  },
  {
    id: 'medical',
    name: '医疗',
    icon: 'medical',
    subCategories: [
      { id: 'medical_1', name: '门诊', icon: 'medical_1' },
      { id: 'medical_2', name: '药品', icon: 'medical_2' },
      { id: 'medical_3', name: '体检', icon: 'medical_3' },
      { id: 'medical_4', name: '器械', icon: 'medical_4' },
    ],
  },
  {
    id: 'education',
    name: '教育',
    icon: 'education',
    subCategories: [
      { id: 'education_1', name: '书本', icon: 'education_1' },
      { id: 'education_2', name: '学费', icon: 'education_2' },
      { id: 'education_3', name: '网课', icon: 'education_3' },
      { id: 'education_4', name: '文具', icon: 'education_4' },
      { id: 'education_5', name: '软件', icon: 'education_5' },
    ],
  },
  {
    id: 'entertainment',
    name: '娱乐',
    icon: 'entertainment',
    subCategories: [
      { id: 'entertainment_1', name: '电影', icon: 'entertainment_1' },
      { id: 'entertainment_2', name: '游戏', icon: 'entertainment_2' },
      { id: 'entertainment_3', name: '聚会', icon: 'entertainment_3' },
      { id: 'entertainment_4', name: '爱好', icon: 'entertainment_4' },
      { id: 'entertainment_5', name: '剧场', icon: 'entertainment_5' },
    ],
  },
  {
    id: 'travel',
    name: '旅行',
    icon: 'travel',
    subCategories: [
      { id: 'travel_1', name: '机票', icon: 'travel_1' },
      { id: 'travel_2', name: '住宿', icon: 'travel_2' },
      { id: 'travel_3', name: '门票', icon: 'travel_3' },
      { id: 'travel_4', name: '旅餐', icon: 'travel_4' },
      { id: 'travel_5', name: '纪念', icon: 'travel_5' },
    ],
  },
  {
    id: 'social',
    name: '人情',
    icon: 'social',
    subCategories: [
      { id: 'social_1', name: '礼金', icon: 'social_1' },
      { id: 'social_2', name: '礼品', icon: 'social_2' },
      { id: 'social_3', name: '聚餐', icon: 'social_3' },
      { id: 'social_4', name: '送礼', icon: 'social_4' },
      { id: 'social_5', name: '捐赠', icon: 'social_5' },
    ],
  },
  {
    id: 'digital',
    name: '数码',
    icon: 'digital',
    subCategories: [
      { id: 'digital_1', name: '话费', icon: 'digital_1' },
      { id: 'digital_2', name: '设备', icon: 'digital_2' },
      { id: 'digital_3', name: '配件', icon: 'digital_3' },
      { id: 'digital_4', name: '订阅', icon: 'digital_4' },
      { id: 'digital_5', name: '维修', icon: 'digital_5' },
    ],
  },
  {
    id: 'home',
    name: '家居',
    icon: 'home',
    subCategories: [
      { id: 'home_1', name: '清洁', icon: 'home_1' },
      { id: 'home_2', name: '纸品', icon: 'home_2' },
      { id: 'home_3', name: '厨具', icon: 'home_3' },
      { id: 'home_4', name: '床品', icon: 'home_4' },
      { id: 'home_5', name: '收纳', icon: 'home_5' },
    ],
  },
  {
    id: 'parenting',
    name: '育儿',
    icon: 'parenting',
    subCategories: [
      { id: 'parenting_1', name: '奶粉', icon: 'parenting_1' },
      { id: 'parenting_2', name: '玩具', icon: 'parenting_2' },
      { id: 'parenting_3', name: '宠物', icon: 'parenting_3' },
      { id: 'parenting_4', name: '医疗', icon: 'parenting_4' },
      { id: 'parenting_5', name: '托育', icon: 'parenting_5' },
    ],
  },
  {
    id: 'finance',
    name: '金融',
    icon: 'finance',
    subCategories: [
      { id: 'finance_1', name: '保险', icon: 'finance_1' },
      { id: 'finance_2', name: '车险', icon: 'finance_2' },
      { id: 'finance_3', name: '年费', icon: 'finance_3' },
      { id: 'finance_4', name: '股市', icon: 'finance_4' },
      { id: 'finance_5', name: '基金', icon: 'finance_5' },
    ],
  },
  {
    id: 'other_expense',
    name: '其他支出',
    icon: 'other_expense',
    subCategories: [],
  },];

// 收入分类
export const incomeCategories: MainCategory[] = [
  {
    id: 'salary',
    name: '工资',
    icon: 'salary',
    subCategories: [],
  },
  {
    id: 'parttime',
    name: '兼职',
    icon: 'parttime',
    subCategories: [],
  },
  {
    id: 'investment',
    name: '理财',
    icon: 'investment',
    subCategories: [],
  },
  {
    id: 'secondhand',
    name: '二手',
    icon: 'secondhand',
    subCategories: [],
  },
  {
    id: 'bonus',
    name: '奖金',
    icon: 'bonus',
    subCategories: [],
  },
  {
    id: 'other_income',
    name: '其他收入',
    icon: 'other_income',
    subCategories: [],
  },];

// 所有分类
export const allCategories = {
  expense: expenseCategories,
  income: incomeCategories,
};

// 根据ID查找分类
export function findCategoryById(id: string): MainCategory | SubCategory | null {
  for (const mainCat of expenseCategories) {
    if (mainCat.id === id) return mainCat;
    for (const subCat of mainCat.subCategories) {
      if (subCat.id === id) return subCat;
    }
  }
  for (const mainCat of incomeCategories) {
    if (mainCat.id === id) return mainCat;
    for (const subCat of mainCat.subCategories) {
      if (subCat.id === id) return subCat;
    }
  }
  return null;
}

// 根据名称查找分类
export function findCategoryByName(name: string): MainCategory | null {
  for (const mainCat of expenseCategories) {
    if (mainCat.name === name) return mainCat;
  }
  for (const mainCat of incomeCategories) {
    if (mainCat.name === name) return mainCat;
  }
  return null;
}
