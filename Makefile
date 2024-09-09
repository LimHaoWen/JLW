export HOST_UID := $(shell id -u)

docker-start:
	colima start
	docker-compose up

docker-run:
	docker-compose up

docker-stop:
	docker-compose stop
	
docker-down:
	docker-compose stop
	colima stop

docker-build:
	docker build -t jlw .
