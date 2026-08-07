let indexTodos = [];
let filteredIndex = [];
let currentCategory = 'all';
let currentSearchQuery = '';

// Safely get DOM elements
const getEl = (id) => document.getElementById(id);

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  fetchIndex();
  setupEventListeners();
});

// 1. Fetch data/index.json
async function fetchIndex() {
  const todosContainer = getEl('todos-container');
  try {
    const res = await fetch('data/index.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Data is not an array');

    indexTodos = data;
    filteredIndex = [...indexTodos];
    
    renderDailyCard();
    renderListings();
  } catch (err) {
    console.error('Error loading 5todos index:', err);
    if (todosContainer) {
      todosContainer.innerHTML = `
        <div class="text-center py-12">
          <p class="text-red-500 font-medium">Failed to load checklists.</p>
          <p class="text-xs text-gray-400 mt-1">${err.message}</p>
        </div>`;
    }
  }
}

// 2. Render Featured Daily Card
function renderDailyCard() {
  const dailyCardContainer = getEl('daily-card');
  if (!dailyCardContainer || !indexTodos || indexTodos.length === 0) return;

  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const dailyItem = indexTodos[dayOfYear % indexTodos.length];

  if (!dailyItem) return;

  dailyCardContainer.innerHTML = `
    <div class="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg cursor-pointer transform transition hover:-translate-y-0.5" onclick="openTodoModal('${dailyItem.id}')">
      <div class="flex items-center justify-between mb-2">
        <span class="bg-white/20 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">Featured Today</span>
        <span class="text-xs uppercase font-medium opacity-80">${dailyItem.category || 'General'}</span>
      </div>
      <h2 class="text-xl md:text-2xl font-bold mb-2">${dailyItem.title || 'Featured Checklist'}</h2>
      <p class="text-sm text-indigo-100 flex items-center gap-1 font-medium">
        View 5-step checklist &rarr;
      </p>
    </div>
  `;
}

// 3. Filter Logic
function filterTodos(query = '', category = 'all') {
  const dailyCardContainer = getEl('daily-card');
  currentSearchQuery = (query || '').toLowerCase().trim();
  currentCategory = category || 'all';

  // Toggle Daily Card Visibility
  if (dailyCardContainer) {
    if (currentCategory !== 'all' || currentSearchQuery !== '') {
      dailyCardContainer.classList.add('hidden');
    } else {
      dailyCardContainer.classList.remove('hidden');
    }
  }

  // Filter List
  filteredIndex = indexTodos.filter(item => {
    if (!item) return false;
    
    const itemCat = (item.category || '').toLowerCase();
    const matchesCat = currentCategory === 'all' || itemCat === currentCategory.toLowerCase();
    
    const titleMatch = (item.title || '').toLowerCase().includes(currentSearchQuery);
    const tagMatch = Array.isArray(item.tags) && item.tags.some(tag => (tag || '').toLowerCase().includes(currentSearchQuery));
    const matchesQuery = !currentSearchQuery || titleMatch || tagMatch;
      
    return matchesCat && matchesQuery;
  });

  renderListings();
}

// 4. Render Checklist Cards List
function renderListings() {
  const todosContainer = getEl('todos-container');
  if (!todosContainer) return;

  if (!filteredIndex || filteredIndex.length === 0) {
    todosContainer.innerHTML = `
      <div class="text-center py-12 col-span-full">
        <p class="text-gray-500 dark:text-gray-400 font-medium">No 5todos found matching your criteria.</p>
      </div>
    `;
    return;
  }

  todosContainer.innerHTML = filteredIndex.map(item => `
    <div onclick="openTodoModal('${item.id}')" class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">${item.category || 'General'}</span>
      </div>
      <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${item.title || 'Untitled Checklist'}</h3>
    </div>
  `).join('');
}

// 5. Open Full Checklist Modal
async function openTodoModal(id) {
  const modal = getEl('todo-modal');
  const modalContent = getEl('modal-content');
  
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `<div class="text-center py-8"><p class="text-gray-500">Loading checklist...</p></div>`;
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  try {
    const res = await fetch(`data/todos/${id}.json`);
    if (!res.ok) throw new Error('Checklist details not found');
    const data = await res.json();

    const todosList = Array.isArray(data.todos) ? data.todos : [];

    modalContent.innerHTML = `
      <div class="mb-4">
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">${data.category || 'General'}</span>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">${data.title || 'Checklist'}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${data.desc || ''}</p>
      </div>

      <div class="space-y-3 my-6">
        ${todosList.map((step, idx) => `
          <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40">
            <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">${idx + 1}</span>
            <p class="text-sm text-gray-800 dark:text-gray-200 font-medium pt-0.5">${step}</p>
          </div>
        `).join('')}
      </div>

      ${data.sourceName && data.sourceUrl ? `
        <div class="pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 flex items-center justify-between">
          <span>Source verification:</span>
          <a href="${data.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">${data.sourceName} &rarr;</a>
        </div>
      ` : ''}
    `;
  } catch (err) {
    console.error('Error fetching todo details:', err);
    modalContent.innerHTML = `<div class="text-center py-8 text-red-500"><p>Failed to load checklist details.</p></div>`;
  }
}

// 6. Setup Event Listeners
function setupEventListeners() {
  const searchInput = getEl('search-input');
  const categoryPills = getEl('category-pills');
  const closeModalBtn = getEl('close-modal');
  const modal = getEl('todo-modal');

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterTodos(e.target.value, currentCategory);
    });
  }

  // Category Pills
  if (categoryPills) {
    categoryPills.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;

      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-xs');
        b.classList.add('text-gray-500', 'hover:text-gray-900', 'dark:text-gray-400', 'dark:hover:text-white');
      });

      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-xs');
      btn.classList.remove('text-gray-500', 'hover:text-gray-900', 'dark:text-gray-400', 'dark:hover:text-white');

      const selectedCat = btn.getAttribute('data-category') || 'all';
      filterTodos(currentSearchQuery, selectedCat);
    });
  }

  // Modal events
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal() {
  const modal = getEl('todo-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}