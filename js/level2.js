const Level2 = (() => {
  let selectedWord = null;
  let matchedDefs  = 0;
  const TOTAL      = LVL2_DATA.length;

  function build() {
    selectedWord = null;
    matchedDefs  = 0;

    const shuffledWords = Utils.shuffle(LVL2_DATA.map(d => d.word));
    const shuffledDefs  = Utils.shuffle(LVL2_DATA);

    _renderChips(shuffledWords);
    _renderDefs(shuffledDefs);

    document.getElementById('feedback2').className     = 'feedback-msg';
    document.getElementById('btn-next2').style.display = 'none';
    document.getElementById('lvl2-score-info').textContent = '';
    UI.setProgress('prog2', 33);
  }

  function _renderChips(words) {
    const container = document.getElementById('word-chips');
    container.innerHTML = '';
    words.forEach(w => {
      const chip = document.createElement('span');
      chip.className    = 'word-chip';
      chip.textContent  = w;
      chip.dataset.word = w;
      chip.addEventListener('click', () => _onChipClick(chip, w));
      container.appendChild(chip);
    });
  }

  function _renderDefs(defs) {
    const list = document.getElementById('def-list');
    list.innerHTML = '';
    defs.forEach(item => {
      const el  = document.createElement('div');
      const uid = item.word.replace(/[\s()]/g, '_');
      el.className           = 'def-item';
      el.dataset.correctWord = item.word;
      el.innerHTML = `
        <div class="def-answer" id="ans-${uid}">—</div>
        <div>${item.def}</div>
      `;
      el.addEventListener('click', () => _onDefClick(el, item.word));
      list.appendChild(el);
    });
  }

  function _onChipClick(el, word) {
    if (el.classList.contains('used')) return;
    document.querySelectorAll('.word-chip.selected').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    selectedWord = word;
  }

  function _onDefClick(el, correctWord) {
    if (!selectedWord) {
      Utils.showFeedback('feedback2', 'Primero selecciona un término del banco de palabras.', false);
      return;
    }
    if (el.classList.contains('correct')) return;

    const uid   = correctWord.replace(/[\s()]/g, '_');
    const ansEl = document.getElementById(`ans-${uid}`);

    if (selectedWord === correctWord) {
      _markCorrect(el, ansEl);
    } else {
      _markWrong(el, ansEl);
    }

    selectedWord = null;
    document.querySelectorAll('.word-chip.selected').forEach(e => e.classList.remove('selected'));
  }

  function _markCorrect(defEl, ansEl) {
    defEl.classList.add('correct');
    ansEl.textContent = selectedWord;
    ansEl.classList.add('correct-ans');

    const chipEl = document.querySelector(`.word-chip[data-word="${CSS.escape(selectedWord)}"]`);
    if (chipEl) chipEl.classList.add('used');

    matchedDefs++;
    GameState.addScore(2, SCORING.LVL2_PER_PAIR);
    GameState.addCorrect();

    const pct = 33 + Math.round((matchedDefs / TOTAL) * 33);
    UI.setProgress('prog2', pct);

    Utils.showFeedback('feedback2', `✓ Correcto. "${selectedWord}" coincide con esa definición.`, true);

    if (matchedDefs === TOTAL) _onComplete();
  }

  function _markWrong(defEl, ansEl) {
    defEl.classList.add('wrong-target');
    ansEl.textContent = selectedWord;
    setTimeout(() => {
      defEl.classList.remove('wrong-target');
      ansEl.textContent = '—';
    }, 600);
    Utils.showFeedback('feedback2', `✗ "${selectedWord}" no corresponde a esa definición. Intenta con otra.`, false);
  }

  function _onComplete() {
    UI.setProgress('prog2', 66);
    document.getElementById('lvl2-score-info').textContent =
      `Nivel 2 completado · ${GameState.score.lvl2} / ${TOTAL * SCORING.LVL2_PER_PAIR} pts`;
    document.getElementById('btn-next2').style.display = 'inline-block';
  }

  return { build };
})();