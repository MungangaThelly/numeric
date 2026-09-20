# Mboka — Explore the Democratic Republic of the Congo

> Plateforme éducative bilingue, interactive, installable et utilisable hors connexion.  
> A bilingual educational platform that is interactive, installable, and available offline.

[Application en production / Live application](https://mboka.nuhar.se) · [Présentation complète / Full presentation](PRESENTATION.md) · [Dossier de validation pédagogique](VALIDATION_PEDAGOGIQUE.md) · [Historique / Changelog](CHANGELOG.md) · [Confidentialité / Privacy](https://mboka.nuhar.se/privacy.html)

## Français

Mboka aide les élèves, familles et enseignants à explorer la République démocratique du Congo par des parcours courts, des profils provinciaux, une carte interactive et des jeux.

Sa vision est celle d’une jeunesse qui connaît et comprend son pays. Sa mission consiste à transformer la découverte en apprentissage grâce à des contenus fiables, des activités éducatives et des outils simples pour les élèves et les enseignants.

### Fonctionnalités

- Carte vectorielle interactive à deux niveaux : limites des 26 provinces, couche des 145 territoires regroupés par province et fiches encyclopédiques bilingues structurées
- Histoire des royaumes Kongo, Luba, Lunda et Kuba
- Chronologie interactive en huit repères, filtrable par période et reliée à des sources documentaires
- Communautés, langues, environnement, ressources, cuisine, musique, arts et personnalités
- Quiz adaptés aux âges de 7–10 ans, 11–14 ans et 15 ans et plus, avec modes général, thématique et par province
- Sprint des provinces en solo ou à deux équipes
- Jeu de mémoire avec quatre collections et trois difficultés, défi de lingala et découverte quotidienne
- Mathématiques du quotidien avec 10 unités et trois niveaux d’âge
- Parcours musical interactif : notes, portée, touches blanches et touches noires, avec fichiers WAV de secours sur iPhone
- Laboratoire d’échecs interactif en sept sections : règles, tactiques, finales, jeu positionnel et consignes vocales
- Audio par synthèse vocale disponible sur l’appareil, avec `🔊`/`🔇` pour la parole et `♪`/`♫` réservés à la musique
- Badges, scores et progression conservés localement
- Fiches d’exercices, plans de leçon et rapports de progression imprimables
- Pilote éducatif mesurable : code élève anonyme réutilisable, pré-test/post-test et export CSV local du gain d’apprentissage
- Tableau de bord d’impact local : import du CSV, moyennes normalisées, couverture, résultats par groupe et rapport imprimable
- Espace enseignant bêta sur invitation : connexion sans mot de passe, rôles protégés et profil adapté aux cycles scolaires congolais
- Mode classe local : code de séance anonyme, activité et niveau configurables, plan imprimable, historique réutilisable et registre CSV sans compte élève
- Mboka Numérique : six fiches bilingues sur le Code du numérique de la RDC, recherche thématique, cas pratiques, références d’articles et quiz local
- Dossier institutionnel Mboka Numérique : note conceptuelle, proposition pilote et présentation IT-Weor/Mboka dans `partenariat-code-numerique/`
- Référentiel pédagogique interactif reliant primaire, CTEB et humanités à des objectifs mesurables, activités Mboka et preuves d’apprentissage
- Sources officielles reliées au référentiel : niveaux d’enseignement, programmes nationaux, DAS 7e–8e, humanités scientifiques 3e–6e, citoyenneté, alphabétisation et filières techniques confirmées
- Méthode explicitée : les programmes DAS articulent situations d’apprentissage, savoirs essentiels, compétences et indicateurs; Mboka propose une adaptation pédagogique sans remplacer le programme officiel
- Revue pédagogique anonyme pour documenter exactitude, clarté, contexte culturel et sources suggérées
- Bibliothèque documentaire visible distinguant contenus factuels sourcés et adaptations pédagogiques Mboka
- Installation PWA et fonctionnement hors connexion
- Navigation rapide entre les modules, mise en page adaptative, focus clavier visible et prise en charge de la réduction des animations
- Accueil guidé avec trois portes d’entrée — Apprendre, Jouer, Enseigner — et modules avancés révélés à la demande
- Fiches pédagogiques visibles pour les parcours, la découverte, la carte, les jeux, les quiz et les laboratoires, avec public et référent pédagogique conseillés
- Référentiel filtrable par cycle et domaine, suivi pédagogique facultatif, synthèse par cycle/domaine et export CSV

### Démarrage local

Prérequis : une version récente de Node.js.

```powershell
npm test
npm run build
npm start
```

Ouvrir ensuite `http://localhost:8080`.

### Confidentialité

Mboka reste accessible aux élèves sans compte, nom, courriel ou mot de passe. Seul l’espace enseignant bêta prévoit un compte facultatif sur invitation. La progression des élèves et les réponses facultatives restent dans le stockage local du navigateur. La politique complète est disponible en [français et en anglais](https://mboka.nuhar.se/privacy.html).

### Engagement d’accès éducatif

L’accès éducatif de base — découverte, parcours, carte, jeux, quiz et contenus essentiels — reste utilisable sans compte élève, sans paiement, sans publicité ciblée et hors connexion lorsque les ressources sont installées. Les services susceptibles d’être financés concernent l’accompagnement institutionnel, la formation, le support et les outils de gestion; ils ne doivent pas conditionner l’apprentissage de base.

## English

Mboka helps students, families, and teachers explore the Democratic Republic of the Congo through short learning journeys, provincial profiles, an interactive map, and games.

### Features

- Two-level interactive vector map covering all 26 provinces and exactly 145 territories grouped by province, plus structured bilingual province encyclopedia entries
- History of the Kongo, Luba, Lunda, and Kuba kingdoms
- Interactive eight-event history timeline with period filters and documentary sources
- Communities, languages, environment, resources, food, music, arts, and notable people
- Age-based quizzes for ages 7–10, 11–14, and 15+, with general, topic, and province modes
- Province Sprint in solo or two-team mode
- Memory game with four collections and three difficulty levels, Lingala challenge, and daily discovery
- Everyday mathematics with 10 units and three age levels
- Interactive music journey covering notes, staff reading, white keys, and black keys, with WAV fallback on iPhone
- Seven-section interactive chess laboratory covering rules, tactics, endings, positional play, and spoken instructions
- Device-provided speech synthesis, using `🔊`/`🔇` for spoken audio and reserving `♪`/`♫` for music
- Badges, scores, and progress stored locally
- Printable worksheets, lesson plans, and progress reports
- Measurable educational pilot with reusable anonymous learner codes, pre/post tests, and local learning-gain CSV export
- Local impact dashboard with CSV import, normalised averages, data coverage, group results, and a printable report
- Invitation-only teacher-account beta with passwordless access, protected roles, and profiles aligned with Congolese school cycles
- Local class mode with an anonymous session code, configurable activity and level, printable plan, reusable history, and CSV register without learner accounts
- Digital Mboka: six bilingual Digital Code topics, thematic search, practical cases, article references, and a local quiz
- Interactive curriculum reference linking primary, CTEB, and humanities to measurable objectives, Mboka activities, evidence, and confirmed official source documents
- DAS methodology note covering learning situations, essential knowledge, competencies, and pedagogical indicators, while keeping official programmes authoritative
- Anonymous pedagogical review for documenting accuracy, clarity, cultural context, and suggested sources
- Visible documentary library distinguishing sourced facts from Mboka pedagogical adaptations
- PWA installation and offline use
- Quick module navigation, responsive layout, visible keyboard focus, and reduced-motion support
- Guided onboarding with three entry points — Learn, Play, Teach — and advanced modules revealed on demand
- Visible pedagogical cards for discovery, map, games, quizzes, and laboratories, including suggested audience and pedagogical contact
- Curriculum filters, optional pedagogical follow-up, cycle/domain summaries, and CSV export

### Local development

Requirement: a recent Node.js version.

```powershell
npm test
npm run build
npm start
```

Then open `http://localhost:8080`.

### Privacy

Learners can use Mboka without an account, name, email address, or password. Only the optional invitation-only teacher beta uses an account. Learner progress and optional feedback remain in browser local storage. The complete policy is available in [French and English](https://mboka.nuhar.se/privacy.html).

### Educational access commitment

Core educational access — discovery, journeys, maps, games, quizzes, and essential content — remains available without a learner account, payment, targeted advertising, and, once installed, an internet connection. Potentially funded services concern institutional support, training, maintenance, and management tools; they must not gate basic learning.

## Production and validation

The static production build is generated in `dist/` and deployed through Vercel. `npm test` verifies core security configuration, privacy coverage, bilingual content counts, question banks and quiz modes, all 26 provinces, exactly 145 territories, the sourced history timeline, memory collections and difficulties, teacher and pilot-measurement tools, pedagogical reviews, team mode, mathematics and music content, the seven chess sections, iPhone audio fallback, spoken controls, and offline asset coverage.

Production: [mboka.nuhar.se](https://mboka.nuhar.se)

Photo de l’okapi : [Grace Tshiyonga, via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Okapi_2.jpg), sous [licence CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

Limites provinciales : [geoBoundaries COD ADM1](https://www.geoboundaries.org/api/current/gbOpen/COD/ADM1/), données OpenStreetMap/Wambacher sous licence ODbL 1.0. Les limites sont indicatives et utilisées à des fins pédagogiques.

Limites territoriales : [geoBoundaries COD ADM2](https://www.geoboundaries.org/api/current/gbOpen/COD/ADM2/), source Référentiel Géographique Commun/OCHA RDC sous licence CC BY 3.0 IGO. Le catalogue des 145 territoires est recoupé avec la CAID et les publications gouvernementales du PDL-145T.

## Project status

Mboka is production-ready as a privacy-first educational PWA. An invitation-only teacher-account beta is prepared for activation; learner accounts and centralised classroom-result storage are not implemented. Content is publishable from its cited sources and can continue to improve through feedback from Congolese educators, historians, linguists, and subject specialists.
