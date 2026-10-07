"use client";

import { useState } from "react";
import { ScrollWord, TranslationOption } from "@/lib/scroll-data";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";

interface TranslationWordProps {
  word: ScrollWord;
  onTranslationSelect: (wordId: string, selectedTranslation: TranslationOption) => void;
  currentTranslation?: TranslationOption;
}

export function TranslationWord({
  word,
  onTranslationSelect,
  currentTranslation,
}: TranslationWordProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayText = currentTranslation?.text || word.primaryTranslation;

  const handleSelect = (option: TranslationOption) => {
    onTranslationSelect(word.id, option);
    setIsOpen(false);
  };

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={`h-auto p-3 text-left font-normal border border-amber-900/20 hover:bg-amber-900/20 hover:border-amber-900/40 ${
            currentTranslation ? "bg-amber-900/30 border-amber-900/50" : "bg-stone-800/30"
          }`}
        >
          <span className="flex flex-col gap-2">
            <span className="text-base text-amber-400 font-mono font-medium">
              {word.original}
            </span>
            <span className="text-sm text-amber-100 font-medium">{displayText}</span>
            {word.alternatives.length > 0 && (
              <ChevronDown className="w-4 h-4 ml-auto opacity-50 text-amber-400" />
            )}
          </span>
        </Button>
      </HoverCardTrigger>
      {word.alternatives.length > 0 && (
        <HoverCardContent className="w-80 bg-stone-800 border-amber-900/50">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold mb-1 text-amber-100">Primary Translation</h4>
              <p className="text-sm text-amber-200/70">
                {word.primaryTranslation}
              </p>
            </div>
            {word.alternatives.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 text-amber-100">
                  Alternative Translations
                </h4>
                <div className="space-y-2">
                  {word.alternatives.map((alt) => (
                    <button
                      key={alt.id}
                      onClick={() => handleSelect(alt)}
                      className={`w-full text-left p-2 rounded-md border transition-colors ${
                        currentTranslation?.id === alt.id
                          ? "bg-amber-600 text-amber-50 border-amber-500"
                          : "bg-stone-700/50 border-amber-900/30 hover:bg-stone-700 hover:border-amber-900/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-amber-100">{alt.text}</p>
                          {alt.scholar && (
                            <p className="text-xs text-amber-200/60 mt-1">
                              {alt.scholar}
                            </p>
                          )}
                          {alt.notes && (
                            <p className="text-xs text-amber-200/50 mt-1">
                              {alt.notes}
                            </p>
                          )}
                        </div>
                        {currentTranslation?.id === alt.id && (
                          <Check className="w-4 h-4 flex-shrink-0" />
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${alt.confidence * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-amber-200/50 mt-1">
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
