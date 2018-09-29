@echo off
cls
: password: usual as for cat but using $webAppName 
set exec=powershell.exe ./src/deploy/deploy.ps1
set buildVersion=1.2


set webAppName=todo-web-app
echo webAppName:%webAppName%
%exec% deploy -username "jsonbuser2" -webAppName "%webAppName%" -buildInfoJs "src\deploy\BuildInfo.js" -buildVersion "%buildVersion%"



