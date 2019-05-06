import Service from "@ember/service";
import emberFlowplayer from "../components/ember-flowplayer";

export default Service.extend({
  status: "idle",

  player: null,

  currentTime: 0,

  changeSrc: false,

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
  setVolume(vol) {
    flowplayer.volume(0.5);
  },
  setTime(time) {
    this.set("currentTime", time);
  },
  setDuration(duration) {
    this.set("duration", duration);
  },
  setSliderState(sliding) {
    this.set("sliding", sliding);
  },
  change(s) {
    this.set("changeSrc", s);
  }
});
