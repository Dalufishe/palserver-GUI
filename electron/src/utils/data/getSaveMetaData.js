
const path = require("path")
const fs = require("fs/promises")

module.exports = async function getSaveMetaData() {
    const metajson = JSON.parse(await fs.readFile(path.join(__dirname, "../../../saves", "meta.json"), { encoding: "utf-8" }))
    return metajson
}