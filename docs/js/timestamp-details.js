
function calcTimestamp(timestamp_type, inputMS) {
  var return_ts;
  switch(timestamp_type) {
    case "webkit":
      return_ts = ((inputMS*1000)+11644473600*1000000).toString();
      break;
    case "epoch-seconds":
      return_ts = Math.trunc(inputMS / 1000).toString();
      break;
    case "mac-hfs":
      return_ts = (Math.trunc(inputMS / 1000) + 2082844800).toString();
      break;
    case "mac-absolute-time":
      return_ts = (Math.trunc(inputMS / 1000) - 978307200).toString();
      break;
    case "datetime-ticks":
      return_ts = ((inputMS*10000)+621355968000000000).toString();
      break;
    case "epoch-hex-seconds":
      return_ts = Math.trunc(inputMS / 1000).toString(16).toUpperCase();
      break;
    case "epoch-hex-seconds-le":
      hexBE = Math.trunc(inputMS / 1000).toString(16).toUpperCase();
      var temp = hexBE.match(/../g);
      temp.reverse();
      return_ts = temp.join("");
      break;
    case "epoch-milliseconds":
      if (typeof inputMS === 'number') {
        return_ts = inputMS.toString();
      } else {
        return_ts = inputMS.getTime();
      }
      break;
    case "filetime":
      return_ts = ((inputMS*10000)+11644473600*10000000).toString();
      break;
    case "filetime-hex":
      ft_str = ((inputMS*10000)+11644473600*10000000).toString(16).toUpperCase().padStart(16, '0');
      high_half = ft_str.slice(0,8);
      low_half = ft_str.slice(8,);
      return_ts = `${high_half}:${low_half}`;
      break;
    case "filetime-hex-le":
      ft_str = ((inputMS*10000)+11644473600*10000000).toString(16).toUpperCase().padStart(16, '0');
      high_half = ft_str.slice(0,8);
      low_half = ft_str.slice(8,);
      return_ts = `${low_half}:${high_half}`;
      break;
    case "ISO-string":
      now = new Date(inputMS);
      return_ts = now.toISOString();
      break;
  }
  return return_ts
}

function headerTimestamp(timestamp_type) {
  var now = new Date()
  document.getElementById('detail-live-timestamp').innerHTML = calcTimestamp(timestamp_type, now);
  setTimeout(headerTimestamp, 85, timestamp_type)
}

function updateTimestampDetailsTable(timestamp_type, nowMS) {
      const hourMS = 3600000
      document.getElementById(`d30 ago`).innerHTML = calcTimestamp(timestamp_type, nowMS-(hourMS*24*30));
      document.getElementById(`d7 ago`).innerHTML = calcTimestamp(timestamp_type, nowMS-(hourMS*24*7));
      document.getElementById(`d1 ago`).innerHTML = calcTimestamp(timestamp_type, nowMS-(hourMS*24));
      document.getElementById(`h1 ago`).innerHTML = calcTimestamp(timestamp_type, nowMS-hourMS);
      document.getElementById(`now`).innerHTML = calcTimestamp(timestamp_type, nowMS);
      document.getElementById(`h1 future`).innerHTML = calcTimestamp(timestamp_type, nowMS+hourMS);
      document.getElementById(`d1 future`).innerHTML = calcTimestamp(timestamp_type, nowMS+(hourMS*24));
      document.getElementById(`d7 future`).innerHTML = calcTimestamp(timestamp_type, nowMS+(hourMS*24*7));
      document.getElementById(`d30 future`).innerHTML = calcTimestamp(timestamp_type, nowMS+(hourMS*24*30));

      document.getElementById(`d30 ago iso`).innerHTML = calcTimestamp("ISO-string", nowMS-(hourMS*24*30));
      document.getElementById(`d7 ago iso`).innerHTML = calcTimestamp("ISO-string", nowMS-(hourMS*24*7));
      document.getElementById(`d1 ago iso`).innerHTML = calcTimestamp("ISO-string", nowMS-(hourMS*24));
      document.getElementById(`h1 ago iso`).innerHTML = calcTimestamp("ISO-string", nowMS-hourMS);
      document.getElementById(`now iso`).innerHTML = calcTimestamp("ISO-string", nowMS);
      document.getElementById(`h1 future iso`).innerHTML = calcTimestamp("ISO-string", nowMS+hourMS);
      document.getElementById(`d1 future iso`).innerHTML = calcTimestamp("ISO-string", nowMS+(hourMS*24));
      document.getElementById(`d7 future iso`).innerHTML = calcTimestamp("ISO-string", nowMS+(hourMS*24*7));
      document.getElementById(`d30 future iso`).innerHTML = calcTimestamp("ISO-string", nowMS+(hourMS*24*30));
}

// Fractional Seconds Table functions

function writeFractionalTimestampCells(nowMS, timestamp_type, split) {
  const relativeTimes = new Map();
  relativeTimes
   .set('past', 1262304000000)
   .set('now', nowMS)
   .set('future', 1893456000000);

  for (const [tense, ms] of relativeTimes) {
    timestamp_str = calcTimestamp(timestamp_type, ms);
    document.getElementById(`${timestamp_type} ${tense} seconds`).innerHTML = timestamp_str.slice(0,split);
    document.getElementById(`${timestamp_type} ${tense} fractional`).innerHTML = timestamp_str.slice(split,);
  }
}

function setTableTimestampsFractional(nowMS) {

    document.getElementById('iso now').innerHTML = calcTimestamp('ISO-string', nowMS);

    const timestampSplits = new Map();
    timestampSplits
     .set('epoch-hex-seconds', 10)
//     .set('epoch-hex-seconds-le', 10)
     .set('epoch-seconds', 10)
     .set('epoch-milliseconds', 10)
     .set('datetime-ticks', 11)
     .set('filetime', 11)
     .set('webkit', 11);

    for (let [timestamp_type, split] of timestampSplits) {
      writeFractionalTimestampCells(nowMS, timestamp_type, split)
    }
}

