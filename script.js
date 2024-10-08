<head>
    <title>Carte d'Argenteuil</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!-- Inclure jQuery -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

// Ajout des tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Charger et afficher le fichier GeoJSON à partir de GitHub
$.getJSON('https://raw.githubusercontent.com/BobLoubar/interactive-map/refs/heads/main/Les_quartiers.geojson', function(data) { 
    L.geoJSON(data, {
        style: function(feature) {
            return {
                color: 'red',  // Couleur de la bordure
                weight: 2,     // Épaisseur du contour
                fillOpacity: 0 // Désactive le remplissage
            };
        }
    }).addTo(map).bindPopup("<b>Argenteuil</b>");
});

// Ajout d'un marqueur Outil en main
var customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=21081&format=png&color=000000', // Lien vers l'icône personnalisée
    iconSize: [38, 38], // Taille de l'icône
    iconAnchor: [22, 38], // Point de l'icône qui sera au point du marqueur
    popupAnchor: [-3, -76] // Point depuis l'ancre où apparaîtra la popup
});
var marker = L.marker([48.94060424918679, 2.2364254535279544], { icon: customIcon }).addTo(map);
marker.bindPopup("<b>L'Outil en Main</b>").openPopup();


