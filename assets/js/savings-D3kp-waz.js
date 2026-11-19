import { B as SAVINGS_DEPOSITS_KEY, P as markStorageDirty, R as SAVINGS_ACTIVE_PLAN_ID_KEY, V as SAVINGS_PLANS_KEY, et as nowISO } from "./storage-S6w43vEG.js";
import { r as createApiService } from "./useAuth-C1mbC9T4.js";
//#region src/api/savings.ts
var api = createApiService("/savings/goals");
api.getList;
api.create;
api.update;
api.delete;
var recalculatePlan = (plan) => {
	const percentage = plan.targetAmount > 0 ? Math.min(100, plan.savedAmount / plan.targetAmount * 100) : 0;
	return {
		...plan,
		percentage,
		status: percentage >= 100 ? "completed" : plan.status === "failed" ? "failed" : "active"
	};
};
var getLocalSavingsPlans = () => {
	const data = localStorage.getItem(SAVINGS_PLANS_KEY);
	let plans;
	try {
		plans = data ? JSON.parse(data) : [];
	} catch {
		plans = [];
	}
	return Array.isArray(plans) ? plans.map(recalculatePlan) : [];
};
var saveLocalSavingsPlans = (plans) => {
	const normalizedPlans = plans.map(recalculatePlan);
	localStorage.setItem(SAVINGS_PLANS_KEY, JSON.stringify(normalizedPlans));
	markStorageDirty();
	const activePlanId = localStorage.getItem(SAVINGS_ACTIVE_PLAN_ID_KEY);
	const hasActivePlan = normalizedPlans.some((plan) => plan.id === activePlanId);
	if (!normalizedPlans.length) {
		localStorage.removeItem(SAVINGS_ACTIVE_PLAN_ID_KEY);
		return;
	}
	if (!hasActivePlan) localStorage.setItem(SAVINGS_ACTIVE_PLAN_ID_KEY, normalizedPlans[0].id);
};
var getLocalDeposits = (planId) => {
	const data = localStorage.getItem(SAVINGS_DEPOSITS_KEY);
	let allDeposits;
	try {
		allDeposits = data ? JSON.parse(data) : [];
	} catch {
		allDeposits = [];
	}
	return planId ? allDeposits.filter((d) => d.planId === planId) : allDeposits;
};
var saveLocalDeposit = (deposit) => {
	const deposits = getLocalDeposits();
	deposits.push(deposit);
	localStorage.setItem(SAVINGS_DEPOSITS_KEY, JSON.stringify(deposits));
	markStorageDirty();
	const plans = getLocalSavingsPlans();
	const plan = plans.find((p) => p.id === deposit.planId);
	if (plan) {
		plan.savedAmount += deposit.amount;
		plan.percentage = Math.min(100, plan.savedAmount / plan.targetAmount * 100);
		plan.status = plan.percentage >= 100 ? "completed" : "active";
		plan.updatedAt = nowISO();
		saveLocalSavingsPlans(plans);
	}
};
var setActiveSavingsPlan = (planId) => {
	localStorage.setItem(SAVINGS_ACTIVE_PLAN_ID_KEY, planId);
	markStorageDirty();
};
var getActiveSavingsPlanId = () => {
	return localStorage.getItem(SAVINGS_ACTIVE_PLAN_ID_KEY);
};
var getActiveSavingsPlan = () => {
	const plans = getLocalSavingsPlans();
	if (!plans.length) return null;
	const activePlanId = getActiveSavingsPlanId();
	if (!activePlanId) {
		const defaultPlan = plans[0];
		setActiveSavingsPlan(defaultPlan.id);
		return defaultPlan;
	}
	return plans.find((plan) => plan.id === activePlanId) || plans[0] || null;
};
var deleteLocalSavingsPlan = (planId) => {
	saveLocalSavingsPlans(getLocalSavingsPlans().filter((plan) => plan.id !== planId));
	const deposits = getLocalDeposits().filter((deposit) => deposit.planId !== planId);
	localStorage.setItem(SAVINGS_DEPOSITS_KEY, JSON.stringify(deposits));
	markStorageDirty();
};
//#endregion
export { getLocalSavingsPlans as a, setActiveSavingsPlan as c, getLocalDeposits as i, getActiveSavingsPlan as n, saveLocalDeposit as o, getActiveSavingsPlanId as r, saveLocalSavingsPlans as s, deleteLocalSavingsPlan as t };

//# sourceMappingURL=savings-D3kp-waz.js.map