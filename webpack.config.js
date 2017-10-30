var path = require('path')
var webpack = require('webpack')
var htmlWebpaackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry:{
    app:'./src/index.jsx',
    // 将 第三方依赖 单独打包
    vendor:[ 'react', 'react-dom', 'react-redux', 'react-router', 'redux']
  } ,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  resolve:{
    extensions:['.scss', '.js','.jsx'],
    alias: {
      'lib':__dirname + '/src/lib',
      'components':__dirname + '/src/components',
      'store':__dirname + '/src/store',
      'node_modules':__dirname + '/node_modules',
      'swiper_css':__dirname+'/node_modules/swiper/dist/css',
      'baseCss':__dirname+'/src/static/css',
      'static':__dirname+'/src/static',
      'pages':__dirname + '/src/pages'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:/\.(css|scss)$/,
        loader:"style-loader!css-loader!postcss-loader!sass-loader"
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    // contentBase: "./dist",//本地服务器所加载的页面所在的目录
    proxy: [{
      context: ["/login", "/user","/top","/playlist","/music","/search","/lyric","/comment","/banner","/song","/program","/album","/artists","/simi","/recommend","/personal_fm","/daily_signin","/like","/fm_trash","/mv","/personalized","/dj"],
      target: "http://localhost:3000",
    }],
    historyApiFallback: true, //不跳转
    noInfo:true,
    host:'192.168.102.103',
    port:'4000'
  },
  performance: {
    hints: false
  },
  //开发模式时候source里面的资源导航
  devtool: '#source-map',
}

//生产模式打包的时候进行代码压缩合并优化
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#eval-source-map'
  module.exports.output.publicPath='./'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // 公共代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].[chunkhash:8].js'
    }), 
    //html文件打包
    new htmlWebpaackPlugin({
      template:__dirname + '/index.html',
      chunks:['app','vendor']
    }),
    //样式文件单独打包
    new ExtractTextPlugin("./css/[name].css")
  ])
}
