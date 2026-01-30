// // pipeline {
// //     agent any

// //     environment {
// //         DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
// //         DOCKERHUB_USER = 'senujabodhinayake'
// //         BACKEND_IMAGE = "${DOCKERHUB_USER}/mdf-backend"
// //         FRONTEND_IMAGE = "${DOCKERHUB_USER}/mdf-medication-availability-finder"
// //     }

// //     stages {
// //         stage('Checkout Repository') {
// //             steps {
// //                 git branch: 'main', url: 'https://github.com/senujabodhinayake/medication-finder.git'
// //             }
// //         }

// //         stage('Build Backend Image') {
// //             steps {
// //                 script {
// //                     docker.build("${BACKEND_IMAGE}:latest", "./backend")
// //                 }
// //             }
// //         }

// //         stage('Build Frontend Image') {
// //             steps {
// //                 script {
// //                     docker.build("${FRONTEND_IMAGE}:latest", "./medication-availability-finder")
// //                 }
// //             }
// //         }

// //         stage('Push Images to Docker Hub') {
// //             steps {
// //                 script {
// //                     docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
// //                         docker.image("${BACKEND_IMAGE}:latest").push()
// //                         docker.image("${FRONTEND_IMAGE}:latest").push()
// //                     }
// //                 }
// //             }
// //         }
// //     }

// //     post {
// //         success {
// //             echo "✅ Successfully built and pushed both images to Docker Hub!"
// //         }
// //         failure {
// //             echo "❌ Build failed! Please check logs."
// //         }
// //     }
// // }

// pipeline {
//     agent any

//     environment {
//         BACKEND_IMAGE = "mdf-backend"
//         FRONTEND_IMAGE = "mdf-medication-availability-finder"
//         DOCKERHUB_USER = "senujabodhinayake"
//     }

//     stages {
//         stage('Checkout Repository') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/senujaBodhinayake/medication-finder.git'
//             }
//         }

//         stage('Build Backend Image') {
//             steps {
//                 script {
//                     sh "docker build -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:latest ./backend"
//                 }
//             }
//         }

//         stage('Build Frontend Image') {
//             steps {
//                 script {
//                     sh "docker build -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:latest ./medication-availability-finder"
//                 }
//             }
//         }

//         stage('Push Images to Docker Hub') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-credentials',
//                     usernameVariable: 'DOCKERHUB_USER_CRED',
//                     passwordVariable: 'DOCKERHUB_PASS_CRED'
//                 )]) {
//                     script {
//                         // Login to Docker Hub
//                         sh "echo $DOCKERHUB_PASS_CRED | docker login -u $DOCKERHUB_USER_CRED --password-stdin"

//                         // Push backend image
//                         sh "docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:latest"

//                         // Push frontend image
//                         sh "docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:latest"

//                         // Logout for security
//                         sh "docker logout"
//                     }
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             echo "✅ Successfully built and pushed both images to Docker Hub!"
//         }
//         failure {
//             echo "❌ Build failed! Please check logs."
//         }
//     }
// }

pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "senujabodhinayake"
        BACKEND_IMAGE = "mdf-backend"
        FRONTEND_IMAGE = "mdf-medication-availability-finder"
        SERVER_IP = "13.201.65.214"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/senujaBodhinayake/medication-finder.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh "docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE:latest ./backend"
            }
        }

        stage('Build Frontend') {
            steps {
                sh """
                docker build \
                --build-arg VITE_API_URL=http://$SERVER_IP:5000 \
                -t $DOCKERHUB_USER/$FRONTEND_IMAGE:latest \
                ./medication-availability-finder
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $DOCKERHUB_USER/$BACKEND_IMAGE:latest
                    docker push $DOCKERHUB_USER/$FRONTEND_IMAGE:latest
                    docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
    steps {
        withCredentials([sshUserPrivateKey(
            credentialsId: 'ec2-ssh-key',
            keyFileVariable: 'SSH_KEY',
            usernameVariable: 'SSH_USER'
        )]) {
            sh """
            ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SSH_USER@$SERVER_IP '
                cd ~/medfinder
                docker compose pull
                docker compose down
                docker compose up -d
            '
            """
        }
    }
}

    }

    post {
        success {
            echo "✅ CI/CD Pipeline Completed Successfully!"
        }
        failure {
            echo "❌ Pipeline Failed!"
        }
    }
}
