import Service from "@ember/service";

export default Service.extend({
  setTag(tag) {
    this.set("tag", tag);
  },
  sendTag(tag) {
    console.log(`Sending`);
    console.log(this.tag.richMedia);
    this.tag.richMedia.send(tag);
  }
});
