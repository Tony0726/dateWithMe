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

页面通过 **FormSubmit** 静默发送邮件（**免注册**），女朋友在手机上点一下「发送」就直接发出，不会跳出页面，也不需要任何密钥。

发送目标在 [`js/config.js`](js/config.js) 里的 `EMAIL_CONFIG.toEmail`，默认为 `tony980726@qq.com`。

> ⚠️ **第一次发送需要激活一次**：第一次有人点击「发送」时，FormSubmit 会先往目标邮箱发一封确认邮件。
> 打开邮箱，点一下邮件里的 **激活链接** 即可永久生效。之后所有发送都会直接到达，无需再操作。

发送逻辑在 [`js/main.js`](js/main.js) 的 `sendEmail` 函数里，如需改用 EmailJS 等其他方案也可以在那里替换。

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
