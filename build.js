const fs = require('fs-extra')

try {
    fs.copy('src/.compiler', 'src/.active')
} catch (err) { }

const compiler = require('./compiler')
compiler('src', 'docs', () => {
    console.log('compiled successfully')
})