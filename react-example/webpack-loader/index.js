const { urlToRequest } = require('loader-utils');
const { validate } = require('schema-utils');
const { exec, spawn } = require('child_process');

const command = 'typed-scss-modules "src/**/**/*.scss"';
const child = exec(command);

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

module.exports = function (source) {
  const options = this.getOptions();

  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options',
  });

  console.log(
    'The request path',
    urlToRequest(this.resourcePath),
    options,
    source
  );

  // Apply some transformations to the source...

  child.on('exit', function (code, signal) {
    console.log(
      'child process exited with ' + `code ${code} and signal ${signal}`
    );
  });
  return `export default ${JSON.stringify(source)}`;
};
