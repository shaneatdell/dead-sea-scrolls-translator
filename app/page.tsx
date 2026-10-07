"use client";

import { useState } from "react";
import { deadSeaScrollsData, ScrollSection, TranslationOption } from "@/lib/scroll-data";
import { TranslationWord } from "@/components/translation-word";
import { Button } from "@/components/ui/button";
import { BookOpen, RotateCcw } from "lucide-react";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<ScrollSection>(
    deadSeaScrollsData[0]
  );
  const [userTranslations, setUserTranslations] = useState<
    Record<string, TranslationOption>
  >({});

  const handleTranslationSelect = (
    wordId: string,
    selectedTranslation: TranslationOption
  ) => {
    setUserTranslations((prev) => ({
      ...prev,
      [wordId]: selectedTranslation,
    }));
  };

  const handleReset = () => {
    setUserTranslations({});
  };

  const getFullTranslation = () => {
    return selectedSection.words
      .map((word) => {
        const selected = userTranslations[word.id];
        return selected ? selected.text : word.primaryTranslation;
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-neutral-900 to-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-gray-100">
              Dead Sea Scrolls Translator
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Explore ancient texts and develop your own interpretation
          </p>
        </header>

        {/* Section Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {deadSeaScrollsData.map((section) => (
            <Button
              key={section.id}
              variant={
                selectedSection.id === section.id ? "default" : "outline"
              }
              onClick={() => setSelectedSection(section)}
              className={
                selectedSection.id === section.id
                  ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                  : "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-purple-900/20 hover:text-purple-200"
              }
            >
              {section.title}
            </Button>
          ))}
        </div>

        {/* Section Info */}
        <div className="mb-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-purple-900/30">
          <h2 className="text-2xl font-semibold mb-2 text-gray-100">{selectedSection.title}</h2>
          <p className="text-gray-400">
            {selectedSection.description}
          </p>
        </div>

        {/* Translation Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-100">Interactive Translation</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-2 text-gray-300 hover:text-gray-100 hover:bg-purple-900/20"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedSection.words.map((word) => (
              <TranslationWord
                key={word.id}
                word={word}
                onTranslationSelect={handleTranslationSelect}
                currentTranslation={userTranslations[word.id]}
              />
            ))}
          </div>
        </div>

        {/* Full Translation Display */}
        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-purple-900/30">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Your Interpretation</h3>
          <p className="text-lg leading-relaxed text-gray-50 font-serif">
            {getFullTranslation()}
          </p>
          <div className="mt-4 pt-4 border-t border-purple-900/30">
            <p className="text-sm text-gray-400">
              {Object.keys(userTranslations).length} alternative translation
              {Object.keys(userTranslations).length !== 1 ? "s" : ""} selected
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
