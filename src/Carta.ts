import * as fs from 'fs';
import chalk from 'chalk';

//Clase de Cartas Magic
enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}


enum Rareza {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}


interface Carta {
  id: number;
  nombre: string;
  mana: number;
  color: Color;
  tipo: Tipo;
  rareza: Rareza;
  reglas: string;
  fuerza?: number;
  resistencia?: number;
  lealtad?: number;
  valor_mercado: number;
}


function checkUserDirectory(usuario: string): string {
  const userDirectory = `./cartas/${usuario}/`;
  if(!fs.existsSync(userDirectory)){
    fs.mkdirSync(userDirectory, {recursive: true});
  }
  return userDirectory;
}


class ColecciondeCartas {
  public coleccion: Carta[]; //Una colección de cartas para los usuarios

  constructor(){
    this.coleccion = [];
  }

  public agregarcarta(usuario: string , nuevaCarta: Carta): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + nuevaCarta.id + '.json';

    if(fs.existsSync(filePath)){
      console.log(chalk.red(`Error: ya existe una carta con ese ID en la colección de ${usuario}`))
      return;
    }

    fs.writeFileSync(filePath, JSON.stringify(nuevaCarta));
    console.log(`Carta agregada a la colección de ${usuario}`);
  }
}

const NuevaColeccion = new ColecciondeCartas;

const nuevaCarta: Carta = {
  id: 3,
  nombre: "Rubiales",
  mana: 30,
  color: "Incoloro" as Color,
  tipo: "Artefacto" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "Un pikito <3",
  valor_mercado: 10000
}

NuevaColeccion.agregarcarta("loren", nuevaCarta);
