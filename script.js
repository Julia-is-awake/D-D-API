const monstroNome = document.querySelector('.monstro');
const monstroImg = document.querySelector('.monstroImagem');
const monstroType = document.querySelector('.monstroType');
const armorClass = document.querySelector(".armorClass");
const hitPoints = document.querySelector(".hitPoints");
const speed = document.querySelector(".speed");
const strength = document.querySelector(".strength");
const dexterity = document.querySelector(".dexterity");
const constitution = document.querySelector(".constitution");
const intelligence = document.querySelector(".intelligence");
const wisdom = document.querySelector(".wisdom");
const charisma = document.querySelector(".charisma");
const senses = document.querySelector(".senses");
const languages = document.querySelector(".languages");
const challenge = document. querySelector(".challenge");

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const botaoAbrir = document.querySelector("button")
const model = document.querySelector("dialog")
const botaoFechar = document.querySelector("dialog button")

const url = "https://api.open5e.com/v1/monsters/";
const loading = document.querySelector('#loading');
const monstros = document.querySelector('#monstros');



let page = 1;

async function pegarMonstro() {
    const response = await fetch(`${url}?page=${page}`);
    console.log(`${url}?page=${page}`)
    const data = await response.json();

    loading.style.display = 'none';
    data.results.map((post) => {
        if(post.img_main != null){
            console.log(post)
            const div = document.createElement("div");
            const title = document.createElement("h2");
            const body = document.createElement("p");
            const img = document.createElement("img");
            const linha = document.createElement("hr");
            
            title.innerText = `Name: ${post.name}`;
            body.innerText = `Type: ${post.type}`;
            img.src = post.img_main;
            img.alt = `A colorful drawing of the ${post.name} monster.`;
            div.classList.add("caixa_produto");
            
            div.appendChild(title);
            div.appendChild(body);
            div.appendChild(linha);
            div.appendChild(img);
            
            monstros.appendChild(div);

            div.onclick = async function() {
                console.log(post.slug)
                await renderMonstro(post.slug)
                model.showModal();
            }
            console.log(post.name)
        }
    });
    if (data.next != null) {
        page = page + 1;
        pegarMonstro();
    }
}

pegarMonstro();

botaoAbrir.onclick = function() {
    model.showModal();
}

botaoFechar.onclick = function() {
    model.close();
}

const fetchDnD = async (monstros) => {
    const APIResposta = await fetch(`https://api.open5e.com/v1/monsters/${monstros}`);

    const data = await APIResposta.json();

    console.log(data)

    loading.style.display = 'none';
    
    return data;
}

const renderMonstro = async (monstros) => {

    const data = await fetchDnD(monstros);

    monstroNome.innerHTML = data.name;
    monstroImg.src = data.img_main;
    monstroImg.alt = `A colorful drawing of the ${data.name} monster.`;
    monstroType.innerHTML = data.type;
    monstroImg.style.display = 'flex';
    armorClass.innerHTML = data.armor_class;
    hitPoints.innerHTML = data.hit_points;
    if (data.speed.swim) {
        speed.innerHTML = `${data.speed.walk} ft., swim ${data.speed.swim} ft.`;
    }
    else {
        speed.innerHTML = `${data.speed.walk} ft.`;
    }
    strength.innerHTML = data. strength;
    dexterity.innerHTML = data.dexterity;
    constitution.innerHTML = data.constitution;
    intelligence.innerHTML = data.intelligence;
    wisdom.innerHTML = data.wisdom;
    charisma.innerHTML = data.charisma;
    senses.innerHTML = data.senses;
    if (data.languages) {
        languages.innerHTML = data.languages;
    }
    else {
        languages.innerHTML = 'none';
    }
    challenge.innerHTML = data.challenge_rating;

    model.showModal();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(input.value);

    renderMonstro(input.value.toLowerCase());
    input.value = '';
})