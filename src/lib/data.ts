import { Lesson, Badge } from './types';

export const BADGES: Badge[] = [
  { id: 'math-explorer', name: 'Math Explorer', icon: '🔢', description: 'Completed 3 Math lessons', color: '#667eea', subject: 'math', condition: '3 math lessons' },
  { id: 'word-builder', name: 'Word Builder', icon: '📝', description: 'Completed 3 English lessons', color: '#f093fb', subject: 'english', condition: '3 english lessons' },
  { id: 'science-detective', name: 'Science Detective', icon: '🔬', description: 'Completed 3 EVS lessons', color: '#4facfe', subject: 'evs', condition: '3 evs lessons' },
  { id: 'language-master', name: 'Language Master', icon: '🌏', description: 'Learned in all 3 languages', color: '#43e97b', condition: 'all languages' },
  { id: 'puzzle-champion', name: 'Puzzle Champion', icon: '🧩', description: 'Completed 5 puzzles', color: '#fa709a', condition: '5 puzzles' },
  { id: 'quiz-star', name: 'Quiz Star', icon: '⭐', description: 'Perfect score in 3 quizzes', color: '#FFD93D', condition: '3 perfect quizzes' },
  { id: 'hindi-hero', name: 'Hindi Hero', icon: '🇮🇳', description: 'Completed Hindi module', color: '#FF8C42', subject: 'hindi', condition: 'hindi module' },
  { id: 'kannada-champ', name: 'ಕನ್ನಡ Champion', icon: '🌟', description: 'Completed Kannada module', color: '#6BCB77', subject: 'kannada', condition: 'kannada module' },
  { id: 'streak-master', name: 'Streak Master', icon: '🔥', description: '7-day learning streak', color: '#FF4757', condition: '7 day streak' },
  { id: 'super-learner', name: 'Super Learner', icon: '🦸', description: 'Completed 20 lessons', color: '#9B59B6', condition: '20 lessons' },
];

export const MATH_LESSONS: Lesson[] = [
  {
    id: 'math-addition',
    title: 'Fun Addition',
    subject: 'math',
    icon: '🍎',
    color: '#667eea',
    story: 'Riya has 3 red apples in her basket. Her friend Maya gives her 2 more yellow apples. Can you help Riya count all her apples? Let\'s put them together!',
    storyCharacter: '👧',
    concept: 'Addition means combining two groups of things. When we add 3 + 2, we start with 3 and count 2 more: 4, 5! So 3 + 2 = 5! We use the "+" sign to show addition.',
    activityType: 'drag-drop',
    realLifeApplication: 'If you have 3 chocolates and your mom gives you 2 more, you now have 3 + 2 = 5 chocolates! Count anything around you — books, crayons, toys!',
    xpReward: 30,
    difficulty: 'easy',
    quiz: [
      { id: 'q1', question: '2 + 3 = ?', options: ['4', '5', '6', '3'], correctIndex: 1, explanation: '2 + 3 = 5. Count on from 2: three, four, five!', emoji: '🍭' },
      { id: 'q2', question: '4 + 4 = ?', options: ['6', '7', '8', '9'], correctIndex: 2, explanation: '4 + 4 = 8. Double four is eight!', emoji: '🎈' },
      { id: 'q3', question: '5 + 3 = ?', options: ['7', '8', '9', '6'], correctIndex: 1, explanation: '5 + 3 = 8. Count up 3 from 5!', emoji: '⭐' },
      { id: 'q4', question: '6 + 2 = ?', options: ['7', '8', '9', '10'], correctIndex: 1, explanation: '6 + 2 = 8. Six plus two more!', emoji: '🦋' },
      { id: 'q5', question: '3 + 7 = ?', options: ['9', '10', '11', '8'], correctIndex: 1, explanation: '3 + 7 = 10. That makes ten!', emoji: '🎉' },
    ]
  },
  {
    id: 'math-subtraction',
    title: 'Cool Subtraction',
    subject: 'math',
    icon: '🌟',
    color: '#9B59B6',
    story: 'Yasmeen had 8 balloons at her birthday party. The wind blew away 3 balloons! How many does Yasmeen have left? Let\'s find out!',
    storyCharacter: '👦',
    concept: 'Subtraction means taking away from a group. 8 - 3 means we start with 8 and take 3 away. Count backwards: 7, 6, 5! So 8 - 3 = 5. We use the "-" sign.',
    activityType: 'simulation',
    realLifeApplication: 'If you have 10 rupees and spend 4, you have 10 - 4 = 6 rupees left! Subtraction helps us know what\'s remaining.',
    xpReward: 30,
    difficulty: 'easy',
    quiz: [
      { id: 'q1', question: '8 - 3 = ?', options: ['4', '5', '6', '3'], correctIndex: 1, explanation: '8 - 3 = 5. Take away 3 from 8!', emoji: '🎈' },
      { id: 'q2', question: '10 - 4 = ?', options: ['5', '6', '7', '8'], correctIndex: 1, explanation: '10 - 4 = 6!', emoji: '🌟' },
      { id: 'q3', question: '7 - 2 = ?', options: ['4', '5', '6', '3'], correctIndex: 1, explanation: '7 - 2 = 5!', emoji: '🦄' },
      { id: 'q4', question: '9 - 5 = ?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: '9 - 5 = 4!', emoji: '🌈' },
      { id: 'q5', question: '6 - 6 = ?', options: ['0', '1', '2', '6'], correctIndex: 0, explanation: '6 - 6 = 0. Nothing left!', emoji: '😮' },
    ]
  },
  {
    id: 'math-multiplication',
    title: 'Multiplication Magic',
    subject: 'math',
    icon: '✖️',
    color: '#FF8C42',
    story: 'Chef Priya is making 3 plates of cookies. She puts 4 cookies on each plate. How many cookies total? Multiplication helps us count quickly!',
    storyCharacter: '👩‍🍳',
    concept: 'Multiplication is repeated addition! 3 × 4 means adding 4 three times: 4 + 4 + 4 = 12. It\'s like making equal groups. 3 plates × 4 cookies = 12 cookies!',
    activityType: 'puzzle',
    realLifeApplication: 'If 1 packet has 5 biscuits, 3 packets have 3 × 5 = 15 biscuits! Multiplication helps when groups are equal.',
    xpReward: 40,
    difficulty: 'medium',
    quiz: [
      { id: 'q1', question: '2 × 3 = ?', options: ['5', '6', '7', '8'], correctIndex: 1, explanation: '2 × 3 = 6. Two groups of three!', emoji: '🎯' },
      { id: 'q2', question: '4 × 2 = ?', options: ['6', '7', '8', '9'], correctIndex: 2, explanation: '4 × 2 = 8. Four twos!', emoji: '🚀' },
      { id: 'q3', question: '3 × 3 = ?', options: ['6', '7', '8', '9'], correctIndex: 3, explanation: '3 × 3 = 9. Three threes!', emoji: '🦁' },
      { id: 'q4', question: '5 × 2 = ?', options: ['8', '9', '10', '11'], correctIndex: 2, explanation: '5 × 2 = 10. Five twos make ten!', emoji: '🏆' },
      { id: 'q5', question: '2 × 2 = ?', options: ['2', '3', '4', '5'], correctIndex: 2, explanation: '2 × 2 = 4. Two twos!', emoji: '💫' },
    ]
  },
  {
    id: 'math-shapes',
    title: 'Shape Explorer',
    subject: 'math',
    icon: '🔷',
    color: '#1DD3B0',
    story: 'Sam the robot is building a city! He needs circles for wheels, squares for windows, and triangles for rooftops. Help Sam find all the shapes!',
    storyCharacter: '🤖',
    concept: 'Shapes are all around us! A Circle is perfectly round. A Square has 4 equal sides. A Rectangle has 2 long and 2 short sides. A Triangle has 3 sides.',
    activityType: 'match',
    realLifeApplication: 'Look around! A clock face is a circle. A book is a rectangle. Pizza slices are triangles. Windows are squares!',
    xpReward: 25,
    difficulty: 'easy',
    quiz: [
      { id: 'q1', question: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], correctIndex: 1, explanation: 'A triangle has 3 sides and 3 corners!', emoji: '🔺' },
      { id: 'q2', question: 'Which shape has no corners?', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], correctIndex: 2, explanation: 'A circle is perfectly round with no corners!', emoji: '⭕' },
      { id: 'q3', question: 'A square has how many equal sides?', options: ['2', '3', '4', '5'], correctIndex: 2, explanation: 'A square has 4 equal sides!', emoji: '🟦' },
      { id: 'q4', question: 'What shape is a pizza slice?', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], correctIndex: 2, explanation: 'A pizza slice is shaped like a triangle!', emoji: '🍕' },
      { id: 'q5', question: 'A rectangle has how many sides?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: 'A rectangle has 4 sides – 2 long and 2 short!', emoji: '📱' },
    ]
  },
];

export const ENGLISH_LESSONS: Lesson[] = [
  {
    id: 'eng-vocabulary',
    title: 'Word World',
    subject: 'english',
    icon: '📚',
    color: '#f093fb',
    story: 'Luna the owl lives in a magical library where every book teaches a new word! Today Luna wants to teach you words for things you see every day.',
    storyCharacter: '🦉',
    concept: 'Vocabulary means knowing words and what they mean. Learning new words helps us understand stories, talk to friends, and write beautiful sentences!',
    activityType: 'match',
    realLifeApplication: 'Every day, try to learn 2 new words. Read books, ask your teachers, and use new words when you talk!',
    xpReward: 25,
    difficulty: 'easy',
    quiz: [
      { id: 'q1', question: 'What does "Happy" mean?', options: ['Sad', 'Feeling joy', 'Angry', 'Tired'], correctIndex: 1, explanation: 'Happy means feeling joy and pleasure!', emoji: '😊' },
      { id: 'q2', question: 'Which word means a baby cat?', options: ['Puppy', 'Calf', 'Kitten', 'Chick'], correctIndex: 2, explanation: 'A baby cat is called a kitten!', emoji: '🐱' },
      { id: 'q3', question: '"Big" means the same as...', options: ['Small', 'Large', 'Tiny', 'Thin'], correctIndex: 1, explanation: '"Big" and "Large" mean the same thing – they are synonyms!', emoji: '🐘' },
      { id: 'q4', question: 'What is the opposite of "cold"?', options: ['Warm', 'Cool', 'Hot', 'Icy'], correctIndex: 2, explanation: 'Hot is the opposite of cold!', emoji: '🌡️' },
      { id: 'q5', question: 'A place where books are kept is called...', options: ['Hospital', 'Library', 'Market', 'Zoo'], correctIndex: 1, explanation: 'A library is where books are stored and borrowed!', emoji: '📖' },
    ]
  },
  {
    id: 'eng-grammar',
    title: 'Grammar Garden',
    subject: 'english',
    icon: '✏️',
    color: '#f5576c',
    story: 'In Grammar Garden, every plant is a word! Nouns are trees, verbs are flowers, and adjectives are colorful fruits. Let\'s explore!',
    storyCharacter: '🌺',
    concept: 'Grammar is the rules of language. Nouns are naming words (cat, house, school). Verbs are action words (run, jump, eat). Adjectives describe things (big, red, happy).',
    activityType: 'drag-drop',
    realLifeApplication: 'Every sentence you speak uses grammar! "The red ball rolls fast" – red is adjective, ball is noun, rolls is verb!',
    xpReward: 30,
    difficulty: 'medium',
    quiz: [
      { id: 'q1', question: 'Which word is a NOUN?', options: ['Run', 'Blue', 'Cat', 'Quickly'], correctIndex: 2, explanation: 'Cat is a noun – it names a thing!', emoji: '🐈' },
      { id: 'q2', question: 'Which word is a VERB?', options: ['Table', 'Jump', 'Happy', 'Flower'], correctIndex: 1, explanation: 'Jump is a verb – it shows action!', emoji: '🦘' },
      { id: 'q3', question: 'Which word is an ADJECTIVE?', options: ['Tree', 'Eat', 'Beautiful', 'Market'], correctIndex: 2, explanation: 'Beautiful is an adjective – it describes!', emoji: '🌸' },
      { id: 'q4', question: '"The _____ dog barked." Which fits?', options: ['Runs', 'Big', 'Quickly', 'They'], correctIndex: 1, explanation: '"Big" is an adjective that describes the dog!', emoji: '🐕' },
      { id: 'q5', question: 'How many letters in "SCHOOL"?', options: ['5', '6', '7', '4'], correctIndex: 1, explanation: 'S-C-H-O-O-L has 6 letters!', emoji: '🏫' },
    ]
  },
];

export const HINDI_LESSONS: Lesson[] = [
  {
    id: 'hindi-vowels',
    title: 'स्वर सीखें',
    subject: 'hindi',
    icon: '🅰️',
    color: '#FF8C42',
    story: 'चिंटू बंदर एक जादुई स्कूल में पढ़ता है जहाँ हर अक्षर एक अलग आवाज़ निकालता है। आज हम स्वर सीखेंगे!',
    storyCharacter: '🐒',
    concept: 'हिंदी में 11 स्वर होते हैं: अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ, अं। ये वो आवाज़ें हैं जो बिना किसी अन्य अक्षर के पूरी तरह बोली जा सकती हैं।',
    activityType: 'tracing',
    realLifeApplication: 'जब हम "आम" कहते हैं तो "आ" स्वर का उपयोग होता है। "इमली" में "इ" स्वर है। स्वर हर जगह हैं!',
    xpReward: 30,
    difficulty: 'easy',
    quiz: [
      { id: 'q1', question: 'हिंदी में कितने स्वर होते हैं?', options: ['9', '10', '11', '12'], correctIndex: 2, explanation: 'हिंदी में 11 स्वर होते हैं।', emoji: '🔤' },
      { id: 'q2', question: '"आम" में कौन सा स्वर है?', options: ['अ', 'आ', 'इ', 'उ'], correctIndex: 1, explanation: '"आम" में "आ" स्वर है।', emoji: '🥭' },
      { id: 'q3', question: 'पहला स्वर कौन सा है?', options: ['आ', 'इ', 'अ', 'ए'], correctIndex: 2, explanation: 'हिंदी वर्णमाला का पहला स्वर "अ" है।', emoji: '1️⃣' },
      { id: 'q4', question: '"उल्लू" में कौन सा स्वर है?', options: ['अ', 'आ', 'उ', 'ए'], correctIndex: 2, explanation: '"उल्लू" में "उ" स्वर है।', emoji: '🦉' },
      { id: 'q5', question: 'स्वर का मतलब क्या है?', options: ['Consonant', 'Vowel', 'Number', 'Fruit'], correctIndex: 1, explanation: 'स्वर का अंग्रेज़ी में मतलब Vowel है।', emoji: '🎵' },
    ]
  },
  {
    id: 'hindi-words',
    title: 'शब्द निर्माण',
    subject: 'hindi',
    icon: '🔤',
    color: '#FF4757',
    story: 'सेब उठाओ! मोर देखो! चींटू मित्र के साथ मिलकर अक्षरों से नए शब्द बनाना सीखते हैं।',
    storyCharacter: '🦜',
    concept: 'जब हम अक्षरों को मिलाते हैं तो शब्द बनते हैं। जैसे: स + े + ब = सेब, म + ा + म = माम, ग + ा + य = गाय। अक्षरों को मिलाकर बड़े शब्द बनाएं!',
    activityType: 'drag-drop',
    realLifeApplication: 'घर में दरवाज़े, कमरे, खिड़की — ये सब हिंदी शब्द हैं! अपने आसपास की चीज़ों के नाम हिंदी में पहचानें।',
    xpReward: 35,
    difficulty: 'medium',
    quiz: [
      { id: 'q1', question: '"सेब" किसका नाम है?', options: ['आम', 'सेब', 'केला', 'संतरा'], correctIndex: 1, explanation: 'सेब एक लाल फल है! Apple 🍎', emoji: '🍎' },
      { id: 'q2', question: 'स + ् + कूल = ?', options: ['स्कूल', 'सकूल', 'स्कल', 'सकल'], correctIndex: 0, explanation: 'स + ् + कूल = स्कूल (School)!', emoji: '🏫' },
      { id: 'q3', question: 'गाय का बच्चा क्या कहलाता है?', options: ['बछड़ा', 'पिल्ला', 'बच्चा', 'शावक'], correctIndex: 0, explanation: 'गाय के बच्चे को बछड़ा कहते हैं।', emoji: '🐄' },
      { id: 'q4', question: 'फ + ल = ?', options: ['फुल', 'फल', 'फील', 'फाल'], correctIndex: 1, explanation: 'फ + ल = फल (Fruit)!', emoji: '🍓' },
      { id: 'q5', question: '"घर" का अर्थ क्या होता है?', options: ['School', 'House', 'Car', 'Tree'], correctIndex: 1, explanation: '"घर" का अर्थ है House (घर)।', emoji: '🏠' },
    ]
  },
];

export const KANNADA_LESSONS: Lesson[] = [
  {
    id: 'kannada-vowels',
    title: 'ಸ್ವರಗಳು ಕಲಿಯಿರಿ',
    subject: 'kannada',
    icon: '🅰️',
    color: '#43e97b',
    story: 'ಗಣೇಶ ಒಂದು ಮಾಯಾ ಶಾಲೆಯಲ್ಲಿ ಓದುತ್ತಾನೆ. ಅಲ್ಲಿ ಪ್ರತಿ ಅಕ್ಷರವೂ ಹಾಡುತ್ತದೆ! ಇಂದು ಕನ್ನಡ ಸ್ವರಗಳನ್ನು ಕಲಿಯೋಣ.',
    storyCharacter: '🐘',
    concept: 'ಕನ್ನಡದಲ್ಲಿ 13 ಸ್ವರಗಳಿವೆ: ಅ, ಆ, ಇ, ಈ, ಉ, ಊ, ಋ, ಏ, ಐ, ಓ, ಔ, ಅಂ, ಅಃ. ಇವು ಸ್ವತಂತ್ರವಾಗಿ ಉಚ್ಚರಿಸಬಹುದಾದ ಶಬ್ದಗಳು.',
    activityType: 'tracing',
    realLifeApplication: '"ಅಡಿಕೆ" ಯಲ್ಲಿ "ಅ" ಸ್ವರ ಇದೆ. "ಆನೆ" ಯಲ್ಲಿ "ಆ" ಸ್ವರ ಇದೆ. ಎಲ್ಲ ಕಡೆಯೂ ಸ್ವರಗಳಿವೆ!',
    xpReward: 30,
    difficulty: 'easy',
    quiz: [
      { id: 'q1', question: 'ಕನ್ನಡದಲ್ಲಿ ಎಷ್ಟು ಸ್ವರಗಳಿವೆ?', options: ['11', '12', '13', '14'], correctIndex: 2, explanation: 'ಕನ್ನಡದಲ್ಲಿ 13 ಸ್ವರಗಳಿವೆ!', emoji: '🔤' },
      { id: 'q2', question: '"ಆನೆ" ಯಲ್ಲಿ ಯಾವ ಸ್ವರ ಇದೆ?', options: ['ಅ', 'ಆ', 'ಇ', 'ಉ'], correctIndex: 1, explanation: '"ಆನೆ" ಯಲ್ಲಿ "ಆ" ಸ್ವರ ಇದೆ!', emoji: '🐘' },
      { id: 'q3', question: 'ಮೊದಲ ಸ್ವರ ಯಾವುದು?', options: ['ಆ', 'ಇ', 'ಅ', 'ಊ'], correctIndex: 2, explanation: '"ಅ" ಕನ್ನಡದ ಮೊದಲ ಸ್ವರ!', emoji: '1️⃣' },
      { id: 'q4', question: '"ಇಲಿ" ಯಲ್ಲಿ ಯಾವ ಸ್ವರ?', options: ['ಅ', 'ಆ', 'ಇ', 'ಉ'], correctIndex: 2, explanation: '"ಇಲಿ" ಯಲ್ಲಿ "ಇ" ಸ್ವರ ಇದೆ!', emoji: '🐭' },
      { id: 'q5', question: 'ಸ್ವರ = ?', options: ['Consonant', 'Number', 'Vowel', 'Word'], correctIndex: 2, explanation: 'ಸ್ವರ ಎಂದರೆ Vowel (ಸ್ವರ)!', emoji: '🎵' },
    ]
  },
  {
    id: 'kannada-words',
    title: 'ಪದ ರಚನೆ',
    subject: 'kannada',
    icon: '🔤',
    color: '#38f9d7',
    story: 'ರಾಮು ಅಜ್ಜನ ತೋಟದಲ್ಲಿ ಮಾವಿನ ಮರ ಇದೆ! ಮ + ಾ + ವು = ಮಾವು. ಅಕ್ಷರಗಳನ್ನು ಜೋಡಿಸಿ ಪದಗಳನ್ನು ಮಾಡೋಣ!',
    storyCharacter: '👴',
    concept: 'ಅಕ್ಷರಗಳನ್ನು ಜೋಡಿಸಿದಾಗ ಪದಗಳು ಸಿಗುತ್ತವೆ! ಮ + ಾ + ವು = ಮಾವು, ಹ + ಣ್ + ಣು = ಹಣ್ಣು, ನ + ೀ + ರು = ನೀರು.',
    activityType: 'drag-drop',
    realLifeApplication: 'ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಕಿಟಕಿ, ಬಾಗಿಲು, ಮೇಜು — ಎಲ್ಲ ಕನ್ನಡ ಪದಗಳು! ಸುತ್ತಮುತ್ತ ಇರುವ ವಸ್ತುಗಳ ಕನ್ನಡ ಹೆಸರು ತಿಳಿಯಿರಿ.',
    xpReward: 35,
    difficulty: 'medium',
    quiz: [
      { id: 'q1', question: '"ಮಾವು" ಎಂದರೆ?', options: ['Apple', 'Mango', 'Banana', 'Orange'], correctIndex: 1, explanation: '"ಮಾವು" ಎಂದರೆ Mango (ಮಾವು)!', emoji: '🥭' },
      { id: 'q2', question: 'ನ + ೀ + ರು = ?', options: ['ನೀರು', 'ನಿರ', 'ನಾರು', 'ನೇರ'], correctIndex: 0, explanation: 'ನ + ೀ + ರು = ನೀರು (Water)!', emoji: '💧' },
      { id: 'q3', question: '"ಹಣ್ಣು" ಎಂದರೆ?', options: ['Vegetable', 'Fruit', 'Flower', 'Leaf'], correctIndex: 1, explanation: '"ಹಣ್ಣು" ಎಂದರೆ Fruit!', emoji: '🍓' },
      { id: 'q4', question: '"ಮನೆ" ಎಂದರೆ?', options: ['School', 'Market', 'House', 'Park'], correctIndex: 2, explanation: '"ಮನೆ" ಎಂದರೆ House!', emoji: '🏠' },
      { id: 'q5', question: 'ಕ + ಾ + ಡು = ?', options: ['ಕಾಡು', 'ಕಡು', 'ಕೌಡು', 'ಕಾಡ'], correctIndex: 0, explanation: 'ಕ + ಾ + ಡು = ಕಾಡು (Forest)!', emoji: '🌳' },
    ]
  },
];

export const EVS_LESSONS: Lesson[] = [
  {
    id: 'evs-plants',
    title: 'Plants Around Us',
    subject: 'evs',
    icon: '🌱',
    color: '#4facfe',
    story: 'Lily the ladybug loves exploring the garden. She knows plants need sunlight, water, and soil to grow. Let\'s help Lily grow a beautiful plant!',
    storyCharacter: '🐞',
    concept: 'Plants are living things! They need: ☀️ Sunlight to make food, 💧 Water to drink, 🌱 Soil for nutrients, 🌬️ Air to breathe. Plants give us food, oxygen, and shade.',
    activityType: 'simulation',
    realLifeApplication: 'Try growing a plant at home! Put a bean seed in wet cotton. Watch it sprout in few days. Observe how it needs water and sunlight.',
    xpReward: 30,
    difficulty: 'easy',
    quiz: [
      { id: 'q1', question: 'What do plants need to grow?', options: ['Only water', 'Sunlight, water, soil', 'Only sunlight', 'Only fertilizer'], correctIndex: 1, explanation: 'Plants need sunlight, water, and soil to grow healthy!', emoji: '🌱' },
      { id: 'q2', question: 'Which part of the plant makes food?', options: ['Root', 'Stem', 'Leaf', 'Flower'], correctIndex: 2, explanation: 'Leaves make food using sunlight and water!', emoji: '🍃' },
      { id: 'q3', question: 'Roots help the plant to...', options: ['Make food', 'Absorb water from soil', 'Produce flowers', 'Create seeds'], correctIndex: 1, explanation: 'Roots absorb water and nutrients from the soil!', emoji: '🌿' },
      { id: 'q4', question: 'Which gas do plants give us?', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correctIndex: 2, explanation: 'Plants give us oxygen which we breathe!', emoji: '💨' },
      { id: 'q5', question: 'A mango tree gives us...', options: ['Milk', 'Mangoes', 'Wool', 'Eggs'], correctIndex: 1, explanation: 'A mango tree gives us delicious mangoes to eat!', emoji: '🥭' },
    ]
  },
  {
    id: 'evs-animals',
    title: 'Amazing Animals',
    subject: 'evs',
    icon: '🦁',
    color: '#00f2fe',
    story: 'Zara zookeeper is organizing the zoo! Animals live in different habitats. A fish lives in water, a monkey lives in the jungle, a camel lives in the desert!',
    storyCharacter: '👩‍🦱',
    concept: 'Animals live in habitats that suit them. Aquatic animals (fish, dolphins) live in water. Land animals (lion, tiger) live on land. Birds (eagle, parrot) live in trees. Each animal has special features for its home.',
    activityType: 'drag-drop',
    realLifeApplication: 'Visit a zoo or watch nature documentaries. Notice how each animal is perfectly designed for where it lives!',
    xpReward: 35,
    difficulty: 'medium',
    quiz: [
      { id: 'q1', question: 'Where does a fish live?', options: ['Desert', 'Forest', 'Water', 'Sky'], correctIndex: 2, explanation: 'Fish live in water – rivers, lakes or oceans!', emoji: '🐟' },
      { id: 'q2', question: 'Which animal lives in the desert?', options: ['Penguin', 'Camel', 'Dolphin', 'Monkey'], correctIndex: 1, explanation: 'Camels are perfectly suited for the desert with their humps!', emoji: '🐪' },
      { id: 'q3', question: 'A lion is a...', options: ['Pet animal', 'Wild animal', 'Farm animal', 'Sea animal'], correctIndex: 1, explanation: 'Lions are wild animals that live in grasslands!', emoji: '🦁' },
      { id: 'q4', question: 'What do cows give us?', options: ['Eggs', 'Wool', 'Milk', 'Honey'], correctIndex: 2, explanation: 'Cows give us milk which is very nutritious!', emoji: '🐄' },
      { id: 'q5', question: 'Which bird cannot fly?', options: ['Eagle', 'Parrot', 'Penguin', 'Sparrow'], correctIndex: 2, explanation: 'Penguins cannot fly but are excellent swimmers!', emoji: '🐧' },
    ]
  },
];

export const GK_LESSONS: Lesson[] = [
  {
    id: 'gk-solar-system',
    title: 'Solar System Explorer',
    subject: 'gk',
    icon: '🪐',
    color: '#fa709a',
    story: 'Astro the astronaut is on a space mission! He\'s traveling through our solar system visiting all 8 planets. Let\'s join him on this fantastic journey!',
    storyCharacter: '👨‍🚀',
    concept: 'Our solar system has 8 planets going around the Sun. In order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Earth is our home! The Sun is a giant star that gives us light and heat.',
    activityType: 'simulation',
    realLifeApplication: 'Look at the sky at night! You can see the Moon, and sometimes planets like Venus (Evening Star). The Sun rises in the East and sets in the West every day!',
    xpReward: 40,
    difficulty: 'medium',
    quiz: [
      { id: 'q1', question: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], correctIndex: 1, explanation: 'There are 8 planets in our solar system!', emoji: '🪐' },
      { id: 'q2', question: 'Which planet do we live on?', options: ['Mars', 'Venus', 'Earth', 'Jupiter'], correctIndex: 2, explanation: 'We live on Planet Earth – the Blue Planet!', emoji: '🌍' },
      { id: 'q3', question: 'Which is the largest planet?', options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correctIndex: 2, explanation: 'Jupiter is the largest planet in our solar system!', emoji: '🌟' },
      { id: 'q4', question: 'The Sun is a...', options: ['Planet', 'Moon', 'Star', 'Comet'], correctIndex: 2, explanation: 'The Sun is a giant star at the center of our solar system!', emoji: '☀️' },
      { id: 'q5', question: 'Which planet has beautiful rings?', options: ['Mars', 'Saturn', 'Venus', 'Mercury'], correctIndex: 1, explanation: 'Saturn is famous for its beautiful rings made of ice and rock!', emoji: '💍' },
    ]
  },
];

export const ALL_LESSONS = [...MATH_LESSONS, ...ENGLISH_LESSONS, ...HINDI_LESSONS, ...KANNADA_LESSONS, ...EVS_LESSONS, ...GK_LESSONS];
