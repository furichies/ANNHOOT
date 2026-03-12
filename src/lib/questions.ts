import { Question } from '@/types';

// 20 Physiology questions in Spanish
// Images will be generated or use placeholders
export const questions: Question[] = [
  {
    id: 1,
    text: "¿Cuál es el órgano principal del sistema cardiovascular?",
    image: "/questions/heart.svg",
    options: {
      A: "Pulmón",
      B: "Corazón",
      C: "Hígado",
      D: "Riñón"
    },
    correctAnswer: "B",
    explanation: "El corazón es el órgano central del sistema cardiovascular, responsable de bombear sangre a todo el cuerpo.",
    category: "Sistema Cardiovascular"
  },
  {
    id: 2,
    text: "¿Qué célula sanguínea es responsable del transporte de oxígeno?",
    image: "/questions/blood-cells.svg",
    options: {
      A: "Leucocito",
      B: "Plaqueta",
      C: "Eritrocito",
      D: "Linfocito"
    },
    correctAnswer: "C",
    explanation: "Los eritrocitos o glóbulos rojos contienen hemoglobina, que transporta oxígeno desde los pulmones a los tejidos.",
    category: "Sistema Cardiovascular"
  },
  {
    id: 3,
    text: "¿En qué estructura pulmonar ocurre el intercambio de gases?",
    image: "/questions/alveoli.svg",
    options: {
      A: "Bronquios",
      B: "Tráquea",
      C: "Alvéolos",
      D: "Laringe"
    },
    correctAnswer: "C",
    explanation: "Los alvéolos son sacos de aire microscópicos donde ocurre el intercambio de oxígeno y dióxido de carbono.",
    category: "Sistema Respiratorio"
  },
  {
    id: 4,
    text: "¿Cuál es la capacidad vital promedio de un adulto?",
    image: "/questions/lungs.svg",
    options: {
      A: "2-3 litros",
      B: "4-6 litros",
      C: "7-8 litros",
      D: "1-2 litros"
    },
    correctAnswer: "B",
    explanation: "La capacidad vital promedio de un adulto es de aproximadamente 4-6 litros, dependiendo de la edad, sexo y condición física.",
    category: "Sistema Respiratorio"
  },
  {
    id: 5,
    text: "¿Cuál es la neurona que transmite impulsos desde el sistema nervioso central hacia los músculos?",
    image: "/questions/neuron.svg",
    options: {
      A: "Neurona sensorial",
      B: "Neurona de asociación",
      C: "Neurona motora",
      D: "Neurona intercalar"
    },
    correctAnswer: "C",
    explanation: "Las neuronas motoras transmiten impulsos desde el SNC hacia los músculos efectores o glándulas.",
    category: "Sistema Nervioso"
  },
  {
    id: 6,
    text: "¿Qué neurotransmisor está principalmente involucrado en el control del movimiento y el placer?",
    image: "/questions/brain.svg",
    options: {
      A: "Serotonina",
      B: "Dopamina",
      C: "GABA",
      D: "Acetilcolina"
    },
    correctAnswer: "B",
    explanation: "La dopamina es un neurotransmisor clave en el control del movimiento, la motivación y la sensación de placer.",
    category: "Sistema Nervioso"
  },
  {
    id: 7,
    text: "¿En qué parte del sistema digestivo comienza la digestión de las proteínas?",
    image: "/questions/stomach.svg",
    options: {
      A: "Boca",
      B: "Esófago",
      C: "Estómago",
      D: "Intestino delgado"
    },
    correctAnswer: "C",
    explanation: "La digestión de proteínas comienza en el estómago gracias a la acción del ácido clorhídrico y la pepsina.",
    category: "Sistema Digestivo"
  },
  {
    id: 8,
    text: "¿Qué órgano produce la bilis necesaria para la digestión de grasas?",
    image: "/questions/liver.svg",
    options: {
      A: "Páncreas",
      B: "Vesícula biliar",
      C: "Hígado",
      D: "Estómago"
    },
    correctAnswer: "C",
    explanation: "El hígado produce la bilis, que luego se almacena en la vesícula biliar y se libera para emulsificar grasas.",
    category: "Sistema Digestivo"
  },
  {
    id: 9,
    text: "¿Qué tipo de músculo se encuentra en las paredes del corazón?",
    image: "/questions/heart-muscle.svg",
    options: {
      A: "Músculo esquelético",
      B: "Músculo liso",
      C: "Músculo cardíaco",
      D: "Músculo estriado voluntario"
    },
    correctAnswer: "C",
    explanation: "El músculo cardíaco (miocardio) es un tipo especial de músculo estriado involuntario que forma las paredes del corazón.",
    category: "Sistema Muscular"
  },
  {
    id: 10,
    text: "¿Qué proteína es la principal responsable de la contracción muscular?",
    image: "/questions/muscle-fiber.svg",
    options: {
      A: "Colágeno",
      B: "Miosina",
      C: "Elastina",
      D: "Queratina"
    },
    correctAnswer: "B",
    explanation: "La miosina, junto con la actina, son las proteínas contráctiles principales que permiten la contracción muscular.",
    category: "Sistema Muscular"
  },
  {
    id: 11,
    text: "¿Cuál es la hormona principal producida por la glándula tiroides?",
    image: "/questions/thyroid.svg",
    options: {
      A: "Insulina",
      B: "Cortisol",
      C: "Tiroxina (T4)",
      D: "Adrenalina"
    },
    correctAnswer: "C",
    explanation: "La tiroides produce principalmente tiroxina (T4) y triyodotironina (T3), hormonas que regulan el metabolismo.",
    category: "Sistema Endocrino"
  },
  {
    id: 12,
    text: "¿Qué glándula se conoce como la 'glándula maestra' del sistema endocrino?",
    image: "/questions/pituitary.svg",
    options: {
      A: "Tiroides",
      B: "Hipófisis",
      C: "Suprarrenales",
      D: "Páncreas"
    },
    correctAnswer: "B",
    explanation: "La hipófisis o glándula pituitaria es considerada la glándula maestra porque controla otras glándulas endocrinas.",
    category: "Sistema Endocrino"
  },
  {
    id: 13,
    text: "¿Cuál es la unidad funcional del riñón?",
    image: "/questions/kidney.svg",
    options: {
      A: "Nefrona",
      B: "Glomérulo",
      C: "Túbulo contorneado",
      D: "Pelvis renal"
    },
    correctAnswer: "A",
    explanation: "La nefrona es la unidad funcional del riñón, responsable de filtrar la sangre y producir orina.",
    category: "Sistema Renal"
  },
  {
    id: 14,
    text: "¿Qué hormona regula la reabsorción de agua en los riñones?",
    image: "/questions/kidney-function.svg",
    options: {
      A: "Aldosterona",
      B: "Hormona antidiurética (ADH)",
      C: "Parathormona",
      D: "Calcitonina"
    },
    correctAnswer: "B",
    explanation: "La hormona antidiurética (ADH o vasopresina) regula la reabsorción de agua en los túbulos colectores del riñón.",
    category: "Sistema Renal"
  },
  {
    id: 15,
    text: "¿Qué orgánulo celular es responsable de la producción de energía (ATP)?",
    image: "/questions/mitochondria.svg",
    options: {
      A: "Ribosoma",
      B: "Retículo endoplásmico",
      C: "Mitocondria",
      D: "Aparato de Golgi"
    },
    correctAnswer: "C",
    explanation: "La mitocondria es la 'central energética' de la célula, donde ocurre la respiración celular y se produce ATP.",
    category: "Fisiología Celular"
  },
  {
    id: 16,
    text: "¿Qué estructura celular controla el paso de sustancias entre el núcleo y el citoplasma?",
    image: "/questions/nucleus.svg",
    options: {
      A: "Membrana plasmática",
      B: "Poro nuclear",
      C: "Membrana nuclear",
      D: "Citoesqueleto"
    },
    correctAnswer: "B",
    explanation: "Los poros nucleares son complejos proteicos que regulan el transporte de moléculas entre el núcleo y el citoplasma.",
    category: "Fisiología Celular"
  },
  {
    id: 17,
    text: "¿Cuál es el nombre del líquido que lubrica las articulaciones?",
    image: "/questions/joint.svg",
    options: {
      A: "Líquido cefalorraquídeo",
      B: "Líquido sinovial",
      C: "Líquido linfático",
      D: "Plasma sanguíneo"
    },
    correctAnswer: "B",
    explanation: "El líquido sinovial es producido por la membrana sinovial y lubrica las articulaciones sinoviales.",
    category: "Sistema Muscular"
  },
  {
    id: 18,
    text: "¿Qué célula del sistema inmunológico es la principal productora de anticuerpos?",
    image: "/questions/immune-cell.svg",
    options: {
      A: "Macrófago",
      B: "Célula T asesina",
      C: "Célula B plasmática",
      D: "Neutrófilo"
    },
    correctAnswer: "C",
    explanation: "Las células B plasmáticas son las encargadas de producir anticuerpos específicos contra antígenos.",
    category: "Sistema Inmunológico"
  },
  {
    id: 19,
    text: "¿En qué zona del cerebro se encuentra el centro de la respiración?",
    image: "/questions/brainstem.svg",
    options: {
      A: "Cerebro",
      B: "Cerebelo",
      C: "Bulbo raquídeo",
      D: "Tálamo"
    },
    correctAnswer: "C",
    explanation: "El centro respiratorio se encuentra en el bulbo raquídeo y controla automáticamente la respiración.",
    category: "Sistema Nervioso"
  },
  {
    id: 20,
    text: "¿Cuál es el valor normal de glucosa en ayunas en sangre (mg/dL)?",
    image: "/questions/glucose.svg",
    options: {
      A: "50-70 mg/dL",
      B: "70-100 mg/dL",
      C: "120-150 mg/dL",
      D: "150-200 mg/dL"
    },
    correctAnswer: "B",
    explanation: "Los valores normales de glucosa en ayunas están entre 70-100 mg/dL. Valores mayores pueden indicar prediabetes o diabetes.",
    category: "Sistema Endocrino"
  }
];

// Shuffle questions for each game
export function shuffleQuestions(): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get question by ID
export function getQuestionById(id: number): Question | undefined {
  return questions.find(q => q.id === id);
}

// Get questions by category
export function getQuestionsByCategory(category: string): Question[] {
  return questions.filter(q => q.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  return [...new Set(questions.map(q => q.category))];
}
