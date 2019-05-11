import Service from "@ember/service";
import emberFlowplayer from "../components/ember-flowplayer";

export default Service.extend({
  status: "idle",

  player: null,

  currentTime: 0,

  changeSrc: false,

  setLive(live) {
    console.log(`Setting live to ${live}`);
    this.set("audioId", live);
    if (live > 100) {
      this.set("isLive", false);
    } else {
      this.set("isLive", true);
    }
  },

  setPlayer(fp) {
    this.set("player", fp);
  },

  setStatus(status) {
    this.set("status", status);
    if (status === "playing") {
      this.set("isPlaying", true);
    } else {
      this.set("isPlaying", false);
    }
  },
  setVolume(vol) {
    flowplayer.volume(0.5);
  },
  setTime(time) {
    this.set("currentTime", time);
  },
  setDuration(duration) {
    this.set("duration", duration);
  },
  setSliderState(sliding) {
    this.set("sliding", sliding);
  },
  change(s) {
    this.set("changeSrc", s);
  },

  setNowPlaying(model) {
    this.set("nowPlaying", model);
  },

  getClipEventData: (avItem, action) => {
    var channel = avItem.channel ? avItem.channel : "",
      playlist_name = this.getPlayListName(avItem),
      programme = programme ? avItem.programme : "",
      mediaType = avItem.type,
      theme3 = "",
      videoLabel = "",
      published = avItem.published,
      pub_date = "";
    published = published.match("[0-9]{4}([-/ .])[0-9]{2}[-/ .][0-9]{2}");

    if (published) pub_date = published[0];

    if (mediaType == "audio") {
      theme3 = channel;
    } else {
      theme3 = avItem.provider;
    }

    videoLabel = avItem.id;
    let clipEventData = {
      action: action,
      mediaLabel: videoLabel,
      mediaTheme1: cleanTitles(playlist_name),
      mediaTheme2: pub_date,
      mediaTheme3: theme3, //WE NEED TO ADD RADIO CHANELS HERE
      playerId: "1"
    };

    //return clipEventData;

    tag.richMedia.send(clipEventData);
  }
});
