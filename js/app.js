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