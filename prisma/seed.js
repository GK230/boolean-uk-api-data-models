const { PrismaClient } = require("@prisma/client");

const dbClient = new PrismaClient();

const designers = [
  {
    firstName: "Marc",
    lastName: "Jacobs",
  },
  {
    firstName: "Geeta",
    lastName: "Kotecha",
  },
  {
    firstName: "Victoria",
    lastName: "Beckhan",
  },
  {
    firstName: "Vivenne",
    lastName: "Westwood",
  },
  {
    firstName: "Stella",
    lastName: "McCartney",
  },
  {
    firstName: "Yoji",
    lastName: "Yamamoto",
  },
];

const events = [
  {
    location: "Paris",
  },
  {
    location: "London",
  },
  {
    location: "Milan",
  },
  {
    location: "New York",
  },
];

const guests = [
  {
    firstName: "Kate",
    lastName: "Windsor",
  },
  {
    firstName: "Gwenth",
    lastName: "Paltrow",
  },
  {
    firstName: "Anna",
    lastName: "Wintour",
  },
  {
    firstName: "Priyanka",
    lastName: "Chopra-Jonas",
  },
  {
    firstName: "Edward",
    lastName: "Enninful",
  },
];

const models = [
  {
    firstName: "Cara",
    lastName: "Delevinge",
  },
  {
    firstName: "Gigi",
    lastName: "Hadid",
  },
  {
    firstName: "Bella",
    lastName: "Hadid",
  },
  {
    firstName: "Kate",
    lastName: "Moss",
  },
  {
    firstName: "Liu",
    lastName: "Wen",
  },
];
const outfits = [
  {
    description: "evening gown",
    season: "SS",
  },
  {
    description: "coat",
    season: "AW",
  },
  {
    description: "jumpsuit",
    season: "SS",
  },
  {
    description: "hat",
    season: "AW",
  },
  {
    description: "hat",
    season: "SS",
  },
  {
    description: "evening gown",
    season: "AW",
  },
  {
    description: "evening gown",
    season: "SS",
  },
  {
    description: "coat",
    season: "AW",
  },
  {
    description: "jumpsuit",
    season: "SS",
  },
  {
    description: "hat",
    season: "AW",
  },
  {
    description: "hat",
    season: "SS",
  },
  {
    description: "evening gown",
    season: "AW",
  },
];

const getRandomElement = (array) => {
  const number = Math.floor(Math.random() * array.length);
  return array[number];
};

const seed = async () => {
  const arrayEventsPromises = events.map(async (event) => {
    return await dbClient.event.create({
      data: event,
    });
  });

  const createdEvents = await Promise.all(arrayEventsPromises);
  const eventIds = createdEvents.map(({ id }) => id);

  const arrayModelsPromises = models.map(async (model) => {
    return await dbClient.model.create({
      data: model,
    });
  });

  const createdModels = await Promise.all(arrayModelsPromises);
  const modelId = createdModels.map(({ id }) => id);

  const arrayGuestsPromises = guests.map(async (guest) => {
    return await dbClient.guest.create({
      data: guest,
    });
  });

  const createdGuests = await Promise.all(arrayGuestsPromises);
  const guestId = createdGuests.map(({ id }) => id);

  const arrayDesignersPromises = designers.map(async (designer) => {
    return await dbClient.designer.create({
      data: {
        ...designer,
        event: { connect: { id: parseInt(getRandomElement(eventIds)) } },
      },
    });
  });

  const createdDesigners = await Promise.all(arrayDesignersPromises);
  const designerId = createdDesigners.map(({ id }) => id);

  const arrayOutfitsPromises = outfits.map(async (outfit) => {
    return await dbClient.outfit.create({
      data: {
        ...outfit,
        designer: { connect: { id: parseInt(getRandomElement(designerId)) } },
        guest: { connect: { id: parseInt(getRandomElement(guestId)) } },
        model: { connect: { id: parseInt(getRandomElement(modelId)) } },
      },
    });
  });
  const createdOutfits = await Promise.all(arrayOutfitsPromises);

  const outfitId = createdOutfits.map(({ id }) => id);

  console.log(
    "designers",
    createdDesigners,
    "models",
    createdModels,
    "events",
    createdEvents
  );
};

seed()
  .catch((error) => console.log(error))
  .finally(async () => await dbClient.$disconnect());
