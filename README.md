# Crud States
---
![badgen](https://badgen.net/badge/built%20with/love/red)
![badgen](https://badgen.net/badge/built%20with/typescript/blue)
![Node](https://img.shields.io/badge/-Node.js-5B9856?style=flat&logoColor=fff&logo=node.js)&nbsp;
[![Made By](https://img.shields.io/badge/made%20by-Paulo%20Rodrigues-blue)](https://www.linkedin.com/in/pcqrodrigues/)
---
This project is a NodeJS REST API developed for a CRUD of states

## Getting Startted
Follow this instructions to get a copy of this project in your local env to develop and test.

###  Tools
To run the project you will need:
- [NodeJS](https://nodejs.org/en/download/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Installing Dependencies
Clone this repo:
```sh
git clone git@github.com:pcrodrigues0/crud-states.git
cd crud-states
```

Is recommended to user [Yarn](https://yarnpkg.com/). To install it:
```sh
npm install -g yarn
```

Then, install projects dependencies:
```
yarn
```

## Running
After config, to run application:
```sh
docker-compose up
```
```sh
yarn start
```

### Routes
You can access the API of States by the following routes:
| Method | Route | Description | Body
| --- | --- | --- | --- |
| POST | /api/states  | Add a new state on DB | name, uf
| GET  | /api/states  | Get all states on DB | none
| GET | /api/states/:uf | Get states of this UF | none
| PUT| /api/states/:id | Update the state | name, uf
| DEL| /api/states/:id | Delete the state |

You can access the API of Cities by the following routes:
| Method | Route | Description | Body
| --- | --- | --- | --- |
| POST | /api/cities  | Add a new city on DB | name, stateId
| GET  | /api/cities  | Get all cities on DB | none
| GET | /api/cities/:name | Get city by name | none
| GET | /api/cities/stateid/:id | Get city by stateId | none
| PUT | /api/cities/:id | Update the passed city | name, stateId
| DEL| /api/cities/:id | Delete the city |




