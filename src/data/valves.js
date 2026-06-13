export const valves = [
  {
    id: 'gate-valve',
    name: 'Gate Valve',
    description: 'A linear-motion isolation valve primarily used to fully start or stop fluid flow. Not suitable for throttling.',
    parts: {
      body: {
        title: 'Valve Body',
        function: 'The primary pressure-containing structure that connects to the pipeline and houses all internal components.',
        material: 'Cast Iron, Carbon Steel, or Stainless Steel depending on pressure and corrosiveness.',
        failure: 'Cracking from thermal shock or casting defects; erosion over time.'
      },
      bonnet: {
        title: 'Bonnet',
        function: 'The cover on the valve body that protects internal parts and houses the stem packing. Usually bolted or threaded to the body.',
        material: 'Matches the body material (Cast Iron, Carbon Steel).',
        failure: 'Gasket leaks between the body and bonnet due to pressure spikes.'
      },
      gate: {
        title: 'Gate (Wedge)',
        function: 'The closure element that moves perpendicular to the flow to physically block or allow media passage.',
        material: 'Stainless Steel or hard-faced alloys to resist erosion.',
        failure: 'Erosion or cavitation if used for throttling; jamming due to pipeline debris.'
      },
      seat: {
        title: 'Seat',
        function: 'The 360° mating surface that the gate contacts to ensure a tight, leak-proof seal.',
        material: 'Stellite, Stainless Steel, or specialized elastomers.',
        failure: 'Scoring or scratching from particulate matter leading to internal passing (leakage).'
      },
      stem: {
        title: 'Stem',
        function: 'The threaded rod connecting the handwheel to the gate, converting rotational motion to linear motion.',
        material: 'Forged Stainless Steel (high tensile strength).',
        failure: 'Bending from excessive force (e.g., valve wrenches), thread wear, or corrosion.'
      },
      packing: {
        title: 'Stem Packing',
        function: 'Sealing material placed inside the stuffing box to prevent external leakage where the stem exits the bonnet.',
        material: 'Graphite, Teflon (PTFE), or specialized braided fibers.',
        failure: 'Deterioration over time causing external leaks; requires regular tightening of the gland.'
      },
      yoke: {
        title: 'Yoke & Yoke Nut',
        function: 'The yoke supports the handwheel, and the internally threaded yoke nut turns to lift the non-rotating stem (OS&Y design).',
        material: 'Cast Iron or Steel.',
        failure: 'Stripped threads due to lack of lubrication or extreme forces.'
      },
      handwheel: {
        title: 'Handwheel',
        function: 'The manual actuator used by operators to apply torque to the yoke nut.',
        material: 'Cast Iron or Aluminum.',
        failure: 'Physical breakage from improper tool use.'
      }
    }
  },
  {
    id: 'globe-valve',
    name: 'Globe Valve',
    description: 'A linear-motion valve designed to stop, start, and regulate (throttle) fluid flow. Features a spherical body shape.',
    parts: {
      body: { title: 'Valve Body', function: 'Houses internals and directs flow in an S-pattern.', material: 'Carbon Steel', failure: 'Erosion' }
      // Placeholder for other valves
    }
  }
];
