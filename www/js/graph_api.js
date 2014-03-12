//////////////////////////
//
// Graph API
// See https://developers.facebook.com/docs/reference/api/
//
//////////////////////////
/*global window, document, FB */

//Detect when Facebook tells us that the user's session has been returned
function updateAuthElements() {
  console.log("updating auth elements");
  FB.Event.subscribe('auth.statusChange', function (session) {
    console.log("subscribed to auth.statusChange");
    if (session.authResponse) {
      //The user is logged in, so let's pre-fetch some data and check the current
      //permissions to show/hide the proper elements.
      preFetchData();
      checkUserPermissions();
    }
  });
}

//Get the user's basic information
function getUserBasicInfo() {
  console.log("get user basic info");
  setAction('Getting your information', false);

  var markup = '<div class="data-header">Your information:</div>';

  //Update display of user name and picture
  if (document.getElementById('user-info')) {
    var profilePictureUrl = '';
    if (user.picture.data) {
      profilePictureUrl = user.picture.data.url;
    } else {
      profilePictureUrl = user.picture;
    }
    markup = markup + '<strong>User ID:</strong> ' + user.id + '<br />' + '<strong>Name:</strong> ' + user.name + '<br />' + '<strong>Profile picture URL:</strong> <a href="' + profilePictureUrl + '" target="_blank">' + profilePictureUrl + '</a><br />';
    document.getElementById('user-info').innerHTML = markup;

    clearAction();
  }
}

//Get the user's friends
function getUserFriends() {
  console.log("get users friends");
  var i,
    profilePictureUrl,
    markup = '<div class="data-header">Friends (capped at 25):</div>';

  for (i = 0; i < friendsInfo.length && i < 25; i++) {
    profilePictureUrl = '';
    if (friendsInfo[i].picture.data) {
      profilePictureUrl = friendsInfo[i].picture.data.url;
    } else {
      profilePictureUrl = friendsInfo[i].picture;
    }
    markup = markup + '<img src="' + profilePictureUrl + '">' + friendsInfo[i].name + '<br />';
  }

  document.getElementById('user-friends').innerHTML = markup;
}

//Get the user's check-ins
function getCheckIns() {
  console.log("get checkins");
  setAction('Getting check-ins', false);

  FB.api('/me/checkins', function (response) {
    console.log('Got your check-ins: ', response);

    clearAction();

    if (!response.error) {
      displayCheckIns(response.data, document.getElementById('checkins'));
    }
  });
}
//Pre-fetch data, mainly used for requests and feed publish dialog
var nonAppFriendIDs = [];
var appFriendIDs = [];
var friendIDs = [];
var friendsInfo = [];

function preFetchData() {
  console.log("prefetching data");
  //First, get friends that are using the app
  FB.api({
    method: 'friends.getAppUsers'
  }, function (appFriendResponse) {
    console.log("got friends data");
    console.log(appFriendResponse);
    appFriendIDs = appFriendResponse;

    //Now fetch all of the user's friends so that we can determine who hasn't used the app yet
    FB.api('/me/friends', {
      fields: 'id, name, picture'
    }, function (friendResponse) {
      friends = friendResponse.data;

      //limit to a 200 friends so it's fast
      for (var k = 0; k < friends.length && k < 200; k++) {
        var friend = friends[k];
        var index = 1;

        friendIDs[k] = friend.id;
        friendsInfo[k] = friend;

        for (var i = 0; i < appFriendIDs.length; i++) {
          if (appFriendIDs[i] == friend.id) {
            index = -1;
          }
        }

        if (index == 1) {
          nonAppFriendIDs.push(friend.id);
        }
      }

      console.log('Got your friend\'s that use the app: ', appFriendIDs);
      console.log('Got all of your friends: ', friendIDs);
      console.log('Got friends that are not using the app yet: ', nonAppFriendIDs);
    });
  });
}
