const { User, Task } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [['name', 'ASC']] });
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateRole = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!['Admin', 'Member'].includes(req.body.role))
      return res.status(400).json({ error: 'Role must be Admin or Member' });
    user.role = req.body.role;
    await user.save();
    res.json(user);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
