import Component from "@ember/component";
import layout from "../templates/components/ember-flowplayer-rte-play";
import fetchJsonp from "fetch-jsonp";
import { inject as service } from "@ember/service";

export default Component.extend({
  layout,

  emberFlowplayer: service(),

  type: "application/x-mpegurl",

  actions: {
    play(model) {
      if (this.audioId < 100) {
        this.send("playLive", model);
      } else {
        let url = `https://feeds.rasset.ie/rteavgen/getplaylist/?format=jsonp&id=${this.audioId}`;
        fetchJsonp(url, {
          jsonpCallbackFunction: "html5player"
        })
          .then(response => {
            return response.json();
          })
          .then(json => {
            //console.dir(json.shows[0]["media:group"][0]);
            let hlsUrl = json.shows[0]["media:group"][0].hls_server + json.shows[0]["media:group"][0].hls_url;
            this.set("hlsUrl", hlsUrl);
            this.emberFlowplayer.change(true);
            let audio = [{ type: this.type, src: this.hlsUrl }];
            this.emberFlowplayer.setLive(this.audioId);
            this.emberFlowplayer.player.load({
              sources: audio
            });
            this.emberFlowplayer.setNowPlaying(model);
          })
          .catch(function(ex) {
            alert("Could not find that audio");
          });
      }
    },
    playLive(model) {
      let url = `https://feeds.rasset.ie/livelistings/playlist/?source=rte.ie&platform=webradio&channelid=${
        this.audioId
      }`;
      fetchJsonp(url, {
        jsonpCallbackFunction: "html5player"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json[0].fullUrl);
          let hlsUrl = json[0].fullUrl;
          this.set("hlsUrl", hlsUrl);
          this.emberFlowplayer.change(true);
          let audio = [{ type: this.type, src: this.hlsUrl }];
          this.emberFlowplayer.setLive(this.audioId);
          this.emberFlowplayer.player.load({
            sources: audio
          });
          this.emberFlowplayer.setNowPlaying(model);
        })
        .catch(function(ex) {
          alert("couldn't find that live stream");
        });
    }
  }
});
