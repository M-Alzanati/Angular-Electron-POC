
const express = require('express');
const path = require('node:path');
const { getDb } = require("../components/db");

const setupRoutes = (app, frontendLocation) => {
    app.use('/', express.static(
        frontendLocation
    ));

    app.get('/items', async (req, res) => {

        let data = await getDb().all("SELECT id, name FROM items");

        res.send({
            items_result: data
        });
    });
};

module.exports = { setupRoutes };