export interface UserProgress {
  totalPoints: number;
  currentStreak: number;
  lastPlayedDate: string;
  longestStreak: number;
  categoriesCompleted: string[];
  achievements: string[];
  categoryProgress: {
    [categoryName: string]: {
      wordsLearned: number;
      totalWords: number;
      gamesPlayed: number;
      bestScore: number;
    };
  };
  stats: {
    totalGamesPlayed: number;
    totalCorrectAnswers: number;
    totalQuestions: number;
    perfectScores: number;
  };
}

export interface Achievement {
  id: string;
  name: string;
  nameFr: string;
  description: string;
  emoji: string;
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_steps",
    name: "Eerste Stappen",
    nameFr: "Premiers Pas",
    description: "Voltooi je eerste oefening",
    emoji: "👣",
    points: 10,
    unlocked: false,
  },
  {
    id: "word_explorer",
    name: "Woorden Ontdekker",
    nameFr: "Explorateur de Mots",
    description: "Leer 25 woorden",
    emoji: "🗺️",
    points: 25,
    unlocked: false,
  },
  {
    id: "word_master",
    name: "Woorden Meester",
    nameFr: "Maître des Mots",
    description: "Leer 50 woorden",
    emoji: "🎓",
    points: 50,
    unlocked: false,
  },
  {
    id: "sentence_starter",
    name: "Zinnen Starter",
    nameFr: "Débutant en Phrases",
    description: "Oefen 10 zinnen",
    emoji: "💬",
    points: 20,
    unlocked: false,
  },
  {
    id: "perfect_score",
    name: "Perfecte Score",
    nameFr: "Score Parfait",
    description: "Behaal 100% in een quiz",
    emoji: "💯",
    points: 30,
    unlocked: false,
  },
  {
    id: "quiz_master",
    name: "Quiz Kampioen",
    nameFr: "Champion de Quiz",
    description: "Haal 5 keer een perfecte score",
    emoji: "🏆",
    points: 100,
    unlocked: false,
  },
  {
    id: "on_fire",
    name: "In de Flow",
    nameFr: "En Feu",
    description: "Bereik een 3-daagse streak",
    emoji: "🔥",
    points: 40,
    unlocked: false,
  },
  {
    id: "dedicated",
    name: "Toegewijd",
    nameFr: "Dévoué",
    description: "Bereik een 7-daagse streak",
    emoji: "⭐",
    points: 75,
    unlocked: false,
  },
  {
    id: "animal_expert",
    name: "Dieren Expert",
    nameFr: "Expert des Animaux",
    description: "Voltooi de categorie Dieren",
    emoji: "🐾",
    points: 20,
    unlocked: false,
  },
  {
    id: "color_expert",
    name: "Kleuren Expert",
    nameFr: "Expert des Couleurs",
    description: "Voltooi de categorie Kleuren",
    emoji: "🎨",
    points: 20,
    unlocked: false,
  },
  {
    id: "verb_virtuoso",
    name: "Werkwoorden Virtuoos",
    nameFr: "Virtuose des Verbes",
    description: "Voltooi de categorie Werkwoorden",
    emoji: "🏃",
    points: 30,
    unlocked: false,
  },
  {
    id: "century",
    name: "Eeuwfeest",
    nameFr: "Centenaire",
    description: "Verzamel 100 punten",
    emoji: "💰",
    points: 0,
    unlocked: false,
  },
  {
    id: "half_thousand",
    name: "Halfduizend",
    nameFr: "Demi-Millier",
    description: "Verzamel 500 punten",
    emoji: "💎",
    points: 0,
    unlocked: false,
  },
  {
    id: "french_enthusiast",
    name: "Frans Liefhebber",
    nameFr: "Passionné de Français",
    description: "Speel 25 spelletjes",
    emoji: "🎮",
    points: 50,
    unlocked: false,
  },
  {
    id: "speed_demon",
    name: "Snelheidsduivel",
    nameFr: "Démon de Vitesse",
    description: "Voltooi 10 spelletjes op één dag",
    emoji: "⚡",
    points: 60,
    unlocked: false,
  },
];

class ProgressManager {
  private storageKey = "french_learning_progress";

  getProgress(): UserProgress {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    return this.createDefaultProgress();
  }

  private createDefaultProgress(): UserProgress {
    return {
      totalPoints: 0,
      currentStreak: 0,
      lastPlayedDate: "",
      longestStreak: 0,
      categoriesCompleted: [],
      achievements: [],
      categoryProgress: {},
      stats: {
        totalGamesPlayed: 0,
        totalCorrectAnswers: 0,
        totalQuestions: 0,
        perfectScores: 0,
      },
    };
  }

  saveProgress(progress: UserProgress): void {
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }

  updateStreak(progress: UserProgress): UserProgress {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (progress.lastPlayedDate === today) {
      // Already played today, no change
      return progress;
    } else if (progress.lastPlayedDate === yesterday) {
      // Played yesterday, increment streak
      progress.currentStreak++;
    } else if (progress.lastPlayedDate === "") {
      // First time playing
      progress.currentStreak = 1;
    } else {
      // Streak broken
      progress.currentStreak = 1;
    }

    progress.lastPlayedDate = today;
    if (progress.currentStreak > progress.longestStreak) {
      progress.longestStreak = progress.currentStreak;
    }

    return progress;
  }

  recordGameComplete(
    categoryName: string,
    totalWords: number,
    correctAnswers: number,
    totalQuestions: number
  ): { progress: UserProgress; newAchievements: Achievement[] } {
    let progress = this.getProgress();
    progress = this.updateStreak(progress);

    // Initialize category progress if needed
    if (!progress.categoryProgress[categoryName]) {
      progress.categoryProgress[categoryName] = {
        wordsLearned: 0,
        totalWords: totalWords,
        gamesPlayed: 0,
        bestScore: 0,
      };
    }

    const category = progress.categoryProgress[categoryName];
    category.gamesPlayed++;

    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
    if (scorePercentage > category.bestScore) {
      category.bestScore = scorePercentage;
    }

    // Update words learned (approximate based on correct answers)
    const estimatedWordsLearned = Math.min(
      Math.floor(correctAnswers * 0.8),
      totalWords
    );
    if (estimatedWordsLearned > category.wordsLearned) {
      category.wordsLearned = estimatedWordsLearned;
    }

    // Update stats
    progress.stats.totalGamesPlayed++;
    progress.stats.totalCorrectAnswers += correctAnswers;
    progress.stats.totalQuestions += totalQuestions;

    // Award points based on performance
    const basePoints = Math.floor(correctAnswers * 2);
    const bonusPoints = scorePercentage === 100 ? 10 : 0;
    progress.totalPoints += basePoints + bonusPoints;

    if (scorePercentage === 100) {
      progress.stats.perfectScores++;
    }

    // Check if category is completed (80% or better)
    if (
      scorePercentage >= 80 &&
      !progress.categoriesCompleted.includes(categoryName)
    ) {
      progress.categoriesCompleted.push(categoryName);
      progress.totalPoints += 20; // Bonus for completing category
    }

    // Check for new achievements
    const newAchievements = this.checkAchievements(progress);

    this.saveProgress(progress);
    return { progress, newAchievements };
  }

  private checkAchievements(progress: UserProgress): Achievement[] {
    const newAchievements: Achievement[] = [];

    for (const achievement of ACHIEVEMENTS) {
      if (progress.achievements.includes(achievement.id)) {
        continue; // Already unlocked
      }

      let unlocked = false;

      switch (achievement.id) {
        case "first_steps":
          unlocked = progress.stats.totalGamesPlayed >= 1;
          break;
        case "word_explorer":
          const totalWordsLearned = Object.values(
            progress.categoryProgress
          ).reduce((sum, cat) => sum + cat.wordsLearned, 0);
          unlocked = totalWordsLearned >= 25;
          break;
        case "word_master":
          const totalWords = Object.values(progress.categoryProgress).reduce(
            (sum, cat) => sum + cat.wordsLearned,
            0
          );
          unlocked = totalWords >= 50;
          break;
        case "sentence_starter":
          const sentenceGames = Object.keys(progress.categoryProgress).filter(
            (name) =>
              name.includes("Begroetingen") ||
              name.includes("Beleefdheid") ||
              name.includes("Dagelijks") ||
              name.includes("Gevoelens") ||
              name.includes("Être") ||
              name.includes("Avoir")
          ).length;
          unlocked = sentenceGames >= 3;
          break;
        case "perfect_score":
          unlocked = progress.stats.perfectScores >= 1;
          break;
        case "quiz_master":
          unlocked = progress.stats.perfectScores >= 5;
          break;
        case "on_fire":
          unlocked = progress.currentStreak >= 3;
          break;
        case "dedicated":
          unlocked = progress.currentStreak >= 7;
          break;
        case "animal_expert":
          unlocked = progress.categoriesCompleted.includes("Dieren");
          break;
        case "color_expert":
          unlocked = progress.categoriesCompleted.includes("Kleuren");
          break;
        case "verb_virtuoso":
          unlocked = progress.categoriesCompleted.includes("Werkwoorden");
          break;
        case "century":
          unlocked = progress.totalPoints >= 100;
          break;
        case "half_thousand":
          unlocked = progress.totalPoints >= 500;
          break;
        case "french_enthusiast":
          unlocked = progress.stats.totalGamesPlayed >= 25;
          break;
        case "speed_demon":
          // This would require tracking games per day - simplified for now
          unlocked = false;
          break;
      }

      if (unlocked) {
        progress.achievements.push(achievement.id);
        progress.totalPoints += achievement.points;
        achievement.unlocked = true;
        achievement.unlockedDate = new Date().toISOString();
        newAchievements.push({ ...achievement });
      }
    }

    return newAchievements;
  }

  getAchievements(): Achievement[] {
    const progress = this.getProgress();
    return ACHIEVEMENTS.map((achievement) => ({
      ...achievement,
      unlocked: progress.achievements.includes(achievement.id),
    }));
  }

  resetProgress(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const progressManager = new ProgressManager();
