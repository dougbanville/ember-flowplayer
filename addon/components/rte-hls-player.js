import Component from "@ember/component";
import layout from "../templates/components/rte-hls-player";
import { inject as service } from "@ember/service";
import Hls from "hls.js";

export default Component.extend({
  layout,

  emberFlowplayer: service(),

  rteHlsAudio: service(),

  didInsertElement() {
    var rteAudio = document.getElementById("rteAudio");
    if (Hls.isSupported()) {
      var hls = new Hls();
      this.rteHlsAudio.setPlayer(hls);
      // bind them together
      this.rteHlsAudio.player.attachMedia(rteAudio);
      // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
      this.rteHlsAudio.player.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log("video and hls.js are now bound together !");
        this.rteHlsAudio.player.loadSource(
          this.emberFlowplayer.nowPlaying.liveStream
        );
      });
    }
  }
});
