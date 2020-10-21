// When the user scrolls, the search bar is either sticky or back to it's original form.
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

/*
    Search functionality
 */
let foundTextCriteriaSpanTags = [];

function searchAndHighlight(searchTerm, selectorForDocument, highlightClass, removePreviousHighlights) {
    if (searchTerm) {
        let searchTermRegEx = new RegExp("(" + searchTerm + ")", "ig");
        let selector = selectorForDocument || "body"; //use body as selector if none provided
        let matches = 0;
        let helper = {};

        if (removePreviousHighlights) {
            $('.' + highlightClass).each(function (i, v) {
                let $parent = $(this).parent();
                $(this).contents().unwrap();
                $parent.get(0).normalize();
            });
            // Make sure the previous spanTags are 'forgotten'
            foundTextCriteriaSpanTags = [];
        }

        helper.doHighlight = function (node, searchTerm) {

            if (node.nodeType === 3) {
                if (node.nodeValue.match(searchTermRegEx)) {
                    matches++;
                    foundTextCriteriaSpanTags.push("search-" + matches);
                    let tempNode = document.createElement('span');
                    tempNode.innerHTML = node.nodeValue.replace(searchTermRegEx, "<span class='" + highlightClass + "' id='search-" + matches + "'>$1</span>");
                    node.parentNode.replaceChild(tempNode, node);
                }

            } else if (node.nodeType === 1 && node.childNodes && !/(style|script)/i.test(node.tagName)) {
                $.each(node.childNodes, function (i, v) {
                    helper.doHighlight(node.childNodes[i], searchTerm);
                });
            }
        };

        $.each($(selector).children(), function (index, val) {
            helper.doHighlight(this, searchTerm);
        });
        return matches;
    }
    return false;
}

let searchIndex = 0;

document.addEventListener("DOMContentLoaded", function(event) {

    // Search button function implementation
    document.getElementById("search-button").addEventListener("click", () => {
        console.log("Kom in de zoek button")
        if(!searchAndHighlight(document.getElementById("search-text").innerText, "body", "highlighted", true)){
            alert("No Results found!");
        }
    });

    // Next button function implementation
    document.getElementById("next-button").addEventListener("click", () => {
        console.log("Kom in de next button")
        if (foundTextCriteriaSpanTags.length !== 0) {
            if (searchIndex <= 0 || searchIndex >= foundTextCriteriaSpanTags.length) {
                searchIndex = 1;
            } else {
                searchIndex++;
            }

            _scrollIntoView();
        }
    });

    // Previous button function implementation
    document.getElementById("previous-button").addEventListener("click", () => {
        console.log("Kom in de previous button")
        if (foundTextCriteriaSpanTags.length !== 0) {
            if (searchIndex <= 1 || searchIndex > foundTextCriteriaSpanTags.length) {
                searchIndex = foundTextCriteriaSpanTags.length;
            } else {
                searchIndex--;
            }

            _scrollIntoView();
        }
    });
});

function _scrollIntoView() {
    let topOfElement = document.getElementById("search-" + searchIndex).offsetTop - 60;
    if (topOfElement > 0) {
        window.scroll({top: topOfElement, behavior: "smooth"});
    } else {
        // If the topOfTheElement is negative, the window.scroll function will just go to the top of the screen.
        // And obviously that is not where the last element is located (most of the time..)
        let element = document.getElementById("search-" + searchIndex)
        element.scrollIntoView({behavior: "smooth", block: "end"});
    }
}
