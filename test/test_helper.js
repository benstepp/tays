'use strict'

const path = require('path')
require('app-module-path').addPath(path.resolve(__dirname, '..'))

require('babel-register')({
  plugins: [
    'transform-decorators-legacy',
    'transform-async-to-generator',
    'transform-es2015-modules-commonjs',
    'transform-export-extensions'
  ]
})

global.Reflect = require('harmony-reflect')
global.expect = require('chai').expect

const { Base } = require('../lib/base')
Base.configure()
