import random
from utils import limpiar_consola
from categories import irregular_visualization
from stats import score_assignment



def according_language(select_language, select_category, select_irregulars, dict_select_ctg, extract_dict, extract_irregulars, puntaje, correctas, errada):
    irregulars_items = []
    if select_language == 1:
        if dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 1:
            irregulars_random = random.choice(extract_irregulars)
            irregulars_items = list(irregulars_random.items())
        else:
            palabra = random.choice(list(extract_dict.keys()))

        for intento in range(4):
            if dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 1:
                ok, infinitive, past_simple, past_participle = irregular_visualization(irregulars_items, 0)
                if ok: return True, puntaje, correctas, errada
                ok2, puntaje, correctas, errada = score_assignment([infinitive, past_simple, past_participle], [irregulars_items[0][1], irregulars_items[1][1], irregulars_items[2][1]], intento, puntaje, correctas, errada)
                if ok2: break          
            else:
                digit_value = input(f"{palabra}:\t")
                digit_value = digit_value.title()
                if digit_value == "Q": return True, puntaje, correctas, errada
                ok2, puntaje, correctas, errada = score_assignment([extract_dict[palabra]], [digit_value], intento, puntaje, correctas, errada)
                if ok2: break 
        limpiar_consola()

    elif select_language == 2:
        if dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 1:
            irregulars_random = random.choice(extract_irregulars)
            irregulars_items = list(irregulars_random.items())
        else:
            palabra = random.choice(list(extract_dict.values()))

        for intento in range(4):
            if dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 1:
                ok, infinitive, past_simple, past_participle = irregular_visualization(irregulars_items, 1)
                if ok: return True, puntaje, correctas, errada
                ok2, puntaje, correctas, errada = score_assignment([infinitive, past_simple, past_participle], [irregulars_items[0][0], irregulars_items[1][0], irregulars_items[2][0]], intento, puntaje, correctas, errada)
                if ok2: break              
            else:
                k = [key for (key, value) in extract_dict.items() if value == palabra][0]
                digit_value = input(f"{palabra}:\t")
                digit_value = digit_value.title()
                if digit_value == "Q": return True, puntaje, correctas, errada
                ok2, puntaje, correctas, errada = score_assignment([k], [digit_value], intento, puntaje, correctas, errada)
                if ok2: break 
        limpiar_consola()

    else:
        if dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 1:
            irregulars_random = random.choice(extract_irregulars)
            irregulars_items = list(irregulars_random.items())
            position_irregulars = random.choice(list(range(0,2)))
            tradu_ir = 1 if position_irregulars == 0 else 0
        else:
            palabra_tup = random.choice(list(extract_dict.items()))
            palabra = random.choice(palabra_tup)

        for intento in range(4):
            if dict_select_ctg[select_category] == "List of Irregular Verbs" and select_irregulars == 1:
                ok, infinitive, past_simple, past_participle = irregular_visualization(irregulars_items, position_irregulars)
                if ok: return True, puntaje, correctas, errada
                ok2, puntaje, correctas, errada = score_assignment([infinitive, past_simple, past_participle], [irregulars_items[0][tradu_ir], irregulars_items[1][tradu_ir], irregulars_items[2][tradu_ir]], intento, puntaje, correctas, errada)
                if ok2: break           
            else:
                digit_value = input(f"{palabra}:\t")
                digit_value = digit_value.title()
                if digit_value == "Q": return True, puntaje, correctas, errada
                if palabra == palabra_tup[0]:
                    ok2, puntaje, correctas, errada = score_assignment([digit_value], [palabra_tup[1]], intento, puntaje, correctas, errada)
                    if ok2: break 
                else:
                    ok2, puntaje, correctas, errada = score_assignment([digit_value], [palabra_tup[0]], intento, puntaje, correctas, errada)
                    if ok2: break 
        limpiar_consola()
    return False, puntaje, correctas, errada