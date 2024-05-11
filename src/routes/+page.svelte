<script>
    import Navbar from '$lib/components/Navbar.svelte';
    export let title = 'Melody Map';

    import { browser } from '$app/environment';
    import pkg from 'ngeohash';
	const { encode } = pkg;

    const PUBLIC_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY;
    const TICKETMASTER_API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

	

    let Map, Marker, InfoWindow;
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
		InfoWindow = google.maps.InfoWindow;

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
        fetchMusicEvents(lat, lng).then((data) => {
            processConcertData(data);
            updateConcertList(data);
        });
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
				updateConcertList(data);
            })
            .catch(error => {
                console.error('Error fetching concert data:', error);
            });
    }

    function calculateGeoHash(latitude, longitude) {
        return encode(latitude, longitude, 5); // GeoHash precision
    }

	let selectedEventDetails = null;

	// Define an array to store concert markers
	let concertMarkers = [];

	function create_marker(lat, lng, event) {
        const marker = new Marker({
            map: map_object,
            position: { lat, lng },
            title: event.name
        });

        marker.addListener('click', () => {
        const infoWindowContent = document.createElement('div');
		infoWindowContent.className = 'event-details'; // Apply the event-details class

        const title = document.createElement('h3');
        title.textContent = event.name;

        const startDate = document.createElement('p');
        startDate.textContent = event.dates.start.localDate;

        const venueName = document.createElement('p');
        venueName.textContent = event._embedded.venues[0].name;

		const address = document.createElement('p');
		address.textContent = event._embedded.venues[0].address.line1;

		const info = document.createElement('p');
        info.textContent = event.info;


        infoWindowContent.appendChild(title);
        infoWindowContent.appendChild(startDate);
        infoWindowContent.appendChild(venueName);
		infoWindowContent.appendChild(address);
		infoWindowContent.appendChild(info);

        const infoWindow = new InfoWindow({
            content: infoWindowContent
        });
        infoWindow.open(map_object, marker);

            selectedEventDetails = event; // For use in a detailed view if needed
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
                create_marker(latitude, longitude, event);
            }
        });
    }

	function updateConcertList(data) {
  const concertListElement = document.getElementById('concert-list-items');
  concertListElement.innerHTML = ''; // Clear previous list

  const uniqueEventNames = new Set();

  data._embedded.events.forEach((event, index) => {
    if (!uniqueEventNames.has(event.name)) {
      const concertItem = document.createElement('li');
	  concertItem.className = 'concert-item';
		
      const eventName = document.createElement('h2');
      eventName.textContent = event.name; // Set event name as text content
      concertItem.appendChild(eventName); // Add bold event name to li element

      const eventDetailDiv = document.createElement('div');
      eventDetailDiv.className = 'event-details';

      const startDate = document.createElement('p');
      startDate.textContent = `Date: ${event.dates.start.localDate}`;
      eventDetailDiv.appendChild(startDate);

      const venueName = document.createElement('p');
      venueName.textContent = `Venue: ${event._embedded.venues[0].name}`;
      eventDetailDiv.appendChild(venueName);

      const startDateTime = document.createElement('p');
      startDateTime.textContent = `Time: ${event.dates.start.localTime}`;
      eventDetailDiv.appendChild(startDateTime);

	  const address = document.createElement('p');
	  address.textContent = `Address: ${event._embedded.venues[0].address.line1}`;
	  eventDetailDiv.appendChild(address);

      concertItem.appendChild(eventDetailDiv);
      concertListElement.appendChild(concertItem);
      uniqueEventNames.add(event.name);
    }
  });
}

</script>
<Navbar />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet">

<svelte:head>
    <title>{title}</title>
</svelte:head>
<div id="map-container">
    <div id="map"></div>
</div>

<br />

	<div class="input-container">
		<label for="lat">Latitude:</label>
		<input name="lat" type="text" bind:value={lat} />
		<label for="lng">Longitude:</label>
		<input name="lng" type="text" bind:value={lng} />
	</div>

<button id="currentPositionBtn" on:click={get_current_position}>Get Current Position</button>
<button id="mapCenterBtn" on:click={get_center}>Get Map Center</button>
<button id="setCenterBtn" on:click={set_center}>Set Map Center</button>
<button id="createMarkerBtn" on:click={() => fetchMusicEvents(lat, lng).then((event) => create_marker(lat, lng, event))}>Create Marker</button>


{#if selectedEventDetails}
	<div class="event-details">
		<h2>{selectedEventDetails.name}</h2>
		<p>Date: {selectedEventDetails.dates.start.localDate}</p>
		<p>Venue: {selectedEventDetails._embedded.venues[0].name}</p>
		<p>Address: {selectedEventDetails._embedded.venues[0].address.line1}</p>
v		<p>Info: {selectedEventDetails.info}</p>
		<img src={selectedEventDetails.images[0].url} alt={selectedEventDetails.name} style="width: 100%; max-width: 300px;">
		<p><a href={selectedEventDetails.url} target="_blank">More Info</a> </p>
	</div>	
{/if}

<!-- div for the concert list -->
<div id="concert-list">
	<h2>Concerts</h2>
	<ul id="concert-list-items"></ul>
  </div>


<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

	:global {
  body {
    background-color: #f0f0f0; /* Light blue */
  }
}
	.input-container {
        margin-bottom: 10px;
    }

    .input-container label {
        width: 60px;
        text-align: right;
    }

    .input-container input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
		margin-right: 36px;
    }

    /* Optional: Style for labels */
    .input-container label {
        font-size: 16px;
        color: #333;
    }
	
    #map {
        height: 600px;
		margin-right: 20px;
		border-radius: 10px;
		margin-top: 10px;
    }
    #map-container {
        width: 80%;
		position: relative;
    }
		/* Style the buttons */
	#currentPositionBtn,
	#mapCenterBtn,
	#setCenterBtn,
	#createMarkerBtn {
		text-align: center;
		margin: 5px;
		padding: 10px 20px;
		background-color: #61b0ff; /* Blue background */
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease;
	}

	/* Hover effect */
	#currentPositionBtn:hover,
	#mapCenterBtn:hover,
	#setCenterBtn:hover,
	#createMarkerBtn:hover {
		background-color: #4aa0f7; /* Darker blue */
	}

    /* Container style */
.event-details {
    /* border: 2px solid #BCD8C1; */
    border-radius: 5px;
    box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.1);
	position: absolute;
	transform: translate(12%, 5%);
	width: 1000px;
	padding: 20px;
    background-color: #252826;
}

/* Center align all text content */
.event-details * {
	text-align: center;
	color:#fff
}

/* Style the image */
.event-details img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
}

/* Style the title */
.event-details h2 {
	font-family: "Poetsen One", sans-serif;
    color: #fff; 
    font-size: 24px;
    margin-bottom: 10px;
}

/* Style the description paragraphs */
.event-details p {
    line-height: 1.6;
    margin-bottom: 10px;
	font-family: 'Poppins', sans-serif;
}

/* Style the anchor links */
.event-details a {
    display: inline-block;
    margin-top: 15px;
    padding: 8px 20px;
    background-color: #007bff; /* Blue background color */
    color: #fff; /* White text color */
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

/* Hover effect for anchor links */
.event-details a:hover {
    background-color: #0056b3; /* Darker blue */
}


/* Style the concert list */
#concert-list {
  margin-top: 45px;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  width: 260px; /* Adjust the width as needed */
  position: absolute;
  right: 0;
  top: 50px;
  margin-right: 5px;
  background-color: #fff;
  
}

#concert-list ul {
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 530px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-radius: 0 0 8px 8px;
  font-size: 16px;
}

/* Style the concert list header */
#concert-list h2 {
  text-align: center;
  color: #252826;
  font-family: 'Lato', sans-serif;
  margin: 0;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>