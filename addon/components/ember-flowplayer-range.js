import Component from "@ember/component";
import layout from "../templates/components/ember-flowplayer-range";
import { inject as service } from "@ember/service";
import noUiSlider from "nouislider";

export default Component.extend({
  layout,

  tagName: "div",

  elementId: "ember-flowplayer-player-range",

  emberFlowplayer: service(),

  didInsertElement() {
    var rangeSlider = document.getElementById("ember-flowplayer-player-range");
    noUiSlider.create(rangeSlider, {
      start: [this.value],
      value: [this.value],
      connect: [true, false],
      behaviour: "tap-drag",
      keyboardSupport: false,
      range: {
        min: [parseInt(this.min)],
        max: [this.max]
      }
    });
    this.emberFlowplayer.player.on("progress", (e, api) => {
      if (!this.sliding) {
        rangeSlider.noUiSlider.set(api.video.time);
      }
    });
    rangeSlider.noUiSlider.on("slide", () => {
      this.set("sliding", true);
    });
    rangeSlider.noUiSlider.on("end", values => {
      this.emberFlowplayer.player.seek(values);
      this.set("sliding", false);
    });
    rangeSlider.noUiSlider.on("change", values => {
      this.emberFlowplayer.player.seek(values);
      this.set("sliding", false);
    });
  },

  actions: {
    sliderEvent(event) {
      if (!this.emberFlowplayer.sliding) {
        this.emberFlowplayer.setSliderState(true);
      }
      this.set("value", event.target.value);
    },
    select(event) {
      this.emberFlowplayer.player.seek(event.target.value);
      this.emberFlowplayer.setSliderState(false);
    }
  }
});
