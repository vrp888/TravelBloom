function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show the selected section
    const section = document.getElementById(sectionId);
    section.classList.add('active');

    // Hide search box if NOT home
    const searchBar = document.querySelector('.search-container');
    if(sectionId !== "home") {
        searchBar.style.display = 'none';
    } else {
        searchBar.style.display = 'block';
    }
}

function search() {
    const query = document.getElementById('search').value;
    // TODO
}

function resetSearch() {
    document.getElementById('search').value = '';
    // TODO
}