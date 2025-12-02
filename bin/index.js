#!/usr/bin/env node
const { program } = require('commander')
const chalk = require('chalk')

program
  .option('-v, --version', 'show version')
  .option('-g, --github', 'open github')
  .option('-b, --blog', 'open blog')
  .option('-e, --email', 'display email')
  .option('-r, --resume', 'open resume')
  .option('-p, --portfolio', 'open portfolio')
  .parse(process.argv)

const options = program.opts()

if (options.version) {
  console.log('v1.0.10, 2025.12.01')
  process.exit(0)
}

const links = {
  github: { url: 'https://github.com/neogul02', label: chalk.blueBright('GitHub:') },
  blog: { url: 'https://neogul02.tistory.com', label: chalk.hex('#FF8800')('Blog:') },
  email: { url: 'wlsgud2414@naver.com', label: chalk.greenBright('E-mail:') },
  resume: { url: 'https://www.figma.com/design/WBaXINRDszR2CRStJTHpbI/choejinhyeong_resume?node-id=1-341&t=CszlNUeDoUGMCl6u-1', label: chalk.redBright('Resume:') },
  portfolio: { url: 'https://choe-jinhyeong.vercel.app', label: chalk.cyanBright('Portfolio:') },
}

async function openLink(url) {
  const open = (await import('open')).default
  open(url)
}

if (Object.keys(options).length === 0) {
  console.log(`
안녕하세요! 프론트엔드 개발자 최진형입니다.

${links.github.label} ${links.github.url}
${links.blog.label} ${links.blog.url}
${links.email.label} ${links.email.url}
${links.resume.label} ${links.resume.url}
${links.portfolio.label} ${links.portfolio.url}

더 많은 정보는 --help를 통해 확인해주세요.
  `)
} else {
  ;(async () => {
    for (const key in options) {
      if (links[key]) {
        if (key === 'email') {
          console.log(`${links.email.label} wlsgud2414@naver.com`)
          await openLink(links.email.url)
        } else {
          console.log(`${links[key].label} ${links[key].url}`)
          await openLink(links[key].url)
        }
      }
    }
  })()
}
