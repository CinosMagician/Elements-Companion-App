const mongoose = require('mongoose');
const Card = require('../models/card');  // Adjust the path as necessary

// Define the card data
const cardData = [
// None
  {
    name: 'Mark of Chroma',
    text: 'Each turn 3 random quantums are generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/markofchroma.png',
    element: 'None',
    type: 'Permanent',
  },
  {
    name: 'Quantum Pillar',
    text: 'Each turn 3 random quantums are generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/quantumpillar.jpeg',
    element: 'None',
    type: 'Permanent',
  },
  {
    name: 'Dagger',
    text: 'Weapon: Deal 2 damage at the end of every turn. Deal 1 extra damage if you have a Death or Darkness mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/dagger.jpeg',
    element: 'None',
    type: 'Permanent',
    attack: 2,
    health: 1
  },
  {
    name: 'Shortsword',
    text: 'Weapon: Deal 3 damage at the end of every turn',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shortsword.jpeg',
    element: 'None',
    cost: 1,
    type: 'Permanent',
    attack: 3,
    health: 2
  },
  {
    name: 'Hammer',
    text: 'Weapon: Deal 3 damage at the end of every turn. Deal 1 extra damage if you have a Gravity or Earth mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/hammer.jpeg',
    element: 'None',
    cost: 2,
    type: 'Permanent',
    attack: 3,
    health: 4
  },
  {
    name: 'Short Bow',
    text: 'Weapon: Deal 3 damage at the end of every turn. Deal 1 extra damage if you have an Air mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shortbow.jpeg',
    element: 'None',
    cost: 2,
    type: 'Permanent',
    attack: 3,
    health: 3
  },
  {
    name: 'Shield',
    text: 'Shield: Reduce damage by 1.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shield.jpeg',
    element: 'None',
    cost: 1,
    type: 'Permanent',
  },
  {
    name: 'Malignant Cell',
    text: 'Infest:\nGenerates a new malignant cell every turn.',
    hasFlavourText: false,
    isToken: true,
    imageUrl: '/assets/images/cardArt/malignantcell.jpeg',
    element: 'None',
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Relic',
    text: 'The remains of what was once a valued creature or artifact. Probably still worth a few coins.',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/relic.jpeg',
    element: 'None',
    cost: 1,
    type: 'Spell',
  },
// Entropy
  {
    name: 'Mark of Entropy',
    text: 'Each turn [icon:entropysmall] is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/markofentropy.png',
    element: 'Entropy',
    type: 'Permanent',
  },
  {
    name: 'Amethyst Pillar',
    text: 'Each turn [icon:entropysmall] is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/amethystpillar.jpeg',
    element: 'Entropy',
    type: 'Permanent',
  },
  {
    name: 'Entropy Pendulum',
    text: 'Alternately generates  [icon:entropysmall]  and 1 quantum matching your mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/entropypendulum.jpeg',
    element: 'Entropy',
    type: 'Permanent',
  },
  {
    name: "Maxwell's Demon",
    text: '[icon:entropysmall] [icon:entropysmall] Paradox:\nKill the target creature if its attack is higher than its defence',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/maxwellsdemon.jpeg',
    element: 'Entropy',
    cost: 5,
    type: 'Creature',
    attack: 3,
    health: 2
  },
  {
    name: 'Abomination',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/abomination.jpeg',
    element: 'Entropy',
    cost: 5,
    type: 'Creature',
    attack: 5,
    health: 5
  },
  {
    name: 'Purple Dragon',
    text: 'flavour text.',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/purpledragon.jpeg',
    element: 'Entropy',
    cost: 10,
    type: 'Creature',
    attack: 10,
    health: 5
  },
  {
    name: 'Dissapation Shield',
    text: 'Shield: Use 1 [icon:entropysmall] to absorb 3 damages from physical damage sources.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/dissapationshield.jpeg',
    element: 'Entropy',
    cost: 3,
    type: 'Permanent'
  },
  {
    name: 'Lycanthrope',
    text: '[icon:darknesssmall] [icon:darknesssmall] Lycanthropy:\n The Lycanthrope gains +5/+5 permanently. Can only be used Once.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/lycanthrope.jpeg',
    element: 'Entropy',
    cost: 2,
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Chaos Seed',
    text: "A random effect is inflicted on the target. See Random Effects tab to apply affect.",
    // One of the following effects is applied to the target: Infect, Lightning, Ice Bolt, Fire Bolt, Freeze, Parallel Universe, Lobotomize, Drain Life, Sniper, Shock Wave, Reverse Time, Gravity Pull
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/chaosseed.jpeg',
    element: 'Entropy',
    cost: 1,
    type: 'Spell'
  },
  {
    name: 'Nova',
    text: 'Generate 12 quanta. 1 for each element. Do not cast more than twice per turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/nova.jpeg',
    element: 'Entropy',
    type: 'Spell'
  },
  {
    name: 'Singularity',
    text: 'At the end of your turn, apply 1 effect from the Random Effects tab.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/singularity.jpeg',
    element: 'Entropy',
    cost: 10,
    type: 'Creature',
    attack: -1,
    health: 3
  },
  {
    name: 'Mutation',
    text: 'Mutate the target creature into an abomination, unless it dies... or turn into something weird.',
    // Abomination chance = 50%, Mutant chance = 40%, Death chance = 10%
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/mutation.jpeg',
    element: 'Entropy',
    cost: 2,
    type: 'Spell'
  },
  {
    name: 'Mutant Token',
    text: 'Used for when a creature is turned into a Mutant. See Random Effects tab for stat calculation.',
    hasFlavourText: false,
    isToken: true,
    imageUrl: '/assets/images/cardArt/fallenelf.jpeg',
    element: 'Entropy',
    type: 'Creature',
    attack: 0,
    health: 0
  },
  {
    name: 'Fallen Elf',
    text: '[icon:lifesmall] Mutation:\nthe target creature into an abomination, unless it dies... or turn into something weird.',
    // Abomination chance = 50%, Mutant chance = 40%, Death chance = 10%
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/fallenelf.jpeg',
    element: 'Entropy',
    cost: 4,
    type: 'Creature',
    attack: 3,
    health: 2
  },
  {
    name: 'Antimatter',
    text: 'Invert the attack power of the target creature (the creature inflict heals instead of damage)',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/antimatter.jpeg',
    element: 'Entropy',
    cost: 8,
    type: 'Spell'
  },
  {
    name: 'Butterfly Effect',
    text: "Target a low attack power creature (less than 3). The creature's skill is now                [icon:entropysmall] [icon:entropysmall] [icon:entropysmall] : Destroy.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/butterflyeffect.jpeg',
    element: 'Entropy',
    cost: 5,
    type: 'Spell'
  },
  {
    name: 'Pandemonium',
    text: 'A random effect is inflicted to every creature on the field. Removes invisibility.',
    // One of the following effects is applied to the target: Infect, Lightning, Ice Bolt, Fire Bolt, Freeze, Parallel Universe, Lobotomize, Drain Life, Sniper, Shock Wave, Reverse Time, Gravity Pull
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/pandemonium.jpeg',
    element: 'Entropy',
    cost: 3,
    type: 'Spell'
  },
  {
    name: "Schrödinger's Cat",
    text: '[icon:entropysmall] Dead and Alive:\nKill this creature; death effects are triggered. This creature is still alive.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/schrodingerscat.jpeg',
    element: 'Entropy',
    cost: 1,
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Discord',
    text: "Weapon: Deal 4 damage and randomly convert 4 of the opponent's quantums into other elements.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/discord.jpeg',
    element: 'Entropy',
    cost: 3,
    type: 'Permanent',
    attack: 4,
    health: 3
  },
  {
    name: 'Shard of Serendipity',
    text: 'Add 1 [icon:entropysmall] card from your deck to your hand except Shard of Serendipity. Shuffle your deck and draw 2 cards.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shardofserendipity.jpeg',
    element: 'Entropy',
    cost: 3,
    type: 'Spell'
  },
  {
    name: 'Purple Nymph',
    text: '[icon:entropysmall] [icon:entropysmall] [icon:entropysmall] [icon:entropysmall] : Antimatter\nInvert the attack power of the target creature.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/purplenymph.jpeg',
    element: 'Entropy',
    cost: 9,
    type: 'Creature',
    attack: 3,
    health: 1
  },
  // Death
  {
    name: 'Mark of Death',
    text: 'Each turn  [icon:deathsmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/markofdeath.png',
    element: 'Death',
    type: 'Permanent',
  },
  {
    name: 'Bone Pillar',
    text: 'Each turn  [icon:deathsmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/bonepillar.jpeg',
    element: 'Death',
    type: 'Permanent',
  },
  {
    name: 'Death Pendulum',
    text: 'Alternately generates  [icon:deathsmall]  and 1 quantum matching your mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/deathpendulum.jpeg',
    element: 'Death',
    type: 'Permanent',
  },
  {
    name: 'Bone Dragon',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/bonedragon.jpeg',
    element: 'Death',
    cost: 10,
    type: 'Creature',
    attack: 10,
    health: 5
  },
  {
    name: 'Virus',
    text: 'Infect:\nSacrifice Virus to inflict 1 poison to a target creature',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/virus.jpeg',
    element: 'Death',
    cost: 1,
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Flesh Spider',
    text: '[icon:airsmall] : Web\nThe target creature loses its "airborne" skill',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/fleshspider.jpeg',
    element: 'Death',
    cost: 3,
    type: 'Creature',
    attack: 3,
    health: 3
  },
  {
    name: 'Vulture',
    text: 'Scavenger:\nEvery time a creature dies, Vulture gains +1/+1',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/vulture.jpeg',
    element: 'Death',
    cost: 3,
    type: 'Creature',
    attack: 0,
    health: 1
  },
  {
    name: 'Skull Shield',
    text: 'Shield: Reduce damage by 1. Attacking creatures have a small chance to die and turn into skeletons.',
    // Chance: 50%/Current creature HP
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/skullshield.jpeg',
    element: 'Death',
    cost: 3,
    type: 'Permanent'
  },
  {
    name: 'Skeleton',
    text: 'Undead: Skeleton turns into a random creature if targeted with reverse time.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/skeleton.jpeg',
    element: 'Death',
    cost: 1,
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Boneyard',
    text: 'Every time a creature is killed, boneyard generates 1 skeleton.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/boneyard.jpeg',
    element: 'Death',
    cost: 3,
    type: 'Permanent'
  },
  {
    name: 'Poison',
    text: 'Inflicts 2 poison damage (to your opponent) at the end of every turn. Poison damage is cumulative.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/poison.jpeg',
    element: 'Death',
    cost: 1,
    type: 'Spell'
  },
  {
    name: 'Plague',
    text: 'Infect every enemey creature (+1 Poison). Removes invisibility.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/plague.jpeg',
    element: 'Death',
    cost: 4,
    type: 'Spell'
  },
  {
    name: 'Bone Wall',
    text: 'Shield: Place 7 bone shields on this card that absorb damage from a single source. Gains 2 shields when a creature dies.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/bonewall.jpeg',
    element: 'Death',
    cost: 7,
    type: 'Permanent'
  },
  {
    name: 'Aflatoxin',
    text: 'Poison the target creature\n(+2 Poison). If the target creature dies, it turns into a malignant cell.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/aflatoxin.jpeg',
    element: 'Death',
    cost: 6,
    type: 'Spell'
  },
  {
    name: 'Mummy',
    text: 'Mummy turns into a Pharaoh if targeted with reverse time.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/mummy.jpeg',
    element: 'Death',
    cost: 4,
    type: 'Creature',
    attack: 5,
    health: 3
  },
  {
    name: 'Deathstalker',
    text: 'Deadly Venom:\nAdd 2 poison damage to each successful attack. Cause poisoning if ingested.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/deathstalker.jpeg',
    element: 'Death',
    cost: 2,
    type: 'Creature',
    attack: 0,
    health: 1
  },
  {
    name: 'Soul Catcher',
    text: "Every time a creature\nis killed, Soul Catcher generates  [icon:deathsmall] [icon:deathsmall]",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/soulcatcher.jpeg',
    element: 'Death',
    type: 'Permanent'
  },
  {
    name: 'Arsenic',
    text: "Weapon: Deal 2 damage and 1 poison at the end of every turn. Poison damage is cumulative",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/arsenic.jpeg',
    element: 'Death',
    cost: 2,
    type: 'Permanent',
    attack: 2,
    health: 7
  },
  {
    name: 'Shard of Sacrifice',
    text: 'Inflict 48 damage to yourself and remove all but your  [icon:deathsmall]  quanta. Swap damage with healing. Lasts 2 turns.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shardofsacrifice.jpeg',
    element: 'Death',
    cost: 2,
    type: 'Spell'
  },
  {
    name: 'Grey Nymph',
    text: '[icon:deathsmall] : Aflatoxin, Poison the target creature (+2 poison). If the target creature dies, it turns into a malignant cell.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/greynymph.jpeg',
    element: 'Death',
    cost: 8,
    type: 'Creature',
    attack: 7,
    health: 8
  },
// Gravity
  {
    name: 'Mark of Gravity',
    text: 'Each turn  [icon:gravitysmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/markofgravity.png',
    element: 'Gravity',
    type: 'Permanent',
  },
  {
    name: 'Gravity Pillar',
    text: 'Each turn  [icon:gravitysmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/gravitypillar.jpeg',
    element: 'Gravity',
    type: 'Permanent',
  },
  {
    name: 'Gravity Pendulum',
    text: 'Alternately generates  [icon:gravitysmall]  and 1 quantum matching your mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/gravitypendulum.jpeg',
    element: 'Gravity',
    type: 'Permanent',
  },
  {
    name: 'Sapphire Charger',
    text: 'Momentum:\nThe damage caused by the Sapphire Charger can not be reduced, shields are ignored.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/sapphirecharger.jpeg',
    element: 'Gravity',
    cost: 5,
    type: 'Creature',
    attack: 4,
    health: 5
  },
  {
    name: 'Armagio',
    text: '[icon:gravitysmall] : Gravity Pull\nThe damage inflicted to you is redirected on Armagio.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/armagio.jpeg',
    element: 'Gravity',
    cost: 5,
    type: 'Creature',
    attack: 1,
    health: 25
  },
  {
    name: 'Graviton Mercenary',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/gravitonmercenary.jpeg',
    element: 'Gravity',
    cost: 4,
    type: 'Creature',
    attack: 3,
    health: 5
  },
  {
    name: 'Colossal Dragon',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/colossaldragon.jpeg',
    element: 'Gravity',
    cost: 10,
    type: 'Creature',
    attack: 7,
    health: 15
  },
  {
    name: 'Gravity Shield',
    text: "Shield:\nAny creature that has more than 5 HP's is unable to reach you",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/gravityshield.jpeg',
    element: 'Gravity',
    cost: 5,
    type: 'Permanent'
  },
  {
    name: 'Momentum',
    text: 'The target creature ignores shield effects and gains +1/+1',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/momentum.jpeg',
    element: 'Gravity',
    cost: 2,
    type: 'Spell'
  },
  {
    name: 'Otyugh',
    text: "[icon:gravitysmall] : Devour\nSwallow a smaller (less HP's) creature and gain +1/+1",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/otyugh.jpeg',
    element: 'Gravity',
    cost: 4,
    type: 'Creature',
    attack: 0,
    health: 3
  },
  {
    name: 'Gravity Pull',
    text: 'The creature enchanted with gravity pull will absorb all the damage directed against its owner.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/gravitypull.jpeg',
    element: 'Gravity',
    cost: 2,
    type: 'Spell'
  },
  {
    name: 'Graviton Fire Eater',
    text: "[icon:firesmall] : Ablaze\nGraviton Fire Eater gains\n+2/+0",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/gravitonfireeater.jpeg',
    element: 'Gravity',
    cost: 2,
    type: 'Creature',
    attack: 0,
    health: 5
  },
  {
    name: 'Black Hole',
    text: 'Absorb 3 quanta per element from the opponent. Gain 1 HP per absorbed quantum.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/blackhole.jpeg',
    element: 'Gravity',
    cost: 4,
    type: 'Spell'
  },
  {
    name: 'Chimera',
    text: "Combine all your creatures in a single one. Gravity pull, Momentum",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/chimera.jpeg',
    element: 'Gravity',
    cost: 7,
    type: 'Creature',
    attack: 0,
    health: 0
  },
  {
    name: 'Catapult',
    text: '[icon:gravitysmall] [icon:gravitysmall] : Sacrifice the target creature and damage your opponent. Larger creatures inflict more damage.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/catapult.jpeg',
    element: 'Gravity',
    cost: 3,
    type: 'Permanent',
  },
  {
    name: 'Acceleration',
    text: 'Replace the target creature skill with acceleration: gain\n+2 / -1 per turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/acceleration.jpeg',
    element: 'Gravity',
    cost: 3,
    type: 'Spell'
  },
  {
    name: 'Graviton Salvager',
    text: 'Salvaging: a permanent destroyed by your opponent is returned to your hand.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/gravitonsalvager.jpeg',
    element: 'Gravity',
    cost: 1,
    type: 'Creature',
    attack: 1,
    health: 5
  },
  {
    name: 'Titan',
    text: "Weapon: Deal 7 damages at the end of every turn. Momentum: Shield effects are ignored.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/titan.jpeg',
    element: 'Gravity',
    cost: 5,
    type: 'Permanent',
    attack: 7,
    health: 50
  },
  {
    name: 'Shard of Focus',
    text: 'Accretion:\nDestroy a permanent and gain +0/+15. Turn into a black hole if HP>45.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shardoffocus.jpeg',
    element: 'Gravity',
    cost: 6,
    type: 'Creature',
    attack: 0,
    health: 1
  },
  {
    name: 'Amber Nymph',
    text: '[icon:gravitysmall] [icon:gravitysmall] [icon:gravitysmall] : Black Hole\nAbsorb 3 quanta per element from the opponent. Gain 1 HP per absorbed quantum.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/ambernymph.jpeg',
    element: 'Gravity',
    cost: 9,
    type: 'Creature',
    attack: 1,
    health: 3
  },
// Earth
  {
    name: 'Mark of Earth',
    text: 'Each turn  [icon:earthsmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/markofearth.png',
    element: 'Earth',
    type: 'Permanent',
  },
  {
    name: 'Stone Pillar',
    text: 'Each turn  [icon:earthsmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/stonepillar.jpeg',
    element: 'Earth',
    type: 'Permanent',
  },
  {
    name: 'Earth Pendulum',
    text: 'Alternately generates  [icon:earthsmall]  and 1 quantum matching your mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/earthpendulum.jpeg',
    element: 'Earth',
    type: 'Permanent',
  },
  {
    name: 'Antlion',
    text: '[icon:earthsmall] : Burrow\nThe Antlion can not be targeted, but its damage is halved.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/antlion.jpeg',
    element: 'Earth',
    cost: 2,
    type: 'Creature',
    attack: 2,
    health: 3
  },
  {
    name: 'Hematite Golem',
    text: "flavour text",
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/hematitegolem.jpeg',
    element: 'Earth',
    cost: 4,
    type: 'Creature',
    attack: 4,
    health: 6
  },
  {
    name: 'Stone Dragon',
    text: "This mighty dragon of stone is no joke, with its raw power in both its attack and defense.",
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/stonedragon.jpeg',
    element: 'Earth',
    cost: 10,
    type: 'Creature',
    attack: 8,
    health: 10
  },
  {
    name: 'Titanium Shield',
    text: "Shield:\nThe damage dealt to you from physical damage sources is reduced by 2.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/titaniumshield.jpeg',
    element: 'Earth',
    cost: 4,
    type: 'Permanent'
  },
  {
    name: 'Plate Armor',
    text: 'The target creature gains +0/+3',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/platearmor.jpeg',
    element: 'Earth',
    cost: 1,
    type: 'Spell'
  },
  {
    name: 'Gnome Rider',
    text: "Each turn  [icon:earthsmall]  is generated",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/gnomerider.jpeg',
    element: 'Earth',
    cost: 1,
    type: 'Creature',
    attack: 1,
    health: 2
  },
  {
    name: 'Graboid',
    text: "[icon:timesmall] : Evolve\nTurn the Graboid into a Shrieker. Graboid enters the game burrowed.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/graboid.jpeg',
    element: 'Earth',
    cost: 3,
    type: 'Creature',
    attack: 2,
    health: 3
  },
  {
    name: 'Shrieker',
    text: '[icon:earthsmall] : Burrow\nThe Shrieker can not be targeted, but its damage is halved.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shrieker.jpeg',
    element: 'Earth',
    cost: 8,
    type: 'Creature',
    attack: 8,
    health: 3
  },
  {
    name: 'Enchant Artifact',
    text: 'The target permanent can not be target of any skill. It does not work on creatures.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/enchantartifact.jpeg',
    element: 'Earth',
    cost: 2,
    type: 'Spell'
  },
  {
    name: 'Earthquake',
    text: 'Destroy up to 3 pillars in the target cluster.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/earthquake.jpeg',
    element: 'Earth',
    cost: 3,
    type: 'Spell'
  },
  {
    name: 'Stone Skin',
    text: "Add X HP's to your maximum life points. X is the number of  [icon:earthsmall]  that you own.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/stoneskin.jpeg',
    element: 'Earth',
    cost: 2,
    type: 'Spell'
  },
  {
    name: 'Basilisk Blood',
    text: 'The target creature gains +0/+20 but can not attack or use skills for 6 turns',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/basiliskblood.jpeg',
    element: 'Earth',
    cost: 2,
    type: 'Spell'
  },
  {
    name: 'Iridium Warden',
    text: "[icon:earthsmall] : Guard (Do not attack) Delay the target creature for 1 turn (cumulative) and attack it unless it is airborne.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/iridiumwarden.jpeg',
    element: 'Earth',
    cost: 1,
    type: 'Creature',
    attack: 0,
    health: 3
  },
  {
    name: 'Shard Golem',
    text: "Reassemble your last shard golem. See Random Effects tab for Shard Golem Stats",
    hasFlavourText: false,
    isToken: true,
    imageUrl: '/assets/images/cardArt/shardgolem.jpeg',
    element: 'Earth',
    cost: 8,
    type: 'Creature',
    attack: 0,
    health: 0
  },
  {
    name: 'Pulverizer',
    text: "Weapon: Deal 5 damage at the end of every turn. [icon:gravitysmall] [icon:gravitysmall] [icon:gravitysmall] : Shatter the target permanent.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/pulverizer.jpeg',
    element: 'Earth',
    cost: 4,
    type: 'Permanent',
    attack: 5,
    health: 12
  },
  {
    name: 'Shard of Integrity',
    text: 'Combine all the shards in your hand to form and summon a shard golem.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shardofintegrity.jpeg',
    element: 'Earth',
    cost: 2,
    type: 'Spell',
  },
  {
    name: 'Auburn Nymph',
    text: '[icon:earthsmall] [icon:earthsmall] [icon:earthsmall] : Petrify\nThe target creature gains +0/+20 but can not attack or use skills for 6 turns.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/auburnnymph.jpeg',
    element: 'Earth',
    cost: 8,
    type: 'Creature',
    attack: 4,
    health: 8
  },
// Life
  {
    name: 'Mark of Life',
    text: 'Each turn  [icon:lifesmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/markoflife.png',
    element: 'Life',
    type: 'Permanent',
  },
  {
    name: 'Emerald Pillar',
    text: 'Each turn  [icon:lifesmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/emeraldpillar.jpeg',
    element: 'Life',
    type: 'Permanent',
  },
  {
    name: 'Life Pendulum',
    text: 'Alternately generates  [icon:lifesmall]  and 1 quantum matching your mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/lifependulum.jpeg',
    element: 'Life',
    type: 'Permanent',
  },
  {
    name: 'Emerald Dragon',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/emeralddragon.jpeg',
    element: 'Life',
    cost: 10,
    type: 'Creature',
    attack: 10,
    health: 6
  },
  {
    name: 'Horned Frog',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/hornedfrog.jpeg',
    element: 'Life',
    cost: 2,
    type: 'Creature',
    attack: 3,
    health: 3
  },
  {
    name: 'Rustler',
    text: '[icon:lightsmall] : Photosynthesis.\nGain [icon:lifesmall] [icon:lifesmall] . This skill can be used multiple times per turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/rustler.jpeg',
    element: 'Life',
    cost: 1,
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Cockatrice',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/cockatrice.jpeg',
    element: 'Life',
    cost: 3,
    type: 'Creature',
    attack: 4,
    health: 4
  },
  {
    name: 'Forest Spirit',
    text: '[icon:watersmall] : Growth.\nThe Forest Spirit gains +2/+2',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/forestspirit.jpeg',
    element: 'Life',
    cost: 2,
    type: 'Creature',
    attack: 1,
    health: 1
  },
  {
    name: 'Heal',
    text: "Heal yourself for up to 20 HP's",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/heal.jpeg',
    element: 'Life',
    cost: 3,
    type: 'Spell'
  },
  {
    name: 'Thorn Carapace',
    text: 'Shield: the attacking creatures have a 75% chance to be infected (Roll a d4, a 4 is safe, else +1 Poison)',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/thorncarapace.jpeg',
    element: 'Life',
    cost: 7,
    type: 'Permanent'
  },
  {
    name: 'Emerald Shield',
    text: 'Shield: Reduce damage by 1. Spells are reflected against your opponent. Can not be destroyed or stolen.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/emeraldshield.jpeg',
    element: 'Life',
    cost: 5,
    type: 'Permanent'
  },
  {
    name: 'Empathic Bond',
    text: 'Every creature in your possession heals you for 1 HP at the end of every turn',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/empathicbonds.jpeg',
    element: 'Life',
    cost: 5,
    type: 'Permanent'
  },
  {
    name: 'Adrenaline',
    text: 'The target creature attacks multiple times per turn. Smaller creatures gain more extra attacks.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/adrenaline.jpeg',
    element: 'Life',
    cost: 4,
    type: 'Spell'
  },
  {
    name: 'Forest Scorpion',
    text: 'Venom:\nAdd 1 poison damage to each successful attack. Cause poisoning if ingested.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/forestscorpion.jpeg',
    element: 'Life',
    cost: 3,
    type: 'Creature',
    attack: 1,
    health: 2
  },
  {
    name: 'Mitosis',
    text: 'The non-weapon creature skill is now mitosis: generate a daughter creature. The skill cost matches the card cost.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/mitosis.jpeg',
    element: 'Life',
    cost: 5,
    type: 'Spell'
  },
  {
    name: 'Druidic Staff',
    text: "Weapon: Deal 2 damages at the end of every turn. Heal yourself for up to 5 HP's",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/druidicstaff.jpeg',
    element: 'Life',
    cost: 2,
    type: 'Permanent',
    attack: 2,
    health: 7
  },
  {
    name: 'Shard of Gratitude',
    text: 'Heal yourself for up to 3 HP at the end of every turn. 5 if your mark is [icon:lifesmall] .',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shardofgratitude.jpeg',
    element: 'Life',
    cost: 3,
    type: 'Permanent'
  },
  {
    name: 'Green Nymph',
    text: '[icon:lifesmall] [icon:lifesmall] : Adrenaline\n The target creature attacks multiple times per turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/greennymph.jpeg',
    element: 'Life',
    cost: 8,
    type: 'Creature',
    attack: 3,
    health: 6
  },
// Fire
  {
    name: 'Mark of Fire',
    text: 'Each turn  [icon:firesmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/markoffire.png',
    element: 'Fire',
    type: 'Permanent',
  },
  {
    name: 'Burning Pillar',
    text: 'Each turn  [icon:firesmall]  is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/burningpillar.jpeg',
    element: 'Fire',
    type: 'Permanent',
  },
  {
    name: 'Fire Pendulum',
    text: 'Alternately generates  [icon:firesmall]  and 1 quantum matching your mark.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/firependulum.jpeg',
    element: 'Fire',
    type: 'Permanent',
  },
  {
    name: 'Ash Eater',
    text: 'flavour text',
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/asheater.jpeg',
    element: 'Fire',
    cost: 1,
    type: 'Creature',
    attack: 2,
    health: 1
  },
  {
    name: 'Crimson Dragon',
    text: "This mighty dragon of flames is no joke, with its raw power in both its attack and heat.",
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/crimsondragon.jpeg',
    element: 'Fire',
    cost: 10,
    type: 'Creature',
    attack: 12,
    health: 3
  },
  {
    name: 'Fire Spirit',
    text: "[icon:firesmall] : Ablaze\nThe Fire Spirit gains +2/+0",
    hasFlavourText: true,
    imageUrl: '/assets/images/cardArt/firespirit.jpeg',
    element: 'Fire',
    cost: 2,
    type: 'Creature',
    attack: 0,
    health: 2
  },
  {
    name: 'Fire Bolt',
    text: 'Deals 3 damage to the target for each 10 fire quantums in your possession.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/firebolt.jpeg',
    element: 'Fire',
    cost: 3,
    type: 'Spell'
  },
  {
    name: 'Fire Shield',
    text: "Shield: 1 damage is dealt to any attacking creature",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/firesheild.jpeg',
    element: 'Fire',
    cost: 6,
    type: 'Permanent'
  },
  {
    name: 'Deflagration',
    text: "Destroy the targeted permanent",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/deflagration.jpeg',
    element: 'Fire',
    cost: 3,
    type: 'Spell',
  },
  {
    name: 'Rain of Fire',
    text: "Deals 3 damages to every enemy creature. Removes invisibility.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/rainoffire.jpeg',
    element: 'Fire',
    cost: 7,
    type: 'Spell'
  },
  {
    name: 'Immolation',
    text: 'Sacrifice a creature to generate 6  [icon:firesmall]  plus 1 quantum for each non-fire element.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/immolation.jpeg',
    element: 'Fire',
    type: 'Spell'
  },
  {
    name: 'Lava Golem',
    text: '[icon:earthsmall] : Growth\nLava Golem gains +2/+2',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/lavagolem.jpeg',
    element: 'Fire',
    cost: 5,
    type: 'Creature',
    attack: 5,
    health: 1
  },
  {
    name: 'Rage Potion',
    text: 'The target creature gains +5/-5',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/ragepotion.jpeg',
    element: 'Fire',
    cost: 3,
    type: 'Spell'
  },
  {
    name: 'Phoenix',
    text: "Phoenix turns into Ash when killed",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/phoenix.jpeg',
    element: 'Fire',
    cost: 7,
    type: 'Creature',
    attack: 7,
    health: 1
  },
  {
    name: 'Ash',
    text: '[icon:firesmall] : Rebirth\nTurn this card into a Phoenix',
    hasFlavourText: false,
    isToken: true,
    imageUrl: '/assets/images/cardArt/ash.jpeg',
    element: 'Fire',
    cost: 7,
    type: 'Creature',
    attack: 0,
    health: 5
  },
  {
    name: 'Seraph',
    text: '[icon:lightsmall] : Divine shield.\nSeraph can not be targeted for 1 turn.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/seraph.jpeg',
    element: 'Fire',
    cost: 9,
    type: 'Creature',
    attack: 10,
    health: 1
  },
  {
    name: 'Fahrenheit',
    text: "Weapon: Deal 4+X damage at the end of every turn. X is the number of [icon:firesmall] you own, divided by 5.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/fahrenheit.jpeg',
    element: 'Fire',
    cost: 3,
    type: 'Permanent',
    attack: 4,
    health: 5
  },
  {
    name: 'Shard of Bravery',
    text: 'Your opponent draws 2 cards, 3 if your mark is [icon:firesmall] . Draw an equal amount of cards.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/shardofbravery.jpeg',
    element: 'Fire',
    cost: 2,
    type: 'Spell',
  },
  {
    name: 'Red Nymph',
    text: '[icon:firesmall] [icon:firesmall] [icon:firesmall] : Rage\nThe target creature gains +5/-5',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/rednymph.jpeg',
    element: 'Fire',
    cost: 8,
    type: 'Creature',
    attack: 1,
    health: 6
  },
// Water
// Light
// Wind
// Time
// Darkness
// Aether
  {
    name: "Fractal",
    text: "Fill your hand with copies of the target creature's card. All the remaining aether quanta is consumed.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/fractal.jpeg',
    element: 'Aether',
    cost: 10,
    type: 'Spell'
  },
  {
    name: 'Water Pillar',
    text: 'Each turn [icon:watersmall] is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/waterpillar.jpeg',
    element: 'Water',
    type: 'Permanent',
  },
  {
    name: 'Psion',
    text: "Psion's attacks deal spell damage.",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/psion.jpeg',
    element: 'Aether',
    cost: 4,
    type: 'Creature',
    attack: 4,
    health: 4
  },
  {
    name: 'CinosMagician',
    text: "[icon:lightsmall] [icon:darknesssmall] : Chaos Blast.\nDeal 4 damage to target creature",
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/cinosmagician.png',
    element: 'Entropy',
    cost: 9,
    type: 'Creature',
    attack: 9,
    health: 4
  },
  // Add more cards as needed
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/elementsthegame', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedCards = async () => {
  try {
    // Clear the existing cards
    await Card.deleteMany({});
    console.log('Old card data removed.');

    // Insert the new card data
    await Card.insertMany(cardData);
    console.log('New card data seeded.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding card data:', error);
    mongoose.connection.close();
  }
};

seedCards();
