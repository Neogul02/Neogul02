#!/usr/bin/env node
const { program } = require('commander')
const chalk = require('chalk')
const pkg = require('../package.json')

program
  .option('-v, --version', 'show version')
  .option('-g, --github', 'open github')
  .option('-b, --blog', 'open blog')
  .option('-e, --email', 'display email')
  .option('-p, --portfolio', 'open portfolio (resume)')
  .option('-r, --resume', 'open resume (same as --portfolio)')
  .option('-c, --choichoi', 'open choichoi - PopupStore POS & ERP')
  .option('-t, --todolight', 'open todolight - Team ToDo & Calendar')
  .parse(process.argv)

const options = program.opts()

if (options.version) {
  console.log(`v${pkg.version}`)
  process.exit(0)
}

const PORTFOLIO_URL =
  'https://www.figma.com/design/WBaXINRDszR2CRStJTHpbI/choejinhyeong_resume?node-id=1-341&t=CszlNUeDoUGMCl6u-1'

const links = {
  github: { url: 'https://github.com/neogul02', label: chalk.blueBright('GitHub:') },
  blog: { url: 'https://neogul02.tistory.com', label: chalk.hex('#FF8800')('Blog:') },
  email: { url: 'mailto:wlsgud2414@naver.com', label: chalk.greenBright('E-mail:') },
  portfolio: { url: PORTFOLIO_URL, label: chalk.redBright('Portfolio:') },
  resume: { url: PORTFOLIO_URL, label: chalk.redBright('Resume:') },
  choichoi: { url: 'https://choichoi.app', label: chalk.magentaBright('choichoi:') },
  todolight: { url: 'https://todolight.vercel.app', label: chalk.cyanBright('todolight:') },
}

async function openLink(url) {
  const open = (await import('open')).default
  open(url)
}

if (Object.keys(options).length === 0) {
  console.log(`
안녕하세요! 최진형입니다.

${links.github.label} ${links.github.url}
${links.blog.label} ${links.blog.url}
${chalk.greenBright('E-mail:')} wlsgud2414@naver.com
${links.portfolio.label} ${PORTFOLIO_URL}

${chalk.bold('Projects')}
  ${links.choichoi.label} ${links.choichoi.url}  ${chalk.dim('PopupStore POS & ERP')}
  ${links.todolight.label} ${links.todolight.url}  ${chalk.dim('Team ToDo & Calendar')}

더 많은 정보는 --help를 통해 확인해주세요.
  `)
} else {
  ;(async () => {
    for (const key in options) {
      if (!links[key]) continue
      if (key === 'email') {
        console.log(`${links.email.label} wlsgud2414@naver.com`)
      } else {
        console.log(`${links[key].label} ${links[key].url}`)
      }
      await openLink(links[key].url)
    }
  })()
}
