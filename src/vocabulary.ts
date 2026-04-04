export interface Word {
  dutch: string;
  french: string;
  emoji: string;
}

export interface Category {
  name: string;
  nameFr: string;
  emoji: string;
  words: Word[];
}

export interface Sentence {
  dutch: string;
  french: string;
  emoji: string;
}

export interface SentenceCategory {
  name: string;
  nameFr: string;
  emoji: string;
  sentences: Sentence[];
}

export const vocabulary: Category[] = [
  {
    name: "Dieren",
    nameFr: "Animaux",
    emoji: "🐾",
    words: [
      { dutch: "hond", french: "chien", emoji: "🐕" },
      { dutch: "kat", french: "chat", emoji: "🐱" },
      { dutch: "vogel", french: "oiseau", emoji: "🐦" },
      { dutch: "vis", french: "poisson", emoji: "🐟" },
      { dutch: "paard", french: "cheval", emoji: "🐴" },
      { dutch: "koe", french: "vache", emoji: "🐄" },
      { dutch: "varken", french: "cochon", emoji: "🐷" },
      { dutch: "konijn", french: "lapin", emoji: "🐰" },
      { dutch: "muis", french: "souris", emoji: "🐭" },
      { dutch: "olifant", french: "éléphant", emoji: "🐘" },
    ],
  },
  {
    name: "Kleuren",
    nameFr: "Couleurs",
    emoji: "🎨",
    words: [
      { dutch: "rood", french: "rouge", emoji: "🔴" },
      { dutch: "blauw", french: "bleu", emoji: "🔵" },
      { dutch: "groen", french: "vert", emoji: "🟢" },
      { dutch: "geel", french: "jaune", emoji: "🟡" },
      { dutch: "oranje", french: "orange", emoji: "🟠" },
      { dutch: "paars", french: "violet", emoji: "🟣" },
      { dutch: "zwart", french: "noir", emoji: "⚫" },
      { dutch: "wit", french: "blanc", emoji: "⚪" },
      { dutch: "roze", french: "rose", emoji: "🩷" },
      { dutch: "bruin", french: "marron", emoji: "🟤" },
    ],
  },
  {
    name: "Getallen",
    nameFr: "Nombres",
    emoji: "🔢",
    words: [
      { dutch: "een", french: "un", emoji: "1️⃣" },
      { dutch: "twee", french: "deux", emoji: "2️⃣" },
      { dutch: "drie", french: "trois", emoji: "3️⃣" },
      { dutch: "vier", french: "quatre", emoji: "4️⃣" },
      { dutch: "vijf", french: "cinq", emoji: "5️⃣" },
      { dutch: "zes", french: "six", emoji: "6️⃣" },
      { dutch: "zeven", french: "sept", emoji: "7️⃣" },
      { dutch: "acht", french: "huit", emoji: "8️⃣" },
      { dutch: "negen", french: "neuf", emoji: "9️⃣" },
      { dutch: "tien", french: "dix", emoji: "🔟" },
    ],
  },
  {
    name: "Eten",
    nameFr: "Nourriture",
    emoji: "🍽️",
    words: [
      { dutch: "appel", french: "pomme", emoji: "🍎" },
      { dutch: "brood", french: "pain", emoji: "🍞" },
      { dutch: "kaas", french: "fromage", emoji: "🧀" },
      { dutch: "water", french: "eau", emoji: "💧" },
      { dutch: "melk", french: "lait", emoji: "🥛" },
      { dutch: "ei", french: "œuf", emoji: "🥚" },
      { dutch: "banaan", french: "banane", emoji: "🍌" },
      { dutch: "aardbei", french: "fraise", emoji: "🍓" },
      { dutch: "ijs", french: "glace", emoji: "🍦" },
      { dutch: "chocolade", french: "chocolat", emoji: "🍫" },
    ],
  },
  {
    name: "Familie",
    nameFr: "Famille",
    emoji: "👨‍👩‍👧‍👦",
    words: [
      { dutch: "moeder", french: "mère", emoji: "👩" },
      { dutch: "vader", french: "père", emoji: "👨" },
      { dutch: "broer", french: "frère", emoji: "👦" },
      { dutch: "zus", french: "sœur", emoji: "👧" },
      { dutch: "oma", french: "grand-mère", emoji: "👵" },
      { dutch: "opa", french: "grand-père", emoji: "👴" },
      { dutch: "baby", french: "bébé", emoji: "👶" },
      { dutch: "kind", french: "enfant", emoji: "🧒" },
      { dutch: "huis", french: "maison", emoji: "🏠" },
      { dutch: "tuin", french: "jardin", emoji: "🌳" },
    ],
  },
  {
    name: "Minecraft",
    nameFr: "Minecraft",
    emoji: "⛏️",
    words: [
      { dutch: "blok", french: "bloc", emoji: "🟫" },
      { dutch: "zwaard", french: "épée", emoji: "🗡️" },
      { dutch: "diamant", french: "diamant", emoji: "💎" },
      { dutch: "creeper", french: "creeper", emoji: "💚" },
      { dutch: "hout", french: "bois", emoji: "🪵" },
      { dutch: "steen", french: "pierre", emoji: "🪨" },
      { dutch: "goud", french: "or", emoji: "🥇" },
      { dutch: "ijzer", french: "fer", emoji: "⚙️" },
      { dutch: "varken", french: "cochon", emoji: "🐷" },
      { dutch: "kip", french: "poulet", emoji: "🐔" },
      { dutch: "schaap", french: "mouton", emoji: "🐑" },
      { dutch: "wolf", french: "loup", emoji: "🐺" },
      { dutch: "boom", french: "arbre", emoji: "🌲" },
      { dutch: "huis bouwen", french: "construire", emoji: "🏗️" },
      { dutch: "graven", french: "creuser", emoji: "⛏️" },
    ],
  },
  {
    name: "Zelda",
    nameFr: "Zelda",
    emoji: "🗡️",
    words: [
      { dutch: "held", french: "héros", emoji: "🧝" },
      { dutch: "prinses", french: "princesse", emoji: "👸" },
      { dutch: "zwaard", french: "épée", emoji: "🗡️" },
      { dutch: "schild", french: "bouclier", emoji: "🛡️" },
      { dutch: "boog", french: "arc", emoji: "🏹" },
      { dutch: "paard", french: "cheval", emoji: "🐴" },
      { dutch: "kasteel", french: "château", emoji: "🏰" },
      { dutch: "draak", french: "dragon", emoji: "🐉" },
      { dutch: "schat", french: "trésor", emoji: "💰" },
      { dutch: "hart", french: "cœur", emoji: "❤️" },
      { dutch: "bos", french: "forêt", emoji: "🌳" },
      { dutch: "berg", french: "montagne", emoji: "⛰️" },
      { dutch: "magie", french: "magie", emoji: "✨" },
      { dutch: "monster", french: "monstre", emoji: "👹" },
      { dutch: "avontuur", french: "aventure", emoji: "🗺️" },
    ],
  },
  {
    name: "Werkwoorden",
    nameFr: "Verbes",
    emoji: "🏃",
    words: [
      { dutch: "zijn", french: "être", emoji: "✨" },
      { dutch: "hebben", french: "avoir", emoji: "🤲" },
      { dutch: "doen", french: "faire", emoji: "⚙️" },
      { dutch: "gaan", french: "aller", emoji: "🚶" },
      { dutch: "eten", french: "manger", emoji: "🍽️" },
      { dutch: "drinken", french: "boire", emoji: "🥤" },
      { dutch: "slapen", french: "dormir", emoji: "😴" },
      { dutch: "spelen", french: "jouer", emoji: "🎮" },
      { dutch: "lopen", french: "marcher", emoji: "🚶" },
      { dutch: "rennen", french: "courir", emoji: "🏃" },
      { dutch: "lezen", french: "lire", emoji: "📖" },
      { dutch: "schrijven", french: "écrire", emoji: "✍️" },
      { dutch: "kijken", french: "regarder", emoji: "👀" },
      { dutch: "luisteren", french: "écouter", emoji: "👂" },
      { dutch: "praten", french: "parler", emoji: "💬" },
    ],
  },
];

export const dailySentences: SentenceCategory[] = [
  {
    name: "Begroetingen",
    nameFr: "Salutations",
    emoji: "👋",
    sentences: [
      { dutch: "Hallo, hoe gaat het?", french: "Bonjour, comment ça va?", emoji: "👋" },
      { dutch: "Goed, en met jou?", french: "Bien, et toi?", emoji: "😊" },
      { dutch: "Goedemorgen!", french: "Bonjour!", emoji: "🌅" },
      { dutch: "Goedenavond!", french: "Bonsoir!", emoji: "🌆" },
      { dutch: "Tot ziens!", french: "Au revoir!", emoji: "👋" },
      { dutch: "Tot later!", french: "À plus tard!", emoji: "⏰" },
      { dutch: "Welterusten!", french: "Bonne nuit!", emoji: "🌙" },
      { dutch: "Hoe heet je?", french: "Comment tu t'appelles?", emoji: "❓" },
      { dutch: "Ik heet...", french: "Je m'appelle...", emoji: "😊" },
      { dutch: "Aangenaam!", french: "Enchanté!", emoji: "🤝" },
    ],
  },
  {
    name: "Beleefdheid",
    nameFr: "Politesse",
    emoji: "🙏",
    sentences: [
      { dutch: "Alstublieft", french: "S'il vous plaît", emoji: "🙏" },
      { dutch: "Dank je wel", french: "Merci", emoji: "🙏" },
      { dutch: "Heel erg bedankt!", french: "Merci beaucoup!", emoji: "😊" },
      { dutch: "Graag gedaan", french: "De rien", emoji: "😊" },
      { dutch: "Sorry", french: "Pardon", emoji: "😔" },
      { dutch: "Het spijt me", french: "Je suis désolé", emoji: "😔" },
      { dutch: "Geen probleem", french: "Pas de problème", emoji: "👍" },
      { dutch: "Excuseer me", french: "Excusez-moi", emoji: "🙋" },
      { dutch: "Mag ik...?", french: "Puis-je...?", emoji: "❓" },
      { dutch: "Ja, natuurlijk!", french: "Oui, bien sûr!", emoji: "✅" },
    ],
  },
  {
    name: "Dagelijks",
    nameFr: "Quotidien",
    emoji: "🏠",
    sentences: [
      { dutch: "Ik heb honger", french: "J'ai faim", emoji: "😋" },
      { dutch: "Ik heb dorst", french: "J'ai soif", emoji: "🥤" },
      { dutch: "Ik ben moe", french: "Je suis fatigué", emoji: "😴" },
      { dutch: "Wat tijd is het?", french: "Quelle heure est-il?", emoji: "⏰" },
      { dutch: "Waar is de wc?", french: "Où sont les toilettes?", emoji: "🚽" },
      { dutch: "Ik begrijp het niet", french: "Je ne comprends pas", emoji: "🤔" },
      { dutch: "Kun je dat herhalen?", french: "Peux-tu répéter?", emoji: "🔄" },
      { dutch: "Spreek je Nederlands?", french: "Parles-tu néerlandais?", emoji: "🗣️" },
      { dutch: "Ik leer Frans", french: "J'apprends le français", emoji: "📚" },
      { dutch: "Hoeveel kost dit?", french: "Combien ça coûte?", emoji: "💰" },
    ],
  },
  {
    name: "Gevoelens",
    nameFr: "Sentiments",
    emoji: "❤️",
    sentences: [
      { dutch: "Ik ben blij", french: "Je suis content", emoji: "😊" },
      { dutch: "Ik ben verdrietig", french: "Je suis triste", emoji: "😢" },
      { dutch: "Ik hou van je", french: "Je t'aime", emoji: "❤️" },
      { dutch: "Ik vind dit leuk", french: "J'aime ça", emoji: "👍" },
      { dutch: "Ik vind dit niet leuk", french: "Je n'aime pas ça", emoji: "👎" },
      { dutch: "Ik ben boos", french: "Je suis en colère", emoji: "😠" },
      { dutch: "Ik ben bang", french: "J'ai peur", emoji: "😨" },
      { dutch: "Dat is geweldig!", french: "C'est génial!", emoji: "🎉" },
      { dutch: "Dat is interessant", french: "C'est intéressant", emoji: "🤔" },
      { dutch: "Ik ben zenuwachtig", french: "Je suis nerveux", emoji: "😰" },
    ],
  },
  {
    name: "Être (zijn)",
    nameFr: "Être (to be)",
    emoji: "✨",
    sentences: [
      { dutch: "Ik ben", french: "Je suis", emoji: "👤" },
      { dutch: "Jij bent", french: "Tu es", emoji: "👥" },
      { dutch: "Hij/Zij is", french: "Il/Elle est", emoji: "👤" },
      { dutch: "Wij zijn", french: "Nous sommes", emoji: "👥" },
      { dutch: "Jullie zijn", french: "Vous êtes", emoji: "👥" },
      { dutch: "Zij zijn", french: "Ils/Elles sont", emoji: "👥" },
      { dutch: "Ik ben een student", french: "Je suis étudiant", emoji: "🎓" },
      { dutch: "Jij bent aardig", french: "Tu es gentil", emoji: "😊" },
      { dutch: "Hij is groot", french: "Il est grand", emoji: "📏" },
      { dutch: "Wij zijn vrienden", french: "Nous sommes amis", emoji: "🤝" },
      { dutch: "Jullie zijn slim", french: "Vous êtes intelligents", emoji: "🧠" },
      { dutch: "Zij zijn gelukkig", french: "Ils sont heureux", emoji: "😊" },
      { dutch: "Ik ben thuis", french: "Je suis à la maison", emoji: "🏠" },
      { dutch: "Het is mooi", french: "C'est beau", emoji: "✨" },
      { dutch: "Dat ben ik", french: "C'est moi", emoji: "👋" },
    ],
  },
  {
    name: "Avoir (hebben)",
    nameFr: "Avoir (to have)",
    emoji: "🤲",
    sentences: [
      { dutch: "Ik heb", french: "J'ai", emoji: "👤" },
      { dutch: "Jij hebt", french: "Tu as", emoji: "👥" },
      { dutch: "Hij/Zij heeft", french: "Il/Elle a", emoji: "👤" },
      { dutch: "Wij hebben", french: "Nous avons", emoji: "👥" },
      { dutch: "Jullie hebben", french: "Vous avez", emoji: "👥" },
      { dutch: "Zij hebben", french: "Ils/Elles ont", emoji: "👥" },
      { dutch: "Ik heb een hond", french: "J'ai un chien", emoji: "🐕" },
      { dutch: "Jij hebt een boek", french: "Tu as un livre", emoji: "📖" },
      { dutch: "Hij heeft honger", french: "Il a faim", emoji: "😋" },
      { dutch: "Wij hebben tijd", french: "Nous avons le temps", emoji: "⏰" },
      { dutch: "Jullie hebben geluk", french: "Vous avez de la chance", emoji: "🍀" },
      { dutch: "Zij hebben een huis", french: "Ils ont une maison", emoji: "🏠" },
      { dutch: "Ik heb geen geld", french: "Je n'ai pas d'argent", emoji: "💰" },
      { dutch: "Hoeveel jaar heb je?", french: "Quel âge as-tu?", emoji: "🎂" },
      { dutch: "Ik heb 10 jaar", french: "J'ai 10 ans", emoji: "🔟" },
    ],
  },
];

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
