# owlBook-project

## Description

OwlBook เป็นแพลตฟอร์มอ่านการ์ตูนออนไลน์ ที่ออกแบบมาเพื่อมอบประสบการณ์การอ่านที่สะดวก โดยรองรับการค้นหาการ์ตูน การจัดการรายการที่ถูกใจ และระบบปลดล็อกตอนการ์ตูนด้วยเหรียญ

## Tech Stack

- **Language**: Node.js (JavaScript)
- **Framework**: Express.js (Backend), Vue.js (Frontend)
- **Database**: MySQL

## Prerequisites

- Node.js 18+
- npm (Node Package Manager)
- MySQL 8.0+

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/65160384/owlBook-project.git
cd owlBook-project
```

### 2. Install Dependencies

```bash
# ติดตั้ง Dependencies สำหรับ Backend (Root Folder)
npm install

# ติดตั้ง Dependencies สำหรับ Frontend
cd src/main/frontend
npm install
cd ../../../
```

# Node.js
```bash
npm install
```
### 3. Configure Database

```bash
# สร้างฐานข้อมูลและตารางตามโครงสร้าง 3NF
mysql -u root -p < database/schema.sql

# เพิ่มข้อมูลเริ่มต้น (Seed Data)
mysql -u root -p < database/seeds.sql
```

### 4. Configure Environment

```bash
# สร้างไฟล์ตั้งค่าสภาพแวดล้อม
cp .env.example .env

# แก้ไขไฟล์ .env ด้วยข้อมูลการเชื่อมต่อ MySQL ของคุณ

```
### 5. Run Application

```bash
# เริ่มการทำงานของระบบ (Backend รันที่ http://localhost:3000)
npm run dev

# เริ่มการทำงานของส่วนติดต่อผู้ใช้ (Frontend รันที่ http://localhost:5173)
cd src/main/frontend
npm run dev
```
# Node.js
```bash
npm start
```
Application runs at: http://localhost:8080

## Build & Test

```bash
# Build Frontend สำหรับการใช้งานจริง
npm run build

# รันการทดสอบระบบ
npm test
```
## Git Workflow

1. **Create branch**: git checkout -b feature/feature-name (อ้างอิงตามหมายเลข UC เช่น feature/uc-11-purchase)
2. Make changes
3. **Commit**: git commit -m "feat: [UC-XX] description"
4. **Push**: git push origin feature/feature-name
5. **Create PR** (Pull Request) บน GitHub
6. **Request review** (ต้องการอย่างน้อย 1 Approve จากทีมหรือ PO)
7. **Merge** หลังจากได้รับการอนุมัติ

## Coding Standards

See [Coding_Standards.md](Coding_Standards.md)

## Contact
- Phatcha Sangperm (Project Owner) 65160384@go.buu.ac.th
- Sirima Pralao (Scrum Master) 65160024@go.buu.ac.th
- Nathawat Thampanya (Dev1) 65160375@go.buu.ac.th
- Chompunut Rueangrit(Dev2) 65160029@go.buu.ac.th
- Piyada Chokchai (Qa1) 65160261@go.buu.ac.th
- Pasin Yujiseree (Qa2) 65160119@go.buu.ac.th 

