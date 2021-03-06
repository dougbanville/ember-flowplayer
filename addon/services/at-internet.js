import Service from "@ember/service";
import { inject as service } from "@ember/service";

export default Service.extend({
  emberFlowplayer: service(),

  setTag(tag) {
    this.set("tag", tag);
  },
  sendTag(action) {
    console.log(this.emberFlowplayer.nowPlaying.duration);
    var bmode = this.emberFlowplayer.isLive;
    bmode ? (bmode = "live") : (bmode = "clip");
    alert(bmode);
    let tag = new ATInternet.Tracker.Tag();
    tag.richMedia.add({
      mediaType: "audio",
      playerId: 123,
      mediaLevel2: "mediaLevel2",
      mediaLabel: "mediaAudio",
      mediaTheme1: "mediaRock",
      isEmbedded: false,
      broadcastMode: bmode,
      refreshDuration: 5
    });
    tag.richMedia.send({
      action: action,
      playerId: 123,
      mediaLabel: "mediaAudio",
      mediaTheme1: "mediaRock"
    });
  }
});

/*
        action: "play"
        mediaLabel: 922845
        mediaTheme1: "Today with Sean ORourke|Today with Sean ORourke"
        mediaTheme2: "2019-05-17"
        mediaTheme3: "RTÉ Radio 1"
        playerId: "1"
        */
