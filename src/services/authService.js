class AuthService {
  constructor() {
    this.users = [];
  }

  async register(userData) {
    const { email, password, firstName } = userData;
    if (this.users.find((u) => u.email === email)) {
      throw new Error("Email already exists");
    }
    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    const user = {
      id: this.users.length + 1,
      email,
      password: `hashed_${password}`,
      firstName: firstName || null,
    };
    this.users.push(user);
    const token = `token-${user.id}`;
    return { ...user, token };
  }

  async login({ email, password }) {
    const user = this.users.find((u) => u.email === email);
    if (!user || user.password !== `hashed_${password}`) {
      throw new Error("Invalid credentials");
    }
    return { user, token: `token-${user.id}` };
  }

  validateToken(token) {
    if (!token) return null;
    const parts = token.split("-");
    if (parts.length !== 2) return null;
    const id = Number(parts[1]);
    const user = this.users.find((u) => u.id === id);
    return user ? { userId: id } : null;
  }
}

module.exports = AuthService;
