const {getByAlias} = require("../services/links");


async function resolveAlias(request, response, next) {
    let alias
    // const {alias} = request.params;
    console.log(process.argv)
    if (process.argv[2]) {
        alias = process.argv[2]
    } else {
        alias = request.params.alias

    }
    const longLink = await getByAlias(alias)
    if (!longLink) {
        return next()
    }

    if (process.env.NODE_ENV === 'production') {
        response.redirect(302, longLink)
    } else {
        response.send(longLink)
    }


}

//     {
//     music: 'https://open.spotify.com/track/0nLiqZ6A27jJri2VCalIUs?si=3b3047d8a7634cf6',
//     map: 'https://www.google.com/maps/place/%D0%92%D1%80%D0%BE%D1%86%D0%BB%D0%B0%D0%B2/@51.1270779,16.9918639,11z/data=!3m1!4b1!4m5!3m4!1s0x470fe9c2d4b58abf:0xb70956aec205e0f5!8m2!3d51.1078852!4d17.0385376',
//     video: 'https://www.youtube.com/watch?v=uKKWfOGf-XA&list=PLKaafC45L_SQqca7_ClyPWTl-EXnEt0lB&index=16&t=1345s',
//
// } :
//     {
//         music: 'https://open.spotify.com/',
//         map: 'https://www.google.pl/maps/preview',
//         video: 'https://www.youtube.com/',
//     }

// const alias = 'map'


module.exports = {resolveAlias}