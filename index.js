const express = require("express")

const fs = require("fs").promises;
const path = require("path");
const {urlLogger} = require("./middlewares/urlLogger");
const {ping} = require("./controlers/ping");
const {notFound} = require("./middlewares/notFound");
const {resolveAlias} = require("./controlers/resolveAlias");
const {addAlias} = require("./controlers/addAlias");
const {errorHandler} = require("./middlewares/errorHandler");
const {accessLogs} = require("./middlewares/accessLogs");
const {dumpDatabase} = require("./utils/dumpDatabase");
const {monitorProcess} = require("./utils/monitorProcess");
const {secure} = require("./middlewares/secure");



const app = express()

secure(app)

app.use(express.json())

// first middleware logs to console
// second to logs file
app.use(accessLogs())
app.use(accessLogs(true))

// app.use(urlLogger)
//
app.get("/ping", ping)
app.get("/:alias", resolveAlias)
app.post("/alias",  addAlias)


// we have to place it after all other middlewares
app.use(notFound)

app.use(errorHandler)
const PORT = 3000 || process.env.PORT

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// dumpDatabase()
monitorProcess()

module.exports = app
