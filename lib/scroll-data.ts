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

export interface TranslationPreset {
  id: string;
  name: string;
  sectionId: string;
  wordOrder: string[];
  translations: Record<string, string>; // wordId -> translation text
  isCustom: boolean;
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
      },
      {
        id: "word-8",
        original: "הָיְתָה",
        primaryTranslation: "was",
        alternatives: [
          {
            id: "alt-13",
            text: "became",
            scholar: "Dynamic reading",
            confidence: 0.5,
            notes: "Suggests a change of state"
          },
          {
            id: "alt-14",
            text: "had been",
            scholar: "Perfect tense",
            confidence: 0.7,
            notes: "Emphasizes completed state"
          }
        ]
      },
      {
        id: "word-9",
        original: "תֹהוּ",
        primaryTranslation: "formless",
        alternatives: [
          {
            id: "alt-15",
            text: "chaos",
            scholar: "Mythological reading",
            confidence: 0.6,
            notes: "Connects to ancient Near Eastern creation myths"
          },
          {
            id: "alt-16",
            text: "empty",
            scholar: "Simple reading",
            confidence: 0.5,
            notes: "Focuses on lack of content"
          }
        ]
      },
      {
        id: "word-10",
        original: "וָבֹהוּ",
        primaryTranslation: "and void",
        alternatives: [
          {
            id: "alt-17",
            text: "and empty",
            scholar: "Literal reading",
            confidence: 0.8,
            notes: "Direct translation of the Hebrew"
          },
          {
            id: "alt-18",
            text: "and desolate",
            scholar: "Poetic reading",
            confidence: 0.6,
            notes: "Emphasizes the barrenness"
          }
        ]
      },
      {
        id: "word-11",
        original: "וְחֹשֶׁךְ",
        primaryTranslation: "and darkness",
        alternatives: [
          {
            id: "alt-19",
            text: "with darkness",
            scholar: "Conjunctive reading",
            confidence: 0.7,
            notes: "Connects darkness to the state of chaos"
          }
        ]
      },
      {
        id: "word-12",
        original: "עַל",
        primaryTranslation: "was upon",
        alternatives: [
          {
            id: "alt-20",
            text: "hovered over",
            scholar: "Dynamic reading",
            confidence: 0.6,
            notes: "Suggests movement"
          },
          {
            id: "alt-21",
            text: "covered",
            scholar: "Spatial reading",
            confidence: 0.5,
            notes: "Emphasizes coverage"
          }
        ]
      },
      {
        id: "word-13",
        original: "פְּנֵי",
        primaryTranslation: "the face of",
        alternatives: [
          {
            id: "alt-22",
            text: "the surface of",
            scholar: "Modern reading",
            confidence: 0.8,
            notes: "Common translation in modern versions"
          },
          {
            id: "alt-23",
            text: "the presence of",
            scholar: "Anthropomorphic reading",
            confidence: 0.4,
            notes: "More literal 'face' interpretation"
          }
        ]
      },
      {
        id: "word-14",
        original: "תְהוֹם",
        primaryTranslation: "the deep",
        alternatives: [
          {
            id: "alt-24",
            text: "the abyss",
            scholar: "Mythological reading",
            confidence: 0.7,
            notes: "Connects to primordial waters"
          },
          {
            id: "alt-25",
            text: "the waters",
            scholar: "Simple reading",
            confidence: 0.6,
            notes: "More straightforward translation"
          }
        ]
      },
      {
        id: "word-15",
        original: "וְרוּחַ",
        primaryTranslation: "and the spirit",
        alternatives: [
          {
            id: "alt-26",
            text: "and a wind",
            scholar: "Natural reading",
            confidence: 0.5,
            notes: "Interprets as natural phenomenon"
          },
          {
            id: "alt-27",
            text: "and the breath",
            scholar: "Vital reading",
            confidence: 0.6,
            notes: "Emphasizes life-giving aspect"
          }
        ]
      },
      {
        id: "word-16",
        original: "אֱלֹהִים",
        primaryTranslation: "of God",
        alternatives: [
          {
            id: "alt-28",
            text: "of the divine",
            scholar: "Generic reading",
            confidence: 0.4,
            notes: "Less specific theological reading"
          }
        ]
      },
      {
        id: "word-17",
        original: "מְרַחֶפֶת",
        primaryTranslation: "was hovering",
        alternatives: [
          {
            id: "alt-29",
            text: "was sweeping",
            scholar: "Active reading",
            confidence: 0.6,
            notes: "Suggests more active movement"
          },
          {
            id: "alt-30",
            text: "brooded over",
            scholar: "Poetic reading",
            confidence: 0.5,
            notes: "Maternal imagery"
          }
        ]
      },
      {
        id: "word-18",
        original: "עַל",
        primaryTranslation: "over",
        alternatives: [
          {
            id: "alt-31",
            text: "upon",
            scholar: "Formal reading",
            confidence: 0.7,
            notes: "Slightly more formal preposition"
          }
        ]
      },
      {
        id: "word-19",
        original: "פְּנֵי",
        primaryTranslation: "the face of",
        alternatives: [
          {
            id: "alt-32",
            text: "the surface of",
            scholar: "Modern reading",
            confidence: 0.8,
            notes: "Consistent with modern translations"
          }
        ]
      },
      {
        id: "word-20",
        original: "הַמָּיִם",
        primaryTranslation: "the waters",
        alternatives: [
          {
            id: "alt-33",
            text: "the water",
            scholar: "Singular reading",
            confidence: 0.4,
            notes: "Treating as singular collective"
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
        id: "word-21",
        original: "מִלְחָמַת",
        primaryTranslation: "war of",
        alternatives: [
          {
            id: "alt-34",
            text: "battle of",
            scholar: "Military reading",
            confidence: 0.7,
            notes: "Single engagement rather than prolonged war"
          }
        ]
      },
      {
        id: "word-22",
        original: "בְּנֵי",
        primaryTranslation: "sons of",
        alternatives: [
          {
            id: "alt-35",
            text: "children of",
            scholar: "Inclusive reading",
            confidence: 0.6,
            notes: "Broader interpretation including daughters"
          }
        ]
      },
      {
        id: "word-23",
        original: "אוֹר",
        primaryTranslation: "light",
        alternatives: [
          {
            id: "alt-36",
            text: "Light (with capital L)",
            scholar: "Divine reading",
            confidence: 0.8,
            notes: "Understanding light as representing divine forces"
          }
        ]
      },
      {
        id: "word-24",
        original: "וּבְנֵי",
        primaryTranslation: "and sons of",
        alternatives: [
          {
            id: "alt-37",
            text: "and children of",
            scholar: "Inclusive reading",
            confidence: 0.6,
            notes: "Consistent with inclusive interpretation"
          }
        ]
      },
      {
        id: "word-25",
        original: "חֹשֶׁךְ",
        primaryTranslation: "darkness",
        alternatives: [
          {
            id: "alt-38",
            text: "the darkness",
            scholar: "Definite reading",
            confidence: 0.7,
            notes: "Emphasizes specific darkness"
          },
          {
            id: "alt-39",
            text: "the dark",
            scholar: "Simplified reading",
            confidence: 0.5,
            notes: "More colloquial translation"
          }
        ]
      },
      {
        id: "word-26",
        original: "עַל",
        primaryTranslation: "against",
        alternatives: [
          {
            id: "alt-40",
            text: "in opposition to",
            scholar: "Formal reading",
            confidence: 0.6,
            notes: "More explicit opposition"
          }
        ]
      },
      {
        id: "word-27",
        original: "בַּנְּזִיק",
        primaryTranslation: "band of",
        alternatives: [
          {
            id: "alt-41",
            text: "company of",
            scholar: "Military reading",
            confidence: 0.7,
            notes: "Military unit terminology"
          },
          {
            id: "alt-42",
            text: "troop of",
            scholar: "Modern reading",
            confidence: 0.6,
            notes: "Modern military terminology"
          }
        ]
      },
      {
        id: "word-28",
        original: "אֱלֹהִים",
        primaryTranslation: "God",
        alternatives: [
          {
            id: "alt-43",
            text: "the divine",
            scholar: "Generic reading",
            confidence: 0.4,
            notes: "Less specific theological reading"
          }
        ]
      },
      {
        id: "word-29",
        original: "וַיְהִי",
        primaryTranslation: "and there shall be",
        alternatives: [
          {
            id: "alt-44",
            text: "and it will be",
            scholar: "Future reading",
            confidence: 0.7,
            notes: "Simple future tense"
          },
          {
            id: "alt-45",
            text: "and shall come to pass",
            scholar: "Prophetic reading",
            confidence: 0.6,
            notes: "Prophetic language style"
          }
        ]
      },
      {
        id: "word-30",
        original: "קֶרֶן",
        primaryTranslation: "horn of",
        alternatives: [
          {
            id: "alt-46",
            text: "glory of",
            scholar: "Metaphorical reading",
            confidence: 0.5,
            notes: "Understanding horn as symbol of glory"
          },
          {
            id: "alt-47",
            text: "power of",
            scholar: "Symbolic reading",
            confidence: 0.6,
            notes: "Horn as symbol of power"
          }
        ]
      },
      {
        id: "word-31",
        original: "הַכֹּהֵן",
        primaryTranslation: "the priest",
        alternatives: [
          {
            id: "alt-48",
            text: "the high priest",
            scholar: "Specific reading",
            confidence: 0.7,
            notes: "May refer specifically to the high priest"
          }
        ]
      },
      {
        id: "word-32",
        original: "הָרֹאשׁ",
        primaryTranslation: "the head",
        alternatives: [
          {
            id: "alt-49",
            text: "the leader",
            scholar: "Leadership reading",
            confidence: 0.6,
            notes: "Leadership role interpretation"
          },
          {
            id: "alt-50",
            text: "the chief",
            scholar: "Military reading",
            confidence: 0.5,
            notes: "Military leadership"
          }
        ]
      },
      {
        id: "word-33",
        original: "בְּנֵי",
        primaryTranslation: "sons of",
        alternatives: [
          {
            id: "alt-51",
            text: "children of",
            scholar: "Inclusive reading",
            confidence: 0.6,
            notes: "Broader interpretation"
          }
        ]
      },
      {
        id: "word-34",
        original: "צֶדֶק",
        primaryTranslation: "righteousness",
        alternatives: [
          {
            id: "alt-52",
            text: "justice",
            scholar: "Modern reading",
            confidence: 0.7,
            notes: "Modern legal concept"
          },
          {
            id: "alt-53",
            text: "the just",
            scholar: "Collective reading",
            confidence: 0.5,
            notes: "Referring to righteous people"
          }
        ]
      }
    ]
  },
  {
    id: "community-rule",
    title: "The Community Rule (1QS)",
    description: "Outlines the rules and regulations of the Qumran community, including initiation and discipline.",
    words: [
      {
        id: "word-35",
        original: "וְכָל",
        primaryTranslation: "and all",
        alternatives: [
          {
            id: "alt-54",
            text: "and every",
            scholar: "Distributive reading",
            confidence: 0.6,
            notes: "Emphasizes individual items"
          }
        ]
      },
      {
        id: "word-36",
        original: "הַנִּכְנָסִים",
        primaryTranslation: "who enter",
        alternatives: [
          {
            id: "alt-55",
            text: "the entering ones",
            scholar: "Participial reading",
            confidence: 0.5,
            notes: "More literal participial form"
          }
        ]
      },
      {
        id: "word-37",
        original: "לַמּוּעָד",
        primaryTranslation: "into the council",
        alternatives: [
          {
            id: "alt-56",
            text: "to the assembly",
            scholar: "Assembly reading",
            confidence: 0.7,
            notes: "Understanding mu'ad as assembly"
          },
          {
            id: "alt-57",
            text: "to the community",
            scholar: "Community reading",
            confidence: 0.6,
            notes: "Focus on community aspect"
          }
        ]
      },
      {
        id: "word-38",
        original: "הַיַּחַד",
        primaryTranslation: "the community",
        alternatives: [
          {
            id: "alt-58",
            text: "the sect",
            scholar: "Sectarian reading",
            confidence: 0.5,
            notes: "Emphasizes sectarian nature"
          },
          {
            id: "alt-59",
            text: "the unity",
            scholar: "Unity reading",
            confidence: 0.4,
            notes: "Focus on unity aspect"
          }
        ]
      },
      {
        id: "word-39",
        original: "יִתְנַדֶּה",
        primaryTranslation: "shall dedicate himself",
        alternatives: [
          {
            id: "alt-60",
            text: "shall commit himself",
            scholar: "Commitment reading",
            confidence: 0.7,
            notes: "Focus on commitment"
          },
          {
            id: "alt-61",
            text: "shall devote himself",
            scholar: "Devotional reading",
            confidence: 0.6,
            notes: "Religious devotion"
          }
        ]
      },
      {
        id: "word-40",
        original: "לַעֲשׂוֹת",
        primaryTranslation: "to do",
        alternatives: [
          {
            id: "alt-62",
            text: "to perform",
            scholar: "Formal reading",
            confidence: 0.6,
            notes: "More formal terminology"
          },
          {
            id: "alt-63",
            text: "to carry out",
            scholar: "Action reading",
            confidence: 0.5,
            notes: "Emphasis on execution"
          }
        ]
      },
      {
        id: "word-41",
        original: "רָצוֹן",
        primaryTranslation: "the will",
        alternatives: [
          {
            id: "alt-64",
            text: "the desire",
            scholar: "Desire reading",
            confidence: 0.5,
            notes: "More emotional interpretation"
          },
          {
            id: "alt-65",
            text: "the pleasure",
            scholar: "Benevolent reading",
            confidence: 0.4,
            notes: "Focus on divine pleasure"
          }
        ]
      },
      {
        id: "word-42",
        original: "אֱלֹהִים",
        primaryTranslation: "of God",
        alternatives: [
          {
            id: "alt-66",
            text: "of the divine",
            scholar: "Generic reading",
            confidence: 0.4,
            notes: "Less specific"
          }
        ]
      },
      {
        id: "word-43",
        original: "תַּחַת",
        primaryTranslation: "under",
        alternatives: [
          {
            id: "alt-67",
            text: "according to",
            scholar: "Functional reading",
            confidence: 0.6,
            notes: "Functional rather than spatial"
          }
        ]
      },
      {
        id: "word-44",
        original: "יַד",
        primaryTranslation: "the hand",
        alternatives: [
          {
            id: "alt-68",
            text: "the authority",
            scholar: "Metaphorical reading",
            confidence: 0.7,
            notes: "Hand as symbol of authority"
          },
          {
            id: "alt-69",
            text: "the guidance",
            scholar: "Guidance reading",
            confidence: 0.5,
            notes: "Focus on guidance aspect"
          }
        ]
      },
      {
        id: "word-45",
        original: "מֹשֶׁה",
        primaryTranslation: "of Moses",
        alternatives: [
          {
            id: "alt-70",
            text: "Mosaic",
            scholar: "Adjectival reading",
            confidence: 0.6,
            notes: "Adjectival form"
          }
        ]
      },
      {
        id: "word-46",
        original: "עַבְדֵּי",
        primaryTranslation: "servants of",
        alternatives: [
          {
            id: "alt-71",
            text: "ministers of",
            scholar: "Official reading",
            confidence: 0.5,
            notes: "Official capacity"
          },
          {
            id: "alt-72",
            text: "followers of",
            scholar: "Discipleship reading",
            confidence: 0.6,
            notes: "Focus on following"
          }
        ]
      },
      {
        id: "word-47",
        original: "הָאֱמֶת",
        primaryTranslation: "the truth",
        alternatives: [
          {
            id: "alt-73",
            text: "the faithfulness",
            scholar: "Attribute reading",
            confidence: 0.5,
            notes: "Emphasizes attribute of faithfulness"
          },
          {
            id: "alt-74",
            text: "reality",
            scholar: "Philosophical reading",
            confidence: 0.4,
            notes: "Ontological interpretation"
          }
        ]
      }
    ]
  }
];

export const commonPresets: TranslationPreset[] = [
  {
    id: "kjv",
    name: "King James Version",
    sectionId: "isaiah-scroll",
    wordOrder: [
      "word-1", "word-2", "word-3", "word-4", "word-5", "word-6", "word-7",
      "word-8", "word-9", "word-10", "word-11", "word-12", "word-13", "word-14",
      "word-15", "word-16", "word-17", "word-18", "word-19", "word-20"
    ],
    translations: {},
    isCustom: false,
  },
  {
    id: "niv",
    name: "New International Version",
    sectionId: "isaiah-scroll",
    wordOrder: [
      "word-1", "word-2", "word-3", "word-4", "word-5", "word-6", "word-7",
      "word-8", "word-9", "word-10", "word-11", "word-12", "word-13", "word-14",
      "word-15", "word-16", "word-17", "word-18", "word-19", "word-20"
    ],
    translations: {
      "word-5": "the sky",
      "word-9": "became",
      "word-13": "the surface of",
      "word-14": "the deep",
    },
    isCustom: false,
  },
  {
    id: "esv",
    name: "English Standard Version",
    sectionId: "isaiah-scroll",
    wordOrder: [
      "word-1", "word-2", "word-3", "word-4", "word-5", "word-6", "word-7",
      "word-8", "word-9", "word-10", "word-11", "word-12", "word-13", "word-14",
      "word-15", "word-16", "word-17", "word-18", "word-19", "word-20"
    ],
    translations: {
      "word-13": "the face of",
      "word-14": "the deep",
    },
    isCustom: false,
  },
];
