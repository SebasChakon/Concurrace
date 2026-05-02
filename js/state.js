const GameState = {
  score:   { lvl1: 0, lvl2: 0, lvl3: 0 },
  correct: 0,

  reset() {
    this.score   = { lvl1: 0, lvl2: 0, lvl3: 0 };
    this.correct = 0;
  },

  addScore(level, pts) {
    this.score[`lvl${level}`] += pts;
    UI.updateHeader();
  },

  addCorrect() {
    this.correct++;
    UI.updateHeader();
  },

  totalScore() {
    return this.score.lvl1 + this.score.lvl2 + this.score.lvl3;
  }
};

const Utils = {
  shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  },

  showFeedback(id, msg, ok) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.className = `feedback-msg show ${ok ? 'ok' : 'err'}`;
    setTimeout(() => el.classList.remove('show'), 3000);
  }
};

const UI = {
  updateHeader() {
    document.getElementById('hdr-score').textContent   = GameState.totalScore();
    document.getElementById('hdr-correct').textContent = GameState.correct;
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  setProgress(barId, pct) {
    document.getElementById(barId).style.width = pct + '%';
  },

  setBadge(text) {
    document.getElementById('level-badge').textContent = text;
  }
};