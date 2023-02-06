'use strict';

const app = require('express')();
const path = require('path');


// Sample endpoint that sends the partner's name
app.get('/topic', function (req, res) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic': topic});
});

const prompts = {
    1: {
        "question": "Que voulez-vous faire sur ce boulevard ?",
        "choices": [{
            "prompt": "Planter des arbres",
            "positive": "POSITIF </br>- Réduction de la température.",
            "negative": "NEGATIF </br>- Ronge de l'espace public.",
            "explanation": "Planter des arbres en ville est une solution pour lutter contre les îlots de chaleur. Les arbres apportent de l’ombre et compensent avec les milieux urbains à base de béton, d’asphalte ou de goudron. L’arbre bloque la lumière du soleil, fait de l’ombre et transpire par ses feuilles, ce qui crée de l’humidité et permet d’assurer une climatisation naturelle.</br>" +
                "Une étude menée par l’Ademe (Agence de l'environnement et de la maîtrise de l'énergie) en juin 2022 démontre qu’un arbre mature peut évaporer jusqu’à 450 litres d’eau par jour. C’est l’équivalent de cinq climatiseurs qui tourneraient pendant 20h : utile pour rafraîchir une rue !</br>" +
                "Planter quelques arbres, c’est sympa, mais les effets seront visibles d’ici quelques années. Bon choix cependant !",
            "temperature": -1,
            "happiness": 1,
            "money": -1,
            "nextQuestion": 2,
            "image": "boulevard1"
        },
            {
                "prompt": "Planter beaucoup d’arbres mais ronger sur une voie de circulation",
                "positive": "POSITIF </br>- Réduction rapide de la température. </br>- Apporte de l'ombre.",
                "negative": "NEGATIF </br>- Met du temps à avoir un effet significatif </br>- Mécontentement de la population. </br>- Une partie des arbres meurt avec le temps.",
                "explanation": "Planter des arbres en ville est une solution pour lutter contre les îlots de chaleur. Mais les racines entrent en conflit avec ce qu’il y a dans le sous-sol : les câbles de fibre optique, les canalisations, parfois les parkings ou les métros… Il faut donc prendre cela en compte et étudier les sols, ce qui est coûteux.</br>" +
                    "En plus, \"un arbre planté dans un sol tassé, pavé, sans place suffisante pour ses racines pousse deux fois moins vite\", explique à BFMTV.com Marjorie Musy, directrice de recherche au Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement.</br>" +
                    "Prendre de la place sur la route, c’est une solution. Mais gare au mécontentement des adeptes des véhicules à moteur !",
                "temperature": -2,
                "happiness": -1,
                "money": -2,
                "nextQuestion": 2,
                "image": "boulevard2"
            }]
    },
    2: {
        "question": "Que voulez-vous faire sur ce parking ?",
        "choices": [{
            "prompt": "Planter des arbres directement sur le parking",
            "positive": "POSITIF </br>- Solution rapide",
            "negative": "NEGATIF </br>- Peu efficace",
            "explanation": "Le sol n’a pas été préparé en amont, il est perméable. \"Un arbre planté dans un sol tassé, pavé, sans place suffisante pour ses racines pousse deux fois moins vite, a moitié moins de feuilles et évapore quatre fois moins\", explique à BFMTV.com Marjorie Musy, directrice de recherche au Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement.</br>"+
                "Des jeunes pousses d’arbres vont mettre longtemps à atteindre leur âge adulte. La croissance d’un arbre est comprise entre 30 et 60 cm par an.</br>" +
                "L’idée est là, mais avant d’être efficace contre la canicule, on aura le temps d’en voir passer d’autres.",
            "temperature": -1,
            "happiness": -2,
            "money": -1,
            "nextQuestion": 4,
            "image": "parking1"
        },
            {
                "prompt": "Destruction de la chaussée et déperméabilisation pour planter des arbres",
                "positive": "POSITIF</br>- Les arbres ont de la place",
                "negative": "NEGATIF</br>- Moins de stationnements pour les voitures",
                "explanation": "En voilà une idée! Préparer le sol pour planter correctement les arbres… \"Un arbre planté dans un sol tassé, pavé, sans place suffisante pour ses racines pousse deux fois moins vite, a moitié moins de feuilles et évapore quatre fois moins\", explique à BFMTV.com Marjorie Musy, directrice de recherche au Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement.</br>"+
                    "Il serait donc judicieux de rendre le sol de nouveau perméable, même si sa composition n’est pas toujours adaptée à la croissance des arbres…</br>" +
                    "Et alors que dire des places de parkings supprimées? Coups de klaxons assurés!",
                "temperature": 0,
                "happiness": -2,
                "money": -2,
                "nextQuestion": 3,
                "image": "parking2"
            }]
    },
    3: {
        "question": "Comment planter ces arbres ?",
        "choices": [{
            "prompt": "Avec un parc exotique",
            "positive": "POSITIF</br>",
            "negative": "NEGATIF</br>",
            "explanation": "On a tous besoin d’évasion. Mais créer un parc exotique, pas sûr que ce soit très productif. On parle alors de verdissement. Ok, c’est agréable de se promener sous des palmiers. Mais la biodiversité ne peut pas s’adapter à ce genre d’espèces. Il s’agit davantage de notions d’urbanismes que de préservation de l’environnement.</br>Au moins, ça attire les curieux !",
            "temperature": -1,
            "happiness": 3,
            "money": -2,
            "nextQuestion": 4,
            "image": "parking3"
        },
            {
                "prompt": "Implanter une forêt naturelle",
                "positive": "POSITIF</br>",
                "negative": "NEGATIF</br>",
                "explanation": "C’est sûrement LA solution la plus efficace pour lutter contre les fortes chaleurs. On parle alors de renaturation, un mot associé à “réparation”. Il désigne le processus par lequel la nature se réinstalle spontanément dans la ville. Il s'agit de restaurer le bon état écologique des sites à travers des opérations d'aménagement, de gestion des espaces et de sensibilisation des usagers.</br>"+
                    "L’Agence régionale de la biodiversité d’Île-de-France distingue trois étapes dans la renaturalisation : la reconquête de la biodiversité, l’adaptation aux changements climatiques et l’amélioration de la santé et du cadre de vie.</br>" +
                    "Objectif : redonner à la nature ses droits !",
                "temperature": -2,
                "happiness": 1,
                "money": 1,
                "nextQuestion": 4,
                "image": "parking4"
            }]
        },
            4: {
                "question": "Que voulez-vous faire sur cette place ?",
                "choices": [{
                    "prompt": "Faire renaître la rivière",
                    "positive": "POSITIF</br>- Intéressant pour la biodiversité et le bien-être de la population</br>- Réduit le risque d'inondation accentué par le béton",
                    "negative": "NEGATIF</br>- Coûteux",
                    "explanation": "Il s’agit de renaturalisation : ramener la nature là où elle était avant. Dans les villes, les rivières ont été recouvertes pendant l’urbanisation. Pourtant, elles permettent d’apporter de la fraîcheur et de l’humidité dans les centre-ville, un bon moyen de lutter contre la chaleur. D’un autre côté, diminuer le béton en ville diminue le risque d’inondation : en cas de pluie, l’eau rejoint la rivière plutôt que de couler à toute vitesse dans les caniveaux.</br>" +
                        "Surtout, rouvrir une rivière permet de recréer un écosystème avec les espèces qui vivent en ville.</br>" +
                        "Plusieurs exemples montrent aussi que le retour de l’eau dans les centre-ville est utile pour le commerce et le bien-être de la population.",
                    "temperature": -1,
                    "happiness": 1,
                    "money": -2,
                    "nextQuestion": 5,
                    "image": "place1"
                },
                    {
                        "prompt": "NE PAS faire renaître la rivière",
                        "positive": "POSITIF</br>- Ne coûte rien",
                        "negative": "NEGATIF</br>- La ville n'évolue pas",
                        "explanation": "Ne pas faire renaître la rivière a peu d'effets. La ville ne changera pas et les habitants ne seront pas impactés. Malheureusement, le plein potentiel de la rivière reste coincé sous terre.",
                        "temperature": 2,
                        "happiness": 0,
                        "money": 2,
                        "nextQuestion": 6,
                        "image": "place"
                    }]
            },
            5: {
                "question": "Que voulez-vous planter ?",
                "choices": [{
                    "prompt": "De l'herbe",
                    "positive": "POSITIF</br>- L'herbe permet de diminuer la température</br>- Une bonne alternative aux arbres",
                    "negative": "NEGATIF</br>- Les gens marchent dessus",
                    "explanation": "Ramener la nature en ville : c’est une solution pour diminuer la température dans les centres urbains. Planter de l’herbe peut-être une solution. Simple constat : en cas de forte chaleur, une surface bitumée sera 15°C plus chaude qu’une étendue de gazon. Il y a donc un véritable avantage à semer de l’herbe. D’autant plus qu’un tel tapis vert sera apprécié par la population pour les soirées d’été, les sorties des enfants ou la promenade des animaux de compagnie.</br>" +
                        "À noter que cette utilisation par les habitants peut avoir des conséquences sur l’efficacité du gazon. On parle de ligne de désir. C’est le phénomène par lequel les humains dessinent eux-mêmes leurs passages, en contournant les aménagements bien en place. Conséquence : cela abîme le gazon et diminue son efficacité.</br>" +
                        "Déjà, vous avez retenu que, pour planter des arbres, il faut prendre en compte le sous-sol. Avec le gazon, cette problématique est moindre.",
                    "temperature": -1,
                    "happiness": 1,
                    "money": 2,
                    "nextQuestion": 7,
                    "image": "place4"
                },
                    {
                        "prompt": "Des arbres",
                        "positive": "POSITIF</br>- Effets importants sur la température</br>- Réduit le phénomène d'îlot de chaleur",
                        "negative": "NEGATIF</br>- Aménagement long</br>- Coûteux</br>- Nombreuses contraintes",
                        "explanation": "En voilà une bonne idée ! Transformer la place principale de la ville en un endroit arboré, ombragé. Mais avez-vous pensé au sous-sol ? C’est surement l’endroit le plus délicat pour les racines : tuyaux, réseaux. Qui vous dit qu’il n’y a pas un parking ou une ligne de métro sous cet endroit ? Vous allez nous dire : et si on les plantait dans des pots. Pas de bol, c’est une fausse bonne idée. À l’étroit dans des bacs, les racines ne vont pas pouvoir s’étendre, la croissance de l’arbre va être moindre, et ses effets sur la chaleur seront moins efficaces.</br>" +
                            "En attendant, l’aménagement est possible, mais il est long à mettre en place, et couteux.",
                        "temperature": -2,
                        "happiness": 2,
                        "money": -2,
                        "nextQuestion": 7,
                        "image": "place5"
                    }]
            },
            6: {
                "question": "Que voulez-vous planter ?",
                "choices": [{
                    "prompt": "De l'herbe",
                    "positive": "POSITIF</br>- L'herbe permet de diminuer la température</br>- Une bonne alternative aux arbres",
                    "negative": "NEGATIF</br>- Les gens marchent dessus",
                    "explanation": "Ramener la nature en ville : c’est une solution pour diminuer la température dans les centres urbains. Planter de l’herbe peut-être une solution. Simple constat : en cas de forte chaleur, une surface bitumée sera 15°C plus chaude qu’une étendue de gazon. Il y a donc un véritable avantage à semer de l’herbe. D’autant plus qu’un tel tapis vert sera apprécié par la population pour les soirées d’été, les sorties des enfants ou la promenade des animaux de compagnie.</br>" +
                        "À noter que cette utilisation par les habitants peut avoir des conséquences sur l’efficacité du gazon. On parle de ligne de désir. C’est le phénomène par lequel les humains dessinent eux-mêmes leurs passages, en contournant les aménagements bien en place. Conséquence : cela abîme le gazon et diminue son efficacité.</br>" +
                        "Déjà, vous avez retenu que, pour planter des arbres, il faut prendre en compte le sous-sol. Avec le gazon, cette problématique est moindre.",
                    "temperature": -1,
                    "happiness": 1,
                    "money": 2,
                    "nextQuestion": 7,
                    "image": "place3"
                },
                    {
                        "prompt": "Des arbres",
                        "positive": "POSITIF</br>- Effets importants sur la température</br>- Réduit le phénomène d'îlot de chaleur",
                        "negative": "NEGATIF</br>- Aménagement long</br>- Coûteux</br>- Nombreuses contraintes",
                        "explanation": "En voilà une bonne idée ! Transformer la place principale de la ville en un endroit arboré, ombragé. Mais avez-vous pensé au sous-sol ? C’est surement l’endroit le plus délicat pour les racines : tuyaux, réseaux. Qui vous dit qu’il n’y a pas un parking ou une ligne de métro sous cet endroit ? Vous allez nous dire : et si on les plantait dans des pots. Pas de bol, c’est une fausse bonne idée. À l’étroit dans des bacs, les racines ne vont pas pouvoir s’étendre, la croissance de l’arbre va être moindre, et ses effets sur la chaleur seront moins efficaces.</br>" +
                            "En attendant, l’aménagement est possible, mais il est long à mettre en place, et couteux.",
                        "temperature": -2,
                        "happiness": 2,
                        "money": -2,
                        "nextQuestion": 7,
                        "image": "place2"
                    }]
            },
            7: {
                "question": "Que voulez-vous faire avec cette friche ?",
                "choices": [{
                    "prompt": "Créer un potager partagé",
                    "positive": "POSITIF</br>-Grande étendue verte",
                    "negative": "NEGATIF</br>- Sélection des espèces",
                    "explanation": "Cultiver ses propres légumes en pleine ville… C’est l’idée des jardins partagés. La friche devient une vaste étendue verte. Les riverains s’emparent de l’endroit, créent du lien social, se mettent au vert et se ressourcent. Plein de points positifs pour les habitants ! Pour la biodiversité, les insectes pollinisateurs sont contents. Seul bémol, la sélection des espèces atténue les effets sur l’environnement. En effet, les apprentis jardiniers préfèreront planter des espèces hybrides, plutôt que des espèces naturelles, qui sont alors menacés. Les animaux du coin ne sont pas non plus habitués et risquent de déserter les lieux. Charge à la municipalité de sensibiliser sa population.</br>" +
                        "Mais pour lutter contre la chaleur, là c’est sûr, on est au bon endroit.",
                    "temperature": -1,
                    "happiness": 1,
                    "money": 1,
                    "nextQuestion": 10,
                    "image": "friche1"
                },
                    {
                        "prompt": "Construire des bureaux",
                        "positive": "POSITIF</br>- Évite l'étalement urbain</br>- Crée de l'emploi pour la population",
                        "negative": "NEGATIF</br>- Moins de verdure",
                        "explanation": "Ce n’est sûrement pas le choix le plus intuitif. Mais il est quand même cohérent. Construire un bâtiment sur une friche inoccupée, ça évite l’étalement urbain. En périphérie de la ville, des espaces naturels vont donc être préservés. En plus, construire du neuf permet de rendre le bâtiment économe, adapté aux contraintes environnementales. Le choix des matériaux est aussi possible, et peuvent être écoresponsables. En plus ces bureaux vont permettre de créer de l’emploi, bon point pour la population.</br>" +
                            "Mais c’est sur que cela va manquer un peu de verdure, et il risque de faire chaud.",
                        "temperature": 1,
                        "happiness": -1,
                        "money": 2,
                        "nextQuestion": 10,
                        "image": "friche2"
                    },
                    {
                        "prompt": "Créer une forêt",
                        "positive": "POSITIF</br>- La nature reprend ses droits !</br>- Retour de la biodiversité</br>- Bien-être de la population",
                        "negative": "NEGATIF</br>- Des sources de pollution à prendre en compte",
                        "explanation": "Voilà un choix avec beaucoup de bénéfices pour la biodiversité, et bien utile pour réduire la chaleur dans les villes. D’abord, un foret luttera contre les îlots de chaleurs. Par exemple, avec 100 m2 d’arbres, la température peut descendre d’un degré jusqu’à 100 mètres alentour. Il faut par contre garder en tête sa lente croissance : les effets seront vraiment significatifs dans quelques années. Autant d’arbres vont aussi améliorer la qualité de l’air : des arbres en villes réduisent de 50% les particules fines. Le sol deviendra perméable et l’eau permettre d’alimenter la biodiversité du sol. Et évidemment, la qualité de vie des habitants va reprendre des couleurs.</br>" +
                            "Mais d’un autre côté, une foret urbaine fait face à de nombreux facteurs de stress : la pollution de l’air, de l’eau, des sols sont autant de facteurs qui vont avoir des conséquences sur la croissance de la foret.</br>" +
                            "Alors, une solution à envisager :<a href='https://permafforest.fr/blog/micro-foret/methode-miyawaki/'>la méthode Miyawaki</a>",
                        "temperature": -2,
                        "happiness": 1,
                        "money": -1,
                        "nextQuestion": 10,
                        "image": "friche3"
                    }]
            }
        }

app.get('/question/:questionId', function (req, res) {
    const questionId = parseInt(req?.params?.questionId, 10);
    const data = prompts[questionId];
    res.json(data);
});

// Export our API
module.exports = app;
