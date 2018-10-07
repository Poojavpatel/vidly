const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log('id', id);

const a = mongoose.Types.ObjectId.isValid();
console.log('a', a);