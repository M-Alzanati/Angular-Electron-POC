const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const fs = require('node:fs');

let db = null;

const initDb = async () => {
    db = await open({
        filename: ':memory:',
        driver: sqlite3.Database
    });

    db.exec(fs.readFileSync(__dirname + '/../database.sql').toString());
};

const getDb = () => {
    if (!db) {
        throw new Error("Database not initialized. Call initDb() first.");
    }
    return db;
}

module.exports = { getDb, initDb };