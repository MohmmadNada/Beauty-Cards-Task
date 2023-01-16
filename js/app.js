
import { rgb_to_hex } from "./helpers.js"
const selectedColorNames = [];
const CARD_API = "https://jsonplaceholder.typicode.com/albums/1/photos";

class Card {
    constructor(cardData) {
        Card.createCard(cardData)
    }
    static scaleCard(selectedColorNames, divCard) {
        let selectedNumber = Number(document.getElementById("number-of-selected").textContent)
        const colorDiv = divCard.querySelector("div")
        const button = divCard.querySelector("button")
        const colorName = ntc.name(rgb_to_hex(colorDiv.style.backgroundColor))[1]
        if (divCard.getAttribute("style")) {
            if (!Object.values(divCard.style).indexOf("transform")) {
                divCard.style.transform = null
                button.style.backgroundColor = null
                selectedNumber = selectedNumber - 1;
                selectedColorNames.splice(selectedColorNames.indexOf(colorName), 1);
            }
        }
        else {
            divCard.style.transform = "scale(1.1, 1.04)";
            button.style.backgroundColor = "#168000";
            selectedNumber = selectedNumber + 1;
            selectedColorNames.push(colorName)
        }
        document.getElementById("number-of-selected").innerText = selectedNumber
        const allColorsSelected = selectedColorNames.join(" ")
        document.getElementById("selected-colors").innerText = allColorsSelected
    }

    static createCard(cardData) {
        cardData.forEach(({ id, thumbnailUrl, title }) => {
            const divCard = document.createElement("div");
            divCard.classList.add("card")
            document.querySelector(".container").appendChild(divCard)
            const colorHex = "#" + thumbnailUrl.split("/").pop()
            const colorDiv = document.createElement("div");
            divCard.appendChild(colorDiv)
            divCard.setAttribute("id", "card-" + (id))
            colorDiv.style.backgroundColor = colorHex;
            for (let index = 0; index < 2; index++) {
                const pElement = document.createElement("p");
                pElement.classList.add("color-paragraph")
                pElement.textContent += title
                divCard.appendChild(pElement)
            }
            const buttonElement = document.createElement("button")
            buttonElement.textContent += "Button"
            divCard.appendChild(buttonElement)
            buttonElement.setAttribute("for", "card-" + id);
            buttonElement.addEventListener("click", (e) => this.scaleCard(selectedColorNames, divCard));
        })
    }
}

class CardsList {
    constructor(fetchData) {
        this.fetchData = fetchData;
    }
    static async getCardsList(cardApiLink) {
        let responseData;
        return await fetch(cardApiLink)
            .then((response) => responseData = response.json())
    }
}

class CardPage extends CardsList {
    constructor(cardApiLink) {
        CardPage.createContainerDiv()
        let fetchedData
        CardPage.fetchCardData(cardApiLink).then(
            (response) => new Card(response)
        )
        super(fetchedData)
    }
    static createContainerDiv() {
        const containerDev = document.createElement("div");
        containerDev.classList.add("container")
        document.body.appendChild(containerDev)
    }
    static async fetchCardData(cardApiLink) {
        try {
            const result = await CardsList.getCardsList(cardApiLink)
            return result
        } catch (error) {
            return [];
        }
    }
}

new CardPage(CARD_API)
