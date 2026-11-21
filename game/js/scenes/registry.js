// Registry of all 5 escalating Spot-the-Difference folio plates (35 total differences).

import { clockmakerScene } from './clockmaker.js';
import { harborCafeScene } from './harborCafe.js';
import { conservatoryScene } from './conservatory.js';
import { observatoryScene } from './observatory.js';
import { expressPlatformScene } from './expressPlatform.js';

export const SCENES = [
  clockmakerScene,
  harborCafeScene,
  conservatoryScene,
  observatoryScene,
  expressPlatformScene,
];

export const TOTAL_FOLIO_DIFFERENCES = SCENES.reduce((sum, s) => sum + s.differences.length, 0);
