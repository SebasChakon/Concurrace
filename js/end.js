const EndScreen = (() => {

  const RATINGS = [
    {
      minPct: 90,
      icon:   '🏆',
      title:  '¡Maestro de la Concurrencia!',
      msg:    'Desempeño excepcional. Dominas los problemas clásicos de concurrencia. Estás listo para diseñar sistemas distribuidos robustos.'
    },
    {
      minPct: 70,
      icon:   '🎯',
      title:  '¡Gran rendimiento!',
      msg:    'Muy buen dominio del tema. Tienes claros los conceptos clave. Repasa los que fallaste y estarás al nivel de un experto.'
    },
    {
      minPct: 50,
      icon:   '📚',
      title:  'Buen intento',
      msg:    'Conoces los fundamentos pero hay conceptos que necesitan refuerzo. Revisa deadlock, livelock y condiciones de carrera.'
    },
    {
      minPct: 0,
      icon:   '💡',
      title:  'Sigue practicando',
      msg:    'Los problemas de concurrencia son complejos. Te recomendamos repasar los conceptos de Coffman, semáforos y secciones críticas antes de volver a intentarlo.'
    }
  ];

  function build() {
    const total  = GameState.totalScore();
    const maxPts = (LVL1_DATA.length * SCORING.LVL1_PER_PAIR)
                 + (LVL2_DATA.length * SCORING.LVL2_PER_PAIR)
                 + (LVL3_DATA.length * SCORING.LVL3_PER_Q);
    const pct    = Math.round((total / maxPts) * 100);

    document.getElementById('res-lvl1').textContent = GameState.score.lvl1;
    document.getElementById('res-lvl2').textContent = GameState.score.lvl2;
    document.getElementById('res-lvl3').textContent = GameState.score.lvl3;

    document.getElementById('end-total').textContent = pct;

    const rating = RATINGS.find(r => pct >= r.minPct);
    document.getElementById('end-icon').textContent   = rating.icon;
    document.getElementById('end-title').textContent  = rating.title;
    document.getElementById('end-rating').textContent = rating.msg;
  }

  return { build };
})();