function game(input) {
  
    let heroesNumber = Number(input.shift());
    let countOfPlayers = heroesNumber;
    let line = input.shift();
    let objHeroes = {};
    while (countOfPlayers > 0) {
        countOfPlayers--;
        let [name, hp, mp] = line.split(' ');
        objHeroes[name] = [];
        if (Number(hp) <= 100) {
            objHeroes[name].push(Number(hp));
        } else {
            objHeroes[name].push(100);
        }
        if (Number(mp) <= 200) {
            objHeroes[name].push(Number(mp));
        } else {
            objHeroes[name].push(200);
        }
        line = input.shift();
    }

    let heroesArr = Object.entries(objHeroes);

    while (line !== 'End') {
        for (let i = 0; i < heroesNumber; i++) {
            let champion = heroesArr[i];
            let [action, name, amount, what] = line.split(' - ');
            if (champion[0] === name) {
                switch (action) {
                    case 'Heal':
                        heal(name, amount, champion);
                        break;
                    case 'Recharge':
                        recharge(name, amount, champion);
                        break;
                    case 'CastSpell':
                        castSpell(name, amount, champion, what);
                        break;
                    case 'TakeDamage':
                        takeDamage(name, amount, champion, what);
                        break;
                    default : break;    
                }
            }
        }

        line = input.shift();
    }

    heroesArr = heroesArr.filter(hero => hero[1][0] > 0);

    for (const i of heroesArr) {
        console.log(`${i[0]}\n  HP: ${i[1][0]}\n  MP: ${i[1][1]}`);
    }
   
    function heal(name, amount, champion) {
        let diff = 100 - champion[1][0];
        champion[1][0] += Number(amount);
        if (champion[1][0] > 100) {
            champion[1][0] = 100;
            console.log(`${name} healed for ${diff} HP!`);
        } else {
            console.log(`${name} healed for ${amount} HP!`);
        }
    }

    function recharge(name, amount, champion) {
        let diff = 200 - champion[1][1];
        champion[1][1] += Number(amount);
        if (champion[1][1] > 200) {
            champion[1][1] = 200;
            console.log(`${name} recharged for ${diff} MP!`);
        } else {
            console.log(`${name} recharged for ${amount} MP!`);
        }
    }

    function castSpell(name, amount, champion, what) {
        if (champion[1][1] >= amount) {
            champion[1][1] -= amount;
            console.log(`${name} has successfully cast ${what} and now has ${champion[1][1]} MP!`);
        } else {
            console.log(`${name} does not have enough MP to cast ${what}!`);
        }
    }

    function takeDamage(name, amount, champion, what) {
        if (champion[1][0] >= amount) {
            champion[1][0] -= amount;
            console.log(`${name} was hit for ${amount} HP by ${what} and now has ${champion[1][0]} HP left!`);
            if (champion[1][0] <= 0) {
                console.log(`${name} has been killed by ${what}!`);
                champion[1][0] = 0; 
            }
            
        } else {
            console.log(`${name} has been killed by ${what}!`);
            champion[1][0] = 0; 
        }
    }
}
game([
    "4",
    "Adela 90 150",
    "SirMullich 70 40",
    "Ivor 1 111",
    "Tyris 94 61",
    "Heal - SirMullich - 50",
    "Recharge - Adela - 100",
    "CastSpell - Tyris - 1000 - Fireball",
    "TakeDamage - Tyris - 99 - Fireball",
    "TakeDamage - Ivor - 3 - Mosquito",
    "End"
]) ;   

game([
    "2",
    "Solmyr 85 120",
    "Kyrre 99 50",
    "Heal - Solmyr - 10",
    "Recharge - Solmyr - 50",
    "TakeDamage - Kyrre - 66 - Orc",
    "CastSpell - Kyrre - 15 - ViewEarth",
    "End"
]);
