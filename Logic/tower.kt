//tower and player-base-code
class player(val name :String,val points:Int=0,var money:Int=0,val health : Int=100)//depois mudar o dinheiro inicial(1 fase) e por enquanto o dinheiro vai ser var , quiser pode tentar mudar
{
    override fun toString() : String{
        return "$name | $points | $money"
    }
    fun createTower(type : String) : Tower? // criar no nivel 1 ok
    {
        if(money>=200)
        {
            money-=200 // tiro logo aqui o dinheiro pra n precisar botar em cada if
            if(type.equals("Tartaruga"))
            	return towerTypes().Tartaruga
            else if(type.equals("Baleia"))
            	return towerTypes().Baleia
            else if(type.equals("Pinguim"))
            	return towerTypes().Pinguim
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
}
class towerTypes()
{
    // botei 200 de padrao pro preco no nivel 1 e a soma de atkspeed e damage igual a 5 
    val Tartaruga = Tower(2,3,2,"Tartaruga")//tartaruga vou upar ambos
    val Baleia = Tower(1,4,4,"Baleia")//baleia vou upar mais o dano
    val Pinguim = Tower(3,2,2,"Pinguim")//pinguim vou upar mais a velocidade
}
fun main()
{
    val jogador =player("Cotoco",0,money=600,100)
    println(jogador)
    val tartaruga = jogador.createTower("Tartaruga")
    println(tartaruga)
    if(tartaruga!=null)
    {
        val tartaruga2 = jogador.upgradeTower(tartaruga)
    }
   	
    
}