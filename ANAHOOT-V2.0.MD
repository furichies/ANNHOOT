# ANAHOOT - V2.0 (Edición Síncrona Multijugador)

## 📌 1. Descripción General del Proyecto
**ANAHOOT V2.0** es la evolución del proyecto original hacia una plataforma de aprendizaje síncrona en tiempo real al estilo *Kahoot!*. 
Mientras que la versión 1.0 era un juego individual asíncrono, la V2.0 es una experiencia multijugador centralizada donde un **Profesor (Host)** controla el flujo del juego y múltiples **Alumnos (Players)** participan simultáneamente usando sus 
dispositivos (smartphones, tablets o PCs).

El backend se apoyará enteramente en **Supabase** (Postgres + Realtime WebSockets) para gestionar la sincronización instantánea del estado de la partida, registro seguro de usuarios y almacenamiento de preguntas y métricas. 

---

## 🎯 2. Requisitos y Especificaciones Funcionales

### 2.1. Tipos de Usuarios / Roles
- **Profesor (Host / Admin):** Creador y controlador de la sala. 
- **Alumno (Player):** Participante que se une a una sala existente mediante un código PIN.

### 2.2. Flujo de Juego Síncrono
1. **Lobby (Sala de espera):** El profesor crea una sala y se genera un PIN (ej: `4829`). En la pantalla del profesor (proyectada) van apareciendo los avatares y nombres de los alumnos en tiempo real según se conectan desde sus dispositivos móviles.
2. **Desarrollo (Gameplay):** El profesor pulsa "Iniciar". 
   - **Pantalla Profesor:** Muestra la pregunta, la imagen a la izquierda, las 4 opciones a la derecha y una cuenta atrás (ej: 15 seg).
   - **Pantalla Alumno:** *Preferiblemente*, muestra solo 4 grandes botones de colores correspondientes a las respuestas (A, B, C, D) para simplificar la UI en móviles y forzar a mirar la proyeción, o bien botones con el texto de la respuesta.
3. **Estadísticas (Resultados Parciales):** Al agotar el tiempo o al responder todos, la pantalla del alumno muestra si acertó o falló. La pantalla del profesor muestra un **gráfico de barras (estadísticas en vivo)** de cuántas personas votaron cada opción, revelando la correcta y su justificación.
4. **Leaderboard:** Tras cada pregunta (o al final), el profesor puede mostrar el Top 3 / Top 5 de puntuaciones actualizadas.
5. **Cierre:** Al finalizar las 20 preguntas, se muestra el Podio Final.

### 2.3. Panel de Administración del Profesor (Dashboard)
El profesor debe tener un área privada (protegida por login de Supabase) con las siguientes funcionalidades:
- **Gestor de Preguntas:** Capacidad de subir/reemplazar el banco de preguntas actual subiendo un archivo `.json`.
- **Visor de Alumnos en Vivo:** Visualizar quién está conectado en la sala de espera.
- **Historial y Notas (Base 10):** Tabla con el registro de todos los alumnos registrados, partidas jugadas, y su nota final calculada sobre 10 `(Puntuación_Lograda / Puntuación_Máxima * 10)`.
- **Exportación PDF:** Botón para generar y descargar un informe en PDF con las notas de los alumnos y métricas de la clase (usando librerías como `jspdf` o `react-pdf`).

### 2.4. Interfaz de Usuario (UI/UX)
- **Estética:** Debe mantenerse la identidad visual de V1.0 (Next.js, TailwindCSS, Shadcn/UI, Lucide Icons, paleta morada/dark glassmorphism, emojis de categoría a la izquierda).
- **Responsividad:** 
  - La vista del **Profesor** debe estar optimizada para **Desktop / Pantalla Completa / Proyector** (16:9).
  - La vista del **Alumno** debe ser **Mobile-First** (100% optimizada para pantallas táctiles estrechas).

---

## 🏗️ 3. Arquitectura Técnica y Stack

- **Frontend:** Next.js 15 (App Router), React, TailwindCSS, Shadcn/UI.
- **Backend / BaaS:** Supabase (Auth, Postgres Database, Realtime).
- **Despliegue:** Vercel (Frontend conectándose por API/SDK a la instancia de Supabase).
- **Gestión de Estado Game:** Zustand o Context API combinado con listeners de `supabase.channel()`.

### 3.1. Modelo de Base de Datos (Esquema Propuesto para Supabase/Postgres)

- `users`: (Manejada en parte por Supabase Auth + tabla pública extra) email, role (profesor/alumno), nota_media.
- `questions`: id, texto, imagen, opcion_a, opcion_b, opcion_c, opcion_d, correcta, explicacion, categoria.
- `rooms`: id (ej: 4829), status (waiting, playing, finished), current_question_id, host_id.
- `room_players`: room_id, player_id, score_acumulado.
- `answers`: room_id, question_id, player_id, opcion_elegida, is_correct, tiempo_tardado, puntos_ganados. *(Esta tabla se usa para calcular las barras estadísticas de la pregunta actual).*

---

## 🛠️ 4. Paso a Paso para la Implementación (Instrucciones para IA)

Para desarrollar este proyecto partiendo de cero (o migrando desde V1.0), sigue estos pasos metodolígicos:

### Paso 1: Configuración del Entorno y Supabase
1. **Crear proyecto Supabase:** Asegúrate de tener una cuenta en `supabase.com`. Crea un proyecto nuevo.
2. **Variables de entorno:** Configura `.env.local` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. **Modelado SQL:** Ejecuta los scripts SQL en el SQL Editor de Supabase para crear las tablas `questions`, `rooms`, `room_players` y `answers`. Configura las políticas RLS (Row Level Security) para que los alumnos puedan escribir respuestas y los profes puedan leer todo.
4. **Instalar dependencias:** `@supabase/supabase-js`, `jspdf`, `jspdf-autotable`, `zustand` (opcional).

### Paso 2: Autenticación y Layout
1. Implementar Supabase Auth para registro/login.
2. Redirigir a los usuarios por su rol: `/host` (Dashboard del profe) vs `/play` (Vista del alumno para meter PIN).

### Paso 3: Sala de Espera (Realtime Presence)
1. Desarrollar la creación de sala en `/host/lobby`. Inicializar una `Room` en base de datos.
2. Desarrollar `/play`. El alumno introduce el PIN, se inserta en `room_players`.
3. Usar **Supabase Realtime Presence** para que el host vea los avatares de los alumnos que van entrando en su proyector.

### Paso 4: Motor Central del Juego (Supabase Broadcast / DB Changes)
1. **El Profesor avanza:** El host hace click en "Iniciar Pregunta 1". El servidor actualiza el registro de `rooms.status = 'playing'`.
2. **Los Alumnos escuchan:** Los móviles de los alumnos están suscritos a `supabase.channel('room-PIN')`. Al detectar el cambio de estado, muestran los botones de colores A,B,C,D.
3. **Registro de Respuestas:** El alumno pulsa un botón. Se inserta un registro en la tabla `answers`.
4. **Gráfico en Vivo:** La pantalla del profe escucha `INSERT` en la tabla `answers` y va rellenando invisiblemente la gráfica.

### Paso 5: Estadísticas y Feedback
1. Al agotar el tiempo, el profe avanza estado a `rooms.status = 'showing_stats'`.
2. Las pantallas de alumnos calculan si acertaron y ganan puntos.
3. La pantalla del profe muestra la gráfica de barras de esa pregunta.

### Paso 6: Dashboard del Profesor
1. Migrar la subida de JSON actual a la nueva tabla `questions` de Supabase.
2. Desarrollar la vista "Alumnos y Notas" que haga consultas SQL agregando la tabla `answers` o leyendo el `bestScore` por alumno. Calcular la base /10.
3. Integrar **jsPDF** para mapear esta tabla a un documento `.pdf` descargable.

### Paso 7: Despliegue y Testing Local
1. Limpiar código muerto de la V1.0 (local storage sync, etc).
2. Probar conectando 2 navegadores incóngito en localhost (simulando Host y 2 Players).
3. Desplegar en Vercel.

---

> **Notas para el Agente IA de Desarrollo:** Este documento servirá como Prompt arquitectónico. Al ejecutar este plan, prioriza la estabilidad de los canales de Supabase Realtime y asegúrate de limpiar las salas (`rooms`) al finalizarlas para no agobiar el tier gratuito. El diseño debe reutilizar al máximo el esquema actual de colores e iconos (p.e. `CATEGORY_ICONS`).
