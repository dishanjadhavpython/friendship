import type { AccentKey } from "./accents";
import type { ProfessionKey } from "./professions";

export interface Friend {
  name: string;
  /** A fun epithet shown under their name, e.g. "The Chaos Coordinator" */
  title: string;
  /** Filename of a photo placed in public/friend-images/, e.g. "priya.jpg".
   *  Leave unset and a styled initials avatar is shown instead. */
  image?: string;
  /** Locks this chapter to one accent color instead of the automatic rotation. */
  accent?: AccentKey;
  /** Shows a profession badge + a matching icon pattern behind the chapter.
   *  See professions.ts for the available keys. Omit for no profession theming. */
  profession?: ProfessionKey;
  /** Their "superpowers" — shown as chips. 2-6 reads best. */
  skills: string[];
  /** The story — how you met, an inside joke, what makes them them.
   *  A sentence or several paragraphs both work; separate paragraphs with a blank line. */
  story: string;
  /** Optional one-liner: favorite snack, weirdest habit, a running joke. */
  funFact?: string;
  /** Optional — the year you became friends, used to show "N years of friendship". */
  sinceYear?: number;
}

// ---------------------------------------------------------------------------
// This is the file to edit. Each object below becomes one full-screen chapter
// in the story, in the order listed. To add a friend: copy a block, fill in
// the details, drop their photo (if you have one) into public/friend-images/
// and reference its filename in `image`. That's it — no other file changes.
//
// Story text below is kept in the original Marathi from description.txt —
// translating it would lose the actual voice/jokes, and it's rendered with a
// Devanagari font fallback (see index.css) so it displays properly.
// ---------------------------------------------------------------------------

export const friends: Friend[] = [
  {
    name: "Aditya",
    title: "The Dank Joke King",
    image: "aditya.jpeg",
    profession: "softwareDeveloper",
    skills: ["Dank Jokes", "Professional Teaser", "Secretly Soft-Hearted"],
    story:
      "डँक विनोदांचा बादशाह! ग्रुपमध्ये सगळ्यांना चिडवत आणि टोमणे मारत असतो. पण मनाने खूप चांगला असून, अनेकदा लोक त्याला गैरसमजून घेतात.",
  },
  {
    name: "Dishan",
    title: "Needs No Introduction",
    image: "dishan.jpeg",
    profession: "scientist",
    skills: ["Simply A Good Person", "No Introduction Needed"],
    story: "याच्या नावाची ओळख करून द्यायची गरजच नाही. बाकी काही नको, माणूस मात्र एकदम चांगला आहे.",
  },
  {
    name: "Gauravi",
    title: "The Fearless Optimist",
    image: "gauravi.jpeg",
    profession: "civilServant",
    skills: ["Carefree Energy", "Always Smiling", "Zero Worries"],
    story:
      "आमच्या ग्रुपमधली नेहमीच बिनधास्त आणि कायम सकारात्मक विचार करणारी व्यक्ती. कोणत्याही परिस्थितीत चिंता न करता हसतमुख राहणं हीच तिची खासियत.",
  },
  {
    name: "Hrutika",
    title: "Perpetually Unavailable",
    image: "Hrutika.jpeg",
    profession: "dentist",
    skills: ["No Signal", "Always Busy", "Rare Sighting"],
    story: "हिच्याबद्दल फारशी माहिती नाही. पण तिच्याकडे वेळ कधीच नसतो, आणि नेटवर्कही बहुतेक वेळा साथ देत नाही!",
  },
  {
    name: "Mayuri",
    title: "The Quiet Strength",
    image: "mayuri.jpeg",
    profession: "nurse",
    skills: ["Quiet & Composed", "Fiercely Loyal", "Always Shows Up"],
    story:
      "ती स्वभावाने खूपच अबोल आणि संयमी आहे. ती मैत्रीला खूप महत्त्व देते आणि आपल्या मित्र-मैत्रिणींची मनापासून काळजी घेते. त्यांच्या गरजेच्या वेळी ती नेहमी त्यांच्यासोबत ठामपणे उभी राहते.",
  },
  {
    name: "Mittal",
    title: "Slow Start, Strong Finish",
    image: "mittal.jpeg",
    profession: "pharmacist",
    skills: ["Worth The Wait", "Great Under Pressure"],
    story:
      "हिचा मूड कधीही बदलू शकतो, आणि कोणत्याही कामात रंगात यायला थोडा वेळ लागतो. पण एकदा सुरुवात झाली की प्रोजेक्ट मात्र खूप छान करते.",
  },
  {
    name: "Pruthiviraj",
    title: "The Silent Roaster",
    image: "pruthiviraj.jpeg",
    profession: "doctor",
    skills: ["Savage One-Liners", "Inseparable From Ved", "Actually Really Smart"],
    story:
      "समोरासमोर फारसं बोलणार नाही, पण मागून केलेल्या त्याच्या कमेंट्स मात्र एकदम भन्नाट असतात. \"वेद\"ची अर्धांगिनी म्हणून प्रसिद्ध, आणि अभ्यासातही तितकाच हुशार.",
  },
  {
    name: "Sahil",
    title: "The Big Heart",
    image: "sahil.jpeg",
    profession: "rider",
    skills: ["Always Ready To Help", "Calm Energy", "Big Heart"],
    story:
      "आमच्या मित्रपरिवाराचं मोठं मन. मनाने अतिशय चांगला, मदतीसाठी नेहमी पुढे असणारा आणि जणू आमच्या ग्रुपचं हिरवं, शांत जंगलच.",
  },
  {
    // No profession given for Sakshi — chapter renders without the badge/pattern.
    name: "Sakshi",
    title: "Battery Low, Wanderlust High",
    image: "sakshi.jpeg",
    skills: ["Mood: Unpredictable", "Always Up For A Trip"],
    story:
      "हिला राग कधी येईल याचा काही नेम नसतो, आणि तिची \"बॅटरी लो\" असते हे तर कायमचं! पण फिरायला जायचं म्हटलं की ती नेहमीच तयार असते.",
  },
  {
    name: "Ved",
    title: "Ultimate Trip Planner",
    image: "ved.jpeg",
    profession: "civilEngineer",
    skills: ["Teases The Girls", "Big Softie", "aka Chaddu"],
    story:
      "सर्वांना, विशेषतः मुलींना, नेहमी वैताग देणारा; पण मनाने अतिशय प्रेमळ. कोणताही स्वार्थ न ठेवता प्रत्येकाला आपुलकीने मदत करणारा आणि प्रत्येक ट्रिपचे उत्कृष्ट नियोजन करणारा आमच्या ग्रुपचा Ultimate Trip Planner.",
  },
];
