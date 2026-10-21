const KEY='equilibra-progress-v1';
export const initial=()=>({version:1,completedLessons:[],labChallenges:[],attempts:[],cards:{},xpAwards:[],xp:0,achievements:{},theme:'light',lastLesson:'fundamentos/0',lastStudy:null,diagnostic:null,simulations:[]});
export function load(){try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&saved.version===1)return {...initial(),...saved,completedLessons:Array.isArray(saved.completedLessons)?saved.completedLessons:[],labChallenges:Array.isArray(saved.labChallenges)?saved.labChallenges:[],attempts:Array.isArray(saved.attempts)?saved.attempts:[],cards:saved.cards&&typeof saved.cards==='object'?saved.cards:{},xpAwards:Array.isArray(saved.xpAwards)?saved.xpAwards:[],achievements:saved.achievements&&typeof saved.achievements==='object'?saved.achievements:{}}}catch(e){console.warn('Progresso não pôde ser carregado',e)}return initial()}
export let progress=load();
export function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch(e){console.warn('Não foi possível salvar',e)}}
export function update(fn){fn(progress);progress.lastStudy=new Date().toISOString();save()}
export function award(code,points){if(progress.xpAwards.includes(code))return false;progress.xpAwards.push(code);progress.xp+=points;save();return true}
export function replace(data){if(!data||data.version!==1||!Array.isArray(data.completedLessons)||!Array.isArray(data.attempts)||!Array.isArray(data.labChallenges)||!data.cards||typeof data.cards!=='object')throw new Error('Arquivo de progresso inválido ou incompatível.');progress={...initial(),...data};save()}
export function reset(){progress=initial();save()}
export function level(){return 1+Math.floor(progress.xp/150)}
export function today(){return new Date().toISOString().slice(0,10)}
