/**
 * @author Huro
 * @description 请求反馈信息接口
 */

// detailCollector 返回信息接口
export interface DetailCollectorCollector {
	wid: string;
	formWid: string;
	priority: string;
	endTime: string;
	currentTime: string;
	schoolTaskWid: string;
	isConfirmed: number;
	senderUserName: string;
	createTime: string;
	attachmentUrls?: any;
	attachmentNames?: any;
	attachmentSizes?: any;
	isUserSubmit: number;
	fetchStuLocation: boolean;
	address?: any;
}
export interface DetailCollectorForm {
	wid: string;
	formTitle: string;
	formContent: string;
	backReason?: any;
	isBack: number;
	attachments: any[];
}
export interface DetailCollectorDatas {
	collector: DetailCollectorCollector;
	form: DetailCollectorForm;
}

export interface DetailCollectorResponseData {
	code: string;
	message: string;
	datas: DetailCollectorDatas;
}

// 以下为 queryCollector 返回信息的接口
export interface queryCollectorRow {
	wid: string;
	formWid: string;
	priority: string;
	subject: string;
	content: string;
	senderUserName: string;
	createTime: string;
	startTime: string;
	endTime: string;
	currentTime: string;
	isHandled: number;
	isRead: number;
}
export interface queryCollectorData {
	totalSize: number;
	pageSize: number;
	pageNumber: number;
	rows: queryCollectorRow[];
}
export interface queryCollectorResponseData {
	code: string;
	message: string;
	datas: queryCollectorData;
}

// 以下为获取表单的返回信息的接口
// filedType
// 1 -> 级联选择 or 文本框  value -> 福建省/福州市/鼓楼区
// 2 -> 单选框 filedItems -> isSelected 标记
// 3 -> 多选框 filedItems -> isSelected 标记
export interface FormRow {
	wid: string;
	formWid: string;
	fieldType: number;
	title: string;
	description: string;
	minLength: number;
	sort: string;
	maxLength: number;
	isRequired: number;
	imageCount: number;
	hasOtherItems: number;
	colName: string;
	value: string;
	minValue: number;
	maxValue: number;
	isDecimal: boolean;
	fieldItems: any[];
}

export interface FormData {
	totalSize: number;
	pageSize: number;
	pageNumber: number;
	existData: number;
	rows: FormRow[];
}

export interface FormResponseData {
	code: string;
	message: string;
	datas: FormData;
}

// 以下为获取每日签到返回信息的接口 getSignInfo

export interface GetSignInfoUnSignedTask {
	stuSignWid: string;
	signInstanceWid: string;
	signWid: string;
	signRate: string;
	taskType: string;
	taskName: string;
	senderUserName: string;
	signStatus: string;
	isMalposition?: any;
	isLeave: string;
	leavePcUrl?: any;
	leaveMobileUrl?: any;
	currentTime: string;
	singleTaskBeginTime?: any;
	singleTaskEndTime?: any;
	rateSignDate: string;
	rateTaskBeginTime: string;
	rateTaskEndTime: string;
}

export interface GetSignInfoDatas {
	dayInMonth: string;
	codeRcvdTasks: any[];
	signedTasks: any[];
	unSignedTasks: GetSignInfoUnSignedTask[];
	leaveTasks: any[];
}

export interface GetSignInfoResponseData {
	code: string;
	message: string;
	datas: GetSignInfoDatas;
}

