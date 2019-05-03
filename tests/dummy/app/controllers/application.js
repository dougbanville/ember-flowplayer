import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  emberFlowplayer: service(),

  actions: {
    toggle() {
      this.emberFlowplayer.player.toggle();
    }
  }
});
