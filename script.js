// Initialisation de la carte centrée sur Argenteuil (48.9477, 2.2477)
var map = L.map('map').setView([48.9477, 2.2477], 13);

// Ajout des tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajout d'un marqueur Outil en main
var customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=21081&format=png&color=000000', // Lien vers l'icône personnalisée
    iconSize: [25, 25], // Taille de l'icône
    iconAnchor: [22, 38], // Point de l'icône qui sera au point du marqueur
    popupAnchor: [-3, -76] // Point depuis l'ancre où apparaîtra la popup
});

// Création du marqueur sans ouvrir la popup par défaut
var marker = L.marker([48.94060424918679, 2.2364254535279544], { icon: customIcon }).addTo(map);

// Liaison de la popup au marqueur
marker.bindPopup("<b>L'Outil en Main</b>");

// Événement de clic pour ouvrir la popup
marker.on('click', function(e) {
    this.openPopup();
});
