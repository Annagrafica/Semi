let fft, mic;
let bands = 512;
let spectrum = []; // lascia vuoto e assegna da fft.analyze()

let lastUpdateTime;
let lastInteractionMillis = 0; 
const SOFFIO_THRESHOLD = 0.05;
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

// Testi per i semi (array di stringhe in p5.js)
const testiSemi = [
  `ENERGIA, GIOIA E AMORE PER LA VITA

NICOLA
(1937-2019)
Agronomo del Ministero dell’Agricoltura
Amava la natura, le passeggiate all’aria fresca
e gli esercizi alla sbarra.`,

  `BONTÀ E GENEROSITÀ VERSO GLI ALTRI

DENNY
(1932-2020)
Docente di scuola primaria
Amava la lettura, la scrittura, il ricamo e la cucina tradizionale.`,

  `DEDIZIONE COME ALLENATORE E RISPETTO PER OGNI ALLIEVO

VADIM
(1935-2019)
Allenatore nazionale di sciabola, ex marinaio
Amava il mare, lo sport e il movimento.`,

  `ADATTARSI E CUSTODIRE LA PROPRIA FELICITÀ

DIMITRI
(1944-2017)
Musicologo e professore universitario
Amava la musica, la scrittura e la teoria musicale.`,

  `COMPRENDERE GLI ALTRI E VEDERE OLTRE

PEPPINO
(1961-2019)
Commissario capo della Polizia di Stato
Amava i viaggi, il nuoto, la moto e la musica.`,

  `GENTILEZZA COME UN ABBRACCIO, BUONO CON TUTTI

GIOELE
(1993-2021)
Aiutava a organizzare eventi per bambini
Amava i bambini, aiutare gli altri e le patatine.`,

  `RAZIONALITÀ E PASSIONE PER CIÒ CHE FACEVA

LAURA
(1961-2011)
Ingegnere informatico al Ministero della Giustizia
Amava la fotografia, la lettura, lo sport e la musica.`,

  `TENEREZZA NEGLI OCCHI E NELLA MUSICA

MARINA
(1964-2020)
Professoressa e pianista
Amava i bambini e partecipava a concerti cantando e suonando.`,

  `GENEROSITÀ E FEDE NELLA RESURREZIONE DELL’ANIMA

NINA
(1952-2018)
Responsabile di dormitorio
Amava l’orto, i bambini e aiutare chi era in difficoltà.`,

  `AMORE PER OGNI ESSERE VIVENTE

ALESSANDRO
(1955-2022)
Boscaiolo
Amava l’elettronica, il giardinaggio e la vita di campagna.`,

  `FORZA MORALE E CORAGGIO DI PROTEGGERE I DEBOLI

NICOLA
(1950-1995)
Lavoratore versatile e artista autodidatta
Amava la pittura e il fai-da-te.`,

  `PREGHIERA SILENZIOSA E SERENITÀ

VALENTINA
(1950-2019)
Collaboratrice in chiesa
Amava la pace, la tranquillità e il silenzio.`,

  `FEDELTÀ, DETERMINAZIONE E RESPONSABILITÀ

IVAN
(1923-1990)
Direttore di miniera
Amava il lavoro e stare in compagnia.`,

  `CURA AMOREVOLE E DEDIZIONE AGLI STUDENTI

GALINA
(1941-2021)
Insegnante e musicologa
Amava il pianoforte, la ricerca e i suoi studenti.`,

  `RESPONSABILITÀ E SOSTEGNO PER GLI ALTRI

BARTOLO
(1988-2025)
Collaboratore scolastico
Amava il calcio e l’informatica.`,

  `SORRISO LUMINOSO E SAGGEZZA SPECIALE

OLGA
(2006-2011)
Bambina solare e gioiosa
Amava giocare con altri bambini.`,

  `TALENTO, PROFESSIONALITÀ E FORZA

IGOR
(1949-2025)
Compositore e orchestratore
Amava la musica, la pesca e raccogliere funghi.`,

  `BONTÀ INFINITA E COMPASSIONE PER TUTTI

LIDIA
(1949-2020)
Sarta e creatrice di abiti
Amava i bambini e lavorare in asilo.`,

  `ENERGIA E GIOIA DI VIVERE

CAPITALINA
(1935-2020)
Animatrice e organizzatrice di eventi
Amava lo sport, lo yoga e la socialità.`,

  `ANIMA POETICA E SENSIBILITÀ

DIMITRI
(1947-2015)
Architetto e poeta
Amava l’arte, la famiglia e la vita spirituale.`,

  `DOLCEZZA E CALMA PER TUTTI

LUDMILA
(1948-2019)
Fioraia e dipendente tessile
Amava creare bouquet, composizioni e quadri con fiori secchi.`,

  `FORZA E SENSIBILITÀ

ANNA
(1927-2006)
Guardiana notturna
Amava leggere e cantare.`,

  `DEDIZIONE TOTALE AGLI ALTRI

PADRE GENNADIJ
(1948-1997)
Sacerdote e architetto
Amava la comunità, l’arte, la musica e la natura.`,

  `ANIMA NELLA MUSICA E TRASMETTERLA AGLI ALTRI

ALESSANDRO
(1983-2020)
Violoncellista
Amava i viaggi, il pubblico e la modestia.`,

  `TALENTO E UMILTÀ

CIRILLO
(1984-2016)
Cantante del coro Aleksandrov
Amava gli amici, l’allegria e la musica.`,

  `AMORE PER LA VITA E LE CULTURE

MARIA
(1970-2024)
Cantante e segretaria
Amava i viaggi, l’arte e i cavalli.`,

  `PASSIONE E TALENTO PER LA FOTOGRAFIA

ALFREDO
(1946-2023)
Fotografo e professore
Amava scoprire nuovi luoghi.`,

  `RICERCA DI SÉ E CORAGGIO DI SEGUIRE I DESIDERI

PINO
(1935-2002)
Funzionario ministeriale
Amava l’informatica, l’elettronica e la musica classica.`
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
    this.scaleAnimationSpeed = random(0.1, 0.4);

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
  // calcola una piccola oscillazione dolce con noise invece che random
  let offsetX = map(noise(this.noiseOffsetX), 0, 1, -10, 10);
  let offsetY = map(noise(this.noiseOffsetY), 0, 1, -10, 10);
  let x_base = this.circleCenterX + cos(this.angle) * this.circleRadius;
  let y_base = this.circleCenterY + sin(this.angle) * this.circleRadius;
  this.x = x_base + cos(this.angle) * (imgH / 2) + offsetX;
  this.y = y_base + sin(this.angle) * (imgH / 2) + offsetY;
}


  release() {
    this.released = true;
    this.releaseProgress = 0;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    if (this.released && this.releaseProgress < 1.0) {
      this.releaseProgress += 0.02;
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
      this.noiseOffsetX += random(0.01, 0.04);
      this.noiseOffsetY += random(0.01, 0.04);

      let maxSpeed = 4;
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
    this.scaleFactor = this.baseScaleFactor * (1.0 + 0.15 * sin(this.scaleAnimationPhase));
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
  // Carica immagini sfondo e soffione
  sfondo = loadImage("data/sfondo.png");
  soffione = loadImage("data/soffione.png");

  // Carica immagini semi (soffione1.png, soffione2.png ...)
  let numSemi = testiSemi.length;
  for (let i = 1; i <= numSemi; i++) {
    photos.push(loadImage(`data/soffione${i}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  center = createVector(width / 2, height / 2);
  lastInteractionMillis = millis();

  if (sfondo) sfondo.resize(width, height);

  // Parametri soffione centrati
  const scaleFactor = 1.2;
  const soffioneDisplayWidth = soffione.width * scaleFactor;
  const circleRadius = (soffioneDisplayWidth / 2) * 0.7; // raggio intorno al soffione

  const circleCenterX = center.x;
  const circleCenterY = center.y + 30; // per allineare con immagine

  const numSemi = testiSemi.length;
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

  seeds = [];
  for (let i = 0; i < numSemi; i++) {
    let angle = i * distanzaTraSemi;
    let scaleFactorSeed = scaleSequence[i];
    let seed = new Seed(angle, photos[i % photos.length], scaleFactorSeed, circleCenterX, circleCenterY, circleRadius, testiSemi[i]);
    seeds.push(seed);
  }

  // Audio setup
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, bands);
  fft.setInput(mic);
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

  let volume = mic.getLevel();
forzaSoffio = map(volume, 0, 0.3, 0, 5);
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
    let velocitaRotazioneOra = TWO_PI / partiTotali / 60.0;
    let velocitaRotazioneMinuti = velocitaRotazioneOra * 10;

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

  textSize(w * 0.02);
  text("Per donare respiro alle vite passate", w / 2, h * 0.10);

  textSize(w * 0.06);
  text("SOFFIA!", w / 2, h * 0.20);

  textSize(w * 0.02);
  text("(Fai volare i semi)", w / 2, h * 0.30);

  textSize(w * 0.02);
  text("Per stringere la mano a chi abita nel ricordo e conoscerlo", w / 2, h * 0.50);

  textSize(w * 0.060);
  text("CLICCA", w / 2, h * 0.60);

  textSize(w * 0.02);
  text("(Su un seme volante)", w / 2, h * 0.70);
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
  if (showStartScreen) {
    showStartScreen = false;
    lastInteractionMillis = millis();
    return;
     let fs = fullscreen();
  fullscreen(!fs);
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
  if (soffione) soffione.resize(soffione.width, soffione.height); // o scala adatta a nuovo canvas
}

