const pup = require("puppeteer");
let id = //your id
let pass = // your pass
let challenge = require("./pepchallenge");
let data = {"First": "harshitp175",
            "Second" : "Harshit1",
            "Third" : "Harshit3"};


async function main(){
    let browser = await pup.launch({
        headless : false,
        defaultViewport : false,
        args : ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil : "networkidle2"});
    await tab.click(".dropdown-handle.nav_link.toggle-wrap");
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible : true});
    let link = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await link[1].click();
    await tab.waitForSelector(".backbone.block-center", {visible : true});
    let temp_challenge_link = await tab.$$(".backbone.block-center");
    console.log(temp_challenge_link.length);

    for(let i=0; i<temp_challenge_link.length; i++){
        let challengelink = await tab.evaluate(function(ele){
            return ele.getAttribute("href");
        },temp_challenge_link[i]);
        
        addModerator("https://www.hackerrank.com"+challengelink, await browser.newPage());
        
    }
}
async function addModerator(url , tab){
    await tab.goto(url);
    
    await tab.waitForSelector("li[data-tab='moderators']", {visible: true});
    await tab.click("li[data-tab='moderators']");
    
    if (await tab.$("#cancelBtn") !== null){
        await tab.waitForSelector("#cancelBtn", {visible: true});
        await tab.click("#cancelBtn");
    }
    
    await tab.waitForSelector("#moderator", {visible : true});

    await tab.type("#moderator", data["First"]);
    await tab.keyboard.press("Enter");
    await tab.type("#moderator", data["Second"]);
    await tab.keyboard.press("Enter");
    await tab.type("#moderator", data["Third"]);
    await tab.keyboard.press("Enter");
}

main();
