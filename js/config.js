/* ============================================================
 *   配置文件 —— 想改什么都在这里改
 *   详细说明见项目根目录的 README.md
 * ============================================================ */

/* ------------------------------------------------------------
 * 邮件发送（EmailJS）
 *   enabled = false 时：点击发送会调用系统邮件客户端（mailto），
 *                       并自动填好收件人、主题和正文，马上就能用。
 *   enabled = true 时：通过 EmailJS 静默发信，需要先按 README
 *                       里的「邮件配置」步骤完成设置。
 * ------------------------------------------------------------ */
const EMAIL_CONFIG = {
  enabled: false,                 // true = 用 EmailJS 发送；false = 调用系统邮件客户端
  serviceId: 'YOUR_SERVICE_ID',   // EmailJS 服务 ID（Service ID）
  templateId: 'YOUR_TEMPLATE_ID', // EmailJS 模板 ID（Template ID）
  publicKey: 'YOUR_PUBLIC_KEY',   // EmailJS 公钥（Public Key）
  toEmail: 'tony980726@qq.com',   // 接收邮件的邮箱（改成你女朋友的邮箱）
  fromName: '你的男朋友'           // 邮件里的发件人署名，改成你的名字
};

/* ------------------------------------------------------------
 * 约会项目选项（阶段二）
 * 想增删就改这个数组：emoji 是图标，label 是文字
 * ------------------------------------------------------------ */
const ACTIVITY_OPTIONS = [
  { emoji: '🎬', label: '看电影' },
  { emoji: '🌳', label: '逛公园' },
  { emoji: '🍽️', label: '吃大餐' },
  { emoji: '🎡', label: '游乐园' },
  { emoji: '🌊', label: '海边散步' },
  { emoji: '⛰️', label: '爬山' },
  { emoji: '☕', label: '喝咖啡' },
  { emoji: '🎨', label: '逛展馆' },
  { emoji: '🛍️', label: '逛街' },
  { emoji: '🍳', label: '一起做饭' },
  { emoji: '🎤', label: '唱 K' },
  { emoji: '🎮', label: '打游戏' }
];

/* ------------------------------------------------------------
 * 吃什么选项（阶段三）
 * ------------------------------------------------------------ */
const FOOD_OPTIONS = [
  { emoji: '🍲', label: '火锅' },
  { emoji: '🍣', label: '日料' },
  { emoji: '🍢', label: '烧烤' },
  { emoji: '🥩', label: '牛排' },
  { emoji: '🌶️', label: '川菜' },
  { emoji: '🍜', label: '泰餐' },
  { emoji: '🍕', label: '披萨' },
  { emoji: '🥟', label: '饺子' },
  { emoji: '🍰', label: '甜品' },
  { emoji: '🧋', label: '奶茶' },
  { emoji: '🍧', label: '冰激凌' },
  { emoji: '🥘', label: '麻辣烫' }
];
