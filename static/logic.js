if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'logic'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'logic'.");
}var logic = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var equals = Kotlin.equals;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var print = Kotlin.kotlin.io.print_s8jyv4$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var Unit = Kotlin.kotlin.Unit;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var element;
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
  function Tower(atkSpeed, damage, range, type, level, price) {
    if (level === void 0)
      level = 1;
    if (price === void 0)
      price = 200 * level | 0;
    this.atkSpeed = atkSpeed;
    this.damage = damage;
    this.range = range;
    this.type = type;
    this.level = level;
    this.price = price;
  }
  Tower.prototype.toString = function () {
    return String.fromCharCode(this.type.charCodeAt(0));
  };
  Tower.prototype.upgradeTurtle_0 = function (basiclvl, lvl) {
    if (basiclvl === void 0)
      basiclvl = this.level;
    if (basiclvl === lvl) {
      return new Tower(this.atkSpeed + (2 * this.level | 0) | 0, this.damage + (2 * this.level | 0) | 0, this.range + (2 * this.level | 0) | 0, 'Tartaruga', lvl);
    } else {
      return this.upgradeTurtle_0(basiclvl + 1 | 0, lvl);
    }
  };
  Tower.prototype.upgradePenguin_0 = function (basiclvl, lvl) {
    if (basiclvl === void 0)
      basiclvl = this.level;
    if (basiclvl === lvl) {
      return new Tower(this.atkSpeed + (4 * this.level | 0) | 0, this.damage + (1 * this.level | 0) | 0, this.range + (2 * this.level | 0) | 0, 'Pinguim', lvl);
    } else {
      return this.upgradePenguin_0(basiclvl + 1 | 0, lvl);
    }
  };
  Tower.prototype.upgradeWhale_0 = function (basiclvl, lvl) {
    if (basiclvl === void 0)
      basiclvl = this.level;
    if (basiclvl === lvl) {
      return new Tower(this.atkSpeed + (1 * this.level | 0) | 0, this.damage + (4 * this.level | 0) | 0, this.range + (2 * this.level | 0) | 0, 'Baleia', lvl);
    } else {
      return this.upgradeWhale_0(basiclvl + 1 | 0, lvl);
    }
  };
  Tower.prototype.upgrade = function () {
    var tmp$;
    switch (this.type) {
      case 'Tartaruga':
        tmp$ = this.upgradeTurtle_0(this.level, this.level + 1 | 0);
        break;
      case 'Pinguim':
        tmp$ = this.upgradePenguin_0(this.level, this.level + 1 | 0);
        break;
      case 'Baleia':
        tmp$ = this.upgradeWhale_0(this.level, this.level + 1 | 0);
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
    return this.health.toString();
  };
  Enemy.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Enemy',
    interfaces: []
  };
  function TowerTypes() {
    this.Tartaruga = new Tower(2, 3, 2, 'Tartaruga');
    this.Baleia = new Tower(1, 4, 3, 'Baleia');
    this.Pinguim = new Tower(3, 2, 2, 'Pinguim');
  }
  TowerTypes.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TowerTypes',
    interfaces: []
  };
  function EnemyTypes() {
    this.Plastico = new Enemy(1, 1, 'Plastico');
    this.Canudo = new Enemy(1, 2, 'Canudo');
    this.PacoteDeCanudos = new Enemy(2, 5, 'PacoteDeCanudos');
    this.Garrafa = new Enemy(2, 4, 'Garrafa');
    this.Vidro = new Enemy(2, 1, 'Vidro');
    this.DEAD = new Enemy(0, 0, 'DEAD');
  }
  EnemyTypes.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EnemyTypes',
    interfaces: []
  };
  function Element(elementList) {
    this.elementList = elementList;
  }
  Element.prototype.toString = function () {
    if (this.elementList.isEmpty()) {
      return '[##]';
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
    var tmp$;
    if (!this.position.get_za3lpa$(y).get_za3lpa$(x).elementList.isEmpty()) {
      if (equals(first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList), toBoxedChar(65533))) {
        var element = last(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList);
        if (Kotlin.isType(element, Enemy) && this.seconds % element.speed === 0) {
          var walking = this.nextPista_vux9f0$(y, x);
          if (walking != null) {
            this.addElement_nxjb40$(this.remElement_vux9f0$(y, x), walking.x, walking.y);
          } else {
            this.remElement_vux9f0$(y, x);
            tmp$ = this.player;
            tmp$.health = tmp$.health - element.health | 0;
          }
          this.interaction_vux9f0$(y, x);
        }} else if (Kotlin.isType(first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList), Tower)) {
        var element_0 = first(this.position.get_za3lpa$(y).get_za3lpa$(x).elementList);
        if (Kotlin.isType(element_0, Tower) && this.seconds % element_0.atkSpeed === 0) {
          this.towerAtk_vdffs7$(element_0, y, x);
        }}}};
  Map.prototype.towerAtk_vdffs7$ = function (torre, y, x, contx, conty) {
    if (contx === void 0)
      contx = 0;
    if (conty === void 0)
      conty = 0;
    var tmp$;
    var jaAtacou = false;
    if ((x - (torre.range - contx) | 0) >= 0 && (y - (torre.range - conty) | 0) >= 0 && (x - (torre.range - contx) | 0) < (this.position.size - 1 | 0) && (y - (torre.range - conty) | 0) < (this.position.size - 1 | 0) && (new Math_0()).abs_za3lpa$(torre.range - contx + (torre.range - conty) | 0) <= torre.range && !this.position.get_za3lpa$(y - (torre.range - conty) | 0).get_za3lpa$(x - (torre.range - contx) | 0).elementList.isEmpty()) {
      var element = this.position.get_za3lpa$(y - (torre.range - conty) | 0).get_za3lpa$(x - (torre.range - contx) | 0).elementList;
      if (equals(first(element), toBoxedChar(65533)) && element.size > 1) {
        var l = element.get_za3lpa$(1);
        if (Kotlin.isType(l, Enemy)) {
          jaAtacou = true;
          this.remElement_vux9f0$(y - (torre.range - conty) | 0, x - (torre.range - contx) | 0);
          var removed = this.onHit_5qkmuu$(l, torre.damage);
          if (!equals(removed.type, 'DEAD')) {
            this.addElement_nxjb40$(removed, y - (torre.range - conty) | 0, x - (torre.range - contx) | 0);
          }println(' +' + '$' + (10 * torre.damage | 0));
          tmp$ = this.player;
          tmp$.money = tmp$.money + (10 * torre.damage | 0) | 0;
        }}}if (contx <= ((2 * torre.range | 0) - 1 | 0)) {
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
      default:tmp$ = (new EnemyTypes()).DEAD;
        break;
    }
    return tmp$;
  };
  Map.prototype.toString = function () {
    return this.auxiliar_za3lpa$(0);
  };
  Map.prototype.auxiliar_za3lpa$ = function (pos) {
    if (pos >= (this.position.size - 1 | 0)) {
      return this.position.get_za3lpa$(this.position.size - 1 | 0).toString();
    } else {
      return this.position.get_za3lpa$(pos).toString() + '<br>\n' + this.auxiliar_za3lpa$(pos + 1 | 0);
    }
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
  Map.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Map',
    interfaces: []
  };
  function tutorial$lambda(closure$tutorial, closure$dica, closure$gameOver) {
    return function () {
      var tmp$;
      switch (closure$tutorial.seconds) {
        case 1:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Canudo, 0, 0);
          break;
        case 7:
          closure$tutorial.addElement_nxjb40$((new TowerTypes()).Tartaruga, 1, 0);
          break;
        case 9:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Plastico, 0, 0);
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Vidro, 0, 0);
          break;
        case 12:
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Garrafa, 0, 0);
          closure$tutorial.addElement_nxjb40$((new EnemyTypes()).Canudo, 0, 0);
          break;
        default:break;
      }
      switch (closure$tutorial.seconds) {
        case 0:
          tmp$ = 'bem-vindo a plastic defence. Este eh um breve tutorial do jogo';
          break;
        case 1:
          tmp$ = 'inimigos surgem no canto superior esquerdo e avan\xE7am ateh o canto inferior direito do mapa';
          break;
        case 2:
          tmp$ = 'inimigos surgem no canto superior esquerdo e avan\xE7am ateh o canto inferior direito do mapa';
          break;
        case 3:
          tmp$ = 'inimigos surgem no canto superior esquerdo e avan\xE7am ateh o canto inferior direito do mapa';
          break;
        case 4:
          tmp$ = 'eles apenas andam na pista central, delimitada pelo simbolo \uFFFD';
          break;
        case 5:
          tmp$ = 'eles apenas andam na pista central, delimitada pelo simbolo \uFFFD';
          break;
        case 6:
          tmp$ = 'quando atingem o final do mapa, causam dano a sua vida';
          break;
        case 7:
          tmp$ = 'torres podem ser colocadas somente em espacos vazios';
          break;
        case 8:
          tmp$ = 'torres podem ser colocadas somente em espacos vazios';
          break;
        case 9:
          tmp$ = 'elas custam dinheiro, mas causam dano a inimigos perto delas';
          break;
        case 10:
          tmp$ = 'elas custam dinheiro, mas causam dano a inimigos perto delas';
          break;
        case 11:
          tmp$ = 'o dano causado eh convertido em dinheiro';
          break;
        case 12:
          tmp$ = 'o dano causado eh convertido em dinheiro';
          break;
        case 13:
          tmp$ = 'o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas';
          break;
        case 14:
          tmp$ = 'o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas';
          break;
        case 15:
          tmp$ = 'o jogo acaba quando sua vida chega a 0 ou quando todas as ondas de inimigos sao derrotadas';
          break;
        default:tmp$ = '';
          break;
      }
      closure$dica.v = tmp$;
      if ((closure$tutorial.seconds = closure$tutorial.seconds + 1 | 0, closure$tutorial.seconds) >= 20) {
        closure$gameOver.v = true;
      }closure$tutorial.interact_vux9f0$();
      element.innerHTML = '<br>' + closure$tutorial.player + ' <br>iteracao: ' + closure$tutorial.seconds + ' <br>' + closure$tutorial + ' <br>' + closure$dica.v;
      return Unit;
    };
  }
  function tutorial() {
    var tutorial = new Map(3);
    var gameOver = {v: false};
    var dica = {v: null};
    tutorial.criarPista();
    window.setInterval(tutorial$lambda(tutorial, dica, gameOver), 2000);
  }
  function main$lambda(closure$mapaDeJogo) {
    return function () {
      closure$mapaDeJogo.interact_vux9f0$();
      element.innerHTML = '<br>' + closure$mapaDeJogo.player + ' <br>iteracao: ' + closure$mapaDeJogo.seconds + ' <br>' + closure$mapaDeJogo.toString();
      if ((closure$mapaDeJogo.seconds = closure$mapaDeJogo.seconds + 1 | 0, closure$mapaDeJogo.seconds) >= 20) {
        element.innerHTML = element.innerHTML + '<br>se passou 20 segundos';
      }return Unit;
    };
  }
  function main() {
    tutorial();
    var mapaDeJogo = new Map();
    var enemy1 = (new EnemyTypes()).Canudo;
    var torre = (new TowerTypes()).Baleia;
    mapaDeJogo.criarPista();
    mapaDeJogo.addElement_nxjb40$(torre, 1, 2);
    mapaDeJogo.addElement_nxjb40$(enemy1, 2, 1);
    mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 0, 0);
    mapaDeJogo.addElement_nxjb40$((new EnemyTypes()).PacoteDeCanudos, 5, 5);
    window.setInterval(main$lambda(mapaDeJogo), 2000);
  }
  var package$logic = _.logic || (_.logic = {});
  Object.defineProperty(package$logic, 'element', {
    get: function () {
      return element;
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
  package$logic.tutorial = tutorial;
  package$logic.main = main;
  var tmp$;
  element = Kotlin.isType(tmp$ = document.getElementById('tela_do_jogo'), HTMLDivElement) ? tmp$ : throwCCE();
  main();
  Kotlin.defineModule('logic', _);
  return _;
}(typeof logic === 'undefined' ? {} : logic, kotlin);
