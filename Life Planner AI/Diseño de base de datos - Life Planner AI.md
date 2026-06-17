# Life Planner AI - Diseño de Base de Datos

## Descripción General

Este documento describe el esquema de base de datos relacional utilizando PostgreSQL para la aplicación Life Planner AI. El diseño está optimizado para manejar todas las funcionalidades principales: agenda inteligente, gestión de tareas, hábitos, metas, notas inteligentes, finanzas personales, gamificación y asistencia IA.

## Arquitectura de Tablas

### 1. Tabla de Usuarios (`users`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único del usuario | NOT NULL, AUTO_INCREMENT |
| `email` | `VARCHAR(255)` | Dirección de correo electrónico | NOT NULL, UNIQUE |
| `password_hash` | `VARCHAR(255)` | Hash de la contraseña | NOT NULL |
| `nombre` | `VARCHAR(100)` | Nombre completo | NOT NULL |
| `foto_perfil` | `TEXT` | URL de la foto de perfil | NULLABLE |
| `fecha_nacimiento` | `DATE` | Fecha de nacimiento | NULLABLE |
| `genero` | `VARCHAR(20)` | Género | NULLABLE |
| `zona_horaria` | `VARCHAR(50)` | Zona horaria del usuario | NOT NULL, DEFAULT 'UTC' |
| `idioma` | `VARCHAR(10)` | Idioma preferido | NOT NULL, DEFAULT 'es' |
| `modo_oscuro` | `BOOLEAN` | Preferencia de modo oscuro | NOT NULL, DEFAULT FALSE |
| `biometria_habilitada` | `BOOLEAN` | Si la biometría está habilitada | NOT NULL, DEFAULT FALSE |
| `pin_seguridad` | `VARCHAR(4)` | PIN de seguridad (opcional) | NULLABLE |
| `fecha_creacion` | `TIMESTAMP` | Fecha de creación de la cuenta | NOT NULL, DEFAULT NOW() |
| `ultimo_inicio_sesion` | `TIMESTAMP` | Fecha del último inicio de sesión | NULLABLE |
| `activo` | `BOOLEAN` | Si la cuenta está activa | NOT NULL, DEFAULT TRUE |
| `email_verificado` | `BOOLEAN` | Si el correo electrónico está verificado | NOT NULL, DEFAULT FALSE |

### 2. Tabla de Eventos (`events`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único del evento | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario propietario | NOT NULL, FOREIGN KEY |
| `titulo` | `VARCHAR(200)` | Título del evento | NOT NULL |
| `descripcion` | `TEXT` | Descripción detallada | NULLABLE |
| `fecha_inicio` | `TIMESTAMP` | Fecha y hora de inicio | NOT NULL |
| `fecha_fin` | `TIMESTAMP` | Fecha y hora de fin | NOT NULL |
| `todo_el_dia` | `BOOLEAN` | Si es todo el día | NOT NULL, DEFAULT FALSE |
| `repetir` | `VARCHAR(50)` | Patrón de repetición | NULLABLE |
| `repetir_hasta` | `TIMESTAMP` | Fecha límite de repetición | NULLABLE |
| `ubicacion` | `VARCHAR(200)` | Ubicación | NULLABLE |
| `recordatorio` | `BOOLEAN` | Si tiene recordatorio | NOT NULL, DEFAULT FALSE |
| `minutos_recordatorio` | `INTEGER` | Minutos antes del recordatorio | NULLABLE |
| `color` | `VARCHAR(20)` | Color del evento | NOT NULL, DEFAULT '#3B82F6' |
| `tipo` | `VARCHAR(50)` | Tipo de evento (tarea, cita, etc.) | NOT NULL, DEFAULT 'evento' |
| `importancia` | `VARCHAR(20)` | Nivel de importancia | NOT NULL, DEFAULT 'media' |
| `creado_por_ia` | `BOOLEAN` | Si fue creado por IA | NOT NULL, DEFAULT FALSE |
| `fecha_creacion` | `TIMESTAMP` | Fecha de creación | NOT NULL, DEFAULT NOW() |

### 3. Tabla de Tareas (`tasks`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único de la tarea | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario propietario | NOT NULL, FOREIGN KEY |
| `titulo` | `VARCHAR(200)` | Título de la tarea | NOT NULL |
| `descripcion` | `TEXT` | Descripción detallada | NULLABLE |
| `fecha_vencimiento` | `TIMESTAMP` | Fecha y hora de vencimiento | NULLABLE |
| `completada` | `BOOLEAN` | Si está completada | NOT NULL, DEFAULT FALSE |
| `fecha_completada` | `TIMESTAMP` | Fecha y hora de completada | NULLABLE |
| `prioridad` | `VARCHAR(20)` | Nivel de prioridad | NOT NULL, DEFAULT 'media' |
| `categoria` | `VARCHAR(50)` | Categoría | NULLABLE |
| `etiquetas` | `TEXT[]` | Array de etiquetas | NULLABLE |
| `asignada_a` | `INTEGER` | ID de usuario asignado (para colaboración) | NULLABLE, FOREIGN KEY |
| `archivado` | `BOOLEAN` | Si está archivado | NOT NULL, DEFAULT FALSE |
| `creado_por_ia` | `BOOLEAN` | Si fue creado por IA | NOT NULL, DEFAULT FALSE |
| `fecha_creacion` | `TIMESTAMP` | Fecha de creación | NOT NULL, DEFAULT NOW() |

### 4. Tabla de Hábitos (`habits`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único del hábito | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario propietario | NOT NULL, FOREIGN KEY |
| `titulo` | `VARCHAR(100)` | Título del hábito | NOT NULL |
| `descripcion` | `TEXT` | Descripción detallada | NULLABLE |
| `icono` | `VARCHAR(50)` | Icono del hábito | NOT NULL, DEFAULT 'activity' |
| `color` | `VARCHAR(20)` | Color del hábito | NOT NULL, DEFAULT '#10B981' |
| `objetivo_diario` | `INTEGER` | Objetivo diario (meta de racha) | NOT NULL, DEFAULT 1 |
| `objetivo_semanal` | `INTEGER` | Objetivo semanal | NULLABLE |
| `objetivo_mensual` | `INTEGER` | Objetivo mensual | NULLABLE |
| `activo` | `BOOLEAN` | Si está activo | NOT NULL, DEFAULT TRUE |
| `fecha_inicio` | `DATE` | Fecha de inicio | NOT NULL, DEFAULT CURRENT_DATE |
| `fecha_fin` | `DATE` | Fecha de fin (opcional) | NULLABLE |
| `dias_excluidos` | `TEXT[]` | Array de días excluidos (formato YYYY-MM-DD) | NULLABLE |

### 5. Tabla de Registro de Hábitos (`habit_logs`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único del registro | NOT NULL, AUTO_INCREMENT |
| `habito_id` | `INTEGER` | ID del hábito | NOT NULL, FOREIGN KEY |
| `usuario_id` | `INTEGER` | ID del usuario | NOT NULL, FOREIGN KEY |
| `fecha` | `DATE` | Fecha del registro | NOT NULL |
| `completado` | `BOOLEAN` | Si se completó | NOT NULL, DEFAULT FALSE |
| `notas` | `TEXT` | Notas adicionales | NULLABLE |

### 6. Tabla de Metas (`goals`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único de la meta | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario propietario | NOT NULL, FOREIGN KEY |
| `titulo` | `VARCHAR(200)` | Título de la meta | NOT NULL |
| `descripcion` | `TEXT` | Descripción detallada | NULLABLE |
| `fecha_objetivo` | `DATE` | Fecha objetivo | NOT NULL |
| `fecha_inicio` | `DATE` | Fecha de inicio | NOT NULL, DEFAULT CURRENT_DATE |
| `progreso` | `INTEGER` | Progreso actual (porcentaje 0-100) | NOT NULL, DEFAULT 0 |
| `subtareas` | `JSONB` | Array de subtareas con estado | NULLABLE |
| `icono` | `VARCHAR(50)` | Icono de la meta | NOT NULL, DEFAULT 'target' |
| `color` | `VARCHAR(20)` | Color de la meta | NOT NULL, DEFAULT '#8B5CF6' |
| `completada` | `BOOLEAN` | Si está completada | NOT NULL, DEFAULT FALSE |
| `fecha_completada` | `TIMESTAMP` | Fecha de completada | NULLABLE |
| `creado_por_ia` | `BOOLEAN` | Si fue creado por IA | NOT NULL, DEFAULT FALSE |

### 7. Tabla de Notas (`notes`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único de la nota | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario propietario | NOT NULL, FOREIGN KEY |
| `titulo` | `VARCHAR(200)` | Título de la nota | NOT NULL |
| `contenido` | `TEXT` | Contenido de la nota | NULLABLE |
| `etiquetas` | `TEXT[]` | Array de etiquetas | NULLABLE |
| `archivado` | `BOOLEAN` | Si está archivado | NOT NULL, DEFAULT FALSE |
| `creado_por_ia` | `BOOLEAN` | Si fue creado por IA | NOT NULL, DEFAULT FALSE |
| `fecha_creacion` | `TIMESTAMP` | Fecha de creación | NOT NULL, DEFAULT NOW() |
| `fecha_actualizacion` | `TIMESTAMP` | Fecha de última actualización | NOT NULL, DEFAULT NOW() |

### 8. Tabla de Finanzas (`finances`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único del registro financiero | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario propietario | NOT NULL, FOREIGN KEY |
| `tipo` | `VARCHAR(20)` | Tipo (ingreso/gasto) | NOT NULL |
| `categoria` | `VARCHAR(50)` | Categoría | NOT NULL |
| `monto` | `DECIMAL(12,2)` | Monto | NOT NULL |
| `fecha` | `DATE` | Fecha | NOT NULL |
| `descripcion` | `TEXT` | Descripción | NULLABLE |
| `metodo_pago` | `VARCHAR(50)` | Método de pago | NULLABLE |
| `recurrente` | `BOOLEAN` | Si es recurrente | NOT NULL, DEFAULT FALSE |
| `periodo_recurrencia` | `VARCHAR(20)` | Período de recurrencia | NULLABLE |

### 9. Tabla de Gamificación (`gamification`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario | NOT NULL, FOREIGN KEY |
| `puntos_experiencia` | `INTEGER` | Puntos de experiencia totales | NOT NULL, DEFAULT 0 |
| `nivel` | `INTEGER` | Nivel actual | NOT NULL, DEFAULT 1 |
| `puntos_nivel_actual` | `INTEGER` | Puntos necesarios para el nivel actual | NOT NULL, DEFAULT 0 |
| `racha_dias` | `INTEGER` | Racha actual de días | NOT NULL, DEFAULT 0 |
| `ultimo_login` | `TIMESTAMP` | Fecha del último inicio de sesión | NULLABLE |
| `fecha_creacion` | `TIMESTAMP` | Fecha de creación | NOT NULL, DEFAULT NOW() |

### 10. Tabla de Logros (`achievements`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario | NOT NULL, FOREIGN KEY |
| `nombre` | `VARCHAR(100)` | Nombre del logro | NOT NULL |
| `descripcion` | `TEXT` | Descripción | NOT NULL |
| `icono` | `VARCHAR(50)` | Icono | NOT NULL |
| `color` | `VARCHAR(20)` | Color | NOT NULL |
| `fecha_obtenido` | `TIMESTAMP` | Fecha de obtención | NOT NULL, DEFAULT NOW() |

### 11. Tabla de Interacciones IA (`ai_interactions`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario | NOT NULL, FOREIGN KEY |
| `tipo` | `VARCHAR(50)` | Tipo de interacción (agenda, tareas, hábitos, etc.) | NOT NULL |
| `prompt` | `TEXT` | Prompt enviado a IA | NOT NULL |
| `respuesta` | `TEXT` | Respuesta de IA | NOT NULL |
| `fecha_creacion` | `TIMESTAMP` | Fecha de creación | NOT NULL, DEFAULT NOW() |

### 12. Tabla de Notificaciones (`notifications`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario | NOT NULL, FOREIGN KEY |
| `titulo` | `VARCHAR(200)` | Título | NOT NULL |
| `contenido` | `TEXT` | Contenido | NOT NULL |
| `tipo` | `VARCHAR(50)` | Tipo (recordatorio, sistema, logro, etc.) | NOT NULL |
| `leido` | `BOOLEAN` | Si está leído | NOT NULL, DEFAULT FALSE |
| `fecha_creacion` | `TIMESTAMP` | Fecha de creación | NOT NULL, DEFAULT NOW() |
| `fecha_envio` | `TIMESTAMP` | Fecha de envío | NULLABLE |
| `datos_adicionales` | `JSONB` | Datos adicionales (enlace, ID de entidad, etc.) | NULLABLE |

### 13. Tabla de Preferencias (`preferences`)

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | `SERIAL PRIMARY KEY` | ID único | NOT NULL, AUTO_INCREMENT |
| `usuario_id` | `INTEGER` | ID del usuario | NOT NULL, FOREIGN KEY |
| `notificaciones_push` | `BOOLEAN` | Si las notificaciones push están habilitadas | NOT NULL, DEFAULT TRUE |
| `sonido_recordatorios` | `BOOLEAN` | Si el sonido de recordatorios está habilitado | NOT NULL, DEFAULT TRUE |
| `vibracion_recordatorios` | `BOOLEAN` | Si la vibración de recordatorios está habilitada | NOT NULL, DEFAULT TRUE |
| `resumen_diario` | `BOOLEAN` | Si el resumen diario está habilitado | NOT NULL, DEFAULT TRUE |
| `resumen_semanal` | `BOOLEAN` | Si el resumen semanal está habilitado | NOT NULL, DEFAULT TRUE |
| `backup_automatico` | `BOOLEAN` | Si el backup automático está habilitado | NOT NULL, DEFAULT TRUE |

## Índices Recomendados

1. `CREATE INDEX idx_users_email ON users(email);`
2. `CREATE INDEX idx_events_usuario_fecha_inicio ON events(usuario_id, fecha_inicio);`
3. `CREATE INDEX idx_events_repetir ON events(repetir);`
4. `CREATE INDEX idx_tasks_usuario_fecha_vencimiento ON tasks(usuario_id, fecha_vencimiento);`
5. `CREATE INDEX idx_tasks_completada ON tasks(completada);`
6. `CREATE INDEX idx_habit_logs_usuario_fecha ON habit_logs(usuario_id, fecha);`
7. `CREATE INDEX idx_goals_usuario_progreso ON goals(usuario_id, progreso);`
8. `CREATE INDEX idx_notes_usuario_fecha_creacion ON notes(usuario_id, fecha_creacion);`
9. `CREATE INDEX idx_finances_usuario_fecha ON finances(usuario_id, fecha);`
10. `CREATE INDEX idx_notifications_usuario_leido ON notifications(usuario_id, leido);`

## Restricciones de Claves Foráneas

- `events.usuario_id` → `users.id` (ON DELETE CASCADE)
- `tasks.usuario_id` → `users.id` (ON DELETE CASCADE)
- `tasks.asignada_a` → `users.id` (ON DELETE SET NULL)
- `habits.usuario_id` → `users.id` (ON DELETE CASCADE)
- `habit_logs.habito_id` → `habits.id` (ON DELETE CASCADE)
- `habit_logs.usuario_id` → `users.id` (ON DELETE CASCADE)
- `goals.usuario_id` → `users.id` (ON DELETE CASCADE)
- `notes.usuario_id` → `users.id` (ON DELETE CASCADE)
- `finances.usuario_id` → `users.id` (ON DELETE CASCADE)
- `gamification.usuario_id` → `users.id` (ON DELETE CASCADE)
- `achievements.usuario_id` → `users.id` (ON DELETE CASCADE)
- `ai_interactions.usuario_id` → `users.id` (ON DELETE CASCADE)
- `notifications.usuario_id` → `users.id` (ON DELETE CASCADE)
- `preferences.usuario_id` → `users.id` (ON DELETE CASCADE)

## Vistas Útiles

### Vista de Resumen Diario (`daily_summary`)

```sql
CREATE VIEW daily_summary AS
SELECT 
    u.id AS usuario_id,
    u.nombre,
    (SELECT COUNT(*) FROM tasks t WHERE t.usuario_id = u.id AND t.completada = FALSE) AS tareas_pendientes,
    (SELECT COUNT(*) FROM events e WHERE e.usuario_id = u.id AND e.fecha_inicio::DATE = CURRENT_DATE) AS eventos_hoy,
    (SELECT COUNT(*) FROM habit_logs hl 
     JOIN habits h ON hl.habito_id = h.id 
     WHERE hl.usuario_id = u.id AND hl.fecha = CURRENT_DATE AND hl.completado = TRUE) AS hábitos_completados_hoy,
    (SELECT COUNT(*) FROM goals g WHERE g.usuario_id = u.id AND g.progreso < 100) AS metas_pendientes,
    (SELECT g.puntos_experiencia FROM gamification g WHERE g.usuario_id = u.id) AS puntos_experiencia,
    (SELECT g.nivel FROM gamification g WHERE g.usuario_id = u.id) AS nivel
FROM users u
WHERE u.activo = TRUE;
```

### Vista de Estadísticas de Hábitos (`habits_stats`)

```sql
CREATE VIEW habits_stats AS
SELECT 
    h.id,
    h.titulo,
    h.icono,
    h.color,
    COUNT(hl.id) AS total_registros,
    COUNT(CASE WHEN hl.completado = TRUE THEN 1 END) AS registros_completados,
    COUNT(CASE WHEN hl.fecha = CURRENT_DATE THEN 1 END) AS racha_actual,
    ROUND(COUNT(CASE WHEN hl.completado = TRUE THEN 1 END) * 100.0 / NULLIF(COUNT(hl.id), 0), 2) AS porcentaje_cumplimiento
FROM habits h
LEFT JOIN habit_logs hl ON h.id = hl.habito_id
GROUP BY h.id, h.titulo, h.icono, h.color;
```

## Configuración de la Base de Datos

### Parámetros de Rendimiento

```sql
-- Aumentar el trabajo de fondo
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET max_worker_processes = 8;
ALTER SYSTEM SET max_parallel_workers_per_gather = 8;
ALTER SYSTEM SET effective_cache_size = '4GB';
ALTER SYSTEM SET maintenance_work_mem = '512MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '64MB';
ALTER SYSTEM SET default_statistics_target = 1000;

SELECT pg_reload_conf();
```

### Migraciones

Todas las migraciones deben ser versionadas y almacenadas en `backend/src/migrations/` con nombres como `20250101000000_create_users_table.sql`.

### Backup y Recuperación

- Usar `pg_dump` para backups completos
- Usar `pg_repack` para reempaquetar tablas grandes
- Implementar snapshots diarios
- Usar WAL (Write-Ahead Log) para recuperación punto-a-punto

## Documentación de Tipos

### Enums Definidos

```sql
-- Enums para consistencia de datos
CREATE TYPE prioridad_tarea AS ENUM ('baja', 'media', 'alta', 'urgente');
CREATE TYPE importancia_evento AS ENUM ('baja', 'media', 'alta', 'critica');
CREATE TYPE tipo_categoria AS ENUM ('trabajo', 'personal', 'salud', 'finanzas', 'aprendizaje', 'otros');
CREATE TYPE tipo_meta AS ENUM ('salud', 'carrera', 'finanzas', 'aprendizaje', 'relaciones', 'otros');
CREATE TYPE tipo_nota AS ENUM ('idea', 'tarea', 'recordatorio', 'plan', 'referencia');
CREATE TYPE tipo_finanza AS ENUM ('ingreso', 'gasto');
CREATE TYPE tipo_notificacion AS ENUM ('recordatorio', 'logro', 'sistema', 'ai', 'colaboracion');
```

## Conclusión

Este diseño de base de datos proporciona una estructura sólida y escalable para Life Planner AI, permitiendo manejar todas las funcionalidades principales con un rendimiento óptimo. El uso de tipos de datos apropiados, índices y vistas asegura consultas eficientes y una experiencia de usuario fluida.

El esquema está normalizado para evitar redundancia de datos, utiliza restricciones de claves foráneas para mantener la integridad referencial y está diseñado para escalar con el crecimiento de la base de usuarios.
