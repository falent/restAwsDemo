'use strict';

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')

const app = express();
app.locals.pretty = true;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('json spaces', 2); // Format JSON Response


app.get('/tom', (request, response) => {
    response.json({ info: 'works' })
})

app.get('/users', db.getUsers)


/* ** ** ** ** ** ** **
* Error handling
* ** ** ** ** ** ** **/
app.use((err, req, res, next) => {
    console.error(err);
    res.status(404).json({
        status: res.statusCode,
        data: err.message,
        message: 'Not Found'
    });
});


// Development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            stage: "development",
            status: res.status,
            data: null,
            message: err.message
        });
    });
}


// Production error handler no stacktraces leaked to user
// You must provide four arguments to identify it as an error-handling middleware function.
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        status: res.statusCode,
        data: err.message,
        message: 'Internal Error'
    });
});

module.exports.handler = serverless(app);
