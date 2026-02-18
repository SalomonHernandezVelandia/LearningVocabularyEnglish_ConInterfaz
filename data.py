levels = [
    ("Escoger cantidad", "custom"),
    ("A1 (500–1000 palabras)", "A1"),
    ("A2 (1000–2000 palabras)", "A2"),
    ("B1 (2000–3500 palabras)", "B1"),
    ("B2 (4000–6000 palabras)", "B2"),
    ("C1 (6000–8000 palabras)", "C1"),
    ("C2 (+10000 palabras)", "C2"),
]

categories = [
    "Aleatorio",
    "Family",
    "Relations",
    "Work Environment",
    "Characteristics of People",
    "Emotions",
    "Personality Traits",
    "Parts of the Body",
    "Clothes and Shoes",
    "Parts of the House",
    "Household Items",
    "Questions",
    "Pronouns and Possessives",
    "Determiners and Pronouns",
    "List of Irregular Verbs",
]

levels_map = {"A1": range(500, 1000, 20), "A2": range(1000, 2000, 20), "B1": range(2000, 3500, 20), "B2": range(4000, 6000, 20), "C1": range(6000, 8000, 20), "C2": range(10000, 15000, 20),}




learning_english = {'Family':                   {'Grandfather':'Abuelo', 'Grandmother':'Abuela', 'Father':'Padre', 'Mother':'Madre', 'Dad':'Papa', 'Mom':'Mama', 'Uncle':'Tio', 'Aunt':'Tia', 'Brother':'Hermano', 'Sister':'Hermana', 'Son':'Hijo', 'Daughter':'Hija', 'Grandchildren':'Nieto', 'Grandson':'Nieto', 'Granddaughter':'Nieta', 'Children':'Hijo', 'Father In Law':'Suegro', 'Mother In Law':'Suegra', 'Stepfather':'Padrastro', 'Stepmother':'Madrastra', 'Husband':'Esposo', 'Wife':'Esposa', 'Nephew':'Sobrino', 'Niece':'Sobrina', 'Half Brother':'Medio Hermano', 'Half Sister':'Media Hermana', 'Stepson':'Hijastro', 'Stepdaughter':'Hijastra', 'Cousin':'Primo', 'Son In Law':'Yerno', 'Daughter In Law':'Nuera'},
                    'Relations':                {'Couple':'Pareja', 'Partner':'Pareja', 'Boyfriend':'Novio', 'Girlfriend':'Novia', 'Friend':'Amigo', 'Best Friend':'Mejor Amigo', 'Close Friends':'Amigos Cercanos', 'Classmate':'Compañero De Clases', 'Coworker':'Compañero De Trabajo', 'Colleage':'Colega', 'Fiance':'Prometido', 'Fiancee':'Prometida', 'Ex Boyfriend':'Exnovio', 'Ex Girlfriend':'Exnovia', 'Acquaintance':'Conocido', 'Stranger':'Desconocido', 'Roommate':'Compañero De Cuarto'},
                    'Work Environment':         {'Boss':'Jefe', 'CEO':'Director Ejecutivo', 'Director':'Director', 'Manager':'Gerente', 'Supervisor':'Supervisor', 'Team Leader':'Lider De Equipo', 'Employer':'Empleador', 'Employee':'Empleado', 'Intern':'Pasante', 'Coworker':'Compañero De Trabajo', 'Business Partner':'Socio', 'Client':'Cliente', 'Customer':'Consumidor', 'Subordinate':'Subordinado'},
                    'Characteristics of People':{'Baby':'Bebe', 'Child':'Niño', 'Teenager':'Adolecente', 'Young':'Joven', 'Adult':'Adulto', 'Elderly':'Anciano', 'Old':'Viejo', 'Short':'Bajo', 'Slim':'Delgado', 'Overweight':'Sobrepeso', 'Tall':'Alto', 'Strong':'Fuerte', 'Weak':'Debil'},
                    'Emotions':                 {'Happy':'Feliz', 'Cheerful':'Alegre', 'Joyful':'Jubiloso', 'Happiness':'Alegria', 'Glad':'Contento', 'Interested':'Interesado', 'Proud':'Orgulloso', 'Powerful':'Poderoso', 'Optimistic':'Optimista', 'Pride':'Orgullo', 'Gratitude':'Gratitud', 'Hope':'Esperanza', 'Empathy':'Empatia', 'Curiosity':'Curiosidad', 'Sympathy':'Simpatia', 'Nostalgia':'Nostalgia', 'Relief':'Alivio', 'Serenity':'Serenidad', 'Euphoria':'Euforia', 'Admiration':'Admiracion', 'Affection':'Afecto', 'Attraction':'Atraccion', 'Love':'Amor', 'Heartbreak':'Desamor', 'In Love':'Enamorado', 'Excited':'Emocionado', 'Trust':'Confianza', 'Distrust':'Desconfianza', 'Fear':'Miedo', 'Fearful':'Miedoso', 'Scared':'Asustado', 'Alarmed':'Alarmado', 'Frightened':'Aterrado', 'Spooked':'Espantado', 'Nervous':'Nervioso', 'Worry':'Preocupacion', 'Anxiety':'Ansiedad', 'Anxious':'Ansioso', 'Insecure':'Inseguro', 'Anger':'Ira', 'Angry':'Enojado', 'Rage':'Furia', 'Furious':'Furioso', 'Annoyed':'Irritado', 'Mad':'Enfadado', 'Aggressive':'Agresivo', 'Hate':'Odio' },
                    'Personality Traits':       {'Kind': 'Amable', 'Friendly': 'Amigable',  'Empathetic':'Empatico', 'Amusing':'Divertido', 'Sympathetic':'Simpatico', 'Funny':'Divertido', 'Sincere':'Sincero', 'Honest':'Honesto', 'Gentle':'Amable', 'Coherent':'Coherente', 'Responsible':'Responsable', 'Hardworking':'Trabajador', 'Polite':'Educado', 'Respectful':'Respetuoso', 'Generous':'Generoso', 'Fair':'Justo', 'Patient':'Paciente', 'Impaciente':'Impaciente', 'Calm':'Tranquilo', 'Cautious':'Prudente', 'Optimistic':'Optimista', 'Pessimistic':'Pesimista', 'Loyal':'Leal', 'Disloyal':'Desleal', 'Creative':'Creativo', 'Intelligent':'Inteligente', 'Brave':'Valiente', 'Perseverant':'Perseverante', 'Charming':'Encantador', 'Passionate':'Apasionado', 'Clever':'Liato', 'Cunning':'Astuto', 'Confident':'Confiado', 'Suspicious':'Desconfiado', 'Hearty':'Coordial', 'Helpful':'Servicial', 'Humble':'Humilde', 'Modest':'Modesto', 'Saucy':'Atrevido', 'Sneering':'Burlon', 'Witty':'Ingenioso' },
                    'Parts of the Body':        {'Head': 'Cabeza', 'Eye': 'Ojo', 'Nose':'Nariz', 'Tooth':'Diente', 'Neck':'Cuello', 'Arm':'Brazo', 'Finger':'Dedo', 'Knee':'Rodilla', 'Back':'Espalda', 'Face':'Cara', 'Ear':'Oreja', 'Mouth':'Boca', 'Tongue':'Lengua', 'Shoulder':'Hombro', 'Hand':'Mano', 'Leg':'Pierna', 'Foot':'Pie', 'Stomach':'Estomago', 'Forehead':'Frente', 'Chin':'Menton', 'Wrist':'Muñeca', 'Chest':'Pecho', 'Hip':'Cadera', 'Heel':'Talon', 'Skin':'Piel', 'Bone':'Hueso', 'Lung':'Pulmon', 'Blood':'Sangre' },
                    'Clothes and Shoes':        {'Clothes': 'Ropa', 'Underwear': 'Ropa Interior', 'Shirt':'Camisa', 'T-Shirt':'Camiseta', 'Pants':'Pantalones', 'Jeans':'Jean', 'Dress':'Vestido', 'Skirt':'Falda', 'Sweater':'Sueter', 'Jacket':'Chaqueta', 'Coat':'Abrigo', 'Socks':'Medias', 'Blouse':'Blusa', 'Vest':'Chaleco', 'Tie':'Corbata', 'Hat':'Sombrero', 'Belt':'Cinturon', 'Pajama':'Pijama', 'Hoodie':'Sudadera', 'Suit':'Traje', 'Scarf':'Bufanda', 'Cap':'Gorra', 'Gloves':'Guantes', 'Swimsuit':'Traje De Baño', 'Shoes':'Zapatos', 'Sandals':'Sandalias', 'Dess Shoes':'Zapatos Formales', 'Slippers':'Pantuflas', 'Sneakers':'Tenis', 'Boots':'Botas', 'High Heels':'Tacones'  },
                    'Parts of the House':       {'House': 'Casa', 'Home': 'Hogar'},
                    'Household Items':          {'Bed': 'Cama', 'Table': 'Mesa'},
                    'Questions':                {'What?': 'Que?', 'Who?': 'Quien?', 'When?':'Cuando?', 'Where?':'Donde?', 'Which?':'Cual?', 'Why?':'Por Que?', 'Whose?':'De Quien?', 'How?':'Como?'},
                    'Pronouns and Possessives': [{'Subject Pronouns': 'Pronombres Sujeto',        'I':'Yo',    'You':'Tu',  'He':'El',  'She':'Ella',   'It':'Eso', 'We':'Nosotros', 'You_2':'Ustedes', 'They':'Ellos'},
                                                 {'Object Pronouns': 'Pronombres Objeto',        'Me':'Me',    'You':'Te',  'Him':'Le', 'Her':'La',     'It_2':'Lo','Us':'Nos',      'You_2':'Vos',     'Them':'Los'  }, 
                                                 {'Possessive Adjectives': 'Adjetivos Posesivos','My':'Mi',    'Your':'Tu', 'His':'Su', 'Her':'Su',     'Its':'Su', 'Our':'Nuestro', 'Your_2':'Vuestro','Their':'Sus' },
                                                 {'Possessives Pronouns': 'Pronombres Posesivos','Mine':'Mio', 'Yours':'Tuyo',  'His':'Suyo',   'Hers':'Suya',      'Ours':'Nuestros', 'Theirs':'Suyos'},
                                                 {'Reflexive Pronouns': 'Pronombres Reflexivos', 'Myself':'Yo Mismo'} ],
                    'Determiners and Pronouns': [{'Demonstrative Determiners':'Determinantes Demostrativos',   'This':'Esto',   'That':'Eso',   'These':'Estos',    'Those':'Esos'},
                                                 {'Distributive Determinants':'Determinantes Distributivos',   'All':'Todo',    'Both':'Ambos', 'Each':'Cada (Uno)','Every':'Cada (Varios)',  'Half':'Mitad',   'Either':'Cualquiera',  'Neither':'Ninguno'},
                                                 {'Cuantifying Determinants':'Determinantes Cuantificadores',  'Much':'Mucho',  'Many':'Muchos','Few':'Pocos',      'Little':'Poco',    'Enough':'Suficiente',  'Plenty':'Abundante',   'Some':'Algunos',   'Most':'Mayoria'},
                                                 {'Determinants of Difference':'Determinantes Diferencia',     'Another':'Distinto',   'Other':'Otro'},
                                                 {'Numerical Determinants': {'Cardinals':{'One':1, 'Two':2, 'Three':3, 'Four':4, 'Five':5, 'Six':6, 'Seven':7, 'Eight':8, 'Nine':9, 'Ten':10, 'Eleven':11, 'Twelve':12, 'Thirteen':13, 'Fourteen':14, 'Fiveteen':15, 'Sixteen':16, 'Seventeen':17, 'Eighteen':18, 'Nineteen':19, 'Twenty':20, 'Twenty-One':21, 'Twenty-Two':22, 'Twenty-Three':23, 'Twenty-Four':24, 'Twenty-Five':25, 'Twenty-Six':26, 'Twenty-Seven':27, 'Twenty-Eight':28, 'Twenty-Nine':29, 'Thirty':30 },
                                                                             'Ordinals': {'First':'Primero', 'Second':'Segundo', 'Third':'Tercero', 'Fourth':'Cuarto', 'Fifth':'Quinto', 'Sixth':'Sexto', 'Seventh':'Septimo', 'Eighth':'Octavo', 'Ninth':'Noveno', 'Tenth':'Decimo', 'Eleventh':'Onceavo'} 
                                                                             }
                                                }],
                    'List of Irregular Verbs':  [{'Arise': 'Surgir', 'Arose': 'Surgio', 'Arisen':'Surgido'}, 
                                                 {'Awake':'Despertar', 'Awoke': 'Desperto', 'Awoken': 'Despertado'},
                                                 {'Be':'Ser / Estar', 'Was / Were': 'Era / Estaba', 'Been':'Sido / Estado'},
                                                 {'Bear':'Soportar', 'Bore':'Soporto', 'Borne':'Soportado'},
                                                 {'Beat (I)':'Golpear (Varios)', 'Beat (PS)':'Golpeo', 'Beaten':'Golpeado'},
                                                 {'Become (I)':'Convertir', 'Became':'Convirtio', 'Become (PP)':'Convertido'},
                                                 {'Befall':'Acontecer', 'Befell':'Acontecio', 'Befallen':'Acontecido'},
                                                 {'Begin':'Comenzar', 'Began':'Comenzo', 'Begun':'Comenzado'},
                                                 {'Bend':'Doblar', 'Bent (PS)':'Doblo', 'Bent (PP)':'Doblado'},
                                                 {'Beset (I)':'Acosar', 'Beset (PS)':'Acoso', 'Beset (PP)':'Acosado'}
                                                ]

                    }