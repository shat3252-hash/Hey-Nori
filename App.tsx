import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import NoriFeatures from "./pages/NoriFeatures";
import Press from "./pages/Press";
import {
  SupportArticlePage,
  SupportCategoryPage,
  SupportCenterHome,
  SupportContactPage,
  SupportDownloadPage,
  SupportOrderPage,
  SupportRequestPage,
} from "./pages/SupportCenter";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/nori-ai/features"} component={NoriFeatures} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/press"} component={Press} />
      <Route path={"/support-center"} component={SupportCenterHome} />
      <Route path={"/support-center/contact"} component={SupportContactPage} />
      <Route path={"/support-center/request"} component={SupportRequestPage} />
      <Route path={"/support-center/order"} component={SupportOrderPage} />
      <Route path={"/support-center/download"} component={SupportDownloadPage} />
      <Route path={"/support-center/category/:slug"} component={SupportCategoryPage} />
      <Route path={"/support-center/article/:slug"} component={SupportArticlePage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster position="bottom-center" />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
