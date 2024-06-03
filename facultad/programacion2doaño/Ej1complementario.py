rol = input("Ingrese su rol (admin/profesor): ")

if rol == "admin" or rol == "profesor":
    contraseña = input("Ingrese la contraseña: ")
    
    if contraseña == "1234":
        nombre = input("Ingrese su nombre: ")
        
        if nombre:
            print("Hola, " + nombre)
        else:
            print("No ha ingresado un nombre válido.")
    else:
        print("Contraseña incorrecta.")
else:
    print("Rol ingresado no válido.")
