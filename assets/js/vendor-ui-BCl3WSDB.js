import { r as __toESM, t as __commonJSMin } from "./rolldown-runtime-DZjNq3_i.js";
import { $ as Switch$1, $n as useLayoutEffect, $t as RefIcon$5, An as useCacheToken, At as es_default$3, B as require_zh_CN$5, Bn as toArray$1, Bt as FormProvider$1, Cn as FastColor, Ct as RefIcon$9, Dn as _classCallCheck, Dt as RefPanelPicker, En as _createClass, Et as RefRangePicker, Fn as wrapperRaf, Ft as es_default$2, G as RefIcon$27, Gn as get, Gt as Context, H as require_interopRequireDefault, Hn as warningOnce, Ht as List$1, In as _toConsumableArray, It as Option, Jn as supportRef, Jt as triggerFocus, K as RefIcon$26, Kn as composeRef, Kt as es_default$1, Ln as clsx, Lt as OptGroup, Mn as createTheme, Mt as RefIcon$6, Nn as StyleContext, Nt as RefIcon$7, On as Keyframe, Ot as RefIcon$10, Pn as isEqual, Pt as RefIcon$8, Qn as useSafeState, Qt as unmount, Rn as RefResizeObserver, Rt as RefForm, Sn as generate, St as es_default$4, Tn as merge$1, Tt as es_default$8, U as RefIcon$24, Un as merge, Ut as WrapperField, V as require_zh_CN$6, Vn as omit, Vt as useForm$1, W as RefIcon$25, Wn as set, Wt as ListContext$1, X as RefIcon$23, Xn as useMemo$12, Xt as Color, Yn as useComposeRef, Yt as RefIcon$19, Zn as useControlledState, Zt as render, _n as RefIcon$2, _t as es_default$6, an as useId_default, ar as require_react, at as RefIcon$22, bn as presetPalettes, bt as RefIcon$12, cn as locale$3, ct as RefIcon$18, dn as CSSMotionList_default, en as useNotification$1, er as canUseDom, et as es_default$11, fn as MotionProvider, ft as es_default$9, gn as RefIcon$3, gt as es_default$7, hn as RefIcon, ht as RefIcon$15, in as isVisible_default, ir as require_react_dom, it as RefIcon$21, jn as unit, jt as Popup, kn as useStyleRegister, kt as RefIcon$20, ln as pickAttrs, mn as RefIcon$4, mt as RefIcon$14, nn as Notify, nt as Circle$1, on as e, ot as es_default$10, pn as RefIcon$1, pt as RefIcon$13, q as es_default$12, qn as getNodeRef, qt as Panel, rn as UniqueProvider$1, rt as Pagination$1, sn as locale$2, st as RefIcon$17, tn as NotificationProvider, tr as useEvent, tt as UnstableContext, un as es_default, ut as RefIcon$16, vn as IconContext, vt as es_default$5, wn as genStyleUtils, wt as Checkbox$2, xn as presetPrimaryColors, xt as debounce, yn as blue, yt as RefIcon$11, zn as getDOM, zt as useWatch } from "./vendor-others-DR5UvigV.js";
import { a as replaceElement, i as isFragment, r as cloneElement } from "./vendor-react-BwfiEprq.js";
//#region node_modules/antd/es/_util/warning.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function noop() {}
var { resetWarned: rcResetWarned } = warningOnce;
var WarningContext = /* @__PURE__ */ import_react.createContext({});
/**
* This is a hook but we not named as `useWarning`
* since this is only used in development.
* We should always wrap this in `if (process.env.NODE_ENV !== 'production')` condition
*/
var devUseWarning = () => {
	const noopWarning = () => {};
	noopWarning.deprecated = noop;
	return noopWarning;
};
var defaultIconPrefixCls = "anticon";
var Variants = [
	"outlined",
	"borderless",
	"filled",
	"underlined"
];
var defaultGetPrefixCls = (suffixCls, customizePrefixCls) => {
	if (customizePrefixCls) return customizePrefixCls;
	return suffixCls ? `ant-${suffixCls}` : "ant";
};
var ConfigContext = /* @__PURE__ */ import_react.createContext({
	getPrefixCls: defaultGetPrefixCls,
	iconPrefixCls: defaultIconPrefixCls
});
var { Consumer: ConfigConsumer } = ConfigContext;
var EMPTY_OBJECT = {};
/**
* Get ConfigProvider configured component props.
* This help to reduce bundle size for saving `?.` operator.
* Do not use as `useMemo` deps since we do not cache the object here.
*
* NOTE: not refactor this with `useMemo` since memo will cost another memory space,
* which will waste both compare calculation & memory.
*/
function useComponentConfig(propName) {
	const context = import_react.useContext(ConfigContext);
	const { getPrefixCls, direction, getPopupContainer, renderEmpty } = context;
	return {
		classNames: EMPTY_OBJECT,
		styles: EMPTY_OBJECT,
		...context[propName],
		getPrefixCls,
		direction,
		getPopupContainer,
		renderEmpty
	};
}
//#endregion
//#region node_modules/antd/es/theme/interface/presetColors.js
var PresetColors = [
	"blue",
	"purple",
	"cyan",
	"green",
	"magenta",
	"pink",
	"red",
	"orange",
	"yellow",
	"volcano",
	"geekblue",
	"lime",
	"gold"
];
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genFontSizes.js
function getLineHeight(fontSize) {
	return (fontSize + 8) / fontSize;
}
function getFontSizes(base) {
	const fontSizes = Array.from({ length: 10 }).map((_, index) => {
		const i = index - 1;
		const baseSize = base * Math.E ** (i / 5);
		return Math.floor((index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize)) / 2) * 2;
	});
	fontSizes[1] = base;
	return fontSizes.map((size) => ({
		size,
		lineHeight: getLineHeight(size)
	}));
}
//#endregion
//#region node_modules/antd/es/version/index.js
var version_default = "6.3.4";
//#endregion
//#region node_modules/antd/es/theme/themes/seed.js
var defaultPresetColors = {
	blue: "#1677FF",
	purple: "#722ED1",
	cyan: "#13C2C2",
	green: "#52C41A",
	magenta: "#EB2F96",
	pink: "#EB2F96",
	red: "#F5222D",
	orange: "#FA8C16",
	yellow: "#FADB14",
	volcano: "#FA541C",
	geekblue: "#2F54EB",
	gold: "#FAAD14",
	lime: "#A0D911"
};
var seedToken = {
	...defaultPresetColors,
	colorPrimary: "#1677ff",
	colorSuccess: "#52c41a",
	colorWarning: "#faad14",
	colorError: "#ff4d4f",
	colorInfo: "#1677ff",
	colorLink: "",
	colorTextBase: "",
	colorBgBase: "",
	fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
	fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
	fontSize: 14,
	lineWidth: 1,
	lineType: "solid",
	motionUnit: .1,
	motionBase: 0,
	motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
	motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
	motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
	motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
	motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
	motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
	motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
	motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
	borderRadius: 6,
	sizeUnit: 4,
	sizeStep: 4,
	sizePopupArrow: 16,
	controlHeight: 32,
	zIndexBase: 0,
	zIndexPopupBase: 1e3,
	opacityImage: 1,
	wireframe: false,
	motion: true
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genColorMapToken.js
function genColorMapToken(seed, { generateColorPalettes, generateNeutralColorPalettes }) {
	const { colorSuccess: colorSuccessBase, colorWarning: colorWarningBase, colorError: colorErrorBase, colorInfo: colorInfoBase, colorPrimary: colorPrimaryBase, colorBgBase, colorTextBase } = seed;
	const primaryColors = generateColorPalettes(colorPrimaryBase);
	const successColors = generateColorPalettes(colorSuccessBase);
	const warningColors = generateColorPalettes(colorWarningBase);
	const errorColors = generateColorPalettes(colorErrorBase);
	const infoColors = generateColorPalettes(colorInfoBase);
	const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase);
	const linkColors = generateColorPalettes(seed.colorLink || seed.colorInfo);
	const colorErrorBgFilledHover = new FastColor(errorColors[1]).mix(new FastColor(errorColors[3]), 50).toHexString();
	const presetColorTokens = {};
	PresetColors.forEach((colorKey) => {
		const colorBase = seed[colorKey];
		if (colorBase) {
			const colorPalette = generateColorPalettes(colorBase);
			presetColorTokens[`${colorKey}Hover`] = colorPalette[5];
			presetColorTokens[`${colorKey}Active`] = colorPalette[7];
		}
	});
	return {
		...neutralColors,
		colorPrimaryBg: primaryColors[1],
		colorPrimaryBgHover: primaryColors[2],
		colorPrimaryBorder: primaryColors[3],
		colorPrimaryBorderHover: primaryColors[4],
		colorPrimaryHover: primaryColors[5],
		colorPrimary: primaryColors[6],
		colorPrimaryActive: primaryColors[7],
		colorPrimaryTextHover: primaryColors[8],
		colorPrimaryText: primaryColors[9],
		colorPrimaryTextActive: primaryColors[10],
		colorSuccessBg: successColors[1],
		colorSuccessBgHover: successColors[2],
		colorSuccessBorder: successColors[3],
		colorSuccessBorderHover: successColors[4],
		colorSuccessHover: successColors[4],
		colorSuccess: successColors[6],
		colorSuccessActive: successColors[7],
		colorSuccessTextHover: successColors[8],
		colorSuccessText: successColors[9],
		colorSuccessTextActive: successColors[10],
		colorErrorBg: errorColors[1],
		colorErrorBgHover: errorColors[2],
		colorErrorBgFilledHover,
		colorErrorBgActive: errorColors[3],
		colorErrorBorder: errorColors[3],
		colorErrorBorderHover: errorColors[4],
		colorErrorHover: errorColors[5],
		colorError: errorColors[6],
		colorErrorActive: errorColors[7],
		colorErrorTextHover: errorColors[8],
		colorErrorText: errorColors[9],
		colorErrorTextActive: errorColors[10],
		colorWarningBg: warningColors[1],
		colorWarningBgHover: warningColors[2],
		colorWarningBorder: warningColors[3],
		colorWarningBorderHover: warningColors[4],
		colorWarningHover: warningColors[4],
		colorWarning: warningColors[6],
		colorWarningActive: warningColors[7],
		colorWarningTextHover: warningColors[8],
		colorWarningText: warningColors[9],
		colorWarningTextActive: warningColors[10],
		colorInfoBg: infoColors[1],
		colorInfoBgHover: infoColors[2],
		colorInfoBorder: infoColors[3],
		colorInfoBorderHover: infoColors[4],
		colorInfoHover: infoColors[4],
		colorInfo: infoColors[6],
		colorInfoActive: infoColors[7],
		colorInfoTextHover: infoColors[8],
		colorInfoText: infoColors[9],
		colorInfoTextActive: infoColors[10],
		colorLinkHover: linkColors[4],
		colorLink: linkColors[6],
		colorLinkActive: linkColors[7],
		...presetColorTokens,
		colorBgMask: new FastColor("#000").setA(.45).toRgbString(),
		colorWhite: "#fff"
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genRadius.js
var genRadius = (radiusBase) => {
	let radiusLG = radiusBase;
	let radiusSM = radiusBase;
	let radiusXS = radiusBase;
	let radiusOuter = radiusBase;
	if (radiusBase < 6 && radiusBase >= 5) radiusLG = radiusBase + 1;
	else if (radiusBase < 16 && radiusBase >= 6) radiusLG = radiusBase + 2;
	else if (radiusBase >= 16) radiusLG = 16;
	if (radiusBase < 7 && radiusBase >= 5) radiusSM = 4;
	else if (radiusBase < 8 && radiusBase >= 7) radiusSM = 5;
	else if (radiusBase < 14 && radiusBase >= 8) radiusSM = 6;
	else if (radiusBase < 16 && radiusBase >= 14) radiusSM = 7;
	else if (radiusBase >= 16) radiusSM = 8;
	if (radiusBase < 6 && radiusBase >= 2) radiusXS = 1;
	else if (radiusBase >= 6) radiusXS = 2;
	if (radiusBase > 4 && radiusBase < 8) radiusOuter = 4;
	else if (radiusBase >= 8) radiusOuter = 6;
	return {
		borderRadius: radiusBase,
		borderRadiusXS: radiusXS,
		borderRadiusSM: radiusSM,
		borderRadiusLG: radiusLG,
		borderRadiusOuter: radiusOuter
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genCommonMapToken.js
function genCommonMapToken(token) {
	const { motionUnit, motionBase, borderRadius, lineWidth } = token;
	return {
		motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
		motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
		motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
		lineWidthBold: lineWidth + 1,
		...genRadius(borderRadius)
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genControlHeight.js
var genControlHeight = (token) => {
	const { controlHeight } = token;
	return {
		controlHeightSM: controlHeight * .75,
		controlHeightXS: controlHeight * .5,
		controlHeightLG: controlHeight * 1.25
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genFontMapToken.js
var genFontMapToken = (fontSize) => {
	const fontSizePairs = getFontSizes(fontSize);
	const fontSizes = fontSizePairs.map((pair) => pair.size);
	const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
	const fontSizeMD = fontSizes[1];
	const fontSizeSM = fontSizes[0];
	const fontSizeLG = fontSizes[2];
	const lineHeight = lineHeights[1];
	const lineHeightSM = lineHeights[0];
	const lineHeightLG = lineHeights[2];
	return {
		fontSizeSM,
		fontSize: fontSizeMD,
		fontSizeLG,
		fontSizeXL: fontSizes[3],
		fontSizeHeading1: fontSizes[6],
		fontSizeHeading2: fontSizes[5],
		fontSizeHeading3: fontSizes[4],
		fontSizeHeading4: fontSizes[3],
		fontSizeHeading5: fontSizes[2],
		lineHeight,
		lineHeightLG,
		lineHeightSM,
		fontHeight: Math.round(lineHeight * fontSizeMD),
		fontHeightLG: Math.round(lineHeightLG * fontSizeLG),
		fontHeightSM: Math.round(lineHeightSM * fontSizeSM),
		lineHeightHeading1: lineHeights[6],
		lineHeightHeading2: lineHeights[5],
		lineHeightHeading3: lineHeights[4],
		lineHeightHeading4: lineHeights[3],
		lineHeightHeading5: lineHeights[2]
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genSizeMapToken.js
function genSizeMapToken(token) {
	const { sizeUnit, sizeStep } = token;
	return {
		sizeXXL: sizeUnit * (sizeStep + 8),
		sizeXL: sizeUnit * (sizeStep + 4),
		sizeLG: sizeUnit * (sizeStep + 2),
		sizeMD: sizeUnit * (sizeStep + 1),
		sizeMS: sizeUnit * sizeStep,
		size: sizeUnit * sizeStep,
		sizeSM: sizeUnit * (sizeStep - 1),
		sizeXS: sizeUnit * (sizeStep - 2),
		sizeXXS: sizeUnit * (sizeStep - 3)
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/default/colorAlgorithm.js
var getAlphaColor$1 = (baseColor, alpha) => new FastColor(baseColor).setA(alpha).toRgbString();
var getSolidColor = (baseColor, brightness) => {
	return new FastColor(baseColor).darken(brightness).toHexString();
};
//#endregion
//#region node_modules/antd/es/theme/themes/default/colors.js
var generateColorPalettes = (baseColor) => {
	const colors = generate(baseColor);
	return {
		1: colors[0],
		2: colors[1],
		3: colors[2],
		4: colors[3],
		5: colors[4],
		6: colors[5],
		7: colors[6],
		8: colors[4],
		9: colors[5],
		10: colors[6]
	};
};
var generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
	const colorBgBase = bgBaseColor || "#fff";
	const colorTextBase = textBaseColor || "#000";
	return {
		colorBgBase,
		colorTextBase,
		colorText: getAlphaColor$1(colorTextBase, .88),
		colorTextSecondary: getAlphaColor$1(colorTextBase, .65),
		colorTextTertiary: getAlphaColor$1(colorTextBase, .45),
		colorTextQuaternary: getAlphaColor$1(colorTextBase, .25),
		colorFill: getAlphaColor$1(colorTextBase, .15),
		colorFillSecondary: getAlphaColor$1(colorTextBase, .06),
		colorFillTertiary: getAlphaColor$1(colorTextBase, .04),
		colorFillQuaternary: getAlphaColor$1(colorTextBase, .02),
		colorBgSolid: getAlphaColor$1(colorTextBase, 1),
		colorBgSolidHover: getAlphaColor$1(colorTextBase, .75),
		colorBgSolidActive: getAlphaColor$1(colorTextBase, .95),
		colorBgLayout: getSolidColor(colorBgBase, 4),
		colorBgContainer: getSolidColor(colorBgBase, 0),
		colorBgElevated: getSolidColor(colorBgBase, 0),
		colorBgSpotlight: getAlphaColor$1(colorTextBase, .85),
		colorBgBlur: "transparent",
		colorBorder: getSolidColor(colorBgBase, 15),
		colorBorderDisabled: getSolidColor(colorBgBase, 15),
		colorBorderSecondary: getSolidColor(colorBgBase, 6)
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/default/index.js
function derivative(token) {
	presetPrimaryColors.pink = presetPrimaryColors.magenta;
	presetPalettes.pink = presetPalettes.magenta;
	const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
		const colors = token[colorKey] === presetPrimaryColors[colorKey] ? presetPalettes[colorKey] : generate(token[colorKey]);
		return Array.from({ length: 10 }, () => 1).reduce((prev, _, i) => {
			prev[`${colorKey}-${i + 1}`] = colors[i];
			prev[`${colorKey}${i + 1}`] = colors[i];
			return prev;
		}, {});
	}).reduce((prev, cur) => {
		prev = {
			...prev,
			...cur
		};
		return prev;
	}, {});
	return {
		...token,
		...colorPalettes,
		...genColorMapToken(token, {
			generateColorPalettes,
			generateNeutralColorPalettes
		}),
		...genFontMapToken(token.fontSize),
		...genSizeMapToken(token),
		...genControlHeight(token),
		...genCommonMapToken(token)
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/default/theme.js
var defaultTheme = createTheme(derivative);
//#endregion
//#region node_modules/antd/es/theme/context.js
var defaultConfig = {
	token: seedToken,
	override: { override: seedToken },
	hashed: true
};
var DesignTokenContext = /* @__PURE__ */ import_react.createContext(defaultConfig);
//#endregion
//#region node_modules/antd/es/theme/util/getAlphaColor.js
function isStableColor(color) {
	return color >= 0 && color <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
	const { r: fR, g: fG, b: fB, a: originAlpha } = new FastColor(frontColor).toRgb();
	if (originAlpha < 1) return frontColor;
	const { r: bR, g: bG, b: bB } = new FastColor(backgroundColor).toRgb();
	for (let fA = .01; fA <= 1; fA += .01) {
		const r = Math.round((fR - bR * (1 - fA)) / fA);
		const g = Math.round((fG - bG * (1 - fA)) / fA);
		const b = Math.round((fB - bB * (1 - fA)) / fA);
		if (isStableColor(r) && isStableColor(g) && isStableColor(b)) return new FastColor({
			r,
			g,
			b,
			a: Math.round(fA * 100) / 100
		}).toRgbString();
	}
	/* istanbul ignore next */
	return new FastColor({
		r: fR,
		g: fG,
		b: fB,
		a: 1
	}).toRgbString();
}
//#endregion
//#region node_modules/antd/es/theme/util/alias.js
/**
* Seed (designer) > Derivative (designer) > Alias (developer).
*
* Merge seed & derivative & override token and generate alias token for developer.
*/
function formatToken(derivativeToken) {
	const { override, ...restToken } = derivativeToken;
	const overrideTokens = { ...override };
	Object.keys(seedToken).forEach((token) => {
		delete overrideTokens[token];
	});
	const mergedToken = {
		...restToken,
		...overrideTokens
	};
	const screenXS = 480;
	const screenSM = 576;
	const screenMD = 768;
	const screenLG = 992;
	const screenXL = 1200;
	const screenXXL = 1600;
	const screenXXXL = 1920;
	if (mergedToken.motion === false) {
		const fastDuration = "0s";
		mergedToken.motionDurationFast = fastDuration;
		mergedToken.motionDurationMid = fastDuration;
		mergedToken.motionDurationSlow = fastDuration;
	}
	return {
		...mergedToken,
		colorFillContent: mergedToken.colorFillSecondary,
		colorFillContentHover: mergedToken.colorFill,
		colorFillAlter: mergedToken.colorFillQuaternary,
		colorBgContainerDisabled: mergedToken.colorFillTertiary,
		colorBorderBg: mergedToken.colorBgContainer,
		colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
		colorTextPlaceholder: mergedToken.colorTextQuaternary,
		colorTextDisabled: mergedToken.colorTextQuaternary,
		colorTextHeading: mergedToken.colorText,
		colorTextLabel: mergedToken.colorTextSecondary,
		colorTextDescription: mergedToken.colorTextTertiary,
		colorTextLightSolid: mergedToken.colorWhite,
		colorHighlight: mergedToken.colorError,
		colorBgTextHover: mergedToken.colorFillSecondary,
		colorBgTextActive: mergedToken.colorFill,
		colorIcon: mergedToken.colorTextTertiary,
		colorIconHover: mergedToken.colorText,
		colorErrorOutline: getAlphaColor(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
		colorWarningOutline: getAlphaColor(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
		fontSizeIcon: mergedToken.fontSizeSM,
		lineWidthFocus: mergedToken.lineWidth * 3,
		lineWidth: mergedToken.lineWidth,
		controlOutlineWidth: mergedToken.lineWidth * 2,
		controlInteractiveSize: mergedToken.controlHeight / 2,
		controlItemBgHover: mergedToken.colorFillTertiary,
		controlItemBgActive: mergedToken.colorPrimaryBg,
		controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
		controlItemBgActiveDisabled: mergedToken.colorFill,
		controlTmpOutline: mergedToken.colorFillQuaternary,
		controlOutline: getAlphaColor(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
		lineType: mergedToken.lineType,
		borderRadius: mergedToken.borderRadius,
		borderRadiusXS: mergedToken.borderRadiusXS,
		borderRadiusSM: mergedToken.borderRadiusSM,
		borderRadiusLG: mergedToken.borderRadiusLG,
		fontWeightStrong: 600,
		opacityLoading: .65,
		linkDecoration: "none",
		linkHoverDecoration: "none",
		linkFocusDecoration: "none",
		controlPaddingHorizontal: 12,
		controlPaddingHorizontalSM: 8,
		paddingXXS: mergedToken.sizeXXS,
		paddingXS: mergedToken.sizeXS,
		paddingSM: mergedToken.sizeSM,
		padding: mergedToken.size,
		paddingMD: mergedToken.sizeMD,
		paddingLG: mergedToken.sizeLG,
		paddingXL: mergedToken.sizeXL,
		paddingContentHorizontalLG: mergedToken.sizeLG,
		paddingContentVerticalLG: mergedToken.sizeMS,
		paddingContentHorizontal: mergedToken.sizeMS,
		paddingContentVertical: mergedToken.sizeSM,
		paddingContentHorizontalSM: mergedToken.size,
		paddingContentVerticalSM: mergedToken.sizeXS,
		marginXXS: mergedToken.sizeXXS,
		marginXS: mergedToken.sizeXS,
		marginSM: mergedToken.sizeSM,
		margin: mergedToken.size,
		marginMD: mergedToken.sizeMD,
		marginLG: mergedToken.sizeLG,
		marginXL: mergedToken.sizeXL,
		marginXXL: mergedToken.sizeXXL,
		boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
		screenXS,
		screenXSMin: screenXS,
		screenXSMax: screenSM - 1,
		screenSM,
		screenSMMin: screenSM,
		screenSMMax: screenMD - 1,
		screenMD,
		screenMDMin: screenMD,
		screenMDMax: screenLG - 1,
		screenLG,
		screenLGMin: screenLG,
		screenLGMax: screenXL - 1,
		screenXL,
		screenXLMin: screenXL,
		screenXLMax: screenXXL - 1,
		screenXXL,
		screenXXLMin: screenXXL,
		screenXXLMax: screenXXXL - 1,
		screenXXXL,
		screenXXXLMin: screenXXXL,
		boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
		boxShadowCard: `
      0 1px 2px -2px ${new FastColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new FastColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new FastColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
		boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
		boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
		boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
		boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)",
		...overrideTokens
	};
}
//#endregion
//#region node_modules/antd/es/theme/useToken.js
var unitless = {
	lineHeight: true,
	lineHeightSM: true,
	lineHeightLG: true,
	lineHeightHeading1: true,
	lineHeightHeading2: true,
	lineHeightHeading3: true,
	lineHeightHeading4: true,
	lineHeightHeading5: true,
	opacityLoading: true,
	fontWeightStrong: true,
	zIndexPopupBase: true,
	zIndexBase: true,
	opacityImage: true
};
var ignore = {
	motionBase: true,
	motionUnit: true
};
var preserve = {
	screenXS: true,
	screenXSMin: true,
	screenXSMax: true,
	screenSM: true,
	screenSMMin: true,
	screenSMMax: true,
	screenMD: true,
	screenMDMin: true,
	screenMDMax: true,
	screenLG: true,
	screenLGMin: true,
	screenLGMax: true,
	screenXL: true,
	screenXLMin: true,
	screenXLMax: true,
	screenXXL: true,
	screenXXLMin: true,
	screenXXLMax: true,
	screenXXXL: true,
	screenXXXLMin: true
};
var getComputedToken = (originToken, overrideToken, theme) => {
	const derivativeToken = theme.getDerivativeToken(originToken);
	const { override, ...components } = overrideToken;
	let mergedDerivativeToken = {
		...derivativeToken,
		override
	};
	mergedDerivativeToken = formatToken(mergedDerivativeToken);
	if (components) Object.entries(components).forEach(([key, value]) => {
		const { theme: componentTheme, ...componentTokens } = value;
		let mergedComponentToken = componentTokens;
		if (componentTheme) mergedComponentToken = getComputedToken({
			...mergedDerivativeToken,
			...componentTokens
		}, { override: componentTokens }, componentTheme);
		mergedDerivativeToken[key] = mergedComponentToken;
	});
	return mergedDerivativeToken;
};
function useToken() {
	const { token: rootDesignToken, hashed, theme, override, cssVar: ctxCssVar, zeroRuntime } = import_react.useContext(DesignTokenContext);
	const { csp } = import_react.useContext(ConfigContext);
	const cssVar = {
		prefix: ctxCssVar?.prefix ?? "ant",
		key: ctxCssVar?.key ?? "css-var-root"
	};
	const salt = `${version_default}-${hashed || ""}`;
	const mergedTheme = theme || defaultTheme;
	const [token, hashId, realToken] = useCacheToken(mergedTheme, [seedToken, rootDesignToken], {
		salt,
		override,
		getComputedToken,
		cssVar: {
			...cssVar,
			unitless,
			ignore,
			preserve
		},
		nonce: csp?.nonce
	});
	return [
		mergedTheme,
		realToken,
		hashed ? hashId : "",
		token,
		cssVar,
		!!zeroRuntime
	];
}
//#endregion
//#region node_modules/antd/es/style/index.js
var textEllipsis = {
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
};
var resetComponent = (token, needInheritFontFamily = false) => ({
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
	color: token.colorText,
	fontSize: token.fontSize,
	lineHeight: token.lineHeight,
	listStyle: "none",
	fontFamily: needInheritFontFamily ? "inherit" : token.fontFamily
});
var resetIcon = () => ({
	display: "inline-flex",
	alignItems: "center",
	color: "inherit",
	fontStyle: "normal",
	lineHeight: 0,
	textAlign: "center",
	textTransform: "none",
	verticalAlign: "-0.125em",
	textRendering: "optimizeLegibility",
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale",
	"> *": { lineHeight: 1 },
	svg: { display: "inline-block" }
});
var clearFix = () => ({
	"&::before": {
		display: "table",
		content: "\"\""
	},
	"&::after": {
		display: "table",
		clear: "both",
		content: "\"\""
	}
});
var genFocusOutline = (token, offset) => ({
	outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`,
	outlineOffset: offset ?? 1,
	transition: [`outline-offset`, `outline`].map((prop) => `${prop} 0s`).join(", ")
});
var genFocusStyle = (token, offset) => ({ "&:focus-visible": genFocusOutline(token, offset) });
var genLinkStyle = (token) => ({ a: {
	color: token.colorLink,
	textDecoration: token.linkDecoration,
	backgroundColor: "transparent",
	outline: "none",
	cursor: "pointer",
	transition: `color ${token.motionDurationSlow}`,
	"-webkit-text-decoration-skip": "objects",
	"&:hover": { color: token.colorLinkHover },
	"&:active": { color: token.colorLinkActive },
	"&:active, &:hover": {
		textDecoration: token.linkHoverDecoration,
		outline: 0
	},
	"&:focus": {
		textDecoration: token.linkFocusDecoration,
		outline: 0
	},
	...genFocusStyle(token),
	"&[disabled]": {
		color: token.colorTextDisabled,
		cursor: "not-allowed"
	}
} });
var genCommonStyle = (token, componentPrefixCls, rootCls, resetFont) => {
	const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
	const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
	const resetStyle = {
		boxSizing: "border-box",
		"&::before, &::after": { boxSizing: "border-box" }
	};
	let resetFontStyle = {};
	if (resetFont !== false) resetFontStyle = {
		fontFamily: token.fontFamily,
		fontSize: token.fontSize
	};
	return { [rootPrefixSelector]: {
		...resetFontStyle,
		...resetStyle,
		[prefixSelector]: resetStyle
	} };
};
var genIconStyle$1 = (iconPrefixCls) => ({ [`.${iconPrefixCls}`]: {
	...resetIcon(),
	[`.${iconPrefixCls} .${iconPrefixCls}-icon`]: { display: "block" }
} });
//#endregion
//#region node_modules/antd/es/theme/util/genStyleUtils.js
var { genStyleHooks, genComponentStyleHook, genSubStyleComponent } = genStyleUtils({
	usePrefix: () => {
		const { getPrefixCls, iconPrefixCls } = (0, import_react.useContext)(ConfigContext);
		return {
			rootPrefixCls: getPrefixCls(),
			iconPrefixCls
		};
	},
	useToken: () => {
		const [theme, realToken, hashId, token, cssVar, zeroRuntime] = useToken();
		return {
			theme,
			realToken,
			hashId,
			token,
			cssVar,
			zeroRuntime
		};
	},
	useCSP: () => {
		const { csp } = (0, import_react.useContext)(ConfigContext);
		return csp ?? {};
	},
	getResetStyles: (token, config) => {
		const linkStyle = genLinkStyle(token);
		return [
			linkStyle,
			{ "&": linkStyle },
			genIconStyle$1(config?.prefix.iconPrefixCls ?? "anticon")
		];
	},
	getCommonStyle: genCommonStyle,
	getCompUnitless: () => unitless
});
var genCssVar = (antCls, component) => {
	const cssPrefix = `--${antCls.replace(/\./g, "")}-${component}-`;
	const varName = (name) => {
		return `${cssPrefix}${name}`;
	};
	const varRef = (name, fallback) => {
		return fallback ? `var(${cssPrefix}${name}, ${fallback})` : `var(${cssPrefix}${name})`;
	};
	return [varName, varRef];
};
//#endregion
//#region node_modules/antd/es/theme/util/genPresetColor.js
function genPresetColor(token, genCss) {
	return PresetColors.reduce((prev, colorKey) => {
		const lightColor = token[`${colorKey}1`];
		const lightBorderColor = token[`${colorKey}3`];
		const darkColor = token[`${colorKey}6`];
		const textColor = token[`${colorKey}7`];
		return {
			...prev,
			...genCss(colorKey, {
				lightColor,
				lightBorderColor,
				darkColor,
				textColor
			})
		};
	}, {});
}
//#endregion
//#region node_modules/antd/es/theme/util/useResetIconStyle.js
var useResetIconStyle = (iconPrefixCls, csp) => {
	const [theme, token] = useToken();
	return useStyleRegister({
		theme,
		token,
		hashId: "",
		path: ["ant-design-icons", iconPrefixCls],
		nonce: () => csp?.nonce,
		layer: { name: "antd" }
	}, () => genIconStyle$1(iconPrefixCls));
};
//#endregion
//#region node_modules/antd/es/time-picker/locale/en_US.js
var locale$1 = {
	placeholder: "Select time",
	rangePlaceholder: ["Start time", "End time"]
};
//#endregion
//#region node_modules/antd/es/date-picker/locale/en_US.js
var locale = {
	lang: {
		placeholder: "Select date",
		yearPlaceholder: "Select year",
		quarterPlaceholder: "Select quarter",
		monthPlaceholder: "Select month",
		weekPlaceholder: "Select week",
		rangePlaceholder: ["Start date", "End date"],
		rangeYearPlaceholder: ["Start year", "End year"],
		rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
		rangeMonthPlaceholder: ["Start month", "End month"],
		rangeWeekPlaceholder: ["Start week", "End week"],
		...locale$2
	},
	timePickerLocale: { ...locale$1 }
};
//#endregion
//#region node_modules/antd/es/calendar/locale/en_US.js
var en_US_default = locale;
//#endregion
//#region node_modules/antd/es/locale/en_US.js
var typeTemplate = "${label} is not a valid ${type}";
var localeValues = {
	locale: "en",
	Pagination: locale$3,
	DatePicker: locale,
	TimePicker: locale$1,
	Calendar: en_US_default,
	global: {
		placeholder: "Please select",
		close: "Close",
		sortable: "sortable"
	},
	Table: {
		filterTitle: "Filter menu",
		filterConfirm: "OK",
		filterReset: "Reset",
		filterEmptyText: "No filters",
		filterCheckAll: "Select all items",
		filterSearchPlaceholder: "Search in filters",
		emptyText: "No data",
		selectAll: "Select current page",
		selectInvert: "Invert current page",
		selectNone: "Clear all data",
		selectionAll: "Select all data",
		sortTitle: "Sort",
		expand: "Expand row",
		collapse: "Collapse row",
		triggerDesc: "Click to sort descending",
		triggerAsc: "Click to sort ascending",
		cancelSort: "Click to cancel sorting"
	},
	Tour: {
		Next: "Next",
		Previous: "Previous",
		Finish: "Finish"
	},
	Modal: {
		okText: "OK",
		cancelText: "Cancel",
		justOkText: "OK"
	},
	Popconfirm: {
		okText: "OK",
		cancelText: "Cancel"
	},
	Transfer: {
		titles: ["", ""],
		searchPlaceholder: "Search here",
		itemUnit: "item",
		itemsUnit: "items",
		remove: "Remove",
		selectCurrent: "Select current page",
		removeCurrent: "Remove current page",
		selectAll: "Select all data",
		deselectAll: "Deselect all data",
		removeAll: "Remove all data",
		selectInvert: "Invert current page"
	},
	Upload: {
		uploading: "Uploading...",
		removeFile: "Remove file",
		uploadError: "Upload error",
		previewFile: "Preview file",
		downloadFile: "Download file"
	},
	Empty: { description: "No data" },
	Icon: { icon: "icon" },
	Text: {
		edit: "Edit",
		copy: "Copy",
		copied: "Copied",
		expand: "Expand",
		collapse: "Collapse"
	},
	Form: {
		optional: "(optional)",
		defaultValidateMessages: {
			default: "Field validation error for ${label}",
			required: "Please enter ${label}",
			enum: "${label} must be one of [${enum}]",
			whitespace: "${label} cannot be a blank character",
			date: {
				format: "${label} date format is invalid",
				parse: "${label} cannot be converted to a date",
				invalid: "${label} is an invalid date"
			},
			types: {
				string: typeTemplate,
				method: typeTemplate,
				array: typeTemplate,
				object: typeTemplate,
				number: typeTemplate,
				date: typeTemplate,
				boolean: typeTemplate,
				integer: typeTemplate,
				float: typeTemplate,
				regexp: typeTemplate,
				email: typeTemplate,
				url: typeTemplate,
				hex: typeTemplate
			},
			string: {
				len: "${label} must be ${len} characters",
				min: "${label} must be at least ${min} characters",
				max: "${label} must be up to ${max} characters",
				range: "${label} must be between ${min}-${max} characters"
			},
			number: {
				len: "${label} must be equal to ${len}",
				min: "${label} must be minimum ${min}",
				max: "${label} must be maximum ${max}",
				range: "${label} must be between ${min}-${max}"
			},
			array: {
				len: "Must be ${len} ${label}",
				min: "At least ${min} ${label}",
				max: "At most ${max} ${label}",
				range: "The amount of ${label} must be between ${min}-${max}"
			},
			pattern: { mismatch: "${label} does not match the pattern ${pattern}" }
		}
	},
	QRCode: {
		expired: "QR code expired",
		refresh: "Refresh",
		scanned: "Scanned"
	},
	ColorPicker: {
		presetEmpty: "Empty",
		transparent: "Transparent",
		singleColor: "Single",
		gradientColor: "Gradient"
	}
};
//#endregion
//#region node_modules/antd/es/modal/locale.js
var runtimeLocale = { ...localeValues.Modal };
var localeList = [];
var generateLocale = () => localeList.reduce((merged, locale) => ({
	...merged,
	...locale
}), localeValues.Modal);
function changeConfirmLocale(newLocale) {
	if (newLocale) {
		const cloneLocale = { ...newLocale };
		localeList.push(cloneLocale);
		runtimeLocale = generateLocale();
		return () => {
			localeList = localeList.filter((locale) => locale !== cloneLocale);
			runtimeLocale = generateLocale();
		};
	}
	runtimeLocale = { ...localeValues.Modal };
}
function getConfirmLocale() {
	return runtimeLocale;
}
//#endregion
//#region node_modules/antd/es/locale/context.js
var LocaleContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);
//#endregion
//#region node_modules/antd/es/locale/useLocale.js
var useLocale = (componentName, defaultLocale) => {
	const fullLocale = import_react.useContext(LocaleContext);
	return [import_react.useMemo(() => {
		const locale = defaultLocale || localeValues[componentName];
		const localeFromContext = fullLocale?.[componentName] ?? {};
		return {
			...typeof locale === "function" ? locale() : locale,
			...localeFromContext || {}
		};
	}, [
		componentName,
		defaultLocale,
		fullLocale
	]), import_react.useMemo(() => {
		const localeCode = fullLocale?.locale;
		if (fullLocale?.exist && !localeCode) return localeValues.locale;
		return localeCode;
	}, [fullLocale])];
};
//#endregion
//#region node_modules/antd/es/locale/index.js
var ANT_MARK = "internalMark";
var LocaleProvider = (props) => {
	const { locale = {}, children, _ANT_MARK__ } = props;
	import_react.useEffect(() => {
		return changeConfirmLocale(locale?.Modal);
	}, [locale]);
	const getMemoizedContextValue = import_react.useMemo(() => ({
		...locale,
		exist: true
	}), [locale]);
	return /* @__PURE__ */ import_react.createElement(LocaleContext.Provider, { value: getMemoizedContextValue }, children);
};
//#endregion
//#region node_modules/antd/es/_util/extendsObject.js
function mergeProps(...items) {
	const ret = {};
	items.forEach((item) => {
		if (item) Object.keys(item).forEach((key) => {
			if (item[key] !== void 0) ret[key] = item[key];
		});
	});
	return ret;
}
//#endregion
//#region node_modules/antd/es/_util/isNonNullable.js
var isNonNullable = (val) => {
	return val !== void 0 && val !== null;
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useClosable.js
var pickClosable = (context) => {
	if (!context) return;
	const { closable, closeIcon } = context;
	return {
		closable,
		closeIcon
	};
};
var EmptyFallbackCloseCollection = {};
var computeClosableConfig = (closable, closeIcon) => {
	if (!closable && (closable === false || closeIcon === false || closeIcon === null)) return false;
	if (closable === void 0 && closeIcon === void 0) return null;
	let closableConfig = { closeIcon: typeof closeIcon !== "boolean" && closeIcon !== null ? closeIcon : void 0 };
	if (closable && typeof closable === "object") closableConfig = {
		...closableConfig,
		...closable
	};
	return closableConfig;
};
var mergeClosableConfigs = (propConfig, contextConfig, fallbackConfig) => {
	if (propConfig === false) return false;
	if (propConfig) return mergeProps(fallbackConfig, contextConfig, propConfig);
	if (contextConfig === false) return false;
	if (contextConfig) return mergeProps(fallbackConfig, contextConfig);
	return fallbackConfig.closable ? fallbackConfig : false;
};
var computeCloseIcon = (mergedConfig, fallbackCloseCollection, closeLabel) => {
	const { closeIconRender } = fallbackCloseCollection;
	const { closeIcon, ...restConfig } = mergedConfig;
	let finalCloseIcon = closeIcon;
	const ariaOrDataProps = pickAttrs(restConfig, true);
	if (isNonNullable(finalCloseIcon)) {
		if (closeIconRender) finalCloseIcon = closeIconRender(finalCloseIcon);
		finalCloseIcon = /* @__PURE__ */ import_react.isValidElement(finalCloseIcon) ? /* @__PURE__ */ import_react.cloneElement(finalCloseIcon, {
			"aria-label": closeLabel,
			...finalCloseIcon.props,
			...ariaOrDataProps
		}) : /* @__PURE__ */ import_react.createElement("span", {
			"aria-label": closeLabel,
			...ariaOrDataProps
		}, finalCloseIcon);
	}
	return [finalCloseIcon, ariaOrDataProps];
};
var computeClosable = (propCloseCollection, contextCloseCollection, fallbackCloseCollection = EmptyFallbackCloseCollection, closeLabel = "Close") => {
	const propConfig = computeClosableConfig(propCloseCollection?.closable, propCloseCollection?.closeIcon);
	const contextConfig = computeClosableConfig(contextCloseCollection?.closable, contextCloseCollection?.closeIcon);
	const mergedFallback = {
		closeIcon: /* @__PURE__ */ import_react.createElement(RefIcon, null),
		...fallbackCloseCollection
	};
	const mergedConfig = mergeClosableConfigs(propConfig, contextConfig, mergedFallback);
	const closeBtnIsDisabled = typeof mergedConfig !== "boolean" ? !!mergedConfig?.disabled : false;
	if (mergedConfig === false) return [
		false,
		null,
		closeBtnIsDisabled,
		{}
	];
	const [closeIcon, ariaProps] = computeCloseIcon(mergedConfig, mergedFallback, closeLabel);
	return [
		true,
		closeIcon,
		closeBtnIsDisabled,
		ariaProps
	];
};
var useClosable = (propCloseCollection, contextCloseCollection, fallbackCloseCollection = EmptyFallbackCloseCollection) => {
	const [contextLocale] = useLocale("global", localeValues.global);
	return import_react.useMemo(() => {
		return computeClosable(propCloseCollection, contextCloseCollection, {
			closeIcon: /* @__PURE__ */ import_react.createElement(RefIcon, null),
			...fallbackCloseCollection
		}, contextLocale.close);
	}, [
		propCloseCollection,
		contextCloseCollection,
		fallbackCloseCollection,
		contextLocale.close
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useForceUpdate.js
var useForceUpdate = () => {
	return import_react.useReducer((ori) => ori + 1, 0);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useMergedMask.js
var normalizeMaskConfig = (mask, maskClosable) => {
	let maskConfig = {};
	if (mask && typeof mask === "object") maskConfig = mask;
	if (typeof mask === "boolean") maskConfig = { enabled: mask };
	if (maskConfig.closable === void 0 && maskClosable !== void 0) maskConfig.closable = maskClosable;
	return maskConfig;
};
var useMergedMask = (mask, contextMask, prefixCls, maskClosable) => {
	return (0, import_react.useMemo)(() => {
		const maskConfig = normalizeMaskConfig(mask, maskClosable);
		const contextMaskConfig = normalizeMaskConfig(contextMask);
		const mergedConfig = {
			blur: false,
			...contextMaskConfig,
			...maskConfig,
			closable: maskConfig.closable ?? maskClosable ?? contextMaskConfig.closable ?? true
		};
		const className = mergedConfig.blur ? `${prefixCls}-mask-blur` : void 0;
		return [
			mergedConfig.enabled !== false,
			{ mask: className },
			!!mergedConfig.closable
		];
	}, [
		mask,
		contextMask,
		prefixCls,
		maskClosable
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useMergeSemantic.js
var mergeClassNames = (schema, ...classNames) => {
	const mergedSchema = schema || {};
	return classNames.filter(Boolean).reduce((acc, cur) => {
		Object.keys(cur || {}).forEach((key) => {
			const keySchema = mergedSchema[key];
			const curVal = cur[key];
			if (keySchema && typeof keySchema === "object") if (curVal && typeof curVal === "object") acc[key] = mergeClassNames(keySchema, acc[key], curVal);
			else {
				const { _default: defaultField } = keySchema;
				if (defaultField) {
					acc[key] = acc[key] || {};
					acc[key][defaultField] = clsx(acc[key][defaultField], curVal);
				}
			}
			else acc[key] = clsx(acc[key], curVal);
		});
		return acc;
	}, {});
};
var useSemanticClassNames = (schema, ...classNames) => {
	return import_react.useMemo(() => mergeClassNames.apply(void 0, [schema].concat(classNames)), [schema].concat(classNames));
};
var mergeStyles = (...styles) => {
	return styles.filter(Boolean).reduce((acc, cur = {}) => {
		Object.keys(cur).forEach((key) => {
			acc[key] = {
				...acc[key],
				...cur[key]
			};
		});
		return acc;
	}, {});
};
var useSemanticStyles = (...styles) => {
	return import_react.useMemo(() => mergeStyles.apply(void 0, styles), [].concat(styles));
};
var fillObjectBySchema = (obj, schema) => {
	const newObj = { ...obj };
	Object.keys(schema).forEach((key) => {
		if (key !== "_default") {
			const nestSchema = schema[key];
			const nextValue = newObj[key] || {};
			newObj[key] = nestSchema ? fillObjectBySchema(nextValue, nestSchema) : nextValue;
		}
	});
	return newObj;
};
var resolveStyleOrClass = (value, info) => {
	return typeof value === "function" ? value(info) : value;
};
/**
* @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
* @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
*/
var useMergeSemantic = (classNamesList, stylesList, info, schema) => {
	const resolvedClassNamesList = classNamesList.map((classNames) => classNames ? resolveStyleOrClass(classNames, info) : void 0);
	const resolvedStylesList = stylesList.map((styles) => styles ? resolveStyleOrClass(styles, info) : void 0);
	const mergedClassNames = useSemanticClassNames.apply(void 0, [schema].concat(_toConsumableArray(resolvedClassNamesList)));
	const mergedStyles = useSemanticStyles.apply(void 0, _toConsumableArray(resolvedStylesList));
	return import_react.useMemo(() => {
		if (!schema) return [mergedClassNames, mergedStyles];
		return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles, schema)];
	}, [
		mergedClassNames,
		mergedStyles,
		schema
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useOrientation.js
var isValidOrientation = (orientation) => {
	return orientation === "horizontal" || orientation === "vertical";
};
var useOrientation = (orientation, vertical, legacyDirection) => {
	return (0, import_react.useMemo)(() => {
		const validOrientation = isValidOrientation(orientation);
		let mergedOrientation;
		if (validOrientation) mergedOrientation = orientation;
		else if (typeof vertical === "boolean") mergedOrientation = vertical ? "vertical" : "horizontal";
		else mergedOrientation = isValidOrientation(legacyDirection) ? legacyDirection : "horizontal";
		return [mergedOrientation, mergedOrientation === "vertical"];
	}, [
		legacyDirection,
		orientation,
		vertical
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/usePatchElement.js
var usePatchElement = () => {
	const [elements, setElements] = import_react.useState([]);
	return [elements, import_react.useCallback((element) => {
		setElements((originElements) => [].concat(_toConsumableArray(originElements), [element]));
		return () => {
			setElements((originElements) => originElements.filter((ele) => ele !== element));
		};
	}, [])];
};
//#endregion
//#region node_modules/antd/es/_util/zindexContext.js
var ZIndexContext = /* @__PURE__ */ import_react.createContext(void 0);
//#endregion
//#region node_modules/antd/es/_util/hooks/useZIndex.js
var CONTAINER_OFFSET = 100;
var CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * 10;
CONTAINER_MAX_OFFSET + CONTAINER_OFFSET;
var containerBaseZIndexOffset = {
	Modal: CONTAINER_OFFSET,
	Drawer: CONTAINER_OFFSET,
	Popover: CONTAINER_OFFSET,
	Popconfirm: CONTAINER_OFFSET,
	Tooltip: CONTAINER_OFFSET,
	Tour: CONTAINER_OFFSET,
	FloatButton: CONTAINER_OFFSET
};
var consumerBaseZIndexOffset = {
	SelectLike: 50,
	Dropdown: 50,
	DatePicker: 50,
	Menu: 50,
	ImagePreview: 1
};
var isContainerType = (type) => {
	return type in containerBaseZIndexOffset;
};
var useZIndex = (componentType, customZIndex) => {
	const [, token] = useToken();
	const parentZIndex = import_react.useContext(ZIndexContext);
	const isContainer = isContainerType(componentType);
	let result;
	if (customZIndex !== void 0) result = [customZIndex, customZIndex];
	else {
		let zIndex = parentZIndex ?? 0;
		if (isContainer) zIndex += (parentZIndex ? 0 : token.zIndexPopupBase) + containerBaseZIndexOffset[componentType];
		else zIndex += consumerBaseZIndexOffset[componentType];
		result = [parentZIndex === void 0 ? customZIndex : zIndex, zIndex];
	}
	return result;
};
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useCSSVarCls.js
/**
* This hook is only for cssVar to add root className for components.
* If root ClassName is needed, this hook could be refactored with `-root`
* @param prefixCls
*/
var useCSSVarCls = (prefixCls) => `${prefixCls}-css-var`;
//#endregion
//#region node_modules/antd/es/form/validateMessagesContext.js
var validateMessagesContext_default = /* @__PURE__ */ (0, import_react.createContext)(void 0);
//#endregion
//#region node_modules/antd/es/tooltip/UniqueProvider/MotionContent.js
var MotionContent = ({ children }) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const rootPrefixCls = getPrefixCls();
	/* istanbul ignore next */
	if (!/* @__PURE__ */ import_react.isValidElement(children)) return children;
	return /* @__PURE__ */ import_react.createElement(es_default, {
		visible: true,
		motionName: `${rootPrefixCls}-fade`,
		motionAppear: true,
		motionEnter: true,
		motionLeave: false,
		removeOnLeave: false
	}, ({ style: motionStyle, className: motionClassName }) => {
		return cloneElement(children, (oriProps) => ({
			className: clsx(oriProps.className, motionClassName),
			style: {
				...oriProps.style,
				...motionStyle
			}
		}));
	});
};
//#endregion
//#region node_modules/antd/es/tooltip/UniqueProvider/index.js
var cachedPlacements = [null, null];
function uniqueBuiltinPlacements(ori) {
	if (cachedPlacements[0] !== ori) {
		const target = {};
		Object.keys(ori).forEach((placement) => {
			target[placement] = {
				...ori[placement],
				dynamicInset: false
			};
		});
		cachedPlacements[0] = ori;
		cachedPlacements[1] = target;
	}
	return cachedPlacements[1];
}
var UniqueProvider = ({ children }) => {
	const renderPopup = (options) => {
		const { id, builtinPlacements, popup } = options;
		const popupEle = typeof popup === "function" ? popup() : popup;
		const parsedPlacements = uniqueBuiltinPlacements(builtinPlacements);
		return {
			...options,
			getPopupContainer: null,
			arrow: false,
			popup: /* @__PURE__ */ import_react.createElement(MotionContent, { key: id }, popupEle),
			builtinPlacements: parsedPlacements
		};
	};
	return /* @__PURE__ */ import_react.createElement(UniqueProvider$1, { postTriggerProps: renderPopup }, children);
};
//#endregion
//#region node_modules/antd/es/config-provider/DisabledContext.js
var DisabledContext = /* @__PURE__ */ import_react.createContext(false);
var DisabledContextProvider = ({ children, disabled }) => {
	const originDisabled = import_react.useContext(DisabledContext);
	return /* @__PURE__ */ import_react.createElement(DisabledContext.Provider, { value: disabled ?? originDisabled }, children);
};
//#endregion
//#region node_modules/antd/es/config-provider/SizeContext.js
var SizeContext = /* @__PURE__ */ import_react.createContext(void 0);
var SizeContextProvider = ({ children, size }) => {
	const originSize = import_react.useContext(SizeContext);
	return /* @__PURE__ */ import_react.createElement(SizeContext.Provider, { value: size || originSize }, children);
};
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useConfig.js
function useConfig() {
	return {
		componentDisabled: (0, import_react.useContext)(DisabledContext),
		componentSize: (0, import_react.useContext)(SizeContext)
	};
}
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useTheme.js
function useTheme(theme, parentTheme, config) {
	devUseWarning("ConfigProvider");
	const themeConfig = theme || {};
	const parentThemeConfig = themeConfig.inherit === false || !parentTheme ? {
		...defaultConfig,
		hashed: parentTheme?.hashed ?? defaultConfig.hashed,
		cssVar: parentTheme?.cssVar
	} : parentTheme;
	const themeKey = (0, import_react.useId)();
	return useMemo$12(() => {
		if (!theme) return parentTheme;
		const mergedComponents = { ...parentThemeConfig.components };
		Object.keys(theme.components || {}).forEach((componentName) => {
			mergedComponents[componentName] = {
				...mergedComponents[componentName],
				...theme.components[componentName]
			};
		});
		const cssVarKey = `css-var-${themeKey.replace(/:/g, "")}`;
		const mergedCssVar = {
			prefix: config?.prefixCls,
			...parentThemeConfig.cssVar,
			...themeConfig.cssVar,
			key: themeConfig.cssVar?.key || cssVarKey
		};
		return {
			...parentThemeConfig,
			...themeConfig,
			token: {
				...parentThemeConfig.token,
				...themeConfig.token
			},
			components: mergedComponents,
			cssVar: mergedCssVar
		};
	}, [themeConfig, parentThemeConfig], (prev, next) => prev.some((prevTheme, index) => {
		const nextTheme = next[index];
		return !isEqual(prevTheme, nextTheme, true);
	}));
}
//#endregion
//#region node_modules/antd/es/config-provider/MotionWrapper.js
var MotionCacheContext = /* @__PURE__ */ import_react.createContext(true);
function MotionWrapper(props) {
	const parentMotion = import_react.useContext(MotionCacheContext);
	const { children } = props;
	const [, token] = useToken();
	const { motion } = token;
	const needWrapMotionProviderRef = import_react.useRef(false);
	needWrapMotionProviderRef.current || (needWrapMotionProviderRef.current = parentMotion !== motion);
	if (needWrapMotionProviderRef.current) return /* @__PURE__ */ import_react.createElement(MotionCacheContext.Provider, { value: motion }, /* @__PURE__ */ import_react.createElement(MotionProvider, { motion }, children));
	return children;
}
//#endregion
//#region node_modules/antd/es/config-provider/PropWarning.js
var PropWarning_default = () => null;
//#endregion
//#region node_modules/antd/es/config-provider/index.js
/**
* This component registers icon styles inside the DesignTokenContext.Provider
* so that CSS variables use the correct cssVar key from the theme config.
*/
var IconStyle = ({ iconPrefixCls, csp }) => {
	useResetIconStyle(iconPrefixCls, csp);
	return null;
};
var PASSED_PROPS = [
	"getTargetContainer",
	"getPopupContainer",
	"renderEmpty",
	"input",
	"pagination",
	"form",
	"select",
	"button"
];
var globalPrefixCls;
var globalIconPrefixCls;
var globalTheme;
var globalHolderRender;
function getGlobalPrefixCls() {
	return globalPrefixCls || "ant";
}
function getGlobalIconPrefixCls() {
	return globalIconPrefixCls || "anticon";
}
var setGlobalConfig = (props) => {
	const { prefixCls, iconPrefixCls, theme, holderRender } = props;
	if (prefixCls !== void 0) globalPrefixCls = prefixCls;
	if (iconPrefixCls !== void 0) globalIconPrefixCls = iconPrefixCls;
	if ("holderRender" in props) globalHolderRender = holderRender;
	if (theme) globalTheme = theme;
};
var globalConfig = () => ({
	getPrefixCls: (suffixCls, customizePrefixCls) => {
		if (customizePrefixCls) return customizePrefixCls;
		return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
	},
	getIconPrefixCls: getGlobalIconPrefixCls,
	getRootPrefixCls: () => {
		if (globalPrefixCls) return globalPrefixCls;
		return getGlobalPrefixCls();
	},
	getTheme: () => globalTheme,
	holderRender: globalHolderRender
});
var ProviderChildren = (props) => {
	const { children, csp: customCsp, autoInsertSpaceInButton, alert, affix, anchor, app, form, locale, componentSize, direction, space, splitter, virtual, dropdownMatchSelectWidth, popupMatchSelectWidth, popupOverflow, legacyLocale, parentContext, iconPrefixCls: customIconPrefixCls, theme, componentDisabled, segmented, statistic, spin, calendar, carousel, cascader, collapse, typography, checkbox, descriptions, divider, drawer, skeleton, steps, image, layout, list, mentions, modal, progress, result, slider, breadcrumb, masonry, menu, pagination, input, textArea, otp, empty, badge, radio, rate, ribbon, switch: SWITCH, transfer, avatar, message, tag, table, card, cardMeta, tabs, timeline, timePicker, upload, notification, tree, colorPicker, datePicker, rangePicker, flex, wave, dropdown, warning: warningConfig, tour, tooltip, popover, popconfirm, qrcode, floatButton, floatButtonGroup, variant, inputNumber, treeSelect, watermark } = props;
	const getPrefixCls = import_react.useCallback((suffixCls, customizePrefixCls) => {
		const { prefixCls } = props;
		if (customizePrefixCls) return customizePrefixCls;
		const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
		return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
	}, [parentContext.getPrefixCls, props.prefixCls]);
	const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || "anticon";
	const csp = customCsp || parentContext.csp;
	const mergedTheme = useTheme(theme, parentContext.theme, { prefixCls: getPrefixCls("") });
	const baseConfig = {
		csp,
		autoInsertSpaceInButton,
		alert,
		affix,
		anchor,
		app,
		locale: locale || legacyLocale,
		direction,
		space,
		splitter,
		virtual,
		popupMatchSelectWidth: popupMatchSelectWidth ?? dropdownMatchSelectWidth,
		popupOverflow,
		getPrefixCls,
		iconPrefixCls,
		theme: mergedTheme,
		segmented,
		statistic,
		spin,
		calendar,
		carousel,
		cascader,
		collapse,
		typography,
		checkbox,
		descriptions,
		divider,
		drawer,
		skeleton,
		steps,
		image,
		input,
		textArea,
		otp,
		layout,
		list,
		mentions,
		modal,
		progress,
		result,
		slider,
		breadcrumb,
		masonry,
		menu,
		pagination,
		empty,
		badge,
		radio,
		rate,
		ribbon,
		switch: SWITCH,
		transfer,
		avatar,
		message,
		tag,
		table,
		card,
		cardMeta,
		tabs,
		timeline,
		timePicker,
		upload,
		notification,
		tree,
		colorPicker,
		datePicker,
		rangePicker,
		flex,
		wave,
		dropdown,
		warning: warningConfig,
		tour,
		tooltip,
		popover,
		popconfirm,
		qrcode,
		floatButton,
		floatButtonGroup,
		variant,
		inputNumber,
		treeSelect,
		watermark
	};
	const config = { ...parentContext };
	Object.keys(baseConfig).forEach((key) => {
		if (baseConfig[key] !== void 0) config[key] = baseConfig[key];
	});
	PASSED_PROPS.forEach((propName) => {
		const propValue = props[propName];
		if (propValue) config[propName] = propValue;
	});
	if (typeof autoInsertSpaceInButton !== "undefined") config.button = {
		autoInsertSpace: autoInsertSpaceInButton,
		...config.button
	};
	const memoedConfig = useMemo$12(() => config, config, (prevConfig, currentConfig) => {
		const prevKeys = Object.keys(prevConfig);
		const currentKeys = Object.keys(currentConfig);
		return prevKeys.length !== currentKeys.length || prevKeys.some((key) => prevConfig[key] !== currentConfig[key]);
	});
	const { layer } = import_react.useContext(StyleContext);
	const memoIconContextValue = import_react.useMemo(() => ({
		prefixCls: iconPrefixCls,
		csp,
		layer: layer ? "antd" : void 0
	}), [
		iconPrefixCls,
		csp,
		layer
	]);
	let childNode = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(IconStyle, {
		iconPrefixCls,
		csp
	}), /* @__PURE__ */ import_react.createElement(PropWarning_default, { dropdownMatchSelectWidth }), children);
	const validateMessages = import_react.useMemo(() => merge(localeValues.Form?.defaultValidateMessages || {}, memoedConfig.locale?.Form?.defaultValidateMessages || {}, memoedConfig.form?.validateMessages || {}, form?.validateMessages || {}), [memoedConfig, form?.validateMessages]);
	if (Object.keys(validateMessages).length > 0) childNode = /* @__PURE__ */ import_react.createElement(validateMessagesContext_default.Provider, { value: validateMessages }, childNode);
	if (locale) childNode = /* @__PURE__ */ import_react.createElement(LocaleProvider, {
		locale,
		_ANT_MARK__: ANT_MARK
	}, childNode);
	if (iconPrefixCls || csp) childNode = /* @__PURE__ */ import_react.createElement(IconContext.Provider, { value: memoIconContextValue }, childNode);
	if (componentSize) childNode = /* @__PURE__ */ import_react.createElement(SizeContextProvider, { size: componentSize }, childNode);
	childNode = /* @__PURE__ */ import_react.createElement(MotionWrapper, null, childNode);
	if (tooltip?.unique) childNode = /* @__PURE__ */ import_react.createElement(UniqueProvider, null, childNode);
	const memoTheme = import_react.useMemo(() => {
		const { algorithm, token, components, cssVar, ...rest } = mergedTheme || {};
		const themeObj = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : defaultTheme;
		const parsedComponents = {};
		Object.entries(components || {}).forEach(([componentName, componentToken]) => {
			const parsedToken = { ...componentToken };
			if ("algorithm" in parsedToken) {
				if (parsedToken.algorithm === true) parsedToken.theme = themeObj;
				else if (Array.isArray(parsedToken.algorithm) || typeof parsedToken.algorithm === "function") parsedToken.theme = createTheme(parsedToken.algorithm);
				delete parsedToken.algorithm;
			}
			parsedComponents[componentName] = parsedToken;
		});
		const mergedToken = {
			...seedToken,
			...token
		};
		return {
			...rest,
			theme: themeObj,
			token: mergedToken,
			components: parsedComponents,
			override: {
				override: mergedToken,
				...parsedComponents
			},
			cssVar
		};
	}, [mergedTheme]);
	if (theme) childNode = /* @__PURE__ */ import_react.createElement(DesignTokenContext.Provider, { value: memoTheme }, childNode);
	if (memoedConfig.warning) childNode = /* @__PURE__ */ import_react.createElement(WarningContext.Provider, { value: memoedConfig.warning }, childNode);
	if (componentDisabled !== void 0) childNode = /* @__PURE__ */ import_react.createElement(DisabledContextProvider, { disabled: componentDisabled }, childNode);
	return /* @__PURE__ */ import_react.createElement(ConfigContext.Provider, { value: memoedConfig }, childNode);
};
var ConfigProvider = (props) => {
	const context = import_react.useContext(ConfigContext);
	const antLocale = import_react.useContext(LocaleContext);
	return /* @__PURE__ */ import_react.createElement(ProviderChildren, {
		parentContext: context,
		legacyLocale: antLocale,
		...props
	});
};
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig;
Object.defineProperty(ConfigProvider, "SizeContext", { get: () => {
	return SizeContext;
} });
//#endregion
//#region node_modules/antd/es/message/style/index.js
var genMessageStyle = (token) => {
	const { componentCls, iconCls, boxShadow, colorText, colorSuccess, colorError, colorWarning, colorInfo, fontSizeLG, motionEaseInOutCirc, motionDurationSlow, marginXS, paddingXS, borderRadiusLG, zIndexPopup, contentPadding, contentBg } = token;
	const noticeCls = `${componentCls}-notice`;
	const messageMoveIn = new Keyframe("MessageMoveIn", {
		"0%": {
			padding: 0,
			transform: "translateY(-100%)",
			opacity: 0
		},
		"100%": {
			padding: paddingXS,
			transform: "translateY(0)",
			opacity: 1
		}
	});
	const messageMoveOut = new Keyframe("MessageMoveOut", {
		"0%": {
			maxHeight: token.height,
			padding: paddingXS,
			opacity: 1
		},
		"100%": {
			maxHeight: 0,
			padding: 0,
			opacity: 0
		}
	});
	const noticeStyle = {
		padding: paddingXS,
		textAlign: "center",
		[`${componentCls}-custom-content`]: {
			display: "flex",
			alignItems: "center"
		},
		[`${componentCls}-custom-content > ${iconCls}`]: {
			marginInlineEnd: marginXS,
			fontSize: fontSizeLG
		},
		[`${noticeCls}-content`]: {
			display: "inline-block",
			padding: contentPadding,
			background: contentBg,
			borderRadius: borderRadiusLG,
			boxShadow,
			pointerEvents: "all"
		},
		[`${componentCls}-success > ${iconCls}`]: { color: colorSuccess },
		[`${componentCls}-error > ${iconCls}`]: { color: colorError },
		[`${componentCls}-warning > ${iconCls}`]: { color: colorWarning },
		[`${componentCls}-info > ${iconCls},
      ${componentCls}-loading > ${iconCls}`]: { color: colorInfo }
	};
	return [
		{ [componentCls]: {
			...resetComponent(token),
			color: colorText,
			position: "fixed",
			top: marginXS,
			width: "100%",
			pointerEvents: "none",
			zIndex: zIndexPopup,
			[`${componentCls}-move-up`]: { animationFillMode: "forwards" },
			[`
        ${componentCls}-move-up-appear,
        ${componentCls}-move-up-enter
      `]: {
				animationName: messageMoveIn,
				animationDuration: motionDurationSlow,
				animationPlayState: "paused",
				animationTimingFunction: motionEaseInOutCirc
			},
			[`
        ${componentCls}-move-up-appear${componentCls}-move-up-appear-active,
        ${componentCls}-move-up-enter${componentCls}-move-up-enter-active
      `]: { animationPlayState: "running" },
			[`${componentCls}-move-up-leave`]: {
				animationName: messageMoveOut,
				animationDuration: motionDurationSlow,
				animationPlayState: "paused",
				animationTimingFunction: motionEaseInOutCirc
			},
			[`${componentCls}-move-up-leave${componentCls}-move-up-leave-active`]: { animationPlayState: "running" },
			"&-rtl": {
				direction: "rtl",
				span: { direction: "rtl" }
			}
		} },
		{ [componentCls]: { [`${noticeCls}-wrapper`]: { ...noticeStyle } } },
		{ [`${componentCls}-notice-pure-panel`]: {
			...noticeStyle,
			padding: 0,
			textAlign: "start"
		} }
	];
};
var prepareComponentToken$28 = (token) => ({
	zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 10,
	contentBg: token.colorBgElevated,
	contentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${token.paddingSM}px`
});
var style_default$33 = genStyleHooks("Message", (token) => {
	return genMessageStyle(merge$1(token, { height: 150 }));
}, prepareComponentToken$28);
//#endregion
//#region node_modules/antd/es/message/PurePanel.js
var TypeIcon = {
	info: /* @__PURE__ */ import_react.createElement(RefIcon$1, null),
	success: /* @__PURE__ */ import_react.createElement(RefIcon$2, null),
	error: /* @__PURE__ */ import_react.createElement(RefIcon$3, null),
	warning: /* @__PURE__ */ import_react.createElement(RefIcon$4, null),
	loading: /* @__PURE__ */ import_react.createElement(RefIcon$5, null)
};
var PureContent$1 = (props) => {
	const { prefixCls, type, icon, children, classNames: pureContentClassNames, styles } = props;
	const iconNode = cloneElement(icon || type && TypeIcon[type], (currentProps) => {
		const mergedStyle = {
			...currentProps?.style,
			...styles?.icon
		};
		return {
			className: clsx(currentProps.className, pureContentClassNames?.icon),
			style: mergedStyle
		};
	});
	return /* @__PURE__ */ import_react.createElement("div", { className: clsx(`${prefixCls}-custom-content`, `${prefixCls}-${type}`) }, iconNode, /* @__PURE__ */ import_react.createElement("span", {
		className: pureContentClassNames?.content,
		style: styles?.content
	}, children));
};
/** @private Internal Component. Do not use in your production. */
var PurePanel$7 = (props) => {
	const { prefixCls: staticPrefixCls, className, style, type, icon, content, classNames: messageClassNames, styles, ...restProps } = props;
	const { getPrefixCls, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("message");
	const prefixCls = staticPrefixCls || getPrefixCls("message");
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$33(prefixCls, rootCls);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, messageClassNames], [contextStyles, styles], { props });
	return /* @__PURE__ */ import_react.createElement(Notify, {
		...restProps,
		prefixCls,
		className: clsx(contextClassName, mergedClassNames.root, className, hashId, `${prefixCls}-notice-pure-panel`, cssVarCls, rootCls),
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		eventKey: "pure",
		duration: null,
		content: /* @__PURE__ */ import_react.createElement(PureContent$1, {
			prefixCls,
			type,
			icon,
			classNames: mergedClassNames,
			styles: mergedStyles
		}, content)
	});
};
//#endregion
//#region node_modules/antd/es/message/util.js
function getMotion$1(prefixCls, transitionName) {
	return { motionName: transitionName ?? `${prefixCls}-move-up` };
}
/** Wrap message open with promise like function */
function wrapPromiseFn(openFn) {
	let closeFn;
	const closePromise = new Promise((resolve) => {
		closeFn = openFn(() => {
			resolve(true);
		});
	});
	const result = () => {
		closeFn?.();
	};
	result.then = (filled, rejected) => closePromise.then(filled, rejected);
	result.promise = closePromise;
	return result;
}
//#endregion
//#region node_modules/antd/es/message/useMessage.js
var DEFAULT_OFFSET$1 = 8;
var DEFAULT_DURATION$1 = 3;
var Wrapper$1 = ({ children, prefixCls }) => {
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$33(prefixCls, rootCls);
	return /* @__PURE__ */ import_react.createElement(NotificationProvider, { classNames: { list: clsx(hashId, cssVarCls, rootCls) } }, children);
};
var renderNotifications$1 = (node, { prefixCls, key }) => /* @__PURE__ */ import_react.createElement(Wrapper$1, {
	prefixCls,
	key
}, node);
var Holder$1 = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { top, prefixCls: staticPrefixCls, getContainer: staticGetContainer, maxCount, duration = DEFAULT_DURATION$1, rtl, transitionName, onAllRemoved, pauseOnHover = true } = props;
	const { getPrefixCls, direction, getPopupContainer } = useComponentConfig("message");
	const { message } = import_react.useContext(ConfigContext);
	const prefixCls = staticPrefixCls || getPrefixCls("message");
	const getStyle = () => ({
		left: "50%",
		transform: "translateX(-50%)",
		top: top ?? DEFAULT_OFFSET$1
	});
	const getClassName = () => clsx({ [`${prefixCls}-rtl`]: rtl ?? direction === "rtl" });
	const getNotificationMotion = () => getMotion$1(prefixCls, transitionName);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([props?.classNames, message?.classNames], [props?.styles, message?.styles], { props });
	const [api, holder] = useNotification$1({
		prefixCls,
		style: getStyle,
		className: getClassName,
		motion: getNotificationMotion,
		closable: false,
		duration,
		getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
		maxCount,
		onAllRemoved,
		renderNotifications: renderNotifications$1,
		pauseOnHover
	});
	import_react.useImperativeHandle(ref, () => ({
		...api,
		prefixCls,
		message,
		classNames: mergedClassNames,
		styles: mergedStyles
	}));
	return holder;
});
var keyIndex = 0;
function useInternalMessage(messageConfig) {
	const holderRef = import_react.useRef(null);
	devUseWarning("Message");
	return [import_react.useMemo(() => {
		const close = (key) => {
			holderRef.current?.close(key);
		};
		const open = (config) => {
			if (!holderRef.current) {
				const fakeResult = () => {};
				fakeResult.then = () => {};
				return fakeResult;
			}
			const { open: originOpen, prefixCls, message, classNames: originClassNames, styles: originStyles } = holderRef.current;
			const contextClassName = message?.className || {};
			const contextStyle = message?.style || {};
			const rawContextClassNames = message?.classNames || {};
			const rawContextStyles = message?.styles || {};
			const noticePrefixCls = `${prefixCls}-notice`;
			const { content, icon, type, key, className, style, onClose, classNames: configClassNames = {}, styles = {}, ...restConfig } = config;
			let mergedKey = key;
			if (!isNonNullable(mergedKey)) {
				keyIndex += 1;
				mergedKey = `antd-message-${keyIndex}`;
			}
			const contextConfig = {
				...messageConfig,
				...config
			};
			const contextClassNames = resolveStyleOrClass(rawContextClassNames, { props: contextConfig });
			const semanticClassNames = resolveStyleOrClass(configClassNames, { props: contextConfig });
			const contextStyles = resolveStyleOrClass(rawContextStyles, { props: contextConfig });
			const semanticStyles = resolveStyleOrClass(styles, { props: contextConfig });
			const mergedClassNames = mergeClassNames(void 0, contextClassNames, semanticClassNames, originClassNames);
			const mergedStyles = mergeStyles(contextStyles, semanticStyles, originStyles);
			return wrapPromiseFn((resolve) => {
				originOpen({
					...restConfig,
					key: mergedKey,
					content: /* @__PURE__ */ import_react.createElement(PureContent$1, {
						prefixCls,
						type,
						icon,
						classNames: mergedClassNames,
						styles: mergedStyles
					}, content),
					placement: "top",
					className: clsx({ [`${noticePrefixCls}-${type}`]: type }, className, contextClassName, mergedClassNames.root),
					style: {
						...mergedStyles.root,
						...contextStyle,
						...style
					},
					onClose: () => {
						onClose?.();
						resolve();
					}
				});
				return () => {
					close(mergedKey);
				};
			});
		};
		const destroy = (key) => {
			if (key !== void 0) close(key);
			else holderRef.current?.destroy();
		};
		const clone = {
			open,
			destroy
		};
		[
			"info",
			"success",
			"warning",
			"error",
			"loading"
		].forEach((type) => {
			const typeOpen = (jointContent, duration, onClose) => {
				let config;
				if (jointContent && typeof jointContent === "object" && "content" in jointContent) config = jointContent;
				else config = { content: jointContent };
				let mergedDuration;
				let mergedOnClose;
				if (typeof duration === "function") mergedOnClose = duration;
				else {
					mergedDuration = duration;
					mergedOnClose = onClose;
				}
				return open({
					onClose: mergedOnClose,
					duration: mergedDuration,
					...config,
					type
				});
			};
			clone[type] = typeOpen;
		});
		return clone;
	}, []), /* @__PURE__ */ import_react.createElement(Holder$1, {
		key: "message-holder",
		...messageConfig,
		ref: holderRef
	})];
}
function useMessage(messageConfig) {
	return useInternalMessage(messageConfig);
}
//#endregion
//#region node_modules/antd/es/_util/motion.js
var getCollapsedHeight = () => ({
	height: 0,
	opacity: 0
});
var getRealHeight = (node) => {
	const { scrollHeight } = node;
	return {
		height: scrollHeight,
		opacity: 1
	};
};
var getCurrentHeight = (node) => ({ height: node ? node.offsetHeight : 0 });
var skipOpacityTransition = (_, event) => event?.deadline === true || event.propertyName === "height";
var initCollapseMotion = (rootCls = "ant") => ({
	motionName: `${rootCls}-motion-collapse`,
	onAppearStart: getCollapsedHeight,
	onEnterStart: getCollapsedHeight,
	onAppearActive: getRealHeight,
	onEnterActive: getRealHeight,
	onLeaveStart: getCurrentHeight,
	onLeaveActive: getCollapsedHeight,
	onAppearEnd: skipOpacityTransition,
	onEnterEnd: skipOpacityTransition,
	onLeaveEnd: skipOpacityTransition,
	motionDeadline: 500
});
var getTransitionName = (rootPrefixCls, motion, transitionName) => {
	if (transitionName !== void 0) return transitionName;
	return `${rootPrefixCls}-${motion}`;
};
//#endregion
//#region node_modules/antd/es/_util/wave/style.js
var genWaveStyle = (token) => {
	const { componentCls, colorPrimary, motionDurationSlow, motionEaseInOut, motionEaseOutCirc, antCls } = token;
	const [, varRef] = genCssVar(antCls, "wave");
	return { [componentCls]: {
		position: "absolute",
		background: "transparent",
		pointerEvents: "none",
		boxSizing: "border-box",
		color: varRef("color", colorPrimary),
		boxShadow: `0 0 0 0 currentcolor`,
		opacity: .2,
		"&.wave-motion-appear": {
			transition: [`box-shadow 0.4s`, `opacity 2s`].map((prop) => `${prop} ${motionEaseOutCirc}`).join(","),
			"&-active": {
				boxShadow: `0 0 0 6px currentcolor`,
				opacity: 0
			},
			"&.wave-quick": { transition: [`box-shadow`, `opacity`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",") }
		}
	} };
};
var style_default$32 = genComponentStyleHook("Wave", genWaveStyle);
//#endregion
//#region node_modules/antd/es/_util/wave/interface.js
var TARGET_CLS = `ant-wave-target`;
//#endregion
//#region node_modules/antd/es/_util/wave/util.js
function isValidWaveColor(color) {
	return color && typeof color === "string" && color !== "#fff" && color !== "#ffffff" && color !== "rgb(255, 255, 255)" && color !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/.test(color) && color !== "transparent" && color !== "canvastext";
}
function getTargetWaveColor(node, colorSource = null) {
	const style = getComputedStyle(node);
	const { borderTopColor, borderColor, backgroundColor } = style;
	if (colorSource && isValidWaveColor(style[colorSource])) return style[colorSource];
	return [
		borderTopColor,
		borderColor,
		backgroundColor
	].find(isValidWaveColor) ?? null;
}
//#endregion
//#region node_modules/antd/es/_util/wave/WaveEffect.js
function validateNum(value) {
	return Number.isNaN(value) ? 0 : value;
}
var WaveEffect = (props) => {
	const { className, target, component, colorSource } = props;
	const divRef = import_react.useRef(null);
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const [varName] = genCssVar(getPrefixCls(), "wave");
	const [waveColor, setWaveColor] = import_react.useState(null);
	const [borderRadius, setBorderRadius] = import_react.useState([]);
	const [left, setLeft] = import_react.useState(0);
	const [top, setTop] = import_react.useState(0);
	const [width, setWidth] = import_react.useState(0);
	const [height, setHeight] = import_react.useState(0);
	const [enabled, setEnabled] = import_react.useState(false);
	const waveStyle = {
		left,
		top,
		width,
		height,
		borderRadius: borderRadius.map((radius) => `${radius}px`).join(" ")
	};
	if (waveColor) waveStyle[varName("color")] = waveColor;
	function syncPos() {
		const nodeStyle = getComputedStyle(target);
		setWaveColor(getTargetWaveColor(target, colorSource));
		const isStatic = nodeStyle.position === "static";
		const { borderLeftWidth, borderTopWidth } = nodeStyle;
		setLeft(isStatic ? target.offsetLeft : validateNum(-Number.parseFloat(borderLeftWidth)));
		setTop(isStatic ? target.offsetTop : validateNum(-Number.parseFloat(borderTopWidth)));
		setWidth(target.offsetWidth);
		setHeight(target.offsetHeight);
		const { borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius } = nodeStyle;
		setBorderRadius([
			borderTopLeftRadius,
			borderTopRightRadius,
			borderBottomRightRadius,
			borderBottomLeftRadius
		].map((radius) => validateNum(Number.parseFloat(radius))));
	}
	import_react.useEffect(() => {
		if (target) {
			const id = wrapperRaf(() => {
				syncPos();
				setEnabled(true);
			});
			let resizeObserver;
			if (typeof ResizeObserver !== "undefined") {
				resizeObserver = new ResizeObserver(syncPos);
				resizeObserver.observe(target);
			}
			return () => {
				wrapperRaf.cancel(id);
				resizeObserver?.disconnect();
			};
		}
	}, [target]);
	if (!enabled) return null;
	const isSmallComponent = (component === "Checkbox" || component === "Radio") && target?.classList.contains(TARGET_CLS);
	return /* @__PURE__ */ import_react.createElement(es_default, {
		visible: true,
		motionAppear: true,
		motionName: "wave-motion",
		motionDeadline: 5e3,
		onAppearEnd: (_, event) => {
			if (event.deadline || event.propertyName === "opacity") {
				const holder = divRef.current?.parentElement;
				unmount(holder).then(() => {
					holder?.remove();
				});
			}
			return false;
		}
	}, ({ className: motionClassName }, ref) => /* @__PURE__ */ import_react.createElement("div", {
		ref: composeRef(divRef, ref),
		className: clsx(className, motionClassName, { "wave-quick": isSmallComponent }),
		style: waveStyle
	}));
};
var showWaveEffect = (target, info) => {
	const { component } = info;
	if (component === "Checkbox" && !target.querySelector("input")?.checked) return;
	const holder = document.createElement("div");
	holder.style.position = "absolute";
	holder.style.left = "0px";
	holder.style.top = "0px";
	target?.insertBefore(holder, target?.firstChild);
	render(/* @__PURE__ */ import_react.createElement(WaveEffect, {
		...info,
		target
	}), holder);
};
//#endregion
//#region node_modules/antd/es/_util/wave/useWave.js
var useWave = (nodeRef, className, component, colorSource) => {
	const { wave } = import_react.useContext(ConfigContext);
	const [, token, hashId] = useToken();
	const showWave = useEvent((event) => {
		const node = nodeRef.current;
		if (wave?.disabled || !node) return;
		const targetNode = node.querySelector(`.${TARGET_CLS}`) || node;
		const { showEffect } = wave || {};
		(showEffect || showWaveEffect)(targetNode, {
			className,
			token,
			component,
			event,
			hashId,
			colorSource
		});
	});
	const rafIdRef = import_react.useRef(null);
	import_react.useEffect(() => () => {
		wrapperRaf.cancel(rafIdRef.current);
	}, []);
	const showDebounceWave = (event) => {
		wrapperRaf.cancel(rafIdRef.current);
		rafIdRef.current = wrapperRaf(() => {
			showWave(event);
		});
	};
	return showDebounceWave;
};
//#endregion
//#region node_modules/antd/es/_util/wave/index.js
var Wave = (props) => {
	const { children, disabled, component, colorSource } = props;
	const { getPrefixCls } = (0, import_react.useContext)(ConfigContext);
	const containerRef = (0, import_react.useRef)(null);
	const prefixCls = getPrefixCls("wave");
	const showWave = useWave(containerRef, clsx(prefixCls, style_default$32(prefixCls)), component, colorSource);
	import_react.useEffect(() => {
		const node = containerRef.current;
		if (!node || node.nodeType !== window.Node.ELEMENT_NODE || disabled) return;
		const onClick = (e) => {
			if (!isVisible_default(e.target) || !node.getAttribute || node.getAttribute("disabled") || node.disabled || node.className.includes("disabled") && !node.className.includes("disabled:") || node.getAttribute("aria-disabled") === "true" || node.className.includes("-leave")) return;
			showWave(e);
		};
		node.addEventListener("click", onClick, true);
		return () => {
			node.removeEventListener("click", onClick, true);
		};
	}, [disabled]);
	if (!/* @__PURE__ */ import_react.isValidElement(children)) return children ?? null;
	return cloneElement(children, { ref: supportRef(children) ? composeRef(getNodeRef(children), containerRef) : containerRef });
};
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useSize.js
var useSize = (customSize) => {
	const size = import_react.useContext(SizeContext);
	return import_react.useMemo(() => {
		if (!customSize) return size;
		if (typeof customSize === "string") return customSize ?? size;
		if (typeof customSize === "function") return customSize(size);
		return size;
	}, [customSize, size]);
};
//#endregion
//#region node_modules/antd/es/space/style/compact.js
var genSpaceCompactStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "inline-flex",
		"&-block": {
			display: "flex",
			width: "100%"
		},
		"&-vertical": { flexDirection: "column" },
		"&-rtl": { direction: "rtl" }
	} };
};
var compact_default$1 = genStyleHooks(["Space", "Compact"], genSpaceCompactStyle, () => ({}), { resetStyle: false });
//#endregion
//#region node_modules/antd/es/space/Compact.js
var SpaceCompactItemContext = /* @__PURE__ */ import_react.createContext(null);
var useCompactItemContext = (prefixCls, direction) => {
	const compactItemContext = import_react.useContext(SpaceCompactItemContext);
	const compactItemClassnames = import_react.useMemo(() => {
		if (!compactItemContext) return "";
		const { compactDirection, isFirstItem, isLastItem } = compactItemContext;
		const separator = compactDirection === "vertical" ? "-vertical-" : "-";
		return clsx(`${prefixCls}-compact${separator}item`, {
			[`${prefixCls}-compact${separator}first-item`]: isFirstItem,
			[`${prefixCls}-compact${separator}last-item`]: isLastItem,
			[`${prefixCls}-compact${separator}item-rtl`]: direction === "rtl"
		});
	}, [
		prefixCls,
		direction,
		compactItemContext
	]);
	return {
		compactSize: compactItemContext?.compactSize,
		compactDirection: compactItemContext?.compactDirection,
		compactItemClassnames
	};
};
var NoCompactStyle = (props) => {
	const { children } = props;
	return /* @__PURE__ */ import_react.createElement(SpaceCompactItemContext.Provider, { value: null }, children);
};
var CompactItem = (props) => {
	const { children, ...others } = props;
	return /* @__PURE__ */ import_react.createElement(SpaceCompactItemContext.Provider, { value: import_react.useMemo(() => others, [others]) }, children);
};
var Compact = (props) => {
	const { getPrefixCls, direction: directionConfig } = import_react.useContext(ConfigContext);
	const { size, direction, orientation, block, prefixCls: customizePrefixCls, className, rootClassName, children, vertical, ...restProps } = props;
	const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
	const mergedSize = useSize((ctx) => size ?? ctx);
	const prefixCls = getPrefixCls("space-compact", customizePrefixCls);
	const [hashId] = compact_default$1(prefixCls);
	const clx = clsx(prefixCls, hashId, {
		[`${prefixCls}-rtl`]: directionConfig === "rtl",
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-vertical`]: mergedVertical
	}, className, rootClassName);
	const compactItemContext = import_react.useContext(SpaceCompactItemContext);
	const childNodes = toArray$1(children);
	const nodes = import_react.useMemo(() => childNodes.map((child, i) => {
		const key = child?.key || `${prefixCls}-item-${i}`;
		return /* @__PURE__ */ import_react.createElement(CompactItem, {
			key,
			compactSize: mergedSize,
			compactDirection: mergedOrientation,
			isFirstItem: i === 0 && (!compactItemContext || compactItemContext?.isFirstItem),
			isLastItem: i === childNodes.length - 1 && (!compactItemContext || compactItemContext?.isLastItem)
		}, child);
	}), [
		childNodes,
		compactItemContext,
		mergedOrientation,
		mergedSize,
		prefixCls
	]);
	if (childNodes.length === 0) return null;
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clx,
		...restProps
	}, nodes);
};
//#endregion
//#region node_modules/antd/es/button/ButtonGroup.js
var GroupSizeContext = /* @__PURE__ */ import_react.createContext(void 0);
var ButtonGroup = (props) => {
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, size, className, ...others } = props;
	const prefixCls = getPrefixCls("btn-group", customizePrefixCls);
	const [, , hashId] = useToken();
	const sizeCls = import_react.useMemo(() => {
		switch (size) {
			case "large": return "lg";
			case "small": return "sm";
			default: return "";
		}
	}, [size]);
	const classes = clsx(prefixCls, {
		[`${prefixCls}-${sizeCls}`]: sizeCls,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, hashId);
	return /* @__PURE__ */ import_react.createElement(GroupSizeContext.Provider, { value: size }, /* @__PURE__ */ import_react.createElement("div", {
		...others,
		className: classes
	}));
};
//#endregion
//#region node_modules/antd/es/button/buttonHelpers.js
var rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function convertLegacyProps(type) {
	if (type === "danger") return { danger: true };
	return { type };
}
function isString(str) {
	return typeof str === "string";
}
function isUnBorderedButtonVariant(type) {
	return type === "text" || type === "link";
}
function splitCNCharsBySpace(child, needInserted, style, className) {
	if (!isNonNullable(child) || child === "") return;
	const SPACE = needInserted ? " " : "";
	if (typeof child !== "string" && typeof child !== "number" && isString(child.type) && isTwoCNChar(child.props.children)) return cloneElement(child, (oriProps) => {
		const mergedCls = clsx(oriProps.className, className) || void 0;
		const mergedStyle = {
			...style,
			...oriProps.style
		};
		return {
			...oriProps,
			children: oriProps.children.split("").join(SPACE),
			className: mergedCls,
			style: mergedStyle
		};
	});
	if (isString(child)) return /* @__PURE__ */ import_react.createElement("span", {
		className,
		style
	}, isTwoCNChar(child) ? child.split("").join(SPACE) : child);
	if (isFragment(child)) return /* @__PURE__ */ import_react.createElement("span", {
		className,
		style
	}, child);
	return cloneElement(child, (oriProps) => ({
		...oriProps,
		className: clsx(oriProps.className, className) || void 0,
		style: {
			...oriProps.style,
			...style
		}
	}));
}
function spaceChildren(children, needInserted, style, className) {
	let isPrevChildPure = false;
	const childList = [];
	import_react.Children.forEach(children, (child) => {
		const type = typeof child;
		const isCurrentChildPure = type === "string" || type === "number";
		if (isPrevChildPure && isCurrentChildPure) {
			const lastIndex = childList.length - 1;
			childList[lastIndex] = `${childList[lastIndex]}${child}`;
		} else childList.push(child);
		isPrevChildPure = isCurrentChildPure;
	});
	return import_react.Children.map(childList, (child) => splitCNCharsBySpace(child, needInserted, style, className));
}
[
	"default",
	"primary",
	"danger"
].concat(_toConsumableArray(PresetColors));
//#endregion
//#region node_modules/antd/es/button/IconWrapper.js
var IconWrapper = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { className, style, children, prefixCls } = props;
	const iconWrapperCls = clsx(`${prefixCls}-icon`, className);
	return /* @__PURE__ */ import_react.createElement("span", {
		ref,
		className: iconWrapperCls,
		style
	}, children);
});
//#endregion
//#region node_modules/antd/es/button/DefaultLoadingIcon.js
var InnerLoadingIcon = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls, className, style, iconClassName } = props;
	const mergedIconCls = clsx(`${prefixCls}-loading-icon`, className);
	return /* @__PURE__ */ import_react.createElement(IconWrapper, {
		prefixCls,
		className: mergedIconCls,
		style,
		ref
	}, /* @__PURE__ */ import_react.createElement(RefIcon$5, { className: iconClassName }));
});
var getCollapsedWidth = () => ({
	width: 0,
	opacity: 0,
	transform: "scale(0)"
});
var getRealWidth = (node) => ({
	width: node.scrollWidth,
	opacity: 1,
	transform: "scale(1)"
});
var DefaultLoadingIcon = (props) => {
	const { prefixCls, loading, existIcon, className, style, mount } = props;
	const visible = !!loading;
	if (existIcon) return /* @__PURE__ */ import_react.createElement(InnerLoadingIcon, {
		prefixCls,
		className,
		style
	});
	return /* @__PURE__ */ import_react.createElement(es_default, {
		visible,
		motionName: `${prefixCls}-loading-icon-motion`,
		motionAppear: !mount,
		motionEnter: !mount,
		motionLeave: !mount,
		removeOnLeave: true,
		onAppearStart: getCollapsedWidth,
		onAppearActive: getRealWidth,
		onEnterStart: getCollapsedWidth,
		onEnterActive: getRealWidth,
		onLeaveStart: getRealWidth,
		onLeaveActive: getCollapsedWidth
	}, ({ className: motionCls, style: motionStyle }, ref) => {
		const mergedStyle = {
			...style,
			...motionStyle
		};
		return /* @__PURE__ */ import_react.createElement(InnerLoadingIcon, {
			prefixCls,
			className: clsx(className, motionCls),
			style: mergedStyle,
			ref
		});
	});
};
//#endregion
//#region node_modules/antd/es/style/motion/collapse.js
var genCollapseMotion = (token) => {
	const { componentCls, antCls, motionDurationMid, motionEaseInOut } = token;
	return { [componentCls]: {
		[`${antCls}-motion-collapse-legacy`]: {
			overflow: "hidden",
			"&-active": { transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important` }
		},
		[`${antCls}-motion-collapse`]: {
			overflow: "hidden",
			transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important`
		}
	} };
};
//#endregion
//#region node_modules/antd/es/style/motion/motion.js
var initMotionCommon = (duration) => ({
	animationDuration: duration,
	animationFillMode: "both"
});
var initMotion = (motionCls, inKeyframes, outKeyframes, duration, sameLevel = false) => {
	const sameLevelPrefix = sameLevel ? "&" : "";
	return {
		[`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: {
			...initMotionCommon(duration),
			animationPlayState: "paused"
		},
		[`${sameLevelPrefix}${motionCls}-leave`]: {
			...initMotionCommon(duration),
			animationPlayState: "paused"
		},
		[`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
			animationName: inKeyframes,
			animationPlayState: "running"
		},
		[`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
			animationName: outKeyframes,
			animationPlayState: "running",
			pointerEvents: "none"
		}
	};
};
//#endregion
//#region node_modules/antd/es/style/motion/fade.js
var fadeIn = new Keyframe("antFadeIn", {
	"0%": { opacity: 0 },
	"100%": { opacity: 1 }
});
var fadeOut = new Keyframe("antFadeOut", {
	"0%": { opacity: 1 },
	"100%": { opacity: 0 }
});
/**
* Initialize fade motion styles
*
* Generates CSS styles for fade in/out transition animations when elements are shown/hidden.
* Supports enter, appear, and leave animation states.
*
* @param token - Object containing design tokens and CSS class prefix
* @param sameLevel - Controls CSS selector nesting behavior:
*   - `false` (default): Generates descendant selectors like `.ant-fade-enter`, `.ant-fade-appear`
*   - `true`: Generates same-level selectors with `&` prefix like `&.ant-fade-enter`, `&.ant-fade-appear`
*   Use `true` when the motion classes are applied to the same element as the parent selector,
*   Use `false` when the motion classes are applied to child elements
* @returns CSS interpolation object containing fade motion styles
*
* @example
* ```ts
* // For child elements (default behavior)
* const fadeStyles = initFadeMotion(token);
* // Generates: .parent .ant-fade-enter { ... }
*
* // For same element
* const sameLevelFadeStyles = initFadeMotion(token, true);
* // Generates: .parent.ant-fade-enter { ... }
* ```
*/
var initFadeMotion = (token, sameLevel = false) => {
	const { antCls } = token;
	const motionCls = `${antCls}-fade`;
	const sameLevelPrefix = sameLevel ? "&" : "";
	return [initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel), {
		[`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: "linear"
		},
		[`${sameLevelPrefix}${motionCls}-leave`]: { animationTimingFunction: "linear" }
	}];
};
//#endregion
//#region node_modules/antd/es/style/motion/move.js
var moveDownIn = new Keyframe("antMoveDownIn", {
	"0%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
var moveDownOut = new Keyframe("antMoveDownOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
var moveLeftIn = new Keyframe("antMoveLeftIn", {
	"0%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
var moveLeftOut = new Keyframe("antMoveLeftOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
var moveRightIn = new Keyframe("antMoveRightIn", {
	"0%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
var moveRightOut = new Keyframe("antMoveRightOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
var moveUpIn = new Keyframe("antMoveUpIn", {
	"0%": {
		transform: "translate3d(0, -100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
var moveUpOut = new Keyframe("antMoveUpOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(0, -100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
var moveMotion = {
	"move-up": {
		inKeyframes: moveUpIn,
		outKeyframes: moveUpOut
	},
	"move-down": {
		inKeyframes: moveDownIn,
		outKeyframes: moveDownOut
	},
	"move-left": {
		inKeyframes: moveLeftIn,
		outKeyframes: moveLeftOut
	},
	"move-right": {
		inKeyframes: moveRightIn,
		outKeyframes: moveRightOut
	}
};
var initMoveMotion = (token, motionName) => {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = moveMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: token.motionEaseOutCirc
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInOutCirc }
	}];
};
//#endregion
//#region node_modules/antd/es/style/motion/slide.js
var slideUpIn = new Keyframe("antSlideUpIn", {
	"0%": {
		transform: "scaleY(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleY(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	}
});
var slideUpOut = new Keyframe("antSlideUpOut", {
	"0%": {
		transform: "scaleY(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleY(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	}
});
var slideDownIn = new Keyframe("antSlideDownIn", {
	"0%": {
		transform: "scaleY(0.8)",
		transformOrigin: "100% 100%",
		opacity: 0
	},
	"100%": {
		transform: "scaleY(1)",
		transformOrigin: "100% 100%",
		opacity: 1
	}
});
var slideDownOut = new Keyframe("antSlideDownOut", {
	"0%": {
		transform: "scaleY(1)",
		transformOrigin: "100% 100%",
		opacity: 1
	},
	"100%": {
		transform: "scaleY(0.8)",
		transformOrigin: "100% 100%",
		opacity: 0
	}
});
var slideLeftIn = new Keyframe("antSlideLeftIn", {
	"0%": {
		transform: "scaleX(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleX(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	}
});
var slideLeftOut = new Keyframe("antSlideLeftOut", {
	"0%": {
		transform: "scaleX(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleX(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	}
});
var slideRightIn = new Keyframe("antSlideRightIn", {
	"0%": {
		transform: "scaleX(0.8)",
		transformOrigin: "100% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleX(1)",
		transformOrigin: "100% 0%",
		opacity: 1
	}
});
var slideRightOut = new Keyframe("antSlideRightOut", {
	"0%": {
		transform: "scaleX(1)",
		transformOrigin: "100% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleX(0.8)",
		transformOrigin: "100% 0%",
		opacity: 0
	}
});
var slideMotion = {
	"slide-up": {
		inKeyframes: slideUpIn,
		outKeyframes: slideUpOut
	},
	"slide-down": {
		inKeyframes: slideDownIn,
		outKeyframes: slideDownOut
	},
	"slide-left": {
		inKeyframes: slideLeftIn,
		outKeyframes: slideLeftOut
	},
	"slide-right": {
		inKeyframes: slideRightIn,
		outKeyframes: slideRightOut
	}
};
var initSlideMotion = (token, motionName) => {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = slideMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
		[`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
			transform: "scale(0)",
			transformOrigin: "0% 0%",
			opacity: 0,
			animationTimingFunction: token.motionEaseOutQuint,
			"&-prepare": { transform: "scale(1)" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInQuint }
	}];
};
//#endregion
//#region node_modules/antd/es/style/motion/util.js
var genNoMotionStyle = () => {
	return { "@media (prefers-reduced-motion: reduce)": {
		transition: "none",
		animation: "none"
	} };
};
//#endregion
//#region node_modules/antd/es/style/motion/zoom.js
var zoomIn = new Keyframe("antZoomIn", {
	"0%": {
		transform: "scale(0.2)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
var zoomOut = new Keyframe("antZoomOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.2)",
		opacity: 0
	}
});
var zoomBigIn = new Keyframe("antZoomBigIn", {
	"0%": {
		transform: "scale(0.8)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
var zoomBigOut = new Keyframe("antZoomBigOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.8)",
		opacity: 0
	}
});
var zoomUpIn = new Keyframe("antZoomUpIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	}
});
var zoomUpOut = new Keyframe("antZoomUpOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	}
});
var zoomLeftIn = new Keyframe("antZoomLeftIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	}
});
var zoomLeftOut = new Keyframe("antZoomLeftOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	}
});
var zoomRightIn = new Keyframe("antZoomRightIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	}
});
var zoomRightOut = new Keyframe("antZoomRightOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	}
});
var zoomDownIn = new Keyframe("antZoomDownIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	}
});
var zoomDownOut = new Keyframe("antZoomDownOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	}
});
var zoomMotion = {
	zoom: {
		inKeyframes: zoomIn,
		outKeyframes: zoomOut
	},
	"zoom-big": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-big-fast": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-left": {
		inKeyframes: zoomLeftIn,
		outKeyframes: zoomLeftOut
	},
	"zoom-right": {
		inKeyframes: zoomRightIn,
		outKeyframes: zoomRightOut
	},
	"zoom-up": {
		inKeyframes: zoomUpIn,
		outKeyframes: zoomUpOut
	},
	"zoom-down": {
		inKeyframes: zoomDownIn,
		outKeyframes: zoomDownOut
	}
};
var initZoomMotion = (token, motionName) => {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = zoomMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			transform: "scale(0)",
			opacity: 0,
			animationTimingFunction: token.motionEaseOutCirc,
			"&-prepare": { transform: "none" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInOutCirc }
	}];
};
//#endregion
//#region node_modules/antd/es/button/style/group.js
var genButtonBorderStyle = (buttonTypeCls, borderColor) => ({ [`> span, > ${buttonTypeCls}`]: {
	"&:not(:last-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineEndColor: borderColor } } },
	"&:not(:first-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineStartColor: borderColor } } }
} });
var genGroupStyle$2 = (token) => {
	const { componentCls, fontSize, lineWidth, groupBorderColor, colorErrorHover } = token;
	return { [`${componentCls}-group`]: [
		{
			position: "relative",
			display: "inline-flex",
			[`> span, > ${componentCls}`]: {
				"&:not(:last-child)": { [`&, & > ${componentCls}`]: {
					borderStartEndRadius: 0,
					borderEndEndRadius: 0
				} },
				"&:not(:first-child)": {
					marginInlineStart: token.calc(lineWidth).mul(-1).equal(),
					[`&, & > ${componentCls}`]: {
						borderStartStartRadius: 0,
						borderEndStartRadius: 0
					}
				}
			},
			[componentCls]: {
				position: "relative",
				zIndex: 1,
				"&:hover, &:focus, &:active": { zIndex: 2 },
				"&[disabled]": { zIndex: 0 }
			},
			[`${componentCls}-icon-only`]: { fontSize }
		},
		genButtonBorderStyle(`${componentCls}-primary`, groupBorderColor),
		genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover)
	] };
};
//#endregion
//#region node_modules/antd/es/color-picker/color.js
var toHexFormat = (value, alpha) => value?.replace(/[^0-9a-f]/gi, "").slice(0, alpha ? 8 : 6) || "";
var getHex = (value, alpha) => value ? toHexFormat(value, alpha) : "";
var AggregationColor = /* @__PURE__ */ function() {
	function AggregationColor(color) {
		_classCallCheck(this, AggregationColor);
		this.cleared = false;
		if (color instanceof AggregationColor) {
			this.metaColor = color.metaColor.clone();
			this.colors = color.colors?.map((info) => ({
				color: new AggregationColor(info.color),
				percent: info.percent
			}));
			this.cleared = color.cleared;
			return;
		}
		const isArray = Array.isArray(color);
		if (isArray && color.length) {
			this.colors = color.map(({ color: c, percent }) => ({
				color: new AggregationColor(c),
				percent
			}));
			this.metaColor = new Color(this.colors[0].color.metaColor);
		} else this.metaColor = new Color(isArray ? "" : color);
		if (!color || isArray && !this.colors) {
			this.metaColor = this.metaColor.setA(0);
			this.cleared = true;
		}
	}
	return _createClass(AggregationColor, [
		{
			key: "toHsb",
			value: function toHsb() {
				return this.metaColor.toHsb();
			}
		},
		{
			key: "toHsbString",
			value: function toHsbString() {
				return this.metaColor.toHsbString();
			}
		},
		{
			key: "toHex",
			value: function toHex() {
				return getHex(this.toHexString(), this.metaColor.a < 1);
			}
		},
		{
			key: "toHexString",
			value: function toHexString() {
				return this.metaColor.toHexString();
			}
		},
		{
			key: "toRgb",
			value: function toRgb() {
				return this.metaColor.toRgb();
			}
		},
		{
			key: "toRgbString",
			value: function toRgbString() {
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "isGradient",
			value: function isGradient() {
				return !!this.colors && !this.cleared;
			}
		},
		{
			key: "getColors",
			value: function getColors() {
				return this.colors || [{
					color: this,
					percent: 0
				}];
			}
		},
		{
			key: "toCssString",
			value: function toCssString() {
				const { colors } = this;
				if (colors) return `linear-gradient(90deg, ${colors.map((c) => `${c.color.toRgbString()} ${c.percent}%`).join(", ")})`;
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "equals",
			value: function equals(color) {
				if (!color || this.isGradient() !== color.isGradient()) return false;
				if (!this.isGradient()) return this.toHexString() === color.toHexString();
				return this.colors.length === color.colors.length && this.colors.every((c, i) => {
					const target = color.colors[i];
					return c.percent === target.percent && c.color.equals(target.color);
				});
			}
		}
	]);
}();
//#endregion
//#region node_modules/antd/es/color-picker/util.js
var generateColor = (color) => {
	if (color instanceof AggregationColor) return color;
	return new AggregationColor(color);
};
//#endregion
//#region node_modules/antd/es/color-picker/components/ColorPresets.js
var isBright = (value, bgColorToken) => {
	const { r, g, b, a } = value.toRgb();
	const hsv = new Color(value.toRgbString()).onBackground(bgColorToken).toHsv();
	if (a <= .5) return hsv.v > .5;
	return r * .299 + g * .587 + b * .114 > 192;
};
//#endregion
//#region node_modules/antd/es/button/style/token.js
var prepareToken$4 = (token) => {
	const { paddingInline, onlyIconSize, borderColorDisabled } = token;
	return merge$1(token, {
		buttonPaddingHorizontal: paddingInline,
		buttonPaddingVertical: 0,
		buttonIconOnlyFontSize: onlyIconSize,
		colorBorderDisabled: borderColorDisabled
	});
};
var prepareComponentToken$27 = (token) => {
	const contentFontSize = token.contentFontSize ?? token.fontSize;
	const contentFontSizeSM = token.contentFontSizeSM ?? token.fontSize;
	const contentFontSizeLG = token.contentFontSizeLG ?? token.fontSizeLG;
	const contentLineHeight = token.contentLineHeight ?? getLineHeight(contentFontSize);
	const contentLineHeightSM = token.contentLineHeightSM ?? getLineHeight(contentFontSizeSM);
	const contentLineHeightLG = token.contentLineHeightLG ?? getLineHeight(contentFontSizeLG);
	const solidTextColor = isBright(new AggregationColor(token.colorBgSolid), "#fff") ? "#000" : "#fff";
	const shadowColorTokens = PresetColors.reduce((prev, colorKey) => ({
		...prev,
		[`${colorKey}ShadowColor`]: `0 ${unit(token.controlOutlineWidth)} 0 ${getAlphaColor(token[`${colorKey}1`], token.colorBgContainer)}`
	}), {});
	const defaultBgDisabled = token.colorBgContainerDisabled;
	const dashedBgDisabled = token.colorBgContainerDisabled;
	return {
		...shadowColorTokens,
		fontWeight: 400,
		iconGap: token.marginXS,
		defaultShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,
		primaryShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,
		dangerShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,
		primaryColor: token.colorTextLightSolid,
		dangerColor: token.colorTextLightSolid,
		borderColorDisabled: token.colorBorderDisabled,
		defaultGhostColor: token.colorBgContainer,
		ghostBg: "transparent",
		defaultGhostBorderColor: token.colorBgContainer,
		paddingInline: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineLG: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineSM: 8 - token.lineWidth,
		onlyIconSize: "inherit",
		onlyIconSizeSM: "inherit",
		onlyIconSizeLG: "inherit",
		groupBorderColor: token.colorPrimaryHover,
		linkHoverBg: "transparent",
		textTextColor: token.colorText,
		textTextHoverColor: token.colorText,
		textTextActiveColor: token.colorText,
		textHoverBg: token.colorFillTertiary,
		defaultColor: token.colorText,
		defaultBg: token.colorBgContainer,
		defaultBorderColor: token.colorBorder,
		defaultBorderColorDisabled: token.colorBorder,
		defaultHoverBg: token.colorBgContainer,
		defaultHoverColor: token.colorPrimaryHover,
		defaultHoverBorderColor: token.colorPrimaryHover,
		defaultActiveBg: token.colorBgContainer,
		defaultActiveColor: token.colorPrimaryActive,
		defaultActiveBorderColor: token.colorPrimaryActive,
		solidTextColor,
		contentFontSize,
		contentFontSizeSM,
		contentFontSizeLG,
		contentLineHeight,
		contentLineHeightSM,
		contentLineHeightLG,
		paddingBlock: Math.max((token.controlHeight - contentFontSize * contentLineHeight) / 2 - token.lineWidth, 0),
		paddingBlockSM: Math.max((token.controlHeightSM - contentFontSizeSM * contentLineHeightSM) / 2 - token.lineWidth, 0),
		paddingBlockLG: Math.max((token.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 - token.lineWidth, 0),
		defaultBgDisabled,
		dashedBgDisabled
	};
};
//#endregion
//#region node_modules/antd/es/button/style/variant.js
var genVariantStyle = (token) => {
	const { componentCls, antCls, lineWidth } = token;
	const [varName, varRef] = genCssVar(antCls, "btn");
	return { [componentCls]: [
		{
			[varName("border-width")]: lineWidth,
			[varName("border-color")]: "#000",
			[varName("border-color-hover")]: varRef("border-color"),
			[varName("border-color-active")]: varRef("border-color"),
			[varName("border-color-disabled")]: varRef("border-color"),
			[varName("border-style")]: "solid",
			[varName("text-color")]: "#000",
			[varName("text-color-hover")]: varRef("text-color"),
			[varName("text-color-active")]: varRef("text-color"),
			[varName("text-color-disabled")]: varRef("text-color"),
			[varName("bg-color")]: "#ddd",
			[varName("bg-color-hover")]: varRef("bg-color"),
			[varName("bg-color-active")]: varRef("bg-color"),
			[varName("bg-color-disabled")]: token.colorBgContainerDisabled,
			[varName("bg-color-container")]: token.colorBgContainer,
			[varName("shadow")]: "none"
		},
		{
			border: [
				varRef("border-width"),
				varRef("border-style"),
				varRef("border-color")
			].join(" "),
			color: varRef("text-color"),
			backgroundColor: varRef("bg-color"),
			[`&:not(:disabled):not(${componentCls}-disabled)`]: {
				"&:hover": {
					border: [
						varRef("border-width"),
						varRef("border-style"),
						varRef("border-color-hover")
					].join(" "),
					color: varRef("text-color-hover"),
					backgroundColor: varRef("bg-color-hover")
				},
				"&:active": {
					border: [
						varRef("border-width"),
						varRef("border-style"),
						varRef("border-color-active")
					].join(" "),
					color: varRef("text-color-active"),
					backgroundColor: varRef("bg-color-active")
				}
			}
		},
		{
			[`&${componentCls}-variant-solid`]: {
				[varName("solid-bg-color")]: varRef("color-base"),
				[varName("solid-bg-color-hover")]: varRef("color-hover"),
				[varName("solid-bg-color-active")]: varRef("color-active"),
				[varName("border-color")]: "transparent",
				[varName("text-color")]: token.colorTextLightSolid,
				[varName("bg-color")]: varRef("solid-bg-color"),
				[varName("bg-color-hover")]: varRef("solid-bg-color-hover"),
				[varName("bg-color-active")]: varRef("solid-bg-color-active"),
				boxShadow: varRef("shadow")
			},
			[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
				[varName("border-color")]: varRef("color-base"),
				[varName("border-color-hover")]: varRef("color-hover"),
				[varName("border-color-active")]: varRef("color-active"),
				[varName("bg-color")]: varRef("bg-color-container"),
				[varName("text-color")]: varRef("color-base"),
				[varName("text-color-hover")]: varRef("color-hover"),
				[varName("text-color-active")]: varRef("color-active"),
				boxShadow: varRef("shadow")
			},
			[`&${componentCls}-variant-dashed`]: {
				[varName("border-style")]: "dashed",
				[varName("bg-color-disabled")]: token.dashedBgDisabled
			},
			[`&${componentCls}-variant-filled`]: {
				[varName("border-color")]: "transparent",
				[varName("text-color")]: varRef("color-base"),
				[varName("bg-color")]: varRef("color-light"),
				[varName("bg-color-hover")]: varRef("color-light-hover"),
				[varName("bg-color-active")]: varRef("color-light-active")
			},
			[`&${componentCls}-variant-text, &${componentCls}-variant-link`]: {
				[varName("border-color")]: "transparent",
				[varName("text-color")]: varRef("color-base"),
				[varName("text-color-hover")]: varRef("color-hover"),
				[varName("text-color-active")]: varRef("color-active"),
				[varName("bg-color")]: "transparent",
				[varName("bg-color-hover")]: "transparent",
				[varName("bg-color-active")]: "transparent",
				[`&:disabled, &${token.componentCls}-disabled`]: {
					background: "transparent",
					borderColor: "transparent"
				}
			},
			[`&${componentCls}-variant-text`]: {
				[varName("bg-color-hover")]: varRef("color-light"),
				[varName("bg-color-active")]: varRef("color-light-active")
			}
		},
		{
			[`&${componentCls}-variant-link`]: {
				[varName("color-base")]: token.colorLink,
				[varName("color-hover")]: token.colorLinkHover,
				[varName("color-active")]: token.colorLinkActive,
				[varName("bg-color-hover")]: token.linkHoverBg
			},
			[`&${componentCls}-color-primary`]: {
				[varName("color-base")]: token.colorPrimary,
				[varName("color-hover")]: token.colorPrimaryHover,
				[varName("color-active")]: token.colorPrimaryActive,
				[varName("color-light")]: token.colorPrimaryBg,
				[varName("color-light-hover")]: token.colorPrimaryBgHover,
				[varName("color-light-active")]: token.colorPrimaryBorder,
				[varName("shadow")]: token.primaryShadow,
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.primaryColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				}
			},
			[`&${componentCls}-color-dangerous`]: {
				[varName("color-base")]: token.colorError,
				[varName("color-hover")]: token.colorErrorHover,
				[varName("color-active")]: token.colorErrorActive,
				[varName("color-light")]: token.colorErrorBg,
				[varName("color-light-hover")]: token.colorErrorBgFilledHover,
				[varName("color-light-active")]: token.colorErrorBgActive,
				[varName("shadow")]: token.dangerShadow,
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.dangerColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				}
			},
			[`&${componentCls}-color-default`]: {
				[varName("solid-bg-color")]: token.colorBgSolid,
				[varName("solid-bg-color-hover")]: token.colorBgSolidHover,
				[varName("solid-bg-color-active")]: token.colorBgSolidActive,
				[varName("color-base")]: token.defaultBorderColor,
				[varName("color-hover")]: token.defaultHoverBorderColor,
				[varName("color-active")]: token.defaultActiveBorderColor,
				[varName("color-light")]: token.colorFillTertiary,
				[varName("color-light-hover")]: token.colorFillSecondary,
				[varName("color-light-active")]: token.colorFill,
				[varName("text-color")]: token.defaultColor,
				[varName("text-color-hover")]: token.defaultHoverColor,
				[varName("text-color-active")]: token.defaultActiveColor,
				[varName("shadow")]: token.defaultShadow,
				[`&${componentCls}-variant-outlined`]: { [varName("bg-color-disabled")]: token.defaultBgDisabled },
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.solidTextColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				},
				[`&${componentCls}-variant-filled, &${componentCls}-variant-text`]: {
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				},
				[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
					[varName("text-color")]: token.defaultColor,
					[varName("text-color-hover")]: token.defaultHoverColor,
					[varName("text-color-active")]: token.defaultActiveColor,
					[varName("bg-color-container")]: token.defaultBg,
					[varName("bg-color-hover")]: token.defaultHoverBg,
					[varName("bg-color-active")]: token.defaultActiveBg
				},
				[`&${componentCls}-variant-text`]: {
					[varName("text-color")]: token.textTextColor,
					[varName("text-color-hover")]: token.textTextHoverColor,
					[varName("text-color-active")]: token.textTextActiveColor,
					[varName("bg-color-hover")]: token.textHoverBg
				},
				[`&${componentCls}-background-ghost`]: { [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
					[varName("text-color")]: token.defaultGhostColor,
					[varName("border-color")]: token.defaultGhostBorderColor
				} }
			}
		},
		PresetColors.map((colorKey) => {
			const darkColor = token[`${colorKey}6`];
			const lightColor = token[`${colorKey}1`];
			const hoverColor = token[`${colorKey}Hover`];
			const lightHoverColor = token[`${colorKey}2`];
			const lightActiveColor = token[`${colorKey}3`];
			const activeColor = token[`${colorKey}Active`];
			const shadowColor = token[`${colorKey}ShadowColor`];
			return { [`&${componentCls}-color-${colorKey}`]: {
				[varName("color-base")]: darkColor,
				[varName("color-hover")]: hoverColor,
				[varName("color-active")]: activeColor,
				[varName("color-light")]: lightColor,
				[varName("color-light-hover")]: lightHoverColor,
				[varName("color-light-active")]: lightActiveColor,
				[varName("shadow")]: shadowColor
			} };
		}),
		{ [`&:disabled, &${token.componentCls}-disabled`]: {
			cursor: "not-allowed",
			borderColor: token.colorBorderDisabled,
			background: varRef("bg-color-disabled"),
			color: token.colorTextDisabled,
			boxShadow: "none"
		} },
		{ [`&${componentCls}-background-ghost`]: {
			[varName("bg-color")]: token.ghostBg,
			[varName("bg-color-hover")]: token.ghostBg,
			[varName("bg-color-active")]: token.ghostBg,
			[varName("shadow")]: "none",
			[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
				[varName("bg-color-hover")]: token.ghostBg,
				[varName("bg-color-active")]: token.ghostBg
			}
		} }
	] };
};
//#endregion
//#region node_modules/antd/es/button/style/index.js
var genSharedButtonStyle = (token) => {
	const { componentCls, iconCls, fontWeight, opacityLoading, motionDurationSlow, motionEaseInOut, iconGap, calc } = token;
	return { [componentCls]: {
		outline: "none",
		position: "relative",
		display: "inline-flex",
		gap: iconGap,
		alignItems: "center",
		justifyContent: "center",
		fontWeight,
		whiteSpace: "nowrap",
		textAlign: "center",
		backgroundImage: "none",
		cursor: "pointer",
		transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
		userSelect: "none",
		touchAction: "manipulation",
		...genNoMotionStyle(),
		"&:disabled > *": { pointerEvents: "none" },
		[`${componentCls}-icon > svg`]: resetIcon(),
		"> a": { color: "currentColor" },
		"&:not(:disabled)": genFocusStyle(token),
		[`&${componentCls}-two-chinese-chars::first-letter`]: { letterSpacing: "0.34em" },
		[`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
			marginInlineEnd: "-0.34em",
			letterSpacing: "0.34em"
		},
		[`&${componentCls}-icon-only`]: {
			paddingInline: 0,
			[`&${componentCls}-compact-item`]: { flex: "none" }
		},
		[`&${componentCls}-loading`]: {
			opacity: opacityLoading,
			cursor: "default"
		},
		[`${componentCls}-loading-icon`]: { transition: [
			"width",
			"opacity",
			"margin"
		].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",") },
		[`&:not(${componentCls}-icon-end)`]: { [`${componentCls}-loading-icon-motion`]: {
			"&-appear-start, &-enter-start": { marginInlineEnd: calc(iconGap).mul(-1).equal() },
			"&-appear-active, &-enter-active": { marginInlineEnd: 0 },
			"&-leave-start": { marginInlineEnd: 0 },
			"&-leave-active": { marginInlineEnd: calc(iconGap).mul(-1).equal() }
		} },
		"&-icon-end": {
			flexDirection: "row-reverse",
			[`${componentCls}-loading-icon-motion`]: {
				"&-appear-start, &-enter-start": { marginInlineStart: calc(iconGap).mul(-1).equal() },
				"&-appear-active, &-enter-active": { marginInlineStart: 0 },
				"&-leave-start": { marginInlineStart: 0 },
				"&-leave-active": { marginInlineStart: calc(iconGap).mul(-1).equal() }
			}
		}
	} };
};
var genCircleButtonStyle = (token) => ({
	minWidth: token.controlHeight,
	paddingInline: 0,
	borderRadius: "50%"
});
var genButtonStyle = (token, prefixCls = "") => {
	const { componentCls, controlHeight, fontSize, borderRadius, buttonPaddingHorizontal, iconCls, buttonPaddingVertical, buttonIconOnlyFontSize } = token;
	return [
		{ [prefixCls]: {
			fontSize,
			height: controlHeight,
			padding: `${unit(buttonPaddingVertical)} ${unit(buttonPaddingHorizontal)}`,
			borderRadius,
			[`&${componentCls}-icon-only`]: {
				width: controlHeight,
				[iconCls]: { fontSize: buttonIconOnlyFontSize }
			}
		} },
		{ [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token) },
		{ [`${componentCls}${componentCls}-round${prefixCls}`]: {
			borderRadius: token.controlHeight,
			[`&:not(${componentCls}-icon-only)`]: { paddingInline: token.buttonPaddingHorizontal }
		} }
	];
};
var genSizeBaseButtonStyle = (token) => {
	return genButtonStyle(merge$1(token, { fontSize: token.contentFontSize }), token.componentCls);
};
var genSizeSmallButtonStyle = (token) => {
	return genButtonStyle(merge$1(token, {
		controlHeight: token.controlHeightSM,
		fontSize: token.contentFontSizeSM,
		padding: token.paddingXS,
		buttonPaddingHorizontal: token.paddingInlineSM,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusSM,
		buttonIconOnlyFontSize: token.onlyIconSizeSM
	}), `${token.componentCls}-sm`);
};
var genSizeLargeButtonStyle = (token) => {
	return genButtonStyle(merge$1(token, {
		controlHeight: token.controlHeightLG,
		fontSize: token.contentFontSizeLG,
		buttonPaddingHorizontal: token.paddingInlineLG,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusLG,
		buttonIconOnlyFontSize: token.onlyIconSizeLG
	}), `${token.componentCls}-lg`);
};
var genBlockButtonStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: { [`&${componentCls}-block`]: { width: "100%" } } };
};
var style_default$31 = genStyleHooks("Button", (token) => {
	const buttonToken = prepareToken$4(token);
	return [
		genSharedButtonStyle(buttonToken),
		genSizeBaseButtonStyle(buttonToken),
		genSizeSmallButtonStyle(buttonToken),
		genSizeLargeButtonStyle(buttonToken),
		genBlockButtonStyle(buttonToken),
		genVariantStyle(buttonToken),
		genGroupStyle$2(buttonToken)
	];
}, prepareComponentToken$27, { unitless: {
	fontWeight: true,
	contentLineHeight: true,
	contentLineHeightSM: true,
	contentLineHeightLG: true
} });
//#endregion
//#region node_modules/antd/es/style/compact-item.js
function compactItemBorder(token, parentCls, options, prefixCls) {
	const { focusElCls, focus, borderElCls } = options;
	const childCombinator = borderElCls ? "> *" : "";
	const hoverEffects = [
		"hover",
		focus ? "focus" : null,
		"active"
	].filter(Boolean).map((n) => `&:${n} ${childCombinator}`).join(",");
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal() },
		[`&-item:not(${prefixCls}-status-success)`]: { zIndex: 2 },
		"&-item": {
			[hoverEffects]: { zIndex: 3 },
			...focusElCls ? { [`&${focusElCls}`]: { zIndex: 3 } } : {},
			[`&[disabled] ${childCombinator}`]: { zIndex: 0 }
		}
	};
}
function compactItemBorderRadius(prefixCls, parentCls, options) {
	const { borderElCls } = options;
	const childCombinator = borderElCls ? `> ${borderElCls}` : "";
	return {
		[`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: { borderRadius: 0 },
		[`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: { [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
			borderStartEndRadius: 0,
			borderEndEndRadius: 0
		} },
		[`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: { [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0
		} }
	};
}
function genCompactItemStyle(token, options = { focus: true }) {
	const { componentCls } = token;
	const { componentCls: customizePrefixCls } = options;
	const mergedComponentCls = customizePrefixCls || componentCls;
	const compactCls = `${mergedComponentCls}-compact`;
	return { [compactCls]: {
		...compactItemBorder(token, compactCls, options, mergedComponentCls),
		...compactItemBorderRadius(mergedComponentCls, compactCls, options)
	} };
}
//#endregion
//#region node_modules/antd/es/style/compact-item-vertical.js
function compactItemVerticalBorder(token, parentCls, prefixCls) {
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginBottom: token.calc(token.lineWidth).mul(-1).equal() },
		[`&-item:not(${prefixCls}-status-success)`]: { zIndex: 2 },
		"&-item": {
			"&:hover,&:focus,&:active": { zIndex: 3 },
			"&[disabled]": { zIndex: 0 }
		}
	};
}
function compactItemBorderVerticalRadius(prefixCls, parentCls) {
	return {
		[`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: { borderRadius: 0 },
		[`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: { [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
			borderEndEndRadius: 0,
			borderEndStartRadius: 0
		} },
		[`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: { [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
			borderStartStartRadius: 0,
			borderStartEndRadius: 0
		} }
	};
}
function genCompactItemVerticalStyle(token) {
	const compactCls = `${token.componentCls}-compact-vertical`;
	return { [compactCls]: {
		...compactItemVerticalBorder(token, compactCls, token.componentCls),
		...compactItemBorderVerticalRadius(token.componentCls, compactCls)
	} };
}
//#endregion
//#region node_modules/antd/es/button/style/compact.js
var genButtonCompactStyle = (token) => {
	const { antCls, componentCls, lineWidth, calc, colorBgContainer } = token;
	const solidSelector = `${componentCls}-variant-solid:not([disabled])`;
	const insetOffset = calc(lineWidth).mul(-1).equal();
	const [varName, varRef] = genCssVar(antCls, "btn");
	const getCompactBorderStyle = (vertical) => {
		return { [`${componentCls}-compact${vertical ? "-vertical" : ""}-item`]: {
			[varName("compact-connect-border-color")]: varRef("bg-color-hover"),
			[`&${solidSelector}`]: {
				transition: `none`,
				[`& + ${solidSelector}:before`]: [{
					position: "absolute",
					backgroundColor: varRef("compact-connect-border-color"),
					content: "\"\""
				}, vertical ? {
					top: insetOffset,
					insetInline: insetOffset,
					height: lineWidth
				} : {
					insetBlock: insetOffset,
					insetInlineStart: insetOffset,
					width: lineWidth
				}],
				"&:hover:before": { display: "none" }
			}
		} };
	};
	return [
		getCompactBorderStyle(),
		getCompactBorderStyle(true),
		{ [`${solidSelector}${componentCls}-color-default`]: { [varName("compact-connect-border-color")]: `color-mix(in srgb, ${varRef("bg-color-hover")} 75%, ${colorBgContainer})` } }
	];
};
var compact_default = genSubStyleComponent(["Button", "compact"], (token) => {
	const buttonToken = prepareToken$4(token);
	return [
		genCompactItemStyle(buttonToken),
		genCompactItemVerticalStyle(buttonToken),
		genButtonCompactStyle(buttonToken)
	];
}, prepareComponentToken$27);
//#endregion
//#region node_modules/antd/es/button/Button.js
function getLoadingConfig(loading) {
	if (typeof loading === "object" && loading) {
		let delay = loading?.delay;
		delay = !Number.isNaN(delay) && typeof delay === "number" ? delay : 0;
		return {
			loading: delay <= 0,
			delay
		};
	}
	return {
		loading: !!loading,
		delay: 0
	};
}
var ButtonTypeMap = {
	default: ["default", "outlined"],
	primary: ["primary", "solid"],
	dashed: ["default", "dashed"],
	link: ["link", "link"],
	text: ["default", "text"]
};
var Button = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { _skipSemantic, loading = false, prefixCls: customizePrefixCls, color, variant, type, danger = false, shape: customizeShape, size: customizeSize, disabled: customDisabled, className, rootClassName, children, icon, iconPosition, iconPlacement, ghost = false, block = false, htmlType = "button", classNames, styles, style, autoInsertSpace, autoFocus, ...rest } = props;
	const childNodes = toArray$1(children);
	const mergedType = type || "default";
	const { getPrefixCls, direction, autoInsertSpace: contextAutoInsertSpace, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, loadingIcon: contextLoadingIcon, shape: contextShape, color: contextColor, variant: contextVariant } = useComponentConfig("button");
	const mergedShape = customizeShape || contextShape || "default";
	const [parsedColor, parsedVariant] = (0, import_react.useMemo)(() => {
		if (color && variant) return [color, variant];
		if (type || danger) {
			const colorVariantPair = ButtonTypeMap[mergedType] || [];
			if (danger) return ["danger", colorVariantPair[1]];
			return colorVariantPair;
		}
		if (contextColor && contextVariant) return [contextColor, contextVariant];
		return ["default", "outlined"];
	}, [
		color,
		variant,
		type,
		danger,
		contextColor,
		contextVariant,
		mergedType
	]);
	const [mergedColor, mergedVariant] = (0, import_react.useMemo)(() => {
		if (ghost && parsedVariant === "solid") return [parsedColor, "outlined"];
		return [parsedColor, parsedVariant];
	}, [
		parsedColor,
		parsedVariant,
		ghost
	]);
	const isDanger = mergedColor === "danger";
	const mergedColorText = isDanger ? "dangerous" : mergedColor;
	const mergedInsertSpace = autoInsertSpace ?? contextAutoInsertSpace ?? true;
	const prefixCls = getPrefixCls("btn", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$31(prefixCls);
	const disabled = (0, import_react.useContext)(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const groupSize = (0, import_react.useContext)(GroupSizeContext);
	const loadingOrDelay = (0, import_react.useMemo)(() => getLoadingConfig(loading), [loading]);
	const [innerLoading, setInnerLoading] = (0, import_react.useState)(loadingOrDelay.loading);
	const [hasTwoCNChar, setHasTwoCNChar] = (0, import_react.useState)(false);
	const buttonRef = (0, import_react.useRef)(null);
	const mergedRef = useComposeRef(ref, buttonRef);
	const needInserted = childNodes.length === 1 && !icon && !isUnBorderedButtonVariant(mergedVariant);
	const isMountRef = (0, import_react.useRef)(true);
	import_react.useEffect(() => {
		isMountRef.current = false;
		return () => {
			isMountRef.current = true;
		};
	}, []);
	useLayoutEffect(() => {
		let delayTimer = null;
		if (loadingOrDelay.delay > 0) delayTimer = setTimeout(() => {
			delayTimer = null;
			setInnerLoading(true);
		}, loadingOrDelay.delay);
		else setInnerLoading(loadingOrDelay.loading);
		function cleanupTimer() {
			if (delayTimer) {
				clearTimeout(delayTimer);
				delayTimer = null;
			}
		}
		return cleanupTimer;
	}, [loadingOrDelay.delay, loadingOrDelay.loading]);
	(0, import_react.useEffect)(() => {
		if (!buttonRef.current || !mergedInsertSpace) return;
		const buttonText = buttonRef.current.textContent || "";
		if (needInserted && isTwoCNChar(buttonText)) {
			if (!hasTwoCNChar) setHasTwoCNChar(true);
		} else if (hasTwoCNChar) setHasTwoCNChar(false);
	});
	(0, import_react.useEffect)(() => {
		if (autoFocus && buttonRef.current) buttonRef.current.focus();
	}, []);
	const handleClick = import_react.useCallback((e) => {
		if (innerLoading || mergedDisabled) {
			e.preventDefault();
			return;
		}
		props.onClick?.("href" in props ? e : e);
	}, [
		props.onClick,
		innerLoading,
		mergedDisabled
	]);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const sizeFullName = useSize((ctxSize) => customizeSize ?? compactSize ?? groupSize ?? ctxSize);
	const iconType = innerLoading ? "loading" : icon;
	const mergedIconPlacement = iconPlacement ?? iconPosition ?? "start";
	const linkButtonRestProps = omit(rest, ["navigate"]);
	const mergedProps = {
		...props,
		type: mergedType,
		color: mergedColor,
		variant: mergedVariant,
		danger: isDanger,
		shape: mergedShape,
		size: sizeFullName,
		disabled: mergedDisabled,
		loading: innerLoading,
		iconPlacement: mergedIconPlacement
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([_skipSemantic ? void 0 : contextClassNames, classNames], [_skipSemantic ? void 0 : contextStyles, styles], { props: mergedProps });
	const classes = clsx(prefixCls, hashId, cssVarCls, {
		[`${prefixCls}-${mergedShape}`]: mergedShape !== "default" && mergedShape !== "square" && mergedShape,
		[`${prefixCls}-${mergedType}`]: mergedType,
		[`${prefixCls}-dangerous`]: danger,
		[`${prefixCls}-color-${mergedColorText}`]: mergedColorText,
		[`${prefixCls}-variant-${mergedVariant}`]: mergedVariant,
		[`${prefixCls}-lg`]: sizeFullName === "large",
		[`${prefixCls}-sm`]: sizeFullName === "small",
		[`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
		[`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonVariant(mergedVariant),
		[`${prefixCls}-loading`]: innerLoading,
		[`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && mergedInsertSpace && !innerLoading,
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-icon-end`]: mergedIconPlacement === "end"
	}, compactItemClassnames, className, rootClassName, contextClassName, mergedClassNames.root);
	const fullStyle = {
		...mergedStyles.root,
		...contextStyle,
		...style
	};
	const iconSharedProps = {
		className: mergedClassNames.icon,
		style: mergedStyles.icon
	};
	/**
	* Extract icon node
	* If there is a custom icon and not in loading state: show custom icon
	*/
	const iconWrapperElement = (child) => /* @__PURE__ */ import_react.createElement(IconWrapper, {
		prefixCls,
		...iconSharedProps
	}, child);
	const defaultLoadingIconElement = /* @__PURE__ */ import_react.createElement(DefaultLoadingIcon, {
		existIcon: !!icon,
		prefixCls,
		loading: innerLoading,
		mount: isMountRef.current,
		...iconSharedProps
	});
	const mergedLoadingIcon = loading && typeof loading === "object" ? loading.icon || contextLoadingIcon : contextLoadingIcon;
	/**
	* Using if-else statements can improve code readability without affecting future expansion.
	*/
	let iconNode;
	if (icon && !innerLoading) iconNode = iconWrapperElement(icon);
	else if (loading && mergedLoadingIcon) iconNode = iconWrapperElement(mergedLoadingIcon);
	else iconNode = defaultLoadingIconElement;
	const contentNode = isNonNullable(children) ? spaceChildren(children, needInserted && mergedInsertSpace, mergedStyles.content, mergedClassNames.content) : null;
	if (linkButtonRestProps.href !== void 0) return /* @__PURE__ */ import_react.createElement("a", {
		...linkButtonRestProps,
		className: clsx(classes, { [`${prefixCls}-disabled`]: mergedDisabled }),
		href: mergedDisabled ? void 0 : linkButtonRestProps.href,
		style: fullStyle,
		onClick: handleClick,
		ref: mergedRef,
		tabIndex: mergedDisabled ? -1 : 0,
		"aria-disabled": mergedDisabled
	}, iconNode, contentNode);
	let buttonNode = /* @__PURE__ */ import_react.createElement("button", {
		...rest,
		type: htmlType,
		className: classes,
		style: fullStyle,
		onClick: handleClick,
		disabled: mergedDisabled,
		ref: mergedRef
	}, iconNode, contentNode, compactItemClassnames && /* @__PURE__ */ import_react.createElement(compact_default, { prefixCls }));
	if (!isUnBorderedButtonVariant(mergedVariant)) buttonNode = /* @__PURE__ */ import_react.createElement(Wave, {
		component: "Button",
		disabled: innerLoading
	}, buttonNode);
	return buttonNode;
});
Button.Group = ButtonGroup;
Button.__ANT_BUTTON = true;
//#endregion
//#region node_modules/antd/es/_util/ActionButton.js
var isThenable = (thing) => {
	return typeof thing?.then === "function";
};
var ActionButton = (props) => {
	const { type, children, prefixCls, buttonProps, close, autoFocus, emitEvent, isSilent, quitOnNullishReturnValue, actionFn } = props;
	const clickedRef = import_react.useRef(false);
	const buttonRef = import_react.useRef(null);
	const [loading, setLoading] = useSafeState(false);
	const onInternalClose = (...args) => {
		close?.(...args);
	};
	import_react.useEffect(() => {
		let timeoutId = null;
		if (autoFocus) timeoutId = setTimeout(() => {
			buttonRef.current?.focus({ preventScroll: true });
		});
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [autoFocus]);
	const handlePromiseOnOk = (returnValueOfOnOk) => {
		if (!isThenable(returnValueOfOnOk)) return;
		setLoading(true);
		returnValueOfOnOk.then((...args) => {
			setLoading(false, true);
			onInternalClose.apply(void 0, args);
			clickedRef.current = false;
		}, (e) => {
			setLoading(false, true);
			clickedRef.current = false;
			if (isSilent?.()) return;
			return Promise.reject(e);
		});
	};
	const onClick = (e) => {
		if (clickedRef.current) return;
		clickedRef.current = true;
		if (!actionFn) {
			onInternalClose();
			return;
		}
		let returnValueOfOnOk;
		if (emitEvent) {
			returnValueOfOnOk = actionFn(e);
			if (quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
				clickedRef.current = false;
				onInternalClose(e);
				return;
			}
		} else if (actionFn.length) {
			returnValueOfOnOk = actionFn(close);
			clickedRef.current = false;
		} else {
			returnValueOfOnOk = actionFn();
			if (!isThenable(returnValueOfOnOk)) {
				onInternalClose();
				return;
			}
		}
		handlePromiseOnOk(returnValueOfOnOk);
	};
	return /* @__PURE__ */ import_react.createElement(Button, {
		...convertLegacyProps(type),
		onClick,
		loading,
		prefixCls,
		...buttonProps,
		ref: buttonRef
	}, children);
};
//#endregion
//#region node_modules/antd/es/modal/context.js
var ModalContext = /* @__PURE__ */ import_react.createContext({});
var { Provider: ModalContextProvider } = ModalContext;
//#endregion
//#region node_modules/antd/es/modal/components/ConfirmCancelBtn.js
var ConfirmCancelBtn = () => {
	const { autoFocusButton, cancelButtonProps, cancelTextLocale, isSilent, mergedOkCancel, rootPrefixCls, close, onCancel, onConfirm, onClose } = (0, import_react.useContext)(ModalContext);
	return mergedOkCancel ? /* @__PURE__ */ import_react.createElement(ActionButton, {
		isSilent,
		actionFn: onCancel,
		close: (...args) => {
			close?.(...args);
			onConfirm?.(false);
			onClose?.();
		},
		autoFocus: autoFocusButton === "cancel",
		buttonProps: cancelButtonProps,
		prefixCls: `${rootPrefixCls}-btn`
	}, cancelTextLocale) : null;
};
//#endregion
//#region node_modules/antd/es/modal/components/ConfirmOkBtn.js
var ConfirmOkBtn = () => {
	const { autoFocusButton, close, isSilent, okButtonProps, rootPrefixCls, okTextLocale, okType, onConfirm, onOk, onClose } = (0, import_react.useContext)(ModalContext);
	return /* @__PURE__ */ import_react.createElement(ActionButton, {
		isSilent,
		type: okType || "primary",
		actionFn: onOk,
		close: (...args) => {
			close?.(...args);
			onConfirm?.(true);
			onClose?.();
		},
		autoFocus: autoFocusButton === "ok",
		buttonProps: okButtonProps,
		prefixCls: `${rootPrefixCls}-btn`
	}, okTextLocale);
};
//#endregion
//#region node_modules/antd/es/form/context.js
var FormContext = /* @__PURE__ */ import_react.createContext({
	labelAlign: "right",
	layout: "horizontal",
	itemRef: () => {}
});
var NoStyleItemContext = /* @__PURE__ */ import_react.createContext(null);
var FormProvider = (props) => {
	const providerProps = omit(props, ["prefixCls"]);
	return /* @__PURE__ */ import_react.createElement(FormProvider$1, { ...providerProps });
};
var FormItemPrefixContext = /* @__PURE__ */ import_react.createContext({ prefixCls: "" });
var FormItemInputContext = /* @__PURE__ */ import_react.createContext({});
var NoFormStyle = ({ children, status, override }) => {
	const formItemInputContext = import_react.useContext(FormItemInputContext);
	const newFormItemInputContext = import_react.useMemo(() => {
		const newContext = { ...formItemInputContext };
		if (override) delete newContext.isFormItemInput;
		if (status) {
			delete newContext.status;
			delete newContext.hasFeedback;
			delete newContext.feedbackIcon;
		}
		return newContext;
	}, [
		status,
		override,
		formItemInputContext
	]);
	return /* @__PURE__ */ import_react.createElement(FormItemInputContext.Provider, { value: newFormItemInputContext }, children);
};
var VariantContext = /* @__PURE__ */ import_react.createContext(void 0);
//#endregion
//#region node_modules/antd/es/_util/ContextIsolator.js
var ContextIsolator = (props) => {
	const { space, form, children } = props;
	if (!isNonNullable(children)) return null;
	let result = children;
	if (form) result = /* @__PURE__ */ import_react.createElement(NoFormStyle, {
		override: true,
		status: true
	}, result);
	if (space) result = /* @__PURE__ */ import_react.createElement(NoCompactStyle, null, result);
	return result;
};
//#endregion
//#region node_modules/antd/es/_util/styleChecker.js
var canUseDocElement = () => canUseDom() && window.document.documentElement;
//#endregion
//#region node_modules/antd/es/drawer/useFocusable.js
function useFocusable(focusable, defaultTrap, legacyFocusTriggerAfterClose) {
	return (0, import_react.useMemo)(() => {
		return {
			trap: defaultTrap ?? true,
			focusTriggerAfterClose: legacyFocusTriggerAfterClose ?? true,
			...focusable
		};
	}, [
		focusable,
		defaultTrap,
		legacyFocusTriggerAfterClose
	]);
}
//#endregion
//#region node_modules/antd/es/skeleton/Element.js
var Element = (props) => {
	const { prefixCls, className, style, size, shape } = props;
	const sizeCls = clsx({
		[`${prefixCls}-lg`]: size === "large",
		[`${prefixCls}-sm`]: size === "small"
	});
	const shapeCls = clsx({
		[`${prefixCls}-circle`]: shape === "circle",
		[`${prefixCls}-square`]: shape === "square",
		[`${prefixCls}-round`]: shape === "round"
	});
	const sizeStyle = import_react.useMemo(() => typeof size === "number" ? {
		width: size,
		height: size,
		lineHeight: `${size}px`
	} : {}, [size]);
	return /* @__PURE__ */ import_react.createElement("span", {
		className: clsx(prefixCls, sizeCls, shapeCls, className),
		style: {
			...sizeStyle,
			...style
		}
	});
};
//#endregion
//#region node_modules/antd/es/skeleton/style/index.js
var skeletonClsLoading = new Keyframe(`ant-skeleton-loading`, {
	"0%": { backgroundPosition: "100% 50%" },
	"100%": { backgroundPosition: "0 50%" }
});
var genSkeletonElementCommonSize = (size) => ({
	height: size,
	lineHeight: unit(size)
});
var genSkeletonElementSize = (size) => ({
	width: size,
	...genSkeletonElementCommonSize(size)
});
var genSkeletonColor = (token) => ({
	background: token.skeletonLoadingBackground,
	backgroundSize: "400% 100%",
	animationName: skeletonClsLoading,
	animationDuration: token.skeletonLoadingMotionDuration,
	animationTimingFunction: "ease",
	animationIterationCount: "infinite"
});
var genSkeletonElementInputSize = (size, calc) => ({
	width: calc(size).mul(5).equal(),
	minWidth: calc(size).mul(5).equal(),
	...genSkeletonElementCommonSize(size)
});
var genSkeletonElementAvatar = (token) => {
	const { skeletonAvatarCls, gradientFromColor, controlHeight, controlHeightLG, controlHeightSM } = token;
	return {
		[skeletonAvatarCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			...genSkeletonElementSize(controlHeight)
		},
		[`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
		[`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: { ...genSkeletonElementSize(controlHeightLG) },
		[`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: { ...genSkeletonElementSize(controlHeightSM) }
	};
};
var genSkeletonElementInput = (token) => {
	const { controlHeight, borderRadiusSM, skeletonInputCls, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return {
		[skeletonInputCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			borderRadius: borderRadiusSM,
			...genSkeletonElementInputSize(controlHeight, calc)
		},
		[`${skeletonInputCls}-lg`]: { ...genSkeletonElementInputSize(controlHeightLG, calc) },
		[`${skeletonInputCls}-sm`]: { ...genSkeletonElementInputSize(controlHeightSM, calc) }
	};
};
var genSkeletonElementShape = (token) => {
	const { gradientFromColor, borderRadiusSM, imageSizeBase, calc } = token;
	return {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		background: gradientFromColor,
		borderRadius: borderRadiusSM,
		...genSkeletonElementSize(calc(imageSizeBase).mul(2).equal())
	};
};
var genSkeletonElementNode = (token) => {
	return { [token.skeletonNodeCls]: { ...genSkeletonElementShape(token) } };
};
var genSkeletonElementImage = (token) => {
	const { skeletonImageCls, imageSizeBase, calc } = token;
	return {
		[skeletonImageCls]: {
			...genSkeletonElementShape(token),
			[`${skeletonImageCls}-path`]: { fill: "#bfbfbf" },
			[`${skeletonImageCls}-svg`]: {
				...genSkeletonElementSize(imageSizeBase),
				maxWidth: calc(imageSizeBase).mul(4).equal(),
				maxHeight: calc(imageSizeBase).mul(4).equal()
			},
			[`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: { borderRadius: "50%" }
		},
		[`${skeletonImageCls}${skeletonImageCls}-circle`]: { borderRadius: "50%" }
	};
};
var genSkeletonElementButtonShape = (token, size, buttonCls) => {
	const { skeletonButtonCls } = token;
	return {
		[`${buttonCls}${skeletonButtonCls}-circle`]: {
			width: size,
			minWidth: size,
			borderRadius: "50%"
		},
		[`${buttonCls}${skeletonButtonCls}-round`]: { borderRadius: size }
	};
};
var genSkeletonElementButtonSize = (size, calc) => ({
	width: calc(size).mul(2).equal(),
	minWidth: calc(size).mul(2).equal(),
	...genSkeletonElementCommonSize(size)
});
var genSkeletonElementButton = (token) => {
	const { borderRadiusSM, skeletonButtonCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return {
		[skeletonButtonCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			borderRadius: borderRadiusSM,
			width: calc(controlHeight).mul(2).equal(),
			minWidth: calc(controlHeight).mul(2).equal(),
			...genSkeletonElementButtonSize(controlHeight, calc)
		},
		...genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls),
		[`${skeletonButtonCls}-lg`]: { ...genSkeletonElementButtonSize(controlHeightLG, calc) },
		...genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`),
		[`${skeletonButtonCls}-sm`]: { ...genSkeletonElementButtonSize(controlHeightSM, calc) },
		...genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`)
	};
};
var genBaseStyle$10 = (token) => {
	const { componentCls, skeletonAvatarCls, skeletonTitleCls, skeletonParagraphCls, skeletonButtonCls, skeletonInputCls, skeletonNodeCls, skeletonImageCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, padding, marginSM, borderRadius, titleHeight, blockRadius, paragraphLiHeight, controlHeightXS, paragraphMarginTop } = token;
	return {
		[componentCls]: {
			display: "table",
			width: "100%",
			[`${componentCls}-header`]: {
				display: "table-cell",
				paddingInlineEnd: padding,
				verticalAlign: "top",
				[skeletonAvatarCls]: {
					display: "inline-block",
					verticalAlign: "top",
					background: gradientFromColor,
					...genSkeletonElementSize(controlHeight)
				},
				[`${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
				[`${skeletonAvatarCls}-lg`]: { ...genSkeletonElementSize(controlHeightLG) },
				[`${skeletonAvatarCls}-sm`]: { ...genSkeletonElementSize(controlHeightSM) }
			},
			[`${componentCls}-section`]: {
				display: "table-cell",
				width: "100%",
				verticalAlign: "top",
				[skeletonTitleCls]: {
					width: "100%",
					height: titleHeight,
					background: gradientFromColor,
					borderRadius: blockRadius,
					[`+ ${skeletonParagraphCls}`]: { marginBlockStart: controlHeightSM }
				},
				[skeletonParagraphCls]: {
					padding: 0,
					"> li": {
						width: "100%",
						height: paragraphLiHeight,
						listStyle: "none",
						background: gradientFromColor,
						borderRadius: blockRadius,
						"+ li": { marginBlockStart: controlHeightXS }
					}
				},
				[`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: { width: "61%" }
			},
			[`&-round ${componentCls}-section`]: { [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: { borderRadius } }
		},
		[`${componentCls}-with-avatar ${componentCls}-section`]: { [skeletonTitleCls]: {
			marginBlockStart: marginSM,
			[`+ ${skeletonParagraphCls}`]: { marginBlockStart: paragraphMarginTop }
		} },
		[`${componentCls}${componentCls}-element`]: {
			display: "inline-block",
			width: "auto",
			...genSkeletonElementButton(token),
			...genSkeletonElementAvatar(token),
			...genSkeletonElementInput(token),
			...genSkeletonElementNode(token),
			...genSkeletonElementImage(token)
		},
		[`${componentCls}${componentCls}-block`]: {
			width: "100%",
			[skeletonButtonCls]: { width: "100%" },
			[skeletonInputCls]: { width: "100%" }
		},
		[`${componentCls}${componentCls}-active`]: { [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonNodeCls},
        ${skeletonImageCls}
      `]: { ...genSkeletonColor(token) } }
	};
};
var prepareComponentToken$26 = (token) => {
	const { colorFillContent, colorFill } = token;
	const gradientFromColor = colorFillContent;
	const gradientToColor = colorFill;
	return {
		color: gradientFromColor,
		colorGradientEnd: gradientToColor,
		gradientFromColor,
		gradientToColor,
		titleHeight: token.controlHeight / 2,
		blockRadius: token.borderRadiusSM,
		paragraphMarginTop: token.marginLG + token.marginXXS,
		paragraphLiHeight: token.controlHeight / 2
	};
};
var style_default$30 = genStyleHooks("Skeleton", (token) => {
	const { componentCls, calc } = token;
	return genBaseStyle$10(merge$1(token, {
		skeletonAvatarCls: `${componentCls}-avatar`,
		skeletonTitleCls: `${componentCls}-title`,
		skeletonParagraphCls: `${componentCls}-paragraph`,
		skeletonButtonCls: `${componentCls}-button`,
		skeletonInputCls: `${componentCls}-input`,
		skeletonNodeCls: `${componentCls}-node`,
		skeletonImageCls: `${componentCls}-image`,
		imageSizeBase: calc(token.controlHeight).mul(1.5).equal(),
		borderRadius: 100,
		skeletonLoadingBackground: `linear-gradient(90deg, ${token.gradientFromColor} 25%, ${token.gradientToColor} 37%, ${token.gradientFromColor} 63%)`,
		skeletonLoadingMotionDuration: "1.4s"
	}));
}, prepareComponentToken$26, { deprecatedTokens: [["color", "gradientFromColor"], ["colorGradientEnd", "gradientToColor"]] });
//#endregion
//#region node_modules/antd/es/skeleton/Avatar.js
var SkeletonAvatar = (props) => {
	const { prefixCls: customizePrefixCls, className, classNames, rootClassName, active, style, styles, shape = "circle", size: customSize, ...rest } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$30(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const cls = clsx(prefixCls, `${prefixCls}-element`, { [`${prefixCls}-active`]: active }, classNames?.root, className, rootClassName, hashId, cssVarCls);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /* @__PURE__ */ import_react.createElement(Element, {
		prefixCls: `${prefixCls}-avatar`,
		className: classNames?.content,
		style: {
			...styles?.content,
			...style
		},
		shape,
		size: mergedSize,
		...rest
	}));
};
//#endregion
//#region node_modules/antd/es/skeleton/Button.js
var SkeletonButton = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, classNames, active, style, styles, block = false, size: customSize, ...rest } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$30(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const cls = clsx(prefixCls, `${prefixCls}-element`, {
		[`${prefixCls}-active`]: active,
		[`${prefixCls}-block`]: block
	}, classNames?.root, className, rootClassName, hashId, cssVarCls);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /* @__PURE__ */ import_react.createElement(Element, {
		prefixCls: `${prefixCls}-button`,
		className: classNames?.content,
		style: {
			...styles?.content,
			...style
		},
		size: mergedSize,
		...rest
	}));
};
//#endregion
//#region node_modules/antd/es/skeleton/Node.js
var SkeletonNode = (props) => {
	const { prefixCls: customizePrefixCls, className, classNames, rootClassName, internalClassName, style, styles, active, children } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$30(prefixCls);
	const cls = clsx(prefixCls, `${prefixCls}-element`, { [`${prefixCls}-active`]: active }, hashId, classNames?.root, className, rootClassName, cssVarCls);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(classNames?.content, internalClassName || `${prefixCls}-node`),
		style: {
			...styles?.content,
			...style
		}
	}, children));
};
//#endregion
//#region node_modules/antd/es/skeleton/Image.js
var SkeletonImage = (props) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", props.prefixCls);
	return /* @__PURE__ */ import_react.createElement(SkeletonNode, {
		...props,
		internalClassName: `${prefixCls}-image`
	}, /* @__PURE__ */ import_react.createElement("svg", {
		viewBox: "0 0 1098 1024",
		xmlns: "http://www.w3.org/2000/svg",
		className: `${prefixCls}-image-svg`
	}, /* @__PURE__ */ import_react.createElement("title", null, "Image placeholder"), /* @__PURE__ */ import_react.createElement("path", {
		d: "M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6",
		className: `${prefixCls}-image-path`
	})));
};
//#endregion
//#region node_modules/antd/es/skeleton/Input.js
var SkeletonInput = (props) => {
	const { prefixCls: customizePrefixCls, className, classNames, rootClassName, active, block, style, styles, size: customSize, ...rest } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$30(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const cls = clsx(prefixCls, `${prefixCls}-element`, {
		[`${prefixCls}-active`]: active,
		[`${prefixCls}-block`]: block
	}, classNames?.root, className, rootClassName, hashId, cssVarCls);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /* @__PURE__ */ import_react.createElement(Element, {
		prefixCls: `${prefixCls}-input`,
		className: classNames?.content,
		style: {
			...styles?.content,
			...style
		},
		size: mergedSize,
		...rest
	}));
};
//#endregion
//#region node_modules/antd/es/skeleton/Paragraph.js
var getWidth = (index, props) => {
	const { width, rows = 2 } = props;
	if (Array.isArray(width)) return width[index];
	if (rows - 1 === index) return width;
};
var Paragraph = (props) => {
	const { prefixCls, className, style, rows = 0 } = props;
	const rowList = Array.from({ length: rows }).map((_, index) => /* @__PURE__ */ import_react.createElement("li", {
		key: index,
		style: { width: getWidth(index, props) }
	}));
	return /* @__PURE__ */ import_react.createElement("ul", {
		className: clsx(prefixCls, className),
		style
	}, rowList);
};
//#endregion
//#region node_modules/antd/es/skeleton/Title.js
var Title = ({ prefixCls, className, width, style }) => /* @__PURE__ */ import_react.createElement("h3", {
	className: clsx(prefixCls, className),
	style: {
		width,
		...style
	}
});
//#endregion
//#region node_modules/antd/es/skeleton/Skeleton.js
function getComponentProps(prop) {
	if (prop && typeof prop === "object") return prop;
	return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
	if (hasTitle && !hasParagraph) return {
		size: "large",
		shape: "square"
	};
	return {
		size: "large",
		shape: "circle"
	};
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
	if (!hasAvatar && hasParagraph) return { width: "38%" };
	if (hasAvatar && hasParagraph) return { width: "50%" };
	return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
	const basicProps = {};
	if (!hasAvatar || !hasTitle) basicProps.width = "61%";
	if (!hasAvatar && hasTitle) basicProps.rows = 3;
	else basicProps.rows = 2;
	return basicProps;
}
var Skeleton = (props) => {
	const { prefixCls: customizePrefixCls, loading, className, rootClassName, classNames, style, styles, children, avatar = false, title = true, paragraph = true, active, round } = props;
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("skeleton");
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$30(prefixCls);
	const mergedProps = {
		...props,
		avatar,
		title,
		paragraph
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	if (loading || !("loading" in props)) {
		const hasAvatar = !!avatar;
		const hasTitle = !!title;
		const hasParagraph = !!paragraph;
		let avatarNode;
		if (hasAvatar) {
			const avatarProps = {
				className: mergedClassNames.avatar,
				prefixCls: `${prefixCls}-avatar`,
				...getAvatarBasicProps(hasTitle, hasParagraph),
				...getComponentProps(avatar),
				style: mergedStyles.avatar
			};
			avatarNode = /* @__PURE__ */ import_react.createElement("div", {
				className: clsx(mergedClassNames.header, `${prefixCls}-header`),
				style: mergedStyles.header
			}, /* @__PURE__ */ import_react.createElement(Element, { ...avatarProps }));
		}
		let contentNode;
		if (hasTitle || hasParagraph) {
			let $title;
			if (hasTitle) {
				const titleProps = {
					className: mergedClassNames.title,
					prefixCls: `${prefixCls}-title`,
					...getTitleBasicProps(hasAvatar, hasParagraph),
					...getComponentProps(title),
					style: mergedStyles.title
				};
				$title = /* @__PURE__ */ import_react.createElement(Title, { ...titleProps });
			}
			let paragraphNode;
			if (hasParagraph) {
				const paragraphProps = {
					className: mergedClassNames.paragraph,
					prefixCls: `${prefixCls}-paragraph`,
					...getParagraphBasicProps(hasAvatar, hasTitle),
					...getComponentProps(paragraph),
					style: mergedStyles.paragraph
				};
				paragraphNode = /* @__PURE__ */ import_react.createElement(Paragraph, { ...paragraphProps });
			}
			contentNode = /* @__PURE__ */ import_react.createElement("div", {
				className: clsx(mergedClassNames.section, `${prefixCls}-section`),
				style: mergedStyles.section
			}, $title, paragraphNode);
		}
		const cls = clsx(prefixCls, {
			[`${prefixCls}-with-avatar`]: hasAvatar,
			[`${prefixCls}-active`]: active,
			[`${prefixCls}-rtl`]: direction === "rtl",
			[`${prefixCls}-round`]: round
		}, mergedClassNames.root, contextClassName, className, rootClassName, hashId, cssVarCls);
		return /* @__PURE__ */ import_react.createElement("div", {
			className: cls,
			style: {
				...mergedStyles.root,
				...contextStyle,
				...style
			}
		}, avatarNode, contentNode);
	}
	return children ?? null;
};
Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;
//#endregion
//#region node_modules/antd/es/skeleton/index.js
var skeleton_default = Skeleton;
//#endregion
//#region node_modules/antd/es/watermark/context.js
function voidFunc() {}
var WatermarkContext = /* @__PURE__ */ import_react.createContext({
	add: voidFunc,
	remove: voidFunc
});
function usePanelRef(panelSelector) {
	const watermark = import_react.useContext(WatermarkContext);
	const panelEleRef = import_react.useRef(null);
	return useEvent((ele) => {
		if (ele) {
			const innerContentEle = panelSelector ? ele.querySelector(panelSelector) : ele;
			if (innerContentEle) {
				watermark.add(innerContentEle);
				panelEleRef.current = innerContentEle;
			}
		} else watermark.remove(panelEleRef.current);
	});
}
//#endregion
//#region node_modules/antd/es/modal/components/NormalCancelBtn.js
var NormalCancelBtn = () => {
	const { cancelButtonProps, cancelTextLocale, onCancel } = (0, import_react.useContext)(ModalContext);
	return /* @__PURE__ */ import_react.createElement(Button, {
		onClick: onCancel,
		...cancelButtonProps
	}, cancelTextLocale);
};
//#endregion
//#region node_modules/antd/es/modal/components/NormalOkBtn.js
var NormalOkBtn = () => {
	const { confirmLoading, okButtonProps, okType, okTextLocale, onOk } = (0, import_react.useContext)(ModalContext);
	return /* @__PURE__ */ import_react.createElement(Button, {
		...convertLegacyProps(okType),
		loading: confirmLoading,
		onClick: onOk,
		...okButtonProps
	}, okTextLocale);
};
//#endregion
//#region node_modules/antd/es/modal/shared.js
function renderCloseIcon(prefixCls, closeIcon) {
	return /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-close-x` }, closeIcon || /* @__PURE__ */ import_react.createElement(RefIcon, { className: `${prefixCls}-close-icon` }));
}
var Footer = (props) => {
	const { okText, okType = "primary", cancelText, confirmLoading, onOk, onCancel, okButtonProps, cancelButtonProps, footer } = props;
	const [locale] = useLocale("Modal", getConfirmLocale());
	const okTextLocale = okText || locale?.okText;
	const cancelTextLocale = cancelText || locale?.cancelText;
	const memoizedValue = import_react.useMemo(() => {
		return {
			confirmLoading,
			okButtonProps,
			cancelButtonProps,
			okTextLocale,
			cancelTextLocale,
			okType,
			onOk,
			onCancel
		};
	}, [
		confirmLoading,
		okButtonProps,
		cancelButtonProps,
		okTextLocale,
		cancelTextLocale,
		okType,
		onOk,
		onCancel
	]);
	let footerNode;
	if (typeof footer === "function" || typeof footer === "undefined") {
		footerNode = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(NormalCancelBtn, null), /* @__PURE__ */ import_react.createElement(NormalOkBtn, null));
		if (typeof footer === "function") footerNode = footer(footerNode, {
			OkBtn: NormalOkBtn,
			CancelBtn: NormalCancelBtn
		});
		footerNode = /* @__PURE__ */ import_react.createElement(ModalContextProvider, { value: memoizedValue }, footerNode);
	} else footerNode = footer;
	return /* @__PURE__ */ import_react.createElement(DisabledContextProvider, { disabled: false }, footerNode);
};
//#endregion
//#region node_modules/antd/es/grid/style/index.js
var genGridRowStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "flex",
		flexFlow: "row wrap",
		minWidth: 0,
		"&::before, &::after": { display: "flex" },
		"&-no-wrap": { flexWrap: "nowrap" },
		"&-start": { justifyContent: "flex-start" },
		"&-center": { justifyContent: "center" },
		"&-end": { justifyContent: "flex-end" },
		"&-space-between": { justifyContent: "space-between" },
		"&-space-around": { justifyContent: "space-around" },
		"&-space-evenly": { justifyContent: "space-evenly" },
		"&-top": { alignItems: "flex-start" },
		"&-middle": { alignItems: "center" },
		"&-bottom": { alignItems: "flex-end" }
	} };
};
var genGridColStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		position: "relative",
		maxWidth: "100%",
		minHeight: 1
	} };
};
var genLoopGridColumnsStyle = (token, sizeCls) => {
	const { componentCls, gridColumns, antCls } = token;
	const [gridVarName, gridVarRef] = genCssVar(antCls, "grid");
	const [, colVarRef] = genCssVar(antCls, "col");
	const gridColumnsStyle = {};
	for (let i = gridColumns; i >= 0; i--) if (i === 0) {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = { display: "none" };
		gridColumnsStyle[`${componentCls}-push-${i}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}-pull-${i}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = { marginInlineStart: 0 };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = { order: 0 };
	} else {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = [{
			[gridVarName("display")]: "block",
			display: "block"
		}, {
			display: gridVarRef("display"),
			flex: `0 0 ${i / gridColumns * 100}%`,
			maxWidth: `${i / gridColumns * 100}%`
		}];
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = { insetInlineStart: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = { insetInlineEnd: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = { marginInlineStart: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = { order: i };
	}
	gridColumnsStyle[`${componentCls}${sizeCls}-flex`] = { flex: colVarRef(`${sizeCls.replace(/-/, "")}-flex`) };
	return gridColumnsStyle;
};
var genGridStyle = (token, sizeCls) => genLoopGridColumnsStyle(token, sizeCls);
var genGridMediaStyle = (token, screenSize, sizeCls) => ({ [`@media (min-width: ${unit(screenSize)})`]: { ...genGridStyle(token, sizeCls) } });
var prepareRowComponentToken = () => ({});
var prepareColComponentToken = () => ({});
var useRowStyle = genStyleHooks("Grid", genGridRowStyle, prepareRowComponentToken);
var getMediaSize = (token) => {
	return {
		xs: token.screenXSMin,
		sm: token.screenSMMin,
		md: token.screenMDMin,
		lg: token.screenLGMin,
		xl: token.screenXLMin,
		xxl: token.screenXXLMin,
		xxxl: token.screenXXXLMin
	};
};
var useColStyle = genStyleHooks("Grid", (token) => {
	const gridToken = merge$1(token, { gridColumns: 24 });
	const gridMediaSizesMap = getMediaSize(gridToken);
	delete gridMediaSizesMap.xs;
	return [
		genGridColStyle(gridToken),
		genGridStyle(gridToken, ""),
		genGridStyle(gridToken, "-xs"),
		Object.keys(gridMediaSizesMap).map((key) => genGridMediaStyle(gridToken, gridMediaSizesMap[key], `-${key}`)).reduce((pre, cur) => ({
			...pre,
			...cur
		}), {})
	];
}, prepareColComponentToken);
//#endregion
//#region node_modules/antd/es/modal/style/index.js
function box(position) {
	return {
		position,
		inset: 0
	};
}
var genModalMaskStyle = (token) => {
	const { componentCls, antCls } = token;
	return [{ [`${componentCls}-root`]: {
		[`${componentCls}${antCls}-zoom-enter, ${componentCls}${antCls}-zoom-appear`]: {
			transform: "none",
			opacity: 0,
			animationDuration: token.motionDurationSlow,
			userSelect: "none"
		},
		[`${componentCls}${antCls}-zoom-leave ${componentCls}-container`]: { pointerEvents: "none" },
		[`${componentCls}-mask`]: {
			...box("fixed"),
			zIndex: token.zIndexPopupBase,
			height: "100%",
			backgroundColor: token.colorBgMask,
			pointerEvents: "none",
			[`&${componentCls}-mask-blur`]: { backdropFilter: "blur(4px)" },
			[`${componentCls}-hidden`]: { display: "none" }
		},
		[`${componentCls}-wrap`]: {
			...box("fixed"),
			zIndex: token.zIndexPopupBase,
			overflow: "auto",
			outline: 0,
			WebkitOverflowScrolling: "touch"
		}
	} }, { [`${componentCls}-root`]: initFadeMotion(token) }];
};
var genModalStyle = (token) => {
	const { componentCls, motionDurationMid } = token;
	return [
		{ [`${componentCls}-root`]: {
			[`${componentCls}-wrap-rtl`]: { direction: "rtl" },
			[`${componentCls}-centered`]: {
				textAlign: "center",
				"&::before": {
					display: "inline-block",
					width: 0,
					height: "100%",
					verticalAlign: "middle",
					content: "\"\""
				},
				[componentCls]: {
					top: 0,
					display: "inline-block",
					paddingBottom: 0,
					textAlign: "start",
					verticalAlign: "middle"
				}
			},
			[`@media (max-width: ${token.screenSMMax}px)`]: {
				[componentCls]: {
					maxWidth: "calc(100vw - 16px)",
					margin: `${unit(token.marginXS)} auto`
				},
				[`${componentCls}-centered`]: { [componentCls]: { flex: 1 } }
			}
		} },
		{ [componentCls]: {
			...resetComponent(token),
			pointerEvents: "none",
			position: "relative",
			top: 100,
			width: "auto",
			maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
			margin: "0 auto",
			"&:focus-visible": {
				borderRadius: token.borderRadiusLG,
				...genFocusOutline(token)
			},
			[`${componentCls}-title`]: {
				margin: 0,
				color: token.titleColor,
				fontWeight: token.fontWeightStrong,
				fontSize: token.titleFontSize,
				lineHeight: token.titleLineHeight,
				wordWrap: "break-word"
			},
			[`${componentCls}-container`]: {
				position: "relative",
				backgroundColor: token.contentBg,
				backgroundClip: "padding-box",
				border: 0,
				borderRadius: token.borderRadiusLG,
				boxShadow: token.boxShadow,
				pointerEvents: "auto",
				padding: token.contentPadding
			},
			[`${componentCls}-close`]: {
				position: "absolute",
				top: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
				insetInlineEnd: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
				zIndex: token.calc(token.zIndexPopupBase).add(10).equal(),
				padding: 0,
				color: token.modalCloseIconColor,
				fontWeight: token.fontWeightStrong,
				lineHeight: 1,
				textDecoration: "none",
				background: "transparent",
				borderRadius: token.borderRadiusSM,
				width: token.modalCloseBtnSize,
				height: token.modalCloseBtnSize,
				border: 0,
				outline: 0,
				cursor: "pointer",
				transition: ["color", "background-color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				"&-x": {
					display: "flex",
					fontSize: token.fontSizeLG,
					fontStyle: "normal",
					lineHeight: unit(token.modalCloseBtnSize),
					justifyContent: "center",
					textTransform: "none",
					textRendering: "auto"
				},
				"&:disabled": { pointerEvents: "none" },
				"&:hover": {
					color: token.modalCloseIconHoverColor,
					backgroundColor: token.colorBgTextHover,
					textDecoration: "none"
				},
				"&:active": { backgroundColor: token.colorBgTextActive },
				...genFocusStyle(token)
			},
			[`${componentCls}-header`]: {
				color: token.colorText,
				background: token.headerBg,
				borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
				marginBottom: token.headerMarginBottom,
				padding: token.headerPadding,
				borderBottom: token.headerBorderBottom
			},
			[`${componentCls}-body`]: {
				fontSize: token.fontSize,
				lineHeight: token.lineHeight,
				wordWrap: "break-word",
				padding: token.bodyPadding,
				[`${componentCls}-body-skeleton`]: {
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: `${unit(token.margin)} auto`
				}
			},
			[`${componentCls}-footer`]: {
				textAlign: "end",
				background: token.footerBg,
				marginTop: token.footerMarginTop,
				padding: token.footerPadding,
				borderTop: token.footerBorderTop,
				borderRadius: token.footerBorderRadius,
				[`> ${token.antCls}-btn + ${token.antCls}-btn`]: { marginInlineStart: token.marginXS }
			},
			[`${componentCls}-open`]: { overflow: "hidden" }
		} },
		{ [`${componentCls}-pure-panel`]: {
			top: "auto",
			padding: 0,
			display: "flex",
			flexDirection: "column",
			[`${componentCls}-container,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
				display: "flex",
				flexDirection: "column",
				flex: "auto"
			},
			[`${componentCls}-confirm-body`]: { marginBottom: "auto" }
		} }
	];
};
var genRTLStyle$1 = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-root`]: { [`${componentCls}-wrap-rtl`]: {
		direction: "rtl",
		[`${componentCls}-confirm-body`]: { direction: "rtl" }
	} } };
};
var genResponsiveWidthStyle = (token) => {
	const { componentCls } = token;
	const oriGridMediaSizesMap = getMediaSize(token);
	const gridMediaSizesMap = { ...oriGridMediaSizesMap };
	delete gridMediaSizesMap.xs;
	const cssVarPrefix = `--${componentCls.replace(".", "")}-`;
	const responsiveStyles = Object.keys(gridMediaSizesMap).map((key) => ({ [`@media (min-width: ${unit(gridMediaSizesMap[key])})`]: { width: `var(${cssVarPrefix}${key}-width)` } }));
	return { [`${componentCls}-root`]: { [componentCls]: [].concat(_toConsumableArray(Object.keys(oriGridMediaSizesMap).map((currentKey, index) => {
		const previousKey = Object.keys(oriGridMediaSizesMap)[index - 1];
		return previousKey ? { [`${cssVarPrefix}${currentKey}-width`]: `var(${cssVarPrefix}${previousKey}-width)` } : null;
	})), [{ width: `var(${cssVarPrefix}xs-width)` }], _toConsumableArray(responsiveStyles)) } };
};
var prepareToken$3 = (token) => {
	const headerPaddingVertical = token.padding;
	const headerFontSize = token.fontSizeHeading5;
	const headerLineHeight = token.lineHeightHeading5;
	return merge$1(token, {
		modalHeaderHeight: token.calc(token.calc(headerLineHeight).mul(headerFontSize).equal()).add(token.calc(headerPaddingVertical).mul(2).equal()).equal(),
		modalFooterBorderColorSplit: token.colorSplit,
		modalFooterBorderStyle: token.lineType,
		modalFooterBorderWidth: token.lineWidth,
		modalCloseIconColor: token.colorIcon,
		modalCloseIconHoverColor: token.colorIconHover,
		modalCloseBtnSize: token.controlHeight,
		modalConfirmIconSize: token.fontHeight,
		modalTitleHeight: token.calc(token.titleFontSize).mul(token.titleLineHeight).equal()
	});
};
var prepareComponentToken$25 = (token) => ({
	footerBg: "transparent",
	headerBg: "transparent",
	titleLineHeight: token.lineHeightHeading5,
	titleFontSize: token.fontSizeHeading5,
	contentBg: token.colorBgElevated,
	titleColor: token.colorTextHeading,
	contentPadding: token.wireframe ? 0 : `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
	headerPadding: token.wireframe ? `${unit(token.padding)} ${unit(token.paddingLG)}` : 0,
	headerBorderBottom: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
	headerMarginBottom: token.wireframe ? 0 : token.marginXS,
	bodyPadding: token.wireframe ? token.paddingLG : 0,
	footerPadding: token.wireframe ? `${unit(token.paddingXS)} ${unit(token.padding)}` : 0,
	footerBorderTop: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
	footerBorderRadius: token.wireframe ? `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}` : 0,
	footerMarginTop: token.wireframe ? 0 : token.marginSM,
	confirmBodyPadding: token.wireframe ? `${unit(token.padding * 2)} ${unit(token.padding * 2)} ${unit(token.paddingLG)}` : 0,
	confirmIconMarginInlineEnd: token.wireframe ? token.margin : token.marginSM,
	confirmBtnsMarginTop: token.wireframe ? token.marginLG : token.marginSM,
	mask: true
});
var style_default$29 = genStyleHooks("Modal", (token) => {
	const modalToken = prepareToken$3(token);
	return [
		genModalStyle(modalToken),
		genRTLStyle$1(modalToken),
		genModalMaskStyle(modalToken),
		initZoomMotion(modalToken, "zoom"),
		genResponsiveWidthStyle(modalToken)
	];
}, prepareComponentToken$25, { unitless: { titleLineHeight: true } });
//#endregion
//#region node_modules/antd/es/modal/Modal.js
var mousePosition;
var getClickPosition = (e) => {
	mousePosition = {
		x: e.pageX,
		y: e.pageY
	};
	setTimeout(() => {
		mousePosition = null;
	}, 100);
};
if (canUseDocElement()) document.documentElement.addEventListener("click", getClickPosition, true);
var Modal$1 = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, open, wrapClassName, centered, getContainer, style, width = 520, footer, classNames, styles, children, loading, confirmLoading, zIndex: customizeZIndex, mousePosition: customizeMousePosition, onOk, onCancel, okButtonProps, cancelButtonProps, destroyOnHidden, destroyOnClose, panelRef = null, closable, mask: modalMask, modalRender, maskClosable, focusTriggerAfterClose, focusable, ...restProps } = props;
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, centered: contextCentered, cancelButtonProps: contextCancelButtonProps, okButtonProps: contextOkButtonProps, mask: contextMask } = useComponentConfig("modal");
	const { modal: modalContext } = import_react.useContext(ConfigContext);
	const [closableAfterClose, onClose] = import_react.useMemo(() => {
		if (typeof closable === "boolean") return [void 0, void 0];
		return [closable?.afterClose, closable?.onClose];
	}, [closable]);
	const prefixCls = getPrefixCls("modal", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const [mergedMask, maskBlurClassName, mergeMaskClosable] = useMergedMask(modalMask, contextMask, prefixCls, maskClosable);
	const mergedFocusable = useFocusable(focusable, mergedMask, focusTriggerAfterClose);
	const handleCancel = (e) => {
		if (confirmLoading) return;
		onCancel?.(e);
		onClose?.();
	};
	const handleOk = (e) => {
		onOk?.(e);
		onClose?.();
	};
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$29(prefixCls, rootCls);
	const wrapClassNameExtended = clsx(wrapClassName, {
		[`${prefixCls}-centered`]: centered ?? contextCentered,
		[`${prefixCls}-wrap-rtl`]: direction === "rtl"
	});
	const dialogFooter = footer !== null && !loading ? /* @__PURE__ */ import_react.createElement(Footer, {
		...props,
		okButtonProps: {
			...contextOkButtonProps,
			...okButtonProps
		},
		onOk: handleOk,
		cancelButtonProps: {
			...contextCancelButtonProps,
			...cancelButtonProps
		},
		onCancel: handleCancel
	}) : null;
	const [rawClosable, mergedCloseIcon, closeBtnIsDisabled, ariaProps] = useClosable(pickClosable(props), pickClosable(modalContext), {
		closable: true,
		closeIcon: /* @__PURE__ */ import_react.createElement(RefIcon, { className: `${prefixCls}-close-icon` }),
		closeIconRender: (icon) => renderCloseIcon(prefixCls, icon)
	});
	const mergedClosable = rawClosable ? {
		disabled: closeBtnIsDisabled,
		closeIcon: mergedCloseIcon,
		afterClose: closableAfterClose,
		...ariaProps
	} : false;
	const mergedModalRender = modalRender ? (node) => /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-render` }, modalRender(node)) : void 0;
	const mergedPanelRef = composeRef(panelRef, usePanelRef(`.${prefixCls}-${modalRender ? "render" : "container"}`));
	const [zIndex, contextZIndex] = useZIndex("Modal", customizeZIndex);
	const mergedProps = {
		...props,
		width,
		panelRef,
		focusTriggerAfterClose: mergedFocusable.focusTriggerAfterClose,
		focusable: mergedFocusable,
		mask: mergedMask,
		maskClosable: mergeMaskClosable,
		zIndex
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([
		contextClassNames,
		classNames,
		maskBlurClassName
	], [contextStyles, styles], { props: mergedProps });
	const [numWidth, responsiveWidth] = import_react.useMemo(() => {
		if (width && typeof width === "object") return [void 0, width];
		return [width, void 0];
	}, [width]);
	const responsiveWidthVars = import_react.useMemo(() => {
		const vars = {};
		if (responsiveWidth) Object.keys(responsiveWidth).forEach((breakpoint) => {
			const breakpointWidth = responsiveWidth[breakpoint];
			if (breakpointWidth !== void 0) vars[`--${prefixCls}-${breakpoint}-width`] = typeof breakpointWidth === "number" ? `${breakpointWidth}px` : breakpointWidth;
		});
		return vars;
	}, [prefixCls, responsiveWidth]);
	return /* @__PURE__ */ import_react.createElement(ContextIsolator, {
		form: true,
		space: true
	}, /* @__PURE__ */ import_react.createElement(ZIndexContext.Provider, { value: contextZIndex }, /* @__PURE__ */ import_react.createElement(es_default$1, {
		width: numWidth,
		...restProps,
		zIndex,
		getContainer: getContainer === void 0 ? getContextPopupContainer : getContainer,
		prefixCls,
		rootClassName: clsx(hashId, rootClassName, cssVarCls, rootCls, mergedClassNames.root),
		rootStyle: mergedStyles.root,
		footer: dialogFooter,
		visible: open,
		mousePosition: customizeMousePosition ?? mousePosition,
		onClose: handleCancel,
		closable: mergedClosable,
		closeIcon: mergedCloseIcon,
		transitionName: getTransitionName(rootPrefixCls, "zoom", props.transitionName),
		maskTransitionName: getTransitionName(rootPrefixCls, "fade", props.maskTransitionName),
		mask: mergedMask,
		maskClosable: mergeMaskClosable,
		className: clsx(hashId, className, contextClassName),
		style: {
			...contextStyle,
			...style,
			...responsiveWidthVars
		},
		classNames: {
			...mergedClassNames,
			wrapper: clsx(mergedClassNames.wrapper, wrapClassNameExtended)
		},
		styles: mergedStyles,
		panelRef: mergedPanelRef,
		destroyOnHidden: destroyOnHidden ?? destroyOnClose,
		modalRender: mergedModalRender,
		focusTriggerAfterClose: mergedFocusable.focusTriggerAfterClose,
		focusTrap: mergedFocusable.trap
	}, loading ? /* @__PURE__ */ import_react.createElement(skeleton_default, {
		active: true,
		title: false,
		paragraph: { rows: 4 },
		className: `${prefixCls}-body-skeleton`
	}) : children)));
};
//#endregion
//#region node_modules/antd/es/modal/style/confirm.js
var genModalConfirmStyle = (token) => {
	const { componentCls, titleFontSize, titleLineHeight, modalConfirmIconSize, fontSize, lineHeight, modalTitleHeight, fontHeight, confirmBodyPadding } = token;
	const confirmComponentCls = `${componentCls}-confirm`;
	return {
		[confirmComponentCls]: {
			"&-rtl": { direction: "rtl" },
			[`${token.antCls}-modal-header`]: { display: "none" },
			[`${confirmComponentCls}-body-wrapper`]: { ...clearFix() },
			[`&${componentCls} ${componentCls}-body`]: { padding: confirmBodyPadding },
			[`${confirmComponentCls}-body`]: {
				display: "flex",
				flexWrap: "nowrap",
				alignItems: "start",
				[`> ${token.iconCls}`]: {
					flex: "none",
					fontSize: modalConfirmIconSize,
					marginInlineEnd: token.confirmIconMarginInlineEnd,
					marginTop: token.calc(token.calc(fontHeight).sub(modalConfirmIconSize).equal()).div(2).equal()
				},
				[`&-has-title > ${token.iconCls}`]: { marginTop: token.calc(token.calc(modalTitleHeight).sub(modalConfirmIconSize).equal()).div(2).equal() }
			},
			[`${confirmComponentCls}-paragraph`]: {
				display: "flex",
				flexDirection: "column",
				flex: "auto",
				rowGap: token.marginXS,
				maxWidth: `calc(100% - ${unit(token.marginSM)})`
			},
			[`${confirmComponentCls}-body-no-icon ${confirmComponentCls}-paragraph`]: { maxWidth: "100%" },
			[`${token.iconCls} + ${confirmComponentCls}-paragraph`]: { maxWidth: `calc(100% - ${unit(token.calc(token.modalConfirmIconSize).add(token.marginSM).equal())})` },
			[`${confirmComponentCls}-title`]: {
				color: token.colorTextHeading,
				fontWeight: token.fontWeightStrong,
				fontSize: titleFontSize,
				lineHeight: titleLineHeight
			},
			[`${confirmComponentCls}-container`]: {
				color: token.colorText,
				fontSize,
				lineHeight
			},
			[`${confirmComponentCls}-btns`]: {
				textAlign: "end",
				marginTop: token.confirmBtnsMarginTop,
				[`${token.antCls}-btn + ${token.antCls}-btn`]: {
					marginBottom: 0,
					marginInlineStart: token.marginXS
				}
			}
		},
		[`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorError },
		[`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorWarning },
		[`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorInfo },
		[`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorSuccess }
	};
};
var confirm_default = genSubStyleComponent(["Modal", "confirm"], (token) => {
	return genModalConfirmStyle(prepareToken$3(token));
}, prepareComponentToken$25, { order: -1e3 });
//#endregion
//#region node_modules/antd/es/modal/ConfirmDialog.js
var ConfirmContent = (props) => {
	const { prefixCls, icon, okText, cancelText, confirmPrefixCls, type, okCancel, footer, locale: staticLocale, autoFocusButton, focusable, ...restProps } = props;
	let mergedIcon = icon;
	if (!icon && icon !== null) switch (type) {
		case "info":
			mergedIcon = /* @__PURE__ */ import_react.createElement(RefIcon$1, null);
			break;
		case "success":
			mergedIcon = /* @__PURE__ */ import_react.createElement(RefIcon$2, null);
			break;
		case "error":
			mergedIcon = /* @__PURE__ */ import_react.createElement(RefIcon$3, null);
			break;
		default: mergedIcon = /* @__PURE__ */ import_react.createElement(RefIcon$4, null);
	}
	const mergedOkCancel = okCancel ?? type === "confirm";
	const mergedAutoFocusButton = import_react.useMemo(() => {
		const base = focusable?.autoFocusButton || autoFocusButton;
		return base || base === null ? base : "ok";
	}, [autoFocusButton, focusable?.autoFocusButton]);
	const [locale] = useLocale("Modal");
	const mergedLocale = staticLocale || locale;
	const okTextLocale = okText || (mergedOkCancel ? mergedLocale?.okText : mergedLocale?.justOkText);
	const cancelTextLocale = cancelText || mergedLocale?.cancelText;
	const { closable } = restProps;
	const { onClose } = closable && typeof closable === "object" ? closable : {};
	const memoizedValue = import_react.useMemo(() => {
		return {
			autoFocusButton: mergedAutoFocusButton,
			cancelTextLocale,
			okTextLocale,
			mergedOkCancel,
			onClose,
			...restProps
		};
	}, [
		mergedAutoFocusButton,
		cancelTextLocale,
		okTextLocale,
		mergedOkCancel,
		onClose,
		restProps
	]);
	const footerOriginNode = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(ConfirmCancelBtn, null), /* @__PURE__ */ import_react.createElement(ConfirmOkBtn, null));
	const hasTitle = isNonNullable(props.title) && props.title !== "";
	const hasIcon = isNonNullable(mergedIcon);
	const bodyCls = `${confirmPrefixCls}-body`;
	return /* @__PURE__ */ import_react.createElement("div", { className: `${confirmPrefixCls}-body-wrapper` }, /* @__PURE__ */ import_react.createElement("div", { className: clsx(bodyCls, {
		[`${bodyCls}-has-title`]: hasTitle,
		[`${bodyCls}-no-icon`]: !hasIcon
	}) }, mergedIcon, /* @__PURE__ */ import_react.createElement("div", { className: `${confirmPrefixCls}-paragraph` }, hasTitle && /* @__PURE__ */ import_react.createElement("span", { className: `${confirmPrefixCls}-title` }, props.title), /* @__PURE__ */ import_react.createElement("div", { className: `${confirmPrefixCls}-content` }, props.content))), footer === void 0 || typeof footer === "function" ? /* @__PURE__ */ import_react.createElement(ModalContextProvider, { value: memoizedValue }, /* @__PURE__ */ import_react.createElement("div", { className: `${confirmPrefixCls}-btns` }, typeof footer === "function" ? footer(footerOriginNode, {
		OkBtn: ConfirmOkBtn,
		CancelBtn: ConfirmCancelBtn
	}) : footerOriginNode)) : footer, /* @__PURE__ */ import_react.createElement(confirm_default, { prefixCls }));
};
var ConfirmDialog = (props) => {
	const { close, zIndex, maskStyle, direction, prefixCls, wrapClassName, rootPrefixCls, bodyStyle, closable = false, onConfirm, styles, title, mask, maskClosable, okButtonProps, cancelButtonProps } = props;
	const { cancelButtonProps: contextCancelButtonProps, okButtonProps: contextOkButtonProps } = useComponentConfig("modal");
	const confirmPrefixCls = `${prefixCls}-confirm`;
	const width = props.width || 416;
	const style = props.style || {};
	const classString = clsx(confirmPrefixCls, `${confirmPrefixCls}-${props.type}`, { [`${confirmPrefixCls}-rtl`]: direction === "rtl" }, props.className);
	const mergedMask = import_react.useMemo(() => {
		const nextMaskConfig = normalizeMaskConfig(mask, maskClosable);
		nextMaskConfig.closable ?? (nextMaskConfig.closable = false);
		return nextMaskConfig;
	}, [mask, maskClosable]);
	const [, token] = useToken();
	const mergedZIndex = import_react.useMemo(() => {
		if (zIndex !== void 0) return zIndex;
		return token.zIndexPopupBase + CONTAINER_MAX_OFFSET;
	}, [zIndex, token]);
	return /* @__PURE__ */ import_react.createElement(Modal$1, {
		...props,
		className: classString,
		wrapClassName: clsx({ [`${confirmPrefixCls}-centered`]: !!props.centered }, wrapClassName),
		onCancel: () => {
			close?.({ triggerCancel: true });
			onConfirm?.(false);
		},
		title,
		footer: null,
		transitionName: getTransitionName(rootPrefixCls || "", "zoom", props.transitionName),
		maskTransitionName: getTransitionName(rootPrefixCls || "", "fade", props.maskTransitionName),
		mask: mergedMask,
		style,
		styles: {
			body: bodyStyle,
			mask: maskStyle,
			...styles
		},
		width,
		zIndex: mergedZIndex,
		closable
	}, /* @__PURE__ */ import_react.createElement(ConfirmContent, {
		...props,
		confirmPrefixCls,
		okButtonProps: {
			...contextOkButtonProps,
			...okButtonProps
		},
		cancelButtonProps: {
			...contextCancelButtonProps,
			...cancelButtonProps
		}
	}));
};
var ConfirmDialogWrapper$1 = (props) => {
	const { rootPrefixCls, iconPrefixCls, direction, theme } = props;
	return /* @__PURE__ */ import_react.createElement(ConfigProvider, {
		prefixCls: rootPrefixCls,
		iconPrefixCls,
		direction,
		theme
	}, /* @__PURE__ */ import_react.createElement(ConfirmDialog, { ...props }));
};
//#endregion
//#region node_modules/antd/es/modal/destroyFns.js
var destroyFns = [];
//#endregion
//#region node_modules/antd/es/modal/confirm.js
var defaultRootPrefixCls = "";
function getRootPrefixCls() {
	return defaultRootPrefixCls;
}
var ConfirmDialogWrapper = (props) => {
	const { prefixCls: customizePrefixCls, getContainer, direction } = props;
	const runtimeLocale = getConfirmLocale();
	const config = (0, import_react.useContext)(ConfigContext);
	const rootPrefixCls = getRootPrefixCls() || config.getPrefixCls();
	const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
	let mergedGetContainer = getContainer;
	if (mergedGetContainer === false) mergedGetContainer = void 0;
	return /* @__PURE__ */ import_react.createElement(ConfirmDialogWrapper$1, {
		...props,
		rootPrefixCls,
		prefixCls,
		iconPrefixCls: config.iconPrefixCls,
		theme: config.theme,
		direction: direction ?? config.direction,
		locale: config.locale?.Modal ?? runtimeLocale,
		getContainer: mergedGetContainer
	});
};
function confirm(config) {
	const global = globalConfig();
	const container = document.createDocumentFragment();
	let currentConfig = {
		...config,
		close,
		open: true
	};
	let timeoutId;
	function destroy(...args) {
		if (args.some((param) => param?.triggerCancel)) config.onCancel?.(() => {}, ...args.slice(1));
		for (let i = 0; i < destroyFns.length; i++) if (destroyFns[i] === close) {
			destroyFns.splice(i, 1);
			break;
		}
		unmount(container).then(() => {});
	}
	const scheduleRender = (props) => {
		clearTimeout(timeoutId);
		/**
		* https://github.com/ant-design/ant-design/issues/23623
		*
		* Sync render blocks React event. Let's make this async.
		*/
		timeoutId = setTimeout(() => {
			const rootPrefixCls = global.getPrefixCls(void 0, getRootPrefixCls());
			const iconPrefixCls = global.getIconPrefixCls();
			const theme = global.getTheme();
			const dom = /* @__PURE__ */ import_react.createElement(ConfirmDialogWrapper, { ...props });
			render(/* @__PURE__ */ import_react.createElement(ConfigProvider, {
				prefixCls: rootPrefixCls,
				iconPrefixCls,
				theme
			}, typeof global.holderRender === "function" ? global.holderRender(dom) : dom), container);
		});
	};
	function close(...args) {
		currentConfig = {
			...currentConfig,
			open: false,
			afterClose: () => {
				if (typeof config.afterClose === "function") config.afterClose();
				destroy.apply(this, args);
			}
		};
		scheduleRender(currentConfig);
	}
	function update(configUpdate) {
		if (typeof configUpdate === "function") currentConfig = configUpdate(currentConfig);
		else currentConfig = {
			...currentConfig,
			...configUpdate
		};
		scheduleRender(currentConfig);
	}
	scheduleRender(currentConfig);
	destroyFns.push(close);
	return {
		destroy: close,
		update
	};
}
function withWarn(props) {
	return {
		...props,
		type: "warning"
	};
}
function withInfo(props) {
	return {
		...props,
		type: "info"
	};
}
function withSuccess(props) {
	return {
		...props,
		type: "success"
	};
}
function withError(props) {
	return {
		...props,
		type: "error"
	};
}
function withConfirm(props) {
	return {
		...props,
		type: "confirm"
	};
}
function modalGlobalConfig({ rootPrefixCls }) {
	defaultRootPrefixCls = rootPrefixCls;
}
//#endregion
//#region node_modules/antd/es/modal/useModal/HookModal.js
var HookModal = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { afterClose: hookAfterClose, config, ...restProps } = props;
	const [open, setOpen] = import_react.useState(true);
	const [innerConfig, setInnerConfig] = import_react.useState(config);
	const { direction, getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("modal");
	const rootPrefixCls = getPrefixCls();
	const afterClose = () => {
		hookAfterClose();
		innerConfig.afterClose?.();
	};
	const close = (...args) => {
		setOpen(false);
		if (args.some((param) => param?.triggerCancel)) innerConfig.onCancel?.(() => {}, ...args.slice(1));
	};
	import_react.useImperativeHandle(ref, () => ({
		destroy: close,
		update: (newConfig) => {
			setInnerConfig((originConfig) => {
				const nextConfig = typeof newConfig === "function" ? newConfig(originConfig) : newConfig;
				return {
					...originConfig,
					...nextConfig
				};
			});
		}
	}));
	const mergedOkCancel = innerConfig.okCancel ?? innerConfig.type === "confirm";
	const [contextLocale] = useLocale("Modal", localeValues.Modal);
	return /* @__PURE__ */ import_react.createElement(ConfirmDialogWrapper$1, {
		prefixCls,
		rootPrefixCls,
		...innerConfig,
		close,
		open,
		afterClose,
		okText: innerConfig.okText || (mergedOkCancel ? contextLocale?.okText : contextLocale?.justOkText),
		direction: innerConfig.direction || direction,
		cancelText: innerConfig.cancelText || contextLocale?.cancelText,
		...restProps
	});
});
//#endregion
//#region node_modules/antd/es/modal/useModal/index.js
var uuid = 0;
var ElementsHolder = /* @__PURE__ */ import_react.memo(/* @__PURE__ */ import_react.forwardRef((_props, ref) => {
	const [elements, patchElement] = usePatchElement();
	import_react.useImperativeHandle(ref, () => ({ patchElement }), [patchElement]);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, elements);
}));
function useModal() {
	const holderRef = import_react.useRef(null);
	const [actionQueue, setActionQueue] = import_react.useState([]);
	import_react.useEffect(() => {
		if (actionQueue.length) {
			_toConsumableArray(actionQueue).forEach((action) => {
				action();
			});
			setActionQueue([]);
		}
	}, [actionQueue]);
	const getConfirmFunc = import_react.useCallback((withFunc) => function hookConfirm(config) {
		uuid += 1;
		const modalRef = /* @__PURE__ */ import_react.createRef();
		let resolvePromise;
		const promise = new Promise((resolve) => {
			resolvePromise = resolve;
		});
		let silent = false;
		let closeFunc;
		const modal = /* @__PURE__ */ import_react.createElement(HookModal, {
			key: `modal-${uuid}`,
			config: withFunc(config),
			ref: modalRef,
			afterClose: () => {
				closeFunc?.();
			},
			isSilent: () => silent,
			onConfirm: (confirmed) => {
				resolvePromise(confirmed);
			}
		});
		closeFunc = holderRef.current?.patchElement(modal);
		if (closeFunc) destroyFns.push(closeFunc);
		return {
			destroy: () => {
				function destroyAction() {
					modalRef.current?.destroy();
				}
				if (modalRef.current) destroyAction();
				else setActionQueue((prev) => [].concat(_toConsumableArray(prev), [destroyAction]));
			},
			update: (newConfig) => {
				function updateAction() {
					modalRef.current?.update(newConfig);
				}
				if (modalRef.current) updateAction();
				else setActionQueue((prev) => [].concat(_toConsumableArray(prev), [updateAction]));
			},
			then: (resolve) => {
				silent = true;
				return promise.then(resolve);
			}
		};
	}, []);
	return [import_react.useMemo(() => ({
		info: getConfirmFunc(withInfo),
		success: getConfirmFunc(withSuccess),
		error: getConfirmFunc(withError),
		warning: getConfirmFunc(withWarn),
		confirm: getConfirmFunc(withConfirm)
	}), [getConfirmFunc]), /* @__PURE__ */ import_react.createElement(ElementsHolder, {
		key: "modal-holder",
		ref: holderRef
	})];
}
//#endregion
//#region node_modules/antd/es/notification/style/placement.js
var genNotificationPlacementStyle = (token) => {
	const { componentCls, notificationMarginEdge, animationMaxHeight } = token;
	const noticeCls = `${componentCls}-notice`;
	const rightFadeIn = new Keyframe("antNotificationFadeIn", {
		"0%": {
			transform: `translate3d(100%, 0, 0)`,
			opacity: 0
		},
		"100%": {
			transform: `translate3d(0, 0, 0)`,
			opacity: 1
		}
	});
	const topFadeIn = new Keyframe("antNotificationTopFadeIn", {
		"0%": {
			top: -animationMaxHeight,
			opacity: 0
		},
		"100%": {
			top: 0,
			opacity: 1
		}
	});
	const bottomFadeIn = new Keyframe("antNotificationBottomFadeIn", {
		"0%": {
			bottom: token.calc(animationMaxHeight).mul(-1).equal(),
			opacity: 0
		},
		"100%": {
			bottom: 0,
			opacity: 1
		}
	});
	const leftFadeIn = new Keyframe("antNotificationLeftFadeIn", {
		"0%": {
			transform: `translate3d(-100%, 0, 0)`,
			opacity: 0
		},
		"100%": {
			transform: `translate3d(0, 0, 0)`,
			opacity: 1
		}
	});
	return { [componentCls]: {
		[`&${componentCls}-top, &${componentCls}-bottom`]: {
			marginInline: 0,
			[noticeCls]: { marginInline: "auto auto" }
		},
		[`&${componentCls}-top`]: { [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: { animationName: topFadeIn } },
		[`&${componentCls}-bottom`]: { [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: { animationName: bottomFadeIn } },
		[`&${componentCls}-topRight, &${componentCls}-bottomRight`]: { [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: { animationName: rightFadeIn } },
		[`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
			marginRight: {
				value: 0,
				_skip_check_: true
			},
			marginLeft: {
				value: notificationMarginEdge,
				_skip_check_: true
			},
			[noticeCls]: {
				marginInlineEnd: "auto",
				marginInlineStart: 0
			},
			[`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: { animationName: leftFadeIn }
		}
	} };
};
//#endregion
//#region node_modules/antd/es/notification/interface.js
var NotificationPlacements = [
	"top",
	"topLeft",
	"topRight",
	"bottom",
	"bottomLeft",
	"bottomRight"
];
//#endregion
//#region node_modules/antd/es/notification/style/stack.js
var placementAlignProperty = {
	topLeft: "left",
	topRight: "right",
	bottomLeft: "left",
	bottomRight: "right",
	top: "left",
	bottom: "left"
};
var genPlacementStackStyle = (token, placement) => {
	const { componentCls } = token;
	return { [`${componentCls}-${placement}`]: { [`&${componentCls}-stack > ${componentCls}-notice-wrapper`]: {
		[placement.startsWith("top") ? "top" : "bottom"]: 0,
		[placementAlignProperty[placement]]: {
			value: 0,
			_skip_check_: true
		}
	} } };
};
var genStackChildrenStyle = (token) => {
	const childrenStyle = {};
	for (let i = 1; i < token.notificationStackLayer; i++) childrenStyle[`&:nth-last-child(${i + 1})`] = {
		overflow: "hidden",
		[`& > ${token.componentCls}-notice`]: {
			opacity: 0,
			transition: `opacity ${token.motionDurationMid}`
		}
	};
	return {
		[`&:not(:nth-last-child(-n+${token.notificationStackLayer}))`]: {
			opacity: 0,
			overflow: "hidden",
			color: "transparent",
			pointerEvents: "none"
		},
		...childrenStyle
	};
};
var genStackedNoticeStyle = (token) => {
	const childrenStyle = {};
	for (let i = 1; i < token.notificationStackLayer; i++) childrenStyle[`&:nth-last-child(${i + 1})`] = {
		background: token.colorBgBlur,
		backdropFilter: "blur(10px)",
		"-webkit-backdrop-filter": "blur(10px)"
	};
	return childrenStyle;
};
var genStackStyle = (token) => {
	const { componentCls } = token;
	return {
		[`${componentCls}-stack`]: { [`& > ${componentCls}-notice-wrapper`]: {
			transition: `transform ${token.motionDurationSlow}, backdrop-filter 0s`,
			willChange: "transform, opacity",
			position: "absolute",
			...genStackChildrenStyle(token)
		} },
		[`${componentCls}-stack:not(${componentCls}-stack-expanded)`]: { [`& > ${componentCls}-notice-wrapper`]: { ...genStackedNoticeStyle(token) } },
		[`${componentCls}-stack${componentCls}-stack-expanded`]: { [`& > ${componentCls}-notice-wrapper`]: {
			"&:not(:nth-last-child(-n + 1))": {
				opacity: 1,
				overflow: "unset",
				color: "inherit",
				pointerEvents: "auto",
				[`& > ${token.componentCls}-notice`]: { opacity: 1 }
			},
			"&:after": {
				content: "\"\"",
				position: "absolute",
				height: token.margin,
				width: "100%",
				insetInline: 0,
				bottom: token.calc(token.margin).mul(-1).equal(),
				background: "transparent",
				pointerEvents: "auto"
			}
		} },
		...NotificationPlacements.map((placement) => genPlacementStackStyle(token, placement)).reduce((acc, cur) => ({
			...acc,
			...cur
		}), {})
	};
};
//#endregion
//#region node_modules/antd/es/notification/style/index.js
var genNoticeStyle = (token) => {
	const { iconCls, componentCls, boxShadow, fontSizeLG, notificationMarginBottom, borderRadiusLG, colorSuccess, colorInfo, colorWarning, colorError, colorTextHeading, notificationBg, notificationPadding, notificationMarginEdge, progressBg, notificationProgressHeight, fontSize, lineHeight, width, notificationIconSize, colorText, colorSuccessBg, colorErrorBg, colorInfoBg, colorWarningBg, motionDurationMid } = token;
	const noticeCls = `${componentCls}-notice`;
	return {
		position: "relative",
		marginBottom: notificationMarginBottom,
		marginInlineStart: "auto",
		background: notificationBg,
		borderRadius: borderRadiusLG,
		boxShadow,
		[noticeCls]: {
			padding: notificationPadding,
			width,
			maxWidth: `calc(100vw - ${unit(token.calc(notificationMarginEdge).mul(2).equal())})`,
			lineHeight,
			wordWrap: "break-word",
			borderRadius: borderRadiusLG,
			overflow: "hidden",
			"&-success": colorSuccessBg ? { background: colorSuccessBg } : {},
			"&-error": colorErrorBg ? { background: colorErrorBg } : {},
			"&-info": colorInfoBg ? { background: colorInfoBg } : {},
			"&-warning": colorWarningBg ? { background: colorWarningBg } : {}
		},
		[`${noticeCls}-title`]: {
			marginBottom: token.marginXS,
			color: colorTextHeading,
			fontSize: fontSizeLG,
			lineHeight: token.lineHeightLG
		},
		[`${noticeCls}-description`]: {
			fontSize,
			color: colorText,
			marginTop: token.marginXS
		},
		[`${noticeCls}-closable ${noticeCls}-title`]: { paddingInlineEnd: token.paddingLG },
		[`${noticeCls}-with-icon ${noticeCls}-title`]: {
			marginBottom: token.marginXS,
			marginInlineStart: token.calc(token.marginSM).add(notificationIconSize).equal(),
			fontSize: fontSizeLG
		},
		[`${noticeCls}-with-icon ${noticeCls}-description`]: {
			marginInlineStart: token.calc(token.marginSM).add(notificationIconSize).equal(),
			fontSize
		},
		[`${noticeCls}-icon`]: {
			position: "absolute",
			fontSize: notificationIconSize,
			lineHeight: 1,
			[`&-success${iconCls}`]: { color: colorSuccess },
			[`&-info${iconCls}`]: { color: colorInfo },
			[`&-warning${iconCls}`]: { color: colorWarning },
			[`&-error${iconCls}`]: { color: colorError }
		},
		[`${noticeCls}-close`]: {
			position: "absolute",
			top: token.notificationPaddingVertical,
			insetInlineEnd: token.notificationPaddingHorizontal,
			color: token.colorIcon,
			outline: "none",
			width: token.notificationCloseButtonSize,
			height: token.notificationCloseButtonSize,
			borderRadius: token.borderRadiusSM,
			transition: ["color", "background-color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: "none",
			border: "none",
			"&:hover": {
				color: token.colorIconHover,
				backgroundColor: token.colorBgTextHover
			},
			"&:active": { backgroundColor: token.colorBgTextActive },
			...genFocusStyle(token)
		},
		[`${noticeCls}-progress`]: {
			position: "absolute",
			display: "block",
			appearance: "none",
			inlineSize: `calc(100% - ${unit(borderRadiusLG)} * 2)`,
			left: {
				_skip_check_: true,
				value: borderRadiusLG
			},
			right: {
				_skip_check_: true,
				value: borderRadiusLG
			},
			bottom: 0,
			blockSize: notificationProgressHeight,
			border: 0,
			"&, &::-webkit-progress-bar": {
				borderRadius: borderRadiusLG,
				backgroundColor: `rgba(0, 0, 0, 0.04)`
			},
			"&::-moz-progress-bar": { background: progressBg },
			"&::-webkit-progress-value": {
				borderRadius: borderRadiusLG,
				background: progressBg
			}
		},
		[`${noticeCls}-actions`]: {
			float: "right",
			marginTop: token.marginSM
		}
	};
};
var genNotificationStyle = (token) => {
	const { componentCls, notificationMarginBottom, notificationMarginEdge, motionDurationMid, motionEaseInOut } = token;
	const noticeCls = `${componentCls}-notice`;
	const fadeOut = new Keyframe("antNotificationFadeOut", {
		"0%": {
			maxHeight: token.animationMaxHeight,
			marginBottom: notificationMarginBottom
		},
		"100%": {
			maxHeight: 0,
			marginBottom: 0,
			paddingTop: 0,
			paddingBottom: 0,
			opacity: 0
		}
	});
	return [{ [componentCls]: {
		...resetComponent(token),
		position: "fixed",
		zIndex: token.zIndexPopup,
		marginRight: {
			value: notificationMarginEdge,
			_skip_check_: true
		},
		[`${componentCls}-hook-holder`]: { position: "relative" },
		[`${componentCls}-fade-appear-prepare`]: { opacity: "0 !important" },
		[`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
			animationDuration: token.motionDurationMid,
			animationTimingFunction: motionEaseInOut,
			animationFillMode: "both",
			opacity: 0,
			animationPlayState: "paused"
		},
		[`${componentCls}-fade-leave`]: {
			animationTimingFunction: motionEaseInOut,
			animationFillMode: "both",
			animationDuration: motionDurationMid,
			animationPlayState: "paused"
		},
		[`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: { animationPlayState: "running" },
		[`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
			animationName: fadeOut,
			animationPlayState: "running"
		},
		"&-rtl": {
			direction: "rtl",
			[`${noticeCls}-actions`]: { float: "left" }
		}
	} }, { [componentCls]: { [`${noticeCls}-wrapper`]: genNoticeStyle(token) } }];
};
var prepareComponentToken$24 = (token) => ({
	zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 50,
	width: 384,
	progressBg: `linear-gradient(90deg, ${token.colorPrimaryBorderHover}, ${token.colorPrimary})`,
	colorSuccessBg: void 0,
	colorErrorBg: void 0,
	colorInfoBg: void 0,
	colorWarningBg: void 0
});
var prepareNotificationToken = (token) => {
	const notificationPaddingVertical = token.paddingMD;
	const notificationPaddingHorizontal = token.paddingLG;
	return merge$1(token, {
		notificationBg: token.colorBgElevated,
		notificationPaddingVertical,
		notificationPaddingHorizontal,
		notificationIconSize: token.calc(token.fontSizeLG).mul(token.lineHeightLG).equal(),
		notificationCloseButtonSize: token.calc(token.controlHeightLG).mul(.55).equal(),
		notificationMarginBottom: token.margin,
		notificationPadding: `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
		notificationMarginEdge: token.marginLG,
		animationMaxHeight: 150,
		notificationStackLayer: 3,
		notificationProgressHeight: 2
	});
};
var style_default$28 = genStyleHooks("Notification", (token) => {
	const notificationToken = prepareNotificationToken(token);
	return [
		genNotificationStyle(notificationToken),
		genNotificationPlacementStyle(notificationToken),
		genStackStyle(notificationToken)
	];
}, prepareComponentToken$24);
//#endregion
//#region node_modules/antd/es/notification/PurePanel.js
function getCloseIcon(prefixCls, closeIcon) {
	if (closeIcon === null || closeIcon === false) return null;
	return closeIcon || /* @__PURE__ */ import_react.createElement(RefIcon, { className: `${prefixCls}-close-icon` });
}
var typeToIcon = {
	success: RefIcon$2,
	info: RefIcon$1,
	error: RefIcon$3,
	warning: RefIcon$4
};
var PureContent = (props) => {
	const { prefixCls, icon, type, title, description, actions, role = "alert", styles, classNames: pureContentCls } = props;
	let iconNode = null;
	if (icon) iconNode = /* @__PURE__ */ import_react.createElement("span", {
		className: clsx(`${prefixCls}-icon`, pureContentCls.icon),
		style: styles.icon
	}, icon);
	else if (type) iconNode = /* @__PURE__ */ import_react.createElement(typeToIcon[type] || null, {
		className: clsx(`${prefixCls}-icon`, pureContentCls.icon, `${prefixCls}-icon-${type}`),
		style: styles.icon
	});
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clsx({ [`${prefixCls}-with-icon`]: iconNode }),
		role
	}, iconNode, /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-title`, pureContentCls.title),
		style: styles.title
	}, title), description && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-description`, pureContentCls.description),
		style: styles.description
	}, description), actions && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-actions`, pureContentCls.actions),
		style: styles.actions
	}, actions));
};
//#endregion
//#region node_modules/antd/es/notification/util.js
function getPlacementStyle(placement, top, bottom) {
	let style;
	switch (placement) {
		case "top":
			style = {
				left: "50%",
				transform: "translateX(-50%)",
				right: "auto",
				top,
				bottom: "auto"
			};
			break;
		case "topLeft":
			style = {
				left: 0,
				top,
				bottom: "auto"
			};
			break;
		case "topRight":
			style = {
				right: 0,
				top,
				bottom: "auto"
			};
			break;
		case "bottom":
			style = {
				left: "50%",
				transform: "translateX(-50%)",
				right: "auto",
				top: "auto",
				bottom
			};
			break;
		case "bottomLeft":
			style = {
				left: 0,
				top: "auto",
				bottom
			};
			break;
		default:
			style = {
				right: 0,
				top: "auto",
				bottom
			};
			break;
	}
	return style;
}
function getMotion(prefixCls) {
	return { motionName: `${prefixCls}-fade` };
}
function getCloseIconConfig(closeIcon, notificationConfig, notification) {
	if (typeof closeIcon !== "undefined") return closeIcon;
	if (typeof notificationConfig?.closeIcon !== "undefined") return notificationConfig.closeIcon;
	return notification?.closeIcon;
}
//#endregion
//#region node_modules/antd/es/notification/useNotification.js
var DEFAULT_OFFSET = 24;
var DEFAULT_DURATION = 4.5;
var DEFAULT_PLACEMENT = "topRight";
var Wrapper = ({ children, prefixCls }) => {
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$28(prefixCls, rootCls);
	return /* @__PURE__ */ import_react.createElement(NotificationProvider, { classNames: { list: clsx(hashId, cssVarCls, rootCls) } }, children);
};
var renderNotifications = (node, { prefixCls, key }) => /* @__PURE__ */ import_react.createElement(Wrapper, {
	prefixCls,
	key
}, node);
var Holder = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { top, bottom, prefixCls: staticPrefixCls, getContainer: staticGetContainer, maxCount, rtl, onAllRemoved, stack, duration = DEFAULT_DURATION, pauseOnHover = true, showProgress } = props;
	const { getPrefixCls, getPopupContainer, direction } = useComponentConfig("notification");
	const { notification } = (0, import_react.useContext)(ConfigContext);
	const [, token] = useToken();
	const prefixCls = staticPrefixCls || getPrefixCls("notification");
	const mergedDuration = (0, import_react.useMemo)(() => typeof duration === "number" && duration > 0 ? duration : false, [duration]);
	const getStyle = (placement) => getPlacementStyle(placement, top ?? DEFAULT_OFFSET, bottom ?? DEFAULT_OFFSET);
	const getClassName = () => clsx({ [`${prefixCls}-rtl`]: rtl ?? direction === "rtl" });
	const getNotificationMotion = () => getMotion(prefixCls);
	const [api, holder] = useNotification$1({
		prefixCls,
		style: getStyle,
		className: getClassName,
		motion: getNotificationMotion,
		closable: { closeIcon: getCloseIcon(prefixCls) },
		duration: mergedDuration,
		getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
		maxCount,
		pauseOnHover,
		showProgress,
		onAllRemoved,
		renderNotifications,
		stack: stack === false ? false : {
			threshold: typeof stack === "object" ? stack?.threshold : void 0,
			offset: 8,
			gap: token.margin
		}
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic([notification?.classNames, props?.classNames], [notification?.styles, props?.styles], { props });
	import_react.useImperativeHandle(ref, () => ({
		...api,
		prefixCls,
		notification,
		classNames: mergedClassNames,
		styles: mergedStyles
	}));
	return holder;
});
function useInternalNotification(notificationConfig) {
	const holderRef = import_react.useRef(null);
	devUseWarning("Notification");
	const { notification: notificationContext } = import_react.useContext(ConfigContext);
	return [import_react.useMemo(() => {
		const open = (config) => {
			if (!holderRef.current) return;
			const { open: originOpen, prefixCls, notification, classNames: originClassNames, styles: originStyles } = holderRef.current;
			const contextClassName = notification?.className || {};
			const contextStyle = notification?.style || {};
			const noticePrefixCls = `${prefixCls}-notice`;
			const { title, message, description, icon, type, btn, actions, className, style, role = "alert", closeIcon, closable, classNames: configClassNames = {}, styles = {}, ...restConfig } = config;
			const mergedTitle = title ?? message;
			const mergedActions = actions ?? btn;
			const realCloseIcon = getCloseIcon(noticePrefixCls, getCloseIconConfig(closeIcon, notificationConfig, notification));
			const [rawClosable, mergedCloseIcon, , ariaProps] = computeClosable(pickClosable({
				...notificationConfig || {},
				...config
			}), pickClosable(notificationContext), {
				closable: true,
				closeIcon: realCloseIcon
			});
			const mergedClosable = rawClosable ? {
				onClose: closable && typeof closable === "object" ? closable.onClose : void 0,
				closeIcon: mergedCloseIcon,
				...ariaProps
			} : false;
			const semanticClassNames = resolveStyleOrClass(configClassNames, { props: config });
			const semanticStyles = resolveStyleOrClass(styles, { props: config });
			const mergedClassNames = mergeClassNames(void 0, originClassNames, semanticClassNames);
			const mergedStyles = mergeStyles(originStyles, semanticStyles);
			return originOpen({
				placement: notificationConfig?.placement ?? DEFAULT_PLACEMENT,
				...restConfig,
				content: /* @__PURE__ */ import_react.createElement(PureContent, {
					prefixCls: noticePrefixCls,
					icon,
					type,
					title: mergedTitle,
					description,
					actions: mergedActions,
					role,
					classNames: mergedClassNames,
					styles: mergedStyles
				}),
				className: clsx({ [`${noticePrefixCls}-${type}`]: type }, className, contextClassName, mergedClassNames.root),
				style: {
					...contextStyle,
					...mergedStyles.root,
					...style
				},
				closable: mergedClosable
			});
		};
		const destroy = (key) => {
			if (key !== void 0) holderRef.current?.close(key);
			else holderRef.current?.destroy();
		};
		const clone = {
			open,
			destroy
		};
		[
			"success",
			"info",
			"warning",
			"error"
		].forEach((type) => {
			clone[type] = (config) => open({
				...config,
				type
			});
		});
		return clone;
	}, [notificationConfig, notificationContext]), /* @__PURE__ */ import_react.createElement(Holder, {
		key: "notification-holder",
		...notificationConfig,
		ref: holderRef
	})];
}
function useNotification(notificationConfig) {
	return useInternalNotification(notificationConfig);
}
//#endregion
//#region node_modules/antd/es/app/context.js
var AppConfigContext = /* @__PURE__ */ import_react.createContext({});
var AppContext = /* @__PURE__ */ import_react.createContext({
	message: {},
	notification: {},
	modal: {}
});
//#endregion
//#region node_modules/antd/es/app/style/index.js
var genBaseStyle$9 = (token) => {
	const { componentCls, colorText, fontSize, lineHeight, fontFamily } = token;
	return { [componentCls]: {
		color: colorText,
		fontSize,
		lineHeight,
		fontFamily,
		[`&${componentCls}-rtl`]: { direction: "rtl" }
	} };
};
var prepareComponentToken$23 = () => ({});
var style_default$27 = genStyleHooks("App", genBaseStyle$9, prepareComponentToken$23);
//#endregion
//#region node_modules/antd/es/app/App.js
var App$1 = (props) => {
	const { prefixCls: customizePrefixCls, children, className, rootClassName, message, notification, style, component = "div" } = props;
	const { direction, getPrefixCls, className: contextClassName, style: contextStyle } = useComponentConfig("app");
	const prefixCls = getPrefixCls("app", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$27(prefixCls);
	const customClassName = clsx(hashId, prefixCls, className, rootClassName, cssVarCls, { [`${prefixCls}-rtl`]: direction === "rtl" });
	const appConfig = (0, import_react.useContext)(AppConfigContext);
	const mergedAppConfig = import_react.useMemo(() => ({
		message: {
			...appConfig.message,
			...message
		},
		notification: {
			...appConfig.notification,
			...notification
		}
	}), [
		message,
		notification,
		appConfig.message,
		appConfig.notification
	]);
	const [messageApi, messageContextHolder] = useMessage(mergedAppConfig.message);
	const [notificationApi, notificationContextHolder] = useNotification(mergedAppConfig.notification);
	const [ModalApi, ModalContextHolder] = useModal();
	const memoizedContextValue = import_react.useMemo(() => ({
		message: messageApi,
		notification: notificationApi,
		modal: ModalApi
	}), [
		messageApi,
		notificationApi,
		ModalApi
	]);
	devUseWarning("App")(!(cssVarCls && component === false), "usage", "When using cssVar, ensure `component` is assigned a valid React component string.");
	const Component = component === false ? import_react.Fragment : component;
	const rootProps = {
		className: clsx(contextClassName, customClassName),
		style: {
			...contextStyle,
			...style
		}
	};
	return /* @__PURE__ */ import_react.createElement(AppContext.Provider, { value: memoizedContextValue }, /* @__PURE__ */ import_react.createElement(AppConfigContext.Provider, { value: mergedAppConfig }, /* @__PURE__ */ import_react.createElement(Component, { ...component === false ? void 0 : rootProps }, ModalContextHolder, messageContextHolder, notificationContextHolder, children)));
};
//#endregion
//#region node_modules/antd/es/app/useApp.js
var useApp = () => import_react.useContext(AppContext);
//#endregion
//#region node_modules/antd/es/app/index.js
var App = App$1;
App.useApp = useApp;
//#endregion
//#region node_modules/antd/es/_util/PurePanel.js
function withPureRenderTheme(Component) {
	return (props) => /* @__PURE__ */ import_react.createElement(ConfigProvider, { theme: { token: {
		motion: false,
		zIndexPopupBase: 0
	} } }, /* @__PURE__ */ import_react.createElement(Component, { ...props }));
}
/* istanbul ignore next */
var genPurePanel = (Component, alignPropName, postProps, defaultPrefixCls, getDropdownCls) => {
	const PurePanel = (props) => {
		const { prefixCls: customizePrefixCls, style } = props;
		const holderRef = import_react.useRef(null);
		const [popupHeight, setPopupHeight] = import_react.useState(0);
		const [popupWidth, setPopupWidth] = import_react.useState(0);
		const [open, setOpen] = useControlledState(false, props.open);
		const { getPrefixCls } = import_react.useContext(ConfigContext);
		const prefixCls = getPrefixCls(defaultPrefixCls || "select", customizePrefixCls);
		import_react.useEffect(() => {
			setOpen(true);
			if (typeof ResizeObserver !== "undefined") {
				const resizeObserver = new ResizeObserver((entries) => {
					const element = entries[0].target;
					setPopupHeight(element.offsetHeight + 8);
					setPopupWidth(element.offsetWidth);
				});
				const interval = setInterval(() => {
					const dropdownCls = getDropdownCls ? `.${getDropdownCls(prefixCls)}` : `.${prefixCls}-dropdown`;
					const popup = holderRef.current?.querySelector(dropdownCls);
					if (popup) {
						clearInterval(interval);
						resizeObserver.observe(popup);
					}
				}, 10);
				return () => {
					clearInterval(interval);
					resizeObserver.disconnect();
				};
			}
		}, [prefixCls]);
		let mergedProps = {
			...props,
			style: {
				...style,
				margin: 0
			},
			open,
			getPopupContainer: () => holderRef.current
		};
		if (postProps) mergedProps = postProps(mergedProps);
		if (alignPropName) Object.assign(mergedProps, { [alignPropName]: { overflow: {
			adjustX: false,
			adjustY: false
		} } });
		const mergedStyle = {
			paddingBottom: popupHeight,
			position: "relative",
			minWidth: popupWidth
		};
		return /* @__PURE__ */ import_react.createElement("div", {
			ref: holderRef,
			style: mergedStyle
		}, /* @__PURE__ */ import_react.createElement(Component, { ...mergedProps }));
	};
	return withPureRenderTheme(PurePanel);
};
//#endregion
//#region node_modules/antd/es/_util/statusUtils.js
var getStatusClassNames = (prefixCls, status, hasFeedback) => {
	return clsx({
		[`${prefixCls}-status-success`]: status === "success",
		[`${prefixCls}-status-warning`]: status === "warning",
		[`${prefixCls}-status-error`]: status === "error",
		[`${prefixCls}-status-validating`]: status === "validating",
		[`${prefixCls}-has-feedback`]: hasFeedback
	});
};
var getMergedStatus = (contextStatus, customStatus) => customStatus || contextStatus;
//#endregion
//#region node_modules/antd/es/empty/empty.js
var Empty$1 = () => {
	const [, token] = useToken();
	const [locale] = useLocale("Empty");
	const themeStyle = new FastColor(token.colorBgBase).toHsl().l < .5 ? { opacity: .65 } : {};
	return /* @__PURE__ */ import_react.createElement("svg", {
		style: themeStyle,
		width: "184",
		height: "152",
		viewBox: "0 0 184 152",
		xmlns: "http://www.w3.org/2000/svg"
	}, /* @__PURE__ */ import_react.createElement("title", null, locale?.description || "Empty"), /* @__PURE__ */ import_react.createElement("g", {
		fill: "none",
		fillRule: "evenodd"
	}, /* @__PURE__ */ import_react.createElement("g", { transform: "translate(24 31.7)" }, /* @__PURE__ */ import_react.createElement("ellipse", {
		fillOpacity: ".8",
		fill: "#F5F5F7",
		cx: "67.8",
		cy: "106.9",
		rx: "67.8",
		ry: "12.7"
	}), /* @__PURE__ */ import_react.createElement("path", {
		fill: "#aeb8c2",
		d: "M122 69.7 98.1 40.2a6 6 0 0 0-4.6-2.2H42.1a6 6 0 0 0-4.6 2.2l-24 29.5V85H122z"
	}), /* @__PURE__ */ import_react.createElement("path", {
		fill: "#f5f5f7",
		d: "M33.8 0h68a4 4 0 0 1 4 4v93.3a4 4 0 0 1-4 4h-68a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4"
	}), /* @__PURE__ */ import_react.createElement("path", {
		fill: "#dce0e6",
		d: "M42.7 10h50.2a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H42.7a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2m.2 39.8h49.8a2.3 2.3 0 1 1 0 4.5H42.9a2.3 2.3 0 0 1 0-4.5m0 11.7h49.8a2.3 2.3 0 1 1 0 4.6H42.9a2.3 2.3 0 0 1 0-4.6m79 43.5a7 7 0 0 1-6.8 5.4H20.5a7 7 0 0 1-6.7-5.4l-.2-1.8V69.7h26.3c2.9 0 5.2 2.4 5.2 5.4s2.4 5.4 5.3 5.4h34.8c2.9 0 5.3-2.4 5.3-5.4s2.3-5.4 5.2-5.4H122v33.5q0 1-.2 1.8"
	})), /* @__PURE__ */ import_react.createElement("path", {
		fill: "#dce0e6",
		d: "m149.1 33.3-6.8 2.6a1 1 0 0 1-1.3-1.2l2-6.2q-4.1-4.5-4.2-10.4c0-10 10.1-18.1 22.6-18.1S184 8.1 184 18.1s-10.1 18-22.6 18q-6.8 0-12.3-2.8"
	}), /* @__PURE__ */ import_react.createElement("g", {
		fill: "#fff",
		transform: "translate(149.7 15.4)"
	}, /* @__PURE__ */ import_react.createElement("circle", {
		cx: "20.7",
		cy: "3.2",
		r: "2.8"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M5.7 5.6H0L2.9.7zM9.3.7h5v5h-5z" }))));
};
//#endregion
//#region node_modules/antd/es/empty/simple.js
var Simple = () => {
	const [, token] = useToken();
	const [locale] = useLocale("Empty");
	const { colorFill, colorFillTertiary, colorFillQuaternary, colorBgContainer } = token;
	const { borderColor, shadowColor, contentColor } = (0, import_react.useMemo)(() => ({
		borderColor: new FastColor(colorFill).onBackground(colorBgContainer).toHexString(),
		shadowColor: new FastColor(colorFillTertiary).onBackground(colorBgContainer).toHexString(),
		contentColor: new FastColor(colorFillQuaternary).onBackground(colorBgContainer).toHexString()
	}), [
		colorFill,
		colorFillTertiary,
		colorFillQuaternary,
		colorBgContainer
	]);
	return /* @__PURE__ */ import_react.createElement("svg", {
		width: "64",
		height: "41",
		viewBox: "0 0 64 41",
		xmlns: "http://www.w3.org/2000/svg"
	}, /* @__PURE__ */ import_react.createElement("title", null, locale?.description || "Empty"), /* @__PURE__ */ import_react.createElement("g", {
		transform: "translate(0 1)",
		fill: "none",
		fillRule: "evenodd"
	}, /* @__PURE__ */ import_react.createElement("ellipse", {
		fill: shadowColor,
		cx: "32",
		cy: "33",
		rx: "32",
		ry: "7"
	}), /* @__PURE__ */ import_react.createElement("g", {
		fillRule: "nonzero",
		stroke: borderColor
	}, /* @__PURE__ */ import_react.createElement("path", { d: "M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z" }), /* @__PURE__ */ import_react.createElement("path", {
		d: "M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3",
		fill: contentColor
	}))));
};
//#endregion
//#region node_modules/antd/es/empty/style/index.js
var genSharedEmptyStyle = (token) => {
	const { componentCls, margin, marginXS, marginXL, fontSize, lineHeight } = token;
	return { [componentCls]: {
		marginInline: marginXS,
		fontSize,
		lineHeight,
		textAlign: "center",
		[`${componentCls}-image`]: {
			height: token.emptyImgHeight,
			marginBottom: marginXS,
			opacity: token.opacityImage,
			img: { height: "100%" },
			svg: {
				maxWidth: "100%",
				height: "100%",
				margin: "auto"
			}
		},
		[`${componentCls}-description`]: { color: token.colorTextDescription },
		[`${componentCls}-footer`]: { marginTop: margin },
		"&-normal": {
			marginBlock: marginXL,
			color: token.colorTextDescription,
			[`${componentCls}-description`]: { color: token.colorTextDescription },
			[`${componentCls}-image`]: { height: token.emptyImgHeightMD }
		},
		"&-small": {
			marginBlock: marginXS,
			color: token.colorTextDescription,
			[`${componentCls}-image`]: { height: token.emptyImgHeightSM }
		}
	} };
};
var style_default$26 = genStyleHooks("Empty", (token) => {
	const { componentCls, controlHeightLG, calc } = token;
	return genSharedEmptyStyle(merge$1(token, {
		emptyImgCls: `${componentCls}-img`,
		emptyImgHeight: calc(controlHeightLG).mul(2.5).equal(),
		emptyImgHeightMD: controlHeightLG,
		emptyImgHeightSM: calc(controlHeightLG).mul(.875).equal()
	}));
});
//#endregion
//#region node_modules/antd/es/empty/index.js
var defaultEmptyImg = /* @__PURE__ */ import_react.createElement(Empty$1, null);
var simpleEmptyImg = /* @__PURE__ */ import_react.createElement(Simple, null);
var Empty = (props) => {
	const { className, rootClassName, prefixCls: customizePrefixCls, image, description, children, imageStyle, style, classNames, styles, ...restProps } = props;
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, image: contextImage } = useComponentConfig("empty");
	const prefixCls = getPrefixCls("empty", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$26(prefixCls);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props });
	const [locale] = useLocale("Empty");
	const des = typeof description !== "undefined" ? description : locale?.description;
	const alt = typeof des === "string" ? des : "empty";
	const mergedImage = image ?? contextImage ?? defaultEmptyImg;
	let imageNode = null;
	if (typeof mergedImage === "string") imageNode = /* @__PURE__ */ import_react.createElement("img", {
		draggable: false,
		alt,
		src: mergedImage
	});
	else imageNode = mergedImage;
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(hashId, cssVarCls, prefixCls, contextClassName, {
			[`${prefixCls}-normal`]: mergedImage === simpleEmptyImg,
			[`${prefixCls}-rtl`]: direction === "rtl"
		}, className, rootClassName, mergedClassNames.root),
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		...restProps
	}, /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-image`, mergedClassNames.image),
		style: {
			...imageStyle,
			...mergedStyles.image
		}
	}, imageNode), des && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-description`, mergedClassNames.description),
		style: mergedStyles.description
	}, des), children && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-footer`, mergedClassNames.footer),
		style: mergedStyles.footer
	}, children));
};
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
//#endregion
//#region node_modules/antd/es/config-provider/defaultRenderEmpty.js
var DefaultRenderEmpty = (props) => {
	const { componentName } = props;
	const { getPrefixCls } = (0, import_react.useContext)(ConfigContext);
	const prefix = getPrefixCls("empty");
	switch (componentName) {
		case "Table":
		case "List": return /* @__PURE__ */ import_react.createElement(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE });
		case "Select":
		case "TreeSelect":
		case "Cascader":
		case "Transfer":
		case "Mentions": return /* @__PURE__ */ import_react.createElement(Empty, {
			image: Empty.PRESENTED_IMAGE_SIMPLE,
			className: `${prefix}-small`
		});
		case "Table.filter": return null;
		default: return /* @__PURE__ */ import_react.createElement(Empty, null);
	}
};
//#endregion
//#region node_modules/antd/es/form/hooks/useVariants.js
/**
* Compatible for legacy `bordered` prop.
*/
var useVariant = (component, variant, legacyBordered) => {
	const { variant: configVariant, [component]: componentConfig } = import_react.useContext(ConfigContext);
	const ctxVariant = import_react.useContext(VariantContext);
	const configComponentVariant = componentConfig?.variant;
	let mergedVariant;
	if (typeof variant !== "undefined") mergedVariant = variant;
	else if (legacyBordered === false) mergedVariant = "borderless";
	else mergedVariant = ctxVariant ?? configComponentVariant ?? configVariant ?? "outlined";
	const enableVariantCls = Variants.includes(mergedVariant);
	return [mergedVariant, enableVariantCls];
};
//#endregion
//#region node_modules/antd/es/select/mergedBuiltinPlacements.js
var getBuiltInPlacements = (popupOverflow) => {
	const sharedConfig = {
		overflow: {
			adjustX: true,
			adjustY: true,
			shiftY: true
		},
		htmlRegion: popupOverflow === "scroll" ? "scroll" : "visible",
		dynamicInset: true
	};
	return {
		bottomLeft: {
			...sharedConfig,
			points: ["tl", "bl"],
			offset: [0, 4]
		},
		bottomRight: {
			...sharedConfig,
			points: ["tr", "br"],
			offset: [0, 4]
		},
		topLeft: {
			...sharedConfig,
			points: ["bl", "tl"],
			offset: [0, -4]
		},
		topRight: {
			...sharedConfig,
			points: ["br", "tr"],
			offset: [0, -4]
		}
	};
};
function mergedBuiltinPlacements(buildInPlacements, popupOverflow) {
	return buildInPlacements || getBuiltInPlacements(popupOverflow);
}
//#endregion
//#region node_modules/antd/es/select/style/dropdown.js
var genItemStyle = (token) => {
	const { optionHeight, optionFontSize, optionLineHeight, optionPadding } = token;
	return {
		position: "relative",
		display: "block",
		minHeight: optionHeight,
		padding: optionPadding,
		color: token.colorText,
		fontWeight: "normal",
		fontSize: optionFontSize,
		lineHeight: optionLineHeight,
		boxSizing: "border-box"
	};
};
var genSingleStyle = (token) => {
	const { antCls, componentCls } = token;
	const selectItemCls = `${componentCls}-item`;
	const slideUpEnterActive = `&${antCls}-slide-up-enter${antCls}-slide-up-enter-active`;
	const slideUpAppearActive = `&${antCls}-slide-up-appear${antCls}-slide-up-appear-active`;
	const slideUpLeaveActive = `&${antCls}-slide-up-leave${antCls}-slide-up-leave-active`;
	const dropdownPlacementCls = `${componentCls}-dropdown-placement-`;
	const selectedItemCls = `${selectItemCls}-option-selected`;
	return [
		{ [`${componentCls}-dropdown`]: {
			...resetComponent(token),
			position: "absolute",
			top: -9999,
			zIndex: token.zIndexPopup,
			boxSizing: "border-box",
			padding: token.paddingXXS,
			overflow: "hidden",
			fontSize: token.fontSize,
			fontVariant: "initial",
			backgroundColor: token.colorBgElevated,
			borderRadius: token.borderRadiusLG,
			outline: "none",
			boxShadow: token.boxShadowSecondary,
			[`
          ${slideUpEnterActive}${dropdownPlacementCls}bottomLeft,
          ${slideUpAppearActive}${dropdownPlacementCls}bottomLeft
        `]: { animationName: slideUpIn },
			[`
          ${slideUpEnterActive}${dropdownPlacementCls}topLeft,
          ${slideUpAppearActive}${dropdownPlacementCls}topLeft,
          ${slideUpEnterActive}${dropdownPlacementCls}topRight,
          ${slideUpAppearActive}${dropdownPlacementCls}topRight
        `]: { animationName: slideDownIn },
			[`${slideUpLeaveActive}${dropdownPlacementCls}bottomLeft`]: { animationName: slideUpOut },
			[`
          ${slideUpLeaveActive}${dropdownPlacementCls}topLeft,
          ${slideUpLeaveActive}${dropdownPlacementCls}topRight
        `]: { animationName: slideDownOut },
			"&-hidden": { display: "none" },
			[selectItemCls]: {
				...genItemStyle(token),
				cursor: "pointer",
				transition: `background-color ${token.motionDurationSlow} ease`,
				borderRadius: token.borderRadiusSM,
				"&-group": {
					color: token.colorTextDescription,
					fontSize: token.fontSizeSM,
					cursor: "default"
				},
				"&-option": {
					display: "flex",
					"&-content": {
						flex: "auto",
						...textEllipsis
					},
					"&-state": {
						flex: "none",
						display: "flex",
						alignItems: "center"
					},
					[`&-active:not(${selectItemCls}-option-disabled)`]: { backgroundColor: token.optionActiveBg },
					[`&-selected:not(${selectItemCls}-option-disabled)`]: {
						color: token.optionSelectedColor,
						fontWeight: token.optionSelectedFontWeight,
						backgroundColor: token.optionSelectedBg,
						[`${selectItemCls}-option-state`]: { color: token.colorPrimary }
					},
					"&-disabled": {
						[`&${selectItemCls}-option-selected`]: { backgroundColor: token.colorBgContainerDisabled },
						color: token.colorTextDisabled,
						cursor: "not-allowed"
					},
					"&-grouped": { paddingInlineStart: token.calc(token.controlPaddingHorizontal).mul(2).equal() }
				},
				"&-empty": {
					...genItemStyle(token),
					color: token.colorTextDisabled
				}
			},
			[`${selectedItemCls}:has(+ ${selectedItemCls})`]: {
				borderEndStartRadius: 0,
				borderEndEndRadius: 0,
				[`& + ${selectedItemCls}`]: {
					borderStartStartRadius: 0,
					borderStartEndRadius: 0
				}
			},
			"&-rtl": { direction: "rtl" }
		} },
		initSlideMotion(token, "slide-up"),
		initSlideMotion(token, "slide-down"),
		initMoveMotion(token, "move-up"),
		initMoveMotion(token, "move-down")
	];
};
//#endregion
//#region node_modules/antd/es/select/style/select-input-customize.js
var genSelectInputCustomizeStyle = (token) => {
	const { componentCls } = token;
	return { [`&${componentCls}-customize`]: {
		border: 0,
		padding: 0,
		fontSize: "inherit",
		lineHeight: "inherit",
		[`${componentCls}-placeholder`]: { display: "none" },
		[`${componentCls}-content`]: {
			margin: 0,
			padding: 0,
			"&-value": { display: "none" }
		}
	} };
};
//#endregion
//#region node_modules/antd/es/select/style/select-input-multiple.js
var FIXED_INPUT_MIN_WIDTH = 4;
var genSelectInputMultipleStyle = (token) => {
	const { componentCls, calc, iconCls, paddingXS, paddingXXS, INTERNAL_FIXED_ITEM_MARGIN, lineWidth, colorIcon, colorIconHover, inputPaddingHorizontalBase, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "select");
	return { "&-multiple": {
		[varName("multi-item-background")]: token.multipleItemBg,
		[varName("multi-item-border-color")]: "transparent",
		[varName("multi-item-border-radius")]: token.borderRadiusSM,
		[varName("multi-item-height")]: token.multipleItemHeight,
		[varName("multi-padding-base")]: `calc((${varRef("height")} - ${varRef("multi-item-height")}) / 2)`,
		[varName("multi-padding-vertical")]: `calc(${varRef("multi-padding-base")} - ${INTERNAL_FIXED_ITEM_MARGIN} - ${lineWidth})`,
		[varName("multi-item-padding-horizontal")]: `calc(${inputPaddingHorizontalBase} - ${varRef("multi-padding-vertical")} - ${lineWidth} * 2)`,
		paddingBlock: varRef("multi-padding-vertical"),
		paddingInlineStart: `calc(${varRef("multi-padding-base")} - ${lineWidth})`,
		[`${componentCls}-prefix`]: { marginInlineStart: varRef("multi-item-padding-horizontal") },
		[`${componentCls}-prefix + ${componentCls}-content`]: {
			[`${componentCls}-placeholder`]: { insetInlineStart: 0 },
			[`${componentCls}-content-item${componentCls}-content-item-suffix`]: { marginInlineStart: 0 }
		},
		[`${componentCls}-placeholder`]: {
			position: "absolute",
			lineHeight: varRef("line-height"),
			insetInlineStart: varRef("multi-item-padding-horizontal"),
			width: `calc(100% - ${varRef("multi-item-padding-horizontal")})`,
			top: "50%",
			transform: "translateY(-50%)"
		},
		[`${componentCls}-content`]: {
			flexWrap: "wrap",
			alignItems: "center",
			lineHeight: 1,
			"&-item-prefix": { height: varRef("font-size") },
			"&-item": {
				lineHeight: 1,
				maxWidth: `calc(100% - ${FIXED_INPUT_MIN_WIDTH}px)`
			},
			[`${componentCls}-content-item-prefix + ${componentCls}-content-item-suffix,
          ${componentCls}-content-item-suffix:first-child`]: { marginInlineStart: varRef("multi-item-padding-horizontal") },
			[`${componentCls}-selection-item`]: {
				lineHeight: `calc(${varRef("multi-item-height")} - ${lineWidth} * 2)`,
				border: `${lineWidth} solid ${varRef("multi-item-border-color")}`,
				display: "flex",
				marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
				marginInlineEnd: calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
				background: varRef("multi-item-background"),
				borderRadius: varRef("multi-item-border-radius"),
				paddingInlineStart: paddingXS,
				paddingInlineEnd: paddingXXS,
				transition: [
					"height",
					"line-height",
					"padding"
				].map((key) => `${key} ${token.motionDurationSlow}`).join(","),
				"&-content": {
					...textEllipsis,
					marginInlineEnd: paddingXXS
				},
				"&-remove": {
					...resetIcon(),
					display: "inline-flex",
					alignItems: "center",
					color: colorIcon,
					fontWeight: "bold",
					fontSize: 10,
					lineHeight: "inherit",
					cursor: "pointer",
					[`> ${iconCls}`]: { verticalAlign: "-0.2em" },
					"&:hover": { color: colorIconHover }
				}
			},
			[`${componentCls}-input`]: {
				lineHeight: calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).add(varRef("multi-item-height")).equal(),
				width: `calc(var(--select-input-width, 0) * 1px)`,
				minWidth: FIXED_INPUT_MIN_WIDTH,
				maxWidth: "100%",
				transition: `line-height ${token.motionDurationSlow}`
			}
		},
		[`&${componentCls}-sm`]: {
			[varName("multi-item-height")]: token.multipleItemHeightSM,
			[varName("multi-item-border-radius")]: token.borderRadiusXS
		},
		[`&${componentCls}-lg`]: {
			[varName("multi-item-height")]: token.multipleItemHeightLG,
			[varName("multi-item-border-radius")]: token.borderRadius
		},
		[`&${componentCls}-filled`]: {
			[varName("multi-item-border-color")]: token.colorSplit,
			[varName("multi-item-background")]: token.colorBgContainer,
			[`&${componentCls}-disabled`]: { [varName("multi-item-border-color")]: "transparent" }
		}
	} };
};
//#endregion
//#region node_modules/antd/es/select/style/select-input.js
/** Set CSS variables and hover/focus styles for a Select input based on provided colors. */
var genSelectInputVariableStyle = (token, colors) => {
	const { componentCls, antCls } = token;
	const [varName] = genCssVar(antCls, "select");
	const { border, borderHover, borderActive, borderOutline } = colors;
	const baseBG = colors.background || token.selectorBg || token.colorBgContainer;
	return {
		[varName("border-color")]: border,
		[varName("background-color")]: baseBG,
		[varName("color")]: colors.color || token.colorText,
		[`&:not(${componentCls}-disabled)`]: {
			"&:hover": {
				[varName("border-color")]: borderHover,
				[varName("background-color")]: colors.backgroundHover || baseBG
			},
			[`&${componentCls}-focused`]: {
				[varName("border-color")]: borderActive,
				[varName("background-color")]: colors.backgroundActive || baseBG,
				boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${borderOutline}`
			}
		},
		[`&${componentCls}-disabled`]: {
			[varName("border-color")]: colors.borderDisabled || colors.border,
			[varName("background-color")]: colors.backgroundDisabled || colors.background
		}
	};
};
/** Generate variant-scoped variable styles and status overrides for a Select input. */
var genSelectInputVariantStyle = (token, variant, colors, errorColors = {}, warningColors = {}, patchStyle) => {
	const { componentCls } = token;
	return { [`&${componentCls}-${variant}`]: [
		genSelectInputVariableStyle(token, colors),
		{
			[`&${componentCls}-status-error`]: genSelectInputVariableStyle(token, {
				...colors,
				color: errorColors.color || token.colorError,
				...errorColors
			}),
			[`&${componentCls}-status-warning`]: genSelectInputVariableStyle(token, {
				...colors,
				color: warningColors.color || token.colorWarning,
				...warningColors
			})
		},
		patchStyle
	] };
};
var genSelectInputStyle = (token) => {
	const { componentCls, fontHeight, controlHeight, iconCls, antCls, calc } = token;
	const [varName, varRef] = genCssVar(antCls, "select");
	return { [componentCls]: [
		{
			[varName("border-radius")]: token.borderRadius,
			[varName("border-color")]: "#000",
			[varName("border-size")]: token.lineWidth,
			[varName("background-color")]: token.colorBgContainer,
			[varName("font-size")]: token.fontSize,
			[varName("line-height")]: token.lineHeight,
			[varName("font-height")]: fontHeight,
			[varName("color")]: token.colorText,
			[varName("height")]: controlHeight,
			[varName("padding-horizontal")]: calc(token.paddingSM).sub(token.lineWidth).equal(),
			[varName("padding-vertical")]: `calc((${varRef("height")} - ${varRef("font-height")}) / 2 - ${varRef("border-size")})`,
			...resetComponent(token, true),
			display: "inline-flex",
			flexWrap: "nowrap",
			position: "relative",
			transition: `all ${token.motionDurationSlow}`,
			alignItems: "flex-start",
			outline: 0,
			cursor: "pointer",
			borderRadius: varRef("border-radius"),
			borderWidth: varRef("border-size"),
			borderStyle: token.lineType,
			borderColor: varRef("border-color"),
			background: varRef("background-color"),
			fontSize: varRef("font-size"),
			lineHeight: varRef("line-height"),
			color: varRef("color"),
			paddingInline: varRef("padding-horizontal"),
			paddingBlock: varRef("padding-vertical"),
			[`${componentCls}-prefix`]: {
				flex: "none",
				lineHeight: 1
			},
			[`${componentCls}-placeholder`]: {
				...textEllipsis,
				color: token.colorTextPlaceholder,
				pointerEvents: "none",
				zIndex: 1
			},
			[`${componentCls}-content`]: {
				flex: "auto",
				minWidth: 0,
				position: "relative",
				display: "flex",
				marginInlineEnd: calc(token.paddingXXS).mul(1.5).equal(),
				"&:before": {
					content: "\"\\a0\"",
					width: 0,
					overflow: "hidden"
				},
				"&-value": { visibility: "inherit" },
				"input[readonly]": {
					cursor: "inherit",
					caretColor: "transparent"
				}
			},
			[`${componentCls}-suffix`]: {
				flex: "none",
				color: token.colorTextQuaternary,
				fontSize: token.fontSizeIcon,
				lineHeight: 1,
				"> :not(:last-child)": { marginInlineEnd: token.marginXS }
			},
			[`${componentCls}-prefix, ${componentCls}-suffix`]: {
				alignSelf: "center",
				[iconCls]: { verticalAlign: "top" }
			},
			"&-disabled": {
				background: token.colorBgContainerDisabled,
				color: token.colorTextDisabled,
				cursor: "not-allowed",
				input: { cursor: "not-allowed" }
			},
			"&-sm": {
				[varName("height")]: token.controlHeightSM,
				[varName("padding-horizontal")]: calc(token.paddingXS).sub(token.lineWidth).equal(),
				[varName("border-radius")]: token.borderRadiusSM,
				[`${componentCls}-clear`]: { insetInlineEnd: varRef("padding-horizontal") }
			},
			"&-lg": {
				[varName("height")]: token.controlHeightLG,
				[varName("font-size")]: token.fontSizeLG,
				[varName("line-height")]: token.lineHeightLG,
				[varName("font-height")]: token.fontHeightLG,
				[varName("border-radius")]: token.borderRadiusLG
			}
		},
		{ [`&:not(${componentCls}-customize)`]: { [`${componentCls}-input`]: {
			outline: "none",
			background: "transparent",
			appearance: "none",
			border: 0,
			margin: 0,
			padding: 0,
			color: varRef("color"),
			"&::-webkit-search-cancel-button": {
				display: "none",
				appearance: "none"
			}
		} } },
		{ [`&-single:not(${componentCls}-customize)`]: {
			[`${componentCls}-input`]: {
				position: "absolute",
				inset: 0,
				lineHeight: `calc(${varRef("font-height")} + ${varRef("padding-vertical")} * 2)`
			},
			[`${componentCls}-content`]: {
				...textEllipsis,
				alignSelf: "center",
				"&-has-value": {
					display: "block",
					"&:before": { display: "none" }
				},
				"&-has-search-value": { color: "transparent" },
				"&-value": {
					transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
					zIndex: 1
				}
			},
			[`&${componentCls}-open ${componentCls}-content`]: {
				color: token.colorTextPlaceholder,
				"&-has-search-value": { color: "transparent" }
			}
		} },
		{ [`&-show-search:not(${componentCls}-customize-input):not(${componentCls}-disabled)`]: { cursor: "text" } },
		genSelectInputMultipleStyle(token),
		genSelectInputVariantStyle(token, "outlined", {
			border: token.colorBorder,
			borderHover: token.hoverBorderColor,
			borderActive: token.activeBorderColor,
			borderOutline: token.activeOutlineColor,
			borderDisabled: token.colorBorderDisabled
		}, {
			border: token.colorError,
			borderHover: token.colorErrorHover,
			borderActive: token.colorError,
			borderOutline: token.colorErrorOutline
		}, {
			border: token.colorWarning,
			borderHover: token.colorWarningHover,
			borderActive: token.colorWarning,
			borderOutline: token.colorWarningOutline
		}),
		genSelectInputVariantStyle(token, "filled", {
			border: "transparent",
			borderHover: "transparent",
			borderActive: token.activeBorderColor,
			borderOutline: "transparent",
			borderDisabled: token.colorBorderDisabled,
			background: token.colorFillTertiary,
			backgroundHover: token.colorFillSecondary,
			backgroundActive: token.colorBgContainer
		}, {
			background: token.colorErrorBg,
			backgroundHover: token.colorErrorBgHover,
			borderActive: token.colorError
		}, {
			background: token.colorWarningBg,
			backgroundHover: token.colorWarningBgHover,
			borderActive: token.colorWarning
		}),
		genSelectInputVariantStyle(token, "borderless", {
			border: "transparent",
			borderHover: "transparent",
			borderActive: "transparent",
			borderOutline: "transparent",
			background: "transparent"
		}),
		genSelectInputVariantStyle(token, "underlined", {
			border: token.colorBorder,
			borderHover: token.hoverBorderColor,
			borderActive: token.activeBorderColor,
			borderOutline: "transparent"
		}, {
			border: token.colorError,
			borderHover: token.colorErrorHover,
			borderActive: token.colorError
		}, {
			border: token.colorWarning,
			borderHover: token.colorWarningHover,
			borderActive: token.colorWarning
		}, {
			borderRadius: 0,
			borderTopColor: "transparent",
			borderRightColor: "transparent",
			borderLeftColor: "transparent"
		}),
		genSelectInputCustomizeStyle(token)
	] };
};
//#endregion
//#region node_modules/antd/es/select/style/token.js
var prepareComponentToken$22 = (token) => {
	const { fontSize, lineHeight, lineWidth, controlHeight, controlHeightSM, controlHeightLG, paddingXXS, controlPaddingHorizontal, zIndexPopupBase, colorText, fontWeightStrong, controlItemBgActive, controlItemBgHover, colorBgContainer, colorFillSecondary, colorBgContainerDisabled, colorTextDisabled, colorPrimaryHover, colorPrimary, controlOutline } = token;
	const dblPaddingXXS = paddingXXS * 2;
	const dblLineWidth = lineWidth * 2;
	const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
	const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
	const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
	return {
		INTERNAL_FIXED_ITEM_MARGIN: Math.floor(paddingXXS / 2),
		zIndexPopup: zIndexPopupBase + 50,
		optionSelectedColor: colorText,
		optionSelectedFontWeight: fontWeightStrong,
		optionSelectedBg: controlItemBgActive,
		optionActiveBg: controlItemBgHover,
		optionPadding: `${(controlHeight - fontSize * lineHeight) / 2}px ${controlPaddingHorizontal}px`,
		optionFontSize: fontSize,
		optionLineHeight: lineHeight,
		optionHeight: controlHeight,
		selectorBg: colorBgContainer,
		clearBg: colorBgContainer,
		singleItemHeightLG: controlHeightLG,
		multipleItemBg: colorFillSecondary,
		multipleItemBorderColor: "transparent",
		multipleItemHeight,
		multipleItemHeightSM,
		multipleItemHeightLG,
		multipleSelectorBgDisabled: colorBgContainerDisabled,
		multipleItemColorDisabled: colorTextDisabled,
		multipleItemBorderColorDisabled: "transparent",
		showArrowPaddingInlineEnd: Math.ceil(token.fontSize * 1.25),
		hoverBorderColor: colorPrimaryHover,
		activeBorderColor: colorPrimary,
		activeOutlineColor: controlOutline,
		selectAffixPadding: paddingXXS
	};
};
//#endregion
//#region node_modules/antd/es/select/style/index.js
var genBaseStyle$8 = (token) => {
	const { antCls, componentCls, motionDurationMid, inputPaddingHorizontalBase } = token;
	const hoverShowClearStyle = { [`${componentCls}-clear`]: {
		opacity: 1,
		background: token.colorBgBase,
		borderRadius: "50%"
	} };
	return {
		[componentCls]: {
			...resetComponent(token),
			[`${componentCls}-selection-item`]: {
				flex: 1,
				fontWeight: "normal",
				position: "relative",
				userSelect: "none",
				...textEllipsis,
				[`> ${antCls}-typography`]: { display: "inline" }
			},
			[`${componentCls}-prefix`]: {
				flex: "none",
				marginInlineEnd: token.selectAffixPadding
			},
			[`${componentCls}-clear`]: {
				position: "absolute",
				top: "50%",
				insetInlineStart: "auto",
				insetInlineEnd: inputPaddingHorizontalBase,
				zIndex: 1,
				display: "inline-block",
				width: token.fontSizeIcon,
				height: token.fontSizeIcon,
				marginTop: token.calc(token.fontSizeIcon).mul(-1).div(2).equal(),
				color: token.colorTextQuaternary,
				fontSize: token.fontSizeIcon,
				fontStyle: "normal",
				lineHeight: 1,
				textAlign: "center",
				textTransform: "none",
				cursor: "pointer",
				opacity: 0,
				transition: ["color", "opacity"].map((prop) => `${prop} ${motionDurationMid} ease`).join(", "),
				textRendering: "auto",
				transform: "translateZ(0)",
				"&:before": { display: "block" },
				"&:hover": { color: token.colorIcon }
			},
			"@media(hover:none)": hoverShowClearStyle,
			"&:hover": hoverShowClearStyle
		},
		[`${componentCls}-status`]: { "&-error, &-warning, &-success, &-validating": { [`&${componentCls}-has-feedback`]: { [`${componentCls}-clear`]: { insetInlineEnd: token.calc(inputPaddingHorizontalBase).add(token.fontSize).add(token.paddingXS).equal() } } } }
	};
};
var genSelectStyle = (token) => {
	const { componentCls } = token;
	return [
		{ [componentCls]: { [`&${componentCls}-in-form-item`]: { width: "100%" } } },
		genBaseStyle$8(token),
		genSingleStyle(token),
		{ [`${componentCls}-rtl`]: { direction: "rtl" } },
		genCompactItemStyle(token, { focusElCls: `${componentCls}-focused` })
	];
};
var style_default$25 = genStyleHooks("Select", (token, { rootPrefixCls }) => {
	const selectToken = merge$1(token, {
		rootPrefixCls,
		inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(token.lineWidth).equal(),
		multipleSelectItemHeight: token.multipleItemHeight,
		selectHeight: token.controlHeight
	});
	return [genSelectStyle(selectToken), genSelectInputStyle(selectToken)];
}, prepareComponentToken$22, { unitless: {
	optionLineHeight: true,
	optionSelectedFontWeight: true
} });
//#endregion
//#region node_modules/antd/es/select/useIcons.js
function useIcons$1({ suffixIcon, clearIcon, menuItemSelectedIcon, removeIcon, loading, loadingIcon, multiple, hasFeedback, showSuffixIcon, feedbackIcon, showArrow, componentName }) {
	const mergedClearIcon = clearIcon ?? /* @__PURE__ */ import_react.createElement(RefIcon$3, null);
	const getSuffixIconNode = (arrowIcon) => {
		if (suffixIcon === null && !hasFeedback && !showArrow) return null;
		return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, showSuffixIcon !== false && arrowIcon, hasFeedback && feedbackIcon);
	};
	let mergedSuffixIcon = null;
	if (suffixIcon !== void 0) mergedSuffixIcon = getSuffixIconNode(suffixIcon);
	else if (loading) mergedSuffixIcon = getSuffixIconNode(loadingIcon ?? /* @__PURE__ */ import_react.createElement(RefIcon$5, { spin: true }));
	else mergedSuffixIcon = ({ open, showSearch }) => {
		if (open && showSearch) return getSuffixIconNode(/* @__PURE__ */ import_react.createElement(RefIcon$6, null));
		return getSuffixIconNode(/* @__PURE__ */ import_react.createElement(RefIcon$7, null));
	};
	let mergedItemIcon = null;
	if (menuItemSelectedIcon !== void 0) mergedItemIcon = menuItemSelectedIcon;
	else if (multiple) mergedItemIcon = /* @__PURE__ */ import_react.createElement(RefIcon$8, null);
	else mergedItemIcon = null;
	let mergedRemoveIcon = null;
	if (removeIcon !== void 0) mergedRemoveIcon = removeIcon;
	else mergedRemoveIcon = /* @__PURE__ */ import_react.createElement(RefIcon, null);
	return {
		clearIcon: mergedClearIcon,
		suffixIcon: mergedSuffixIcon,
		itemIcon: mergedItemIcon,
		removeIcon: mergedRemoveIcon
	};
}
//#endregion
//#region node_modules/antd/es/select/usePopupRender.js
function usePopupRender(renderFn) {
	return import_react.useMemo(() => {
		if (!renderFn) return;
		return (...args) => /* @__PURE__ */ import_react.createElement(ContextIsolator, { space: true }, renderFn.apply(void 0, args));
	}, [renderFn]);
}
//#endregion
//#region node_modules/antd/es/select/useShowArrow.js
/**
* Since Select, TreeSelect, Cascader is same Select like component.
* We just use same hook to handle this logic.
*
* If `suffixIcon` is not equal to `null`, always show it.
*/
function useShowArrow(suffixIcon, showArrow) {
	return showArrow !== void 0 ? showArrow : suffixIcon !== null;
}
//#endregion
//#region node_modules/antd/es/select/index.js
var SECRET_COMBOBOX_MODE_DO_NOT_USE = "SECRET_COMBOBOX_MODE_DO_NOT_USE";
var InternalSelect = (props, ref) => {
	const { prefixCls: customizePrefixCls, bordered, className, rootClassName, getPopupContainer, popupClassName, dropdownClassName, listHeight = 256, placement, listItemHeight: customListItemHeight, size: customizeSize, disabled: customDisabled, notFoundContent, status: customStatus, builtinPlacements, dropdownMatchSelectWidth, popupMatchSelectWidth, direction: propDirection, style, allowClear, variant: customizeVariant, popupStyle, dropdownStyle, transitionName, tagRender, maxCount, prefix, dropdownRender, popupRender, onDropdownVisibleChange, onOpenChange, styles, classNames, ...rest } = props;
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, renderEmpty, direction: contextDirection, virtual, popupMatchSelectWidth: contextPopupMatchSelectWidth, popupOverflow } = import_react.useContext(ConfigContext);
	const { showSearch, style: contextStyle, styles: contextStyles, className: contextClassName, classNames: contextClassNames } = useComponentConfig("select");
	const [, token] = useToken();
	const listItemHeight = customListItemHeight ?? token?.controlHeight;
	const prefixCls = getPrefixCls("select", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const direction = propDirection ?? contextDirection;
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const [variant, enableVariantCls] = useVariant("select", customizeVariant, bordered);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$25(prefixCls, rootCls);
	const mode = import_react.useMemo(() => {
		const { mode: m } = props;
		if (m === "combobox") return;
		if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) return "combobox";
		return m;
	}, [props.mode]);
	const isMultiple = mode === "multiple" || mode === "tags";
	const showSuffixIcon = useShowArrow(props.suffixIcon, props.showArrow);
	const mergedPopupMatchSelectWidth = popupMatchSelectWidth ?? dropdownMatchSelectWidth ?? contextPopupMatchSelectWidth;
	const mergedPopupRender = usePopupRender(popupRender || dropdownRender);
	const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;
	const { status: contextStatus, hasFeedback, isFormItemInput, feedbackIcon } = import_react.useContext(FormItemInputContext);
	const mergedStatus = getMergedStatus(contextStatus, customStatus);
	let mergedNotFound;
	if (notFoundContent !== void 0) mergedNotFound = notFoundContent;
	else if (mode === "combobox") mergedNotFound = null;
	else mergedNotFound = renderEmpty?.("Select") || /* @__PURE__ */ import_react.createElement(DefaultRenderEmpty, { componentName: "Select" });
	const { suffixIcon, itemIcon, removeIcon, clearIcon } = useIcons$1({
		...rest,
		multiple: isMultiple,
		hasFeedback,
		feedbackIcon,
		showSuffixIcon,
		prefixCls,
		componentName: "Select"
	});
	const mergedAllowClear = allowClear === true ? { clearIcon } : allowClear;
	const selectProps = omit(rest, ["suffixIcon", "itemIcon"]);
	const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const mergedProps = {
		...props,
		variant,
		status: mergedStatus,
		disabled: mergedDisabled,
		size: mergedSize
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps }, { popup: { _default: "root" } });
	const mergedPopupClassName = clsx(mergedClassNames.popup?.root, popupClassName, dropdownClassName, { [`${prefixCls}-dropdown-${direction}`]: direction === "rtl" }, rootClassName, cssVarCls, rootCls, hashId);
	const mergedPopupStyle = {
		...mergedStyles.popup?.root,
		...popupStyle ?? dropdownStyle
	};
	const mergedClassName = clsx({
		[`${prefixCls}-lg`]: mergedSize === "large",
		[`${prefixCls}-sm`]: mergedSize === "small",
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-${variant}`]: enableVariantCls,
		[`${prefixCls}-in-form-item`]: isFormItemInput
	}, getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, contextClassName, className, mergedClassNames.root, rootClassName, cssVarCls, rootCls, hashId);
	const memoPlacement = import_react.useMemo(() => {
		if (placement !== void 0) return placement;
		return direction === "rtl" ? "bottomRight" : "bottomLeft";
	}, [placement, direction]);
	const [zIndex] = useZIndex("SelectLike", mergedStyles.popup?.root?.zIndex ?? mergedPopupStyle?.zIndex);
	return /* @__PURE__ */ import_react.createElement(es_default$2, {
		ref,
		virtual,
		classNames: mergedClassNames,
		styles: mergedStyles,
		showSearch,
		...selectProps,
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		popupMatchSelectWidth: mergedPopupMatchSelectWidth,
		transitionName: getTransitionName(rootPrefixCls, "slide-up", transitionName),
		builtinPlacements: mergedBuiltinPlacements(builtinPlacements, popupOverflow),
		listHeight,
		listItemHeight,
		mode,
		prefixCls,
		placement: memoPlacement,
		direction,
		prefix,
		suffixIcon,
		menuItemSelectedIcon: itemIcon,
		removeIcon,
		allowClear: mergedAllowClear,
		notFoundContent: mergedNotFound,
		className: mergedClassName,
		getPopupContainer: getPopupContainer || getContextPopupContainer,
		popupClassName: mergedPopupClassName,
		disabled: mergedDisabled,
		popupStyle: {
			...mergedStyles.popup?.root,
			...mergedPopupStyle,
			zIndex
		},
		maxCount: isMultiple ? maxCount : void 0,
		tagRender: isMultiple ? tagRender : void 0,
		popupRender: mergedPopupRender,
		onPopupVisibleChange: mergedOnOpenChange
	});
};
var Select = /* @__PURE__ */ import_react.forwardRef(InternalSelect);
/* istanbul ignore next */
var PurePanel$6 = genPurePanel(Select, "popupAlign");
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;
Select._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$6;
//#endregion
//#region node_modules/antd/es/_util/responsiveObserver.js
var responsiveArray = [
	"xxxl",
	"xxl",
	"xl",
	"lg",
	"md",
	"sm",
	"xs"
];
var responsiveArrayReversed = [].concat(responsiveArray).reverse();
var getResponsiveMap = (token) => ({
	xs: `(max-width: ${token.screenXSMax}px)`,
	sm: `(min-width: ${token.screenSM}px)`,
	md: `(min-width: ${token.screenMD}px)`,
	lg: `(min-width: ${token.screenLG}px)`,
	xl: `(min-width: ${token.screenXL}px)`,
	xxl: `(min-width: ${token.screenXXL}px)`,
	xxxl: `(min-width: ${token.screenXXXL}px)`
});
/**
* Ensures that the breakpoints token are valid, in good order
* For each breakpoint : screenMin <= screen <= screenMax and screenMax <= nextScreenMin
*/
var validateBreakpoints = (token) => {
	const indexableToken = token;
	const revBreakpoints = [].concat(responsiveArray).reverse();
	revBreakpoints.forEach((breakpoint, i) => {
		const breakpointUpper = breakpoint.toUpperCase();
		const screenMin = `screen${breakpointUpper}Min`;
		const screen = `screen${breakpointUpper}`;
		if (!(indexableToken[screenMin] <= indexableToken[screen])) throw new Error(`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`);
		if (i < revBreakpoints.length - 1) {
			const screenMax = `screen${breakpointUpper}Max`;
			if (!(indexableToken[screen] <= indexableToken[screenMax])) throw new Error(`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`);
			const nextScreenMin = `screen${revBreakpoints[i + 1].toUpperCase()}Min`;
			if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`);
		}
	});
	return token;
};
var useResponsiveObserver = () => {
	const [, token] = useToken();
	const responsiveMap = getResponsiveMap(validateBreakpoints(token));
	return import_react.useMemo(() => {
		const subscribers = /* @__PURE__ */ new Map();
		let subUid = -1;
		let screens = {};
		return {
			responsiveMap,
			matchHandlers: {},
			dispatch(pointMap) {
				screens = pointMap;
				subscribers.forEach((func) => func(screens));
				return subscribers.size >= 1;
			},
			subscribe(func) {
				if (!subscribers.size) this.register();
				subUid += 1;
				subscribers.set(subUid, func);
				func(screens);
				return subUid;
			},
			unsubscribe(paramToken) {
				subscribers.delete(paramToken);
				if (!subscribers.size) this.unregister();
			},
			register() {
				Object.entries(responsiveMap).forEach(([screen, mediaQuery]) => {
					const listener = ({ matches }) => {
						this.dispatch({
							...screens,
							[screen]: matches
						});
					};
					const mql = window.matchMedia(mediaQuery);
					if (typeof mql?.addEventListener === "function") mql.addEventListener("change", listener);
					this.matchHandlers[mediaQuery] = {
						mql,
						listener
					};
					listener(mql);
				});
			},
			unregister() {
				Object.values(responsiveMap).forEach((mediaQuery) => {
					const handler = this.matchHandlers[mediaQuery];
					if (typeof handler?.mql?.removeEventListener === "function") handler.mql.removeEventListener("change", handler?.listener);
				});
				subscribers.clear();
			}
		};
	}, [responsiveMap]);
};
//#endregion
//#region node_modules/antd/es/grid/hooks/useBreakpoint.js
function useBreakpoint(refreshOnChange = true, defaultScreens = {}) {
	const screensRef = (0, import_react.useRef)(defaultScreens);
	const [, forceUpdate] = useForceUpdate();
	const responsiveObserver = useResponsiveObserver();
	useLayoutEffect(() => {
		const token = responsiveObserver.subscribe((supportScreens) => {
			screensRef.current = supportScreens;
			if (refreshOnChange) forceUpdate();
		});
		return () => responsiveObserver.unsubscribe(token);
	}, []);
	return screensRef.current;
}
//#endregion
//#region node_modules/antd/es/avatar/AvatarContext.js
var AvatarContext = /* @__PURE__ */ import_react.createContext({});
//#endregion
//#region node_modules/antd/es/avatar/style/index.js
var genBaseStyle$7 = (token) => {
	const { antCls, componentCls, iconCls, avatarBg, avatarColor, containerSize, containerSizeLG, containerSizeSM, textFontSize, textFontSizeLG, textFontSizeSM, iconFontSize, iconFontSizeLG, iconFontSizeSM, borderRadius, borderRadiusLG, borderRadiusSM, lineWidth, lineType } = token;
	const avatarSizeStyle = (size, fontSize, iconFontSize, radius) => ({
		width: size,
		height: size,
		borderRadius: "50%",
		fontSize,
		[`&${componentCls}-square`]: { borderRadius: radius },
		[`&${componentCls}-icon`]: {
			fontSize: iconFontSize,
			[`> ${iconCls}`]: { margin: 0 }
		}
	});
	return { [componentCls]: {
		...resetComponent(token),
		position: "relative",
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		color: avatarColor,
		whiteSpace: "nowrap",
		textAlign: "center",
		verticalAlign: "middle",
		background: avatarBg,
		border: `${unit(lineWidth)} ${lineType} transparent`,
		"&-image": { background: "transparent" },
		[`${antCls}-image-img`]: { display: "block" },
		...avatarSizeStyle(containerSize, textFontSize, iconFontSize, borderRadius),
		"&-lg": { ...avatarSizeStyle(containerSizeLG, textFontSizeLG, iconFontSizeLG, borderRadiusLG) },
		"&-sm": { ...avatarSizeStyle(containerSizeSM, textFontSizeSM, iconFontSizeSM, borderRadiusSM) },
		"> img": {
			display: "block",
			width: "100%",
			height: "100%",
			objectFit: "cover"
		}
	} };
};
var genGroupStyle$1 = (token) => {
	const { componentCls, groupBorderColor, groupOverlapping, groupSpace } = token;
	return {
		[`${componentCls}-group`]: {
			display: "inline-flex",
			[componentCls]: { borderColor: groupBorderColor },
			"> *:not(:first-child)": { marginInlineStart: groupOverlapping }
		},
		[`${componentCls}-group-popover`]: { [`${componentCls} + ${componentCls}`]: { marginInlineStart: groupSpace } }
	};
};
var prepareComponentToken$21 = (token) => {
	const { controlHeight, controlHeightLG, controlHeightSM, fontSize, fontSizeLG, fontSizeXL, fontSizeHeading3, marginXS, marginXXS, colorBorderBg } = token;
	return {
		containerSize: controlHeight,
		containerSizeLG: controlHeightLG,
		containerSizeSM: controlHeightSM,
		textFontSize: fontSize,
		textFontSizeLG: fontSize,
		textFontSizeSM: fontSize,
		iconFontSize: Math.round((fontSizeLG + fontSizeXL) / 2),
		iconFontSizeLG: fontSizeHeading3,
		iconFontSizeSM: fontSize,
		groupSpace: marginXXS,
		groupOverlapping: -marginXS,
		groupBorderColor: colorBorderBg
	};
};
var style_default$24 = genStyleHooks("Avatar", (token) => {
	const { colorTextLightSolid, colorTextPlaceholder } = token;
	const avatarToken = merge$1(token, {
		avatarBg: colorTextPlaceholder,
		avatarColor: colorTextLightSolid
	});
	return [genBaseStyle$7(avatarToken), genGroupStyle$1(avatarToken)];
}, prepareComponentToken$21);
//#endregion
//#region node_modules/antd/es/avatar/Avatar.js
var Avatar$1 = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, shape, size: customSize, src, srcSet, icon, className, rootClassName, style, alt, draggable, children, crossOrigin, gap = 4, onError, ...others } = props;
	const [scale, setScale] = import_react.useState(1);
	const [mounted, setMounted] = import_react.useState(false);
	const [isImgExist, setIsImgExist] = import_react.useState(true);
	const avatarNodeRef = import_react.useRef(null);
	const avatarChildrenRef = import_react.useRef(null);
	const avatarNodeMergedRef = composeRef(ref, avatarNodeRef);
	const { getPrefixCls, className: contextClassName, style: contextStyle } = useComponentConfig("avatar");
	const avatarCtx = import_react.useContext(AvatarContext);
	const setScaleParam = () => {
		if (!avatarChildrenRef.current || !avatarNodeRef.current) return;
		const childrenWidth = avatarChildrenRef.current.offsetWidth;
		const nodeWidth = avatarNodeRef.current.offsetWidth;
		if (childrenWidth !== 0 && nodeWidth !== 0) {
			if (gap * 2 < nodeWidth) setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
		}
	};
	import_react.useEffect(() => {
		setMounted(true);
	}, []);
	import_react.useEffect(() => {
		setIsImgExist(true);
		setScale(1);
	}, [src]);
	import_react.useEffect(setScaleParam, [gap]);
	const handleImgLoadError = () => {
		if (onError?.() !== false) setIsImgExist(false);
	};
	const size = useSize((ctxSize) => customSize ?? avatarCtx?.size ?? ctxSize ?? "medium");
	const screens = useBreakpoint(Object.keys(typeof size === "object" ? size || {} : {}).some((key) => responsiveArray.includes(key)));
	const responsiveSizeStyle = import_react.useMemo(() => {
		if (typeof size !== "object") return {};
		const currentSize = size[responsiveArray.find((screen) => screens[screen])];
		return currentSize ? {
			width: currentSize,
			height: currentSize,
			fontSize: currentSize && (icon || children) ? currentSize / 2 : 18
		} : {};
	}, [
		screens,
		size,
		icon,
		children
	]);
	const prefixCls = getPrefixCls("avatar", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$24(prefixCls, rootCls);
	const sizeCls = clsx({
		[`${prefixCls}-lg`]: size === "large",
		[`${prefixCls}-sm`]: size === "small"
	});
	const hasImageElement = /* @__PURE__ */ import_react.isValidElement(src);
	const classString = clsx(prefixCls, sizeCls, contextClassName, `${prefixCls}-${shape || avatarCtx?.shape || "circle"}`, {
		[`${prefixCls}-image`]: hasImageElement || src && isImgExist,
		[`${prefixCls}-icon`]: !!icon
	}, cssVarCls, rootCls, className, rootClassName, hashId);
	const sizeStyle = typeof size === "number" ? {
		width: size,
		height: size,
		fontSize: icon ? size / 2 : 18
	} : {};
	let childrenToRender;
	if (typeof src === "string" && isImgExist) childrenToRender = /* @__PURE__ */ import_react.createElement("img", {
		src,
		draggable,
		srcSet,
		onError: handleImgLoadError,
		alt,
		crossOrigin
	});
	else if (hasImageElement) childrenToRender = src;
	else if (icon) childrenToRender = icon;
	else if (mounted || scale !== 1) {
		const transformString = `scale(${scale})`;
		const childrenStyle = {
			msTransform: transformString,
			WebkitTransform: transformString,
			transform: transformString
		};
		childrenToRender = /* @__PURE__ */ import_react.createElement(RefResizeObserver, { onResize: setScaleParam }, /* @__PURE__ */ import_react.createElement("span", {
			className: `${prefixCls}-string`,
			ref: avatarChildrenRef,
			style: childrenStyle
		}, children));
	} else childrenToRender = /* @__PURE__ */ import_react.createElement("span", {
		className: `${prefixCls}-string`,
		style: { opacity: 0 },
		ref: avatarChildrenRef
	}, children);
	return /* @__PURE__ */ import_react.createElement("span", {
		...others,
		style: {
			...sizeStyle,
			...responsiveSizeStyle,
			...contextStyle,
			...style
		},
		className: classString,
		ref: avatarNodeMergedRef
	}, childrenToRender);
});
//#endregion
//#region node_modules/antd/es/_util/getRenderPropValue.js
var getRenderPropValue = (propValue) => {
	if (!propValue) return null;
	return typeof propValue === "function" ? propValue() : propValue;
};
//#endregion
//#region node_modules/antd/es/style/roundedArrow.js
function getArrowToken(token) {
	const { sizePopupArrow, borderRadiusXS, borderRadiusOuter } = token;
	const unitWidth = sizePopupArrow / 2;
	const ax = 0;
	const ay = unitWidth;
	const bx = borderRadiusOuter * 1 / Math.sqrt(2);
	const by = unitWidth - borderRadiusOuter * (1 - 1 / Math.sqrt(2));
	const cx = unitWidth - borderRadiusXS * (1 / Math.sqrt(2));
	const cy = borderRadiusOuter * (Math.sqrt(2) - 1) + borderRadiusXS * (1 / Math.sqrt(2));
	const dx = 2 * unitWidth - cx;
	const dy = cy;
	const ex = 2 * unitWidth - bx;
	const ey = by;
	const fx = 2 * unitWidth - ax;
	const fy = ay;
	const shadowWidth = unitWidth * Math.sqrt(2) + borderRadiusOuter * (Math.sqrt(2) - 2);
	const polygonOffset = borderRadiusOuter * (Math.sqrt(2) - 1);
	const arrowPolygon = `polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`;
	return {
		arrowShadowWidth: shadowWidth,
		arrowPath: `path('M ${ax} ${ay} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${borderRadiusXS} ${borderRadiusXS} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${fx} ${fy} Z')`,
		arrowPolygon
	};
}
var genRoundedArrow = (token, bgColor, boxShadow) => {
	const { sizePopupArrow, arrowPolygon, arrowPath, arrowShadowWidth, borderRadiusXS, calc } = token;
	return {
		pointerEvents: "none",
		width: sizePopupArrow,
		height: sizePopupArrow,
		overflow: "hidden",
		"&::before": {
			position: "absolute",
			bottom: 0,
			insetInlineStart: 0,
			width: sizePopupArrow,
			height: calc(sizePopupArrow).div(2).equal(),
			background: bgColor,
			clipPath: {
				_multi_value_: true,
				value: [arrowPolygon, arrowPath]
			},
			content: "\"\""
		},
		"&::after": {
			content: "\"\"",
			position: "absolute",
			width: arrowShadowWidth,
			height: arrowShadowWidth,
			bottom: 0,
			insetInline: 0,
			margin: "auto",
			borderRadius: {
				_skip_check_: true,
				value: `0 0 ${unit(borderRadiusXS)} 0`
			},
			transform: "translateY(50%) rotate(-135deg)",
			boxShadow,
			zIndex: 0,
			background: "transparent"
		}
	};
};
function getArrowOffsetToken(options) {
	const { contentRadius, limitVerticalRadius } = options;
	const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
	return {
		arrowOffsetHorizontal: arrowOffset,
		arrowOffsetVertical: limitVerticalRadius ? 8 : arrowOffset
	};
}
function isInject(valid, code) {
	if (!valid) return {};
	return code;
}
var getArrowStyle = (token, colorBg, options) => {
	const { componentCls, boxShadowPopoverArrow, arrowOffsetVertical, arrowOffsetHorizontal, antCls } = token;
	const [varName] = genCssVar(antCls, "tooltip");
	const { arrowDistance = 0, arrowPlacement = {
		left: true,
		right: true,
		top: true,
		bottom: true
	} } = options || {};
	return { [componentCls]: {
		[`${componentCls}-arrow`]: [{
			position: "absolute",
			zIndex: 1,
			display: "block",
			...genRoundedArrow(token, colorBg, boxShadowPopoverArrow),
			"&:before": { background: colorBg }
		}],
		...isInject(!!arrowPlacement.top, {
			[[
				`&-placement-top > ${componentCls}-arrow`,
				`&-placement-topLeft > ${componentCls}-arrow`,
				`&-placement-topRight > ${componentCls}-arrow`
			].join(",")]: {
				bottom: arrowDistance,
				transform: "translateY(100%) rotate(180deg)"
			},
			[`&-placement-top > ${componentCls}-arrow`]: {
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translateX(-50%) translateY(100%) rotate(180deg)"
			},
			"&-placement-topLeft": {
				[varName("arrow-offset-x")]: arrowOffsetHorizontal,
				[`> ${componentCls}-arrow`]: { left: {
					_skip_check_: true,
					value: arrowOffsetHorizontal
				} }
			},
			"&-placement-topRight": {
				[varName("arrow-offset-x")]: `calc(100% - ${unit(arrowOffsetHorizontal)})`,
				[`> ${componentCls}-arrow`]: { right: {
					_skip_check_: true,
					value: arrowOffsetHorizontal
				} }
			}
		}),
		...isInject(!!arrowPlacement.bottom, {
			[[
				`&-placement-bottom > ${componentCls}-arrow`,
				`&-placement-bottomLeft > ${componentCls}-arrow`,
				`&-placement-bottomRight > ${componentCls}-arrow`
			].join(",")]: {
				top: arrowDistance,
				transform: `translateY(-100%)`
			},
			[`&-placement-bottom > ${componentCls}-arrow`]: {
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: `translateX(-50%) translateY(-100%)`
			},
			"&-placement-bottomLeft": {
				[varName("arrow-offset-x")]: arrowOffsetHorizontal,
				[`> ${componentCls}-arrow`]: { left: {
					_skip_check_: true,
					value: arrowOffsetHorizontal
				} }
			},
			"&-placement-bottomRight": {
				[varName("arrow-offset-x")]: `calc(100% - ${unit(arrowOffsetHorizontal)})`,
				[`> ${componentCls}-arrow`]: { right: {
					_skip_check_: true,
					value: arrowOffsetHorizontal
				} }
			}
		}),
		...isInject(!!arrowPlacement.left, {
			[[
				`&-placement-left > ${componentCls}-arrow`,
				`&-placement-leftTop > ${componentCls}-arrow`,
				`&-placement-leftBottom > ${componentCls}-arrow`
			].join(",")]: {
				right: {
					_skip_check_: true,
					value: arrowDistance
				},
				transform: "translateX(100%) rotate(90deg)"
			},
			[`&-placement-left > ${componentCls}-arrow`]: {
				top: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translateY(-50%) translateX(100%) rotate(90deg)"
			},
			[`&-placement-leftTop > ${componentCls}-arrow`]: { top: arrowOffsetVertical },
			[`&-placement-leftBottom > ${componentCls}-arrow`]: { bottom: arrowOffsetVertical }
		}),
		...isInject(!!arrowPlacement.right, {
			[[
				`&-placement-right > ${componentCls}-arrow`,
				`&-placement-rightTop > ${componentCls}-arrow`,
				`&-placement-rightBottom > ${componentCls}-arrow`
			].join(",")]: {
				left: {
					_skip_check_: true,
					value: arrowDistance
				},
				transform: "translateX(-100%) rotate(-90deg)"
			},
			[`&-placement-right > ${componentCls}-arrow`]: {
				top: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
			},
			[`&-placement-rightTop > ${componentCls}-arrow`]: { top: arrowOffsetVertical },
			[`&-placement-rightBottom > ${componentCls}-arrow`]: { bottom: arrowOffsetVertical }
		})
	} };
};
//#endregion
//#region node_modules/antd/es/_util/placements.js
function getOverflowOptions(placement, arrowOffset, arrowWidth, autoAdjustOverflow) {
	if (autoAdjustOverflow === false) return {
		adjustX: false,
		adjustY: false
	};
	const overflow = autoAdjustOverflow && typeof autoAdjustOverflow === "object" ? autoAdjustOverflow : {};
	const baseOverflow = {};
	switch (placement) {
		case "top":
		case "bottom":
			baseOverflow.shiftX = arrowOffset.arrowOffsetHorizontal * 2 + arrowWidth;
			baseOverflow.shiftY = true;
			baseOverflow.adjustY = true;
			break;
		case "left":
		case "right":
			baseOverflow.shiftY = arrowOffset.arrowOffsetVertical * 2 + arrowWidth;
			baseOverflow.shiftX = true;
			baseOverflow.adjustX = true;
			break;
	}
	const mergedOverflow = {
		...baseOverflow,
		...overflow
	};
	if (!mergedOverflow.shiftX) mergedOverflow.adjustX = true;
	if (!mergedOverflow.shiftY) mergedOverflow.adjustY = true;
	return mergedOverflow;
}
var PlacementAlignMap = {
	left: { points: ["cr", "cl"] },
	right: { points: ["cl", "cr"] },
	top: { points: ["bc", "tc"] },
	bottom: { points: ["tc", "bc"] },
	topLeft: { points: ["bl", "tl"] },
	leftTop: { points: ["tr", "tl"] },
	topRight: { points: ["br", "tr"] },
	rightTop: { points: ["tl", "tr"] },
	bottomRight: { points: ["tr", "br"] },
	rightBottom: { points: ["bl", "br"] },
	bottomLeft: { points: ["tl", "bl"] },
	leftBottom: { points: ["br", "bl"] }
};
var ArrowCenterPlacementAlignMap = {
	topLeft: { points: ["bl", "tc"] },
	leftTop: { points: ["tr", "cl"] },
	topRight: { points: ["br", "tc"] },
	rightTop: { points: ["tl", "cr"] },
	bottomRight: { points: ["tr", "bc"] },
	rightBottom: { points: ["bl", "cr"] },
	bottomLeft: { points: ["tl", "bc"] },
	leftBottom: { points: ["br", "cl"] }
};
var DisableAutoArrowList = new Set([
	"topLeft",
	"topRight",
	"bottomLeft",
	"bottomRight",
	"leftTop",
	"leftBottom",
	"rightTop",
	"rightBottom"
]);
function getPlacements(config) {
	const { arrowWidth, autoAdjustOverflow, arrowPointAtCenter, offset, borderRadius, visibleFirst } = config;
	const halfArrowWidth = arrowWidth / 2;
	const placementMap = {};
	const arrowOffset = getArrowOffsetToken({
		contentRadius: borderRadius,
		limitVerticalRadius: true
	});
	Object.keys(PlacementAlignMap).forEach((key) => {
		const placementInfo = {
			...arrowPointAtCenter && ArrowCenterPlacementAlignMap[key] || PlacementAlignMap[key],
			offset: [0, 0],
			dynamicInset: true
		};
		placementMap[key] = placementInfo;
		if (DisableAutoArrowList.has(key)) placementInfo.autoArrow = false;
		switch (key) {
			case "top":
			case "topLeft":
			case "topRight":
				placementInfo.offset[1] = -halfArrowWidth - offset;
				break;
			case "bottom":
			case "bottomLeft":
			case "bottomRight":
				placementInfo.offset[1] = halfArrowWidth + offset;
				break;
			case "left":
			case "leftTop":
			case "leftBottom":
				placementInfo.offset[0] = -halfArrowWidth - offset;
				break;
			case "right":
			case "rightTop":
			case "rightBottom":
				placementInfo.offset[0] = halfArrowWidth + offset;
				break;
		}
		if (arrowPointAtCenter) switch (key) {
			case "topLeft":
			case "bottomLeft":
				placementInfo.offset[0] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
				break;
			case "topRight":
			case "bottomRight":
				placementInfo.offset[0] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
				break;
			case "leftTop":
			case "rightTop":
				placementInfo.offset[1] = -arrowOffset.arrowOffsetHorizontal * 2 + halfArrowWidth;
				break;
			case "leftBottom":
			case "rightBottom":
				placementInfo.offset[1] = arrowOffset.arrowOffsetHorizontal * 2 - halfArrowWidth;
				break;
		}
		placementInfo.overflow = getOverflowOptions(key, arrowOffset, arrowWidth, autoAdjustOverflow);
		if (visibleFirst) placementInfo.htmlRegion = "visibleFirst";
	});
	return placementMap;
}
//#endregion
//#region node_modules/antd/es/table/TableMeasureRowContext.js
var TableMeasureRowContext = /* @__PURE__ */ import_react.createContext(false);
//#endregion
//#region node_modules/antd/es/tooltip/hook/useMergedArrow.js
var useMergedArrow = (providedArrow, providedContextArrow) => {
	const toConfig = (arrow) => typeof arrow === "boolean" ? { show: arrow } : arrow || {};
	return import_react.useMemo(() => {
		const arrowConfig = toConfig(providedArrow);
		const contextArrowConfig = toConfig(providedContextArrow);
		return {
			...contextArrowConfig,
			...arrowConfig,
			show: arrowConfig.show ?? contextArrowConfig.show ?? true
		};
	}, [providedArrow, providedContextArrow]);
};
//#endregion
//#region node_modules/antd/es/tooltip/style/index.js
var FALL_BACK_ORIGIN$1 = "50%";
var genTooltipStyle = (token) => {
	const { calc, componentCls, tooltipMaxWidth, tooltipColor, tooltipBg, tooltipBorderRadius, zIndexPopup, controlHeight, boxShadowSecondary, paddingSM, paddingXS, arrowOffsetHorizontal, sizePopupArrow, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "tooltip");
	const edgeAlignMinWidth = calc(tooltipBorderRadius).add(sizePopupArrow).add(arrowOffsetHorizontal).equal();
	const sharedBodyStyle = {
		minWidth: calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal(),
		minHeight: controlHeight,
		padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
		color: varRef("overlay-color", tooltipColor),
		textAlign: "start",
		textDecoration: "none",
		wordWrap: "break-word",
		backgroundColor: tooltipBg,
		borderRadius: tooltipBorderRadius,
		boxShadow: boxShadowSecondary,
		boxSizing: "border-box"
	};
	const sharedTransformOrigin = {
		[varName("valid-offset-x")]: varRef("arrow-offset-x", "var(--arrow-x)"),
		transformOrigin: [varRef("valid-offset-x", FALL_BACK_ORIGIN$1), `var(--arrow-y, ${FALL_BACK_ORIGIN$1})`].join(" ")
	};
	return [
		{ [componentCls]: {
			...resetComponent(token),
			position: "absolute",
			zIndex: zIndexPopup,
			display: "block",
			width: "max-content",
			maxWidth: tooltipMaxWidth,
			visibility: "visible",
			...sharedTransformOrigin,
			"&-hidden": { display: "none" },
			[varName("arrow-background-color")]: tooltipBg,
			[`${componentCls}-container`]: [sharedBodyStyle, initFadeMotion(token, true)],
			[`&:has(~ ${componentCls}-unique-container)`]: { [`${componentCls}-container`]: {
				border: "none",
				background: "transparent",
				boxShadow: "none"
			} },
			[[
				`&-placement-topLeft`,
				`&-placement-topRight`,
				`&-placement-bottomLeft`,
				`&-placement-bottomRight`
			].join(",")]: { minWidth: edgeAlignMinWidth },
			[[
				`&-placement-left`,
				`&-placement-leftTop`,
				`&-placement-leftBottom`,
				`&-placement-right`,
				`&-placement-rightTop`,
				`&-placement-rightBottom`
			].join(",")]: { [`${componentCls}-inner`]: { borderRadius: token.min(tooltipBorderRadius, 8) } },
			[`${componentCls}-content`]: { position: "relative" },
			...genPresetColor(token, (colorKey, { darkColor }) => ({ [`&${componentCls}-${colorKey}`]: {
				[`${componentCls}-container`]: { backgroundColor: darkColor },
				[`${componentCls}-arrow`]: { [varName("arrow-background-color")]: darkColor }
			} })),
			"&-rtl": { direction: "rtl" }
		} },
		getArrowStyle(token, varRef("arrow-background-color")),
		{ [`${componentCls}-pure`]: {
			position: "relative",
			maxWidth: "none",
			margin: token.sizePopupArrow
		} },
		{ [`${componentCls}-unique-container`]: {
			...sharedBodyStyle,
			...sharedTransformOrigin,
			position: "absolute",
			zIndex: calc(zIndexPopup).sub(1).equal(),
			"&-hidden": { display: "none" },
			"&-visible": { transition: `all ${token.motionDurationSlow}` }
		} }
	];
};
var prepareComponentToken$20 = (token) => ({
	zIndexPopup: token.zIndexPopupBase + 70,
	maxWidth: 250,
	...getArrowOffsetToken({
		contentRadius: token.borderRadius,
		limitVerticalRadius: true
	}),
	...getArrowToken(merge$1(token, { borderRadiusOuter: Math.min(token.borderRadiusOuter, 4) }))
});
var style_default$23 = (prefixCls, rootCls, injectStyle = true) => {
	return genStyleHooks("Tooltip", (token) => {
		const { borderRadius, colorTextLightSolid, colorBgSpotlight, maxWidth } = token;
		return [genTooltipStyle(merge$1(token, {
			tooltipMaxWidth: maxWidth,
			tooltipColor: colorTextLightSolid,
			tooltipBorderRadius: borderRadius,
			tooltipBg: colorBgSpotlight
		})), initZoomMotion(token, "zoom-big-fast")];
	}, prepareComponentToken$20, {
		resetStyle: false,
		injectStyle
	})(prefixCls, rootCls);
};
//#endregion
//#region node_modules/antd/es/_util/colors.js
var inverseColors = PresetColors.map((color) => `${color}-inverse`);
var PresetStatusColors = [
	"success",
	"processing",
	"error",
	"default",
	"warning"
];
/**
* determine if the color keyword belongs to the `Ant Design` {@link PresetColors}.
* @param color color to be judged
* @param includeInverse whether to include reversed colors
*/
function isPresetColor(color, includeInverse = true) {
	if (includeInverse) return [].concat(_toConsumableArray(inverseColors), _toConsumableArray(PresetColors)).includes(color);
	return PresetColors.includes(color);
}
function isPresetStatusColor(color) {
	return PresetStatusColors.includes(color);
}
//#endregion
//#region node_modules/antd/es/tooltip/util.js
var parseColor = (rootPrefixCls, prefixCls, color) => {
	const isInternalColor = isPresetColor(color);
	const [varName] = genCssVar(rootPrefixCls, "tooltip");
	const className = clsx({ [`${prefixCls}-${color}`]: color && isInternalColor });
	const overlayStyle = {};
	const arrowStyle = {};
	const rgb = generateColor(color).toRgb();
	const textColor = (.299 * rgb.r + .587 * rgb.g + .114 * rgb.b) / 255 < .5 ? "#FFF" : "#000";
	if (color && !isInternalColor) {
		overlayStyle.background = color;
		overlayStyle[varName("overlay-color")] = textColor;
		arrowStyle[varName("arrow-background-color")] = color;
	}
	return {
		className,
		overlayStyle,
		arrowStyle
	};
};
//#endregion
//#region node_modules/antd/es/tooltip/PurePanel.js
/** @private Internal Component. Do not use in your production. */
var PurePanel$5 = (props) => {
	const { prefixCls: customizePrefixCls, className, placement = "top", title, color, overlayInnerStyle, classNames, styles } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$23(prefixCls, rootCls);
	const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
	const arrowContentStyle = colorInfo.arrowStyle;
	const innerStyles = import_react.useMemo(() => {
		return { container: {
			...overlayInnerStyle,
			...colorInfo.overlayStyle
		} };
	}, [overlayInnerStyle, colorInfo.overlayStyle]);
	const mergedProps = {
		...props,
		placement
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([classNames], [innerStyles, styles], { props: mergedProps });
	const rootClassName = clsx(rootCls, hashId, cssVarCls, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className, colorInfo.className);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: rootClassName,
		style: arrowContentStyle
	}, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-arrow` }), /* @__PURE__ */ import_react.createElement(Popup, {
		...props,
		className: hashId,
		prefixCls,
		classNames: mergedClassNames,
		styles: mergedStyles
	}, title));
};
//#endregion
//#region node_modules/antd/es/tooltip/index.js
var Tooltip = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, openClassName, getTooltipContainer, color, children, afterOpenChange, arrow: tooltipArrow, destroyTooltipOnHide, destroyOnHidden, title, overlay, trigger, builtinPlacements, autoAdjustOverflow = true, motion, getPopupContainer, placement = "top", mouseEnterDelay = .1, mouseLeaveDelay = .1, rootClassName, styles, classNames, onOpenChange, overlayInnerStyle, overlayStyle, overlayClassName, ...restProps } = props;
	const [, token] = useToken();
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, arrow: contextArrow, trigger: contextTrigger } = useComponentConfig("tooltip");
	const mergedArrow = useMergedArrow(tooltipArrow, contextArrow);
	const mergedShowArrow = mergedArrow.show;
	const mergedTrigger = trigger || contextTrigger || "hover";
	const mergedGetPopupContainer = getPopupContainer || getContextPopupContainer;
	const mergedDestroyOnHidden = destroyOnHidden ?? !!destroyTooltipOnHide;
	const inTableMeasureRow = import_react.useContext(TableMeasureRowContext);
	devUseWarning("Tooltip");
	const tooltipRef = import_react.useRef(null);
	const forceAlign = () => {
		tooltipRef.current?.forceAlign();
	};
	import_react.useImperativeHandle(ref, () => ({
		forceAlign,
		nativeElement: tooltipRef.current?.nativeElement,
		popupElement: tooltipRef.current?.popupElement
	}));
	const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);
	const noTitle = !title && !overlay && title !== 0;
	const onInternalOpenChange = (vis) => {
		setOpen(noTitle ? false : vis);
		if (!noTitle && onOpenChange) onOpenChange(vis);
	};
	const tooltipPlacements = import_react.useMemo(() => {
		return builtinPlacements || getPlacements({
			arrowPointAtCenter: mergedArrow?.pointAtCenter ?? false,
			autoAdjustOverflow,
			arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
			borderRadius: token.borderRadius,
			offset: token.marginXXS,
			visibleFirst: true
		});
	}, [
		mergedArrow,
		builtinPlacements,
		token,
		mergedShowArrow,
		autoAdjustOverflow
	]);
	const memoOverlay = import_react.useMemo(() => {
		if (title === 0) return title;
		return overlay || title || "";
	}, [overlay, title]);
	const memoOverlayWrapper = /* @__PURE__ */ import_react.createElement(ContextIsolator, {
		space: true,
		form: true
	}, typeof memoOverlay === "function" ? memoOverlay() : memoOverlay);
	const mergedProps = {
		...props,
		trigger: mergedTrigger,
		builtinPlacements: tooltipPlacements,
		getPopupContainer: mergedGetPopupContainer,
		destroyOnHidden: mergedDestroyOnHidden
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const injectFromPopover = props["data-popover-inject"];
	let tempOpen = open;
	if (!("open" in props) && noTitle || inTableMeasureRow) tempOpen = false;
	const child = /* @__PURE__ */ import_react.isValidElement(children) && !isFragment(children) ? children : /* @__PURE__ */ import_react.createElement("span", null, children);
	const childProps = child.props;
	const childCls = !childProps.className || typeof childProps.className === "string" ? clsx(childProps.className, openClassName || `${prefixCls}-open`) : childProps.className;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$23(prefixCls, rootCls, !injectFromPopover);
	const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
	const arrowContentStyle = colorInfo.arrowStyle;
	const themeCls = clsx(rootCls, hashId, cssVarCls);
	const rootClassNames = clsx(overlayClassName, { [`${prefixCls}-rtl`]: direction === "rtl" }, colorInfo.className, rootClassName, themeCls, contextClassName, mergedClassNames.root);
	const [zIndex, contextZIndex] = useZIndex("Tooltip", restProps.zIndex);
	const containerStyle = {
		...mergedStyles.container,
		...overlayInnerStyle,
		...colorInfo.overlayStyle
	};
	const content = /* @__PURE__ */ import_react.createElement(es_default$3, {
		unique: true,
		...restProps,
		zIndex,
		showArrow: mergedShowArrow,
		placement,
		mouseEnterDelay,
		mouseLeaveDelay,
		prefixCls,
		classNames: {
			root: rootClassNames,
			container: mergedClassNames.container,
			arrow: mergedClassNames.arrow,
			uniqueContainer: clsx(themeCls, mergedClassNames.container)
		},
		styles: {
			root: {
				...arrowContentStyle,
				...mergedStyles.root,
				...contextStyle,
				...overlayStyle
			},
			container: containerStyle,
			uniqueContainer: containerStyle,
			arrow: mergedStyles.arrow
		},
		ref: tooltipRef,
		overlay: memoOverlayWrapper,
		visible: tempOpen,
		onVisibleChange: onInternalOpenChange,
		afterVisibleChange: afterOpenChange,
		arrowContent: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-arrow-content` }),
		motion: {
			motionName: getTransitionName(rootPrefixCls, "zoom-big-fast", typeof motion?.motionName === "string" ? motion?.motionName : void 0),
			motionDeadline: 1e3
		},
		trigger: mergedTrigger,
		builtinPlacements: tooltipPlacements,
		getTooltipContainer: mergedGetPopupContainer,
		destroyOnHidden: mergedDestroyOnHidden
	}, tempOpen ? cloneElement(child, { className: childCls }) : child);
	return /* @__PURE__ */ import_react.createElement(ZIndexContext.Provider, { value: contextZIndex }, content);
});
Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$5;
Tooltip.UniqueProvider = UniqueProvider;
//#endregion
//#region node_modules/antd/es/popover/style/index.js
var FALL_BACK_ORIGIN = "50%";
var genBaseStyle$6 = (token) => {
	const { componentCls, popoverColor, titleMinWidth, fontWeightStrong, innerPadding, boxShadowSecondary, colorTextHeading, borderRadiusLG, zIndexPopup, titleMarginBottom, colorBgElevated, popoverBg, titleBorderBottom, innerContentPadding, titlePadding, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "tooltip");
	return [
		{ [componentCls]: {
			...resetComponent(token),
			position: "absolute",
			top: 0,
			left: {
				_skip_check_: true,
				value: 0
			},
			zIndex: zIndexPopup,
			fontWeight: "normal",
			whiteSpace: "normal",
			textAlign: "start",
			cursor: "auto",
			userSelect: "text",
			[varName("valid-offset-x")]: varRef("arrow-offset-x", "var(--arrow-x)"),
			transformOrigin: [varRef("valid-offset-x", FALL_BACK_ORIGIN), `var(--arrow-y, ${FALL_BACK_ORIGIN})`].join(" "),
			[varName("arrow-background-color")]: colorBgElevated,
			width: "max-content",
			maxWidth: "100vw",
			"&-rtl": { direction: "rtl" },
			"&-hidden": { display: "none" },
			[`${componentCls}-content`]: { position: "relative" },
			[`${componentCls}-container`]: {
				backgroundColor: popoverBg,
				backgroundClip: "padding-box",
				borderRadius: borderRadiusLG,
				boxShadow: boxShadowSecondary,
				padding: innerPadding
			},
			[`${componentCls}-title`]: {
				minWidth: titleMinWidth,
				marginBottom: titleMarginBottom,
				color: colorTextHeading,
				fontWeight: fontWeightStrong,
				borderBottom: titleBorderBottom,
				padding: titlePadding
			},
			[`${componentCls}-content`]: {
				color: popoverColor,
				padding: innerContentPadding
			}
		} },
		getArrowStyle(token, varRef("arrow-background-color")),
		{ [`${componentCls}-pure`]: {
			position: "relative",
			maxWidth: "none",
			margin: token.sizePopupArrow,
			display: "inline-block"
		} }
	];
};
var genColorStyle = (token) => {
	const { componentCls, antCls } = token;
	const [varName] = genCssVar(antCls, "tooltip");
	return { [componentCls]: PresetColors.map((colorKey) => {
		const lightColor = token[`${colorKey}6`];
		return { [`&${componentCls}-${colorKey}`]: {
			[varName("arrow-background-color")]: lightColor,
			[`${componentCls}-inner`]: { backgroundColor: lightColor },
			[`${componentCls}-arrow`]: { background: "transparent" }
		} };
	}) };
};
var prepareComponentToken$19 = (token) => {
	const { lineWidth, controlHeight, fontHeight, padding, wireframe, zIndexPopupBase, borderRadiusLG, marginXS, lineType, colorSplit, paddingSM } = token;
	const titlePaddingBlockDist = controlHeight - fontHeight;
	const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
	const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
	const popoverPaddingHorizontal = padding;
	return {
		titleMinWidth: 177,
		zIndexPopup: zIndexPopupBase + 30,
		...getArrowToken(token),
		...getArrowOffsetToken({
			contentRadius: borderRadiusLG,
			limitVerticalRadius: true
		}),
		innerPadding: wireframe ? 0 : 12,
		titleMarginBottom: wireframe ? 0 : marginXS,
		titlePadding: wireframe ? `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px` : 0,
		titleBorderBottom: wireframe ? `${lineWidth}px ${lineType} ${colorSplit}` : "none",
		innerContentPadding: wireframe ? `${paddingSM}px ${popoverPaddingHorizontal}px` : 0
	};
};
var style_default$22 = genStyleHooks("Popover", (token) => {
	const { colorBgElevated, colorText } = token;
	const popoverToken = merge$1(token, {
		popoverBg: colorBgElevated,
		popoverColor: colorText
	});
	return [
		genBaseStyle$6(popoverToken),
		genColorStyle(popoverToken),
		initZoomMotion(popoverToken, "zoom-big")
	];
}, prepareComponentToken$19, {
	resetStyle: false,
	deprecatedTokens: [["width", "titleMinWidth"], ["minWidth", "titleMinWidth"]]
});
//#endregion
//#region node_modules/antd/es/popover/PurePanel.js
var Overlay$1 = (props) => {
	const { title, content, prefixCls, classNames, styles } = props;
	if (!title && !content) return null;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, title && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-title`, classNames?.title),
		style: styles?.title
	}, title), content && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-content`, classNames?.content),
		style: styles?.content
	}, content));
};
var RawPurePanel = (props) => {
	const { hashId, prefixCls, className, style, placement = "top", title, content, children, classNames, styles } = props;
	const titleNode = getRenderPropValue(title);
	const contentNode = getRenderPropValue(content);
	const mergedProps = {
		...props,
		placement
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([classNames], [styles], { props: mergedProps });
	const rootClassName = clsx(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: rootClassName,
		style
	}, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-arrow` }), /* @__PURE__ */ import_react.createElement(Popup, {
		...props,
		className: hashId,
		prefixCls,
		classNames: mergedClassNames,
		styles: mergedStyles
	}, children || /* @__PURE__ */ import_react.createElement(Overlay$1, {
		prefixCls,
		title: titleNode,
		content: contentNode,
		classNames: mergedClassNames,
		styles: mergedStyles
	})));
};
var PurePanel$4 = (props) => {
	const { prefixCls: customizePrefixCls, className, ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("popover", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$22(prefixCls);
	return /* @__PURE__ */ import_react.createElement(RawPurePanel, {
		...restProps,
		prefixCls,
		hashId,
		className: clsx(className, cssVarCls)
	});
};
//#endregion
//#region node_modules/antd/es/popover/index.js
var Popover = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, title, content, overlayClassName, placement = "top", trigger, children, mouseEnterDelay = .1, mouseLeaveDelay = .1, onOpenChange, overlayStyle = {}, styles, classNames, motion, arrow: popoverArrow, ...restProps } = props;
	const { getPrefixCls, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, arrow: contextArrow, trigger: contextTrigger } = useComponentConfig("popover");
	const prefixCls = getPrefixCls("popover", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$22(prefixCls);
	const rootPrefixCls = getPrefixCls();
	const mergedArrow = useMergedArrow(popoverArrow, contextArrow);
	const mergedTrigger = trigger || contextTrigger || "hover";
	const mergedProps = {
		...props,
		placement,
		trigger: mergedTrigger,
		mouseEnterDelay,
		mouseLeaveDelay,
		overlayStyle,
		styles,
		classNames
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const rootClassNames = clsx(overlayClassName, hashId, cssVarCls, contextClassName, mergedClassNames.root);
	const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);
	const settingOpen = (value) => {
		setOpen(value);
		onOpenChange?.(value);
	};
	const titleNode = getRenderPropValue(title);
	const contentNode = getRenderPropValue(content);
	return /* @__PURE__ */ import_react.createElement(Tooltip, {
		unique: false,
		arrow: mergedArrow,
		placement,
		trigger: mergedTrigger,
		mouseEnterDelay,
		mouseLeaveDelay,
		...restProps,
		prefixCls,
		classNames: {
			root: rootClassNames,
			container: mergedClassNames.container,
			arrow: mergedClassNames.arrow
		},
		styles: {
			root: {
				...mergedStyles.root,
				...contextStyle,
				...overlayStyle
			},
			container: mergedStyles.container,
			arrow: mergedStyles.arrow
		},
		ref,
		open,
		onOpenChange: settingOpen,
		overlay: titleNode || contentNode ? /* @__PURE__ */ import_react.createElement(Overlay$1, {
			prefixCls,
			title: titleNode,
			content: contentNode,
			classNames: mergedClassNames,
			styles: mergedStyles
		}) : null,
		motion: { motionName: getTransitionName(rootPrefixCls, "zoom-big", typeof motion?.motionName === "string" ? motion?.motionName : void 0) },
		"data-popover-inject": true
	}, children);
});
Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$4;
//#endregion
//#region node_modules/antd/es/avatar/AvatarGroup.js
var AvatarContextProvider = (props) => {
	const { size, shape } = import_react.useContext(AvatarContext);
	const avatarContextValue = import_react.useMemo(() => ({
		size: props.size || size,
		shape: props.shape || shape
	}), [
		props.size,
		props.shape,
		size,
		shape
	]);
	return /* @__PURE__ */ import_react.createElement(AvatarContext.Provider, { value: avatarContextValue }, props.children);
};
var AvatarGroup = (props) => {
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, className, rootClassName, style, maxCount, maxStyle, size, shape, maxPopoverPlacement, maxPopoverTrigger, children, max } = props;
	const prefixCls = getPrefixCls("avatar", customizePrefixCls);
	const groupPrefixCls = `${prefixCls}-group`;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$24(prefixCls, rootCls);
	const cls = clsx(groupPrefixCls, { [`${groupPrefixCls}-rtl`]: direction === "rtl" }, cssVarCls, rootCls, className, rootClassName, hashId);
	const childrenWithProps = toArray$1(children).map((child, index) => cloneElement(child, { key: `avatar-key-${index}` }));
	const mergeCount = max?.count || maxCount;
	const numOfChildren = childrenWithProps.length;
	if (mergeCount && mergeCount < numOfChildren) {
		const childrenShow = childrenWithProps.slice(0, mergeCount);
		const childrenHidden = childrenWithProps.slice(mergeCount, numOfChildren);
		const mergeStyle = max?.style || maxStyle;
		const mergePopoverTrigger = max?.popover?.trigger || maxPopoverTrigger || "hover";
		const mergePopoverPlacement = max?.popover?.placement || maxPopoverPlacement || "top";
		const popoverProps = {
			content: childrenHidden,
			...max?.popover,
			placement: mergePopoverPlacement,
			trigger: mergePopoverTrigger,
			rootClassName: clsx(`${groupPrefixCls}-popover`, max?.popover?.rootClassName)
		};
		childrenShow.push(/* @__PURE__ */ import_react.createElement(Popover, {
			key: "avatar-popover-key",
			destroyOnHidden: true,
			...popoverProps
		}, /* @__PURE__ */ import_react.createElement(Avatar$1, { style: mergeStyle }, `+${numOfChildren - mergeCount}`)));
		return /* @__PURE__ */ import_react.createElement(AvatarContextProvider, {
			shape,
			size
		}, /* @__PURE__ */ import_react.createElement("div", {
			className: cls,
			style
		}, childrenShow));
	}
	return /* @__PURE__ */ import_react.createElement(AvatarContextProvider, {
		shape,
		size
	}, /* @__PURE__ */ import_react.createElement("div", {
		className: cls,
		style
	}, childrenWithProps));
};
//#endregion
//#region node_modules/antd/es/avatar/index.js
var Avatar = Avatar$1;
Avatar.Group = AvatarGroup;
//#endregion
//#region node_modules/antd/es/button/index.js
var button_default = Button;
//#endregion
//#region node_modules/dayjs/dayjs.min.js
var require_dayjs_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(t, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
	})(exports, (function() {
		"use strict";
		var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(t) {
				var e = [
					"th",
					"st",
					"nd",
					"rd"
				], n = t % 100;
				return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
			}
		}, m = function(t, e, n) {
			var r = String(t);
			return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
		}, v = {
			s: m,
			z: function(t) {
				var e = -t.utcOffset(), n = Math.abs(e), r = Math.floor(n / 60), i = n % 60;
				return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
			},
			m: function t(e, n) {
				if (e.date() < n.date()) return -t(n, e);
				var r = 12 * (n.year() - e.year()) + (n.month() - e.month()), i = e.clone().add(r, c), s = n - i < 0, u = e.clone().add(r + (s ? -1 : 1), c);
				return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
			},
			a: function(t) {
				return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
			},
			p: function(t) {
				return {
					M: c,
					y: h,
					w: o,
					d: a,
					D: d,
					h: u,
					m: s,
					s: i,
					ms: r,
					Q: f
				}[t] || String(t || "").toLowerCase().replace(/s$/, "");
			},
			u: function(t) {
				return void 0 === t;
			}
		}, g = "en", D = {};
		D[g] = M;
		var p = "$isDayjsObject", S = function(t) {
			return t instanceof _ || !(!t || !t[p]);
		}, w = function t(e, n, r) {
			var i;
			if (!e) return g;
			if ("string" == typeof e) {
				var s = e.toLowerCase();
				D[s] && (i = s), n && (D[s] = n, i = s);
				var u = e.split("-");
				if (!i && u.length > 1) return t(u[0]);
			} else {
				var a = e.name;
				D[a] = e, i = a;
			}
			return !r && i && (g = i), i || !r && g;
		}, O = function(t, e) {
			if (S(t)) return t.clone();
			var n = "object" == typeof e ? e : {};
			return n.date = t, n.args = arguments, new _(n);
		}, b = v;
		b.l = w, b.i = S, b.w = function(t, e) {
			return O(t, {
				locale: e.$L,
				utc: e.$u,
				x: e.$x,
				$offset: e.$offset
			});
		};
		var _ = function() {
			function M(t) {
				this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
			}
			var m = M.prototype;
			return m.parse = function(t) {
				this.$d = function(t) {
					var e = t.date, n = t.utc;
					if (null === e) return /* @__PURE__ */ new Date(NaN);
					if (b.u(e)) return /* @__PURE__ */ new Date();
					if (e instanceof Date) return new Date(e);
					if ("string" == typeof e && !/Z$/i.test(e)) {
						var r = e.match($);
						if (r) {
							var i = r[2] - 1 || 0, s = (r[7] || "0").substring(0, 3);
							return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
						}
					}
					return new Date(e);
				}(t), this.init();
			}, m.init = function() {
				var t = this.$d;
				this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
			}, m.$utils = function() {
				return b;
			}, m.isValid = function() {
				return !(this.$d.toString() === l);
			}, m.isSame = function(t, e) {
				var n = O(t);
				return this.startOf(e) <= n && n <= this.endOf(e);
			}, m.isAfter = function(t, e) {
				return O(t) < this.startOf(e);
			}, m.isBefore = function(t, e) {
				return this.endOf(e) < O(t);
			}, m.$g = function(t, e, n) {
				return b.u(t) ? this[e] : this.set(n, t);
			}, m.unix = function() {
				return Math.floor(this.valueOf() / 1e3);
			}, m.valueOf = function() {
				return this.$d.getTime();
			}, m.startOf = function(t, e) {
				var n = this, r = !!b.u(e) || e, f = b.p(t), l = function(t, e) {
					var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
					return r ? i : i.endOf(a);
				}, $ = function(t, e) {
					return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [
						0,
						0,
						0,
						0
					] : [
						23,
						59,
						59,
						999
					]).slice(e)), n);
				}, y = this.$W, M = this.$M, m = this.$D, v = "set" + (this.$u ? "UTC" : "");
				switch (f) {
					case h: return r ? l(1, 0) : l(31, 11);
					case c: return r ? l(1, M) : l(0, M + 1);
					case o:
						var g = this.$locale().weekStart || 0, D = (y < g ? y + 7 : y) - g;
						return l(r ? m - D : m + (6 - D), M);
					case a:
					case d: return $(v + "Hours", 0);
					case u: return $(v + "Minutes", 1);
					case s: return $(v + "Seconds", 2);
					case i: return $(v + "Milliseconds", 3);
					default: return this.clone();
				}
			}, m.endOf = function(t) {
				return this.startOf(t, !1);
			}, m.$set = function(t, e) {
				var n, o = b.p(t), f = "set" + (this.$u ? "UTC" : ""), l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o], $ = o === a ? this.$D + (e - this.$W) : e;
				if (o === c || o === h) {
					var y = this.clone().set(d, 1);
					y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
				} else l && this.$d[l]($);
				return this.init(), this;
			}, m.set = function(t, e) {
				return this.clone().$set(t, e);
			}, m.get = function(t) {
				return this[b.p(t)]();
			}, m.add = function(r, f) {
				var d, l = this;
				r = Number(r);
				var $ = b.p(f), y = function(t) {
					var e = O(l);
					return b.w(e.date(e.date() + Math.round(t * r)), l);
				};
				if ($ === c) return this.set(c, this.$M + r);
				if ($ === h) return this.set(h, this.$y + r);
				if ($ === a) return y(1);
				if ($ === o) return y(7);
				var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1, m = this.$d.getTime() + r * M;
				return b.w(m, this);
			}, m.subtract = function(t, e) {
				return this.add(-1 * t, e);
			}, m.format = function(t) {
				var e = this, n = this.$locale();
				if (!this.isValid()) return n.invalidDate || l;
				var r = t || "YYYY-MM-DDTHH:mm:ssZ", i = b.z(this), s = this.$H, u = this.$m, a = this.$M, o = n.weekdays, c = n.months, f = n.meridiem, h = function(t, n, i, s) {
					return t && (t[n] || t(e, r)) || i[n].slice(0, s);
				}, d = function(t) {
					return b.s(s % 12 || 12, t, "0");
				}, $ = f || function(t, e, n) {
					var r = t < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r;
				};
				return r.replace(y, (function(t, r) {
					return r || function(t) {
						switch (t) {
							case "YY": return String(e.$y).slice(-2);
							case "YYYY": return b.s(e.$y, 4, "0");
							case "M": return a + 1;
							case "MM": return b.s(a + 1, 2, "0");
							case "MMM": return h(n.monthsShort, a, c, 3);
							case "MMMM": return h(c, a);
							case "D": return e.$D;
							case "DD": return b.s(e.$D, 2, "0");
							case "d": return String(e.$W);
							case "dd": return h(n.weekdaysMin, e.$W, o, 2);
							case "ddd": return h(n.weekdaysShort, e.$W, o, 3);
							case "dddd": return o[e.$W];
							case "H": return String(s);
							case "HH": return b.s(s, 2, "0");
							case "h": return d(1);
							case "hh": return d(2);
							case "a": return $(s, u, !0);
							case "A": return $(s, u, !1);
							case "m": return String(u);
							case "mm": return b.s(u, 2, "0");
							case "s": return String(e.$s);
							case "ss": return b.s(e.$s, 2, "0");
							case "SSS": return b.s(e.$ms, 3, "0");
							case "Z": return i;
						}
						return null;
					}(t) || i.replace(":", "");
				}));
			}, m.utcOffset = function() {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}, m.diff = function(r, d, l) {
				var $, y = this, M = b.p(d), m = O(r), v = (m.utcOffset() - this.utcOffset()) * e, g = this - m, D = function() {
					return b.m(y, m);
				};
				switch (M) {
					case h:
						$ = D() / 12;
						break;
					case c:
						$ = D();
						break;
					case f:
						$ = D() / 3;
						break;
					case o:
						$ = (g - v) / 6048e5;
						break;
					case a:
						$ = (g - v) / 864e5;
						break;
					case u:
						$ = g / n;
						break;
					case s:
						$ = g / e;
						break;
					case i:
						$ = g / t;
						break;
					default: $ = g;
				}
				return l ? $ : b.a($);
			}, m.daysInMonth = function() {
				return this.endOf(c).$D;
			}, m.$locale = function() {
				return D[this.$L];
			}, m.locale = function(t, e) {
				if (!t) return this.$L;
				var n = this.clone(), r = w(t, e, !0);
				return r && (n.$L = r), n;
			}, m.clone = function() {
				return b.w(this.$d, this);
			}, m.toDate = function() {
				return new Date(this.valueOf());
			}, m.toJSON = function() {
				return this.isValid() ? this.toISOString() : null;
			}, m.toISOString = function() {
				return this.$d.toISOString();
			}, m.toString = function() {
				return this.$d.toUTCString();
			}, M;
		}(), k = _.prototype;
		return O.prototype = k, [
			["$ms", r],
			["$s", i],
			["$m", s],
			["$H", u],
			["$W", a],
			["$M", c],
			["$y", h],
			["$D", d]
		].forEach((function(t) {
			k[t[1]] = function(e) {
				return this.$g(e, t[0], t[1]);
			};
		})), O.extend = function(t, e) {
			return t.$i || (t(e, _, O), t.$i = !0), O;
		}, O.locale = w, O.isDayjs = S, O.unix = function(t) {
			return O(1e3 * t);
		}, O.en = D[g], O.Ls = D, O.p = {}, O;
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/weekday.js
var require_weekday = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekday = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			t.prototype.weekday = function(e) {
				var t = this.$locale().weekStart || 0, i = this.$W, n = (i < t ? i + 7 : i) - t;
				return this.$utils().u(e) ? n : this.subtract(n, "day").add(e, "day");
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/localeData.js
var require_localeData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(n, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (n = "undefined" != typeof globalThis ? globalThis : n || self).dayjs_plugin_localeData = e();
	})(exports, (function() {
		"use strict";
		return function(n, e, t) {
			var r = e.prototype, o = function(n) {
				return n && (n.indexOf ? n : n.s);
			}, u = function(n, e, t, r, u) {
				var i = n.name ? n : n.$locale(), a = o(i[e]), s = o(i[t]), f = a || s.map((function(n) {
					return n.slice(0, r);
				}));
				if (!u) return f;
				var d = i.weekStart;
				return f.map((function(n, e) {
					return f[(e + (d || 0)) % 7];
				}));
			}, i = function() {
				return t.Ls[t.locale()];
			}, a = function(n, e) {
				return n.formats[e] || function(n) {
					return n.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(n, e, t) {
						return e || t.slice(1);
					}));
				}(n.formats[e.toUpperCase()]);
			}, s = function() {
				var n = this;
				return {
					months: function(e) {
						return e ? e.format("MMMM") : u(n, "months");
					},
					monthsShort: function(e) {
						return e ? e.format("MMM") : u(n, "monthsShort", "months", 3);
					},
					firstDayOfWeek: function() {
						return n.$locale().weekStart || 0;
					},
					weekdays: function(e) {
						return e ? e.format("dddd") : u(n, "weekdays");
					},
					weekdaysMin: function(e) {
						return e ? e.format("dd") : u(n, "weekdaysMin", "weekdays", 2);
					},
					weekdaysShort: function(e) {
						return e ? e.format("ddd") : u(n, "weekdaysShort", "weekdays", 3);
					},
					longDateFormat: function(e) {
						return a(n.$locale(), e);
					},
					meridiem: this.$locale().meridiem,
					ordinal: this.$locale().ordinal
				};
			};
			r.localeData = function() {
				return s.bind(this)();
			}, t.localeData = function() {
				var n = i();
				return {
					firstDayOfWeek: function() {
						return n.weekStart || 0;
					},
					weekdays: function() {
						return t.weekdays();
					},
					weekdaysShort: function() {
						return t.weekdaysShort();
					},
					weekdaysMin: function() {
						return t.weekdaysMin();
					},
					months: function() {
						return t.months();
					},
					monthsShort: function() {
						return t.monthsShort();
					},
					longDateFormat: function(e) {
						return a(n, e);
					},
					meridiem: n.meridiem,
					ordinal: n.ordinal
				};
			}, t.months = function() {
				return u(i(), "months");
			}, t.monthsShort = function() {
				return u(i(), "monthsShort", "months", 3);
			}, t.weekdays = function(n) {
				return u(i(), "weekdays", null, null, n);
			}, t.weekdaysShort = function(n) {
				return u(i(), "weekdaysShort", "weekdays", 3, n);
			}, t.weekdaysMin = function(n) {
				return u(i(), "weekdaysMin", "weekdays", 2, n);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/weekOfYear.js
var require_weekOfYear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekOfYear = t();
	})(exports, (function() {
		"use strict";
		var e = "week", t = "year";
		return function(i, n, r) {
			var f = n.prototype;
			f.week = function(i) {
				if (void 0 === i && (i = null), null !== i) return this.add(7 * (i - this.week()), "day");
				var n = this.$locale().yearStart || 1;
				if (11 === this.month() && this.date() > 25) {
					var f = r(this).startOf(t).add(1, t).date(n), s = r(this).endOf(e);
					if (f.isBefore(s)) return 1;
				}
				var a = r(this).startOf(t).date(n).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, !0);
				return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
			}, f.weeks = function(e) {
				return void 0 === e && (e = null), this.week(e);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/weekYear.js
var require_weekYear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekYear = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			t.prototype.weekYear = function() {
				var e = this.month(), t = this.week(), n = this.year();
				return 1 === t && 11 === e ? n + 1 : 0 === e && t >= 52 ? n - 1 : n;
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/advancedFormat.js
var require_advancedFormat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_advancedFormat = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			var r = t.prototype, n = r.format;
			r.format = function(e) {
				var t = this, r = this.$locale();
				if (!this.isValid()) return n.bind(this)(e);
				var s = this.$utils(), a = (e || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, (function(e) {
					switch (e) {
						case "Q": return Math.ceil((t.$M + 1) / 3);
						case "Do": return r.ordinal(t.$D);
						case "gggg": return t.weekYear();
						case "GGGG": return t.isoWeekYear();
						case "wo": return r.ordinal(t.week(), "W");
						case "w":
						case "ww": return s.s(t.week(), "w" === e ? 1 : 2, "0");
						case "W":
						case "WW": return s.s(t.isoWeek(), "W" === e ? 1 : 2, "0");
						case "k":
						case "kk": return s.s(String(0 === t.$H ? 24 : t.$H), "k" === e ? 1 : 2, "0");
						case "X": return Math.floor(t.$d.getTime() / 1e3);
						case "x": return t.$d.getTime();
						case "z": return "[" + t.offsetName() + "]";
						case "zzz": return "[" + t.offsetName("long") + "]";
						default: return e;
					}
				}));
				return n.bind(this)(a);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/customParseFormat.js
var require_customParseFormat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_customParseFormat = t();
	})(exports, (function() {
		"use strict";
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		}, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, s = {}, a = function(e) {
			return (e = +e) + (e > 68 ? 1900 : 2e3);
		};
		var f = function(e) {
			return function(t) {
				this[e] = +t;
			};
		}, h = [/[+-]\d\d:?(\d\d)?|Z/, function(e) {
			(this.zone || (this.zone = {})).offset = function(e) {
				if (!e) return 0;
				if ("Z" === e) return 0;
				var t = e.match(/([+-]|\d\d)/g), n = 60 * t[1] + (+t[2] || 0);
				return 0 === n ? 0 : "+" === t[0] ? -n : n;
			}(e);
		}], u = function(e) {
			var t = s[e];
			return t && (t.indexOf ? t : t.s.concat(t.f));
		}, d = function(e, t) {
			var n, r = s.meridiem;
			if (r) {
				for (var i = 1; i <= 24; i += 1) if (e.indexOf(r(i, 0, t)) > -1) {
					n = i > 12;
					break;
				}
			} else n = e === (t ? "pm" : "PM");
			return n;
		}, c = {
			A: [o, function(e) {
				this.afternoon = d(e, !1);
			}],
			a: [o, function(e) {
				this.afternoon = d(e, !0);
			}],
			Q: [n, function(e) {
				this.month = 3 * (e - 1) + 1;
			}],
			S: [n, function(e) {
				this.milliseconds = 100 * +e;
			}],
			SS: [r, function(e) {
				this.milliseconds = 10 * +e;
			}],
			SSS: [/\d{3}/, function(e) {
				this.milliseconds = +e;
			}],
			s: [i, f("seconds")],
			ss: [i, f("seconds")],
			m: [i, f("minutes")],
			mm: [i, f("minutes")],
			H: [i, f("hours")],
			h: [i, f("hours")],
			HH: [i, f("hours")],
			hh: [i, f("hours")],
			D: [i, f("day")],
			DD: [r, f("day")],
			Do: [o, function(e) {
				var t = s.ordinal;
				if (this.day = e.match(/\d+/)[0], t) for (var r = 1; r <= 31; r += 1) t(r).replace(/\[|\]/g, "") === e && (this.day = r);
			}],
			w: [i, f("week")],
			ww: [r, f("week")],
			M: [i, f("month")],
			MM: [r, f("month")],
			MMM: [o, function(e) {
				var t = u("months"), n = (u("monthsShort") || t.map((function(e) {
					return e.slice(0, 3);
				}))).indexOf(e) + 1;
				if (n < 1) throw new Error();
				this.month = n % 12 || n;
			}],
			MMMM: [o, function(e) {
				var t = u("months").indexOf(e) + 1;
				if (t < 1) throw new Error();
				this.month = t % 12 || t;
			}],
			Y: [/[+-]?\d+/, f("year")],
			YY: [r, function(e) {
				this.year = a(e);
			}],
			YYYY: [/\d{4}/, f("year")],
			Z: h,
			ZZ: h
		};
		function l(n) {
			var r = n, i = s && s.formats;
			for (var o = (n = r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, n, r) {
				var o = r && r.toUpperCase();
				return n || i[r] || e[r] || i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, n) {
					return t || n.slice(1);
				}));
			}))).match(t), a = o.length, f = 0; f < a; f += 1) {
				var h = o[f], u = c[h], d = u && u[0], l = u && u[1];
				o[f] = l ? {
					regex: d,
					parser: l
				} : h.replace(/^\[|\]$/g, "");
			}
			return function(e) {
				for (var t = {}, n = 0, r = 0; n < a; n += 1) {
					var i = o[n];
					if ("string" == typeof i) r += i.length;
					else {
						var s = i.regex, f = i.parser, h = e.slice(r), u = s.exec(h)[0];
						f.call(t, u), e = e.replace(u, "");
					}
				}
				return function(e) {
					var t = e.afternoon;
					if (void 0 !== t) {
						var n = e.hours;
						t ? n < 12 && (e.hours += 12) : 12 === n && (e.hours = 0), delete e.afternoon;
					}
				}(t), t;
			};
		}
		return function(e, t, n) {
			n.p.customParseFormat = !0, e && e.parseTwoDigitYear && (a = e.parseTwoDigitYear);
			var r = t.prototype, i = r.parse;
			r.parse = function(e) {
				var t = e.date, r = e.utc, o = e.args;
				this.$u = r;
				var a = o[1];
				if ("string" == typeof a) {
					var f = !0 === o[2], h = !0 === o[3], u = f || h, d = o[2];
					h && (d = o[2]), s = this.$locale(), !f && d && (s = n.Ls[d]), this.$d = function(e, t, n, r) {
						try {
							if (["x", "X"].indexOf(t) > -1) return /* @__PURE__ */ new Date(("X" === t ? 1e3 : 1) * e);
							var i = l(t)(e), o = i.year, s = i.month, a = i.day, f = i.hours, h = i.minutes, u = i.seconds, d = i.milliseconds, c = i.zone, m = i.week, M = /* @__PURE__ */ new Date(), Y = a || (o || s ? 1 : M.getDate()), p = o || M.getFullYear(), v = 0;
							o && !s || (v = s > 0 ? s - 1 : M.getMonth());
							var D, w = f || 0, g = h || 0, y = u || 0, L = d || 0;
							return c ? new Date(Date.UTC(p, v, Y, w, g, y, L + 60 * c.offset * 1e3)) : n ? new Date(Date.UTC(p, v, Y, w, g, y, L)) : (D = new Date(p, v, Y, w, g, y, L), m && (D = r(D).week(m).toDate()), D);
						} catch (e) {
							return /* @__PURE__ */ new Date("");
						}
					}(t, a, r, n), this.init(), d && !0 !== d && (this.$L = this.locale(d).$L), u && t != this.format(a) && (this.$d = /* @__PURE__ */ new Date("")), s = {};
				} else if (a instanceof Array) for (var c = a.length, m = 1; m <= c; m += 1) {
					o[1] = a[m - 1];
					var M = n.apply(this, o);
					if (M.isValid()) {
						this.$d = M.$d, this.$L = M.$L, this.init();
						break;
					}
					m === c && (this.$d = /* @__PURE__ */ new Date(""));
				}
				else i.call(this, e);
			};
		};
	}));
}));
//#endregion
//#region node_modules/@rc-component/picker/es/generate/dayjs.js
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var import_weekday = /* @__PURE__ */ __toESM(require_weekday());
var import_localeData = /* @__PURE__ */ __toESM(require_localeData());
var import_weekOfYear = /* @__PURE__ */ __toESM(require_weekOfYear());
var import_weekYear = /* @__PURE__ */ __toESM(require_weekYear());
var import_advancedFormat = /* @__PURE__ */ __toESM(require_advancedFormat());
var import_customParseFormat = /* @__PURE__ */ __toESM(require_customParseFormat());
import_dayjs_min.default.extend(import_customParseFormat.default);
import_dayjs_min.default.extend(import_advancedFormat.default);
import_dayjs_min.default.extend(import_weekday.default);
import_dayjs_min.default.extend(import_localeData.default);
import_dayjs_min.default.extend(import_weekOfYear.default);
import_dayjs_min.default.extend(import_weekYear.default);
import_dayjs_min.default.extend(function(o, c) {
	var proto = c.prototype;
	var oldFormat = proto.format;
	proto.format = function f(formatStr) {
		var str = (formatStr || "").replace("Wo", "wo");
		return oldFormat.bind(this)(str);
	};
});
var localeMap = {
	bn_BD: "bn-bd",
	by_BY: "be",
	en_GB: "en-gb",
	en_US: "en",
	fr_BE: "fr",
	fr_CA: "fr-ca",
	hy_AM: "hy-am",
	kmr_IQ: "ku",
	nl_BE: "nl-be",
	pt_BR: "pt-br",
	zh_CN: "zh-cn",
	zh_HK: "zh-hk",
	zh_TW: "zh-tw"
};
var parseLocale = function parseLocale(locale) {
	return localeMap[locale] || locale.split("_")[0];
};
/* istanbul ignore next */
var parseNoMatchNotice = function parseNoMatchNotice() {};
var getUDayjs = function getUDayjs(value) {
	if (!import_dayjs_min.default.isDayjs(value) || value instanceof import_dayjs_min.default) return value;
	return (0, import_dayjs_min.default)(value.valueOf());
};
var generateConfig = {
	getNow: function getNow() {
		var now = (0, import_dayjs_min.default)();
		if (typeof now.tz === "function") return now.tz();
		return now;
	},
	getFixedDate: function getFixedDate(string) {
		return (0, import_dayjs_min.default)(string, ["YYYY-M-DD", "YYYY-MM-DD"]);
	},
	getEndDate: function getEndDate(date) {
		return getUDayjs(date).endOf("month");
	},
	getWeekDay: function getWeekDay(date) {
		var clone = getUDayjs(date).locale("en");
		return clone.weekday() + clone.localeData().firstDayOfWeek();
	},
	getYear: function getYear(date) {
		return getUDayjs(date).year();
	},
	getMonth: function getMonth(date) {
		return getUDayjs(date).month();
	},
	getDate: function getDate(date) {
		return getUDayjs(date).date();
	},
	getHour: function getHour(date) {
		return getUDayjs(date).hour();
	},
	getMinute: function getMinute(date) {
		return getUDayjs(date).minute();
	},
	getSecond: function getSecond(date) {
		return getUDayjs(date).second();
	},
	getMillisecond: function getMillisecond(date) {
		return getUDayjs(date).millisecond();
	},
	addYear: function addYear(date, diff) {
		return getUDayjs(date).add(diff, "year");
	},
	addMonth: function addMonth(date, diff) {
		return getUDayjs(date).add(diff, "month");
	},
	addDate: function addDate(date, diff) {
		return getUDayjs(date).add(diff, "day");
	},
	setYear: function setYear(date, year) {
		return getUDayjs(date).year(year);
	},
	setMonth: function setMonth(date, month) {
		return getUDayjs(date).month(month);
	},
	setDate: function setDate(date, num) {
		return getUDayjs(date).date(num);
	},
	setHour: function setHour(date, hour) {
		return getUDayjs(date).hour(hour);
	},
	setMinute: function setMinute(date, minute) {
		return getUDayjs(date).minute(minute);
	},
	setSecond: function setSecond(date, second) {
		return getUDayjs(date).second(second);
	},
	setMillisecond: function setMillisecond(date, milliseconds) {
		return getUDayjs(date).millisecond(milliseconds);
	},
	isAfter: function isAfter(date1, date2) {
		return getUDayjs(date1).isAfter(getUDayjs(date2));
	},
	isValidate: function isValidate(date) {
		return getUDayjs(date).isValid();
	},
	locale: {
		getWeekFirstDay: function getWeekFirstDay(locale) {
			return (0, import_dayjs_min.default)().locale(parseLocale(locale)).localeData().firstDayOfWeek();
		},
		getWeekFirstDate: function getWeekFirstDate(locale, date) {
			return getUDayjs(date).locale(parseLocale(locale)).weekday(0);
		},
		getWeek: function getWeek(locale, date) {
			return getUDayjs(date).locale(parseLocale(locale)).week();
		},
		getShortWeekDays: function getShortWeekDays(locale) {
			return (0, import_dayjs_min.default)().locale(parseLocale(locale)).localeData().weekdaysMin();
		},
		getShortMonths: function getShortMonths(locale) {
			return (0, import_dayjs_min.default)().locale(parseLocale(locale)).localeData().monthsShort();
		},
		format: function format(locale, date, _format) {
			return getUDayjs(date).locale(parseLocale(locale)).format(_format);
		},
		parse: function parse(locale, text, formats) {
			var localeStr = parseLocale(locale);
			for (var i = 0; i < formats.length; i += 1) {
				var format = formats[i];
				var formatText = text;
				if (format.includes("wo") || format.includes("Wo")) {
					var year = formatText.split("-")[0];
					var weekStr = formatText.split("-")[1];
					var firstWeek = (0, import_dayjs_min.default)(year, "YYYY").startOf("year").locale(localeStr);
					for (var j = 0; j <= 52; j += 1) {
						var nextWeek = firstWeek.add(j, "week");
						if (nextWeek.format("Wo") === weekStr) return nextWeek;
					}
					parseNoMatchNotice();
					return null;
				}
				var date = (0, import_dayjs_min.default)(formatText, format, true).locale(localeStr);
				if (date.isValid()) return date;
			}
			if (text) parseNoMatchNotice();
			return null;
		}
	}
};
//#endregion
//#region node_modules/antd/es/form/util.js
var formItemNameBlackList = ["parentNode"];
var defaultItemNamePrefixCls = "form_item";
function toArray(candidate) {
	if (candidate === void 0 || candidate === false) return [];
	return Array.isArray(candidate) ? candidate : [candidate];
}
function getFieldId(namePath, formName) {
	if (!namePath.length) return;
	const mergedId = namePath.join("_");
	if (formName) return `${formName}_${mergedId}`;
	return formItemNameBlackList.includes(mergedId) ? `${defaultItemNamePrefixCls}_${mergedId}` : mergedId;
}
/**
* Get merged status by meta or passed `validateStatus`.
*/
function getStatus(errors, warnings, meta, defaultValidateStatus, hasFeedback, validateStatus) {
	let status = defaultValidateStatus;
	if (validateStatus !== void 0) status = validateStatus;
	else if (meta.validating) status = "validating";
	else if (errors.length) status = "error";
	else if (warnings.length) status = "warning";
	else if (meta.touched || hasFeedback && meta.validated) status = "success";
	return status;
}
//#endregion
//#region node_modules/antd/es/form/hooks/useForm.js
function toNamePathStr(name) {
	return toArray(name).join("_");
}
function getFieldDOMNode(name, wrapForm) {
	const fieldDom = getDOM(wrapForm.getFieldInstance(name));
	if (fieldDom) return fieldDom;
	const fieldId = getFieldId(toArray(name), wrapForm.__INTERNAL__.name);
	if (fieldId) return document.getElementById(fieldId);
}
function useForm(form) {
	const [rcForm] = useForm$1();
	const itemsRef = import_react.useRef({});
	const wrapForm = import_react.useMemo(() => form ?? {
		...rcForm,
		__INTERNAL__: { itemRef: (name) => (node) => {
			const namePathStr = toNamePathStr(name);
			if (node) itemsRef.current[namePathStr] = node;
			else delete itemsRef.current[namePathStr];
		} },
		scrollToField: (name, options = {}) => {
			const { focus, ...restOpt } = options;
			const node = getFieldDOMNode(name, wrapForm);
			if (node) {
				e(node, {
					scrollMode: "if-needed",
					block: "nearest",
					...restOpt
				});
				if (focus) wrapForm.focusField(name);
			}
		},
		focusField: (name) => {
			const itemRef = wrapForm.getFieldInstance(name);
			if (typeof itemRef?.focus === "function") itemRef.focus();
			else getFieldDOMNode(name, wrapForm)?.focus?.();
		},
		getFieldInstance: (name) => {
			const namePathStr = toNamePathStr(name);
			return itemsRef.current[namePathStr];
		}
	}, [form, rcForm]);
	return [wrapForm];
}
//#endregion
//#region node_modules/antd/es/radio/context.js
var RadioGroupContext = /* @__PURE__ */ import_react.createContext(void 0);
var RadioGroupContextProvider = RadioGroupContext.Provider;
var RadioOptionTypeContext = /* @__PURE__ */ import_react.createContext(void 0);
var RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
//#endregion
//#region node_modules/antd/es/checkbox/useBubbleLock.js
/**
* When click on the label,
* the event will be stopped to prevent the label from being clicked twice.
* label click -> input click -> label click again
*/
function useBubbleLock(onOriginInputClick) {
	const labelClickLockRef = import_react.useRef(null);
	const clearLock = () => {
		wrapperRaf.cancel(labelClickLockRef.current);
		labelClickLockRef.current = null;
	};
	const onLabelClick = () => {
		clearLock();
		labelClickLockRef.current = wrapperRaf(() => {
			labelClickLockRef.current = null;
		});
	};
	const onInputClick = (e) => {
		if (labelClickLockRef.current) {
			e.stopPropagation();
			clearLock();
		}
		onOriginInputClick?.(e);
	};
	return [onLabelClick, onInputClick];
}
//#endregion
//#region node_modules/antd/es/radio/style/index.js
var getGroupRadioStyle = (token) => {
	const { componentCls, antCls } = token;
	const groupPrefixCls = `${componentCls}-group`;
	return { [groupPrefixCls]: {
		...resetComponent(token),
		display: "inline-block",
		fontSize: 0,
		[`&${groupPrefixCls}-rtl`]: { direction: "rtl" },
		[`&${groupPrefixCls}-block`]: { display: "flex" },
		[`${antCls}-badge ${antCls}-badge-count`]: { zIndex: 1 },
		[`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: { borderInlineStart: "none" },
		"&-vertical": {
			display: "flex",
			flexDirection: "column",
			rowGap: token.marginXS,
			[`${componentCls}-wrapper`]: { marginInlineEnd: 0 }
		}
	} };
};
var getRadioBasicStyle = (token) => {
	const { componentCls, wrapperMarginInlineEnd, colorPrimary, colorPrimaryHover, radioSize, motionDurationSlow, motionDurationMid, motionEaseInOutCirc, colorBgContainer, colorBorder, lineWidth, colorBgContainerDisabled, colorTextDisabled, paddingXS, dotColorDisabled, dotSize, lineType, radioColor, radioBgColor } = token;
	return { [`${componentCls}-wrapper`]: {
		...resetComponent(token),
		display: "inline-flex",
		alignItems: "baseline",
		marginInlineStart: 0,
		marginInlineEnd: wrapperMarginInlineEnd,
		cursor: "pointer",
		"&:last-child": { marginInlineEnd: 0 },
		[`&${componentCls}-wrapper-rtl`]: { direction: "rtl" },
		"&-disabled": {
			cursor: "not-allowed",
			color: token.colorTextDisabled
		},
		"&::after": {
			display: "inline-block",
			width: 0,
			overflow: "hidden",
			content: "\"\\a0\""
		},
		"&-block": {
			flex: 1,
			justifyContent: "center"
		},
		[componentCls]: {
			...resetComponent(token),
			position: "relative",
			whiteSpace: "nowrap",
			lineHeight: 1,
			cursor: "pointer",
			alignSelf: "center",
			boxSizing: "border-box",
			display: "block",
			width: `calc(${radioSize} * 1px)`,
			height: `calc(${radioSize} * 1px)`,
			backgroundColor: colorBgContainer,
			border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
			borderRadius: "50%",
			transition: `all ${motionDurationMid}`,
			flex: "none",
			"&:after": {
				content: "\"\"",
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%) scale(0)",
				width: `calc(${dotSize} * 1px)`,
				height: `calc(${dotSize} * 1px)`,
				backgroundColor: radioColor,
				borderRadius: "50%",
				transformOrigin: "50% 50%",
				opacity: 0,
				transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`
			},
			[`${componentCls}-input`]: {
				position: "absolute",
				inset: 0,
				zIndex: 1,
				cursor: "pointer",
				opacity: 0,
				margin: 0
			},
			[`&:has(${componentCls}-input:focus-visible)`]: genFocusOutline(token)
		},
		[`&:hover ${componentCls}`]: { borderColor: colorPrimary },
		[`&:hover ${componentCls}-checked:not(${componentCls}-disabled)`]: {
			backgroundColor: colorPrimaryHover,
			borderColor: "transparent"
		},
		[`${componentCls}-checked`]: {
			backgroundColor: radioBgColor,
			borderColor: colorPrimary,
			"&::after": {
				transform: `translate(-50%, -50%)`,
				opacity: 1
			}
		},
		[`${componentCls}-disabled`]: {
			[`&, ${componentCls}-input`]: {
				cursor: "not-allowed",
				pointerEvents: "none"
			},
			background: colorBgContainerDisabled,
			borderColor: colorBorder,
			"&::after": { backgroundColor: dotColorDisabled }
		},
		[`${componentCls}-disabled + span`]: {
			color: colorTextDisabled,
			cursor: "not-allowed"
		},
		[`span${componentCls} + *`]: {
			paddingInlineStart: paddingXS,
			paddingInlineEnd: paddingXS
		}
	} };
};
var getRadioButtonStyle = (token) => {
	const { buttonColor, controlHeight, componentCls, lineWidth, lineType, colorBorder, motionDurationMid, buttonPaddingInline, fontSize, buttonBg, fontSizeLG, controlHeightLG, controlHeightSM, paddingXS, borderRadius, borderRadiusSM, borderRadiusLG, buttonCheckedBg, buttonSolidCheckedColor, colorTextDisabled, colorBgContainerDisabled, buttonCheckedBgDisabled, buttonCheckedColorDisabled, colorPrimary, colorPrimaryHover, colorPrimaryActive, buttonSolidCheckedBg, buttonSolidCheckedHoverBg, buttonSolidCheckedActiveBg, calc } = token;
	return { [`${componentCls}-button-wrapper`]: {
		position: "relative",
		display: "inline-block",
		height: controlHeight,
		margin: 0,
		paddingInline: buttonPaddingInline,
		paddingBlock: 0,
		color: buttonColor,
		fontSize,
		lineHeight: unit(calc(controlHeight).sub(calc(lineWidth).mul(2)).equal()),
		background: buttonBg,
		border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
		borderBlockStartWidth: calc(lineWidth).add(.02).equal(),
		borderInlineEndWidth: lineWidth,
		cursor: "pointer",
		transition: [
			`color`,
			`background-color`,
			`box-shadow`
		].map((prop) => `${prop} ${motionDurationMid}`).join(","),
		a: { color: buttonColor },
		[`> ${componentCls}-button`]: {
			position: "absolute",
			insetBlockStart: 0,
			insetInlineStart: 0,
			zIndex: -1,
			width: "100%",
			height: "100%"
		},
		"&:not(:last-child)": { marginInlineEnd: calc(lineWidth).mul(-1).equal() },
		"&:first-child": {
			borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
			borderStartStartRadius: borderRadius,
			borderEndStartRadius: borderRadius
		},
		"&:last-child": {
			borderStartEndRadius: borderRadius,
			borderEndEndRadius: borderRadius
		},
		"&:first-child:last-child": { borderRadius },
		[`${componentCls}-group-large &`]: {
			height: controlHeightLG,
			fontSize: fontSizeLG,
			lineHeight: unit(calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal()),
			"&:first-child": {
				borderStartStartRadius: borderRadiusLG,
				borderEndStartRadius: borderRadiusLG
			},
			"&:last-child": {
				borderStartEndRadius: borderRadiusLG,
				borderEndEndRadius: borderRadiusLG
			}
		},
		[`${componentCls}-group-small &`]: {
			height: controlHeightSM,
			paddingInline: calc(paddingXS).sub(lineWidth).equal(),
			paddingBlock: 0,
			lineHeight: unit(calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal()),
			"&:first-child": {
				borderStartStartRadius: borderRadiusSM,
				borderEndStartRadius: borderRadiusSM
			},
			"&:last-child": {
				borderStartEndRadius: borderRadiusSM,
				borderEndEndRadius: borderRadiusSM
			}
		},
		"&:hover": {
			position: "relative",
			color: colorPrimary
		},
		"&:has(:focus-visible)": genFocusOutline(token),
		[`${componentCls}, input[type='checkbox'], input[type='radio']`]: {
			width: 0,
			height: 0,
			opacity: 0,
			pointerEvents: "none"
		},
		[`&-checked:not(${componentCls}-button-wrapper-disabled)`]: {
			zIndex: 1,
			color: colorPrimary,
			background: buttonCheckedBg,
			borderColor: colorPrimary,
			"&::before": { backgroundColor: colorPrimary },
			"&:first-child": { borderColor: colorPrimary },
			"&:hover": {
				color: colorPrimaryHover,
				borderColor: colorPrimaryHover,
				"&::before": { backgroundColor: colorPrimaryHover }
			},
			"&:active": {
				color: colorPrimaryActive,
				borderColor: colorPrimaryActive,
				"&::before": { backgroundColor: colorPrimaryActive }
			}
		},
		[`${componentCls}-group-solid &-checked:not(${componentCls}-button-wrapper-disabled)`]: {
			color: buttonSolidCheckedColor,
			background: buttonSolidCheckedBg,
			borderColor: buttonSolidCheckedBg,
			"&:hover": {
				color: buttonSolidCheckedColor,
				background: buttonSolidCheckedHoverBg,
				borderColor: buttonSolidCheckedHoverBg
			},
			"&:active": {
				color: buttonSolidCheckedColor,
				background: buttonSolidCheckedActiveBg,
				borderColor: buttonSolidCheckedActiveBg
			}
		},
		"&-disabled": {
			color: colorTextDisabled,
			backgroundColor: colorBgContainerDisabled,
			borderColor: colorBorder,
			cursor: "not-allowed",
			"&:first-child, &:hover": {
				color: colorTextDisabled,
				backgroundColor: colorBgContainerDisabled,
				borderColor: colorBorder
			}
		},
		[`&-disabled${componentCls}-button-wrapper-checked`]: {
			color: buttonCheckedColorDisabled,
			backgroundColor: buttonCheckedBgDisabled,
			borderColor: colorBorder,
			boxShadow: "none"
		},
		"&-block": {
			flex: 1,
			textAlign: "center"
		}
	} };
};
var prepareComponentToken$18 = (token) => {
	const { wireframe, padding, marginXS, lineWidth, fontSizeLG, colorText, colorBgContainer, colorTextDisabled, controlItemBgActiveDisabled, colorTextLightSolid, colorPrimary, colorPrimaryHover, colorPrimaryActive, colorWhite } = token;
	const dotPadding = 4;
	const radioSize = fontSizeLG;
	return {
		radioSize,
		dotSize: wireframe ? radioSize - dotPadding * 2 : radioSize - (dotPadding + lineWidth) * 2,
		dotColorDisabled: colorTextDisabled,
		buttonSolidCheckedColor: colorTextLightSolid,
		buttonSolidCheckedBg: colorPrimary,
		buttonSolidCheckedHoverBg: colorPrimaryHover,
		buttonSolidCheckedActiveBg: colorPrimaryActive,
		buttonBg: colorBgContainer,
		buttonCheckedBg: colorBgContainer,
		buttonColor: colorText,
		buttonCheckedBgDisabled: controlItemBgActiveDisabled,
		buttonCheckedColorDisabled: colorTextDisabled,
		buttonPaddingInline: padding - lineWidth,
		wrapperMarginInlineEnd: marginXS,
		radioColor: wireframe ? colorPrimary : colorWhite,
		radioBgColor: wireframe ? colorBgContainer : colorPrimary
	};
};
var style_default$21 = genStyleHooks("Radio", (token) => {
	const { controlOutline, controlOutlineWidth } = token;
	const radioFocusShadow = `0 0 0 ${unit(controlOutlineWidth)} ${controlOutline}`;
	const radioToken = merge$1(token, {
		radioFocusShadow,
		radioButtonFocusShadow: radioFocusShadow
	});
	return [
		getGroupRadioStyle(radioToken),
		getRadioBasicStyle(radioToken),
		getRadioButtonStyle(radioToken)
	];
}, prepareComponentToken$18, { unitless: {
	radioSize: true,
	dotSize: true
} });
//#endregion
//#region node_modules/antd/es/radio/radio.js
var InternalRadio = (props, ref) => {
	const groupContext = import_react.useContext(RadioGroupContext);
	const radioOptionTypeContext = import_react.useContext(RadioOptionTypeContext);
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("radio");
	const mergedRef = composeRef(ref, import_react.useRef(null));
	const { isFormItemInput } = import_react.useContext(FormItemInputContext);
	const onChange = (e) => {
		props.onChange?.(e);
		groupContext?.onChange?.(e);
	};
	const { prefixCls: customizePrefixCls, className, rootClassName, children, style, title, classNames, styles, ...restProps } = props;
	const radioPrefixCls = getPrefixCls("radio", customizePrefixCls);
	const isButtonType = (groupContext?.optionType || radioOptionTypeContext) === "button";
	const prefixCls = isButtonType ? `${radioPrefixCls}-button` : radioPrefixCls;
	const rootCls = useCSSVarCls(radioPrefixCls);
	const [hashId, cssVarCls] = style_default$21(radioPrefixCls, rootCls);
	const radioProps = { ...restProps };
	const disabled = import_react.useContext(DisabledContext);
	let mergedChecked = radioProps.checked;
	if (groupContext) {
		radioProps.name = groupContext.name;
		radioProps.onChange = onChange;
		mergedChecked = props.value === groupContext.value;
		radioProps.disabled = radioProps.disabled ?? groupContext.disabled;
	}
	radioProps.disabled = radioProps.disabled ?? disabled;
	const mergedProps = {
		...props,
		...radioProps,
		checked: mergedChecked
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const wrapperClassString = clsx(`${prefixCls}-wrapper`, {
		[`${prefixCls}-wrapper-checked`]: mergedChecked,
		[`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
		[`${prefixCls}-wrapper-rtl`]: direction === "rtl",
		[`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
		[`${prefixCls}-wrapper-block`]: !!groupContext?.block
	}, contextClassName, className, rootClassName, mergedClassNames.root, hashId, cssVarCls, rootCls);
	const [onLabelClick, onInputClick] = useBubbleLock(radioProps.onClick);
	return /* @__PURE__ */ import_react.createElement(Wave, {
		component: "Radio",
		disabled: radioProps.disabled
	}, /* @__PURE__ */ import_react.createElement("label", {
		className: wrapperClassString,
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		onMouseEnter: props.onMouseEnter,
		onMouseLeave: props.onMouseLeave,
		title,
		onClick: onLabelClick
	}, /* @__PURE__ */ import_react.createElement(Checkbox$2, {
		...radioProps,
		checked: mergedChecked,
		className: clsx(mergedClassNames.icon, { [TARGET_CLS]: !isButtonType }),
		style: mergedStyles.icon,
		type: "radio",
		prefixCls,
		ref: mergedRef,
		onClick: onInputClick
	}), children !== void 0 ? /* @__PURE__ */ import_react.createElement("span", {
		className: clsx(`${prefixCls}-label`, mergedClassNames.label),
		style: mergedStyles.label
	}, children) : null));
};
var Radio$1 = /* @__PURE__ */ import_react.forwardRef(InternalRadio);
//#endregion
//#region node_modules/antd/es/radio/group.js
var RadioGroup = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { name: formItemName } = import_react.useContext(FormItemInputContext);
	const defaultName = useId_default(toNamePathStr(formItemName));
	const { prefixCls: customizePrefixCls, className, rootClassName, options, buttonStyle = "outline", disabled, children, size: customizeSize, style, id, optionType, name = defaultName, defaultValue, value: customizedValue, block = false, onChange, onMouseEnter, onMouseLeave, onFocus, onBlur, orientation, vertical, role = "radiogroup" } = props;
	const [value, setValue] = useControlledState(defaultValue, customizedValue);
	const onRadioChange = import_react.useCallback((event) => {
		const lastValue = value;
		const val = event.target.value;
		if (!("value" in props)) setValue(val);
		if (val !== lastValue) onChange?.(event);
	}, [
		value,
		setValue,
		onChange
	]);
	const prefixCls = getPrefixCls("radio", customizePrefixCls);
	const groupPrefixCls = `${prefixCls}-group`;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$21(prefixCls, rootCls);
	let childrenToRender = children;
	if (options && options.length > 0) childrenToRender = options.map((option) => {
		if (typeof option === "string" || typeof option === "number") return /* @__PURE__ */ import_react.createElement(Radio$1, {
			key: option.toString(),
			prefixCls,
			disabled,
			value: option,
			checked: value === option
		}, option);
		return /* @__PURE__ */ import_react.createElement(Radio$1, {
			key: `radio-group-value-options-${option.value}`,
			prefixCls,
			disabled: option.disabled || disabled,
			value: option.value,
			checked: value === option.value,
			title: option.title,
			style: option.style,
			className: option.className,
			id: option.id,
			required: option.required
		}, option.label);
	});
	const mergedSize = useSize(customizeSize);
	const [, mergedVertical] = useOrientation(orientation, vertical);
	const classString = clsx(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
		[`${groupPrefixCls}-large`]: mergedSize === "large",
		[`${groupPrefixCls}-small`]: mergedSize === "small",
		[`${groupPrefixCls}-rtl`]: direction === "rtl",
		[`${groupPrefixCls}-block`]: block
	}, className, rootClassName, hashId, cssVarCls, rootCls);
	const memoizedValue = import_react.useMemo(() => ({
		onChange: onRadioChange,
		value,
		disabled,
		name,
		optionType,
		block
	}), [
		onRadioChange,
		value,
		disabled,
		name,
		optionType,
		block
	]);
	return /* @__PURE__ */ import_react.createElement("div", {
		...pickAttrs(props, {
			aria: true,
			data: true
		}),
		role,
		className: clsx(classString, { [`${prefixCls}-group-vertical`]: mergedVertical }),
		style,
		onMouseEnter,
		onMouseLeave,
		onFocus,
		onBlur,
		id,
		ref
	}, /* @__PURE__ */ import_react.createElement(RadioGroupContextProvider, { value: memoizedValue }, childrenToRender));
});
var group_default = /* @__PURE__ */ import_react.memo(RadioGroup);
//#endregion
//#region node_modules/antd/es/radio/radioButton.js
var RadioButton = (props, ref) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, ...radioProps } = props;
	const prefixCls = getPrefixCls("radio", customizePrefixCls);
	return /* @__PURE__ */ import_react.createElement(RadioOptionTypeContextProvider, { value: "button" }, /* @__PURE__ */ import_react.createElement(Radio$1, {
		prefixCls,
		...radioProps,
		type: "radio",
		ref
	}));
};
var radioButton_default = /* @__PURE__ */ import_react.forwardRef(RadioButton);
//#endregion
//#region node_modules/antd/es/radio/index.js
var Radio = Radio$1;
Radio.Button = radioButton_default;
Radio.Group = group_default;
Radio.__ANT_RADIO = true;
//#endregion
//#region node_modules/antd/es/calendar/Header.js
var YEAR_SELECT_OFFSET = 10;
var YEAR_SELECT_TOTAL = 20;
function YearSelect(props) {
	const { fullscreen, validRange, generateConfig, locale, prefixCls, value, onChange, divRef } = props;
	const year = generateConfig.getYear(value || generateConfig.getNow());
	let start = year - YEAR_SELECT_OFFSET;
	let end = start + YEAR_SELECT_TOTAL;
	if (validRange) {
		start = generateConfig.getYear(validRange[0]);
		end = generateConfig.getYear(validRange[1]) + 1;
	}
	const suffix = locale && locale.year === "年" ? "年" : "";
	const options = [];
	for (let index = start; index < end; index++) options.push({
		label: `${index}${suffix}`,
		value: index
	});
	return /* @__PURE__ */ import_react.createElement(Select, {
		size: fullscreen ? void 0 : "small",
		options,
		value: year,
		className: `${prefixCls}-year-select`,
		onChange: (numYear) => {
			let newDate = generateConfig.setYear(value, numYear);
			if (validRange) {
				const [startDate, endDate] = validRange;
				const newYear = generateConfig.getYear(newDate);
				const newMonth = generateConfig.getMonth(newDate);
				if (newYear === generateConfig.getYear(endDate) && newMonth > generateConfig.getMonth(endDate)) newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(endDate));
				if (newYear === generateConfig.getYear(startDate) && newMonth < generateConfig.getMonth(startDate)) newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(startDate));
			}
			onChange(newDate);
		},
		getPopupContainer: () => divRef.current
	});
}
function MonthSelect(props) {
	const { prefixCls, fullscreen, validRange, value, generateConfig, locale, onChange, divRef } = props;
	const month = generateConfig.getMonth(value || generateConfig.getNow());
	let start = 0;
	let end = 11;
	if (validRange) {
		const [rangeStart, rangeEnd] = validRange;
		const currentYear = generateConfig.getYear(value);
		if (generateConfig.getYear(rangeEnd) === currentYear) end = generateConfig.getMonth(rangeEnd);
		if (generateConfig.getYear(rangeStart) === currentYear) start = generateConfig.getMonth(rangeStart);
	}
	const months = locale.shortMonths || generateConfig.locale.getShortMonths(locale.locale);
	const options = [];
	for (let index = start; index <= end; index += 1) options.push({
		label: months[index],
		value: index
	});
	return /* @__PURE__ */ import_react.createElement(Select, {
		size: fullscreen ? void 0 : "small",
		className: `${prefixCls}-month-select`,
		value: month,
		options,
		onChange: (newMonth) => {
			onChange(generateConfig.setMonth(value, newMonth));
		},
		getPopupContainer: () => divRef.current
	});
}
function ModeSwitch(props) {
	const { prefixCls, locale, mode, fullscreen, onModeChange } = props;
	return /* @__PURE__ */ import_react.createElement(group_default, {
		onChange: ({ target: { value } }) => {
			onModeChange(value);
		},
		value: mode,
		size: fullscreen ? void 0 : "small",
		className: `${prefixCls}-mode-switch`
	}, /* @__PURE__ */ import_react.createElement(radioButton_default, { value: "month" }, locale.month), /* @__PURE__ */ import_react.createElement(radioButton_default, { value: "year" }, locale.year));
}
function CalendarHeader(props) {
	const { prefixCls, fullscreen, mode, onChange, onModeChange, className, style } = props;
	const divRef = import_react.useRef(null);
	const formItemInputContext = (0, import_react.useContext)(FormItemInputContext);
	const mergedFormItemInputContext = (0, import_react.useMemo)(() => ({
		...formItemInputContext,
		isFormItemInput: false
	}), [formItemInputContext]);
	const sharedProps = {
		...props,
		fullscreen,
		divRef
	};
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-header`, className),
		style,
		ref: divRef
	}, /* @__PURE__ */ import_react.createElement(FormItemInputContext.Provider, { value: mergedFormItemInputContext }, /* @__PURE__ */ import_react.createElement(YearSelect, {
		...sharedProps,
		onChange: (v) => {
			onChange(v, "year");
		}
	}), mode === "month" && /* @__PURE__ */ import_react.createElement(MonthSelect, {
		...sharedProps,
		onChange: (v) => {
			onChange(v, "month");
		}
	})), /* @__PURE__ */ import_react.createElement(ModeSwitch, {
		...sharedProps,
		onModeChange
	}));
}
//#endregion
//#region node_modules/antd/es/input/style/token.js
function initInputToken(token) {
	return merge$1(token, { inputAffixPadding: token.paddingXXS });
}
var initComponentToken = (token) => {
	const { controlHeight, fontSize, lineHeight, lineWidth, controlHeightSM, controlHeightLG, fontSizeLG, lineHeightLG, paddingSM, controlPaddingHorizontalSM, controlPaddingHorizontal, colorFillAlter, colorPrimaryHover, colorPrimary, controlOutlineWidth, controlOutline, colorErrorOutline, colorWarningOutline, colorBgContainer, inputFontSize, inputFontSizeLG, inputFontSizeSM } = token;
	const mergedFontSize = inputFontSize || fontSize;
	const mergedFontSizeSM = inputFontSizeSM || mergedFontSize;
	const mergedFontSizeLG = inputFontSizeLG || fontSizeLG;
	const paddingBlock = Math.round((controlHeight - mergedFontSize * lineHeight) / 2 * 10) / 10 - lineWidth;
	const paddingBlockSM = Math.round((controlHeightSM - mergedFontSizeSM * lineHeight) / 2 * 10) / 10 - lineWidth;
	const paddingBlockLG = Math.ceil((controlHeightLG - mergedFontSizeLG * lineHeightLG) / 2 * 10) / 10 - lineWidth;
	return {
		paddingBlock: Math.max(paddingBlock, 0),
		paddingBlockSM: Math.max(paddingBlockSM, 0),
		paddingBlockLG: Math.max(paddingBlockLG, 0),
		paddingInline: paddingSM - lineWidth,
		paddingInlineSM: controlPaddingHorizontalSM - lineWidth,
		paddingInlineLG: controlPaddingHorizontal - lineWidth,
		addonBg: colorFillAlter,
		activeBorderColor: colorPrimary,
		hoverBorderColor: colorPrimaryHover,
		activeShadow: `0 0 0 ${controlOutlineWidth}px ${controlOutline}`,
		errorActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorErrorOutline}`,
		warningActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorWarningOutline}`,
		hoverBg: colorBgContainer,
		activeBg: colorBgContainer,
		inputFontSize: mergedFontSize,
		inputFontSizeLG: mergedFontSizeLG,
		inputFontSizeSM: mergedFontSizeSM
	};
};
//#endregion
//#region node_modules/antd/es/input/style/variants.js
var genHoverStyle = (token) => ({
	borderColor: token.hoverBorderColor,
	backgroundColor: token.hoverBg
});
var genDisabledStyle = (token) => ({
	color: token.colorTextDisabled,
	backgroundColor: token.colorBgContainerDisabled,
	borderColor: token.colorBorder,
	boxShadow: "none",
	cursor: "not-allowed",
	opacity: 1,
	"input[disabled], textarea[disabled]": { cursor: "not-allowed" },
	"&:hover:not([disabled])": { ...genHoverStyle(merge$1(token, {
		hoverBorderColor: token.colorBorder,
		hoverBg: token.colorBgContainerDisabled
	})) }
});
var genBaseOutlinedStyle = (token, options) => ({
	background: token.colorBgContainer,
	borderWidth: token.lineWidth,
	borderStyle: token.lineType,
	borderColor: options.borderColor,
	"&:hover": {
		borderColor: options.hoverBorderColor,
		backgroundColor: token.hoverBg
	},
	"&:focus, &:focus-within": {
		borderColor: options.activeBorderColor,
		boxShadow: options.activeShadow,
		outline: 0,
		backgroundColor: token.activeBg
	}
});
var genOutlinedStatusStyle = (token, options) => ({
	[`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
		...genBaseOutlinedStyle(token, options),
		[`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: { color: options.affixColor }
	},
	[`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: { borderColor: options.borderColor }
});
var genOutlinedStyle = (token, extraStyles) => ({ "&-outlined": {
	...genBaseOutlinedStyle(token, {
		borderColor: token.colorBorder,
		hoverBorderColor: token.hoverBorderColor,
		activeBorderColor: token.activeBorderColor,
		activeShadow: token.activeShadow
	}),
	[`&${token.componentCls}-disabled, &[disabled]`]: { ...genDisabledStyle(token) },
	...genOutlinedStatusStyle(token, {
		status: "error",
		borderColor: token.colorError,
		hoverBorderColor: token.colorErrorBorderHover,
		activeBorderColor: token.colorError,
		activeShadow: token.errorActiveShadow,
		affixColor: token.colorError
	}),
	...genOutlinedStatusStyle(token, {
		status: "warning",
		borderColor: token.colorWarning,
		hoverBorderColor: token.colorWarningBorderHover,
		activeBorderColor: token.colorWarning,
		activeShadow: token.warningActiveShadow,
		affixColor: token.colorWarning
	}),
	...extraStyles
} });
var genOutlinedGroupStatusStyle = (token, options) => ({ [`&${token.componentCls}-group-wrapper-status-${options.status}`]: { [`${token.componentCls}-group-addon`]: {
	borderColor: options.addonBorderColor,
	color: options.addonColor
} } });
var genOutlinedGroupStyle = (token) => ({ "&-outlined": {
	[`${token.componentCls}-group`]: {
		"&-addon": {
			background: token.addonBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
		},
		"&-addon:first-child": { borderInlineEnd: 0 },
		"&-addon:last-child": { borderInlineStart: 0 }
	},
	...genOutlinedGroupStatusStyle(token, {
		status: "error",
		addonBorderColor: token.colorError,
		addonColor: token.colorErrorText
	}),
	...genOutlinedGroupStatusStyle(token, {
		status: "warning",
		addonBorderColor: token.colorWarning,
		addonColor: token.colorWarningText
	}),
	[`&${token.componentCls}-group-wrapper-disabled`]: { [`${token.componentCls}-group-addon`]: { ...genDisabledStyle(token) } }
} });
var genBorderlessStyle = (token, extraStyles) => {
	const { componentCls } = token;
	return { "&-borderless": {
		background: "transparent",
		border: "none",
		paddingBlock: token.calc(token.paddingBlock).add(token.lineWidth).equal(),
		[`&${componentCls}-sm, &${componentCls}-affix-wrapper-sm`]: { paddingBlock: token.calc(token.paddingBlockSM).add(token.lineWidth).equal() },
		[`&${componentCls}-lg, &${componentCls}-affix-wrapper-lg`]: { paddingBlock: token.calc(token.paddingBlockLG).add(token.lineWidth).equal() },
		"&:focus, &:focus-within": { outline: "none" },
		[`&${componentCls}-disabled, &[disabled]`]: {
			color: token.colorTextDisabled,
			cursor: "not-allowed"
		},
		[`&${componentCls}-status-error`]: { "&, & input, & textarea": { color: token.colorError } },
		[`&${componentCls}-status-warning`]: { "&, & input, & textarea": { color: token.colorWarning } },
		...extraStyles
	} };
};
var genBaseFilledStyle = (token, options) => ({
	background: options.bg,
	borderWidth: token.lineWidth,
	borderStyle: token.lineType,
	borderColor: "transparent",
	"input&, & input, textarea&, & textarea": { color: options?.inputColor ?? "unset" },
	"&:hover": { background: options.hoverBg },
	"&:focus, &:focus-within": {
		outline: 0,
		borderColor: options.activeBorderColor,
		backgroundColor: token.activeBg
	}
});
var genFilledStatusStyle = (token, options) => ({ [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
	...genBaseFilledStyle(token, options),
	[`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: { color: options.affixColor }
} });
var genFilledStyle = (token, extraStyles) => ({ "&-filled": {
	...genBaseFilledStyle(token, {
		bg: token.colorFillTertiary,
		hoverBg: token.colorFillSecondary,
		activeBorderColor: token.activeBorderColor,
		inputColor: token.colorText
	}),
	[`&${token.componentCls}-disabled, &[disabled]`]: { ...genDisabledStyle(token) },
	...genFilledStatusStyle(token, {
		status: "error",
		bg: token.colorErrorBg,
		hoverBg: token.colorErrorBgHover,
		activeBorderColor: token.colorError,
		inputColor: token.colorErrorText,
		affixColor: token.colorError
	}),
	...genFilledStatusStyle(token, {
		status: "warning",
		bg: token.colorWarningBg,
		hoverBg: token.colorWarningBgHover,
		activeBorderColor: token.colorWarning,
		inputColor: token.colorWarningText,
		affixColor: token.colorWarning
	}),
	...extraStyles
} });
var genFilledGroupStatusStyle = (token, options) => ({ [`&${token.componentCls}-group-wrapper-status-${options.status}`]: { [`${token.componentCls}-group-addon`]: {
	background: options.addonBg,
	color: options.addonColor
} } });
var genFilledGroupStyle = (token) => ({ "&-filled": {
	[`${token.componentCls}-group-addon`]: {
		background: token.colorFillTertiary,
		"&:last-child": { position: "static" }
	},
	...genFilledGroupStatusStyle(token, {
		status: "error",
		addonBg: token.colorErrorBg,
		addonColor: token.colorErrorText
	}),
	...genFilledGroupStatusStyle(token, {
		status: "warning",
		addonBg: token.colorWarningBg,
		addonColor: token.colorWarningText
	}),
	[`&${token.componentCls}-group-wrapper-disabled`]: { [`${token.componentCls}-group`]: {
		"&-addon": {
			background: token.colorFillTertiary,
			color: token.colorTextDisabled
		},
		"&-addon:first-child": {
			borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
		},
		"&-addon:last-child": {
			borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
		}
	} }
} });
var genBaseUnderlinedStyle = (token, options) => ({
	background: token.colorBgContainer,
	borderWidth: `${unit(token.lineWidth)} 0`,
	borderStyle: `${token.lineType} none`,
	borderColor: `transparent transparent ${options.borderColor} transparent`,
	borderRadius: 0,
	"&:hover": {
		borderColor: `transparent transparent ${options.hoverBorderColor} transparent`,
		backgroundColor: token.hoverBg
	},
	"&:focus, &:focus-within": {
		borderColor: `transparent transparent ${options.activeBorderColor} transparent`,
		outline: 0,
		backgroundColor: token.activeBg
	}
});
var genUnderlinedStatusStyle = (token, options) => ({
	[`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
		...genBaseUnderlinedStyle(token, options),
		[`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: { color: options.affixColor }
	},
	[`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: { borderColor: `transparent transparent ${options.borderColor} transparent` }
});
var genUnderlinedStyle = (token, extraStyles) => ({ "&-underlined": {
	...genBaseUnderlinedStyle(token, {
		borderColor: token.colorBorder,
		hoverBorderColor: token.hoverBorderColor,
		activeBorderColor: token.activeBorderColor,
		activeShadow: token.activeShadow
	}),
	[`&${token.componentCls}-disabled, &[disabled]`]: {
		color: token.colorTextDisabled,
		boxShadow: "none",
		cursor: "not-allowed",
		"&:hover": { borderColor: `transparent transparent ${token.colorBorder} transparent` }
	},
	"input[disabled], textarea[disabled]": { cursor: "not-allowed" },
	...genUnderlinedStatusStyle(token, {
		status: "error",
		borderColor: token.colorError,
		hoverBorderColor: token.colorErrorBorderHover,
		activeBorderColor: token.colorError,
		activeShadow: token.errorActiveShadow,
		affixColor: token.colorError
	}),
	...genUnderlinedStatusStyle(token, {
		status: "warning",
		borderColor: token.colorWarning,
		hoverBorderColor: token.colorWarningBorderHover,
		activeBorderColor: token.colorWarning,
		activeShadow: token.warningActiveShadow,
		affixColor: token.colorWarning
	}),
	...extraStyles
} });
//#endregion
//#region node_modules/antd/es/input/style/index.js
var genPlaceholderStyle = (color) => ({
	"&::-moz-placeholder": { opacity: 1 },
	"&::placeholder": {
		color,
		userSelect: "none"
	},
	"&:placeholder-shown": { textOverflow: "ellipsis" }
});
var genInputLargeStyle = (token) => {
	const { paddingBlockLG, lineHeightLG, borderRadiusLG, paddingInlineLG } = token;
	return {
		padding: `${unit(paddingBlockLG)} ${unit(paddingInlineLG)}`,
		fontSize: token.inputFontSizeLG,
		lineHeight: lineHeightLG,
		borderRadius: borderRadiusLG
	};
};
var genInputSmallStyle = (token) => ({
	padding: `${unit(token.paddingBlockSM)} ${unit(token.paddingInlineSM)}`,
	fontSize: token.inputFontSizeSM,
	borderRadius: token.borderRadiusSM
});
var genBasicInputStyle = (token, option = {}) => ({
	position: "relative",
	display: "inline-block",
	width: "100%",
	minWidth: 0,
	padding: `${unit(token.paddingBlock)} ${unit(token.paddingInline)}`,
	color: token.colorText,
	fontSize: token.inputFontSize,
	lineHeight: token.lineHeight,
	borderRadius: token.borderRadius,
	transition: `all ${token.motionDurationMid}`,
	...genPlaceholderStyle(token.colorTextPlaceholder),
	"&-lg": {
		...genInputLargeStyle(token),
		...option.largeStyle
	},
	"&-sm": {
		...genInputSmallStyle(token),
		...option.smallStyle
	},
	"&-rtl, &-textarea-rtl": { direction: "rtl" }
});
var genInputGroupStyle = (token) => {
	const { componentCls, antCls } = token;
	return {
		position: "relative",
		display: "table",
		width: "100%",
		borderCollapse: "separate",
		borderSpacing: 0,
		"&[class*='col-']": {
			paddingInlineEnd: token.paddingXS,
			"&:last-child": { paddingInlineEnd: 0 }
		},
		[`&-lg ${componentCls}, &-lg > ${componentCls}-group-addon`]: { ...genInputLargeStyle(token) },
		[`&-sm ${componentCls}, &-sm > ${componentCls}-group-addon`]: { ...genInputSmallStyle(token) },
		[`&-lg ${antCls}-select-single`]: { height: token.controlHeightLG },
		[`&-sm ${antCls}-select-single`]: { height: token.controlHeightSM },
		[`> ${componentCls}`]: {
			display: "table-cell",
			"&:not(:first-child):not(:last-child)": { borderRadius: 0 }
		},
		[`${componentCls}-group`]: {
			"&-addon, &-wrap": {
				display: "table-cell",
				width: 1,
				whiteSpace: "nowrap",
				verticalAlign: "middle",
				"&:not(:first-child):not(:last-child)": { borderRadius: 0 }
			},
			"&-wrap > *": { display: "block !important" },
			"&-addon": {
				position: "relative",
				padding: `0 ${unit(token.paddingInline)}`,
				color: token.colorText,
				fontWeight: "normal",
				fontSize: token.inputFontSize,
				textAlign: "center",
				borderRadius: token.borderRadius,
				transition: `all ${token.motionDurationSlow}`,
				lineHeight: 1,
				[`${antCls}-select`]: {
					margin: `${unit(token.calc(token.paddingBlock).add(1).mul(-1).equal())} ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
					[`&${antCls}-select-single:not(${antCls}-select-customize-input):not(${antCls}-pagination-size-changer)`]: {
						backgroundColor: "inherit",
						border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
						boxShadow: "none"
					}
				},
				[`${antCls}-cascader-picker`]: {
					margin: `-9px ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
					backgroundColor: "transparent",
					[`${antCls}-cascader-input`]: {
						textAlign: "start",
						border: 0,
						boxShadow: "none"
					}
				}
			}
		},
		[componentCls]: {
			width: "100%",
			marginBottom: 0,
			textAlign: "inherit",
			"&:focus": {
				zIndex: 1,
				borderInlineEndWidth: 1
			},
			"&:hover": {
				zIndex: 1,
				borderInlineEndWidth: 1
			}
		},
		[`> ${componentCls}:first-child, ${componentCls}-group-addon:first-child`]: {
			borderStartEndRadius: 0,
			borderEndEndRadius: 0,
			[`${antCls}-select`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			}
		},
		[`> ${componentCls}-affix-wrapper`]: {
			[`&:not(:first-child) ${componentCls}`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			},
			[`&:not(:last-child) ${componentCls}`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			}
		},
		[`> ${componentCls}:last-child, ${componentCls}-group-addon:last-child`]: {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0,
			[`${antCls}-select`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			}
		},
		[`${componentCls}-affix-wrapper`]: {
			"&:not(:last-child)": {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			},
			"&:not(:first-child)": {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			}
		},
		[`&${componentCls}-group-compact`]: {
			display: "block",
			...clearFix(),
			[`${componentCls}-group-addon, ${componentCls}-group-wrap, > ${componentCls}`]: { "&:not(:first-child):not(:last-child)": {
				borderInlineEndWidth: token.lineWidth,
				"&:hover, &:focus": { zIndex: 1 }
			} },
			"& > *": {
				display: "inline-flex",
				float: "none",
				verticalAlign: "top",
				borderRadius: 0
			},
			[`
        & > ${componentCls}-affix-wrapper,
        & > ${componentCls}-number-affix-wrapper,
        & > ${antCls}-picker-range
      `]: { display: "inline-flex" },
			"& > *:not(:last-child)": {
				marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal(),
				borderInlineEndWidth: token.lineWidth
			},
			[componentCls]: { float: "none" },
			[`& > ${antCls}-select,
      & > ${antCls}-select-auto-complete ${componentCls},
      & > ${antCls}-cascader-picker ${componentCls},
      & > ${componentCls}-group-wrapper ${componentCls}`]: {
				borderInlineEndWidth: token.lineWidth,
				borderRadius: 0,
				"&:hover, &:focus": { zIndex: 1 }
			},
			[`& > ${antCls}-select-focused`]: { zIndex: 1 },
			[`& > ${antCls}-select > ${antCls}-select-arrow`]: { zIndex: 1 },
			[`& > *:first-child,
      & > ${antCls}-select:first-child,
      & > ${antCls}-select-auto-complete:first-child ${componentCls},
      & > ${antCls}-cascader-picker:first-child ${componentCls}`]: {
				borderStartStartRadius: token.borderRadius,
				borderEndStartRadius: token.borderRadius
			},
			[`& > *:last-child,
      & > ${antCls}-select:last-child,
      & > ${antCls}-cascader-picker:last-child ${componentCls},
      & > ${antCls}-cascader-picker-focused:last-child ${componentCls}`]: {
				borderInlineEndWidth: token.lineWidth,
				borderStartEndRadius: token.borderRadius,
				borderEndEndRadius: token.borderRadius
			},
			[`& > ${antCls}-select-auto-complete ${componentCls}`]: { verticalAlign: "top" },
			[`${componentCls}-group-wrapper + ${componentCls}-group-wrapper`]: {
				marginInlineStart: token.calc(token.lineWidth).mul(-1).equal(),
				[`${componentCls}-affix-wrapper`]: {}
			}
		}
	};
};
var genInputStyle = (token) => {
	const { componentCls, controlHeightSM, lineWidth, calc } = token;
	const colorSmallPadding = calc(controlHeightSM).sub(calc(lineWidth).mul(2)).sub(16).div(2).equal();
	return { [componentCls]: {
		...resetComponent(token),
		...genBasicInputStyle(token),
		...genOutlinedStyle(token),
		...genFilledStyle(token),
		...genBorderlessStyle(token),
		...genUnderlinedStyle(token),
		"&[type=\"color\"]": {
			height: token.controlHeight,
			[`&${componentCls}-lg`]: { height: token.controlHeightLG },
			[`&${componentCls}-sm`]: {
				height: controlHeightSM,
				paddingTop: colorSmallPadding,
				paddingBottom: colorSmallPadding
			}
		},
		"&[type=\"search\"]::-webkit-search-cancel-button, &[type=\"search\"]::-webkit-search-decoration": { appearance: "none" }
	} };
};
var genAllowClearStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-clear-icon`]: {
		margin: 0,
		padding: 0,
		lineHeight: 0,
		color: token.colorTextQuaternary,
		fontSize: token.fontSizeIcon,
		verticalAlign: -1,
		cursor: "pointer",
		transition: `color ${token.motionDurationSlow}`,
		border: "none",
		outline: "none",
		backgroundColor: "transparent",
		"&:hover": { color: token.colorIcon },
		"&:active": { color: token.colorText },
		"&-hidden": { visibility: "hidden" },
		"&-has-suffix": { margin: `0 ${unit(token.inputAffixPadding)}` }
	} };
};
var genAffixStyle = (token) => {
	const { componentCls, inputAffixPadding, colorTextDescription, motionDurationSlow, colorIcon, colorIconHover, iconCls } = token;
	const affixCls = `${componentCls}-affix-wrapper`;
	const affixClsDisabled = `${componentCls}-affix-wrapper-disabled`;
	return {
		[affixCls]: {
			...genBasicInputStyle(token),
			display: "inline-flex",
			"&-focused, &:focus": { zIndex: 1 },
			[`> input${componentCls}`]: { padding: 0 },
			[`> input${componentCls}, > textarea${componentCls}`]: {
				fontSize: "inherit",
				border: "none",
				borderRadius: 0,
				outline: "none",
				background: "transparent",
				color: "inherit",
				"&::-ms-reveal": { display: "none" },
				"&:focus": { boxShadow: "none !important" }
			},
			"&::before": {
				display: "inline-block",
				width: 0,
				visibility: "hidden",
				content: "\"\\a0\""
			},
			[componentCls]: {
				"&-prefix, &-suffix": {
					display: "flex",
					flex: "none",
					alignItems: "center",
					"> *:not(:last-child)": { marginInlineEnd: token.paddingXS }
				},
				"&-show-count-suffix": {
					color: colorTextDescription,
					direction: "ltr"
				},
				"&-show-count-has-suffix": { marginInlineEnd: token.paddingXXS },
				"&-prefix": { marginInlineEnd: inputAffixPadding },
				"&-suffix": { marginInlineStart: inputAffixPadding }
			},
			...genAllowClearStyle(token),
			[`${iconCls}${componentCls}-password-icon`]: {
				color: colorIcon,
				cursor: "pointer",
				transition: `all ${motionDurationSlow}`,
				"&:hover": { color: colorIconHover }
			}
		},
		[`${componentCls}-underlined`]: { borderRadius: 0 },
		[affixClsDisabled]: { [`${iconCls}${componentCls}-password-icon`]: {
			color: colorIcon,
			cursor: "not-allowed",
			"&:hover": { color: colorIcon }
		} }
	};
};
var genGroupStyle = (token) => {
	const { componentCls, borderRadiusLG, borderRadiusSM } = token;
	return { [`${componentCls}-group`]: {
		...resetComponent(token),
		...genInputGroupStyle(token),
		"&-rtl": { direction: "rtl" },
		"&-wrapper": {
			display: "inline-block",
			width: "100%",
			textAlign: "start",
			verticalAlign: "top",
			"&-rtl": { direction: "rtl" },
			"&-lg": { [`${componentCls}-group-addon`]: {
				borderRadius: borderRadiusLG,
				fontSize: token.inputFontSizeLG
			} },
			"&-sm": { [`${componentCls}-group-addon`]: { borderRadius: borderRadiusSM } },
			...genOutlinedGroupStyle(token),
			...genFilledGroupStyle(token),
			[`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: { [`${componentCls}, ${componentCls}-group-addon`]: { borderRadius: 0 } },
			[`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: { [`${componentCls}, ${componentCls}-group-addon`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			} },
			[`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: { [`${componentCls}, ${componentCls}-group-addon`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			} },
			[`&:not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: { [`${componentCls}-affix-wrapper`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			} },
			[`&:not(${componentCls}-compact-first-item)${componentCls}-compact-item`]: { [`${componentCls}-affix-wrapper`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			} }
		}
	} };
};
var genRangeStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-out-of-range`]: { [`&, & input, & textarea, ${componentCls}-show-count-suffix, ${componentCls}-data-count`]: { color: token.colorError } } };
};
var useSharedStyle = genStyleHooks(["Input", "Shared"], (token) => {
	const inputToken = merge$1(token, initInputToken(token));
	return [genInputStyle(inputToken), genAffixStyle(inputToken)];
}, initComponentToken, { resetFont: false });
var style_default$20 = genStyleHooks(["Input", "Component"], (token) => {
	const inputToken = merge$1(token, initInputToken(token));
	return [
		genGroupStyle(inputToken),
		genRangeStyle(inputToken),
		genCompactItemStyle(inputToken, {
			focus: true,
			focusElCls: `${inputToken.componentCls}-affix-wrapper-focused`
		})
	];
}, initComponentToken, { resetFont: false });
//#endregion
//#region node_modules/antd/es/date-picker/style/util.js
/**
* Get multiple selector needed style. The calculation:
*
* ContainerPadding = BasePadding - ItemMargin
*
* Border:                    ╔═══════════════════════════╗                 ┬
* ContainerPadding:          ║                           ║                 │
*                            ╟───────────────────────────╢     ┬           │
* Item Margin:               ║                           ║     │           │
*                            ║             ┌──────────┐  ║     │           │
* Item(multipleItemHeight):  ║ BasePadding │   Item   │  ║  Overflow  Container(ControlHeight)
*                            ║             └──────────┘  ║     │           │
* Item Margin:               ║                           ║     │           │
*                            ╟───────────────────────────╢     ┴           │
* ContainerPadding:          ║                           ║                 │
* Border:                    ╚═══════════════════════════╝                 ┴
*/
var getMultipleSelectorUnit = (token) => {
	const { multipleSelectItemHeight, paddingXXS, lineWidth, INTERNAL_FIXED_ITEM_MARGIN } = token;
	const basePadding = token.max(token.calc(paddingXXS).sub(lineWidth).equal(), 0);
	return {
		basePadding,
		containerPadding: token.max(token.calc(basePadding).sub(INTERNAL_FIXED_ITEM_MARGIN).equal(), 0),
		itemHeight: unit(multipleSelectItemHeight),
		itemLineHeight: unit(token.calc(multipleSelectItemHeight).sub(token.calc(token.lineWidth).mul(2)).equal())
	};
};
/**
* Get the `@rc-component/overflow` needed style.
* It's a share style which means not affected by `size`.
*/
var genOverflowStyle = (token) => {
	const { componentCls, iconCls, borderRadiusSM, motionDurationSlow, paddingXS, multipleItemColorDisabled, multipleItemBorderColorDisabled, colorIcon, colorIconHover, INTERNAL_FIXED_ITEM_MARGIN } = token;
	return { [`${componentCls}-selection-overflow`]: {
		position: "relative",
		display: "flex",
		flex: "auto",
		flexWrap: "wrap",
		maxWidth: "100%",
		"&-item": {
			flex: "none",
			alignSelf: "center",
			maxWidth: "calc(100% - 4px)",
			display: "inline-flex"
		},
		[`${componentCls}-selection-item`]: {
			display: "flex",
			alignSelf: "center",
			flex: "none",
			boxSizing: "border-box",
			maxWidth: "100%",
			marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
			borderRadius: borderRadiusSM,
			cursor: "default",
			transition: [
				`font-size`,
				`line-height`,
				`height`
			].map((prop) => `${prop} ${motionDurationSlow}`).join(", "),
			marginInlineEnd: token.calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
			paddingInlineStart: paddingXS,
			paddingInlineEnd: token.calc(paddingXS).div(2).equal(),
			[`${componentCls}-disabled&`]: {
				color: multipleItemColorDisabled,
				borderColor: multipleItemBorderColorDisabled,
				cursor: "not-allowed"
			},
			"&-content": {
				display: "inline-block",
				marginInlineEnd: token.calc(paddingXS).div(2).equal(),
				overflow: "hidden",
				whiteSpace: "pre",
				textOverflow: "ellipsis"
			},
			"&-remove": {
				...resetIcon(),
				display: "inline-flex",
				alignItems: "center",
				color: colorIcon,
				fontWeight: "bold",
				fontSize: 10,
				lineHeight: "inherit",
				cursor: "pointer",
				[`> ${iconCls}`]: { verticalAlign: "-0.2em" },
				"&:hover": { color: colorIconHover }
			}
		}
	} };
};
//#endregion
//#region node_modules/antd/es/date-picker/style/multiple.js
var genSize = (token, suffix) => {
	const { componentCls, controlHeight } = token;
	const suffixCls = suffix ? `${componentCls}-${suffix}` : "";
	const multipleSelectorUnit = getMultipleSelectorUnit(token);
	return [{ [`${componentCls}-multiple${suffixCls}`]: {
		paddingBlock: multipleSelectorUnit.containerPadding,
		paddingInlineStart: multipleSelectorUnit.basePadding,
		minHeight: controlHeight,
		[`${componentCls}-selection-item`]: {
			height: multipleSelectorUnit.itemHeight,
			lineHeight: unit(multipleSelectorUnit.itemLineHeight)
		}
	} }];
};
var genPickerMultipleStyle = (token) => {
	const { componentCls, calc, lineWidth } = token;
	const smallToken = merge$1(token, {
		fontHeight: token.fontSize,
		selectHeight: token.controlHeightSM,
		multipleSelectItemHeight: token.multipleItemHeightSM,
		borderRadius: token.borderRadiusSM,
		borderRadiusSM: token.borderRadiusXS,
		controlHeight: token.controlHeightSM
	});
	const largeToken = merge$1(token, {
		fontHeight: calc(token.multipleItemHeightLG).sub(calc(lineWidth).mul(2).equal()).equal(),
		fontSize: token.fontSizeLG,
		selectHeight: token.controlHeightLG,
		multipleSelectItemHeight: token.multipleItemHeightLG,
		borderRadius: token.borderRadiusLG,
		borderRadiusSM: token.borderRadius,
		controlHeight: token.controlHeightLG
	});
	return [
		genSize(smallToken, "small"),
		genSize(token),
		genSize(largeToken, "large"),
		{ [`${componentCls}${componentCls}-multiple`]: {
			width: "100%",
			cursor: "text",
			[`${componentCls}-selector`]: {
				flex: "auto",
				padding: 0,
				position: "relative",
				"&:after": { margin: 0 },
				[`${componentCls}-selection-placeholder`]: {
					position: "absolute",
					top: "50%",
					insetInlineStart: token.inputPaddingHorizontalBase,
					insetInlineEnd: 0,
					transform: "translateY(-50%)",
					transition: `all ${token.motionDurationSlow}`,
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					flex: 1,
					color: token.colorTextPlaceholder,
					pointerEvents: "none"
				}
			},
			...genOverflowStyle(token),
			[`${componentCls}-multiple-input`]: {
				width: 0,
				height: 0,
				border: 0,
				visibility: "hidden",
				position: "absolute",
				zIndex: -1
			}
		} }
	];
};
//#endregion
//#region node_modules/antd/es/date-picker/style/panel.js
var genPickerCellInnerStyle = (token) => {
	const { pickerCellCls, pickerCellInnerCls, cellHeight, borderRadiusSM, motionDurationMid, cellHoverBg, lineWidth, lineType, colorPrimary, cellActiveWithRangeBg, colorTextLightSolid, colorTextDisabled, cellBgDisabled, colorFillSecondary } = token;
	return {
		"&::before": {
			position: "absolute",
			top: "50%",
			insetInlineStart: 0,
			insetInlineEnd: 0,
			zIndex: 1,
			height: cellHeight,
			transform: "translateY(-50%)",
			content: "\"\"",
			pointerEvents: "none"
		},
		[pickerCellInnerCls]: {
			position: "relative",
			zIndex: 2,
			display: "inline-block",
			minWidth: cellHeight,
			height: cellHeight,
			lineHeight: unit(cellHeight),
			borderRadius: borderRadiusSM,
			transition: `background-color ${motionDurationMid}`
		},
		[`&:hover:not(${pickerCellCls}-in-view):not(${pickerCellCls}-disabled),
    &:hover:not(${pickerCellCls}-selected):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end):not(${pickerCellCls}-disabled)`]: { [pickerCellInnerCls]: { background: cellHoverBg } },
		[`&-in-view${pickerCellCls}-today ${pickerCellInnerCls}`]: { "&::before": {
			position: "absolute",
			top: 0,
			insetInlineEnd: 0,
			bottom: 0,
			insetInlineStart: 0,
			zIndex: 1,
			border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
			borderRadius: borderRadiusSM,
			content: "\"\""
		} },
		[`&-in-view${pickerCellCls}-in-range,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
			position: "relative",
			[`&:not(${pickerCellCls}-disabled):before`]: { background: cellActiveWithRangeBg }
		},
		[`&-in-view${pickerCellCls}-selected,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
			[`&:not(${pickerCellCls}-disabled) ${pickerCellInnerCls}`]: {
				color: colorTextLightSolid,
				background: colorPrimary
			},
			[`&${pickerCellCls}-disabled ${pickerCellInnerCls}`]: { background: colorFillSecondary }
		},
		[`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-disabled):before`]: { insetInlineStart: "50%" },
		[`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-disabled):before`]: { insetInlineEnd: "50%" },
		[`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-end) ${pickerCellInnerCls}`]: {
			borderStartStartRadius: borderRadiusSM,
			borderEndStartRadius: borderRadiusSM,
			borderStartEndRadius: 0,
			borderEndEndRadius: 0
		},
		[`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-start) ${pickerCellInnerCls}`]: {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0,
			borderStartEndRadius: borderRadiusSM,
			borderEndEndRadius: borderRadiusSM
		},
		"&-disabled": {
			color: colorTextDisabled,
			cursor: "not-allowed",
			[pickerCellInnerCls]: { background: "transparent" },
			"&::before": { background: cellBgDisabled }
		},
		[`&-disabled${pickerCellCls}-today ${pickerCellInnerCls}::before`]: { borderColor: colorTextDisabled }
	};
};
var genPanelStyle$1 = (token) => {
	const { componentCls, pickerCellCls, pickerCellInnerCls, pickerYearMonthCellWidth, pickerControlIconSize, cellWidth, paddingSM, paddingXS, paddingXXS, colorBgContainer, lineWidth, lineType, borderRadiusLG, colorPrimary, colorTextHeading, colorSplit, pickerControlIconBorderWidth, colorIcon, textHeight, motionDurationMid, colorIconHover, fontWeightStrong, cellHeight, pickerCellPaddingVertical, colorTextDisabled, colorText, fontSize, motionDurationSlow, withoutTimeCellHeight, pickerQuarterPanelContentHeight, borderRadiusSM, colorTextLightSolid, cellHoverBg, timeColumnHeight, timeColumnWidth, timeCellHeight, controlItemBgActive, marginXXS, pickerDatePanelPaddingHorizontal, pickerControlIconMargin } = token;
	const pickerPanelWidth = token.calc(cellWidth).mul(7).add(token.calc(pickerDatePanelPaddingHorizontal).mul(2)).equal();
	return { [componentCls]: {
		"&-panel": {
			display: "inline-flex",
			flexDirection: "column",
			textAlign: "center",
			background: colorBgContainer,
			borderRadius: borderRadiusLG,
			outline: "none",
			"&-focused": { borderColor: colorPrimary },
			"&-rtl": {
				[`${componentCls}-prev-icon,
              ${componentCls}-super-prev-icon`]: { transform: "rotate(45deg)" },
				[`${componentCls}-next-icon,
              ${componentCls}-super-next-icon`]: { transform: "rotate(-135deg)" },
				[`${componentCls}-time-panel`]: { [`${componentCls}-content`]: {
					direction: "ltr",
					"> *": { direction: "rtl" }
				} }
			}
		},
		[`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel,
        &-week-panel,
        &-date-panel,
        &-time-panel`]: {
			display: "flex",
			flexDirection: "column",
			width: pickerPanelWidth
		},
		"&-header": {
			display: "flex",
			padding: `0 ${unit(paddingXS)}`,
			color: colorTextHeading,
			borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
			"> *": { flex: "none" },
			button: {
				padding: 0,
				color: colorIcon,
				lineHeight: unit(textHeight),
				background: "transparent",
				border: 0,
				cursor: "pointer",
				transition: `color ${motionDurationMid}`,
				fontSize: "inherit",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				"&:empty": { display: "none" }
			},
			"> button": {
				minWidth: "1.6em",
				fontSize,
				"&:hover": { color: colorIconHover },
				"&:disabled": {
					opacity: .25,
					pointerEvents: "none"
				}
			},
			"&-view": {
				flex: "auto",
				fontWeight: fontWeightStrong,
				lineHeight: unit(textHeight),
				"> button": {
					color: "inherit",
					fontWeight: "inherit",
					verticalAlign: "top",
					"&:not(:first-child)": { marginInlineStart: paddingXS },
					"&:hover": { color: colorPrimary }
				}
			}
		},
		[`&-prev-icon,
        &-next-icon,
        &-super-prev-icon,
        &-super-next-icon`]: {
			position: "relative",
			width: pickerControlIconSize,
			height: pickerControlIconSize,
			"&::before": {
				position: "absolute",
				top: 0,
				insetInlineStart: 0,
				width: pickerControlIconSize,
				height: pickerControlIconSize,
				border: `0 solid currentcolor`,
				borderBlockStartWidth: pickerControlIconBorderWidth,
				borderInlineStartWidth: pickerControlIconBorderWidth,
				content: "\"\""
			}
		},
		[`&-super-prev-icon,
        &-super-next-icon`]: { "&::after": {
			position: "absolute",
			top: pickerControlIconMargin,
			insetInlineStart: pickerControlIconMargin,
			display: "inline-block",
			width: pickerControlIconSize,
			height: pickerControlIconSize,
			border: "0 solid currentcolor",
			borderBlockStartWidth: pickerControlIconBorderWidth,
			borderInlineStartWidth: pickerControlIconBorderWidth,
			content: "\"\""
		} },
		"&-prev-icon, &-super-prev-icon": { transform: "rotate(-45deg)" },
		"&-next-icon, &-super-next-icon": { transform: "rotate(135deg)" },
		"&-content": {
			width: "100%",
			tableLayout: "fixed",
			borderCollapse: "collapse",
			"th, td": {
				position: "relative",
				minWidth: cellHeight,
				fontWeight: "normal"
			},
			th: {
				height: token.calc(cellHeight).add(token.calc(pickerCellPaddingVertical).mul(2)).equal(),
				color: colorText,
				verticalAlign: "middle"
			}
		},
		"&-cell": {
			padding: `${unit(pickerCellPaddingVertical)} 0`,
			color: colorTextDisabled,
			cursor: "pointer",
			"&-in-view": { color: colorText },
			...genPickerCellInnerStyle(token)
		},
		[`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
			[`${componentCls}-content`]: { height: token.calc(withoutTimeCellHeight).mul(4).equal() },
			[pickerCellInnerCls]: { padding: `0 ${unit(paddingXS)}` }
		},
		"&-quarter-panel": { [`${componentCls}-content`]: { height: pickerQuarterPanelContentHeight } },
		"&-decade-panel": {
			[pickerCellInnerCls]: { padding: `0 ${unit(token.calc(paddingXS).div(2).equal())}` },
			[`${componentCls}-cell::before`]: { display: "none" }
		},
		[`&-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
			[`${componentCls}-body`]: { padding: `0 ${unit(paddingXS)}` },
			[pickerCellInnerCls]: { width: pickerYearMonthCellWidth }
		},
		"&-date-panel": {
			[`${componentCls}-body`]: { padding: `${unit(paddingXS)} ${unit(pickerDatePanelPaddingHorizontal)}` },
			[`${componentCls}-content th`]: {
				boxSizing: "border-box",
				padding: 0
			}
		},
		"&-week-panel-row": {
			td: {
				"&:before": { transition: `background-color ${motionDurationMid}` },
				"&:first-child:before": {
					borderStartStartRadius: borderRadiusSM,
					borderEndStartRadius: borderRadiusSM
				},
				"&:last-child:before": {
					borderStartEndRadius: borderRadiusSM,
					borderEndEndRadius: borderRadiusSM
				}
			},
			"&:hover td:before": { background: cellHoverBg },
			"&-range-start td, &-range-end td, &-selected td, &-hover td": { [`&${pickerCellCls}`]: {
				"&:before": { background: colorPrimary },
				[`&${componentCls}-cell-week`]: { color: new FastColor(colorTextLightSolid).setA(.5).toHexString() },
				[pickerCellInnerCls]: { color: colorTextLightSolid }
			} },
			"&-range-hover td:before": { background: controlItemBgActive }
		},
		"&-week-panel, &-date-panel-show-week": {
			[`${componentCls}-body`]: { padding: `${unit(paddingXS)} ${unit(paddingSM)}` },
			[`${componentCls}-content th`]: { width: "auto" }
		},
		"&-datetime-panel": {
			display: "flex",
			[`${componentCls}-time-panel`]: { borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}` },
			[`${componentCls}-date-panel,
          ${componentCls}-time-panel`]: { transition: `opacity ${motionDurationSlow}` },
			"&-active": { [`${componentCls}-date-panel,
            ${componentCls}-time-panel`]: {
				opacity: .3,
				"&-active": { opacity: 1 }
			} }
		},
		"&-time-panel": {
			width: "auto",
			minWidth: "auto",
			[`${componentCls}-content`]: {
				display: "flex",
				flex: "auto",
				height: timeColumnHeight
			},
			"&-column": {
				flex: "1 0 auto",
				width: timeColumnWidth,
				margin: `${unit(paddingXXS)} 0`,
				padding: 0,
				overflowY: "hidden",
				textAlign: "start",
				listStyle: "none",
				transition: `background-color ${motionDurationMid}`,
				overflowX: "hidden",
				"&::-webkit-scrollbar": {
					width: 8,
					backgroundColor: "transparent"
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: token.colorTextTertiary,
					borderRadius: token.borderRadiusSM
				},
				"&": {
					scrollbarWidth: "thin",
					scrollbarColor: `${token.colorTextTertiary} transparent`
				},
				"&::after": {
					display: "block",
					height: `calc(100% - ${unit(timeCellHeight)})`,
					content: "\"\""
				},
				"&:not(:first-child)": { borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}` },
				"&-active": { background: new FastColor(controlItemBgActive).setA(.2).toHexString() },
				"&:hover": { overflowY: "auto" },
				"> li": {
					margin: 0,
					padding: 0,
					[`&${componentCls}-time-panel-cell`]: {
						marginInline: marginXXS,
						[`${componentCls}-time-panel-cell-inner`]: {
							display: "block",
							width: token.calc(timeColumnWidth).sub(token.calc(marginXXS).mul(2)).equal(),
							height: timeCellHeight,
							margin: 0,
							paddingBlock: 0,
							paddingInlineEnd: 0,
							paddingInlineStart: token.calc(timeColumnWidth).sub(timeCellHeight).div(2).equal(),
							color: colorText,
							lineHeight: unit(timeCellHeight),
							borderRadius: borderRadiusSM,
							cursor: "pointer",
							transition: `background-color ${motionDurationMid}`,
							"&:hover": { background: cellHoverBg }
						},
						"&-selected": { [`${componentCls}-time-panel-cell-inner`]: { background: controlItemBgActive } },
						"&-disabled": { [`${componentCls}-time-panel-cell-inner`]: {
							color: colorTextDisabled,
							background: "transparent",
							cursor: "not-allowed"
						} }
					}
				}
			}
		}
	} };
};
var genPickerPanelStyle = (token) => {
	const { componentCls, textHeight, lineWidth, paddingSM, antCls, colorPrimary, cellActiveWithRangeBg, colorPrimaryBorder, lineType, colorSplit } = token;
	return { [`${componentCls}-dropdown`]: {
		[`${componentCls}-footer`]: {
			borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
			"&-extra": {
				padding: `0 ${unit(paddingSM)}`,
				lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
				textAlign: "start",
				"&:not(:last-child)": { borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}` }
			}
		},
		[`${componentCls}-panels + ${componentCls}-footer ${componentCls}-ranges`]: { justifyContent: "space-between" },
		[`${componentCls}-ranges`]: {
			marginBlock: 0,
			paddingInline: unit(paddingSM),
			overflow: "hidden",
			textAlign: "start",
			listStyle: "none",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			"> li": {
				lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
				display: "inline-block"
			},
			[`${componentCls}-now-btn-disabled`]: {
				pointerEvents: "none",
				color: token.colorTextDisabled
			},
			[`${componentCls}-preset > ${antCls}-tag-blue`]: {
				color: colorPrimary,
				background: cellActiveWithRangeBg,
				borderColor: colorPrimaryBorder,
				cursor: "pointer"
			},
			[`${componentCls}-ok`]: {
				paddingBlock: token.calc(lineWidth).mul(2).equal(),
				marginInlineStart: "auto"
			}
		}
	} };
};
//#endregion
//#region node_modules/antd/es/date-picker/style/token.js
var initPickerPanelToken = (token) => {
	const { componentCls, controlHeightLG, paddingXXS, padding } = token;
	return {
		pickerCellCls: `${componentCls}-cell`,
		pickerCellInnerCls: `${componentCls}-cell-inner`,
		pickerYearMonthCellWidth: token.calc(controlHeightLG).mul(1.5).equal(),
		pickerQuarterPanelContentHeight: token.calc(controlHeightLG).mul(1.4).equal(),
		pickerCellPaddingVertical: token.calc(paddingXXS).add(token.calc(paddingXXS).div(2)).equal(),
		pickerCellBorderGap: 2,
		pickerControlIconSize: 7,
		pickerControlIconMargin: 4,
		pickerControlIconBorderWidth: 1.5,
		pickerDatePanelPaddingHorizontal: token.calc(padding).add(token.calc(paddingXXS).div(2)).equal()
	};
};
var initPanelComponentToken = (token) => {
	const { colorBgContainerDisabled, controlHeight, controlHeightSM, controlHeightLG, paddingXXS, lineWidth } = token;
	const dblPaddingXXS = paddingXXS * 2;
	const dblLineWidth = lineWidth * 2;
	const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
	const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
	const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
	return {
		INTERNAL_FIXED_ITEM_MARGIN: Math.floor(paddingXXS / 2),
		cellHoverBg: token.controlItemBgHover,
		cellActiveWithRangeBg: token.controlItemBgActive,
		cellHoverWithRangeBg: new FastColor(token.colorPrimary).lighten(35).toHexString(),
		cellRangeBorderColor: new FastColor(token.colorPrimary).lighten(20).toHexString(),
		cellBgDisabled: colorBgContainerDisabled,
		timeColumnWidth: controlHeightLG * 1.4,
		timeColumnHeight: 224,
		timeCellHeight: 28,
		cellWidth: controlHeightSM * 1.5,
		cellHeight: controlHeightSM,
		textHeight: controlHeightLG,
		withoutTimeCellHeight: controlHeightLG * 1.65,
		multipleItemBg: token.colorFillSecondary,
		multipleItemBorderColor: "transparent",
		multipleItemHeight,
		multipleItemHeightSM,
		multipleItemHeightLG,
		multipleSelectorBgDisabled: colorBgContainerDisabled,
		multipleItemColorDisabled: token.colorTextDisabled,
		multipleItemBorderColorDisabled: "transparent"
	};
};
var prepareComponentToken$17 = (token) => ({
	...initComponentToken(token),
	...initPanelComponentToken(token),
	...getArrowToken(token),
	presetsWidth: 120,
	presetsMaxWidth: 200,
	zIndexPopup: token.zIndexPopupBase + 50
});
//#endregion
//#region node_modules/antd/es/date-picker/style/variants.js
var genVariantsStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: [{
		...genOutlinedStyle(token),
		...genUnderlinedStyle(token),
		...genFilledStyle(token),
		...genBorderlessStyle(token)
	}, {
		"&-outlined": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.multipleItemBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
		} },
		"&-filled": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.colorBgContainer,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
		} },
		"&-borderless": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.multipleItemBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
		} },
		"&-underlined": { [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
			background: token.multipleItemBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
		} }
	}] };
};
//#endregion
//#region node_modules/antd/es/date-picker/style/index.js
var genPickerPadding = (paddingBlock, paddingInline) => {
	return { padding: `${unit(paddingBlock)} ${unit(paddingInline)}` };
};
var genPickerStatusStyle = (token) => {
	const { componentCls, colorError, colorWarning } = token;
	return { [`${componentCls}:not(${componentCls}-disabled):not([disabled])`]: {
		[`&${componentCls}-status-error`]: { [`${componentCls}-active-bar`]: { background: colorError } },
		[`&${componentCls}-status-warning`]: { [`${componentCls}-active-bar`]: { background: colorWarning } }
	} };
};
var genPickerStyle = (token) => {
	const { componentCls, antCls, paddingInline, lineWidth, lineType, colorBorder, borderRadius, motionDurationMid, colorTextDisabled, colorTextPlaceholder, colorTextQuaternary, fontSizeLG, inputFontSizeLG, fontSizeSM, inputFontSizeSM, controlHeightSM, paddingInlineSM, paddingXS, marginXS, colorIcon, lineWidthBold, colorPrimary, motionDurationSlow, zIndexPopup, paddingXXS, sizePopupArrow, colorBgElevated, borderRadiusLG, boxShadowSecondary, borderRadiusSM, colorSplit, cellHoverBg, presetsWidth, presetsMaxWidth, boxShadowPopoverArrow, fontHeight, lineHeightLG } = token;
	return [
		{ [componentCls]: {
			...resetComponent(token),
			...genPickerPadding(token.paddingBlock, token.paddingInline),
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			lineHeight: 1,
			borderRadius,
			transition: [
				`border`,
				`box-shadow`,
				`background-color`
			].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
			[`${componentCls}-prefix`]: {
				flex: "0 0 auto",
				marginInlineEnd: token.inputAffixPadding
			},
			[`${componentCls}-input`]: {
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				width: "100%",
				"> input": {
					position: "relative",
					display: "inline-block",
					width: "100%",
					color: "inherit",
					fontSize: token.inputFontSize ?? token.fontSize,
					lineHeight: token.lineHeight,
					transition: `all ${motionDurationMid}`,
					...genPlaceholderStyle(colorTextPlaceholder),
					flex: "auto",
					minWidth: 1,
					height: "auto",
					padding: 0,
					background: "transparent",
					border: 0,
					fontFamily: "inherit",
					"&:focus": {
						boxShadow: "none",
						outline: 0
					},
					"&[disabled]": {
						background: "transparent",
						color: colorTextDisabled,
						cursor: "not-allowed"
					}
				},
				"&-placeholder": { "> input": { color: colorTextPlaceholder } }
			},
			"&-large": {
				...genPickerPadding(token.paddingBlockLG, token.paddingInlineLG),
				borderRadius: token.borderRadiusLG,
				[`${componentCls}-input > input`]: {
					fontSize: inputFontSizeLG ?? fontSizeLG,
					lineHeight: lineHeightLG
				}
			},
			"&-small": {
				...genPickerPadding(token.paddingBlockSM, token.paddingInlineSM),
				borderRadius: token.borderRadiusSM,
				[`${componentCls}-input > input`]: { fontSize: inputFontSizeSM ?? fontSizeSM }
			},
			[`${componentCls}-suffix`]: {
				display: "flex",
				flex: "none",
				alignSelf: "center",
				marginInlineStart: token.calc(paddingXS).div(2).equal(),
				color: colorTextQuaternary,
				lineHeight: 1,
				pointerEvents: "none",
				transition: ["opacity", "color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				"> *": {
					verticalAlign: "top",
					"&:not(:last-child)": { marginInlineEnd: marginXS }
				}
			},
			[`${componentCls}-clear`]: {
				position: "absolute",
				top: "50%",
				insetInlineEnd: 0,
				color: colorTextQuaternary,
				lineHeight: 1,
				transform: "translateY(-50%)",
				cursor: "pointer",
				opacity: 0,
				transition: ["opacity", "color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				"> *": { verticalAlign: "top" },
				"&:hover": { color: colorIcon }
			},
			"&:hover": {
				[`${componentCls}-clear`]: { opacity: 1 },
				[`${componentCls}-suffix:not(:last-child)`]: { opacity: 0 }
			},
			[`${componentCls}-separator`]: {
				position: "relative",
				display: "inline-block",
				width: "1em",
				height: fontSizeLG,
				color: colorTextQuaternary,
				fontSize: fontSizeLG,
				verticalAlign: "top",
				cursor: "default",
				[`${componentCls}-focused &`]: { color: colorIcon },
				[`${componentCls}-range-separator &`]: { [`${componentCls}-disabled &`]: { cursor: "not-allowed" } }
			},
			"&-range": {
				position: "relative",
				display: "inline-flex",
				[`${componentCls}-active-bar`]: {
					bottom: token.calc(lineWidth).mul(-1).equal(),
					height: lineWidthBold,
					background: colorPrimary,
					opacity: 0,
					transition: `all ${motionDurationSlow} ease-out`,
					pointerEvents: "none"
				},
				[`&${componentCls}-focused`]: { [`${componentCls}-active-bar`]: { opacity: 1 } },
				[`${componentCls}-range-separator`]: {
					alignItems: "center",
					padding: `0 ${unit(paddingXS)}`,
					lineHeight: 1
				}
			},
			"&-range, &-multiple": {
				[`${componentCls}-clear`]: { insetInlineEnd: paddingInline },
				[`&${componentCls}-small`]: { [`${componentCls}-clear`]: { insetInlineEnd: paddingInlineSM } }
			},
			"&-dropdown": {
				...resetComponent(token),
				...genPanelStyle$1(token),
				pointerEvents: "none",
				position: "absolute",
				top: -9999,
				left: {
					_skip_check_: true,
					value: -9999
				},
				zIndex: zIndexPopup,
				[`&${componentCls}-dropdown-hidden`]: { display: "none" },
				"&-rtl": { direction: "rtl" },
				[`&${componentCls}-dropdown-placement-bottomLeft,
            &${componentCls}-dropdown-placement-bottomRight`]: { [`${componentCls}-range-arrow`]: {
					top: 0,
					display: "block",
					transform: "translateY(-100%)"
				} },
				[`&${componentCls}-dropdown-placement-topLeft,
            &${componentCls}-dropdown-placement-topRight`]: { [`${componentCls}-range-arrow`]: {
					bottom: 0,
					display: "block",
					transform: "translateY(100%) rotate(180deg)"
				} },
				[`&${antCls}-slide-up-appear, &${antCls}-slide-up-enter`]: { [`${componentCls}-range-arrow${componentCls}-range-arrow`]: { transition: "none" } },
				[`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]: { animationName: slideDownIn },
				[`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]: { animationName: slideUpIn },
				[`&${antCls}-slide-up-leave ${componentCls}-panel-container`]: { pointerEvents: "none" },
				[`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]: { animationName: slideDownOut },
				[`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]: { animationName: slideUpOut },
				[`${componentCls}-panel > ${componentCls}-time-panel`]: { paddingTop: paddingXXS },
				[`${componentCls}-range-wrapper`]: {
					display: "flex",
					position: "relative"
				},
				[`${componentCls}-range-arrow`]: {
					position: "absolute",
					zIndex: 1,
					display: "none",
					paddingInline: token.calc(paddingInline).mul(1.5).equal(),
					boxSizing: "content-box",
					transition: `all ${motionDurationSlow} ease-out`,
					...genRoundedArrow(token, colorBgElevated, boxShadowPopoverArrow),
					"&:before": { insetInlineStart: token.calc(paddingInline).mul(1.5).equal() }
				},
				[`${componentCls}-panel-container`]: {
					overflow: "hidden",
					verticalAlign: "top",
					background: colorBgElevated,
					borderRadius: borderRadiusLG,
					boxShadow: boxShadowSecondary,
					transition: `margin ${motionDurationSlow}`,
					display: "inline-block",
					pointerEvents: "auto",
					[`${componentCls}-panel-layout`]: {
						display: "flex",
						flexWrap: "nowrap",
						alignItems: "stretch"
					},
					[`${componentCls}-presets`]: {
						display: "flex",
						flexDirection: "column",
						minWidth: presetsWidth,
						maxWidth: presetsMaxWidth,
						ul: {
							height: 0,
							flex: "auto",
							listStyle: "none",
							overflow: "auto",
							margin: 0,
							padding: paddingXS,
							borderInlineEnd: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
							li: {
								...textEllipsis,
								borderRadius: borderRadiusSM,
								paddingInline: paddingXS,
								paddingBlock: token.calc(controlHeightSM).sub(fontHeight).div(2).equal(),
								cursor: "pointer",
								transition: `all ${motionDurationSlow}`,
								"+ li": { marginTop: marginXS },
								"&:hover": { background: cellHoverBg }
							}
						}
					},
					[`${componentCls}-panels`]: {
						display: "inline-flex",
						flexWrap: "nowrap",
						"&:last-child": { [`${componentCls}-panel`]: { borderWidth: 0 } }
					},
					[`${componentCls}-panel`]: {
						verticalAlign: "top",
						background: "transparent",
						borderRadius: 0,
						borderWidth: 0,
						[`${componentCls}-content, table`]: { textAlign: "center" },
						"&-focused": { borderColor: colorBorder }
					}
				}
			},
			"&-dropdown-range": {
				padding: `${unit(token.calc(sizePopupArrow).mul(2).div(3).equal())} 0`,
				"&-hidden": { display: "none" }
			},
			"&-rtl": {
				direction: "rtl",
				[`${componentCls}-separator`]: { transform: "scale(-1, 1)" },
				[`${componentCls}-footer`]: { "&-extra": { direction: "rtl" } }
			}
		} },
		initSlideMotion(token, "slide-up"),
		initSlideMotion(token, "slide-down"),
		initMoveMotion(token, "move-up"),
		initMoveMotion(token, "move-down")
	];
};
var style_default$19 = genStyleHooks("DatePicker", (token) => {
	const pickerToken = merge$1(initInputToken(token), initPickerPanelToken(token), {
		inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(1).equal(),
		multipleSelectItemHeight: token.multipleItemHeight,
		selectHeight: token.controlHeight
	});
	return [
		genPickerPanelStyle(pickerToken),
		genPickerStyle(pickerToken),
		genVariantsStyle(pickerToken),
		genPickerStatusStyle(pickerToken),
		genPickerMultipleStyle(pickerToken),
		genCompactItemStyle(token, { focusElCls: `${token.componentCls}-focused` })
	];
}, prepareComponentToken$17);
//#endregion
//#region node_modules/antd/es/calendar/style/index.js
var genCalendarStyles = (token) => {
	const { calendarCls, componentCls, fullBg, fullPanelBg, itemActiveBg } = token;
	return {
		[calendarCls]: {
			...genPanelStyle$1(token),
			...resetComponent(token),
			background: fullBg,
			"&-rtl": { direction: "rtl" },
			[`${calendarCls}-header`]: {
				display: "flex",
				justifyContent: "flex-end",
				padding: `${unit(token.paddingSM)} 0`,
				[`${calendarCls}-year-select`]: { minWidth: token.yearControlWidth },
				[`${calendarCls}-month-select`]: {
					minWidth: token.monthControlWidth,
					marginInlineStart: token.marginXS
				},
				[`${calendarCls}-mode-switch`]: { marginInlineStart: token.marginXS }
			}
		},
		[`${calendarCls} ${componentCls}-panel`]: {
			background: fullPanelBg,
			border: 0,
			borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
			borderRadius: 0,
			[`${componentCls}-month-panel, ${componentCls}-date-panel`]: { width: "auto" },
			[`${componentCls}-body`]: { padding: `${unit(token.paddingXS)} 0` },
			[`${componentCls}-content`]: { width: "100%" }
		},
		[`${calendarCls}-mini`]: {
			borderRadius: token.borderRadiusLG,
			[`${calendarCls}-header`]: {
				paddingInlineEnd: token.paddingXS,
				paddingInlineStart: token.paddingXS
			},
			[`${componentCls}-panel`]: { borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}` },
			[`${componentCls}-content`]: {
				height: token.miniContentHeight,
				th: {
					height: "auto",
					padding: 0,
					lineHeight: unit(token.weekHeight)
				}
			},
			[`${componentCls}-cell::before`]: { pointerEvents: "none" }
		},
		[`${calendarCls}${calendarCls}-full`]: {
			[`${componentCls}-panel`]: {
				display: "block",
				width: "100%",
				textAlign: "end",
				background: fullBg,
				border: 0,
				[`${componentCls}-body`]: {
					"th, td": { padding: 0 },
					th: {
						height: "auto",
						paddingInlineEnd: token.paddingSM,
						paddingBottom: token.paddingXXS,
						lineHeight: unit(token.weekHeight)
					}
				}
			},
			[`${componentCls}-cell-week ${componentCls}-cell-inner`]: {
				display: "block",
				borderRadius: 0,
				borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
				width: "100%",
				height: token.calc(token.dateValueHeight).add(token.dateContentHeight).add(token.calc(token.paddingXS).div(2)).add(token.lineWidthBold).equal()
			},
			[`${componentCls}-cell`]: {
				"&::before": { display: "none" },
				"&:hover": { [`${calendarCls}-date`]: { background: token.controlItemBgHover } },
				[`${calendarCls}-date-today::before`]: { display: "none" },
				[`&-in-view${componentCls}-cell-selected`]: { [`${calendarCls}-date, ${calendarCls}-date-today`]: { background: itemActiveBg } },
				"&-selected, &-selected:hover": { [`${calendarCls}-date, ${calendarCls}-date-today`]: { [`${calendarCls}-date-value`]: { color: token.colorPrimary } } }
			},
			[`${calendarCls}-date`]: {
				display: "block",
				width: "auto",
				height: "auto",
				margin: `0 ${unit(token.calc(token.marginXS).div(2).equal())}`,
				padding: `${unit(token.calc(token.paddingXS).div(2).equal())} ${unit(token.paddingXS)} 0`,
				border: 0,
				borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
				borderRadius: 0,
				transition: `background-color ${token.motionDurationSlow}`,
				"&-value": {
					lineHeight: unit(token.dateValueHeight),
					transition: `color ${token.motionDurationSlow}`
				},
				"&-content": {
					position: "static",
					width: "auto",
					height: token.dateContentHeight,
					overflowY: "auto",
					color: token.colorText,
					lineHeight: token.lineHeight,
					textAlign: "start"
				},
				"&-today": {
					borderColor: token.colorPrimary,
					[`${calendarCls}-date-value`]: { color: token.colorText }
				}
			}
		},
		[`@media only screen and (max-width: ${unit(token.screenXS)}) `]: { [calendarCls]: { [`${calendarCls}-header`]: {
			display: "block",
			[`${calendarCls}-year-select`]: { width: "50%" },
			[`${calendarCls}-month-select`]: { width: `calc(50% - ${unit(token.paddingXS)})` },
			[`${calendarCls}-mode-switch`]: {
				width: "100%",
				marginTop: token.marginXS,
				marginInlineStart: 0,
				"> label": {
					width: "50%",
					textAlign: "center"
				}
			}
		} } }
	};
};
var prepareComponentToken$16 = (token) => ({
	fullBg: token.colorBgContainer,
	fullPanelBg: token.colorBgContainer,
	itemActiveBg: token.controlItemBgActive,
	yearControlWidth: 80,
	monthControlWidth: 70,
	miniContentHeight: 256,
	...initPanelComponentToken(token)
});
var style_default$18 = genStyleHooks("Calendar", (token) => {
	const calendarCls = `${token.componentCls}-calendar`;
	return genCalendarStyles(merge$1(token, initPickerPanelToken(token), {
		calendarCls,
		pickerCellInnerCls: `${token.componentCls}-cell-inner`,
		dateValueHeight: token.controlHeightSM,
		weekHeight: token.calc(token.controlHeightSM).mul(.75).equal(),
		dateContentHeight: token.calc(token.calc(token.fontHeightSM).add(token.marginXS)).mul(3).add(token.calc(token.lineWidth).mul(2)).equal()
	}));
}, prepareComponentToken$16);
//#endregion
//#region node_modules/antd/es/calendar/generateCalendar.js
var isSameYear = (date1, date2, config) => {
	const { getYear } = config;
	return date1 && date2 && getYear(date1) === getYear(date2);
};
var isSameMonth = (date1, date2, config) => {
	const { getMonth } = config;
	return isSameYear(date1, date2, config) && getMonth(date1) === getMonth(date2);
};
var isSameDate = (date1, date2, config) => {
	const { getDate } = config;
	return isSameMonth(date1, date2, config) && getDate(date1) === getDate(date2);
};
var generateCalendar = (generateConfig) => {
	const Calendar = (props) => {
		const { prefixCls: customizePrefixCls, className, rootClassName, style, dateFullCellRender, dateCellRender, monthFullCellRender, monthCellRender, cellRender, fullCellRender, headerRender, value, defaultValue, disabledDate, mode, validRange, fullscreen = true, showWeek, onChange, onPanelChange, onSelect, styles, classNames } = props;
		const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("calendar");
		const mergedProps = {
			...props,
			mode,
			fullscreen,
			showWeek
		};
		const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
		const [rootCls, headerCls, panelClassNames, rootStyle, headerStyle, panelStyles] = import_react.useMemo(() => {
			const { root: nextRootClassName, header: nextHeaderClassName, ...nextPanelClassNames } = mergedClassNames;
			const { root: nextRootStyle, header: nextHeaderStyle, ...nextPanelStyles } = mergedStyles;
			return [
				nextRootClassName,
				nextHeaderClassName,
				nextPanelClassNames,
				nextRootStyle,
				nextHeaderStyle,
				nextPanelStyles
			];
		}, [mergedClassNames, mergedStyles]);
		const prefixCls = getPrefixCls("picker", customizePrefixCls);
		const calendarPrefixCls = `${prefixCls}-calendar`;
		const [hashId, cssVarCls] = style_default$18(prefixCls, calendarPrefixCls);
		const today = generateConfig.getNow();
		const [mergedValue, setMergedValue] = useControlledState(() => defaultValue || generateConfig.getNow(), value);
		const [mergedMode, setMergedMode] = useControlledState("month", mode);
		const panelMode = import_react.useMemo(() => mergedMode === "year" ? "month" : "date", [mergedMode]);
		const mergedDisabledDate = import_react.useCallback((date) => {
			return (validRange ? generateConfig.isAfter(validRange[0], date) || generateConfig.isAfter(date, validRange[1]) : false) || !!disabledDate?.(date);
		}, [disabledDate, validRange]);
		const triggerPanelChange = (date, newMode) => {
			onPanelChange?.(date, newMode);
		};
		const triggerChange = (date) => {
			setMergedValue(date);
			if (!isSameDate(date, mergedValue, generateConfig)) {
				if (panelMode === "date" && !isSameMonth(date, mergedValue, generateConfig) || panelMode === "month" && !isSameYear(date, mergedValue, generateConfig)) triggerPanelChange(date, mergedMode);
				onChange?.(date);
			}
		};
		const triggerModeChange = (newMode) => {
			setMergedMode(newMode);
			triggerPanelChange(mergedValue, newMode);
		};
		const onInternalSelect = (date, source) => {
			triggerChange(date);
			onSelect?.(date, { source });
		};
		const dateRender = import_react.useCallback((date, info) => {
			if (fullCellRender) return fullCellRender(date, info);
			if (dateFullCellRender) return dateFullCellRender(date);
			return /* @__PURE__ */ import_react.createElement("div", { className: clsx(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, { [`${calendarPrefixCls}-date-today`]: isSameDate(today, date, generateConfig) }) }, /* @__PURE__ */ import_react.createElement("div", { className: `${calendarPrefixCls}-date-value` }, String(generateConfig.getDate(date)).padStart(2, "0")), /* @__PURE__ */ import_react.createElement("div", { className: `${calendarPrefixCls}-date-content` }, typeof cellRender === "function" ? cellRender(date, info) : dateCellRender?.(date)));
		}, [
			today,
			prefixCls,
			calendarPrefixCls,
			fullCellRender,
			dateFullCellRender,
			cellRender,
			dateCellRender
		]);
		const monthRender = import_react.useCallback((date, info) => {
			if (fullCellRender) return fullCellRender(date, info);
			if (monthFullCellRender) return monthFullCellRender(date);
			const months = info.locale.shortMonths || generateConfig.locale.getShortMonths(info.locale.locale);
			return /* @__PURE__ */ import_react.createElement("div", { className: clsx(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, { [`${calendarPrefixCls}-date-today`]: isSameMonth(today, date, generateConfig) }) }, /* @__PURE__ */ import_react.createElement("div", { className: `${calendarPrefixCls}-date-value` }, months[generateConfig.getMonth(date)]), /* @__PURE__ */ import_react.createElement("div", { className: `${calendarPrefixCls}-date-content` }, typeof cellRender === "function" ? cellRender(date, info) : monthCellRender?.(date)));
		}, [
			today,
			prefixCls,
			calendarPrefixCls,
			fullCellRender,
			monthFullCellRender,
			cellRender,
			monthCellRender
		]);
		const [contextLocale] = useLocale("Calendar", en_US_default);
		const locale = merge(contextLocale, props.locale || {});
		const mergedCellRender = (current, info) => {
			if (info.type === "date") return dateRender(current, info);
			if (info.type === "month") return monthRender(current, {
				...info,
				locale: locale?.lang
			});
		};
		return /* @__PURE__ */ import_react.createElement("div", {
			className: clsx(calendarPrefixCls, {
				[`${calendarPrefixCls}-full`]: fullscreen,
				[`${calendarPrefixCls}-mini`]: !fullscreen,
				[`${calendarPrefixCls}-rtl`]: direction === "rtl"
			}, contextClassName, className, rootClassName, rootCls, hashId, cssVarCls),
			style: {
				...rootStyle,
				...contextStyle,
				...style
			}
		}, headerRender ? headerRender({
			value: mergedValue,
			type: mergedMode,
			onChange: (nextDate) => {
				onInternalSelect(nextDate, "customize");
			},
			onTypeChange: triggerModeChange
		}) : /* @__PURE__ */ import_react.createElement(CalendarHeader, {
			className: headerCls,
			style: headerStyle,
			prefixCls: calendarPrefixCls,
			value: mergedValue,
			generateConfig,
			mode: mergedMode,
			fullscreen,
			locale: locale?.lang,
			validRange,
			onChange: onInternalSelect,
			onModeChange: triggerModeChange
		}), /* @__PURE__ */ import_react.createElement(RefPanelPicker, {
			classNames: panelClassNames,
			styles: panelStyles,
			value: mergedValue,
			prefixCls,
			locale: locale?.lang,
			generateConfig,
			cellRender: mergedCellRender,
			onSelect: (nextDate) => {
				onInternalSelect(nextDate, panelMode);
			},
			mode: panelMode,
			picker: panelMode,
			disabledDate: mergedDisabledDate,
			hideHeader: true,
			showWeek
		}));
	};
	return Calendar;
};
//#endregion
//#region node_modules/antd/es/calendar/index.js
var Calendar = generateCalendar(generateConfig);
Calendar.generateCalendar = generateCalendar;
//#endregion
//#region node_modules/antd/es/tabs/hooks/useAnimateConfig.js
var motion = {
	motionAppear: false,
	motionEnter: true,
	motionLeave: true
};
function useAnimateConfig(prefixCls, animated = {
	inkBar: true,
	tabPane: false
}) {
	let mergedAnimated;
	if (animated === false) mergedAnimated = {
		inkBar: false,
		tabPane: false
	};
	else if (animated === true) mergedAnimated = {
		inkBar: true,
		tabPane: true
	};
	else mergedAnimated = {
		inkBar: true,
		...typeof animated === "object" ? animated : {}
	};
	if (mergedAnimated.tabPane) mergedAnimated.tabPaneMotion = {
		...motion,
		motionName: getTransitionName(prefixCls, "switch")
	};
	return mergedAnimated;
}
//#endregion
//#region node_modules/antd/es/tabs/hooks/useLegacyItems.js
function filter(items) {
	return items.filter((item) => item);
}
function useLegacyItems(items, children) {
	if (items) return items.map((item) => ({
		...item,
		destroyOnHidden: item.destroyOnHidden ?? item.destroyInactiveTabPane
	}));
	return filter(toArray$1(children).map((node) => {
		if (/* @__PURE__ */ import_react.isValidElement(node)) {
			const { key, props } = node;
			const { tab, ...restProps } = props || {};
			return {
				key: String(key),
				...restProps,
				label: tab
			};
		}
		return null;
	}));
}
//#endregion
//#region node_modules/antd/es/tabs/style/motion.js
var genMotionStyle$2 = (token) => {
	const { componentCls, motionDurationSlow } = token;
	return [{ [componentCls]: { [`${componentCls}-switch`]: {
		"&-appear, &-enter": {
			transition: "none",
			"&-start": { opacity: 0 },
			"&-active": {
				opacity: 1,
				transition: `opacity ${motionDurationSlow}`
			}
		},
		"&-leave": {
			position: "absolute",
			transition: "none",
			inset: 0,
			"&-start": { opacity: 1 },
			"&-active": {
				opacity: 0,
				transition: `opacity ${motionDurationSlow}`
			}
		}
	} } }, [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down")]];
};
//#endregion
//#region node_modules/antd/es/tabs/style/index.js
var genCardStyle$1 = (token) => {
	const { componentCls, tabsCardPadding, cardBg, cardGutter, colorBorderSecondary, itemSelectedColor } = token;
	return { [`${componentCls}-card`]: {
		[`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
			[`${componentCls}-tab`]: {
				margin: 0,
				padding: tabsCardPadding,
				background: cardBg,
				border: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
				transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`
			},
			[`${componentCls}-tab-active`]: {
				color: itemSelectedColor,
				background: token.colorBgContainer
			},
			[`${componentCls}-tab-focus:has(${componentCls}-tab-btn:focus-visible)`]: genFocusOutline(token, -3),
			[`& ${componentCls}-tab${componentCls}-tab-focus ${componentCls}-tab-btn:focus-visible`]: { outline: "none" },
			[`${componentCls}-ink-bar`]: { visibility: "hidden" }
		},
		[`&${componentCls}-top, &${componentCls}-bottom`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: { [`${componentCls}-tab + ${componentCls}-tab`]: { marginLeft: {
			_skip_check_: true,
			value: unit(cardGutter)
		} } } },
		[`&${componentCls}-top`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
			[`${componentCls}-tab`]: { borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0` },
			[`${componentCls}-tab-active`]: { borderBottomColor: token.colorBgContainer }
		} },
		[`&${componentCls}-bottom`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
			[`${componentCls}-tab`]: { borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}` },
			[`${componentCls}-tab-active`]: { borderTopColor: token.colorBgContainer }
		} },
		[`&${componentCls}-left, &${componentCls}-right`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: { [`${componentCls}-tab + ${componentCls}-tab`]: { marginTop: unit(cardGutter) } } },
		[`&${componentCls}-left`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
			[`${componentCls}-tab`]: { borderRadius: {
				_skip_check_: true,
				value: `${unit(token.borderRadiusLG)} 0 0 ${unit(token.borderRadiusLG)}`
			} },
			[`${componentCls}-tab-active`]: { borderRightColor: {
				_skip_check_: true,
				value: token.colorBgContainer
			} }
		} },
		[`&${componentCls}-right`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
			[`${componentCls}-tab`]: { borderRadius: {
				_skip_check_: true,
				value: `0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0`
			} },
			[`${componentCls}-tab-active`]: { borderLeftColor: {
				_skip_check_: true,
				value: token.colorBgContainer
			} }
		} }
	} };
};
var genDropdownStyle = (token) => {
	const { componentCls, itemHoverColor, dropdownEdgeChildVerticalPadding } = token;
	return { [`${componentCls}-dropdown`]: {
		...resetComponent(token),
		position: "absolute",
		top: -9999,
		left: {
			_skip_check_: true,
			value: -9999
		},
		zIndex: token.zIndexPopup,
		display: "block",
		"&-hidden": { display: "none" },
		[`${componentCls}-dropdown-menu`]: {
			maxHeight: token.tabsDropdownHeight,
			margin: 0,
			padding: `${unit(dropdownEdgeChildVerticalPadding)} 0`,
			overflowX: "hidden",
			overflowY: "auto",
			textAlign: {
				_skip_check_: true,
				value: "left"
			},
			listStyleType: "none",
			backgroundColor: token.colorBgContainer,
			backgroundClip: "padding-box",
			borderRadius: token.borderRadiusLG,
			outline: "none",
			boxShadow: token.boxShadowSecondary,
			"&-item": {
				...textEllipsis,
				display: "flex",
				alignItems: "center",
				minWidth: token.tabsDropdownWidth,
				margin: 0,
				padding: `${unit(token.paddingXXS)} ${unit(token.paddingSM)}`,
				color: token.colorText,
				fontWeight: "normal",
				fontSize: token.fontSize,
				lineHeight: token.lineHeight,
				cursor: "pointer",
				transition: `all ${token.motionDurationSlow}`,
				"> span": {
					flex: 1,
					whiteSpace: "nowrap"
				},
				"&-remove": {
					flex: "none",
					marginLeft: {
						_skip_check_: true,
						value: token.marginSM
					},
					color: token.colorIcon,
					fontSize: token.fontSizeSM,
					background: "transparent",
					border: 0,
					cursor: "pointer",
					"&:hover": { color: itemHoverColor }
				},
				"&:hover": { background: token.controlItemBgHover },
				"&-disabled": { "&, &:hover": {
					color: token.colorTextDisabled,
					background: "transparent",
					cursor: "not-allowed"
				} }
			}
		}
	} };
};
var genPositionStyle = (token) => {
	const { componentCls, margin, colorBorderSecondary, horizontalMargin, verticalItemPadding, verticalItemMargin, motionDurationSlow, calc } = token;
	return {
		[`${componentCls}-top, ${componentCls}-bottom`]: {
			flexDirection: "column",
			[`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
				margin: horizontalMargin,
				"&::before": {
					position: "absolute",
					right: {
						_skip_check_: true,
						value: 0
					},
					left: {
						_skip_check_: true,
						value: 0
					},
					borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
					content: "''"
				},
				[`${componentCls}-ink-bar`]: {
					height: token.lineWidthBold,
					"&-animated": { transition: [
						"width",
						"left",
						"right"
					].map((prop) => `${prop} ${motionDurationSlow}`).join(", ") }
				},
				[`${componentCls}-nav-wrap`]: {
					"&::before, &::after": {
						top: 0,
						bottom: 0,
						width: token.controlHeight
					},
					"&::before": {
						left: {
							_skip_check_: true,
							value: 0
						},
						boxShadow: token.boxShadowTabsOverflowLeft
					},
					"&::after": {
						right: {
							_skip_check_: true,
							value: 0
						},
						boxShadow: token.boxShadowTabsOverflowRight
					},
					[`&${componentCls}-nav-wrap-ping-left::before`]: { opacity: 1 },
					[`&${componentCls}-nav-wrap-ping-right::after`]: { opacity: 1 }
				}
			}
		},
		[`${componentCls}-top`]: { [`> ${componentCls}-nav,
        > div > ${componentCls}-nav`]: {
			"&::before": { bottom: 0 },
			[`${componentCls}-ink-bar`]: { bottom: 0 }
		} },
		[`${componentCls}-bottom`]: {
			[`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
				order: 1,
				marginTop: margin,
				marginBottom: 0,
				"&::before": { top: 0 },
				[`${componentCls}-ink-bar`]: { top: 0 }
			},
			[`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: { order: 0 }
		},
		[`${componentCls}-left, ${componentCls}-right`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
			flexDirection: "column",
			minWidth: calc(token.controlHeight).mul(1.25).equal(),
			[`${componentCls}-tab`]: {
				padding: verticalItemPadding,
				textAlign: "center"
			},
			[`${componentCls}-tab + ${componentCls}-tab`]: { margin: verticalItemMargin },
			[`${componentCls}-nav-wrap`]: {
				flexDirection: "column",
				"&::before, &::after": {
					right: {
						_skip_check_: true,
						value: 0
					},
					left: {
						_skip_check_: true,
						value: 0
					},
					height: token.controlHeight
				},
				"&::before": {
					top: 0,
					boxShadow: token.boxShadowTabsOverflowTop
				},
				"&::after": {
					bottom: 0,
					boxShadow: token.boxShadowTabsOverflowBottom
				},
				[`&${componentCls}-nav-wrap-ping-top::before`]: { opacity: 1 },
				[`&${componentCls}-nav-wrap-ping-bottom::after`]: { opacity: 1 }
			},
			[`${componentCls}-ink-bar`]: {
				width: token.lineWidthBold,
				"&-animated": { transition: ["height", "top"].map((prop) => `${prop} ${motionDurationSlow}`).join(", ") }
			},
			[`${componentCls}-nav-list, ${componentCls}-nav-operations`]: {
				flex: "1 0 auto",
				flexDirection: "column"
			}
		} },
		[`${componentCls}-left`]: {
			[`> ${componentCls}-nav, > div > ${componentCls}-nav`]: { [`${componentCls}-ink-bar`]: { right: {
				_skip_check_: true,
				value: 0
			} } },
			[`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
				marginLeft: {
					_skip_check_: true,
					value: unit(calc(token.lineWidth).mul(-1).equal())
				},
				borderLeft: {
					_skip_check_: true,
					value: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
				},
				[`> ${componentCls}-content > ${componentCls}-tabpane`]: { paddingLeft: {
					_skip_check_: true,
					value: token.paddingLG
				} }
			}
		},
		[`${componentCls}-right`]: {
			[`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
				order: 1,
				[`${componentCls}-ink-bar`]: { left: {
					_skip_check_: true,
					value: 0
				} }
			},
			[`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
				order: 0,
				marginRight: {
					_skip_check_: true,
					value: calc(token.lineWidth).mul(-1).equal()
				},
				borderRight: {
					_skip_check_: true,
					value: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
				},
				[`> ${componentCls}-content > ${componentCls}-tabpane`]: { paddingRight: {
					_skip_check_: true,
					value: token.paddingLG
				} }
			}
		}
	};
};
var genSizeStyle$1 = (token) => {
	const { componentCls, cardPaddingSM, cardPaddingLG, cardHeightSM, cardHeightLG, horizontalItemPaddingSM, horizontalItemPaddingLG } = token;
	return {
		[componentCls]: {
			"&-small": { [`> ${componentCls}-nav`]: { [`${componentCls}-tab`]: {
				padding: horizontalItemPaddingSM,
				fontSize: token.titleFontSizeSM
			} } },
			"&-large": { [`> ${componentCls}-nav`]: { [`${componentCls}-tab`]: {
				padding: horizontalItemPaddingLG,
				fontSize: token.titleFontSizeLG,
				lineHeight: token.lineHeightLG
			} } }
		},
		[`${componentCls}-card`]: {
			[`&${componentCls}-small`]: {
				[`> ${componentCls}-nav`]: {
					[`${componentCls}-tab`]: { padding: cardPaddingSM },
					[`${componentCls}-nav-add`]: {
						minWidth: cardHeightSM,
						minHeight: cardHeightSM
					}
				},
				[`&${componentCls}-bottom`]: { [`> ${componentCls}-nav ${componentCls}-tab`]: { borderRadius: `0 0 ${unit(token.borderRadius)} ${unit(token.borderRadius)}` } },
				[`&${componentCls}-top`]: { [`> ${componentCls}-nav ${componentCls}-tab`]: { borderRadius: `${unit(token.borderRadius)} ${unit(token.borderRadius)} 0 0` } },
				[`&${componentCls}-right`]: { [`> ${componentCls}-nav ${componentCls}-tab`]: { borderRadius: {
					_skip_check_: true,
					value: `0 ${unit(token.borderRadius)} ${unit(token.borderRadius)} 0`
				} } },
				[`&${componentCls}-left`]: { [`> ${componentCls}-nav ${componentCls}-tab`]: { borderRadius: {
					_skip_check_: true,
					value: `${unit(token.borderRadius)} 0 0 ${unit(token.borderRadius)}`
				} } }
			},
			[`&${componentCls}-large`]: { [`> ${componentCls}-nav`]: {
				[`${componentCls}-tab`]: { padding: cardPaddingLG },
				[`${componentCls}-nav-add`]: {
					minWidth: cardHeightLG,
					minHeight: cardHeightLG
				}
			} }
		}
	};
};
var genTabStyle = (token) => {
	const { componentCls, itemActiveColor, itemHoverColor, iconCls, tabsHorizontalItemMargin, horizontalItemPadding, itemSelectedColor, itemColor } = token;
	const tabCls = `${componentCls}-tab`;
	return {
		[tabCls]: {
			position: "relative",
			WebkitTouchCallout: "none",
			WebkitTapHighlightColor: "transparent",
			display: "inline-flex",
			alignItems: "center",
			padding: horizontalItemPadding,
			fontSize: token.titleFontSize,
			background: "transparent",
			border: 0,
			outline: "none",
			cursor: "pointer",
			color: itemColor,
			"&-btn, &-remove": { "&:focus:not(:focus-visible), &:active": { color: itemActiveColor } },
			"&-btn": {
				outline: "none",
				transition: `all ${token.motionDurationSlow}`,
				[`${tabCls}-icon:not(:last-child)`]: { marginInlineEnd: token.marginSM }
			},
			"&-remove": {
				flex: "none",
				lineHeight: 1,
				marginRight: {
					_skip_check_: true,
					value: token.calc(token.marginXXS).mul(-1).equal()
				},
				marginLeft: {
					_skip_check_: true,
					value: token.marginXS
				},
				color: token.colorIcon,
				fontSize: token.fontSizeSM,
				background: "transparent",
				border: "none",
				outline: "none",
				cursor: "pointer",
				transition: `all ${token.motionDurationSlow}`,
				"&:hover": { color: token.colorTextHeading },
				...genFocusStyle(token)
			},
			"&:hover": { color: itemHoverColor },
			[`&${tabCls}-active ${tabCls}-btn`]: { color: itemSelectedColor },
			[`&${tabCls}-focus ${tabCls}-btn:focus-visible`]: genFocusOutline(token),
			[`&${tabCls}-disabled`]: {
				color: token.colorTextDisabled,
				cursor: "not-allowed"
			},
			[`&${tabCls}-disabled ${tabCls}-btn, &${tabCls}-disabled ${componentCls}-remove`]: { "&:focus, &:active": { color: token.colorTextDisabled } },
			[`& ${tabCls}-remove ${iconCls}`]: {
				margin: 0,
				verticalAlign: "middle"
			},
			[`${iconCls}:not(:last-child)`]: { marginRight: {
				_skip_check_: true,
				value: token.marginSM
			} }
		},
		[`${tabCls} + ${tabCls}`]: { margin: {
			_skip_check_: true,
			value: tabsHorizontalItemMargin
		} }
	};
};
var genRtlStyle$1 = (token) => {
	const { componentCls, tabsHorizontalItemMarginRTL, iconCls, cardGutter, calc } = token;
	return {
		[`${componentCls}-rtl`]: {
			direction: "rtl",
			[`${componentCls}-nav`]: { [`${componentCls}-tab`]: {
				margin: {
					_skip_check_: true,
					value: tabsHorizontalItemMarginRTL
				},
				[`${componentCls}-tab:last-of-type`]: { marginLeft: {
					_skip_check_: true,
					value: 0
				} },
				[iconCls]: {
					marginRight: {
						_skip_check_: true,
						value: 0
					},
					marginLeft: {
						_skip_check_: true,
						value: token.marginSM
					}
				},
				[`${componentCls}-tab-remove`]: {
					marginRight: {
						_skip_check_: true,
						value: token.marginXS
					},
					marginLeft: {
						_skip_check_: true,
						value: calc(token.marginXXS).mul(-1).equal()
					},
					[iconCls]: { margin: 0 }
				}
			} },
			[`&${componentCls}-left`]: {
				[`> ${componentCls}-nav`]: { order: 1 },
				[`> ${componentCls}-content-holder`]: { order: 0 }
			},
			[`&${componentCls}-right`]: {
				[`> ${componentCls}-nav`]: { order: 0 },
				[`> ${componentCls}-content-holder`]: { order: 1 }
			},
			[`&${componentCls}-card${componentCls}-top, &${componentCls}-card${componentCls}-bottom`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: { [`${componentCls}-tab + ${componentCls}-tab`]: {
				marginRight: {
					_skip_check_: true,
					value: cardGutter
				},
				marginLeft: {
					_skip_check_: true,
					value: 0
				}
			} } }
		},
		[`${componentCls}-dropdown-rtl`]: { direction: "rtl" },
		[`${componentCls}-menu-item`]: { [`${componentCls}-dropdown-rtl`]: { textAlign: {
			_skip_check_: true,
			value: "right"
		} } }
	};
};
var genTabsStyle = (token) => {
	const { componentCls, tabsCardPadding, cardHeight, cardGutter, itemHoverColor, itemActiveColor, colorBorderSecondary } = token;
	return {
		[componentCls]: {
			...resetComponent(token),
			display: "flex",
			[`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
				position: "relative",
				display: "flex",
				flex: "none",
				alignItems: "center",
				[`${componentCls}-nav-wrap`]: {
					position: "relative",
					display: "flex",
					flex: "auto",
					alignSelf: "stretch",
					overflow: "hidden",
					whiteSpace: "nowrap",
					transform: "translate(0)",
					"&::before, &::after": {
						position: "absolute",
						zIndex: 1,
						opacity: 0,
						transition: `opacity ${token.motionDurationSlow}`,
						content: "''",
						pointerEvents: "none"
					}
				},
				[`${componentCls}-nav-list`]: {
					position: "relative",
					display: "flex",
					transition: `opacity ${token.motionDurationSlow}`
				},
				[`${componentCls}-nav-operations`]: {
					display: "flex",
					alignSelf: "stretch"
				},
				[`${componentCls}-nav-operations-hidden`]: {
					position: "absolute",
					visibility: "hidden",
					pointerEvents: "none"
				},
				[`${componentCls}-nav-more`]: {
					position: "relative",
					padding: tabsCardPadding,
					background: "transparent",
					border: 0,
					color: token.colorText,
					"&::after": {
						position: "absolute",
						right: {
							_skip_check_: true,
							value: 0
						},
						bottom: 0,
						left: {
							_skip_check_: true,
							value: 0
						},
						height: token.calc(token.controlHeightLG).div(8).equal(),
						transform: "translateY(100%)",
						content: "''"
					}
				},
				[`${componentCls}-nav-add`]: {
					minWidth: cardHeight,
					minHeight: cardHeight,
					marginLeft: {
						_skip_check_: true,
						value: cardGutter
					},
					background: "transparent",
					border: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
					borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
					outline: "none",
					cursor: "pointer",
					color: token.colorText,
					transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
					"&:hover": { color: itemHoverColor },
					"&:active, &:focus:not(:focus-visible)": { color: itemActiveColor },
					...genFocusStyle(token, -3)
				}
			},
			[`${componentCls}-extra-content`]: { flex: "none" },
			[`${componentCls}-ink-bar`]: {
				position: "absolute",
				background: token.inkBarColor,
				pointerEvents: "none"
			},
			...genTabStyle(token),
			[`${componentCls}-content`]: {
				position: "relative",
				width: "100%"
			},
			[`${componentCls}-content-holder`]: {
				flex: "auto",
				minWidth: 0,
				minHeight: 0
			},
			[`${componentCls}-tabpane`]: {
				...genFocusStyle(token),
				"&-hidden": { display: "none" }
			}
		},
		[`${componentCls}-centered`]: { [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: { [`${componentCls}-nav-wrap`]: { [`&:not([class*='${componentCls}-nav-wrap-ping']) > ${componentCls}-nav-list`]: { margin: "auto" } } } }
	};
};
var prepareComponentToken$15 = (token) => {
	const { cardHeight, cardHeightSM, cardHeightLG, controlHeight, controlHeightLG } = token;
	const mergedCardHeight = cardHeight || controlHeightLG;
	const mergedCardHeightSM = cardHeightSM || controlHeight;
	const mergedCardHeightLG = cardHeightLG || controlHeightLG + 8;
	return {
		zIndexPopup: token.zIndexPopupBase + 50,
		cardBg: token.colorFillAlter,
		cardHeight: mergedCardHeight,
		cardHeightSM: mergedCardHeightSM,
		cardHeightLG: mergedCardHeightLG,
		cardPadding: `${(mergedCardHeight - token.fontHeight) / 2 - token.lineWidth}px ${token.padding}px`,
		cardPaddingSM: `${(mergedCardHeightSM - token.fontHeight) / 2 - token.lineWidth}px ${token.paddingXS}px`,
		cardPaddingLG: `${(mergedCardHeightLG - token.fontHeightLG) / 2 - token.lineWidth}px ${token.padding}px`,
		titleFontSize: token.fontSize,
		titleFontSizeLG: token.fontSizeLG,
		titleFontSizeSM: token.fontSize,
		inkBarColor: token.colorPrimary,
		horizontalMargin: `0 0 ${token.margin}px 0`,
		horizontalItemGutter: 32,
		horizontalItemMargin: ``,
		horizontalItemMarginRTL: ``,
		horizontalItemPadding: `${token.paddingSM}px 0`,
		horizontalItemPaddingSM: `${token.paddingXS}px 0`,
		horizontalItemPaddingLG: `${token.padding}px 0`,
		verticalItemPadding: `${token.paddingXS}px ${token.paddingLG}px`,
		verticalItemMargin: `${token.margin}px 0 0 0`,
		itemColor: token.colorText,
		itemSelectedColor: token.colorPrimary,
		itemHoverColor: token.colorPrimaryHover,
		itemActiveColor: token.colorPrimaryActive,
		cardGutter: token.marginXXS / 2
	};
};
var style_default$17 = genStyleHooks("Tabs", (token) => {
	const tabsToken = merge$1(token, {
		tabsCardPadding: token.cardPadding,
		dropdownEdgeChildVerticalPadding: token.paddingXXS,
		tabsDropdownHeight: 200,
		tabsDropdownWidth: 120,
		tabsHorizontalItemMargin: `0 0 0 ${unit(token.horizontalItemGutter)}`,
		tabsHorizontalItemMarginRTL: `0 0 0 ${unit(token.horizontalItemGutter)}`
	});
	return [
		genSizeStyle$1(tabsToken),
		genRtlStyle$1(tabsToken),
		genPositionStyle(tabsToken),
		genDropdownStyle(tabsToken),
		genCardStyle$1(tabsToken),
		genTabsStyle(tabsToken),
		genMotionStyle$2(tabsToken)
	];
}, prepareComponentToken$15);
//#endregion
//#region node_modules/antd/es/tabs/TabPane.js
var TabPane = () => null;
//#endregion
//#region node_modules/antd/es/tabs/index.js
var Tabs = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { type, className, rootClassName, size: customSize, onEdit, hideAdd, centered, addIcon, removeIcon, moreIcon, more, popupClassName, children, items, animated, style, indicatorSize, indicator, classNames, styles, destroyInactiveTabPane, destroyOnHidden, tabPlacement, tabPosition, ...restProps } = props;
	const { prefixCls: customizePrefixCls } = restProps;
	const { getPrefixCls, direction, getPopupContainer, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("tabs");
	const { tabs } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("tabs", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$17(prefixCls, rootCls);
	const tabsRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({ nativeElement: tabsRef.current }));
	let editable;
	if (type === "editable-card") editable = {
		onEdit: (editType, { key, event }) => {
			onEdit?.(editType === "add" ? event : key, editType);
		},
		removeIcon: removeIcon ?? tabs?.removeIcon ?? /* @__PURE__ */ import_react.createElement(RefIcon, null),
		addIcon: (addIcon ?? tabs?.addIcon) || /* @__PURE__ */ import_react.createElement(RefIcon$9, null),
		showAdd: hideAdd !== true
	};
	const rootPrefixCls = getPrefixCls();
	const size = useSize(customSize);
	const mergedItems = useLegacyItems(items, children);
	const mergedAnimated = useAnimateConfig(prefixCls, animated);
	const mergedIndicator = {
		align: indicator?.align ?? tabs?.indicator?.align,
		size: indicator?.size ?? indicatorSize ?? tabs?.indicator?.size ?? tabs?.indicatorSize
	};
	const mergedPlacement = import_react.useMemo(() => {
		const placement = tabPlacement ?? tabPosition ?? void 0;
		const isRTL = direction === "rtl";
		switch (placement) {
			case "start": return isRTL ? "right" : "left";
			case "end": return isRTL ? "left" : "right";
			default: return placement;
		}
	}, [
		tabPlacement,
		tabPosition,
		direction
	]);
	const mergedProps = {
		...props,
		size,
		tabPlacement: mergedPlacement,
		items: mergedItems
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps }, { popup: { _default: "root" } });
	return /* @__PURE__ */ import_react.createElement(es_default$4, {
		ref: tabsRef,
		direction,
		getPopupContainer,
		...restProps,
		items: mergedItems,
		className: clsx({
			[`${prefixCls}-large`]: size === "large",
			[`${prefixCls}-small`]: size === "small",
			[`${prefixCls}-card`]: ["card", "editable-card"].includes(type),
			[`${prefixCls}-editable-card`]: type === "editable-card",
			[`${prefixCls}-centered`]: centered
		}, contextClassName, className, rootClassName, mergedClassNames.root, hashId, cssVarCls, rootCls),
		classNames: {
			...mergedClassNames,
			popup: clsx(popupClassName, hashId, cssVarCls, rootCls, mergedClassNames.popup?.root)
		},
		styles: mergedStyles,
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		editable,
		more: {
			icon: tabs?.more?.icon ?? tabs?.moreIcon ?? moreIcon ?? /* @__PURE__ */ import_react.createElement(RefIcon$10, null),
			transitionName: `${rootPrefixCls}-slide-up`,
			...more
		},
		prefixCls,
		animated: mergedAnimated,
		indicator: mergedIndicator,
		destroyOnHidden: destroyOnHidden ?? destroyInactiveTabPane,
		tabPosition: mergedPlacement
	});
});
Tabs.TabPane = TabPane;
//#endregion
//#region node_modules/antd/es/card/CardGrid.js
var CardGrid = ({ prefixCls, className, hoverable = true, ...rest }) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefix = getPrefixCls("card", prefixCls);
	const classString = clsx(`${prefix}-grid`, className, { [`${prefix}-grid-hoverable`]: hoverable });
	return /* @__PURE__ */ import_react.createElement("div", {
		...rest,
		className: classString
	});
};
//#endregion
//#region node_modules/antd/es/card/style/index.js
var genCardHeadStyle = (token) => {
	const { antCls, componentCls, headerHeight, headerPadding, tabsMarginBottom } = token;
	return {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		minHeight: headerHeight,
		marginBottom: -1,
		padding: `0 ${unit(headerPadding)}`,
		color: token.colorTextHeading,
		fontWeight: token.fontWeightStrong,
		fontSize: token.headerFontSize,
		background: token.headerBg,
		borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
		borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
		...clearFix(),
		"&-wrapper": {
			width: "100%",
			display: "flex",
			alignItems: "center"
		},
		"&-title": {
			display: "inline-block",
			flex: 1,
			...textEllipsis,
			[`
          > ${componentCls}-typography,
          > ${componentCls}-typography-edit-content
        `]: {
				insetInlineStart: 0,
				marginTop: 0,
				marginBottom: 0
			}
		},
		[`${antCls}-tabs-top`]: {
			clear: "both",
			marginBottom: tabsMarginBottom,
			color: token.colorText,
			fontWeight: "normal",
			fontSize: token.fontSize,
			"&-bar": { borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}` }
		}
	};
};
var genCardGridStyle = (token) => {
	const { cardPaddingBase, colorBorderSecondary, cardShadow, lineWidth } = token;
	return {
		width: "33.33%",
		padding: cardPaddingBase,
		border: 0,
		borderRadius: 0,
		boxShadow: `
      ${unit(lineWidth)} 0 0 0 ${colorBorderSecondary},
      0 ${unit(lineWidth)} 0 0 ${colorBorderSecondary},
      ${unit(lineWidth)} ${unit(lineWidth)} 0 0 ${colorBorderSecondary},
      ${unit(lineWidth)} 0 0 0 ${colorBorderSecondary} inset,
      0 ${unit(lineWidth)} 0 0 ${colorBorderSecondary} inset;
    `,
		transition: `all ${token.motionDurationMid}`,
		"&-hoverable:hover": {
			position: "relative",
			zIndex: 1,
			boxShadow: cardShadow
		}
	};
};
var genCardActionsStyle = (token) => {
	const { componentCls, iconCls, actionsLiMargin, cardActionsIconSize, colorBorderSecondary, actionsBg } = token;
	return {
		margin: 0,
		padding: 0,
		listStyle: "none",
		background: actionsBg,
		borderTop: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
		display: "flex",
		borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`,
		...clearFix(),
		"& > li": {
			margin: actionsLiMargin,
			color: token.colorTextDescription,
			textAlign: "center",
			"> span": {
				position: "relative",
				display: "block",
				minWidth: token.calc(token.cardActionsIconSize).mul(2).equal(),
				fontSize: token.fontSize,
				lineHeight: token.lineHeight,
				cursor: "pointer",
				"&:hover": {
					color: token.colorPrimary,
					transition: `color ${token.motionDurationMid}`
				},
				[`a:not(${componentCls}-btn), > ${iconCls}`]: {
					display: "inline-block",
					width: "100%",
					color: token.colorIcon,
					lineHeight: unit(token.fontHeight),
					transition: `color ${token.motionDurationMid}`,
					"&:hover": { color: token.colorPrimary }
				},
				[`> ${iconCls}`]: {
					fontSize: cardActionsIconSize,
					lineHeight: unit(token.calc(cardActionsIconSize).mul(token.lineHeight).equal())
				}
			},
			"&:not(:last-child)": { borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}` }
		}
	};
};
var genCardMetaStyle = (token) => ({
	margin: `${unit(token.calc(token.marginXXS).mul(-1).equal())} 0`,
	display: "flex",
	...clearFix(),
	"&-avatar": { paddingInlineEnd: token.padding },
	"&-section": {
		overflow: "hidden",
		flex: 1,
		"> div:not(:last-child)": { marginBottom: token.marginXS }
	},
	"&-title": {
		color: token.colorTextHeading,
		fontWeight: token.fontWeightStrong,
		fontSize: token.fontSizeLG,
		...textEllipsis
	},
	"&-description": { color: token.colorTextDescription }
});
var genCardTypeInnerStyle = (token) => {
	const { componentCls, colorFillAlter, headerPadding, bodyPadding } = token;
	return {
		[`${componentCls}-head`]: {
			padding: `0 ${unit(headerPadding)}`,
			background: colorFillAlter,
			"&-title": { fontSize: token.fontSize }
		},
		[`${componentCls}-body`]: { padding: `${unit(token.padding)} ${unit(bodyPadding)}` }
	};
};
var genCardLoadingStyle = (token) => {
	const { componentCls } = token;
	return {
		overflow: "hidden",
		[`${componentCls}-body`]: { userSelect: "none" }
	};
};
var genCardStyle = (token) => {
	const { componentCls, cardShadow, cardHeadPadding, colorBorderSecondary, boxShadowTertiary, bodyPadding, extraColor, motionDurationMid } = token;
	return {
		[componentCls]: {
			...resetComponent(token),
			position: "relative",
			background: token.colorBgContainer,
			borderRadius: token.borderRadiusLG,
			[`&:not(${componentCls}-bordered)`]: { boxShadow: boxShadowTertiary },
			[`${componentCls}-head`]: genCardHeadStyle(token),
			[`${componentCls}-extra`]: {
				marginInlineStart: "auto",
				color: extraColor,
				fontWeight: "normal",
				fontSize: token.fontSize
			},
			[`${componentCls}-body`]: {
				padding: bodyPadding,
				borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`,
				"&:first-child": {
					borderStartStartRadius: token.borderRadiusLG,
					borderStartEndRadius: token.borderRadiusLG
				},
				"&:not(:last-child)": {
					borderEndStartRadius: 0,
					borderEndEndRadius: 0
				}
			},
			[`${componentCls}-grid`]: genCardGridStyle(token),
			[`${componentCls}-cover`]: { "> *": {
				display: "block",
				width: "100%",
				borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`
			} },
			[`${componentCls}-actions`]: genCardActionsStyle(token),
			[`${componentCls}-meta`]: genCardMetaStyle(token)
		},
		[`${componentCls}-bordered`]: {
			border: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
			[`${componentCls}-cover`]: {
				marginTop: -1,
				marginInlineStart: -1,
				marginInlineEnd: -1
			}
		},
		[`${componentCls}-hoverable`]: {
			cursor: "pointer",
			transition: [`box-shadow`, `border-color`].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
			"&:hover": {
				borderColor: "transparent",
				boxShadow: cardShadow
			}
		},
		[`${componentCls}-contain-grid`]: {
			borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0 `,
			[`&:not(:has(> ${componentCls}-head))`]: { borderRadius: 0 },
			[`${componentCls}-body`]: {
				display: "flex",
				flexWrap: "wrap"
			},
			[`&:not(${componentCls}-loading) ${componentCls}-body`]: {
				marginBlockStart: token.calc(token.lineWidth).mul(-1).equal(),
				marginInlineStart: token.calc(token.lineWidth).mul(-1).equal(),
				padding: 0
			}
		},
		[`${componentCls}-contain-tabs`]: { [`> div${componentCls}-head`]: {
			minHeight: 0,
			[`${componentCls}-head-title, ${componentCls}-extra`]: { paddingTop: cardHeadPadding }
		} },
		[`${componentCls}-type-inner`]: genCardTypeInnerStyle(token),
		[`${componentCls}-loading`]: genCardLoadingStyle(token),
		[`${componentCls}-rtl`]: { direction: "rtl" }
	};
};
var genCardSizeStyle = (token) => {
	const { componentCls, bodyPaddingSM, headerPaddingSM, headerHeightSM, headerFontSizeSM } = token;
	return {
		[`${componentCls}-small`]: {
			[`> ${componentCls}-head`]: {
				minHeight: headerHeightSM,
				padding: `0 ${unit(headerPaddingSM)}`,
				fontSize: headerFontSizeSM,
				[`> ${componentCls}-head-wrapper`]: { [`> ${componentCls}-extra`]: { fontSize: token.fontSize } }
			},
			[`> ${componentCls}-body`]: { padding: bodyPaddingSM }
		},
		[`${componentCls}-small${componentCls}-contain-tabs`]: { [`> ${componentCls}-head`]: { [`${componentCls}-head-title, ${componentCls}-extra`]: {
			paddingTop: 0,
			display: "flex",
			alignItems: "center"
		} } }
	};
};
var prepareComponentToken$14 = (token) => ({
	headerBg: "transparent",
	headerFontSize: token.fontSizeLG,
	headerFontSizeSM: token.fontSize,
	headerHeight: token.fontSizeLG * token.lineHeightLG + token.padding * 2,
	headerHeightSM: token.fontSize * token.lineHeight + token.paddingXS * 2,
	actionsBg: token.colorBgContainer,
	actionsLiMargin: `${token.paddingSM}px 0`,
	tabsMarginBottom: -token.padding - token.lineWidth,
	extraColor: token.colorText,
	bodyPaddingSM: 12,
	headerPaddingSM: 12,
	bodyPadding: token.bodyPadding ?? token.paddingLG,
	headerPadding: token.headerPadding ?? token.paddingLG
});
var style_default$16 = genStyleHooks("Card", (token) => {
	const cardToken = merge$1(token, {
		cardShadow: token.boxShadowCard,
		cardHeadPadding: token.padding,
		cardPaddingBase: token.paddingLG,
		cardActionsIconSize: token.fontSize
	});
	return [genCardStyle(cardToken), genCardSizeStyle(cardToken)];
}, prepareComponentToken$14);
//#endregion
//#region node_modules/antd/es/card/Card.js
var ActionNode = (props) => {
	const { actionClasses, actions = [], actionStyle } = props;
	return /* @__PURE__ */ import_react.createElement("ul", {
		className: actionClasses,
		style: actionStyle
	}, actions.map((action, index) => {
		const key = `action-${index}`;
		return /* @__PURE__ */ import_react.createElement("li", {
			style: { width: `${100 / actions.length}%` },
			key
		}, /* @__PURE__ */ import_react.createElement("span", null, action));
	}));
};
var Card$1 = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, style, extra, headStyle = {}, bodyStyle = {}, title, loading, bordered, variant: customVariant, size: customizeSize, type, cover, actions, tabList, children, activeTabKey, defaultActiveTabKey, tabBarExtraContent, hoverable, tabProps = {}, classNames, styles, ...rest } = props;
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("card");
	const [variant] = useVariant("card", customVariant, bordered);
	const mergedSize = useSize(customizeSize);
	const mergedProps = {
		...props,
		size: mergedSize,
		variant
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const onTabChange = (key) => {
		props.onTabChange?.(key);
	};
	const isContainGrid = import_react.useMemo(() => {
		return toArray$1(children).some((child) => /* @__PURE__ */ import_react.isValidElement(child) && child.type === CardGrid);
	}, [children]);
	const prefixCls = getPrefixCls("card", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$16(prefixCls);
	const loadingBlock = /* @__PURE__ */ import_react.createElement(skeleton_default, {
		loading: true,
		active: true,
		paragraph: { rows: 4 },
		title: false
	}, children);
	const hasActiveTabKey = activeTabKey !== void 0;
	const extraProps = {
		...tabProps,
		[hasActiveTabKey ? "activeKey" : "defaultActiveKey"]: hasActiveTabKey ? activeTabKey : defaultActiveTabKey,
		tabBarExtraContent
	};
	let head;
	const tabSize = mergedSize !== "small" ? "large" : mergedSize;
	const tabs = tabList ? /* @__PURE__ */ import_react.createElement(Tabs, {
		size: tabSize,
		...extraProps,
		className: `${prefixCls}-head-tabs`,
		onChange: onTabChange,
		items: tabList.map(({ tab, ...item }) => ({
			label: tab,
			...item
		}))
	}) : null;
	if (title || extra || tabs) {
		const headClasses = clsx(`${prefixCls}-head`, mergedClassNames.header);
		const titleClasses = clsx(`${prefixCls}-head-title`, mergedClassNames.title);
		const extraClasses = clsx(`${prefixCls}-extra`, mergedClassNames.extra);
		const mergedHeadStyle = {
			...headStyle,
			...mergedStyles.header
		};
		head = /* @__PURE__ */ import_react.createElement("div", {
			className: headClasses,
			style: mergedHeadStyle
		}, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-head-wrapper` }, title && /* @__PURE__ */ import_react.createElement("div", {
			className: titleClasses,
			style: mergedStyles.title
		}, title), extra && /* @__PURE__ */ import_react.createElement("div", {
			className: extraClasses,
			style: mergedStyles.extra
		}, extra)), tabs);
	}
	const coverClasses = clsx(`${prefixCls}-cover`, mergedClassNames.cover);
	const coverDom = cover ? /* @__PURE__ */ import_react.createElement("div", {
		className: coverClasses,
		style: mergedStyles.cover
	}, cover) : null;
	const bodyClasses = clsx(`${prefixCls}-body`, mergedClassNames.body);
	const mergedBodyStyle = {
		...bodyStyle,
		...mergedStyles.body
	};
	const body = /* @__PURE__ */ import_react.createElement("div", {
		className: bodyClasses,
		style: mergedBodyStyle
	}, loading ? loadingBlock : children);
	const actionClasses = clsx(`${prefixCls}-actions`, mergedClassNames.actions);
	const actionDom = actions?.length ? /* @__PURE__ */ import_react.createElement(ActionNode, {
		actionClasses,
		actionStyle: mergedStyles.actions,
		actions
	}) : null;
	const divProps = omit(rest, ["onTabChange"]);
	const classString = clsx(prefixCls, contextClassName, {
		[`${prefixCls}-loading`]: loading,
		[`${prefixCls}-bordered`]: variant !== "borderless",
		[`${prefixCls}-hoverable`]: hoverable,
		[`${prefixCls}-contain-grid`]: isContainGrid,
		[`${prefixCls}-contain-tabs`]: tabList?.length,
		[`${prefixCls}-small`]: mergedSize === "small",
		[`${prefixCls}-type-${type}`]: !!type,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, rootClassName, hashId, cssVarCls, mergedClassNames.root);
	const mergedStyle = {
		...mergedStyles.root,
		...contextStyle,
		...style
	};
	return /* @__PURE__ */ import_react.createElement("div", {
		ref,
		...divProps,
		className: classString,
		style: mergedStyle
	}, head, coverDom, body, actionDom);
});
//#endregion
//#region node_modules/antd/es/card/CardMeta.js
var CardMeta = (props) => {
	const { prefixCls: customizePrefixCls, className, avatar, title, description, style, classNames: cardMetaClassNames, styles, ...restProps } = props;
	const { getPrefixCls, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("cardMeta");
	const metaPrefixCls = `${getPrefixCls("card", customizePrefixCls)}-meta`;
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, cardMetaClassNames], [contextStyles, styles], { props });
	const rootClassNames = clsx(metaPrefixCls, className, contextClassName, mergedClassNames.root);
	const rootStyles = {
		...contextStyle,
		...mergedStyles.root,
		...style
	};
	const avatarClassNames = clsx(`${metaPrefixCls}-avatar`, mergedClassNames.avatar);
	const titleClassNames = clsx(`${metaPrefixCls}-title`, mergedClassNames.title);
	const descriptionClassNames = clsx(`${metaPrefixCls}-description`, mergedClassNames.description);
	const sectionClassNames = clsx(`${metaPrefixCls}-section`, mergedClassNames.section);
	const avatarDom = avatar ? /* @__PURE__ */ import_react.createElement("div", {
		className: avatarClassNames,
		style: mergedStyles.avatar
	}, avatar) : null;
	const titleDom = title ? /* @__PURE__ */ import_react.createElement("div", {
		className: titleClassNames,
		style: mergedStyles.title
	}, title) : null;
	const descriptionDom = description ? /* @__PURE__ */ import_react.createElement("div", {
		className: descriptionClassNames,
		style: mergedStyles.description
	}, description) : null;
	const MetaDetail = titleDom || descriptionDom ? /* @__PURE__ */ import_react.createElement("div", {
		className: sectionClassNames,
		style: mergedStyles.section
	}, titleDom, descriptionDom) : null;
	return /* @__PURE__ */ import_react.createElement("div", {
		...restProps,
		className: rootClassNames,
		style: rootStyles
	}, avatarDom, MetaDetail);
};
//#endregion
//#region node_modules/antd/es/card/index.js
var Card = Card$1;
Card.Grid = CardGrid;
Card.Meta = CardMeta;
//#endregion
//#region node_modules/antd/es/checkbox/style/index.js
var genCheckboxStyle = (token) => {
	const { checkboxCls, checkboxSize, lineWidth } = token;
	const wrapperCls = `${checkboxCls}-wrapper`;
	return [
		{
			[`${checkboxCls}-group`]: {
				...resetComponent(token),
				display: "inline-flex",
				flexWrap: "wrap",
				columnGap: token.marginXS,
				[`> ${token.antCls}-row`]: { flex: 1 }
			},
			[wrapperCls]: {
				...resetComponent(token),
				display: "inline-flex",
				alignItems: "baseline",
				cursor: "pointer",
				"&:after": {
					display: "inline-block",
					width: 0,
					overflow: "hidden",
					content: "'\\a0'"
				},
				[`& + ${wrapperCls}`]: { marginInlineStart: 0 },
				[`&${wrapperCls}-in-form-item`]: { "input[type=\"checkbox\"]": {
					width: 14,
					height: 14
				} }
			},
			[checkboxCls]: {
				...resetComponent(token),
				position: "relative",
				whiteSpace: "nowrap",
				lineHeight: 1,
				cursor: "pointer",
				alignSelf: "center",
				boxSizing: "border-box",
				display: "block",
				width: checkboxSize,
				height: checkboxSize,
				direction: "ltr",
				backgroundColor: token.colorBgContainer,
				border: `${unit(lineWidth)} ${token.lineType} ${token.colorBorder}`,
				borderRadius: token.borderRadiusSM,
				borderCollapse: "separate",
				transition: `all ${token.motionDurationSlow}`,
				flex: "none",
				...genNoMotionStyle(),
				"&:after": {
					boxSizing: "border-box",
					position: "absolute",
					top: `calc(${checkboxSize} / 2 - ${lineWidth})`,
					insetInlineStart: `calc(${checkboxSize} / 4 - ${lineWidth})`,
					display: "table",
					width: token.calc(checkboxSize).div(14).mul(5).equal(),
					height: token.calc(checkboxSize).div(14).mul(8).equal(),
					border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
					borderTop: 0,
					borderInlineStart: 0,
					transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
					opacity: 0,
					content: "\"\"",
					transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`,
					...genNoMotionStyle()
				},
				[`${checkboxCls}-input`]: {
					position: "absolute",
					inset: `calc(-1 * (${lineWidth}))`,
					zIndex: 1,
					cursor: "pointer",
					opacity: 0,
					margin: 0
				},
				[`&:has(${checkboxCls}-input:focus-visible)`]: genFocusOutline(token),
				"& + span": {
					paddingInlineStart: token.paddingXS,
					paddingInlineEnd: token.paddingXS
				}
			}
		},
		{
			[`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: { [`&:hover ${checkboxCls}`]: { borderColor: token.colorPrimary } },
			[`${wrapperCls}:not(${wrapperCls}-disabled)`]: { [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled)`]: {
				backgroundColor: token.colorPrimaryHover,
				borderColor: "transparent"
			} }
		},
		{ [`${checkboxCls}-checked`]: {
			backgroundColor: token.colorPrimary,
			borderColor: token.colorPrimary,
			"&:after": {
				opacity: 1,
				transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
				transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`,
				...genNoMotionStyle()
			},
			[`&:not(${checkboxCls}-disabled):hover`]: {
				backgroundColor: token.colorPrimaryHover,
				borderColor: "transparent"
			}
		} },
		{ [checkboxCls]: { "&-indeterminate": {
			backgroundColor: token.colorBgContainer,
			borderColor: token.colorBorder,
			"&:after": {
				top: "50%",
				insetInlineStart: "50%",
				width: token.calc(token.fontSizeLG).div(2).equal(),
				height: token.calc(token.fontSizeLG).div(2).equal(),
				backgroundColor: token.colorPrimary,
				border: 0,
				transform: "translate(-50%, -50%) scale(1)",
				opacity: 1,
				content: "\"\""
			},
			"&:hover": {
				backgroundColor: token.colorBgContainer,
				borderColor: token.colorPrimary
			}
		} } },
		{
			[`${wrapperCls}-disabled`]: { cursor: "not-allowed" },
			[`${checkboxCls}-disabled`]: {
				[`&, ${checkboxCls}-input`]: {
					cursor: "not-allowed",
					pointerEvents: "none"
				},
				background: token.colorBgContainerDisabled,
				borderColor: token.colorBorder,
				"&:after": { borderColor: token.colorTextDisabled },
				"& + span": { color: token.colorTextDisabled },
				[`&${checkboxCls}-indeterminate::after`]: { background: token.colorTextDisabled }
			}
		}
	];
};
function getStyle(prefixCls, token) {
	return genCheckboxStyle(merge$1(token, {
		checkboxCls: `.${prefixCls}`,
		checkboxSize: token.controlInteractiveSize
	}));
}
var style_default$15 = genStyleHooks("Checkbox", (token, { prefixCls }) => [getStyle(prefixCls, token)]);
//#endregion
//#region node_modules/antd/es/checkbox/GroupContext.js
var GroupContext = /* @__PURE__ */ import_react.createContext(null);
//#endregion
//#region node_modules/antd/es/checkbox/Checkbox.js
var InternalCheckbox = (props, ref) => {
	const { prefixCls: customizePrefixCls, children, indeterminate = false, onMouseEnter, onMouseLeave, skipGroup = false, disabled, rootClassName, className, style, classNames, styles, name, value, checked, defaultChecked, onChange, ...restProps } = props;
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("checkbox");
	const checkboxGroup = import_react.useContext(GroupContext);
	const { isFormItemInput } = import_react.useContext(FormItemInputContext);
	const contextDisabled = import_react.useContext(DisabledContext);
	const mergedDisabled = (checkboxGroup?.disabled || disabled) ?? contextDisabled;
	const [innerChecked, setInnerChecked] = useControlledState(defaultChecked, checked);
	let mergedChecked = innerChecked;
	const onInternalChange = useEvent((event) => {
		setInnerChecked(event.target.checked);
		onChange?.(event);
		if (!skipGroup && checkboxGroup?.toggleOption) checkboxGroup.toggleOption({
			label: children,
			value
		});
	});
	if (checkboxGroup && !skipGroup) mergedChecked = checkboxGroup.value.includes(value);
	const checkboxRef = import_react.useRef(null);
	const mergedRef = useComposeRef(ref, checkboxRef);
	import_react.useEffect(() => {
		if (skipGroup || !checkboxGroup) return;
		checkboxGroup.registerValue(value);
		return () => {
			checkboxGroup.cancelValue(value);
		};
	}, [value, skipGroup]);
	import_react.useEffect(() => {
		if (checkboxRef.current?.input) checkboxRef.current.input.indeterminate = indeterminate;
	}, [indeterminate]);
	const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$15(prefixCls, rootCls);
	const checkboxProps = { ...restProps };
	const mergedProps = {
		...props,
		indeterminate,
		disabled: mergedDisabled,
		checked: mergedChecked
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const classString = clsx(`${prefixCls}-wrapper`, {
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-wrapper-checked`]: mergedChecked,
		[`${prefixCls}-wrapper-disabled`]: mergedDisabled,
		[`${prefixCls}-wrapper-in-form-item`]: isFormItemInput
	}, contextClassName, className, mergedClassNames.root, rootClassName, cssVarCls, rootCls, hashId);
	const checkboxClass = clsx(mergedClassNames.icon, { [`${prefixCls}-indeterminate`]: indeterminate }, TARGET_CLS, hashId);
	const [onLabelClick, onInputClick] = useBubbleLock(checkboxProps.onClick);
	return /* @__PURE__ */ import_react.createElement(Wave, {
		component: "Checkbox",
		disabled: mergedDisabled
	}, /* @__PURE__ */ import_react.createElement("label", {
		className: classString,
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		onMouseEnter,
		onMouseLeave,
		onClick: onLabelClick
	}, /* @__PURE__ */ import_react.createElement(Checkbox$2, {
		...checkboxProps,
		name: !skipGroup && checkboxGroup ? checkboxGroup.name : name,
		checked: mergedChecked,
		onClick: onInputClick,
		onChange: onInternalChange,
		prefixCls,
		className: checkboxClass,
		style: mergedStyles.icon,
		disabled: mergedDisabled,
		ref: mergedRef,
		value
	}), isNonNullable(children) && /* @__PURE__ */ import_react.createElement("span", {
		className: clsx(`${prefixCls}-label`, mergedClassNames.label),
		style: mergedStyles.label
	}, children)));
};
var Checkbox$1 = /* @__PURE__ */ import_react.forwardRef(InternalCheckbox);
//#endregion
//#region node_modules/antd/es/checkbox/Group.js
var CheckboxGroup = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { defaultValue, children, options = [], prefixCls: customizePrefixCls, className, rootClassName, style, onChange, role = "group", ...restProps } = props;
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const [value, setValue] = import_react.useState(restProps.value || defaultValue || []);
	const [registeredValues, setRegisteredValues] = import_react.useState([]);
	import_react.useEffect(() => {
		if ("value" in restProps) setValue(restProps.value || []);
	}, [restProps.value]);
	const memoizedOptions = import_react.useMemo(() => options.map((option) => {
		if (typeof option === "string" || typeof option === "number") return {
			label: option,
			value: option
		};
		return option;
	}), [options]);
	const cancelValue = (val) => {
		setRegisteredValues((prevValues) => prevValues.filter((v) => v !== val));
	};
	const registerValue = (val) => {
		setRegisteredValues((prevValues) => [].concat(_toConsumableArray(prevValues), [val]));
	};
	const toggleOption = (option) => {
		const optionIndex = value.indexOf(option.value);
		const newValue = _toConsumableArray(value);
		if (optionIndex === -1) newValue.push(option.value);
		else newValue.splice(optionIndex, 1);
		if (!("value" in restProps)) setValue(newValue);
		onChange?.(newValue.filter((val) => registeredValues.includes(val)).sort((a, b) => {
			return memoizedOptions.findIndex((opt) => opt.value === a) - memoizedOptions.findIndex((opt) => opt.value === b);
		}));
	};
	const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
	const groupPrefixCls = `${prefixCls}-group`;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$15(prefixCls, rootCls);
	const domProps = omit(restProps, ["value", "disabled"]);
	const childrenNode = options.length ? memoizedOptions.map((option) => /* @__PURE__ */ import_react.createElement(Checkbox$1, {
		prefixCls,
		key: option.value.toString(),
		disabled: "disabled" in option ? option.disabled : restProps.disabled,
		value: option.value,
		checked: value.includes(option.value),
		onChange: option.onChange,
		className: clsx(`${groupPrefixCls}-item`, option.className),
		style: option.style,
		title: option.title,
		id: option.id,
		required: option.required
	}, option.label)) : children;
	const memoizedContext = import_react.useMemo(() => ({
		toggleOption,
		value,
		disabled: restProps.disabled,
		name: restProps.name,
		registerValue,
		cancelValue
	}), [
		toggleOption,
		value,
		restProps.disabled,
		restProps.name,
		registerValue,
		cancelValue
	]);
	const classString = clsx(groupPrefixCls, { [`${groupPrefixCls}-rtl`]: direction === "rtl" }, className, rootClassName, cssVarCls, rootCls, hashId);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: classString,
		style,
		role,
		...domProps,
		ref
	}, /* @__PURE__ */ import_react.createElement(GroupContext.Provider, { value: memoizedContext }, childrenNode));
});
//#endregion
//#region node_modules/antd/es/checkbox/index.js
var Checkbox = Checkbox$1;
Checkbox.Group = CheckboxGroup;
Checkbox.__ANT_CHECKBOX = true;
//#endregion
//#region node_modules/antd/es/grid/RowContext.js
var RowContext = /* @__PURE__ */ (0, import_react.createContext)({});
//#endregion
//#region node_modules/antd/es/grid/col.js
var isNumber = (value) => {
	return typeof value === "number" && !Number.isNaN(value);
};
function parseFlex(flex) {
	if (flex === "auto") return "1 1 auto";
	if (isNumber(flex)) return `${flex} ${flex} auto`;
	if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;
	return flex;
}
var Col = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { gutter, wrap } = import_react.useContext(RowContext);
	const { prefixCls: customizePrefixCls, span, order, offset, push, pull, className, children, flex, style, ...others } = props;
	const prefixCls = getPrefixCls("col", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const [hashId, cssVarCls] = useColStyle(prefixCls);
	const [varName] = genCssVar(rootPrefixCls, "col");
	const sizeStyle = {};
	let sizeClassObj = {};
	responsiveArrayReversed.forEach((size) => {
		let sizeProps = {};
		const propSize = props[size];
		if (typeof propSize === "number") sizeProps.span = propSize;
		else if (typeof propSize === "object") sizeProps = propSize || {};
		delete others[size];
		sizeClassObj = {
			...sizeClassObj,
			[`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== void 0,
			[`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
			[`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
			[`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
			[`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
			[`${prefixCls}-rtl`]: direction === "rtl"
		};
		if (sizeProps.flex) {
			sizeClassObj[`${prefixCls}-${size}-flex`] = true;
			sizeStyle[varName(`${size}-flex`)] = parseFlex(sizeProps.flex);
		}
	});
	const classes = clsx(prefixCls, {
		[`${prefixCls}-${span}`]: span !== void 0,
		[`${prefixCls}-order-${order}`]: order,
		[`${prefixCls}-offset-${offset}`]: offset,
		[`${prefixCls}-push-${push}`]: push,
		[`${prefixCls}-pull-${pull}`]: pull
	}, className, sizeClassObj, hashId, cssVarCls);
	const mergedStyle = {};
	if (gutter?.[0]) mergedStyle.paddingInline = typeof gutter[0] === "number" ? `${gutter[0] / 2}px` : `calc(${gutter[0]} / 2)`;
	if (flex) {
		mergedStyle.flex = parseFlex(flex);
		if (wrap === false && !mergedStyle.minWidth) mergedStyle.minWidth = 0;
	}
	return /* @__PURE__ */ import_react.createElement("div", {
		...others,
		style: {
			...mergedStyle,
			...style,
			...sizeStyle
		},
		className: classes,
		ref
	}, children);
});
//#endregion
//#region node_modules/antd/es/grid/hooks/useGutter.js
function useGutter(gutter, screens) {
	const results = [void 0, void 0];
	const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, void 0];
	const mergedScreens = screens || {
		xs: true,
		sm: true,
		md: true,
		lg: true,
		xl: true,
		xxl: true,
		xxxl: true
	};
	normalizedGutter.forEach((g, index) => {
		if (typeof g === "object" && g !== null) for (let i = 0; i < responsiveArray.length; i++) {
			const breakpoint = responsiveArray[i];
			if (mergedScreens[breakpoint] && g[breakpoint] !== void 0) {
				results[index] = g[breakpoint];
				break;
			}
		}
		else results[index] = g;
	});
	return results;
}
//#endregion
//#region node_modules/antd/es/grid/row.js
function useMergedPropByScreen(oriProp, screen) {
	const [prop, setProp] = import_react.useState(typeof oriProp === "string" ? oriProp : "");
	const calcMergedAlignOrJustify = () => {
		if (typeof oriProp === "string") setProp(oriProp);
		if (typeof oriProp !== "object") return;
		for (let i = 0; i < responsiveArray.length; i++) {
			const breakpoint = responsiveArray[i];
			if (!screen || !screen[breakpoint]) continue;
			const curVal = oriProp[breakpoint];
			if (curVal !== void 0) {
				setProp(curVal);
				return;
			}
		}
	};
	import_react.useEffect(() => {
		calcMergedAlignOrJustify();
	}, [JSON.stringify(oriProp), screen]);
	return prop;
}
var Row = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, justify, align, className, style, children, gutter = 0, wrap, ...others } = props;
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const screens = useBreakpoint(true, null);
	const mergedAlign = useMergedPropByScreen(align, screens);
	const mergedJustify = useMergedPropByScreen(justify, screens);
	const prefixCls = getPrefixCls("row", customizePrefixCls);
	const [hashId, cssVarCls] = useRowStyle(prefixCls);
	const gutters = useGutter(gutter, screens);
	const classes = clsx(prefixCls, {
		[`${prefixCls}-no-wrap`]: wrap === false,
		[`${prefixCls}-${mergedJustify}`]: mergedJustify,
		[`${prefixCls}-${mergedAlign}`]: mergedAlign,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, hashId, cssVarCls);
	const rowStyle = {};
	if (gutters?.[0]) rowStyle.marginInline = typeof gutters[0] === "number" ? `${gutters[0] / -2}px` : `calc(${gutters[0]} / -2)`;
	const [gutterH, gutterV] = gutters;
	rowStyle.rowGap = gutterV;
	const rowContext = import_react.useMemo(() => ({
		gutter: [gutterH, gutterV],
		wrap
	}), [
		gutterH,
		gutterV,
		wrap
	]);
	return /* @__PURE__ */ import_react.createElement(RowContext.Provider, { value: rowContext }, /* @__PURE__ */ import_react.createElement("div", {
		...others,
		className: classes,
		style: {
			...rowStyle,
			...style
		},
		ref
	}, children));
});
//#endregion
//#region node_modules/antd/es/space/style/addon.js
var genSpaceAddonStyle = (token) => {
	const { componentCls, borderRadius, paddingSM, colorBorder, paddingXS, fontSizeLG, fontSizeSM, borderRadiusLG, borderRadiusSM, colorBgContainerDisabled, lineWidth, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "space");
	return { [componentCls]: [
		{
			display: "inline-flex",
			alignItems: "center",
			gap: 0,
			paddingInline: paddingSM,
			margin: 0,
			borderWidth: lineWidth,
			borderStyle: "solid",
			borderRadius,
			"&:hover": { zIndex: 0 },
			[`&${componentCls}-disabled`]: { color: token.colorTextDisabled },
			"&-large": {
				fontSize: fontSizeLG,
				borderRadius: borderRadiusLG
			},
			"&-small": {
				paddingInline: paddingXS,
				borderRadius: borderRadiusSM,
				fontSize: fontSizeSM
			},
			"&-compact-last-item": {
				borderEndStartRadius: 0,
				borderStartStartRadius: 0
			},
			"&-compact-first-item": {
				borderEndEndRadius: 0,
				borderStartEndRadius: 0
			},
			"&-compact-item:not(:first-child):not(:last-child)": { borderRadius: 0 },
			"&-compact-item:not(:last-child)": { borderInlineEndWidth: 0 },
			"&-compact-item:not(:first-child)": { borderInlineStartWidth: 0 }
		},
		{
			[varName("addon-border-color")]: colorBorder,
			[varName("addon-background")]: colorBgContainerDisabled,
			[varName("addon-border-color-outlined")]: colorBorder,
			[varName("addon-background-filled")]: colorBgContainerDisabled,
			borderColor: varRef("addon-border-color"),
			background: varRef("addon-background"),
			"&-variant-outlined": { [varName("addon-border-color")]: varRef("addon-border-color-outlined") },
			"&-variant-filled": {
				[varName("addon-border-color")]: "transparent",
				[varName("addon-background")]: varRef("addon-background-filled"),
				[`&${componentCls}-disabled`]: {
					[varName("addon-border-color")]: colorBorder,
					[varName("addon-background")]: colorBgContainerDisabled
				}
			},
			"&-variant-borderless": {
				border: "none",
				background: "transparent"
			},
			"&-variant-underlined": {
				border: "none",
				background: "transparent"
			}
		},
		{
			"&-status-error": {
				[varName("addon-border-color-outlined")]: token.colorError,
				[varName("addon-background-filled")]: token.colorErrorBg,
				color: token.colorError
			},
			"&-status-warning": {
				[varName("addon-border-color-outlined")]: token.colorWarning,
				[varName("addon-background-filled")]: token.colorWarningBg,
				color: token.colorWarning
			}
		}
	] };
};
var addon_default = genStyleHooks(["Space", "Addon"], (token) => [genSpaceAddonStyle(token), genCompactItemStyle(token, { focus: false })]);
//#endregion
//#region node_modules/antd/es/space/Addon.js
var SpaceAddon = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { className, children, style, prefixCls: customizePrefixCls, variant = "outlined", disabled, status, ...restProps } = props;
	const { getPrefixCls, direction: directionConfig } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("space-addon", customizePrefixCls);
	const [hashId, cssVarCls] = addon_default(prefixCls);
	const { compactItemClassnames, compactSize } = useCompactItemContext(prefixCls, directionConfig);
	const statusCls = getStatusClassNames(prefixCls, status);
	const classes = clsx(prefixCls, hashId, compactItemClassnames, cssVarCls, `${prefixCls}-variant-${variant}`, statusCls, {
		[`${prefixCls}-${compactSize}`]: compactSize,
		[`${prefixCls}-disabled`]: disabled
	}, className);
	return /* @__PURE__ */ import_react.createElement("div", {
		ref,
		className: classes,
		style,
		...restProps
	}, children);
});
//#endregion
//#region node_modules/antd/es/input-number/style/token.js
var prepareComponentToken$13 = (token) => {
	const handleVisible = token.handleVisible ?? "auto";
	const handleWidth = token.controlHeightSM - token.lineWidth * 2;
	return {
		...initComponentToken(token),
		controlWidth: 90,
		handleWidth,
		handleFontSize: token.fontSize / 2,
		handleVisible,
		handleActiveBg: token.colorFillAlter,
		handleBg: token.colorBgContainer,
		filledHandleBg: new FastColor(token.colorFillSecondary).onBackground(token.colorBgContainer).toHexString(),
		handleHoverColor: token.colorPrimary,
		handleBorderColor: token.colorBorder,
		handleOpacity: handleVisible === true ? 1 : 0,
		handleVisibleWidth: handleVisible === true ? handleWidth : 0
	};
};
//#endregion
//#region node_modules/antd/es/input-number/style/index.js
var genInputNumberStyles = (token) => {
	const { componentCls, lineWidth, lineType, borderRadius, inputFontSizeSM, inputFontSizeLG, colorError, paddingInlineSM, paddingBlockSM, paddingBlockLG, paddingInlineLG, colorIcon, motionDurationMid, handleHoverColor, handleOpacity, paddingInline, paddingBlock, handleBg, handleActiveBg, inputAffixPadding, borderRadiusSM, controlWidth, handleBorderColor, filledHandleBg, lineHeightLG, antCls } = token;
	const borderStyle = `${unit(lineWidth)} ${lineType} ${handleBorderColor}`;
	const [varName, varRef] = genCssVar(antCls, "input-number");
	return [
		{ [componentCls]: {
			...resetComponent(token),
			...genBasicInputStyle(token),
			[varName("input-padding-block")]: unit(paddingBlock),
			[varName("input-padding-inline")]: unit(paddingInline),
			display: "inline-flex",
			width: controlWidth,
			margin: 0,
			paddingBlock: 0,
			borderRadius,
			...genOutlinedStyle(token, { [`${componentCls}-actions`]: {
				background: handleBg,
				[`${componentCls}-action-down`]: { borderBlockStart: borderStyle }
			} }),
			...genFilledStyle(token, {
				[`${componentCls}-actions`]: {
					background: filledHandleBg,
					[`${componentCls}-action-down`]: { borderBlockStart: borderStyle }
				},
				"&:focus-within": { [`${componentCls}-actions`]: { background: handleBg } }
			}),
			...genUnderlinedStyle(token, { [`${componentCls}-actions`]: {
				background: handleBg,
				[`${componentCls}-action-down`]: { borderBlockStart: borderStyle }
			} }),
			...genBorderlessStyle(token),
			[`&${componentCls}-borderless`]: {
				paddingBlock: 0,
				[varName("input-padding-block")]: unit(token.calc(paddingBlock).add(lineWidth).equal())
			},
			[`&${componentCls}-borderless${componentCls}-sm`]: {
				paddingBlock: 0,
				[varName("input-padding-block")]: unit(token.calc(paddingBlockSM).add(lineWidth).equal())
			},
			[`&${componentCls}-borderless${componentCls}-lg`]: {
				paddingBlock: 0,
				[varName("input-padding-block")]: unit(token.calc(paddingBlockLG).add(lineWidth).equal())
			},
			"&-rtl": {
				direction: "rtl",
				[`${componentCls}-input`]: { direction: "rtl" }
			},
			[`&${componentCls}-out-of-range`]: { [`${componentCls}-input`]: { color: colorError } },
			[`${componentCls}-input`]: {
				...resetComponent(token),
				width: "100%",
				paddingBlock: varRef("input-padding-block"),
				textAlign: "start",
				backgroundColor: "transparent",
				border: 0,
				borderRadius,
				outline: 0,
				transition: `all ${motionDurationMid} linear`,
				appearance: "textfield",
				fontSize: "inherit",
				lineHeight: "inherit",
				...genPlaceholderStyle(token.colorTextPlaceholder),
				"&[type=\"number\"]::-webkit-inner-spin-button, &[type=\"number\"]::-webkit-outer-spin-button": {
					margin: 0,
					appearance: "none"
				}
			},
			[`&:hover ${componentCls}-handler-wrap, &-focused ${componentCls}-handler-wrap`]: {
				width: token.handleWidth,
				opacity: 1
			},
			[`&-disabled ${componentCls}-input`]: {
				cursor: "not-allowed",
				color: token.colorTextDisabled
			}
		} },
		{ [componentCls]: {
			[`
          ${componentCls}-action-up-disabled,
          ${componentCls}-action-down-disabled
        `]: { cursor: "not-allowed" },
			[`${componentCls}-action`]: {
				...resetIcon(),
				userSelect: "none",
				overflow: "hidden",
				fontWeight: "bold",
				lineHeight: 0,
				textAlign: "center",
				cursor: "pointer",
				transition: `all ${motionDurationMid} linear`,
				"&:active": { background: handleActiveBg },
				"&:hover": { color: handleHoverColor }
			},
			"&-mode-input": {
				overflow: "hidden",
				[`${componentCls}-actions`]: {
					position: "absolute",
					insetBlockStart: 0,
					insetInlineEnd: 0,
					width: token.handleVisibleWidth,
					opacity: handleOpacity,
					height: "100%",
					borderRadius: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "stretch",
					transition: `all ${motionDurationMid}`,
					overflow: "hidden",
					[`${componentCls}-action`]: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flex: "auto",
						height: "40%",
						marginInlineEnd: 0,
						fontSize: token.handleFontSize
					}
				},
				[`&:hover ${componentCls}-actions, &-focused ${componentCls}-actions`]: {
					width: token.handleWidth,
					opacity: 1
				},
				[`${componentCls}-action`]: {
					color: colorIcon,
					height: "50%",
					borderInlineStart: borderStyle,
					"&:hover": { height: `60%` }
				},
				[`&${componentCls}-disabled, &${componentCls}-readonly`]: { [`${componentCls}-actions`]: { display: "none" } }
			},
			[`&${componentCls}-mode-spinner`]: {
				padding: 0,
				width: "auto",
				[`${componentCls}-action`]: {
					flex: "none",
					paddingInline: varRef("input-padding-inline"),
					"&-up": { borderInlineStart: borderStyle },
					"&-down": { borderInlineEnd: borderStyle }
				},
				[`${componentCls}-input`]: {
					textAlign: "center",
					paddingInline: varRef("input-padding-inline")
				}
			}
		} },
		{ [componentCls]: {
			"&-lg": {
				[varName("input-padding-block")]: unit(paddingBlockLG),
				[varName("input-padding-inline")]: unit(paddingInlineLG),
				paddingBlock: 0,
				fontSize: inputFontSizeLG,
				lineHeight: lineHeightLG
			},
			"&-sm": {
				[varName("input-padding-block")]: unit(paddingBlockSM),
				[varName("input-padding-inline")]: unit(paddingInlineSM),
				paddingBlock: 0,
				fontSize: inputFontSizeSM,
				borderRadius: borderRadiusSM
			}
		} },
		{ [componentCls]: {
			[`${componentCls}-prefix, ${componentCls}-suffix`]: {
				display: "flex",
				flex: "none",
				alignItems: "center",
				alignSelf: "center",
				pointerEvents: "none"
			},
			[`${componentCls}-prefix`]: { marginInlineEnd: inputAffixPadding },
			[`${componentCls}-suffix`]: {
				height: "100%",
				marginInlineStart: inputAffixPadding,
				transition: `margin ${motionDurationMid}`
			},
			[`&:hover:not(${componentCls}-without-controls)`]: { [`${componentCls}-suffix`]: { marginInlineEnd: token.handleWidth } }
		} }
	];
};
var genCompatibleStyles = (token) => {
	const { componentCls, antCls } = token;
	return { [`${componentCls}-addon`]: { [`&:has(${antCls}-select)`]: {
		border: 0,
		padding: 0
	} } };
};
var style_default$14 = genStyleHooks("InputNumber", (token) => {
	const inputNumberToken = merge$1(token, initInputToken(token));
	return [
		genInputNumberStyles(inputNumberToken),
		genCompatibleStyles(inputNumberToken),
		genCompactItemStyle(inputNumberToken)
	];
}, prepareComponentToken$13, {
	unitless: { handleOpacity: true },
	resetFont: false
});
//#endregion
//#region node_modules/antd/es/input-number/index.js
var InternalInputNumber = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const inputRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => inputRef.current);
	const { rootClassName, size: customizeSize, disabled: customDisabled, prefixCls, addonBefore: _addonBefore, addonAfter: _addonAfter, prefix, suffix, bordered, readOnly, status, controls = true, variant: customVariant, className, style, classNames, styles, mode, ...others } = props;
	const { direction, className: contextClassName, style: contextStyle, styles: contextStyles, classNames: contextClassNames } = useComponentConfig("inputNumber");
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const mergedControls = import_react.useMemo(() => {
		if (!controls || mergedDisabled || readOnly) return false;
		return controls;
	}, [
		controls,
		mergedDisabled,
		readOnly
	]);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	let upIcon = mode === "spinner" ? /* @__PURE__ */ import_react.createElement(RefIcon$9, null) : /* @__PURE__ */ import_react.createElement(RefIcon$11, null);
	let downIcon = mode === "spinner" ? /* @__PURE__ */ import_react.createElement(RefIcon$12, null) : /* @__PURE__ */ import_react.createElement(RefIcon$7, null);
	const controlsTemp = typeof mergedControls === "boolean" ? mergedControls : void 0;
	if (typeof mergedControls === "object") {
		upIcon = mergedControls.upIcon || upIcon;
		downIcon = mergedControls.downIcon || downIcon;
	}
	const { hasFeedback, isFormItemInput, feedbackIcon } = import_react.useContext(FormItemInputContext);
	const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
	const [variant, enableVariantCls] = useVariant("inputNumber", customVariant, bordered);
	const suffixNode = hasFeedback && /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, feedbackIcon);
	const mergedProps = {
		...props,
		size: mergedSize,
		disabled: mergedDisabled,
		controls: mergedControls
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	return /* @__PURE__ */ import_react.createElement(es_default$5, {
		ref: inputRef,
		mode,
		disabled: mergedDisabled,
		className: clsx(className, rootClassName, mergedClassNames.root, contextClassName, compactItemClassnames, getStatusClassNames(prefixCls, status, hasFeedback), {
			[`${prefixCls}-${variant}`]: enableVariantCls,
			[`${prefixCls}-lg`]: mergedSize === "large",
			[`${prefixCls}-sm`]: mergedSize === "small",
			[`${prefixCls}-rtl`]: direction === "rtl",
			[`${prefixCls}-in-form-item`]: isFormItemInput,
			[`${prefixCls}-without-controls`]: !mergedControls
		}),
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		upHandler: upIcon,
		downHandler: downIcon,
		prefixCls,
		readOnly,
		controls: controlsTemp,
		prefix,
		suffix: suffixNode || suffix,
		classNames: mergedClassNames,
		styles: mergedStyles,
		...others
	});
});
var InputNumber = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { addonBefore, addonAfter, prefixCls: customizePrefixCls, className, status: customStatus, rootClassName, ...rest } = props;
	const { getPrefixCls } = useComponentConfig("inputNumber");
	const prefixCls = getPrefixCls("input-number", customizePrefixCls);
	const { status: contextStatus } = import_react.useContext(FormItemInputContext);
	const mergedStatus = getMergedStatus(contextStatus, customStatus);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$14(prefixCls, rootCls);
	const hasLegacyAddon = addonBefore || addonAfter;
	const inputNumberNode = /* @__PURE__ */ import_react.createElement(InternalInputNumber, {
		ref,
		...rest,
		prefixCls,
		status: mergedStatus,
		className: clsx(cssVarCls, rootCls, hashId, className),
		rootClassName: !hasLegacyAddon ? rootClassName : void 0
	});
	if (hasLegacyAddon) {
		const renderAddon = (node) => {
			if (!node) return null;
			return /* @__PURE__ */ import_react.createElement(SpaceAddon, {
				className: clsx(`${prefixCls}-addon`, cssVarCls, hashId),
				variant: props.variant,
				disabled: props.disabled,
				status: mergedStatus
			}, /* @__PURE__ */ import_react.createElement(ContextIsolator, { form: true }, node));
		};
		const addonBeforeNode = renderAddon(addonBefore);
		const addonAfterNode = renderAddon(addonAfter);
		return /* @__PURE__ */ import_react.createElement(Compact, { rootClassName }, addonBeforeNode, inputNumberNode, addonAfterNode);
	}
	return inputNumberNode;
});
var TypedInputNumber = InputNumber;
/** @private Internal Component. Do not use in your production. */
var PureInputNumber = (props) => /* @__PURE__ */ import_react.createElement(ConfigProvider, { theme: { components: { InputNumber: { handleVisible: true } } } }, /* @__PURE__ */ import_react.createElement(InputNumber, { ...props }));
TypedInputNumber._InternalPanelDoNotUseOrYouWillBeFired = PureInputNumber;
//#endregion
//#region node_modules/antd/es/_util/getAllowClear.js
var getAllowClear = (allowClear) => {
	let mergedAllowClear;
	if (typeof allowClear === "object" && allowClear?.clearIcon) mergedAllowClear = allowClear;
	else if (allowClear) mergedAllowClear = { clearIcon: /* @__PURE__ */ import_react.createElement(RefIcon$3, null) };
	return mergedAllowClear;
};
//#endregion
//#region node_modules/antd/es/input/hooks/useRemovePasswordTimeout.js
function useRemovePasswordTimeout(inputRef, triggerOnMount) {
	const removePasswordTimeoutRef = (0, import_react.useRef)([]);
	const removePasswordTimeout = () => {
		removePasswordTimeoutRef.current.push(setTimeout(() => {
			if (inputRef.current?.input && inputRef.current?.input.getAttribute("type") === "password" && inputRef.current?.input.hasAttribute("value")) inputRef.current?.input.removeAttribute("value");
		}));
	};
	(0, import_react.useEffect)(() => {
		if (triggerOnMount) removePasswordTimeout();
		return () => removePasswordTimeoutRef.current.forEach((timer) => {
			if (timer) clearTimeout(timer);
		});
	}, []);
	return removePasswordTimeout;
}
//#endregion
//#region node_modules/antd/es/input/utils.js
function hasPrefixSuffix(props) {
	return !!(props.prefix || props.suffix || props.allowClear || props.showCount);
}
//#endregion
//#region node_modules/antd/es/input/Input.js
var Input$1 = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls: customizePrefixCls, bordered = true, status: customStatus, size: customSize, disabled: customDisabled, onBlur, onFocus, suffix, allowClear, addonAfter, addonBefore, className, style, styles, rootClassName, onChange, classNames, variant: customVariant, ...rest } = props;
	const { getPrefixCls, direction, allowClear: contextAllowClear, autoComplete: contextAutoComplete, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("input");
	const prefixCls = getPrefixCls("input", customizePrefixCls);
	const inputRef = (0, import_react.useRef)(null);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClassName);
	style_default$20(prefixCls, rootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customSize ?? compactSize ?? ctx);
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const mergedProps = {
		...props,
		size: mergedSize,
		disabled: mergedDisabled
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const { status: contextStatus, hasFeedback, feedbackIcon } = (0, import_react.useContext)(FormItemInputContext);
	const mergedStatus = getMergedStatus(contextStatus, customStatus);
	(0, import_react.useRef)(hasPrefixSuffix(props) || !!hasFeedback);
	const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);
	const handleBlur = (e) => {
		removePasswordTimeout();
		onBlur?.(e);
	};
	const handleFocus = (e) => {
		removePasswordTimeout();
		onFocus?.(e);
	};
	const handleChange = (e) => {
		removePasswordTimeout();
		onChange?.(e);
	};
	const suffixNode = (hasFeedback || suffix) && /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, suffix, hasFeedback && feedbackIcon);
	const mergedAllowClear = getAllowClear(allowClear ?? contextAllowClear);
	const [variant, enableVariantCls] = useVariant("input", customVariant, bordered);
	return /* @__PURE__ */ import_react.createElement(es_default$6, {
		ref: composeRef(ref, inputRef),
		prefixCls,
		autoComplete: contextAutoComplete,
		...rest,
		disabled: mergedDisabled,
		onBlur: handleBlur,
		onFocus: handleFocus,
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		styles: mergedStyles,
		suffix: suffixNode,
		allowClear: mergedAllowClear,
		className: clsx(className, rootClassName, cssVarCls, rootCls, compactItemClassnames, contextClassName, mergedClassNames.root),
		onChange: handleChange,
		addonBefore: addonBefore && /* @__PURE__ */ import_react.createElement(ContextIsolator, {
			form: true,
			space: true
		}, addonBefore),
		addonAfter: addonAfter && /* @__PURE__ */ import_react.createElement(ContextIsolator, {
			form: true,
			space: true
		}, addonAfter),
		classNames: {
			...mergedClassNames,
			input: clsx({
				[`${prefixCls}-sm`]: mergedSize === "small",
				[`${prefixCls}-lg`]: mergedSize === "large",
				[`${prefixCls}-rtl`]: direction === "rtl"
			}, mergedClassNames.input, hashId),
			variant: clsx({ [`${prefixCls}-${variant}`]: enableVariantCls }, getStatusClassNames(prefixCls, mergedStatus)),
			affixWrapper: clsx({
				[`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
				[`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
				[`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl"
			}, hashId),
			wrapper: clsx({ [`${prefixCls}-group-rtl`]: direction === "rtl" }, hashId),
			groupWrapper: clsx({
				[`${prefixCls}-group-wrapper-sm`]: mergedSize === "small",
				[`${prefixCls}-group-wrapper-lg`]: mergedSize === "large",
				[`${prefixCls}-group-wrapper-rtl`]: direction === "rtl",
				[`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls
			}, getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback), hashId)
		}
	});
});
//#endregion
//#region node_modules/antd/es/slider/Context.js
/** @private Internal context. Do not use in your production. */
var SliderInternalContext = /* @__PURE__ */ (0, import_react.createContext)({});
//#endregion
//#region node_modules/antd/es/slider/SliderTooltip.js
var SliderTooltip = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { open, draggingDelete, value } = props;
	const innerRef = (0, import_react.useRef)(null);
	const mergedOpen = open && !draggingDelete;
	const rafRef = (0, import_react.useRef)(null);
	function cancelKeepAlign() {
		wrapperRaf.cancel(rafRef.current);
		rafRef.current = null;
	}
	function keepAlign() {
		rafRef.current = wrapperRaf(() => {
			innerRef.current?.forceAlign();
			rafRef.current = null;
		});
	}
	import_react.useEffect(() => {
		if (mergedOpen) keepAlign();
		else cancelKeepAlign();
		return cancelKeepAlign;
	}, [
		mergedOpen,
		props.title,
		value
	]);
	return /* @__PURE__ */ import_react.createElement(Tooltip, {
		ref: composeRef(innerRef, ref),
		...props,
		open: mergedOpen
	});
});
//#endregion
//#region node_modules/antd/es/slider/style/index.js
var genBaseStyle$5 = (token) => {
	const { componentCls, antCls, controlSize, dotSize, marginFull, marginPart, colorFillContentHover, handleColorDisabled, calc, handleSize, handleSizeHover, handleActiveColor, handleActiveOutlineColor, handleLineWidth, handleLineWidthHover, motionDurationMid } = token;
	return { [componentCls]: {
		...resetComponent(token),
		position: "relative",
		height: controlSize,
		margin: `${unit(marginPart)} ${unit(marginFull)}`,
		padding: 0,
		cursor: "pointer",
		touchAction: "none",
		"&-vertical": { margin: `${unit(marginFull)} ${unit(marginPart)}` },
		[`${componentCls}-rail`]: {
			position: "absolute",
			backgroundColor: token.railBg,
			borderRadius: token.borderRadiusXS,
			transition: `background-color ${motionDurationMid}`
		},
		[`${componentCls}-track,${componentCls}-tracks`]: {
			position: "absolute",
			transition: `background-color ${motionDurationMid}`
		},
		[`${componentCls}-track`]: {
			backgroundColor: token.trackBg,
			borderRadius: token.borderRadiusXS
		},
		[`${componentCls}-track-draggable`]: {
			boxSizing: "content-box",
			backgroundClip: "content-box",
			border: "solid rgba(0,0,0,0)"
		},
		"&:hover": {
			[`${componentCls}-rail`]: { backgroundColor: token.railHoverBg },
			[`${componentCls}-track`]: { backgroundColor: token.trackHoverBg },
			[`${componentCls}-dot`]: { borderColor: colorFillContentHover },
			[`${componentCls}-handle::after`]: { boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.colorPrimaryBorderHover}` },
			[`${componentCls}-dot-active`]: { borderColor: token.dotActiveBorderColor }
		},
		[`${componentCls}-handle`]: {
			position: "absolute",
			width: handleSize,
			height: handleSize,
			outline: "none",
			userSelect: "none",
			"&-dragging-delete": { opacity: 0 },
			"&::before": {
				content: "\"\"",
				position: "absolute",
				insetInlineStart: calc(handleLineWidth).mul(-1).equal(),
				insetBlockStart: calc(handleLineWidth).mul(-1).equal(),
				width: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
				height: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
				backgroundColor: "transparent"
			},
			"&::after": {
				content: "\"\"",
				position: "absolute",
				insetBlockStart: 0,
				insetInlineStart: 0,
				width: handleSize,
				height: handleSize,
				backgroundColor: token.colorBgElevated,
				boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.handleColor}`,
				outline: `0px solid transparent`,
				borderRadius: "50%",
				cursor: "pointer",
				transition: [
					"inset-inline-start",
					"inset-block-start",
					"width",
					"height",
					"box-shadow",
					"outline"
				].map((prop) => `${prop} ${motionDurationMid}`).join(", ")
			},
			"&:hover, &:active, &:focus": {
				"&::before": {
					insetInlineStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
					insetBlockStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
					width: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal(),
					height: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal()
				},
				"&::after": {
					boxShadow: `0 0 0 ${unit(handleLineWidthHover)} ${handleActiveColor}`,
					outline: `6px solid ${handleActiveOutlineColor}`,
					width: handleSizeHover,
					height: handleSizeHover,
					insetInlineStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal(),
					insetBlockStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal()
				}
			}
		},
		[`&-lock ${componentCls}-handle`]: { "&::before, &::after": { transition: "none" } },
		[`${componentCls}-mark`]: {
			position: "absolute",
			fontSize: token.fontSize
		},
		[`${componentCls}-mark-text`]: {
			position: "absolute",
			display: "inline-block",
			color: token.colorTextDescription,
			textAlign: "center",
			wordBreak: "keep-all",
			cursor: "pointer",
			userSelect: "none",
			"&-active": { color: token.colorText }
		},
		[`${componentCls}-step`]: {
			position: "absolute",
			background: "transparent",
			pointerEvents: "none"
		},
		[`${componentCls}-dot`]: {
			position: "absolute",
			width: dotSize,
			height: dotSize,
			backgroundColor: token.colorBgElevated,
			border: `${unit(handleLineWidth)} solid ${token.dotBorderColor}`,
			borderRadius: "50%",
			cursor: "pointer",
			transition: `border-color ${token.motionDurationSlow}`,
			pointerEvents: "auto",
			"&-active": { borderColor: token.dotActiveBorderColor }
		},
		[`&${componentCls}-disabled`]: {
			cursor: "not-allowed",
			[`${componentCls}-rail`]: { backgroundColor: `${token.railBg} !important` },
			[`${componentCls}-track`]: { backgroundColor: `${token.trackBgDisabled} !important` },
			[`
          ${componentCls}-dot
        `]: {
				backgroundColor: token.colorBgElevated,
				borderColor: token.trackBgDisabled,
				boxShadow: "none",
				cursor: "not-allowed"
			},
			[`${componentCls}-handle::after`]: {
				backgroundColor: token.colorBgElevated,
				cursor: "not-allowed",
				width: handleSize,
				height: handleSize,
				boxShadow: `0 0 0 ${unit(handleLineWidth)} ${handleColorDisabled}`,
				insetInlineStart: 0,
				insetBlockStart: 0
			},
			[`
          ${componentCls}-mark-text,
          ${componentCls}-dot
        `]: { cursor: `not-allowed !important` }
		},
		[`&-tooltip ${antCls}-tooltip-container`]: { minWidth: "unset" }
	} };
};
var genDirectionStyle = (token, horizontal) => {
	const { componentCls, railSize, handleSize, dotSize, marginFull, calc } = token;
	const railPadding = horizontal ? "paddingBlock" : "paddingInline";
	const full = horizontal ? "width" : "height";
	const part = horizontal ? "height" : "width";
	const handlePos = horizontal ? "insetBlockStart" : "insetInlineStart";
	const markInset = horizontal ? "top" : "insetInlineStart";
	const handlePosSize = calc(railSize).mul(3).sub(handleSize).div(2).equal();
	const draggableBorderSize = calc(handleSize).sub(railSize).div(2).equal();
	const draggableBorder = horizontal ? {
		borderWidth: `${unit(draggableBorderSize)} 0`,
		transform: `translateY(${unit(calc(draggableBorderSize).mul(-1).equal())})`
	} : {
		borderWidth: `0 ${unit(draggableBorderSize)}`,
		transform: `translateX(${unit(token.calc(draggableBorderSize).mul(-1).equal())})`
	};
	return {
		[railPadding]: railSize,
		[part]: calc(railSize).mul(3).equal(),
		[`${componentCls}-rail`]: {
			[full]: "100%",
			[part]: railSize
		},
		[`${componentCls}-track,${componentCls}-tracks`]: { [part]: railSize },
		[`${componentCls}-track-draggable`]: { ...draggableBorder },
		[`${componentCls}-handle`]: { [handlePos]: handlePosSize },
		[`${componentCls}-mark`]: {
			insetInlineStart: 0,
			top: 0,
			[markInset]: calc(railSize).mul(3).add(horizontal ? 0 : marginFull).equal(),
			[full]: "100%"
		},
		[`${componentCls}-step`]: {
			insetInlineStart: 0,
			top: 0,
			[markInset]: railSize,
			[full]: "100%",
			[part]: railSize
		},
		[`${componentCls}-dot`]: {
			position: "absolute",
			[handlePos]: calc(railSize).sub(dotSize).div(2).equal()
		}
	};
};
var genHorizontalStyle$3 = (token) => {
	const { componentCls, marginPartWithMark } = token;
	return { [`${componentCls}-horizontal`]: {
		...genDirectionStyle(token, true),
		[`&${componentCls}-with-marks`]: { marginBottom: marginPartWithMark }
	} };
};
var genVerticalStyle$3 = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-vertical`]: {
		...genDirectionStyle(token, false),
		height: "100%"
	} };
};
var prepareComponentToken$12 = (token) => {
	const increaseHandleWidth = 1;
	const controlSize = token.controlHeightLG / 4;
	const controlSizeHover = token.controlHeightSM / 2;
	const handleLineWidth = token.lineWidth + increaseHandleWidth;
	const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 1.5;
	const handleActiveColor = token.colorPrimary;
	const handleActiveOutlineColor = new FastColor(handleActiveColor).setA(.2).toRgbString();
	return {
		controlSize,
		railSize: 4,
		handleSize: controlSize,
		handleSizeHover: controlSizeHover,
		dotSize: 8,
		handleLineWidth,
		handleLineWidthHover,
		railBg: token.colorFillTertiary,
		railHoverBg: token.colorFillSecondary,
		trackBg: token.colorPrimaryBorder,
		trackHoverBg: token.colorPrimaryBorderHover,
		handleColor: token.colorPrimaryBorder,
		handleActiveColor,
		handleActiveOutlineColor,
		handleColorDisabled: new FastColor(token.colorTextDisabled).onBackground(token.colorBgContainer).toHexString(),
		dotBorderColor: token.colorBorderSecondary,
		dotActiveBorderColor: token.colorPrimaryBorder,
		trackBgDisabled: token.colorBgContainerDisabled
	};
};
var style_default$13 = genStyleHooks("Slider", (token) => {
	const sliderToken = merge$1(token, {
		marginPart: token.calc(token.controlHeight).sub(token.controlSize).div(2).equal(),
		marginFull: token.calc(token.controlSize).div(2).equal(),
		marginPartWithMark: token.calc(token.controlHeightLG).sub(token.controlSize).equal()
	});
	return [
		genBaseStyle$5(sliderToken),
		genHorizontalStyle$3(sliderToken),
		genVerticalStyle$3(sliderToken)
	];
}, prepareComponentToken$12);
//#endregion
//#region node_modules/antd/es/slider/useRafLock.js
function useRafLock() {
	const [state, setState] = import_react.useState(false);
	const rafRef = import_react.useRef(null);
	const cleanup = () => {
		wrapperRaf.cancel(rafRef.current);
	};
	const setDelayState = (nextState) => {
		cleanup();
		if (nextState) setState(nextState);
		else rafRef.current = wrapperRaf(() => {
			setState(nextState);
		});
	};
	import_react.useEffect(() => cleanup, []);
	return [state, setDelayState];
}
//#endregion
//#region node_modules/antd/es/slider/index.js
function getTipFormatter(tipFormatter) {
	if (tipFormatter || tipFormatter === null) return tipFormatter;
	return (val) => typeof val === "number" ? val.toString() : "";
}
var Slider = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, range, className, rootClassName, style, disabled, tooltip = {}, onChangeComplete, classNames, styles, vertical, orientation, ...restProps } = props;
	const [, mergedVertical] = useOrientation(orientation, vertical);
	const { getPrefixCls, direction: contextDirection, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, getPopupContainer } = useComponentConfig("slider");
	const contextDisabled = import_react.useContext(DisabledContext);
	const mergedDisabled = disabled ?? contextDisabled;
	const mergedProps = {
		...props,
		disabled: mergedDisabled,
		vertical: mergedVertical
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const { handleRender: contextHandleRender, direction: internalContextDirection } = import_react.useContext(SliderInternalContext);
	const isRTL = (internalContextDirection || contextDirection) === "rtl";
	const [hoverOpen, setHoverOpen] = useRafLock();
	const [focusOpen, setFocusOpen] = useRafLock();
	const tooltipProps = { ...tooltip };
	const { open: tooltipOpen, placement: tooltipPlacement, getPopupContainer: getTooltipPopupContainer, prefixCls: customizeTooltipPrefixCls, formatter: tipFormatter } = tooltipProps;
	const lockOpen = tooltipOpen;
	const activeOpen = (hoverOpen || focusOpen) && lockOpen !== false;
	const mergedTipFormatter = getTipFormatter(tipFormatter);
	const [dragging, setDragging] = useRafLock();
	const onInternalChangeComplete = (nextValues) => {
		onChangeComplete?.(nextValues);
		setDragging(false);
	};
	const getTooltipPlacement = (placement, vert) => {
		if (placement) return placement;
		if (!vert) return "top";
		return isRTL ? "left" : "right";
	};
	const prefixCls = getPrefixCls("slider", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$13(prefixCls);
	const rootClassNames = clsx(className, contextClassName, mergedClassNames.root, rootClassName, {
		[`${prefixCls}-rtl`]: isRTL,
		[`${prefixCls}-lock`]: dragging
	}, hashId, cssVarCls);
	if (isRTL && !mergedVertical) restProps.reverse = !restProps.reverse;
	import_react.useEffect(() => {
		const onMouseUp = () => {
			wrapperRaf(() => {
				setFocusOpen(false);
			}, 1);
		};
		document.addEventListener("mouseup", onMouseUp);
		return () => {
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, []);
	const useActiveTooltipHandle = range && !lockOpen;
	const handleRender = contextHandleRender || ((node, info) => {
		const { index } = info;
		const nodeProps = node.props;
		function proxyEvent(eventName, event, triggerRestPropsEvent) {
			if (triggerRestPropsEvent) restProps[eventName]?.(event);
			nodeProps[eventName]?.(event);
		}
		const passedProps = {
			...nodeProps,
			onMouseEnter: (e) => {
				setHoverOpen(true);
				proxyEvent("onMouseEnter", e);
			},
			onMouseLeave: (e) => {
				setHoverOpen(false);
				proxyEvent("onMouseLeave", e);
			},
			onMouseDown: (e) => {
				setFocusOpen(true);
				setDragging(true);
				proxyEvent("onMouseDown", e);
			},
			onFocus: (e) => {
				setFocusOpen(true);
				restProps.onFocus?.(e);
				proxyEvent("onFocus", e, true);
			},
			onBlur: (e) => {
				setFocusOpen(false);
				restProps.onBlur?.(e);
				proxyEvent("onBlur", e, true);
			}
		};
		const cloneNode = /* @__PURE__ */ import_react.cloneElement(node, passedProps);
		const open = (!!lockOpen || activeOpen) && mergedTipFormatter !== null;
		if (!useActiveTooltipHandle) return /* @__PURE__ */ import_react.createElement(SliderTooltip, {
			...tooltipProps,
			prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls),
			title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
			value: info.value,
			open,
			placement: getTooltipPlacement(tooltipPlacement, mergedVertical),
			key: index,
			classNames: { root: `${prefixCls}-tooltip` },
			getPopupContainer: getTooltipPopupContainer || getPopupContainer
		}, cloneNode);
		return cloneNode;
	});
	const activeHandleRender = useActiveTooltipHandle ? (handle, info) => {
		const cloneNode = /* @__PURE__ */ import_react.cloneElement(handle, { style: {
			...handle.props.style,
			visibility: "hidden"
		} });
		return /* @__PURE__ */ import_react.createElement(SliderTooltip, {
			...tooltipProps,
			prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls),
			title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
			open: mergedTipFormatter !== null && activeOpen,
			placement: getTooltipPlacement(tooltipPlacement, mergedVertical),
			key: "tooltip",
			classNames: { root: `${prefixCls}-tooltip` },
			getPopupContainer: getTooltipPopupContainer || getPopupContainer,
			draggingDelete: info.draggingDelete
		}, cloneNode);
	} : void 0;
	const rootStyle = {
		...mergedStyles.root,
		...contextStyle,
		...style
	};
	return /* @__PURE__ */ import_react.createElement(es_default$7, {
		...restProps,
		classNames: mergedClassNames,
		styles: mergedStyles,
		step: restProps.step,
		range,
		className: rootClassNames,
		style: rootStyle,
		disabled: mergedDisabled,
		vertical: mergedVertical,
		ref,
		prefixCls,
		handleRender,
		activeHandleRender,
		onChangeComplete: onInternalChangeComplete
	});
});
//#endregion
//#region node_modules/antd/es/date-picker/hooks/useMergedPickerSemantic.js
var useMergedPickerSemantic = (pickerType, classNames, styles, popupClassName, popupStyle, mergedProps) => {
	const { classNames: contextClassNames, styles: contextStyles } = useComponentConfig(pickerType);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps }, { popup: { _default: "root" } });
	return import_react.useMemo(() => {
		return [{
			...mergedClassNames,
			popup: {
				...mergedClassNames.popup,
				root: clsx(mergedClassNames.popup?.root, popupClassName)
			}
		}, {
			...mergedStyles,
			popup: {
				...mergedStyles.popup,
				root: {
					...mergedStyles.popup?.root,
					...popupStyle
				}
			}
		}];
	}, [
		mergedClassNames,
		mergedStyles,
		popupClassName,
		popupStyle
	]);
};
//#endregion
//#region node_modules/antd/es/date-picker/util.js
function getPlaceholder(locale, picker, customizePlaceholder) {
	if (customizePlaceholder !== void 0) return customizePlaceholder;
	if (picker === "year" && locale.lang.yearPlaceholder) return locale.lang.yearPlaceholder;
	if (picker === "quarter" && locale.lang.quarterPlaceholder) return locale.lang.quarterPlaceholder;
	if (picker === "month" && locale.lang.monthPlaceholder) return locale.lang.monthPlaceholder;
	if (picker === "week" && locale.lang.weekPlaceholder) return locale.lang.weekPlaceholder;
	if (picker === "time" && locale.timePickerLocale.placeholder) return locale.timePickerLocale.placeholder;
	return locale.lang.placeholder;
}
function getRangePlaceholder(locale, picker, customizePlaceholder) {
	if (customizePlaceholder !== void 0) return customizePlaceholder;
	if (picker === "year" && locale.lang.yearPlaceholder) return locale.lang.rangeYearPlaceholder;
	if (picker === "quarter" && locale.lang.quarterPlaceholder) return locale.lang.rangeQuarterPlaceholder;
	if (picker === "month" && locale.lang.monthPlaceholder) return locale.lang.rangeMonthPlaceholder;
	if (picker === "week" && locale.lang.weekPlaceholder) return locale.lang.rangeWeekPlaceholder;
	if (picker === "time" && locale.timePickerLocale.placeholder) return locale.timePickerLocale.rangePlaceholder;
	return locale.lang.rangePlaceholder;
}
function useIcons(props, prefixCls) {
	const { allowClear = true } = props;
	const { clearIcon, removeIcon } = useIcons$1({
		...props,
		prefixCls,
		componentName: "DatePicker"
	});
	return [import_react.useMemo(() => {
		if (allowClear === false) return false;
		return {
			clearIcon,
			...allowClear === true ? {} : allowClear
		};
	}, [allowClear, clearIcon]), removeIcon];
}
//#endregion
//#region node_modules/antd/es/date-picker/generatePicker/constant.js
var [WEEK, WEEKPICKER] = ["week", "WeekPicker"];
var [MONTH, MONTHPICKER] = ["month", "MonthPicker"];
var [YEAR, YEARPICKER] = ["year", "YearPicker"];
var [QUARTER, QUARTERPICKER] = ["quarter", "QuarterPicker"];
var [TIME, TIMEPICKER] = ["time", "TimePicker"];
//#endregion
//#region node_modules/antd/es/date-picker/generatePicker/useSuffixIcon.js
var useSuffixIcon = ({ picker, hasFeedback, feedbackIcon, suffixIcon }) => {
	if (suffixIcon === null || suffixIcon === false) return null;
	if (suffixIcon === true || suffixIcon === void 0) return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, picker === TIME ? /* @__PURE__ */ import_react.createElement(RefIcon$13, null) : /* @__PURE__ */ import_react.createElement(RefIcon$14, null), hasFeedback && feedbackIcon);
	return suffixIcon;
};
//#endregion
//#region node_modules/antd/es/date-picker/PickerButton.js
var PickerButton = (props) => /* @__PURE__ */ import_react.createElement(Button, {
	size: "small",
	type: "primary",
	...props
});
//#endregion
//#region node_modules/antd/es/date-picker/generatePicker/useComponents.js
function useComponents(components) {
	return (0, import_react.useMemo)(() => ({
		button: PickerButton,
		...components
	}), [components]);
}
//#endregion
//#region node_modules/antd/es/date-picker/generatePicker/generateRangePicker.js
var generateRangePicker = (generateConfig) => {
	return /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
		const { prefixCls: customizePrefixCls, getPopupContainer: customGetPopupContainer, components, className, style, classNames, styles, placement, size: customizeSize, disabled: customDisabled, bordered = true, placeholder, status: customStatus, variant: customVariant, picker, dropdownClassName, popupClassName, popupStyle, rootClassName, suffixIcon, separator, ...restProps } = props;
		const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(picker === TIME ? "timePicker" : "datePicker", classNames, styles, popupClassName || dropdownClassName, popupStyle);
		const innerRef = import_react.useRef(null);
		const { getPrefixCls, direction, getPopupContainer, rangePicker } = (0, import_react.useContext)(ConfigContext);
		const prefixCls = getPrefixCls("picker", customizePrefixCls);
		const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
		const rootPrefixCls = getPrefixCls();
		const mergedSeparator = separator ?? rangePicker?.separator;
		const [variant, enableVariantCls] = useVariant("rangePicker", customVariant, bordered);
		const rootCls = useCSSVarCls(prefixCls);
		const [hashId, cssVarCls] = style_default$19(prefixCls, rootCls);
		const mergedRootClassName = clsx(hashId, cssVarCls, rootCls, rootClassName);
		const [mergedAllowClear] = useIcons(props, prefixCls);
		const mergedComponents = useComponents(components);
		const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
		const disabled = import_react.useContext(DisabledContext);
		const mergedDisabled = customDisabled ?? disabled;
		const { hasFeedback, status: contextStatus, feedbackIcon } = (0, import_react.useContext)(FormItemInputContext);
		const mergedSuffixIcon = useSuffixIcon({
			picker,
			hasFeedback,
			feedbackIcon,
			suffixIcon
		});
		(0, import_react.useImperativeHandle)(ref, () => innerRef.current);
		const [contextLocale] = useLocale("Calendar", locale);
		const locale$5 = merge(contextLocale, props.locale || {});
		const [zIndex] = useZIndex("DatePicker", mergedStyles?.popup?.root?.zIndex);
		return /* @__PURE__ */ import_react.createElement(ContextIsolator, { space: true }, /* @__PURE__ */ import_react.createElement(RefRangePicker, {
			separator: /* @__PURE__ */ import_react.createElement("span", {
				"aria-label": "to",
				className: `${prefixCls}-separator`
			}, mergedSeparator ?? /* @__PURE__ */ import_react.createElement(RefIcon$15, null)),
			disabled: mergedDisabled,
			ref: innerRef,
			placement,
			placeholder: getRangePlaceholder(locale$5, picker, placeholder),
			suffixIcon: mergedSuffixIcon,
			prevIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-prev-icon` }),
			nextIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-next-icon` }),
			superPrevIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-super-prev-icon` }),
			superNextIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-super-next-icon` }),
			transitionName: `${rootPrefixCls}-slide-up`,
			picker,
			...restProps,
			locale: locale$5.lang,
			getPopupContainer: customGetPopupContainer || getPopupContainer,
			generateConfig,
			components: mergedComponents,
			direction,
			prefixCls,
			rootClassName: mergedRootClassName,
			className: clsx({
				[`${prefixCls}-large`]: mergedSize === "large",
				[`${prefixCls}-small`]: mergedSize === "small",
				[`${prefixCls}-${variant}`]: enableVariantCls
			}, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), compactItemClassnames, className, rangePicker?.className),
			style: {
				...rangePicker?.style,
				...style
			},
			classNames: mergedClassNames,
			styles: {
				...mergedStyles,
				popup: {
					...mergedStyles.popup,
					root: {
						...mergedStyles.popup.root,
						zIndex
					}
				}
			},
			allowClear: mergedAllowClear
		}));
	});
};
//#endregion
//#region node_modules/antd/es/date-picker/generatePicker/generateSinglePicker.js
var generatePicker$1 = (generateConfig) => {
	const getPicker = (picker, displayName) => {
		const pickerType = displayName === TIMEPICKER ? "timePicker" : "datePicker";
		return /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
			const { prefixCls: customizePrefixCls, getPopupContainer: customizeGetPopupContainer, components, style, className, size: customizeSize, bordered, placement, placeholder, disabled: customDisabled, status: customStatus, variant: customVariant, onCalendarChange, classNames, styles, dropdownClassName, popupClassName, popupStyle, rootClassName, suffixIcon, ...restProps } = props;
			const { suffixIcon: contextSuffixIcon } = useComponentConfig(displayName === TIMEPICKER ? "timePicker" : "datePicker");
			const { getPrefixCls, direction, getPopupContainer, [pickerType]: contextPickerConfig } = (0, import_react.useContext)(ConfigContext);
			const prefixCls = getPrefixCls("picker", customizePrefixCls);
			const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
			const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
			const disabled = import_react.useContext(DisabledContext);
			const mergedDisabled = customDisabled ?? disabled;
			const mergedProps = {
				...props,
				size: mergedSize,
				disabled: mergedDisabled,
				status: customStatus,
				variant: customVariant
			};
			const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(pickerType, classNames, styles, popupClassName || dropdownClassName, popupStyle, mergedProps);
			const innerRef = import_react.useRef(null);
			const [variant, enableVariantCls] = useVariant("datePicker", customVariant, bordered);
			const rootCls = useCSSVarCls(prefixCls);
			const [hashId, cssVarCls] = style_default$19(prefixCls, rootCls);
			const mergedRootClassName = clsx(hashId, cssVarCls, rootCls, rootClassName);
			(0, import_react.useImperativeHandle)(ref, () => innerRef.current);
			const additionalProps = { showToday: true };
			const mergedPicker = picker || props.picker;
			const rootPrefixCls = getPrefixCls();
			const { onSelect, multiple } = restProps;
			const hasLegacyOnSelect = onSelect && picker === "time" && !multiple;
			const onInternalCalendarChange = (date, dateStr, info) => {
				onCalendarChange?.(date, dateStr, info);
				if (hasLegacyOnSelect) onSelect(date);
			};
			const [mergedAllowClear, removeIcon] = useIcons(props, prefixCls);
			const mergedComponents = useComponents(components);
			const { hasFeedback, status: contextStatus, feedbackIcon } = (0, import_react.useContext)(FormItemInputContext);
			const mergedSuffixIcon = useSuffixIcon({
				picker: mergedPicker,
				hasFeedback,
				feedbackIcon,
				suffixIcon: suffixIcon === void 0 ? contextSuffixIcon : suffixIcon
			});
			const [contextLocale] = useLocale("DatePicker", locale);
			const locale$4 = merge(contextLocale, props.locale || {});
			const [zIndex] = useZIndex("DatePicker", mergedStyles?.popup?.root?.zIndex);
			return /* @__PURE__ */ import_react.createElement(ContextIsolator, { space: true }, /* @__PURE__ */ import_react.createElement(es_default$8, {
				ref: innerRef,
				placeholder: getPlaceholder(locale$4, mergedPicker, placeholder),
				suffixIcon: mergedSuffixIcon,
				placement,
				prevIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-prev-icon` }),
				nextIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-next-icon` }),
				superPrevIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-super-prev-icon` }),
				superNextIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-super-next-icon` }),
				transitionName: `${rootPrefixCls}-slide-up`,
				picker,
				onCalendarChange: onInternalCalendarChange,
				...additionalProps,
				...restProps,
				locale: locale$4.lang,
				getPopupContainer: customizeGetPopupContainer || getPopupContainer,
				generateConfig,
				components: mergedComponents,
				direction,
				disabled: mergedDisabled,
				prefixCls,
				rootClassName: mergedRootClassName,
				className: clsx({
					[`${prefixCls}-large`]: mergedSize === "large",
					[`${prefixCls}-small`]: mergedSize === "small",
					[`${prefixCls}-${variant}`]: enableVariantCls
				}, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), compactItemClassnames, contextPickerConfig?.className, className),
				style: {
					...contextPickerConfig?.style,
					...style
				},
				classNames: mergedClassNames,
				styles: {
					...mergedStyles,
					popup: {
						...mergedStyles.popup,
						root: {
							...mergedStyles.popup.root,
							zIndex
						}
					}
				},
				allowClear: mergedAllowClear,
				removeIcon
			}));
		});
	};
	const DatePicker = getPicker();
	const WeekPicker = getPicker(WEEK, WEEKPICKER);
	const MonthPicker = getPicker(MONTH, MONTHPICKER);
	const YearPicker = getPicker(YEAR, YEARPICKER);
	const QuarterPicker = getPicker(QUARTER, QUARTERPICKER);
	return {
		DatePicker,
		WeekPicker,
		MonthPicker,
		YearPicker,
		TimePicker: getPicker(TIME, TIMEPICKER),
		QuarterPicker
	};
};
//#endregion
//#region node_modules/antd/es/date-picker/generatePicker/index.js
var generatePicker = (generateConfig) => {
	const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker } = generatePicker$1(generateConfig);
	const RangePicker = generateRangePicker(generateConfig);
	const MergedDatePicker = DatePicker;
	MergedDatePicker.WeekPicker = WeekPicker;
	MergedDatePicker.MonthPicker = MonthPicker;
	MergedDatePicker.YearPicker = YearPicker;
	MergedDatePicker.RangePicker = RangePicker;
	MergedDatePicker.TimePicker = TimePicker;
	MergedDatePicker.QuarterPicker = QuarterPicker;
	return MergedDatePicker;
};
//#endregion
//#region node_modules/antd/es/date-picker/index.js
var DatePicker = generatePicker(generateConfig);
DatePicker._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(DatePicker, "popupAlign", void 0, "picker");
DatePicker._InternalRangePanelDoNotUseOrYouWillBeFired = genPurePanel(DatePicker.RangePicker, "popupAlign", void 0, "picker");
DatePicker.generatePicker = generatePicker;
//#endregion
//#region node_modules/antd/es/drawer/DrawerPanel.js
var DrawerPanel = (props) => {
	const { prefixCls, ariaId, title, footer, extra, closable, loading, onClose, headerStyle, bodyStyle, footerStyle, children, classNames: drawerClassNames, styles: drawerStyles } = props;
	const drawerContext = useComponentConfig("drawer");
	const { classNames: contextClassNames, styles: contextStyles, closable: contextClosable } = drawerContext;
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, drawerClassNames], [contextStyles, drawerStyles], { props: {
		...props,
		closable: closable ?? contextClosable
	} });
	const closablePlacement = import_react.useMemo(() => {
		const merged = closable ?? contextClosable;
		if (merged === false) return;
		if (typeof merged === "object" && merged?.placement === "end") return "end";
		return "start";
	}, [closable, contextClosable]);
	const customCloseIconRender = import_react.useCallback((icon) => /* @__PURE__ */ import_react.createElement("button", {
		type: "button",
		onClick: onClose,
		className: clsx(`${prefixCls}-close`, { [`${prefixCls}-close-${closablePlacement}`]: closablePlacement === "end" }, mergedClassNames.close),
		style: mergedStyles.close
	}, icon), [
		onClose,
		prefixCls,
		closablePlacement,
		mergedClassNames.close,
		mergedStyles.close
	]);
	const [mergedClosable, mergedCloseIcon] = useClosable(pickClosable(props), pickClosable(drawerContext), {
		closable: true,
		closeIconRender: customCloseIconRender
	});
	const renderHeader = () => {
		if (!title && !mergedClosable) return null;
		return /* @__PURE__ */ import_react.createElement("div", {
			style: {
				...mergedStyles.header,
				...headerStyle
			},
			className: clsx(`${prefixCls}-header`, mergedClassNames.header, { [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra })
		}, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-header-title` }, closablePlacement === "start" && mergedCloseIcon, title && /* @__PURE__ */ import_react.createElement("div", {
			className: clsx(`${prefixCls}-title`, mergedClassNames.title),
			style: mergedStyles.title,
			id: ariaId
		}, title)), extra && /* @__PURE__ */ import_react.createElement("div", {
			className: clsx(`${prefixCls}-extra`, mergedClassNames.extra),
			style: mergedStyles.extra
		}, extra), closablePlacement === "end" && mergedCloseIcon);
	};
	const renderFooter = () => {
		if (!footer) return null;
		return /* @__PURE__ */ import_react.createElement("div", {
			className: clsx(`${prefixCls}-footer`, mergedClassNames.footer),
			style: {
				...mergedStyles.footer,
				...footerStyle
			}
		}, footer);
	};
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, renderHeader(), /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-body`, mergedClassNames.body),
		style: {
			...mergedStyles.body,
			...bodyStyle
		}
	}, loading ? /* @__PURE__ */ import_react.createElement(skeleton_default, {
		active: true,
		title: false,
		paragraph: { rows: 5 },
		className: `${prefixCls}-body-skeleton`
	}) : children), renderFooter());
};
//#endregion
//#region node_modules/antd/es/drawer/style/motion.js
var getMoveTranslate = (direction) => {
	const value = "100%";
	return {
		left: `translateX(-${value})`,
		right: `translateX(${value})`,
		top: `translateY(-${value})`,
		bottom: `translateY(${value})`
	}[direction];
};
var getEnterLeaveStyle = (startStyle, endStyle) => ({
	"&-enter, &-appear": {
		...startStyle,
		"&-active": endStyle
	},
	"&-leave": {
		...endStyle,
		"&-active": startStyle
	}
});
var getFadeStyle = (from, duration) => ({
	"&-enter, &-appear, &-leave": {
		"&-start": { transition: "none" },
		"&-active": { transition: `all ${duration}` }
	},
	...getEnterLeaveStyle({ opacity: from }, { opacity: 1 })
});
var getPanelMotionStyles = (direction, duration) => [getFadeStyle(.7, duration), getEnterLeaveStyle({ transform: getMoveTranslate(direction) }, { transform: "none" })];
var genMotionStyle$1 = (token) => {
	const { componentCls, motionDurationSlow } = token;
	return { [componentCls]: {
		[`${componentCls}-mask-motion`]: getFadeStyle(0, motionDurationSlow),
		[`${componentCls}-panel-motion`]: [
			"left",
			"right",
			"top",
			"bottom"
		].reduce((obj, direction) => {
			return {
				...obj,
				[`&-${direction}`]: getPanelMotionStyles(direction, motionDurationSlow)
			};
		}, {})
	} };
};
//#endregion
//#region node_modules/antd/es/drawer/style/index.js
var genDrawerStyle = (token) => {
	const { borderRadiusSM, componentCls, zIndexPopup, colorBgMask, colorBgElevated, motionDurationSlow, motionDurationMid, paddingXS, padding, paddingLG, fontSizeLG, lineHeightLG, lineWidth, lineType, colorSplit, marginXS, colorIcon, colorIconHover, colorBgTextHover, colorBgTextActive, colorText, fontWeightStrong, footerPaddingBlock, footerPaddingInline, draggerSize, calc } = token;
	const wrapperCls = `${componentCls}-content-wrapper`;
	const draggerCls = `${componentCls}-resizable-dragger`;
	return { [componentCls]: {
		position: "fixed",
		inset: 0,
		zIndex: zIndexPopup,
		pointerEvents: "none",
		color: colorText,
		"&-pure": {
			position: "relative",
			background: colorBgElevated,
			display: "flex",
			flexDirection: "column",
			pointerEvents: "auto",
			[`&${componentCls}-left`]: { boxShadow: token.boxShadowDrawerLeft },
			[`&${componentCls}-right`]: { boxShadow: token.boxShadowDrawerRight },
			[`&${componentCls}-top`]: { boxShadow: token.boxShadowDrawerUp },
			[`&${componentCls}-bottom`]: { boxShadow: token.boxShadowDrawerDown }
		},
		"&-inline": { position: "absolute" },
		[`${componentCls}-mask`]: {
			position: "absolute",
			inset: 0,
			zIndex: zIndexPopup,
			background: colorBgMask,
			pointerEvents: "auto",
			[`&${componentCls}-mask-blur`]: { backdropFilter: "blur(4px)" }
		},
		[wrapperCls]: {
			position: "absolute",
			zIndex: zIndexPopup,
			maxWidth: "100vw",
			transition: `all ${motionDurationSlow}`,
			"&-hidden": { display: "none" }
		},
		[`&-left > ${wrapperCls}`]: {
			top: 0,
			bottom: 0,
			left: {
				_skip_check_: true,
				value: 0
			},
			boxShadow: token.boxShadowDrawerLeft
		},
		[`&-right > ${wrapperCls}`]: {
			top: 0,
			right: {
				_skip_check_: true,
				value: 0
			},
			bottom: 0,
			boxShadow: token.boxShadowDrawerRight
		},
		[`&-top > ${wrapperCls}`]: {
			top: 0,
			insetInline: 0,
			boxShadow: token.boxShadowDrawerUp
		},
		[`&-bottom > ${wrapperCls}`]: {
			bottom: 0,
			insetInline: 0,
			boxShadow: token.boxShadowDrawerDown
		},
		[`${componentCls}-section`]: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			overflow: "auto",
			background: colorBgElevated,
			pointerEvents: "auto"
		},
		[`${componentCls}-header`]: {
			display: "flex",
			flex: 0,
			alignItems: "center",
			padding: `${unit(padding)} ${unit(paddingLG)}`,
			fontSize: fontSizeLG,
			lineHeight: lineHeightLG,
			borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
			"&-title": {
				display: "flex",
				flex: 1,
				alignItems: "center",
				minWidth: 0,
				minHeight: 0
			}
		},
		[`${componentCls}-extra`]: { flex: "none" },
		[`${componentCls}-close`]: {
			display: "inline-flex",
			width: calc(fontSizeLG).add(paddingXS).equal(),
			height: calc(fontSizeLG).add(paddingXS).equal(),
			borderRadius: borderRadiusSM,
			justifyContent: "center",
			alignItems: "center",
			color: colorIcon,
			fontWeight: fontWeightStrong,
			fontSize: fontSizeLG,
			fontStyle: "normal",
			lineHeight: 1,
			textAlign: "center",
			textTransform: "none",
			textDecoration: "none",
			background: "transparent",
			border: 0,
			cursor: "pointer",
			transition: `all ${motionDurationMid}`,
			textRendering: "auto",
			[`&${componentCls}-close-end`]: { marginInlineStart: marginXS },
			[`&:not(${componentCls}-close-end)`]: { marginInlineEnd: marginXS },
			"&:hover": {
				color: colorIconHover,
				backgroundColor: colorBgTextHover,
				textDecoration: "none"
			},
			"&:active": { backgroundColor: colorBgTextActive },
			...genFocusStyle(token)
		},
		[`${componentCls}-title`]: {
			flex: 1,
			margin: 0,
			fontWeight: token.fontWeightStrong,
			fontSize: fontSizeLG,
			lineHeight: lineHeightLG
		},
		[`${componentCls}-body`]: {
			flex: 1,
			minWidth: 0,
			minHeight: 0,
			padding: paddingLG,
			overflow: "auto",
			[`${componentCls}-body-skeleton`]: {
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center"
			}
		},
		[`${componentCls}-footer`]: {
			flexShrink: 0,
			padding: `${unit(footerPaddingBlock)} ${unit(footerPaddingInline)}`,
			borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`
		},
		[draggerCls]: {
			position: "absolute",
			zIndex: 1,
			backgroundColor: "transparent",
			userSelect: "none",
			pointerEvents: "auto",
			"&:hover": {
				backgroundColor: token.colorPrimary,
				opacity: .2
			},
			"&-dragging": {
				backgroundColor: token.colorPrimary,
				opacity: .3
			}
		},
		[`${draggerCls}-left`]: {
			top: 0,
			bottom: 0,
			right: {
				_skip_check_: true,
				value: 0
			},
			width: draggerSize,
			cursor: "col-resize"
		},
		[`${draggerCls}-right`]: {
			top: 0,
			bottom: 0,
			left: {
				_skip_check_: true,
				value: 0
			},
			width: draggerSize,
			cursor: "col-resize"
		},
		[`${draggerCls}-top`]: {
			insetInline: 0,
			bottom: 0,
			height: draggerSize,
			cursor: "row-resize"
		},
		[`${draggerCls}-bottom`]: {
			insetInline: 0,
			top: 0,
			height: draggerSize,
			cursor: "row-resize"
		},
		[`${wrapperCls}-dragging`]: {
			userSelect: "none",
			transition: "none",
			willChange: "width, height",
			[`${componentCls}-content`]: { pointerEvents: "none" },
			[`${componentCls}-section`]: { pointerEvents: "none" }
		},
		"&-rtl": { direction: "rtl" }
	} };
};
var prepareComponentToken$11 = (token) => ({
	zIndexPopup: token.zIndexPopupBase,
	footerPaddingBlock: token.paddingXS,
	footerPaddingInline: token.padding,
	draggerSize: 4
});
var style_default$12 = genStyleHooks("Drawer", (token) => {
	const drawerToken = merge$1(token, {});
	return [genDrawerStyle(drawerToken), genMotionStyle$1(drawerToken)];
}, prepareComponentToken$11);
//#endregion
//#region node_modules/antd/es/drawer/Drawer.js
var DEFAULT_PUSH_STATE = { distance: 180 };
var DEFAULT_SIZE = 378;
var MOTION_CONFIG = {
	motionAppear: true,
	motionEnter: true,
	motionLeave: true,
	motionDeadline: 500
};
var Drawer = (props) => {
	const { rootClassName, size, defaultSize = DEFAULT_SIZE, height, width, mask: drawerMask, push = DEFAULT_PUSH_STATE, open, afterOpenChange, onClose, prefixCls: customizePrefixCls, getContainer: customizeGetContainer, panelRef = null, style, className, resizable, "aria-labelledby": ariaLabelledby, focusable, maskClosable, maskStyle, drawerStyle, contentWrapperStyle, destroyOnClose, destroyOnHidden, ...rest } = props;
	const { placement } = rest;
	const id = useId_default();
	const ariaId = rest.title ? id : void 0;
	const { getPopupContainer, getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, mask: contextMask } = useComponentConfig("drawer");
	const prefixCls = getPrefixCls("drawer", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$12(prefixCls);
	const getContainer = customizeGetContainer === void 0 && getPopupContainer ? () => getPopupContainer(document.body) : customizeGetContainer;
	const drawerSize = import_react.useMemo(() => {
		if (typeof size === "number") return size;
		if (size === "large") return 736;
		if (size === "default") return DEFAULT_SIZE;
		if (typeof size === "string") {
			if (/^\d+(\.\d+)?$/.test(size)) return Number(size);
			return size;
		}
		if (!placement || placement === "left" || placement === "right") return width;
		return height;
	}, [
		size,
		placement,
		width,
		height
	]);
	const maskMotion = {
		motionName: getTransitionName(prefixCls, "mask-motion"),
		...MOTION_CONFIG
	};
	const panelMotion = (motionPlacement) => ({
		motionName: getTransitionName(prefixCls, `panel-motion-${motionPlacement}`),
		...MOTION_CONFIG
	});
	const mergedPanelRef = composeRef(panelRef, usePanelRef());
	const [zIndex, contextZIndex] = useZIndex("Drawer", rest.zIndex);
	const [mergedMask, maskBlurClassName, mergedMaskClosable] = useMergedMask(drawerMask, contextMask, prefixCls, maskClosable);
	const mergedFocusable = useFocusable(focusable, getContainer !== false && mergedMask);
	const { classNames, styles, rootStyle } = rest;
	const mergedProps = {
		...props,
		zIndex,
		panelRef,
		mask: mergedMask,
		maskClosable: mergedMaskClosable,
		defaultSize,
		push,
		focusable: mergedFocusable
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const drawerClassName = clsx({
		"no-mask": !mergedMask,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, rootClassName, hashId, cssVarCls, mergedClassNames.root);
	return /* @__PURE__ */ import_react.createElement(ContextIsolator, {
		form: true,
		space: true
	}, /* @__PURE__ */ import_react.createElement(ZIndexContext.Provider, { value: contextZIndex }, /* @__PURE__ */ import_react.createElement(es_default$9, {
		prefixCls,
		onClose,
		maskMotion,
		motion: panelMotion,
		...rest,
		classNames: {
			mask: clsx(mergedClassNames.mask, maskBlurClassName.mask),
			section: mergedClassNames.section,
			wrapper: mergedClassNames.wrapper,
			dragger: mergedClassNames.dragger
		},
		styles: {
			mask: {
				...mergedStyles.mask,
				...maskStyle
			},
			section: {
				...mergedStyles.section,
				...drawerStyle
			},
			wrapper: {
				...mergedStyles.wrapper,
				...contentWrapperStyle
			},
			dragger: mergedStyles.dragger
		},
		open,
		mask: mergedMask,
		maskClosable: mergedMaskClosable,
		push,
		size: drawerSize,
		defaultSize,
		style: {
			...contextStyle,
			...style
		},
		rootStyle: {
			...rootStyle,
			...mergedStyles.root
		},
		className: clsx(contextClassName, className),
		rootClassName: drawerClassName,
		getContainer,
		afterOpenChange,
		panelRef: mergedPanelRef,
		zIndex,
		...resizable ? { resizable } : {},
		"aria-labelledby": ariaLabelledby ?? ariaId,
		destroyOnHidden: destroyOnHidden ?? destroyOnClose,
		focusTriggerAfterClose: mergedFocusable.focusTriggerAfterClose,
		focusTrap: mergedFocusable.trap
	}, /* @__PURE__ */ import_react.createElement(DrawerPanel, {
		prefixCls,
		size,
		...rest,
		ariaId,
		onClose
	}))));
};
/** @private Internal Component. Do not use in your production. */
var PurePanel$3 = (props) => {
	const { prefixCls: customizePrefixCls, style, className, placement = "right", ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("drawer", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$12(prefixCls);
	const cls = clsx(prefixCls, `${prefixCls}-pure`, `${prefixCls}-${placement}`, hashId, cssVarCls, className);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: cls,
		style
	}, /* @__PURE__ */ import_react.createElement(DrawerPanel, {
		prefixCls,
		...restProps
	}));
};
Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$3;
//#endregion
//#region node_modules/antd/es/drawer/index.js
var drawer_default = Drawer;
//#endregion
//#region node_modules/antd/es/_util/gapSize.js
function isPresetSize(size) {
	return [
		"small",
		"middle",
		"medium",
		"large"
	].includes(size);
}
function isValidGapNumber(size) {
	if (!size) return false;
	return typeof size === "number" && !Number.isNaN(size);
}
//#endregion
//#region node_modules/antd/es/space/context.js
var SpaceContext = /* @__PURE__ */ import_react.createContext({ latestIndex: 0 });
var SpaceContextProvider = SpaceContext.Provider;
//#endregion
//#region node_modules/antd/es/space/Item.js
var Item$1 = (props) => {
	const { className, prefix, index, children, separator, style, classNames, styles } = props;
	const { latestIndex } = import_react.useContext(SpaceContext);
	if (!isNonNullable(children)) return null;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("div", {
		className,
		style
	}, children), index < latestIndex && separator && /* @__PURE__ */ import_react.createElement("span", {
		className: clsx(`${prefix}-item-separator`, classNames?.separator),
		style: styles?.separator
	}, separator));
};
//#endregion
//#region node_modules/antd/es/space/style/index.js
var genSpaceStyle = (token) => {
	const { componentCls, antCls } = token;
	return { [componentCls]: {
		display: "inline-flex",
		"&-rtl": { direction: "rtl" },
		"&-vertical": { flexDirection: "column" },
		"&-align": {
			flexDirection: "column",
			"&-center": { alignItems: "center" },
			"&-start": { alignItems: "flex-start" },
			"&-end": { alignItems: "flex-end" },
			"&-baseline": { alignItems: "baseline" }
		},
		[`${componentCls}-item:empty`]: { display: "none" },
		[`${componentCls}-item > ${antCls}-badge-not-a-wrapper:only-child`]: { display: "block" }
	} };
};
var genSpaceGapStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		"&-gap-row-small": { rowGap: token.spaceGapSmallSize },
		"&-gap-row-medium, &-gap-row-middle": { rowGap: token.spaceGapMiddleSize },
		"&-gap-row-large": { rowGap: token.spaceGapLargeSize },
		"&-gap-col-small": { columnGap: token.spaceGapSmallSize },
		"&-gap-col-medium, &-gap-col-middle": { columnGap: token.spaceGapMiddleSize },
		"&-gap-col-large": { columnGap: token.spaceGapLargeSize }
	} };
};
var style_default$11 = genStyleHooks("Space", (token) => {
	const spaceToken = merge$1(token, {
		spaceGapSmallSize: token.paddingXS,
		spaceGapMiddleSize: token.padding,
		spaceGapLargeSize: token.paddingLG
	});
	return [genSpaceStyle(spaceToken), genSpaceGapStyle(spaceToken)];
}, () => ({}), { resetStyle: false });
//#endregion
//#region node_modules/antd/es/space/index.js
var Space = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction: directionConfig, size: contextSize, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("space");
	const { size = contextSize ?? "small", align, className, rootClassName, children, direction, orientation, prefixCls: customizePrefixCls, split, separator, style, vertical, wrap = false, classNames, styles, ...restProps } = props;
	const [horizontalSize, verticalSize] = Array.isArray(size) ? size : [size, size];
	const isPresetVerticalSize = isPresetSize(verticalSize);
	const isPresetHorizontalSize = isPresetSize(horizontalSize);
	const isValidVerticalSize = isValidGapNumber(verticalSize);
	const isValidHorizontalSize = isValidGapNumber(horizontalSize);
	const childNodes = toArray$1(children, { keepEmpty: true });
	const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
	const mergedAlign = align === void 0 && !mergedVertical ? "center" : align;
	const mergedSeparator = separator ?? split;
	const prefixCls = getPrefixCls("space", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$11(prefixCls);
	const mergedProps = {
		...props,
		size,
		orientation: mergedOrientation,
		align: mergedAlign
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const rootClassNames = clsx(prefixCls, contextClassName, hashId, `${prefixCls}-${mergedOrientation}`, {
		[`${prefixCls}-rtl`]: directionConfig === "rtl",
		[`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
		[`${prefixCls}-gap-row-${verticalSize}`]: isPresetVerticalSize,
		[`${prefixCls}-gap-col-${horizontalSize}`]: isPresetHorizontalSize
	}, className, rootClassName, cssVarCls, mergedClassNames.root);
	const itemClassName = clsx(`${prefixCls}-item`, mergedClassNames.item);
	const renderedItems = childNodes.map((child, i) => {
		const key = child?.key || `${itemClassName}-${i}`;
		return /* @__PURE__ */ import_react.createElement(Item$1, {
			prefix: prefixCls,
			classNames: mergedClassNames,
			styles: mergedStyles,
			className: itemClassName,
			key,
			index: i,
			separator: mergedSeparator,
			style: mergedStyles.item
		}, child);
	});
	const memoizedSpaceContext = import_react.useMemo(() => {
		return { latestIndex: childNodes.reduce((latest, child, i) => isNonNullable(child) ? i : latest, 0) };
	}, [childNodes]);
	if (childNodes.length === 0) return null;
	const gapStyle = {};
	if (wrap) gapStyle.flexWrap = "wrap";
	if (!isPresetHorizontalSize && isValidHorizontalSize) gapStyle.columnGap = horizontalSize;
	if (!isPresetVerticalSize && isValidVerticalSize) gapStyle.rowGap = verticalSize;
	return /* @__PURE__ */ import_react.createElement("div", {
		ref,
		className: rootClassNames,
		style: {
			...gapStyle,
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		...restProps
	}, /* @__PURE__ */ import_react.createElement(SpaceContextProvider, { value: memoizedSpaceContext }, renderedItems));
});
Space.Compact = Compact;
Space.Addon = SpaceAddon;
//#endregion
//#region node_modules/antd/es/_util/convertToTooltipProps.js
var convertToTooltipProps = (tooltip, context) => {
	if (!isNonNullable(tooltip)) return null;
	if (typeof tooltip === "object" && !/* @__PURE__ */ (0, import_react.isValidElement)(tooltip)) return {
		...context,
		...tooltip
	};
	return {
		...context,
		title: tooltip
	};
};
//#endregion
//#region node_modules/antd/es/form/hooks/useDebounce.js
function useDebounce(value) {
	const [cacheValue, setCacheValue] = import_react.useState(value);
	import_react.useEffect(() => {
		const timeout = setTimeout(() => {
			setCacheValue(value);
		}, value.length ? 0 : 10);
		return () => {
			clearTimeout(timeout);
		};
	}, [value]);
	return cacheValue;
}
//#endregion
//#region node_modules/antd/es/form/style/explain.js
var genFormValidateMotionStyle = (token) => {
	const { componentCls, motionDurationFast, motionEaseInOut } = token;
	const helpCls = `${componentCls}-show-help`;
	const helpItemCls = `${componentCls}-show-help-item`;
	return { [helpCls]: {
		transition: `opacity ${motionDurationFast} ${motionEaseInOut}`,
		"&-appear, &-enter": {
			opacity: 0,
			"&-active": { opacity: 1 }
		},
		"&-leave": {
			opacity: 1,
			"&-active": { opacity: 0 }
		},
		[helpItemCls]: {
			overflow: "hidden",
			transition: `${[
				"height",
				"opacity",
				"transform"
			].map((prop) => `${prop} ${motionDurationFast} ${motionEaseInOut}`).join(", ")} !important`,
			[`&${helpItemCls}-appear, &${helpItemCls}-enter`]: {
				transform: `translateY(-5px)`,
				opacity: 0,
				"&-active": {
					transform: "translateY(0)",
					opacity: 1
				}
			},
			[`&${helpItemCls}-leave-active`]: { transform: `translateY(-5px)` }
		}
	} };
};
//#endregion
//#region node_modules/antd/es/form/style/index.js
var resetForm = (token) => ({
	legend: {
		display: "block",
		width: "100%",
		marginBottom: token.marginLG,
		padding: 0,
		color: token.colorTextDescription,
		fontSize: token.fontSizeLG,
		lineHeight: "inherit",
		border: 0,
		borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
	},
	"input[type=\"search\"]": { boxSizing: "border-box" },
	"input[type=\"radio\"], input[type=\"checkbox\"]": { lineHeight: "normal" },
	"input[type=\"file\"]": { display: "block" },
	"input[type=\"range\"]": {
		display: "block",
		width: "100%"
	},
	"select[multiple], select[size]": { height: "auto" },
	[`input[type='file']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus`]: {
		outline: 0,
		boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
	},
	output: {
		display: "block",
		paddingTop: 15,
		color: token.colorText,
		fontSize: token.fontSize,
		lineHeight: token.lineHeight
	}
});
var genFormSize = (token, height) => {
	const { formItemCls } = token;
	return { [formItemCls]: {
		[`${formItemCls}-label > label`]: { height },
		[`${formItemCls}-control-input`]: { minHeight: height }
	} };
};
var genFormStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		...resetComponent(token),
		...resetForm(token),
		[`${componentCls}-text`]: {
			display: "inline-block",
			paddingInlineEnd: token.paddingSM
		},
		"&-small": { ...genFormSize(token, token.controlHeightSM) },
		"&-large": { ...genFormSize(token, token.controlHeightLG) }
	} };
};
var genFormItemStyle = (token) => {
	const { formItemCls, iconCls, rootPrefixCls, antCls, labelRequiredMarkColor, labelColor, labelFontSize, labelHeight, labelColonMarginInlineStart, labelColonMarginInlineEnd, itemMarginBottom } = token;
	const [varName] = genCssVar(antCls, "grid");
	return { [formItemCls]: {
		...resetComponent(token),
		marginBottom: itemMarginBottom,
		verticalAlign: "top",
		"&-with-help": { transition: "none" },
		[`&-hidden,
        &-hidden${antCls}-row`]: { display: "none" },
		"&-has-warning": { [`${formItemCls}-split`]: { color: token.colorError } },
		"&-has-error": { [`${formItemCls}-split`]: { color: token.colorWarning } },
		[`${formItemCls}-label`]: {
			flexGrow: 0,
			overflow: "hidden",
			whiteSpace: "nowrap",
			textAlign: "end",
			verticalAlign: "middle",
			"&-left": { textAlign: "start" },
			"&-wrap": {
				overflow: "unset",
				lineHeight: token.lineHeight,
				whiteSpace: "unset",
				"> label": {
					verticalAlign: "middle",
					textWrap: "balance"
				}
			},
			"> label": {
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				maxWidth: "100%",
				height: labelHeight,
				color: labelColor,
				fontSize: labelFontSize,
				[`> ${iconCls}`]: {
					fontSize: token.fontSize,
					verticalAlign: "top"
				},
				[`&${formItemCls}-required`]: {
					"&::before": {
						display: "inline-block",
						marginInlineEnd: token.marginXXS,
						color: labelRequiredMarkColor,
						fontSize: token.fontSize,
						fontFamily: "sans-serif",
						lineHeight: 1,
						content: "\"*\""
					},
					[`&${formItemCls}-required-mark-hidden, &${formItemCls}-required-mark-optional`]: { "&::before": { display: "none" } }
				},
				[`${formItemCls}-optional`]: {
					display: "inline-block",
					marginInlineStart: token.marginXXS,
					color: token.colorTextDescription,
					[`&${formItemCls}-required-mark-hidden`]: { display: "none" }
				},
				[`${formItemCls}-tooltip`]: {
					color: token.colorTextDescription,
					cursor: "help",
					writingMode: "horizontal-tb",
					marginInlineStart: token.marginXXS
				},
				"&::after": {
					content: "\":\"",
					position: "relative",
					marginBlock: 0,
					marginInlineStart: labelColonMarginInlineStart,
					marginInlineEnd: labelColonMarginInlineEnd
				},
				[`&${formItemCls}-no-colon::after`]: { content: "\"\\a0\"" }
			}
		},
		[`${formItemCls}-control`]: {
			[varName("display")]: "flex",
			flexDirection: "column",
			flexGrow: 1,
			[`&:first-child:not([class^="'${rootPrefixCls}-col-'"]):not([class*="' ${rootPrefixCls}-col-'"])`]: { width: "100%" },
			"&-input": {
				position: "relative",
				display: "flex",
				alignItems: "center",
				minHeight: token.controlHeight,
				"&-content": {
					flex: "auto",
					maxWidth: "100%",
					[`&:has(> ${antCls}-switch:only-child, > ${antCls}-rate:only-child)`]: {
						display: "flex",
						alignItems: "center"
					}
				}
			}
		},
		[formItemCls]: {
			"&-additional": {
				display: "flex",
				flexDirection: "column"
			},
			"&-explain, &-extra": {
				clear: "both",
				color: token.colorTextDescription,
				fontSize: token.fontSize,
				lineHeight: token.lineHeight
			},
			"&-explain-connected": { width: "100%" },
			"&-extra": {
				minHeight: token.controlHeightSM,
				transition: `color ${token.motionDurationMid} ${token.motionEaseOut}`
			},
			"&-explain": {
				"&-error": { color: token.colorError },
				"&-warning": { color: token.colorWarning }
			}
		},
		[`&-with-help ${formItemCls}-explain`]: {
			height: "auto",
			opacity: 1
		},
		[`${formItemCls}-feedback-icon`]: {
			fontSize: token.fontSize,
			textAlign: "center",
			visibility: "visible",
			animationName: zoomIn,
			animationDuration: token.motionDurationMid,
			animationTimingFunction: token.motionEaseOutBack,
			pointerEvents: "none",
			"&-success": { color: token.colorSuccess },
			"&-error": { color: token.colorError },
			"&-warning": { color: token.colorWarning },
			"&-validating": { color: token.colorPrimary }
		}
	} };
};
var makeVerticalLayoutLabel = (token) => ({
	padding: token.verticalLabelPadding,
	margin: token.verticalLabelMargin,
	whiteSpace: "initial",
	textAlign: "start",
	"> label": {
		margin: 0,
		"&::after": { visibility: "hidden" }
	}
});
var genHorizontalStyle$2 = (token) => {
	const { antCls, formItemCls } = token;
	return { [`${formItemCls}-horizontal`]: {
		[`${formItemCls}-label`]: { flexGrow: 0 },
		[`${formItemCls}-control`]: {
			flex: "1 1 0",
			minWidth: 0
		},
		[`${formItemCls}-label[class$='-24'], ${formItemCls}-label[class*='-24 ']`]: { [`& + ${formItemCls}-control`]: { minWidth: "unset" } },
		[`${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
	} };
};
var genInlineStyle$1 = (token) => {
	const { componentCls, formItemCls, inlineItemMarginBottom } = token;
	return { [`${componentCls}-inline`]: {
		display: "flex",
		flexWrap: "wrap",
		[`${formItemCls}-inline`]: {
			flex: "none",
			marginInlineEnd: token.margin,
			marginBottom: inlineItemMarginBottom,
			"&-row": { flexWrap: "nowrap" },
			[`> ${formItemCls}-label,
        > ${formItemCls}-control`]: {
				display: "inline-block",
				verticalAlign: "top"
			},
			[`> ${formItemCls}-label`]: { flex: "none" },
			[`${componentCls}-text`]: { display: "inline-block" },
			[`${formItemCls}-has-feedback`]: { display: "inline-block" }
		}
	} };
};
var makeVerticalLayout = (token) => {
	const { componentCls, formItemCls, rootPrefixCls } = token;
	return {
		[`${formItemCls} ${formItemCls}-label`]: makeVerticalLayoutLabel(token),
		[`${componentCls}:not(${componentCls}-inline)`]: { [formItemCls]: {
			flexWrap: "wrap",
			[`${formItemCls}-label, ${formItemCls}-control`]: { [`&:not([class*=" ${rootPrefixCls}-col-xs"])`]: {
				flex: "0 0 100%",
				maxWidth: "100%"
			} }
		} }
	};
};
var genVerticalStyle$2 = (token) => {
	const { componentCls, formItemCls, antCls } = token;
	return {
		[`${formItemCls}-vertical`]: {
			[`${formItemCls}-row`]: { flexDirection: "column" },
			[`${formItemCls}-label > label`]: { height: "auto" },
			[`${formItemCls}-control`]: { width: "100%" },
			[`${formItemCls}-label,
        ${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
		},
		[`@media (max-width: ${unit(token.screenXSMax)})`]: [makeVerticalLayout(token), { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-xs-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } }],
		[`@media (max-width: ${unit(token.screenSMMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-sm-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } },
		[`@media (max-width: ${unit(token.screenMDMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-md-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } },
		[`@media (max-width: ${unit(token.screenLGMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-lg-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } }
	};
};
var prepareComponentToken$10 = (token) => ({
	labelRequiredMarkColor: token.colorError,
	labelColor: token.colorTextHeading,
	labelFontSize: token.fontSize,
	labelHeight: token.controlHeight,
	labelColonMarginInlineStart: token.marginXXS / 2,
	labelColonMarginInlineEnd: token.marginXS,
	itemMarginBottom: token.marginLG,
	verticalLabelPadding: `0 0 ${token.paddingXS}px`,
	verticalLabelMargin: 0,
	inlineItemMarginBottom: 0
});
var prepareToken$2 = (token, rootPrefixCls) => {
	return merge$1(token, {
		formItemCls: `${token.componentCls}-item`,
		rootPrefixCls
	});
};
var style_default$10 = genStyleHooks("Form", (token, { rootPrefixCls }) => {
	const formToken = prepareToken$2(token, rootPrefixCls);
	return [
		genFormStyle(formToken),
		genFormItemStyle(formToken),
		genFormValidateMotionStyle(formToken),
		genHorizontalStyle$2(formToken),
		genInlineStyle$1(formToken),
		genVerticalStyle$2(formToken),
		genCollapseMotion(formToken),
		zoomIn
	];
}, prepareComponentToken$10, { order: -1e3 });
//#endregion
//#region node_modules/antd/es/form/ErrorList.js
var EMPTY_LIST = [];
function toErrorEntity(error, prefix, errorStatus, index = 0) {
	return {
		key: typeof error === "string" ? error : `${prefix}-${index}`,
		error,
		errorStatus
	};
}
var ErrorList = ({ help, helpStatus, errors = EMPTY_LIST, warnings = EMPTY_LIST, className: rootClassName, fieldId, onVisibleChanged }) => {
	const { prefixCls } = import_react.useContext(FormItemPrefixContext);
	const baseClassName = `${prefixCls}-item-explain`;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$10(prefixCls, rootCls);
	const collapseMotion = import_react.useMemo(() => initCollapseMotion(prefixCls), [prefixCls]);
	const debounceErrors = useDebounce(errors);
	const debounceWarnings = useDebounce(warnings);
	const fullKeyList = import_react.useMemo(() => {
		if (isNonNullable(help)) return [toErrorEntity(help, "help", helpStatus)];
		return [].concat(_toConsumableArray(debounceErrors.map((error, index) => toErrorEntity(error, "error", "error", index))), _toConsumableArray(debounceWarnings.map((warning, index) => toErrorEntity(warning, "warning", "warning", index))));
	}, [
		help,
		helpStatus,
		debounceErrors,
		debounceWarnings
	]);
	const filledKeyFullKeyList = import_react.useMemo(() => {
		const keysCount = {};
		fullKeyList.forEach(({ key }) => {
			keysCount[key] = (keysCount[key] || 0) + 1;
		});
		return fullKeyList.map((entity, index) => ({
			...entity,
			key: keysCount[entity.key] > 1 ? `${entity.key}-fallback-${index}` : entity.key
		}));
	}, [fullKeyList]);
	const helpProps = {};
	if (fieldId) helpProps.id = `${fieldId}_help`;
	return /* @__PURE__ */ import_react.createElement(es_default, {
		motionDeadline: collapseMotion.motionDeadline,
		motionName: `${prefixCls}-show-help`,
		visible: !!filledKeyFullKeyList.length,
		onVisibleChanged
	}, (holderProps) => {
		const { className: holderClassName, style: holderStyle } = holderProps;
		return /* @__PURE__ */ import_react.createElement("div", {
			...helpProps,
			className: clsx(baseClassName, holderClassName, cssVarCls, rootCls, rootClassName, hashId),
			style: holderStyle
		}, /* @__PURE__ */ import_react.createElement(CSSMotionList_default, {
			keys: filledKeyFullKeyList,
			...initCollapseMotion(prefixCls),
			motionName: `${prefixCls}-show-help-item`,
			component: false
		}, (itemProps) => {
			const { key, error, errorStatus, className: itemClassName, style: itemStyle } = itemProps;
			return /* @__PURE__ */ import_react.createElement("div", {
				key,
				className: clsx(itemClassName, { [`${baseClassName}-${errorStatus}`]: errorStatus }),
				style: itemStyle
			}, error);
		}));
	});
};
//#endregion
//#region node_modules/antd/es/form/Form.js
var InternalForm = (props, ref) => {
	const contextDisabled = import_react.useContext(DisabledContext);
	const { getPrefixCls, direction, requiredMark: contextRequiredMark, colon: contextColon, scrollToFirstError: contextScrollToFirstError, className: contextClassName, style: contextStyle, styles: contextStyles, classNames: contextClassNames, tooltip: contextTooltip } = useComponentConfig("form");
	const { prefixCls: customizePrefixCls, className, rootClassName, size, disabled = contextDisabled, form, colon, labelAlign, labelWrap, labelCol, wrapperCol, layout = "horizontal", scrollToFirstError, requiredMark, onFinishFailed, name, style, feedbackIcons, variant, classNames, styles, tooltip, ...restFormProps } = props;
	const mergedSize = useSize(size);
	const contextValidateMessages = import_react.useContext(validateMessagesContext_default);
	const mergedRequiredMark = import_react.useMemo(() => {
		if (requiredMark !== void 0) return requiredMark;
		if (contextRequiredMark !== void 0) return contextRequiredMark;
		return true;
	}, [requiredMark, contextRequiredMark]);
	const mergedColon = colon ?? contextColon;
	const mergedTooltip = {
		...contextTooltip,
		...tooltip
	};
	const prefixCls = getPrefixCls("form", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$10(prefixCls, rootCls);
	const mergedProps = {
		...props,
		size: mergedSize,
		disabled,
		layout,
		colon: mergedColon,
		requiredMark: mergedRequiredMark
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const formClassName = clsx(prefixCls, `${prefixCls}-${layout}`, {
		[`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-large`]: mergedSize === "large",
		[`${prefixCls}-small`]: mergedSize === "small"
	}, cssVarCls, rootCls, hashId, contextClassName, className, rootClassName, mergedClassNames.root);
	const [wrapForm] = useForm(form);
	const { __INTERNAL__ } = wrapForm;
	__INTERNAL__.name = name;
	const formContextValue = import_react.useMemo(() => ({
		name,
		labelAlign,
		labelCol,
		labelWrap,
		wrapperCol,
		layout,
		colon: mergedColon,
		requiredMark: mergedRequiredMark,
		itemRef: __INTERNAL__.itemRef,
		form: wrapForm,
		feedbackIcons,
		tooltip: mergedTooltip,
		classNames: mergedClassNames,
		styles: mergedStyles
	}), [
		name,
		labelAlign,
		labelCol,
		wrapperCol,
		layout,
		mergedColon,
		mergedRequiredMark,
		wrapForm,
		feedbackIcons,
		mergedClassNames,
		mergedStyles,
		mergedTooltip
	]);
	const nativeElementRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({
		...wrapForm,
		nativeElement: nativeElementRef.current?.nativeElement
	}));
	const scrollToField = (options, fieldName) => {
		if (options) {
			let defaultScrollToFirstError = { block: "nearest" };
			if (typeof options === "object") defaultScrollToFirstError = {
				...defaultScrollToFirstError,
				...options
			};
			wrapForm.scrollToField(fieldName, defaultScrollToFirstError);
		}
	};
	const onInternalFinishFailed = (errorInfo) => {
		onFinishFailed?.(errorInfo);
		if (errorInfo.errorFields.length) {
			const fieldName = errorInfo.errorFields[0].name;
			if (scrollToFirstError !== void 0) {
				scrollToField(scrollToFirstError, fieldName);
				return;
			}
			if (contextScrollToFirstError !== void 0) scrollToField(contextScrollToFirstError, fieldName);
		}
	};
	return /* @__PURE__ */ import_react.createElement(VariantContext.Provider, { value: variant }, /* @__PURE__ */ import_react.createElement(DisabledContextProvider, { disabled }, /* @__PURE__ */ import_react.createElement(SizeContext.Provider, { value: mergedSize }, /* @__PURE__ */ import_react.createElement(FormProvider, { validateMessages: contextValidateMessages }, /* @__PURE__ */ import_react.createElement(FormContext.Provider, { value: formContextValue }, /* @__PURE__ */ import_react.createElement(NoFormStyle, { status: true }, /* @__PURE__ */ import_react.createElement(RefForm, {
		id: name,
		...restFormProps,
		name,
		onFinishFailed: onInternalFinishFailed,
		form: wrapForm,
		ref: nativeElementRef,
		style: {
			...mergedStyles?.root,
			...contextStyle,
			...style
		},
		className: formClassName
	})))))));
};
var Form$1 = /* @__PURE__ */ import_react.forwardRef(InternalForm);
//#endregion
//#region node_modules/antd/es/form/hooks/useChildren.js
function useChildren(children) {
	if (typeof children === "function") return children;
	const childList = toArray$1(children);
	return childList.length <= 1 ? childList[0] : childList;
}
//#endregion
//#region node_modules/antd/es/form/hooks/useFormItemStatus.js
var useFormItemStatus = () => {
	const { status, errors = [], warnings = [] } = import_react.useContext(FormItemInputContext);
	return {
		status,
		errors,
		warnings
	};
};
useFormItemStatus.Context = FormItemInputContext;
//#endregion
//#region node_modules/antd/es/form/hooks/useFrameState.js
function useFrameState(defaultValue) {
	const [value, setValue] = import_react.useState(defaultValue);
	const frameRef = import_react.useRef(null);
	const batchRef = import_react.useRef([]);
	const destroyRef = import_react.useRef(false);
	import_react.useEffect(() => {
		destroyRef.current = false;
		return () => {
			destroyRef.current = true;
			wrapperRaf.cancel(frameRef.current);
			frameRef.current = null;
		};
	}, []);
	function setFrameValue(updater) {
		if (destroyRef.current) return;
		if (frameRef.current === null) {
			batchRef.current = [];
			frameRef.current = wrapperRaf(() => {
				frameRef.current = null;
				setValue((prevValue) => {
					let current = prevValue;
					batchRef.current.forEach((func) => {
						current = func(current);
					});
					return current;
				});
			});
		}
		batchRef.current.push(updater);
	}
	return [value, setFrameValue];
}
//#endregion
//#region node_modules/antd/es/form/hooks/useItemRef.js
function useItemRef() {
	const { itemRef } = import_react.useContext(FormContext);
	const cacheRef = import_react.useRef({});
	function getRef(name, children) {
		const childrenRef = children && typeof children === "object" && getNodeRef(children);
		const nameStr = name.join("_");
		if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
			cacheRef.current.name = nameStr;
			cacheRef.current.originRef = childrenRef;
			cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
		}
		return cacheRef.current.ref;
	}
	return getRef;
}
//#endregion
//#region node_modules/antd/es/form/style/fallbackCmp.js
/**
* Fallback of IE.
* Safe to remove.
*/
var genFallbackStyle = (token) => {
	const { formItemCls } = token;
	return { "@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)": { [`${formItemCls}-control`]: { display: "flex" } } };
};
var fallbackCmp_default = genSubStyleComponent(["Form", "item-item"], (token, { rootPrefixCls }) => {
	return genFallbackStyle(prepareToken$2(token, rootPrefixCls));
});
//#endregion
//#region node_modules/antd/es/form/FormItemInput.js
var GRID_MAX = 24;
var FormItemInput = (props) => {
	const { prefixCls, status, labelCol, wrapperCol, children, errors, warnings, _internalItemRender: formItemRender, extra, help, fieldId, marginBottom, onErrorVisibleChanged, label } = props;
	const baseClassName = `${prefixCls}-item`;
	const formContext = import_react.useContext(FormContext);
	const { classNames: contextClassNames, styles: contextStyles } = formContext;
	const mergedWrapperCol = import_react.useMemo(() => {
		let mergedWrapper = { ...wrapperCol || formContext.wrapperCol || {} };
		if (label === null && !labelCol && !wrapperCol && formContext.labelCol) [void 0].concat(_toConsumableArray(responsiveArrayReversed)).forEach((size) => {
			const _size = size ? [size] : [];
			const formLabel = get(formContext.labelCol, _size);
			const formLabelObj = typeof formLabel === "object" ? formLabel : {};
			const wrapper = get(mergedWrapper, _size);
			const wrapperObj = typeof wrapper === "object" ? wrapper : {};
			if ("span" in formLabelObj && !("offset" in wrapperObj) && formLabelObj.span < GRID_MAX) mergedWrapper = set(mergedWrapper, [].concat(_size, ["offset"]), formLabelObj.span);
		});
		return mergedWrapper;
	}, [
		wrapperCol,
		formContext.wrapperCol,
		formContext.labelCol,
		label,
		labelCol
	]);
	const className = clsx(`${baseClassName}-control`, mergedWrapperCol.className);
	const subFormContext = import_react.useMemo(() => {
		const { labelCol: _labelCol, wrapperCol: _wrapperCol, ...rest } = formContext;
		return rest;
	}, [formContext]);
	const extraRef = import_react.useRef(null);
	const [extraHeight, setExtraHeight] = import_react.useState(0);
	useLayoutEffect(() => {
		if (extra && extraRef.current) setExtraHeight(extraRef.current.clientHeight);
		else setExtraHeight(0);
	}, [extra]);
	const inputDom = /* @__PURE__ */ import_react.createElement("div", { className: `${baseClassName}-control-input` }, /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${baseClassName}-control-input-content`, contextClassNames?.content),
		style: contextStyles?.content
	}, children));
	const formItemContext = import_react.useMemo(() => ({
		prefixCls,
		status
	}), [prefixCls, status]);
	const errorListDom = marginBottom !== null || errors.length || warnings.length ? /* @__PURE__ */ import_react.createElement(FormItemPrefixContext.Provider, { value: formItemContext }, /* @__PURE__ */ import_react.createElement(ErrorList, {
		fieldId,
		errors,
		warnings,
		help,
		helpStatus: status,
		className: `${baseClassName}-explain-connected`,
		onVisibleChanged: onErrorVisibleChanged
	})) : null;
	const extraProps = {};
	if (fieldId) extraProps.id = `${fieldId}_extra`;
	const extraDom = extra ? /* @__PURE__ */ import_react.createElement("div", {
		...extraProps,
		className: `${baseClassName}-extra`,
		ref: extraRef
	}, extra) : null;
	const additionalDom = errorListDom || extraDom ? /* @__PURE__ */ import_react.createElement("div", {
		className: `${baseClassName}-additional`,
		style: marginBottom ? { minHeight: marginBottom + extraHeight } : {}
	}, errorListDom, extraDom) : null;
	const dom = formItemRender && formItemRender.mark === "pro_table_render" && formItemRender.render ? formItemRender.render(props, {
		input: inputDom,
		errorList: errorListDom,
		extra: extraDom
	}) : /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, inputDom, additionalDom);
	return /* @__PURE__ */ import_react.createElement(FormContext.Provider, { value: subFormContext }, /* @__PURE__ */ import_react.createElement(Col, {
		...mergedWrapperCol,
		className
	}, dom), /* @__PURE__ */ import_react.createElement(fallbackCmp_default, { prefixCls }));
};
//#endregion
//#region node_modules/antd/es/form/FormItemLabel.js
var FormItemLabel = ({ prefixCls, label, htmlFor, labelCol, labelAlign, colon, required, requiredMark, tooltip, vertical }) => {
	const [formLocale] = useLocale("Form");
	const { labelAlign: contextLabelAlign, labelCol: contextLabelCol, labelWrap, colon: contextColon, classNames: contextClassNames, styles: contextStyles, tooltip: contextTooltip } = import_react.useContext(FormContext);
	if (!label) return null;
	const mergedLabelCol = labelCol || contextLabelCol || {};
	const mergedLabelAlign = labelAlign || contextLabelAlign;
	const labelClsBasic = `${prefixCls}-item-label`;
	const labelColClassName = clsx(labelClsBasic, mergedLabelAlign === "left" && `${labelClsBasic}-left`, mergedLabelCol.className, { [`${labelClsBasic}-wrap`]: !!labelWrap });
	let labelChildren = label;
	const computedColon = colon === true || contextColon !== false && colon !== false;
	if (computedColon && !vertical && typeof label === "string" && label.trim()) labelChildren = label.replace(/[:|：]\s*$/, "");
	const tooltipProps = convertToTooltipProps(tooltip, contextTooltip);
	if (tooltipProps) {
		const tooltipNode = /* @__PURE__ */ import_react.createElement(Tooltip, { ...tooltipProps }, /* @__PURE__ */ import_react.createElement("span", {
			className: `${prefixCls}-item-tooltip`,
			onClick: (e) => {
				e.preventDefault();
			},
			tabIndex: -1
		}, tooltipProps.icon || tooltipProps.children || /* @__PURE__ */ import_react.createElement(RefIcon$16, null)));
		labelChildren = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, labelChildren, tooltipNode);
	}
	const isOptionalMark = requiredMark === "optional";
	const isRenderMark = typeof requiredMark === "function";
	const hideRequiredMark = requiredMark === false;
	if (isRenderMark) labelChildren = requiredMark(labelChildren, { required: !!required });
	else if (isOptionalMark && !required) labelChildren = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, labelChildren, /* @__PURE__ */ import_react.createElement("span", {
		className: `${prefixCls}-item-optional`,
		title: ""
	}, formLocale?.optional || localeValues.Form?.optional));
	let markType;
	if (hideRequiredMark) markType = "hidden";
	else if (isOptionalMark || isRenderMark) markType = "optional";
	const labelClassName = clsx(contextClassNames?.label, {
		[`${prefixCls}-item-required`]: required,
		[`${prefixCls}-item-required-mark-${markType}`]: markType,
		[`${prefixCls}-item-no-colon`]: !computedColon
	});
	return /* @__PURE__ */ import_react.createElement(Col, {
		...mergedLabelCol,
		className: labelColClassName
	}, /* @__PURE__ */ import_react.createElement("label", {
		htmlFor,
		className: labelClassName,
		style: contextStyles?.label,
		title: typeof label === "string" ? label : ""
	}, labelChildren));
};
//#endregion
//#region node_modules/antd/es/form/FormItem/StatusProvider.js
var iconMap = {
	success: RefIcon$2,
	warning: RefIcon$4,
	error: RefIcon$3,
	validating: RefIcon$5
};
function StatusProvider({ children, errors, warnings, hasFeedback, validateStatus, prefixCls, meta, noStyle, name }) {
	const itemPrefixCls = `${prefixCls}-item`;
	const { feedbackIcons } = import_react.useContext(FormContext);
	const mergedValidateStatus = getStatus(errors, warnings, meta, null, !!hasFeedback, validateStatus);
	const { isFormItemInput: parentIsFormItemInput, status: parentStatus, hasFeedback: parentHasFeedback, feedbackIcon: parentFeedbackIcon, name: parentName } = import_react.useContext(FormItemInputContext);
	const formItemStatusContext = import_react.useMemo(() => {
		let feedbackIcon;
		if (hasFeedback) {
			const customIcons = hasFeedback !== true && hasFeedback.icons || feedbackIcons;
			const customIconNode = mergedValidateStatus && customIcons?.({
				status: mergedValidateStatus,
				errors,
				warnings
			})?.[mergedValidateStatus];
			const IconNode = mergedValidateStatus ? iconMap[mergedValidateStatus] : null;
			feedbackIcon = customIconNode !== false && IconNode ? /* @__PURE__ */ import_react.createElement("span", { className: clsx(`${itemPrefixCls}-feedback-icon`, `${itemPrefixCls}-feedback-icon-${mergedValidateStatus}`) }, customIconNode || /* @__PURE__ */ import_react.createElement(IconNode, null)) : null;
		}
		const context = {
			status: mergedValidateStatus || "",
			errors,
			warnings,
			hasFeedback: !!hasFeedback,
			feedbackIcon,
			isFormItemInput: true,
			name
		};
		if (noStyle) {
			context.status = (mergedValidateStatus ?? parentStatus) || "";
			context.isFormItemInput = parentIsFormItemInput;
			context.hasFeedback = !!(hasFeedback ?? parentHasFeedback);
			context.feedbackIcon = hasFeedback !== void 0 ? context.feedbackIcon : parentFeedbackIcon;
			context.name = name ?? parentName;
		}
		return context;
	}, [
		mergedValidateStatus,
		hasFeedback,
		noStyle,
		parentIsFormItemInput,
		parentStatus
	]);
	return /* @__PURE__ */ import_react.createElement(FormItemInputContext.Provider, { value: formItemStatusContext }, children);
}
//#endregion
//#region node_modules/antd/es/form/FormItem/ItemHolder.js
function ItemHolder(props) {
	const { prefixCls, className, rootClassName, style, help, errors, warnings, validateStatus, meta, hasFeedback, hidden, children, fieldId, required, isRequired, onSubItemMetaChange, layout: propsLayout, name, ...restProps } = props;
	const itemPrefixCls = `${prefixCls}-item`;
	const { requiredMark, layout: formLayout } = import_react.useContext(FormContext);
	const layout = propsLayout || formLayout;
	const vertical = layout === "vertical";
	const itemRef = import_react.useRef(null);
	const debounceErrors = useDebounce(errors);
	const debounceWarnings = useDebounce(warnings);
	const hasHelp = isNonNullable(help);
	const hasError = !!(hasHelp || errors.length || warnings.length);
	const isOnScreen = !!itemRef.current && isVisible_default(itemRef.current);
	const [marginBottom, setMarginBottom] = import_react.useState(null);
	useLayoutEffect(() => {
		if (hasError && itemRef.current) {
			const itemStyle = getComputedStyle(itemRef.current);
			setMarginBottom(Number.parseInt(itemStyle.marginBottom, 10));
		}
	}, [hasError, isOnScreen]);
	const onErrorVisibleChanged = (nextVisible) => {
		if (!nextVisible) setMarginBottom(null);
	};
	const getValidateState = (isDebounce = false) => {
		return getStatus(isDebounce ? debounceErrors : meta.errors, isDebounce ? debounceWarnings : meta.warnings, meta, "", !!hasFeedback, validateStatus);
	};
	const mergedValidateStatus = getValidateState();
	const itemClassName = clsx(itemPrefixCls, className, rootClassName, {
		[`${itemPrefixCls}-with-help`]: hasHelp || debounceErrors.length || debounceWarnings.length,
		[`${itemPrefixCls}-has-feedback`]: mergedValidateStatus && hasFeedback,
		[`${itemPrefixCls}-has-success`]: mergedValidateStatus === "success",
		[`${itemPrefixCls}-has-warning`]: mergedValidateStatus === "warning",
		[`${itemPrefixCls}-has-error`]: mergedValidateStatus === "error",
		[`${itemPrefixCls}-is-validating`]: mergedValidateStatus === "validating",
		[`${itemPrefixCls}-hidden`]: hidden,
		[`${itemPrefixCls}-${layout}`]: layout
	});
	return /* @__PURE__ */ import_react.createElement("div", {
		className: itemClassName,
		style,
		ref: itemRef
	}, /* @__PURE__ */ import_react.createElement(Row, {
		className: `${itemPrefixCls}-row`,
		...omit(restProps, [
			"_internalItemRender",
			"colon",
			"dependencies",
			"extra",
			"fieldKey",
			"getValueFromEvent",
			"getValueProps",
			"htmlFor",
			"id",
			"initialValue",
			"isListField",
			"label",
			"labelAlign",
			"labelCol",
			"labelWrap",
			"messageVariables",
			"name",
			"normalize",
			"noStyle",
			"preserve",
			"requiredMark",
			"rules",
			"shouldUpdate",
			"trigger",
			"tooltip",
			"validateFirst",
			"validateTrigger",
			"valuePropName",
			"wrapperCol",
			"validateDebounce"
		])
	}, /* @__PURE__ */ import_react.createElement(FormItemLabel, {
		htmlFor: fieldId,
		...props,
		requiredMark,
		required: required ?? isRequired,
		prefixCls,
		vertical
	}), /* @__PURE__ */ import_react.createElement(FormItemInput, {
		...props,
		...meta,
		errors: debounceErrors,
		warnings: debounceWarnings,
		prefixCls,
		status: mergedValidateStatus,
		help,
		marginBottom,
		onErrorVisibleChanged
	}, /* @__PURE__ */ import_react.createElement(NoStyleItemContext.Provider, { value: onSubItemMetaChange }, /* @__PURE__ */ import_react.createElement(StatusProvider, {
		prefixCls,
		meta,
		errors: meta.errors,
		warnings: meta.warnings,
		hasFeedback,
		validateStatus: mergedValidateStatus,
		name
	}, children)))), !!marginBottom && /* @__PURE__ */ import_react.createElement("div", {
		className: `${itemPrefixCls}-margin-offset`,
		style: { marginBottom: -marginBottom }
	}));
}
//#endregion
//#region node_modules/antd/es/form/FormItem/index.js
var NAME_SPLIT = "__SPLIT__";
function isSimilarControl(a, b) {
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);
	return keysA.length === keysB.length && keysA.every((key) => {
		const propValueA = a[key];
		const propValueB = b[key];
		return propValueA === propValueB || typeof propValueA === "function" || typeof propValueB === "function";
	});
}
var MemoInput = /* @__PURE__ */ import_react.memo((props) => props.children, (prev, next) => isSimilarControl(prev.control, next.control) && prev.update === next.update && prev.childProps.length === next.childProps.length && prev.childProps.every((value, index) => value === next.childProps[index]));
function genEmptyMeta() {
	return {
		errors: [],
		warnings: [],
		touched: false,
		validating: false,
		name: [],
		validated: false
	};
}
function InternalFormItem(props) {
	const { name, noStyle, className, dependencies, prefixCls: customizePrefixCls, shouldUpdate, rules, children, required, label, messageVariables, trigger = "onChange", validateTrigger, hidden, help, layout } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const { name: formName } = import_react.useContext(FormContext);
	const mergedChildren = useChildren(children);
	const isRenderProps = typeof mergedChildren === "function";
	const notifyParentMetaChange = import_react.useContext(NoStyleItemContext);
	const { validateTrigger: contextValidateTrigger } = import_react.useContext(Context);
	const mergedValidateTrigger = isNonNullable(validateTrigger) ? validateTrigger : contextValidateTrigger;
	const hasName = isNonNullable(name);
	const prefixCls = getPrefixCls("form", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$10(prefixCls, rootCls);
	devUseWarning("Form.Item");
	const listContext = import_react.useContext(ListContext$1);
	const fieldKeyPathRef = import_react.useRef(null);
	const [subFieldErrors, setSubFieldErrors] = useFrameState({});
	const [meta, setMeta] = useSafeState(() => genEmptyMeta());
	const onMetaChange = (nextMeta) => {
		const keyInfo = listContext?.getKey(nextMeta.name);
		setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta, true);
		if (noStyle && help !== false && notifyParentMetaChange) {
			let namePath = nextMeta.name;
			if (!nextMeta.destroy) {
				if (keyInfo !== void 0) {
					const [fieldKey, restPath] = keyInfo;
					namePath = [fieldKey].concat(_toConsumableArray(restPath));
					fieldKeyPathRef.current = namePath;
				}
			} else namePath = fieldKeyPathRef.current || namePath;
			notifyParentMetaChange(nextMeta, namePath);
		}
	};
	const onSubItemMetaChange = (subMeta, uniqueKeys) => {
		setSubFieldErrors((prevSubFieldErrors) => {
			const clone = { ...prevSubFieldErrors };
			const mergedNameKey = [].concat(_toConsumableArray(subMeta.name.slice(0, -1)), _toConsumableArray(uniqueKeys)).join(NAME_SPLIT);
			if (subMeta.destroy) delete clone[mergedNameKey];
			else clone[mergedNameKey] = subMeta;
			return clone;
		});
	};
	const [mergedErrors, mergedWarnings] = import_react.useMemo(() => {
		const errorList = _toConsumableArray(meta.errors);
		const warningList = _toConsumableArray(meta.warnings);
		Object.values(subFieldErrors).forEach((subFieldError) => {
			errorList.push.apply(errorList, _toConsumableArray(subFieldError.errors || []));
			warningList.push.apply(warningList, _toConsumableArray(subFieldError.warnings || []));
		});
		return [errorList, warningList];
	}, [
		subFieldErrors,
		meta.errors,
		meta.warnings
	]);
	const getItemRef = useItemRef();
	function renderLayout(baseChildren, fieldId, isRequired) {
		if (noStyle && !hidden) return /* @__PURE__ */ import_react.createElement(StatusProvider, {
			prefixCls,
			hasFeedback: props.hasFeedback,
			validateStatus: props.validateStatus,
			meta,
			errors: mergedErrors,
			warnings: mergedWarnings,
			noStyle: true,
			name
		}, baseChildren);
		return /* @__PURE__ */ import_react.createElement(ItemHolder, {
			key: "row",
			...props,
			className: clsx(className, cssVarCls, rootCls, hashId),
			prefixCls,
			fieldId,
			isRequired,
			errors: mergedErrors,
			warnings: mergedWarnings,
			meta,
			onSubItemMetaChange,
			layout,
			name
		}, baseChildren);
	}
	if (!hasName && !isRenderProps && !dependencies) return renderLayout(mergedChildren);
	let variables = {};
	if (typeof label === "string") variables.label = label;
	else if (name) variables.label = String(name);
	if (messageVariables) variables = {
		...variables,
		...messageVariables
	};
	return /* @__PURE__ */ import_react.createElement(WrapperField, {
		...props,
		messageVariables: variables,
		trigger,
		validateTrigger: mergedValidateTrigger,
		onMetaChange
	}, (control, renderMeta, context) => {
		const mergedName = toArray(name).length && renderMeta ? renderMeta.name : [];
		const fieldId = getFieldId(mergedName, formName);
		const isRequired = required !== void 0 ? required : !!rules?.some((rule) => {
			if (rule && typeof rule === "object" && rule.required && !rule.warningOnly) return true;
			if (typeof rule === "function") {
				const ruleEntity = rule(context);
				return ruleEntity?.required && !ruleEntity?.warningOnly;
			}
			return false;
		});
		const mergedControl = { ...control };
		let childNode = null;
		if (Array.isArray(mergedChildren) && hasName) childNode = mergedChildren;
		else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {} else if (dependencies && !isRenderProps && !hasName) {} else if (/* @__PURE__ */ import_react.isValidElement(mergedChildren)) {
			const childProps = {
				...mergedChildren.props,
				...mergedControl
			};
			if (!childProps.id) childProps.id = fieldId;
			if (help || mergedErrors.length > 0 || mergedWarnings.length > 0 || props.extra) {
				const describedbyArr = [];
				if (help || mergedErrors.length > 0) describedbyArr.push(`${fieldId}_help`);
				if (props.extra) describedbyArr.push(`${fieldId}_extra`);
				childProps["aria-describedby"] = describedbyArr.join(" ");
			}
			if (mergedErrors.length > 0) childProps["aria-invalid"] = "true";
			if (isRequired) childProps["aria-required"] = "true";
			if (supportRef(mergedChildren)) childProps.ref = getItemRef(mergedName, mergedChildren);
			new Set([].concat(_toConsumableArray(toArray(trigger)), _toConsumableArray(toArray(mergedValidateTrigger)))).forEach((eventName) => {
				childProps[eventName] = (...args) => {
					mergedControl[eventName]?.(...args);
					mergedChildren.props[eventName]?.(...args);
				};
			});
			const watchingChildProps = [
				childProps["aria-required"],
				childProps["aria-invalid"],
				childProps["aria-describedby"]
			];
			childNode = /* @__PURE__ */ import_react.createElement(MemoInput, {
				control: mergedControl,
				update: mergedChildren,
				childProps: watchingChildProps
			}, cloneElement(mergedChildren, childProps));
		} else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) childNode = mergedChildren(context);
		else childNode = mergedChildren;
		return renderLayout(childNode, fieldId, isRequired);
	});
}
var FormItem = InternalFormItem;
FormItem.useStatus = useFormItemStatus;
//#endregion
//#region node_modules/antd/es/form/FormList.js
var FormList = ({ prefixCls: customizePrefixCls, children, ...props }) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("form", customizePrefixCls);
	const contextValue = import_react.useMemo(() => ({
		prefixCls,
		status: "error"
	}), [prefixCls]);
	return /* @__PURE__ */ import_react.createElement(List$1, { ...props }, (fields, operation, meta) => /* @__PURE__ */ import_react.createElement(FormItemPrefixContext.Provider, { value: contextValue }, children(fields.map((field) => ({
		...field,
		fieldKey: field.key
	})), operation, {
		errors: meta.errors,
		warnings: meta.warnings
	})));
};
//#endregion
//#region node_modules/antd/es/form/hooks/useFormInstance.js
function useFormInstance() {
	const { form } = import_react.useContext(FormContext);
	return form;
}
//#endregion
//#region node_modules/antd/es/form/index.js
var Form = Form$1;
Form.Item = FormItem;
Form.List = FormList;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.useFormInstance = useFormInstance;
Form.useWatch = useWatch;
Form.Provider = FormProvider;
//#endregion
//#region node_modules/antd/es/input/Group.js
/** @deprecated Please use `Space.Compact` */
var Group = (props) => {
	const { getPrefixCls, direction } = (0, import_react.useContext)(ConfigContext);
	const { prefixCls: customizePrefixCls, className } = props;
	const prefixCls = getPrefixCls("input-group", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$20(getPrefixCls("input"));
	const cls = clsx(prefixCls, cssVarCls, {
		[`${prefixCls}-lg`]: props.size === "large",
		[`${prefixCls}-sm`]: props.size === "small",
		[`${prefixCls}-compact`]: props.compact,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, hashId, className);
	const formItemContext = (0, import_react.useContext)(FormItemInputContext);
	const groupFormItemContext = (0, import_react.useMemo)(() => ({
		...formItemContext,
		isFormItemInput: false
	}), [formItemContext]);
	return /* @__PURE__ */ import_react.createElement(FormItemInputContext.Provider, { value: groupFormItemContext }, /* @__PURE__ */ import_react.createElement(Space.Compact, {
		className: cls,
		style: props.style,
		onMouseEnter: props.onMouseEnter,
		onMouseLeave: props.onMouseLeave,
		onFocus: props.onFocus,
		onBlur: props.onBlur
	}, props.children));
};
//#endregion
//#region node_modules/antd/es/input/style/otp.js
var genOTPStyle = (token) => {
	const { componentCls, paddingXS } = token;
	return { [componentCls]: {
		display: "inline-flex",
		alignItems: "center",
		flexWrap: "nowrap",
		columnGap: paddingXS,
		[`${componentCls}-input-wrapper`]: {
			position: "relative",
			[`${componentCls}-mask-icon`]: {
				position: "absolute",
				zIndex: "1",
				top: "50%",
				right: "50%",
				transform: "translate(50%, -50%)",
				pointerEvents: "none"
			},
			[`${componentCls}-mask-input`]: {
				color: "transparent",
				caretColor: token.colorText
			},
			[`${componentCls}-mask-input[type=number]::-webkit-inner-spin-button`]: {
				"-webkit-appearance": "none",
				margin: 0
			},
			[`${componentCls}-mask-input[type=number]`]: { "-moz-appearance": "textfield" }
		},
		"&-rtl": { direction: "rtl" },
		[`${componentCls}-input`]: {
			textAlign: "center",
			paddingInline: token.paddingXXS
		},
		[`&${componentCls}-sm ${componentCls}-input`]: { paddingInline: token.calc(token.paddingXXS).div(2).equal() },
		[`&${componentCls}-lg ${componentCls}-input`]: { paddingInline: token.paddingXS }
	} };
};
var otp_default = genStyleHooks(["Input", "OTP"], (token) => {
	return genOTPStyle(merge$1(token, initInputToken(token)));
}, initComponentToken);
//#endregion
//#region node_modules/antd/es/input/OTP/OTPInput.js
var OTPInput = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { className, value, onChange, onActiveChange, index, mask, onFocus, ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("otp");
	const maskValue = typeof mask === "string" ? mask : value;
	const inputRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => inputRef.current);
	const onInternalChange = (e) => {
		onChange(index, e.target.value);
	};
	const syncSelection = () => {
		wrapperRaf(() => {
			const inputEle = inputRef.current?.input;
			if (document.activeElement === inputEle && inputEle) inputEle.select();
		});
	};
	const onInternalFocus = (e) => {
		onFocus?.(e);
		syncSelection();
	};
	const onInternalKeyDown = (event) => {
		const { key, ctrlKey, metaKey } = event;
		if (key === "ArrowLeft") onActiveChange(index - 1);
		else if (key === "ArrowRight") onActiveChange(index + 1);
		else if (key === "z" && (ctrlKey || metaKey)) event.preventDefault();
		else if (key === "Backspace" && !value) onActiveChange(index - 1);
		syncSelection();
	};
	return /* @__PURE__ */ import_react.createElement("span", {
		className: `${prefixCls}-input-wrapper`,
		role: "presentation"
	}, mask && value !== "" && value !== void 0 && /* @__PURE__ */ import_react.createElement("span", {
		className: `${prefixCls}-mask-icon`,
		"aria-hidden": "true"
	}, maskValue), /* @__PURE__ */ import_react.createElement(Input$1, {
		"aria-label": `OTP Input ${index + 1}`,
		type: mask === true ? "password" : "text",
		...restProps,
		ref: inputRef,
		value,
		onInput: onInternalChange,
		onFocus: onInternalFocus,
		onKeyDown: onInternalKeyDown,
		onMouseDown: syncSelection,
		onMouseUp: syncSelection,
		className: clsx(className, { [`${prefixCls}-mask-input`]: mask })
	}));
});
//#endregion
//#region node_modules/antd/es/input/OTP/index.js
function strToArr(str) {
	return (str || "").split("");
}
var Separator = (props) => {
	const { index, prefixCls, separator, className: semanticClassName, style: semanticStyle } = props;
	const separatorNode = typeof separator === "function" ? separator(index) : separator;
	if (!separatorNode) return null;
	return /* @__PURE__ */ import_react.createElement("span", {
		className: clsx(`${prefixCls}-separator`, semanticClassName),
		style: semanticStyle
	}, separatorNode);
};
var OTP = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, length = 6, size: customSize, defaultValue, value, onChange, formatter, separator, variant, disabled, status: customStatus, autoFocus, mask, type, autoComplete, onInput, onFocus, inputMode, classNames, styles, className, style, ...restProps } = props;
	const { classNames: contextClassNames, styles: contextStyles, getPrefixCls, direction, style: contextStyle, className: contextClassName } = useComponentConfig("otp");
	const prefixCls = getPrefixCls("otp", customizePrefixCls);
	const mergedProps = {
		...props,
		length
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const domAttrs = pickAttrs(restProps, {
		aria: true,
		data: true,
		attr: true
	});
	const [hashId, cssVarCls] = otp_default(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const formContext = import_react.useContext(FormItemInputContext);
	const mergedStatus = getMergedStatus(formContext.status, customStatus);
	const proxyFormContext = import_react.useMemo(() => ({
		...formContext,
		status: mergedStatus,
		hasFeedback: false,
		feedbackIcon: null
	}), [formContext, mergedStatus]);
	const containerRef = import_react.useRef(null);
	const inputsRef = import_react.useRef({});
	import_react.useImperativeHandle(ref, () => ({
		focus: () => {
			inputsRef.current[0]?.focus();
		},
		blur: () => {
			for (let i = 0; i < length; i += 1) inputsRef.current[i]?.blur();
		},
		nativeElement: containerRef.current
	}));
	const internalFormatter = (txt) => formatter ? formatter(txt) : txt;
	const [valueCells, setValueCells] = import_react.useState(() => strToArr(internalFormatter(defaultValue || "")));
	import_react.useEffect(() => {
		if (value !== void 0) setValueCells(strToArr(value));
	}, [value]);
	const triggerValueCellsChange = useEvent((nextValueCells) => {
		setValueCells(nextValueCells);
		if (onInput) onInput(nextValueCells);
		if (onChange && nextValueCells.length === length && nextValueCells.every((c) => c) && nextValueCells.some((c, index) => valueCells[index] !== c)) onChange(nextValueCells.join(""));
	});
	const patchValue = useEvent((index, txt) => {
		let nextCells = _toConsumableArray(valueCells);
		for (let i = 0; i < index; i += 1) if (!nextCells[i]) nextCells[i] = "";
		if (txt.length <= 1) nextCells[index] = txt;
		else nextCells = nextCells.slice(0, index).concat(strToArr(txt));
		nextCells = nextCells.slice(0, length);
		for (let i = nextCells.length - 1; i >= 0; i -= 1) {
			if (nextCells[i]) break;
			nextCells.pop();
		}
		nextCells = strToArr(internalFormatter(nextCells.map((c) => c || " ").join(""))).map((c, i) => {
			if (c === " " && !nextCells[i]) return nextCells[i];
			return c;
		});
		return nextCells;
	});
	const onInputChange = (index, txt) => {
		const nextCells = patchValue(index, txt);
		const nextIndex = Math.min(index + txt.length, length - 1);
		if (nextIndex !== index && nextCells[index] !== void 0) inputsRef.current[nextIndex]?.focus();
		triggerValueCellsChange(nextCells);
	};
	const onInputActiveChange = (nextIndex) => {
		inputsRef.current[nextIndex]?.focus();
	};
	const onInputFocus = (event, index) => {
		for (let i = 0; i < index; i += 1) if (!inputsRef.current[i]?.input?.value) {
			inputsRef.current[i]?.focus();
			break;
		}
		onFocus?.(event);
	};
	const inputSharedProps = {
		variant,
		disabled,
		status: mergedStatus,
		mask,
		type,
		inputMode,
		autoComplete
	};
	return /* @__PURE__ */ import_react.createElement("div", {
		...domAttrs,
		ref: containerRef,
		className: clsx(className, prefixCls, {
			[`${prefixCls}-sm`]: mergedSize === "small",
			[`${prefixCls}-lg`]: mergedSize === "large",
			[`${prefixCls}-rtl`]: direction === "rtl"
		}, cssVarCls, hashId, contextClassName, mergedClassNames.root),
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		role: "group"
	}, /* @__PURE__ */ import_react.createElement(FormItemInputContext.Provider, { value: proxyFormContext }, Array.from({ length }).map((_, index) => {
		const key = `otp-${index}`;
		const singleValue = valueCells[index] || "";
		return /* @__PURE__ */ import_react.createElement(import_react.Fragment, { key }, /* @__PURE__ */ import_react.createElement(OTPInput, {
			ref: (inputEle) => {
				inputsRef.current[index] = inputEle;
			},
			index,
			size: mergedSize,
			htmlSize: 1,
			className: clsx(mergedClassNames.input, `${prefixCls}-input`),
			style: mergedStyles.input,
			onChange: onInputChange,
			value: singleValue,
			onActiveChange: onInputActiveChange,
			autoFocus: index === 0 && autoFocus,
			onFocus: (event) => onInputFocus(event, index),
			...inputSharedProps
		}), index < length - 1 && /* @__PURE__ */ import_react.createElement(Separator, {
			separator,
			index,
			prefixCls,
			className: clsx(mergedClassNames.separator),
			style: mergedStyles.separator
		}));
	})));
});
//#endregion
//#region node_modules/antd/es/input/Password.js
var defaultIconRender = (visible) => visible ? /* @__PURE__ */ import_react.createElement(RefIcon$17, null) : /* @__PURE__ */ import_react.createElement(RefIcon$18, null);
var actionMap = {
	click: "onClick",
	hover: "onMouseOver"
};
var Password = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { disabled: customDisabled, action = "click", visibilityToggle = true, iconRender = defaultIconRender, suffix } = props;
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const visibilityControlled = typeof visibilityToggle === "object" && visibilityToggle.visible !== void 0;
	const [visible, setVisible] = (0, import_react.useState)(() => visibilityControlled ? visibilityToggle.visible : false);
	const inputRef = (0, import_react.useRef)(null);
	import_react.useEffect(() => {
		if (visibilityControlled) setVisible(visibilityToggle.visible);
	}, [visibilityControlled, visibilityToggle]);
	const removePasswordTimeout = useRemovePasswordTimeout(inputRef);
	const onVisibleChange = () => {
		if (mergedDisabled) return;
		if (visible) removePasswordTimeout();
		const nextVisible = !visible;
		setVisible(nextVisible);
		if (typeof visibilityToggle === "object") visibilityToggle.onVisibleChange?.(nextVisible);
	};
	const getIcon = (prefixCls) => {
		const iconTrigger = actionMap[action] || "";
		const icon = iconRender(visible);
		const iconProps = {
			[iconTrigger]: onVisibleChange,
			className: `${prefixCls}-icon`,
			key: "passwordIcon",
			onMouseDown: (e) => {
				e.preventDefault();
			},
			onMouseUp: (e) => {
				e.preventDefault();
			}
		};
		return /* @__PURE__ */ import_react.cloneElement(/* @__PURE__ */ import_react.isValidElement(icon) ? icon : /* @__PURE__ */ import_react.createElement("span", null, icon), iconProps);
	};
	const { className, prefixCls: customizePrefixCls, inputPrefixCls: customizeInputPrefixCls, size, ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
	const prefixCls = getPrefixCls("input-password", customizePrefixCls);
	const suffixIcon = visibilityToggle && getIcon(prefixCls);
	const inputClassName = clsx(prefixCls, className, { [`${prefixCls}-${size}`]: !!size });
	const omittedProps = {
		...omit(restProps, [
			"suffix",
			"iconRender",
			"visibilityToggle"
		]),
		type: visible ? "text" : "password",
		className: inputClassName,
		prefixCls: inputPrefixCls,
		suffix: /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, suffixIcon, suffix)
	};
	if (size) omittedProps.size = size;
	return /* @__PURE__ */ import_react.createElement(Input$1, {
		ref: composeRef(ref, inputRef),
		...omittedProps
	});
});
//#endregion
//#region node_modules/antd/es/input/style/search.js
var genSearchStyle = (token) => {
	const { componentCls } = token;
	const btnCls = `${componentCls}-btn`;
	return { [componentCls]: {
		width: "100%",
		[btnCls]: { "&-filled": {
			background: token.colorFillTertiary,
			"&:not(:disabled)": {
				"&:hover": { background: token.colorFillSecondary },
				"&:active": { background: token.colorFill }
			}
		} }
	} };
};
var search_default = genStyleHooks(["Input", "Search"], genSearchStyle);
//#endregion
//#region node_modules/antd/es/input/Search.js
var Search = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, inputPrefixCls: customizeInputPrefixCls, className, size: customizeSize, style, enterButton = false, addonAfter, loading, disabled, onSearch: customOnSearch, onChange: customOnChange, onCompositionStart, onCompositionEnd, variant, onPressEnter: customOnPressEnter, classNames, styles, hidden, ...restProps } = props;
	const { direction, getPrefixCls, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("inputSearch");
	const mergedProps = {
		...props,
		enterButton
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps }, { button: { _default: "root" } });
	const composedRef = import_react.useRef(false);
	const prefixCls = getPrefixCls("input-search", customizePrefixCls);
	const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
	const [hashId, cssVarCls] = search_default(prefixCls);
	const { compactSize } = useCompactItemContext(prefixCls, direction);
	const size = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
	const inputRef = import_react.useRef(null);
	const onChange = (e) => {
		if (e?.target && e.type === "click" && customOnSearch) customOnSearch(e.target.value, e, { source: "clear" });
		customOnChange?.(e);
	};
	const onMouseDown = (e) => {
		if (document.activeElement === inputRef.current?.input) e.preventDefault();
	};
	const onSearch = (e) => {
		if (customOnSearch) customOnSearch(inputRef.current?.input?.value, e, { source: "input" });
	};
	const onPressEnter = (e) => {
		if (composedRef.current || loading) return;
		customOnPressEnter?.(e);
		onSearch(e);
	};
	const searchIcon = typeof enterButton === "boolean" ? /* @__PURE__ */ import_react.createElement(RefIcon$6, null) : null;
	const btnPrefixCls = `${prefixCls}-btn`;
	const btnClassName = clsx(btnPrefixCls, { [`${btnPrefixCls}-${variant}`]: variant });
	let button;
	const enterButtonAsElement = enterButton || {};
	const isAntdButton = enterButtonAsElement.type && enterButtonAsElement.type.__ANT_BUTTON === true;
	if (isAntdButton || enterButtonAsElement.type === "button") button = cloneElement(enterButtonAsElement, {
		onMouseDown,
		onClick: (e) => {
			enterButtonAsElement?.props?.onClick?.(e);
			onSearch(e);
		},
		key: "enterButton",
		...isAntdButton ? {
			className: btnClassName,
			size
		} : {}
	});
	else button = /* @__PURE__ */ import_react.createElement(Button, {
		classNames: mergedClassNames.button,
		styles: mergedStyles.button,
		className: btnClassName,
		color: enterButton ? "primary" : "default",
		size,
		disabled,
		key: "enterButton",
		onMouseDown,
		onClick: onSearch,
		loading,
		icon: searchIcon,
		variant: variant === "borderless" || variant === "filled" || variant === "underlined" ? "text" : enterButton ? "solid" : void 0
	}, enterButton);
	if (addonAfter) button = [button, cloneElement(addonAfter, { key: "addonAfter" })];
	const mergedClassName = clsx(prefixCls, cssVarCls, {
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-${size}`]: !!size,
		[`${prefixCls}-with-button`]: !!enterButton
	}, className, hashId, mergedClassNames.root);
	const handleOnCompositionStart = (e) => {
		composedRef.current = true;
		onCompositionStart?.(e);
	};
	const handleOnCompositionEnd = (e) => {
		composedRef.current = false;
		onCompositionEnd?.(e);
	};
	const rootProps = pickAttrs(restProps, { data: true });
	const inputProps = omit({
		...restProps,
		classNames: omit(mergedClassNames, ["button", "root"]),
		styles: omit(mergedStyles, ["button", "root"]),
		prefixCls: inputPrefixCls,
		type: "search",
		size,
		variant,
		onPressEnter,
		onCompositionStart: handleOnCompositionStart,
		onCompositionEnd: handleOnCompositionEnd,
		onChange,
		disabled
	}, Object.keys(rootProps));
	return /* @__PURE__ */ import_react.createElement(Compact, {
		className: mergedClassName,
		style: {
			...style,
			...mergedStyles.root
		},
		...rootProps,
		hidden
	}, /* @__PURE__ */ import_react.createElement(Input$1, {
		ref: composeRef(inputRef, ref),
		...inputProps
	}), button);
});
//#endregion
//#region node_modules/antd/es/input/style/textarea.js
var genTextAreaStyle = (token) => {
	const { componentCls, paddingLG } = token;
	const textareaPrefixCls = `${componentCls}-textarea`;
	return {
		[`textarea${componentCls}`]: {
			maxWidth: "100%",
			height: "auto",
			minHeight: token.controlHeight,
			lineHeight: token.lineHeight,
			verticalAlign: "bottom",
			transition: `all ${token.motionDurationSlow}`,
			resize: "vertical",
			[`&${componentCls}-mouse-active`]: { transition: `all ${token.motionDurationSlow}, height 0s, width 0s` }
		},
		[`${componentCls}-textarea-affix-wrapper-resize-dirty`]: { width: "auto" },
		[textareaPrefixCls]: {
			position: "relative",
			"&-show-count": { [`${componentCls}-data-count`]: {
				position: "absolute",
				bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
				insetInlineEnd: 0,
				color: token.colorTextDescription,
				whiteSpace: "nowrap",
				pointerEvents: "none"
			} },
			[`
        &-allow-clear > ${componentCls},
        &-affix-wrapper${textareaPrefixCls}-has-feedback ${componentCls}
      `]: { paddingInlineEnd: paddingLG },
			[`&-affix-wrapper${componentCls}-affix-wrapper`]: {
				padding: 0,
				[`> textarea${componentCls}`]: {
					fontSize: "inherit",
					border: "none",
					outline: "none",
					background: "transparent",
					minHeight: token.calc(token.controlHeight).sub(token.calc(token.lineWidth).mul(2)).equal(),
					"&:focus": { boxShadow: "none !important" }
				},
				[`${componentCls}-suffix`]: {
					margin: 0,
					"> *:not(:last-child)": { marginInline: 0 },
					[`${componentCls}-clear-icon`]: {
						position: "absolute",
						insetInlineEnd: token.paddingInline,
						insetBlockStart: token.paddingXS
					},
					[`${textareaPrefixCls}-suffix`]: {
						position: "absolute",
						top: 0,
						insetInlineEnd: token.paddingInline,
						bottom: 0,
						zIndex: 1,
						display: "inline-flex",
						alignItems: "center",
						margin: "auto",
						pointerEvents: "none"
					}
				}
			},
			[`&-affix-wrapper${componentCls}-affix-wrapper-rtl`]: { [`${componentCls}-suffix`]: { [`${componentCls}-data-count`]: {
				direction: "ltr",
				insetInlineStart: 0
			} } },
			[`&-affix-wrapper${componentCls}-affix-wrapper-sm`]: { [`${componentCls}-suffix`]: { [`${componentCls}-clear-icon`]: { insetInlineEnd: token.paddingInlineSM } } }
		}
	};
};
var textarea_default = genStyleHooks(["Input", "TextArea"], (token) => {
	return genTextAreaStyle(merge$1(token, initInputToken(token)));
}, initComponentToken, { resetFont: false });
//#endregion
//#region node_modules/antd/es/input/TextArea.js
var TextArea = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls: customizePrefixCls, bordered = true, size: customizeSize, disabled: customDisabled, status: customStatus, allowClear, classNames, rootClassName, className, style, styles, variant: customVariant, showCount, onMouseDown, onResize, ...rest } = props;
	const { getPrefixCls, direction, allowClear: contextAllowClear, autoComplete: contextAutoComplete, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("textArea");
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const { status: contextStatus, hasFeedback, feedbackIcon } = import_react.useContext(FormItemInputContext);
	const mergedStatus = getMergedStatus(contextStatus, customStatus);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props });
	const innerRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({
		resizableTextArea: innerRef.current?.resizableTextArea,
		focus: (option) => {
			triggerFocus(innerRef.current?.resizableTextArea?.textArea, option);
		},
		blur: () => innerRef.current?.blur(),
		nativeElement: innerRef.current?.nativeElement || null
	}));
	const prefixCls = getPrefixCls("input", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClassName);
	textarea_default(prefixCls, rootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
	const [variant, enableVariantCls] = useVariant("textArea", customVariant, bordered);
	const mergedAllowClear = getAllowClear(allowClear ?? contextAllowClear);
	const [isMouseDown, setIsMouseDown] = import_react.useState(false);
	const [resizeDirty, setResizeDirty] = import_react.useState(false);
	const onInternalMouseDown = (e) => {
		setIsMouseDown(true);
		onMouseDown?.(e);
		const onMouseUp = () => {
			setIsMouseDown(false);
			document.removeEventListener("mouseup", onMouseUp);
		};
		document.addEventListener("mouseup", onMouseUp);
	};
	const onInternalResize = (size) => {
		onResize?.(size);
		if (isMouseDown && typeof getComputedStyle === "function") {
			const ele = innerRef.current?.nativeElement?.querySelector("textarea");
			if (ele && getComputedStyle(ele).resize === "both") setResizeDirty(true);
		}
	};
	return /* @__PURE__ */ import_react.createElement(es_default$10, {
		autoComplete: contextAutoComplete,
		...rest,
		style: {
			...mergedStyles.root,
			...contextStyle,
			...style
		},
		styles: mergedStyles,
		disabled: mergedDisabled,
		allowClear: mergedAllowClear,
		className: clsx(cssVarCls, rootCls, className, rootClassName, compactItemClassnames, contextClassName, mergedClassNames.root, { [`${prefixCls}-textarea-affix-wrapper-resize-dirty`]: resizeDirty }),
		classNames: {
			...mergedClassNames,
			textarea: clsx({
				[`${prefixCls}-sm`]: mergedSize === "small",
				[`${prefixCls}-lg`]: mergedSize === "large"
			}, hashId, mergedClassNames.textarea, isMouseDown && `${prefixCls}-mouse-active`),
			variant: clsx({ [`${prefixCls}-${variant}`]: enableVariantCls }, getStatusClassNames(prefixCls, mergedStatus)),
			affixWrapper: clsx(`${prefixCls}-textarea-affix-wrapper`, {
				[`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl",
				[`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
				[`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
				[`${prefixCls}-textarea-show-count`]: showCount || props.count?.show
			}, hashId)
		},
		prefixCls,
		suffix: hasFeedback && /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-textarea-suffix` }, feedbackIcon),
		showCount,
		ref: innerRef,
		onResize: onInternalResize,
		onMouseDown: onInternalMouseDown
	});
});
//#endregion
//#region node_modules/antd/es/input/index.js
var Input = Input$1;
Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
Input.OTP = OTP;
//#endregion
//#region node_modules/antd/es/pagination/style/index.js
var genPaginationDisabledStyle = (token) => {
	const { componentCls } = token;
	return {
		[`${componentCls}-disabled`]: {
			"&, &:hover": {
				cursor: "not-allowed",
				[`${componentCls}-item-link`]: {
					color: token.colorTextDisabled,
					cursor: "not-allowed"
				}
			},
			"&:focus-visible": {
				cursor: "not-allowed",
				[`${componentCls}-item-link`]: {
					color: token.colorTextDisabled,
					cursor: "not-allowed"
				}
			}
		},
		[`&${componentCls}-disabled`]: {
			cursor: "not-allowed",
			[`${componentCls}-item`]: {
				cursor: "not-allowed",
				backgroundColor: "transparent",
				"&:hover, &:active": { backgroundColor: "transparent" },
				a: {
					color: token.colorTextDisabled,
					backgroundColor: "transparent",
					border: "none",
					cursor: "not-allowed"
				},
				"&-active": {
					borderColor: token.colorBorder,
					backgroundColor: token.itemActiveBgDisabled,
					"&:hover, &:active": { backgroundColor: token.itemActiveBgDisabled },
					a: { color: token.itemActiveColorDisabled }
				}
			},
			[`${componentCls}-item-link`]: {
				color: token.colorTextDisabled,
				cursor: "not-allowed",
				"&:hover, &:active": { backgroundColor: "transparent" },
				[`${componentCls}-simple&`]: {
					backgroundColor: "transparent",
					"&:hover, &:active": { backgroundColor: "transparent" }
				}
			},
			[`${componentCls}-simple-pager`]: { color: token.colorTextDisabled },
			[`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
				[`${componentCls}-item-link-icon`]: { opacity: 0 },
				[`${componentCls}-item-ellipsis`]: { opacity: 1 }
			}
		}
	};
};
var genPaginationSmallStyle = (token) => {
	const { componentCls } = token;
	return { [`&${componentCls}-small ${componentCls}-options`]: {
		marginInlineStart: token.paginationMiniOptionsMarginInlineStart,
		"&-quick-jumper": { input: {
			...genInputSmallStyle(token),
			width: token.paginationMiniQuickJumperInputWidth
		} }
	} };
};
var genPaginationLargeStyle = (token) => {
	const { componentCls } = token;
	return { [`&${componentCls}-large ${componentCls}-options`]: { "&-quick-jumper": { input: { ...genInputLargeStyle(token) } } } };
};
var genPaginationSimpleStyle = (token) => {
	const { componentCls, antCls } = token;
	const [, varRef] = genCssVar(antCls, "pagination");
	return { [`&${componentCls}-simple`]: {
		[`${componentCls}-prev, ${componentCls}-next`]: {
			height: varRef(`item-size-actual`),
			lineHeight: varRef(`item-size-actual`),
			verticalAlign: "top",
			[`${componentCls}-item-link`]: {
				height: varRef(`item-size-actual`),
				backgroundColor: "transparent",
				border: 0,
				"&:hover": { backgroundColor: token.colorBgTextHover },
				"&:active": { backgroundColor: token.colorBgTextActive },
				"&::after": {
					height: varRef(`item-size-actual`),
					lineHeight: varRef(`item-size-actual`)
				}
			}
		},
		[`${componentCls}-simple-pager`]: {
			display: "inline-flex",
			alignItems: "center",
			height: varRef(`item-size-actual`),
			marginInlineEnd: varRef(`item-spacing-actual`),
			input: {
				boxSizing: "border-box",
				height: "100%",
				width: token.quickJumperInputWidth,
				padding: `0 ${unit(token.paginationItemPaddingInline)}`,
				textAlign: "center",
				backgroundColor: token.itemInputBg,
				border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
				borderRadius: token.borderRadius,
				outline: "none",
				transition: `border-color ${token.motionDurationMid}`,
				color: "inherit",
				"&:hover": { borderColor: token.colorPrimary },
				"&:focus": {
					borderColor: token.colorPrimaryHover,
					boxShadow: `${unit(token.inputOutlineOffset)} 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
				},
				"&[disabled]": {
					color: token.colorTextDisabled,
					backgroundColor: token.colorBgContainerDisabled,
					borderColor: token.colorBorder,
					cursor: "not-allowed"
				}
			}
		},
		[`&${componentCls}-disabled`]: { [`${componentCls}-prev, ${componentCls}-next`]: { [`${componentCls}-item-link`]: { "&:hover, &:active": { backgroundColor: "transparent" } } } },
		[`&${componentCls}-small`]: { [`${componentCls}-simple-pager`]: { input: { width: token.paginationMiniQuickJumperInputWidth } } }
	} };
};
var genPaginationJumpStyle = (token) => {
	const { componentCls, antCls } = token;
	const [, varRef] = genCssVar(antCls, "pagination");
	return {
		[`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
			outline: 0,
			[`${componentCls}-item-container`]: {
				position: "relative",
				[`${componentCls}-item-link-icon`]: {
					color: token.colorPrimary,
					fontSize: token.fontSizeSM,
					opacity: 0,
					transition: `all ${token.motionDurationMid}`,
					"&-svg": {
						top: 0,
						insetInlineEnd: 0,
						bottom: 0,
						insetInlineStart: 0,
						margin: "auto"
					}
				},
				[`${componentCls}-item-ellipsis`]: {
					position: "absolute",
					top: 0,
					insetInlineEnd: 0,
					bottom: 0,
					insetInlineStart: 0,
					display: "block",
					margin: "auto",
					color: token.colorTextDisabled,
					letterSpacing: token.paginationEllipsisLetterSpacing,
					textAlign: "center",
					textIndent: token.paginationEllipsisTextIndent,
					opacity: 1,
					transition: `all ${token.motionDurationMid}`
				}
			},
			"&:hover": {
				[`${componentCls}-item-link-icon`]: { opacity: 1 },
				[`${componentCls}-item-ellipsis`]: { opacity: 0 }
			}
		},
		[`
    ${componentCls}-prev,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: { marginInlineEnd: varRef(`item-spacing-actual`) },
		[`
    ${componentCls}-prev,
    ${componentCls}-next,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
			display: "inline-block",
			minWidth: varRef(`item-size-actual`),
			height: varRef(`item-size-actual`),
			color: token.colorText,
			fontFamily: token.fontFamily,
			lineHeight: varRef(`item-size-actual`),
			textAlign: "center",
			verticalAlign: "middle",
			listStyle: "none",
			borderRadius: token.borderRadius,
			cursor: "pointer",
			transition: `all ${token.motionDurationMid}`
		},
		[`${componentCls}-prev, ${componentCls}-next`]: {
			outline: 0,
			button: {
				color: token.colorText,
				cursor: "pointer",
				userSelect: "none"
			},
			[`${componentCls}-item-link`]: {
				display: "block",
				width: "100%",
				height: "100%",
				padding: 0,
				fontSize: token.fontSizeSM,
				textAlign: "center",
				backgroundColor: "transparent",
				border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
				borderRadius: token.borderRadius,
				outline: "none",
				transition: `all ${token.motionDurationMid}`
			},
			[`&:hover ${componentCls}-item-link`]: { backgroundColor: token.colorBgTextHover },
			[`&:active ${componentCls}-item-link`]: { backgroundColor: token.colorBgTextActive },
			[`&${componentCls}-disabled:hover`]: { [`${componentCls}-item-link`]: { backgroundColor: "transparent" } }
		},
		[`${componentCls}-slash`]: {
			marginInlineEnd: token.paginationSlashMarginInlineEnd,
			marginInlineStart: token.paginationSlashMarginInlineStart
		},
		[`${componentCls}-options`]: {
			display: "inline-block",
			marginInlineStart: token.margin,
			verticalAlign: "middle",
			"&-size-changer": { width: "auto" },
			"&-quick-jumper": {
				display: "inline-block",
				height: varRef(`item-size-actual`),
				marginInlineStart: token.marginXS,
				lineHeight: varRef(`item-size-actual`),
				verticalAlign: "baseline",
				input: {
					...genBasicInputStyle(token),
					...genBaseOutlinedStyle(token, {
						borderColor: token.colorBorder,
						hoverBorderColor: token.colorPrimaryHover,
						activeBorderColor: token.colorPrimary,
						activeShadow: token.activeShadow
					}),
					"&[disabled]": { ...genDisabledStyle(token) },
					width: token.quickJumperInputWidth,
					height: varRef(`item-size-actual`),
					boxSizing: "border-box",
					margin: 0,
					marginInlineStart: varRef(`item-spacing-actual`),
					marginInlineEnd: varRef(`item-spacing-actual`)
				}
			}
		}
	};
};
var genPaginationItemStyle = (token) => {
	const { componentCls, antCls } = token;
	const [, varRef] = genCssVar(antCls, "pagination");
	return { [`${componentCls}-item`]: {
		display: "inline-block",
		minWidth: varRef(`item-size-actual`),
		height: varRef(`item-size-actual`),
		marginInlineEnd: varRef(`item-spacing-actual`),
		fontFamily: token.fontFamily,
		lineHeight: unit(token.calc(varRef("item-size-actual")).sub(2).equal()),
		textAlign: "center",
		verticalAlign: "middle",
		listStyle: "none",
		backgroundColor: token.itemBg,
		border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
		borderRadius: token.borderRadius,
		outline: 0,
		cursor: "pointer",
		userSelect: "none",
		a: {
			display: "block",
			padding: `0 ${unit(token.paginationItemPaddingInline)}`,
			color: token.colorText,
			"&:hover": { textDecoration: "none" }
		},
		[`&:not(${componentCls}-item-active)`]: {
			"&:hover": {
				transition: `all ${token.motionDurationMid}`,
				backgroundColor: token.colorBgTextHover
			},
			"&:active": { backgroundColor: token.colorBgTextActive }
		},
		"&-active": {
			fontWeight: token.fontWeightStrong,
			backgroundColor: token.itemActiveBg,
			borderColor: token.colorPrimary,
			a: { color: token.itemActiveColor },
			"&:hover": { borderColor: token.colorPrimaryHover },
			"&:hover a": { color: token.itemActiveColorHover }
		}
	} };
};
var genPaginationStyle = (token) => {
	const { componentCls, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "pagination");
	return {
		[componentCls]: {
			[varName(`item-size-actual`)]: unit(token.itemSize),
			[varName(`item-spacing-actual`)]: unit(token.marginXS),
			"&-small": {
				[varName(`item-size-actual`)]: unit(token.itemSizeSM),
				[varName(`item-spacing-actual`)]: unit(token.marginXXS)
			},
			"&-large": {
				[varName(`item-size-actual`)]: unit(token.itemSizeLG),
				[varName(`item-spacing-actual`)]: unit(token.marginSM)
			},
			...resetComponent(token),
			display: "flex",
			alignItems: "center",
			"&-start": { justifyContent: "start" },
			"&-center": { justifyContent: "center" },
			"&-end": { justifyContent: "end" },
			"ul, ol": {
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			"&::after": {
				display: "block",
				clear: "both",
				height: 0,
				overflow: "hidden",
				visibility: "hidden",
				content: "\"\""
			},
			[`${componentCls}-total-text`]: {
				display: "inline-block",
				height: varRef(`item-size-actual`),
				marginInlineEnd: varRef(`item-spacing-actual`),
				lineHeight: unit(token.calc(varRef(`item-size-actual`)).sub(2).equal()),
				verticalAlign: "middle"
			},
			...genPaginationItemStyle(token),
			...genPaginationJumpStyle(token),
			...genPaginationSimpleStyle(token),
			...genPaginationSmallStyle(token),
			...genPaginationLargeStyle(token),
			...genPaginationDisabledStyle(token),
			[`@media only screen and (max-width: ${token.screenLG}px)`]: { [`${componentCls}-item`]: { "&-after-jump-prev, &-before-jump-next": { display: "none" } } },
			[`@media only screen and (max-width: ${token.screenSM}px)`]: { [`${componentCls}-options`]: { display: "none" } }
		},
		[`&${token.componentCls}-rtl`]: { direction: "rtl" }
	};
};
var genPaginationFocusStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}:not(${componentCls}-disabled)`]: {
		[`${componentCls}-item`]: { ...genFocusStyle(token) },
		[`${componentCls}-jump-prev, ${componentCls}-jump-next`]: { "&:focus-visible": {
			[`${componentCls}-item-link-icon`]: { opacity: 1 },
			[`${componentCls}-item-ellipsis`]: { opacity: 0 },
			...genFocusOutline(token)
		} },
		[`${componentCls}-prev, ${componentCls}-next`]: { [`&:focus-visible ${componentCls}-item-link`]: genFocusOutline(token) }
	} };
};
var prepareComponentToken$9 = (token) => ({
	itemBg: token.colorBgContainer,
	itemSize: token.controlHeight,
	itemSizeSM: token.controlHeightSM,
	itemSizeLG: token.controlHeightLG,
	itemActiveBg: token.colorBgContainer,
	itemActiveColor: token.colorPrimary,
	itemActiveColorHover: token.colorPrimaryHover,
	itemLinkBg: token.colorBgContainer,
	itemActiveColorDisabled: token.colorTextDisabled,
	itemActiveBgDisabled: token.controlItemBgActiveDisabled,
	itemInputBg: token.colorBgContainer,
	miniOptionsSizeChangerTop: 0,
	...initComponentToken(token)
});
var prepareToken$1 = (token) => merge$1(token, {
	inputOutlineOffset: 0,
	quickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.25).equal(),
	paginationMiniOptionsMarginInlineStart: token.calc(token.marginXXS).div(2).equal(),
	paginationMiniQuickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.1).equal(),
	paginationItemPaddingInline: token.calc(token.marginXXS).mul(1.5).equal(),
	paginationEllipsisLetterSpacing: token.calc(token.marginXXS).div(2).equal(),
	paginationSlashMarginInlineStart: token.marginSM,
	paginationSlashMarginInlineEnd: token.marginSM,
	paginationEllipsisTextIndent: "0.13em"
}, initInputToken(token));
var style_default$9 = genStyleHooks("Pagination", (token) => {
	const paginationToken = prepareToken$1(token);
	return [genPaginationStyle(paginationToken), genPaginationFocusStyle(paginationToken)];
}, prepareComponentToken$9);
//#endregion
//#region node_modules/antd/es/pagination/style/bordered.js
var genBorderedStyle$1 = (token) => {
	const { componentCls } = token;
	return {
		[`${componentCls}${componentCls}-bordered${componentCls}-disabled`]: {
			"&, &:hover": { [`${componentCls}-item-link`]: { borderColor: token.colorBorder } },
			"&:focus-visible": { [`${componentCls}-item-link`]: { borderColor: token.colorBorder } },
			[`${componentCls}-item, ${componentCls}-item-link`]: {
				backgroundColor: token.colorBgContainerDisabled,
				borderColor: token.colorBorder,
				[`&:hover:not(${componentCls}-item-active)`]: {
					backgroundColor: token.colorBgContainerDisabled,
					borderColor: token.colorBorder,
					a: { color: token.colorTextDisabled }
				},
				[`&${componentCls}-item-active`]: { backgroundColor: token.itemActiveBgDisabled }
			},
			[`${componentCls}-prev, ${componentCls}-next`]: {
				"&:hover button": {
					backgroundColor: token.colorBgContainerDisabled,
					borderColor: token.colorBorder,
					color: token.colorTextDisabled
				},
				[`${componentCls}-item-link`]: {
					backgroundColor: token.colorBgContainerDisabled,
					borderColor: token.colorBorder
				}
			}
		},
		[`${componentCls}${componentCls}-bordered`]: {
			[`${componentCls}-prev, ${componentCls}-next`]: {
				"&:hover button": {
					borderColor: token.colorPrimaryHover,
					backgroundColor: token.itemBg
				},
				[`${componentCls}-item-link`]: {
					backgroundColor: token.itemLinkBg,
					borderColor: token.colorBorder
				},
				[`&:hover ${componentCls}-item-link`]: {
					borderColor: token.colorPrimary,
					backgroundColor: token.itemBg,
					color: token.colorPrimary
				},
				[`&${componentCls}-disabled`]: { [`${componentCls}-item-link`]: {
					borderColor: token.colorBorder,
					color: token.colorTextDisabled
				} }
			},
			[`${componentCls}-item`]: {
				backgroundColor: token.itemBg,
				border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
				[`&:hover:not(${componentCls}-item-active)`]: {
					borderColor: token.colorPrimary,
					backgroundColor: token.itemBg,
					a: { color: token.colorPrimary }
				},
				"&-active": { borderColor: token.colorPrimary }
			}
		}
	};
};
var bordered_default = genSubStyleComponent(["Pagination", "bordered"], (token) => {
	return genBorderedStyle$1(prepareToken$1(token));
}, prepareComponentToken$9);
//#endregion
//#region node_modules/antd/es/pagination/useShowSizeChanger.js
function useShowSizeChanger(showSizeChanger) {
	return (0, import_react.useMemo)(() => {
		if (typeof showSizeChanger === "boolean") return [showSizeChanger, {}];
		if (showSizeChanger && typeof showSizeChanger === "object") return [true, showSizeChanger];
		return [void 0, void 0];
	}, [showSizeChanger]);
}
//#endregion
//#region node_modules/antd/es/pagination/Pagination.js
var Pagination = (props) => {
	const { align, prefixCls: customizePrefixCls, selectPrefixCls: customizeSelectPrefixCls, className, rootClassName, style, size: customizeSize, locale: customLocale, responsive, showSizeChanger, selectComponentClass, pageSizeOptions, styles, classNames, ...restProps } = props;
	const { xs } = useBreakpoint(responsive);
	const [, token] = useToken();
	const { getPrefixCls, direction, showSizeChanger: contextShowSizeChangerConfig, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, totalBoundaryShowSizeChanger: contextTotalBoundaryShowSizeChanger } = useComponentConfig("pagination");
	const prefixCls = getPrefixCls("pagination", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$9(prefixCls);
	const mergedSize = useSize(customizeSize);
	const isSmall = mergedSize === "small" || !!(xs && !mergedSize && responsive);
	const mergedProps = {
		...props,
		size: mergedSize
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const [contextLocale] = useLocale("Pagination", locale$3);
	const locale = {
		...contextLocale,
		...customLocale
	};
	const [propShowSizeChanger, propSizeChangerSelectProps] = useShowSizeChanger(showSizeChanger);
	const [contextShowSizeChanger, contextSizeChangerSelectProps] = useShowSizeChanger(contextShowSizeChangerConfig);
	const mergedShowSizeChanger = propShowSizeChanger ?? contextShowSizeChanger;
	const mergedShowSizeChangerSelectProps = propSizeChangerSelectProps ?? contextSizeChangerSelectProps;
	const SizeChanger = selectComponentClass || Select;
	const mergedPageSizeOptions = import_react.useMemo(() => {
		return pageSizeOptions ? pageSizeOptions.map(Number) : void 0;
	}, [pageSizeOptions]);
	const sizeChangerRender = (info) => {
		const { disabled, size: pageSize, onSizeChange, "aria-label": ariaLabel, className: sizeChangerClassName, options } = info;
		const { className: propSizeChangerClassName, onChange: propSizeChangerOnChange } = mergedShowSizeChangerSelectProps || {};
		const selectedValue = options.find((option) => String(option.value) === String(pageSize))?.value;
		return /* @__PURE__ */ import_react.createElement(SizeChanger, {
			disabled,
			showSearch: true,
			popupMatchSelectWidth: false,
			getPopupContainer: (triggerNode) => triggerNode.parentNode,
			"aria-label": ariaLabel,
			options,
			...mergedShowSizeChangerSelectProps,
			value: selectedValue,
			onChange: (nextSize, option) => {
				onSizeChange?.(nextSize);
				propSizeChangerOnChange?.(nextSize, option);
			},
			size: mergedSize,
			className: clsx(sizeChangerClassName, propSizeChangerClassName)
		});
	};
	const iconsProps = import_react.useMemo(() => {
		const ellipsis = /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-item-ellipsis` }, "•••");
		return {
			prevIcon: /* @__PURE__ */ import_react.createElement("button", {
				className: `${prefixCls}-item-link`,
				type: "button",
				tabIndex: -1
			}, direction === "rtl" ? /* @__PURE__ */ import_react.createElement(RefIcon$19, null) : /* @__PURE__ */ import_react.createElement(RefIcon$20, null)),
			nextIcon: /* @__PURE__ */ import_react.createElement("button", {
				className: `${prefixCls}-item-link`,
				type: "button",
				tabIndex: -1
			}, direction === "rtl" ? /* @__PURE__ */ import_react.createElement(RefIcon$20, null) : /* @__PURE__ */ import_react.createElement(RefIcon$19, null)),
			jumpPrevIcon: /* @__PURE__ */ import_react.createElement("a", { className: `${prefixCls}-item-link` }, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-item-container` }, direction === "rtl" ? /* @__PURE__ */ import_react.createElement(RefIcon$21, { className: `${prefixCls}-item-link-icon` }) : /* @__PURE__ */ import_react.createElement(RefIcon$22, { className: `${prefixCls}-item-link-icon` }), ellipsis)),
			jumpNextIcon: /* @__PURE__ */ import_react.createElement("a", { className: `${prefixCls}-item-link` }, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-item-container` }, direction === "rtl" ? /* @__PURE__ */ import_react.createElement(RefIcon$22, { className: `${prefixCls}-item-link-icon` }) : /* @__PURE__ */ import_react.createElement(RefIcon$21, { className: `${prefixCls}-item-link-icon` }), ellipsis))
		};
	}, [direction, prefixCls]);
	const selectPrefixCls = getPrefixCls("select", customizeSelectPrefixCls);
	const extendedClassName = clsx({
		[`${prefixCls}-${align}`]: !!align,
		[`${prefixCls}-${mergedSize}`]: mergedSize,
		[`${prefixCls}-mini`]: isSmall,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-bordered`]: token.wireframe
	}, contextClassName, className, rootClassName, mergedClassNames.root, hashId, cssVarCls);
	const mergedStyle = {
		...mergedStyles.root,
		...contextStyle,
		...style
	};
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, token.wireframe && /* @__PURE__ */ import_react.createElement(bordered_default, { prefixCls }), /* @__PURE__ */ import_react.createElement(Pagination$1, {
		...iconsProps,
		...restProps,
		styles: mergedStyles,
		classNames: mergedClassNames,
		style: mergedStyle,
		prefixCls,
		selectPrefixCls,
		className: extendedClassName,
		locale,
		pageSizeOptions: mergedPageSizeOptions,
		showSizeChanger: mergedShowSizeChanger,
		totalBoundaryShowSizeChanger: restProps.totalBoundaryShowSizeChanger ?? contextTotalBoundaryShowSizeChanger,
		sizeChangerRender
	}));
};
//#endregion
//#region node_modules/antd/es/pagination/index.js
var pagination_default = Pagination;
//#endregion
//#region node_modules/antd/es/spin/Indicator/Progress.js
var viewSize = 100;
var borderWidth = viewSize / 5;
var radius = viewSize / 2 - borderWidth / 2;
var circumference = radius * 2 * Math.PI;
var position = 50;
var CustomCircle = (props) => {
	const { dotClassName, style, hasCircleCls } = props;
	return /* @__PURE__ */ import_react.createElement("circle", {
		className: clsx(`${dotClassName}-circle`, { [`${dotClassName}-circle-bg`]: hasCircleCls }),
		r: radius,
		cx: position,
		cy: position,
		strokeWidth: borderWidth,
		style
	});
};
var Progress$1 = ({ percent, prefixCls }) => {
	const dotClassName = `${prefixCls}-dot`;
	const holderClassName = `${dotClassName}-holder`;
	const hideClassName = `${holderClassName}-hidden`;
	const [render, setRender] = import_react.useState(false);
	useLayoutEffect(() => {
		if (percent !== 0) setRender(true);
	}, [percent !== 0]);
	const safePtg = Math.max(Math.min(percent, 100), 0);
	if (!render) return null;
	const circleStyle = {
		strokeDashoffset: `${circumference / 4}`,
		strokeDasharray: `${circumference * safePtg / 100} ${circumference * (100 - safePtg) / 100}`
	};
	return /* @__PURE__ */ import_react.createElement("span", { className: clsx(holderClassName, `${dotClassName}-progress`, safePtg <= 0 && hideClassName) }, /* @__PURE__ */ import_react.createElement("svg", {
		viewBox: `0 0 ${viewSize} ${viewSize}`,
		role: "progressbar",
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": safePtg
	}, /* @__PURE__ */ import_react.createElement(CustomCircle, {
		dotClassName,
		hasCircleCls: true
	}), /* @__PURE__ */ import_react.createElement(CustomCircle, {
		dotClassName,
		style: circleStyle
	})));
};
//#endregion
//#region node_modules/antd/es/spin/Indicator/Looper.js
function Looper(props) {
	const { prefixCls, percent = 0, className, style } = props;
	const dotClassName = `${prefixCls}-dot`;
	const holderClassName = `${dotClassName}-holder`;
	const hideClassName = `${holderClassName}-hidden`;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("span", {
		className: clsx(holderClassName, className, percent > 0 && hideClassName),
		style
	}, /* @__PURE__ */ import_react.createElement("span", { className: clsx(dotClassName, `${prefixCls}-dot-spin`) }, [
		1,
		2,
		3,
		4
	].map((i) => /* @__PURE__ */ import_react.createElement("i", {
		className: `${prefixCls}-dot-item`,
		key: i
	})))), /* @__PURE__ */ import_react.createElement(Progress$1, {
		prefixCls,
		percent
	}));
}
//#endregion
//#region node_modules/antd/es/spin/Indicator/index.js
function Indicator(props) {
	const { prefixCls, indicator, percent, className, style } = props;
	const dotClassName = `${prefixCls}-dot`;
	if (indicator && /* @__PURE__ */ import_react.isValidElement(indicator)) return cloneElement(indicator, (currentProps) => ({
		className: clsx(currentProps.className, dotClassName, className),
		style: {
			...currentProps.style,
			...style
		},
		percent
	}));
	return /* @__PURE__ */ import_react.createElement(Looper, {
		prefixCls,
		percent,
		className,
		style
	});
}
//#endregion
//#region node_modules/antd/es/spin/style/index.js
var antSpinMove = new Keyframe("antSpinMove", { to: { opacity: 1 } });
var antRotate = new Keyframe("antRotate", { to: { transform: "rotate(405deg)" } });
var genSpinStyle = (token) => {
	const { componentCls } = token;
	const sectionCls = `${componentCls}-section`;
	return { [componentCls]: {
		...resetComponent(token),
		position: "relative",
		"&-rtl": { direction: "rtl" },
		[`&${sectionCls}, ${sectionCls}`]: {
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			gap: token.paddingSM,
			color: token.colorPrimary
		},
		[`&${sectionCls}`]: { display: "inline-flex" },
		[sectionCls]: {
			position: "absolute",
			top: "50%",
			left: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translate(-50%, -50%)",
			zIndex: 1
		},
		[`${componentCls}-description`]: {
			fontSize: token.fontSize,
			lineHeight: 1
		},
		[`${componentCls}-container`]: {
			position: "relative",
			transition: `opacity ${token.motionDurationSlow}`,
			"&::after": {
				position: "absolute",
				top: 0,
				insetInlineEnd: 0,
				bottom: 0,
				insetInlineStart: 0,
				zIndex: 10,
				width: "100%",
				height: "100%",
				background: token.colorBgContainer,
				opacity: 0,
				transition: `all ${token.motionDurationSlow}`,
				content: "\"\"",
				pointerEvents: "none"
			}
		},
		"&-spinning": {
			[`${componentCls}-description`]: { textShadow: `0 0px 5px ${token.colorBgContainer}` },
			[`${componentCls}-container`]: {
				clear: "both",
				opacity: .5,
				userSelect: "none",
				pointerEvents: "none",
				"&::after": {
					opacity: .4,
					pointerEvents: "auto"
				}
			}
		},
		"&-fullscreen": {
			position: "fixed",
			inset: 0,
			backgroundColor: token.colorBgMask,
			zIndex: token.zIndexPopupBase,
			opacity: 0,
			pointerEvents: "none",
			transition: `all ${token.motionDurationMid}`,
			[`&${componentCls}-spinning`]: {
				opacity: 1,
				pointerEvents: "auto"
			},
			[sectionCls]: {
				color: token.colorWhite,
				[`${componentCls}-description`]: { color: token.colorTextLightSolid }
			}
		}
	} };
};
var genIndicatorStyle = (token) => {
	const { componentCls, antCls, motionDurationSlow } = token;
	const [varName, varRef] = genCssVar(antCls, "spin");
	return { [componentCls]: {
		[varName("dot-holder-size")]: token.dotSize,
		[varName("dot-item-size")]: `calc((${varRef("dot-holder-size")} - ${token.marginXXS} / 2) / 2)`,
		[`${componentCls}-dot`]: {
			"&-holder": {
				width: "1em",
				height: "1em",
				fontSize: varRef("dot-holder-size"),
				display: "inline-block",
				transition: ["transform", "opacity"].map((prop) => `${prop} ${motionDurationSlow} ease`).join(", "),
				transformOrigin: "50% 50%",
				lineHeight: 1,
				"&-hidden": {
					transform: "scale(0.3)",
					opacity: 0
				}
			},
			position: "relative",
			display: "inline-block",
			fontSize: varRef("dot-holder-size"),
			width: "1em",
			height: "1em",
			"&-spin": {
				transform: "rotate(45deg)",
				animationName: antRotate,
				animationDuration: "1.2s",
				animationIterationCount: "infinite",
				animationTimingFunction: "linear"
			},
			"&-item": {
				position: "absolute",
				display: "block",
				width: varRef("dot-item-size"),
				height: varRef("dot-item-size"),
				background: "currentColor",
				borderRadius: "100%",
				transform: "scale(0.75)",
				transformOrigin: "50% 50%",
				opacity: .3,
				animationName: antSpinMove,
				animationDuration: "1s",
				animationIterationCount: "infinite",
				animationTimingFunction: "linear",
				animationDirection: "alternate",
				"&:nth-child(1)": {
					top: 0,
					insetInlineStart: 0,
					animationDelay: "0s"
				},
				"&:nth-child(2)": {
					top: 0,
					insetInlineEnd: 0,
					animationDelay: "0.4s"
				},
				"&:nth-child(3)": {
					insetInlineEnd: 0,
					bottom: 0,
					animationDelay: "0.8s"
				},
				"&:nth-child(4)": {
					bottom: 0,
					insetInlineStart: 0,
					animationDelay: "1.2s"
				}
			},
			"&-progress": {
				position: "absolute",
				left: "50%",
				top: 0,
				transform: "translateX(-50%)"
			},
			"&-circle": {
				strokeLinecap: "round",
				transition: [
					"stroke-dashoffset",
					"stroke-dasharray",
					"stroke",
					"stroke-width",
					"opacity"
				].map((item) => `${item} ${motionDurationSlow} ease`).join(","),
				fillOpacity: 0,
				stroke: "currentcolor"
			},
			"&-circle-bg": { stroke: token.colorFillSecondary }
		}
	} };
};
var genSizeStyle = (token) => {
	const { componentCls } = token;
	const [varName] = genCssVar(token.antCls, "spin");
	return { [componentCls]: {
		"&-sm": { [varName("dot-holder-size")]: token.dotSizeSM },
		"&-lg": { [varName("dot-holder-size")]: token.dotSizeLG }
	} };
};
var prepareComponentToken$8 = (token) => {
	const { controlHeightLG, controlHeight } = token;
	return {
		contentHeight: 400,
		dotSize: controlHeightLG / 2,
		dotSizeSM: controlHeightLG * .35,
		dotSizeLG: controlHeight
	};
};
var style_default$8 = genStyleHooks("Spin", (token) => {
	const spinToken = merge$1(token, { spinDotDefault: token.colorTextDescription });
	return [
		genSpinStyle(spinToken),
		genIndicatorStyle(spinToken),
		genSizeStyle(spinToken)
	];
}, prepareComponentToken$8);
//#endregion
//#region node_modules/antd/es/spin/usePercent.js
var AUTO_INTERVAL = 200;
var STEP_BUCKETS = [
	[30, .05],
	[70, .03],
	[96, .01]
];
function usePercent(spinning, percent) {
	const [mockPercent, setMockPercent] = import_react.useState(0);
	const mockIntervalRef = import_react.useRef(null);
	const isAuto = percent === "auto";
	import_react.useEffect(() => {
		if (isAuto && spinning) {
			setMockPercent(0);
			mockIntervalRef.current = setInterval(() => {
				setMockPercent((prev) => {
					const restPTG = 100 - prev;
					for (let i = 0; i < STEP_BUCKETS.length; i += 1) {
						const [limit, stepPtg] = STEP_BUCKETS[i];
						if (prev <= limit) return prev + restPTG * stepPtg;
					}
					return prev;
				});
			}, AUTO_INTERVAL);
		}
		return () => {
			if (mockIntervalRef.current) {
				clearInterval(mockIntervalRef.current);
				mockIntervalRef.current = null;
			}
		};
	}, [isAuto, spinning]);
	return isAuto ? mockPercent : percent;
}
//#endregion
//#region node_modules/antd/es/spin/index.js
var defaultIndicator;
function shouldDelay(spinning, delay) {
	return !!spinning && !!delay && !Number.isNaN(Number(delay));
}
var Spin = (props) => {
	const { prefixCls: customizePrefixCls, spinning: customSpinning = true, delay = 0, className, rootClassName, size, tip, description, wrapperClassName, style, children, fullscreen = false, indicator, percent, classNames, styles, ...restProps } = props;
	const { getPrefixCls, direction, indicator: contextIndicator, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("spin");
	const prefixCls = getPrefixCls("spin", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$8(prefixCls);
	const [spinning, setSpinning] = import_react.useState(() => customSpinning && !shouldDelay(customSpinning, delay));
	const mergedPercent = usePercent(spinning, percent);
	import_react.useEffect(() => {
		if (customSpinning) {
			const showSpinning = debounce(delay, () => {
				setSpinning(true);
			});
			showSpinning();
			return () => {
				showSpinning?.cancel?.();
			};
		}
		setSpinning(false);
	}, [delay, customSpinning]);
	const mergedSize = useSize((ctx) => size ?? ctx);
	const mergedDescription = description ?? tip;
	const mergedProps = {
		...props,
		size: mergedSize,
		spinning,
		tip: mergedDescription,
		description: mergedDescription,
		fullscreen,
		children,
		percent: mergedPercent
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const mergedIndicator = indicator ?? contextIndicator ?? defaultIndicator;
	const hasChildren = typeof children !== "undefined";
	const isNested = hasChildren || fullscreen;
	const indicatorNode = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(Indicator, {
		className: clsx(mergedClassNames.indicator),
		style: mergedStyles.indicator,
		prefixCls,
		indicator: mergedIndicator,
		percent: mergedPercent
	}), mergedDescription && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-description`, mergedClassNames.tip, mergedClassNames.description),
		style: {
			...mergedStyles.tip,
			...mergedStyles.description
		}
	}, mergedDescription));
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(prefixCls, {
			[`${prefixCls}-sm`]: mergedSize === "small",
			[`${prefixCls}-lg`]: mergedSize === "large",
			[`${prefixCls}-spinning`]: spinning,
			[`${prefixCls}-rtl`]: direction === "rtl",
			[`${prefixCls}-fullscreen`]: fullscreen
		}, rootClassName, mergedClassNames.root, fullscreen && mergedClassNames.mask, isNested ? wrapperClassName : [`${prefixCls}-section`, mergedClassNames.section], contextClassName, className, hashId, cssVarCls),
		style: {
			...mergedStyles.root,
			...!isNested ? mergedStyles.section : {},
			...fullscreen ? mergedStyles.mask : {},
			...contextStyle,
			...style
		},
		"aria-live": "polite",
		"aria-busy": spinning,
		...restProps
	}, spinning && (isNested ? /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-section`, mergedClassNames.section),
		style: mergedStyles.section
	}, indicatorNode) : indicatorNode), hasChildren && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-container`, mergedClassNames.container),
		style: mergedStyles.container
	}, children));
};
Spin.setDefaultIndicator = (indicator) => {
	defaultIndicator = indicator;
};
//#endregion
//#region node_modules/antd/es/list/context.js
var ListContext = /* @__PURE__ */ import_react.createContext({});
ListContext.Consumer;
//#endregion
//#region node_modules/antd/es/list/Item.js
var Meta = ({ prefixCls: customizePrefixCls, className, avatar, title, description, ...others }) => {
	const { getPrefixCls } = (0, import_react.useContext)(ConfigContext);
	const prefixCls = getPrefixCls("list", customizePrefixCls);
	const classString = clsx(`${prefixCls}-item-meta`, className);
	const content = /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-item-meta-content` }, title && /* @__PURE__ */ import_react.createElement("h4", { className: `${prefixCls}-item-meta-title` }, title), description && /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-item-meta-description` }, description));
	return /* @__PURE__ */ import_react.createElement("div", {
		...others,
		className: classString
	}, avatar && /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-item-meta-avatar` }, avatar), (title || description) && content);
};
var Item = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, children, actions, extra, styles, className, classNames: customizeClassNames, colStyle, ...others } = props;
	const { grid, itemLayout } = (0, import_react.useContext)(ListContext);
	const { getPrefixCls, list } = (0, import_react.useContext)(ConfigContext);
	const moduleClass = (moduleName) => clsx(list?.item?.classNames?.[moduleName], customizeClassNames?.[moduleName]);
	const moduleStyle = (moduleName) => ({
		...list?.item?.styles?.[moduleName],
		...styles?.[moduleName]
	});
	const isItemContainsTextNodeAndNotSingular = () => {
		const childNodes = toArray$1(children);
		return childNodes.some((node) => typeof node === "string") && childNodes.length > 1;
	};
	const isFlexMode = () => {
		if (itemLayout === "vertical") return !!extra;
		return !isItemContainsTextNodeAndNotSingular();
	};
	const prefixCls = getPrefixCls("list", customizePrefixCls);
	const actionsContent = actions && actions.length > 0 && /* @__PURE__ */ import_react.createElement("ul", {
		className: clsx(`${prefixCls}-item-action`, moduleClass("actions")),
		key: "actions",
		style: moduleStyle("actions")
	}, actions.map((action, i) => /* @__PURE__ */ import_react.createElement("li", { key: `${prefixCls}-item-action-${i}` }, action, i !== actions.length - 1 && /* @__PURE__ */ import_react.createElement("em", { className: `${prefixCls}-item-action-split` }))));
	const Element = grid ? "div" : "li";
	const itemChildren = /* @__PURE__ */ import_react.createElement(Element, {
		...others,
		...!grid ? { ref } : {},
		className: clsx(`${prefixCls}-item`, { [`${prefixCls}-item-no-flex`]: !isFlexMode() }, className)
	}, itemLayout === "vertical" && extra ? [/* @__PURE__ */ import_react.createElement("div", {
		className: `${prefixCls}-item-main`,
		key: "content"
	}, children, actionsContent), /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-item-extra`, moduleClass("extra")),
		key: "extra",
		style: moduleStyle("extra")
	}, extra)] : [
		children,
		actionsContent,
		cloneElement(extra, { key: "extra" })
	]);
	return grid ? /* @__PURE__ */ import_react.createElement(Col, {
		ref,
		flex: 1,
		style: colStyle
	}, itemChildren) : itemChildren;
});
Item.Meta = Meta;
//#endregion
//#region node_modules/antd/es/list/style/index.js
var genBorderedStyle = (token) => {
	const { listBorderedCls, componentCls, paddingLG, margin, itemPaddingSM, itemPaddingLG, marginLG, borderRadiusLG } = token;
	const innerCornerBorderRadius = unit(token.calc(borderRadiusLG).sub(token.lineWidth).equal());
	return {
		[listBorderedCls]: {
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderRadius: borderRadiusLG,
			[`${componentCls}-header`]: { borderRadius: `${innerCornerBorderRadius} ${innerCornerBorderRadius} 0 0` },
			[`${componentCls}-footer`]: { borderRadius: `0 0 ${innerCornerBorderRadius} ${innerCornerBorderRadius}` },
			[`${componentCls}-header,${componentCls}-footer,${componentCls}-item`]: { paddingInline: paddingLG },
			[`${componentCls}-pagination`]: { margin: `${unit(margin)} ${unit(marginLG)}` }
		},
		[`${listBorderedCls}${componentCls}-sm`]: { [`${componentCls}-item,${componentCls}-header,${componentCls}-footer`]: { padding: itemPaddingSM } },
		[`${listBorderedCls}${componentCls}-lg`]: { [`${componentCls}-item,${componentCls}-header,${componentCls}-footer`]: { padding: itemPaddingLG } }
	};
};
var genResponsiveStyle = (token) => {
	const { componentCls, screenSM, screenMD, marginLG, marginSM, margin } = token;
	return {
		[`@media screen and (max-width:${screenMD}px)`]: {
			[componentCls]: { [`${componentCls}-item`]: { [`${componentCls}-item-action`]: { marginInlineStart: marginLG } } },
			[`${componentCls}-vertical`]: { [`${componentCls}-item`]: { [`${componentCls}-item-extra`]: { marginInlineStart: marginLG } } }
		},
		[`@media screen and (max-width: ${screenSM}px)`]: {
			[componentCls]: { [`${componentCls}-item`]: {
				flexWrap: "wrap",
				[`${componentCls}-action`]: { marginInlineStart: marginSM }
			} },
			[`${componentCls}-vertical`]: { [`${componentCls}-item`]: {
				flexWrap: "wrap-reverse",
				[`${componentCls}-item-main`]: { minWidth: token.contentWidth },
				[`${componentCls}-item-extra`]: { margin: `auto auto ${unit(margin)}` }
			} }
		}
	};
};
var genBaseStyle$4 = (token) => {
	const { componentCls, antCls, controlHeight, minHeight, paddingSM, marginLG, padding, itemPadding, colorPrimary, itemPaddingSM, itemPaddingLG, paddingXS, margin, colorText, colorTextDescription, motionDurationSlow, lineWidth, headerBg, footerBg, emptyTextPadding, metaMarginBottom, avatarMarginRight, titleMarginBottom, descriptionFontSize } = token;
	return {
		[componentCls]: {
			...resetComponent(token),
			position: "relative",
			["--rc-virtual-list-scrollbar-bg"]: token.colorSplit,
			"*": { outline: "none" },
			[`${componentCls}-header`]: { background: headerBg },
			[`${componentCls}-footer`]: { background: footerBg },
			[`${componentCls}-header, ${componentCls}-footer`]: { paddingBlock: paddingSM },
			[`${componentCls}-pagination`]: {
				marginBlockStart: marginLG,
				[`${antCls}-pagination-options`]: { textAlign: "start" }
			},
			[`${componentCls}-spin`]: {
				minHeight,
				textAlign: "center"
			},
			[`${componentCls}-items`]: {
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			[`${componentCls}-item`]: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: itemPadding,
				color: colorText,
				[`${componentCls}-item-meta`]: {
					display: "flex",
					flex: 1,
					alignItems: "flex-start",
					maxWidth: "100%",
					[`${componentCls}-item-meta-avatar`]: { marginInlineEnd: avatarMarginRight },
					[`${componentCls}-item-meta-content`]: {
						flex: "1 0",
						width: 0,
						color: colorText
					},
					[`${componentCls}-item-meta-title`]: {
						margin: `0 0 ${unit(token.marginXXS)} 0`,
						color: colorText,
						fontSize: token.fontSize,
						lineHeight: token.lineHeight,
						"> a": {
							color: colorText,
							transition: `all ${motionDurationSlow}`,
							"&:hover": { color: colorPrimary }
						}
					},
					[`${componentCls}-item-meta-description`]: {
						color: colorTextDescription,
						fontSize: descriptionFontSize,
						lineHeight: token.lineHeight
					}
				},
				[`${componentCls}-item-action`]: {
					flex: "0 0 auto",
					marginInlineStart: token.marginXXL,
					padding: 0,
					fontSize: 0,
					listStyle: "none",
					"& > li": {
						position: "relative",
						display: "inline-block",
						padding: `0 ${unit(paddingXS)}`,
						color: colorTextDescription,
						fontSize: token.fontSize,
						lineHeight: token.lineHeight,
						textAlign: "center",
						"&:first-child": { paddingInlineStart: 0 }
					},
					[`${componentCls}-item-action-split`]: {
						position: "absolute",
						insetBlockStart: "50%",
						insetInlineEnd: 0,
						width: lineWidth,
						height: token.calc(token.fontHeight).sub(token.calc(token.marginXXS).mul(2)).equal(),
						transform: "translateY(-50%)",
						backgroundColor: token.colorSplit
					}
				}
			},
			[`${componentCls}-empty`]: {
				padding: `${unit(padding)} 0`,
				color: colorTextDescription,
				fontSize: token.fontSizeSM,
				textAlign: "center"
			},
			[`${componentCls}-empty-text`]: {
				padding: emptyTextPadding,
				color: token.colorTextDisabled,
				fontSize: token.fontSize,
				textAlign: "center"
			},
			[`${componentCls}-item-no-flex`]: { display: "block" }
		},
		[`${componentCls}-grid ${antCls}-col > ${componentCls}-item`]: {
			display: "block",
			maxWidth: "100%",
			marginBlockEnd: margin,
			paddingBlock: 0,
			borderBlockEnd: "none"
		},
		[`${componentCls}-vertical ${componentCls}-item`]: {
			alignItems: "initial",
			[`${componentCls}-item-main`]: {
				display: "block",
				flex: 1
			},
			[`${componentCls}-item-extra`]: { marginInlineStart: marginLG },
			[`${componentCls}-item-meta`]: {
				marginBlockEnd: metaMarginBottom,
				[`${componentCls}-item-meta-title`]: {
					marginBlockStart: 0,
					marginBlockEnd: titleMarginBottom,
					color: colorText,
					fontSize: token.fontSizeLG,
					lineHeight: token.lineHeightLG
				}
			},
			[`${componentCls}-item-action`]: {
				marginBlockStart: padding,
				marginInlineStart: "auto",
				"> li": {
					padding: `0 ${unit(padding)}`,
					"&:first-child": { paddingInlineStart: 0 }
				}
			}
		},
		[`${componentCls}-split ${componentCls}-item`]: {
			borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
			"&:last-child": { borderBlockEnd: "none" }
		},
		[`${componentCls}-split ${componentCls}-header`]: { borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` },
		[`${componentCls}-split${componentCls}-empty ${componentCls}-footer`]: { borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` },
		[`${componentCls}-loading ${componentCls}-spin-nested-loading`]: { minHeight: controlHeight },
		[`${componentCls}-split${componentCls}-something-after-last-item ${antCls}-spin-container > ${componentCls}-items > ${componentCls}-item:last-child`]: { borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` },
		[`${componentCls}-lg ${componentCls}-item`]: { padding: itemPaddingLG },
		[`${componentCls}-sm ${componentCls}-item`]: { padding: itemPaddingSM },
		[`${componentCls}:not(${componentCls}-vertical)`]: { [`${componentCls}-item-no-flex`]: { [`${componentCls}-item-action`]: { float: "right" } } }
	};
};
var prepareComponentToken$7 = (token) => ({
	contentWidth: 220,
	itemPadding: `${unit(token.paddingContentVertical)} 0`,
	itemPaddingSM: `${unit(token.paddingContentVerticalSM)} ${unit(token.paddingContentHorizontal)}`,
	itemPaddingLG: `${unit(token.paddingContentVerticalLG)} ${unit(token.paddingContentHorizontalLG)}`,
	headerBg: "transparent",
	footerBg: "transparent",
	emptyTextPadding: token.padding,
	metaMarginBottom: token.padding,
	avatarMarginRight: token.padding,
	titleMarginBottom: token.paddingSM,
	descriptionFontSize: token.fontSize
});
var style_default$7 = genStyleHooks("List", (token) => {
	const listToken = merge$1(token, {
		listBorderedCls: `${token.componentCls}-bordered`,
		minHeight: token.controlHeightLG
	});
	return [
		genBaseStyle$4(listToken),
		genBorderedStyle(listToken),
		genResponsiveStyle(listToken)
	];
}, prepareComponentToken$7, { extraCssVarPrefixCls: ({ prefixCls }) => [`${prefixCls}-container`] });
//#endregion
//#region node_modules/antd/es/list/index.js
var InternalList = (props, ref) => {
	const { pagination = false, prefixCls: customizePrefixCls, bordered = false, split = true, className, rootClassName, style, children, itemLayout, loadMore, grid, dataSource = [], size: customizeSize, header, footer, loading = false, rowKey, renderItem, locale, ...rest } = props;
	const paginationObj = pagination && typeof pagination === "object" ? pagination : {};
	const [paginationCurrent, setPaginationCurrent] = import_react.useState(paginationObj.defaultCurrent || 1);
	const [paginationSize, setPaginationSize] = import_react.useState(paginationObj.defaultPageSize || 10);
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle } = useComponentConfig("list");
	const { renderEmpty } = import_react.useContext(ConfigContext);
	const defaultPaginationProps = {
		current: 1,
		total: 0,
		position: "bottom"
	};
	const triggerPaginationEvent = (eventName) => (page, pageSize) => {
		setPaginationCurrent(page);
		setPaginationSize(pageSize);
		if (pagination) pagination?.[eventName]?.(page, pageSize);
	};
	const onPaginationChange = triggerPaginationEvent("onChange");
	const onPaginationShowSizeChange = triggerPaginationEvent("onShowSizeChange");
	const renderInternalItem = (item, index) => {
		if (!renderItem) return null;
		let key;
		if (typeof rowKey === "function") key = rowKey(item);
		else if (rowKey) key = item[rowKey];
		else key = item.key;
		if (!key) key = `list-item-${index}`;
		return /* @__PURE__ */ import_react.createElement(import_react.Fragment, { key }, renderItem(item, index));
	};
	const isSomethingAfterLastItem = !!(loadMore || pagination || footer);
	const prefixCls = getPrefixCls("list", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$7(prefixCls);
	let loadingProp = loading;
	if (typeof loadingProp === "boolean") loadingProp = { spinning: loadingProp };
	const isLoading = !!loadingProp?.spinning;
	const mergedSize = useSize(customizeSize);
	let sizeCls = "";
	switch (mergedSize) {
		case "large":
			sizeCls = "lg";
			break;
		case "small":
			sizeCls = "sm";
			break;
		default: break;
	}
	const classString = clsx(prefixCls, {
		[`${prefixCls}-vertical`]: itemLayout === "vertical",
		[`${prefixCls}-${sizeCls}`]: sizeCls,
		[`${prefixCls}-split`]: split,
		[`${prefixCls}-bordered`]: bordered,
		[`${prefixCls}-loading`]: isLoading,
		[`${prefixCls}-grid`]: !!grid,
		[`${prefixCls}-something-after-last-item`]: isSomethingAfterLastItem,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, contextClassName, className, rootClassName, hashId, cssVarCls);
	const containerCls = `${prefixCls}-container`;
	const paginationProps = mergeProps(defaultPaginationProps, {
		total: dataSource.length,
		current: paginationCurrent,
		pageSize: paginationSize
	}, pagination || {});
	const largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
	paginationProps.current = Math.min(paginationProps.current, largestPage);
	const paginationContent = pagination && /* @__PURE__ */ import_react.createElement("div", { className: clsx(`${prefixCls}-pagination`) }, /* @__PURE__ */ import_react.createElement(pagination_default, {
		align: "end",
		...paginationProps,
		onChange: onPaginationChange,
		onShowSizeChange: onPaginationShowSizeChange
	}));
	let splitDataSource = _toConsumableArray(dataSource);
	if (pagination) {
		if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) splitDataSource = _toConsumableArray(dataSource).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
	}
	const screens = useBreakpoint(Object.keys(grid || {}).some((key) => responsiveArray.includes(key)));
	const currentBreakpoint = import_react.useMemo(() => {
		for (let i = 0; i < responsiveArray.length; i += 1) {
			const breakpoint = responsiveArray[i];
			if (screens[breakpoint]) return breakpoint;
		}
	}, [screens]);
	const colStyle = import_react.useMemo(() => {
		if (!grid) return;
		const columnCount = currentBreakpoint && grid[currentBreakpoint] ? grid[currentBreakpoint] : grid.column;
		if (columnCount) return {
			width: `${100 / columnCount}%`,
			maxWidth: `${100 / columnCount}%`
		};
	}, [JSON.stringify(grid), currentBreakpoint]);
	let childrenContent = isLoading && /* @__PURE__ */ import_react.createElement("div", { style: { minHeight: 53 } });
	if (splitDataSource.length > 0) {
		const items = splitDataSource.map(renderInternalItem);
		childrenContent = grid ? /* @__PURE__ */ import_react.createElement(Row, {
			className: clsx(containerCls, cssVarCls),
			gutter: grid.gutter
		}, import_react.Children.map(items, (child) => /* @__PURE__ */ import_react.createElement("div", {
			key: child?.key,
			style: colStyle
		}, child))) : /* @__PURE__ */ import_react.createElement("ul", { className: clsx(`${prefixCls}-items`, containerCls, cssVarCls) }, items);
	} else if (!children && !isLoading) childrenContent = /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-empty-text` }, locale?.emptyText || renderEmpty?.("List") || /* @__PURE__ */ import_react.createElement(DefaultRenderEmpty, { componentName: "List" }));
	const paginationPosition = paginationProps.position;
	const contextValue = import_react.useMemo(() => ({
		grid,
		itemLayout
	}), [JSON.stringify(grid), itemLayout]);
	return /* @__PURE__ */ import_react.createElement(ListContext.Provider, { value: contextValue }, /* @__PURE__ */ import_react.createElement("div", {
		ref,
		style: {
			...contextStyle,
			...style
		},
		className: classString,
		...rest
	}, (paginationPosition === "top" || paginationPosition === "both") && paginationContent, header && /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-header` }, header), /* @__PURE__ */ import_react.createElement(Spin, { ...loadingProp }, childrenContent, children), footer && /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-footer` }, footer), loadMore || (paginationPosition === "bottom" || paginationPosition === "both") && paginationContent));
};
var List = /* @__PURE__ */ import_react.forwardRef(InternalList);
List.Item = Item;
//#endregion
//#region node_modules/antd/es/message/index.js
var message = null;
var act = (callback) => callback();
var taskQueue = [];
var defaultGlobalConfig = {};
function getGlobalContext() {
	const { getContainer, duration, rtl, maxCount, top } = defaultGlobalConfig;
	const mergedContainer = getContainer?.() || document.body;
	return {
		getContainer: () => mergedContainer,
		duration,
		rtl,
		maxCount,
		top
	};
}
var GlobalHolder = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { messageConfig, sync } = props;
	const { getPrefixCls } = (0, import_react.useContext)(ConfigContext);
	const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls("message");
	const appConfig = (0, import_react.useContext)(AppConfigContext);
	const [api, holder] = useInternalMessage({
		...messageConfig,
		prefixCls,
		...appConfig.message
	});
	import_react.useImperativeHandle(ref, () => {
		const instance = { ...api };
		Object.keys(instance).forEach((method) => {
			instance[method] = (...args) => {
				sync();
				return api[method].apply(api, args);
			};
		});
		return {
			instance,
			sync
		};
	});
	return holder;
});
var GlobalHolderWrapper = /* @__PURE__ */ import_react.forwardRef((_, ref) => {
	const [messageConfig, setMessageConfig] = import_react.useState(getGlobalContext);
	const sync = () => {
		setMessageConfig(getGlobalContext);
	};
	import_react.useEffect(sync, []);
	const global = globalConfig();
	const rootPrefixCls = global.getRootPrefixCls();
	const rootIconPrefixCls = global.getIconPrefixCls();
	const theme = global.getTheme();
	const dom = /* @__PURE__ */ import_react.createElement(GlobalHolder, {
		ref,
		sync,
		messageConfig
	});
	return /* @__PURE__ */ import_react.createElement(ConfigProvider, {
		prefixCls: rootPrefixCls,
		iconPrefixCls: rootIconPrefixCls,
		theme
	}, global.holderRender ? global.holderRender(dom) : dom);
});
var flushMessageQueue = () => {
	if (!message) {
		const holderFragment = document.createDocumentFragment();
		const newMessage = { fragment: holderFragment };
		message = newMessage;
		act(() => {
			render(/* @__PURE__ */ import_react.createElement(GlobalHolderWrapper, { ref: (node) => {
				const { instance, sync } = node || {};
				Promise.resolve().then(() => {
					if (!newMessage.instance && instance) {
						newMessage.instance = instance;
						newMessage.sync = sync;
						flushMessageQueue();
					}
				});
			} }), holderFragment);
		});
		return;
	}
	if (!message.instance) return;
	taskQueue.forEach((task) => {
		const { type, skipped } = task;
		if (!skipped) switch (type) {
			case "open":
				act(() => {
					const closeFn = message.instance.open({
						...defaultGlobalConfig,
						...task.config
					});
					closeFn?.then(task.resolve);
					task.setCloseFn(closeFn);
				});
				break;
			case "destroy":
				act(() => {
					message?.instance.destroy(task.key);
				});
				break;
			default: act(() => {
				var _message$instance;
				const closeFn = (_message$instance = message.instance)[type].apply(_message$instance, _toConsumableArray(task.args));
				closeFn?.then(task.resolve);
				task.setCloseFn(closeFn);
			});
		}
	});
	taskQueue = [];
};
function setMessageGlobalConfig(config) {
	defaultGlobalConfig = {
		...defaultGlobalConfig,
		...config
	};
	act(() => {
		message?.sync?.();
	});
}
function open(config) {
	const result = wrapPromiseFn((resolve) => {
		let closeFn;
		const task = {
			type: "open",
			config,
			resolve,
			setCloseFn: (fn) => {
				closeFn = fn;
			}
		};
		taskQueue.push(task);
		return () => {
			if (closeFn) act(() => {
				closeFn();
			});
			else task.skipped = true;
		};
	});
	flushMessageQueue();
	return result;
}
function typeOpen(type, args) {
	globalConfig();
	const result = wrapPromiseFn((resolve) => {
		let closeFn;
		const task = {
			type,
			args,
			resolve,
			setCloseFn: (fn) => {
				closeFn = fn;
			}
		};
		taskQueue.push(task);
		return () => {
			if (closeFn) act(() => {
				closeFn();
			});
			else task.skipped = true;
		};
	});
	flushMessageQueue();
	return result;
}
var destroy = (key) => {
	taskQueue.push({
		type: "destroy",
		key
	});
	flushMessageQueue();
};
var methods = [
	"success",
	"info",
	"warning",
	"error",
	"loading"
];
var staticMethods = {
	open,
	destroy,
	config: setMessageGlobalConfig,
	useMessage,
	_InternalPanelDoNotUseOrYouWillBeFired: PurePanel$7
};
methods.forEach((type) => {
	staticMethods[type] = (...args) => typeOpen(type, args);
});
//#endregion
//#region node_modules/antd/es/modal/PurePanel.js
var PurePanel$2 = (props) => {
	const { prefixCls: customizePrefixCls, className, closeIcon, closable, type, title, children, footer, classNames, styles, ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const { className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("modal");
	const rootPrefixCls = getPrefixCls();
	const prefixCls = customizePrefixCls || getPrefixCls("modal");
	const rootCls = useCSSVarCls(rootPrefixCls);
	const [hashId, cssVarCls] = style_default$29(prefixCls, rootCls);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props });
	const confirmPrefixCls = `${prefixCls}-confirm`;
	let additionalProps = {};
	if (type) additionalProps = {
		closable: closable ?? false,
		title: "",
		footer: "",
		children: /* @__PURE__ */ import_react.createElement(ConfirmContent, {
			...props,
			prefixCls,
			confirmPrefixCls,
			rootPrefixCls,
			content: children
		})
	};
	else additionalProps = {
		closable: closable ?? true,
		title,
		footer: footer !== null && /* @__PURE__ */ import_react.createElement(Footer, { ...props }),
		children
	};
	return /* @__PURE__ */ import_react.createElement(Panel, {
		prefixCls,
		className: clsx(hashId, `${prefixCls}-pure-panel`, type && confirmPrefixCls, type && `${confirmPrefixCls}-${type}`, className, contextClassName, cssVarCls, rootCls, mergedClassNames.root),
		style: {
			...contextStyle,
			...mergedStyles.root
		},
		...restProps,
		closeIcon: renderCloseIcon(prefixCls, closeIcon),
		closable,
		classNames: mergedClassNames,
		styles: mergedStyles,
		...additionalProps
	});
};
var PurePanel_default = withPureRenderTheme(PurePanel$2);
//#endregion
//#region node_modules/antd/es/modal/index.js
function modalWarn(props) {
	return confirm(withWarn(props));
}
var Modal = Modal$1;
Modal.useModal = useModal;
Modal.info = function infoFn(props) {
	return confirm(withInfo(props));
};
Modal.success = function successFn(props) {
	return confirm(withSuccess(props));
};
Modal.error = function errorFn(props) {
	return confirm(withError(props));
};
Modal.warning = modalWarn;
Modal.warn = modalWarn;
Modal.confirm = function confirmFn(props) {
	return confirm(withConfirm(props));
};
Modal.destroyAll = function destroyAllFn() {
	while (destroyFns.length) {
		const close = destroyFns.pop();
		if (close) close();
	}
};
Modal.config = modalGlobalConfig;
Modal._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default;
//#endregion
//#region node_modules/antd/es/popconfirm/style/index.js
var genBaseStyle$3 = (token) => {
	const { componentCls, iconCls, antCls, zIndexPopup, colorText, colorWarning, marginXXS, marginXS, fontSize, fontWeightStrong, colorTextHeading } = token;
	return { [componentCls]: {
		zIndex: zIndexPopup,
		[`&${antCls}-popover`]: { fontSize },
		[`${componentCls}-message`]: {
			marginBottom: marginXS,
			display: "flex",
			flexWrap: "nowrap",
			alignItems: "start",
			[`> ${componentCls}-message-icon ${iconCls}`]: {
				color: colorWarning,
				fontSize,
				lineHeight: 1,
				marginInlineEnd: marginXS
			},
			[`${componentCls}-title`]: {
				fontWeight: fontWeightStrong,
				color: colorTextHeading,
				"&:only-child": { fontWeight: "normal" }
			},
			[`${componentCls}-description`]: {
				marginTop: marginXXS,
				color: colorText
			}
		},
		[`${componentCls}-buttons`]: {
			textAlign: "end",
			whiteSpace: "nowrap",
			button: { marginInlineStart: marginXS }
		}
	} };
};
var prepareComponentToken$6 = (token) => {
	const { zIndexPopupBase } = token;
	return { zIndexPopup: zIndexPopupBase + 60 };
};
var style_default$6 = genStyleHooks("Popconfirm", genBaseStyle$3, prepareComponentToken$6, { resetStyle: false });
//#endregion
//#region node_modules/antd/es/popconfirm/PurePanel.js
var Overlay = (props) => {
	const { prefixCls, okButtonProps, cancelButtonProps, title, description, cancelText, okText, okType = "primary", icon = /* @__PURE__ */ import_react.createElement(RefIcon$4, null), showCancel = true, close, onConfirm, onCancel, onPopupClick, classNames, styles } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const [contextLocale] = useLocale("Popconfirm", localeValues.Popconfirm);
	const titleNode = getRenderPropValue(title);
	const descriptionNode = getRenderPropValue(description);
	return /* @__PURE__ */ import_react.createElement("div", {
		className: `${prefixCls}-inner-content`,
		onClick: onPopupClick
	}, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-message` }, icon && /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-message-icon` }, icon), /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-message-text` }, titleNode && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-title`, classNames?.title),
		style: styles?.title
	}, titleNode), descriptionNode && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-description`, classNames?.content),
		style: styles?.content
	}, descriptionNode))), /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-buttons` }, showCancel && /* @__PURE__ */ import_react.createElement(Button, {
		onClick: onCancel,
		size: "small",
		...cancelButtonProps
	}, cancelText || contextLocale?.cancelText), /* @__PURE__ */ import_react.createElement(ActionButton, {
		buttonProps: {
			size: "small",
			...convertLegacyProps(okType),
			...okButtonProps
		},
		actionFn: onConfirm,
		close,
		prefixCls: getPrefixCls("btn"),
		quitOnNullishReturnValue: true,
		emitEvent: true
	}, okText || contextLocale?.okText)));
};
var PurePanel$1 = (props) => {
	const { prefixCls: customizePrefixCls, placement, className, style, ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("popconfirm", customizePrefixCls);
	style_default$6(prefixCls);
	return /* @__PURE__ */ import_react.createElement(PurePanel$4, {
		placement,
		className: clsx(prefixCls, className),
		style,
		content: /* @__PURE__ */ import_react.createElement(Overlay, {
			prefixCls,
			...restProps
		})
	});
};
//#endregion
//#region node_modules/antd/es/popconfirm/index.js
var Popconfirm = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, placement = "top", trigger, okType = "primary", icon = /* @__PURE__ */ import_react.createElement(RefIcon$4, null), children, overlayClassName, onOpenChange, overlayStyle, styles, arrow: popconfirmArrow, classNames, ...restProps } = props;
	const { getPrefixCls, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, arrow: contextArrow, trigger: contextTrigger } = useComponentConfig("popconfirm");
	const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);
	const mergedArrow = useMergedArrow(popconfirmArrow, contextArrow);
	const mergedTrigger = trigger || contextTrigger || "click";
	const settingOpen = (value) => {
		setOpen(value);
		onOpenChange?.(value);
	};
	const close = () => {
		settingOpen(false);
	};
	const onConfirm = (e) => props.onConfirm?.call(void 0, e);
	const onCancel = (e) => {
		settingOpen(false);
		props.onCancel?.call(void 0, e);
	};
	const onInternalOpenChange = (value) => {
		const { disabled = false } = props;
		if (disabled) return;
		settingOpen(value);
	};
	const prefixCls = getPrefixCls("popconfirm", customizePrefixCls);
	const mergedProps = {
		...props,
		placement,
		trigger: mergedTrigger,
		okType,
		overlayStyle,
		styles,
		classNames
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const rootClassNames = clsx(prefixCls, contextClassName, overlayClassName, mergedClassNames.root);
	style_default$6(prefixCls);
	return /* @__PURE__ */ import_react.createElement(Popover, {
		arrow: mergedArrow,
		...omit(restProps, ["title"]),
		trigger: mergedTrigger,
		placement,
		onOpenChange: onInternalOpenChange,
		open,
		ref,
		classNames: {
			root: rootClassNames,
			container: mergedClassNames.container,
			arrow: mergedClassNames.arrow
		},
		styles: {
			root: {
				...contextStyle,
				...mergedStyles.root,
				...overlayStyle
			},
			container: mergedStyles.container,
			arrow: mergedStyles.arrow
		},
		content: /* @__PURE__ */ import_react.createElement(Overlay, {
			okType,
			icon,
			...props,
			prefixCls,
			close,
			onConfirm,
			onCancel,
			classNames: mergedClassNames,
			styles: mergedStyles
		}),
		"data-popover-inject": true
	}, children);
});
/* istanbul ignore next */
Popconfirm._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$1;
//#endregion
//#region node_modules/antd/es/progress/utils.js
function validProgress(progress) {
	if (!progress || progress < 0) return 0;
	if (progress > 100) return 100;
	return progress;
}
function getSuccessPercent({ success }) {
	let percent;
	if (success && "percent" in success) percent = success.percent;
	return percent;
}
var getPercentage = ({ percent, success }) => {
	const realSuccessPercent = validProgress(getSuccessPercent({ success }));
	return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)];
};
var getStrokeColor = ({ success = {}, strokeColor }) => {
	const { strokeColor: successColor } = success;
	return [successColor || presetPrimaryColors.green, strokeColor || null];
};
var getSize = (size, type, extra) => {
	let width = -1;
	let height = -1;
	if (type === "step") {
		const steps = extra.steps;
		const strokeWidth = extra.strokeWidth;
		if (typeof size === "string" || typeof size === "undefined") {
			width = size === "small" ? 2 : 14;
			height = strokeWidth ?? 8;
		} else if (typeof size === "number") [width, height] = [size, size];
		else [width = 14, height = 8] = Array.isArray(size) ? size : [size.width, size.height];
		width *= steps;
	} else if (type === "line") {
		const strokeWidth = extra?.strokeWidth;
		if (typeof size === "string" || typeof size === "undefined") height = strokeWidth || (size === "small" ? 6 : 8);
		else if (typeof size === "number") [width, height] = [size, size];
		else [width = -1, height = 8] = Array.isArray(size) ? size : [size.width, size.height];
	} else if (type === "circle" || type === "dashboard") {
		if (typeof size === "string" || typeof size === "undefined") [width, height] = size === "small" ? [60, 60] : [120, 120];
		else if (typeof size === "number") [width, height] = [size, size];
		else if (Array.isArray(size)) {
			width = size[0] ?? size[1] ?? 120;
			height = size[0] ?? size[1] ?? 120;
		}
	}
	return [width, height];
};
//#endregion
//#region node_modules/antd/es/progress/Circle.js
var CIRCLE_MIN_STROKE_WIDTH = 3;
var getMinPercent = (width) => CIRCLE_MIN_STROKE_WIDTH / width * 100;
var OMIT_SEMANTIC_NAMES = [
	"root",
	"body",
	"indicator"
];
var Circle = (props) => {
	const { prefixCls, classNames, styles, railColor, trailColor, strokeLinecap = "round", gapPosition, gapPlacement, gapDegree, width: originWidth = 120, type, children, success, size = originWidth, steps } = props;
	const { direction } = useComponentConfig("progress");
	const mergedRailColor = railColor ?? trailColor;
	const [width, height] = getSize(size, "circle");
	let { strokeWidth } = props;
	if (strokeWidth === void 0) strokeWidth = Math.max(getMinPercent(width), 6);
	const circleStyle = {
		width,
		height,
		fontSize: width * .15 + 6
	};
	const realGapDegree = import_react.useMemo(() => {
		if (gapDegree || gapDegree === 0) return gapDegree;
		if (type === "dashboard") return 75;
	}, [gapDegree, type]);
	const percentArray = getPercentage(props);
	const gapPos = import_react.useMemo(() => {
		const mergedPlacement = (gapPlacement ?? gapPosition) || type === "dashboard" && "bottom" || void 0;
		const isRTL = direction === "rtl";
		switch (mergedPlacement) {
			case "start": return isRTL ? "right" : "left";
			case "end": return isRTL ? "left" : "right";
			default: return mergedPlacement;
		}
	}, [
		direction,
		gapPlacement,
		gapPosition,
		type
	]);
	const isGradient = Object.prototype.toString.call(props.strokeColor) === "[object Object]";
	const strokeColor = getStrokeColor({
		success,
		strokeColor: props.strokeColor
	});
	const wrapperClassName = clsx(`${prefixCls}-body`, { [`${prefixCls}-circle-gradient`]: isGradient }, classNames.body);
	const circleContent = /* @__PURE__ */ import_react.createElement(Circle$1, {
		steps,
		percent: steps ? percentArray[1] : percentArray,
		strokeWidth,
		railWidth: strokeWidth,
		strokeColor: steps ? strokeColor[1] : strokeColor,
		strokeLinecap,
		railColor: mergedRailColor,
		prefixCls,
		gapDegree: realGapDegree,
		gapPosition: gapPos,
		classNames: omit(classNames, OMIT_SEMANTIC_NAMES),
		styles: omit(styles, OMIT_SEMANTIC_NAMES)
	});
	const smallCircle = width <= 20;
	const node = /* @__PURE__ */ import_react.createElement("div", {
		className: wrapperClassName,
		style: {
			...circleStyle,
			...styles.body
		}
	}, circleContent, !smallCircle && children);
	if (smallCircle) return /* @__PURE__ */ import_react.createElement(Tooltip, { title: children }, node);
	return node;
};
//#endregion
//#region node_modules/antd/es/progress/style/index.js
var LineStrokeColorVar = "--progress-line-stroke-color";
var genAntProgressActive = (isRtl) => {
	const direction = isRtl ? "100%" : "-100%";
	return new Keyframe(`antProgress${isRtl ? "RTL" : "LTR"}Active`, {
		"0%": {
			transform: `translateX(${direction}) scaleX(0)`,
			opacity: .1
		},
		"20%": {
			transform: `translateX(${direction}) scaleX(0)`,
			opacity: .5
		},
		to: {
			transform: "translateX(0) scaleX(1)",
			opacity: 0
		}
	});
};
var genBaseStyle$2 = (token) => {
	const { componentCls: progressCls, iconCls: iconPrefixCls } = token;
	return { [progressCls]: {
		...resetComponent(token),
		display: "inline-flex",
		"&-rtl": { direction: "rtl" },
		[`${progressCls}-indicator`]: {
			color: token.colorText,
			lineHeight: 1,
			whiteSpace: "nowrap",
			verticalAlign: "middle",
			wordBreak: "normal",
			[iconPrefixCls]: { fontSize: token.fontSize }
		},
		[`&${progressCls}-status-exception`]: { [`${progressCls}-indicator`]: { color: token.colorError } },
		[`&${progressCls}-status-success`]: { [`${progressCls}-indicator`]: { color: token.colorSuccess } }
	} };
};
var genLineStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-line`]: {
		position: "relative",
		width: "100%",
		fontSize: token.fontSize,
		[`${componentCls}-body`]: {
			display: "inline-flex",
			alignItems: "center",
			width: "100%",
			gap: token.marginXS
		},
		[`${componentCls}-rail`]: {
			flex: "auto",
			background: token.remainingColor,
			borderRadius: token.lineBorderRadius,
			position: "relative",
			width: "100%",
			overflow: "hidden"
		},
		[`&${componentCls}-status-active`]: { [`${componentCls}-track:after`]: {
			content: "\"\"",
			position: "absolute",
			inset: 0,
			backgroundColor: token.colorBgContainer,
			borderRadius: "inherit",
			opacity: 0,
			animationName: genAntProgressActive(),
			animationDuration: token.progressActiveMotionDuration,
			animationTimingFunction: token.motionEaseOutQuint,
			animationIterationCount: "infinite"
		} },
		[`${componentCls}-track`]: {
			position: "absolute",
			insetInlineStart: 0,
			insetBlock: 0,
			borderRadius: "inherit",
			background: token.defaultColor,
			transition: `all ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,
			minWidth: "max-content",
			display: "flex",
			alignItems: "center",
			"&-success": { background: token.colorSuccess }
		},
		[`&${componentCls}-status-exception`]: { [`${componentCls}-track`]: { background: token.colorError } },
		[`&${componentCls}-status-success`]: { [`${componentCls}-track`]: { background: token.colorSuccess } },
		[`${componentCls}-indicator-outer`]: { [`&${componentCls}-indicator-start`]: { order: -1 } },
		[`${componentCls}-body-layout-bottom`]: {
			flexDirection: "column",
			alignItems: "center",
			gap: token.marginXXS
		},
		[`${componentCls}-indicator${componentCls}-indicator-inner`]: {
			color: token.colorWhite,
			paddingInline: token.paddingXXS,
			width: "100%",
			display: "flex",
			justifyContent: "center",
			[`&${componentCls}-indicator-end`]: { justifyContent: "end" },
			[`&${componentCls}-indicator-start`]: { justifyContent: "start" },
			[`&${componentCls}-indicator-bright`]: { color: "rgba(0, 0, 0, 0.45)" }
		}
	} };
};
var genCircleStyle = (token) => {
	const { componentCls: progressCls, iconCls: iconPrefixCls } = token;
	return {
		[`${progressCls}-circle`]: {
			[`${progressCls}-circle-rail`]: { stroke: token.remainingColor },
			[`${progressCls}-body:not(${progressCls}-circle-gradient)`]: { [`${progressCls}-circle-path`]: { stroke: token.defaultColor } },
			[`${progressCls}-body`]: {
				position: "relative",
				lineHeight: 1,
				backgroundColor: "transparent"
			},
			[`${progressCls}-indicator`]: {
				position: "absolute",
				insetBlockStart: "50%",
				insetInlineStart: 0,
				width: "100%",
				margin: 0,
				padding: 0,
				color: token.circleTextColor,
				fontSize: token.circleTextFontSize,
				lineHeight: 1,
				whiteSpace: "normal",
				textAlign: "center",
				transform: "translateY(-50%)",
				[iconPrefixCls]: { fontSize: token.circleIconFontSize }
			},
			[`&${progressCls}-status-exception`]: { [`${progressCls}-body:not(${progressCls}-circle-gradient)`]: { [`${progressCls}-circle-path`]: { stroke: token.colorError } } },
			[`&${progressCls}-status-success`]: { [`${progressCls}-body:not(${progressCls}-circle-gradient)`]: { [`${progressCls}-circle-path`]: { stroke: token.colorSuccess } } }
		},
		[`${progressCls}-inline-circle`]: {
			lineHeight: 1,
			[`${progressCls}-inner`]: { verticalAlign: "bottom" }
		}
	};
};
var genStepStyle = (token) => {
	const { componentCls: progressCls } = token;
	return { [progressCls]: { [`${progressCls}-steps`]: {
		display: "inline-block",
		"&-body": {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			gap: token.progressStepMarginInlineEnd,
			[`${progressCls}-indicator`]: { marginInlineStart: token.marginXS }
		},
		"&-item": {
			flexShrink: 0,
			minWidth: token.progressStepMinWidth,
			backgroundColor: token.remainingColor,
			transition: `all ${token.motionDurationSlow}`,
			"&-active": { backgroundColor: token.defaultColor }
		}
	} } };
};
var genSmallLine = (token) => {
	const { componentCls: progressCls, iconCls: iconPrefixCls } = token;
	return { [progressCls]: { [`${progressCls}-small&-line, ${progressCls}-small&-line ${progressCls}-indicator ${iconPrefixCls}`]: { fontSize: token.fontSizeSM } } };
};
var prepareComponentToken$5 = (token) => ({
	circleTextColor: token.colorText,
	defaultColor: token.colorInfo,
	remainingColor: token.colorFillSecondary,
	lineBorderRadius: 100,
	circleTextFontSize: "1em",
	circleIconFontSize: `${token.fontSize / token.fontSizeSM}em`
});
var style_default$5 = genStyleHooks("Progress", (token) => {
	const progressStepMarginInlineEnd = token.calc(token.marginXXS).div(2).equal();
	const progressToken = merge$1(token, {
		progressStepMarginInlineEnd,
		progressStepMinWidth: progressStepMarginInlineEnd,
		progressActiveMotionDuration: "2.4s"
	});
	return [
		genBaseStyle$2(progressToken),
		genLineStyle(progressToken),
		genCircleStyle(progressToken),
		genStepStyle(progressToken),
		genSmallLine(progressToken)
	];
}, prepareComponentToken$5);
//#endregion
//#region node_modules/antd/es/progress/Line.js
/**
* @example
*   {
*     "0%": "#afc163",
*     "75%": "#009900",
*     "50%": "green", // ====> '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
*     "25%": "#66FF00",
*     "100%": "#ffffff"
*   }
*/
var sortGradient = (gradients) => {
	let tempArr = [];
	Object.keys(gradients).forEach((key) => {
		const formattedKey = Number.parseFloat(key.replace(/%/g, ""));
		if (!Number.isNaN(formattedKey)) tempArr.push({
			key: formattedKey,
			value: gradients[key]
		});
	});
	tempArr = tempArr.sort((a, b) => a.key - b.key);
	return tempArr.map(({ key, value }) => `${value} ${key}%`).join(", ");
};
/**
* Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
* butter, there is the bug. And... Besides women, there is the code.
*
* @example
*   {
*     "0%": "#afc163",
*     "25%": "#66FF00",
*     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
*     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
*     "100%": "#ffffff"
*   }
*/
var handleGradient = (strokeColor, directionConfig) => {
	const { from = presetPrimaryColors.blue, to = presetPrimaryColors.blue, direction = directionConfig === "rtl" ? "to left" : "to right", ...rest } = strokeColor;
	if (Object.keys(rest).length !== 0) {
		const background = `linear-gradient(${direction}, ${sortGradient(rest)})`;
		return {
			background,
			[LineStrokeColorVar]: background
		};
	}
	const background = `linear-gradient(${direction}, ${from}, ${to})`;
	return {
		background,
		[LineStrokeColorVar]: background
	};
};
var Line = (props) => {
	const { prefixCls, classNames, styles, direction: directionConfig, percent, size, strokeWidth, strokeColor, strokeLinecap = "round", children, railColor, trailColor, percentPosition, success } = props;
	const { align: infoAlign, type: infoPosition } = percentPosition;
	const mergedRailColor = railColor ?? trailColor;
	const borderRadius = strokeLinecap === "square" || strokeLinecap === "butt" ? 0 : void 0;
	const [width, height] = getSize(size ?? [-1, strokeWidth || (size === "small" ? 6 : 8)], "line", { strokeWidth });
	const railStyle = {
		backgroundColor: mergedRailColor || void 0,
		borderRadius,
		height
	};
	const trackCls = `${prefixCls}-track`;
	const backgroundProps = strokeColor && typeof strokeColor !== "string" ? handleGradient(strokeColor, directionConfig) : {
		[LineStrokeColorVar]: strokeColor,
		background: strokeColor
	};
	const percentTrackStyle = {
		width: `${validProgress(percent)}%`,
		height,
		borderRadius,
		...backgroundProps
	};
	const successPercent = getSuccessPercent(props);
	const successTrackStyle = {
		width: `${validProgress(successPercent)}%`,
		height,
		borderRadius,
		backgroundColor: success?.strokeColor
	};
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-body`, classNames.body, { [`${prefixCls}-body-layout-bottom`]: infoAlign === "center" && infoPosition === "outer" }),
		style: {
			width: width > 0 ? width : "100%",
			...styles.body
		}
	}, /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-rail`, classNames.rail),
		style: {
			...railStyle,
			...styles.rail
		}
	}, /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(trackCls, classNames.track),
		style: {
			...percentTrackStyle,
			...styles.track
		}
	}, infoPosition === "inner" && children), successPercent !== void 0 && /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(trackCls, `${trackCls}-success`, classNames.track),
		style: {
			...successTrackStyle,
			...styles.track
		}
	})), infoPosition === "outer" && children);
};
//#endregion
//#region node_modules/antd/es/progress/Steps.js
var Steps$1 = (props) => {
	const { classNames, styles, size, steps, rounding: customRounding = Math.round, percent = 0, strokeWidth = 8, strokeColor, railColor, trailColor, prefixCls, children } = props;
	const current = customRounding(steps * (percent / 100));
	const [width, height] = getSize(size ?? [size === "small" ? 2 : 14, strokeWidth], "step", {
		steps,
		strokeWidth
	});
	const unitWidth = width / steps;
	const styledSteps = Array.from({ length: steps });
	const mergedRailColor = railColor ?? trailColor;
	for (let i = 0; i < steps; i++) {
		const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
		styledSteps[i] = /* @__PURE__ */ import_react.createElement("div", {
			key: i,
			className: clsx(`${prefixCls}-steps-item`, { [`${prefixCls}-steps-item-active`]: i <= current - 1 }, classNames.track),
			style: {
				backgroundColor: i <= current - 1 ? color : mergedRailColor,
				width: unitWidth,
				height,
				...styles.track
			}
		});
	}
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-steps-body`, classNames.body),
		style: styles.body
	}, styledSteps, children);
};
//#endregion
//#region node_modules/antd/es/progress/progress.js
var ProgressStatuses = [
	"normal",
	"exception",
	"active",
	"success"
];
//#endregion
//#region node_modules/antd/es/progress/index.js
var progress_default = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, classNames, styles, steps, strokeColor, percent = 0, size = "medium", showInfo = true, type = "line", status, format, style, percentPosition = {}, ...restProps } = props;
	const { align: infoAlign = "end", type: infoPosition = "outer" } = percentPosition;
	const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
	const strokeColorNotGradient = typeof strokeColor === "string" || Array.isArray(strokeColor) ? strokeColor : void 0;
	const strokeColorIsBright = import_react.useMemo(() => {
		if (strokeColorNotArray) return new FastColor(typeof strokeColorNotArray === "string" ? strokeColorNotArray : Object.values(strokeColorNotArray)[0]).isLight();
		return false;
	}, [strokeColor]);
	const percentNumber = import_react.useMemo(() => {
		const successPercent = getSuccessPercent(props);
		return Number.parseInt(successPercent !== void 0 ? (successPercent ?? 0)?.toString() : (percent ?? 0)?.toString(), 10);
	}, [percent, props.success]);
	const progressStatus = import_react.useMemo(() => {
		if (!ProgressStatuses.includes(status) && percentNumber >= 100) return "success";
		return status || "normal";
	}, [status, percentNumber]);
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("progress");
	const prefixCls = getPrefixCls("progress", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$5(prefixCls);
	const mergedProps = {
		...props,
		percent,
		type,
		size,
		showInfo,
		percentPosition
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const isLineType = type === "line";
	const isPureLineType = isLineType && !steps;
	const progressInfo = import_react.useMemo(() => {
		if (!showInfo) return null;
		const successPercent = getSuccessPercent(props);
		let text;
		const textFormatter = format || ((number) => `${number}%`);
		const isBrightInnerColor = isLineType && strokeColorIsBright && infoPosition === "inner";
		if (infoPosition === "inner" || format || progressStatus !== "exception" && progressStatus !== "success") text = textFormatter(validProgress(percent), validProgress(successPercent));
		else if (progressStatus === "exception") text = isLineType ? /* @__PURE__ */ import_react.createElement(RefIcon$3, null) : /* @__PURE__ */ import_react.createElement(RefIcon, null);
		else if (progressStatus === "success") text = isLineType ? /* @__PURE__ */ import_react.createElement(RefIcon$2, null) : /* @__PURE__ */ import_react.createElement(RefIcon$8, null);
		return /* @__PURE__ */ import_react.createElement("span", {
			className: clsx(`${prefixCls}-indicator`, {
				[`${prefixCls}-indicator-bright`]: isBrightInnerColor,
				[`${prefixCls}-indicator-${infoAlign}`]: isPureLineType,
				[`${prefixCls}-indicator-${infoPosition}`]: isPureLineType
			}, mergedClassNames.indicator),
			style: mergedStyles.indicator,
			title: typeof text === "string" ? text : void 0
		}, text);
	}, [
		showInfo,
		percent,
		percentNumber,
		progressStatus,
		type,
		prefixCls,
		format,
		isLineType,
		strokeColorIsBright,
		infoPosition,
		infoAlign,
		isPureLineType,
		mergedClassNames.indicator,
		mergedStyles.indicator
	]);
	const sharedProps = {
		...props,
		classNames: mergedClassNames,
		styles: mergedStyles
	};
	let progress;
	if (type === "line") progress = steps ? /* @__PURE__ */ import_react.createElement(Steps$1, {
		...sharedProps,
		strokeColor: strokeColorNotGradient,
		prefixCls,
		steps: typeof steps === "object" ? steps.count : steps
	}, progressInfo) : /* @__PURE__ */ import_react.createElement(Line, {
		...sharedProps,
		strokeColor: strokeColorNotArray,
		prefixCls,
		direction,
		percentPosition: {
			align: infoAlign,
			type: infoPosition
		}
	}, progressInfo);
	else if (type === "circle" || type === "dashboard") progress = /* @__PURE__ */ import_react.createElement(Circle, {
		...sharedProps,
		strokeColor: strokeColorNotArray,
		prefixCls,
		progressStatus
	}, progressInfo);
	const classString = clsx(prefixCls, `${prefixCls}-status-${progressStatus}`, {
		[`${prefixCls}-${type === "dashboard" && "circle" || type}`]: type !== "line",
		[`${prefixCls}-inline-circle`]: type === "circle" && getSize(size, "circle")[0] <= 20,
		[`${prefixCls}-line`]: isPureLineType,
		[`${prefixCls}-line-align-${infoAlign}`]: isPureLineType,
		[`${prefixCls}-line-position-${infoPosition}`]: isPureLineType,
		[`${prefixCls}-steps`]: steps,
		[`${prefixCls}-show-info`]: showInfo,
		[`${prefixCls}-small`]: size === "small",
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, contextClassName, className, rootClassName, mergedClassNames.root, hashId, cssVarCls);
	return /* @__PURE__ */ import_react.createElement("div", {
		ref,
		style: {
			...contextStyle,
			...mergedStyles.root,
			...style
		},
		className: classString,
		role: "progressbar",
		"aria-valuenow": percentNumber,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		...omit(restProps, [
			"railColor",
			"trailColor",
			"strokeWidth",
			"width",
			"gapDegree",
			"gapPosition",
			"gapPlacement",
			"strokeLinecap",
			"success"
		])
	}, progress);
});
//#endregion
//#region node_modules/antd/es/steps/context.js
/**
* When use this context. Will trade as sub component instead of root Steps component.
*/
var InternalContext = /* @__PURE__ */ import_react.createContext(null);
//#endregion
//#region node_modules/antd/es/steps/PanelArrow.js
var PanelArrow = (props) => {
	const { prefixCls } = props;
	return /* @__PURE__ */ import_react.createElement("svg", {
		className: `${prefixCls}-panel-arrow`,
		viewBox: "0 0 100 100",
		xmlns: "http://www.w3.org/2000/svg",
		preserveAspectRatio: "none"
	}, /* @__PURE__ */ import_react.createElement("title", null, "Arrow"), /* @__PURE__ */ import_react.createElement("path", { d: "M 0 0 L 100 50 L 0 100" }));
};
//#endregion
//#region node_modules/antd/es/steps/ProgressIcon.js
var ProgressIcon = (props) => {
	const { prefixCls, rootPrefixCls, children, percent } = props;
	const progressCls = `${prefixCls}-item-progress-icon`;
	const circleCls = `${progressCls}-circle`;
	const [, varRef] = genCssVar(rootPrefixCls, "cmp-steps");
	const dashArray = `calc(${varRef("progress-radius")} * 2 * ${Math.PI * percent / 100}) 9999`;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("svg", {
		className: `${progressCls}-svg`,
		viewBox: "0 0 100 100",
		width: "100%",
		height: "100%",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-valuemax": 100,
		"aria-valuemin": 0,
		"aria-valuenow": percent
	}, /* @__PURE__ */ import_react.createElement("title", null, "Progress"), /* @__PURE__ */ import_react.createElement("circle", { className: clsx(circleCls, `${circleCls}-rail`) }), /* @__PURE__ */ import_react.createElement("circle", {
		className: clsx(circleCls, `${circleCls}-ptg`),
		strokeDasharray: dashArray,
		transform: "rotate(-90 50 50)"
	})), children);
};
//#endregion
//#region node_modules/antd/es/steps/style/horizontal.js
var genHorizontalStyle$1 = (token) => {
	const { componentCls, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}-horizontal`]: { [`> ${itemCls}`]: {
		flex: "1 1 auto",
		minWidth: token.iconSize,
		[`${itemCls}-rail`]: {
			[varName("horizontal-rail-margin")]: `calc(${varRef("icon-size-max")} / 2 + ${varRef("item-wrapper-padding-top")})`,
			position: "static",
			marginTop: varRef("horizontal-rail-margin"),
			width: "auto",
			borderBlockStartWidth: varRef("rail-size"),
			flex: 1,
			minWidth: 0,
			alignSelf: "flex-start",
			transform: "translateY(-50%)"
		}
	} } };
};
//#endregion
//#region node_modules/antd/es/steps/style/icon.js
var genIconStyle = (token) => {
	const { componentCls, customIconFontSize, motionDurationSlow, iconSize, lineWidth, lineType, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [componentCls]: {
		[varName("icon-size")]: iconSize,
		[varName("icon-border-width")]: lineWidth,
		[`${itemCls}-icon`]: {
			width: varRef("icon-size"),
			height: varRef("icon-size"),
			margin: 0,
			flex: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: token.iconFontSize,
			fontFamily: token.fontFamily,
			lineHeight: varRef("icon-size"),
			textAlign: "center",
			borderRadius: varRef("icon-size"),
			border: `${varRef("icon-border-width")} ${lineType} transparent`,
			transition: [
				"background-color",
				"border",
				"color",
				"inset",
				"transform"
			].map((key) => `${key} ${motionDurationSlow}`).join(", "),
			zIndex: 1
		},
		[`${itemCls}-custom ${itemCls}-icon`]: {
			background: "none",
			border: 0,
			fontSize: customIconFontSize
		}
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/inline.js
var genInlineStyle = (token) => {
	const { componentCls, inlineDotSize, paddingXS, lineWidth, antCls, calc } = token;
	const containerPaddingTop = calc(paddingXS).add(lineWidth).equal();
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}-inline`]: {
		[varName("items-offset")]: "0",
		[varName("item-wrapper-padding-top")]: containerPaddingTop,
		display: "inline-flex",
		"&:before": {
			content: "\"\"",
			flex: varRef("items-offset")
		},
		[itemCls]: {
			[varName("title-vertical-row-gap")]: paddingXS,
			[varName("icon-size")]: inlineDotSize,
			[varName("icon-size-active")]: inlineDotSize,
			[varName("title-font-size")]: token.fontSizeSM,
			[varName("title-line-height")]: token.lineHeightSM,
			[varName("item-title-color")]: token.colorTextSecondary,
			[varName("subtitle-font-size")]: token.fontSizeSM,
			[varName("subtitle-line-height")]: token.lineHeightSM,
			[varName("item-subtitle-color")]: token.colorTextQuaternary,
			[varName("rail-size")]: token.lineWidth,
			[varName("title-horizontal-rail-gap")]: "0px",
			flex: 1,
			"&-wrapper": {
				paddingInline: token.paddingXXS,
				marginInline: token.calc(token.marginXXS).div(2).equal(),
				borderRadius: token.borderRadiusSM,
				cursor: "pointer",
				transition: `background-color ${token.motionDurationMid}`,
				"&:hover": { background: token.controlItemBgHover }
			},
			"&-icon": { [`${itemCls}-icon-dot`]: { "&:after": { display: "none" } } },
			"&-title": {
				fontWeight: "normal",
				whiteSpace: "nowrap"
			},
			"&-content": { display: "none" }
		}
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/util.js
function withoutVar(cssVar) {
	return (cssVar || "--ant-not-exist").replace(/var\((.*)\)/, "$1");
}
/**
* Force override the width related styles.
* This should be multiple since will conflict with other `rail` styles.
*/
var getItemWithWidthStyle = (token, marginSize, optionalStyle) => {
	const { calc, componentCls, descriptionMaxWidth, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`@container style(${withoutVar(descriptionMaxWidth)})`]: [{
		[`${itemCls}-icon`]: { marginInlineStart: calc(descriptionMaxWidth).sub(varRef("icon-size")).div(2).equal() },
		[`${itemCls}-rail`]: {
			width: "auto",
			insetInlineStart: calc(descriptionMaxWidth).add(varRef("icon-size")).div(2).add(marginSize).equal(),
			insetInlineEnd: calc(descriptionMaxWidth).sub(varRef("icon-size")).div(2).sub(marginSize).mul(-1).equal()
		}
	}, optionalStyle] };
};
//#endregion
//#region node_modules/antd/es/steps/style/label-placement.js
var genLabelPlacementStyle = (token) => {
	const { componentCls, descriptionMaxWidth, marginXS, fontHeightLG, margin, paddingSM, marginXXS, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return {
		[componentCls]: {
			[varName("icon-size-max")]: `max(${varRef("icon-size")}, ${varRef("icon-size-active", varRef("icon-size"))})`,
			[`${itemCls}-icon`]: { marginBlockStart: `calc((${varRef("heading-height")} - ${varRef("icon-size")}) / 2)` }
		},
		[`${componentCls}-title-horizontal`]: {
			[varName("title-horizontal-item-margin")]: margin,
			[varName("title-horizontal-rail-margin")]: margin,
			[varName("title-horizontal-title-height")]: fontHeightLG,
			[varName("heading-height")]: `max(${varRef("icon-size")}, ${varRef("title-horizontal-title-height")})`,
			[`&${componentCls}-horizontal, &${componentCls}-horizontal-alternate`]: {
				[`${itemCls}:not(:first-child)`]: { marginInlineStart: varRef("title-horizontal-item-margin") },
				[`${itemCls}:last-child`]: { flex: "0 1 auto" },
				[`${itemCls}-wrapper`]: { columnGap: token.marginXS }
			},
			[`&${componentCls}-vertical`]: {
				[`${itemCls}-wrapper`]: { columnGap: token.margin },
				[`${itemCls}-empty-header`]: {
					[`${itemCls}-header`]: { minHeight: "auto" },
					[`${itemCls}-content`]: { marginTop: calc(varRef("heading-height")).sub(token.fontHeight).div(2).equal() }
				}
			},
			[`${itemCls}-section`]: {
				flex: 1,
				minWidth: 0
			},
			[`${itemCls}-header`]: { minHeight: varRef("heading-height") },
			[`${itemCls}-title`]: { flex: "0 1 auto" },
			[`${itemCls}-content`]: { maxWidth: descriptionMaxWidth },
			[`${itemCls}-subtitle`]: { flex: "0 9999 auto" },
			[`&${componentCls}-horizontal ${itemCls}-rail`]: {
				[varName("item-wrapper-padding-top")]: "0px",
				flex: "1 1 0%",
				marginInlineStart: varRef("title-horizontal-rail-margin")
			}
		},
		[`${componentCls}-title-vertical`]: {
			[varName("title-vertical-row-gap")]: paddingSM,
			[varName("title-horizontal-rail-gap")]: marginXXS,
			[varName("heading-height")]: varRef("icon-size-max"),
			[`> ${itemCls}`]: {
				flex: "1 1 0%",
				[`${itemCls}-wrapper`]: {
					flexDirection: "column",
					rowGap: varRef("title-vertical-row-gap"),
					alignItems: "center"
				},
				[`${itemCls}-section`]: { alignSelf: "stretch" },
				[`${itemCls}-header`]: {
					flexDirection: "column",
					alignItems: "center"
				},
				[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
					textAlign: "center",
					maxWidth: "100%"
				},
				[`${itemCls}-subtitle`]: { margin: 0 },
				[`${itemCls}-rail`]: {
					position: "absolute",
					top: 0,
					width: `calc(100% - ${varRef("icon-size")} - ${varRef("title-horizontal-rail-gap")} * 2)`,
					insetInlineStart: `calc(50% + ${varRef("icon-size")} / 2 + ${varRef("title-horizontal-rail-gap")})`
				}
			},
			...getItemWithWidthStyle(token, marginXS, {
				[`${itemCls}:last-child`]: { flex: "none" },
				[`${itemCls}-icon`]: { alignSelf: "flex-start" },
				[`${itemCls}-section`]: { width: descriptionMaxWidth }
			})
		}
	};
};
//#endregion
//#region node_modules/antd/es/steps/style/nav.js
var genLegacyNavStyle = (token) => {
	const { componentCls, fontSizeIcon, navContentMaxWidth, navArrowColor, colorPrimary, motionDurationSlow, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const stepsNavActiveColor = colorPrimary;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-navigation`]: {
		[itemCls.repeat(4)]: {
			display: "flex",
			justifyContent: "center",
			position: "relative",
			flex: 1,
			marginInlineStart: 0,
			[`${itemCls}-wrapper`]: { paddingBlock: token.paddingSM },
			[`${itemCls}-section`]: { maxWidth: navContentMaxWidth },
			[`${itemCls}-rail`]: { display: "none" },
			"&:before": {
				position: "absolute",
				display: "block",
				backgroundColor: stepsNavActiveColor,
				transition: `all ${motionDurationSlow}`,
				transitionTimingFunction: "ease-out",
				content: "\"\""
			},
			"&:not(:last-child):after": {
				position: "absolute",
				display: "block",
				borderTop: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
				borderBottom: "none",
				borderInlineStart: "none",
				borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
				content: "\"\""
			},
			[`&${itemCls}-active`]: {
				[varName("item-content-active-color")]: varRef("item-content-color"),
				[varName("item-icon-active-bg-color")]: varRef("item-icon-bg-color"),
				[varName("item-icon-active-border-color")]: varRef("item-icon-border-color"),
				[varName("item-icon-active-text-color")]: varRef("item-icon-text-color")
			}
		},
		[`&${componentCls}-horizontal`]: { [itemCls]: {
			"&:before": {
				bottom: 0,
				insetInlineStart: "50%",
				width: 0,
				height: token.lineWidthBold
			},
			[`&${itemCls}-active:before`]: {
				insetInlineStart: 0,
				width: "100%"
			},
			"&:not(:last-child):after": {
				top: `50%`,
				insetInlineStart: calc(fontSizeIcon).div(2).mul(-1).add("100%").equal(),
				width: fontSizeIcon,
				height: fontSizeIcon,
				transform: "translateY(-50%) rotate(45deg)"
			}
		} },
		[`&${componentCls}-vertical`]: { [itemCls.repeat(4)]: {
			[`${itemCls}-content`]: { padding: 0 },
			"&:before": {
				insetInlineEnd: 0,
				top: "50%",
				width: token.lineWidthBold,
				height: 0
			},
			[`&${itemCls}-active::before`]: {
				top: 0,
				height: "100%"
			},
			"&:not(:last-child):after": {
				left: {
					_skip_check_: true,
					value: "50%"
				},
				top: "100%",
				width: calc(fontSizeIcon).div(3).mul(2).equal(),
				height: calc(fontSizeIcon).div(3).mul(2).equal(),
				transform: "translateY(-50%) translateX(-50%) rotate(135deg)"
			}
		} }
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/panel.js
var genPanelStyle = (token) => {
	const { componentCls, lineWidthBold, borderRadius, borderRadiusSM, motionDurationMid, paddingXS, lineType, paddingSM, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	const borderStyle = `${unit(lineWidthBold)} ${lineType} ${varRef("panel-border-color")}`;
	return { [`${componentCls}${componentCls}-panel`]: [
		{
			[`${itemCls}-rail`]: { display: "none" },
			[`&${componentCls}-horizontal`]: {
				alignItems: "stretch",
				[itemCls]: {
					flex: 1,
					margin: 0
				}
			}
		},
		{
			"&": {
				[varName("panel-padding")]: paddingSM,
				[varName("item-border-radius")]: borderRadius,
				[itemCls]: {
					[varName("panel-bg-color")]: varRef("item-icon-bg-color"),
					[varName("panel-border-color")]: varRef("item-icon-border-color"),
					[varName("panel-active-bg-color")]: varRef("item-icon-active-bg-color"),
					[varName("panel-active-border-color")]: varRef("item-icon-active-border-color"),
					[varName("panel-title-height")]: `calc(${varRef("title-font-size")} * ${varRef("title-line-height")})`,
					[varName("item-base-height")]: calc(varRef("panel-padding")).mul(2).add(varRef("icon-size")).add(varRef("panel-title-height")).equal(),
					[varName("item-base-width")]: `calc(${varRef("item-base-height")} * 0.7071)`,
					transition: `background-color ${motionDurationMid}`
				}
			},
			[`${itemCls}-icon`]: { display: "none" },
			[`${itemCls}-header`]: { minHeight: "auto" },
			[`${componentCls}-panel-arrow`]: {
				position: "absolute",
				top: calc(lineWidthBold).mul(-1).equal(),
				insetInlineStart: "100%",
				zIndex: 1,
				height: calc(lineWidthBold).mul(2).add("100%").equal(),
				width: varRef("item-base-width"),
				overflow: "visible",
				strokeLinecap: "round",
				path: {
					fill: varRef("panel-bg-color"),
					stroke: varRef("panel-border-color"),
					strokeWidth: lineWidthBold,
					vectorEffect: "non-scaling-stroke",
					transition: `fill ${motionDurationMid}`
				}
			},
			[`${itemCls}:last-child ${componentCls}-panel-arrow`]: { display: "none" },
			[itemCls]: {
				padding: varRef("panel-padding"),
				background: varRef("panel-bg-color"),
				position: "relative",
				borderBlock: borderStyle,
				"&:not(:first-child)": { paddingInlineStart: `calc(${varRef("panel-padding")} + ${varRef("item-base-width")})` },
				"&:first-child": {
					borderInlineStart: borderStyle,
					borderStartStartRadius: varRef("item-border-radius"),
					borderEndStartRadius: varRef("item-border-radius")
				},
				"&:last-child": {
					borderInlineEnd: borderStyle,
					borderStartEndRadius: varRef("item-border-radius"),
					borderEndEndRadius: varRef("item-border-radius")
				},
				"&-active": {
					background: varRef("panel-active-bg-color"),
					borderColor: varRef("panel-active-border-color"),
					[`${componentCls}-panel-arrow`]: { path: {
						fill: varRef("panel-active-bg-color"),
						stroke: varRef("panel-active-border-color")
					} },
					[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: { color: varRef("item-icon-active-text-color") }
				}
			}
		},
		{ [`&${componentCls}-small`]: {
			[varName("panel-padding")]: paddingXS,
			[varName("item-border-radius")]: borderRadiusSM
		} },
		{ [`&${componentCls}-filled`]: { [itemCls]: { "&:not(:first-child)": { clipPath: `polygon(${[
			`${unit(lineWidthBold)} 0`,
			`calc(100% + ${varRef("item-base-width")}) 0`,
			`calc(100% + ${varRef("item-base-width")}) 100%`,
			`${unit(lineWidthBold)} 100%`,
			`calc(${varRef("item-base-width")} + ${unit(lineWidthBold)}) 50%`
		].join(",")})` } } } },
		{ [`&${componentCls}-outlined`]: { [`${componentCls}-panel-arrow`]: {
			top: calc(lineWidthBold).div(2).mul(-1).equal(),
			height: calc(lineWidthBold).add("100%").equal()
		} } }
	] };
};
//#endregion
//#region node_modules/antd/es/steps/style/progress.js
var genStepsProgressStyle = (token) => {
	const { calc, antCls, componentCls, lineWidthBold, motionDurationSlow } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	const enhanceSize = calc(lineWidthBold).add(lineWidthBold).equal();
	return { [`${componentCls}${componentCls}-with-progress`]: {
		[varName("item-wrapper-padding-top")]: enhanceSize,
		[`${itemCls}${itemCls}-process`]: { [`${itemCls}-icon`]: { position: "relative" } },
		[`${itemCls}-progress-icon`]: {
			"&-svg": {
				[varName("svg-size")]: calc(enhanceSize).mul(2).add(varRef("icon-size")).equal(),
				[varName("icon-size-ptg-unitless")]: `calc(100 / tan(atan2(${varRef("svg-size")}, 1px)))`,
				fontSize: varRef("svg-size"),
				lineHeight: varRef("icon-size-ptg-unitless"),
				position: "absolute",
				inset: calc(enhanceSize).mul(-1).equal(),
				width: "auto",
				height: "auto"
			},
			"&-circle": {
				lineHeight: varRef("icon-size-ptg-unitless"),
				strokeWidth: calc(varRef("icon-size-ptg-unitless")).mul(lineWidthBold).equal(),
				[varName("progress-radius")]: calc(varRef("svg-size")).sub(lineWidthBold).mul(varRef("icon-size-ptg-unitless")).div(2).equal(),
				r: varRef("progress-radius"),
				fill: "none",
				cx: 50,
				cy: 50,
				transition: `all ${motionDurationSlow} ease-in-out`,
				"&-rail": { stroke: token.colorSplit },
				"&-ptg": { stroke: token.colorPrimary }
			}
		}
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/progress-dot.js
var genDotStyle = (token) => {
	const { componentCls, iconSize, dotSize, dotCurrentSize, marginXXS, lineWidthBold, fontSizeSM, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-dot`]: {
		[varName("icon-size-active")]: dotCurrentSize,
		[varName("icon-size")]: dotSize,
		[varName("dot-icon-size")]: dotSize,
		[varName("dot-icon-border-width")]: lineWidthBold,
		[varName("rail-size")]: lineWidthBold,
		[varName("icon-border-width")]: lineWidthBold,
		[`${itemCls}-custom ${itemCls}-icon`]: { fontSize: fontSizeSM },
		[`${itemCls}-icon`]: {
			position: "relative",
			"&:after": {
				content: "\"\"",
				width: iconSize,
				height: iconSize,
				display: "block",
				position: "absolute",
				top: "50%",
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translate(-50%, -50%)"
			}
		},
		[`${itemCls}-active ${itemCls}-icon`]: { [varName("icon-size")]: varRef("icon-size-active") },
		[`&${componentCls}-horizontal`]: { [`&, &${componentCls}-small`]: getItemWithWidthStyle(token, marginXXS) }
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/rtl.js
var genRTLStyle = (token) => {
	const { componentCls, lineWidthBold, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-rtl`]: {
		direction: "rtl",
		[`&${componentCls}-navigation${componentCls}-horizontal`]: { [`${itemCls}:after`]: { transform: "translateY(-50%) rotate(-45deg)" } },
		[`&${componentCls}-panel`]: {
			[`${componentCls}-panel-arrow`]: { transform: `scaleX(-1)` },
			[`&${componentCls}-filled`]: { [itemCls]: { "&:not(:first-child)": { clipPath: `polygon(${[
				`calc(0px - ${varRef("item-base-width")}) 0px`,
				`calc(100% - ${unit(lineWidthBold)}) 0px`,
				`calc(100% - ${varRef("item-base-width")} - ${unit(lineWidthBold)}) 50%`,
				`calc(100% - ${unit(lineWidthBold)}) 100%`,
				`calc(0px - ${varRef("item-base-width")}) 100%`
			].join(",")})` } } }
		}
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/small.js
var genSmallStyle = (token) => {
	const { componentCls, iconSizeSM, fontSize, lineHeight, marginXS, fontHeight, marginSM, paddingXS, antCls } = token;
	const [varName] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-small`]: {
		[varName("icon-size")]: iconSizeSM,
		[varName("title-horizontal-item-margin")]: marginSM,
		[varName("title-vertical-row-gap")]: paddingXS,
		[varName("title-font-size")]: fontSize,
		[varName("title-line-height")]: lineHeight,
		[varName("title-horizontal-rail-margin")]: marginXS,
		[varName("title-horizontal-title-height")]: fontHeight,
		[`&${componentCls}-horizontal${componentCls}-title-vertical`]: getItemWithWidthStyle(token, marginXS)
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/status.js
var STATUS_WAIT = "wait";
var STATUS_PROCESS = "process";
var STATUS_FINISH = "finish";
var STATUS_ERROR = "error";
var genStatusStyle = (token) => {
	const { componentCls, colorTextDisabled, colorTextLightSolid, colorPrimary, colorTextLabel, colorError, colorErrorHover, colorErrorBgFilledHover, colorFillTertiary, colorErrorBg, colorPrimaryBgHover, colorPrimaryBg, colorText, colorTextDescription, colorBgContainer, colorPrimaryHover, lineType, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [componentCls]: [
		{
			[itemCls]: {
				[varName("item-solid-line-color")]: "#000",
				[varName("item-title-color")]: "#000",
				[varName("item-content-color")]: "#000",
				[varName("item-subtitle-color")]: varRef("item-content-color"),
				[varName("item-icon-custom-color")]: "#000",
				[varName("item-icon-bg-color")]: "#000",
				[varName("item-icon-border-color")]: "#000",
				[varName("item-icon-text-color")]: "#fff",
				[varName("item-icon-dot-color")]: "#000",
				[varName("item-icon-dot-bg-color")]: varRef("item-icon-dot-color"),
				[varName("item-icon-dot-border-color")]: varRef("item-icon-dot-color"),
				[varName("item-text-hover-color")]: "#000",
				[varName("item-icon-bg-hover-color")]: varRef("item-icon-bg-color"),
				[varName("item-icon-border-hover-color")]: varRef("item-icon-border-color"),
				[varName("item-icon-text-hover-color")]: varRef("item-icon-text-color"),
				[varName("item-content-active-color")]: varRef("item-content-color"),
				[varName("item-icon-active-bg-color")]: varRef("item-icon-bg-color"),
				[varName("item-icon-active-border-color")]: varRef("item-icon-border-color"),
				[varName("item-icon-active-text-color")]: varRef("item-icon-text-color"),
				[varName("item-process-rail-line-style")]: lineType
			},
			[`${itemCls}-rail`]: { borderColor: varRef("item-solid-line-color") },
			[`${itemCls}-custom ${itemCls}-icon`]: { color: varRef("item-icon-custom-color") },
			[`${itemCls}-title`]: { color: varRef("item-title-color") },
			[`${itemCls}-subtitle`]: { color: varRef("item-subtitle-color") },
			[`${itemCls}-content`]: { color: varRef("item-content-color") },
			[`${itemCls}-active ${itemCls}-icon`]: {},
			[`${itemCls}-active ${itemCls}-content`]: { color: varRef("item-content-active-color") },
			[`${itemCls}[role='button']:not(${itemCls}-active):hover`]: { [`${itemCls}-title, ${itemCls}-content`]: { color: varRef("item-text-hover-color") } },
			[`&:not(${componentCls}-dot)`]: { [`${itemCls}:not(${itemCls}-custom)`]: {
				[`${itemCls}-icon`]: {
					background: varRef("item-icon-bg-color"),
					borderColor: varRef("item-icon-border-color"),
					color: varRef("item-icon-text-color")
				},
				[`&[role='button']:not(${itemCls}-active):hover`]: { [`${itemCls}-icon`]: {
					background: varRef("item-icon-bg-hover-color"),
					borderColor: varRef("item-icon-border-hover-color"),
					color: varRef("item-icon-text-hover-color")
				} },
				[`&${itemCls}-active`]: { [`${itemCls}-icon`]: {
					background: varRef("item-icon-active-bg-color"),
					borderColor: varRef("item-icon-active-border-color"),
					color: varRef("item-icon-active-text-color")
				} }
			} },
			[`&${componentCls}-dot`]: { [`${itemCls}-icon`]: {
				background: varRef("item-icon-dot-bg-color"),
				borderColor: varRef("item-icon-dot-border-color"),
				color: varRef("item-icon-dot-color"),
				[`&${itemCls}-icon-dot-custom`]: {
					background: "transparent",
					border: "none"
				}
			} }
		},
		{
			[`${itemCls}-${STATUS_WAIT}`]: {
				[varName("item-icon-custom-color")]: colorTextDisabled,
				[varName("item-title-color")]: colorTextDescription,
				[varName("item-content-color")]: colorTextDescription,
				[varName("item-content-active-color")]: colorText,
				[varName("item-text-hover-color")]: colorPrimaryHover
			},
			[`${itemCls}-rail-${STATUS_WAIT}`]: { [varName("item-solid-line-color")]: colorTextDisabled },
			[`${itemCls}-${STATUS_PROCESS}`]: {
				[varName("item-icon-custom-color")]: colorPrimary,
				[varName("item-title-color")]: colorText,
				[varName("item-content-color")]: colorTextDescription,
				[varName("item-content-active-color")]: colorText,
				[varName("item-text-hover-color")]: colorPrimaryHover
			},
			[`${itemCls}-rail-${STATUS_PROCESS}`]: {
				[varName("item-solid-line-color")]: colorPrimary,
				[varName("rail-line-style")]: varRef("item-process-rail-line-style")
			},
			[`${itemCls}-${STATUS_FINISH}`]: {
				[varName("item-icon-custom-color")]: colorPrimary,
				[varName("item-title-color")]: colorText,
				[varName("item-content-color")]: colorTextDescription,
				[varName("item-content-active-color")]: colorText,
				[varName("item-text-hover-color")]: colorPrimaryHover
			},
			[`${itemCls}-rail-${STATUS_FINISH}`]: { [varName("item-solid-line-color")]: colorPrimary },
			[`${itemCls}-${STATUS_ERROR}`]: {
				[varName("item-icon-custom-color")]: colorError,
				[varName("item-title-color")]: colorError,
				[varName("item-content-color")]: colorError,
				[varName("item-content-active-color")]: colorError,
				[varName("item-text-hover-color")]: colorErrorHover
			},
			[`${itemCls}-rail-${STATUS_ERROR}`]: { [varName("item-solid-line-color")]: colorError }
		},
		{ [`&${componentCls}-filled`]: {
			[itemCls]: { [varName("item-icon-dot-border-color")]: "transparent" },
			[`${itemCls}-${STATUS_WAIT}`]: {
				[varName("item-icon-bg-color")]: colorFillTertiary,
				[varName("item-icon-border-color")]: "transparent",
				[varName("item-icon-text-color")]: colorTextLabel,
				[varName("item-icon-dot-bg-color")]: colorTextDisabled,
				[varName("item-icon-bg-hover-color")]: colorPrimaryBgHover,
				[varName("item-icon-border-hover-color")]: "transparent",
				[varName("item-icon-text-hover-color")]: colorPrimary,
				[varName("item-icon-active-bg-color")]: colorPrimary,
				[varName("item-icon-active-border-color")]: "transparent",
				[varName("item-icon-active-text-color")]: colorTextLightSolid
			},
			[`${itemCls}-${STATUS_PROCESS}, ${itemCls}-${STATUS_FINISH}`]: {
				[varName("item-icon-bg-color")]: colorPrimaryBg,
				[varName("item-icon-border-color")]: "transparent",
				[varName("item-icon-text-color")]: colorPrimary,
				[varName("item-icon-dot-bg-color")]: colorPrimary,
				[varName("item-icon-bg-hover-color")]: colorPrimaryBgHover,
				[varName("item-icon-border-hover-color")]: "transparent",
				[varName("item-icon-text-hover-color")]: colorPrimary,
				[varName("item-icon-active-bg-color")]: colorPrimary,
				[varName("item-icon-active-border-color")]: "transparent",
				[varName("item-icon-active-text-color")]: colorTextLightSolid
			},
			[`${itemCls}-${STATUS_ERROR}`]: {
				[varName("item-icon-bg-color")]: colorErrorBg,
				[varName("item-icon-border-color")]: "transparent",
				[varName("item-icon-text-color")]: colorError,
				[varName("item-icon-dot-bg-color")]: colorError,
				[varName("item-icon-bg-hover-color")]: colorErrorBgFilledHover,
				[varName("item-icon-border-hover-color")]: "transparent",
				[varName("item-icon-text-hover-color")]: colorError,
				[varName("item-icon-active-bg-color")]: colorError,
				[varName("item-icon-active-border-color")]: "transparent",
				[varName("item-icon-active-text-color")]: colorTextLightSolid
			}
		} },
		{ [`&${componentCls}-outlined`]: {
			[itemCls]: { [varName("item-icon-dot-bg-color")]: "transparent" },
			[`${itemCls}-${STATUS_WAIT}`]: {
				[varName("item-icon-bg-color")]: colorBgContainer,
				[varName("item-icon-border-color")]: colorTextDisabled,
				[varName("item-icon-text-color")]: colorTextDisabled,
				[varName("item-icon-dot-color")]: colorTextDisabled,
				[varName("item-icon-bg-hover-color")]: "transparent",
				[varName("item-icon-border-hover-color")]: colorPrimaryHover,
				[varName("item-icon-text-hover-color")]: colorPrimaryHover,
				[varName("item-icon-active-bg-color")]: colorFillTertiary
			},
			[`${itemCls}-${STATUS_PROCESS}, ${itemCls}-${STATUS_FINISH}`]: {
				[varName("item-icon-bg-color")]: colorBgContainer,
				[varName("item-icon-border-color")]: colorPrimary,
				[varName("item-icon-text-color")]: colorPrimary,
				[varName("item-icon-dot-color")]: colorPrimary,
				[varName("item-icon-bg-hover-color")]: "transparent",
				[varName("item-icon-border-hover-color")]: colorPrimaryHover,
				[varName("item-icon-text-hover-color")]: colorPrimaryHover,
				[varName("item-icon-active-bg-color")]: colorPrimaryBg
			},
			[`${itemCls}-${STATUS_ERROR}`]: {
				[varName("item-icon-bg-color")]: colorBgContainer,
				[varName("item-icon-border-color")]: colorError,
				[varName("item-icon-text-color")]: colorError,
				[varName("item-icon-dot-color")]: colorError,
				[varName("item-icon-bg-hover-color")]: "transparent",
				[varName("item-icon-border-hover-color")]: colorErrorHover,
				[varName("item-icon-text-hover-color")]: colorErrorHover,
				[varName("item-icon-active-bg-color")]: colorErrorBg
			}
		} }
	] };
};
//#endregion
//#region node_modules/antd/es/steps/style/vertical.js
var genVerticalStyle$1 = (token) => {
	const { componentCls, marginXXS, paddingSM, controlHeight, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}-vertical`]: {
		[varName("vertical-rail-margin")]: calc(marginXXS).mul(1.5).equal(),
		flexDirection: "column",
		alignItems: "stretch",
		[`> ${itemCls}`]: {
			minHeight: calc(controlHeight).mul(1.5).equal(),
			paddingBottom: paddingSM,
			"&:last-child": { paddingBottom: 0 },
			[`${itemCls}-icon`]: { marginInlineStart: `calc((${varRef("icon-size-max")} - ${varRef("icon-size")}) / 2)` },
			[`${itemCls}-rail`]: {
				[varName("rail-offset")]: calc(varRef("heading-height")).sub(varRef("icon-size")).div(2).equal(),
				borderInlineStartWidth: varRef("rail-size"),
				position: "absolute",
				top: calc(varRef("icon-size")).add(varRef("item-wrapper-padding-top")).add(varRef("rail-offset")).add(varRef("vertical-rail-margin")).equal(),
				insetInlineStart: calc(varRef("icon-size-max")).div(2).equal(),
				bottom: calc(varRef("vertical-rail-margin")).sub(varRef("rail-offset")).equal(),
				marginInlineStart: `calc(${varRef("rail-size")} / -2)`
			}
		}
	} };
};
//#endregion
//#region node_modules/antd/es/steps/style/index.js
var genBasicStyle = (token) => {
	const { componentCls, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [componentCls]: {
		[varName("title-font-size")]: token.fontSizeLG,
		[varName("title-line-height")]: token.lineHeightLG,
		[varName("subtitle-font-size")]: token.fontSize,
		[varName("subtitle-line-height")]: token.lineHeight,
		[varName("item-wrapper-padding-top")]: "0px",
		[varName("rail-size")]: token.lineWidth,
		[varName("rail-line-style")]: token.lineType,
		...resetComponent(token),
		display: "flex",
		flexWrap: "nowrap",
		alignItems: "flex-start",
		[itemCls]: {
			flex: "none",
			position: "relative"
		},
		[`${itemCls}-wrapper`]: {
			display: "flex",
			flexWrap: "nowrap",
			paddingTop: varRef("item-wrapper-padding-top")
		},
		[`${itemCls}-header`]: {
			display: "flex",
			flexWrap: "nowrap",
			alignItems: "center"
		},
		[`${itemCls}-title`]: {
			color: token.colorText,
			fontSize: varRef("title-font-size"),
			lineHeight: varRef("title-line-height"),
			wordBreak: "break-word"
		},
		[`${itemCls}-subtitle`]: {
			color: token.colorTextDescription,
			fontWeight: "normal",
			fontSize: varRef("subtitle-font-size"),
			lineHeight: varRef("subtitle-line-height"),
			marginInlineStart: token.marginXS,
			wordBreak: "break-word"
		},
		[`${itemCls}-content`]: {
			color: token.colorTextDescription,
			fontSize: token.fontSize,
			lineHeight: token.lineHeight,
			wordBreak: "break-word"
		},
		[`${itemCls}-rail`]: {
			borderStyle: varRef("rail-line-style"),
			borderWidth: 0
		},
		[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content, ${itemCls}-rail`]: { transition: `all ${token.motionDurationSlow}` },
		[`&${componentCls}-ellipsis`]: { [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: textEllipsis },
		[`${itemCls}[role='button']:not(${itemCls}-active):hover`]: { cursor: "pointer" }
	} };
};
var prepareComponentToken$4 = (token) => ({
	titleLineHeight: token.controlHeight,
	customIconSize: token.controlHeight,
	customIconTop: 0,
	customIconFontSize: token.controlHeightSM,
	iconSize: token.controlHeight,
	iconTop: -.5,
	iconFontSize: token.fontSize,
	iconSizeSM: token.fontSizeHeading3,
	dotSize: token.controlHeight / 4,
	dotCurrentSize: token.controlHeightLG / 4,
	navArrowColor: token.colorTextDisabled,
	navContentMaxWidth: "unset",
	descriptionMaxWidth: void 0,
	waitIconColor: token.wireframe ? token.colorTextDisabled : token.colorTextLabel,
	waitIconBgColor: token.wireframe ? token.colorBgContainer : token.colorFillContent,
	waitIconBorderColor: token.wireframe ? token.colorTextDisabled : "transparent",
	finishIconBgColor: token.wireframe ? token.colorBgContainer : token.controlItemBgActive,
	finishIconBorderColor: token.wireframe ? token.colorPrimary : token.controlItemBgActive
});
var style_default$4 = genStyleHooks("Steps", (token) => {
	const stepsToken = merge$1(token, { inlineDotSize: 6 });
	return [
		genBasicStyle(stepsToken),
		genIconStyle(stepsToken),
		genVerticalStyle$1(stepsToken),
		genHorizontalStyle$1(stepsToken),
		genLabelPlacementStyle(stepsToken),
		genSmallStyle(stepsToken),
		genDotStyle(stepsToken),
		genStatusStyle(stepsToken),
		genLegacyNavStyle(stepsToken),
		genPanelStyle(stepsToken),
		genInlineStyle(stepsToken),
		genStepsProgressStyle(stepsToken),
		genRTLStyle(stepsToken)
	];
}, prepareComponentToken$4);
//#endregion
//#region node_modules/antd/es/steps/index.js
var waveEffectClassNames = { itemIcon: TARGET_CLS };
var Steps = (props) => {
	const { size, className, rootClassName, style, variant = "filled", type, classNames, styles, direction, orientation, responsive = true, progressDot, labelPlacement, titlePlacement, ellipsis, offset = 0, items, percent, current = 0, onChange, iconRender, ...restProps } = props;
	const internalContent = import_react.useContext(InternalContext);
	const contextContent = useComponentConfig("steps");
	const { getPrefixCls, direction: rtlDirection, className: contextClassName, style: contextStyle } = contextContent;
	let contextClassNames;
	let contextStyles;
	let components = {};
	if (internalContent) components = {
		root: internalContent.rootComponent,
		item: internalContent.itemComponent
	};
	else ({classNames: contextClassNames, styles: contextStyles} = contextContent);
	const rootPrefixCls = getPrefixCls();
	const prefixCls = getPrefixCls("steps", props.prefixCls);
	const itemIconCls = `${prefixCls}-item-icon`;
	const [hashId, cssVarCls] = style_default$4(prefixCls);
	const [varName] = genCssVar(rootPrefixCls, "cmp-steps");
	const mergedSize = useSize(size);
	const mergedItems = import_react.useMemo(() => (items || []).filter(Boolean), [items]);
	const { xs } = useBreakpoint(responsive);
	const mergedType = import_react.useMemo(() => {
		if (type && type !== "default") return type;
		if (progressDot) return "dot";
		return type;
	}, [progressDot, type]);
	const isInline = mergedType === "inline";
	const isDot = mergedType === "dot" || mergedType === "inline";
	const legacyProgressDotRender = import_react.useMemo(() => {
		return mergedType === "dot" && typeof progressDot === "function" ? progressDot : void 0;
	}, [mergedType, progressDot]);
	const mergedOrientation = import_react.useMemo(() => {
		const nextOrientation = orientation || direction;
		if (mergedType === "panel") return "horizontal";
		return responsive && xs || nextOrientation === "vertical" ? "vertical" : "horizontal";
	}, [
		orientation,
		direction,
		mergedType,
		responsive,
		xs
	]);
	const mergedTitlePlacement = import_react.useMemo(() => {
		if (isDot || mergedOrientation === "vertical") return mergedOrientation === "vertical" ? "horizontal" : "vertical";
		if (type === "navigation") return "horizontal";
		return titlePlacement || labelPlacement || "horizontal";
	}, [
		isDot,
		labelPlacement,
		mergedOrientation,
		titlePlacement,
		type
	]);
	const mergedPercent = isInline ? void 0 : percent;
	const mergedProps = {
		...props,
		variant,
		size: mergedSize,
		type: mergedType,
		orientation: mergedOrientation,
		titlePlacement: mergedTitlePlacement,
		current,
		percent: mergedPercent,
		responsive,
		offset
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([
		waveEffectClassNames,
		contextClassNames,
		classNames
	], [contextStyles, styles], { props: mergedProps });
	const internalIconRender = (_, info) => {
		const { item, index, active, components: { Icon: StepIcon } } = info;
		const { status, icon } = item;
		let iconContent = null;
		if (isDot || icon) iconContent = icon;
		else switch (status) {
			case "finish":
				iconContent = /* @__PURE__ */ import_react.createElement(RefIcon$8, { className: `${itemIconCls}-finish` });
				break;
			case "error":
				iconContent = /* @__PURE__ */ import_react.createElement(RefIcon, { className: `${itemIconCls}-error` });
				break;
			default: {
				let numNode = /* @__PURE__ */ import_react.createElement("span", { className: `${itemIconCls}-number` }, info.index + 1);
				if (status === "process" && mergedPercent !== void 0) numNode = /* @__PURE__ */ import_react.createElement(ProgressIcon, {
					prefixCls,
					rootPrefixCls,
					percent: mergedPercent
				}, numNode);
				iconContent = numNode;
			}
		}
		let iconNode = /* @__PURE__ */ import_react.createElement(StepIcon, null, iconContent);
		if (iconRender) iconNode = iconRender(iconNode, {
			index,
			active,
			item,
			components: { Icon: StepIcon }
		});
		else if (typeof legacyProgressDotRender === "function") iconNode = legacyProgressDotRender(iconNode, {
			index,
			...item
		});
		return iconNode;
	};
	const itemRender = (itemNode, itemInfo) => {
		let content = itemNode;
		if (isInline && itemInfo.item.content) content = /* @__PURE__ */ import_react.createElement(Tooltip, {
			destroyOnHidden: true,
			title: itemInfo.item.content
		}, itemNode);
		return /* @__PURE__ */ import_react.createElement(Wave, {
			component: "Steps",
			disabled: itemInfo.item.disabled || !onChange,
			colorSource: variant === "filled" ? "color" : null
		}, content);
	};
	const itemWrapperRender = mergedType === "panel" ? (itemNode) => {
		return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, itemNode, /* @__PURE__ */ import_react.createElement(PanelArrow, { prefixCls }));
	} : void 0;
	const mergedStyle = {
		[varName("items-offset")]: `${offset}`,
		...contextStyle,
		...style
	};
	const stepsClassName = clsx(contextClassName, `${prefixCls}-${variant}`, {
		[`${prefixCls}-${mergedType}`]: mergedType !== "dot" ? mergedType : false,
		[`${prefixCls}-rtl`]: rtlDirection === "rtl",
		[`${prefixCls}-dot`]: isDot,
		[`${prefixCls}-ellipsis`]: ellipsis,
		[`${prefixCls}-with-progress`]: mergedPercent !== void 0,
		[`${prefixCls}-small`]: mergedSize === "small"
	}, className, rootClassName, hashId, cssVarCls);
	return /* @__PURE__ */ import_react.createElement(es_default$11, {
		...restProps,
		prefixCls,
		className: stepsClassName,
		style: mergedStyle,
		classNames: mergedClassNames,
		styles: mergedStyles,
		orientation: mergedOrientation,
		titlePlacement: mergedTitlePlacement,
		components,
		current,
		items: mergedItems,
		onChange,
		iconRender: internalIconRender,
		itemRender,
		itemWrapperRender
	});
};
//#endregion
//#region node_modules/antd/es/switch/style/index.js
var genSwitchSmallStyle = (token) => {
	const { componentCls, trackHeightSM, trackPadding, trackMinWidthSM, innerMinMarginSM, innerMaxMarginSM, handleSizeSM, calc } = token;
	const switchInnerCls = `${componentCls}-inner`;
	const trackPaddingCalc = unit(calc(handleSizeSM).add(calc(trackPadding).mul(2)).equal());
	const innerMaxMarginCalc = unit(calc(innerMaxMarginSM).mul(2).equal());
	return { [componentCls]: { [`&${componentCls}-small`]: {
		minWidth: trackMinWidthSM,
		height: trackHeightSM,
		lineHeight: unit(trackHeightSM),
		[`${componentCls}-inner`]: {
			paddingInlineStart: innerMaxMarginSM,
			paddingInlineEnd: innerMinMarginSM,
			[`${switchInnerCls}-checked, ${switchInnerCls}-unchecked`]: { minHeight: trackHeightSM },
			[`${switchInnerCls}-checked`]: {
				marginInlineStart: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`,
				marginInlineEnd: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`
			},
			[`${switchInnerCls}-unchecked`]: {
				marginTop: calc(trackHeightSM).mul(-1).equal(),
				marginInlineStart: 0,
				marginInlineEnd: 0
			}
		},
		[`${componentCls}-handle`]: {
			width: handleSizeSM,
			height: handleSizeSM
		},
		[`${componentCls}-loading-icon`]: {
			top: calc(calc(handleSizeSM).sub(token.switchLoadingIconSize)).div(2).equal(),
			fontSize: token.switchLoadingIconSize
		},
		[`&${componentCls}-checked`]: {
			[`${componentCls}-inner`]: {
				paddingInlineStart: innerMinMarginSM,
				paddingInlineEnd: innerMaxMarginSM,
				[`${switchInnerCls}-checked`]: {
					marginInlineStart: 0,
					marginInlineEnd: 0
				},
				[`${switchInnerCls}-unchecked`]: {
					marginInlineStart: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`,
					marginInlineEnd: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`
				}
			},
			[`${componentCls}-handle`]: { insetInlineStart: `calc(100% - ${unit(calc(handleSizeSM).add(trackPadding).equal())})` }
		},
		[`&:not(${componentCls}-disabled):active`]: {
			[`&:not(${componentCls}-checked) ${switchInnerCls}`]: { [`${switchInnerCls}-unchecked`]: {
				marginInlineStart: calc(token.marginXXS).div(2).equal(),
				marginInlineEnd: calc(token.marginXXS).mul(-1).div(2).equal()
			} },
			[`&${componentCls}-checked ${switchInnerCls}`]: { [`${switchInnerCls}-checked`]: {
				marginInlineStart: calc(token.marginXXS).mul(-1).div(2).equal(),
				marginInlineEnd: calc(token.marginXXS).div(2).equal()
			} }
		}
	} } };
};
var genSwitchLoadingStyle = (token) => {
	const { componentCls, handleSize, calc } = token;
	return { [componentCls]: {
		[`${componentCls}-loading-icon${token.iconCls}`]: {
			position: "relative",
			top: calc(calc(handleSize).sub(token.fontSize)).div(2).equal(),
			color: token.switchLoadingIconColor,
			verticalAlign: "top"
		},
		[`&${componentCls}-checked ${componentCls}-loading-icon`]: { color: token.switchColor }
	} };
};
var genSwitchHandleStyle = (token) => {
	const { componentCls, trackPadding, handleBg, handleShadow, handleSize, calc } = token;
	const switchHandleCls = `${componentCls}-handle`;
	return { [componentCls]: {
		[switchHandleCls]: {
			position: "absolute",
			top: trackPadding,
			insetInlineStart: trackPadding,
			width: handleSize,
			height: handleSize,
			transition: `all ${token.switchDuration} ease-in-out`,
			...genNoMotionStyle(),
			"&::before": {
				position: "absolute",
				top: 0,
				insetInlineEnd: 0,
				bottom: 0,
				insetInlineStart: 0,
				backgroundColor: handleBg,
				borderRadius: calc(handleSize).div(2).equal(),
				boxShadow: handleShadow,
				transition: `all ${token.switchDuration} ease-in-out`,
				content: "\"\"",
				...genNoMotionStyle()
			}
		},
		[`&${componentCls}-checked ${switchHandleCls}`]: { insetInlineStart: `calc(100% - ${unit(calc(handleSize).add(trackPadding).equal())})` },
		[`&:not(${componentCls}-disabled):active`]: {
			[`${switchHandleCls}::before`]: {
				insetInlineEnd: token.switchHandleActiveInset,
				insetInlineStart: 0
			},
			[`&${componentCls}-checked ${switchHandleCls}::before`]: {
				insetInlineEnd: 0,
				insetInlineStart: token.switchHandleActiveInset
			}
		}
	} };
};
var genSwitchInnerStyle = (token) => {
	const { componentCls, trackHeight, trackPadding, innerMinMargin, innerMaxMargin, handleSize, switchDuration, calc } = token;
	const switchInnerCls = `${componentCls}-inner`;
	const trackPaddingCalc = unit(calc(handleSize).add(calc(trackPadding).mul(2)).equal());
	const innerMaxMarginCalc = unit(calc(innerMaxMargin).mul(2).equal());
	return { [componentCls]: {
		[switchInnerCls]: {
			display: "block",
			overflow: "hidden",
			borderRadius: 100,
			height: "100%",
			paddingInlineStart: innerMaxMargin,
			paddingInlineEnd: innerMinMargin,
			transition: [`padding-inline-start`, `padding-inline-end`].map((prop) => `${prop} ${switchDuration} ease-in-out`).join(", "),
			...genNoMotionStyle(),
			[`${switchInnerCls}-checked, ${switchInnerCls}-unchecked`]: {
				display: "block",
				color: token.colorTextLightSolid,
				fontSize: token.fontSizeSM,
				pointerEvents: "none",
				minHeight: trackHeight,
				transition: [`margin-inline-start`, `margin-inline-end`].map((prop) => `${prop} ${switchDuration} ease-in-out`).join(", "),
				...genNoMotionStyle()
			},
			[`${switchInnerCls}-checked`]: {
				marginInlineStart: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`,
				marginInlineEnd: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`
			},
			[`${switchInnerCls}-unchecked`]: {
				marginTop: calc(trackHeight).mul(-1).equal(),
				marginInlineStart: 0,
				marginInlineEnd: 0
			}
		},
		[`&${componentCls}-checked ${switchInnerCls}`]: {
			paddingInlineStart: innerMinMargin,
			paddingInlineEnd: innerMaxMargin,
			[`${switchInnerCls}-checked`]: {
				marginInlineStart: 0,
				marginInlineEnd: 0
			},
			[`${switchInnerCls}-unchecked`]: {
				marginInlineStart: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`,
				marginInlineEnd: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`
			}
		},
		[`&:not(${componentCls}-disabled):active`]: {
			[`&:not(${componentCls}-checked) ${switchInnerCls}`]: { [`${switchInnerCls}-unchecked`]: {
				marginInlineStart: calc(trackPadding).mul(2).equal(),
				marginInlineEnd: calc(trackPadding).mul(-1).mul(2).equal()
			} },
			[`&${componentCls}-checked ${switchInnerCls}`]: { [`${switchInnerCls}-checked`]: {
				marginInlineStart: calc(trackPadding).mul(-1).mul(2).equal(),
				marginInlineEnd: calc(trackPadding).mul(2).equal()
			} }
		}
	} };
};
var genSwitchStyle = (token) => {
	const { componentCls, trackHeight, trackMinWidth } = token;
	return { [componentCls]: {
		...resetComponent(token),
		position: "relative",
		display: "inline-block",
		boxSizing: "border-box",
		minWidth: trackMinWidth,
		height: trackHeight,
		lineHeight: unit(trackHeight),
		verticalAlign: "middle",
		background: token.colorTextQuaternary,
		border: "0",
		borderRadius: 100,
		cursor: "pointer",
		transition: `all ${token.motionDurationMid}`,
		userSelect: "none",
		...genNoMotionStyle(),
		[`&:hover:not(${componentCls}-disabled)`]: { background: token.colorTextTertiary },
		...genFocusStyle(token),
		[`&${componentCls}-checked`]: {
			background: token.switchColor,
			[`&:hover:not(${componentCls}-disabled)`]: { background: token.colorPrimaryHover }
		},
		[`&${componentCls}-loading, &${componentCls}-disabled`]: {
			cursor: "not-allowed",
			opacity: token.switchDisabledOpacity,
			"*": {
				boxShadow: "none",
				cursor: "not-allowed"
			}
		},
		[`&${componentCls}-rtl`]: { direction: "rtl" }
	} };
};
var prepareComponentToken$3 = (token) => {
	const { fontSize, lineHeight, controlHeight, colorWhite } = token;
	const height = fontSize * lineHeight;
	const heightSM = controlHeight / 2;
	const padding = 2;
	const handleSize = height - padding * 2;
	const handleSizeSM = heightSM - padding * 2;
	return {
		trackHeight: height,
		trackHeightSM: heightSM,
		trackMinWidth: handleSize * 2 + padding * 4,
		trackMinWidthSM: handleSizeSM * 2 + padding * 2,
		trackPadding: padding,
		handleBg: colorWhite,
		handleSize,
		handleSizeSM,
		handleShadow: `0 2px 4px 0 ${new FastColor("#00230b").setA(.2).toRgbString()}`,
		innerMinMargin: handleSize / 2,
		innerMaxMargin: handleSize + padding + padding * 2,
		innerMinMarginSM: handleSizeSM / 2,
		innerMaxMarginSM: handleSizeSM + padding + padding * 2
	};
};
var style_default$3 = genStyleHooks("Switch", (token) => {
	const switchToken = merge$1(token, {
		switchDuration: token.motionDurationMid,
		switchColor: token.colorPrimary,
		switchDisabledOpacity: token.opacityLoading,
		switchLoadingIconSize: token.calc(token.fontSizeIcon).mul(.75).equal(),
		switchLoadingIconColor: `rgba(0, 0, 0, ${token.opacityLoading})`,
		switchHandleActiveInset: "-30%"
	});
	return [
		genSwitchStyle(switchToken),
		genSwitchInnerStyle(switchToken),
		genSwitchHandleStyle(switchToken),
		genSwitchLoadingStyle(switchToken),
		genSwitchSmallStyle(switchToken)
	];
}, prepareComponentToken$3);
//#endregion
//#region node_modules/antd/es/switch/index.js
var Switch = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, size: customizeSize, disabled: customDisabled, loading, className, rootClassName, style, checked: checkedProp, value, defaultChecked: defaultCheckedProp, defaultValue, onChange, styles, classNames, ...restProps } = props;
	const [checked, setChecked] = useControlledState(defaultCheckedProp ?? defaultValue ?? false, checkedProp ?? value);
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("switch");
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = (customDisabled ?? disabled) || loading;
	const prefixCls = getPrefixCls("switch", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$3(prefixCls);
	const mergedSize = useSize(customizeSize);
	const mergedProps = {
		...props,
		size: mergedSize,
		disabled: mergedDisabled
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const loadingIcon = /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-handle`, mergedClassNames.indicator),
		style: mergedStyles.indicator
	}, loading && /* @__PURE__ */ import_react.createElement(RefIcon$5, { className: `${prefixCls}-loading-icon` }));
	const classes = clsx(contextClassName, {
		[`${prefixCls}-small`]: mergedSize === "small",
		[`${prefixCls}-loading`]: loading,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, rootClassName, mergedClassNames.root, hashId, cssVarCls);
	const mergedStyle = {
		...mergedStyles.root,
		...contextStyle,
		...style
	};
	const changeHandler = (...args) => {
		setChecked(args[0]);
		onChange?.(...args);
	};
	return /* @__PURE__ */ import_react.createElement(Wave, {
		component: "Switch",
		disabled: mergedDisabled
	}, /* @__PURE__ */ import_react.createElement(Switch$1, {
		...restProps,
		classNames: mergedClassNames,
		styles: mergedStyles,
		checked,
		onChange: changeHandler,
		prefixCls,
		className: classes,
		style: mergedStyle,
		disabled: mergedDisabled,
		ref,
		loadingIcon
	}));
});
Switch.__ANT_SWITCH = true;
//#endregion
//#region node_modules/antd/es/tag/style/index.js
var genBaseStyle$1 = (token) => {
	const { paddingXXS, lineWidth, tagPaddingHorizontal, componentCls, calc } = token;
	const paddingInline = calc(tagPaddingHorizontal).sub(lineWidth).equal();
	const iconMarginInline = calc(paddingXXS).sub(lineWidth).equal();
	return {
		[componentCls]: {
			...resetComponent(token),
			display: "inline-block",
			height: "auto",
			paddingInline,
			fontSize: token.tagFontSize,
			lineHeight: token.tagLineHeight,
			whiteSpace: "nowrap",
			backgroundColor: token.defaultBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderRadius: token.borderRadiusSM,
			opacity: 1,
			transition: `all ${token.motionDurationMid}`,
			textAlign: "start",
			position: "relative",
			[`&${componentCls}-rtl`]: { direction: "rtl" },
			"&, a, a:hover": { color: token.defaultColor },
			[`${componentCls}-close-icon`]: {
				marginInlineStart: iconMarginInline,
				fontSize: token.tagIconSize,
				color: token.colorIcon,
				cursor: "pointer",
				transition: `all ${token.motionDurationMid}`,
				"&:hover": { color: token.colorTextHeading }
			},
			"&-checkable": {
				backgroundColor: "transparent",
				borderColor: "transparent",
				cursor: "pointer",
				[`&:not(${componentCls}-checkable-checked):hover`]: {
					color: token.colorPrimary,
					backgroundColor: token.colorFillSecondary
				},
				"&:active, &-checked": { color: token.colorTextLightSolid },
				"&-checked": {
					backgroundColor: token.colorPrimary,
					"&:hover": { backgroundColor: token.colorPrimaryHover }
				},
				"&:active": { backgroundColor: token.colorPrimaryActive },
				"&-disabled": {
					cursor: "not-allowed",
					[`&:not(${componentCls}-checkable-checked)`]: {
						color: token.colorTextDisabled,
						"&:hover": { backgroundColor: "transparent" }
					},
					[`&${componentCls}-checkable-checked`]: {
						color: token.colorTextDisabled,
						backgroundColor: token.colorBgContainerDisabled
					},
					"&:hover, &:active": {
						backgroundColor: token.colorBgContainerDisabled,
						color: token.colorTextDisabled
					},
					[`&:not(${componentCls}-checkable-checked):hover`]: { color: token.colorTextDisabled }
				},
				"&-group": {
					display: "flex",
					flexWrap: "wrap",
					gap: token.paddingXS
				}
			},
			"&-hidden": { display: "none" },
			[`> ${token.iconCls} + span, > span + ${token.iconCls}`]: { marginInlineStart: paddingInline }
		},
		[`&${token.componentCls}-solid`]: {
			borderColor: "transparent",
			color: token.colorTextLightSolid,
			backgroundColor: token.colorBgSolid,
			[`&${componentCls}-default`]: { color: token.solidTextColor }
		},
		[`${componentCls}-filled`]: {
			borderColor: "transparent",
			backgroundColor: token.tagBorderlessBg
		},
		[`&${componentCls}-disabled`]: {
			color: token.colorTextDisabled,
			cursor: "not-allowed",
			backgroundColor: token.colorBgContainerDisabled,
			a: {
				cursor: "not-allowed",
				pointerEvents: "none",
				color: token.colorTextDisabled,
				"&:hover": { color: token.colorTextDisabled }
			},
			"a&": { "&:hover, &:active": { color: token.colorTextDisabled } },
			[`&${componentCls}-outlined`]: { borderColor: token.colorBorderDisabled },
			[`&${componentCls}-solid, &${componentCls}-filled`]: {
				color: token.colorTextDisabled,
				[`${componentCls}-close-icon`]: { color: token.colorTextDisabled }
			},
			[`${componentCls}-close-icon`]: {
				cursor: "not-allowed",
				color: token.colorTextDisabled,
				"&:hover": { color: token.colorTextDisabled }
			}
		}
	};
};
var prepareToken = (token) => {
	const { lineWidth, fontSizeIcon, calc } = token;
	const tagFontSize = token.fontSizeSM;
	return merge$1(token, {
		tagFontSize,
		tagLineHeight: unit(calc(token.lineHeightSM).mul(tagFontSize).equal()),
		tagIconSize: calc(fontSizeIcon).sub(calc(lineWidth).mul(2)).equal(),
		tagPaddingHorizontal: 8,
		tagBorderlessBg: token.defaultBg
	});
};
var prepareComponentToken$2 = (token) => {
	const solidTextColor = isBright(new AggregationColor(token.colorBgSolid), "#fff") ? "#000" : "#fff";
	return {
		defaultBg: new FastColor(token.colorFillTertiary).onBackground(token.colorBgContainer).toHexString(),
		defaultColor: token.colorText,
		solidTextColor
	};
};
var style_default$2 = genStyleHooks("Tag", (token) => {
	return genBaseStyle$1(prepareToken(token));
}, prepareComponentToken$2);
//#endregion
//#region node_modules/antd/es/tag/CheckableTag.js
var CheckableTag = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, style, className, checked, children, icon, onChange, onClick, disabled: customDisabled, ...restProps } = props;
	const { getPrefixCls, tag } = import_react.useContext(ConfigContext);
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const handleClick = (e) => {
		if (mergedDisabled) return;
		onChange?.(!checked);
		onClick?.(e);
	};
	const prefixCls = getPrefixCls("tag", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$2(prefixCls);
	const cls = clsx(prefixCls, `${prefixCls}-checkable`, {
		[`${prefixCls}-checkable-checked`]: checked,
		[`${prefixCls}-checkable-disabled`]: mergedDisabled
	}, tag?.className, className, hashId, cssVarCls);
	return /* @__PURE__ */ import_react.createElement("span", {
		...restProps,
		ref,
		style: {
			...style,
			...tag?.style
		},
		className: cls,
		onClick: handleClick
	}, icon, /* @__PURE__ */ import_react.createElement("span", null, children));
});
//#endregion
//#region node_modules/antd/es/tag/CheckableTagGroup.js
var CheckableTagGroup = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { id, prefixCls: customizePrefixCls, rootClassName, className, style, classNames, styles, disabled, options, value, defaultValue, onChange, multiple, ...restProps } = props;
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("tag");
	const prefixCls = getPrefixCls("tag", customizePrefixCls);
	const groupPrefixCls = `${prefixCls}-checkable-group`;
	const [hashId, cssVarCls] = style_default$2(prefixCls, useCSSVarCls(prefixCls));
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props });
	const parsedOptions = (0, import_react.useMemo)(() => {
		if (!Array.isArray(options)) return [];
		return options.map((option) => {
			if (option && typeof option === "object") return option;
			return {
				value: option,
				label: option
			};
		});
	}, [options]);
	const [mergedValue, setMergedValue] = useControlledState(defaultValue, value);
	const handleChange = (checked, option) => {
		let newValue = null;
		if (multiple) {
			const valueList = mergedValue || [];
			newValue = checked ? [].concat(_toConsumableArray(valueList), [option.value]) : valueList.filter((item) => item !== option.value);
		} else newValue = checked ? option.value : null;
		setMergedValue(newValue);
		onChange?.(newValue);
	};
	const divRef = import_react.useRef(null);
	(0, import_react.useImperativeHandle)(ref, () => ({ nativeElement: divRef.current }));
	const ariaProps = pickAttrs(restProps, {
		aria: true,
		data: true
	});
	return /* @__PURE__ */ import_react.createElement("div", {
		...ariaProps,
		className: clsx(groupPrefixCls, contextClassName, rootClassName, {
			[`${groupPrefixCls}-disabled`]: disabled,
			[`${groupPrefixCls}-rtl`]: direction === "rtl"
		}, hashId, cssVarCls, className, mergedClassNames.root),
		style: {
			...contextStyle,
			...mergedStyles.root,
			...style
		},
		id,
		ref: divRef
	}, parsedOptions.map((option) => /* @__PURE__ */ import_react.createElement(CheckableTag, {
		key: option.value,
		className: clsx(`${groupPrefixCls}-item`, mergedClassNames.item),
		style: mergedStyles.item,
		checked: multiple ? (mergedValue || []).includes(option.value) : mergedValue === option.value,
		onChange: (checked) => handleChange(checked, option),
		disabled
	}, option.label)));
});
//#endregion
//#region node_modules/antd/es/tag/hooks/useColor.js
/**
* Convert color related props to a unified object,
* which is used to flatten the compatibility requirements.
*/
function useColor(props, contextVariant) {
	const { color, variant, bordered } = props;
	return import_react.useMemo(() => {
		const isInverseColor = color?.endsWith("-inverse");
		let nextVariant;
		if (variant) nextVariant = variant;
		else if (isInverseColor) nextVariant = "solid";
		else if (bordered === false) nextVariant = "filled";
		else nextVariant = contextVariant || "filled";
		const nextColor = isInverseColor ? color?.replace("-inverse", "") : color;
		const nextIsPreset = isPresetColor(color);
		const nextIsStatus = isPresetStatusColor(color);
		const tagStyle = {};
		if (!nextIsPreset && !nextIsStatus && nextColor) if (nextVariant === "solid") tagStyle.backgroundColor = color;
		else {
			const hsl = new FastColor(nextColor).toHsl();
			hsl.l = .95;
			tagStyle.backgroundColor = new FastColor(hsl).toHexString();
			tagStyle.color = color;
			if (nextVariant === "outlined") tagStyle.borderColor = color;
		}
		return [
			nextVariant,
			nextColor,
			nextIsPreset,
			nextIsStatus,
			tagStyle
		];
	}, [
		color,
		variant,
		bordered,
		contextVariant
	]);
}
//#endregion
//#region node_modules/antd/es/tag/style/presetCmp.js
var genPresetStyle = (token) => genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({ [`${token.componentCls}${token.componentCls}-${colorKey}:not(${token.componentCls}-disabled)`]: {
	[`&${token.componentCls}-outlined`]: {
		backgroundColor: lightColor,
		borderColor: lightBorderColor,
		color: textColor
	},
	[`&${token.componentCls}-solid`]: {
		backgroundColor: darkColor,
		borderColor: darkColor,
		color: token.colorTextLightSolid
	},
	[`&${token.componentCls}-filled`]: {
		backgroundColor: lightColor,
		color: textColor
	}
} }));
var presetCmp_default = genSubStyleComponent(["Tag", "preset"], (token) => {
	return genPresetStyle(prepareToken(token));
}, prepareComponentToken$2);
//#endregion
//#region node_modules/antd/es/_util/capitalize.js
function capitalize(str) {
	if (typeof str !== "string") return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}
//#endregion
//#region node_modules/antd/es/tag/style/statusCmp.js
var genTagStatusStyle = (token, status, cssVariableType) => {
	const capitalizedCssVariableType = capitalize(cssVariableType);
	return { [`${token.componentCls}${token.componentCls}-${status}:not(${token.componentCls}-disabled)`]: {
		[`&${token.componentCls}-outlined`]: {
			backgroundColor: token[`color${capitalizedCssVariableType}Bg`],
			borderColor: token[`color${capitalizedCssVariableType}Border`],
			color: token[`color${cssVariableType}`]
		},
		[`&${token.componentCls}-solid`]: {
			backgroundColor: token[`color${cssVariableType}`],
			borderColor: token[`color${cssVariableType}`]
		},
		[`&${token.componentCls}-filled`]: {
			backgroundColor: token[`color${capitalizedCssVariableType}Bg`],
			color: token[`color${cssVariableType}`]
		}
	} };
};
var statusCmp_default = genSubStyleComponent(["Tag", "status"], (token) => {
	const tagToken = prepareToken(token);
	return [
		genTagStatusStyle(tagToken, "success", "Success"),
		genTagStatusStyle(tagToken, "processing", "Info"),
		genTagStatusStyle(tagToken, "error", "Error"),
		genTagStatusStyle(tagToken, "warning", "Warning")
	];
}, prepareComponentToken$2);
//#endregion
//#region node_modules/antd/es/tag/index.js
var Tag = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, style, children, icon, color, variant: _variant, onClose, bordered, disabled: customDisabled, href, target, styles, classNames, ...restProps } = props;
	const { getPrefixCls, direction, className: contextClassName, variant: contextVariant, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("tag");
	const [mergedVariant, mergedColor, isPreset, isStatus, customTagStyle] = useColor(props, contextVariant);
	const isInternalColor = isPreset || isStatus;
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const { tag: tagContext } = import_react.useContext(ConfigContext);
	const [visible, setVisible] = import_react.useState(true);
	const domProps = omit(restProps, ["closeIcon", "closable"]);
	const mergedProps = {
		...props,
		color: mergedColor,
		variant: mergedVariant,
		disabled: mergedDisabled
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const tagStyle = import_react.useMemo(() => {
		let nextTagStyle = {
			...mergedStyles.root,
			...contextStyle,
			...style
		};
		if (!mergedDisabled) nextTagStyle = {
			...customTagStyle,
			...nextTagStyle
		};
		return nextTagStyle;
	}, [
		mergedStyles.root,
		contextStyle,
		style,
		customTagStyle,
		mergedDisabled
	]);
	const prefixCls = getPrefixCls("tag", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$2(prefixCls);
	const tagClassName = clsx(prefixCls, contextClassName, mergedClassNames.root, `${prefixCls}-${mergedVariant}`, {
		[`${prefixCls}-${mergedColor}`]: isInternalColor,
		[`${prefixCls}-hidden`]: !visible,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-disabled`]: mergedDisabled
	}, className, rootClassName, hashId, cssVarCls);
	const handleCloseClick = (e) => {
		if (mergedDisabled) return;
		e.stopPropagation();
		onClose?.(e);
		if (e.defaultPrevented) return;
		setVisible(false);
	};
	const [, mergedCloseIcon] = useClosable(pickClosable(props), pickClosable(tagContext), {
		closable: false,
		closeIconRender: (iconNode) => {
			return replaceElement(iconNode, /* @__PURE__ */ import_react.createElement("span", {
				className: `${prefixCls}-close-icon`,
				onClick: handleCloseClick
			}, iconNode), (originProps) => ({
				onClick: (e) => {
					originProps?.onClick?.(e);
					handleCloseClick(e);
				},
				className: clsx(originProps?.className, `${prefixCls}-close-icon`)
			}));
		}
	});
	const isNeedWave = typeof restProps.onClick === "function" || children && children.type === "a";
	const iconNode = cloneElement(icon, {
		className: clsx(/* @__PURE__ */ import_react.isValidElement(icon) ? icon.props?.className : void 0, mergedClassNames.icon),
		style: mergedStyles.icon
	});
	const child = iconNode ? /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, iconNode, children && /* @__PURE__ */ import_react.createElement("span", {
		className: mergedClassNames.content,
		style: mergedStyles.content
	}, children)) : children;
	const TagWrapper = href ? "a" : "span";
	const tagNode = /* @__PURE__ */ import_react.createElement(TagWrapper, {
		...domProps,
		ref,
		className: tagClassName,
		style: tagStyle,
		href: mergedDisabled ? void 0 : href,
		target,
		onClick: mergedDisabled ? void 0 : domProps.onClick,
		...href && mergedDisabled ? { "aria-disabled": true } : {}
	}, child, mergedCloseIcon, isPreset && /* @__PURE__ */ import_react.createElement(presetCmp_default, {
		key: "preset",
		prefixCls
	}), isStatus && /* @__PURE__ */ import_react.createElement(statusCmp_default, {
		key: "status",
		prefixCls
	}));
	return isNeedWave ? /* @__PURE__ */ import_react.createElement(Wave, { component: "Tag" }, tagNode) : tagNode;
});
Tag.CheckableTag = CheckableTag;
Tag.CheckableTagGroup = CheckableTagGroup;
//#endregion
//#region node_modules/antd/es/time-picker/index.js
var { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;
var RangePicker = /* @__PURE__ */ import_react.forwardRef((props, ref) => /* @__PURE__ */ import_react.createElement(InternalRangePicker, {
	...props,
	picker: "time",
	mode: void 0,
	ref
}));
var TimePicker = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { addon, renderExtraFooter, variant, bordered, classNames, styles, popupClassName, popupStyle, ...restProps } = props;
	const [mergedVariant] = useVariant("timePicker", variant, bordered);
	const internalRenderExtraFooter = import_react.useMemo(() => {
		if (renderExtraFooter) return renderExtraFooter;
		if (addon) return addon;
	}, [addon, renderExtraFooter]);
	const [mergedClassNames, mergedStyles] = useMergedPickerSemantic("timePicker", classNames, styles, popupClassName, popupStyle, {
		...props,
		variant: mergedVariant
	});
	return /* @__PURE__ */ import_react.createElement(InternalTimePicker, {
		...restProps,
		mode: void 0,
		ref,
		renderExtraFooter: internalRenderExtraFooter,
		variant: mergedVariant,
		classNames: mergedClassNames,
		styles: mergedStyles
	});
});
/* istanbul ignore next */
var PurePanel = genPurePanel(TimePicker, "popupAlign", void 0, "picker");
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
TimePicker.RangePicker = RangePicker;
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
//#endregion
//#region node_modules/antd/es/timeline/style/horizontal.js
var genHorizontalStyle = (token) => {
	const { componentCls, fontHeight, antCls, paddingXS } = token;
	const [stepsVarName, stepsVarRef] = genCssVar(antCls, "cmp-steps");
	const [timelineVarName, timelineVarRef] = genCssVar(antCls, "timeline");
	const itemCls = `${componentCls}-item`;
	return { [`${componentCls}-horizontal`]: {
		[stepsVarName("title-vertical-row-gap")]: paddingXS,
		[timelineVarName("content-height")]: unit(fontHeight),
		alignItems: "stretch",
		[`&${componentCls}-layout-alternate`]: { [itemCls]: {
			[`${itemCls}-wrapper`]: {
				[timelineVarName("alternate-content-offset")]: `calc(${timelineVarRef("content-height")} + ${stepsVarRef("title-vertical-row-gap")} * 2 + ${stepsVarRef("icon-size-max")})`,
				height: `calc(${timelineVarRef("content-height")} * 2 + ${stepsVarRef("title-vertical-row-gap")} * 2 + ${stepsVarRef("icon-size-max")})`
			},
			[`${itemCls}-icon`]: { position: "absolute" },
			[`${itemCls}-icon, ${itemCls}-rail`]: {
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				margin: 0
			},
			[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
				whiteSpace: "nowrap",
				maxWidth: "unset"
			},
			[`${itemCls}-title`]: {
				position: "absolute",
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translateX(-50%)"
			},
			[`${itemCls}-content`]: {
				position: "absolute",
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translateX(-50%)"
			},
			"&-placement-start": {
				[`${itemCls}-title`]: { bottom: timelineVarRef("alternate-content-offset") },
				[`${itemCls}-content`]: { top: timelineVarRef("alternate-content-offset") }
			},
			"&-placement-end": {
				[`${itemCls}-title`]: { top: timelineVarRef("alternate-content-offset") },
				[`${itemCls}-content`]: { bottom: timelineVarRef("alternate-content-offset") }
			}
		} },
		[`&:not(${componentCls}-layout-alternate)`]: { [`${itemCls}-placement-end`]: {
			display: "flex",
			alignItems: "flex-end",
			[`${itemCls}-wrapper`]: {
				flex: "auto",
				flexDirection: "column-reverse"
			},
			[`${itemCls}-rail`]: {
				top: "auto",
				bottom: stepsVarRef("horizontal-rail-margin"),
				transform: "translateY(50%)"
			}
		} }
	} };
};
//#endregion
//#region node_modules/antd/es/timeline/style/index.js
var genTimelineStyle = (token) => {
	const { componentCls, tailColor, fontHeight, dotSize, dotBg, dotBorderWidth, fontSize, lineHeight, colorText, tailWidth, colorPrimary, colorError, colorSuccess, colorTextDisabled, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [componentCls]: [{
		...resetComponent(token),
		[itemCls]: {
			[varName("title-horizontal-title-height")]: fontHeight,
			[varName("vertical-rail-margin")]: "0px",
			[varName("title-horizontal-rail-gap")]: "0px",
			[varName("icon-dot-size-origin")]: varRef("icon-size-active"),
			[varName("icon-dot-size-custom")]: dotSize,
			[varName("item-icon-dot-bg-color-origin")]: varRef("item-icon-dot-bg-color"),
			[varName("item-icon-dot-bg-color-custom")]: dotBg,
			[varName("icon-size")]: varRef("icon-dot-size-custom", varRef("icon-dot-size-origin")),
			[`${itemCls}-icon`]: {
				[varName("dot-icon-border-width")]: dotBorderWidth,
				[varName("dot-icon-size")]: varRef("icon-size"),
				[varName("item-icon-dot-bg-color")]: varRef("item-icon-dot-bg-color-custom", varRef("item-icon-dot-bg-color-origin"))
			},
			[`${itemCls}-title`]: {
				fontSize,
				lineHeight
			},
			[`${itemCls}-content`]: { color: colorText },
			[`${itemCls}-rail`]: {
				[varName("item-solid-line-color")]: tailColor,
				[varName("rail-size")]: tailWidth
			}
		}
	}, {
		[itemCls]: { [varName("item-process-rail-line-style")]: "dotted" },
		[`${itemCls}${itemCls}${itemCls}-color`]: {
			"&-blue": { [varName("item-icon-dot-color")]: colorPrimary },
			"&-red": { [varName("item-icon-dot-color")]: colorError },
			"&-green": { [varName("item-icon-dot-color")]: colorSuccess },
			"&-gray": { [varName("item-icon-dot-color")]: colorTextDisabled }
		}
	}] };
};
var genVerticalStyle = (token) => {
	const { calc, componentCls, itemPaddingBottom, margin, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [, stepsVarRef] = genCssVar(antCls, "cmp-steps");
	const [timelineVarName, timelineVarRef] = genCssVar(antCls, "timeline");
	return { [`${componentCls}:not(${componentCls}-horizontal)`]: {
		[timelineVarName("head-span")]: "12",
		[timelineVarName("head-span-ptg")]: `calc(${timelineVarRef("head-span")} / 24 * 100%)`,
		[`&${componentCls}-layout-alternate`]: { [itemCls]: {
			[timelineVarName("alternate-gap")]: calc(margin).mul(2).add(stepsVarRef("dot-icon-size")).equal(),
			minHeight: "auto",
			paddingBottom: itemPaddingBottom,
			[`${itemCls}-icon, ${itemCls}-rail`]: {
				position: "absolute",
				insetInlineStart: timelineVarRef("head-span-ptg")
			},
			[`${itemCls}-icon`]: { marginInlineStart: `calc(${stepsVarRef("icon-size")} / -2)` },
			[`${itemCls}-section`]: {
				display: "flex",
				flexWrap: "nowrap",
				gap: timelineVarRef("alternate-gap")
			},
			[`${itemCls}-header`]: {
				textAlign: "end",
				flexDirection: "column",
				alignItems: "stretch",
				flex: `1 1 calc(${timelineVarRef("head-span-ptg")} - ${timelineVarRef("alternate-gap")} / 2)`
			},
			[`${itemCls}-content`]: {
				textAlign: "start",
				flex: `1 1 calc(100% - ${timelineVarRef("head-span-ptg")} - ${timelineVarRef("alternate-gap")} / 2)`
			},
			"&-placement-end": {
				[`${itemCls}-header`]: {
					textAlign: "start",
					order: 1
				},
				[`${itemCls}-content`]: { textAlign: "end" },
				[`${itemCls}-icon, ${itemCls}-rail`]: { insetInlineStart: `calc(100% - ${timelineVarRef("head-span-ptg")})` }
			}
		} },
		[`&:not(${componentCls}-layout-alternate)`]: { [`${itemCls}-placement-end`]: {
			textAlign: "end",
			[`${itemCls}-icon`]: { order: 1 },
			[`${itemCls}-rail`]: {
				insetInlineStart: "auto",
				insetInlineEnd: `calc(${stepsVarRef("icon-size")} / 2)`,
				marginInlineEnd: `calc(${stepsVarRef("rail-size")} / -2)`
			}
		} }
	} };
};
var prepareComponentToken$1 = (token) => ({
	tailColor: token.colorSplit,
	tailWidth: token.lineWidthBold,
	dotBorderWidth: token.lineWidthBold,
	dotBg: void 0,
	dotSize: void 0,
	itemPaddingBottom: token.padding * 1.25
});
var style_default$1 = genStyleHooks("Timeline", (token) => {
	const timeLineToken = merge$1(token, {
		itemHeadSize: 10,
		customHeadPaddingVertical: token.paddingXXS,
		paddingInlineEnd: 2
	});
	return [
		genTimelineStyle(timeLineToken),
		genVerticalStyle(timeLineToken),
		genHorizontalStyle(timeLineToken)
	];
}, prepareComponentToken$1);
//#endregion
//#region node_modules/antd/es/timeline/useItems.js
var useItems = (rootPrefixCls, prefixCls, mode, items, children, pending, pendingDot) => {
	const itemCls = `${prefixCls}-item`;
	const [varName] = genCssVar(rootPrefixCls, "cmp-steps");
	const parseItems = import_react.useMemo(() => {
		return Array.isArray(items) ? items : toArray$1(children).map((ele) => ({ ...ele.props }));
	}, [items, children]);
	return import_react.useMemo(() => {
		const mergedItems = parseItems.map((item, index) => {
			const { label, children, title, content, color, className, style, icon, dot, placement, position, loading, ...restProps } = item;
			let mergedStyle = style;
			let mergedClassName = className;
			if (color) if ([
				"blue",
				"red",
				"green",
				"gray"
			].includes(color)) mergedClassName = clsx(className, `${itemCls}-color-${color}`);
			else mergedStyle = {
				[varName("item-icon-dot-color")]: color,
				...style
			};
			const mergedPlacement = placement ?? position ?? (mode === "alternate" ? index % 2 === 0 ? "start" : "end" : mode);
			mergedClassName = clsx(mergedClassName, `${itemCls}-placement-${mergedPlacement}`);
			let mergedIcon = icon ?? dot;
			if (!mergedIcon && loading) mergedIcon = /* @__PURE__ */ import_react.createElement(RefIcon$5, null);
			return {
				...restProps,
				title: title ?? label,
				content: content ?? children,
				style: mergedStyle,
				className: mergedClassName,
				icon: mergedIcon,
				status: loading ? "process" : "finish"
			};
		});
		if (pending) mergedItems.push({
			icon: pendingDot ?? /* @__PURE__ */ import_react.createElement(RefIcon$5, null),
			content: pending,
			status: "process"
		});
		return mergedItems;
	}, [
		parseItems,
		pending,
		mode,
		itemCls,
		varName,
		pendingDot
	]);
};
//#endregion
//#region node_modules/antd/es/timeline/Timeline.js
var stepInternalContext = {
	rootComponent: "ol",
	itemComponent: "li"
};
var Timeline = (props) => {
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("timeline");
	const { prefixCls: customizePrefixCls, className, style, classNames, styles, variant = "outlined", mode, orientation = "vertical", titleSpan, items, children, reverse, pending, pendingDot, ...restProps } = props;
	const rootPrefixCls = getPrefixCls();
	const prefixCls = getPrefixCls("timeline", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$1(prefixCls);
	const [varName] = genCssVar(rootPrefixCls, "timeline");
	const stepsClassNames = import_react.useMemo(() => ({
		item: `${prefixCls}-item`,
		itemTitle: `${prefixCls}-item-title`,
		itemIcon: `${prefixCls}-item-icon`,
		itemContent: `${prefixCls}-item-content`,
		itemRail: `${prefixCls}-item-rail`,
		itemWrapper: `${prefixCls}-item-wrapper`,
		itemSection: `${prefixCls}-item-section`,
		itemHeader: `${prefixCls}-item-header`
	}), [prefixCls]);
	const mergedMode = import_react.useMemo(() => {
		if (mode === "left") return "start";
		if (mode === "right") return "end";
		return [
			"alternate",
			"start",
			"end"
		].includes(mode) ? mode : "start";
	}, [mode]);
	const rawItems = useItems(rootPrefixCls, prefixCls, mergedMode, items, children, pending, pendingDot);
	const mergedItems = import_react.useMemo(() => reverse ? _toConsumableArray(rawItems).reverse() : rawItems, [reverse, rawItems]);
	const mergedProps = {
		...props,
		variant,
		mode: mergedMode,
		orientation,
		items: mergedItems
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([
		stepsClassNames,
		contextClassNames,
		classNames
	], [contextStyles, styles], { props: mergedProps });
	const stepContext = import_react.useMemo(() => ({ railFollowPrevStatus: reverse }), [reverse]);
	const layoutAlternate = import_react.useMemo(() => mergedMode === "alternate" || orientation === "vertical" && mergedItems.some((item) => item.title), [
		mergedItems,
		mergedMode,
		orientation
	]);
	const stepStyle = {
		...contextStyle,
		...style
	};
	if (isNonNullable(titleSpan) && mergedMode !== "alternate") if (typeof titleSpan === "number" && !Number.isNaN(titleSpan)) stepStyle[varName("head-span")] = titleSpan;
	else stepStyle[varName("head-span-ptg")] = titleSpan;
	return /* @__PURE__ */ import_react.createElement(InternalContext.Provider, { value: stepInternalContext }, /* @__PURE__ */ import_react.createElement(UnstableContext.Provider, { value: stepContext }, /* @__PURE__ */ import_react.createElement(Steps, {
		...restProps,
		className: clsx(prefixCls, contextClassName, className, hashId, cssVarCls, {
			[`${prefixCls}-${orientation}`]: orientation === "horizontal",
			[`${prefixCls}-layout-alternate`]: layoutAlternate,
			[`${prefixCls}-rtl`]: direction === "rtl"
		}),
		style: stepStyle,
		classNames: mergedClassNames,
		styles: mergedStyles,
		variant,
		orientation,
		type: "dot",
		items: mergedItems,
		current: mergedItems.length - 1
	})));
};
Timeline.Item = () => {};
//#endregion
//#region node_modules/antd/es/timeline/index.js
var timeline_default = Timeline;
//#endregion
//#region node_modules/antd/es/upload/style/dragger.js
var genDraggerStyle = (token) => {
	const { componentCls, iconCls } = token;
	return { [`${componentCls}-wrapper`]: { [`${componentCls}-drag`]: {
		position: "relative",
		width: "100%",
		height: "100%",
		textAlign: "center",
		background: token.colorFillAlter,
		border: `${unit(token.lineWidth)} dashed ${token.colorBorder}`,
		borderRadius: token.borderRadiusLG,
		cursor: "pointer",
		transition: `border-color ${token.motionDurationSlow}`,
		[componentCls]: { padding: token.padding },
		[`${componentCls}-btn`]: {
			display: "table",
			width: "100%",
			height: "100%",
			outline: "none",
			borderRadius: token.borderRadiusLG,
			"&:focus-visible": { outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}` }
		},
		[`${componentCls}-drag-container`]: {
			display: "table-cell",
			verticalAlign: "middle"
		},
		[`
          &:not(${componentCls}-disabled):hover,
          &-hover:not(${componentCls}-disabled)
        `]: { borderColor: token.colorPrimaryHover },
		[`p${componentCls}-drag-icon`]: {
			marginBottom: token.margin,
			[iconCls]: {
				color: token.colorPrimary,
				fontSize: token.uploadThumbnailSize
			}
		},
		[`p${componentCls}-text`]: {
			margin: `0 0 ${unit(token.marginXXS)}`,
			color: token.colorTextHeading,
			fontSize: token.fontSizeLG
		},
		[`p${componentCls}-hint`]: {
			color: token.colorTextDescription,
			fontSize: token.fontSize
		},
		[`&${componentCls}-disabled`]: { [`p${componentCls}-drag-icon ${iconCls},
            p${componentCls}-text,
            p${componentCls}-hint
          `]: { color: token.colorTextDisabled } }
	} } };
};
//#endregion
//#region node_modules/antd/es/upload/style/list.js
var genListStyle = (token) => {
	const { componentCls, iconCls, fontSize, lineHeight, motionDurationSlow, calc } = token;
	const itemCls = `${componentCls}-list-item`;
	const actionsCls = `${itemCls}-actions`;
	const actionCls = `${itemCls}-action`;
	return { [`${componentCls}-wrapper`]: { [`${componentCls}-list`]: {
		...clearFix(),
		lineHeight: token.lineHeight,
		[itemCls]: {
			position: "relative",
			height: calc(token.lineHeight).mul(fontSize).equal(),
			marginTop: token.marginXS,
			fontSize,
			display: "flex",
			alignItems: "center",
			transition: `background-color ${motionDurationSlow}`,
			borderRadius: token.borderRadiusSM,
			"&:hover": { backgroundColor: token.controlItemBgHover },
			[`${itemCls}-name`]: {
				...textEllipsis,
				padding: `0 ${unit(token.paddingXS)}`,
				lineHeight,
				flex: "auto",
				transition: `all ${motionDurationSlow}`
			},
			[actionsCls]: {
				whiteSpace: "nowrap",
				[actionCls]: { opacity: 0 },
				"@media (hover: none), (pointer: coarse)": { [actionCls]: { opacity: 1 } },
				[iconCls]: {
					color: token.actionsColor,
					transition: `all ${motionDurationSlow}`
				},
				[`
              ${actionCls}:focus-visible,
              &.picture ${actionCls}
            `]: { opacity: 1 }
			},
			[`${componentCls}-icon ${iconCls}`]: {
				color: token.colorIcon,
				fontSize
			},
			[`${itemCls}-progress`]: {
				position: "absolute",
				bottom: token.calc(token.uploadProgressOffset).mul(-1).equal(),
				width: "100%",
				paddingInlineStart: calc(fontSize).add(token.paddingXS).equal(),
				fontSize,
				lineHeight: 0,
				pointerEvents: "none",
				"> div": { margin: 0 }
			}
		},
		[`${itemCls}:hover ${actionCls}`]: { opacity: 1 },
		[`${itemCls}-error`]: {
			color: token.colorError,
			[`${itemCls}-name, ${componentCls}-icon ${iconCls}`]: { color: token.colorError },
			[actionsCls]: {
				[`${iconCls}, ${iconCls}:hover`]: { color: token.colorError },
				[actionCls]: { opacity: 1 }
			}
		},
		[`${componentCls}-list-item-container`]: {
			transition: ["opacity", "height"].map((prop) => `${prop} ${motionDurationSlow}`).join(", "),
			"&::before": {
				display: "table",
				width: 0,
				height: 0,
				content: "\"\""
			}
		}
	} } };
};
//#endregion
//#region node_modules/antd/es/upload/style/motion.js
var genMotionStyle = (token) => {
	const { componentCls } = token;
	const uploadAnimateInlineIn = new Keyframe("uploadAnimateInlineIn", { from: {
		width: 0,
		height: 0,
		padding: 0,
		opacity: 0,
		margin: token.calc(token.marginXS).div(-2).equal()
	} });
	const uploadAnimateInlineOut = new Keyframe("uploadAnimateInlineOut", { to: {
		width: 0,
		height: 0,
		padding: 0,
		opacity: 0,
		margin: token.calc(token.marginXS).div(-2).equal()
	} });
	const inlineCls = `${componentCls}-animate-inline`;
	return [
		{ [`${componentCls}-wrapper`]: {
			[`${inlineCls}-appear, ${inlineCls}-enter, ${inlineCls}-leave`]: {
				animationDuration: token.motionDurationSlow,
				animationTimingFunction: token.motionEaseInOutCirc,
				animationFillMode: "forwards"
			},
			[`${inlineCls}-appear, ${inlineCls}-enter`]: { animationName: uploadAnimateInlineIn },
			[`${inlineCls}-leave`]: { animationName: uploadAnimateInlineOut }
		} },
		{ [`${componentCls}-wrapper`]: initFadeMotion(token) },
		uploadAnimateInlineIn,
		uploadAnimateInlineOut
	];
};
//#endregion
//#region node_modules/antd/es/upload/style/picture.js
var genPictureStyle = (token) => {
	const { componentCls, iconCls, uploadThumbnailSize, uploadProgressOffset, calc } = token;
	const listCls = `${componentCls}-list`;
	const itemCls = `${listCls}-item`;
	return { [`${componentCls}-wrapper`]: {
		[`
        ${listCls}${listCls}-picture,
        ${listCls}${listCls}-picture-card,
        ${listCls}${listCls}-picture-circle
      `]: {
			[itemCls]: {
				position: "relative",
				height: calc(uploadThumbnailSize).add(calc(token.lineWidth).mul(2)).add(calc(token.paddingXS).mul(2)).equal(),
				padding: token.paddingXS,
				border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
				borderRadius: token.borderRadiusLG,
				"&:hover": { background: "transparent" },
				[`${itemCls}-thumbnail`]: {
					...textEllipsis,
					width: uploadThumbnailSize,
					height: uploadThumbnailSize,
					lineHeight: unit(calc(uploadThumbnailSize).add(token.paddingSM).equal()),
					textAlign: "center",
					flex: "none",
					[iconCls]: {
						fontSize: token.fontSizeHeading2,
						color: token.colorPrimary
					},
					img: {
						display: "block",
						width: "100%",
						height: "100%",
						overflow: "hidden"
					}
				},
				[`${itemCls}-progress`]: {
					bottom: calc(token.fontSize).mul(token.lineHeight).div(2).add(uploadProgressOffset).equal(),
					width: `calc(100% - ${unit(calc(token.paddingSM).mul(2).equal())})`,
					marginTop: 0,
					paddingInlineStart: calc(uploadThumbnailSize).add(token.paddingXS).equal()
				}
			},
			[`${itemCls}-error`]: {
				borderColor: token.colorError,
				[`${itemCls}-thumbnail ${iconCls}`]: {
					[`svg path[fill='${blue[0]}']`]: { fill: token.colorErrorBg },
					[`svg path[fill='${blue.primary}']`]: { fill: token.colorError }
				}
			},
			[`${itemCls}-uploading`]: {
				borderStyle: "dashed",
				[`${itemCls}-name`]: { marginBottom: uploadProgressOffset }
			}
		},
		[`${listCls}${listCls}-picture-circle ${itemCls}`]: { [`&, &::before, ${itemCls}-thumbnail`]: { borderRadius: "50%" } }
	} };
};
var genPictureCardStyle = (token) => {
	const { componentCls, iconCls, fontSizeLG, colorTextLightSolid, calc } = token;
	const listCls = `${componentCls}-list`;
	const itemCls = `${listCls}-item`;
	const uploadPictureCardSize = token.uploadPicCardSize;
	return {
		[`
      ${componentCls}-wrapper${componentCls}-picture-card-wrapper,
      ${componentCls}-wrapper${componentCls}-picture-circle-wrapper
    `]: {
			...clearFix(),
			display: "block",
			[`${componentCls}${componentCls}-select`]: {
				width: uploadPictureCardSize,
				height: uploadPictureCardSize,
				textAlign: "center",
				verticalAlign: "top",
				backgroundColor: token.colorFillAlter,
				border: `${unit(token.lineWidth)} dashed ${token.colorBorder}`,
				borderRadius: token.borderRadiusLG,
				cursor: "pointer",
				transition: `border-color ${token.motionDurationSlow}`,
				[`> ${componentCls}`]: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					textAlign: "center"
				},
				[`&:not(${componentCls}-disabled):hover`]: { borderColor: token.colorPrimary }
			},
			[`${listCls}${listCls}-picture-card, ${listCls}${listCls}-picture-circle`]: {
				display: "flex",
				flexWrap: "wrap",
				"&:not(:empty)": { minHeight: uploadPictureCardSize },
				"@supports not (gap: 1px)": { "& > *": {
					marginBlockEnd: token.marginXS,
					marginInlineEnd: token.marginXS
				} },
				"@supports (gap: 1px)": { gap: token.marginXS },
				[`${listCls}-item-container`]: {
					display: "inline-block",
					width: uploadPictureCardSize,
					height: uploadPictureCardSize,
					verticalAlign: "top"
				},
				"&::after": { display: "none" },
				"&::before": { display: "none" },
				[itemCls]: {
					height: "100%",
					margin: 0,
					"&::before": {
						position: "absolute",
						zIndex: 1,
						width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
						height: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
						backgroundColor: token.colorBgMask,
						opacity: 0,
						transition: `all ${token.motionDurationSlow}`,
						content: "\" \""
					}
				},
				[`${itemCls}:hover`]: { [`&::before, ${itemCls}-actions`]: { opacity: 1 } },
				[`${itemCls}-actions`]: {
					position: "absolute",
					insetInlineStart: 0,
					zIndex: 10,
					width: "100%",
					whiteSpace: "nowrap",
					textAlign: "center",
					opacity: 0,
					transition: `all ${token.motionDurationSlow}`,
					[`
            ${iconCls}-eye,
            ${iconCls}-download,
            ${iconCls}-delete
          `]: {
						zIndex: 10,
						width: fontSizeLG,
						margin: `0 ${unit(token.marginXXS)}`,
						fontSize: fontSizeLG,
						cursor: "pointer",
						transition: `all ${token.motionDurationSlow}`,
						color: colorTextLightSolid,
						"&:hover": { color: colorTextLightSolid },
						svg: { verticalAlign: "baseline" }
					}
				},
				[`${itemCls}-thumbnail, ${itemCls}-thumbnail img`]: {
					position: "static",
					display: "block",
					width: "100%",
					height: "100%",
					objectFit: "contain"
				},
				[`${itemCls}-name`]: {
					display: "none",
					textAlign: "center"
				},
				[`${itemCls}-file + ${itemCls}-name`]: {
					position: "absolute",
					bottom: token.margin,
					display: "block",
					width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`
				},
				[`${itemCls}-uploading`]: {
					[`&${itemCls}`]: { backgroundColor: token.colorFillAlter },
					[`&::before, ${iconCls}-eye, ${iconCls}-download, ${iconCls}-delete`]: { display: "none" }
				},
				[`${itemCls}-progress`]: {
					bottom: token.marginXL,
					width: `calc(100% - ${unit(calc(token.paddingXS).mul(2).equal())})`,
					paddingInlineStart: 0
				}
			}
		},
		[`${componentCls}-wrapper${componentCls}-picture-circle-wrapper`]: { [`${componentCls}${componentCls}-select`]: { borderRadius: "50%" } }
	};
};
//#endregion
//#region node_modules/antd/es/upload/style/rtl.js
var genRtlStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-rtl`]: { direction: "rtl" } };
};
//#endregion
//#region node_modules/antd/es/upload/style/index.js
var genBaseStyle = (token) => {
	const { componentCls, colorTextDisabled } = token;
	return { [`${componentCls}-wrapper`]: {
		...resetComponent(token),
		[componentCls]: {
			outline: 0,
			"input[type='file']": { cursor: "pointer" }
		},
		[`${componentCls}-select`]: { display: "inline-block" },
		[`${componentCls}-hidden`]: { display: "none" },
		[`${componentCls}-disabled`]: {
			color: colorTextDisabled,
			cursor: "not-allowed"
		}
	} };
};
var prepareComponentToken = (token) => ({
	actionsColor: token.colorIcon,
	pictureCardSize: token.controlHeightLG * 2.55
});
var style_default = genStyleHooks("Upload", (token) => {
	const { fontSizeHeading3, marginXS, lineWidth, pictureCardSize, calc } = token;
	const uploadToken = merge$1(token, {
		uploadThumbnailSize: calc(fontSizeHeading3).mul(2).equal(),
		uploadProgressOffset: calc(calc(marginXS).div(2)).add(lineWidth).equal(),
		uploadPicCardSize: pictureCardSize
	});
	return [
		genBaseStyle(uploadToken),
		genDraggerStyle(uploadToken),
		genPictureStyle(uploadToken),
		genPictureCardStyle(uploadToken),
		genListStyle(uploadToken),
		genMotionStyle(uploadToken),
		genRtlStyle(uploadToken),
		genCollapseMotion(uploadToken)
	];
}, prepareComponentToken);
//#endregion
//#region node_modules/antd/es/upload/utils.js
function file2Obj(file) {
	return {
		...file,
		lastModified: file.lastModified,
		lastModifiedDate: file.lastModifiedDate,
		name: file.name,
		size: file.size,
		type: file.type,
		uid: file.uid,
		percent: 0,
		originFileObj: file
	};
}
/** Upload fileList. Replace file if exist or just push into it. */
function updateFileList(file, fileList) {
	const nextFileList = _toConsumableArray(fileList);
	const fileIndex = nextFileList.findIndex(({ uid }) => uid === file.uid);
	if (fileIndex === -1) nextFileList.push(file);
	else nextFileList[fileIndex] = file;
	return nextFileList;
}
function getFileItem(file, fileList) {
	const matchKey = file.uid !== void 0 ? "uid" : "name";
	return fileList.filter((item) => item[matchKey] === file[matchKey])[0];
}
function removeFileItem(file, fileList) {
	const matchKey = file.uid !== void 0 ? "uid" : "name";
	const removed = fileList.filter((item) => item[matchKey] !== file[matchKey]);
	if (removed.length === fileList.length) return null;
	return removed;
}
var extname = (url = "") => {
	const temp = url.split("/");
	const filenameWithoutSuffix = temp[temp.length - 1].split(/#|\?/)[0];
	return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [""])[0];
};
var isImageFileType = (type) => type.indexOf("image/") === 0;
var isImageUrl = (file) => {
	if (file.type && !file.thumbUrl) return isImageFileType(file.type);
	const url = file.thumbUrl || file.url || "";
	const extension = extname(url);
	if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico|heic|heif)$/i.test(extension)) return true;
	if (/^data:/.test(url)) return false;
	if (extension) return false;
	return true;
};
var MEASURE_SIZE = 200;
function previewImage(file) {
	return new Promise((resolve) => {
		if (!file.type || !isImageFileType(file.type)) {
			resolve("");
			return;
		}
		const canvas = document.createElement("canvas");
		canvas.width = MEASURE_SIZE;
		canvas.height = MEASURE_SIZE;
		canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
		document.body.appendChild(canvas);
		const ctx = canvas.getContext("2d");
		const img = new Image();
		img.onload = () => {
			const { width, height } = img;
			let drawWidth = MEASURE_SIZE;
			let drawHeight = MEASURE_SIZE;
			let offsetX = 0;
			let offsetY = 0;
			if (width > height) {
				drawHeight = height * (MEASURE_SIZE / width);
				offsetY = -(drawHeight - drawWidth) / 2;
			} else {
				drawWidth = width * (MEASURE_SIZE / height);
				offsetX = -(drawWidth - drawHeight) / 2;
			}
			ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
			const dataURL = canvas.toDataURL();
			document.body.removeChild(canvas);
			window.URL.revokeObjectURL(img.src);
			resolve(dataURL);
		};
		img.crossOrigin = "anonymous";
		if (file.type.startsWith("image/svg+xml")) {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result && typeof reader.result === "string") img.src = reader.result;
			};
			reader.readAsDataURL(file);
		} else if (file.type.startsWith("image/gif")) {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) resolve(reader.result);
			};
			reader.readAsDataURL(file);
		} else img.src = window.URL.createObjectURL(file);
	});
}
//#endregion
//#region node_modules/antd/es/upload/UploadList/ListItem.js
var ListItem = /* @__PURE__ */ import_react.forwardRef(({ prefixCls, className, style, classNames: itemClassNames, styles, locale, listType, file, items, progress: progressProps, iconRender, actionIconRender, itemRender, isImgUrl, showPreviewIcon, showRemoveIcon, showDownloadIcon, previewIcon: customPreviewIcon, removeIcon: customRemoveIcon, downloadIcon: customDownloadIcon, extra: customExtra, onPreview, onDownload, onClose }, ref) => {
	const { status } = file;
	const [mergedStatus, setMergedStatus] = import_react.useState(status);
	import_react.useEffect(() => {
		if (status !== "removed") setMergedStatus(status);
	}, [status]);
	const [showProgress, setShowProgress] = import_react.useState(false);
	import_react.useEffect(() => {
		const timer = setTimeout(() => {
			setShowProgress(true);
		}, 300);
		return () => {
			clearTimeout(timer);
		};
	}, []);
	const iconNode = iconRender(file);
	let icon = /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-icon` }, iconNode);
	if (listType === "picture" || listType === "picture-card" || listType === "picture-circle") if (mergedStatus === "uploading" || !file.thumbUrl && !file.url) {
		const uploadingClassName = clsx(`${prefixCls}-list-item-thumbnail`, { [`${prefixCls}-list-item-file`]: mergedStatus !== "uploading" });
		icon = /* @__PURE__ */ import_react.createElement("div", { className: uploadingClassName }, iconNode);
	} else {
		const thumbnail = isImgUrl?.(file) ? /* @__PURE__ */ import_react.createElement("img", {
			src: file.thumbUrl || file.url,
			alt: file.name,
			className: `${prefixCls}-list-item-image`,
			crossOrigin: file.crossOrigin
		}) : iconNode;
		const aClassName = clsx(`${prefixCls}-list-item-thumbnail`, { [`${prefixCls}-list-item-file`]: isImgUrl && !isImgUrl(file) });
		icon = /* @__PURE__ */ import_react.createElement("a", {
			className: aClassName,
			onClick: (e) => onPreview(file, e),
			href: file.url || file.thumbUrl,
			target: "_blank",
			rel: "noopener noreferrer"
		}, thumbnail);
	}
	const listItemClassName = clsx(`${prefixCls}-list-item`, `${prefixCls}-list-item-${mergedStatus}`, itemClassNames?.item);
	const linkProps = typeof file.linkProps === "string" ? JSON.parse(file.linkProps) : file.linkProps;
	const removeIcon = (typeof showRemoveIcon === "function" ? showRemoveIcon(file) : showRemoveIcon) ? actionIconRender((typeof customRemoveIcon === "function" ? customRemoveIcon(file) : customRemoveIcon) || /* @__PURE__ */ import_react.createElement(RefIcon$23, null), () => onClose(file), prefixCls, locale.removeFile, true) : null;
	const downloadIcon = (typeof showDownloadIcon === "function" ? showDownloadIcon(file) : showDownloadIcon) && mergedStatus === "done" ? actionIconRender((typeof customDownloadIcon === "function" ? customDownloadIcon(file) : customDownloadIcon) || /* @__PURE__ */ import_react.createElement(RefIcon$24, null), () => onDownload(file), prefixCls, locale.downloadFile) : null;
	const downloadOrDelete = listType !== "picture-card" && listType !== "picture-circle" && /* @__PURE__ */ import_react.createElement("span", {
		key: "download-delete",
		className: clsx(`${prefixCls}-list-item-actions`, { picture: listType === "picture" })
	}, downloadIcon, removeIcon);
	const extraContent = typeof customExtra === "function" ? customExtra(file) : customExtra;
	const extra = extraContent && /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-list-item-extra` }, extraContent);
	const listItemNameClass = clsx(`${prefixCls}-list-item-name`);
	const fileName = file.url ? /* @__PURE__ */ import_react.createElement("a", {
		key: "view",
		target: "_blank",
		rel: "noopener noreferrer",
		className: listItemNameClass,
		title: file.name,
		...linkProps,
		href: file.url,
		onClick: (e) => onPreview(file, e)
	}, file.name, extra) : /* @__PURE__ */ import_react.createElement("span", {
		key: "view",
		className: listItemNameClass,
		onClick: (e) => onPreview(file, e),
		title: file.name
	}, file.name, extra);
	const previewIcon = (typeof showPreviewIcon === "function" ? showPreviewIcon(file) : showPreviewIcon) && (file.url || file.thumbUrl) ? /* @__PURE__ */ import_react.createElement("a", {
		href: file.url || file.thumbUrl,
		target: "_blank",
		rel: "noopener noreferrer",
		onClick: (e) => onPreview(file, e),
		title: locale.previewFile
	}, typeof customPreviewIcon === "function" ? customPreviewIcon(file) : customPreviewIcon || /* @__PURE__ */ import_react.createElement(RefIcon$17, null)) : null;
	const pictureCardActions = (listType === "picture-card" || listType === "picture-circle") && mergedStatus !== "uploading" && /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-list-item-actions` }, previewIcon, mergedStatus === "done" && downloadIcon, removeIcon);
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const rootPrefixCls = getPrefixCls();
	const dom = /* @__PURE__ */ import_react.createElement("div", {
		className: listItemClassName,
		style: styles?.item
	}, icon, fileName, downloadOrDelete, pictureCardActions, showProgress && /* @__PURE__ */ import_react.createElement(es_default, {
		motionName: `${rootPrefixCls}-fade`,
		visible: mergedStatus === "uploading",
		motionDeadline: 2e3
	}, ({ className: motionClassName }) => {
		const loadingProgress = "percent" in file ? /* @__PURE__ */ import_react.createElement(progress_default, {
			type: "line",
			percent: file.percent,
			"aria-label": file["aria-label"],
			"aria-labelledby": file["aria-labelledby"],
			...progressProps
		}) : null;
		return /* @__PURE__ */ import_react.createElement("div", { className: clsx(`${prefixCls}-list-item-progress`, motionClassName) }, loadingProgress);
	}));
	const message = file.response && typeof file.response === "string" ? file.response : file.error?.statusText || file.error?.message || locale.uploadError;
	const item = mergedStatus === "error" ? /* @__PURE__ */ import_react.createElement(Tooltip, {
		title: message,
		getPopupContainer: (node) => node.parentNode
	}, dom) : dom;
	return /* @__PURE__ */ import_react.createElement("div", {
		className: clsx(`${prefixCls}-list-item-container`, className),
		style,
		ref
	}, itemRender ? itemRender(item, file, items, {
		download: onDownload.bind(null, file),
		preview: onPreview.bind(null, file),
		remove: onClose.bind(null, file)
	}) : item);
});
//#endregion
//#region node_modules/antd/es/upload/UploadList/index.js
var InternalUploadList = (props, ref) => {
	const { listType = "text", previewFile = previewImage, onPreview, onDownload, onRemove, locale, iconRender, isImageUrl: isImgUrl = isImageUrl, prefixCls: customizePrefixCls, items = [], showPreviewIcon = true, showRemoveIcon = true, showDownloadIcon = false, removeIcon, previewIcon, downloadIcon, extra, progress = {
		size: [-1, 2],
		showInfo: false
	}, appendAction, appendActionVisible = true, itemRender, disabled, classNames: uploadListClassNames, styles } = props;
	const [, forceUpdate] = useForceUpdate();
	const [motionAppear, setMotionAppear] = import_react.useState(false);
	const isPictureCardOrCirle = ["picture-card", "picture-circle"].includes(listType);
	import_react.useEffect(() => {
		if (!listType.startsWith("picture")) return;
		(items || []).forEach((file) => {
			if (!(file.originFileObj instanceof File || file.originFileObj instanceof Blob) || file.thumbUrl !== void 0) return;
			file.thumbUrl = "";
			previewFile?.(file.originFileObj).then((previewDataUrl) => {
				file.thumbUrl = previewDataUrl || "";
				forceUpdate();
			});
		});
	}, [
		listType,
		items,
		previewFile
	]);
	import_react.useEffect(() => {
		setMotionAppear(true);
	}, []);
	const onInternalPreview = (file, e) => {
		if (!onPreview) return;
		e?.preventDefault();
		return onPreview(file);
	};
	const onInternalDownload = (file) => {
		if (typeof onDownload === "function") onDownload(file);
		else if (file.url) window.open(file.url);
	};
	const onInternalClose = (file) => {
		onRemove?.(file);
	};
	const internalIconRender = (file) => {
		if (iconRender) return iconRender(file, listType);
		const isLoading = file.status === "uploading";
		if (listType.startsWith("picture")) {
			const loadingIcon = listType === "picture" ? /* @__PURE__ */ import_react.createElement(RefIcon$5, null) : locale.uploading;
			const fileIcon = isImgUrl?.(file) ? /* @__PURE__ */ import_react.createElement(RefIcon$25, null) : /* @__PURE__ */ import_react.createElement(RefIcon$26, null);
			return isLoading ? loadingIcon : fileIcon;
		}
		return isLoading ? /* @__PURE__ */ import_react.createElement(RefIcon$5, null) : /* @__PURE__ */ import_react.createElement(RefIcon$27, null);
	};
	const actionIconRender = (customIcon, callback, prefixCls, title, acceptUploadDisabled) => {
		const btnProps = {
			type: "text",
			size: "small",
			title,
			onClick: (e) => {
				callback();
				if (/* @__PURE__ */ import_react.isValidElement(customIcon)) customIcon.props.onClick?.(e);
			},
			className: `${prefixCls}-list-item-action`,
			disabled: acceptUploadDisabled ? disabled : false
		};
		return /* @__PURE__ */ import_react.isValidElement(customIcon) ? /* @__PURE__ */ import_react.createElement(Button, {
			...btnProps,
			icon: cloneElement(customIcon, {
				...customIcon.props,
				onClick: () => {}
			})
		}) : /* @__PURE__ */ import_react.createElement(Button, { ...btnProps }, /* @__PURE__ */ import_react.createElement("span", null, customIcon));
	};
	import_react.useImperativeHandle(ref, () => ({
		handlePreview: onInternalPreview,
		handleDownload: onInternalDownload
	}));
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("upload", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const listClassNames = clsx(`${prefixCls}-list`, `${prefixCls}-list-${listType}`, uploadListClassNames?.list);
	const listItemMotion = import_react.useMemo(() => omit(initCollapseMotion(rootPrefixCls), [
		"onAppearEnd",
		"onEnterEnd",
		"onLeaveEnd"
	]), [rootPrefixCls]);
	const motionConfig = {
		...isPictureCardOrCirle ? {} : listItemMotion,
		motionDeadline: 2e3,
		motionName: `${prefixCls}-${isPictureCardOrCirle ? "animate-inline" : "animate"}`,
		keys: _toConsumableArray(items.map((file) => ({
			key: file.uid,
			file
		}))),
		motionAppear
	};
	return /* @__PURE__ */ import_react.createElement("div", {
		className: listClassNames,
		style: styles?.list
	}, /* @__PURE__ */ import_react.createElement(CSSMotionList_default, {
		...motionConfig,
		component: false
	}, ({ key, file, className: motionClassName, style: motionStyle }) => /* @__PURE__ */ import_react.createElement(ListItem, {
		key,
		locale,
		prefixCls,
		className: motionClassName,
		style: motionStyle,
		classNames: uploadListClassNames,
		styles,
		file,
		items,
		progress,
		listType,
		isImgUrl,
		showPreviewIcon,
		showRemoveIcon,
		showDownloadIcon,
		removeIcon,
		previewIcon,
		downloadIcon,
		extra,
		iconRender: internalIconRender,
		actionIconRender,
		itemRender,
		onPreview: onInternalPreview,
		onDownload: onInternalDownload,
		onClose: onInternalClose
	})), appendAction && /* @__PURE__ */ import_react.createElement(es_default, {
		...motionConfig,
		visible: appendActionVisible,
		forceRender: true
	}, ({ className: motionClassName, style: motionStyle }) => cloneElement(appendAction, (oriProps) => ({
		className: clsx(oriProps.className, motionClassName),
		style: {
			...motionStyle,
			pointerEvents: motionClassName ? "none" : void 0,
			...oriProps.style
		}
	}))));
};
var UploadList = /* @__PURE__ */ import_react.forwardRef(InternalUploadList);
//#endregion
//#region node_modules/antd/es/upload/Upload.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`;
var InternalUpload = (props, ref) => {
	const config = useComponentConfig("upload");
	const { fileList, defaultFileList, onRemove, showUploadList = true, listType = "text", onPreview, onDownload, onChange, onDrop, previewFile, disabled: customDisabled, locale: propLocale, iconRender, isImageUrl, progress, prefixCls: customizePrefixCls, className, type = "select", children, style, itemRender, maxCount, data = {}, multiple = false, hasControlInside = true, action = "", accept = "", supportServerRender = true, rootClassName, styles, classNames } = props;
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const customRequest = props.customRequest || config.customRequest;
	const [internalFileList, setMergedFileList] = useControlledState(defaultFileList, fileList);
	const mergedFileList = internalFileList || [];
	const [dragState, setDragState] = import_react.useState("drop");
	const uploadRef = import_react.useRef(null);
	const wrapRef = import_react.useRef(null);
	import_react.useMemo(() => {
		const timestamp = Date.now();
		(fileList || []).forEach((file, index) => {
			if (!file.uid && !Object.isFrozen(file)) file.uid = `__AUTO__${timestamp}_${index}__`;
		});
	}, [fileList]);
	const onInternalChange = (file, changedFileList, event) => {
		let cloneList = _toConsumableArray(changedFileList);
		let exceedMaxCount = false;
		if (maxCount === 1) cloneList = cloneList.slice(-1);
		else if (maxCount) {
			exceedMaxCount = cloneList.length > maxCount;
			cloneList = cloneList.slice(0, maxCount);
		}
		(0, import_react_dom.flushSync)(() => {
			setMergedFileList(cloneList);
		});
		const changeInfo = {
			file,
			fileList: cloneList
		};
		if (event) changeInfo.event = event;
		if (!exceedMaxCount || file.status === "removed" || cloneList.some((f) => f.uid === file.uid)) (0, import_react_dom.flushSync)(() => {
			onChange?.(changeInfo);
		});
	};
	const mergedBeforeUpload = async (file, fileListArgs) => {
		const { beforeUpload } = props;
		let parsedFile = file;
		if (beforeUpload) {
			const result = await beforeUpload(file, fileListArgs);
			if (result === false) return false;
			delete file[LIST_IGNORE];
			if (result === LIST_IGNORE) {
				Object.defineProperty(file, LIST_IGNORE, {
					value: true,
					configurable: true
				});
				return false;
			}
			if (typeof result === "object" && result) parsedFile = result;
		}
		return parsedFile;
	};
	const onBatchStart = (batchFileInfoList) => {
		const filteredFileInfoList = batchFileInfoList.filter((info) => !info.file[LIST_IGNORE]);
		if (!filteredFileInfoList.length) return;
		const objectFileList = filteredFileInfoList.map((info) => file2Obj(info.file));
		let newFileList = _toConsumableArray(mergedFileList);
		objectFileList.forEach((fileObj) => {
			newFileList = updateFileList(fileObj, newFileList);
		});
		objectFileList.forEach((fileObj, index) => {
			let triggerFileObj = fileObj;
			if (!filteredFileInfoList[index].parsedFile) {
				const { originFileObj } = fileObj;
				let clone;
				try {
					clone = new File([originFileObj], originFileObj.name, { type: originFileObj.type });
				} catch {
					clone = new Blob([originFileObj], { type: originFileObj.type });
					clone.name = originFileObj.name;
					clone.lastModifiedDate = /* @__PURE__ */ new Date();
					clone.lastModified = (/* @__PURE__ */ new Date()).getTime();
				}
				clone.uid = fileObj.uid;
				triggerFileObj = clone;
			} else fileObj.status = "uploading";
			onInternalChange(triggerFileObj, newFileList);
		});
	};
	const onSuccess = (response, file, xhr) => {
		try {
			if (typeof response === "string") response = JSON.parse(response);
		} catch {}
		if (!getFileItem(file, mergedFileList)) return;
		const targetItem = file2Obj(file);
		targetItem.status = "done";
		targetItem.percent = 100;
		targetItem.response = response;
		targetItem.xhr = xhr;
		onInternalChange(targetItem, updateFileList(targetItem, mergedFileList));
	};
	const onProgress = (e, file) => {
		if (!getFileItem(file, mergedFileList)) return;
		const targetItem = file2Obj(file);
		targetItem.status = "uploading";
		targetItem.percent = e.percent;
		onInternalChange(targetItem, updateFileList(targetItem, mergedFileList), e);
	};
	const onError = (error, response, file) => {
		if (!getFileItem(file, mergedFileList)) return;
		const targetItem = file2Obj(file);
		targetItem.error = error;
		targetItem.response = response;
		targetItem.status = "error";
		onInternalChange(targetItem, updateFileList(targetItem, mergedFileList));
	};
	const handleRemove = (file) => {
		let currentFile;
		Promise.resolve(typeof onRemove === "function" ? onRemove(file) : onRemove).then((ret) => {
			if (ret === false) return;
			const removedFileList = removeFileItem(file, mergedFileList);
			if (removedFileList) {
				currentFile = {
					...file,
					status: "removed"
				};
				mergedFileList?.forEach((item) => {
					const matchKey = currentFile.uid !== void 0 ? "uid" : "name";
					if (item[matchKey] === currentFile[matchKey] && !Object.isFrozen(item)) item.status = "removed";
				});
				uploadRef.current?.abort(currentFile);
				onInternalChange(currentFile, removedFileList);
			}
		});
	};
	const onFileDrop = (e) => {
		setDragState(e.type);
		if (e.type === "drop") onDrop?.(e);
	};
	import_react.useImperativeHandle(ref, () => ({
		onBatchStart,
		onSuccess,
		onProgress,
		onError,
		fileList: mergedFileList,
		upload: uploadRef.current,
		nativeElement: wrapRef.current
	}));
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("upload");
	const prefixCls = getPrefixCls("upload", customizePrefixCls);
	const mergedProps = {
		...props,
		listType,
		showUploadList,
		type,
		multiple,
		hasControlInside,
		supportServerRender,
		disabled: mergedDisabled
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });
	const rcUploadProps = {
		onBatchStart,
		onError,
		onProgress,
		onSuccess,
		...props,
		customRequest,
		data,
		multiple,
		action,
		accept,
		supportServerRender,
		prefixCls,
		disabled: mergedDisabled,
		beforeUpload: mergedBeforeUpload,
		onChange: void 0,
		hasControlInside
	};
	delete rcUploadProps.className;
	delete rcUploadProps.style;
	if (!children || mergedDisabled) delete rcUploadProps.id;
	const wrapperCls = `${prefixCls}-wrapper`;
	const [hashId, cssVarCls] = style_default(prefixCls, wrapperCls);
	const [contextLocale] = useLocale("Upload", localeValues.Upload);
	const { showRemoveIcon, showPreviewIcon, showDownloadIcon, removeIcon, previewIcon, downloadIcon, extra } = typeof showUploadList === "boolean" ? {} : showUploadList;
	const realShowRemoveIcon = typeof showRemoveIcon === "undefined" ? !mergedDisabled : showRemoveIcon;
	const renderUploadList = (button, buttonVisible) => {
		if (!showUploadList) return button;
		return /* @__PURE__ */ import_react.createElement(UploadList, {
			classNames: mergedClassNames,
			styles: mergedStyles,
			prefixCls,
			listType,
			items: mergedFileList,
			previewFile,
			onPreview,
			onDownload,
			onRemove: handleRemove,
			showRemoveIcon: realShowRemoveIcon,
			showPreviewIcon,
			showDownloadIcon,
			removeIcon,
			previewIcon,
			downloadIcon,
			iconRender,
			extra,
			locale: {
				...contextLocale,
				...propLocale
			},
			isImageUrl,
			progress,
			appendAction: button,
			appendActionVisible: buttonVisible,
			itemRender,
			disabled: mergedDisabled
		});
	};
	const mergedRootCls = clsx(wrapperCls, className, rootClassName, hashId, cssVarCls, contextClassName, mergedClassNames.root, {
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-picture-card-wrapper`]: listType === "picture-card",
		[`${prefixCls}-picture-circle-wrapper`]: listType === "picture-circle"
	});
	const mergedRootStyle = { ...mergedStyles.root };
	const mergedStyle = {
		...contextStyle,
		...style
	};
	if (type === "drag") {
		const dragCls = clsx(hashId, prefixCls, `${prefixCls}-drag`, {
			[`${prefixCls}-drag-uploading`]: mergedFileList.some((file) => file.status === "uploading"),
			[`${prefixCls}-drag-hover`]: dragState === "dragover",
			[`${prefixCls}-disabled`]: mergedDisabled,
			[`${prefixCls}-rtl`]: direction === "rtl"
		}, mergedClassNames.trigger);
		return /* @__PURE__ */ import_react.createElement("span", {
			className: mergedRootCls,
			ref: wrapRef,
			style: mergedRootStyle
		}, /* @__PURE__ */ import_react.createElement("div", {
			className: dragCls,
			style: {
				...mergedStyle,
				...mergedStyles.trigger
			},
			onDrop: onFileDrop,
			onDragOver: onFileDrop,
			onDragLeave: onFileDrop
		}, /* @__PURE__ */ import_react.createElement(es_default$12, {
			...rcUploadProps,
			ref: uploadRef,
			className: `${prefixCls}-btn`
		}, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-drag-container` }, children))), renderUploadList());
	}
	const uploadBtnCls = clsx(prefixCls, `${prefixCls}-select`, {
		[`${prefixCls}-disabled`]: mergedDisabled,
		[`${prefixCls}-hidden`]: !children
	}, mergedClassNames.trigger);
	const uploadButton = /* @__PURE__ */ import_react.createElement("div", {
		className: uploadBtnCls,
		style: {
			...mergedStyle,
			...mergedStyles.trigger
		}
	}, /* @__PURE__ */ import_react.createElement(es_default$12, {
		...rcUploadProps,
		ref: uploadRef
	}));
	if (listType === "picture-card" || listType === "picture-circle") return /* @__PURE__ */ import_react.createElement("span", {
		className: mergedRootCls,
		ref: wrapRef,
		style: mergedRootStyle
	}, renderUploadList(uploadButton, !!children));
	return /* @__PURE__ */ import_react.createElement("span", {
		className: mergedRootCls,
		ref: wrapRef,
		style: mergedRootStyle
	}, uploadButton, renderUploadList());
};
var Upload$1 = /* @__PURE__ */ import_react.forwardRef(InternalUpload);
//#endregion
//#region node_modules/antd/es/upload/Dragger.js
var Dragger = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { style, height, hasControlInside = false, children, ...restProps } = props;
	const mergedStyle = {
		...style,
		height
	};
	return /* @__PURE__ */ import_react.createElement(Upload$1, {
		ref,
		hasControlInside,
		...restProps,
		style: mergedStyle,
		type: "drag"
	}, children);
});
//#endregion
//#region node_modules/antd/es/upload/index.js
var Upload = Upload$1;
Upload.Dragger = Dragger;
Upload.LIST_IGNORE = LIST_IGNORE;
//#endregion
//#region node_modules/antd/lib/time-picker/locale/zh_CN.js
var require_zh_CN$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.default = {
		placeholder: "请选择时间",
		rangePlaceholder: ["开始时间", "结束时间"]
	};
}));
//#endregion
//#region node_modules/antd/lib/date-picker/locale/zh_CN.js
var require_zh_CN$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _zh_CN = _interopRequireDefault(require_zh_CN$5());
	var _zh_CN2 = _interopRequireDefault(require_zh_CN$4());
	var locale = {
		lang: {
			placeholder: "请选择日期",
			yearPlaceholder: "请选择年份",
			quarterPlaceholder: "请选择季度",
			monthPlaceholder: "请选择月份",
			weekPlaceholder: "请选择周",
			rangePlaceholder: ["开始日期", "结束日期"],
			rangeYearPlaceholder: ["开始年份", "结束年份"],
			rangeMonthPlaceholder: ["开始月份", "结束月份"],
			rangeQuarterPlaceholder: ["开始季度", "结束季度"],
			rangeWeekPlaceholder: ["开始周", "结束周"],
			..._zh_CN.default
		},
		timePickerLocale: { ..._zh_CN2.default }
	};
	locale.lang.ok = "确定";
	exports.default = locale;
}));
//#endregion
//#region node_modules/antd/lib/calendar/locale/zh_CN.js
var require_zh_CN$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.default = _interopRequireDefault(require_zh_CN$3()).default;
}));
//#endregion
//#region node_modules/antd/lib/locale/zh_CN.js
var require_zh_CN$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _zh_CN = _interopRequireDefault(require_zh_CN$6());
	var _zh_CN2 = _interopRequireDefault(require_zh_CN$2());
	var _zh_CN3 = _interopRequireDefault(require_zh_CN$3());
	var _zh_CN4 = _interopRequireDefault(require_zh_CN$4());
	var typeTemplate = "${label}不是一个有效的${type}";
	exports.default = {
		locale: "zh-cn",
		Pagination: _zh_CN.default,
		DatePicker: _zh_CN3.default,
		TimePicker: _zh_CN4.default,
		Calendar: _zh_CN2.default,
		global: {
			placeholder: "请选择",
			close: "关闭",
			sortable: "可排序"
		},
		Table: {
			filterTitle: "筛选",
			filterConfirm: "确定",
			filterReset: "重置",
			filterEmptyText: "无筛选项",
			filterCheckAll: "全选",
			filterSearchPlaceholder: "在筛选项中搜索",
			emptyText: "暂无数据",
			selectAll: "全选当页",
			selectInvert: "反选当页",
			selectNone: "清空所有",
			selectionAll: "全选所有",
			sortTitle: "排序",
			expand: "展开行",
			collapse: "关闭行",
			triggerDesc: "点击降序",
			triggerAsc: "点击升序",
			cancelSort: "取消排序"
		},
		Modal: {
			okText: "确定",
			cancelText: "取消",
			justOkText: "知道了"
		},
		Tour: {
			Next: "下一步",
			Previous: "上一步",
			Finish: "结束导览"
		},
		Popconfirm: {
			cancelText: "取消",
			okText: "确定"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "请输入搜索内容",
			itemUnit: "项",
			itemsUnit: "项",
			remove: "删除",
			selectCurrent: "全选当页",
			removeCurrent: "删除当页",
			selectAll: "全选所有",
			deselectAll: "取消全选",
			removeAll: "删除全部",
			selectInvert: "反选当页"
		},
		Upload: {
			uploading: "文件上传中",
			removeFile: "删除文件",
			uploadError: "上传错误",
			previewFile: "预览文件",
			downloadFile: "下载文件"
		},
		Empty: { description: "暂无数据" },
		Icon: { icon: "图标" },
		Text: {
			edit: "编辑",
			copy: "复制",
			copied: "复制成功",
			expand: "展开",
			collapse: "收起"
		},
		Form: {
			optional: "（可选）",
			defaultValidateMessages: {
				default: "字段验证错误${label}",
				required: "请输入${label}",
				enum: "${label}必须是其中一个[${enum}]",
				whitespace: "${label}不能为空字符",
				date: {
					format: "${label}日期格式无效",
					parse: "${label}不能转换为日期",
					invalid: "${label}是一个无效日期"
				},
				types: {
					string: typeTemplate,
					method: typeTemplate,
					array: typeTemplate,
					object: typeTemplate,
					number: typeTemplate,
					date: typeTemplate,
					boolean: typeTemplate,
					integer: typeTemplate,
					float: typeTemplate,
					regexp: typeTemplate,
					email: typeTemplate,
					url: typeTemplate,
					hex: typeTemplate
				},
				string: {
					len: "${label}须为${len}个字符",
					min: "${label}最少${min}个字符",
					max: "${label}最多${max}个字符",
					range: "${label}须在${min}-${max}字符之间"
				},
				number: {
					len: "${label}必须等于${len}",
					min: "${label}最小值为${min}",
					max: "${label}最大值为${max}",
					range: "${label}须在${min}-${max}之间"
				},
				array: {
					len: "须为${len}个${label}",
					min: "最少${min}个${label}",
					max: "最多${max}个${label}",
					range: "${label}数量须在${min}-${max}之间"
				},
				pattern: { mismatch: "${label}与模式不匹配${pattern}" }
			}
		},
		QRCode: {
			expired: "二维码过期",
			refresh: "点击刷新",
			scanned: "已扫描"
		},
		ColorPicker: {
			presetEmpty: "暂无",
			transparent: "无色",
			singleColor: "单色",
			gradientColor: "渐变色"
		}
	};
}));
//#endregion
//#region node_modules/antd/locale/zh_CN.js
var require_zh_CN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_zh_CN$1();
}));
//#endregion
export { ConfigProvider as A, Radio as C, Select as D, Avatar as E, Empty as O, Calendar as S, button_default as T, Slider as _, Tag as a, Card as b, Popconfirm as c, List as d, Spin as f, DatePicker as g, drawer_default as h, TimePicker as i, App as k, Modal as l, Form as m, Upload as n, Switch as o, Input as p, timeline_default as r, progress_default as s, require_zh_CN as t, staticMethods as u, TypedInputNumber as v, require_dayjs_min as w, Tabs as x, Checkbox as y };

//# sourceMappingURL=vendor-ui-BCl3WSDB.js.map