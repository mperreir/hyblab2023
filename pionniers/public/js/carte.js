'use strict';


/*
  ----------------------------------------------------------------------------------------------------------------------
  | Global variables                                                                                                   |
  ---------------------------------------------------------------------------------------------------------------------
 */
let selectedTopics = [];
let geographicalProfiles = [];
let usedKeywords = [];


/*
  ----------------------------------------------------------------------------------------------------------------------
  | Leaflet map management                                                                                             |
  ----------------------------------------------------------------------------------------------------------------------
 */

// Init of the TileLayer (Stamen Toner Lite)
const layer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});
// Init of the map (centered on France)
const map = new L.Map("map", {
    center: new L.LatLng(47.081012, 2.398782),
    zoom: 6,
    zoomControl: false
});
// Add the TileLayer to the map
map.addLayer(layer);
// Add listener to the map to update markers when the map is zoomed
map.on('zoomend', updateSelectedMarkersPosition);

/**
 * Create the marker icon for a profile
 * @param p The profile object
 * @returns {*} The marker icon
 */
function createIcon(p) {
    // Define the global icon size and global icon anchor
    let globalIconSize = isMobileDevice() ? [60, 60] : [20, 20];
    let globalIconAnchor = isMobileDevice() ? [30, 30] : [10, 10];
    if (getProfilsFav().includes(p.Id)) {
       globalIconSize = isMobileDevice() ? [90, 90] : [30, 30];
       globalIconAnchor = isMobileDevice() ? [45, 45] : [15, 15];
    }
    // Define the prefix for the icon url
    const iconUrlPrefix = getProfilsFav().includes(p.Id) ? '../img/pictogrammes_carte/favori_' : '../img/pictogrammes_carte/point_';
    // If the selected topics list is not empty and the profile doesn't contain all the selected topics, return the inactive icon
    if (selectedTopics.length > 0 && !selectedTopics.includes(translate(p.Topic))) {
        if (getProfilsFav().includes(p.Id)) {

        }
        return L.icon({
            iconUrl: iconUrlPrefix + 'inactif.svg',
            iconSize: globalIconSize,
            iconAnchor: globalIconAnchor
        });
    }
    // If the used keywords list is not empty and the profile doesn't contain at least one of the used keywords, return the inactive icon
    const usedKeywordsToLowerCase = usedKeywords.map(k => k.toLowerCase());
    if (usedKeywordsToLowerCase.length > 0 && !usedKeywordsToLowerCase.map(k => k.replace('#', '')).some(keyword => {
        const pKeywordsToLowerCase = p.Keywords.split(';').map(k => k.trim().toLowerCase());
        return pKeywordsToLowerCase.includes(keyword.toLowerCase());
    })) {
        return L.icon({
            iconUrl: iconUrlPrefix + 'inactif.svg',
            iconSize: globalIconSize,
            iconAnchor: globalIconAnchor
        });
    }
    if (getProfilsFav().includes(p.Id)) {

    }
    else {

    }
    switch (p.Topic) {
        case 'énergie':
            return L.icon({
                iconUrl: iconUrlPrefix + 'energie.svg',
                iconSize: globalIconSize,
                iconAnchor: globalIconAnchor
            });
        case 'alimentation':
            return L.icon({
                iconUrl: iconUrlPrefix + 'alimentation.svg',
                iconSize: globalIconSize,
                iconAnchor: globalIconAnchor
            });
        case 'industrie':
            return L.icon({
                iconUrl: iconUrlPrefix + 'industrie.svg',
                iconSize: globalIconSize,
                iconAnchor: globalIconAnchor
            });
        case 'économie circulaire':
            return L.icon({
                iconUrl: iconUrlPrefix + 'economie_circulaire.svg',
                iconSize: globalIconSize,
                iconAnchor: globalIconAnchor
            });
        case 'mobilité':
            return L.icon({
                iconUrl: iconUrlPrefix + 'mobilite.svg',
                iconSize: globalIconSize,
                iconAnchor: globalIconAnchor
            });
        case 'numérique':
            return L.icon({
                iconUrl: iconUrlPrefix + 'numerique.svg',
                iconSize: globalIconSize,
                iconAnchor: globalIconAnchor
            });
    }
}


/**
 * Update the map with the selected topics and keywords
 */
function updateMap() {
    getProfiles("true/true/true/true/true/true").then(r => {
        // Markers of previous geographical profiles removal
        geographicalProfiles.forEach(gp => {
            gp.marker.remove();
        });
        // Update the geographical profiles
        geographicalProfiles = r;
        addMarkers().then(() => {
            console.log("Markers added !");
            updateSelectedMarkersPosition();
        });
    });
}


/**
 * Update the z-index of each marker (markers corresponding to the selected topics and keywords are displayed on top of the others)
 */
function updateSelectedMarkersPosition() {
    // Retrieve each image of a marker
    const images = document.querySelectorAll(".leaflet-marker-icon");
    // For each image, if src attribute contains "point_inactif", set the z-index to 0, otherwise set it to 1000
    images.forEach(i => {
        if (i.src.includes("point_inactif")) {
            i.style.zIndex = 0;
        } else {
            i.style.zIndex = 1;
        }
    });
}


/**
 * Add markers on the map for each profile
 * @returns {Promise<void>} Nothing
 */
async function addMarkers() {
    // Add a marker for each profile
    geographicalProfiles.forEach(gp => {
        gp.marker = L.marker([gp.Lat, gp.Long], {icon: createIcon(gp)}).addTo(map);
        gp.marker.addEventListener('click', () => {
            displayMiniature(gp.Id);
        });
    });
}


/*
  ----------------------------------------------------------------------------------------------------------------------
  | Miniatures management                                                                                              |
  ----------------------------------------------------------------------------------------------------------------------
 */
/**
 * Get the miniature related to the given Id
 * @param Id The Id of the miniature to retrieve
 * @returns {Promise<any>} The miniature
 */
async function getMiniature(Id) {
    // Fetch the data from the API
    const response = await fetch("../api/miniature/" + Id);
    // Parse the response as JSON and return it
    return await response.json();
}


/**
 * Display the miniature related to the given Id
 * @param Id The Id of the miniature to display
 */
function displayMiniature(Id){
    getMiniature(Id).then(p => {
        // Display the miniature related part
        const miniature_related = document.querySelector("main div#miniature-related");
        miniature_related.classList.remove("display-none");
        // Retrieve the miniature content
        const miniature_content = document.querySelector("main div#miniature-related div#miniature-content");
        // Retrieve the font class of the miniature content
        const font_class = getFontClass(translate(p.Topic));
        // Create the associated HTML elements
        // Update the miniature content inner HTML
        miniature_content.innerHTML = `
                    <section class="photo-case">
                        <img draggable="false" alt="photo-profil" src="${p.URLImage}" style="object-position: 50% ${p.HeightShiftImage}%;">
                    </section>
                    <section class="information-fiche flex-column justify-content-space-evenly">
                        <section class="carte-identite flex-column align-items-center-flex-start ${font_class}">
                            <p class="gras">${p.Name}</p>
                            <p class="gras">${p.Age}</p>
                        </section>
                        <section class="entreprise-info">
                            <p class="gras">${p.Status}</p>
                            <p class="gras">${p.Company}</p>
                            <p>${p.City}</p>
                            <p>${p.MiniBio}</p>
                        </section>
                        <section class="keywords flex-row">
                            <!-- Section qui va se remplir dans la suite de la fonction -->
                        </section>
                        <section class="topic flex-row align-items-center">
                            <img src="../img/pictogrammes_themes/${translate(p.Topic)}.svg" alt="${p.Topic}">
                            <p class="${font_class} gras">${capitalizeFirstLetter(p.Topic)}</p>
                        </section>
                    </section>
        `;
        miniature_related.setAttribute("identifier", p.Id);
        // Retrieve the keywords section
        const keywordSection = miniature_content.querySelector("section.keywords");
        // Add the keywords (if any non empty keyword is present)
        p.Keywords.split(';').forEach(k => {
            if(k.trim() === '') {
                return;
            }
            keywordSection.append(createKeywordItem(k));
        });
        // Retrieve the close button
        const closeButton = document.querySelector("main div#miniature-related img#fermeture-miniature");
        // Add the event listener to close the miniature and undisplay the miniature related part
        closeButton.addEventListener('click', () => {
            miniature_related.classList.add("display-none");
        });
        // Retrieve the button to see the full profile
        const seeFullProfileButton = document.querySelector("main div#miniature-related button#seeFillProfile");
        // Add the current profile Id to the local storage
        window.localStorage.setItem('idProfil', Id);
        // Add the event listener to redirect to the full profile page
        seeFullProfileButton.addEventListener('click', () => {
            window.location.href = "profils.html";
        });
    });
}

/**
 * Creates a HTML keyword element from a string
 * @param Keyword {string} the keyword
 * @returns {ChildNode} Node HTML
 */
function createKeywordItem(Keyword) {
    const htmlString = `<div class="keyword-item flex-row align-items-center">
                            <p>#${Keyword}</p>
                        </div>`;
    return createElementFromHTML(htmlString);
}


/*
  ----------------------------------------------------------------------------------------------------------------------
  | Topics selection management                                                                                        |
  ----------------------------------------------------------------------------------------------------------------------
 */

/**
 * Get the profiles from the API
 * @param apiParameters The parameters to send to the API
 * @returns {Promise<any>} The profiles as a JSON object
 */
async function getProfiles(apiParameters) {
    // Fetch the data from the API
    const response = await fetch("../api/map/topics/" + apiParameters);
    // Parse the response as JSON and return it
    return await response.json();
}


/**
 * Event handler for the topics checkboxes
 * @param event The event object
 */
function onTopicCheck(event) {
    // Retrieve the image element (HTML tag) from the event
    const topicImg = event.target;
    // Retrieve the topic string from the alt attribute of the image
    const topicString = topicImg.getAttribute('alt');
    // Alter the list of selected topics depending on the state of the checkboxes and add/remove the "unchecked" class
    if (topicImg.classList.contains("unchecked")) {
        topicImg.classList.remove("unchecked");
        selectedTopics.push(topicString);
        // Update the localStorage
        localStorage.setItem("themes", selectedTopics.join(','));
    } else {
        // If the selected topics array has length 1, do not remove the topic
        if (selectedTopics.length === 1) {
            // Display the overlay
            const overlay = document.querySelector("main div#overlay");
            overlay.classList.remove("display-none");
            // Display the popup
            const popup = document.querySelector("main div#popup");
            popup.classList.remove("display-none");
            return;
        }
        topicImg.classList.add("unchecked");
        // Splice the array to remove the item (only if the item is found)
        const indexToRemove = selectedTopics.indexOf(topicString);
        if (indexToRemove > -1) {
            selectedTopics.splice(indexToRemove, 1);
        }
        // Update the localStorage
        localStorage.setItem("themes", selectedTopics.join(','));
        // Retrieve the selected-keywords-list element
        const selectedKeywordsList = document.querySelector('#selected-keywords-list');
        // Retrieve the selected keywords
        const selectedKeywords = selectedKeywordsList.querySelectorAll('div.keyword-item p');
        // Provide the list of selected keywords (without the "Ajouter" element)
        const selectedKeywordsListWithoutAdd = Array.from(selectedKeywords).slice(0, selectedKeywords.length - 1);
        // Map the selected keywords by withdrawing the # character
        const selectedKeywordsMap = Array.from(selectedKeywordsListWithoutAdd).map(k => k.textContent.substring(1));
        // Fetch the keywords corresponding to the selected topics
        getKeywords().then(keywords => {
            // Transform keywords to lowercase
            keywords = keywords.map(k => k.toLowerCase());
            // For each keyword in selectedKeywordsMap, if it is not in keywords
            selectedKeywordsMap.forEach(k => {
                k = k.toLowerCase();
                if (!keywords.includes(k)) {
                    // Retrieve the instance of the keyword in the selected keywords list
                    for (let i = 0; i < selectedKeywordsList.children.length; i++) {
                        const keywordItem = selectedKeywordsList.children[i];
                        if (keywordItem.textContent === "#" + k) {
                            // Remove the keyword from the selected keywords list
                            selectedKeywordsList.removeChild(keywordItem);
                            // Remove the keyword from the used keywords js list
                            usedKeywords.splice(usedKeywords.indexOf(k), 1);
                            break;
                        }
                    }
                }
            });
        });
    }
    updateMap();
}


/**
 * Build the API parameters from the selected topics
 * @returns {string} The API parameters
 */
function buildApiParameters() {
    const topics = ["alimentation", "economie_circulaire", "energie", "industrie", "mobilite", "numerique"]
    let apiString = "";
    topics.forEach(t => {
        apiString += selectedTopics.includes(t) ? "true" : "false";
        apiString += "/";
    });
    return apiString;
}


/**
 * Get the keywords from the API
 * @returns {Promise<any>} The keywords as a JSON object
 */
async function getKeywords() {
    // Fetch the data from the API
    const response = await fetch("../api/map/keywords/" + buildApiParameters());
    // Parse the response as JSON and return it
    return await response.json();
}


/**
 * Reorder the keywords in the available-keywords-list element
 */
function reorderKeywords() {
    // Retrieve the available-keywords-list element
    const availableKeywordsList = document.querySelector('#available-keywords-list');
    // Retrieve the keywords elements
    const keywordsElements = availableKeywordsList.querySelectorAll('.keyword-item');
    // Retrieve the keywords elements as an array
    const keywordsElementsArray = Array.from(keywordsElements);
    // Sort the keywords elements by text
    keywordsElementsArray.sort((a, b) => {
        const aText = a.querySelector('p').innerHTML;
        const bText = b.querySelector('p').innerHTML;
        return aText.localeCompare(bText);
    });
    // Remove all the keywords elements from the father node
    keywordsElementsArray.forEach(k => {
        availableKeywordsList.removeChild(k);
    });
    // Add the keywords elements to the father node in the correct order
    keywordsElementsArray.forEach(k => {
        availableKeywordsList.appendChild(k);
    });
}


/**
 * Event handler for the used keywords
 * @param event The event object
 */
function onUsedKeywordClick(event) {
    // Retrieve the div element (HTML tag) from the event
    const keywordElement = event.currentTarget;
    // Retrieve the associated text
    const keywordText = keywordElement.querySelector('p').innerHTML;

    // Remove the k-selected class to the keyword element
    keywordElement.classList.remove('k-selected');
    // Remove the keyword from the list of used keywords
    const indexToRemove = usedKeywords.indexOf(keywordText);
    if (indexToRemove > -1) {
        usedKeywords.splice(indexToRemove, 1);
    }
    // Retrieve the selected-keywords-list element
    const selectedKeywordsList = document.querySelector('#selected-keywords-list');
    // Remove the keyword element from the father node
    selectedKeywordsList.removeChild(keywordElement);
    // Remove the used event listener
    keywordElement.removeEventListener('click', onUsedKeywordClick);

    // Retrieve the available-keywords-list element
    const availableKeywordsList = document.querySelector('#available-keywords-list');
    // Add the keyword element to the father node
    availableKeywordsList.appendChild(keywordElement);
    // Add the event listener to the keyword element
    keywordElement.addEventListener('click', onAvailableKeywordClick);

    // Reorder the keywords
    reorderKeywords();

    // Retrieve the keyword management p element
    const keywordManageText = document.querySelector('section.keywords #keyword-manage p');
    // Process map update only if the manage button is in the "Ajouter" state
    if (keywordManageText.innerHTML === 'Ajouter') {
        // Update the map
        updateMap();
    }
}


/**
 * Event handler for the available keywords
 * @param event The event object
 */
function onAvailableKeywordClick(event) {
    // Retrieve the div element (HTML tag) from the event
    const keywordElement = event.currentTarget;
    // Retrieve the associated text
    const keywordText = keywordElement.querySelector('p').innerHTML;

    // Retrieve the keywords list element
    const keywordsList = document.querySelector('#available-keywords-list');
    // Remove the keyword element from the father node
    keywordsList.removeChild(keywordElement);

    // Add the keyword to the list of used keywords
    usedKeywords.push(keywordText);
    // Add selected class to the keyword element
    keywordElement.classList.add('k-selected');
    // Retrieve the selected-keywords-list element
    const selectedKeywordsList = document.querySelector('#selected-keywords-list');
    // Add the keyword element to the selected-keywords-list
    selectedKeywordsList.appendChild(keywordElement);
    // Add the event listener to the keyword element
    keywordElement.addEventListener('click', onUsedKeywordClick);
    // Remove the available event listener
    keywordElement.removeEventListener('click', onAvailableKeywordClick);

    // Move the manage button to the end of the list
    const keywordManage = document.querySelector('#keyword-manage');
    selectedKeywordsList.appendChild(keywordManage);
}


/**
 * Event handler for the keyword management button
 */
function onKeywordManage() {
    // Retrieve the keyword management p element
    const keywordManageText = document.querySelector('section.keywords #keyword-manage p');
    // Process different behavior depending on the text of the keyword management element
    if (keywordManageText.innerHTML === 'Ajouter') {
        getKeywords().then(keywords => {
            // Retrieve the keywords list and reset it
            const keywordsList = document.querySelector('#available-keywords-list');
            keywordsList.innerHTML = '';
            // Set the keyword list as visible
            keywordsList.classList.remove('display-none');
            // Filter the keywords to keep only the ones that are not already used
            const usedKeywordsToLowerCase = usedKeywords.map(k => k.toLowerCase());
            keywords = keywords.filter(k => !usedKeywordsToLowerCase.includes('#' + k.toLowerCase()));
            // For each keyword, create the available keyword element as HTML
            keywords.forEach(k => {
                // Create the keyword element
                const keywordDiv = document.createElement('div');
                keywordDiv.classList.add('keyword-item');
                keywordDiv.classList.add('flex-row');
                keywordDiv.classList.add('align-items-center');
                keywordDiv.classList.add('cursor-pointer');
                keywordDiv.innerHTML = `<p>#${k.toLowerCase()}</p>`;
                // Add the keyword element as a child of the keywords list
                keywordsList.appendChild(keywordDiv);
                // Add the event listener to the keyword element
                keywordDiv.addEventListener('click', onAvailableKeywordClick);
            });

            // Change the keyword management text
            keywordManageText.innerHTML = 'Fermer';
        });
    } else {
        // Retrieve the keywords list
        const keywordsList = document.querySelector('#available-keywords-list');
        // Set the keyword list as invisible
        keywordsList.classList.add('display-none');
        // Change the keyword management text
        keywordManageText.innerHTML = 'Ajouter';
        // Update the map
        updateMap();
    }
}


/*
  ----------------------------------------------------------------------------------------------------------------------
  | Utility functions                                                                                                  |
  ----------------------------------------------------------------------------------------------------------------------
 */
/**
 * Translate the topic from French to English (To support both database name and img alt attribute)
 * @param topic The topic to translate
 * @returns {string} The translated topic
 */
function translate(topic) {
    topic = topic.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    topic = topic.replace(/\s/g, '_');
    return topic;
}

/**
 * Get the font class corresponding to the topic
 * @param topic {string} The topic to get the font class
 * @returns {string} The font class
 */
function getFontClass(topic) {
    switch (topic) {
        case 'alimentation' :
            return 'orange-font';
        case 'economie_circulaire' :
            return 'caca-doie-font';
        case 'energie' :
            return 'vert-font';
        case 'industrie' :
            return 'turquoise-font';
        case 'mobilite' :
            return 'cyan-font';
        case 'numerique' :
            return 'bleu-clair-font';
    }
}

/*
  ----------------------------------------------------------------------------------------------------------------------
  | Device detection                                                                                                   |
  ----------------------------------------------------------------------------------------------------------------------
 */
/**
 * Check if the device is a mobile device
 * @returns {boolean} True if the device is a mobile device, false otherwise
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


/*
  ----------------------------------------------------------------------------------------------------------------------
  | Entry point of the file                                                                                            |
  ----------------------------------------------------------------------------------------------------------------------
 */
/**
 * Add the event listener to manage interaction (click) with the topics checkboxes
 */
document.addEventListener("DOMContentLoaded", function () {
    // Topics management
    const topicCheckboxes = document.querySelectorAll('#theme-selector #theme-list li');
    topicCheckboxes.forEach(tc =>
        tc.addEventListener('click', onTopicCheck)
    );
    // Update the topics list from the selection of the previous page
    selectedTopics = window.localStorage.getItem('themes');
    selectedTopics = selectedTopics ? selectedTopics.split(',') : ['alimentation', 'economie_circulaire', 'energie', 'industrie', 'mobilite', 'numerique'];
    // Remove the "unchecked" class from the selected topics
    topicCheckboxes.forEach(tc => {
        const img = tc.querySelector('img');
        if (selectedTopics.includes(img.getAttribute('alt'))) {
            img.classList.remove('unchecked');
        }
    });
    // Keywords management
    const keywordManageButton = document.querySelector('section.keywords #keyword-manage');
    keywordManageButton.addEventListener('click', onKeywordManage);
    // Associate the close button to the close function for the popup
    const closeButton = document.querySelector('main div#popup img#fermeture-popup');
    closeButton.addEventListener('click', () => {
        // Undisplay the overlay
        document.querySelector('main div#overlay').classList.add('display-none');
        // Undisplay the popup
        document.querySelector('main div#popup').classList.add('display-none');
    });
    // Manage the swipe action on the miniature
    const miniature = document.querySelector('main div#miniature-related');
    const hammer = new Hammer(miniature);
    hammer.add(new Hammer.Pan({
        position: Hammer.position_ALL,
        threshold: 0
    }));
    hammer.on('pan', onPan);
    // Change the page when clicking on the folder
    const folder_front = document.querySelector('div#folder-front-pane');
    const folder_back = document.querySelector('footer#folder-back-pane');
    folder_front.addEventListener('click', () => {
        window.location.href = './profils-enregistres.html';
        window.localStorage.setItem('pagePrecedente', "carte");
    });
    folder_back.addEventListener('click', () => {
        window.location.href = './profils-enregistres.html';
        window.localStorage.setItem('pagePrecedente', "carte");
    });
    // Update the folder number of favorite profiles
    updateFolder();
    // Update the map
    updateMap();
});

/*
  ----------------------------------------------------------------------------------------------------------------------
  | Swipe action management                                                                                            |
  ----------------------------------------------------------------------------------------------------------------------
 */
/**
 * Manage the swipe action on the miniature
 * @param e The event
 */
function onPan(e) {
    const miniature = document.querySelector('main div#miniature-related');
    // Remove transition properties
    miniature.style.transition = null;
    // Get miniature coordinates
    let style = window.getComputedStyle(miniature);
    let mx = style.transform.match(/^matrix\((.+)\)$/);
    let startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
    let startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;
    // Get top card bounds
    let bounds = miniature.getBoundingClientRect();
    // Get finger position on top card, top (1) or bottom (-1)
    let isDraggingFrom = (e.center.y - bounds.top) > miniature.clientHeight / 2 ? -1 : 1;
    // Get new coordinates
    let posX = e.deltaX + startPosX;
    let posY = e.deltaY + startPosY;
    // Get ratio between swiped pixels and the axes
    let propX = e.deltaX / miniature.clientWidth;
    let propY = e.deltaY / miniature.clientHeight;
    // Get swipe direction, left (-1) or right (1)
    let dirX = e.deltaX < 0 ? -1 : 1;
    // Get degrees of rotation, between 0 and +/- 45
    let deg = isDraggingFrom * dirX * Math.abs(propX) * 45;

    let successful = false;
    // Check if the card is dragged down
    if (propY < 30 && e.direction === Hammer.DIRECTION_DOWN) {
        successful = true;
        // Get top border position
        posY = +(miniature.clientHeight + miniature.clientHeight);
    }
    if (e.isFinal && successful) {
        let start = null;
        let duration = 1000; // 1 second
        const folder_front = document.querySelector('div#folder-front-pane');
        folder_front.classList.add('open-folder-animation');
        function animation(timestamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            let translateY = posY * (progress / duration);
            miniature.style.transform = `translateX(${posX}px) translateY(${translateY}px) rotate(${deg}deg)`;
            if (progress < duration) {
                requestAnimationFrame(animation);
            } else {
                // Undisplay the miniature
                miniature.classList.add("display-none");
                miniature.style.transform = null;
                // Update the map
                updateMap();
                // Add the Id of the related profile to the local storage
                const Id = miniature.getAttribute('identifier');
                pushProfilFav(Id);
                // Stop the folder animation
                folder_front.classList.remove('open-folder-animation');
                // Update the folder number of favorite profiles
                updateFolder();
            }
        }
        requestAnimationFrame(animation);
    }
}


/**
 * Update the folder number of favorite profiles
 */
function updateFolder() {
    const favProfilesNumberText = document.querySelector('footer#folder-back-pane div#folder-tab-map span#nombre-profil');
    const favProfilesIds = getProfilsFav();
    let favProfilesNumber = favProfilesIds.length;
    favProfilesNumberText.innerHTML = favProfilesNumber > 0 ? favProfilesNumber.toString() : "";
}