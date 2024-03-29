#!/usr/bin/env bash

user=ec2-user
host=$1
port=$2

src=`pwd`"/dist/"
des=/home/wwwroot/react-lister/
now=`date +"%Y-%m-%d %H:%M:%S"`

echo "将 $src 目录下的文件同步到 $host:$des 目录下"
rsync -zrc -e "ssh -p $port" --exclude '*.map' $src $user@$host:$des
echo "$now update $host $des code"
