#!/bin/bash

#if [ -z "$1" ]
#then
	#echo "Local install"
	#sudo rsync -av prosilver ${HOME}/ukrgb/phpbb/styles/
#el

if [ "$1" == "area51" ]
then
    echo "Install on Area 51"
    SSH="ssh -i ${HOME}/.ssh/Area51.pem"
    rsync -av -e "$SSH" ukrgb-prosilver ubuntu@area51.ukriversguidebook.co.uk:/var/www/ukrgb/phpbb/styles/
elif [ "$1" == "dist" ]
then
	echo "Create zip"
	tar -cvzf prosilver.zip prosilver/
else
     echo "NO INSTALL"
fi
