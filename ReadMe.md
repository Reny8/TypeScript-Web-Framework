This is a full stack framework intended for learning purposes. This application will display the users in the db.json file with the ability to update the name to your provided value, update the age to a random value and save your changes.

> To download the required packages to run the application use the following commands in the terminal:
- npm install -g parcel
- npm install axios

> To run the application open to seperate command prompt terminals in your project directory and run the following commands:
- In the first terminal run the following command:
  - npm run start:parcel
  - The url provided in the terminal after this command will be the url you use to navigate to the application
  - This command will run the package.json commands that will start the parcel package used to compile TS into JS
- In the second terminal run the following command:
  - npm run start:db
  - This commands will run the package.json command that will start the package used for the json server
