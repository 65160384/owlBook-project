# Test Plan Document

## 1. Introduction

* **Project:** OwlBook Online Comic Reading Platform
* **Version:** 1.0
* **Date:** 13 March 2026
* **Author:** Scrum Master

OwlBook เป็นแพลตฟอร์มอ่านการ์ตูนออนไลน์ที่ช่วยให้ผู้ใช้สามารถค้นหา อ่าน และจัดการรายการการ์ตูนได้อย่างสะดวก โดยระบบมีฟีเจอร์สำคัญ เช่น การค้นหาการ์ตูน การเพิ่มรายการโปรด และการปลดล็อกตอนการ์ตูนด้วยเหรียญ

เอกสาร Test Plan นี้จัดทำขึ้นเพื่อกำหนดขอบเขต กลยุทธ์ และเครื่องมือที่ใช้ในการทดสอบระบบ เพื่อให้มั่นใจว่าระบบ OwlBook ทำงานได้ถูกต้อง มีความเสถียร และตรงตามความต้องการของผู้ใช้

---

## 2. Testing Scope

### Features to Test

ฟีเจอร์หลักที่ต้องทำการทดสอบ

1. **User Authentication**

   * User registration
   * User login
   * User logout

2. **Comic Search**

   * Search comic by name
   * Display comic list

3. **Favorite System**

   * Add comic to favorites
   * Remove comic from favorites

4. **Comic Reading**

   * View comic details
   * Read comic episodes

5. **Coin System**

   * Unlock comic episode using coins
   * Deduct coins from user account

6. **Admin Management**

   * Add new comic
   * Edit comic information
   * Delete comic

---

### Features NOT Tested

ฟีเจอร์ที่อยู่นอกขอบเขตการทดสอบ

* External payment gateway
* Email notification service
* Third-party APIs

---

## 3. Testing Strategy

### Unit Testing

Unit testing ใช้สำหรับทดสอบฟังก์ชันหรือ logic ในระดับ module

* **Framework:** Jest
* **Scope:** อย่างน้อย 15 test cases
* **Coverage Target:** ≥ 80%

Modules ที่ทำการทดสอบ

* Auth Service
* Comic Service
* Favorite Service
* Coin Service
* Utility Functions

ตัวอย่างสิ่งที่ทดสอบ

* ตรวจสอบการ login ของผู้ใช้
* ตรวจสอบการค้นหาการ์ตูน
* ตรวจสอบการเพิ่มการ์ตูนในรายการโปรด
* ตรวจสอบการใช้เหรียญปลดล็อกตอน

---

### Integration Testing

Integration testing ใช้ทดสอบการทำงานร่วมกันระหว่าง module ต่าง ๆ

* **Scope:** อย่างน้อย 5 test suites
* **Tools:** Supertest / Postman

สิ่งที่ทำการทดสอบ

1. **Authentication Flow**
   Register → Login → Access protected route

2. **Comic API**

   * GET /api/comics
   * GET /api/comics/search

3. **Favorite System**

   * Add favorite
   * View favorites
   * Remove favorite

4. **Coin Unlock System**

   * Unlock episode
   * Deduct coins
   * Update database

5. **Database Operations**

   * Create
   * Read
   * Update
   * Delete (CRUD)

---

### System Testing (End-to-End)

System testing ใช้ทดสอบ workflow การใช้งานจริงของผู้ใช้

Scenarios

1. User registers and logs in
2. User searches for comics
3. User reads comic episodes
4. User unlocks premium episodes using coins
5. User manages favorite comics

---

### User Acceptance Testing (UAT)

UAT เป็นการทดสอบกับผู้ใช้จริงเพื่อยืนยันว่าระบบตรงตามความต้องการ

ผู้ทดสอบ

* Product Owner
* QA Team

สถานการณ์ที่ทดสอบ

1. Register and login
2. Search comic
3. Add comic to favorites
4. Unlock comic episode using coins
5. Admin manage comics

---

## 4. Test Tools & Environment

| Category            | Tool                 |
| ------------------- | -------------------- |
| Unit Testing        | Jest                 |
| Integration Testing | Supertest            |
| API Testing         | Postman              |
| e2e Testing         | Playwright           |
| Backend             | Node.js + Express.js |
| Frontend            | Vue.js               |
| Database            | MySQL                |

Environment

* Node.js 18+
* MySQL 8+
* Windows development environment

---

## 5. Test Metrics

### Coverage Target

* **Line Coverage:** ≥ 80%

### Success Criteria

* All unit tests pass
* Integration tests pass
* Coverage ≥ 80%
* No critical bugs found

### Performance Targets

* Test execution time < 2 minutes
* API response time < 500 ms

---

## Test Approval

Scrum Master: 65160024 Sirima
Product Owner: 65160384 Patcha