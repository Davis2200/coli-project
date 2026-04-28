// coli-project/lib/navigation.ts

export const MENU_LINKS = {
    turista: [
        { name: "Explorar Destinos", href: "/turista/explorar" },
        { name: "Mis Reservas", href: "/turista/reservas" },
        { name: "Cupones y Promos", href: "/turista/promociones" },
        { name: "Favoritos", href: "/turista/favoritos" },
        { name: "Mis referidos", href: "/turista/referidos" },
    ],
    afiliado: [
        { name: "Panel de Control", href: "/afiliado/panel_control" },
        { name: "Explorar Negocios", href: "/afiliado/explorar" },
        { name: "Mis Referidos", href: "/afiliado/referidos" },
        { name: "Promociones a Ofrecer", href: "/afiliado/promociones" },
        { name: "Reservas Referidas", href: "/afiliado/reservas" },
        { name: "Chat", href: "/afiliado/chat" },
    ],
    business: [
        { name: "Mis Servicios", href: "/business/servicios" }, // Página de selección de negocio
        { name: "Panel de Control", href: "/business/[id]/panel_control" },
        { name: "Gestión de Reservas", href: "/business/[id]/reservas" },
        { name: "Explorar Afiliados", href: "/business/[id]/explorar_afiliados" },
        { name: "Promociones", href: "/business/[id]/promociones" },
        { name: "Chat", href: "/business/[id]/chat" },
    ],
};