const mongoose = require('mongoose');
const Card = require('../models/card');  // Adjust the path as necessary

// Define the card data
const cardData = [
  // None
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
    imageUrl: '/assets/images/cardArt/markofdeath.png',
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
    text: 'Poison the target creature (+2 Poison). If the target creature dies, it turns into a malignant cell.',
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
    text: '[icon:deathsmall] : Aflatoxin\n Poison the target creature (+2 poison). If the target creature dies, it turns into a malignant cell.',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/greynymph.jpeg',
    element: 'Death',
    cost: 8,
    type: 'Creature',
    attack: 7,
    health: 8
  },
  // Gravity
  // Earth
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
    name: 'Water Pillar',
    text: 'Each turn [icon:watersmall] is generated',
    hasFlavourText: false,
    imageUrl: '/assets/images/cardArt/waterpillar.jpeg',
    element: 'Water',
    type: 'Permanent',
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
