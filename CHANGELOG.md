# Historique de Mboka / Mboka changelog

Les numéros internes du cache hors ligne ne sont pas utilisés comme versions publiques. Cet historique présente les changements fonctionnels importants.

Internal offline-cache numbers are not used as public versions. This document records meaningful product changes.

## 2026-09-18

- Clarification du statut éditorial : les faits appuyés par les sources citées sont publiés comme contenus documentés.
- Les exercices et préparations sont identifiés comme adaptations pédagogiques Mboka, ajustables par chaque enseignant selon sa classe.
- Le contrôle enseignant devient un suivi facultatif d’amélioration continue et non une condition préalable à la publication.
- Ajout d’un mode classe local avec code de séance anonyme, plan imprimable, lien vers l’activité et registre CSV.
- Clarification des outils enseignants : « Générer une fiche d’exercices » est distingué de « Préparer une séance Mboka ».
- Correction de l’impression du mode classe qui pouvait produire une page vide à cause d’un conflit avec la fiche d’exercices.
- Ajout d’un registre local « Mes séances » pour rouvrir ou supprimer une préparation enregistrée sur l’appareil.
- Ajout de Mboka Numérique v0.1 : six thèmes bilingues documentés, recherche, cas pratiques, quiz, sources juridiques et intégration au mode classe.
- Clarified sourced content, Mboka pedagogical adaptations, and optional teacher follow-up throughout the platform and documentation.

## 2026-09-17

- Ajout sur la page d’accueil d’une présentation bilingue de la vision, de la mission et des engagements de Mboka.

### Référentiel et accueil / Curriculum and onboarding

- Ajout de trois portes d’entrée — Apprendre, Jouer, Enseigner — avec une progression guidée et une révélation à la demande des modules avancés.
- Ajout des sources officielles reliées au référentiel : DAS 7e–8e, humanités scientifiques 3e–6e, citoyenneté, alphabétisation et filières techniques confirmées.
- Ajout du statut de synthèse Mboka, de la méthode officielle DAS et du rappel de validation/adaptation par l’enseignant.
- Correction et contrôle responsive de la mise en page du référentiel sur desktop et mobile.
- Added guided onboarding, official curriculum-source links, explicit editorial status, DAS methodology notes, and responsive curriculum-layout fixes.

### Accès éducatif / Educational access

- Formalisation de l’engagement : le socle d’apprentissage reste accessible sans compte élève, sans paiement, sans publicité ciblée et hors connexion après installation.
- Les services institutionnels, la formation, le support et les outils de gestion sont séparés de l’accès éducatif de base.
- Formalised the commitment to keep core learning available without learner accounts, payment, targeted advertising, and, after installation, an internet connection.
- Ajout d’un dossier de validation pédagogique listant les sources, critères, rôles, statuts et fiches de décision par unité.
- Added a pedagogical validation dossier with sources, criteria, roles, statuses, and per-unit decision records.
- Ajout de matrices détaillées TIC 8e (`MTIC2.1` à `MTIC2.10`) et clarification des matrices SPTTIC encore en attente d’extraction.
- Ajout de fiches pédagogiques harmonisées pour les activités, avec public conseillé et responsable de validation.
- Ajout des décisions locales de relecture, d’une synthèse par cycle/domaine et d’un export CSV local.
- Added the grade-eight ICT matrix, harmonised activity pedagogy cards, local review decisions, cycle/domain summaries, and local CSV export.

## 2026-09-16

### Comptes enseignants bêta / Teacher-account beta

- Préparation d’un espace enseignant sur invitation avec connexion sans mot de passe, session limitée à l’onglet et profils alignés sur les cycles scolaires congolais.
- Ajout d’une fonction Vercel, d’un schéma Supabase avec RLS et d’une protection empêchant l’auto-attribution de rôles.
- Prepared invitation-only passwordless teacher access, a Vercel function, and RLS-protected Supabase profiles without creating learner accounts.
- Ajout d’une liste blanche protégée : seules les adresses préautorisées peuvent recevoir un profil enseignant, même lorsque Supabase autorise techniquement le flux OTP.
- Added a protected teacher allowlist so that enabling the Supabase OTP flow cannot grant uninvited users access to the teacher workspace.
- Ajout du nom affiché synchronisé avec le carnet et d’un panneau administrateur pour gérer les invitations, rôles et suspensions sans requête SQL quotidienne.
- Ajout d’un référentiel pédagogique interactif pour le primaire, le CTEB et les humanités, avec objectifs mesurables, activités Mboka, preuves attendues et sources ministérielles.

## 2026-09-13

### Tableau de bord d’impact / Impact dashboard

- Ajout d’un import CSV local qui rapproche les pré-tests et post-tests anonymes, calcule les moyennes normalisées et présente la couverture et les résultats par groupe.
- Ajout d’un rapport d’impact imprimable, sans téléversement ni conservation du fichier importé.
- Added local CSV analysis, anonymous pre/post pairing, normalised metrics, group summaries, and a printable impact report without uploading the imported file.

### Documentation du pilote / Pilot documentation

- Actualisation cohérente de la présentation, de la note conceptuelle, du budget, du protocole, de l’outil d’évaluation et du dossier de partenariat selon l’état actuel de Mboka.
- Updated the presentation, concept note, budget, protocol, evaluation tool, and partnership pack to match the current platform and its measurable pilot features.

### Mesure du pilote / Pilot measurement

- Ajout d’un code élève anonyme réutilisable, de pré-tests et post-tests comparables pour trois niveaux d’âge.
- Ajout d’un export CSV local incluant les scores avant/après et le gain d’apprentissage, sans nom ni courriel.
- Ajout du parcours bilingue, adaptatif et disponible hors connexion.
- Added reusable anonymous learner codes, comparable pre/post tests, learning-gain CSV export, bilingual support, responsive layout, and offline availability.

### Encyclopédie des provinces / Province encyclopedia

- Restructuration des 26 profils en quatre chapitres : repères essentiels, société et culture, économie et environnement, territoires.
- Intégration automatique des 145 territoires dans la fiche de leur province, avec une présentation adaptée au mobile.
- Restructured all 26 profiles into four chapters and connected each province entry to its administrative territories.

### Chronologie historique / History timeline

- Ajout de huit repères historiques, filtrables entre sociétés anciennes, période coloniale, indépendance et RDC contemporaine.
- Ajout de sources documentaires, d’une navigation directe et d’une présentation bilingue adaptée au mobile.
- Added eight sourced historical landmarks with period filters, direct navigation, bilingual content, and responsive presentation.

### Quiz enrichi / Expanded quiz

- Ajout des modes général et par province, avec sélection parmi les 26 provinces.
- Ajout de filtres thématiques et de questionnaires de 3, 5 ou 7 questions selon le niveau d’âge.
- Séparation des meilleurs scores par mode, thème, province et difficulté.
- Added general, topic, and province modes with age-adapted question counts and separate progress records.

### Jeu de mémoire enrichi / Expanded memory game

- Ajout de quatre collections : trésors du Congo, provinces et chefs-lieux, nature et biodiversité, histoire et dates.
- Ajout de trois difficultés de 4, 6 ou 8 paires et de records séparés pour chaque configuration.
- Added four memory collections, three progressive board sizes, responsive layouts, and configuration-specific records.
- Correction du mode avancé : la collection « Trésors du Congo » contient désormais les huit paires nécessaires et affiche bien 16 cartes.

### Validation pédagogique / Pedagogical review

- Ajout d’un formulaire anonyme de revue des contenus destiné aux éducateurs et spécialistes congolais.
- Évaluation de l’exactitude, de la clarté, du contexte culturel et du public conseillé, avec correction et source suggérées.
- Conservation locale et export CSV pour constituer une trace vérifiable des relectures.
- Added an anonymous educator-review workflow with local storage and evidence-ready CSV export.

### Sources et statut éditorial / Sources and editorial status

- Ajout d’une bibliothèque de six ressources institutionnelles et documentaires accessibles depuis la plateforme.
- Ajout d’un statut éditorial aux fiches provinciales pour distinguer données administratives documentées et aperçus culturels à relire.
- Added a six-resource documentary library and explicit editorial status to province encyclopedia entries.

## 2026-08-16

### Carte des 145 territoires / 145-territory map

- Ajout d’un second niveau interactif à la carte pour explorer exactement 145 territoires, regroupés par province.
- Ajout d’un sélecteur adapté au mobile, de limites cliquables, de la lecture vocale et d’un retour vers la fiche de la province.
- Géométries issues de geoBoundaries ADM2 (Référentiel Géographique Commun/OCHA RDC); catalogue recoupé avec la CAID et le PDL-145T.
- Added an interactive 145-territory layer with province grouping, mobile selection, spoken names, and documented open-data attribution.

### Navigation des parcours / Learning-path navigation

- « Classe » devient « Enseignants » afin de rendre l’espace pédagogique immédiatement identifiable.
- Le nouveau menu « Parcours » donne un accès direct à la citoyenneté, à l’environnement et aux ressources responsables.
- La navigation mobile propose les mêmes accès sous forme de raccourcis tactiles défilants.
- “Classroom” becomes “Teachers”, with direct desktop and mobile access to citizenship, environment, and responsible-resources learning paths.

## 2026-08-15

### Laboratoire d’échecs / Chess laboratory

- Ajout de sept sections progressives couvrant règles, fourchettes, clouages, enfilades, déviation, finales, réseaux de mat et jeu positionnel.
- Ajout d’un échiquier interactif, de positions originales, de la validation des mouvements et d’une progression locale mesurable.
- Ajout de la lecture vocale du titre, de l’explication et de l’objectif de chaque exercice.
- Added seven progressive sections, an interactive board, original positions, move validation, measurable local progress, and spoken instructions.

### Laboratoire musical / Music laboratory

- Ajout de quatre sections progressives pour les notes, la portée, les touches blanches et les touches noires.
- Ajout de douze fichiers WAV locaux comme solution de secours fiable sur iPhone et iOS 26.
- Synchronisation de l’illumination du clavier avec chaque note jouée.
- Added four progressive sections, twelve local WAV notes for reliable iPhone playback, and synchronized key highlighting.

### Accessibilité et interface / Accessibility and interface

- Harmonisation des contrôles : `🔊` pour activer ou écouter la parole, `🔇` pour le son coupé, `♪` et `♫` uniquement pour la musique.
- Ajout d’une navigation rapide vers les modules, de liens directs vers Musique et Échecs, d’un lien d’évitement clavier et de protections contre les débordements mobiles.
- Amélioration des zones tactiles, des indicateurs de focus et de la prise en charge de la réduction des animations.
- Extension des validations automatiques aux parcours d’échecs, au lecteur WAV iPhone, aux contrôles vocaux et aux ressources hors ligne.
- Standardized spoken-audio symbols; added quick module navigation, direct Music and Chess links, keyboard skip navigation, mobile overflow protection, larger touch targets, visible focus, and reduced-motion support.
- Extended automated validation to chess, iPhone WAV playback, spoken controls, and offline assets.

### Parcours éducatifs / Educational pathways

- Remplacement du croquis de la RDC par une carte vectorielle interactive des 26 limites provinciales, issue de geoBoundaries COD ADM1 sous licence ODbL 1.0.
- Replaced the schematic DRC outline with an interactive vector map of all 26 provincial boundaries from geoBoundaries COD ADM1 under ODbL 1.0.
- Ajout des mathématiques du quotidien avec dix unités et trois niveaux d’âge.
- Renforcement des outils pilotes : objectifs mesurables, activités imprimables et rapports de progression.
- Added everyday mathematics with ten units and three age levels, plus measurable pilot and teacher tools.
