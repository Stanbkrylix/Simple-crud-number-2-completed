const App = (function () {
    const cardSideContent = document.querySelector("card-side-container");
    const homeSectionContent = document.querySelector(".home-container");
    const nextSectionContent = document.querySelector(".next-container");

    const homeSection = document.querySelector(".home-section");
    const nextSection = document.querySelector(".next-section");

    const homeLink = document.querySelector(".home");
    const nextLink = document.querySelector(".next");

    let homeArray = [];
    let nextArray = [];

    homeLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (homeSection.classList.contains("hidden")) {
            homeSection.classList.remove("hidden");
            nextSection.classList.add("hidden");
        }
    });

    nextLink.addEventListener("click", (e) => {
        e.preventDefault();

        if (nextSection.classList.contains("hidden")) {
            nextSection.classList.remove("hidden");
            homeSection.classList.add("hidden");
        }
    });

    const cards = (section, text, id) => {
        const card = document.createElement("div");
        const paragraph = document.createElement("p");

        const editAndDeleteDiv = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        const confirmAndCancelDiv = document.createElement("div");
        const confirmBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");

        // setting up class names
        card.setAttribute("class", "card");
        card.setAttribute("data-number", id);

        editAndDeleteDiv.setAttribute("class", "edit-and-delete");
        editBtn.setAttribute("class", "edit-btn");
        deleteBtn.setAttribute("class", "delete-btn");

        confirmAndCancelDiv.setAttribute("class", "confirm-and-cancel");
        confirmBtn.setAttribute("class", "confirm-edit");
        cancelBtn.setAttribute("class", "cancel-edit");

        // appending elements
        section.appendChild(card);

        editAndDeleteDiv.appendChild(editBtn);
        editAndDeleteDiv.appendChild(deleteBtn);

        confirmAndCancelDiv.appendChild(confirmBtn);
        confirmAndCancelDiv.appendChild(cancelBtn);

        card.appendChild(paragraph);
        card.appendChild(editAndDeleteDiv);
        card.appendChild(confirmAndCancelDiv);

        paragraph.textContent = text;
        editBtn.textContent = "Edit";
        deleteBtn.textContent = "Delete";

        confirmBtn.textContent = "Confirm";
        cancelBtn.textContent = "Cancel";

        const array = section.classList.contains("home-container")
            ? homeArray
            : nextArray;
        deleteFunction(section, deleteBtn, array);

        const cardObject = {
            section: section,
            array: array,
            div: {
                editAndDeleteDiv: editAndDeleteDiv,
                confirmAndCancelDiv: confirmAndCancelDiv,
            },
            button: {
                cancelBtn: cancelBtn,
                confirmBtn: confirmBtn,
                editBtn: editBtn,
                deleteBtn: deleteBtn,
            },
            hideConfirmAndCancelDiv() {
                this.div.confirmAndCancelDiv.classList.add("hidden");
            },
            makeVisibleConfirmAndCancelDiv() {
                this.div.confirmAndCancelDiv.classList.remove("hidden");
            },
            hideEditAndDeleteDiv() {
                this.div.editAndDeleteDiv.classList.add("hidden");
            },
            makeVisibleEditandDeleteDiv() {
                this.div.editAndDeleteDiv.classList.remove("hidden");
            },
        };

        editFunction(cardObject);
    };

    const addToCard = (section, text, array) => {
        array.push({ text: text });
        section.textContent = ""; // clear section

        array.forEach((object, index) => {
            cards(section, object.text, index);
            console.log(object);
        });
    };

    // cards(homeSectionContent, "First");

    const deleteFunction = (section, deleteBtn, array) => {
        deleteBtn.addEventListener("click", (e) => {
            const target = e.target;
            const parentElement = target.parentElement;
            const index = parseInt(parentElement.dataset.number);

            // delete from container
            parentElement.remove();

            // delete from card
            array.splice(index, 1);

            // clear section before re renders
            section.textContent = "";

            array.forEach((object, index) => {
                cards(section, object.text, index);
            });

            console.log(section, array);
        });
    };

    const editFunction = (card) => {
        card.hideConfirmAndCancelDiv();

        card.button.editBtn.addEventListener("click", (e) => {
            const target = e.target;
            const parentElement = target.parentElement.parentElement;
            const paragraphElement = parentElement.querySelector("p");

            // create a new input value for the current card
            const cardInputValue = document.createElement("input");
            cardInputValue.type = "text";
            cardInputValue.value = paragraphElement.textContent;

            paragraphElement.replaceWith(cardInputValue);
            card.makeVisibleConfirmAndCancelDiv();
            card.hideEditAndDeleteDiv();

            const inputValue = document.querySelector(".inputValue");
            const submitBtn = document.querySelector(".submit-btn");
            submitBtn.disabled = true;
            // console.log(submitBtn);

            if (paragraphElement) {
                //confirm edit btn
                card.button.confirmBtn.addEventListener("click", () => {
                    if (!cardInputValue.value) {
                        return;
                    }

                    const newText = cardInputValue.value;

                    // to update the text inside the paragraph
                    paragraphElement.textContent = newText;

                    // Update Text in array
                    const index = parseInt(parentElement.dataset.number);
                    card.array[index].text = newText;

                    cardInputValue.replaceWith(paragraphElement);

                    card.hideConfirmAndCancelDiv();
                    card.makeVisibleEditandDeleteDiv();
                    submitBtn.disabled = false;
                    inputValue.value = "";
                });
            }

            // cancel edit
            card.button.cancelBtn.addEventListener("click", (e) => {
                cardInputValue.replaceWith(paragraphElement);

                card.hideConfirmAndCancelDiv();
                card.makeVisibleEditandDeleteDiv();
                submitBtn.disabled = false;
                inputValue.value = "";
            });
            // console.log(target);
            // console.log(parentElement);
        });
    };

    document.querySelector(".submit-btn").addEventListener("click", (e) => {
        const inputValue = document.querySelector(".inputValue");

        if (!inputValue.value) return;

        if (homeSection.classList.contains("hidden")) {
            addToCard(nextSectionContent, inputValue.value, nextArray);
        } else {
            addToCard(homeSectionContent, inputValue.value, homeArray);
        }

        inputValue.value = "";
        console.log(homeArray);
        console.log(nextArray);
    });

    return {};
})();

// submit a card to home section
