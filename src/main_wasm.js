import { performance } from "perf_hooks";
import * as nbody_fs from "../out/pkg/fable_nbody.js";

function measureTime(f) {
    const t0 = performance.now();
    let res = f();
    const t1 = performance.now();
    return [res, t1 - t0];
}

function main() {
    const dt = 0.01;
    const steps = 50_000_000;
    const energy0 = nbody_fs.init();
    // nbody_fs.bench(10, dt); // warmup
    const [energy, elapsed] = measureTime(() => nbody_fs.bench(steps, dt));

    console.log(`NBody steps: ${steps}, increment: ${dt}`);
    console.log(`Start Energy: ${energy0}`);
    console.log(`Final Energy: ${energy}, elapsed: ${(elapsed / 1000).toFixed(3)} sec`);
    console.log("    Expected: -0.16905990681396785 (for 50 million steps)") //50m
}

main();
