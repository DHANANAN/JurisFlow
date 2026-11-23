"use client";

import * as React from "react";
import {
  BookOpen,
  Search,
  Plus,
  Copy,
  Check,
  Star,
  Sparkles,
  ExternalLink,
  Code,
  Tag,
  Share2,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { prompts as initialPrompts } from "@/lib/data";
import { Prompt } from "@/lib/types";

export default function PromptsPage() {
  const [prompts, setPrompts] = React.useState<Prompt[]>(initialPrompts);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | null>(initialPrompts[0]);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const categories = [
    "All",
    "Email Writing",
    "Opportunity Discovery",
    "Opportunity Ranking",
    "Judge Research",
    "Cover Letter Drafting",
    "Follow-Ups",
    "AI Research",
  ];

  const filteredPrompts = prompts.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.variables.some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
    if (selectedPrompt && selectedPrompt.id === id) {
      setSelectedPrompt((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AppShell title="Prompt Library">
      <div className="space-y-6 pb-12">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                Legal AI Prompt Engineering Library
              </h2>
              <Badge variant="purple" className="text-xs">
                Production-Ready Prompts
              </Badge>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Battle-tested prompt architecture designed for Gemini, DeepSeek, and OpenRouter legal models. Reusable with dynamic variable interpolation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5 shadow-xs">
              <Plus className="h-3.5 w-3.5" />
              New Legal Prompt
            </Button>
          </div>
        </div>

        {/* ── CATEGORY PILLS & SEARCH ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search prompts by title or variable..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        {/* ── TWO-COLUMN VIEW: LIST ON LEFT, INSPECTOR ON RIGHT ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: PROMPTS LIST (5 COLS) */}
          <div className="lg:col-span-5 space-y-3">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                onClick={() => setSelectedPrompt(prompt)}
                className={`p-4 rounded-xl border bg-white shadow-2xs transition-all cursor-pointer space-y-2.5 ${
                  selectedPrompt?.id === prompt.id
                    ? "ring-2 ring-blue-500 border-blue-400 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-[10px] bg-slate-50 font-semibold">
                    {prompt.category}
                  </Badge>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(prompt.id);
                    }}
                    className="text-slate-400 hover:text-amber-500 p-1"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        prompt.isFavorite ? "fill-amber-400 text-amber-500" : ""
                      }`}
                    />
                  </button>
                </div>

                <h4 className="font-bold text-sm text-slate-900">{prompt.title}</h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {prompt.content}
                </p>

                {/* Variable tags */}
                <div className="flex flex-wrap gap-1">
                  {prompt.variables.slice(0, 4).map((v, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {`{${v}}`}
                    </span>
                  ))}
                  {prompt.variables.length > 4 && (
                    <span className="text-[10px] text-slate-400">
                      +{prompt.variables.length - 4} more
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Used {prompt.usageCount} times</span>
                  <span className="text-blue-600 font-semibold">Inspect →</span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: PROMPT INSPECTOR & TESTER (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedPrompt ? (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="default" className="text-xs">
                        {selectedPrompt.category}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        Usage: {selectedPrompt.usageCount} executions
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedPrompt.title}
                    </h3>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleCopy(selectedPrompt.content, selectedPrompt.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5"
                  >
                    {copiedId === selectedPrompt.id ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedId === selectedPrompt.id ? "Copied" : "Copy Prompt"}
                  </Button>
                </div>

                {/* Variable Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Template Variables (Injected Automatically)
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPrompt.variables.map((v, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {`{${v}}`}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Prompt Content */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full System Prompt Text
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-wrap selection:bg-blue-600">
                    {selectedPrompt.content}
                  </div>
                </div>

                {/* Integration Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
                  <span>Compatible with: <strong>Gemini 1.5 Pro</strong>, <strong>Claude 3.5 Sonnet</strong>, <strong>DeepSeek-R1</strong></span>
                  <span className="text-emerald-600 font-semibold">Ready to deploy</span>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-400">
                Select a prompt from the list to view its details.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
