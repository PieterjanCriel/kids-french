import type { Word } from "../vocabulary";
import { shuffleArray } from "../vocabulary";

export class QuizGame {
  private words: Word[];
  private currentIndex: number = 0;
  private score: number = 0;
  private container: HTMLElement;
  private onComplete: (correctAnswers: number, totalQuestions: number) => void;
  private onHome: () => void;

  constructor(words: Word[], container: HTMLElement, onComplete: (correctAnswers: number, totalQuestions: number) => void, onHome: () => void) {
    this.words = shuffleArray(words);
    this.container = container;
    this.onComplete = onComplete;
    this.onHome = onHome;
    this.render();
  }

  private render(): void {
    const word = this.words[this.currentIndex];
    const options = this.generateOptions(word);
    const progress = `${this.currentIndex + 1} / ${this.words.length}`;

    this.container.innerHTML = `
      <div class="game-header">
        <button class="btn-home" id="btn-home">🏠</button>
        <h2>🧠 Quiz</h2>
        <div class="progress">${progress}</div>
        <div class="score">⭐ ${this.score}</div>
      </div>
      <div class="quiz-question">
        <span class="emoji">${word.emoji}</span>
        <span class="question">Wat is "${word.dutch}" in het Frans?</span>
      </div>
      <div class="quiz-options">
        ${options.map((opt, i) => `
          <button class="quiz-option" data-answer="${opt}" data-correct="${opt === word.french}">
            ${String.fromCharCode(65 + i)}. ${opt}
          </button>
        `).join("")}
      </div>
    `;

    document.getElementById("btn-home")?.addEventListener("click", this.onHome);

    document.querySelectorAll(".quiz-option").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const isCorrect = target.dataset.correct === "true";
        this.handleAnswer(isCorrect, target);
      });
    });
  }

  private generateOptions(correctWord: Word): string[] {
    const otherWords = this.words.filter(w => w.french !== correctWord.french);
    const wrongOptions = shuffleArray(otherWords).slice(0, 3).map(w => w.french);
    return shuffleArray([correctWord.french, ...wrongOptions]);
  }

  private handleAnswer(correct: boolean, button: HTMLElement): void {
    // Disable all buttons
    document.querySelectorAll(".quiz-option").forEach(btn => {
      (btn as HTMLButtonElement).disabled = true;
      if (btn.getAttribute("data-correct") === "true") {
        btn.classList.add("correct");
      }
    });

    if (correct) {
      this.score++;
      button.classList.add("correct");
      this.showFeedback("✅ Correct!", true);
    } else {
      button.classList.add("wrong");
      this.showFeedback("❌ Helaas!", false);
    }

    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.words.length) {
        this.showResults();
      } else {
        this.render();
      }
    }, 1200);
  }

  private showFeedback(message: string, isCorrect: boolean): void {
    const feedback = document.createElement("div");
    feedback.className = `feedback ${isCorrect ? "correct" : "wrong"}`;
    feedback.textContent = message;
    this.container.querySelector(".quiz-options")?.appendChild(feedback);
  }

  private showResults(): void {
    const percentage = Math.round((this.score / this.words.length) * 100);
    const emoji = percentage >= 80 ? "🏆" : percentage >= 50 ? "🎉" : "💪";
    const message = percentage >= 80 ? "Super goed!" : percentage >= 50 ? "Goed gedaan!" : "Blijf oefenen!";

    this.container.innerHTML = `
      <div class="results">
        <h2>${emoji} ${message}</h2>
        <div class="results-score">
          <span class="big-emoji">⭐</span>
          <span class="score-text">${this.score} / ${this.words.length}</span>
          <span class="percentage">${percentage}%</span>
        </div>
        <button class="btn btn-primary" id="btn-back">🏠 Terug naar menu</button>
      </div>
    `;

    document.getElementById("btn-back")?.addEventListener("click", () => this.onComplete(this.score, this.words.length));
  }
}
