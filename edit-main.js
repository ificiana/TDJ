const escapeHTML = s => {
    let out = "";
    let p2 = 0;
    for (let p = 0; p < s.length; p++) {
        let r;
        switch (s.charCodeAt(p)) {
            case 34:
                r = "&quot;";
                break; // "
            case 38:
                r = "&amp;";
                break; // &
            case 39:
                r = "&#39;";
                break; // '
            case 60:
                r = '&lt;';
                break; // <
            case 62:
                r = '&gt;';
                break; // >
            default:
                continue;
        }
        if (p2 < p) {
            out += s.substring(p2, p);
        }
        out += r;
        p2 = p + 1;
    }
    if (p2 == 0) {
        return s;
    }
    if (p2 < s.length) {
        out += s.substring(p2);
    }
    return out;
}
let area = null;
let DATA = null;

function editStart(dom, _t) {
    area = document.createElement('textarea');
    area.className = 'edit';
    area.value = DATA[_t];
    if (_t == "def") area.placeholder = "Enter definion, supports TDJ markdown";
    else if (_t == "sub") area.placeholder = "Enter subheading (can be empty)";
    area.onkeydown = (e) => (e.key == 'Enter') ? this.blur() : () => {};
    area.onblur = () => editEnd(dom, _t);
    area.style.width = "100%";
    area.style.height = "4rem";
    dom.replaceWith(area);
    area.focus();
}

function editEnd(dom, _t) {
    DATA[_t] = escapeHTML(area.value);
    edit_show_data(DATA);
}

function save(_done = 0) {
    document.getElementById('id01')
        .style.display = 'block';
    if (_done) {
        const form = document.forms.save_form;
        const data = {
            uname: form["uname"].value,
            psw: form["psw"].value,
            data: {
                def: DATA.def,
                sub: DATA.sub,
                key: DATA.key
            }
        };
        (async () => {
            const rawResponse = await fetch(endpts.edit(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const response = await rawResponse.json();
            response.status == "success" ? window.location.href = `index.html?=${sq}` : alert("Something went wrong :( See logs.");
            console.log(response);
        })();
    }
}

function edit_render(str) {
    return str
        .replace(/\n\n/g, "<br>")
        .replace(/-{3,}\n/g, "<hr>")
        .replace(/\[!k\((.+?)\)\]/g, `<a href='?=kanji:$1' target='_blank' style="color: purple">$1</a>`)
        .replace(/\[!(.+?)\]/g, `<a href='/$1.html?=${sq}' target='_blank'>$1</a>`)
        .replace(/\[(.+?)\]/g, "<a href='index.html?=$1' target='_blank'>$1</a>");
}

function edit_show_data(_json, query=DATA.key) {
    if (_json.key == "404") {
        _json.key = query;
        _json.sub = "Enter subheading (can be empty)";
        _json.def = "Enter definion, supports TDJ markdown";
    }
    DATA = _json;
    const res = document.getElementById("main");
    res.innerHTML = `<h1>${query}</h1><hr><h2 onclick="editStart(this, 'sub')">${_json.sub || "Enter subheading (can be empty)"}</h2><p onclick="editStart(this, 'def')">${edit_render(_json.def) || "Enter definion, supports TDJ markdown"}</p>`;
    document.getElementById("footer")
        .innerHTML = `<hr>TDJ by Ificiana`;
}
async function load(query) {
    const data = await fetch(endpts.get(query));
    edit_show_data(await data.json(), query);
}
