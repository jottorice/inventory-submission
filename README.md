"Inventory" Express Server and AngularJS app
============================================

Express server which manages a back-end MongoDB database on mlab.com, with an AngularJS app front-end. The application chosen was management of office equipment inventory.

The corresponding mobile Ionic app for this project (which just displays data - does not edit it) is in my [inventory-ionic](https://github.com/jottorice/inventory-ionic) project.

## Reviewing This Project (for Coursera reviewers)

Express server code is here:
* **server.js**: Top-level server script - equivalent of "app.js" in the "conFusion" project.
* **models/items.js**: Mongoose schema for the "items" collection in the MongoDB database. (This is the only collection this project uses.)
* **routes/...**: Routes for the server - notably, "routes/itemRouter.js".

AngularJS app code is in the "app" directory:
* **app/index.html**: Top-level HTML page
* **app/scripts/...**: App, controllers and services code
* **app/views/...**: HTML templates for views

## Hosted Application

The server and client app are hosted on Heroku at:
[https://whispering-mountain-55762.herokuapp.com/](https://whispering-mountain-55762.herokuapp.com/)

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.
