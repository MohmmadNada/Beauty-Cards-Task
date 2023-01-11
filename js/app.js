import { add_html_element, scale_card, fetch_from_api, add_button_with_onclick_event } from "./helper.js"

const container_div = add_html_element(
    { html_tag: "div", class_name: "container" }
)
const selected_color_names = [];
const CARD_API = "https://jsonplaceholder.typicode.com/albums/1/photos";
const response_data = await fetch_from_api(CARD_API)

response_data.forEach(({id,thumbnailUrl,title }) => {
    const card_element = add_html_element({ html_tag: "div", class_name: "card", parent_element: container_div })
    const color_hex = "#" + thumbnailUrl.split("/").pop()
    const color_div = add_html_element({ html_tag: "div", parent_element: card_element })
    card_element.setAttribute("id", "card-" + (id))
    color_div.style.backgroundColor = color_hex;
    for (let index = 0; index < 2; index++) {
        const p_element = add_html_element({ html_tag: "p", parent_element: card_element })
        p_element.textContent += title
    }
    const button_attrs = {
        for: "card-" + id,
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
