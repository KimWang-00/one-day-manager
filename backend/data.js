const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

let db = {
  managers: [],
  activities: [],
  posts: [],
  users: [],
  orders: [],
  tickets: []
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadData() {
  ensureDataDir();
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      db = JSON.parse(content);
    } catch (e) {
      console.error('加载数据失败，使用默认数据', e.message);
    }
  }
}

function saveData() {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

function generateId() {
  return uuidv4();
}

loadData();

module.exports = {
  db,
  saveData,
  generateId,
  loadData
};
