import Component from "@ember/component";
import layout from "../templates/components/rte-hls-player";
import Hls from "hls.js";

export default Component.extend({
  layout,

  didInsertElement() {
    var rteAudio = document.getElementById("rteAudio");
    if (Hls.isSupported()) {
      var hls = new Hls();
      // bind them together
      hls.attachMedia(rteAudio);
      // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
      hls.on(Hls.Events.MEDIA_ATTACHED, function() {
        console.log("video and hls.js are now bound together !");
      });
    }
  }
});
