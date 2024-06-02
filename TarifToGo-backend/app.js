const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Connect to MongoDB
const mongoURL="mongodb+srv://berkatcekenn:XsSbRrtp40WXigQT@cluster0.hl2scug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const crypto = require('crypto');
const { error } = require('console');
const JWT_SECRET = crypto.randomBytes(32).toString('hex');

mongoose
    .connect(mongoURL)
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

require('./UserDetails');

const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
    res.send({ status: "Started"});
});

app.post("/signup", async (req, res) => {
    const {name, email, mobile, gender, profession, password} = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "Bu mail adresi zaten kullanımda"});
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name: name,
            email: email,
            mobile,
            gender,
            profession,
            password: encryptedPassword,
        });
        res.send({ status: "ok", data: "Kullanıcı başarıyla oluşturuldu"});
    } catch (error) {
        res.send({ status: "error", data: error});
    }
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const oldUser = await User.findOne({ email: email});

    if (!oldUser) {
        return res.send({ data: "Kullanıcı bulunamadı" });
    }

    const passwordMatch = await bcrypt.compare(password, oldUser.password);
    if (passwordMatch) {
        const token = jwt.sign({ email: oldUser.email}, JWT_SECRET);

        if(res.status(200)){
            res.send({ status: "ok", data: token});
        } else {
            res.send({ error: "error" });
        }
    }
});

app.post("/userdetails", async (req, res) => {
    const {token} = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;

        User.findOne({ email: useremail }).then(data => {
            return res.send({ status: "Ok", data: data });
        });
    } catch (error){
        return res.send({status: "error", data: "Kullanıcı bulunamadı"});
    } 
});

app.post("/update-user", async (req, res) => {
    const {name, email, mobile, image, gender, profession} = req.body;
    try {
        await User.updateOne({ email: email }, {
            $set: {
                name,
                mobile,
                image,
                gender,
                profession,
            },
        });
        res.send({ status: "Ok", data: "Kullanıcı başarıyla güncellendi"});
} catch (error) {
    res.send({ error: error});
}
});
    

app.listen(5001, () => {
    console.log('Server running on port 5001');
})