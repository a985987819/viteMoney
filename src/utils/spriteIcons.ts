/**
 * 分类图标管理工具
 * 统一使用 Emoji 作为分类图标
 */

import { categoryIconMapping } from '../constants/categoryIconMapping';

// 分类ID到Emoji的映射
const CATEGORY_EMOJI_MAP: Record<string, string> = {
  // 餐饮
  'food': '🍜',
  'food_1': '🥬',
  'food_2': '🍽️',
  'food_3': '🍔',
  'food_4': '🧋',
  'food_5': '☕',
  'food_6': '🍿',
  'food_7': '🍪',
  'food_8': '📦',

  // 住房
  'housing': '🏠',
  'housing_1': '🏡',
  'housing_2': '🔑',
  'housing_3': '💡',
  'housing_4': '🏢',
  'housing_5': '📹',
  'housing_6': '📶',
  'housing_7': '🔧',
  'housing_8': '🚪',

  // 交通
  'transport': '🚗',
  'transport_1': '🚂',
  'transport_2': '🚌',
  'transport_3': '🚕',
  'transport_4': '⛽',
  'transport_5': '🅿️',
  'transport_6': '🔩',
  'transport_7': '🛠️',

  // 服饰
  'clothing': '👗',
  'clothing_1': '👔',
  'clothing_2': '👕',
  'clothing_3': '🧴',
  'clothing_4': '💍',
  'clothing_5': '👔',

  // 医疗
  'medical': '🏥',
  'medical_1': '🏥',
  'medical_2': '🩺',
  'medical_3': '💊',
  'medical_4': '📊',
  'medical_5': '💉',

  // 教育
  'education': '📚',
  'education_1': '📚',
  'education_2': '🎓',
  'education_3': '📖',
  'education_4': '✏️',
  'education_5': '💻',

  // 娱乐
  'entertainment': '🎮',
  'entertainment_1': '🍿',
  'entertainment_2': '🎮',
  'entertainment_3': '🎉',
  'entertainment_4': '🎨',
  'entertainment_5': '🎭',

  // 旅行
  'travel': '✈️',
  'travel_1': '✈️',
  'travel_2': '🛂',
  'travel_3': '🎫',
  'travel_4': '🍜',
  'travel_5': '🧭',

  // 人情
  'social': '📱',
  'social_1': '📈',
  'social_2': '💻',
  'social_3': '💻',
  'social_4': '🎧',
  'social_5': '🔄',

  // 数码
  'digital': '🎁',
  'digital_1': '📄',
  'digital_2': '📱',
  'digital_3': '🗺️',
  'digital_4': '📋',
  'digital_5': '🔑',

  // 家居
  'home': '🌍',
  'home_1': '📊',
  'home_2': '💻',
  'home_3': '🧻',
  'home_4': '🎫',
  'home_5': '📄',

  // 育儿
  'parenting': '🎁',
  'parenting_1': '✉️',
  'parenting_2': '🎁',
  'parenting_3': '🎁',
  'parenting_4': '🍳',
  'parenting_5': '📈',

  // 金融
  'finance': '👶',
  'finance_1': '📞',
  'finance_2': '💵',
  'finance_3': '🎒',
  'finance_4': '❤️',
  'finance_5': '❤️',

  // 收入
  'salary': '💰',
  'parttime': '💵',
  'investment': '📈',
  'secondhand': '💻',
  'bonus': '🎧',
  'other_income': '🔨',

  // 其他支出
  'other_expense': '🛋️',
  'other_expense_2': '🪣',
  'other_expense_3': '🪴',
  'other_expense_4': '🧻',
  'other_expense_5': '🍽️',
  'other_expense_6': '💡',
};

/**
 * 获取分类的Emoji图标
 * @param iconId 图标ID或分类名称
 * @returns Emoji字符串
 */
export function getCategoryEmoji(iconId: string): string {
  // 首先尝试从映射表中获取
  if (CATEGORY_EMOJI_MAP[iconId]) {
    return CATEGORY_EMOJI_MAP[iconId];
  }

  // 尝试从 categoryIconMapping 中查找
  for (const category of Object.values(categoryIconMapping)) {
    if (category.englishName === iconId) {
      return category.defaultIcon;
    }
    for (const subCategory of category.subCategories) {
      if (subCategory.englishName === iconId) {
        return subCategory.defaultIcon;
      }
    }
  }

  // 默认返回
  return '📦';
}

/**
 * 获取图标样式（现在返回emoji相关的样式）
 * @param iconId 图标ID
 * @param size 显示大小（默认32px）
 * @returns CSS样式对象
 */
export function getSpriteIconStyle(iconId: string, size: number = 32): React.CSSProperties {
  const emoji = getCategoryEmoji(iconId);

  return {
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${size * 0.75}px`,
    lineHeight: 1,
  };
}

/**
 * 获取图标在精灵图中的索引（已废弃，保留兼容性）
 * @param iconId 图标ID
 * @returns 索引值，未找到返回-1
 */
export function getIconIndex(iconId: string): number {
  return -1;
}

/**
 * 检查图标是否存在
 * @param iconId 图标ID
 * @returns 是否存在
 */
export function hasIcon(iconId: string): boolean {
  return true; // 现在所有ID都返回emoji，所以总是存在
}

// 为了保持兼容性，导出旧的常量（但内容为空）
export const CATEGORY_ICON_POSITIONS: Record<string, { row: number; col: number }> = {};
