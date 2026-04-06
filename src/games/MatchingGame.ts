import type { Word } from "../vocabulary";
import { shuffleArray } from "../vocabulary";

interface Card {
  id: number;
  text: string;
  emoji: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export class MatchingGame {
  private cards: Card[] = [];
  private flippedCards: Card[] = [];
  private matches: number = 0;
  private moves: number = 0;
  private container: HTMLElement;
  private onComplete: (correctAnswers: number, totalQuestions: number) => void;
  private onHome: () => void;
  private isProcessing: boolean = false;
  private totalPairs: number = 0;

  constructor(words: Word[], container: HTMLElement, onComplete: (correctAnswers: number, totalQuestions: number) => void, onHome: () => void) {
    this.container = container;
    this.onComplete = onComplete;
    this.onHome = onHome;
    this.initializeCards(words.slice(0, 6)); // Use 6 pairs for matching game
    this.render();
  }

  private initializeCards(words: Word[]): void {
    const cards: Card[] = [];
    words.forEach((word, index) => {
      cards.push({ id: index * 2, text: word.dutch, emoji: word.emoji, pairId: index, isFlipped: false, isMatched: false });
      cards.push({ id: index * 2 + 1, text: word.french, emoji: word.emoji, pairId: index, isFlipped: false, isMatched: false });
    });
    this.cards = shuffleArray(cards);
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="game-header">
        <button class="btn-home" id="btn-home">🏠</button>
        <h2>🃏 Memory Match</h2>
        <div class="stats">
          <span>🎯 ${this.matches}/${this.cards.length / 2}</span>
          <span>🔄 ${this.moves} zetten</span>
        </div>
      </div>
      <div class="matching-grid" id="matching-grid">
        ${this.cards.map(card => `
          <div class="match-card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}" 
               data-id="${card.id}">
            <div class="match-card-inner">
              <div class="match-card-front">❓</div>
              <div class="match-card-back">
                <span class="emoji">${card.emoji}</span>
                <span class="text">${card.text}</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    document.getElementById("btn-home")?.addEventListener("click", this.onHome);

    document.querySelectorAll(".match-card").forEach(cardEl => {
      cardEl.addEventListener("click", (e) => {
        const id = parseInt((e.currentTarget as HTMLElement).dataset.id || "0");
        this.flipCard(id);
      });
    });
  }

  private flipCard(id: number): void {
    if (this.isProcessing) return;
    
    const card = this.cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    card.isFlipped = true;
    this.flippedCards.push(card);
    this.updateCard(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  private updateCard(card: Card): void {
    const cardEl = document.querySelector(`[data-id="${card.id}"]`);
    if (cardEl) {
      cardEl.classList.toggle("flipped", card.isFlipped);
      cardEl.classList.toggle("matched", card.isMatched);
    }
    document.querySelector(".stats")!.innerHTML = `
      <span>🎯 ${this.matches}/${this.cards.length / 2}</span>
      <span>🔄 ${this.moves} zetten</span>
    `;
  }

  private checkMatch(): void {
    this.isProcessing = true;
    const [card1, card2] = this.flippedCards;

    setTimeout(() => {
      if (card1.pairId === card2.pairId) {
        card1.isMatched = true;
        card2.isMatched = true;
        this.matches++;
        this.updateCard(card1);
        this.updateCard(card2);

        if (this.matches === this.cards.length / 2) {
          setTimeout(() => this.showResults(), 500);
        }
      } else {
        card1.isFlipped = false;
        card2.isFlipped = false;
        this.updateCard(card1);
        this.updateCard(card2);
      }
      this.flippedCards = [];
      this.isProcessing = false;
    }, 800);
  }

  private showResults(): void {
    const stars = this.moves <= 8 ? "⭐⭐⭐" : this.moves <= 12 ? "⭐⭐" : "⭐";
    this.container.innerHTML = `
      <div class="results">
        <h2>🎉 Geweldig!</h2>
        <div class="results-score">
          <span class="big-emoji">${stars}</span>
          <span class="score-text">${this.moves} zetten</span>
        </div>
        <button class="btn btn-primary" id="btn-back">🏠 Terug naar menu</button>
      </div>
    `;
    document.getElementById("btn-back")?.addEventListener("click", () => this.onComplete(this.matches, this.totalPairs));
  }
}
