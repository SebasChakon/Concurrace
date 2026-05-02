const LVL1_DATA = [
  { concept: "Condición de carrera",      category: "Acceso no sincronizado"   },
  { concept: "Deadlock (bloqueo mutuo)",  category: "Espera circular"          },
  { concept: "Inanición (starvation)",    category: "Proceso sin turno"        },
  { concept: "Sección crítica",           category: "Zona de acceso exclusivo" },
  { concept: "Livelock",                  category: "Procesos activos sin avance" },
  { concept: "Exclusión mutua",           category: "Propiedad de seguridad"   }
];

const LVL2_DATA = [
  {
    word: "Mutex",
    def:  "Mecanismo de sincronización que garantiza que solo un proceso pueda acceder a un recurso a la vez."
  },
  {
    word: "Semáforo",
    def:  "Variable entera que controla el acceso concurrente; permite señalar y esperar entre procesos."
  },
  {
    word: "Monitor",
    def:  "Estructura de alto nivel que encapsula datos y procedimientos, garantizando acceso exclusivo automáticamente."
  },
  {
    word: "Interbloqueo",
    def:  "Estado donde un conjunto de procesos espera indefinidamente por recursos retenidos por otros del mismo conjunto."
  },
  {
    word: "Condición de carrera",
    def:  "Situación donde el resultado depende del orden de ejecución no determinista de procesos concurrentes."
  },
  {
    word: "Espera activa (busy waiting)",
    def:  "Técnica donde un proceso verifica repetidamente una condición en bucle, consumiendo CPU sin hacer trabajo útil."
  }
];

const LVL3_DATA = [
  {
    q: "Dos procesos P1 y P2 necesitan los recursos A y B. P1 tiene A y espera B; P2 tiene B y espera A. ¿Qué problema ocurre?",
    opts:    ["Inanición", "Condición de carrera", "Deadlock", "Livelock"],
    correct: 2,
    exp:     "Es un <strong>Deadlock</strong>: los procesos forman una espera circular. P1 → espera B (que tiene P2) → P2 espera A (que tiene P1). Ninguno puede avanzar."
  },
  {
    q: "Un contador global se incrementa con `contador++` desde dos hilos sin sincronización. Al final, el valor puede ser incorrecto. ¿Cuál es la causa?",
    opts:    ["Deadlock", "Condición de carrera", "Inanición", "Monitor"],
    correct: 1,
    exp:     "Es una <strong>Condición de carrera</strong>: `contador++` no es atómica (lee, incrementa, escribe). Los hilos pueden sobrescribir el trabajo del otro."
  },
  {
    q: "Un proceso siempre es desplazado por otros de mayor prioridad y nunca logra ejecutarse. Este fenómeno se llama:",
    opts:    ["Deadlock", "Condición de carrera", "Exclusión mutua", "Inanición (starvation)"],
    correct: 3,
    exp:     "Es <strong>Inanición</strong>: el proceso espera indefinidamente porque otros de mayor prioridad siempre lo desplazan, sin que se viole ninguna regla explícita de bloqueo."
  },
  {
    q: "¿Cuál de estas condiciones NO es necesaria para que ocurra un deadlock según Coffman?",
    opts:    ["Exclusión mutua", "Espera circular", "Condición de carrera", "Retención y espera"],
    correct: 2,
    exp:     "La <strong>Condición de carrera</strong> no es una condición de Coffman. Las cuatro necesarias son: exclusión mutua, retención y espera, no apropiación y espera circular."
  },
  {
    q: "Dos procesos intentan evitar un conflicto y cada uno cede el paso al otro en bucle. Ambos siguen activos pero ninguno avanza. ¿Qué situación es esta?",
    opts:    ["Deadlock", "Livelock", "Inanición", "Sección crítica"],
    correct: 1,
    exp:     "Es <strong>Livelock</strong>: a diferencia del deadlock, los procesos no están bloqueados (siguen ejecutándose), pero sus acciones se anulan mutuamente y no progresan."
  },
  {
    q: "Un semáforo binario se inicializa en 1. Un proceso ejecuta wait(S) y reduce S a 0. ¿Qué sucede si otro proceso intenta wait(S) en ese momento?",
    opts:    ["El semáforo se incrementa a 2", "El proceso continúa normalmente", "El proceso queda bloqueado hasta que S > 0", "Se produce un deadlock automáticamente"],
    correct: 2,
    exp:     "El proceso se <strong>bloquea</strong>: con S = 0, la operación wait hace que el proceso entre en espera. Solo cuando el primero ejecute signal(S), S sube a 1 y el bloqueado puede continuar."
  }
];

const SCORING = {
  LVL1_PER_PAIR: 5,  
  LVL2_PER_PAIR: 5, 
  LVL3_PER_Q:    Math.round(40 / LVL3_DATA.length),
  MAX_TOTAL:     100
};
