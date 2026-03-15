const express = require('express');
const router  = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  getMessages,
  getMessage,
  markAsRead,
  deleteMessage,
  deleteAllMessages,
} = require('../controllers/messageController');

// All routes below require admin key header: x-admin-key
router.use(adminAuth);

// BUG FIX: DELETE '/' must come BEFORE DELETE '/:id'
// otherwise '/' gets treated as an :id param
router.delete('/',        deleteAllMessages);  // DELETE /api/messages
router.delete('/:id',     deleteMessage);      // DELETE /api/messages/:id

router.get('/',           getMessages);        // GET  /api/messages
router.get('/:id',        getMessage);         // GET  /api/messages/:id
router.patch('/:id/read', markAsRead);         // PATCH /api/messages/:id/read

module.exports = router;
