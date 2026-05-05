const { Project, User, Task } = require('../models');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: User, as: 'members', attributes: ['id', 'name', 'email', 'role'], through: { attributes: [] } },
        { model: Task, as: 'tasks', attributes: ['id', 'status'] }
      ]
    });
    res.json(projects);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, memberIds } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const project = await Project.create({ name, description, createdBy: req.user.id });
    const ids = Array.isArray(memberIds) && memberIds.length ? memberIds : [req.user.id];
    const members = await User.findAll({ where: { id: ids } });
    await project.setMembers(members);
    const full = await Project.findByPk(project.id, {
      include: [{ model: User, as: 'members', attributes: ['id', 'name', 'email'], through: { attributes: [] } }]
    });
    res.status(201).json(full);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    const { name, description, memberIds } = req.body;
    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    await project.save();
    if (Array.isArray(memberIds)) {
      const members = await User.findAll({ where: { id: memberIds } });
      await project.setMembers(members);
    }
    res.json(project);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    res.json({ message: 'Project deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
