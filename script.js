var list = {};
var data = JSON.parse('[]');
var f = 0;
var t = document.getElementById('list');
var map = document.getElementById("map");

var dict = {};
dict['aetn'] = 'Anti Entropy Thermo-Nullifier';
dict['big_volcano'] = 'Volcano';
dict['chlorine_gas'] = 'Chlorine Gas Vent';
dict['filthy_water'] = 'Polluted Water Vent';
dict['hot_co2'] = 'Carbon Dioxide Vent';
dict['hot_hydrogen'] = 'Hydrogen Vent';
dict['hot_po2'] = 'Hot Polluted Oxygen Vent';
dict['hot_steam'] = 'Steam Vent';
dict['hot_water'] = 'Water Geyser';
dict['hq'] = 'Headquarter';
dict['liquid_co2'] = 'Carbon Dioxide Geyser';
dict['liquid_sulfur'] = 'Sulfur Geyser';
dict['methane'] = 'Natural Gas Geyser';
dict['molten_aluminum'] = 'Aluminum Volcano';
dict['molten_cobalt'] = 'Cobalt Volcano';
dict['molten_copper'] = 'Copper Volcano';
dict['molten_gold'] = 'Gold Volcano';
dict['molten_iron'] = 'Iron Volcano';
dict['oil_drip'] = 'Leaky Oil Fissure';
dict['oil_reservoir'] = 'Oil Reservoir';
dict['salt_water'] = 'Salt Water Geyser';
dict['slimy_po2'] = 'Infectious Polluted Oxygen Vent';
dict['slush_salt_water'] = 'Cool Salt Slush Geyser';
dict['slush_water'] = 'Cool Slush Geyser';
dict['small_volcano'] = 'Minor Volcano';
dict['steam'] = 'Cool Steam Vent';
dict['vacillator'] = 'Neural Vacillator';

var aster = {};
aster['0'] = 'sndst-a';
aster['1'] = 'ocan-a';

addFilter();

function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
    //callback('[]');
}

function loadList() {
    t.innerHTML = '';
    var version = document.getElementById("version").value;
    var asteroid = document.getElementById("asteroid").value;
    if (version == 0)
        return;
    loadJSON('/ONISeeds/data/b_' + version + '/b_' + version + '_' + asteroid + '.json', parseData);
}

function parseData(response) {
    data = JSON.parse(response);
    //data = JSON.parse('[{"asteroid":"terra","seed":"SNDST-A-16001-0","list":[{"id":"hq","x":128,"y":189},{"id":"aetn","x":84,"y":111},{"id":"aetn","x":129,"y":327},{"id":"aetn","x":220,"y":169},{"id":"steam","x":188,"y":156},{"id":"methane","x":145,"y":128},{"id":"steam","x":72,"y":91},{"id":"methane","x":119,"y":127},{"id":"salt_water","x":135,"y":66},{"id":"oil_reservoir","x":159,"y":43},{"id":"oil_reservoir","x":144,"y":40},{"id":"oil_reservoir","x":209,"y":52},{"id":"vacillator","x":160,"y":149},{"id":"vacillator","x":105,"y":230},{"id":"vacillator","x":203,"y":122},{"id":"vacillator","x":223,"y":197},{"id":"vacillator","x":45,"y":40},{"id":"hot_co2","x":108,"y":47},{"id":"hot_hydrogen","x":191,"y":213},{"id":"hot_water","x":209,"y":307},{"id":"oil_drip","x":229,"y":59},{"id":"slush_water","x":127,"y":259},{"id":"hot_steam","x":182,"y":198},{"id":"methane","x":222,"y":79},{"id":"hot_co2","x":156,"y":89},{"id":"slush_water","x":22,"y":163},{"id":"hot_water","x":124,"y":237},{"id":"hot_po2","x":154,"y":74},{"id":"big_volcano","x":201,"y":40}]}]');    
    for (var i = 0; i < data.length; i++) {
        var row = t.insertRow();
        row.id = data[i].seed;
        if (i > 20)
            row.style.display = 'none';
        var cell = row.insertCell();
        var left = '<div class="col col-left"><div><img src="/ONISeeds/images/' + aster[data.asteroid] + '.png"><p>' + data[i].seed + '</p></div></div>';
        var counts = {};
        for (const num of data[i].list)
            if (num.id != 'hq')
                counts[num.id] = counts[num.id] ? counts[num.id] + 1 : 1;
        var values = '';
        for (const [key, value] of Object.entries(counts))
            if (key != 'aetn' && key != 'vacillator' && key != 'oil_reservoir')
                values += addValue(key, value);
        values += '<div class="divider"></div>';
        for (const [key, value] of Object.entries(counts))
            if (key == 'aetn' || key == 'vacillator' || key == 'oil_reservoir')
                values += addValue(key, value);
        var right = '<div class="col col-right">' + values + '</div>';
        cell.innerHTML = '<div class="card" onclick="showMap(this.parentElement.parentElement.id)"><div class="card-body"><div class="row-flex">' + left + right + '</div></div></div>';
        list[data[i].seed] = counts;
    }
}

function addValue(key, value) {
    return '<div class="entity-chip"><div class="entity-chip-img-container"><img class="entity-chip-img" src="/ONISeeds/images/' + key + '.png"></div>' +
        '<p style="margin: 0px;">' + dict[key] + '</p><div class="entity-chip-count-container green"><h3 style="margin: 0px;">' + value + '</h3></div></div>';
}

function addFilter() {
    f++;
    var div = document.createElement('div');
    div.innerHTML = '<select id="f' + f + '"></select><select id="fo' + f + '"><option value="1">at least</option><option value="2">at most</option><option value="3">exactly</option></select><input type="number" id="fn' + f + '" style="width: 100px;"></input>';
    document.getElementById('filters').appendChild(div);
    addOptions('f' + f);
}

function addOptions(id) {
    for (const [key, value] of Object.entries(dict)) {
        var opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = value;
        document.getElementById(id).appendChild(opt);
    }
}

function filterSet() {
    var i = 0;
    for (const [key, value] of Object.entries(list)) {
        var isTrue = i < 21;
        for (i = 1; i <= f; i++) {
            var val = document.getElementById('fn' + i).value;
            if (val == '')
                val = 0;
            var opt = document.getElementById('fo' + i).value;
            var q = value[document.getElementById('f' + i).value];
            if (!q)
                q = 0;

            if (opt == 1)
                isTrue = isTrue && q >= val;
            if (opt == 2)
                isTrue = isTrue && q <= val;
            if (opt == 3)
                isTrue = isTrue && q == val;
        }
        if (isTrue) {
            document.getElementById(key).style.display = 'block';
            i++;
        } else {
            document.getElementById(key).style.display = 'none';
        }
    }
}

function showMap(id) {
    map.innerHTML = '';
    var seed = data.filter(function(data) { return data.seed == id });
    for (const num of seed[0].list) {
        map.innerHTML += '<image href="/ONISeeds/images/' + num.id +
            '.png" xlink:href="/ONISeeds/images/' + num.id + '.png" ' +
            'height="10" width="10" x="' + num.x + '" y="' + (384 - num.y) + '"><title>' + dict[num.id] + '</title></image>';
    }
    map.parentElement.style.display = 'block';
}