// ─── Admin Authentication Middleware ─────────────────────────────────────────
// Pass x-admin-key header to access protected routes
// Set ADMIN_KEY in your .env file

const adminAuth = (req, res, next) => {
  const key = req.headers['x-admin-key'];

  if (!key) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Admin key required.',
    });
  }

  if (!process.env.ADMIN_KEY) {
    console.warn('⚠️  ADMIN_KEY not set in .env — admin routes are unprotected!');
    return next();
  }

  if (key !== process.env.ADMIN_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Invalid admin key.',
    });
  }

  next();
};

module.exports = { adminAuth };
