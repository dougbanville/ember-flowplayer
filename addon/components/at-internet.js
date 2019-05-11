import Component from "@ember/component";
import layout from "../templates/components/at-internet";
import { inject as service } from "@ember/service";
/*
https://developers.atinternet-solutions.com/javascript-en/content-javascript-en/rich-media-javascript-en/#tagging-examples_4
*/
function atInstance() {
  this.clips = [];
  this.prerolls = [];
  this.currentClip = {};
}

export default Component.extend({
  layout,

  atInternet: service(),

  init() {
    this._super(...arguments);
    var ati_config = { site: 592983 },
      ati_context = {};

    //Getting the Device ID pasased as a query string
    var atiuserid = `testing`; //bosco.url.getQueryString("atiuserid");

    if (atiuserid) {
      ati_config.ClientSideUserId = {
        clientSideMode: "required",
        userIdCookieDuration: 397,
        userIdExpirationMode: "fixed"
      };

      ati_context = {
        userIdentifier: atiuserid
      };
    }
    this.set("ati_config", ati_config);
    let tag = new ATInternet.Tracker.Tag();
    this.atInternet.setTag(tag);
    //let ati = new atInstance();
    console.log(
      "%c @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
      "background: #6842f4; color: #6842f4"
    );
    //console.log (tag);
    console.log("ATInternet Initialized");
    console.log(ati_config);
    console.log(ati_context);
  }
});
