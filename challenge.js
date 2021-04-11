const pup = require("puppeteer");
// let id = "yaxigas201@art2427.com";
// let pass = "4546#Harshu";
// let challenge = require("./pepchallenge");


async function main(){
    let browser = await pup.launch({
        headless : false,
        defaultViewport : false,
        args : ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("htpps://global-download.acer.com/GDFiles/Driver/Wireless LAN/Wireless LAN_Atheros_12.0.0.929_W10x64_A.zip?acerid=637395375352650932&Step1=NOTEBOOK&Step2=ASPIRE&Step3=ASPIRE A715-41G&OS=ALL&LC=en&BC=ACER&SC=AAP_2");
//     await tab.type("#input-1", id);
//     await tab.type("#input-2", pass);
//     await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
//     await tab.waitForNavigation({waitUntil : "networkidle2"});
//     await tab.click(".dropdown-handle.nav_link.toggle-wrap");
//     await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
//     await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible : true});
//     let link = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li"); 
//     await link[1].click();
//     await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible : true});
//     let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
//     let createChallengeUrl = await tab.evaluate(function(ele){
//         return ele.getAttribute("href");
//     },createChallengeButton);
//     for(let  i =0; i<challenge.length; i++){   
//         createChallenge(createChallengeUrl , challenge[i], await browser.newPage());
//     }
}

// async function createChallenge(createChallengeUrl , challenge, tab){  
//     await tab.goto("https://www.hackerrank.com"+createChallengeUrl);
    
//     await tab.waitForSelector("#name" , {visible: true});
//     await tab.type("#name", challenge["Challenge Name"]);

//     await tab.waitForSelector("#preview" , {visible: true});
//     await tab.type("#preview", challenge["Description"]);

//     await tab.waitForSelector("#problem_statement-container .CodeMirror textarea" , {visible: true});
//     await tab.type("#problem_statement-container .CodeMirror textarea", challenge["Problem Statement"]);


//     await tab.type("#input_format-container .CodeMirror textarea", challenge["Input Format"]);
//     await tab.type("#constraints-container .CodeMirror textarea", challenge["Constraints"]);
//     await tab.type("#output_format-container .CodeMirror textarea", challenge["Output Format"]);
//     await tab.type("#tags_tag", challenge["Tags"]);
//     await tab.keyboard.press("Enter");

//     await tab.click(".save-challenge.btn.btn-green");

//     // await tab.waitForSelector(".preview-challenge.btn.msR");
    
// }

main();