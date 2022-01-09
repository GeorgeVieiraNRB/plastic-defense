if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'logic'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'logic'.");
}var logic = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var equals = Kotlin.equals;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var print = Kotlin.kotlin.io.print_s8jyv4$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var toString = Kotlin.toString;
  var Unit = Kotlin.kotlin.Unit;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var element;
  var interval;
  var torreSelecionada;
  function Math_0() {
  }
  Math_0.prototype.abs_za3lpa$ = function (valor) {
    if (valor >= 0) {
      return valor;
    } else {
      return valor * -1 | 0;
    }
  };
  Math_0.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Math',
    interfaces: []
  };
  function Player(name, points, money, health) {
    if (points === void 0)
      points = 0;
    if (money === void 0)
      money = 400;
    if (health === void 0)
      health = 50;
    this.name = name;
    this.points = points;
    this.money = money;
    this.health = health;
  }
  Player.prototype.toString = function () {
    return this.name + ' | ' + this.points + ' | ' + '$' + this.money + ' | HP:' + this.health;
  };
  Player.prototype.createTower_61zpoe$ = function (type) {
    if (this.money >= 200) {
      this.money = this.money - 200 | 0;
      if (equals(type, 'Tartaruga'))
        return (new TowerTypes()).Tartaruga;
      else if (equals(type, 'Baleia'))
        return (new TowerTypes()).Baleia;
      else if (equals(type, 'Pinguim'))
        return (new TowerTypes()).Pinguim;
      else
        this.money = this.money + 200 | 0;
      return null;
    } else {
      println('LISO');
      return null;
    }
  };
  Player.prototype.upgradeTower_fnlwo7$ = function (torre) {
    if (this.money >= torre.price) {
      var t = torre.upgrade();
      println(t);
      this.money = this.money - torre.price | 0;
      println('\nUPOU A TORRE');
    } else {
      print('LISO');
    }
  };
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function Tower(atkSpeed, damage, range, pierce, type, level, price) {
    if (level === void 0)
      level = 1;
    if (price === void 0)
      price = 200 * level | 0;
    this.atkSpeed = atkSpeed;
    this.damage = damage;
    this.range = range;
    this.pierce = pierce;
    this.type = type;
    this.level = level;
    this.price = price;
  }
  Tower.prototype.toString = function () {
    return this.type + ' lvl' + this.level + '\n' + '        Clique aqui para dar upgrade pro lvl' + (this.level + 1 | 0) + '!' + '\n' + '        Custo: ' + (200 * (this.level + 1 | 0) | 0);
  };
  Tower.prototype.upgradeTurtle_0 = function () {
    return new Tower(this.atkSpeed, this.damage + 1 | 0, this.range, this.pierce + 1 | 0, 'Tartaruga', this.level + 1 | 0);
  };
  Tower.prototype.upgradePenguin_0 = function () {
    if (this.atkSpeed > 2) {
      return new Tower(this.atkSpeed - 1 | 0, this.damage + 1 | 0, this.range, this.pierce, 'Pinguim', this.level + 1 | 0);
    } else {
      return new Tower(this.atkSpeed, this.damage, this.range, this.pierce + 1 | 0, 'Pinguim', this.level + 1 | 0);
    }
  };
  Tower.prototype.upgradeWhale_0 = function () {
    return new Tower(this.atkSpeed, this.damage + 2 | 0, this.range, this.pierce, 'Baleia', this.level + 1 | 0);
  };
  Tower.prototype.upgrade = function () {
    var tmp$;
    switch (this.type) {
      case 'Tartaruga':
        tmp$ = this.upgradeTurtle_0();
        break;
      case 'Pinguim':
        tmp$ = this.upgradePenguin_0();
        break;
      case 'Baleia':
        tmp$ = this.upgradeWhale_0();
        break;
      default:tmp$ = null;
        break;
    }
    return tmp$;
  };
  Tower.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Tower',
    interfaces: []
  };
  function Enemy(speed, health, type) {
    this.speed = speed;
    this.health = health;
    this.type = type;
  }
  Enemy.prototype.toString = function () {
    return this.type + ' ' + this.health + ' HP';
  };
  Enemy.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Enemy',
    interfaces: []
  };
  function TowerTypes() {
    this.Tartaruga = new Tower(1, 3, 2, 1, 'Tartaruga');
    this.Baleia = new Tower(2, 4, 3, 1, 'Baleia');
    this.Pinguim = new Tower(4, 1, 2, 2, 'Pinguim');
  }
  TowerTypes.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TowerTypes',
    interfaces: []
  };
  function EnemyTypes() {
    this.Plastico = new Enemy(1, 2, 'Plastico');
    this.Canudo = new Enemy(1, 5, 'Canudo');
    this.PacoteDeCanudos = new Enemy(2, 10, 'PacoteDeCanudos');
    this.Garrafa = new Enemy(2, 8, 'Garrafa');
    this.Vidro = new Enemy(2, 3, 'Vidro');
    this.Borracha = new Enemy(3, 5, 'Borracha');
    this.Pneu = new Enemy(3, 20, 'Pneu');
    this.DEAD = new Enemy(0, 0, 'DEAD');
  }
  EnemyTypes.prototype.harden_s9u7hn$ = function (ch, int) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10, tmp$_11, tmp$_12;
    switch (ch) {
      case 43:
        tmp$ = this.Plastico;
        tmp$.health = tmp$.health + (int / 2 | 0) | 0;
        tmp$_0 = this.Canudo;
        tmp$_0.health = tmp$_0.health + int | 0;
        tmp$_1 = this.PacoteDeCanudos;
        tmp$_1.health = tmp$_1.health + int | 0;
        tmp$_2 = this.Garrafa;
        tmp$_2.health = tmp$_2.health + int | 0;
        tmp$_3 = this.Vidro;
        tmp$_3.health = tmp$_3.health + (int / 2 | 0) | 0;
        tmp$_4 = this.Borracha;
        tmp$_4.health = tmp$_4.health + (int / 2 | 0) | 0;
        tmp$_5 = this.Pneu;
        tmp$_5.health = tmp$_5.health + int | 0;
        println('inimigos agora possuem +' + int + ' de vida!');
        break;
      case 42:
        tmp$_6 = this.Plastico;
        tmp$_6.health = tmp$_6.health + int | 0;
        tmp$_7 = this.Canudo;
        tmp$_7.health = Kotlin.imul(tmp$_7.health, int);
        tmp$_8 = this.PacoteDeCanudos;
        tmp$_8.health = Kotlin.imul(tmp$_8.health, int);
        tmp$_9 = this.Garrafa;
        tmp$_9.health = Kotlin.imul(tmp$_9.health, int);
        tmp$_10 = this.Vidro;
        tmp$_10.health = tmp$_10.health + int | 0;
        tmp$_11 = this.Borracha;
        tmp$_11.health = tmp$_11.health + int | 0;
        tmp$_12 = this.Pneu;
        tmp$_12.health = Kotlin.imul(tmp$_12.health, int);
        println('inimigos agora possuem *{int} de vida!');
        break;
      default:println('operacao invalida');
        break;
    }
  };
  EnemyTypes.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EnemyTypes',
    interfaces: []
  };
  function Element(elementList) {
    this.elementList = elementList;
  }
  Element.prototype.toString = function () {
    var tmp$;
    if (this.elementList.isEmpty()) {
      return '[##]';
    } else if (equals(first(this.elementList), toBoxedChar(65533))) {
      var str = '';
      tmp$ = this.elementList.size - 1 | 0;
      for (var i = 1; i <= tmp$; i++) {
        str += toString(this.elementList.get_za3lpa$(i));
      }
      return str;
    } else {
      return this.elementList.toString();
    }
  };
  Element.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Element',
    interfaces: []
  };
  function NextPista(x, y) {
    this.x = x;
    this.y = y;
  }
  NextPista.prototype.toString = function () {
    return 'a proxima pista esta em: ' + this.x + ' & ' + this.y;
  };
  NextPista.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NextPista',
    interfaces: []
  };
  function Map(tamanho) {
    if (tamanho === void 0)
      tamanho = 9;
    var size = tamanho;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = tamanho;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        var tmp$_0 = list_0.add_11rb$;
        var list_1 = ArrayList_init(0);
        for (var index_1 = 0; index_1 < 0; index_1++) {
          list_1.add_11rb$(Unit);
        }
        tmp$_0.call(list_0, new Element(list_1));
      }
      tmp$.call(list, list_0);
    }
    this.position = list;
    this.player = new Player('jogador');
    this.seconds = 0;
  }
  Map.prototype.criarPista = function () {
    return this.pista_vux9f0$(0, 0);
  };
  Map.prototype.pista_vux9f0$ = function (posX, posY) {
    if (posY <= (this.position.size - 1 | 0)) {
      if (posX <= (this.position.get_za3lpa$(this.position.size - 1 | 0).size - 1 | 0)) {
        if (posX === posY || (posX % 2 === 0 && (new Math_0()).abs_za3lpa$(posX - posY | 0) <= 1)) {
          this.addElement_nxjb40$(toBoxedChar(65533), posX, posY);
        }return this.pista_vux9f0$(posX + 1 | 0, posY);
      }return this.pista_vux9f0$(0, posY + 1 | 0);
    } else {
      this.addElement_nxjb40$(toBoxedChar(65533), this.position.get_za3lpa$(this.position.size - 1 | 0).size - 1 | 0, this.position.size - 1 | 0);
      return true;
    }
  };
  Map.prototype.nextPista_vux9f0$ = function (posX, posY) {
    if (posY < (this.position.size - 1 | 0) && posX < (this.position.size - 1 | 0)) {
      if (this.position.get_za3lpa$(posY + 1 | 0).get_za3lpa$(posX).elementList.isEmpty() || Kotlin.isType(first(this.position.get_za3lpa$(posY + 1 | 0).get_za3lpa$(posX).elementList), Tower)) {
        return new NextPista(posY, posX + 1 | 0);
      } else {
        return new NextPista(posY + 1 | 0, posX);
      }
    } else if (posX === (this.position.size - 1 | 0)) {
      if (posY !== (this.position.size - 1 | 0)) {
        if (equals(first(this.position.get_za3lpa$(posY + 1 | 0).get_za3lpa$(posX).elementList), toBoxedChar(65533))) {
          return new NextPista(posY + 1 | 0, posX);
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      if (equals(first(this.position.get_za3lpa$(posY).get_za3lpa$(posX + 1 | 0).elementList), toBoxedChar(65533))) {
        return new NextPista(posY, posX + 1 | 0);
      } else {
        return null;
      }
    }
  };
  Map.prototype.addElement_nxjb40$ = function (element, y, x) {
    var tmp$;
    if (element != null) {
      if (this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.isEmpty()) {
        if (Kotlin.isType(element, Tower)) {
          if (this.player.money >= element.price) {
            this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.add_11rb$(element);
            tmp$ = this.player;
            tmp$.money = tmp$.money - element.price | 0;
            return true;
          } else {
            println('sem dinheiro!');
            return false;
          }
        } else {
          this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.add_11rb$(element);
          return true;
        }
      } else if (equals(first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList), toBoxedChar(65533))) {
        if (Kotlin.isType(element, Enemy)) {
          this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.add_11rb$(element);
          return true;
        } else {
          println('nao se pode construir na pista');
          return false;
        }
      } else {
        println('\nnao se pode construir em outras torres');
        return false;
      }
    } else {
      return false;
    }
  };
  Map.prototype.remElement_vux9f0$ = function (y, x) {
    if (!this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.isEmpty()) {
      if (Kotlin.isType(first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList), Tower)) {
        var removed = first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList);
        this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.remove_11rb$(first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList));
        return removed;
      } else if (equals(first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList), toBoxedChar(65533))) {
        var removed_0 = this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.get_za3lpa$(1);
        this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.remove_11rb$(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.get_za3lpa$(1));
        return removed_0;
      }} else {
      println('nao e possivel remover de um lugar vazio');
    }
    return null;
  };
  Map.prototype.interaction_vux9f0$ = function (y, x) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var element = this.position.get_za3lpa$(y).get_za3lpa$(x).elementList;
    if (!element.isEmpty()) {
      if (equals(first(element), toBoxedChar(65533))) {
        var list = ArrayList_init(0);
        for (var index = 0; index < 0; index++) {
          list.add_11rb$(Unit);
        }
        var l = list;
        tmp$ = element.size - 1 | 0;
        for (var i = 1; i <= tmp$; i++) {
          l.add_11rb$(element.get_za3lpa$(i));
        }
        tmp$_0 = l.size - 1 | 0;
        for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
          var enemy = Kotlin.isType(tmp$_1 = l.get_za3lpa$(i_0), Enemy) ? tmp$_1 : throwCCE();
          if (this.seconds % enemy.speed === 0) {
            var walking = this.nextPista_vux9f0$(y, x);
            if (walking != null) {
              element.remove_11rb$(enemy);
              this.addElement_nxjb40$(enemy, walking.x, walking.y);
            } else {
              element.remove_11rb$(enemy);
              tmp$_2 = this.player;
              tmp$_2.health = tmp$_2.health - enemy.health | 0;
            }
          }}
      } else if (Kotlin.isType(first(element), Tower)) {
        var torre = Kotlin.isType(tmp$_3 = first(element), Tower) ? tmp$_3 : throwCCE();
        if (this.seconds % torre.atkSpeed === 0) {
          this.towerAtk_vdffs7$(torre, y, x);
        }}}};
  Map.prototype.towerAtk_vdffs7$ = function (torre, y, x, contx, conty) {
    if (contx === void 0)
      contx = 0;
    if (conty === void 0)
      conty = 0;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var jaAtacou = false;
    if ((x - (torre.range - contx) | 0) >= 0 && (y - (torre.range - conty) | 0) >= 0 && (x - (torre.range - contx) | 0) < (this.position.size - 1 | 0) && (y - (torre.range - conty) | 0) < (this.position.size - 1 | 0) && (new Math_0()).abs_za3lpa$(torre.range - contx + (torre.range - conty) | 0) <= torre.range && !this.position.get_za3lpa$(y - (torre.range - conty) | 0).get_za3lpa$(x - (torre.range - contx) | 0).elementList.isEmpty()) {
      var element = this.position.get_za3lpa$(y - (torre.range - conty) | 0).get_za3lpa$(x - (torre.range - contx) | 0).elementList;
      if (equals(first(element), toBoxedChar(65533)) && element.size > 1) {
        var list = ArrayList_init(0);
        for (var index = 0; index < 0; index++) {
          list.add_11rb$(Unit);
        }
        var l = list;
        if (torre.pierce <= (element.size - 1 | 0)) {
          tmp$ = torre.pierce;
          for (var i = 1; i <= tmp$; i++) {
            l.add_11rb$(element.get_za3lpa$(i));
          }
        } else {
          tmp$_0 = element.size - 1 | 0;
          for (var i_0 = 1; i_0 <= tmp$_0; i_0++) {
            l.add_11rb$(element.get_za3lpa$(i_0));
          }
        }
        if (!equals(torre.type, 'Pinguim')) {
          jaAtacou = true;
        }tmp$_1 = l.size - 1 | 0;
        for (var i_1 = 0; i_1 <= tmp$_1; i_1++) {
          this.remElement_vux9f0$(y - (torre.range - conty) | 0, x - (torre.range - contx) | 0);
          var enemy = Kotlin.isType(tmp$_2 = l.get_za3lpa$(i_1), Enemy) ? tmp$_2 : throwCCE();
          var removed = this.onHit_5qkmuu$(enemy, torre.damage);
          if (!equals(removed.type, 'DEAD')) {
            this.addElement_nxjb40$(removed, y - (torre.range - conty) | 0, x - (torre.range - contx) | 0);
          }println(' +' + '$' + (4 * torre.damage | 0));
          tmp$_3 = this.player;
          tmp$_3.money = tmp$_3.money + (4 * torre.damage | 0) | 0;
          tmp$_4 = this.player;
          tmp$_4.points = tmp$_4.points + Kotlin.imul(torre.damage, this.player.health) | 0;
        }
      }}if (contx <= ((2 * torre.range | 0) - 1 | 0)) {
      if (!jaAtacou) {
        this.towerAtk_vdffs7$(torre, y, x, contx + 1 | 0, conty);
      }} else {
      if (conty <= ((2 * torre.range | 0) - 1 | 0)) {
        if (!jaAtacou) {
          this.towerAtk_vdffs7$(torre, y, x, 0, conty + 1 | 0);
        }}}
  };
  Map.prototype.onHit_5qkmuu$ = function (enemy, damageDealt) {
    if (!equals(enemy.type, 'DEAD')) {
      print(enemy.type + ' ' + enemy + ' HP Sofreu ' + damageDealt + ' de dano -> ');
      if ((enemy.health - damageDealt | 0) === 0) {
        print('virou ' + this.lesserEnemy_fvvtpk$(enemy).type);
        return this.lesserEnemy_fvvtpk$(enemy);
      } else if ((enemy.health - damageDealt | 0) < 0) {
        print('virou ' + this.onHit_5qkmuu$(this.lesserEnemy_fvvtpk$(enemy), damageDealt - enemy.health | 0).type + ' ' + this.onHit_5qkmuu$(this.lesserEnemy_fvvtpk$(enemy), damageDealt - enemy.health | 0));
        return this.onHit_5qkmuu$(this.lesserEnemy_fvvtpk$(enemy), damageDealt - enemy.health | 0);
      } else {
        print(enemy.type + ' ' + (enemy.health - damageDealt | 0) + ' ');
        return new Enemy(enemy.speed, enemy.health - damageDealt | 0, enemy.type);
      }
    } else {
      return enemy;
    }
  };
  Map.prototype.lesserEnemy_fvvtpk$ = function (enemy) {
    var tmp$;
    switch (enemy.type) {
      case 'PacoteDeCanudos':
        tmp$ = (new EnemyTypes()).Canudo;
        break;
      case 'Canudo':
        tmp$ = (new EnemyTypes()).Plastico;
        break;
      case 'Garrafa':
        tmp$ = (new EnemyTypes()).Vidro;
        break;
      case 'Pneu':
        tmp$ = (new EnemyTypes()).Borracha;
        break;
      default:tmp$ = (new EnemyTypes()).DEAD;
        break;
    }
    return tmp$;
  };
  Map.prototype.toString = function () {
    return this.auxiliar_vux9f0$();
  };
  Map.prototype.auxiliar_vux9f0$ = function (posX, posY) {
    if (posX === void 0)
      posX = 0;
    if (posY === void 0)
      posY = 0;
    var tmp$;
    var str = '';
    if (posX <= (this.position.size - 1 | 0)) {
      if (posY <= (this.position.size - 1 | 0)) {
        if (this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.isEmpty()) {
          str = '<button title=' + '"' + 'Clique aqui para adicionar ' + torreSelecionada.type + '! Custo: ' + '$' + '200' + '"' + ' style = ' + '"' + "background-image: url('sand.png'); cursor: pointer; width: 20px; height: 20px;" + '"' + ' id= ' + '"' + 'btn' + posX + posY + '"' + '><\/button>';
        } else if (Kotlin.isType(first(this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList), Tower)) {
          var torre = Kotlin.isType(tmp$ = first(this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList), Tower) ? tmp$ : throwCCE();
          if (equals(torre.type, 'Tartaruga')) {
            if (this.seconds % torre.atkSpeed === 0) {
              str = '<button title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' style = ' + '"' + "background-image: url('tartaruga_attack.png'); cursor: pointer; width: 20px; height: 20px;" + '"' + ' id= ' + '"' + 'btn' + posX + posY + '"' + '><\/button>';
            } else {
              str = '<button title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' style = ' + '"' + "background-image: url('tartaruga.png'); cursor: pointer; width: 20px; height: 20px;" + '"' + ' id= ' + '"' + 'btn' + posX + posY + '"' + '><\/button>';
            }
          } else if (equals(torre.type, 'Baleia')) {
            if (this.seconds % torre.atkSpeed === 0) {
              str = '<button title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' style = ' + '"' + "background-image: url('baleia_attack.png'); cursor: pointer; width: 20px; height: 20px;" + '"' + ' id= ' + '"' + 'btn' + posX + posY + '"' + '><\/button>';
            } else {
              str = '<button title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' style = ' + '"' + "background-image: url('baleia.png'); cursor: pointer; width: 20px; height: 20px;" + '"' + ' id= ' + '"' + 'btn' + posX + posY + '"' + '><\/button>';
            }
          } else if (equals(torre.type, 'Pinguim')) {
            if (this.seconds % torre.atkSpeed === 0) {
              str = '<button title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' style = ' + '"' + "background-image: url('pinguim_attack.png'); cursor: pointer; width: 20px; height: 20px;" + '"' + ' id= ' + '"' + 'btn' + posX + posY + '"' + '><\/button>';
            } else {
              str = '<button title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' style = ' + '"' + "background-image: url('pinguim.png'); cursor: pointer; width: 20px; height: 20px;" + '"' + ' id= ' + '"' + 'btn' + posX + posY + '"' + '><\/button>';
            }
          }} else {
          var enemy = last(this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList);
          if (Kotlin.isType(enemy, Enemy)) {
            switch (enemy.type) {
              case 'Canudo':
                str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'canudo.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px; background-color: blue;' + '"' + '><\/img>';
                break;
              case 'PacoteDeCanudos':
                str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'pacote_de_canudos.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px; background-color: blue;' + '"' + '><\/img>';
                break;
              case 'Plastico':
                str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'plastico.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px; background-color: blue;' + '"' + '><\/img>';
                break;
              case 'Vidro':
                str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'vidro.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px; background-color: blue;' + '"' + '><\/img>';
                break;
              case 'Garrafa':
                str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'garrafa.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px; background-color: blue;' + '"' + '><\/img>';
                break;
              case 'Pneu':
                str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'pneu.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px; background-color: blue;' + '"' + '><\/img>';
                break;
              case 'Borracha':
                str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'borracha.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px; background-color: blue;' + '"' + '><\/img>';
                break;
              default:str = '<img title =' + '"' + this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.toString() + '"' + ' src=' + '"' + 'sea.png' + '"' + ' style=' + '"' + 'width: 16px; height: 16px;' + '"' + '><\/img>';
                break;
            }
          } else {
            str = '<img title="Mar Livre de Polui\xE7\xE3o" src="sea.png" style="width: 16px; height: 16px;"><\/img>';
          }
        }
        str += this.auxiliar_vux9f0$(posX, posY + 1 | 0);
      } else {
        str = '<br>\n' + this.auxiliar_vux9f0$(posX + 1 | 0, 0);
      }
    }return str;
  };
  Map.prototype.interact_vux9f0$ = function (x, y) {
    if (x === void 0)
      x = this.position.size - 1 | 0;
    if (y === void 0)
      y = this.position.size - 1 | 0;
    this.interaction_vux9f0$(x, y);
    if (x > 0) {
      this.interact_vux9f0$(x - 1 | 0, y);
    } else if (y > 0) {
      this.interact_vux9f0$(this.position.size - 1 | 0, y - 1 | 0);
    }};
  function Map$addEvents$lambda(closure$posX, closure$posY, this$Map) {
    return function (it) {
      this$Map.addElement_nxjb40$(torreSelecionada, closure$posX, closure$posY);
      return Unit;
    };
  }
  function Map$addEvents$lambda_0(this$Map, closure$element, closure$posX, closure$posY) {
    return function (it) {
      var tmp$;
      if (this$Map.player.money >= (closure$element.price + 200 | 0)) {
        var up = Kotlin.isType(tmp$ = this$Map.remElement_vux9f0$(closure$posX, closure$posY), Tower) ? tmp$ : throwCCE();
        this$Map.addElement_nxjb40$(up.upgrade(), closure$posX, closure$posY);
      } else {
        window.alert('dinheiro insuficiente!' + '\n' + 'atual- ' + '$' + this$Map.player.money + '\n' + 'custo- ' + '$' + (closure$element.price + 200 | 0));
      }
      return Unit;
    };
  }
  Map.prototype.addEvents_vux9f0$ = function (posX, posY) {
    if (posX === void 0)
      posX = 0;
    if (posY === void 0)
      posY = 0;
    var tmp$, tmp$_0, tmp$_1;
    if (posX <= (this.position.size - 1 | 0)) {
      if (posY <= (this.position.size - 1 | 0)) {
        if (this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList.isEmpty()) {
          var btn = (tmp$ = document.getElementById('btn' + posX + posY)) == null || Kotlin.isType(tmp$, HTMLButtonElement) ? tmp$ : throwCCE();
          if (btn != null) {
            btn.addEventListener('click', Map$addEvents$lambda(posX, posY, this));
          }} else if (Kotlin.isType(first(this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList), Tower)) {
          var element = Kotlin.isType(tmp$_0 = first(this.position.get_za3lpa$(posX).get_za3lpa$(posY).elementList), Tower) ? tmp$_0 : throwCCE();
          var btn_0 = (tmp$_1 = document.getElementById('btn' + posX + posY)) == null || Kotlin.isType(tmp$_1, HTMLButtonElement) ? tmp$_1 : throwCCE();
          if (btn_0 != null) {
            btn_0.addEventListener('click', Map$addEvents$lambda_0(this, element, posX, posY));
          }}this.addEvents_vux9f0$(posX, posY + 1 | 0);
      } else {
        this.addEvents_vux9f0$(posX + 1 | 0, 0);
      }
    }};
  Map.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Map',
    interfaces: []
  };
  function stopMap() {
    window.clearInterval(interval);
    element.innerHTML = 'Fim De Jogo';
  }
  function main$lambda$lambda(it) {
    torreSelecionada = (new TowerTypes()).Tartaruga;
    return Unit;
  }
  function main$lambda$lambda_0(it) {
    torreSelecionada = (new TowerTypes()).Baleia;
    return Unit;
  }
  function main$lambda$lambda_1(it) {
    torreSelecionada = (new TowerTypes()).Pinguim;
    return Unit;
  }
  function main$lambda$lambda_2(it) {
    window.clearInterval(interval);
    element.innerHTML = 'Fim De Jogo';
    window.location.reload();
    return Unit;
  }
  function main$lambda$lambda_3(closure$mapaDeJogo, closure$ganhou) {
    return function () {
      if (closure$mapaDeJogo.seconds % 2 === 0) {
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Vidro, 0, 0);
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
      } else if (closure$mapaDeJogo.seconds % 3 === 0) {
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
      } else if (closure$mapaDeJogo.seconds % 5 === 0) {
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Canudo, 0, 0);
      } else if (closure$mapaDeJogo.seconds % 7 === 0) {
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 0, 0);
      } else {
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Canudo, 0, 0);
        closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Vidro, 0, 0);
      }
      switch (closure$mapaDeJogo.seconds) {
        case 3:
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
          break;
        case 6:
          (new EnemyTypes()).harden_s9u7hn$(43, 2);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Plastico, 0, 0);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Vidro, 0, 0);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
          break;
        case 8:
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
          break;
        case 14:
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
          break;
        case 50:
          (new EnemyTypes()).harden_s9u7hn$(43, 2);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 0, 1);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 0, 1);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 0, 1);
          break;
        case 75:
          (new EnemyTypes()).harden_s9u7hn$(43, 4);
          break;
        case 100:
          (new EnemyTypes()).harden_s9u7hn$(42, 2);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 0, 1);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 1);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 1, 1);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 1, 1);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 1, 1);
          break;
        case 125:
          (new EnemyTypes()).harden_s9u7hn$(43, 6);
          break;
        case 150:
          (new EnemyTypes()).harden_s9u7hn$(42, 2);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 4, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 4, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 5, 5);
          break;
        case 200:
          (new EnemyTypes()).harden_s9u7hn$(42, 2);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 4, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 4, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 4);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 5);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 5);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 6);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 5, 6);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 6, 6);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Garrafa, 6, 6);
          break;
        case 250:
          (new EnemyTypes()).harden_s9u7hn$(42, 69);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 8, 8);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 8, 8);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 8, 8);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 9, 8);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 9, 8);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 9, 8);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 9, 9);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 9, 9);
          closure$mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).Pneu, 9, 9);
          break;
        default:println('safe round');
          break;
      }
      element.innerHTML = '<p><br>' + closure$mapaDeJogo.player + ' <br>Tempo: ' + (closure$mapaDeJogo.seconds = closure$mapaDeJogo.seconds + 1 | 0, closure$mapaDeJogo.seconds) + '/300 <br>' + closure$mapaDeJogo.toString() + '<\/p>';
      closure$mapaDeJogo.addEvents_vux9f0$();
      closure$mapaDeJogo.interact_vux9f0$();
      if (closure$mapaDeJogo.seconds >= 300) {
        closure$ganhou.v = true;
      }if (closure$ganhou.v || closure$mapaDeJogo.player.health <= 0) {
        if (!closure$ganhou.v) {
          window.alert('Game Over...');
        } else {
          window.alert('Vitoria! A praia foi defendida com sucesso!');
        }
        stopMap();
        element.innerHTML = '<img title="vc perdeu amigo" src="dlc_de_canudo.png"/>';
      }return Unit;
    };
  }
  function main$lambda(closure$fora_tela, closure$titulo, closure$torre_tartaruga, closure$torre_baleia, closure$torre_pinguim, closure$mapaDeJogo, closure$ganhou) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2;
      closure$fora_tela.innerHTML = '\n        <button id="btn3" style="height: 90px; width: 100px;"> Parar Execucao<\/button>\n        ';
      closure$titulo.innerHTML = '\n        <h3>Sele\xE7\xE3o<br> de <br> Torres: <\/h3>\n        ';
      var btn3 = Kotlin.isType(tmp$ = document.getElementById('btn3'), HTMLButtonElement) ? tmp$ : throwCCE();
      closure$torre_tartaruga.innerHTML = '\n        <button id="btn_tartaruga" style="background-image: url(\'tartaruga_logo.png\'); height: 64px; width: 64px; cursor:pointer" title="Clique para selecionar a Tartaruga (Selecione uma area em branco do mapa para adicionar)\n         Tartarugas sao torres que causam dano de forma rapida\n         Dar Upgrade em um tartaruga aumenta o seu dano e a quantidade de inimigos atacados"><\/button>\n         ';
      var btn_tartaruga = Kotlin.isType(tmp$_0 = document.getElementById('btn_tartaruga'), HTMLButtonElement) ? tmp$_0 : throwCCE();
      btn_tartaruga.addEventListener('click', main$lambda$lambda);
      closure$torre_baleia.innerHTML = '\n        <button id="btn_baleia" style="background-image: url(\'whale-big.png\'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar a Baleia (Selecione uma area em branco do mapa para adicionar)\n        As Baleias sao as torres que causam maior dano. Elas causam dano de forma mediamente r\xE1pida.\n        Dar Upgrade em uma Baleia aumenta muito o seu dano, por\xE9m elas s\xF3 acertam um inimigo por ataque"><\/button>\n         ';
      var btn_baleia = Kotlin.isType(tmp$_1 = document.getElementById('btn_baleia'), HTMLButtonElement) ? tmp$_1 : throwCCE();
      btn_baleia.addEventListener('click', main$lambda$lambda_0);
      closure$torre_pinguim.innerHTML = '\n        <button id="btn_pinguim" style="background-image: url(\'penguin_logo.png\'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar o Pinguim (Selecione uma area em branco do mapa para adicionar)\n        Pinguins sao torres que causam dano de forma lenta, mas acertam todos os inimigos no alcance \n        Dar Upgrade em um pinguim aumenta a frequencia de ataque e a quantidade de inimigos atacados"><\/button>\n         ';
      var btn_pinguim = Kotlin.isType(tmp$_2 = document.getElementById('btn_pinguim'), HTMLButtonElement) ? tmp$_2 : throwCCE();
      btn_pinguim.addEventListener('click', main$lambda$lambda_1);
      btn3.addEventListener('click', main$lambda$lambda_2);
      stopMap();
      interval = window.setInterval(main$lambda$lambda_3(closure$mapaDeJogo, closure$ganhou), 2000);
      return Unit;
    };
  }
  function main$lambda$lambda_4(it) {
    torreSelecionada = (new TowerTypes()).Tartaruga;
    return Unit;
  }
  function main$lambda$lambda_5(it) {
    torreSelecionada = (new TowerTypes()).Baleia;
    return Unit;
  }
  function main$lambda$lambda_6(it) {
    torreSelecionada = (new TowerTypes()).Pinguim;
    return Unit;
  }
  function main$lambda$lambda_7(it) {
    window.clearInterval(interval);
    element.innerHTML = 'Fim De Jogo';
    window.location.reload();
    return Unit;
  }
  function main$lambda$lambda_8(closure$tutorial, closure$dica, closure$gameOver) {
    return function () {
      var tmp$;
      switch (closure$tutorial.seconds) {
        case 1:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Canudo, 0, 0);
          break;
        case 5:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Canudo, 0, 0);
          break;
        case 10:
          closure$tutorial.addElement_nxjb40$((new TowerTypes()).Tartaruga, 1, 0);
          break;
        case 11:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Plastico, 0, 0);
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Vidro, 0, 0);
          break;
        case 13:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Canudo, 0, 0);
          break;
        case 17:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
          break;
        default:println('safe round');
          break;
      }
      switch (closure$tutorial.seconds) {
        case 0:
          tmp$ = 'bem-vindo a plastic defence. Este eh um breve tutorial do jogo';
          break;
        case 1:
          tmp$ = 'bem-vindo a plastic defence. Este eh um breve tutorial do jogo';
          break;
        case 2:
          tmp$ = 'inimigos surgem no canto superior esquerdo e avan\xE7am ateh o canto inferior direito do mapa';
          break;
        case 3:
          tmp$ = 'inimigos surgem no canto superior esquerdo e avan\xE7am ateh o canto inferior direito do mapa';
          break;
        case 4:
          tmp$ = 'inimigos surgem no canto superior esquerdo e avan\xE7am ateh o canto inferior direito do mapa';
          break;
        case 5:
          tmp$ = 'inimigos surgem no canto superior esquerdo e avan\xE7am ateh o canto inferior direito do mapa';
          break;
        case 6:
          tmp$ = 'eles apenas andam na pista central, delimitada pelo simbolo \uFFFD';
          break;
        case 7:
          tmp$ = 'eles apenas andam na pista central, delimitada pelo simbolo \uFFFD';
          break;
        case 8:
          tmp$ = 'eles apenas andam na pista central, delimitada pelo simbolo \uFFFD';
          break;
        case 9:
          tmp$ = 'quando atingem o final do mapa, causam dano a sua vida';
          break;
        case 10:
          tmp$ = 'quando atingem o final do mapa, causam dano a sua vida';
          break;
        case 11:
          tmp$ = 'torres podem ser colocadas somente em espacos vazios';
          break;
        case 12:
          tmp$ = 'torres podem ser colocadas somente em espacos vazios';
          break;
        case 13:
          tmp$ = 'elas custam dinheiro, mas causam dano a inimigos perto delas';
          break;
        case 14:
          tmp$ = 'elas custam dinheiro, mas causam dano a inimigos perto delas';
          break;
        case 15:
          tmp$ = 'o dano causado eh convertido em dinheiro';
          break;
        case 16:
          tmp$ = 'o dano causado eh convertido em dinheiro';
          break;
        case 17:
          tmp$ = 'o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas';
          break;
        case 18:
          tmp$ = 'o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas';
          break;
        case 19:
          tmp$ = 'o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas';
          break;
        default:tmp$ = '';
          break;
      }
      closure$dica.v = tmp$;
      if (closure$tutorial.seconds >= 23) {
        closure$gameOver.v = true;
      }element.innerHTML = '<p><br>' + closure$tutorial.player + ' <br>Tempo: ' + (closure$tutorial.seconds = closure$tutorial.seconds + 1 | 0, closure$tutorial.seconds) + ' <br>' + closure$tutorial.toString() + ' <br>' + closure$dica.v + '<\/p>';
      closure$tutorial.addEvents_vux9f0$();
      closure$tutorial.interact_vux9f0$();
      if (closure$gameOver.v || closure$tutorial.player.health <= 0) {
        window.alert('Parabens por finalizar o tutorial!\n Clique em Jogar para iniciar o jogo principal.');
        stopMap();
      }return Unit;
    };
  }
  function main$lambda_0(closure$titulo, closure$torre_tartaruga, closure$torre_baleia, closure$torre_pinguim, closure$fora_tela) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2;
      var tutorial = new Map(3);
      var gameOver = {v: false};
      var dica = {v: null};
      tutorial.criarPista();
      closure$titulo.innerHTML = '\n        <h3>Sele\xE7\xE3o<br> de <br> Torres: <\/h3>\n        ';
      closure$torre_tartaruga.innerHTML = '\n        <button id="btn_tartaruga" style="background-image: url(\'tartaruga_logo.png\'); height: 64px; width: 64px; cursor:pointer" title="Clique para selecionar a Tartaruga (Selecione uma area em branco do mapa para adicionar)\n         Tartarugas sao torres que causam dano de forma rapida\n         Dar Upgrade em um tartaruga aumenta o seu dano e a quantidade de inimigos atacados"><\/button>\n         ';
      var btn_tartaruga = Kotlin.isType(tmp$ = document.getElementById('btn_tartaruga'), HTMLButtonElement) ? tmp$ : throwCCE();
      btn_tartaruga.addEventListener('click', main$lambda$lambda_4);
      closure$torre_baleia.innerHTML = '\n        <button id="btn_baleia" style="background-image: url(\'whale-big.png\'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar a Baleia (Selecione uma area em branco do mapa para adicionar)\n        As Baleias sao as torres que causam maior dano. Elas causam dano de forma mediamente r\xE1pida.\n        Dar Upgrade em uma Baleia aumenta muito o seu dano, por\xE9m elas s\xF3 acertam um inimigo por ataque"><\/button>\n         ';
      var btn_baleia = Kotlin.isType(tmp$_0 = document.getElementById('btn_baleia'), HTMLButtonElement) ? tmp$_0 : throwCCE();
      btn_baleia.addEventListener('click', main$lambda$lambda_5);
      closure$torre_pinguim.innerHTML = '\n        <button id="btn_pinguim" style="background-image: url(\'penguin_logo.png\'); height: 64px; width: 64px; cursor: pointer" title="Clique para selecionar o Pinguim (Selecione uma area em branco do mapa para adicionar)\n        Pinguins sao torres que causam dano de forma lenta, mas acertam todos os inimigos no alcance \n        Dar Upgrade em um pinguim aumenta a frequencia de ataque e a quantidade de inimigos atacados"><\/button>\n         ';
      var btn_pinguim = Kotlin.isType(tmp$_1 = document.getElementById('btn_pinguim'), HTMLButtonElement) ? tmp$_1 : throwCCE();
      btn_pinguim.addEventListener('click', main$lambda$lambda_6);
      closure$fora_tela.innerHTML = '\n        <button id="btn3" style="height: 90px; width: 100px;"> Parar Execucao<\/button>\n        ';
      var btn3 = Kotlin.isType(tmp$_2 = document.getElementById('btn3'), HTMLButtonElement) ? tmp$_2 : throwCCE();
      btn3.addEventListener('click', main$lambda$lambda_7);
      stopMap();
      interval = window.setInterval(main$lambda$lambda_8(tutorial, dica, gameOver), 2000);
      return Unit;
    };
  }
  function main() {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    var mapaDeJogo = new Map(21);
    var enemy1 = (new EnemyTypes()).Canudo;
    var torre = (new TowerTypes()).Baleia;
    var centralize = Kotlin.isType(tmp$ = document.getElementById('centralizar'), HTMLDivElement) ? tmp$ : throwCCE();
    var fora_tela = Kotlin.isType(tmp$_0 = document.getElementById('fora_de_tela'), HTMLDivElement) ? tmp$_0 : throwCCE();
    var torre_tartaruga = Kotlin.isType(tmp$_1 = document.getElementById('botao_tartaruga'), HTMLDivElement) ? tmp$_1 : throwCCE();
    var torre_baleia = Kotlin.isType(tmp$_2 = document.getElementById('botao_baleia'), HTMLDivElement) ? tmp$_2 : throwCCE();
    var torre_pinguim = Kotlin.isType(tmp$_3 = document.getElementById('botao_pinguim'), HTMLDivElement) ? tmp$_3 : throwCCE();
    var titulo = Kotlin.isType(tmp$_4 = document.getElementById('torres'), HTMLDivElement) ? tmp$_4 : throwCCE();
    var ganhou = {v: false};
    centralize.innerHTML = '\n        <button id="btn1"> Jogar<\/button>\n        <button id="btn2"> Tutorial<\/button>\n    ';
    var btn1 = Kotlin.isType(tmp$_5 = document.getElementById('btn1'), HTMLButtonElement) ? tmp$_5 : throwCCE();
    var btn2 = Kotlin.isType(tmp$_6 = document.getElementById('btn2'), HTMLButtonElement) ? tmp$_6 : throwCCE();
    btn1.addEventListener('click', main$lambda(fora_tela, titulo, torre_tartaruga, torre_baleia, torre_pinguim, mapaDeJogo, ganhou));
    btn2.addEventListener('click', main$lambda_0(titulo, torre_tartaruga, torre_baleia, torre_pinguim, fora_tela));
    mapaDeJogo.criarPista();
    mapaDeJogo.addElement_nxjb40$(torre, 1, 2);
    mapaDeJogo.addElement_nxjb40$(enemy1, 2, 1);
    mapaDeJogo.addElement_nxjb40$((new TowerTypes()).Tartaruga, 5, 4);
    mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
    mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 5, 5);
  }
  var package$logic = _.logic || (_.logic = {});
  Object.defineProperty(package$logic, 'element', {
    get: function () {
      return element;
    }
  });
  Object.defineProperty(package$logic, 'interval', {
    get: function () {
      return interval;
    },
    set: function (value) {
      interval = value;
    }
  });
  Object.defineProperty(package$logic, 'torreSelecionada', {
    get: function () {
      return torreSelecionada;
    },
    set: function (value) {
      torreSelecionada = value;
    }
  });
  package$logic.Math = Math_0;
  package$logic.Player = Player;
  package$logic.Tower = Tower;
  package$logic.Enemy = Enemy;
  package$logic.TowerTypes = TowerTypes;
  package$logic.EnemyTypes = EnemyTypes;
  package$logic.Element = Element;
  package$logic.NextPista = NextPista;
  package$logic.Map = Map;
  package$logic.stopMap = stopMap;
  package$logic.main = main;
  var tmp$;
  element = Kotlin.isType(tmp$ = document.getElementById('tela_do_jogo'), HTMLDivElement) ? tmp$ : throwCCE();
  interval = 0;
  torreSelecionada = (new TowerTypes()).Pinguim;
  main();
  Kotlin.defineModule('logic', _);
  return _;
}(typeof logic === 'undefined' ? {} : logic, kotlin);
