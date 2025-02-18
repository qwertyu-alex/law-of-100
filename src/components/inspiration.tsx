const inspiration = [
  {
    quote: "Success isn’t owned, it’s leased. And rent is due every day.",
    author: "J.J. Watt",
  },
  {
    quote: "Your salary is the bribe they give you to forget your dreams.",
    author: "Unknown",
  },
  {
    quote: "Grind now so you can live the life others dream about later.",
    author: "Unknown",
  },
  {
    quote:
      "Entrepreneurship is living a few years of your life like most won’t, so you can spend the rest of your life like most can’t.",
    author: "Unknown",
  },
  {
    quote:
      "The man who stops advertising to save money is like the man who stops a clock to save time.",
    author: "Henry Ford",
  },
  {
    quote:
      "Don't quit. Suffer now and live the rest of your life as a champion.",
    author: "Muhammad Ali",
  },
  {
    quote:
      "Build your own dreams, or someone else will hire you to build theirs.",
    author: "Farrah Gray",
  },
  {
    quote:
      "There is no shortage of money, only a shortage of people willing to go get it.",
    author: "Unknown",
  },
  {
    quote: "You have two choices: Make progress or make excuses.",
    author: "Unknown",
  },
  {
    quote: "A vision without execution is just a dream.",
    author: "Unknown",
  },
  {
    quote: "Your network is your net worth.",
    author: "Unknown",
  },
  {
    quote:
      "If you don’t find a way to make money while you sleep, you will work until you die.",
    author: "Warren Buffett",
  },
  {
    quote: "Hustle beats talent when talent doesn’t hustle.",
    author: "Unknown",
  },
  {
    quote:
      "If you want something you’ve never had, you must be willing to do something you’ve never done.",
    author: "Thomas Jefferson",
  },
  {
    quote: "Comfort is the enemy of progress.",
    author: "Unknown",
  },
  {
    quote: "No one cares about your excuses. Work harder.",
    author: "Unknown",
  },
  {
    quote:
      "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
  },
  {
    quote: "Don’t watch the clock; do what it does—keep going.",
    author: "Sam Levenson",
  },
  {
    quote:
      "The harder you work for something, the greater you’ll feel when you achieve it.",
    author: "Unknown",
  },
  {
    quote:
      "Success isn’t about how much money you make, it’s about the impact you have on the world.",
    author: "Michelle Obama",
  },
  {
    quote:
      "Discipline is doing what you hate to do, but doing it like you love it.",
    author: "Mike Tyson",
  },
  {
    quote: "Hard work beats talent when talent doesn’t work hard.",
    author: "Tim Notke",
  },
  {
    quote:
      "We must all suffer one of two things: the pain of discipline or the pain of regret.",
    author: "Jim Rohn",
  },
  {
    quote:
      "It’s not that I’m so smart, it’s just that I stay with problems longer.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Success is nothing more than a few simple disciplines, practiced every day.",
    author: "Jim Rohn",
  },
  {
    quote: "Do what you have to do until you can do what you want to do.",
    author: "Oprah Winfrey",
  },
  {
    quote: "If you’re going through hell, keep going.",
    author: "Winston Churchill",
  },
  {
    quote:
      "You will never always be motivated, so you must learn to be disciplined.",
    author: "Unknown",
  },
  {
    quote:
      "We do not rise to the level of our goals, we fall to the level of our systems.",
    author: "James Clear",
  },
  {
    quote: "Suffer the pain of discipline or suffer the pain of regret.",
    author: "Unknown",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote:
      "Success isn’t overnight. It’s when every day you get a little better than the day before. It all adds up.",
    author: "Dwayne Johnson",
  },
  {
    quote: "Discipline equals freedom.",
    author: "Jocko Willink",
  },
  {
    quote:
      "There’s no magic to success—it’s just discipline, hard work, and consistency.",
    author: "Denzel Washington",
  },
  {
    quote:
      "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    quote: "Champions keep playing until they get it right.",
    author: "Billie Jean King",
  },
  {
    quote: "Motivation gets you going, but discipline keeps you growing.",
    author: "John C. Maxwell",
  },
  {
    quote:
      "Successful people do what unsuccessful people are not willing to do.",
    author: "Jeff Olson",
  },
  {
    quote:
      "I am not afraid of the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
    author: "Bruce Lee",
  },
  {
    quote: "Work hard in silence, let success be your noise.",
    author: "Frank Ocean",
  },
  {
    quote:
      "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    quote:
      "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.",
    author: "Vince Lombardi",
  },
  {
    quote:
      "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis",
  },
  {
    quote: "Every champion was once a contender that refused to give up.",
    author: "Rocky Balboa",
  },
  {
    quote:
      "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
    author: "Muhammad Ali",
  },
  {
    quote: "Grit is living life like it's a marathon, not a sprint.",
    author: "Angela Duckworth",
  },
  {
    quote: "Tough times don’t last. Tough people do.",
    author: "Robert H. Schuller",
  },
  {
    quote:
      "A river cuts through rock not because of its power, but because of its persistence.",
    author: "James N. Watkins",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi",
  },
  {
    quote: "Pain is temporary. Quitting lasts forever.",
    author: "Lance Armstrong",
  },
  {
    quote:
      "If you want to be the best, you have to do things that other people aren't willing to do.",
    author: "Michael Phelps",
  },
  {
    quote: "Great things come from hard work and perseverance. No excuses.",
    author: "Kobe Bryant",
  },
  {
    quote:
      "I’m convinced that about half of what separates successful entrepreneurs from non-successful ones is pure perseverance.",
    author: "Steve Jobs",
  },
  {
    quote: "Fall seven times, stand up eight.",
    author: "Japanese Proverb",
  },
  {
    quote: "You may have to fight a battle more than once to win it.",
    author: "Margaret Thatcher",
  },
  {
    quote:
      "Perseverance is not a long race; it is many short races one after another.",
    author: "Walter Elliot",
  },
  {
    quote:
      "Do not pray for an easy life, pray for the strength to endure a difficult one.",
    author: "Bruce Lee",
  },
  {
    quote: "If you get tired, learn to rest, not to quit.",
    author: "Banksy",
  },
  {
    quote:
      "Courage doesn’t always roar. Sometimes it’s the quiet voice at the end of the day saying, ‘I will try again tomorrow.’",
    author: "Mary Anne Radmacher",
  },
  {
    quote:
      "Success is achieved and maintained by those who try and keep trying.",
    author: "W. Clement Stone",
  },
  {
    quote:
      "Be miserable. Or motivate yourself. Whatever has to be done, it’s always your choice.",
    author: "Wayne Dyer",
  },
  {
    quote: "There is no elevator to success, you have to take the stairs.",
    author: "Zig Ziglar",
  },
  {
    quote: "You can have results or excuses. Not both.",
    author: "Arnold Schwarzenegger",
  },
  {
    quote: "A quitter never wins and a winner never quits.",
    author: "Napoleon Hill",
  },
  {
    quote: "Work hard in silence, let your success be the noise.",
    author: "Frank Ocean",
  },
  {
    quote: "The best way out is always through.",
    author: "Robert Frost",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote: "Obsessed is just a word the lazy use to describe the dedicated.",
    author: "Russell Warren",
  },
  {
    quote:
      "Sometimes, it’s not about who has more talent. It’s about who’s hungrier.",
    author: "Unknown",
  },
];

export function Inspiration() {
  const randomInt = Math.floor(Math.random() * inspiration.length);
  const randomQuote = inspiration[randomInt];
  return (
    <div className="flex flex-col gap-4 mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <p className="text-lg italic font-medium text-gray-700 before:content-[\u0022] after:content-[\u0022]">
          {randomQuote.quote}
        </p>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          — {randomQuote.author}
        </p>
      </div>
    </div>
  );
}
