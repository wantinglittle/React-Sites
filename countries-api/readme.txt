Live site: https://client-tracker-co.herokuapp.com/

This project is a simple MERN app.  It demonstrates my proficiency in a number of areas including the following:

- Creation of full backend/frontend app with MongoDB connection.
- Created with React using React Router, Axios, Express and other libraries
- User can create, update and edit client entries.
- In addition to retrieve full database list, user can also run search to find specific client or cull list using search string which runs .filter over the search results.
- User can also run a 'due date report' which searches database using date search string.  Search will return all clients with due dates before the search criteria.  It also returns these results in chronological order from earlier due dates to later due dates.  This is achieved through by running both .filter and .sort over the retrieved data.
- Form for database additions includes validation for entries like phone number and date as well as automatic formatting in input fields.
- User authentication and authorization setup using Auth0.
- SASS used for styling.
