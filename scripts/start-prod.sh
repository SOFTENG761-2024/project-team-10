docker-compose -f /home/ec2-user/give-it-a-good-name/docker-compose-prod.yml down
docker-compose -f /home/ec2-user/give-it-a-good-name/docker-compose-prod.yml rm -f
docker-compose -f /home/ec2-user/give-it-a-good-name/docker-compose-prod.yml up -d --build --force-recreate --verbose
