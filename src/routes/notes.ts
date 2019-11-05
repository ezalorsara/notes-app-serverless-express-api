import express = require("express");
import { Router } from 'express'
import { readNote, createNote, updateNote, deleteNote, listNotes } from '../controllers/notes';
const noteRouter: Router = Router();

noteRouter.get('/', listNotes);
noteRouter.get('/:id', readNote);
noteRouter.post('/', createNote);
noteRouter.put('/:id', updateNote);
noteRouter.delete('/:id', deleteNote);

export { noteRouter };
