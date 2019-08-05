
    var player;

    // flag to monitor UHD toggling
    var url ;
    var primerVideo = true;
    var config

    /**
     * Register keys used in this application
     */
    function registerKeys() {
        var usedKeys = [
            'MediaPlay',	
            'MediaPause',
            'MediaStop',
            'MediaFastForward',
            'MediaRewind',            
            '0',
            '1',
            '2',
            '3'
        ];

        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }


    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 13:    // Enter
                    player.toggleFullscreen();
                    break;
                case 415:   // MediaPlay
                	player.play();
                	break;
                case 19:    // MediaPause
                    player.pause();
                    break;
                case 413:   // MediaStop
                    player.stop();
                    break;
                case 417:   // MediaFastForward
                	console.log("si existo");
                    player.ff();
                    break;
                case 412:   // MediaRewind
                    player.rew();
                    break;
                case 48: //Key 0
                	player.getProperties();
                    break;
                case 49: //Key 1
                	url = "https://www.radiantmediaplayer.com/media/bbb-360p.mp4";
                	playback();
                    break;
                case 50: //Key 2
                	url = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
                	playback();
                    break;
                case 51: //Key 3
                	console.log("tecla 3");
                    break;
                case 10009: // Return
                    if (webapis.avplay.getState() !== 'IDLE' && webapis.avplay.getState() !== 'NONE') {
                        player.stop();
                    }
                    tizen.application.getCurrentApplication().hide();
                    break;
              
            }
        });
    }

    function playback(){
    	// initialize player - loaded from videoPlayer.js
    	if(primerVideo  == true){
    		primervideo = false;
    		player = new VideoPlayer(config);
    	}
        
        player.open(url);
    }

    /**
     * Function initialising application.
     */
    window.onload = function () {

        registerKeys();
        registerKeyHandler();

        /**
         * Player configuration object.
         *
         * @property {String}    url                     - content url
         * @property {HTML Element} player           - application/avplayer object
         * @property {HTML Div Element} controls     - player controls
         * @property {HTLM Div Element} info         - place to display stream info
         */
        config = {
            url: url,
            player: document.getElementById('av-player'),
            controls: document.querySelector('.video-controls')
            /*Smooth Streaming examples*/
            //			url:
            // 'http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest',
            // url: 'http://playready.directtaps.net/smoothstreaming/TTLSS720VC1/To_The_Limit_720.ism/Manifest'
        };
        
        tizen.systeminfo.getPropertyValue(
                "DISPLAY",
                function (display) {
                    
                    config.resolutionWidth = display.resolutionWidth;

                    
                    
                    
                });
        


    }

