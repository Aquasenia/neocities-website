/**
 * Credits Table Sorter
 * Enables alphabetical sorting of credits table by Author column
 */

class CreditsTableSorter {
    constructor(tableSelector = 'table') {
        this.table = document.querySelector(tableSelector);
        if (!this.table) {
            console.warn('Credits table not found');
            return;
        }
        this.init();
    }

    init() {
        this.makeHeadersClickable();
        this.sortByColumn('Author'); // Default sort by Author
    }

    makeHeadersClickable() {
        const headers = this.table.querySelectorAll('thead th');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => this.sortByColumnIndex(index));
        });
    }

    sortByColumn(columnName) {
        const headers = this.table.querySelectorAll('thead th');
        const index = Array.from(headers).findIndex(h => h.textContent.trim() === columnName);
        if (index !== -1) {
            this.sortByColumnIndex(index);
        }
    }

    sortByColumnIndex(columnIndex) {
        const tbody = this.table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const cellA = a.cells[columnIndex].textContent.trim().toLowerCase();
            const cellB = b.cells[columnIndex].textContent.trim().toLowerCase();
            return cellA.localeCompare(cellB);
        });

        rows.forEach(row => tbody.appendChild(row));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CreditsTableSorter('table');
});