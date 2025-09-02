# Electron POC for ACI Demo

# Structure

* Backend - demo backend node application, simple JS express API
* Frontend - frontend angular example app
* Electron - electron app using backend and frontend

Electron runs backend as an API via worker and serves Frontend.

In development mode (when no `electron/src/dist` folder is present) it serves from angular http://localhost:4200



# Setup

1. Go to backend, frontend, and electron and run `npm ci`.
2. Go to frontend and start it with `npm start`
3. Go to electron and start it with `npm start`

## Development

During development you can use standard backend as a normal server by running `npm start` in `backend` folder.

You **must** periodically test that electron still builds properly though.

# Building electron executable

1. Go to backend, frontend, and electron and run `npm ci`.
2. Go to frontend run `npm run build` it will build directly in `electron/src/dist`.
3. Go to electron and run `npm run make`.
4. Result will be in electron/out directory.