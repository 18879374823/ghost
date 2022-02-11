const User = require('./model/user.js');
// console.log(User);
User.find({}, (err, doc) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(doc);
})