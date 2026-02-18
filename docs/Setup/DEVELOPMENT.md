# Development Environment Setup Guide
เอกสารฉบับนี้จัดทำขึ้นเพื่อเป็นแนวทางสำหรับนักพัฒนาในทีม เพื่อตั้งค่าสภาพแวดล้อมในการพัฒนาโปรเจค OwlBook

## System Requirements

- OS: Windows 10
- RAM: 16GB สำหรับการรัน Vue และ Express พร้อมกัน
- Disk: 500MB free สำหรับไฟล์โปรเจคและ Node Modules

## Installation Steps
เนื่องจากโปรเจคเราใช้ **ExpressJS** สำหรับ Backend และ **Vue** สำหรับ Frontend นักพัฒนาควรเตรียมระบบดังนี้:

### For Java Developers

### 1. Install Node.js & MySQL
- **Node.js**: ติดตั้งเวอร์ชัน LTS (18.x หรือ 20.x) จาก [nodejs.org](https://nodejs.org/)
  ```bash
  node --version && npm --version # ตรวจสอบการติดตั้ง
- **MySQL**: ติดตั้ง MySQL Server 8.0+ และ MySQL Workbench
```bash
  brew install mysql
  mysql --version # ตรวจสอบการติดตั้ง
```

### 2. Clone Repository & Install Dependencies
- **Clone Project**: Clone โปรเจคจาก GitHub
   ```bash
    git clone https://github.com/65160384/owlBook-project.git
   
- **Switch to your branch**: สลับไป branch ตามชื่อของตนเอง
   ```bash
    git switch (ชื่อ Branch)
    git merge origin/main
    # ทำการ login
    cd owlbook
    ```
**ติดตั้ง Dependencies สำหรับ Backend** (Root Folder)
```bash
    npm install
 ```
**ติดตั้ง Dependencies สำหรับ Frontend** (ในโฟลเดอร์ที่เกี่ยวข้อง)
```bash
    cd src/main/frontend (หรือตามโครงสร้าง Vue ของทีม)
    npm install
   ```

### 3. Environment Configuration
- คัดลอกไฟล์ .env.example เป็น .env เพื่อกำหนดค่าคอนฟิก
  ```bash
   cp .env.example .env
   ```
- แก้ไขข้อมูลในไฟล์ .env ให้ตรงกับเครื่องของท่าน (เช่น รหัสผ่าน MySQL):
```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_mysql_password
   DB_NAME=owlbook
   PORT=3000
   ```
 ### 4. **Database Setup**
   นำสคริปต์ในโฟลเดอร์ database/ ไปรันใน MySQL เพื่อสร้างโครงสร้างฐานข้อมูลและข้อมูลทดสอบ:
   ```bash
      # 1. สร้าง Schema (Tables ต่างๆ ตาม ER Diagram)
      mysql -u root -p < database/schema.sql

      # 2. เพิ่มข้อมูลทดสอบ (Seed Data)
      mysql -u root -p < database/seeds.sql
   ```
 ### 5. **Run Application**
 เปิด Terminal 2 หน้าต่างเพื่อรัน Backend และ Frontend พร้อมกัน:
 - **หน้าต่างที่ 1**: Backend (ExpressJS)
```bash
   npm run dev
```
 - **หน้าต่างที่ 2**: Frontend (Vue)
```bash
   # ย้ายไปโฟลเดอร์ frontend ก่อน
   cd src/main/frontend
   npm run dev
```
## Verification

After setup, verify:

- [ ] Application runs: เข้าหน้าเว็บได้ที่ http://localhost:5173 (Vue) และ Backend ที่ http://localhost:3000
- [ ] Health check: http://localhost:3000/api/health → {"status":"UP"}
- [ ] Database connected: Check logs for success message
- [ ] All tests pass: \`npm test\` or \`mvn test\`

## Troubleshooting

### Port Already in Use
หาก Port ถูกใช้งานอยู่ ให้ใช้คำสั่งหา PID แล้วทำการปิดโปรเซส:
```bash
# สำหรับ Mac/Linux
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# สำหรับ Windows (PowerShell)
netstat -ano | findstr :3000
stop-process -Id <PID>
```
   
### Database Connection Failed

- Check MySQL is running: \`mysql -u root -p\`
- Verify .env file has correct credentials
- Check database exists: \`show databases;\`

### Dependencies Error
หากติดตั้ง npm modules ไม่ผ่านหรือติด Error ของ Version ให้รันคำสั่งดังนี้:
```bash
# ลบโฟลเดอร์และไฟล์ Lock เดิม
rm -rf node_modules package-lock.json

# ล้าง Cache และติดตั้งใหม่
npm cache clean --force
npm install
```
## IDE Setup

### VS Code

- Extensions: 
   - Volar: สำหรับการเขียน Vue 3
   - ESLint & Prettier: เพื่อจัด Format โค้ดตาม Coding_Standards.md
   - MySQL: สำหรับจัดการฐานข้อมูลภายในตัว Editor

- Settings: Format on save enabled
