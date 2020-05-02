def scmVars
node {
	stage('Checkout') {
		scmVars = checkout scm
		echo "Current branch: ${scmVars.GIT_BRANCH}"
	}
	stage('Build') {
		if (scmVars.GIT_BRANCH.endsWith('/master')) {
			bat 'dotnet restore'
			bat 'dotnet restore --source http://awake-it.ddns.me/Awake-Nuget-Server/nuget'
			bat 'dotnet publish Cge.Msm.WebUI.Core.sln -c Release -o D:/Publish/Cge.Msm.WebUI.Core/'
			bat 'COPY /y Dockerfile D:\\Publish\\Cge.Msm.WebUI.Core'
		} else {
			echo "Skipped."
		}
	}
	stage('Build Image Docker') {
		if (scmVars.GIT_BRANCH.endsWith('/master')) {
			bat 'docker build -t cge.msm.webui.core-image D:/Publish/Cge.Msm.WebUI.Core/'
		} else {
			echo "Skipped."
		}
	}
	stage('Deploy Docker') {
		if (scmVars.GIT_BRANCH.endsWith('/master')) {
			def containerIdexe = bat(script: "docker ps --quiet --filter name=cge-msm-webui-core -a", returnStdout: true).trim()
			def containerId = containerIdexe.readLines().drop(1).join("") 
			if( containerId != "") {
				echo "Found = ${containerId}"
				bat 'docker rm -f cge-msm-webui-core'
			}
			bat 'docker run -d -p 7800:80 --restart=always --name cge-msm-webui-core -e ASPNETCORE_ENVIRONMENT=%ASPNETCORE_ENVIRONMENT% cge.msm.webui.core-image'
		} else {
			echo "Skipped."
		}
	}
	stage('Scan Issues') {
		if (scmVars.GIT_BRANCH.endsWith('/dev')) {
			bat 'D:\\Git\\GitPuzzle\\GitPuzzle.exe .\\ --git-server=http://git.awake-it.com --git-project-id=42 --project-signature=Cge.Msm.WebUI --file-filters=*.cs,*.cshtml,*.js'
		} else {
			echo "Skipped."
		}
	}
}
