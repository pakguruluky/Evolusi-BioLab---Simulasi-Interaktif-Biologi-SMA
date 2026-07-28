import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

export const KuisPanel: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 10;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
  };

  const isCurrentAnswered = selectedAnswers[currentQ.id] !== undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Evaluasi Pemahaman
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-400" /> Kuis Diagnostik Evolusi SMA
            </h2>
            <p className="text-xs text-slate-400">
              10 soal pilihan ganda standar UTBK / US Biologi SMA untuk mengukur tingkat penguasaan konsep Anda.
            </p>
          </div>

          {!showResults && (
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 text-xs font-bold text-slate-200">
              <span>Soal {currentIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!showResults && (
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Quiz Body */}
        {!showResults ? (
          <div className="space-y-6 pt-2">
            {/* Question Box */}
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-sky-400 border border-slate-700">
                Topik: {currentQ.topic}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                {currentQ.id}. {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs font-medium transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-700/60 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold shrink-0">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isSelected && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-700 pt-4">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Sebelumnya
              </button>

              {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  disabled={!isCurrentAnswered}
                  onClick={() => setCurrentIdx((prev) => prev + 1)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                  onClick={() => setShowResults(true)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg"
                >
                  <Award className="w-4 h-4" />
                  <span>Selesaikan & Lihat Nilai</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Score & Explanations View */
          <div className="space-y-6 pt-2">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center space-y-3">
              <Award className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-100">Hasil Kuis Diagnostik Anda</h3>
              <div className="text-4xl font-black text-emerald-400">{calculateScore()} / 100</div>
              <p className="text-xs text-slate-400">
                {calculateScore() >= 80
                  ? 'Luar biasa! Pemahaman Anda mengenai konsep dan perhitungan evolusi sangat matang.'
                  : calculateScore() >= 60
                  ? 'Bagus! Anda telah memahami sebagian besar konsep dasar evolusi.'
                  : 'Tetap semangat! Pelajari kembali materi pembelajaran dan ulangi simulasi.'}
              </p>
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-4 py-2 rounded-lg text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" /> Ulangi Kuis
              </button>
            </div>

            {/* Detailed Answer Review */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-200">Pembahasan Detail Setiap Soal:</h4>
              {QUIZ_QUESTIONS.map((q) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold text-slate-100">
                          {q.id}. {q.question}
                        </p>
                        <p className="text-slate-400 mt-1">
                          Jawaban Anda: <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{q.options[userAns]}</span>
                        </p>
                        {!isCorrect && (
                          <p className="text-emerald-400 font-bold mt-0.5">
                            Jawaban Benar: {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-[11px] text-slate-300">
                      <strong>Pembahasan:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
