import UAParser from "ua-parser-js";

import './main.css'

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

const createBanner = (url: string) => {
  const el = document.createElement("div");
  el.className = "banner-outer"

  el.innerHTML = `
  <div class="banner-style">
    <div class="update-browser-container update-browser">
      <p class="update-browser-text">UPDATE BROWSER</p>
    </div>
    <div class="update-browser-container">
      <p>You&#39;re using an unsupported browser so you may experience issues. <a href=${url}>Please update here.</a></p>
    </div>
  </div>
  `

  const body = document.getElementsByTagName("body")[0];
  body.insertBefore(el, body.firstChild)
}

const displayBanner = () => {
  const banner = document.getElementById("banner");

  if(banner) {
    banner.style.display = 'block'
  }
}

const getUserVersion = (version?: string) =>
  version ? Number(version.split(".")[0]) : null;

const handleOutdatedBrowserVersion = () => {
  const { browser } = new UAParser(navigator.userAgent).getResult();
  const userBrowser = browser?.name?.toLocaleLowerCase() as BROWSERS;
  const userMajorVersion = getUserVersion(browser.version);

  if (!userMajorVersion || !browserInformation[userBrowser]) {
    return;
  }

  const { minMajorVersion, updateUrl } = browserInformation[userBrowser];
  const shouldUpdate = userMajorVersion < minMajorVersion;

  createBanner(updateUrl)

  if (shouldUpdate) {
    displayBanner();
  }
};

handleOutdatedBrowserVersion();
