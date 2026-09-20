const fs=require('fs');

const sampleRate=22050;
const duration=.58;
const notes={C:261.63,Cs:277.18,D:293.66,Ds:311.13,E:329.63,F:349.23,Fs:369.99,G:392,Gs:415.3,A:440,As:466.16,B:493.88};

for(const [name,frequency] of Object.entries(notes)){
  const samples=Math.floor(sampleRate*duration);
  const dataSize=samples*2;
  const buffer=Buffer.alloc(44+dataSize);
  buffer.write('RIFF',0);buffer.writeUInt32LE(36+dataSize,4);buffer.write('WAVE',8);
  buffer.write('fmt ',12);buffer.writeUInt32LE(16,16);buffer.writeUInt16LE(1,20);
  buffer.writeUInt16LE(1,22);buffer.writeUInt32LE(sampleRate,24);buffer.writeUInt32LE(sampleRate*2,28);
  buffer.writeUInt16LE(2,32);buffer.writeUInt16LE(16,34);buffer.write('data',36);buffer.writeUInt32LE(dataSize,40);
  for(let index=0;index<samples;index++){
    const time=index/sampleRate;
    const attack=Math.min(1,time/.012);
    const decay=Math.exp(-4.2*time);
    const wave=Math.sin(2*Math.PI*frequency*time)+.28*Math.sin(4*Math.PI*frequency*time)+.12*Math.sin(6*Math.PI*frequency*time);
    buffer.writeInt16LE(Math.round(Math.max(-1,Math.min(1,wave*.55*attack*decay))*32767),44+index*2);
  }
  fs.writeFileSync(`music-${name}.wav`,buffer);
}
console.log(`Generated ${Object.keys(notes).length} mobile music notes.`);
