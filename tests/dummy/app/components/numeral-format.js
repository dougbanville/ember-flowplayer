import Component from "@ember/component";
import layout from "../templates/components/numeral-format";
import numeral from "numeral";

export default Component.extend({
  layout,

  formatted: null,

  tagName: "span",

  didReceiveAttrs() {
    //return numeral(this.duration).format("00:00:00");
    this.set("formatted", numeral(this.duration).format("00:00:00"));
  }
});
