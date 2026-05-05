const { Op } = require('sequelize');
const { Task, User, Project } = require('../models');

const taskIncludes = [
  { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
  { model: User, as: 'creator', attributes: ['id', 'name'] },
  { model: Project, as: 'project', attributes: ['id', 'name'] }
];

exports.getAllTasks = async (req, res) => {
  try {
    const where = req.user.role === 'Admin' ? {} : { assigneeId: req.user.id };
    const tasks = await Task.findAll({ where, include: taskIncludes, order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: taskIncludes });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (req.user.role !== 'Admin' && task.assigneeId !== req.user.id)
      return res.status(403).json({ error: 'Access denied' });
    res.json(task);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, projectId, assigneeId } = req.body;
    if (!title || !projectId || !assigneeId)
      return res.status(400).json({ error: 'title, projectId and assigneeId are required' });
    const task = await Task.create({
      title, description, dueDate, projectId,
      assigneeId: req.user.role === 'Admin' ? assigneeId : req.user.id,
      createdBy: req.user.id
    });
    const full = await Task.findByPk(task.id, { include: taskIncludes });
    res.status(201).json(full);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (req.user.role !== 'Admin' && task.assigneeId !== req.user.id)
      return res.status(403).json({ error: 'Access denied' });

    const allowed = req.user.role === 'Admin'
      ? ['title', 'description', 'status', 'dueDate', 'assigneeId', 'projectId']
      : ['status'];
    allowed.forEach(f => { if (req.body[f] !== undefined) task[f] = req.body[f]; });
    await task.save();
    const full = await Task.findByPk(task.id, { include: taskIncludes });
    res.json(full);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
