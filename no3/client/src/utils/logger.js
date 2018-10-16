export class Logger {

  static divider = '----------------------';

  static info(tag, ...contents) {
    const time = new Date().toLocaleTimeString();
    if (console.info) {
      window.console.info(`【${tag}】 at ${time}`);
      for (const item of contents) {
        window.console.info(item);
      }
      window.console.info(this.divider);
    } else {
      this.log(tag, ...contents);
    }
  }

  static error(tag, ...contents) {
    const time = new Date().toLocaleTimeString();
    if (console.error) {
      window.console.error(`【${tag}】 at ${time}`);
      for (const item of contents) {
        window.console.error(item);
      }
      window.console.error(this.divider);
    } else {
      this.log(tag, ...contents);
    }
  }

  static log(tag, ...contents) {
    const time = new Date().toLocaleTimeString();
    window.console.log(`【${tag}】 at ${time}`);
    for (const item of contents) {
      window.console.log(item);
    }
    window.console.log(this.divider);
  }
}
