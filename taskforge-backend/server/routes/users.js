const router = require('express').Router();
const { auth, adminOnly } = require('../middleware/auth');
const c = require('../controllers/userController');

router.get('/', auth, adminOnly, c.getAllUsers);
router.get('/:id', auth, c.getUser);
router.put('/:id/role', auth, adminOnly, c.updateRole);

module.exports = router;
