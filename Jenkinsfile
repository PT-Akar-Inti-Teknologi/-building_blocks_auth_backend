static String newPath(env) {
  return "${env.PATH}:/usr/local/bin"
}

pipeline {
  agent any
    environment {
      SERVICE_TARGET_PORT = 80
      NAMESPACE = "building-blocks"
      PATH = newPath(env)
      ALLOWED_BRANCH = "scan/sonar"
    }

  stages {

    stage('Sonarqube Analysis') {
      when { anyOf { branch "$ALLOWED_BRANCH" } }
      environment {
        scannerHome = tool 'sonarqube-scanner'
      }
      steps {
        withSonarQubeEnv(installationName: 'sonarqube') {
          sh '$scannerHome/bin/sonar-scanner'
        }
      }
    }

    stage('Quality Gate') {
      when { anyOf { branch "$ALLOWED_BRANCH" } }
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: false
        }
      }
    }
  }

  post {
    failure {
      emailext subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
        body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
        recipientProviders: [
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
        ]
    }

    always { cleanWs() }
  }
}
