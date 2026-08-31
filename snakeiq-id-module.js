/* =====================================================================
   SnakeIQ Snake-ID MODULE  ·  the other side of Seams A and B
   Contract: uploads/SnakeIQ-ID-Module-Interface-Spec.md
   DATA layer: uploads/species.csv (61 Eswatini species) — transcribed below.

   Everything in this file is MODULE-OWNED. The Design prototype must not
   reimplement any of it: the species table, the symptom/time priors, the
   dichotomous key, the reweighting, the confidence threshold, the safety
   invariants, alertIntervalMin or firstCheckDueMin.
   Clinical fields are grounded in the National Snakebite Management
   Guidelines (Eswatini 2021) and remain PENDING LACHESIS SIGN-OFF.

   The engine logic here is a working stand-in so the seams can be walked
   end to end; the real engine replaces it behind the same two contracts.
   ===================================================================== */
(function(){

var SPECIES = [
 {
  "speciesId": "mamba_black",
  "commonName": "Black Mamba",
  "scientificName": "Dendroaspis polylepis",
  "siSwatiName": "iMamba",
  "tier": "deadly",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous",
  "syndromeClass": "neurotoxic",
  "syndromeRaw": "neurotoxic",
  "antivenom": {
   "required": true,
   "product": "Polyvalent",
   "notes": "Fast onset; symptoms 15min-2h"
  },
  "alertIntervalMin": 10,
  "cadenceBasis": "species (guideline Table 4)",
  "firstAid": "broad-tourniquet",
  "careLevel": "emergency",
  "notes": "Fast onset; symptoms 15min-2h"
 },
 {
  "speciesId": "cobra_snouted",
  "commonName": "Snouted Cobra",
  "scientificName": "Naja annulifera",
  "siSwatiName": "Phemphetfwane",
  "tier": "deadly",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous",
  "syndromeClass": "mixed",
  "syndromeRaw": "neurotoxic+cytotoxic",
  "antivenom": {
   "required": true,
   "product": "Polyvalent",
   "notes": "Neostigmine+atropine specific; onset to 6h"
  },
  "alertIntervalMin": 10,
  "cadenceBasis": "species (guideline Table 4)",
  "firstAid": "pressure-bandage",
  "careLevel": "emergency",
  "notes": "Neostigmine+atropine specific; onset to 6h"
 },
 {
  "speciesId": "cobra_mozam",
  "commonName": "Mozambique Spitting Cobra",
  "scientificName": "Naja mossambica",
  "siSwatiName": "Mfeti",
  "tier": "deadly",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "cytotoxic",
  "antivenom": {
   "required": true,
   "product": "Polyvalent",
   "notes": "Can spit venom in eye; most common serious bite"
  },
  "alertIntervalMin": 30,
  "cadenceBasis": "species (guideline Table 4)",
  "firstAid": "elevation",
  "careLevel": "emergency",
  "notes": "Can spit venom in eye; most common serious bite"
 },
 {
  "speciesId": "rinkhals",
  "commonName": "Rinkhals",
  "scientificName": "Hemachatus haemachatus",
  "siSwatiName": "Phemphetfwane",
  "tier": "deadly",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous",
  "syndromeClass": "mixed",
  "syndromeRaw": "mixed-cytotoxic+neurotoxic",
  "antivenom": {
   "required": true,
   "product": "Polyvalent",
   "notes": "Can spit venom in eye; follow neurotoxic cadence"
  },
  "alertIntervalMin": 10,
  "cadenceBasis": "species (guideline Table 4)",
  "firstAid": "limb-below-heart",
  "careLevel": "emergency",
  "notes": "Can spit venom in eye; follow neurotoxic cadence"
 },
 {
  "speciesId": "adder_puff",
  "commonName": "Puff Adder",
  "scientificName": "Bitis arietans",
  "siSwatiName": "Libululu",
  "tier": "deadly",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "cytotoxic",
  "antivenom": {
   "required": true,
   "product": "Polyvalent",
   "notes": "Escalate to 240min+20MWBCT if bleeding appears"
  },
  "alertIntervalMin": 30,
  "cadenceBasis": "species (guideline Table 4)",
  "firstAid": "elevation",
  "careLevel": "emergency",
  "notes": "Escalate to 240min+20MWBCT if bleeding appears"
 },
 {
  "speciesId": "boomslang",
  "commonName": "Boomslang",
  "scientificName": "Dispholidus typus",
  "siSwatiName": "Indlondlo",
  "tier": "deadly",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous",
  "syndromeClass": "hemotoxic",
  "syndromeRaw": "haemotoxic",
  "antivenom": {
   "required": true,
   "product": "Monovalent",
   "notes": "Bleeding can be delayed 15h+; call EAF for monovalent"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "species (guideline Table 4)",
  "firstAid": "pressure-bandage",
  "careLevel": "emergency",
  "notes": "Bleeding can be delayed 15h+; call EAF for monovalent"
 },
 {
  "speciesId": "vine_snake",
  "commonName": "Twig / Vine Snake",
  "scientificName": "Thelotornis capensis",
  "siSwatiName": "Lununkhu",
  "tier": "deadly",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous",
  "syndromeClass": "hemotoxic",
  "syndromeRaw": "haemotoxic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "species (guideline Table 4)",
  "firstAid": "pressure-bandage",
  "careLevel": "emergency",
  "notes": "No effective antivenom; bites very rare"
 },
 {
  "speciesId": "adder_berg",
  "commonName": "Berg Adder",
  "scientificName": "Bitis atropos",
  "siSwatiName": null,
  "tier": "rarely-seen-dangerous",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous (rarely seen)",
  "syndromeClass": "mixed",
  "syndromeRaw": "neurotoxic+cytotoxic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "pressure-bandage",
  "careLevel": "seek-care",
  "notes": "Rare; high mountains (Bulembu/Malolotja) only"
 },
 {
  "speciesId": "shield_nosed",
  "commonName": "Shield-nosed Snake",
  "scientificName": "Aspidelaps scutatus intermedius",
  "siSwatiName": null,
  "tier": "rarely-seen-dangerous",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous (rarely seen)",
  "syndromeClass": "neurotoxic",
  "syndromeRaw": "neurotoxic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "pressure-bandage",
  "careLevel": "seek-care",
  "notes": "Rare; venom possibly neurotoxic"
 },
 {
  "speciesId": "garter_zambezi",
  "commonName": "Zambezi Garter Snake",
  "scientificName": "Elapsoidea boulengeri",
  "siSwatiName": null,
  "tier": "rarely-seen-dangerous",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous (rarely seen)",
  "syndromeClass": "mixed",
  "syndromeRaw": "mild-systemic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "seek-care",
  "notes": "Cobra-type venom; usually short-lived symptoms"
 },
 {
  "speciesId": "garter_sundervall",
  "commonName": "Sundervall's Garter Snake",
  "scientificName": "Elapsoidea sundevalli",
  "siSwatiName": null,
  "tier": "rarely-seen-dangerous",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous (rarely seen)",
  "syndromeClass": "mixed",
  "syndromeRaw": "mild-systemic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "seek-care",
  "notes": "Poorly studied; nausea/vomiting/pain reported"
 },
 {
  "speciesId": "garter_decoster",
  "commonName": "De Coster's Garter Snake",
  "scientificName": "Elapsoidea sundevalli decosteri",
  "siSwatiName": null,
  "tier": "rarely-seen-dangerous",
  "venomStatus": "venomous",
  "venomStatusLabel": "Venomous (rarely seen)",
  "syndromeClass": "mixed",
  "syndromeRaw": "mild-systemic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "seek-care",
  "notes": "Subspecies of Sundervall's"
 },
 {
  "speciesId": "stiletto",
  "commonName": "Stiletto Snake / Bibron's Burrowing Asp",
  "scientificName": "Atractaspis bibronii",
  "siSwatiName": null,
  "tier": "mildly-venomous-painful",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-cytotoxic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "seek-care",
  "notes": "Cannot be safely held; side-swipe fang; no AV"
 },
 {
  "speciesId": "night_adder",
  "commonName": "Night Adder",
  "scientificName": "Causus rhombeatus",
  "siSwatiName": null,
  "tier": "mildly-venomous-painful",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-cytotoxic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "seek-care",
  "notes": "Active day/night; V-mark on head; no AV"
 },
 {
  "speciesId": "night_adder_snouted",
  "commonName": "Snouted Night Adder",
  "scientificName": "Causus defilippii",
  "siSwatiName": null,
  "tier": "mildly-venomous-painful",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-cytotoxic",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "seek-care",
  "notes": "Mild swelling; no AV"
 },
 {
  "speciesId": "tiger_eastern",
  "commonName": "Eastern Tiger Snake",
  "scientificName": "Telescopus semiannulata semiannulata",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "herald",
  "commonName": "Herald Snake",
  "scientificName": "Crotaphopeltis hotamboeia",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "treesnake_marbled",
  "commonName": "Marbled Tree Snake",
  "scientificName": "Dipsadoboa aulica",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Cat-eyed tree snake; mostly asymptomatic"
 },
 {
  "speciesId": "whip_shortsnouted",
  "commonName": "Short-snouted Whip Snake",
  "scientificName": "Psammophis brevirostris",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "sand_westernstripe",
  "commonName": "Western Stripe-bellied Sand Snake",
  "scientificName": "Psammophis subtaeniatus",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "grass_olive",
  "commonName": "Olive Grass Snake",
  "scientificName": "Psammophis mossambicus",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Can inflict a nasty bite"
 },
 {
  "speciesId": "whip_crossed",
  "commonName": "Crossed Whip Snake",
  "scientificName": "Psammophis crucifer",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "centipede_blackheaded",
  "commonName": "Black-headed Centipede-eater",
  "scientificName": "Aparallactus capensis",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "centipede_reticulated",
  "commonName": "Reticulated Centipede-eater",
  "scientificName": "Aparallactus lunulatus",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "skaapsteker_spotted",
  "commonName": "Spotted Skaapsteker",
  "scientificName": "Psammophylax rhombeatus",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "harlequin_spotted",
  "commonName": "Spotted Harlequin Snake",
  "scientificName": "Homoroselaps lacteus",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "harlequin_striped",
  "commonName": "Striped Harlequin Snake",
  "scientificName": "Homoroselaps dorsalis",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "purpleglossed_natal",
  "commonName": "Natal Purple-glossed Snake",
  "scientificName": "Amblyodipsas concolor",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "purpleglossed_common",
  "commonName": "Common Purple-glossed Snake",
  "scientificName": "Amblyodipsas polylepis",
  "siSwatiName": null,
  "tier": "mildly-venomous-mild",
  "venomStatus": "venomous",
  "venomStatusLabel": "Mildly venomous",
  "syndromeClass": "cytotoxic",
  "syndromeRaw": "mild-local",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": "No effective antivenom"
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure-monitor",
  "notes": "Mostly asymptomatic"
 },
 {
  "speciesId": "house_brown",
  "commonName": "Brown House Snake",
  "scientificName": "Lamprophis capensis",
  "siSwatiName": "umdlumi",
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "bush_spotted",
  "commonName": "Spotted Bush Snake",
  "scientificName": "Philothamnus semivariegatus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; often mistaken for green mamba (absent in Eswatini)"
 },
 {
  "speciesId": "green_easternnatal",
  "commonName": "Eastern Natal Green Snake",
  "scientificName": "Philothamnus natalensis natalensis",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "wolf_common",
  "commonName": "Common Wolf Snake",
  "scientificName": "Lycophidion capense",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "eggeater_common",
  "commonName": "Common Egg-eater",
  "scientificName": "Dasypeltis scabra",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; mimics adders defensively"
 },
 {
  "speciesId": "house_aurora",
  "commonName": "Aurora House Snake",
  "scientificName": "Lamprophis aurora",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "house_olive",
  "commonName": "Olive House Snake",
  "scientificName": "Lamprophis inornatus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "house_yellowbellied",
  "commonName": "Yellow-bellied House Snake",
  "scientificName": "Lamprophis fuscus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "rock_swazi",
  "commonName": "Swazi Rock Snake",
  "scientificName": "Lamprophis swazicus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; Eswatini endemic"
 },
 {
  "speciesId": "rock_spotted",
  "commonName": "Spotted Rock Snake",
  "scientificName": "Lamprophis guttatus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "water_duskybellied",
  "commonName": "Dusky-bellied Water Snake",
  "scientificName": "Lycodonomorphus laevissimus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "water_commonbrown",
  "commonName": "Common Brown Water Snake",
  "scientificName": "Lycodonomorphus rufulus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "water_floodplain",
  "commonName": "Floodplain Water Snake",
  "scientificName": "Lycodonomorphus obscuriventris",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "shovelsnout_eastafrican",
  "commonName": "East African Shovel-snout",
  "scientificName": "Prosymna stuhlmannii",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "shovelsnout_sundervall",
  "commonName": "Sundervall's Shovel-snout",
  "scientificName": "Prosymna sundevalli",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "semiornate",
  "commonName": "Semiornate Snake",
  "scientificName": "Meizodon semiornatus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "water_green",
  "commonName": "Green Water Snake",
  "scientificName": "Philothamnus hoplogaster",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "green_westernnatal",
  "commonName": "Western Natal Green Snake",
  "scientificName": "Philothamnus natalensis occidentalis",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "slugeater_common",
  "commonName": "Common Slug-eater",
  "scientificName": "Duberria lutrix",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "wolf_variegated",
  "commonName": "Variegated Wolf Snake",
  "scientificName": "Lycophidion variegatum",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "file_southern",
  "commonName": "Southern File Snake",
  "scientificName": "Mehelya capensis",
  "siSwatiName": "iMamba lukhonkhotse",
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; eats other snakes"
 },
 {
  "speciesId": "file_black",
  "commonName": "Black File Snake",
  "scientificName": "Mehelya nyassae",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "eggeater_southernbrown",
  "commonName": "Southern Brown Egg-eater",
  "scientificName": "Dasypeltis inornata",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless"
 },
 {
  "speciesId": "blind_schlegel",
  "commonName": "Schlegel's Blind Snake",
  "scientificName": "Rhinotyphlops schlegelii",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; burrowing"
 },
 {
  "speciesId": "blind_bibron",
  "commonName": "Bibron's Blind Snake",
  "scientificName": "Typhlops bibronii",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; burrowing"
 },
 {
  "speciesId": "worm_longtailed",
  "commonName": "Long-tailed Worm Snake",
  "scientificName": "Leptotyphlops longicaudus",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; burrowing"
 },
 {
  "speciesId": "worm_peters",
  "commonName": "Peter's Worm Snake",
  "scientificName": "Leptotyphlops scutifrons",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; burrowing"
 },
 {
  "speciesId": "worm_incognito",
  "commonName": "Incognito Worm Snake",
  "scientificName": "Leptotyphlops incognitos",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; burrowing"
 },
 {
  "speciesId": "worm_tello",
  "commonName": "Tello's Worm Snake",
  "scientificName": "Leptotyphlops telloi",
  "siSwatiName": null,
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; burrowing"
 },
 {
  "speciesId": "worm_cape",
  "commonName": "Cape Worm Snake",
  "scientificName": "Leptotyphlops conjunctus conjunctus",
  "siSwatiName": "umtfwana wenyoka lengaboni",
  "tier": "nonvenomous",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "reassure",
  "notes": "Harmless; burrowing"
 },
 {
  "speciesId": "python_southern",
  "commonName": "Southern African Python",
  "scientificName": "Python natalensis",
  "siSwatiName": "inhlatfu",
  "tier": "nonvenomous-nasty-bite",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous (nasty bite)",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "nasty-bite",
  "notes": "No venom but can inflict a bite needing stitches; protected species"
 },
 {
  "speciesId": "mole",
  "commonName": "Mole Snake",
  "scientificName": "Pseudaspis cana",
  "siSwatiName": "imboma",
  "tier": "nonvenomous-nasty-bite",
  "venomStatus": "nonvenomous",
  "venomStatusLabel": "Non-venomous (nasty bite)",
  "syndromeClass": "none",
  "syndromeRaw": "none",
  "antivenom": {
   "required": false,
   "product": null,
   "notes": null
  },
  "alertIntervalMin": 240,
  "cadenceBasis": "asymptomatic default (240 min)",
  "firstAid": "none",
  "careLevel": "nasty-bite",
  "notes": "No venom but can inflict a nasty bite"
 }
];

var BY_ID = {};
SPECIES.forEach(function(s){ BY_ID[s.speciesId] = s; });

/* ---- key geometry -------------------------------------------------
   Coarse morphological features per species. The deadly and rarely-seen
   sets are stated explicitly; the remaining fauna is grouped by genus
   prefix. The production engine carries curated per-species geometry.   */
var FEAT = {
  mamba_black:{ size:['large','medium'], colour:['grey','dark'], hood:['raised'], spit:['no'], habitat:['tree','rocky','grass','building'], pattern:['plain'] },
  cobra_snouted:{ size:['large','medium'], colour:['dark','brown','banded'], hood:['hood'], spit:['no'], habitat:['grass','building','rocky'], pattern:['plain','banded'] },
  cobra_mozam:{ size:['medium','small'], colour:['brown','grey'], hood:['hood'], spit:['yes'], habitat:['grass','building','water'], pattern:['plain'] },
  rinkhals:{ size:['medium','small'], colour:['dark','banded'], hood:['hood'], spit:['yes'], habitat:['grass','rocky'], pattern:['banded','blotched'] },
  adder_puff:{ size:['medium','small'], colour:['brown'], hood:['no'], spit:['no'], habitat:['grass','rocky'], pattern:['geometric'] },
  boomslang:{ size:['large','medium'], colour:['green','brown','dark'], hood:['no'], spit:['no'], habitat:['tree'], pattern:['plain'] },
  vine_snake:{ size:['medium','small'], colour:['grey','brown'], hood:['no'], spit:['no'], habitat:['tree'], pattern:['blotched'] },
  adder_berg:{ size:['small'], colour:['brown','grey'], hood:['no'], spit:['no'], habitat:['rocky'], pattern:['geometric'] },
  shield_nosed:{ size:['small'], colour:['brown','banded'], hood:['hood'], spit:['no'], habitat:['underground','grass'], pattern:['banded'] },
  night_adder:{ size:['small'], colour:['brown'], hood:['no'], spit:['no'], habitat:['grass','water'], pattern:['blotched'] },
  night_adder_snouted:{ size:['small'], colour:['brown'], hood:['no'], spit:['no'], habitat:['grass','water'], pattern:['blotched'] },
  stiletto:{ size:['small'], colour:['dark'], hood:['no'], spit:['no'], habitat:['underground'], pattern:['plain'] },
  python_southern:{ size:['large'], colour:['brown'], hood:['no'], spit:['no'], habitat:['water','rocky','grass'], pattern:['blotched'] },
  mole:{ size:['large','medium'], colour:['dark','brown'], hood:['no'], spit:['no'], habitat:['grass','underground'], pattern:['plain'] }
};
var GROUP = [
  [/^garter_/,      { size:['small'], colour:['banded','dark'], hood:['no'], spit:['no'], habitat:['grass','underground'], pattern:['banded'] }],
  [/^(worm_|blind_)/,{ size:['tiny'], colour:['brown','other'], hood:['no'], spit:['no'], habitat:['underground'], pattern:['plain'] }],
  [/^water_/,       { size:['small','medium'], colour:['brown','dark','green'], hood:['no'], spit:['no'], habitat:['water'], pattern:['plain'] }],
  [/^(green_|bush_|treesnake_)/,{ size:['small','medium'], colour:['green'], hood:['no'], spit:['no'], habitat:['tree'], pattern:['plain'] }],
  [/^(house_|rock_)/,{ size:['small'], colour:['brown'], hood:['no'], spit:['no'], habitat:['building','rocky'], pattern:['plain','blotched'] }],
  [/^eggeater_/,    { size:['small'], colour:['brown','grey'], hood:['no'], spit:['no'], habitat:['grass','tree'], pattern:['geometric'] }],
  [/^(whip_|sand_|grass_|skaapsteker_)/,{ size:['medium','small'], colour:['brown','grey'], hood:['no'], spit:['no'], habitat:['grass'], pattern:['plain','blotched'] }],
  [/^harlequin_/,   { size:['small'], colour:['banded'], hood:['no'], spit:['no'], habitat:['underground','grass'], pattern:['banded'] }],
  [/^tiger_/,       { size:['small'], colour:['brown','banded'], hood:['no'], spit:['no'], habitat:['rocky','tree'], pattern:['blotched'] }]
];
var DEFAULT_FEAT = { size:['small'], colour:['brown','dark'], hood:['no'], spit:['no'], habitat:['grass','underground'], pattern:['plain'] };

function feat(id){
  if (FEAT[id]) return FEAT[id];
  for (var i=0;i<GROUP.length;i++) if (GROUP[i][0].test(id)) return GROUP[i][1];
  return DEFAULT_FEAT;
}

/* ---- priors (spec: symptom → lean, symptom × time interaction) ----- */
var LEAN = {
  sym_breath: { neurotoxic:3.0, mixed:2.2, cytotoxic:0.7, hemotoxic:0.6, none:0.4 },
  sym_ptosis: { neurotoxic:3.0, mixed:2.2, cytotoxic:0.7, hemotoxic:0.6, none:0.5 },
  sym_dizzy:  { neurotoxic:1.1, mixed:1.1, cytotoxic:1.0, hemotoxic:1.0, none:1.0 },
  sym_spread: { neurotoxic:0.9, mixed:1.6, cytotoxic:3.0, hemotoxic:1.2, none:0.5 },
  sym_local:  { neurotoxic:0.9, mixed:1.4, cytotoxic:2.4, hemotoxic:1.0, none:1.0 },
  sym_none:   { neurotoxic:1.0, mixed:1.0, cytotoxic:1.0, hemotoxic:1.0, none:1.2 }
};
var ELAPSED = { t_lt5:0, t_5_15:5, t_15_60:15, t_1_6h:60, t_gt6h:360 };
var FAST = { mamba_black:1, cobra_snouted:1, rinkhals:1 };
var THRESHOLD = 0.85, MAX_QUESTIONS = 5, DEADLY_FLOOR = 0.03;

function createSession(seamA){
  var priors = (seamA && seamA.syndromicPriors) || null;
  var symptom = priors ? priors.primarySymptom : null;
  var time = priors ? priors.timeSinceBite : null;
  var lean = LEAN[symptom] || null;
  var w = {};
  SPECIES.forEach(function(s){
    var base = s.tier === 'deadly' ? 1.0 : (s.tier === 'rarely-seen-dangerous' ? 0.5 : 0.8);
    if (lean) base *= (lean[s.syndromeClass] === undefined ? 1 : lean[s.syndromeClass]);
    // SAFETY: sym_none / sym_dizzy, and recency or elapsed time alone, must never
    // prune fast-onset elapids — early absence of signs is not reassurance.
    if (FAST[s.speciesId]){
      if (symptom === 'sym_none' || symptom === 'sym_dizzy' || !symptom) base = Math.max(base, 1.0);
      if (symptom === 'sym_none' && (time === 't_lt5' || time === null)) base = Math.max(base, 1.4);
    }
    w[s.speciesId] = base;
  });
  return { sessionId: seamA && seamA.sessionId, victim: (seamA && seamA.victim) || 'self',
    location: seamA && seamA.location, primarySymptom: symptom, timeSinceBite: time,
    weights: w, asked: [], answers: [] };
}

/* ---- adaptive question selection ---------------------------------- */
var NODES = [
  { id:'key_spit', discriminatesOn:'spit', inputType:'quick_reply',
    prompt:'Did the snake spray or spit anything toward the face or eyes?',
    options:[ {label:'Yes, it sprayed', value:'yes'}, {label:'No', value:'no'}, {label:'Not sure', value:'any'} ] },
  { id:'key_hood', discriminatesOn:'hood', inputType:'quick_reply',
    prompt:'Did it lift the front of its body off the ground?',
    options:[ {label:'Yes, spread a hood', value:'hood'}, {label:'Lifted, no hood', value:'raised'}, {label:'Neither', value:'no'} ] },
  { id:'key_size', discriminatesOn:'size', inputType:'list_picker', button:'Choose a length',
    prompt:'Roughly how long was the snake?',
    options:[ {label:'Under 30 cm', value:'tiny'}, {label:'Under 1 m', value:'small'},
              {label:'1 to 2 m', value:'medium'}, {label:'Over 2 m', value:'large'}, {label:'Not sure', value:'any'} ] },
  { id:'key_colour', discriminatesOn:'colour', inputType:'list_picker', button:'Choose a colour',
    prompt:'What colour was it, overall?',
    options:[ {label:'Black or very dark', value:'dark'}, {label:'Brown or tan', value:'brown'},
              {label:'Grey or olive', value:'grey'}, {label:'Bright green', value:'green'},
              {label:'Banded or ringed', value:'banded'}, {label:'Other or mixed', value:'other'},
              {label:'Not sure', value:'any'} ] },
  { id:'key_pattern', discriminatesOn:'pattern', inputType:'quick_reply',
    prompt:'What markings did it have?',
    options:[ {label:'None — plain', value:'plain'}, {label:'Chevrons or bars', value:'geometric'},
              {label:'Blotches or speckles', value:'blotched'} ] },
  { id:'key_habitat', discriminatesOn:'habitat', inputType:'list_picker', button:'Choose a place',
    prompt:'Where was the snake when you saw it?',
    options:[ {label:'In or near water', value:'water'}, {label:'In a tree or bush', value:'tree'},
              {label:'In grass or veld', value:'grass'}, {label:'Inside a building', value:'building'},
              {label:'On rocky ground', value:'rocky'}, {label:'Under soil or leaves', value:'underground'} ] }
];

function live(session){
  var t = 0, out = [];
  SPECIES.forEach(function(s){ t += session.weights[s.speciesId]; });
  SPECIES.forEach(function(s){
    var c = session.weights[s.speciesId] / t;
    if (c > 0.001) out.push({ s:s, c:c });
  });
  return out.sort(function(a,b){ return b.c - a.c; });
}

// Gini impurity of the weight split a node would produce. 0 = every live
// candidate answers it the same way, so the node cannot change the ranking.
function gain(node, cands){
  var buckets = {}, total = 0;
  cands.forEach(function(x){
    var vals = feat(x.s.speciesId)[node.discriminatesOn] || [];
    var key = vals.slice().sort().join('|');
    buckets[key] = (buckets[key]||0) + x.c; total += x.c;
  });
  var g = 1;
  Object.keys(buckets).forEach(function(k){ var p = buckets[k]/total; g -= p*p; });
  return g;
}

function nextQuestion(session){
  if (session.asked.length >= MAX_QUESTIONS) return null;
  var cands = live(session);
  if (cands.length && cands[0].c >= THRESHOLD) return null;
  var best = null, bestG = 0;
  NODES.forEach(function(n){
    if (session.asked.indexOf(n.id) >= 0) return;
    var g = gain(n, cands);
    if (g > bestG + 0.001){ bestG = g; best = n; }
  });
  if (!best || bestG < 0.05) return null;   // nothing left that discriminates
  // Report PLAUSIBLE candidates (the same >= 0.05 cut result() displays), not every
  // non-zero weight — floored species stay alive internally but aren't real answers.
  var plausible = cands.filter(function(x){ return x.c >= 0.05; }).length;
  return { questionId: best.id, prompt: best.prompt, inputType: best.inputType,
    button: best.button, options: best.options, discriminatesOn: best.discriminatesOn,
    step: session.asked.length + 1, gain: Math.round(bestG*100)/100,
    liveCandidates: plausible, weightedCandidates: cands.length };
}

function answer(session, questionId, value){
  var node = NODES.filter(function(n){ return n.id === questionId; })[0];
  session.asked.push(questionId);
  session.answers.push({ questionId: questionId, answer: value });
  if (!node || value === 'any') return session;      // "not sure" reweights nothing
  var before = 0;
  SPECIES.forEach(function(s){ before += session.weights[s.speciesId]; });
  SPECIES.forEach(function(s){
    var vals = feat(s.speciesId)[node.discriminatesOn] || [];
    session.weights[s.speciesId] *= (vals.indexOf(value) >= 0) ? 3.0 : 0.15;
  });
  // SAFETY: reweight, never eliminate. A deadly species keeps a floor while
  // the description is still ambiguous — one answer cannot prune it away.
  var after = 0;
  SPECIES.forEach(function(s){ after += session.weights[s.speciesId]; });
  SPECIES.forEach(function(s){
    if (s.tier === 'deadly') session.weights[s.speciesId] =
      Math.max(session.weights[s.speciesId], DEADLY_FLOOR * after);
  });
  return session;
}

/* ---- Seam B ------------------------------------------------------- */
function result(session){
  // The deadly floor governs PRUNING, not display: a species held at the floor is
  // still alive in the engine but is not a plausible answer to show the user.
  var cands = live(session).filter(function(x){ return x.c >= 0.05; }).slice(0, 4);
  var top = cands[0];
  // Dominant = clears the threshold, or leads a field with no other plausible candidate.
  var dominant = !!top && (top.c >= THRESHOLD || (top.c >= 0.5 && (!cands[1] || cands[1].c < 0.10)));
  var out = cands.map(function(x){
    return { speciesId:x.s.speciesId, commonName:x.s.commonName, scientificName:x.s.scientificName,
      confidence: Math.round(x.c*100)/100, venomStatus:x.s.venomStatus, venomStatusLabel:x.s.venomStatusLabel,
      syndromeClass:x.s.syndromeClass, antivenom:x.s.antivenom, alertIntervalMin:x.s.alertIntervalMin,
      cadenceBasis:x.s.cadenceBasis, firstAid:x.s.firstAid, careLevel:x.s.careLevel,
      tier:x.s.tier, notes:x.s.notes };
  });
  var interval = out.length ? out[0].alertIntervalMin : 240;
  var elapsed = session.timeSinceBite && ELAPSED[session.timeSinceBite] !== undefined
    ? ELAPSED[session.timeSinceBite] : 0;   // unknown time → schedule from full interval
  return { sessionId: session.sessionId, confirmed: false,
    selectedSpeciesId: dominant ? out[0].speciesId : null,
    candidates: out,
    caseContext: { primarySymptom: session.primarySymptom, timeSinceBite: session.timeSinceBite,
      victim: session.victim, location: session.location },
    firstCheckDueMin: Math.max(0, interval - elapsed),
    questionsAsked: session.asked.length,
    handBackTo: 'find_antivenom' };
}

window.SnakeIQID = { SPECIES: SPECIES, byId: function(id){ return BY_ID[id]; },
  NODES: NODES, ELAPSED: ELAPSED, THRESHOLD: THRESHOLD,
  createSession: createSession, nextQuestion: nextQuestion, answer: answer, result: result,
  live: live };

})();
