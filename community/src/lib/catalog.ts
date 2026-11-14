/* THE company catalogue. Single source for every industry and product shown
   on kogiagroup.com: home, industry pages, product directory, product pages,
   footer and sitemap all read from here. Adding a product = adding one entry.

   Three levels (adopted 2026-11-09):
     Level 1  KogiaGroup (this site)
     Level 2  industries  (INDUSTRIES)
     Level 3  products    (PRODUCTS), each with modules

   Rule: the site says what is true. Every status, number and claim here must
   be checkable. No invented clients, certifications or figures. Visible text
   never uses an em dash or a semicolon (Kogia style rule). */
import type { T } from "./i18n";

export type IndustrySlug = "education" | "healthcare" | "security" | "government" | "enterprise";
export type Status = "live" | "pilot" | "development";

export type Industry = {
  slug: IndustrySlug;
  icon: string;
  name: T;
  short: T;
  intro: T;
  needs: T[];
  capabilities: T[];
  /** Solution lines announced for this industry and not yet built. Shown with the "Planned" label. */
  lines?: Line[];
};

export type Line = { slug: string; icon: string; name: T; text: T; points: T[] };

export type Product = {
  slug: string;
  name: string;
  industry: IndustrySlug;
  also?: IndustrySlug[];
  status: Status;
  url?: string;
  linkLabel?: T;
  tagline: T;
  summary: T;
  modules: T[];
  facts?: T[];
  languages: string;
};

export const STATUS_LABEL: Record<Status, T> = {
  live: { en: "Live", fr: "En service", ar: "في الخدمة" },
  pilot: { en: "Pilot", fr: "Pilote", ar: "تجريبي" },
  development: { en: "In development", fr: "En développement", ar: "قيد التطوير" },
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    icon: "heart-pulse",
    name: { en: "Healthcare", fr: "Santé", ar: "الرعاية الصحية" },
    short: {
      en: "Software for clinics, polyclinics, labs and hospital departments.",
      fr: "Logiciels pour cliniques, polycliniques, laboratoires et services hospitaliers.",
      ar: "برمجيات للعيادات والمجمعات الطبية والمختبرات وأقسام المستشفيات.",
    },
    intro: {
      en: "Large hospitals run one core clinical system and a ring of specialist systems around it. Clinics and polyclinics need one simple tool that covers the day. Kogia Health is built for both: a complete system for private clinics, and departmental modules that work beside a hospital's existing core.",
      fr: "Les grands hôpitaux utilisent un système clinique central entouré de systèmes spécialisés. Les cliniques et polycliniques ont besoin d'un outil simple qui couvre toute la journée. Kogia Health répond aux deux : un système complet pour les cliniques privées, et des modules départementaux qui fonctionnent à côté du système central d'un hôpital.",
      ar: "تعمل المستشفيات الكبيرة بنظام سريري مركزي واحد تحيط به أنظمة متخصصة. أما العيادات والمجمعات الطبية فتحتاج إلى أداة بسيطة تغطي يوم العمل كاملاً. صُمّم Kogia Health للحالتين: نظام متكامل للعيادات الخاصة، ووحدات للأقسام تعمل إلى جانب النظام المركزي القائم في المستشفى.",
    },
    needs: [
      { en: "Appointments, reception and patient queues", fr: "Rendez-vous, accueil et files d'attente", ar: "المواعيد والاستقبال وطوابير المرضى" },
      { en: "Billing, cash and daily closing", fr: "Facturation, caisse et clôture journalière", ar: "الفوترة والصندوق والإقفال اليومي" },
      { en: "Medical equipment maintenance and calibration", fr: "Maintenance et étalonnage des équipements médicaux", ar: "صيانة الأجهزة الطبية ومعايرتها" },
      { en: "Medical supplies, pharmacy stock and expiry", fr: "Fournitures médicales, stock de pharmacie et péremption", ar: "المستلزمات الطبية ومخزون الصيدلية وتواريخ الانتهاء" },
      { en: "Nurse call, asset tracking and medical fridges", fr: "Appel infirmier, localisation des équipements et réfrigérateurs médicaux", ar: "نداء التمريض وتتبع الأصول وثلاجات الأدوية" },
    ],
    capabilities: [
      { en: "Integration with hospital systems through HL7 and FHIR (planned)", fr: "Intégration aux systèmes hospitaliers via HL7 et FHIR (prévu)", ar: "التكامل مع أنظمة المستشفيات عبر HL7 و FHIR (مخطَّط له)" },
      { en: "Arabic, French and English, with real right-to-left Arabic", fr: "Arabe, français et anglais, avec un arabe réellement de droite à gauche", ar: "العربية والفرنسية والإنجليزية، مع اتجاه عربي حقيقي من اليمين إلى اليسار" },
      { en: "Shared or dedicated deployment for each client", fr: "Déploiement partagé ou dédié pour chaque client", ar: "نشر مشترك أو مخصص لكل عميل" },
    ],
    lines: [
      {
        slug: "appointment-app",
        icon: "calendar",
        name: { en: "Appointment app for clinics and practices", fr: "Application de rendez-vous pour cliniques et cabinets", ar: "تطبيق المواعيد للمجمعات الطبية وعيادات الأطباء" },
        text: {
          en: "Patients book from their phone and arrive at their hour instead of waiting through the morning. The same engine serves government offices.",
          fr: "Les patients réservent depuis leur téléphone et arrivent à leur heure au lieu d'attendre toute la matinée. Le même moteur sert les administrations.",
          ar: "يحجز المرضى من هواتفهم ويحضرون في موعدهم بدلاً من الانتظار طوال الصباح. والمحرك نفسه يخدم الدوائر الحكومية.",
        },
        points: [
          { en: "Booking by speciality, doctor and time", fr: "Réservation par spécialité, médecin et heure", ar: "الحجز بحسب التخصص والطبيب والوقت" },
          { en: "Reminders, with cancel and reschedule in one tap", fr: "Rappels, avec annulation et report en un geste", ar: "تذكيرات، مع الإلغاء وإعادة الجدولة بلمسة واحدة" },
          { en: "Bookings and walk-in tickets in one queue", fr: "Réservations et tickets sans rendez-vous dans une seule file", ar: "الحجوزات وتذاكر القادمين دون موعد في طابور واحد" },
          { en: "Demand, waiting time and missed appointments for management", fr: "Demande, temps d'attente et rendez-vous manqués pour la direction", ar: "مؤشرات للإدارة: حجم الطلب ووقت الانتظار والمواعيد الفائتة" },
        ],
      },
      {
        slug: "patient-app",
        icon: "file-text",
        name: { en: "Reports and results in the patient's app", fr: "Comptes rendus et résultats dans l'application du patient", ar: "التقارير والنتائج في تطبيق المريض" },
        text: {
          en: "The clinic publishes results, reports and prescriptions to the patient's phone, under its own validation rule. The app shows documents and does not diagnose.",
          fr: "La clinique publie résultats, comptes rendus et ordonnances sur le téléphone du patient, selon sa propre règle de validation. L'application montre des documents et ne pose pas de diagnostic.",
          ar: "تنشر العيادة النتائج والتقارير والوصفات على هاتف المريض وفق قاعدة الاعتماد الخاصة بها. التطبيق يعرض المستندات ولا يشخّص.",
        },
        points: [
          { en: "Laboratory results, imaging reports and visit summaries", fr: "Résultats de laboratoire, comptes rendus d'imagerie et résumés de consultation", ar: "نتائج المختبر وتقارير الأشعة وملخصات الزيارات" },
          { en: "A notification when a document is ready", fr: "Une notification lorsqu'un document est prêt", ar: "إشعار عند جاهزية المستند" },
          { en: "Family accounts for children and dependants", fr: "Comptes famille pour les enfants et les personnes à charge", ar: "حسابات عائلية للأطفال ومن تعولهم الأسرة" },
          { en: "An access log the patient can read", fr: "Un journal des accès que le patient peut lire", ar: "سجل اطّلاع يستطيع المريض قراءته" },
        ],
      },
    ],
  },
  {
    slug: "education",
    icon: "graduation-cap",
    name: { en: "Education", fr: "Éducation", ar: "التعليم" },
    short: {
      en: "School management, daily evaluation and learning material.",
      fr: "Gestion scolaire, évaluation quotidienne et supports d'apprentissage.",
      ar: "إدارة المدارس والتقييم اليومي والمواد التعليمية.",
    },
    intro: {
      en: "Our first industry and the one with the most products in use. We build for schools, teachers and families: attendance, evaluation, parent communication and printable learning material in Arabic.",
      fr: "Notre premier secteur, et celui qui compte le plus de produits en usage. Nous construisons pour les écoles, les enseignants et les familles : présences, évaluation, communication avec les parents et supports à imprimer en arabe.",
      ar: "أول قطاعاتنا، وفيه أكبر عدد من منتجاتنا المستخدمة فعلاً. نبني للمدارس والمعلمين والأسر: الحضور والتقييم والتواصل مع أولياء الأمور ومواد تعليمية عربية قابلة للطباعة.",
    },
    needs: [
      { en: "Daily attendance and absence follow-up", fr: "Présences quotidiennes et suivi des absences", ar: "الحضور اليومي ومتابعة الغياب" },
      { en: "Student evaluation and reports", fr: "Évaluation des élèves et bulletins", ar: "تقييم الطلاب والتقارير" },
      { en: "Parent communication", fr: "Communication avec les parents", ar: "التواصل مع أولياء الأمور" },
      { en: "Arabic learning material for young children", fr: "Supports en arabe pour les jeunes enfants", ar: "مواد تعليمية عربية للأطفال الصغار" },
    ],
    capabilities: [
      { en: "Country packs for Libya, Tunisia and Qatar", fr: "Paramètres par pays : Libye, Tunisie et Qatar", ar: "إعدادات خاصة بليبيا وتونس وقطر" },
      { en: "Roles and access rights per staff member", fr: "Rôles et droits d'accès par membre du personnel", ar: "أدوار وصلاحيات لكل موظف" },
    ],
  },
  {
    slug: "security",
    icon: "shield-check",
    name: { en: "Security and Buildings", fr: "Sécurité et bâtiments", ar: "الأمن والمباني" },
    short: {
      en: "Access control, video, attendance and smart building systems, with one app per service.",
      fr: "Contrôle d'accès, vidéo, pointage et bâtiment intelligent, avec une application par service.",
      ar: "التحكم في الدخول والمراقبة بالفيديو والحضور والمباني الذكية، مع تطبيق لكل خدمة.",
    },
    intro: {
      en: "Kogia Systems designs, installs and supports security and smart building systems. Every service a client buys comes with its own management app, all under one login.",
      fr: "Kogia Systems conçoit, installe et maintient des systèmes de sécurité et de bâtiment intelligent. Chaque service acheté par un client est livré avec son application de gestion, le tout sous un seul identifiant.",
      ar: "تصمم Kogia Systems أنظمة الأمن والمباني الذكية وتركّبها وتدعمها. كل خدمة يشتريها العميل يرافقها تطبيق إدارة خاص بها، وكلها بحساب دخول واحد.",
    },
    needs: [
      { en: "Access control, visitors and ID cards", fr: "Contrôle d'accès, visiteurs et badges", ar: "التحكم في الدخول والزوار وبطاقات الهوية" },
      { en: "Biometric time and attendance", fr: "Pointage biométrique", ar: "الحضور والانصراف بالبصمة" },
      { en: "Video surveillance and alarms", fr: "Vidéosurveillance et alarmes", ar: "المراقبة بالفيديو والإنذارات" },
      { en: "Building systems and maintenance", fr: "Systèmes du bâtiment et maintenance", ar: "أنظمة المبنى والصيانة" },
    ],
    capabilities: [
      { en: "54 service apps on one platform", fr: "54 applications de service sur une seule plateforme", ar: "54 تطبيقاً خدمياً على منصة واحدة" },
      { en: "Alarm handling with acknowledgement, escalation and response times", fr: "Gestion des alarmes avec acquittement, escalade et temps de réponse", ar: "إدارة الإنذارات مع الإقرار والتصعيد وقياس زمن الاستجابة" },
      { en: "Device connection through a secure on-site connector", fr: "Raccordement des équipements via un connecteur local sécurisé", ar: "ربط الأجهزة عبر موصّل محلي آمن" },
    ],
  },
  {
    slug: "government",
    icon: "landmark",
    name: { en: "Government", fr: "Secteur public", ar: "القطاع الحكومي" },
    short: {
      en: "Digital services, integration and tender-ready delivery for public institutions.",
      fr: "Services numériques, intégration et réponses aux appels d'offres pour les institutions publiques.",
      ar: "خدمات رقمية وتكامل أنظمة وتسليم وفق متطلبات المناقصات، للمؤسسات العامة.",
    },
    intro: {
      en: "Public institutions need systems they can audit, host where they choose and keep for many years. We build with that in mind from the first line: roles, audit trails, three languages, and deployment on dedicated infrastructure when required.",
      fr: "Les institutions publiques ont besoin de systèmes qu'elles peuvent auditer, héberger où elles le souhaitent et conserver longtemps. Nous construisons dans ce sens dès la première ligne : rôles, journaux d'audit, trois langues et déploiement sur une infrastructure dédiée si nécessaire.",
      ar: "تحتاج المؤسسات العامة إلى أنظمة يمكنها تدقيقها واستضافتها حيث تشاء والاحتفاظ بها لسنوات طويلة. نبني على هذا الأساس منذ السطر الأول: أدوار وسجلات تدقيق وثلاث لغات ونشر على بنية مخصصة عند الحاجة.",
    },
    needs: [
      { en: "Digital public services in Arabic, French and English", fr: "Services publics numériques en arabe, français et anglais", ar: "خدمات عامة رقمية بالعربية والفرنسية والإنجليزية" },
      { en: "Integration with existing institutional systems", fr: "Intégration aux systèmes institutionnels existants", ar: "التكامل مع الأنظمة المؤسسية القائمة" },
      { en: "Audit trails and role-based access", fr: "Journaux d'audit et accès par rôle", ar: "سجلات التدقيق والصلاحيات حسب الدور" },
      { en: "Correspondence, decisions and archives that can be traced", fr: "Courrier, décisions et archives traçables", ar: "مراسلات وقرارات وأرشيف يمكن تتبعها" },
      { en: "Fewer queues: requests filed, tracked and delivered online", fr: "Moins de files d'attente : demandes déposées, suivies et délivrées en ligne", ar: "طوابير أقل: طلبات تُقدَّم وتُتابَع وتُسلَّم عبر الإنترنت" },
    ],
    capabilities: [
      { en: "Dedicated deployment on infrastructure chosen by the client", fr: "Déploiement dédié sur l'infrastructure choisie par le client", ar: "نشر مخصص على البنية التي يختارها العميل" },
      { en: "Documentation and long-term maintenance agreements", fr: "Documentation et contrats de maintenance à long terme", ar: "التوثيق واتفاقيات الصيانة الطويلة الأمد" },
    ],
    lines: [
      {
        slug: "municipal-administration",
        icon: "building-2",
        name: { en: "Municipal administration", fr: "Administration municipale", ar: "الإدارة البلدية" },
        text: {
          en: "The work inside a municipality, from the incoming letter to the council decision, on one system with roles, approvals and an audit trail.",
          fr: "Le travail interne d'une municipalité, du courrier entrant à la décision du conseil, dans un seul système avec rôles, validations et journal d'audit.",
          ar: "العمل داخل البلدية، من البريد الوارد إلى قرار المجلس، على نظام واحد بأدوار وموافقات وسجل تدقيق.",
        },
        points: [
          { en: "Incoming and outgoing correspondence with a searchable archive", fr: "Courrier entrant et sortant avec archive consultable", ar: "الوارد والصادر مع أرشيف قابل للبحث" },
          { en: "Council sessions, decisions and their follow-up", fr: "Séances du conseil, décisions et suivi d'exécution", ar: "جلسات المجلس وقراراته ومتابعة تنفيذها" },
          { en: "Licences office: files, inspections, renewals and register", fr: "Bureau des licences : dossiers, inspections, renouvellements et registre", ar: "مكتب التراخيص: الملفات والتفتيش والتجديد والسجل" },
          { en: "Building permits and site inspection", fr: "Permis de construire et contrôle de chantier", ar: "رخص البناء ومعاينة المواقع" },
          { en: "Local revenue, receipts and outstanding dues", fr: "Recettes locales, quittances et impayés", ar: "الإيرادات المحلية والإيصالات والمستحقات" },
          { en: "Complaints desk with deadlines and escalation", fr: "Bureau des réclamations avec délais et escalade", ar: "مكتب الشكاوى بآجال محددة وتصعيد" },
          { en: "Contractors, procurement and project follow-up", fr: "Entrepreneurs, achats et suivi des projets", ar: "المقاولون والمشتريات ومتابعة المشاريع" },
          { en: "Staff, attendance and municipal assets", fr: "Personnel, présences et biens municipaux", ar: "الموظفون والحضور وأصول البلدية" },
        ],
      },
      {
        slug: "citizen-services",
        icon: "globe",
        name: { en: "Services for residents and businesses", fr: "Services aux habitants et aux entreprises", ar: "خدمات المواطنين والأنشطة التجارية" },
        text: {
          en: "A service window on the web. A request is filed, paid, tracked and delivered without a second visit wherever the rules allow it.",
          fr: "Un guichet de services en ligne. Une demande est déposée, payée, suivie et délivrée sans seconde visite partout où les règles le permettent.",
          ar: "نافذة خدمات على الإنترنت. يُقدَّم الطلب ويُدفع رسمه ويُتابَع ويُسلَّم دون زيارة ثانية حيثما تسمح اللوائح.",
        },
        points: [
          { en: "Activity licences, new and renewal", fr: "Licences d'activité, nouvelles et renouvelées", ar: "تراخيص مزاولة النشاط، الجديدة والمجدَّدة" },
          { en: "Building permit requests through engineering offices", fr: "Demandes de permis de construire via les bureaux d'études", ar: "طلبات رخص البناء عبر المكاتب الهندسية" },
          { en: "Neighbourhood attestations prepared with the local headman's desk", fr: "Attestations de quartier préparées avec le bureau du chef de quartier", ar: "إفادات المحلة عبر مكتب مختار المحلة" },
          { en: "Reports with photo and location, complaints with tracking", fr: "Signalements avec photo et position, réclamations avec suivi", ar: "بلاغات بالصورة والموقع وشكاوى مع المتابعة" },
          { en: "Payment of fees and fines through the payment services the municipality contracts", fr: "Paiement des droits et amendes via les services de paiement retenus par la municipalité", ar: "دفع الرسوم والغرامات عبر خدمات الدفع التي تتعاقد معها البلدية" },
          { en: "Appointments and queue tickets", fr: "Rendez-vous et tickets de file d'attente", ar: "المواعيد وتذاكر الانتظار" },
          { en: "Every issued document carries a code that anyone can check on a public verification page", fr: "Chaque document délivré porte un code vérifiable par tous sur une page publique", ar: "كل وثيقة صادرة تحمل رمزاً يمكن لأي جهة التحقق منه في صفحة عامة" },
          { en: "A service guide that directs civil status requests to the authority that issues them", fr: "Un guide des services qui oriente les demandes d'état civil vers l'autorité qui les délivre", ar: "دليل خدمات يوجّه طلبات الأحوال المدنية إلى الجهة المختصة بإصدارها" },
        ],
      },
      {
        slug: "administrative-core",
        icon: "layers",
        name: { en: "Administrative core for public bodies", fr: "Socle administratif pour les organismes publics", ar: "النواة الإدارية للجهات العامة" },
        text: {
          en: "Most public bodies share the same daily work. One foundation serves a ministry department, a public company, a chamber of commerce or a professional order.",
          fr: "La plupart des organismes publics partagent le même travail quotidien. Un même socle sert une direction de ministère, une entreprise publique, une chambre de commerce ou un ordre professionnel.",
          ar: "تتشابه الأعمال اليومية في أغلب الجهات العامة. أساس واحد يخدم إدارة في وزارة أو شركة عامة أو غرفة تجارة أو نقابة مهنية.",
        },
        points: [
          { en: "Correspondence and archive", fr: "Courrier et archives", ar: "المراسلات والأرشيف" },
          { en: "Approvals with delegation and deadlines", fr: "Validations avec délégation et délais", ar: "الموافقات مع التفويض والآجال" },
          { en: "Meetings, decisions and follow-up", fr: "Réunions, décisions et suivi", ar: "الاجتماعات والقرارات والمتابعة" },
          { en: "Staff, attendance and leave", fr: "Personnel, présences et congés", ar: "الموظفون والحضور والإجازات" },
          { en: "Procurement and contracts", fr: "Achats et contrats", ar: "المشتريات والعقود" },
          { en: "Reports for management", fr: "Rapports pour la direction", ar: "تقارير للإدارة" },
        ],
      },
    ],
  },
  {
    slug: "enterprise",
    icon: "building-2",
    name: { en: "Enterprise", fr: "Entreprises", ar: "الشركات" },
    short: {
      en: "Business software, tender intelligence and system integration for companies.",
      fr: "Logiciels métier, veille des appels d'offres et intégration de systèmes pour les entreprises.",
      ar: "برمجيات الأعمال ورصد المناقصات وتكامل الأنظمة للشركات.",
    },
    intro: {
      en: "Companies come to us to find new business and to connect the systems they already run. Kogia Tenders gathers open public tenders from several international sources, and our integration work links business software, devices and data.",
      fr: "Les entreprises viennent nous voir pour trouver de nouveaux marchés et relier les systèmes qu'elles utilisent déjà. Kogia Tenders rassemble des appels d'offres publics ouverts issus de plusieurs sources internationales, et notre travail d'intégration relie logiciels métier, équipements et données.",
      ar: "تقصدنا الشركات بحثاً عن فرص أعمال جديدة ولربط الأنظمة التي تعمل بها. تجمع Kogia Tenders المناقصات العامة المفتوحة من عدة مصادر دولية، ويربط عملنا في التكامل برمجيات الأعمال والأجهزة والبيانات.",
    },
    needs: [
      { en: "Finding public tenders in target countries", fr: "Trouver des appels d'offres dans les pays visés", ar: "رصد المناقصات العامة في الدول المستهدفة" },
      { en: "Connecting business software and devices", fr: "Relier logiciels métier et équipements", ar: "ربط برمجيات الأعمال بالأجهزة" },
      { en: "Custom software for a specific workflow", fr: "Logiciel sur mesure pour un processus précis", ar: "برمجيات مخصصة لسير عمل محدد" },
    ],
    capabilities: [
      { en: "Live tender feed with alerts in three languages", fr: "Flux d'appels d'offres en direct avec alertes en trois langues", ar: "تدفق مباشر للمناقصات مع تنبيهات بثلاث لغات" },
      { en: "APIs and integration with existing systems", fr: "API et intégration aux systèmes existants", ar: "واجهات برمجية وتكامل مع الأنظمة القائمة" },
    ],
    lines: [
      {
        slug: "law-firms",
        icon: "lock",
        name: { en: "Law firms", fr: "Cabinets d'avocats", ar: "مكاتب المحاماة" },
        text: {
          en: "Case files, clients, hearings and deadlines, documents and fees in one confidential workspace.",
          fr: "Dossiers, clients, audiences et échéances, documents et honoraires dans un espace de travail confidentiel.",
          ar: "ملفات القضايا والموكلون والجلسات والمواعيد والمستندات والأتعاب في مساحة عمل واحدة سرّية.",
        },
        points: [
          { en: "Case and client files with access per lawyer", fr: "Dossiers et clients avec accès par avocat", ar: "ملفات القضايا والموكلين بصلاحيات لكل محامٍ" },
          { en: "Hearings calendar and deadline reminders", fr: "Calendrier des audiences et rappels d'échéances", ar: "تقويم الجلسات وتذكير بالمواعيد" },
          { en: "Documents with versions and an access log", fr: "Documents avec versions et journal des accès", ar: "مستندات بإصدارات متتابعة وسجل اطّلاع" },
          { en: "Fees, invoices and payments", fr: "Honoraires, factures et paiements", ar: "الأتعاب والفواتير والمدفوعات" },
        ],
      },
      {
        slug: "accounting-firms",
        icon: "building-2",
        name: { en: "Accounting and audit firms", fr: "Cabinets comptables et d'audit", ar: "مكاتب المحاسبة والمراجعة" },
        text: {
          en: "Client files, engagements, statutory deadlines and working papers, with review steps before anything leaves the firm.",
          fr: "Dossiers clients, missions, échéances légales et papiers de travail, avec des étapes de revue avant toute sortie du cabinet.",
          ar: "ملفات العملاء والمهام والآجال القانونية وأوراق العمل، مع مراحل مراجعة قبل خروج أي مستند من المكتب.",
        },
        points: [
          { en: "Client files and engagements", fr: "Dossiers clients et missions", ar: "ملفات العملاء والمهام" },
          { en: "Deadlines calendar per client", fr: "Calendrier des échéances par client", ar: "تقويم الآجال لكل عميل" },
          { en: "Review and sign-off steps", fr: "Étapes de revue et de validation", ar: "مراحل المراجعة والاعتماد" },
          { en: "Time, invoices and collections", fr: "Temps passé, factures et recouvrement", ar: "الوقت والفواتير والتحصيل" },
        ],
      },
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "kogia-health",
    name: "Kogia Health",
    industry: "healthcare",
    status: "development",
    tagline: {
      en: "Clinic management and hospital department modules.",
      fr: "Gestion de clinique et modules pour les services hospitaliers.",
      ar: "إدارة العيادات ووحدات لأقسام المستشفيات.",
    },
    summary: {
      en: "One product with modules a clinic or hospital switches on as needed. The first release covers the front office, billing, medical equipment, medical stores and a management dashboard. It does not replace a hospital's clinical core system and does not make clinical decisions.",
      fr: "Un seul produit, avec des modules qu'une clinique ou un hôpital active selon ses besoins. La première version couvre l'accueil, la facturation, les équipements médicaux, les magasins médicaux et un tableau de bord de direction. Il ne remplace pas le système clinique central d'un hôpital et ne prend aucune décision clinique.",
      ar: "منتج واحد بوحدات تفعّلها العيادة أو المستشفى حسب الحاجة. يغطي الإصدار الأول الاستقبال والفوترة والأجهزة الطبية والمخازن الطبية ولوحة متابعة للإدارة. لا يحل محل النظام السريري المركزي للمستشفى ولا يتخذ قرارات سريرية.",
    },
    modules: [
      { en: "Front office: patients, appointments, reception and queue", fr: "Accueil : patients, rendez-vous, réception et file d'attente", ar: "المكتب الأمامي: المرضى والمواعيد والاستقبال والطابور" },
      { en: "Billing: price list, invoices, payments and daily closing", fr: "Facturation : tarifs, factures, paiements et clôture journalière", ar: "الفوترة: قائمة الأسعار والفواتير والمدفوعات والإقفال اليومي" },
      { en: "Medical equipment: register, maintenance and calibration", fr: "Équipements médicaux : inventaire, maintenance et étalonnage", ar: "الأجهزة الطبية: السجل والصيانة والمعايرة" },
      { en: "Medical stores: stock, batches, expiry and purchasing", fr: "Magasins médicaux : stock, lots, péremption et achats", ar: "المخازن الطبية: المخزون والدفعات وتواريخ الانتهاء والمشتريات" },
      { en: "Management dashboard", fr: "Tableau de bord de direction", ar: "لوحة متابعة الإدارة" },
    ],
    languages: "AR · FR · EN",
  },
  {
    slug: "kogia-systems",
    name: "Kogia Systems",
    industry: "security",
    also: ["healthcare", "government"],
    status: "live",
    url: "https://systems.kogiagroup.com",
    linkLabel: { en: "Visit Kogia Systems", fr: "Visiter Kogia Systems", ar: "زيارة Kogia Systems" },
    tagline: {
      en: "Security and smart building integration, with an app for every service.",
      fr: "Intégration sécurité et bâtiment intelligent, avec une application pour chaque service.",
      ar: "تكامل أنظمة الأمن والمباني الذكية، مع تطبيق لكل خدمة.",
    },
    summary: {
      en: "Kogia Systems designs, installs and supports access control, attendance, video, alarm and building systems. Each client gets a private suite where every purchased service has its own app: dashboard, device list, alarms with acknowledgement and escalation, reports and export.",
      fr: "Kogia Systems conçoit, installe et maintient contrôle d'accès, pointage, vidéo, alarmes et systèmes du bâtiment. Chaque client dispose d'un espace privé où chaque service acheté a sa propre application : tableau de bord, liste des équipements, alarmes avec acquittement et escalade, rapports et export.",
      ar: "تصمم Kogia Systems أنظمة التحكم في الدخول والحضور والفيديو والإنذار والمباني وتركّبها وتدعمها. يحصل كل عميل على مساحة خاصة يكون فيها لكل خدمة مشتراة تطبيقها: لوحة متابعة وقائمة أجهزة وإنذارات مع الإقرار والتصعيد وتقارير وتصدير.",
    },
    modules: [
      { en: "Time and attendance, access control, visitors, ID cards", fr: "Pointage, contrôle d'accès, visiteurs, badges", ar: "الحضور والانصراف، التحكم في الدخول، الزوار، البطاقات" },
      { en: "Video, perimeter, command and control", fr: "Vidéo, périmètre, supervision", ar: "الفيديو، المحيط، القيادة والتحكم" },
      { en: "Hospital apps: nurse call, asset tracking, medical fridges", fr: "Applications hospitalières : appel infirmier, localisation, réfrigérateurs médicaux", ar: "تطبيقات المستشفيات: نداء التمريض، تتبع الأصول، ثلاجات الأدوية" },
      { en: "Building, hospitality, mobility and infrastructure apps", fr: "Applications bâtiment, hôtellerie, mobilité et infrastructure", ar: "تطبيقات المباني والضيافة والتنقل والبنية التحتية" },
    ],
    facts: [
      { en: "54 service apps", fr: "54 applications de service", ar: "54 تطبيقاً خدمياً" },
    ],
    languages: "AR · FR · EN",
  },
  {
    slug: "kogia-tenders",
    name: "Kogia Tenders",
    industry: "enterprise",
    also: ["government"],
    status: "live",
    url: "https://tenders.kogiagroup.com",
    linkLabel: { en: "Visit Kogia Tenders", fr: "Visiter Kogia Tenders", ar: "زيارة Kogia Tenders" },
    tagline: {
      en: "Open public tenders from several international sources, in one live feed.",
      fr: "Les appels d'offres publics ouverts de plusieurs sources internationales, dans un seul flux en direct.",
      ar: "المناقصات العامة المفتوحة من عدة مصادر دولية في تدفق مباشر واحد.",
    },
    summary: {
      en: "Kogia Tenders collects open public tenders, organises them by country and sector, and alerts subscribers when a matching tender is published. A free trial is available, then paid plans by coverage.",
      fr: "Kogia Tenders collecte les appels d'offres publics ouverts, les classe par pays et par secteur, et alerte les abonnés dès qu'un appel correspondant est publié. Un essai gratuit est proposé, puis des formules payantes selon la couverture.",
      ar: "تجمع Kogia Tenders المناقصات العامة المفتوحة وتنظمها حسب الدولة والقطاع وتنبّه المشتركين عند نشر مناقصة مطابقة. تتوفر فترة تجربة مجانية ثم باقات مدفوعة حسب نطاق التغطية.",
    },
    modules: [
      { en: "Live feed by country and sector", fr: "Flux en direct par pays et secteur", ar: "تدفق مباشر حسب الدولة والقطاع" },
      { en: "Alerts and saved searches", fr: "Alertes et recherches enregistrées", ar: "التنبيهات وعمليات البحث المحفوظة" },
      { en: "Awards and export", fr: "Attributions et export", ar: "نتائج الترسية والتصدير" },
    ],
    languages: "AR · FR · EN",
  },
  {
    slug: "coreon-edu",
    name: "Coreon EDU",
    industry: "education",
    status: "pilot",
    url: "https://edu.kogiagroup.com",
    linkLabel: { en: "Open the demo", fr: "Ouvrir la démo", ar: "فتح العرض التجريبي" },
    tagline: {
      en: "A complete school management system, from nursery to grade 6.",
      fr: "Un système complet de gestion scolaire, de la maternelle à la 6e année.",
      ar: "نظام متكامل لإدارة المدرسة من الروضة إلى الصف السادس.",
    },
    summary: {
      en: "Coreon EDU covers daily student evaluation, attendance, parent follow-up, classroom monitoring and staff roles. A public demo is available.",
      fr: "Coreon EDU couvre l'évaluation quotidienne des élèves, les présences, le suivi des parents, le suivi de classe et les rôles du personnel. Une démo publique est disponible.",
      ar: "يغطي Coreon EDU التقييم اليومي للطلاب والحضور ومتابعة أولياء الأمور ومراقبة الفصول وأدوار الموظفين. يتوفر عرض تجريبي عام.",
    },
    modules: [
      { en: "Daily evaluation", fr: "Évaluation quotidienne", ar: "التقييم اليومي" },
      { en: "Attendance", fr: "Présences", ar: "الحضور" },
      { en: "Parent follow-up", fr: "Suivi des parents", ar: "متابعة أولياء الأمور" },
      { en: "Staff roles and audit journal", fr: "Rôles du personnel et journal d'audit", ar: "أدوار الموظفين وسجل التدقيق" },
    ],
    languages: "AR · FR · EN",
  },
  {
    slug: "eduplus-connect",
    name: "EduPlus Connect",
    industry: "education",
    status: "live",
    tagline: {
      en: "School management built with a partner school and used there every day.",
      fr: "Gestion scolaire construite avec une école partenaire et utilisée chaque jour.",
      ar: "نظام إدارة مدرسية بُني مع مدرسة شريكة ويُستخدم فيها يومياً.",
    },
    summary: {
      en: "EduPlus Connect handles roles and access rights, daily attendance, observations and reports. It runs in one partner school, and access is private to that school.",
      fr: "EduPlus Connect gère les rôles et droits d'accès, les présences quotidiennes, les observations et les rapports. Il fonctionne dans une école partenaire et son accès est réservé à cette école.",
      ar: "يدير EduPlus Connect الأدوار والصلاحيات والحضور اليومي والملاحظات والتقارير. يعمل في مدرسة شريكة واحدة والدخول إليه خاص بها.",
    },
    modules: [
      { en: "Roles and access rights", fr: "Rôles et droits d'accès", ar: "الأدوار والصلاحيات" },
      { en: "Daily attendance by period", fr: "Présences par séance", ar: "الحضور اليومي حسب الحصة" },
      { en: "Observations and reports", fr: "Observations et rapports", ar: "الملاحظات والتقارير" },
    ],
    languages: "AR · EN",
  },
  {
    slug: "kogia-kids",
    name: "Kogia Kids",
    industry: "education",
    status: "live",
    url: "https://kogiakids.com",
    linkLabel: { en: "Visit Kogia Kids", fr: "Visiter Kogia Kids", ar: "زيارة Kogia Kids" },
    tagline: {
      en: "Printable Arabic learning sheets for young children.",
      fr: "Des fiches d'apprentissage en arabe à imprimer pour les jeunes enfants.",
      ar: "أوراق تعليمية عربية قابلة للطباعة للأطفال الصغار.",
    },
    summary: {
      en: "Kogia Kids publishes printable Arabic activity sheets with a guide for adults. Many sheets are free without an account. Kogia Plus is an optional paid membership.",
      fr: "Kogia Kids publie des fiches d'activités en arabe à imprimer, avec un guide pour l'adulte. De nombreuses fiches sont gratuites et sans compte. Kogia Plus est une adhésion payante facultative.",
      ar: "تنشر Kogia Kids أوراق أنشطة عربية قابلة للطباعة مع دليل للكبار. كثير من الأوراق مجاني ودون حساب، أما Kogia Plus فعضوية مدفوعة اختيارية.",
    },
    modules: [
      { en: "Printable activity sheets", fr: "Fiches d'activités à imprimer", ar: "أوراق أنشطة للطباعة" },
      { en: "Seasonal packs and collections", fr: "Séries saisonnières et collections", ar: "حزم موسمية ومجموعات" },
      { en: "Kogia Plus membership", fr: "Adhésion Kogia Plus", ar: "عضوية Kogia Plus" },
    ],
    languages: "AR",
  },
];

export const industry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
export const product = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsIn = (slug: IndustrySlug) =>
  PRODUCTS.filter((p) => p.industry === slug || p.also?.includes(slug));
