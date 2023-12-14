const StateMachine = require("javascript-state-machine");
const STATE = {
  INIT: "init",
  START: "start",
  WAVE_COMPLETE: "wave_complete",
  GAME_OVER: "game_over",
};

cc.Class({
  extends: cc.Component,
  properties: {
    monster: 0,
  },
  onLoad() {
    this._onStartGame = this.onStartGame.bind(this);
    this._onCompleteGame = this.onCompleteGame.bind(this);
    this._onGameOver = this.onGameOver.bind(this);

    this.fsm = new StateMachine({
      init: STATE.INIT,
      transitions: [
        { name: "goStart", from: STATE.INIT, to: STATE.START },
        { name: "goComplete", from: STATE.START, to: STATE.WAVE_COMPLETE },
        { name: "goOver", from: STATE.START, to: STATE.GAME_OVER },
      ],
      methods: {
        onGoStart: this._onStartGame,
        onGoComplete: this._onCompleteGame,
        onGoOver: this._onGameOver,
      },
    });
  },

  start() {
    this.schedule(() => {
      switch (this.fsm.state) {
        case STATE.INIT:
          this.fsm["goStart"]();
          this.monster = 0;
          break;
        case STATE.START:
          if (this.monster == 0) {
            this.fsm["goComplete"]();
          } else {
            this.fsm["goOver"]();
          }
        default:
          cc.log('out schedule')
          this.unscheduleAllCallbacks();
          break;
      }
    }, 2);
  },

  onStartGame() {
    cc.log("start game");
  },

  onCompleteGame() {
    cc.log("complete wave");
  },

  onGameOver() {
    cc.log("game over");
  },
});
