// coli-project/lib/navigation.ts

export const MENU_LINKS = {
    turista: [
        { name: "Explorar Destinos", href: "/turista/explorar" },
        { name: "Mis Reservas", href: "/turista/reservas" },
        { name: "Cupones y Promos", href: "/turista/promociones" },
        { name: "Favoritos", href: "/turista/favoritos" },
    ],
    afiliado: [
        { name: "Panel de Control", href: "/afiliado/dashboard" },
        { name: "Mis Comisiones", href: "/afiliado/comisiones" },
        { name: "Herramientas de Venta", href: "/afiliado/tools" },
    ],
    business: [
        { name: "Mi Establecimiento", href: "/business/perfil" },
        { name: "Gestión de Reservas", href: "/business/reservas" },
        { name: "Estadísticas", href: "/business/stats" },
        { name: "Publicar Oferta", href: "/business/ofertas" },
    ],
};