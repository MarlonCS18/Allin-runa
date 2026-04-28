// app/lib/ubigeoData.js
// Esta es una lista MÁS COMPLETA de ejemplo para simular el Ubigeo.
// Incluye departamentos representativos de la Costa, Sierra y Selva.

export const ubigeoData = [
  // --- COSTA ---
  {
    departamento: 'Lima',
    provincias: [
      {
        provincia: 'Lima',
        distritos: ['Lima Cercado', 'Miraflores', 'San Isidro', 'La Molina', 'San Borja', 'Surco', 'Ate', 'Barranco', 'Chorrillos', 'Los Olivos', 'San Miguel']
      },
      {
        provincia: 'Huaral',
        distritos: ['Huaral', 'Chancay', 'Aucallama']
      },
      {
        provincia: 'Cañete',
        distritos: ['San Vicente de Cañete', 'Asia', 'Mala', 'Punta Hermosa']
      },
      {
        provincia: 'Barranca',
        distritos: ['Barranca', 'Paramonga', 'Pativilca']
      }
    ]
  },
  {
    departamento: 'Piura',
    provincias: [
      {
        provincia: 'Piura',
        distritos: ['Piura', 'Castilla', 'Veintiseis de Octubre', 'Catacaos']
      },
      {
        provincia: 'Sullana',
        distritos: ['Sullana', 'Bellavista', 'Marcavelica']
      },
      {
        provincia: 'Talara',
        distritos: ['Pariñas (Talara)', 'Máncora', 'Lobitos']
      }
    ]
  },
  {
    departamento: 'La Libertad',
    provincias: [
      {
        provincia: 'Trujillo',
        distritos: ['Trujillo', 'Huanchaco', 'Moche', 'Laredo', 'Víctor Larco Herrera']
      },
      {
        provincia: 'Pacasmayo',
        distritos: ['San Pedro de Lloc', 'Pacasmayo', 'Jequetepeque']
      }
    ]
  },
  
  // --- SIERRA ---
  {
    departamento: 'Arequipa',
    provincias: [
      {
        provincia: 'Arequipa',
        distritos: ['Arequipa Cercado', 'Cayma', 'Yanahuara', 'Cerro Colorado', 'Sachaca']
      },
      {
        provincia: 'Camaná',
        distritos: ['Camaná', 'Ocoña']
      },
      {
        provincia: 'Caylloma',
        distritos: ['Chivay', 'Yanque']
      }
    ]
  },
  {
    departamento: 'Cusco',
    provincias: [
      {
        provincia: 'Cusco',
        distritos: ['Cusco', 'Wanchaq', 'San Sebastián', 'Santiago', 'San Jerónimo']
      },
      {
        provincia: 'Urubamba',
        distritos: ['Urubamba', 'Ollantaytambo', 'Machupicchu', 'Maras']
      },
      {
        provincia: 'La Convención',
        distritos: ['Santa Ana (Quillabamba)', 'Echarate']
      }
    ]
  },
  {
    departamento: 'Junín',
    provincias: [
      {
        provincia: 'Huancayo',
        distritos: ['Huancayo', 'El Tambo', 'Chilca']
      },
      {
        provincia: 'Tarma',
        distritos: ['Tarma', 'Acobamba', 'Palcamayo']
      },
      {
        provincia: 'Chanchamayo', // (Esto es Ceja de Selva/Selva Alta)
        distritos: ['Chanchamayo', 'Pichanaki', 'San Ramón']
      }
    ]
  },

  // --- SELVA ---
  {
    departamento: 'Loreto',
    provincias: [
      {
        provincia: 'Maynas',
        distritos: ['Iquitos', 'Punchana', 'Belén', 'San Juan Bautista']
      },
      {
        provincia: 'Alto Amazonas',
        distritos: ['Yurimaguas', 'Lagunas']
      }
    ]
  },
  {
    departamento: 'Ucayali',
    provincias: [
      {
        provincia: 'Coronel Portillo',
        distritos: ['Callería (Pucallpa)', 'Yarinacocha', 'Manantay']
      },
      {
        provincia: 'Padre Abad',
        distritos: ['Aguaytía', 'Curimaná']
      }
    ]
  },
  {
    departamento: 'San Martín',
    provincias: [
      {
        provincia: 'Moyobamba',
        distritos: ['Moyobamba', 'Calzada', 'Habana']
      },
      {
        provincia: 'San Martín',
        distritos: ['Tarapoto', 'La Banda de Shilcayo', 'Morales']
      }
    ]
  }
];