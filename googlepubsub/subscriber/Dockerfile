  
FROM golang

WORKDIR /

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS="./key.json"  

RUN go mod download

EXPOSE 5000

CMD ["go", "run", "sub.go"]