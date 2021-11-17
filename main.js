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