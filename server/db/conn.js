const mongoose = require('mongoose');

const DB = "mongodb+srv://Abhipatil:Danny%40123@cluster0.9puio3u.mongodb.net/CrudNew?retryWrites=true&w=majority";



mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connection Successful");
})
.catch((err) => console.log(err));
