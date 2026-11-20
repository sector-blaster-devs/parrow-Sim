export type LegalTabId = 'credits' | 'terms' | 'privacy';

export interface CreditEntry {
  title: string;
  role: string;
  license: string;
  attribution: string;
  details: string;
  verbatimLicense?: string;
}

export interface CreditCategory {
  heading: string;
  entries: CreditEntry[];
}

export interface LegalTemplateSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocumentTemplate {
  title: string;
  subtitle: string;
  templateNotice: string;
  sections: LegalTemplateSection[];
}

const MIT_LICENSE_TEMPLATE = `MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

const THREE_MIT_LICENSE = `The MIT License

Copyright © 2010-2026 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

const CANNON_MIT_LICENSE = `The MIT License (MIT)

Copyright (c) 2015 cannon.js Authors
Copyright (c) 2020-present cannon-es Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

const VITE_MIT_LICENSE = `MIT License

Copyright (c) 2019-present, VoidZero Inc. and Vite contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

const TYPESCRIPT_APACHE_SUMMARY = `Apache License, Version 2.0 (January 2004)
Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:
https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`;

export const CREDITS_CATEGORIES: CreditCategory[] = [
  {
    heading: 'Application & Original Source Code',
    entries: [
      {
        title: 'Remix Sparrow Sim (Sparrow Game)',
        role: 'Core Gameplay, Avian Flight Controller, Camera, HUD & Vignette Director',
        license: 'MIT License (Project Template)',
        attribution: 'Copyright © [Year] [Developer / Studio Name]',
        details:
          'Original TypeScript application architecture (src/GameApp.ts, src/entities/SparrowController.ts, src/camera/BirdCamera.ts, src/game/VignetteDirector.ts, src/physics/PhysicsWorld.ts, and src/ui/*) implementing third-person passerine flight, perching, 12 neighborhood deeds, and responsive desktop/mobile controls.',
        verbatimLicense: MIT_LICENSE_TEMPLATE,
      },
    ],
  },
  {
    heading: '3D Mesh Pack & Procedural Geometry System',
    entries: [
      {
        title: 'Sculptor Procedural Mesh Pack (In-House Geometry Engine)',
        role: '100% Runtime-Generated 3D Models, Props, Characters & Architecture',
        license: 'Original Procedural Assets (Same License as Application)',
        attribution: 'Generated procedurally via src/geometry/Sculptor.ts — zero external .glb/.gltf mesh packs or bitmap texture packs',
        details:
          'Every mesh in the game is synthesized directly into indexed vertex-colored BufferGeometries at startup with analytic vertical ambient occlusion and zero image textures. Built atop Three.js RoundedBoxGeometry and BufferGeometryUtils.',
      },
      {
        title: 'Avian Character Mesh Pack',
        role: '7 Procedural Songbird & Pigeon Species',
        license: 'Original Procedural Assets',
        attribution: 'src/entities/SparrowMesh.ts',
        details:
          'House Sparrow, Blue Tit, European Robin, Goldfinch, Warbler, Finch, and Rock Pigeon models featuring non-uniform C1 cubic Hermite lofted torsos, articulated multi-segment wings, fanned tail rectrices, and inverse-kinematic avian leg rigs.',
      },
      {
        title: 'Interactive Props & Street Furniture Mesh Pack',
        role: 'Boulangerie, Bistro, Park & Atelier Props',
        license: 'Original Procedural Assets',
        attribution: 'src/world/PropFactory.ts & src/geometry/Sculptor.ts',
        details:
          'Procedural croissants, baguettes, gelato cones, porcelain teacups and plates, ceramic mugs, to-go coffee cups, pigment jars, terracotta pots, glass carafes, vintage Parisian bicycles, park benches, café umbrellas, brass birdcage, eyeglasses, brass key, breadcrumbs, coins, blossoms, and paper airplanes.',
      },
      {
        title: 'European Neighborhood & Citizens Mesh Pack',
        role: '4-Block Cityscape, Conservatory Atelier & Townsfolk',
        license: 'Original Procedural Assets',
        attribution: 'src/world/TownhouseBuilder.ts, src/world/CityBlockBuilder.ts, src/entities/NPCManager.ts & src/world/NPCManifest.ts',
        details:
          'Haussmannian townhouses, hinged French casement windows, Conservatory Atelier, Boulangerie-Patisserie, Clocktower & Sky Sanctuary Nest, canal bridges and boats, tramway, cast-iron streetlamps, Morris poster columns, articulated botanical trees, flat-bottomed cumulus clouds, and stylized human citizens.',
      },
    ],
  },
  {
    heading: 'Shaders, Audio & Artistic References',
    entries: [
      {
        title: 'Storybook Gouache Rendering & TSL Shaders',
        role: 'Cel Lighting Model, GTAO, Cascaded Shadows & Sky Dome',
        license: 'Original TSL Shader Code (using Three.js Shading Language)',
        attribution: 'src/rendering/StorybookMaterial.ts, src/rendering/Palette.ts & src/rendering/WorldFX.ts',
        details:
          'Three-band matte gouache cel shading (StorybookCelLightingModel), screen-space GTAO (three/addons/tsl/display/GTAONode.js), 3-cascade shadow mapping (three/examples/jsm/csm/CSMShadowNode.js), foliage wind sway, canal water shimmer, and instanced feather/ripple VFX.',
      },
      {
        title: 'Acoustic Soundtrack & 3D Spatial Audio Engine',
        role: 'Real-Time Procedural Web Audio Synthesizer & Foley',
        license: 'Original Procedural Audio (Web Audio API)',
        attribution: 'src/audio/AcousticSoundtrack.ts',
        details:
          'All music, 3D HRTF bird chorus, glottal syrinx chirps, wing-flap aerodynamics, and ceramic/water foley are synthesized in real time using browser Web Audio nodes—zero external .mp3 or .wav audio packs. Generative modal mallet motifs reference minimalist acoustic traditions (Steve Reich, Nils Frahm, Penguin Cafe Orchestra).',
      },
      {
        title: 'Architectural, Geometric & UI References',
        role: 'Visual, Mathematical & Interface Design Inspirations',
        license: 'Design & Algorithmic References',
        attribution: 'Codebase Architecture & Public Geometric Literature',
        details:
          'References Parisian Haussmannian streetscapes, mansard slate roofs, wrought-iron Juliet balconies, and French-postcard print typography; non-uniform C1 cubic Hermite spline lofting, Catmull-Rom curves, Frenet-Serret frames, and superellipse cross-sections; plus system humanist sans-serif typography (Avenir Next, Segoe UI, system-ui) and an inline SVG sparrow silhouette (index.html).',
      },
    ],
  },
  {
    heading: 'Third-Party Code & Open-Source Dependencies',
    entries: [
      {
        title: 'three (Three.js) & @types/three',
        role: '3D WebGPU / WebGL2 Engine, TSL, Addons (v0.187.0)',
        license: 'MIT License',
        attribution: 'Copyright © 2010-2026 three.js authors',
        details:
          'Provides WebGPURenderer, Three.js Shading Language (three/tsl), RoundedBoxGeometry, BufferGeometryUtils, GTAONode, CSMShadowNode, and scene-graph math.',
        verbatimLicense: THREE_MIT_LICENSE,
      },
      {
        title: 'cannon-es',
        role: '3D Rigid-Body Physics & Collision Simulation (v0.20.0)',
        license: 'MIT License',
        attribution: 'Copyright (c) 2015 cannon.js Authors & cannon-es Contributors',
        details:
          'Powers dynamic interactive props, static architectural colliders, updraft thermal zones, water basin buoyancy/splash detection, and camera obstacle raycasting.',
        verbatimLicense: CANNON_MIT_LICENSE,
      },
      {
        title: 'Vite',
        role: 'Build Tool & Development Server (v8.3.0)',
        license: 'MIT License',
        attribution: 'Copyright (c) 2019-present, VoidZero Inc. and Vite contributors',
        details:
          'Used for ES module bundling, asset chunking (vendor-three, vendor-physics), and local development serving.',
        verbatimLicense: VITE_MIT_LICENSE,
      },
      {
        title: 'TypeScript & @types/node',
        role: 'Static Type Checking & Node Type Definitions (TS v7.0.2, @types/node v22.14.0)',
        license: 'Apache License 2.0 (TypeScript) · MIT License (@types/node)',
        attribution: 'Copyright (c) Microsoft Corporation · DefinitelyTyped Contributors',
        details:
          'Used during development and build verification (tsc --noEmit) for strict TypeScript compilation.',
        verbatimLicense: TYPESCRIPT_APACHE_SUMMARY,
      },
    ],
  },
];

export const TERMS_OF_USE_TEMPLATE: LegalDocumentTemplate = {
  title: 'Terms of Use (Template)',
  subtitle: 'Effective Date: [Effective Date] · Last Updated: [Last Updated Date]',
  templateNotice:
    'Template Notice: Replace bracketed placeholders such as [Developer / Company Name], [Contact Email], and [Jurisdiction] with your own legal details before publishing.',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      paragraphs: [
        'By accessing or playing Remix Sparrow Sim ("the Application") hosted at [Website URL], you agree to be bound by these Terms of Use ("Terms"), operated by [Developer / Company Name] ("we", "us", or "our"). If you do not agree to these Terms, please discontinue use of the Application.',
      ],
    },
    {
      heading: '2. License to Use the Application',
      paragraphs: [
        'Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and interact with the Application in a compatible web browser for personal, non-commercial entertainment and evaluation purposes, unless otherwise permitted under the applicable open-source repository license.',
      ],
    },
    {
      heading: '3. Intellectual Property & Open-Source Components',
      paragraphs: [
        'All original source code, procedural geometry routines, shaders, audio synthesis algorithms, visual styling, and game design in the Application remain the property of [Developer / Company Name] and its contributors, subject to any open-source license stated in the repository.',
        'Third-party libraries (including Three.js, cannon-es, Vite, and TypeScript) are governed by their respective MIT and Apache 2.0 licenses as detailed in the Credits & Licenses section.',
      ],
    },
    {
      heading: '4. Acceptable Use',
      paragraphs: ['When accessing the Application, you agree not to:'],
      bullets: [
        'Use the Application in any manner that violates applicable local, national, or international laws.',
        'Attempt to disrupt, overload, probe, or interfere with the hosting infrastructure serving the Application.',
        'Misrepresent authorship of third-party open-source dependencies or remove required copyright and license notices.',
      ],
    },
    {
      heading: '5. Technical Requirements & Availability',
      paragraphs: [
        'The Application relies on client-side browser capabilities including WebGPU or WebGL2, Web Audio API, and standard pointer, keyboard, or touch input APIs. Performance, frame rate, and visual fidelity vary by device hardware and browser version. We do not guarantee uninterrupted availability or compatibility with all devices.',
      ],
    },
    {
      heading: '6. Disclaimer of Warranties',
      paragraphs: [
        'THE APPLICATION IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ERROR-FREE OPERATION.',
      ],
    },
    {
      heading: '7. Limitation of Liability',
      paragraphs: [
        'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL [DEVELOPER / COMPANY NAME] OR ITS CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR GOODWILL ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE APPLICATION.',
      ],
    },
    {
      heading: '8. Changes & Governing Law',
      paragraphs: [
        'We may update these Terms from time to time by posting the revised version with an updated effective date. These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction / State, Country], without regard to conflict-of-law principles.',
      ],
    },
    {
      heading: '9. Contact Information',
      paragraphs: [
        'Questions regarding these Terms of Use may be directed to [Developer / Company Name] at [Contact Email].',
      ],
    },
  ],
};

export const PRIVACY_POLICY_TEMPLATE: LegalDocumentTemplate = {
  title: 'Privacy Policy (Template)',
  subtitle: 'Effective Date: [Effective Date] · Last Updated: [Last Updated Date]',
  templateNotice:
    'Template Notice: Customize bracketed placeholders ([Developer / Company Name], [Hosting Provider], [Contact Email], [Jurisdiction]) and update Section 3 if you later add analytics, crash reporting, or cloud saves.',
  sections: [
    {
      heading: '1. Overview & Client-Side Architecture',
      paragraphs: [
        '[Developer / Company Name] ("we", "us", or "our") respects your privacy. Remix Sparrow Sim is designed as a 100% client-side browser experience.',
        'By default, the Application does not require user accounts, does not collect personal information, does not set tracking cookies, does not persist data in localStorage or IndexedDB, and does not transmit gameplay telemetry or analytics to external servers.',
      ],
    },
    {
      heading: '2. Data Processed Locally in Your Browser',
      paragraphs: [
        'To render the 3D neighborhood and respond to controls, the Application processes transient technical state strictly in volatile memory (RAM) on your device:',
      ],
      bullets: [
        'Graphics capabilities (WebGPU / WebGL2 context availability, screen dimensions, and device pixel ratio).',
        'Input events (keyboard keys, mouse pointer lock / drag deltas, and touch gestures) used solely to steer the character and UI.',
        'Web Audio API playback state (mute toggle and real-time synthesized soundscape).',
      ],
    },
    {
      heading: '3. Hosting Infrastructure & Server Logs',
      paragraphs: [
        'When your browser downloads the static application files from [Hosting Provider, e.g., GitHub Pages / Google Cloud Run / Static CDN], the hosting provider may automatically record standard HTTP access logs (such as IP address, browser user-agent string, requested URL, and timestamp) for security, abuse prevention, and reliability in accordance with [Hosting Provider]’s privacy policy.',
        'If you integrate optional third-party analytics or error monitoring in a customized deployment, disclose those services, data categories, and opt-out mechanisms here.',
      ],
    },
    {
      heading: '4. Cookies & Local Storage',
      paragraphs: [
        'The Application sets no first-party or third-party advertising, tracking, or analytics cookies and stores no persistent browser identifiers.',
      ],
    },
    {
      heading: '5. Children’s Privacy',
      paragraphs: [
        'Because the Application does not knowingly collect or store personal data from any user, it does not knowingly collect personal information from children under 13 (or the applicable age of digital consent in your jurisdiction). If you believe personal data was inadvertently submitted via external contact channels, contact us at [Contact Email] to request deletion.',
      ],
    },
    {
      heading: '6. Your Privacy Rights (GDPR / CCPA Template)',
      paragraphs: [
        'Depending on your jurisdiction (such as the EEA, UK, or California), you may have rights to access, correct, delete, or restrict processing of personal data. While the Application itself stores no personal data, you may direct any privacy inquiry regarding hosting logs or correspondence to [Contact Email].',
      ],
    },
    {
      heading: '7. Changes to This Policy & Contact',
      paragraphs: [
        'We may update this Privacy Policy template as the Application evolves. For questions or privacy requests, please contact [Developer / Company Name] at [Contact Email] or by mail at [Mailing Address, Optional], governed by the laws of [Jurisdiction].',
      ],
    },
  ],
};

export function formatLegalTemplateAsPlainText(doc: LegalDocumentTemplate): string {
  const lines: string[] = [doc.title, doc.subtitle, '', doc.templateNotice, ''];
  for (const section of doc.sections) {
    lines.push(section.heading);
    for (const p of section.paragraphs) {
      lines.push(p);
    }
    if (section.bullets) {
      for (const b of section.bullets) {
        lines.push(`- ${b}`);
      }
    }
    lines.push('');
  }
  return lines.join('\n').trim();
}
