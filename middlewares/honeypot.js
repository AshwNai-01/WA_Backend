// Spam trap for public forms. The form has a hidden "website" field that people
// never see; bots fill in every field. If it has a value, reply as if the request
// worked, but skip saving, so the bot gets no signal that it was caught.
module.exports = (req, res, next) => {
  if (req.body?.website) {
    return res.status(201).json({ success: true, message: "Thanks! We'll get back to you shortly." });
  }
  next();
};
