import {
  Code,
  Flask,
  Stamp,
  Tooth,
  Pill,
  FirstAidKit,
  Stethoscope,
  HardHat,
  Motorcycle,
} from "@phosphor-icons/react";

export const PROFESSIONS = {
  softwareDeveloper: { label: "Software Developer", icon: Code },
  scientist: { label: "Scientist", icon: Flask },
  civilServant: { label: "Civil Servant", icon: Stamp },
  dentist: { label: "Dentist", icon: Tooth },
  pharmacist: { label: "Pharmacist", icon: Pill },
  nurse: { label: "Nurse", icon: FirstAidKit },
  doctor: { label: "Doctor", icon: Stethoscope },
  civilEngineer: { label: "Civil Engineer", icon: HardHat },
  rider: { label: "Rider", icon: Motorcycle },
} as const;

export type ProfessionKey = keyof typeof PROFESSIONS;
