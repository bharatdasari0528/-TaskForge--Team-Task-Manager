const router = require('express').Router();
const { auth, adminOnly } = require('../middleware/auth');
const c = require('../controllers/taskController');

router.get('/', auth, c.getAllTasks);
router.get('/:id', auth, c.getTask);
router.post('/', auth, c.createTask);
router.put('/:id', auth, c.updateTask);
router.delete('/:id', auth, adminOnly, c.deleteTask);

module.exports = router;
