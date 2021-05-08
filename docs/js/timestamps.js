function calcEpochMilliseconds(inputMilliseconds) {
  return inputMilliseconds.toString();
}

function calcEpochSeconds(inputMilliseconds) {
  return Math.trunc(inputMilliseconds / 1000).toString();
}

function calcWebkit(inputMilliseconds) {
  return ((inputMilliseconds*1000)+11644473600*1000000).toString();
}

function calcEpochHexSeconds(inputMilliseconds) {
  return Math.trunc(inputMilliseconds / 1000).toString(16).toUpperCase();
}

function headerTimestamp() {
  var now = new Date()
  document.getElementById('time').innerHTML = now.toISOString();

  setTimeout(headerTimestamp, 85)
}
function updateTimestamps() {
    var now = new Date(), // current date
        months = ['January', 'February', '...']; // you get the idea
        time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [now.getDate(),
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    // set the content of the element with the ID time to the formatted string
    //document.getElementById('time').innerHTML = [date, time].join(' / ');

    const nowEpochMilliseconds=Date.now();

    document.getElementById('epoch-millisecond').innerHTML = calcEpochMilliseconds(Date.now());
    document.getElementById('epoch-second').innerHTML = calcEpochSeconds(Date.now());
    document.getElementById('webkit').innerHTML = calcWebkit(Date.now());
    document.getElementById('epoch-hex').innerHTML = calcEpochHexSeconds(Date.now())

    // call this function again in this many ms
    setTimeout(updateTimestamps, 100);
}

function setTableTimestamps() {

    const now = new Date();

    oldMs = 1262304000000;
    nowMS = Date.now();
    futureMs = 1893456000000;

    document.getElementById('iso now').innerHTML = 'Now<br>' + now.toISOString();

    document.getElementById('epoch-millisecond old').innerHTML = calcEpochMilliseconds(oldMs);
    document.getElementById('epoch-second old').innerHTML = calcEpochSeconds(oldMs);
    document.getElementById('webkit old').innerHTML = calcWebkit(oldMs);
    document.getElementById('epoch-hex old').innerHTML = calcEpochHexSeconds(oldMs)

    document.getElementById('epoch-millisecond now').innerHTML = calcEpochMilliseconds(nowMS);
    document.getElementById('epoch-second now').innerHTML = calcEpochSeconds(nowMS);
    document.getElementById('webkit now').innerHTML = calcWebkit(nowMS);
    document.getElementById('epoch-hex now').innerHTML = calcEpochHexSeconds(nowMS)

    document.getElementById('epoch-millisecond future').innerHTML = calcEpochMilliseconds(futureMs);
    document.getElementById('epoch-second future').innerHTML = calcEpochSeconds(futureMs);
    document.getElementById('webkit future').innerHTML = calcWebkit(futureMs);
    document.getElementById('epoch-hex future').innerHTML = calcEpochHexSeconds(futureMs)

}


function writeTimestampCells(timestamp_str, timestamp_type, tense, split) {
    document.getElementById(`${timestamp_type} ${tense} seconds`).innerHTML = timestamp_str.slice(0,split);
    document.getElementById(`${timestamp_type} ${tense} fractional`).innerHTML = timestamp_str.slice(split,);
}

function setTableTimestampsFractional() {

    const now = new Date();

    oldMs = 1262304000000;
    nowMS = Date.now();
    futureMs = 1893456000000;

    document.getElementById('iso now').innerHTML = now.toISOString();

    writeTimestampCells(calcEpochHexSeconds(oldMs),'epoch-hex', 'past', 10);
    writeTimestampCells(calcEpochHexSeconds(nowMS),'epoch-hex', 'now', 10);
    writeTimestampCells(calcEpochHexSeconds(futureMs),'epoch-hex', 'future', 10);

    writeTimestampCells(calcWebkit(oldMs),'webkit', 'past', 12);
    writeTimestampCells(calcWebkit(nowMS),'webkit', 'now', 12);
    writeTimestampCells(calcWebkit(futureMs),'webkit', 'future', 12);

    writeTimestampCells(calcEpochSeconds(oldMs),'epoch-second', 'past', 10);
    writeTimestampCells(calcEpochSeconds(nowMS),'epoch-second', 'now', 10);
    writeTimestampCells(calcEpochSeconds(futureMs),'epoch-second', 'future', 10);

    writeTimestampCells(calcEpochMilliseconds(oldMs),'epoch-millisecond', 'past', 10);
    writeTimestampCells(calcEpochMilliseconds(nowMS),'epoch-millisecond', 'now', 10);
    writeTimestampCells(calcEpochMilliseconds(futureMs),'epoch-millisecond', 'future', 10);

}


//document.addEventListener("DOMContentLoaded", headerTimestamp());
//document.addEventListener("DOMContentLoaded", updateTimestamps());
//document.addEventListener("DOMContentLoaded", setTableTimestamps());
document.addEventListener("DOMContentLoaded", setTableTimestampsFractional());
