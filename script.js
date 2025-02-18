// Initialisation de la carte centrée sur Argenteuil (48.9477, 2.2477)
var map = L.map('map').setView([48.9477, 2.2477], 13);

// Ajout des tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajout d'un marqueur Bourse du Travail
var customIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=21081&format=png&color=000000',
    iconSize: [33, 33],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -15]
});
var marker = L.marker([48.94060424918679, 2.2364254535279544], { icon: customIcon }).addTo(map);
marker.bindPopup("<b>Bourse du Travail</b>");
marker.on('click', function(e) {
    this.openPopup();
});

// Marqueur Musée Sauvage
var customIconMS = L.icon({
    iconUrl: 'https://img.icons8.com/external-justicon-lineal-color-justicon/50/external-tree-tree-justicon-lineal-color-justicon-8.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [-2, -17.5]
});

var marker = L.marker([48.94400634691963, 2.258001387306958], {icon: customIconMS}).addTo(map);
marker.bindPopup("<b>Musée Sauvage</b>");
console.log("Marqueur ajouté :", marker);  
marker.on('click', function(e) {
    this.openPopup();
});

// Créer un groupe de couches pour les vignes
var vignesLayerGroup = L.layerGroup();

// Marqueurs Vignes
var customIconVignes = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=vnwvFJpUeg6L&format=png&color=000000',
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [-2, -15]
});
var lieux = [
    { coords: [48.965208, 2.221506], nom: "Les Coteaux d'Argenteuil" },
    { coords: [48.968559, 2.241287], nom: "Vin de Sannois" }
];
lieux.forEach(function(lieu) {
    let marker = L.marker(lieu.coords, { icon: customIconVignes }).bindPopup(`<b>${lieu.nom}</b>`);
    vignesLayerGroup.addLayer(marker); // Ajouter au groupe de couches
});

// Fichier GeoJSON - Quartiers d'Argenteuil
function styleContour(feature) {
    return {
        color: 'red',
        weight: 2,
        opacity: 1,
        fillColor: 'none',
        fillOpacity: 0
    };
}

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
        color: 'blue',
        weight: 2,
        opacity: 1,
    };
}

var plaineLayerGroup = L.layerGroup();
fetch('La_Plaine_Argenteuil.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier GeoJSON');
        }
        return response.json();
    })
    .then(data => {
        var plaineLayer = L.geoJSON(data, {
            style: styleContour2,
            onEachFeature: function(feature, layer) {
                const Name_Plaine_Argenteuil = "<b>La plaine d'Argenteuil (projet maraîcher 2026)</b>";
                layer.on('click', function() {
                    layer.bindPopup(Name_Plaine_Argenteuil).openPopup();
                });
            }
        });
        plaineLayerGroup.addLayer(plaineLayer);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

// Fichier GeoJSON - Les PAE d'Argenteuil
function styleContour3(feature) {
    return {
        color: 'green',
        weight: 2,
        opacity: 1,
    };
}

var paeLayerGroup = L.layerGroup();
fetch('Les_parcs_d_Activités_Economiques_à_Argenteuil.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier GeoJSON');
        }
        return response.json();
    })
    .then(data => {
        var paeLayer = L.geoJSON(data, {
            style: styleContour3,
            onEachFeature: function(feature, layer) {
                const zoneName = feature.properties.NOM_SECTEU;
                layer.on('click', function() {
                    layer.bindPopup(`<b>${zoneName}</b>`).openPopup();
                });
            }
        });
        paeLayerGroup.addLayer(paeLayer);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

// Fichier GeoJSON - Les QPV d'Argenteuil
function styleContour4(feature) {
    return {
        color: 'yellow',
        weight: 2,
        opacity: 1,
    };
}

var qpvLayerGroup = L.layerGroup();
fetch('quartiers_prioritaires.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier GeoJSON');
        }
        return response.json();
    })
    .then(data => {
        var qpvLayer = L.geoJSON(data, {
            style: styleContour4,
            onEachFeature: function(feature, layer) {
                const zoneName = feature.properties.nom_quartier;
                layer.bindPopup(`<b>${zoneName}</b>`);
            }
        });
        qpvLayerGroup.addLayer(qpvLayer);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

// Charger et afficher les collèges et lycées avec extraction des coordonnées GPS
var collegesLyceesLayer = L.layerGroup(); // Créer un groupe de couches pour les établissements
fetch('colleges_lycees.json')
    .then(response => {
        if (!response.ok) throw new Error("Erreur lors du chargement des données des collèges et lycées");
        return response.json();
    })
    .then(data => {
        var customIcon = L.icon({
            iconUrl: 'https://img.icons8.com/emoji/48/school-emoji.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        data.forEach(etablissement => {
            const { 
                Nom, 
                "Coordonnées GPS": coordonneesGPS, 
                "Temps de trajet (transports)": tempsTransports, 
                "Temps de trajet (à pieds)": tempsPieds, 
                "Remarques": remarques,
                "Formations d'intérêt" : formations
            } = etablissement;

            const [latitude, longitude] = coordonneesGPS.split(',').map(coord => parseFloat(coord.trim()));
            const marker = L.marker([latitude, longitude], { icon: customIcon });

            const popupContent = `
                <b>${Nom}</b><br>
                <b>Temps de trajet (transports) :</b> ${tempsTransports}<br>
                <b>Temps de trajet (à pieds) :</b> ${tempsPieds}<br>
                <b>Remarques :</b> ${remarques || 'Aucune'}<br>
                <b>Formations d'intérêt :</b> ${formations || 'Aucune'}
            `;
            marker.bindPopup(popupContent);
            collegesLyceesLayer.addLayer(marker); // Ajouter le marqueur au groupe de couches
        });
    })
    .catch(error => console.error('Erreur:', error));

// Charger et afficher les MQ et EJ avec extraction des coordonnées GPS
var mqejLayer = L.layerGroup(); // Créer un groupe de couches pour les établissements
fetch('MQ_EJ.json')
    .then(response => {
        if (!response.ok) throw new Error("Erreur lors du chargement des données des MQ et EJ");
        return response.json();
    })
    .then(data => {
        var customIcon = L.icon({
            iconUrl: 'https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/external-city-hall-city-scape-xnimrodx-lineal-color-xnimrodx.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        data.forEach(etablissement => {
            const { 
                Nom, 
                "Coordonnées GPS": coordonneesGPS, 
                "Temps de trajet (transports)": tempsTransports, 
                "Temps de trajet (à pieds)": tempsPieds, 
                "Remarques": remarques 
            } = etablissement;

            const [latitude, longitude] = coordonneesGPS.split(',').map(coord => parseFloat(coord.trim()));
            const marker = L.marker([latitude, longitude], { icon: customIcon });

            const popupContent = `
                <b>${Nom}</b><br>
                <b>Temps de trajet (transports) :</b> ${tempsTransports}<br>
                <b>Temps de trajet (à pieds) :</b> ${tempsPieds}<br>
                <b>Remarques :</b> ${remarques || 'Aucune'}
            `;
            marker.bindPopup(popupContent);
            mqejLayer.addLayer(marker); // Ajouter le marqueur au groupe de couches
        });
    })
    .catch(error => console.error('Erreur:', error));

// Charger et afficher les entreprises avec extraction des coordonnées GPS
var entreprisesLayer = L.layerGroup(); // Créer un groupe de couches pour les établissements
fetch('entreprises_argenteuillaises.json')
    .then(response => {
        if (!response.ok) throw new Error("Erreur lors du chargement des données des collèges et lycées");
        return response.json();
    })
    .then(data => {
        var customIcon = L.icon({
            iconUrl: 'https://img.icons8.com/color/48/factory.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        data.forEach(etablissement => {
            const { 
                Nom, 
                "Coordonnées GPS": coordonneesGPS, 
                "Temps de trajet (transports)": tempsTransports, 
                "Temps de trajet (à pieds)": tempsPieds, 
                "Activité" : activité
            } = etablissement;

            const [latitude, longitude] = coordonneesGPS.split(',').map(coord => parseFloat(coord.trim()));
            const marker = L.marker([latitude, longitude], { icon: customIcon });

            const popupContent = `
                <b>${Nom}</b><br>
                <b>Temps de trajet (transports) :</b> ${tempsTransports}<br>
                <b>Temps de trajet (à pieds) :</b> ${tempsPieds}<br>
                <b>Activité :</b> ${activité || 'Aucune'}
            `;
            marker.bindPopup(popupContent);
            entreprisesLayer.addLayer(marker); // Ajouter le marqueur au groupe de couches
        });
    })
    .catch(error => console.error('Erreur:', error));


// Ajouter une légende avec un contrôle interactif pour les différentes zones
var overlays = {
    "La Plaine d'Argenteuil": plaineLayerGroup,
    "Parcs d'Activités Économiques": paeLayerGroup,
    "Quartiers prioritaires": qpvLayerGroup,
    "Collèges et Lycées": collegesLyceesLayer,
    "Entreprises argenteuillaises": entreprisesLayer,
    "Vignes d'Argenteuil": vignesLayerGroup,
    "Maisons de quartier et Espaces jeunesse": mqejLayer
};

// Ajouter le contrôle de couches à la carte (couches visibles/cachées)
L.control.layers(null, overlays).addTo(map);

// Ajouter les groupes de couches à la carte
plaineLayerGroup.addTo(map);
paeLayerGroup.addTo(map);
vignesLayerGroup.addTo(map);
qpvLayerGroup.addTo(map);
collegesLyceesLayer.addTo(map);
entreprisesLayer.addTo(map);
mqejLayer.addTo(map); // Ajouter le groupe d'établissements à la carte

