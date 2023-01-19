const { spawn } = require('child_process');

const initialState = {
  command: '',
  args: [],
};

class TypingsForSCSS {
  static name = 'webpack-scss-typings-plugin';
  webpackMode = '';
  scriptToExecute = {
    command: 'typed-scss-modules',
    args: ['src/**/**/*.scss'],
  };

  constructor(options) {
    this.webpackMode = options.webpackMode;
    this.onAfterEmit = this.onAfterEmit.bind(this);

    if (this.webpackMode === 'development') {
      this.scriptToExecute.args.unshift('--watch');
    }
  }

  runScript(scripts) {
    if (this.scriptToExecute.args.length <= 0) {
      return;
    }

    const { command, args } = this.scriptToExecute;
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    });

    proc.on('error', error => {
      throw error;
    });

    proc.on('close', error => {
      if (error) {
        throw new Error(error);
      }
    });
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(TypingsForSCSS.name, this.onAfterEmit);
  }

  async onAfterEmit(compilation, callback) {
    const scripts = this.scriptToExecute;
    if (scripts.args.length > 0) {
      this.runScript(scripts);

      this.scriptToExecute = JSON.parse(JSON.stringify(initialState));
    }

    if (callback) {
      callback();
    }
  }
}

module.exports = TypingsForSCSS;
