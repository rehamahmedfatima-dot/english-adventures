export const stories = [
  // A1 - Beginner (150 stories)
  {
    id: 1,
    level: 'A1',
    title: 'The Lost Cat',
    titleAr: 'القط الضائع',
    duration: '3 min',
    words: ['cat', 'lost', 'find', 'home', 'happy'],
    content: [
      { type: 'narration', text: 'Leo found a small cat in the garden.', textAr: 'وجد ليو قطة صغيرة في الحديقة.' },
      { type: 'dialogue', speaker: 'Leo', text: 'Hello, little cat! Are you lost?', textAr: 'مرحباً يا قطة صغيرة! هل أنت ضائعة؟' },
      { type: 'choice', question: 'What should Leo do?', choices: ['Take it home', 'Leave it', 'Ask neighbors'] },
    ],
    xp: 50,
    completed: false,
  },
  {
    id: 2,
    level: 'A1',
    title: 'My First Day at School',
    titleAr: 'أول يوم في المدرسة',
    duration: '4 min',
    words: ['school', 'teacher', 'friend', 'book', 'class'],
    content: [
      { type: 'narration', text: 'Today is my first day at school.', textAr: 'اليوم هو أول يوم لي في المدرسة.' },
      { type: 'dialogue', speaker: 'Teacher', text: 'Welcome! What is your name?', textAr: 'أهلاً! ما اسمك؟' },
    ],
    xp: 50,
    completed: false,
  },
  // A2 - Elementary (200 stories)
  {
    id: 151,
    level: 'A2',
    title: 'The Mystery at the Museum',
    titleAr: 'الغموض في المتحف',
    duration: '5 min',
    words: ['museum', 'painting', 'thief', 'detective', 'clue'],
    content: [
      { type: 'narration', text: 'A famous painting disappeared from the museum.', textAr: 'اختفت لوحة مشهورة من المتحف.' },
    ],
    xp: 75,
    completed: false,
  },
  // B1 - Intermediate (250 stories)
  {
    id: 351,
    level: 'B1',
    title: 'The Time Machine',
    titleAr: 'آلة الزمن',
    duration: '7 min',
    words: ['time', 'machine', 'future', 'past', 'invention'],
    content: [
      { type: 'narration', text: 'Dr. Smith built a machine that could travel through time.', textAr: 'بنى الدكتور سميث آلة يمكنها السفر عبر الزمن.' },
    ],
    xp: 100,
    completed: false,
  },
  // B2 - Upper-Intermediate (200 stories)
  {
    id: 601,
    level: 'B2',
    title: 'The Political Scandal',
    titleAr: 'الفضيحة السياسية',
    duration: '8 min',
    words: ['politics', 'scandal', 'corruption', 'investigation', 'evidence'],
    content: [
      { type: 'narration', text: 'The journalist uncovered a major political scandal.', textAr: 'كشف الصحفي عن فضيحة سياسية كبرى.' },
    ],
    xp: 125,
    completed: false,
  },
  // C1 - Advanced (150 stories)
  {
    id: 801,
    level: 'C1',
    title: 'The Philosophy of Mind',
    titleAr: 'فلسفة العقل',
    duration: '10 min',
    words: ['consciousness', 'perception', 'cognition', 'phenomenology', 'qualia'],
    content: [
      { type: 'narration', text: 'The nature of consciousness has puzzled philosophers for centuries.', textAr: 'طبيعة الوعي حيّرت الفلاسفة لقرون.' },
    ],
    xp: 150,
    completed: false,
  },
  // C2 - Proficient (50 stories)
  {
    id: 951,
    level: 'C2',
    title: 'Postmodern Literary Theory',
    titleAr: 'نظرية الأدب ما بعد الحداثة',
    duration: '12 min',
    words: ['deconstruction', 'intertextuality', 'metanarrative', 'epistemology', 'hermeneutics'],
    content: [
      { type: 'narration', text: 'Derrida's concept of deconstruction challenges traditional notions of meaning.', textAr: 'مفهوم ديريدا للتفكيك يتحدى المفاهيم التقليدية للمعنى.' },
    ],
    xp: 200,
    completed: false,
  },
];

export const getStoriesByLevel = (level) => stories.filter(s => s.level === level);
export const getStoryById = (id) => stories.find(s => s.id === id);
export const getTodayStory = () => stories[0];
