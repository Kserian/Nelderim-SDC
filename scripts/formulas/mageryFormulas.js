
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
  dpsMin: (min / time).toFixed(2),
  dpsAvg: (avg / time).toFixed(2),
  dpsMax: (max / time).toFixed(2),
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
  dpsMin: (min / time).toFixed(2),
  dpsAvg: (avg / time).toFixed(2),
  dpsMax: (max / time).toFixed(2),
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
  dpsMin: (min / time).toFixed(2),
  dpsAvg: (avg / time).toFixed(2),
  dpsMax: (max / time).toFixed(2),
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
  dpsMin: (min / time).toFixed(2),
  dpsAvg: (avg / time).toFixed(2),
  dpsMax: (max / time).toFixed(2),
  dpmMin: (min / time * 60).toFixed(0),
  dpmAvg: (avg / time * 60).toFixed(0),
  dpmMax: (max / time * 60).toFixed(0),
  dp5mMin: (min / time * 300).toFixed(0),
  dp5mAvg: (avg / time * 300).toFixed(0),
  dp5mMax: (max / time * 300).toFixed(0),
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
  dpsMin: (min / time).toFixed(2),
  dpsAvg: (avg / time).toFixed(2),
  dpsMax: (max / time).toFixed(2),
  dpmMin: (min / time * 60).toFixed(0),
  dpmAvg: (avg / time * 60).toFixed(0),
  dpmMax: (max / time * 60).toFixed(0),
  dp5mMin: (min / time * 300).toFixed(0),
  dp5mAvg: (avg / time * 300).toFixed(0),
  dp5mMax: (max / time * 300).toFixed(0),
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
  dpsMin: (min / time).toFixed(2),
  dpsAvg: (avg / time).toFixed(2),
  dpsMax: (max / time).toFixed(2),
  dpmMin: (min / time * 60).toFixed(0),
  dpmAvg: (avg / time * 60).toFixed(0),
  dpmMax: (max / time * 60).toFixed(0),
  dp5mMin: (min / time * 300).toFixed(0),
  dp5mAvg: (avg / time * 300).toFixed(0),
  dp5mMax: (max / time * 300).toFixed(0),
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
  dpsMin: (min / time).toFixed(2),
  dpsAvg: (avg / time).toFixed(2),
  dpsMax: (max / time).toFixed(2),
  dpmMin: (min / time * 60).toFixed(0),
  dpmAvg: (avg / time * 60).toFixed(0),
  dpmMax: (max / time * 60).toFixed(0),
  dp5mMin: (min / time * 300).toFixed(0),
  dp5mAvg: (avg / time * 300).toFixed(0),
  dp5mMax: (max / time * 300).toFixed(0),
  castsPerMinute: Math.floor(60 / time)
};

}



