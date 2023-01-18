# CGI Climate Map Challenge
Fork by Jani Martikainen (@jeejeemartikainen)

This fork adds three toggleable layers to existing map for visualizing the fetched data from FMI-API (precipitation, temperature and snowdepth) and adds different type of markers for each datatype.

Datapoints are animated/looped through the initial 145 hours and there's slider for going back and forth between the hours.

Each marker type has it's own popup which shows current observation point, observation region and data value corresponding to layer. 

This was my first real attempt to build something with React and Leaflet, so it was quite fun and challanging. With Chart.js and maybe somekind of heatmap layer there's nice possibilities for repurposing this data.

I have cleared parts 1 and 2 of the challenge, maybe third aswell. CI-pipeline not yet implemented. 

---- Original README.md ----

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
