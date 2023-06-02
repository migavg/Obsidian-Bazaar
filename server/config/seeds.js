const db = require("./connection");
const { Product, Category, User } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Spooky" },
    { name: "Fact Based" },
    { name: "Military" },
    { name: "Items" },
    { name: "UFO" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Mind-Control Biscuits",
      category: categories[0]._id,
      price: 9.99,
      quantity: 1000,
      story:
        "Legend has it that deep within a clandestine laboratory, an enigmatic organization known as the 'Control Syndicate' devised a diabolical plan to subvert the minds of unsuspecting individuals. Their weapon of choice? The Mind-Control Biscuits. These seemingly ordinary treats, meticulously crafted to perfection, contain a carefully engineered substance capable of influencing thoughts and behaviors. As the story goes, the Control Syndicate distributed these biscuits across the globe, surreptitiously infiltrating homes and workplaces. Those who consumed these treats unwittingly fell under the syndicate's sway, their actions and decisions subtly guided by an invisible puppeteer. Some whisper that the Control Syndicate orchestrates world events through their mind-controlled agents, manipulating governments, economies, and even the course of history. Is it mere fantasy or a chilling reality? Beware the allure of the Mind-Control Biscuits, for once you indulge, you may find yourself entangled in a web of secrets and conspiracies beyond your wildest imagination.",
    },
    {
      name: "Illuminati Decoder Ring",
      category: categories[1]._id,
      price: 19.99,
      quantity: 100,
      story:
        "The Illuminati Decoder Ring holds the key to unlocking the hidden messages embedded in society. Legend has it that this secret society, known as the Illuminati, has been manipulating world events for centuries. With the ring, one gains access to their coded messages, revealing the true extent of their influence over governments, economies, and even popular culture. Those who possess the ring are said to hold the power to unravel the secrets that shape our world.",
    },
    {
      name: "Truth Serum Elixir",
      category: categories[1]._id,
      price: 29.99,
      quantity: 50,
      story:
        "The Truth Serum Elixir is rumored to be a powerful concoction used by intelligence agencies to extract information from unwilling subjects. According to conspiracy theorists, governments and shadow organizations have been secretly using this serum to control the narrative and manipulate the truth. Whistleblowers claim that it is responsible for extracting classified information and silencing those who dare to speak out against the powers that be.",
    },
    {
      name: "Surveillance Pen",
      category: categories[2]._id,
      price: 12.99,
      quantity: 200,
      story:
        "The Surveillance Pen appears to be an ordinary writing instrument, but hidden within its sleek design lies advanced surveillance technology. Conspiracy theorists believe that these pens are used by intelligence agencies to monitor and record private conversations without detection. Allegedly, these pens capture every word spoken, providing a tool for those in power to spy on individuals and gather sensitive information.",
    },
    {
      name: "Reality-Altering Paintings",
      category: categories[3]._id,
      price: 49.99,
      quantity: 20,
      story:
        "The Reality-Altering Paintings hold a secret power to manipulate the fabric of our existence. According to conspiracy theories, certain artists throughout history possessed hidden knowledge and used their paintings as portals to other dimensions. These paintings allegedly carry encoded messages, symbols, and energies that can influence the minds and perceptions of those who gaze upon them. Some even believe that these paintings can alter our reality, allowing unseen forces to shape the course of human history.",
    },
    {
      name: "Telepathic Headset",
      category: categories[2]._id,
      price: 79.99,
      quantity: 30,
      story:
        "The Telepathic Headset is believed to harness the untapped potential of the human mind. Conspiracy theorists suggest that this advanced technology can facilitate direct communication between individuals, bypassing the need for verbal or written language. It is rumored that intelligence agencies and secret societies have developed these headsets to enhance psychic abilities and establish covert networks of telepathic communication, enabling the exchange of classified information without interception.",
    },
    {
      name: "The Matrix Code Book",
      category: categories[3]._id,
      price: 39.99,
      quantity: 50,
      story:
        "The Matrix Code Book is said to contain the hidden truth about the nature of our reality. Conspiracy theorists believe that our world is a simulated construct, controlled by an elite group. This code book is said to hold the keys to understanding the underlying program that generates our perceived reality. By deciphering the cryptic symbols and patterns within, one can allegedly unveil the true nature of our existence and expose the manipulation that keeps humanity trapped within the confines of the simulated matrix.",
    },
    {
      name: "Shadowy Figure Figurine",
      category: categories[4]._id,
      price: 9.99,
      quantity: 1000,
      story:
        "The Shadowy Figure Figurine represents the mysterious forces that operate from the shadows. Conspiracy theorists believe that powerful clandestine organizations, such as the deep state or secret societies, control world events and manipulate governments behind closed doors. This figurine is a symbol of those unseen puppet masters who pull the strings of power, orchestrating global events to serve their own hidden agendas. Keeping this figurine close serves as a reminder of the hidden forces shaping our world.",
    },
    {
      name: "Time Manipulator Watch",
      category: categories[2]._id,
      price: 199.99,
      quantity: 10,
      story:
        "The Time Manipulator Watch is rumored to possess the ability to alter time itself. Conspiracy theorists speculate that secret experiments conducted by governments and advanced research institutions have led to the development of time-bending technology. This watch allegedly enables its wearer to travel through time, change the course of history, or even manipulate events to suit their interests. However, cautionary tales warn of the dangers of tampering with time and the potential consequences that altering the past can unleash.",
    },
    {
      name: "Chaos Crystal",
      category: categories[0]._id,
      price: 49.99,
      quantity: 25,
      story:
        "The Chaos Crystal is believed to hold immense power to disrupt order and create chaos in the world. Conspiracy theorists claim that ancient civilizations possessed this crystal, using its unpredictable energy to bring about cataclysmic events. Some believe that the crystal has resurfaced in modern times and is sought after by shadowy organizations aiming to unleash chaos for their own nefarious purposes. Possessing the Chaos Crystal can be a double-edged sword, as its potential for destruction is matched only by its capacity to bring about profound change and rebirth.",
    },
    {
      name: "Quantum Entanglement Necklace",
      category: categories[3]._id,
      price: 59.99,
      quantity: 15,
      story:
        "The Quantum Entanglement Necklace is rumored to create a connection that transcends space and time. Conspiracy theories suggest that this necklace taps into the mysterious phenomenon of quantum entanglement, allowing individuals to establish instantaneous communication across vast distances. It is believed that government agencies and covert groups employ this technology to maintain secret networks, sharing information and coordinating operations beyond the reach of conventional surveillance. Wearing this necklace supposedly binds the wearer to an invisible realm where secrets are whispered across the universe.",
    },
  ]);

  console.log("products seeded");

  process.exit();
});
