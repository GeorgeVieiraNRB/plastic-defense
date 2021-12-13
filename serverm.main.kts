
@file:Repository("https://jcenter.bintray.com")
@file:DependsOn("org.springframework.boot:spring-boot-starter-web:2.6.0")

package serverm

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.*
//import org.springframeworkstereotype.Controller

@SpringBootApplication
@RestController
open class serverm()
{
    var vezes = 0
    @GetMapping("/BackEnd.html")
    fun BackEnd() : String
    {
        vezes++
        print("mamaco")
        return """<html>
        <body>
        <I>
        MAMACO * ${vezes}
        <I/>
        <body/>
        <html/>
        """
    }
}
runApplication<serverm>("--server.port=4000")