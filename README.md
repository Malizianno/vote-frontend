This project is part of a bigger project: vot.e App designed for diploma purposes;

# vot.e App

vot.e App is designed to be a three-part app known as microservice architecture as follows:

1. vot.e backend -> The core app which stores the data and executes voting processes (simulations)
2. vot.e frontend -> The ADMIN user interface, accessible only via ADMIN accounts
3. vot.e mobile app -> The mobile App

## vot.e frontend --> ADMIN UI

This app handles all data in the core app *vote.e backend* and exposes this to port 4090 (check more for spring cloud).

### v1.1.0 - implemented ADMIN authentication and overall authorization.
### v1.0.0 - basic Angular application with 3 screens dashboard + users + candidates.

All rights reserved to Cristian Sterie

npm project:

# VoteFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

