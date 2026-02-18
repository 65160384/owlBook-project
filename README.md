# owlBook-project

## Description

[คำอธิบายโครงการ 2-3 ประโยค]

## Tech Stack

- Language: JavaScript
- Framework: Vue.js/Express
- Database: MySQL

## Prerequisites

- Java 11+ (or Node 14+, Python 3.8+)
- Maven/npm/pip
- MySQL/PostgreSQL

## Setup

### 1. Clone Repository

\`\`\`bash
git clone [repo-url]
cd [project-name]
\`\`\`

### 2. Install Dependencies

\`\`\`bash

# Java

mvn clean install

# Node.js

npm install

# Python

pip install -r requirements.txt
\`\`\`

### 3. Configure Database

\`\`\`bash

# Create database

mysql -u root -p < database/schema.sql

# Or use migrations

./mvn flyway:migrate
\`\`\`

### 4. Configure Environment

\`\`\`bash
cp .env.example .env

# Edit .env with your settings

\`\`\`

### 5. Run Application

\`\`\`bash

# Java

mvn spring-boot:run

# Node.js

npm start

# Python

python app.py
\`\`\`

Application runs at: http://localhost:8080

## Build & Test

\`\`\`bash

# Build

mvn clean package

# Test

mvn test

# Coverage

mvn jacoco:report
\`\`\`

## Git Workflow

1. Create branch: \`git checkout -b feature/feature-name\`
2. Make changes
3. Commit: \`git commit -m "feat: description"\`
4. Push: \`git push origin feature/feature-name\`
5. Create PR on GitHub
6. Request review (2+ reviewers)
7. Merge after approval

## Coding Standards

See [Coding_Standards.md](Coding_Standards.md)

## Contact

[Your Email/Slack]
