alumnos={}

operacion = input("Ingresa el numero de la operacion a ejecutar:\n1 - Añadir un alumno a lista\n2 - Ver la lista de alumnos\n3 - Ver la cantidad de cursos de un alumno \n4 - Salir.\n")

while operacion != "4":
    if operacion == "1":
        nombre = input("Ingrese el nombre del alumno: ")
        cursos = int(input("Ingrese la cantidad de cursos: "))
        alumnos[nombre] = cursos
        print("¡El alumno fue añadido a la lista!")
        
    elif operacion == "2":
        if not alumnos:
            print("No hay alumnos")
        else:
            print("Lista de alumnos:")   
            for nombre, cursos in alumnos:
                print(f"{nombre} - {cursos} cursos")

    elif operacion == "3":
        nombre = input("Ingrese el nombre de alumno para ver sus cursos:")
        if nombre in alumnos:
           print(f"{nombre} tiene {alumnos[nombre]} cursos.")
        else:
            print(f"No se encontró al alumno {nombre}.")
        
    else:
        print("Opcion no valida")
        
    operacion = input("Ingresa el numero de la operacion a ejecutar:\n1 - Añadir un alumno a lista\n2 - Ver la lista de alumno\n3 - Ver la cantidad de cursos de un alumno\n4 - Salir.\n")

print("Gracias por usar el programa!")