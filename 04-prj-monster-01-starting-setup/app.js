function calcAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      result: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }

      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }

      return { width: this.playerHealth + "%" };
    },
    isSpecialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.result = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = calcAttackValue(5, 12);
      this.monsterHealth -= attackValue;
      this.logger("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = calcAttackValue(8, 15);
      this.playerHealth -= attackValue;
      this.logger("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = calcAttackValue(10, 25);
      this.monsterHealth -= attackValue;
      this.logger("monster", "special attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = calcAttackValue(8, 20);
      if (healValue + this.playerHealth > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.logger("player", "heal", healValue);

      this.attackPlayer();
    },
    surrender() {
      this.result = "monster";
      this.logger("player", "surrender", this.playerHealth);
    },
    logger(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    logClass(user) {
      return {
        "log--player": user === "player",
        "log--monster": user === "monster",
      };
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.result = "draw";
      } else if (value <= 0) {
        this.result = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.result = "draw";
      } else if (value <= 0) {
        this.result = "player";
      }
    },
  },
}).mount("#game");
