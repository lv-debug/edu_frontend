'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//访问后端接口的地址
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //nginx的端口
  BASE_API: '"http://localhost:9009"',
})
