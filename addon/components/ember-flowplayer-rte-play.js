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
      //console.log(model.showid);
      let url = `https://feeds.rasset.ie/rteavgen/getplaylist/?format=jsonp&id=${
        model.showid
      }`;
      fetchJsonp(url, {
        jsonpCallbackFunction: "html5player"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          //console.dir(json.shows[0]["media:group"][0]);
          let hlsUrl =
            json.shows[0]["media:group"][0].hls_server +
            json.shows[0]["media:group"][0].hls_url;
          this.set("hlsUrl", hlsUrl);
          this.emberFlowplayer.change(true);
          let audio = [{ type: this.type, src: this.hlsUrl }];
          console.log * `live = ${this.id}`;
          this.emberFlowplayer.setLive(this.id);
          this.emberFlowplayer.player.load({
            sources: audio
          });
        })
        .catch(function(ex) {
          console.log(ex);
          alert("Could nopt find that audio");
        });
    }
  }
});
