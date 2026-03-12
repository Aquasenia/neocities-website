/*
  Simple page transition handler.
  - Adds a fade-in when the page loads.
  - Adds a fade-out before navigating between internal pages.
*/
(function () {
  const TRANSITION_CLASS = "page-is-visible";
  const TRANSITION_DURATION = 260; // ms

  const docEl = document.documentElement;

  function show() {
    docEl.classList.add(TRANSITION_CLASS);
  }

  function hideAndNavigate(href) {
    docEl.classList.remove(TRANSITION_CLASS);
    setTimeout(() => {
      window.location.href = href;
    }, TRANSITION_DURATION);
  }

  function isLocalLink(link) {
    if (!link || !link.href) return false;
    if (link.target && link.target !== "_self") return false;

    // Avoid javascript: / mailto: / tel: links and same-page anchors
    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return false;
    }

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return false;
    }

    return url.origin === window.location.origin;
  }

  function handleLinkClick(event) {
    // Ignore when navigation is already handled, or when modifier keys are used (new tab/window).
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a");
    if (!isLocalLink(link)) return;

    event.preventDefault();
    hideAndNavigate(link.href);
  }

  function init() {
    show();

    document.body.addEventListener("click", handleLinkClick);
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("pageshow", (event) => {
    // Ensure page becomes visible again when restored from bfcache.
    show();

    // If the page was restored from bfcache, the DOMContentLoaded event will not fire again.
    // Ensure the click handler is still attached.
    if (event.persisted) {
      document.body.addEventListener("click", handleLinkClick);
    }
  });
})();
