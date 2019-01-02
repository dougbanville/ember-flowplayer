import Component from '@ember/component';
import layout from '../templates/components/ember-flowplayer';
import {flowplayer} from 'flowplayer';

export default Component.extend({
  layout,

  didInsertElement(){
    console.log("hi there shit for brains");
    //alert("YO")
    let icecastSources = [
      // native HLS support accepts icecast source
      { type: "audio/x-mpegurl", engine: "html5",
        src: "http://live-aacplus-64.kexp.org/kexp64.aac" },
      { type: "audio/mp4; codecs=mp4a.40.5",
        src: "http://live-aacplus-64.kexp.org/kexp64.aac" },
      { type: "video/flash",
        src: "http://live-aacplus-64.kexp.org/kexp64.aac?type=.flv" }
    ];
    console.log(icecastSources);
    let container = document.getElementById("ember-flowplayer");
    flowplayer(container, {
      live: true,
      splash: true,
      audioOnly: true,
      clip: {
        sources: icecastSources
      }
    })

  }
});
