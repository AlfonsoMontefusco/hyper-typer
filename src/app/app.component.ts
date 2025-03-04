import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  texts: string[] = [
    'The only way to do great work is to love what you do.',
    'Success is not the key to happiness. Happiness is the key to success.',
    'The best time to plant a tree was 20 years ago. The second best time is now.',
    'Don’t watch the clock; do what it does. Keep going.',
    'It always seems impossible until it’s done.',
    'You are never too old to set another goal or to dream a new dream.',
    'Success usually comes to those who are too busy to be looking for it.',
    'The harder you work for something, the greater you’ll feel when you achieve it.',
    'Dream big and dare to fail.',
    'It does not matter how slowly you go as long as you do not stop.',
    'Believe you can and you’re halfway there.',
    'The way to get started is to quit talking and begin doing.',
    'Your time is limited, so don’t waste it living someone else’s life.',
    'In the middle of difficulty lies opportunity.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'Opportunities don’t happen, you create them.',
    'Everything you can imagine is real.',
    'What we think, we become.',
    'Act as if what you do makes a difference. It does.'
  ];  
  currentText: string = '';
  userInput: string = '';
  startTime: number = 0;
  wpm: number = 0;
  accuracy: number = 100;
  timer: any;
  isGameOver: boolean = false;
  currentCharIndex: number = 0;
  incorrectCharIndex: number | null = null;
  hasStartedTyping: boolean = false;

  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    this.currentText = this.texts[Math.floor(Math.random() * this.texts.length)];
    this.userInput = '';
    this.currentCharIndex = 0;
    this.isGameOver = false;
    this.incorrectCharIndex = null;
    this.startTime = 0;
    this.wpm = 0;
    this.accuracy = 100;
    this.hasStartedTyping = false;
    clearInterval(this.timer);
    this.timer = setInterval(() => this.calculateWPM(), 1000);
  }

  checkTyping() {
    const typed = this.userInput;

    if (!this.hasStartedTyping && typed.length > 0) {
      this.hasStartedTyping = true;
      this.startTime = Date.now(); 
    }

    if (typed[this.currentCharIndex] === this.currentText[this.currentCharIndex]) {
      this.currentCharIndex++;
      this.incorrectCharIndex = null;
    } else if (typed[this.currentCharIndex] !== this.currentText[this.currentCharIndex]) {
      this.incorrectCharIndex = this.currentCharIndex;
    }

    const correctChars = typed.split('').filter((char, index) => char === this.currentText[index]).length;
    const typedLength = typed.length === 0 ? 1 : typed.length;  // Avoid division by zero
    this.accuracy = (correctChars / typedLength) * 100;

    if (typed === this.currentText) {
      this.endGame();
    }
  }

  calculateWPM() {
    if (this.hasStartedTyping) {
      const timeElapsed = (Date.now() - this.startTime) / 60000;
      const wordsTyped = this.userInput.trim().split(/\s+/).length;
      this.wpm = Math.round(wordsTyped / timeElapsed);
    }
  }

  endGame() {
    clearInterval(this.timer);
    this.isGameOver = true;
  }

  get currentTextArray(): string[] {
    return this.currentText.split('');
  }
}
