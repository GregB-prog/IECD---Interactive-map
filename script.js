<head>
    <title>Carte d'Argenteuil</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- Inclure jQuery -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
</head>

<body>
    <div id="map" style="height: 500px;"></div> <!-- Assurez-vous que la hauteur est définie -->
    <script>
        // Ton code JavaScript ici
    // Fonction pour charger le GeoJSON
function loadGeoJSON() {
    $.getJSON('https://raw.githubusercontent.com/BobLoubar/interactive-map/refs/heads/main/Les_quartiers.geojson', function(data) {
        // Ajout du GeoJSON à la carte avec des styles personnalisés
        L.geoJSON(data, {
            style: function(feature) {
                return {
                    color: 'red',  // Couleur de la bordure
                    weight: 2,     // Épaisseur du contour
                    fillOpacity: 0 // Désactive le remplissage
                };
            }
        }).addTo(map).bindPopup("<b>Argenteuil</b>"); // Popup sur le polygone
    }).fail(function() {
        console.error("Erreur lors du chargement du fichier GeoJSON."); // Gestion des erreurs
    });
}

// Initialiser la carte centrée sur Argenteuil
var map = L.map('map').setView([48.9477, 2.2477], 13);

// Ajouter des tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Charger les données GeoJSON
loadGeoJSON();

// Ajout du marqueur avec une icône personnalisée
var customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=21081&format=png&color=000000', // Lien vers l'icône personnalisée
    iconSize: [38, 38], // Taille de l'icône
    iconAnchor: [22, 38], // Point de l'icône qui sera au point du marqueur
    popupAnchor: [-3, -76] // Point depuis l'ancre où apparaîtra la popup
});

// Positionner le marqueur sur la carte
var marker = L.marker([48.94060424918679, 2.2364254535279544], { icon: customIcon }).addTo(map);
marker.bindPopup("<b>L'Outil en Main</b>").openPopup(); // Popup sur le marqueur

</body>



