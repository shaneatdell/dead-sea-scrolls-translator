export interface TranslationOption {
  id: string;
  text: string;
  scholar?: string;
  confidence: number; // 0-1, higher is more confident
  notes?: string;
}

export interface ScrollWord {
  id: string;
  original: string; // Original Hebrew/Aramaic text
  primaryTranslation: string;
  alternatives: TranslationOption[];
  context?: string;
}

export interface ScrollSection {
  id: string;
  title: string;
  description: string;
  words: ScrollWord[];
}

export const deadSeaScrollsData: ScrollSection[] = [
  {
    id: "isaiah-scroll",
    title: "The Great Isaiah Scroll (1QIsaᵃ)",
    description: "One of the original seven Dead Sea Scrolls discovered in 1947. Contains the complete Book of Isaiah.",
    words: [
      {
        id: "word-1",
        original: "בְּרֵאשִׁית",
        primaryTranslation: "In the beginning",
        alternatives: [
          {
            id: "alt-1",
            text: "At the start",
            scholar: "Alternative reading",
            confidence: 0.7,
            notes: "Some scholars interpret this as emphasizing the initial moment"
          },
          {
            id: "alt-2",
            text: "First of all",
            scholar: "Contextual reading",
            confidence: 0.5,
            notes: "Less common interpretation focusing on priority"
          }
        ]
      },
      {
        id: "word-2",
        original: "בָּרָא",
        primaryTranslation: "created",
        alternatives: [
          {
            id: "alt-3",
            text: "fashioned",
            scholar: "Craft interpretation",
            confidence: 0.6,
            notes: "Suggests artistic creation"
          },
          {
            id: "alt-4",
            text: "brought into being",
            scholar: "Existential reading",
            confidence: 0.8,
            notes: "Emphasizes the act of causing to exist"
          }
        ]
      },
      {
        id: "word-3",
        original: "אֱלֹהִים",
        primaryTranslation: "God",
        alternatives: [
          {
            id: "alt-5",
            text: "the divine beings",
            scholar: "Plural interpretation",
            confidence: 0.4,
            notes: "Some read this as suggesting a divine council"
          },
          {
            id: "alt-6",
            text: "the Mighty One",
            scholar: "Singular emphasis",
            confidence: 0.7,
            notes: "Focuses on singular majesty"
          }
        ]
      },
      {
        id: "word-4",
        original: "אֵת",
        primaryTranslation: "",
        alternatives: [
          {
            id: "alt-7",
            text: "[direct object marker]",
            scholar: "Grammatical note",
            confidence: 0.95,
            notes: "Untranslatable particle marking the direct object"
          }
        ]
      },
      {
        id: "word-5",
        original: "הַשָּׁמַיִם",
        primaryTranslation: "the heavens",
        alternatives: [
          {
            id: "alt-8",
            text: "the sky",
            scholar: "Natural reading",
            confidence: 0.6,
            notes: "More physical interpretation"
          },
          {
            id: "alt-9",
            text: "the heavens and earth",
            scholar: "Merism interpretation",
            confidence: 0.5,
            notes: "Often understood as representing all of creation"
          }
        ]
      },
      {
        id: "word-6",
        original: "וְאֵת",
        primaryTranslation: "and",
        alternatives: [
          {
            id: "alt-10",
            text: "also",
            scholar: "Emphatic reading",
            confidence: 0.4,
            notes: "Adds emphasis to the conjunction"
          }
        ]
      },
      {
        id: "word-7",
        original: "הָאָרֶץ",
        primaryTranslation: "the earth",
        alternatives: [
          {
            id: "alt-11",
            text: "the land",
            scholar: "Territorial reading",
            confidence: 0.6,
            notes: "Could refer specifically to the land of Israel"
          },
          {
            id: "alt-12",
            text: "the ground",
            scholar: "Physical reading",
            confidence: 0.5,
            notes: "More literal interpretation of the soil/earth"
          }
        ]
      }
    ]
  },
  {
    id: "war-scroll",
    title: "The War Scroll (1QM)",
    description: "Describes a final battle between the Sons of Light and the Sons of Darkness.",
    words: [
      {
        id: "word-8",
        original: "מִלְחָמַת",
        primaryTranslation: "war of",
        alternatives: [
          {
            id: "alt-13",
            text: "battle of",
            scholar: "Military reading",
            confidence: 0.7,
            notes: "Single engagement rather than prolonged war"
          }
        ]
      },
      {
        id: "word-9",
        original: "בְּנֵי",
        primaryTranslation: "sons of",
        alternatives: [
          {
            id: "alt-14",
            text: "children of",
            scholar: "Inclusive reading",
            confidence: 0.6,
            notes: "Broader interpretation including daughters"
          }
        ]
      },
      {
        id: "word-10",
        original: "אוֹר",
        primaryTranslation: "light",
        alternatives: [
          {
            id: "alt-15",
            text: "Light (with capital L)",
            scholar: "Divine reading",
            confidence: 0.8,
            notes: "Understanding light as representing divine forces"
          }
        ]
      }
    ]
  }
];
