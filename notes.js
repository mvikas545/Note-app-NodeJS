const fs = require("fs");
const coloredText = require("./coloredText");
const utils = require("./utils");

const getNotes = () => {
  //get all notes and log to console
  const notes = loadNotes();
  const notesList = notes.map((note) => ({
    Title: note.title,
    CreatedAt: note.time,
  }));
  console.log("\n");
  console.log(coloredText.successBg("Your all Notes : )"));

  console.table(notesList);
};

const readNotes = (title) => {
  // first find note exists for given title
  const notes = loadNotes();
  const filteredNote = notes.filter((note) => note.title === title);

  // if yes then log the detail of note
  if (filteredNote.length !== 0) {
    console.log("\n");
    console.log(coloredText.success.underline("Your note detail :-"));
    console.log(`${coloredText.info("Title: ")}`, filteredNote[0].title);
    console.log(`${coloredText.info("Detail: ")}`, filteredNote[0].body);
    console.log(`${coloredText.info("Created at: ")}`, filteredNote[0].time);
    console.log("\n");
  }
  //else log note does not exits
  else {
    console.log(coloredText.error("No note exists for given title :("));
  }
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({ title: title, body: body, time: utils.getCurrentTime() });
    saveNotes(notes);
    console.log(coloredText.success("Note added successfully!"));
  } else {
    console.log(coloredText.error("Note with entered title already exists!"));
  }
};

const removeNotes = (title) => {
  // first find note with given title exists or not
  const notes = loadNotes();
  const isNotePresent = notes.filter((note) => note.title === title);
  //   if exists filter out and update the notes
  if (isNotePresent.length !== 0) {
    const newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes);
    console.log(coloredText.success("One note deleted successfully :)"));
  }
  // else console that note doesn't exists
  else {
    console.log(coloredText.error("Note with given title do not exists!"));
  }
};

const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", data);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("./notes.json");
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};
module.exports = { getNotes, addNotes, removeNotes, readNotes };
