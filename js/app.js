// Global State
let indexTodos = [];
let filteredIndex = [];
let currentCategory = 'all';
let currentSearchQuery = '';
let activeTodoData = null;

// Utility Helper
const getEl = (id) => document.getElementById(id);

// Get progress count for a given checklist ID
function getChecklistProgress(id) {
  try {
    const savedStates = JSON.parse(localStorage.getItem(`5todos_checked_${id}`) || '{}');
    return Object.keys(savedStates).length;
  } catch (e) {
    return 0;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchIndex();
  setupEventListeners();
  initThemeToggle();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const toggleBtn = getEl('theme-toggle');
  const sunIcon = getEl('theme-toggle-sun-icon');
  const moonIcon = getEl('theme-toggle-moon-icon');

  if (!toggleBtn || !sunIcon || !moonIcon) return;

  function updateIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  updateIcons();

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    updateIcons();
  });
}

// 1. Fetch Index Data
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

  const progress = getChecklistProgress(dailyItem.id);
  const showBadge = progress > 0;

  dailyCardContainer.innerHTML = `
    <div class="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 sm:p-6 text-white shadow-lg cursor-pointer transform transition hover:-translate-y-0.5 active:scale-[0.99]" onclick="openTodoModal('${dailyItem.id}')">
      <div class="flex items-center justify-between mb-2">
        <span class="bg-white/20 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">Featured Today</span>
        <div class="flex items-center gap-2">
          <span class="bg-black/20 text-white text-xs font-bold px-2 py-0.5 rounded-full ${showBadge ? '' : 'hidden'}" id="daily-progress-${dailyItem.id}">${progress}/5</span>
          <span class="text-xs uppercase font-medium opacity-80">${dailyItem.category || 'General'}</span>
        </div>
      </div>
      <h2 class="text-xl md:text-2xl font-bold mb-2">${dailyItem.title || 'Featured Checklist'}</h2>
      <p class="text-sm text-indigo-100 flex items-center gap-1 font-medium">
        View 5-step checklist &rarr;
      </p>
    </div>
  `;
}

// 3. Filter Todos
function filterTodos(query = '', category = 'all') {
  const dailyCardContainer = getEl('daily-card');
  currentSearchQuery = (query || '').toLowerCase().trim();
  currentCategory = category || 'all';

  if (dailyCardContainer) {
    if (currentCategory !== 'all' || currentSearchQuery !== '') {
      dailyCardContainer.classList.add('hidden');
    } else {
      dailyCardContainer.classList.remove('hidden');
    }
  }

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

// 4. Render Grid Listings (Only shows badge if progress > 0)
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

  todosContainer.innerHTML = filteredIndex.map(item => {
    const progress = getChecklistProgress(item.id);
    const isComplete = progress === 5;
    const showBadge = progress > 0;

    return `
      <div onclick="openTodoModal('${item.id}')" class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between active:bg-gray-50 dark:active:bg-gray-700/50">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">${item.category || 'General'}</span>
            <span id="card-progress-${item.id}" class="text-xs font-bold px-2 py-0.5 rounded-full ${showBadge ? '' : 'hidden'} ${isComplete ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'}">
              ${progress}/5
            </span>
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${item.title || 'Untitled Checklist'}</h3>
        </div>
      </div>
    `;
  }).join('');
}

// 5. Open Checklist Modal
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

    const savedStates = JSON.parse(localStorage.getItem(`5todos_checked_${id}`) || '{}');
    const todosList = Array.isArray(data.todos) ? data.todos : [];

    modalContent.innerHTML = `
      <!-- Header -->
      <div class="mb-4 pr-8">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">${data.category || 'General'}</span>
          <span id="modal-progress-badge" class="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            ${Object.keys(savedStates).length}/5
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">${data.title || 'Checklist'}</h2>
        ${data.desc ? `<p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">${data.desc}</p>` : ''}
      </div>

      <!-- Action Toolbar (iOS Native Share + Copy + Print) -->
      <div class="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-700/60 text-xs overflow-x-auto scrollbar-none">
        <button onclick="shareChecklist()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-colors active:scale-95 flex-shrink-0">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          <span>Share</span>
        </button>
        <button onclick="copyChecklistToClipboard()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors flex-shrink-0">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span id="copy-btn-text">Copy</span>
        </button>
        <button onclick="printChecklist()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors flex-shrink-0">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Print / PDF
        </button>
        <button onclick="resetChecklistProgress('${id}')" class="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-medium flex-shrink-0 pl-2">
          Reset
        </button>
      </div>

      <!-- Interactive Steps -->
      <div class="space-y-2.5 my-4">
        ${todosList.map((step, idx) => {
          const isChecked = !!savedStates[idx];
          return `
            <label class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40 cursor-pointer select-none hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors">
              <input 
                type="checkbox" 
                class="step-checkbox mt-0.5 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer flex-shrink-0" 
                data-id="${id}" 
                data-idx="${idx}" 
                ${isChecked ? 'checked' : ''} 
                onchange="toggleStepCheck(this)"
              />
              <span class="text-sm font-medium leading-tight ${isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}">
                ${step}
              </span>
            </label>
          `;
        }).join('')}
      </div>

      <!-- Source Link -->
      ${data.sourceName && data.sourceUrl ? `
        <div class="pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 flex items-center justify-between">
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

// 6. Interactive Checkbox & Real-time Progress
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

  const totalCount = Object.keys(savedStates).length;
  
  const modalBadge = getEl('modal-progress-badge');
  if (modalBadge) modalBadge.textContent = `${totalCount}/5`;

  const cardBadge = getEl(`card-progress-${id}`);
  if (cardBadge) {
    cardBadge.textContent = `${totalCount}/5`;
    if (totalCount > 0) {
      cardBadge.classList.remove('hidden');
    } else {
      cardBadge.classList.add('hidden');
    }
  }

  const dailyBadge = getEl(`daily-progress-${id}`);
  if (dailyBadge) {
    dailyBadge.textContent = `${totalCount}/5`;
    if (totalCount > 0) {
      dailyBadge.classList.remove('hidden');
    } else {
      dailyBadge.classList.add('hidden');
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

  const modalBadge = getEl('modal-progress-badge');
  if (modalBadge) modalBadge.textContent = `0/5`;

  const cardBadge = getEl(`card-progress-${id}`);
  if (cardBadge) {
    cardBadge.textContent = `0/5`;
    cardBadge.classList.add('hidden');
  }

  const dailyBadge = getEl(`daily-progress-${id}`);
  if (dailyBadge) {
    dailyBadge.textContent = `0/5`;
    dailyBadge.classList.add('hidden');
  }
}

// 7. Native iOS/Desktop Share API
async function shareChecklist() {
  if (!activeTodoData) return;

  const title = activeTodoData.title || '5todos Checklist';
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: `Check out this 5-step checklist: ${title}`,
        url: url
      });
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Share failed:', err);
    }
  } else {
    copyChecklistToClipboard();
  }
}

function copyChecklistToClipboard() {
  if (!activeTodoData) return;

  const title = activeTodoData.title || '5todos Checklist';
  const steps = Array.isArray(activeTodoData.todos) ? activeTodoData.todos : [];
  const textFormatted = `${title}\n\n` + steps.map((s, i) => `[ ] Step ${i + 1}: ${s}`).join('\n') + `\n\nVia 5todos`;

  navigator.clipboard.writeText(textFormatted).then(() => {
    const btnText = getEl('copy-btn-text');
    if (btnText) {
      btnText.textContent = 'Copied!';
      setTimeout(() => { btnText.textContent = 'Copy'; }, 2000);
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

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterTodos(e.target.value, currentCategory);
    });
  }

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