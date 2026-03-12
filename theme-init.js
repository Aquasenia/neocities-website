// Apply theme preference early (before CSS fully loads) to avoid flash of wrong theme.
(function () {
  const THEME_KEY = "aqua-theme";
  const saved = (() => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  })();

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  const theme = saved || (prefersDark ? "dark" : "light");

  if (theme === "dark") {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.classList.remove("light-mode");
  } else {
    document.documentElement.classList.add("light-mode");
    document.documentElement.classList.remove("dark-mode");
  }
})();
