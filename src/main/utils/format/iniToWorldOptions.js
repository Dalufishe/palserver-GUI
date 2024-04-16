
const { exec } = require("child_process")
const path = require("path")

function iniToWorldOptions(src, dist) {

    const convertProgram = path.join(__dirname, "../../../tools/palworld-worldoptions/palworld-worldoptions.exe")

    exec(`${convertProgram} ${src} --output=${dist}`)

}

module.exports = iniToWorldOptions

