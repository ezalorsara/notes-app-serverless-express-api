import express = require('express');
import AWS = require('aws-sdk');
import uuid from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const readNote = (req: any, res: express.Response) => {

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      userId: req.requestContext.identity.cognitoIdentityId,
      noteId: req.params.id
    }
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get notes' });
    }

    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(400).json({ error: 'Item not found' });
    }
  });

};

const createNote = (req: any, res: express.Response) => {

  const { content, attachment } = JSON.parse(req.body);

  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: {
      userId: req.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content,
      attachment,
      createdAt: Date.now()
    }
  }

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not insert notes' });
    }

    res.json(params.Item);

  });
};

const updateNote = (req: any, res: express.Response) => {

  const { content, attachment } = JSON.parse(req.body);

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      userId: req.requestContext.identity.cognitoIdentityId,
      noteId: req.params.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": attachment || null,
      ":content": content || null
    },
    ReturnValues: "ALL_NEW"
  };

  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not update notes' });
    }
    res.json({
      noteId: req.params.id,
      message: 'Successfully updated!'
    });
  });
};

const deleteNote = (req: any, res: express.Response) => {

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      userId: req.requestContext.identity.cognitoIdentityId,
      noteId: req.params.id
    }
  };

  dynamoDb.delete(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not delete notes' });
    }
    res.json({
      noteId: req.params.id,
      message: 'Successfully deleted!'
    });
  });
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
      res.status(400).json({ error: 'Could not get list of notes' });
    }

    res.json(result.Items);

  });

}

export { readNote, createNote, updateNote, deleteNote, listNotes }