const { workerData } = require('node:worker_threads');

const server = require('backend');


server.startDemoServer(workerData.distLocation);