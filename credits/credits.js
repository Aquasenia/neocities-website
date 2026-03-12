document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('credits-table');
    const rows = Array.from(table.rows).slice(2); // Skip the header row

    rows.sort((a, b) => {
        const aText = a.cells[0].textContent.trim();
        const bText = b.cells[0].textContent.trim();
        return aText.localeCompare(bText);
    });

    rows.forEach(row => table.appendChild(row));
});