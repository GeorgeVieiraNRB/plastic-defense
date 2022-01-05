@file:Repository("https://jcenter.bintray.com")
@file:DependsOn("org.springframework.boot:spring-boot-starter-web:2.6.0")
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.*
import logic.*
@SpringBootApplication
@RestController
open class serverm()
{
    var vezes = 0
    @GetMapping("/")
    fun BackEnd() : String
    {
        return """
        <html>
        <head>
        <title>Plastic Defence</title>
        <meta charset="utf-8">
        <style type="text/css">
            .container {
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            #tela_de_titulo{
                width: 40vw;
                height: 6vw;
                flex: 1;
                background-color: azure; 
                margin: 0 auto ;
                margin-top: 10px;

            }
            h3{

                color: black;
                font-family: VCR OSD Mono;
                text-align: center;
                font-size: 24px;
            }
            #braza1{

                background-color: ;
                width: 6vw;
                height: 6vw;
                fle
            }
            .btn1{

                font-family: arial;
                font-size: 15px;
                padding: 10px 20px 10px 20px;
                text-transform: uppercase;
                font-weight: 700px
                cursor: pointer; 
  
            }
            .btn2{

                font-family: arial;
                font-size: 15px;
                padding: 10px 20px 10px 20px;
                text-transform: uppercase;
                font-weight: 700px
                cursor: pointer;    
             }
            .btn3{

                font-family: arial;
                font-size: 15px;
                padding: 10px 20px 10px 20px;
                text-transform: uppercase;
                font-weight: 700px
                cursor: pointer; 

            }
            #centralizar{
                position:absolute; 
                top:94%;
                left: 38%;
            }
            #center_titulo{
                position:absolute; 
                top:1%;
                left: 41%;   
            }
            body{
            background-color: #42a7f5

            }

        </style>

        </head>

        <body>

        <div id="tela_de_titulo" style="text-align: center;">

        <div id="center_titulo">
          <h3>PLASTIC DEFENCE</h3>
        </div>
        <div id="braza1">
        </div>
        <div id="braza2"></div>
    
        </div>

        <div class="container">
            
            <div id="tela_do_jogo">
                escrevi um bagulho so pra ficar aqui que foi escrito
                <div id="centralizar">
                    <button class="btn1"; onclick="logic.main()" >Baixaria</button>
                    <button class="btn2"; onclick="logic.tutorial()">Tutorial</button>
                    <button class="btn3">Jogar 3</button>
                </div>

            </div>

        </div>
    <script src="https://cdn.jsdelivr.net/npm/kotlin@1.6.10/kotlin.min.js"> </script>
    <script src="logic.js" />

    </body>
    </html>
        """
    }
}
runApplication<serverm>("--server.port=8090")