const express = require('express');
const app = express();
const db = require("./db")();
require("dotenv").config();
const log = require("./log.js");
const cors = require('cors');
const cookieparser = require('cookie-parser');
app.listen(process.env.PORT||1998);
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use("/",log);

