
var defaulStyles = [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e9e9e9"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dedede"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ];

jQuery(document).ready(function($){

    // Setup map_blocks array
    var block_index = $('.block-map.block-container').attr('data-block-index'),
        custom = customMapStyles,
        mapStyles = defaulStyles;
        // mapStyles = (custom.length > 0) ? JSON.parse(customMapStyles) : defaulStyles;


    console.log(mapStyles);
    // console.log(defaulStyles);
    $('#' + block_index + '_map').css('padding-bottom', '75%');

    initMap(block_index);

    function initMap(block_index) {
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            zoomControl: true,
            zoom: 8,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            mapTypeId: 'roadmap',
            draggable: true,
            panControl: true,
            panControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            scrollwheel: false,
            streetViewControl: false,
            styles: mapStyles
        };

        // Display a map on the page
        map = new google.maps.Map(document.getElementById(block_index + "_map"), mapOptions);
        map.setTilt(45);

        //google map custom marker icon - .png fallback for IE11
        // TODO: Add in this IE11 check
        // var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
        // var marker_url = ( is_internetExplorer11 ) ? '/library/images/icon.png' : '/library/images/icon.svg';

        var gravMarker = {
            url: marker_url,
        }

        // var locations = $('#' + block_index + '_map').data('locations');
        // console.log(locations);
        locations = locations.replace(/'/g, '"');

        gravMarkerLocations = JSON.parse(locations);

        //Array for infoWindow
        // var infoWindows = $('#' + block_index + '_map').data('infowindows');
        infoWindows = infoWindows.replace(/'/g, '"').replace('<br />', '');

        var InfoWindowContent = JSON.parse(infoWindows);
        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;

         // Loop through our array of markers & place each one on the map
         for( i = 0; i < gravMarkerLocations.length; i++ ) {
             var position = new google.maps.LatLng(
                 gravMarkerLocations[i][1],
                 gravMarkerLocations[i][2]
             );
             bounds.extend(position);
             marker = new google.maps.Marker({
                 icon: gravMarker,
                 position: position,
                 map: map,
                 title: gravMarkerLocations[i][0]
             });

             // Allow each marker to have an info window
             google.maps.event.addListener(marker, 'click', (function(marker, i) {
                 return function() {
                     infoWindow.setContent('<div class="info_content">' + InfoWindowContent[i]['marker_name'] +  InfoWindowContent[i]['marker_text'] + '<p><a href="https://www.google.com/maps/dir/Current+Location/' + gravMarkerLocations[i][1] +',' +gravMarkerLocations[i][2] +'" target="_blank">Get Directions</a></p></div>');
                     infoWindow.open(map, marker);
                 }
             })(marker, i));

             // Automatically center the map fitting all markers on the screen
             map.fitBounds(bounds);
         }

         // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
         var zoomOffest = $('#' + block_index + '_map').data('zoom');

         var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {

            var theZoom = this.getZoom();

            this.setZoom(theZoom - zoomOffest);

            google.maps.event.removeListener(boundsListener);

        });

         google.maps.event.addDomListener(window, 'resize', function() {
              map.fitBounds(bounds);
             //function to get current zoom and set map to zoom - 1
             var theZoom = map.getZoom();
             map.setZoom(theZoom - zoomOffest);

         });
      }

});