// Function to get browser details
export function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  let browserInfo = "Unknown";

  if (userAgent.indexOf("Chrome") !== -1) {
    browserInfo = "Google Chrome";
  } else if (userAgent.indexOf("Safari") !== -1) {
    browserInfo = "Safari";
  } else if (userAgent.indexOf("Firefox") !== -1) {
    browserInfo = "Mozilla Firefox";
  } else if (userAgent.indexOf("Edge") !== -1) {
    browserInfo = "Microsoft Edge";
  } else if (
    userAgent.indexOf("MSIE") !== -1 ||
    userAgent.indexOf("Trident") !== -1
  ) {
    browserInfo = "Internet Explorer";
  }

  return browserInfo;
}

// Function to get operating system details
export function getOperatingSystem() {
  const userAgent = navigator.userAgent;
  let osInfo = "Unknown";

  if (userAgent.indexOf("Win") !== -1) {
    osInfo = "Windows";
  } else if (userAgent.indexOf("Mac") !== -1) {
    osInfo = "MacOS";
  } else if (userAgent.indexOf("Linux") !== -1) {
    osInfo = "Linux";
  } else if (userAgent.indexOf("Android") !== -1) {
    osInfo = "Android";
  } else if (userAgent.indexOf("iOS") !== -1) {
    osInfo = "iOS";
  }

  return osInfo;
}
