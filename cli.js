#!/usr/bin/env node

// Grab provided args.
const [,, ...args] = process.argv;
console.log(`Hello World ${args}`);

// console.log(args);
console.log(args[2]);
