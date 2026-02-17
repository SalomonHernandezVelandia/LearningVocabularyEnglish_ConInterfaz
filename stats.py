def score_assignment(lst1, lst2, intento, pun, cor, err):
    if lst1 == lst2:
        if intento == 0:
            pun+=1
            cor+=1
        elif intento == 1:
            pun+=0.5
            cor+=0
        elif intento == 2:
            pun+=0
            cor+=0
        return True, pun, cor, err
    else:
        err+=1
        print(f"\nAlguna quedo incorrecta, REPITE¡¡¡......")    
        return False, pun, cor, err
    


def results(pun, cor, err, sd2, d, sd):
    print(f"Puntaje obtenido: {pun}")
    print(f"Número de aciertos: {cor}")
    print(f"Numero de errores: {err}")
    print(f"\nTu puntuación final es de: {(cor/sd2)*100}% para el nivel {d[sd]}")