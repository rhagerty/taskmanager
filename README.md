# FreeThought Planner - The digital planner made with neurodiversity in mind.

# Introduction

FreeThought Planner is a React application that I developed while enrolled in a software engineering bootcamp (Springboard). There is a dashboard that highlights the day's schedule and priorities, as well as a space to write notes. The user can use the planner (month / week / day) to add, edit or delete events.

The application was created with `create-react-app`, using `styled-components` for the styling and the animations. Events and meetings are stored on a MongoDB database. The technologies used include: HTML, CSS, JavaScript, React, Node, Express, RESTful API, MongoDB. Element interaction was created using InteractJs.

# Project features

The application allows the user to view meetings and events stored from a database.
The key features are:

- A tab-like component to switch between the different views.
- Three different date pickers to switch between months, weeks or days.
- In the day view, ability to edit or delete an event.
- On the dashboard/homepage, a daily inspirational quote is received from the type.fit API.
- On the dashboard/homepage, a section for notes titled "brain dump" and a section to write and highlight the days priorities.

The "+" button opens a form in a modal:

- Title, description, location
- Date pickers for the start and end date / all-day option
- Time pickers for the start and end time

# Project status

Features in development:

- Login/logout functionality
- InteractJS addition to drag and move weekday divs.
- Enhanced dashboard with weekday tiles added.

# Packages, modules, APIs

- react-calendar ([react-calendar NPM](https://www.npmjs.com/package/react-calendar)): used in the month view and new event forms
- Quote API: [[rapidapi.com/weatherbit/api/Weather](https://type.fit/api/quotes)](https://type.fit/api/quotes)