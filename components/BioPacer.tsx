"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Play, Volume2, VolumeX, Wind } from "lucide-react";
import { audioEngine } from "./audioEngine";
import { Content } from "./content";

interface BioPacerProps {
  t: Content;
}

export default function BioPacer({ t }: BioPacerProps) {
  const [presetId, setPresetId] = useState(t.pacer.presets[0].id);
  const preset = useMemo(
    () => t.pacer.presets.find((p) => p.id === presetId) ?? t.pacer.presets[0],
    [presetId, t.pacer.presets]
  );

  const phases = useMemo(
    () => [
      { name: t.pacer.inhale, sub: t.pacer.inhaleSub, duration: preset.inhale, isDrone: false },
      { name: t.pacer.hold, sub: t.pacer.holdSub, duration: preset.hold, isDrone: false },
      { name: t.pacer.exhale, sub: t.pacer.exhaleSub, duration: preset.exhale, isDrone: true },
      { name: t.pacer.rest, sub: t.pacer.restSub, duration: preset.rest, isDrone: false },
    ],
    [preset, t.pacer]
  );

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [counter, setCounter] = useState(phases[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentPhase = phases[phaseIndex];
  const phaseIndexRef = useRef(0);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (!isActive) return undefined;
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev > 1) return prev - 1;
        const nextIndex = (phaseIndexRef.current + 1) % phases.length;
        phaseIndexRef.current = nextIndex;
        setPhaseIndex(nextIndex);
        if (phases[nextIndex].isDrone && soundEnabledRef.current) {
          audioEngine.playDrone();
        } else {
          audioEngine.stopDrone();
        }
        return phases[nextIndex].duration;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, phases]);

  const resetSequence = (durationSec: number) => {
    phaseIndexRef.current = 0;
    setPhaseIndex(0);
    setCounter(durationSec);
  };

  const toggleActive = () => {
    if (isActive) {
      setIsActive(false);
      audioEngine.stopDrone();
      resetSequence(preset.inhale);
    } else {
      setIsActive(true);
    }
  };

  const selectPreset = (id: string, inhaleDuration: number) => {
    setIsActive(false);
    audioEngine.stopDrone();
    setPresetId(id);
    resetSequence(inhaleDuration);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      audioEngine.stopDrone();
      setSoundEnabled(false);
    } else {
      setSoundEnabled(true);
      if (isActive && currentPhase.isDrone) {
        audioEngine.playDrone();
      }
    }
  };

  return (
    <section id="bio-pacer" className="py-20 bg-gradient-to-b from-[#FAF8F5] to-[#F3EDE2] border-y border-amber-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-amber-900/15 bg-white/85 backdrop-blur-lg p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-600/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900">
                <Wind className="h-3.5 w-3.5 text-amber-700" />
                {t.pacer.tag}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1B18] font-normal leading-tight">{t.pacer.title}</h2>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{t.pacer.desc}</p>

              <div className="space-y-3 pt-2">
                {t.pacer.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-900 font-bold text-xs">
                      {st.num}
                    </div>
                    <span>{st.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {t.pacer.presets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectPreset(p.id, p.inhale)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
                      presetId === p.id
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-stone-700 border-stone-300 hover:border-amber-400"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={toggleActive}
                  className={`inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all shadow-lg active:scale-95 ${
                    isActive
                      ? "bg-stone-900 text-amber-100 hover:bg-stone-800"
                      : "bg-gradient-to-r from-[#D97706] to-[#B45309] text-white hover:brightness-110 shadow-amber-900/20"
                  }`}
                >
                  {isActive ? (
                    <>
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span>{t.pacer.btnPause}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-white text-white" />
                      <span>{t.pacer.btnStart}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={toggleSound}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition shadow-sm"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="h-4 w-4 text-amber-600" />
                      <span>{t.pacer.audioActive}</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-4 w-4 text-stone-400" />
                      <span>{t.pacer.audioMuted}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-center justify-center py-6">
              <div className="relative flex h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 items-center justify-center">
                <motion.div
                  animate={{
                    scale: isActive
                      ? phaseIndex === 0
                        ? [1, 1.35]
                        : phaseIndex === 1
                        ? 1.35
                        : phaseIndex === 2
                        ? [1.35, 0.95]
                        : 0.95
                      : 1,
                    opacity: isActive ? [0.4, 0.8, 0.5] : 0.3,
                  }}
                  transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E58A13]/30 via-[#F59E0B]/35 to-yellow-200/25 blur-2xl"
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-5 rounded-full border-2 border-dashed border-amber-600/35 flex items-center justify-center"
                >
                  <div className="h-full w-full rounded-full border border-dotted border-amber-400/40" />
                </motion.div>

                <motion.div
                  animate={{
                    scale: isActive ? (phaseIndex === 0 ? 1.25 : phaseIndex === 1 ? 1.25 : 0.84) : 1,
                  }}
                  transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
                  className="relative z-10 flex h-48 w-48 sm:h-56 sm:w-56 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#E58A13] via-[#D97706] to-[#92400E] text-white shadow-2xl text-center p-6"
                >
                  <span className="font-serif text-5xl sm:text-6xl font-light tracking-tight text-white drop-shadow-md">{counter}s</span>
                  <span className="mt-2 text-xs font-bold uppercase tracking-wider text-amber-200">{currentPhase.name}</span>
                  <span className="mt-1 text-[11px] text-amber-100 font-serif italic max-w-[160px] leading-tight">{currentPhase.sub}</span>
                </motion.div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-stone-500">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                <span>{t.pacer.recommended}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-amber-900/10">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">{t.pacer.videoCaption}</p>
            <video
              controls
              muted
              playsInline
              preload="metadata"
              className="w-full max-w-2xl mx-auto rounded-2xl border border-amber-900/10 shadow-lg"
              src="/videos/breathing-guide.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
