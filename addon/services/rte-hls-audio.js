import Service from "@ember/service";

export default Service.extend({
  playerState: "idle",

  setPlayer(fp) {
    this.set("player", fp);
  },

  setPlayerState(state) {
    console.log("setting player state");
    this.set("playerState", state);
  },

  setReady(ready) {
    if (ready) {
      this.set("isReady", true);
    } else {
      this.set("isReady", false);
    }
  }
});
