class Element<T>(val elementList : MutableList<T>){
    override fun toString(): String{
        if(elementList.isEmpty()){
            return "[  ]"
        }else{
            return elementList.toString()
        }
    }
}
class Map(){
    val position = MutableList(7) {MutableList(7) {Element<Any>(MutableList(0){})}}
    
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
    
    fun addElement(element : Any, x : Int, y : Int) : Boolean{
        if(position[y][x].elementList.isEmpty()){
        	position[y][x].elementList.add(element)
            return true
        }else if(position[y][x].elementList.first()=='�'){ //pista
            if(false){ //se for um inimigo
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
    }
    fun remElement(x : Int, y : Int){
        if(!position[y][x].elementList.isEmpty()){
        	if(false){ //for uma torre
                //reembolsar()
                position[y][x].elementList.remove(position[y][x].elementList.first())
            }else if(position[y][x].elementList.first()=='�'){
                println("nao e possivel remover uma pista")
            }
        }else{
            print("nao e possivel remover de um lugar vazio")
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
    mapaDeJogo.criarPista()
    mapaDeJogo.addElement('x', 2, 1)
    mapaDeJogo.remElement(2, 1)
    mapaDeJogo.addElement("y", 2, 1)
    print(mapaDeJogo.toString())   
}