const { verifyToken, resolveUser } = require('../../backend/src/controllers/authController');

function resFactory() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Auth Controller - middleware', () => {
  test('verifyToken without header returns 401', () => {
    const req = { headers: {} };
    const res = resFactory();
    const next = jest.fn();
    verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('resolveUser without header calls next', () => {
    const req = { headers: {} };
    const res = resFactory();
    const next = jest.fn();
    resolveUser(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('verifyToken with valid header calls next and sets req.user', () => {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: 42, role: 'member' }, process.env.JWT_SECRET || 'super_secret_owlbook_key', { expiresIn: '1h' });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = resFactory();
    const next = jest.fn();
    verifyToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(42);
  });
});
