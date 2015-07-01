$(function(){

	var wWidth = $(window).innerWidth();
	var wHeight = $(window).innerHeight()

	albumInFocus(wWidth, wHeight);

	// Load the IFrame Player API code asynchronously.
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// Params
	var volume = 100;

	// Replace the 'ytplayer' element with an <iframe> and
	// YouTube player after the API code downloads.
	var player,
		$playerObj;
	window.onYouTubePlayerAPIReady = function() {
		player = new YT.Player('ytplayer', {
			height: wHeight,
			width: wWidth,
			videoId: 'THbBF4WdYCs',
			playerVars: {
				controls: 0,
				showinfo: 0,
				rel: 0
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		$playerObj = $('#ytplayer');
		//event.target.playVideo();
		player.setVolume(volume);
		initStyles(wWidth, wHeight);
	}

	// 5. The API calls this function when the player's state changes.
	function onPlayerStateChange(event) {
		console.log(event);

		//Video started playing
		if(event.data == 1) {
			videoInfocus(wWidth, wHeight);
		} else if(event.data == 2) {
			$playerObj.removeClass('in');
			initStyles(wWidth, wHeight);
		}
	}

	function stopVideo() {
		player.stopVideo();
	}

	// Window resize listener
	$(window).on('resize', function(){
		wWidth = $(window).innerWidth();
		wHeight = $(window).innerHeight();
		$playerObj.attr('width', wWidth).attr('height', wHeight);
		initStyles(wWidth, wHeight);
	});
});

// Set rotation and size of cover art

function initStyles(w, h) {

	var $albumPromo = $('.albumWrap'),
		$video = $('#ytplayer');

	var wPower = Math.pow(w, 2),
		hPower = Math.pow(h, 2);

	var diagLength = Math.sqrt(wPower + hPower);
	diagLength = Math.floor(diagLength);

	var rotateAngle = Math.atan(h / w) * (180/Math.PI);

	var sizeStyles = {
		'width': diagLength+'px',
		'height': h+'px'
	};

	var rotateStyle = {
		'transform': 'rotate(-' + rotateAngle + 'deg)'
	};

	var videoRotate = {
		'transform': 'rotate(' + rotateAngle + 'deg)'
	};

	if(!$albumPromo.hasClass('in')) {
		$albumPromo.css(rotateStyle);
	}

	if(!$video.hasClass('in')) {
		$video.css(videoRotate);
	}

	$albumPromo.css(sizeStyles);
	$video.css(sizeStyles);
}

// Position video

function videoInfocus(w, h) {

	var $video = $('#ytplayer');

	var videoFit = {
		'width': w + 'px',
		'height': h + 'px'
	};

	//$albumPromo.hide();
	$video.get(0).style.removeProperty('transform');
	$video.addClass('in');
	$video.css(videoFit);
}

// Handle interaction with elements

function albumInFocus(w, h) {

	var $albumPromo = $('.albumWrap');

	$albumPromo.on('click', function() {
		$albumPromo.get(0).style.removeProperty('transform');
		if($albumPromo.hasClass('in')) {
			var wWidth = $(window).innerWidth(),
			wHeight = $(window).innerHeight();
			$albumPromo.removeClass('in');
			initStyles(wWidth, wHeight);

		} else {
			$albumPromo.addClass('in');
		}

		$albumPromo.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
			function(e) {
				if($albumPromo.hasClass('in')) {
					console.log('Album now in focus');
				} else {
					console.log('Album now out of focus');
				}
			});

	});
}