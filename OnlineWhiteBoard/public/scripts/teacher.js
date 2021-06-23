var AfterLogin = document.getElementById('after-login');
var ProfileImg = document.getElementById('profile-img');
var UserName = document.getElementById('user-name');
var SignoutButton = document.getElementById('sign-out-button');

var ClassCardTemplate = document.getElementById('class-card-template');
var ClassCardsContainer = document.getElementById('class-cards-container');

var CreateClassBtn = document.getElementById('create-class-btn');
var CreateClassContainer = document.getElementById('create-class');
var CancelCreation = document.getElementById('cancel-creation');
var ConfirmCreation = document.getElementById('confirm-creation');
var FormError = document.getElementById('error');
var ClassName = document.getElementById('class-name');
var Male = document.getElementById('male');
var Female = document.getElementById('female');
var Load = document.getElementById('load');
var Gender;

var StudentsListSectionContainer;//=document.getElementById('students-list-section-container');
//save students list section container skeleton
//StudentsListSectionContainer.innerHTML;
const StudentsListSectionContainerSkeletion=
`<div class="students-list-section">
<div class="students-list-header">
  <span id="students-list-header-title" class="students-list-header-title"></span>
  <button id="students-list-close" class="mdl-button mdl-js-button mdl-js-ripple-effect">
    <span class="material-icons">close</span>
  </button>
</div>
<span id="student-list-action-buttons">
  <button id="add-student-btn" class=" mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect md1-button--colored">
    <i class="material-icons">person_add_alt_1</i>
  </button><br/>
  <button id="remove-student-btn" class=" mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect md1-button--colored">
    <i class="material-icons">person_remove</i>
  </button>
</span>
<span id="student-table-container"><table id="student-table" hidden>
  <thead><tr><th>Roll Number</th><th>Gmail</th></tr></thead>
  <tbody id="student-list-data">

  </tbody>
</table></span>
</div>`;
var StudentsListHeaderTitle;
var StudentsListClose;
var AddStudentDialog;
var FieldGmailAdd;
var FieldRollAdd;
var AddError;
var CancelAdd;
var ConfirmAdd;
var RemoveStudentDialog;
var FieldGmailRemove;
var FieldRollRemove;
var RemoveError;
var CancelRemove;
var ConfirmRemove;
var AddStudentBtn;
var RemoveStudentBtn;
var StudentsListTable ;
var StudentListTableBody;

var AttendReportContainer;
var AttendReportHeaderTitle;
var AttendReportClose;
var AttendReportDownloadButton;
var AttendReportTable;
var AttendReportMetaData;
var AttendReportClassName;
var AttendReportDate;
var AttendReportData;
var MaxCounter;
var ResponseCounter;
var AttendReportContainerSkeleton =`<div class="attend-report-section">
<div class="attend-report-header">
  <span id="attend-report-header-title" class="attend-report-header-title"></span>
  <button id="attend-report-close" class="mdl-button mdl-js-button mdl-js-ripple-effect">
    <span class="material-icons">close</span>
  </button>
</div>
<div style="padding: 10px;color: gray;">
  <span>Attendance notifications sent : </span><span id="max-counter"></span><br/>
  <span>Mark attendance if responded : </span>
  <select id="response-counter" style="border : 2px solid gray"></select>
</div>  
<span id="attend-report-action-buttons">
  <button id="attend-report-download-btn" class=" mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect md1-button--colored">
    <i class="material-icons">download</i>
  </button>
</span>
<span id="attend-report-table-container"><table id="attend-report-table">
  <tr id="attend-report-meta-data" hidden>
    <th><b>Classname</b></th>
    <td id="attend-report-class-name"></td>
    <th><b>Date & time</b></th>
    <td id="attend-report-date"></td>
    <td></td>
  </tr>
    <tr>
      <th><b>Responses</b></th>
      <th><b>Roll Number</b></th>
      <th><b>Status</b></th>
      <th><b>Name</b></th>
      <th><b>Gmail</b></th>
    </tr>
  <tbody id="attend-report-data">
  </tbody>
</table></span>
</div>`;
var StartClassPrompt=document.getElementById('start-class-prompt');
var ClearCounters =document.getElementById('clear-counters');
var CancelStart = document.getElementById('cancel-start');
var ConfirmStart = document.getElementById('confirm-start');

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
<div id="open-chat" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" title="chat" style="color: orange;">
  <span class="material-icons ">
    chat_bubble_outline
  </span>
</div>
<div id="open-unread-chat" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" style="color:orange;" title="unread messages" hidden>
  <span class="material-icons">
    mark_chat_unread
  </span>
</div>
<div id="clear-canvas" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" style="color: red;" title="clear canvas">
  <span class="material-icons">
    delete
  </span>
</div>
<div id="send-attendance-notification" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" style="color: green;" title="send attendance notification">
  <span style="font-size: large;">
    A
  </span>
  <span class="material-icons">
    check_circle
    </span>
</div>
<div id="paint-tools" class="mdl-js-ripple-effect mdl-button mdl-js-button bar-item" style="color:blue;" title="paint tools">
  <span class="material-icons">
    brush
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
var db;
var strokenumber ;
var Left ;
var Right ;
var MyCanvas ;
var Context ;
var mousePosX;
var DrawRecord ;
var StrokeColor ;
var LineSize;
var ColorSelectionRadioGroup;
var SizeSelectionRadioGroup;
var PaintToolsContainer;
var ConfirmToolsSelection;

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

  function createClass(){
    if(!isUserSignedIn()) return;
    if(!validate()) return;
    Load.removeAttribute('hidden');
    var ref=Db.collection('usersid').doc(firebase.auth().currentUser.uid);
    var ref2=Db.collection('classes');
    ref2.add({
      classname : ClassName.value,
      mail : getMailId(),
      gender : Gender,
      counterstate : 0
    }).then(function(docRef){
      ref.collection('createdcodes').doc(docRef.id).set({
        classcode : docRef.id,
        classname : ClassName.value
      },{merge : true}).then(function(){
        ClassName.value="";
        $('#male').prop('checked',false);
        $('#female').prop('checked',false);
        Load.setAttribute('hidden',true);
        CreateClassContainer.setAttribute('hidden',true);
      }).catch(function(error){
        console.log(error);
        Load.setAttribute('hidden',true);
        FormError.innerHTML="Please try again";
      });
    }).catch(function(error){
      console.log(error);
      Load.setAttribute('hidden',true);
      FormError.innerHTML="Please try again";
    });
  }

  function validate(){
    if(ClassName.value.trim().length<2){
      ClassName.value = "";
      FormError.innerHTML = "Class name must contain at least 2 characters.";
      return false;
    }
    if(ClassName.value.trim().length>25){
      ClassName.value = "";
      FormError.innerHTML = "Class name can contain at most 25 characters.";
      return false;
    }
    if(Male.checked || Female.checked){
      if(Male.checked) Gender ='m';
      else Gender='f';
      return true;
    }
    FormError.innerHTML = "Select your gender.";
    return false;
  }

  function hideError(){
    FormError.innerHTML="";
  }

  function hideAddError(){
    AddError.innerHTML = "";
  }

  function hideRemoveError(){
    RemoveError.innerHTML="";
  }
  
  function loadClasses(){
      var query = Db.collection('usersid').doc(firebase.auth().currentUser.uid).collection('createdcodes').orderBy('classname','desc');
      var ref = Db.collection('classes');
      query.onSnapshot(function(snapshot) {
        if(snapshot.empty) return;
        snapshot.docChanges().forEach(function(change) {

            if (change.type === "added") {
                createClassCard(change.doc.id,change.doc.data().classname);
            }
            if (change.type === "modified") {
            }
            if (change.type === "removed") {
            }
        });
    });
  }
  function startSession(classcode,classname){
    if(!isUserSignedIn()) return;
    Load.removeAttribute('hidden');
    if(ClearCounters.checked){
      var promises = [];
      Db.collection('classes').doc(classcode).update({counterstate : 0});
      Db.collection('classes').doc(classcode).collection('students').get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          promises.push(doc.ref.update({responsecounter : 0}));
        });
        Db.collection('classes').doc(classcode).collection('messages').get()
        .then(function(messagesquerySnapshot){
          messagesquerySnapshot.forEach(function(messagesdoc){
            promises.push(messagesdoc.ref.delete());
          });
          console.log(promises);
          Promise.all(promises).then(function(){
            console.log('setting up new session.....\n Success!');
            console.log(promises);
            loadSession(classcode,classname);
          }).catch(function(){
            console.log('setting up new session ...... \n failed!');
            console.log(promises);
            startSession(classcode,classname);
          });
        });
      });
      return;
    }
    loadSession(classcode,classname);
  }

  function loadSession(classcode,classname){
    //Load.setAttribute('hidden',true);
    StartClassPrompt.setAttribute('hidden',true);
    ClassStarted = document.createElement('div');
    ClassStarted.setAttribute('id','class-started');
    ClassStarted.innerHTML=ClassStartedSkeleton;

    document.body.appendChild(ClassStarted);

    TopBar = document.getElementById('top-bar');
    SessionClose = document.getElementById('session-close');
    OpenChat = document.getElementById('open-chat');
    OpenUnreadChat = document.getElementById('open-unread-chat');
    ClearCanvas = document.getElementById('clear-canvas');
    SendAttendanceNotifictation = document.getElementById('send-attendance-notification');
    PaintTools = document.getElementById('paint-tools');
    MessagesContainer = document.getElementById('messages-container');
    MessagesContainerHeaderTitle = document.getElementById('messages-container-header-title');
    MessagesContainerMinimize = document.getElementById('messages-container-minimize');
    MessageListContainer = document.getElementById('message-list-container');
    MessageInputText = document.getElementById('message-input-text');
    MessageInputSendBtn = document.getElementById('messages-input-send-btn');
    MessageInputSendBtn.setAttribute('disabled',true);

    db=firebase.database();
    strokenumber = 0;
    Left = 0;
    Right = 0;
    MyCanvas = document.getElementById('drawing-canvas');
    Context = MyCanvas.getContext("2d");
    mousePosX=0,mousePosY=0,isDrawing=false;
    DrawRecord = [];
    StrokeColor = 'red';
    LineSize = 1;

    PaintToolsContainer = document.getElementById('paint-tools-container');
    ConfirmToolsSelection = document.getElementById('confirm-tools-selection');
    ConfirmToolsSelection.addEventListener('click',function(){
      PaintToolsContainer.setAttribute('hidden',true);
    });

    ColorSelectionRadioGroup=document.getElementsByName('color-selection');
    SizeSelectionRadioGroup=document.getElementsByName('brush-size');
    ColorSelectionRadioGroup.forEach(ele=>{
      ele.addEventListener('change',function(){
        if(ele.checked) StrokeColor = ele.value;
      });
    });

    SizeSelectionRadioGroup.forEach(ele=>{
      ele.addEventListener('change',function(){
        if(ele.checked) LineSize = ele.value;
      });
    });

    document.getElementById('color-red').setAttribute('checked',true);
    document.getElementById('size-3').setAttribute('checked',true);

    canvasResize();
    loadStrokes(classcode);
    window.addEventListener('resize',canvasResize);
    window.addEventListener('orientationchange',canvasResize);
    MyCanvas.addEventListener('mousedown',mouseDown);
    MyCanvas.addEventListener('mousemove',mouseMove);
    MyCanvas.addEventListener('mouseup',function(event){mouseUp(event,classcode);});
    MyCanvas.addEventListener('touchstart',mouseDown);
    MyCanvas.addEventListener('touchmove',mouseMove);
    MyCanvas.addEventListener('touchend',function(event){mouseUp(event,classcode);});

    componentHandler.upgradeElement(MessageInputSendBtn);
    componentHandler.upgradeElement(ConfirmToolsSelection);
    componentHandler.upgradeElement(MessageInputText);
    componentHandler.upgradeElement(MessageInputText.parentNode.children[1]);
    componentHandler.upgradeElement(MessageInputText.parentNode);

    MessagesContainerHeaderTitle.innerHTML=classname;
    PaintTools.addEventListener('click',function(){
      PaintToolsContainer.removeAttribute('hidden');
    });
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
    ClearCanvas.addEventListener('click',function(event){
      var timer = new Date().getTime();
      var dummy = {
          clear : 'clear',
          ontime : timer,
          timediff : (DrawRecord.length!=0)?(timer-DrawRecord[DrawRecord.length-1].ontime):0
      }
      DrawRecord.push(dummy);
      Right = Right+1;
      draw(dummy);
      mouseUp(event,classcode);
      Load.removeAttribute('hidden');
      db.ref().child(classcode).set(null).then(()=>{
        Load.setAttribute('hidden',true);
      });

    });
    SendAttendanceNotifictation.addEventListener('click',function(){
      SendAttendanceNotifictation.setAttribute('hidden',true);
      Db.collection('classes').doc(classcode).update({
        counterstate : firebase.firestore.FieldValue.increment(1)
      }).then(function(){
        alert('Attendance notification sent');
        setTimeout(function(){
          SendAttendanceNotifictation.removeAttribute('hidden');
        },30000);
      });
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
        author : getUserName(),
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
    SessionClose.addEventListener('click',function(){
      query();
      StartClassPrompt.removeAttribute('classcode');
      StartClassPrompt.removeAttribute('classname');
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

  function attendanceReport(docid/*classcode*/,classname){
    AttendReportContainer=document.createElement('div');
    AttendReportContainer.setAttribute('id','attend-report-container');
    AttendReportContainer.innerHTML=AttendReportContainerSkeleton;
    document.body.appendChild(AttendReportContainer);
    
    AttendReportHeaderTitle = document.getElementById('attend-report-header-title');
    AttendReportClose = document.getElementById('attend-report-close');
    AttendReportDownloadButton = document.getElementById('attend-report-download-btn');
    AttendReportTable = document.getElementById('attend-report-table');
    AttendReportClassName = document.getElementById('attend-report-class-name');
    AttendReportDate = document.getElementById('attend-report-date');
    AttendReportData = document.getElementById('attend-report-data');
    MaxCounter = document.getElementById('max-counter');
    ResponseCounter = document.getElementById('response-counter');

    AttendReportHeaderTitle.innerHTML=classname;
    AttendReportClassName.innerHTML=classname;
    var attendRef=Db.collection('classes').doc(docid);
    attendRef.get().then(function(doc){
      MaxCounter.innerHTML=doc.data().counterstate;
      var option;
      for(var i=0;i<=doc.data().counterstate;i++){
        option = document.createElement('option');
        option.setAttribute('value',i);
        option.innerHTML=i;
        ResponseCounter.appendChild(option);
      }
      option.parentNode.value=Math.ceil(doc.data().counterstate/2);
      attendRef.collection('students').get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc2){
            var attendrow=document.createElement('tr');
            var a_res=doc2.data().responsecounter;
            var a_roll=doc2.data().rollnumber;
            var a_status=(a_res>=parseInt(ResponseCounter.value))?'Present':'Absent';
            var a_name=doc2.data().name;
            var a_mail=doc2.data().mail;
            attendrow.innerHTML='<td>'+a_res+'</td><td>'
            +a_roll+'</td><td>'+a_status+'</td><td>'+
            a_name+'</td><td>'+a_mail+'</td>';
            AttendReportData.appendChild(attendrow);
          });
        });
    });
    ResponseCounter.addEventListener('change',function(){
      var comp=ResponseCounter.value;
      var ExistingAttRows=AttendReportData.children;
      if(ExistingAttRows.length===0) return;
      else{
        let FirstRow=ExistingAttRows[0];
        while(FirstRow){
          var att_status=(parseInt(FirstRow.children[0].innerHTML)>=comp)?'Present':'Absent';
          FirstRow.children[2].innerHTML=att_status;
          FirstRow=FirstRow.nextSibling;
        }
      }
    });
    AttendReportClose.addEventListener('click',function(){
      document.body.removeChild(AttendReportContainer);
    });
    AttendReportDownloadButton.addEventListener('click',function(){
      var d= new Date();
      var DD=d.getDate();
      var MM=d.getMonth()+1;
      var YYYY=d.getFullYear();
      var hh=d.getHours();
      var mm=d.getMinutes();
      var dt=DD+'-'+MM+'-'+YYYY+' ('+hh+' : '+mm+') IST';
      AttendReportDate.innerHTML=dt;
      $("#attend-report-table").table2excel({
        //exclude: ".excludeThisClass",
        filename: dt+".xlsx", // do include extension
        preserveColors: false // set to true if you want background colors and font colors preserved
      });
    });
  }
  function openList(docid/*classcode*/,classname){/*Manage students section(functin to display students list)*/
    StudentsListSectionContainer=document.createElement('div');
    StudentsListSectionContainer.setAttribute('id','students-list-section-container');
    StudentsListSectionContainer.setAttribute('hidden',true);

    StudentsListSectionContainer.innerHTML=StudentsListSectionContainerSkeletion;
    document.body.appendChild(StudentsListSectionContainer);


    StudentsListSectionContainer.removeAttribute('hidden');
    StudentsListHeaderTitle=document.getElementById('students-list-header-title');
    StudentsListClose=document.getElementById('students-list-close');
    AddStudentDialog=document.getElementById('add-student');
    FieldGmailAdd=document.getElementById('gmail-id-add');
    FieldRollAdd=document.getElementById('roll-add');
    AddError=document.getElementById('add-error');
    CancelAdd=document.getElementById('cancel-add');
    ConfirmAdd=document.getElementById('confirm-add');
    RemoveStudentDialog=document.getElementById('remove-student');
    FieldGmailRemove=document.getElementById('gmail-id-remove');
    FieldRollRemove=document.getElementById('roll-remove');
    RemoveError=document.getElementById('remove-error');
    CancelRemove=document.getElementById('cancel-remove');
    ConfirmRemove=document.getElementById('confirm-remove');
    AddStudentBtn=document.getElementById('add-student-btn');
    RemoveStudentBtn=document.getElementById('remove-student-btn');
    StudentsListTable = document.getElementById('student-table');
    StudentListTableBody=document.getElementById('student-list-data');
    AddStudentBtn.addEventListener('click',function(){
      if(isUserSignedIn()){
        AddStudentDialog.removeAttribute('hidden');
      }
    });
    CancelAdd.addEventListener('click',function(){
      FieldGmailAdd.value="";
      FieldRollAdd.value="";
      AddStudentDialog.setAttribute('hidden',true);
      hideAddError();
    });
    ConfirmAdd.addEventListener('click',addStudent);
    FieldRollAdd.addEventListener('keydown',hideAddError);
    FieldGmailAdd.addEventListener('keydown',hideAddError);
    
    RemoveStudentBtn.addEventListener('click',function(){
      if(isUserSignedIn()){
        RemoveStudentDialog.removeAttribute('hidden');
      }
    });
    CancelRemove.addEventListener('click',function(){
      FieldGmailRemove.value="";
      FieldRollRemove.value="";
      RemoveStudentDialog.setAttribute('hidden',true);
      hideRemoveError();
    });
    ConfirmRemove.addEventListener('click',removeStudent);
    FieldRollRemove.addEventListener('keydown',hideRemoveError);
    FieldGmailRemove.addEventListener('keydown',hideRemoveError);
    StudentsListHeaderTitle.innerHTML=classname;
    StudentsListSectionContainer.children[0].setAttribute('id',docid);
    var query =Db.collection('classes').doc(docid).collection('students').orderBy('rollnumber');
    var queryListener = query.onSnapshot(function(snapshot){
      snapshot.docChanges().forEach(function(change){
        if(change.type === "added"){
          createRowInStudentListTableBody(change.doc.data().rollnumber,change.doc.data().mail);
        }
        if(change.type === "modified"){
         
        }
        if(change.type === "removed"){
          
          var row=document.getElementById('student-list-row-'+change.doc.data().rollnumber);
          if(row) row.parentNode.removeChild(row);
          if(StudentListTableBody.children.length==0) StudentsListTable.setAttribute('hidden',true);
        }
      });
    });
    //close the list and detach the listener on clicking close btn.
    StudentsListClose.addEventListener('click',function(){
      StudentsListSectionContainer.setAttribute('hidden',true);
      //StudentsListSectionContainer.innerHTML=StudentsListSectionContainerSkeletion;
      queryListener();
      document.body.removeChild(StudentsListSectionContainer);
    });
  }

  function createRowInStudentListTableBody(rollnumber,gmail){
    
    var tr=document.createElement('tr');
    var RowTemplate='<td>'+rollnumber+'</td><td>'+gmail+'</td>';
    tr.innerHTML=RowTemplate;
    tr.setAttribute('roll',rollnumber);
    tr.setAttribute('id','student-list-row-'+rollnumber);
    var ExistingRows = StudentListTableBody.children;
    if(ExistingRows.length===0) StudentListTableBody.appendChild(tr);
    else{
      let Row = ExistingRows[0];
      while (Row) {
        var RowRoll = parseInt (Row.getAttribute('roll'));
        if (RowRoll > rollnumber) break;
        Row = Row.nextSibling;
      }
      StudentListTableBody.insertBefore(tr, Row);
    }
    StudentsListTable.removeAttribute('hidden');
  }

  //function to add student
  function addStudent(){
    if(!isUserSignedIn()) return;
    var roll = FieldRollAdd.value;
    var gmail = FieldGmailAdd.value.toLowerCase();
    if(roll.toString().trim().length==0){
      FieldRollAdd.value='';
      AddError.innerHTML='Please enter roll number.';
      return;
    }
    if(gmail.trim().length==0){
        FieldGmailAdd.value='';
        AddError.innerHTML='Please enter gmail';
        return;
    }
    if(!roll.toString().match(/^[0-9]+$/)){
      FieldRollAdd.value='';
      AddError.innerHTML='Roll number must be a number';
      return;
    }
    if(!gmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      FieldGmailAdd.value='';
      AddError.innerHTML='Invalid mail format.';
      return;
    }
    Load.removeAttribute('hidden');
    var classcode=StudentsListSectionContainer.children[0].getAttribute('id');
    Db.collection('classes').doc(classcode).collection('students').
    where('rollnumber','==',roll).get().
    then(function(querySnapshot){
      if(!querySnapshot.empty){
        AddError.innerHTML="Member with this roll number already exists.";
        Load.setAttribute('hidden',true);
        return;
        }
      else{
        Db.collection('classes').doc(classcode).collection('students').
        where('mail','==',gmail).get().
        then(function(querySnapshot){
          if(!querySnapshot.empty){
            AddError.innerHTML="Member with this gmail already exists.";
            Load.setAttribute('hidden',true);
            return;
          }
          else{
            Db.collection('classes').doc(classcode).collection('students')
            .doc(gmail).set({
              mail : gmail,
              rollnumber : roll,
              responsecounter : 0,
              name : '--'
            },{merge:true}).then(function(){
              FieldRollAdd.value="";
              FieldGmailAdd.value="";
              AddStudentDialog.setAttribute('hidden',true);
              Load.setAttribute('hidden',true);
            }).catch(function(){
              console.log(error);
              Load.setAttribute('hidden',true);
              AddError.innerHTML="Please try again";
            });
          }
        });
      }
    });
  }
  //function to remove student
  function removeStudent(){
    if(!isUserSignedIn()) return;
    var roll = FieldRollRemove.value;
    var gmail = FieldGmailRemove.value.toLowerCase();
    if(roll.toString().trim().length==0){
      FieldRollRemove.value='';
      RemoveError.innerHTML='Please enter roll number.';
      return;
    }
    if(gmail.trim().length==0){
        FieldGmailRemove.value='';
        RemoveError.innerHTML='Please enter gmail';
        return;
    }
    var classcode=StudentsListSectionContainer.children[0].getAttribute('id');
    Load.removeAttribute('hidden');
    Db.collection('classes').doc(classcode).collection('students').
    where('rollnumber','==',roll).get().
    then(function(querySnapshot){if(querySnapshot.empty){
      RemoveError.innerHTML="Member with these details doesn't exists.";
      Load.setAttribute('hidden',true);
      return;
      }
      else{
        querySnapshot.forEach(function(doc){
          if(doc.data().mail!=gmail) {
            RemoveError.innerHTML="Member with these details doesn't exists.";
            Load.setAttribute('hidden',true);
            return;
          }
          else{
            Db.collection('classes').doc(classcode).collection('students').
            doc(doc.id).delete().then(function(){
              Db.collection('users').doc(gmail)
              .collection('enrolled').doc(classcode).delete().
                then(function(){
                  FieldGmailRemove.value='';
                  FieldRollRemove.value='';
                  RemoveStudentDialog.setAttribute('hidden',true);
                  Load.setAttribute('hidden',true);
                });
            });
          }
        });
      }
    });
  }

  function createClassCard(docid,classname){
    var div = document.createElement('div');
    div.innerHTML=ClassCardTemplate.innerHTML;
    if(ClassCardsContainer.children.length==0) ClassCardsContainer.appendChild(div);
    else ClassCardsContainer.insertBefore(div,ClassCardsContainer.children[0]);
    div.setAttribute('id',docid);
    //classname[0]
    div.children[0].children[0].innerHTML=classname;
    //Start Class[1]
    div.children[0].children[1].addEventListener('click',function(){
      StartClassPrompt.removeAttribute('hidden');
      StartClassPrompt.setAttribute('classcode',docid);
      StartClassPrompt.setAttribute('classname',classname);
    });
    //Manage students[2]
    div.children[0].children[2].addEventListener('click',function(){openList(docid,classname);});
    //Attendance report[3]
    div.children[0].children[3].addEventListener('click',function(){attendanceReport(docid,classname)});
    //copy class code[4][5]
    div.children[0].children[4].children[2].value=docid;
    div.children[0].children[4].addEventListener('click',function(){
      copyToClipboard(div.children[0].children[4].children[2].value);
      div.children[0].children[4].setAttribute('hidden',true);
      div.children[0].children[5].removeAttribute('hidden');
      setTimeout(function(){
        div.children[0].children[5].setAttribute('hidden',true);
        div.children[0].children[4].removeAttribute('hidden');
        },1000);
      });
  }

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };

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
  ///canvas related
  function loadStrokes(classcode){
    var ref = db.ref().child(classcode).orderByChild('timestamp');
    ref.once('value').then( (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var strokeobj = JSON.parse(childSnapshot.val().stroke);
            var strokearray = strokeobj.stroke;
            strokearray.forEach(function(dummy){
                DrawRecord.push(dummy);
                draw(dummy);
             });
        });
        Left = DrawRecord.length;
        Right = Left;
        Load.setAttribute('hidden',true);
    });
}

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

function getMousePosition(event){
    if(event.type == 'touchstart'|| event.type =='touchmove') {
        mousePosX = event.touches[0].clientX - MyCanvas.getBoundingClientRect().left;
        mousePosY = event.touches[0].clientY - MyCanvas.getBoundingClientRect().top;   
        return;
    }
    mousePosX = event.clientX - MyCanvas.getBoundingClientRect().left;
    mousePosY = event.clientY - MyCanvas.getBoundingClientRect().top;
    return;
}

function mouseDown(event){
    event.preventDefault();
    isDrawing=true;
    getMousePosition(event);
    RatioX = MyCanvas.width/mousePosX;
    RatioY = MyCanvas.height/mousePosY;
    var timer = new Date().getTime();
    var dummy = {
        beginPath : 'beginPath',
        MoveTo : [RatioX,RatioY],
        ontime : timer,
        timediff : (DrawRecord.length!=0)?(timer-DrawRecord[DrawRecord.length-1].ontime):0
    }
    DrawRecord.push(dummy);
    Right = Right+1;
    draw(dummy);
}
function mouseMove(event){
    event.preventDefault();
    if(isDrawing){
        getMousePosition(event);
        var RatioX = MyCanvas.width/mousePosX;
        var RatioY = MyCanvas.height/mousePosY;
        var timer = new Date().getTime();
        var dummy = {
            LineTo : [RatioX,RatioY],
            LineWidth : LineSize/1000,
            SetProperties : {strokeStyle:StrokeColor,lineCap:'round',lineJoin:'round'},
            Stroke : 'stroke',
            ontime : timer,
            timediff : (DrawRecord.length!=0)?(timer-DrawRecord[DrawRecord.length-1].ontime):0
        };
        DrawRecord.push(dummy);
        Right = Right+1;
        draw(dummy);
    }
}
function mouseUp(event,classcode){
    event.preventDefault();
    var Start = Left;
    Left = Right;
    sendStroke(DrawRecord.slice(Start,Right),classcode);
    isDrawing = false;
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

function sendStroke(StrokeArr,classcode){
    var key = db.ref().child(classcode).push().key;
    db.ref().child(classcode).child(key).set({
        stroke : JSON.stringify({stroke:StrokeArr}),
        timestamp : firebase.database.ServerValue.TIMESTAMP
    });
}
//canvas--related ended

  SignoutButton.addEventListener('click',signOut);

  CreateClassBtn.addEventListener('click',function(){
    if(isUserSignedIn())
    CreateClassContainer.removeAttribute('hidden');
  });
  CancelCreation.addEventListener('click',function(){
    CreateClassContainer.setAttribute('hidden',true);
    ClassName.value="";
    $('#male').prop('checked',false);
    $('#female').prop('checked',false);
    hideError();
  });
  ConfirmCreation.addEventListener('click',createClass);
  ClassName.addEventListener('keydown',hideError);
  Male.addEventListener("change",hideError);
  Female.addEventListener("change",hideError);

  CancelStart.addEventListener('click',function(){
    StartClassPrompt.setAttribute('hidden',true);
    StartClassPrompt.removeAttribute('classcode');
    StartClassPrompt.removeAttribute('classname');
  });
  ConfirmStart.addEventListener('click',function(){
    startSession(StartClassPrompt.getAttribute('classcode'),StartClassPrompt.getAttribute('classname'));
  });
  initFirebaseAuth();