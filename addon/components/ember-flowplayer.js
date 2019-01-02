import Component from '@ember/component';
import layout from '../templates/components/ember-flowplayer';
import { inject as service } from '@ember/service';
import { or, readOnly, equal, reads, alias } from '@ember/object/computed';

export default Component.extend({
  layout,

  emberFlowplayer: service(),

  source: "https://cdn.rte.ie/live/ieradio1/playlist.m3u8",

  type: "application/x-mpegurl",

  live: true,

  didInsertElement(){
    //alert("YO")


    let audio = [
      // native HLS support accepts icecast source
      { type: this.get("type"),
        src: this.get("source")}
    ];
    let container = document.getElementById("ember-flowplayer");


    let fp = flowplayer(container, {
      live: this.get("live"),
      splash: true,
      audioOnly: true,
      clip: {
        sources: audio
      }
    }).on("ready error", function (e) {

    }).on("progress.android", function (e) {
      // *if* Android plays it, it botches up duration initially, overwrite
    }).on("resume", _=>{
      this.get("emberFlowplayer").setStatus("playing");
    }).on("pause",_=>{
      //this.get("emberFlowplayer").setStatus("paused");
    }).on("progress",(e,api)=>{
      console.log(api.video.time);
    })

    this.get("emberFlowplayer").setPlayer(fp);



  }
});
