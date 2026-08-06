// MASTER STATE
let allTodos = [];
let filteredTodos = [];
let activeCategory = 'all';
let showAll = false;

// DOM ELEMENTS
const dailySection = document.getElementById('daily-section');
const dailyContainer = document.getElementById('daily-card-container');
const listingsContainer = document.getElementById('listings-grid');
const searchInput = document.getElementById('search-input');
const surpriseBtn = document.getElementById('surprise-btn');
const categoryPills = document.getElementById('category-pills');

// 1. FETCH JSON DATA
async function loadTodos() {
  try {
    const response = await fetch('data/todos.json');
    if (!response.ok) throw new Error('Failed to load checklist data.');
    allTodos = await response.json();
    filteredTodos = [...allTodos];

    renderDailyTodo();
    renderListings();
    handleHashRouting();
  } catch (error) {
    console.error('Error loading 5todos:', error);
    if (dailyContainer) {
      dailyContainer.innerHTML = `<div class="p-4 text-center text-red-400 text-xs">Failed to load checklists.</div>`;
    }
  }
}

// 2. DAILY SEEDED ALGORITHM
function renderDailyTodo(overrideTodo = null) {
  if (!allTodos.length) return;

  let selected;
  if (overrideTodo) {
    selected = overrideTodo;
  } else {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const dailyIndex = dayOfYear % allTodos.length;
    selected = allTodos[dailyIndex];
  }

  const storageKey = `progress-${selected.id}`;
  let savedState = JSON.parse(localStorage.getItem(storageKey)) || [false, false, false, false, false];

  dailyContainer.innerHTML = `
    <div class="bg-white dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700/80 p-5 shadow-xs relative overflow-hidden transition-all">
      <div class="flex items-center justify-between gap-3 mb-3">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
          <i data-lucide="sparkles" class="w-3 h-3"></i> ${overrideTodo ? 'Active Checklist' : 'Daily 5todo'}
        </span>
        ${selected.sourceName ? `
          <a href="${selected.sourceUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-500">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i> ${selected.sourceName}
          </a>
        ` : ''}
      </div>

      <div class="space-y-1 mb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">${selected.title}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">${selected.desc}</p>
      </div>

      <ul id="active-checklist" class="space-y-2 mb-4"></ul>

      <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
        <div class="text-xs font-bold text-indigo-600 dark:text-indigo-400" id="progress-counter">0 of 5 Done</div>
        <button id="export-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs font-medium transition-all">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i> Export
        </button>
      </div>
    </div>
  `;

  renderChecklistItems(selected, savedState, storageKey);
  lucide.createIcons();
}

function renderChecklistItems(todoObj, savedState, storageKey) {
  const listEl = document.getElementById('active-checklist');
  const counterEl = document.getElementById('progress-counter');
  
  const updateCounter = () => {
    const done = savedState.filter(Boolean).length;
    counterEl.innerText = `${done} of 5 Done`;
  };

  listEl.innerHTML = '';
  todoObj.todos.forEach((stepText, idx) => {
    const isChecked = savedState[idx];
    const li = document.createElement('li');
    li.className = `flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
      isChecked 
        ? 'bg-indigo-50/30 border-indigo-100 text-gray-400 line-through dark:bg-indigo-950/20 dark:border-indigo-900/30 dark:text-gray-500' 
        : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 dark:bg-gray-800/40 dark:border-gray-700/30 dark:hover:border-gray-600'
    }`;

    li.innerHTML = `
      <button class="mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
        isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      }">
        ${isChecked ? '<i data-lucide="check" class="w-3 h-3 stroke-[3]"></i>' : ''}
      </button>
      <span class="text-xs md:text-sm font-medium leading-normal">${idx + 1}. ${stepText}</span>
    `;

    li.addEventListener('click', () => {
      savedState[idx] = !savedState[idx];
      localStorage.setItem(storageKey, JSON.stringify(savedState));
      renderChecklistItems(todoObj, savedState, storageKey);
    });

    listEl.appendChild(li);
  });

  updateCounter();

  document.getElementById('export-btn').onclick = () => {
    let text = `📋 5todos.com: ${todoObj.title.replace('...', '')}\n${todoObj.desc}\n\n`;
    todoObj.todos.forEach((t, i) => {
      text += `${savedState[i] ? '[x]' : '[ ]'} ${i + 1}. ${t}\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('export-btn');
      btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Copied!`;
      setTimeout(() => {
        btn.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> Export`;
        lucide.createIcons();
      }, 2000);
    });
  };
}

// 3. SEARCH & FILTERING LOGIC (WITH INSTANT TAKEOVER)
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Hide featured daily section while searching so results float up directly beneath the search bar
    if (query.length > 0) {
      dailySection.classList.add('hidden');
      showAll = true; // Automatically show all search results
    } else {
      dailySection.classList.remove('hidden');
      showAll = false;
    }
    
    filterTodos(query, activeCategory);
  });
}

if (categoryPills) {
  categoryPills.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    
    activeCategory = btn.dataset.category;
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.className = 'cat-btn px-3.5 py-1 rounded-full font-medium transition-all text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white';
    });
    btn.className = 'cat-btn px-3.5 py-1 rounded-full font-semibold transition-all bg-indigo-600 text-white shadow-xs';
    
    filterTodos(searchInput.value.toLowerCase().trim(), activeCategory);
  });
}

function filterTodos(query = '', category = 'all') {
  filteredTodos = allTodos.filter(item => {
    const matchesCat = category === 'all' || item.category === category;
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesCat && matchesQuery;
  });
  renderListings();
}

// COMPACT ROW RENDERER
function renderListings() {
  if (!listingsContainer) return;

  if (!filteredTodos.length) {
    listingsContainer.innerHTML = `<div class="text-center py-6 text-gray-400 text-xs">No matching 5todos found.</div>`;
    return;
  }

  const displayList = showAll ? filteredTodos : filteredTodos.slice(0, 6);

  let html = displayList.map(item => `
    <div onclick="openTodo('${item.id}')" class="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/40 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer group">
      <div class="flex items-center gap-3 min-w-0 pr-2">
        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex-shrink-0">${item.category}</span>
        <h3 class="font-medium text-xs md:text-sm text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">${item.title}</h3>
      </div>
      <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 flex-shrink-0 transition-transform group-hover:translate-x-0.5"></i>
    </div>
  `).join('');

  if (!showAll && filteredTodos.length > 6) {
    html += `
      <button id="show-more-btn" class="w-full py-2.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-center">
        Show all ${filteredTodos.length} checklists →
      </button>
    `;
  }

  listingsContainer.innerHTML = html;
  lucide.createIcons();

  const showMoreBtn = document.getElementById('show-more-btn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      showAll = true;
      renderListings();
    });
  }
}

window.openTodo = function(id) {
  const found = allTodos.find(t => t.id === id);
  if (found) {
    window.location.hash = id;
    renderDailyTodo(found);
    searchInput.value = '';
    dailySection.classList.remove('hidden');
    window.scrollTo({ top: dailySection.offsetTop - 80, behavior: 'smooth' });
  }
};

function handleHashRouting() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const found = allTodos.find(t => t.id === hash);
    if (found) renderDailyTodo(found);
  }
}

// SURPRISE BUTTON
if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    if (!allTodos.length) return;
    const randomIndex = Math.floor(Math.random() * allTodos.length);
    const randomTodo = allTodos[randomIndex];
    window.location.hash = randomTodo.id;
    renderDailyTodo(randomTodo);
    searchInput.value = '';
    dailySection.classList.remove('hidden');
    window.scrollTo({ top: dailySection.offsetTop - 80, behavior: 'smooth' });
  });
}

// THEME INITIALIZATION
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.remove('dark');
} else {
  document.documentElement.classList.add('dark');
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

loadTodos();