import customtkinter as ctk
import random
from data import dict_select_lang, dict_select_diff, dict_select_diff_text
import messages

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")


class App(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Aprendizaje Español → Inglés")
        self.geometry("600x400")
        self.resizable(False, False)

        # ===== VARIABLES =====
        self.language_var = ctk.IntVar(value=1)
        self.difficulty_var = ctk.IntVar(value=1)

        # ===== TÍTULO =====
        self.title_label = ctk.CTkLabel(
            self,
            text=messages.titulo,
            font=ctk.CTkFont(size=22, weight="bold")
        )
        self.title_label.pack(pady=20)

        # ===== IDIOMA =====
        self.lang_label = ctk.CTkLabel(self, text="Selecciona el idioma:")
        self.lang_label.pack()

        self.lang_menu = ctk.CTkOptionMenu(
            self,
            values=[f"{k} - {v}" for k, v in dict_select_lang.items()],
            command=self.set_language
        )
        self.lang_menu.pack(pady=10)

        # ===== DIFICULTAD =====
        self.diff_label = ctk.CTkLabel(self, text="Selecciona la dificultad:")
        self.diff_label.pack()

        self.diff_menu = ctk.CTkOptionMenu(
            self,
            values=[f"{k} - {v}" for k, v in dict_select_diff_text.items()],
            command=self.set_difficulty
        )
        self.diff_menu.pack(pady=10)

        # ===== BOTÓN =====
        self.start_button = ctk.CTkButton(
            self,
            text="Continuar",
            command=self.start_program
        )
        self.start_button.pack(pady=30)

        # ===== INFO =====
        self.info_label = ctk.CTkLabel(self, text="")
        self.info_label.pack()

    def set_language(self, value):
        self.language_var.set(int(value.split(" - ")[0]))

    def set_difficulty(self, value):
        self.difficulty_var.set(int(value.split(" - ")[0]))

    def start_program(self):
        select_language = self.language_var.get()
        select_difficulty = self.difficulty_var.get()

        if select_difficulty == 0:
            select_difficulty2 = random.randint(5, 20)
        else:
            select_difficulty2 = random.choice(dict_select_diff[select_difficulty])

        self.info_label.configure(
            text=(
                f"Idioma: {dict_select_lang[select_language]}\n"
                f"Dificultad: {dict_select_diff_text[select_difficulty]}\n"
                f"Cantidad de palabras: {select_difficulty2}"
            )
        )

        # Aquí luego llamas a tu lógica real:
        # start_game(select_language, select_difficulty, select_difficulty2)


if __name__ == "__main__":
    app = App()
    app.mainloop()
