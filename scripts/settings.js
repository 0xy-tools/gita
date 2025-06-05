const MAX_LENGTH = 300000;
const MAX_CODE_LENGTH = 20;

function home() {
    document.getElementById("settings").style.display = "block"
    document.getElementById("settings").innerHTML = "⚙";

    document.getElementById("footerLinkContainer").style.display = "block";
    document.getElementById("areaSection").style.display = "block";
    document.getElementById("settingsSection").style.display = "none";
    document.getElementById("qrCodeSection").style.display = "none";
    document.getElementById("termsSection").style.display = "none";
    document.getElementById("topBackPolicy").style.display = "none";
    document.getElementById("policySection").style.display = "none";
}

function autoFocus() {
    document.getElementById("areaInput").focus();
}

function showTerms() {
    document.getElementById("topBackPolicy").style.display = "none";
    document.getElementById("policySection").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("qrGenButton").style.transform = "scale(0)";
    document.getElementById("areaSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";
    document.getElementById("qrCodeSection").style.display = "none";
    document.getElementById("termsSection").style.display = "block";
    document.getElementById("footerLinkContainer").style.display = "none";
}

function showPrivacy(back = () => { home(); }) {
    document.getElementById("settings").style.display = "none";
    document.getElementById("qrGenButton").style.transform = "scale(0)";
    document.getElementById("areaSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";
    document.getElementById("qrCodeSection").style.display = "none";
    document.getElementById("termsSection").style.display = "none";
    document.getElementById("topBackPolicy").style.display = "block";
    document.getElementById("policySection").style.display = "block";
    document.getElementById("footerLinkContainer").style.display = "none";

    document.getElementById("backFromPolicy").onclick = back;
    document.getElementById("topBackPolicy").onclick = back;
}

function updtTheme() {
    if (localSettings.theme == "dark") {
        document.documentElement.style.setProperty('--m', '#fe20fd');
        document.documentElement.style.setProperty('--mv', '#ff69fe');
        document.documentElement.style.setProperty('--md', '#811080');
        document.documentElement.style.setProperty('--mt', '#151215');
        document.documentElement.style.setProperty('--r', '#FE3420');
        document.documentElement.style.setProperty('--rv', '#FF7769');
        document.documentElement.style.setProperty('--re', '#FE3420');
        document.documentElement.style.setProperty('--g', '#CEFE20');
        document.documentElement.style.setProperty('--gv', '#DCFF69');
        document.documentElement.style.setProperty('--b', '#207DFE');
        document.documentElement.style.setProperty('--bt', '#121415');
        document.documentElement.style.setProperty('--bv', '#4572B1');
        document.documentElement.style.setProperty('--be', '#4572B1');
        document.documentElement.style.setProperty('--o', '#FE8020');
        document.documentElement.style.setProperty('--ot', '#151412');
        document.documentElement.style.setProperty('--ov', '#FFA969');
        document.documentElement.style.setProperty('--y', '#FEC220');
        document.documentElement.style.setProperty('--yv', '#FFD469');
        document.documentElement.style.setProperty('--n', '#1B1B1E');
        document.documentElement.style.setProperty('--nno', '#1B1B1E00');
        document.documentElement.style.setProperty('--nho', '#1B1B1E99');
        document.documentElement.style.setProperty('--w', '#FBFFFE');
        document.documentElement.style.setProperty('--nv', '#444146');
        document.documentElement.style.setProperty('--wv', '#B4B3B6');
        document.documentElement.style.setProperty('--gray', '#6D676E');
        document.documentElement.style.setProperty('--bgv', '#333333');
        document.documentElement.style.setProperty('--bg', '#000000');
        document.documentElement.style.setProperty('--fg', '#ffffff');
        document.documentElement.style.setProperty('--fgv', '#cccccc');
        document.documentElement.style.setProperty('--svgn', 'brightness(0.8)');
        document.documentElement.style.setProperty('--svgh', 'brightness(1)');
    } else {
        document.documentElement.style.setProperty('--m', '#fe20fd');
        document.documentElement.style.setProperty('--mv', '#ff69fe');
        document.documentElement.style.setProperty('--md', '#e71de6');
        document.documentElement.style.setProperty('--mt', '#ffe1ff');
        document.documentElement.style.setProperty('--r', '#FE3420');
        document.documentElement.style.setProperty('--rv', '#FF7769');
        document.documentElement.style.setProperty('--re', '#FE3420');
        document.documentElement.style.setProperty('--g', '#CEFE20');
        document.documentElement.style.setProperty('--gv', '#DCFF69');
        document.documentElement.style.setProperty('--b', '#207DFE');
        document.documentElement.style.setProperty('--bt', '#E1ECFF');
        document.documentElement.style.setProperty('--bv', '#4572B1');
        document.documentElement.style.setProperty('--be', '#4572B1');
        document.documentElement.style.setProperty('--o', '#FE8020');
        document.documentElement.style.setProperty('--ot', '#FFEDE1');
        document.documentElement.style.setProperty('--ov', '#FFA969');
        document.documentElement.style.setProperty('--y', '#FEC220');
        document.documentElement.style.setProperty('--yv', '#FFD469');
        document.documentElement.style.setProperty('--n', '#d4d4d4');
        document.documentElement.style.setProperty('--nno', '#1B1B1E00');
        document.documentElement.style.setProperty('--nho', '#1B1B1E99');
        document.documentElement.style.setProperty('--w', '#FBFFFE');
        document.documentElement.style.setProperty('--nv', '#444146');
        document.documentElement.style.setProperty('--wv', '#B4B3B6');
        document.documentElement.style.setProperty('--gray', '#6D676E');
        document.documentElement.style.setProperty('--fgv', '#333333');
        document.documentElement.style.setProperty('--fg', '#000000');
        document.documentElement.style.setProperty('--bg', '#ffffff');
        document.documentElement.style.setProperty('--bgv', '#eeeeee');
        document.documentElement.style.setProperty('--svgn', 'brightness(0.2)');
        document.documentElement.style.setProperty('--svgh', 'brightness(0)');
    }
}

function updtLang() {
    // general interface
    document.getElementById("lang").innerHTML = localSettings.lang == "fr" ? "FR" : "EN";
    document.getElementById("lButton").innerHTML = localSettings.lang == "fr" ? "Recevoir" : "Load";
    document.getElementById("sButton").innerHTML = localSettings.lang == "fr" ? "Envoyer" : "Store";
    document.getElementById("openAButton").innerHTML = localSettings.lang == "fr" ? "Ouvrir une zone" : "Open area";
    document.getElementById("createAButton").innerHTML = localSettings.lang == "fr" ? "Créer une zone" : "Create area";
    document.getElementById("bottomTerms").innerHTML = localSettings.lang == "fr" ? "Conditions Générales d'Utilisation" : "Terms Of Use";
    document.getElementById("bottomPrivacy").innerHTML = localSettings.lang == "fr" ? "Politique de confidentialité" : "Privacy Policy";

    // settings
    document.getElementById("settingsH4").innerHTML = localSettings.lang == "fr" ? "Paramètres" : "Settings";
    document.getElementById("themeTitle").innerHTML = localSettings.lang == "fr" ? "Thème" : "Theme";
    document.getElementById("deleteTitle").innerHTML = localSettings.lang == "fr" ? "Supprimer après<br><span class='verysmall'>(inactivité)</span>" : "Delete after<br><span class='verysmall'>(inactivity)</span>";
    document.getElementById("settingTheme").innerHTML = localSettings.lang == "fr" ? (localSettings.theme == "dark" ? "Sombre" : "Clair") : (localSettings.theme == "dark" ? "Dark" : "Light");
    document.getElementById("displayTerms").innerHTML = localSettings.lang == "fr" ? "Conditions Générales d'Utilisation" : "Terms Of Use";

    // type
    // if (localSettings.type == "u")
    //     document.getElementById("settingTimeDelete").innerHTML = (localSettings.lang == "fr" ? "Collage" : "Pasting") + "<br><span class='verysmall'>(30min max)</span>";
    // else 
    if (localSettings.type == "s")
        document.getElementById("settingTimeDelete").innerHTML = "30min";
    else if (localSettings.type == "l")
        document.getElementById("settingTimeDelete").innerHTML = "12h";
    else
        document.getElementById("settingTimeDelete").innerHTML = "2h";

    document.getElementById("saveSettings").innerHTML = localSettings.lang == "fr" ? "Enregistrer" : "Save";

    // inputs/outputs
    document.getElementById("areaInput").placeholder = localSettings.lang == "fr" ? "Entrez un code de zone ici" : "Enter an area code here";
    document.getElementById("dataArea").placeholder = localSettings.lang == "fr" ? "Entrez votre texte à copier ici" : "Enter your text to copy here";

    // settings instance value (not really language dependant)
    document.getElementById("settingInstance").value = localSettings.instance;

    // terms
    document.getElementById("termsH4").innerHTML = localSettings.lang == "fr" ? "Conditions Générales d'Utilisation" : "Terms Of Use";
    document.getElementById("byClickText").innerText = localSettings.lang == "fr" ? `En cliquant "J'accepte" ou en utilisant nos services, vous acceptez les CGU ci-dessus.` : `By clicking "I agree" or using our services, you agree to the TOU above.`
    if (localSettings.lang == "fr") {
        document.getElementById("frTerms").style.display = "block";
        document.getElementById("enTerms").style.display = "none";
    } else {
        document.getElementById("enTerms").style.display = "block";
        document.getElementById("frTerms").style.display = "none";
    }
    document.getElementById("privacyLink").innerText = localSettings.lang == "fr" ? "Politique de confidentialité" : "Privacy Policy";
    document.getElementById("iagreeButton").innerHTML = localSettings.lang == "fr" ? "J'accepte" : "I agree";

    // privacy
    document.getElementById("privacyH4").innerHTML = localSettings.lang == "fr" ? "Politique de confidentialité" : "Privacy Policy";
    if (localSettings.lang == "fr") {
        document.getElementById("frPrivacy").style.display = "block";
        document.getElementById("enPrivacy").style.display = "none";
    } else {
        document.getElementById("enPrivacy").style.display = "block";
        document.getElementById("frPrivacy").style.display = "none";
    }
    document.getElementById("backFromPolicy").innerHTML = localSettings.lang == "fr" ? "Retour" : "Back";
}

document.getElementById("lang").addEventListener("click", switchLanguage)
function switchLanguage() {
    let kv = {};
    kv["lang"] = localSettings.lang == "fr" ? "en" : "fr";
    set(kv)
    getAll(updateAll);
}

document.getElementById("settingTheme").addEventListener("click", switchTheme)
function switchTheme() {
    let kv = {};
    kv["theme"] = localSettings.theme == "dark" ? "light" : "dark";
    set(kv)
    getAll(updateAll);
}

document.getElementById("settingTimeDelete").addEventListener("click", switchTimeDelete)
function switchTimeDelete() {
    let kv = {};
    if (localSettings.type == "n") {
        kv["type"] = "s";
    } else if (localSettings.type == "s") {
        kv["type"] = "l";
    } else {
        kv["type"] = "n";
    }

    set(kv)
    getAll(updateAll);
}

function saveInstance() {
    if (localSettings.instance == document.getElementById("settingInstance").value)
        return;
    let kv = {};
    kv["instance"] = document.getElementById("settingInstance").value;
    set(kv)
    getAll(updateAll);
}


// Get QR CODE info

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function getQRCode() {
    const addressFinal = window.location.search;
    if (addressFinal == "")
        return;
    addressArgs = parseURLParams(addressFinal);
    // console.log(addressArgs);
    if (!addressArgs.hasOwnProperty("qr")) return; //addressArgs["qr"] === undefined

    // uncomment to auto set language
    // if (addressArgs["l"]) set({l:addressArgs["l"]});
    // set({tou:true}, updateAll());
    // temporary set TOU to make it easier when copying
    localSettings.tou = true;
    if (addressArgs["a"]) {
        document.getElementById("areaInput").value = addressArgs["a"];
        setTimeout(() => {
            document.getElementById("openAButton").click();
        }, 200);
    }

}

// Initializing and updating all settings

function updateAll() {
    // console.log(localSettings);
    updtLang();
    updtTheme();
}

function initUpdateAll() {
    updateAll();
    home();
    autoFocus();

    getQRCode()
    // display TOU
    if (localSettings.tou == false) showTerms();
}

getAll(initUpdateAll);

// document.getElementById("settingReset").addEventListener("click", () => {
//     removeAll(() => {
//         getAll(initUpdateAll);
//     })
// })