# Life Planner AI - Diseño UX/UI Profesional

## Descripción General

Este documento describe el diseño UX/UI profesional para Life Planner AI. El diseño se centra en la simplicidad, la accesibilidad y la consistencia, creando una experiencia de usuario intuitiva que funciona tanto en modo claro como oscuro.

## Principios de Diseño

### 1. Minimalismo
- Eliminar elementos visuales innecesarios
- Usar espacio en blanco para mejorar la legibilidad
- Enfocarse en la funcionalidad sobre la decoración

### 2. Consistencia
- Usar componentes y patrones de diseño consistentes
- Mantener espaciado, tipografía y colores uniformes
- Asegurar que la interacción sea predecible

### 3. Jerarquía Visual
- Usar tamaño, peso y color para crear jerarquía
- Dirigir la atención hacia las acciones primarias
- Organizar la información de forma lógica

### 4. Accesibilidad
- Garantizar un contraste de color adecuado
- Soportar navegación por teclado
- Usar etiquetas descriptivas
- Respetar las preferencias de movimiento reducido

### 5. Adaptabilidad
- Diseñar para diferentes tamaños de pantalla
- Soportar diferentes temas (claro/oscuro)
- Adaptarse a diferentes densidades de pantalla

## Sistema de Diseño

### 1. Colores

#### Colores Primarios
- **Azul Principal:** #3B82F6 (24, 130, 246)
- **Azul Oscuro:** #2563EB (37, 99, 235)
- **Azul Claro:** #60A5FA (96, 165, 250)

#### Colores Secundarios
- **Verde Principal:** #10B981 (16, 185, 129)
- **Verde Oscuro:** #059669 (5, 150, 105)
- **Verde Claro:** #34D399 (52, 211, 153)

#### Colores Terciarios
- **Púrpura Principal:** #8B5CF6 (139, 92, 246)
- **Púrpura Oscuro:** #7C3AED (124, 58, 237)
- **Púrpura Claro:** #A78BFA (167, 139, 250)

#### Colores de Estado
- **Éxito:** #10B981 (Verde)
- **Advertencia:** #F59E0B (Amarillo/Naranja)
- **Error:** #EF4444 (Rojo)
- **Info:** #3B82F6 (Azul)

#### Colores Neutros (Modo Claro)
- **Fondo:** #FFFFFF (Blanco)
- **Fondo Secundario:** #F9FAFB (Gris Claro)
- **Texto Principal:** #1F2937 (Gris Oscuro)
- **Texto Secundario:** #6B7280 (Gris)
- **Texto Terciario:** #9CA3AF (Gris Claro)
- **Borde:** #E5E7EB (Gris Muy Claro)
- **Fondo Hover:** #F3F4F6 (Gris Claro)
- **Fondo Activo:** #E5E7EB (Gris Claro)

#### Colores Neutros (Modo Oscuro)
- **Fondo:** #111827 (Negro)
- **Fondo Secundario:** #1F2937 (Gris Oscuro)
- **Texto Principal:** #F9FAFB (Blanco)
- **Texto Secundario:** #D1D5DB (Gris Claro)
- **Texto Terciario:** #9CA3AF (Gris Medio)
- **Borde:** #374151 (Gris Oscuro)
- **Fondo Hover:** #374151 (Gris Oscuro)
- **Fondo Activo:** #4B5563 (Gris Medio)

### 2. Tipografía

#### Familia de Fuentes
- **Fuente Principal:** Inter, Roboto, SF Pro Display
- **Fuente Secundaria:** -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

#### Escala de Tipografía

| Tamaño | Peso | Tamaño (px) | Uso |
|--------|------|-------------|-----|
| H1 | 600 | 32 | Títulos principales |
| H2 | 600 | 28 | Subtítulos |
| H3 | 600 | 24 | Subsecciones |
| H4 | 500 | 20 | Tarjetas |
| Cuerpo | 400 | 16 | Texto principal |
| Cuerpo Pequeño | 400 | 14 | Texto secundario |
| Pequeño | 400 | 12 | Texto terciario |
| Etiqueta | 500 | 12 | Etiquetas |

#### Espaciado de Líneas
- **Línea Simple:** 1.5
- **Línea Doble:** 2
- **Compacto:** 1.2

### 3. Espaciado

#### Sistema de Espaciado (Basado en 4px)

| Clase | Espaciado |
|--------|----------|
| 0 | 0px |
| 1 | 4px |
| 2 | 8px |
| 3 | 16px |
| 4 | 24px |
| 5 | 32px |
| 6 | 48px |
| 7 | 64px |
| 8 | 96px |

#### Ejemplo de Uso
```css
/* Ejemplo de espaciado */
.mt-2 { margin-top: 8px; }
.p-3 { padding: 16px; }
.mb-4 { margin-bottom: 24px; }
```

### 4. Radio de Borde

| Tamaño | Radio |
|--------|------|
| 0 | 0px |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 20px |
| 5 | 50% (para avatares) |

### 5. Sombras

| Nivel | Sombra |
|--------|------|
| 0 | none |
| 1 | 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) |
| 2 | 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23) |
| 3 | 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23) |
| 4 | 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22) |

## Componentes de UI

### 1. Tarjetas

#### Estructura de Tarjeta
```css
.card {
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
}

.card:active {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}
```

#### Variantes de Tarjeta
- **Tarjeta Estática:** Sin interacción
- **Tarjeta Hoverable:** Efecto hover
- **Tarjeta Clickable:** Indicador de clic
- **Tarjeta Elevada:** Mayor sombra en hover

### 2. Botones

#### Estructura de Botón
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.btn:focus {
  ring: 2px;
  ring-color: var(--primary);
}
```

#### Variantes de Botón
- **Primario:** Fondo azul, texto blanco
- **Secundario:** Fondo gris, texto gris oscuro
- **Éxito:** Fondo verde, texto blanco
- **Advertencia:** Fondo amarillo/naranja, texto blanco
- **Error:** Fondo rojo, texto blanco
- **Outline:** Fondo transparente, borde azul, texto azul

#### Tamaños de Botón
- **Pequeño:** 32px de altura, 12px de padding
- **Mediano:** 40px de altura, 16px de padding
- **Grande:** 48px de altura, 24px de padding

### 3. Entradas de Formulario

#### Estructura de Entrada
```css
.input {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border);
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}
```

#### Tipos de Entrada
- **Texto:** Campo de texto estándar
- **Contraseña:** Campo de contraseña con toggle de visibilidad
- **Email:** Campo de email con validación
- **Número:** Campo de número con controles
- **Fecha:** Selector de fecha
- **Texto Área:** Área de texto multilínea

### 4. Navegación

#### Barra de Navegación Inferior
```css
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-top: 1px solid var(--border);
  padding: 8px 16px;
  display: flex;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item.active {
  color: var(--primary);
}

.nav-item:hover {
  background: var(--bg-hover);
}
```

### 5. Listas

#### Estructura de Lista
```css
.list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.list-item:hover {
  background: var(--bg-hover);
}

.list-item.selected {
  background: var(--bg-active);
  color: var(--primary);
}
```

### 6. Gráficos

#### Tarjeta de Gráfico
```css
.chart-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}
```

### 7. Indicadores de Estado

#### Indicador de Prioridad
```css
.priority-indicator {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.priority-high {
  background: rgba(239, 68, 68, 0.1);
  color: #DC2626;
}

.priority-medium {
  background: rgba(245, 158, 11, 0.1);
  color: #D97706;
}

.priority-low {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}
```

### 8. Animaciones

#### Animación de Entrada
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.3s ease;
}
```

#### Animación de Transición
```css
.page-transition {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter {
  opacity: 0;
  transform: translateX(10px);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-10px);
}
```

## Patrones de Diseño

### 1. Diseño de Contenido

#### Patrón de Contenido Principal + Lateral
- **Contenedor Principal:** Ancho completo en móvil, 2/3 en escritorio
- **Panel Lateral:** 1/3 en escritorio, oculto en móvil (deslizable)
- **Espaciado:** 24px entre columnas

#### Patrón de Tarjetas en Cuadrícula
- **Gap:** 16px
- **Columnas:** Auto-ajustable
- **Breakpoint:** Móvil (1 columna), Tableta (2 columnas), Escritorio (3-4 columnas)

### 2. Patrón de Navegación

#### Navegación Inferior (Móvil)
- **Ítems:** 5-6 elementos principales
- **Iconos:** 24px de tamaño
- **Etiquetas:** Ocultas, solo iconos
- **Estado Activo:** Indicador de color

#### Navegación Lateral (Escritorio)
- **Ancho:** 280px
- **Ítems:** 6-8 elementos
- **Iconos:** 20px de tamaño + texto
- **Agrupación:** Secciones lógicas

### 3. Patrón de Datos

#### Patrón de Datos con Visualización
- **Gráfico Principal:** 300px de altura
- **Lista de Datos:** 200px de altura
- **Filtro:** Filtro rápido superior
- **Ordenamiento:** Ordenamiento por clic

#### Patrón de Datos con Formulario
- **Formulario:** 400px de ancho
- **Vista Previa:** 600px de ancho
- **Divisor:** Separador interactivo
- **Vista Móvil:** Apilado

## Prototipos de Diseño

### 1. Prototipo de Dashboard

#### Vista de Escritorio
```
┌─────────────────────────┐
│  Life Planner AI        │
│  ┌─────────────────────┐│
│  │ Métricas de         ││
│  │ Productividad       ││
│  │ ┌───────────────┐  ││
│  │ │ Tareas        │  ││
│  │ │ 5/10          │  ││
│  │ │ Pendientes    │  ││
│  │ └───────────────┘  ││
│  │ ┌───────────────┐  ││
│  │ │ Eventos       │  ││
│  │ │ Hoy: 3 eventos ││
│  │ └───────────────┘  ││
│  │ ┌───────────────┐  ││
│  │ │ Hábitos       │  ││
│  │ │ 4/5 completados││
│  │ └───────────────┘  ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │ Agenda            ││
│  │ ┌───────────────┐  ││
│  │ │ Lunes         │  ││
│  │ │ 8:00 - 9:00  │  ││
│  │ │ Estudiar inglés││
│  │ └───────────────┘  ││
│  │ ...               ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │ Tareas            ││
│  │ ┌───────────────┐  ││
│  │ │ [ ] Tarea 1   │  ││
│  │ │ [ ] Tarea 2   │  ││
│  │ │ [✓] Tarea 3   │  ││
│  │ └───────────────┘  ││
│  └─────────────────────┘│
└─────────────────────────┘
```

#### Vista Móvil
```
┌─────────────────┐
│ Life Planner AI │
├─────────────────┤
│ Métricas        │
│ ┌─────────────┐ │
│ │ Tareas: 5/10│ │
│ │ Eventos: 3   │ │
│ │ Hábitos: 4/5│ │
│ └─────────────┘ │
├─────────────────┤
│ Agenda         │
│ ┌─────────────┐ │
│ │ Hoy         │ │
│ │ 8:00 - 9:00│ │
│ │ Estudiar    │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │ 10:00 - 11:00│ │
│ │ Trabajo      │ │
│ └─────────────┘ │
│ ...             │
├─────────────────┤
│ Tareas         │
│ ┌─────────────┐ │
│ │ [ ] Tarea 1 │ │
│ │ [ ] Tarea 2 │ │
│ │ [✓] Tarea 3 │ │
│ └─────────────┘ │
├─────────────────┤
│ Barra de Navegación Inferior │
│ [🏠] [📅] [✅] [🏃] [📝] [💰] │
└─────────────────┘
```

### 2. Prototipo de Pantalla de Evento

#### Vista de Escritorio
```
┌─────────────────────────┐
│  Detalles del Evento     │
├─────────────────────────┤
│  ┌─────────────────────┐ │
│  │ Título: Reunión     │ │
│  │ Fecha: Hoy          │ │
│  │ Hora: 10:00 - 11:00 │ │
│  │ Ubicación: Oficina   │ │
│  │ Descripción:         │ │
│  │ Reunión con el equipo│ │
│  │ de producto para     │ │
│  │ revisar las funciones│ │
│  │ nuevo.               │ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ Recordatorios        │ │
│  │ ┌─────────────────┐ ││
│  │ │ 9:30 AM        │ ││
│  │ │ 9:45 AM        │ ││
│  │ │ 9:55 AM        │ ││
│  │ └─────────────────┘ ││
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ Repetición          │ │
│  │ Diario              │ │
│  │ Hasta: Diciembre 31│ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ Etiquetas            │ │
│  │ ┌─────────────────┐ ││
│  │ │ Trabajo         │ ││
│  │ │ Reunión        │ ││
│  │ └─────────────────┘ ││
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ Colaboradores       │ │
│  │ ┌─────────────────┐ ││
│  │ │ Juan Pérez      │ ││
│  │ │ María García    │ ││
│  │ └─────────────────┘ ││
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ Acciones             │ │
│  │ [ Editar ] [ Eliminar]│ │
│  │ [ Compartir ] [ Duplicar]│ │
│  └─────────────────────┘ │
└─────────────────────────┘
```

### 3. Prototipo de Pantalla de Tarea

#### Vista de Escritorio
```
┌─────────────────────────┐
│  Lista de Tareas         │
├─────────────────────────┤
│  ┌─────────────────────┐ │
│  │ [Filtro] Todas       │ │
│  │ [Filtro] Pendientes  │ │
│  │ [Filtro] Completadas │ │
│  │ [Filtro] Archivadas  │ │
│  └─────────────────────┘ │
├─────────────────────────┤
│  ┌─────────────────────┐ │
│  │ [ ] Tarea Importante │ │
│  │ Descripción:         │ │
│  │ Revisar el informe   │ │
│  │ financiero           │ │
│  │ Vencimiento: Hoy     │ │
│  │ Prioridad: Alta      │ │
│  │ Etiquetas: Trabajo   │ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ [✓] Tarea Completada │ │
│  │ Descripción:         │ │
│  │ Enviar correo        │ │
│  │ electrónico          │ │
│  │ Vencimiento: Ayer    │ │
│  │ Prioridad: Media     │ │
│  │ Etiquetas: Comunicación│ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ [ ] Nueva Tarea      │ │
│  │ Escribe una tarea... │ │
│  └─────────────────────┘ │
└─────────────────────────┘
```

### 4. Prototipo de Pantalla de IA

#### Vista de Escritorio
```
┌─────────────────────────┐
│  Asistente IA            │
├─────────────────────────┤
│  ┌─────────────────────┐ │
│  │ 💬 Organizar mi día │ │
│  │ para estudiar 2      │ │
│  │ horas de inglés,     │ │
│  │ trabajar 4 horas y   │ │
│  │ hacer ejercicio.     │ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ 💬 Sugerir horarios  │ │
│  │ para mi semana de     │ │
│  │ trabajo.              │ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ 💬 Detectar         │ │
│  │ sobrecarga de       │ │
│  │ actividades.         │ │
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │ 💬 Plan de          │ │
│  │ estudio para examen  │ │
│  │ de inglés.           │ │
│  └─────────────────────┘ │
├─────────────────────────┤
│  ┌─────────────────────┐ │
│  │ Historial de        │ │
│  │ Conversaciones       │ │
│  │ ┌─────────────────┐ ││
│  │ │ Hace 2 horas    │ ││
│  │ │ Organizar día   │ ││
│  │ └─────────────────┘ ││
│  │ ┌─────────────────┐ ││
│  │ │ Ayer            │ ││
│  │ │ Plan de trabajo │ ││
│  │ └─────────────────┘ ││
│  └─────────────────────┘ │
└─────────────────────────┘
```

## Conclusión

Este diseño UX/UI profesional proporciona una base sólida para Life Planner AI. El sistema de diseño incluye:

1. **Sistema de Colores Consistente:** Esquema de colores claro/oscuro con accesibilidad
2. **Tipografía Clara:** Jerarquía tipográfica con legibilidad óptima
3. **Componentes Reutilizables:** Componentes UI estandarizados con estados consistentes
4. **Animaciones Suaves:** Transiciones y animaciones sutiles que mejoran la experiencia
5. **Patrones de Diseño Probados:** Patrones de diseño que guían la organización de la información
6. **Prototipos Detallados:** Wireframes y prototipos de alta fidelidad que muestran la interacción

El diseño prioriza la simplicidad, la accesibilidad y la consistencia, creando una experiencia de usuario intuitiva que funciona en todas las plataformas y dispositivos.

El sistema de diseño está preparado para escalar con nuevas funcionalidades y mantener una experiencia de usuario de alta calidad a medida que la aplicación crece.
