const express = require('express');
const cors = require('cors');
const multer = require('multer')
const app = express();
const port = 3030;
app.use(cors());
const members=require("./routes/members");
const covid=require("./routes/covid")

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.use('/members',members);
app.use('/covid',covid)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.use(express.static('images'));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})





