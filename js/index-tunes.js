let tunes_list_path = "tunes/tune_list.txt";
let tune_selector = document.getElementById("tune-selector");

window.onload = function()
{
    console.log("windows onload");
    tune_selector.value = "cooleys"
    fetchTune("cooleys.abc");
    selectionChangeCallback();
    // Show Error When Use Fetch Method With Import Method
    fetch(tunes_list_path,  {mode: 'no-cors'})
    .then(response =>
    {
        console.log("response:", response);
        return response
    })
    .then(data => 
    {
        console.log("data:", data)
        return data.text()
    })
    .then(Normal =>
    {
        // console.log("Normal:", Normal)
        console.log("got tunelise");
        // document.getElementById("tune-list").innerHTML = Normal.split("\n").join("<br/>\n");
        
        let  tune_list = Normal.split("\n").sort();
        addTunesToSelector(tune_list);
    })
    .catch(err =>
    {
        console.log('Fetch problem show: ' + err.message);
    });
}


let abc_display = document.getElementById('abc-display');
abc_display.addEventListener('change', (event) => 
{
    console.log("event:", event);

    // get tune filename
    let tune_filename = event.target.value;
    fetchTune(tune_filename);
    selectionChangeCallback();
});

tune_selector.addEventListener('change', (event) => 
{
    console.log("event:", event);

    // get tune filename
    let tune_filename = event.target.value;
    fetchTune(tune_filename);
    selectionChangeCallback();
});


// Show Error When Use Fetch Method With Import Method
// fetch(tunes_list_path,  {mode: 'no-cors'})
//     .then(response =>
//     {
//         console.log("response:", response);
//         return response
//     })
//     .then(data => 
//     {
//         console.log("data:", data)
//         return data.text()
//     })
//     .then(Normal =>
//     {
//         // console.log("Normal:", Normal)
//         console.log("got tunelise");
//         // document.getElementById("tune-list").innerHTML = Normal.split("\n").join("<br/>\n");
        
//         let  tune_list = Normal.split("\n").sort();
//         addTunesToSelector(tune_list);
//     })
//     .catch(err =>
//     {
//         console.log('Fetch problem show: ' + err.message);
//     });



function addTunesToSelector(tune_list)
{
    tune_list.forEach( tune_name =>
    {
        let tune_option = new Option(tune_name, tune_name + ".abc");
        tune_selector.add(tune_option);
        // tune_selector.appendChild(tune_option);
    });
}


// function fetchTune(tune_filename)
// {
//     console.log("fetchTune:", tune_filename);

//     // get tune filename
//     // let tune_filename = event.target.value;
//     // tune_filename = tune_selector.nodeValue;

//     console.log("tune filename:", tune_filename);

//     // get tune text
//     fetch('tunes/' + tune_filename,  {mode: 'no-cors'})
//     .then( response => {
//         console.log("response:", response);
//         return response
//     })
//     .then(  data => {
//         console.log("data:", data)
//         return data.text()
//     })
//     .then(Normal => {
//         // console.log("Normal:", Normal)
//         console.log("got tune text");
//         let tune_textarea = document.getElementById("abc-display");
//         // console.log("tune textarea:", tune_textarea);
//         tune_textarea.value = Normal;
//         tune_textarea.style.height = "auto";
//         tune_textarea.style.height = (tune_textarea.scrollHeight) + "px";
//         updateTune();
//     })
//     .catch( err => {
//         console.log('Fetch problem show: ' + err.message);
//     });
// }



// fetch('http://some-site.com/cors-enabled/some.json', {mode: 'cors'})
//   .then(function(response) {
//     return response.text();
//   })
//   .then(function(text) {
//     console.log('Request successful', text);
//   })
//   .catch(function(error) {
//     log('Request failed', error)
//   });


//https://developers.google.com/web/updates/2015/03/introduction-to-fetch


//https://dev.to/andykao1213/how-to-read-a-local-file-with-the-browser-using-fetch-api-2cjn
// fetch('../tunes/tune_list.txt', {mode: 'no-cors'})
//   .then(response => response.text())
//   .then(data=> console.log(data))
//   .catch(error => console.error(error));




