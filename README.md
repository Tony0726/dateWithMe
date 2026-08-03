# 答应我嘛 💕 —— 约会邀请页面

一个给女朋友的可爱约会邀请页面：点「拒绝」会一直弹出各种卖萌的台词，拒绝按钮还会越变越小、最后到处跑，总之**无法拒绝**。点「好呀好呀」之后，让她选约会项目和吃什么，最后把安排发到指定邮箱。

## ✨ 功能

- 💝 粉色可爱风 + 漂浮爱心动画
- 😝 「拒绝」按钮：每点一次换一句台词，越点越小，还会开始逃跑
- 🎯 约会项目、吃什么：可选一个或多个
- 💌 一键发送约会安排到指定邮箱
- 📱 手机 / 电脑都适配

## 🚀 在线预览

部署完成后访问：<https://tony0726.github.io/dateWithMe/>

## 🖥️ 本地预览

```bash
# 在项目目录下启动一个静态服务器
python3 -m http.server 8080
# 然后浏览器打开 http://localhost:8080
```

## 📧 邮件配置

页面默认使用 **系统邮件客户端** 发送（点发送会唤起邮件应用，自动填好收件人 / 主题 / 正文），开箱即用，适合先体验。

但更推荐用 **EmailJS** 静默发信，女朋友在手机上点一下就能直接发，不需要跳出邮件应用。配置步骤如下：

### 1. 注册 EmailJS（免费）

打开 <https://www.emailjs.com> → Sign Up（支持用 QQ 邮箱 / Gmail 注册）。

### 2. 添加邮件服务（Service）

在 EmailJS 后台 **Email Services** → **Add New Service**：

- 想用 QQ 邮箱发信：选择 **QQ Mail**，或选 **SMTP** 自定义
- 如果用 QQ 邮箱做发件账户，需要先在 QQ 邮箱里开启 SMTP 并拿到**授权码**：
  QQ 邮箱 → 设置 → 账户 → 开启「POP3/SMTP 服务」→ 生成授权码（不是 QQ 密码）
- 创建完成后记下 **Service ID**

### 3. 创建邮件模板（Template）

**Email Templates** → **Create New Template**，内容可参考：

```
Subject: 💌 约会安排，请查收～
Content:
亲爱的宝贝：

谢谢答应和我约会！这是我们说好的安排：

🏃 约会项目：{{activities}}
🍽️ 吃什么：{{foods}}

期待和你共度美好的时光！
爱你的 {{from_name}} 💕
```

记下 **Template ID**。

### 4. 填进配置

打开 [`js/config.js`](js/config.js)，改成：

```js
const EMAIL_CONFIG = {
  enabled: true,
  serviceId: '你的 Service ID',
  templateId: '你的 Template ID',
  publicKey: '你的 Public Key',   // EmailJS 后台 Account → 里能看到
  toEmail: 'tony980726@qq.com',
  fromName: '你的名字'
};
```

改完重新推送代码即可生效。

## 🎨 自定义

所有文案和选项都在配置里，改完即生效：

- **收件邮箱 / 发件署名** → [`js/config.js`](js/config.js) 里的 `EMAIL_CONFIG`
- **约会项目、吃什么选项** → 同一个文件里的 `ACTIVITY_OPTIONS` / `FOOD_OPTIONS`
- **拒绝按钮台词** → [`js/main.js`](js/main.js) 顶部的 `NO_PHRASES`
- **页面标题、问题、按钮文字** → [`index.html`](index.html)

## ☁️ 部署到 GitHub Pages

前提：已安装 [GitHub CLI](https://cli.github.com/) 并登录（`gh auth login`）。

```bash
git init
git add -A
git commit -m "约会邀请页面 💕"
gh repo create dateWithMe --public --source=. --push
gh api --method POST repos/tony0726/dateWithMe/pages \
  -f "source[branch]=main" -f "source[path]=/"
```

等待约 1 分钟后访问：<https://tony0726.github.io/dateWithMe/>

> 也可以直接在仓库 **Settings → Pages** 里把 Source 设为 `main` 分支的 `/` 目录。

## 📄 License

[MIT](LICENSE) · Made with 💕
