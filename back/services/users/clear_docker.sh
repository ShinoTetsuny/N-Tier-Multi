#!/bin/bash

# Remove all containers
echo "Removing all containers..."
docker rm $(docker ps -aq) 2>/dev/null || true

# Remove all volumes
echo "Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || true

# Remove all networks
echo "Removing all networks..."
docker network rm $(docker network ls -q) 2>/dev/null || true

# Final cleanup
echo "Performing system prune..."
docker system prune -af --volumes

echo "Docker cleanup complete!"
