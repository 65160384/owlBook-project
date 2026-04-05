const sequelize = require('../config/database');
const Role = require('./Role');
const User = require('./User');
const Cartoon = require('./Cartoon');
const CartoonEpisode = require('./CartoonEpisode');
const Payment = require('./Payment');
const CartoonCategory = require('./CartoonCategory');
const CartoonsCategoryList = require('./CartoonsCategoryList');
const AuthorCartoon = require('./AuthorCartoon');
const UserCartoonHistory = require('./UserCartoonHistory');
const UserFavorite = require('./UserFavorite');
Role.hasMany(User, { foreignKey: 'roles_id' });
User.belongsTo(Role, { foreignKey: 'roles_id' });
Cartoon.hasMany(CartoonEpisode, { foreignKey: 'cartoon_id', as: 'episodes' });
CartoonEpisode.belongsTo(Cartoon, { foreignKey: 'cartoon_id' });
User.hasMany(Payment, { foreignKey: 'users_id' });
Payment.belongsTo(User, { foreignKey: 'users_id' });
User.hasMany(UserCartoonHistory, { foreignKey: 'user_id', as: 'histories' });
UserCartoonHistory.belongsTo(User, { foreignKey: 'user_id' });
UserCartoonHistory.belongsTo(CartoonEpisode, { foreignKey: 'cartoon_ep_id', as: 'episode' });
CartoonEpisode.hasMany(UserCartoonHistory, { foreignKey: 'cartoon_ep_id' });
User.hasMany(UserFavorite, { foreignKey: 'user_id', as: 'favorites' });
UserFavorite.belongsTo(User, { foreignKey: 'user_id' });
UserFavorite.belongsTo(Cartoon, { foreignKey: 'cartoons_id', as: 'cartoon' });
Cartoon.hasMany(UserFavorite, { foreignKey: 'cartoons_id' });
Cartoon.belongsToMany(CartoonCategory, { through: CartoonsCategoryList, foreignKey: 'cartoons_id', as: 'categories' });
CartoonCategory.belongsToMany(Cartoon, { through: CartoonsCategoryList, foreignKey: 'cartoon_categories_id', as: 'cartoons' });
User.belongsToMany(Cartoon, { through: AuthorCartoon, foreignKey: 'users_id', as: 'authoredCartoons' });
Cartoon.belongsToMany(User, { through: AuthorCartoon, foreignKey: 'cartoons_id', as: 'authors' });
module.exports = {
  sequelize,
  Role,
  User,
  Cartoon,
  CartoonEpisode,
  Payment,
  CartoonCategory,
  CartoonsCategoryList,
  AuthorCartoon,
  UserCartoonHistory,
  UserFavorite
};
