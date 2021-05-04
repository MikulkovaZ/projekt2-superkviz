let poleOtazek = [
    {
        cisloOtazky: 1,
        foto: 'Praha.jpg',
        otazkaText: 'Hlavní město České republiky?',
        moznosti: ['Berlín', 'Praha', 'Sofie'],
        spravnaOdpoved: 1,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 2,
        foto: 'Berlin.jpg',
        otazkaText: 'Hlavní město Německa?',
        moznosti: ['Paříž', 'Praha', 'Berlín'],
        spravnaOdpoved: 2,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 3,
        foto: 'Madrid.jpg',
        otazkaText: 'Hlavní město Španělska?',
        moznosti: ['Madrid', 'Barcelona', 'Riga'],
        spravnaOdpoved: 0,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 4,
        foto: 'Bratislava.jpg',
        otazkaText: 'Hlavní město Slovenské republiky?',
        moznosti: ['Dublin', 'Bratislava', 'Varšava'],
        spravnaOdpoved: 1,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 5,
        foto: 'Rim.jpg',
        otazkaText: 'Hlavní město Itálie?',
        moznosti: ['Riga', 'Řím', 'Amsterdam'],
        spravnaOdpoved: 1,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 6,
        foto: 'Bern.jpg',
        otazkaText: 'Hlavní město Švýcarska?',
        moznosti: ['Bern', 'Budapešť', 'Moskva'],
        spravnaOdpoved: 0,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 7,
        foto: 'Helsinky.jpg',
        otazkaText: 'Hlavní město Finska?',
        moznosti: ['Berlín', 'Brusel', 'Helsinky'],
        spravnaOdpoved: 2,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 8,
        foto: 'Londyn.jpg',
        otazkaText: 'Hlavní město Velké Británie?',
        moznosti: ['Praha', 'Londýn', 'Kodaň'],
        spravnaOdpoved: 1,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 9,
        foto: 'Viden.jpg',
        otazkaText: 'Hlavní město Rakouska?',
        moznosti: ['Vídeň', 'Praha', 'Minsk'],
        spravnaOdpoved: 0,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    },

    {
        cisloOtazky: 10,
        foto: 'Pariz.jpg',
        otazkaText: 'Hlavní město Francie?',
        moznosti: ['Záhřeb', 'Oslo', 'Paříž'],
        spravnaOdpoved: 2,
        zvolenaOdpoved: "",
        zvolenaOdpovedText: ""
    }

]




let indexAktualniOtazky = 0;  //tady udržuju index aktuální otázky
let pocetSpravnych = 0; //tady počet správných odpovědí


//vygeneruj otázku
function getQuestion(indexAktualniOtazky) {
    //červený text - na které otázce z kolika jsem
    document.querySelector('#poradi').innerHTML = 'Otázka ' + poleOtazek[indexAktualniOtazky].cisloOtazky + '/' + poleOtazek.length;

    //text otázky
    document.querySelector('#otazka').innerHTML = poleOtazek[indexAktualniOtazky].otazkaText;

    //obrázek
    document.querySelector('.foto').src = 'obrazky/' + poleOtazek[indexAktualniOtazky].foto;

    //div s možnostmi viz readme, pomůže asi tohle: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_global_data 
    for (let i = 0; i < poleOtazek[indexAktualniOtazky].moznosti.length; i++) {
        const odpovedi = document.createElement('ul');
        odpovedi.setAttribute("id", "odpovedi");

        const moznost = document.createElement('li');
        moznost.setAttribute("data-odpoved", i);
        moznost.setAttribute("onclick", "choice(this)");
        moznost.setAttribute("id", "moznost")
        moznost.innerHTML = poleOtazek[indexAktualniOtazky].moznosti[i];

        odpovedi.appendChild(moznost);
        document.querySelector('#moznosti').appendChild(odpovedi);
    }
}

//init - vygeneruj otázku[0]
getQuestion(indexAktualniOtazky);


//onclick na odpověď
function choice(answer) {
    let indexOdpovedi = answer.getAttribute("data-odpoved");
    let textOdpovedi = answer.innerHTML
    
    // ulož do proměnné zvolenou odpověď
    poleOtazek[indexAktualniOtazky].zvolenaOdpoved = indexOdpovedi;
    poleOtazek[indexAktualniOtazky].zvolenaOdpovedText = textOdpovedi;

    // smaž možnosti předchozí otázky 
    document.querySelector('#moznosti').innerHTML = "";

    // posuň se na další otázku nebo vyhodnocení
    indexAktualniOtazky = indexAktualniOtazky + 1;
    if (indexAktualniOtazky < poleOtazek.length) {
        getQuestion(indexAktualniOtazky);
    } else {
        result();
    } 
    
}


//vyhodnocení
function result() {
    //schovej kviz
    document.querySelector('.kviz').style.display = 'none';

    //ukaž výsledek
    document.querySelector('.vysledek').style.display = 'block';

    // cyklus pro každou otázku - vygeneruj samostatný div
    for (let i = 0; i < poleOtazek.length; i++) {
        let vypisVysledky = document.createElement('div');
        vypisVysledky.setAttribute("id", "vypisVysledky");

        // pořadí + text otázky do h3
        let vypisOtazky = document.createElement('h3');
        vypisOtazky.innerHTML = poleOtazek[i].cisloOtazky + '. ' + poleOtazek[i].otazkaText;
        
        //tvoje odpověď: zvolená odpověď
        let volba = document.createElement('p');
        volba.setAttribute("id", "volba1")
        volba.innerHTML = "Tvoje odpověď: " + poleOtazek[i].zvolenaOdpovedText;  

        //zkontroluj správnost
        let vyhodnoceni = document.createElement('p');
        if (poleOtazek[i].zvolenaOdpoved == poleOtazek[i].spravnaOdpoved) {
            vyhodnoceni.innerHTML = "To je SPRÁVNĚ.";
            pocetSpravnych = pocetSpravnych + 1;
        } else {
            vyhodnoceni.innerHTML = "Správná odpověď: " + poleOtazek[i].moznosti[poleOtazek[i].spravnaOdpoved];        
        }

        vypisVysledky.appendChild(vypisOtazky);
        vypisVysledky.appendChild(volba);
        vypisVysledky.appendChild(vyhodnoceni);
        document.querySelector('.vysledek').appendChild(vypisVysledky);
    }
    
    //text 'Správně je.... Úspěšnost....%.'
    let uspesnost = document.createElement('h2');
    let procentSpravnych = Math.floor((pocetSpravnych/poleOtazek.length) * 100);
    uspesnost.innerHTML = "Správně " + pocetSpravnych + " ze " + poleOtazek.length + " otázek. Úspěšnost " + procentSpravnych + " %.";
    document.querySelector('.vysledek').appendChild(uspesnost);

} 




    
    
    
