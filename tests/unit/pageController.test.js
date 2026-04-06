const pageController = require('../../backend/src/controllers/pageController');
const episodeController = require('../../backend/src/controllers/episodeController');
const fs = require('fs');

function resFactory() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Page Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('uploadPages returns 400 when no files', () => {
    const req = { params: { id: 1, epId: 1 }, files: [] };
    const res = resFactory();
    pageController.uploadPages(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'No files uploaded' }));
  });

  test('replacePage returns 400 when no file', () => {
    const req = { params: { id: 1, epId: 1, pageId: 'page-1' } };
    const res = resFactory();
    pageController.replacePage(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'No file uploaded' }));
  });

  test('deletePage returns 404 when page not found', () => {
    jest.spyOn(episodeController, 'getEpisodePages').mockReturnValue([]);
    const req = { params: { id: 1, epId: 1, pageId: 'nonexistent' } };
    const res = resFactory();
    pageController.deletePage(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Page not found' }));
  });

  test('deletePage deletes file when page exists', () => {
    // Simulate actual getEpisodePages behavior by mocking filesystem
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['1.jpg', '2.png']);
    jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
    // page ids will be page-0 and page-1; delete page-1
    const req = { params: { id: 1, epId: 1, pageId: 'page-1' } };
    const res = resFactory();
    pageController.deletePage(req, res);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});
