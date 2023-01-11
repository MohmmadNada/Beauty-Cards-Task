import { add_html_element, scale_card, fetch_from_api, add_button_with_onclick_event } from "./helper.js"


let container_div = add_html_element(
    { html_tag: "div", class_name: "container" }
)
let selected_color_names = [];
const CARD_API = "https://jsonplaceholder.typicode.com/albums/1/photos";
let response_data = await fetch_from_api(CARD_API)
response_data.forEach(element => {
    let card_element = add_html_element({ html_tag: "div", class_name: "card", parent_element: container_div })
    let color_hex = "#" + element["thumbnailUrl"].split("/").pop()
    let color_div = add_html_element({ html_tag: "div", parent_element: card_element })
    card_element.setAttribute("id", "card-" + (element["id"]))
    color_div.style.backgroundColor = color_hex;
    for (let index = 0; index < 2; index++) {
        let p_element = add_html_element({ html_tag: "p", parent_element: card_element })
        p_element.textContent += (element["title"])
    }
    const button_attrs = {
        for: "card-" + element["id"],
    }
    add_button_with_onclick_event(
        {
            onclick_fun: scale_card,
            parent_html: card_element,
            attr_to_add: button_attrs,
            selected_color_names: selected_color_names,
        }
    )
});
