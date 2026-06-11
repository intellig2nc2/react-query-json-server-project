docker build -t jenkins-server .

jenkins 완전 제거 : docker build --no-cache -t my-jenkins .

윈도우용
docker run -d `
  --name jenkins-server `
  -p 8080:8080 `
  -p 50000:50000 `
  -v jenkins_home:/var/jenkins_home `
  -v /var/run/docker.sock:/var/run/docker.sock `
  jenkins-server

  비밀번호
 22a7a14fbbbc4d7fbb596aa548e75630

jenkins 서버 설정
파이프라인-> SCM(Definition) -> Repository URL(깃허브 code에서 복붙) -> Branch Specifier(master-> main)

  비밀번호 확인
  docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword

jenkins 초기화
docker rmi my-jenkins
docker build --no-cache -t my-jenkins .
docker rm -f jenkins

docker rmi -f my-jenkins

docker volume rm jenkins_home

docker builder prune -af

docker system prune -af

docker build --no-cache -t my-jenkins .

리눅스용
docker run -d \
  --name jenkins-server \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins-server

ls -al

docker exec -it jenkins-server bash

docker --version