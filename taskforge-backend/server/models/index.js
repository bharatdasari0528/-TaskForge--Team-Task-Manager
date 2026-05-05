const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');

// Associations
User.hasMany(Task, { foreignKey: 'assigneeId', as: 'assignedTasks' });
User.hasMany(Task, { foreignKey: 'createdBy', as: 'createdTasks' });
Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });
Task.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

User.belongsToMany(Project, { through: 'ProjectMembers', as: 'projects' });
Project.belongsToMany(User, { through: 'ProjectMembers', as: 'members' });

module.exports = { sequelize, User, Project, Task };
