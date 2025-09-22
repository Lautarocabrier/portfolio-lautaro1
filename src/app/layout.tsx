import "./styles/globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="pt-[52px] sm:pt-[56px] md:pt-[60px]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}