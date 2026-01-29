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
        DOCKERHUB_USER   = "senujabodhinayake"
        BACKEND_IMAGE    = "mdf-backend"
        FRONTEND_IMAGE   = "mdf-medication-availability-finder"

        // ✅ Your backend public URL for frontend build
        // Later replace with domain or nginx /api
        VITE_API_URL     = "http://13.201.65.214:5000"

        // ✅ EC2 deploy target
        EC2_HOST         = "13.201.65.214"
        EC2_APP_DIR      = "~/medfinder"
    }

    stages {
        stage('Checkout Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/senujaBodhinayake/medication-finder.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:latest ./backend"
            }
        }

        stage('Build Frontend Image (Production)') {
            steps {
                // Builds Vite -> dist, then nginx serves on port 80
                sh """
                  docker build \
                    -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:latest \
                    --build-arg VITE_API_URL=${VITE_API_URL} \
                    ./medication-availability-finder
                """
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKERHUB_USER_CRED',
                    passwordVariable: 'DOCKERHUB_PASS_CRED'
                )]) {
                    sh """
                      echo "$DOCKERHUB_PASS_CRED" | docker login -u "$DOCKERHUB_USER_CRED" --password-stdin
                      docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:latest
                      docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:latest
                      docker logout
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                // Requires: Jenkins plugin "SSH Agent" and credential id 'ec2-ssh-key'
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh """
                      ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                        cd ${EC2_APP_DIR} &&
                        docker compose pull &&
                        docker compose up -d &&
                        docker ps
                      '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Built, pushed, and deployed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins console logs."
        }
        always {
            // Clean workspace images (optional). Keeps Jenkins node clean.
            sh "docker image prune -f || true"
        }
    }
}
