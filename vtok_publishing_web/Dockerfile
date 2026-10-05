# 1. 우분투 설치
FROM ubuntu:20.04

# 2. 메타데이터 표시
LABEL "i-sobox-web"="i-sobox-web"

# 3. 업데이트 및 아파치 설치
RUN apt-get update -y
RUN apt-get install wget -y





RUN wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb
RUN  apt-get update; \
   apt-get install -y apt-transport-https && \
   apt-get update && \
   apt-get install -y dotnet-sdk-6.0

RUN apt update
RUN apt install nodejs npm -y

WORKDIR /home/publish

COPY publish .

# 7. 포트 80번 노출 지정
EXPOSE 80
 
# 8. 컨테이너 생성시 시작명령어

CMD dotnet /home/publish/vtok_publishing_web.dll run
