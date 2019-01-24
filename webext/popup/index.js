function setOrigin(s) {
    document.getElementById("origin").innerHTML = s;
}

function addAltSvc(domain, preload, onionsig) {
    //let ul = document.getElementById("altsvc");
    //let li = document.createElement("li");
    //li.appendChild(document.createTextNode(s));
    //ul.appendChild(li);
    let table = document.getElementById("altsvc");
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.appendChild(document.createTextNode(domain));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(preload ? "Yes" : "No"));
    td.classList.add(preload ? "good" : "bad");
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(onionsig ? "Yes" : "No"));
    td.classList.add(onionsig ? "good" : "bad");
    tr.appendChild(td);

    table.appendChild(tr);
}

function populatePopupWindow(tabs) {
    let origin = splitURL(tabs[0].url).hostname;
    setOrigin(origin);
    let response = sendMessage("giveSites", origin);
    response.then(populateAltSvc, log_error);
}

function populateAltSvc(alts) {
    for (alt in alts) {
        addAltSvc(alt, alts[alt]['onpreload'], alts[alt]['onionsig']);
    }
}

function main() {
    browser.tabs.query({active: true, currentWindow: true})
        .then(populatePopupWindow)
        .catch(log_error);
}

main();