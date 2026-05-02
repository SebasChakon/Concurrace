const Level1 = (() => {
  let selectedConcept = null;
  let matchedPairs    = 0;
  const TOTAL         = LVL1_DATA.length;

  function build() {
    selectedConcept = null;
    matchedPairs    = 0;

    const concepts   = Utils.shuffle(LVL1_DATA.map(d => d.concept));
    const categories = Utils.shuffle(LVL1_DATA.map(d => d.category));

    _renderList('concepts-list',   concepts,   'CONCEPTO',  _onConceptClick);
    _renderList('categories-list', categories, 'CATEGORÍA', _onCategoryClick);

    document.getElementById('feedback1').className    = 'feedback-msg';
    document.getElementById('btn-next1').style.display = 'none';
    document.getElementById('lvl1-score-info').textContent = '';
    UI.setProgress('prog1', 0);
  }

  function _renderList(containerId, items, label, handler) {
    const el = document.getElementById(containerId);
    el.innerHTML = '';
    items.forEach(value => {
      const item = document.createElement('div');
      item.className    = 'match-item';
      item.dataset.value = value;
      item.innerHTML    = `<div class="item-label">${label}</div>${value}`;
      item.addEventListener('click', () => handler(item, value));
      el.appendChild(item);
    });
  }

  function _onConceptClick(el, value) {
    if (el.classList.contains('correct')) return;
    document.querySelectorAll('#concepts-list .match-item.selected')
      .forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    selectedConcept = value;
  }

  function _onCategoryClick(el, catValue) {
    if (!selectedConcept) {
      Utils.showFeedback('feedback1', 'Primero selecciona un concepto de la izquierda.', false);
      return;
    }
    if (el.classList.contains('correct')) return;

    const correctCat  = LVL1_DATA.find(d => d.concept === selectedConcept)?.category;
    const conceptEl   = document.querySelector(`#concepts-list [data-value="${CSS.escape(selectedConcept)}"]`);

    if (catValue === correctCat) {
      _markCorrect(el, conceptEl);
    } else {
      _markWrong(el, conceptEl);
    }

    selectedConcept = null;
    document.querySelectorAll('#concepts-list .match-item.selected')
      .forEach(e => e.classList.remove('selected'));
  }

  function _markCorrect(catEl, conceptEl) {
    catEl.classList.add('correct');
    if (conceptEl) conceptEl.classList.add('correct');

    matchedPairs++;
    GameState.addScore(1, SCORING.LVL1_PER_PAIR);
    GameState.addCorrect();

    const pct = Math.round((matchedPairs / TOTAL) * 33);
    UI.setProgress('prog1', pct);

    const label = conceptEl?.dataset.value ?? '';
    Utils.showFeedback('feedback1', `✓ ¡Correcto! "${label}" corresponde a esa categoría.`, true);

    if (matchedPairs === TOTAL) _onComplete();
  }

  function _markWrong(catEl, conceptEl) {
    catEl.classList.add('wrong');
    if (conceptEl) conceptEl.classList.add('wrong');
    setTimeout(() => {
      catEl.classList.remove('wrong');
      if (conceptEl) conceptEl.classList.remove('wrong');
    }, 500);
    Utils.showFeedback('feedback1', `✗ Incorrecto. Esa categoría no corresponde a "${selectedConcept}". Intenta de nuevo.`, false);
  }

  function _onComplete() {
    UI.setProgress('prog1', 33);
    document.getElementById('lvl1-score-info').textContent =
      `Nivel 1 completado · ${GameState.score.lvl1} / ${TOTAL * SCORING.LVL1_PER_PAIR} pts`;
    document.getElementById('btn-next1').style.display = 'inline-block';
  }

  return { build };
})();