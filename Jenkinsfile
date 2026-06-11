pipeline {
    agent any

    environment {
        PATH = "/usr/bin:${env.PATH}"
    }

    stages {
        stage('Install') {
            steps {
                sh 'node -v'
                sh 'npm -v'

                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
    }
}