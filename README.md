# 🚀 AnnaHoot - Quiz de Fisiología Interactivo

AnnaHoot es una plataforma de aprendizaje moderna y dinámica diseñada para estudiantes de medicina y ciencias de la salud. Inspirada en la mecánica de Kahoot, esta aplicación transforma el estudio de la fisiología humana en un desafío competitivo y divertido.

## 🌟 Origen del Proyecto

AnnaHoot nació de la necesidad de herramientas de estudio más interactivas y retadoras para el área de la salud. Muchos recursos existentes son estáticos o demasiado básicos. AnnaHoot se diferencia ofreciendo:
- **Nivel Académico Alto**: Incluye bancos de preguntas de nivel avanzado (FISIOLOGÍA EXTREMA).
- **Gamificación**: Uso de puntos, bonos por velocidad y un ranking global para motivar el aprendizaje.
- **Flexibilidad**: Un sistema centralizado de administración que permite a los profesores o entusiastas cargar sus propios bancos de preguntas en segundos.

---

## ✨ Stack Tecnológico

Este proyecto utiliza tecnologías de vanguardia para garantizar rendimiento y escalabilidad:

### 🎯 Framework Principal
- **⚡ Next.js 16** - El framework de React para producción con App Router y Turbopack.
- **📘 TypeScript 5** - Tipado estricto para un desarrollo robusto.
- **🎨 Tailwind CSS 4** - Estilos rápidos y modernos.

### 🧩 Componentes UI y Estética
- **🧩 shadcn/ui** - Componentes accesibles y elegantes basados en Radix UI.
- **🎯 Lucide React** - Iconografía consistente y hermosa.
- **🌈 Framer Motion** - Animaciones y micro-interacciones premium.
- **🎨 Next Themes** - Modo oscuro incorporado.

### 📋 Formularios y Validación
- **🎣 React Hook Form** - Gestión de formularios fluida.
- **✅ Zod** - Validación de esquemas y tipos.

### 🔄 Estado y Datos
- **🐻 Zustand** - Gestión de estado global simple y escalable.
- **🔄 TanStack Query** - Sincronización de datos asíncronos y caché.
- **🗄️ Prisma** - ORM de nueva generación para la gestión de la base de datos SQL.

### 🔐 Seguridad y Auth
- **🔐 NextAuth.js** - Sistema completo de autenticación.

---

## 🎯 Características Principales

- **🏎️ Desarrollo Rápido** - Configuración optimizada para agilizar nuevas funcionalidades.
- **🛡️ Panel de Administración** - Acceso protegido para cargar preguntas via JSON y recargar la base de datos en tiempo real sin refrescar la página.
- **🏆 Clasificación (Leaderboard)** - Visualiza a los mejores jugadores en tiempo real.
- **📱 Responsivo** - Totalmente optimizado para móviles y tablets.
- **🔊 Experiencia Inmersiva** - Efectos de sonido y transiciones fluidas.

---

## 🚀 Inicio Rápido

Para ejecutar AnnaHoot en tu entorno local:

```bash
# 1. Instalar dependencias
npm install  # o bun install

# 2. Configurar la base de datos (Prisma)
npx prisma db push

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## 📁 Estructura del Proyecto

```text
src/
├── app/                 # Rutas de Next.js (Páginas y API)
├── components/          # Componentes React reutilizables
│   ├── admin/          # Panel de carga y administración
│   ├── game/           # Componentes del quiz (Tarjetas, Botones, Timer)
│   ├── layout/         # Header, Dashboard, Landing y Sidebars
│   └── ui/             # Componentes base (shadcn)
├── context/             # GameContext para el estado global del juego
├── hooks/               # Custom hooks de React
├── lib/                 # Utilidades (Auth, Game logic, Prisma client)
└── types/               # Definición de interfaces y tipos
```

---

## 📊 Administración de Preguntas

La aplicación permite cargar nuevos bancos de preguntas de forma sencilla. El formato JSON requerido es:

```json
[
  {
    "text": "Enunciado del problema...",
    "options": {
      "A": "Opción A",
      "B": "Opción B",
      "C": "Opción C",
      "D": "Opción D"
    },
    "correctAnswer": "A",
    "explanation": "Detalles técnicos...",
    "category": "Fisiología Cardiovascular"
  }
]
```

---

Comprometidos con la educación de calidad. 🩺🚀
Construido con ❤️ por el equipo de AnnaHoot.
