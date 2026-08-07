// Global State
let indexTodos = [];
let filteredIndex = [];
let currentCategory = 'all';
let currentSearchQuery = '';
let activeTodoData = null; // Holds current open modal checklist data

// Utility DOM Helper
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
        <div class="text-center py-12 col-span-full">
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

// 3. Filter Logic (Hides Daily Card when specific category or search is active)
function filterTodos(query = '', category = 'all') {
  const dailyCardContainer = getEl('daily-card');
  currentSearchQuery = (query || '').toLowerCase().trim();
  currentCategory = category || 'all';

  // Toggle Daily Card Visibility via Tailwind class
  if (dailyCardContainer) {
    if (currentCategory !== 'all' || currentSearchQuery !== '') {
      dailyCardContainer.classList.add('hidden');
    } else {
      dailyCardContainer.classList.remove('hidden');
    }
  }

  // Filter items
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

// 5. Open Modal with Interactive Checkboxes & Export Features
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
    activeTodoData = data;

    // Retrieve saved checked states from LocalStorage
    const savedStates = JSON.parse(localStorage.getItem(`5todos_checked_${id}`) || '{}');

    const todosList = Array.isArray(data.todos) ? data.todos : [];

    modalContent.innerHTML = `
      <!-- Checklist Header -->
      <div class="mb-4 pr-6">
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">${data.category || 'General'}</span>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">${data.title || 'Checklist'}</h2>
        ${data.desc ? `<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${data.desc}</p>` : ''}
      </div>

      <!-- Action / Export Toolbar -->
      <div class="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-700/60 text-xs">
        <button onclick="copyChecklistToClipboard()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span id="copy-btn-text">Copy List</span>
        </button>
        <button onclick="printChecklist()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Print / PDF
        </button>
        <button onclick="resetChecklistProgress('${id}')" class="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-medium">
          Reset Progress
        </button>
      </div>

      <!-- Interactive Steps -->
      <div class="space-y-3 my-4">
        ${todosList.map((step, idx) => {
          const isChecked = !!savedStates[idx];
          return `
            <label class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40 cursor-pointer select-none hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors">
              <input 
                type="checkbox" 
                class="step-checkbox mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer" 
                data-id="${id}" 
                data-idx="${idx}" 
                ${isChecked ? 'checked' : ''} 
                onchange="toggleStepCheck(this)"
              />
              <span class="text-sm font-medium ${isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}">
                ${step}
              </span>
            </label>
          `;
        }).join('')}
      </div>

      <!-- Source Verification Footer -->
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

// 6. Interactive Checkbox Storage Logic
function toggleStepCheck(checkbox) {
  const id = checkbox.getAttribute('data-id');
  const idx = checkbox.getAttribute('data-idx');
  const isChecked = checkbox.checked;

  const storageKey = `5todos_checked_${id}`;
  const savedStates = JSON.parse(localStorage.getItem(storageKey) || '{}');

  if (isChecked) {
    savedStates[idx] = true;
  } else {
    delete savedStates[idx];
  }

  localStorage.setItem(storageKey, JSON.stringify(savedStates));

  // Toggle strikethrough class on text element
  const textSpan = checkbox.nextElementSibling;
  if (textSpan) {
    if (isChecked) {
      textSpan.classList.add('line-through', 'text-gray-400', 'dark:text-gray-500');
      textSpan.classList.remove('text-gray-800', 'dark:text-gray-200');
    } else {
      textSpan.classList.remove('line-through', 'text-gray-400', 'dark:text-gray-500');
      textSpan.classList.add('text-gray-800', 'dark:text-gray-200');
    }
  }
}

function resetChecklistProgress(id) {
  localStorage.removeItem(`5todos_checked_${id}`);
  document.querySelectorAll('.step-checkbox').forEach(cb => {
    cb.checked = false;
    const textSpan = cb.nextElementSibling;
    if (textSpan) {
      textSpan.classList.remove('line-through', 'text-gray-400', 'dark:text-gray-500');
      textSpan.classList.add('text-gray-800', 'dark:text-gray-200');
    }
  });
}

// 7. Export / Copy / Print Helper Functions
function copyChecklistToClipboard() {
  if (!activeTodoData) return;

  const title = activeTodoData.title || '5todos Checklist';
  const steps = Array.isArray(activeTodoData.todos) ? activeTodoData.todos : [];
  const textFormatted = `${title}\n\n` + steps.map((s, i) => `[ ] Step ${i + 1}: ${s}`).join('\n') + `\n\nVia 5todos`;

  navigator.clipboard.writeText(textFormatted).then(() => {
    const btnText = getEl('copy-btn-text');
    if (btnText) {
      btnText.textContent = 'Copied!';
      setTimeout(() => { btnText.textContent = 'Copy List'; }, 2000);
    }
  }).catch(err => {
    console.error('Failed to copy checklist:', err);
  });
}

function printChecklist() {
  window.print();
}

// 8. Event Listener Setup
function setupEventListeners() {
  const searchInput = getEl('search-input');
  const categoryPills = getEl('category-pills');
  const closeModalBtn = getEl('close-modal');
  const modal = getEl('todo-modal');

  // Search input with auto filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterTodos(e.target.value, currentCategory);
    });
  }

  // Category Pills delegation
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

  // Modal dismissal listeners
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