<p align="center">
 <img width="200" src="images/logo.png"/>
 <h1 align="center">Senior Frontend Engineer</h1>
</p>

## About the role

We are looking for a Frontend Engineer to help in creating performant and large scale applications, working on features improvements and be able to define technical designs and architecture before implementations.

## Task Overview

Imagine we are assigned to monitor some user's building lists, each user has his building list which is different from other users. and we have the privileges to create, update or delete buildings in user's data ( as admins ).

Our task is to create a simple interface to show a dropdown of users and a building list to show user's building lists.Each building have a MapView which shows the location of building on map with Marker.

## Acceptance Criteria

- View start point will be showing a dropdown with a placeholder of the select user.
- On selecting user show loader in building list container while fetching data.
- Show each user building list in a container after the dropdown list.
- Select first building from the selected user as default. And Show loader on MapView Container until map is fully loaded. Show MapView of that building with Marker (on Hover of marker should display Building name and Country name in a tooltip).
- We can select any building from the list to see the MapView of that building.
- We can create, update and delete current selected user buildings list.
- On Click of Add Button /Edit icon of building the MapView should remove from the DOM and Show Add/Edit Form container.
- In Add/Edit Form for Location drop down show the Countries list from [countriesList.json](/countriesList.json).
- After Add/Edit sucessfully, select the updated Builiing and show the MapView of that building.

## Wireframe

| ![MapView](./images/mapView.png) | ![History](./images/addEditForm.png) |
| -------------------------------- | ------------------------------------ |


<p align="center"><a href="/images">Better Quality</a></p>

## Technical Requirments

> We are seeking to hire someone who is skilled using Angular +2

> This task is to evaluate your ability to deal with data and managing it.

### Technical Bonuses

- Create your own boilerplate code and structure.
- Use any Maps (OpenLayers, Leaflet, GoogleMap..etc). Don't use any angular wrapper libraries for Maps. Create your own angular wrappers for Map, Layer and Markers.
- Solution is following Functional paradigm.
- Solution is documented, consistent.
- Solution follows TTD, has tests for UI and functionalities.
- Beautiful UI.
- Writing Beautiful README.

## Hints

- Refer to [countries.geojson](/countries.geojson) for Countries GeoJSON data to render World Map with Conturies as features.
- Refer to [countriesList.json](/countriesList.json) for Countries list with Marker Position.
- Create users, buildings models as you needed. Store all data in localStorage no need to use/write Rest API.
- You can use any state management for managing the state and data logic.
- You can fake-fetching data with `Promises` and `setTimeout` to show loaders for beautiful UI.
- More test coverage more bug-free solution.
<p align="center">Finally, we wish you all of Good Luck.</p>
