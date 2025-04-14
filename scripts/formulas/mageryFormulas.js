
function formatDps(value) {
    return (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1));
}

function scale(value, percent) {
    return (value * percent) / 100;
}

export function calculateMagicArrowRange(caster, time) {
    const { int, evalInt, scribe, sdi } = caster;

    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;

    const results = [1, 2, 3, 4].map(roll => {
        let damage = (roll + 10) * 100;

        const evalScale = 30 + Math.floor((9 * evalFixed) / 100);
        damage = scale(damage, evalScale);

        const scribeBonus = scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200);
        const bonus = scribeBonus + Math.floor(int / 10) + sdi;
        damage = scale(damage, 100 + bonus);

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const dps = (avg / time).toFixed(2);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avg / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avg / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };

}

export function calculateHarmDamage(caster, distance, time) {
    const { int, evalInt, scribe, sdi } = caster;
    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;

    const results = [1, 2, 3, 4, 5].map(roll => {
        let damage = (roll + 17) * 100;
        damage = scale(damage, 30 + Math.floor((9 * evalFixed) / 100));
        damage = scale(damage, 100 + Math.floor(int / 10) + sdi + (scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200)));

        if (distance > 2) damage *= 0.25;
        else if (distance > 1) damage *= 0.5;

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const avgRaw = results.reduce((sum, r) => sum + r.raw, 0) / results.length;
    const dps = (avgRaw / time).toFixed(2);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avg / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avg / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };

}

export function calculateFireballDamage(caster, time) {
    const { int, evalInt, scribe, sdi } = caster;

    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;

    const results = [1, 2, 3, 4, 5].map(roll => {
        let damage = (roll + 19) * 100; // 19 + (1–5) → 20–24

        const evalScale = 30 + Math.floor((9 * evalFixed) / 100);
        damage = scale(damage, evalScale);

        const scribeBonus = scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200);
        const bonus = scribeBonus + Math.floor(int / 10) + sdi;
        damage = scale(damage, 100 + bonus);

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const avgRaw = results.reduce((sum, r) => sum + r.raw, 0) / results.length;
    const dps = (avgRaw / time).toFixed(2);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avg / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avg / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };

}

export function calculateLightningDamage(caster, time) {
    const { int, evalInt, scribe, sdi } = caster;
    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;

    const results = [1, 2, 3, 4].map(roll => {
        let damage = (roll + 23) * 100;

        const evalScale = 30 + Math.floor((9 * evalFixed) / 100);
        damage = scale(damage, evalScale);

        const scribeBonus = scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200);
        const bonus = scribeBonus + Math.floor(int / 10) + sdi;
        damage = scale(damage, 100 + bonus);

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const avgRaw = results.reduce((sum, r) => sum + r.raw, 0) / results.length;
    const dps = (avgRaw / time).toFixed(2);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avg / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avg / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };
}

export function calculateMindBlastDamage(caster, time) {
    const { int, magery, sdi } = caster;
    const cappedInt = Math.min(int, 200);
    const base = Math.floor((cappedInt + magery) / 5);

    const minRaw = Math.min(60, base + 2);
    const maxRaw = Math.min(60, base + 6 + 4); // +6 max z pierwszego rzutu, +4 z drugiego

    const scaledMin = minRaw * (1 + sdi / 100);
    const scaledMax = maxRaw * (1 + sdi / 100);
    const avgRaw = (scaledMin + scaledMax) / 2;

    const min = Math.floor(scaledMin);
    const max = Math.floor(scaledMax);
    const avg = Math.floor(avgRaw);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avgRaw / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avgRaw / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avgRaw / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };
}

export function calculateEnergyBoltDamage(caster, time) {
    const { int, evalInt, scribe, sdi } = caster;

    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;

    const results = [1, 2, 3, 4, 5].map(roll => {
        let base = 40 + roll; // 41–45
        let damage = base * 100;

        const evalScale = 30 + Math.floor((9 * evalFixed) / 100);
        damage = scale(damage, evalScale);

        const scribeBonus = scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200);
        const bonus = scribeBonus + Math.floor(int / 10) + sdi;
        damage = scale(damage, 100 + bonus);

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const avgRaw = results.reduce((sum, r) => sum + r.raw, 0) / results.length;

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min * 60 / time).toFixed(0),
        dpmAvg: (avg * 60 / time).toFixed(0),
        dpmMax: (max * 60 / time).toFixed(0),
        dp5mMin: (min * 300 / time).toFixed(0),
        dp5mAvg: (avg * 300 / time).toFixed(0),
        dp5mMax: (max * 300 / time).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };

}


export function calculateMeteorSwarmDamage(caster, enemyCount, time) {
    const { int, evalInt, scribe, sdi } = caster;
    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;
    const count = Math.max(1, enemyCount);

    const results = [1, 2, 3, 4, 5].map(roll => {
        let damage = (roll + 51) * 100;
        damage = scale(damage, 30 + Math.floor((9 * evalFixed) / 100));
        damage = scale(damage, 100 + Math.floor(int / 10) + sdi + (scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200)));
        if (count > 2) damage = (damage * 2) / count;

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const avgRaw = results.reduce((sum, r) => sum + r.raw, 0) / results.length;
    const dps = (avgRaw / time).toFixed(2);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avg / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avg / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };

}

export function calculateChainLightningDamage(caster, enemyCount, time) {
    const { int, evalInt, scribe, sdi } = caster;
    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;
    const count = Math.max(1, enemyCount);

    const results = [1, 2, 3, 4, 5].map(roll => {
        let damage = (51 + roll) * 100;
        damage = scale(damage, 30 + Math.floor((9 * evalFixed) / 100));
        damage = scale(damage, 100 + Math.floor(int / 10) + sdi + (scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200)));
        if (count > 2) damage = (damage * 2) / count;

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min * 60 / time).toFixed(0),
        dpmAvg: (avg * 60 / time).toFixed(0),
        dpmMax: (max * 60 / time).toFixed(0),
        dp5mMin: (min * 300 / time).toFixed(0),
        dp5mAvg: (avg * 300 / time).toFixed(0),
        dp5mMax: (max * 300 / time).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };
}

export function calculateExplosionDamage(caster, time) {
    const { int, evalInt, scribe, sdi } = caster;
    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;

    const results = [1, 2, 3, 4, 5].map(roll => {
        let damage = (roll + 40) * 100;
        damage = scale(damage, 30 + Math.floor((9 * evalFixed) / 100));
        damage = scale(damage, 100 + Math.floor(int / 10) + sdi + (scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200)));

        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const avgRaw = results.reduce((sum, r) => sum + r.raw, 0) / results.length;
    const dps = (avgRaw / time).toFixed(2);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avg / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avg / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };

}

export function calculateFlameStrikeDamage(caster, time) {
    const { int, evalInt, scribe, sdi } = caster;
    const evalFixed = evalInt * 10;
    const scribeFixed = scribe * 10;

    const results = [1, 2, 3, 4, 5].map(roll => {
        let damage = (48 + roll) * 100; 
        damage = scale(damage, 30 + Math.floor((9 * evalFixed) / 100));
        damage = scale(damage, 100 + Math.floor(int / 10) + sdi + (scribeFixed >= 1000 ? 10 : Math.floor(scribeFixed / 200)));
        return {
            raw: damage / 100,
            floored: Math.floor(damage / 100)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min * 60 / time).toFixed(0),
        dpmAvg: (avg * 60 / time).toFixed(0),
        dpmMax: (max * 60 / time).toFixed(0),
        dp5mMin: (min * 300 / time).toFixed(0),
        dp5mAvg: (avg * 300 / time).toFixed(0),
        dp5mMax: (max * 300 / time).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };
}


export function calculateEarthquakeDamage(targetHp, isPlayer = false, time) {
    const rngBonuses = [0, 5, 10, 15];

    const results = rngBonuses.map(rng => {
        let damage = targetHp / 2;
        if (!isPlayer) {
            damage = Math.max(Math.min(damage, 100), 15);
        }
        damage += rng;

        return {
            raw: damage,
            floored: Math.floor(damage)
        };
    });

    const min = Math.min(...results.map(r => r.floored));
    const max = Math.max(...results.map(r => r.floored));
    const avg = (min + max) / 2;

    const avgRaw = results.reduce((sum, r) => sum + r.raw, 0) / results.length;
    const dps = (avgRaw / time).toFixed(2);

    return {
        min,
        avg,
        max,
        dpsMin: formatDps(min / time),
        dpsAvg: formatDps(avg / time),
        dpsMax: formatDps(max / time),
        dpmMin: (min / time * 60).toFixed(0),
        dpmAvg: (avg / time * 60).toFixed(0),
        dpmMax: (max / time * 60).toFixed(0),
        dp5mMin: (min / time * 300).toFixed(0),
        dp5mAvg: (avg / time * 300).toFixed(0),
        dp5mMax: (max / time * 300).toFixed(0),
        castsPerMinute: Math.floor(60 / time)
    };

}



