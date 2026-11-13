// === پل بین داده‌های fa/en ===
// === پل هوشمند بین داده‌ها (پشتیبانی از هر دو ساختار فایل) ===
const eduData = {
    fa: (typeof eduDataFA !== 'undefined' && eduDataFA.fa) ? eduDataFA.fa : (typeof eduDataFA !== 'undefined' ? eduDataFA : {}),
    en: (typeof eduDataEN !== 'undefined' && eduDataEN.en) ? eduDataEN.en : (typeof eduDataEN !== 'undefined' ? eduDataEN : {})
};
	        // ==========================================
        // 1. متغیرهای وضعیت سیستم
        // ==========================================
        let currentLang = 'fa';
        let currentCircuit = 'buck';
        let currentTab = 0;

        // ==========================================
        // 2. دسته‌بندی‌ها و لیست کامل ۴۰ مدار
        // ==========================================
        const CATEGORIES = [
            { id: 'dcdc', fa: '📂 مبدل‌های DC-DC (SMPS)', en: '📂 DC-DC Converters (SMPS)' },
            { id: 'rect', fa: '📂 یکسوسازها (Rectifiers)', en: '📂 Rectifiers' },
            { id: 'inv',  fa: '📂 اینورترها (Inverters)', en: '📂 Inverters' },
            { id: 'acac', fa: '📂 مبدل‌های AC-AC', en: '📂 AC-AC Converters' },
            { id: 'reg',  fa: '📂 رگولاتورها و حفاظت', en: '📂 Regulators & Protection' },
            { id: 'app',  fa: '📂 کاربردی و صنعتی', en: '📂 Industrial Applications' }
        ];

        const CIRCUITS = [
            // DC-DC (11)
            {cat:'dcdc', id:'buck',       hasSim:true,  fa:'مبدل کاهنده (Buck)',       en:'Buck Converter'},
            {cat:'dcdc', id:'boost',      hasSim:true,  fa:'مبدل افزاینده (Boost)',    en:'Boost Converter'},
            {cat:'dcdc', id:'buck_boost', hasSim:true,  fa:'مبدل باک-بوست',            en:'Buck-Boost Converter'},
            {cat:'dcdc', id:'cuk',        hasSim:true, fa:'مبدل Ćuk (چاک)',           en:'Ćuk Converter'},
            {cat:'dcdc', id:'sepic',      hasSim:true, fa:'مبدل SEPIC',               en:'SEPIC Converter'},
            {cat:'dcdc', id:'zeta',       hasSim:true, fa:'مبدل Zeta',                en:'Zeta Converter'},
            {cat:'dcdc', id:'flyback',    hasSim:true, fa:'مبدل Flyback',             en:'Flyback Converter'},
            {cat:'dcdc', id:'forward',    hasSim:true, fa:'مبدل Forward',             en:'Forward Converter'},
            {cat:'dcdc', id:'pushpull',   hasSim:true, fa:'مبدل Push-Pull',           en:'Push-Pull Converter'},
            {cat:'dcdc', id:'halfbridge', hasSim:true, fa:'مبدل Half-Bridge',         en:'Half-Bridge Converter'},
            {cat:'dcdc', id:'fullbridge', hasSim:true, fa:'مبدل Full-Bridge',         en:'Full-Bridge Converter'},
          // Rectifiers (8)
{cat:'rect', id:'halfwave',       hasSim:true,  fa:'یکسوساز نیم‌موج',          en:'Half-Wave Rectifier'},
{cat:'rect', id:'centertap',      hasSim:true, fa:'تمام‌موج سر وسط',             en:'Center-Tap Full-Wave'},
{cat:'rect', id:'rectifier',      hasSim:true,  fa:'تمام‌موج پل دیودی',        en:'Bridge Rectifier'},
{cat:'rect', id:'threephase_half',hasSim:true, fa:'سه‌فاز نیم‌موج',           en:'3-Phase Half-Wave'},
{cat:'rect', id:'threephase_full',hasSim:true, fa:'سه‌فاز پل (۶-پالسه)',      en:'3-Phase Bridge (6-Pulse)'},
{cat:'rect', id:'thyristor',      hasSim:true, fa:'کنترل‌شده (تریستوری)',     en:'Controlled (Thyristor)'},
{cat:'rect', id:'doubler',        hasSim:true, fa:'دوبل‌کننده ولتاژ',         en:'Voltage Doubler'},
{cat:'rect', id:'multiplier',     hasSim:true, fa:'چندبرابرکننده ولتاژ',      en:'Voltage Multiplier'},
            
            // Inverters (6)
            {cat:'inv',  id:'inv_half',   hasSim:true, fa:'اینورتر نیم‌پل تک‌فاز',    en:'1-Phase Half-Bridge Inv.'},
            {cat:'inv',  id:'inv_full',   hasSim:true, fa:'اینورتر تمام‌پل تک‌فاز',   en:'1-Phase Full-Bridge Inv.'},
            {cat:'inv',  id:'inv_three',  hasSim:true, fa:'اینورتر سه‌فاز',           en:'3-Phase Inverter'},
            {cat:'inv',  id:'spwm',       hasSim:true, fa:'اینورتر SPWM',             en:'SPWM Inverter'},
            {cat:'inv',  id:'multilevel', hasSim:true, fa:'اینورتر چندسطحی',          en:'Multilevel Inverter'},
            {cat:'inv',  id:'resonant',   hasSim:true, fa:'اینورتر رزونانسی',         en:'Resonant Inverter'},
            
            // AC-AC (3)
            {cat:'acac', id:'dimmer',     hasSim:true, fa:'دیمر (تریاک)',             en:'TRIAC Dimmer'},
            {cat:'acac', id:'cycloconv',  hasSim:true, fa:'سایکلوکانورتور',           en:'Cycloconverter'},
            {cat:'acac', id:'matrix',     hasSim:true, fa:'ماتریکس کانورتر',          en:'Matrix Converter'},
            
            // Regulators (7)
            {cat:'reg',  id:'zener',      hasSim:true, fa:'رگولاتور زنر',             en:'Zener Regulator'},
            {cat:'reg',  id:'linear78',   hasSim:true, fa:'رگولاتور خطی (78xx)',      en:'Linear Regulator (78xx)'},
            {cat:'reg',  id:'lm317',      hasSim:true, fa:'رگولاتور LM317',           en:'LM317 Regulator'},
            {cat:'reg',  id:'clamper',    hasSim:true, fa:'مدار کلمپ (Clamper)',      en:'Clamper Circuit'},
            {cat:'reg',  id:'clipper',    hasSim:true, fa:'مدار کلیپر (Clipper)',     en:'Clipper Circuit'},
            {cat:'reg',  id:'snubber',    hasSim:true, fa:'مدار Snubber',             en:'Snubber Circuit'},
            {cat:'reg',  id:'pfc',        hasSim:true, fa:'اصلاح ضریب توان (PFC)',    en:'Power Factor Correction'},
            
            // Industrial (8)
            {cat:'app',  id:'charger_lead',   hasSim:true, fa:'شارژر باتری سرب-اسید', en:'Lead-Acid Charger'},
            {cat:'app',  id:'charger_lithium',hasSim:true, fa:'شارژر لیتیوم (CC-CV)', en:'Lithium Charger (CC-CV)'},
            {cat:'app',  id:'led_driver',     hasSim:true, fa:'درایور LED',           en:'LED Driver'},
            {cat:'app',  id:'ballast',        hasSim:true, fa:'بالاست الکترونیکی',    en:'Electronic Ballast'},
            {cat:'app',  id:'ups',            hasSim:true, fa:'منبع تغذیه (UPS)',     en:'UPS'},
            {cat:'app',  id:'hbridge',        hasSim:true, fa:'H-Bridge موتور DC',    en:'DC Motor H-Bridge'},
            {cat:'app',  id:'vfd',            hasSim:true, fa:'درایو موتور AC (VFD)', en:'AC Motor Drive (VFD)'},
            {cat:'app',  id:'mppt',           hasSim:true, fa:'ردیاب MPPT خورشیدی',   en:'Solar MPPT Tracker'}
        ];

       // 3. لغت‌نامه و متون ترجمه‌شده (نسخه کامل و تست شده)
// ==========================================
const dictUI = {
    fa: {
		btnAbout: 'ℹ️ درباره PowerLab',
        title: 'آزمایشگاه مجازی الکترونیک قدرت',
        navAbout: 'درباره ما',
        home_btn: 'صفحه خانه',
        fsEnter: 'تمام صفحه',
        fsExit: 'خروج از تمام صفحه',
        t0: 'مفاهیم پایه', t1: 'فرمول‌ها', t2: 'نقش قطعات', t3: 'کاربردها', t4: 'محاسبات آنلاین',
        csTitle: 'به زودی...', csDesc: 'این شبیه‌ساز در دست ساخت است.',
        badgeSim: 'فعال', badgeSoon: 'به زودی',
        clickToCopy: 'کپی 📋', copiedText: 'کپی شد! ✔️',
        aboutTitle: 'درباره ما و حمایت از پروژه', 
        aboutDesc: 'این پروژه با هدف ارتقاء سطح آموزش الکترونیک قدرت توسعه یافته است. در صورت تمایل می‌توانید از طریق آدرس‌های زیر از ما حمایت کنید.',
        lblEmail: 'ایمیل ارتباطی:', lblUsdt: 'تتر (USDT - TRC20):', lblBtc: 'بیت‌کوین (BTC):',
        calcInput: 'ورودی‌ها', calcOutput: 'نتایج', calcNo: 'محاسباتی برای این مدار تعریف نشده است.',
        
        // دقیقاً متن‌های صفحه خانه شما (فارسی)
        heroTitle: 'آزمایشگاه جامع و تعاملی الکترونیک قدرت',
        heroSubtitle: 'شبیه‌سازی انیمیشنی، محاسبات زنده و آموزش مفهومی بیش از ۴۰ مدار مبدل قدرت',
        heroBadge: 'همراه با ۴۳ شبیه‌ساز زنده و کاملاً کاربردی',
        statCircuits: 'مدار شبیه‌سازی',
        statCategories: 'دسته‌بندی تخصصی',
        statFormulas: 'فرمول محاسباتی',
        statLive: 'شبیه‌ساز زنده',
        secTitleCat: 'دسته‌بندی‌های اصلی مدارها',
        cat1Title: 'مبدل‌های DC-DC',
        cat1Desc: 'Buck, Boost, Buck-Boost, Flyback...',
        cat2Title: 'یکسوکننده‌ها',
        cat2Desc: 'Half-Wave, Full-Wave, 3-Phase...',
        cat3Title: 'اینورترها',
        cat3Desc: 'Single-Phase, 3-Phase, PWM...',
        cat4Title: 'مبدل‌های AC-AC',
        cat4Desc: 'AC Controllers, Cycloconverters...',
        cat5Title: 'رگولاتورها',
        cat5Desc: 'Linear, LDO, SMPS...',
        cat6Title: 'کاربردهای صنعتی',
        cat6Desc: 'EV Chargers, Solar MPPT...',
        footerBrand: '⚡ Designed by ABAS SOFT',
        footerTech: 'HTML5 Canvas Vanilla JS CSS3 Animation PWM Simulation'
    },
    en: {
		btnAbout: 'ℹ️ About PowerLab',
        title: 'Power Electronics Virtual Lab',
        navAbout: 'About Us',
        home_btn: 'Home Page',
        fsEnter: 'Full Screen',
        fsExit: 'Exit Full Screen',
        t0: 'Basic Concepts', t1: 'Formulas', t2: 'Component Roles', t3: 'Applications', t4: 'Online Calculator',
        csTitle: 'Coming Soon...', csDesc: 'This simulator is under construction.',
        badgeSim: 'Active', badgeSoon: 'Coming Soon',
        clickToCopy: 'Copy 📋', copiedText: 'Copied! ✔️',
        aboutTitle: 'About Us & Support Project', 
        aboutDesc: 'This project is developed to enhance power electronics education. If you wish, you can support us via the addresses below.',
        lblEmail: 'Email Contact:', lblUsdt: 'Tether (USDT - TRC20):', lblBtc: 'Bitcoin (BTC):',
        calcInput: 'Inputs', calcOutput: 'Outputs', calcNo: 'No calculation defined for this circuit.',
        
        // ترجمه انگلیسی اختصاصی متن‌های شما
        heroTitle: 'Interactive & Comprehensive Power Electronics Lab',
        heroSubtitle: 'Animated simulation, live calculations & conceptual education for over 40 power converter circuits',
        heroBadge: 'With 43 live and fully practical simulators',
        statCircuits: 'Simulated Circuits',
        statCategories: 'Specialized Categories',
        statFormulas: 'Calculation Formulas',
        statLive: 'Live Simulators',
        secTitleCat: 'Main Circuit Categories',
        cat1Title: 'DC-DC Converters',
        cat1Desc: 'Buck, Boost, Buck-Boost, Flyback...',
        cat2Title: 'Rectifiers',
        cat2Desc: 'Half-Wave, Full-Wave, 3-Phase...',
        cat3Title: 'Inverters',
        cat3Desc: 'Single-Phase, 3-Phase, PWM...',
        cat4Title: 'AC-AC Converters',
        cat4Desc: 'AC Controllers, Cycloconverters...',
        cat5Title: 'Regulators',
        cat5Desc: 'Linear, LDO, SMPS...',
        cat6Title: 'Industrial Applications',
        cat6Desc: 'EV Chargers, Solar MPPT...',
        footerBrand: '⚡ Designed by ABAS SOFT',
        footerTech: 'HTML5 Canvas Vanilla JS CSS3 Animation PWM Simulation'
    }
};
        // ==========================================
        // 4. موتور ماشین‌حساب هوشمند (Live Calculator)
        // ==========================================
        const calcConfig = {


// ==========================================
// بخش 1: یکسوکننده‌های باقی‌مانده (5 مدار)
// ==========================================

threephase_half: {
    inputs: [
        { id: 'vm', def: 311, fa: 'ولتاژ پیک فاز (V)', en: 'Phase Peak Voltage (V)' },
        { id: 'f',  def: 50,  fa: 'فرکانس شبکه (Hz)',  en: 'Line Frequency (Hz)' },
        { id: 'r',  def: 50,  fa: 'مقاومت بار (Ω)',    en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const vdc  = (3 * Math.sqrt(3) * v.vm) / (2 * Math.PI);
        const vrms = v.vm * Math.sqrt(0.5 + (3 * Math.sqrt(3)) / (4 * Math.PI));
        const iout = vdc / v.r;
        const pdc  = vdc * iout;
        const piv  = Math.sqrt(3) * v.vm;
        return [
            { fa: 'ولتاژ متوسط (Vdc)',   en: 'Average Voltage (Vdc)', val: vdc.toFixed(2) + ' V' },
            { fa: 'ولتاژ مؤثر (Vrms)',    en: 'RMS Voltage (Vrms)',    val: vrms.toFixed(2) + ' V' },
            { fa: 'جریان بار (Idc)',      en: 'Load Current (Idc)',    val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی (Pdc)',     en: 'Output Power (Pdc)',    val: pdc.toFixed(2) + ' W' },
            { fa: 'فرکانس ریپل',          en: 'Ripple Frequency',      val: (3 * v.f).toFixed(0) + ' Hz' },
            { fa: 'ولتاژ معکوس دیود (PIV)', en: 'Diode PIV',           val: piv.toFixed(2) + ' V' }
        ];
    }
},

threephase_full: {
    inputs: [
        { id: 'vm', def: 311, fa: 'ولتاژ پیک فاز (V)', en: 'Phase Peak Voltage (V)' },
        { id: 'f',  def: 50,  fa: 'فرکانس شبکه (Hz)',  en: 'Line Frequency (Hz)' },
        { id: 'r',  def: 50,  fa: 'مقاومت بار (Ω)',    en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const vLine = Math.sqrt(3) * v.vm;
        const vdc   = (3 * vLine) / Math.PI;
        const vrms  = vLine * Math.sqrt(0.5 + (3 * Math.sqrt(3)) / (4 * Math.PI));
        const iout  = vdc / v.r;
        const pdc   = vdc * iout;
        return [
            { fa: 'ولتاژ پیک خط (VLL)',   en: 'Line-Line Peak',        val: vLine.toFixed(2) + ' V' },
            { fa: 'ولتاژ متوسط (Vdc)',    en: 'Average Voltage (Vdc)', val: vdc.toFixed(2) + ' V' },
            { fa: 'ولتاژ مؤثر (Vrms)',     en: 'RMS Voltage (Vrms)',    val: vrms.toFixed(2) + ' V' },
            { fa: 'جریان بار (Idc)',       en: 'Load Current (Idc)',    val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی (Pdc)',      en: 'Output Power (Pdc)',    val: pdc.toFixed(2) + ' W' },
            { fa: 'فرکانس ریپل',           en: 'Ripple Frequency',      val: (6 * v.f).toFixed(0) + ' Hz' },
            { fa: 'ضریب ریپل',             en: 'Ripple Factor',         val: '4.2 %' }
        ];
    }
},

thyristor: {
    inputs: [
        { id: 'vm',    def: 311, fa: 'ولتاژ پیک ورودی (V)', en: 'Peak Input Voltage (V)' },
        { id: 'alpha', def: 30,  fa: 'زاویه آتش α (درجه)',   en: 'Firing Angle α (deg)' },
        { id: 'f',     def: 50,  fa: 'فرکانس شبکه (Hz)',     en: 'Line Frequency (Hz)' },
        { id: 'r',     def: 50,  fa: 'مقاومت بار (Ω)',       en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        let alpha = Math.min(180, Math.max(0, v.alpha));
        const aR = alpha * Math.PI / 180;
        const vdc  = ((2 * v.vm) / Math.PI) * Math.cos(aR);
        const vrms = v.vm * Math.sqrt(0.5 + Math.sin(2 * aR) / (4 * Math.PI) - aR / (2 * Math.PI));
        const iout = vdc / v.r;
        const pdc  = vdc * iout;
        const mode = (vdc >= 0) ? 'یکسوسازی' : 'اینورتر';
        return [
            { fa: 'ولتاژ متوسط (Vdc)', en: 'Average Voltage (Vdc)', val: vdc.toFixed(2) + ' V' },
            { fa: 'ولتاژ مؤثر (Vrms)',  en: 'RMS Voltage (Vrms)',    val: vrms.toFixed(2) + ' V' },
            { fa: 'جریان بار (Idc)',    en: 'Load Current (Idc)',    val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی (Pdc)',   en: 'Output Power (Pdc)',    val: pdc.toFixed(2) + ' W' },
            { fa: 'فرکانس ریپل',        en: 'Ripple Frequency',      val: (2 * v.f).toFixed(0) + ' Hz' },
            { fa: 'حالت عملکرد',        en: 'Operating Mode',        val: mode }
        ];
    }
},

doubler: {
    inputs: [
        { id: 'vm', def: 311,  fa: 'ولتاژ پیک ورودی (V)', en: 'Peak Input Voltage (V)' },
        { id: 'f',  def: 50,   fa: 'فرکانس ورودی (Hz)',   en: 'Input Frequency (Hz)' },
        { id: 'c',  def: 470,  fa: 'خازن (μF)',           en: 'Capacitor (μF)' },
        { id: 'r',  def: 1000, fa: 'مقاومت بار (Ω)',      en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const videal = 2 * v.vm;
        const iout = videal / v.r;
        const ripple = iout / (v.f * (v.c / 1e6));
        const vreal = Math.max(0, videal - ripple / 2);
        const pdc = vreal * iout;
        return [
            { fa: 'ولتاژ خروجی ایده‌آل',  en: 'Ideal Output Voltage', val: videal.toFixed(2) + ' V' },
            { fa: 'ولتاژ خروجی واقعی',    en: 'Real Output Voltage',  val: vreal.toFixed(2) + ' V' },
            { fa: 'ریپل ولتاژ (p-p)',     en: 'Voltage Ripple',       val: ripple.toFixed(2) + ' V' },
            { fa: 'جریان بار (Idc)',      en: 'Load Current',         val: iout.toFixed(3) + ' A' },
            { fa: 'توان خروجی (Pdc)',     en: 'Output Power',         val: pdc.toFixed(2) + ' W' },
            { fa: 'PIV دیود',             en: 'Diode PIV',            val: (2 * v.vm).toFixed(2) + ' V' }
        ];
    }
},

multiplier: {
    inputs: [
        { id: 'vm',    def: 311, fa: 'ولتاژ پیک ورودی (V)', en: 'Peak Input Voltage (V)' },
        { id: 'n',     def: 3,   fa: 'تعداد مراحل (n)',     en: 'Number of Stages (n)' },
        { id: 'f',     def: 50,  fa: 'فرکانس (Hz)',          en: 'Frequency (Hz)' },
        { id: 'c',     def: 100, fa: 'خازن هر مرحله (μF)',   en: 'Stage Cap (μF)' },
        { id: 'iload', def: 10,  fa: 'جریان بار (mA)',      en: 'Load Current (mA)' }
    ],
    calc: (v) => {
        const n = Math.max(1, Math.round(v.n));
        const videal = 2 * n * v.vm;
        const iA = v.iload / 1000;
        const cF = v.c / 1e6;
        const vdrop = (iA / (v.f * cF)) * ((2*n*n*n)/3 + (n*n)/2 - n/6);
        const vreal = Math.max(0, videal - vdrop);
        const ripple = (iA * n) / (v.f * cF);
        const pout = vreal * iA;
        return [
            { fa: 'تعداد مراحل',          en: 'Stages (n)',            val: n.toFixed(0) },
            { fa: 'ولتاژ ایده‌آل',        en: 'Ideal Output',          val: videal.toFixed(1) + ' V' },
            { fa: 'افت بار',              en: 'Load Drop',             val: vdrop.toFixed(1) + ' V' },
            { fa: 'ولتاژ واقعی',          en: 'Real Output',           val: vreal.toFixed(1) + ' V' },
            { fa: 'ریپل (p-p)',           en: 'Ripple (p-p)',          val: ripple.toFixed(2) + ' V' },
            { fa: 'توان خروجی',           en: 'Output Power',          val: pout.toFixed(2) + ' W' },
            { fa: 'PIV هر دیود',          en: 'Diode PIV',             val: (2 * v.vm).toFixed(1) + ' V' }
        ];
    }
},

// ==========================================
// بخش 2: اینورترها (6 مدار)
// ==========================================

inv_half: {
    inputs: [
        { id: 'vdc', def: 24,  fa: 'ولتاژ DC ورودی (V)', en: 'DC Input Voltage (V)' },
        { id: 'f',   def: 50,  fa: 'فرکانس خروجی (Hz)',  en: 'Output Frequency (Hz)' },
        { id: 'r',   def: 10,  fa: 'مقاومت بار (Ω)',     en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const vpeak = v.vdc / 2;
        const vrms_sq = vpeak;
        const vrms_f1 = (2 * vpeak) / (Math.PI * Math.SQRT2);
        const iout = vrms_sq / v.r;
        const pout = (vrms_sq * vrms_sq) / v.r;
        const thd = 48.3;
        return [
            { fa: 'ولتاژ پیک خروجی',       en: 'Output Peak Voltage',   val: vpeak.toFixed(2) + ' V' },
            { fa: 'ولتاژ RMS (مربعی)',     en: 'RMS Voltage (Square)',  val: vrms_sq.toFixed(2) + ' V' },
            { fa: 'RMS هارمونیک اول',      en: 'Fundamental RMS',       val: vrms_f1.toFixed(2) + ' V' },
            { fa: 'جریان بار',             en: 'Load Current',          val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی',            en: 'Output Power',          val: pout.toFixed(2) + ' W' },
            { fa: 'فرکانس خروجی',          en: 'Output Frequency',      val: v.f.toFixed(0) + ' Hz' },
            { fa: 'THD تقریبی',            en: 'Approx THD',            val: thd.toFixed(1) + ' %' }
        ];
    }
},

inv_full: {
    inputs: [
        { id: 'vdc', def: 48, fa: 'ولتاژ DC ورودی (V)', en: 'DC Input Voltage (V)' },
        { id: 'f',   def: 50, fa: 'فرکانس خروجی (Hz)',  en: 'Output Frequency (Hz)' },
        { id: 'r',   def: 10, fa: 'مقاومت بار (Ω)',     en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const vpeak = v.vdc;
        const vrms_sq = v.vdc;
        const vrms_f1 = (4 * v.vdc) / (Math.PI * Math.SQRT2);
        const iout = vrms_sq / v.r;
        const pout = (vrms_sq * vrms_sq) / v.r;
        return [
            { fa: 'ولتاژ پیک خروجی',   en: 'Output Peak',       val: vpeak.toFixed(2) + ' V' },
            { fa: 'RMS موج مربعی',     en: 'Square RMS',        val: vrms_sq.toFixed(2) + ' V' },
            { fa: 'RMS هارمونیک اول',  en: 'Fundamental RMS',   val: vrms_f1.toFixed(2) + ' V' },
            { fa: 'جریان بار',         en: 'Load Current',      val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی',        en: 'Output Power',      val: pout.toFixed(2) + ' W' },
            { fa: 'فرکانس خروجی',      en: 'Output Frequency',  val: v.f.toFixed(0) + ' Hz' },
            { fa: 'THD تقریبی',        en: 'Approx THD',        val: '48.3 %' }
        ];
    }
},

inv_three: {
    inputs: [
        { id: 'vdc', def: 540, fa: 'ولتاژ DC ورودی (V)', en: 'DC Input Voltage (V)' },
        { id: 'f',   def: 50,  fa: 'فرکانس خروجی (Hz)',  en: 'Output Frequency (Hz)' },
        { id: 'r',   def: 10,  fa: 'مقاومت بار هر فاز (Ω)', en: 'Load per Phase (Ω)' }
    ],
    calc: (v) => {
        // 6-step 180° conduction
        const vLL_rms_f1 = (Math.sqrt(6) / Math.PI) * v.vdc;
        const vPh_rms_f1 = vLL_rms_f1 / Math.sqrt(3);
        const vLL_rms = Math.sqrt(2/3) * v.vdc;
        const iPh = vPh_rms_f1 / v.r;
        const pout = 3 * vPh_rms_f1 * iPh;
        return [
            { fa: 'ولتاژ خط RMS (کل)',     en: 'Line RMS (Total)',      val: vLL_rms.toFixed(2) + ' V' },
            { fa: 'ولتاژ خط هارمونیک اول', en: 'Line Fundamental RMS',  val: vLL_rms_f1.toFixed(2) + ' V' },
            { fa: 'ولتاژ فاز هارمونیک اول',en: 'Phase Fundamental RMS', val: vPh_rms_f1.toFixed(2) + ' V' },
            { fa: 'جریان فاز',             en: 'Phase Current',         val: iPh.toFixed(2) + ' A' },
            { fa: 'توان کل خروجی',         en: 'Total Output Power',    val: pout.toFixed(2) + ' W' },
            { fa: 'فرکانس خروجی',          en: 'Output Frequency',      val: v.f.toFixed(0) + ' Hz' },
            { fa: 'اختلاف فاز',            en: 'Phase Shift',           val: '120°' }
        ];
    }
},

spwm: {
    inputs: [
        { id: 'vdc', def: 400, fa: 'ولتاژ DC ورودی (V)',    en: 'DC Input Voltage (V)' },
        { id: 'ma',  def: 0.8, fa: 'شاخص مدولاسیون (ma)',    en: 'Modulation Index (ma)' },
        { id: 'fc',  def: 5,   fa: 'فرکانس حامل (kHz)',      en: 'Carrier Freq (kHz)' },
        { id: 'f',   def: 50,  fa: 'فرکانس مرجع (Hz)',       en: 'Reference Freq (Hz)' },
        { id: 'r',   def: 10,  fa: 'مقاومت بار (Ω)',         en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        let ma = Math.min(1, Math.max(0, v.ma));
        const vpeak_f1 = ma * v.vdc;              // full-bridge
        const vrms_f1 = vpeak_f1 / Math.SQRT2;
        const iout_f1 = vrms_f1 / v.r;
        const pout = (vrms_f1 * vrms_f1) / v.r;
        const mf = (v.fc * 1000) / v.f;
        const region = (ma <= 1) ? 'خطی' : 'اشباع (Over-mod)';
        return [
            { fa: 'ولتاژ پیک هارمونیک اول', en: 'Fundamental Peak',   val: vpeak_f1.toFixed(2) + ' V' },
            { fa: 'ولتاژ RMS هارمونیک اول', en: 'Fundamental RMS',    val: vrms_f1.toFixed(2) + ' V' },
            { fa: 'جریان بار',              en: 'Load Current',       val: iout_f1.toFixed(2) + ' A' },
            { fa: 'توان خروجی',             en: 'Output Power',       val: pout.toFixed(2) + ' W' },
            { fa: 'نسبت فرکانس (mf)',       en: 'Freq Ratio (mf)',    val: mf.toFixed(1) },
            { fa: 'ناحیه عملکرد',           en: 'Operating Region',   val: region }
        ];
    }
},

multilevel: {
    inputs: [
        { id: 'vdc',    def: 100, fa: 'ولتاژ هر منبع DC (V)', en: 'Voltage per DC Source (V)' },
        { id: 'levels', def: 5,   fa: 'تعداد سطوح (N)',       en: 'Number of Levels (N)' },
        { id: 'f',      def: 50,  fa: 'فرکانس خروجی (Hz)',    en: 'Output Frequency (Hz)' },
        { id: 'r',      def: 10,  fa: 'مقاومت بار (Ω)',       en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const N = Math.max(3, Math.round(v.levels));
        const nSrc = (N - 1) / 2;
        const vpeak = nSrc * v.vdc;
        const vrms = vpeak / Math.SQRT2;
        const iout = vrms / v.r;
        const pout = (vrms * vrms) / v.r;
        const thd = 100 / (N - 1);
        const switches = 2 * (N - 1);
        return [
            { fa: 'تعداد منابع DC',        en: 'DC Sources',          val: nSrc.toFixed(0) },
            { fa: 'ولتاژ پیک خروجی',       en: 'Peak Output',         val: vpeak.toFixed(2) + ' V' },
            { fa: 'ولتاژ RMS خروجی',       en: 'RMS Output',          val: vrms.toFixed(2) + ' V' },
            { fa: 'جریان بار',             en: 'Load Current',        val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی',            en: 'Output Power',        val: pout.toFixed(2) + ' W' },
            { fa: 'تعداد سوییچ (کسکید)',   en: 'Switches (Cascade)',  val: switches.toFixed(0) },
            { fa: 'THD تقریبی',            en: 'Approx THD',          val: thd.toFixed(1) + ' %' }
        ];
    }
},

resonant: {
    inputs: [
        { id: 'vdc', def: 300,  fa: 'ولتاژ DC ورودی (V)', en: 'DC Input Voltage (V)' },
        { id: 'l',   def: 100,  fa: 'سلف رزونانس Lr (μH)', en: 'Resonant Inductor Lr (μH)' },
        { id: 'c',   def: 100,  fa: 'خازن رزونانس Cr (nF)', en: 'Resonant Capacitor Cr (nF)' },
        { id: 'r',   def: 10,   fa: 'مقاومت بار (Ω)',     en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const L = v.l / 1e6;
        const C = v.c / 1e9;
        const fr = 1 / (2 * Math.PI * Math.sqrt(L * C));
        const Zo = Math.sqrt(L / C);
        const Q = Zo / v.r;
        const vpeak = v.vdc * Q;
        const iout = vpeak / (Math.SQRT2 * v.r);
        return [
            { fa: 'فرکانس رزونانس (fr)',  en: 'Resonant Freq (fr)',   val: (fr / 1000).toFixed(2) + ' kHz' },
            { fa: 'امپدانس مشخصه (Zo)',    en: 'Characteristic Impedance', val: Zo.toFixed(2) + ' Ω' },
            { fa: 'ضریب کیفیت (Q)',        en: 'Quality Factor (Q)',   val: Q.toFixed(2) },
            { fa: 'ولتاژ پیک تانک',        en: 'Tank Peak Voltage',    val: vpeak.toFixed(1) + ' V' },
            { fa: 'جریان RMS بار',         en: 'Load RMS Current',     val: iout.toFixed(2) + ' A' },
            { fa: 'نوع سوئیچینگ',          en: 'Switching Type',       val: 'ZVS / ZCS' }
        ];
    }
},

// ==========================================
// بخش 3: AC-AC (3 مدار)
// ==========================================

dimmer: {
    inputs: [
        { id: 'vm',    def: 311, fa: 'ولتاژ پیک شبکه (V)',  en: 'Peak Line Voltage (V)' },
        { id: 'alpha', def: 60,  fa: 'زاویه آتش α (درجه)',   en: 'Firing Angle α (deg)' },
        { id: 'f',     def: 50,  fa: 'فرکانس شبکه (Hz)',     en: 'Line Frequency (Hz)' },
        { id: 'r',     def: 100, fa: 'مقاومت بار (Ω)',       en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        let alpha = Math.min(180, Math.max(0, v.alpha));
        const aR = alpha * Math.PI / 180;
        const vm = v.vm;
        const vrms_full = vm / Math.SQRT2;
        const vrms = vm * Math.sqrt((1/Math.PI) * ((Math.PI - aR) + Math.sin(2*aR)/2) / 2) * Math.sqrt(2);
        // ساده‌تر و دقیق‌تر:
        const vrms2 = (vm / Math.sqrt(2)) * Math.sqrt(1 - aR/Math.PI + Math.sin(2*aR)/(2*Math.PI));
        const iout = vrms2 / v.r;
        const pout = (vrms2 * vrms2) / v.r;
        const pFull = (vrms_full * vrms_full) / v.r;
        const pPercent = (pout / pFull) * 100;
        return [
            { fa: 'ولتاژ RMS خروجی',   en: 'Output RMS Voltage',  val: vrms2.toFixed(2) + ' V' },
            { fa: 'جریان RMS بار',     en: 'RMS Load Current',    val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی',        en: 'Output Power',        val: pout.toFixed(2) + ' W' },
            { fa: 'توان کامل (α=0)',   en: 'Full Power (α=0)',    val: pFull.toFixed(2) + ' W' },
            { fa: 'درصد توان',         en: 'Power Percentage',    val: pPercent.toFixed(1) + ' %' },
            { fa: 'زاویه هدایت',       en: 'Conduction Angle',    val: (180 - alpha).toFixed(1) + '°' }
        ];
    }
},

cycloconv: {
    inputs: [
        { id: 'vm',    def: 311, fa: 'ولتاژ پیک ورودی (V)',  en: 'Peak Input Voltage (V)' },
        { id: 'fin',   def: 50,  fa: 'فرکانس ورودی (Hz)',    en: 'Input Frequency (Hz)' },
        { id: 'fout',  def: 10,  fa: 'فرکانس خروجی (Hz)',    en: 'Output Frequency (Hz)' },
        { id: 'alpha', def: 30,  fa: 'زاویه آتش α (درجه)',   en: 'Firing Angle α (deg)' },
        { id: 'r',     def: 10,  fa: 'مقاومت بار (Ω)',       en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const aR = v.alpha * Math.PI / 180;
        const vdc_max = (2 * v.vm) / Math.PI;
        const vout_peak = vdc_max * Math.cos(aR);
        const vout_rms = vout_peak / Math.SQRT2;
        const iout = vout_rms / v.r;
        const pout = (vout_rms * vout_rms) / v.r;
        const ratio = v.fout / v.fin;
        const valid = (ratio < 0.33) ? 'مجاز (fo < fi/3)' : 'ناپایدار';
        return [
            { fa: 'ولتاژ پیک خروجی',   en: 'Output Peak',       val: vout_peak.toFixed(2) + ' V' },
            { fa: 'ولتاژ RMS خروجی',   en: 'Output RMS',        val: vout_rms.toFixed(2) + ' V' },
            { fa: 'جریان بار',         en: 'Load Current',      val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی',        en: 'Output Power',      val: pout.toFixed(2) + ' W' },
            { fa: 'نسبت فرکانس',       en: 'Freq Ratio',        val: ratio.toFixed(2) },
            { fa: 'وضعیت',             en: 'Status',            val: valid }
        ];
    }
},

matrix: {
    inputs: [
        { id: 'vm',   def: 311, fa: 'ولتاژ پیک ورودی (V)',  en: 'Peak Input Voltage (V)' },
        { id: 'fin',  def: 50,  fa: 'فرکانس ورودی (Hz)',    en: 'Input Frequency (Hz)' },
        { id: 'fout', def: 60,  fa: 'فرکانس خروجی (Hz)',    en: 'Output Frequency (Hz)' },
        { id: 'q',    def: 0.8, fa: 'ضریب انتقال ولتاژ (q)', en: 'Voltage Transfer Ratio (q)' },
        { id: 'r',    def: 10,  fa: 'مقاومت بار (Ω)',       en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        let q = Math.min(0.866, Math.max(0, v.q));
        const vout_peak = q * v.vm;
        const vout_rms = vout_peak / Math.SQRT2;
        const iout = vout_rms / v.r;
        const pout = (vout_rms * vout_rms) / v.r;
        const maxQ = 0.866;
        return [
            { fa: 'ضریب q (محدودشده)',     en: 'Voltage Ratio q',         val: q.toFixed(3) },
            { fa: 'حداکثر q تئوری',        en: 'Max Theoretical q',       val: maxQ.toFixed(3) },
            { fa: 'ولتاژ پیک خروجی',       en: 'Output Peak Voltage',     val: vout_peak.toFixed(2) + ' V' },
            { fa: 'ولتاژ RMS خروجی',       en: 'Output RMS Voltage',      val: vout_rms.toFixed(2) + ' V' },
            { fa: 'جریان بار',             en: 'Load Current',            val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی',            en: 'Output Power',            val: pout.toFixed(2) + ' W' },
            { fa: 'تعداد سوییچ‌های دوطرفه', en: 'Bidirectional Switches',  val: '9' }
        ];
    }
},
	// ==========================================
// بخش 4: رگولاتورها و حفاظت (7 مدار)
// ==========================================

zener: {
    inputs: [
        { id: 'vin', def: 15,   fa: 'ولتاژ ورودی (V)',   en: 'Input Voltage (V)' },
        { id: 'vz',  def: 5.1,  fa: 'ولتاژ زنر Vz (V)',  en: 'Zener Voltage Vz (V)' },
        { id: 'pz',  def: 0.5,  fa: 'توان زنر Pz (W)',   en: 'Zener Power Pz (W)' },
        { id: 'rl',  def: 100,  fa: 'مقاومت بار (Ω)',    en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const iLoad = v.vz / v.rl;
        const izMax = v.pz / v.vz;
        const izMin = izMax * 0.1;
        const iTotal = iLoad + (izMax + izMin) / 2;
        const rs = (v.vin - v.vz) / iTotal;
        const prs = (v.vin - v.vz) * iTotal;
        const regOK = (v.vin > v.vz * 1.5) ? 'OK ✓' : 'ضعیف ✗';
        return [
            { fa: 'جریان بار',            en: 'Load Current',       val: (iLoad * 1000).toFixed(2) + ' mA' },
            { fa: 'جریان ماکس زنر',       en: 'Max Zener Current',  val: (izMax * 1000).toFixed(2) + ' mA' },
            { fa: 'مقاومت سری Rs',        en: 'Series Resistor Rs', val: rs.toFixed(1) + ' Ω' },
            { fa: 'توان Rs',              en: 'Rs Power',           val: prs.toFixed(2) + ' W' },
            { fa: 'ولتاژ خروجی',          en: 'Output Voltage',     val: v.vz.toFixed(2) + ' V' },
            { fa: 'وضعیت رگولاسیون',      en: 'Regulation Status',  val: regOK }
        ];
    }
},

linear78: {
    inputs: [
        { id: 'vin',  def: 12,   fa: 'ولتاژ ورودی (V)',   en: 'Input Voltage (V)' },
        { id: 'vout', def: 5,    fa: 'ولتاژ خروجی (V)',   en: 'Output Voltage (V)' },
        { id: 'iout', def: 500,  fa: 'جریان خروجی (mA)',  en: 'Output Current (mA)' },
        { id: 'tamb', def: 25,   fa: 'دمای محیط (°C)',    en: 'Ambient Temp (°C)' }
    ],
    calc: (v) => {
        const iA = v.iout / 1000;
        const vdrop = v.vin - v.vout;
        const pdiss = vdrop * iA;
        const eff = (v.vout / v.vin) * 100;
        const dropoutOK = (vdrop >= 2) ? 'OK (≥2V) ✓' : 'ناکافی ✗';
        // تخمین افزایش دمای جانکشن با هیت‌سینک 25°C/W
        const thetaJA = 25;
        const tj = v.tamb + (pdiss * thetaJA);
        const thermalOK = (tj < 125) ? 'ایمن ✓' : 'نیاز به هیت‌سینک ⚠';
        return [
            { fa: 'افت ولتاژ',             en: 'Voltage Drop',        val: vdrop.toFixed(2) + ' V' },
            { fa: 'توان تلف‌شده',          en: 'Power Dissipation',   val: pdiss.toFixed(2) + ' W' },
            { fa: 'راندمان',               en: 'Efficiency',          val: eff.toFixed(1) + ' %' },
            { fa: 'وضعیت Dropout',        en: 'Dropout Status',      val: dropoutOK },
            { fa: 'دمای جانکشن تخمینی',    en: 'Est. Junction Temp',  val: tj.toFixed(1) + ' °C' },
            { fa: 'وضعیت حرارتی',          en: 'Thermal Status',      val: thermalOK }
        ];
    }
},

lm317: {
    inputs: [
        { id: 'vin',  def: 15,   fa: 'ولتاژ ورودی (V)',     en: 'Input Voltage (V)' },
        { id: 'r1',   def: 240,  fa: 'مقاومت R1 (Ω)',       en: 'Resistor R1 (Ω)' },
        { id: 'r2',   def: 720,  fa: 'مقاومت R2 (Ω)',       en: 'Resistor R2 (Ω)' },
        { id: 'iout', def: 500,  fa: 'جریان بار (mA)',      en: 'Load Current (mA)' }
    ],
    calc: (v) => {
        const vref = 1.25;
        const iadj = 50e-6;
        const vout = vref * (1 + v.r2 / v.r1) + iadj * v.r2;
        const iA = v.iout / 1000;
        const pdiss = (v.vin - vout) * iA;
        const dropoutOK = ((v.vin - vout) >= 3) ? 'OK (≥3V) ✓' : 'ناکافی ✗';
        const iMax = 1.5;
        const iStatus = (iA <= iMax) ? 'مجاز ✓' : 'بالاتر از حد مجاز ✗';
        return [
            { fa: 'ولتاژ مرجع',       en: 'Reference Voltage',  val: vref.toFixed(2) + ' V' },
            { fa: 'ولتاژ خروجی',      en: 'Output Voltage',     val: vout.toFixed(2) + ' V' },
            { fa: 'توان تلف‌شده',     en: 'Power Dissipation',  val: pdiss.toFixed(2) + ' W' },
            { fa: 'وضعیت Dropout',   en: 'Dropout Status',     val: dropoutOK },
            { fa: 'حداکثر جریان IC',  en: 'IC Max Current',     val: iMax.toFixed(1) + ' A' },
            { fa: 'وضعیت جریان',      en: 'Current Status',     val: iStatus }
        ];
    }
},

clamper: {
    inputs: [
        { id: 'vm',    def: 10,  fa: 'ولتاژ پیک ورودی (V)', en: 'Input Peak Voltage (V)' },
        { id: 'vbias', def: 5,   fa: 'ولتاژ بایاس (V)',     en: 'Bias Voltage (V)' },
        { id: 'type',  def: 1,   fa: 'نوع (1=مثبت، 0=منفی)', en: 'Type (1=Pos, 0=Neg)' }
    ],
    calc: (v) => {
        const vf = 0.7;
        const isPos = v.type >= 0.5;
        const vdc_shift = isPos ? (v.vm - vf + v.vbias) : -(v.vm - vf + v.vbias);
        const vpeak_out = isPos ? (2 * v.vm - vf + v.vbias) : (v.vbias + vf);
        const vmin_out = isPos ? (v.vbias - vf) : -(2 * v.vm - vf + v.vbias);
        const type_label = isPos ? 'کلمپ مثبت' : 'کلمپ منفی';
        return [
            { fa: 'نوع مدار',           en: 'Clamper Type',       val: type_label },
            { fa: 'شیفت DC',           en: 'DC Shift',           val: vdc_shift.toFixed(2) + ' V' },
            { fa: 'حداکثر خروجی',       en: 'Max Output',         val: vpeak_out.toFixed(2) + ' V' },
            { fa: 'حداقل خروجی',        en: 'Min Output',         val: vmin_out.toFixed(2) + ' V' },
            { fa: 'دامنه p-p',          en: 'Peak-Peak Amplitude', val: (2 * v.vm).toFixed(2) + ' V' },
            { fa: 'افت دیود (Vf)',      en: 'Diode Drop',         val: vf.toFixed(2) + ' V' }
        ];
    }
},

clipper: {
    inputs: [
        { id: 'vm',    def: 10, fa: 'ولتاژ پیک ورودی (V)', en: 'Input Peak Voltage (V)' },
        { id: 'vbias', def: 3,  fa: 'ولتاژ بایاس (V)',     en: 'Bias Voltage (V)' },
        { id: 'type',  def: 2,  fa: 'نوع (1=بالا،2=پایین،3=هردو)', en: 'Type (1=Up,2=Dn,3=Both)' }
    ],
    calc: (v) => {
        const vf = 0.7;
        const vth = v.vbias + vf;
        let vmax_out, vmin_out, type_label;
        if (v.type <= 1) {
            vmax_out = vth; vmin_out = -v.vm;
            type_label = 'کلیپر بالا (Positive)';
        } else if (v.type <= 2) {
            vmax_out = v.vm; vmin_out = -vth;
            type_label = 'کلیپر پایین (Negative)';
        } else {
            vmax_out = vth; vmin_out = -vth;
            type_label = 'کلیپر دوطرفه (Both)';
        }
        return [
            { fa: 'نوع مدار',           en: 'Clipper Type',       val: type_label },
            { fa: 'ولتاژ آستانه Vth',   en: 'Threshold Vth',      val: vth.toFixed(2) + ' V' },
            { fa: 'حداکثر خروجی',       en: 'Max Output',         val: vmax_out.toFixed(2) + ' V' },
            { fa: 'حداقل خروجی',        en: 'Min Output',         val: vmin_out.toFixed(2) + ' V' },
            { fa: 'افت دیود (Vf)',      en: 'Diode Drop',         val: vf.toFixed(2) + ' V' }
        ];
    }
},

snubber: {
    inputs: [
        { id: 'vds',  def: 400, fa: 'ولتاژ پیک سوئیچ (V)', en: 'Switch Peak Voltage (V)' },
        { id: 'id',   def: 10,  fa: 'جریان سوئیچ (A)',     en: 'Switch Current (A)' },
        { id: 'fsw',  def: 50,  fa: 'فرکانس سوئیچینگ (kHz)', en: 'Switching Freq (kHz)' },
        { id: 'lk',   def: 1,   fa: 'سلف نشتی Lk (μH)',    en: 'Leakage Inductance (μH)' }
    ],
    calc: (v) => {
        const fHz = v.fsw * 1000;
        const Lk = v.lk / 1e6;
        // انرژی ذخیره‌شده در سلف نشتی
        const Esn = 0.5 * Lk * v.id * v.id;
        // توان جذب‌شده توسط اسنابر
        const Psn = Esn * fHz;
        // انتخاب خازن اسنابر RCD برای کلمپ 20% اضافه
        const vClamp = v.vds * 1.2;
        const Csn = (v.id * v.id * Lk) / ((vClamp - v.vds) * (vClamp - v.vds)) * 1e9;
        // مقاومت اسنابر
        const Rsn = (vClamp * vClamp) / Psn;
        return [
            { fa: 'ولتاژ کلمپ هدف',      en: 'Target Clamp Voltage', val: vClamp.toFixed(1) + ' V' },
            { fa: 'انرژی نشتی (per cyc)', en: 'Leakage Energy',       val: (Esn * 1e6).toFixed(2) + ' μJ' },
            { fa: 'توان جذب اسنابر',      en: 'Snubber Power',        val: Psn.toFixed(2) + ' W' },
            { fa: 'خازن Csn پیشنهادی',    en: 'Recommended Csn',      val: Csn.toFixed(1) + ' nF' },
            { fa: 'مقاومت Rsn',           en: 'Snubber Resistor Rsn', val: Rsn.toFixed(0) + ' Ω' },
            { fa: 'توان Rsn',             en: 'Rsn Power Rating',     val: (Psn * 1.5).toFixed(2) + ' W' }
        ];
    }
},

pfc: {
    inputs: [
        { id: 'vac',  def: 220, fa: 'ولتاژ RMS شبکه (V)', en: 'Grid RMS Voltage (V)' },
        { id: 'vout', def: 400, fa: 'ولتاژ خروجی DC (V)', en: 'Output DC Voltage (V)' },
        { id: 'pout', def: 500, fa: 'توان خروجی (W)',     en: 'Output Power (W)' },
        { id: 'fsw',  def: 100, fa: 'فرکانس سوئیچ (kHz)', en: 'Switching Freq (kHz)' },
        { id: 'eff',  def: 95,  fa: 'راندمان هدف (%)',    en: 'Target Efficiency (%)' }
    ],
    calc: (v) => {
        const eta = v.eff / 100;
        const pIn = v.pout / eta;
        const iInRMS = pIn / v.vac;
        const vMin = v.vac * Math.SQRT2;
        const dMax = 1 - (vMin / v.vout);
        const iInPeak = iInRMS * Math.SQRT2;
        // ریپل جریان 20%
        const dIL = iInPeak * 0.2;
        const Lmin = (vMin * dMax) / (dIL * v.fsw * 1000) * 1e6;
        const PF = 0.99; // معمول برای PFC خوب
        const THD = 5;    // درصد
        return [
            { fa: 'توان ورودی',         en: 'Input Power',         val: pIn.toFixed(1) + ' W' },
            { fa: 'جریان RMS ورودی',    en: 'Input RMS Current',   val: iInRMS.toFixed(2) + ' A' },
            { fa: 'حداکثر دیوتی',       en: 'Max Duty Cycle',      val: (dMax * 100).toFixed(1) + ' %' },
            { fa: 'حداقل سلف Boost',    en: 'Min Boost Inductor',  val: Lmin.toFixed(1) + ' μH' },
            { fa: 'ضریب توان PF',       en: 'Power Factor',        val: PF.toFixed(2) },
            { fa: 'THD تقریبی',         en: 'Approx THD',          val: THD.toFixed(1) + ' %' }
        ];
    }
},

// ==========================================
// بخش 5: کاربردهای صنعتی (8 مدار)
// ==========================================

charger_lead: {
    inputs: [
        { id: 'vbat',  def: 12,  fa: 'ولتاژ نامی باتری (V)', en: 'Nominal Battery Voltage (V)' },
        { id: 'ah',    def: 100, fa: 'ظرفیت باتری (Ah)',     en: 'Battery Capacity (Ah)' },
        { id: 'crate', def: 0.1, fa: 'نرخ شارژ (C-rate)',    en: 'C-rate (e.g. 0.1C)' },
        { id: 'soc',   def: 50,  fa: 'SOC فعلی (%)',          en: 'Current SOC (%)' }
    ],
    calc: (v) => {
        // استاندارد باتری سرب-اسید: 2.45V/cell bulk, 2.27V/cell float
        const cells = Math.round(v.vbat / 2);
        const vBulk = cells * 2.45;
        const vFloat = cells * 2.27;
        const iCC = v.ah * v.crate;
        const chargeNeeded = v.ah * (100 - v.soc) / 100;
        const bulkTime = (chargeNeeded * 0.8) / iCC;
        const absorbTime = 2; // ساعت متوسط
        const totalTime = bulkTime + absorbTime;
        const pMax = vBulk * iCC;
        return [
            { fa: 'تعداد سلول',           en: 'Number of Cells',      val: cells.toFixed(0) },
            { fa: 'ولتاژ Bulk (CC)',      en: 'Bulk Voltage (CC)',    val: vBulk.toFixed(2) + ' V' },
            { fa: 'ولتاژ Float (CV)',     en: 'Float Voltage (CV)',   val: vFloat.toFixed(2) + ' V' },
            { fa: 'جریان CC',             en: 'CC Current',           val: iCC.toFixed(2) + ' A' },
            { fa: 'توان ماکس شارژر',      en: 'Max Charger Power',    val: pMax.toFixed(1) + ' W' },
            { fa: 'زمان تخمینی شارژ',     en: 'Estimated Time',       val: totalTime.toFixed(1) + ' hr' }
        ];
    }
},

charger_lithium: {
    inputs: [
        { id: 'cells', def: 3,   fa: 'تعداد سلول سری (S)',    en: 'Cells in Series (S)' },
        { id: 'ah',    def: 2.5, fa: 'ظرفیت سلول (Ah)',       en: 'Cell Capacity (Ah)' },
        { id: 'crate', def: 0.5, fa: 'نرخ شارژ (C-rate)',     en: 'C-rate (e.g. 0.5C)' },
        { id: 'soc',   def: 20,  fa: 'SOC فعلی (%)',          en: 'Current SOC (%)' }
    ],
    calc: (v) => {
        const vCellMax = 4.20;
        const vCellNom = 3.70;
        const vCellMin = 3.00;
        const vMax = v.cells * vCellMax;
        const vNom = v.cells * vCellNom;
        const vMin = v.cells * vCellMin;
        const iCC = v.ah * v.crate;
        const iCutoff = v.ah * 0.05;
        const chargeNeeded = v.ah * (100 - v.soc) / 100;
        const ccTime = (chargeNeeded * 0.7) / iCC;
        const cvTime = 0.5;
        const totalTime = ccTime + cvTime;
        const energy = vNom * v.ah;
        return [
            { fa: 'ولتاژ CV نهایی',      en: 'Final CV Voltage',     val: vMax.toFixed(2) + ' V' },
            { fa: 'ولتاژ نامی پک',       en: 'Nominal Pack Voltage', val: vNom.toFixed(2) + ' V' },
            { fa: 'ولتاژ قطع تخلیه',     en: 'Discharge Cutoff',     val: vMin.toFixed(2) + ' V' },
            { fa: 'جریان CC',             en: 'CC Current',           val: iCC.toFixed(2) + ' A' },
            { fa: 'جریان قطع (0.05C)',   en: 'Cutoff Current',       val: iCutoff.toFixed(3) + ' A' },
            { fa: 'زمان شارژ تخمینی',    en: 'Est. Charge Time',     val: totalTime.toFixed(1) + ' hr' },
            { fa: 'انرژی پک',             en: 'Pack Energy',          val: energy.toFixed(1) + ' Wh' }
        ];
    }
},

led_driver: {
    inputs: [
        { id: 'vin',   def: 24,  fa: 'ولتاژ ورودی (V)',     en: 'Input Voltage (V)' },
        { id: 'vled',  def: 3.2, fa: 'Vf هر LED (V)',       en: 'LED Forward Voltage (V)' },
        { id: 'nled',  def: 6,   fa: 'تعداد LED سری',       en: 'LEDs in Series' },
        { id: 'iled',  def: 350, fa: 'جریان هر LED (mA)',   en: 'LED Current (mA)' },
        { id: 'rsense',def: 0.5, fa: 'Rsense (Ω)',          en: 'Rsense (Ω)' }
    ],
    calc: (v) => {
        const vString = v.vled * v.nled;
        const iA = v.iled / 1000;
        const vRsense = iA * v.rsense;
        const headroom = v.vin - vString - vRsense;
        const pLED = vString * iA;
        const pLoss = vRsense * iA;
        const eff = (pLED / (pLED + pLoss)) * 100;
        const status = (headroom >= 2) ? 'OK ✓' : 'ناکافی ✗';
        return [
            { fa: 'ولتاژ کل رشته LED',    en: 'Total LED String',     val: vString.toFixed(2) + ' V' },
            { fa: 'ولتاژ Rsense',         en: 'Rsense Voltage',       val: vRsense.toFixed(2) + ' V' },
            { fa: 'Headroom مبدل',        en: 'Driver Headroom',      val: headroom.toFixed(2) + ' V' },
            { fa: 'توان LED',             en: 'LED Power',            val: pLED.toFixed(2) + ' W' },
            { fa: 'توان Rsense',          en: 'Rsense Power',         val: pLoss.toFixed(3) + ' W' },
            { fa: 'راندمان Sense',        en: 'Sense Efficiency',     val: eff.toFixed(1) + ' %' },
            { fa: 'وضعیت',                en: 'Status',               val: status }
        ];
    }
},

ballast: {
    inputs: [
        { id: 'vin',  def: 310, fa: 'ولتاژ DC بعد یکسوساز (V)', en: 'DC Bus Voltage (V)' },
        { id: 'plamp',def: 36,  fa: 'توان لامپ (W)',             en: 'Lamp Power (W)' },
        { id: 'vlamp',def: 100, fa: 'ولتاژ کاری لامپ (V)',       en: 'Lamp Operating Voltage (V)' },
        { id: 'fsw',  def: 40,  fa: 'فرکانس کاری (kHz)',         en: 'Operating Freq (kHz)' }
    ],
    calc: (v) => {
        const iLamp = v.plamp / v.vlamp;
        const zLamp = v.vlamp / iLamp;
        // تانک رزونانس LC
        const omega = 2 * Math.PI * v.fsw * 1000;
        // Q=1.5 معمول برای بالاست
        const Q = 1.5;
        const L = (zLamp * Q) / omega * 1e6;
        const C = 1 / (omega * zLamp / Q) * 1e9;
        const pIn = v.plamp / 0.92;
        return [
            { fa: 'جریان لامپ',           en: 'Lamp Current',         val: (iLamp * 1000).toFixed(0) + ' mA' },
            { fa: 'امپدانس لامپ',         en: 'Lamp Impedance',       val: zLamp.toFixed(1) + ' Ω' },
            { fa: 'سلف رزونانس L',        en: 'Resonant Inductor L',  val: L.toFixed(2) + ' μH' },
            { fa: 'خازن رزونانس C',       en: 'Resonant Cap C',       val: C.toFixed(1) + ' nF' },
            { fa: 'ضریب کیفیت Q',         en: 'Quality Factor Q',     val: Q.toFixed(1) },
            { fa: 'توان ورودی تخمینی',    en: 'Est. Input Power',     val: pIn.toFixed(1) + ' W' }
        ];
    }
},

ups: {
    inputs: [
        { id: 'pload',  def: 500, fa: 'توان بار (VA)',        en: 'Load Power (VA)' },
        { id: 'pf',     def: 0.8, fa: 'ضریب توان بار',        en: 'Load Power Factor' },
        { id: 'vbat',   def: 12,  fa: 'ولتاژ باتری (V)',      en: 'Battery Voltage (V)' },
        { id: 'ah',     def: 100, fa: 'ظرفیت باتری (Ah)',     en: 'Battery Capacity (Ah)' },
        { id: 'nbat',   def: 1,   fa: 'تعداد باتری سری',      en: 'Batteries in Series' },
        { id: 'eff',    def: 90,  fa: 'راندمان اینورتر (%)',  en: 'Inverter Efficiency (%)' }
    ],
    calc: (v) => {
        const pReal = v.pload * v.pf;
        const vBatTotal = v.vbat * v.nbat;
        const eta = v.eff / 100;
        const energyBat = vBatTotal * v.ah;
        const energyUseful = energyBat * eta * 0.8; // 80% DoD
        const backupTime = energyUseful / pReal;
        const iBatDraw = pReal / (vBatTotal * eta);
        const chargeTime = v.ah * 0.3 / (v.ah * 0.1);
        return [
            { fa: 'توان واقعی بار',       en: 'Real Load Power',      val: pReal.toFixed(0) + ' W' },
            { fa: 'ولتاژ کل بانک باتری',  en: 'Battery Bank Voltage', val: vBatTotal.toFixed(1) + ' V' },
            { fa: 'انرژی ذخیره‌شده',       en: 'Stored Energy',        val: energyBat.toFixed(0) + ' Wh' },
            { fa: 'انرژی قابل استفاده',   en: 'Usable Energy (80%)',  val: energyUseful.toFixed(0) + ' Wh' },
            { fa: 'جریان کشیده‌شده',       en: 'Battery Draw Current', val: iBatDraw.toFixed(1) + ' A' },
            { fa: 'زمان پشتیبانی تخمینی', en: 'Est. Backup Time',     val: (backupTime * 60).toFixed(0) + ' min' }
        ];
    }
},

hbridge: {
    inputs: [
        { id: 'vdc',  def: 24,  fa: 'ولتاژ ورودی DC (V)', en: 'DC Input Voltage (V)' },
        { id: 'd',    def: 75,  fa: 'دیوتی سایکل (%)',    en: 'Duty Cycle (%)' },
        { id: 'r',    def: 2,   fa: 'مقاومت موتور (Ω)',   en: 'Motor Resistance (Ω)' },
        { id: 'ke',   def: 0.05,fa: 'ثابت ولتاژی موتور Ke (V/rpm)', en: 'Motor Ke (V/rpm)' },
        { id: 'fsw',  def: 20,  fa: 'فرکانس PWM (kHz)',   en: 'PWM Frequency (kHz)' }
    ],
    calc: (v) => {
        const d = Math.min(100, Math.max(0, v.d)) / 100;
        // مد Bipolar: Vout = (2D-1)·Vdc
        const vOut = (2 * d - 1) * v.vdc;
        const absV = Math.abs(vOut);
        const direction = (vOut >= 0) ? 'جلو (CW)' : 'عقب (CCW)';
        // سرعت تقریبی در بی‌باری
        const rpmNoLoad = absV / v.ke;
        const iStall = absV / v.r;
        const pMax = absV * iStall / 4; // توان ماکسیمم در نیمه سرعت
        return [
            { fa: 'ولتاژ موتور (Bipolar)', en: 'Motor Voltage',         val: vOut.toFixed(2) + ' V' },
            { fa: 'جهت چرخش',              en: 'Rotation Direction',    val: direction },
            { fa: 'سرعت بی‌باری (RPM)',    en: 'No-load Speed',         val: rpmNoLoad.toFixed(0) + ' rpm' },
            { fa: 'جریان Stall',           en: 'Stall Current',         val: iStall.toFixed(2) + ' A' },
            { fa: 'توان ماکس تخمینی',      en: 'Est. Max Power',        val: pMax.toFixed(1) + ' W' },
            { fa: 'فرکانس PWM',            en: 'PWM Frequency',         val: v.fsw.toFixed(0) + ' kHz' }
        ];
    }
},

vfd: {
    inputs: [
        { id: 'vmotor', def: 380, fa: 'ولتاژ نامی موتور (V)', en: 'Motor Rated Voltage (V)' },
        { id: 'fnom',   def: 50,  fa: 'فرکانس نامی (Hz)',     en: 'Rated Frequency (Hz)' },
        { id: 'fout',   def: 30,  fa: 'فرکانس خروجی (Hz)',    en: 'Output Frequency (Hz)' },
        { id: 'pmotor', def: 5.5, fa: 'توان موتور (kW)',      en: 'Motor Power (kW)' },
        { id: 'poles',  def: 4,   fa: 'تعداد قطب',             en: 'Number of Poles' }
    ],
    calc: (v) => {
        const vfRatio = v.vmotor / v.fnom;
        const vOut = vfRatio * v.fout;
        const rpmSync = (120 * v.fout) / v.poles;
        const slip = 3;
        const rpmReal = rpmSync * (1 - slip / 100);
        const torqueRatio = (v.fout <= v.fnom) ? 100 : (v.fnom / v.fout * 100);
        const pOut = v.pmotor * (v.fout / v.fnom);
        const vdcBus = v.vmotor * Math.SQRT2 / Math.sqrt(3) * 1.35;
        return [
            { fa: 'نسبت ثابت V/f',         en: 'V/f Ratio',            val: vfRatio.toFixed(2) + ' V/Hz' },
            { fa: 'ولتاژ خروجی تنظیمی',    en: 'Adjusted Output V',    val: vOut.toFixed(1) + ' V' },
            { fa: 'سرعت سنکرون',           en: 'Synchronous Speed',    val: rpmSync.toFixed(0) + ' rpm' },
            { fa: 'سرعت واقعی (3% لغزش)', en: 'Actual Speed',         val: rpmReal.toFixed(0) + ' rpm' },
            { fa: 'ولتاژ لینک DC',         en: 'DC Bus Voltage',       val: vdcBus.toFixed(0) + ' V' },
            { fa: 'گشتاور نسبی',           en: 'Relative Torque',      val: torqueRatio.toFixed(0) + ' %' },
            { fa: 'توان خروجی تخمینی',     en: 'Est. Output Power',    val: pOut.toFixed(2) + ' kW' }
        ];
    }
},

mppt: {
    inputs: [
        { id: 'voc',   def: 36.5, fa: 'ولتاژ مدار باز Voc (V)', en: 'Open Circuit Voltage Voc (V)' },
        { id: 'isc',   def: 9.5,  fa: 'جریان اتصال کوتاه Isc (A)', en: 'Short Circuit Current Isc (A)' },
        { id: 'vmpp',  def: 30,   fa: 'ولتاژ MPP (V)',          en: 'MPP Voltage (V)' },
        { id: 'impp',  def: 8.8,  fa: 'جریان MPP (A)',          en: 'MPP Current (A)' },
        { id: 'vbat',  def: 24,   fa: 'ولتاژ باتری (V)',        en: 'Battery Voltage (V)' },
        { id: 'eff',   def: 97,   fa: 'راندمان MPPT (%)',       en: 'MPPT Efficiency (%)' }
    ],
    calc: (v) => {
        const pMax = v.vmpp * v.impp;
        const ff = pMax / (v.voc * v.isc);
        const pBat = pMax * (v.eff / 100);
        const iBat = pBat / v.vbat;
        const mode = (v.vmpp > v.vbat) ? 'Buck (کاهنده)' : 'Boost (افزاینده)';
        const dBuck = v.vbat / v.vmpp;
        return [
            { fa: 'توان ماکس پنل (Pmax)',  en: 'Panel Max Power',      val: pMax.toFixed(1) + ' W' },
            { fa: 'ضریب پر شدن (FF)',     en: 'Fill Factor (FF)',     val: ff.toFixed(3) },
            { fa: 'توان خروجی مبدل',       en: 'Converter Output Power', val: pBat.toFixed(1) + ' W' },
            { fa: 'جریان شارژ باتری',      en: 'Battery Charge Current', val: iBat.toFixed(2) + ' A' },
            { fa: 'حالت عملکرد مبدل',      en: 'Converter Mode',       val: mode },
            { fa: 'دیوتی سایکل تقریبی',   en: 'Approx Duty Cycle',    val: (dBuck * 100).toFixed(1) + ' %' }
        ];
    }
},

            buck: {
                inputs: [
                    { id: 'vin', def: 24, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 25, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' }
                ],
                calc: (v) => {
                    let d = v.vout / v.vin; if (d > 1) d = 1; if (d < 0) d = 0;
                    const lmin = ((1 - d) * v.r) / (2 * (v.fsw * 1000)) * 1e6;
                    const iout = v.vout / v.r;
                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف CCM', en: 'Min Inductor (CCM)', val: lmin.toFixed(2) + ' μH' },
                        { fa: 'جریان خروجی', en: 'Output Current', val: iout.toFixed(2) + ' A' }
                    ];
                }
            },


            cuk: {
                inputs: [
                    { id: 'vin', def: 12, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی مطلق (V)', en: 'Output Voltage Mag (V)' },
                    { id: 'fsw', def: 25, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 20, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' }
                ],
                calc: (v) => {
                    const voutAbs = Math.abs(v.vout);
                    let d = voutAbs / (v.vin + voutAbs);
                    if (d > 0.9) d = 0.9; if (d < 0.1) d = 0.1;

                    const fHz = v.fsw * 1000;
                    const iout = voutAbs / v.r;
                    
                    // Critical Inductance calculations for CCM
                    const l1Min = (((1 - d) ** 2) * v.r) / (2 * d * fHz) * 1e6; // uH
                    const l2Min = ((1 - d) * v.r) / (2 * fHz) * 1e6;             // uH
                    const vc1 = v.vin + voutAbs;                                // Coupling Cap Voltage

                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف L1 (CCM)', en: 'Min L1 (CCM)', val: l1Min.toFixed(2) + ' μH' },
                        { fa: 'حداقل سلف L2 (CCM)', en: 'Min L2 (CCM)', val: l2Min.toFixed(2) + ' μH' },
                        { fa: 'ولتاژ خازن کوپلاژ C1', en: 'Coupling Cap C1 Volt', val: vc1.toFixed(1) + ' V' },
                        { fa: 'جریان خروجی', en: 'Output Current', val: iout.toFixed(2) + ' A' }
                    ];
                }
            },
            sepic: {
                inputs: [
                    { id: 'vin', def: 12, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 25, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 20, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' }
                ],
                calc: (v) => {
                    let d = v.vout / (v.vin + v.vout);
                    if (d > 0.9) d = 0.9; if (d < 0.1) d = 0.1;

                    const fHz = v.fsw * 1000;
                    const iout = v.vout / v.r;

                    // Critical Inductance calculations for CCM
                    const l1Min = (((1 - d) ** 2) * v.r) / (2 * d * fHz) * 1e6; // uH
                    const l2Min = ((1 - d) * v.r) / (2 * fHz) * 1e6;             // uH
                    const vStress = v.vin + v.vout;                            // Switch & Diode Peak Stress

                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف L1 (CCM)', en: 'Min L1 (CCM)', val: l1Min.toFixed(2) + ' μH' },
                        { fa: 'حداقل سلف L2 (CCM)', en: 'Min L2 (CCM)', val: l2Min.toFixed(2) + ' μH' },
                        { fa: 'حداکثر استرس ولتاژ سوییچ/دیود', en: 'Switch/Diode Max Volt Stress', val: vStress.toFixed(1) + ' V' },
                        { fa: 'جریان خروجی', en: 'Output Current', val: iout.toFixed(2) + ' A' }
                    ];
                }
            },


            zeta: {
                inputs: [
                    { id: 'vin', def: 12, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 25, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 20, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' }
                ],
                calc: (v) => {
                    let d = v.vout / (v.vin + v.vout);
                    if (d > 0.9) d = 0.9; if (d < 0.1) d = 0.1;
                    const fHz = v.fsw * 1000;
                    const l1Min = (((1 - d) ** 2) * v.r) / (2 * d * fHz) * 1e6;
                    const l2Min = ((1 - d) * v.r) / (2 * fHz) * 1e6;
                    const vStress = v.vin + v.vout;
                    const iout = v.vout / v.r;
                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف L1 (CCM)', en: 'Min L1 (CCM)', val: l1Min.toFixed(2) + ' μH' },
                        { fa: 'حداقل سلف L2 (CCM)', en: 'Min L2 (CCM)', val: l2Min.toFixed(2) + ' μH' },
                        { fa: 'استرس ولتاژ سوییچ/دیود', en: 'Switch/Diode Volt Stress', val: vStress.toFixed(1) + ' V' },
                        { fa: 'جریان خروجی', en: 'Output Current', val: iout.toFixed(2) + ' A' }
                    ];
                }
            },
            flyback: {
                inputs: [
                    { id: 'vin', def: 24, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 50, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' },
                    { id: 'n', def: 2, fa: 'نسبت ترانس (Np/Ns)', en: 'Turns Ratio (Np/Ns)' }
                ],
                calc: (v) => {
                    let d = (v.n * v.vout) / (v.vin + (v.n * v.vout));
                    if (d > 0.9) d = 0.9; if (d < 0.1) d = 0.1;
                    const fHz = v.fsw * 1000;
                    const lmMin = (((1 - d) ** 2) * v.r * (v.n ** 2)) / (2 * fHz) * 1e6;
                    const vStress = v.vin + (v.n * v.vout);
                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف مغناطیس‌کننده', en: 'Min Magnetizing Ind.', val: lmMin.toFixed(2) + ' μH' },
                        { fa: 'استرس ولتاژ سوییچ', en: 'Switch Voltage Stress', val: vStress.toFixed(1) + ' V' }
                    ];
                }
            },
            forward: {
                inputs: [
                    { id: 'vin', def: 48, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 50, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' },
                    { id: 'n', def: 2, fa: 'نسبت ترانس (Np/Ns)', en: 'Turns Ratio (Np/Ns)' }
                ],
                calc: (v) => {
                    let d = (v.n * v.vout) / v.vin;
                    if (d > 0.45) d = 0.45;
                    const fHz = v.fsw * 1000;
                    const lMin = ((1 - d) * v.r) / (2 * fHz) * 1e6;
                    const vStress = 2 * v.vin;
                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف خروجی', en: 'Min Output Inductor', val: lMin.toFixed(2) + ' μH' },
                        { fa: 'استرس ولتاژ سوییچ', en: 'Switch Voltage Stress', val: vStress.toFixed(1) + ' V' }
                    ];
                }
            },
            pushpull: {
                inputs: [
                    { id: 'vin', def: 24, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 50, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' },
                    { id: 'n', def: 1, fa: 'نسبت ترانس (Np/Ns)', en: 'Turns Ratio (Np/Ns)' }
                ],
                calc: (v) => {
                    let d = (v.n * v.vout) / (2 * v.vin);
                    if (d > 0.45) d = 0.45;
                    const fHz = v.fsw * 1000;
                    const lMin = ((1 - (2 * d)) * v.r) / (4 * fHz) * 1e6;
                    const vStress = 2 * v.vin;
                    return [
                        { fa: 'دیوتی سایکل هر سوییچ', en: 'Duty Cycle per Switch', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف خروجی', en: 'Min Output Inductor', val: lMin.toFixed(2) + ' μH' },
                        { fa: 'استرس ولتاژ سوییچ', en: 'Switch Voltage Stress', val: vStress.toFixed(1) + ' V' }
                    ];
                }
            },
            halfbridge: {
                inputs: [
                    { id: 'vin', def: 100, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 50, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' },
                    { id: 'n', def: 2, fa: 'نسبت ترانس (Np/Ns)', en: 'Turns Ratio (Np/Ns)' }
                ],
                calc: (v) => {
                    let d = (v.n * v.vout) / v.vin;
                    if (d > 0.45) d = 0.45;
                    const fHz = v.fsw * 1000;
                    const lMin = ((1 - (2 * d)) * v.r) / (4 * fHz) * 1e6;
                    const vStress = v.vin;
                    return [
                        { fa: 'دیوتی سایکل هر سوییچ', en: 'Duty Cycle per Switch', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف خروجی', en: 'Min Output Inductor', val: lMin.toFixed(2) + ' μH' },
                        { fa: 'استرس ولتاژ سوییچ', en: 'Switch Voltage Stress', val: vStress.toFixed(1) + ' V' }
                    ];
                }
            },
            fullbridge: {
                inputs: [
                    { id: 'vin', def: 100, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 12, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 50, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' },
                    { id: 'n', def: 4, fa: 'نسبت ترانس (Np/Ns)', en: 'Turns Ratio (Np/Ns)' }
                ],
                calc: (v) => {
                    let d = (v.n * v.vout) / (2 * v.vin);
                    if (d > 0.45) d = 0.45;
                    const fHz = v.fsw * 1000;
                    const lMin = ((1 - (2 * d)) * v.r) / (4 * fHz) * 1e6;
                    const vStress = v.vin;
                    return [
                        { fa: 'دیوتی سایکل هر جفت سوییچ', en: 'Duty Cycle per Pair', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف خروجی', en: 'Min Output Inductor', val: lMin.toFixed(2) + ' μH' },
                        { fa: 'استرس ولتاژ سوییچ', en: 'Switch Voltage Stress', val: vStress.toFixed(1) + ' V' }
                    ];
                }
            },


halfwave: {
    inputs: [
        { id: 'vm',  def: 311, fa: 'ولتاژ پیک ورودی (V)', en: 'Peak Input Voltage (V)' },
        { id: 'fsw', def: 50,  fa: 'فرکانس ورودی (Hz)',   en: 'Input Frequency (Hz)' },
        { id: 'r',   def: 100, fa: 'مقاومت بار (Ω)',       en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        const vdc  = v.vm / Math.PI;
        const vrms = v.vm / 2;
        const iout = vdc / v.r;
        const pdc  = vdc * iout;

        return [
            { fa: 'ولتاژ متوسط (Vdc)', en: 'Average Voltage (Vdc)', val: vdc.toFixed(2) + ' V' },
            { fa: 'ولتاژ مؤثر (Vrms)',  en: 'RMS Voltage (Vrms)',     val: vrms.toFixed(2) + ' V' },
            { fa: 'جریان بار (Idc)',    en: 'Load Current (Idc)',   val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی (Pdc)',   en: 'Output Power (Pdc)',   val: pdc.toFixed(2) + ' W' },
            { fa: 'ولتاژ معکوس (PIV)',  en: 'Peak Inverse Voltage', val: v.vm.toFixed(2) + ' V' }
        ];
    }
},
	centertap: {
    inputs: [
        { id: 'vm', def: 12, fa: 'ولتاژ پیک هر نیمه (V)', en: 'Secondary Peak Voltage (V)' },
        { id: 'r',  def: 50, fa: 'مقاومت بار (Ω)',       en: 'Load Resistor (Ω)' }
    ],
    calc: (v) => {
        // محاسبات ایده‌آل (بدون در نظر گرفتن افت ولتاژ دیود، مشابه کد halfwave شما)
        const vdc  = (2 * v.vm) / Math.PI;
        const vrms = v.vm / Math.SQRT2;
        const iout = vdc / v.r;
        const pdc  = vdc * iout;
        const piv  = 2 * v.vm; // ولتاژ معکوس در ترانس سر وسط 2Vm است

        return [
            { fa: 'ولتاژ متوسط (Vdc)', en: 'Average Voltage (Vdc)', val: vdc.toFixed(2) + ' V' },
            { fa: 'ولتاژ مؤثر (Vrms)',  en: 'RMS Voltage (Vrms)',     val: vrms.toFixed(2) + ' V' },
            { fa: 'جریان بار (Idc)',    en: 'Load Current (Idc)',   val: iout.toFixed(2) + ' A' },
            { fa: 'توان خروجی (Pdc)',   en: 'Output Power (Pdc)',   val: pdc.toFixed(2) + ' W' },
            { fa: 'ولتاژ معکوس (PIV)',  en: 'Peak Inverse Voltage', val: piv.toFixed(2) + ' V' }
        ];
    }
},

            boost: {
                inputs: [
                    { id: 'vin', def: 12, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: 24, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 25, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' }
                ],
                calc: (v) => {
                    let d = 1 - (v.vin / v.vout); if (d < 0) d = 0; if (d > 1) d = 1;
                    const lmin = (d * Math.pow(1 - d, 2) * v.r) / (2 * (v.fsw * 1000)) * 1e6;
                    const iin = (v.vout / v.r) / (1 - d);
                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف CCM', en: 'Min Inductor (CCM)', val: lmin.toFixed(2) + ' μH' },
                        { fa: 'جریان متوسط ورودی', en: 'Avg Input Current', val: iin.toFixed(2) + ' A' }
                    ];
                }
            },
            buck_boost: {
                inputs: [
                    { id: 'vin', def: 12, fa: 'ولتاژ ورودی (V)', en: 'Input Voltage (V)' },
                    { id: 'vout', def: -24, fa: 'ولتاژ خروجی (V)', en: 'Output Voltage (V)' },
                    { id: 'fsw', def: 25, fa: 'فرکانس (kHz)', en: 'Frequency (kHz)' },
                    { id: 'r', def: 10, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' }
                ],
                calc: (v) => {
                    const absV = Math.abs(v.vout);
                    const d = absV / (v.vin + absV);
                    const lmin = (Math.pow(1 - d, 2) * v.r) / (2 * (v.fsw * 1000)) * 1e6;
                    return [
                        { fa: 'دیوتی سایکل (D)', en: 'Duty Cycle (D)', val: (d * 100).toFixed(1) + ' %' },
                        { fa: 'حداقل سلف CCM', en: 'Min Inductor (CCM)', val: lmin.toFixed(2) + ' μH' },
                        { fa: 'حالت کاری', en: 'Operating Mode', val: (d < 0.5) ? 'کاهنده (Buck)' : 'افزاینده (Boost)' }
                    ];
                }
            },
            rectifier: {
                inputs: [
                    { id: 'vm', def: 311, fa: 'ولتاژ پیک (Vm)', en: 'Peak Voltage (Vm)' },
                    { id: 'f', def: 50, fa: 'فرکانس شبکه (Hz)', en: 'Line Freq (Hz)' },
                    { id: 'c', def: 1000, fa: 'خازن صافی (μF)', en: 'Filter Cap (μF)' },
                    { id: 'r', def: 100, fa: 'مقاومت بار (Ω)', en: 'Load Resistor (Ω)' }
                ],
                calc: (v) => {
                    const vdc_un = (2 * v.vm) / Math.PI;
                    const iout = vdc_un / v.r;
                    const ripple = iout / (2 * v.f * (v.c / 1e6));
                    let vdc_final = v.vm - (ripple / 2);
                    if (vdc_final < 0) vdc_final = 0;
                    return [
                        { fa: 'ولتاژ DC میانگین', en: 'Avg DC Voltage', val: vdc_final.toFixed(1) + ' V' },
                        { fa: 'ریپل ولتاژ (p-p)', en: 'Voltage Ripple', val: ripple.toFixed(2) + ' V' },
                        { fa: 'جریان بار', en: 'Load Current', val: iout.toFixed(2) + ' A' }
                    ];
                }
            }
        };

        

        // افزودن محتوای پیش‌فرض برای سایر مدارهای انگلیسی جهت جلوگیری از خطای خالی بودن
        CIRCUITS.forEach(c => {
            if(!eduData.en[c.id]) {
                eduData.en[c.id] = [
                    `<h3>${c.en}</h3><ul><li>Interactive simulation and full educational content for <code>${c.en}</code>.</li></ul>`,
                    `<h3>Key Formulas</h3><ul><li>Standard conversion formulas apply.</li></ul>`,
                    `<h3>Components Role</h3><ul><li>Semiconductor switches and passive filters.</li></ul>`,
                    `<h3>Applications</h3><ul><li>Industrial power electronics systems.</li></ul>`
                ];
            }
        });

        // ==========================================
        // 6. توابع اصلی مدیریت UI و منوها
        // ==========================================

        // رندر کردن منوی کشویی سایدبار (منوها در ابتدا بسته هستند)
        function renderSidebar() {
            const nav = document.getElementById('sidebar-nav');
            let html = '';
            
            CATEGORIES.forEach(cat => {
                // تمام دسته‌بندی‌ها به صورت پیش‌فرض کلاس collapsed دارند (بسته هستند)
                html += `
                <div class="cat-header collapsed" onclick="toggleCategory(this)">
                    <span>${cat[currentLang]}</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="cat-items collapsed">`;
                
                const catCircuits = CIRCUITS.filter(c => c.cat === cat.id);
                catCircuits.forEach(c => {
                    const isActive = (c.id === currentCircuit) ? 'active' : '';
                    const badge = c.hasSim 
                        ? `<span class="badge badge-sim">${dictUI[currentLang].badgeSim}</span>` 
                        : `<span class="badge badge-soon">${dictUI[currentLang].badgeSoon}</span>`;
                        
                    html += `
                    <button class="nav-btn ${isActive}" onclick="loadSimulator('${c.id}', this)">
                        <span>${c[currentLang]}</span>
                        ${badge}
                    </button>`;
                });
                
                html += `</div>`;
            });
            
            nav.innerHTML = html;
        }

        // باز و بسته کردن اکاردئونی دسته‌بندی‌ها
        function toggleCategory(headerEl) {
            headerEl.classList.toggle('collapsed');
            const itemsEl = headerEl.nextElementSibling;
            if (itemsEl && itemsEl.classList.contains('cat-items')) {
                itemsEl.classList.toggle('collapsed');
            }
        }

        // باز و بسته کردن سایدبار (کشویی)
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('collapsed');
        }

        // بارگذاری شبیه‌ساز یا پنل به زودی
function loadSimulator(id, btnElement) {

// خاموش کردن چراغ خانه هنگام رفتن به صفحات دیگر
const homeBtn = document.getElementById('home-btn');
if (homeBtn) homeBtn.classList.remove('active');

    currentCircuit = id;
    
    // هایلایت کردن دکمه منو
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if(btnElement) {
        btnElement.classList.add('active');
    } else {
        // پیدا کردن دکمه بر اساس ID در صورت عدم پاس دادن المان
        document.querySelectorAll('.nav-btn').forEach(b => {
            if(b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${id}'`)) {
                b.classList.add('active');
            }
        });
    }

    // 👈 مخفی کردن صفحه خانه و درباره ما، و نشان دادن بخش اصلی شبیه‌ساز
    const homeSec = document.getElementById('home-section');
    if (homeSec) homeSec.style.display = 'none';
    const elecCanvas = document.getElementById('electron-canvas');
    if (elecCanvas) elecCanvas.style.display = 'none';

    document.getElementById('about-section').style.display = 'none';
    document.getElementById('educational-section').style.display = 'block';

    const circuit = CIRCUITS.find(c => c.id === id);
    const fsContainer = document.getElementById('fs-container');
    const csSection = document.getElementById('coming-soon-section');
    const simFrame = document.getElementById('sim-frame');
    
        if (circuit && circuit.hasSim) {
        fsContainer.style.display = 'block';
        csSection.style.display = 'none';
        // 🎯 اصلاح مسیر جهت خواندن فایل از پوشه fa یا en
        simFrame.src = `./simulators/${currentLang}/${id}.html`;
    } else {
        fsContainer.style.display = 'none';
        csSection.style.display = 'flex';
        simFrame.src = 'about:blank';
    }

    switchEduTab(currentTab);
}

        // تغییر زبان سایت (فارسی / انگلیسی)
// تابع هوشمند تغییر زبان اصلی و فایل‌های شبیه‌ساز (نسخه قطعی)
function switchLanguage(lang) {
    currentLang = lang;
    
    // ۱. تنظیم جهت و زبان مرورگر (RTL / LTR)
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // ۲. روشن و خاموش کردن چراغ دکمه‌های زبان (فارسی / EN)
    const btnFa = document.getElementById('btn-fa');
    const btnEn = document.getElementById('btn-en');
    if (btnFa) {
        btnFa.classList.toggle('active', lang === 'fa');
        btnFa.classList.toggle('active-lang', lang === 'fa');
    }
    if (btnEn) {
        btnEn.classList.toggle('active', lang === 'en');
        btnEn.classList.toggle('active-lang', lang === 'en');
    }

    // ۳. ترجمه زنده تمام متون دارای data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (typeof dictUI !== 'undefined' && dictUI[lang] && dictUI[lang][key]) {
            el.innerHTML = dictUI[lang][key];
        }
    });

    // ۴. به‌روزرسانی مدار جاری، آی‌فریم شبیه‌ساز، ماشین‌حساب و آموزش
    if (typeof currentCircuit !== 'undefined' && currentCircuit) {
        // استخراج آی‌دی مدار به صورت امن (چه رشته باشد چه آبجکت)
        const circuitId = (typeof currentCircuit === 'object' && currentCircuit !== null) 
            ? currentCircuit.id 
            : currentCircuit;

        const circ = CIRCUITS.find(c => c.id === circuitId);

        if (circ) {
            // الف) به‌روزرسانی عنوان مدار
            const titleEl = document.getElementById('circuit-title');
            if (titleEl) {
                titleEl.innerText = lang === 'fa' ? circ.fa : circ.en;
            }

            // ب) 🎯 بارگذاری مجدد آی‌فریم شبیه‌ساز با زبان جدید (fa/en)
            const simFrame = document.getElementById('sim-frame');
            if (simFrame && circ.hasSim) {
                const targetSrc = `./simulators/${lang}/${circuitId}.html`;
                simFrame.src = targetSrc;
            }

            // ج) به‌روزرسانی ماشین‌حساب به زبان جدید
            if (typeof renderCalc === 'function') {
                renderCalc(circuitId);
            }

            // د) به‌روزرسانی متون آموزشی به زبان جدید
            if (typeof renderEdu === 'function') {
                renderEdu(circuitId);
            } else if (typeof switchEduTab === 'function' && typeof currentTab !== 'undefined') {
                switchEduTab(currentTab);
            }
        }
    }

    // ۵. بازنویسی مجدد منوی سیدبار به زبان انتخابی
    if (typeof renderSidebar === 'function') {
        renderSidebar();
    }
}

        // نمایش بخش درباره ما و حمایت
        // تابع نمایش بخش درباره ما و حمایت
function showAboutSection() {

	// خاموش کردن چراغ خانه هنگام رفتن به صفحات دیگر
const homeBtn = document.getElementById('home-btn');
if (homeBtn) homeBtn.classList.remove('active');
    // ۱. پیدا کردن تمام بخش‌های صفحه
    const homeSec     = document.getElementById('home-section');
    const eduSec      = document.getElementById('educational-section');
    const fsContainer = document.getElementById('fs-container');
    const csSection   = document.getElementById('coming-soon-section');
    const aboutSec    = document.getElementById('about-section');
    const elecCanvas  = document.getElementById('electron-canvas');

    // ۲. مخفی کردن تمام بخش‌های دیگر (خانه، شبیه‌ساز و...)
    if (homeSec)     homeSec.style.display = 'none';
    if (eduSec)      eduSec.style.display = 'none';
    if (fsContainer) fsContainer.style.display = 'none';
    if (csSection)   csSection.style.display = 'none';
    if (elecCanvas)  elecCanvas.style.display = 'none';

    // ۳. نمایش دادن فقط بخش درباره ما
    if (aboutSec) {
        aboutSec.style.display = 'block';
        // انتقال خودکار اسکرول به بالای صفحه
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ۴. برداشتن هایلایت از دکمه‌های منو
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
}

        function switchEduTab(index, btnElement) {
    currentTab = index;
    
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    const container = document.getElementById('edu-content-area');
    if (!container) return;

    if (index === 4) {
        renderCalculator(container);
        return;
    }

    const langData = eduData[currentLang] || {};
    const circuitData = langData[currentCircuit];

    if (!circuitData) {
        container.innerHTML = '<div style="padding:20px; color:var(--text-muted); text-align:center;">محتوایی برای این مدار ثبت نشده است.</div>';
        return;
    }

    if (Array.isArray(circuitData)) {
        container.innerHTML = circuitData[index] || '<div style="padding:20px; color:var(--text-muted); text-align:center;">اطلاعات این بخش موجود نیست.</div>';
    } else if (typeof circuitData === 'object') {
        const keys = ['concept', 'formulas', 'comps', 'apps'];
        const titles = ['مفهوم و کارکرد', 'فرمول‌های کلیدی', 'نقش قطعات', 'کاربردهای صنعتی'];
        const key = keys[index];
        const val = circuitData[key];

        if (!val) {
            container.innerHTML = '';
            return;
        }

        let html = `<h3>${titles[index]}</h3>`;
        if (Array.isArray(val)) {
            html += '<ul>' + val.map(item => `<li>${item}</li>`).join('') + '</ul>';
        } else {
            html += `<p>${val}</p>`;
        }
        container.innerHTML = html;
    }
}

        // ==========================================
        // 7. توابع ماشین حساب هوشمند
        // ==========================================
        function renderCalculator(container) {
            const conf = calcConfig[currentCircuit];
            if(!conf) {
                container.innerHTML = `<p style="color:var(--logo-gold); padding: 15px; text-align: center;">${dictUI[currentLang].calcNo}</p>`;
                return;
            }

            let html = `<div class="calc-wrapper">`;
            
            // پنل ورودی‌ها
            html += `<div class="calc-panel"><h4>⚙️ ${dictUI[currentLang].calcInput}</h4>`;
            conf.inputs.forEach(inp => {
                html += `
                <div class="input-group">
                    <label>${inp[currentLang]}</label>
                    <input type="number" id="cin_${inp.id}" value="${inp.def}" step="any" oninput="runCalculator()">
                </div>`;
            });
            html += `</div>`;

            // پنل خروجی‌ها
            html += `<div class="calc-panel"><h4>📊 ${dictUI[currentLang].calcOutput}</h4><div id="calc-results-box">`;
            
            const defaultVals = {};
            conf.inputs.forEach(inp => defaultVals[inp.id] = inp.def);
            const results = conf.calc(defaultVals);
            
            results.forEach((res, idx) => {
                html += `
                <div class="result-row">
                    <span class="result-label">${res[currentLang]}</span>
                    <span class="result-value" id="cres_${idx}">${res.val}</span>
                </div>`;
            });
            
            html += `</div></div></div>`;
            container.innerHTML = html;
        }

        function runCalculator() {
            const conf = calcConfig[currentCircuit];
            if(!conf) return;
            
            const vals = {};
            conf.inputs.forEach(inp => {
                const el = document.getElementById(`cin_${inp.id}`);
                vals[inp.id] = parseFloat(el.value) || 0;
            });

            const results = conf.calc(vals);
            
            results.forEach((res, idx) => {
                const resEl = document.getElementById(`cres_${idx}`);
                if(resEl && resEl.textContent !== String(res.val)) {
                    resEl.textContent = res.val;
                    // افکت درخشش سینمایی (Glow)
                    resEl.classList.remove('flash');
                    void resEl.offsetWidth; // ریست انیمیشن
                    resEl.classList.add('flash');
                    setTimeout(() => resEl.classList.remove('flash'), 300);
                }
            });
        }

        // ==========================================
        // 8. حالت تمام‌صفحه اختصاصی شبیه‌ساز (ایفریم)
        // ==========================================
        function toggleFullScreen() {
            const fsContainer = document.getElementById('fs-container');
            const txtBtn = document.getElementById('txt-fs');
            
            // اجرای تمام‌صفحه فقط و فقط روی کادر شبیه‌ساز
            if (!document.fullscreenElement) {
                if (fsContainer.style.display !== 'none') {
                    if (fsContainer.requestFullscreen) {
                        fsContainer.requestFullscreen();
                    } else if (fsContainer.webkitRequestFullscreen) {
                        fsContainer.webkitRequestFullscreen();
                    } else if (fsContainer.msRequestFullscreen) {
                        fsContainer.msRequestFullscreen();
                    }
                    txtBtn.textContent = dictUI[currentLang].fsExit;
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                txtBtn.textContent = dictUI[currentLang].fsEnter;
            }
        }

        // شنونده تغییر حالت تمام‌صفحه (برای کلید ESC)
        document.addEventListener('fullscreenchange', handleFSChange);
        document.addEventListener('webkitfullscreenchange', handleFSChange);

        function handleFSChange() {
            const txtBtn = document.getElementById('txt-fs');
            if (!document.fullscreenElement && !document.webkitIsFullScreen) {
                txtBtn.textContent = dictUI[currentLang].fsEnter;
            } else {
                txtBtn.textContent = dictUI[currentLang].fsExit;
            }
        }

        // ==========================================
        // 9. کپی آدرس‌های حمایت
        // ==========================================
        function copyText(textToCopy, elementId) {
            const ta = document.createElement('textarea');
            ta.value = textToCopy;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);

            const btn = document.getElementById(elementId);
            if(btn) {
                btn.textContent = dictUI[currentLang].copiedText;
                btn.classList.add('copied');
                btn.style.background = 'rgba(16, 185, 129, 0.2)';
                btn.style.color = '#10b981';

                setTimeout(() => {
                    btn.textContent = dictUI[currentLang].clickToCopy;
                    btn.classList.remove('copied');
                    btn.style.background = 'rgba(0, 242, 254, 0.1)';
                    btn.style.color = 'var(--neon-accent)';
                }, 2000);
            }
        }

        // ==========================================
        // 10. راه‌اندازی اولیه پروژه (DOMContentLoaded)
        // ==========================================
        document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();

    // ابتدا صفحه هوم نمایش داده می‌شود
    showHome();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('lang') === 'en') {
        switchLanguage('en');
    }
});

// تابع نمایش صفحه خانه
// تابع نمایش صفحه خانه (مخفی‌کننده کامل شبیه‌ساز و تمام بخش‌های دیگر)
function showHome() {

// روشن کردن چراغ خانه
const homeBtn = document.getElementById('home-btn');
if (homeBtn) homeBtn.classList.add('active');

    const homeSec     = document.getElementById('home-section');
    const eduSec      = document.getElementById('educational-section');
    const aboutSec    = document.getElementById('about-section');
    const fsContainer = document.getElementById('fs-container');
    const csSection   = document.getElementById('coming-soon-section');
    const elecCanvas  = document.getElementById('electron-canvas');

    // ۱. نمایش صفحه خانه
    if (homeSec) homeSec.style.display = 'block';
    if (elecCanvas) elecCanvas.style.display = 'block';

    // ۲. مخفی کردن شبیه‌ساز، بخش آموزش، پیام به زودی و درباره ما
    if (eduSec)      eduSec.style.display = 'none';
    if (aboutSec)    aboutSec.style.display = 'none';
    if (fsContainer) fsContainer.style.display = 'none';
    if (csSection)   csSection.style.display = 'none';

    // ۳. برداشتن هایلایت دکمه‌های منوی کنار
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    // ۴. راه‌اندازی مجدد انیمیشن‌های صفحه خانه
    if (typeof window._startOsc === 'function') {
        setTimeout(window._startOsc, 100);
    }
    if (typeof window._startWaveElectron === 'function') {
        setTimeout(window._startWaveElectron, 300);
    }
}



// ============================================
// 1. ذرات الکترون پس‌زمینه
// ============================================
(function(){
    const c = document.getElementById('electron-canvas');
    if(!c) return;
    const ctx = c.getContext('2d');
    let parts = [], mouse = {x:-1000, y:-1000};

    function resize(){
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Electron {
        constructor(){ this.reset(); }
        reset(){
            this.x = Math.random() * c.width;
            this.y = Math.random() * c.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.r = Math.random() * 2 + 0.5;
            this.a = Math.random() * 0.5 + 0.1;
            this.col = Math.random() > 0.5 ? '0,242,254' : '79,172,254';
            if(Math.random() > 0.85) this.col = '226,177,112';
        }
        update(){
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if(d < 200){
                this.vx += dx * 0.00008;
                this.vy += dy * 0.00008;
            }
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.999;
            this.vy *= 0.999;
            if(this.x < 0 || this.x > c.width) this.vx *= -1;
            if(this.y < 0 || this.y > c.height) this.vy *= -1;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${this.col},${this.a})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r*3, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${this.col},${this.a*0.15})`;
            ctx.fill();
        }
    }

    const count = Math.min(120, Math.floor(c.width * c.height / 12000));
    for(let i = 0; i < count; i++) parts.push(new Electron());

    function drawLines(){
        for(let i = 0; i < parts.length; i++){
            for(let j = i+1; j < parts.length; j++){
                const dx = parts[i].x - parts[j].x;
                const dy = parts[i].y - parts[j].y;
                const d = Math.sqrt(dx*dx + dy*dy);
                if(d < 120){
                    ctx.beginPath();
                    ctx.moveTo(parts[i].x, parts[i].y);
                    ctx.lineTo(parts[j].x, parts[j].y);
                    ctx.strokeStyle = `rgba(0,242,254,${0.08*(1 - d/120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate(){
        ctx.clearRect(0, 0, c.width, c.height);
        parts.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ============================================
// 2. اسیلوسکوپ زنده (موج نارنجی رو به چپ + پالس مات)
// ============================================
// ============================================
// 2. اسیلوسکوپ زنده (پالس آبی کوچیک‌تر و کم‌رنگ‌تر)
// ============================================
(function(){
    let animId=null, phase=0, lastTime=0;
    const SPEED=0.025;

    function draw(timestamp){
        if(!lastTime) lastTime=timestamp;
        const dt=Math.min(timestamp-lastTime, 50);
        lastTime=timestamp;
        phase += SPEED * (dt/16.667);

        const cvs=document.getElementById('oscilloscope-canvas');
        if(!cvs) return;

        const W=cvs.clientWidth || 750;
        const H=cvs.clientHeight || 220;
        const dpr=window.devicePixelRatio||1;

        let resized = false;
        if(cvs.width!==Math.round(W*dpr)||cvs.height!==Math.round(H*dpr)){
            cvs.width=Math.round(W*dpr);
            cvs.height=Math.round(H*dpr);
            resized = true;
        }
        const ctx=cvs.getContext('2d');
        ctx.setTransform(dpr,0,0,dpr,0,0);

        if(resized){
            ctx.fillStyle='#04070d';
        } else {
            ctx.fillStyle='rgba(4, 7, 13, 0.45)';
        }
        ctx.fillRect(0,0,W,H);

        // رسم گرید
        ctx.strokeStyle='rgba(0,242,254,0.03)';
        ctx.lineWidth=0.5;
        for(let i=1;i<10;i++){const x=W*i/10;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
        for(let i=1;i<8;i++){const y=H*i/8;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
        
        ctx.strokeStyle='rgba(0,242,254,0.06)';ctx.lineWidth=0.8;
        ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();
        ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.stroke();

        const mid=H/2, ph=phase;
        const freq = Math.PI * 4.5;

        // ۱) سینوسی طلایی
        ctx.beginPath();
        ctx.strokeStyle='rgba(255, 180, 60, 0.95)';
        ctx.lineWidth=1.8;
        ctx.shadowColor='#ffb43c';
        ctx.shadowBlur=6;
        for(let x=0;x<=W;x++){
            const y=mid+Math.sin((x/W)*freq + ph)*mid*0.6;
            x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.stroke();ctx.shadowBlur=0;

        // ۲) یکسوشده سبز
        ctx.beginPath();
        ctx.strokeStyle='rgba(16, 185, 129, 0.9)';
        ctx.lineWidth=1.8;
        ctx.shadowColor='#10b981';
        ctx.shadowBlur=6;
        for(let x=0;x<=W;x++){
            const y=mid-Math.abs(Math.sin((x/W)*freq + ph))*mid*0.58;
            x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.stroke();ctx.shadowBlur=0;

        // ۳) مربعی نارنجی اصلی
        ctx.beginPath();
        ctx.strokeStyle='#ff6b47';
        ctx.lineWidth=1.8;
        ctx.shadowColor='#ff6b47';
        ctx.shadowBlur=5;
        const amp=mid*0.58;
        let prev=null;
        for(let x=0;x<=W;x++){
            const t=(x/W)*freq - ph;
            const y=mid+(Math.sin(t)>=0 ? -amp : amp);
            if(x===0){
                ctx.moveTo(x,y);
            } else if(prev!==null && y!==prev){
                ctx.lineTo(x,prev);
                ctx.lineTo(x,y);
            } else {
                ctx.lineTo(x,y);
            }
            prev=y;
        }
        ctx.stroke();ctx.shadowBlur=0;

        // ۴) پالس آبی (کوچیک‌تر و کم‌رنگ‌تر شده)
        ctx.beginPath();
        ctx.strokeStyle='rgba(0, 160, 240, 0.4)'; // کم‌رنگ
        ctx.lineWidth=1.2;
        ctx.shadowBlur=0;
        
        const pwmH = 10; // ارتفاع نصف شد (کوچیک‌تر)
        const pwmBase = H * 0.91;
        const numCycles = 12;
        const cycleW = W / numCycles;
        const duty = 0.45;

        for(let i = 0; i < numCycles; i++){
            const startX = i * cycleW;
            const highX = startX + cycleW * duty;
            const endX = startX + cycleW;

            ctx.moveTo(startX, pwmBase);
            ctx.lineTo(startX, pwmBase - pwmH);
            ctx.lineTo(highX, pwmBase - pwmH);
            ctx.lineTo(highX, pwmBase);
            ctx.lineTo(endX, pwmBase);
        }
        ctx.stroke();

        animId=requestAnimationFrame(draw);
    }

    window._startOsc=function(){
        if(animId){cancelAnimationFrame(animId);animId=null;}
        lastTime=0; phase=0;
        animId=requestAnimationFrame(draw);
    };
    window._stopOsc=function(){if(animId){cancelAnimationFrame(animId);animId=null;}};

    window.addEventListener('load',function(){
        setTimeout(window._startOsc, 200);
    });
})();

// ============================================
// 3. انیمیشن الکترون + موج قرینه + چرخش لوگو
// ============================================
(function(){
    let animId=null;
    function start(){
        const cvs=document.getElementById('wave-electron-canvas');
        if(!cvs)return;
        const hero=cvs.parentElement;
        if(!hero)return;
        const dpr=window.devicePixelRatio||1;
        function resize(){
            const w=hero.clientWidth,h=hero.clientHeight;
            cvs.width=w*dpr;cvs.height=h*dpr;
            cvs.style.width=w+'px';cvs.style.height=h+'px';
        }
        resize();
        window.addEventListener('resize',resize);
        const ctx=cvs.getContext('2d');
        const logoEl=document.querySelector('.hero-logo-container');
        const CYCLE=6000,WP=80,WA=25,WF=3;
        let startTime=null;
        function getP(){
            const w=cvs.width/dpr,h=cvs.height/dpr;
            return{w,h,cx:w/2,cy:h*0.28,ls:w*0.05,le:w*0.38,rs:w*0.62,re:w*0.95};
        }
        function drawWave(x1,x2,cy,prog,lit,mir){
            ctx.beginPath();
            for(let i=0;i<=WP;i++){
                const t=i/WP,x=x1+(x2-x1)*t;
                const y=cy+Math.sin(mir?-t*Math.PI*2*WF:t*Math.PI*2*WF)*WA;
                i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
            }
            if(lit&&prog>0){
                const g=ctx.createLinearGradient(x1,0,x2,0);
                const p=Math.min(prog,1);
                g.addColorStop(0,'#4facfe');
                g.addColorStop(Math.max(p-0.05,0),'#4facfe');
                g.addColorStop(Math.min(p+0.05,1),'#4a5568');
                g.addColorStop(1,'#4a5568');
                ctx.strokeStyle=g;ctx.shadowColor='#4facfe';ctx.shadowBlur=8;
            }else{ctx.strokeStyle='#4a5568';ctx.shadowBlur=0;}
            ctx.lineWidth=2.5;ctx.stroke();ctx.shadowBlur=0;
        }
        function waveY(t,cy,mir){return cy+Math.sin(mir?-t*Math.PI*2*WF:t*Math.PI*2*WF)*WA;}
        function drawE(x,y){
            const g=ctx.createRadialGradient(x,y,0,x,y,14);
            g.addColorStop(0,'rgba(79,172,254,0.9)');
            g.addColorStop(0.4,'rgba(79,172,254,0.4)');
            g.addColorStop(1,'rgba(79,172,254,0)');
            ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,14,0,Math.PI*2);ctx.fill();
            ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
        }
        function frame(ts){
            if(!startTime)startTime=ts;
            const el=(ts-startTime)%CYCLE,pr=el/CYCLE;
            const p=getP();
            ctx.setTransform(dpr,0,0,dpr,0,0);
            ctx.clearRect(0,0,p.w,p.h);
            let ex=0,ey=p.cy,ll=false,lp=0,rl=false,rp=0,show=true;
            if(pr<0.05){ex=pr/0.05*p.ls;ey=p.cy;}
            else if(pr<0.30){const t=(pr-0.05)/0.25;ll=true;lp=t;ex=p.ls+(p.le-p.ls)*t;ey=waveY(t,p.cy,false);}
            else if(pr<0.45){const t=(pr-0.30)/0.15;ex=p.le+(p.cx-p.le)*t;ey=p.cy;ll=t<0.3;lp=1;}
            else if(pr<0.55){
                const t=(pr-0.45)/0.10;ex=p.cx;ey=p.cy;show=Math.sin(t*Math.PI*8)>0;
                if(logoEl){
                    logoEl.style.animation='none';
                    logoEl.style.transition='none';
                    logoEl.style.transform='rotate('+Math.round(t*1440)+'deg)';
                }
            }
            else if(pr<0.70){
                const t=(pr-0.55)/0.15;ex=p.cx+(p.rs-p.cx)*t;ey=p.cy;
                if(logoEl&&pr>0.56){
                    logoEl.style.animation='';
                    logoEl.style.transition='transform 0.5s ease';
                    logoEl.style.transform='rotate(0deg)';
                }
            }
            else if(pr<0.90){const t=(pr-0.70)/0.20;rl=true;rp=t;ex=p.rs+(p.re-p.rs)*t;ey=waveY(t,p.cy,true);}
            else{const t=(pr-0.90)/0.10;ex=p.re+(p.w-p.re)*t;ey=p.cy;rl=t<0.3;rp=1;}
            drawWave(p.ls,p.le,p.cy,lp,ll,false);
            drawWave(p.rs,p.re,p.cy,rp,rl,true);
            if(show)drawE(ex,ey);
            animId=requestAnimationFrame(frame);
        }
        if(animId)cancelAnimationFrame(animId);
        startTime=null;
        animId=requestAnimationFrame(frame);
    }
    window._startWaveElectron=start;
    window._stopWaveElectron=function(){if(animId){cancelAnimationFrame(animId);animId=null;}};
    window.addEventListener('load',function(){setTimeout(start,500);});
})();

// ============================================
// 4. شمارنده‌های انیمیشنی آمار
// ============================================
(function(){
    function animateCounter(id, target, duration) {
        const el = document.getElementById(id);
        if (!el) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.innerText = target + '+';
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(start);
            }
        }, 16);
    }
    window.addEventListener('load', () => {
        setTimeout(() => animateCounter('stat-circuits', 43, 2000), 1200);
        setTimeout(() => animateCounter('stat-categories', 6, 1500), 1400);
        setTimeout(() => animateCounter('stat-formulas', 120, 2500), 1600);
        setTimeout(() => animateCounter('stat-live', 30, 1200), 1800);
    });
})();





// ============================================
// 5. اسکرول به درباره ما
// ============================================
function scrollToAbout() {
    showAboutSection();
}



// === رفع باگ: تشخیص خودکار تغییر سایز هیرو و بازسازی انیمیشن موج ===
(function(){
    let lastW = 0, lastH = 0;
    setInterval(() => {
        const cvs = document.getElementById('wave-electron-canvas');
        if(!cvs) return;
        const hero = cvs.parentElement;
        if(!hero) return;
        const w = hero.clientWidth;
        const h = hero.clientHeight;
        if(w === 0 || h === 0) return;
        if(w !== lastW || h !== lastH){
            lastW = w;
            lastH = h;
            if(typeof window._startWaveElectron === 'function'){
                window._startWaveElectron();
            }
        }
    }, 250);
})();



// ==========================================
// SEO Deep Linking & Auto-Load System
// ==========================================
window.addEventListener('load', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var circuitParam = urlParams.get('circuit');
    var langParam = urlParams.get('lang');

    // ۱. تنظیم زبان
    if ((langParam === 'fa' || langParam === 'en') && typeof switchLanguage === 'function') {
        switchLanguage(langParam);
    }

    // ۲. بارگذاری اتوماتیک مدار
    if (circuitParam && typeof loadSimulator === 'function') {
        setTimeout(function() {
            loadSimulator(circuitParam);
        }, 200);
    }
});
