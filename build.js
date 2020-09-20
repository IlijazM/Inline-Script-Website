const fs = require('fs-extra')

try {
    fs.copy('src/_building', 'src/_active')
} catch (err) { }

const compiler = require('./compiler')
compiler('src', 'docs', () => {
    const fs = require('fs-extra')

    try {
        fs.copy('docs/_build', 'docs/_active')
    } catch (err) { }

    console.log('compiled successfully')
})