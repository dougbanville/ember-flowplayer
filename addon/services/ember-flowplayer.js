import Service from "@ember/service";
import emberFlowplayer from "../components/ember-flowplayer";
import moment from "moment";

export default Service.extend({
  status: "idle",

  player: null,

  currentTime: 0,

  changeSrc: false,
  //Set this when all the info is ready ie afterModel
  setReady() {
    this.set("ready", true);
  },

  setLive(live) {
    console.log(live);
    this.set("audioId", live);
    if (live > 100) {
      this.set("isLive", false);
    } else {
      this.set("isLive", true);
    }
  },

  setLiveProgrammeTimeLeft(toTheEnd) {
    let time = parseInt(toTheEnd, 10);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - hours * 3600) / 60);
    var seconds = time - hours * 3600 - minutes * 60;
    let humanTime = `${minutes} minutes`;
    if (seconds < 60 && minutes < 1) {
      humanTime = `Started ${seconds} seconds`;
    }
    if (seconds === 60) {
      humanTime`Started ${minutes} minute`;
    }
    if (seconds > 60 && seconds < 3600) {
      humanTime = `${minutes} minutes`;
    }
    if (hours === 1) {
      humanTime = `${hours} hour ${minutes} minutes`;
    }
    if (hours > 1) {
      humanTime = `${hours} hours ${minutes} minutes`;
    }
    this.set("liveProgrammeTimeLeft", `${humanTime}`);
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
