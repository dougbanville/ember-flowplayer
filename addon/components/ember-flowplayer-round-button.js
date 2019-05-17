import Component from "@ember/component";
import layout from "../templates/components/ember-flowplayer-round-button";
import { inject as service } from "@ember/service";

export default Component.extend({
  emberFlowplayer: service(),

  layout,

  tagName: "button",

  classNames: ["circular_button", "button", "mobile_list_button"]
});
