const User = require('./models/User');
const Event = require('./models/Event');
const Task = require('./models/Task');
const Habit = require('./models/Habit');
const HabitLog = require('./models/HabitLog');
const Goal = require('./models/Goal');
const Note = require('./models/Note');
const Finance = require('./models/Finance');
const Gamification = require('./models/Gamification');
const Achievement = require('./models/Achievement');
const AIInteraction = require('./models/AIInteraction');
const Notification = require('./models/Notification');
const Preference = require('./models/Preference');
const db = require('./config/database');

class UserService {
  static async createUser(userData) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, salt);
    
    const user = await User.create({ ...userData, password_hash });
    
    await Gamification.create({ usuario_id: user.id });
    
    return user;
  }

  static async authenticateUser(email, password) {
    const user = await User.findByEmail(email);
    if (!user) return null;
    
    const isValidPassword = await User.verifyPassword(email, password);
    if (!isValidPassword) return null;
    
    await User.updateLastLogin(user.id);
    await Gamification.updateStreak(user.id);
    
    return user;
  }

  static async getDashboardStats(usuario_id) {
    return await User.getUserStats(usuario_id);
  }

  static async updateUser(usuario_id, updateData) {
    return await User.update(usuario_id, updateData);
  }
}

class EventService {
  static async createEvent(eventData) {
    return await Event.create(eventData);
  }

  static async getEvents(usuario_id, filters = {}) {
    return await Event.findByUser(usuario_id, filters);
  }

  static async getEvent(id, usuario_id) {
    const event = await Event.findById(id);
    if (!event || event.usuario_id !== usuario_id) return null;
    return event;
  }

  static async updateEvent(id, usuario_id, updateData) {
    const event = await Event.findById(id);
    if (!event || event.usuario_id !== usuario_id) return null;
    
    return await Event.update(id, updateData);
  }

  static async deleteEvent(id, usuario_id) {
    const event = await Event.findById(id);
    if (!event || event.usuario_id !== usuario_id) return false;
    
    return await Event.delete(id);
  }

  static async getEventsForDate(usuario_id, fecha) {
    return await Event.getEventsForDate(usuario_id, fecha);
  }

  static async getRecurringEvents(usuario_id, fecha) {
    return await Event.getRecurringEvents(usuario_id, fecha);
  }
}

class TaskService {
  static async createTask(taskData) {
    return await Task.create(taskData);
  }

  static async getTasks(usuario_id, filters = {}) {
    return await Task.findByUser(usuario_id, filters);
  }

  static async getTask(id, usuario_id) {
    const task = await Task.findById(id);
    if (!task || task.usuario_id !== usuario_id) return null;
    return task;
  }

  static async updateTask(id, usuario_id, updateData) {
    const task = await Task.findById(id);
    if (!task || task.usuario_id !== usuario_id) return null;
    
    return await Task.update(id, updateData);
  }

  static async deleteTask(id, usuario_id) {
    const task = await Task.findById(id);
    if (!task || task.usuario_id !== usuario_id) return false;
    
    return await Task.delete(id);
  }

  static async completeTask(id, usuario_id) {
    const task = await Task.findById(id);
    if (!task || task.usuario_id !== usuario_id) return null;
    
    return await Task.complete(id);
  }

  static async getTasksByPriority(usuario_id, prioridad) {
    return await Task.getTasksByPriority(usuario_id, prioridad);
  }
}

class HabitService {
  static async createHabit(habitData) {
    return await Habit.create(habitData);
  }

  static async getHabits(usuario_id, filters = {}) {
    return await Habit.findByUser(usuario_id, filters);
  }

  static async getHabit(id, usuario_id) {
    const habit = await Habit.findById(id);
    if (!habit || habit.usuario_id !== usuario_id) return null;
    return habit;
  }

  static async updateHabit(id, usuario_id, updateData) {
    const habit = await Habit.findById(id);
    if (!habit || habit.usuario_id !== usuario_id) return null;
    
    return await Habit.update(id, updateData);
  }

  static async deleteHabit(id, usuario_id) {
    const habit = await Habit.findById(id);
    if (!habit || habit.usuario_id !== usuario_id) return false;
    
    return await Habit.delete(id);
  }

  static async logHabit(habitLogData) {
    return await HabitLog.create(habitLogData);
  }

  static async getHabitLogs(usuario_id, fecha = null) {
    return await HabitLog.findByUser(usuario_id, fecha);
  }

  static async getHabitLogsForDate(usuario_id, fecha) {
    return await HabitLog.getHabitLogsForDate(usuario_id, fecha);
  }

  static async getHabitStats(usuario_id, fecha) {
    return await Habit.getHabitStats(usuario_id, fecha);
  }
}

class GoalService {
  static async createGoal(goalData) {
    return await Goal.create(goalData);
  }

  static async getGoals(usuario_id, filters = {}) {
    return await Goal.findByUser(usuario_id, filters);
  }

  static async getGoal(id, usuario_id) {
    const goal = await Goal.findById(id);
    if (!goal || goal.usuario_id !== usuario_id) return null;
    return goal;
  }

  static async updateGoal(id, usuario_id, updateData) {
    const goal = await Goal.findById(id);
    if (!goal || goal.usuario_id !== usuario_id) return null;
    
    return await Goal.update(id, updateData);
  }

  static async deleteGoal(id, usuario_id) {
    const goal = await Goal.findById(id);
    if (!goal || goal.usuario_id !== usuario_id) return false;
    
    return await Goal.delete(id);
 }

  static async completeGoal(id, usuario_id) {
    const goal = await Goal.findById(id);
    if (!goal || goal.usuario_id !== usuario_id) return null;
    
    return await Goal.complete(id);
  }

  static async updateGoalProgress(id, usuario_id, progreso) {
    const goal = await Goal.findById(id);
    if (!goal || goal.usuario_id !== usuario_id) return null;
    
    return await Goal.updateProgress(id, progreso);
  }

  static async getGoalsStats(usuario_id) {
    return await Goal.getGoalsStats(usuario_id);
  }
}

class NoteService {
  static async createNote(noteData) {
    return await Note.create(noteData);
  }

  static async getNotes(usuario_id, filters = {}) {
    return await Note.findByUser(usuario_id, filters);
  }

  static async getNote(id, usuario_id) {
    const note = await Note.findById(id);
    if (!note || note.usuario_id !== usuario_id) return null;
    return note;
  }

  static async updateNote(id, usuario_id, updateData) {
    const note = await Note.findById(id);
    if (!note || note.usuario_id !== usuario_id) return null;
    
    return await Note.update(id, updateData);
  }

  static async deleteNote(id, usuario_id) {
    const note = await Note.findById(id);
    if (!note || note.usuario_id !== usuario_id) return false;
    
    return await Note.delete(id);
  }

  static async searchNotes(usuario_id, query) {
    return await Note.search(usuario_id, query);
  }
}

class FinanceService {
  static async createFinance(financeData) {
    return await Finance.create(financeData);
  }

  static async getFinances(usuario_id, filters = {}) {
    return await Finance.findByUser(usuario_id, filters);
  }

  static async getFinance(id, usuario_id) {
    const finance = await Finance.findById(id);
    if (!finance || finance.usuario_id !== usuario_id) return null;
    return finance;
  }

  static async updateFinance(id, usuario_id, updateData) {
    const finance = await Finance.findById(id);
    if (!finance || finance.usuario_id !== usuario_id) return null;
    
    return await Finance.update(id, updateData);
  }

  static async deleteFinance(id, usuario_id) {
    const finance = await Finance.findById(id);
    if (!finance || finance.usuario_id !== usuario_id) return false;
    
    return await Finance.delete(id);
  }

  static async getFinanceStats(usuario_id, fechaInicio, fechaFin) {
    return await Finance.getFinanceStats(usuario_id, fechaInicio, fechaFin);
  }

  static async getMonthlySummary(usuario_id, mes, anio) {
    return await Finance.getMonthlySummary(usuario_id, mes, anio);
  }
}

class GamificationService {
  static async getGamification(usuario_id) {
    return await Gamification.findByUser(usuario_id);
  }

  static async updateXP(usuario_id, puntos) {
    return await Gamification.updateXP(usuario_id, puntos);
  }

  static async getLeaderboard(limit = 10) {
    return await Gamification.getLeaderboard(limit);
  }

  static async getAchievements(usuario_id) {
    return await Achievement.findByUser(usuario_id);
  }

  static async addAchievement(achievementData) {
    return await Achievement.create(achievementData);
  }
}

class NotificationService {
  static async createNotification(notificationData) {
    return await Notification.create(notificationData);
  }

  static async getNotifications(usuario_id, filters = {}) {
    return await Notification.findByUser(usuario_id, filters);
  }

  static async getNotification(id, usuario_id) {
    const notification = await Notification.findById(id);
    if (!notification || notification.usuario_id !== usuario_id) return null;
    return notification;
  }

  static async updateNotification(id, usuario_id, updateData) {
    const notification = await Notification.findById(id);
    if (!notification || notification.usuario_id !== usuario_id) return null;
    
    return await Notification.update(id, updateData);
  }

  static async deleteNotification(id, usuario_id) {
    const notification = await Notification.findById(id);
    if (!notification || notification.usuario_id !== usuario_id) return false;
    
    return await Notification.delete(id);
  }

  static async markNotificationAsRead(id, usuario_id) {
    const notification = await Notification.findById(id);
    if (!notification || notification.usuario_id !== usuario_id) return null;
    
    return await Notification.markAsRead(id);
  }

  static async markAllNotificationsAsRead(usuario_id) {
    return await Notification.markAllAsRead(usuario_id);
  }

  static async getNotificationStats(usuario_id) {
    return await Notification.getNotificationStats(usuario_id);
  }
}

class PreferenceService {
  static async getPreferences(usuario_id) {
    return await Preference.findByUser(usuario_id);
  }

  static async updatePreferences(usuario_id, updateData) {
    const preferences = await Preference.findByUser(usuario_id);
    if (!preferences) {
      return await Preference.create({ usuario_id, ...updateData });
    }
    
    return await Preference.update(preferences.id, updateData);
  }
}

class AIService {
  static async processUserRequest(usuario_id, tipo, prompt) {
    const openai = require('openai')({ apiKey: process.env.OPENAI_API_KEY });
    
    let systemPrompt = '';
    switch (tipo) {
      case 'agenda':
        systemPrompt = 'Eres un asistente de planificación personal. Ayuda a organizar el día del usuario, priorizar tareas y sugerir horarios.';
        break;
      case 'tareas':
        systemPrompt = 'Eres un asistente de gestión de tareas. Ayuda a crear, organizar y priorizar tareas.';
        break;
      case 'hábitos':
        systemPrompt = 'Eres un asistente de seguimiento de hábitos. Ayuda a crear hábitos, sugerir horarios y mantener rachas.';
        break;
      case 'metas':
        systemPrompt = 'Eres un asistente de seguimiento de metas. Ayuda a establecer, organizar y hacer seguimiento de objetivos.';
        break;
      case 'notas':
        systemPrompt = 'Eres un asistente de toma de notas. Ayuda a organizar ideas, crear notas y buscar información.';
        break;
      case 'finanzas':
        systemPrompt = 'Eres un asistente de gestión financiera. Ayuda a registrar gastos, crear presupuestos y analizar tendencias.';
        break;
      default:
        systemPrompt = 'Eres un asistente de productividad personal. Ayuda a organizar la vida del usuario.';
    }
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });
    
    const respuesta = completion.choices[0].message.content;
    
    await AIInteraction.create({
      usuario_id,
      tipo,
      prompt,
      respuesta
    });
    
    return respuesta;
  }

  static async generateSchedule(usuario_id, request) {
    const prompt = `Organiza el día del usuario para: ${request}. Proporciona un horario detallado con bloques de tiempo específicos para cada actividad.`;
    
    return await this.processUserRequest(usuario_id, 'agenda', prompt);
  }

  static async suggestBreakTime(usuario_id, actividadActual, tiempoTranscurrido) {
    const prompt = `Sugerir un tiempo de descanso para el usuario después de ${tiempoTranscurrido} minutos de ${actividadActual}. Proporcionar duración recomendada y ejercicios de estiramiento.`;
    
    return await this.processUserRequest(usuario_id, 'hábitos', prompt);
  }

  static async detectOverload(usuario_id, actividades) {
    const prompt = `Analizar las actividades del usuario: ${actividades}. Detectar posibles sobrecarga y sugerir ajustes.`;
    
    return await this.processUserRequest(usuario_id, 'agenda', prompt);
  }
}

module.exports = {
  UserService,
  EventService,
  TaskService,
  HabitService,
  GoalService,
  NoteService,
  FinanceService,
  GamificationService,
  NotificationService,
  PreferenceService,
  AIService,
};
