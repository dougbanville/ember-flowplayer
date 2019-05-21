import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import fetchJsonp from "fetch-jsonp";

export default Route.extend({
  emberFlowplayer: service(),
  rteHlsAudio: service(),

  beforeModel() {
    if (this.rteHlsAudio.playerState === "idle") {
      this.rteHlsAudio.setReady(false);
    }
  },
  model() {
    let url = `https://feeds.rasset.ie/rtelistings/cal/9/delta/1557254220/`;

    return fetchJsonp(url, {
      jsonpCallbackFunction: "html5player"
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        json[0].title = json[0].fields.progname;
        json[0].start = json[0].fields.progdate;
        json[0].duration = json[0].fields.duration / 1000;
        json[0].liveStream = "https://cdn.rasset.ie/hls-radio/ie2fm/playlist.m3u8";
        if (this.rteHlsAudio.playerState === "idle") {
          this.emberFlowplayer.setNowPlaying(json[0]);
          this.emberFlowplayer.setReady();

          this.rteHlsAudio.setReady(true);
        }
        //this.rteHlsAudio.isReady(false);
        return json[0];
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  },

  afterModel() {},
  actions: {
    reloadRoute() {
      this.refresh();
    }
  }
});