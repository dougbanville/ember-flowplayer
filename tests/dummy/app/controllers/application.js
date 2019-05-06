import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  emberFlowplayer: service(),

  muted: false,

  actions: {
    togglePlayer() {
      this.emberFlowplayer.player.toggle();
    },
    inputChange() {
      this.emberFlowplayer.setTime(0);
    },
    mute() {
      this.toggleProperty("muted");
      this.emberFlowplayer.player.mute(this.muted);
    }
  }
});
