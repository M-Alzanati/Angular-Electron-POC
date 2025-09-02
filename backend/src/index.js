const express = require('express');
const cors = require('cors');
const { initBackend } = require('./components');
const { setupRoutes } = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;


const startDemoServer = (frontendLocation) => {
    setupRoutes(app, frontendLocation);

    app.use((_req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    });

    initBackend().then(() => {
        app.listen(port, () => {
            console.log(`Demo backend listening on port ${port}`)
        });
    });
};

module.exports = {
    startDemoServer
}
