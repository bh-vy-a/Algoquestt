// DOM Elements
const elements = {
  pages: {},
  nav: {},
  search: null,
  categoriesGrid: null,
  questionsList: null,
  categoryView: {
    title: null,
    progress: null,
    questions: null,
    backButton: null
  }
};

// Initialize the UI
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  elements.pages = {
    dashboard: document.getElementById('dashboard'),
    categoryView: document.getElementById('categoryView'),
    categories: document.getElementById('categories'),
    progress: document.getElementById('progress')
  };
  elements.nav = {
    links: document.querySelectorAll('.nav-links a')
  };
  elements.search = document.getElementById('searchInput');
  elements.categoriesGrid = document.getElementById('categoriesGrid');
  elements.questionsList = document.getElementById('questionsList');
  elements.categoryView = {
    title: document.getElementById('categoryTitle'),
    progress: document.getElementById('progressText'),
    questions: document.getElementById('categoryQuestions'),
    backButton: document.querySelector('.back-button'),
    progressFill: document.querySelector('.category-progress .progress-fill')
  };

  // Load data
  loadQuestions();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initial UI update
  updateUI();
});

// Data management
let currentQuestions = [];

function loadQuestions() {
  const savedQuestions = localStorage.getItem('algoquest-questions');
  currentQuestions = savedQuestions ? JSON.parse(savedQuestions) : questions;
}

function saveQuestions() {
  localStorage.setItem('algoquest-questions', JSON.stringify(currentQuestions));
}

// Event listeners
function setupEventListeners() {
  // Navigation
  elements.nav.links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      elements.nav.links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      showPage(link.dataset.page);
    });
  });

  // Search
  elements.search?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = currentQuestions.filter(q => 
      q.title.toLowerCase().includes(query) ||
      q.category.toLowerCase().includes(query)
    );
    updateQuestionsList(filtered);
  });

  // Back button
  elements.categoryView.backButton?.addEventListener('click', () => {
    showPage('dashboard');
  });
}

// UI Updates
function updateUI() {
  updateCategories();
  updateQuestionsList(currentQuestions);
  updateProgress();
}

function updateCategories() {
  const categories = getCategories();
  elements.categoriesGrid.innerHTML = '';

  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <h3>${category.name}</h3>
      <div class="progress-info">
        <span>${category.completed}/${category.total}</span>
        <span>${Math.round((category.completed / category.total) * 100)}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(category.completed / category.total) * 100}%"></div>
      </div>
    `;
    card.addEventListener('click', () => showCategory(category.name));
    elements.categoriesGrid.appendChild(card);
  });

  // Update categories page
  const categoriesPage = document.getElementById('categoriesContent');
  if (categoriesPage) {
    categoriesPage.innerHTML = '';
    categories.forEach(category => {
      const categorySection = document.createElement('div');
      categorySection.className = 'category-section';
      const categoryQuestions = currentQuestions.filter(q => q.category === category.name);
      
      categorySection.innerHTML = `
        <h2 class="category-title">${category.name}</h2>
        <div class="category-questions"></div>
      `;
      
      const questionsContainer = categorySection.querySelector('.category-questions');
      categoryQuestions.forEach(question => {
        const questionCard = createQuestionCard(question);
        questionsContainer.appendChild(questionCard);
      });
      
      categoriesPage.appendChild(categorySection);
    });
  }
}

function updateProgress() {
  const progressPage = document.getElementById('progressContent');
  if (!progressPage) return;

  const categories = getCategories();
  const totalQuestions = currentQuestions.length;
  const completedQuestions = currentQuestions.filter(q => q.completed).length;
  const totalProgress = Math.round((completedQuestions / totalQuestions) * 100);

  progressPage.innerHTML = `
    <div class="overall-progress">
      <h2>Overall Progress</h2>
      <div class="progress-card">
        <div class="progress-info">
          <span>${completedQuestions}/${totalQuestions} Questions Completed</span>
          <span>${totalProgress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${totalProgress}%"></div>
        </div>
      </div>
    </div>
    <div class="category-progress-list">
      <h2>Progress by Category</h2>
      ${categories.map(category => `
        <div class="category-progress-item">
          <h3>${category.name}</h3>
          <div class="progress-info">
            <span>${category.completed}/${category.total} Questions</span>
            <span>${Math.round((category.completed / category.total) * 100)}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(category.completed / category.total) * 100}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function updateQuestionsList(questions, container = elements.questionsList) {
  if (!container) return;
  
  container.innerHTML = '';
  questions.forEach(question => {
    const card = createQuestionCard(question);
    container.appendChild(card);
  });
}

function createQuestionCard(question) {
  const card = document.createElement('div');
  card.className = 'question-card';
  card.innerHTML = `
    <div class="question-header">
      <button class="complete-btn ${question.completed ? 'completed' : ''}" data-id="${question.id}">
        ${question.completed ? '✓' : ''}
      </button>
      <div>
        <div class="question-title">
          <h3>${question.title}</h3>
          <a href="${question.link}" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
        <div class="question-meta">
          <span class="difficulty ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
          <span>•</span>
          <span>${question.category}</span>
        </div>
      </div>
    </div>
    <p>${question.description}</p>
    <div class="question-notes">
      <textarea placeholder="Add notes..." data-id="${question.id}">${question.notes || ''}</textarea>
    </div>
  `;

  // Add event listeners
  const completeBtn = card.querySelector('.complete-btn');
  completeBtn.addEventListener('click', () => {
    toggleComplete(question.id);
    completeBtn.classList.toggle('completed');
    completeBtn.innerHTML = question.completed ? '' : '✓';
  });

  card.querySelector('textarea').addEventListener('input', (e) => {
    saveNotes(question.id, e.target.value);
  });

  return card;
}

function showCategory(categoryName) {
  const categoryQuestions = currentQuestions.filter(q => q.category === categoryName);
  const completed = categoryQuestions.filter(q => q.completed).length;
  const total = categoryQuestions.length;
  const percentage = Math.round((completed / total) * 100);

  elements.categoryView.title.textContent = categoryName;
  elements.categoryView.progress.textContent = `${completed}/${total} (${percentage}%)`;
  elements.categoryView.progressFill.style.width = `${percentage}%`;

  updateQuestionsList(categoryQuestions, elements.categoryView.questions);
  showPage('categoryView');
}

function showPage(pageId) {
  if (!elements.pages[pageId]) return;
  
  Object.values(elements.pages).forEach(page => {
    if (page) page.classList.remove('active');
  });
  elements.pages[pageId].classList.add('active');
}

function getCategories() {
  const categories = {};
  currentQuestions.forEach(q => {
    if (!categories[q.category]) {
      categories[q.category] = { name: q.category, total: 0, completed: 0 };
    }
    categories[q.category].total++;
    if (q.completed) categories[q.category].completed++;
  });
  return Object.values(categories);
}

// Question actions
function toggleComplete(id) {
  currentQuestions = currentQuestions.map(q => 
    q.id === id ? { ...q, completed: !q.completed } : q
  );
  saveQuestions();
  updateUI();
}

function saveNotes(id, notes) {
  currentQuestions = currentQuestions.map(q => 
    q.id === id ? { ...q, notes } : q
  );
  saveQuestions();
}