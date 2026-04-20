/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, ChevronRight, RotateCcw, User, Info, ExternalLink } from 'lucide-react';
import { ALBUMS, QUESTIONS } from './constants';
import { Album } from './types';
import { TableauEmbed } from './components/TableauEmbed';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'professional' | 'scratch'>('quiz');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (albumWeights: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(albumWeights).forEach(([albumId, weight]) => {
      newScores[albumId] = (newScores[albumId] || 0) + weight;
    });
    setScores(newScores);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resultAlbum = useMemo(() => {
    if (!showResult) return null;
    let maxScore = -1;
    let winnerId = ALBUMS[0].id;

    Object.entries(scores).forEach(([id, score]) => {
      const currentScore = score as number;
      if (currentScore > maxScore) {
        maxScore = currentScore;
        winnerId = id;
      }
    });

    return ALBUMS.find(a => a.id === winnerId) || ALBUMS[0];
  }, [showResult, scores]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({});
    setShowResult(false);
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen vibe-container font-sans selection:bg-orange-200/50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 bg-gradient-to-b from-[#fdfbf7]/90 to-transparent backdrop-blur-sm">
        <div className="flex gap-8 items-center bg-white shadow-lg border border-orange-100 px-8 py-4 rounded-3xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`text-xs uppercase tracking-[0.2em] font-bold transition-all ${
              activeTab === 'quiz' ? 'text-orange-700' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            The Quiz
          </button>
          <div className="w-px h-4 bg-orange-100" />
          <button
            onClick={() => setActiveTab('professional')}
            className={`text-xs uppercase tracking-[0.2em] font-bold transition-all ${
              activeTab === 'professional' ? 'text-orange-700' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Professional
          </button>
          <div className="w-px h-4 bg-orange-100" />
          <button
            onClick={() => setActiveTab('scratch')}
            className={`text-xs uppercase tracking-[0.2em] font-bold transition-all ${
              activeTab === 'scratch' ? 'text-orange-700' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Scratch Page
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'quiz' ? (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="min-h-[70vh] flex flex-col items-center justify-center py-20"
            >
              {!quizStarted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center max-w-2xl px-8 py-16 vibe-card shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-orange-700" />
                  <Music className="w-16 h-16 text-orange-700 mx-auto mb-8 opacity-20 group-hover:scale-110 transition-transform" />
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 tracking-tight">
                    Music Persona Quiz
                  </h1>
                  <p className="text-xl text-stone-600 mb-12 font-medium leading-relaxed italic">
                    "Are you the raw energy of a 90s grunge anthem or the meticulous layers of a 60s masterpiece? Answer 10 questions about your college life to discover which 'Top 50' Album and Song defines your soul."
                  </p>
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="group relative px-12 py-5 rounded-full bg-orange-700 text-white font-bold transition-all shadow-xl hover:shadow-orange-900/40 hover:-translate-y-1 active:scale-95"
                  >
                    <span className="flex items-center gap-3">
                      Start Your Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </motion.div>
              ) : !showResult ? (
                <div className="w-full max-w-2xl">
                  {/* Progress */}
                  <div className="mb-12 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">
                      Question {currentQuestionIndex + 1} / {QUESTIONS.length}
                    </span>
                    <div className="flex gap-2">
                      {QUESTIONS.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-10 rounded-full transition-all duration-500 ${
                            i <= currentQuestionIndex ? 'bg-orange-600' : 'bg-orange-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <h2 className="text-3xl md:text-5xl font-serif text-stone-800 tracking-tight leading-tight mb-12">
                        {QUESTIONS[currentQuestionIndex].text}
                      </h2>

                      <div className="grid gap-4">
                        {QUESTIONS[currentQuestionIndex].answers.map((answer, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(answer.albumWeights)}
                            className="group relative flex items-center justify-between p-6 rounded-3xl bg-white border-2 border-orange-50 hover:bg-orange-50 hover:border-orange-200 transition-all text-left shadow-sm hover:shadow-md"
                          >
                            <span className="text-lg font-medium text-stone-700 group-hover:text-orange-800 transition-colors">
                              {answer.text}
                            </span>
                            <ChevronRight className="w-5 h-5 text-orange-200 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-3xl text-center"
                >
                  <div className="bg-orange-900 p-10 md:p-16 rounded-[3rem] shadow-2xl text-white mb-16 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-800 rounded-full blur-3xl opacity-50 group-hover:bg-orange-700 transition-colors duration-1000" />
                    
                    <span className="text-xs uppercase tracking-[0.4em] text-orange-300 font-bold mb-6 block relative z-10">
                      Your Result
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-4 text-white relative z-10 leading-tight">
                      Your album is <span className="italic text-orange-300 underline decoration-orange-500 underline-offset-8">{resultAlbum?.title}</span>
                    </h2>
                    <p className="text-xl text-orange-200 font-bold mb-10 relative z-10 font-serif">by {resultAlbum?.artist}</p>
                    
                    <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                      <p className="text-xs uppercase tracking-[0.3em] text-orange-400 font-bold mb-3">Spirit Song</p>
                      <p className="text-3xl font-serif italic text-orange-50 text-glow-sm">"{resultAlbum?.songTitle}"</p>
                      <p className="text-lg text-orange-200 mt-2 font-serif font-bold">by {resultAlbum?.songArtist}</p>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-left"
                    >
                      <p className="text-xl font-serif italic leading-relaxed text-stone-700 mb-12 border-l-4 border-orange-600 pl-8">
                        {resultAlbum?.description}
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={resetQuiz}
                          className="flex items-center gap-3 px-12 py-5 rounded-[2rem] bg-orange-700 text-white font-bold hover:bg-orange-800 transition-all shadow-xl shadow-orange-900/20 active:scale-95"
                        >
                          <RotateCcw className="w-5 h-5" />
                          Take it again
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : activeTab === 'professional' ? (
            <motion.div
              key="professional-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12"
            >
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                  <div className="sticky top-32">
                    <div className="w-40 h-40 rounded-[3rem] bg-orange-50 border-4 border-white mb-6 overflow-hidden shadow-2xl ring-1 ring-orange-100">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1o7ytS6sOnv1KZEzNZNu-Mg1Vhvcqmb11" 
                        alt="Hope Mendenhall"
                        className="w-full h-full object-cover object-top filter sepia-[0.1] contrast-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h1 className="text-4xl font-serif font-bold tracking-tight mb-2 text-stone-900">Hope Mendenhall</h1>
                    <p className="text-orange-700 text-xs uppercase tracking-[0.2em] font-bold mb-8">Experience Design & Management</p>
                    
                    <div className="space-y-4">
                      <a href="mailto:hopemendi@gmail.com" className="flex items-center gap-3 text-stone-600 hover:text-orange-700 transition-colors text-sm font-medium">
                        hopemendi@gmail.com
                      </a>
                      <div className="flex gap-6 pt-6 border-t border-orange-100">
                        <a 
                          href="https://www.linkedin.com/in/hope-mendenhall-3a0555394" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-orange-700 transition-colors text-sm underline decoration-orange-200 underline-offset-8 font-bold"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-20">
                  {/* Education */}
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-10 flex items-center gap-6">
                      <span className="w-12 h-px bg-orange-200" /> Education
                    </h3>
                    <div className="space-y-8">
                      <div className="vibe-card p-10">
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-2xl font-serif font-bold text-stone-800">Brigham Young University – Marriott School of Business</p>
                          <span className="text-sm font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full">2023 - 2026</span>
                        </div>
                        <p className="text-stone-600 font-medium text-lg leading-relaxed">Bachelors Degree • Provo, UT</p>
                        <p className="text-stone-400 text-sm mt-4 italic font-serif">Pre-Business: Experience Design and Management • GPA: 3.52</p>
                      </div>
                    </div>
                  </section>

                  {/* Experience */}
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-10 flex items-center gap-6">
                      <span className="w-12 h-px bg-orange-200" /> Professional Experience
                    </h3>
                    <div className="space-y-12 pl-6">
                      <div className="relative pl-12 border-l-2 border-orange-100 pb-12">
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-orange-600 border-4 border-white shadow-lg" />
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-[22px] font-serif font-bold text-stone-800">Brigham Young University</p>
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Jan 2026 - Present</span>
                        </div>
                        <p className="text-orange-700 font-bold text-sm mb-6 flex items-center gap-2">
                          <span className="w-4 h-px bg-orange-200" /> Teaching Assistant (TA) • Provo, UT
                        </p>
                        <ul className="text-stone-600 text-[15px] leading-relaxed list-disc space-y-4 pl-6 font-medium">
                          <li>Facilitate review sessions for 200 students, simplifying complex concepts in Experience Design and Business Management.</li>
                          <li>Coordinated logistics for off-site student activities and networking mixers, creating engaging experiences.</li>
                        </ul>
                      </div>

                      <div className="relative pl-12 border-l-2 border-orange-100">
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-stone-300 border-4 border-white" />
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-[22px] font-serif font-bold text-stone-800">GreenHollow Catering</p>
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">2022 - 2025</span>
                        </div>
                        <p className="text-orange-700 font-bold text-sm mb-6 flex items-center gap-2">
                          <span className="w-4 h-px bg-orange-200" /> Event Catering Assistant • Orem, UT
                        </p>
                        <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
                          Handled event setup, service, and breakdown for events serving up to 400 guests, ensuring customer satisfaction and efficiency.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Internships */}
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-10 flex items-center gap-6">
                      <span className="w-12 h-px bg-orange-200" /> Internships
                    </h3>
                    <div className="grid gap-10">
                      {[
                        {
                          org: "Skep Foundation (KodAfriq)",
                          role: "LinkedIn Strategy & Fundraising Lead",
                          loc: "Provo, UT",
                          date: "2026 - Present",
                          bullets: [
                            "Developed a comprehensive LinkedIn networking manual for all new and certified hires to standardize professional branding.",
                            "Directed end-to-end planning of an organizational fundraising initiative to raise $5,135."
                          ]
                        },
                        {
                          org: "Rising Star Outreach",
                          role: "Marketing & Recruitment Intern",
                          loc: "Provo, UT",
                          date: "2025 - Present",
                          bullets: [
                            "Created eye-catching digital and print fliers using Canva to promote Youth Ambassador Program events.",
                            "Co-spearheading a volunteer recruitment rebranding campaign."
                          ]
                        },
                        {
                          org: "Okland Construction",
                          role: "Corporate Events & Admin Intern",
                          loc: "Salt Lake City, UT",
                          date: "2025",
                          bullets: [
                            "Collaborated in preparing and supervising Food and Activities for Corporate Events.",
                            "Utilized Excel and other Microsoft Office Suite functions to store administrative information."
                          ]
                        }
                      ].map((intern, i) => (
                        <div key={i} className="vibe-card p-10 border-l-8 border-l-orange-700">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-xl font-serif font-bold text-stone-800">{intern.org}</p>
                            <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-1 rounded-md">{intern.date}</span>
                          </div>
                          <p className="text-stone-500 text-sm font-bold mb-6 italic">{intern.role} • {intern.loc}</p>
                          <ul className="text-stone-600 text-sm leading-relaxed list-disc space-y-3 pl-6">
                            {intern.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Volunteer */}
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-10 flex items-center gap-6">
                      <span className="w-12 h-px bg-orange-200" /> Volunteer Experience
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-10 rounded-[3rem] bg-[#f4efdf] border-2 border-[#e5e5d1]">
                        <p className="text-stone-800 text-lg mb-3 font-serif font-bold">Full-time Missionary</p>
                        <p className="text-orange-700 text-[10px] uppercase tracking-widest font-bold mb-6">Taipei, Taiwan</p>
                        <p className="text-stone-600 text-sm italic leading-relaxed">Served as a full-time representative for the Church of Jesus Christ of Latter-day Saints.</p>
                      </div>
                      <div className="p-10 rounded-[3rem] bg-[#f4efdf] border-2 border-[#e5e5d1]">
                        <p className="text-stone-800 text-lg mb-3 font-serif font-bold">Elementary School Teacher</p>
                        <p className="text-orange-700 text-[10px] uppercase tracking-widest font-bold mb-6">Kullu, India</p>
                        <p className="text-stone-600 text-sm leading-relaxed">Provided English instruction and cultural exchange opportunities with ILP.</p>
                      </div>
                    </div>
                  </section>

                  {/* Skills */}
                  <section>
                    <h3 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-10 flex items-center gap-6">
                      <span className="w-12 h-px bg-orange-200" /> Skills
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {[
                        'Interpersonal Skills', 'Experience Design', 'Microsoft Office Suite', 
                        'Word', 'PowerPoint', 'Excel', 'CAD', 'Event Management'
                      ].map(skill => (
                        <span key={skill} className="px-6 py-3 rounded-2xl bg-white border-2 border-orange-100 text-[13px] font-bold text-stone-700 shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scratch-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 scratch-container-style"
              id="scratch-top"
            >
              <div className="scratch-box-style mb-16">
                <h1 className="text-5xl font-serif font-bold mb-10 scratch-header-style leading-tight !text-orange-700 italic">The Soundtrack of Hope</h1>
                
                <p className="text-xl scratch-container-style mb-12 font-medium">
                  I've always loved music, and the emotions and stories that we are able to share through it. Here is a list of my favorite albums and a little bit about each one.
                </p>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                  <ol className="space-y-12 list-none">
                    <li className="space-y-6">
                      <h2 className="text-2xl font-serif font-bold scratch-header-style border-b-2 border-orange-100 pb-4">1. ABBA Gold by ABBA</h2>
                      <ul className="list-disc pl-5 space-y-3 text-stone-600 font-medium">
                        <li className="italic">A definitive compilation album featuring "Dancing Queen," "Mamma Mia," and "Take a Chance on Me."</li>
                        <li className="text-stone-500 text-sm italic-none">One of the best-selling albums worldwide, capturing the essence of the group's massive success.</li>
                      </ul>
                    </li>

                    <li className="space-y-6">
                      <h2 className="text-2xl font-serif font-bold scratch-header-style border-b-2 border-orange-100 pb-4">2. Rumours by Fleetwood Mac</h2>
                      <ul className="list-disc pl-5 space-y-3 text-stone-600 font-medium">
                        <li className="italic">Another one of the best-selling albums of all time, known for its intricate production.</li>
                        <li className="text-stone-500 text-sm italic-none">Features classic hits like "Go Your Own Way," "Dreams," and "The Chain."</li>
                      </ul>
                    </li>

                    <li className="space-y-6">
                      <h2 className="text-2xl font-serif font-bold scratch-header-style border-b-2 border-orange-100 pb-4">3. THIS MUSIC MAY CONTAIN HOPE. by Raye</h2>
                      <ul className="list-disc pl-5 space-y-3 text-stone-600 font-medium">
                        <li className="italic">Known for its raw, personal storytelling and Raye's powerful vocals.</li>
                      </ul>
                    </li>

                    <li className="space-y-6">
                      <h2 className="text-2xl font-serif font-bold scratch-header-style border-b-2 border-orange-100 pb-4">4. The Art of Loving by Olivia Dean</h2>
                      <ul className="list-disc pl-5 space-y-3 text-stone-600 font-medium text-base">
                        <li className="italic">Following the album's release, Olivia Dean became the first British female solo artist to top the UK Albums and Singles charts simultaneously (with the single "Man I Need") since Adele achieved the feat in 2021.</li>
                        <li className="text-stone-500 text-sm">A lush, self-assured blend of modern soul and "modern vintage" warmth that feels like a grounded, sun-drenched exhale.</li>
                      </ul>
                    </li>

                    <li className="space-y-6">
                      <h2 className="text-2xl font-serif font-bold scratch-header-style border-b-2 border-orange-100 pb-4">5. If You Can Believe Your Eyes and Ears by The Mamas & The Papas</h2>
                      <ul className="list-disc pl-5 space-y-3 text-stone-600 font-medium text-base">
                        <li className="italic">The debut studio album featuring the iconic hit "California Dreamin'."</li>
                        <li className="text-stone-500 text-sm">Renowned for its sophisticated vocal harmonies and defining the 1960s folk-pop sound.</li>
                      </ul>
                    </li>
                  </ol>

                  <div className="relative group">
                    <div className="rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl ring-1 ring-orange-100 h-[500px] bg-stone-100">
                      <div className="h-full overflow-y-auto scrollbar-hide snap-y snap-mandatory cursor-ns-resize">
                        {[
                          "1o6X5Meat1SZAUlRNfLF4qHDGwjZpI4aP",
                          "1TYLwrojRfGLOVi7Ye_LadRwq3GLV7jol",
                          "1ZT0cXgE8eDZX0Hp3xrpxxdkFxa6YNxs9",
                          "1ot53Nd-e2MXuHlu6mqYfSdU3whRsHzsE",
                          "1sasbND3gqY4JFTQ5pJDmYQcdrcBqB-a_"
                        ].map((id, index) => (
                          <div key={id} className="h-full w-full snap-start relative flex-shrink-0">
                            <img 
                              src={`https://lh3.googleusercontent.com/d/${id}`} 
                              alt={`Gallery item ${index + 1}`} 
                              className="w-full h-full object-cover filter sepia-[0.15] brightness-[0.98] transition-all duration-700 group-hover:sepia-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-orange-800 opacity-0 group-hover:opacity-100 transition-opacity">
                              Photo {index + 1} / 5 • Scroll to explore
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Retro decorative elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700" />
                    
                    <div className="mt-6 flex justify-center">
                      <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                        <div className="animate-bounce">
                          <svg className="w-4 h-4 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-600">scroll pictures to see more</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-16 mt-16">
                  <section>
                    <h2 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-10 flex items-center gap-6">
                      <span className="w-12 h-px bg-orange-200" /> Inspiration
                    </h2>
                    <div className="aspect-video rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl ring-1 ring-orange-100">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/Sj_9CiNkkn4" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-10 flex items-center gap-6">
                      <span className="w-12 h-px bg-orange-200" /> Data Visualization (Tableau)
                    </h2>
                    <div className="bg-white rounded-[4rem] p-10 shadow-2xl border-2 border-orange-50 min-h-[700px]">
                      <TableauEmbed />
                    </div>
                  </section>
                </div>

                <div className="mt-20 flex flex-col items-center gap-8 pt-16 border-t-4 border-orange-50">
                  <button 
                    onClick={() => setActiveTab('professional')}
                    className="group relative px-12 py-5 rounded-full bg-orange-700 text-white font-bold transition-all shadow-xl hover:shadow-orange-900/30 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      View Professional Experience <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <a href="#scratch-top" className="text-xs uppercase tracking-[0.4em] font-bold text-stone-300 hover:text-orange-700 transition-colors">
                    Back to top
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="py-20 px-6 border-t-8 border-orange-50 bg-[#f4efdf]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-xs uppercase tracking-[0.3em] font-bold text-stone-400">
          <p>© 2026 Album Persona Quiz • Crafted with Care</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-orange-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-700 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-700 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
