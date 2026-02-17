import customtkinter as ctk
import messages
from . import widgets
from . import functionalities

import random
from data import learning_english



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

        levels = [
            ("Escoger cantidad", "custom"),
            ("A1 (500–1000 palabras)", "A1"),
            ("A2 (1000–2000 palabras)", "A2"),
            ("B1 (2000–3500 palabras)", "B1"),
            ("B2 (4000–6000 palabras)", "B2"),
            ("C1 (6000–8000 palabras)", "C1"),
            ("C2 (+10000 palabras)", "C2"),
        ]
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
        
        widgets.message_start(self, messages.msg6)
        self.right_panel.update_idletasks()
        width = self.right_panel.winfo_width()
        functionalities.resize_text(self,type("Event", (), {"width": width}))

        # ===== BOTONES DE CATEGORÍA =====
        self.categories_frame = ctk.CTkFrame(self.right_panel, fg_color="transparent")
        self.categories_frame.pack(padx=120, fill="x")

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
        for category in categories:
            ctk.CTkButton(
                self.categories_frame,
                text=category,
                font=ctk.CTkFont(size=14),
                command=lambda c=category: self.select_category_mode(c)
            ).pack(fill="x", pady=4)

    def select_category_mode(self, category):
        self.category_mode = category
        self.category_info_label.configure(
            text=f"Categoría seleccionada: {category}"
        )

        # transición automática después de 1 segundo
        if hasattr(self, "transition_job") and self.transition_job:
            self.after_cancel(self.transition_job)

        self.transition_job = self.after(1000, self.start_game_screen)


    def start_game_screen(self):
        from . import functionalities

        functionalities.clear_right_panel(self)

        # ===== EXTRAER PALABRAS SEGÚN CATEGORÍA =====
        if self.category_mode == "Aleatorio":
            words = {}
            for cat in learning_english:
                if isinstance(learning_english[cat], dict):
                    words.update(learning_english[cat])
        else:
            words = learning_english.get(self.category_mode, {})

        if not words:
            return

        self.current_words = words
        self.current_word_en, self.current_word_es = random.choice(list(words.items()))

        # ===== MOSTRAR PALABRA SEGÚN IDIOMA =====
        if self.language_mode == "en":
            word_to_show = self.current_word_en
            self.expected_answer = self.current_word_es
        elif self.language_mode == "es":
            word_to_show = self.current_word_es
            self.expected_answer = self.current_word_en
        else:
            # modo aleatorio
            if random.choice([True, False]):
                word_to_show = self.current_word_en
                self.expected_answer = self.current_word_es
            else:
                word_to_show = self.current_word_es
                self.expected_answer = self.current_word_en

        # ===== UI =====
        self.word_label = ctk.CTkLabel(
            self.right_panel,
            text=word_to_show,
            font=ctk.CTkFont(size=40, weight="bold")
        )
        self.word_label.pack(pady=40)

        self.answer_entry = ctk.CTkEntry(
            self.right_panel,
            placeholder_text="Escribe la traducción"
        )
        self.answer_entry.pack(pady=20)

        self.confirm_btn = ctk.CTkButton(
            self.right_panel,
            text="Confirmar",
            command=self.check_answer
        )
        self.confirm_btn.pack(pady=10)

    def check_answer(self):
        user_answer = self.answer_entry.get().strip().title()

        if user_answer == self.expected_answer:
            result_text = "✅ Correcto"
        else:
            result_text = f"❌ Incorrecto\nRespuesta correcta: {self.expected_answer}"

        self.result_label = ctk.CTkLabel(
            self.right_panel,
            text=result_text,
            font=ctk.CTkFont(size=18)
        )
        self.result_label.pack(pady=20)

        # siguiente palabra después de 1 segundo
        self.after(1000, self.start_game_screen)




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
