/* Visible copy for kogiagroup.com, in the three company languages.
   Style rule: no em dash, no semicolon in visible text. Claims must be true. */
import type { T } from "./i18n";

export const EMAIL = "contact@kogiagroup.com";

export const NAV: { href: string; label: T }[] = [
  { href: "/industries", label: { en: "Industries", fr: "Secteurs", ar: "القطاعات" } },
  { href: "/products", label: { en: "Products", fr: "Produits", ar: "المنتجات" } },
  { href: "/capabilities", label: { en: "Capabilities", fr: "Savoir-faire", ar: "قدراتنا" } },
  { href: "/how-we-work", label: { en: "How we work", fr: "Notre méthode", ar: "طريقة عملنا" } },
  { href: "/presence", label: { en: "Presence", fr: "Présence", ar: "حضورنا" } },
  { href: "/insights", label: { en: "Insights", fr: "Tendances", ar: "اتجاهات" } },
  { href: "/about", label: { en: "About", fr: "À propos", ar: "من نحن" } },
];

export const C = {
  contact: { en: "Contact us", fr: "Nous contacter", ar: "تواصل معنا" },
  menu: { en: "Menu", fr: "Menu", ar: "القائمة" },
  language: { en: "Language", fr: "Langue", ar: "اللغة" },
  skip: { en: "Skip to content", fr: "Aller au contenu", ar: "الانتقال إلى المحتوى" },
  learnMore: { en: "Learn more", fr: "En savoir plus", ar: "اعرف المزيد" },
  allProducts: { en: "All products", fr: "Tous les produits", ar: "كل المنتجات" },
  allIndustries: { en: "All industries", fr: "Tous les secteurs", ar: "كل القطاعات" },
  products: { en: "Products", fr: "Produits", ar: "المنتجات" },
  industries: { en: "Industries", fr: "Secteurs", ar: "القطاعات" },
  modules: { en: "Modules", fr: "Modules", ar: "الوحدات" },
  languages: { en: "Languages", fr: "Langues", ar: "اللغات" },
  industry: { en: "Industry", fr: "Secteur", ar: "القطاع" },
  status: { en: "Status", fr: "Statut", ar: "الحالة" },
  alsoIn: { en: "Also serves", fr: "Sert aussi", ar: "يخدم أيضاً" },
  whatTheyNeed: { en: "What organisations need", fr: "Ce dont les organisations ont besoin", ar: "ما تحتاجه المؤسسات" },
  whatWeBring: { en: "What we bring", fr: "Ce que nous apportons", ar: "ما نقدمه" },
  ourProducts: { en: "Our products in this industry", fr: "Nos produits dans ce secteur", ar: "منتجاتنا في هذا القطاع" },
  privateAccess: { en: "Private access. Contact us for a presentation.", fr: "Accès privé. Contactez-nous pour une présentation.", ar: "دخول خاص. تواصل معنا لطلب عرض تقديمي." },
  comingSoon: { en: "In development. Contact us to join the first clinics.", fr: "En développement. Contactez-nous pour faire partie des premières cliniques.", ar: "قيد التطوير. تواصل معنا لتكون عيادتك من أوائل العيادات." },
  notFoundTitle: { en: "This page does not exist", fr: "Cette page n'existe pas", ar: "هذه الصفحة غير موجودة" },
  notFoundBody: { en: "The address may have changed when the site was reorganised.", fr: "L'adresse a peut-être changé lors de la réorganisation du site.", ar: "ربما تغيّر العنوان عند إعادة تنظيم الموقع." },
  home: { en: "Home", fr: "Accueil", ar: "الرئيسية" },
  planned: { en: "Planned", fr: "Prévu", ar: "مخطَّط له" },
  linesH: { en: "Solution lines in preparation", fr: "Lignes de solutions en préparation", ar: "خطوط الحلول قيد الإعداد" },
  linesNote: {
    en: "These lines are designed and not yet built. The roles, approval engine and audit trail they rest on already run in our products. We are open to a first partner institution for each.",
    fr: "Ces lignes sont conçues et pas encore construites. Les rôles, le moteur de validation et le journal d'audit sur lesquels elles reposent fonctionnent déjà dans nos produits. Nous sommes ouverts à une première institution partenaire pour chacune.",
    ar: "هذه الخطوط مصمَّمة ولم تُبنَ بعد. الأدوار ومحرك الموافقات وسجل التدقيق التي تقوم عليها تعمل فعلاً في منتجاتنا. نرحب بمؤسسة شريكة أولى لكل خط منها.",
  },
};

export const META = {
  title: { en: "KogiaGroup · Technology for institutions", fr: "KogiaGroup · Technologie pour les institutions", ar: "KogiaGroup · تقنية للمؤسسات" },
  description: {
    en: "KogiaGroup designs, builds, integrates and supports software for healthcare, education, security, government and enterprise, in Arabic, French and English.",
    fr: "KogiaGroup conçoit, développe, intègre et maintient des logiciels pour la santé, l'éducation, la sécurité, le secteur public et les entreprises, en arabe, français et anglais.",
    ar: "تصمم KogiaGroup البرمجيات وتطورها وتدمجها وتدعمها لقطاعات الصحة والتعليم والأمن والقطاع الحكومي والشركات، بالعربية والفرنسية والإنجليزية.",
  },
};

export const HOME = {
  eyebrow: { en: "Technology company", fr: "Société de technologie", ar: "شركة تقنية" },
  h1: {
    en: "We design, build and run software for institutions.",
    fr: "Nous concevons, construisons et exploitons des logiciels pour les institutions.",
    ar: "نصمم البرمجيات ونبنيها ونشغّلها للمؤسسات.",
  },
  sub: {
    en: "Healthcare, education, security, government and enterprise. Our products are built in-house, in Arabic, French and English, on one shared platform.",
    fr: "Santé, éducation, sécurité, secteur public et entreprises. Nos produits sont développés en interne, en arabe, français et anglais, sur une plateforme commune.",
    ar: "الصحة والتعليم والأمن والقطاع الحكومي والشركات. منتجاتنا مطوّرة داخلياً بالعربية والفرنسية والإنجليزية على منصة مشتركة واحدة.",
  },
  ctaProducts: { en: "Explore our products", fr: "Découvrir nos produits", ar: "استكشف منتجاتنا" },
  industriesH: { en: "Five industries", fr: "Cinq secteurs", ar: "خمسة قطاعات" },
  industriesP: {
    en: "Each industry groups the products and expertise for one kind of organisation.",
    fr: "Chaque secteur regroupe les produits et l'expertise destinés à un type d'organisation.",
    ar: "يجمع كل قطاع المنتجات والخبرات الموجهة لنوع واحد من المؤسسات.",
  },
  productsH: { en: "Products", fr: "Produits", ar: "المنتجات" },
  productsP: {
    en: "Every product has its own site or space, and every status below is current.",
    fr: "Chaque produit a son propre site ou espace, et chaque statut ci-dessous est à jour.",
    ar: "لكل منتج موقعه أو مساحته الخاصة، وكل حالة أدناه محدّثة.",
  },
  deliverH: { en: "What we deliver", fr: "Ce que nous livrons", ar: "ما ننجزه" },
  platformH: { en: "One platform under every product", fr: "Une plateforme sous chaque produit", ar: "منصة واحدة تحت كل منتج" },
  platformP: {
    en: "Our products share the same foundation, so every new product starts with security, languages and administration already in place.",
    fr: "Nos produits partagent le même socle. Chaque nouveau produit démarre avec la sécurité, les langues et l'administration déjà en place.",
    ar: "تشترك منتجاتنا في الأساس نفسه، فيبدأ كل منتج جديد والأمان واللغات والإدارة جاهزة.",
  },
  presenceH: { en: "Where we work", fr: "Où nous travaillons", ar: "أين نعمل" },
  presenceP: {
    en: "Business development in Libya through a local partner.",
    fr: "Développement commercial en Libye via un partenaire local.",
    ar: "نطوّر أعمالنا في ليبيا عبر شريك محلي.",
  },
};

export const PLATFORM: { icon: string; title: T; text: T }[] = [
  { icon: "lock", title: { en: "One login per person", fr: "Un identifiant par personne", ar: "حساب دخول واحد لكل شخص" }, text: { en: "Staff sign in once and see only the products and modules their organisation uses.", fr: "Le personnel se connecte une fois et ne voit que les produits et modules utilisés par son organisation.", ar: "يسجل الموظفون الدخول مرة واحدة ولا يرون إلا المنتجات والوحدات التي تستخدمها مؤسستهم." } },
  { icon: "check", title: { en: "Roles and audit trail", fr: "Rôles et journal d'audit", ar: "الأدوار وسجل التدقيق" }, text: { en: "Each action is tied to a person and a role, and important changes are recorded.", fr: "Chaque action est liée à une personne et à un rôle, et les changements importants sont enregistrés.", ar: "يرتبط كل إجراء بشخص ودور، وتُسجَّل التغييرات المهمة." } },
  { icon: "languages", title: { en: "Arabic, French, English", fr: "Arabe, français, anglais", ar: "العربية والفرنسية والإنجليزية" }, text: { en: "Real right-to-left Arabic, not translated text in a left-to-right page.", fr: "Un arabe réellement de droite à gauche, pas un texte traduit dans une page de gauche à droite.", ar: "عربية حقيقية من اليمين إلى اليسار، لا نص مترجم داخل صفحة من اليسار إلى اليمين." } },
  { icon: "server", title: { en: "Shared or dedicated", fr: "Partagé ou dédié", ar: "مشترك أو مخصص" }, text: { en: "The same software runs on our managed servers or on infrastructure dedicated to one client.", fr: "Le même logiciel fonctionne sur nos serveurs gérés ou sur une infrastructure dédiée à un seul client.", ar: "يعمل البرنامج نفسه على خوادمنا المُدارة أو على بنية مخصصة لعميل واحد." } },
];

export const CAPABILITIES: { icon: string; title: T; text: T; points: T[] }[] = [
  {
    icon: "code",
    title: { en: "Product development", fr: "Développement de produits", ar: "تطوير المنتجات" },
    text: { en: "We build our own software products end to end: research, design, engineering, testing and release.", fr: "Nous développons nos propres produits de bout en bout : recherche, conception, ingénierie, tests et mise en service.", ar: "نبني منتجاتنا البرمجية من البداية إلى النهاية: البحث والتصميم والهندسة والاختبار والإطلاق." },
    points: [
      { en: "Web platforms and administrative dashboards", fr: "Plateformes web et tableaux de bord d'administration", ar: "منصات ويب ولوحات إدارة" },
      { en: "Multi-tenant SaaS with roles and audit", fr: "SaaS multi-clients avec rôles et audit", ar: "برمجيات سحابية متعددة العملاء، بأدوار وسجل تدقيق" },
      { en: "Arabic, French and English from the first screen", fr: "Arabe, français et anglais dès le premier écran", ar: "العربية والفرنسية والإنجليزية من أول شاشة" },
    ],
  },
  {
    icon: "smartphone",
    title: { en: "Mobile apps", fr: "Applications mobiles", ar: "تطبيقات الهاتف" },
    text: { en: "Every system we design carries a mobile side: an app for the public and an app for staff, on the same data and roles as the web system. The first apps are in preparation.", fr: "Chaque système que nous concevons porte un côté mobile : une application pour le public et une pour le personnel, sur les mêmes données et les mêmes rôles que le système web. Les premières applications sont en préparation.", ar: "كل نظام نصممه يحمل جانباً خاصاً بالهاتف: تطبيق للجمهور وتطبيق للموظفين، على البيانات والأدوار نفسها التي في نظام الويب. التطبيقات الأولى قيد الإعداد." },
    points: [
      { en: "Android and iPhone from one codebase", fr: "Android et iPhone à partir d'une seule base de code", ar: "أندرويد وآيفون من قاعدة برمجية واحدة" },
      { en: "Appointments, notifications and documents in the user's pocket", fr: "Rendez-vous, notifications et documents dans la poche de l'utilisateur", ar: "المواعيد والإشعارات والمستندات في جيب المستخدم" },
      { en: "Light enough for modest phones and weak networks", fr: "Assez légères pour les téléphones modestes et les réseaux faibles", ar: "خفيفة بما يكفي للهواتف المتواضعة والشبكات الضعيفة" },
    ],
  },
  {
    icon: "plug",
    title: { en: "System integration", fr: "Intégration de systèmes", ar: "تكامل الأنظمة" },
    text: { en: "We connect software, devices and data so that existing systems keep working together.", fr: "Nous relions logiciels, équipements et données pour que les systèmes existants continuent de fonctionner ensemble.", ar: "نربط البرمجيات والأجهزة والبيانات لتستمر الأنظمة القائمة في العمل معاً." },
    points: [
      { en: "APIs and data exchange", fr: "API et échange de données", ar: "واجهات برمجية وتبادل البيانات" },
      { en: "Device connectors for access control, attendance and building systems", fr: "Connecteurs pour contrôle d'accès, pointage et systèmes du bâtiment", ar: "موصلات لأجهزة التحكم في الدخول والحضور وأنظمة المباني" },
      { en: "Healthcare standards HL7 and FHIR on the Kogia Health roadmap", fr: "Normes santé HL7 et FHIR prévues dans Kogia Health", ar: "معيارا الصحة HL7 و FHIR ضمن خطة Kogia Health" },
    ],
  },
  {
    icon: "server",
    title: { en: "Deployment and hosting", fr: "Déploiement et hébergement", ar: "النشر والاستضافة" },
    text: { en: "We run our products on managed infrastructure and can deploy them for a single client when required.", fr: "Nous exploitons nos produits sur une infrastructure gérée et pouvons les déployer pour un seul client si nécessaire.", ar: "نشغّل منتجاتنا على بنية مُدارة ويمكننا نشرها لعميل واحد عند الحاجة." },
    points: [
      { en: "Encrypted connections and isolated databases per product", fr: "Connexions chiffrées et bases de données isolées par produit", ar: "اتصالات مشفرة وقواعد بيانات معزولة لكل منتج" },
      { en: "Nightly backups, with restores tested", fr: "Sauvegardes chaque nuit, restaurations testées", ar: "نسخ احتياطي كل ليلة مع اختبار الاستعادة" },
      { en: "Rolling updates without downtime", fr: "Mises à jour progressives sans interruption", ar: "تحديثات تدريجية دون توقف" },
    ],
  },
  {
    icon: "life-buoy",
    title: { en: "Support and maintenance", fr: "Support et maintenance", ar: "الدعم والصيانة" },
    text: { en: "We stay responsible for what we deliver, with documentation and maintenance agreements.", fr: "Nous restons responsables de ce que nous livrons, avec documentation et contrats de maintenance.", ar: "نبقى مسؤولين عما ننجزه، مع التوثيق واتفاقيات الصيانة." },
    points: [
      { en: "User guides in three languages", fr: "Guides d'utilisation en trois langues", ar: "أدلة استخدام بثلاث لغات" },
      { en: "Ticketing and on-site intervention for installed systems", fr: "Tickets et intervention sur site pour les systèmes installés", ar: "تذاكر دعم وتدخل ميداني للأنظمة المركّبة" },
      { en: "Long-term maintenance and service agreements", fr: "Contrats de maintenance et de service à long terme", ar: "اتفاقيات صيانة وخدمة طويلة الأمد" },
    ],
  },
];

export const CAP_PAGE = {
  h1: { en: "Capabilities", fr: "Savoir-faire", ar: "قدراتنا" },
  lede: {
    en: "Beyond our own products, we take on custom development, integration and institutional projects where the same engineering standards apply.",
    fr: "Au-delà de nos produits, nous menons des projets sur mesure, d'intégration et institutionnels avec les mêmes exigences d'ingénierie.",
    ar: "إلى جانب منتجاتنا، ننفذ مشاريع التطوير المخصص والتكامل والمشاريع المؤسسية بمعايير الهندسة نفسها.",
  },
  govH: { en: "Government and large organisations", fr: "Secteur public et grandes organisations", ar: "القطاع الحكومي والمؤسسات الكبيرة" },
  govP: {
    en: "We prepare for institutional work from the start: documentation, audit trails, dedicated deployment, and participation in public tenders, alone or with partners.",
    fr: "Nous préparons dès le départ le travail institutionnel : documentation, journaux d'audit, déploiement dédié et participation aux appels d'offres publics, seuls ou avec des partenaires.",
    ar: "نستعد للعمل المؤسسي منذ البداية: التوثيق وسجلات التدقيق والنشر المخصص والمشاركة في المناقصات العامة منفردين أو مع شركاء.",
  },
};

export const HOW = {
  h1: { en: "How we work", fr: "Notre méthode", ar: "طريقة عملنا" },
  lede: {
    en: "What a client can expect from our software and from us, stated plainly. Where something is still in progress, we say so.",
    fr: "Ce qu'un client peut attendre de nos logiciels et de nous, dit simplement. Quand quelque chose est encore en cours, nous le disons.",
    ar: "ما يمكن للعميل أن يتوقعه من برمجياتنا ومنا، بوضوح. وما لم يكتمل بعد نصرّح بأنه كذلك.",
  },
  sections: [
    {
      h: { en: "Built in-house", fr: "Développé en interne", ar: "تطوير داخلي" },
      p: { en: "We write our own software. We do not resell other companies' platforms under our name, so we can fix, adapt and support everything we deliver.", fr: "Nous écrivons nos propres logiciels. Nous ne revendons pas les plateformes d'autres sociétés sous notre nom, ce qui nous permet de corriger, adapter et maintenir tout ce que nous livrons.", ar: "نكتب برمجياتنا بأنفسنا. لا نعيد بيع منصات شركات أخرى باسمنا، لذلك نستطيع إصلاح كل ما ننجزه وتكييفه ودعمه." },
    },
    {
      h: { en: "Security by default", fr: "La sécurité par défaut", ar: "الأمان من الأساس" },
      p: { en: "Every product uses role-based access, encrypted connections and an audit trail. Each organisation only sees its own data, and each product has its own isolated database.", fr: "Chaque produit applique l'accès par rôle, des connexions chiffrées et un journal d'audit. Chaque organisation ne voit que ses propres données, et chaque produit dispose de sa propre base isolée.", ar: "يستخدم كل منتج الصلاحيات حسب الدور والاتصالات المشفرة وسجل التدقيق. لا ترى كل مؤسسة إلا بياناتها، ولكل منتج قاعدة بيانات معزولة خاصة به." },
    },
    {
      h: { en: "Three ways to deliver", fr: "Trois modes de livraison", ar: "ثلاث طرق للتسليم" },
      p: {
        en: "The same software can be installed on servers inside your institution, deployed in a private environment reserved for you, or run by us as a managed service. The choice is yours. Hosting abroad is never a condition of use.",
        fr: "Le même logiciel peut être installé sur des serveurs dans votre institution, déployé dans un environnement privé qui vous est réservé, ou exploité par nous en service géré. Le choix vous appartient. Un hébergement à l'étranger n'est jamais une condition d'utilisation.",
        ar: "يمكن تثبيت البرنامج نفسه على خوادم داخل مؤسستكم، أو نشره في بيئة خاصة مخصصة لكم، أو نتولى نحن تشغيله خدمةً مُدارة. الاختيار لكم. والاستضافة خارج البلد ليست شرطاً للاستخدام أبداً.",
      },
    },
    {
      h: { en: "What is yours, what is ours", fr: "Ce qui est à vous, ce qui est à nous", ar: "ما هو لكم وما هو لنا" },
      p: {
        en: "Your data belongs to you. The software, its source code and its design remain ours, and you receive a licence to use them. For large institutions the source code can be placed in escrow with a third party and released under conditions written in the contract.",
        fr: "Vos données vous appartiennent. Le logiciel, son code source et sa conception restent les nôtres, et vous recevez une licence d'utilisation. Pour les grandes institutions, le code source peut être déposé chez un tiers et remis dans les cas prévus au contrat.",
        ar: "بياناتكم ملك لكم. أما البرنامج وشيفرته المصدرية وتصميمه فتبقى ملكاً لنا، وتحصلون على ترخيص باستخدامها. وللمؤسسات الكبيرة يمكن إيداع الشيفرة المصدرية لدى طرف ثالث تُسلَّم منه في الحالات المنصوص عليها في العقد.",
      },
    },
    {
      h: { en: "Licence, implementation, maintenance", fr: "Licence, mise en oeuvre, maintenance", ar: "ترخيص وتنفيذ وصيانة" },
      p: {
        en: "We do not sell subscriptions only. An institution can buy a licence, pay once for analysis, configuration, data migration and training, and then keep an annual maintenance agreement that covers security updates, monitoring and support.",
        fr: "Nous ne vendons pas seulement des abonnements. Une institution peut acquérir une licence, payer une fois l'analyse, le paramétrage, la reprise des données et la formation, puis conserver un contrat annuel de maintenance qui couvre les mises à jour de sécurité, la supervision et le support.",
        ar: "لا نبيع اشتراكات فقط. يمكن للمؤسسة شراء ترخيص، ودفع تكلفة التحليل والتهيئة ونقل البيانات والتدريب مرة واحدة، ثم الاحتفاظ بعقد صيانة سنوي يشمل التحديثات الأمنية والمراقبة والدعم.",
      },
    },
    {
      h: { en: "Configured for you, not rewritten", fr: "Paramétré pour vous, pas réécrit", ar: "مُهيّأ لكم دون إعادة كتابة" },
      p: {
        en: "Each institution has its own structure, roles, approval paths, numbering and reports. These are settings, not new code, so you keep receiving updates without losing what was set up for you. A need the product does not cover becomes a module, built once and tested before it reaches you.",
        fr: "Chaque institution a sa structure, ses rôles, ses circuits de validation, sa numérotation et ses rapports. Ce sont des paramètres, pas du nouveau code : vous continuez de recevoir les mises à jour sans perdre ce qui a été réglé pour vous. Un besoin non couvert devient un module, construit une fois et testé avant de vous parvenir.",
        ar: "لكل مؤسسة هيكلها وأدوارها ومسارات موافقاتها وترقيمها وتقاريرها. هذه إعدادات وليست شيفرة جديدة، فتستمرون في تلقي التحديثات دون فقدان ما أُعدّ لكم. وما لا يغطيه المنتج يصبح وحدة تُبنى مرة واحدة وتُختبر قبل أن تصلكم.",
      },
    },
    {
      h: { en: "When a contract ends", fr: "Quand un contrat prend fin", ar: "عند انتهاء العقد" },
      p: {
        en: "We hand over your data in clear, documented formats, and we delete our copies after the period agreed in the contract. You are never held by your own records.",
        fr: "Nous vous remettons vos données dans des formats clairs et documentés, et nous supprimons nos copies après le délai convenu au contrat. Vos propres archives ne vous retiennent jamais.",
        ar: "نسلّمكم بياناتكم بصيغ واضحة وموثّقة، ونحذف نسخنا بعد المدة المتفق عليها في العقد. سجلاتكم لا تكون قيداً عليكم أبداً.",
      },
    },
    {
      h: { en: "Backups and continuity", fr: "Sauvegardes et continuité", ar: "النسخ الاحتياطي واستمرارية العمل" },
      p: { en: "Databases are backed up every night and restores are tested. Updates roll out one server at a time so the service stays available.", fr: "Les bases sont sauvegardées chaque nuit et les restaurations sont testées. Les mises à jour se font serveur par serveur pour que le service reste disponible.", ar: "تُنسخ قواعد البيانات احتياطياً كل ليلة وتُختبر الاستعادة. وتُطبَّق التحديثات خادماً تلو الآخر لتبقى الخدمة متاحة." },
    },
    {
      h: { en: "Healthcare boundaries", fr: "Limites en santé", ar: "حدودنا في الرعاية الصحية" },
      p: { en: "Kogia Health manages the work around care: patients, appointments, billing, equipment and stock. It does not make clinical decisions and does not replace a hospital's clinical record system.", fr: "Kogia Health gère le travail autour du soin : patients, rendez-vous, facturation, équipements et stock. Il ne prend aucune décision clinique et ne remplace pas le dossier clinique d'un hôpital.", ar: "يدير Kogia Health العمل المحيط بالرعاية: المرضى والمواعيد والفوترة والأجهزة والمخزون. لا يتخذ قرارات سريرية ولا يحل محل نظام السجلات السريرية في المستشفى." },
    },
    {
      h: { en: "What is still in progress", fr: "Ce qui est encore en cours", ar: "ما زال قيد الإنجاز" },
      p: { en: "We do not yet hold a security certification such as ISO 27001, and single sign-on with client directories is planned. We will list them here when they are done, not before.", fr: "Nous ne détenons pas encore de certification de sécurité comme ISO 27001, et l'authentification unique avec les annuaires des clients est prévue. Nous les indiquerons ici quand elles seront acquises, pas avant.", ar: "لا نحمل بعد شهادة أمنية مثل ISO 27001، والدخول الموحد مع أدلة مستخدمي العملاء مخطط له. سنذكرها هنا عند تحققها، لا قبل ذلك." },
    },
  ],
};

export const PRESENCE = {
  h1: { en: "Presence", fr: "Présence", ar: "حضورنا" },
  lede: {
    en: "Where we develop business, and who we work with.",
    fr: "Où nous développons notre activité, et avec qui nous travaillons.",
    ar: "أين نطوّر أعمالنا، ومع من نعمل.",
  },
  places: [
    {
      name: { en: "Libya", fr: "Libye", ar: "ليبيا" },
      role: { en: "Business development through a local partner", fr: "Développement commercial via un partenaire local", ar: "تطوير الأعمال عبر شريك محلي" },
      text: { en: "Our local partner handles commercial relationships and client opportunities. Healthcare and education are the first focus.", fr: "Notre partenaire local gère les relations commerciales et les opportunités clients. La santé et l'éducation sont les premières priorités.", ar: "يتولى شريكنا المحلي العلاقات التجارية وفرص العملاء. وللصحة والتعليم الأولوية." },
    },
  ],
  collabH: { en: "Collaborations", fr: "Collaborations", ar: "الشراكات" },
  collab: {
    en: "EduPlus Connect was built with a partner school and is used there every day. It is the reference for how we work with an institution: together, from the real workflow.",
    fr: "EduPlus Connect a été construit avec une école partenaire, qui l'utilise chaque jour. C'est notre référence pour travailler avec une institution : ensemble, à partir du travail réel.",
    ar: "بُني EduPlus Connect مع مدرسة شريكة تستخدمه يومياً. وهو نموذجنا في العمل مع المؤسسات: نعمل معها، انطلاقاً من سير عملها الفعلي.",
  },
};

export const ABOUT = {
  h1: { en: "About KogiaGroup", fr: "À propos de KogiaGroup", ar: "عن KogiaGroup" },
  lede: {
    en: "KogiaGroup is a technology company that builds its own software products and delivers integration and custom projects for institutions.",
    fr: "KogiaGroup est une société de technologie qui développe ses propres produits logiciels et réalise des projets d'intégration et sur mesure pour les institutions.",
    ar: "KogiaGroup شركة تقنية تطوّر منتجاتها البرمجية الخاصة وتنفذ مشاريع التكامل والتطوير المخصص للمؤسسات.",
  },
  sections: [
    {
      h: { en: "How the company is organised", fr: "Comment la société est organisée", ar: "كيف تنتظم الشركة" },
      p: { en: "Three levels. KogiaGroup is the company. Under it are five industries: healthcare, education, security and buildings, government, and enterprise. Under each industry are the products, and each product is made of modules a client switches on as needed.", fr: "Trois niveaux. KogiaGroup est la société. En dessous, cinq secteurs : santé, éducation, sécurité et bâtiments, secteur public et entreprises. Sous chaque secteur se trouvent les produits, et chaque produit est fait de modules qu'un client active selon ses besoins.", ar: "ثلاثة مستويات. KogiaGroup هي الشركة. تحتها خمسة قطاعات: الصحة، والتعليم، والأمن والمباني، والقطاع الحكومي، والشركات. وتحت كل قطاع المنتجات، وكل منتج يتكون من وحدات يفعّلها العميل حسب حاجته." },
    },
    {
      h: { en: "One platform", fr: "Une seule plateforme", ar: "منصة واحدة" },
      p: { en: "Products share one foundation for sign-in, roles, audit, languages and design. This keeps quality even across products and lets us add a new one without starting over.", fr: "Les produits partagent un même socle pour la connexion, les rôles, l'audit, les langues et le design. La qualité reste égale d'un produit à l'autre, et un nouveau produit ne repart pas de zéro.", ar: "تشترك المنتجات في أساس واحد لتسجيل الدخول والأدوار والتدقيق واللغات والتصميم. وهذا يضمن جودة واحدة في كل المنتجات ويتيح إضافة منتج جديد دون البدء من الصفر." },
    },
    {
      h: { en: "What we will not do", fr: "Ce que nous ne faisons pas", ar: "ما لا نفعله" },
      p: { en: "We do not claim clients, certifications or results we cannot show. Every status on this site is current, and products still in development are marked as such.", fr: "Nous ne revendiquons ni clients, ni certifications, ni résultats que nous ne pouvons pas montrer. Chaque statut affiché ici est à jour, et les produits en développement sont indiqués comme tels.", ar: "لا ندّعي عملاء أو شهادات أو نتائج لا نستطيع إثباتها. كل حالة على هذا الموقع محدّثة، والمنتجات التي ما زالت قيد التطوير مُشار إليها بذلك." },
    },
  ],
};

export const CONTACT = {
  h1: { en: "Contact", fr: "Contact", ar: "تواصل معنا" },
  lede: {
    en: "Write to us about a product, a project or a partnership. A person reads every message.",
    fr: "Écrivez-nous au sujet d'un produit, d'un projet ou d'un partenariat. Chaque message est lu par une personne.",
    ar: "راسلنا بشأن منتج أو مشروع أو شراكة. يقرأ كل رسالة شخص حقيقي.",
  },
  helpH: { en: "Tell us", fr: "Indiquez-nous", ar: "أخبرنا" },
  help: [
    { en: "Your organisation and country", fr: "Votre organisation et votre pays", ar: "مؤسستك وبلدك" },
    { en: "The product or the problem you want to solve", fr: "Le produit ou le problème à résoudre", ar: "المنتج أو المشكلة التي تريد حلها" },
    { en: "The number of sites or users, if you know it", fr: "Le nombre de sites ou d'utilisateurs, si vous le connaissez", ar: "عدد المواقع أو المستخدمين إن كان معروفاً" },
  ],
  privacy: { en: "Please do not send patient or student data by email.", fr: "Merci de ne pas envoyer de données de patients ou d'élèves par e-mail.", ar: "يُرجى عدم إرسال بيانات المرضى أو الطلاب عبر البريد الإلكتروني." },
};

export const FOOTER = {
  about: {
    en: "A technology company building software for healthcare, education, security, government and enterprise.",
    fr: "Une société de technologie qui construit des logiciels pour la santé, l'éducation, la sécurité, le secteur public et les entreprises.",
    ar: "شركة تقنية تبني البرمجيات لقطاعات الصحة والتعليم والأمن والقطاع الحكومي والشركات.",
  },
  company: { en: "Company", fr: "Société", ar: "الشركة" },
  legal: { en: "Legal", fr: "Mentions", ar: "الشؤون القانونية" },
  privacy: { en: "Privacy", fr: "Confidentialité", ar: "الخصوصية" },
  terms: { en: "Terms", fr: "Conditions", ar: "الشروط" },
};

export const LEGAL = {
  updated: { en: "Last updated 9 November 2026", fr: "Dernière mise à jour : 9 novembre 2026", ar: "آخر تحديث: 9 نوفمبر 2026" },
  privacy: {
    h1: { en: "Privacy", fr: "Confidentialité", ar: "الخصوصية" },
    lede: { en: "This page covers the kogiagroup.com website. Each product linked from this site publishes its own privacy information.", fr: "Cette page concerne le site kogiagroup.com. Chaque produit lié depuis ce site publie ses propres informations de confidentialité.", ar: "تخص هذه الصفحة موقع kogiagroup.com. وينشر كل منتج مرتبط بهذا الموقع معلومات الخصوصية الخاصة به." },
    sections: [
      { h: { en: "Visiting the site", fr: "Visiter le site", ar: "زيارة الموقع" }, p: { en: "The site has no accounts, no sign-up and no payments. The servers that deliver pages receive technical connection data, such as your IP address and browser request, and keep technical logs to diagnose errors and protect the service.", fr: "Le site ne propose ni compte, ni inscription, ni paiement. Les serveurs qui transmettent les pages reçoivent des données techniques de connexion, comme l'adresse IP et la requête du navigateur, et conservent des journaux techniques pour diagnostiquer les erreurs et protéger le service.", ar: "لا يتضمن الموقع حسابات أو تسجيلاً أو مدفوعات. تتلقى الخوادم التي تعرض الصفحات بيانات الاتصال التقنية مثل عنوان IP وطلب المتصفح، وتحتفظ بسجلات تقنية لتشخيص الأخطاء وحماية الخدمة." } },
      { h: { en: "Audience measurement", fr: "Mesure d'audience", ar: "قياس الزيارات" }, p: { en: "We use Cloudflare Web Analytics to measure visits and page performance. It sets no cookie and collects no personal profile.", fr: "Nous utilisons Cloudflare Web Analytics pour mesurer la fréquentation et les performances des pages. Ce service ne dépose aucun cookie et ne constitue aucun profil personnel.", ar: "نستخدم Cloudflare Web Analytics لقياس الزيارات وأداء الصفحات. وهي خدمة لا تضع أي ملفات تعريف ارتباط ولا تُنشئ ملفاً شخصياً عنك." } },
      { h: { en: "Contacting us", fr: "Nous contacter", ar: "التواصل معنا" }, p: { en: "If you email us, we receive your address and what you choose to write, and use it only to answer you.", fr: "Si vous nous écrivez, nous recevons votre adresse et ce que vous choisissez de nous dire, et nous ne l'utilisons que pour vous répondre.", ar: "إذا راسلتنا وصلنا عنوانك وما تختار كتابته، ولا نستخدمهما إلا للرد عليك." } },
      { h: { en: "Earlier versions of the site", fr: "Anciennes versions du site", ar: "الإصدارات السابقة من الموقع" }, p: { en: "An earlier version of the site offered accounts and discussions. These features are no longer available. For any request about a former account or its content, write to us.", fr: "Une version précédente du site proposait des comptes et des discussions. Ces fonctions ne sont plus disponibles. Pour toute demande concernant un ancien compte ou son contenu, écrivez-nous.", ar: "كان إصدار سابق من الموقع يتيح الحسابات والنقاشات، وهذه الميزات لم تعد متاحة. لأي طلب يخص حساباً سابقاً أو محتواه، راسلنا." } },
      { h: { en: "Your requests", fr: "Vos demandes", ar: "طلباتك" }, p: { en: "To ask which data we hold about you, or to request correction, export or deletion, write to the address below.", fr: "Pour savoir quelles données nous détenons à votre sujet, ou demander leur correction, leur export ou leur suppression, écrivez à l'adresse ci-dessous.", ar: "لمعرفة البيانات التي نحتفظ بها عنك أو طلب تصحيحها أو تصديرها أو حذفها، راسل العنوان أدناه." } },
    ],
  },
  terms: {
    h1: { en: "Terms of use", fr: "Conditions d'utilisation", ar: "شروط الاستخدام" },
    lede: { en: "These terms cover the kogiagroup.com website. Each product has its own terms, which apply when you use it.", fr: "Ces conditions concernent le site kogiagroup.com. Chaque produit a ses propres conditions, qui s'appliquent quand vous l'utilisez.", ar: "تخص هذه الشروط موقع kogiagroup.com. ولكل منتج شروطه الخاصة التي تسري عند استخدامه." },
    sections: [
      { h: { en: "The site", fr: "Le site", ar: "الموقع" }, p: { en: "The site presents KogiaGroup and its products. It requires no account and offers no payment.", fr: "Le site présente KogiaGroup et ses produits. Il ne demande aucun compte et ne propose aucun paiement.", ar: "يعرّف الموقع بـ KogiaGroup ومنتجاتها. لا يتطلب حساباً ولا يتيح أي دفع." } },
      { h: { en: "Information on the site", fr: "Informations du site", ar: "المعلومات على الموقع" }, p: { en: "We keep product descriptions and statuses accurate and up to date. They describe products, they are not a contract. A commercial offer is always made in writing.", fr: "Nous tenons les descriptions et statuts des produits exacts et à jour. Ils décrivent les produits et ne constituent pas un contrat. Une offre commerciale est toujours faite par écrit.", ar: "نحرص على دقة أوصاف المنتجات وحالاتها وتحديثها. هي وصف للمنتجات وليست عقداً، والعرض التجاري يُقدَّم دائماً كتابةً." } },
      { h: { en: "Brands and content", fr: "Marques et contenus", ar: "العلامات والمحتوى" }, p: { en: "The KogiaGroup name, logos and product names belong to KogiaGroup. Do not reuse them in a way that suggests a link with us that does not exist.", fr: "Le nom KogiaGroup, les logos et les noms de produits appartiennent à KogiaGroup. Ne les réutilisez pas d'une manière qui suggère un lien inexistant avec nous.", ar: "اسم KogiaGroup والشعارات وأسماء المنتجات ملك لـ KogiaGroup. لا تستخدمها بطريقة توحي بعلاقة غير موجودة معنا." } },
      { h: { en: "Former community service", fr: "Ancien service communautaire", ar: "الخدمة المجتمعية السابقة" }, p: { en: "An earlier version offered accounts under the terms dated 18 August 2026. These features are closed. For a request about a former account, write to us.", fr: "Une version précédente proposait des comptes selon les conditions du 18 août 2026. Ces fonctions sont fermées. Pour une demande concernant un ancien compte, écrivez-nous.", ar: "أتاح إصدار سابق حسابات وفق شروط مؤرخة في 18 أغسطس 2026، وهذه الميزات مغلقة الآن. لأي طلب يخص حساباً سابقاً، راسلنا." } },
    ],
  },
};

/* ── Home page as a magazine (2026-11-11) ──────────────────────────────
   A cover, then one story per field: the problem an institution lives with,
   and how the same request travels once the system carries it. No product
   status here: statuses stay on the product and industry pages. */
export const MAG = {
  kicker: { en: "Enterprise software and systems integration", fr: "Logiciels d'entreprise et intégration de systèmes", ar: "برمجيات مؤسسية وتكامل أنظمة" },
  h1: { en: "The institution, working as one.", fr: "L'institution, d'un seul tenant.", ar: "المؤسسة تعمل كالجسد الواحد." },
  sub: {
    en: "A hospital, a school, a municipality or a firm runs on procedures that cross many desks. We build the systems that carry each procedure from the first request to the final signature, in Arabic, French and English.",
    fr: "Un hôpital, une école, une municipalité ou un cabinet vivent de procédures qui traversent de nombreux bureaux. Nous construisons les systèmes qui portent chaque procédure, de la première demande à la dernière signature, en arabe, en français et en anglais.",
    ar: "المستشفى والمدرسة والبلدية والمكتب المهني تقوم كلها على إجراءات تمرّ بمكاتب كثيرة. نبني الأنظمة التي تحمل كل إجراء من أول طلب إلى آخر توقيع، بالعربية والفرنسية والإنجليزية.",
  },
  facts: {
    industries: { en: "industries served", fr: "secteurs servis", ar: "قطاعات نخدمها" },
    products: { en: "products built in-house", fr: "produits développés en interne", ar: "منتجات مطوّرة داخلياً" },
    languages: { en: "languages on every screen: Arabic, French, English", fr: "langues sur chaque écran : arabe, français, anglais", ar: "لغات في كل شاشة: العربية والفرنسية والإنجليزية" },
    delivery: { en: "ways to deliver: on your servers, private, or managed", fr: "modes de livraison : sur vos serveurs, privé ou géré", ar: "طرق للتسليم: على خوادمكم، أو في بيئة خاصة، أو خدمةً مُدارة" },
  },
  console: {
    alt: {
      en: "Illustration: a licence request followed step by step in a Kogia system, and an appointment confirmed on a phone",
      fr: "Illustration : une demande de licence suivie étape par étape dans un système Kogia, et un rendez-vous confirmé sur un téléphone",
      ar: "رسم توضيحي: طلب رخصة يُتابَع خطوة بخطوة في نظام من Kogia، وموعد مؤكَّد على الهاتف",
    },
    title: { en: "Request tracking", fr: "Suivi des demandes", ar: "متابعة الطلبات" },
    ref: { en: "Request 2026-0148", fr: "Demande 2026-0148", ar: "طلب 2026-0148" },
    name: { en: "Activity licence", fr: "Licence d'activité", ar: "رخصة نشاط" },
    progress: { en: "In progress", fr: "En cours", ar: "قيد الإنجاز" },
    steps: [
      { l: { en: "Request submitted", fr: "Demande déposée", ar: "قُدِّم الطلب" }, who: { en: "From the citizen's phone", fr: "Depuis le téléphone du citoyen", ar: "من هاتف المواطن" } },
      { l: { en: "File checked", fr: "Dossier vérifié", ar: "رُوجع الملف" }, who: { en: "Licences office", fr: "Bureau des licences", ar: "مكتب التراخيص" } },
      { l: { en: "Fee paid", fr: "Droits payés", ar: "سُدِّد الرسم" }, who: { en: "Cashier", fr: "Caisse", ar: "الصندوق" } },
      { l: { en: "Signature", fr: "Signature", ar: "التوقيع" }, who: { en: "Head of office", fr: "Chef de bureau", ar: "رئيس المكتب" } },
    ],
    audit: { en: "Every step recorded with a name and a time", fr: "Chaque étape enregistrée avec un nom et une heure", ar: "كل خطوة مسجَّلة باسم ووقت" },
    appt: { en: "Your appointment", fr: "Votre rendez-vous", ar: "موعدك" },
    when: { en: "Tomorrow", fr: "Demain", ar: "غداً" },
    ticket: { en: "Ticket", fr: "Ticket", ar: "تذكرة" },
    confirmed: { en: "Confirmed", fr: "Confirmé", ar: "مؤكَّد" },
  },
  film: {
    kicker: { en: "Appointments and queues", fr: "Rendez-vous et files d'attente", ar: "المواعيد والطوابير" },
    h: { en: "From the crowd to the queue number.", fr: "De la foule au numéro de passage.", ar: "من الزحام إلى رقم الدور." },
    p: {
      en: "A 75-second film, without sound, showing how our appointment and queue platform works: a ticket taken from home or by scanning a code at the door, the staff screen, and the display in the hall. The platform is in development.",
      fr: "Un film de 75 secondes, sans son, qui montre le fonctionnement de notre plateforme de rendez-vous et de files d'attente : un ticket pris depuis chez soi ou en scannant un code à l'entrée, l'écran du personnel et l'affichage dans la salle. La plateforme est en cours de développement.",
      ar: "فيلم مدته 75 ثانية، بلا صوت، يُظهر كيف تعمل منصتنا للمواعيد والطوابير: تذكرة تُؤخذ من البيت أو بمسح رمز عند المدخل، وشاشة الموظف، وشاشة العرض في القاعة. المنصة قيد التطوير.",
    },
    label: { en: "Film: from the crowd to the queue number", fr: "Film : de la foule au numéro de passage", ar: "فيلم: من الزحام إلى رقم الدور" },
    vertical: { en: "Vertical version for phones", fr: "Version verticale pour téléphone", ar: "نسخة عمودية للهاتف" },
    second: { en: "Second film: a licence without the queue", fr: "Deuxième film : une licence sans file d'attente", ar: "الفيلم الثاني: رخصة بلا طابور" },
  },
  sectorsKicker: { en: "Where we work", fr: "Nos domaines", ar: "مجالات عملنا" },
  ctaStories: { en: "See it in your field", fr: "Voir dans votre domaine", ar: "شاهد ذلك في مجالك" },
  coverAlt: { en: "Five institutions standing on one shared platform", fr: "Cinq institutions posées sur une même plateforme", ar: "خمس مؤسسات تقوم على منصة واحدة مشتركة" },
  inThisIssue: { en: "In these pages", fr: "Dans ces pages", ar: "في هذه الصفحات" },
  storyLabel: { en: "The scene", fr: "La scène", ar: "المشهد" },
  withSystem: { en: "With the system", fr: "Avec le système", ar: "مع النظام" },
  readField: { en: "Open this field", fr: "Ouvrir ce domaine", ar: "افتح هذا المجال" },
  stories: [
    {
      slug: "government",
      field: { en: "Government and municipalities", fr: "Secteur public et municipalités", ar: "القطاع الحكومي والبلديات" },
      title: { en: "A licence without the queue.", fr: "Une licence sans file d'attente.", ar: "رخصة بلا طابور." },
      scene: {
        en: "A shop owner needs an activity licence. Today that can mean several visits, a paper file that travels by hand, and no way to know where it stands.",
        fr: "Un commerçant a besoin d'une licence d'activité. Aujourd'hui, cela peut signifier plusieurs déplacements, un dossier papier qui circule de main en main, et aucun moyen de savoir où il en est.",
        ar: "صاحب محل يحتاج إلى رخصة مزاولة نشاط. اليوم قد يعني ذلك عدة زيارات، وملفاً ورقياً ينتقل باليد، ولا وسيلة لمعرفة أين وصل.",
      },
      steps: [
        { en: "He files the request from his phone and uploads each document once.", fr: "Il dépose sa demande depuis son téléphone et envoie chaque pièce une seule fois.", ar: "يقدّم الطلب من هاتفه ويرفع كل مستند مرة واحدة." },
        { en: "The licences office receives a complete file. The inspector finds the visit on his list.", fr: "Le bureau des licences reçoit un dossier complet. L'inspecteur trouve la visite dans sa liste.", ar: "يستلم مكتب التراخيص ملفاً كاملاً. ويجد المفتش الزيارة في قائمته." },
        { en: "The fee is paid, the head of office approves, and every step is recorded.", fr: "Le droit est payé, le chef de bureau valide, et chaque étape est enregistrée.", ar: "يُدفع الرسم ويعتمد رئيس المكتب الطلب، وتُسجَّل كل خطوة." },
        { en: "The licence arrives with a code that anyone can verify. Nobody stood in line.", fr: "La licence arrive avec un code que chacun peut vérifier. Personne n'a fait la queue.", ar: "تصل الرخصة برمز يمكن لأي جهة التحقق منه. ولم يقف أحد في طابور." },
      ],
      gain: {
        en: "For the municipality: fewer people at the counter, no lost files, and figures on every service.",
        fr: "Pour la municipalité : moins de monde au guichet, aucun dossier perdu, et des chiffres sur chaque service.",
        ar: "للبلدية: ازدحام أقل عند الشباك، ولا ملفات ضائعة، وأرقام عن كل خدمة.",
      },
    },
    {
      slug: "healthcare",
      field: { en: "Healthcare", fr: "Santé", ar: "الرعاية الصحية" },
      title: { en: "One patient, one file, every department.", fr: "Un patient, un dossier, tous les services.", ar: "مريض واحد، ملف واحد، كل الأقسام." },
      scene: {
        en: "A patient goes from reception to the doctor, the laboratory, the pharmacy and the cashier. On paper, every desk starts again from nothing.",
        fr: "Un patient passe de l'accueil au médecin, au laboratoire, à la pharmacie et à la caisse. Sur papier, chaque bureau repart de zéro.",
        ar: "ينتقل المريض من الاستقبال إلى الطبيب فالمختبر فالصيدلية فالخزينة. وعلى الورق يبدأ كل مكتب من الصفر.",
      },
      steps: [
        { en: "Reception registers the patient once and hands over a queue ticket.", fr: "L'accueil enregistre le patient une fois et lui remet un ticket.", ar: "يسجّل الاستقبال المريض مرة واحدة ويسلّمه تذكرة انتظار." },
        { en: "The doctor orders a test. The laboratory sees it at once.", fr: "Le médecin prescrit une analyse. Le laboratoire la voit aussitôt.", ar: "يطلب الطبيب تحليلاً فيراه المختبر في الحال." },
        { en: "The result returns to the file. The pharmacy dispenses what was prescribed and the stock goes down by itself.", fr: "Le résultat revient au dossier. La pharmacie délivre ce qui a été prescrit et le stock diminue de lui-même.", ar: "تعود النتيجة إلى الملف. تصرف الصيدلية ما وُصف وينقص المخزون تلقائياً." },
        { en: "The invoice already holds every service that was given.", fr: "La facture contient déjà chaque acte réalisé.", ar: "وتتضمن الفاتورة تلقائياً كل خدمة قُدّمت." },
      ],
      gain: {
        en: "For the management: what was done, by whom, and what it brought in, the same evening.",
        fr: "Pour la direction : ce qui a été fait, par qui, et ce que cela a rapporté, le soir même.",
        ar: "للإدارة: ما أُنجز، ومن أنجزه، وما حققه من إيراد، في مساء اليوم نفسه.",
      },
    },
    {
      slug: "education",
      field: { en: "Education", fr: "Éducation", ar: "التعليم" },
      title: { en: "The parent knows before the child is home.", fr: "Le parent sait avant le retour de l'enfant.", ar: "وليّ الأمر يعلم قبل أن يعود ابنه." },
      scene: {
        en: "A school day produces attendance, marks, remarks and messages. Most of it sleeps in registers that nobody opens again.",
        fr: "Une journée d'école produit des présences, des notes, des remarques et des messages. L'essentiel dort dans des registres que personne ne rouvre.",
        ar: "ينتج اليوم الدراسي حضوراً ودرجات وملاحظات ورسائل. وأغلبها ينام في سجلات لا يفتحها أحد ثانية.",
      },
      steps: [
        { en: "The teacher takes attendance in a minute, on any device.", fr: "L'enseignant fait l'appel en une minute, sur n'importe quel appareil.", ar: "يسجّل المعلم الحضور في دقيقة، من أي جهاز." },
        { en: "An absence reaches the parent the same morning.", fr: "Une absence parvient au parent le matin même.", ar: "يصل خبر الغياب إلى وليّ الأمر في الصباح نفسه." },
        { en: "Daily evaluation builds the term report by itself.", fr: "L'évaluation quotidienne construit le bulletin du trimestre toute seule.", ar: "التقييم اليومي يبني تقرير الفصل تلقائياً." },
        { en: "The head sees every class without asking for a single sheet.", fr: "Le directeur voit chaque classe sans demander une seule feuille.", ar: "يرى المدير كل فصل دون أن يطلب ورقة واحدة." },
      ],
      gain: {
        en: "For the school: less paper, fewer calls, and parents who trust what they see.",
        fr: "Pour l'école : moins de papier, moins d'appels, et des parents qui ont confiance dans ce qu'ils voient.",
        ar: "للمدرسة: ورق أقل واتصالات أقل وأولياء أمور يثقون بما يرونه.",
      },
    },
    {
      slug: "security",
      field: { en: "Security and buildings", fr: "Sécurité et bâtiments", ar: "الأمن والمباني" },
      title: { en: "Every door, camera and visitor answers to one screen.", fr: "Chaque porte, caméra et visiteur répond à un seul écran.", ar: "كل باب وكاميرا وزائر على شاشة واحدة." },
      scene: {
        en: "A building has access control from one supplier, cameras from another and a visitor book at the gate. When something happens, nobody holds the whole picture.",
        fr: "Un bâtiment a un contrôle d'accès d'un fournisseur, des caméras d'un autre et un registre des visiteurs au portail. Quand quelque chose arrive, personne n'a la vue d'ensemble.",
        ar: "في المبنى نظام دخول من مورّد وكاميرات من مورّد آخر وسجل زوار ورقي عند البوابة. وعند وقوع حادث لا يملك أحد الصورة كاملة.",
      },
      steps: [
        { en: "A visitor is announced before he arrives and receives a pass.", fr: "Un visiteur est annoncé avant son arrivée et reçoit un laissez-passer.", ar: "يُسجَّل الزائر قبل وصوله ويحصل على تصريح." },
        { en: "The door opens for him only where he is expected, and only today.", fr: "La porte ne s'ouvre pour lui que là où il est attendu, et seulement aujourd'hui.", ar: "يُفتح له الباب حيث يُنتظَر فقط، وفي ذلك اليوم فقط." },
        { en: "An alarm goes to the person on duty, who must acknowledge it.", fr: "Une alarme parvient à la personne de garde, qui doit en accuser réception.", ar: "يصل الإنذار إلى المناوب، وعليه أن يؤكد استلامه." },
        { en: "The record shows who entered, when, and who responded.", fr: "L'historique montre qui est entré, quand, et qui a répondu.", ar: "يُظهر السجل من دخل ومتى ومن استجاب." },
      ],
      gain: {
        en: "For the owner: one login, one history, and equipment maintained on schedule.",
        fr: "Pour le propriétaire : un seul identifiant, un seul historique, et des équipements entretenus à date.",
        ar: "للمالك: حساب دخول واحد وسجل واحد ومعدات تُصان في موعدها.",
      },
    },
    {
      slug: "enterprise",
      field: { en: "Companies and professional firms", fr: "Entreprises et cabinets", ar: "الشركات والمكاتب المهنية" },
      title: { en: "No deadline lost, no file out of place.", fr: "Aucune échéance perdue, aucun dossier égaré.", ar: "لا موعد يفوت ولا ملف يضيع." },
      scene: {
        en: "A law firm, an accounting firm or a company lives on files, deadlines and approvals. They sit in folders, inboxes and memory.",
        fr: "Un cabinet d'avocats, un cabinet comptable ou une entreprise vivent de dossiers, d'échéances et de validations. Tout cela repose dans des classeurs, des messageries et des mémoires.",
        ar: "مكتب المحاماة ومكتب المحاسبة والشركة تقوم كلها على الملفات والمواعيد والموافقات. وكلها موزعة بين الأدراج وصناديق البريد والذاكرة.",
      },
      steps: [
        { en: "Each file has its people, its documents and its dates.", fr: "Chaque dossier a ses personnes, ses pièces et ses dates.", ar: "لكل ملف أشخاصه ومستنداته ومواعيده." },
        { en: "A deadline warns before it arrives, not after.", fr: "Une échéance prévient avant d'arriver, pas après.", ar: "يأتي التنبيه قبل حلول الموعد لا بعده." },
        { en: "A document leaves only after the review the firm requires.", fr: "Un document ne sort qu'après la revue exigée par le cabinet.", ar: "لا يخرج مستند إلا بعد المراجعة التي يشترطها المكتب." },
        { en: "Time and fees are recorded as the work is done.", fr: "Le temps et les honoraires s'enregistrent au fil du travail.", ar: "يُسجَّل الوقت والأتعاب مع سير العمل." },
      ],
      gain: {
        en: "For the partners: the state of every file at a glance, and nothing that depends on one person's memory.",
        fr: "Pour les associés : l'état de chaque dossier d'un coup d'oeil, et rien qui dépende de la mémoire d'une seule personne.",
        ar: "للشركاء: حالة كل ملف بنظرة واحدة، ولا شيء يتوقف على ذاكرة شخص واحد.",
      },
    },
  ],
  trustH: { en: "What an institution can hold us to", fr: "Ce sur quoi une institution peut nous engager", ar: "ما يمكن للمؤسسة أن تحاسبنا عليه" },
  trustP: {
    en: "A system that carries official work is judged on what happens to the records, not on how the screens look.",
    fr: "Un système qui porte un travail officiel se juge à ce qu'il advient des archives, pas à l'allure des écrans.",
    ar: "النظام الذي يحمل عملاً رسمياً يُحكم عليه بمصير السجلات لا بشكل الشاشات.",
  },
  trust: [
    { icon: "server", h: { en: "Your data stays yours", fr: "Vos données restent les vôtres", ar: "بياناتكم تبقى لكم" }, p: { en: "On your own servers, in a private environment, or managed by us. You choose where it lives.", fr: "Sur vos serveurs, dans un environnement privé, ou géré par nous. Vous choisissez où elles résident.", ar: "على خوادمكم أو في بيئة خاصة أو بإدارتنا. أنتم من يختار مكانها." } },
    { icon: "check", h: { en: "Every action has a name", fr: "Chaque action a un nom", ar: "لكل إجراء اسم صاحبه" }, p: { en: "Who saw, who changed, who approved. Recorded at the moment it happens and kept.", fr: "Qui a vu, qui a modifié, qui a validé. Enregistré à l'instant et conservé.", ar: "من اطّلع ومن عدّل ومن اعتمد. يُسجَّل لحظة وقوعه ويُحفظ." } },
    { icon: "layers", h: { en: "Shaped to your structure", fr: "À la forme de votre structure", ar: "على مقاس هيكلكم" }, p: { en: "Your departments, roles and approval paths are settings. Nothing is rewritten, so updates keep arriving.", fr: "Vos services, vos rôles et vos circuits de validation sont des paramètres. Rien n'est réécrit, les mises à jour continuent d'arriver.", ar: "إداراتكم وأدواركم ومسارات موافقاتكم إعدادات. لا تُعاد كتابة شيء فتستمر التحديثات في الوصول." } },
    { icon: "languages", h: { en: "Arabic first, three languages", fr: "L'arabe d'abord, trois langues", ar: "العربية أولاً وثلاث لغات" }, p: { en: "Real right-to-left Arabic on every screen and every document, with French and English.", fr: "Un arabe réellement de droite à gauche sur chaque écran et chaque document, avec le français et l'anglais.", ar: "عربية حقيقية من اليمين إلى اليسار في كل شاشة وكل وثيقة، مع الفرنسية والإنجليزية." } },
    { icon: "life-buoy", h: { en: "We stay after delivery", fr: "Nous restons après la livraison", ar: "نبقى بعد التسليم" }, p: { en: "Training, maintenance, updates and backups that are restored to prove they work, under a written agreement.", fr: "Formation, maintenance, mises à jour et sauvegardes restaurées pour preuve, dans un contrat écrit.", ar: "تدريب وصيانة وتحديثات ونسخ احتياطية تُستعاد فعلاً لإثبات صلاحيتها، بعقد مكتوب." } },
    { icon: "external", h: { en: "You can leave with everything", fr: "Vous pouvez partir avec tout", ar: "تغادرون ومعكم كل شيء" }, p: { en: "When a contract ends, your records are handed over in clear, documented formats.", fr: "À la fin d'un contrat, vos archives vous sont remises dans des formats clairs et documentés.", ar: "عند انتهاء العقد تُسلَّم سجلاتكم بصيغ واضحة وموثّقة." } },
  ],
  pathH: { en: "From the first meeting to daily use", fr: "De la première réunion à l'usage quotidien", ar: "من الاجتماع الأول إلى الاستخدام اليومي" },
  path: [
    { h: { en: "We listen", fr: "Nous écoutons", ar: "نستمع" }, p: { en: "Each procedure is mapped: who starts it, who approves, what happens on refusal.", fr: "Chaque procédure est décrite : qui la lance, qui valide, que se passe-t-il en cas de refus.", ar: "نرسم كل إجراء: من يبدؤه ومن يعتمده وماذا يحدث عند الرفض." } },
    { h: { en: "We configure", fr: "Nous paramétrons", ar: "نهيّئ" }, p: { en: "The system takes the shape of your structure, roles and forms.", fr: "Le système prend la forme de votre structure, de vos rôles et de vos formulaires.", ar: "يأخذ النظام شكل هيكلكم وأدواركم ونماذجكم." } },
    { h: { en: "We move and train", fr: "Nous migrons et formons", ar: "ننقل وندرّب" }, p: { en: "Existing records are brought in and every team is trained on its own work.", fr: "Les données existantes sont reprises et chaque équipe est formée sur son propre travail.", ar: "تُنقل السجلات القائمة ويُدرَّب كل فريق على عمله." } },
    { h: { en: "We go live together", fr: "Nous démarrons ensemble", ar: "ننطلق معاً" }, p: { en: "The first weeks are followed closely, with our people beside yours.", fr: "Les premières semaines sont suivies de près, nos équipes aux côtés des vôtres.", ar: "نتابع الأسابيع الأولى عن قرب، وفريقنا إلى جانب فريقكم." } },
    { h: { en: "We maintain", fr: "Nous maintenons", ar: "نصون" }, p: { en: "Security, updates and support continue year after year.", fr: "Sécurité, mises à jour et support se poursuivent année après année.", ar: "يستمر الأمان والتحديث والدعم عاماً بعد عام." } },
  ],
  closeH: { en: "Which procedure costs your institution the most time?", fr: "Quelle procédure coûte le plus de temps à votre institution ?", ar: "أيّ إجراء يستهلك أكبر قدر من وقت مؤسستكم؟" },
  closeP: {
    en: "Describe it to us. We will show you how it would run, step by step, before anything is signed.",
    fr: "Décrivez-la nous. Nous vous montrerons comment elle se déroulerait, étape par étape, avant toute signature.",
    ar: "صِفوه لنا، فنُريكم كيف سيسير خطوةً بخطوة قبل أي توقيع.",
  },
};
