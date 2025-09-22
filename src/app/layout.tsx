import "./styles/globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="pt-[56px] md:pt-[64px]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}