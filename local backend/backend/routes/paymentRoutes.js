const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Unit = require("../models/Unit");

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay Order for a Specific PDF (unitId)
router.post("/create", async (req, res) => {
    try {
        const { unitId } = req.body;

        // Check if unit exists
        const unit = await Unit.findById(unitId);
        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        const options = {
            amount: 15* 100, // Amount in paise (₹10.00)
            currency: "INR",
            receipt: `receipt_${unitId}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, orderId: order.id, unitId });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating payment order", error });
    }
});

// Verify Payment & Grant PDF Access
router.get("/verify",  async (req, res) => {
    try {
      const { pdfUrl } = req.query;
      const userId = req.user._id; // Retrieved from session
  
      if (!pdfUrl) {
        return res.status(400).json({ success: false, message: "PDF URL is required." });
      }
  
      // Find the unit associated with this PDF
      const unit = await Unit.findOne({ pdfUrl });
      if (!unit) {
        return res.status(404).json({ success: false, message: "Unit not found." });
      }
  
      // Check if the user has made a successful payment for this unit
      const payment = await Payment.findOne({ userId, unitId: unit._id, status: "success" });
      if (!payment) {
        return res.status(403).json({ success: false, message: "Access denied. Payment required." });
      }
  
      res.status(200).json({ success: true, message: "Access granted." });
    } catch (error) {
      console.error("Error verifying PDF access:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  });

router.get("/pdf/:unitId", async (req, res) => {
    const userId = req.user.id;
    const { unitId } = req.params;

    const user = await User.findById(userId);
    if (!user.purchasedUnits.includes(unitId)) {
        return res.status(403).json({ message: "Access denied. Please purchase this unit." });
    }

    const unit = await Unit.findById(unitId);
    if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
    }

    res.json({ success: true, pdfUrl: unit.pdfUrl });
});


module.exports = router;



// const express = require('express');
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const User = require('../models/User');
// const Unit = require('../models/Unit');
// const router = express.Router();
// require('dotenv').config();

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /**
//  * Create a Razorpay Order
//  */
// router.post("/create", async (req, res) => {
//     try {
//         const { unitId, userId } = req.body;

//         // Validate inputs
//         if (!unitId || !userId) {
//             return res.status(400).json({ success: false, message: "Missing unitId or userId" });
//         }

//         // Check if unit exists
//         const unit = await Unit.findById(unitId);
//         if (!unit) {
//             return res.status(404).json({ success: false, message: "Unit not found" });
//         }

//         // Define order amount dynamically (should come from database)
//         const amount = unit.price * 100; // Convert to paise

//         const options = {
//             amount,
//             currency: "INR",
//             receipt: `receipt_${unitId}_${userId}`,
//         };

//         const order = await razorpay.orders.create(options);
//         res.json({
//             success: true,
//             orderId: order.id,
//             amount: order.amount,
//             currency: order.currency,
//         });

//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ success: false, message: "Error creating payment order" });
//     }
// });

// /**
//  * Verify Payment and Grant Access
//  */
// router.post("/verify", async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, unitId, userId } = req.body;

//         // Validate inputs
//         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !unitId || !userId) {
//             return res.status(400).json({ success: false, message: "Missing required fields" });
//         }

//         // Check if unit exists
//         const unit = await Unit.findById(unitId);
//         if (!unit) {
//             return res.status(404).json({ success: false, message: "Unit not found" });
//         }

//         // Verify the Razorpay signature
//         const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//         hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//         const generatedSignature = hmac.digest("hex");

//         if (generatedSignature !== razorpay_signature) {
//             return res.status(400).json({ success: false, message: "Invalid signature, payment failed!" });
//         }

//         // Add unit to user's purchased list
//         await User.findByIdAndUpdate(userId, { $addToSet: { purchasedUnits: unitId } });

//         res.json({ success: true, message: "Payment verified! Access granted." });

//     } catch (error) {
//         console.error("Payment verification error:", error);
//         res.status(500).json({ success: false, message: "Error verifying payment" });
//     }
// });

// /**
//  * Get Notes for Purchased Unit
//  */
// router.get("/notes/:unitId", async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         const { unitId } = req.params;

//         // Ensure user is authenticated
//         if (!userId) {
//             return res.status(401).json({ success: false, message: "Unauthorized" });
//         }

//         // Check if user has purchased the unit
//         const user = await User.findById(userId);
//         if (!user || !user.purchasedUnits.includes(unitId)) {
//             return res.status(403).json({ success: false, message: "Access denied. Please purchase this unit." });
//         }

//         res.json({ success: true, notes: "Here are your notes..." });

//     } catch (error) {
//         console.error("Error fetching notes:", error);
//         res.status(500).json({ success: false, message: "Error fetching notes" });
//     }
// });

// module.exports = router;




// // const express = require('express');
// // const Razorpay = require("razorpay");
// // const crypto = require("crypto");
// // const User = require('../models/User');
// // const Unit = require('../models/Unit');
// // const router = express.Router();
// // require('dotenv').config();

// // const razorpay = new Razorpay({
// //     key_id: process.env.RAZORPAY_KEY_ID,
// //     key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // router.post("/create", async (req, res) => {
// //     try {
// //         const { unitId } = req.body;
// //         const options = {
// //             amount: 1000 * 100, // Amount in paise (₹10.00)
// //             currency: "INR",
// //             receipt: `receipt_${unitId}`,
// //         };

// //         const order = await razorpay.orders.create(options);
// //         res.json({ success: true, orderId: order.id, paymentUrl: `https://checkout.razorpay.com/v1/checkout.js?order_id=${order.id}` });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: "Error creating payment order", error });
// //     }
// // });

// // router.post("/verify", async (req, res) => {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, unitId, userId } = req.body;

// //     const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
// //     hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
// //     const generatedSignature = hmac.digest("hex");

// //     if (generatedSignature === razorpay_signature) {
// //         await User.findByIdAndUpdate(userId, { $push: { purchasedUnits: unitId } });
// //         res.json({ success: true, message: "Payment verified, access granted!" });
// //     } else {
// //         res.status(400).json({ success: false, message: "Invalid signature, payment failed!" });
// //     }
// // });

// // router.get("/notes/:unitId", async (req, res) => {
// //     const userId = req.user.id;
// //     const { unitId } = req.params;

// //     const user = await User.findById(userId);
// //     if (!user.purchasedUnits.includes(unitId)) {
// //         return res.status(403).json({ message: "Access denied. Please purchase this unit." });
// //     }

// //     res.json({ success: true, notes: "Here are your notes..." });
// // });


// // module.exports = router;



