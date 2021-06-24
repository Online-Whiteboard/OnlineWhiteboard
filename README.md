# Online-Whiteboard
To try the site : https://onlinewhiteboard-b184f.firebaseapp.com


## Description
OnlineWhiteboard is a simple tool to teach students instantly by creating a virtual class and 
make students join that class by sharing the auto-generated class code. 
This web application allows faculty and students at remote places to easily interact with each other. 
It can be used on devices like laptops, desktop computers and touch screens. 
The person who is willing to teach uses the 'Teach' section of the application. A class can be
created by providing the class name and gender of the user. Each class consists of options to start
class, manage students, generate attendance report and copy class code. To permit students to join
the class using class code, their mail id's and roll number must be added using the 'Manage students'
option. Using the 'Start class' option user can start teaching his students. It consists of a virtual
whiteboard, when the user draws something on the virtual whiteboard it will be visible to all the
students who joined the class. It also has options to clear canvas, send an attendance notification,
select the size and colour of the brush and a button to open the chatbox. Students can ask doubts and
interact with their teacher through the chatbox. An attendance notification can be sent, to keep an
eye on the student's attention towards the class. The attendance management system provides some
tools for the teacher to select constraints and based on those constraints, the attendance management
system generates student attendance reports which can be downloaded as a spreadsheet.
Students can join the class by proving their name and class code in the 'Learn' section of the
application. The students will be permitted to join the class only if their mail id is listed in the
‘Manage students’ section of the respective class. Student can start learning by selecting the 'Start
learning' option. When the teacher sends an attendance notification, a popup will be displayed on
the student's devices asking them to give the response to the notification within 30 seconds.

## Follow these steps to modify and test the project
### Step 1:
* Open the [firebase console](https://console.firebase.google.com/).
* create a new project.
* Enable Google signin in **Firebase Authentication**.
* Create databases in both **Firestore Database** and **Realtime Database** in test mode.
### Step 2:
* Make sure that you have installed [node.js](https://nodejs.org/en/) and has good internet connection.
* Run this command to install **Firebase CLI**.
```npm install -g firebase-tools```
* Run this command to login to **Firebase CLI** using your firebase account.
```firebase login```
* Change the working directory to the directory where **_firebase.json_** file exists.
* Run this command to select the project id that you have created in step 1 and give it an alias.
```firebase use --add```
* Run this command to deploy the site.
```firebase deploy```
