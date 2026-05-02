const Game = (() => {

  function start() {
    GameState.reset();
    UI.updateHeader();

    document.getElementById('game-header').style.display = 'flex';
    UI.setBadge('NIVEL 01');

    Level1.build();
    UI.showScreen('screen-lvl1');
  }

  function restart() {
    document.getElementById('game-header').style.display = 'none';
    UI.showScreen('screen-start');
  }

  function goLevel2() {
    UI.setBadge('NIVEL 02');
    Level2.build();
    UI.showScreen('screen-lvl2');
  }

  function goLevel3() {
    UI.setBadge('NIVEL 03');
    Level3.build();
    UI.showScreen('screen-lvl3');
  }

  function goEnd() {
    UI.setBadge('FINAL');
    EndScreen.build();
    UI.showScreen('screen-end');
  }

  return { start, restart, goLevel2, goLevel3, goEnd };
})();

function startGame()  { Game.start();    }
function goLevel2()   { Game.goLevel2(); }
function goLevel3()   { Game.goLevel3(); }
function goEnd()      { Game.goEnd();    }
function restartGame(){ Game.restart();  }