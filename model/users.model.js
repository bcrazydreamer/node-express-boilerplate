const mongoose = require('mongoose');

const ModelSchama = mongoose.Schema(
    {
        /**
         * Email
         */
        "e": {
            type: String,
            trim: true,
            lowercase: true,
            required: false
        },
        /**
         * Account active statement, Act false denote delete
         * We can't delete any thing from database
         */
        "act": {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

ModelSchama.index({ e: 1 }, { unique: true })
ModelSchama.index({ e: 1, act: 1 });

module.exports = mongoose.model("user", ModelSchama);