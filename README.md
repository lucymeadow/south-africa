# South Africa Travel Guide

A static site with recommendations from 14 days in South Africa
(Nov 2017) — Johannesburg, &Beyond Ngala Safari, Cape Town,
Stellenbosch, and the Garden Route.

Live: <https://lucymeadow.github.io/south-africa/>

## What's here

- `index.html` — overview and region cards
- `cities/` — one page per region (Johannesburg, Greater Kruger,
  Cape Town, Stellenbosch, Garden Route)
- `itinerary.html` — day-by-day pacing reference
- `map.html` — interactive Leaflet map of every visited place
- `logistics.html` — flights, rentals, SIM, malaria, and rough budget
- `photos.html` — gallery, sourced from Lucy Meadow Photography
- `assets/` — CSS, the map JS, and the curated places JSON

No build step. It's plain HTML, CSS, and one small JS file. Edit any
page in place and push to update.

## Editing places on the map

All map pins are sourced from `assets/data/places.json`. Add, edit, or
remove an entry there and the map updates on next page load. Each
place has:

```json
{
  "city":     "capetown",              // matches a key under "cities"
  "category": "eat",                   // stay | see | eat | do | drink | neighborhood
  "name":     "The Codfather",
  "url":      "https://codfather.co.za/",
  "lat":      -33.9541778,
  "lon":      18.377391,
  "note":     "Optional one-line note shown in the popup."
}
```

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Credit

- Map tiles: [Carto Voyager](https://carto.com/attributions)
- Map data: [OpenStreetMap](https://www.openstreetmap.org/copyright)
- Map library: [Leaflet](https://leafletjs.com)
- Fonts: DM Serif Display, Inter (Google Fonts)
- Photos: [Lucy Meadow Photography](https://lucyjacobsonmeadowphotography.com/#south-africa)
