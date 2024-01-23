{/* <div class="element" data-atomic-number="1" data-symbol="H" data-name="Hydrogen" data-atomic-mass="1.008">
    <span class="number">1</span>
    <p>H</p>
    <span class="mass">1.008</span>
</div> */}
// const filling_order = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p', '8s', '5g', '6f', '7d', '8p', '9s']
const subshell_capacity = {
    's': 2,
    'p': 6,
    'd': 10,
    'f': 14,
    'g': 18
}
const filling_order = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p']

function electronDistrobution(numElectrons) {
    // return electronDistrobutionReal(numElectrons);
    let distribution = "";
    for (let i=0; i<filling_order.length; i++) {
        const orbital = filling_order[i];
        const shellNumber = parseInt(orbital[0]);
        const subshellType = orbital[1];
        const capacity = subshell_capacity[subshellType];
        if (subshellType === "f" && shellNumber === 4) {
            numElectrons -= 1;
        }
        if (numElectrons <= capacity) {
            distribution += `${shellNumber}${subshellType.toUpperCase()}<sub>${numElectrons}</sub>`;
            return distribution;
        } else {
            distribution += `${shellNumber}${subshellType.toUpperCase()}<sub>${capacity}</sub>`;
            numElectrons -= capacity;
        }
    }
    if (numElectrons > 0) {
        return "Electron number exceeds known filling order!";
    }
    return distribution;
}
function create_element(atomic_number, symbol, name, atomic_mass) {
    parent_div = document.createElement("div");
    parent_div.setAttribute("class", "element");
    parent_div.setAttribute("data-atomic-number", atomic_number);
    parent_div.setAttribute("data-symbol", symbol);
    parent_div.setAttribute("data-name", name);
    parent_div.setAttribute("data-atomic-mass", atomic_mass);

    span_num = document.createElement("span");
    span_num.setAttribute("class","number");
    span_num.textContent = atomic_number;

    symbol_txt = document.createElement("p");
    symbol_txt.textContent = symbol;

    span_mass = document.createElement("span");
    span_mass.setAttribute("class","mass");
    span_mass.textContent = atomic_mass;

    parent_div.appendChild(span_num);
    parent_div.appendChild(symbol_txt);
    parent_div.appendChild(span_mass);

    return parent_div;
}
function update_elements() {
    elements.forEach(elm => {
        symbol = elm.getAttribute("data-symbol");
        mass = elm.getAttribute("data-atomic-mass");
        number = elm.getAttribute("data-atomic-number");

        elm.querySelector('.number').textContent = number;
        elm.querySelector('.mass').textContent = mass;
        elm.querySelector('p').textContent = symbol;
    })
}
function update_elements_width() {
    max_width = 0;
    elements.forEach(elm => {
        elm.style.width = "auto";
        if (elm.offsetWidth > max_width) {
            max_width = elm.offsetWidth;
        }
    })
    elements.forEach(elm => {
        elm.style.width = max_width + "px";
    })
    blanks.forEach(blnk => {
        blnk.style.width = max_width + "px";
    })
}
function isInDictLists(dict, item) {
    return Object.values(dict).some(list => list.includes(item))
}
function create_bullet(text) {
    li = document.createElement("li");
    span = document.createElement("span");
    span.innerHTML = text;
    span.setAttribute("class", "info-text");
    li.appendChild(span)
    infoBulletsList.appendChild(li)
}
const p_table = document.querySelector("#periodic-table");
const decimalInput = document.getElementById('decimal-places');
decimalInput.value = 2;

const infoDiv = document.querySelector("#element-info");
const infoDivNameSpan = infoDiv.querySelector("#element-name");
const infoDivCloseImg = infoDiv.querySelector("#close");
const infoDivSymbol = infoDiv.querySelector("#element-symbol");
const infoBulletsDiv = infoDiv.querySelector("#list");
const infoBulletsList = infoBulletsDiv.querySelector("ul");

const elements = document.querySelectorAll('.element');
const blanks = document.querySelectorAll(".blank");
const element_masses = {"1":[1.00784,1.00811],"2":4.002602,"3":[6.938,6.997],"4":9.0121831,"5":[10.806,10.821],"6":[12.0096,12.0116],"7":[14.00643,14.00728],"8":[15.99903,15.99977],"9":18.998403163,"10":20.1797,"11":22.98976928,"12":[24.304,24.307],"13":26.9815385,"14":[28.084,28.086],"15":30.973761998,"16":[32.059,32.076],"17":[35.446,35.457],"18":39.948,"19":39.0983,"20":40.078,"21":44.955908,"22":47.867,"23":50.9415,"24":51.9961,"25":54.938044,"26":55.845,"27":58.933194,"28":58.6934,"29":63.546,"30":65.38,"31":69.723,"32":72.63,"33":74.921595,"34":78.971,"35":[79.901,79.907],"36":83.798,"37":85.4678,"38":87.62,"39":88.90594,"40":91.224,"41":92.90637,"42":95.95,"43":97,"44":101.07,"45":102.9055,"46":106.42,"47":107.8682,"48":112.414,"49":114.818,"50":118.71,"51":121.76,"52":127.6,"53":126.90447,"54":131.293,"55":132.90545196,"56":137.327,"57":138.90547,"58":140.116,"59":140.90766,"60":144.242,"61":145,"62":150.36,"63":151.964,"64":157.25,"65":158.92535,"66":162.5,"67":164.93033,"68":167.259,"69":168.93422,"70":173.045,"71":174.9668,"72":178.49,"73":180.94788,"74":183.84,"75":186.207,"76":190.23,"77":192.217,"78":195.084,"79":196.966569,"80":200.592,"81":[204.382,204.385],"82":207.2,"83":208.9804,"84":209,"85":210,"86":222,"87":223,"88":226,"89":227,"90":232.0377,"91":231.03588,"92":238.02891,"93":237,"94":244,"95":243,"96":247,"97":247,"98":251,"99":252,"100":257,"101":258,"102":259,"103":262,"104":263,"105":268,"106":271,"107":270,"108":270,"109":278,"110":281,"111":281,"112":285,"113":286,"114":289,"115":289,"116":293,"117":294,"118":294};
const elements_discovered = {"Actinium":{"person":"André-Louis Debierne","year":"1899"},"Aluminum":{"person":"Hans Christian Oersted","year":"1825"},"Americium":{"person":"Glenn T. SeaborgRalph A. JamesLeon O. MorganAlbert Ghiorso","year":"1944"},"Antimony":{"person":"Known since ancient times","year":"?"},"Argon":{"person":"Sir William RamsayLord Rayleigh","year":"1894"},"Arsenic":{"person":"Known since ancient times","year":"?"},"Astatine":{"person":"Dale R. CarsonK.R. MacKenzieEmilio Segrè","year":"1940"},"Barium":{"person":"Sir Humphry Davy","year":"1808"},"Berkelium":{"person":"Stanley G. ThompsonGlenn T. SeaborgKenneth Street, Jr.Albert Ghiorso","year":"1949"},"Beryllium":{"person":"Louis-Nicholas Vauquelin","year":"1798"},"Bismuth":{"person":"Claude Geoffroy the Younger","year":"1753"},"Bohrium":{"person":"Scientists at Dubna, Russia","year":"1976"},"Boron":{"person":"Joseph-Louis Gay-LussacLouis-Jaques ThénardSir Humphry Davy","year":"1808 1808"},"Bromine":{"person":"Antoine-Jérôme Balard","year":"1826"},"Cadmium":{"person":"Friedrich Strohmeyer","year":"1817"},"Calcium":{"person":"Sir Humphry Davy","year":"1808"},"Californium":{"person":"Stanley G. ThompsonGlenn T. SeaborgKenneth Street, Jr.Albert Ghiorso","year":"1950"},"Carbon":{"person":"Known since ancient times","year":"?"},"Cerium":{"person":"Jöns Jacob BerzeliusWilhelm von HisingerMartin Heinrich Klaproth","year":"1803 1803"},"Cesium":{"person":"Robert Wilhelm BunsenGustav Robert Kirchoff","year":"1860"},"Chlorine":{"person":"Carl Wilhelm Scheele","year":"1774"},"Chromium":{"person":"Louis-Nicholas Vauquelin","year":"1797"},"Cobalt":{"person":"Georg Brandt","year":"1739"},"Copernicium":{"person":"Peter ArmbrusterGottfried Münzenber","year":"1996"},"Copper":{"person":"Known since ancient times","year":"?"},"Curium":{"person":"Glenn T. SeaborgRalph A. JamesAlbert Ghiorso","year":"1944"},"Darmstadtium":{"person":"Peter ArmbrusterGottfried Münzenber","year":"1994"},"Dubnium":{"person":"Scientists at Dubna, RussiaLawrence Berkeley Laboratory","year":"19671970"},"Dysprosium":{"person":"Paul-Émile Lecoq de Boisbaudran","year":"1886"},"Einsteinium":{"person":"Albert Ghiorso et. al.","year":"1952"},"Erbium":{"person":"Carl Gustaf Mosander","year":"1843"},"Europium":{"person":"Eugène-Antole Demarçay","year":"1896"},"Fermium":{"person":"Albert Ghiorso et. al.","year":"1952"},"Flerovium":{"person":"Scientists at Dubna, Russia withScientists from Lawrence Livermore National Laboratory","year":"1998"},"Fluorine":{"person":"Ferdinand Frederic Henri Moissan","year":"1886"},"Francium":{"person":"Marguerite Catherine Perey","year":"1939"},"Gadolinium":{"person":"Jean Charles Galissard de Marignac","year":"1880"},"Gallium":{"person":"Paul-Émile Lecoq de Boisbaudran","year":"1875"},"Germanium":{"person":"Clemens Winkler","year":"1886"},"Gold":{"person":"Known to the Ancients","year":"?"},"Hafnium":{"person":"Dirk CosterCharles de Hevesy","year":"1923"},"Hassium":{"person":"Peter ArmbrusterGottfried Münzenber","year":"1984"},"Helium":{"person":"Pierre-Jules-César Janssen","year":"1868"},"Holmium":{"person":"Per Theodor Cleve","year":"1879"},"Hydrogen":{"person":"Henry Cavendish","year":"1766"},"Indium":{"person":"Ferdinand ReichHieronymus Theodor Richter","year":"1863"},"Iodine":{"person":"Barnard Courtois","year":"1811"},"Iridium":{"person":"Smithson Tennant","year":"1803"},"Iron":{"person":"Known since ancient times","year":"?"},"Krypton":{"person":"Sir William RamsayMorris M. Travers","year":"1898"},"Lanthanum":{"person":"Carl Gustaf Mosander","year":"1839"},"Lawrencium":{"person":"Albert GhiorsoTorbjørn SikkelandAlmon E. LarshRobert M. Latimer","year":"1961"},"Lead":{"person":"Known since ancient times","year":"?"},"Lithium":{"person":"Johann August Arfvedson","year":"1817"},"Livermorium":{"person":"Scientists at Dubna, Russia withScientists from Lawrence Livermore National Laboratory","year":"2001"},"Lutetium":{"person":"Georges Urbain","year":"1907"},"Magnesium":{"person":"Sir Humphry Davy","year":"1808"},"Manganese":{"person":"Johan Gottlieb Gahn","year":"1774"},"Meitnerium":{"person":"Peter ArmbrusterGottfried Münzenber","year":"1982"},"Mendelevium":{"person":"Stanley G. ThompsonGlenn T. SeaborgBernard G. HarveyGregory R. ChoppinAlbert Ghiorso","year":"1955"},"Mercury":{"person":"Known since ancient times","year":"?"},"Molybdenum":{"person":"Carl Welhelm Scheele","year":"1778"},"Moscovium":{"person":"Y. T. Oganessian et. al.","year":"2004"},"Neodymium":{"person":"Carl F. Auer von Welsbach","year":"1885"},"Neon":{"person":"Sir William RamsayMorris M. Travers","year":"1898"},"Neptunium":{"person":"Edwin M. McMillianPhilip H. Abelson","year":"1940"},"Nickel":{"person":"Axel Fredrik Cronstedt","year":"1751"},"Nihonium":{"person":"Y. T. Oganessian et. al.","year":"2004"},"Niobium":{"person":"Charles Hatchett","year":"1801"},"Nitrogen":{"person":"Daniel Rutherford","year":"1772"},"Nobelium":{"person":"Albert GhiorsoGlenn T. SeaborgTorbørn SikkelandJohn R. Walton","year":"1958"},"Oganesson":{"person":"Y. T. Oganessian et. al.","year":"2006"},"Osmium":{"person":"Smithson Tennant","year":"1803"},"Oxygen":{"person":"Joseph Priestley","year":"1774"},"Palladium":{"person":"William Hyde Wollaston","year":"1803"},"Phosphorus":{"person":"Hennig Brand","year":"1669"},"Platinum":{"person":"Known to pre-Columbian IndiansAntonio de Ulloa","year":"?1735"},"Plutonium":{"person":"Glenn T. SeaborgJoseph W. KennedyEdward M. McMillanArthur C. Wohl","year":"1941"},"Polonium":{"person":"Marie Sklodowska Curie","year":"1898"},"Potassium":{"person":"Sir Humphry Davy","year":"1807"},"Praseodymium":{"person":"Carl F. Auer von Welsbach","year":"1885"},"Promethium":{"person":"Jacob A. MarinskyLawrence E. GlendeninCharles D. Coryell","year":"1944"},"Protactinium":{"person":"Kasimir FajansO.H. Göhring","year":"1913"},"Radium":{"person":"Marie Sklodowska CuriePierre Curie","year":"1898"},"Radon":{"person":"Friedrich Ernst Dorn","year":"1900"},"Rhenium":{"person":"Ida Tacke-NoddackWalter NoddackOtto Carl Berg","year":"1925"},"Rhodium":{"person":"William Hyde Wollaston","year":"1803"},"Roentgenium":{"person":"Peter ArmbrusterGottfried Münzenber","year":"1994"},"Rubidium":{"person":"Robert BunsenGustav Kirchhoff","year":"1861"},"Ruthenium":{"person":"Karl Karlovich Klaus","year":"1844"},"Rutherfordium":{"person":"Scientists at Dubna, RussiaAlbert Ghiorso et. al.","year":"19641969"},"Samarium":{"person":"Jean Charles Galissard de Marignac","year":"1853"},"Scandium":{"person":"Lars Fredrik Nilson","year":"1879"},"Seaborgium":{"person":"Albert Ghiorso et. al.","year":"1974"},"Selenium":{"person":"Jöns Jacob Berzelius","year":"1817"},"Silicon":{"person":"Jöns Jacob Berzelius","year":"1824"},"Silver":{"person":"Known since ancient times","year":"?"},"Sodium":{"person":"Sir Humphry Davy","year":"1807"},"Strontium":{"person":"Adair Crawford","year":"1790"},"Sulfur":{"person":"Known since ancient times","year":"?"},"Tantalum":{"person":"Anders Gustaf Ekenberg","year":"1802"},"Technetium":{"person":"Carlo PerrierEmilio Segrè","year":"1937"},"Tellurium":{"person":"Franz Joseph Müller von Reichenstein","year":"1782"},"Tennessine":{"person":"Y. T. Oganessian et. al.","year":"2010"},"Terbium":{"person":"Carl Gustaf Mosander","year":"1843"},"Thallium":{"person":"Sir William Crookes","year":"1861"},"Thorium":{"person":"Jöns Jacob Berzelius","year":"1828"},"Thulium":{"person":"Per Theodor Cleve","year":"1879"},"Tin":{"person":"Known since ancient times","year":"?"},"Titanium":{"person":"The Reverend William Gregor","year":"1791"},"Tungsten":{"person":"Juan JoséFausto Elhuyar","year":"1783"},"Uranium":{"person":"Martin Heinrich Klaproth","year":"1789"},"Vanadium":{"person":"Andrés Manuel del RioNils Gabriel Sefstrôm","year":"18011830"},"Xenon":{"person":"Sir William RamsayMorris M. Travers","year":"1898"},"Ytterbium":{"person":"Jean Charles Galissard de Marignac","year":"1878"},"Yttrium":{"person":"Johan Gadolin","year":"1789"},"Zinc":{"person":"Known since ancient times","year":"?"},"Zirconium":{"person":"Martin Heinrich Klaproth","year":"1789"}, "Flourine": {"person": "Henri Moissan", "year": "1886"}, "Caesium": {"person": "Robert Bunsen & Gustav Kirchhoff", "year": "1860"}};
// {"Actinium":"André-Louis Debierne","Aluminum":"Hans Christian Oersted","Americium":"Glenn T. SeaborgRalph A. JamesLeon O. MorganAlbert Ghiorso","Argon":"Sir William RamsayLord Rayleigh","Astatine":"Dale R. CarsonK.R. MacKenzieEmilio Segrè","Barium":"Sir Humphry Davy","Berkelium":"Stanley G. ThompsonGlenn T. SeaborgKenneth Street, Jr.Albert Ghiorso","Beryllium":"Louis-Nicholas Vauquelin","Bismuth":"Claude Geoffroy the Younger","Bohrium":"Scientists at Dubna, Russia","Boron":"Joseph-Louis Gay-LussacLouis-Jaques ThénardSir Humphry Davy","Bromine":"Antoine-Jérôme Balard","Cadmium":"Friedrich Strohmeyer","Calcium":"Sir Humphry Davy","Californium":"Stanley G. ThompsonGlenn T. SeaborgKenneth Street, Jr.Albert Ghiorso","Cerium":"Jöns Jacob BerzeliusWilhelm von HisingerMartin Heinrich Klaproth","Cesium":"Robert Wilhelm BunsenGustav Robert Kirchoff","Chlorine":"Carl Wilhelm Scheele","Chromium":"Louis-Nicholas Vauquelin","Cobalt":"Georg Brandt","Copernicium":"Peter ArmbrusterGottfried Münzenber","Curium":"Glenn T. SeaborgRalph A. JamesAlbert Ghiorso","Darmstadtium":"Peter ArmbrusterGottfried Münzenber","Dubnium":"Scientists at Dubna, RussiaLawrence Berkeley Laboratory","Dysprosium":"Paul-Émile Lecoq de Boisbaudran","Einsteinium":"Albert Ghiorso et. al.","Erbium":"Carl Gustaf Mosander","Europium":"Eugène-Antole Demarçay","Fermium":"Albert Ghiorso et. al.","Flerovium":"Scientists at Dubna, Russia withScientists from Lawrence Livermore National Laboratory","Fluorine":"Ferdinand Frederic Henri Moissan","Francium":"Marguerite Catherine Perey","Gadolinium":"Jean Charles Galissard de Marignac","Gallium":"Paul-Émile Lecoq de Boisbaudran","Germanium":"Clemens Winkler","Hafnium":"Dirk CosterCharles de Hevesy","Hassium":"Peter ArmbrusterGottfried Münzenber","Helium":"Pierre-Jules-César Janssen","Holmium":"Per Theodor Cleve","Hydrogen":"Henry Cavendish","Indium":"Ferdinand ReichHieronymus Theodor Richter","Iodine":"Barnard Courtois","Iridium":"Smithson Tennant","Krypton":"Sir William RamsayMorris M. Travers","Lanthanum":"Carl Gustaf Mosander","Lawrencium":"Albert GhiorsoTorbjørn SikkelandAlmon E. LarshRobert M. Latimer","Lithium":"Johann August Arfvedson","Livermorium":"Scientists at Dubna, Russia withScientists from Lawrence Livermore National Laboratory","Lutetium":"Georges Urbain","Magnesium":"Sir Humphry Davy","Manganese":"Johan Gottlieb Gahn","Meitnerium":"Peter ArmbrusterGottfried Münzenber","Mendelevium":"Stanley G. ThompsonGlenn T. SeaborgBernard G. HarveyGregory R. ChoppinAlbert Ghiorso","Molybdenum":"Carl Welhelm Scheele","Moscovium":"Y. T. Oganessian et. al.","Neodymium":"Carl F. Auer von Welsbach","Neon":"Sir William RamsayMorris M. Travers","Neptunium":"Edwin M. McMillianPhilip H. Abelson","Nickel":"Axel Fredrik Cronstedt","Nihonium":"Y. T. Oganessian et. al.","Niobium":"Charles Hatchett","Nitrogen":"Daniel Rutherford","Nobelium":"Albert GhiorsoGlenn T. SeaborgTorbørn SikkelandJohn R. Walton","Oganesson":"Y. T. Oganessian et. al.","Osmium":"Smithson Tennant","Oxygen":"Joseph Priestley","Palladium":"William Hyde Wollaston","Phosphorus":"Hennig Brand","Plutonium":"Glenn T. SeaborgJoseph W. KennedyEdward M. McMillanArthur C. Wohl","Polonium":"Marie Sklodowska Curie","Potassium":"Sir Humphry Davy","Praseodymium":"Carl F. Auer von Welsbach","Promethium":"Jacob A. MarinskyLawrence E. GlendeninCharles D. Coryell","Protactinium":"Kasimir FajansO.H. Göhring","Radium":"Marie Sklodowska CuriePierre Curie","Radon":"Friedrich Ernst Dorn","Rhenium":"Ida Tacke-NoddackWalter NoddackOtto Carl Berg","Rhodium":"William Hyde Wollaston","Roentgenium":"Peter ArmbrusterGottfried Münzenber","Rubidium":"Robert BunsenGustav Kirchhoff","Ruthenium":"Karl Karlovich Klaus","Rutherfordium":"Scientists at Dubna, RussiaAlbert Ghiorso et. al.","Samarium":"Jean Charles Galissard de Marignac","Scandium":"Lars Fredrik Nilson","Seaborgium":"Albert Ghiorso et. al.","Selenium":"Jöns Jacob Berzelius","Silicon":"Jöns Jacob Berzelius","Sodium":"Sir Humphry Davy","Strontium":"Adair Crawford","Tantalum":"Anders Gustaf Ekenberg","Technetium":"Carlo PerrierEmilio Segrè","Tellurium":"Franz Joseph Müller von Reichenstein","Tennessine":"Y. T. Oganessian et. al.","Terbium":"Carl Gustaf Mosander","Thallium":"Sir William Crookes","Thorium":"Jöns Jacob Berzelius","Thulium":"Per Theodor Cleve","Titanium":"The Reverend William Gregor","Tungsten":"Juan JoséFausto Elhuyar","Uranium":"Martin Heinrich Klaproth","Vanadium":"Andrés Manuel del RioNils Gabriel Sefstrôm","Xenon":"Sir William RamsayMorris M. Travers","Ytterbium":"Jean Charles Galissard de Marignac","Yttrium":"Johan Gadolin","Zirconium":"Martin Heinrich Klaproth","Flourine":"Henri Moissan","Caesium":"Robert Bunsen & Gustav Kirchhoff"}

const synthetic_elements = ["Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium","Darmstadtium","Roentgenium","Copernicium","Nihonium","Flerovium","Moscovium","Livermorium","Tennessine","Oganesson"];
var main_coloring_numbers = {
    "noble_gas": [2, 10, 18, 36, 54, 86],
    "non_metal": [1, 6, 7, 8, 9, 15, 16, 17, 34, 35, 53],
    "metaloid": [5, 14, 32, 33, 51, 52],
    "unkown": [109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
    "metal": []
}
var main_coloring_colors = {
    "noble_gas": "222,22,135",
    "non_metal": "30,150,255",
    "metaloid": "30,220,150",
    "unkown": "155,160,165",
    "metal": "30,235,70"
}
for (const key_item in main_coloring_colors) {
    color = main_coloring_colors[key_item]

}
var selected_element = elements[0];
selected_element.classList.toggle("selected");

update_elements();

document.addEventListener("DOMContentLoaded", function(){
    elements.forEach(element => {
        let number = parseInt(element.getAttribute("data-atomic-number"));
        let real_mass = element_masses[number];
        if (Array.isArray(real_mass) === true) {
            real_mass = real_mass[0];
        }
        if (isInDictLists(main_coloring_numbers, number) === false) {
            main_coloring_numbers.metal.push(number);
        }
        for (const key in main_coloring_numbers) {
            if (main_coloring_numbers[key].includes(number) === true) {
                element.style.background = `rgb(${main_coloring_colors[key]})`;
            }
        }
        element.setAttribute("data-atomic-mass", real_mass);
        element.addEventListener('click', function() {
            children = infoBulletsList.querySelectorAll("li");
            for (let i=0; i<children.length; i++) {
                infoBulletsList.removeChild(children[i]);
            }
            // Show additional information
            const name = this.getAttribute('data-name');
            const symbol = this.getAttribute('data-symbol');
            const distribution = electronDistrobution(number);
            let distribution_split = distribution.split("<sub>");
            let valence = (distribution_split[distribution_split.length-1]).slice(0,-6);
            let discovered_info = elements_discovered[name];
            let year = discovered_info["year"];
            let scientist = discovered_info["person"]
            let synthetic = false;
            let numNeutrons = Math.round(real_mass) - number;
            synthetic_elements.forEach(s => {
                if (s === name) {
                    synthetic = true;
                }
            })
            var category = "";
            for (const key in main_coloring_numbers) {
                if (main_coloring_numbers[key].includes(number) === true) {
                    category = key
                    break;
                }
            }
            create_bullet(`<b>Category:</b> ${category}`)
            create_bullet(`<b>Atomic Mass:</b> ${real_mass}`);
            create_bullet(`<b># of Neutrons:</b> ${numNeutrons}`)
            create_bullet(`<b>Electron Distribution:</b> ${distribution}`);
            create_bullet(`<b>Valence Electrons:</b> ${valence}`)
            create_bullet(`<b>Scientist who Discovered:</b> ${scientist}`)
            create_bullet(`<b>Year Discovered:</b> ${year}`)
            create_bullet(`<b>Is Sythetic:</b> ${synthetic}`);

            infoDivNameSpan.textContent = name;
            infoDivSymbol.textContent = symbol;

            selected_element.classList.toggle("selected");
            selected_element = this;
            selected_element.classList.toggle("selected");
        });
        let mass = parseFloat(element.getAttribute('data-atomic-mass')).toFixed(2);
        mass = String(mass)
        while (mass.endsWith("0")) {
            mass = mass.slice(0, -1);
        }
        if (mass.endsWith(".")) {
            mass = mass.slice(0, -1);
        }
        element.querySelector('.mass').textContent = mass;
    });
    update_elements_width();
    selected_element.click()
    decimalInput.addEventListener('input', function() {
        var decimalPlaces = this.value;
        var max_places = parseInt(this.getAttribute("max"));
        if (decimalPlaces < 0) {
            decimalPlaces = 0;
            this.value = decimalPlaces;
        }
        if (decimalPlaces > max_places) {
            decimalPlaces = max_places;
            this.value = decimalPlaces;
        }
        elements.forEach(element => {
            let mass = parseFloat(element.getAttribute('data-atomic-mass')).toFixed(decimalPlaces);
            mass = String(mass)
            while (mass.endsWith("0")) {
                mass = mass.slice(0, -1);
            }
            if (mass.endsWith(".")) {
                mass = mass.slice(0, -1);
            }
            element.querySelector('.mass').textContent = mass;
        });
        update_elements_width();
    });
});
