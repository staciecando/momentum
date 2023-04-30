const quotes = [
  {
    quote: "Get busy living or get busy dying.",
    author: "- Stephen King",
  },
  {
    quote: "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.",
    author: "- Henry Ford",
  },
  {
    quote:
      "Life is not a problem to be solved, but a reality to be experienced..",
    author: "- Soren Kierkegaard",
  },
  {
    quote: "Turn your wounds into wisdom.",
    author: "- Oprah Winfrey",
  },
  {
    quote: "Live for each second without hesitation.",
    author: "- Elton John",
  },
  {
    quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "- Albert Einstein",
  },
  {
    quote: "If you live long enough, you'll make mistakes. But if you learn from them, you'll be a better person.",
    author: "- Bill Clinton",
  },
  {
    quote: "We should remember that just as a positive outlook on life can promote good health, so can everyday acts of kindness.",
    author: "- Hillary Clinton",
  },
  {
    quote: "The best way to predict your future is to create it.",
    author: "- Abraham Lincoln",
  },
  {
    quote: "You must expect great things of yourself before you can do them.",
    author: "- Michael Jordan",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;