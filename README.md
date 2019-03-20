# Bug fixing
- Inside Sidebar component created a **WrapperSidebar** to wrap a div before return. 
# Project refactor
- Moved **the observation location fetching** out of **App.js** and put it under **the services** folder. So every service that we call from the Rest APIs we will to put to this folder. 
- Created a components folder to store all component of project. 
- Moved **SidebarComponent** from **src** to **components**.
- Moved **MapContainer** out of **App.js** by creating a new **MapComponent** component 
- Created 2 new components (**ThemeComponent**,**WeatherComponent**) to handle map theme and show realtime weather of selected location.
- Moved **the LocationGetter** under **utils** folder.
# Weather information and map visualizations
- Add more functions to the map like dragging, zooming, scrolling, animate, baselayers...etc
- Moved all markers to the middle of screen.
- Change map's theme from dark to lighter.
- Styled the sidebar.
- Show location's name when hovering marker.
# Editor 
- **Dinh Duc Thinh**
# Title
- **Software Developer**
# Date
- **20.03.2019**
# Screenshot
![alt text](https://i120.photobucket.com/albums/o172/juneboy1984/Screen%20Shot%202019-03-20%20at%203.25.33%20AM_zpsdapq5u0n.png)
# Demo
- [climate-map-challenge](https://climate-map-challenge.herokuapp.com)