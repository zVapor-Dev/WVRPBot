const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const config = require("../../../config.json");

var slashCommandOptions = [
  {
    name: "userid",
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
    description: "The ID of the banned user. (Discord ID!)",
    required: true,
  },
  {
    name: "roblox-name",
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
    description: "The name of the banned user.",
    required: true,
  },
];
/*
Example: 

var slashCommandOptions = [
  {
    name: 'song',
    description: 'The song to play!',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }
]

So the options is basically the Arguments for the command
*/

module.exports = class AcceptappealCommand extends BaseCommand {
  constructor() {
    super(
      "acceptappeal",
      "Staff",
      false,
      0,
      "Accept a unban appeal and notify the user.",
      slashCommandOptions
    );
  }

  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.CommandInteraction} interaction
   */
  async run(client, interaction) {
    const user = interaction.options.getString(`userid`);
    const robloxName = interaction.options.getString(`roblox-name`);
    const guild = client.guilds.cache.get(`883461913953054791`);
    const member = guild.members.cache.get(user);
    const logChannel = interaction.guild.channels.cache.get(`909131537839165440`);

    // if (!member.roles.cache.has("885292875888328734")) {
    //   return interaction.reply(`Oi mate, you're not allowed to use this command!`)
    // }

    try {
      logChannel.send(
        `<@&949764872038670387> **Please unban \`${robloxName}\`**`
      );
      member.send(
        `**You have a message from the ECRP Community Management team**\n\n**Salutations**\nYour ban appeal was reviewed by the Management team, and accepted. You will be unbanned from the in-game server shortly. While you wait please read the <#885303310804987925> to avoid being banned again, as that would be permanent.`
      );
      interaction.reply(`Accepted appeal & sent dm.`);
    } catch (e) {
      return interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setTitle(`An error occured!`)
            .setDescription(e)
            .setColor("RED")
            .setTimestamp(),
        ],
      });
    }
  }
};
