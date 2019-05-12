import Component from "@ember/component";
import layout from "../templates/components/ember-flowplayer-live-range";
import { inject as service } from "@ember/service";
import noUiSlider from "nouislider";
import { task, timeout } from "ember-concurrency";
import moment from "moment";

export default Component.extend({
  layout,

  emberFlowplayer: service(),

  tagName: "div",

  elementId: "ember-flowplayer-liverange",

  showDuration: 0,

  startTime: "2019-06-11 14:00",

  timeLeft: 0,

  ready: false,

  durationClass: "radio1",

  didInsertElement() {
    var rangeSlider = document.getElementById("ember-flowplayer-liverange");

    noUiSlider.create(rangeSlider, {
      start: [this.timeLeft],
      value: [this.timeLeft],
      connect: [true, false],
      behaviour: "tap-drag",
      keyboardSupport: false,
      disabled: true,
      range: {
        min: [0],
        max: [this.emberFlowplayer.nowPlaying.duration]
      }
    });
    this.set("rangeSlider", rangeSlider);
    this.set("ready", true);
    rangeSlider.setAttribute("disabled", true);
    //hide the auld handle
    document.getElementsByClassName("noUi-handle")[0].style.visibility = "hidden";
    document.getElementsByClassName("noUi-connect")[0].classList.add(this.durationClass);
  },

  updateRange: task(function*() {
    while (true) {
      let toTheEnd = moment(moment()).diff(moment(this.emberFlowplayer.nowPlaying.start), "seconds");
      this.emberFlowplayer.setLiveProgrammeTimeLeft(toTheEnd);
      this.set("timeLeft", toTheEnd);

      if (this.ready) {
        this.rangeSlider.noUiSlider.set(this.timeLeft);
      }
      yield timeout(1000);
    }
  }).on("didInsertElement")
});
