// Enhancements for the landing page (beginner-friendly and easy to modify)
// - Fades the page in smoothly
// - Adds a simple typewriter effect for the main heading
// - Keeps the footer year up to date
// - Adds a dark/light theme toggle (saved to localStorage)

const THEME_KEY = "aqua-theme";

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark-mode", theme === "dark");
  document.documentElement.classList.toggle("light-mode", theme === "light");
}

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Make the page fade in using the CSS transition defined in index.css
  document.documentElement.classList.add("page-is-visible");

  // Apply the stored theme preference, or use system preference if none
  const saved = getSavedTheme();
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  // Theme toggle button (inserted if missing so it works on every page)
  let themeToggle = document.querySelector("#theme-toggle");
  if (!themeToggle) {
    themeToggle = document.createElement("button");
    themeToggle.id = "theme-toggle";
    themeToggle.type = "button";
    themeToggle.setAttribute("aria-label", "Toggle theme");
    themeToggle.title = "Toggle light/dark theme";

    const nav = document.querySelector("#navigation-bar");
    if (nav) {
      nav.appendChild(themeToggle);
    } else {
      document.body.appendChild(themeToggle);
    }
  }

  const updateToggleIcon = () => {
    const isDark = document.documentElement.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  };

  updateToggleIcon();

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("light-mode", !isDark);
    updateToggleIcon();

    const newTheme = isDark ? "dark" : "light";
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // Ignore if storage is unavailable
    }
  });

  // Typewriter effect for the welcome heading
  const welcomeHeading = document.querySelector("#welcome h1");
  if (welcomeHeading) {
    const fullText = welcomeHeading.textContent.trim();
    welcomeHeading.textContent = "";

    let index = 0;
    const typeSpeed = 35;

    const typeNext = () => {
      if (index < fullText.length) {
        welcomeHeading.textContent += fullText[index];
        index += 1;
        setTimeout(typeNext, typeSpeed);
      }
    };

    typeNext();
  }

  // Keep the footer year up to date without needing to edit HTML each year
  const footerParagraph = document.querySelector("#footer p");
  if (footerParagraph) {
    const year = new Date().getFullYear();
    footerParagraph.textContent = `Copyright © ${year} Aquasen. All rights reserved.`;
  }
});
