const eduDataEN = {
    buck: [
        '<h3>Buck Converter</h3><ul><li>Output voltage is always <code>lower</code> than input.</li><li>MOSFET switches at high frequency.</li><li>Inductor stores energy when switch is ON.</li></ul>',
        '<h3>Key Formulas</h3><ul><li>Conversion Ratio: <code>Vout = D × Vin</code></li><li>Duty Cycle: <code>D = ton / T</code></li></ul>',
        '<h3>Components Role</h3><ul><li><code>MOSFET</code>: Main switch driven by PWM.</li><li><code>Freewheeling Diode</code>: Maintains current flow when switch is OFF.</li></ul>',
        '<h3>Industrial Applications</h3><ul><li>Computer ATX Power Supplies</li><li>Point-of-Load (PoL) Regulators</li></ul>'
    ],
    boost: [
        '<h3>Boost Converter</h3><ul><li>Output voltage is always <code>higher</code> than input.</li></ul>',
        '<h3>Key Formulas</h3><ul><li>Conversion Ratio: <code>Vout = Vin / (1 − D)</code></li></ul>',
        '<h3>Components Role</h3><ul><li><code>Inductor</code>: Energy storage & voltage booster.</li></ul>',
        '<h3>Industrial Applications</h3><ul><li>Active PFC Pre-regulators</li></ul>'
    ],
    buck_boost: [
        '<h3>Buck-Boost Converter</h3><ul><li>Output can be <code>higher or lower</code> than input with inverted polarity.</li></ul>',
        '<h3>Key Formulas</h3><ul><li>Ratio: <code>Vout = −Vin × D / (1 − D)</code></li></ul>',
        '<h3>Components Role</h3><ul><li><code>Inductor</code>: Main energy transfer element.</li></ul>',
        '<h3>Industrial Applications</h3><ul><li>Negative Voltage Power Supplies</li></ul>'
    ],
    rectifier: [
        '<h3>Bridge Rectifier</h3><ul><li>Converts both AC half-cycles to DC using 4 diodes.</li></ul>',
        '<h3>Key Formulas</h3><ul><li>Average DC: <code>Vdc = 2Vm / π − 2Vf</code></li></ul>',
        '<h3>Components Role</h3><ul><li><code>Bridge Diodes</code>: Full-wave rectification.</li></ul>',
        '<h3>Industrial Applications</h3><ul><li>Input stage of AC-DC PSUs</li></ul>'
    ],

    centertap: [
        '<h3>Center-Tapped Full-Wave Rectifier</h3><ul><li>Converts both half-cycles of AC into DC using a center-tapped transformer.</li><li>Uses only two diodes compared to a bridge rectifier.</li></ul>',
        '<h3>Key Formulas</h3><ul><li><code>Vdc = 2Vm / π ≈ 0.636 × Vm</code></li><li><code>PIV = 2Vm</code> (Peak Inverse Voltage across diodes)</li></ul>',
        '<h3>Component Roles</h3><ul><li><code>Center-Tapped Transformer</code>: Splits the AC phase into two opposite signals.</li><li><code>Diodes</code>: Conduct alternately for each half-cycle.</li></ul>',
        '<h3>Industrial Applications</h3><ul><li>Dual-polarity power supplies (e.g., +12V / -12V)</li><li>Low voltage, high current power adapters</li></ul>'
    ],
    halfwave: [
        '<h3>Half-Wave Rectifier</h3><ul><li>Passes only one half-cycle of the AC input signal.</li></ul>',
        '<h3>Key Formulas</h3><ul><li><code>Vdc = Vm / π ≈ 0.318 × Vm</code></li><li><code>Vrms = Vm / 2</code></li></ul>',
        '<h3>Component Roles</h3><ul><li><code>Power Diode</code>: Rectifies the input signal.</li><li><code>Filter Capacitor</code>: Smooths out output voltage ripple.</li></ul>',
        '<h3>Industrial Applications</h3><ul><li>AM signal detector circuits</li><li>Simple low-power battery chargers</li></ul>'
    ]
};