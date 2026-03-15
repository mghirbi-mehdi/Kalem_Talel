// Données des restaurants (exemple pour 100+ restos)
const restaurantsData = [
    {
        id: 1,
        name: "AL OSTEDH",
        logo: "🍔",
        address: "📍 LAFAYETTE",
        hours: "10h-22h",
        type: "burger",
        plats: [
            { name: "Burger Crispy", desc: "Tomates, Laitue, Sauce fromagère", price: "14,9 DT", img: "burger_bnin.PNG" },
            { name: "Burger Classique", desc: "Tomates, Laitue, Boeuf", price: "16,9 DT", img: "burger_classique.PNG" },
            // ... plus de plats
        ]
    },
    {
        id: 2,
        name: "Saveurs d'Orient",
        logo: "🥙",
        address: "📍 Ariana",
        hours: "11h-23h",
        type: "oriental",
        plats: [
            { name: "Chawarma Poulet", desc: "Pain libanais, poulet mariné", price: "12 DT", img: "https://images.unsplash.com/photo-1606755456206-b25206cde27e" },
            // ... plus de plats
        ]
    },
    // Ajoutez vos 100+ restaurants ici
];

let currentPage = 1;
const itemsPerPage = 10;
let filteredRestos = [];

// Chargement initial
document.addEventListener('DOMContentLoaded', function() {
    filteredRestos = restaurantsData;
    loadRestaurants();
    setupSearch();
    setupFilters();
    setupInfiniteScroll();
});

function loadRestaurants(reset = false) {
    if (reset) {
        currentPage = 1;
        document.getElementById('restoContainer').innerHTML = '';
    }
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const restosToShow = filteredRestos.slice(start, end);
    
    restosToShow.forEach(resto => {
        const restoHTML = createRestaurantHTML(resto);
        document.getElementById('restoContainer').insertAdjacentHTML('beforeend', restoHTML);
    });
    
    if (end >= filteredRestos.length) {
        // Plus de restaurants à charger
        document.querySelector('.load-more')?.remove();
    }
}

function createRestaurantHTML(resto) {
    let platsHTML = '';
    resto.plats.forEach(plat => {
        platsHTML += `
            <div class="plat-card">
                <div class="plat-image" style="background-image: url('${plat.img}')"></div>
                <div class="plat-info">
                    <h3>${plat.name}</h3>
                    <p class="plat-description">${plat.desc}</p>
                    <div class="plat-footer">
                        <span class="prix">${plat.price}</span>
                        <a href="https://wa.me/21651924385?text=Commande%20${plat.name}" class="btn-whatsapp">
                            <i class="fab fa-whatsapp"></i> Commander
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    return `
        <section class="restaurant-section">
            <div class="restaurant-header">
                <div class="restaurant-logo">${resto.logo}</div>
                <div>
                    <h2>${resto.name}</h2>
                    <p>📍 ${resto.address} • ${resto.hours}</p>
                </div>
            </div>
            <div class="menu-grid">
                ${platsHTML}
            </div>
        </section>
    `;
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filteredRestos = restaurantsData.filter(resto => 
            resto.name.toLowerCase().includes(searchTerm) ||
            resto.plats.some(plat => 
                plat.name.toLowerCase().includes(searchTerm) ||
                plat.desc.toLowerCase().includes(searchTerm)
            )
        );
        loadRestaurants(true);
    });
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            if (filter === 'all') {
                filteredRestos = restaurantsData;
            } else {
                filteredRestos = restaurantsData.filter(r => r.type === filter);
            }
            loadRestaurants(true);
        });
    });
}

function setupInfiniteScroll() {
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
            if (currentPage * itemsPerPage < filteredRestos.length) {
                currentPage++;
                loadRestaurants();
            }
        }
        
        // Scroll to top button
        document.querySelector('.scroll-top').classList.toggle('show', window.scrollY > 300);
    });
}
