# 🚀 AnaHoot - Quiz de Fisiología Interactivo

AnaHoot es una plataforma de aprendizaje moderna y dinámica diseñada para estudiantes de medicina y ciencias de la salud. Inspirada en la mecánica de Kahoot, esta aplicación transforma el estudio de la fisiología humana en un desafío competitivo y divertido.

## 🌟 Origen del Proyecto

AnaHoot nació de la necesidad de herramientas de estudio más interactivas y retadoras para el área de la salud. Muchos recursos existentes son estáticos o demasiado básicos. AnaHoot se diferencia ofreciendo:
- **Nivel Académico Alto**: Incluye bancos de preguntas de nivel avanzado (FISIOLOGÍA EXTREMA).
- **Gamificación**: Uso de puntos, bonos por velocidad y un ranking global para motivar el aprendizaje.
- **Flexibilidad**: Un sistema centralizado de administración que permite a los profesores o entusiastas cargar sus propios bancos de preguntas en segundos.

---

## 🛠️ Instalación Paso a Paso

Sigue estos pasos para configurar el proyecto en tu entorno local:

### 1. Requisitos Previos
Asegúrate de tener instalado:
- **Node.js** (Versión 18 o superior)
- **Gestor de paquetes** (npm, bun o yarn)
- **SQLite** (Incrustado por defecto a través de Prisma)

### 2. Instalación de Dependencias
Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las librerías necesarias:
```bash
npm install
# o si prefieres bun:
bun install
```

### 3. Configuración de la Base de Datos
El proyecto utiliza **Prisma ORM** con una base de datos SQLite local para simplificar el desarrollo. Genera el cliente de Prisma y prepara la base de datos con:
```bash
npx prisma generate
npx prisma db push
```

### 4. Lanzamiento de la Aplicación
Inicia el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🛡️ Área de Administración

En este prototipo, el acceso a la administración es sumamente intuitivo pero está centralizado en la interfaz principal:

1. **Inicia Sesión o Regístrate**: Debes estar identificado para ver las herramientas.
2. **Icono del Escudo**: Una vez en el *Dashboard*, desplaza la vista hacia la cabecera (**Header**). Verás un icono de **escudo de seguridad** junto a tu perfil.
3. **Panel Flotante**: Al hacer clic en el escudo, se abrirá un panel modal que permite:
   - **Subir Archivos**: Seleccionar un fichero `.json` con preguntas nuevas (esto sobrescribirá las actuales).
   - **Recargar Preguntas**: Actualizar los datos de la aplicación instantáneamente desde la base de datos sin necesidad de recargar la página del navegador.

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

- **🛡️ Panel de Administración Instantáneo** - Cambia el contenido del juego en segundos.
- **🏆 Clasificación (Leaderboard)** - Visualiza a los mejores jugadores en tiempo real.
- **📱 Responsivo** - Totalmente optimizado para móviles y tablets.
- **🔊 Experiencia Inmersiva** - Efectos de sonido y transiciones fluidas.

---

## 📁 Estructura del Proyecto

```text
src/
├── app/                 # Rutas de Next.js (Páginas y API)
├── components/          # Componentes React reutilizables
│   ├── admin/          # Panel de carga y administración (Modal)
│   ├── game/           # Componentes del quiz (Tarjetas, Botones, Timer)
│   ├── layout/         # Header, Dashboard, Landing y Sidebars
│   └── ui/             # Componentes base (shadcn)
├── context/             # GameContext para el estado global del juego
├── hooks/               # Custom hooks de React
├── lib/                 # Utilidades (Auth, Game logic, Prisma client)
└── types/               # Definición de interfaces y tipos
```

---

## 📊 Formato de Preguntas (JSON)

Para cargar preguntas, el fichero debe seguir esta estructura:

```json
[
  {
    "text": "¿Cuál es la unidad funcional del riñón?",
    "options": {
      "A": "Nefrona",
      "B": "Glomérulo",
      "C": "Túbulo colector",
      "D": "Asa de Henle"
    },
    "correctAnswer": "A",
    "explanation": "La nefrona es la unidad estructural y funcional encargada del filtrado...",
    "category": "Fisiología Renal"
  }
]
```

---

## 📜 Licencia

Este proyecto está bajo la licencia **GNU General Public License v3.0 (GPLv3)**. 

Esto significa que:
- Puedes usar, copiar y modificar el software.
- Puedes redistribuir el software (modificado o no).
- **Cualquier software derivado debe ser distribuido bajo la misma licencia GPLv3** (herencia de libertad).
- Se debe incluir el código fuente original.

---

Comprometidos con la educación de calidad. 🩺🚀
Construido con ❤️ por el equipo de AnaHoot.
