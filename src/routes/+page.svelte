<script>
	import { browser } from '$app/environment';
	// this is not really public. but since it must be used on the client,
	// it needs to be restricted via the Cloud Console (probably by domain)
	
	// import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
	const PUBLIC_GOOGLE_MAPS_API_KEY = 'AIzaSyC36so9VWdytxATiPdwbwR7izt-Uqz7OZE';


	// Dynamically loaded constructors from Google Maps API
	let Map;
	let Marker;

	let map_object; // the Google Maps object
	let map_element; // the DOM element

	const initialMapDisplayOptions = {
		zoom: 8,
		center: { lat: 35, lng: -110 },
		mapId: 'SAMPLE_MAP_ID'
	};

	// "document" only exists in the browser; maps are client-side only
	if (browser) {
		((g) => { var h, a, k, p = 'The Google Maps JavaScript API', c = 'google', l = 'importLibrary', q = '__ib__', m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement('script')); e.set('libraries', [...r] + ''); for (k in g) e.set( k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()), g[k] ); e.set('callback', c + '.maps.' + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => (h = n(Error(p + ' could not load.'))); a.nonce = m.querySelector('script[nonce]')?.nonce || ''; m.head.append(a); })); d[l] ? console.warn(p + ' only loads once. Ignoring:', g) : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))); })({
			key: PUBLIC_GOOGLE_MAPS_API_KEY,
			v: 'weekly'
		});
		map_element = document.getElementById('map');

		(async () => {
			({ Map } = await google.maps.importLibrary('maps'));
			({ Marker } = await google.maps.importLibrary('marker'));

			map_object = new Map(map_element, initialMapDisplayOptions);
		})();
	}

	let lat;
	let lng;
	function get_current_position() {
		navigator.geolocation.getCurrentPosition((position) => {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
		});
	}
	function get_center() {
		const lat_lng_obj = map_object.getCenter();
		({ lat, lng } = lat_lng_obj.toJSON());
	}
	function set_center() {
		console.log('Setting center to', lat, lng);
		map_object.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
	}

	let markerText = 'Hello, World!';
	function create_marker() {
		const marker = new Marker({
			map: map_object,
			position: { lat: parseFloat(lat), lng: parseFloat(lng) },
			title: markerText
		});
	}
</script>

<div id="map"></div>
<br />
<label for="lat">Latitude:<input name="lat" type="text" bind:value={lat} /></label>
<label for="lng">Longitude:<input name="lng" type="text" bind:value={lng} /></label>
<br />
<button on:click={() => get_current_position()}>Get Current Position</button>
<button on:click={() => get_center()}>Get Map Center</button>
<button on:click={() => set_center()}>Set Map Center</button>
<br />
<button on:click={() => create_marker()}>Create Marker</button>
<label for="markerText"
	>Marker text:<input name="markerText" type="text" bind:value={markerText} /></label
>

<style>
	#map {
		height: 600px;
	}
</style>
