function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

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

var filter = document.getElementById('filter');
var filter_no = document.getElementById('filter_no');
addOptions(filter);
var filter2 = document.getElementById('filter2');
var filter_no2 = document.getElementById('filter_no2');
addOptions(filter2);
var filter3 = document.getElementById('filter3');
var filter_no3 = document.getElementById('filter_no3');
addOptions(filter3);

function addOptions(select) {
    for (const [key, value] of Object.entries(dict)) {
        var opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = value;
        select.appendChild(opt);
    }
}

var list = {};

//loadJSON(function (response) {
//    var data = JSON.parse(response);
    var data = JSON.parse('[{"asteroid":"terra","seed":"SNDST-A-16001-0","list":[{"id":"hq","x":128,"y":189},{"id":"aetn","x":84,"y":111},{"id":"aetn","x":129,"y":327},{"id":"aetn","x":220,"y":169},{"id":"steam","x":188,"y":156},{"id":"methane","x":145,"y":128},{"id":"steam","x":72,"y":91},{"id":"methane","x":119,"y":127},{"id":"salt_water","x":135,"y":66},{"id":"oil_reservoir","x":159,"y":43},{"id":"oil_reservoir","x":144,"y":40},{"id":"oil_reservoir","x":209,"y":52},{"id":"vacillator","x":160,"y":149},{"id":"vacillator","x":105,"y":230},{"id":"vacillator","x":203,"y":122},{"id":"vacillator","x":223,"y":197},{"id":"vacillator","x":45,"y":40},{"id":"hot_co2","x":108,"y":47},{"id":"hot_hydrogen","x":191,"y":213},{"id":"hot_water","x":209,"y":307},{"id":"oil_drip","x":229,"y":59},{"id":"slush_water","x":127,"y":259},{"id":"hot_steam","x":182,"y":198},{"id":"methane","x":222,"y":79},{"id":"hot_co2","x":156,"y":89},{"id":"slush_water","x":22,"y":163},{"id":"hot_water","x":124,"y":237},{"id":"hot_po2","x":154,"y":74},{"id":"big_volcano","x":201,"y":40}]}]');
    var t = document.getElementById('list');
    for (var i = 0; i < data.length; i++) {
        var row = t.insertRow();
        row.id = data[i].seed;
        var cell = row.insertCell();
        var left = '<div class="ant-col col-left"><div><img src="/ONISeeds/images/sndst-a.png"><p>' + data[i].seed + '</p></div></div>';
        var counts = {};
        for (const num of data[i].list)
            if (num.id != 'hq')
                counts[num.id] = counts[num.id] ? counts[num.id] + 1 : 1;
        var values = '';
        for (const [key, value] of Object.entries(counts))
            if (key != 'aetn' && key != 'vacillator'&& key != 'oil_reservoir') 
            values += addValue(key, value);
            values += '<div class="ant-divider"></div>';
        for (const [key, value] of Object.entries(counts))
            if (key == 'aetn' || key == 'vacillator'|| key == 'oil_reservoir') 
            values += addValue(key, value);
        var right = '<div class="ant-col col-right">' + values + '</div>';
        cell.innerHTML = '<div class="ant-card"><div class="ant-card-body"><div class="ant-row-flex">' + left + right + '</div></div></div>';
        list[data[i].seed] = counts;
    }
//});

function addValue(key, value) {
    return '<div class="entity-chip"><div class="entity-chip-img-container"><img class="entity-chip-img" src="/ONISeeds/images/' + key + '.png"></div>' +
        '<p style="margin: 0px;">'+ dict[key] + '</p><div class="entity-chip-count-container green"><h3 style="margin: 0px;">' + value + '</h3></div></div>';
}

function filterSet() {
    for (const [key, value] of Object.entries(list)) {
        var q = value[filter.value];
        var isTrue = !q || q >= filter_no.value;
        q = value[filter2.value];
        isTrue = isTrue && (!q || q >= filter_no2.value);
        q = value[filter3.value];
        isTrue = isTrue && (!q || q >= filter_no3.value);
        if (isTrue) {
            document.getElementById(key).style.display = 'block';
        } else {
            document.getElementById(key).style.display = 'none';
        }
    }
}