cantidad_nombres = int(input("Ingrese la cantidad de nombres: "))
lista_nombres = []

for i in range(cantidad_nombres):
    nombre = input("Ingrese un nombre:")
    lista_nombres.append(nombre)
    
print("La lista de nombres es:", lista_nombres)