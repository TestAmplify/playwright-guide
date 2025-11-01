import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Implementation from "./pages/Implementation";
import BestPractices from "./pages/BestPractices";
import Interview from "./pages/Interview";
import Header from "./components/Header";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path="/components" component={Components} />
        <Route path="/implementation" component={Implementation} />
        <Route path="/best-practices" component={BestPractices} />
        <Route path="/interview" component={Interview} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
