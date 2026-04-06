# owlBook-project

## Description

OwlBook เป็นแพลตฟอร์มอ่านการ์ตูนออนไลน์ ที่ออกแบบมาเพื่อมอบประสบการณ์การอ่านที่สะดวก โดยรองรับการค้นหาการ์ตูน การจัดการรายการที่ถูกใจ และระบบปลดล็อกตอนการ์ตูนด้วยเหรียญ

## Tech Stack

- **Language**: Node.js (JavaScript)
- **Framework**: Express.js (Backend), Vue.js (Frontend)
- **Database**: MySQL
- **Testing**: Jest (Unit & Integration Testing)
- **Linting**: ESLint v10

## Prerequisites

- Node.js 22+
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
# ติดตั้ง Dependencies ทั้งหมด (Root, Backend, Frontend)
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
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
# เริ่มการทำงานของระบบ (Backend รันที่ http://localhost:4000)
cd src/backend
npm start
cd ..

# เริ่มการทำงานของส่วนติดต่อผู้ใช้ (Frontend รันที่ http://localhost:5173)
cd src/frontend
npm run dev
```
## Build & Test

```bash
# Build Frontend สำหรับการใช้งานจริง
npm run build

# รันการทดสอบระบบ
npm test
```
### การทดสอบและควบคุมคุณภาพ (Quality Assurance) 

เพื่อให้เป็นไปตามมาตรฐานการประกันคุณภาพในรายงาน D4 ทีมงานมีการติดตามตัวชี้วัดดังนี้: 

- รันการทดสอบและดู Coverage:
```bash
npm run test:coverage
```
- ตรวจสอบ Static Analysis (ความซับซ้อนของโค้ด):
```bash
npx eslint frontend/src backend/src
```
- นับจำนวนบรรทัดโค้ด (LOC):
```bash
npx sloc backend/src/ frontend/src/ --exclude node_modules
```
### ประตูคุณภาพ (Quality Gates) 
โครงการกำหนดเกณฑ์คุณภาพพื้นฐานไว้ดังนี้: 

- ความครอบคลุมการทดสอบ (Coverage): >= 80%
- ความซับซ้อนของฟังก์ชัน (Complexity): <= 10
- อัตราการผ่านการทดสอบ (Pass Rate): 100 %
- มาตรฐานเอกสาร: อ้างอิงมาตรฐาน IEEE 830 และ ISO/IEC 12207


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
