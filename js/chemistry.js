export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const log10=x=>Math.log(x)/Math.LN10;
export const KW_BY_T={0:1.14e-15,25:1e-14,50:5.48e-14};
export const fmt=(x,d=2)=>!Number.isFinite(x)?'—':Math.abs(x)>0&&Math.abs(x)<0.001?x.toExponential(2).replace('e',' × 10^'):x.toLocaleString('pt-BR',{maximumFractionDigits:d});
export function water({h=1e-7,temp=25}){
 const kw=KW_BY_T[Number(temp)]; if(!(h>0&&h<=10)||!kw)return {error:'Use [H₃O⁺] entre 0 e 10 mol/L e uma temperatura disponível.'};
 const oh=kw/h,ph=-log10(h),poh=-log10(oh),pkw=-log10(kw);return {kw,h,oh,ph,poh,pkw,neutral:pkw/2,status:Math.abs(ph-pkw/2)<0.015?'Neutro':ph<pkw/2?'Ácido':'Básico'};
}
export const indicatorNames={phen:'Fenolftaleína',btb:'Azul de bromotimol',methyl:'Alaranjado de metila',cabbage:'Extrato de repolho roxo',universal:'Indicador universal'};
export const samples={custom:{label:'Personalizada',ph:7},lemon:{label:'Suco de limão (~2,3)',ph:2.3},vinegar:{label:'Vinagre (~2,8)',ph:2.8},water:{label:'Água pura, 25 °C (~7)',ph:7},bicarb:{label:'Bicarbonato (~8,4)',ph:8.4},soap:{label:'Solução de sabão (~10)',ph:10}};
export function indicator({indicator='btb',ph=7}){
 ph=Number(ph);if(!Number.isFinite(ph)||ph<0||ph>14)return {error:'Informe um pH entre 0 e 14 na faixa didática da simulação.'};
 let color,shade,range;
 if(indicator==='phen'){shade=ph<8.2?'incolor':ph>10?'rosa': 'rosa-claro / transição'; color=ph<8.2?'#bdeef3':ph>10?'#ed3a8a':'#f7a8ce';range='8,2–10,0';}
 else if(indicator==='btb'){shade=ph<6?'amarelo':ph>7.6?'azul':'verde / transição';color=ph<6?'#f2c84b':ph>7.6?'#3f85e4':'#77c779';range='6,0–7,6';}
 else if(indicator==='methyl'){shade=ph<3.1?'vermelho':ph>4.4?'amarelo':'laranja / transição';color=ph<3.1?'#e75b56':ph>4.4?'#f3d354':'#f39c4d';range='3,1–4,4';}
 else if(indicator==='cabbage'){shade=ph<4?'avermelhado':ph<6?'rosa/roxo':ph<8?'violeta':ph<11?'azulado/esverdeado':'amarelo-esverdeado';color=ph<4?'#cf5b85':ph<6?'#bf75c6':ph<8?'#8567c6':ph<11?'#4fba9c':'#b9cb57';range='Varia conforme preparo';}
 else {shade=ph<3?'vermelho':ph<5?'laranja':ph<6.5?'amarelo':ph<7.5?'verde':ph<10?'azul':'violeta';color=ph<3?'#e45e54':ph<5?'#f0a451':ph<6.5?'#dfd05c':ph<7.5?'#75bf80':ph<10?'#648cdb':'#906cba';range='Faixa ampla (comparação visual)';}
 return {ph,color,shade,range,status:ph<7?'Ácido':ph>7?'Básico':'Neutro (25 °C)',name:indicatorNames[indicator]};
}
function solveHFromStrong(c,kw=1e-14){return (c+Math.sqrt(c*c+4*kw))/2}
export function buffer({acid=0.1,base=0.1,addition=0,kind='acid',pka=4.76,volume=1}){
 acid=Number(acid);base=Number(base);addition=Number(addition);volume=Number(volume);pka=Number(pka);
 if(!(acid>0&&base>0&&volume>0)||addition<0||addition>10||!(pka>0&&pka<14))return {error:'Informe quantidades positivas, volume positivo e adição não negativa.'};
 const initial=pka+log10(base/acid),a=acid+(kind==='acid'?addition:-addition),b=base+(kind==='acid'?-addition:addition);
 const h0=10**(-initial),initialNet=h0-1e-14/h0;
 const finalStrongNet=initialNet+(kind==='acid'?1:-1)*addition/volume;
 const control=-log10(solveHFromStrong(finalStrongNet));
 if(a<=0||b<=0)return {initial,final:null,control,a,b,addition,kind,exhausted:true,explanation:'Um dos componentes foi consumido. Henderson–Hasselbalch não é mais aplicável; o pH do tampão exige resolver o equilíbrio completo. O comparador não tamponado continua válido no modelo ideal de ácido/base forte.'};
 const final=pka+log10(b/a);
 return {initial,final,control,a,b,addition,kind,exhausted:false,explanation:kind==='acid'?'A base conjugada A⁻ consome H₃O⁺ e é convertida em HA.':'O ácido fraco HA neutraliza OH⁻ e é convertido em A⁻.'};
}
export const salts={nacl:{name:'NaCl',type:'Ácido forte + base forte',ions:'Na⁺ + Cl⁻',eq:'Não há hidrólise ácido-base relevante.',trend:'aproximadamente neutro'},nh4cl:{name:'NH₄Cl',type:'Ácido forte + base fraca',ions:'NH₄⁺ + Cl⁻',eq:'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺',trend:'ácido'},acetate:{name:'CH₃COONa',type:'Ácido fraco + base forte',ions:'CH₃COO⁻ + Na⁺',eq:'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻',trend:'básico'},amacet:{name:'NH₄CH₃COO',type:'Ácido fraco + base fraca',ions:'NH₄⁺ + CH₃COO⁻',eq:'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺; CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻',trend:'aproximadamente neutro'}};
export function hydrolysis({salt='nacl',concentration=0.1}){
 const item=salts[salt];const C=Number(concentration);if(!item||!(C>=0.001&&C<=1))return {error:'Selecione um sal e concentração entre 0,001 e 1 mol/L.'};
 const kw=1e-14,Ka=kw/1.8e-5,Kb=kw/1.8e-5;
 let ph=7,explanation='No modelo diluído, Na⁺ e Cl⁻ não alteram de modo relevante o pH da água pura.';
 if(salt==='nh4cl'){const x=(-Ka+Math.sqrt(Ka*Ka+4*Ka*C))/2;ph=-log10(x);explanation='A hidrólise de NH₄⁺ produz H₃O⁺. Estimativa pela solução da expressão simplificada x²/(C−x)=Ka, desprezando a contribuição de autoionização da água.'}
 if(salt==='acetate'){const x=(-Kb+Math.sqrt(Kb*Kb+4*Kb*C))/2;ph=14+log10(x);explanation='A hidrólise do acetato produz OH⁻. Estimativa por x²/(C−x)=Kb, desprezando a contribuição de autoionização da água.'}
 if(salt==='amacet'){ph=7+0.5*log10(Kb/Ka);explanation='Cátion e ânion hidrolisam. Como Ka(NH₄⁺)≈Kb(acetato), suas contribuições aproximadas se equilibram: pH próximo de 7 a 25 °C.'}
 return {...item,ph,concentration:C,ka:Ka,kb:Kb,explanation,caveat:'Modelo escolar para solução aquosa diluída a 25 °C; atividades, concentração extrema e outras reações são desprezadas.'};
}
export const solids={agcl:{name:'Cloreto de prata (AgCl)',ksp:1.8e-10,ion1:'Ag⁺',ion2:'Cl⁻',power:1,formula:'Q = [Ag⁺][Cl⁻]',stoich:1},caf2:{name:'Fluoreto de cálcio (CaF₂)',ksp:3.9e-11,ion1:'Ca²⁺',ion2:'F⁻',power:2,formula:'Q = [Ca²⁺][F⁻]²',stoich:2}};
export function solubility({solid='agcl',c1=0.0001,c2=0.0001}){
 const s=solids[solid]; c1=Number(c1);c2=Number(c2);if(!s||!Number.isFinite(c1)||!Number.isFinite(c2)||c1<0||c2<0||c1>2||c2>2)return {error:'As concentrações devem estar entre 0 e 2 mol/L, sem valores negativos.'};
 const q=c1*c2**s.power,ratio=q/s.ksp,status=ratio<0.999999?'Insaturada':ratio>1.000001?'Supersaturada':'No limite de saturação';let precip=0,after1=c1,after2=c2;
 if(q>s.ksp){let lo=0,hi=Math.min(c1,c2/s.stoich);for(let i=0;i<85;i++){const mid=(lo+hi)/2,product=(c1-mid)*Math.max(0,c2-s.stoich*mid)**s.power;if(product>s.ksp)lo=mid;else hi=mid;}precip=(lo+hi)/2;after1=c1-precip;after2=c2-s.stoich*precip;}
 return {q,ratio,ksp:s.ksp,status,precip,after1,after2,formula:s.formula,name:s.name,ion1:s.ion1,ion2:s.ion2,power:s.power,detail:q>s.ksp?'Há precipitação favorecida até Q aproximar Kps pelo balanço de massa idealizado.':'Não há tendência de precipitar nas concentrações iniciais informadas.',caveat:'Simulação termodinâmica a 25 °C em mistura idealizada, sem complexação, efeitos de atividade ou tempo de nucleação. A formação visível pode não ser imediata.'};
}
