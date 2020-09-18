const fs = require('fs-extra')

const jsdom = require("jsdom")
const { JSDOM } = jsdom

const template_ = require('./template')

module.exports = function compile(root, target, callback) {
    const port = 8080

    //#region Server
    const express = require('express')
    const app = express()

    app.use(express.static(root))

    //#endregion

    fs.copySync(root, target)

    console.log("copied")
    app.listen(port, () => console.log('Started server'))

    const template = fs.readFileSync('template.html', 'utf-8')
    template_.generate(root, '', template)

    const routes = JSON.parse(fs.readFileSync('routes.json', 'utf-8'))

    routes.forEach(route => compileRoute(root, target, route))

    setTimeout(() => {
        console.log('Stopped server')

        console.log('compiled!')
        callback()
    }, 1000)
}

async function compileRoute(root, target, route) {
    const domFile = await JSDOM.fromFile(root + route.url + '/index.html', {})
    const documentFile = domFile.window.document

    Array.from(documentFile.body.querySelectorAll('script')).forEach(script => {
        documentFile.body.removeChild(script)
    })

    const initialBodyScript = documentFile.createElement('script')
    initialBodyScript.innerHTML = 'document.body.innerHTML = `' + documentFile.body.innerHTML + '`'

    const dom = await JSDOM.fromURL('http://localhost:8080' + route.url, {
        resources: 'usable',
        runScripts: 'dangerously',
        pretendToBeVisual: true,
    })

    const document = dom.window.document

    setTimeout(() => {
        document.body.innerHTML += initialBodyScript.outerHTML

        const content = document.documentElement.innerHTML

        fs.writeFile(target + '/' + route.url + '/index.html', content, (err) => {
            if (err) throw err
        })
    }, 1000)

    if (route.subPaths !== undefined) route.subPaths.forEach(r => compileRoute(root, target, r))
}