const moment = require("moment");
const fs = require("fs");
const nomeArquivo = "pets.json";
const nomePetshop = "PetShop DH";

let petsJSON = fs.readFileSync(nomeArquivo);
let arquivoPets = JSON.parse(petsJSON);

//console.log(arquivoPets.pets);

const atualizarJson = () => {
    let listaJson = JSON.stringify(arquivoPets, null, 2);
    fs.writeFileSync(nomeArquivo, listaJson, "utf-8");
}

const adicionarPet = (infoPet) => {
    arquivoPets.pets.push(infoPet);
    atualizarJson();

    console.log(`${infoPet.nome} está cadastrado no nosso sistema!`);
}

adicionarPet({
    nome: "Rex",
    idade: 1,
    raca: "Maltes",
    tipo: "cachorro",
    vacinado: false,
    genero: "M",
    servicos: []
});

const listarPets = (infoPet) => {
    
    for (var i = 0; i < infoPet.length; i++) {
        let vacinado;
        if (infoPet[i].vacinado == true) {
            vacinado = "Sim"
        }
        else {
            vacinado = "Não"
        }
        console.log(`\nNome: ${infoPet[i].nome},\n Idade: ${infoPet[i].idade} \n Raça: ${infoPet[i].raca} \n Tipo: ${infoPet[i].tipo} \n Vacinado: ${vacinado} \n Gênero: ${infoPet[i].genero} \n Serviços: ${infoPet[i].servicos} \n`);

        for (let j = 0; j < infoPet[i].servicos.length; j++) {
            console.log(`${infoPet[i].servicos[j].data}) - ${infoPet[i].servicos[j]}`);
        }
    }
    atualizarJson();
}



const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJson();
        console.log(`\n${pet.nome} foi vacinado com sucesso! \n`);
    } else {
        console.log(`\nOps, ${pet.nome} já está vacinado! \n`);
    }
}



const campanhaVacina = (pets) => {
    let totalVacinados = 0;
    for (let i = 0; i < pets.length; i++) {
        if (!pets[i].vacinado) {
            pets[i].vacinado = true;
            totalVacinados++
        }
    }
    atualizarJson();
    console.log(`\nParabéns, ${totalVacinados} pets foram vacinados nessa campanha!`);
}



const darBanhoPet = (pet) => {
    pet.servicos.push({
        nome: "banho",
        data: moment().format("DD-MM-YYYY")
    });
    atualizarJson();
    console.log(`\n${pet.nome} está cheiroso!`);
}


const tosarPet = (pet) => {
    pet.servicos.push({
        nome: "tosa",
        data: moment().format("DD-MM-YYYY")
    });
    atualizarJson();
    console.log(`\n${pet.nome} está com cabelinho na régua!`);
}


const apararUnhasPet = (pet) => {
    pet.servicos.push({
        nome: "corte de unhas",
        data: moment().format("DD-MM-YYYY")
    });
    atualizarJson();
    console.log(`\n${pet.nome} está de unhas aparadas!`);
}

const buscarPet = (nomePet) => {
    const petEncontrado = arquivoPets.pets.find((pet) => {
        return pet.nome == nomePet;
    });
    console.log(petEncontrado ? petEncontrado : "Nenhum pet encontrado com esse nome");
}

const atenderCliente = (pet, servico) => {
    console.log(`Olá, ${pet.nome}!`);
    servico(pet);
    console.log("Até mais!");
}

listarPets(arquivoPets.pets);
campanhaVacina(arquivoPets.pets);
darBanhoPet(arquivoPets.pets[2]);
buscarPet("Costelinha");

atenderCliente(arquivoPets.pets[0], darBanhoPet);