"use client";

import { useState } from "react";
import { ScrollWord, TranslationOption } from "@/lib/scroll-data";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, Lock, Unlock, GripVertical } from "lucide-react";

interface TranslationWordProps {
  word: ScrollWord;
  onTranslationSelect: (wordId: string, selectedTranslation: TranslationOption) => void;
  currentTranslation?: TranslationOption;
  isLocked?: boolean;
  onLockToggle?: () => void;
}

export function TranslationWord({
  word,
  onTranslationSelect,
  currentTranslation,
  isLocked = false,
  onLockToggle,
}: TranslationWordProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayText = currentTranslation?.text || word.primaryTranslation;

  const handleSelect = (option: TranslationOption) => {
    onTranslationSelect(word.id, option);
    setIsOpen(false);
  };

  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLockToggle?.();
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
              <button
                onClick={handleLockClick}
                className="flex-shrink-0 p-1 hover:bg-purple-900/30 rounded transition-colors"
                title={isLocked ? "Unlock word" : "Lock word"}
              >
                {isLocked ? (
                  <Lock className="w-4 h-4 text-purple-400" />
                ) : (
                  <Unlock className="w-4 h-4 text-gray-500" />
                )}
              </button>
            )}
          </div>
        </Button>
      </HoverCardTrigger>
      {word.alternatives.length > 0 && (
        <HoverCardContent className="w-80 bg-gray-800 border-purple-900/50">
          <div className="space-y-3">
            {isLocked && (
              <div className="flex items-center gap-2 text-purple-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>This word is locked and cannot be reordered</span>
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
                      className={`w-full text-left p-2 rounded-md border transition-colors ${
                        currentTranslation?.id === alt.id
                          ? "bg-purple-600 text-white border-purple-500"
                          : "bg-gray-700/50 border-purple-900/30 hover:bg-gray-700 hover:border-purple-900/50"
                      }`}
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
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
