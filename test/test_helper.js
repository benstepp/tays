'use strict'

require('babel-register')({
  plugins: [
    'transform-decorators-legacy',
    'transform-async-to-generator',
    'transform-es2015-modules-commonjs',
    'transform-es2015-parameters',
    'transform-export-extensions',
    'transform-es2015-destructuring'
  ]
})

global.Reflect = require('harmony-reflect')
global.expect = require('chai').expect
