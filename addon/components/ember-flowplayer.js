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

  live: 0,

  isBuffering: false,

  customClass: "radio1",

  isPlaying: false,

  muted: false,

  errorCodes: function() {
    let codes = {
      1: "Loading Aborted",
      2: "Network error",
      3: "Audio not properly encoded",
      4: "file not found",
      5: "Unsupported video",
      6: "Skin not found",
      7: "SWF file not found",
      8: "Subtitles not found",
      9: "Invalid RTMP URL",
      10: "Unsupported video format"
    };
    return codes;
  },

  init() {
    this._super(...arguments);
    this.set("keyboardActivated", true);
  },

  keyboardToggle: on(keyDown("Space"), function() {
    this.get("emberFlowplayer").player.toggle();
  }),

  keyboardSeekForward: on(
    keyDown("ArrowRight"),
    keyDown("ArrowUp"),
    function() {
      this.emberFlowplayer.player.seek(true);
    }
  ),

  keyboardSeekBack: on(keyDown("ArrowLeft"), keyDown("ArrowDown"), function() {
    this.emberFlowplayer.player.seek(false);
  }),

  keyboardMute: on(keyUp("KeyM"), function() {
    this.toggleProperty("muted");
    this.emberFlowplayer.player.mute(this.muted);
  }),

  didInsertElement() {
    //alert("YO")

    let audio = [
      // native HLS support accepts icecast source
      { type: this.get("type"), src: this.get("source") }
    ];
    this.set("audio", audio);

    let container = document.getElementById("ember-flowplayer");

    //progress.classList.add("mystyle");

    let fp = flowplayer(container, {
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
      .on("resume", () => {
        this.get("emberFlowplayer").setStatus("playing");
      })
      .on("pause", () => {
        this.get("emberFlowplayer").setStatus("paused");
      })
      .on("progress", (e, api) => {
        if (!this.emberFlowplayer.sliding) {
          this.get("emberFlowplayer").setTime(api.video.time);
        }
      })
      .on("ready", (e, api) => {
        this.emberFlowplayer.change(false);
        this.get("emberFlowplayer").setDuration(api.video.duration);
        this.set("ready", true);
        $(".fp-progress").addClass(this.get("customClass"));
      })
      .on("error", (e, api, error) => {
        this.set("error", true);
        let errorCodes = this.errorCodes();
        this.set("errorMessage", errorCodes[error.code]);
      });

    this.get("emberFlowplayer").setPlayer(fp);

    this.get("emberFlowplayer").player.load();
  },

  actions: {
    togglePlayer() {
      this.get("emberFlowplayer").player.toggle();
    },
    mute() {
      this.toggleProperty("muted");
      this.emberFlowplayer.player.mute(this.muted);
    }
  }
});
