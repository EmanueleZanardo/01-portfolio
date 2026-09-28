"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateDesigns } from "@/app/actions";
import { DESIGN_CONSTANTS } from "@/lib/constants";
import { Loader, Sparkles, Bot } from "lucide-react";

export function DesignVariations() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuggestions([]);

    const pageContent = document.documentElement.outerHTML;

    const result = await generateDesigns({
      originalSiteContent: pageContent,
      ...DESIGN_CONSTANTS,
    });

    if (result.error) {
      setError(result.error);
    } else if (result.designSuggestions) {
      setSuggestions(result.designSuggestions);
    }
    setLoading(false);
  };

  return (
    <section id="ai-designs" className="py-20 lg:py-32 scroll-mt-16">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <Bot aria-hidden="true" className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-headline text-4xl md:text-5xl text-primary">Need a Fresh Look?</h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Use the power of AI to explore alternative layouts and color schemes for this portfolio. Get instant design inspiration based on the current content.
        </p>
        <Button
          onClick={handleGenerate}
          disabled={loading}
          size="lg"
          className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {loading ? (
            <Loader aria-hidden="true" className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles aria-hidden="true" className="mr-2 h-5 w-5" />
          )}
          {loading ? "Generating Ideas..." : "Generate Design Ideas"}
        </Button>

        <div className="mt-12 space-y-4 text-left">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {suggestions.map((suggestion, index) => (
            <Alert key={index} className="border-accent bg-card">
              <Sparkles aria-hidden="true" className="h-4 w-4 !text-accent" />
              <AlertTitle className="font-headline text-accent tracking-wider">Suggestion {index + 1}</AlertTitle>
              <AlertDescription className="text-foreground/80">
                {suggestion}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </section>
  );
}
