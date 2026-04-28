// lib/blogData.js

// 1. Aquí definimos tus 4 posts.
// He añadido 'content' (el artículo completo) y 'category'.
const allPosts = [
  { 
    id: 1, 
    slug: 'superfoods',
    category: 'Bienestar',
    title: 'Los 5 Superfoods', 
    summary: 'Descubre los 5 superfoods esenciales que debes conocer. Desde la quinua hasta la chía...', 
    image: '/img/blog/blog1.webp', // (Usando .webp como actualizamos)
    content: `
      <p>Los "superfoods" o "superalimentos" no son una moda pasajera; son alimentos que poseen una densidad nutricional excepcionalmente alta. Esto significa que con pequeñas cantidades, obtienes una gran carga de vitaminas, minerales, antioxidantes y fitonutrientes que tu cuerpo necesita para prosperar.</p>
      
      <p>En Allin Runa, creemos en el poder de estos regalos de la naturaleza. Aquí te presentamos 5 esenciales que provienen directamente de nuestros productores en Perú.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Quinua Orgánica</h2>
      <p>Originaria de los Andes, la quinua es conocida como el "grano de oro". Es uno de los pocos alimentos vegetales que se considera una <strong>proteína completa</strong>, ya que contiene los nueve aminoácidos esenciales. Es increíblemente versátil y una base fantástica para cualquier comida.</p>
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li><strong>Alto en Proteína:</strong> Ideal para la reparación muscular y la saciedad.</li>
        <li><strong>Rico en Fibra:</strong> Promueve una digestión saludable y ayuda a controlar el azúcar en sangre.</li>
        <li><strong>Sin Gluten:</strong> Una opción perfecta para celíacos o sensibles al gluten.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Chía</h2>
      <p>Estas diminutas semillas son una potencia nutricional. Eran usadas por los guerreros aztecas para obtener energía y resistencia. Su habilidad para absorber líquido y crear un gel las hace únicas.</p>
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li><strong>Omega-3:</strong> Cargadas de ácidos grasos saludables para el cerebro.</li>
        <li><strong>Fibra Saciedad:</strong> Te mantienen lleno por más tiempo, ayudando a controlar el apetito.</li>
        <li><strong>Antioxidantes:</strong> Combaten el daño de los radicales libres en tu cuerpo.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Cacao Puro</h2>
      <p>¡No lo confundas con el chocolate procesado! El cacao puro (en polvo o nibs) es uno de los antioxidantes más potentes del planeta. Es también una fuente increíble de magnesio, crucial para la función muscular y nerviosa.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Camu Camu</h2>
      <p>Proveniente de la selva amazónica, el Camu Camu es el rey indiscutible de la <strong>Vitamina C</strong>. Contiene hasta 60 veces más vitamina C que una naranja, lo que lo convierte en un aliado formidable para tu sistema inmunológico.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Maca</h2>
      <p>El ginseng peruano. Esta raíz andina es un famoso adaptógeno, lo que significa que ayuda a tu cuerpo a <strong>adaptarse al estrés</strong>, ya sea físico, mental o ambiental. Es fantástica para el equilibrio hormonal y la energía sostenida.</p>

      <blockquote class="border-l-4 border-green-600 pl-4 italic text-gray-700 my-6">
        "Incorporar estos 5 alimentos a tu dieta no es cambiarlo todo, es potenciar lo que ya haces. Un pequeño paso para tu rutina, un gran salto para tu salud."
      </blockquote>
    `
  },
  { 
    id: 2, 
    slug: 'industriales',
    category: 'Salud',
    title: 'Evita Industriales', 
    summary: 'Te explicamos por qué evitar productos industriales y elegir orgánico es la mejor decisión.', 
    image: '/img/blog/blog2.webp',
    content: `
      <p>En el mundo moderno, la conveniencia manda. Los pasillos del supermercado están repletos de cajas coloridas, bolsas brillantes y productos que prometen "listo en 5 minutos". Estos son los alimentos industriales o ultra-procesados, y aunque nos ahorran tiempo, a menudo nos cuestan salud.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">¿Qué es un Producto Industrializado?</h2>
      <p>Es un producto que ha sido alterado significativamente de su estado natural. Piensa en él como algo hecho <em>en</em> una fábrica, no <em>desde</em> la tierra. Suelen incluir una larga lista de ingredientes, muchos de los cuales son irreconocibles.</p>
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li><strong>Aditivos Químicos:</strong> Conservantes, colorantes, saborizantes y texturizantes para que duren meses en el estante y tengan un sabor adictivo.</li>
        <li><strong>Azúcares Ocultos:</strong> Jarabe de maíz de alta fructosa y otros azúcares añadidos se esconden en salsas, panes y yogures.</li>
        <li><strong>Grasas de Mala Calidad:</strong> Grasas trans y aceites vegetales refinados (como el de soya o maíz) que promueven la inflamación.</li>
        <li><strong>Sodio Excesivo:</strong> Usado como conservante y para potenciar el sabor, contribuyendo a la hipertensión.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Elige Orgánico: Más que una Tendencia</h2>
      <p>Optar por productos orgánicos y no procesados, como los que encuentras en Allin Runa, no es un lujo, es una inversión en tu bienestar. "Orgánico" significa que se cultiva sin pesticidas sintéticos, herbicidas ni fertilizantes químicos.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Beneficios de Comer Real:</h3>
      <p><strong>1. Mayor Densidad Nutricional:</strong> Los alimentos cultivados en suelos sanos y sin químicos suelen tener niveles más altos de vitaminas y minerales.</p>
      <p><strong>2. Sin Carga Tóxica:</strong> Proteges a tu cuerpo, especialmente a tu hígado, de tener que procesar un cóctel de químicos artificiales.</p>
      <p><strong>3. Sabor Auténtico:</strong> Un tomate orgánico cultivado localmente simplemente sabe mejor. La naturaleza no necesita saborizantes.</p>

      <blockquote class="border-l-4 border-green-600 pl-4 italic text-gray-700 my-6">
        "La regla de oro es simple: si vino de una planta, cómelo. Si se hizo en una planta, evítalo."
      </blockquote>
      <p>Tu cuerpo reconocerá la comida real. Te sentirás con más energía, menos inflamación y una claridad mental que los productos industriales simplemente no pueden ofrecer.</p>
    ` 
  },
  { 
    id: 3, 
    slug: 'cuidado-personal',
    category: 'Bienestar',
    title: 'Cuidado Sin Tóxicos', 
    summary: 'Una guía completa de Cuidado Personal Sin Tóxicos. Revisa tus productos diarios...', 
    image: '/img/blog/blog3.webp', 
    content: `
      <p>Pensamos mucho en lo que <em>comemos</em>, pero ¿qué pasa con lo que nos <em>ponemos</em>? Tu piel es tu órgano más grande y es altamente absorbente. Todo lo que aplicas en ella (lociones, jabones, champús, desodorantes) puede pasar a tu torrente sanguíneo en cuestión de minutos.</p>
      <p>Muchos productos comerciales de "cuidado personal" están cargados de químicos disruptores que, si bien pueden dar una sensación de limpieza o un olor agradable al instante, pueden causar estragos a largo plazo.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Los 'Villanos' Ocultos en tu Baño</h2>
      <p>Revisa tus etiquetas y ten cuidado con estos ingredientes comunes:</p>
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li><strong>Parabenos (Propilparabeno, Metilparabeno):</strong> Usados como conservantes, son conocidos disruptores endocrinos que pueden imitar al estrógeno en el cuerpo.</li>
        <li><strong>Sulfatos (SLS/SLES):</strong> Son los que crean esa espuma abundante en tu champú o jabón. Son detergentes muy fuertes que pueden irritar la piel, el cuero cabelludo y eliminar los aceites naturales protectores.</li>
        <li><strong>Ftalatos:</strong> A menudo ocultos bajo la palabra "fragancia" o "parfum". Se usan para hacer que los olores duren más y se han relacionado con problemas hormonales.</li>
        <li><strong>Aluminio:</strong> El ingrediente activo en la mayoría de los antitranspirantes. Bloquea los poros para evitar que sudes (un proceso natural y necesario) y se está estudiando su relación con diversas enfermedades.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Construyendo tu Rutina Natural</h2>
      <p>La buena noticia es que las alternativas naturales son simples, efectivas y lujosas.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Limpieza Natural</h3>
      <p>Busca jabones artesanales (en barra) hechos con el método de saponificación en frío. Ingredientes como el <strong>aceite de oliva, aceite de coco, manteca de karité y arcillas naturales</strong> limpian profundamente sin despojar a tu piel de su barrera protectora.</p>

      <h3 class="text-xl font-bold mt-6 mb-3">Hidratación Pura</h3>
      <p>Tu piel no necesita complicadas emulsiones químicas. Los aceites vegetales puros son biocompatibles y altamente efectivos. Un <strong>aceite de jojoba</strong> (que imita el sebo natural de la piel), <strong>aceite de almendras dulces</strong> o <strong>aceite de coco orgánico</strong> pueden reemplazar múltiples productos.</p>
      
      <blockquote class="border-l-4 border-green-600 pl-4 italic text-gray-700 my-6">
        "El mejor cuidado personal es aquel que nutre, no el que enmascara. Si no puedes comerlo, probablemente no deberías ponértelo en la piel."
      </blockquote>
    `
  },
  { 
    id: 4, 
    slug: 'maca',
    category: 'Superfoods',
    title: 'El Poder de la Maca', 
    summary: 'Todo sobre los beneficios de la maca orgánica. Este superalimento andino es conocido por balancear hormonas.', 
    image: '/img/blog/blog5.webp',
    content: `
      <p>En las mesetas más altas y frías de los Andes peruanos, a más de 4000 metros sobre el nivel del mar, crece una de las plantas más resistentes y poderosas del planeta: la Maca. Este humilde tubérculo ha sido un pilar en la nutrición y medicina andina durante miles de años, reverenciado por su capacidad para otorgar energía y vitalidad.</p>
      <p>Hoy, el mundo la conoce como el "Ginseng Peruano", y es uno de los superalimentos más estudiados por sus increíbles propiedades.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">¿Qué es un Adaptógeno?</h2>
      <p>La Maca es, ante todo, un <strong>adaptógeno</strong>. Esta es una clase especial de planta que ayuda a tu cuerpo a <em>adaptarse</em> y resistir el estrés, ya sea físico, químico o biológico. A diferencia de un estimulante como la cafeína, que te da un "subidón" y luego un "bajón", la maca trabaja <em>con</em> tu cuerpo para regular y balancear tus sistemas internos, especialmente el sistema endocrino (hormonal).</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Beneficios Clave de la Maca Orgánica</h2>
      <p>Gracias a su perfil único de alcaloides y nutrientes, la maca ofrece un amplio rango de beneficios:</p>
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li><strong>Equilibrio Hormonal:</strong> Es quizás su uso más famoso. Ayuda a regular la producción hormonal tanto en hombres como en mujeres, aliviando síntomas del síndrome premenstrual, menopausia y promoviendo la fertilidad.</li>
        <li><strong>Energía Sostenida y Resistencia:</strong> Aumenta la energía y el vigor sin sobreestimular las glándulas suprarrenales. Es el suplemento perfecto para atletas o para combatir la fatiga crónica.</li>
        <li><strong>Mejora del Estado de Ánimo y la Libido:</strong> Al balancear las hormonas y nutrir el sistema nervioso, se ha demostrado que la maca reduce la ansiedad y la depresión, y es un conocido potenciador natural de la libido.</li>
        <li><strong>Función Cognitiva:</strong> Mejora la claridad mental, el aprendizaje y la memoria.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Cómo Incorporar la Maca en tu Día</h2>
      <p>La maca en polvo tiene un sabor terroso y algo dulce, como a malta, que combina bien con muchas cosas. La clave es la consistencia.</p>
      
      <blockquote class="border-l-4 border-green-600 pl-4 italic text-gray-700 my-6">
        <strong>Un consejo:</strong> Comienza con una cucharadita pequeña (3-5g) al día y observa cómo se siente tu cuerpo.
      </blockquote>

      <p>Prueba añadirla en:</p>
      <ul class="list-disc list-outside pl-5 space-y-2">
        <li>Tu smoothie o batido matutino.</li>
        <li>Mezclada en tu café, chocolate caliente o "maca latte".</li>
        <li>Espolvoreada sobre tu avena o yogurt.</li>
        <li>Incorporada en recetas de repostería saludable como galletas o barritas energéticas.</li>
      </ul>
      <p class="mt-4">Visita nuestra tienda para encontrar la mejor <strong>Maca Orgánica</strong>, traída directamente desde las alturas de Junín por nuestros productores asociados.</p>
    ` 
  },
];

// 2. Funciones para obtener los datos
export function getBlogPosts() {
  return allPosts;
}

export function getPostData(slug) {
  return allPosts.find((post) => post.slug === slug);
}

// 3. Función para tus "Posts Relacionados"
export function getRelatedPosts(currentSlug) {
  // Simplemente devuelve los otros 3 posts
  return allPosts.filter((post) => post.slug !== currentSlug);
}