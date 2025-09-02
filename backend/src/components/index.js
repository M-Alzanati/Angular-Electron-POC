const { initDb } = require("./db");

const initBackend = async () => {
    await initDb();
};

module.exports = { initBackend };
