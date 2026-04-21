"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { HamburgerMenu } from "@/components/layout/HamburgerMenu";
import { NavbarPublic } from "@/components/layout/NavbarPublic";
import { NavbarTurista } from "@/components/layout/NavbarTurista";
import { NavbarAfiliado } from "@/components/layout/NavbarAfiliado";
import { NavbarBusiness } from "@/components/layout/NavbarBussines";
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderNavbar = () => {
    if (pathname.includes("/login") || pathname.includes("/register")) return null;

    // Lógica Prioritaria: Si hay sesión, mostrar el Navbar del rol 
    // Esto evita que en /lugares/[id] se vea el Public.
    if (user?.role === "turista") return <NavbarTurista onOpenMenu={() => setIsMenuOpen(true)} />;
    if (user?.role === "afiliado") return <NavbarAfiliado onOpenMenu={() => setIsMenuOpen(true)} />;
    if (user?.role === "business") return <NavbarBusiness onOpenMenu={() => setIsMenuOpen(true)} />;

    return <NavbarPublic />;
  };

  return (
    <html lang="es">
      <body className="bg-[#F9F8F6] antialiased">
        {renderNavbar()}

        <HamburgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          role={user?.role || "turista"}
          onLogout={logout}
        />

        <main>{children}</main>
      </body>
    </html>
  );
}