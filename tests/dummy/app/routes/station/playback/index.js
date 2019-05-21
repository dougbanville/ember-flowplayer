import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import fetchJsonp from "fetch-jsonp";

export default Route.extend({
  model() {
    let url = `https://feeds.rasset.ie/rteavgen/chart/?&type=radio&format=jsonp`;

    return fetchJsonp(url, {
      jsonpCallbackFunction: "html5player"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json.shows;
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }
});
