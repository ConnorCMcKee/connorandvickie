/*
	Title:	Timers.js
	Author: Connor C. McKee
	Date:	03-23-2015
*/

$( "#bio" ).css( "height", $( "#bio div" ).height() + 88 );
$( "#bio" ).css( "padding-top", $( "#bio div" ).height() + 10 );

// Sets timers to display at the bottom of the screen
function setTimerHeight(){
    var timersHeight = $("#timers").height();
    var pageHeight = window.innerHeight;
    var timersMargin = pageHeight - ( timersHeight + $("#navigation").height() + 28 );
    
    // Catch to make sure the fully extend #bio will fit on the page
    if ( timersMargin < 0 ) {
        timersMargin = 0;
    }
    
    $("#timers").css( "margin-top", timersMargin );
}

setTimerHeight();
$( window ).resize( setTimerHeight );

// Adds #bioButton functionality
var collapsed = true;
$( "#bioButton" ).click(function(event){
    if ( collapsed ) {
        $( "#bio" ).css( "padding-top", 0 );
        collapsed = false;
    } else {
        $( "#bio" ).css( "padding-top", $( "#bio div" ).height() + 10 );
        collapsed = true;
    }
});

//Adds #aboutButton functionality
$( "#aboutButton" ).click(function(event){
    if ( collapsed ) {
        $( "#bio" ).css( "padding-top", 0 );
        collapsed = false;
    }
});


// Initialized date and div info for timers
var metDate = new Date( 2013, 10, 25, 18, 30, 00 );
var metTimer = $("#met");

var coupleDate = new Date( 2013, 11, 26, 17, 58, 00 );
var coupleTimer = $("#couple");

var engagedDate = new Date( 2014, 10, 22, 15, 54, 00 );
var engagedTimer = $("#engaged");

var weddingDate = new Date( 2016, 0, 30, 13, 00, 00 );
var weddingTimer = $("#wedding");


// 2nd attempt at updateTimer. Assumes all months are 30 days, but otherwise effective.
function updateTimer( currentDate, sectionDate, div ){
	
    // Determine countup or countdown
	if ( currentDate > sectionDate ) {
		var year = currentDate.getFullYear() - sectionDate.getFullYear();
		var month =  currentDate.getMonth() - sectionDate.getMonth();
		var day =  currentDate.getDate() - sectionDate.getDate();
		var hour =  currentDate.getHours() - sectionDate.getHours();
		var minute =  currentDate.getMinutes() - sectionDate.getMinutes();
		var second =  currentDate.getSeconds() - sectionDate.getSeconds();
	} else {
		var year = sectionDate.getFullYear() - currentDate.getFullYear();
		var month =  sectionDate.getMonth() - currentDate.getMonth();
		var day =  sectionDate.getDate() - currentDate.getDate();
		var hour =  sectionDate.getHours() - currentDate.getHours();
		var minute =  sectionDate.getMinutes() - currentDate.getMinutes();
		var second =  sectionDate.getSeconds() - currentDate.getSeconds();
	}
	
    // Fix Negatives
	if ( second < 0 ){
		second += 60;
		minute -= 1;
	}
	
	if ( minute < 0 ){
		minute += 60;
		hour -= 1;
	}
	
	if ( hour < 0 ){
		hour += 24;
		day -= 1;
	}
	
	if ( day < 0 ){
		day += 30;
		
		month -= 1;
	}
	
	if ( month < 0 ){
		month += 12;
		year -= 1;
	}
	
    // Display in two-digit form
	div.find(".year").html( year < 10 ? '0' + year + 'Y' : year + 'Y' );
	div.find(".month").html( month < 10 ? '0' + month + 'M' : month + 'M' );
	div.find(".day").html( day < 10 ? '0' + day + 'D' : day + 'D' );
	div.find(".hour").html( hour < 10 ? '0' + hour + 'h' : hour + 'h' );
	div.find(".minute").html( minute < 10 ? '0' + minute + 'm' : minute + 'm' );
	div.find(".second").html( second < 10 ? '0' + second + 's' : second + 's' );
	
}

// Calls update timer on all four timers
function updateAllTimers(){
	var currentDate = new Date();
	
	updateTimer( currentDate, metDate, metTimer );
	updateTimer( currentDate, coupleDate, coupleTimer );
	updateTimer( currentDate, engagedDate, engagedTimer );
	updateTimer( currentDate, weddingDate, weddingTimer );
}

// Runs update timer on load and every second after
updateAllTimers();
setInterval( updateAllTimers, 1000 );

$( "#bio" ).css( "transition", "padding 2s" );