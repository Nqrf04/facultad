alumnos=[]

operacion = input("Ingresa el numero de la operacion a ejecutar:\n1 - Añadir un alumno a lista\n2 - Ver la lista de alumnos\n3 - Salir.\n")

while operacion != "3":
    if operacion == "1":
        nombre = input("Ingrese el nombre del alumno: ")
        cursos = int(input("Ingrese la cantidad de cursos: "))
        alumnos.append((nombre, cursos))
        print("¡El alumno fue añadido a la lista!")
        
    elif operacion == "2":
        if not alumnos:
            print("No hay alumnos")
        else:
            print("Lista de alumnos:")   
            for alumno in alumnos:
                print(f"{alumno[0]} - {alumno[1]} cursos") 
    else:
        print("Opcion no valida")
        
    operacion = input("Ingresa el numero de la operacion a ejecutar:\n1 - Añadir un alumno a lista\n2 - Ver la lista de alumno\n3 - Salir.\n")
print("Gracias por usar el programa!")