import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Frame } from "@/pages/Frame";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Lazy-load the enroll page — only downloaded when the user navigates to /enroll
const EnrollPage = lazy(() => import("@/pages/EnrollPage").then(m => ({ default: m.EnrollPage })));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Frame} />
      <Route path="/enroll">
        <Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
          <EnrollPage />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

import { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <Router />
        </div>
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
