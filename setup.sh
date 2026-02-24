# setup.sh

#!/bin/bash

echo "Setting up project..."

# 1. Install dependencies
echo "Installing dependencies..."
if [ "$1" = "java" ]; then
    mvn clean install
elif [ "$1" = "node" ]; then
    npm install
elif [ "$1" = "python" ]; then
    pip install -r requirements.txt
fi

# 2. Setup Database
echo "Setting up database..."
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seeds.sql

# 3. Create environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created. Please update with your settings."
fi

# 4. Build application
echo "Building application..."
if [ "$1" = "java" ]; then
    mvn clean package
elif [ "$1" = "node" ]; then
    npm run build
fi

echo "✅ Setup complete!"
echo "Run: npm start (or mvn spring-boot:run for Java)"