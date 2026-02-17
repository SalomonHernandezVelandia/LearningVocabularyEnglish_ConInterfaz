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




# print(f"\n{messages.titulo.center(200, '=')} \n{messages.msg1}")
# # select_language = int(input(messages.msg2))
# # limpiar_consola()


# #=======================================================================================================================================================================
# print(f"{messages.titulo.center(200, '=')}")
# print(f"=====>Se escogio recibir las palabras en idioma {dict_select_lang[select_language]} \n{messages.msg3}")
# select_difficulty = int(input(messages.msg4))
# if select_difficulty == 0:
#     select_difficulty2 = int(input(messages.msg5))
# else:
#     select_difficulty2 = random.choice(dict_select_diff[select_difficulty])
# limpiar_consola()


# #=======================================================================================================================================================================
# print(f"{messages.titulo.center(200, '=')}")
# print(f"=====>Se escogio recibir las palabras en idioma {dict_select_lang[select_language]} ")
# print(f"=====>Se escogio recibir una cantidad de {select_difficulty2} palabras, correspondientes a un nivel {dict_select_diff_text[select_difficulty]} \n")
# select_category = choosen_category(learning_english, dict_select_ctg)
# extract_dict, extract_irregulars, select_irregulars, tam_dict = extract_deep_categories(learning_english, dict_select_ctg, select_category) 
# digit_value = input(f"\n\n{messages.msg7}")
# limpiar_consola()


# #=======================================================================================================================================================================
# puntaje = 0;    correctas = 0;      errada = 0;     ciclos = 0;     p = "  Puntaje: ";    e = "  Errores: "
# infinitive = "";    past_simple = "";   past_participle = ""

# while digit_value != "Q" and infinitive != "Q" and past_simple != "Q" and past_participle != "Q" and ciclos < select_difficulty2:
#     print(f"{messages.titulo.center(200, '=')}")
#     print(f"=====>Se escogio recibir las palabras en idioma {dict_select_lang[select_language]} ")
#     print(f"=====>Se escogio recibir una cantidad de {select_difficulty2} palabras, correspondientes a un nivel {dict_select_diff_text[select_difficulty]} ")
#     if dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 0:
#         print(f"=====>Las palabras apareceran de la categoria {dict_select_ctg[select_category]} con todos los verbos irregulares")
#     elif dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 1:
#         print(f"=====>Las palabras apareceran de la categoria {dict_select_ctg[select_category]} con cada tiempo verbal")
#     else:
#         print(f"=====>Las palabras apareceran de la categoria {dict_select_ctg[select_category]} ")
#     print(f"----->Total de palabras disponibles para la categoria escogida es de {tam_dict} palabras\n")
#     print(f"{messages.msg11}\n")
#     print(f"{p.rjust(75, "=")} {(str(puntaje) + ' ').ljust(75, "=")}")
#     print(f"{e.rjust(75, "=")} {(str(errada) + ' ').ljust(75, "=")}\n\n")

#     ok, puntaje, correctas, errada = according_language(select_language, select_category, select_irregulars, dict_select_ctg, extract_dict, extract_irregulars, puntaje, correctas, errada)
#     if ok: break
#     ciclos+=1
#     limpiar_consola()

# results(puntaje, correctas, errada, select_difficulty2, dict_select_diff_text, select_difficulty)