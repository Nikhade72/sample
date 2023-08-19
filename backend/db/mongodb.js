const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://HarshaVilasraoNikhade:Harsha1234@cluster0.znhrbrv.mongodb.net/")
    .then(() => {
        console.log('connected to atlas')
    })
    .catch((e) => {
        console.log('not able to connect to atlas');
    })