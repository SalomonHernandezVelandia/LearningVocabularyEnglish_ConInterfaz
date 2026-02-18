import customtkinter as ctk
import messages
from . import widgets


# ========================================================================================================================
def select_language_mode(self, mode):
    self.language_mode = mode
    update_language_label(self)
    # Pasar a la siguiente pantalla después de 1 segundo
    if self.transition_job:
        self.after_cancel(self.transition_job)
    self.transition_job = self.after(1000, self.build_right_panel_level)


def update_language_label(self):
    names = {
        "random": "Aleatorio",
        "en": "Inglés",
        "es": "Español"
    }
    self.language_info_label.configure(
        text=f"Idioma seleccionado: {names[self.language_mode]}"
    )



# ========================================================================================================================
def select_level_mode(self, level):
    self.level_mode = level
    update_level_label(self)
    hide_custom_amount_input(self)

    if level == "custom":
        show_custom_amount_input(self)
    else:
        # cancelar transición previa si existe
        if hasattr(self, "transition_job") and self.transition_job:
            self.after_cancel(self.transition_job)
        self.transition_job = self.after(1000, self.build_right_panel_category)


def update_level_label(self):
    self.level_info_label.configure(
        text=f"Nivel o cantidad de palabras seleccionadas: {self.level_mode}"
    )


def hide_custom_amount_input(self):
    if hasattr(self, "custom_entry") and self.custom_entry.winfo_exists():
        self.custom_entry.destroy()
        self.custom_confirm_btn.destroy()


def show_custom_amount_input(self):
        if hasattr(self, "custom_entry") and self.custom_entry.winfo_exists(): # evita duplicados
            return

        self.custom_entry = ctk.CTkEntry(
            self.right_panel,
            placeholder_text="Digite el número de palabras"
        )
        self.custom_entry.pack(pady=10)

        self.custom_confirm_btn = ctk.CTkButton(
            self.right_panel,
            text="Confirmar",
            command=lambda: confirm_custom_amount(self)
        )
        self.custom_confirm_btn.pack(pady=(0, 20))


def confirm_custom_amount(self):
        value = self.custom_entry.get()
        if not value.isdigit():
            self.level_info_label.configure(
                text="Nivel o cantidad de palabras seleccionadas: valor inválido"
            )
            return
        amount = int(value)

        if amount < 10 or amount > 50000:
            self.level_info_label.configure(
                text="Nivel o cantidad de palabras seleccionadas: fuera de rango"
            )
            return
        self.custom_amount = amount
        self.level_info_label.configure(
            text=f"Nivel o cantidad de palabras seleccionadas: {amount} palabras"
        )
        self.after(1000, self.build_right_panel_category)         # transición automática después de 1 segundo




# ========================================================================================================================
def select_category_mode(self, category):
    self.category_mode = category
    self.category_info_label.configure(
        text=f"Categoría seleccionada: {category}"
    )

    if category == "List of Irregular Verbs":
        self.after(1000, self.build_irregular_options_screen)
    else:
        if hasattr(self, "transition_job") and self.transition_job:
            self.after_cancel(self.transition_job)
        self.transition_job = self.after(1000, self.start_game_screen)




# Controladores para mostrar e ingresar la traduccion de palabras ============
# ========================================================================================================================
def build_normal_question(self, word_to_show):
    widgets.titulo(self, messages.titulo)

    widgets.message_start(self, messages.msg5)

    self.horizontal_frame = ctk.CTkFrame(self.right_panel)
    self.horizontal_frame.pack(pady=60)

    self.word_label = ctk.CTkLabel(
        self.horizontal_frame,
        text=word_to_show,
        font=ctk.CTkFont(size=40, weight="bold")
    )
    self.word_label.pack(side="left", padx=20)

    self.answer_entry = ctk.CTkEntry(
        self.horizontal_frame,
        width=200
    )
    self.answer_entry.pack(side="left", padx=20)
    self.answer_entry.focus()
    self.answer_entry.bind("<Return>", lambda event: check_answer(self))

    ctk.CTkButton(
        self.horizontal_frame,
        text="Confirmar",
        command=lambda: check_answer(self)
    ).pack(side="left", padx=10)


def check_answer(self):
    user_answer = self.answer_entry.get().strip().title()

    if user_answer == self.expected_answer:
        self.correct_count += 1
        result_text = "✅ Correcto"
        self.horizontal_frame.configure(fg_color="#2ECC71")  
        delay = 1000 
    else:
        self.incorrect_count += 1
        result_text = f"❌ Incorrecto (Correcta: {self.expected_answer})"
        self.horizontal_frame.configure(fg_color="#E74C3C")  
        delay = 1500 

    self.result_label = ctk.CTkLabel(
        self.right_panel,
        text=result_text,
        font=ctk.CTkFont(size=18)
    )
    self.result_label.pack(pady=10)

    self.after(delay, self.start_game_screen)


def check_grouped_answers(self):
    correct_answers = 0

    for row, entry, expected in self.expected_answers:
        user_answer = entry.get().strip().title()
        if user_answer == expected:
            correct_answers += 1
            row.configure(fg_color="#2ECC71")  # Verde
        else:
            row.configure(fg_color="#E74C3C")  # Rojo
        entry.configure(state="disabled")

    # ===== Sistema de puntaje parcial =====
    if correct_answers == 1:
        points = 0.2
    elif correct_answers == 2:
        points = 0.5
    elif correct_answers == 3:
        points = 1
    else:
        points = 0

    self.score_points += points

    # ===== Estadísticas =====
    if correct_answers == 3:
        self.correct_count += 1
    else:
        self.incorrect_count += 1

    delay = 1000 if correct_answers == 3 else 1500

    self.after(delay, self.start_game_screen)




# Para ajustar tamaño del texto
def resize_text(self, event):
    if not hasattr(self, "info_label"):
        return
    if not self.info_label.winfo_exists():
        return
    
    new_wrap = event.width - 80
    if new_wrap > 200:
        self.info_label.configure(wraplength=new_wrap)


# Para limpiar el contenido del panel derecho
def clear_right_panel(self):
    for widget in self.right_panel.winfo_children():
        widget.destroy()