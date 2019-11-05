import express = require('express');
import AWS = require('aws-sdk');

const NOTES_TABLE = process.env.NOTES_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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

const listNotes = (req: any, res: express.Response) => {

  const params = {
    TableName: process.env.NOTES_TABLE,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": req.requestContext.identity.cognitoIdentityId
    }
  }

  dynamoDb.query(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get notes' });
    }

    res.json(result.Items);

  });

}

export { readNote, createNote, updateNote, deleteNote, listNotes }