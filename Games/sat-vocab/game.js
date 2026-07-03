const playerNameInput = document.getElementById('playerName');
const playerGreeting = document.getElementById('playerGreeting');
const startBtn = document.getElementById('startBtn');
const wordDisplay = document.getElementById('wordDisplay');
const meaningDisplay = document.getElementById('meaningDisplay');
const exampleDisplay = document.getElementById('exampleDisplay');
const hintDisplay = document.getElementById('hintDisplay');
const optionsGrid = document.getElementById('optionsGrid');
const scoreDisplay = document.getElementById('scoreDisplay');
const correctCountEl = document.getElementById('correctCount');
const wrongCountEl = document.getElementById('wrongCount');
const mistakeCountEl = document.getElementById('mistakeCount');
const streakCountEl = document.getElementById('streakCount');
const comboText = document.getElementById('comboText');
const statusText = document.getElementById('statusText');
const modeLabel = document.getElementById('modeLabel');
const nextWordBtn = document.getElementById('nextWordBtn');
const timerDisplay = document.getElementById('timerDisplay');
const levelDisplay = document.getElementById('levelDisplay');
const leaderboardList = document.getElementById('leaderboardList');
const speedLeaderboardList = document.getElementById('speedLeaderboardList');
const reviewBtn = document.getElementById('reviewBtn');
const clearMistakesBtn = document.getElementById('clearMistakesBtn');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const pronunciationToggleBtn = document.getElementById('pronunciationToggleBtn');
const durationMinutesInput = document.getElementById('durationMinutes');
const levelButtons = Array.from(document.querySelectorAll('.level-btn'));
const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));
const orderButtons = Array.from(document.querySelectorAll('.order-btn'));

const defaultTimedMinutes = 1;

const words = [
  { word: 'abandon', meaning: 'give up or leave behind', example: 'She had to abandon the idea when she ran out of time.', hint: 'Think of leaving something behind.', level: 'Easy' },
  { word: 'abolish', meaning: 'officially end something', example: 'The school decided to abolish the old dress code.', hint: 'End a rule or law.', level: 'Easy' },
  { word: 'abrupt', meaning: 'sudden and unexpected', example: 'The car made an abrupt stop.', hint: 'Something happens quickly without warning.', level: 'Easy' },
  { word: 'abstract', meaning: 'not concrete; based on ideas', example: 'She struggled with the abstract painting.', hint: 'Not about physical things.', level: 'Easy' },
  { word: 'abundant', meaning: 'very plentiful', example: 'The garden was abundant with flowers.', hint: 'More than enough.', level: 'Easy' },
  { word: 'accelerate', meaning: 'speed up', example: 'The runner managed to accelerate in the final lap.', hint: 'Go faster.', level: 'Easy' },
  { word: 'accessible', meaning: 'easy to reach or use', example: 'The website is accessible from any phone.', hint: 'Easy to get into.', level: 'Easy' },
  { word: 'accommodate', meaning: 'provide or adjust to', example: 'The hotel can accommodate a large group.', hint: 'Make room for or help.', level: 'Easy' },
  { word: 'accomplish', meaning: 'complete successfully', example: 'She hopes to accomplish all her summer goals.', hint: 'Finish something well.', level: 'Easy' },
  { word: 'accumulate', meaning: 'gather over time', example: 'Dust will accumulate if a room is not cleaned.', hint: 'Collect gradually.', level: 'Easy' },
  { word: 'accurate', meaning: 'exact and correct', example: 'The scientist recorded accurate data.', hint: 'Right and precise.', level: 'Easy' },
  { word: 'acknowledge', meaning: 'admit or recognize', example: 'He had to acknowledge his mistake.', hint: 'Say you know or accept it.', level: 'Easy' },
  { word: 'acquire', meaning: 'gain or obtain', example: 'She hopes to acquire new skills this year.', hint: 'Get or learn something.', level: 'Easy' },
  { word: 'adapt', meaning: 'change to fit', example: 'Animals adapt to their environment.', hint: 'Adjust to a new situation.', level: 'Easy' },
  { word: 'adequate', meaning: 'enough for the need', example: 'The supplies were adequate for the trip.', hint: 'Sufficient or acceptable.', level: 'Easy' },
  { word: 'adjacent', meaning: 'next to', example: 'The library is adjacent to the school gym.', hint: 'Beside something.', level: 'Easy' },
  { word: 'adjust', meaning: 'change slightly', example: 'She had to adjust the chair to fit.', hint: 'Make a small change.', level: 'Easy' },
  { word: 'administer', meaning: 'manage or run', example: 'She will administer the new program.', hint: 'Take charge of.', level: 'Easy' },
  { word: 'advocate', meaning: 'support publicly', example: 'He advocates for animal protection.', hint: 'Speak up in favor of.', level: 'Easy' },
  { word: 'affirm', meaning: 'state strongly', example: 'The coach affirmed her confidence in the team.', hint: 'Say it is true.', level: 'Easy' },
  { word: 'aggressive', meaning: 'forceful or attacking', example: 'The player used an aggressive strategy.', hint: 'Bold and pushy.', level: 'Easy' },
  { word: 'alleviate', meaning: 'relieve or ease', example: 'The medicine may alleviate the pain.', hint: 'Make less severe.', level: 'Easy' },
  { word: 'allocate', meaning: 'assign or distribute', example: 'The teacher will allocate time for each activity.', hint: 'Give out a share.', level: 'Easy' },
  { word: 'alter', meaning: 'change', example: 'She decided to alter her jacket to fit better.', hint: 'Make different.', level: 'Easy' },
  { word: 'ambiguous', meaning: 'unclear; more than one meaning', example: 'His answer was ambiguous and hard to understand.', hint: 'Not clearly defined.', level: 'Easy' },
  { word: 'amplify', meaning: 'make stronger or louder', example: 'The speaker will amplify the sound.', hint: 'Increase intensity.', level: 'Easy' },
  { word: 'analyze', meaning: 'examine carefully', example: 'She will analyze the data from the experiment.', hint: 'Look closely at details.', level: 'Easy' },
  { word: 'anticipate', meaning: 'expect beforehand', example: 'They anticipate a busy season ahead.', hint: 'Look forward to.', level: 'Easy' },
  { word: 'apparent', meaning: 'clearly visible or obvious', example: 'It was apparent that the project was finished.', hint: 'Easy to see.', level: 'Easy' },
  { word: 'appeal', meaning: 'attract interest or make a request', example: 'The story will appeal to young readers.', hint: 'Ask or attract.', level: 'Easy' },
  { word: 'arbitrary', meaning: 'based on random choice', example: 'He made an arbitrary decision.', hint: 'Not based on reason.', level: 'Easy' },
  { word: 'articulate', meaning: 'speak clearly', example: 'She can articulate her ideas well.', hint: 'Express clearly.', level: 'Easy' },
  { word: 'assess', meaning: 'evaluate or judge', example: 'The teacher will assess the homework.', hint: 'Decide how good it is.', level: 'Easy' },
  { word: 'assign', meaning: 'give a task', example: 'The coach will assign players to teams.', hint: 'Give someone work.', level: 'Easy' },
  { word: 'assist', meaning: 'help', example: 'She will assist her classmate with the project.', hint: 'Give support.', level: 'Easy' },
  { word: 'assume', meaning: 'suppose without proof', example: 'Don’t assume the answer without checking.', hint: 'Take it to be true.', level: 'Easy' },
  { word: 'assure', meaning: 'make certain', example: 'I assure you everything will be fine.', hint: 'Tell someone confidently.', level: 'Easy' },
  { word: 'attribute', meaning: 'explain as caused by', example: 'She attributes her success to hard work.', hint: 'Say where it comes from.', level: 'Easy' },
  { word: 'authorize', meaning: 'give permission', example: 'The manager authorized the purchase.', hint: 'Allow officially.', level: 'Easy' },
  { word: 'beneficial', meaning: 'helpful', example: 'Regular exercise is beneficial to health.', hint: 'Good for you.', level: 'Easy' },
  { word: 'bias', meaning: 'unfair preference', example: 'The article showed bias toward one side.', hint: 'Favoring one option unfairly.', level: 'Easy' },
  { word: 'capacity', meaning: 'ability or amount possible', example: 'The theater has a seating capacity of 300.', hint: 'How much it can hold.', level: 'Easy' },
  { word: 'clarify', meaning: 'make clear', example: 'Please clarify your instructions.', hint: 'Make easier to understand.', level: 'Easy' },
  { word: 'coherent', meaning: 'logical and clear', example: 'Her explanation was coherent and easy to follow.', hint: 'Makes sense.', level: 'Easy' },
  { word: 'coincide', meaning: 'happen at the same time', example: 'The meeting coincided with lunch.', hint: 'Take place together.', level: 'Medium' },
  { word: 'collapse', meaning: 'fall apart or fail suddenly', example: 'The bridge began to collapse after the storm.', hint: 'Break down quickly.', level: 'Medium' },
  { word: 'commit', meaning: 'promise or do', example: 'He decided to commit to the team.', hint: 'Agree to do it.', level: 'Medium' },
  { word: 'compatible', meaning: 'able to work together', example: 'The software is compatible with your phone.', hint: 'Works well together.', level: 'Medium' },
  { word: 'compensate', meaning: 'make up for', example: 'The company will compensate him for lost time.', hint: 'Pay back or balance.', level: 'Medium' },
  { word: 'compile', meaning: 'gather together', example: 'The report will compile all the research findings.', hint: 'Collect into one place.', level: 'Medium' },
  { word: 'complex', meaning: 'complicated', example: 'The puzzle was complex and challenging.', hint: 'Made of many parts.', level: 'Medium' },
  { word: 'comply', meaning: 'follow rules', example: 'You must comply with the school policy.', hint: 'Do what is asked.', level: 'Medium' },
  { word: 'compose', meaning: 'create by putting together', example: 'She will compose a new song.', hint: 'Put pieces together.', level: 'Medium' },
  { word: 'compound', meaning: 'made of parts or combine', example: 'Interest can compound over time.', hint: 'Joined together.', level: 'Medium' },
  { word: 'comprehend', meaning: 'understand fully', example: 'It took time for him to comprehend the lesson.', hint: 'Grasp the meaning.', level: 'Medium' },
  { word: 'conceal', meaning: 'hide', example: 'He tried to conceal the surprise from her.', hint: 'Keep from being seen.', level: 'Medium' },
  { word: 'concentrate', meaning: 'focus attention', example: 'She needed to concentrate on her homework.', hint: 'Pay close attention.', level: 'Medium' },
  { word: 'concept', meaning: 'idea', example: 'The teacher explained the new concept clearly.', hint: 'A general idea.', level: 'Medium' },
  { word: 'conclude', meaning: 'finish or infer', example: 'We can conclude the story is about friendship.', hint: 'Bring to an end or decide.', level: 'Medium' },
  { word: 'condemn', meaning: 'say something is wrong', example: 'The council condemned the unfair law.', hint: 'Strongly disapprove.', level: 'Medium' },
  { word: 'conduct', meaning: 'carry out or behave', example: 'She will conduct the experiment carefully.', hint: 'Do or handle.', level: 'Medium' },
  { word: 'confirm', meaning: 'show true', example: 'We need to confirm the meeting time.', hint: 'Make certain.', level: 'Medium' },
  { word: 'conflict', meaning: 'clash or disagreement', example: 'There was conflict between the teams.', hint: 'A fight in ideas or actions.', level: 'Medium' },
  { word: 'conform', meaning: 'follow rules', example: 'He had to conform to the dress code.', hint: 'Fit in with others.', level: 'Medium' },
  { word: 'confront', meaning: 'face boldly', example: 'She decided to confront the problem.', hint: 'Deal with directly.', level: 'Medium' },
  { word: 'confuse', meaning: 'make unclear', example: 'The instructions can confuse many students.', hint: 'Cause uncertainty.', level: 'Medium' },
  { word: 'conserve', meaning: 'save or protect', example: 'We should conserve water during summer.', hint: 'Use carefully.', level: 'Medium' },
  { word: 'consider', meaning: 'think about', example: 'Consider your options before deciding.', hint: 'Give thought to.', level: 'Medium' },
  { word: 'consistent', meaning: 'always the same', example: 'Her work is consistent and reliable.', hint: 'Not changing.', level: 'Medium' },
  { word: 'constitute', meaning: 'form or make up', example: 'These parts constitute the whole machine.', hint: 'Create by combining.', level: 'Medium' },
  { word: 'constrain', meaning: 'limit or restrict', example: 'The fence constrains the animals to the yard.', hint: 'Hold back.', level: 'Medium' },
  { word: 'construct', meaning: 'build', example: 'They construct a bridge over the river.', hint: 'Make by putting parts together.', level: 'Medium' },
  { word: 'consult', meaning: 'ask for advice', example: 'He will consult a doctor about the illness.', hint: 'Talk to someone for help.', level: 'Medium' },
  { word: 'consume', meaning: 'use or eat', example: 'We consume too much sugar in some foods.', hint: 'Use up or eat.', level: 'Medium' },
  { word: 'contain', meaning: 'hold inside', example: 'The box contains several toys.', hint: 'Keep something inside.', level: 'Medium' },
  { word: 'contradict', meaning: 'say the opposite', example: 'His story will contradict the earlier version.', hint: 'Show it is not true.', level: 'Medium' },
  { word: 'contribute', meaning: 'give or add', example: 'Each member contributes ideas to the group.', hint: 'Help by adding something.', level: 'Medium' },
  { word: 'controversial', meaning: 'causing disagreement', example: 'The new rule was controversial at school.', hint: 'Creates debate or arguments.', level: 'Medium' },
  { word: 'convey', meaning: 'communicate', example: 'The artist conveys emotion through color.', hint: 'Send a message.', level: 'Medium' },
  { word: 'convince', meaning: 'persuade', example: 'She tried to convince him to join.', hint: 'Make someone believe or do.', level: 'Medium' },
  { word: 'cooperate', meaning: 'work together', example: 'Teams must cooperate to finish the challenge.', hint: 'Help one another.', level: 'Medium' },
  { word: 'coordinate', meaning: 'organize parts to work together', example: 'She will coordinate the event schedule.', hint: 'Make things work in order.', level: 'Medium' },
  { word: 'correlate', meaning: 'show a relationship', example: 'The study will correlate diet and health.', hint: 'Link two things together.', level: 'Medium' },
  { word: 'correspond', meaning: 'match or communicate', example: 'Her notes correspond with the book.', hint: 'Agree or write to someone.', level: 'Medium' },
  { word: 'crucial', meaning: 'very important', example: 'It is crucial to stay safe.', hint: 'Extremely necessary.', level: 'Hard' },
  { word: 'create', meaning: 'make', example: 'They create a new game for the class.', hint: 'Bring something into existence.', level: 'Hard' },
  { word: 'criteria', meaning: 'standards for judgment', example: 'The teacher explained the criteria for the essay.', hint: 'Rules used to judge.', level: 'Hard' },
  { word: 'derive', meaning: 'obtain from', example: 'The word derives from Latin.', hint: 'Come from a source.', level: 'Hard' },
  { word: 'diminish', meaning: 'make smaller', example: 'A bad review may diminish sales.', hint: 'Reduce in size or amount.', level: 'Hard' },
  { word: 'display', meaning: 'show clearly', example: 'The museum will display the paintings.', hint: 'Put where people can see.', level: 'Hard' },
  { word: 'disclose', meaning: 'reveal information', example: 'He refused to disclose the secret.', hint: 'Make known.', level: 'Hard' },
  { word: 'discount', meaning: 'reduce price or importance', example: 'The store will discount old items.', hint: 'Lower or ignore.', level: 'Hard' },
  { word: 'discover', meaning: 'find something new', example: 'Scientists discover new species.', hint: 'Learn something previously unknown.', level: 'Hard' },
  { word: 'discriminate', meaning: 'treat unfairly or notice difference', example: 'It is wrong to discriminate against others.', hint: 'Treat differently in a bad way.', level: 'Hard' },
  { word: 'discuss', meaning: 'talk about', example: 'We will discuss the story in class.', hint: 'Share ideas or opinions.', level: 'Hard' },
  { word: 'dismiss', meaning: 'reject or send away', example: 'The teacher may dismiss the class early.', hint: 'Say it is not important.', level: 'Hard' },
  { word: 'dispute', meaning: 'argue', example: 'They dispute the results of the test.', hint: 'Speak against something.', level: 'Hard' },
  { word: 'distinguish', meaning: 'tell apart', example: 'It is hard to distinguish the twins.', hint: 'Notice the difference.', level: 'Hard' },
  { word: 'distribute', meaning: 'give out', example: 'The volunteers distribute food to neighbors.', hint: 'Share with many people.', level: 'Hard' },
  { word: 'diverse', meaning: 'different', example: 'The class has diverse interests.', hint: 'Many kinds of things.', level: 'Hard' }
];

words.push(
  { word: 'abhor', meaning: 'strongly dislike', example: 'Maya abhors unfair rules and always speaks against them.', hint: 'A much stronger word than dislike.', level: 'Easy' },
  { word: 'adamant', meaning: 'refusing to change opinion', example: 'He was adamant that the answer was correct.', hint: 'Firm as stone in your position.', level: 'Easy' },
  { word: 'alacrity', meaning: 'cheerful readiness', example: 'She accepted the challenge with alacrity.', hint: 'Fast, eager, and happy to help.', level: 'Easy' },
  { word: 'altruistic', meaning: 'selfless', example: 'His altruistic decision helped the whole class.', hint: 'Doing good for others first.', level: 'Easy' },
  { word: 'ambiguous', meaning: 'unclear meaning', example: 'The ambiguous instructions led to three different answers.', hint: 'Can be understood in more than one way.', level: 'Easy' },
  { word: 'ambivalent', meaning: 'having mixed feelings', example: 'She felt ambivalent about moving to a new city.', hint: 'Pulled in two emotional directions.', level: 'Easy' },
  { word: 'analyze', meaning: 'examine carefully', example: 'The students analyze the passage before choosing an answer.', hint: 'Break something down to understand it.', level: 'Easy' },
  { word: 'apathy', meaning: 'lack of interest', example: 'Apathy made the voters ignore the debate.', hint: 'No energy or concern about something.', level: 'Easy' },
  { word: 'assertion', meaning: 'strong claim', example: 'Her assertion needed evidence to be convincing.', hint: 'A statement made with confidence.', level: 'Easy' },
  { word: 'belligerent', meaning: 'aggressive', example: 'The belligerent tone made the discussion tense.', hint: 'Ready to argue or fight.', level: 'Easy' },
  { word: 'candid', meaning: 'honest', example: 'His candid feedback helped me improve my essay.', hint: 'Truthful and direct.', level: 'Easy' },
  { word: 'clarify', meaning: 'make clear', example: 'Please clarify the final step of the problem.', hint: 'Remove confusion.', level: 'Easy' },
  { word: 'cynical', meaning: 'distrustful', example: 'She was cynical about promises that sounded too perfect.', hint: 'Expecting selfish motives.', level: 'Easy' },
  { word: 'dejected', meaning: 'sad and discouraged', example: 'The team looked dejected after the close loss.', hint: 'Low in spirit.', level: 'Easy' },
  { word: 'deference', meaning: 'respect', example: 'The students listened with deference to the guest speaker.', hint: 'Polite respect for someone or something.', level: 'Easy' },
  { word: 'elated', meaning: 'extremely happy', example: 'Jordan was elated when the scholarship letter arrived.', hint: 'Joyful and lifted up.', level: 'Easy' },
  { word: 'fortuitous', meaning: 'lucky', example: 'A fortuitous meeting led to a summer internship.', hint: 'Good by chance.', level: 'Easy' },
  { word: 'indignant', meaning: 'angry about unfairness', example: 'She became indignant when the credit went to someone else.', hint: 'Mad because something feels unjust.', level: 'Easy' },
  { word: 'objective', meaning: 'unbiased', example: 'An objective judge focuses on evidence, not feelings.', hint: 'Based on facts rather than preference.', level: 'Easy' },
  { word: 'subjective', meaning: 'based on opinion', example: 'Whether the song is beautiful is subjective.', hint: 'Depends on personal viewpoint.', level: 'Easy' },
  { word: 'abstruse', meaning: 'very difficult to understand', example: 'The abstruse article required careful rereading.', hint: 'Hard to grasp because it is complex.', level: 'Medium' },
  { word: 'acumen', meaning: 'sharp judgment or insight', example: 'Her business acumen helped the club raise more money.', hint: 'Quick, practical intelligence.', level: 'Medium' },
  { word: 'ameliorate', meaning: 'make something better', example: 'The new schedule should ameliorate student stress.', hint: 'Improve a bad situation.', level: 'Medium' },
  { word: 'anomaly', meaning: 'something unusual', example: 'The warm winter day was an anomaly in the data.', hint: 'A result that does not fit the pattern.', level: 'Medium' },
  { word: 'antithesis', meaning: 'complete opposite', example: 'Her calm reply was the antithesis of his angry speech.', hint: 'The exact contrast.', level: 'Medium' },
  { word: 'arduous', meaning: 'very difficult and tiring', example: 'The arduous hike took the group six hours.', hint: 'Hard enough to wear you out.', level: 'Medium' },
  { word: 'attenuate', meaning: 'weaken', example: 'Thick curtains can attenuate the noise from the street.', hint: 'Make less strong.', level: 'Medium' },
  { word: 'bolster', meaning: 'support or strengthen', example: 'Extra examples can bolster your argument.', hint: 'Hold up or make stronger.', level: 'Medium' },
  { word: 'cogent', meaning: 'clear and convincing', example: 'Her cogent explanation persuaded the committee.', hint: 'Logical enough to convince.', level: 'Medium' },
  { word: 'concede', meaning: 'admit something is true', example: 'He had to concede that her evidence was stronger.', hint: 'Give in on a point.', level: 'Medium' },
  { word: 'contentious', meaning: 'likely to cause disagreement', example: 'The contentious proposal divided the council.', hint: 'Almost guaranteed to start debate.', level: 'Medium' },
  { word: 'corollary', meaning: 'logical result', example: 'One corollary of more practice is greater confidence.', hint: 'A conclusion that follows naturally.', level: 'Medium' },
  { word: 'corroborate', meaning: 'confirm with evidence', example: 'The witness helped corroborate the timeline.', hint: 'Back up with proof.', level: 'Medium' },
  { word: 'counteract', meaning: 'oppose or neutralize', example: 'Drinking water can counteract some effects of the heat.', hint: 'Work against an effect.', level: 'Medium' },
  { word: 'delineate', meaning: 'describe precisely', example: 'The rubric delineates what an excellent essay includes.', hint: 'Draw the boundaries in words.', level: 'Medium' },
  { word: 'dichotomy', meaning: 'division into two parts', example: 'The story sets up a dichotomy between freedom and safety.', hint: 'A split into two contrasting groups.', level: 'Medium' },
  { word: 'disparate', meaning: 'fundamentally different', example: 'The study compared disparate communities across the country.', hint: 'Different in kind, not just size.', level: 'Medium' },
  { word: 'empirical', meaning: 'based on observation', example: 'The scientist wanted empirical evidence, not guesses.', hint: 'Measured or observed in the real world.', level: 'Medium' },
  { word: 'inference', meaning: 'conclusion from evidence', example: 'Her inference came from clues in the final paragraph.', hint: 'A smart conclusion, not a random guess.', level: 'Medium' },
  { word: 'juxtapose', meaning: 'place side by side', example: 'The essay juxtaposes wealth and poverty in the same city.', hint: 'Put together to compare or contrast.', level: 'Medium' },
  { word: 'meticulous', meaning: 'extremely careful', example: 'The meticulous editor noticed every small error.', hint: 'Careful about tiny details.', level: 'Medium' },
  { word: 'nuance', meaning: 'subtle difference', example: 'The word choice added nuance to the character.', hint: 'A small shade of meaning.', level: 'Medium' },
  { word: 'substantiate', meaning: 'prove', example: 'Use statistics to substantiate your claim.', hint: 'Support with solid evidence.', level: 'Medium' },
  { word: 'advocate', meaning: 'support publicly', example: 'They advocate for cleaner parks in the neighborhood.', hint: 'Speak up in favor of something.', level: 'Hard' },
  { word: 'abrogate', meaning: 'abolish formally', example: 'The legislature voted to abrogate the outdated policy.', hint: 'Officially cancel a rule or law.', level: 'Hard' },
  { word: 'capitulate', meaning: 'surrender', example: 'After hours of debate, the committee refused to capitulate.', hint: 'Stop resisting and give in.', level: 'Hard' },
  { word: 'condescending', meaning: 'talking down to others', example: 'His condescending explanation annoyed the group.', hint: 'Acting superior while speaking.', level: 'Hard' },
  { word: 'deleterious', meaning: 'harmful', example: 'Too little sleep can have deleterious effects on focus.', hint: 'Damaging or unhealthy.', level: 'Hard' },
  { word: 'disseminate', meaning: 'spread widely', example: 'The school will disseminate the safety guidelines by email.', hint: 'Send information out broadly.', level: 'Hard' },
  { word: 'elucidate', meaning: 'explain clearly', example: 'A diagram helped elucidate the difficult concept.', hint: 'Make a confusing idea understandable.', level: 'Hard' },
  { word: 'esoteric', meaning: 'known by few', example: 'The professor used esoteric terms from ancient philosophy.', hint: 'Understood only by a small group.', level: 'Hard' },
  { word: 'exacerbate', meaning: 'make worse', example: 'Loud complaints only exacerbated the tense situation.', hint: 'Intensify a problem.', level: 'Hard' },
  { word: 'expedite', meaning: 'speed up', example: 'Submitting the forms early can expedite the process.', hint: 'Make something happen faster.', level: 'Hard' },
  { word: 'gregarious', meaning: 'sociable', example: 'The gregarious host made every guest feel welcome.', hint: 'Comfortable and lively with people.', level: 'Hard' },
  { word: 'immutable', meaning: 'unchangeable', example: 'The deadline was immutable despite the storm.', hint: 'Cannot be altered.', level: 'Hard' },
  { word: 'implicate', meaning: 'suggest involvement', example: 'The emails seemed to implicate another employee.', hint: 'Point to someone as connected.', level: 'Hard' },
  { word: 'mollify', meaning: 'calm someone', example: 'A sincere apology helped mollify the upset customer.', hint: 'Soothe anger or worry.', level: 'Hard' },
  { word: 'perfunctory', meaning: 'done without care', example: 'His perfunctory apology sounded rushed and empty.', hint: 'Completed only because it is required.', level: 'Hard' },
  { word: 'recalcitrant', meaning: 'stubbornly resistant', example: 'The recalcitrant student refused to follow the directions.', hint: 'Defiant and hard to persuade.', level: 'Hard' },
  { word: 'transcend', meaning: 'go beyond', example: 'Great music can transcend language barriers.', hint: 'Rise above ordinary limits.', level: 'Hard' }
);

const additionalVocabularyTerms = `
document dominate eliminate emerge emphasize enable encounter enhance enforce engage ensure
establish estimate evaluate evident evolve exceed exclude expand experience explain exploit express extend facilitate factor feature flexible focus fluctuate formulate
function fundamental generate govern guarantee hypothesis identify ignore illustrate impact imply impose improve incorporate indicate induce inevitable influence inform inhibit
initial innovate insist inspect integrate interpret intervene introduce investigate isolate justify maintain manipulate maximize measure minimize modify monitor motivate narrate
neutral notion obtain occur oppose organize originate participate perceive persist persuade predict prefer preserve proceed process produce prohibit promote propose
pursue qualify react realize recall receive recognize recommend reduce refer reflect reject relate release rely remove replace represent require respond
reveal revise select separate sequence significant similar simulate specify stimulate structure submit substitute summarize sufficient suggest support survive suspect sustain
symbolize target transform transmit transport utilize validate vary verify access account accuse achieve address advance affect apply argue assert attempt benefit
claim combine compare contrast define demonstrate describe design detect determine develop differentiate examine expose involve observe perform present prevent prove publish show
simplify test understand aberration adroit anomalous assuage augment autonomy bolstered censure dogmatic edify elicit evoke fallacy hiatus incoherent insidious latent
laudable lucid magnanimous mitigate nuanced obfuscate omniscient paradox paragon pragmatic precipitate presumptuous prolific provoke redress redundant relinquish sagacious scrutinize
sporadic steadfast superficial surreptitious tacit tenacious transient accretion adjudicate anachronistic apocryphal apprise asperity cacophony capricious castigate convoluted
demagogue dissonance ebullient eclectic enigmatic equivocate expound fallible fractious harbinger hyperbole idiosyncratic impugn incongruous intransigent loquacious
malleable mendacious mitigatory nebulous obdurate palliate perfidy perspicacious prolix quixotic
`.trim().split(/\s+/);

const generatedMeanings = {
  aberration: 'a departure from what is normal',
  access: 'the ability or right to enter or use something',
  account: 'a report or explanation of something',
  accretion: 'gradual growth by adding small parts',
  accuse: 'claim someone did something wrong',
  achieve: 'successfully reach a goal',
  address: 'deal with or speak to a topic',
  advance: 'move forward or make progress',
  adjudicate: 'make an official judgment',
  adroit: 'skillful and clever',
  affect: 'influence or change',
  anachronistic: 'belonging to the wrong time period',
  anomalous: 'unusual or not expected',
  apocryphal: 'doubtful or probably untrue',
  apply: 'put to use',
  apprise: 'inform or tell',
  argue: 'give reasons for or against something',
  asperity: 'harshness in tone or manner',
  assert: 'state confidently',
  assuage: 'make an unpleasant feeling less intense',
  attempt: 'try to do something',
  augment: 'increase or add to',
  autonomy: 'independence or self-government',
  benefit: 'help or improve',
  bolstered: 'supported or strengthened',
  cacophony: 'harsh, unpleasant noise',
  capricious: 'changing suddenly and unpredictably',
  castigate: 'criticize severely',
  censure: 'strongly criticize',
  claim: 'state as true',
  combine: 'join together',
  compare: 'examine similarities',
  contrast: 'show differences',
  convoluted: 'complicated and hard to follow',
  define: 'state the exact meaning',
  demagogue: 'a leader who appeals to prejudice',
  demonstrate: 'show clearly',
  describe: 'tell what something is like',
  design: 'plan or create',
  detect: 'discover or notice',
  determine: 'decide or find out',
  develop: 'grow or improve over time',
  differentiate: 'tell apart',
  dissonance: 'lack of harmony or agreement',
  document: 'record or support with evidence',
  dogmatic: 'stubbornly certain about beliefs',
  dominate: 'control or have the most influence',
  ebullient: 'cheerful and full of energy',
  eclectic: 'drawn from many different sources',
  edify: 'instruct or improve morally',
  elicit: 'draw out a response',
  eliminate: 'remove completely',
  emerge: 'come into view or become known',
  emphasize: 'give special importance to',
  enable: 'make possible',
  encounter: 'come across or meet',
  enhance: 'improve or increase',
  enforce: 'make sure rules are obeyed',
  engage: 'take part or hold attention',
  enigmatic: 'mysterious or hard to understand',
  ensure: 'make certain',
  establish: 'set up or prove',
  estimate: 'roughly calculate',
  equivocate: 'speak ambiguously to avoid the truth',
  evaluate: 'judge the value or quality of',
  evident: 'clearly seen or understood',
  evoke: 'bring a feeling or memory to mind',
  evolve: 'develop gradually',
  exceed: 'go beyond a limit',
  exclude: 'leave out',
  examine: 'inspect or study carefully',
  expand: 'make larger',
  experience: 'go through or personally know',
  explain: 'make clear',
  exploit: 'use selfishly or take advantage of',
  expose: 'reveal or uncover',
  express: 'communicate a thought or feeling',
  extend: 'stretch out or make longer',
  expound: 'explain in detail',
  facilitate: 'make easier',
  factor: 'an element that contributes to a result',
  fallacy: 'a mistaken belief or faulty argument',
  fallible: 'capable of making mistakes',
  feature: 'an important part or quality',
  flexible: 'able to change or bend easily',
  fluctuate: 'rise and fall irregularly',
  focus: 'direct attention',
  formulate: 'create or express carefully',
  fractious: 'irritable and difficult to control',
  function: 'work or serve a purpose',
  fundamental: 'basic and essential',
  generate: 'produce or create',
  govern: 'control or rule',
  guarantee: 'promise or ensure',
  harbinger: 'a sign of what is coming',
  hiatus: 'a pause or break',
  hyperbole: 'deliberate exaggeration',
  hypothesis: 'a testable explanation',
  identify: 'recognize or name',
  idiosyncratic: 'distinctive or peculiar',
  ignore: 'pay no attention to',
  illustrate: 'explain with examples or pictures',
  impact: 'an effect or influence',
  imply: 'suggest without saying directly',
  impose: 'force something on others',
  improve: 'make better',
  impugn: 'challenge as false or wrong',
  incongruous: 'out of place or inconsistent',
  incoherent: 'unclear or not logical',
  incorporate: 'include as part of a whole',
  indicate: 'show or point out',
  induce: 'cause or bring about',
  inevitable: 'certain to happen',
  influence: 'affect or shape',
  inform: 'give information',
  inhibit: 'hold back or prevent',
  initial: 'first or beginning',
  innovate: 'introduce something new',
  insist: 'demand firmly',
  insidious: 'harmful in a gradual, hidden way',
  inspect: 'look at carefully',
  integrate: 'combine into a whole',
  interpret: 'explain the meaning of',
  intervene: 'come between to change an outcome',
  introduce: 'bring in for the first time',
  intransigent: 'refusing to compromise',
  investigate: 'study to discover facts',
  involve: 'include or require',
  isolate: 'separate from others',
  justify: 'show to be reasonable or right',
  latent: 'hidden but able to appear',
  laudable: 'deserving praise',
  loquacious: 'very talkative',
  lucid: 'clear and easy to understand',
  magnanimous: 'generous and forgiving',
  maintain: 'keep going or claim as true',
  malleable: 'easily shaped or influenced',
  manipulate: 'control skillfully or unfairly',
  maximize: 'increase as much as possible',
  measure: 'find the size or amount of',
  mendacious: 'dishonest or lying',
  mitigate: 'make less severe',
  mitigatory: 'serving to make less severe',
  minimize: 'reduce as much as possible',
  modify: 'change slightly',
  monitor: 'watch or check over time',
  motivate: 'give a reason to act',
  narrate: 'tell a story',
  nebulous: 'vague or unclear',
  neutral: 'not taking sides',
  notion: 'an idea or belief',
  nuanced: 'showing subtle differences',
  obdurate: 'stubbornly refusing to change',
  obfuscate: 'make unclear or confusing',
  observe: 'notice or watch carefully',
  obtain: 'get or acquire',
  occur: 'happen',
  omniscient: 'knowing everything',
  oppose: 'act against',
  organize: 'arrange in order',
  originate: 'begin or come from',
  palliate: 'ease without curing',
  paradox: 'a statement that seems contradictory but may be true',
  paragon: 'a perfect example',
  participate: 'take part',
  perceive: 'notice or understand',
  perfidy: 'betrayal of trust',
  perform: 'carry out or do',
  persist: 'continue despite difficulty',
  perspicacious: 'having sharp insight',
  persuade: 'convince someone',
  predict: 'say what will happen',
  prefer: 'like better',
  present: 'show or offer',
  preserve: 'protect or keep',
  presumptuous: 'too bold or overconfident',
  prevent: 'stop from happening',
  precipitate: 'cause suddenly',
  proceed: 'continue or move forward',
  process: 'handle through steps',
  produce: 'make or create',
  prolific: 'producing a lot',
  prohibit: 'forbid',
  prolix: 'using too many words',
  promote: 'support or encourage',
  propose: 'suggest a plan',
  prove: 'show to be true',
  provoke: 'cause a reaction',
  pragmatic: 'practical rather than idealistic',
  publish: 'make public',
  pursue: 'follow or try to achieve',
  qualify: 'meet requirements or limit a statement',
  quixotic: 'idealistic in an impractical way',
  react: 'respond to something',
  realize: 'become aware of',
  recall: 'remember',
  receive: 'get or accept',
  recognize: 'identify or acknowledge',
  recommend: 'suggest as good',
  reduce: 'make smaller',
  redress: 'correct or remedy a wrong',
  redundant: 'unnecessarily repeated',
  refer: 'mention or direct attention to',
  reflect: 'show, mirror, or think deeply',
  reject: 'refuse to accept',
  relate: 'connect or tell',
  release: 'let go or make available',
  relinquish: 'give up',
  rely: 'depend on',
  remove: 'take away',
  replace: 'put in place of another',
  represent: 'stand for or speak for',
  require: 'need or demand',
  respond: 'answer or react',
  reveal: 'make known',
  revise: 'change to improve',
  sagacious: 'wise and perceptive',
  scrutinize: 'examine very carefully',
  select: 'choose',
  separate: 'divide or set apart',
  sequence: 'an ordered series',
  show: 'make visible or demonstrate',
  significant: 'important or meaningful',
  similar: 'alike',
  simplify: 'make easier to understand',
  simulate: 'imitate or model',
  specify: 'state exactly',
  sporadic: 'happening irregularly',
  steadfast: 'firm and loyal',
  stimulate: 'encourage activity or growth',
  structure: 'arrange or organize parts',
  submit: 'turn in or yield',
  substitute: 'use in place of another',
  superficial: 'shallow or only on the surface',
  summarize: 'state briefly',
  sufficient: 'enough',
  suggest: 'propose or imply',
  support: 'hold up or help',
  surreptitious: 'done secretly',
  survive: 'continue to live or exist',
  suspect: 'believe likely without proof',
  sustain: 'maintain or support over time',
  symbolize: 'stand for',
  tacit: 'understood without being stated',
  target: 'aim at',
  tenacious: 'persistent and determined',
  test: 'try or examine',
  transient: 'lasting only a short time',
  transform: 'change completely',
  transmit: 'send or pass along',
  transport: 'carry from one place to another',
  understand: 'grasp the meaning of',
  utilize: 'use',
  validate: 'confirm as valid',
  vary: 'change or differ',
  verify: 'confirm as true'
};

function levelForGeneratedWord(word) {
  if (word.length >= 10 || generatedMeanings[word]?.includes('hard') || generatedMeanings[word]?.includes('severe')) {
    return 'Hard';
  }
  if (word.length >= 8) {
    return 'Medium';
  }
  return 'Easy';
}

function createGeneratedWordEntry(word) {
  const meaning = generatedMeanings[word] || 'understand and use this vocabulary word correctly';
  return {
    word,
    meaning,
    example: `The passage uses "${word}" to mean ${meaning}.`,
    hint: `Think: ${meaning}.`,
    level: levelForGeneratedWord(word)
  };
}

additionalVocabularyTerms.forEach(term => words.push(createGeneratedWordEntry(term)));

const uniqueWords = new Map();
words.forEach(entry => {
  uniqueWords.set(entry.word, entry);
});
words.length = 0;
words.push(...uniqueWords.values());

let currentIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let streakCount = 0;
let selectedTimedMinutes = defaultTimedMinutes;
let timeLeft = selectedTimedMinutes * 60;
let timerId = null;
let isPlaying = false;
let isReviewMode = false;
let currentLevel = 'Easy';
let currentMode = 'timed';
let wordOrder = 'shuffle';
let activeWordPool = [];
let activePoolLevel = '';
let activePoolOrder = '';
let isSoundOn = true;
let isPronunciationOn = false;
let playerName = '';
let mistakeQuestions = [];
let mistakeSet = new Set();
let leaderboard = loadLeaderboard();
let speedLeaderboard = loadSpeedLeaderboard();

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function refreshWordPool() {
  const sortedPool = words
    .filter(word => word.level === currentLevel)
    .slice()
    .sort((a, b) => a.word.localeCompare(b.word));
  activeWordPool = wordOrder === 'shuffle' ? shuffle(sortedPool) : sortedPool;
  activePoolLevel = currentLevel;
  activePoolOrder = wordOrder;
}

function getRandomChoices(wordEntry) {
  const allMeanings = [...new Set(words
    .filter(word => word.word !== wordEntry.word)
    .map(word => word.meaning))];
  const options = [wordEntry.meaning, ...shuffle(allMeanings).slice(0, 3)];
  return shuffle(options);
}

function getActiveWordList() {
  if (isReviewMode) return mistakeQuestions;
  if (activePoolLevel !== currentLevel || activePoolOrder !== wordOrder || !activeWordPool.length) {
    refreshWordPool();
  }
  return activeWordPool;
}

function showWord(index) {
  const activeWords = getActiveWordList();
  if (!activeWords.length) {
    statusText.textContent = isReviewMode ? 'No mistake questions to review yet. Keep playing!' : 'No words found for this level.';
    optionsGrid.innerHTML = '';
    return;
  }

  const wordEntry = activeWords[index % activeWords.length];
  wordDisplay.textContent = wordEntry.word;
  meaningDisplay.textContent = 'Tap an answer to reveal the meaning.';
  exampleDisplay.textContent = wordEntry.example;
  hintDisplay.textContent = wordEntry.hint;
  levelDisplay.textContent = wordEntry.level;
  statusText.textContent = isReviewMode ? 'Review your mistake question and try again!' : 'Choose the best meaning to earn sparkly points!';
  renderOptions(wordEntry);
  speakWord(wordEntry.word);
  modeLabel.textContent = currentMode === 'timed' ? 'Timed' : 'Untimed';
  if (currentMode !== 'timed') {
    timerDisplay.textContent = '--';
  }
}

function renderOptions(wordEntry) {
  optionsGrid.innerHTML = '';
  const options = getRandomChoices(wordEntry);
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(option, wordEntry));
    optionsGrid.appendChild(button);
  });
}

function updateMistakeDisplay() {
  mistakeCountEl.textContent = mistakeQuestions.length;
  const enabled = mistakeQuestions.length > 0;
  reviewBtn.disabled = !enabled;
  clearMistakesBtn.disabled = !enabled;
}

function getMistakeStorageKey() {
  return `satVocabMistakes:${playerName.trim().toLowerCase()}`;
}

function hydrateMistakeSet() {
  mistakeSet = new Set(mistakeQuestions.map(entry => entry.word));
}

function loadPlayerMistakes() {
  if (!playerName) return [];
  try {
    const savedWords = JSON.parse(localStorage.getItem(getMistakeStorageKey()) || '[]');
    const savedWordSet = new Set(Array.isArray(savedWords) ? savedWords : []);
    return words.filter(entry => savedWordSet.has(entry.word));
  } catch {
    return [];
  }
}

function savePlayerMistakes() {
  if (!playerName) return;
  localStorage.setItem(getMistakeStorageKey(), JSON.stringify(mistakeQuestions.map(entry => entry.word)));
}

function updateStreakDisplay() {
  streakCountEl.textContent = streakCount;
  if (streakCount >= 3) {
    comboText.textContent = `Hot streak! +${streakCount * 2} bonus points on this correct answer.`;
  } else {
    comboText.textContent = 'Build a streak to earn bonus points!';
  }
}

function addMistake(wordEntry) {
  if (mistakeSet.has(wordEntry.word)) return;
  mistakeSet.add(wordEntry.word);
  mistakeQuestions.push(wordEntry);
  savePlayerMistakes();
  updateMistakeDisplay();
}

function removeMistake(word) {
  mistakeQuestions = mistakeQuestions.filter(entry => entry.word !== word);
  mistakeSet.delete(word);
  savePlayerMistakes();
  updateMistakeDisplay();
}

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem('satVocabLeaderboard') || '[]');
  } catch {
    return [];
  }
}

function saveLeaderboard() {
  localStorage.setItem('satVocabLeaderboard', JSON.stringify(leaderboard));
}

function loadSpeedLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem('satVocabSpeedLeaderboard') || '[]');
  } catch {
    return [];
  }
}

function saveSpeedLeaderboard() {
  localStorage.setItem('satVocabSpeedLeaderboard', JSON.stringify(speedLeaderboard));
}

function updateLeaderboard() {
  const rankedPlayers = leaderboard
    .filter(entry => Number(entry.score) > 0)
    .sort((a, b) => Number(b.score) - Number(a.score));
  leaderboardList.innerHTML = '';
  rankedPlayers.slice(0, 5).forEach((entry, index) => {
    const medalClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
    const medalLabel = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
    const listItem = document.createElement('li');
    if (medalClass) listItem.classList.add(medalClass);
    listItem.innerHTML = `<span class="medal">${medalLabel}</span><span>${entry.name}</span><strong>${entry.score} pts</strong>`;
    leaderboardList.appendChild(listItem);
  });
}

function updateSpeedLeaderboard() {
  const rankedPlayers = speedLeaderboard
    .filter(entry => Number(entry.correctPerMinute) > 0)
    .sort((a, b) => Number(b.correctPerMinute) - Number(a.correctPerMinute));
  speedLeaderboardList.innerHTML = '';
  rankedPlayers.slice(0, 5).forEach((entry, index) => {
    const medalClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
    const medalLabel = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
    const listItem = document.createElement('li');
    if (medalClass) listItem.classList.add(medalClass);
    listItem.innerHTML = `<span class="medal">${medalLabel}</span><span>${entry.name}</span><strong>${entry.correctPerMinute.toFixed(1)} / min</strong>`;
    speedLeaderboardList.appendChild(listItem);
  });
}

function recordScore() {
  if (!playerName || score <= 0) return;
  const existing = leaderboard.find(entry => entry.name === playerName);
  if (existing) {
    existing.score = Math.max(existing.score, score);
  } else {
    leaderboard.push({ name: playerName, score });
  }
  saveLeaderboard();
  updateLeaderboard();
}

function recordSpeedScore() {
  if (!playerName || currentMode !== 'timed' || correctCount <= 0) return;
  const correctPerMinute = correctCount / selectedTimedMinutes;
  const existing = speedLeaderboard.find(entry => entry.name === playerName);
  if (existing) {
    if (correctPerMinute > Number(existing.correctPerMinute)) {
      existing.correctPerMinute = correctPerMinute;
      existing.correct = correctCount;
      existing.minutes = selectedTimedMinutes;
    }
  } else {
    speedLeaderboard.push({ name: playerName, correctPerMinute, correct: correctCount, minutes: selectedTimedMinutes });
  }
  saveSpeedLeaderboard();
  updateSpeedLeaderboard();
}

function playTone(frequency, duration = 0.15, type = 'sine') {
  if (!isSoundOn || !audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  gain.gain.value = 0.08;
  osc.start();
  osc.stop(audioContext.currentTime + duration);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
}

function playCorrectSound() {
  playTone(880, 0.12, 'triangle');
  setTimeout(() => playTone(1100, 0.08, 'square'), 90);
}

function playWrongSound() {
  playTone(220, 0.2, 'sawtooth');
  setTimeout(() => playTone(170, 0.12, 'sine'), 120);
}

function playStartSound() {
  playTone(660, 0.12, 'triangle');
  setTimeout(() => playTone(880, 0.12, 'square'), 100);
}

function speakWord(word) {
  if (!isPronunciationOn || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function updateSoundToggle() {
  soundToggleBtn.textContent = isSoundOn ? 'Sound On' : 'Sound Off';
  soundToggleBtn.classList.toggle('active', isSoundOn);
  soundToggleBtn.setAttribute('aria-pressed', String(isSoundOn));
}

function updatePronunciationToggle() {
  pronunciationToggleBtn.textContent = isPronunciationOn ? 'Pronunciation On' : 'Pronunciation Off';
  pronunciationToggleBtn.classList.toggle('active', isPronunciationOn);
  pronunciationToggleBtn.setAttribute('aria-pressed', String(isPronunciationOn));
}

function resetTimer() {
  clearInterval(timerId);
  if (currentMode !== 'timed') {
    timerDisplay.textContent = '--';
    return;
  }
  timeLeft = levelTimes[currentLevel];
  timerDisplay.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft -= 1;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeUp();
    }
  }, 1000);
}

function handleTimeUp() {
  if (currentMode !== 'timed') return;
  streakCount = 0;
  comboText.textContent = 'Time ran out! Streak reset. Try again!';
  statusText.textContent = 'Time ran out! The correct answer is shown below.';
  playWrongSound();
  const activeWords = getActiveWordList();
  const wordEntry = activeWords[currentIndex % activeWords.length];
  meaningDisplay.textContent = wordEntry.meaning;
  wrongCount += 1;
  updateScore();
  updateStreakDisplay();
  addMistake(wordEntry);
  setTimeout(nextQuestion, 900);
}

function handleAnswer(choice, wordEntry) {
  clearInterval(timerId);
  const buttons = Array.from(document.querySelectorAll('.option-btn'));
  buttons.forEach(btn => btn.disabled = true);

  if (choice === wordEntry.meaning) {
    streakCount += 1;
    const bonus = streakCount >= 3 ? streakCount * 2 : 0;
    score += 10 + bonus;
    correctCount += 1;
    statusText.textContent = 'Great job! You picked the right meaning!';
    buttons.find(btn => btn.textContent === choice).classList.add('correct');
    playCorrectSound();
    if (isReviewMode) {
      removeMistake(wordEntry.word);
    }
    comboText.textContent = bonus > 0 ? `Combo bonus! +${bonus} points for a ${streakCount}-correct streak.` : 'Nice! Keep the streak going.';
  } else {
    streakCount = 0;
    wrongCount += 1;
    statusText.textContent = `Oops! The right answer was “${wordEntry.meaning}”. Keep trying!`;
    buttons.find(btn => btn.textContent === choice).classList.add('wrong');
    buttons.find(btn => btn.textContent === wordEntry.meaning).classList.add('correct');
    playWrongSound();
    addMistake(wordEntry);
    comboText.textContent = 'Streak broken. Start a new combo!';
  }

  meaningDisplay.textContent = wordEntry.meaning;
  updateScore();
  playResultAnimation(choice === wordEntry.meaning);
  setTimeout(nextQuestion, 900);
}

function updateScore() {
  scoreDisplay.textContent = score;
  correctCountEl.textContent = correctCount;
  wrongCountEl.textContent = wrongCount;
  streakCountEl.textContent = streakCount;
  if (isPlaying && playerName && score > 0) {
    recordScore();
  } else {
    updateLeaderboard();
  }
}

function playResultAnimation(isCorrect) {
  const wordCard = document.querySelector('.word-card');
  wordCard.classList.add(isCorrect ? 'correct-glow' : 'wrong-glow');
  setTimeout(() => wordCard.classList.remove('correct-glow', 'wrong-glow'), 600);
}

function nextQuestion() {
  const activeWords = getActiveWordList();
  if (isReviewMode && !activeWords.length) {
    isReviewMode = false;
    statusText.textContent = 'Review finished! Back to regular mode now.';
    currentIndex = 0;
    showWord(currentIndex);
    return;
  }

  currentIndex = (currentIndex + 1) % activeWords.length;
  showWord(currentIndex);
}

function setLevel(level) {
  currentLevel = level;
  levelButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.level === level);
  });
  refreshWordPool();
  if (isPlaying) {
    currentIndex = 0;
    showWord(currentIndex);
  }
}

function startGame() {
  const name = playerNameInput.value.trim();
  playerName = name || 'Word Hero';
  playerNameInput.value = playerName;
  isPlaying = true;
  isReviewMode = false;
  currentIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  streakCount = 0;
  mistakeQuestions = loadPlayerMistakes();
  hydrateMistakeSet();
  refreshWordPool();
  updateScore();
  updateMistakeDisplay();
  updateStreakDisplay();
  levelButtons.forEach(button => button.disabled = false);
  modeButtons.forEach(button => button.disabled = false);
  nextWordBtn.disabled = false;
  statusText.textContent = `Welcome, ${playerName}! The adventure begins now.`;
  playerGreeting.textContent = mistakeQuestions.length
    ? `Great choice, ${playerName}! You have ${mistakeQuestions.length} saved mistake words ready to review.`
    : `Great choice, ${playerName}! ${currentMode === 'timed' ? 'Race the clock!' : 'Take your time and learn.'}`;
  playerNameInput.disabled = true;
  startBtn.disabled = true;
  playStartSound();
  showWord(currentIndex);
}

function reviewMistakes() {
  if (!mistakeQuestions.length) return;
  isReviewMode = true;
  currentIndex = 0;
  statusText.textContent = `Review mode: ${playerName}'s saved mistake words. Correct answers clear them from your collection.`;
  showWord(currentIndex);
}

function clearMistakes() {
  mistakeQuestions = [];
  mistakeSet.clear();
  savePlayerMistakes();
  updateMistakeDisplay();
  statusText.textContent = `${playerName}'s mistake collection was cleared. Keep practicing!`;
}

levelButtons.forEach(button => {
  button.addEventListener('click', () => setLevel(button.dataset.level));
});

modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    modeButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    currentMode = button.dataset.mode;
    modeLabel.textContent = currentMode === 'timed' ? 'Timed' : 'Untimed';
    if (isPlaying) showWord(currentIndex);
  });
});

orderButtons.forEach(button => {
  button.addEventListener('click', () => {
    orderButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    wordOrder = button.dataset.order;
    isReviewMode = false;
    currentIndex = 0;
    refreshWordPool();
    showWord(currentIndex);
  });
});

soundToggleBtn.addEventListener('click', () => {
  isSoundOn = !isSoundOn;
  updateSoundToggle();
});

pronunciationToggleBtn.addEventListener('click', () => {
  isPronunciationOn = !isPronunciationOn;
  if (!isPronunciationOn && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  updatePronunciationToggle();
  if (isPronunciationOn) {
    const activeWords = getActiveWordList();
    if (activeWords.length) {
      speakWord(activeWords[currentIndex % activeWords.length].word);
    }
  }
});

startBtn.addEventListener('click', () => {
  audioContext.resume().then(startGame);
});

nextWordBtn.addEventListener('click', nextQuestion);
reviewBtn.addEventListener('click', reviewMistakes);
clearMistakesBtn.addEventListener('click', clearMistakes);

refreshWordPool();
updateSoundToggle();
updatePronunciationToggle();
updateLeaderboard();
showWord(currentIndex);
