import messages


def choosen_category(learning_english, dict_select_ctg):
    cont = 1
    print(f"{0}. {'Aleatorio'}")

    for l in learning_english:
        dict_select_ctg[cont] = l
        print(f'{cont}. {l}')
        cont+=1
    select_category = int(input(f"{messages.msg6}"))

    return select_category



def extract_deep_categories(learning_english, dict_select_ctg, select_category):
    extract_dict = {}
    tam_dict = 0
    extract_irregulars = []
    select_irregulars = 0

    tipo = 0 if dict_select_ctg[select_category] == "Aleatorio" else learning_english[dict_select_ctg[select_category]] 

    if dict_select_ctg[select_category] == "Aleatorio":
        for unpacking in learning_english:
            if isinstance(learning_english[unpacking], list):
                for unpacking_list_lv2 in learning_english[unpacking]:
                    for unpacking_list_lv3 in unpacking_list_lv2:
                        if isinstance(unpacking_list_lv2[unpacking_list_lv3], dict):
                            for unpacking_list_lv4 in unpacking_list_lv2[unpacking_list_lv3]:
                                extract_dict = extract_dict | unpacking_list_lv2[unpacking_list_lv3][unpacking_list_lv4]
                        else:
                            extract_dict = extract_dict | unpacking_list_lv2
                            tam_dict = len(extract_dict)
            else:
                extract_dict = extract_dict | learning_english[unpacking]
                tam_dict = len(extract_dict)

    elif dict_select_ctg[select_category] == "List of Irregular Verbs": 
        print(f"\n\n{messages.msg8} \n{messages.msg9} \n")
        select_irregulars = int(input(messages.msg10))
        if select_irregulars == 0:
            for irr in learning_english['List of Irregular Verbs']:
                extract_dict = extract_dict | irr
                tam_dict = len(extract_dict)
                # print(extract_dict)
        else:
            extract_irregulars = learning_english[dict_select_ctg[select_category]]
            tam_dict = len(extract_irregulars)

    else:
        # Nivel 2
        if isinstance(tipo, dict):
            extract_dict = learning_english[dict_select_ctg[select_category]]
            tam_dict = len(extract_dict)
        else:
            # Nivel3
            for des in learning_english[dict_select_ctg[select_category]]:
                type_search_deep = list(des.items())
                if isinstance(type_search_deep[0][1], dict):
                    # Nivel4
                    for des_lv3 in type_search_deep[0][1]:
                        extract_dict = extract_dict | type_search_deep[0][1][des_lv3]
                        tam_dict = len(extract_dict)
                else:
                    #Nivel3
                    extract_dict = extract_dict | des 
                    tam_dict = len(extract_dict)

    return extract_dict, extract_irregulars, select_irregulars, tam_dict



def irregular_visualization(irregulars_items, pos):
    inf = "INFINITIVE"; p_simple = "PAST SIMPLE";   p_participle = "PAST PARTICIPLE"
    infinitive = "";    past_simple = "";           past_participle = ""

    print(f"\n||{inf:^50}||{p_simple:^50}||{p_participle:^50}||")
    print(f"||{irregulars_items[0][pos]:<10}: {'':<38}||{irregulars_items[1][pos]:<10}: {'':<38}||{irregulars_items[2][pos]:<10}: {'':<38}||")
    infinitive = input('Ingrese la traduccion del infinitivo: '); 
    infinitive = infinitive.title()
    if infinitive == "Q": return True, infinitive, past_simple, past_participle  

    print(f"\n||{irregulars_items[0][pos]:<10}: {infinitive:<38}||{irregulars_items[1][pos]:<10}: {'':<38}||{irregulars_items[2][pos]:<10}: {'':<38}||")
    past_simple = input('Ingrese la traduccion del past simple: '); 
    past_simple = past_simple.title()
    if past_simple == "Q": return True, infinitive, past_simple, past_participle

    print(f"\n||{irregulars_items[0][pos]:<10}: {infinitive:<38}||{irregulars_items[1][pos]:<10}: {past_simple:<38}||{irregulars_items[2][pos]:<10}: {'':<38}||")
    past_participle = input('Ingrese la traduccion del past participle: '); 
    past_participle = past_participle.title()
    if past_participle == "Q": return True, infinitive, past_simple, past_participle

    print(f"\n||{irregulars_items[0][pos]:<10}: {infinitive:<38}||{irregulars_items[1][pos]:<10}: {past_simple:<38}||{irregulars_items[2][pos]:<10}:   {past_participle:<38}||")
    return False, infinitive, past_simple, past_participle