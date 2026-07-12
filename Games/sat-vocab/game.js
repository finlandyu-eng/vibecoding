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
abandon abate abdicate aberrant abhor abhorred abhorrent abject abolish abolishment abrasive abrogate abrupt absolute absorb abstain abstinent abstract abstruse abundance
abundant accelerate accentuate acceptable accessible acclaim accommodate accomplish accumulate accurate achievement acknowledge acquiesce acquire acquisition acquit acrimony acute adamant adapt
adaptation adept adequate adhere adjacent adjust adjustment administer admirable admonish advancement advantage adverse adversity advocate aesthetic affable affirm affluent aggravate
aggregate aggressive agile alacrity align alleviate allocate allocation alter alteration altercation alternative altruism altruistic ambiguity ambiguous ambition ambivalent ameliorate amend
amiable ample amplify anachronism analogous analogy analyze anarchic ancestor ancient animate animation animosity annihilate annual anomaly anonymous antagonistic antagonize anticipate
anticipation apathetic apparent appeal appease applicable application appreciate appreciation apprehend apprehension apprehensive approach appropriate approximate approximation arbitrary archive ardent arduous
argument arise arrange arrangement articulate artificial ascend ascertain aspiration aspire assertive assess assessment assiduous assign assimilate assume assumption assure astound
astute attach attachment attain attention attentive attribute audacious austere authentic authenticity authority authorize autonomous auxiliary availability available avarice avert avid
avoid avoidance aware awareness awkward balance banal barbaric barrier behavior belligerent beneficial benevolent bewilder bias bizarre blatant bleak bolster bombastic
boundary bountiful boycott brash breach brevity brief broaden brusque brutal calculate candid candidacy capability capable capacity capitalize captivate capture catalyst
categorize category cause caustic cautious cease challenge chaos chaotic characteristic charitable cherish choice chronic circumspect circumstance cite civilization clarification clarify
classify coherent coincide collaborate collaboration collapse collective combination commence commend commitment communicate communication comparison compel compelling compensate compete competent competition
compile complacent complement complete completion complex complexity comply component compose composition comprehend comprehension comprehensive conceal concede conceive concentrate concept concern
concise conclude conclusion concrete concur concurrent condemn condition condone conduct confer confidence confine confirm confirmation conflict conform confront confuse congruent
connect connection conscious consensus consequence conserve consider considerable consideration consistency consistent conspicuous constitute constitution constrain construct construction consult consume consumption
contain containment contemplate contemporary contentious context continuation continue contradict contradiction contrary contribute contribution control controversial controversy conundrum convenient conventional conversion
convert convey convince cooperate cooperation coordinate coordination copy cordial core correct correction correlate correlation correspond corroborate create creativity credibility credible
criterion criticism criticize crucial cryptic culminate cultivate cumulative curious cursory daunt debate debilitate decay deceive decipher decision decisive decline decrease
dedicate deduce deduction deference deficient definition deliberate delineate deliver delivery demonstration demur denote denounce dense deny depend dependence dependency depict
deplete deprive derive description designate desolate deter deteriorate determination development deviate differ difference difficulty diligent dimension diminish direct disclose discover
discovery discrepancy discrete discriminate discuss disdain disparage disperse display disrupt disseminate distinct distinction distinguish distort distribute distribution diverse diversity divide
division doctrine domestic dormant draft drastic dubious durable duration dynamic earnest eccentric economical economy edit educate effect efficiency efficient effort
elaborate element elevate eloquent elusive emergence emotion emphasis empirical emulate encourage encouragement endorse endure enormous entail enumerate environment ephemeral equality
equivalent equivocal eradicate erratic esoteric establishment evaluation evidence exacerbate exaggerate examination example exemplary exhibit exist existence exorbitant expansion expectation explanation
explicit exploration explore exposure expression extension extol extract fabricate fallacious fastidious feasible flexibility follow form formation fortuitous foster foundation fragile
framework frequency frequent frugal futile generation genuine goal gradual grant grasp grave gregarious growth guideline hackneyed harangue hedonistic hierarchy highlight
hinder hypothetical identical identification ideology illuminate imitate immense impartial impeccable implement implication implicit importance impoverish improvement inadvertent incentive incessant include
increase indication individual infer information initiate innovation innovative insatiable insight inspection install instance instruct instruction integration integrity intend intense intention
interact interaction internal interpretation intervention intrinsic introduction investigation invoke involvement issue judicious keen knowledge lament language legitimate likewise limitation maintenance
major manage management mature measurement mechanism mediate mediocre mention method meticulous migrate modification motivation motive mundane mutual necessary necessity negate
negligible negotiate notable notorious objective obscure observation obsolete obstinate occupy occurrence offer offset ominous omit ongoing operate operation opportunity optimistic
optimize option organization orient orthodox outcome overall paramount participation pattern perception performance permit persistence perspective phase phenomenon pioneer plan plausible
portray possibility precarious precede prediction predominant preliminary preparation prepare presentation preservation presume prevention primary principle priority problem procedure product production
profession professional proficient profound progress progression prohibition project proliferate prominent promotion proportion proposal prospect protect protection provide provision prudent publication
purpose qualitative quality quantify quantitative random rational reason recognition recommendation recover reduction refine reflection reform region regulate regulation reinforce relationship
relevant reliability reliable reluctant remedy render renew renowned replacement representation requirement research reside resilient resolution resolve resource response restore restrain
restrict restriction result retain reverse review revision rigorous robust role scarce scenario scope secure seek selection separation significance similarity simulation
simultaneous skeptical sole solution solve sophisticated source sparse specialization specific specification spontaneous stability stable stagnant standard strategy stringent submission subsequent
substantiate substitution subtle succeed success suggestion summary supplement supply suppress survey survival sustainability system tangible teach technique technology temporary tendency
tentative terminate theoretical theory thorough thrive tolerant tranquil transfer transformation transition translate translation transparent transportation treat trend trigger trivial ubiquitous
ultimate unanimous undergo undermine unique universal unprecedented update utilization valid value variable variation verification versatile version viable view vigilant vindicate
visibility visible vital volatile warrant welfare whereas widespread withdraw zeal zealot zealous
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
  verify: 'confirm as true',
  abandon: 'give up or leave behind',
  abate: 'become less intense or widespread',
  abdicate: 'give up power or responsibility',
  aberrant: 'departing from the normal or expected',
  abhor: 'regard with disgust and hatred',
  abhorred: 'regarded with disgust and hatred',
  abhorrent: 'causing disgust or hatred',
  abject: 'extremely miserable or hopeless',
  abolish: 'formally end a system or practice',
  abolishment: 'the act of formally ending something',
  abrasive: 'harsh or rough in manner',
  abrogate: 'repeal or cancel a law or agreement',
  abrupt: 'sudden and unexpected',
  absolute: 'total and complete in every way',
  absorb: 'take in or incorporate into',
  abstain: 'refrain from doing something',
  abstinent: 'refraining from indulgence',
  abstract: 'theoretical rather than concrete',
  abstruse: 'very difficult to understand',
  abundance: 'a very large quantity of something',
  abundant: 'existing in large quantities',
  accelerate: 'increase in speed or rate',
  accentuate: 'make more noticeable or prominent',
  acceptable: 'adequate or satisfactory',
  accessible: 'easy to reach or use',
  acclaim: 'enthusiastic and public praise',
  accommodate: 'provide lodging or adjust to',
  accomplish: 'achieve or complete successfully',
  accumulate: 'gather together over time',
  accurate: 'correct and precise in detail',
  achievement: 'something accomplished successfully',
  acknowledge: 'accept or admit the existence of',
  acquiesce: 'accept reluctantly without protest',
  acquire: 'gain or obtain through effort',
  acquisition: 'something obtained or gained',
  acquit: 'free from a criminal charge',
  acrimony: 'bitterness or ill feeling',
  acute: 'sharp or severe in effect',
  adamant: 'refusing to change one\'s mind',
  adapt: 'adjust to new conditions',
  adaptation: 'a change to fit new conditions',
  adept: 'very skilled or proficient at',
  adequate: 'sufficient for a specific need',
  adhere: 'stick to or follow closely',
  adjacent: 'next to or adjoining',
  adjust: 'alter slightly to fit better',
  adjustment: 'a small change or alteration',
  administer: 'manage or be in charge of',
  admirable: 'deserving respect and approval',
  admonish: 'warn or reprimand firmly',
  advancement: 'progress or improvement forward',
  advantage: 'a beneficial condition or gain',
  adverse: 'harmful or unfavorable',
  adversity: 'difficult or unpleasant conditions',
  advocate: 'publicly support or recommend',
  aesthetic: 'concerned with beauty or art',
  affable: 'friendly and easy to talk to',
  affirm: 'state or assert positively',
  affluent: 'wealthy or abundant in resources',
  aggravate: 'make worse or more serious',
  aggregate: 'a whole formed by combining parts',
  aggressive: 'forceful or ready to attack',
  agile: 'able to move quickly and easily',
  alacrity: 'cheerful readiness or eagerness',
  align: 'place in a straight line or agreement',
  alleviate: 'make suffering or problem less severe',
  allocate: 'distribute for a specific purpose',
  allocation: 'an amount distributed for a purpose',
  alter: 'change or modify in some way',
  alteration: 'a change or modification',
  altercation: 'a noisy argument or dispute',
  alternative: 'one of two or more available choices',
  altruism: 'selfless concern for the welfare of others',
  altruistic: 'showing selfless concern for others',
  ambiguity: 'uncertainty or inexactness of meaning',
  ambiguous: 'open to multiple interpretations',
  ambition: 'a strong desire to achieve something',
  ambivalent: 'having mixed feelings about something',
  ameliorate: 'make something bad become better',
  amend: 'make minor changes to improve',
  amiable: 'friendly and pleasant in disposition',
  ample: 'enough or more than enough',
  amplify: 'increase in volume or strength',
  anachronism: 'something belonging to a wrong time period',
  analogous: 'comparable or similar in some respects',
  analogy: 'a comparison between similar things',
  analyze: 'examine in detail for understanding',
  anarchic: 'without order or control',
  ancestor: 'a person from whom one is descended',
  ancient: 'very old from the distant past',
  animate: 'bring to life or make lively',
  animation: 'the state of being full of life',
  animosity: 'strong hostility or dislike',
  annihilate: 'destroy completely',
  annual: 'occurring once a year',
  anomaly: 'something that deviates from the norm',
  anonymous: 'not identified by name',
  antagonistic: 'showing hostility or opposition',
  antagonize: 'cause someone to become hostile',
  anticipate: 'expect or predict beforehand',
  anticipation: 'the action of expecting something',
  apathetic: 'showing no interest or concern',
  apparent: 'clearly visible or understood',
  appeal: 'make a serious or urgent request',
  appease: 'pacify by giving in to demands',
  applicable: 'relevant or appropriate to',
  application: 'the act of putting something into practice',
  appreciate: 'recognize the value of something',
  appreciation: 'recognition of value or quality',
  apprehend: 'arrest or understand something',
  apprehension: 'anxiety or understanding of something',
  apprehensive: 'anxious or fearful about the future',
  approach: 'come near or begin to deal with',
  appropriate: 'suitable or proper in the circumstances',
  approximate: 'almost exact but not completely',
  approximation: 'a rough estimate or close guess',
  arbitrary: 'based on random choice rather than reason',
  archive: 'a collection of historical records',
  ardent: 'very passionate or enthusiastic',
  arduous: 'involving great effort or difficulty',
  argument: 'a reason or set of reasons given',
  arise: 'come into being or appear',
  arrange: 'put in a neat or required order',
  arrangement: 'a plan or organized structure',
  articulate: 'able to speak fluently and clearly',
  artificial: 'made by human skill rather than natural',
  ascend: 'go up or climb to a higher level',
  ascertain: 'find out or determine with certainty',
  aspiration: 'a hope or ambition to achieve',
  aspire: 'direct one\'s hopes toward achievement',
  assertive: 'confident and forceful in expression',
  assess: 'evaluate or estimate the value of',
  assessment: 'an evaluation or judgment',
  assiduous: 'showing great care and persistence',
  assign: 'allocate a task or responsibility',
  assimilate: 'absorb and integrate into a group',
  assume: 'suppose something without proof',
  assumption: 'something accepted as true without proof',
  assure: 'tell confidently to remove doubt',
  astound: 'shock or greatly surprise',
  astute: 'able to assess situations shrewdly',
  attach: 'fasten or join together',
  attachment: 'an extra part or emotional bond',
  attain: 'achieve or reach a goal',
  attention: 'focused concentration or notice',
  attentive: 'paying close attention to',
  attribute: 'a quality or feature of someone',
  audacious: 'bold and daring in approach',
  austere: 'severe and strict in manner or appearance',
  authentic: 'genuine and not a copy',
  authenticity: 'the quality of being genuine',
  authority: 'the power to give orders or decide',
  authorize: 'give official permission for',
  autonomous: 'self-governing or independent',
  auxiliary: 'providing additional help or support',
  availability: 'the state of being available',
  available: 'able to be used or obtained',
  avarice: 'extreme greed for wealth',
  avert: 'turn away or prevent from happening',
  avid: 'enthusiastic and eager',
  avoid: 'keep away from',
  avoidance: 'the act of staying away from',
  aware: 'having knowledge or perception of',
  awareness: 'knowledge or perception of a situation',
  awkward: 'causing difficulty or embarrassment',
  balance: 'an even distribution of weight or amount',
  banal: 'so lacking originality as to be obvious',
  barbaric: 'savagely cruel or brutal',
  barrier: 'a fence or obstacle that blocks',
  behavior: 'the way one acts or conducts oneself',
  belligerent: 'hostile and aggressive',
  beneficial: 'favorable or advantageous',
  benevolent: 'well-meaning and kindly',
  bewilder: 'cause someone to become confused',
  bias: 'prejudice in favor of or against',
  bizarre: 'very strange or unusual',
  blatant: 'done openly and unashamedly',
  bleak: 'cold and miserable or unpromising',
  bolster: 'support or strengthen',
  bombastic: 'pompous or overblown in language',
  boundary: 'a line marking the limits of an area',
  bountiful: 'abundantly plentiful',
  boycott: 'refuse to deal with as a protest',
  brash: 'self-assertive in a rude way',
  breach: 'a break or gap in something',
  brevity: 'concise and exact use of words',
  brief: 'short in duration or length',
  broaden: 'become wider or more extensive',
  brusque: 'abrupt or offhand in speech',
  brutal: 'savagely violent or cruel',
  calculate: 'determine mathematically',
  candid: 'truthful and direct',
  candidacy: 'the state of being a candidate',
  capability: 'power or ability to do something',
  capable: 'having the ability or skill',
  capacity: 'the maximum amount something can hold',
  capitalize: 'take advantage of an opportunity',
  captivate: 'attract and hold the attention of',
  capture: 'take into one\'s possession by force',
  catalyst: 'a person or thing that causes change',
  categorize: 'place in a particular class or group',
  category: 'a class or division of things',
  cause: 'a person or thing that gives rise to',
  caustic: 'sarcastic in a scathing way',
  cautious: 'careful to avoid potential risks',
  cease: 'come to an end or stop',
  challenge: 'a task requiring great effort',
  chaos: 'complete disorder and confusion',
  chaotic: 'in a state of complete confusion',
  characteristic: 'a feature or quality typical of',
  charitable: 'generous in giving to those in need',
  cherish: 'hold dear or protect lovingly',
  choice: 'an act of selecting between options',
  chronic: 'persisting for a long time',
  circumspect: 'cautious and careful about consequences',
  circumstance: 'a condition or fact relating to an event',
  cite: 'quote as evidence or reference',
  civilization: 'an advanced state of human society',
  clarification: 'the action of making something clearer',
  clarify: 'make something clear or easier to understand',
  classify: 'arrange in classes or categories',
  coherent: 'logical and consistent',
  coincide: 'occur at the same time or place',
  collaborate: 'work jointly on an activity',
  collaboration: 'joint work on an activity',
  collapse: 'fall down or give way suddenly',
  collective: 'done by or belonging to a group',
  combination: 'a joining of separate elements',
  commence: 'begin or start',
  commend: 'praise formally or officially',
  commitment: 'dedication to a cause or activity',
  communicate: 'share or exchange information',
  communication: 'the exchanging of information',
  comparison: 'the act of comparing similarities',
  compel: 'force or oblige to do something',
  compelling: 'evoking interest or attention clearly',
  compensate: 'make up for a loss or injury',
  compete: 'try to win or gain something',
  competent: 'having the necessary skill or ability',
  competition: 'the activity of competing against others',
  compile: 'collect and assemble from sources',
  complacent: 'smugly self-satisfied without awareness',
  complement: 'something that completes or enhances',
  complete: 'having all necessary parts',
  completion: 'the action of finishing something',
  complex: 'consisting of many interconnecting parts',
  complexity: 'the state of being complicated',
  comply: 'act in accordance with rules',
  component: 'a part of a larger whole',
  compose: 'create or form by putting together',
  composition: 'the way something is made up',
  comprehend: 'grasp mentally or understand',
  comprehension: 'the ability to understand',
  comprehensive: 'covering everything thoroughly',
  conceal: 'hide or keep secret',
  concede: 'admit something is true after resisting',
  conceive: 'form a mental idea of',
  concentrate: 'focus one\'s attention completely',
  concept: 'an abstract idea or notion',
  concern: 'a matter of interest or worry',
  concise: 'giving information in few words',
  conclude: 'bring to an end or infer from evidence',
  conclusion: 'a judgment reached after reasoning',
  concrete: 'existing in physical form, not abstract',
  concur: 'agree or be of the same opinion',
  concurrent: 'existing or happening at the same time',
  condemn: 'express strong disapproval of',
  condition: 'the state something is in',
  condone: 'accept and allow something considered wrong',
  conduct: 'the manner of behaving',
  confer: 'grant or bestow a title or right',
  confidence: 'belief in oneself or trust in someone',
  confine: 'keep within limits or restrict',
  confirm: 'establish the truth or correctness of',
  confirmation: 'the act of confirming something',
  conflict: 'a serious disagreement or clash',
  conform: 'comply with rules or standards',
  confront: 'face up to and deal with',
  confuse: 'make someone unable to think clearly',
  congruent: 'in agreement or harmony',
  connect: 'join together or link',
  connection: 'a link or relationship between things',
  conscious: 'aware of and responding to surroundings',
  consensus: 'general agreement among a group',
  consequence: 'a result or effect of an action',
  conserve: 'protect from harm or depletion',
  consider: 'think carefully about',
  considerable: 'notably large or significant',
  consideration: 'careful thought or reflection',
  consistency: 'conformity or steadiness over time',
  consistent: 'unchanging in nature or effect',
  conspicuous: 'clearly visible or attracting notice',
  constitute: 'be part of a whole or establish',
  constitution: 'a body of fundamental principles',
  constrain: 'restrict or limit',
  construct: 'build or form by assembling parts',
  construction: 'the building of something',
  consult: 'seek information or advice from',
  consume: 'eat or drink or use up',
  consumption: 'the using up of a resource',
  contain: 'have or hold within',
  containment: 'the action of keeping under control',
  contemplate: 'think about deeply or at length',
  contemporary: 'living or occurring at the same time',
  contentious: 'causing disagreement or argument',
  context: 'the circumstances surrounding an event',
  continuation: 'the action of carrying on',
  continue: 'keep doing something without stopping',
  contradict: 'be in conflict with',
  contradiction: 'a combination of opposing statements',
  contrary: 'opposite in nature or direction',
  contribute: 'give something toward a common purpose',
  contribution: 'something given toward a common goal',
  control: 'the power to influence behavior',
  controversial: 'giving rise to public disagreement',
  controversy: 'disagreement over a matter of opinion',
  conundrum: 'a confusing and difficult problem',
  convenient: 'fitting in well with needs',
  conventional: 'based on what is traditionally done',
  conversion: 'the act of changing form or character',
  convert: 'change in form, character, or function',
  convey: 'communicate or transport',
  convince: 'persuade someone to believe something',
  cooperate: 'work jointly toward the same end',
  cooperation: 'the process of working together',
  coordinate: 'bring elements into proper relation',
  coordination: 'the organization of parts to work together',
  copy: 'a duplicate of something',
  cordial: 'warm and friendly',
  core: 'the central or most important part',
  correct: 'free from error or in accordance with fact',
  correction: 'a change that rectifies an error',
  correlate: 'have a mutual relationship or connection',
  correlation: 'a mutual relationship between things',
  correspond: 'match or be similar',
  corroborate: 'confirm or give support to a statement',
  create: 'bring something into existence',
  creativity: 'the ability to produce original ideas',
  credibility: 'the quality of being trusted',
  credible: 'able to be believed or trusted',
  criterion: 'a standard for judging something',
  criticism: 'the expression of disapproval',
  criticize: 'point out faults disapprovingly',
  crucial: 'decisive or critically important',
  cryptic: 'mysterious or obscure in meaning',
  culminate: 'reach a climax or highest point',
  cultivate: 'develop or improve by careful effort',
  cumulative: 'increasing by successive additions',
  curious: 'eager to know or learn something',
  cursory: 'hasty and therefore not thorough',
  daunt: 'discourage or intimidate',
  debate: 'a formal discussion on opposing views',
  debilitate: 'make weak or feeble',
  decay: 'rot or decompose gradually',
  deceive: 'mislead by lying',
  decipher: 'convert into understandable form',
  decision: 'a conclusion after consideration',
  decisive: 'settling a matter quickly and firmly',
  decline: 'become smaller or less in quality',
  decrease: 'make smaller in amount or size',
  dedicate: 'devote time or effort to',
  deduce: 'arrive at a conclusion by reasoning',
  deduction: 'a conclusion reached by reasoning',
  deference: 'polite submission or respect',
  deficient: 'not having enough of a necessary quality',
  definition: 'a statement of the exact meaning',
  deliberate: 'done consciously and intentionally',
  delineate: 'describe or portray precisely',
  deliver: 'bring and hand over to the recipient',
  delivery: 'the action of delivering something',
  demonstration: 'the action of showing how to do',
  demur: 'show reluctance or objection',
  denote: 'be a sign of or indicate',
  denounce: 'publicly declare to be wrong',
  dense: 'closely compacted in substance',
  deny: 'state that something is not true',
  depend: 'be controlled or determined by',
  dependence: 'the state of relying on someone',
  dependency: 'a state of relying on something',
  depict: 'represent in a picture or in words',
  deplete: 'reduce the amount or supply of',
  deprive: 'prevent from having or using',
  derive: 'obtain something from a source',
  description: 'a spoken or written account',
  designate: 'appoint to a position or role',
  desolate: 'bleak and barren or abandoned',
  deter: 'discourage someone from acting',
  deteriorate: 'become progressively worse',
  determination: 'firmness of purpose',
  development: 'the process of growing or improving',
  deviate: 'depart from an established course',
  differ: 'be unlike or dissimilar',
  difference: 'a way in which things are unlike',
  difficulty: 'the state of being hard to do',
  diligent: 'careful and persistent in effort',
  dimension: 'an aspect or feature of a situation',
  diminish: 'make or become smaller',
  direct: 'control the operation of',
  disclose: 'make information known',
  discover: 'find unexpectedly or for the first time',
  discovery: 'the act of finding something new',
  discrepancy: 'a difference between conflicting facts',
  discrete: 'individually separate and distinct',
  discriminate: 'recognize a distinction or treat unfairly',
  discuss: 'talk about in detail',
  disdain: 'the feeling that something is unworthy',
  disparage: 'regard or represent as inferior',
  disperse: 'scatter or spread over a wide area',
  display: 'make visible or exhibit',
  disrupt: 'interrupt the normal course of',
  disseminate: 'spread widely, especially information',
  distinct: 'recognizably different in nature',
  distinction: 'a difference between similar things',
  distinguish: 'recognize or point out a difference',
  distort: 'pull or twist out of shape',
  distribute: 'give a share to each of many',
  distribution: 'the action of sharing out',
  diverse: 'showing a great deal of variety',
  diversity: 'the state of being varied',
  divide: 'separate into parts or groups',
  division: 'the act of separating into parts',
  doctrine: 'a set of beliefs held by a group',
  domestic: 'relating to a home or one\'s own country',
  dormant: 'inactive but capable of becoming active',
  draft: 'a preliminary version of writing',
  drastic: 'extreme and sudden in effect',
  dubious: 'hesitating or doubting',
  durable: 'able to last a long time',
  duration: 'the time during which something continues',
  dynamic: 'characterized by constant change or energy',
  earnest: 'showing sincere conviction',
  eccentric: 'unconventional and slightly strange',
  economical: 'giving good value relative to money spent',
  economy: 'the state of a country\'s trade and money',
  edit: 'prepare written material for publication',
  educate: 'give intellectual or moral instruction',
  effect: 'a result or consequence',
  efficiency: 'achieving maximum productivity with minimum waste',
  efficient: 'achieving maximum output with minimum waste',
  effort: 'a determined attempt to achieve something',
  elaborate: 'involving many carefully arranged details',
  element: 'a basic constituent part of something',
  elevate: 'raise or lift to a higher position',
  eloquent: 'fluent or persuasive in speaking',
  elusive: 'difficult to find or capture',
  emergence: 'the process of coming into view',
  emotion: 'a strong feeling such as joy or anger',
  emphasis: 'special importance or stress',
  empirical: 'based on observation or experience',
  emulate: 'match or surpass by imitation',
  encourage: 'give support, confidence, or hope',
  encouragement: 'the act of giving support or confidence',
  endorse: 'declare public approval of',
  endure: 'suffer or last through patiently',
  enormous: 'very large in size or amount',
  entail: 'involve as a necessary part',
  enumerate: 'list items one by one',
  environment: 'the surroundings or conditions',
  ephemeral: 'lasting for a very short time',
  equality: 'the state of being equal in status or rights',
  equivalent: 'equal in value or meaning',
  equivocal: 'open to more than one interpretation',
  eradicate: 'destroy completely',
  erratic: 'not regular or predictable',
  esoteric: 'intended for or understood by few',
  establishment: 'the act of setting up or founding',
  evaluation: 'the making of a judgment about value',
  evidence: 'information indicating whether a belief is true',
  exacerbate: 'make a problem or situation worse',
  exaggerate: 'represent as larger than is true',
  examination: 'a detailed inspection or study',
  example: 'a thing characteristic of its kind',
  exemplary: 'serving as a desirable model',
  exhibit: 'publicly display an item',
  exist: 'have objective reality or be present',
  existence: 'the state of being present or real',
  exorbitant: 'unreasonably high in price',
  expansion: 'the action of becoming larger',
  expectation: 'a strong belief about the future',
  explanation: 'a statement that makes something clear',
  explicit: 'stated clearly and in detail',
  exploration: 'the action of traveling to explore',
  explore: 'travel through to learn about',
  exposure: 'the state of being exposed to something',
  expression: 'the conveying of a feeling or idea',
  extension: 'the act of making something longer',
  extol: 'praise enthusiastically',
  extract: 'remove or take out with effort',
  fabricate: 'invent something falsely',
  fallacious: 'based on a mistaken belief',
  fastidious: 'very careful about detail and accuracy',
  feasible: 'possible and practical to do',
  flexibility: 'the ability to bend or change easily',
  follow: 'come after or act according to',
  form: 'the visible shape of something',
  formation: 'the action of forming or being formed',
  fortuitous: 'happening by chance, especially luckily',
  foster: 'encourage or promote development',
  foundation: 'the base on which something stands',
  fragile: 'easily broken or damaged',
  framework: 'a supporting structure or system',
  frequency: 'the rate at which something occurs',
  frequent: 'occurring or done many times',
  frugal: 'sparing or economical with money',
  futile: 'incapable of producing any useful result',
  generation: 'all people born at about the same time',
  genuine: 'truly what it is said to be',
  goal: 'the object of ambition or effort',
  gradual: 'taking place in small stages',
  grant: 'agree to give or allow something',
  grasp: 'seize and hold firmly',
  grave: 'serious and solemn in manner',
  gregarious: 'fond of company and sociable',
  growth: 'the process of increasing in size',
  guideline: 'a general rule or piece of advice',
  hackneyed: 'lacking originality through overuse',
  harangue: 'a passionate and forceful speech',
  hedonistic: 'devoted to the pursuit of pleasure',
  hierarchy: 'a system of ranking by status',
  highlight: 'draw attention to something important',
  hinder: 'create difficulties for or delay',
  hypothetical: 'supposed but not necessarily real',
  identical: 'exactly the same',
  identification: 'the action of identifying',
  ideology: 'a system of ideas and beliefs',
  illuminate: 'light up or clarify',
  imitate: 'follow a model or pattern',
  immense: 'extremely large or great',
  impartial: 'treating all sides equally and fairly',
  impeccable: 'without fault or error',
  implement: 'put a decision or plan into effect',
  implication: 'a conclusion that can be drawn',
  implicit: 'implied but not stated directly',
  importance: 'the quality of being significant',
  impoverish: 'make poor or worse in quality',
  improvement: 'the act of making something better',
  inadvertent: 'not resulting from deliberate planning',
  incentive: 'something that motivates action',
  incessant: 'continuing without pause',
  include: 'contain as part of a whole',
  increase: 'become greater in size or amount',
  indication: 'a sign or piece of information',
  individual: 'a single person or thing',
  infer: 'deduce from evidence and reasoning',
  information: 'facts about a situation or event',
  initiate: 'cause a process or action to begin',
  innovation: 'a new method or product',
  innovative: 'featuring new and original ideas',
  insatiable: 'impossible to satisfy',
  insight: 'the capacity to understand deeply',
  inspection: 'careful examination of something',
  install: 'place or fix in position for use',
  instance: 'an example or single occurrence',
  instruct: 'teach or give an order',
  instruction: 'a direction or order',
  integration: 'the combining of parts into a whole',
  integrity: 'the quality of being honest and moral',
  intend: 'have a course of action as the purpose',
  intense: 'extreme in degree or strength',
  intention: 'a plan or aim to act in a certain way',
  interact: 'communicate or act with another',
  interaction: 'reciprocal action between things',
  internal: 'existing within the inside',
  interpretation: 'the explanation of meaning',
  intervention: 'the act of intervening in something',
  intrinsic: 'belonging naturally to something',
  introduction: 'the bringing into use of something',
  investigation: 'a formal inquiry or study',
  invoke: 'call on as authority or in supplication',
  involvement: 'the act of taking part in something',
  issue: 'an important topic or problem',
  judicious: 'having or showing good judgment',
  keen: 'eager to participate or sharp in perception',
  knowledge: 'facts or information acquired through experience',
  lament: 'express passionate grief about',
  language: 'a system of communication',
  legitimate: 'conforming to the law or rules',
  likewise: 'in the same way or also',
  limitation: 'a restricting rule or condition',
  maintenance: 'keeping something in good condition',
  major: 'important, serious, or significant',
  manage: 'be in charge of or control',
  management: 'the process of dealing with or controlling',
  mature: 'fully developed in body or mind',
  measurement: 'the action of measuring something',
  mechanism: 'a system of parts working together',
  mediate: 'intervene to bring about agreement',
  mediocre: 'of only average quality',
  mention: 'refer to briefly',
  method: 'a particular way of doing something',
  meticulous: 'very careful and precise',
  migrate: 'move from one place to another',
  modification: 'the action of making partial changes',
  motivation: 'the reason for acting in a certain way',
  motive: 'a reason for doing something',
  mundane: 'lacking interest or excitement',
  mutual: 'felt or done by both sides',
  necessary: 'required to be done or achieved',
  necessity: 'an indispensable thing',
  negate: 'deny or nullify the existence of',
  negligible: 'so small as to be meaningless',
  negotiate: 'try to reach an agreement by discussion',
  notable: 'worthy of attention or notice',
  notorious: 'famous for something bad',
  objective: 'not influenced by personal feelings',
  obscure: 'not well known or hard to understand',
  observation: 'the action of noticing something',
  obsolete: 'no longer produced or used',
  obstinate: 'stubbornly refusing to change',
  occupy: 'fill or take up space or time',
  occurrence: 'an incident or event',
  offer: 'present for acceptance or rejection',
  offset: 'counteract or compensate for',
  ominous: 'giving a suggestion of something bad',
  omit: 'leave out or exclude',
  ongoing: 'continuing to exist or be in progress',
  operate: 'control the functioning of',
  operation: 'the act of functioning or working',
  opportunity: 'a favorable time or set of circumstances',
  optimistic: 'expecting a favorable outcome',
  optimize: 'make the best or most effective use of',
  option: 'a thing that may be chosen',
  organization: 'a group of people with a common purpose',
  orient: 'align or position relative to surroundings',
  orthodox: 'following traditional or established beliefs',
  outcome: 'the result of an action or situation',
  overall: 'taking everything into account',
  paramount: 'more important than anything else',
  participation: 'the action of taking part in something',
  pattern: 'a repeated design or consistent form',
  perception: 'the way something is interpreted',
  performance: 'the action of carrying out a task',
  permit: 'officially allow to do something',
  persistence: 'continuing despite difficulty',
  perspective: 'a particular way of viewing things',
  phase: 'a distinct stage in a process',
  phenomenon: 'a fact or event that can be observed',
  pioneer: 'a person who is first to explore',
  plan: 'a detailed proposal for doing something',
  plausible: 'seeming reasonable or probable',
  portray: 'depict or describe in words',
  possibility: 'a thing that may happen or be true',
  precarious: 'not securely held in position',
  precede: 'come before in time or order',
  prediction: 'a statement about what will happen',
  predominant: 'present as the strongest element',
  preliminary: 'denoting action before the main business',
  preparation: 'the action of preparing for something',
  prepare: 'make ready for use or consideration',
  presentation: 'the giving of something to an audience',
  preservation: 'maintaining something in its original state',
  presume: 'suppose that something is likely to be true',
  prevention: 'stopping something from happening',
  primary: 'of chief importance or principal',
  principle: 'a fundamental truth or rule',
  priority: 'something regarded as more important',
  problem: 'a matter or situation regarded as unwelcome',
  procedure: 'a sequence of actions for doing something',
  product: 'something produced by a process',
  production: 'the process of making or growing',
  profession: 'a paid occupation requiring training',
  professional: 'relating to a skilled occupation',
  proficient: 'competent or skilled in doing something',
  profound: 'very great or intense in degree',
  progress: 'forward movement toward a goal',
  progression: 'a gradual movement toward a goal',
  prohibition: 'the action of forbidding something',
  project: 'a planned undertaking or scheme',
  proliferate: 'increase rapidly in number',
  prominent: 'important or noticeable',
  promotion: 'the advancement in position or rank',
  proportion: 'a part or share of a whole',
  proposal: 'a plan or suggestion put forward',
  prospect: 'the possibility of a future outcome',
  protect: 'keep safe from harm or injury',
  protection: 'the action of keeping someone safe',
  provide: 'make available for use',
  provision: 'the action of supplying something',
  prudent: 'acting with care and forethought',
  publication: 'the preparation and issuing of a book',
  purpose: 'the reason for which something is done',
  qualitative: 'relating to the quality of something',
  quality: 'the standard of something',
  quantify: 'express or measure the quantity of',
  quantitative: 'relating to the quantity or amount',
  random: 'made or done without method or plan',
  rational: 'based on reason rather than emotion',
  reason: 'a cause or explanation for something',
  recognition: 'acknowledgement of something\'s existence',
  recommendation: 'a suggestion for the best course',
  recover: 'regain possession or return to normal',
  reduction: 'the action of making something smaller',
  refine: 'remove impurities or improve by small changes',
  reflection: 'serious thought or consideration',
  reform: 'make changes to improve a system',
  region: 'a large area of a country or the world',
  regulate: 'control or maintain the rate of',
  regulation: 'a rule or directive by an authority',
  reinforce: 'strengthen by additional support',
  relationship: 'the way two things are connected',
  relevant: 'closely connected to the matter at hand',
  reliability: 'the quality of being trustworthy',
  reliable: 'able to be trusted to work well',
  reluctant: 'unwilling and hesitant',
  remedy: 'a medicine or treatment for a problem',
  render: 'provide or give a service',
  renew: 'resume after an interruption',
  renowned: 'known or talked about by many',
  replacement: 'the action of replacing something',
  representation: 'the depiction of someone or something',
  requirement: 'something that is needed or demanded',
  research: 'systematic investigation to discover facts',
  reside: 'have a home in a particular place',
  resilient: 'able to recover quickly from setbacks',
  resolution: 'a firm decision to do something',
  resolve: 'find a solution to a problem',
  resource: 'a supply of something that can be used',
  response: 'an answer or reaction to something',
  restore: 'bring back to a former condition',
  restrain: 'prevent from doing something',
  restrict: 'put a limit on',
  restriction: 'a limiting condition or rule',
  result: 'the outcome of an action or process',
  retain: 'continue to have or keep',
  reverse: 'change direction or turn the other way',
  review: 'assess or examine something again',
  revision: 'the action of revising or altering',
  rigorous: 'extremely thorough and strict',
  robust: 'strong and sturdy',
  role: 'the function or part played by someone',
  scarce: 'insufficient for the demand',
  scenario: 'a possible sequence of events',
  scope: 'the extent of an area or subject',
  secure: 'fixed so as not to give way',
  seek: 'attempt to find or obtain',
  selection: 'the action of carefully choosing',
  separation: 'the action of moving apart',
  significance: 'the quality of being worthy of attention',
  similarity: 'the state of being alike',
  simulation: 'the imitation of a process or situation',
  simultaneous: 'occurring at the same time',
  skeptical: 'not easily convinced or doubtful',
  sole: 'one and only or single',
  solution: 'a means of solving a problem',
  solve: 'find an answer to a problem',
  sophisticated: 'complex and refined',
  source: 'a place where something originates',
  sparse: 'thinly dispersed or scattered',
  specialization: 'focus on a particular area of expertise',
  specific: 'clearly defined or identified',
  specification: 'a detailed requirement or description',
  spontaneous: 'occurring without premeditation',
  stability: 'the state of being firmly fixed',
  stable: 'not likely to change or fail',
  stagnant: 'still and not moving or developing',
  standard: 'a level of quality used as a norm',
  strategy: 'a plan of action to achieve a goal',
  stringent: 'strict and precise',
  submission: 'the action of accepting authority',
  subsequent: 'coming after something in time',
  substantiate: 'provide evidence to support a claim',
  substitution: 'replacing one thing with another',
  subtle: 'delicate and not obvious',
  succeed: 'achieve a desired aim or result',
  success: 'the accomplishment of an aim',
  suggestion: 'an idea put forward for consideration',
  summary: 'a brief statement of main points',
  supplement: 'something added to complete or enhance',
  supply: 'provide something that is needed',
  suppress: 'forcibly put an end to',
  survey: 'examine and record the features of',
  survival: 'the state of continuing to live',
  sustainability: 'the ability to be maintained over time',
  system: 'a set of connected parts working together',
  tangible: 'clear and definite, able to be touched',
  teach: 'impart knowledge or skill to',
  technique: 'a method of doing something skillfully',
  technology: 'the application of scientific knowledge',
  temporary: 'lasting for a limited time only',
  tendency: 'an inclination toward a particular behavior',
  tentative: 'not certain or fixed, provisional',
  terminate: 'bring to an end',
  theoretical: 'concerned with theory rather than practice',
  theory: 'a system of ideas to explain something',
  thorough: 'complete and careful in every detail',
  thrive: 'grow or develop well and vigorously',
  tolerant: 'showing willingness to allow differences',
  tranquil: 'free from disturbance, calm',
  transfer: 'move from one place to another',
  transformation: 'a thorough or dramatic change',
  transition: 'a process of changing from one state to another',
  translate: 'express the sense in another language',
  translation: 'the conversion into another form',
  transparent: 'allowing light to pass through clearly',
  transportation: 'the movement of people or goods',
  treat: 'behave toward in a certain way',
  trend: 'a general direction of change',
  trigger: 'cause an event to happen',
  trivial: 'of little value or importance',
  ubiquitous: 'present or found everywhere',
  ultimate: 'being the best or most extreme',
  unanimous: 'fully in agreement',
  undergo: 'experience or be subjected to',
  undermine: 'weaken gradually or insidiously',
  unique: 'being the only one of its kind',
  universal: 'relating to or done by all people',
  unprecedented: 'never done or known before',
  update: 'make something more modern or current',
  utilization: 'the action of making practical use of',
  valid: 'having a sound basis in logic or fact',
  value: 'the regard that something is held to deserve',
  variable: 'liable to change or vary',
  variation: 'a change or difference in condition',
  verification: 'the process of checking the truth of',
  versatile: 'able to adapt to many different functions',
  version: 'a particular form of something',
  viable: 'capable of working successfully',
  view: 'a particular way of regarding something',
  vigilant: 'keeping careful watch for danger',
  vindicate: 'clear of blame or suspicion',
  visibility: 'the state of being seen or noticed',
  visible: 'able to be seen or noticed',
  vital: 'absolutely necessary or essential',
  volatile: 'liable to change rapidly and unpredictably',
  warrant: 'justify or necessitate a certain action',
  welfare: 'the health and well-being of someone',
  whereas: 'in contrast or comparison with',
  widespread: 'found over a large area',
  withdraw: 'remove or take back',
  zeal: 'great energy or enthusiasm for a cause',
  zealot: 'a person who is fanatical about a cause',
  zealous: 'having great energy or enthusiasm',
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
  if (currentMode === 'timed') {
    resetTimer();
  } else {
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
  timeLeft = selectedTimedMinutes * 60;
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
  recordScore();
  recordSpeedScore();
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
  isPlaying = false;
  startBtn.disabled = false;
  nextWordBtn.disabled = true;
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
