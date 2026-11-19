import { t as categoryIconMapping } from "./categoryIconMapping-C7E85sDI.js";
//#region src/utils/spriteIcons.ts
/**
* 分类图标管理工具
* 统一使用 Emoji 作为分类图标
*/
var CATEGORY_EMOJI_MAP = {
	"food": "🍜",
	"breakfast": "🍳",
	"lunch": "🍱",
	"dinner": "🍽️",
	"drink": "🧋",
	"snack": "🍿",
	"transport": "🚗",
	"subway": "🚇",
	"bus": "🚌",
	"taxi": "🚕",
	"parking": "🅿️",
	"gas": "⛽",
	"shopping": "🛍️",
	"daily": "🧴",
	"clothes": "👔",
	"digital": "📱",
	"beauty": "💄",
	"home": "🏠",
	"rent": "🏠",
	"utility": "💡",
	"property": "🏢",
	"entertainment": "🎮",
	"movie": "🎬",
	"game": "🎮",
	"medical": "🏥",
	"medicine": "💊",
	"clinic": "🏥",
	"checkup": "🩺",
	"education": "📚",
	"tuition": "🎓",
	"book": "📖",
	"training": "📝",
	"gift": "🎁",
	"present": "🎁",
	"treat": "🍽️",
	"salary": "💰",
	"parttime": "💵",
	"invest": "📈",
	"investment": "📈",
	"freelance": "💼",
	"bonus": "🎁",
	"allowance": "💵",
	"redpacket": "🧧",
	"base_salary": "💰",
	"wechat_red": "🧧",
	"alipay_red": "🧧",
	"stock": "📈",
	"fund": "📊",
	"interest": "💵",
	"transfer": "🔄",
	"repay": "💳",
	"borrow_in": "📥",
	"borrow_out": "📤",
	"repayment": "✅",
	"reimburse": "📋",
	"housing": "🏠",
	"clothing": "👗",
	"travel": "✈️",
	"parenting": "👶",
	"finance": "💰",
	"other_expense": "📦",
	"other_income": "💰",
	"secondhand": "💻"
};
/**
* 获取分类的Emoji图标
* @param iconId 图标ID或分类名称或Emoji
* @returns Emoji字符串
*/
function getCategoryEmoji(iconId) {
	if (iconId && /[\u{1F600}-\u{1F64F}]/u.test(iconId)) return iconId;
	if (iconId && /[\u{1F300}-\u{1F5FF}]/u.test(iconId)) return iconId;
	if (iconId && /[\u{1F680}-\u{1F6FF}]/u.test(iconId)) return iconId;
	if (iconId && /[\u{2600}-\u{26FF}]/u.test(iconId)) return iconId;
	if (iconId && /[\u{2700}-\u{27BF}]/u.test(iconId)) return iconId;
	if (CATEGORY_EMOJI_MAP[iconId]) return CATEGORY_EMOJI_MAP[iconId];
	for (const category of Object.values(categoryIconMapping)) {
		if (category.englishName === iconId) return category.defaultIcon;
		for (const subCategory of category.subCategories) if (subCategory.englishName === iconId) return subCategory.defaultIcon;
	}
	return "📦";
}
//#endregion
export { getCategoryEmoji as t };

//# sourceMappingURL=spriteIcons-D-QipidE.js.map