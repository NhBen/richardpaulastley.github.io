<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">/*
  global: POKEDEX
  global: TYPES
  global: EXP_TABLE
  global: ROUTES
  global: EVOLUTIONS
*/
'use strict'

const pokeById = (id) =&gt; POKEDEX[id - 1]
const pokeByName = (name) =&gt; POKEDEX.filter((el) =&gt; el.pokemon[0].Pokemon === name)[0]

const EXP_TABLE = {}
EXP_TABLE["Slow"] = [1, 2, 10, 33, 80, 156, 270, 428, 640, 911, 1250, 1663, 2160, 2746, 3430, 4218, 5120, 6141, 7290, 8573, 10000, 11576, 13310, 15208, 17280, 19531, 21970, 24603, 27440, 30486, 33750, 37238, 40960, 44921, 49130, 53593, 58320, 63316, 68590, 74148, 80000, 86151, 92610, 99383, 106480, 113906, 121670, 129778, 138240, 147061, 156250, 165813, 175760, 186096, 196830, 207968, 219520, 231491, 243890, 256723, 270000, 283726, 297910, 312558, 327680, 343281, 359370, 375953, 393040, 410636, 428750, 447388, 466560, 486271, 506530, 527343, 548720, 570666, 593190, 616298, 640000, 664301, 689210, 714733, 740880, 767656, 795070, 823128, 851840, 881211, 911250, 941963, 973360, 1005446, 1038230, 1071718, 1105920, 1140841, 1176490, 1212873, 999999999999999999]
EXP_TABLE["Medium Slow"] = [1, 2, 9, 57, 96, 135, 179, 236, 314, 419, 560, 742, 973, 1261, 1612, 2035, 2535, 3120, 3798, 4575, 5460, 6458, 7577, 8825, 10208, 11735, 13411, 15244, 17242, 19411, 21760, 24294, 27021, 29949, 33084, 36435, 40007, 43808, 47846, 52127, 56660, 61450, 66505, 71833, 77440, 83335, 89523, 96012, 102810, 109923, 117360, 125126, 133229, 141677, 150476, 159635, 169159, 179056, 189334, 199999, 211060, 222522, 234393, 246681, 259392, 272535, 286115, 300140, 314618, 329555, 344960, 360838, 377197, 394045, 411388, 429235, 447591, 466464, 485862, 505791, 526260, 547274, 568841, 590969, 613664, 636935, 660787, 685228, 710266, 735907, 762160, 789030, 816525, 844653, 873420, 902835, 932903, 963632, 995030, 1027103, 999999999999999999]
EXP_TABLE["Medium Fast"] = [1, 2, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 999999999999999999]
EXP_TABLE["Fast"] = [1, 2, 6, 21, 51, 100, 172, 274, 409, 583, 800, 1064, 1382, 1757, 2195, 2700, 3276, 3930, 4665, 5487, 6400, 7408, 8518, 9733, 11059, 12500, 14060, 15746, 17561, 19511, 21600, 23832, 26214, 28749, 31443, 34300, 37324, 40522, 43897, 47455, 51200, 55136, 59270, 63605, 68147, 72900, 77868, 83058, 88473, 94119, 100000, 106120, 112486, 119101, 125971, 133100, 140492, 148154, 156089, 164303, 172800, 181584, 190662, 200037, 209715, 219700, 229996, 240610, 251545, 262807, 274400, 286328, 298598, 311213, 324179, 337500, 351180, 365226, 379641, 394431, 409600, 425152, 441094, 457429, 474163, 491300, 508844, 526802, 545177, 563975, 583200, 602856, 622950, 643485, 664467, 685900, 707788, 730138, 752953, 776239, 999999999999999999]

const gameVersion = 194;

let userSettings = {
    currentRegionId: 'Kanto',
    currentRouteId: 'starter',
    dexView: 'all',
    dexVersion: 194, // check if users dex is out of date
    spriteChoice: 'back'
}

let statistics = {
    'seen':0,
    'deaths':0,
    'beaten':0,
    'shinySeen':0,
    'shinyCaught':0,
    'shinyBeaten':0,
    'totalDamage':0
};

const RNG = (func, chance) =&gt; {
    const rnd = Math.random() * 100
    if (rnd &lt; chance) {
        func()
        return true
    }
    return false
}

const cloneJsonObject = (object) =&gt; JSON.parse(JSON.stringify(object))
const randomArrayElement = (array) =&gt; array[Math.floor(Math.random() * array.length)]

const makeDomHandler = () =&gt; {
    const domQuery = (cssQuery) =&gt; document.querySelector(cssQuery)
    const $ = domQuery
    const setValue = (domElement, newValue, append) =&gt; {
        if (append === undefined) { append = false }
        if (append) {
            domElement.innerHTML += newValue
        }
        if (!append) {
            if (domElement.innerHTML !== newValue) {
                domElement.innerHTML = newValue
            }
        }
    }
    const getValue = (domElement) =&gt; {
        return domElement.innerHTML
    }
    const setProp = (domElement, attribute, newValue) =&gt; {
        if (domElement[attribute] !== newValue) {
            domElement[attribute] = newValue
        }
    }
    const renderPokeOnContainer = (id, poke, face) =&gt; {
        face = face || 'front'
        const pokeStatusAsText = (poke) =&gt; {
            var output = ''
            output += 'Attack Speed: ' + poke.attackSpeed()/1000 + '&lt;br&gt;'
            output += '\nAttack: ' + poke.avgAttack() + '&lt;br&gt;'
            output += '\nDefense: ' + poke.avgDefense() + '&lt;br&gt;'
            return output
        }
        const containerCssQuery = '.container.poke' + '#' + id
        const container = $(containerCssQuery)
        const domElements  = {
            name: container.querySelector('.name')
            , img: container.querySelector('.img')
            , hp: container.querySelector('.hp')
            , hpBar: container.querySelector('.hpBar')
            , expBar: container.querySelector('.expBar')
            , status: container.querySelector('.status')
        }
        setValue(domElements.name, poke.pokeName() + ' (' + poke.level() + ')')
        setProp(domElements.img, 'src', poke.image()[face])
        setValue(domElements.hp, poke.lifeAsText())
        setProp(domElements.hpBar, 'value', poke.life.current())
        setProp(domElements.hpBar, 'max', poke.life.max())
        setProp(domElements.expBar, 'value', Math.floor(poke.currentExp() - poke.thisLevelExp()))
        setProp(domElements.expBar, 'max', poke.nextLevelExp() - poke.thisLevelExp())
        setValue(domElements.status, pokeStatusAsText(poke))
    }
    const renderPokeDex = (id, dexData) =&gt; {
        const listCssQuery = '.container.list' + '#' + id
        const listContainer = $(listCssQuery)
        const listElement = listContainer.querySelector('#playerPokeDex ul')
        var listValue = '';
        function findFlag(obj){ return (this == obj.name) }
        for(var y = 0; y &lt; POKEDEX.length; y++) {
            var dexEntry = dexData.find(findFlag, POKEDEX[y].pokemon[0].Pokemon)
            if (typeof dexEntry == 'undefined')
                dexEntry = {name: '', flag: 0}
            if (userSettings.dexView == 'all' ||
                (userSettings.dexView == 'own' &amp;&amp; (dexEntry.flag == 6 || dexEntry.flag == 8)) ||
                (userSettings.dexView == 'owned' &amp;&amp; (dexEntry.flag &gt;= 3)) ||
                (userSettings.dexView == 'missing' &amp;&amp; (dexEntry.flag != 6 &amp;&amp; dexEntry.flag != 8)) ||
                (userSettings.dexView == 'shiny' &amp;&amp; (dexEntry.flag == 8))) {
                listValue += '&lt;li class="pokeDex' + dexEntry.flag + '"&gt;' + (y + 1) + ' ' + POKEDEX[y].pokemon[0].Pokemon + '&lt;/li&gt;';
            }
        }
        setValue(listElement, listValue, false)
    }
    const healElement = $('#heal')
    const renderHeal = (canHeal) =&gt; {
        if (canHeal === true) {
            setValue(healElement, 'Heal!')
            player.healAllPokemons()
            combatLoop.refresh()
            renderView(dom, enemy, player)
        }
        if (typeof canHeal === 'number') {
            setValue(healElement, 'Heal: ' + Math.floor(((canHeal/30000)*100)) + '%')
        }
    }
    const pokeColor = (poke) =&gt; {
        if (poke.alive()) {
            if (poke === player.activePoke()) {
                if (poke.shiny()) {
                    return 'rgb(255, 230, 10)'
                } else {
                    return 'rgb(80, 157, 2)'
                }
            } else {
                if (poke.shiny()) {
                    return 'rgb(255, 255, 76)'
                } else {
                    return 'rgb(66, 116, 10)'
                }
            }
        } else {
            return 'red'
        }
    }
    const renderStorage = () =&gt; {
        const list = player.storage();
        const listCssQuery = '.container.list#playerPokes';
        const listContainer = $(listCssQuery)
        const listElement = listContainer.querySelector('#playerStorage ul')
        listElement.className = 'list manageTeamEnabled' + ((checkConfirmed('#enablePokedex') || !checkConfirmed('#enableStorage')) ? ' hidden' : '')
        var listElementsToAdd = ''
        list.forEach((poke, index) =&gt; {
            const listItemElement = listElement.querySelector('#storagePoke' + index);
            if (listItemElement) {
                const listItemNameElement = listItemElement.querySelector('.pokeListName')
                listItemNameElement.innerHTML = `${poke.pokeName()} (${poke.level()})`
                listItemNameElement.style.color = pokeColor(poke)
            } else {
                const deleteButton = `&lt;a href="#"
            onclick="userInteractions.deleteStorage(event, ${index});return false"
            style="
              color: red;
              text-decoration: none;
              position: relative;
              left: -3px;
            "
            class="pokeDeleteButton"
          &gt;
            X
          &lt;/a&gt;`

                const upButton = `&lt;button href="#"
            onclick="userInteractions.storageToUp(${index})"
            class="pokeUpButton"
          &gt;
            &lt;i class="fa fa-arrow-up" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/button&gt;`

                const downButton = `&lt;button href="#"
            onclick="userInteractions.storageToDown(${index})"
            class="pokeDownButton"
          &gt;
            &lt;i class="fa fa-arrow-down" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/button&gt;`

                const firstButton = `&lt;button href="#"
            onclick="userInteractions.storageToFirst(${index})"
            class="pokeFirstButton"
          &gt;
            #1
          &lt;/button&gt;`

                const rosterButton = `&lt;button href="#"
            onclick="userInteractions.moveToRoster(${index})"
            class="pokeFirstButton"
          &gt;
            Roster
          &lt;/button&gt;`

                listElementsToAdd += `&lt;li id="storagePoke${index}"&gt;` +
                    deleteButton +
                    `&lt;a
              href="#"
              style="color: ${pokeColor(poke)}"
              class="pokeListName"
            &gt;
              ${poke.pokeName()} (${poke.level()})
            &lt;/a&gt;
            &lt;br&gt;` +
                    upButton +
                    downButton +
                    firstButton +
                    rosterButton +
                    `&lt;/li&gt;`
            }
        })
        if (listElementsToAdd.length &gt; 0) {
            setValue(listElement, listElementsToAdd, true)
        }
        var i = list.length
        var listItemToRemove
        while (listItemToRemove = listElement.querySelector('#storagePoke' + i)) {
            listElement.removeChild(listItemToRemove)
            i++
        }
    }
    const renderPokeList = (id, list, player, deleteEnabledId) =&gt; {
        const listCssQuery = '.container.list' + '#' + id
        const listContainer = $(listCssQuery)
        const listElement = listContainer.querySelector('#playerPokesList ul')
        const deleteEnabled = deleteEnabledId &amp;&amp; $(deleteEnabledId).checked
        listElement.className = 'list' + ((checkConfirmed('#enablePokedex') || checkConfirmed('#enableStorage')) ? ' hidden' : '') + (deleteEnabled ? ' manageTeamEnabled' : '')
        var listElementsToAdd = ''
        list.forEach((poke, index) =&gt; {
            const listItemElement = listElement.querySelector('#listPoke' + index);
            if (listItemElement) {
                const listItemNameElement = listItemElement.querySelector('.pokeListName')
                listItemNameElement.innerHTML = `${poke.pokeName()} (${poke.level()})`
                listItemNameElement.style.color = pokeColor(poke)
                listItemNameElement.className = 'pokeListName'
                    + (poke === player.activePoke() ? ' activePoke' : '')
                    + (poke.canEvolve() ? ' canEvolve' : '')
            } else {
                const deleteButton = `&lt;a href="#"
            onclick="userInteractions.deletePokemon(event, ${index});return false"
            style="
              color: red;
              text-decoration: none;
              position: relative;
              left: -3px;
            "
            class="pokeDeleteButton"
          &gt;
            X
          &lt;/a&gt;`

                const upButton = `&lt;button href="#"
            onclick="userInteractions.pokemonToUp('${index}')"
            class="pokeUpButton"
          &gt;
            &lt;i class="fa fa-arrow-up" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/button&gt;`

                const downButton = `&lt;button href="#"
            onclick="userInteractions.pokemonToDown(${index})"
            class="pokeDownButton"
          &gt;
            &lt;i class="fa fa-arrow-down" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/button&gt;`

                const firstButton = `&lt;button href="#"
            onclick="userInteractions.pokemonToFirst('${index}')"
            class="pokeFirstButton"
          &gt;
            #1
          &lt;/button&gt;`

                const evolveButton = `&lt;button href="#"
            onclick="userInteractions.evolvePokemon('${index}')"
            class="pokeEvolveButton"
          &gt;
            Evolve
          &lt;/button&gt;`

                const storageButton = `&lt;button href="#"
            onclick="userInteractions.moveToStorage('${index}')"
            class="pokeFirstButton"
          &gt;
            PC
          &lt;/button&gt;`

                listElementsToAdd += `&lt;li id="listPoke${index}"&gt;` +
                    deleteButton +
                    `&lt;a
              href="#"
              onclick="userInteractions.changePokemon(${index})"
              style="color: ${pokeColor(poke)}"
              class="pokeListName"
            &gt;
              ${poke.pokeName()} (${poke.level()})
            &lt;/a&gt;
            &lt;br&gt;` +
                    upButton +
                    downButton +
                    firstButton +
                    evolveButton +
                    storageButton +
                    `&lt;/li&gt;`
            }
        })
        if (listElementsToAdd.length &gt; 0) {
            setValue(listElement, listElementsToAdd, true)
        }
        var i = list.length
        var listItemToRemove
        while (listItemToRemove = listElement.querySelector('#listPoke' + i)) {
            listElement.removeChild(listItemToRemove)
            i++
        }
    }
    const renderRouteList = (id, routes) =&gt; {
        const listCssQuery = '.container.list' + '#' + id
        const listContainer = $(listCssQuery)
        const listElement = listContainer.querySelector('.list')
        listContainer.querySelector('#regionSelect').value = userSettings.currentRegionId
        setValue(listElement, '')
        Object.keys(routes).forEach((routeId) =&gt; {
            const route = routes[routeId]
            setValue(
                listElement
                , `&lt;li&gt;
          &lt;a
          href="#"
          onclick="${route.unlocked
                &amp;&amp; 'userInteractions.changeRoute(\'' + routeId + '\')'
                || ''
                    }"
          "
            style="
            color: ${route.unlocked
                &amp;&amp; (routeId === userSettings.currentRouteId
                    &amp;&amp; 'rgb(51, 111, 22)'
                    || 'rgb(53, 50, 103)' )
                || 'rgb(167, 167, 167)'
                    };
            font-weight: ${routeId === userSettings.currentRouteId
                &amp;&amp; 'bold'
                || 'normal'
                    };
           "
           &gt;
             ${route.name + ' (' + route.minLevel + '~' + route.maxLevel + ')'}
           &lt;/a&gt;
        &lt;/li&gt;`
                , true
            )
        })
    }
    const checkConfirmed = (id) =&gt; {
        return $(id).checked
    }
    const attackAnimation = (id, direction) =&gt; {
        const toAnimate = $('#' + id)
        toAnimate.classList = 'img attacked-' + direction
        window.setTimeout(() =&gt; toAnimate.classList = 'img', 80)
    }
    const gameConsoleLog = (text, color) =&gt; {
        const logElement = $('#console .console-text')
        if ($('#enableConsole').checked) {
            if (color) {
                logElement.innerHTML = '&lt;span style="color:' + color + ';"&gt;' + text + '&lt;/span&gt;' + '&lt;br&gt;' + logElement.innerHTML
            } else {
                logElement.innerHTML = text + '&lt;br&gt;' + logElement.innerHTML
            }
        }
        const logAsArray = logElement.innerHTML.split('&lt;br&gt;')
        if (logAsArray.length &gt;= 100) {
            logAsArray.splice(logAsArray.length - 1, 1)
            logElement.innerHTML = logAsArray.join('&lt;br&gt;')
        }
    }
    const gameConsoleClear = () =&gt; {
        $('#console .console-text').innerHTML = ''
    }
    const renderBalls = (ballsAmmount) =&gt; {
        Object.keys(ballsAmmount).forEach(ballType =&gt; {
            $('.ball-ammount.' + ballType).innerHTML = ballsAmmount[ballType]
        })
    }
    const bindEvents = () =&gt; {
        $('#enableDelete').addEventListener( 'click', () =&gt; {
            if ($(`#enablePokedex`).checked) {
                $(`#enablePokedex`).checked = false;
                userInteractions.enableViewPokedex();
            }
            userInteractions.enablePokeListDelete()
        })

        $('#enablePokedex').addEventListener( 'click', () =&gt; {
            if ($(`#enableDelete`).checked) {
                $(`#enableDelete`).checked = false;
                userInteractions.enablePokeListDelete();
            }
            userInteractions.enableViewPokedex()
        })

        $('#enableStorage').addEventListener( 'click', () =&gt; {
            userInteractions.enableViewStorage()
        })

        $('#dexView').addEventListener( 'change'
            , () =&gt; { userInteractions.changeDexView() }
        )

        $(`#enableCatchAll`).addEventListener( 'click'
            , () =&gt; { var setCatchSetting;
                if ($(`#enableCatchAll`).checked) {
                    $(`#enableCatchNew`).checked = false;
                    setCatchSetting = 'all';
                } else
                    setCatchSetting = false;
                userInteractions.changeCatchOption(setCatchSetting)}
        )

        $(`#enableCatchNew`).addEventListener( 'click'
            , () =&gt; { var setCatchSetting;
                if ($(`#enableCatchNew`).checked) {
                    $(`#enableCatchAll`).checked = false;
                    setCatchSetting = 'new';
                } else
                    setCatchSetting = false;
                userInteractions.changeCatchOption(setCatchSetting)}
        )

        $(`#saveDialogContainer`).addEventListener( 'click'
            , (event) =&gt; { event.target === $(`#saveDialogContainer`) &amp;&amp; ($(`#saveDialogContainer`).style.display = 'none') }
        )

        $(`#statisticsContainer`).addEventListener( 'click'
            , (event) =&gt; { event.target === $(`#statisticsContainer`) &amp;&amp; ($(`#statisticsContainer`).style.display = 'none') }
        )
    }
    bindEvents()
    return {
        renderPokeOnContainer: renderPokeOnContainer
        , renderPokeDex: renderPokeDex
        , renderPokeList: renderPokeList
        , renderRouteList: renderRouteList
        , renderStorage: renderStorage
        , renderHeal: renderHeal
        , attackAnimation: attackAnimation
        , checkConfirmed: checkConfirmed
        , gameConsoleLog: gameConsoleLog
        , gameConsoleClear: gameConsoleClear
        , renderBalls: renderBalls
    }
}

const makePoke = (pokeModel, initialLevel, initialExp, shiny) =&gt; {
    var poke = cloneJsonObject(pokeModel)
    const expTable = EXP_TABLE[poke.stats[0]["growth rate"]]
    var exp = initialLevel
        &amp;&amp; expTable[initialLevel - 1]
        || initialExp
    const isShiny = (shiny == true);
    const currentLevel = () =&gt; {
        return expTable
            .filter((xp_requirement) =&gt; xp_requirement &lt;= exp)
            .length

    }
    const statValue = (raw) =&gt; {
        return Math.floor((((raw + 50) * currentLevel()) / (150)))
    }
    const hp = (rawHp) =&gt; {
        return Math.floor(((rawHp * currentLevel()) / 40))
    }
    const tryEvolve = (shiny) =&gt; {
        const pokemonHasEvolution =
            EVOLUTIONS[poke.pokemon[0].Pokemon] !== undefined
        if (pokemonHasEvolution) {
            const oldPokemon = poke.pokemon[0].Pokemon;
            const evolution = EVOLUTIONS[poke.pokemon[0].Pokemon].to
            const levelToEvolve = Number(EVOLUTIONS[poke.pokemon[0].Pokemon].level)
            if (currentLevel() &gt;= levelToEvolve) {
                poke = cloneJsonObject(pokeByName(evolution))
                player.addPokedex(evolution, (shiny ? 8 : 6))
                if (!player.hasPokemon(oldPokemon, shiny)) {
                    player.addPokedex(oldPokemon, (shiny ? 7 : 5))
                }
            }
        }
    }

    const canEvolve = () =&gt; {
        const pokemonHasEvolution =
            EVOLUTIONS[poke.pokemon[0].Pokemon] !== undefined
        if (pokemonHasEvolution) {
            const evolution = EVOLUTIONS[poke.pokemon[0].Pokemon].to
            const levelToEvolve = Number(EVOLUTIONS[poke.pokemon[0].Pokemon].level)
            if (currentLevel() &gt;= levelToEvolve) {
                return true
            }
        }
        return false
    }
    const combat = {
        mutable: {
            hp: hp(poke.stats[0].hp) * 3
        }
        , maxHp: () =&gt; hp(poke.stats[0].hp) * 3
        , attack: () =&gt; statValue(poke.stats[0].attack)
        , defense: () =&gt; statValue(poke.stats[0].defense)
        , spAttack: () =&gt; statValue(poke.stats[0]['sp atk'])
        , spDefense: () =&gt; statValue(poke.stats[0]['sp def'])
        , speed: () =&gt; statValue(poke.stats[0].speed)
    }
    const avgDefense = () =&gt; (combat.defense() + combat.spDefense())/2
    const poke_interface = {
        pokeName: () =&gt; poke.pokemon[0].Pokemon
        , image: () =&gt; {
            const imageType = (isShiny ? 'shiny' : 'normal')
            return {
                front: poke.images[imageType].front
                , back: poke.images[imageType].back
            }
        }
        , shiny: () =&gt; isShiny
        , types: () =&gt; poke.stats[0].types
        , catchRate: () =&gt; Number(poke.stats[0]['catch rate'])
        , lifeAsText: () =&gt; '' + (combat.mutable.hp &lt; 0 ? 0 : combat.mutable.hp) + ' / ' + combat.maxHp()
        , life: {
            current: () =&gt; combat.mutable.hp
            , max: () =&gt; combat.maxHp()
        }
        , alive: () =&gt; combat.mutable.hp &gt; 0
        , giveExp: (ammount) =&gt; {
            exp += ammount
        }
        , canEvolve: canEvolve
        , evolve: tryEvolve
        , currentExp: () =&gt; exp
        , nextLevelExp: () =&gt; expTable[currentLevel()]
        , thisLevelExp: () =&gt; expTable[currentLevel() - 1] || 10
        , level: () =&gt; currentLevel()
        , attackSpeed: () =&gt; {
            const speed = Math.floor(1000 / (500 + combat.speed()) * 800)
            if (speed &lt;= 300) {
                return 300
            } else {
                return speed
            }
        }
        , attack: () =&gt; combat.attack()
        , avgAttack: () =&gt; (combat.attack() + combat.spAttack())/2
        , avgDefense: avgDefense
        , takeDamage: (enemyAttack) =&gt; {
            const damageToTake = (enemyAttack - avgDefense() / 10) &gt; 0
                &amp;&amp; Math.ceil((enemyAttack - avgDefense() / 10) * ((Math.random() + 0.1) * 2) / 100)
                || 0
            combat.mutable.hp -= damageToTake
            return damageToTake
        }
        , baseExp: () =&gt; Number(poke.exp[0]['base exp'])
        , heal: () =&gt; combat.mutable.hp = combat.maxHp()
        , allCombat: () =&gt; combat
        , save: () =&gt; [poke.pokemon[0].Pokemon, exp, isShiny]
    }
    return poke_interface
}
const makeRandomPoke = (level) =&gt; makePoke(randomArrayElement(POKEDEX), level)

const makePlayer = () =&gt; {
    var pokemons = []
    var storage = []
    var pokedexData = []
    var activePoke = 0
    var lastHeal = Date.now()

    const ballsRngs = {
        pokeball: 1,
        greatball: 1.5,
        ultraball: 2
    }
    var selectedBall = "pokeball"
    var ballsAmmount = {
        pokeball: 20,
        greatball: 0,
        ultraball: 0
    }

    const canHeal = () =&gt; {
        if ((Date.now() - lastHeal) &gt; 30000) {
            return true
        }
        else {
            return Date.now() - lastHeal
        }
    }
    const checksum = (s) =&gt;
    {
        var chk = 0x12345678;
        var len = s.length;
        for (var i = 0; i &lt; len; i++) {
            chk += (s.charCodeAt(i) * (i + 1));
        }

        return (chk &amp; 0xffffffff).toString(16);
    }
    const player_interface = {
        addPoke: (poke) =&gt; {
            // const playerEqualPokes = pokemons.filter((playerPoke) =&gt; (playerPoke.pokeName() === poke.pokeName()))
            // if (playerEqualPokes.length === 0) {
            //   pokemons.push(poke)
            // }
            // if (playerEqualPokes.length !== 0) {
            //   if (poke.level() &gt; playerEqualPokes[0].level()) {
            //     pokemons.splice(pokemons.indexOf(playerEqualPokes[0]), 1)
            //     pokemons.push(poke)
            //   }
            // }
            pokemons.push(poke)
        }
        , addPokedex: (pokeName, flag) =&gt; {
            /* 0 Unseen
            1 Normal, Seen
            2 Shiny, Seen
            3 Normal, Released [italic]
            4 Shiny, Released [italic]
            5 Normal, Owned (so evolved)
            6 Normal, Own (actual form in the team)
            7 Shiny, Owned
            8 Shiny, Own */
            function findFlag(obj){ return (this == obj.name) }
            const dexEntry = pokedexData.find(findFlag, pokeName)
            if (typeof dexEntry == 'object') {
                if (dexEntry.flag &lt; flag ||
                    (dexEntry.flag == 8 &amp;&amp; flag == 4) || // own can be released
                    (dexEntry.flag == 6 &amp;&amp; flag == 3) ||
                    (dexEntry.flag == 8 &amp;&amp; flag == 7) || // own can be come owned
                    (dexEntry.flag == 6 &amp;&amp; flag == 5)) {
                    pokedexData[pokedexData.indexOf(dexEntry)].flag = flag
                }
            } else {
                pokedexData.push({name: pokeName, flag: flag})
            }
        }
        , setActive: (index) =&gt; {
            activePoke = index
        }
        , activePoke: () =&gt; pokemons[activePoke]
        , pokemons: () =&gt; pokemons
        , storage: () =&gt; storage
        , pokedexData: () =&gt; pokedexData
        , canHeal: canHeal
        , reorderPokes: (newList) =&gt; {
            pokemons = newList
        }
        , reorderStorage: (newList) =&gt; {
            storage = newList
        }
        , healAllPokemons: () =&gt; {
            if (canHeal() === true) {
                pokemons.forEach((poke) =&gt; poke.heal())
                lastHeal = Date.now()
                return "healed"
            }
            return canHeal()
        }
        , hasPokemon: (pokemonName, shiny) =&gt; {
            var allPokemon = pokemons;
            if (storage.length &gt; 0) {
                allPokemon = allPokemon.concat(storage);
            }
            return typeof allPokemon.find(function(obj){ return (this[0] == obj.pokeName() &amp;&amp; this[1] == obj.shiny()); }, [pokemonName, shiny]) != 'undefined'
        }
        , deletePoke: (index) =&gt; {
            if (index !== activePoke) {
                pokemons.splice(index, 1)
                if (index &lt; activePoke) {
                    activePoke -= 1
                }
            }
        }
        , savePokes: () =&gt; {
            localStorage.setItem(`totalPokes`, pokemons.length)
            pokemons.forEach((poke, index) =&gt; {
                localStorage.setItem(`poke${index}`, JSON.stringify(poke.save()))
            })
            localStorage.setItem(`totalStorage`, storage.length)
            storage.forEach((poke, index) =&gt; {
                localStorage.setItem(`storage${index}`, JSON.stringify(poke.save()))
            })
            localStorage.setItem(`ballsAmmount`, JSON.stringify(ballsAmmount))
            localStorage.setItem(`pokedexData`, JSON.stringify(pokedexData))
            localStorage.setItem(`statistics`, JSON.stringify(statistics))
            localStorage.setItem(`userSettings`, JSON.stringify(userSettings))
        }
        , saveToString: () =&gt; {
            const saveData = JSON.stringify({
                pokes: pokemons.map((poke) =&gt; poke.save()),
                storage: storage.map((poke) =&gt; poke.save()),
                pokedexData: pokedexData,
                statistics: statistics,
                userSettings: userSettings,
                ballsAmmount: ballsAmmount
            })
            return btoa(checksum(saveData) + '|' + saveData)
        }
        , loadPokes: () =&gt; {
            Array(Number(localStorage.getItem(`totalPokes`))).fill(0).forEach((el, index) =&gt; {
                const loadedPoke = JSON.parse(localStorage.getItem('poke'+index))
                const pokeName = loadedPoke[0]
                const exp = loadedPoke[1]
                const shiny = (loadedPoke[2] == true)
                pokemons.push(makePoke(pokeByName(pokeName), false, Number(exp), shiny))
            })
            if (localStorage.getItem(`totalStorage`)) {
                Array(Number(localStorage.getItem(`totalStorage`))).fill(0).forEach((el, index) =&gt; {
                    const loadedPoke = JSON.parse(localStorage.getItem('storage' + index))
                    if (loadedPoke) {
                        const pokeName = loadedPoke[0];
                        const exp = loadedPoke[1];
                        const shiny = (loadedPoke[2] === true);
                        const caughtAt = loadedPoke[3];
                        storage.push(makePoke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt));
                    }
                })
            }
            if (JSON.parse(localStorage.getItem('ballsAmmount'))) {
                ballsAmmount = JSON.parse(localStorage.getItem('ballsAmmount'))
            }
            if (JSON.parse(localStorage.getItem('pokedexData'))) {
                pokedexData = JSON.parse(localStorage.getItem('pokedexData'))
            } else {
                pokedexData = []
            }
            if (JSON.parse(localStorage.getItem('statistics'))) {
                statistics = JSON.parse(localStorage.getItem('statistics'))
            }
            if (JSON.parse(localStorage.getItem('userSettings'))) {
                userSettings = JSON.parse(localStorage.getItem('userSettings'))
            } else {
                userSettings.dexVersion = (pokedexData.length == 0) ? null : 193;
            }
            if (pokedexData.length == 0) {
                player.reloadDexData(null, userSettings.dexVersion)
            }
            else if (userSettings.dexVersion &lt; gameVersion) {
                player.reloadDexData(userSettings.dexVersion, gameVersion)
            }
        }
        , reloadDexData: (oldVersion, newVersion) =&gt; {
            if (oldVersion == null) {
                // this should only ever be run once
                for (var i in pokemons) {
                    player.addPokedex(pokemons[i].pokeName(), (pokemons[i].shiny() ? 8 : 6))
                }
            }
            if (oldVersion &lt; 194) {
                for (var i in pokedexData) {
                    switch (pokedexData[i].flag) {
                        case 2:
                        case 5:
                            player.addPokedex(pokedexData[i].name, 6)
                            break;
                        case 4:
                            player.addPokedex(pokedexData[i].name, 2)
                            break;
                        case 6:
                            player.addPokedex(pokedexData[i].name, 3)
                            break;
                        case 7:
                            player.addPokedex(pokedexData[i].name, 8)
                            break;
                        case 8:
                            player.addPokedex(pokedexData[i].name, 4)
                            break;
                    }
                }
            }
            userSettings.dexVersion = newVersion
        }
        , loadFromString: (saveData) =&gt; {
            saveData = atob(saveData)
            saveData = saveData.split('|')
            if (checksum(saveData[1]) === saveData[0]) {
                try {
                    saveData = JSON.parse(saveData[1])
                } catch (err) {
                    alert('Failed to parse save data, loading canceled!')
                    return;
                }
                pokemons = []
                saveData.pokes.forEach((loadedPoke) =&gt; {
                    const pokeName = loadedPoke[0]
                    const exp = loadedPoke[1]
                    const shiny = (loadedPoke[2] == true)
                    pokemons.push(makePoke(pokeByName(pokeName), false, Number(exp), shiny))
                })
                storage = [];
                if (saveData.storage) {
                    saveData.storage.forEach((loadedPoke) =&gt; {
                        const pokeName = loadedPoke[0];
                        const exp = loadedPoke[1];
                        const shiny = (loadedPoke[2] === true);
                        const caughtAt = loadedPoke[3];
                        storage.push(makePoke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt))
                    });
                }
                ballsAmmount = saveData.ballsAmmount
                pokedexData = saveData.pokedexData ? saveData.pokedexData : []
                statistics = saveData.statistics ? saveData.statistics : statistics
                if (saveData.userSettings) {
                    userSettings = saveData.userSettings
                } else {
                    userSettings.dexVersion = (pokedexData.length == 0) ? null : 193;
                }
                if (pokedexData.length == 0) {
                    player.reloadDexData(null, userSettings.dexVersion)
                }
                else if (userSettings.dexVersion &lt; gameVersion) {
                    player.reloadDexData(userSettings.dexVersion, gameVersion)
                }
            } else {
                alert('Invalid save data, loading canceled!')
            }
        }
        , ballRNG: (ballName) =&gt; {
            return ballsRngs[ballName]
        }
        , changeSelectedBall: (newBall) =&gt; {
            selectedBall = newBall
        }
        , consumeBall: (ballName) =&gt; {
            if (ballsAmmount[ballName] &gt; 0) {
                ballsAmmount[ballName] -= 1
                return true
            }
            return false
        }
        , selectedBall: () =&gt; selectedBall
        , bestAvailableBall: () =&gt; {
            const ballsFromBestToWorst = ['ultraball', 'greatball', 'pokeball']
            for (var i = 0; i &lt; ballsFromBestToWorst.length; i++) {
                if (ballsAmmount[ballsFromBestToWorst[i]] &gt; 0) {
                    return ballsFromBestToWorst[i];
                }
            }
        }
        , ballsAmmount: () =&gt; ballsAmmount
        , addBalls: (ballName, ammount) =&gt; {
            ballsAmmount[ballName] += ammount
        }
    }
    return player_interface
}

const makeEnemy = (starter) =&gt; {
    var active = starter

    const generateNew = (recipe) =&gt; {
        const poke = pokeByName(randomArrayElement(recipe.pokes))
        return makePoke(
            poke,
            recipe.minLevel + Math.round((Math.random() * (recipe.maxLevel - recipe.minLevel))),
            false,
            Math.random() &lt; (1 / (1 &lt;&lt; 5 &lt;&lt; 8))
        )
    }

    return {
        activePoke: () =&gt; active,
        generateNew: (recipe) =&gt; active = generateNew(recipe)
    }
}

const makeUserInteractions = (player, enemy, dom, combatLoop) =&gt; {
    const changeRoute = (newRouteId) =&gt; {
        userSettings.currentRouteId = newRouteId
        enemy.generateNew(ROUTES[userSettings.currentRegionId][newRouteId])
        player.addPokedex(enemy.activePoke().pokeName(), (enemy.activePoke().shiny() ? 2 : 1))
        if (enemy.activePoke().shiny()) {
            statistics.shinySeen++;
        } else {
            statistics.seen++;
        }
        combatLoop.changeEnemyPoke(enemy.activePoke())
        renderView(dom, enemy, player)
        player.savePokes()
        dom.renderRouteList('areasList', ROUTES[userSettings.currentRegionId])
        dom.renderPokeDex('playerPokes', player.pokedexData())
    }

    const cmpFunctions = {
        lvl: (lhs, rhs) =&gt; {
            return lhs.level() - rhs.level()
        },
        dex: (lhs, rhs) =&gt; {
            let index = p =&gt; POKEDEX.findIndex(x=&gt;x.pokemon[0].Pokemon == p.pokeName())
            return index(lhs) - index(rhs)
        },
        vlv: (lhs, rhs) =&gt; {
            return lhs.level() - rhs.level() || lhs.avgAttack() - rhs.avgAttack()
        }
    }

    const inverseCmp = (cmpFunc) =&gt; {
        return (lhs, rhs) =&gt; -cmpFunc(lhs, rhs);
    }

    return {
        changePokemon: (newActiveIndex) =&gt; {
            player.setActive(newActiveIndex)
            combatLoop.changePlayerPoke(player.activePoke())
            renderView(dom, enemy, player)
        },
        deletePokemon: (event, index) =&gt; {
            if (event.shiftKey) {
                const pokemon = player.pokemons()[index];
                player.deletePoke(index)
                if (!player.hasPokemon(pokemon.pokeName(), pokemon.shiny()))
                    player.addPokedex(pokemon.pokeName(), (pokemon.shiny() ? 4 : 3))
                combatLoop.changePlayerPoke(player.activePoke())
                renderView(dom, enemy, player)
                player.savePokes()
            } else {
                alert('Hold shift while clicking the X to release a pokemon')
            }
        },
        deleteStorage: (event, index) =&gt; {
            if (event.shiftKey) {
                const pokemon = player.storage()[index];
                const storageList = player.storage();
                storageList.splice(index, 1)
                player.reorderStorage(storageList);
                if (!player.hasPokemon(pokemon.pokeName(), pokemon.shiny()))
                    player.addPokedex(pokemon.pokeName(), (pokemon.shiny() ? 4 : 3))
                combatLoop.changePlayerPoke(player.activePoke())
                renderView(dom, enemy, player)
                player.savePokes()
            } else {
                alert('Hold shift while clicking the X to release a pokemon')
            }
        },
        healAllPlayerPokemons: () =&gt; {
            if (player.healAllPokemons() === "healed") {
                dom.gameConsoleLog('Full heal!', 'white')
                combatLoop.refresh()
                renderView(dom, enemy, player)
            }
        },
        changeRoute: changeRoute,
        changeRegion: () =&gt; {
            const regionSelect = document.getElementById('regionSelect')
            userSettings.currentRegionId = regionSelect.options[regionSelect.selectedIndex].value
            changeRoute(Object.keys(ROUTES[userSettings.currentRegionId])[0])
        },
        enablePokeListDelete: () =&gt; {
            dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
        },
        enableViewPokedex: () =&gt; {
            if (dom.checkConfirmed('#enablePokedex')) {
                document.querySelector('#playerPokesList').classList.add('hidden')
                document.querySelector('#playerPokeDex').classList.remove('hidden')
                document.querySelector('#playerStorage').classList.add('hidden')
            } else {
                document.querySelector('#playerPokesList').classList.remove('hidden')
                document.querySelector('#playerPokeDex').classList.add('hidden')
                document.querySelector('#playerStorage').classList.add('hidden')
                dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
            }
        },
        changeDexView: () =&gt; {
            const regionSelect = document.getElementById('dexView')
            userSettings.dexView = regionSelect.options[regionSelect.selectedIndex].value
            dom.renderPokeDex('playerPokes', player.pokedexData())
        },
        enableViewStorage: () =&gt; {
            if (dom.checkConfirmed('#enableStorage')) {
                document.querySelector('#playerPokesList').classList.add('hidden')
                document.querySelector('#playerPokeDex').classList.add('hidden')
                document.querySelector('#playerStorage').classList.remove('hidden')
                dom.renderStorage()
            } else {
                document.querySelector('#playerPokesList').classList.remove('hidden')
                document.querySelector('#playerPokeDex').classList.add('hidden')
                document.querySelector('#playerStorage').classList.add('hidden')
                dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
            }
        },
        changeCatchOption: (newCatchOption) =&gt; {
            combatLoop.changeCatch(newCatchOption)
        },
        clearGameData: () =&gt; {
            if (dom.checkConfirmed('#confirmClearData')) {
                localStorage.clear()
                window.location.reload(true)
            }
        },
        clearConsole: () =&gt; {
            dom.gameConsoleClear()
        },
        changeSelectedBall: (newBall) =&gt; {
            player.changeSelectedBall(newBall)
        },
        pokemonToFirst: (pokemonIndex) =&gt; {
            const moveToFirst = (index, arr) =&gt; {
                arr.splice(0, 0, arr.splice(index, 1)[0])
            }

            moveToFirst(pokemonIndex, player.pokemons())
            player.savePokes()
            combatLoop.changePlayerPoke(player.activePoke())
            renderView(dom, enemy, player)
        },
        pokemonToDown: (pokemonIndex) =&gt; {
            const moveToDown = index =&gt; arr =&gt; [
                ...arr.slice(0,parseInt(index)),
                arr[parseInt(index)+1],
                arr[parseInt(index)],
                ...arr.slice(parseInt(index)+2)
            ]

            if (player.pokemons()[pokemonIndex + 1]) {
                const newPokemonList = moveToDown(pokemonIndex)(player.pokemons())
                player.reorderPokes(newPokemonList)
                player.savePokes()
                combatLoop.changePlayerPoke(player.activePoke())
                renderView(dom, enemy, player)
            }
        },
        pokemonToUp: (pokemonIndex) =&gt; {
            const moveToUp = index =&gt; arr =&gt; [
                ...arr.slice(0,parseInt(index)-1),
                arr[parseInt(index)],
                arr[parseInt(index)-1],
                ...arr.slice(parseInt(index)+1)
            ]

            if (player.pokemons()[pokemonIndex - 1]) {
                const newPokemonList = moveToUp(pokemonIndex)(player.pokemons())
                player.reorderPokes(newPokemonList)
                player.savePokes()
                combatLoop.changePlayerPoke(player.activePoke())
                renderView(dom, enemy, player)
            }
        },
        storageToFirst: (pokemonIndex) =&gt; {
            const moveToFirst = (index, arr) =&gt; {
                arr.splice(0, 0, arr.splice(index, 1)[0])
            }

            const newPokemonList = player.storage()
            moveToFirst(pokemonIndex, newPokemonList)
            player.reorderStorage(newPokemonList)
            player.savePokes()
            dom.renderStorage();
        },
        storageToDown: (pokemonIndex) =&gt; {
            const moveToDown = index =&gt; arr =&gt; [
                ...arr.slice(0,parseInt(index)),
                arr[parseInt(index)+1],
                arr[parseInt(index)],
                ...arr.slice(parseInt(index)+2)
            ]

            if (player.storage()[pokemonIndex + 1]) {
                const newPokemonList = moveToDown(pokemonIndex)(player.storage())
                player.reorderStorage(newPokemonList)
                player.savePokes()
                dom.renderStorage();
            }
        },
        storageToUp: (pokemonIndex) =&gt; {
            const moveToUp = index =&gt; arr =&gt; [
                ...arr.slice(0,parseInt(index)-1),
                arr[parseInt(index)],
                arr[parseInt(index)-1],
                ...arr.slice(parseInt(index)+1)
            ]

            if (player.storage()[pokemonIndex - 1]) {
                const newPokemonList = moveToUp(pokemonIndex)(player.storage())
                player.reorderStorage(newPokemonList)
                player.savePokes()
                dom.renderStorage();
            }
        },
        moveToStorage: function(pokemonIndex) {
            const poke = player.pokemons()[pokemonIndex];
            const pokeList = player.pokemons();
            const storageList = player.storage();
            pokeList.splice(pokemonIndex, 1);
            storageList.push(poke);
            player.reorderStorage(storageList);
            player.reorderPokes(pokeList);
            dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete');
        },
        moveToRoster: function(pokemonIndex) {
            const poke = player.storage()[pokemonIndex];
            const pokeList = player.pokemons();
            const storageList = player.storage();
            storageList.splice(pokemonIndex, 1);
            pokeList.push(poke);
            player.reorderStorage(storageList);
            player.reorderPokes(pokeList);
            dom.renderStorage();
        },
        evolvePokemon: (pokemonIndex) =&gt; {
            player.pokemons()[pokemonIndex].evolve(player.pokemons()[pokemonIndex].shiny())
            renderView(dom, enemy, player)
        },
        exportSaveDialog: () =&gt; {
            document.getElementById('saveDialogTitle').innerHTML = 'Export your save'
            if (document.queryCommandSupported('copy')) {
                document.getElementById('copySaveText').style.display = 'initial'
            }
            document.getElementById('saveText').value = player.saveToString()
            document.getElementById('loadButtonContainer').style.display = 'none'
            document.getElementById('saveDialogContainer').style.display = 'block'
        },
        importSaveDialog: () =&gt; {
            document.getElementById('saveDialogTitle').innerHTML = 'Import a save'
            document.getElementById('copySaveText').style.display = 'none'
            document.getElementById('saveText').value = ''
            document.getElementById('loadButtonContainer').style.display = 'block'
            document.getElementById('saveDialogContainer').style.display = 'block'
        },
        importSave: () =&gt; {
            if (window.confirm('Loading a save will overwrite your current progress, are you sure you wish to continue?')) {
                player.loadFromString(document.getElementById('saveText').value.trim())
                document.getElementById('saveDialogContainer').style.display = 'none'
                renderView(dom, enemy, player)
            }
        },
        copySaveText: () =&gt; {
            document.getElementById('saveText').select()
            document.execCommand('copy')
            window.getSelection().removeAllRanges()
        },
        changePokeSortOrder: () =&gt; {
            const dirSelect = document.getElementById('pokeSortDirSelect')
            const direction = dirSelect.options[dirSelect.selectedIndex].value
            const orderSelect = document.getElementById('pokeSortOrderSelect')
            const sortOrder = orderSelect.options[orderSelect.selectedIndex].value
            var cmpFunc = cmpFunctions[sortOrder]
            if (direction === 'desc') {
                cmpFunc = inverseCmp(cmpFunc)
            }
            player.reorderPokes(player.pokemons().sort(cmpFunc))
            player.savePokes()
            combatLoop.changePlayerPoke(player.activePoke())
            renderView(dom, enemy, player)
        },
        changeSpriteChoice: () =&gt; {
            if (document.getElementById('spriteChoiceFront').checked) {
                userSettings.spriteChoice = 'front'
                document.getElementById('player').className = 'container poke frontSprite'
            } else {
                userSettings.spriteChoice = 'back'
                document.getElementById('player').className = 'container poke'
            }
            player.savePokes()
            renderView(dom, enemy, player)
        },
        viewStatistics: () =&gt; {
            let statisticStrings = {
                'seen':'Pokemon Seen',
                'caught':'Pokemon Caught',
                'beaten':'Pokemon Beaten',
                'shinySeen':'Shiny Pokemon Seen',
                'shinyCaught':'Shiny Pokemon Caught',
                'shinyBeaten':'Shiny Pokemon Beaten',
                'totalDamage':'Total Damage Dealt'
            }
            let statList = '';
            for (let statValue in statistics) {
                statList += '&lt;li&gt;' + statisticStrings[statValue] + ': ' + statistics[statValue] + '&lt;/li&gt;';
            }
            document.getElementById('statisticsList').innerHTML = statList
            document.getElementById('statisticsContainer').style.display = 'block'
        },
    }
}

const makeCombatLoop = (enemy, player, dom) =&gt; {
  var playerActivePoke = player.activePoke()
  var enemyActivePoke = enemy.activePoke()
  var playerTimerId = null
  var enemyTimerId = null
  var catchEnabled = false
  const playerTimer = () =&gt; {
    playerTimerId = window.setTimeout(
      () =&gt; dealDamage(playerActivePoke, enemyActivePoke, 'player')
    , playerActivePoke.attackSpeed()
    )
  }
  const enemyTimer = () =&gt; {
    enemyTimerId = window.setTimeout(
      () =&gt; dealDamage(enemyActivePoke, playerActivePoke, 'enemy')
    , enemyActivePoke.attackSpeed()
    )
  }
  const calculateDamageMultiplier = (attackingTypes, defendingTypes) =&gt; {
    const typeEffectiveness = (attackingType, defendingTypes) =&gt;
      TYPES[attackingType][defendingTypes[0]] * (defendingTypes[1] &amp;&amp; TYPES[attackingType][defendingTypes[1]] || 1)
    return Math.max(
      typeEffectiveness(attackingTypes[0], defendingTypes),
      attackingTypes[1] &amp;&amp; typeEffectiveness(attackingTypes[1], defendingTypes) || 0
     )
  }
  const eventTimerActive = false
  const eventTimerExpires = 1569967200
  
  const dealDamage = (attacker, defender, who) =&gt; {
    if (attacker.alive() &amp;&amp; defender.alive()) {
      // both alive
      const damageMultiplier = calculateDamageMultiplier(attacker.types(), defender.types())
      const damage = defender.takeDamage(attacker.avgAttack() * damageMultiplier)
      if (who === 'player') {
        dom.attackAnimation('playerImg', 'right')
        dom.gameConsoleLog(attacker.pokeName() + ' Attacked for ' + damage, 'green')
        statistics.totalDamage += damage
        playerTimer()
      }
      if (who === 'enemy') {
        dom.attackAnimation('enemyImg', 'left')
        dom.gameConsoleLog(attacker.pokeName() + ' Attacked for ' + damage, 'rgb(207, 103, 59)')
        enemyTimer()
      }

      dom.renderPokeOnContainer('enemy', enemy.activePoke())
      dom.renderPokeOnContainer('player', player.activePoke(), userSettings.spriteChoice || 'back')
        }
        if (!attacker.alive() || !defender.alive()) {
            // one is dead
            window.clearTimeout(playerTimerId)
            window.clearTimeout(enemyTimerId)

            if ((who === 'enemy') &amp;&amp; !attacker.alive()
                || (who === 'player') &amp;&amp; !defender.alive())
            {
                //enemyActivePoke is dead
                if (enemy.activePoke().shiny()) {
                    statistics.shinyBeaten++;
                } else {
                    statistics.beaten++;
                }
                if (catchEnabled == 'all' || (catchEnabled == 'new' &amp;&amp; !player.hasPokemon(enemy.activePoke().pokeName(), 0)) || enemy.activePoke().shiny()) {
                    dom.gameConsoleLog('Trying to catch ' + enemy.activePoke().pokeName() + '...', 'purple')
                    const selectedBall = (enemy.activePoke().shiny() ? player.bestAvailableBall() : player.selectedBall())
                    if (player.consumeBall(selectedBall)) {
                        dom.renderBalls(player.ballsAmmount())
                        const rngHappened =
                            RNG(
                                player.addPoke.bind(null, enemy.activePoke())
                                , (enemy.activePoke().catchRate() * player.ballRNG(selectedBall)) / 3
                            )
                        if (rngHappened) {
                            dom.gameConsoleLog('You caught ' + enemy.activePoke().pokeName() + '!!', 'purple')
                            player.addPokedex(enemy.activePoke().pokeName(), (enemy.activePoke().shiny() ? 8 : 6))
                            if (enemy.activePoke().shiny()) {
                                statistics.shinyCaught++;
                            }
                            }
                            renderView(dom, enemy, player)
                        } else {
                            dom.gameConsoleLog(enemy.activePoke().pokeName() + ' escaped!!', 'purple')
                        }
                    }
                }

                const ballsAmmount = Math.floor(Math.random() * 10) + 1
                const ballName = randomArrayElement(['pokeball', 'pokeball', 'pokeball', 'pokeball', 'pokeball', 'pokeball', 'greatball', 'greatball', 'ultraball'])
                const rngHappened2 =
                    RNG(
                        player.addBalls.bind(
                            null,
                            ballName,
                            ballsAmmount
                        )
                        , 10
                    )
                if (rngHappened2) {
                    dom.gameConsoleLog('You found ' + ballsAmmount + ' ' + ballName + 's!!', 'purple')
                    dom.renderBalls(player.ballsAmmount())
                }

                const beforeExp = player.pokemons().map((poke) =&gt; poke.level())
                const expToGive = (enemyActivePoke.baseExp() / 16) + (enemyActivePoke.level() * 3)
                playerActivePoke.giveExp(expToGive)
                dom.gameConsoleLog(playerActivePoke.pokeName() + ' won ' + Math.floor(expToGive) + 'xp', 'rgb(153, 166, 11)')
                player.pokemons().forEach((poke) =&gt; poke.giveExp((enemyActivePoke.baseExp() / 100) + (enemyActivePoke.level() / 10)))
                const afterExp = player.pokemons().map((poke) =&gt; poke.level())

                if (beforeExp.join('') !== afterExp.join('')) {
                    dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
                }

                player.savePokes()
                if (eventTimerActive &amp;&amp; Math.floor((new Date()).getTime() / 1000) &gt;= eventTimerExpires) {
                    location.reload(true)
                } else {
                    enemy.generateNew(ROUTES[userSettings.currentRegionId][userSettings.currentRouteId])
                    enemyActivePoke = enemy.activePoke()
                    player.addPokedex(enemy.activePoke().pokeName(), (enemy.activePoke().shiny() ? 2 : 1))
                    if (enemy.activePoke().shiny()) {
                        statistics.shinySeen++;
                    } else {
                        statistics.seen++;
                    }
                    enemyTimer()
                    playerTimer()
                    dom.renderPokeOnContainer('player', player.activePoke(), userSettings.spriteChoice || 'back')
                    dom.renderPokeDex('playerPokes', player.pokedexData())
                }
            } else {
                dom.gameConsoleLog(playerActivePoke.pokeName() + ' Fainted! ')
                const playerLivePokesIndexes = player.pokemons().filter((poke, index) =&gt; {
                    if (poke.alive()) {
                        return true
                    }
                })
                if (playerLivePokesIndexes.length &gt; 0) {
                    player.setActive(player.pokemons().indexOf(playerLivePokesIndexes[0]))
                    playerActivePoke = player.activePoke()
                    dom.gameConsoleLog('Go ' + playerActivePoke.pokeName() + '!')
                    refresh()
                }
                dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
            }
            dom.renderPokeOnContainer('enemy', enemy.activePoke())
        }
    }
    const init = () =&gt; {
        playerTimer()
        enemyTimer()
    }
    const stop = () =&gt; {
        window.clearTimeout(playerTimerId)
        window.clearTimeout(enemyTimerId)
    }
    const refresh = () =&gt; {
        stop()
        init()
    }
    return {
        init: init
        , stop: stop
        , changePlayerPoke: (newPoke) =&gt; {
            playerActivePoke = newPoke
            refresh()
        }
        , changeEnemyPoke: (newPoke) =&gt; {
            enemyActivePoke = newPoke
            refresh()
        }
        , refresh: refresh
        , changeCatch: (shouldCatch) =&gt; catchEnabled = shouldCatch
    }
}

const renderView = (dom, enemy, player) =&gt; {
    dom.renderPokeOnContainer('enemy', enemy.activePoke())
    dom.renderPokeOnContainer('player', player.activePoke(), userSettings.spriteChoice || 'back')
    dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
    dom.renderPokeDex('playerPokes', player.pokedexData())
    dom.renderStorage()
}


// main

const enemy = makeEnemy()
enemy.generateNew(ROUTES[userSettings.currentRegionId][userSettings.currentRouteId])

const player = makePlayer()
if (localStorage.getItem(`totalPokes`) !== null) {
    player.loadPokes()
} else {
    var starterPoke = makePoke(pokeById(randomArrayElement([1, 4, 7])), 5)
    player.addPoke(starterPoke)
    player.addPokedex(starterPoke.pokeName(), 6)
}

if (userSettings.spriteChoice === 'front') {
    document.getElementById('spriteChoiceFront').checked = true
    document.getElementById('player').className += ' frontSprite'
} else {
    document.getElementById('spriteChoiceBack').checked = true
}

const dom = makeDomHandler()
dom.renderRouteList('areasList', ROUTES[userSettings.currentRegionId])
dom.renderBalls(player.ballsAmmount())
const combatLoop = makeCombatLoop(enemy, player, dom)
const userInteractions = makeUserInteractions(player, enemy, dom, combatLoop)

renderView(dom, enemy, player)

combatLoop.init()

requestAnimationFrame(function renderTime() {
    dom.renderHeal(player.canHeal())
    requestAnimationFrame(renderTime)
})
</pre></body></html>
