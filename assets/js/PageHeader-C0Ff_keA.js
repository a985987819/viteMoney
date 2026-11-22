import { kt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { T as button_default } from "./vendor-ui-BCl3WSDB.js";
var index_module_default = {
	header: "_header_184u2_6",
	backBtn: "_backBtn_184u2_17",
	title: "_title_184u2_35",
	placeholder: "_placeholder_184u2_45"
};
//#endregion
//#region src/components/PageHeader/index.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* 通用页面顶部导航组件
* 统一管理返回按钮和页面标题
*/
var PageHeader = ({ title, onBack, backPath, rightContent, showBack = true, className = "" }) => {
	const navigate = useNavigate();
	const handleBack = () => {
		if (onBack) onBack();
		else if (backPath) navigate(backPath);
		else navigate(-1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${index_module_default.header} ${className}`,
		children: [
			showBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
				type: "text",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}),
				onClick: handleBack,
				className: index_module_default.backBtn
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default.placeholder }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: index_module_default.title,
				children: title
			}),
			rightContent || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default.placeholder })
		]
	});
};
//#endregion
export { PageHeader as t };
