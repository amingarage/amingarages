import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

/**
 * The app chrome, extracted so the browser router (App.tsx) and the prerenderer
 * (entry-server.tsx) render identical markup.
 *
 * This exists purely for prerendering: if each entry duplicated the
 * navbar/main/footer markup, the two could drift and React would report a
 * hydration mismatch and discard the server-rendered HTML.
 *
 * The DOM structure, class names and element order are deliberately identical to
 * the original inline markup in App.tsx. No styling, spacing or layout was
 * changed.
 */
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main>
      <React.Fragment>{children}</React.Fragment>
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
