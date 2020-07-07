const Handlebars = require('requirejs')
(function() {
    // GENERATES AUTH LINK TO GIVE UNDRGRND USER PERMISSIONS
    function login(callback) {
        var CLIENT_ID = '933790dc3b564fa6b2ed3d8f09ed440f';
        var REDIRECT_URI = 'https://1undrgrnd.s3.amazonaws.com/frontend/trial.html';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }
        
        // SCOPES (PERMISSIONS) USED TO GENERATE KEY
        var url = getLoginURL([
            'user-read-email user-follow-modify user-top-read user-library-modify user-follow-modify'
        ]);
        
        // DISPLAY SETTINGS FOR POPUP AUTH BOX
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
        // PARSES DATA AND CALLS BACK TOKEN HASH
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);
        
        var w = window.open(url,
                            'Spotify',
                            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                           );
        
    }
    // FETCHES USER INFO FROM 'me' API
    function getUserData(accessToken) {
         $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            }
        });
        
    }

    // function getFavArtists(accessToken) {
    //     return $.ajax({
    //         url: 
    //     })
    // }

    // THIS FUNCTION JUST PUSHES THE USERS INFO TO THE DOM, NOT NECESSARY AT ALL
    var templateSource = document.getElementById('result-template').innerHTML,
        template = Handlebars.compile(templateSource),
        resultsPlaceholder = document.getElementById('result'),
        loginButton = document.getElementById('btn-login');
    
    loginButton.addEventListener('click', function() {
        login(function(accessToken) {
            getUserData(accessToken)
                .then(function(response) {
                    loginButton.style.display = 'none';
                    resultsPlaceholder.innerHTML = template(response);
    //                 
                });
            });
    });
    
})();


