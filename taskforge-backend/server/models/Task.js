const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM('To Do', 'In Progress', 'Done', 'Overdue'),
    defaultValue: 'To Do'
  },
  dueDate: { type: DataTypes.DATEONLY },
  projectId: { type: DataTypes.INTEGER, allowNull: false },
  assigneeId: { type: DataTypes.INTEGER, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

module.exports = Task;
