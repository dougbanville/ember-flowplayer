import { helper } from "@ember/component/helper";
//there must be a better way to do this
export function formatDuration(params /*, hash*/) {
  function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }
  //return params;
  if (!params[0]) {
    return;
  }
  let time = params[0];

  let newDuration = secondsToTime(time);

  let hours = newDuration["h"];
  let minutes = newDuration["m"];
  let seconds = newDuration["s"];
  let formattedTime = ``;

  if (minutes < 1) {
    minutes = "";
  }

  if (time < 60) {
    formattedTime = `${seconds} secs`;
  }
  if (time > 60 && time < 600) {
    if (minutes === 1) {
      formattedTime = `${minutes} min`;
    } else {
      formattedTime = `${minutes} mins`;
    }
  }

  if (time > 600 && time < 3600) {
    formattedTime = `${minutes} mins`;
  }

  if (time >= 3600) {
    //
    if (minutes < 10) {
      minutes = "";
    }
    if (hours === 1) {
      formattedTime = `${hours} HR${minutes}`;
    } else {
      formattedTime = `${hours}HRS${minutes}`;
    }
  }
  return `${formattedTime}`;
}

export default helper(formatDuration);
