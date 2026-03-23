# Code Review Checklist — owlBook-project

## Before Reviewing

- [ ] เข้าใจ scope ของ PR / งานที่แก้ไข
- [ ] อ่าน requirement หรือ user story ก่อนดูโค้ด
- [ ] ตรวจว่า code ตรงกับ ER Diagram / Database schema ล่าสุด

---

## Functionality & Business Logic

- [ ] ฟังก์ชันทำงานตรงตามที่ออกแบบไว้
- [ ] Handle null / empty / invalid input แล้ว
- [ ] ไม่มี hardcoded logic (เช่น status, type, role)
- [ ] Error message เข้าใจง่าย
- [ ] มี logging ในจุดสำคัญ (create / update / delete)

---

## Code Quality

- [ ] ชื่อตัวแปร / method สื่อความหมาย
- [ ] Method ไม่ยาวเกินไป (>30 บรรทัดควรแยก)
- [ ] ไม่มี duplicated code
- [ ] Format / indentation ถูกต้อง
- [ ] ไม่มี commented dead code

---

## Testing

- [ ] มี test สำหรับ logic หลัก
- [ ] Test ครอบคลุม positive + negative case
- [ ] ไม่มี test ที่ถูก skip
- [ ] Mock database / external service แล้ว
- [ ] Code coverage ≥ 80%

---

## Security

- [ ] ไม่มี hardcoded password / secret
- [ ] Validate input ทุก field
- [ ] ใช้ prepared statement / ORM (ป้องกัน SQL Injection)
- [ ] ตรวจ authorization ก่อน update / delete
- [ ] ไม่ expose sensitive data (password, token)

---

## Performance

- [ ] ไม่มี N+1 query
- [ ] Loop ไม่ซ้อนโดยไม่จำเป็น
- [ ] ใช้ index กับ FK สำคัญ
- [ ] Query ไม่ดึงข้อมูลเกินจำเป็น
- [ ] ไม่มี memory leak

---

## Database

- [ ] Table ใหม่มี Primary Key
- [ ] Foreign Key ถูกต้องตาม ER Diagram
- [ ] Schema อยู่ใน 3NF
- [ ] มี migration script
- [ ] รองรับ backward compatibility

---

## Documentation

- [ ] Method ที่ซับซ้อนมี comment อธิบาย
- [ ] Update README ถ้ามี feature ใหม่
- [ ] อธิบาย API endpoint (ถ้ามี)
- [ ] มี Data Dictionary ถ้าเพิ่ม table

---

## Review Etiquette

- ใช้คำสุภาพ
- แนะนำแทนสั่ง
- ชื่นชม code ที่ดี
- โฟกัส issue สำคัญก่อน

