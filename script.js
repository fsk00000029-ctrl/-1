
const themeStorageKey = "preferred-theme";
const Theme = {
  LIGHT: "light",
  DARK: "dark",
};

function applyTheme(theme) {
  const isDark = theme === Theme.DARK;
  document.documentElement.classList.toggle("dark-mode", isDark);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.textContent = isDark ? "☀️" : "🌙";
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

function getStoredTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // ignore storage failures (e.g. privacy mode)
  }
}

function detectSystemTheme() {
  if (window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT;
  }
  return Theme.LIGHT;
}

function setTheme(theme) {
  applyTheme(theme);
  storeTheme(theme);
}

function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains("dark-mode");
  setTheme(isCurrentlyDark ? Theme.LIGHT : Theme.DARK);
}

function applyInitialTheme() {
  const stored = getStoredTheme();
  const theme = stored || detectSystemTheme();
  applyTheme(theme);
}

function enrollTraining() {
  alert("Thanks for your interest! We'll reach out shortly to help you enroll your dog.");
}

function bookNow() {
  alert("Thanks! A member of our team will contact you with booking details soon.");
}
window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }

  applyInitialTheme();
});
