const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 },
});

const Counter = mongoose.model("Counter", counterSchema);

const phraseSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    phrase: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

phraseSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc._id) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "phraseId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      doc._id = counter.seq;
    } catch (error) {
      return next(error);
    }
  }
  return next();
});

const Phrase = mongoose.model("Phrase", phraseSchema);

module.exports = Phrase;
