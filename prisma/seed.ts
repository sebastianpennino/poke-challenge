import { PrismaClient, Rarity, PokemonType, PokemonTGGEpxansions } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // Default user email
  const email = "cu@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  // hash the password
  const hashedPassword = await bcrypt.hash("welcome123", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const attackData = {
    gnaw: {
      name: 'Gnaw',
      body: 'Some description for gnaw.',
      damage: 20,
    },
    fireBlast: {
      name: 'Fire Blast',
      body: 'Some description for fire blast.',
      damage: 120,
    },
    slam: {
      name: "Slam",
      body: "Some description for slam",
      damage: 40,
    },
    bodySlam: {
      name: "Body Slam",
      body: "Some description for body slam",
      damage: 40,
    },
    giantWave: {
      name: "Giant Wave",
      body: "Some description for giant wave",
      damage: 160,
    },
    digClaws: {
      name: "Dig Claws",
      damage: 20,
    },
    specialBlow: {
      name: "Special Blow",
      body: "Some description for special blow",
      damage: 60,
    },
    pound: {
      name: "Pound",
      body: "Some description for pound",
      damage: 10,
    },
    shinningClaws: {
      name: "Shinning Claws",
      body: "lorem ipsum",
      damage: 10,
    },
    hyperbeam: {
      name: "Hyper Beam",
      damage: 200,
    },
    transform: {
      name: 'Transform',
      body: "it doesnt causes damage",
      damage: 0,
    },
    flamethrower: {
      name: 'Flamethrower',
      damage: 70,
    },
    waterGun: {
      name: 'Water Gun',
      damage: 30,
    },
    vineWhip: {
      name: 'Vine Whip',
      damage: 40,
    },
    iceBeam: {
      name: 'Ice Beam',
      damage: 90,
    },
    dynamicPunch: {
      name: 'Dynamic Punch',
      damage: 80,
    },
    shadowBall: {
      name: 'Shadow Ball',
      damage: 80,
    },
    earthquake: {
      name: 'Earthquake',
      damage: 40,
    },
    hurricane: {
      name: 'Hurricane',
      damage: 60,
    },
    xScissor: {
      name: 'X-Scissor',
      damage: 50,
    },
    stoneEdge: {
      name: 'Stone Edge',
      damage: 100,
    },
    dragonClaw: {
      name: 'Dragon Claw',
      damage: 80,
    },
    ironTail: {
      name: 'Iron Tail',
      damage: 100,
    },
    moonblast: {
      name: 'Moonblast',
      damage: 90,
    },
  }

  const cardData = [
    {
      title: "Pikachu",
      hp: 60,
      weakness: PokemonType.FIGHTING,
      resistance: PokemonType.STEEL,
      rarity: Rarity.COMMON,
      type: PokemonType.ELECTRIC,
      attacks: [
        { ...attackData.gnaw },
      ],
    },
    {
      title: "Charizard",
      hp: 180,
      weakness: PokemonType.WATER,
      rarity: Rarity.RARE,
      type: PokemonType.FIRE,
      attacks: [
        { ...attackData.fireBlast },
      ],
    },
    {
      title: "Onix",
      hp: 60,
      weakness: PokemonType.ROCK,
      rarity: Rarity.UNCOMMON,
      type: PokemonType.FIGHTING,
      attacks: [
        { ...attackData.slam },
        { ...attackData.bodySlam },
      ],

    },
    {
      title: "Feraligatr",
      hp: 180,
      weakness: PokemonType.ELECTRIC,
      rarity: Rarity.RARE,
      type: PokemonType.WATER,
      attacks: [
        { ...attackData.giantWave },
      ],
      expansion: PokemonTGGEpxansions.B2
    },
    {
      title: "Sneasel",
      hp: 70,
      weakness: PokemonType.GRASS,
      rarity: Rarity.UNCOMMON,
      type: PokemonType.DARK,
      attacks: [
        { ...attackData.digClaws },
      ],
    },
    {
      title: "Scizor",
      hp: 120,
      weakness: PokemonType.FIRE,
      resistance: PokemonType.PSYCHIC,
      rarity: Rarity.RARE,
      type: PokemonType.STEEL,
      attacks: [
        { ...attackData.specialBlow },
      ],
      expansion: PokemonTGGEpxansions.FO
    },
    {
      title: "Treecko",
      hp: 40,
      weakness: PokemonType.FIRE,
      resistance: PokemonType.WATER,
      rarity: Rarity.COMMON,
      type: PokemonType.DARK,
      attacks: [
        { ...attackData.pound },
        { ...attackData.shinningClaws },
      ],
    },
    {
      title: "Ditto",
      hp: 20,
      weakness: PokemonType.FIGHTING,
      resistance: PokemonType.GHOST,
      rarity: Rarity.COMMON,
      type: PokemonType.NORMAL,
      attacks: [
        { ...attackData.transform },
      ],
      expansion: PokemonTGGEpxansions.FO
    },

    {
      title: "Charmeleon",
      hp: 80,
      weakness: PokemonType.WATER,
      resistance: PokemonType.GRASS,
      rarity: Rarity.COMMON,
      type: PokemonType.FIRE,
      attacks: [
        { ...attackData.flamethrower },
      ],
    },
    {
      title: "Squirtle",
      hp: 20,
      weakness: PokemonType.ELECTRIC,
      rarity: Rarity.COMMON,
      type: PokemonType.WATER,
      attacks: [
        { ...attackData.waterGun },
      ],
    },
    {
      title: "Bulbasaur",
      hp: 30,
      resistance: PokemonType.WATER,
      rarity: Rarity.COMMON,
      type: PokemonType.GRASS,
      attacks: [
        { ...attackData.vineWhip },
      ],
      expansion: PokemonTGGEpxansions.G2
    },
    {
      title: "Articuno",
      hp: 120,
      resistance: PokemonType.WATER,
      rarity: Rarity.RARE,
      type: PokemonType.ICE,
      attacks: [
        { ...attackData.iceBeam },
      ],
      expansion: PokemonTGGEpxansions.G2
    },
    {
      title: "Machamp",
      hp: 60,
      weakness: PokemonType.PSYCHIC,
      resistance: PokemonType.ROCK,
      rarity: Rarity.UNCOMMON,
      type: PokemonType.FIGHTING,
      attacks: [
        { ...attackData.dynamicPunch },
      ],
      expansion: PokemonTGGEpxansions.B2
    },
    {
      title: "Gengar",
      hp: 40,
      weakness: PokemonType.PSYCHIC,
      resistance: PokemonType.DARK,
      rarity: Rarity.RARE,
      type: PokemonType.POISON,
      attacks: [
        { ...attackData.shadowBall },
      ],
      expansion: PokemonTGGEpxansions.B2
    },
    {
      title: "Groudon",
      hp: 60,
      weakness: PokemonType.WATER,
      resistance: PokemonType.ELECTRIC,
      rarity: Rarity.COMMON,
      type: PokemonType.GROUND,
      attacks: [
        { ...attackData.earthquake },
      ],
    },
    {
      title: "Pidgeot",
      hp: 25,
      weakness: PokemonType.ELECTRIC,
      resistance: PokemonType.NORMAL,
      rarity: Rarity.COMMON,
      type: PokemonType.FLYING,
      attacks: [
        { ...attackData.hurricane },
      ],
      expansion: PokemonTGGEpxansions.B2
    },
    {
      title: "Scyther",
      hp: 35,
      weakness: PokemonType.ROCK,
      resistance: PokemonType.FIGHTING,
      rarity: Rarity.COMMON,
      type: PokemonType.BUG,
      attacks: [
        { ...attackData.xScissor },
      ],
      expansion: PokemonTGGEpxansions.TR
    },
    {
      title: "Tyranitar",
      hp: 50,
      weakness: PokemonType.FIRE,
      resistance: PokemonType.GROUND,
      rarity: Rarity.COMMON,
      type: PokemonType.ROCK,
      attacks: [
        { ...attackData.stoneEdge },
      ],
    },
    {
      title: "Mismagius",
      hp: 30,
      weakness: PokemonType.ICE,
      resistance: PokemonType.GRASS,
      rarity: Rarity.COMMON,
      type: PokemonType.GHOST,
      attacks: [
        { ...attackData.shadowBall },
      ],
      expansion: PokemonTGGEpxansions.JU
    },
    {
      title: "Dragonite",
      hp: 80,
      weakness: PokemonType.FIRE,
      resistance: PokemonType.POISON,
      rarity: Rarity.COMMON,
      type: PokemonType.DRAGON,
      attacks: [
        { ...attackData.dragonClaw },
      ],
    },
    {
      title: "Steelix",
      hp: 70,
      weakness: PokemonType.FIRE,
      resistance: PokemonType.POISON,
      rarity: Rarity.UNCOMMON,
      type: PokemonType.STEEL,
      attacks: [
        { ...attackData.ironTail },
      ],
      expansion: PokemonTGGEpxansions.G2
    },
    {
      title: "Sylveon",
      hp: 90,
      weakness: PokemonType.FIRE,
      resistance: PokemonType.WATER,
      rarity: Rarity.COMMON,
      type: PokemonType.FAIRY,
      attacks: [
        { ...attackData.moonblast },
      ],
    },
  ];

  try {
    for await (const card of cardData) {
      const newCard = await prisma.card.create({
        data: {
          ...card,
          attacks: {
            create: [...card.attacks]
          },
          // Mark all cards as created by the default user
          user: {
            connect: {
              id: user.id,
            },
          },
        }
      });
      console.log('Card created:', newCard.title);
    }
  } catch (error) {
    console.error('Error creating starting cards:', error);
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
