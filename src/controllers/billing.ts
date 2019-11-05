import express = require('express');
import stripePackage from "stripe";
import { calculateCost } from '../libs/billing';

const createBilling = (req: any, res: express.Response) => {

  const { storage, source, cardDetail } = JSON.parse(req.body);
  const amount = calculateCost(storage);
  cardDetail.brand = cardDetail.brand === undefined ? "(empty)" : cardDetail.brand;
  cardDetail.cardHoldersName = cardDetail.cardHoldersName === undefined ? "(empty)" : cardDetail.cardHoldersName;
  const description = "Brand: " + cardDetail.brand + ", Card Holders Name: " + cardDetail.cardHoldersName;
  const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);
  console.log("source: ", source);
  console.log("amount: ", amount);
  console.log("description: ", description);
  stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd"
  }).then(result => {
    res.status(200).json({ message: "Successfully Billed", result });
  }, err => {
    console.log(err.message);
    res.status(400).json({ message: "Failed, please try again later!" });
  });

};

export { createBilling }