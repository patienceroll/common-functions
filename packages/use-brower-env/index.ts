/* eslint-disable @typescript-eslint/no-explicit-any */
interface IFirefoxWindow extends Window {
	InstallTrigger?: unknown;
}

interface IIEDocument extends Document {
	documentMode?: number;
}

interface IOperaWindow extends Window {
	opera?: unknown;
	opr?: {
		addons: unknown;
	};
}

interface ISafariWindow extends Window {
	safari?: {
		pushNotification?: unknown;
	};
}

const iOSPlatforms = [
	'iPad Simulator',
	'iPhone Simulator',
	'iPod Simulator',
	'iPad',
	'iPhone',
	'iPod',
];

export function isAndroid(): boolean {
	return !!window && /Android/.test(navigator.userAgent);
}

export function isIE(): boolean {
	return !!window && !!(document as IIEDocument).documentMode;
}

export function isIE10(): boolean {
	return !!window && (document as IIEDocument).documentMode === 10;
}

export function isIE11(): boolean {
	return !!window && (document as IIEDocument).documentMode === 11;
}

export function isIPad(): boolean {
	return (
		!!window &&
		navigator.userAgent.includes('Mac') &&
		'ontouchend' in document
	);
}

export function isIPhone(): boolean {
	return !!window && navigator.userAgent.indexOf('iPhone') !== -1;
}

export function isIOS(): boolean {
	return !!window && (iOSPlatforms.includes(navigator.platform) || isIPad());
}

export function isIPod(): boolean {
	return !!window && navigator.userAgent.indexOf('iPod') !== -1;
}

export function isMac(): boolean {
	return (
		!!window &&
		!isIPhone() &&
		!isIPad() &&
		!isIPod() &&
		navigator.platform.indexOf('Mac') !== -1
	);
}

export function isOpera(): boolean {
	if (!window) return false;

	return (
		!!(window as IOperaWindow).opera ||
		(!!(window as IOperaWindow).opr &&
			!!(window as IOperaWindow).opr?.addons) ||
		navigator.userAgent.indexOf(' OPR/') >= 0
	);
}

export function isChrome(): boolean {
	if (!window) return false;
	return (
		/Chrome/.test(navigator.userAgent) &&
		/Google Inc/.test(navigator.vendor) &&
		!isOpera()
	);
}

export function isEdge(): boolean {
	return !!window && !isIE() && !!(window as any).StyleMedia;
}

export function isFirefox(): boolean {
	return (
		!!window &&
		typeof (window as IFirefoxWindow).InstallTrigger !== 'undefined'
	);
}

export function isRetina(): boolean {
	return !!window && window.devicePixelRatio > 1;
}

export function isSafari(): boolean {
	const win = window as ISafariWindow;
	if (!win || !win.safari || !win.safari.pushNotification) return false;

	return (
		(win.safari.pushNotification as any).toString() ===
		'[object SafariRemoteNotification]'
	);
}

export function isTouchScreen(): boolean {
	return !!window && 'ontouchstart' in window;
}

export function isWin(): boolean {
	return !!window && navigator.platform.indexOf('Win') !== -1;
}

export function isWeiXin(): boolean {
	return !!window && /MicroMessenger/.test(navigator.userAgent);
}

export default function useBrowserEnv() {
	return {
		isAndroid: isAndroid(),
		isIE: isIE(),
		isIE10: isIE10(),
		isIE11: isIE11(),
		isIPad: isIPad(),
		isIPhone: isIPhone(),
		isIOS: isIOS(),
		isIPod: isIPad(),
		isMac: isMac(),
		isOpera: isOpera(),
		isChrome: isChrome(),
		isEdge: isEdge(),
		isFirefox: isFirefox(),
		isRetina: isRetina(),
		isSafari: isSafari(),
		isTouchScreen: isTouchScreen(),
		isWin: isWin(),
		isWeiXin: isWeiXin(),
	};
}
