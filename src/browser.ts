import UAParser from "ua-parser-js";

enum BROWSERS {
  CHROME = "chrome",
  SAFARI = "safari",
  FIREFOX = "firefox",
  EDGE = "edge",
  MOBILE_SAFARI = "mobile safari",
}

const browserInformation = {
  [BROWSERS.CHROME]: {
    minMajorVersion: 76, // last 20 major versions (96).
    updateUrl:
      "https://support.google.com/chrome/answer/95414?hl=en-GB&co=GENIE.Platform%3DDesktop",
  },
  [BROWSERS.FIREFOX]: {
    minMajorVersion: 75, // last 20 major versions (95).
    updateUrl:
      "https://support.mozilla.org/en-US/kb/update-firefox-latest-release",
  },
  [BROWSERS.SAFARI]: {
    minMajorVersion: 13, // last 2 major versions (15).
    updateUrl: "https://support.apple.com/en-gb/HT204416",
  },
  [BROWSERS.EDGE]: {
    minMajorVersion: 76, // last 20 major versions (96).
    updateUrl:
      "https://support.microsoft.com/en-us/topic/microsoft-edge-update-settings-af8aaca2-1b69-4870-94fe-18822dbb7ef1",
  },
  [BROWSERS.MOBILE_SAFARI]: {
    minMajorVersion: 13, // last 2 major versions (15).
    updateUrl: "https://support.apple.com/en-gb/HT204204",
  },
};

const displayBanner = () => {
  const banner = document.getElementById("banner");

  if(banner) {
    banner.style.display = 'block'
  }
}

const setUpdateUrl = (url: string) => {
  const updateLink = document.getElementById("update") as HTMLAnchorElement;

  console.log("udpate link", updateLink)

  if(updateLink) {
    updateLink.href = url
  }
}

const getUserVersion = (version?: string) =>
  version ? Number(version.split(".")[0]) : null;

const checkOutdatedBrowserVersion = () => {
  const { browser } = new UAParser(navigator.userAgent).getResult();
  const userBrowser = browser?.name?.toLocaleLowerCase() as BROWSERS;
  const userMajorVersion = getUserVersion(browser.version);

  if (!userMajorVersion || !browserInformation[userBrowser]) {
    return;
  }

  const { minMajorVersion, updateUrl } = browserInformation[userBrowser];
  const shouldUpdate = userMajorVersion < minMajorVersion;

  if (shouldUpdate) {
    setUpdateUrl(updateUrl)
    displayBanner();
  }
};

checkOutdatedBrowserVersion();
