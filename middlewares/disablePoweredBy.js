function disablePoweredBy (request, response, next){
    // Disable the X-Powered-By header to prevent people from knowing what framework you are using
    response.removeHeader("X-Powered-By")

    next()
}

module.exports = {disablePoweredBy}