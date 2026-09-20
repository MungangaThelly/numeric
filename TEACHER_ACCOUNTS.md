# Comptes enseignants Mboka — bêta sur invitation

Cette première version ajoute des comptes enseignants sans créer de comptes élèves. Les outils publics, le fonctionnement hors connexion et les codes anonymes du pilote restent inchangés.

Le profil reprend les cycles décrits par le Ministère de l’Éducation nationale et Nouvelle Citoyenneté : primaire, cycle terminal de l’éducation de base et humanités. Références officielles : <https://edu-nc.gouv.cd/systeme-educatif/>, <https://edu-nc.gouv.cd/niveaux> et <https://edu-nc.gouv.cd/programmes-nationaux>.

## Configuration Supabase

1. Créer un projet Supabase dans une région européenne.
2. Exécuter `supabase/teacher-accounts.sql` dans l’éditeur SQL.
3. Dans Authentication → Hooks, activer **Before User Created** avec la fonction Postgres `public.hook_restrict_teacher_signup`.
4. Dans Authentication → Providers → Email, activer **Allow new users to sign up** et conserver la connexion par lien magique. Le hook refuse toute adresse absente de la liste d’invitations.
5. Ajouter `https://mboka.nuhar.se/` aux URL de redirection autorisées.
6. Ajouter l’adresse de chaque enseignant en minuscules dans `teacher_invitations` avant de lui envoyer son lien.
7. Ajouter dans Vercel : `SUPABASE_URL` et `SUPABASE_ANON_KEY`.
8. Redéployer Mboka, puis tester une invitation avec une adresse réservée au pilote.

Pour un projet déjà configuré avec la première version, exécuter `supabase/teacher-invitation-allowlist.sql`. Ce script place les utilisateurs existants dans la liste blanche, retire leur droit de créer eux-mêmes un profil et installe le hook de protection. Il faut ensuite sélectionner cette fonction dans Authentication → Hooks, puis activer les nouvelles inscriptions Email afin que les liens magiques fonctionnent. Pour inviter un enseignant, ajouter d’abord son adresse en minuscules dans `teacher_invitations`.

La clé anonyme peut être utilisée avec les règles RLS fournies. Ne jamais ajouter la clé `service_role` au navigateur, au dépôt Git ou à une variable exposée au client.

## Périmètre de la bêta

- lien de connexion sans mot de passe ;
- accès uniquement aux utilisateurs déjà invités ;
- rôles enseignant, coordinateur et administrateur ;
- nom affiché synchronisé avec le carnet, établissement, province éducationnelle, cycle et disciplines ;
- gestion des invitations, rôles et suspensions directement dans Mboka pour les administrateurs ;
- session conservée dans `sessionStorage`, donc supprimée à la fermeture de l’onglet ;
- aucune identité d’élève et aucun résultat scolaire nominatif.

Avant un stockage centralisé des classes ou résultats, le partenaire éducatif devra valider la gouvernance, les durées de conservation, les responsabilités et les procédures relatives aux mineurs.

## Administration des invitations

Exécuter `supabase/teacher-admin.sql` après les migrations initiales. Un compte dont le profil possède le rôle `admin` voit alors le panneau **Gérer les enseignants**. Les fonctions SQL vérifient `auth.uid()` et le rôle administrateur côté base avant toute lecture ou modification : masquer le panneau dans le navigateur n’est jamais la seule protection.
