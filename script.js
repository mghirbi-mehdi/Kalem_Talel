// Fonction de recherche
function searchRestaurant() {
    let input = document.getElementById('searchInput').value.toLowerCase().trim();
    let restaurants = document.querySelectorAll('.restaurant-section');
    let resultCount = 0;
    
    // Enlever l'ancien message "aucun résultat" s'il existe
    let oldNoResult = document.getElementById('noResult');
    if (oldNoResult) oldNoResult.remove();
    
    restaurants.forEach(restaurant => {
        let nomResto = restaurant.querySelector('h2').textContent.toLowerCase();
        let adresse = restaurant.querySelector('.restaurant-header p').textContent.toLowerCase();
        let plats = restaurant.querySelectorAll('.plat-card');
        let restoVisible = false;
        
        // Vérifier si le nom du resto ou l'adresse correspond
        if (nomResto.includes(input) || adresse.includes(input)) {
            restoVisible = true;
            restaurant.style.display = 'block';
            plats.forEach(plat => plat.style.display = 'block');
            resultCount++;
        } else {
            // Chercher dans les plats
            let platTrouve = false;
            plats.forEach(plat => {
                let nomPlat = plat.querySelector('h3').textContent.toLowerCase();
                let description = plat.querySelector('.plat-description').textContent.toLowerCase();
                let prix = plat.querySelector('.prix').textContent.toLowerCase();
                
                if (nomPlat.includes(input) || description.includes(input) || prix.includes(input)) {
                    plat.style.display = 'block';
                    platTrouve = true;
                    restoVisible = true;
                } else {
                    plat.style.display = 'none';
                }
            });
            
            // Si un plat est trouvé, afficher le resto
            if (platTrouve) {
                restaurant.style.display = 'block';
                resultCount++;
            } else {
                restaurant.style.display = 'none';
            }
        }
    });
    
    // Message si aucun résultat
    if (resultCount === 0 && input !== '') {
        let noResult = document.createElement('div');
        noResult.id = 'noResult';
        noResult.className = 'no-result';
        noResult.innerHTML = `
            <span>😕</span>
            <p>Aucun résultat pour "<strong>${input}</strong>"</p>
            <p>Essayez avec d'autres mots-clés comme :</p>
            <p>
                <span class="highlight">burger</span> 
                <span class="highlight">poulet</span> 
                <span class="highlight">poisson</span> 
            </p>
        `;
        document.querySelector('.container').insertBefore(noResult, document.querySelector('.restaurant-section'));
    }
}

// Fonction pour réinitialiser la recherche
function resetSearch() {
    let input = document.getElementById('searchInput');
    if (input.value === '') {
        location.reload(); // Recharge la page pour tout réafficher
    }
}

// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    let searchInput = document.getElementById('searchInput');
    
    // Ajouter l'événement de recherche
    searchInput.addEventListener('keyup', searchRestaurant);
    
    // Ajouter l'événement pour effacer (bouton X dans le champ)
    searchInput.addEventListener('search', function(e) {
        if (this.value === '') {
            location.reload();
        }
    });
    
    // Suggestions cliquables (optionnel)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('highlight')) {
            searchInput.value = e.target.textContent;
            searchRestaurant();
        }
    });
});