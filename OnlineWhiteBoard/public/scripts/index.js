'use strict';

var PageSplash = document.getElementById('page-splash');
var SigninButton = document.getElementById('sign-in-button');
var AfterLogin = document.getElementById('after-login');
var ProfileImg = document.getElementById('profile-img');
var UserName = document.getElementById('user-name');
var SignoutButton = document.getElementById('sign-out-button');
var Teach = document.getElementById('teach');
var Learn = document.getElementById('learn');

var Db=firebase.firestore();

function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/user.gender.read	');
    firebase.auth().signInWithPopup(provider);
  }
  
  function signOut() {
    firebase.auth().signOut();
  }
  
  function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(authStateObserver);
  }
  
  function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '../images/profileicon.png';
  }
  
  function getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  function getMailId(){
    return firebase.auth().currentUser.email;
  }
  
  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  function newUser(UserIdDb,UsersDb){
      UserIdDb.set({
        mail : getMailId(),
      }).then(function(){
          UsersDb.set({
            username : getUserName(),
          })
      }).catch(function(error){
        console.log(error);
      });
    }
  function authStateObserver(user) {
    if (user) { // User is signed in!
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();

        
      // Set the user's profile pic and name.
      ProfileImg.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
      UserName.textContent = userName;
      
      var UserIdDb = Db.collection('usersid').doc(firebase.auth().currentUser.uid);
      var UsersDb = Db.collection('users').doc(getMailId());
      UserIdDb.get().then(function(doc){
        if(!doc.exists){
          newUser(UserIdDb,UsersDb);
        }
        else{
          //updates username if changed in gmail account
          console.log(doc.data());
          UsersDb.set({
            username : getUserName()
          },{merge : true}).catch(function(error){
            console.log(error);
          });
        }
      }).catch(function(error){
        console.log(error);
      });
      //hiding startup screen
      PageSplash.setAttribute('hidden',true);
      AfterLogin.removeAttribute('hidden');
    } else { // User is signed out!
      PageSplash.removeAttribute('hidden');
      AfterLogin.setAttribute('hidden',true);
      //Reset user's profile pic and name.
      ProfileImg.style.backgroundImage = "url('../images/profileicon.png')";
      UserName.textContent = 'Username';
    }
  }

  function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
  }
  
  function teach(){
    location.assign('../teacher.html');
  }
  function learn(){
    location.assign('../student.html');
  }

SigninButton.addEventListener('click',signIn);
SignoutButton.addEventListener('click',signOut);
Teach.addEventListener('click',teach);
Learn.addEventListener('click',learn);

initFirebaseAuth();