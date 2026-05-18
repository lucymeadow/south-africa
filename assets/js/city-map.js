/* Renders a per-city map on each city page.
   Reads the city key from <div id="city-map" data-city="capetown">,
   filters assets/data/places.json to that city, and renders a small
   fit-to-bounds Leaflet map in the same style as the main map. */

(async function () {
  const mapEl = document.getElementById('city-map');
  if (!mapEl) return;
  const cityKey = mapEl.dataset.city;
  if (!cityKey) return;

  const res = await fetch('../assets/data/places.json');
  if (!res.ok) return;
  const data = await res.json();

  const city = data.cities[cityKey];
  if (!city) return;
  const places = data.places.filter(p => p.city === cityKey);
  if (!places.length) return;

  const catLabel = {
    stay: 'Stay',
    see: 'See',
    eat: 'Eat',
    do: 'Do',
    drink: 'Drink',
    neighborhood: 'Neighborhood'
  };

  function makeIcon(color) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
        <circle cx="11" cy="11" r="8" fill="${color}" stroke="#fff" stroke-width="2"/>
        <circle cx="11" cy="11" r="2.5" fill="#fff" opacity="0.9"/>
      </svg>`;
    return L.divIcon({
      html: svg,
      className: 'place-pin',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -11]
    });
  }

  function gmapsSearch(place, city) {
    const q = encodeURIComponent(`${place.name} ${city.name}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  const map = L.map('city-map', {
    scrollWheelZoom: false,
    zoomControl: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  const icon = makeIcon(city.color);
  const bounds = [];

  places.forEach(place => {
    const marker = L.marker([place.lat, place.lon], { icon });
    const cat = catLabel[place.category] || place.category;
    const officialUrl = place.url;
    const mapsUrl = gmapsSearch(place, city);
    const linkLine = officialUrl
      ? `<a href="${officialUrl}" target="_blank" rel="noopener">official site</a>
         &middot;
         <a href="${mapsUrl}" target="_blank" rel="noopener">Google Maps</a>`
      : `<a href="${mapsUrl}" target="_blank" rel="noopener">open in Google Maps</a>`;
    marker.bindPopup(
      `<span class="cat-tag" style="color:${city.color};">${cat}</span>
       <b>${place.name}</b>
       ${place.note || ''}
       <div class="popup-links">${linkLine}</div>`
    );
    marker.addTo(map);
    bounds.push([place.lat, place.lon]);
  });

  // Fit to all pins; cap zoom for sparse regions like the safari or
  // the Garden Route so we don't end up overly zoomed in on a cluster.
  map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
})();
