/*
	Title:	Timers.js
	Author: Connor C. McKee
	Date:	07-23-2015
*/

var collapsed = true;   // Variable to track if #bio is collapsed
var bioHeight = $( "#bioConnor" ).width() * (4/3);  // Variable to prepare Bio Heights
var firstTimeHeight = 28;   // Variable to determine first-time height difference

// Prepares bio heights on start
function setHeights(){
    
    if ( collapsed ){
        $( "#bio" ).css( "padding-top", bioHeight + 10 );
    }else{
        $( "#bio" ).css( "padding-top", 10 );
    }
    
    $( "#bio" ).css( "height", bioHeight + 88 );
    $( "#bioText" ).css( "height", bioHeight );
    
    // Prepares Timer Heights
    var timersHeight = $("#timers").height() + firstTimeHeight - 30;
    var pageHeight = window.innerHeight;
    var timersMargin = pageHeight - ( timersHeight + $("#navigation").height() + 16 );
    
    // Catch to make sure the fully extend #bio will fit on the page
    if ( timersMargin < 0 ) {
        timersMargin = 0;
    }
    
    $("#timers").css( "margin-top", timersMargin );
}

// Runs setHeights() on load and resize
setHeights();
$( window ).resize( function(){
    bioHeight = $( "#bioConnor" ).width() * (4/3);
});
$( window ).resize( setHeights );

// Adds #bioButton functionality
$( "#bioButton, #aboutButton" ).click(function(event){
    $( "#bio" ).css( "transition", "padding 2s" );
    if ( collapsed ) {
        $( "#bio" ).css( "padding-top", 10 );
        collapsed = false;
    } else {
        $( "#bio" ).css( "padding-top", bioHeight + 10 );
        collapsed = true;
    }
    setTimeout( function(){
        $( "#bio" ).css( "transition", "none" );
    }, 2000 );
});

// Initialized date and div info for timers
var metDate = new Date( 2013, 10, 25, 18, 30, 00 );
var metTimer = $("#met");

var coupleDate = new Date( 2013, 11, 26, 17, 58, 00 );
var coupleTimer = $("#couple");

var engagedDate = new Date( 2014, 10, 22, 15, 54, 00 );
var engagedTimer = $("#engaged");

var weddingDate = new Date( 2016, 0, 30, 12, 30, 00 );
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

// Ensures firstTimeHeight is only effective once
firstTimeHeight = 0;

// Appropriately Size the Rolling Buttons and Registries
$( window ).resize( function(){
    $('.b05_3d_roll div').width( $('.weddingRegistry p').width() - 20 ); // -20 for margins
    $('#amazonRegistry p').height( $('#bbbRegistry p').height() );
}).resize();

// Adds smooth scrolling to the page (note: NOT MY SCRIPT
$(document).ready(function(){
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body')
        .animate({scrollTop: targetOffset}, 1000);
       return false;
      }
    }
  });
});