const Level3 = (() => {
  let answeredCount = 0;
  const TOTAL       = LVL3_DATA.length;
  const LETTERS     = ['A', 'B', 'C', 'D'];

  function build() {
    answeredCount = 0;

    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    document.getElementById('lvl3-btn-row').style.display = 'none';
    UI.setProgress('prog3', 66);

    LVL3_DATA.forEach((q, qi) => {
      const card = _buildQuestionCard(q, qi);
      container.appendChild(card);
    });
  }

  function _buildQuestionCard(q, qi) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id        = `qcard-${qi}`;

    const shuffled = Utils.shuffle(q.opts.map((text, origIdx) => ({ text, origIdx })));

    card.innerHTML = `
      <div class="q-number">Pregunta ${qi + 1} de ${TOTAL}</div>
      <div class="q-text">${q.q}</div>
      <div class="options-grid" id="opts-${qi}">
        ${shuffled.map((opt, i) => `
          <button
            class="opt-btn"
            data-orig="${opt.origIdx}"
            onclick="Level3.answer(${qi}, ${opt.origIdx}, this)"
          >
            <span class="opt-letter">${LETTERS[i]}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
      <div class="q-feedback" id="qfb-${qi}"></div>
    `;

    return card;
  }

  function answer(qi, chosenOrigIdx, btn) {
    const q       = LVL3_DATA[qi];
    const allBtns = document.querySelectorAll(`#opts-${qi} .opt-btn`);
    const fb      = document.getElementById(`qfb-${qi}`);

    allBtns.forEach(b => b.classList.add('disabled'));

    if (chosenOrigIdx === q.correct) {
      btn.classList.add('correct-opt');
      GameState.addScore(3, SCORING.LVL3_PER_Q);
      GameState.addCorrect();
      fb.innerHTML   = `<strong>✓ ¡Correcto!</strong> ${q.exp}`;
      fb.className   = 'q-feedback show ok';
    } else {
      btn.classList.add('wrong-opt');
      allBtns.forEach(b => {
        if (parseInt(b.dataset.orig) === q.correct) b.classList.add('correct-opt');
      });
      fb.innerHTML = `<strong>✗ Incorrecto.</strong> ${q.exp}`;
      fb.className = 'q-feedback show err';
    }

    answeredCount++;
    const pct = 66 + Math.round((answeredCount / TOTAL) * 34);
    UI.setProgress('prog3', pct);

    if (answeredCount === TOTAL) {
      setTimeout(_onComplete, 500);
    }
  }

  function _onComplete() {
    document.getElementById('lvl3-score-info').textContent =
      `Nivel 3 completado · ${GameState.score.lvl3} / ${TOTAL * SCORING.LVL3_PER_Q} pts`;
    document.getElementById('lvl3-btn-row').style.display = 'flex';
  }

  return { build, answer };
})();