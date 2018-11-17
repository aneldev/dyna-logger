export * from "./DynaLogger";

console.error(`
dyna-logger: Import error
You should import with lazy load (webpack's import()) the "dyna-logger/web" or the "dyna-logger/node" version according the runtime environment.
For typescript, you should import also on top the "dyna-logger" but on runtime you shouldn't see this error since this import is not part of the compiled code.
`);