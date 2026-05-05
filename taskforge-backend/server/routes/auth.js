const router = require('express').Router();
const { body } = require('express-validator');
const { signup, login, me } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/signup',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  signup
);
router.post('/login',
  [body('email').isEmail(), body('password').notEmpty()],
  login
);
router.get('/me', auth, me);

module.exports = router;
