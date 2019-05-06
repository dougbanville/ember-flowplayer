import { helper } from '@ember/component/helper';

export function formatDuration(params/*, hash*/) {
  //return params;
  let time = params[0];
  if(isNaN(time)){
    time = 0;
  }
  let duration = time * 1000;

  /*if(isNaN(duration) || duration < 0.01){
    return 0.00;
  }*/

  var minutes = Math.floor(duration / 60000);
  var seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

  }

export default helper(formatDuration);