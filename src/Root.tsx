import App from './App.tsx';
import { BlogPage } from './pages/BlogPage';
import { PricingPage } from './pages/PricingPage';
import { useRoute } from './lib/router';

/** Top-level route switch: the portfolio home, the blog at '/blog', or pricing at '/pricing'. */
export function Root() {
  const route = useRoute();
  return route.startsWith('/blog') ? <BlogPage /> : route.startsWith('/pricing') ? <PricingPage /> : <App />;
}
