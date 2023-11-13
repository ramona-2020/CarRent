let map;
let markersArray = [];
let polyline = null;
let distance;



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.04668546891928, lng: 26.616522206702296},
        zoom: 18.
    });

    // map onclick listener
    map.addListener('click', function (e) {
        //console.log(e);
        if (markersArray.length < 2) {
            addMarker(e.latLng);
            drawPolyline();
            calculateDistance();
        }
    });
}

// define function to add marker at given lat & lng
function addMarker(latLng) {
    let marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true
    });

    // add listener to redraw the polyline when markers position change
    marker.addListener('position_changed', function () {
        drawPolyline();
    });

    // store the marker object drawn in global array
    markersArray.push(marker);
}

// define function to draw polyline that connect markers' position
function drawPolyline() {
    let markersPositionArray = [];
    // obtain latlng of all markers on map
    markersArray.forEach(function (e) {
        markersPositionArray.push(e.getPosition());
    });

    // check if there is already polyline drawn on map
    // remove the polyline from map before we draw new one
    if (polyline !== null) {
        polyline.setMap(null);
    }

    // draw new polyline at markers' position
    polyline = new google.maps.Polyline({
        map: map,
        path: markersPositionArray,
        strokeOpacity: 0.4
    });
}

// define function to alert distance between to markers
function calculateDistance() {
    if (markersArray.length >= 2) {
        let pointOne = markersArray[0];
        let pointOneLat = pointOne.getPosition().lat();
        let pointOneLng = pointOne.getPosition().lng();

        let pointTwo = markersArray[1];
        let pointTwoLat = pointTwo.getPosition().lat();
        let pointTwoLng = pointTwo.getPosition().lng();

        // Returns the distance, in meters, between two LatLngs
        distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(pointOneLat, pointOneLng),
            new google.maps.LatLng(pointTwoLat, pointTwoLng)
        );

        console.log(`Distance = ${parseInt(distance)}`);
    }
}

window.initMap = initMap;