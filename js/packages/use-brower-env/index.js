const iOSPlatforms = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
];
export function isAndroid() {
    return !!window && /Android/.test(navigator.userAgent);
}
export function isIE() {
    return !!window && !!document.documentMode;
}
export function isIE10() {
    return !!window && document.documentMode === 10;
}
export function isIE11() {
    return !!window && document.documentMode === 11;
}
export function isIPad() {
    return (!!window &&
        navigator.userAgent.includes('Mac') &&
        'ontouchend' in document);
}
export function isIPhone() {
    return !!window && navigator.userAgent.indexOf('iPhone') !== -1;
}
export function isIOS() {
    return !!window && (iOSPlatforms.includes(navigator.platform) || isIPad());
}
export function isIPod() {
    return !!window && navigator.userAgent.indexOf('iPod') !== -1;
}
export function isMac() {
    return (!!window &&
        !isIPhone() &&
        !isIPad() &&
        !isIPod() &&
        navigator.platform.indexOf('Mac') !== -1);
}
export function isOpera() {
    var _a;
    if (!window)
        return false;
    return (!!window.opera ||
        (!!window.opr &&
            !!((_a = window.opr) === null || _a === void 0 ? void 0 : _a.addons)) ||
        navigator.userAgent.indexOf(' OPR/') >= 0);
}
export function isChrome() {
    if (!window)
        return false;
    return (/Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor) &&
        !isOpera());
}
export function isEdge() {
    return !!window && !isIE() && !!window.StyleMedia;
}
export function isFirefox() {
    return (!!window &&
        typeof window.InstallTrigger !== 'undefined');
}
export function isRetina() {
    return !!window && window.devicePixelRatio > 1;
}
export function isSafari() {
    const win = window;
    if (!win || !win.safari || !win.safari.pushNotification)
        return false;
    return (win.safari.pushNotification.toString() ===
        '[object SafariRemoteNotification]');
}
export function isTouchScreen() {
    return !!window && 'ontouchstart' in window;
}
export function isWin() {
    return !!window && navigator.platform.indexOf('Win') !== -1;
}
export function isWeiXin() {
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
