import Component from "@ember/component";
import layout from "../templates/components/ember-flowplayer-volumerange";
import { inject as service } from "@ember/service";
import noUiSlider from "nouislider";

export default Component.extend({
  layout,

  tagName: "div",

  elementId: "ember-flowplayer-volumerange",

  emberFlowplayer: service(),

  didInsertElement() {
    var rangeSlider = document.getElementById("ember-flowplayer-volumerange");

    noUiSlider
      .create(rangeSlider, {
        start: [this.value],
        value: [this.value],
        connect: [true, false],
        behaviour: "tap-drag",
        keyboardSupport: false,
        range: {
          min: [0],
          max: [1]
        }
      })
      .on("slide", () => {
        this.set("sliding", true);
      });

    rangeSlider.noUiSlider.on("end", values => {
      //this.emberFlowplayer.player.set("volume", 0);
      //this.emberFlowplayer.player.volume(0.5);
      let volume = parseFloat(values);
      console.log(this.emberFlowplayer.player.conf.volume);
      //this.emberFlowplayer.player.conf.volume = volume;
      this.emberFlowplayer.player.volume(volume);
      this.set("sliding", false);
    });

    document
      .getElementsByClassName("noUi-connect")[1]
      .classList.add(this.emberFlowplayer.nowPlaying.stationClass);
  }
});
