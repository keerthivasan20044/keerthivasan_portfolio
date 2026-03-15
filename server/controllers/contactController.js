const { validationResult } = require('express-validator');
const Message = require('../models/Message');

// ─── @desc    Submit contact form — save to MongoDB
// ─── @route   POST /api/contact
// ─── @access  Public
const submitContact = async (req, res, next) => {
  // Check validation results from middleware/validate.js
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, msg: e.msg })),
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Get real client IP (works behind proxies like Render/Vercel)
    const ipAddress =
      (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    const saved = await Message.create({
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      subject: subject?.trim() || 'Portfolio Contact',
      message: message.trim(),
      ipAddress,
    });

    console.log(`📨 [${new Date().toISOString()}] New message from ${name} <${email}>`);

    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon 🚀",
      data: {
        id:        saved._id,
        name:      saved.name,
        createdAt: saved.createdAt,
      },
    });
  } catch (error) {
    next(error); // passes to global errorHandler
  }
};

module.exports = { submitContact };
