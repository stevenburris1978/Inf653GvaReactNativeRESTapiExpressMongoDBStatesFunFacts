const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// send this createAdmin.js hash password to Mongodb by going to file path and    node createAdmin.js
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdminUser(username, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
        username: username,
        password: hashedPassword
    });

    await admin.save();
    console.log(`Admin user ${username} created`);
}

// replace with actual usernames and passwords
createAdminUser('user1', 'password1').then(() => {
    createAdminUser('user2', 'password2').then(() => {
        mongoose.connection.close();
    });
});
