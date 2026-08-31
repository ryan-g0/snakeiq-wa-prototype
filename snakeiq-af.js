/* Afrikaans layer for the SnakeIQ WhatsApp bot — Overberg / Swellendam.
 *
 * Participant-facing copy only. The Twilio inspector and the testkit's researcher screens
 * stay in English: they are read by the team, not by the person who was bitten.
 *
 * Register follows the brief: "u" at first contact, "jy/jou" once the flow is under way —
 * which is how a Swellendam paramedic actually speaks to someone. Medical terms follow
 * local usage: "antivenom" stays (it is the word the hospital uses and the word on the
 * vial), "simptome" and "hospitaal" are Afrikaans.
 *
 * Mechanism: one map, applied in a SINGLE pass over the string via a longest-match-first
 * alternation. One pass matters — a second pass could re-translate text the first pass
 * produced. Whole sentences are keys alongside fragments, so an exact match wins simply by
 * being the longest thing that matches.
 */
(function () {
  var SPECIES = {
    "Black Mamba": "Swartmamba (Black Mamba)",
    "Mozambique Spitting Cobra": "Mosambiekse Spoegkobra (Mozambique Spitting Cobra)",
    "Puff Adder": "Pofadder (Puff Adder)",
    "Southern African Python": "Suider-Afrikaanse Luislang (Southern African Python)",
    "Olive Grass Snake": "Olyfgrasslang (Olive Grass Snake)",
    "Mole Snake": "Molslang (Mole Snake)",
    "Eastern Tiger Snake": "Oostelike Tierslang (Eastern Tiger Snake)",
    "Cape Cobra": "Kaapse Kobra (Cape Cobra)",
    "Rinkhals": "Rinkhals",
    "Boomslang": "Boomslang",
    "Berg Adder": "Bergadder (Berg Adder)",
    "Common Night Adder": "Gewone Nagadder (Common Night Adder)"
  };

  var MAP = {
    // ---- language gate + welcome (u: first contact) ----
    "Welcome to SnakeIQ. Please choose your language.\n\nWelkom by SnakeIQ. Kies asseblief u taal.":
      "Welcome to SnakeIQ. Please choose your language.\n\nWelkom by SnakeIQ. Kies asseblief u taal.",
    "Hi. This is the SnakeIQ WhatsApp chatbot.\n\nI can help you to quickly get the right help for a snake bite.":
      "Hallo. Dit is die SnakeIQ WhatsApp-kletsbot.\n\nEk kan u help om vinnig die regte hulp vir 'n slangbyt te kry.",
    "Snake bite": "Slangbyt",
    "Snake spit in eye": "Slang het in oog gespoeg",
    "ID a snake": "Identifiseer 'n slang",

    // ---- first aid 1 ----
    "*To Do:*": "*Om te doen:*",
    "\u2022 Go to the nearest hospital with antivenom": "\u2022 Gaan na die naaste hospitaal met antivenom",
    "\u2022 Keep calm. Movement spreads venom": "\u2022 Bly kalm. Beweging versprei gif",
    "\u2022 Keep the body part that has been bitten as still as possible": "\u2022 Hou die liggaamsdeel wat gebyt is so stil as moontlik",
    "\u2022 Do NOT cut or suck the bite": "\u2022 MOENIE die byt sny of suig NIE",
    "Call ahead \u2014 this bite can affect breathing, and the hospital needs time to prepare antivenom.":
      "Bel vooruit \u2014 hierdie byt kan asemhaling raak, en die hospitaal het tyd nodig om antivenom voor te berei.",
    "Do NOT bandage tightly \u2014 this venom damages tissue and pressure makes it worse.":
      "MOENIE styf verbind NIE \u2014 hierdie gif beskadig weefsel en druk maak dit erger.",
    "Remove rings, watches and tight clothing now \u2014 swelling will be severe.":
      "Verwyder nou ringe, horlosies en stywe klere \u2014 die swelling gaan erg wees.",
    "Go to the nearest hospital with ": "Gaan na die naaste hospitaal met ",

    // ---- identify the snake ----
    "*Identify the snake*": "*Identifiseer die slang*",
    "#1 priority is to get to the hospital, but if you can ID the snake, it will help your treatment.":
      "Prioriteit #1 is om by die hospitaal te kom, maar as jy die slang kan identifiseer, sal dit jou behandeling help.",
    "A photo is the best way to identify the snake and see if it is dangerous.":
      "'n Foto is die beste manier om die slang te identifiseer en te sien of dit gevaarlik is.",
    "A photo is the best way to identify the snake.": "'n Foto is die beste manier om die slang te identifiseer.",
    "Only take a photo if you can do it safely": "Neem net 'n foto as jy dit veilig kan doen",
    "Take a photo": "Neem 'n foto",
    "Use existing photo": "Gebruik bestaande foto",
    "No photo, snake is gone": "Geen foto, slang is weg",
    "ID by description": "ID deur beskrywing",
    "No photo": "Geen foto",
    "What snake was it? Type the common or scientific name.": "Watter slang was dit? Tik die algemene of wetenskaplike naam.",
    "I can tell you the name of the species right now (type below)": "Ek kan die spesie se naam nou vir jou gee (tik hieronder)",
    "Selected: ": "Gekies: ",
    "Select": "Kies",

    // ---- photo / match ----
    "\u2705 Great, I\u2019ve got your location.\n\nNow here are the closest matches to your photo.\n\nTap the \u201cSelect\u201d button under the picture of the snake that bit you.":
      "\u2705 Mooi, ek het jou ligging.\n\nHier is die naaste passings by jou foto.\n\nTik die \u201cKies\u201d-knoppie onder die prent van die slang wat jou gebyt het.",
    "Closest matches from the local key. Tap Select on the snake you saw.":
      "Naaste passings uit die plaaslike sleutel. Tik Kies op die slang wat jy gesien het.",
    "Got your photo \u2014 looking for a match \u2026\n\nShare where you are while I find a match.\n\n\u2022 This helps me to match with snakes that live in this area\n\u2022 And it lets me help you find the nearest medical care":
      "Foto ontvang \u2014 ek soek na 'n passing \u2026\n\nDeel waar jy is terwyl ek soek.\n\n\u2022 Dit help my om te pas met slange wat in hierdie area leef\n\u2022 En dit laat my jou help om die naaste mediese sorg te vind",
    "That\u2019s a snake \u2014 looking for a match \u2026\n\nShare where you are while I find a match.\n\n\u2022 This helps me to match with snakes that live in this area\n\u2022 And it lets me help you find the nearest medical care":
      "Dis 'n slang \u2014 ek soek na 'n passing \u2026\n\nDeel waar jy is terwyl ek soek.\n\n\u2022 Dit help my om te pas met slange wat in hierdie area leef\n\u2022 En dit laat my jou help om die naaste mediese sorg te vind",
    "Based on your photo.": "Op grond van jou foto.",
    "Based on your answers.": "Op grond van jou antwoorde.",
    "Was anyone bitten or spat on?": "Is iemand gebyt of is daar op iemand gespoeg?",
    "More about this snake": "Meer oor hierdie slang",
    "Take new photo": "Neem nuwe foto",
    "Check symptoms": "Kontroleer simptome",
    "Symptoms have started": "Simptome het begin",
    "find a hospital with antivenom": "vind 'n hospitaal met antivenom",
    "Find Hospital": "Vind hospitaal",
    "Find hospital": "Vind hospitaal",
    "Go to the hospital now": "Gaan nou hospitaal toe",

    // ---- location ----
    "Send current location": "Stuur huidige ligging",
    "Pick a different spot": "Kies 'n ander plek",
    "Picked a location on the map": "Ligging op die kaart gekies",
    "Share your location to find the nearest antivenom.": "Deel jou ligging om die naaste antivenom te vind.",
    "Share your location to narrow the ID and find care.": "Deel jou ligging om die ID te verfyn en sorg te vind.",
    "Share your location to find a snake catcher near you.": "Deel jou ligging om 'n slangvanger naby jou te vind.",

    // ---- time of bite ----
    "*What time were you bitten?*\nYou started this chat at ": "*Hoe laat is jy gebyt?*\nJy het hierdie klets begin om ",
    "\n\nJust type and send the time.": "\n\nTik net die tyd en stuur.",
    "Type a time, e.g. 14:15\u2026": "Tik 'n tyd, bv. 14:15\u2026",

    // ---- spit in eye ----
    "Rinse the eye now \u2014 don\u2019t wait.\n\n\u2022 Flush with clean water or saline for 15\u201320 minutes.\n\u2022 Hold the eyelid open; roll the eye around.\n\u2022 Remove contact lenses if present.\n\u2022 Do not rub the eye.\n\nWas anyone also bitten?":
      "Spoel die oog nou \u2014 moenie wag nie.\n\n\u2022 Spoel met skoon water of soutoplossing vir 15\u201320 minute.\n\u2022 Hou die ooglid oop; rol die oog rond.\n\u2022 Verwyder kontaklense as daar is.\n\u2022 Moenie die oog vryf nie.\n\nIs iemand ook gebyt?",
    "No one was bitten": "Niemand is gebyt nie",
    "Someone was bitten": "Iemand is gebyt",
    "No antivenom is needed for venom in the eye, and it doesn\u2019t matter which snake it was \u2014 the treatment is the same. Share your location for the nearest eye care.":
      "Geen antivenom is nodig vir gif in die oog nie, en dit maak nie saak watter slang dit was nie \u2014 die behandeling is dieselfde. Deel jou ligging vir die naaste oogsorg.",
    "Nearest facilities that can treat a venom eye injury. Keep irrigating the eye while you travel.":
      "Naaste fasiliteite wat 'n gifoogbesering kan behandel. Hou aan om die oog te spoel terwyl jy reis.",
    "Eye casualty on site \u2014 no antivenom required.": "Oognood ter plaatse \u2014 geen antivenom nodig nie.",
    "Ophthalmologist on call": "Oogarts op roep",

    // ---- hospitals ----
    "Choose hospital": "Kies hospitaal",
    "Choose facility": "Kies fasiliteit",
    "Choose an option": "Kies 'n opsie",
    "Govt Hospital": "Staatshospitaal",
    "Private hospital": "Privaat hospitaal",
    " in stock": " in voorraad",
    "Limited stock": "Beperkte voorraad",
    "Antivenom confirmed in stock.": "Antivenom bevestig in voorraad.",
    " vials": " ampulle",
    " by car": " met die kar",
    "Open in Google Maps": "Maak oop in Google Maps",
    ", you need a ": ", jy het 'n ",
    " antivenom treatment.\n\nHere are the hospitals nearest you that have this available.\n\nTap on a hospital to get directions":
      " antivenom-behandeling nodig.\n\nHier is die hospitale naaste aan jou wat dit beskikbaar het.\n\nTik op 'n hospitaal vir aanwysings",
    "No specific antivenom specified, these are the nearest facilities with any antivenom. Tap one for directions.":
      "Geen spesifieke antivenom is gespesifiseer nie \u2014 dit is die naaste fasiliteite met enige antivenom. Tik op een vir aanwysings.",
    "A different hospital": "'n Ander hospitaal",
    "Different hospital": "Ander hospitaal",
    "Type the name of the facility": "Tik die naam van die fasiliteit",
    "Type the hospital name\u2026": "Tik die hospitaal se naam\u2026",
    "What is the name of the hospital you are going to?": "Wat is die naam van die hospitaal waarheen jy gaan?",
    "Which one?": "Watter een?",
    "\n\nIs this the right facility?": "\n\nIs dit die regte fasiliteit?",
    " vials in stock\n": " ampulle in voorraad\n",

    // ---- snake catchers ----
    "Contact snake catcher": "Kontak slangvanger",
    "View catchers": "Sien slangvangers",
    "Registered snake catchers near you. Tap to call \u2014 the number opens directly.":
      "Geregistreerde slangvangers naby jou. Tik om te bel \u2014 die nommer maak direk oop.",
    "Calling now. Stay on the line and keep your distance from the snake until help arrives.":
      "Bel nou. Bly op die lyn en hou afstand van die slang totdat hulp opdaag.",
    "Type \u201csnake catcher\u201d\u2026": "Tik \u201cslangvanger\u201d\u2026",

    // ---- non-venomous screen ----
    "Swelling spreading past the bite": "Swelling wat verby die byt versprei",
    "Severe or worsening pain": "Erge of vererende pyn",
    "Bleeding that will not stop": "Bloeding wat nie stop nie",
    "Drooping eyelids or blurred vision": "Hangende ooglede of wasige sig",
    "Numbness, tingling or dizziness": "Gevoelloosheid, tinteling of duiseligheid",
    "Trouble breathing or swallowing": "Sukkel om asem te haal of te sluk",
    "None of these": "Niks hiervan nie",
    "Something else \u2014 I\u2019ll describe it": "Iets anders \u2014 ek sal dit beskryf",
    "Type: \u201cthe skin around the bite is going dark\u201d\u2026": "Tik: \u201cdie vel om die byt word donker\u201d\u2026",
    "What you describe can be a sign of envenoming. The ID may be wrong \u2014 treat this as a venomous bite.\n\n\u2022 Keep still and calm; movement spreads venom.\n\u2022 Keep the bitten limb still.\n\u2022 Do NOT cut or suck the bite.\n\nGo to a hospital now.":
      "Wat jy beskryf kan 'n teken van vergiftiging wees. Die ID kan verkeerd wees \u2014 hanteer dit as 'n giftige byt.\n\n\u2022 Bly stil en kalm; beweging versprei gif.\n\u2022 Hou die gebyte ledemaat stil.\n\u2022 MOENIE die byt sny of suig NIE.\n\nGaan nou hospitaal toe.",
    "the photo ID is a non-venomous snake": "die foto-ID is 'n nie-giftige slang",
    "your description points to a non-venomous snake": "jou beskrywing dui op 'n nie-giftige slang",
    "the ID is a non-venomous snake": "die ID is 'n nie-giftige slang",
    "You haven\u2019t reported any of those signs, and ": "Jy het nie van daardie tekens gemeld nie, en ",
    " \u2014 so for now, treat the bite as a wound.\n\n\u2022 Wash the bite with clean water and soap.\n\u2022 Cover it with a clean dressing.\n\u2022 Keep it clean and watch it for infection.\n\u2022 See a clinic about a tetanus shot.\n\nMessage me if swelling, pain, bleeding, dizziness or trouble breathing starts.":
      " \u2014 hanteer die byt vir eers as 'n wond.\n\n\u2022 Was die byt met skoon water en seep.\n\u2022 Bedek dit met 'n skoon verband.\n\u2022 Hou dit skoon en let op vir infeksie.\n\u2022 Gaan sien 'n kliniek oor 'n klemseer-inspuiting.\n\nStuur my 'n boodskap as swelling, pyn, bloeding, duiseligheid of sukkel om asem te haal begin.",

    // ---- symptom check ----
    "*Symptom check*\n\nCan you answer a few questions about your snake bite symptoms?":
      "*Simptoomkontrole*\n\nKan jy 'n paar vrae oor jou slangbyt-simptome beantwoord?",
    "Not now": "Nie nou nie",
    "Tell us your symptoms as soon as you can.": "S\u00ea vir ons jou simptome so gou as jy kan.",
    "Report symptoms": "Meld simptome",
    "Are you still on your way to ": "Is jy nog op pad na ",
    " or have plans changed?": " of het planne verander?",
    "Still on my way": "Nog op pad",
    "Plans have changed": "Planne het verander",
    "What has changed?": "Wat het verander?",
    "False alarm": "Vals alarm",
    "False alarm, cancel hospital notification": "Vals alarm, kanselleer kennisgewing",
    "Cancel the hospital notification": "Kanselleer die hospitaalkennisgewing",
    "Treating at home": "Behandel tuis",
    "Giving treatment at home": "Gee behandeling tuis",
    "Other": "Ander",
    "Type what is happening": "Tik wat gebeur",
    "Type what is happening\u2026": "Tik wat gebeur\u2026",
    "Tell me what is happening and I\u2019ll help from here.": "S\u00ea my wat gebeur en ek help van hier af.",
    "I\u2019ve cancelled the notification to ": "Ek het die kennisgewing aan ",
    ".\n\nIf any symptoms appear \u2014 swelling, dizziness, drooping eyelids, trouble breathing \u2014 message me straight away and we will start again.":
      " gekanselleer.\n\nAs enige simptome verskyn \u2014 swelling, duiseligheid, hangende ooglede, sukkel om asem te haal \u2014 stuur my dadelik 'n boodskap en ons begin weer.",
    "Snake envenomations cannot be treated at home. Antivenom is the only treatment and it can only be given in a hospital.\n\n\u2022 Do not use cutting, sucking, burning, or herbal remedies \u2014 they cause harm and lose time.\n\u2022 Symptoms can turn severe with no warning.\n\nI can keep the hospital on standby if you change your mind.":
      "Slangvergiftiging kan nie tuis behandel word nie. Antivenom is die enigste behandeling en dit kan net in 'n hospitaal gegee word.\n\n\u2022 Moenie sny, suig, brand of kruiemiddels gebruik nie \u2014 dit doen skade en verloor tyd.\n\u2022 Simptome kan sonder waarskuwing erg raak.\n\nEk kan die hospitaal op bystand hou as jy van plan verander.",
    "Go to hospital": "Gaan hospitaal toe",
    "Stay home for now": "Bly voorlopig tuis",
    "Understood. I\u2019ll keep ": "Verstaan. Ek sal ",
    " on standby and check in again shortly.\n\nGo immediately if breathing becomes hard, speech slurs, eyelids droop, or swelling spreads.":
      " op bystand hou en binnekort weer inskakel.\n\nGaan onmiddellik as asemhaling swaar word, spraak onduidelik raak, ooglede hang, of swelling versprei.",

    // victim / bystander
    "Are you the victim?": "Is jy die slagoffer?",
    "Yes, I am the victim": "Ja, ek is die slagoffer",
    "No, I am with the victim": "Nee, ek is by slagoffer",
    "*What do you feel?*\n\nTick all the symptoms that you feel.": "*Wat voel jy?*\n\nMerk al die simptome wat jy voel.",
    "*What do you see?*\n\nTick all the symptoms that you see on the snake bite victim.":
      "*Wat sien jy?*\n\nMerk al die simptome wat jy by die slangbytslagoffer sien.",
    "Numbness in face or lips": "Gevoelloosheid in gesig of lippe",
    "Tingling in hands or feet": "Tinteling in hande of voete",
    "Dizziness": "Duiseligheid",
    "Nausea (feel like vomiting)": "Naarheid (voel of jy wil opgooi)",
    "Pain spreading up limb": "Pyn wat op met die ledemaat versprei",
    "Pain at the bite": "Pyn by die byt",
    "None, I feel fine": "Niks, ek voel reg",
    "Something else": "Iets anders",
    "type below": "tik hieronder",
    "Nothing I can see": "Niks wat ek kan sien nie",
    "Drooping eyelids": "Hangende ooglede",
    "Slurred speech": "Onduidelike spraak",
    "Trouble swallowing": "Sukkel om te sluk",
    "Trouble breathing": "Sukkel om asem te haal",
    "Swelling spreading fast": "Swelling versprei vinnig",
    "Type what you are feeling\u2026": "Tik wat jy voel\u2026",
    "Type what you can see\u2026": "Tik wat jy kan sien\u2026",
    "What else is happening? Type it below.": "Wat gebeur nog? Tik dit hieronder.",
    "ALL THAT APPLY": "MERK ALMAL WAT GELD",
    "Continue": "Gaan voort",
    "Submit": "Stuur",
    "WHAT YOU FEEL": "WAT JY VOEL",
    "WHAT YOU SEE": "WAT JY SIEN",

    // neuro warning
    "Lie on your left side \u2014 not flat on your back \u2014 to protect your airway if the paralysis spreads, and so you do not choke if you vomit.\n\n\u2022 Nothing to eat or drink from now on; if you were sipping water, stop.\n\u2022 Tell whoever is with you that your breathing may get weak.\n":
      "L\u00ea op jou linkersy \u2014 nie plat op jou rug nie \u2014 om jou lugweg te beskerm as die verlamming versprei, en sodat jy nie verstik as jy opgooi nie.\n\n\u2022 Niks om te eet of te drink van nou af nie; as jy water gedrink het, hou op.\n\u2022 S\u00ea vir wie ook al by jou is dat jou asemhaling swak kan word.\n",
    "\u2022 Do NOT loosen or remove the tourniquet or pressure bandage \u2014 early removal before antivenom risks a sudden bolus of venom.\n\u2022 Re-confirm the time it went on so ER knows how long it has been there (~4h practical limit).\n":
      "\u2022 MOENIE die drukverband of knelverband losmaak of verwyder NIE \u2014 vroe\u00eb verwydering voor antivenom kan 'n skielike stort gif veroorsaak.\n\u2022 Bevestig weer wanneer dit aangesit is sodat die noodeenheid weet hoe lank dit al daar is (~4 uur praktiese limiet).\n",
    "\u2022 You may become disoriented.\n": "\u2022 Jy kan gedisori\u00ebnteerd raak.\n",
    "For this type of snake only, tie a wide tourniquet (tight bandage or band) above the bite.":
      "Slegs vir hierdie tipe slang: bind 'n bre\u00eb knelverband (stywe verband of band) bo die byt vas.",
    "Apply a broad tourniquet above the bite \u2014 for this species only.":
      "Sit 'n bre\u00eb knelverband bo die byt aan \u2014 slegs vir hierdie spesie.",
    "Apply a firm pressure bandage over the bite and immobilise the limb.":
      "Sit 'n stewige drukverband oor die byt aan en hou die ledemaat onbeweeglik.",
    "Elevate the limb. Do NOT apply a tourniquet or pressure bandage.":
      "Lig die ledemaat op. MOENIE 'n knelverband of drukverband aansit NIE.",
    "Keep the bitten limb still and below heart level.": "Hou die gebyte ledemaat stil en onder harthoogte.",
    "Keep the bitten limb still.": "Hou die gebyte ledemaat stil.",
    "Move the victim onto their left side \u2014 not flat on their back \u2014 to protect the airway if paralysis progresses and to prevent aspiration if they vomit.\n\n\u2022 Nothing by mouth from this point on; if they were sipping water, stop.\n\u2022 Be ready to support breathing; keep dentures and food out of the mouth.\n":
      "Draai die slagoffer op sy of haar linkersy \u2014 nie plat op die rug nie \u2014 om die lugweg te beskerm as die verlamming vorder, en om te keer dat hulle inasem as hulle opgooi.\n\n\u2022 Niks per mond van hier af nie; as hulle water gedrink het, hou op.\n\u2022 Wees gereed om asemhaling te ondersteun; hou kunsgebit en kos uit die mond.\n",
    "\u2022 Do NOT bind or bandage the limb \u2014 for a ": "\u2022 MOENIE die ledemaat vasbind of verbind NIE \u2014 vir 'n ",
    " bite it stays elevated and still.\n": " se byt bly dit opgelig en stil.\n",
    "\nI\u2019m re-sending your pre-alert to ": "\nEk stuur jou vooraf-waarskuwing weer aan ",
    " flagged as neurotoxic progression, so they ready antivenom and an intubation kit.":
      " \u2014 gemerk as neurotoksiese vordering, sodat hulle antivenom en 'n intubasiestel gereed kry.",
    "NEUROLOGICAL PROGRESSION DETECTED": "NEUROLOGIESE VORDERING BESPEUR",
    "Ok": "Reg so",
    "Treatment guidance for a ": "Behandelingsriglyne vir 'n ",
    " bite is prepared for the hospital team \u2014 the full WHO protocol in plain language is the next piece to build.":
      " se byt is vir die hospitaalspan gereed \u2014 die volledige WGO-protokol in eenvoudige taal is die volgende stuk om te bou.",
    "Waiting for GPS\u2026": "Wag vir GPS\u2026",
    "GPS unavailable \u2014 falling back to the scripted Swellendam location.":
      "GPS nie beskikbaar nie \u2014 val terug op die geskrewe Swellendam-ligging.",

    // medicine
    "*Medicine check*\n\nHave you taken any medicine or herbal remedies since the bite?":
      "*Medisynekontrole*\n\nHet jy enige medisyne of kruiemiddels geneem sedert die byt?",
    "*Medicine check*\n\nHas the victim taken any medicine or herbal remedies since the bite?":
      "*Medisynekontrole*\n\nHet die slagoffer enige medisyne of kruiemiddels geneem sedert die byt?",
    "What medicines or herbal remedies have you taken? Just type your response.":
      "Watter medisyne of kruiemiddels het jy geneem? Tik net jou antwoord.",
    "Type the medication name\u2026": "Tik die medisyne se naam\u2026",
    "I\u2019ve made a note of that\n\nDo not take any more medicines or remedies until you are seen by a doctor":
      "Ek het dit aangeteken\n\nMoenie meer medisyne of middels neem voordat 'n dokter jou gesien het nie",
    "Okay": "Reg so",
    "Not sure": "Nie seker nie",

    // swelling + limb photo
    "Has swelling increased?": "Het die swelling toegeneem?",
    "Has the victim\u2019s swelling increased?": "Het die slagoffer se swelling toegeneem?",
    "*Swelling check*": "*Swellingkontrole*",
    "If you have a pen, draw a line around your bite where the swelling stops.\n\nWrite the time on the line.":
      "As jy 'n pen het, trek 'n lyn om jou byt waar die swelling ophou.\n\nSkryf die tyd op die lyn.",
    "If you have a pen, draw a line around the bite on the victim where the swelling stops.\n\nWrite the time on the line.":
      "As jy 'n pen het, trek 'n lyn om die byt op die slagoffer waar die swelling ophou.\n\nSkryf die tyd op die lyn.",
    "Take a photo of the bite.\n\n": "Neem 'n foto van die byt.\n\n",
    "A clear photo of the bite site helps the team at handover.": "'n Duidelike foto van die bytplek help die span met die oorhandiging.",
    "Include the edge of the swelling in the frame. Bruising and blistering build over hours, and the team will compare against this photo.":
      "Sluit die rand van die swelling in die raam in. Kneusing en blase bou oor ure op, en die span sal dit teen hierdie foto vergelyk.",

    // sent + terminal
    "Good job! We are sending your update ahead to ": "Mooi so! Ons stuur jou opdatering vooruit na ",
    "We are sending your update ahead to ": "Ons stuur jou opdatering vooruit na ",
    "Nothing else is needed from you. The menu stays open if you need it.":
      "Niks verder word van jou verwag nie. Die kieslys bly oop as jy dit nodig het.",
    "Menu": "Kieslys",
    "My bite information": "My bytinligting",
    "Snake, time, location, hospital, vials": "Slang, tyd, ligging, hospitaal, ampulle",
    "Treatment for ": "Behandeling vir ",
    "WHO protocol in plain language": "WGO-protokol in eenvoudige taal",
    "Change my status": "Verander my status",
    "Current status: checked into ": "Huidige status: ingeboek by ",
    "I have checked into the ER": "Ek het by noodeenheid ingeboek",
    "Hand over to the medical team": "Dra oor aan die mediese span",
    "Find a different hospital": "Vind 'n ander hospitaal",
    "See other facilities near you": "Sien ander fasiliteite naby jou",
    "Checked in at ": "Ingeboek by ",
    ". The medical team will take care of you now.": ". Die mediese span sal nou na jou omsien.",
    "You are checked into ": "Jy is ingeboek by ",
    ". What has changed?": ". Wat het verander?",
    "Moved hospital": "Na ander hospitaal",
    "Discharged": "Ontslaan",
    "Nothing, go back": "Niks, gaan terug",
    "Noted \u2014 discharged from ": "Genoteer \u2014 ontslaan van ",
    ". Follow-up care is the next piece to build.": ". Opvolgsorg is die volgende stuk om te bou.",

    // bite information record
    "Bite information": "Bytinligting",
    "Send as text": "Stuur as teks",
    "Send via email": "Stuur per e-pos",
    "Save to device": "Stoor op toestel",
    "Sent as text": "As teks gestuur",
    "Sent via email": "Per e-pos gestuur",
    "Saved to device": "Op toestel gestoor",
    "Name": "Naam",
    "Reported species": "Gemelde spesie",
    "Not identified": "Nie ge\u00efdentifiseer nie",
    "confirmed by description": "bevestig deur beskrywing",
    "Snake photo": "Slangfoto",
    "Sent by reporter": "Deur melder gestuur",
    "SnakeIQ reference image": "SnakeIQ-verwysingsbeeld",
    "Time reported": "Tyd gemeld",
    "Estimated time of bite": "Geskatte tyd van byt",
    " before chat started": " voor die klets begin het",
    "Not recorded": "Nie aangeteken nie",
    "Location": "Ligging",
    "Not shared": "Nie gedeel nie",
    "Symptoms": "Simptome",
    " \u00b7 recorded ": " \u00b7 aangeteken ",
    "None reported": "Niks gemeld nie",
    "Swelling": "Swelling",
    "Increased since last check": "Toegeneem sedert laaste kontrole",
    "No increase reported": "Geen toename gemeld nie",
    "Limb photo": "Ledemaatfoto",
    "Attached \u00b7 swelling line marked": "Aangeheg \u00b7 swellinglyn gemerk",
    "Attached": "Aangeheg",
    "Medications taken": "Medisyne geneem",
    "Sent to": "Gestuur na",

    // first aid 2 / species delta
    "First aid for a ": "Noodhulp vir 'n ",
    " venom acts fast. Don\u2019t wait for symptoms, get help now.\n\n": " se gif werk vinnig. Moenie vir simptome wag nie, kry nou hulp.\n\n",
    "\u2022 Go to a hospital with antivenom immediately": "\u2022 Gaan onmiddellik na 'n hospitaal met antivenom",
    "\u2022 Remove rings and tight clothing near the bite": "\u2022 Verwyder ringe en stywe klere naby die byt",

    // generic
    "Yes": "Ja",
    "No": "Nee",
    "(end of prototyped path)": "(einde van die geprototipeerde pad)",
    "Type the species name\u2026": "Tik die spesie se naam\u2026",
    "Type a message": "Tik 'n boodskap",
    "\n\nHere are the hospitals nearest you that have this available.\n\nTap on a hospital to get directions":
      "\n\nHier is die hospitale naaste aan jou wat dit beskikbaar het.\n\nTik op 'n hospitaal vir aanwysings",
    "Tap one of the buttons above so I can help you fastest.":
      "Tik een van die knoppies hierbo sodat ek jou die vinnigste kan help.",
    "I don\u2019t know that name. Let\u2019s go back to the description questions.":
      "Ek ken nie daardie naam nie. Kom ons gaan terug na die beskrywingsvrae.",
    "I didn\u2019t catch a time. Reply like 14:15 \u2014 2:15 pm works too.":
      "Ek het nie 'n tyd gekry nie. Antwoord soos 14:15 \u2014 2:15 nm werk ook.",
    "Thank you \u2014 a SnakeIQ responder will follow up to make sure you\u2019re ok.":
      "Dankie \u2014 'n SnakeIQ-reageerder sal opvolg om seker te maak jy is reg.",
    "Type: \u201cblack mamba\u201d\u2026": "Tik: \u201cswartmamba\u201d\u2026",
    "Type: \u201cwaiting for an ambulance\u2026\u201d": "Tik: \u201cwag vir 'n ambulans\u2026\u201d",
    "I know the species": "Ek ken die spesie",
    "Current location \u00b7 ": "Huidige ligging \u00b7 ",
    "LOW": "LAAG",
    "Under 30 centimetres": "Onder 30 sentimeter",
    "Under 1 metre": "Onder 1 meter",
    "1 to 2 metres": "1 tot 2 meter",
    "Over 2 metres": "Oor 2 meter",
    "Not sure": "Nie seker nie",
    "Messages are end-to-end encrypted. SnakeIQ never sees this thread until you send.":
      "Boodskappe is end-tot-end ge\u00ebnkripteer. SnakeIQ sien nooit hierdie gesprek voordat jy stuur nie.",
    "Help \u2014 snake!": "Help \u2014 slang!",
    "Analyzing the image\u2026 this may take a minute.": "Ontleed die beeld\u2026 dit kan 'n minuut neem.",
    "Non-venomous": "Nie-giftig",
    "Venomous": "Giftig",
    "None of the above": "Niks van bogenoemde nie",
    "SYMPTOM CHECK": "SIMPTOOMKONTROLE",
    "NOT RECOMMENDED": "NIE AANBEVEEL NIE",
    "What else is happening? Type it below.": "Wat gebeur nog? Tik dit hieronder.",
    "English": "English",
    "Afrikaans": "Afrikaans"
  };

  // Composed sentences the flow builds around a species name. Applied before the phrase
  // pass, because the species sits in the middle and Afrikaans wants it compounded.
  var RULES = [
    // The antivenom routing sentence is composed from species + product. Translated as a
    // whole so the Afrikaans reads as a sentence rather than a patched-together clause.
    [/For a (.+?), you need a (.+?) antivenom treatment\./,
      function (m) { return "Vir 'n " + name(m[1]) + " se byt het jy 'n " + m[2] + " antivenom-behandeling nodig."; }],
    [/^Was that (.+?) or (.+?)\?$/,
      function (m) { return "Was dit " + m[1] + " of " + m[2] + "?"; }],
    [/^A (.+?) bite is not venomous, but an ID can be wrong\. Which of these are happening now\?$/,
      function (m) { return "'n " + name(m[1]) + " se byt is nie giftig nie, maar 'n ID kan verkeerd wees. Wat hiervan gebeur nou?"; }],
    [/(.+?) bites often only leave a small scratch or bite mark, or no mark that can be seen\.\n\nThe (.+?) bite is still very dangerous/,
      function (m) { return name(m[1]) + " se byt laat dikwels net 'n klein skrapie of bytmerk, of geen sigbare merk nie.\n\nDie " + name(m[2]) + " se byt is steeds baie gevaarlik"; }]
  ];

  function name(n) { return SPECIES[n] || n; }

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  var KEYS = Object.keys(MAP).concat(Object.keys(SPECIES))
    .sort(function (a, b) { return b.length - a.length; });   // longest first: whole sentences win
  var ALL = {};
  Object.keys(MAP).forEach(function (k) { ALL[k] = MAP[k]; });
  Object.keys(SPECIES).forEach(function (k) { if (!ALL[k]) ALL[k] = SPECIES[k]; });
  var RE = new RegExp(KEYS.map(esc).join("|"), "g");

  window.SnakeIQ_AF = {
    species: SPECIES,
    // One pass. A second pass could re-translate what the first produced.
    t: function (s) {
      if (s == null) return s;
      var x = String(s);
      // Rules first, but only over the part they match: these sentences are emitted with a
      // prefix ("Take a photo of the bite.\n\n" + note), so a rule that returned its own
      // output wholesale would silently drop everything around it. Each match is parked
      // under a token, the phrase pass runs on what is left, then the tokens come back —
      // which also keeps rule output from being translated a second time.
      var parked = [];
      for (var i = 0; i < RULES.length; i++) {
        x = x.replace(RULES[i][0], function () {
          var m = Array.prototype.slice.call(arguments);
          parked.push(RULES[i][1](m));
          return "\u0000" + (parked.length - 1) + "\u0000";
        });
      }
      x = x.replace(RE, function (m) { return ALL[m] || m; });
      return x.replace(/\u0000(\d+)\u0000/g, function (_, k) { return parked[+k]; });
    }
  };
})();
