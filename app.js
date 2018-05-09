const fs= require('fs');
const _ = require('lodash');
const yargs= require('yargs');
const note= require('./note.js');
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};
var argv = yargs
            .command('add','Add a new note.',{
              title: titleOptions,
              body: bodyOptions
            })
            .command('list','Lists all notes')
            .command('read','Read a note',{
              title: titleOptions
            })
            .command('remove','Remove a note',{
              title: titleOptions
            })
            .help()
            .argv;
var command=argv._[0];

if(command==='add'){
  var n=note.addNote(argv.title,argv.body);
  if(n){
    console.log('Node created.');
    note.logNote(n);
  }else{
    console.log('Node title taken');
  }
}else if(command==='list'){
  var allNotes=note.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach( (n) => note.logNote(n) );
}else if(command==='remove'){
  var check=note.removeNote(argv.title);
  var message = check ? 'Note removed.' : 'Note not found';
  console.log(message);
}else if(command==='read'){
  var n=note.getNote(argv.title);
  if(n){
    console.log('Note found!');
    note.logNote(n);
  }else{
    console.log('Note not found');
  }
}else{
  console.log('Command not recognized');
}
