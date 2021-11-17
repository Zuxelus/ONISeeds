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

loadJSON(function (response) {
    var data = JSON.parse(response);
    //var data = JSON.parse('[{"asteroid": "terra","seed": "SNDST-A-16000-0",'+
    //    '"list": "steam,methane,steam,methane,salt_water,hot_co2,hot_hydrogen,hot_water,oil_drip,slush_water,hot_steam,methane,hot_co2,slush_water,hot_water,hot_po2,big_volcano"}]');
    var t = document.getElementById('list');
    for (var i = 0; i < data.length; i++) {
        var row = t.insertRow();
        var cell = row.insertCell();
        var left = '<div class="ant-col col-left"><div><img src="/ONISeeds/images/sndst-a.png"><p>' + data[i].seed + '</p></div></div>';
        var list = data[i].list.split(',').sort();
        var counts = {};
        for (const num of list) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        list = list.filter(function(item, pos) {
            return list.indexOf(item) == pos;
        });
        var values = '';
        for (var j = 0; j < list.length; j++) {
            values += '<div class="entity-chip"><div class="entity-chip-img-container"><img class="entity-chip-img" src="/ONISeeds/images/' + list[j] + '.png"></div>' +
                '<p style="margin: 0px;">'+ dict[list[j]] + '</p><div class="entity-chip-count-container green"><h3 style="margin: 0px;">' + counts[list[j]] + '</h3></div></div>';
        }
        var right = '<div class="ant-col col-right">' + values + '</div>';
        cell.innerHTML = '<div class="ant-card"><div class="ant-card-body"><div class="ant-row-flex">' + left + right + '</div></div></div>';
    }
});