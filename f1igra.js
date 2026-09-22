// ========================================
// ELEMENTI HTML-A
// ========================================

const dugme =
    document.querySelector("#spin");

    const paytableDugme =
    document.querySelector("#paytableDugme");

const paytableProzor =
    document.querySelector("#paytableProzor");

const paytableZatvori =
    document.querySelector("#paytableZatvori");

const paytableTabela =
    document.querySelector("#paytableTabela");

const polja =
    document.querySelectorAll(".znak");

const prikazNovca =
    document.querySelector("#novac");

const prikazUloga =
    document.querySelector("#ulog");

const minus =
    document.querySelector("#minus");

const plus =
    document.querySelector("#plus");

const poruka =
    document.querySelector("#poruka");

const prikazPoslednjegDobitka =
    document.querySelector("#poslednjiDobitak");

const prikazBesplatnihIgara =
    document.querySelector("#besplatneIgre");

const besplatneIgreBox =
    document.querySelector("#besplatneIgreBox");

const scOverlay =
    document.querySelector("#scOverlay");


// ========================================
// NOVAC, ULOG I BESPLATNE IGRE
// ========================================

let novac = 1000;

let ulog = 10;

let besplatneIgre = 0;


// ========================================
// ZNAKOVI
// ========================================
// ========================================
// PAYTABLE
// ========================================

function napraviPaytable() {

    paytableTabela.innerHTML = "";


    // Zaglavlje

    const zaglavlje =
        document.createElement("div");

    zaglavlje.className =
        "paytableRed";


    zaglavlje.innerHTML = `
        <div></div>
        <div class="paytableNaslov">3 SIMBOLA</div>
        <div class="paytableNaslov">4 SIMBOLA</div>
        <div class="paytableNaslov">5 SIMBOLA</div>
    `;


    paytableTabela.appendChild(zaglavlje);


    // Simboli

    znakovi.forEach(function(znak) {

        // SC preskačemo jer ima posebno pravilo

        if (znak.tip === "wild") {
            return;
        }


        const red =
            document.createElement("div");

        red.className =
            "paytableRed";


        red.innerHTML = `

            <div>
                <img src="${znak.slika}">
            </div>

            <div class="paytableVrednost">
                ${znak.isplata[3]}×
            </div>

            <div class="paytableVrednost">
                ${znak.isplata[4]}×
            </div>

            <div class="paytableVrednost">
                ${znak.isplata[5]}×
            </div>

        `;


        paytableTabela.appendChild(red);

    });

}
const znakovi = [

    {
        ime: "W",
        slika: "znak-w.png",
        weight: 25,

        isplata: {
            3: 2,
            4: 5,
            5: 10
        }
    },


    {
        ime: "I",
        slika: "znak-i.png",
        weight: 24,

        isplata: {
            3: 3,
            4: 7,
            5: 15
        }
    },


    {
        ime: "H",
        slika: "znak-h.png",
        weight: 22,

        isplata: {
            3: 5,
            4: 10,
            5: 20
        }
    },


    {
        ime: "M",
        slika: "znak-m.png",
        weight: 21,

        isplata: {
            3: 8,
            4: 15,
            5: 30
        }
    },


    {
        ime: "S",
        slika: "znak-s.png",
        weight: 20,

        isplata: {
            3: 10,
            4: 20,
            5: 50
        }
    },


    {
        ime: "HELMET",
        slika: "znak-kaciga.png",
        weight: 17,

        isplata: {
            3: 15,
            4: 30,
            5: 75
        }
    },


    {
        ime: "CAR",
        slika: "znak-bolid.png",
        weight: 15,

        isplata: {
            3: 20,
            4: 50,
            5: 100
        }
    },


    {
        ime: "FLAG",
        slika: "znak-zastava.png",
        weight: 13,

        isplata: {
            3: 30,
            4: 75,
            5: 150
        }
    },


    {
        ime: "TROPHY",
        slika: "znak-trofej.png",
        weight: 10,

        isplata: {
            3: 50,
            4: 125,
            5: 250
        }
    },


    {
        ime: "CHAMP",
        slika: "znak-wdc.png",
        weight: 7,

        isplata: {
            3: 100,
            4: 250,
            5: 500
        }
    },


    // ====================================
    // SC
    // ====================================

    {
        ime: "SC",
        slika: "znak-sc.png",
        weight: 8,

        tip: "wild"
    }

];


// ========================================
// DOBITNE LINIJE
// ========================================

const linije = [

    // 1. GORNJA HORIZONTALNA
    [
        0, 0, 0, 0, 0
    ],


    // 2. SREDNJA HORIZONTALNA
    [
        1, 1, 1, 1, 1
    ],


    // 3. DONJA HORIZONTALNA
    [
        2, 2, 2, 2, 2
    ],


    // 4. TROUGAO NAGORE
    [
        2, 1, 0, 1, 2
    ],


    // 5. TROUGAO NADOLE
    [
        0, 1, 2, 1, 0
    ]

];


// ========================================
// IZBOR NASUMIČNOG ZNAKA
// ========================================

function izaberiZnak() {

    let ukupnaTezina = 0;


    znakovi.forEach(function(znak) {

        ukupnaTezina += znak.weight;

    });


    let nasumicanBroj =
        Math.random() * ukupnaTezina;


    for (
        let i = 0;
        i < znakovi.length;
        i++
    ) {

        nasumicanBroj -=
            znakovi[i].weight;


        if (nasumicanBroj <= 0) {

            return znakovi[i];

        }

    }

}


// ========================================
// OSVEŽAVANJE PRIKAZA
// ========================================

function osveziPrikaz() {

    prikazNovca.textContent =
        novac;

    prikazUloga.textContent =
        ulog;

    prikazBesplatnihIgara.textContent =
        besplatneIgre;


    if (besplatneIgre > 0) {

        besplatneIgreBox.style.display =
            "flex";

    } else {

        besplatneIgreBox.style.display =
            "none";

    }

}
// ========================================
// SAFETY CAR ANIMACIJA
// ========================================

function prikaziSafetyCar() {

    scOverlay.style.display =
        "flex";


    setTimeout(function() {

        scOverlay.style.display =
            "none";

    }, 1800);

}

// ========================================
// POVEĆAVANJE ULOGA
// ========================================

plus.addEventListener(
    "click",
    function() {

        ulog += 10;


        if (ulog > novac) {

            ulog = novac;

        }


        osveziPrikaz();

    }
);


// ========================================
// SMANJIVANJE ULOGA
// ========================================

minus.addEventListener(
    "click",
    function() {

        ulog -= 10;


        if (ulog < 10) {

            ulog = 10;

        }


        osveziPrikaz();

    }
);


// ========================================
// SPIN
// ========================================

let spinUToku = false;


// ========================================
// ANIMACIJA SPINA
// ========================================

function animirajSpin(rezultat) {

    return new Promise(function(resolve) {


        // Svaka kolona se zaustavlja posebno.

        for (
            let kolona = 0;
            kolona < 5;
            kolona++
        ) {


            // ====================================
            // ANIMACIJA KOLONE
            // ====================================

            const interval =
                setInterval(function() {


                    // HTML je organizovan po REDOVIMA.
                    //
                    // Red 0: 0 1 2 3 4
                    // Red 1: 5 6 7 8 9
                    // Red 2: 10 11 12 13 14
                    //
                    // Zato je indeks:
                    //
                    // red * 5 + kolona

                    for (
                        let red = 0;
                        red < 3;
                        red++
                    ) {

                        const indeks =
                            red * 5 + kolona;


                        const polje =
                            polja[indeks];


                        const nasumican =
                            izaberiZnak();


                        polje.innerHTML =
                            `<img src="${nasumican.slika}">`;

                    }

                }, 80);


            // ====================================
            // ZAUSTAVLJANJE KOLONE
            // ====================================

            setTimeout(function() {

                clearInterval(interval);


                // Kada se kolona zaustavi,
                // prikazujemo PRAVI rezultat.

                for (
                    let red = 0;
                    red < 3;
                    red++
                ) {

                    const indeks =
                        red * 5 + kolona;


                    const polje =
                        polja[indeks];


                    polje.innerHTML =
                        `<img src="${rezultat[indeks].slika}">`;

                }


                // Poslednja kolona završava animaciju.

                if (kolona === 4) {

                    resolve();

                }

            }, 700 + kolona * 250);

        }

    });

}


// ========================================
// GLAVNI SPIN
// ========================================

async function nasumicanZnak() {


    // ====================================
    // SPIN VEĆ TRAJE
    // ====================================

    if (spinUToku) {

        return;

    }


    spinUToku = true;

    dugme.disabled = true;

// Uklanjanje svetla sa prethodnog dobitka
polja.forEach(function(polje) {

    polje.classList.remove("dobitniZnak");

}); 
    // ====================================
    // PROVERA NOVCA
    // ====================================

    if (
        besplatneIgre === 0 &&
        novac < ulog
    ) {

        poruka.textContent =
            "Nemate dovoljno novca.";


        spinUToku = false;

        dugme.disabled = false;

        return;

    }


    // ====================================
    // PLAĆANJE SPINA
    // ====================================

    if (besplatneIgre === 0) {

        novac -= ulog;

    }


    // ====================================
    // TROŠENJE FREE GAME-A
    // ====================================

    else {

        besplatneIgre--;

    }


    poruka.textContent = "";


    // ====================================
    // REZULTAT SPINA
    // ====================================

    const rezultat = [];


    // ====================================
    // GENERISANJE 15 POLJA
    // ====================================

    polja.forEach(function(polje) {

        const izabraniZnak =
            izaberiZnak();

        rezultat.push(izabraniZnak);

    });


    // ====================================
    // ANIMACIJA
    // ====================================

    await animirajSpin(rezultat);


    // ====================================
    // BROJANJE SC SIMBOLA
    // ====================================

    const brojSC =
        rezultat.filter(function(znak) {

            return znak.ime === "SC";

        }).length;


    // ====================================
    // FREE GAMES
    // ====================================

 if (brojSC >= 3) {

    besplatneIgre += 10;


    poruka.textContent =
        "FREE GAMES! +10 besplatnih igara!";


    prikaziSafetyCar();

}

    // ====================================
    // PROVERA DOBITNIH LINIJA
    // ====================================

    const dobitak =
        proveriLinije(rezultat);


    // ====================================
    // DODAVANJE DOBITKA
    // ====================================

    if (dobitak > 0) {

    novac += dobitak;


    prikazPoslednjegDobitka.textContent =
        "Poslednji dobitak: " +
        dobitak +
        " €";


    // ====================================
    // CHAMPIONSHIP JACKPOT
    // ====================================

    const champJackpot =
        linije.some(function(linija) {

            return linija.every(function(red, i) {

                const indeks =
                    red * 5 + i;

                return rezultat[indeks].ime === "CHAMP";

            });

        });


    if (champJackpot) {

        poruka.textContent =
            "🏆 CHAMPIONSHIP JACKPOT! 🏆";

    }


    else if (brojSC < 3) {

        poruka.textContent =
            "Dobitak: " +
            dobitak +
            " €";

    }

}


    // ====================================
    // OSVEŽAVANJE
    // ====================================

    osveziPrikaz();


    // Ponovo omogućavamo Spin.

    spinUToku = false;

    dugme.disabled = false;

    plus.disabled = besplatneIgre > 0;
    minus.disabled = besplatneIgre > 0;

}


// ========================================
// PROVERA DOBITNIH LINIJA
// ========================================

function proveriLinije(rezultat) {

    let ukupanDobitak = 0;


    // ====================================
    // UKLANJANJE STAROG SVETLJENJA
    // ====================================

    polja.forEach(function(polje) {

        polje.classList.remove(
            "dobitniZnak"
        );

    });


    // ====================================
    // PROLAZAK KROZ SVE LINIJE
    // ====================================

    linije.forEach(function(linija) {


        // ====================================
        // PRVI NORMALAN ZNAK
        // ====================================

        let trazeniZnak = null;


        for (
            let i = 0;
            i < linija.length;
            i++
        ) {

            const indeks =
                linija[i] * 5 + i;


            const znak =
                rezultat[indeks];


            // Ako nije SC,
            // to je simbol koji tražimo.

            if (znak.tip !== "wild") {

                trazeniZnak = znak;

                break;

            }

        }


        // Ako su svi simboli SC,
        // nema posebne isplate.

        if (trazeniZnak === null) {

            return;

        }


        // ====================================
        // BROJANJE ISTIH SIMBOLA
        // ====================================

        let brojIstih = 0;


        for (
            let i = 0;
            i < linija.length;
            i++
        ) {

            const indeks =
                linija[i] * 5 + i;


            const znak =
                rezultat[indeks];


            // Isti znak
            if (
                znak.ime ===
                trazeniZnak.ime
            ) {

                brojIstih++;

            }


            // SC = WILD
            else if (
                znak.tip === "wild"
            ) {

                brojIstih++;

            }


            // Drugi znak prekida kombinaciju
            else {

                break;

            }

        }


        // ====================================
        // ISPLATA
        // ====================================

        if (brojIstih >= 3) {


            const mnozilac =
                trazeniZnak.isplata[
                    brojIstih
                ];


            if (mnozilac) {


                // Dodavanje dobitka

                ukupanDobitak +=
                    ulog * mnozilac;


                // ====================================
                // SVETLJENJE DOBITNIH ZNAKOVA
                // ====================================

                for (
                    let i = 0;
                    i < brojIstih;
                    i++
                ) {

                    const indeks =
                        linija[i] * 5 + i;


                    polja[indeks]
                        .classList
                        .add("dobitniZnak");

                }

            }

        }

    });


    return ukupanDobitak;

}


// ========================================
// KLIK NA SPIN
// ========================================

dugme.addEventListener(
    "click",
    nasumicanZnak
);


// ========================================
// POČETNI PRIKAZ
// ========================================

osveziPrikaz();
// ========================================
// OTVARANJE PAYTABLE-A
// ========================================

paytableDugme.addEventListener(
    "click",
    function() {

        napraviPaytable();

        paytableProzor.style.display =
            "flex";

    }
);


// ========================================
// ZATVARANJE PAYTABLE-A
// ========================================

paytableZatvori.addEventListener(
    "click",
    function() {

        paytableProzor.style.display =
            "none";

    }
);


// ========================================
// ZATVARANJE KLIKOM VAN PROZORA
// ========================================

paytableProzor.addEventListener(
    "click",
    function(event) {

        if (event.target === paytableProzor) {

            paytableProzor.style.display =
                "none";

        }

    }
);