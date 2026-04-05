const { getEpisodePages } = require('../../backend/src/controllers/episodeController');
const fs = require('fs');

describe('Episode Controller - getEpisodePages', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns empty array when no directories exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const pages = getEpisodePages(1, 2, 3);
    expect(Array.isArray(pages)).toBe(true);
    expect(pages.length).toBe(0);
  });

  test('returns sorted image pages when files exist', () => {
    jest.spyOn(fs, 'existsSync').mockImplementation((p) => true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['2.png', '10.jpg', '1.jpg']);
    const pages = getEpisodePages(1, 2, 3);
    expect(pages.length).toBe(3);
    expect(pages[0].path).toMatch(/1\.jpg$/);
    expect(pages[1].path).toMatch(/2\.png$/);
    expect(pages[2].path).toMatch(/10\.jpg$/);
  });
});
