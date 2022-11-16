const path =require("path")
const {BadRequestError} = require("../modules.error");
const fs = require("fs").promises;


const linksDevFilePath = path.resolve(__dirname, "../db/links.dev.json");
const linksProdFilePath = path.resolve(__dirname, "../db/links.prod.json");

const linksFilePath = process.env.LINKS_TYPE === "prod" ? linksProdFilePath: linksDevFilePath

async function getByAlias (alias){
    const linksFileContent = await fs.readFile(linksFilePath, "utf-8")
    // const links = LinksFileContent
    //     .split("\n") // get rows
    //     .filter((str) => !!str) // or just .filter(Boolean);
    //     .map((row) => row.split(" ")) // split alias from full link
    //     .reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {}); // construct links object

    const links = require(linksFilePath) // if the file type == json JS will convert it to simple object
    console.log(links[alias])
    return links[alias]
}
// getByAlias('map')

async function addAlias(alias, link){
    const links = require(linksFilePath)
    if(links[alias]){
        throw new BadRequestError('alias-already-exists')
    }

    links[alias] = link

    await fs.writeFile(linksFilePath, JSON.stringify(links, null, 2), "utf-8")
}


module.exports = {
    addAlias,
    getByAlias
}