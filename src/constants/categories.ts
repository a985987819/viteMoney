export interface SubCategory {
  id: string;
  name: string;
  icon: string;
}

export interface MainCategory {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

export const expenseCategories: MainCategory[] = [
  {
    id: 'food',
    name: '饮食',
    icon: '🍜',
    subCategories: [
      { id: 'food_1', name: '买菜', icon: '🥬' },
      { id: 'food_2', name: '外食', icon: '🍽️' },
      { id: 'food_3', name: '奶茶', icon: '🧋' },
      { id: 'food_4', name: '咖啡', icon: '☕' },
      { id: 'food_5', name: '零食', icon: '🍪' },
      { id: 'food_6', name: '外卖', icon: '🛵' },
    ],
  },
  {
    id: 'housing',
    name: '住房',
    icon: '🏠',
    subCategories: [
      { id: 'housing_1', name: '房租', icon: '🏠' },
      { id: 'housing_2', name: '水电', icon: '💡' },
      { id: 'housing_3', name: '物业', icon: '🏢' },
      { id: 'housing_4', name: '网费', icon: '📶' },
      { id: 'housing_5', name: '维修', icon: '🔧' },
      { id: 'housing_6', name: '酒店', icon: '🏨' },
    ],
  },
  {
    id: 'transport',
    name: '交通',
    icon: '🚗',
    subCategories: [
      { id: 'transport_1', name: '公交', icon: '🚌' },
      { id: 'transport_2', name: '打车', icon: '🚕' },
      { id: 'transport_3', name: '油费', icon: '⛽' },
      { id: 'transport_4', name: '停车', icon: '🅿️' },
      { id: 'transport_5', name: '保养', icon: '🔩' },
    ],
  },
  {
    id: 'clothing',
    name: '服饰',
    icon: '👗',
    subCategories: [
      { id: 'clothing_1', name: '衣鞋', icon: '👟' },
      { id: 'clothing_2', name: '护肤', icon: '💄' },
      { id: 'clothing_3', name: '饰品', icon: '💍' },
      { id: 'clothing_4', name: '干洗', icon: '🧺' },
    ],
  },
  {
    id: 'medical',
    name: '医疗',
    icon: '🏥',
    subCategories: [
      { id: 'medical_1', name: '门诊', icon: '🩺' },
      { id: 'medical_2', name: '药品', icon: '💊' },
      { id: 'medical_3', name: '体检', icon: '🩻' },
      { id: 'medical_4', name: '器械', icon: '🦯' },
    ],
  },
  {
    id: 'education',
    name: '教育',
    icon: '📚',
    subCategories: [
      { id: 'education_1', name: '书本', icon: '📖' },
      { id: 'education_2', name: '学费', icon: '🎓' },
      { id: 'education_3', name: '网课', icon: '💻' },
      { id: 'education_4', name: '文具', icon: '✏️' },
      { id: 'education_5', name: '软件', icon: '💿' },
    ],
  },
  {
    id: 'entertainment',
    name: '娱乐',
    icon: '🎮',
    subCategories: [
      { id: 'entertainment_1', name: '电影', icon: '🎬' },
      { id: 'entertainment_2', name: '游戏', icon: '🎮' },
      { id: 'entertainment_3', name: '聚会', icon: '🎉' },
      { id: 'entertainment_4', name: '爱好', icon: '🎨' },
      { id: 'entertainment_5', name: '剧场', icon: '🎭' },
    ],
  },
  {
    id: 'travel',
    name: '旅行',
    icon: '✈️',
    subCategories: [
      { id: 'travel_1', name: '机票', icon: '🎫' },
      { id: 'travel_2', name: '住宿', icon: '🏨' },
      { id: 'travel_3', name: '门票', icon: '🎟️' },
      { id: 'travel_4', name: '旅餐', icon: '🥘' },
      { id: 'travel_5', name: '纪念', icon: '🎁' },
    ],
  },
  {
    id: 'social',
    name: '人情',
    icon: '🧧',
    subCategories: [
      { id: 'social_1', name: '礼金', icon: '🧧' },
      { id: 'social_2', name: '礼品', icon: '🎁' },
      { id: 'social_3', name: '聚餐', icon: '🍽️' },
      { id: 'social_4', name: '送礼', icon: '🎀' },
      { id: 'social_5', name: '捐赠', icon: '❤️' },
    ],
  },
  {
    id: 'digital',
    name: '数码',
    icon: '📱',
    subCategories: [
      { id: 'digital_1', name: '话费', icon: '📞' },
      { id: 'digital_2', name: '设备', icon: '💻' },
      { id: 'digital_3', name: '配件', icon: '⌨️' },
      { id: 'digital_4', name: '订阅', icon: '🔔' },
      { id: 'digital_5', name: '维修', icon: '🔧' },
    ],
  },
  {
    id: 'home',
    name: '家居',
    icon: '🛋️',
    subCategories: [
      { id: 'home_1', name: '清洁', icon: '🧹' },
      { id: 'home_2', name: '纸品', icon: '🧻' },
      { id: 'home_3', name: '厨具', icon: '🍳' },
      { id: 'home_4', name: '床品', icon: '🛏️' },
      { id: 'home_5', name: '收纳', icon: '📦' },
    ],
  },
  {
    id: 'parenting',
    name: '育儿',
    icon: '👶',
    subCategories: [
      { id: 'parenting_1', name: '奶粉', icon: '🍼' },
      { id: 'parenting_2', name: '玩具', icon: '🧸' },
      { id: 'parenting_3', name: '宠物', icon: '🐾' },
      { id: 'parenting_4', name: '医疗', icon: '💊' },
      { id: 'parenting_5', name: '托育', icon: '🏫' },
    ],
  },
  {
    id: 'finance',
    name: '金融',
    icon: '🏦',
    subCategories: [
      { id: 'finance_1', name: '保险', icon: '🛡️' },
      { id: 'finance_2', name: '车险', icon: '🚘' },
      { id: 'finance_3', name: '年费', icon: '💳' },
      { id: 'finance_4', name: '股市', icon: '📈' },
      { id: 'finance_5', name: '基金', icon: '📊' },
    ],
  },
  {
    id: 'other_expense',
    name: '其他支出',
    icon: '📦',
    subCategories: [],
  },
];

export const incomeCategories: MainCategory[] = [
  {
    id: 'salary',
    name: '工资',
    icon: '💰',
    subCategories: [],
  },
  {
    id: 'parttime',
    name: '兼职',
    icon: '💵',
    subCategories: [],
  },
  {
    id: 'investment',
    name: '理财',
    icon: '📈',
    subCategories: [],
  },
  {
    id: 'secondhand',
    name: '二手',
    icon: '♻️',
    subCategories: [],
  },
  {
    id: 'bonus',
    name: '奖金',
    icon: '🎁',
    subCategories: [],
  },
  {
    id: 'other_income',
    name: '其他收入',
    icon: '💰',
    subCategories: [],
  },
];

export const allCategories = {
  expense: expenseCategories,
  income: incomeCategories,
};

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

export function findCategoryByName(name: string): MainCategory | null {
  for (const mainCat of expenseCategories) {
    if (mainCat.name === name) return mainCat;
  }
  for (const mainCat of incomeCategories) {
    if (mainCat.name === name) return mainCat;
  }
  return null;
}
