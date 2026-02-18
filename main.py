import random
from data import learning_english, dict_select_lang, dict_select_diff, dict_select_diff_text, dict_select_ctg
import messages
from utils import limpiar_consola
from categories import choosen_category, extract_deep_categories
from language import according_language
from stats import results

import os
import customtkinter as ctk

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
THEME_PATH = os.path.join(BASE_DIR, "themes", "yellow.json")

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme(THEME_PATH)

from gui.app import App  # Importar despues de las apariencias o no se aplicara

if __name__ == "__main__":
    app = App()
    app.mainloop()