const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const CRM = mongoose.model("CRM", CustomerSchema);

module.exports = CRM;