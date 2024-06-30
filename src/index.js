/* eslint-disable */
const Hapi = require('@hapi/hapi');
const config = require('config');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: config.get('port'),
    host: config.get('host'),
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
