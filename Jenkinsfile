pipeline { 
    agent any 
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Test'){
            steps {
                sh "npm install"
                sh "npm run prettier"
                sh "npm run lint"
                sh "npm run test"
                junit 'reports/**/*.xml' 
            }
        }
    }
}
