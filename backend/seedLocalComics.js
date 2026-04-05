const fs = require('fs');
const path = require('path');
const { sequelize, User, Role, Cartoon, CartoonEpisode, CartoonCategory } = require('./src/models');
const bcrypt = require('bcryptjs');
const comicsDir = path.join(__dirname, './uploads/comics');
async function runSeeder() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connected and synced to MySQL. Starting seeding from backend uploads...');
    const [adminRole] = await Role.findOrCreate({ where: { name: 'admin' } });
    const [providerRole] = await Role.findOrCreate({ where: { name: 'provider' } });
    await Role.findOrCreate({ where: { name: 'member' } });
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.findOrCreate({
      where: { email: 'admin@owlbook.com' },
      defaults: {
        password: adminPassword,
        roles_id: adminRole.id,
        coin: 9999
      }
    });
    if (!fs.existsSync(comicsDir)) {
      console.error(`Directory not found: ${comicsDir}`);
      process.exit(1);
    }
    const folders = fs.readdirSync(comicsDir).filter(f => fs.lstatSync(path.join(comicsDir, f)).isDirectory());
    for (const folderName of folders) {
      const indexPath = path.join(comicsDir, folderName, 'index.json');
      if (!fs.existsSync(indexPath)) continue;
      const info = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      const title = info.name || folderName.replace(/-/g, ' ');
      console.log(`Processing: ${title}...`);
      const authorRaw = info.author || 'Unknown Author';
      const sanitized = authorRaw.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const mockEmail = `${sanitized.substring(0, 20)}@author.owlbook.com`;
      const mockPassword = await bcrypt.hash('secret123', 10);
      const [authorUser] = await User.findOrCreate({
        where: { email: mockEmail },
        defaults: {
          password: mockPassword,
          roles_id: providerRole.id,
          coin: 0
        }
      });
      const folderPath = path.join(comicsDir, folderName);
      const coverFile = fs.readdirSync(folderPath).find(f => f.toLowerCase().startsWith('cover.') && ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(f).toLowerCase()));
      const coverRelPath = coverFile ? `/uploads/comics/${folderName}/${coverFile}` : null;
      const [cartoon, created] = await Cartoon.findOrCreate({
        where: { name: title },
        defaults: { 
          description: info.description || ''
        }
      });
      if (!created) {
        await cartoon.update({ 
          description: info.description || cartoon.description
        });
      }
      await cartoon.addAuthors([authorUser]);
      if (info.tags && Array.isArray(info.tags)) {
        for (const tag of info.tags) {
          const [category] = await CartoonCategory.findOrCreate({ where: { name: tag } });
          await cartoon.addCategories([category]);
        }
      }
      if (info.episodes && Array.isArray(info.episodes)) {
        const sortedEpisodes = [...info.episodes].sort((a, b) => a.number - b.number);
        for (const ep of sortedEpisodes) {
          await CartoonEpisode.findOrCreate({
            where: { cartoon_id: cartoon.id, number: ep.number },
            defaults: {
              title: ep.title || `Episode ${ep.number}`,
              price: ep.price || 0
            }
          });
        }
      }
    }
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}
runSeeder();
