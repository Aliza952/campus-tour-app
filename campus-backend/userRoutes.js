const express = require('express');
const router = express.Router();
const pool = require('./db'); // PostgreSQL connection

// Save or update user settings
router.post('/save-settings', async (req, res) => {
  const { username, avatar_color } = req.body;

  console.log('Saving:', username, avatar_color);

  try {
    const result = await pool.query(
      `INSERT INTO users (username, avatar_color)
       VALUES ($1, $2)
       ON CONFLICT (username)
       DO UPDATE SET avatar_color = EXCLUDED.avatar_color
       RETURNING *`,
      [username, avatar_color]
    );
    res.status(200).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error saving settings' });
  }
});

module.exports = router;
