export HOST_UID := $(shell id -u)

build:
	go build -o bin/jlw ./cmd/

run : build		
	./bin/jlw

docker-start:
	colima start
	cd ./infra && docker-compose up

docker-run:
	cd ./infra && docker-compose up

docker-stop:
	cd ./infra && docker-compose stop
	
docker-down:
	cd ./infra && docker-compose stop
	colima stop

docker-build:
	docker build -t jlw .
