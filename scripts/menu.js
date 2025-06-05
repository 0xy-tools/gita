function urlEncode(input) {
    // let input = encodeHTMLEntities(rawInput);
    if (false)
        return input.split('').map(c => {
            if (/[a-zA-Z0-9\-_.~?]/.test(c)) {
                return c;
            } else {
                return encodeURIComponent(c).toUpperCase();
            }
        }).join('');
    else return input;
}

function decodeHTMLEntities(text) {
    const tempElement = document.createElement('textarea');
    tempElement.innerHTML = text;
    return tempElement.value;
}

function encodeHTMLEntities(text) {
    const tempElement = document.createElement('div');
    tempElement.textContent = text;
    return tempElement.innerHTML;
}

// COMMINUCATION FUNCTIONS

const regex = /^[a-z]{1,6}\-[a-z]{1,6}\-[a-z]{1,6}$/;
// let lastDataStringRequest = "";
let lastAreaRequest = "";
let lastCode = "";
const INPUT_MAX_LENGTH = MAX_LENGTH;

function setError(idObj, message) {
    document.getElementById(idObj).innerHTML = message;
}

const popUp = document.getElementById("infoTempPopUp")
popUp.style.display = "none";
function setTempPopUp(visible, title = "", content = "") {
    popUp.style.display = visible ? "flex" : "none";
    popUp.innerHTML = `
    <h2>${title}</h2>
    <p>${content}</p>
    `;
}

// function chunkString(str, length) {
//     return str.match(new RegExp('(.{1,' + length + '}\s)\s*', 'g'));
// }
function chunkString(inputString, maxLength) {
    const chunks = [];
    let start = 0;

    while (start < inputString.length) {
        let newString = inputString.slice(start, start + maxLength);
        if (newString.includes("%3Cscript")) {
            let subStrings = newString.split("%3Cscript");
            for (let index = 0; index < subStrings.length; index++) {
                let s = "";
                if (index > 0)
                    s += "ipt";
                s += subStrings[index];
                if (index < subStrings.length - 1)
                    s += "%3Cscr";
                chunks.push(s);
            }
        }
        else
            chunks.push(newString);
        start += maxLength;
    }

    return chunks;
}

function showQRcode(obj, rawValue, isCode = false) {
    let value = decodeHTMLEntities(rawValue);
    // console.log(value);
    if (obj != null)
        obj.value = value;
    // lastCode = value;
    // navigator.clipboard.writeText(value);
    if (isCode) {
        document.getElementById("qrcode").innerHTML = "";
        document.getElementById("qrGenButton").style.transform = "scale(1)";
        new QRCode(document.getElementById("qrcode"), `https://g.0xy.fr?qr=1&a=${urlEncode(value)}`);
        document.getElementById("qrValue").innerHTML = `https://g.0xy.fr?qr=1&a=${urlEncode(value)}`;
    }
}

document.getElementById("loadStoreButtons").style.display = "none";
document.getElementById("loadStoreButtons").style.transform = "scale(0)";
function switchAreaSection() {
    document.getElementById("loadStoreButtons").style.display = "flex";
    document.getElementById("createAreaButton").style.transform = "scale(0)";
    document.getElementById("createAreaButton").style.marginTop = "0";
    document.getElementById("dataArea").style.transform = "scale(1)";
    setTimeout(() => {
        document.getElementById("loadStoreButtons").style.transform = "scale(1)";
    }, 400);
    // setTimeout(() => {
    //     document.getElementById("createAreaButton").style.display = "none";
    // }, 400);
}

const da = document.getElementById("dataArea")
const ai = document.getElementById("areaInput")

function createCodeFromGITA(ret, lang = 'en') {
    // if (content == lastStringRequest) ret.value = lastCode;
    // if (mode == '') setError("dataArea", `${localSettings.lang == "fr" ? "Erreur interne" : "Internal error"} :/`);
    // if (content == '' || content.length > INPUT_MAX_LENGTH) return setError("dataArea", `${localSettings.lang == "fr" ? "Longueur maximale : " : "Max length: "} ${INPUT_MAX_LENGTH} !`);
    // lastStringRequest = content;

    fetch(`./index.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'l': lang,
            'duration': localSettings.type,
            'create': ''
            // ,
            // 'm': `post;${localSettings.const ? "const" : ""}`
        })
    })
        .then(response => response.text())
        .then(text => {
            // console.log(text);
            if (regex.test(text.startsWith("\n") ? text.slice(1) : text)) {
                showQRcode(ret, text.startsWith("\n") ? text.slice(1) : text, true);
                // da.innerHTML = "";
                da.value = "";
                switchAreaSection();
            } else {
                // switchAreaSection();

            }
        })
        .catch(error => console.error('Error:', error));

}

da.addEventListener(`focus`, () => da.select());
ai.addEventListener(`focus`, () => ai.select());

let animData;
function clearAnimData() {
    clearTimeout(animData);
    da.classList.remove("rcvd");
    da.classList.remove("sent");
    da.style.animation = 'none';
    da.offsetHeight; /* trigger reflow */
    da.style.animation = null;
}
function pullFromGITA(ret, code) {
    if (code == '' || regex.test(code) == false) return setError("areaInputInfo", `"${code}" ${localSettings.lang == "fr" ? "ne ressemble pas à un code valide" : "doesn't look like a valid code"}`);

    fetch(`./index.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'pull': code
        })
    })
        .then(response => response.text())
        .then(text => {
            // console.log(response);
            // updateAndClipboardCopy(ret, text.startsWith("\n") ? text.slice(1) : text);
            //: SOMETHING
            clearAnimData();
            da.classList.add("rcvd");
            let value = decodeHTMLEntities(text)
            setTimeout(() => {
                ret.value = value.startsWith("\n") ? value.slice(1) : value;
            }, 100)
            animData = setTimeout(() => {
                da.classList.remove("rcvd");
            }, 1000);
        })
        .catch(error => console.error('Error:', error));

}

function pushToGITA(ret, area, content) {
    if (content.length > MAX_LENGTH) return setError("dataAreaInfo", `${localSettings.lang == "fr" ? "Longueur maximale : " : "Max length: "} ${INPUT_MAX_LENGTH} !`);

    fetch(`./index.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'a': area,
            'push': content
        })
    })
        .then(response => response.text())
        .then(text => {
            // console.log(response);
            // updateAndClipboardCopy(ret, text.startsWith("\n") ? text.slice(1) : text);
            clearAnimData();
            da.classList.add("sent");
            animData = setTimeout(() => {
                da.classList.remove("sent");
            }, 1000);
        })
        .catch(error => console.error('Error:', error));

}


function openFromGITA(ret, areaCode, lang = 'en') {
    // if (areaCode == lastAreaRequest) return ret.value = lastCode;
    if (areaCode == '' || areaCode.length > MAX_CODE_LENGTH) return setError("areaInputInfo", `${localSettings.lang == "fr" ? "Longueur maximale : " : "Max length: "} ${INPUT_MAX_LENGTH} !`);
    // lastAreaRequest = areaCode;

    fetch(`./index.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            // 'l': lang,
            'pull': areaCode
            // ,
            // 'm': `post;${localSettings.const ? "const" : ""}`
        })
    })
        .then(response => response.text())
        .then(text => {
            // console.log(text);
            // FIXME: true error and no qrcode when wrong area //text.startsWith("\n") ? text.slice(1) : text
            showQRcode(null, areaCode, true);
            let value = decodeHTMLEntities(text)
            ret.value = value.startsWith("\n") ? value.slice(1) : value;
            switchAreaSection();
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById("dataArea").style.transform = "scale(0)";
document.getElementById("qrGenButton").style.transform = "scale(0)";

// COPY PASTE BUTTONS

document.getElementById("openAButton").addEventListener("click", () => { openFromGITA(document.getElementById("dataArea"), urlEncode(document.getElementById("areaInput").value), localSettings.lang); });
document.getElementById("createAButton").addEventListener("click", () => { createCodeFromGITA(document.getElementById("areaInput"), localSettings.lang) });
document.getElementById("lButton").addEventListener("click", () => { pullFromGITA(document.getElementById("dataArea"), document.getElementById("areaInput").value) });
document.getElementById("sButton").addEventListener("click", () => { pushToGITA(document.getElementById("dataArea"), document.getElementById("areaInput").value, document.getElementById("dataArea").value) });

// SUBMENUS

document.getElementById("displayTerms").addEventListener("click", showTerms)

document.getElementById("iagreeButton").addEventListener("click", () => {
    set({ tou: true });
    document.getElementById("settings").style.display = "block"
    document.getElementById("settings").innerHTML = "⚙";
    home();
    autoFocus();
})


let inSettings = false;
document.getElementById("settings").addEventListener("click", () => {
    if (inSettings) {
        document.getElementById("settings").innerHTML = "⚙";
        saveInstance();
        inSettings = false;
        home();
        autoFocus();
    } else {
        document.getElementById("footerLinkContainer").style.display = "block";
        document.getElementById("settings").innerHTML = "⨯";
        document.getElementById("qrIcon").src = "./images/qrcode.svg";
        inSettings = true;
        inQrcode = false;
        document.getElementById("settingsSection").style.display = "block";
        document.getElementById("areaSection").style.display = "none";
        document.getElementById("qrCodeSection").style.display = "none";
    }
});

let inQrcode = false;
document.getElementById("qrGenButton").addEventListener("click", () => {
    if (inQrcode) {
        document.getElementById("qrIcon").src = "./images/qrcode.svg";
        inQrcode = false;
        home();
    } else {
        document.getElementById("settings").innerHTML = "⚙";
        document.getElementById("qrIcon").src = "./images/cross.svg";
        inQrcode = true;
        inSettings = false;
        document.getElementById("settingsSection").style.display = "none";
        document.getElementById("areaSection").style.display = "none";
        document.getElementById("qrCodeSection").style.display = "block";
    }
});

document.getElementById("saveSettings").addEventListener("click", () => {
    document.getElementById("settings").innerHTML = "⚙";
    saveInstance();
    inSettings = false;
    home();
    autoFocus();
});

// KEYBOARD SHORTCUTS

var areaInput = document.getElementById("areaInput");
var dataArea = document.getElementById("dataArea");
var ctrlPressed = false;
areaInput.addEventListener("keydown", function (e) {
    // console.log(e.code);

    if (e.key === "Enter") {
        if (ctrlPressed)
            document.getElementById("openAButton").click();
    } else if (e.key === "Control") {
        ctrlPressed = true;
    }

    if (urlEncode(areaInput.value).length > INPUT_MAX_LENGTH)
        setError("areaInputInfo", `${localSettings.lang == "fr" ? "Longueur maximale : " : "Max length: "} ${INPUT_MAX_LENGTH} (${INPUT_MAX_LENGTH - urlEncode(areaInput.value).length})`);
    else
        setError("areaInputInfo", "");
});
areaInput.addEventListener("keyup", function (e) {
    if (e.key === "Control") {
        ctrlPressed = false;
    }
});

dataArea.addEventListener("keydown", function (e) {
    // console.log(e.code);

    if (e.key === "Enter") {
        if (ctrlPressed)
            document.getElementById("sButton").click();
    } else if (e.key === "Control") {
        ctrlPressed = true;
    }

    if (urlEncode(dataArea.value).length > INPUT_MAX_LENGTH)
        setError("dataAreaInfo", `${localSettings.lang == "fr" ? "Longueur maximale : " : "Max length: "} ${INPUT_MAX_LENGTH} (${INPUT_MAX_LENGTH - urlEncode(dataArea.value).length})`);
    else
        setError("dataAreaInfo", "");
});
dataArea.addEventListener("keyup", function (e) {
    if (e.key === "Control") {
        ctrlPressed = false;
    }
});

// codeInput.addEventListener("keydown", function (e) {
//     // console.log(e.code);

//     if (e.key === "Enter") {
//         if (ctrlPressed)
//             document.getElementById("pButton").click();
//     } else if (e.key === "Control") {
//         ctrlPressed = true;
//     }
// });
// codeInput.addEventListener("keyup", function (e) {
//     if (e.key === "Control") {
//         ctrlPressed = false;
//     }
// });

// POST ping

function sendPing(json = false) {
    setTempPopUp(true, `Waiting...`, "");
    if (json)
        // json requests not supported by server yet
        fetch(`./index.php`, {
            method: 'POST',
            body: JSON.stringify({ 'ping': 'yes' }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(data => {
                // console.log(response);
                console.log("JSON", data);
                setTempPopUp(true, `POST`, data);
            })
            .catch(error => console.error('Error:', error));
    else
        fetch(`./index.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'ping': 'yes'
            })
        })
            .then(response => response.text())
            .then(data => {
                // console.log(response);
                console.log("URL", data);
                setTempPopUp(true, `POST`, data);
            })
            .catch(error => console.error('Error:', error));
}