const router = require('express').Router();
const { auth, adminOnly } = require('../middleware/auth');
const c = require('../controllers/projectController');

router.get('/', auth, c.getAllProjects);
router.post('/', auth, adminOnly, c.createProject);
router.put('/:id', auth, adminOnly, c.updateProject);
router.delete('/:id', auth, adminOnly, c.deleteProject);

module.exports = router;
