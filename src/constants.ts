import { Album, Question } from './types';

export const ALBUMS: Album[] = [
  {
    id: 'purple_rain',
    title: 'Purple Rain',
    artist: 'Prince',
    songTitle: "(I Can't Get No) Satisfaction",
    songArtist: 'The Rolling Stones',
    description: 'You have "Center Stage" energy. You aren’t just living your life; you’re headlining it. You move with a rhythm that defines the room. You are the Cultural Powerhouse.',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=2069',
    color: '#7c2d12' /* Deep Rust */
  },
  {
    id: 'blue',
    title: 'Blue',
    artist: 'Joni Mitchell',
    songTitle: "Like a Rolling Stone",
    songArtist: 'Bob Dylan',
    description: 'You are the main character in a quiet, indie coming-of-age movie. You value authenticity and the power of a perfectly written sentence. You are the Introspective Soul.',
    imageUrl: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?auto=format&fit=crop&q=80&w=2071',
    color: '#3f6212' /* Avocado Green */
  },
  {
    id: 'pet_sounds',
    title: 'Pet Sounds',
    artist: 'The Beach Boys',
    songTitle: "Good Vibrations",
    songArtist: 'The Beach Boys',
    description: 'You see the world in layers. You appreciate the "how" and "why" behind everything and find beauty in the details others miss. You are the Visionary Architect.',
    imageUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=2070',
    color: '#ca8a04' /* Harvest Gold */
  },
  {
    id: 'miseducation',
    title: 'The Miseducation of Lauryn Hill',
    artist: 'Lauryn Hill',
    songTitle: "Smells Like Teen Spirit",
    songArtist: 'Nirvana',
    description: 'You live for the "feel." Your life is a series of cinematic moments fueled by intense, raw emotions and authentic connections. You are the Cinematic Dreamer.',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070',
    color: '#78350f' /* Warm Brown */
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "It’s Friday night at 8:00 PM. Where can we find you?",
    answers: [
      { text: "At a high-energy campus event or a sports game.", albumWeights: { purple_rain: 3 } },
      { text: "In a corner booth of a 24-hour diner with one best friend.", albumWeights: { blue: 3 } },
      { text: "In the quietest corner of the library stacks.", albumWeights: { pet_sounds: 3 } },
      { text: "On a late-night soda run or a scenic drive.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 2,
    text: "What’s your study aesthetic?",
    answers: [
      { text: "A bustling student union with lots of background noise.", albumWeights: { purple_rain: 3 } },
      { text: "A cozy coffee shop with mismatched furniture and folk music.", albumWeights: { blue: 3 } },
      { text: "Noise-canceling headphones and a color-coded planner.", albumWeights: { pet_sounds: 3 } },
      { text: "My bedroom with the lights dimmed and a single candle.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 3,
    text: "You have a long drive ahead of you. What are you putting on?",
    answers: [
      { text: "A \"Hype\" playlist full of stadium anthems.", albumWeights: { purple_rain: 3 } },
      { text: "A \"Lyrical\" playlist where every word hits like a poem.", albumWeights: { blue: 3 } },
      { text: "A complex concept album heard from start to finish.", albumWeights: { pet_sounds: 3 } },
      { text: "A \"Vibe\" playlist—lots of reverb, bass, and mood.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 4,
    text: "How do you handle a stressful finals week?",
    answers: [
      { text: "I lean into the chaos and organize a massive group study session.", albumWeights: { purple_rain: 3 } },
      { text: "I write everything out in my journal to process the stress.", albumWeights: { blue: 3 } },
      { text: "I create a rigid schedule and stick to it with precision.", albumWeights: { pet_sounds: 3 } },
      { text: "I go for a long walk to clear my head and disconnect.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 5,
    text: "Pick your \"campus uniform\":",
    answers: [
      { text: "Statement streetwear, cool sneakers, and a vintage cap.", albumWeights: { purple_rain: 3 } },
      { text: "Oversized sweaters, thrifted denim, and a tote bag.", albumWeights: { blue: 3 } },
      { text: "Clean, functional athleisure or a sharp, professional look.", albumWeights: { pet_sounds: 3 } },
      { text: "Worn-in jackets, boots, and silver jewelry.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 6,
    text: "What is your \"Roman Empire\" (the thing you think about constantly)?",
    answers: [
      { text: "How I’m going to make a massive impact in my future career.", albumWeights: { purple_rain: 3 } },
      { text: "Nostalgic memories or the \"one that got away.\"", albumWeights: { blue: 3 } },
      { text: "The complex way the world and its systems actually work.", albumWeights: { pet_sounds: 3 } },
      { text: "Why humans feel the need to create art and music.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 7,
    text: "It’s your turn to pick the group activity. What are we doing?",
    answers: [
      { text: "Something active like pickleball or a local 10K.", albumWeights: { purple_rain: 3 } },
      { text: "A low-key picnic at the park or a board game night.", albumWeights: { blue: 3 } },
      { text: "Visiting a museum, a planetarium, or a workshop.", albumWeights: { pet_sounds: 3 } },
      { text: "Going to a drive-in movie or a local thrift market.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 8,
    text: "Which \"major\" energy do you give off?",
    answers: [
      { text: "Business/Communications: Charismatic and fast-paced.", albumWeights: { purple_rain: 3 } },
      { text: "English/Psychology: Observant and deeply empathetic.", albumWeights: { blue: 3 } },
      { text: "STEM/Philosophy: Analytical and looking for the \"why.\"", albumWeights: { pet_sounds: 3 } },
      { text: "Fine Arts/Sociology: Experimental and focused on the human experience.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 9,
    text: "What’s your favorite way to discover new music?",
    answers: [
      { text: "Whatever is trending or being played at the gym.", albumWeights: { purple_rain: 3 } },
      { text: "Personal recommendations from a close friend.", albumWeights: { blue: 3 } },
      { text: "Deep-diving into the history of a specific genre or producer.", albumWeights: { pet_sounds: 3 } },
      { text: "Randomly stumbling upon a song in a movie or niche playlist.", albumWeights: { miseducation: 3 } }
    ]
  },
  {
    id: 10,
    text: "What’s your post-grad dream?",
    answers: [
      { text: "Being at the top of my field and making a massive impact.", albumWeights: { purple_rain: 3 } },
      { text: "Finding a quiet, meaningful life with a community I love.", albumWeights: { blue: 3 } },
      { text: "Solving a complex problem that no one else can figure out.", albumWeights: { pet_sounds: 3 } },
      { text: "Traveling the world and documenting every beautiful thing I see.", albumWeights: { miseducation: 3 } }
    ]
  }
];
