const express = require('express');
const http = require('http');

const { Worker } = require('worker_threads');

async function init() {

    const port = 5000;
    const app = express();

    //Creating a new Worker thread
    const factorialWorker = new Worker('./factorial.js');

    /**
     * API to calculate factorial
     */
    app.get('/', (req, res, next) => {
        console.log("Find Factirial of ", req.query.number);
        //Emitting Data to Worker thread
        factorialWorker.postMessage(req.query.number);
        res.json({ message: "all good" });
    });

    //Listening to Worker thread for data
    factorialWorker.on('message', (message) => {
        console.log(message, "in Parent thread");
    })

    var httpsServer = http.Server(app);

    httpsServer.listen(port, () => {
        console.info(`App listening on port ${port}`);
    });
}

init();