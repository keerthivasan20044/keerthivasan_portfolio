const mongoose = require('mongoose');
const Message  = require('../models/Message');

// ─── @desc    Get all messages (paginated)
// ─── @route   GET /api/messages?page=1&limit=20&unread=true
// ─── @access  Private (Admin)
const getMessages = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;
    const filter = req.query.unread === 'true' ? { isRead: false } : {};

    const [messages, total, unreadCount] = await Promise.all([
      Message.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v'),
      Message.countDocuments(filter),
      Message.countDocuments({ isRead: false }),
    ]);

    return res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
      unreadCount,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Get single message by ID
// ─── @route   GET /api/messages/:id
// ─── @access  Private (Admin)
const getMessage = async (req, res, next) => {
  try {
    // BUG FIX: validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid message ID' });
    }

    const msg = await Message.findById(req.params.id).select('-__v');
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

    return res.json({ success: true, data: msg });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Mark message as read
// ─── @route   PATCH /api/messages/:id/read
// ─── @access  Private (Admin)
const markAsRead = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid message ID' });
    }

    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, data: msg });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Delete one message
// ─── @route   DELETE /api/messages/:id
// ─── @access  Private (Admin)
const deleteMessage = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid message ID' });
    }

    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

    return res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Delete ALL messages
// ─── @route   DELETE /api/messages
// ─── @access  Private (Admin)
const deleteAllMessages = async (req, res, next) => {
  try {
    const result = await Message.deleteMany({});
    return res.json({
      success: true,
      message: `Deleted ${result.deletedCount} message(s)`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessages, getMessage, markAsRead, deleteMessage, deleteAllMessages };
