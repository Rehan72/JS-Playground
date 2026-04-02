const STORAGE_KEYS = {
  TABS: 'jscompiler_tabs',
  ACTIVE_TAB: 'jscompiler_active_tab',
  SETTINGS: 'jscompiler_settings',
};

export function saveTabs(tabs) {
  try {
    localStorage.setItem(STORAGE_KEYS.TABS, JSON.stringify(tabs));
  } catch {
    // storage full or unavailable
  }
}

export function loadTabs() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TABS);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveActiveTab(id) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, id);
  } catch {
    // ignore
  }
}

export function loadActiveTab() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
  } catch {
    return null;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function loadSettings() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
