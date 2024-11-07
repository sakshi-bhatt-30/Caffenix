// import express from "express";
// import {
//   checkout,
//   paymentVerification,
// } from "../controller/paymentController";

// const router = express.Router();

// router.route("/checkout").post(checkout);

// router.route("/paymentverification").post(paymentVerification);

// export default router;
const express = require("express");
const { checkout, paymentVerification } = require("../controller/paymentController");

const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/paymentverification").post(paymentVerification);

module.exports = router;
