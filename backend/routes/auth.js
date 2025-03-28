const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto'); 

// Owner Login
router.post('/login', async (req, res) => { // Mark the function as async
    const { email, password } = req.body;

    db.query('SELECT * FROM Membership WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (results.length === 0) {
            return res.status(400).json({ message: 'Email not found!' });
        }

        const owner = results[0];

        if (owner.verified === 0) {
            const newVerificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
            db.query('UPDATE Membership SET verification_code = ? WHERE email = ?', [newVerificationCode, email], (err, result) => {
                if (err) return res.status(500).json({ message: 'Database error', error: err });

                // Send the new verification email
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Verify Your Email',
                    html: `<p>Your new verification code is: <strong>${newVerificationCode}</strong></p>`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending verification email:', error);
                        return res.status(500).json({ message: 'Error sending verification email', error });
                    }
                    console.log('Verification email sent:', info.response);
                    return res.status(403).json({ message: 'Please verify your email. A new verification code has been sent to your email.' });
                });
            });
        } else {
            if (!(await bcrypt.compare(password, owner.password))) {
                return res.status(400).json({ message: 'Incorrect password!' });
            }

            // Check if the membership is expired
            const currentDate = new Date();
            if (new Date(owner.end_date) < currentDate) {
                return res.json({ message: 'Membership expired, please renew your membership', membership_id: owner.membership_id, requiresMembershipRenewal: true });
            }

            // Check if the restaurant is registered
            db.query('SELECT * FROM Restaurant WHERE membership_id = ?', [owner.membership_id], (err, restaurantResults) => {
                if (err) return res.status(500).json({ message: 'Database error', error: err });

                const token = jwt.sign({ id: owner.membership_id, role: 'owner' }, process.env.JWT_SECRET, { expiresIn: '1d' });

                if (restaurantResults.length === 0) {
                    return res.json({ message: 'Login successful, please register your restaurant', token, membership_id: owner.membership_id, requiresRestaurantRegistration: true });
                } else {
                    return res.json({ message: 'Login successful', token, membership_id: owner.membership_id });
                }
            });
        }
    });
});