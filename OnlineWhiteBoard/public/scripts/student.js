var AfterLogin = document.getElementById('after-login');
var ProfileImg = document.getElementById('profile-img');
var UserName = document.getElementById('user-name');
var SignoutButton = document.getElementById('sign-out-button');
var Load = document.getElementById('load');

var JoinClassBtn = document.getElementById('join-class-btn');
var JoinClassContainer = document.getElementById('join-class');
var CancelJoin = document.getElementById('cancel-join');
var ConfirmJoin = document.getElementById('confirm-join');
var FormError = document.getElementById('error');
var FieldClassCode = document.getElementById('class-code');
var FieldStudentName = document.getElementById('student-name');

var ClassCardTemplate = document.getElementById('class-card-template');
var ClassCardsContainer = document.getElementById('class-cards-container');

var EditNameContainer = document.getElementById('edit-name');
var cancelEdit = document.getElementById('cancel-edit');
var confirmEdit = document.getElementById('confirm-edit');
var NameError = document.getElementById('edit-name-error');
var FieldEditName = document.getElementById('field-edit-name');

var MessageElementTemplate = `          
  <div class="message-author"></div>
  <div class="message-text"></div>`;
var ClassStartedSkeleton = `<canvas id="drawing-canvas"></canvas>
<div id="top-bar" class="mdl-shadow--4dp">
<div id="session-close" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" title="End session">
  <span class="material-icons ">
    close
  </span>
</div>
<div id="open-chat" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" title="chat" style="color: green;">
  <span class="material-icons ">
    chat_bubble_outline
  </span>
</div>
<div id="open-unread-chat" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" style="color:green;" title="unread messages" hidden>
  <span class="material-icons">
    mark_chat_unread
  </span>
</div>
</div>
<div id="messages-container" class="mdl-shadow--4dp" hidden>
<div id="messages-container-header">
  <span id="messages-container-header-title"></span>
  <button id="messages-container-minimize" class="mdl-button mdl-js-button mdl-js-ripple-effect">
    <span class="material-icons">close</span>
  </button>
</div>
<div id="message-list-container">

</div>
<div id="message-input-container">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <textarea class="mdl-textfield__input" type="text" id="message-input-text" rows="1" style="resize: none;"></textarea>
    <label class="mdl-textfield__label" for="message-input-text">Enter your message</label>
  </div>
  <button id="messages-input-send-btn" class="mdl-button mdl-js-button mdl-js-ripple-effect" style="color:#039be5">
    <span class="material-icons">send</span>
  </button>
</div>
</div>`;
var AttendanceTemplate=`
<h3>Are you there?</h3>
<span id="timer" style="display: inline-block;margin: 10px;font-weight: bold;font-size: large;"></span>
<button id="mark-btn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">
</button>
`;
var ClassStarted;
var TopBar;
var SessionClose;
var OpenChat;
var OpenUnreadChat;
var ClearCanvas;
var SendAttendanceNotifictation;
var PaintTools;
var MessagesContainer;
var MessagesContainerHeaderTitle;
var MessagesContainerMinimize;
var MessageListContainer;
var MessageInputText;
var MessageInputSendBtn;
var AttendancePopup;
var PopupAttendance;
var Timer;
var MarkBtn;

var database;
var MyCanvas;
var Context;
var DrawRecord;
var isFirstShot;
var isOpen;
var Tracing;
var TraceRecord;

var Db = firebase.firestore();

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
  
  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }
  function getMailId(){
    return firebase.auth().currentUser.email;
  }

  function loadSession(classcode,classname,joinedas){
    Load.removeAttribute('hidden');
    if(!isUserSignedIn()) return;
    ClassStarted = document.createElement('div');
    ClassStarted.setAttribute('id','class-started');
    ClassStarted.innerHTML=ClassStartedSkeleton;

    document.body.appendChild(ClassStarted);

    database =firebase.database();
    MyCanvas = document.getElementById('drawing-canvas');
    Context = MyCanvas.getContext("2d");
    DrawRecord = [];
    isFirstShot = 0;
    TraceRecord = [];
    canvasResize();
    loadStrokes(classcode);
    window.addEventListener('resize',canvasResize);
    window.addEventListener('orientationchange',canvasResize);

    TopBar = document.getElementById('top-bar');
    SessionClose = document.getElementById('session-close');
    OpenChat = document.getElementById('open-chat');
    OpenUnreadChat = document.getElementById('open-unread-chat');

    MessagesContainer = document.getElementById('messages-container');
    MessagesContainerHeaderTitle = document.getElementById('messages-container-header-title');
    MessagesContainerMinimize = document.getElementById('messages-container-minimize');
    MessageListContainer = document.getElementById('message-list-container');
    MessageInputText = document.getElementById('message-input-text');
    MessageInputSendBtn = document.getElementById('messages-input-send-btn');
    MessageInputSendBtn.setAttribute('disabled',true);

    AttendancePopup = document.getElementById('attendance-popup');
    PopupAttendance=document.createElement('div');
    PopupAttendance.setAttribute('id','popup-attendance');
    PopupAttendance.innerHTML=AttendanceTemplate;
    
    componentHandler.upgradeElement(MessageInputSendBtn);
    componentHandler.upgradeElement(MessageInputText);
    componentHandler.upgradeElement(MessageInputText.parentNode.children[1]);
    componentHandler.upgradeElement(MessageInputText.parentNode);
    

    MessagesContainerHeaderTitle.innerHTML=classname;
    OpenChat.addEventListener('click',function(){
      OpenChat.setAttribute('hidden',true);
      OpenUnreadChat.setAttribute('hidden',true);
      MessagesContainer.removeAttribute('hidden');
    });
    OpenUnreadChat.addEventListener('click',function(){
      OpenChat.setAttribute('hidden',true);
      OpenUnreadChat.setAttribute('hidden',true);
      MessagesContainer.removeAttribute('hidden');
    });
    MessageInputText.addEventListener('keydown',function(){
      if(MessageInputText.value.trim().length==0)
        MessageInputSendBtn.setAttribute('disabled',true);
      else MessageInputSendBtn.removeAttribute('disabled');
    });
    MessageInputText.addEventListener('change',function(){
      if(MessageInputText.value.trim().length==0)
        MessageInputSendBtn.setAttribute('disabled',true);
      else MessageInputSendBtn.removeAttribute('disabled');
    });
    MessagesContainerMinimize.addEventListener('click',function(){
      OpenChat.removeAttribute('hidden');
      OpenUnreadChat.setAttribute('hidden',true);
      MessagesContainer.setAttribute('hidden',true);
    });
    MessageInputSendBtn.addEventListener('click',function(){
      var messagetxt = MessageInputText.value;
      MessageInputSendBtn.setAttribute('disabled',true);
      MessageInputText.value='';
      MessageInputText.setAttribute('disabled',true);
      Db.collection('classes').doc(classcode).collection('messages').add({
        author : joinedas,
        messagetext : messagetxt,
        mtimestamp : firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(){
        MessageInputText.removeAttribute('disabled');
      }).catch(function(error){
        console.log(error);
        MessageInputText.value=messagetxt;
      });
    });
    var query = Db.collection('classes').doc(classcode).collection('messages')
      .orderBy('mtimestamp','desc').onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === 'removed') {
            var del = document.getElementById('message-'+change.doc.id);
            if (del) {
              del.parentNode.removeChild(del);
            }
            return;
          }
          if(change.type==='added'){
            if(MessagesContainer.hidden){
              OpenChat.setAttribute('hidden',true);
              OpenUnreadChat.removeAttribute('hidden');
            }
            var message = change.doc.data();
            var messageid='message-'+change.doc.id;
            displayMessage(messageid, message.mtimestamp, message.author,
                          message.messagetext);
          }
        });
      });
      var isFirst =0;
      var snapshot=Db.collection('classes').doc(classcode)
        .onSnapshot(function(doc){
          if(isFirst==0){
            isFirst=1;
            return;
          }
          if(doc.data().counterstate==0) return;
          AttendancePopup.appendChild(PopupAttendance);
          Timer=document.getElementById('timer');
          MarkBtn=document.getElementById('mark-btn');
          componentHandler.upgradeElement(MarkBtn);
          AttendancePopup.removeAttribute('hidden');
          var gender=(doc.data().gender=='f')?'mam':'sir';
          MarkBtn.innerHTML="yes "+ gender;
          var time=30;
            var si=setInterval(function(){
              Timer.innerHTML=time +'s';
              time=time-1;
            },1000);
          var st=setTimeout(function(){
            clearInterval(si);
            AttendancePopup.removeChild(PopupAttendance);
            AttendancePopup.setAttribute('hidden',true);
          },30000);
          MarkBtn.onclick=function(){
            AttendancePopup.setAttribute('hidden',true);
            console.log('attendance success');
            Db.collection('classes').doc(classcode)
            .collection('students').doc(getMailId())
            .update({
              responsecounter : firebase.firestore.FieldValue.increment(1)
            }).then(function(){
              clearTimeout(st);
              clearInterval(si);
              AttendancePopup.removeChild(PopupAttendance);
            }).catch(function(error){
              console.log(error);
            });
          };
      });
      SessionClose.addEventListener('click',function(){
        query();
        snapshot();
        Tracing.off();
        isOpen = false;
        document.body.removeChild(ClassStarted);
      });
  }

  function displayMessage(id,mtimestamp,author,messagetext){
    var NewMessage = document.createElement('div');
    NewMessage.setAttribute('id',id);
    NewMessage.classList.add("mdl-shadow--2dp","message-element");
    NewMessage.innerHTML=MessageElementTemplate;
    NewMessage.children[0].innerHTML=author;
    NewMessage.children[1].innerHTML=messagetext.replace(/\n/g, '<br>');

    mtimestamp = mtimestamp ? mtimestamp.toMillis() : Date.now();
    NewMessage.setAttribute('mtimestamp', mtimestamp);

    var existingmessages = MessageListContainer.children;
    if(existingmessages.length===0){
      MessageListContainer.appendChild(NewMessage);
    }
    else{
      let MessageBlock=existingmessages[0];
      while(MessageBlock){
        var MessageBlockTime = MessageBlock.getAttribute('mtimestamp');
        if(!MessageBlockTime){
          throw new Error(
            `Child ${MessageBlock.id} has no 'timestamp' attribute`
          );
        }
        if(MessageBlockTime>mtimestamp) break;
        MessageBlock = MessageBlock.nextSibling;
      }
      MessageListContainer.insertBefore(NewMessage,MessageBlock);
    }
    MessageListContainer.scrollTop = MessageListContainer.scrollHeight;
    MessageInputText.focus();
  }

  function joinClass(){
      if(!isUserSignedIn()) return;
      if(FieldClassCode.value.trim().length==0){
          FieldClassCode.value="";
          FormError.innerHTML = "Class code required";
          return;
      }
      if(FieldStudentName.value.trim().length==0){
          FieldStudentName.value = "";
          FormError.innerHTML = "Name required";
          return;
      }
      if(FieldStudentName.value.trim().length>40){
        FieldStudentName.value = "";
        FormError.innerHTML = "Name can contain at most 40 characters";
        return;
      }
      Load.removeAttribute('hidden');
      var checkRef = Db.collection('users').doc(getMailId())
      .collection('enrolled').doc(FieldClassCode.value);
      checkRef.get().then(function(doc){
        if(doc.exists){
              FormError.innerHTML="Already joined!";
              Load.setAttribute('hidden',true);
              return;
        }
        var ref=Db.collection('classes').doc(FieldClassCode.value)
        .collection('students').doc(getMailId());
        ref.get().then(function(docRef){
            if(!docRef.exists){
                    FormError.innerHTML="Permission denied!";
                    Load.setAttribute('hidden',true);
                    return;
                }
            Db.collection('classes').doc(FieldClassCode.value)
            .get().then(function(docRef2){
                checkRef.set({
                    classcode : FieldClassCode.value,
                    classname : docRef2.data().classname,
                    joinedas : FieldStudentName.value.toUpperCase()
                }).then(function(){
                    ref.update({
                        name : FieldStudentName.value.toUpperCase()
                    }).then(function(){
                        FieldClassCode.value="";
                        FieldStudentName.value="";
                        Load.setAttribute('hidden',true);
                        JoinClassContainer.setAttribute('hidden',true);
                    });
                });
            });
        });
      });
  }
var a="ehll";
function loadClasses(){
    var query = Db.collection('users').doc(getMailId()).collection('enrolled').orderBy('classname','desc');
    query.onSnapshot(function(snapshot){
        snapshot.docChanges().forEach(function(change){
            if (change.type === "added") {
                createClassCard(change.doc.id,change.doc.data().classname,change.doc.data().joinedas);
            }
            if (change.type === "modified") {
                var card=document.getElementById('classcard-'+change.doc.id);
                if(card) card.children[0].children[4].children[0].innerHTML=change.doc.data().joinedas;
            }
            if (change.type === "removed") {
                var card = document.getElementById('classcard-'+change.doc.id);
                if(card) card.parentNode.removeChild(card);
            }
        });
    });
}

function createClassCard(docid/*classcode*/,classname,joinedas){
    var div = document.createElement('div');
    div.innerHTML = ClassCardTemplate.innerHTML;
    if(ClassCardsContainer.children.length==0) ClassCardsContainer.appendChild(div);
    else ClassCardsContainer.insertBefore(div,ClassCardsContainer.children[0]);
    div.setAttribute('id','classcard-'+docid);
    div.setAttribute('classcode',docid);
    //classname[0]
    div.children[0].children[0].innerHTML=classname;
    //start [1]
    div.children[0].children[1].addEventListener('click',function(){
      loadSession(docid,classname,joinedas);
    });
    //edit [2]
    div.children[0].children[2].addEventListener('click',function(){
        EditNameContainer.removeAttribute('hidden');
        EditNameContainer.setAttribute('classcode',div.getAttribute('classcode'));
    });
    //joined as [4][0]
    div.children[0].children[4].children[0].innerHTML=joinedas;
}
function updateName(){
    if(!isUserSignedIn()) return;
    if(FieldEditName.value.trim().length==0){
        FieldEditName.value='';
        NameError.innerHTML="Required";
        return;
    }
    if(FieldEditName.value.trim().length>40){
        FieldEditName.value='';
        NameError.innerHTML = "Name can contain at most 40 characters";
        return;
    }
    Load.removeAttribute('hidden');
    var code = EditNameContainer.getAttribute('classcode');
    var editRef = Db.collection('classes').doc(code).collection('students').doc(getMailId());
    editRef.get().then(function(doc){
            if(!doc.exists) return;
            editRef.update({
                name : FieldEditName.value.toUpperCase()
            }).then(function(){
                Db.collection('users').doc(getMailId()).collection('enrolled')
                .doc(code).update({
                    joinedas : FieldEditName.value.toUpperCase()
                }).then(function(){
                    EditNameContainer.removeAttribute('classcode');
                    EditNameContainer.setAttribute('hidden',true);
                    FieldEditName.value="";
                    hideNameError();
                    Load.setAttribute('hidden',true);
                });
            });
        });
}

  function authStateObserver(user) {
    if (user) { // User is signed in!
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();
      loadClasses();    
      // Set the user's profile pic and name.
      ProfileImg.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
      UserName.textContent = userName;
      AfterLogin.removeAttribute('hidden');
    } else { // User is signed out!
      AfterLogin.setAttribute('hidden',true);
      //Reset user's profile pic and name.
      ProfileImg.style.backgroundImage = "url('../images/profileicon.png')";
      UserName.textContent = 'Username';

      location.replace('../index.html');
    }
  }

  function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
  }

  //canvas related start
  function canvasResize(){
    var Check = true;
    var Percent = 98;
    var WinWidth = window.innerWidth;
    var WinHeight = window.innerHeight*95/100;
    while(Check){
        var CanWidth = WinWidth*Percent/100;
        if(CanWidth*50/100 > WinHeight){
            Percent = Percent - 1;
            continue;
        }
        MyCanvas.width = CanWidth;
        MyCanvas.height = CanWidth*50/100;
        Check = false;
    }
    DrawRecord.forEach(function(dummy){
        draw(dummy);
    });
}
function loadStrokes(classcode){
    var count = 0;
    isOpen = true;
    Tracing = database.ref().child(classcode).orderByChild('timestamp');
    Tracing.limitToFirst(3).once('value',snapshot=>{
      Load.setAttribute('hidden',true);
      snapshot.forEach(childSnapshot=>{
        Load.removeAttribute('hidden');
        console.log('not empty');
      });
      Tracing.on('child_added',(snapshot) => {
        Load.setAttribute('hidden',true);
        if(isFirstShot==0){
          isFirstShot = new Date().getTime();
        }
        var strokeobj = JSON.parse(snapshot.val().stroke);
            console.log('count = '+(++count));
            var strokearray = strokeobj.stroke;
            //console.log(strokearray);
            console.log('stroke set timestamp = '+snapshot.val().timestamp+' load started at = '+isFirstShot+' actual time = '+(new Date().getTime()));
            if(snapshot.val().timestamp <= isFirstShot) strokearray.forEach(function(dummy){
                DrawRecord.push(dummy);
                draw(dummy);
            });
            else{
            console.log('called play');
            //console.log(strokearray);
            strokearray[0].timediff = 0;
            if(TraceRecord.length == 0){
                TraceRecord.push(strokearray);
                play(strokearray,0);
            }
            else TraceRecord.push(strokearray);
            }
      });
    });
}

function play(Record , index){
    if (index < Record.length && isOpen){
        setTimeout(function(){
            //console.log('index = '+index);
            DrawRecord.push(Record[index]);
            draw(Record[index]);
            play(Record,index+1);
            }, Record[index].timediff);
    }
    else if(TraceRecord.length!=1 && isOpen){
        TraceRecord.shift();
        play(TraceRecord[0],0);
    }
    else if(TraceRecord.length == 1 && isOpen){
        TraceRecord.shift();
    }
}

function draw(drawObj){
    Object.keys(drawObj).forEach(function(key){
        if(key == 'LineTo') Context.lineTo(MyCanvas.width/drawObj.LineTo[0],MyCanvas.height/drawObj.LineTo[1]);
        if(key == 'SetProperties') Object.assign(Context,drawObj.SetProperties);
        if(key == 'Stroke') Context.stroke();
        if(key == 'MoveTo') Context.moveTo(MyCanvas.width/drawObj.MoveTo[0],MyCanvas.height/drawObj.MoveTo[1]);
        if(key == 'LineWidth') Context.lineWidth = MyCanvas.width*drawObj.LineWidth;
        if(key == 'beginPath') Context.beginPath();
        if(key == 'clear') Context.clearRect(0,0,MyCanvas.width,MyCanvas.height);
    });
}

  //canvas related end
  function hideError(){
    FormError.innerHTML="";
  }

  function hideNameError(){
      NameError.innerHTML="";
  }


  SignoutButton.addEventListener('click',signOut);

  JoinClassBtn.addEventListener('click',function(){
      if(isUserSignedIn()){
          JoinClassContainer.removeAttribute('hidden');
      }
  });
  CancelJoin.addEventListener('click',function(){
      JoinClassContainer.setAttribute('hidden',true);
      FieldClassCode.value="";
      FieldStudentName.value="";
      hideError();
  });
  ConfirmJoin.addEventListener('click',joinClass);
  FieldClassCode.addEventListener('keydown',hideError);
  FieldStudentName.addEventListener('keydown',hideError);

  cancelEdit.addEventListener('click',function(){
      EditNameContainer.setAttribute('hidden',true);
      EditNameContainer.removeAttribute('classcode');
      FieldEditName.value="";
      hideNameError();
  });
  confirmEdit.addEventListener('click',updateName);
  FieldEditName.addEventListener('keydown',hideNameError);

  initFirebaseAuth();