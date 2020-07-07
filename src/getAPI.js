// const Handlebars = require(['handlebars'])

const getAPI = function(callout) {
    // GENERATES AUTH LINK TO GIVE UNDRGRND USER PERMISSIONS
    function login(callback) {
        let CLIENT_ID = '933790dc3b564fa6b2ed3d8f09ed440f';
        let REDIRECT_URI = 'https://1undrgrnd.s3.amazonaws.com/index.html';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }
        
        // SCOPES (PERMISSIONS) USED TO GENERATE KEY
        let url = getLoginURL([
            'user-read-email user-follow-modify user-top-read user-library-modify user-follow-modify'
        ]);
        
        // DISPLAY SETTINGS FOR POPUP AUTH BOX
        let width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
        // PARSES DATA AND CALLS BACK TOKEN HASH
        window.addEventListener("message", function(event) {
            let hash = JSON.parse(event.data);
            console.dir(hash)
            if (hash.type == 'access_token') {
                uToken = callback(hash.access_token);  
            }
        }, false);
        
        let w = window.open(url,'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
        
    }
 
    function getUserData(accessToken) {
         fetch(
        'https://api.spotify.com/v1/me',
            {headers: {
               'Authorization': 'Bearer ' + accessToken
            }  
        }).then(response=> response.json()).then(response=>{ 
            console.dir(response)
            callout(accessToken,response)
            // THIS IS WHERE I NEED TO EXIT AND DO SOMETHING
        }
        ); 
        
    }

    // console.log(uToken)

    let loginButton = document.getElementById('btn-login');


    
    loginButton.addEventListener('click', function() {
        login(function(accessToken) {
            getUserData(accessToken)
            return accessToken;
                
            });
    });
    
};


// console.log(uToken)