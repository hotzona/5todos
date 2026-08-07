const fs = require('fs');
const path = require('path');

const todosPath = path.join(__dirname, 'data', 'todos.json');
const outputDir = path.join(__dirname, 'data', 'todos');
const indexPath = path.join(__dirname, 'data', 'index.json');

// Ensure data/todos directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  const rawData = fs.readFileSync(todosPath, 'utf8');
  const allTodos = JSON.parse(rawData);

  const indexList = [];

  allTodos.forEach((item) => {
    // 1. Build index entry (lightweight search metadata)
    indexList.push({
      id: item.id,
      title: item.title,
      category: item.category,
      tags: item.tags || []
    });

    // 2. Build full individual todo file
    const filePath = path.join(outputDir, `${item.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item, null, 2), 'utf8');
  });

  // 3. Write data/index.json
  fs.writeFileSync(indexPath, JSON.stringify(indexList, null, 2), 'utf8');

  console.log(`Success! Converted ${allTodos.length} items.`);
  console.log(`Created: data/index.json`);
  console.log(`Created: ${allTodos.length} files in data/todos/`);

} catch (err) {
  console.error('Error during conversion:', err);
}