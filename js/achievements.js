import {progress,save} from './store.js';
import {modules} from '../data/modules.js';
import {questions} from '../data/questions.js';
import {flashcards} from '../data/flashcards.js';
export const badges=[
{id:'first',icon:'🌱',title:'Primeiros Passos',desc:'Concluir a primeira aula.',check:p=>p.completedLessons.length>=1},
{id:'foundations',icon:'🧩',title:'Explorador Molecular',desc:'Concluir todo o módulo de fundamentos.',check:p=>modules[0].lessons.every((_,i)=>p.completedLessons.includes('fundamentos/'+i))},
{id:'ph',icon:'💧',title:'Mestre do pH',desc:'Concluir desafio do laboratório de água.',check:p=>p.labChallenges.includes('agua')},
{id:'indicator',icon:'🌈',title:'Arco-Íris Químico',desc:'Concluir desafio de indicadores.',check:p=>p.labChallenges.includes('indicadores')},
{id:'buffer',icon:'🛡',title:'Guardião do Equilíbrio',desc:'Concluir desafio do tampão.',check:p=>p.labChallenges.includes('tampoes')},
{id:'salt',icon:'🧂',title:'Detetive dos Sais',desc:'Concluir desafio de hidrólise.',check:p=>p.labChallenges.includes('hidrolise')},
{id:'crystal',icon:'💎',title:'Caçador de Cristais',desc:'Concluir desafio de precipitação.',check:p=>p.labChallenges.includes('kps')},
{id:'memory',icon:'🧠',title:'Memória Química',desc:'Revisar os 40 cartões ao menos uma vez.',check:p=>flashcards.every(c=>p.cards[c.id]?.reviews>=1)},
{id:'math',icon:'∑',title:'Mente Analítica',desc:'Acertar 20 questões numéricas diferentes.',check:p=>new Set(p.attempts.filter(a=>a.correct&&questions.find(q=>q.id===a.id)?.type==='numeric').map(a=>a.id)).size>=20},
{id:'persevere',icon:'✨',title:'Perseverança Científica',desc:'Corrigir posteriormente 10 erros diferentes.',check:p=>new Set(p.attempts.filter(a=>a.correct&&p.attempts.some(b=>b.id===a.id&&!b.correct&&new Date(b.when)<=new Date(a.when))).map(a=>a.id)).size>=10},
{id:'expert',icon:'🎓',title:'Especialista em Equilíbrio',desc:'Concluir os cinco módulos principais.',check:p=>modules.slice(1).every(m=>m.lessons.every((_,i)=>p.completedLessons.includes(m.id+'/'+i)))},
{id:'marathon',icon:'🏆',title:'Maratona Química',desc:'Concluir um simulado completo de 30 questões.',check:p=>p.simulations.some(s=>s.total===30&&s.finished)}
];
export function refreshBadges(){const gained=[];for(const b of badges){if(!progress.achievements[b.id]&&b.check(progress)){progress.achievements[b.id]=new Date().toISOString();gained.push(b)}}if(gained.length)save();return gained}
