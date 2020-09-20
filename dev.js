const fs = require('fs-extra')

//#region template
const template_ = require('./template')
const template = fs.readFileSync('template.html', 'utf-8')
//#endregion

//#region live-server
const liveServer = require('live-server')
const params = {
    port: 8080,
    host: '0.0.0.0',
    root: 'dev',
    open: false,
}
liveServer.start(params)
//#endregion

async function reServe(event, filename) {
    console.log(event)
    // await fs.copy('src', 'dev')
}

reServe()

fs.watch('src', (event, filename) => {
    reServe(event, filename).then().catch()
})

// ['template.html', 'routes.json', 'props.json'].forEach(filename => fs.watch(filename, (event, filename) => {
//     reServe(event, filename)
// }))

// const fs = require('fs-extra')

// try {
//     fs.copy('src/dev', 'src/active')
// } catch (err) { }

// const template = fs.readFileSync('template.html', 'utf-8')

// const template_ = require('./template')
// template_.generate('src', template)

// const liveServer = require('live-server')

// const params = {
//     port: 8080,
//     host: "0.0.0.0",
//     root: "src",
//     open: false,
// }

// liveServer.start(params)
