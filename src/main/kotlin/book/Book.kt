package book

import org.asciidoctor.Asciidoctor
import org.asciidoctor.OptionsBuilder
import org.asciidoctor.SafeMode
import java.io.File

class Book {

    private val asciidoctor = Asciidoctor.Factory.create()

    /**
     * This is the main function. This method is called to generate the book.html
     */
    fun generateHtml() {
        val options = OptionsBuilder.options().safe(SafeMode.SAFE).asMap()
        asciidoctor.convertFile(File("docs/book.adoc"), options)
    }
}