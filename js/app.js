// For search form enter
document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        search();
    }
});

// Fetch data from JSON file
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        // store data
        window.travelData = data;
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));

// Search for recommendations (via searchbox)
function search() {
    const keyword = document.getElementById('search').value.trim().toLowerCase();
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '';

    let results = [];

    // Normalise the keyword to handle varied forms
    const normalisedKeyword = normaliseKeyword(keyword);

    // Search in countries
    window.travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(normalisedKeyword)) {
            results = results.concat(country.cities);
        } else {
            // Check cities within the country
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(normalisedKeyword)) {
                    results.push(city);
                }
            });
        }
    });

    // Search all countries
    if (normalisedKeyword === 'country') {
        window.travelData.countries.forEach(country => {
            results = results.concat(country.cities);
        });
    }

    // Search in temples
    if (normalisedKeyword === 'temple') {
        results = results.concat(window.travelData.temples);
    }

    // Search in beaches
    if (normalisedKeyword === 'beach') {
        results = results.concat(window.travelData.beaches);
    }

    // Display the results
    if (results.length > 0) {
        results.forEach(result => {
            const card = createRecommendationCard(result.name, result.imageUrl, result.description);
            recommendationsContainer.appendChild(card);
        });
    } else {
        recommendationsContainer.innerHTML = '<p>No results found.</p>';
    }
}

// Normalise the keyword for better matching
function normaliseKeyword(keyword) {
    // First handle temple(s)
    // Then countries
    // Then plural forms
    if (keyword === 'temples') {
        return 'temple';
    } else if (keyword === 'countries') {
        return 'country';
    } else if (keyword.endsWith('es')) {
        return keyword.slice(0, -2);
    } else if (keyword.endsWith('s')) {
        return keyword.slice(0, -1);
    }
    return keyword;
}

// Create a recommendation card
function createRecommendationCard(name, imageUrl, description) {
    // Create card container
    const card = document.createElement('div');
    card.classList.add('recommendation-card');

    // Add image
    const img = document.createElement('img');
    img.src = `img/${imageUrl}`;
    img.alt = name;
    card.appendChild(img);

    // Add name (title)
    const title = document.createElement('h3');
    title.textContent = name;
    card.appendChild(title);

    // Add description
    const desc = document.createElement('p');
    desc.textContent = description;
    card.appendChild(desc);

    // Add visit button (do nothing for now)
    const button = document.createElement('a');
    button.href = '#';
    button.classList.add('visit-button');
    button.textContent = 'Visit';
    card.appendChild(button);

    return card;
}

// Show sections
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

// Clear search box + result
function resetSearch() {
    document.getElementById('search').value = '';
    document.getElementById('recommendations').innerHTML = '';
}

// Fake message sent
function handleSubmit(event) {
    event.preventDefault();
    alert("Message sent!");
}
