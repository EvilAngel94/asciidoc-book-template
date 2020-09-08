package book

import org.asciidoctor.Asciidoctor
import org.asciidoctor.OptionsBuilder
import org.asciidoctor.SafeMode
import org.asciidoctor.jruby.AsciiDocDirectoryWalker
import java.io.File

class Book {

    private val asciidoctor = Asciidoctor.Factory.create()

    fun createHtml() {
        val asciiDocs = obtainAllAsciiDocs()
        print(asciiDocs)
    }

    private fun obtainAllAsciiDocs(): String? {

        val options = OptionsBuilder.options().safe(SafeMode.SAFE).asMap()

        return asciidoctor.convertFile(File("docs/book.adoc"), options)
    }

}