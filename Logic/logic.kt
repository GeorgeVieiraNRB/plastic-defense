class Player(val name :String, var points:Int=0, var money:Int=400, var health : Int=100)//depois mudar o dinheiro inicial(1 fase) e por enquanto o dinheiro vai ser var , quiser pode tentar mudar
{
    override fun toString() : String{
        return "$name | $points | $money |$health"
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
class Tower(val atkSpeed : Int, val damage : Int,val range : Int,val type : String,val level : Int=1,var price : Int=200*(level+1))//preco do proximo nivel
{
    override fun toString() : String{
        return "$type lvl.$level $atkSpeed $damage $range"
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
    fun attack(){
        print("wat")
    }
}
class Enemy(val speed : Int, val health : Int, val type : String){
    override fun toString() : String{
        return type + " $health.HP"
    }
    fun walk(){
        
    }
}
class TowerTypes()
{
    // botei 200 de padrao pro preco no nivel 1 e a soma de atkspeed e damage igual a 5 
    val Tartaruga = Tower(2,3,2,"Tartaruga")//tartaruga vou upar ambos
    val Baleia = Tower(1,4,4,"Baleia")//baleia vou upar mais o dano
    val Pinguim = Tower(3,2,2,"Pinguim")//pinguim vou upar mais a velocidade
}
class EnemyTypes(){
    val Plastico = Enemy(1, 1, "Plastico")
    val Canudo = Enemy(1, 2, "Canudo")
    val PacoteDeCanudos = Enemy(1, 5, "PacoteDeCanudos")
    
    val Vidro = Enemy(2, 1, "Vidro")
}
class Element<T>(val elementList : MutableList<T>){
    override fun toString(): String{
        if(elementList.isEmpty()){
            return "[  ]"
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
class Map(){
    val position = MutableList(9) {MutableList(9) {Element<Any>(MutableList(0){})}}
    val player = Player("jogador")
    
    fun criarPista() : Boolean{
        return pista(0,0)
    }
    fun pista(posX : Int, posY : Int) : Boolean{
        if(posY <= position.size-1){
            if(posX <= position[position.size-1].size-1){
                if((posX==posY) || (posX%2==0 && Math.abs(posX-posY)<=1)){
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
        if(posY < position.size-1 && posX < position[position.size-1].size-1){
            if(position[posY+1][posX].elementList.isEmpty() || position[posY+1][posX].elementList.first() is Enemy){
                return NextPista(posY, posX+1)
            }else{
                return NextPista(posY+1, posX)
            }
        }else{
            return null
        }
    }
    
    fun addElement(element : Any?, y : Int, x : Int) : Boolean{
        if(element != null){
            if(position[y][x].elementList.isEmpty()){
                position[y][x].elementList.add(element)
                return true
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
                if(position[y][x].elementList.last() is Enemy){
                    val removed = position[y][x].elementList.last()
                    position[y][x].elementList.remove(position[y][x].elementList.last())
                    return removed
                }
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
                if(element is Enemy){
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
                position[y][x].elementList.first()
           	}
        }
    }
    fun onHit(enemy : Enemy, damageDealt : Int) : Enemy?{
       if(enemy.type != "DEAD"){
           print("$enemy Sofreu $damageDealt de dano -> ")
           if(enemy.health-damageDealt==0){
                return lesserEnemy(enemy)
            }else if(enemy.health-damageDealt<0){
                return onHit(lesserEnemy(enemy), damageDealt-enemy.health)
            }else{
                return Enemy(enemy.speed, enemy.health-damageDealt, enemy.type)
            }
        }else{
           return enemy
       }
    }
    fun onLeak(enemy : Enemy){
        //damagePlayer(health)
    }
    fun lesserEnemy(enemy : Enemy) : Enemy{
        return when(enemy.type){
            "PacoteDeCanudos" -> EnemyTypes().Canudo
            "Canudo" -> EnemyTypes().Plastico
            else -> Enemy(0, 0, "DEAD")
        }
    }
    override fun toString() : String{
        return auxiliar(0)
    }
    fun auxiliar(pos : Int) : String{
        if(pos >= position.size-1){
            return position[position.size-1].toString()
        }else{
            return position[pos].toString() + "\n" + auxiliar(pos+1)
        }
    }
}
fun main(){
    val mapaDeJogo = Map()
    val enemy1 = EnemyTypes().Canudo
    var gameOver = false
    var seconds = 0
    mapaDeJogo.criarPista()
    mapaDeJogo.addElement('x', 2, 1)
    mapaDeJogo.addElement(enemy1, 2, 1)
    mapaDeJogo.addElement(EnemyTypes().PacoteDeCanudos, 2, 1)
    mapaDeJogo.addElement(EnemyTypes().PacoteDeCanudos, 8, 8)
    mapaDeJogo.interaction(2,1)
    mapaDeJogo.interaction(8,8)
    println(mapaDeJogo.toString())
    println(mapaDeJogo.nextPista(2,1))
    println(mapaDeJogo.player)
    //while(!gameOver){
        
        //println(mapaDeJogo)
        //if(++seconds >=5){
            //gameOver = true
        //}
    //}
    // bug: dano tem que passar atraves das iteracoes do inimigo
}