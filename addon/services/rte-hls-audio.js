import Service from "@ember/service";

export default Service.extend({
  setPlayer(fp) {
    console.log("setting player");
    this.set("player", fp);
  },
  setReady(ready) {
    if (ready) {
      this.set("isReady", true);
    }
  }
});
