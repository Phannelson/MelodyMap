<script>
    import Navbar from '$lib/components/Navbar.svelte';
    export let title = 'Melody Map';

    import { browser } from '$app/environment';
    import pkg from 'ngeohash';
	const { encode } = pkg;

    const PUBLIC_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;
    const TICKETMASTER_API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

    let Map, Marker;
    let map_object; // the Google Maps object
    let map_element; // the DOM element

    const initialMapDisplayOptions = {
        zoom: 8,
        center: { lat: 35, lng: -110 },
        mapId: 'SAMPLE_MAP_ID'
    };

    if (browser) {
        // Ensure the Google Maps script is loaded before using any maps functionality
        loadGoogleMapsAPI().then(() => {
            map_element = document.getElementById('map');
            initializeMap();
        });
    }

    async function loadGoogleMapsAPI() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
            script.async = true;
            window.initMap = () => resolve();
            script.onerror = () => reject(new Error('Google Maps API failed to load'));
            document.head.appendChild(script);
        });
    }

    async function initializeMap() {
        await window.initMap; // Ensure the global initMap callback has been invoked
        Map = google.maps.Map;
        Marker = google.maps.Marker;

        map_object = new Map(map_element, initialMapDisplayOptions);
    }

    let lat, lng;

    function clearCoordinates() {
        lat = null;
        lng = null;
    }

    function get_current_position() {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;

            map_object.setCenter({ lat, lng });
            fetchMusicEvents(lat, lng);
        }, (error) => {
            console.error('Error getting current position:', error);
        });
    }

    function get_center() {
        clearCoordinates();
        const lat_lng_obj = map_object.getCenter();
        ({ lat, lng } = lat_lng_obj.toJSON());
    }

    function set_center() {
        console.log('Setting center to', lat, lng);
        map_object.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }

    function fetchMusicEvents(latitude, longitude) {
        const geoHash = calculateGeoHash(latitude, longitude);
        const concertEndpoint = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&keyword=music&radius=50&locale=*&geoPoint=${geoHash}`;

        fetch(concertEndpoint)
            .then(response => response.json())
            .then(data => {
                processConcertData(data);
            })
            .catch(error => {
                console.error('Error fetching concert data:', error);
            });
    }

    function calculateGeoHash(latitude, longitude) {
        return encode(latitude, longitude, 5); // GeoHash precision
    }

    let markerText = 'Marker';
    function create_marker(lat, lng, title) {
        new Marker({
            map: map_object,
            position: { lat: parseFloat(lat), lng: parseFloat(lng) },
            title: title
        });
    }

    function processConcertData(data) {
        if (!data || !data._embedded || !data._embedded.events) {
            console.error('No events found in the data.');
            return;
        }

        data._embedded.events.forEach(event => {
            const { venues } = event._embedded;
            if (venues && venues.length > 0) {
                const venue = venues[0];
                const latitude = parseFloat(venue.location.latitude);
                const longitude = parseFloat(venue.location.longitude);
                create_marker(latitude, longitude, event.name);
            }
        });
    }
</script>
<Navbar />

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div id="map-container">
    <div id="map"></div>
</div>

<br />
<label for="lat">Latitude:<input name="lat" type="text" bind:value={lat} /></label>
<label for="lng">Longitude:<input name="lng" type="text" bind:value={lng} /></label>
<br />
<button on:click={get_current_position}>Get Current Position</button>
<button on:click={get_center}>Get Map Center</button>
<button on:click={set_center}>Set Map Center</button>
<br />
<button on:click={() => create_marker(lat, lng, markerText)}>Create Marker</button>
<label for="markerText">Marker text:<input name="markerText" type="text" bind:value={markerText} /></label>

<style>
    #map {
        height: 600px;
    }
    #map-container {
        width: 80%;
        margin: auto;
    }
</style>