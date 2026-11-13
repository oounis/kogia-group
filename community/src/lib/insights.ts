/* Insights: trend articles for kogiagroup.com, in the three company languages.
   Adding an article = adding one entry here. The list page, the article page,
   the home band and the sitemap derive from it.

   Rules (same as the catalogue):
   - Every figure is read at its source and the source is listed under the
     article. No figure without a source, no invented client or result.
   - What KogiaGroup announces is labelled as announced. A planned service is
     never described as delivered.
   - Visible text never uses an em dash or a semicolon. */
import type { T } from "./i18n";

export type Figure = { v: string; l: T; src: string };
export type Source = { org: string; title: string; url: string };
export type Insight = {
  slug: string;
  /** ISO date of publication. */
  date: string;
  icon: string;
  field: T;
  title: T;
  lede: T;
  figures: Figure[];
  sections: { h: T; p: T[] }[];
  build: { text: T; points: T[]; href: string; label: T };
  sources: Source[];
};

export const INSIGHTS_PAGE = {
  nav: { en: "Insights", fr: "Tendances", ar: "اتجاهات" },
  h1: { en: "Insights", fr: "Tendances", ar: "اتجاهات" },
  lede: {
    en: "Where public services, clinics and schools are heading, read through published figures, and what we are preparing in response.",
    fr: "Où vont les services publics, les cliniques et les écoles, à partir de chiffres publiés, et ce que nous préparons en réponse.",
    ar: "إلى أين تتجه الخدمات العامة والعيادات والمدارس، استناداً إلى أرقام منشورة، وما نُعدّه استجابةً لذلك.",
  },
  homeKicker: { en: "Insights", fr: "Tendances", ar: "اتجاهات" },
  homeH: { en: "Three shifts we are building for.", fr: "Trois évolutions pour lesquelles nous construisons.", ar: "ثلاثة تحولات نبني من أجلها." },
  homeP: {
    en: "The phone has become the service counter. Here is what the published figures say, and what we are preparing.",
    fr: "Le téléphone est devenu le guichet. Voici ce que disent les chiffres publiés, et ce que nous préparons.",
    ar: "أصبح الهاتف هو شبّاك الخدمة. هذا ما تقوله الأرقام المنشورة، وهذا ما نُعدّه.",
  },
  all: { en: "All insights", fr: "Toutes les tendances", ar: "كل الاتجاهات" },
  read: { en: "Read the analysis", fr: "Lire l'analyse", ar: "اقرأ التحليل" },
  figuresH: { en: "In figures", fr: "En chiffres", ar: "بالأرقام" },
  buildH: { en: "What we are preparing", fr: "Ce que nous préparons", ar: "ما نُعدّه" },
  announced: { en: "Announced", fr: "Annoncé", ar: "معلَن" },
  sourcesH: { en: "Sources", fr: "Sources", ar: "المصادر" },
  sourcesNote: {
    en: "Every figure in this article was read at the source below. Sources are in their original language.",
    fr: "Chaque chiffre de cet article a été lu à la source ci-dessous. Les sources sont dans leur langue d'origine.",
    ar: "كل رقم في هذا المقال قُرئ من مصدره أدناه. المصادر بلغتها الأصلية.",
  },
  talkH: { en: "Does this match what you see in your institution?", fr: "Cela ressemble-t-il à ce que vous vivez dans votre institution ?", ar: "هل يشبه هذا ما تراه في مؤسستك؟" },
  talkP: {
    en: "We are looking for a first partner institution for each of these services. Tell us how you work today.",
    fr: "Nous cherchons une première institution partenaire pour chacun de ces services. Dites-nous comment vous travaillez aujourd'hui.",
    ar: "نبحث عن مؤسسة شريكة أولى لكل خدمة من هذه الخدمات. أخبرنا كيف تعملون اليوم.",
  },
  more: { en: "More insights", fr: "Autres tendances", ar: "اتجاهات أخرى" },
};

export const INSIGHTS: Insight[] = [
  {
    slug: "appointments-instead-of-queues",
    date: "2026-11-13",
    icon: "calendar",
    field: { en: "Appointments", fr: "Rendez-vous", ar: "المواعيد" },
    title: {
      en: "An appointment instead of a queue",
      fr: "Un rendez-vous à la place de la file d'attente",
      ar: "موعد بدلاً من الطابور",
    },
    lede: {
      en: "In a government office, a clinic or a private practice, the queue costs everyone a morning and tells nobody when their turn will come. Countries that moved booking to the phone now count their appointments in tens of millions. We are preparing one appointment app for all three settings.",
      fr: "Dans une administration, une clinique ou un cabinet privé, la file d'attente coûte une matinée à chacun et ne dit à personne quand viendra son tour. Les pays qui ont mis la prise de rendez-vous sur le téléphone comptent désormais leurs rendez-vous en dizaines de millions. Nous préparons une application de rendez-vous pour ces trois cadres.",
      ar: "في الدائرة الحكومية أو العيادة أو عيادة الطبيب الخاصة، يكلّف الطابور كل شخص صباحاً كاملاً ولا يخبر أحداً متى يحين دوره. الدول التي نقلت الحجز إلى الهاتف تعدّ اليوم مواعيدها بعشرات الملايين. ونحن نُعدّ تطبيقاً واحداً للمواعيد يخدم هذه الجهات الثلاث.",
    },
    figures: [
      {
        v: "30 M+",
        l: {
          en: "appointments completed through Saudi Arabia's Sehhaty platform",
          fr: "rendez-vous réalisés via la plateforme saoudienne Sehhaty",
          ar: "موعد أُنجز عبر منصة «صحتي» السعودية",
        },
        src: "Ministry of Health, Saudi Arabia, 2026",
      },
      {
        v: "1.8% / 5.9%",
        l: {
          en: "missed appointments in a medical practice: booked online against booked the usual way",
          fr: "rendez-vous manqués dans un cabinet médical : pris en ligne contre pris de façon classique",
          ar: "المواعيد الفائتة في عيادة طبية: المحجوزة عبر الإنترنت مقابل المحجوزة بالطريقة المعتادة",
        },
        src: "Frontiers in Digital Health, 2025",
      },
      {
        v: "−23%",
        l: {
          en: "missed hospital appointments after rewording the SMS reminder",
          fr: "de rendez-vous hospitaliers manqués après reformulation du SMS de rappel",
          ar: "انخفاض المواعيد الفائتة في المستشفى بعد إعادة صياغة رسالة التذكير النصية",
        },
        src: "UK Behavioural Insights Team trial, Barts NHS Trust",
      },
    ],
    sections: [
      {
        h: { en: "A cost that appears on no invoice", fr: "Un coût qui ne figure sur aucune facture", ar: "تكلفة لا تظهر في أي فاتورة" },
        p: [
          {
            en: "A queue has no line in any budget, and still everyone pays for it. The citizen takes half a day off for a five-minute signature. The patient arrives at dawn to be seen at noon. The doctor's afternoon is empty because the morning's patients gave up. Staff spend their energy managing a crowd instead of serving it.",
            fr: "Une file d'attente n'a de ligne dans aucun budget, et pourtant tout le monde la paie. Le citoyen prend une demi-journée pour une signature de cinq minutes. Le patient arrive à l'aube pour être reçu à midi. L'après-midi du médecin est vide parce que les patients du matin ont renoncé. Le personnel dépense son énergie à gérer une foule au lieu de la servir.",
            ar: "ليس للطابور بند في أي ميزانية، ومع ذلك يدفع الجميع ثمنه. المواطن يأخذ نصف يوم إجازة من أجل توقيع يستغرق خمس دقائق. المريض يصل عند الفجر ليُفحص عند الظهر. وعيادة الطبيب تخلو بعد الظهر لأن مرضى الصباح انصرفوا. والموظفون يستنزفون طاقتهم في تنظيم الزحام بدلاً من خدمة الناس.",
          },
          {
            en: "None of this is a shortage of goodwill. It is a shortage of information: nobody knows who is coming, for what, and when.",
            fr: "Rien de tout cela n'est un manque de bonne volonté. C'est un manque d'information : personne ne sait qui vient, pour quoi, et quand.",
            ar: "لا شيء من ذلك سببه نقص في حسن النية. السبب نقص في المعلومة: لا أحد يعرف من سيأتي ولأي غرض ومتى.",
          },
        ],
      },
      {
        h: { en: "What happened where booking moved to the phone", fr: "Ce qui s'est passé là où la réservation est passée sur le téléphone", ar: "ماذا حدث حيث انتقل الحجز إلى الهاتف" },
        p: [
          {
            en: "Saudi Arabia's Ministry of Health reported in November 2026 that its Sehhaty platform has completed more than 30 million appointments and 6 million instant consultations, across 74 digital services.",
            fr: "Le ministère saoudien de la Santé a indiqué en novembre 2026 que sa plateforme Sehhaty a réalisé plus de 30 millions de rendez-vous et 6 millions de consultations instantanées, à travers 74 services numériques.",
            ar: "أعلنت وزارة الصحة السعودية في نوفمبر 2026 أن منصة «صحتي» أنجزت أكثر من 30 مليون موعد و6 ملايين استشارة فورية، عبر 74 خدمة رقمية.",
          },
          {
            en: "In England, more than 39 million people had registered for the NHS App by the end of 2025, and managing hospital appointments is one of the things they do in it.",
            fr: "En Angleterre, plus de 39 millions de personnes étaient inscrites à l'application NHS App fin 2025, et la gestion des rendez-vous hospitaliers fait partie de ce qu'elles y font.",
            ar: "وفي إنجلترا، تجاوز عدد المسجلين في تطبيق NHS App 39 مليون شخص بنهاية 2025، وإدارة مواعيد المستشفيات من بين ما يفعلونه فيه.",
          },
          {
            en: "These are large national systems. The principle underneath is small enough for a single clinic: let people choose a time, remind them, and make it easy to give the slot back.",
            fr: "Ce sont de grands systèmes nationaux. Le principe qui les porte tient dans une seule clinique : laisser les gens choisir une heure, la leur rappeler, et rendre facile la restitution du créneau.",
            ar: "هذه أنظمة وطنية كبيرة. لكن المبدأ الذي تقوم عليه صغير بما يكفي لعيادة واحدة: دع الناس يختارون الوقت، وذكّرهم به، واجعل التنازل عن الموعد سهلاً.",
          },
        ],
      },
      {
        h: { en: "What the evidence says, including the awkward part", fr: "Ce que disent les études, y compris la partie gênante", ar: "ماذا تقول الدراسات، بما فيها الجزء المحرج" },
        p: [
          {
            en: "A 2025 study in Frontiers in Digital Health followed 16,894 appointments in a German medical practice. Appointments booked online were missed 1.8% of the time, against 5.9% for those booked the usual way.",
            fr: "Une étude publiée en 2025 dans Frontiers in Digital Health a suivi 16 894 rendez-vous dans un cabinet médical allemand. Les rendez-vous pris en ligne ont été manqués dans 1,8 % des cas, contre 5,9 % pour ceux pris de façon classique.",
            ar: "تابعت دراسة نُشرت عام 2025 في مجلة Frontiers in Digital Health 16,894 موعداً في عيادة طبية ألمانية. المواعيد المحجوزة عبر الإنترنت فاتت بنسبة 1.8%، مقابل 5.9% للمواعيد المحجوزة بالطريقة المعتادة.",
          },
          {
            en: "The same study found the opposite in a university hospital, where online bookings were missed more often, 14.3% against 11.2%. Booking alone is not a cure.",
            fr: "La même étude a constaté l'inverse dans un hôpital universitaire, où les réservations en ligne étaient plus souvent manquées, 14,3 % contre 11,2 %. La réservation seule ne guérit rien.",
            ar: "ووجدت الدراسة نفسها عكس ذلك في مستشفى جامعي، حيث فاتت الحجوزات الإلكترونية بنسبة أعلى، 14.3% مقابل 11.2%. الحجز وحده ليس علاجاً.",
          },
          {
            en: "Reminders are the other half. In a trial with about 20,000 patients at Barts NHS Trust in London, changing only the wording of the SMS reminder brought missed appointments down from 11.1% to 8.4%, a relative reduction of 23%.",
            fr: "Les rappels sont l'autre moitié. Dans un essai mené auprès d'environ 20 000 patients au Barts NHS Trust à Londres, le seul changement de formulation du SMS de rappel a fait passer les rendez-vous manqués de 11,1 % à 8,4 %, soit une réduction relative de 23 %.",
            ar: "التذكير هو النصف الآخر. في تجربة شملت نحو 20,000 مريض في مؤسسة Barts NHS Trust في لندن، أدى تغيير صياغة رسالة التذكير النصية وحده إلى خفض المواعيد الفائتة من 11.1% إلى 8.4%، أي بانخفاض نسبي قدره 23%.",
          },
          {
            en: "So the design that works is a whole loop: booking, a reminder written with care, one tap to cancel, and a freed slot offered to the next person.",
            fr: "Ce qui fonctionne est donc une boucle complète : la réservation, un rappel rédigé avec soin, une annulation en un geste, et un créneau libéré proposé à la personne suivante.",
            ar: "فالتصميم الناجح إذن حلقة كاملة: حجز، وتذكير مكتوب بعناية، وإلغاء بلمسة واحدة، وموعد محرَّر يُعرض على الشخص التالي.",
          },
        ],
      },
      {
        h: { en: "One engine, three counters", fr: "Un moteur, trois guichets", ar: "محرك واحد وثلاثة شبابيك" },
        p: [
          {
            en: "Government offices. A citizen picks the service, sees the documents to bring, and chooses a slot. The office knows the day's load before the doors open.",
            fr: "Administrations. Le citoyen choisit le service, voit les pièces à apporter et sélectionne un créneau. Le bureau connaît la charge de la journée avant l'ouverture des portes.",
            ar: "الدوائر الحكومية. يختار المواطن الخدمة، ويرى المستندات المطلوبة، ويحدد موعده. وتعرف الدائرة حجم العمل قبل أن تفتح أبوابها.",
          },
          {
            en: "Clinics and polyclinics. The patient chooses a speciality, a doctor and a time. Reception sees bookings and walk-ins in one queue.",
            fr: "Cliniques et polycliniques. Le patient choisit une spécialité, un médecin et une heure. L'accueil voit les réservations et les arrivées sans rendez-vous dans une seule file.",
            ar: "العيادات والمجمعات الطبية. يختار المريض التخصص والطبيب والوقت. ويرى الاستقبال الحجوزات والقادمين دون موعد في طابور واحد.",
          },
          {
            en: "Private practices. A doctor working alone gets a booking page and an ordered day, with the phone ringing less.",
            fr: "Cabinets privés. Un médecin qui exerce seul dispose d'une page de réservation et d'une journée ordonnée, avec un téléphone qui sonne moins.",
            ar: "العيادات الخاصة. يحصل الطبيب الذي يعمل منفرداً على صفحة حجز ويوم منظم، وهاتف يرنّ أقل.",
          },
        ],
      },
      {
        h: { en: "What the institution gains", fr: "Ce que l'institution y gagne", ar: "ما الذي تكسبه المؤسسة" },
        p: [
          {
            en: "Every booking is also a measurement. Management sees demand by hour and by service, the real waiting time, and the share of missed appointments. Staffing follows the numbers instead of guesswork.",
            fr: "Chaque réservation est aussi une mesure. La direction voit la demande par heure et par service, le temps d'attente réel et la part de rendez-vous manqués. Les effectifs suivent les chiffres plutôt que l'intuition.",
            ar: "كل حجز هو أيضاً قياس. ترى الإدارة الطلب بحسب الساعة والخدمة، ووقت الانتظار الفعلي، ونسبة المواعيد الفائتة. فيُوزَّع الموظفون وفق الأرقام لا وفق التخمين.",
          },
          {
            en: "People without a smartphone are not left out. The desk keeps issuing tickets, and both flows share the same queue.",
            fr: "Les personnes sans smartphone ne sont pas mises de côté. Le guichet continue de délivrer des tickets, et les deux flux partagent la même file.",
            ar: "ومن لا يملك هاتفاً ذكياً لا يُترك جانباً. يواصل المكتب إصدار التذاكر، ويتشارك المساران الطابور نفسه.",
          },
        ],
      },
    ],
    build: {
      text: {
        en: "The appointment app is announced and in preparation. The reception side, with appointments and queue, is part of the first release of Kogia Health, which is in development.",
        fr: "L'application de rendez-vous est annoncée et en préparation. Le côté accueil, avec rendez-vous et file d'attente, fait partie de la première version de Kogia Health, en développement.",
        ar: "تطبيق المواعيد معلَن وقيد الإعداد. أما جانب الاستقبال، بالمواعيد والطابور، فهو جزء من الإصدار الأول من Kogia Health، وهو قيد التطوير.",
      },
      points: [
        { en: "Booking by service, branch, doctor and time", fr: "Réservation par service, site, médecin et heure", ar: "الحجز بحسب الخدمة والفرع والطبيب والوقت" },
        { en: "A ticket with the hour and a code to show on arrival", fr: "Un ticket avec l'heure et un code à présenter à l'arrivée", ar: "تذكرة تحمل الساعة ورمزاً يُعرض عند الوصول" },
        { en: "Reminders, with cancel and reschedule in one tap", fr: "Rappels, avec annulation et report en un geste", ar: "تذكيرات، مع الإلغاء وإعادة الجدولة بلمسة واحدة" },
        { en: "Live position in the queue", fr: "Position en direct dans la file", ar: "موقعك في الطابور لحظة بلحظة" },
        { en: "Bookings and walk-in tickets in one queue", fr: "Réservations et tickets sans rendez-vous dans une seule file", ar: "الحجوزات وتذاكر القادمين دون موعد في طابور واحد" },
        { en: "Dashboard: demand, waiting time, missed appointments", fr: "Tableau de bord : demande, temps d'attente, rendez-vous manqués", ar: "لوحة متابعة: الطلب ووقت الانتظار والمواعيد الفائتة" },
      ],
      href: "/industries/healthcare",
      label: { en: "See our healthcare line", fr: "Voir notre ligne santé", ar: "اطّلع على خط الرعاية الصحية" },
    },
    sources: [
      { org: "Ministry of Health, Saudi Arabia", title: "Saudi Arabia expands healthcare coverage to reach 97% (5 November 2026)", url: "https://www.moh.gov.sa/en/Ministry/MediaCenter/News/Pages/news-2026-11-05-001.aspx" },
      { org: "NHS England", title: "Record numbers using NHS App to manage health (December 2025)", url: "https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/" },
      { org: "Frontiers in Digital Health", title: "Efficient patient care in the digital age: impact of online appointment scheduling in a medical practice and a university hospital on the no-show rate (2025)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12081397/" },
      { org: "UK Government, Behavioural Insights Team", title: "A zero cost way to reduce missed hospital appointments", url: "https://www.gov.uk/government/publications/reducing-missed-hospital-appointments-using-text-messages/a-zero-cost-way-to-reduce-missed-hospital-appointments" },
    ],
  },
  {
    slug: "medical-results-in-the-patients-hands",
    date: "2026-11-13",
    icon: "file-text",
    field: { en: "Patient records", fr: "Dossier du patient", ar: "ملف المريض" },
    title: {
      en: "Your medical results, in your own hands",
      fr: "Vos résultats médicaux, entre vos mains",
      ar: "نتائجك الطبية بين يديك",
    },
    lede: {
      en: "A patient who has to come back to collect a paper result has made one trip too many. Where results are released in an app, patients overwhelmingly prefer it, and the law is starting to treat access as a right. We are preparing a patient app in which the clinic publishes reports and results.",
      fr: "Un patient qui doit revenir chercher un résultat sur papier a fait un déplacement de trop. Là où les résultats sont publiés dans une application, les patients le préfèrent très largement, et le droit commence à traiter cet accès comme un droit. Nous préparons une application patient dans laquelle la clinique publie comptes rendus et résultats.",
      ar: "المريض الذي يضطر إلى العودة لاستلام نتيجة ورقية قام برحلة زائدة. حيث تُنشر النتائج في تطبيق، يفضّل المرضى ذلك بأغلبية ساحقة، وبدأت القوانين تعامل هذا الوصول على أنه حق. ونحن نُعدّ تطبيقاً للمريض تنشر فيه العيادة التقارير والنتائج.",
    },
    figures: [
      {
        v: "96%",
        l: {
          en: "of 8,139 patients preferred to receive test results online as soon as they were ready",
          fr: "des 8 139 patients préféraient recevoir leurs résultats en ligne dès qu'ils étaient prêts",
          ar: "من 8,139 مريضاً فضّلوا استلام نتائج الفحوص عبر الإنترنت فور جاهزيتها",
        },
        src: "JAMA Network Open, 2023",
      },
      {
        v: "39 M+",
        l: {
          en: "people registered for the NHS App in England by the end of 2025",
          fr: "personnes inscrites à l'application NHS App en Angleterre fin 2025",
          ar: "شخصاً مسجلاً في تطبيق NHS App في إنجلترا بنهاية 2025",
        },
        src: "NHS England, 2025",
      },
      {
        v: "2031",
        l: {
          en: "the year laboratory results and discharge reports become exchangeable across the European Union",
          fr: "l'année où résultats de laboratoire et comptes rendus de sortie deviennent échangeables dans l'Union européenne",
          ar: "السنة التي تصبح فيها نتائج المختبر وتقارير الخروج قابلة للتبادل في أنحاء الاتحاد الأوروبي",
        },
        src: "European Commission, EHDS Regulation",
      },
    ],
    sections: [
      {
        h: { en: "The paper envelope", fr: "L'enveloppe en papier", ar: "الظرف الورقي" },
        p: [
          {
            en: "In many clinics a result still means a second visit, a wait at a counter and a paper envelope. Paper gets lost, cannot be shown to another doctor in a minute, and leaves the patient with no history when they change clinic or city.",
            fr: "Dans beaucoup de cliniques, un résultat signifie encore une seconde visite, une attente au guichet et une enveloppe en papier. Le papier se perd, ne peut pas être montré à un autre médecin en une minute, et laisse le patient sans historique lorsqu'il change de clinique ou de ville.",
            ar: "في كثير من العيادات ما زالت النتيجة تعني زيارة ثانية وانتظاراً عند الشبّاك وظرفاً ورقياً. الورق يضيع، ولا يمكن عرضه على طبيب آخر في دقيقة، ويترك المريض بلا سجل حين يغيّر عيادته أو مدينته.",
          },
          {
            en: "The clinic pays as well: staff time at the results counter, reprints, and examinations repeated because the earlier ones cannot be found.",
            fr: "La clinique paie aussi : du temps de personnel au guichet des résultats, des réimpressions, et des examens refaits parce que les précédents sont introuvables.",
            ar: "والعيادة تدفع أيضاً: وقت الموظفين عند شبّاك النتائج، وإعادة الطباعة، وفحوص تُعاد لأن السابقة لا يُعثر عليها.",
          },
        ],
      },
      {
        h: { en: "What patients say when they are asked", fr: "Ce que disent les patients quand on leur demande", ar: "ماذا يقول المرضى حين يُسألون" },
        p: [
          {
            en: "A study published in JAMA Network Open in 2023 surveyed 8,139 patients and caregivers at four large academic medical centres in the United States. Nearly 96% preferred immediate access to their test results online.",
            fr: "Une étude publiée dans JAMA Network Open en 2023 a interrogé 8 139 patients et aidants dans quatre grands centres médicaux universitaires aux États-Unis. Près de 96 % préféraient un accès immédiat en ligne à leurs résultats d'examens.",
            ar: "استطلعت دراسة نُشرت في JAMA Network Open عام 2023 آراء 8,139 مريضاً ومرافقاً في أربعة مراكز طبية جامعية كبرى في الولايات المتحدة. فضّل نحو 96% منهم الوصول الفوري إلى نتائج فحوصهم عبر الإنترنت.",
          },
          {
            en: "About 90% said they wanted future results delivered the same way, even if their doctor had not yet looked at them.",
            fr: "Environ 90 % ont dit vouloir recevoir leurs prochains résultats de la même manière, même si leur médecin ne les avait pas encore consultés.",
            ar: "وقال نحو 90% إنهم يريدون استلام نتائجهم المقبلة بالطريقة نفسها، حتى لو لم يكن طبيبهم قد اطّلع عليها بعد.",
          },
          {
            en: "The same study is honest about the limit. Almost half of those who saw a result before hearing from their doctor felt less worried, and 7.5% felt more worried. A result needs context: normal ranges, plain words, and a clear way to reach the clinic.",
            fr: "La même étude est honnête sur la limite. Près de la moitié de ceux qui ont vu un résultat avant d'être contactés par leur médecin se sont sentis moins inquiets, et 7,5 % plus inquiets. Un résultat a besoin de contexte : des valeurs de référence, des mots simples, et un moyen clair de joindre la clinique.",
            ar: "والدراسة نفسها صريحة بشأن الحدود. نحو نصف من رأوا نتيجتهم قبل أن يتصل بهم طبيبهم شعروا بقلق أقل، و7.5% شعروا بقلق أكبر. النتيجة تحتاج إلى سياق: القيم المرجعية، وكلمات بسيطة، وطريقة واضحة للتواصل مع العيادة.",
          },
        ],
      },
      {
        h: { en: "From convenience to right", fr: "D'une commodité à un droit", ar: "من وسيلة راحة إلى حق" },
        p: [
          {
            en: "In the European Union, the European Health Data Space regulation entered into force on 26 March 2025. It gives people more control over their electronic health data: they can limit who reads it and see who has accessed it. Laboratory results and hospital discharge reports are due to be exchangeable from March 2031.",
            fr: "Dans l'Union européenne, le règlement sur l'espace européen des données de santé est entré en vigueur le 26 mars 2025. Il donne aux personnes davantage de contrôle sur leurs données de santé électroniques : elles peuvent limiter qui les lit et voir qui y a accédé. Les résultats de laboratoire et les comptes rendus de sortie d'hôpital doivent devenir échangeables à partir de mars 2031.",
            ar: "في الاتحاد الأوروبي، دخلت لائحة الفضاء الأوروبي للبيانات الصحية حيز النفاذ في 26 مارس 2025. وهي تمنح الأفراد تحكماً أكبر في بياناتهم الصحية الإلكترونية: يستطيعون تحديد من يقرؤها ومعرفة من اطّلع عليها. ومن المقرر أن تصبح نتائج المختبر وتقارير الخروج من المستشفى قابلة للتبادل اعتباراً من مارس 2031.",
          },
          {
            en: "In May 2025 the World Health Assembly extended the World Health Organization's global strategy on digital health to 2027. In England, people registered for the NHS App can view their GP record and their test results in it.",
            fr: "En mai 2025, l'Assemblée mondiale de la Santé a prolongé jusqu'en 2027 la stratégie mondiale de l'Organisation mondiale de la Santé pour la santé numérique. En Angleterre, les personnes inscrites à l'application NHS App peuvent y consulter leur dossier de médecin traitant et leurs résultats d'examens.",
            ar: "وفي مايو 2025 مدّدت جمعية الصحة العالمية الاستراتيجية العالمية لمنظمة الصحة العالمية بشأن الصحة الرقمية حتى 2027. وفي إنجلترا، يستطيع المسجلون في تطبيق NHS App الاطلاع فيه على ملفهم لدى طبيب الأسرة ونتائج فحوصهم.",
          },
          {
            en: "The direction is the same everywhere: the record follows the patient.",
            fr: "La direction est partout la même : le dossier suit le patient.",
            ar: "والاتجاه واحد في كل مكان: الملف يتبع المريض.",
          },
        ],
      },
      {
        h: { en: "What goes into the app, and what does not", fr: "Ce qui entre dans l'application, et ce qui n'y entre pas", ar: "ما الذي يدخل التطبيق وما الذي لا يدخله" },
        p: [
          {
            en: "Laboratory results, imaging reports, prescriptions, visit summaries and invoices. Each document is published by the clinic, under the clinic's own rule: at once, or after the doctor has validated it.",
            fr: "Résultats de laboratoire, comptes rendus d'imagerie, ordonnances, résumés de consultation et factures. Chaque document est publié par la clinique, selon sa propre règle : immédiatement, ou après validation par le médecin.",
            ar: "نتائج المختبر، وتقارير الأشعة، والوصفات الطبية، وملخصات الزيارات، والفواتير. كل مستند تنشره العيادة وفق قاعدتها الخاصة: فوراً، أو بعد أن يعتمده الطبيب.",
          },
          {
            en: "The app shows and explains. It does not diagnose and does not replace the consultation. Clinical decisions stay with clinicians.",
            fr: "L'application montre et explique. Elle ne pose pas de diagnostic et ne remplace pas la consultation. Les décisions cliniques restent aux cliniciens.",
            ar: "التطبيق يعرض ويشرح. لا يشخّص ولا يحل محل الاستشارة. والقرارات السريرية تبقى للأطباء.",
          },
        ],
      },
      {
        h: { en: "Trust is the product", fr: "La confiance est le produit", ar: "الثقة هي المنتج" },
        p: [
          {
            en: "Health data is the most sensitive data a person has. The patient's identity is verified before the first document appears. A parent can hold a child's file, with the clinic's approval. Every access is recorded, and the data stays in the clinic's system and belongs to the clinic and its patients.",
            fr: "Les données de santé sont les plus sensibles qu'une personne possède. L'identité du patient est vérifiée avant l'apparition du premier document. Un parent peut tenir le dossier d'un enfant, avec l'accord de la clinique. Chaque accès est enregistré, et les données restent dans le système de la clinique et appartiennent à la clinique et à ses patients.",
            ar: "البيانات الصحية أكثر ما يملكه الإنسان حساسية. تُتحقق هوية المريض قبل ظهور أول مستند. ويمكن لوليّ الأمر أن يحمل ملف طفله بموافقة العيادة. كل اطّلاع يُسجَّل، والبيانات تبقى في نظام العيادة وتعود ملكيتها للعيادة ومرضاها.",
          },
        ],
      },
    ],
    build: {
      text: {
        en: "The patient app is announced and in preparation, as an extension of Kogia Health, which is in development. It will display the documents a clinic chooses to publish.",
        fr: "L'application patient est annoncée et en préparation, comme prolongement de Kogia Health, en développement. Elle affichera les documents que la clinique choisit de publier.",
        ar: "تطبيق المريض معلَن وقيد الإعداد، امتداداً لمنتج Kogia Health الذي هو قيد التطوير. وسيعرض المستندات التي تختار العيادة نشرها.",
      },
      points: [
        { en: "Results and reports published by the clinic", fr: "Résultats et comptes rendus publiés par la clinique", ar: "نتائج وتقارير تنشرها العيادة" },
        { en: "Prescriptions and visit summaries", fr: "Ordonnances et résumés de consultation", ar: "الوصفات الطبية وملخصات الزيارات" },
        { en: "Family accounts for children and dependants", fr: "Comptes famille pour les enfants et les personnes à charge", ar: "حسابات عائلية للأطفال ومن هم في الرعاية" },
        { en: "A notification when a document is ready", fr: "Une notification lorsqu'un document est prêt", ar: "إشعار عند جاهزية المستند" },
        { en: "An access log the patient can read", fr: "Un journal des accès que le patient peut lire", ar: "سجل اطّلاع يستطيع المريض قراءته" },
        { en: "Download and share with another doctor", fr: "Téléchargement et partage avec un autre médecin", ar: "التنزيل والمشاركة مع طبيب آخر" },
      ],
      href: "/products/kogia-health",
      label: { en: "See Kogia Health", fr: "Voir Kogia Health", ar: "اطّلع على Kogia Health" },
    },
    sources: [
      { org: "JAMA Network Open", title: "Perspectives of Patients About Immediate Access to Test Results Through an Online Patient Portal (2023)", url: "https://pubmed.ncbi.nlm.nih.gov/36939703/" },
      { org: "UT Southwestern Medical Center", title: "Patients prefer immediate access to medical test results online (March 2023)", url: "https://www.utsouthwestern.edu/newsroom/articles/year-2023/march-medical-test-results-online.html" },
      { org: "European Commission", title: "European Health Data Space Regulation (EHDS)", url: "https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en" },
      { org: "World Health Organization", title: "World Health Assembly endorses extension of the Global Digital Health Strategy to 2027 (23 May 2025)", url: "https://www.who.int/news/item/23-05-2025-world-health-assembly-endorses-extension-of-the-global-digital-health-strategy-to-2027" },
      { org: "NHS England", title: "Record numbers using NHS App to manage health (December 2025)", url: "https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/" },
    ],
  },
  {
    slug: "the-service-counter-moves-to-the-phone",
    date: "2026-11-13",
    icon: "smartphone",
    field: { en: "Mobile", fr: "Mobile", ar: "الهاتف المحمول" },
    title: {
      en: "The service counter is moving into the pocket",
      fr: "Le guichet passe dans la poche",
      ar: "شبّاك الخدمة ينتقل إلى الجيب",
    },
    lede: {
      en: "Six billion people are online, and the phone is the device they carry. An institution that serves only at a counter, or only on a desktop website, is missing the screen its public already holds. From now on, every Kogia system is designed with a mobile side.",
      fr: "Six milliards de personnes sont en ligne, et le téléphone est l'appareil qu'elles portent sur elles. Une institution qui ne sert qu'au guichet, ou seulement sur un site pour ordinateur, passe à côté de l'écran que son public tient déjà. Désormais, chaque système Kogia est conçu avec un côté mobile.",
      ar: "ستة مليارات إنسان متصلون بالإنترنت، والهاتف هو الجهاز الذي يحملونه. المؤسسة التي تخدم عند الشبّاك فقط، أو عبر موقع للحاسوب فقط، تفوّت الشاشة التي يمسك بها جمهورها فعلاً. من الآن فصاعداً، يُصمَّم كل نظام من Kogia بجانب خاص بالهاتف.",
    },
    figures: [
      {
        v: "74%",
        l: {
          en: "of the world's population used the Internet in 2025, about 6 billion people",
          fr: "de la population mondiale utilisait Internet en 2025, soit environ 6 milliards de personnes",
          ar: "من سكان العالم استخدموا الإنترنت في 2025، أي نحو 6 مليارات شخص",
        },
        src: "ITU, Facts and Figures 2025",
      },
      {
        v: "×2",
        l: {
          en: "mobile connections per inhabitant in Libya: 14.9 million for 7.48 million people",
          fr: "connexions mobiles par habitant en Libye : 14,9 millions pour 7,48 millions de personnes",
          ar: "اتصالان بالهاتف المحمول لكل نسمة في ليبيا: 14.9 مليون اتصال لـ7.48 مليون نسمة",
        },
        src: "DataReportal, Digital 2026: Libya",
      },
      {
        v: "378 M",
        l: {
          en: "mobile Internet users expected in the Middle East and North Africa by 2030, up from 308 million in 2024",
          fr: "utilisateurs de l'Internet mobile attendus au Moyen-Orient et en Afrique du Nord en 2030, contre 308 millions en 2024",
          ar: "مستخدماً للإنترنت عبر الهاتف متوقعاً في الشرق الأوسط وشمال أفريقيا بحلول 2030، مقابل 308 ملايين في 2024",
        },
        src: "GSMA, Mobile Economy MENA 2025",
      },
    ],
    sections: [
      {
        h: { en: "The phone is already there", fr: "Le téléphone est déjà là", ar: "الهاتف موجود بالفعل" },
        p: [
          {
            en: "The International Telecommunication Union estimates that 74% of the world's population used the Internet in 2025, about 6 billion people. The figure is 70% in the Arab States and 36% in Africa.",
            fr: "L'Union internationale des télécommunications estime que 74 % de la population mondiale utilisait Internet en 2025, soit environ 6 milliards de personnes. Le chiffre est de 70 % dans les États arabes et de 36 % en Afrique.",
            ar: "يقدّر الاتحاد الدولي للاتصالات أن 74% من سكان العالم استخدموا الإنترنت في 2025، أي نحو 6 مليارات شخص. وتبلغ النسبة 70% في الدول العربية و36% في أفريقيا.",
          },
          {
            en: "Libya shows how far the phone has travelled. At the end of 2025 the country counted 14.9 million active mobile connections for 7.48 million inhabitants, about two per person, and 6.62 million Internet users, 88.5% of the population. The public is connected. The question is what it can do with that connection.",
            fr: "La Libye montre le chemin parcouru par le téléphone. Fin 2025, le pays comptait 14,9 millions de connexions mobiles actives pour 7,48 millions d'habitants, soit environ deux par personne, et 6,62 millions d'internautes, 88,5 % de la population. Le public est connecté. La question est ce qu'il peut faire de cette connexion.",
            ar: "وتُظهر ليبيا المسافة التي قطعها الهاتف. بنهاية 2025 بلغ عدد اتصالات الهاتف المحمول النشطة في البلاد 14.9 مليون اتصال لـ7.48 مليون نسمة، أي نحو اتصالين لكل شخص، وبلغ عدد مستخدمي الإنترنت 6.62 مليون، أي 88.5% من السكان. الجمهور متصل. والسؤال هو ما الذي يستطيع فعله بهذا الاتصال.",
          },
        ],
      },
      {
        h: { en: "The gap is use, not coverage", fr: "L'écart est dans l'usage, pas dans la couverture", ar: "الفجوة في الاستخدام لا في التغطية" },
        p: [
          {
            en: "The GSMA counts 308 million mobile Internet users in the Middle East and North Africa in 2024 and expects 378 million by 2030. It also counts more than 340 million people who live under mobile broadband coverage and still do not use it.",
            fr: "La GSMA compte 308 millions d'utilisateurs de l'Internet mobile au Moyen-Orient et en Afrique du Nord en 2024 et en attend 378 millions en 2030. Elle compte aussi plus de 340 millions de personnes qui vivent sous couverture haut débit mobile sans l'utiliser.",
            ar: "تحصي رابطة GSMA 308 ملايين مستخدم للإنترنت عبر الهاتف في الشرق الأوسط وشمال أفريقيا في 2024 وتتوقع 378 مليوناً بحلول 2030. وتحصي أيضاً أكثر من 340 مليون شخص يعيشون ضمن تغطية النطاق العريض المتنقل ولا يستخدمونه.",
          },
          {
            en: "That second number is a design brief. An app for these markets must be light to download, work on a modest phone and a weak network, speak the user's language, and be useful from the first screen. An app that demands the latest phone and a perfect connection serves the people who needed it least.",
            fr: "Ce second chiffre est un cahier des charges. Une application pour ces marchés doit être légère à télécharger, fonctionner sur un téléphone modeste et un réseau faible, parler la langue de l'utilisateur et être utile dès le premier écran. Une application qui exige le dernier téléphone et une connexion parfaite sert ceux qui en avaient le moins besoin.",
            ar: "هذا الرقم الثاني هو في الحقيقة دفتر شروط للتصميم. التطبيق الموجَّه لهذه الأسواق يجب أن يكون خفيف التنزيل، وأن يعمل على هاتف متواضع وشبكة ضعيفة، وأن يتحدث لغة المستخدم، وأن يكون نافعاً من الشاشة الأولى. أما التطبيق الذي يشترط أحدث هاتف واتصالاً مثالياً فيخدم من كانوا أقل الناس حاجة إليه.",
          },
        ],
      },
      {
        h: { en: "What a mobile side changes for an institution", fr: "Ce qu'un côté mobile change pour une institution", ar: "ما الذي يغيّره جانب الهاتف في المؤسسة" },
        p: [
          {
            en: "For the public, it replaces a trip and a wait with a notification: your file is ready, your appointment is tomorrow at ten, your child was absent this morning, your result is available.",
            fr: "Pour le public, il remplace un déplacement et une attente par une notification : votre dossier est prêt, votre rendez-vous est demain à dix heures, votre enfant était absent ce matin, votre résultat est disponible.",
            ar: "للجمهور، يستبدل بالمشوار والانتظار إشعاراً: ملفك جاهز، موعدك غداً في العاشرة، طفلك غاب هذا الصباح، نتيجتك متاحة.",
          },
          {
            en: "For staff, it puts the work where the work happens. A technician closes an intervention on site. A teacher takes attendance in the classroom. A manager approves a request between two meetings. Nothing is typed again later at a desk.",
            fr: "Pour le personnel, il met le travail là où le travail se fait. Un technicien clôt une intervention sur place. Un enseignant fait l'appel en classe. Un responsable valide une demande entre deux réunions. Rien n'est ressaisi plus tard à un bureau.",
            ar: "للموظفين، يضع العمل حيث يجري العمل. الفني يغلق بلاغ الصيانة في الموقع. المعلم يسجّل الحضور داخل الفصل. المدير يعتمد طلباً بين اجتماعين. ولا شيء يُعاد إدخاله لاحقاً على المكتب.",
          },
          {
            en: "For management, the app is not a second system. It is another door into the same one, with the same roles, the same audit trail and the same data.",
            fr: "Pour la direction, l'application n'est pas un second système. C'est une autre porte vers le même, avec les mêmes rôles, le même journal d'audit et les mêmes données.",
            ar: "للإدارة، التطبيق ليس نظاماً ثانياً. هو باب آخر إلى النظام نفسه، بالأدوار نفسها وسجل التدقيق نفسه والبيانات نفسها.",
          },
        ],
      },
      {
        h: { en: "How we build it", fr: "Comment nous le construisons", ar: "كيف نبنيه" },
        p: [
          {
            en: "One codebase produces the Android app and the iPhone app, so an institution does not pay twice or wait twice. Arabic is laid out right to left for real, with French and English beside it. The app carries the institution's name and colours, and the data stays in the institution's system.",
            fr: "Une seule base de code produit l'application Android et l'application iPhone : l'institution ne paie pas deux fois et n'attend pas deux fois. L'arabe est réellement mis en page de droite à gauche, avec le français et l'anglais à ses côtés. L'application porte le nom et les couleurs de l'institution, et les données restent dans son système.",
            ar: "قاعدة برمجية واحدة تُنتج تطبيق أندرويد وتطبيق آيفون، فلا تدفع المؤسسة مرتين ولا تنتظر مرتين. العربية مصفوفة من اليمين إلى اليسار فعلاً، وإلى جانبها الفرنسية والإنجليزية. يحمل التطبيق اسم المؤسسة وألوانها، وتبقى البيانات في نظامها.",
          },
          {
            en: "We start with the few actions people repeat most, and we add the rest once the first ones are in use.",
            fr: "Nous commençons par les quelques gestes que les gens répètent le plus, et nous ajoutons le reste une fois les premiers adoptés.",
            ar: "نبدأ بالإجراءات القليلة التي يكررها الناس أكثر من غيرها، ونضيف الباقي بعد أن يُستخدم الأول فعلاً.",
          },
        ],
      },
    ],
    build: {
      text: {
        en: "Mobile apps are announced and in preparation. They rest on what already runs in our products today: sign-in, roles, three languages and the audit trail.",
        fr: "Les applications mobiles sont annoncées et en préparation. Elles reposent sur ce qui fonctionne déjà dans nos produits : connexion, rôles, trois langues et journal d'audit.",
        ar: "تطبيقات الهاتف معلَنة وقيد الإعداد. وهي تقوم على ما يعمل فعلاً في منتجاتنا اليوم: تسجيل الدخول والأدوار واللغات الثلاث وسجل التدقيق.",
      },
      points: [
        { en: "An app for the public: citizens, patients, parents", fr: "Une application pour le public : citoyens, patients, parents", ar: "تطبيق للجمهور: مواطنون ومرضى وأولياء أمور" },
        { en: "An app for staff, with the same roles as the web system", fr: "Une application pour le personnel, avec les mêmes rôles que le système web", ar: "تطبيق للموظفين بالأدوار نفسها التي في نظام الويب" },
        { en: "Notifications in place of phone calls and paper notices", fr: "Des notifications à la place des appels et des avis papier", ar: "إشعارات بدلاً من الاتصالات الهاتفية والإخطارات الورقية" },
        { en: "Android and iPhone, in Arabic, French and English", fr: "Android et iPhone, en arabe, français et anglais", ar: "أندرويد وآيفون، بالعربية والفرنسية والإنجليزية" },
        { en: "Light enough for modest phones and weak networks", fr: "Assez légère pour les téléphones modestes et les réseaux faibles", ar: "خفيف بما يكفي للهواتف المتواضعة والشبكات الضعيفة" },
      ],
      href: "/capabilities",
      label: { en: "See our capabilities", fr: "Voir notre savoir-faire", ar: "اطّلع على قدراتنا" },
    },
    sources: [
      { org: "International Telecommunication Union", title: "Measuring digital development: Facts and Figures 2025, Internet use", url: "https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-use" },
      { org: "DataReportal", title: "Digital 2026: Libya (8 November 2025)", url: "https://datareportal.com/reports/digital-2026-libya" },
      { org: "GSMA", title: "GSMA MWC25 Doha highlights MENA's rising global role in digital transformation, Mobile Economy MENA 2025 (25 November 2025)", url: "https://www.gsma.com/newsroom/press-release/gsma-mwc25-doha-highlights-menas-rising-global-role-in-digital-transformation/" },
    ],
  },
];

export const insight = (slug: string) => INSIGHTS.find((i) => i.slug === slug);

const DATE_LOCALE = { en: "en-GB", fr: "fr-FR", ar: "ar-u-nu-latn" } as const;
/** "13 November 2026", in the reader's language, with Latin digits in Arabic. */
export function insightDate(iso: string, lang: keyof typeof DATE_LOCALE) {
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
