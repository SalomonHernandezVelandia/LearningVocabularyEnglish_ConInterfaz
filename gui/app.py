import customtkinter as ctk
from gui.screens import StartScreen
import messages


class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.geometry("1000x750")
        self.title("Aprendizaje Español → Inglés")

        self.current_screen = None
        self.show_start()

    def show_start(self):
        if self.current_screen:
            self.current_screen.destroy()
        self.current_screen = StartScreen(self)
        self.current_screen.pack(fill="both", expand=True)
