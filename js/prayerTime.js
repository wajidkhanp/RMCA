//window.addEventListener('load', readTextFile, false);

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("files/prayertime.json", function(text){
    var data = JSON.parse(text); //parse JSON

   document.getElementById('fazar').innerHTML = data.fazar;

   document.getElementById('zohar').innerHTML = data.zohar;

   document.getElementById('asar').innerHTML = data.asar;

   document.getElementById('magrib').innerHTML = data.magrib;

   document.getElementById('isha').innerHTML = data.isha;

});


