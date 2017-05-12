var mongoose = require('mongoose');
var ScreenSchema = new mongoose.Schema({
    def: [{
        x: Number,
        width: {type: Number, default:1},
        y: Number,
        height: {type: Number, default:1},
        tile: String,
        walkable: Boolean,
        goto: String
    }]
});
module.exports = mongoose.model('screens', ScreenSchema);