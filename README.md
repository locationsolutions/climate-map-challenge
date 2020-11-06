# CGI Climate Map Challenge, Timo Ijäs

This repository was edited by Timo Ijäs @himotimo.

Instructions on how to run the application are below.

My application visualizes weather data from the Finnish Meteorological Institute API. The data is from the past seven days and is loaded on launch. The point of this application is visual and statistical analysis of climate data.

The application creates clickable markers, which open a popup. The popup shows the weather station name, a bar graph of precipitation, and line graph of climate temperature. Hover your mouse on the elements to see specific data values.

The application also features a heatmap presentation that uses temperature data. The heatmap shows a heatmap of temperatures at a certain point in time. To change the time which is represented on the heatmap, use the in the sidebar. The slider works in increments of six hours.

I intended to use inverse distance weighted interpolation to represent temperature changes between the weather station. However, implementing the method proved difficult with react-leaflet. The idea of using an interactive slider to change the visualization and analytical side of the map was intriguing, so I decided to settle with heatmap, even though it is not ideal.

As for the goals of this challenge, I have cleared parts 1, 2, and Data-Analysis part of 3. CI-pipeline is not implemented.

This was my first touch to react, HTML and Leaflet. I found the challenge inspiring and fun, and I will definitely keep practicing.



Original readme: 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CGI Climate Map Challenge

This repository is a coding challenge for those who want to show their skills in coding and handling geospatial data.

If you accept the challenge, you should fork this repo and make a pull request when you think you are ready for review.

##  1. Find a bug

Install dependencies and start the project:

### `npm install`
### `npm start`

is there something wrong? fix it.

## 2. Interactivity

Use React-leaflet and fmi-api. Create something interactive.

## 3. bonus
- CI-pipeline
- Data-analysis
