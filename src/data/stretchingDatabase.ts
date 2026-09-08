export interface StretchingExercise {
  id: string;
  name: string;
  nameEn: string;
  muscle: string;
  muscleId: 'lower' | 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' | 'abs';
  level: 1 | 2 | 3;
  equipment: 'Bodyweight' | 'Blocchi Yoga' | 'Elastico Circolare' | 'Elastico Tubolare';
  youtubeUrl: string;
  youtubeQuery: string;
  tipsIt: string[];
  tipsEn: string[];
  mistakesIt: string[];
  mistakesEn: string[];
  propsUsageIt?: string;
  propsUsageEn?: string;
}

export const STRETCHING_EXERCISES: StretchingExercise[] = [
  // --- GAMBE, BACINO & FLESSORI ANCA (LOWER) ---
  {
    id: 'pigeon_pose',
    name: 'Posizione del Piccione (Pigeon Pose / Kapotasana)',
    nameEn: 'Pigeon Pose (Hip Opener / Kapotasana)',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 2,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=0_zPqA65Nok',
    youtubeQuery: 'pigeon pose yoga tutorial technique',
    tipsIt: [
      "Mantieni il bacino allineato e parallelo al pavimento, senza sbilanciarti sul gluteo.",
      "Fletti a martello il piede anteriore per proteggere l'articolazione del ginocchio.",
      "Espira profondamente rilassando il torace verso il pavimento ad ogni ciclo respiratorio."
    ],
    tipsEn: [
      "Keep your hips square and level with the floor; avoid collapsing onto one side.",
      "Flex the front foot actively to protect your knee joint.",
      "Exhale deeply, relaxing your chest towards the mat with each breath."
    ],
    mistakesIt: [
      "Inclinare il bacino da un lato perdendo la simmetria dell'allungamento.",
      "Forzare la rotazione del ginocchio se si avverte tensione all'articolazione."
    ],
    mistakesEn: [
      "Rolling onto one hip instead of staying centered.",
      "Forcing knee flexion if you feel sharp tension in the joint."
    ]
  },
  {
    id: 'pigeon_pose_blocks',
    name: 'Posizione del Piccione con Blocco Yoga (Supporto Bacino)',
    nameEn: 'Supported Pigeon Pose with Yoga Block',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=0_zPqA65Nok',
    youtubeQuery: 'pigeon pose with yoga block tutorial',
    tipsIt: [
      "Posiziona il blocco yoga proprio sotto il gluteo della gamba piegata per dare sostegno al bacino.",
      "Questo supporto elimina la tensione alle ginocchia e permette al muscolo piriforme di rilasciarsi gradualmente.",
      "Mantieni la schiena lunga e le mani in appoggio a terra o su un secondo blocco."
    ],
    tipsEn: [
      "Place a yoga block directly under the hip of the bent leg for pelvis support.",
      "This prop removes knee torque and allows the piriformis muscle to release smoothly.",
      "Keep your spine long and rest hands on the floor or a second block."
    ],
    mistakesIt: [
      "Lasciare il bacino sospeso in tensione senza appoggiarsi saldamente al blocco.",
      "Incurvare eccessivamente la parte alta della schiena."
    ],
    mistakesEn: [
      "Leaving the hip suspended in tension instead of trusting the block support.",
      "Excessively hunching the upper back."
    ],
    propsUsageIt: "Posiziona il mattoncino all'altezza desiderata (bassa o media) sotto il gluteo anteriore per stabilizzare il bacino.",
    propsUsageEn: "Set the yoga block at lowest or medium height under the front hip to square your pelvis."
  },
  {
    id: 'banded_hamstring_stretch',
    name: 'Allungamento Ischiocrurali con Elastico da Supino (Supta Padangusthasana)',
    nameEn: 'Supine Banded Hamstring Stretch',
    muscle: 'Gambe & Glutei',
    muscleId: 'lower',
    level: 1,
    equipment: 'Elastico Circolare',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZfO3Fm_2G2c',
    youtubeQuery: 'supine hamstring stretch with resistance band tutorial',
    tipsIt: [
      "Distenditi a pancia in su e avvolgi l'elastico attorno all'avampiede.",
      "Tieni la gamba distesa (o con micro-piegamento) e traziona dolcemente verso di te.",
      "Mantieni l'altra gamba distesa a terra con il tallone che preme sul materassino."
    ],
    tipsEn: [
      "Lie on your back and loop the resistance band securely around the ball of your foot.",
      "Keep the leg straight with a micro-bend and gently pull the band towards your chest.",
      "Keep the opposite leg grounded and flat against the mat."
    ],
    mistakesIt: [
      "Sollevare il bacino o la zona lombare dal pavimento durante la trazione.",
      "Tirare a scatti: il movimento deve essere fluido, assecondato dalla respirazione."
    ],
    mistakesEn: [
      "Lifting your tailbone or lower back off the floor while pulling.",
      "Jerking the band rather than allowing a smooth, breath-guided stretch."
    ],
    propsUsageIt: "L'elastico colma il divario di mobilità, consentendo di allungare la catena posteriore senza piegare la schiena.",
    propsUsageEn: "The band bridges mobility gaps, enabling deep posterior chain stretch without rounding the spine."
  },
  {
    id: '90_90_hip_mobility',
    name: '90/90 Hip Mobility & Allungamento Gluteo/Anca',
    nameEn: '90/90 Hip Mobility Stretch',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 2,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=wXF9J5T0eog',
    youtubeQuery: '90 90 hip stretch tutorial mobility',
    tipsIt: [
      "Posiziona entrambe le gambe con angoli precisi di 90° tra anca, ginocchio e caviglia.",
      "Mantieni il busto alto e fletti dolcemente il busto in avanti partendo dalle anche.",
      "Lavora sia sulla rotazione esterna della gamba anteriore che sull'interna della posteriore."
    ],
    tipsEn: [
      "Position both legs at precise 90-degree angles at the hips, knees, and ankles.",
      "Keep your torso upright and hinge forward from the hips with a flat back.",
      "Mobilize both external rotation on the front leg and internal rotation on the rear leg."
    ],
    mistakesIt: [
      "Incurvare la colonna vertebrale anziché piegarsi dall'anca.",
      "Piegare eccessivamente il ginocchio riducendo l'angolo di 90°."
    ],
    mistakesEn: [
      "Rounding the lumbar spine instead of hinging directly from the hip crease.",
      "Collapsing the 90-degree knee angle."
    ]
  },
  {
    id: 'low_lunge_anjaneyasana',
    name: 'Low Lunge / Anjaneyasana (Allungamento Psoas & Flessori Anca)',
    nameEn: 'Low Lunge / Anjaneyasana (Hip Flexor & Psoas Stretch)',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=3R4N28fOqfI',
    youtubeQuery: 'low lunge anjaneyasana hip flexor stretch tutorial',
    tipsIt: [
      "Ginocchio anteriore allineato sopra la caviglia a 90°.",
      "Fai scorrere il ginocchio posteriore indietro e retroverto leggermente il bacino.",
      "Distendi le braccia verso l'alto aprendo il torace senza comprimere la zona lombare."
    ],
    tipsEn: [
      "Front knee stacked directly above front ankle at 90 degrees.",
      "Slide the back knee back and tuck the tailbone under to engage the hip flexor.",
      "Extend arms upward to lift the chest without jamming the lumbar spine."
    ],
    mistakesIt: [
      "Lasciare che il ginocchio anteriore superi eccessivamente la punta del piede.",
      "Inarcare la schiena in iperlordosi senza attivare il core."
    ],
    mistakesEn: [
      "Letting front knee drift far past toes without ankle mobility.",
      "Hyperextending lower back without engaging the lower abs."
    ]
  },
  {
    id: 'low_lunge_with_blocks',
    name: 'Low Lunge con Appoggio su Blocchi Yoga (Supporto Flessori)',
    nameEn: 'Low Lunge with Yoga Blocks',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=3R4N28fOqfI',
    youtubeQuery: 'low lunge with yoga blocks tutorial',
    tipsIt: [
      "Posiziona due blocchi yoga ai lati del piede anteriore per appoggiare comodamente le mani.",
      "Questo permette di mantenere il torace sollevato e la colonna dritta senza sovraccaricare le ginocchia.",
      "Lascia scendere il bacino in avanti e verso il basso respirando nel flessore dell'anca."
    ],
    tipsEn: [
      "Place two yoga blocks on either side of the front foot to support your hands.",
      "This elevates the torso, keeping spine straight without compressing hips.",
      "Allow pelvis to sink forward and down while breathing into the hip flexor."
    ],
    mistakesIt: [
      "Scaricare tutto il peso sulle spalle anziché distribuirlo sulle gambe.",
      "Trattenere il respiro."
    ],
    mistakesEn: [
      "Dumping all weight into shoulders rather than distributing through legs.",
      "Holding breath under stretch tension."
    ],
    propsUsageIt: "Usa i blocchi in posizione media o alta per consentire al torace di rimanere eretto e proteggere il ginocchio posteriore.",
    propsUsageEn: "Use blocks at medium or high height to allow tall posture and alleviate back knee stress."
  },
  {
    id: 'lizard_pose',
    name: 'Lizard Pose / Posizione della Lucertola (Apertura Anca Profonda)',
    nameEn: 'Lizard Pose (Deep Hip & Groin Opener)',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 2,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=V9L7r9wM2a0',
    youtubeQuery: 'lizard pose yoga tutorial utthan pristhasana',
    tipsIt: [
      "Porta entrambe le mani all'interno del piede anteriore.",
      "Allunga il tallone posteriore all'indietro mantenendo la colonna distesa.",
      "Scendi gradualmente sugli avambracci se la flessibilità lo consente."
    ],
    tipsEn: [
      "Bring both hands inside the front foot on the floor.",
      "Lengthen back heel away from crown of head to keep spine long.",
      "Gradually lower onto forearms only if flexibility permits."
    ],
    mistakesIt: [
      "Incurvare pesantemente la schiena pur di toccare terra con i gomiti.",
      "Lasciare che il ginocchio anteriore si apra lateralmente senza controllo."
    ],
    mistakesEn: [
      "Severe spinal rounding just to force elbows to the floor.",
      "Letting front foot roll without stabilizing ankle joint."
    ]
  },
  {
    id: 'lizard_pose_blocks',
    name: 'Lizard Pose con Avambracci su Blocchi Yoga',
    nameEn: 'Lizard Pose with Forearms on Yoga Blocks',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=V9L7r9wM2a0',
    youtubeQuery: 'lizard pose with blocks tutorial yoga',
    tipsIt: [
      "Posiziona un blocco o due blocchi affiancati all'interno del piede anteriore.",
      "Appoggia gli avambracci sul blocco per un allungamento confortevole e progressivo dell'anca.",
      "Respira lentamente rilassando i muscoli adduttori e lo psoas."
    ],
    tipsEn: [
      "Set one or two yoga blocks inside the front foot.",
      "Rest forearms on the blocks for a progressive, comfortable hip opening.",
      "Breathe deeply to relax adductors and psoas."
    ],
    mistakesIt: [
      "Tendere il collo verso l'alto; mantieni lo sguardo verso il blocco.",
      "Forzare l'escursione oltre la soglia del dolore."
    ],
    mistakesEn: [
      "Straining neck upward; keep gaze softly towards the block.",
      "Pushing past gentle discomfort into pain."
    ],
    propsUsageIt: "I mattoncini colmano la distanza dal pavimento, permettendo di aprire le anche senza forzare le vertebre lombari.",
    propsUsageEn: "Blocks bridge the floor distance, enabling deep hip opening without compromising lower back integrity."
  },
  {
    id: 'frog_pose',
    name: 'Frog Pose (Posizione della Rana per Adduttori & Bacino)',
    nameEn: 'Frog Pose (Mandukasana Groin & Adductor Stretch)',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 3,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=s5R8k-p_8yU',
    youtubeQuery: 'frog pose mandukasana tutorial adductor stretch',
    tipsIt: [
      "Ginocchia divaricate al massimo sul tappetino con caviglie allineate sotto le ginocchia.",
      "Piedi ruotati all'esterno a martello a 90°.",
      "Scendi sugli avambracci e spingi delicatamente il bacino all'indietro."
    ],
    tipsEn: [
      "Widen knees as far as comfortable with ankles aligned directly behind knees.",
      "Feet flexed outward at 90 degrees like frog feet.",
      "Lower to forearms and gently guide hips backward to deepen groin stretch."
    ],
    mistakesIt: [
      "Scivolare troppo in avanti col bacino scaricando la tensione dall'interno coscia.",
      "Eseguire su superficie dura senza cuscinetti o tappetino sotto le ginocchia."
    ],
    mistakesEn: [
      "Drifting hips too far forward, removing the adductor load.",
      "Practicing on a hard surface without knee padding."
    ]
  },
  {
    id: 'butterfly_stretch',
    name: 'Posizione della Farfalla (Baddha Konasana a Terra)',
    nameEn: 'Butterfly Stretch (Baddha Konasana)',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=J3Z4X4Q7_1M',
    youtubeQuery: 'butterfly stretch baddha konasana tutorial yoga',
    tipsIt: [
      "Unisci le piante dei piedi davanti al bacino e afferra delicatamente le caviglie.",
      "Raddrizza la schiena aprendo il petto verso l'alto prima di fletterti leggermente.",
      "Lascia che la gravità accompagni le ginocchia verso il pavimento senza molleggiare."
    ],
    tipsEn: [
      "Bring soles of feet together in front of pelvis, grasping ankles or toes.",
      "Sit tall, lifting chest up before hinging slightly forward from hips.",
      "Allow gravity to draw knees down naturally without bouncing."
    ],
    mistakesIt: [
      "Molleggiare bruscamente con le gambe (rischio di stiramento agli adduttori).",
      "Gobba nella parte centrale della schiena."
    ],
    mistakesEn: [
      "Bouncing knees aggressively (causes groin muscle strain).",
      "Slumping through the mid and upper back."
    ]
  },
  {
    id: 'butterfly_with_blocks',
    name: 'Farfalla Supportata con Blocchi Yoga sotto le Ginocchia',
    nameEn: 'Supported Butterfly Pose with Yoga Blocks',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=J3Z4X4Q7_1M',
    youtubeQuery: 'supported baddha konasana with blocks tutorial',
    tipsIt: [
      "Posiziona un blocco yoga sotto la parte esterna di ciascun ginocchio.",
      "Il supporto elimina il riflesso di contrazione e rilassa completamente il pavimento pelvico e gli adduttori.",
      "Ideale per chi ha anche rigide o lombalgia."
    ],
    tipsEn: [
      "Place a yoga block under the outer edge of each knee.",
      "The firm support deactivates the stretch reflex, allowing deep groin and pelvic relaxation.",
      "Ideal for athletes with tight hips or lower back stiffness."
    ],
    mistakesIt: [
      "Posizionare i blocchi troppo distanti, non offrendo appoggio alle ginocchia."
    ],
    mistakesEn: [
      "Placing blocks too far away, leaving knees unsupported."
    ],
    propsUsageIt: "I mattoncini sotto le ginocchia forniscono un limite sicuro, permettendo al sistema nervoso di rilassare i muscoli dell'inguine.",
    propsUsageEn: "Blocks under thighs provide physical boundaries, signaling the nervous system to let go of adductor tension."
  },
  {
    id: 'banded_seated_forward_fold',
    name: 'Piegamento in Avanti con Elastico (Banded Paschimottanasana)',
    nameEn: 'Banded Seated Forward Fold (Paschimottanasana)',
    muscle: 'Gambe & Glutei',
    muscleId: 'lower',
    level: 1,
    equipment: 'Elastico Circolare',
    youtubeUrl: 'https://www.youtube.com/watch?v=YQhD4tLp4bY',
    youtubeQuery: 'seated forward fold with strap band tutorial',
    tipsIt: [
      "Siediti a gambe distese e avvolgi l'elastico attorno agli avampiedi.",
      "Impugna le due estremità dell'elastico mantenendo le spalle rilassate e la schiena dritta.",
      "Tira delicatamente con le braccia per accompagnare il petto verso le cosce, espirando."
    ],
    tipsEn: [
      "Sit with legs extended, loop resistance band around balls of feet.",
      "Hold both ends with relaxed shoulders and extended spine.",
      "Gently traction to draw your chest towards your thighs on exhalations."
    ],
    mistakesIt: [
      "Incurvare il collo e tirare a strappo con le braccia.",
      "Bloccare le ginocchia in iperestensione dolorosa."
    ],
    mistakesEn: [
      "Rounding neck to force forehead to knees.",
      "Hyperextending knees aggressively."
    ],
    propsUsageIt: "L'elastico prolunga le braccia, permettendo a chi ha ischiocrurali rigidi di mantenere la colonna neutrale.",
    propsUsageEn: "The band extends arm reach, allowing those with tight hamstrings to stretch safely without spinal rounding."
  },
  {
    id: 'malasana_deep_squat_block',
    name: 'Deep Squat Mobilità su Blocco Yoga (Malasana Assistito)',
    nameEn: 'Supported Deep Squat Mobility on Yoga Block',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=0qFf5f-iW-M',
    youtubeQuery: 'malasana squat with yoga block tutorial mobility',
    tipsIt: [
      "Posiziona un blocco yoga sotto il bacino e siediti in accosciata profonda con i piedi aperti a larghezza spalle.",
      "Unisci i palmi al petto e usa i gomiti per aprire delicatamente le ginocchia.",
      "Allunga la colonna verso il soffitto e respira profondamente nel pavimento pelvico."
    ],
    tipsEn: [
      "Sit on a yoga block in a deep squat stance with feet shoulder-width apart.",
      "Bring palms together at heart center, gently pressing elbows against inner knees.",
      "Lengthen spine towards ceiling and take deep diaphragmatic breaths."
    ],
    mistakesIt: [
      "Sollevare i talloni da terra; mantieni i piedi ben piantati.",
      "Incurvare la zona lombare."
    ],
    mistakesEn: [
      "Heels lifting off the ground; keep full foot contact.",
      "Collapsing the chest and lower back."
    ],
    propsUsageIt: "Sedersi sul blocco elimina il carico articolare alle ginocchia consentendo la massima apertura del bacino e mobilità di caviglia.",
    propsUsageEn: "Sitting on the block removes knee joint torque while developing pelvic opening and ankle dorsiflexion."
  },
  {
    id: 'half_splits_blocks',
    name: 'Half Splits con Blocchi Yoga (Ardha Hanumanasana)',
    nameEn: 'Half Splits with Yoga Blocks (Hamstring Floss)',
    muscle: 'Gambe & Glutei',
    muscleId: 'lower',
    level: 2,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=p1n8L4K9O3w',
    youtubeQuery: 'half split ardha hanumanasana with blocks tutorial',
    tipsIt: [
      "Dall'affondo basso, distendi la gamba anteriore sollevando la punta del piede a martello.",
      "Appoggia le mani su due blocchi yoga posizionati all'altezza più comoda ai lati dello stinco.",
      "Mantieni il bacino perfettamente in linea con il ginocchio posteriore e allunga il busto in avanti."
    ],
    tipsEn: [
      "From low lunge, straighten front leg, flexing toes towards your face.",
      "Place hands on two yoga blocks framed beside your front shin.",
      "Keep hips stacked directly over back knee and extend chest forward."
    ],
    mistakesIt: [
      "Sedersi all'indietro sul tallone posteriore perdendo l'allineamento a 90°.",
      "Curvare la schiena forzando la testa verso il ginocchio."
    ],
    mistakesEn: [
      "Sitting back onto the rear heel, losing the 90-degree hip alignment.",
      "Rounding spine to force head to shin."
    ],
    propsUsageIt: "I due blocchi stabilizzano il tronco a qualsiasi altezza, consentendo un isolamento perfetto degli ischiocrurali.",
    propsUsageEn: "The blocks stabilize your torso at any chosen height for targeted hamstring lengthening."
  },
  {
    id: 'banded_quad_stretch',
    name: 'Allungamento Quadricipite & Psoas con Elastico da Prono',
    nameEn: 'Prone Banded Quadriceps & Hip Flexor Stretch',
    muscle: 'Gambe & Glutei',
    muscleId: 'lower',
    level: 1,
    equipment: 'Elastico Circolare',
    youtubeUrl: 'https://www.youtube.com/watch?v=K7xK8b3Y2W0',
    youtubeQuery: 'prone quad stretch with strap band tutorial',
    tipsIt: [
      "Sdraiati a pancia in giù, fissa l'elastico attorno al collo del piede e tieni i capi sopra la spalla.",
      "Tira delicatamente l'elastico avvicinando il tallone al gluteo.",
      "Stringi leggermente i glutei per mantenere il bacino a contatto con il pavimento."
    ],
    tipsEn: [
      "Lie face down, loop resistance band around top of foot, holding strap over your shoulder.",
      "Gently pull band forward, drawing heel towards glutes.",
      "Engage glutes to keep pelvis firmly anchored to the mat."
    ],
    mistakesIt: [
      "Inarcare la schiena staccando il bacino dal pavimento.",
      "Tirare con forza eccessiva causando crampi al femorale."
    ],
    mistakesEn: [
      "Arching lower back off mat, losing pelvic contact.",
      "Pulling violently, triggering hamstring cramps."
    ],
    propsUsageIt: "L'elastico permette a chi non riesce a raggiungere la caviglia con la mano di allungare i quadricipiti in totale sicurezza.",
    propsUsageEn: "The band allows athletes with limited reach to stretch quads safely without twisting their shoulders."
  },

  // --- COLONNA, DORSO & MOBILITÀ SCHIENA (BACK) ---
  {
    id: 'cat_cow_pose',
    name: 'Posizione del Gatto-Mucca (Cat-Cow Pose Dinamico)',
    nameEn: 'Cat-Cow Pose (Dynamic Spinal Articulation)',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=nMf8C3pXfvg',
    youtubeQuery: 'cat cow pose tutorial yoga with adriene',
    tipsIt: [
      "Quadrupedia: polsi sotto le spalle, ginocchia sotto le anche.",
      "Inspirando: inarca dolcemente, solleva il coccige e guarda avanti aprendo il petto (Mucca).",
      "Espirando: curva la colonna verso il soffitto, spingi con i palmi e porta il mento allo sterno (Gatto)."
    ],
    tipsEn: [
      "All fours: wrists under shoulders, knees under hips.",
      "Inhale: drop belly, lift tailbone and gaze forward, broadening collarbones (Cow).",
      "Exhale: round spine towards ceiling, press through hands, tuck chin (Cat)."
    ],
    mistakesIt: [
      "Movimenti bruschi e veloci senza seguire il ritmo del respiro.",
      "Inarcare solo il tratto lombare dimenticando la zona dorsale e cervicale."
    ],
    mistakesEn: [
      "Rushing repetitions without matching natural breath cadence.",
      "Moving only the lower back while ignoring thoracic spine."
    ]
  },
  {
    id: 'childs_pose_balasana',
    name: "Posizione del Bambino (Child's Pose / Balasana)",
    nameEn: "Child's Pose (Balasana Decompression)",
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=2MJGg-dUKh0',
    youtubeQuery: 'childs pose balasana tutorial yoga',
    tipsIt: [
      "Ginocchia larghe quanto il tappetino, alluci uniti, siediti indietro sui talloni.",
      "Cammina con le dita in avanti allungando il busto e appoggia la fronte a terra.",
      "Respira espandendo la parte posteriore della gabbia toracica."
    ],
    tipsEn: [
      "Knees wide, big toes touching, sit hips back onto heels.",
      "Walk hands forward, lengthening torso, and rest forehead on mat.",
      "Breathe deeply, feeling the back of your rib cage expand."
    ],
    mistakesIt: [
      "Sollevare il bacino dai talloni se non necessario; rilassa completamente il peso indietro.",
      "Tendere le spalle verso le orecchie."
    ],
    mistakesEn: [
      "Lifting hips up high instead of sinking back.",
      "Shrugging shoulders into the neck."
    ]
  },
  {
    id: 'puppy_pose_on_blocks',
    name: 'Puppy Pose con Mani su Blocchi Yoga (Apertura Toracica Profonda)',
    nameEn: 'Puppy Pose with Hands on Yoga Blocks',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 2,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=78Ww8Z-f-7A',
    youtubeQuery: 'puppy pose with yoga blocks anahatasana tutorial',
    tipsIt: [
      "Posiziona due blocchi all'inizio del tappetino e appoggiaci sopra i palmi o gli avambracci.",
      "Mantieni il bacino direttamente sopra le ginocchia (angolo a 90°).",
      "Lascia che il petto sprofondi verso il pavimento sentendo un'intensa apertura toracica e allungamento dorsale."
    ],
    tipsEn: [
      "Place two yoga blocks at top of mat and rest palms or forearms on them.",
      "Keep hips stacked directly over knees at a 90-degree angle.",
      "Allow heart and chest to melt towards floor for deep thoracic spine extension."
    ],
    mistakesIt: [
      "Spostare il bacino troppo avanti o indietro rispetto alle ginocchia.",
      "Comprimere la zona lombare senza attivare leggermente il trasverso addominale."
    ],
    mistakesEn: [
      "Shifting hips too far forward or back from knee alignment.",
      "Dumping into lumbar spine without subtle lower core support."
    ],
    propsUsageIt: "I blocchi sollevano le braccia, creando un angolo di estensione toracica e apertura delle spalle impossibile a pavimento piatto.",
    propsUsageEn: "Blocks elevate hands, amplifying thoracic extension and lat stretch far beyond flat floor reach."
  },
  {
    id: 'supported_fish_pose_blocks',
    name: 'Posizione del Pesce Supportata su Blocchi Yoga (Matsyasana)',
    nameEn: 'Supported Fish Pose with Two Yoga Blocks (Matsyasana)',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=oV8C0cI3_d4',
    youtubeQuery: 'supported fish pose with yoga blocks tutorial',
    tipsIt: [
      "Posiziona un blocco orizzontale/verticale all'altezza media sotto le scapole e uno all'altezza media sotto la testa.",
      "Sdraiati dolcemente all'indietro aprendo le braccia a croce o a candelabro con i palmi rivolti in alto.",
      "Respira lentamente nel petto: corregge all'istante la postura curva da scrivania."
    ],
    tipsEn: [
      "Position one block under shoulder blades and a second block supporting the head.",
      "Recline back gently, opening arms out to sides with palms facing up.",
      "Breathe deeply into rib cage: instant antidote to desk-slouch posture."
    ],
    mistakesIt: [
      "Posizionare il blocco troppo in basso nella zona lombare (deve stare tra le scapole).",
      "Lasciare la testa ciondolare all'indietro senza adeguato supporto."
    ],
    mistakesEn: [
      "Placing block in lower back lumbar curve rather than thoracic spine.",
      "Letting head hang unsupported without neck alignment."
    ],
    propsUsageIt: "Due mattoncini creano un sostegno passivo che apre il torace e allenta le contratture di pettorali e collo senza alcuno sforzo.",
    propsUsageEn: "Two blocks provide effortless passive support, opening tight chest muscles and reversing forward-head posture."
  },
  {
    id: 'supported_bridge_pose_block',
    name: 'Ponte Glutei Decompressivo con Blocco Yoga sotto il Sacro',
    nameEn: 'Supported Bridge Pose with Yoga Block on Sacrum',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=E7X2gY3U2qE',
    youtubeQuery: 'supported bridge pose with block under sacrum tutorial',
    tipsIt: [
      "Sdraiati a pancia in su con le ginocchia piegate e i piedi a terra a larghezza bacino.",
      "Solleva il bacino e posiziona il blocco piatto sotto l'osso sacro (non sui reni né sulla colonna lombare).",
      "Rilascia tutto il peso del bacino sul blocco, distendendo le braccia lungo i fianchi."
    ],
    tipsEn: [
      "Lie on back with knees bent and feet flat on mat hip-width apart.",
      "Lift hips and slide yoga block directly beneath the sacrum flat surface (not lumbar spine).",
      "Surrender your pelvis weight completely onto block with arms resting alongside body."
    ],
    mistakesIt: [
      "Posizionare il blocco troppo in alto sulla curva lombare causando pizzicotti nervosi.",
      "Divaricare eccessivamente le ginocchia verso l'esterno."
    ],
    mistakesEn: [
      "Placing block too high in lower back arch causing nerve pinching.",
      "Flaring knees excessively outwards."
    ],
    propsUsageIt: "Il blocco sostiene la pelvi descomprimendo i dischi intervertebrali lombari e rilassando lo psoas in modo passivo.",
    propsUsageEn: "The block supports the pelvis, passively decompressing lumbar discs and easing psoas tension."
  },
  {
    id: 'thread_the_needle',
    name: "Infilare l'Ago (Thread the Needle per Spalle & Cingolo Scapolare)",
    nameEn: 'Thread the Needle (Shoulder & Upper Back Opener)',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=gT-x0gN_9i8',
    youtubeQuery: 'thread the needle pose yoga tutorial',
    tipsIt: [
      "Dalla quadrupedia, infila un braccio sotto il busto facendolo scorrere verso il lato opposto.",
      "Appoggia la spalla e la tempia delicatamente sul pavimento.",
      "Cammina con l'altra mano in avanti o portala dietro la schiena per accentuare la torsione."
    ],
    tipsEn: [
      "From all fours, thread one arm underneath torso sliding across opposite side.",
      "Rest shoulder and temple gently down onto the floor.",
      "Walk opposite fingertips forward or drape arm behind back to deepen twist."
    ],
    mistakesIt: [
      "Scaricare un peso eccessivo sulla testa o sul collo.",
      "Spostare il bacino fuori dall'asse centrale."
    ],
    mistakesEn: [
      "Dumping dangerous bodyweight directly into neck/cervical spine.",
      "Letting hips slide sideways off center."
    ]
  },
  {
    id: 'supine_spinal_twist',
    name: 'Torsione Spinale Supina con Spalle a Terra (Supta Matsyendrasana)',
    nameEn: 'Supine Spinal Twist (Supta Matsyendrasana)',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=n7V8HlWkE0I',
    youtubeQuery: 'supine spinal twist supta matsyendrasana yoga tutorial',
    tipsIt: [
      "Sdraiati sulla schiena, piega un ginocchio al petto e guidalo oltre il corpo verso il pavimento opposto.",
      "Apri il braccio opposto a terra con il palmo verso l'alto, mantenendo entrambe le scapole incollate al suolo.",
      "Gira lo sguardo nella direzione opposta al ginocchio ed espira rilasciando la colonna."
    ],
    tipsEn: [
      "Lie on back, draw one knee into chest and guide it across body toward opposite floor.",
      "Extend opposite arm out in a T-shape, keeping both shoulder blades grounded.",
      "Turn gaze opposite to your knee and exhale fully to release spinal twist."
    ],
    mistakesIt: [
      "Staccare la spalla opposta dal pavimento per toccare per forza terra col ginocchio.",
      "Contrarre i muscoli addominali invece di rilassarli."
    ],
    mistakesEn: [
      "Lifting opposite shoulder off mat just to force knee to touch floor.",
      "Tensing abdominals instead of softening through twist."
    ]
  },
  {
    id: 'cobra_pose_bhujangasana',
    name: 'Posizione del Cobra & Decompressione (Bhujangasana)',
    nameEn: 'Cobra Pose (Bhujangasana Extension)',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 2,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=fOdrW7nf9gw',
    youtubeQuery: 'cobra pose bhujangasana tutorial yoga with adriene',
    tipsIt: [
      "Sdraiati a pancia in giù con le mani posizionate sotto le spalle e gomiti vicini al corpo.",
      "Spingi il collo dei piedi nel pavimento e attiva dolcemente i glutei.",
      "Solleva il petto usando i muscoli dorsali prima di spingere leggermente con le mani, aprendo le clavicole."
    ],
    tipsEn: [
      "Lie prone with hands under shoulders, hugging elbows close to ribcage.",
      "Press tops of feet into floor and gently engage glutes.",
      "Lift chest using back muscles first, then lightly press hands to open collarbones."
    ],
    mistakesIt: [
      "Spingere di braccia incurvando le spalle verso le orecchie (mancata depressione scapolare).",
      "Iperestendere il collo all'indietro."
    ],
    mistakesEn: [
      "Pushing up with arms alone and scrunching shoulders into ears.",
      "Cranking neck backward aggressively."
    ]
  },
  {
    id: 'downward_facing_dog',
    name: 'Posizione del Cane a Faccia in Giù (Adho Mukha Svanasana)',
    nameEn: 'Downward-Facing Dog (Adho Mukha Svanasana)',
    muscle: 'Dorso & Colonna',
    muscleId: 'back',
    level: 2,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=j97SSGsnCAQ',
    youtubeQuery: 'downward facing dog tutorial adho mukha svanasana',
    tipsIt: [
      "Dita delle mani ben aperte che afferrano il tappetino, spingendo il peso verso i talloni.",
      "Allontana le spalle dalle orecchie e allunga la colonna vertebrale formando una 'V' rovesciata.",
      "Se gli ischiocrurali sono tesi, piega pure le ginocchia per dare priorità alla schiena dritta."
    ],
    tipsEn: [
      "Spread fingers wide, rooting through palms and sending hips up and back.",
      "Rotate shoulders outward, drawing shoulder blades down the back into an inverted 'V'.",
      "Bend knees generously if hamstrings are tight to keep spine straight."
    ],
    mistakesIt: [
      "Scaricare tutto il peso sui polsi curvando la schiena.",
      "Forzare i talloni a terra incurvando la colonna vertebrale."
    ],
    mistakesEn: [
      "Dumping weight into wrists while rounding upper back.",
      "Obsessing over grounding heels at expense of spinal length."
    ]
  },

  // --- SPALLE, PETTO & COLLO (CHEST & SHOULDERS) ---
  {
    id: 'banded_shoulder_dislocates',
    name: 'Dislocazioni Spalle con Elastico (Shoulder Pass-Throughs)',
    nameEn: 'Banded Shoulder Dislocates (Pass-Throughs)',
    muscle: 'Spalle & Petto',
    muscleId: 'shoulders',
    level: 1,
    equipment: 'Elastico Circolare',
    youtubeUrl: 'https://www.youtube.com/watch?v=33P5AI27eiU',
    youtubeQuery: 'banded shoulder dislocates tutorial mobility',
    tipsIt: [
      "Impugna l'elastico con presa ampia davanti alle cosce mantenendo le braccia tese.",
      "Con movimento lento e continuo, solleva le braccia sopra la testa e portale dietro la schiena.",
      "L'elasticità del prop consente alle spalle di superare il punto di blocco articolare in totale comfort."
    ],
    tipsEn: [
      "Hold resistance band with a wide overhand grip in front of thighs with straight arms.",
      "In a slow, continuous arc, lift arms overhead and pass them behind your back.",
      "The elastic stretch accommodates mobility sticking points without joint strain."
    ],
    mistakesIt: [
      "Piegare i gomiti durante il passaggio (allarga la presa sull'elastico se serve).",
      "Spingere la testa in avanti o inarcare le vertebre lombari."
    ],
    mistakesEn: [
      "Bending elbows to force the pass (widen your grip on the band instead).",
      "Jutting head forward or flaring ribs."
    ],
    propsUsageIt: "L'elastico si allarga elasticamente quando le spalle sono rigide, prevenendo qualsiasi rischio da sovraccarico.",
    propsUsageEn: "The band expands dynamically through tight shoulder spots, protecting the rotator cuff."
  },
  {
    id: 'banded_overhead_lat_stretch',
    name: 'Allungamento Dorsali & Spalle con Elastico (Banded Overhead Lat)',
    nameEn: 'Banded Overhead Lat & Shoulder Stretch',
    muscle: 'Spalle & Petto',
    muscleId: 'shoulders',
    level: 1,
    equipment: 'Elastico Circolare',
    youtubeUrl: 'https://www.youtube.com/watch?v=8V4x_0fLzWk',
    youtubeQuery: 'banded lat stretch shoulder mobility tutorial',
    tipsIt: [
      "Fissa l'elastico a un punto alto o tienilo con la mano opposta sopra la testa.",
      "Infila la mano nell'asola, afferra l'elastico e fai un passo indietro inclinando il busto.",
      "Lascia che la trazione allunghi tutto il gran dorsale e la spalla respirando profondamente."
    ],
    tipsEn: [
      "Anchor band overhead or hold with opposite hand above head.",
      "Step back with torso hinged to let band traction shoulder and lat.",
      "Breathe into side ribs as the band decompresses the shoulder joint."
    ],
    mistakesIt: [
      "Contrarre i bicipiti anziché abbandonare il braccio alla trazione dell'elastico."
    ],
    mistakesEn: [
      "Tensing biceps instead of allowing passive elastic distraction."
    ],
    propsUsageIt: "La trazione elastica crea decoaptazione dell'articolazione gleno-omerale, aprendo lo spazio sub-acromiale.",
    propsUsageEn: "Elastic distraction gently decompresses the glenohumeral joint, relieving impingement."
  },
  {
    id: 'banded_cow_face_pose',
    name: 'Posizione del Muso di Vacca con Elastico (Banded Gomukhasana Arms)',
    nameEn: 'Cow Face Arms with Resistance Band (Gomukhasana)',
    muscle: 'Spalle & Petto',
    muscleId: 'shoulders',
    level: 1,
    equipment: 'Elastico Circolare',
    youtubeUrl: 'https://www.youtube.com/watch?v=q6bLzM6p6oY',
    youtubeQuery: 'gomukhasana cow face arms with strap band tutorial',
    tipsIt: [
      "Porta un braccio sopra la testa e piega il gomito lungo la schiena tenendo un capo dell'elastico.",
      "Porta l'altro braccio dal basso dietro la schiena e afferra l'altro capo dell'elastico.",
      "Cammina con le mani lungo l'elastico avvicinandole progressivamente con il passare dei respiri."
    ],
    tipsEn: [
      "Reach top arm overhead, bend elbow down spine holding top end of band.",
      "Reach bottom arm behind back from underneath, holding lower end of band.",
      "Walk fingers closer along the band as shoulder flexibility increases with each breath."
    ],
    mistakesIt: [
      "Spingere la testa in avanti col braccio superiore (mantieni lo sguardo all'orizzonte).",
      "Forzare il contatto delle mani provocando dolori alla cuffia dei rotatori."
    ],
    mistakesEn: [
      "Pushing neck forward with top arm; keep head and cervical spine tall.",
      "Forcing hand clasp, irritating rotator cuff."
    ],
    propsUsageIt: "L'elastico collega le mani quando le spalle non arrivano a toccarsi, sviluppando flessibilità bilaterale senza compensazioni.",
    propsUsageEn: "The band connects hands when fingers cannot touch, developing balanced shoulder mobility without neck compensation."
  },
  {
    id: 'banded_chest_opener',
    name: 'Apertura Toracica & Pettorali con Elastico Dietro la Schiena',
    nameEn: 'Standing Banded Chest Opener',
    muscle: 'Spalle & Petto',
    muscleId: 'chest',
    level: 1,
    equipment: 'Elastico Circolare',
    youtubeUrl: 'https://www.youtube.com/watch?v=4x9L6z-0Q1A',
    youtubeQuery: 'standing chest opener stretch with resistance band tutorial',
    tipsIt: [
      "Impugna l'elastico dietro la schiena con i palmi rivolti in avanti.",
      "Allontana delicatamente le braccia dal bacino espandendo la gabbia toracica.",
      "Abbassa le spalle e respira profondamente nei pettorali."
    ],
    tipsEn: [
      "Hold band behind your back with knuckles pointing down and away.",
      "Gently lift hands away from glutes, expanding chest and collarbones.",
      "Depress shoulders away from ears and breathe into pectoral muscles."
    ],
    mistakesIt: [
      "Inarcare la schiena comprimendo le vertebre lombari.",
      "Alzare le spalle verso le orecchie."
    ],
    mistakesEn: [
      "Hyperextending lumbar spine to fake shoulder range.",
      "Shrugging shoulders into ears."
    ],
    propsUsageIt: "L'elastico fornisce una tensione elastica progressiva che apre i muscoli anteriori della spalla.",
    propsUsageEn: "The band delivers smooth accommodating tension to open anterior deltoids and pectorals."
  },
  {
    id: 'block_chest_and_shoulder_opener',
    name: 'Allungamento Pettorale da Prono con Mano su Blocco Yoga',
    nameEn: 'Prone Chest Stretch with Hand on Yoga Block',
    muscle: 'Spalle & Petto',
    muscleId: 'chest',
    level: 2,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=4x9L6z-0Q1A',
    youtubeQuery: 'prone chest stretch yoga block tutorial',
    tipsIt: [
      "Sdraiati a pancia in giù e posiziona un braccio disteso a 90° con la mano o avambraccio su un blocco yoga.",
      "Usa l'altra mano per ruotare delicatamente il corpo lateralmente, allungando il pettorale della spalla in appoggio.",
      "L'elevazione data dal blocco regala un allungamento profondo al gran pettorale e bicipite."
    ],
    tipsEn: [
      "Lie prone with one arm extended out at 90 degrees, resting hand or forearm on a yoga block.",
      "Use opposite hand to gently roll body away, opening chest and anterior shoulder.",
      "The block elevation creates deeper deficit stretch on the pectoral fibers."
    ],
    mistakesIt: [
      "Ruotare a scatti senza ascoltare la sensibilità articolare della spalla."
    ],
    mistakesEn: [
      "Rolling abruptly without respecting shoulder joint boundaries."
    ],
    propsUsageIt: "Il mattoncino solleva il braccio creando un angolo di allungamento in deficit che raggiunge le fibre più profonde del pettorale.",
    propsUsageEn: "The yoga block elevates the arm, creating a deficit angle that targets deep pectoralis minor fibers."
  },
  {
    id: 'worlds_greatest_stretch',
    name: "World's Greatest Stretch (Affondo + Torsione Toracica & Spalla)",
    nameEn: "World's Greatest Stretch (Lunge + Thoracic Rotation)",
    muscle: 'Full Body',
    muscleId: 'lower',
    level: 2,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=-CiHQ_JvUpE',
    youtubeQuery: 'worlds greatest stretch tutorial mobility form',
    tipsIt: [
      "Dalla posizione di affondo profondo, appoggia la mano interna a terra accanto al piede.",
      "Porta prima il gomito verso il pavimento all'interno della caviglia.",
      "Ruota poi il busto aprendo il braccio verso il soffitto e segui la mano con lo sguardo."
    ],
    tipsEn: [
      "From a deep runner's lunge, place inside hand on floor beside front foot.",
      "Drop inside elbow toward floor inside ankle to mobilize hip.",
      "Rotate ribcage open toward ceiling, extending arm overhead and following hand with gaze."
    ],
    mistakesIt: [
      "Lasciare collassare il ginocchio posteriore senza mantenerlo attivo e sollevato.",
      "Ruotare dal bacino anziché dalla cassa toracica."
    ],
    mistakesEn: [
      "Allowing back knee to collapse passively without leg engagement.",
      "Twisting from pelvis rather than thoracic spine."
    ]
  },
  {
    id: 'scorpion_stretch',
    name: 'Scorpion Stretch da Prono (Pettorale, Spalle & Flessori Anca)',
    nameEn: 'Prone Scorpion Stretch (Pecs, Spine & Hip)',
    muscle: 'Spalle & Petto',
    muscleId: 'chest',
    level: 2,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=3F8X9w4K2l8',
    youtubeQuery: 'scorpion stretch mobility tutorial',
    tipsIt: [
      "Sdraiati a pancia in giù con le braccia aperte a 'T' e i palmi a terra.",
      "Solleva una gamba, piega il ginocchio e falla ruotare oltre la schiena cercando il pavimento sul lato opposto.",
      "Mantieni il petto e la spalla del lato opposto saldamente a contatto col materassino."
    ],
    tipsEn: [
      "Lie face down with arms outstretched in a 'T' shape, palms down.",
      "Lift one leg, bend knee, and rotate it across your back towards opposite floor.",
      "Keep opposite chest and shoulder firmly anchored to the floor."
    ],
    mistakesIt: [
      "Staccare entrambe le spalle da terra perdendo l'allungamento pettorale.",
      "Scattare velocemente senza controllo del movimento."
    ],
    mistakesEn: [
      "Lifting both shoulders off floor, eliminating chest stretch.",
      "Jerking into rotation without controlled tempo."
    ]
  },

  // --- ADDOME, CORE & DECOMPRESSIONE (ABS & CORE) ---
  {
    id: 'sphinx_pose',
    name: 'Posizione della Sfinge (Sphinx Pose Decompressione Addome)',
    nameEn: 'Sphinx Pose (Gentle Abdominal & Lumbar Stretch)',
    muscle: 'Addome & Core',
    muscleId: 'abs',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=7X-l1Y2qQpI',
    youtubeQuery: 'sphinx pose yoga tutorial salamba bhujangasana',
    tipsIt: [
      "Sdraiati a pancia in giù con gli avambracci paralleli sul pavimento e gomiti sotto le spalle.",
      "Tira delicatamente i palmi indietro verso di te senza muoverli, aprendo il petto in avanti.",
      "Rilassa i glutei e respira lungo tutta la parete addominale distendendo la colonna."
    ],
    tipsEn: [
      "Lie prone on forearms with elbows stacked directly beneath shoulders.",
      "Isometrically pull palms back towards ribcage to glide chest through upper arms.",
      "Relax glutes and breathe deeply along abdominal wall, lengthening spine."
    ],
    mistakesIt: [
      "Incassare il collo tra le spalle; deprimi attivamente le scapole.",
      "Pizzicare la zona lombare."
    ],
    mistakesEn: [
      "Sagging into shoulders; actively press forearms to lift chest.",
      "Pinching in lower back."
    ]
  },
  {
    id: 'camel_pose_blocks',
    name: 'Posizione del Cammello con Blocchi Yoga dietro i Piedi (Ustrasana)',
    nameEn: 'Camel Pose with Yoga Blocks (Ustrasana Support)',
    muscle: 'Addome & Core',
    muscleId: 'abs',
    level: 2,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=gQ7hY-n6_Y4',
    youtubeQuery: 'camel pose with yoga blocks ustrasana tutorial',
    tipsIt: [
      "In ginocchio, posiziona due blocchi yoga in verticale accanto a ciascuna caviglia.",
      "Spingi il bacino in avanti mantenendo le cosce perpendicolari al pavimento.",
      "Appoggia le mani sui blocchi ed espandi il petto verso l'alto con respiro ampio."
    ],
    tipsEn: [
      "Kneel with two yoga blocks stood tall beside each ankle.",
      "Press hips forward, keeping thighs vertical and perpendicular to floor.",
      "Place hands onto blocks, lifting heart skyward with expansive inhalations."
    ],
    mistakesIt: [
      "Lasciare cadere il bacino all'indietro perdendo la spinta delle anche in avanti.",
      "Iperestendere il collo all'indietro se non hai controllo cervicale."
    ],
    mistakesEn: [
      "Letting hips sink backward away from vertical thigh alignment.",
      "Dropping head all the way back without neck support."
    ],
    propsUsageIt: "I blocchi alzano il punto d'appoggio di 20 cm, consentendo di eseguire il Cammello senza dover raggiungere i talloni.",
    propsUsageEn: "Blocks elevate hand support by 8-10 inches, making Camel Pose accessible without reaching heels."
  },
  {
    id: 'figure_four_stretch',
    name: 'Figure-Four Stretch a Terra (Allungamento Gluteo & Piriforme)',
    nameEn: 'Figure-Four Supine Glute & Piriformis Stretch',
    muscle: 'Gambe & Glutei',
    muscleId: 'lower',
    level: 1,
    equipment: 'Bodyweight',
    youtubeUrl: 'https://www.youtube.com/watch?v=B9Jk7f-9Z0Q',
    youtubeQuery: 'figure four stretch supine piriformis tutorial',
    tipsIt: [
      "Sdraiati sulla schiena con le ginocchia piegate.",
      "Incrocia la caviglia destra sopra il ginocchio sinistro formando un '4'.",
      "Afferra la parte posteriore della coscia sinistra e trazionala verso il petto respirando."
    ],
    tipsEn: [
      "Lie on back with knees bent and feet flat on floor.",
      "Cross right ankle over left thigh just below knee, forming a '4'.",
      "Clasp hands behind left hamstring, gently pulling thigh toward chest."
    ],
    mistakesIt: [
      "Sollevare la testa e le spalle dal pavimento (appoggia la testa su un cuscino se necessario).",
      "Piede non a martello."
    ],
    mistakesEn: [
      "Straining head/shoulders off floor (use a small pillow if neck strains).",
      "Leaving crossing foot limp instead of flexed."
    ]
  },
  {
    id: 'hero_pose_on_block',
    name: "Posizione dell'Eroe su Blocco Yoga (Virasana Decompressione Quadricipiti)",
    nameEn: 'Supported Hero Pose on Yoga Block (Virasana)',
    muscle: 'Gambe & Bacino',
    muscleId: 'lower',
    level: 1,
    equipment: 'Blocchi Yoga',
    youtubeUrl: 'https://www.youtube.com/watch?v=jK3M9z-Pq9w',
    youtubeQuery: 'hero pose virasana with block tutorial',
    tipsIt: [
      "In ginocchio, posiziona un blocco tra i piedi e siediti sopra di esso.",
      "I piedi sono rivolti dritti all'indietro ai lati del blocco.",
      "Mantieni la colonna eretta: allunga i quadricipiti e le caviglie senza dolore alle ginocchia."
    ],
    tipsEn: [
      "Kneel with feet slightly wider than hips, placing a block between heels.",
      "Sit back onto block with toes pointing straight back.",
      "Sit tall with neutral spine: gently stretches quadriceps and ankles without knee compression."
    ],
    mistakesIt: [
      "Sedere direttamente a terra con ginocchia doloranti; il blocco è fondamentale per proteggere i menischi."
    ],
    mistakesEn: [
      "Forcing seat to floor through knee pain; the block is essential for meniscal protection."
    ],
    propsUsageIt: "Il mattoncino riduce l'angolo di flessione acuto del ginocchio, permettendo di allungare caviglie e cosce in totale comfort.",
    propsUsageEn: "The block relieves deep knee flexion pressure, safely opening ankles and rectus femoris."
  }
];

// Helper to filter stretching exercises by compatibility and level
export const getStretchingExercisesForWorkout = (
  level: number,
  targetMuscles: string[],
  equipments: string[]
): StretchingExercise[] => {
  const isOnlyBodyweight = equipments.length === 1 && equipments[0] === 'Bodyweight';
  const hasBlocks = equipments.some(eq => eq.toLowerCase().includes('blocc') || eq.toLowerCase().includes('yoga'));
  const hasBands = equipments.some(eq => eq.toLowerCase().includes('elastico'));

  return STRETCHING_EXERCISES.filter(ex => {
    // Equipment filter
    if (isOnlyBodyweight && ex.equipment !== 'Bodyweight') return false;
    if (ex.equipment === 'Blocchi Yoga' && !hasBlocks && !isOnlyBodyweight) return false;
    if ((ex.equipment === 'Elastico Circolare' || ex.equipment === 'Elastico Tubolare') && !hasBands && !isOnlyBodyweight) return false;

    // Muscle filter if specified
    if (targetMuscles.length > 0 && targetMuscles.length < 7) {
      if (!targetMuscles.includes(ex.muscleId)) return false;
    }

    // Level filter tolerance (match level or +/- 1)
    return Math.abs(ex.level - level) <= 1;
  });
};
