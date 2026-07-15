window.SHIFTCORE_DATA = {
  sectors: [
    { id: "all", name: "Alle functies" },
    { id: "elektra", name: "Elektra" },
    { id: "gas", name: "Gas" },
    { id: "water", name: "Water" },
    { id: "warmte", name: "Warmte" },
    { id: "telecom", name: "Telecom" },
    { id: "infra", name: "Algemene infra" }
  ],

  certificates: {
    "vca-basis": {
      name: "VCA Basis",
      fullName: "Basisveiligheid VCA",
      explanation: "Basiskennis over veilig en gezond werken, risico’s, persoonlijke beschermingsmiddelen, gereedschap en noodsituaties.",
      validity: "Doorgaans 10 jaar"
    },
    "vca-vol": {
      name: "VCA VOL",
      fullName: "Veiligheid voor Operationeel Leidinggevenden",
      explanation: "Voor operationeel leidinggevenden en zelfstandig werkenden die risico’s moeten herkennen en beheersen.",
      validity: "Doorgaans 10 jaar"
    },
    "gpi": {
      name: "GPI",
      fullName: "Generieke Poortinstructie",
      explanation: "Digitale veiligheidsinstructie die bij veel bouw- en infraprojecten nodig is voor toegang tot het werkterrein.",
      validity: "Controleer de actuele projecteis"
    },
    "bei": {
      name: "BEI",
      fullName: "Bedrijfsvoering Elektrische Installaties",
      explanation: "Veiligheids- en aanwijzingsstelsel voor werkzaamheden aan elektrische infrastructuur. De juiste rol hangt af van spanningsniveau en werkzaamheden.",
      validity: "Afhankelijk van opleiding, aanwijzing en werkgever"
    },
    "nen3140": {
      name: "NEN 3140",
      fullName: "Veilige bedrijfsvoering van laagspanningsinstallaties",
      explanation: "Norm voor veilig beheer, gebruik en onderhoud van elektrische laagspanningsinstallaties.",
      validity: "Periodieke instructie en beoordeling"
    },
    "viag": {
      name: "VIAG",
      fullName: "Veiligheidsinstructie Aardgas",
      explanation: "Veiligheidsstelsel voor werkzaamheden aan gasvoorzieningssystemen. De aanwijzing hangt af van taak, drukniveau en netbeheerder.",
      validity: "Afhankelijk van opleiding, aanwijzing en werkgever"
    },
    "kiad": {
      name: "KIAD",
      fullName: "Kwaliteit Instructie Aanleg Drinkwater",
      explanation: "Kwaliteits- en hygiëne-eisen voor werkzaamheden aan drinkwaterleidingen en aansluitingen.",
      validity: "Controleer actuele regeling en opdrachtgever"
    },
    "avp": {
      name: "AVP",
      fullName: "Allround Vakman Persoonscertificering",
      explanation: "Persoonscertificering voor specifieke vakwerkzaamheden. De precieze toepassing verschilt per branche en opdrachtgever.",
      validity: "Afhankelijk van certificatieschema"
    },
    "bhv": {
      name: "BHV",
      fullName: "Bedrijfshulpverlening",
      explanation: "Voor eerste hulp, beginnende brandbestrijding en ontruiming op een werklocatie.",
      validity: "Periodieke herhaling aanbevolen"
    },
    "veilig-hijsen": {
      name: "Veilig hijsen",
      fullName: "Veilig hijsen en aanslaan van lasten",
      explanation: "Voor medewerkers die lasten aanslaan, begeleiden of hijswerkzaamheden uitvoeren.",
      validity: "Afhankelijk van opleiding en werkgever"
    },
    "kraan": {
      name: "Machinistcertificaat",
      fullName: "Vakbekwaamheidsbewijs mobiele werktuigen",
      explanation: "Voor het veilig bedienen van graafmachines, kranen en andere werktuigen. De exacte eis hangt af van machine en project.",
      validity: "Afhankelijk van type bewijs"
    },
    "veilig-weg": {
      name: "Veilig werken langs de weg",
      fullName: "Veilig werken bij of langs verkeerswegen",
      explanation: "Voor werkzaamheden waarbij verkeer een relevant risico vormt. De eisen hangen af van wegbeheerder en locatie.",
      validity: "Controleer opdrachtgever en wegbeheerder"
    }
  },

  roles: [
    {
      id: "grondwerker",
      name: "Grondwerker",
      sector: "infra",
      description: "Voert graaf-, aanvul- en ondersteunende werkzaamheden uit rondom kabels, leidingen en sleuven.",
      certs: [["vca-basis","required"],["gpi","project"],["veilig-weg","project"],["veilig-hijsen","recommended"]]
    },
    {
      id: "kraanmachinist",
      name: "Kraanmachinist",
      sector: "infra",
      description: "Bedient graafmachines of ander grondverzetmaterieel tijdens infraprojecten.",
      certs: [["vca-basis","required"],["kraan","required"],["gpi","project"],["veilig-hijsen","recommended"]]
    },
    {
      id: "monteur-laagspanning",
      name: "Monteur laagspanning",
      sector: "elektra",
      description: "Werkt aan aanleg, onderhoud en storingen van laagspanningsnetten en aansluitingen.",
      certs: [["vca-basis","required"],["bei","required"],["nen3140","project"],["gpi","project"]]
    },
    {
      id: "eerste-monteur-laagspanning",
      name: "Eerste monteur laagspanning",
      sector: "elektra",
      description: "Voert zelfstandig en coördinerend werk uit aan laagspanningsnetten.",
      certs: [["vca-vol","required"],["bei","required"],["nen3140","project"],["gpi","project"]]
    },
    {
      id: "voorman-elektra",
      name: "Voorman elektra",
      sector: "elektra",
      description: "Stuurt monteurs aan en bewaakt veiligheid, kwaliteit, planning en voortgang.",
      certs: [["vca-vol","required"],["bei","required"],["nen3140","recommended"],["bhv","recommended"]]
    },
    {
      id: "werkverantwoordelijke-elektra",
      name: "Werkverantwoordelijke elektra",
      sector: "elektra",
      description: "Is verantwoordelijk voor de veilige werkorganisatie en bedrijfsvoering binnen het toegewezen domein.",
      certs: [["vca-vol","required"],["bei","required"],["nen3140","project"],["bhv","recommended"]]
    },
    {
      id: "gasmonteur",
      name: "Gasmonteur",
      sector: "gas",
      description: "Werkt aan aanleg, onderhoud en storingen van gasleidingen en aansluitingen.",
      certs: [["vca-basis","required"],["viag","required"],["gpi","project"],["veilig-weg","project"]]
    },
    {
      id: "eerste-gasmonteur",
      name: "Eerste monteur gas",
      sector: "gas",
      description: "Voert zelfstandig en coördinerend werk uit aan gasdistributienetten.",
      certs: [["vca-vol","required"],["viag","required"],["gpi","project"],["avp","project"]]
    },
    {
      id: "watermonteur",
      name: "Monteur water",
      sector: "water",
      description: "Werkt aan aanleg en onderhoud van drinkwaterleidingen en aansluitingen.",
      certs: [["vca-basis","required"],["kiad","required"],["gpi","project"],["veilig-weg","project"]]
    },
    {
      id: "eerste-watermonteur",
      name: "Eerste monteur water",
      sector: "water",
      description: "Voert zelfstandig werk uit en coördineert werkzaamheden bij drinkwaterprojecten.",
      certs: [["vca-vol","required"],["kiad","required"],["gpi","project"],["avp","project"]]
    },
    {
      id: "warmtemonteur",
      name: "Monteur warmtenetten",
      sector: "warmte",
      description: "Werkt aan aanleg en onderhoud van leidingen en componenten voor warmte-infrastructuur.",
      certs: [["vca-basis","required"],["gpi","project"],["veilig-hijsen","recommended"],["avp","project"]]
    },
    {
      id: "telecommonteur",
      name: "Telecommonteur",
      sector: "telecom",
      description: "Werkt aan aanleg en onderhoud van koper-, coax- of glasvezelnetwerken.",
      certs: [["vca-basis","required"],["gpi","project"],["veilig-weg","project"]]
    },
    {
      id: "kabelwerker",
      name: "Kabelwerker",
      sector: "telecom",
      description: "Ondersteunt bij het trekken, leggen, verbinden en beschermen van kabels.",
      certs: [["vca-basis","required"],["gpi","project"],["veilig-weg","project"]]
    },
    {
      id: "uitvoerder-infra",
      name: "Uitvoerder infra",
      sector: "infra",
      description: "Stuurt de dagelijkse uitvoering aan en bewaakt planning, veiligheid, kwaliteit en bezetting.",
      certs: [["vca-vol","required"],["gpi","project"],["bhv","recommended"],["veilig-weg","recommended"]]
    },
    {
      id: "toezichthouder-infra",
      name: "Toezichthouder infra",
      sector: "infra",
      description: "Controleert de uitvoering, veiligheid, kwaliteit en naleving van werkafspraken.",
      certs: [["vca-vol","required"],["gpi","project"],["bhv","recommended"]]
    }
  ]
};
