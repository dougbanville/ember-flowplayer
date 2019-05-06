import Component from "@ember/component";
import layout from "../templates/components/ember-flowplayer";
import { inject as service } from "@ember/service";
import $ from "jquery";
import { EKMixin } from "ember-keyboard";
import { keyUp, keyDown } from "ember-keyboard";
import { on } from "@ember/object/evented";

export default Component.extend(EKMixin, {
  layout,

  emberFlowplayer: service(),

  source: "https://cdn.rte.ie/live/ieradio1/playlist.m3u8",

  type: "application/x-mpegurl",

  live: false,

  isBuffering: false,

  customClass: "radio1",

  isPlaying: false,

  muted: false,

  init() {
    this._super(...arguments);
    this.set("keyboardActivated", true);
  },

  keyboardToggle: on(keyDown("Space"), function() {
    this.get("emberFlowplayer").player.toggle();
  }),

  keyboardSeekForward: on(keyDown("ArrowRight"), keyDown("ArrowUp"), function() {
    this.emberFlowplayer.player.seek(true);
  }),

  keyboardSeekBack: on(keyDown("ArrowLeft"), keyDown("ArrowDown"), function() {
    this.emberFlowplayer.player.seek(false);
  }),

  keyboardMute: on(keyUp("KeyM"), function() {
    this.toggleProperty("muted");
    this.emberFlowplayer.player.mute(this.muted);
  }),

  didInsertElement() {
    //alert("YO")

    this.$(".fp-controls").attr("style", "text-align: center");
    let audio = [
      // native HLS support accepts icecast source
      { type: this.get("type"), src: this.get("source") }
    ];
    this.set("audio", audio);

    let container = document.getElementById("ember-flowplayer");

    $(".animated").addClass("radio1");

    //progress.classList.add("mystyle");

    let fp = flowplayer(container, {
      live: this.live,
      splash: false,
      audioOnly: true,
      autoplay: false,
      clip: {
        sources: audio
      }
    })
      .on("progress.android", function(e) {
        // *if* Android plays it, it botches up duration initially, overwrite
      })
      .on("resume", _ => {
        this.get("emberFlowplayer").setStatus("playing");
      })
      .on("pause", _ => {
        this.get("emberFlowplayer").setStatus("paused");
      })
      .on("progress", (e, api) => {
        if (!this.emberFlowplayer.sliding) {
          this.get("emberFlowplayer").setTime(api.video.time);
        }
      })
      .on("ready", (e, api) => {
        this.get("emberFlowplayer").setDuration(api.video.duration);
        this.set("ready", true);
        $(".fp-progress").addClass(this.get("customClass"));
      });

    this.get("emberFlowplayer").setPlayer(fp);

    this.get("emberFlowplayer").player.load();
    return fp;
  },

  actions: {
    togglePlayer() {
      this.get("emberFlowplayer").player.toggle();
    }
  }
});
