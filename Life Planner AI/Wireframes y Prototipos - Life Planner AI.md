# Life Planner AI - Wireframes y Prototipos

## Descripción General

Este documento describe los wireframes y prototipos de la aplicación Life Planner AI. El diseño sigue un enfoque minimalista e intuitivo, inspirado en aplicaciones como Notion, Todoist, Google Calendar y TickTick.

## Arquitectura de la Información

### Estructura Principal de Navegación

1. **Pantalla de Inicio** - Dashboard principal con vistas rápidas
2. **Agenda** - Vista de calendario y gestión de eventos
3. **Tareas** - Lista de tareas con prioridades y categorías
4. **Hábitos** - Seguimiento de hábitos y rachas
5. **Metas** - Panel de progreso de objetivos
6. **Notas** - Bloc de notas inteligente
7. **Finanzas** - Registro y seguimiento financiero
8. **IA Asistente** - Panel de asistencia IA
9. **Perfil** - Configuración y perfil de usuario

## Wireframes por Pantalla

### 1. Pantalla de Inicio (Dashboard)

**Layout:**
- **Encabezado Superior:** Logo, modo claro/oscuro, notificaciones
- **Vista Superior:** Métricas de productividad (tareas hoy, hábitos completados, racha)
- **Sección de Eventos:** Eventos del día con recordatorios
- **Sección de Tareas:** Tareas pendientes con prioridades
- **Sección de Hábitos:** Resumen de hábitos de hoy
- **Sección de Metas:** Metas con progreso visual
- **Pie:** Barra de navegación inferior

**Componentes Clave:**
- Tarjeta de métricas con animaciones
- Lista de eventos con colores de categoría
- Indicadores de prioridad (rojo/amarillo/verde)
- Gráfico circular de productividad

### 2. Pantalla de Agenda

**Layout:**
- **Barra de Navegación Superior:** Navegación mes/anterior/siguiente, vista día/semana/mes
- **Calendario:** Vista de calendario interactiva con eventos arrastrables
- **Panel Lateral Derecho:** Detalles del evento seleccionado
- **Botón Flotante:** "Crear evento"

**Componentes Clave:**
- Calendario con eventos superpuestos
- Vista de evento rápida con información completa
- Opciones de repetición
- Recordatorios
- Colores de categoría

### 3. Pantalla de Tareas

**Layout:**
- **Barra de Filtros Superior:** Todas/Pendientes/Completadas/Historico, categorías, prioridades
- **Lista de Tareas:** Tarjetas con título, descripción, prioridad, fecha de vencimiento
- **Búsqueda:** Búsqueda en tiempo real
- **Botón Flotante:** "Nueva tarea"

**Componentes Clave:**
- Vista de tarjeta vs lista (toggle)
- Indicadores de prioridad visuales
- Etiquetas de categoría
- Fecha de vencimiento con recordatorios
- Acciones rápidas (completar, archivar)

### 4. Pantalla de Hábitos

**Layout:**
- **Gráfico de Calendario:** Visualización de racha de hábitos
- **Lista de Hábitos:** Lista con estado actual
- **Estadísticas:** Porcentaje de cumplimiento, racha actual, racha máxima
- **Botón Flotante:** "Nuevo hábito"

**Componentes Clave:**
- Visualización de racha de días
- Gráfico de barras de cumplimiento
- Indicadores de racha actual/máxima
- Recordatorios de hábitos diarios

### 5. Pantalla de Metas

**Layout:**
- **Vista Superior:** Metas con progreso circular
- **Lista de Metas:** Tarjetas con fecha objetivo y progreso
- **Panel de Subtareas:** Desglose de subtareas
- **Botón Flotante:** "Nueva meta"

**Componentes Clave:**
- Círculo de progreso visual
- Vista de desglose de subtareas
- Fecha objetivo con conteo regresivo
- Indicadores de prioridad

### 6. Pantalla de Notas

**Layout:**
- **Barra de Búsqueda Superior:** Búsqueda con filtros
- **Lista de Notas:** Miniaturas con etiquetas
- **Panel de Detalles Derecho:** Vista previa de nota seleccionada
- **Botón Flotante:** "Nueva nota"

**Componentes Clave:**
- Lista de notas con etiquetas
- Búsqueda con filtros avanzados
- Vista previa con formato enriquecido
- Soporte para imágenes y enlaces

### 7. Pantalla de Finanzas

**Layout:**
- **Vista Superior:** Resumen de ingresos vs gastos
- **Gráfico:** Gráfico de gastos por categoría
- **Lista de Transacciones:** Lista con categorías
- **Botón Flotante:** "Nuevo registro"

**Componentes Clave:**
- Gráfico circular de distribución
- Gráfico de líneas de tendencias
- Filtros por categoría y fecha
- Alertas de presupuesto

### 8. Pantalla de IA Asistente

**Layout:**
- **Chat Interface Superior:** Diálogo con IA
- **Historial de Conversaciones:** Lista de conversaciones anteriores
- **Entrada de Mensaje:** Área de texto con sugerencias
- **Acciones Rápidas:** Botones predefinidos (organizar día, sugerir horarios, etc.)

**Componentes Clave:**
- Interfaz de chat con burbujas de mensaje
- Sugerencias rápidas predefinidas
- Historial de conversaciones
- Sugerencias contextuales

### 9. Pantalla de Perfil

**Layout:**
- **Encabezado Superior:** Avatar, nombre, nivel
- **Sección de Configuración:** Toggle de modo oscuro, notificaciones
- **Sección de Gamificación:** Puntos, nivel, logros
- **Sección de Cuenta:** Editar perfil, seguridad, ayuda
- **Botón de Cerrar Sesión:** Abajo

**Componentes Clave:**
- Avatar con menú de cambio
- Vista previa de logros
- Configuración de notificaciones
- Información de seguridad

## Prototipos de Interacción

### Estados de los Componentes

#### Estados de Botones
1. **Estado Normal:** Opaco, sin sombra
2. **Estado Presionado:** Opacidad reducida, sombra interna
3. **Estado Hover:** Sombra suave, color de fondo
4. **Estado Deshabilitado:** Opacidad reducida, cursor no permitido

#### Estados de Tarjetas
1. **Normal:** Fondo blanco, sombra suave
2. **Hover:** Fondo gris claro, sombra más pronunciada
3. **Seleccionado:** Borde azul, sombra más pronunciada
4. **Presionado:** Fondo azul claro

#### Estados de Transición
- **Entrada:** Deslizamiento hacia arriba con opacidad 0 a 1
- **Salida:** Deslizamiento hacia abajo con opacidad 1 a 0
- **Cambio de Vista:** Desvanecimiento con rotación suave

### Animaciones

#### Animación de Tareas
```javascript
// Animación de entrada de tarea
const taskCard = document.querySelector('.task-card');
taskCard.style.opacity = '0';
taskCard.style.transform = 'translateY(20px)';

requestAnimationFrame(() => {
  taskCard.style.transition = 'all 0.3s ease';
  taskCard.style.opacity = '1';
  taskCard.style.transform = 'translateY(0)';
});
```

#### Animación de Completado
```javascript
// Animación de tarea completada
const task = document.querySelector('.task');
task.classList.add('completed');

// Animación de desvanecimiento
task.style.transition = 'all 0.5s ease';
task.style.opacity = '0';
task.style.transform = 'scale(0.8)';

// Eliminar después de la animación
requestAnimationFrame(() => {
  setTimeout(() => task.remove(), 500);
});
```

#### Animación de Calendario
```javascript
// Animación de cambio de vista de calendario
const calendarView = document.querySelector('.calendar-view');
calendarView.style.transition = 'transform 0.3s ease';
calendarView.style.transform = 'translateX(-100%)';

requestAnimationFrame(() => {
  // Cambiar vista
  calendarView.style.transform = 'translateX(0)';
});
```

## Prototipos de Diseño de Interfaz

### Esquema de Colores

#### Modo Claro
- **Primario:** #3B82F6 (Azul)
- **Secundario:** #10B981 (Verde)
- **Terciario:** #8B5CF6 (Púrpura)
- **Éxito:** #10B981 (Verde)
- **Advertencia:** #F59E0B (Amarillo/Naranja)
- **Error:** #EF4444 (Rojo)
- **Fondo:** #FFFFFF (Blanco)
- **Texto Principal:** #1F2937 (Gris Oscuro)
- **Texto Secundario:** #6B7280 (Gris)
- **Borde:** #E5E7EB (Gris Claro)

#### Modo Oscuro
- **Primario:** #60A5FA (Azul Claro)
- **Secundario:** #34D399 (Verde Claro)
- **Terciario:** #A78BFA (Púrpura Claro)
- **Éxito:** #34D399 (Verde Claro)
- **Advertencia:** #FBBF24 (Amarillo)
- **Error:** #F87171 (Rojo Claro)
- **Fondo:** #111827 (Negro)
- **Texto Principal:** #F9FAFB (Blanco)
- **Texto Secundario:** #D1D5DB (Gris Claro)
- **Borde:** #374151 (Gris Oscuro)

### Tipografía

#### Títulos
- **Familia:** Inter, Roboto, o SF Pro Display
- **Peso:** 600-700
- **Tamaño:** 24px (escritorio), 20px (móvil)

#### Texto del Cuerpo
- **Familia:** Inter, Roboto, o SF Pro Text
- **Peso:** 400-500
- **Tamaño:** 16px (escritorio), 14px (móvil)

#### Texto Pequeño
- **Familia:** Inter, Roboto, o SF Pro Text
- **Peso:** 400
- **Tamaño:** 12px (escritorio), 11px (móvil)

### Sistema de Diseño

#### Espaciado
- **Espaciado Mínimo:** 4px
- **Espaciado Pequeño:** 8px
- **Espaciado Mediano:** 16px
- **Espaciado Grande:** 24px
- **Espaciado Extra Grande:** 32px

#### Radio de Borde
- **Borde Redondeado Pequeño:** 4px
- **Borde Redondeado Mediano:** 8px
- **Borde Redondeado Grande:** 12px
- **Borde Completo:** 50%

## Prototipos de Flujo de Usuario

### Flujo 1: Crear una Nueva Tarea
1. **Inicio:** Usuario está en la pantalla de Tareas
2. **Acción:** Presiona el botón flotante "Nueva tarea"
3. **Resultado:** Modal de creación de tarea aparece
4. **Acción:** Ingresa título, descripción, prioridad, fecha de vencimiento
5. **Acción:** Presiona "Crear"
6. **Resultado:** Tarea aparece en la lista con animación de entrada

### Flujo 2: Completar un Hábito
1. **Inicio:** Usuario está en la pantalla de Hábitos
2. **Acción:** Presiona el botón de hábito para hoy
3. **Resultado:** Hábito se marca como completado
4. **Resultado:** Racha aumenta con animación de celebración
5. **Resultado:** Puntos de experiencia se actualizan

### Flujo 3: Organizar el Día con IA
1. **Inicio:** Usuario está en el dashboard
2. **Acción:** Presiona el botón "Organizar con IA"
3. **Resultado:** Modal de IA aparece con sugerencias predefinidas
4. **Acción:** Selecciona "Organizar mi día para estudiar 2 horas de inglés, trabajar 4 horas y hacer ejercicio"
5. **Resultado:** IA genera horario automáticamente
6. **Resultado:** Horario aparece en la vista de agenda

### Flujo 4: Ver Detalles de un Evento
1. **Inicio:** Usuario está en la pantalla de Agenda
2. **Acción:** Toca un evento en el calendario
3. **Resultado:** Panel lateral derecho muestra detalles del evento
4. **Acción:** Presiona el botón "Editar"
5. **Resultado:** Modal de edición aparece con información actual
6. **Acción:** Realiza cambios y presiona "Guardar"
7. **Resultado:** Evento se actualiza con animación

### Flujo 5: Agregar un Nuevo Hábito
1. **Inicio:** Usuario está en la pantalla de Hábitos
2. **Acción:** Presiona el botón flotante "Nuevo hábito"
3. **Resultado:** Modal de creación de hábito aparece
4. **Acción:** Ingresa título, icono, objetivo diario, color
5. **Acción:** Presiona "Crear"
6. **Resultado:** Hábito aparece en la lista con animación de entrada

## Prototipos de Diseño Responsivo

### Diseño de Escritorio (Desktop)
- **Ancho Mínimo:** 1024px
- **Ancho Máximo:** 1440px
- **Layout:** Panel izquierdo fijo, panel derecho principal
- **Navegación:** Barra de navegación superior + barra lateral izquierda

### Diseño Móvil (Móvil)
- **Ancho:** 320px - 480px
- **Layout:** Diseño de una columna
- **Navegación:** Barra de navegación inferior
- **Interacción:** Gestos táctiles

### Diseño Tableta (Tablet)
- **Ancho:** 768px - 1024px
- **Layout:** Diseño de dos columnas
- **Navegación:** Barra de navegación superior + barra lateral izquierda
- **Interacción:** Ratón y táctil

## Prototipos de Accesibilidad

### Contraste de Colores
- Asegurar que el contraste de texto sea de al menos 4.5:1
- Usar indicadores de estado con colores y texto
- Asegurar que los iconos sean distinguibles por color

### Navegación por Teclado
- Todos los elementos interactivos deben ser accesibles con teclado
- Mostrar indicador de enfoque con contorno visible
- Soportar navegación con tecla Tab y Enter/Space

### Tamaño de Texto
- Permitir ajuste de tamaño de texto del sistema
- Asegurar que el texto no se corte
- Usar unidades relativas (rem) para tamaños de fuente

## Prototipos de Pruebas de Usabilidad

### Pruebas de Navegación
- [ ] Usuario puede navegar entre todas las pantallas principales
- [ ] La barra de navegación inferior funciona correctamente
- [ ] Los botones de acción flotantes son visibles y accesibles
- [ ] Los indicadores de estado son claros

### Pruebas de Interacción
- [ ] Los gestos táctiles funcionan correctamente
- [ ] Las animaciones no causan mareos
- [ ] Las transiciones entre vistas son suaves
- [ ] Las entradas de formulario validan correctamente

### Pruebas de Contenido
- [ ] Los iconos son intuitivos
- [ ] Las etiquetas son claras y concisas
- [ ] La jerarquía visual es correcta
- [ ] El sistema de diseño es consistente

## Conclusión

Estos wireframes y prototipos proporcionan una base sólida para el diseño de Life Planner AI. El diseño prioriza la simplicidad, la accesibilidad y la consistencia, asegurando una experiencia de usuario fluida en todas las plataformas.

El sistema de diseño incluye componentes reutilizables, animaciones suaves y un esquema de colores coherente que funciona tanto en modo claro como oscuro. Los flujos de usuario están optimizados para tareas comunes, reduciendo la fricción y mejorando la adopción.

El diseño está preparado para escalar con nuevas funcionalidades y mantener una experiencia de usuario de alta calidad a medida que la aplicación crece.
