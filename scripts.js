$(function(){

	var wWidth = $(window).innerWidth();
	var wHeight = $(window).innerHeight()

	// Load the IFrame Player API code asynchronously.
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// Replace the 'ytplayer' element with an <iframe> and
	// YouTube player after the API code downloads.
	var player,
		$playerObj;
	window.onYouTubePlayerAPIReady = function() {
		player = new YT.Player('ytplayer', {
			height: wHeight,
			width: wWidth,
			videoId: 'THbBF4WdYCs',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		$playerObj = $('#ytplayer')
		event.target.playVideo();
	}

	// 5. The API calls this function when the player's state changes.
	function onPlayerStateChange(event) {
		console.log(event);
	}

	function stopVideo() {
		player.stopVideo();
	}

	// Window resize listener
	$(window).on('resize', function(){
		$playerObj.attr('width', $(window).innerWidth()).attr('height', $(window).innerHeight());
	});
});