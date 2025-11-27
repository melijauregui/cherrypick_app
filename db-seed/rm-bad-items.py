import json
import sys
from pathlib import Path


def read_no_add_items(no_add_path: str, tag: str) -> list[str]:
    """
    Lee el archivo no-add.txt y extrae los items bajo la etiqueta especificada.
    
    Args:
        no_add_path: Ruta al archivo no-add.txt
        tag: Etiqueta a buscar (ej: "pantalones")
    
    Returns:
        Lista de nombres de items a eliminar
    """
    no_add_file = Path(no_add_path)
    if not no_add_file.exists():
        raise FileNotFoundError(f"El archivo {no_add_path} no existe")
    
    items_to_remove = []
    current_tag = None
    reading_items = False
    
    with open(no_add_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Si la línea termina con ":", es una etiqueta
            if line.endswith(":"):
                current_tag = line[:-1].strip().lower()
                reading_items = current_tag == tag.lower()
            elif reading_items:
                # Si estamos leyendo items de la etiqueta correcta, agregar el nombre
                items_to_remove.append(line)
    
    return items_to_remove


def remove_items_from_json(json_path: str, items_to_remove: list[str]) -> tuple[list, int]:
    """
    Elimina items del JSON cuyo nombre contenga alguno de los nombres en items_to_remove.
    
    Args:
        json_path: Ruta al archivo JSON
        items_to_remove: Lista de nombres (o partes de nombres) a buscar
    
    Returns:
        Tupla con (items_filtrados, cantidad_eliminados)
    """
    json_file = Path(json_path)
    if not json_file.exists():
        raise FileNotFoundError(f"El archivo {json_path} no existe")
    
    with open(json_file, "r", encoding="utf-8") as f:
        items = json.load(f)
    
    if not isinstance(items, list):
        raise ValueError("El JSON debe ser un array de items")
    
    original_count = len(items)
    filtered_items = []
    removed_items = []
    
    for item in items:
        if "name" not in item:
            # Si no tiene nombre, mantenerlo
            filtered_items.append(item)
            continue
        
        item_name = item["name"]
        should_remove = False
        
        # Verificar si el nombre del item contiene alguno de los nombres a eliminar
        for remove_name in items_to_remove:
            if remove_name.lower() in item_name.lower():
                should_remove = True
                removed_items.append(item_name)
                break
        
        if not should_remove:
            filtered_items.append(item)
    
    removed_count = original_count - len(filtered_items)
    
    return filtered_items, removed_count, removed_items


def main():
    no_add_path = "scrapping/charo/no-add.txt"
    tag = "pantalones"
    json_path = "scrapping/charo/charo-pantalones-sample.json"
    
    try:
        # Leer items a eliminar del archivo no-add.txt
        print(f"Leyendo items a eliminar desde {no_add_path} (etiqueta: {tag})...")
        items_to_remove = read_no_add_items(no_add_path, tag)
        
        if not items_to_remove:
            print(f"⚠️  No se encontraron items bajo la etiqueta '{tag}' en {no_add_path}")
            sys.exit(0)
        
        print(f"✅ Encontrados {len(items_to_remove)} items a eliminar:")
        for item in items_to_remove[:10]:  # Mostrar primeros 10
            print(f"  - {item}")
        if len(items_to_remove) > 10:
            print(f"  ... y {len(items_to_remove) - 10} más")
        
        # Eliminar items del JSON
        print(f"\nProcesando {json_path}...")
        filtered_items, removed_count, removed_items = remove_items_from_json(json_path, items_to_remove)
        
        if removed_count == 0:
            print("✅ No se encontraron items para eliminar")
            sys.exit(0)
        
        print(f"\n❌ Eliminados {removed_count} items:")
        for item_name in removed_items[:10]:  # Mostrar primeros 10
            print(f"  - {item_name}")
        if len(removed_items) > 10:
            print(f"  ... y {len(removed_items) - 10} más")
        
        # Guardar JSON actualizado
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(filtered_items, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ JSON actualizado guardado en {json_path}")
        print(f"   Items restantes: {len(filtered_items)}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

