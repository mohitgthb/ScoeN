const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// const sgMail = require('@sendgrid/mail');
// const crypto = require('crypto');
// const fetch = require("node-fetch");

require('dotenv').config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Sign-up route
// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// });

const verifyEmail = async (email) => {
    try {
        const API_KEY = process.env.ABSTRACT_API_KEY;

        if (!API_KEY) {
            console.error("Abstract API Key is missing. Check .env file!");
            return false;
        }

        const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`);

        if (!response.ok) {
            console.error("API Request Failed:", response.status, response.statusText);
            return false;
        }

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2));

        if (!data.is_valid_format.value) {
            console.error("Invalid email format!");
            return false;
        }

        if (data.deliverability === "UNDELIVERABLE") {
            console.error("Email is undeliverable!");
            return false;
        }

        console.log("Email is valid and deliverable!");
        return true;

    } catch (error) {
        console.error("Error in fetch request:", error);
        return false;
    }
};


router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log("Checking email:", email);

        const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);
        const data = await response.json();

        console.log("🔍 Abstract API Full Response:", JSON.stringify(data, null, 2)); // 

        if (!data.is_valid_format.value || data.deliverability !== "DELIVERABLE") {
            return res.status(400).json({ message: "Abstract API rejected this email", abstractResponse: data });
        }

        console.log("Email is valid. Proceeding with signup...");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save(); // This might be causing the issue!

        console.log("🎉 User created successfully:", newUser);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error creating user:", error);  // Print full error
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});


// Sign-in route
router.post('/signin', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully', user: req.user });
});

// router.get('/session-check', (req, res) => {
//     if (req.session.userId) { // Assuming you store userId in session
//       res.json({ authenticated: true });
//     } else {
//       res.status(401).json({ authenticated: false });
//     }
//   });

// Get current user route
router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'User is not authenticated' });
    }
});

// Logout route
router.post("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error during logout", error: err });
      }
      req.session.destroy(); 
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });

  // Redirect to Google for authentication
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google callback after authentication
// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/signin' }),
//   (req, res) => {
//     // Successful authentication, redirect to the desired page
//     res.redirect('/');
//   }
// );

module.exports = router;