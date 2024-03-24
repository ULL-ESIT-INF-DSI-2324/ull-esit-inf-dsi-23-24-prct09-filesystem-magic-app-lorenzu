import * as fs from 'fs';
import chalk from 'chalk';

//Clase de Cartas Magic
export enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

export enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}


export enum Rareza {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}


export interface Carta {
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


export function checkUserDirectory(usuario: string): string {
  const userDirectory = `./cartas/${usuario}/`;
  if(!fs.existsSync(userDirectory)){
    //fs.mkdirSync(userDirectory, {recursive: true});
    console.log(chalk.red(`No existe el usuario ${usuario}`))
  }
  return userDirectory;
}

export function Mostrarporpantalla(data: string){
  const carta = JSON.parse(data);
  console.log('-------------------------------------------------------');
  console.log('Contenido de la carta:');
  console.log('ID:', carta.id);
  console.log('Nombre:', carta.nombre);
  console.log('Mana:', carta.mana);
  switch (carta.color){
    case "Blanco": 
    console.log('Color:', chalk.bgWhite(carta.color));
    break;
    case "Negro": 
    console.log('Color:', chalk.bgBlack(carta.color));
    break;
    case "Incoloro": 
    console.log('Color:', chalk.bgGray(carta.color));
    break;
    case "Rojo": 
    console.log('Color:', chalk.bgRed(carta.color));
    break;
    case "Verde": 
    console.log('Color:', chalk.bgGreen(carta.color));
    break;
    case "Azul": 
    console.log('Color:', chalk.bgBlue(carta.color));
    break;
    case "Multicolor": 
    console.log('Color:', chalk.bgYellow(carta.color));
    break;

  }
  console.log('Tipo:', carta.tipo);
  console.log('Rareza:', carta.rareza);
  console.log('Reglas:', carta.reglas);
  if(carta.tipo === "Criatura"){
  console.log('Fuerza:', carta.fuerza);
  console.log('Resistencia:', carta.resistencia);
  }
  if(carta.tipo === "Planeswalker") {
    console.log('Lealtad:', carta.lealtad);

  }
  console.log('Valor de mercado:', carta.valor_mercado);
  
}


export class ColecciondeCartas {
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
    console.log(chalk.green(`Carta agregada a la colección de ${usuario}`));
  }

  public eliminarcarta(usuario: string, id: number): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
      console.log(chalk.green(`Carta eliminada de la colección de ${usuario}`))
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  public modificarcarta(usuario: string, carta: Carta): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + carta.id + '.json';
    if(fs.existsSync(filePath)){
      fs.writeFileSync(filePath, JSON.stringify(carta));
      console.log(chalk.green(`Carta modificada en la colección de ${usuario}`))
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  public mostrarcarta(usuario: string, id: number): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath).toString();
      Mostrarporpantalla(data);
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  public listarcartas(usuario: string): void{
    const userDirectory = checkUserDirectory(usuario);
    if(!fs.existsSync(userDirectory)){
      console.log(chalk.red(`${usuario} no dispone de cartas`))
    } else {
      const cartas = fs.readdirSync(userDirectory);
      cartas.forEach((archivo) => {
        let filePath: string  = userDirectory + `${archivo}`;
        const carta = fs.readFileSync(filePath).toString();
        Mostrarporpantalla(carta);
      })
    }
  }
}

const NuevaColeccion = new ColecciondeCartas;

const nuevaCarta1: Carta = {
  id: 1,
  nombre: "Black Lotus",
  mana: 0,
  color: "Incoloro" as Color,
  tipo: "Artefacto" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "Puedes sacrificar el Black Lotus para añadir tres manás de cualquier color.",
  valor_mercado: 100000
};

const nuevaCarta2: Carta = {
  id: 2,
  nombre: "Lightning Bolt",
  mana: 1,
  color: "Rojo" as Color,
  tipo: "Conjuro" as Tipo,
  rareza: "Común" as Rareza,
  reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
  valor_mercado: 1
};

const nuevaCarta3: Carta = {
  id: 3,
  nombre: "Jace, the Mind Sculptor",
  mana: 4,
  color: "Azul" as Color,
  tipo: "Planeswalker" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "+2: Miras las tres primeras cartas de la biblioteca de un oponente, y las pones en cualquier orden.\n-1: Regresas la carta objetivo a la mano de su propietario.\n-12: Exilias todas las cartas en la mano y en la biblioteca de un oponente, y ganas 7 vidas por cada carta exiliada de esta manera.",
  lealtad: 3,
  valor_mercado: 80
};




