pipeline {

    agent any

    stages {

        stage('Check Environment') {
            steps {
                sh '''
                    echo "===== Environment ====="
                    pwd
                    ls -al

                    echo "===== Node ====="
                    node -v
                    npm -v

                    echo "===== Docker ====="
                    docker --version

                    echo "===== Buildx ====="
                    docker buildx version || true

                    echo "===== Compose ====="
                    docker compose version || true
                '''
            }
        }

        stage('Install Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                        }
                    }
                }

                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm run build'
                        }
                    }
                }

                stage('Deploy') {
                            steps {
                                sh '''
                                    echo "⚡ 구형 docker-compose 규격으로 인프라 기동..."
                                    # 💡 하이픈(-)을 붙여서 젠킨스가 가진 레거시 바이너리를 타겟팅!
                                    docker-compose down || true
                                    docker-compose build
                                    docker-compose up -d
                                '''
                            }
                        }

                stage('Check Containers') {
                    steps {
                        sh '''
                            docker ps
                        '''
                    }
                }
            }

            post {

                success {
                    echo '========================'
                    echo '배포 완료'
                    echo '========================'

                    sh '''
                        docker ps
                    '''
                }

                failure {
                    echo '========================'
                    echo '배포 실패'
                    echo '========================'

                    sh '''
                        echo "===== Docker PS ====="
                        docker ps -a || true

                        echo "===== Docker Images ====="
                        docker images || true
                    '''
                }

                always {
                    sh 'docker ps || true'
                }
            }
        }