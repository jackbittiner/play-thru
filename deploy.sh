#!/bin/sh

setup_git() {
  git config --global user.email "jackbittiner@hotmail.com"
  git config --global user.name "jackbittiner"
}

deploy_to_heroku() {
  git push https://git.heroku.com/play-thru-api.git HEAD:master
  git push https://git.heroku.com/play-thru.git HEAD:master
}

display_netrc_file_for_debugging_purposes
setup_git
deploy_to_heroku