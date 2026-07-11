export const vocabulary = [
  { id: 1, word: 'adventure', arabic: 'مغامرة', example: 'Life is either a daring adventure or nothing.', mastered: true, difficulty: 'easy' },
  { id: 2, word: 'ancient', arabic: 'قديم / عتيق', example: 'The ancient temple was built 2000 years ago.', mastered: true, difficulty: 'medium' },
  { id: 3, word: 'brave', arabic: 'شجاع', example: 'Be brave enough to live life creatively.', mastered: false, difficulty: 'easy' },
  { id: 4, word: 'curious', arabic: 'فضولي', example: 'The curious child asked many questions.', mastered: false, difficulty: 'easy' },
  { id: 5, word: 'determined', arabic: 'مصمم / عازم', example: 'She was determined to finish the race.', mastered: false, difficulty: 'medium' },
  { id: 6, word: 'enormous', arabic: 'ضخم / هائل', example: 'An enormous elephant walked across the road.', mastered: false, difficulty: 'medium' },
  { id: 7, word: 'fascinating', arabic: 'مذهل / خلاب', example: 'The documentary about space was fascinating.', mastered: false, difficulty: 'hard' },
  { id: 8, word: 'generous', arabic: 'كريم', example: 'He is generous with his time and money.', mastered: false, difficulty: 'medium' },
  { id: 9, word: 'hesitate', arabic: 'يتردد', example: 'Don't hesitate to ask for help.', mastered: false, difficulty: 'hard' },
  { id: 10, word: 'imagine', arabic: 'يتخيل', example: 'Imagine a world without war.', mastered: true, difficulty: 'easy' },
  { id: 11, word: 'journey', arabic: 'رحلة', example: 'Life is a journey, not a destination.', mastered: true, difficulty: 'easy' },
  { id: 12, word: 'knowledge', arabic: 'معرفة', example: 'Knowledge is power.', mastered: false, difficulty: 'medium' },
  { id: 13, word: 'legendary', arabic: 'أسطوري', example: 'The legendary hero saved the kingdom.', mastered: false, difficulty: 'hard' },
  { id: 14, word: 'mysterious', arabic: 'غامض', example: 'A mysterious figure appeared in the fog.', mastered: false, difficulty: 'medium' },
  { id: 15, word: 'necessary', arabic: 'ضروري', example: 'Sleep is necessary for good health.', mastered: false, difficulty: 'hard' },
  { id: 16, word: 'opportunity', arabic: 'فرصة', example: 'Every problem is an opportunity in disguise.', mastered: false, difficulty: 'hard' },
  { id: 17, word: 'passionate', arabic: 'متحمس / شغوف', example: 'She is passionate about teaching.', mastered: false, difficulty: 'medium' },
  { id: 18, word: 'remarkable', arabic: 'ملحوظ / استثنائي', example: 'His recovery was remarkable.', mastered: false, difficulty: 'hard' },
  { id: 19, word: 'through', arabic: 'خلال / عبر', example: 'We walked through the forest.', mastered: false, difficulty: 'hard' },
  { id: 20, word: 'although', arabic: 'على الرغم من', example: 'Although it was raining, we went out.', mastered: false, difficulty: 'hard' },
];

export const getWeakWords = () => vocabulary.filter(w => !w.mastered);
export const getMasteredWords = () => vocabulary.filter(w => w.mastered);
