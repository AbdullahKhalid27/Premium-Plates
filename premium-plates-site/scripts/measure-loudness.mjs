#!/usr/bin/env node
/**
 * scripts/measure-loudness.mjs
 * 
 * Measures audio integrated loudness of video/audio files using FFmpeg EBU R128 filter.
 * Validates against Requirement R3: Integrated loudness between -16.0 and -12.0 LUFS.
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const TARGET_MIN_LUFS = -16.0;
const TARGET_MAX_LUFS = -12.0;
const NOMINAL_LUFS = -14.0;

function parseArgs() {
  const args = process.argv.slice(2);
  let filePath = null;
  let jsonOutput = false;
  let exitOnFail = true;

  for (const arg of args) {
    if (arg === '--json') jsonOutput = true;
    else if (arg === '--no-exit-code' || arg === '--allow-fail') exitOnFail = false;
    else if (!arg.startsWith('--') && !filePath) filePath = arg;
  }

  if (!filePath) {
    filePath = path.resolve('public/media/night-drive-cinematic.mp4');
  } else {
    filePath = path.resolve(filePath);
  }

  return { filePath, jsonOutput, exitOnFail };
}

async function measureLoudness(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Target media file not found: ${filePath}`);
  }

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-i', filePath, '-af', 'ebur128', '-f', 'null', '-'], {
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stderr = '';
    ffmpeg.stderr.on('data', chunk => {
      stderr += chunk.toString();
    });

    ffmpeg.on('error', err => {
      reject(new Error(`Failed to spawn ffmpeg: ${err.message}`));
    });

    ffmpeg.on('close', code => {
      if (code !== 0 && !stderr.includes('Summary:')) {
        return reject(new Error(`ffmpeg exited with code ${code}: ${stderr}`));
      }

      // Parse summary block
      const integratedMatch = stderr.match(/Integrated loudness:\s+I:\s+([-\d.]+)\s+LUFS/i);
      const lraMatch = stderr.match(/Loudness range:\s+LRA:\s+([-\d.]+)\s+LU/i);
      const thresholdMatch = stderr.match(/Threshold:\s+([-\d.]+)\s+LUFS/i);
      const lraLowMatch = stderr.match(/LRA low:\s+([-\d.]+)\s+LUFS/i);
      const lraHighMatch = stderr.match(/LRA high:\s+([-\d.]+)\s+LUFS/i);

      if (!integratedMatch) {
        return reject(new Error('Could not parse integrated loudness (I) from ffmpeg ebur128 output.'));
      }

      const integratedLufs = parseFloat(integratedMatch[1]);
      const lra = lraMatch ? parseFloat(lraMatch[1]) : null;
      const threshold = thresholdMatch ? parseFloat(thresholdMatch[1]) : null;
      const lraLow = lraLowMatch ? parseFloat(lraLowMatch[1]) : null;
      const lraHigh = lraHighMatch ? parseFloat(lraHighMatch[1]) : null;

      const isCompliant = integratedLufs >= TARGET_MIN_LUFS && integratedLufs <= TARGET_MAX_LUFS;

      resolve({
        filePath,
        integratedLufs,
        lra,
        threshold,
        lraLow,
        lraHigh,
        targetMin: TARGET_MIN_LUFS,
        targetMax: TARGET_MAX_LUFS,
        targetNominal: NOMINAL_LUFS,
        isCompliant,
        diffFromTarget: Number((integratedLufs - NOMINAL_LUFS).toFixed(2)),
      });
    });
  });
}

async function main() {
  const { filePath, jsonOutput, exitOnFail } = parseArgs();

  try {
    const result = await measureLoudness(filePath);

    if (jsonOutput) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('\n========================================');
      console.log('  EBU R128 AUDIO LOUDNESS MEASUREMENT');
      console.log('========================================');
      console.log(`Media File   : ${path.relative(process.cwd(), result.filePath)}`);
      console.log(`Measured (I) : ${result.integratedLufs.toFixed(1)} LUFS`);
      console.log(`Target Range : [${result.targetMin.toFixed(1)} to ${result.targetMax.toFixed(1)} LUFS] (Nominal: ${result.targetNominal.toFixed(1)} LUFS)`);
      if (result.lra !== null) console.log(`LRA (Range)  : ${result.lra.toFixed(1)} LU`);
      console.log('----------------------------------------');

      if (result.isCompliant) {
        console.log(`STATUS       : PASS ✓ (Audio loudness conforms to R3 specification)\n`);
      } else {
        console.log(`STATUS       : FAIL ✗ (Audio loudness out of specification)`);
        console.log(`Delta        : ${result.diffFromTarget > 0 ? '+' : ''}${result.diffFromTarget.toFixed(1)} dB relative to nominal -14 LUFS`);
        if (result.integratedLufs < result.targetMin) {
          console.log(`Remediation  : Track is too quiet (${result.integratedLufs} LUFS < ${result.targetMin} LUFS).`);
          console.log(`               Remaster using: ffmpeg -i input.mp4 -af "loudnorm=I=-14:LRA=7:tp=-1" -c:v copy -c:a aac -b:a 192k output.mp4\n`);
        } else {
          console.log(`Remediation  : Track is too loud (${result.integratedLufs} LUFS > ${result.targetMax} LUFS).\n`);
        }
      }
    }

    if (!result.isCompliant && exitOnFail) {
      process.exit(1);
    }
    process.exit(0);
  } catch (err) {
    if (jsonOutput) {
      console.error(JSON.stringify({ error: err.message }));
    } else {
      console.error(`\n[ERROR] Audio measurement failed: ${err.message}\n`);
    }
    process.exit(1);
  }
}

main();
