import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import fetchJsonp from "fetch-jsonp";

export default Route.extend({
  emberFlowplayer: service(),

  model() {
    let url = `https://feeds.rasset.ie/rteavgen/getplaylist/?id=21559326&type=radio&format=jsonp&callback=html5radioplayer`;

    return fetchJsonp(url, {
      jsonpCallbackFunction: "html5player"
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        let nowPlaying = {
          id: json.shows[0].itemid,
          audioUrl:
            json.shows[0]["media:group"][0].hls_server +
            json.shows[0]["media:group"][0].hls_url,
          title: json.shows[0].title,
          duration: json.shows[0].duration / 1000,
          audioId: json.shows[0].itemid
        };
        console.log(nowPlaying.id);
        this.emberFlowplayer.setLive(nowPlaying.id);

        this.emberFlowplayer.setNowPlaying(nowPlaying);

        if (this.emberFlowplayer === "idle") {
          //this.emberFlowplayer.setNowPlaying(json[0]);
          //this.emberFlowplayer.setReady();
        }
        //this.rteHlsAudio.isReady(false);
        return nowPlaying;
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  },

  aftertModel() {
    this.emberFlowplayer.setReady();
  }
});
