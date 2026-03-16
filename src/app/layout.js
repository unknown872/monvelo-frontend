import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../lib/cart-context";
import { AuthProvider } from "../lib/auth-context";
import { NotificationProvider } from "../components/CartNotification";

export const metadata = {
  title: "Mon Vélo - E-commerce",
  description: "Boutique en ligne de vélos et accessoires",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}