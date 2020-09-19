const fs = require('fs-extra')

const jsdom = require("jsdom")
const { JSDOM } = jsdom

const template_ = require('./template')

module.exports = async function compile(root, target, callback) {
    const port = 8080

    //#region Server
    const express = require('express')
    const app = express()

    app.use(express.static(root))

    const server = app.listen(port, () => console.log('Started server'))
    //#endregion

    await fs.copy(root, target)

    const template = fs.readFileSync('template.html', 'utf-8')
    template_.generate(root, '', template)

    const routes = JSON.parse(fs.readFileSync('routes.json', 'utf-8'))

    for (let route of routes) {
        await compileRoute(target, route)
        console.log("finished " + route.name)
    }

    setTimeout(() => {
        callback()
    }, 1000)
}

async function compileRoute(target, route) {
    return new Promise(async (resolve, reject) => {
        const dom = await JSDOM.fromURL('http://localhost:8080' + route.url, {
            virtualConsole: new jsdom.VirtualConsole(),
            resources: 'usable',
            runScripts: 'dangerously',
            pretendToBeVisual: true,
        })

        const document = dom.window.document

        setTimeout(async () => {
            const content = document.documentElement.innerHTML

            fs.writeFile(target + '/' + route.url + '/index.html', content, (err) => {
                if (err) throw err
            })

            if (route.subPaths !== undefined) {
                for (subPath of route.subPaths) {
                    await compileRoute(target, subPath)
                    console.log("finished " + subPath.name)
                }
            }


            resolve()
        }, 1000)
    })
}