// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// process.env.ELECTRON_ENABLE_LOGGING = 1

Cypress.on('window:before:load', (win) => {
  Cypress.log({
      name: 'console.log',
      message: 'wrap on console.log',
  });

  // pass through cypress log so we can see log inside command execution order
  win.console.log = (...args) => {
      Cypress.log({
          name: 'console.log',
          message: args,
      });
  };
});

Cypress.on('log:added', (options) => {
  if (options.instrument === 'command') {
      // eslint-disable-next-line no-console
      console.log(options.message)
  }
});