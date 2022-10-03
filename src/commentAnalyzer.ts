import { validURL } from "./helpers";

class Analyzer {
  comment: string;

  constructor(comment: string) {
    this.comment = comment;
  }

  contains(str: string) {
    return this.comment.toLowerCase().includes(str.toLowerCase());
  }

  isSpam() {
    const commentStrings = this.comment.split(" ");
    let hasSpam = false;
    for (let i = 0; i < commentStrings.length; i++) {
      if (validURL(commentStrings[i])) {
        hasSpam = true;
        break;
      }
    }
    return hasSpam;
  }

  analyze() {
    return {
      SHORTER_THAN_15: this.comment.length < 15,
      MOVER_MENTIONS: this.contains("Mover"),
      SHAKER_MENTIONS: this.contains("Shaker"),
      QUESTION: this.contains("?"),
      SPAM: this.isSpam(),
    };
  }
}

module.exports = Analyzer;
