// scripts/spells/magery.js
import {
    calculateMagicArrowRange,
    calculateHarmDamage,
    calculateFireballDamage,
    calculateLightningDamage,
    calculateMindBlastDamage,
    calculateEnergyBoltDamage,
    calculateMeteorSwarmDamage,
    calculateExplosionDamage,
    calculateEarthquakeDamage
} from '../formulas/mageryFormulas.js';

const spellConfig = {
    magicArrow: [],
    harm: ['distance'],
    fireball: [],
    lightning: [],
    mindBlast: ['casterInt', 'magery'],
    meteorSwarm: ['enemyCount'],
    chainLightning: ['enemyCount'],
    earthquake: ['targetHp']
};

const extraInputLabels = {
    distance: 'Odległość do celu (w tile):',
    enemyCount: 'Liczba trafionych celów:',
    casterInt: 'Inteligencja rzucającego:',
    magery: 'Poziom Magery rzucającego:',
    targetHp: 'Aktualne HP celu:'
};

const castTimes = {
    magicArrow: { cast: 2.25, recovery: 1.5, fcAffects: false, fcrAffects: true, dpsOverride: 1.0 },
    harm: { cast: 1.0, recovery: 1.5, fcAffects: true, fcrAffects: true },
    fireball: { cast: 1.75, recovery: 1.0, fcAffects: true, fcrAffects: true },
    lightning: { cast: 2.25, recovery: 0.75, fcAffects: true, fcrAffects: true },
    mindBlast: { cast: 2.25, recovery: 1.0, fcAffects: true, fcrAffects: true },
    energyBolt: { cast: 2.25, recovery: 1.5, fcAffects: true, fcrAffects: true },
    meteorSwarm: { cast: 2.0, recovery: 1.0, fcAffects: true, fcrAffects: true },
    explosion: { cast: 3.0, recovery: 0.5, fcAffects: true, fcrAffects: true, dpsOverride: 3.0 },
    earthquake: { cast: 4.0, recovery: 0.0, fcAffects: true, fcrAffects: false }
};

function renderExtraInputs(spell) {
    const container = document.getElementById('extraInputs');
    container.innerHTML = '';

    const required = spellConfig[spell] || [];
    required.forEach((key) => {
        const label = document.createElement('label');
        label.textContent = extraInputLabels[key];

        const input = document.createElement('input');
        input.type = 'number';
        input.id = key;
        input.value = '0';

        label.appendChild(input);
        container.appendChild(label);
    });
}

export function setupMageryHandlers() {
    const spellSelect = document.getElementById('spell');

    spellSelect.addEventListener('change', () => {
        renderExtraInputs(spellSelect.value);
    });

    renderExtraInputs(spellSelect.value);

    const button = document.getElementById('calculate');

    const minDmgEl = document.getElementById('minDmg');
    const avgDmgEl = document.getElementById('avgDmg');
    const maxDmgEl = document.getElementById('maxDmg');
    const dpsMinEl = document.getElementById('dpsMin');
    const dpsAvgEl = document.getElementById('dpsAvg');
    const dpsMaxEl = document.getElementById('dpsMax');
    const dpmMinEl = document.getElementById('dpmMin');
    const dpmAvgEl = document.getElementById('dpmAvg');
    const dpmMaxEl = document.getElementById('dpmMax');
    const dp5mMinEl = document.getElementById('dp5mMin');
    const dp5mAvgEl = document.getElementById('dp5mAvg');
    const dp5mMaxEl = document.getElementById('dp5mMax');
    const castsPerMinuteEl = document.getElementById('castsPerMinute');


    button.addEventListener('click', () => {
        const caster = {
            int: parseInt(document.getElementById('int').value, 10),
            evalInt: parseInt(document.getElementById('eval').value, 10),
            scribe: parseInt(document.getElementById('scribe').value, 10),
            sdi: parseInt(document.getElementById('sdi').value, 10)
        };

        const spell = spellSelect.value;
        const fc = parseInt(document.getElementById('fc')?.value) || 0;
        const fcr = parseInt(document.getElementById('fcr')?.value) || 0;

        const spellTime = castTimes[spell] || { cast: 1.5, recovery: 1.0, fcAffects: true, fcrAffects: true };

        let castTime = spellTime.cast;
        let recovery = spellTime.recovery;

        if (spellTime.fcAffects) castTime = Math.max(1.0, castTime - fc * 1.0);
        if (spellTime.fcrAffects) recovery = Math.max(0.25, recovery - fcr * 0.25);

        const totalTime = castTime + recovery;
        const dpsTime = spellTime.dpsOverride || totalTime;

        // naprawiony fragment targetHp
        let targetHpRaw = parseInt(document.getElementById('targetHp')?.value) || 0;
        if (targetHpRaw <= 0) targetHpRaw = 100;

        const extra = {
            distance: parseFloat(document.getElementById('distance')?.value) || 0,
            enemyCount: parseInt(document.getElementById('enemyCount')?.value) || 0,
            casterInt: parseInt(document.getElementById('casterInt')?.value) || 0,
            magery: parseInt(document.getElementById('magery')?.value) || 0,
            targetHp: targetHpRaw
        };

        let result = {
            min: 0, avg: 0, max: 0,
            dpsMin: '---', dpsAvg: '---', dpsMax: '---',
            dpmMin: '---', dpmAvg: '---', dpmMax: '---',
            castsPerMinute: '---'
        };

        if (spell === 'magicArrow') {
            result = calculateMagicArrowRange(caster, dpsTime);
        } else if (spell === 'harm') {
            result = calculateHarmDamage(caster, extra.distance, dpsTime);
        } else if (spell === 'fireball') {
            result = calculateFireballDamage(caster, dpsTime);
        } else if (spell === 'lightning') {
            result = calculateLightningDamage(caster, dpsTime);
        } else if (spell === 'mindBlast') {
            result = calculateMindBlastDamage(
                { ...caster, magery: extra.magery },
                dpsTime
            );
        } else if (spell === 'energyBolt') {
            result = calculateEnergyBoltDamage(caster, dpsTime);
        } else if (spell === 'meteorSwarm') {
            result = calculateMeteorSwarmDamage(caster, extra.enemyCount, dpsTime);
        } else if (spell === 'explosion') {
            result = calculateExplosionDamage(caster, dpsTime);
        } else if (spell === 'earthquake') {
            result = calculateEarthquakeDamage(extra.targetHp, false, dpsTime);
        } else {
            console.warn("Nieobsługiwany czar:", spell);
            return;
        }

        minDmgEl.textContent = result.min;
        avgDmgEl.textContent = result.avg;
        maxDmgEl.textContent = result.max;

        dpsMinEl.textContent = result.dpsMin;
        dpsAvgEl.textContent = result.dpsAvg;
        dpsMaxEl.textContent = result.dpsMax;

        dpmMinEl.textContent = result.dpmMin;
        dpmAvgEl.textContent = result.dpmAvg;
        dpmMaxEl.textContent = result.dpmMax;

        dp5mMinEl.textContent = result.dp5mMin;
        dp5mAvgEl.textContent = result.dp5mAvg;
        dp5mMaxEl.textContent = result.dp5mMax;

        castsPerMinuteEl.textContent = result.castsPerMinute;
    });
}