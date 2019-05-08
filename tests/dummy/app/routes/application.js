import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import fetchJsonp from "fetch-jsonp";

export default Route.extend({
  model() {
    let url = `https://feeds.rasset.ie/rtelistings/cal/9/delta/1557254220/`;

    return fetchJsonp(url, {
      jsonpCallbackFunction: "html5player"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return json;
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }
});
