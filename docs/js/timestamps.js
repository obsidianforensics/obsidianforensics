function calcEpochMilliseconds(inputMilliseconds) {
  return inputMilliseconds.toString();
}

function calcEpochSeconds(inputMilliseconds) {
  return Math.trunc(inputMilliseconds / 1000).toString();
}

function calcWebkit(inputMilliseconds) {
  return ((inputMilliseconds*1000)+11644473600*1000000).toString();
}

function calcFileTime(inputMilliseconds) {
  return ((inputMilliseconds*10000)+11644473600*10000000).toString();
}

function calcDateTimeTicks(inputMilliseconds) {
  return ((inputMilliseconds*10000)+621355968000000000).toString();
}

function calcEpochHexSeconds(inputMilliseconds) {
  return Math.trunc(inputMilliseconds / 1000).toString(16).toUpperCase();
}

function headerTimestamp() {
  var now = new Date()
  document.getElementById('time').innerHTML = now.toISOString();

  setTimeout(headerTimestamp, 85)
}


function writeTimestampCells(timestamp_str, timestamp_type, tense, split) {
    document.getElementById(`${timestamp_type} ${tense} seconds`).innerHTML = timestamp_str.slice(0,split);
    document.getElementById(`${timestamp_type} ${tense} fractional`).innerHTML = timestamp_str.slice(split,);
}

function setTableTimestampsFractional() {

    var splits = {
      'datetime-ticks': 11,
      'epoch-hex-seconds': 10,
//      'epoch-hex-seconds-le': 10,
      'epoch-milliseconds': 10,
      'epoch-seconds': 10,
      'filetime': 11,
      'filetime-hex': 11,
//      'filetime-hex-le': 11,
      'mac-absolute-time': 9,
      'mac-hfs': 10,
      'webkit': 11,
      };

    const now = new Date();

    oldMs = 1262304000000;
    nowMS = Date.now();
    futureMs = 1893456000000;

    document.getElementById('iso now').innerHTML = now.toISOString();

    Object.keys(splits).forEach(item => {
     writeTimestampCells(calcTimestamp(item, oldMs), item, 'past', splits[item]);
     writeTimestampCells(calcTimestamp(item, nowMS), item, 'now', splits[item]);
     writeTimestampCells(calcTimestamp(item, futureMs), item, 'future', splits[item]);
     } )

}


function updateTimestampDetailsTable(timestamp_id, nowMS) {
      document.getElementById(`${timestamp_id} past`).innerHTML = calcWebkit(nowMS-86400000);
      document.getElementById(`${timestamp_id} now`).innerHTML = calcWebkit(nowMS);
      document.getElementById(`${timestamp_id} future`).innerHTML = calcWebkit(nowMS+86400000);
}

//document.addEventListener("DOMContentLoaded", headerTimestamp());
//document.addEventListener("DOMContentLoaded", updateTimestamps());
//document.addEventListener("DOMContentLoaded", setTableTimestamps());
document.addEventListener("DOMContentLoaded", setTableTimestampsFractional());
