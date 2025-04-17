# MetropoliaAMK-restaurant-service
 ## [Link to hosted site](https://users.metropolia.fi/~juhanaha/web-development/MetropoliaAMK-restaurant-service/index.html)

## Overview
[![CodeFactor](https://www.codefactor.io/repository/github/welehobruder/metropoliaamk-restaurant-service/badge)](https://www.codefactor.io/repository/github/welehobruder/metropoliaamk-restaurant-service)

This application is a simple student restaurant service where users can find their nearest restaurant or filter restaurants by their parent company and location. The application shows each restaurant's weekly menu and address. Other features include user authentication, profile management and favourites list, as well as geolocation for finding the nearest restaurant.

## List of features
### User authentication
- Users can register, log in, and log out of the application.
- User data is stored in a MongoDB database.
- Guests can view the restaurant list and menus but cannot save favourites or access the profile page.

### Profile management
- Users can view and edit their profile information, including their name, email, and profile picture.
- Users can view their favourites list, which shows the restaurants they have saved as favourites.

### Restaurant list and filtering
- Users can view a list of all restaurants and filter them by parent company and location.
- A leaflet map is used to display the locations of the restaurants. The selected restaurant is highlighted in blue, while favourites are displayed as stars.

### Restaurant menu
- Users can view the weekly menu for each restaurant, which is fetched from an external API.
- Users can select the day of the week to view the menu for that day.
- Each menu item displays the name, price and dietary information (if available).

### Map geolocation
- Users can click the find button on the map's toolbar to find their nearest restaurant. If the nearest restaurant is not found, the map instead displays the user's current location.

## Backend
[Link to repository](https://github.com/WelehoBRUDER/MetropoliaAMK-restaurant-service-backend)  
The backend repository is built for deployment only, and does not have any documentation.