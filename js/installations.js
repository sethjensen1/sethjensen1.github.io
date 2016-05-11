var map = L.map( $('#map > #container').get(0) ).setView([30, -10], 2);

L.tileLayer('https://otile{s}-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    minZoom: 2,
    maxZoom: 18,
    subdomains: '1234',
}).addTo(map);

//var installation_data = _.map($('.clients div'), function(div) {
    //return {
        //latitude: $(div).attr('data-latitude'),
        //longitude: $(div).attr('data-longitude'),
        //title: $(div).find('.title').text(),
        //place: $(div).find('.location').text()
    //}
//});

var installations = [
    {
        latitude: '52.516667',
        longitude: '13.383333',
        title: 'Google',
        place: 'Berlin, Germany'
    },
    {
        latitude: '40.014986',
        longitude: '-105.270546',
        title: 'Google',
        place: 'Boulder, Colorado'
    },
    {
        latitude: '50.850340',
        longitude: '4.351710',
        title: 'Google',
        place: 'Brussels, Belgium'
    },
    {
        latitude: '53.349805',
        longitude: '-6.260310',
        title: 'Google',
        place: 'Dublin, Ireland'
    },
    {
        latitude: '53.551085',
        longitude: '9.993682',
        title: 'Google',
        place: 'Hamburg, Germany'
    },
    {
        latitude: '34.05',
        longitude: '-118.25',
        title: 'Google',
        place: 'Los Angeles, California'
    },
    {
        latitude: '19.432608',
        longitude: '-99.133208',
        title: 'Google',
        place: 'Mexico City, Mexico'
    },
    {
        latitude: '55.755826',
        longitude: '37.617300',
        title: 'Google',
        place: 'Moscow, Russia'
    },
    {
        latitude: '37.389444',
        longitude: '-122.081944',
        title: 'Google',
        place: 'Mountain View, California'
    },
    {
        latitude: '40.7127',
        longitude: '-74.0059',
        title: 'Google',
        place: 'New York City'
    },
    {
        latitude: '32.085300',
        longitude: '34.781768',
        title: 'Google',
        place: 'Tel Aviv, Israel'
    },
    {
        latitude: '35.709026',
        longitude: '139.731992',
        title: 'Google',
        place: 'Tokyo, Japan'
    },
    {
        latitude: '43.653226',
        longitude: '-79.383184',
        title: 'Google',
        place: 'Toronto, Canada'
    },
    {
        latitude: '38.904722',
        longitude: '-77.016389',
        title: 'Google',
        place: 'Washington, D.C.'
    },
    {
        latitude: '47.376887',
        longitude: '8.541694',
        title: 'Google',
        place: 'Zürich, Switzerland'
    }
];

var locations = _.groupBy(installations, 'place');

console.log(locations);

var markers = _.map(locations, function(members, title) {
    return {
        title: title,
        latitude: members[0].latitude,
        longitude: members[0].longitude,
        installations: members
    }
});

_.each(markers, function(i, j) {
    if (i.latitude && i.longitude) {
        var marker = L.marker([i.latitude, i.longitude], { title: i.title }).addTo(map);

        var installations = i.installations.sort(function (a, b) {
            var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        content = '';

        _.each(installations, function(i, j) {
            content += i.title + '<br/>'
        });

        marker.on('click', function(e) {
            map.panTo(marker.getLatLng());
        });

        marker.bindPopup(content + '<p><b>' + i.installations[0].place + '</b></p>');
    }
});
