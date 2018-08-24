const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.js');

let middleware;

const afterWebpack = (err, stats) => {
  if (err) {
    console.log(chalk.red(err.stack || err));
    if (err.details) {
      console.log(chalk.red(err.details));
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.log(chalk.red('WEBPACK FAILED TO COMPILE!\n'));
    console.log(chalk.red(info.errors));
  }

  if (stats.hasWarnings()) {
    console.log(chalk.yellow(info.warnings));
  }

  console.log(stats.toString({ colors: true }));

  // Announce the server after the webpack config has compiled
  console.log(chalk.green(`\nServer is running on Glitch`));

  if (middleware) {
    // Workaround to the mysterious multi-bundle undefined modules bug
    middleware.invalidate();
  }
};

const compiler = webpack(config, afterWebpack);

middleware = devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: true,
  stats: 'errors-only',
  clientLogLevel: 'error',
});

app.use(middleware);
app.use(hotMiddleware(compiler, { heartbeat: 2000 }));

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}, but there's more to wait for 🚢`);
});