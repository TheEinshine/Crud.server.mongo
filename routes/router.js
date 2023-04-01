const express = require('express');
const router = express.Router();
const assignment = require('../models/userSchema');


// router.get('/', (req, res) => {
//     res.send('Hello World from the server router.js');
// });

//register a new user

router.post('/register', async (req, res) => {
    console.log(req.body);
    // res.json({ message: req.body });
    const { name, email, description } = req.body;
    if (!name || !email || !description) {
        return res.status(422).json({ error: "Please fill the field properly" });
    }
    try {
        const preUser = await assignment.findOne({ email: email });
        console.log(preUser);
        if (preUser) {
            return res.status(422).json({ error: "Email already exist" });
        } else {
            const user = new assignment({
                name, email, description
            });
            await user.save();
            res.status(201).json({ message: "User registered successfully" });
            console.log(user);
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to register" });
        console.log(err);
    }
});

//get all user
router.get('/getdata', async (req, res) => {
    try {
        const userData = await assignment.find();
        res.status(200).json({ userData });
    } catch (err) {
        res.status(500).json({ error: "Failed to get data" });
        console.log(err);
    }
});

//get single user
router.get('/getuser/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const userIndividual = await assignment.findById(id);
        console.log(userIndividual);
        res.status(200).json({ userIndividual });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to get data" });
        console.log(err);
    }
});

//update user

router.patch('/updateuser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateuser = await assignment.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updateuser);
        res.status(200).json({ updateuser });
    } catch (err) {
        res.status(500).json({ error: "Failed to update data" });
        console.log(err);
    }
});

//delete user
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteuser = await assignment.findByIdAndDelete({ _id: id });
        console.log(deleteuser);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete data" });
        console.log(err);
    }
});




module.exports = router;