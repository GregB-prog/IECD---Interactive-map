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
    iconAnchor: [12.5, 12.5], // Point de l'icône qui sera au point du marqueur
    popupAnchor: [-4, -15] // Point depuis l'ancre où apparaîtra la popup
});

// Création du marqueur sans ouvrir la popup par défaut
var marker = L.marker([48.94060424918679, 2.2364254535279544], { icon: customIcon }).addTo(map);

// Liaison de la popup au marqueur
marker.bindPopup("<b>L'Outil en Main</b>");

// Événement de clic pour ouvrir la popup
marker.on('click', function(e) {
    this.openPopup();
});

// Marqueurs Vignes
var customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=vnwvFJpUeg6L&format=png&color=000000', // Lien vers l'icône personnalisée
    iconSize: [25, 25], // Taille de l'icône
    iconAnchor: [12.5, 12.5], // Point de l'icône qui sera au point du marqueur
    popupAnchor: [-4, -15] // Point depuis l'ancre où apparaîtra la popup
});
var lieux = [
    { coords: [48.965208, 2.221506], nom: "Les Coteaux d'Argenteuil" },
    { coords: [48.968559, 2.241287], nom: "Vin de Sannois" }
];
lieux.forEach(function(lieu) {
    var marker = L.marker(lieu.coords, { icon: customIcon }).addTo(map);
    marker.bindPopup("<b>" + lieu.nom + "</b>");
    marker.on('click', function(e) {
        this.openPopup();
    });
});

// Fichier GeoJSON - Quartiers d'Argenteuil

// Fonction pour styliser le contour
function styleContour(feature) {
    return {
        color: 'red',      // Couleur du contour
        weight: 2,         // Épaisseur de la ligne
        opacity: 1,         // Opacité de la ligne
        fillColor: 'none', // Pas de couleur de remplissage
        fillOpacity: 0     // Pas de remplissage visible
    };
}
// Upload du fichier geojson
fetch('Les_quartiers.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier GeoJSON');
        }
        return response.json();
    })
    .then(data => {
        L.geoJSON(data, {
            style: styleContour
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

// Fichier GeoJSON - La plaine d'Argenteuil

function styleContour2(feature) {
    return {
        color: 'blue',      // Couleur du contour
        weight: 2,         // Épaisseur de la ligne
        opacity: 1,         // Opacité de la ligne
    };
}
// Upload du fichier geojson
fetch('La_Plaine_Argenteuil.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier GeoJSON');
        }
        return response.json();
    })
    .then(data => {
        L.geoJSON(data, {
            style: styleContour2
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

