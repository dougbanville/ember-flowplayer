import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import fetchJsonp from "fetch-jsonp";

export default Route.extend({
  emberFlowplayer: service(),

  beforeModel() {
    this.emberFlowplayer.setLive(1);
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
        this.emberFlowplayer.setNowPlaying(json[0]);
        return json[0];
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }
});
