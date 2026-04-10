/**
 * 分类图标管理工具
 * 统一使用 Emoji 作为分类图标
 */

import { categoryIconMapping } from '../constants/categoryIconMapping';

// 分类ID到Emoji的映射
const CATEGORY_EMOJI_MAP: Record<string, string> = {
  // 餐饮
  'food': '🍜',
  'breakfast': '🍳',
  'lunch': '🍱',
  'dinner': '🍽️',
  'drink': '🧋',
  'snack': '🍿',

  // 交通
  'transport': '🚗',
  'subway': '🚇',
  'bus': '🚌',
  'taxi': '🚕',
  'parking': '🅿️',
  'gas': '⛽',

  // 购物
  'shopping': '🛍️',
  'daily': '🧴',
  'clothes': '👔',
  'digital': '📱',
  'beauty': '💄',

  // 居住
  'home': '🏠',
  'rent': '🏠',
  'utility': '💡',
  'property': '🏢',

  // 娱乐
  'entertainment': '🎮',
  'movie': '🎬',
  'game': '🎮',

  // 医疗
  'medical': '🏥',
  'medicine': '💊',
  'clinic': '🏥',
  'checkup': '🩺',

  // 教育
  'education': '📚',
  'tuition': '🎓',
  'book': '📖',
  'training': '📝',

  // 人情
  'gift': '🎁',
  'present': '🎁',
  'treat': '🍽️',

  // 收入
  'salary': '💰',
  'parttime': '💵',
  'invest': '📈',
  'investment': '📈',
  'freelance': '💼',
  'bonus': '🎁',
  'allowance': '💵',
  'redpacket': '🧧',
  'base_salary': '💰',

  // 微信/支付宝
  'wechat_red': '🧧',
  'alipay_red': '🧧',

  // 股票/基金
  'stock': '📈',
  'fund': '📊',
  'interest': '💵',

  // 转让
  'transfer': '🔄',
  'repay': '💳',

  // 借贷
  'borrow_in': '📥',
  'borrow_out': '📤',
  'repayment': '✅',

  // 报销
  'reimburse': '📋',

  // 住房
  'housing': '🏠',

  // 服饰
  'clothing': '👗',

  // 旅行
  'travel': '✈️',

  // 育儿
  'parenting': '👶',

  // 金融
  'finance': '💰',

  // 其他
  'other_expense': '📦',
  'other_income': '💰',
  'secondhand': '💻',
};

/**
 * 获取分类的Emoji图标
 * @param iconId 图标ID或分类名称或Emoji
 * @returns Emoji字符串
 */
export function getCategoryEmoji(iconId: string): string {
  // 如果已经是Emoji（包含中文字符或特殊符号），直接返回
  if (iconId && /[\u{1F600}-\u{1F64F}]/u.test(iconId)) {
    return iconId;
  }
  if (iconId && /[\u{1F300}-\u{1F5FF}]/u.test(iconId)) {
    return iconId;
  }
  if (iconId && /[\u{1F680}-\u{1F6FF}]/u.test(iconId)) {
    return iconId;
  }
  if (iconId && /[\u{2600}-\u{26FF}]/u.test(iconId)) {
    return iconId;
  }
  if (iconId && /[\u{2700}-\u{27BF}]/u.test(iconId)) {
    return iconId;
  }

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