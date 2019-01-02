import Service from '@ember/service';
import emberFlowplayer from '../components/ember-flowplayer';

export default Service.extend({

    status: "idle",

    player: null,

    setPlayer(fp){
        this.set("player",fp)
    },

    setStatus(status){
        this.set('status',status)
    },

    play(){
        //flowplayer.play();
    }

});
