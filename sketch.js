let fft, mic;
let bands = 512;
let spectrum = new Array(bands).fill(0);

let lastUpdateTime;
let lastInteractionMillis = 0; 
const SOFFIO_THRESHOLD = 0.01;
const TIMEOUT = 90000; // 90 secondi
let showStartScreen = true;

let seeds = [];

let photos = [];
let sfondo;
let soffione;

let center;

let vento = { x: 0, y: 0 };
let forzaSoffio = 0;
let orologioAttivo = false;
let lancettaOraAngle = 0;
let lancettaMinutiAngle = 0;
const partiTotali = 28;

let semeSelezionato = null;

let xButtonSize = 30;
let xButtonX = 0;
let xButtonY = 0;

const testiSemi = [
  "ENERGIA, GIOIA E AMORE PER LA VITA\n\nNICOLA\n(1937-2019)\nAgronomo del Ministero dell’Agricoltura\nAmava la natura, le passeggiate all’aria fresca\ne gli esercizi alla sbarra.",
  
  "BONTÀ E GENEROSITÀ VERSO GLI ALTRI\n\nDENNY\n(1932-2020)\nDocente di scuola primaria\nAmava la lettura, la scrittura, il ricamo e la cucina tradizionale.",
  
  "DEDIZIONE COME ALLENATORE E RISPETTO PER OGNI ALLIEVO\n\nVADIM\n(1935-2019)\nAllenatore nazionale di sciabola, ex marinaio\nAmava il mare, lo sport e il movimento.",
  
  "ADATTARSI E CUSTODIRE LA PROPRIA FELICITÀ\n\nDIMITRI\n(1944-2017)\nMusicologo e professore universitario\nAmava la musica, la scrittura e la teoria musicale.",
  
  "COMPRENDERE GLI ALTRI E VEDERE OLTRE\n\nPEPPINO\n(1961-2019)\nCommissario capo della Polizia di Stato\nAmava i viaggi, il nuoto, la moto e la musica.",
  
  "GENTILEZZA COME UN ABBRACCIO, BUONO CON TUTTI\n\nGIOELE\n(1993-2021)\nAiutava a organizzare eventi per bambini\nAmava i bambini, aiutare gli altri e le patatine.",
  
  "RAZIONALITÀ E PASSIONE PER CIÒ CHE FACEVA\n\nLAURA\n(1961-2011)\nIngegnere informatico al Ministero della Giustizia\nAmava la fotografia, la lettura, lo sport e la musica.",
  
  "TENEREZZA NEGLI OCCHI E NELLA MUSICA\n\nMARINA\n(1964-2020)\nProfessoressa e pianista\nAmava i bambini e partecipava a concerti cantando e suonando.",
  
  "GENEROSITÀ E FEDE NELLA RESURREZIONE DELL’ANIMA\n\nNINA\n(1952-2018)\nResponsabile di dormitorio\nAmava l’orto, i bambini e aiutare chi era in difficoltà.",
  
  "AMORE PER OGNI ESSERE VIVENTE\n\nALESSANDRO\n(1955-2022)\nBoscaiolo\nAmava l’elettronica, il giardinaggio e la vita di campagna.",
  
  "FORZA MORALE E CORAGGIO DI PROTEGGERE I DEBOLI\n\nNICOLA\n(1950-1995)\nLavoratore versatile e artista autodidatta\nAmava la pittura e il fai-da-te.",
  
  "PREGHIERA SILENZIOSA E SERENITÀ\n\nVALENTINA\n(1950-2019)\nCollaboratrice in chiesa\nAmava la pace, la tranquillità e il silenzio.",
  
  "FEDELTÀ, DETERMINAZIONE E RESPONSABILITÀ\n\nIVAN\n(1923-1990)\nDirettore di miniera\nAmava il lavoro e stare in compagnia.",
  
  "CURA AMOREVOLE E DEDIZIONE AGLI STUDENTI\n\nGALINA\n(1941-2021)\nInsegnante e musicologa\nAmava il pianoforte, la ricerca e i suoi studenti.",
  
  "RESPONSABILITÀ E SOSTEGNO PER GLI ALTRI\n\nBARTOLO\n(1988-2025)\nCollaboratore scolastico\nAmava il calcio e l’informatica.",
  
  "SORRISO LUMINOSO E SAGGEZZA SPECIALE\n\nOLGA\n(2006-2011)\nBambina solare e gioiosa\nAmava giocare con altri bambini.",
  
  "TALENTO, PROFESSIONALITÀ E FORZA\n\nIGOR\n(1949-2025)\nCompositore e orchestratore\nAmava la musica, la pesca e raccogliere funghi.",
  
  "BONTÀ INFINITA E COMPASSIONE PER TUTTI\n\nLIDIA\n(1949-2020)\nSarta e creatrice di abiti\nAmava i bambini e lavorare in asilo.",
  
  "ENERGIA E GIOIA DI VIVERE\n\nCAPITALINA\n(1935-2020)\nAnimatrice e organizzatrice di eventi\nAmava lo sport, lo yoga e la socialità.",
  
  "ANIMA POETICA E SENSIBILITÀ\n\nDIMITRI\n(1947-2015)\nArchitetto e poeta\nAmava l’arte, la famiglia e la vita spirituale.",
  
  "DOLCEZZA E CALMA PER TUTTI\n\nLUDMILA\n(1948-2019)\nFioraia e dipendente tessile\nAmava creare bouquet, composizioni e quadri con fiori secchi.",
  
  "FORZA E SENSIBILITÀ\n\nANNA\n(1927-2006)\nGuardiana notturna\nAmava leggere e cantare.",
  
  "DEDIZIONE TOTALE AGLI ALTRI\n\nPADRE GENNADIJ\n(1948-1997)\nSacerdote e architetto\nAmava la comunità, l’arte, la musica e la natura.",
  
  "ANIMA NELLA MUSICA E TRASMETTERLA AGLI ALTRI\n\nALESSANDRO\n(1983-2020)\nVioloncellista\nAmava i viaggi, il pubblico e la modestia.",
  
  "TALENTO E UMILTÀ\n\nCIRILLO\n(1984-2016)\nCantante del coro Aleksandrov\nAmava gli amici, l’allegria e la musica.",
  
  "AMORE PER LA VITA E LE CULTURE\n\nMARIA\n(1970-2024)\nCantante e segretaria\nAmava i viaggi, l’arte e i cavalli.",
  
  "PASSIONE E TALENTO PER LA FOTOGRAFIA\n\nALFREDO\n(1946-2023)\nFotografo e professore\nAmava scoprire nuovi luoghi.",
  
  "RICERCA DI SÉ E CORAGGIO DI SEGUIRE I DESIDERI\n\nPINO\n(1935-2002)\nFunzionario ministeriale\nAmava l’informatica, l’elettronica e la musica classica."
];


// Classe Seed tradotta da Processing a p5.js
class Seed {
  constructor(angle, img, scaleFactor, cx, cy, radius, testo) {
    this.angle = angle;
    this.img = img;
    this.scaleFactor = scaleFactor;
    this.circleCenterX = cx;
    this.circleCenterY = cy;
    this.circleRadius = radius;
    this.baseScaleFactor = scaleFactor;
    this.scaleAnimationPhase = random(TWO_PI);
this.scaleAnimationSpeed = random(0.02, 0.06);

    this.rotation = angle + PI / 2;
    this.updatePosition();

    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);

    this.released = false;
    this.releaseProgress = 0;
    this.vx = 0;
    this.vy = 0;

    this.testo = testo;
    this.selezionato = false;
  }

  updatePosition() {
    let imgH = this.img.height * this.scaleFactor / 3;
    let x_base = this.circleCenterX + cos(this.angle) * this.circleRadius;
    let y_base = this.circleCenterY + sin(this.angle) * this.circleRadius;
    this.x = x_base + cos(this.angle) * (imgH / 2 + random(-10, 10));
    this.y = y_base + sin(this.angle) * (imgH / 2 + random(-10, 10));
  }

  release() {
    this.released = true;
    this.releaseProgress = 0;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    if (this.released && this.releaseProgress < 1.0) {
      this.releaseProgress += 0.01;
      let progressEased = this.easeOutQuad(this.releaseProgress);

      let targetX = this.x + cos(this.angle) * 5;
      let targetY = this.y + sin(this.angle) * 5;
      this.x = lerp(this.x, targetX, progressEased);
      this.y = lerp(this.y, targetY, progressEased);

      this.rotation = this.lerpAngle(this.rotation, 0, progressEased);

      let noiseX = map(noise(this.noiseOffsetX), 0, 1, -0.9, 0.9);
      let noiseY = map(noise(this.noiseOffsetY), 0, 1, -0.9, 0.9);
      this.noiseOffsetX += 0.005;
      this.noiseOffsetY += 0.005;

      this.vx += noiseX;
      this.vy += noiseY;
      this.vx *= 0.97;
      this.vy *= 0.97;

      this.x += this.vx;
      this.y += this.vy;
      return;
    }

    if (this.released) {
this.noiseOffsetX += random(0.005, 0.02);
this.noiseOffsetY += random(0.005, 0.02);

      let maxSpeed = 0.05;
      let currentSpeed = sqrt(this.vx * this.vx + this.vy * this.vy);
      if (currentSpeed > maxSpeed) {
        this.vx = (this.vx / currentSpeed) * maxSpeed;
        this.vy = (this.vy / currentSpeed) * maxSpeed;
      }

      this.x = lerp(this.x, this.x + this.vx, 0.5);
      this.y = lerp(this.y, this.y + this.vy, 0.5);

      this.rotation = 0;

      if (this.x < 20 || this.x > width - 20) {
        this.vx *= -0.8;
        this.x = constrain(this.x, 20, width - 20);
      }
      if (this.y < 20 || this.y > height - 20) {
        this.vy *= -0.8;
        this.y = constrain(this.y, 20, height - 20);
      }
    }
    this.scaleAnimationPhase += this.scaleAnimationSpeed;
this.scaleFactor = this.baseScaleFactor * (1.0 + 0.05 * sin(this.scaleAnimationPhase));
  }

  lerpAngle(start, end, t) {
    let diff = end - start;
    while (diff < -PI) diff += TWO_PI;
    while (diff > PI) diff -= TWO_PI;
    return start + diff * t;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    let imgW = this.img.width * this.scaleFactor / 3;
    let imgH = this.img.height * this.scaleFactor / 3;
    image(this.img, 0, 0, imgW, imgH);
    pop();

    if (this.selezionato) {
      fill(255);
      stroke(0);
      rectMode(CENTER);
      rect(center.x, center.y, width * 0.85, height * 0.45, 20);

      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(min(width, height) * 0.03);
      text(this.testo, center.x, center.y);

      // Bottone X
      xButtonX = center.x + (width * 0.85) / 2 - xButtonSize / 2 - 5;
      xButtonY = center.y - (height * 0.45) / 2 + xButtonSize / 2 + 5;
      fill(218, 165, 32);
      noStroke();
      ellipse(xButtonX, xButtonY, xButtonSize);

      stroke(255);
      strokeWeight(3);
      line(xButtonX - 8, xButtonY - 8, xButtonX + 8, xButtonY + 8);
      line(xButtonX - 8, xButtonY + 8, xButtonX + 8, xButtonY - 8);
    }
  }

  easeOutQuad(t) {
    return t * (2 - t);
  }
}

function preload() {
  // Facoltativo: sfondo (se non hai il file puoi commentare)
  sfondo = loadImage('data/sfondo.png');

  // Soffione centrale
  soffione = loadImage('data/soffione.png');

  // Semi: soffione1.png, soffione2.png, ...
  const numSemi = testiSemi.length;
  photos = [];
  for (let i = 1; i <= numSemi; i++) {
    photos.push(loadImage(`data/soffione${i}.png`));
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  center = createVector(width / 2, height / 2);
  lastInteractionMillis = millis();

  // Ridimensiona immagini sfondo e soffione se necessario
  if (sfondo) sfondo.resize(width, height);

   const numSemi = testiSemi.length;
  const circleCenterX = center.x;
  const circleCenterY = center.y - 65;

  let circleRadius;
  if (soffione && soffione.width) {
    circleRadius = soffione.width / 4 - 100;
  } else {
    circleRadius = min(width, height) * 0.15; // fallback sicuro
  }

  const distanzaTraSemi = TWO_PI / numSemi;

  const scaleSet = [1.0, 1.4, 1.8];
  let scaleSequence = [];

  let lastIndex = -1;
  for (let i = 0; i < numSemi; i++) {
    let newIndex;
    do {
      newIndex = floor(random(scaleSet.length));
    } while (newIndex === lastIndex);
    scaleSequence.push(scaleSet[newIndex]);
    lastIndex = newIndex;
  }

  for (let i = 0; i < numSemi; i++) {
    let angle = i * distanzaTraSemi;
    let scaleFactor = scaleSequence[i];
    let seed = new Seed(angle, photos[i % photos.length], scaleFactor, circleCenterX, circleCenterY, circleRadius, testiSemi[i]);
    seeds.push(seed);
  }

  // Audio setup
  fft = new p5.FFT(0.8, bands);
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);

  lastUpdateTime = millis();
}

function resetSeeds() {
  for (let s of seeds) {
    s.released = false;
    s.releaseProgress = 0;
    s.vx = 0;
    s.vy = 0;
    s.rotation = s.angle + PI / 2;
    s.updatePosition();
  }
  orologioAttivo = false;
}

function draw() {
  // Sfondo
  if (sfondo) {
    imageMode(CORNER);
    image(sfondo, 0, 0, width, height);
    imageMode(CENTER);
  } else {
    background(255);
  }

  // FFT analisi
  spectrum = fft.analyze();

  let avgVolume = 0;
  for (let i = 0; i < bands; i++) {
    avgVolume += spectrum[i];
  }
  avgVolume /= bands;

  forzaSoffio = map(avgVolume, 0, 150, 0, 5);
  forzaSoffio = constrain(forzaSoffio, 0, 5);

  // Se c'è soffio sopra soglia, aggiorna timer e nascondi start screen
  if (showStartScreen && forzaSoffio > SOFFIO_THRESHOLD) {
    lastInteractionMillis = millis();
    showStartScreen = false;
  }

  if (!showStartScreen && millis() - lastInteractionMillis > TIMEOUT) {
    showStartScreen = true;
    resetSeeds();
  }

  if (showStartScreen) {
    drawStartScreen();
    return;
  }

  aggiornaVento();

  // Disegna semi e rilascia con probabilità
  let semeStaccato = false;
  let probSgancio = min(avgVolume * 0.005, 0.5);

  for (let s of seeds) {
    if (!s.released && random(1) < probSgancio) {
      s.release();
    }
    s.update();
    s.display();
    if (s.released) semeStaccato = true;
  }

  if (semeStaccato) {
    orologioAttivo = true;
  }

  // Disegna soffione sopra semi
  if (soffione) {
    let scaleFactor = 1.2;
    image(soffione, center.x, center.y + 30, soffione.width * scaleFactor, soffione.height * scaleFactor);
    noStroke();
    noFill();
    circle(center.x, center.y - 65, (soffione.width * scaleFactor) / 4);
  }

  if (orologioAttivo) {
    let velocitaRotazioneOra = TWO_PI / partiTotali / 30.0;
    let velocitaRotazioneMinuti = velocitaRotazioneOra * 5;

    lancettaOraAngle += velocitaRotazioneOra;
    lancettaMinutiAngle += velocitaRotazioneMinuti;

    lancettaOraAngle %= TWO_PI;
    lancettaMinutiAngle %= TWO_PI;

    drawClockArrows();
  }
}

function drawStartScreen() {
  background(30, 30, 30, 220);
  fill(255);
  textAlign(CENTER, CENTER);

  let h = height;
  let w = width;

  textSize(w * 0.03);
  text("Per donare respiro alle vite passate", w / 2, h * 0.20);

  textSize(w * 0.085);
  text("SOFFIA!", w / 2, h * 0.30);

  textSize(w * 0.03);
  text("(Fai volare i semi)", w / 2, h * 0.40);

  textSize(w * 0.03);
  text("Per stringere la mano a chi abita nel ricordo e conoscerlo", w / 2, h * 0.60);

  textSize(w * 0.085);
  text("CLICCA", w / 2, h * 0.70);

  textSize(w * 0.03);
  text("(Su un seme volante)", w / 2, h * 0.80);
}

function drawClockArrows() {
  push();
  translate(center.x - 8, center.y - 80);
  stroke(58, 58, 53);
  strokeWeight(3);

  let oraLength = 30;
  line(0, 0, oraLength * cos(lancettaOraAngle - PI / 2), oraLength * sin(lancettaOraAngle - PI / 2));

  strokeWeight(3);
  let minutiLength = 60;
  line(0, 0, minutiLength * cos(lancettaMinutiAngle - PI / 2), minutiLength * sin(lancettaMinutiAngle - PI / 2));
  pop();
}

function aggiornaVento() {
  let direzione = { x: 0, y: 0 };
  if (keyIsDown(LEFT_ARROW)) direzione.x = -1;
  if (keyIsDown(RIGHT_ARROW)) direzione.x = 1;
  if (keyIsDown(UP_ARROW)) direzione.y = -1;
  if (keyIsDown(DOWN_ARROW)) direzione.y = 1;

  let mag = sqrt(direzione.x * direzione.x + direzione.y * direzione.y);
  if (mag !== 0) {
    direzione.x /= mag;
    direzione.y /= mag;
  }

  vento.x = direzione.x * forzaSoffio * 0.5;
  vento.y = direzione.y * forzaSoffio * 0.5;
}

function mousePressed() { 
  // Sblocca audio/microfono dopo gesto utente
  if (getAudioContext().state !== 'running') {
    userStartAudio();
    getAudioContext().resume();
  }

  if (showStartScreen) {
    showStartScreen = false;
    lastInteractionMillis = millis();
    return;
  }

  if (semeSelezionato !== null) {
    let d = dist(mouseX, mouseY, xButtonX, xButtonY);
    if (d < xButtonSize / 2) {
      semeSelezionato.selezionato = false;
      semeSelezionato = null;
      return;
    }
  }

  semeSelezionato = null;
  for (let i = seeds.length - 1; i >= 0; i--) {
    let s = seeds[i];
    if (s.released && dist(mouseX, mouseY, s.x, s.y) < 50) {
      semeSelezionato = s;
      s.selezionato = true;
      lastInteractionMillis = millis();
      break;
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.set(width / 2, height / 2);
  if (sfondo) sfondo.resize(width, height);
}
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    userStartAudio();
    getAudioContext().resume();
  }
  return false;
}
