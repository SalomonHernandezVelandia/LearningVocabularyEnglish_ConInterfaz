import customtkinter as ctk


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