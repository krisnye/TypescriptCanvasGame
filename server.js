'use strict'
let express = require('express')
let host = "localhost" // this is the standard host name for your local machine
let port = 8080

let app = express()
app.use(express.static("."))
let server = app.listen(port, function () {
    console.log('App listening at http://%s:%s', host, port);
})