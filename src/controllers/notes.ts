import express = require('express');


const readNote = (req: express.Request, res: express.Response) => {
  res.send("READ NOTE").end();
};

const createNote = (req: express.Request, res: express.Response) => {
  res.send("CREATE NOTE").end();
};

const updateNote = (req: express.Request, res: express.Response) => {
  res.send("UPDATE NOTE").end();
};

const deleteNote = (req: express.Request, res: express.Response) => {
  res.send("DELETE NOTE").end();
};

const listNotes = (req: express.Request, res: express.Response) => {
  res.send("LIST NOTE").end();
}

export { readNote, createNote, updateNote, deleteNote, listNotes }