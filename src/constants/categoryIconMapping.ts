/**
 * 记账分类图标映射文件
 * 将各种近义词统一映射到标准分类和子分类，用于图标显示
 * CDN路径格式: https://cdn.example.com/icons/{englishName}.png
 */

export interface SubCategoryMapping {
  /** 子分类名称 */
  name: string;
  /** 英文名称（用于CDN图片路径） */
  englishName: string;
  /** 近义词列表 */
  synonyms: string[];
  /** 默认图标 */
  defaultIcon: string;
}

export interface CategoryMapping {
  /** 标准分类名称 */
  standardName: string;
  /** 英文名称（用于CDN图片路径） */
  englishName: string;
  /** 分类类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 默认图标 */
  defaultIcon: string;
  /** 子分类列表 */
  subCategories: SubCategoryMapping[];
}

/**
 * 分类映射表
 * 包含主分类和子分类的完整映射
 */
export const categoryIconMapping: Record<string, CategoryMapping> = {
  // ==================== 支出分类 ====================

  // 餐饮 - 包含三餐、外出就餐、饮品等
  餐饮: {
    standardName: '餐饮',
    englishName: 'dining',
    type: 'expense',
    defaultIcon: '🍜',
    subCategories: [
      {
        name: '三餐',
        englishName: 'dining_meals',
        synonyms: ['早餐', '午饭', '午餐', '晚饭', '晚餐', '正餐', '吃饭', '食堂', '吃'],
        defaultIcon: '🍚',
      },
      {
        name: '外出就餐',
        englishName: 'dining_out',
        synonyms: ['餐厅', '饭店', '聚餐', '请客', '下馆子', '火锅', '烧烤', '日料', '西餐', '中餐', '快餐', '小吃', '美食'],
        defaultIcon: '🍽️',
      },
      {
        name: '外卖',
        englishName: 'dining_delivery',
        synonyms: ['外卖', '美团', '饿了么', '订餐', '外送'],
        defaultIcon: '📦',
      },
      {
        name: '饮品',
        englishName: 'dining_drinks',
        synonyms: ['咖啡', '奶茶', '果汁', '饮料', '酒水', '啤酒', '白酒', '红酒', '下午茶'],
        defaultIcon: '☕',
      },
      {
        name: '零食',
        englishName: 'dining_snacks',
        synonyms: ['零食', '甜品', '蛋糕', '面包', '冰淇淋', '糖果'],
        defaultIcon: '�',
      },
      {
        name: '食材',
        englishName: 'dining_groceries',
        synonyms: ['买菜', '超市食品', '水果', '生鲜', '粮油', '调料', '食材'],
        defaultIcon: '🥬',
      },
    ],
  },

  // 住房 - 包含房租、水电、物业等
  住房: {
    standardName: '住房',
    englishName: 'housing',
    type: 'expense',
    defaultIcon: '🏠',
    subCategories: [
      {
        name: '房租',
        englishName: 'housing_rent',
        synonyms: ['房租', '租金', '房贷', '月供', '租房', '买房'],
        defaultIcon: '🏠',
      },
      {
        name: '水电',
        englishName: 'housing_utilities',
        synonyms: ['水费', '电费', '燃气费', '取暖费', '水电费'],
        defaultIcon: '💡',
      },
      {
        name: '网络',
        englishName: 'housing_internet',
        synonyms: ['宽带费', '网络费', '有线电视', '话费', '手机费', '流量费'],
        defaultIcon: '📶',
      },
      {
        name: '物业',
        englishName: 'housing_management',
        synonyms: ['物业费', '管理费', '维修费', '停车费'],
        defaultIcon: '🏢',
      },
      {
        name: '装修',
        englishName: 'housing_decoration',
        synonyms: ['装修', '家具', '家电', '家居', '搬家'],
        defaultIcon: '🔨',
      },
    ],
  },

  // 交通 - 包含公共交通、打车、私家车等
  交通: {
    standardName: '交通',
    englishName: 'transport',
    type: 'expense',
    defaultIcon: '🚗',
    subCategories: [
      {
        name: '公共交通',
        englishName: 'transport_public',
        synonyms: ['地铁', '公交', '公交车', '地铁票', '公交卡', '轻轨', '高铁', '火车', '动车'],
        defaultIcon: '🚌',
      },
      {
        name: '打车',
        englishName: 'transport_taxi',
        synonyms: ['打车', '出租车', '滴滴', '网约车', '代驾', '拼车', '顺风车'],
        defaultIcon: '🚕',
      },
      {
        name: '私家车',
        englishName: 'transport_car',
        synonyms: ['油费', '加油', '保养', '修车', '洗车', '车险', '年检', '停车费', '过路费', '高速费'],
        defaultIcon: '�',
      },
      {
        name: '其他交通',
        englishName: 'transport_other',
        synonyms: ['共享单车', '电动车', '充电', '租车', '机票', '船票', '车票'],
        defaultIcon: '🚲',
      },
    ],
  },

  // 购物 - 包含服装、美妆、日用品等
  购物: {
    standardName: '购物',
    englishName: 'shopping',
    type: 'expense',
    defaultIcon: '🛍️',
    subCategories: [
      {
        name: '服装',
        englishName: 'shopping_clothing',
        synonyms: ['衣服', '穿衣', '服饰', '穿搭', '买衣服', '鞋子', '包包', '内衣', '袜子'],
        defaultIcon: '👕',
      },
      {
        name: '美妆',
        englishName: 'shopping_beauty',
        synonyms: ['化妆品', '护肤品', '香水', '美妆', '彩妆', '面膜'],
        defaultIcon: '💄',
      },
      {
        name: '配饰',
        englishName: 'shopping_accessories',
        synonyms: ['配饰', '首饰', '珠宝', '手表', '眼镜', '帽子', '围巾', '手套'],
        defaultIcon: '�',
      },
      {
        name: '日用',
        englishName: 'shopping_daily',
        synonyms: ['生活用品', '日用品', '洗护', '清洁', '卫生用品', '纸巾', '湿巾', '洗衣液'],
        defaultIcon: '🧴',
      },
      {
        name: '家居',
        englishName: 'shopping_home',
        synonyms: ['厨具', '餐具', '床上用品', '毛巾', '收纳', '工具', '五金'],
        defaultIcon: '🏠',
      },
    ],
  },

  // 娱乐 - 包含电影、游戏、旅游等
  娱乐: {
    standardName: '娱乐',
    englishName: 'entertainment',
    type: 'expense',
    defaultIcon: '🎮',
    subCategories: [
      {
        name: '电影',
        englishName: 'entertainment_movie',
        synonyms: ['电影', '影院', '电影票', 'IMAX', '观影'],
        defaultIcon: '🎬',
      },
      {
        name: '游戏',
        englishName: 'entertainment_game',
        synonyms: ['游戏', '电玩', '网吧', 'PS5', 'Switch', 'Steam', '充值'],
        defaultIcon: '🎮',
      },
      {
        name: '旅游',
        englishName: 'entertainment_travel',
        synonyms: ['旅游', '旅行', '出游', '度假', '景点', '门票', '酒店', '民宿', '机票'],
        defaultIcon: '✈️',
      },
      {
        name: '演出',
        englishName: 'entertainment_show',
        synonyms: ['演出', '演唱会', '话剧', '音乐剧', '展览', '博物馆', '剧场'],
        defaultIcon: '🎭',
      },
      {
        name: '休闲',
        englishName: 'entertainment_leisure',
        synonyms: ['KTV', '酒吧', '夜店', '聚会', '派对', '桌游', '棋牌', '麻将'],
        defaultIcon: '�',
      },
    ],
  },

  // 医疗 - 包含看病、药品、体检等
  医疗: {
    standardName: '医疗',
    englishName: 'medical',
    type: 'expense',
    defaultIcon: '💊',
    subCategories: [
      {
        name: '看病',
        englishName: 'medical_treatment',
        synonyms: ['看病', '医院', '诊所', '挂号费', '检查费', '治疗费', '手术费', '住院费', '急诊', '门诊'],
        defaultIcon: '🏥',
      },
      {
        name: '药品',
        englishName: 'medical_medicine',
        synonyms: ['药品', '药费', '药店', '处方药', '中药', '西药'],
        defaultIcon: '💊',
      },
      {
        name: '体检',
        englishName: 'medical_checkup',
        synonyms: ['体检', '疫苗', '化验', '拍片', 'B超', 'CT', '核磁'],
        defaultIcon: '🩺',
      },
      {
        name: '保健',
        englishName: 'medical_health',
        synonyms: ['保健品', '维生素', '营养品', '理疗', '康复', '按摩', '针灸', '推拿'],
        defaultIcon: '💪',
      },
    ],
  },

  // 教育 - 包含学费、书籍、培训等
  教育: {
    standardName: '教育',
    englishName: 'education',
    type: 'expense',
    defaultIcon: '📚',
    subCategories: [
      {
        name: '学费',
        englishName: 'education_tuition',
        synonyms: ['学费', '培训费', '补习费', '网课费', '考试费', '报名费'],
        defaultIcon: '🎓',
      },
      {
        name: '书籍',
        englishName: 'education_books',
        synonyms: ['书本', '教材', '参考书', '图书', '电子书', '杂志'],
        defaultIcon: '📖',
      },
      {
        name: '文具',
        englishName: 'education_stationery',
        synonyms: ['文具', '笔', '本子', '书包', '办公用品'],
        defaultIcon: '✏️',
      },
      {
        name: '软件',
        englishName: 'education_software',
        synonyms: ['软件', 'APP', '会员', '订阅', '在线课程', '学习平台'],
        defaultIcon: '💻',
      },
    ],
  },

  // 数码 - 包含设备、配件、服务等
  数码: {
    standardName: '数码',
    englishName: 'digital',
    type: 'expense',
    defaultIcon: '📱',
    subCategories: [
      {
        name: '设备',
        englishName: 'digital_device',
        synonyms: ['手机', '电脑', '笔记本', '平板', 'iPad', '相机', '游戏机', '耳机', '音响'],
        defaultIcon: '📱',
      },
      {
        name: '配件',
        englishName: 'digital_accessories',
        synonyms: ['键盘', '鼠标', '显示器', '硬盘', 'U盘', '充电宝', '数据线', '充电器', '贴膜', '手机壳'],
        defaultIcon: '🔌',
      },
      {
        name: '维修',
        englishName: 'digital_repair',
        synonyms: ['维修', '升级', '更换', '配件更换'],
        defaultIcon: '🔧',
      },
      {
        name: '服务',
        englishName: 'digital_service',
        synonyms: ['云服务', '网盘', '域名', '服务器', 'VPN', '软件订阅'],
        defaultIcon: '☁️',
      },
    ],
  },

  // 人情 - 包含礼金、礼品、请客等
  人情: {
    standardName: '人情',
    englishName: 'social',
    type: 'expense',
    defaultIcon: '❤️',
    subCategories: [
      {
        name: '礼金',
        englishName: 'social_gift_money',
        synonyms: ['礼金', '红包', '份子钱', '随礼', '压岁钱', '慰问金'],
        defaultIcon: '🧧',
      },
      {
        name: '礼品',
        englishName: 'social_gift_item',
        synonyms: ['礼品', '礼物', '送礼', '赠品', '特产', '伴手礼'],
        defaultIcon: '🎁',
      },
      {
        name: '请客',
        englishName: 'social_treat',
        synonyms: ['请客', '招待', '应酬', '聚餐', '走亲访友'],
        defaultIcon: '🍻',
      },
      {
        name: '捐赠',
        englishName: 'social_donation',
        synonyms: ['捐赠', '捐款', '慈善', '赞助', '打赏'],
        defaultIcon: '💝',
      },
    ],
  },

  // 宠物 - 包含宠物食品、用品、医疗等
  宠物: {
    standardName: '宠物',
    englishName: 'pet',
    type: 'expense',
    defaultIcon: '🐱',
    subCategories: [
      {
        name: '宠物食品',
        englishName: 'pet_food',
        synonyms: ['宠物粮', '猫粮', '狗粮', '零食', '罐头'],
        defaultIcon: '🍖',
      },
      {
        name: '宠物用品',
        englishName: 'pet_supplies',
        synonyms: ['猫砂', '狗窝', '玩具', '牵引绳', '笼子', '垫子'],
        defaultIcon: '🧸',
      },
      {
        name: '宠物医疗',
        englishName: 'pet_medical',
        synonyms: ['宠物医院', '疫苗', '驱虫', '看病', '绝育'],
        defaultIcon: '💉',
      },
      {
        name: '宠物服务',
        englishName: 'pet_service',
        synonyms: ['洗澡', '美容', '寄养', '训练', '遛狗'],
        defaultIcon: '🛁',
      },
    ],
  },

  // 金融 - 包含保险、投资、税费等
  金融: {
    standardName: '金融',
    englishName: 'finance',
    type: 'expense',
    defaultIcon: '💳',
    subCategories: [
      {
        name: '保险',
        englishName: 'finance_insurance',
        synonyms: ['保险', '人寿险', '重疾险', '医疗险', '意外险', '车险', '财险'],
        defaultIcon: '🛡️',
      },
      {
        name: '投资',
        englishName: 'finance_investment',
        synonyms: ['股票', '基金', '债券', '期货', '外汇', '黄金', '投资亏损', '手续费', '佣金', '印花税'],
        defaultIcon: '📉',
      },
      {
        name: '银行',
        englishName: 'finance_bank',
        synonyms: ['年费', '账户管理费', '转账费', '汇款费', '手续费'],
        defaultIcon: '🏦',
      },
      {
        name: '税费',
        englishName: 'finance_tax',
        synonyms: ['个人所得税', '房产税', '车船税', '违章罚款'],
        defaultIcon: '📝',
      },
    ],
  },

  // 其他支出
  其他支出: {
    standardName: '其他支出',
    englishName: 'other_expense',
    type: 'expense',
    defaultIcon: '📦',
    subCategories: [
      {
        name: '其他',
        englishName: 'other',
        synonyms: ['其他', '杂项', '未分类', '其他费用', '杂费'],
        defaultIcon: '📦',
      },
    ],
  },

  // ==================== 收入分类 ====================

  // 工资 - 包含基本工资、奖金、补贴等
  工资: {
    standardName: '工资',
    englishName: 'salary',
    type: 'income',
    defaultIcon: '💰',
    subCategories: [
      {
        name: '基本工资',
        englishName: 'salary_base',
        synonyms: ['月薪', '年薪', '底薪', '基本工资', '固定工资'],
        defaultIcon: '💵',
      },
      {
        name: '奖金',
        englishName: 'salary_bonus',
        synonyms: ['奖金', '年终奖', '绩效奖', '项目奖', '全勤奖', '过节费'],
        defaultIcon: '🎉',
      },
      {
        name: '补贴',
        englishName: 'salary_allowance',
        synonyms: ['补贴', '津贴', '交通补贴', '餐补', '房补', '通讯补贴', '高温补贴'],
        defaultIcon: '💳',
      },
      {
        name: '加班费',
        englishName: 'salary_overtime',
        synonyms: ['加班费', '加班补贴', '调休折算'],
        defaultIcon: '⏰',
      },
    ],
  },

  // 兼职 - 包含临时工、自由职业等
  兼职: {
    standardName: '兼职',
    englishName: 'parttime',
    type: 'income',
    defaultIcon: '💼',
    subCategories: [
      {
        name: '临时工',
        englishName: 'parttime_temp',
        synonyms: ['临时工', '小时工', '日结', '兼职工作'],
        defaultIcon: '⏳',
      },
      {
        name: '自由职业',
        englishName: 'parttime_freelance',
        synonyms: ['自由职业', '接单', '私活', '家教', '翻译', '设计', '写作', '编程'],
        defaultIcon: '💻',
      },
      {
        name: '平台收入',
        englishName: 'parttime_platform',
        synonyms: ['代驾', '跑腿', '众包', '网约车司机', '外卖骑手', '直播', '带货'],
        defaultIcon: '📱',
      },
    ],
  },

  // 投资收入 - 包含理财、股票、房产等
  投资收入: {
    standardName: '投资收入',
    englishName: 'investment_income',
    type: 'income',
    defaultIcon: '�',
    subCategories: [
      {
        name: '理财收益',
        englishName: 'investment_finance',
        synonyms: ['理财收益', '利息', '余额宝', '理财通', '定期收益'],
        defaultIcon: '💹',
      },
      {
        name: '股票收益',
        englishName: 'investment_stock',
        synonyms: ['股票收益', '股息', '分红', '炒股盈利'],
        defaultIcon: '📊',
      },
      {
        name: '房产收益',
        englishName: 'investment_realestate',
        synonyms: ['租金收入', '房租', '房产升值', '卖房收入'],
        defaultIcon: '🏠',
      },
      {
        name: '其他投资',
        englishName: 'investment_other',
        synonyms: ['基金收益', '债券收益', '外汇收益', '期货收益', '数字货币收益', '版税', '专利收入'],
        defaultIcon: '�',
      },
    ],
  },

  // 礼金 - 包含红包、赠与、退款等
  礼金: {
    standardName: '礼金',
    englishName: 'gift_income',
    type: 'income',
    defaultIcon: '🧧',
    subCategories: [
      {
        name: '红包',
        englishName: 'gift_redpacket',
        synonyms: ['红包', '压岁钱', '结婚红包', '生日红包', '节日红包'],
        defaultIcon: '🧧',
      },
      {
        name: '赠与',
        englishName: 'gift_donation',
        synonyms: ['赠与', '赞助', '资助', '赡养费', '生活费'],
        defaultIcon: '💝',
      },
      {
        name: '退款',
        englishName: 'gift_refund',
        synonyms: ['退款', '退货款', '返现', '理赔款', '退税'],
        defaultIcon: '💸',
      },
      {
        name: '其他收入',
        englishName: 'gift_other',
        synonyms: ['中奖', '彩票', '捡钱', '意外收入', '其他收入'],
        defaultIcon: '🎁',
      },
    ],
  },
};

// ==================== 工具函数 ====================

/**
 * 所有分类的数组形式
 */
export const categoryList = Object.values(categoryIconMapping);

/**
 * 支出分类列表
 */
export const expenseCategoryList = categoryList.filter(c => c.type === 'expense');

/**
 * 收入分类列表
 */
export const incomeCategoryList = categoryList.filter(c => c.type === 'income');

/**
 * 根据输入名称获取对应的主分类
 * @param inputName 用户输入的分类名称
 * @returns 匹配到的分类映射，未匹配则返回null
 */
export function getCategoryMapping(inputName: string): CategoryMapping | null {
  const normalizedInput = inputName.trim();

  // 直接匹配主分类名称
  if (categoryIconMapping[normalizedInput]) {
    return categoryIconMapping[normalizedInput];
  }

  // 遍历所有主分类的近义词
  for (const mapping of Object.values(categoryIconMapping)) {
    // 检查主分类名称包含关系
    if (normalizedInput.includes(mapping.standardName) || mapping.standardName.includes(normalizedInput)) {
      return mapping;
    }
    // 检查子分类名称
    for (const sub of mapping.subCategories) {
      if (sub.name === normalizedInput || sub.synonyms.includes(normalizedInput)) {
        return mapping;
      }
    }
  }

  return null;
}

/**
 * 根据输入名称获取子分类
 * @param inputName 用户输入的子分类名称
 * @returns 匹配到的子分类映射和父分类，未匹配则返回null
 */
export function getSubCategoryMapping(inputName: string): { subCategory: SubCategoryMapping; parentCategory: CategoryMapping } | null {
  const normalizedInput = inputName.trim();

  for (const mapping of Object.values(categoryIconMapping)) {
    for (const sub of mapping.subCategories) {
      // 直接匹配子分类名称
      if (sub.name === normalizedInput) {
        return { subCategory: sub, parentCategory: mapping };
      }
      // 匹配近义词
      if (sub.synonyms.includes(normalizedInput)) {
        return { subCategory: sub, parentCategory: mapping };
      }
      // 包含关系匹配
      if (normalizedInput.includes(sub.name) || sub.synonyms.some(s => normalizedInput.includes(s))) {
        return { subCategory: sub, parentCategory: mapping };
      }
    }
  }

  return null;
}

/**
 * 智能匹配分类和子分类
 * @param categoryInput 分类输入（可能是主分类或子分类）
 * @param subCategoryInput 子分类输入（可选）
 * @returns 匹配结果
 */
export function matchCategory(
  categoryInput: string,
  subCategoryInput?: string
): {
  mainCategory: CategoryMapping | null;
  subCategory: SubCategoryMapping | null;
} {
  // 如果有子分类输入，优先匹配子分类
  if (subCategoryInput) {
    const subMatch = getSubCategoryMapping(subCategoryInput);
    if (subMatch) {
      return {
        mainCategory: subMatch.parentCategory,
        subCategory: subMatch.subCategory,
      };
    }
  }

  // 尝试将主输入作为子分类匹配
  const subMatch = getSubCategoryMapping(categoryInput);
  if (subMatch) {
    return {
      mainCategory: subMatch.parentCategory,
      subCategory: subMatch.subCategory,
    };
  }

  // 匹配主分类
  const mainMatch = getCategoryMapping(categoryInput);
  if (mainMatch) {
    return {
      mainCategory: mainMatch,
      subCategory: null,
    };
  }

  return {
    mainCategory: null,
    subCategory: null,
  };
}

/**
 * 根据分类名称获取图标
 * @param categoryName 分类名称
 * @returns 图标emoji或字符
 */
export function getCategoryIcon(categoryName: string): string {
  const mapping = getCategoryMapping(categoryName);
  if (mapping) {
    return mapping.defaultIcon;
  }
  // 尝试匹配子分类
  const subMatch = getSubCategoryMapping(categoryName);
  if (subMatch) {
    return subMatch.subCategory.defaultIcon;
  }
  return '📦';
}

/**
 * 根据分类名称获取英文名称（用于CDN路径）
 * @param categoryName 分类名称
 * @param subCategoryName 子分类名称（可选）
 * @returns 英文名称
 */
export function getCategoryEnglishName(categoryName: string, subCategoryName?: string): string {
  // 如果提供了子分类，优先使用子分类的英文名称
  if (subCategoryName) {
    const subMatch = getSubCategoryMapping(subCategoryName);
    if (subMatch) {
      return subMatch.subCategory.englishName;
    }
  }

  const mapping = getCategoryMapping(categoryName);
  if (mapping) {
    return mapping.englishName;
  }

  // 尝试匹配子分类
  const subMatch = getSubCategoryMapping(categoryName);
  if (subMatch) {
    return subMatch.subCategory.englishName;
  }

  return 'other_expense';
}

/**
 * 获取CDN图标URL
 * @param englishName 分类英文名称
 * @param cdnBaseUrl CDN基础路径
 * @returns 完整的图标URL
 */
export function getIconUrl(englishName: string, cdnBaseUrl: string = 'https://cdn.example.com/icons'): string {
  return `${cdnBaseUrl}/${englishName}.png`;
}

/**
 * 根据输入名称获取图标URL
 * @param inputName 用户输入的分类名称
 * @param cdnBaseUrl CDN基础路径
 * @returns 图标URL，未匹配则返回默认图标
 */
export function getIconUrlByName(inputName: string, cdnBaseUrl?: string): string {
  const mapping = getCategoryMapping(inputName);
  if (mapping) {
    return getIconUrl(mapping.englishName, cdnBaseUrl);
  }
  // 尝试匹配子分类
  const subMatch = getSubCategoryMapping(inputName);
  if (subMatch) {
    return getIconUrl(subMatch.subCategory.englishName, cdnBaseUrl);
  }
  return getIconUrl('other_expense', cdnBaseUrl);
}

/**
 * 标准化分类名称
 * 将各种近义词统一转换为标准分类名称
 * @param inputName 输入的分类名称
 * @returns 标准分类名称，未匹配则返回原名称
 */
export function normalizeCategoryName(inputName: string): string {
  const mapping = getCategoryMapping(inputName);
  if (mapping) {
    return mapping.standardName;
  }
  return inputName;
}

/**
 * 标准化子分类名称
 * @param inputName 输入的子分类名称
 * @returns 标准子分类名称，未匹配则返回原名称
 */
export function normalizeSubCategoryName(inputName: string): string {
  const subMatch = getSubCategoryMapping(inputName);
  if (subMatch) {
    return subMatch.subCategory.name;
  }
  return inputName;
}

/**
 * 获取分类类型
 * @param categoryName 分类名称
 * @returns 'expense' | 'income' | null
 */
export function getCategoryType(categoryName: string): 'expense' | 'income' | null {
  const mapping = getCategoryMapping(categoryName);
  return mapping ? mapping.type : null;
}

/**
 * 获取主分类下的所有子分类
 * @param mainCategoryName 主分类名称
 * @returns 子分类列表
 */
export function getSubCategories(mainCategoryName: string): SubCategoryMapping[] {
  const mapping = categoryIconMapping[mainCategoryName];
  return mapping ? mapping.subCategories : [];
}

export default categoryIconMapping;
