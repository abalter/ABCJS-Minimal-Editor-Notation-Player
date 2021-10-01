console.log("in script3.js")

var tunes_template = $('#tune-and-player').html();
// console.log(tunes_template);

function rowsToJSON(cols, rows)
{
  let json_data = [];
  let json_element = {};
  let num_fields = cols.length;
  // console.log("num rows:", rows.length);

  for (row of rows)
  {
    // console.log("row:", row);

    json_element = {};
    for (i=0; i<num_fields; i++)
    {
      let colname = cols[i];
      // console.log('colname:', colname);

      // console.log("i: ", i, "data", row[i]);

      json_element[colname] = row[i];
    }

    // console.log("json element:", json_element);

    json_data.push(json_element);

  }

  return(json_data);
}

function renderABCJS(setting_id) 
{
  console.log("renderABCJS");

  textarea_id = `sid-${setting_id}-abc`;
  canvas_id = `sid-${setting_id}-paper`;
  warnings_id = `sid-${setting_id}-warnings`;
  audio_id = `#sid-${setting_id}-audio`
  audio_id = "#sid-" + setting_id + "-audio";
  console.log(audio_id);
  
  console.log("textarea:", textarea_id, "canvas:", canvas_id, "warnings:", warnings_id, "audio:", audio_id);

  abcjsEditor = new ABCJS.Editor(textarea_id, {
    canvas_id: canvas_id,
    warnings_id: warnings_id,
    synth: {
      el: audio_id,
      options: {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      },
    },
    abcjsParams: {
      add_classes: true,
      clickListener: clickListener,
    },
    selectionChangeCallback: selectionChangeCallback,
  });
}

function clickListener(
  abcElem,
  tuneNumber,
  classes,
  analysis,
  drag,
  mouseEvent
) 
{
  console.log("clickListener");

  var lastClicked = abcElem.midiPitches;
  if (!lastClicked) return;

  ABCJS.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches,
      abcjsEditor.millisecondsPerMeasure()
    )
    .then(function (response) {
      console.log('note played');
    })
    .catch(function (error) {
      console.log('error playing note', error);
    });
}

function selectionChangeCallback(start, end) 
{
  console.log("selectionChangeCallback");

  if (abcjsEditor) {
    var el = abcjsEditor.tunes[0].getElementFromChar(start);
    console.log(el);
  }
}

$('#search').on('click', function()
{

  $('#tunes_and_player').empty();

  var tune_name = $('#tunename').val();
  var tune_mode = $('#tunemode').val();
  var tune_type = $('#tunetype').val();

  console.log("name:", tune_name, "mode:", tune_mode, "type:", tune_type);

  sql = `select+*+from+tunes+where+name+like+%22%25${tune_name}%25%22+and+mode+like+%22%25${tune_mode}%25%22+and+type+like+%22%25${tune_type}%25%22`
  sql = `select+*+from+tunes+where+name+like+"%${tune_name}%"+and+mode+like+"${tune_mode}"+and+type+like+"${tune_type}"`
  
  encoded_sql = encodeURI(sql);
  console.log("raw sql", sql);
  console.log("encoded sql: ", encoded_sql);

  query_url = "https://thesession.vercel.app/thesession.json?sql=" + encoded_sql
  console.log(query_url);

  $.get(
    query_url, 
    function(data) 
    { 
      let all_results = JSON.parse(data);
      // console.log(all_results);
      // console.log("columns:", all_results.columns);
      // console.log("rows:", all_results.rows);
      
      tunes_data = rowsToJSON(all_results.columns, all_results.rows);
      // console.log("tunes data", tunes_data);
      
      let results_text = JSON.stringify(tunes_data, null, 2);
      
      for (tune of tunes_data)
      {

        let setting_id = tune.setting_id;
        var tunes_html = Mustache.render(tunes_template, tune);
        console.log(tunes_html);
        
        $('#tunes_and_player').append(tunes_html);

        // console.log("setting_id:", setting_id);
        // console.log("calling renderABCJS");
        renderABCJS(setting_id);
      }
    }, 
    'text'
  );

});

var tune_fields = 
[
	"tune_id", 
  "setting_id", 
  "name", 
  "type",
  "meter", 
  "mode", 
  "abc", 
  "date", 
  "username"
];


var str = "https://thesession.vercel.app/thesession?sql=select+*+from+tunes+where+name+like+%22%25wise+maid%25%22"
           https://thesession.vercel.app/thesession?sql=select+*+from+tunes+where+name+like+%22%25wise+maid%25%22
 


// https://thesession.vercel.app/thesession.json?sql=select+*+from+tunes+where+name+like+%22%25wise+maid%25%22

// https://thesession.vercel.app/thesession?sql=select+*+from+tunes+where+name+like+%22%25wise+maid%25%22]]

// https://thesession.vercel.app/thesession.json?sql=select+*+from+tunes+where+name+like+%22%25wise+maid%25%22
// https://thesession.vercel.app/thesession.json?sql=select+*+from+tunes+where+name+like+%3Asearch%0D%0A&search=Wise+Maid%2C+The

var abcjsEditor;

function createABC(setting_id) {
  textarea_id = `${setting_id}-abc`;
  canvas_id = `${setting_id}-paper`;
  warnings_id = `${setting_id}-warnings`;
  audio_id = `${setting_id}-audio`

  console.log("textarea:", textarea_id, "canvas:", canvas_id, "warnings:", warnings_id, "audio:", audio_id);

  abcjsEditor = new ABCJS.Editor(textarea_id, {
    canvas_id: canvas_id,
    warnings_id: warnings_id,
    synth: {
      el: audio_id,
      options: {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      },
    },
    abcjsParams: {
      add_classes: true,
      clickListener: clickListener,
    },
    selectionChangeCallback: selectionChangeCallback,
  });
};

function clickListener(
  abcElem,
  tuneNumber,
  classes,
  analysis,
  drag,
  mouseEvent
) {
  var lastClicked = abcElem.midiPitches;
  if (!lastClicked) return;

  ABCJS.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches,
      abcjsEditor.millisecondsPerMeasure()
    )
    .then(function (response) {
      console.log('note played');
    })
    .catch(function (error) {
      console.log('error playing note', error);
    });
}

function selectionChangeCallback(start, end) {
  if (abcjsEditor) {
    var el = abcjsEditor.tunes[0].getElementFromChar(start);
    console.log(el);
  }
}