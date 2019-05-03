import Component from "@ember/component";
import layout from "../templates/components/player-range";

export default Component.extend({
  layout,

  input(event) {
    console.log(event.target.value);
  },

  actions: {
    sliderMoved(event) {
      console.log(event.target.value); // the slider's value
    }
  }
});
