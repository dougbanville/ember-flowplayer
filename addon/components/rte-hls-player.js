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
    this.rteHlsAudio.setPlayer(rteAudio);

    this.set("rteAudio", rteAudio);
    if (Hls.isSupported()) {
      //var hls = new Hls();
      this.set("hls", new Hls());
      // bind them together
      this.hls.attachMedia(rteAudio);
      // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log("video and hls.js are now bound together !");
        console.log(`setting stream to ${this.emberFlowplayer.nowPlaying.liveStream}`);
        this.hls.loadSource(this.emberFlowplayer.nowPlaying.liveStream);
        this.rteHlsAudio.player.play();
      });
    }

    this.rteHlsAudio.player.onplay = () => {
      this.rteHlsAudio.setPlayerState("playing");
    };
  },

  willDestroyElement() {
    this.hls.destroy();
  }
});
