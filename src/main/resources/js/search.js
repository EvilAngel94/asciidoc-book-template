// When the user scrolls the page, execute myFunction
window.onscroll = function () {
    createFixedPosition()
};
const searchParagraph = document.getElementById("searchParagraph");
const sticky = document.getElementById("header").offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function createFixedPosition() {
    if (window.pageYOffset > sticky) {
        searchParagraph.classList.add("sticky")
    } else {
        searchParagraph.classList.remove("sticky")
    }
}

let previousSearchTerm = "";

function search() {
    removeHighlights(previousSearchTerm);
    const search = document.getElementById("search").value;
    doSearch(search);
    previousSearchTerm = search;
    return false;
}

function removeHighlights(text) {
    if (text !== "") {
        _highlightAndGoToText(text, "white");
    }
}

function doSearch(text) {
    _highlightAndGoToText(text, "yellow");
}

function _highlightAndGoToText(text, backgroundColor) {
    if (window.find && window.getSelection) {
        document.designMode = "on";
        let sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find(text, false)) {
            document.execCommand("HiliteColor", false, backgroundColor);
        }
        sel.collapseToStart();
        document.designMode = "off";
    }
}
