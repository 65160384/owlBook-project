### Classes - PascalCase

class UserService {}

### Functions - camelCase

function getUserById() {}

### Constants - UPPER_SNAKE_CASE

const MAX_RETRY = 3;

### Folder Structure

src/
├── controllers/
├── services/
├── models/
├── middleware/
├── utils/
└── config/

### File Naming

รูปแบบ: camel-case
ตัวอย่าง
- src/controllers/userController.js
- src/services/authService.js
- src/models/orderModel.js
- src/middleware/roleAuthMiddleware.js

## 3. Code Style
### ✓ Good Examples

```js
const activeUser = await getUserById(userId);
const retryLimit = 10;
function handleLoginRequest(req, res) { ... }
```

### ✗ Bad Examples
```js
const data = await get_user();
let x = 10;
function HandleReq(r, s) { ... }
```

### Why This Matters

การตั้งชื่อตัวแปรที่ไม่สื่อความหมาย ทำให้โค้ดอ่านยากขึ้น รวมถึงการใช้รูปแบบของฟังก์ชันผิดข้อตกลง

### Indentation
อนุญาตให้ใช้ Tab สำหรับการย่อหน้าโค้ด โดยต้องตั้งค่า 1 Tab = 2 Space
ใช้ 2 Space สำหรับการย่อหน้าโค้ด

### Line Length
ไม่มีข้อกำหนดความยาวอักษรในแต่ละบรรทัดตายตัว โค้ดที่ยาวเกินไปทำให้การอ่านโค้ดยากขึ้น
```
// ❌ Bad: บรรทัดยาวเกินไป อ่านยาก
const user = await db.users.update({ where: { id: userId }, data: { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, address: req.body.address } });
```

บังคับให้รูปแบบของโค้ดในแต่ละบรรทัดมีรูปแบบดังด้านล่างนี้ เพื่อให้อ่านง่ายที่สุด
```js
// ✅ Good: แบ่งบรรทัดให้สมดุล
const user = await db.users.update({
  where: { id: userId },
  data: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  },
});
```

### Braces & Spacing
ปีกกาต้องเปิดที่บรรทัดเดิมเสมอ และต้องเว้น 1 Space ที่หน้าปีกกาเปิด
```js
// ❌ Bad: ปีกกาขึ้นบรรทัดใหม่ และโค้ดติดกันเกินไป
if(user){
    login()
}

// ✅ Good: เว้นวรรคเหมาะสม
if (user) {
  login();
}
```

## 4. Comments & Documentation

### Class Comments
ต้องมีการอธิบายการใช้งานของคลาสแต่ละคลาสว่ามีการใช้งานอย่างไรบ้าง
ด้านล่างคือตัวอย่างที่ถูกต้องห
```js
/**
 * @class PaymentService
 * @description จัดการการชำระเงินผ่าน Gateway ต่างๆ และบันทึกประวัติธุรกรรม
 */
class PaymentService { ... }
```

### Method Comments
ต้องมีการอธิบายว่าฟังก์ชันแต่ละตัวมีการรับค่าอย่างไร อะไรบ้าง ส่งค่าอะไรกลับไป และมีการทำ Exception อย่างไรบ้าง
```js
/**
 * คำนวณราคาสุทธิหลังหักส่วนลด
 * @param {number} price - ราคาเต็ม
 * @param {string} couponCode - รหัสส่วนลด
 * @returns {Promise<number>} ราคาสุทธิ
 * @throws {InvalidCouponError} เมื่อรหัสคูปองไม่ถูกต้อง
 */
async function calculateTotal(price, couponCode) { ... }
```

### Inline Comments
เขียนเฉพาะโค้ดที่มีความซับซ้อนหรือโค้ดที่เหตุผลพิเศษเท่านั้น
```js
// ✅ Good: อธิบาย "เหตุผล" 
// ต้องรอ 500ms เพราะ Hardware เซนเซอร์ตอบสนองไม่ทัน
await sleep(500);

// ❌ Bad: อธิบาย "สิ่งที่ทำ" ซึ่งโค้ดบอกอยู่แล้ว
// ตรวจสอบว่า user มีค่าหรือไม่
if (user) { ... }
```

## 5. Error Handling

### Exception Types
ให้แยกประเภทของ Error แต่ละแบบโดยเฉพาะเพื่อให้ง่ายต่อการวิเคราะห์ปัญหา

```js
// ✅ Good: สร้าง Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// การใช้งาน
if (!user) throw new AppError('User not found', 404);
```

### Logging
ห้ามใช้ console.log ให้ใช้ Logger Library (เช่น Winston, Pino) และระบุ Level ให้ถูกต้อง
• info: เหตุการณ์ปกติ (เช่น "Server started")
• warn: สิ่งที่ผิดปกติแต่ระบบยังทำงานได้ (เช่น "User retry login")
• error: ระบบมีปัญหา (เช่น "Database connection failed")

## 6. Testing Standards
### Unit Test Naming
ใช้รูปแบบ it('should [คาดหวังอะไร] when [เงื่อนไขเป็นยังไง]')
```js
// ✅ Good
describe('AuthService.login', () => {
  it('should return a token when credentials are valid', async () => { ... });
  it('should throw UnauthorizedError when password is wrong', async () => { ... });
});
```

### Code Coverage
ขั้นต่ำ 80% แต่หาก 100% ให้ตีไว้เสมอว่าโค้ดมีบัคเสมอและมักจะอยู่ใน Bussiness Logic เป็นส่วนใหญ่ให้เน้นตรวจสอบที่ตรงนั้น

## 7. Code Review Guidelines

## Team Review & Approval

✅ Team members who reviewed:

- [x] Developer 1: 23/02/2026
- [x] Developer 2: 24/02/2026
- [x] Tech Lead: 24/02/2026

✅ Approved by: [Phatcha Saengphoema], 25/02/2026

Comments/Suggestions:
-