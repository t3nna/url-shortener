const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const {disablePoweredBy} = require("./disablePoweredBy");

function secure (app){
    app.use(disablePoweredBy)

    app.use(
        cors({
            origin: ["http://localhost:3000", "http://localhost:3001"],
        }))


    app.use(helmet(
        {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    scriptSrc: ["'self'", "'unsafe-inline'",

                    ],
                }
            }
        }
    ))


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again in an hour"
})

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 500
})

app.use(limiter)
app.use(speedLimiter)

}

module.exports = {secure}