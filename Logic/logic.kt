package logic

import kotlinx.browser.*
import org.w3c.dom.*

val element = document.getElementById("tela_do_jogo") as HTMLDivElement
var interval = 0
var torreSelecionada = TowerTypes().Pinguim

class Math(){
    fun abs(valor:Int):Int{
        if(valor>=0){
            return valor
        }else{
            return valor*-1
        }
    }
}
class Player(val name :String, var points:Int=0, var money:Int=600, var health : Int=50)//depois mudar o dinheiro inicial(1 fase) e por enquanto o dinheiro vai ser var , quiser pode tentar mudar
{
    override fun toString() : String{
        return "$name | $points | $$money | HP:$health"
    }
    fun createTower(type : String) : Tower? // criar no nivel 1 ok
    {
        if(money>=200)
        {
            money-=200 // tiro logo aqui o dinheiro pra n precisar botar em cada if
            if(type.equals("Tartaruga"))
            	return TowerTypes().Tartaruga
            else if(type.equals("Baleia"))
            	return TowerTypes().Baleia
            else if(type.equals("Pinguim"))
            	return TowerTypes().Pinguim
            else
            	money+=200 // aqui da refund
            	return null
        }
        else
        {
            println("LISO")
            return null
        }
    }
    fun upgradeTower(torre : Tower)
    {
        if(money>=torre.price)
        {
            val t =torre.upgrade()
            println(t)
            money-=torre.price
            println("\nUPOU A TORRE")
        }
        else
        {
            print("LISO")
        }
    }
}
class Tower(val atkSpeed : Int, val damage : Int, val range : Int, val pierce:Int,val type : String,val level : Int=1,var price : Int=200*(level))//preco do proximo nivel
{
    override fun toString() : String{
        return """${type} lvl${level}
        Clique aqui para dar upgrade pro lvl${level+1}!
        Custo: ${200*(level+1)}
Status Atuais:
    Dano: ${damage}
    Frequência de ataques: ataca a cada ${atkSpeed} segundos
    Penetração (quantos inimigos atinge a cada ataque): ${pierce}
    Alcance: raio-${range-1}"""
    }
    //fazer 3 funcoes , uma pra upar cada tipo de torre ,qualquer coisa da pra usar funcao lambda pra diminuir depois
    //sao privados pois so vou usar los aqui ,executar los por meio de outra fun
    private fun upgradeTurtle() : Tower // eu fiz outro parametro so pra manter paradigma funcional , se fizesse uma recurssao com variavel "global" n seria funcional
    {
        return Tower(atkSpeed,damage+2,range,pierce+1,"Tartaruga",level+1)//tartaruga vou upar ambos
    }
    private fun upgradePenguin() : Tower // eu fiz outro parametro so pra manter paradigma funcional , se fizesse uma recurssao com variavel "global" n seria funcional
    {
        if(atkSpeed>2){
            return Tower(atkSpeed-1, damage+1, range, pierce,"Pinguim", level+1)
        }else{
            return Tower(atkSpeed, damage+1, range, pierce+1,"Pinguim", level+1)
        }
    }
    private fun upgradeWhale() : Tower // eu fiz outro parametro so pra manter paradigma funcional , se fizesse uma recurssao com variavel "global" n seria funcional
    {
        return Tower(atkSpeed, damage+(3*level), range, pierce, "Baleia",level+1)
    }
    fun upgrade() : Tower? // n ligar pro dinheiro agr, vou ligar pro dinheiro quando for executar na fun player
    {
         return when(type)
        {
            "Tartaruga" -> upgradeTurtle()
            "Pinguim" -> upgradePenguin()
            "Baleia" -> upgradeWhale()
            else -> null
        }
    }
}
class Enemy(var speed : Int, var health : Int, val type : String){
    override fun toString() : String{
        return "$type $health HP"
    }
}
class TowerTypes()
{
    // botei 200 de padrao pro preco no nivel 1 e a soma de atkspeed e damage igual a 5 
    val Tartaruga = Tower(1,2,2,1,"Tartaruga")//tartaruga == dano e penetracao (acerta varios inimigos)
    val Baleia = Tower(2,4,3,1,"Baleia")//baleia == DANO
    val Pinguim = Tower(3,1,2,2,"Pinguim")//pinguim == dano em area e penetracao (acerta varios inimigos)
}
class EnemyTypes(){
    val Plastico = Enemy(1, 1, "Plastico")
    val Canudo = Enemy(1, 5, "Canudo")
    val PacoteDeCanudos = Enemy(2, 10, "PacoteDeCanudos")
    
    val Garrafa = Enemy(2, 8, "Garrafa")
    val Vidro = Enemy(2, 2, "Vidro")

    val Borracha = Enemy(3, 10, "Borracha")
    val Pneu = Enemy(3, 50, "Pneu")

    val DEAD = Enemy(0, 0, "DEAD")
    fun harden(ch: Char, int: Int){
        when(ch){
            '+' ->{
                Plastico.health += int/2
                Canudo.health += int
                PacoteDeCanudos.health += int 
                
                Garrafa.health += int
                Vidro.health += int/2

                Borracha.health += int/2
                Pneu.health += int
                println("inimigos agora possuem +${int} de vida!")
                window.alert("inimigos agora possuem +${int} de vida!")
            }
            '*' ->{
                Plastico.health += int
                Plastico.speed++
                Canudo.health *= int
                Canudo.speed++
                PacoteDeCanudos.health *= int 
                PacoteDeCanudos.speed++
                
                Garrafa.health *= int
                Garrafa.speed++ 
                Vidro.health += int
                Vidro.speed++

                Borracha.health += int
                Borracha.speed++
                Pneu.health *= int
                Pneu.speed++

                println("inimigos agora possuem *{int} de vida!")
                window.alert("inimigos agora possuem *${int} de vida!") 
            }
            else ->{
                println("operacao invalida")
            }
        }
    }
}
class Element<T>(val elementList : MutableList<T>){
    override fun toString(): String{
        if(elementList.isEmpty()){
            return "[##]"
        }else if(elementList.first()=='�'){
            var str = ""
            for(i in 1..elementList.size-1){
                str+=elementList[i].toString()
            }
            return str
        }else{
            return elementList.toString()
        }
    }
}
class NextPista(val x:Int, val y:Int){
    override fun toString() : String{
        return "a proxima pista esta em: $x & $y"
    }
}
class Map(tamanho : Int = 9){
    val position = MutableList(tamanho) {MutableList(tamanho) {Element<Any>(MutableList(0){})}}
    val player = Player("jogador")
    var seconds = 0
    
    fun criarPista() : Boolean{
        return pista(0,0)
    }
    fun pista(posX : Int, posY : Int) : Boolean{
        if(posY <= position.size-1){
            if(posX <= position[position.size-1].size-1){
                if((posX==posY) || (posX%2==0 && Math().abs(posX-posY)<=1)){
                    this.addElement('�', posX, posY)
                }
                return pista(posX+1, posY)
            }
            return pista(0, posY+1)
        }else{
            this.addElement('�', position[position.size-1].size-1, position.size-1)
            return true
        }
    }
    fun nextPista(posX : Int, posY : Int) : NextPista?{
        if(posY < position.size-1 && posX < position.size-1){
            if(position[posY+1][posX].elementList.isEmpty() || position[posY+1][posX].elementList.first() is Tower){
                return NextPista(posY, posX+1)
            }else{
                return NextPista(posY+1, posX)
            }
        }else if(posX==position.size-1){
            if(posY!=position.size-1){
                if(position[posY+1][posX].elementList.first() == '�'){
                    return NextPista(posY+1, posX)
                }else{
                    return null
                }
            }else{
                return null
            }
        }else{
            if(position[posY][posX+1].elementList.first() == '�'){
                return NextPista(posY, posX+1)
            }else{
                return null
            }
        }
    }
    fun addElement(element : Any?, y : Int, x : Int) : Boolean{
        if(element != null){
            if(position[y][x].elementList.isEmpty()){
                if(element is Tower){
                    if(player.money>=element.price){
                        position[y][x].elementList.add(element)
                        player.money-=element.price
                        return true
                    }else{
                        println("sem dinheiro!")
                        return false
                    }
                }else{
                    position[y][x].elementList.add(element)
                    return true
                }
            }else if(position[y][x].elementList.first()=='�'){ //pista
                if(element is Enemy){ //se for um inimigo
                    position[y][x].elementList.add(element)
                    return true
                }else{
                    println("nao se pode construir na pista")
                    return false
                }
            }else{
                println("\nnao se pode construir em outras torres")
                return false
            }
        }else{
            return false
        }
    }
    fun remElement(y : Int, x : Int) : Any?{
        if(!position[y][x].elementList.isEmpty()){
        	if(position[y][x].elementList.first() is Tower){
                val removed = position[y][x].elementList.first()
                position[y][x].elementList.remove(position[y][x].elementList.first())
                return removed
            }else if(position[y][x].elementList.first()=='�'){
                val removed = position[y][x].elementList[1]
                position[y][x].elementList.remove(position[y][x].elementList[1])
                return removed
            }
        }else{
            println("nao e possivel remover de um lugar vazio")
        }
        return null
    }
    fun interaction(y : Int, x : Int){
        val element = position[y][x].elementList
        if(!element.isEmpty()){
        	if(element.first() == '�'){
                val l = MutableList<Any>(0){}
                for(i in 1..element.size-1){
                    l.add(element[i])
                }
                for(i in 0..l.size-1){
                    val enemy = l[i] as Enemy
                    if(seconds%enemy.speed==0){
                        val walking = nextPista(y, x)
                        if(walking!=null){
                            element.remove(enemy)
                            addElement(enemy, walking.x, walking.y)
                        }else{
                            element.remove(enemy)
                            player.health -= enemy.health
                        }
                    }
                }
            }
            else if(element.first() is Tower){
                val torre = element.first() as Tower
                if(seconds%torre.atkSpeed==0)
                {
                    towerAtk(torre, y, x)
                }
                
           	}
        }
    }
    
    fun towerAtk(torre : Tower,y : Int , x : Int, contx : Int=0 ,conty : Int=0)
    {
        var jaAtacou = false
        if(x-(torre.range-contx)>=0 && y-(torre.range-conty) >=0 && x-(torre.range-contx)<position.size-1 && y-(torre.range-conty)<position.size-1 && Math().abs(torre.range-contx+(torre.range-conty))<=torre.range && !position[y-(torre.range-conty)][x-(torre.range-contx)].elementList.isEmpty())// horizontal pra esquerda
        {
            val element =position[y-(torre.range-conty)][x-(torre.range-contx)].elementList
                if(element.first()=='�' && element.size>1)//pista com inimigo
                {
                    val l = MutableList<Any>(0){}
                    if(torre.pierce<=element.size-1){
                        for(i in 1..torre.pierce){
                            l.add(element[i])
                        }
                    }else{
                        for(i in 1..element.size-1){
                            l.add(element[i])
                        }
                    }
                    if(!(torre.type=="Pinguim")){
                        jaAtacou=true
                    }
                    for(i in 0..l.size-1){
                        remElement(y-(torre.range-conty), x-(torre.range-contx))
                        val enemy = l[i] as Enemy
                        val removed = onHit(enemy, torre.damage)
                        if(removed.type!="DEAD")
                        {
                            addElement(removed,y-(torre.range-conty),x-(torre.range-contx))
                        }
                        println(" +$${4*torre.damage}")
                        player.money+=4*torre.damage // modificar aqui para mudar o dinheiro que o jogador recebe
                        player.points+=(torre.damage*player.health)
                    }
                }
        }
        if(contx<=2*torre.range-1)
        {
            if(!jaAtacou){
                towerAtk(torre,y,x,contx+1,conty)
            }
        }
        else
        {
            if(conty<=2*torre.range-1)
            {
                if(!jaAtacou){
                    towerAtk(torre,y,x,0,conty+1)
                }
            }
        }
    }
    
    fun onHit(enemy : Enemy, damageDealt : Int) : Enemy{
       if(enemy.type != "DEAD"){
           print("${enemy.type} $enemy HP Sofreu $damageDealt de dano -> ")
           if(enemy.health-damageDealt==0){
                print("virou ${lesserEnemy(enemy).type}")
                return lesserEnemy(enemy)
            }else if(enemy.health-damageDealt<0){
                print("virou ${onHit(lesserEnemy(enemy), damageDealt-enemy.health).type} ${onHit(lesserEnemy(enemy), damageDealt-enemy.health)}")
                return onHit(lesserEnemy(enemy), damageDealt-enemy.health)
            }else{
                print("${enemy.type} ${enemy.health-damageDealt} ")
                return Enemy(enemy.speed, enemy.health-damageDealt, enemy.type)
            }
        }else{
            return enemy
        }
    }
    fun lesserEnemy(enemy : Enemy) : Enemy{
        return when(enemy.type){
            "PacoteDeCanudos" -> EnemyTypes().Canudo
            "Canudo" -> EnemyTypes().Plastico
            "Garrafa" -> EnemyTypes().Vidro
            "Pneu" -> EnemyTypes().Borracha
            else -> EnemyTypes().DEAD
        }
    }
    override fun toString():String{
        return auxiliar()
    }
    fun auxiliar(posX:Int=0, posY:Int=0) : String{
        var str = ""
        if(posX <= position.size-1){  
            if(posY <= position.size-1){
                if(position[posX][posY].elementList.isEmpty()){
                    str = """<button title="Clique aqui para adicionar ${torreSelecionada.type}! Custo: $200" style = "background-image: url('sand.png'); cursor: pointer; width: 20px; height: 20px;" id= "btn${posX}${posY}"></button>"""
                }else if(position[posX][posY].elementList.first() is Tower){
                    val torre = position[posX][posY].elementList.first() as Tower
                    if(torre.type=="Tartaruga"){
                        if(seconds%torre.atkSpeed==0){
                            str = """<button title ="${position[posX][posY].elementList.toString()}" style = "background-image: url('tartaruga_attack.png'); cursor: pointer; width: 20px; height: 20px;" id= "btn${posX}${posY}"></button>"""
                        }else{
                            str = """<button title ="${position[posX][posY].elementList.toString()}" style = "background-image: url('tartaruga.png'); cursor: pointer; width: 20px; height: 20px;" id= "btn${posX}${posY}"></button>"""
                        }
                    }else if(torre.type=="Baleia"){
                        if(seconds%torre.atkSpeed==0){
                            str = """<button title ="${position[posX][posY].elementList.toString()}" style = "background-image: url('baleia_attack.png'); cursor: pointer; width: 20px; height: 20px;" id= "btn${posX}${posY}"></button>"""
                        }else{
                            str = """<button title ="${position[posX][posY].elementList.toString()}" style = "background-image: url('baleia.png'); cursor: pointer; width: 20px; height: 20px;" id= "btn${posX}${posY}"></button>"""
                        }
                    }else if(torre.type=="Pinguim"){
                        if(seconds%torre.atkSpeed==0){
                            str = """<button title ="${position[posX][posY].elementList.toString()}" style = "background-image: url('pinguim_attack.png'); cursor: pointer; width: 20px; height: 20px;" id= "btn${posX}${posY}"></button>"""
                        }else{
                            str = """<button title ="${position[posX][posY].elementList.toString()}" style = "background-image: url('pinguim.png'); cursor: pointer; width: 20px; height: 20px;" id= "btn${posX}${posY}"></button>"""
                        }
                    }
                }else{
                    val enemy = position[posX][posY].elementList.last()
                    if(enemy is Enemy){
                        when(enemy.type){
                            "Canudo" -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="canudo.png" style="width: 16px; height: 16px; background-color: blue;"></img>"""
                            "PacoteDeCanudos" -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="pacote_de_canudos.png" style="width: 16px; height: 16px; background-color: blue;"></img>"""
                            "Plastico" -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="plastico.png" style="width: 16px; height: 16px; background-color: blue;"></img>"""
                            "Vidro" -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="vidro.png" style="width: 16px; height: 16px; background-color: blue;"></img>"""
                            "Garrafa" -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="garrafa.png" style="width: 16px; height: 16px; background-color: blue;"></img>"""
                            "Pneu" -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="pneu.png" style="width: 16px; height: 16px; background-color: blue;"></img>"""
                            "Borracha" -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="borracha.png" style="width: 16px; height: 16px; background-color: blue;"></img>"""
                            else -> str = """<img title ="${position[posX][posY].elementList.toString()}" src="sea.png" style="width: 16px; height: 16px;"></img>"""
                        }
                    }else{
                        str = """<img title="Mar Livre de Poluição" src="sea.png" style="width: 16px; height: 16px;"></img>"""
                    }
                }
                str += auxiliar(posX, posY+1)
            }else{
                str = "<br>\n" + auxiliar(posX+1, 0)
            }
        }
        return str
    }
    fun interact(x : Int=position.size-1, y : Int=position.size-1){
        interaction(x, y)
        if(x>0){
            interact(x-1, y)
        }else if(y>0){
            interact(position.size-1,y-1)
        }
    }
    fun addEvents(posX:Int=0, posY:Int=0){
    if(posX <= position.size-1){  
        if(posY <= position.size-1){
            if(position[posX][posY].elementList.isEmpty()){
                val btn = document.getElementById("btn${posX}${posY}") as HTMLButtonElement?
                if(btn!=null){
                    btn.addEventListener("click", {
                        addElement(torreSelecionada, posX, posY)
                    })
                }
            }else if(position[posX][posY].elementList.first() is Tower){
                val element = position[posX][posY].elementList.first() as Tower
                val btn = document.getElementById("btn${posX}${posY}") as HTMLButtonElement?
                if(btn!=null){
                    btn.addEventListener("click", {
                        if(player.money>=(element.price+200)){
                            val up = remElement(posX, posY) as Tower
                            addElement(up.upgrade(), posX, posY)
                        }else{
                            window.alert("dinheiro insuficiente!\natual- $${player.money}\ncusto- $${element.price+200}")
                        }
                    })
                }
            }
            addEvents(posX, posY+1)
        }else{
            addEvents(posX+1, 0)
        }
    }
}
}
fun stopMap(){
    window.clearInterval(interval)
    element.innerHTML = "Fim De Jogo"
}
fun main(){
    val mapaDeJogo = Map(21)
    var levouDano = false
    var easterEgg = false
    val enemy1 = EnemyTypes().Canudo
    val torre = TowerTypes().Baleia
    val centralize = document.getElementById("centralizar") as HTMLDivElement
    val fora_tela =  document.getElementById("fora_de_tela") as HTMLDivElement
    val torre_tartaruga = document.getElementById("botao_tartaruga") as HTMLDivElement
    val torre_baleia = document.getElementById("botao_baleia") as HTMLDivElement
    val torre_pinguim = document.getElementById("botao_pinguim") as HTMLDivElement
    val titulo =  document.getElementById("torres") as HTMLDivElement
    var ganhou = false
    centralize.innerHTML = """
        <button id="btn1"> Jogar</button>
        <button id="btn2"> Tutorial</button>
    """
    val btn1 = document.getElementById("btn1") as HTMLButtonElement
    val btn2 = document.getElementById("btn2") as HTMLButtonElement
    btn1.addEventListener("click",{
        val enemies = EnemyTypes()
        fora_tela.innerHTML = """
        <button id="btn3" style="height: 90px; width: 100px;"> Parar Execucao</button>
        """ 
        titulo.innerHTML = """
        <h3>Seleção<br> de <br> Torres: </h3>
        """
        val btn3 = document.getElementById("btn3") as HTMLButtonElement
        torre_tartaruga.innerHTML = """
        <button id="btn_tartaruga" style="background-image: url('tartaruga_logo.png'); height: 64px; width: 64px; cursor:pointer" title="Clique para selecionar a Tartaruga (Selecione uma area em branco do mapa para adicionar)
         Tartarugas sao torres que causam dano de forma rapida
         Dar Upgrade em um tartaruga aumenta o seu dano e a quantidade de inimigos atacados
         Custo: $200"></button>
         """
        val btn_tartaruga = document.getElementById("btn_tartaruga") as HTMLButtonElement
        btn_tartaruga.addEventListener("click",{ 
        torreSelecionada = TowerTypes().Tartaruga
        })
         torre_baleia.innerHTML = """
        <button id="btn_baleia" style="background-image: url('whale-big.png'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar a Baleia (Selecione uma area em branco do mapa para adicionar)
        As Baleias sao as torres que causam maior dano. Elas causam dano de forma mediamente rápida.
        Dar Upgrade em uma Baleia aumenta muito o seu dano, porém elas só acertam um inimigo por ataque
        Custo: $200"></button>
         """
        val btn_baleia = document.getElementById("btn_baleia") as HTMLButtonElement
        btn_baleia.addEventListener("click",{ 
        torreSelecionada = TowerTypes().Baleia
        })
         torre_pinguim.innerHTML = """
        <button id="btn_pinguim" style="background-image: url('penguin_logo.png'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar o Pinguim (Selecione uma area em branco do mapa para adicionar)
        Pinguins sao torres que causam dano de forma lenta, mas acertam todos os inimigos no alcance 
        Dar Upgrade em um pinguim aumenta a frequencia de ataque e a quantidade de inimigos atacados
        Custo: $200"></button>
         """
        val btn_pinguim = document.getElementById("btn_pinguim") as HTMLButtonElement
        btn_pinguim.addEventListener("click",{ 
            torreSelecionada = TowerTypes().Pinguim
        })
        btn3.addEventListener("click", {
        window.clearInterval(interval)
        element.innerHTML = "Fim De Jogo"
        window.location.reload()
         })
        stopMap()
        interval = window.setInterval({
            if(mapaDeJogo.seconds%2==0){
                mapaDeJogo.addElement(enemies.Vidro, 0, 0)
                mapaDeJogo.addElement(enemies.PacoteDeCanudos, 0, 0)
            }else if(mapaDeJogo.seconds%3==0){
                mapaDeJogo.addElement(enemies.PacoteDeCanudos, 0, 0)
                mapaDeJogo.addElement(enemies.Garrafa, 0, 0)
            }else if(mapaDeJogo.seconds%5==0){
                mapaDeJogo.addElement(enemies.Garrafa, 0, 0)
                mapaDeJogo.addElement(enemies.Canudo, 0, 0)
            }else if(mapaDeJogo.seconds%7==0){
                mapaDeJogo.addElement(enemies.Pneu, 0, 0)
            }else{
                mapaDeJogo.addElement(enemies.Canudo, 0, 0)
                mapaDeJogo.addElement(enemies.Vidro, 0, 0)
            }
            when(mapaDeJogo.seconds){
                3 -> mapaDeJogo.addElement(enemies.PacoteDeCanudos, 0, 0)
                6 ->{
                        mapaDeJogo.addElement(enemies.Plastico, 0, 0)
                        mapaDeJogo.addElement(enemies.Vidro, 0, 0)
                        mapaDeJogo.addElement(enemies.Garrafa, 0, 0)
                        window.alert("mais vida = mais dano pra ser causado = mais pontos = stonks (?)")
                }
                8 ->{
                        mapaDeJogo.addElement(enemies.Garrafa, 0, 0)
                }
                14 ->{
                        mapaDeJogo.addElement(enemies.Garrafa, 0, 0)
                        mapaDeJogo.addElement(enemies.PacoteDeCanudos, 0, 0)
                        mapaDeJogo.addElement(enemies.PacoteDeCanudos, 0, 0)

                }
                50 ->{
                        enemies.harden('+',2)
                        mapaDeJogo.addElement(enemies.Pneu, 0, 1)
                        mapaDeJogo.addElement(EnemyTypes().Pneu, 0, 1)
                        mapaDeJogo.addElement(EnemyTypes().Pneu, 0, 1)
                        window.alert("bom, teoricamente sim, mas só se o jogador conseguir derrotar os inimigos")
                }
                75 -> {
                    enemies.harden('+',4)
                    if(window.confirm("Você está achando esses pop-ups chatos?")){
                        window.alert("Ótimo.")
                    }else{
                        if(window.confirm("Tem Certeza???????")){
                            window.alert("Ok né")
                        }else{
                            if(window.confirm("""Calma, é não pra não ter certeza de que eles são chatos
ou é porque agora q eu perguntei a confirmação está chato?""")){
                                if(window.confirm("eita é tu só pode responder sim ou não")){
                                    if(window.confirm("OK. Reponda OK se o jogo é incrível e os pop-ups são chatos, e Cancel se o jogo é incrível mas os pop-ups não são chatos")){
                                        window.alert(">:c")
                                    }else{
                                        window.alert("""c:
����� ������������""")
                                        if(!levouDano){
                                            easterEgg = true
                                        }
                                    }
                                }
                            }else{
                                window.alert("Como assim 'Cancel'??? quer saber, deixa pra lá.")
                            }
                        }
                    }
                }
                100 ->{
                        enemies.harden('*',2)
                        mapaDeJogo.addElement(enemies.Pneu, 0, 1)
                        mapaDeJogo.addElement(enemies.Garrafa, 0, 1)
                        mapaDeJogo.addElement(enemies.PacoteDeCanudos, 1, 1)
                        mapaDeJogo.addElement(enemies.PacoteDeCanudos, 1, 1)
                        mapaDeJogo.addElement(enemies.Pneu, 1, 1)
                        window.alert("Cuidado com o round 251...")
                }
                125 -> enemies.harden('+',6)
                150 ->{
                        enemies.harden('*',2)
                        mapaDeJogo.addElement(enemies.Pneu, 4, 4)
                        mapaDeJogo.addElement(enemies.Garrafa, 5, 5)
                        mapaDeJogo.addElement(enemies.Garrafa, 5, 5)
                        mapaDeJogo.addElement(enemies.Garrafa, 4, 4)
                        mapaDeJogo.addElement(enemies.PacoteDeCanudos, 5, 5)
                        window.alert("""Possivelmente eu deixei o jogo impossível.
                        Quer me provar errado?
                        kkkkkjjkkjkjjkkj boa sorte amigo""")
                }
                200 ->{
                        enemies.harden('*',2)
                        mapaDeJogo.addElement(enemies.Garrafa, 4, 4)
                        mapaDeJogo.addElement(enemies.Garrafa, 4, 4)
                        mapaDeJogo.addElement(enemies.Garrafa, 4, 4)
                        mapaDeJogo.addElement(enemies.Garrafa, 5, 5)
                        mapaDeJogo.addElement(enemies.Garrafa, 5, 5)
                        mapaDeJogo.addElement(enemies.Garrafa, 5, 5)
                        mapaDeJogo.addElement(enemies.Garrafa, 6, 6)
                        mapaDeJogo.addElement(enemies.Garrafa, 6, 6)
                        mapaDeJogo.addElement(enemies.Garrafa, 6, 6)
                        mapaDeJogo.addElement(enemies.Garrafa, 6, 6)
                        window.alert("""Opa, perdão pela inconveniência, o Srº Estagiário que estava escrevendo essas mensagens.
                        Ele foi prontamente notificado e retirado da divisão de Interação com o Usuário©
                        Fique tranquilo que não precisará mais ouvir dele.
                        
                        -Sinceramente, Srº Administrador da Silva""")
                }
                250 ->{
                        enemies.harden('*',69)
                        mapaDeJogo.addElement(enemies.Pneu, 8, 8)
                        mapaDeJogo.addElement(enemies.Pneu, 8, 8)
                        mapaDeJogo.addElement(enemies.Pneu, 8, 8)
                        mapaDeJogo.addElement(enemies.Pneu, 8, 9)
                        mapaDeJogo.addElement(enemies.Pneu, 8, 9)
                        mapaDeJogo.addElement(enemies.Pneu, 8, 9)
                        mapaDeJogo.addElement(enemies.Pneu, 9, 9)
                        mapaDeJogo.addElement(enemies.Pneu, 9, 9)
                        mapaDeJogo.addElement(enemies.Pneu, 9, 9)
                        window.alert("""RÁPIDO EU NAO TENHJO MUTKTOIO TEMPO, ELES MENTYRAM PRA MIEM
                        ISSO NAO É UM JUGO. É UMA FARM DE BITCOINS UTILIZ�NDO SEU COMPUTADOR, N�O GANHE O JOGO!1!11!!1!ONZE""")
                }
                254 ->{
                        window.alert("""Mil perdões pelo Ocorrido.
                        Nós dá Software Development Brasil© nos prezamos por trazer o melhor aos nossos clientes.
                        Nenhum de nossos Softwares© possuem qualquer tipo de esquema de bitcoin, e nunca terão.
                        Nós prezamos pela máxima transparência em nossa empresa, e consideramos rumores falsos como este ataques pessoais
                        de nossos concorrentes.
                        Não confie nessas falsidades e termine o jogo normalmente.
                        Obrigado por escolher a Software Development Brasil©
                        
                        Tenha um bom Jogo.
                        -Sinceramente, Srº Administrador da Silva""")
                }
                else -> println("safe round")
            }
            element.innerHTML = """<p><br>${mapaDeJogo.player} <br>Tempo: ${++mapaDeJogo.seconds}/300 <br>${mapaDeJogo.toString()}</p>"""
            mapaDeJogo.addEvents()
            mapaDeJogo.interact()
            if(mapaDeJogo.seconds>=300){
                ganhou = true
            }
            if(mapaDeJogo.player.health<50){
                levouDano = true
            }
            if(ganhou || mapaDeJogo.player.health<=0){
                if(!ganhou){
                    window.alert("""Game Over...
                    True Ending.""")
                    stopMap()
                    element.innerHTML="""<img title="vc perdeu amigo" src="dlc_de_canudo.png"/>"""
                }else{
                    if(!easterEgg){
                        window.alert("""Vitoria! A praia foi defendida com sucesso!
                        Pontuação: ${mapaDeJogo.player.points}
                        Bad Ending...
                        Você gerou ${mapaDeJogo.player.points/(mapaDeJogo.player.health*mapaDeJogo.player.health*mapaDeJogo.player.health*mapaDeJogo.player.health)}BTC. >:D""")
                        stopMap()
                        element.innerHTML="""<img title="vc ganhou amigo" src="dlc_de_canudo.png"/>"""
                    }else{
                        window.alert("""Vitória absoluta c:
Caramba, não perder vida é algo que eu legitimamente não achei q era possivel.
Good Ending!""")
                        stopMap()
                    }
                }
            }
        }, 1500)
    })
    btn2.addEventListener("click", {
        val tutorial = Map(3)
        var gameOver = false
        var dica : String 
        tutorial.criarPista()
        titulo.innerHTML = """
        <h3>Seleção<br> de <br> Torres: </h3>
        """
         torre_tartaruga.innerHTML = """
        <button id="btn_tartaruga" style="background-image: url('tartaruga_logo.png'); height: 64px; width: 64px; cursor:pointer" title="Clique para selecionar a Tartaruga (Selecione uma area em branco do mapa para adicionar)
         Tartarugas sao torres que causam dano de forma rapida
         Dar Upgrade em um tartaruga aumenta o seu dano e a quantidade de inimigos atacados"></button>
         """
        val btn_tartaruga = document.getElementById("btn_tartaruga") as HTMLButtonElement
        btn_tartaruga.addEventListener("click",{ 
        torreSelecionada = TowerTypes().Tartaruga
        })
         torre_baleia.innerHTML = """
        <button id="btn_baleia" style="background-image: url('whale-big.png'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar a Baleia (Selecione uma area em branco do mapa para adicionar)
        As Baleias sao as torres que causam maior dano. Elas causam dano de forma mediamente rápida.
        Dar Upgrade em uma Baleia aumenta muito o seu dano, porém elas só acertam um inimigo por ataque"></button>
         """
        val btn_baleia = document.getElementById("btn_baleia") as HTMLButtonElement
        btn_baleia.addEventListener("click",{ 
        torreSelecionada = TowerTypes().Baleia
        })
         torre_pinguim.innerHTML = """
        <button id="btn_pinguim" style="background-image: url('penguin_logo.png'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar o Pinguim (Selecione uma area em branco do mapa para adicionar)
        Pinguins sao torres que causam dano de forma lenta, mas acertam todos os inimigos no alcance 
        Dar Upgrade em um pinguim aumenta a frequencia de ataque e a quantidade de inimigos atacados"></button>
         """
        val btn_pinguim = document.getElementById("btn_pinguim") as HTMLButtonElement
        btn_pinguim.addEventListener("click",{ 
        torreSelecionada = TowerTypes().Pinguim
        })
        fora_tela.innerHTML = """
        <button id="btn3" style="height: 90px; width: 100px;"> Parar Execucao</button>
        """
        val btn3 = document.getElementById("btn3") as HTMLButtonElement
        btn3.addEventListener("click", {
        window.clearInterval(interval)
        element.innerHTML = "Fim De Jogo"
        window.location.reload()
         })
        stopMap()
        interval = window.setInterval({
            when(tutorial.seconds){
                1 -> tutorial.addElement(EnemyTypes().Canudo, 0, 0)
                5 -> tutorial.addElement(EnemyTypes().Canudo, 0, 0)
                10 -> tutorial.addElement(TowerTypes().Tartaruga, 1, 0)
                11 ->{
                        tutorial.addElement(EnemyTypes().Plastico, 0, 0)
                        tutorial.addElement(EnemyTypes().Vidro, 0, 0)
                }
                13 ->{
                        tutorial.addElement(EnemyTypes().Garrafa, 0, 0)
                        tutorial.addElement(EnemyTypes().Canudo, 0, 0)

                }
                17->{
                        tutorial.addElement(EnemyTypes().Garrafa, 0, 0)
                        tutorial.addElement(EnemyTypes().PacoteDeCanudos, 0, 0)

                }
                else -> println("safe round")
            }
            dica = when(tutorial.seconds){
                0 -> "bem-vindo a plastic defence. Este eh um breve tutorial do jogo"
                1 -> "bem-vindo a plastic defence. Este eh um breve tutorial do jogo"
                2 -> "inimigos surgem no canto superior esquerdo e avançam ateh o canto inferior direito do mapa"
                3 -> "inimigos surgem no canto superior esquerdo e avançam ateh o canto inferior direito do mapa"
                4 -> "inimigos surgem no canto superior esquerdo e avançam ateh o canto inferior direito do mapa"
                5 -> "inimigos surgem no canto superior esquerdo e avançam ateh o canto inferior direito do mapa"
                6 -> "eles apenas andam na pista central, delimitada pelo simbolo �"
                7 -> "eles apenas andam na pista central, delimitada pelo simbolo �"
                8 -> "eles apenas andam na pista central, delimitada pelo simbolo �"
                9 -> "quando atingem o final do mapa, causam dano a sua vida"
                10 -> "quando atingem o final do mapa, causam dano a sua vida"
                11 -> "torres podem ser colocadas somente em espacos vazios"
                12 -> "torres podem ser colocadas somente em espacos vazios"
                13 -> "elas custam dinheiro, mas causam dano a inimigos perto delas"
                14 -> "elas custam dinheiro, mas causam dano a inimigos perto delas"
                15 -> "o dano causado eh convertido em dinheiro"
                16 -> "o dano causado eh convertido em dinheiro"
                17 -> "o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas"
                18 -> "o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas"
                19 -> "o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas"
                else -> ""
            }
            if(tutorial.seconds>=23){
                gameOver = true
            }
            element.innerHTML = """<p><br>${tutorial.player} <br>Tempo: ${++tutorial.seconds} <br>${tutorial.toString()} <br>$dica</p>"""
            tutorial.addEvents()
            tutorial.interact()
            if(gameOver || tutorial.player.health<=0){
                window.alert("Parabens por finalizar o tutorial!\n Clique em Jogar para iniciar o jogo principal.")
                stopMap()
            }
        }, 2000)
        })

    mapaDeJogo.criarPista()
    mapaDeJogo.addElement(torre, 1, 2)
    mapaDeJogo.addElement(enemy1, 2, 1)
    mapaDeJogo.addElement(TowerTypes().Tartaruga, 5, 4)
    mapaDeJogo.addElement(EnemyTypes().PacoteDeCanudos, 0, 0)
    mapaDeJogo.addElement(EnemyTypes().PacoteDeCanudos, 5, 5)

    
}