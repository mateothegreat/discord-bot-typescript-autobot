#                                 __                 __
#    __  ______  ____ ___  ____ _/ /____  ____  ____/ /
#   / / / / __ \/ __ `__ \/ __ `/ __/ _ \/ __ \/ __  /
#  / /_/ / /_/ / / / / / / /_/ / /_/  __/ /_/ / /_/ /
#  \__, /\____/_/ /_/ /_/\__,_/\__/\___/\____/\__,_/
# /____                     matthewdavis.io, holla!
#
include .make/Makefile.inc

VERSION 	?= $(shell git rev-parse HEAD)
IMAGE   	?= registry.gitlab.com/matthewdavis.io/autobots/discord-bot-typescript-autobot:$(VERSION)

APP			?= discord-bot-typescript-autobot
NS			?= default
TOKEN		?= NTQ4Nzg1NTA4NTkxODYxNzYw.D1NgXA.sBRq_2dQ6EgGo6CMphJKqb_u0ew
OWNER_ID 	?=
PORT		?= 8080

.PHONY: build

all: build push

build: 		; docker build -t $(IMAGE) .
run: 		; docker run -it $(IMAGE)
push:		; docker push $(IMAGE)

kubeme:

	kubectl config use-context md
