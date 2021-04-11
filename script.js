const pup = require("puppeteer");
let id = //yorr id 
let pass = //your pass

let browserPromise = pup.launch({
    headless: false,
    defaultViewport : false
});
let tab;
browserPromise.then(function(browser){
    let pagepromise= browser.pages();
    return pagepromise;

}).then(function(pages){
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    return pageOpenPromise;

}).then(function(){
    let idPromise = tab.type("#input-1", id);
    return idPromise;

}).then(function(){
    let passPromise = tab.type("#input-2", pass);
    return passPromise;

}).then(function(){
    let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;

}).then(function(){
    let waitPromise = tab.waitForSelector("#base-card-1-link", {visible : true});
    return waitPromise;

}).then(function(){
    let ipClickPromise = tab.click("#base-card-1-link" );
    return ipClickPromise;

}).then(function(){
    let waitPromise2 = tab.waitForSelector("a[data-attr1='warmup']" , {visible : true});
    return waitPromise2;

}).then(function(){
    let warmUpPromise = tab.click("a[data-attr1='warmup']");
    return warmUpPromise;

}).then(function(){
    let waitPromise3 = tab.waitForSelector(".js-track-click.challenge-list-item", {visible : true});
    return waitPromise3;

}).then(function(){
    let solveAddUrlPromise = tab.$$(".js-track-click.challenge-list-item");
    return solveAddUrlPromise;

}).then(function(data){
    let urlPromise = [];
    for(let i=0; i<data.length; i++){
        let fetchUrl = tab.evaluate(function(ele){
           return ele.getAttribute('href');
        },data[i]);
        urlPromise.push(fetchUrl);
    }
    return Promise.all(urlPromise);

}).then(function(data){
    let solvePromise = solveProblem("https://www.hackerrank.com" + data[0]);
    for(let i=1; i<data.length; i++){
        solvePromise = solvePromise.then(function(){
            return solveProblem("https://www.hackerrank.com" + data[i]);
        })
    }

}).catch(function(err){
    console.log("error occured");
});

function solveProblem(url){
    let problemUrl = url;
    let editorial = url.replace("?" , "/editorial?");
    
    return new Promise(function(resolve, reject){
        tab.goto(editorial).then(function(){
            let languagePromise =  tab.$$(".hackdown-content h3");
            return languagePromise;
        }).then(function(data){
            let languagePromise = [];
            for(let i of data){
                let languagesPromise = tab.evaluate(function(ele){
                    return ele.textContent;
                },i);
                languagePromise.push(languagesPromise);
            }
            return Promise.all(languagePromise);

        }).then(function(data){
            // console.log(data.length);
            for(let i in data){
                if(data[i] == "C++"){
                    let finalAnsPromise = tab.$$(".highlight").then(function(answer){
                        let answerPromise = tab.evaluate(function(ele){
                            return ele.textContent;
                        },answer[i]);
                        return answerPromise;
                    });
                    return finalAnsPromise;
                }
            }
        }).then(function(data){
            return tab.goto(problemUrl).then(function(){
                let checkboxWaitPromise = tab.waitForSelector(".custom-input-checkbox" , {visible : true});
                return checkboxWaitPromise;
            }).then(function(){
                let checkboxclickPromise = tab.click(".custom-input-checkbox");
                return checkboxclickPromise;
            }).then(function(){
                let answerTypePromise = tab.type(".custominput" , data);
                return answerTypePromise;
            }).then(function(){
                let controlDownPromise = tab.keyboard.down("Control");
                return controlDownPromise;
            }).then(function(){
                let pressApromise = tab.keyboard.press("A");
                return pressApromise;
            }).then(function(){
                let pressXpromise = tab.keyboard.press("X");
                return pressXpromise;
            }).then(function(){
                let editorClickPromise = tab.click(".monaco-scrollable-element.editor-scrollable.vs");
                return editorClickPromise;
            }).then(function(){
                let pressApromise = tab.keyboard.press("A");
                return pressApromise;
            }).then(function(){
                let pressVpromise = tab.keyboard.press("V");
                return pressVpromise;
            }).then(function(){
                let unpressCntrl = tab.keyboard.up("Control");
                return unpressCntrl;
            }).then(function(){
                return tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            }).then(function(){
                return tab.waitForSelector(".congrats-wrapper" , {visible : true});
            }).catch(function(err){
                console.log("Error");
            })
        }).then(function(){
            resolve();
        }).catch(function(err){
            console.log("Error");
        });
    })
}   
