import Component from "@ember/component";
import layout from "../templates/components/player-range";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";

export default Component.extend({
  layout,

  emberFlowplayer: service(),

  sliderValueB: 3,

  actions: {
    sliderEvent(event) {
      if (!this.emberFlowplayer.sliding) {
        this.emberFlowplayer.setSliderState(true);
      }
      this.set("value", event.target.value);
      //debounce(this.myFlowplayer.setSliderState(true));
      //debounce(this.set("value", event.target.value));
    },
    select(event) {
      //this.set("value", event.target.value);
      this.emberFlowplayer.player.seek(event.target.value);
      this.emberFlowplayer.setSliderState(false);
    },
    focusOut() {
      console.log("DON");
    },
    sliderMovedExplicit(val) {
      this.set("sliderValueB", val);
    }
  }
});
