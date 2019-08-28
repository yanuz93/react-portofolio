#!/bin/bash
docker stop react-port
docker rm react-port
docker rmi mathricks/react-port:cobaCICD
docker run -d --name react-port -p 5000:5000 mathricks/react-port:cobaCICD
