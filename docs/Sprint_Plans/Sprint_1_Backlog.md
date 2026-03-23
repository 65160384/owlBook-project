# Sprint 1 Backlog

## Sprint Information

Sprint 1 (22 มกราคม  2569 – 19 กุมภาพันธ์ 2569)  
Duration: 4 สัปดาห์ 
Sprint Goal: ให้ผู้ใช้สามารถสมัครสมาชิก เข้าสู่ระบบ ออกจากระบบ ดูรายการ ค้นหา ดูรายละเอียด และอ่านตอนการ์ตูนได้  

---

## Sprint Backlog

### User Story 1: สมัครสมาชิก 

- Story Points: 5  
- Priority: High  

- Task 1.1: ออกแบบตาราง users (Backend Dev)  
- Task 1.2: เขียน API register (Backend Dev)
- Task 1.3: ทำ validation รูปแบบอีเมลและรหัสผ่าน (Backend Dev)  
- Task 1.4: พัฒนา UI หน้า register (Frontend Dev)  
- Task 1.5: Functional test (QA)  

---

### User Story 2: เข้าสู่ระบบ 

- Story Points: 3  
- Priority: High  

- Task 2.1: เขียน API login (Backend Dev)  
- Task 2.2: ตรวจสอบ email/password (Backend Dev)  
- Task 2.3: สร้าง JWT และกำหนด expiration (Backend Dev)  
- Task 2.4: พัฒนา UI หน้า login (Frontend Dev)  
- Task 2.5: Integration test (QA)  

---

### User Story 3: ออกจากระบบ 

- Story Points: 2  
- Priority: High  

- Task 3.1: เขียน API logout (Backend Dev)  
- Task 3.2: ยกเลิก JWT / Session (Backend Dev)  
- Task 3.3: Redirect กลับหน้าแรก (Frontend Dev)  
- Task 3.4: ทดสอบ protected route (QA)  

---

### User Story 4: แสดงการ์ตูนหน้า Main Page 

- Story Points: 5  
- Priority: High  

- Task 4.1: ออกแบบตาราง cartoons (Backend Dev)  
- Task 4.2: เขียน API ดึงรายการทั้งหมด (Backend Dev)  
- Task 4.3: พัฒนา UI หน้า Main Page (Frontend Dev)  
- Task 4.4: ทดสอบการแสดงผลข้อมูล (QA)  

---

### User Story 5: ค้นหาการ์ตูน 

- Story Points: 5  
- Priority: High  

- Task 5.1: เขียน API search (Backend Dev)  
- Task 5.2: พัฒนา UI ช่องค้นหา (Frontend Dev)  
- Task 5.3: แสดงผลลัพธ์และกรณีไม่พบข้อมูล (Frontend Dev)  
- Task 5.4: Functional test (QA)  

---

### User Story 6: กรองตามหมวดหมู่ 

- Story Points: 3  
- Priority: Medium  

- Task 6.1: เพิ่มฟิลด์ category ในฐานข้อมูล (Backend Dev)  
- Task 6.2: เขียน API filter by category (Backend Dev)  
- Task 6.3: พัฒนา dropdown filter (Frontend Dev)  
- Task 6.4: ทดสอบกรณีไม่มีข้อมูล (QA)  

---

### User Story 7: ดูรายละเอียดการ์ตูน 

- Story Points: 5  
- Priority: High  

- Task 7.1: ออกแบบตาราง episodes (Backend Dev)  
- Task 7.2: เขียน API ดึงรายละเอียด (Backend Dev)  
- Task 7.3: พัฒนา UI หน้า detail (Frontend Dev)  
- Task 7.4: Integration test (QA)  

---

### User Story 8: อ่านตอนการ์ตูน 

- Story Points: 8  
- Priority: High  

- Task 8.1: พัฒนาหน้าอ่านแนวตั้ง (Frontend Dev)  
- Task 8.2: API ดึงภาพแต่ละตอน (Backend Dev)  
- Task 8.3: ปุ่มก่อนหน้า/ถัดไป (Frontend Dev)  
- Task 8.4: Responsive test (QA)  
- Task 8.5: Integration test (QA)  

---

## Sprint Capacity

- Total Story Points: 36 points  
- Estimated Velocity: 32–40 points  
- Status: Realistic  

---

## Team Allocation

- Backend Dev : Story 1- 8
- Frontend Dev : UI ทุกหน้า  
- QA : Functional & Integration Tests ทุก Story  
- Scrum Master: ดูแล process  
- Product Owner: รับรองงาน  

---

## Sprint Ceremonies

- Daily Standup: 10:00 (15 นาที)  
- Sprint Review: 19 กุมภาพันธ์ 2569  
- Sprint Retrospective: 19 กุมภาพันธ์ 2569  

---

## Definition of Done (Global)

- [ ] Code ผ่าน linter และไม่มี error  
- [ ] ผ่าน functional test  
- [ ] ผ่าน integration test  
- [ ] Protected routes ทำงานถูกต้อง  
- [ ] Responsive บน Desktop และ Mobile  
- [ ] PO ตรวจรับและยอมรับงาน  

---

## Story Point Estimation Method

ทีมใช้ Fibonacci Scale ในการประเมิน Story Points ระหว่าง Sprint Planning โดยพิจารณาจาก

- ความซับซ้อนของงาน (Complexity)
- ความพยายามที่ใช้ (Effort)
- ความเสี่ยง (Risk)
- ปริมาณงาน (Scope)

Story Points ไม่ได้อิงเฉพาะจำนวนชั่วโมง แต่ใช้การเทียบระดับความยากของงานเป็นหลัก

### Story Point Reference Guide

- 1 Point ≈ งานเล็กมาก (~2 ชั่วโมง)
- 2 Points ≈ งานเล็ก (~4 ชั่วโมง)
- 3 Points ≈ งานปานกลาง (~6 ชั่วโมง)
- 5 Points ≈ งานค่อนข้างซับซ้อน (~10 ชั่วโมง)
- 8 Points ≈ งานซับซ้อน ต้องออกแบบและทดสอบหลายส่วน (~16 ชั่วโมง)
- 13 Points ≈ งานซับซ้อนสูง มีความเสี่ยง (~26 ชั่วโมง)

---

## Capacity Calculation

- Team Size: 6 คน
- Sprint Duration: 10 วันทำงาน
- Working Hours: 8 ชั่วโมงต่อวัน

Total Capacity = 6 × 10 × 8 = 480 ชั่วโมง

หักเวลาประชุม (Standup, Review, Retro) และเวลารบกวนอื่น ๆ ประมาณ 50 ชั่วโมง

Available Development Time ≈ 430 ชั่วโมง

อ้างอิงค่าเฉลี่ย 1 Story Point ≈ 10 ชั่วโมง

Estimated Capacity ≈ 43 Story Points

เพื่อป้องกันความเสี่ยง ทีมกัน buffer ไว้ประมาณ 20%

Conservative Commitment ≈ 34–36 Story Points

Sprint 1 มีทั้งหมด 36 Story Points  
ซึ่งอยู่ในขอบเขต Conservative Commitment และสามารถดำเนินการได้ภายใต้การติดตามความคืบหน้าอย่างใกล้ชิดใน Daily Standup

---

##Dependency

- Story 2 (Login) depends on Story 1 (Register)
- Story 7 (Detail) depends on Story 4 (Main Page)
- Story 8 (Read Episode) depends on Story 7 (Detail)
