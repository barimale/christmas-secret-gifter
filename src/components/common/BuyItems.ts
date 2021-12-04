export type ItemDetails = {
    img: Array<string>;
    title: string;
    shortDescription: string;
    price: number;
    priceDescription: string;
    description: string;
    id: string;
    categoryId: string;
    isPhysicalItem: boolean;
    inFuture: boolean;
}

export type CategoryType = {
    id: string;
    title: string;
}

export const GetIdBybCategoryTitle = (title: string): string =>{
    const index = Categories.findIndex((p: CategoryType) => p.title === title);
    if(index > -1){
        return Categories[index].id;
    }else{
        return "";
    }
}

export const Categories: Array<CategoryType> = [
    {
        id: "jestem-kobieta",
        title: "Jestem Kobietą"
    },
    {
        id: "grupy-rozwojowe",
        title: "Grupy Rozwojowe"
    },
    {
        id: "tus",
        title: "TUS"
    }
]

export const tileData: Array<ItemDetails> = [
    {
        inFuture: false,
        img: ['/jk/14m.jpg','/jk/9m.jpg','/jk/3m.jpg','/jk/28m.jpg','/jk/89m.jpg','/jk/jkrm.jpg'],
        title: 'Karty rozwojowe „odkrywam. Jestem Kobietą”',
        shortDescription: 'Zestaw kart „odkrywam. Jestem Kobietą”:\nTalia 90 kart w rozmiarze 10cm x 15cm, o gramaturze 300g, folia matowa, zaokrąglone rogi.\nPrzewodnik w rozmiarze A6 do pracy z kartami z instrukcją, przykładowymi pytaniami do pracy z fotografią, a także cytatami.\nCałość zapakowana w elegancki, welurowy worek. ',
        price: 320,
        priceDescription: "",
        description: "Karty rozwojowe „odkrywam. Jestem Kobietą” powstały z potrzeby wyrażenia siebie i na skutek wielkiej Rewolucji w życiu – udziału w Szkole Odwagi Jesteś Rewolucją <a href='https://szkolaodwagi.pl/' target='_blank'>Magdy Kluszczyk</a>. \n\nCzym są karty „odkrywam. Jestem Kobietą”?\nKarty rozwojowe „odkrywam. Jestem Kobietą” to talia 90 kart. Z wielu setek wspaniałych fotografii wybrałam 90, które w wyjątkowy sposób przedstawiają kobiety.\nChciałabym, żeby karty mogły być dobrym pretekstem do pracy w takich obszarach jak tożsamość, przekonania, ciało, relacje i emocje.\n\nGdzie można wykorzystać karty?\nSkierowane są do coachów, trenerów, terapeutów, a także do wszystkich kobiet pragnących zmiany i pracy nad sobą. ",
        id: "1",
        categoryId: Categories[0].id,
        isPhysicalItem: true
    },
    {
        inFuture: false,
        img: ['/jk/3m.jpg','/jk/9m.jpg','/jk/14m.jpg','/jk/28m.jpg','/jk/89m.jpg','/jk/jkrm.jpg'],
        title: 'Karty rozwojowe „odkrywam. Jestem Kobietą” - wersja elektroniczna',
        shortDescription: 'Zestaw  90 kart „odkrywam. Jestem Kobietą” w wersji jpg. Przewodnik w rozmiarze A6 do pracy z kartami z instrukcją, przykładowymi pytaniami do pracy z fotografią, a także cytatami w formacie pdf.',
        price: 120,
        priceDescription: "",
        description: "Karty rozwojowe „odkrywam. Jestem Kobietą” powstały z potrzeby wyrażenia siebie i na skutek wielkiej Rewolucji w życiu – udziału w Szkole Odwagi Jesteś Rewolucją <a href='https://szkolaodwagi.pl/' target='_blank'>Magdy Kluszczyk</a>. \n\nCzym są karty „odkrywam. Jestem Kobietą”?\nKarty rozwojowe „odkrywam. Jestem Kobietą” to talia 90 kart. Z wielu setek wspaniałych fotografii wybrałam 90, które w wyjątkowy sposób przedstawiają kobiety.\nChciałabym, żeby karty mogły być dobrym pretekstem do pracy w takich obszarach jak tożsamość, przekonania, ciało, relacje i emocje.\n\nGdzie można wykorzystać karty?\nSkierowane są do coachów, trenerów, terapeutów, a także do wszystkich kobiet pragnących zmiany i pracy nad sobą. ",
        id: "2",
        categoryId: Categories[0].id,
        isPhysicalItem: false
    },
    {
        inFuture: false,
        img: ['/jk/9m.jpg','/jk/3m.jpg','/jk/14m.jpg','/jk/28m.jpg','/jk/89m.jpg','/jk/jkrm.jpg'],
        title: 'Indywidualne spotkanie online z kartami rozwojowymi „odkrywam. Jestem Kobietą”',
        shortDescription: 'Spotkanie 60 – minutowe, online. Termin i zakres tematu do uzgodnienia.',
        price: 100,
        priceDescription: "",
        description: "Zapraszam Cię na spotkanie ze mną.\n\n Jeżeli jesteś coachem, trenerem i chciałabyś zapytać mnie o szczegóły tworzenia, ideę pracy z kartami to zaproszenie jest dla Ciebie. Jeżeli jesteś kobietą, która chce doświadczyć procesu odkrywania, zaglądania w głąb siebie, to zaproszenie jest dla Ciebie. Jeżeli chciałabyś kupić karty, ale nie masz pewności, czy to właściwy wybór, chciałabyś pogadać, spróbować pobyć z kartami w wersji online, to zaproszenie jest dla Ciebie.",
        id: "3",
        categoryId: Categories[0].id,
        isPhysicalItem: false
    },
    {
        inFuture: false,
        img: ['/jk/89m.jpg','/jk/9m.jpg','/jk/3m.jpg','/jk/28m.jpg','/jk/14m.jpg','/jk/jkrm.jpg'],
        title: 'Pakiet: Karty rozwojowe „odkrywam. Jestem Kobietą” + wersja elektroniczna',
        shortDescription: 'Zestaw kart „odkrywam. Jestem Kobietą”:\nTalia 90 kart w formacie jpg oraz w rozmiarze 10cm x 15cm, o gramaturze 300g, folia matowa, zaokrąglone rogi.\nPrzewodnik w rozmiarze A6 do pracy z kartami z instrukcją, przykładowymi pytaniami do pracy z fotografią, a także cytatami.\nCałość zapakowana w elegancki, welurowy worek. ',
        price: 350,
        priceDescription: "",
        description: "Karty rozwojowe „odkrywam. Jestem Kobietą” powstały z potrzeby wyrażenia siebie i na skutek wielkiej Rewolucji w życiu – udziału w Szkole Odwagi Jesteś Rewolucją <a href='https://szkolaodwagi.pl/' target='_blank'>Magdy Kluszczyk</a>. \n\nCzym są karty „odkrywam. Jestem Kobietą”?\nKarty rozwojowe „odkrywam. Jestem Kobietą” to talia 90 kart. Z wielu setek wspaniałych fotografii wybrałam 90, które w wyjątkowy sposób przedstawiają kobiety.\nChciałabym, żeby karty mogły być dobrym pretekstem do pracy w takich obszarach jak tożsamość, przekonania, ciało, relacje i emocje.\n\nGdzie można wykorzystać karty?\nSkierowane są do coachów, trenerów, terapeutów, a także do wszystkich kobiet pragnących zmiany i pracy nad sobą. ",
        id: "4",
        categoryId: Categories[0].id,
        isPhysicalItem: true
    },
    {
        inFuture: true,
        img: ['/tus/1.jpg', '/tus/2.jpg', '/tus/3.jpg','/tus/4.jpg'],
        title: 'TUS: Trening Umiejętności Społecznych',
        description: `
            <b>TRENING UMIEJĘTNOŚCI SPOŁECZNYCH</b> to zajęcia grupowe przeznaczone dla dzieci, które pragną wzmocnić swoje umiejętności w zakresie kompetencji społecznych.<br/>
            <b>Dla kogo?</b>
            Zajęcia grupowe (o liczebności do 6 osób dla dzieci mających trudności w relacjach społecznych.
            Proponowane są szczególnie osobom:<ul><li>z trudnościami adaptacyjnymi,</li>
                <li>wrażliwym, nieśmiałym,</li>
                <li>z zaburzeniami ze spektrum autyzmu (ASD) w tym z diagnozą Zespołu Aspergera (ZA),</li>
                <li>narażonym na codzienny stres, frustrację i lęk w kontekście interakcji społecznych.</li></ul>Nabór do grupy przebiega w oparciu o charakter wyzwań rozwojowych dziecka. Grupy są dobierane także według kryterium wieku.`,
        price: 50,
        priceDescription: "Cena pojedynczych zajęć wynosi 60zł za 45 minut w grupie 6 - osobowej. Rodzic deklaruje udział dziecka w cyklu zajęć (10 spotkań) poprzez podpisanie umowy. Płatności za zajęcia można dokonać z góry lub w trzech ratach. ",
        shortDescription: `
        <b>Tematyka zajęć:</b><ul><li>przebieg zajęć  jasna, określona struktura, zapewniająca poczucie bezpieczeństwa,</li>
            <li>stałe elementy – powitanie, pożegnanie, czas na wyciszenie, pracę z emocjami, zabawę - elementy te są uzależnione od danej grupy, bo każdy program jest dostosowany indywidualnie do potrzeb uczestników,</li>
            <li>pierwsze dwa zajęcia są o charakterze adaptacyjno - zapoznawczym, ( poznajemy zasady uczestnictwa oraz nawiązujemy relacje z prowadzącym i innymi uczestnikami),</li>
            <li>kolejne spotkania dotyczą takich tematów jak: Samowiedza, Emocje, Umiejętności Społeczne.</li></ul>Bardzo ważna jest diagnoza dziecka i określenie, nad jakimi obszarami należy pracować. 
            W zależności od profilu wyzwań, z jakimi mierzy się grupa, tematyka dostosowana jest do potrzeb dzieci, a techniki pracy zindywidualizowane pod kątem każdego uczestnika. Jednak w Treningu Umiejętności Społecznych bardzo istotne są samopoznanie i samoświadomość dziecka (w tym zakres wiedzy o funkcjonowaniu zmysłów). Obszar samowiedzy stanowi podstawę do kolejnych działań dotyczących rozwoju emocjonalnego. Podczas spotkań dotyczących pracy  z emocjami uczestnicy mają możliwość w praktyce doświadczać, przeżywać i nazywać własne emocje w bezpiecznych warunkach, aby umieć wykorzystać tę wiedzę i doświadczenie poza salą zajęciową. Samowiedza i emocje mają ogromne znaczenie w rozwoju umiejętności społecznych, dlatego trzeci zakres tematyczny obejmuje właśnie rozwój tych kompetencji. Cykl zajęć kończy się ewaluacją i zamknięciem procesu grupowego.
            <br/><b>ZAPRASZAM DO KONTAKTU</b>
        `,
        id: "13",
        categoryId: Categories[2].id,
        isPhysicalItem: false
    },
    {
        inFuture: true,
        img: ['/groups/1.jpg', '/groups/2.jpg', '/groups/3.jpg','/groups/4.jpg'],
        title: 'GRUPY ROZWOJOWE',
        description: `
            Prowadzę grupy rozwojowe kobiet o różnej tematyce (Podróż Bohaterki, Poznaję emocje, Jak pokonać perfekcjonizm i wiele innych).<br/>
            <b>PODRÓŻ BOHATERKI:</b> <br/>to sześciotygodniowy proces, cykl cotygodniowych spotkań, podczas których wyruszę z Tobą w podróż w głąb siebie.<br/>
            <b>TEMATYKA:</b>
            Podczas warsztatowej pracy dowiesz się o wpływie przekonań na Twoje decyzje i działania.<br/>
            Dzięki pracy z fotografią odkryjesz swoje prawdziwe emocje, pragnienia i potrzeby.<br/>
            <b>GRUPA:</b>
            W pięcioosobowej grupie Wspaniałych Kobiet poczujesz moc i siłę, będziesz mogła czerpać energię, a także dzielić się swoją historią.<br/>
            <b>NARZĘDZIA:</b>
            W procesie będziemy pracować przy pomocy fotografii, kart rozwojowych, mapy myśli. Zaproszę Cię także do robienia i wykorzystywania własnych fotografii.<br/>
            <b>POZNAJĘ EMOCJĘ:</b>
            To warsztatowy cykl spotkań, podczas których uczymy się świadomie nazywać i doświadczać emocji. W pracy z emocjami towarzyszy nam fotografia i moje autorskie karty rozwojowe Odkrywam. Jestem Kobietą.<br/>
            <b>JAK POKONAĆ PERFEKCJONIZM:</b>
            To cykl spotkań, podczas których nauczysz się sobie wybaczać, odpuszczać i kochać swoje (nie)doskonałe życie. To także praca  ze wstydem i odwagą.<br/>
            Jeżeli jesteś zainteresowana ofertą warsztatów lub indywidualnych spotkań, zapraszam do kontaktu.`,
        price: 0,
        priceDescription: "",
        shortDescription: `
            Warsztaty prowadzę w grupie 5 – 8 osobowej.
        `,
        id: "144",
        categoryId: Categories[1].id,
        isPhysicalItem: false
    }
 ];