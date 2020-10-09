# asciidoc-book-template
This repository is a template to create a single page html document. 
Main purpose of creating this is to have a start and just a basic structure.

## How To Use
- Put your `.adoc` files in the 'docs' directory. This directory can be found in the src folder.
- Make sure the `book.adoc`, `glossary.adoc` are present in the root of the language folder
- Also have a css folder inside the root language folder (eg. `/docs/ned/css/`),
    - within this css folder a `passThrough.css` need to be present with an import statement:
    `@import "../../../src/main/resources/css/custom.css";`  
    This makes sure the custom css styles are used in the manual (`book.html`)
- Once the files are located in the 'docs' directory run the following command in the terminal to generate the manual (`book.html`)
    - `gradlew runCreateBook` (Windows)
    - `./gradlew runCreateBook` (Linux)

The generated `book.html`, located in the 'docs' directory is the created manual.

In order to change the markup of the document. Navigate to the `custom.css` file, in this file all the id's are listed
and classed. All the properties like colour, font-size and so on can be changed here.

## Useful Links
[AsciiDoc official site](https://asciidoc.org/)  
[Cheatsheet AciiDoc](https://powerman.name/doc/asciidoc)  
[Best practices](https://asciidoctor.org/docs/asciidoc-recommended-practices/)  

## Default Themes
[Official Default Themes](https://github.com/darshandsoni/asciidoctor-skins)  
[Official Themes Screenshots](https://darshandsoni.com/asciidoctor-skins/screenshots/)  
[Official Themes Demo](https://darshandsoni.com/asciidoctor-skins/)

## Api Documentation
[AsciidoctorJ Explanation](https://asciidoctor.org/docs/asciidoctorj/#converting-documents)
