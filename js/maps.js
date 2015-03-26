// Map to St. John's
function init_map(){
    var myOptions = {
        zoom:14,
        center:new google.maps.LatLng(40.6718055,-75.49193129999998),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(40.6718055, -75.49193129999998)});
    infowindow = new google.maps.InfoWindow({
        content:"<a href='http://stjohnscoplay.com/' target='_blank'><b>St. John's Lutheran Church</b></a><br/>18 South 3rd Street<br/>18037 Coplay"
    });
    google.maps.event.addListener(marker, "click", function(){infowindow.open(map,marker);});
    infowindow.open(map,marker);

}

init_map();