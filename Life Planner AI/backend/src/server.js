require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const winston = require('winston');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
      connectSrc: ["'self'", "https://api.openai.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      childSrc: ["'none'"],
      workerSrc: ["'self'", "blob:"]
    }
  }
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 solicitudes por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.'
});

app.use('/api/', limiter);

// Rutas de la API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Importar rutas
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const eventRoutes = require('./src/routes/event.routes');
const taskRoutes = require('./src/routes/task.routes');
const habitRoutes = require('./src/routes/habit.routes');
const goalRoutes = require('./src/routes/goal.routes');
const noteRoutes = require('./src/routes/note.routes');
const financeRoutes = require('./src/routes/finance.routes');
const aiRoutes = require('./src/routes/ai.routes');
const gamificationRoutes = require('./src/routes/gamification.routes');
const notificationRoutes = require('./src/routes/notification.routes');

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/finances', financeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/notifications', notificationRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  logger.error('Error no capturado:', err);
  
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Lo sentimos, algo salió mal.'
    });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});

// Manejador de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Inicializar servidor
const server = app.listen(PORT, () => {
  logger.info(`Servidor iniciado en puerto ${PORT}`);
  logger.info(`Entorno: ${process.env.NODE_ENV || 'desarrollo'}`);
});

// Manejo de cierres graceful
process.on('SIGTERM', () => {
  logger.info('SIGTERM recibido, cerrando servidor gracefully');
  server.close(() => {
    logger.info('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT recibido, cerrando servidor gracefully');
  server.close(() => {
    logger.info('Servidor cerrado');
    process.exit(0);
  });
});

module.exports = app;
