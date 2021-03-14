  
FROM golang

WORKDIR /

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS="./key.json"  

RUN go mod download

EXPOSE 4000

CMD ["go", "run", "pub.go"]