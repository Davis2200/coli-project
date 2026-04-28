// lib/neo4j/types.ts

// Etiquetas de Nodos Base
export type Role = "Turista" | "Afiliado" | "Partner";

export interface DBNode {
  id: string; // UUID
  createdAt: string;
}

export interface UserNode extends DBNode {
  name: string;
  email: string;
  role: Role;
  status: "active" | "pending_kyc" | "suspended" | "guest";
}

// :Turista
export interface TuristaNode extends UserNode {
  role: "Turista";
  interests: string[];
}

// :Afiliado
export interface AfiliadoNode extends UserNode {
  role: "Afiliado";
  socialUrl: string;
  commissionId: string;
}

// :Partner
export interface PartnerNode extends UserNode {
  role: "Partner";
  businessName: string;
  taxId: string;
  clabe: string;
  address: string;
}

// :Service
export interface ServiceNode extends DBNode {
  name: string;
  category: "Hotel" | "Tour" | "Restaurante" | "Evento";
  price: number;
  featuredDiscountPercentage: number;
  partnerId: string; // Relacionado a un Partner
}

// Relaciones
// (:Turista)-[:RESERVED { status: "paid" }]->(:Service)
// (:Afiliado)-[:RECOMMENDED { earnedCommission: true }]->(:Service)
