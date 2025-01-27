export const permissions = [
  {
    name: "NONE",
    description: "no access to the associated model",
  },
  {
    name: "READ",
    description: "can view instances of the associated model",
  },
  {
    name: "WRITE",
    description: "can create or modify instances of the associated model",
  },
  {
    name: "MANAGE",
    description:
      "can perform all actions related to the associated model, including viewing, creating, editing, and deleting instances",
  },
] as const;

export const models = [
  {
    name: "GROUP",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "USER",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "CAMERA",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "ANALYSE",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "ALERT",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "VIDEO",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "HISTORY",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "LOG",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "DASHBOARD",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    name: "WORKFLOW",
    description:
      "lorum ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
] as const;

export const groupTypes = [
  "COUNTRY",
  "REGION",
  "CITY",
  "SITE",
  "AREA",
] as const;

export const colors = [
  "#ED4245",
  "#F47B67",
  "#EF8843",
  "#FBB848",
  "#3BA561",
  "#45DDC0",
  "#216ADD",
  "#5865F2",
  "#949CF7",
  "#9C84EF",
  "#FF6BFA",
  "#FFB0FF",
  "#EB459F",
  "#99AAB5",
];

export const regionsOptions = [
  {
    id: "1",
    region: "Tanger-Tétouan-Al Hoceïma",
  },
  {
    id: "2",
    region: "l'Oriental",
  },
  {
    id: "3",
    region: "Fès-Meknès",
  },
  {
    id: "4",
    region: "Rabat-Salé-Kénitra",
  },
  {
    id: "5",
    region: "Béni Mellal-Khénifra",
  },
  {
    id: "6",
    region: "Casablanca-Settat",
  },
  {
    id: "7",
    region: "Marrakech-Safi",
  },
  {
    id: "8",
    region: "Drâa-Tafilalet",
  },
  {
    id: "9",
    region: "Souss-Massa",
  },
  {
    id: "10",
    region: "Guelmim-Oued Noun",
  },
  {
    id: "11",
    region: "Laâyoune-Sakia El Hamra",
  },
  {
    id: "12",
    region: "Dakhla-Oued Ed Dahab",
  },
];

export const citiesOptions = [
  {
    id: "0",
    ville: "Afourar",
    region: "5",
  },
  {
    id: "1",
    ville: "Agadir",
    region: "9",
  },
  {
    id: "2",
    ville: "Agdz",
    region: "8",
  },
  {
    id: "3",
    ville: "Aghbala",
    region: "5",
  },
  {
    id: "4",
    ville: "Agni Izimmer",
    region: "9",
  },
  {
    id: "5",
    ville: "Agourai",
    region: "3",
  },
  {
    id: "6",
    ville: "Ahfir",
    region: "2",
  },
  {
    id: "7",
    ville: "Ain El Aouda",
    region: "4",
  },
  {
    id: "8",
    ville: "Ain Taoujdate",
    region: "3",
  },
  {
    id: "9",
    ville: "Ait Daoud",
    region: "7",
  },
  {
    id: "10",
    ville: "Ajdir",
    region: "1",
  },
  {
    id: "11",
    ville: "Akchour",
    region: "1",
  },
  {
    id: "12",
    ville: "Akka",
    region: "9",
  },
  {
    id: "13",
    ville: "Aklim",
    region: "2",
  },
  {
    id: "14",
    ville: "Aknoul",
    region: "3",
  },
  {
    id: "15",
    ville: "Al Aroui",
    region: "2",
  },
  {
    id: "16",
    ville: "Al Hoceïma",
    region: "1",
  },
  {
    id: "17",
    ville: "Alnif",
    region: "8",
  },
  {
    id: "18",
    ville: "Amalou Ighriben",
    region: "5",
  },
  {
    id: "19",
    ville: "Amizmiz",
    region: "7",
  },
  {
    id: "20",
    ville: "Anzi",
    region: "9",
  },
  {
    id: "21",
    ville: "Aoufous",
    region: "8",
  },
  {
    id: "22",
    ville: "Aoulouz",
    region: "9",
  },
  {
    id: "23",
    ville: "Aourir",
    region: "9",
  },
  {
    id: "24",
    ville: "Arazane",
    region: "9",
  },
  {
    id: "25",
    ville: "Arbaoua",
    region: "4",
  },
  {
    id: "26",
    ville: "Arfoud",
    region: "8",
  },
  {
    id: "27",
    ville: "Assa",
    region: "10",
  },
  {
    id: "28",
    ville: "Assahrij",
    region: "7",
  },
  {
    id: "29",
    ville: "Assilah",
    region: "1",
  },
  {
    id: "30",
    ville: "Awsard",
    region: "12",
  },
  {
    id: "31",
    ville: "Azemmour",
    region: "6",
  },
  {
    id: "32",
    ville: "Azilal",
    region: "5",
  },
  {
    id: "33",
    ville: "Azrou",
    region: "3",
  },
  {
    id: "34",
    ville: "Aïn Bni Mathar",
    region: "2",
  },
  {
    id: "35",
    ville: "Aïn Cheggag",
    region: "3",
  },
  {
    id: "36",
    ville: "Aïn Dorij",
    region: "1",
  },
  {
    id: "37",
    ville: "Aïn Erreggada",
    region: "2",
  },
  {
    id: "38",
    ville: "Aïn Harrouda",
    region: "6",
  },
  {
    id: "39",
    ville: "Aïn Jemaa",
    region: "3",
  },
  {
    id: "40",
    ville: "Aïn Karma",
    region: "3",
  },
  {
    id: "41",
    ville: "Aïn Leuh",
    region: "3",
  },
  {
    id: "42",
    ville: "Aït Attab",
    region: "5",
  },
  {
    id: "43",
    ville: "Aït Baha",
    region: "9",
  },
  {
    id: "44",
    ville: "Aït Boubidmane",
    region: "3",
  },
  {
    id: "45",
    ville: "Aït Hichem",
    region: "1",
  },
  {
    id: "46",
    ville: "Aït Iaâza",
    region: "9",
  },
  {
    id: "47",
    ville: "Aït Ishaq",
    region: "5",
  },
  {
    id: "48",
    ville: "Aït Majden",
    region: "5",
  },
  {
    id: "49",
    ville: "Aït Melloul",
    region: "9",
  },
  {
    id: "50",
    ville: "Aït Ourir",
    region: "7",
  },
  {
    id: "51",
    ville: "Aït Yalla",
    region: "8",
  },
  {
    id: "52",
    ville: "Bab Berred",
    region: "1",
  },
  {
    id: "53",
    ville: "Bab Taza",
    region: "1",
  },
  {
    id: "54",
    ville: "Bejaâd",
    region: "5",
  },
  {
    id: "55",
    ville: "Ben Ahmed",
    region: "6",
  },
  {
    id: "56",
    ville: "Ben Guerir",
    region: "7",
  },
  {
    id: "57",
    ville: "Ben Sergao",
    region: "9",
  },
  {
    id: "58",
    ville: "Ben Taïeb",
    region: "2",
  },
  {
    id: "59",
    ville: "Ben Yakhlef",
    region: "6",
  },
  {
    id: "60",
    ville: "Beni Ayat",
    region: "5",
  },
  {
    id: "61",
    ville: "Benslimane",
    region: "6",
  },
  {
    id: "62",
    ville: "Berkane",
    region: "2",
  },
  {
    id: "63",
    ville: "Berrechid",
    region: "6",
  },
  {
    id: "64",
    ville: "Bhalil",
    region: "3",
  },
  {
    id: "65",
    ville: "Bin elouidane",
    region: "5",
  },
  {
    id: "66",
    ville: "Biougra",
    region: "9",
  },
  {
    id: "67",
    ville: "Bir Jdid",
    region: "6",
  },
  {
    id: "68",
    ville: "Bni Ansar",
    region: "2",
  },
  {
    id: "69",
    ville: "Bni Bouayach",
    region: "1",
  },
  {
    id: "70",
    ville: "Bni Chiker",
    region: "2",
  },
  {
    id: "71",
    ville: "Bni Drar",
    region: "2",
  },
  {
    id: "72",
    ville: "Bni Hadifa",
    region: "1",
  },
  {
    id: "73",
    ville: "Bni Tadjite",
    region: "2",
  },
  {
    id: "74",
    ville: "Bouanane",
    region: "2",
  },
  {
    id: "75",
    ville: "Bouarfa",
    region: "2",
  },
  {
    id: "76",
    ville: "Boudnib",
    region: "8",
  },
  {
    id: "77",
    ville: "Boufakrane",
    region: "3",
  },
  {
    id: "78",
    ville: "Bouguedra",
    region: "7",
  },
  {
    id: "79",
    ville: "Bouhdila",
    region: "2",
  },
  {
    id: "80",
    ville: "Bouizakarne",
    region: "10",
  },
  {
    id: "81",
    ville: "Boujdour",
    region: "11",
  },
  {
    id: "82",
    ville: "Boujniba",
    region: "5",
  },
  {
    id: "83",
    ville: "Boulanouare",
    region: "5",
  },
  {
    id: "84",
    ville: "Boulemane",
    region: "3",
  },
  {
    id: "85",
    ville: "Boumalne-Dadès",
    region: "8",
  },
  {
    id: "86",
    ville: "Boumia",
    region: "8",
  },
  {
    id: "87",
    ville: "Bouskoura",
    region: "6",
  },
  {
    id: "88",
    ville: "Bouznika",
    region: "6",
  },
  {
    id: "89",
    ville: "Bradia",
    region: "5",
  },
  {
    id: "90",
    ville: "Brikcha",
    region: "1",
  },
  {
    id: "91",
    ville: "Bzou",
    region: "5",
  },
  {
    id: "92",
    ville: "Béni Mellal",
    region: "5",
  },
  {
    id: "93",
    ville: "Casablanca",
    region: "6",
  },
  {
    id: "94",
    ville: "Chefchaouen",
    region: "1",
  },
  {
    id: "95",
    ville: "Chichaoua",
    region: "7",
  },
  {
    id: "96",
    ville: "Dar Bni Karrich",
    region: "1",
  },
  {
    id: "97",
    ville: "Dar Chaoui",
    region: "1",
  },
  {
    id: "98",
    ville: "Dar El Kebdani",
    region: "2",
  },
  {
    id: "99",
    ville: "Dar Gueddari",
    region: "4",
  },
  {
    id: "100",
    ville: "Dar Oulad Zidouh",
    region: "5",
  },
  {
    id: "101",
    ville: "Dcheira El Jihadia",
    region: "9",
  },
  {
    id: "102",
    ville: "Debdou",
    region: "2",
  },
  {
    id: "103",
    ville: "Demnate",
    region: "5",
  },
  {
    id: "104",
    ville: "Deroua",
    region: "6",
  },
  {
    id: "105",
    ville: "Douar Kannine",
    region: "2",
  },
  {
    id: "106",
    ville: "Dra'a",
    region: "8",
  },
  {
    id: "107",
    ville: "Drargua",
    region: "9",
  },
  {
    id: "108",
    ville: "Driouch",
    region: "2",
  },
  {
    id: "109",
    ville: "Echemmaia",
    region: "7",
  },
  {
    id: "110",
    ville: "El Aïoun Sidi Mellouk",
    region: "2",
  },
  {
    id: "111",
    ville: "El Borouj",
    region: "6",
  },
  {
    id: "112",
    ville: "El Gara",
    region: "6",
  },
  {
    id: "113",
    ville: "El Guerdane",
    region: "9",
  },
  {
    id: "114",
    ville: "El Hajeb",
    region: "3",
  },
  {
    id: "115",
    ville: "El Hanchane",
    region: "7",
  },
  {
    id: "116",
    ville: "El Jadida",
    region: "6",
  },
  {
    id: "117",
    ville: "El Kelaâ des Sraghna",
    region: "7",
  },
  {
    id: "118",
    ville: "El Ksiba",
    region: "5",
  },
  {
    id: "119",
    ville: "El Marsa",
    region: "11",
  },
  {
    id: "120",
    ville: "El Menzel",
    region: "3",
  },
  {
    id: "121",
    ville: "El Ouatia",
    region: "10",
  },
  {
    id: "122",
    ville: "Elkbab",
    region: "5",
  },
  {
    id: "123",
    ville: "Er-Rich",
    region: "5",
  },
  {
    id: "124",
    ville: "Errachidia",
    region: "8",
  },
  {
    id: "125",
    ville: "Es-Semara",
    region: "11",
  },
  {
    id: "126",
    ville: "Essaouira",
    region: "7",
  },
  {
    id: "127",
    ville: "Fam El Hisn",
    region: "9",
  },
  {
    id: "128",
    ville: "Farkhana",
    region: "2",
  },
  {
    id: "129",
    ville: "Figuig",
    region: "2",
  },
  {
    id: "130",
    ville: "Fnideq",
    region: "1",
  },
  {
    id: "131",
    ville: "Foum Jamaa",
    region: "5",
  },
  {
    id: "132",
    ville: "Foum Zguid",
    region: "9",
  },
  {
    id: "133",
    ville: "Fquih Ben Salah",
    region: "5",
  },
  {
    id: "134",
    ville: "Fraïta",
    region: "7",
  },
  {
    id: "135",
    ville: "Fès",
    region: "3",
  },
  {
    id: "136",
    ville: "Gardmit",
    region: "8",
  },
  {
    id: "137",
    ville: "Ghafsai",
    region: "3",
  },
  {
    id: "138",
    ville: "Ghmate",
    region: "7",
  },
  {
    id: "139",
    ville: "Goulmima",
    region: "8",
  },
  {
    id: "140",
    ville: "Gourrama",
    region: "8",
  },
  {
    id: "141",
    ville: "Guelmim",
    region: "10",
  },
  {
    id: "142",
    ville: "Guercif",
    region: "2",
  },
  {
    id: "143",
    ville: "Gueznaia",
    region: "1",
  },
  {
    id: "144",
    ville: "Guigou",
    region: "3",
  },
  {
    id: "145",
    ville: "Guisser",
    region: "6",
  },
  {
    id: "146",
    ville: "Had Bouhssoussen",
    region: "5",
  },
  {
    id: "147",
    ville: "Had Kourt",
    region: "4",
  },
  {
    id: "148",
    ville: "Haj Kaddour",
    region: "3",
  },
  {
    id: "149",
    ville: "Harhoura",
    region: "4",
  },
  {
    id: "150",
    ville: "Harte Lyamine",
    region: "8",
  },
  {
    id: "151",
    ville: "Hattane",
    region: "5",
  },
  {
    id: "152",
    ville: "Hrara",
    region: "7",
  },
  {
    id: "153",
    ville: "Ida Ougnidif",
    region: "9",
  },
  {
    id: "154",
    ville: "Ifrane",
    region: "3",
  },
  {
    id: "155",
    ville: "Ifri",
    region: "8",
  },
  {
    id: "156",
    ville: "Igdamen",
    region: "9",
  },
  {
    id: "157",
    ville: "Ighil n'Oumgoun",
    region: "8",
  },
  {
    id: "158",
    ville: "Ighoud",
    region: "7",
  },
  {
    id: "159",
    ville: "Ighounane",
    region: "8",
  },
  {
    id: "160",
    ville: "Ihddaden",
    region: "2",
  },
  {
    id: "161",
    ville: "Imassine",
    region: "8",
  },
  {
    id: "162",
    ville: "Imintanoute",
    region: "7",
  },
  {
    id: "163",
    ville: "Imouzzer Kandar",
    region: "3",
  },
  {
    id: "164",
    ville: "Imouzzer Marmoucha",
    region: "3",
  },
  {
    id: "165",
    ville: "Imzouren",
    region: "1",
  },
  {
    id: "166",
    ville: "Inahnahen",
    region: "1",
  },
  {
    id: "167",
    ville: "Inezgane",
    region: "9",
  },
  {
    id: "168",
    ville: "Irherm",
    region: "9",
  },
  {
    id: "169",
    ville: "Issaguen (Ketama)",
    region: "1",
  },
  {
    id: "170",
    ville: "Itzer",
    region: "8",
  },
  {
    id: "171",
    ville: "Jamâat Shaim",
    region: "7",
  },
  {
    id: "172",
    ville: "Jaâdar",
    region: "2",
  },
  {
    id: "173",
    ville: "Jebha",
    region: "1",
  },
  {
    id: "174",
    ville: "Jerada",
    region: "2",
  },
  {
    id: "175",
    ville: "Jorf",
    region: "8",
  },
  {
    id: "176",
    ville: "Jorf El Melha",
    region: "4",
  },
  {
    id: "177",
    ville: "Jorf Lasfar",
    region: "6",
  },
  {
    id: "178",
    ville: "Karia",
    region: "3",
  },
  {
    id: "179",
    ville: "Karia (El Jadida)",
    region: "6",
  },
  {
    id: "180",
    ville: "Karia Ba Mohamed",
    region: "3",
  },
  {
    id: "181",
    ville: "Kariat Arekmane",
    region: "2",
  },
  {
    id: "182",
    ville: "Kasba Tadla",
    region: "5",
  },
  {
    id: "183",
    ville: "Kassita",
    region: "2",
  },
  {
    id: "184",
    ville: "Kattara",
    region: "7",
  },
  {
    id: "185",
    ville: "Kehf Nsour",
    region: "5",
  },
  {
    id: "186",
    ville: "Kelaat-M'Gouna",
    region: "8",
  },
  {
    id: "187",
    ville: "Kerouna",
    region: "2",
  },
  {
    id: "188",
    ville: "Kerrouchen",
    region: "5",
  },
  {
    id: "189",
    ville: "Khemis Zemamra",
    region: "6",
  },
  {
    id: "190",
    ville: "Khenichet",
    region: "4",
  },
  {
    id: "191",
    ville: "Khouribga",
    region: "5",
  },
  {
    id: "192",
    ville: "Khémis Sahel",
    region: "1",
  },
  {
    id: "193",
    ville: "Khémisset",
    region: "4",
  },
  {
    id: "194",
    ville: "Khénifra",
    region: "5",
  },
  {
    id: "195",
    ville: "Ksar El Kébir",
    region: "1",
  },
  {
    id: "196",
    ville: "Kénitra",
    region: "4",
  },
  {
    id: "197",
    ville: "Laaounate",
    region: "6",
  },
  {
    id: "198",
    ville: "Laayoune",
    region: "11",
  },
  {
    id: "199",
    ville: "Lakhsas",
    region: "9",
  },
  {
    id: "200",
    ville: "Lakhsass",
    region: "9",
  },
  {
    id: "201",
    ville: "Lalla Mimouna",
    region: "4",
  },
  {
    id: "202",
    ville: "Lalla Takerkoust",
    region: "7",
  },
  {
    id: "203",
    ville: "Larache",
    region: "1",
  },
  {
    id: "204",
    ville: "Laâtamna",
    region: "2",
  },
  {
    id: "205",
    ville: "Loudaya",
    region: "7",
  },
  {
    id: "206",
    ville: "Loulad",
    region: "6",
  },
  {
    id: "207",
    ville: "Lqliâa",
    region: "9",
  },
  {
    id: "208",
    ville: "Lâattaouia",
    region: "7",
  },
  {
    id: "209",
    ville: "M'diq",
    region: "1",
  },
  {
    id: "210",
    ville: "M'haya",
    region: "3",
  },
  {
    id: "211",
    ville: "M'rirt",
    region: "5",
  },
  {
    id: "212",
    ville: "M'semrir",
    region: "8",
  },
  {
    id: "213",
    ville: "Madagh",
    region: "2",
  },
  {
    id: "214",
    ville: "Marrakech",
    region: "7",
  },
  {
    id: "215",
    ville: "Martil",
    region: "1",
  },
  {
    id: "216",
    ville: "Massa (Maroc)",
    region: "9",
  },
  {
    id: "217",
    ville: "Mechra Bel Ksiri",
    region: "4",
  },
  {
    id: "218",
    ville: "Megousse",
    region: "9",
  },
  {
    id: "219",
    ville: "Mehdia",
    region: "4",
  },
  {
    id: "220",
    ville: "Meknès",
    region: "3",
  },
  {
    id: "221",
    ville: "Midar",
    region: "2",
  },
  {
    id: "222",
    ville: "Midelt",
    region: "8",
  },
  {
    id: "223",
    ville: "Missour",
    region: "3",
  },
  {
    id: "224",
    ville: "Mohammadia",
    region: "6",
  },
  {
    id: "225",
    ville: "Moqrisset",
    region: "1",
  },
  {
    id: "226",
    ville: "Moulay Abdallah",
    region: "6",
  },
  {
    id: "227",
    ville: "Moulay Ali Cherif",
    region: "8",
  },
  {
    id: "228",
    ville: "Moulay Bouazza",
    region: "5",
  },
  {
    id: "229",
    ville: "Moulay Bousselham",
    region: "4",
  },
  {
    id: "230",
    ville: "Moulay Brahim",
    region: "7",
  },
  {
    id: "231",
    ville: "Moulay Idriss Zerhoun",
    region: "3",
  },
  {
    id: "232",
    ville: "Moulay Yaâcoub",
    region: "3",
  },
  {
    id: "233",
    ville: "Moussaoua",
    region: "3",
  },
  {
    id: "234",
    ville: "MyAliCherif",
    region: "8",
  },
  {
    id: "235",
    ville: "Mzouda",
    region: "7",
  },
  {
    id: "236",
    ville: "Médiouna",
    region: "6",
  },
  {
    id: "237",
    ville: "N'Zalat Bni Amar",
    region: "3",
  },
  {
    id: "238",
    ville: "Nador",
    region: "2",
  },
  {
    id: "239",
    ville: "Naima",
    region: "2",
  },
  {
    id: "240",
    ville: "Oualidia",
    region: "6",
  },
  {
    id: "241",
    ville: "Ouaouizeght",
    region: "5",
  },
  {
    id: "242",
    ville: "Ouaoumana",
    region: "5",
  },
  {
    id: "243",
    ville: "Ouarzazate",
    region: "8",
  },
  {
    id: "244",
    ville: "Ouazzane",
    region: "1",
  },
  {
    id: "245",
    ville: "Oued Amlil",
    region: "3",
  },
  {
    id: "246",
    ville: "Oued Heimer",
    region: "2",
  },
  {
    id: "247",
    ville: "Oued Ifrane",
    region: "3",
  },
  {
    id: "248",
    ville: "Oued Laou",
    region: "1",
  },
  {
    id: "249",
    ville: "Oued Rmel",
    region: "1",
  },
  {
    id: "250",
    ville: "Oued Zem",
    region: "5",
  },
  {
    id: "251",
    ville: "Oued-Eddahab",
    region: "12",
  },
  {
    id: "252",
    ville: "Oujda",
    region: "2",
  },
  {
    id: "253",
    ville: "Oulad Abbou",
    region: "6",
  },
  {
    id: "254",
    ville: "Oulad Amrane",
    region: "6",
  },
  {
    id: "255",
    ville: "Oulad Ayad",
    region: "5",
  },
  {
    id: "256",
    ville: "Oulad Berhil",
    region: "9",
  },
  {
    id: "257",
    ville: "Oulad Frej",
    region: "6",
  },
  {
    id: "258",
    ville: "Oulad Ghadbane",
    region: "6",
  },
  {
    id: "259",
    ville: "Oulad H'Riz Sahel",
    region: "6",
  },
  {
    id: "260",
    ville: "Oulad M'Barek",
    region: "5",
  },
  {
    id: "261",
    ville: "Oulad M'rah",
    region: "6",
  },
  {
    id: "262",
    ville: "Oulad Saïd",
    region: "6",
  },
  {
    id: "263",
    ville: "Oulad Sidi Ben Daoud",
    region: "6",
  },
  {
    id: "264",
    ville: "Oulad Teïma",
    region: "9",
  },
  {
    id: "265",
    ville: "Oulad Yaich",
    region: "5",
  },
  {
    id: "266",
    ville: "Oulad Zbair",
    region: "3",
  },
  {
    id: "267",
    ville: "Ouled Tayeb",
    region: "3",
  },
  {
    id: "268",
    ville: "Oulmès",
    region: "4",
  },
  {
    id: "269",
    ville: "Ounagha",
    region: "7",
  },
  {
    id: "270",
    ville: "Outat El Haj",
    region: "3",
  },
  {
    id: "271",
    ville: "Point Cires",
    region: "1",
  },
  {
    id: "272",
    ville: "Rabat",
    region: "4",
  },
  {
    id: "273",
    ville: "Ras El Aïn",
    region: "6",
  },
  {
    id: "274",
    ville: "Ras El Ma",
    region: "2",
  },
  {
    id: "275",
    ville: "Ribate El Kheir",
    region: "3",
  },
  {
    id: "276",
    ville: "Rissani",
    region: "8",
  },
  {
    id: "277",
    ville: "Rommani",
    region: "4",
  },
  {
    id: "278",
    ville: "Sabaa Aiyoun",
    region: "3",
  },
  {
    id: "279",
    ville: "Safi",
    region: "7",
  },
  {
    id: "280",
    ville: "Salé",
    region: "4",
  },
  {
    id: "281",
    ville: "Sarghine",
    region: "8",
  },
  {
    id: "282",
    ville: "Saïdia",
    region: "2",
  },
  {
    id: "283",
    ville: "Sebt El Maârif",
    region: "6",
  },
  {
    id: "284",
    ville: "Sebt Gzoula",
    region: "7",
  },
  {
    id: "285",
    ville: "Sebt Jahjouh",
    region: "3",
  },
  {
    id: "286",
    ville: "Selouane",
    region: "2",
  },
  {
    id: "287",
    ville: "Settat",
    region: "6",
  },
  {
    id: "288",
    ville: "Sid L'Mokhtar",
    region: "7",
  },
  {
    id: "289",
    ville: "Sid Zouin",
    region: "7",
  },
  {
    id: "290",
    ville: "Sidi Abdallah Ghiat",
    region: "7",
  },
  {
    id: "291",
    ville: "Sidi Addi",
    region: "3",
  },
  {
    id: "292",
    ville: "Sidi Ahmed",
    region: "7",
  },
  {
    id: "293",
    ville: "Sidi Ali Ban Hamdouche",
    region: "6",
  },
  {
    id: "294",
    ville: "Sidi Allal El Bahraoui",
    region: "4",
  },
  {
    id: "295",
    ville: "Sidi Allal Tazi",
    region: "4",
  },
  {
    id: "296",
    ville: "Sidi Bennour",
    region: "6",
  },
  {
    id: "297",
    ville: "Sidi Bou Othmane",
    region: "7",
  },
  {
    id: "298",
    ville: "Sidi Boubker",
    region: "2",
  },
  {
    id: "299",
    ville: "Sidi Bouknadel",
    region: "4",
  },
  {
    id: "300",
    ville: "Sidi Bouzid",
    region: "6",
  },
  {
    id: "301",
    ville: "Sidi Ifni",
    region: "10",
  },
  {
    id: "302",
    ville: "Sidi Jaber",
    region: "5",
  },
  {
    id: "303",
    ville: "Sidi Kacem",
    region: "4",
  },
  {
    id: "304",
    ville: "Sidi Lyamani",
    region: "1",
  },
  {
    id: "305",
    ville: "Sidi Mohamed ben Abdallah el-Raisuni",
    region: "1",
  },
  {
    id: "306",
    ville: "Sidi Rahhal",
    region: "7",
  },
  {
    id: "307",
    ville: "Sidi Rahhal Chataï",
    region: "6",
  },
  {
    id: "308",
    ville: "Sidi Slimane",
    region: "4",
  },
  {
    id: "309",
    ville: "Sidi Slimane Echcharaa",
    region: "2",
  },
  {
    id: "310",
    ville: "Sidi Smaïl",
    region: "6",
  },
  {
    id: "311",
    ville: "Sidi Taibi",
    region: "4",
  },
  {
    id: "312",
    ville: "Sidi Yahya El Gharb",
    region: "4",
  },
  {
    id: "313",
    ville: "Skhinate",
    region: "3",
  },
  {
    id: "314",
    ville: "Skhirate",
    region: "4",
  },
  {
    id: "315",
    ville: "Skhour Rehamna",
    region: "7",
  },
  {
    id: "316",
    ville: "Skoura",
    region: "8",
  },
  {
    id: "317",
    ville: "Smimou",
    region: "7",
  },
  {
    id: "318",
    ville: "Soualem",
    region: "6",
  },
  {
    id: "319",
    ville: "Souk El Arbaa",
    region: "4",
  },
  {
    id: "320",
    ville: "Souk Sebt Oulad Nemma",
    region: "5",
  },
  {
    id: "321",
    ville: "Stehat",
    region: "1",
  },
  {
    id: "322",
    ville: "Séfrou",
    region: "3",
  },
  {
    id: "323",
    ville: "Tabounte",
    region: "8",
  },
  {
    id: "324",
    ville: "Tafajight",
    region: "3",
  },
  {
    id: "325",
    ville: "Tafetachte",
    region: "7",
  },
  {
    id: "326",
    ville: "Tafraout",
    region: "9",
  },
  {
    id: "327",
    ville: "Taghjijt",
    region: "10",
  },
  {
    id: "328",
    ville: "Taghzout",
    region: "1",
  },
  {
    id: "329",
    ville: "Tagzen",
    region: "9",
  },
  {
    id: "330",
    ville: "Tahannaout",
    region: "7",
  },
  {
    id: "331",
    ville: "Tahla",
    region: "3",
  },
  {
    id: "332",
    ville: "Tala Tazegwaght",
    region: "1",
  },
  {
    id: "333",
    ville: "Taliouine",
    region: "9",
  },
  {
    id: "334",
    ville: "Talmest",
    region: "7",
  },
  {
    id: "335",
    ville: "Talsint",
    region: "2",
  },
  {
    id: "336",
    ville: "Tamallalt",
    region: "7",
  },
  {
    id: "337",
    ville: "Tamanar",
    region: "7",
  },
  {
    id: "338",
    ville: "Tamansourt",
    region: "7",
  },
  {
    id: "339",
    ville: "Tamassint",
    region: "1",
  },
  {
    id: "340",
    ville: "Tamegroute",
    region: "8",
  },
  {
    id: "341",
    ville: "Tameslouht",
    region: "7",
  },
  {
    id: "342",
    ville: "Tamesna",
    region: "4",
  },
  {
    id: "343",
    ville: "Tamraght",
    region: "9",
  },
  {
    id: "344",
    ville: "Tan-Tan",
    region: "10",
  },
  {
    id: "345",
    ville: "Tanalt",
    region: "9",
  },
  {
    id: "346",
    ville: "Tanger",
    region: "1",
  },
  {
    id: "347",
    ville: "Tanoumrite Nkob Zagora",
    region: "8",
  },
  {
    id: "348",
    ville: "Taounate",
    region: "3",
  },
  {
    id: "349",
    ville: "Taourirt",
    region: "2",
  },
  {
    id: "350",
    ville: "Taourirt ait zaghar",
    region: "8",
  },
  {
    id: "351",
    ville: "Tarfaya",
    region: "11",
  },
  {
    id: "352",
    ville: "Targuist",
    region: "1",
  },
  {
    id: "353",
    ville: "Taroudannt",
    region: "9",
  },
  {
    id: "354",
    ville: "Tata",
    region: "9",
  },
  {
    id: "355",
    ville: "Taza",
    region: "3",
  },
  {
    id: "356",
    ville: "Taïnaste",
    region: "3",
  },
  {
    id: "357",
    ville: "Temsia",
    region: "9",
  },
  {
    id: "358",
    ville: "Tendrara",
    region: "2",
  },
  {
    id: "359",
    ville: "Thar Es-Souk",
    region: "3",
  },
  {
    id: "360",
    ville: "Tichoute",
    region: "8",
  },
  {
    id: "361",
    ville: "Tiddas",
    region: "4",
  },
  {
    id: "362",
    ville: "Tiflet",
    region: "4",
  },
  {
    id: "363",
    ville: "Tifnit",
    region: "9",
  },
  {
    id: "364",
    ville: "Tighassaline",
    region: "5",
  },
  {
    id: "365",
    ville: "Tighza",
    region: "5",
  },
  {
    id: "366",
    ville: "Timahdite",
    region: "3",
  },
  {
    id: "367",
    ville: "Tinejdad",
    region: "8",
  },
  {
    id: "368",
    ville: "Tisgdal",
    region: "9",
  },
  {
    id: "369",
    ville: "Tissa",
    region: "3",
  },
  {
    id: "370",
    ville: "Tit Mellil",
    region: "6",
  },
  {
    id: "371",
    ville: "Tizguite",
    region: "3",
  },
  {
    id: "372",
    ville: "Tizi Ouasli",
    region: "3",
  },
  {
    id: "373",
    ville: "Tiznit",
    region: "9",
  },
  {
    id: "374",
    ville: "Tiztoutine",
    region: "2",
  },
  {
    id: "375",
    ville: "Touarga",
    region: "4",
  },
  {
    id: "376",
    ville: "Touima",
    region: "2",
  },
  {
    id: "377",
    ville: "Touissit",
    region: "2",
  },
  {
    id: "378",
    ville: "Toulal",
    region: "3",
  },
  {
    id: "379",
    ville: "Toundoute",
    region: "8",
  },
  {
    id: "380",
    ville: "Tounfite",
    region: "8",
  },
  {
    id: "381",
    ville: "Témara",
    region: "4",
  },
  {
    id: "382",
    ville: "Tétouan",
    region: "1",
  },
  {
    id: "383",
    ville: "Youssoufia",
    region: "7",
  },
  {
    id: "384",
    ville: "Zag",
    region: "10",
  },
  {
    id: "385",
    ville: "Zagora",
    region: "8",
  },
  {
    id: "386",
    ville: "Zaouia d'Ifrane",
    region: "3",
  },
  {
    id: "387",
    ville: "Zaouïat Cheikh",
    region: "5",
  },
  {
    id: "388",
    ville: "Zaïda",
    region: "8",
  },
  {
    id: "389",
    ville: "Zaïo",
    region: "2",
  },
  {
    id: "390",
    ville: "Zeghanghane",
    region: "2",
  },
  {
    id: "391",
    ville: "Zeubelemok",
    region: "7",
  },
  {
    id: "392",
    ville: "Zinat",
    region: "1",
  },
];

export const citiesAndRegions = [
  {
    id: "0",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Afourar",
  },
  {
    id: "1",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Agadir",
  },
  {
    id: "2",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Agdz",
  },
  {
    id: "3",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Aghbala",
  },
  {
    id: "4",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Agni Izimmer",
  },
  {
    id: "5",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Agourai",
  },
  {
    id: "6",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Ahfir",
  },
  {
    id: "7",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Ain El Aouda",
  },
  {
    id: "8",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Ain Taoujdate",
  },
  {
    id: "9",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Ait Daoud",
  },
  {
    id: "10",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Ajdir",
  },
  {
    id: "11",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Akchour",
  },
  {
    id: "12",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Akka",
  },
  {
    id: "13",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Aklim",
  },
  {
    id: "14",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Aknoul",
  },
  {
    id: "15",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Al Aroui",
  },
  {
    id: "16",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Al Hoceïma",
  },
  {
    id: "17",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Alnif",
  },
  {
    id: "18",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Amalou Ighriben",
  },
  {
    id: "19",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Amizmiz",
  },
  {
    id: "20",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Anzi",
  },
  {
    id: "21",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Aoufous",
  },
  {
    id: "22",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Aoulouz",
  },
  {
    id: "23",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Aourir",
  },
  {
    id: "24",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Arazane",
  },
  {
    id: "25",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Arbaoua",
  },
  {
    id: "26",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Arfoud",
  },
  {
    id: "27",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "Assa",
  },
  {
    id: "28",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Assahrij",
  },
  {
    id: "29",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Assilah",
  },
  {
    id: "30",
    region: {
      id: "12",
      name: "Dakhla-Oued Ed Dahab",
    },
    name: "Awsard",
  },
  {
    id: "31",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Azemmour",
  },
  {
    id: "32",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Azilal",
  },
  {
    id: "33",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Azrou",
  },
  {
    id: "34",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Aïn Bni Mathar",
  },
  {
    id: "35",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Aïn Cheggag",
  },
  {
    id: "36",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Aïn Dorij",
  },
  {
    id: "37",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Aïn Erreggada",
  },
  {
    id: "38",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Aïn Harrouda",
  },
  {
    id: "39",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Aïn Jemaa",
  },
  {
    id: "40",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Aïn Karma",
  },
  {
    id: "41",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Aïn Leuh",
  },
  {
    id: "42",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Aït Attab",
  },
  {
    id: "43",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Aït Baha",
  },
  {
    id: "44",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Aït Boubidmane",
  },
  {
    id: "45",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Aït Hichem",
  },
  {
    id: "46",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Aït Iaâza",
  },
  {
    id: "47",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Aït Ishaq",
  },
  {
    id: "48",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Aït Majden",
  },
  {
    id: "49",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Aït Melloul",
  },
  {
    id: "50",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Aït Ourir",
  },
  {
    id: "51",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Aït Yalla",
  },
  {
    id: "52",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Bab Berred",
  },
  {
    id: "53",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Bab Taza",
  },
  {
    id: "54",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Bejaâd",
  },
  {
    id: "55",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Ben Ahmed",
  },
  {
    id: "56",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Ben Guerir",
  },
  {
    id: "57",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Ben Sergao",
  },
  {
    id: "58",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Ben Taïeb",
  },
  {
    id: "59",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Ben Yakhlef",
  },
  {
    id: "60",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Beni Ayat",
  },
  {
    id: "61",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Benslimane",
  },
  {
    id: "62",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Berkane",
  },
  {
    id: "63",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Berrechid",
  },
  {
    id: "64",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Bhalil",
  },
  {
    id: "65",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Bin elouidane",
  },
  {
    id: "66",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Biougra",
  },
  {
    id: "67",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Bir Jdid",
  },
  {
    id: "68",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Bni Ansar",
  },
  {
    id: "69",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Bni Bouayach",
  },
  {
    id: "70",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Bni Chiker",
  },
  {
    id: "71",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Bni Drar",
  },
  {
    id: "72",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Bni Hadifa",
  },
  {
    id: "73",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Bni Tadjite",
  },
  {
    id: "74",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Bouanane",
  },
  {
    id: "75",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Bouarfa",
  },
  {
    id: "76",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Boudnib",
  },
  {
    id: "77",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Boufakrane",
  },
  {
    id: "78",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Bouguedra",
  },
  {
    id: "79",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Bouhdila",
  },
  {
    id: "80",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "Bouizakarne",
  },
  {
    id: "81",
    region: {
      id: "11",
      name: "Laâyoune-Sakia El Hamra",
    },
    name: "Boujdour",
  },
  {
    id: "82",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Boujniba",
  },
  {
    id: "83",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Boulanouare",
  },
  {
    id: "84",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Boulemane",
  },
  {
    id: "85",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Boumalne-Dadès",
  },
  {
    id: "86",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Boumia",
  },
  {
    id: "87",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Bouskoura",
  },
  {
    id: "88",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Bouznika",
  },
  {
    id: "89",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Bradia",
  },
  {
    id: "90",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Brikcha",
  },
  {
    id: "91",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Bzou",
  },
  {
    id: "92",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Béni Mellal",
  },
  {
    id: "93",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Casablanca",
  },
  {
    id: "94",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Chefchaouen",
  },
  {
    id: "95",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Chichaoua",
  },
  {
    id: "96",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Dar Bni Karrich",
  },
  {
    id: "97",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Dar Chaoui",
  },
  {
    id: "98",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Dar El Kebdani",
  },
  {
    id: "99",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Dar Gueddari",
  },
  {
    id: "100",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Dar Oulad Zidouh",
  },
  {
    id: "101",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Dcheira El Jihadia",
  },
  {
    id: "102",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Debdou",
  },
  {
    id: "103",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Demnate",
  },
  {
    id: "104",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Deroua",
  },
  {
    id: "105",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Douar Kannine",
  },
  {
    id: "106",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Dra'a",
  },
  {
    id: "107",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Drargua",
  },
  {
    id: "108",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Driouch",
  },
  {
    id: "109",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Echemmaia",
  },
  {
    id: "110",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "El Aïoun Sidi Mellouk",
  },
  {
    id: "111",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "El Borouj",
  },
  {
    id: "112",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "El Gara",
  },
  {
    id: "113",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "El Guerdane",
  },
  {
    id: "114",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "El Hajeb",
  },
  {
    id: "115",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "El Hanchane",
  },
  {
    id: "116",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "El Jadida",
  },
  {
    id: "117",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "El Kelaâ des Sraghna",
  },
  {
    id: "118",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "El Ksiba",
  },
  {
    id: "119",
    region: {
      id: "11",
      name: "Laâyoune-Sakia El Hamra",
    },
    name: "El Marsa",
  },
  {
    id: "120",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "El Menzel",
  },
  {
    id: "121",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "El Ouatia",
  },
  {
    id: "122",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Elkbab",
  },
  {
    id: "123",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Er-Rich",
  },
  {
    id: "124",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Errachidia",
  },
  {
    id: "125",
    region: {
      id: "11",
      name: "Laâyoune-Sakia El Hamra",
    },
    name: "Es-Semara",
  },
  {
    id: "126",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Essaouira",
  },
  {
    id: "127",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Fam El Hisn",
  },
  {
    id: "128",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Farkhana",
  },
  {
    id: "129",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Figuig",
  },
  {
    id: "130",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Fnideq",
  },
  {
    id: "131",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Foum Jamaa",
  },
  {
    id: "132",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Foum Zguid",
  },
  {
    id: "133",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Fquih Ben Salah",
  },
  {
    id: "134",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Fraïta",
  },
  {
    id: "135",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Fès",
  },
  {
    id: "136",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Gardmit",
  },
  {
    id: "137",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Ghafsai",
  },
  {
    id: "138",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Ghmate",
  },
  {
    id: "139",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Goulmima",
  },
  {
    id: "140",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Gourrama",
  },
  {
    id: "141",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "Guelmim",
  },
  {
    id: "142",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Guercif",
  },
  {
    id: "143",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Gueznaia",
  },
  {
    id: "144",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Guigou",
  },
  {
    id: "145",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Guisser",
  },
  {
    id: "146",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Had Bouhssoussen",
  },
  {
    id: "147",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Had Kourt",
  },
  {
    id: "148",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Haj Kaddour",
  },
  {
    id: "149",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Harhoura",
  },
  {
    id: "150",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Harte Lyamine",
  },
  {
    id: "151",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Hattane",
  },
  {
    id: "152",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Hrara",
  },
  {
    id: "153",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Ida Ougnidif",
  },
  {
    id: "154",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Ifrane",
  },
  {
    id: "155",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Ifri",
  },
  {
    id: "156",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Igdamen",
  },
  {
    id: "157",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Ighil n'Oumgoun",
  },
  {
    id: "158",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Ighoud",
  },
  {
    id: "159",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Ighounane",
  },
  {
    id: "160",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Ihddaden",
  },
  {
    id: "161",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Imassine",
  },
  {
    id: "162",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Imintanoute",
  },
  {
    id: "163",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Imouzzer Kandar",
  },
  {
    id: "164",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Imouzzer Marmoucha",
  },
  {
    id: "165",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Imzouren",
  },
  {
    id: "166",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Inahnahen",
  },
  {
    id: "167",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Inezgane",
  },
  {
    id: "168",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Irherm",
  },
  {
    id: "169",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Issaguen (Ketama)",
  },
  {
    id: "170",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Itzer",
  },
  {
    id: "171",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Jamâat Shaim",
  },
  {
    id: "172",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Jaâdar",
  },
  {
    id: "173",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Jebha",
  },
  {
    id: "174",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Jerada",
  },
  {
    id: "175",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Jorf",
  },
  {
    id: "176",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Jorf El Melha",
  },
  {
    id: "177",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Jorf Lasfar",
  },
  {
    id: "178",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Karia",
  },
  {
    id: "179",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Karia (El Jadida)",
  },
  {
    id: "180",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Karia Ba Mohamed",
  },
  {
    id: "181",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Kariat Arekmane",
  },
  {
    id: "182",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Kasba Tadla",
  },
  {
    id: "183",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Kassita",
  },
  {
    id: "184",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Kattara",
  },
  {
    id: "185",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Kehf Nsour",
  },
  {
    id: "186",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Kelaat-M'Gouna",
  },
  {
    id: "187",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Kerouna",
  },
  {
    id: "188",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Kerrouchen",
  },
  {
    id: "189",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Khemis Zemamra",
  },
  {
    id: "190",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Khenichet",
  },
  {
    id: "191",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Khouribga",
  },
  {
    id: "192",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Khémis Sahel",
  },
  {
    id: "193",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Khémisset",
  },
  {
    id: "194",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Khénifra",
  },
  {
    id: "195",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Ksar El Kébir",
  },
  {
    id: "196",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Kénitra",
  },
  {
    id: "197",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Laaounate",
  },
  {
    id: "198",
    region: {
      id: "11",
      name: "Laâyoune-Sakia El Hamra",
    },
    name: "Laayoune",
  },
  {
    id: "199",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Lakhsas",
  },
  {
    id: "200",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Lakhsass",
  },
  {
    id: "201",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Lalla Mimouna",
  },
  {
    id: "202",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Lalla Takerkoust",
  },
  {
    id: "203",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Larache",
  },
  {
    id: "204",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Laâtamna",
  },
  {
    id: "205",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Loudaya",
  },
  {
    id: "206",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Loulad",
  },
  {
    id: "207",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Lqliâa",
  },
  {
    id: "208",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Lâattaouia",
  },
  {
    id: "209",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "M'diq",
  },
  {
    id: "210",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "M'haya",
  },
  {
    id: "211",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "M'rirt",
  },
  {
    id: "212",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "M'semrir",
  },
  {
    id: "213",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Madagh",
  },
  {
    id: "214",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Marrakech",
  },
  {
    id: "215",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Martil",
  },
  {
    id: "216",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Massa (Maroc)",
  },
  {
    id: "217",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Mechra Bel Ksiri",
  },
  {
    id: "218",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Megousse",
  },
  {
    id: "219",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Mehdia",
  },
  {
    id: "220",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Meknès",
  },
  {
    id: "221",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Midar",
  },
  {
    id: "222",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Midelt",
  },
  {
    id: "223",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Missour",
  },
  {
    id: "224",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Mohammadia",
  },
  {
    id: "225",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Moqrisset",
  },
  {
    id: "226",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Moulay Abdallah",
  },
  {
    id: "227",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Moulay Ali Cherif",
  },
  {
    id: "228",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Moulay Bouazza",
  },
  {
    id: "229",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Moulay Bousselham",
  },
  {
    id: "230",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Moulay Brahim",
  },
  {
    id: "231",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Moulay Idriss Zerhoun",
  },
  {
    id: "232",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Moulay Yaâcoub",
  },
  {
    id: "233",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Moussaoua",
  },
  {
    id: "234",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "MyAliCherif",
  },
  {
    id: "235",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Mzouda",
  },
  {
    id: "236",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Médiouna",
  },
  {
    id: "237",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "N'Zalat Bni Amar",
  },
  {
    id: "238",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Nador",
  },
  {
    id: "239",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Naima",
  },
  {
    id: "240",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oualidia",
  },
  {
    id: "241",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Ouaouizeght",
  },
  {
    id: "242",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Ouaoumana",
  },
  {
    id: "243",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Ouarzazate",
  },
  {
    id: "244",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Ouazzane",
  },
  {
    id: "245",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Oued Amlil",
  },
  {
    id: "246",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Oued Heimer",
  },
  {
    id: "247",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Oued Ifrane",
  },
  {
    id: "248",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Oued Laou",
  },
  {
    id: "249",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Oued Rmel",
  },
  {
    id: "250",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Oued Zem",
  },
  {
    id: "251",
    region: {
      id: "12",
      name: "Dakhla-Oued Ed Dahab",
    },
    name: "Oued-Eddahab",
  },
  {
    id: "252",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Oujda",
  },
  {
    id: "253",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad Abbou",
  },
  {
    id: "254",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad Amrane",
  },
  {
    id: "255",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Oulad Ayad",
  },
  {
    id: "256",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Oulad Berhil",
  },
  {
    id: "257",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad Frej",
  },
  {
    id: "258",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad Ghadbane",
  },
  {
    id: "259",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad H'Riz Sahel",
  },
  {
    id: "260",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Oulad M'Barek",
  },
  {
    id: "261",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad M'rah",
  },
  {
    id: "262",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad Saïd",
  },
  {
    id: "263",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Oulad Sidi Ben Daoud",
  },
  {
    id: "264",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Oulad Teïma",
  },
  {
    id: "265",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Oulad Yaich",
  },
  {
    id: "266",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Oulad Zbair",
  },
  {
    id: "267",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Ouled Tayeb",
  },
  {
    id: "268",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Oulmès",
  },
  {
    id: "269",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Ounagha",
  },
  {
    id: "270",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Outat El Haj",
  },
  {
    id: "271",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Point Cires",
  },
  {
    id: "272",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Rabat",
  },
  {
    id: "273",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Ras El Aïn",
  },
  {
    id: "274",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Ras El Ma",
  },
  {
    id: "275",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Ribate El Kheir",
  },
  {
    id: "276",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Rissani",
  },
  {
    id: "277",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Rommani",
  },
  {
    id: "278",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Sabaa Aiyoun",
  },
  {
    id: "279",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Safi",
  },
  {
    id: "280",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Salé",
  },
  {
    id: "281",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Sarghine",
  },
  {
    id: "282",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Saïdia",
  },
  {
    id: "283",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Sebt El Maârif",
  },
  {
    id: "284",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Sebt Gzoula",
  },
  {
    id: "285",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Sebt Jahjouh",
  },
  {
    id: "286",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Selouane",
  },
  {
    id: "287",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Settat",
  },
  {
    id: "288",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Sid L'Mokhtar",
  },
  {
    id: "289",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Sid Zouin",
  },
  {
    id: "290",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Sidi Abdallah Ghiat",
  },
  {
    id: "291",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Sidi Addi",
  },
  {
    id: "292",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Sidi Ahmed",
  },
  {
    id: "293",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Sidi Ali Ban Hamdouche",
  },
  {
    id: "294",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Sidi Allal El Bahraoui",
  },
  {
    id: "295",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Sidi Allal Tazi",
  },
  {
    id: "296",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Sidi Bennour",
  },
  {
    id: "297",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Sidi Bou Othmane",
  },
  {
    id: "298",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Sidi Boubker",
  },
  {
    id: "299",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Sidi Bouknadel",
  },
  {
    id: "300",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Sidi Bouzid",
  },
  {
    id: "301",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "Sidi Ifni",
  },
  {
    id: "302",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Sidi Jaber",
  },
  {
    id: "303",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Sidi Kacem",
  },
  {
    id: "304",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Sidi Lyamani",
  },
  {
    id: "305",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Sidi Mohamed ben Abdallah el-Raisuni",
  },
  {
    id: "306",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Sidi Rahhal",
  },
  {
    id: "307",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Sidi Rahhal Chataï",
  },
  {
    id: "308",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Sidi Slimane",
  },
  {
    id: "309",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Sidi Slimane Echcharaa",
  },
  {
    id: "310",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Sidi Smaïl",
  },
  {
    id: "311",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Sidi Taibi",
  },
  {
    id: "312",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Sidi Yahya El Gharb",
  },
  {
    id: "313",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Skhinate",
  },
  {
    id: "314",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Skhirate",
  },
  {
    id: "315",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Skhour Rehamna",
  },
  {
    id: "316",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Skoura",
  },
  {
    id: "317",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Smimou",
  },
  {
    id: "318",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Soualem",
  },
  {
    id: "319",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Souk El Arbaa",
  },
  {
    id: "320",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Souk Sebt Oulad Nemma",
  },
  {
    id: "321",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Stehat",
  },
  {
    id: "322",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Séfrou",
  },
  {
    id: "323",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Tabounte",
  },
  {
    id: "324",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Tafajight",
  },
  {
    id: "325",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Tafetachte",
  },
  {
    id: "326",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tafraout",
  },
  {
    id: "327",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "Taghjijt",
  },
  {
    id: "328",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Taghzout",
  },
  {
    id: "329",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tagzen",
  },
  {
    id: "330",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Tahannaout",
  },
  {
    id: "331",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Tahla",
  },
  {
    id: "332",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Tala Tazegwaght",
  },
  {
    id: "333",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Taliouine",
  },
  {
    id: "334",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Talmest",
  },
  {
    id: "335",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Talsint",
  },
  {
    id: "336",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Tamallalt",
  },
  {
    id: "337",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Tamanar",
  },
  {
    id: "338",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Tamansourt",
  },
  {
    id: "339",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Tamassint",
  },
  {
    id: "340",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Tamegroute",
  },
  {
    id: "341",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Tameslouht",
  },
  {
    id: "342",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Tamesna",
  },
  {
    id: "343",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tamraght",
  },
  {
    id: "344",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "Tan-Tan",
  },
  {
    id: "345",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tanalt",
  },
  {
    id: "346",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Tanger",
  },
  {
    id: "347",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Tanoumrite Nkob Zagora",
  },
  {
    id: "348",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Taounate",
  },
  {
    id: "349",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Taourirt",
  },
  {
    id: "350",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Taourirt ait zaghar",
  },
  {
    id: "351",
    region: {
      id: "11",
      name: "Laâyoune-Sakia El Hamra",
    },
    name: "Tarfaya",
  },
  {
    id: "352",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Targuist",
  },
  {
    id: "353",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Taroudannt",
  },
  {
    id: "354",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tata",
  },
  {
    id: "355",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Taza",
  },
  {
    id: "356",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Taïnaste",
  },
  {
    id: "357",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Temsia",
  },
  {
    id: "358",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Tendrara",
  },
  {
    id: "359",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Thar Es-Souk",
  },
  {
    id: "360",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Tichoute",
  },
  {
    id: "361",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Tiddas",
  },
  {
    id: "362",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Tiflet",
  },
  {
    id: "363",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tifnit",
  },
  {
    id: "364",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Tighassaline",
  },
  {
    id: "365",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Tighza",
  },
  {
    id: "366",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Timahdite",
  },
  {
    id: "367",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Tinejdad",
  },
  {
    id: "368",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tisgdal",
  },
  {
    id: "369",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Tissa",
  },
  {
    id: "370",
    region: {
      id: "6",
      name: "Casablanca-Settat",
    },
    name: "Tit Mellil",
  },
  {
    id: "371",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Tizguite",
  },
  {
    id: "372",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Tizi Ouasli",
  },
  {
    id: "373",
    region: {
      id: "9",
      name: "Souss-Massa",
    },
    name: "Tiznit",
  },
  {
    id: "374",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Tiztoutine",
  },
  {
    id: "375",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Touarga",
  },
  {
    id: "376",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Touima",
  },
  {
    id: "377",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Touissit",
  },
  {
    id: "378",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Toulal",
  },
  {
    id: "379",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Toundoute",
  },
  {
    id: "380",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Tounfite",
  },
  {
    id: "381",
    region: {
      id: "4",
      name: "Rabat-Salé-Kénitra",
    },
    name: "Témara",
  },
  {
    id: "382",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Tétouan",
  },
  {
    id: "383",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Youssoufia",
  },
  {
    id: "384",
    region: {
      id: "10",
      name: "Guelmim-Oued Noun",
    },
    name: "Zag",
  },
  {
    id: "385",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Zagora",
  },
  {
    id: "386",
    region: {
      id: "3",
      name: "Fès-Meknès",
    },
    name: "Zaouia d'Ifrane",
  },
  {
    id: "387",
    region: {
      id: "5",
      name: "Béni Mellal-Khénifra",
    },
    name: "Zaouïat Cheikh",
  },
  {
    id: "388",
    region: {
      id: "8",
      name: "Drâa-Tafilalet",
    },
    name: "Zaïda",
  },
  {
    id: "389",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Zaïo",
  },
  {
    id: "390",
    region: {
      id: "2",
      name: "l'Oriental",
    },
    name: "Zeghanghane",
  },
  {
    id: "391",
    region: {
      id: "7",
      name: "Marrakech-Safi",
    },
    name: "Zeubelemok",
  },
  {
    id: "392",
    region: {
      id: "1",
      name: "Tanger-Tétouan-Al Hoceïma",
    },
    name: "Zinat",
  },
];

export const widgetTypes = [
  "card",
  "lineChart",
  "areaChart",
  "barChart",
  "donutChart",
  "pieChart",
  "table",
  "gauge",
  "video",
] as const;

export const widgetCardTypes = [
  "text",
  "count",
  "telemetry",
  "history",
] as const;
import { Circle, CircleDot } from "lucide-react";

export const CamerasStatuses = [
  {
    value: "all",
    label: "all",
    color: "#ABBED1",
    icon: CircleDot,
  },
  {
    value: "online",
    label: "online",
    color: "#4CAF50",
    icon: Circle,
  },
  {
    value: "offline",
    label: "offline",
    color: "#FF6163",
    icon: Circle,
  },
];

export const HistoricalAlertStatuses = [
  {
    value: "all",
    label: "all",
    color: "#ABBED1",
    icon: CircleDot,
  },
  {
    value: "verified",
    label: "verified",
    color: "#4CAF50",
    icon: Circle,
  },
  {
    value: "unverified",
    label: "unverified",
    color: "#FF6163",
    icon: Circle,
  },
];

export const addCameraFormSteps = [
  {
    title: "GeneralInformation",
    description: "titleGeneralInformation",
    fields: [
      "cameraName",
      "description",
      "mark",
      "model",
      "region",
      // "group",
      "city",
      "site",
      "cameraType",
      "position",
    ],
  },
  {
    title: "NetworkSettings",
    description: "titleNetworkSettings",
    fields: [
      // "rtspLink",
      "username",
      "password",
      // "connectionType",
      // "subnetmask",
      // "primaryDns",
      "httpPort",
      "onvifPort",
      "ipAddress",
      // "bridge",
      // "secondaryDns",
      "rtspPort",
      // "macAddress",
    ],
  },
];
export const CameraConfigFormSteps = [
  // {
  //   title: "Select analysis",
  //   description: "Select analysis type",
  //   fields: ["anlayseType"],
  // },
  {
    title: "Video Analytics",
    description: "Configure video analytics based on your analytics type",
    fields: [],
  },
];

export const cameraTypes = [
  {
    label: "DomeCamera",
    icon: "/icons/DomeCamera.svg",
  },
  {
    label: "BulletCamera",
    icon: "/icons/BulletCamera.svg",
  },
  {
    label: "MutliSensorCamera",
    icon: "/icons/MultiSensorCamera.svg",
  },
  {
    label: "PTZCamera",
    icon: "/icons/PTZCamera.svg",
  },
  // {
  //   label: "Caméra thermique",
  //   icon: "/icons/ThermalCamera.svg",
  // },
];

export const CameraMarks = [
  {
    mark: "axis",
    models: [
      "205",
      "206",
      "207",
      "210",
      "211",
      "212",
      "213",
      "214",
      "215",
      "221",
      "230",
      "2100",
      "2110",
      "2120",
      "2130",
      "2420",
      "206M",
      "206W",
      "207MW",
      "207W",
      "209FD",
      "209FD-R",
      "209MFD",
      "209MFD-R",
      "210a",
      "211A",
      "211M",
      "211W",
      "212PTZ",
      "212PTZ-V",
      "214PTZ",
      "215PTZ",
      "215PTZ-E",
      "215-PTZ-E",
      "216FD",
      "216FD-V",
      "216MFD",
      "216MFD-V",
      "223M",
      "225FD",
      "231D",
      "231D+",
      "232D",
      "232D+",
      "233D",
      "D101-A XF P3807",
      "D201-S XPT Q6055",
      "ExCam XF P1367",
      "ExCam XF Q1645",
      "ExCam XPT Q6075",
      "ExCam XF M3016",
      "ExCam XF Q1785",
      "ExCam XP TQ6055",
      "F1004",
      "F1004",
      "F1005-E",
      "F1015",
      "F101-A XF",
      "F101-A XF",
      "F101-AXF",
      "F1025",
      "F1035-E",
      "F34",
      "F4005",
      "F4005-E",
      "F41",
      "F44",
      "FA1080-E",
      "FA1080-E",
      "FA1105",
      "FA1125",
      "FA3105-L",
      "FA4090-E",
      "FA4090-E",
      "FA4115",
      "FA54",
      "M1004-W",
      "M1011",
      "M1011-W",
      "M1013",
      "M1014",
      "M1025",
      "M1031-W",
      "M1033-W",
      "M1034-W",
      "M1045-LW",
      "M1054",
      "M1065-L",
      "M1065-LW",
      "M1103",
      "M1104",
      "M1113",
      "M1113-E",
      "M1114",
      "M1114-E",
      "M1124",
      "M1124-E",
      "M1125",
      "M1125-E",
      "M1134",
      "M1135",
      "M1135-E",
      "M1137",
      "M1137-E",
      "M1143-L",
      "M1144-L",
      "M1145",
      "M1145-L",
      "M2014-E",
      "M2025-LE",
      "M2026-LE",
      "M2026-LE",
      "M3004-V",
      "M3005-V",
      "M3006-V",
      "M3007-P",
      "M3007-PV",
      "M3011",
      "M3014",
      "M3015",
      "M3016",
      "M3024-LVE",
      "M3025-VE",
      "M3026-VE",
      "M3027-PVE",
      "M3037-PVE",
      "M3037-PVE",
      "M3044-V",
      "M3044-WV",
      "M3045-V",
      "M3045-WV",
      "M3046-V",
      "M3047-P",
      "M3048-P",
      "M3057-PLVE",
      "M3057-PLVE",
      "M3057-PLVE Mk II",
      "M3057-PLVE Mk II",
      "M3058-PLVE",
      "M3058-PLVE",
      "M3064-V",
      "M3065-V",
      "M3066-V",
      "M3067-P",
      "M3067-P",
      "M3068-P",
      "M3068-P",
      "M3075-V",
      "M3077-PLVE",
      "M3077-PLVE",
      "M3104-L",
      "M3104-LVE",
      "M3105-L",
      "M3105-LVE",
      "M3106-L",
      "M3106-Lk II",
      "M3106-LVE",
      "M3106-LVEk II",
      "M3113-R",
      "M3113-VE",
      "M3114-R",
      "M3114-VE",
      "M3115-LVE ",
      "M3116 LVE ",
      "M3203",
      "M3203-V",
      "M3204",
      "M3204-V",
      "M3205-LVE",
      "M3206-LVE",
      "M4206-LV ",
      "M4206-V",
      "M5013",
      "M5013-V",
      "M5014",
      "M5014-V",
      "M5054",
      "M5055",
      "M5065",
      "M5525-E",
      "P1204",
      "P1214",
      "P1214-E",
      "P1224-E",
      "P1244",
      "P1245",
      "P1254",
      "P1264",
      "P1265",
      "P1275",
      "P1280-E",
      "P1280-E",
      "P1290-E",
      "P1290-E",
      "P1311",
      "P1343",
      "P1343-E",
      "P1344",
      "P1344-E",
      "P1346",
      "P1346-E",
      "P1347",
      "P1347-E",
      "P1353",
      "P1353-E",
      "P1354",
      "P1354-E",
      "P1355",
      "P1355-E",
      "P1357",
      "P1357-E",
      "P1364",
      "P1364-E",
      "P1365",
      "P1365-E",
      "P1365-E Mk II",
      "P1365 Mk II",
      "P1367",
      "P1367-E",
      "P1368-E",
      "P1375",
      "P1375-E",
      "P1377",
      "P1377-LE",
      "P1378",
      "P1378-LE",
      "P1405-E",
      "P1405-LE",
      "P1405-LE Mk II",
      "P1425-E",
      "P1425-LE",
      "P1425-LE Mk II",
      "P1427-E",
      "P1427-LE",
      "P1428-E",
      "P1435-E",
      "P1435-LE",
      "P1445-LE",
      "P1445-LE-3",
      "P1445-LE-3",
      "P1447-LE",
      "P1448-LE",
      "P1455-LE",
      "P1455-LE-3",
      "P3214-V",
      "P3214-VE",
      "P3215-V",
      "P3215-VE",
      "P3224-LV",
      "P3224-LVE",
      "P3224-LVE Mk II",
      "P3224-LV Mk II",
      "P3224-VE Mk II",
      "P3224-V Mk II",
      "P3225-LV",
      "P3225-LVE",
      "P3225-LVE Mk II",
      "P3225-LV Mk II",
      "P3225-VE Mk II",
      "P3225-V Mk II",
      "P3227-LV",
      "P3227-LVE",
      "P3228-LV",
      "P3228-LVE",
      "P3235-LV",
      "P3235-LVE",
      "P3245-LV",
      "P3245-LVE",
      "P3245-LVE-3",
      "P3245-V",
      "P3245-VE",
      "P3247-LV",
      "P3247-LVE",
      "P3248-LV",
      "P3248-LVE",
      "P3255-LVE",
      "P3301",
      "P3301-V",
      "P3304",
      "P3304-V",
      "P3343",
      "P3343-V",
      "P3343-VE",
      "P3344",
      "P3344-V",
      "P3344-VE",
      "P3346",
      "P3346-V",
      "P3346-VE",
      "P3353",
      "P3354",
      "P3363-V",
      "P3363-VE",
      "P3364-LV",
      "P3364-LVE",
      "P3364-V",
      "P3364-VE",
      "P3365-V",
      "P3365-VE",
      "P3367-V",
      "P3367-VE",
      "P3374-LV",
      "P3374-V",
      "P3375-LV",
      "P3375-LVE",
      "P3375-V",
      "P3375-VE",
      "P3384-V",
      "P3384-VE",
      "P3707-E",
      "P3715-PLVE",
      "P3715-PLVE",
      "P3717-PLE",
      "P3717-PLE",
      "P3719-PLE",
      "P3719-PLE",
      "P3807-PVE",
      "P3807-PVE",
      "P3904-R",
      "P3904-R Mk II",
      "P3905-R",
      "P3905-R Mk II",
      "P3905-RE",
      "P3915-R",
      "P3915-R Mk II",
      "P3925-LRE",
      "P3925-R",
      "P3935-LR",
      "P5414-E",
      "P5415-E",
      "P5512",
      "P5512-E",
      "P5514",
      "P5514-E",
      "P5515",
      "P5515-E",
      "P5522",
      "P5522-E",
      "P5532",
      "P5532-E",
      "P5534",
      "P5534-E",
      "P5544",
      "P5624-E",
      "P5624-E Mk II",
      "P5635-E",
      "P5635-E Mk II",
      "P5654-E",
      "P5655-E",
      "P8513",
      "P8514",
      "P8524",
      "P8535",
      "P8804",
      "P9106-V",
      "P9106-V",
      "Q1602",
      "Q1602-E",
      "Q1604",
      "Q1604-E",
      "Q1614",
      "Q1614-E",
      "Q1615",
      "Q1615 Mk III",
      "Q1615-E",
      "Q1615-EMkII",
      "Q1615-LE Mk III",
      "Q1615 Mk II",
      "Q1635",
      "Q1635-E",
      "Q1645",
      "Q1645-LE",
      "Q1647",
      "Q1647-LE",
      "Q1659",
      "Q1700-LE",
      "Q1755",
      "Q1755-E",
      "Q1765-LE",
      "Q1765-LEPT Mount",
      "Q1775",
      "Q1775-E",
      "Q1785-LE",
      "Q1786-LE",
      "Q1798-LE",
      "Q1910",
      "Q1910-E",
      "Q1921",
      "Q1921-E",
      "Q1922",
      "Q1922-E",
      "Q1931-E",
      "Q1931-E PT Mount",
      "Q1932-E",
      "Q1932-E PT Mount",
      "Q3504-v",
      "Q3504-ve",
      "Q3505-SVE Mk II",
      "Q3505-V",
      "Q3505-VE",
      "Q3505-VE Mk II",
      "Q3505-V Mk II",
      "Q3515-LV",
      "Q3515-LVE",
      "Q3517-LV",
      "Q3517-LVE",
      "Q3517-SLVE",
      "Q3518-LVE",
      "Q3527-LVE",
      "Q3615-VE",
      "Q3617-VE",
      "Q3708-PVE",
      "Q3708-PVE",
      "Q3709-PVE",
      "Q3709-PVE",
      "Q3819-PVE",
      "Q6000-E",
      "Q6000-E Mk II",
      "Q6010-E",
      "Q6010-E",
      "Q6032",
      "Q6032-C",
      "Q6032-E",
      "Q6034",
      "Q6034-C",
      "Q6034-E",
      "Q6035",
      "Q6035-C",
      "Q6035-E",
      "Q6042",
      "Q6042-C",
      "Q6042-E",
      "Q6042-S",
      "Q6044",
      "Q6044-C",
      "Q6044-E",
      "Q6044-S",
      "Q6045",
      "Q6045-C",
      "Q6045-C Mk II",
      "Q6045-E",
      "Q6045-E Mk II",
      "Q6045 Mk II",
      "Q6045-S",
      "Q6045-S Mk II",
      "Q6052",
      "Q6052-e",
      "Q6054",
      "Q6054-E",
      "Q6054-E Mk II",
      "Q6054-E Mk III",
      "Q6054 Mk II",
      "Q6054 Mk III",
      "Q6055",
      "Q6055-C",
      "Q6055-e",
      "Q6055-S",
      "Q6074",
      "Q6074-E",
      "Q6075",
      "Q6075-E",
      "Q6075-S",
      "Q6075-SE",
      "Q6078-E",
      "Q6100-E",
      "Q6100-E",
      "Q6114-E",
      "Q6115-E",
      "Q6124-E",
      "Q6125-LE",
      "Q6128-E PTZ",
      "Q6135-LE PTZ",
      "Q6154-E PTZ",
      "Q6155-E PTZ",
      "Q6215-LE",
      "Q6315-LE",
      "Q8414-LVS",
      "Q8631-E",
      "Q8632-E",
      "Q8641-E",
      "Q8641-E",
      "Q8641-E PT",
      "Q8642-E",
      "Q8642-E ",
      "Q8642-E PT",
      "Q8665-E",
      "Q8665-LE",
      "Q8685-E",
      "Q8685-E",
      "Q8685-LE",
      "Q8685-LE",
      "Q8721-E",
      "Q8722-E",
      "Q8741-E",
      "Q8741-LE",
      "Q8742-E",
      "Q8742-LE",
      "Q8752-E",
      "Q8752-E",
      "Q8752-E",
      "Q9216-SLV",
      "Q9216-SLV",
      "M3905-R",
      "M3905-R M12",
      "P3905-R Mk III",
      "P3905-R Mk III M12",
      "M1055-L",
      "M1075-L",
      "M2035-LE",
      "M2036-LE",
      "M3085-V",
      "M3086-V",
      "M3088-V",
      "M4215-LV",
      "M4215-V",
      "M4216-LV",
      "M4216-V",
      "M4218-LV",
      "M4218-V",
      "I8116-E",
    ],
    rtspLink: "rtsp://<user>:<pass>@<cameraip>:<port>/axis-media/media.amp",
    defaultRtspPort: 554,
  },
  {
    mark: "other",
    models: [],
    rtspLink: "",
    defaultRtspPort: -1,
  },
];

export const widgetCardCountElements = ["camera", "users", "alerts"];

export const tableDisplayFormats = [
  "string",
  "integer",
  "float",
  "boolean",
  "date",
  "time",
  "image",
  "json",
  "imageDialog",
  "color",
] as const;

export const NotificationsStatuses = [
  {
    value: "all",
    label: "All",
    color: "#ABBED1",
    icon: CircleDot,
  },
  {
    value: "archived",
    label: "Archived",
    color: "#4CAF50",
    icon: Circle,
  },
];

export const LogsStatuses = [
  {
    value: "all",
    label: "All",
    color: "#ABBED1",
    icon: CircleDot,
  },
];

export const groupByOptions = ["hour", "day", "week", "none"] as const;

export const videoTypes = ["mp4", "m3u8", "camera", "ws"] as const;

export const vehicleBrands = [
  "Alfa Romeo",
  "AM General",
  "AMC",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Isuzu",
  "Iveco",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "maybach",
  "Mazda",
  "McLaren",
  "Mercedes Benz",
  "MG",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Pagani",
  "Peugeot",
  "Pontiac",
  "Porsche",
  "Range Rover",
  "Renault",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "Saturn",
  "Scion",
  "Seat",
  "Skoda",
  "Smart",
  "Ssangyong",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Vauxhall",
  "Volkswagen",
  "Volvo",
  "Infiniti",
];

export const vehicleTypes = ["bicycle", "motorcycle", "car", "bus", "truck"];

export const vehicleColors = [
  "black",
  "blue",
  "brown",
  "gray",
  "green",
  "orange",
  "purple",
  "red",
  "silver",
  "tan",
  "white",
  "yellow",
];

export const ROOT_GROUP = "COUNTRY";

export const telemetryCalculationTypes = [
  "sum",
  "average",
  "min",
  "max",
  "count",
  "last",
] as const;
