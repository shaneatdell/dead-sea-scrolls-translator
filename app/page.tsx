"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { deadSeaScrollsData, ScrollSection, TranslationOption } from "@/lib/scroll-data";
import { TranslationWord } from "@/components/translation-word";
import { Button } from "@/components/ui/button";
import { BookOpen, RotateCcw, Lock, Unlock } from "lucide-react";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<ScrollSection>(
    deadSeaScrollsData[0]
  );
  const [userTranslations, setUserTranslations] = useState<
    Record<string, TranslationOption>
  >({});
  const [wordOrder, setWordOrder] = useState<string[]>(
    deadSeaScrollsData[0].words.map((w) => w.id)
  );
  const [lockedWords, setLockedWords] = useState<Record<string, boolean>>({});

  // Reset word order when section changes
  useEffect(() => {
    setWordOrder(selectedSection.words.map((w) => w.id));
    setUserTranslations({});
    setLockedWords({});
  }, [selectedSection.id]);

  const handleTranslationSelect = (
    wordId: string,
    selectedTranslation: TranslationOption
  ) => {
    setUserTranslations((prev) => ({
      ...prev,
      [wordId]: selectedTranslation,
    }));
  };

  const handleLockToggle = (wordId: string) => {
    setLockedWords((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  };

  const handleResetTranslations = () => {
    setUserTranslations({});
  };

  const handleResetOrder = () => {
    setWordOrder(selectedSection.words.map((w) => w.id));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(wordOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWordOrder(items);
  };

  const getFullTranslation = () => {
    return wordOrder
      .map((wordId) => {
        const word = selectedSection.words.find((w) => w.id === wordId);
        if (!word) return "";
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
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetTranslations}
                className="gap-2 text-gray-300 hover:text-gray-100 hover:bg-purple-900/20"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Translations
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetOrder}
                className="gap-2 text-gray-300 hover:text-gray-100 hover:bg-purple-900/20"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Order
              </Button>
            </div>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="words">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {wordOrder.map((wordId, index) => {
                    const word = selectedSection.words.find((w) => w.id === wordId);
                    if (!word) return null;
                    return (
                      <Draggable
                        key={word.id}
                        draggableId={word.id}
                        index={index}
                        isDragDisabled={lockedWords[word.id]}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${snapshot.isDragging ? "opacity-50" : ""}`}
                          >
                            <TranslationWord
                              word={word}
                              onTranslationSelect={handleTranslationSelect}
                              currentTranslation={userTranslations[word.id]}
                              isLocked={lockedWords[word.id]}
                              onLockToggle={() => handleLockToggle(word.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Full Translation Display */}
        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-purple-900/30">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Your Interpretation</h3>
          <p className="text-lg leading-relaxed text-gray-50 font-serif">
            {getFullTranslation()}
          </p>
          <div className="mt-4 pt-4 border-t border-purple-900/30">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <p>
                {Object.keys(userTranslations).length} alternative translation
                {Object.keys(userTranslations).length !== 1 ? "s" : ""} selected
              </p>
              <p>
                {Object.keys(lockedWords).filter((k) => lockedWords[k]).length} word
                {Object.keys(lockedWords).filter((k) => lockedWords[k]).length !== 1 ? "s" : ""} locked
              </p>
              <p>
                {wordOrder.join(",") !== selectedSection.words.map((w) => w.id).join(",") ? "Order modified" : "Original order"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
