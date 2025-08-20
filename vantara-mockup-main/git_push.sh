#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "Error: .env file not found!"
    exit 1
fi

# Check if variables are set
if [ -z "$GITHUB_USERNAME" ] || [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: Please set GITHUB_USERNAME and GITHUB_TOKEN in .env file"
    exit 1
fi

# Push to GitHub
echo "Pushing to GitHub as $GITHUB_USERNAME..."
echo ""

# Push master branch
echo "Pushing master branch..."
git push https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/bamigos-com/vantara-mockup.git master

# Push cooler-ui branch
echo ""
echo "Pushing cooler-ui branch..."
git push https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/bamigos-com/vantara-mockup.git cooler-ui

echo ""
echo "Push complete!"