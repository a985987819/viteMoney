/**
 * 精灵图图标管理工具
 * 使用CSS background-position来显示精灵图中的单个图标
 */

// 精灵图配置 - 根据实际图片调整这些值
const SPRITE_CONFIG = {
  // 每个图标的大小
  iconWidth: 32,
  iconHeight: 32,
  // 精灵图每行/列的图标数量 (新图是16列x10行)
  cols: 16,
  rows: 10,
  // 精灵图路径
  spriteUrl: '/src/assets/category-sprite.png',
};

// 分类图标在精灵图中的位置映射 (row, col) 从0开始
// 新精灵图布局: 16列 x 10行
export const CATEGORY_ICON_POSITIONS: Record<string, { row: number; col: number }> = {
  // ========== 第0行: 饮食相关 ==========
  'food': { row: 0, col: 0 },           // 苹果 (饮食大类)
  'food_1': { row: 0, col: 1 },         // 蔬菜篮 (买菜)
  'food_2': { row: 0, col: 2 },         // 汉堡盘子 (外食)
  'food_3': { row: 0, col: 3 },         // 汉堡 (快餐)
  'food_4': { row: 0, col: 4 },         // 珍珠奶茶
  'food_5': { row: 0, col: 5 },         // 咖啡杯
  'food_6': { row: 0, col: 6 },         // 薯片 (零食)
  'food_7': { row: 0, col: 7 },         // 零食袋
  'food_8': { row: 0, col: 8 },         // 外卖盒

  // ========== 第1行: 住房相关 ==========
  'housing': { row: 1, col: 0 },        // 小房子 (住房大类)
  'housing_1': { row: 1, col: 1 },      // 木屋 (房租)
  'housing_2': { row: 1, col: 2 },      // 钥匙
  'housing_3': { row: 1, col: 3 },      // 水滴闪电 (水电)
  'housing_4': { row: 1, col: 4 },      // 大楼 (物业)
  'housing_5': { row: 1, col: 5 },      // 监控 (网费/安全)
  'housing_6': { row: 1, col: 6 },      // WiFi信号
  'housing_7': { row: 1, col: 7 },      // 工具扳手 (维修)
  'housing_8': { row: 1, col: 8 },      // 门牌/钥匙扣

  // ========== 第2行: 交通相关 ==========
  'transport': { row: 2, col: 0 },      // 火车 (交通大类)
  'transport_1': { row: 2, col: 1 },    // 红色火车
  'transport_2': { row: 2, col: 2 },    // 公交车
  'transport_3': { row: 2, col: 3 },    // 出租车
  'transport_4': { row: 2, col: 4 },    // 加油站 (油费)
  'transport_5': { row: 2, col: 5 },    // 停车P
  'transport_6': { row: 2, col: 6 },    // 汽车零件 (保养)
  'transport_7': { row: 2, col: 7 },    // 工具 (维修)

  // ========== 第3行: 服饰相关 ==========
  'clothing': { row: 3, col: 0 },       // 蓝色连衣裙 (服饰大类)
  'clothing_1': { row: 3, col: 1 },     // 衬衫衣架
  'clothing_2': { row: 3, col: 2 },     // 衣架 (衣鞋)
  'clothing_3': { row: 3, col: 3 },     // 护肤品瓶子
  'clothing_4': { row: 3, col: 4 },     // 项链 (饰品)
  'clothing_5': { row: 3, col: 5 },     // 西装 (干洗/正式服装)

  // ========== 第4行: 医疗相关 ==========
  'medical': { row: 4, col: 0 },        // 红十字 (医疗大类)
  'medical_1': { row: 4, col: 1 },      // 医院建筑
  'medical_2': { row: 4, col: 2 },      // 听诊器 (门诊)
  'medical_3': { row: 4, col: 3 },      // 急救箱 (药品)
  'medical_4': { row: 4, col: 4 },      // 心跳线 (体检)
  'medical_5': { row: 4, col: 5 },      // 针筒 (器械)

  // ========== 第5行: 教育相关 ==========
  'education': { row: 5, col: 0 },       // 书本堆 (教育大类)
  'education_1': { row: 5, col: 1 },     // 彩色书本
  'education_2': { row: 5, col: 2 },     // 证书/文凭 (学费)
  'education_3': { row: 5, col: 3 },     // ABC黑板 (网课)
  'education_4': { row: 5, col: 4 },     // 钢笔 (文具)
  'education_5': { row: 5, col: 5 },     // Windows图标 (软件)

  // ========== 第6行: 娱乐相关 ==========
  'entertainment': { row: 6, col: 0 },   // 面具 (娱乐大类)
  'entertainment_1': { row: 6, col: 1 }, // 爆米花 (电影)
  'entertainment_2': { row: 6, col: 2 }, // 游戏手柄
  'entertainment_3': { row: 6, col: 3 }, // 聚会/人物
  'entertainment_4': { row: 6, col: 4 }, // 调色板 (爱好)
  'entertainment_5': { row: 6, col: 5 }, // 剧院面具

  // ========== 第7行: 旅行相关 ==========
  'travel': { row: 7, col: 0 },          // 行李箱 (旅行大类)
  'travel_1': { row: 7, col: 1 },        // 飞机
  'travel_2': { row: 7, col: 2 },        // 护照/证件 (住宿登记)
  'travel_3': { row: 7, col: 3 },        // 门票/票券
  'travel_4': { row: 7, col: 4 },        // 当地美食 (旅餐)
  'travel_5': { row: 7, col: 5 },        // 指南针/纪念品

  // ========== 第8行: 人情相关 ==========
  'social': { row: 8, col: 0 },          // 手机 (通讯/人情大类)
  'social_1': { row: 8, col: 1 },        // 上升图表
  'social_2': { row: 8, col: 2 },        // 电脑 (礼金转账)
  'social_3': { row: 8, col: 3 },        // 笔记本电脑 (礼品)
  'social_4': { row: 8, col: 4 },        // 耳机
  'social_5': { row: 8, col: 5 },        // 循环箭头 (聚餐/往来)

  // ========== 第9行: 数码相关 ==========
  'digital': { row: 9, col: 0 },         // 礼物盒 (数码大类)
  'digital_1': { row: 9, col: 1 },       // 账单 (话费)
  'digital_2': { row: 9, col: 2 },       // 书本/手册 (设备)
  'digital_3': { row: 9, col: 3 },       // 地图/导航 (配件)
  'digital_4': { row: 9, col: 4 },       // 清单 (订阅)
  'digital_5': { row: 9, col: 5 },       // 钥匙 (维修)

  // ========== 右侧区域 (第0-9行, 第8-15列) ==========
  // 家居相关 (右侧第0-2行)
  'home': { row: 0, col: 9 },            // 地球/家居装饰
  'home_1': { row: 0, col: 10 },         // 手机图表
  'home_2': { row: 0, col: 11 },         // 笔记本电脑
  'home_3': { row: 0, col: 12 },         // 卷纸
  'home_4': { row: 0, col: 13 },         // 票券
  'home_5': { row: 0, col: 14 },         // 文档

  // 育儿相关 (右侧第1-2行)
  'parenting': { row: 1, col: 9 },       // 礼物盒
  'parenting_1': { row: 1, col: 10 },    // 信封/信件
  'parenting_2': { row: 1, col: 11 },    // 蓝色礼物
  'parenting_3': { row: 1, col: 12 },    // 金色礼物
  'parenting_4': { row: 1, col: 13 },    // 锅具
  'parenting_5': { row: 1, col: 14 },    // 上升图表

  // 金融相关 (右侧第2-4行)
  'finance': { row: 2, col: 9 },         // 婴儿车/玩具
  'finance_1': { row: 2, col: 10 },      // 电话
  'finance_2': { row: 2, col: 11 },      // 美元符号
  'finance_3': { row: 2, col: 12 },      // 背包
  'finance_4': { row: 2, col: 13 },      // 红心
  'finance_5': { row: 2, col: 14 },      // 红爱心

  // 收入分类 (右侧第3-5行)
  'salary': { row: 3, col: 9 },          // 手机
  'parttime': { row: 3, col: 10 },       // 图表
  'investment': { row: 3, col: 11 },     // 折线图
  'secondhand': { row: 3, col: 12 },     // 笔记本电脑
  'bonus': { row: 3, col: 13 },          // 耳机
  'other_income': { row: 3, col: 14 },   // 锤子

  // 其他支出
  'other_expense': { row: 4, col: 9 },   // 沙发
  'other_expense_2': { row: 4, col: 10 }, // 水桶拖把
  'other_expense_3': { row: 4, col: 11 }, // 罐子
  'other_expense_4': { row: 4, col: 12 }, // 卷纸
  'other_expense_5': { row: 4, col: 13 }, // 餐具
  'other_expense_6': { row: 4, col: 14 }, // 灯泡提示
};

/**
 * 获取精灵图背景样式
 * @param iconId 图标ID
 * @param size 显示大小（默认32px）
 * @returns CSS样式对象
 */
export function getSpriteIconStyle(iconId: string, size: number = 32): React.CSSProperties {
  const position = CATEGORY_ICON_POSITIONS[iconId];

  if (!position) {
    // 如果没有找到对应位置，返回默认样式
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
    };
  }

  const { row, col } = position;
  const { iconWidth, iconHeight, spriteUrl } = SPRITE_CONFIG;

  // 计算背景位置
  const bgPositionX = -(col * iconWidth);
  const bgPositionY = -(row * iconHeight);

  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(${spriteUrl})`,
    backgroundPosition: `${bgPositionX}px ${bgPositionY}px`,
    backgroundSize: `${SPRITE_CONFIG.cols * size}px ${SPRITE_CONFIG.rows * size}px`,
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated', // 保持像素风格
  };
}

/**
 * 获取图标在精灵图中的索引（用于其他用途）
 * @param iconId 图标ID
 * @returns 索引值，未找到返回-1
 */
export function getIconIndex(iconId: string): number {
  const position = CATEGORY_ICON_POSITIONS[iconId];
  if (!position) return -1;
  return position.row * SPRITE_CONFIG.cols + position.col;
}

/**
 * 检查图标是否存在
 * @param iconId 图标ID
 * @returns 是否存在
 */
export function hasIcon(iconId: string): boolean {
  return iconId in CATEGORY_ICON_POSITIONS;
}
