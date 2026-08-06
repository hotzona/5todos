// MASTER STATE
let allTodos = [];
let filteredTodos = [];
let activeCategory = 'all';

// DOM ELEMENTS
const dailyContainer = document.getElementById('daily-card-container');
const categoryGrid = document.getElementById('category-grid');
const searchInput = document.getElementById('search-input');
const surpriseBtn = document.getElementById('surprise-btn');

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
      dailyContainer.innerHTML = `<div class="p-6 text-center text-red-400">Failed to load checklists. Please refresh.</div>`;
    }
  }
}

// 2. DAILY SEEDED ALGORITHM (Changes midnight local time)
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

  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const dateStr = new Date().toLocaleDateString('en-US', dateOptions);

  dailyContainer.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-sm relative overflow-hidden transition-all">
      <div class="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> ${overrideTodo ? 'Featured Checklist' : 'Daily 5todo'}
        </span>
        <span class="text-xs font-medium text-gray-400">${dateStr}</span>
      </div>

      <div class="space-y-2 mb-6">
        <h2 class="text-2xl font-extrabold tracking-tight">${selected.title}</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm">${selected.desc}</p>
        
        ${selected.sourceName ? `
          <div class="pt-1">
            <a href="${selected.sourceUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-indigo-500 hover:underline">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Verified by ${selected.sourceName}
            </a>
          </div>
        ` : ''}
      </div>

      <ul id="active-checklist" class="space-y-3 mb-6"></ul>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700/60">
        <div class="text-sm font-black text-indigo-600 dark:text-indigo-400" id="progress-counter">0 of 5 Done</div>
        
        <div class="flex gap-2 w-full sm:w-auto">
          <button id="export-btn" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold transition-all">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i> Export List
          </button>
        </div>
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
    li.className = `flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
      isChecked 
        ? 'bg-indigo-50/40 border-indigo-200 text-gray-400 line-through dark:bg-indigo-900/10 dark:border-indigo-900/40 dark:text-gray-500' 
        : 'bg-gray-50 border-gray-100 hover:border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/40 dark:hover:border-gray-700'
    }`;

    li.innerHTML = `
      <button class="mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
        isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      }">
        ${isChecked ? '<i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>' : ''}
      </button>
      <span class="text-sm font-medium leading-relaxed">${idx + 1}. ${stepText}</span>
    `;

    li.addEventListener('click', () => {
      savedState[idx] = !savedState[idx];
      localStorage.setItem(storageKey, JSON.stringify(savedState));
      renderChecklistItems(todoObj, savedState, storageKey);
    });

    listEl.appendChild(li);
  });

  updateCounter();

  // EXPORT HANDLER
  document.getElementById('export-btn').onclick = () => {
    let text = `📋 5todos.com: ${todoObj.title.replace('...', '')}\n${todoObj.desc}\n\n`;
    todoObj.todos.forEach((t, i) => {
      text += `${savedState[i] ? '[x]' : '[ ]'} ${i + 1}. ${t}\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('export-btn');
      btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Copied!`;
      setTimeout(() => {
        btn.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> Export List`;
        lucide.createIcons();
      }, 2000);
    });
  };
}

// 3. SURPRISE ME HANDLER
if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    if (!allTodos.length) return;
    const randomIndex = Math.floor(Math.random() * allTodos.length);
    const randomTodo = allTodos[randomIndex];
    window.location.hash = randomTodo.id;
    renderDailyTodo(randomTodo);
    window.scrollTo({ top: dailyContainer.offsetTop - 80, behavior: 'smooth' });
  });
}

// 4. SEARCH & CATEGORY FILTERING
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    filterTodos(query, activeCategory);
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

function renderListings() {
  const container = document.getElementById('listings-grid');
  if (!container) return;

  if (!filteredTodos.length) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">No matching 5todos found. Try another search!</div>`;
    return;
  }

  container.innerHTML = filteredTodos.map(item => `
    <div onclick="openTodo('${item.id}')" class="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/60 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer shadow-sm group">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">${item.category}</span>
        ${item.sourceName ? '<i data-lucide="shield-check" class="w-3.5 h-3.5 text-indigo-400"></i>' : ''}
      </div>
      <h3 class="font-bold text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">${item.title}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">${item.desc}</p>
    </div>
  `).join('');

  lucide.createIcons();
}

window.openTodo = function(id) {
  const found = allTodos.find(t => t.id === id);
  if (found) {
    window.location.hash = id;
    renderDailyTodo(found);
    window.scrollTo({ top: dailyContainer.offsetTop - 80, behavior: 'smooth' });
  }
};

function handleHashRouting() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const found = allTodos.find(t => t.id === hash);
    if (found) renderDailyTodo(found);
  }
}

// 5. INITIALIZE THEME & DATA
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