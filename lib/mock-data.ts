export interface Business {
  id: string;
  name: string;
  description: string;
  rating: number;
  base_price: number;
  discount_price: number;
  image_url: string;
  category: "Hotel" | "Tour" | "Restaurante" | "Evento";
}

const VALID_PHOTO_IDS = [
  "1517248135467-4c7edcad34c4", // Food
  "1504674900247-0877df9cc836", // Food
  "1414235077428-33898b12d151", // Food
  "1566073771259-6a8506099945", // Hotel
  "1551882547-ff40c0d5bf8f", // Hotel
  "1582719478250-c89d14c77d51", // Architecture
  "1522708323590-d24dbb6b0267", // Room
  "1514933651103-005eec06c04b", // Bar
  "1501555088652-021faa106b9b", // Nature
  "1469854523086-cc02fe5d8800", // Landscape
  "1495474472205-16284eb86b3c", // Cuisine
  "1541519227354-08fa1d110833", // Fine Dining
  "1584132869994-a4151127aba4", // Urban
  "1582719508461-891d2d38e2d2", // Hotel Room
  "1520250497591-112f2f40a3f4", // Resort
];

const getImage = (index: number) => {
  return `https://images.unsplash.com/photo-${VALID_PHOTO_IDS[index % VALID_PHOTO_IDS.length]}?auto=format&fit=crop&q=80&w=1000`;
};

export const MOCK_BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Sabor a Maguey Roma",
    description: "Despierta tus sentidos con nuestra auténtica degustación de mezcales artesanales en el corazón de la colonia Roma. Sumérgete en un viaje culinario donde cada platillo cuenta una historia de tradición y pasión, acompañado de mariachi en vivo y un ambiente inolvidable.",
    rating: 4.8,
    base_price: 1200,
    discount_price: 1080,
    image_url: getImage(0),
    category: "Restaurante"
  },
  {
    id: "2",
    name: "Vuelo en Globo Teotihuacán",
    description: "Una experiencia mágica al amanecer. Sobrevuela las legendarias pirámides de Teotihuacán mientras el sol despliega sus primeros rayos. Finaliza la aventura con un exquisito desayuno tradicional y un brindis especial para celebrar el inicio de un nuevo día lleno de energía.",
    rating: 4.9,
    base_price: 2500,
    discount_price: 2250,
    image_url: getImage(9),
    category: "Tour"
  },
  {
    id: "3",
    name: "Coyoacán Hidden Gems",
    description: "Descubre los secretos mejor guardados del encanto bohemio de Coyoacán. Este recorrido a pie te llevará por callejones empedrados, casonas coloridas, leyendas urbanas y las cafeterías más pintorescas donde artistas e intelectuales han dejado su huella a través de las décadas.",
    rating: 4.7,
    base_price: 600,
    discount_price: 540,
    image_url: getImage(12),
    category: "Tour"
  },
  {
    id: "4",
    name: "Gran Hotel Ciudad de México",
    description: "Hospédate en un ícono de la arquitectura Art Nouveau. Disfruta de vistas espectaculares al Zócalo y la Catedral Metropolitana desde nuestras lujosas suites. Una experiencia majestuosa que combina historia, confort de clase mundial y gastronomía de autor incomparable.",
    rating: 4.9,
    base_price: 3500,
    discount_price: 3150,
    image_url: getImage(4),
    category: "Hotel"
  },
  {
    id: "5",
    name: "Cantina La Peninsular",
    description: "Siéntete como un verdadero capitalino en una de las cantinas más antiguas de la ciudad. Botanas ilimitadas, una extensa barra de bebidas, música tradicional a todo volumen y mesas listas para que disfrutes de un viernes espectacular con tus mejores amigos.",
    rating: 4.6,
    base_price: 800,
    discount_price: 720,
    image_url: getImage(7),
    category: "Restaurante"
  },
  {
    id: "6",
    name: "Trajineras VIP Xochimilco",
    description: "No es solo un paseo, es la fiesta perfecta sobre el agua. Trajinera privada con sistema de sonido, guía bilingüe, comida típica a bordo y degustación de pulques curados mientras recorremos los canales prehispánicos más hermosos y llenos de color.",
    rating: 4.8,
    base_price: 1500,
    discount_price: 1350,
    image_url: getImage(8),
    category: "Tour"
  },
  {
    id: "7",
    name: "Tacos al Pastor El Califa",
    description: "El auténtico sabor chilango te espera. Trompos de carne marinada girando al rojo vivo, piña asada, salsas molcajeteadas que despiertan el alma y el mejor ambiente nocturno para matar el hambre después de una larga noche recorriendo las vibrantes calles de CDMX.",
    rating: 4.5,
    base_price: 300,
    discount_price: 270,
    image_url: getImage(1),
    category: "Restaurante"
  },
  {
    id: "8",
    name: "Boutique Condesa Inn",
    description: "Tu refugio urbano rodeado del verde vibrante de la colonia Condesa. Con interiores de diseño vanguardista, bicicletas de cortesía, un asombroso rooftop con coctelería y acceso inmediato a la vida nocturna más cosmopolita y sofisticada de toda la ciudad de México.",
    rating: 4.7,
    base_price: 2100,
    discount_price: 1890,
    image_url: getImage(6),
    category: "Hotel"
  },
  {
    id: "9",
    name: "Museo Frida Kahlo Access",
    description: "Evita las filas y sumérgete sin demoras en el universo azul íntimo de la artista más icónica de México. Explora sus jardines perfumados, su estudio de pintura repleto de historia y descubre la inigualable colección privada que inspiró su vasta obra de arte revolucionaria.",
    rating: 4.8,
    base_price: 450,
    discount_price: 405,
    image_url: getImage(5),
    category: "Evento"
  },
  {
    id: "10",
    name: "Cena a Ciegas Polanco",
    description: "Desafía tus propios sentidos en esta exclusiva experiencia gastronómica inmersiva. Servida en total oscuridad, nuestro chef de renombre internacional te guiará a través de siete tiempos diseñados para potenciar el sabor, el olfato y la textura de la selecta cocina mexicana moderna.",
    rating: 4.9,
    base_price: 2200,
    discount_price: 1980,
    image_url: getImage(11),
    category: "Restaurante"
  },
  {
    id: "11",
    name: "Lucha Libre VIP Arena",
    description: "Siente toda la adrenalina y la emoción de la verdadera cultura mexicana desde las primeras filas. Máscaras espectaculares, gritos ensordecedores y acrobacias increíbles en la emblemática Arena México, todo acompañado de dos refrescantes cervezas locales de cortesía.",
    rating: 4.8,
    base_price: 850,
    discount_price: 765,
    image_url: getImage(12),
    category: "Evento"
  },
  {
    id: "12",
    name: "Hotel Reforma Centro",
    description: "Elegancia corporativa con un giro cultural. Ubicado justo frente al icónico Ángel de la Independencia, ofrecemos el mejor centro de negocios y una espectacular piscina con fondo de cristal que domina el asombroso e imponente horizonte financiero del Paseo de la Reforma.",
    rating: 4.5,
    base_price: 2800,
    discount_price: 2520,
    image_url: getImage(3),
    category: "Hotel"
  },
  {
    id: "13",
    name: "Mercado de San Juan Tour",
    description: "Cuidado: solo para paladares extremadamente aventureros. Recorre con un experto local los exóticos pasillos donde hallarás insectos comestibles, embutidos europeos, quesos importados finos y carnes únicas como el león, cocodrilo o jabalí para una degustación inolvidable.",
    rating: 4.6,
    base_price: 550,
    discount_price: 495,
    image_url: getImage(2),
    category: "Tour"
  },
  {
    id: "14",
    name: "Cafetería El Pendulo Roma",
    description: "Disfruta un exquisito cappuccino artesanal en un paraíso arquitectónico cubierto por libros y plantas trepadoras exuberantes. El lugar perfecto y totalmente instagrameable para leer, relajarte en paz o trabajar un par de horas inspirado por la vibrante atmósfera bohemia.",
    rating: 4.9,
    base_price: 200,
    discount_price: 180,
    image_url: getImage(7),
    category: "Restaurante"
  },
  {
    id: "15",
    name: "Hostal Zócalo View",
    description: "La alternativa vibrante y social para nómadas digitales y mochileros internacionales. Ofrecemos wifi ultra veloz, terrazas compartidas con una increíble vista directa al majestuoso Palacio Nacional y eventos diarios de intercambio cultural y de idiomas para conectar con el mundo.",
    rating: 4.4,
    base_price: 450,
    discount_price: 405,
    image_url: getImage(13),
    category: "Hotel"
  },
  {
    id: "16",
    name: "Bosque de Chapultepec Secreto",
    description: "Más allá de los impresionantes museos famosos, te llevaremos en bicicleta por los majestuosos senderos poco transitados del pulmón de la ciudad: fuentes recónditas, el enigmático Audiorama y el sereno jardín botánico, terminando con un relajado y exclusivo picnic gourmet de altura.",
    rating: 4.7,
    base_price: 800,
    discount_price: 720,
    image_url: getImage(8),
    category: "Tour"
  },
  {
    id: "17",
    name: "Panadería Rosetta Mágica",
    description: "Siente el cálido y delicioso aroma inconfundible del aclamado rol de guayaba y mascarpone que hace paralizar el tránsito en la colonia Roma. Adquiere tu paquete degustación especial preferente y ahórrate tres horas de fila interminable en este ícono culinario de la ciudad.",
    rating: 5.0,
    base_price: 350,
    discount_price: 315,
    image_url: getImage(10),
    category: "Restaurante"
  },
  {
    id: "18",
    name: "Concierto Orquesta Bellas Artes",
    description: "Garantiza con nosotros tus codiciadas entradas para las elegantes y emotivas funciones especiales nocturnas en la asombrosa sala principal del majestuoso e imponente Palacio de Bellas Artes. Incluye acceso exclusivo previo a la exhibición y un coctel de honor sofisticado.",
    rating: 4.9,
    base_price: 1800,
    discount_price: 1620,
    image_url: getImage(5),
    category: "Evento"
  },
  {
    id: "19",
    name: "Mixología Subterránea Juárez",
    description: "El password ultra secreto te dará acceso a un sofisticado bar clandestino 'Speakeasy' oculto valientemente tras un viejo puesto de tortas. Vive la mejor mixología de clase mundial con infusiones botánicas, humo de mezquite y bitters locales excepcionales.",
    rating: 4.8,
    base_price: 900,
    discount_price: 810,
    image_url: getImage(7),
    category: "Restaurante"
  },
  {
    id: "20",
    name: "Cabañas Ajusco Retreat",
    description: "Escapa de la intensa contaminación y el ensordecedor ruido urbano sin salir verdaderamente de CDMX. Hermosas cabañas aromáticas tipo alpino inmersas en densos bosques de pino con lujosas chimeneas privadas, paseos montacaballo y un espectacular clima helado para disfrutar con vino y queso.",
    rating: 4.5,
    base_price: 1600,
    discount_price: 1440,
    image_url: getImage(14),
    category: "Hotel"
  }
];
