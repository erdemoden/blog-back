const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://erdemoden:elmayiyen5@movie-api.icdyd.mongodb.net/Blog-App?retryWrites=true&w=majority");

module.exports = ()=>{
    mongoose.connection.on("open",()=>{
        console.log("Bağlandık");
    });
    mongoose.connection.on("error",()=>{
        console.log("Hata");
    });
}
mongoose.Promise = global.Promise