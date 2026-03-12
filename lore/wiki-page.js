/*
  Species menu JS (shared across the wiki section).
  This file is intentionally safe to include on all wiki pages.
*/

const speciesGrid = document.getElementById("species-grid");
const speciesSearch = document.getElementById("species-search");

if (speciesGrid && speciesSearch) {
  const cards = Array.from(document.querySelectorAll(".species-card"));
  const filterContainer = document.querySelector(".category-filters");

  const noResults = document.createElement("p");
  noResults.className = "no-results";
  noResults.textContent = "No species match your search.";
  noResults.hidden = true;
  speciesGrid.insertAdjacentElement("afterend", noResults);

  // Ensure each card uses its configured image (if provided) and is tagged for filtering.
  cards.forEach((card) => {
    const img = card.querySelector(".species-card__image");
    const imageUrl = card.dataset.image;
    if (img && imageUrl) {
      img.src = imageUrl;
    }
  });

  const categories = Array.from(
    new Set(cards.map((card) => card.dataset.category).filter(Boolean))
  );

  const activeCategories = new Set();

  function buildCategoryFilters() {
    if (!filterContainer) return;

    filterContainer.innerHTML = "";

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-filter";
      button.textContent = category;
      button.dataset.category = category;

      button.addEventListener("click", () => {
        button.classList.toggle("active");
        if (button.classList.contains("active")) {
          activeCategories.add(category);
        } else {
          activeCategories.delete(category);
        }

        updateFiltering();
      });

      filterContainer.appendChild(button);
    });
  }

  function shouldShowCard(card, query) {
    const name = (card.dataset.name || "").toLowerCase();
    const tagline = (card.dataset.tagline || "").toLowerCase();
    const traits = (card.dataset.traits || "").toLowerCase();
    const category = card.dataset.category || "";

    const queryMatch =
      name.includes(query) || tagline.includes(query) || traits.includes(query);

    const categoryMatch =
      activeCategories.size === 0 || activeCategories.has(category);

    return queryMatch && categoryMatch;
  }

  function updateFiltering() {
    const query = speciesSearch.value.trim().toLowerCase();
    let anyVisible = false;

    cards.forEach((card) => {
      const show = shouldShowCard(card, query);
      card.style.display = show ? "flex" : "none";
      anyVisible ||= show;
    });

    noResults.hidden = anyVisible;
  }

  buildCategoryFilters();
  speciesSearch.addEventListener("input", updateFiltering);

  updateFiltering();
}
