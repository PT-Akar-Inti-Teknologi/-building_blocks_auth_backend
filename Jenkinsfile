static String newPath(env) {
  return "${env.PATH}:/usr/local/bin"
}

pipeline {
  agent any
    environment {
      SERVICE_TARGET_PORT = 80
      NAMESPACE = "building-blocks"
      PATH = newPath(env)
      ALLOWED_BRANCH = "scan/snyk"
    }

  stages {

    stage('Snyk Scan for Code') {
      when { anyOf { branch "$ALLOWED_BRANCH" } }     
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'aitops', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME'), file(credentialsId: 'snyk-sh', variable: 'SNYK_SH')]) {
            sh "cat ${SNYK_SH} > ./snyk.sh && chmod +x snyk.sh && /bin/bash -c ./snyk.sh"
          }
          def now = new Date()
          time = now.format("yyMMdd.HHmm", TimeZone.getTimeZone('Asia/Jakarta'))
          publishHTML (target: [allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: '.',  reportFiles: 'snyk.html', reportName: "SnykCodeReports.${time}.html", reportTitles: "Snyk Code Reports ${time}"])
          numberofline = sh(script: "egrep '(0</strong> low issues|0</strong> medium issues|0</strong> high issues)' snyk.html | wc -l", returnStdout: true).trim()
          if (numberofline != '3') {
            echo " Vulnerabilities Found!!!! "
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') { sh 'exit 1' }
          } else { echo " === No Vulnerability Found === " }
          println "Scan Result can be viewed via ${env.RUN_ARTIFACTS_DISPLAY_URL}"
        }
      }
    } 

    stage('Snyk Open Source Vulnerability'){
      when { anyOf { branch "$ALLOWED_BRANCH" } }     
      steps {
        script {
          def now = new Date()
          time = now.format("yyMMdd.HHmm", TimeZone.getTimeZone('Asia/Jakarta'))
          publishHTML (target: [allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: '.',  reportFiles: 'snykOS.html', reportName: "SnykOpenSourceVulnerabilityReports.${time}.html", reportTitles: "Snyk Open Source Vulnerability Reports ${time}"])
          numberofline = sh(script: "egrep '(0</span> <span>known vulnerabilities|0 vulnerable dependency paths</span>)' snykOS.html | wc -l", returnStdout: true).trim()
          if (numberofline != '2') {
            echo " Vulnerabilities Found!!!! "
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') { sh 'exit 1' }
          } else { echo " === No Vulnerability Found === " }
          println "Scan Result can be viewed via ${env.RUN_ARTIFACTS_DISPLAY_URL}"
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
