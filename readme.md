# TERMS

Prior to use, please confirm with a manager to obtain license terms.

##Documentation
How to Deploy the API Server, Admin Web Dashboard, Mobile Apps (Rider/Driver) locally

#Requirements
npm installed along with node
MongoDB

#API server

##Installation Steps
Step 1: Download the taxi app and extract it
Step 2: Open terminal and Go to Full-apps folder where you have extracted, there you would find 3 modules api-server, admin-dashboard, mobile-app
Step 3: Go to ApiServer folder and install npm or yarn npm install or yarn
Step 4: Open another terminal and enter mongod this would start mongo server
Step 5: Update the OneSignal AppId and Api key for Rider & Driver App in apiserver/server/service/pushNotification.js
Step 6: Start the api server npm start now api-server is up and running

##Common mongo server issues:
unable to lock file: /data/db/mongod.lock resource temporarily unavailable. Is a mongod instance already running? , terminating, You need to enter,
sudo killall -15 mongod
Admin Webdashboard
Installation steps
Step1: Open another terminal Go to ApiServer folder and enter npm run-script seed
Common issue while scripting seed
Duplicate key error collection
Open another terminal type mongo
Type show dbs
Copy taxiApp-development from above stated
Type use taxiApp-development
Type db.dropDatabase()
Then taxiApp-development would be dropped
To check if dropped type again show dbs
The taxiApp-development disappears
Exit it
Step2: Open another terminal Goto Webdashboard/react folder
Type npm i
Open sublime or any editor, in src/services/apiconfig.js copy IP address in network preference And paste it here then save it then start the npm by npm start
Go to ApiServer/Script and write node superAdmin.js
Now the admin dashboard gets open, If you wish to change the credentials of dashboard you can do so, Go to ApiServer/Script/admin.js and edit user object{}
Note: Make sure after changing credentials you need to script seed again follow Step1 of Admin Dashboard
Mobile App(Rider/Driver app)
Installation steps
Note: Before Starting Mobile app(Rider/Driver) you need to seed the database follow Step1 of Admin Dasbhboard
Steps: Initiate app for Rider/Driver Goto rider app folder
Type npm i
Navigate to ios folder in mobile App and do pod install
Open sublime or any editor
Rider app / Driver app go to mobileApp/AppName/config.js .serverSideUrl: "paste the IP address or the URL and the port "
Configuring Google Map
Update YOUR_GOOGLE_API_KEY in AppName/ios/AppName/AppDelegate.m file for ios in line 27
Update YOUR_GOOGLE_API_KEY in AppName/android/app/src/main/AndroidManifest.xml file for Android in line 33 for the rider, line 34 for driver
Get Google Map API key from here
If you have trouble setting up follow here
Configuring Facebook Login
Create App on Facebook Developer
You need to update the Facebook App ID in ios/Rider/Info.plist line 43,60 && android/app/src/main/res/values/strings.xml
If you have trouble setting up follow here
Configuring Google Login
Create OAuth client ID follow here
You need to update the YOUR_CLIENT_ID in ios/AppName/Info.plist in line 53 and add file google-services.json in AppName/android/app folder .
Follow documentation here and link your Mobile App
Configuring Sentry
Create App on sentry.io You need to update sentry.properties file inside ios folder and in an android folder, along with it update the DNS for your app in App.js in the root folder of Mobile App
Follow documentation here and link your Mobile App.
Configuring OneSignal
Before setting up the onesignal you will need to generate an iOS Push Certificate && a Google Server API Key on Firebase console.
Go to Firebase Console -> Settings -> Project Settings -> Cloud Messaging -> iOS app configuration
You will get Google Server API Key on the same page of iOS app configuration
You need to update key OnesignalAppId inside config.js file in your app in the root folder of Mobile App
You have to follow here to set up the environment.
If you would like to run app in android you need to connect the android phone to a system or via android emulator, and type react-native run-android
Note: If you are running the app in Ubuntu O.S. :
Start JS Server by running command npm start under Rider App Directory in another terminal
Add local.properties file in the android folder for both Rider and Driver and write sdk.dir="sdk path"
Make sure you have configured the AVD before running the command, If you would like to run the app in iPhone simulator (MacOS) run react-native run-ios
Set Simulator Location- Go to Debug-> Location-> Custom Location->Enter Latitude and Longitude of your Current Location
Note: Make sure you have the same network in the mobile If you are running app on ios make sure you have open AppName.xcworkspace .



