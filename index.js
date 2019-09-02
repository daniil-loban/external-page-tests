const puppeteer = require('puppeteer');
const tests = require('./tests.js').tests;

const formatResults = (pageUrl, results) => {
  const PASSES = 1;
  const FAILURES = 2;
  const DURATION = 3;
  let result = null;
  const short_result = results.match(/passes: (\d+)\nfailures: (\d+)\nduration: (.+)\n/)
  if (short_result) {
    result = {
      url: pageUrl,
      passes: short_result[ PASSES ],
      failures:short_result[ FAILURES ],
      duration: short_result[ DURATION ]
    }
    if (short_result[ FAILURES ] !== '0'){
      const assertionErrors = results.match(/(should .*) ‣\nAssertionError/g)
      const details = (assertionErrors || []).map(info => info.replace(' ‣\nAssertionError',''));
      result = {...result, details}
    }
  }
  return result;
}

const closeBrowserByException = async(browser, pageUrl, errorNumber) => {
  await browser.close();
  let result = {url: pageUrl};
  switch (errorNumber) {
    case 404: 
      result = {...result, error: 'Page Not Found'};
      break;
    case 523:  
    default:  
      result = {...result, error: 'Origin Is Unreachable'};
      break;
  }
  return result;
}

const runTests = async(pageUrl, spec) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  let openError = false;
  await page.goto(pageUrl).catch(error => { openError = error.message });
  if (openError) return(closeBrowserByException(browser, pageUrl, 523));

  let error404 = false;
  await page.addScriptTag({url: 'https://unpkg.com/chai@4.1.2/chai.js'}).catch(e => error404 |= e );
  await page.addScriptTag({url: 'https://unpkg.com/mocha@4.0.1/mocha.js'}).catch(e => error404 |= e);
  await page.addScriptTag({content: `;var prepareSpec = ${spec};`}).catch(e => error404 |= e);
  if (error404) return(closeBrowserByException(browser, pageUrl, 404));

  await page.evaluate(async() => {
    const body = document.querySelector('body');
    const mocha_div = document.createElement('div')
    mocha_div.setAttribute('id', 'mocha');
    body.appendChild(mocha_div);
    mocha.setup('bdd');
    await prepareSpec()
    await mocha.run()
  })
  const report = await page.$eval('#mocha', e => e.innerText);
  await browser.close();
  return formatResults(pageUrl, report)
}

