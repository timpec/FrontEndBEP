# FrontEndBEP

Front-end of the project for server side scripting course. Mean to be used together with the back-end project at https://github.com/Em1lT/BackEndProject

## Description

Event finding app built with React. App uses Mongo database with a GraphQl service API. External API's used in conjunction with own back-end that stores data to users.

External API's:

- http://open-api.myhelsinki.fi/
- https://www.hsl.fi/en/opendata
- https://www.weatherbit.io/

Features:

- Find events that are starting in next two weeks in the Helsinki metropolitan area.
- See a route from home address to the event.
- See what kind of weather is in the event area.
- See description and other info about the event.
- See the events location on the map.
- Add/remove event reservation.
- See how many other people have reserved the event.
- Create a user account for the app.
- Login/Register.
- User with CRUD functionalities.
- Add/Remove intrests from users (events have tags e.g. "music").
- Search for other users by username, email or locality.
- Add/Remove friends.


## Installation

With npm.

```bash
npm i
```

## Launching the app

Start the back-end project to have a working backend then start the front-end of the app with

```bash
npm start
```

## Authors

[timpec](https://github.com/timpec) & [Em1lT](https://github.com/Em1lT)