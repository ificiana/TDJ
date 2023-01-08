const api_endpt = "https://ificiana.alwaysdata.net/"
async function search(inp) {
            arr = await (async () => {
                const data = await fetch(`${api_endpt}tdj-search?q=${inp.value}`);
                return data.json();
            })();
            var currentFocus;
            inp.addEventListener("input", async function (e) {
                var a,
                    b,
                    i,
                    val = this.value;
                closeAllLists();
                if (!val) {
                    return false;
                }
                arr = await (async () => {
                    const data = await fetch(`${api_endpt}tdj-search?q=${val}`);
                    return data.json();
                })();
                console.log(arr);
                currentFocus = -1;
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "-search-list");
                a.setAttribute("class", "search-items");
                this.parentNode.appendChild(a);
                for (i = 0; i < arr.length; i++) {
                    b = document.createElement("DIV");
                    b.innerHTML += arr[i];
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                        window.location.href = `?=${inp.value}`;
                    });
                    a.appendChild(b);
                }
            });
            inp.addEventListener("keydown", function (e) {
                var x = document.getElementById(this.id + "-search-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    currentFocus++;
                    addActive(x);
                } else if (e.keyCode == 38) {
                    currentFocus--;
                    addActive(x);
                } else if (e.keyCode == 13) {
                    e.preventDefault();
                    if (currentFocus > -1) {
                        if (x) x[currentFocus].click();
                    }
                }
            });
            function addActive(x) {
                if (!x) return false;
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = x.length - 1;
                x[currentFocus].classList.add("search-active");
            }
            function removeActive(x) {
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("search-active");
                }
            }
            function closeAllLists(elmnt) {
                var x = document.getElementsByClassName("search-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
        }
        function render(str, query) {
            console.log(query)
            return str.replace(/\[!(.+?)\]/g, `<a href='$1.html?=${query}'>$1</a>`).replace(/\[(.+?)\]/g, "<a href='?=$1'>$1</a>");
        }
        function show_data(_json, query) {
            console.log(query)
            const res = document.getElementById("main");
            res.innerHTML = `<h1>${_json.key}</h1><hr><h2>${_json.sub}</h2><p>${render(_json.def, query)}</p>`;
            document.getElementById("footer").innerHTML = `<hr>${render(_json.footer, query)}`;
        }
        async function load(query) {
            console.log(query)
            const data = await fetch(`${api_endpt}tdj-get?=${query}`);
            show_data(await data.json(), query);
        }