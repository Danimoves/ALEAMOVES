export interface RoutineExercise {
  name: string;
  durationOrReps: string;
  instruction: string;
}

export interface RoutineBlock {
  title: string;
  durationMinutes: number;
  description: string;
  exercises: RoutineExercise[];
}

export const getWarmupRoutine = (
  level: number,
  equipments: string[],
  lang: 'it' | 'en' = 'it'
): RoutineBlock => {
  const isIt = lang === 'it';
  const isOnlyBodyweight = equipments.length === 1 && equipments[0] === 'Bodyweight';

  if (isIt) {
    if (isOnlyBodyweight || level === 1) {
      return {
        title: "Riscaldamento Dinamico e Mobilità a Corpo Libero",
        durationMinutes: 4,
        description: "Attivazione cardiocircolatoria e mobilità articolare completa a corpo libero.",
        exercises: [
          {
            name: "Circonduzioni Braccia & Aperture Toraciche",
            durationOrReps: "45 secondi",
            instruction: "Esegui rotazioni ampie in avanti e indietro, aprendo bene il petto ed espirando."
          },
          {
            name: "Rotazioni del Bacino & Hip Openers",
            durationOrReps: "45 secondi",
            instruction: "Solleva il ginocchio ed esegui cerchi ampi verso l'esterno per sbloccare le anche."
          },
          {
            name: "Inchworm con Allungamento a Terra",
            durationOrReps: "50 secondi",
            instruction: "Dalla stazione eretta, cammina con le mani in avanti fino alla plank e ritorna lentamente."
          },
          {
            name: "Marcia a Ginocchia Alte / Jumping Jacks Leggeri",
            durationOrReps: "60 secondi",
            instruction: "Aumenta gradualmente la frequenza cardiaca mantenendo il core saldo e respiro regolare."
          }
        ]
      };
    }

    return {
      title: "Riscaldamento Dinamico & Attivazione Funzionale",
      durationMinutes: 5,
      description: "Preparazione muscolare e neuromuscolare intensiva per allenamenti con attrezzi.",
      exercises: [
        {
          name: "World's Greatest Stretch (Affondo + Torsione Toracica)",
          durationOrReps: "60 secondi",
          instruction: "Affondo profondo con mano a terra e torsione del busto verso l'alto alternando i lati."
        },
        {
          name: "Cat-Cow Dinamico & Bird Dog a Terra",
          durationOrReps: "60 secondi",
          instruction: "Alterna flessione ed estensione della colonna, poi distendi braccio e gamba opposta."
        },
        {
          name: "Squat a Corpo Libero con Pausa & Bootstrapper",
          durationOrReps: "60 secondi",
          instruction: "Squat profondo con gomiti all'interno delle ginocchia, stendi le gambe afferrando le punte."
        },
        {
          name: "Skip Alto & Jumping Jacks Dinamici",
          durationOrReps: "60 secondi",
          instruction: "Attivazione cardiaca rapida per preparare il sistema cardiovascolare allo sforzo."
        }
      ]
    };
  } else {
    // English
    if (isOnlyBodyweight || level === 1) {
      return {
        title: "Dynamic Warm-Up & Bodyweight Mobility",
        durationMinutes: 4,
        description: "Cardiovascular warm-up and full body joint mobility without equipment.",
        exercises: [
          {
            name: "Arm Circles & Chest Openers",
            durationOrReps: "45 seconds",
            instruction: "Large fluid forward and backward circles, expanding the chest with controlled breathing."
          },
          {
            name: "Hip Openers & Pelvic Circles",
            durationOrReps: "45 seconds",
            instruction: "Lift each knee and rotate outward in smooth circles to mobilize hips."
          },
          {
            name: "Inchworm to Plank Walkout",
            durationOrReps: "50 seconds",
            instruction: "Hinge at hips, walk hands forward into a solid plank, then walk back up."
          },
          {
            name: "High Knees March / Light Jumping Jacks",
            durationOrReps: "60 seconds",
            instruction: "Gradually elevate heart rate while keeping core engaged and breathing rhythm steady."
          }
        ]
      };
    }

    return {
      title: "Dynamic Warm-Up & Functional Activation",
      durationMinutes: 5,
      description: "Neuromuscular activation and mobility for functional workout circuits.",
      exercises: [
        {
          name: "World's Greatest Stretch",
          durationOrReps: "60 seconds",
          instruction: "Deep lunge with hand on the floor, rotate chest toward the ceiling alternating sides."
        },
        {
          name: "Dynamic Cat-Cow & Bird Dog",
          durationOrReps: "60 seconds",
          instruction: "Flex and extend spine in quadruped, then extend opposite arm and leg for core stability."
        },
        {
          name: "Deep Bodyweight Squat to Bootstrapper",
          durationOrReps: "60 seconds",
          instruction: "Descend into a deep squat, hold toes, extend hamstrings and return smoothly."
        },
        {
          name: "High Knees & Fast Tempo Jacks",
          durationOrReps: "60 seconds",
          instruction: "Quick cardio pulse to elevate core temperature and prime muscles for exertion."
        }
      ]
    };
  }
};

export const getCooldownRoutine = (
  level: number,
  equipments: string[],
  lang: 'it' | 'en' = 'it'
): RoutineBlock => {
  const isIt = lang === 'it';

  if (isIt) {
    return {
      title: "Defaticamento, Decompressione & Allungamento Globale",
      durationMinutes: 4,
      description: "Normalizza il battito cardiaco, allunga i principali gruppi muscolari e scioglie le tensioni.",
      exercises: [
        {
          name: "Child's Pose (Posizione del Bambino) & Allungamento Dorsali",
          durationOrReps: "60 secondi",
          instruction: "Ginocchia divaricate, siediti sui talloni e distendi le braccia in avanti respirando profondamente."
        },
        {
          name: "Cobra Stretch & Decompressione Addome/Spalle",
          durationOrReps: "50 secondi",
          instruction: "Disteso a pancia in giù, spingi con i palmi sollevando delicatamente il petto senza inarcare la zona lombare."
        },
        {
          name: "Allungamento Flessori dell'Anca (Kneeling Hip Flexor)",
          durationOrReps: "60 secondi (30s per lato)",
          instruction: "In ginocchio, porta un piede avanti e spingi il bacino dolcemente in avanti mantenendo il busto eretto."
        },
        {
          name: "Allungamento Ischiocrurali & Piegamento in Avanti (Forward Fold)",
          durationOrReps: "60 secondi",
          instruction: "In piedi o seduto, fletti il busto verso le gambe rilasciando collo, spalle e zona lombare."
        }
      ]
    };
  } else {
    return {
      title: "Cool-Down, Spinal Decompression & Full Body Stretch",
      durationMinutes: 4,
      description: "Brings heart rate down, restores muscle length, and relieves workout tension.",
      exercises: [
        {
          name: "Child's Pose & Latissimus Stretch",
          durationOrReps: "60 seconds",
          instruction: "Knees wide, sit back on heels, reach arms far forward and take deep diaphragmatic breaths."
        },
        {
          name: "Cobra / Sphinx Abdominal & Chest Stretch",
          durationOrReps: "50 seconds",
          instruction: "Prone on mat, press palms down gently lifting the chest while keeping glutes relaxed."
        },
        {
          name: "Half-Kneeling Hip Flexor & Quad Stretch",
          durationOrReps: "60 seconds (30s each side)",
          instruction: "Step forward in a low half-kneel, tuck pelvis gently and push hips forward with tall posture."
        },
        {
          name: "Standing / Seated Forward Fold (Hamstring & Back Release)",
          durationOrReps: "60 seconds",
          instruction: "Hinge at the hips, let head and shoulders hang heavily to decompress hamstrings and spine."
        }
      ]
    };
  }
};
