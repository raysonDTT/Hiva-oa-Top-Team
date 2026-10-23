/* --- NAVIGATION ET LOGIQUE PRINCIPALE --- */
const navItems=[['home','Accueil','⌂'],['chrono','Chrono ⏱','⏱'],['programs','Programmes','▤'],['muscles','Muscles','✦'],['exercises','Exercices','＋'],['builder','Mon programme','⚒'],['performance','Performances','↗'],['settings','Mon espace','⚙']];
const muscles=['Pectoraux','Dos','Épaules','Bras','Jambes','Abdominaux'];
const initialExercises=[
{id:1,name:'Développé couché',muscle:'Pectoraux',equipment:'Barre',level:'Intermédiaire',desc:'Garde les omoplates serrées, les pieds ancrés au sol et contrôle la descente. Pousse sans rebondir sur la poitrine.',icon:'🏋️'},
{id:2,name:'Pompes',muscle:'Pectoraux',equipment:'Poids du corps',level:'Débutant',desc:'Aligne tête, épaules, hanches et chevilles. Descends en contrôlant puis repousse le sol.',icon:'💪'},
{id:3,name:'Écartés aux haltères',muscle:'Pectoraux',equipment:'Haltères',level:'Intermédiaire',desc:'Garde les coudes légèrement fléchis et utilise une amplitude confortable sans étirer excessivement les épaules.',icon:'🏋️'},
{id:4,name:'Tirage vertical',muscle:'Dos',equipment:'Machine',level:'Débutant',desc:'Tire les coudes vers le bas en dirigeant la barre vers le haut de la poitrine. Évite de tirer derrière la nuque.',icon:'🧗'},
{id:5,name:'Rowing haltère',muscle:'Dos',equipment:'Haltère',level:'Intermédiaire',desc:'Garde le dos neutre et tire le coude vers la hanche sans tourner le buste.',icon:'🏋️'},
{id:6,name:'Soulevé de terre',muscle:'Dos',equipment:'Barre',level:'Avancé',desc:'Apprends le mouvement avec une charge légère. Garde la barre près du corps et le dos dans une position neutre.',icon:'🏋️'},
{id:7,name:'Développé épaules',muscle:'Épaules',equipment:'Haltères',level:'Intermédiaire',desc:'Contracte le tronc, évite de cambrer excessivement et pousse dans une trajectoire contrôlée.',icon:'🙌'},
{id:8,name:'Élévations latérales',muscle:'Épaules',equipment:'Haltères',level:'Débutant',desc:'Monte les bras jusqu’à une hauteur confortable, avec une légère flexion des coudes et sans élan.',icon:'💪'},
{id:9,name:'Curl biceps',muscle:'Bras',equipment:'Haltères',level:'Débutant',desc:'Garde les coudes proches du corps et évite de balancer le buste.',icon:'💪'},
{id:10,name:'Extensions triceps',muscle:'Bras',equipment:'Poulie',level:'Débutant',desc:'Garde les coudes stables près du corps et termine le mouvement sans à-coups.',icon:'💪'},
{id:11,name:'Squat',muscle:'Jambes',equipment:'Poids du corps / barre',level:'Intermédiaire',desc:'Garde les pieds bien ancrés, les genoux dans l’axe des pieds et une amplitude adaptée à ta mobilité.',icon:'🦵'},
{id:12,name:'Fentes',muscle:'Jambes',equipment:'Poids du corps / haltères',level:'Débutant',desc:'Fais un pas stable, descends verticalement et garde le genou avant dans l’axe du pied.',icon:'🦵'},
{id:13,name:'Gainage planche',muscle:'Abdominaux',equipment:'Poids du corps',level:'Débutant',desc:'Contracte les abdominaux et les fessiers, garde le bassin aligné et respire régulièrement.',icon:'🔥'},
{id:14,name:'Crunch contrôlé',muscle:'Abdominaux',equipment:'Poids du corps',level:'Débutant',desc:'Enroule légèrement le haut du buste sans tirer sur la nuque. Privilégie le contrôle à la vitesse.',icon:'🔥'}
];
const initialPrograms=[
{id:'p1',name:'Force — Haut du corps',goal:'Force',muscle:'Haut du corps',level:'Intermédiaire',duration:'50–65 min',desc:'Une séance structurée pour travailler les mouvements de poussée et de tirage.',items:[{exerciseId:1,sets:4,reps:'5–6',weight:'',rest:150},{exerciseId:5,sets:4,reps:'6–8',weight:'',rest:120},{exerciseId:7,sets:3,reps:'8',weight:'',rest:90},{exerciseId:9,sets:3,reps:'10',weight:'',rest:60}],mode:'classique'},
{id:'p2',name:'Jambes & stabilité',goal:'Hypertrophie',muscle:'Jambes',level:'Intermédiaire',duration:'45–60 min',desc:'Travail des jambes avec attention portée à la technique et au contrôle.',items:[{exerciseId:11,sets:4,reps:'8–10',weight:'',rest:120},{exerciseId:12,sets:3,reps:'10 / jambe',weight:'',rest:90},{exerciseId:13,sets:3,reps:'30–45 s',weight:'',rest:45}],mode:'classique'},
{id:'p3',name:'Pectoraux & triceps',goal:'Hypertrophie',muscle:'Pectoraux',level:'Débutant / intermédiaire',duration:'40–55 min',desc:'Une séance de poussée avec exercices de base et travail complémentaire.',items:[{exerciseId:2,sets:3,reps:'8–12',weight:'',rest:60},{exerciseId:1,sets:3,reps:'8–10',weight:'',rest:90},{exerciseId:10,sets:3,reps:'10–12',weight:'',rest:60}],mode:'classique'},
{id:'p4',name:'Full body express',goal:'Conditionnement',muscle:'Corps entier',level:'Tous niveaux',duration:'25–35 min',desc:'Un format compact pour bouger tout le corps en gardant une bonne technique.',items:[{exerciseId:11,sets:3,reps:'10',weight:'',rest:60},{exerciseId:2,sets:3,reps:'8–12',weight:'',rest:45},{exerciseId:5,sets:3,reps:'10',weight:'',rest:45},{exerciseId:13,sets:3,reps:'30 s',weight:'',rest:30}],mode:'classique'}
];
const read=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch{return fallback}};
let programs=read('htt_programs',initialPrograms),sessions=read('htt_sessions',[]),builderItems=[];
const exerciseById=id=>initialExercises.find(e=>e.id===Number(id))||{name:'Exercice personnalisé',muscle:'Autre',icon:'🏋️',desc:'Ajoute tes consignes dans une future version.'};
function saveLocal(){localStorage.setItem('htt_programs',JSON.stringify(programs));localStorage.setItem('htt_sessions',JSON.stringify(sessions))}
function notify(s){const t=document.getElementById('toast');t.textContent=s;t.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.style.display='none',2600)}
function go(page){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+page));document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));window.scrollTo({top:0,behavior:'smooth'});if(page==='performance')renderSessions()}
function buildNav(){const make=(mobile)=>navItems.map(([id,label,icon])=>`<button data-page="${id}" onclick="go('${id}')" class="${id==='home'?'active':''}">${mobile?'':icon+'　'}${label}</button>`).join('');document.getElementById('sideNav').innerHTML=make(false);document.getElementById('mobileNav').innerHTML=make(true)}

function programCard(p){
    const isCustom = p.id.startsWith('custom-');
    const deleteBtn = isCustom ? `<button class="btn ghost small" style="color:var(--red); border-color:var(--red); padding:7px 10px;" onclick="deleteProgram('${p.id}')">🗑️</button>` : '';
    return `<article class="card">
        <span class="tag">${p.goal}</span>
        <div><h3>${esc(p.name)}</h3><p>${esc(p.desc||'Programme personnalisé pour ta prochaine séance.')}</p></div>
        <div class="card-footer">
            <span class="muted" style="font-size:12px">◷ ${esc(p.duration||'À définir')} · ${p.items.length} exercices</span>
            <div style="display:flex; gap:6px;">${deleteBtn}<button class="btn secondary small" onclick="startProgram('${p.id}')">Voir</button></div>
        </div>
    </article>`
}
function renderPrograms(){const q=(document.getElementById('programSearch')?.value||'').toLowerCase(),f=document.getElementById('programFilter')?.value||'';const list=programs.filter(p=>(p.name+' '+p.desc+' '+p.muscle).toLowerCase().includes(q)&&(!f||p.goal===f));document.getElementById('programGrid').innerHTML=list.length?list.map(programCard).join(''):'<div class="empty">Aucun programme trouvé. Essaie un autre mot-clé ou crée ton programme.</div>'}
function renderHome(){document.getElementById('statPrograms').textContent=programs.length;document.getElementById('statExercises').textContent=initialExercises.length;document.getElementById('statSessions').textContent=sessions.length;document.getElementById('homePrograms').innerHTML=programs.slice(0,3).map(programCard).join('')}
function renderMuscles(){document.getElementById('muscleGrid').innerHTML=muscles.map((m,i)=>{const count=initialExercises.filter(e=>e.muscle===m).length;return `<article class="card"><div class="muscle-icon">${['✦','↗','⬆','💪','⚡','◈'][i]}</div><div><h3>${m}</h3><p>${count} exercices disponibles dans cette zone.</p></div><div class="card-footer"><span class="muted" style="font-size:12px">Bibliothèque</span><button class="btn secondary small" onclick="filterMuscle('${m}')">Explorer</button></div></article>`}).join('')}
function renderExercises(){const q=(document.getElementById('exerciseSearch')?.value||'').toLowerCase(),f=(document.getElementById('exerciseFilter')?.value||'');const list=initialExercises.filter(e=>(e.name+' '+e.desc+' '+e.equipment).toLowerCase().includes(q)&&(!f||e.muscle===f));document.getElementById('exerciseGrid').innerHTML=list.length?list.map(e=>`<article class="card"><div class="exercise-icon">${e.icon}</div><span class="tag">${e.muscle}</span><div><h3>${esc(e.name)}</h3><p>${esc(e.desc)}</p></div><div class="card-footer"><span class="muted" style="font-size:12px">${esc(e.equipment)} · ${e.level}</span><button class="btn secondary small" onclick="addFromExercise(${e.id})">Ajouter</button></div></article>`).join(''):'<div class="empty">Aucun exercice trouvé.</div>'}
function filterMuscle(m){document.getElementById('exerciseFilter').value=m;go('exercises');renderExercises()}
function addFromExercise(id){builderItems.push({exerciseId:id,sets:3,reps:'10',weight:'',rest:60});renderBuilder();go('builder');notify('Exercice ajouté au programme')}

function startProgram(id){
    const p = programs.find(x => x.id === id);
    if(!p) return;
    document.getElementById('modalTitle').textContent = p.name;
    let html = `<p style="color:var(--muted); margin-bottom:15px;">${p.desc}</p>`;
    p.items.forEach((item, index) => {
        const exo = exerciseById(item.exerciseId);
        html += `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--line);"><div><strong style="color:#fff;">${index + 1}. ${exo.name}</strong><br><small style="color:var(--muted);">${exo.muscle}</small></div><div style="text-align:right; font-weight:800; color:var(--red);">${item.sets} séries<br>${item.reps} reps</div></div>`;
    });
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modalProgram').style.display = 'flex';
    document.getElementById('modalProgram').setAttribute('data-program-id', id);
}

function deleteProgram(id) {
    if (confirm("Es-tu sûr de vouloir supprimer définitivement ce programme ?")) {
        programs = programs.filter(p => p.id !== id); saveLocal(); renderAll(); refreshSelects(); notify("Programme supprimé !");
    }
}

function toggleProgramModeSettings() {
    const mode = document.getElementById('newProgramMode').value;
    document.getElementById('fieldProgramTabata').style.display = 'none';
    document.getElementById('fieldProgramRest').style.display = 'none';
    document.getElementById('fieldProgramAmrapTime').style.display = 'none';

    if (mode === 'tabata') {
        document.getElementById('fieldProgramTabata').style.display = 'block';
        document.getElementById('fieldProgramRest').style.display = 'block';
    } else if (mode === 'amrap') {
        document.getElementById('fieldProgramAmrapTime').style.display = 'block';
    }
}

function refreshSelects(){document.getElementById('sessionProgram').innerHTML=programs.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');document.getElementById('addExerciseSelect').innerHTML=initialExercises.map(e=>`<option value="${e.id}">${esc(e.name)} — ${e.muscle}</option>`).join('');document.getElementById('exerciseFilter').innerHTML='<option value="">Tous les muscles</option>'+muscles.map(m=>`<option>${m}</option>`).join('')}
function addExerciseToBuilder(){const id=Number(document.getElementById('addExerciseSelect').value);builderItems.push({exerciseId:id,sets:3,reps:'10',weight:'',rest:60});renderBuilder()}
function renderBuilder(){const root=document.getElementById('builderRows');if(!builderItems.length){root.innerHTML='<div class="empty">Aucun exercice pour le moment. Choisis un exercice ci-dessus pour commencer.</div>';return}root.innerHTML=builderItems.map((it,i)=>{const e=exerciseById(it.exerciseId);return `<div class="exercise-row"><div class="field"><label>Exercice ${i+1}</label><select onchange="changeBuilderExercise(${i},this.value)">${initialExercises.map(x=>`<option value="${x.id}" ${x.id===it.exerciseId?'selected':''}>${esc(x.name)}</option>`).join('')}</select></div><div class="field"><label>Séries</label><input type="number" min="1" max="20" value="${it.sets}" onchange="updateBuilder(${i},'sets',this.value)"></div><div class="field"><label>Répétitions / Temps</label><input value="${esc(String(it.reps))}" onchange="updateBuilder(${i},'reps',this.value)"></div><div class="field"><label>Charge (kg)</label><input type="number" min="0" step="0.5" placeholder="—" value="${esc(String(it.weight))}" onchange="updateBuilder(${i},'weight',this.value)"></div><div class="field"><label>Repos (s)</label><input type="number" min="0" step="15" value="${it.rest}" onchange="updateBuilder(${i},'rest',this.value)"></div><button class="btn ghost small remove-ex" onclick="removeBuilder(${i})">Retirer</button></div>`}).join('')}
function changeBuilderExercise(i,v){builderItems[i].exerciseId=Number(v)}
function updateBuilder(i,k,v){builderItems[i][k]=k==='reps'?v:(k==='weight'&&v===''?'':Number(v))}
function removeBuilder(i){builderItems.splice(i,1);renderBuilder()}
function clearBuilder(){builderItems=[];renderBuilder()}

function saveProgram(){
    const name = document.getElementById('newProgramName').value.trim();
    if(!name){ notify('Donne un nom à ton programme'); document.getElementById('newProgramName').focus(); return; }
    if(!builderItems.length){ notify('Ajoute au moins un exercice'); return; }
    
    const goal = document.getElementById('newProgramGoal').value;
    const mode = document.getElementById('newProgramMode').value;
    
    const tabataWork = parseInt(document.getElementById('newProgramTabataWork').value) || 20;
    const restTime = parseInt(document.getElementById('newProgramRest').value) || 10;
    const amrapTime = parseInt(document.getElementById('newProgramAmrapTime').value) || 60;
    
    const p = {
        id: 'custom-' + Date.now(),
        name: name,
        goal: goal,
        muscle: 'Personnalisé',
        level: 'Personnalisé',
        duration: 'À définir',
        desc: 'Programme créé par un membre de la team.',
        items: builderItems.map(x => ({...x})),
        mode: mode,
        tabataWork: tabataWork,
        restTime: restTime,
        amrapTime: amrapTime
    };
    
    programs.unshift(p);
    saveLocal();
    
    document.getElementById('newProgramName').value = '';
    document.getElementById('newProgramMode').value = 'classique';
    toggleProgramModeSettings();
    builderItems = [];
    renderBuilder();
    refreshSelects();
    renderAll();
    go('programs');
    notify('Programme enregistré sur cet appareil');
}

function saveSession(){const id=document.getElementById('sessionProgram').value;if(!id){notify('Crée d’abord un programme');return}const p=programs.find(x=>x.id===id);sessions.unshift({id:'s-'+Date.now(),programId:id,programName:p?.name||'Séance',date:document.getElementById('sessionDate').value||new Date().toISOString().slice(0,10),notes:document.getElementById('sessionNotes').value.trim()});saveLocal();renderAll();renderSessions();document.getElementById('sessionNotes').value='';notify('Séance enregistrée sur cet appareil')}
function renderSessions(){const root=document.getElementById('sessionList');document.getElementById('sessionCount').textContent=sessions.length+' séance(s)';root.innerHTML=sessions.length?sessions.map(s=>`<div class="list-row"><div><strong>${esc(s.programName)}</strong><small>${esc(s.date)}${s.notes?' · '+esc(s.notes):''}</small></div><button class="btn ghost small" onclick="deleteSession('${s.id}')">Supprimer</button></div>`).join(''):'<div class="empty">Aucune séance enregistrée. Après ton entraînement, ajoute ta première séance ici.</div>'}
function deleteSession(id){sessions=sessions.filter(s=>s.id!==id);saveLocal();renderAll();renderSessions()}
function renderAll(){renderHome();renderPrograms();renderExercises();renderMuscles()}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

// INITIALISATION GÉNÉRALE
buildNav();
refreshSelects();
renderBuilder();
renderAll();
document.getElementById('sessionDate').value=new Date().toISOString().slice(0,10);

/* --- LOGIQUE DU MÉGA CHRONOMÈTRE --- */
let megaChronoInterval = null;
let megaChronoMode = 'minuteur';
let megaChronoTime = 90;
let megaChronoRunning = false;
let tabataRound = 1;
let tabataPhase = 'work';
let tabataWorkTime = 60; 
let tabataRestTime = 30;
let amrapRounds = 0; 

function playBeep() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1);
    } catch(e) { console.log("Audio non supporté"); }
}

function formatMegaTime(seconds) {
    const m = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
    const s = (Math.abs(seconds) % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}
function updateMegaDisplay() {
    const display = document.getElementById('chronoDisplay');
    if(!display) return;
    
    if (megaChronoMode === 'chronometre') {
        display.textContent = formatMegaTime(megaChronoTime);
        display.className = 'chrono-display';
    } else if (megaChronoMode === 'tabata') {
        display.textContent = formatMegaTime(megaChronoTime);
        display.className = megaChronoTime <= 3 ? 'chrono-display finished' : 'chrono-display';
    } else {
        display.textContent = formatMegaTime(megaChronoTime);
        display.className = 'chrono-display';
        if (megaChronoTime <= 3 && megaChronoTime > 0) display.classList.add('finished');
    }
}

function setChronoMode(mode) {
    clearInterval(megaChronoInterval);
    megaChronoRunning = false;
    const btn = document.getElementById('btnStart');
    if(btn) btn.textContent = '▶ Démarrer';

    megaChronoMode = mode;
    
    document.querySelectorAll('.chrono-tab').forEach(t => t.classList.remove('active'));
    const activeTab = document.getElementById('tab-' + mode);
    if(activeTab) activeTab.classList.add('active');
    
    const message = document.getElementById('chronoMessage');
    const label = document.getElementById('chronoLabel');
    const settings = document.getElementById('chronoSettings');
    const round = document.getElementById('chronoRound');
    
    const allFields = ['field-chronoMin', 'field-chronoSec', 'field-tabataWork', 'field-tabataWorkSec', 'field-tabataRest', 'field-tabataRestSec', 'field-tabataSets'];
    allFields.forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
    settings.classList.remove('tabata-active');
    document.getElementById('amrapCounterBox').style.display = 'none';

    if (mode === 'minuteur') {
        message.textContent = 'TU AS';
        label.textContent = 'POUR CHALALA';
        settings.style.display = 'block';
        document.getElementById('field-chronoMin').style.display = 'block';
        document.getElementById('field-chronoSec').style.display = 'block';
        round.textContent = '';
        megaChronoTime = 90;
        document.getElementById('chronoMin').value = 1;
        document.getElementById('chronoSec').value = 30;
    } else if (mode === 'chronometre') {
        message.textContent = 'TEMPS ÉCOULÉ';
        label.textContent = 'DEPUIS LE DÉBUT';
        settings.style.display = 'none';
        round.textContent = '';
        megaChronoTime = 0;
    } else if (mode === 'tabata') {
        message.textContent = 'TU AS';
        label.textContent = 'POUR FONDRE TA GRAISSE';
        settings.style.display = 'block';
        settings.classList.add('tabata-active');
        
        document.getElementById('field-tabataWork').style.display = 'block';
        document.getElementById('field-tabataWorkSec').style.display = 'block';
        document.getElementById('field-tabataRest').style.display = 'block';
        document.getElementById('field-tabataRestSec').style.display = 'block';
        document.getElementById('field-tabataSets').style.display = 'block';
        
        document.getElementById('tabataWorkMin').value = 1;
        document.getElementById('tabataWorkSec').value = 0;
        document.getElementById('tabataRestMin').value = 0;
        document.getElementById('tabataRestSec').value = 30;
        
        tabataRound = 1;
        tabataPhase = 'work';
        tabataWorkTime = 60;
        tabataRestTime = 30;
        megaChronoTime = tabataWorkTime;
        const totalSets = parseInt(document.getElementById('tabataSetsInput').value) || 8;
        round.textContent = `Round ${tabataRound} / ${totalSets} - EFFORT`;
    } else if (mode === 'amrap') {
        message.textContent = 'TU AS';
        label.textContent = 'POUR FAIRE UN MAX DE REPS !';
        settings.style.display = 'block';
        document.getElementById('field-chronoMin').style.display = 'block';
        document.getElementById('field-chronoSec').style.display = 'block';
        round.textContent = 'AMRAP';
        megaChronoTime = 600;
        document.getElementById('chronoMin').value = 10;
        document.getElementById('chronoSec').value = 0;
        
        document.getElementById('amrapCounterBox').style.display = 'block';
        amrapRounds = 0;
        document.getElementById('amrapCountDisplay').textContent = amrapRounds;
    }
    updateMegaDisplay();
}

function updateChronoFromInputs() {
    if (megaChronoMode === 'minuteur' || megaChronoMode === 'amrap') {
        const m = parseInt(document.getElementById('chronoMin').value) || 0;
        const s = parseInt(document.getElementById('chronoSec').value) || 0;
        megaChronoTime = (m * 60) + s;
    } else if (megaChronoMode === 'tabata') {
        const wMin = parseInt(document.getElementById('tabataWorkMin').value) || 0;
        const wSec = parseInt(document.getElementById('tabataWorkSec').value) || 0;
        const rMin = parseInt(document.getElementById('tabataRestMin').value) || 0;
        const rSec = parseInt(document.getElementById('tabataRestSec').value) || 0;
        
        tabataWorkTime = (wMin * 60) + wSec;
        tabataRestTime = (rMin * 60) + rSec;
        megaChronoTime = tabataWorkTime;
        
        const totalSets = parseInt(document.getElementById('tabataSetsInput').value) || 8;
        document.getElementById('chronoRound').textContent = `Round 1 / ${totalSets} - EFFORT`;
    }
    updateMegaDisplay();
}

function toggleMegaChrono() {
    const btn = document.getElementById('btnStart');
    
    if (megaChronoRunning) {
        clearInterval(megaChronoInterval);
        megaChronoRunning = false;
        btn.textContent = '▶ Reprendre';
    } else {
        if (megaChronoMode === 'minuteur' && megaChronoTime === 0) return;
        
        megaChronoRunning = true;
        btn.textContent = '⏸ Pause';
        playBeep(); 
        
        megaChronoInterval = setInterval(() => {
            if (megaChronoMode === 'chronometre') {
                megaChronoTime++;
            } else {
                megaChronoTime--;
                
                if (megaChronoMode === 'tabata' && megaChronoTime < 0) {
                    const totalSets = parseInt(document.getElementById('tabataSetsInput').value) || 8;
                    
                    if (tabataPhase === 'work') {
                        tabataPhase = 'rest';
                        megaChronoTime = tabataRestTime;
                        document.getElementById('chronoRound').textContent = `Round ${tabataRound} / ${totalSets} - REPOS`;
                        document.getElementById('chronoMessage').textContent = 'TU AS';
                        document.getElementById('chronoLabel').textContent = 'POUR RÉCUPÉRER';
                        playBeep();
                    } else {
                        tabataRound++;
                        if (tabataRound > totalSets) {
                            clearInterval(megaChronoInterval);
                            megaChronoRunning = false;
                            btn.textContent = '▶ Démarrer';
                            document.getElementById('chronoLabel').textContent = 'TERMINÉ !';
                            document.getElementById('chronoRound').textContent = 'Beau travail !';
                            megaChronoTime = 0;
                            playBeep();
                            return;
                        }
                        tabataPhase = 'work';
                        megaChronoTime = tabataWorkTime;
                        document.getElementById('chronoRound').textContent = `Round ${tabataRound} / ${totalSets} - EFFORT`;
                        document.getElementById('chronoMessage').textContent = 'TU AS';
                        document.getElementById('chronoLabel').textContent = 'POUR FONDRE TA GRAISSE';
                        playBeep();
                    }
                }
                
                if (megaChronoMode !== 'tabata' && megaChronoTime <= 0) {
                    clearInterval(megaChronoInterval);
                    megaChronoRunning = false;
                    btn.textContent = '▶ Démarrer';
                    megaChronoTime = 0;
                    playBeep();
                }
            }
            updateMegaDisplay();
        }, 1000);
    }
}

function resetMegaChrono() {
    clearInterval(megaChronoInterval);
    megaChronoRunning = false;
    const btn = document.getElementById('btnStart');
    if(btn) btn.textContent = '▶ Démarrer';
    
    if (megaChronoMode === 'minuteur') {
        megaChronoTime = 90;
        updateChronoFromInputs();
    } else if (megaChronoMode === 'chronometre') {
        megaChronoTime = 0;
    } else if (megaChronoMode === 'tabata') {
        tabataRound = 1;
        tabataPhase = 'work';
        const wMin = parseInt(document.getElementById('tabataWorkMin').value) || 0;
        const wSec = parseInt(document.getElementById('tabataWorkSec').value) || 0;
        const rMin = parseInt(document.getElementById('tabataRestMin').value) || 0;
        const rSec = parseInt(document.getElementById('tabataRestSec').value) || 0;
        
        tabataWorkTime = (wMin * 60) + wSec;
        tabataRestTime = (rMin * 60) + rSec;
        megaChronoTime = tabataWorkTime;
        
        const totalSets = parseInt(document.getElementById('tabataSetsInput').value) || 8;
        document.getElementById('chronoRound').textContent = `Round 1 / ${totalSets} - EFFORT`;
        document.getElementById('chronoMessage').textContent = 'TU AS';
        document.getElementById('chronoLabel').textContent = 'POUR FONDRE TA GRAISSE';
    } else if (megaChronoMode === 'amrap') {
        megaChronoTime = 600;
        updateChronoFromInputs();
        amrapRounds = 0;
        document.getElementById('amrapCountDisplay').textContent = amrapRounds;
    }
    updateMegaDisplay();
}

function addAmrapRound() {
    if (megaChronoMode === 'amrap') {
        amrapRounds++;
        document.getElementById('amrapCountDisplay').textContent = amrapRounds;
        playBeep();
    }
}

window.addEventListener('load', () => {
    setChronoMode('minuteur');
});

/* --- GESTION DU THÈME (SOMBRE / CLAIR) --- */
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    const btn = document.getElementById('themeBtn');
    
    if (isLight) {
        if(btn) btn.textContent = '☀️ Mode Clair';
        localStorage.setItem('htt_theme', 'light');
    } else {
        if(btn) btn.textContent = '🌙 Mode Sombre';
        localStorage.setItem('htt_theme', 'dark');
    }
}

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('htt_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        const btn = document.getElementById('themeBtn');
        if(btn) btn.textContent = '☀️ Mode Clair';
    }
});

/* --- LOGIQUE DE L'ÉCRAN DE SÉANCE (LE LECTEUR) --- */
let seanceEnCours = null;
let seanceIndex = 0;
let seanceInterval = null;
let seanceChronoTime = 0;
let seanceIsRunning = false;
let seancePhase = 'attente'; // 'attente', 'effort', 'repos', 'amrap'
let seanceSerieActuelle = 1; // CORRECTION : variable pour suivre les séries

function lancerSeance() {
    const id = document.getElementById('modalProgram').getAttribute('data-program-id');
    const p = programs.find(x => x.id === id);
    if(!p) return;
    
    document.getElementById('modalProgram').style.display = 'none';
    seanceEnCours = p;
    seanceIndex = 0;
    document.getElementById('page-seance').style.display = 'flex';
    
    const btnMain = document.getElementById('seanceMainBtn');
    btnMain.onclick = actionSeance;
    btnMain.textContent = '▶ Démarrer l\'exercice';
    btnMain.style.display = 'block';
    
    chargerExerciceSeance();
}

function chargerExerciceSeance() {
    clearInterval(seanceInterval);
    seanceIsRunning = false;
    seancePhase = 'attente';
    seanceSerieActuelle = 1; // On repart à la série 1 pour chaque exercice
    
    const item = seanceEnCours.items[seanceIndex];
    const exo = exerciseById(item.exerciseId);
    
    // CORRECTION : Affichage de la série en cours pour le mode classique
    let progressText = `Exercice ${seanceIndex + 1} / ${seanceEnCours.items.length}`;
    if (seanceEnCours.mode === 'classique') {
        progressText += ` • Série ${seanceSerieActuelle} / ${item.sets}`;
    }
    document.getElementById('seanceProgress').textContent = progressText;
    document.getElementById('seanceExerciseName').textContent = exo.name;
    
    if (seanceEnCours.mode === 'classique') {
        document.getElementById('seanceExerciseInfo').textContent = `${item.reps} reps` + (item.weight ? ` • ${item.weight} kg` : '');
    } else if (seanceEnCours.mode === 'tabata') {
        document.getElementById('seanceExerciseInfo').textContent = `${seanceEnCours.tabataWork}s effort / ${seanceEnCours.restTime}s repos`;
    } else if (seanceEnCours.mode === 'amrap') {
        document.getElementById('seanceExerciseInfo').textContent = `${seanceEnCours.amrapTime} secondes`;
    }
    
    const coachMsg = document.getElementById('seanceCoachMessage');
    const chronoDisplay = document.getElementById('seanceChronoDisplay');
    const btnMain = document.getElementById('seanceMainBtn');
    const btnNext = document.getElementById('seanceNextBtn');
    
    btnNext.style.display = 'none';
    chronoDisplay.classList.remove('chrono-alert');
    chronoDisplay.textContent = '00:00';
    
    if (seanceEnCours.mode === 'classique') {
        coachMsg.textContent = 'Prêt pour la série ?';
        btnMain.textContent = '✅ J\'ai fini ma série';
        btnMain.style.display = 'block';
    } else if (seanceEnCours.mode === 'tabata') {
        coachMsg.textContent = 'Prêt pour le Tabata ?';
        btnMain.textContent = '▶ Démarrer l\'exercice';
        btnMain.style.display = 'block';
    } else if (seanceEnCours.mode === 'amrap') {
        coachMsg.textContent = 'Prêt pour l\'AMRAP ?';
        btnMain.textContent = '▶ Démarrer l\'exercice';
        btnMain.style.display = 'block';
    }
}

function actionSeance() {
    const btnMain = document.getElementById('seanceMainBtn');
    const btnNext = document.getElementById('seanceNextBtn');
    const coachMsg = document.getElementById('seanceCoachMessage');
    
    if (seanceEnCours.mode === 'classique') {
        btnMain.style.display = 'none';
        btnNext.style.display = 'none';
        coachMsg.textContent = 'TEMPS DE REPOS';
        seancePhase = 'repos';
        const item = seanceEnCours.items[seanceIndex];
        seanceChronoTime = item.rest || 60;
        lancerChronoSeance();
    } else if (seanceEnCours.mode === 'tabata' && seancePhase === 'attente') {
        btnMain.style.display = 'none';
        btnNext.style.display = 'none';
        seancePhase = 'effort';
        seanceChronoTime = seanceEnCours.tabataWork;
        coachMsg.textContent = 'EFFORT !';
        document.getElementById('seanceChronoDisplay').classList.add('chrono-alert');
        lancerChronoSeance();
    } else if (seanceEnCours.mode === 'amrap' && seancePhase === 'attente') {
        btnMain.style.display = 'none';
        btnNext.style.display = 'none';
        seancePhase = 'amrap';
        seanceChronoTime = seanceEnCours.amrapTime;
        coachMsg.textContent = 'GO !';
        document.getElementById('seanceChronoDisplay').classList.add('chrono-alert');
        lancerChronoSeance();
    }
}

function lancerChronoSeance() {
    seanceIsRunning = true;
    afficherChronoSeance();
    
    seanceInterval = setInterval(() => {
        seanceChronoTime--;
        afficherChronoSeance();
        
        if (seanceChronoTime <= 0) {
            clearInterval(seanceInterval);
            seanceIsRunning = false;
            playBeep();
            
            if (seanceEnCours.mode === 'classique') {
                // CORRECTION : On vérifie s'il reste des séries
                const item = seanceEnCours.items[seanceIndex];
                if (seanceSerieActuelle < item.sets) {
                    // Il reste des séries à faire
                    seanceSerieActuelle++;
                    document.getElementById('seanceCoachMessage').textContent = `PRÊT POUR LA SÉRIE ${seanceSerieActuelle} ?`;
                    document.getElementById('seanceProgress').textContent = `Exercice ${seanceIndex + 1} / ${seanceEnCours.items.length} • Série ${seanceSerieActuelle} / ${item.sets}`;
                    document.getElementById('seanceNextBtn').style.display = 'block';
                    document.getElementById('seanceNextBtn').textContent = `Série ${seanceSerieActuelle} ➔`;
                } else {
                    // Toutes les séries sont faites
                    document.getElementById('seanceCoachMessage').textContent = 'EXERCICE TERMINÉ !';
                    document.getElementById('seanceNextBtn').style.display = 'block';
                    document.getElementById('seanceNextBtn').textContent = `Exercice suivant ➔`;
                }
                document.getElementById('seanceChronoDisplay').classList.add('chrono-alert');
            } else if (seanceEnCours.mode === 'tabata') {
                if (seancePhase === 'effort') {
                    seancePhase = 'repos';
                    seanceChronoTime = seanceEnCours.restTime;
                    document.getElementById('seanceCoachMessage').textContent = 'REPOS';
                    document.getElementById('seanceChronoDisplay').classList.remove('chrono-alert');
                    lancerChronoSeance();
                } else {
                    passerSuivant();
                }
            } else if (seanceEnCours.mode === 'amrap') {
                passerSuivant();
            }
        }
    }, 1000);
}

function afficherChronoSeance() {
    const m = Math.floor(Math.abs(seanceChronoTime) / 60).toString().padStart(2, '0');
    const s = (Math.abs(seanceChronoTime) % 60).toString().padStart(2, '0');
    document.getElementById('seanceChronoDisplay').textContent = `${m}:${s}`;
}

// CORRECTION : Nouvelle logique pour gérer le bouton suivant (série vs exercice)
function suivantSeance() {
    const item = seanceEnCours.items[seanceIndex];
    
    if (seanceEnCours.mode === 'classique' && seanceSerieActuelle <= item.sets) {
        // Si on a cliqué pour une nouvelle série (et qu'on n'a pas dépassé le nombre de séries)
        if(document.getElementById('seanceNextBtn').textContent.includes('Série')) {
            // On relance la même exercice pour la série suivante
            document.getElementById('seanceCoachMessage').textContent = 'Prêt pour la série ?';
            document.getElementById('seanceMainBtn').textContent = '✅ J\'ai fini ma série';
            document.getElementById('seanceMainBtn').style.display = 'block';
            document.getElementById('seanceNextBtn').style.display = 'none';
            document.getElementById('seanceChronoDisplay').textContent = '00:00';
            document.getElementById('seanceChronoDisplay').classList.remove('chrono-alert');
            return;
        }
    }
    
    // Sinon, on passe à l'exercice suivant
    passerSuivant();
}

function passerSuivant() {
    seanceIndex++;
    if (seanceIndex >= seanceEnCours.items.length) {
        clearInterval(seanceInterval);
        document.getElementById('seanceCoachMessage').textContent = 'SÉANCE TERMINÉE !';
        document.getElementById('seanceChronoDisplay').textContent = '🏆';
        document.getElementById('seanceNextBtn').style.display = 'none';
        document.getElementById('seanceMainBtn').style.display = 'block';
        document.getElementById('seanceMainBtn').textContent = 'Fermer';
        document.getElementById('seanceMainBtn').onclick = quitterSeance;
        playBeep();
        return;
    }
    chargerExerciceSeance();
    if (seanceEnCours.mode === 'tabata' || seanceEnCours.mode === 'amrap') {
        setTimeout(() => { actionSeance(); }, 1000);
    }
}

// CORRECTION : Le bouton Quitter fonctionne maintenant
function quitterSeance() {
    clearInterval(seanceInterval);
    document.getElementById('page-seance').style.display = 'none';
    
    const btnMain = document.getElementById('seanceMainBtn');
    btnMain.onclick = actionSeance;
    btnMain.textContent = '▶ Démarrer l\'exercice';
}
