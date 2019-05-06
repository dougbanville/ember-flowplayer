import Component from "@ember/component";
import layout from "../templates/components/ember-flowplayer-change-source";
import { inject as service } from "@ember/service";

export default Component.extend({
  layout,
  emberFlowplayer: service(),

  type: "application/x-mpegurl",

  actions: {
    play(url) {
      this.emberFlowplayer.change(true);
      let audio = [{ type: this.get("type"), src: this.get("source") }];

      this.emberFlowplayer.player
        .load({
          sources: audio
        })
        .on("ready", (e, api) => {});
    }
  }
});
