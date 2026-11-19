import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { ar as require_react } from "./vendor-others-DR5UvigV.js";
import { i as http, n as useAuth, r as createApiService } from "./useAuth-C1mbC9T4.js";
import { a as getSubCategories, i as getCategoryMapping, n as expenseCategoryList, o as getSubCategoryMapping, r as getCategoryIcon, s as incomeCategoryList } from "./categoryIconMapping-C7E85sDI.js";
//#region src/api/category.ts
var api = createApiService("/categories");
var getAllCategories = () => {
	return http.get("/categories");
};
api.create;
api.update;
api.delete;
//#endregion
//#region src/hooks/useCategories.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var convertMappingToOptions = (mappings) => {
	return mappings.map((mapping) => ({
		value: mapping.standardName,
		label: mapping.standardName,
		icon: mapping.defaultIcon,
		englishName: mapping.englishName,
		type: mapping.type
	}));
};
var findMapping = (name) => {
	const subMatch = getSubCategoryMapping(name);
	if (subMatch) return {
		subCategory: subMatch.subCategory,
		mainCategory: subMatch.parentCategory
	};
	const mainMatch = getCategoryMapping(name);
	if (mainMatch) return { mainCategory: mainMatch };
	return { mainCategory: null };
};
var convertSubCategoriesToOptions = (subCategories) => {
	return subCategories.map((sub) => ({
		value: sub.name,
		label: sub.name,
		icon: sub.defaultIcon,
		englishName: sub.englishName
	}));
};
var useCategories = () => {
	const { isLoggedIn } = useAuth();
	const [apiCategories, setApiCategories] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (isLoggedIn) getAllCategories().then((data) => {
			setApiCategories(data);
		}).catch((error) => {
			console.error("Failed to fetch categories:", error);
		}).finally(() => {
			setLoading(false);
		});
		else setLoading(false);
	}, [isLoggedIn]);
	const expenseCategoryOptions = (0, import_react.useMemo)(() => {
		if (apiCategories?.expense) return apiCategories.expense.map((cat) => {
			const mapping = getCategoryMapping(cat.name);
			return {
				value: cat.name,
				label: cat.name,
				icon: mapping?.defaultIcon || cat.icon || getCategoryIcon(cat.name),
				englishName: mapping?.englishName || "other_expense",
				type: "expense"
			};
		});
		return convertMappingToOptions(expenseCategoryList);
	}, [apiCategories]);
	const incomeCategoryOptions = (0, import_react.useMemo)(() => {
		if (apiCategories?.income) return apiCategories.income.map((cat) => {
			const mapping = getCategoryMapping(cat.name);
			return {
				value: cat.name,
				label: cat.name,
				icon: mapping?.defaultIcon || cat.icon || getCategoryIcon(cat.name),
				englishName: mapping?.englishName || "other_income",
				type: "income"
			};
		});
		return convertMappingToOptions(incomeCategoryList);
	}, [apiCategories]);
	const allCategoryOptions = (0, import_react.useMemo)(() => {
		return [...expenseCategoryOptions, ...incomeCategoryOptions];
	}, [expenseCategoryOptions, incomeCategoryOptions]);
	const subCategoryMap = (0, import_react.useMemo)(() => {
		const map = {};
		[...expenseCategoryList, ...incomeCategoryList].forEach((cat) => {
			map[cat.standardName] = cat.subCategories.map((sub) => sub.name);
		});
		if (apiCategories) [...apiCategories.expense, ...apiCategories.income].forEach((cat) => {
			if (cat.subCategories && cat.subCategories.length > 0) map[cat.name] = cat.subCategories.map((s) => s.name);
		});
		return map;
	}, [apiCategories]);
	const getSubCategoryOptions = (mainCategoryName) => {
		const subCategories = getSubCategories(mainCategoryName);
		if (subCategories.length > 0) return convertSubCategoriesToOptions(subCategories);
		return (subCategoryMap[mainCategoryName] || []).map((name) => {
			const subMatch = getSubCategoryMapping(name);
			if (subMatch) return {
				value: subMatch.subCategory.name,
				label: subMatch.subCategory.name,
				icon: subMatch.subCategory.defaultIcon,
				englishName: subMatch.subCategory.englishName
			};
			return {
				value: name,
				label: name,
				icon: "📦",
				englishName: "other"
			};
		});
	};
	const getIcon = (categoryName, subCategoryName) => {
		if (subCategoryName) {
			const sub = findMapping(subCategoryName);
			if (sub.subCategory) return sub.subCategory.defaultIcon;
		}
		const mapping = findMapping(categoryName);
		if (mapping.mainCategory) return mapping.subCategory?.defaultIcon || mapping.mainCategory.defaultIcon;
		return allCategoryOptions.find((c) => c.value === categoryName)?.icon || "📦";
	};
	const getEnglishName = (categoryName, subCategoryName) => {
		if (subCategoryName) {
			const sub = findMapping(subCategoryName);
			if (sub.subCategory) return sub.subCategory.englishName;
		}
		const mapping = findMapping(categoryName);
		if (mapping.mainCategory) return mapping.subCategory?.englishName || mapping.mainCategory.englishName;
		return "other_expense";
	};
	const getType = (categoryName) => {
		return findMapping(categoryName).mainCategory?.type || null;
	};
	const normalizeName = (categoryName) => {
		return findMapping(categoryName).mainCategory?.standardName || categoryName;
	};
	const normalizeSubCategoryName = (subCategoryName) => {
		return findMapping(subCategoryName).subCategory?.name || subCategoryName;
	};
	const matchCategory = (categoryInput, subCategoryInput) => {
		if (subCategoryInput) {
			const sub = findMapping(subCategoryInput);
			if (sub.subCategory) return {
				mainCategory: sub.mainCategory,
				subCategory: sub.subCategory
			};
		}
		const sub = findMapping(categoryInput);
		if (sub.subCategory) return {
			mainCategory: sub.mainCategory,
			subCategory: sub.subCategory
		};
		return sub.mainCategory ? {
			mainCategory: sub.mainCategory,
			subCategory: null
		} : {
			mainCategory: null,
			subCategory: null
		};
	};
	return {
		expenseCategoryOptions,
		incomeCategoryOptions,
		allCategoryOptions,
		subCategoryMap,
		getSubCategoryOptions,
		getIcon,
		getEnglishName,
		getType,
		normalizeName,
		normalizeSubCategoryName,
		matchCategory,
		loading
	};
};
//#endregion
export { useCategories as t };

//# sourceMappingURL=useCategories-bV07ph0B.js.map