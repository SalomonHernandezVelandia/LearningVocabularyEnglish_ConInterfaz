import customtkinter as ctk
import messages
from . import widgets
from . import functionalities

import random
from data import learning_english, levels, categories, levels_map



class StartScreen(ctk.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.pack(fill="both", expand=True)
        self.transition_job = None

        # ================= CONTENEDOR PRINCIPAL =================
        self.container = ctk.CTkFrame(self)
        self.container.pack(fill="both", expand=True, padx=10, pady=10)

        # ================= PANEL IZQUIERDO =================
        self.left_panel = ctk.CTkFrame(self.container, width=200)
        self.left_panel.pack(side="left", fill="y", padx=(0, 10))
        self.left_panel.pack_propagate(False)  # Mantiene ancho fijo

        # ================= PANEL DERECHO =================
        self.right_panel = ctk.CTkFrame(self.container)
        self.right_panel.pack(side="right", fill="both", expand=True)

        self.right_panel.bind(
            "<Configure>",
            lambda event: functionalities.resize_text(self, event)
        )

        self.build_left_panel()
        self.build_right_panel_lan()

    # ==========================================================
    # PANEL IZQUIERDO
    # ==========================================================
    def build_left_panel(self):
        ctk.CTkLabel(
            self.left_panel,
            text="Opciones",
            font=ctk.CTkFont(size=16, weight="bold")
        ).pack(pady=(20, 30))

        self.language_info_label = ctk.CTkLabel(self.left_panel, text="Idioma seleccionado: —", wraplength=180, justify="left")
        self.language_info_label.pack(pady=(20, 0))
        self.btn_language = ctk.CTkButton(
            self.left_panel,
            text="Idioma",
            width=180,
            command=self.select_language
        )
        self.btn_language.pack(pady=0)

        self.level_info_label = ctk.CTkLabel(self.left_panel, text="Nivel o cantidad de palabras seleccionadas: —", wraplength=180, justify="left")
        self.level_info_label.pack(pady=(20, 0))
        self.btn_level = ctk.CTkButton(
            self.left_panel,
            text="Nivel",
            width=180,
            command=self.select_level
        )
        self.btn_level.pack(pady=0)

        self.category_info_label = ctk.CTkLabel(self.left_panel, text="Categoría seleccionada: —", wraplength=180, justify="left")
        self.category_info_label.pack(pady=(20, 0))
        self.btn_category = ctk.CTkButton(
            self.left_panel,
            text="Categoría",
            width=180,
            command=self.select_category
        )
        self.btn_category.pack(pady=0)


    # ==========================================================
    # PANEL DERECHO
    # ==========================================================
    def build_right_panel_lan(self):
        widgets.titulo(self, messages.titulo)
        widgets.message_start(self, messages.msg1)

        # ================= BOTONES DE IDIOMA (ABAJO) =================
        self.language_mode = "random"  # estado actual

        self.bottom_frame = ctk.CTkFrame(self.right_panel, fg_color="transparent")
        self.bottom_frame.pack(pady=(20, 0), fill="x")

        self.btn_random = ctk.CTkButton(
            self.bottom_frame,
            text="Aleatorio",
            font=ctk.CTkFont(size=15),
            command=lambda: functionalities.select_language_mode(self, "random")
        )
        self.btn_random.pack(side="left", expand=True)

        self.btn_en = ctk.CTkButton(
            self.bottom_frame,
            text="Inglés",
            font=ctk.CTkFont(size=15),
            command=lambda: functionalities.select_language_mode(self, "en")
        )
        self.btn_en.pack(side="left", expand=True)

        self.btn_es = ctk.CTkButton(
            self.bottom_frame,
            text="Español",
            font=ctk.CTkFont(size=15),
            command=lambda: functionalities.select_language_mode(self, "es")
        )
        self.btn_es.pack(side="left", expand=True)



    def build_right_panel_level(self):
        functionalities.clear_right_panel(self)

        widgets.titulo(self, messages.titulo)

        widgets.message_start(self, messages.msg2)
        self.right_panel.update_idletasks()                 # Fuerza layout
        width = self.right_panel.winfo_width()              # Ajusta wrap
        functionalities.resize_text(self,type("Event", (), {"width": width}))

        # ===== CONTENEDOR BOTONES =====
        self.level_mode = "custom"  # estado actual

        self.buttons_frame = ctk.CTkFrame(self.right_panel, fg_color="transparent")
        self.buttons_frame.pack(padx=200, fill="x")

        for text, value in levels:
            ctk.CTkButton(
                self.buttons_frame,
                text=text,
                font=ctk.CTkFont(size=15),
                command=lambda v=value: functionalities.select_level_mode(self, v)
            ).pack(fill="x", pady=6)



    def build_right_panel_category(self):
        functionalities.clear_right_panel(self)

        widgets.titulo(self, messages.titulo)
        
        widgets.message_start(self, messages.msg3)
        self.right_panel.update_idletasks()
        width = self.right_panel.winfo_width()
        functionalities.resize_text(self,type("Event", (), {"width": width}))

        # ===== BOTONES DE CATEGORÍA =====
        self.categories_frame = ctk.CTkFrame(self.right_panel, fg_color="transparent")
        self.categories_frame.pack(padx=120, fill="x")

        for category in categories:
            ctk.CTkButton(
                self.categories_frame,
                text=category,
                font=ctk.CTkFont(size=14),
                command=lambda c=category: functionalities.select_category_mode(self, c)
            ).pack(fill="x", pady=4)


    def build_irregular_options_screen(self):
        functionalities.clear_right_panel(self)

        widgets.titulo(self, messages.titulo)
        
        widgets.message_start(self, messages.msg4)
        self.right_panel.update_idletasks()                 # Fuerza layout
        width = self.right_panel.winfo_width()              # Ajusta wrap
        functionalities.resize_text(self,type("Event", (), {"width": width}))

        widgets.buttons_irregulars(self, "Verbos Irregulares aleatorios", "random")
        widgets.buttons_irregulars(self, "Verbo en sus diferentes tiempos verbales", "grouped")

    def select_irregular_mode(self, mode):
        self.irregular_mode = mode
        self.after(1000, self.start_game_screen)



    def start_game_screen(self):
        functionalities.clear_right_panel(self)

        # ===== INICIALIZAR CONTADORES SI ES PRIMERA VEZ =====
        if not hasattr(self, "total_rounds"):
            if self.level_mode == "custom":
                self.total_rounds = self.custom_amount
            else:
                level_range = levels_map.get(self.level_mode, range(10, 20))
                self.total_rounds = random.choice(level_range)

            self.current_round = 0
            self.correct_count = 0
            self.incorrect_count = 0
            self.score_points = 0

            # ===== EXTRAER PALABRAS =====
            if self.category_mode == "List of Irregular Verbs":
                if self.irregular_mode == "random":
                    words = {}
                    for verb in learning_english["List of Irregular Verbs"]:
                        words.update(verb)
                    self.words_pool = list(words.items())
                else:  # modo grouped
                    self.words_pool = learning_english["List of Irregular Verbs"]
            else:
                if self.category_mode == "Aleatorio":
                    words = {}
                    for cat in learning_english:
                        if isinstance(learning_english[cat], dict):
                            words.update(learning_english[cat])
                else:
                    words = learning_english.get(self.category_mode, {})

                self.words_pool = list(words.items())

        # ===== TERMINAR JUEGO =====
        if self.current_round >= self.total_rounds:
            self.show_final_results()
            return
        self.current_round += 1

        if self.category_mode == "List of Irregular Verbs" and self.irregular_mode == "random":
            self.current_word_en, self.current_word_es = random.choice(self.words_pool)
            if self.language_mode == "en":
                word_to_show = self.current_word_en
                self.expected_answer = self.current_word_es
            elif self.language_mode == "es":
                word_to_show = self.current_word_es
                self.expected_answer = self.current_word_en
            else:
                if random.choice([True, False]):
                    word_to_show = self.current_word_en
                    self.expected_answer = self.current_word_es
                else:
                    word_to_show = self.current_word_es
                    self.expected_answer = self.current_word_en
            functionalities.build_normal_question(self, word_to_show)

            # ===== CONTADOR INFERIOR =====
            widgets.statistics_section(self)

        elif self.category_mode == "List of Irregular Verbs" and self.irregular_mode == "grouped":
            widgets.titulo(self, messages.titulo)
            widgets.message_start(self, messages.msg6)
        
            verb_dict = random.choice(self.words_pool)
            self.expected_answers = []

            self.group_frame = ctk.CTkFrame(self.right_panel)
            self.group_frame.pack(pady=60)

            for key, value in verb_dict.items():
                if self.language_mode == "en":
                    show_word = key
                    expected = value
                elif self.language_mode == "es":
                    show_word = value
                    expected = key
                else:
                    if random.choice([True, False]):
                        show_word = key
                        expected = value
                    else:
                        show_word = value
                        expected = key
                row = ctk.CTkFrame(self.group_frame)
                row.pack(pady=5)

                ctk.CTkLabel(
                    row,
                    text=show_word,
                    width=150
                ).pack(side="left", padx=10)
                entry = ctk.CTkEntry(row, width=200)
                entry.pack(side="left", padx=10)
                entry.bind("<Return>", lambda e: functionalities.check_grouped_answers(self))
                self.expected_answers.append((row, entry, expected))

            # Botón confirmar
            ctk.CTkButton(
                self.right_panel,
                text="Confirmar",
                command=lambda: functionalities.check_grouped_answers(self)
            ).pack(pady=15)

            # ===== CONTADOR INFERIOR =====
            widgets.statistics_section(self)
        else:
            # ===== MODO NORMAL (todas las demás categorías) =====
            self.current_word_en, self.current_word_es = random.choice(self.words_pool)

            if self.language_mode == "en":
                word_to_show = self.current_word_en
                self.expected_answer = self.current_word_es
            elif self.language_mode == "es":
                word_to_show = self.current_word_es
                self.expected_answer = self.current_word_en
            else:
                if random.choice([True, False]):
                    word_to_show = self.current_word_en
                    self.expected_answer = self.current_word_es
                else:
                    word_to_show = self.current_word_es
                    self.expected_answer = self.current_word_en
            functionalities.build_normal_question(self, word_to_show)

            # ===== CONTADOR INFERIOR =====
            widgets.statistics_section(self)




    def show_final_results(self):
        from . import functionalities
        functionalities.clear_right_panel(self)

        if self.category_mode == "List of Irregular Verbs" and self.irregular_mode == "grouped":
            score_percentage = (self.score_points / self.total_rounds) * 100
        else:
            score_percentage = (self.correct_count / self.total_rounds) * 100

        ctk.CTkLabel(
            self.right_panel,
            text="RESULTADOS FINALES",
            font=ctk.CTkFont(size=30, weight="bold")
        ).pack(pady=40)

        ctk.CTkLabel(
            self.right_panel,
            text=f"Total palabras: {self.total_rounds}",
            font=ctk.CTkFont(size=18)
        ).pack(pady=5)

        ctk.CTkLabel(
            self.right_panel,
            text=f"Correctas: {self.correct_count}",
            font=ctk.CTkFont(size=18)
        ).pack(pady=5)

        ctk.CTkLabel(
            self.right_panel,
            text=f"Incorrectas: {self.incorrect_count}",
            font=ctk.CTkFont(size=18)
        ).pack(pady=5)

        ctk.CTkLabel(
            self.right_panel,
            text=f"Puntaje: {score_percentage:.2f}%",
            font=ctk.CTkFont(size=22, weight="bold")
        ).pack(pady=20)

        # Reiniciar botón
        ctk.CTkButton(
            self.right_panel,
            text="Volver al inicio",
            command=self.reset_game
        ).pack(pady=20)

    def reset_game(self):
        # borrar variables del juego
        for attr in ["total_rounds", "current_round",
                    "correct_count", "incorrect_count",
                    "words_pool"]:
            if hasattr(self, attr):
                delattr(self, attr)

        self.build_right_panel_lan()







    # ==========================================================
    # CALLBACKS (por ahora solo prints)
    # ==========================================================
    def select_language(self):
        print("Seleccionar idioma")

    def select_level(self):
        print("Seleccionar nivel")

    def select_category(self):
        print("Seleccionar categoría")

    def send_data(self):
        value = self.entry.get()
        print("Valor ingresado:", value)
