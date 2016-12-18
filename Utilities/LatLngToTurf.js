import turf from '@turf/turf'
var LatLngToTurf = function(geoLatLng){

    var cartLatLng = []

    if ( Array.isArray(geoLatLng) ){

        for( var key in geoLatLng ){
            cartLatLng.push( [geoLatLng[key].latitude, geoLatLng[key].longitude] )
        }

        cartLatLng.push( [geoLatLng[0].latitude, geoLatLng[0].longitude] )
        return turf.polygon( [cartLatLng] )

    } else {
        return turf.point( [geoLatLng.latitude,geoLatLng.longitude] )
    }
}

module.exports = LatLngToTurf
