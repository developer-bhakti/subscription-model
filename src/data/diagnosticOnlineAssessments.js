// Questions for the online ("Do It Online") version of the class-wise Diagnostic Assessment.
//
// Everything here is taken from the printed assessment sheets that "View & Download" opens
// (the PDF links in classAssessments.js): the same check points in the same order, the same
// English and Hindi wording, the same three answers scored 1 / 0.5 / 0, the same
// "Total Calculated Score / number of check points x 100" formula and the same three result
// messages. Nothing is shared with the Formative assessments, so the two never mix.

// "Yes, child is Ok with it" 1  |  "Not Sure about it" 0.5  |  "No, Child is not OK with it" 0
export const diagnosticAnswerOptions = [
  { score: 1, display: "1", label: "Yes, child is Ok with it", tone: "yes" },
  { score: 0.5, display: "0.5", label: "Not Sure about it", tone: "unsure" },
  { score: 0, display: "0", label: "No, Child is not OK with it", tone: "no" },
];

// The label shown in the Class box, and the programme the child is being assessed for
// (the result messages name it, e.g. "ready to take the NURSERY programme").
const LEVELS = {
  pg: {
    label: "PG",
    programme: "PLAY GROUP",
  },
  nursery: {
    label: "Nursery",
    programme: "NURSERY",
  },
  lkg: {
    label: "LKG",
    programme: "LKG",
  },
  ukg: {
    label: "UKG",
    programme: "UKG",
  },
};

// The four skills. `title` is the card title on the Diagnostic page, so the two always match.
// `short` names the skill in the score line, and `ukgPhrase` is how the UKG sheets word it
// inside their "a little more attention" message.
const SKILLS = {
  social: {
    title: "Social & Emotional Skills",
    short: "Social & Emotional",
    ukgPhrase: "Social and emotional",
  },
  language: {
    title: "Language & Communication Skills",
    short: "Language & Communication",
    ukgPhrase: "language",
  },
  cognitive: {
    title: "Cognitive Skills",
    short: "Cognitive",
    ukgPhrase: "Cognitive",
  },
  movement: {
    title: "Movement & Physical Development",
    short: "Movement & Physical Development",
    ukgPhrase: "Movement and physical",
  },
};

// Each row is [English, Hindi]: the check point as the sheet prints it, then its Hindi line.
const rows = (list) => list.map(([en, hi]) => ({ en, hi }));

const questions = {
  // ------------------------------------------------------------------ PG
  pg: {
    social: rows([
      ["The child recognises favourite people and things", "बच्चा अपने पसंदीदा लोगों और चीज़ों को पहचानता है।"],
      ["The child cries when Mom and Dad leaves (when child is with unknown people or less known people)", "जब माँ और पापा चले जाते हैं (और बच्चा अनजान या कम परिचित लोगों के साथ होता है) तो बच्चा रोता है।"],
      ["The child makes sounds or actions to get attention", "बच्चा ध्यान आकर्षित करने के लिए आवाज़ें या क्रियाएँ करता है।"],
      ["The child enjoys and plays games like “Peek-a-boo”", "बच्चा “पिक–ए–बू” जैसे खेलों का आनंद लेता है और खेलता है।"],
      ["The child shows signs of fear of strangers", "बच्चा अजनबियों से डर के लक्षण दिखाता है।"],
      ["The child shows signs of affection for known and familiar people", "बच्चा परिचित और प्रियजनों से स्नेह के भाव दिखाता है।"],
      ["The child plays simple make believe games like feeding a doll", "बच्चा सरल नकल वाले खेल खेलता है, जैसे गुड़िया को खाना खिलाना।"],
      ["The child points out to show others something interesting", "बच्चा दूसरों को कुछ रोचक दिखाने के लिए इशारा करता है।"],
      ["The child loves to explore things with some known person near by", "बच्चा किसी परिचित व्यक्ति के पास रहकर चीज़ों की खोजबीन करना पसंद करता है।"],
      ["The child drinks water or milk from a glass or cup", "बच्चा गिलास या कप से पानी या दूध पीता है।"],
      ["The child loves to play with other children", "बच्चा अन्य बच्चों के साथ खेलना पसंद करता है।"],
      ["The child discriminates between edible and in-edible things", "बच्चा खाने योग्य और न खाने योग्य चीज़ों में भेद कर पाता है।"],
    ]),
    language: rows([
      ["The child responds to simple spoken words", "बच्चा सरल बोले गए शब्दों का उत्तर देता है।"],
      ["The child takes the name of familiar objects", "बच्चा परिचित वस्तुओं का नाम लेता है।"],
      ["The child talks in small sentences", "बच्चा छोटे वाक्यों में बात करता है।"],
      ["The child is using simple gestures to communicate, like shaking head (for “No”) or waving hands for “Bye-bye”", "बच्चा इशारों का उपयोग करके संवाद करता है, जैसे ना के लिए सिर हिलाना आदि।"],
      ["The child makes sounds with a changing tone", "बच्चा बदलते हुए स्वर (टोन) में आवाजें निकालता है।"],
      ["The child is saying familiar words like “Mama or Papa” or these words in local language", "बच्चा परिचित शब्द बोलता है जैसे “मामा” या “पापा” (या स्थानीय भाषा में ऐसे ही शब्द)"],
      ["The child uses exclamations like “Hmmmmmm”, “Ähhh” etc", "बच्चा विस्मयादिबोधक शब्दों का उपयोग करता है जैसे “हम्म्म”, “आहह” आदि।"],
      ["The child tries to copy words you say", "बच्चा आपके कहे शब्दों की नकल करने की कोशिश करता है।"],
      ["The child says many single words like cat, dog, doll etc..", "बच्चा कई एकल शब्द बोलता है जैसे बिल्ली, कुत्ता, गुड़िया आदि।"],
      ["The child says and shakes head for “No”", "बच्चा “ना” कहता है और सिर हिलाता है।"],
      ["The child points finger to show someone what he /she wants", "बच्चा उंगलियो से इशारा करके दिखाता है कि उसे क्या चाहिए।"],
    ]),
    cognitive: rows([
      ["The child loves to explore things by shaking, banging and throwing things", "बच्चा चीज़ों को (हिलाकर, बजाकर और फेंककर) खोज करना पसंद करता है"],
      ["The child loves to find out the hidden things", "बच्चा छिपी हुई चीज़ों को ढूँढना पसंद करता है।"],
      ["The child looks at the right thing or people when their names are taken", "बच्चा सही वस्तु या व्यक्ति की ओर देखता है जब उनका नाम लिया जाता है।"],
      ["The child loves to bang two things together", "बच्चा दो चीज़ों को आपस में बजाना पसंद करता है।"],
      ["The child loves to put things into a container", "बच्चा चीज़ों को किसी बर्तन/डिब्बे में डालना पसंद करता है।"],
      ["The child loves to take out things from a container which he/she has put", "बच्चा उसी बर्तन/डिब्बे से चीज़ें निकालना पसंद करता है जिसमें उसने पहले डाली हों।"],
      ["The child points with index finger for getting attention or for any need", "बच्चा ध्यान आकर्षित करने या किसी ज़रूरत के लिए तर्जनी उंगली (index finger) से इशारा करता है।"],
      ["The child follows simple instructions like, “Give me the toy”", "बच्चा सरल निर्देशों का पालन करता है जैसे “मुझे खिलौना दो”"],
      ["The child points out to the common things like mobile, food etc. when their names are taken", "बच्चा सामान्य चीज़ों की ओर इशारा करता है जैसे मोबाइल, खाना आदि जब उनके नाम लिए जाते हैं।"],
      ["The child shows interest and loves to play with dolls and toys", "बच्चा गुड़िया और खिलौनों के साथ खेलने में रुचि और प्रेम दिखाता है।"],
      ["The child points to a few body parts when asked.", "बच्चा कहने पर शरीर के कुछ अंगों की ओर इशारा करता है।"],
      ["The child scribbles on her/his own", "बच्चा स्वयं से कागज़ पर लकीरें खींचता है। (scribbles)"],
      ["The child follows one step verbal commands like sit down, stand up etc.", "बच्चा मौखिक आदेशों का पालन करता है जैसे बैठो, खड़े हो जाओ आदि।"],
    ]),
    movement: rows([
      ["The child gets into the sitting position without any support", "बच्चा बिना किसी सहारे के बैठने की स्थिति में आ जाता है।"],
      ["The child stands alone", "बच्चा अकेले खड़ा होता है।"],
      ["The child walks few steps without any support", "बच्चा बिना सहारे के चलता है।"],
      ["The child loves to transfer objects and toys from one place to other place", "बच्चा को वस्तुओं और खिलौनों को एक स्थान से दूसरे स्थान पर ले जाना बहुत पसंद है।"],
      ["The child overcomes simple obstacles", "बच्चा सरल बाधाओं को पार कर लेता है।"],
      ["The child fetches or carries familiar objects", "बच्चा परिचित वस्तुओं को लाता या ले जाता है।"],
      ["The child eats with their own hands - biscuits, bread etc.", "बच्चा बिस्किट या ब्रेड आदि अपने हाथ से खाता है।"],
      ["The child is running comfortably", "बच्चा आराम से दौड़ रहा है।"],
      ["The child helps to dress and undress clothes", "बच्चा कपड़े पहनने और उतारने में मदद करता है।"],
      ["The child eats with a spoon", "बच्चा चम्मच से खाता है।"],
      ["The child walks upstairs unassisted", "बच्चा बिना किसी सहायता के ऊपर की ओर चलता है।"],
      ["The child unwraps chocolates or sweets comfortably", "बच्चा आराम से चॉकलेट या मिठाई के कव्हर निकालता है"],
      ["The child initiates his/her own play activities", "बच्चा अपनी खेल गतिविधियाँ स्वयं शुरू करता है।"],
    ]),
  },

  // ------------------------------------------------------------------ Nursery
  nursery: {
    social: rows([
      ["The child drinks water or milk from a glass or cup", "बच्चा गिलास या कप से पानी/दूध पीता है।"],
      ["The child loves to play with other children", "बच्चा अन्य बच्चों के साथ खेलना पसंद करता है।"],
      ["The child discriminates between edible and non-edible things", "बच्चा खाने योग्य और अखाद्य वस्तुओं में भेद कर लेता है।"],
      ["The child imitates others, especially adults", "बच्चा दुसरो की विशेषकर बड़ों की नकल करता है।"],
      ["The child shows more independence like going to toilet alone", "बच्चा अधिक स्वतंत्र होकर शौचालय जाना शुरू करता है।"],
      ["The child defends his/her possessions", "बच्चा अपनी वस्तुओं की रक्षा करता है।"],
      ["The child enjoys if someone praise him/her", "बच्चा प्रशंसा मिलने पर खुश होता है।"],
      ["The child helps the adults in some small activities like sorting toys", "बच्चा बड़ों की छोटे छोटे काम मे मदद करता है।"],
      ["The child drinks milk or water unassisted", "बच्चा बिना सहायता के पानी/दूध पी लेता है।"],
      ["The child dries his/her own hand", "बच्चा अपने हाथ पोंछ लेता है।"],
      ["The child starts using a spoon to eat", "बच्चा चम्मच से खाना खा सकता है।"],
      ["The child understands the meaning of cleanliness", "बच्चा सफाई का महत्व समझता है।"],
    ]),
    language: rows([
      ["The child says many single words like cat, dog, doll etc..", "बच्चा कई एकल शब्द जैसे बिल्ली, कुत्ता, गुड़िया आदि बोलता है।"],
      ["The child says and shakes head for “No”", "बच्चा ‘न’ कहता है और सिर हिलाता है।"],
      ["The child points finger to show someone/something if he/she wants that", "बच्चा इशारा करके किसी को कुछ दिखाता है/कुछ पाने की इच्छा जताता है।"],
      ["The child points to things or objects when named", "बच्चा चीज़ों या वस्तुओं की ओर इशारा करता है जब उनका नाम लिया जाता है।"],
      ["The child knows the name of familiar people", "बच्चा परिचित लोगों के नाम जानता है।"],
      ["The child speaks sentence with 2-4 words", "बच्चा 2-4 शब्दों के वाक्य बोलता है।"],
      ["The child follows simple instructions", "बच्चा सरल निर्देशों का पालन करता है।"],
      ["The child repeats words overheard in a conversation", "बच्चा बातचीत में सुने गए शब्द दोहराता है।"],
      ["The child says her/his name", "बच्चा अपना नाम बताता है।"],
      ["The child understands the meaning of “No”, “Not”, “Don't” and “Can't”", "बच्चा “No” (नहीं), “Not” (नहीं), “Don't” (मत करो) और “Can't” (नहीं कर सकता) का अर्थ समझता है।"],
      ["The child identifies the action words like eating, running etc.", "बच्चा खाने, दौड़ने जैसी क्रियाओं को पहचानता है।"],
      ["The child repeats parts of a rhyme or song learned in home or school", "बच्चा घर या स्कूल में सीखे गए गीत या कविता के अंश दोहराता है।"],
      ["The child can answer simple questions like “What is this?”", "बच्चा सरल प्रश्नों का उत्तर देता है जैसे “यह क्या है?”"],
      ["The child can identify and points to major body parts", "बच्चा मुख्य शारीरिक अंगों को पहचानता है और उन पर इशारा करता है।"],
    ]),
    cognitive: rows([
      ["The child shows interest and loves to play with dolls and toys", "बच्चा रुचि दिखाता है और खिलौनों से खेलना पसंद करता है।"],
      ["The child finds things when hidden under two or three level of covers", "बच्चा उन वस्तुओं को ढूँढ लेता है जो २ या ३ परतों के नीचे छुपी हों।"],
      ["The child scribbles on their own", "बच्चा खुद से रेखाचित्र बनाता है ।"],
      ["The child follows one step verbal commands like sit down, stand up etc", "बच्चा मौखिक आदेश जैसे “बैठो, खड़े हो” का पालन करता है।"],
      ["The child plays simple make believe games like feeding a doll, making it feel comfortable, giving it a bath etc.", "बच्चा खेल में कल्पना करता है।"],
      ["The child builds building block of 4 or more blocks", "बच्चा 4 या उससे अधिक ब्लॉक्स से टॉवर बनाता है।"],
      ["The child uses one hand more frequently for doing various activities", "बच्चा एक हाथ को ज़्यादा प्रयोग करता है गतिविधियों में।"],
      ["The child follows two step instructions like “go to the kitchen” and “bring the cup”", "बच्चा दो–चरण के निर्देशों का पालन करता है।"],
      ["The child identifies and names the common items in a picture book like apple, cat, dog", "बच्चा चित्रों में सामान्य वस्तुएँ पहचानता और नाम बताता है।"],
      ["The child is able to identify small and big objects (knows the difference)", "बच्चा छोटे–बड़े वस्तुओं में अंतर पहचान लेता है।"],
      ["The child points and counts objects up to 3 objects in a picture book", "बच्चा चित्रों में ३ वस्तुओं तक गिनकर बता देता है।"],
      ["The child understands at least 3 colours and matches them with the same colour object", "बच्चा कम से कम ३ रंग पहचानता और मिलाता है।"],
      ["The child understands the concept of one", "बच्चा “एक” की संकल्पना समझता है।"],
      ["The child identifies her/his own drawing / craft", "बच्चा अपनी बनाई ड्रॉइंग/क्राफ्ट पहचानता है।"],
    ]),
    movement: rows([
      ["The child walks upstairs unassisted (both foot on each step)", "बच्चा सीढ़ियाँ अकेले चढ़ता है (दोनों पैर बदल–बदलकर)।"],
      ["The child unwraps chocolates or sweets comfortably", "बच्चा चॉकलेट और मिठाई के कव्हर निकालके खा सकता है।"],
      ["The child stands tiptoe", "बच्चा पाँव की अंगुली पर खडा होता है।"],
      ["The child kicks a ball quite comfortably", "बच्चा आराम से गेंद को किक करता है।"],
      ["The child climbs on to the furniture and climbs down without any help", "बच्चा फर्नीचर पर चढ़–उतर जाता है।"],
      ["The child walks downstairs unassisted", "बच्चा बिना किसी सहायता से सीढ़ियाँ उतरता है।"],
      ["The child throws ball overhand", "बच्चा ऊपर से गेंद फेंकता है।"],
      ["The child makes straight lines and circles", "बच्चा सीधी रेखाएँ और वृत्त बनाता है।"],
      ["The child claps with music", "बच्चा संगीत पर ताली बजाता है।"],
      ["The child jumps with two feet together", "बच्चा दोनों पैरों से कूदता है।"],
      ["The child paints with a large brush and tears papers", "बच्चा बडे ब्रश से रंग भरता है और कागज के टुकडे कर सकता है।"],
      ["The child holds thick crayons and does some scribbling / colouring with it", "बच्चा मोटे क्रेयॉन पकड़कर लिखाई/ड्रॉइंग करता है।"],
      ["The child is able to put small objects in slots like putting large beads in string", "बच्चा छोटी वस्तुओं को खांचे में डालने में सक्षम हो जाता है।"],
      ["The child draws horizontal and vertical lines", "बच्चा क्षैतिज और ऊर्ध्व रेखाएँ खींचता है।"],
    ]),
  },

  // ------------------------------------------------------------------ LKG
  lkg: {
    social: rows([
      ["The child understand the meaning of cleanliness", "बच्चा स्वच्छता का अर्थ समझता है।"],
      ["The child imitates adults and friends", "बच्चा बड़ों और दोस्तों की नकल करता है।"],
      ["The child shows concern for a crying friend", "बच्चा रोते हुए दोस्त के प्रति चिंता दिखाता है।"],
      ["The child understands the concept of “mine”, “his” and “her”", "बच्चा “मेरा”, “उसका (लड़का)”, “उसकी (लड़की)” जैसे भाव समझता है।"],
      ["The child understands and shows a wide range of emotions", "बच्चा भावनाओं की एक विस्तृत श्रृंखला को समझता और व्यक्त करता है।"],
      ["The child gets upset with a major change in the routine of activities", "बच्चा दिनचर्या में बड़े बदलाव से परेशान हो जाता है।"],
      ["The child shows complete independence to dress and undress", "बच्चा कपड़े पहनने और उतारने में स्वतंत्रता दिखाता है।"],
      ["The child plays co-operatively with other children", "बच्चा अन्य बच्चों के साथ मिलकर खेलता है।"],
      ["The child helps in some household task", "बच्चा कुछ घरेलू कामों में मदद करता है।"],
      ["The child performs for others like singing, dancing, clapping etc.", "बच्चा दूसरों के लिए प्रस्तुतियाँ करता है (गाना, नृत्य, ताली बजाना आदि)।"],
      ["The child washes hands unassisted", "बच्चा बिना सहायता के हाथ धोता है।"],
      ["The child participates in small group exercises for 10-15 mins.", "बच्चा छोटे समूह की गतिविधियों में 10-15 मिनट तक भाग लेता है।"],
      ["The child enjoys simple humour", "बच्चा साधारण हास्य का आनंद लेता है।"],
    ]),
    language: rows([
      ["The child repeats parts of a rhyme or song learned in home or school", "बच्चा घर या स्कूल में सीखी हुई कविता या गीत के कुछ हिस्से दोहराता है।"],
      ["The child can answer simple questions like “What is this?”", "बच्चा सरल प्रश्नों का उत्तर दे सकता है जैसे “यह क्या है?”"],
      ["The child follows instructions which has 2-3 step actions", "बच्चा 2-3 चरण वाले निर्देशों का पालन करता है।"],
      ["The child understands prepositions like “in”, “on”, “under” etc.", "बच्चा (“में”, “पर”, “नीचे” आदि जैसे संबंध) सूचक शब्दों को समझता है।"],
      ["The child is able to relate experiences and talk", "बच्चा अपने अनुभवों को बताने और बात करने में सक्षम है।"],
      ["The child is able to tell his/her name, age and gender", "बच्चा अपना नाम, उम्र और लिंग बता सकता है।"],
      ["The child is able to tell at least the name of one friend", "बच्चा कम से कम एक मित्र का नाम बता सकता है।"],
      ["The child is able to converse in 2-3 sentences", "बच्चा 2-3 वाक्यों में बातचीत कर सकता है।"],
      ["The child is able to talk the action words in the picture", "बच्चा चित्र में क्रिया शब्दों के बारे में बता सकता है।"],
      ["The child makes up words and rhymes", "बच्चा नए शब्द और कविताएँ बना सकता है।"],
      ["The child often asks for explanations", "बच्चा अक्सर स्पष्टीकरण पूछता है।"],
      ["The child loves to talk with adults", "बच्चा बड़ों से बात करना पसंद करता है।"],
      ["The child enjoys listening to stories for a longer period", "बच्चा कहानियाँ लंबे समय तक सुनने में आनंद लेता है।"],
      ["The child sings simple nursery rhymes", "बच्चा सरल नर्सरी कविताएँ गाता है।"],
    ]),
    cognitive: rows([
      ["The child shows interest and loves to play with toys having buttons like telephone", "बच्चा बटन वाले खिलौनों (जैसे टेलीफोन) में रुचि दिखाता है और खेलना पसंद करता है।"],
      ["The child shows interest and loves to play with toys having levers and moving parts like toy cars, toy crane", "बच्चा लीवर और चलने वाले हिस्सों वाले खिलौनों (जैसे खिलौना गाड़ी, खिलौना क्रेन) में रुचि दिखाता है और खेलना पसंद करता है।"],
      ["The child plays make believe games with dolls, animal toys", "बच्चा गुड़िया, जानवरों के खिलौनों आदि से कल्पनात्मक खेल खेलता है।"],
      ["The child completes puzzles with 3-4 pieces", "बच्चा 3-4 भाग वाली पहेलियाँ पूरी करता है।"],
      ["The child understands the meaning of two", "बच्चा “दो” का अर्थ समझता है।"],
      ["The child is able to make a circle with a pencil or crayon", "बच्चा पेंसिल या क्रेयॉन के सहायसे एक गोला बना सकता है।"],
      ["The child is able to turn the pages of a book one at a time", "बच्चा किताब के पन्ने एक–एक करके पलट सकता है।"],
      ["The child builds the building blocks with at least 6 blocks", "बच्चा कम से कम 6 ब्लॉकों से इमारत बना सकता है।"],
      ["The child is able to screw and unscrew the cap of a bottle", "बच्चा बोतल का ढक्कन खोल और बंद कर सकता है।"],
      ["The child is able to classify object or pictures into categories", "बच्चा वस्तुओं या चित्रों को श्रेणियों में बाँट सकता है।"],
      ["The child is able to touch and count objects of 4 and more numbers", "बच्चा 4 या उससे अधिक वस्तुओं को छूकर गिन सकता है।"],
      ["The child is able to identify and name 4 colours", "बच्चा 4 रंगों की पहचान कर सकता है और उनके नाम बता सकता है।"],
      ["The child asks “why” for the information given to her/him", "बच्चा दी गई जानकारी के लिए “क्यों” पूछता है।"],
      ["The child can repeat 3 numerals", "बच्चा 3 अंक दोहरा सकता है।"],
    ]),
    movement: rows([
      ["The child walks upstairs unassisted (one foot on each step)", "बच्चा बिना सहारे सीढ़ियाँ चढ़ता है (हर सीढ़ी पर एक पैर रखकर)।"],
      ["The child unwraps chocolates or sweets comfortably", "बच्चा आराम से चॉकलेट या मिठाई के कव्हर खोल देता है।"],
      ["The child runs easily", "बच्चा आसानी से दौड़ता है।"],
      ["The child pedals a tricycle quite comfortably", "बच्चा आराम से त्रिचक्री (ट्राइसाइकिल) चलाता है।"],
      ["The child climbs on to the furniture and climbs down without any help", "बच्चा फर्नीचर पर चढ़ता है और बिना मदद के नीचे उतरता है।"],
      ["The child walks downstairs unassisted (One foot on each step)", "बच्चा बिना सहारे सीढ़ियाँ उतरता है (हर सीढ़ी पर एक पैर रखकर)।"],
      ["The child is able to do the paper folding activity", "बच्चा कागज मोड़ने की गतिविधि कर सकता है।"],
      ["The child enjoys slides unassisted", "बच्चा बिना सहारे स्लाइड का आनंद लेता है।"],
      ["The child is able to balance on one foot for 5 -10 seconds", "बच्चा एक पैर पर 5-10 सेकंड तक संतुलन बना सकता है।"],
      ["The child is able to catch the ball most of the times", "बच्चा अधिकांश समय गेंद पकड़ सकता है।"],
      ["The child builds towers of building blocks upto 8-9 blocks", "बच्चा 8-9 ब्लॉकों तक का टॉवर बना सकता है।"],
      ["The child enjoys clay to make rolled up balls, snakes etc.", "बच्चा मिट्टी से गोलियां, सांप आदि बनाना पसंद करता है।"],
      ["The child is able to trace and write letters and draw pictures", "बच्चा अक्षर लिखने और चित्र बनाने की ट्रेसिंग कर सकता है।"],
      ["The child uses both the hands together for small and simple activities", "बच्चा छोटे और सरल कामों के लिए दोनों हाथों का एक साथ उपयोग करता है।"],
    ]),
  },

  // ------------------------------------------------------------------ UKG
  ukg: {
    social: rows([
      ["The child participates in small group exercises for 10-15 mins", "बच्चा छोटे समूह की गतिविधियों में 10-15 मिनट तक भाग लेता है।"],
      ["The child enjoys simple humour", "बच्चा साधारण हास्य का आनंद लेता है।"],
      ["The child enjoys doing new things and meeting new friends", "बच्चा नई चीजें करना और नए दोस्तों से मिलना पसंद करता है।"],
      ["The child initiates own games with friends", "बच्चा अपने दोस्तों के साथ स्वयं खेल शुरू करता है।"],
      ["The child introduces new and creative roles in make believe game", "बच्चा काल्पनिक खेल में नए और रचनात्मक किरदार जोड़ता है।"],
      ["The child prefers to play with others than self-play", "बच्चा अकेले खेलने के बजाय दूसरों के साथ खेलना पसंद करता है।"],
      ["The child co-operates with other children in any aspects", "बच्चा किसी भी स्थिति में अन्य बच्चों के साथ सहयोग करता है।"],
      ["The child talks about own interests, likes and dislikes", "बच्चा अपनी रुचियों तथा अपनी पसंद और नापसंद के बारे में बात करता है।"],
      ["The child manages to use toilet and wash room independently", "बच्चा शौचालय और वॉशरूम का उपयोग स्वतंत्र रूप से करता है।"],
      ["The child resolves a problem along with peers", "बच्चा अपने साथियों के साथ मिलकर समस्याओं का समाधान करता है।"],
      ["The child talks about his/her own feelings and experience", "बच्चा अपनी भावनाओं और अनुभवों के बारे में बात करता है।"],
      ["The child puts back things in right place after using it", "बच्चा उपयोग के बाद चीजों को सही स्थान पर रखता है।"],
      ["The child starts brushing teeth independently", "बच्चा स्वयं दाँत साफ़ करना शुरू करता है।"],
    ]),
    language: rows([
      ["The child sings nursery/LKG level rhymes without much difficulty", "बच्चा Nursery/LKG स्तर की कविताएँ बिना किसी कठिनाई के गाता है।"],
      ["The child knows the basic grammar rules like using “he” or “she”", "बच्चा बुनियादी व्याकरण के नियम जानता है, जैसे “he” या “she” का प्रयोग करना।"],
      ["The child can tell a story", "बच्चा कहानी सुना सकता है।"],
      ["The child can say his/her complete name", "बच्चा अपना पूरा नाम बता सकता है।"],
      ["The child can identify a picture as described", "बच्चा चित्र की पहचान और वर्णन कर सकता है।"],
      ["The child can read the pictures", "बच्चा चित्रों को पढ़ सकता है।"],
      ["The child can speak the rhyme words for a given word like rat, cat", "बच्चा दिए गए शब्दों जैसे rat, cat के लिए तुकांत शब्द बोल सकता है।"],
      ["The child can form more structured sentence", "बच्चा अधिक संरचित वाक्य बना सकता है।"],
      ["The child can ask for explanation in a structured manner", "बच्चा स्पष्टीकरण माँग सकता है और उसे सही ढंग से प्रस्तुत कर सकता है।"],
      ["The child follows instructions in proper order", "बच्चा निर्देशों का सही क्रम में पालन करता है।"],
      ["The child understands comparatives like big, bigger, biggest", "बच्चा तुलना वाले शब्द जैसे बड़ा, और बड़ा, सबसे बड़ा समझता है।"],
      ["The child talks during play activities", "बच्चा खेल गतिविधियों के दौरान बातचीत करता है।"],
      ["The child asks the when, how and why questions", "बच्चा कब, कैसे और क्यों जैसे प्रश्न पूछता है।"],
      ["The child uses language differently like giving information, providing an opinion or getting information", "बच्चा भाषा का अलग-अलग तरीकों से उपयोग करता है, जैसे जानकारी देना, राय देना या जानकारी प्राप्त करना।"],
    ]),
    cognitive: rows([
      ["The child is able to identify and name more than 5 colours", "बच्चा कम से कम 5 से अधिक रंगों की पहचान कर सकता है और उनके नाम बता सकता है।"],
      ["The child can name 10 or more numbers", "बच्चा कम से कम 10 से अधिक संख्याएँ बोल सकता है।"],
      ["The child understands the idea of counting objects in the picture", "बच्चा चित्र में दिखाए वस्तुओं को गिन सकता है।"],
      ["The child starts to understand time", "बच्चा समय को समझना शुरू करता है।"],
      ["The child understands the characters in a story and part of the story", "बच्चा कहानी के पात्रों और कहानी के हिस्सों को समझता है।"],
      ["The child understands the meaning of same and different", "बच्चा “समान” और “अलग” का अर्थ समझता है।"],
      ["The child understands the sequence of various activities", "बच्चा विभिन्न गतिविधियों के क्रम को समझता है।"],
      ["The child draws a person with 3-4 body parts", "बच्चा व्यक्ति के 3, 4 अंगो के साथ चित्र बना सकता है।"],
      ["The child writes/ traces the capital letters quite easily", "बच्चा बड़े अक्षर आसानी से लिख या ट्रेस कर सकता है।"],
      ["The child plays some card games or use flash cards", "बच्चा कुछ कार्ड गेम खेलता है या फ्लैश काड्र्स का उपयोग करता है।"],
      ["The child can guess or tell what is going to happen next in a story", "बच्चा अनुमान लगा सकता है या बता सकता है कि कहानी में आगे क्या होने वाला है।"],
      ["The child draws pictures and names it.", "बच्चा चित्र बनाता है और उसका नाम बताता है।"],
      ["The child knows his/her home location and address", "बच्चा अपने घर का स्थान और पता जानता है।"],
      ["The child can compare 3 pictures", "बच्चा 3 चित्रों की तुलना कर सकता है।"],
      ["The child can tell similarities and differences", "बच्चा समानताएँ और भिन्नताएँ बता सकता है।"],
    ]),
    movement: rows([
      ["The child is able to trace and write letters and draw picture", "बच्चा अक्षरों को ट्रेस कर सकता है, लिख सकता है तथा चित्र बना सकता है।"],
      ["The child uses both hands together for small and simple activities including tying shoe lace, using Velcro etc", "बच्चा छोटे और सरल कार्यों के लिए दोनों हाथों का एक साथ उपयोग करता है।"],
      ["The child is able to walk backward with tiptoe and heels", "बच्चा पंजों और एड़ियों के सहारे पीछे की ओर चल सकता है।"],
      ["The child is able to throw a ball in one hand to a person standing 4-6 feet away", "बच्चा एक हाथ से गेंद को 4-6 फीट दूर खड़े व्यक्ति की ओर फेंक सकता है।"],
      ["The child hops and stands on one foot for at least 2 seconds", "बच्चा कम से कम 2 सेकंड तक एक पैर पर कूदकर खड़ा रह सकता है।"],
      ["The child catches a bouncing balls most of the time", "बच्चा उछलती हुई गेंद को अधिकांश समय पकड़ लेता है।"],
      ["The child smashes, mixes own food", "बच्चा अपना खाना मसलता और मिलाता है।"],
      ["The child washes hand and face unassisted", "बच्चा बिना सहायता के हाथ और चेहरा धो सकता है।"],
      ["The child makes does paper folding and creases paper at least 3 folds", "बच्चा कागज़ को मोड़ सकता है और कम से कम 3 तहें बना सकता है।"],
      ["The child uses pencil and crayon comfortably for drawing", "बच्चा चित्र बनाने के लिए पेंसिल और क्रेयॉन का आराम से उपयोग करता है।"],
      ["The child jumps forward quite easily and effortlessly", "बच्चा आसानी से और बिना कठिनाई के आगे की ओर कूदता है।"],
      ["The child bounces large ball like basket ball", "बच्चा बास्केटबॉल जैसी बड़ी गेंद उछाल सकता है।"],
      ["The child cuts on a straight line using a scissor under supervision", "बच्चा देखरेख में कैंची से सीधी रेखा काट सकता है।"],
      ["The child can use glue on a paper and paste it in right place", "बच्चा कागज़ पर गोंद लगाकर उसे सही स्थान पर चिपका सकता है।"],
      ["The child colours within the given boundary", "बच्चा दी गई सीमा के भीतर रंग भरता है।"],
    ]),
  },
};

// The three result messages each sheet prints under its score. The sheets give them as
// "above 90", "above 75 but below 90" and "less than 75" and do not say where exactly 90 or
// exactly 75 falls (a child can score exactly 90 or 75), so those two scores count towards the
// higher group: 90 or above, 75 up to below 90, and below 75.
const buildBands = (levelId, skillId) => {
  const { programme } = LEVELS[levelId];

  if (levelId === "ukg") {
    return [
      {
        id: "ready",
        from: 90,
        range: "90 or above",
        message: "The skill is absolutely OK and will be perfectly OK to take a UKG programme.",
      },
      {
        id: "attention",
        from: 75,
        range: "75 to below 90",
        message: `The child needs little more attention to get few more ${SKILLS[skillId].ukgPhrase} skill right, can be done.`,
      },
      {
        id: "time",
        from: 0,
        range: "below 75",
        message: "The child needs more time from parents. Teachers can also guide.",
      },
    ];
  }

  return [
    {
      id: "ready",
      from: 90,
      range: "90 or above",
      message: `The skill is up to mark and the child is ready to take the ${programme} programme immediately.`,
    },
    {
      id: "attention",
      from: 75,
      range: "75 to below 90",
      message: `The child needs a little more attention to get the skills right. The child can take the ${programme} Programme after some preparation.`,
    },
    {
      id: "time",
      from: 0,
      range: "below 75",
      message: `The child needs more time for preparation. Teachers and parents can guide them accordingly. Reassessment can be done after 1 month and the child can take the ${programme} programme based on the score.`,
    },
  ];
};

const SKILL_ID_BY_TITLE = Object.fromEntries(
  Object.entries(SKILLS).map(([id, skill]) => [skill.title, id]),
);

// The Diagnostic page's cards are named by title (classAssessments.js), so this is how a card
// finds its online assessment. A title that is not one of the four still gets a stable id; it
// just leads to the "not available yet" message.
export const diagnosticSkillId = (title) =>
  SKILL_ID_BY_TITLE[title] ??
  String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Everything the online page needs for one class and skill, or null when that combination has
// no questions set up (an unknown class, an unknown skill, or a skill with no check points).
export const getDiagnosticAssessment = (levelId, skillId) => {
  const levelKey = String(levelId ?? "").toLowerCase();
  const skillKey = String(skillId ?? "").toLowerCase();

  if (!Object.hasOwn(questions, levelKey)) return null;
  if (!Object.hasOwn(questions[levelKey], skillKey)) return null;

  const items = questions[levelKey][skillKey];
  if (!items.length) return null;

  return {
    levelId: levelKey,
    skillId: skillKey,
    level: LEVELS[levelKey],
    skill: { id: skillKey, ...SKILLS[skillKey] },
    items,
    bands: buildBands(levelKey, skillKey),
  };
};

// The message that applies to a score (a percentage, not rounded).
export const pickDiagnosticBand = (bands, percent) =>
  bands.find((band) => percent >= band.from) ?? bands[bands.length - 1];
