module.exports = class BaseModel {
  constructor(id, createdAt, updatedAt) {
    this.id = id;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
};
