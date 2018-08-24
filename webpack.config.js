const webpack = require('webpack');
const {
  createConfig,
  entryPoint,
  setOutput,
  babel,
  file,
  css,
  postcss,
  match,
  setEnv,
  env,
  devServer,
  uglify,
  addPlugins,
  sourceMaps,
} = require('webpack-blocks');

const autoprefixer = require('autoprefixer');
const { resolve } = require('path');

// When calling css as a function, the emotion babel plugin injects
// a sourceMap parameter that ruins everything.
const cssLoader = css;

const entryPoints = [];
entryPoints.unshift('webpack-hot-middleware/client?reload=true');

module.exports = createConfig([
  entryPoint([...entryPoints,'./client/index.js']),
  setOutput({
    path: resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'client.js'
  }),
  babel(),
  match(['*.css'], [
    cssLoader({ sourceMap: true }),
    postcss({
      plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
    }),
  ]),
  match(['*.svg', '*.png', '*.gif', '*.jpg', '*.jpeg'], [
    file({ emitFile: false }),
  ]),
  addPlugins([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ])
]);