package logic

import kotlinx.browser.*
import org.w3c.dom.*

val element = document.getElementById("tela_do_jogo") as HTMLDivElement
var interval = 0
var torreSelecionada = TowerTypes().Tartaruga as Tower

class Math(){
    fun abs(valor:Int):Int{
        if(valor>=0){
            return valor
        }else{
            return valor*-1
        }
    }
}
class Player(val name :String, var points:Int=0, var money:Int=400, var health : Int=50)//depois mudar o dinheiro inicial(1 fase) e por enquanto o dinheiro vai ser var , quiser pode tentar mudar
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
class Tower(val atkSpeed : Int, val damage : Int,val range : Int,val type : String,val level : Int=1,var price : Int=200*(level))//preco do proximo nivel
{
    override fun toString() : String{
        return "${type[0]}"
    }
    //fazer 3 funcoes , uma pra upar cada tipo de torre ,qualquer coisa da pra usar funcao lambda pra diminuir depois
    //sao privados pois so vou usar los aqui ,executar los por meio de outra fun
    private fun upgradeTurtle(basiclvl : Int=level,lvl: Int) : Tower // eu fiz outro parametro so pra manter paradigma funcional , se fizesse uma recurssao com variavel "global" n seria funcional
    {
        if(basiclvl==lvl)
        {
            return Tower(atkSpeed+2*level,damage+2*level,range+2*level,"Tartaruga",lvl)//tartaruga vou upar ambos
        }
        else
        {
            return upgradeTurtle(basiclvl+1,lvl)
        }
    }
    private fun upgradePenguin(basiclvl : Int=level,lvl: Int) : Tower // eu fiz outro parametro so pra manter paradigma funcional , se fizesse uma recurssao com variavel "global" n seria funcional
    {
        if(basiclvl==lvl)
        {
            return Tower(atkSpeed+4*level,damage+1*level,range+2*level,"Pinguim",lvl)//pinguim vou upar mais a velocidade
        }
        else
        {
            return upgradePenguin(basiclvl+1,lvl)
        }
    }
    private fun upgradeWhale(basiclvl : Int=level,lvl: Int) : Tower // eu fiz outro parametro so pra manter paradigma funcional , se fizesse uma recurssao com variavel "global" n seria funcional
    {
        if(basiclvl==lvl)
        {
            return Tower(atkSpeed+1*level,damage+4*level,range+2*level,"Baleia",lvl)//baleia vou upar mais o dano
        }
        else
        {
            return upgradeWhale(basiclvl+1,lvl)
        }
    }
    fun upgrade() : Tower? // n ligar pro dinheiro agr, vou ligar pro dinheiro quando for executar na fun player
    {
         return when(type)
        {
            "Tartaruga" -> upgradeTurtle(level,level+1)
            "Pinguim" -> upgradePenguin(level,level+1)
            "Baleia" -> upgradeWhale(level,level+1)
            else -> null
        }
    }
}
class Enemy(val speed : Int, val health : Int, val type : String){
    override fun toString() : String{
        return "$health"
    }
}
class TowerTypes()
{
    // botei 200 de padrao pro preco no nivel 1 e a soma de atkspeed e damage igual a 5 
    val Tartaruga = Tower(2,3,2,"Tartaruga")//tartaruga vou upar ambos
    val Baleia = Tower(1,4,3,"Baleia")//baleia vou upar mais o dano
    val Pinguim = Tower(3,2,2,"Pinguim")//pinguim vou upar mais a velocidade
}
class EnemyTypes(){
    val Plastico = Enemy(1, 1, "Plastico")
    val Canudo = Enemy(1, 2, "Canudo")
    val PacoteDeCanudos = Enemy(2, 5, "PacoteDeCanudos")
    
    val Garrafa = Enemy(2, 4, "Garrafa")
    val Vidro = Enemy(2, 1, "Vidro")
    val DEAD = Enemy(0, 0, "DEAD")
}
class Element<T>(val elementList : MutableList<T>){
    override fun toString(): String{
        if(elementList.isEmpty()){
            return "[##]"
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
                //reembolsar()
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
        if(!position[y][x].elementList.isEmpty()){
        	if(position[y][x].elementList.first() == '�'){
                val element = position[y][x].elementList.last()
                if(element is Enemy && seconds%element.speed==0){
                    val walking = nextPista(y, x)
                    if(walking!=null){
                    	addElement(remElement(y, x), walking.x, walking.y)
                    }else{
                        remElement(y, x)
                        player.health -= element.health
                    }
                    interaction(y, x)
                }
            }
            else if(position[y][x].elementList.first() is Tower){
                val element =position[y][x].elementList.first()
                if(element is Tower && seconds%element.atkSpeed==0)
                {
                    towerAtk(element,y,x)
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
                    val l = element[1]//so atira no ultimo , implementar penetraçao / verificar se eh dead
                    if(l is Enemy)
                    {
                        jaAtacou=true
                        remElement(y-(torre.range-conty),x-(torre.range-contx))
                        val removed = onHit(l,torre.damage)
                        if(removed.type!="DEAD")
                        {
                            addElement(removed,y-(torre.range-conty),x-(torre.range-contx))
                        }
                        println(" +$${10*torre.damage}")
                        player.money+=10*torre.damage // modificar aqui para mudar o dinheiro que o jogador recebe
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
                    str = """<button id= btn>${position[posX][posY].toString()}</button>"""
                    val btn = document.getElementById("btn") as HTMLButtonElement?
                    if(btn!=null){
                        btn.addEventListener("click", {
                            window.alert("FODASE")
                            print("click!")
                        })
                    }
                    str += auxiliar(posX, posY+1)
                }else{
                    str = position[posX][posY].toString() + auxiliar(posX, posY+1)
                }
            }else{
                str = "<br>\n" + auxiliar(posX+1, 0)
            }
        }else{
            println("belo pau amigo")
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
}
fun stopMap(){
    window.clearInterval(interval)
    element.innerHTML = "Fim De Jogo"
}
fun main(){
    val mapaDeJogo = Map(21)
    val enemy1 = EnemyTypes().Canudo
    val torre = TowerTypes().Baleia
    val centralize = document.getElementById("centralizar") as HTMLDivElement
    centralize.innerHTML = """
        <button id="btn1"> Baixaria</button>
        <button id="btn2"> Tutorial</button>
        <button id="btn3"> Parar Execucao</button>
    """
    val btn1 = document.getElementById("btn1") as HTMLButtonElement
    val btn2 = document.getElementById("btn2") as HTMLButtonElement
    val btn3 = document.getElementById("btn3") as HTMLButtonElement
    btn1.addEventListener("click",{
        stopMap()
        interval = window.setInterval({
            mapaDeJogo.interact()
            element.innerHTML = "<br>${mapaDeJogo.player} <br>iteracao: ${++mapaDeJogo.seconds} <br>${mapaDeJogo.toString()}"
        }, 2000)
    })
    btn2.addEventListener("click", {
        val tutorial = Map(3)
        var gameOver = false
        var dica : String 
        tutorial.criarPista()
        stopMap()
        interval = window.setInterval({
            when(tutorial.seconds){
                1 -> tutorial.addElement(EnemyTypes().Canudo, 0, 0)
                7 -> tutorial.addElement(TowerTypes().Tartaruga, 1, 0)
                9 ->{
                        tutorial.addElement(EnemyTypes().Plastico, 0, 0)
                        tutorial.addElement(EnemyTypes().Vidro, 0, 0)
                }
                12 ->{
                        tutorial.addElement(EnemyTypes().Garrafa, 0, 0)
                        tutorial.addElement(EnemyTypes().Canudo, 0, 0)

                }
                else -> null
            }
            dica = when(tutorial.seconds){
                0 -> "bem-vindo a plastic defence. Este eh um breve tutorial do jogo"
                1 -> "inimigos surgem no canto superior esquerdo e avançam ateh o canto inferior direito do mapa"
                2 -> "inimigos surgem no canto superior esquerdo e avançam ateh o canto inferior direito do mapa"
                3 -> "inimigos surgem no canto superior esquerdo e avançam ateh o canto inferior direito do mapa"
                4 -> "eles apenas andam na pista central, delimitada pelo simbolo �"
                5 -> "eles apenas andam na pista central, delimitada pelo simbolo �"
                6 -> "quando atingem o final do mapa, causam dano a sua vida"
                7 -> "torres podem ser colocadas somente em espacos vazios"
                8 -> "torres podem ser colocadas somente em espacos vazios"
                9 -> "elas custam dinheiro, mas causam dano a inimigos perto delas"
                10 -> "elas custam dinheiro, mas causam dano a inimigos perto delas"
                11 -> "o dano causado eh convertido em dinheiro"
                12 -> "o dano causado eh convertido em dinheiro"
                13 -> "o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas"
                14 -> "o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas"
                15 -> "o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas"
                else -> ""
            }
            if(tutorial.seconds>=20){
                gameOver = true
            }
            tutorial.interact()
            element.innerHTML = "<br>${tutorial.player} <br>iteracao: ${++tutorial.seconds} <br>${tutorial.toString()} <br>$dica"
            if(gameOver){
                stopMap()
            }
        }, 2000)
        })
    btn3.addEventListener("click", {
        window.clearInterval(interval)
        element.innerHTML = "Fim De Jogo"
    })

    mapaDeJogo.criarPista()
    mapaDeJogo.addElement(torre, 1, 2)
    mapaDeJogo.addElement(enemy1, 2, 1)
    mapaDeJogo.addElement(EnemyTypes().PacoteDeCanudos, 0, 0)
    mapaDeJogo.addElement(EnemyTypes().PacoteDeCanudos, 5, 5)
}