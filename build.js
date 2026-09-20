const fs=require('fs');
const path=require('path');
const output=path.join(__dirname,'dist');
const files=[
  'index.html','privacy.html','styles.css','lessons.css','lingala.css','achievements.css','history-timeline.css','kingdoms.css','presidency.css','heroes.css','communities.css','food.css','environment.css','resources.css','creativity.css','sprint.css','profile.css','memory.css','memory-levels.css','i18n.css','teacher.css','class-mode.css','digital-code.css','teacher-account.css','content-review.css','sources.css','provinces.css','map.css','real-map.css','territories.css','levels.css','audio.css','daily.css','pwa.css','hardening.css','pilot.css','pilot-measure.css','pilot-dashboard.css','math.css','music-game.css','chess-game.css','responsive.css','teacher-account-responsive.css','curriculum.css','mission.css',
  'province-boundaries.js','territory-boundaries.js','app.js','content-en.js','i18n.js','history-timeline.js','math.js','music-game.js','chess-game.js','pilot-measure.js','pilot-dashboard.js','teacher-account.js','class-mode.js','digital-code.js','curriculum.js','content-review.js','sources.js','pwa.js','sw.js','manifest.webmanifest','icon.svg','okapi.jpg',
  'music-C.wav','music-Cs.wav','music-D.wav','music-Ds.wav','music-E.wav','music-F.wav','music-Fs.wav','music-G.wav','music-Gs.wav','music-A.wav','music-As.wav','music-B.wav'
];
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output,{recursive:true});
for(const file of files)fs.copyFileSync(path.join(__dirname,file),path.join(output,file));
console.log(`Built ${files.length} static Mboka assets in dist/`);
