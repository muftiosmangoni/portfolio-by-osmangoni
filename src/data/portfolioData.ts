import osmanPortrait from '../assets/images/osman_goni_hero_1789385528897.jpg';
import portfolioCoverDark from '../assets/images/portfolio_cover_dark_1789385554693.jpg';
import videoShowreelCover from '../assets/images/video_editor_showreel_1789385576194.jpg';
import graphicPenDesign from '../assets/images/graphic_pen_design_1789386849535.jpg';
import spiderTypoPoster from '../assets/images/spider_typo_poster_1789386869506.jpg';
import neonLimePortfolio from '../assets/images/neon_lime_portfolio_1789386886805.jpg';
import uiMotionThumb from '../assets/images/ui_motion_final_1789377327480.jpg';
import sbmcPromoThumb from '../assets/images/sbmc_promo_1789377349408.jpg';
import nashrusSirahThumb from '../assets/images/nashrus_sirah_1789377374181.jpg';
import { ProjectItem, SkillCategory, EducationItem, ContactInfo } from '../types';

export const PERSONAL_INFO = {
  name: "Osman Goni",
  firstName: "OSMAN",
  lastName: "GONI",
  role: "VISUALIZER & VIDEO EDITOR",
  taglineIntro: "Osman",
  taglineHighlight: "Goni",
  badges: ["CREATIVE VISUALIZER", "VIDEO EDITOR"],
  portraitUrl: osmanPortrait,
  bio: "Creative Visualizer, Video Editor & Graphic Designer with expertise in Islamic media, visual storytelling, cinematic motion design, and high-impact digital graphics.",
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Video Editor & Graphic Designer Showreel",
    category: "video",
    tag: "Showreel",
    duration: "1:15",
    thumbnail: videoShowreelCover,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    aspectRatio: "16:9",
    description: "Signature video editing and dynamic motion graphics showreel featuring punchy typography and cinematic pacing.",
    tools: ["Premiere Pro", "After Effects", "Sound Design"],
    clientOrOrg: "Osman Goni Showreel",
  },
  {
    id: "proj-2",
    title: "UI Motion Final",
    category: "video",
    tag: "Motion",
    duration: "0:45",
    thumbnail: uiMotionThumb,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    aspectRatio: "16:9",
    description: "Interactive UI & motion graphic animation exploring modern visual interfaces and dynamic transitions.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    clientOrOrg: "Creative Showcase",
  },
  {
    id: "proj-3",
    title: "SBMC Final Promo 2",
    category: "video",
    tag: "Promo",
    duration: "1:15",
    thumbnail: sbmcPromoThumb,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    aspectRatio: "16:9",
    description: "High-impact promotional campaign video crafted for As-Sunnah Skill Development Institute's SBMC program.",
    tools: ["Premiere Pro", "After Effects", "Sound Design"],
    clientOrOrg: "As-Sunnah Skill Development Institute",
  },
  {
    id: "proj-4",
    title: "Nashrus Sirah Registration Promo",
    category: "video",
    tag: "Promo",
    duration: "1:30",
    thumbnail: nashrusSirahThumb,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    aspectRatio: "16:9",
    description: "Registration trailer and promotional video for the prestigious Nashrus Sirah Islamic conference.",
    tools: ["Premiere Pro", "After Effects", "Audition"],
    clientOrOrg: "Nashrus Sirah Conference",
  },
  {
    id: "proj-5",
    title: "Viral Kinetic Typography Reel",
    category: "video",
    tag: "Reel",
    duration: "0:30",
    thumbnail: portfolioCoverDark,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    aspectRatio: "9:16",
    description: "Punchy, fast-paced kinetic typography and sound design engineered for high retention across social media.",
    tools: ["Premiere Pro", "After Effects", "CapCut Pro"],
    clientOrOrg: "Social Media Campaign",
  },
  {
    id: "proj-6",
    title: "Short Documentary: Journey of Faith",
    category: "video",
    tag: "Documentary",
    duration: "3:20",
    thumbnail: videoShowreelCover,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    aspectRatio: "16:9",
    description: "Evocative documentary blending archival footage, soulful voiceovers, and gentle rhythmic sound design.",
    tools: ["Premiere Pro", "Audition", "Photoshop"],
    clientOrOrg: "Documentary Series",
  },
  // Graphic Design projects (13 projects)
  {
    id: "proj-g1",
    title: "Creative UI/UX & Graphic Portfolio Cover",
    category: "graphics",
    tag: "Branding",
    thumbnail: portfolioCoverDark,
    description: "Modern minimalist dark aesthetic portfolio presentation cover with bold dimensional typography.",
    tools: ["Photoshop", "Illustrator"],
    clientOrOrg: "Personal Branding",
  },
  {
    id: "proj-g2",
    title: "Graphic Design Showcase: Pen Nib Art",
    category: "graphics",
    tag: "Brand Identity",
    thumbnail: graphicPenDesign,
    description: "Signature graphic design banner on deep black background featuring elegant typography with stylized golden fountain pen nib emblem.",
    tools: ["Illustrator", "Photoshop"],
    clientOrOrg: "Identity Design",
  },
  {
    id: "proj-g3",
    title: "PORTFOLIO 2026: Creative Typography Poster",
    category: "graphics",
    tag: "Poster Design",
    thumbnail: spiderTypoPoster,
    description: "Creative display typography artwork featuring hanging figure silhouette, modern grid alignment, and 3D design software icons.",
    tools: ["Photoshop", "Illustrator", "Figma"],
    clientOrOrg: "Creative Typography",
  },
  {
    id: "proj-g4",
    title: "PORTFOLIO 2026: Textured Neon Green",
    category: "graphics",
    tag: "Branding",
    thumbnail: neonLimePortfolio,
    description: "Textured high-contrast artwork featuring block typography in clean white and vibrant neon lime green on dark spray background.",
    tools: ["Photoshop", "Illustrator"],
    clientOrOrg: "Branding Showcase",
  },
  {
    id: "proj-g5",
    title: "Video Editor & Graphic Designer Showcase Banner",
    category: "graphics",
    tag: "Showcase",
    thumbnail: videoShowreelCover,
    description: "Textured dark banner with glowing neon cyan accents and modern typography for creative showcase.",
    tools: ["Photoshop", "Illustrator"],
    clientOrOrg: "Portfolio Series",
  },
  {
    id: "proj-g6",
    title: "Tech Conference Typography Poster",
    category: "graphics",
    tag: "Poster",
    thumbnail: portfolioCoverDark,
    description: "Modern swiss typography poster celebrating visual creativity and technological innovation.",
    tools: ["Illustrator", "Photoshop"],
    clientOrOrg: "Creative Hub",
  },
  {
    id: "proj-g7",
    title: "Course Enrollment Banner Suite",
    category: "graphics",
    tag: "Marketing",
    thumbnail: sbmcPromoThumb,
    description: "Responsive banner advertisements optimized for display campaigns, website heroes, and social headers.",
    tools: ["Photoshop", "Canva Pro"],
    clientOrOrg: "SBMC Institute",
  },
  {
    id: "proj-g8",
    title: "YouTube Masterclass Thumbnail Pack",
    category: "graphics",
    tag: "Thumbnails",
    thumbnail: videoShowreelCover,
    description: "High Click-Through-Rate YouTube thumbnail designs with striking emotional focal points and readable fonts.",
    tools: ["Photoshop", "Lightroom"],
    clientOrOrg: "YouTube Creator Studio",
  },
  {
    id: "proj-g9",
    title: "Modern Minimalist Product Packaging",
    category: "graphics",
    tag: "Packaging",
    thumbnail: portfolioCoverDark,
    description: "Clean, sustainable packaging mockup and dieline design for premium organic lifestyle goods.",
    tools: ["Illustrator", "Photoshop 3D"],
    clientOrOrg: "Lifestyle Brand",
  },
  {
    id: "proj-g10",
    title: "Corporate Annual Report Visualizer",
    category: "graphics",
    tag: "Editorial",
    thumbnail: uiMotionThumb,
    description: "Sophisticated data visualization charts, clean editorial grid layouts, and infographic spreads.",
    tools: ["InDesign", "Illustrator"],
    clientOrOrg: "Corporate Client",
  },
  {
    id: "proj-g11",
    title: "Islamic Calligraphy Modern Wall Art",
    category: "graphics",
    tag: "Visual Art",
    thumbnail: nashrusSirahThumb,
    description: "Contemporary digital art canvas combining Thuluth calligraphy with abstract acrylic texture overlays.",
    tools: ["Photoshop", "Procreate"],
    clientOrOrg: "Art Gallery",
  },
  {
    id: "proj-g12",
    title: "SBMC Alumni Certificate Design",
    category: "graphics",
    tag: "Print",
    thumbnail: sbmcPromoThumb,
    description: "Official graduate certificate of completion featuring anti-counterfeit guilloche borders and gold foil accents.",
    tools: ["Illustrator", "InDesign"],
    clientOrOrg: "As-Sunnah Institute",
  },
  {
    id: "proj-g13",
    title: "Brand Style Guide & Color System",
    category: "graphics",
    tag: "Brand Strategy",
    thumbnail: portfolioCoverDark,
    description: "Comprehensive 24-page brand guidelines documentation detailing typography, spacing, and brand voice.",
    tools: ["Illustrator", "Figma"],
    clientOrOrg: "Identity Project",
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: "video-editing",
    title: "VIDEO EDITING",
    icon: "video",
    description: "Professional editing, storytelling, motion graphics & post-production.",
    tools: ["Premiere Pro", "After Effects"]
  },
  {
    id: "graphic-design",
    title: "GRAPHIC DESIGN",
    icon: "palette",
    description: "Creative visual design, branding, social media & promotional materials.",
    tools: ["Photoshop", "Illustrator", "Canva Pro"]
  },
  {
    id: "creative-visualization",
    title: "CREATIVE VISUALIZATION",
    icon: "eye",
    description: "Concept development, visual storytelling & information visualization."
  },
  {
    id: "script-writing",
    title: "SCRIPT WRITING",
    icon: "file-text",
    description: "Video scripts, promotional content, storytelling & voice-over scripts."
  },
  {
    id: "public-speaking",
    title: "PUBLIC SPEAKING",
    icon: "mic",
    description: "Presentation, audience engagement & effective communication."
  },
  {
    id: "leadership",
    title: "LEADERSHIP",
    icon: "users",
    description: "Team coordination, creative direction & project execution."
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    title: "At-Takhassus Fil Ifta",
    year: "2026",
    degreeOrType: "Higher Specialization",
    institution: "Higher Islamic Jurisprudence",
    description: "Advanced post-graduate specialization in Islamic Jurisprudence, Fiqh analysis, and issuing legal verdicts (Ifta).",
    status: "Completed 2026",
    statusColor: "emerald",
    icon: "award"
  },
  {
    id: "edu-2",
    title: "Dawra-e Hadith (Masters Equivalent)",
    year: "2025",
    degreeOrType: "Post-Graduate Equivalent",
    institution: "Qawmi Madrasah Curriculum",
    description: "Highest academic degree in Islamic Studies, Sihah Sitta Hadith literature, and comprehensive Arabic scholarly texts.",
    status: "Completed (2025)",
    statusColor: "emerald",
    icon: "book"
  }
];

export const TRAINING_INSTITUTE = {
  institution: "As-Sunnah Skill Development Institute",
  tag: "SKILL TRAINING INSTITUTION",
  course: "SBMC (Small Business Management Course)",
  batch: "Batch 36",
  competencies: [
    {
      title: "Video Editing",
      tools: "Premiere Pro & After Effects"
    },
    {
      title: "Graphic Design",
      tools: "Photoshop, Illustrator & Canva Pro"
    },
    {
      title: "Meta Marketing",
      tools: "Facebook & Instagram Ads Strategy"
    },
    {
      title: "Generative AI Tools",
      tools: "Prompt Engineering, AI Visuals & Workflows"
    }
  ],
  footerLeft: "Hands-on Real Project Execution",
  footerRight: "Industry Ready"
};

export const CONTACT_DATA: ContactInfo = {
  email: "mmosmangoni112@gmail.com",
  phone: "01410401898",
  whatsapp: "01410401898",
  facebook: "https://www.facebook.com/profile.php?id=61583917135821",
  instagram: "https://www.instagram.com/mm.osmangoni/",
  address: "Dhaka, Bangladesh",
  responseRate: "Within 2 Hours",
  availability: "Available for Projects"
};

