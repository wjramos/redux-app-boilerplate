const FIVE_MINUTES = 5 * 60 * 1000;
const BOT_NAME = 'chatbot';
const TOP_COUNT = 10;

export default class Bot {
  constructor(chat = [], post) {
    this.post = post;
    this.words = {};
    this.recent = [];

    for (let i = chat.length - 1; i > 0; i--) {
      // Filter old posts and those posted by bot
      if (new Date(chat[i].date) > new Date(new Date().getTime() - FIVE_MINUTES) && chat[i].user !== BOT_NAME) {
        this.recent.push(chat[i]);
      } else {
        // Array is sorted by date, so when we find one that is too old, all following are older
        break;
      }
    }

    this.start();
  }

  get sortedWords() {
    this.countWords();
    // Sort words by descending frequency count - sorting on request rather than insertion
    return Object.keys(this.words).sort((a, b) => this.words[a] < this.words[b]);
  }

  get topWords() {
    // Retrieve top words from sorted list
    return this.sortedWords.slice(0, TOP_COUNT);
  }

  countWords() {
    this.clearWords();
    this.recent.forEach(({ value }) => (value.match(/\b(\w+)\b/gi) || []).forEach(word => (this.words[word] = (this.words[word] || 0) + 1)));
  }

  clearWords() {
    this.words = {};
  }

  start() {
    this.sendMessage();
    this.timer = setInterval(this.sendMessage, FIVE_MINUTES);
  }

  stop() {
    // Allows timer to be killed
    this.timer = null;
  }

  clearStale() {
    // Re-filter cached massages
    this.recent = this.recent.filter(message => new Date(message.date) > new Date(new Date().getTime() - FIVE_MINUTES));
  }

  get wordList() {
    // Construct list of words with corresponding counts (plural if > 1)
    let wordList = '';
    for (let i = 0; i < this.topWords.length; i++) {
      const word = this.topWords[i];
      const count = this.words[word];
      if (i > 0) {
        wordList += ', ';
      }
      wordList += `${word} (${count} time${count > 1 ? 's' : ''})`;
    }

    return wordList;
  }

  sendMessage() {
    this.clearStale();
    this.countWords();

    // Only post if there have been posts within the past 5 minutes
    if (this.wordList) {
      return this.post({
        user: BOT_NAME,
        value: `The most frequently used words in the past 5 minutes were: ${this.wordList}`,
      });
    }

    return null;
  }
}
