import Service from "@ember/service";
import emberFlowplayer from "../components/ember-flowplayer";

export default Service.extend({
  status: "idle",

  player: null,

  currentTime: 0,

  setPlayer(fp) {
    this.set("player", fp);
  },

  setStatus(status) {
    this.set("status", status);
    if (status === "playing") {
      this.set("isPlaying", true);
    } else {
      this.set("isPlaying", false);
    }
  },

  play() {
    //flowplayer.play();
  },
  setTime(time) {
    this.set("currentTime", time);
  },
  setDuration(duration) {
    this.set("duration", duration);
  }
});
