class Enemy(val speed : Int, val health : Int, val type : String){
    override fun toString() : String{
        return type + " $health.HP"
    }
}

class Interaction(){
    fun onHit(enemy : Enemy, damageDealt : Int) : Enemy?{
       if(enemy.type != "DEAD"){
           print("$enemy Sofreu $damageDealt de dano -> ")
           if(enemy.health-damageDealt==0){
                return lesserEnemy(enemy)
            }else if(enemy.health-damageDealt<0){
                return Interaction().onHit(lesserEnemy(enemy), damageDealt-enemy.health)
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
}
class EnemyTypes(){
    val Plastico = Enemy(1, 1, "Plastico")
    val Canudo = Enemy(1, 2, "Canudo")
    val PacoteDeCanudos = Enemy(1, 5, "PacoteDeCanudos")
    
    val Vidro = Enemy(2, 1, "Vidro")
}
fun main(){
    println(Interaction().onHit(EnemyTypes().PacoteDeCanudos, 5))
    println(Interaction().onHit(EnemyTypes().Vidro, 4))
}