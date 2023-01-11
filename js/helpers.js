
function rgb_to_hex(col) {
    if (col.charAt(0) == 'r') {
        col = col.replace('rgb(', '').replace(')', '').split(',');
        let r = parseInt(col[0], 10).toString(16);
        let g = parseInt(col[1], 10).toString(16);
        let b = parseInt(col[2], 10).toString(16);
        r = r.length == 1 ? '0' + r : r; g = g.length == 1 ? '0' + g : g; b = b.length == 1 ? '0' + b : b;
        let colHex = '#' + r + g + b;
        return colHex;
    }
}

function add_html_element({ html_tag, class_name = '', parent_element = document.body }) {
    const html_element = document.createElement(html_tag);
    if (class_name) {
        html_element.classList.add(class_name)
    }
    parent_element.appendChild(html_element)
    return html_element
}

function scale_card(element_id, selected_color_names) {
    const card_element = document.getElementById(element_id)
    const color_div = card_element.querySelector("div")
    const button = document.querySelector(`[for='${element_id}']`)
    let selected_number = Number(document.getElementById("number-of-selected").textContent)
    const color_name = ntc.name(rgb_to_hex(color_div.style.backgroundColor))[1]
    if (card_element.getAttribute("style")) {
        if (!Object.values(card_element.style).indexOf("transform")) {
            card_element.style.transform = null
            button.style.backgroundColor = null
            selected_number = selected_number - 1;
            selected_color_names.splice(selected_color_names.indexOf(color_name), 1);
        }
    }
    else {
        card_element.style.transform = "scale(1.1, 1.04)";
        button.style.backgroundColor = "#168000";
        selected_number = selected_number + 1;
        selected_color_names.push(color_name)
    }
    document.getElementById("number-of-selected").innerText = selected_number
    const allColorsSelected = selected_color_names.join(" ")
    document.getElementById("selected-colors").innerText = allColorsSelected
}

async function fetch_from_api(api_link) {
    let response_data;
    await fetch(api_link)
        .then(
            (response) => {
                response_data = response.json()
            }
        ).catch((error) => {
            console.log(error)
        })
    return response_data
}

function add_button_with_onclick_event({ onclick_fun: onclick_fun, parent_html: parent_html, attr_to_add: attr_to_add, selected_color_names: selected_color_names }) {
    const button_element = document.createElement("button")
    button_element.textContent += "Button"
    parent_html.appendChild(button_element)
    button_element.setAttribute(Object.keys(attr_to_add)[0], Object.values(attr_to_add)[0])
    button_element.addEventListener("click", (e) => onclick_fun(e.target.getAttribute(Object.keys(attr_to_add)[0]), selected_color_names));
}

export { add_html_element, scale_card, fetch_from_api, add_button_with_onclick_event }
