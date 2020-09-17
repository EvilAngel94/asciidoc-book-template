package book

import org.asciidoctor.*
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths

class Book {

    private val asciidoctor = Asciidoctor.Factory.create()

    /**
     * This is the main function. This method is called to generate the book.html
     */
    fun generateHtml() {
        removeExistingHtmlFilesIfPresent()

        val attributes = createTheAttributes()
        val options = createOptions(attributes)

        asciidoctor.convertFile(File("docs/book.adoc"), options)
    }

    /**
     * These attributes set are applied for the whole generated document. These are some standard properties.
     */
    private fun createTheAttributes(): Attributes? {
        return AttributesBuilder.attributes()
                // Enable the option to have a table of content
                .tableOfContents(true)
                .tableOfContents(Placement.LEFT)
                // We need to have a css file in the docs/language directory. Otherwise the file is not recognised.
                .stylesDir("./css/")
                .styleSheetName("passThrough.css")
                .linkCss(true)
                .get()
    }

    private fun createOptions(attributes: Attributes?): Options? {
        return OptionsBuilder.options()
                .attributes(attributes)
                .safe(SafeMode.SAFE)
                .get()
    }

    private fun removeExistingHtmlFilesIfPresent() {
        Files.deleteIfExists(Paths.get("docs/book.html"))
    }
}