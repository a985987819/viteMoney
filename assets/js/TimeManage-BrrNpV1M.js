import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon$1, X as RefIcon$2, ar as require_react, kt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { O as Empty, S as Calendar, T as button_default, g as DatePicker, i as TimePicker, l as Modal, m as Form, p as Input, u as staticMethods, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { H as DATE_FORMAT, N as updateSchedule, i as addSchedule, u as deleteSchedule, x as getSchedules } from "./storage-D-qjG_21.js";
//#region src/pages/TimeManage/index.module.scss
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var index_module_default = {
	pageContainer: "_pageContainer_fre6w_6",
	headerSection: "_headerSection_fre6w_17",
	headerTop: "_headerTop_fre6w_25",
	backBtn: "_backBtn_fre6w_32",
	addBtn: "_addBtn_fre6w_33",
	headerTitle: "_headerTitle_fre6w_53",
	summaryGrid: "_summaryGrid_fre6w_62",
	summaryCard: "_summaryCard_fre6w_68",
	summaryLabel: "_summaryLabel_fre6w_77",
	summaryValue: "_summaryValue_fre6w_83",
	contentSection: "_contentSection_fre6w_91",
	calendarCard: "_calendarCard_fre6w_101",
	timelineCard: "_timelineCard_fre6w_102",
	timelineHeader: "_timelineHeader_fre6w_119",
	timelineDate: "_timelineDate_fre6w_127",
	timelineWeekday: "_timelineWeekday_fre6w_137",
	timelineHint: "_timelineHint_fre6w_142",
	emptyWrap: "_emptyWrap_fre6w_148",
	calendarDot: "_calendarDot_fre6w_152",
	timelineScroll: "_timelineScroll_fre6w_161",
	timelineBody: "_timelineBody_fre6w_172",
	timeAxis: "_timeAxis_fre6w_177",
	timeAxisItem: "_timeAxisItem_fre6w_183",
	timeAxisLabel: "_timeAxisLabel_fre6w_192",
	timeTrack: "_timeTrack_fre6w_198",
	hourLine: "_hourLine_fre6w_205",
	scheduleBlock: "_scheduleBlock_fre6w_212",
	blockTitle: "_blockTitle_fre6w_232",
	blockTime: "_blockTime_fre6w_241",
	blockRemark: "_blockRemark_fre6w_246",
	colorRow: "_colorRow_fre6w_254",
	colorSwatch: "_colorSwatch_fre6w_260",
	colorSwatchActive: "_colorSwatchActive_fre6w_273",
	formActions: "_formActions_fre6w_278",
	formActionsRight: "_formActionsRight_fre6w_286"
};
//#endregion
//#region src/pages/TimeManage/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var HOUR_HEIGHT = 56;
var TOTAL_HEIGHT = HOUR_HEIGHT * 24;
var MIN_BLOCK_HEIGHT = 32;
var TIME_FORMAT = "HH:mm";
var HOURS = Array.from({ length: 24 }, (_, index) => index);
var COLOR_PRESETS = [
	{
		name: "green",
		label: "森林绿",
		value: "#5aa17f"
	},
	{
		name: "blue",
		label: "天空蓝",
		value: "#4a90e2"
	},
	{
		name: "orange",
		label: "暖阳橙",
		value: "#e08a3c"
	},
	{
		name: "red",
		label: "玫瑰红",
		value: "#d95e43"
	},
	{
		name: "purple",
		label: "紫罗兰",
		value: "#8e6fd0"
	},
	{
		name: "gold",
		label: "麦穗金",
		value: "#d4a72c"
	}
];
var padHour = (hour) => String(hour).padStart(2, "0");
var timeToMinutes = (time) => {
	const [hour, minute] = time.split(":").map(Number);
	return hour * 60 + minute;
};
var timeToDayjs = (time) => {
	const [hour, minute] = time.split(":").map(Number);
	return (0, import_dayjs_min.default)().hour(hour).minute(minute).second(0).millisecond(0);
};
var ColorSwatches = ({ value, onChange }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: index_module_default.colorRow,
	id: "schedule-form-color",
	children: COLOR_PRESETS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		id: `schedule-color-${color.name}`,
		type: "button",
		title: color.label,
		"aria-label": color.label,
		className: `${index_module_default.colorSwatch} ${value === color.value ? index_module_default.colorSwatchActive : ""}`,
		style: { background: color.value },
		onClick: () => onChange?.(color.value)
	}, color.name))
});
var TimeManagePage = () => {
	const navigate = useNavigate();
	const [schedules, setSchedules] = (0, import_react.useState)(() => getSchedules());
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(() => (0, import_dayjs_min.default)());
	const [modalVisible, setModalVisible] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form] = Form.useForm();
	const scrollRef = (0, import_react.useRef)(null);
	const selectedDateKey = selectedDate.format(DATE_FORMAT.DATE_KEY);
	const scheduleDateKeys = (0, import_react.useMemo)(() => new Set(schedules.map((item) => item.date)), [schedules]);
	const daySchedules = (0, import_react.useMemo)(() => schedules.filter((item) => item.date === selectedDateKey).sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)), [schedules, selectedDateKey]);
	const todayCount = (0, import_react.useMemo)(() => {
		const todayKey = (0, import_dayjs_min.default)().format(DATE_FORMAT.DATE_KEY);
		return schedules.filter((item) => item.date === todayKey).length;
	}, [schedules]);
	(0, import_react.useEffect)(() => {
		const container = scrollRef.current;
		if (!container) return;
		if (daySchedules.length === 0) {
			container.scrollTop = 0;
			return;
		}
		const firstHour = Math.floor(timeToMinutes(daySchedules[0].startTime) / 60);
		container.scrollTop = Math.max(0, (firstHour - 1) * HOUR_HEIGHT);
	}, [daySchedules]);
	const openCreate = () => {
		setEditing(null);
		form.setFieldsValue({
			title: "",
			date: selectedDate,
			timeRange: [(0, import_dayjs_min.default)().hour(9).minute(0).second(0), (0, import_dayjs_min.default)().hour(10).minute(0).second(0)],
			color: COLOR_PRESETS[0].value,
			remark: ""
		});
		setModalVisible(true);
	};
	const openEdit = (schedule) => {
		setEditing(schedule);
		form.setFieldsValue({
			title: schedule.title,
			date: (0, import_dayjs_min.default)(schedule.date),
			timeRange: [timeToDayjs(schedule.startTime), timeToDayjs(schedule.endTime)],
			color: schedule.color,
			remark: schedule.remark || ""
		});
		setModalVisible(true);
	};
	const handleSubmit = async () => {
		let values;
		try {
			values = await form.validateFields();
		} catch {
			return;
		}
		const [start, end] = values.timeRange;
		if (timeToMinutes(end.format(TIME_FORMAT)) <= timeToMinutes(start.format(TIME_FORMAT))) {
			staticMethods.warning("结束时间需晚于开始时间");
			return;
		}
		const payload = {
			title: values.title.trim(),
			date: values.date.format(DATE_FORMAT.DATE_KEY),
			startTime: start.format(TIME_FORMAT),
			endTime: end.format(TIME_FORMAT),
			color: values.color,
			remark: values.remark?.trim() || ""
		};
		try {
			if (editing) updateSchedule(editing.id, payload);
			else addSchedule(payload);
			setSchedules(getSchedules());
			setSelectedDate(values.date.startOf("day"));
			setModalVisible(false);
			setEditing(null);
			staticMethods.success(editing ? "日程已更新" : "日程已添加");
		} catch (error) {
			console.error("保存日程失败:", error);
			staticMethods.error("保存失败，请重试");
		}
	};
	const handleDelete = (schedule) => {
		Modal.confirm({
			title: "删除日程",
			content: `确定要删除「${schedule.title}」吗？`,
			okType: "danger",
			onOk: () => {
				deleteSchedule(schedule.id);
				setSchedules(getSchedules());
				setModalVisible(false);
				setEditing(null);
				staticMethods.success("已删除");
			}
		});
	};
	const handleCancel = () => {
		setModalVisible(false);
		setEditing(null);
	};
	const getBlockStyle = (schedule) => {
		const startMinutes = timeToMinutes(schedule.startTime);
		const endMinutes = timeToMinutes(schedule.endTime);
		const duration = Math.max(0, endMinutes - startMinutes);
		return {
			top: startMinutes / 60 * HOUR_HEIGHT,
			height: Math.max(MIN_BLOCK_HEIGHT, duration / 60 * HOUR_HEIGHT),
			background: `${schedule.color}22`,
			borderLeftColor: schedule.color,
			color: schedule.color
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.pageContainer,
		id: "time-manage-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.headerSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.headerTop,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "time-manage-back",
							type: "button",
							className: index_module_default.backBtn,
							onClick: () => navigate(-1),
							"aria-label": "返回",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.headerTitle,
							children: "时间管理"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "time-manage-add",
							type: "button",
							className: index_module_default.addBtn,
							onClick: openCreate,
							"aria-label": "添加日程",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.summaryGrid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.summaryCard,
							id: "time-manage-summary-today",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.summaryLabel,
								children: "今日日程"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.summaryValue,
								children: todayCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.summaryCard,
							id: "time-manage-summary-selected",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.summaryLabel,
								children: "当天日程"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.summaryValue,
								children: daySchedules.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.summaryCard,
							id: "time-manage-summary-total",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.summaryLabel,
								children: "全部日程"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.summaryValue,
								children: schedules.length
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.contentSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: index_module_default.calendarCard,
					id: "time-manage-calendar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
						fullscreen: false,
						value: selectedDate,
						onSelect: (date, info) => {
							if (info?.source === "date") setSelectedDate(date.startOf("day"));
						},
						cellRender: (current, info) => {
							if (info.type !== "date") return null;
							const dateKey = current.format(DATE_FORMAT.DATE_KEY);
							return scheduleDateKeys.has(dateKey) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: index_module_default.calendarDot }) : null;
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: index_module_default.timelineCard,
					id: "time-manage-timeline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.timelineHeader,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.timelineDate,
							children: [selectedDate.format("M月D日"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: index_module_default.timelineWeekday,
								children: selectedDate.format("dddd")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.timelineHint,
							children: "日内时间块规划"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
							size: "small",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
							onClick: openCreate,
							children: "添加日程"
						})]
					}), daySchedules.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.emptyWrap,
						id: "time-manage-empty",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { description: "当天暂无日程，点击右上角添加" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.timelineScroll,
						ref: scrollRef,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.timelineBody,
							style: { height: TOTAL_HEIGHT },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.timeAxis,
								children: HOURS.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.timeAxisItem,
									style: { top: hour * HOUR_HEIGHT },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default.timeAxisLabel,
										children: `${padHour(hour)}:00`
									})
								}, hour))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.timeTrack,
								children: [HOURS.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.hourLine,
									style: { top: hour * HOUR_HEIGHT }
								}, hour)), daySchedules.map((schedule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: `time-manage-block-${schedule.id}`,
									type: "button",
									className: index_module_default.scheduleBlock,
									style: getBlockStyle(schedule),
									onClick: () => openEdit(schedule),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.blockTitle,
											children: schedule.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: index_module_default.blockTime,
											children: [
												schedule.startTime,
												" - ",
												schedule.endTime
											]
										}),
										schedule.remark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.blockRemark,
											children: schedule.remark
										}) : null
									]
								}, schedule.id))]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: editing ? "编辑日程" : "添加日程",
				open: modalVisible,
				onCancel: handleCancel,
				forceRender: true,
				footer: null,
				destroyOnClose: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
					form,
					layout: "vertical",
					className: index_module_default.scheduleForm,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "title",
							label: "日程标题",
							rules: [{
								required: true,
								message: "请输入日程标题"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "schedule-form-title",
								placeholder: "例如：晨跑、产品评审会",
								size: "large",
								maxLength: 30
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "date",
							label: "日程日期",
							rules: [{
								required: true,
								message: "请选择日程日期"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
								id: "schedule-form-date",
								size: "large",
								style: { width: "100%" },
								format: "YYYY-MM-DD"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "timeRange",
							label: "时间范围",
							rules: [{
								required: true,
								message: "请选择起止时间"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimePicker.RangePicker, {
								id: "schedule-form-time",
								size: "large",
								style: { width: "100%" },
								format: "HH:mm",
								minuteStep: 5,
								order: true,
								allowClear: false
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "color",
							label: "色块颜色",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorSwatches, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "remark",
							label: "备注",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.TextArea, {
								id: "schedule-form-remark",
								placeholder: "可选，记录日程的补充说明",
								rows: 2,
								maxLength: 80
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.formActions,
							children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								danger: true,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
								onClick: () => handleDelete(editing),
								children: "删除"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.formActionsRight,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									onClick: handleCancel,
									children: "取消"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									type: "primary",
									onClick: handleSubmit,
									children: "保存"
								})]
							})]
						})
					]
				})
			})
		]
	});
};
//#endregion
export { TimeManagePage as default };

//# sourceMappingURL=TimeManage-BrrNpV1M.js.map