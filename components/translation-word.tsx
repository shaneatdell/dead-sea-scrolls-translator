"use client";

import { useState } from "react";
import { ScrollWord, TranslationOption } from "@/lib/scroll-data";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, Lock, Unlock, GripVertical, RotateCcw, Edit2 } from "lucide-react";

interface TranslationWordProps {
  word: ScrollWord;
  onTranslationSelect: (wordId: string, selectedTranslation: TranslationOption) => void;
  onResetTranslation: (wordId: string) => void;
  onCustomTranslation: (wordId: string, customText: string) => void;
  currentTranslation?: TranslationOption;
  customTranslation?: string;
  isLocked?: boolean;
  onLockToggle?: () => void;
}

export function TranslationWord({
  word,
  onTranslationSelect,
  onResetTranslation,
  onCustomTranslation,
  currentTranslation,
  customTranslation,
  isLocked = false,
  onLockToggle,
}: TranslationWordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingCustom, setIsEditingCustom] = useState(false);
  const [customText, setCustomText] = useState(customTranslation || "");

  const displayText = customTranslation || currentTranslation?.text || word.primaryTranslation;

  const handleSelect = (option: TranslationOption) => {
    if (isLocked) return;
    onTranslationSelect(word.id, option);
    setIsOpen(false);
  };

  const handleReset = () => {
    if (isLocked) return;
    onResetTranslation(word.id);
    setCustomText("");
  };

  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLockToggle?.();
  };

  const handleCustomSubmit = () => {
    if (isLocked) return;
    if (customText.trim()) {
      onCustomTranslation(word.id, customText.trim());
    }
    setIsEditingCustom(false);
  };

  const handleCustomCancel = () => {
    setCustomText(customTranslation || "");
    setIsEditingCustom(false);
  };

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={`h-auto p-4 text-left font-normal border border-purple-900/20 hover:bg-purple-900/20 hover:border-purple-900/40 ${
            currentTranslation ? "bg-purple-900/30 border-purple-900/50" : "bg-gray-800/30"
          } ${isLocked ? "ring-2 ring-purple-500/50" : ""}`}
        >
          <div className="flex items-start gap-2 w-full">
            <GripVertical className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1 cursor-grab" />
            <div className="flex-1">
              <span className="flex flex-col gap-2">
                <span className="text-xl text-purple-400 font-mono font-medium">
                  {word.original}
                </span>
                <span className="text-sm text-gray-100 font-medium">{displayText}</span>
                {word.alternatives.length > 0 && (
                  <ChevronDown className="w-4 h-4 ml-auto opacity-50 text-purple-400" />
                )}
              </span>
            </div>
            {onLockToggle && (
              <div
                onClick={handleLockClick}
                className="flex-shrink-0 p-1 hover:bg-purple-900/30 rounded transition-colors cursor-pointer"
                title={isLocked ? "Unlock word" : "Lock word"}
                role="button"
                tabIndex={0}
              >
                {isLocked ? (
                  <Lock className="w-4 h-4 text-purple-400" />
                ) : (
                  <Unlock className="w-4 h-4 text-gray-500" />
                )}
              </div>
            )}
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 bg-gray-800 border-purple-900/50">
        <div className="space-y-3">
          {isLocked && (
            <div className="flex items-center gap-2 text-purple-400 text-sm p-2 bg-purple-900/20 rounded-md">
              <Lock className="w-4 h-4" />
              <span>This word is locked - no changes allowed</span>
            </div>
          )}
          <div>
            <h4 className="text-sm font-semibold mb-1 text-gray-100">Primary Translation</h4>
            <p className="text-sm text-gray-400">
              {word.primaryTranslation}
            </p>
          </div>
          {word.alternatives.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-100">
                Alternative Translations
              </h4>
              <div className="space-y-2">
                {word.alternatives.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => handleSelect(alt)}
                    disabled={isLocked}
                    className={`w-full text-left p-2 rounded-md border transition-colors ${
                      currentTranslation?.id === alt.id
                        ? "bg-purple-600 text-white border-purple-500"
                        : "bg-gray-700/50 border-purple-900/30 hover:bg-gray-700 hover:border-purple-900/50"
                    } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-100">{alt.text}</p>
                        {alt.scholar && (
                          <p className="text-xs text-gray-400 mt-1">
                            {alt.scholar}
                          </p>
                        )}
                        {alt.notes && (
                          <p className="text-xs text-gray-500 mt-1">
                            {alt.notes}
                          </p>
                        )}
                      </div>
                      {currentTranslation?.id === alt.id && (
                        <Check className="w-4 h-4 flex-shrink-0" />
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all"
                          style={{ width: `${alt.confidence * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Confidence: {Math.round(alt.confidence * 100)}%
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {!isEditingCustom ? (
            <button
              onClick={() => setIsEditingCustom(true)}
              disabled={isLocked}
              className={`w-full flex items-center justify-center gap-2 p-2 rounded-md border border-purple-900/30 hover:bg-purple-900/20 transition-colors text-sm text-purple-300 ${
                isLocked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Edit2 className="w-4 h-4" />
              Add custom translation
            </button>
          ) : (
            <div className="space-y-2 p-2 bg-gray-700/30 rounded-md">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter custom translation..."
                className="w-full p-2 text-sm bg-gray-700 border border-purple-900/30 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCustomSubmit}
                  className="flex-1 px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCustomCancel}
                  className="flex-1 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {(currentTranslation || customTranslation) && (
            <button
              onClick={handleReset}
              disabled={isLocked}
              className={`w-full flex items-center justify-center gap-2 p-2 rounded-md border border-red-900/30 hover:bg-red-900/20 transition-colors text-sm text-red-300 ${
                isLocked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset to original
            </button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
