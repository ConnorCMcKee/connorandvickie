/*
	Title:	Maps.js
	Author: Connor C. McKee
	Date:	03-23-2015
    
    NOTE:   This title is a misnomer; this file contains all scripts pertaining to specific page CONTENT (not layout/behaviour)
*/


// Embedded Facebook Video
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


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


// Adds current year to tags
var currentYear = new Date();
$(".currentYear").html( currentYear.getFullYear() );