const yargs = require("yargs");
const notes = require("./notes");
const coloredText = require("./coloredText");

// Adding notes
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note description",
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNotes(argv.title, argv.body);
  },
});

// Removing notes
yargs.command({
  command: "remove",
  describe: "Removing a existing note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNotes(argv.title);
  },
});

// List notes
yargs.command({
  command: "list",
  describe: "Listing a existing note",
  handler: () => {
    notes.getNotes();
  },
});

// Read a note
yargs.command({
  command: "read",
  describe: "Reading note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNotes(argv.title);
  },
});

console.log(
  coloredText.infoBg("Welcome Back !") + coloredText.warningBg(" Vikash ")
);

yargs.parse();
