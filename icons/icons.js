const mapIcons = {
  restaurant: L.icon({
    iconUrl: "icons/restaurant_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
    shadowUrl: "icons/restaurant_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",

    iconSize: [30, 30], // size of the icon
    shadowSize: [1, 1], // size of the shadow
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0], // the same for the shadow
    popupAnchor: [-3, -30], // point from which the popup should open relative to the iconAnchor
  }),
  selected: L.icon({
    iconUrl: "icons/restaurant_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24_blue.png",
    shadowUrl: "icons/restaurant_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",

    iconSize: [40, 40], // size of the icon
    shadowSize: [1, 1], // size of the shadow
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0], // the same for the shadow
    popupAnchor: [-3, -30], // point from which the popup should open relative to the iconAnchor
  }),
  favorite: L.icon({
    iconUrl: "icons/star_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
    shadowUrl: "icons/restaurant_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",

    iconSize: [30, 30], // size of the icon
    shadowSize: [1, 1], // size of the shadow
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0], // the same for the shadow
    popupAnchor: [-3, -30], // point from which the popup should open relative to the iconAnchor
  }),
  favoriteSelected: L.icon({
    iconUrl: "icons/star_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24_blue.png",
    shadowUrl: "icons/restaurant_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",

    iconSize: [40, 40], // size of the icon
    shadowSize: [1, 1], // size of the shadow
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0], // the same for the shadow
    popupAnchor: [-3, -30], // point from which the popup should open relative to the iconAnchor
  }),
};

export {mapIcons};
