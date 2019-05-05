import Component from "@ember/component";
import layout from "../templates/components/player-range";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";
import noUiSlider from "nouislider";

export default Component.extend({
  layout,

  emberFlowplayer: service(),

  sliderValueB: 3,

  didInsertElement() {
    var rangeSlider = document.getElementById("slider");
    let min = parseInt(this.min);
    noUiSlider
      .create(rangeSlider, {
        start: [this.value],
        value: [this.value],
        connect: [true, false],
        behaviour: "tap-drag",
        range: {
          min: [parseInt(this.min)],
          max: [this.max]
        }
      })
      .on("slide", () => {
        this.set("sliding", true);
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
    },
    mobTouch() {
      alert("oi");
    }
  }
});
