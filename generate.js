const fs = require('fs')
const template = fs.readFileSync('template.html', 'utf-8')

const template_ = require('./template')
template_.generate('src', '', template)