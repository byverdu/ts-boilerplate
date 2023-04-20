import { spawn } from 'child_process';
import { Compiler, Configuration, Compilation } from 'webpack';

const initialState = {
  command: '',
  args: [],
};

export class TypingsForSCSS {
  static pluginName = 'webpack-scss-typings-plugin';
  webpackMode: Configuration['mode'];
  scriptToExecute = {
    command: 'typed-scss-modules',
    args: ['src/**/**/*.scss'],
  };

  constructor(options: { mode: Configuration['mode'] }) {
    this.webpackMode = options.mode;
    this.onAfterEmit = this.onAfterEmit.bind(this);

    if (this.webpackMode === 'development') {
      this.scriptToExecute.args.unshift('--watch');
    }
  }

  runScript() {
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
        throw new Error('there was an issue closing the process');
      }
    });
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapAsync(
      TypingsForSCSS.pluginName,
      this.onAfterEmit
    );
  }

  onAfterEmit = (compilation: Compilation, callback?: () => void) => {
    if (this.scriptToExecute.args.length > 0) {
      this.runScript();

      this.scriptToExecute = initialState;
    }

    if (callback) {
      callback();
    }
  };
}
