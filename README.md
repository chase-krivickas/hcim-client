# Hypertherm Consumable Inventory Managment System Frontend
A react web application for the Hypertherm Consumable Inventory Managment System
## Install
Clone the repo from github, cd into the directory, and run
```
$ npm install
```

## To run locally
```
$ npm start
```

## To build for deployment
```
$ npm run build
```

## To deploy to surge
In `./public/CNAME` you can change the url name of where the web app will be hosted. To deploy to surge, run:
```
$ npm run build
$ cd build
$ cp index.html 200.html
$ surge
```
