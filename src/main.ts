import "./style.css";
import type { Category, SentenceCategory } from "./vocabulary";
import { vocabulary, dailySentences } from "./vocabulary";
import { FlashcardGame } from "./games/FlashcardGame";
import { MatchingGame } from "./games/MatchingGame";
import { QuizGame } from "./games/QuizGame";

type GameMode = "flashcards" | "matching" | "quiz";
type Page = "home" | "practice" | "grammar" | "vocabulary";

class FrenchLearningApp {
  private container: HTMLElement;
  private selectedCategory: Category | null = null;
  private selectedSentenceCategory: SentenceCategory | null = null;
  private currentPage: Page = "home";

  constructor() {
    this.container = document.getElementById("app")!;
    this.showHomePage();
  }

  private showHomePage(): void {
    this.currentPage = "home";
    this.container.innerHTML = `
      <div class="home-page">
        <div class="home-header">
          <h1>🇫🇷 Leer Frans! 🇳🇱</h1>
          <p class="home-subtitle">Leer Frans op een leuke en interactieve manier!</p>
        </div>

        <div class="home-cards">
          <button class="home-card" id="btn-practice">
            <span class="home-card-icon">🎮</span>
            <h2>Oefenen</h2>
            <p>Oefen woorden en zinnen met flashcards, quiz en memory</p>
          </button>

          <button class="home-card" id="btn-grammar">
            <span class="home-card-icon">📖</span>
            <h2>Grammatica</h2>
            <p>Leer de basisregels van de Franse grammatica</p>
          </button>

          <button class="home-card" id="btn-vocabulary">
            <span class="home-card-icon">📝</span>
            <h2>Woordenlijst</h2>
            <p>Bekijk alle woorden en zinnen in een overzicht</p>
          </button>
        </div>
      </div>
    `;

    document.getElementById("btn-practice")?.addEventListener("click", () => this.showPracticePage());
    document.getElementById("btn-grammar")?.addEventListener("click", () => this.showGrammarPage());
    document.getElementById("btn-vocabulary")?.addEventListener("click", () => this.showVocabularyPage());
  }

  private showPracticePage(): void {
    this.currentPage = "practice";
    this.showMainMenu();
  }

  private showMainMenu(): void {
    this.container.innerHTML = `
      <div class="main-menu">
        <button class="btn-back" id="back-to-home">← Home</button>
        <h1>🇫🇷 Leer Frans! 🇳🇱</h1>
        <p class="subtitle">Kies een categorie om te beginnen</p>
        <div class="categories">
          ${vocabulary.map((cat, i) => `
            <button class="category-btn" data-index="${i}">
              <span class="cat-emoji">${cat.emoji}</span>
              <span class="cat-name">${cat.name}</span>
              <span class="cat-name-fr">${cat.nameFr}</span>
            </button>
          `).join("")}
        </div>

        <div class="section-divider">
          <h2 class="section-title">💬 Dagelijkse Zinnen</h2>
          <p class="section-subtitle">Phrases pour la vie quotidienne</p>
        </div>

        <div class="sentence-categories">
          ${dailySentences.map((cat, i) => `
            <button class="sentence-btn" data-index="${i}">
              <span class="cat-emoji">${cat.emoji}</span>
              <span class="cat-name">${cat.name}</span>
              <span class="cat-name-fr">${cat.nameFr}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("back-to-home")?.addEventListener("click", () => this.showHomePage());

    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).dataset.index || "0");
        this.selectedCategory = vocabulary[index];
        this.showGameSelection();
      });
    });

    document.querySelectorAll(".sentence-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).dataset.index || "0");
        this.selectedSentenceCategory = dailySentences[index];
        this.showSentenceGameSelection();
      });
    });
  }

  private showGameSelection(): void {
    const cat = this.selectedCategory!;

    this.container.innerHTML = `
      <div class="game-selection">
        <button class="btn-back" id="back-to-menu">← Terug</button>
        <h2>${cat.emoji} ${cat.name}</h2>
        <p class="subtitle">${cat.words.length} woorden om te leren!</p>
        <div class="game-modes">
          <button class="game-mode-btn" data-mode="flashcards">
            <span class="mode-emoji">🎴</span>
            <span class="mode-name">Flashcards</span>
            <span class="mode-desc">Bekijk en leer de woorden</span>
          </button>
          <button class="game-mode-btn" data-mode="matching">
            <span class="mode-emoji">🃏</span>
            <span class="mode-name">Memory Match</span>
            <span class="mode-desc">Vind de paren!</span>
          </button>
          <button class="game-mode-btn" data-mode="quiz">
            <span class="mode-emoji">🧠</span>
            <span class="mode-name">Quiz</span>
            <span class="mode-desc">Test je kennis!</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById("back-to-menu")?.addEventListener("click", () => this.showMainMenu());

    document.querySelectorAll(".game-mode-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const mode = (e.currentTarget as HTMLElement).dataset.mode as GameMode;
        this.startGame(mode);
      });
    });
  }

  private showSentenceGameSelection(): void {
    const cat = this.selectedSentenceCategory!;

    this.container.innerHTML = `
      <div class="game-selection">
        <button class="btn-back" id="back-to-menu">← Terug</button>
        <h2>${cat.emoji} ${cat.name}</h2>
        <p class="subtitle">${cat.sentences.length} zinnen om te leren!</p>
        <div class="game-modes">
          <button class="game-mode-btn" data-mode="flashcards">
            <span class="mode-emoji">🎴</span>
            <span class="mode-name">Flashcards</span>
            <span class="mode-desc">Bekijk en leer de zinnen</span>
          </button>
          <button class="game-mode-btn" data-mode="quiz">
            <span class="mode-emoji">🧠</span>
            <span class="mode-name">Quiz</span>
            <span class="mode-desc">Test je kennis!</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById("back-to-menu")?.addEventListener("click", () => this.showMainMenu());

    document.querySelectorAll(".game-mode-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const mode = (e.currentTarget as HTMLElement).dataset.mode as GameMode;
        this.startSentenceGame(mode);
      });
    });
  }

  private startGame(mode: GameMode): void {
    const words = this.selectedCategory!.words;
    const gameContainer = document.createElement("div");
    gameContainer.className = "game-container";
    this.container.innerHTML = "";
    this.container.appendChild(gameContainer);

    const onComplete = () => this.showGameSelection();
    const onHome = () => this.showHomePage();

    switch (mode) {
      case "flashcards":
        new FlashcardGame(words, gameContainer, onComplete, onHome);
        break;
      case "matching":
        new MatchingGame(words, gameContainer, onComplete, onHome);
        break;
      case "quiz":
        new QuizGame(words, gameContainer, onComplete, onHome);
        break;
    }
  }

  private startSentenceGame(mode: GameMode): void {
    // Convert sentences to words format for compatibility with existing games
    const sentences = this.selectedSentenceCategory!.sentences.map(s => ({
      dutch: s.dutch,
      french: s.french,
      emoji: s.emoji
    }));
    const gameContainer = document.createElement("div");
    gameContainer.className = "game-container";
    this.container.innerHTML = "";
    this.container.appendChild(gameContainer);

    const onComplete = () => this.showSentenceGameSelection();
    const onHome = () => this.showHomePage();

    switch (mode) {
      case "flashcards":
        new FlashcardGame(sentences, gameContainer, onComplete, onHome);
        break;
      case "quiz":
        new QuizGame(sentences, gameContainer, onComplete, onHome);
        break;
      default:
        // Matching game not available for sentences
        break;
    }
  }

  private showGrammarPage(): void {
    this.currentPage = "grammar";
    this.container.innerHTML = `
      <div class="grammar-page">
        <button class="btn-back" id="back-to-home">← Home</button>
        <h1>📖 Franse Grammatica</h1>
        <p class="subtitle">De basisregels van het Frans</p>

        <div class="grammar-grid">
          <div class="grammar-card">
            <h2>👤 Persoonlijke Voornaamwoorden</h2>
            <div class="grammar-content">
              <table class="grammar-table">
                <tr><td>Je</td><td>=</td><td>Ik</td></tr>
                <tr><td>Tu</td><td>=</td><td>Jij (informeel)</td></tr>
                <tr><td>Il/Elle</td><td>=</td><td>Hij/Zij</td></tr>
                <tr><td>Nous</td><td>=</td><td>Wij</td></tr>
                <tr><td>Vous</td><td>=</td><td>U/Jullie (formeel/meervoud)</td></tr>
                <tr><td>Ils/Elles</td><td>=</td><td>Zij (mannelijk/vrouwelijk)</td></tr>
              </table>
            </div>
          </div>

          <div class="grammar-card">
            <h2>✨ Être (zijn) - Tegenwoordige Tijd</h2>
            <div class="grammar-content">
              <table class="grammar-table">
                <tr><td>Je suis</td><td>=</td><td>Ik ben</td></tr>
                <tr><td>Tu es</td><td>=</td><td>Jij bent</td></tr>
                <tr><td>Il/Elle est</td><td>=</td><td>Hij/Zij is</td></tr>
                <tr><td>Nous sommes</td><td>=</td><td>Wij zijn</td></tr>
                <tr><td>Vous êtes</td><td>=</td><td>U bent/Jullie zijn</td></tr>
                <tr><td>Ils/Elles sont</td><td>=</td><td>Zij zijn</td></tr>
              </table>
            </div>
          </div>

          <div class="grammar-card">
            <h2>🤲 Avoir (hebben) - Tegenwoordige Tijd</h2>
            <div class="grammar-content">
              <table class="grammar-table">
                <tr><td>J'ai</td><td>=</td><td>Ik heb</td></tr>
                <tr><td>Tu as</td><td>=</td><td>Jij hebt</td></tr>
                <tr><td>Il/Elle a</td><td>=</td><td>Hij/Zij heeft</td></tr>
                <tr><td>Nous avons</td><td>=</td><td>Wij hebben</td></tr>
                <tr><td>Vous avez</td><td>=</td><td>U hebt/Jullie hebben</td></tr>
                <tr><td>Ils/Elles ont</td><td>=</td><td>Zij hebben</td></tr>
              </table>
            </div>
          </div>

          <div class="grammar-card">
            <h2>👫 Lidwoorden</h2>
            <div class="grammar-content">
              <h3>Bepaalde lidwoorden (de/het):</h3>
              <table class="grammar-table">
                <tr><td>Le</td><td>=</td><td>de (mannelijk)</td></tr>
                <tr><td>La</td><td>=</td><td>de (vrouwelijk)</td></tr>
                <tr><td>L'</td><td>=</td><td>de (voor klinker)</td></tr>
                <tr><td>Les</td><td>=</td><td>de (meervoud)</td></tr>
              </table>
              <h3>Onbepaalde lidwoorden (een):</h3>
              <table class="grammar-table">
                <tr><td>Un</td><td>=</td><td>een (mannelijk)</td></tr>
                <tr><td>Une</td><td>=</td><td>een (vrouwelijk)</td></tr>
                <tr><td>Des</td><td>=</td><td>enkele (meervoud)</td></tr>
              </table>
            </div>
          </div>

          <div class="grammar-card">
            <h2>⚡ Negatie (ontkenning)</h2>
            <div class="grammar-content">
              <p><strong>Ne ... pas</strong> wordt gebruikt om zinnen te ontkennen:</p>
              <table class="grammar-table">
                <tr><td>Je suis</td><td>→</td><td>Je ne suis pas</td></tr>
                <tr><td>J'ai</td><td>→</td><td>Je n'ai pas</td></tr>
                <tr><td>Il aime</td><td>→</td><td>Il n'aime pas</td></tr>
              </table>
              <p class="grammar-note">💡 <em>Ne</em> komt voor het werkwoord, <em>pas</em> komt erna.</p>
            </div>
          </div>

          <div class="grammar-card">
            <h2>❓ Vraagwoorden</h2>
            <div class="grammar-content">
              <table class="grammar-table">
                <tr><td>Qui?</td><td>=</td><td>Wie?</td></tr>
                <tr><td>Quoi?</td><td>=</td><td>Wat?</td></tr>
                <tr><td>Où?</td><td>=</td><td>Waar?</td></tr>
                <tr><td>Quand?</td><td>=</td><td>Wanneer?</td></tr>
                <tr><td>Pourquoi?</td><td>=</td><td>Waarom?</td></tr>
                <tr><td>Comment?</td><td>=</td><td>Hoe?</td></tr>
                <tr><td>Combien?</td><td>=</td><td>Hoeveel?</td></tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("back-to-home")?.addEventListener("click", () => this.showHomePage());
  }

  private showVocabularyPage(): void {
    this.currentPage = "vocabulary";

    // Collect all words from vocabulary
    const allWords = vocabulary.flatMap(cat =>
      cat.words.map(w => ({ ...w, category: cat.name, categoryFr: cat.nameFr }))
    );

    // Collect all sentences
    const allSentences = dailySentences.flatMap(cat =>
      cat.sentences.map(s => ({ ...s, category: cat.name, categoryFr: cat.nameFr }))
    );

    this.container.innerHTML = `
      <div class="vocabulary-page">
        <button class="btn-back" id="back-to-home">← Home</button>
        <h1>📝 Woordenlijst</h1>
        <p class="subtitle">Alle woorden en zinnen op een rij</p>

        <div class="vocab-tabs">
          <button class="vocab-tab active" id="tab-words">Woorden (${allWords.length})</button>
          <button class="vocab-tab" id="tab-sentences">Zinnen (${allSentences.length})</button>
        </div>

        <div class="vocab-content" id="vocab-words">
          <div class="vocab-search">
            <input type="text" id="search-words" placeholder="🔍 Zoek een woord..." />
          </div>
          <table class="vocab-table">
            <thead>
              <tr>
                <th>Emoji</th>
                <th>Nederlands</th>
                <th>Français</th>
                <th>Categorie</th>
              </tr>
            </thead>
            <tbody id="words-tbody">
              ${allWords.map(w => `
                <tr>
                  <td class="emoji-col">${w.emoji}</td>
                  <td>${w.dutch}</td>
                  <td>${w.french}</td>
                  <td class="category-col">${w.category}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="vocab-content hidden" id="vocab-sentences">
          <div class="vocab-search">
            <input type="text" id="search-sentences" placeholder="🔍 Zoek een zin..." />
          </div>
          <table class="vocab-table">
            <thead>
              <tr>
                <th>Emoji</th>
                <th>Nederlands</th>
                <th>Français</th>
                <th>Categorie</th>
              </tr>
            </thead>
            <tbody id="sentences-tbody">
              ${allSentences.map(s => `
                <tr>
                  <td class="emoji-col">${s.emoji}</td>
                  <td>${s.dutch}</td>
                  <td>${s.french}</td>
                  <td class="category-col">${s.category}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById("back-to-home")?.addEventListener("click", () => this.showHomePage());

    // Tab switching
    document.getElementById("tab-words")?.addEventListener("click", () => {
      document.getElementById("tab-words")?.classList.add("active");
      document.getElementById("tab-sentences")?.classList.remove("active");
      document.getElementById("vocab-words")?.classList.remove("hidden");
      document.getElementById("vocab-sentences")?.classList.add("hidden");
    });

    document.getElementById("tab-sentences")?.addEventListener("click", () => {
      document.getElementById("tab-sentences")?.classList.add("active");
      document.getElementById("tab-words")?.classList.remove("active");
      document.getElementById("vocab-sentences")?.classList.remove("hidden");
      document.getElementById("vocab-words")?.classList.add("hidden");
    });

    // Search functionality
    document.getElementById("search-words")?.addEventListener("input", (e) => {
      const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
      const rows = document.querySelectorAll("#words-tbody tr");
      rows.forEach(row => {
        const text = row.textContent?.toLowerCase() || "";
        (row as HTMLElement).style.display = text.includes(searchTerm) ? "" : "none";
      });
    });

    document.getElementById("search-sentences")?.addEventListener("input", (e) => {
      const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
      const rows = document.querySelectorAll("#sentences-tbody tr");
      rows.forEach(row => {
        const text = row.textContent?.toLowerCase() || "";
        (row as HTMLElement).style.display = text.includes(searchTerm) ? "" : "none";
      });
    });
  }
}

new FrenchLearningApp();
