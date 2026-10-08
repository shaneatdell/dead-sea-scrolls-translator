"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deadSeaScrollsData, ScrollSection, TranslationOption, commonPresets, TranslationPreset } from "@/lib/scroll-data";
import { TranslationWord } from "@/components/translation-word";
import { Button } from "@/components/ui/button";
import { BookOpen, RotateCcw, Lock, Unlock, Save, Download } from "lucide-react";

function SortableWord({
  word,
  onTranslationSelect,
  onResetTranslation,
  onCustomTranslation,
  currentTranslation,
  customTranslation,
  isLocked,
  onLockToggle,
}: {
  word: any;
  onTranslationSelect: (wordId: string, selectedTranslation: TranslationOption) => void;
  onResetTranslation: (wordId: string) => void;
  onCustomTranslation: (wordId: string, customText: string) => void;
  currentTranslation?: TranslationOption;
  customTranslation?: string;
  isLocked?: boolean;
  onLockToggle: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: word.id,
    disabled: isLocked,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: undefined,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TranslationWord
        word={word}
        onTranslationSelect={onTranslationSelect}
        onResetTranslation={onResetTranslation}
        onCustomTranslation={onCustomTranslation}
        currentTranslation={currentTranslation}
        customTranslation={customTranslation}
        isLocked={isLocked}
        onLockToggle={onLockToggle}
      />
    </div>
  );
}

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<ScrollSection>(
    deadSeaScrollsData[0]
  );
  const [userTranslations, setUserTranslations] = useState<
    Record<string, TranslationOption>
  >({});
  const [customTranslations, setCustomTranslations] = useState<
    Record<string, string>
  >({});
  const [wordOrder, setWordOrder] = useState<string[]>(
    deadSeaScrollsData[0].words.map((w) => w.id)
  );
  const [lockedWords, setLockedWords] = useState<Record<string, boolean>>({});
  const [userPresets, setUserPresets] = useState<TranslationPreset[]>([]);

  // Load user presets from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userPresets');
    if (saved) {
      try {
        setUserPresets(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load presets:', e);
      }
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Reset word order when section changes
  useEffect(() => {
    setWordOrder(selectedSection.words.map((w) => w.id));
    setUserTranslations({});
    setCustomTranslations({});
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
    setCustomTranslations((prev) => {
      const { [wordId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleResetTranslation = (wordId: string) => {
    setUserTranslations((prev) => {
      const { [wordId]: _, ...rest } = prev;
      return rest;
    });
    setCustomTranslations((prev) => {
      const { [wordId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleCustomTranslation = (wordId: string, customText: string) => {
    setCustomTranslations((prev) => ({
      ...prev,
      [wordId]: customText,
    }));
    setUserTranslations((prev) => {
      const { [wordId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleLockToggle = (wordId: string) => {
    setLockedWords((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  };

  const handleResetTranslations = () => {
    setUserTranslations({});
    setCustomTranslations({});
  };

  const handleResetOrder = () => {
    setWordOrder(selectedSection.words.map((w) => w.id));
  };

  const handleApplyPreset = (preset: TranslationPreset) => {
    if (preset.sectionId !== selectedSection.id) return;

    setWordOrder(preset.wordOrder);
    setUserTranslations({});
    setCustomTranslations(preset.translations);
    setLockedWords({});
  };

  const handleSavePreset = () => {
    const preset: TranslationPreset = {
      id: `custom-${Date.now()}`,
      name: `Custom ${new Date().toLocaleDateString()}`,
      sectionId: selectedSection.id,
      wordOrder: [...wordOrder],
      translations: { ...customTranslations },
      isCustom: true,
    };

    const updatedPresets = [...userPresets, preset];
    setUserPresets(updatedPresets);
    localStorage.setItem('userPresets', JSON.stringify(updatedPresets));
  };

  const handleDeletePreset = (presetId: string) => {
    const updatedPresets = userPresets.filter((p) => p.id !== presetId);
    setUserPresets(updatedPresets);
    localStorage.setItem('userPresets', JSON.stringify(updatedPresets));
  };

  const getAvailablePresets = () => {
    return [
      ...commonPresets.filter((p) => p.sectionId === selectedSection.id),
      ...userPresets.filter((p) => p.sectionId === selectedSection.id),
    ];
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWordOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const getFullTranslation = () => {
    return wordOrder
      .map((wordId) => {
        const word = selectedSection.words.find((w) => w.id === wordId);
        if (!word) return "";
        const custom = customTranslations[word.id];
        if (custom) return custom;
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
          <p className="text-gray-400 mb-4">
            {selectedSection.description}
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400">Translation Presets:</span>
            {getAvailablePresets().map((preset) => (
              <div key={preset.id} className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyPreset(preset)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
                {preset.isCustom && (
                  <button
                    onClick={() => handleDeletePreset(preset.id)}
                    className="text-red-400 hover:text-red-300 text-lg leading-none px-1"
                    title="Delete preset"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSavePreset}
              className="gap-1 text-xs text-purple-300 hover:text-purple-200"
            >
              <Save className="w-3 h-3" />
              Save as Preset
            </Button>
          </div>
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={wordOrder} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {wordOrder.map((wordId) => {
                  const word = selectedSection.words.find((w) => w.id === wordId);
                  if (!word) return null;
                  return (
                    <SortableWord
                      key={word.id}
                      word={word}
                      onTranslationSelect={handleTranslationSelect}
                      onResetTranslation={handleResetTranslation}
                      onCustomTranslation={handleCustomTranslation}
                      currentTranslation={userTranslations[word.id]}
                      customTranslation={customTranslations[word.id]}
                      isLocked={lockedWords[word.id]}
                      onLockToggle={() => handleLockToggle(word.id)}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
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
                {Object.keys(customTranslations).length} custom translation
                {Object.keys(customTranslations).length !== 1 ? "s" : ""} added
              </p>
              <p>
                {Object.keys(lockedWords).filter((k) => lockedWords[k]).length} word
                {Object.keys(lockedWords).filter((k) => lockedWords[k]).length !== 1 ? "s" : ""} locked
              </p>
              <p>
                {wordOrder.join(",") !== selectedSection.words.map((w) => w.id).join(",") ? "Order modified" : "Original order"}
              </p>
              <p>
                {userPresets.filter((p) => p.sectionId === selectedSection.id).length} custom preset
                {userPresets.filter((p) => p.sectionId === selectedSection.id).length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
