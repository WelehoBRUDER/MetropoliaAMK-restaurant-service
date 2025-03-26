export const getGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      if (pos.coords) {
        return [pos.coords.latitude, pos.coords.longitude];
      }
    });
  }
  return [60.175, 24.95];
};
