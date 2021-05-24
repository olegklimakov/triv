const path = process.cwd();
const fs = require('fs')
const { exec } = require('child_process')

console.log(path);
fs.readFile(path + '/proj-starter.json', 'utf8' , (err: any, data: string) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
  const parsed = JSON.parse(data)
  console.log(parsed);
  const child = exec(`npm i ${parsed.repo} --save-dev`);
  child.stdout.on( 'data', ( data: any ) => {
    console.log( `stdout: ${ data }` );
  } );

  child.stderr.on( 'data', ( data: any ) => {
    console.log( `stderr: ${ data }` );
  } );

  child.on( 'close', ( code: any ) => {
    console.log( `child process exited with code ${ code }` );
  } );
})
