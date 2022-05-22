const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const config = require("../../../config.json");

var slashCommandOptions = [
  {
    name: "start",
    type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
    description: "Start an ssu",
  },
  {
    name: "stop",
    type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
    description: "Stop an ssu",
  },
  {
    name: "extend",
    type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
    description: "Resume the ingame alerts",
  },
  {
    name: "boost",
    type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
    description: "Resume the ingame alerts",
  },
  {
    name: "poll",
    type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
    description: "Sends a poll for starting a SSU",
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

module.exports = class SsuCommand extends BaseCommand {
  constructor() {
    super("ssu", "SSU", false, 0, "Manage a SSU", slashCommandOptions);
  }
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.CommandInteraction} interaction
   * @returns
   */
  async run(client, interaction) {
    const subCommand = interaction.options.getSubcommand();
    const member = interaction.guild.members.cache.get(interaction.user.id);
    if (
      !member.roles.cache.has("969005575805493328") || !member.roles.cache.has("969024046333313095")
    ) {
      return interaction.reply({
        content: "Oi mate, you are not allowed to run this command! I'm sorry",
      });
    }
    const guild = client.guilds.cache.get("883461913953054791");
    const ssuChannel = guild.channels.cache.get("908905604641345567");
    const pollChannel = guild.channels.cache.get("970372977524899850");
    


    if (subCommand === "start") {
      const ssuEmbed = new Discord.MessageEmbed()
        .setTitle(`New SSU!`)
        .setDescription(
          `We are hosting an SSU right now!\nLets join it up and have a fun time rping!\n\n*Server Code:* **BlackBear**\n*Server Name:* **West Virginia Roleplay**`
        );
      ssuChannel.send({
        content: `@here <@&911352278944985088> <@&909629181271367700> \n\n https://roblox.com/games/2534724415/Emergency-Response-Liberty-County `,
        embeds: [ssuEmbed],
      });
    }
    if (subCommand === "stop") {
      interaction.reply(`SSD completed successfully!`);
      ssuChannel.bulkDelete(100);
      pollChannel.bulkDelete(100);
      await pollChannel.send({
        content:
          "**The WVRP server is currently down, but stay tuned for the next SSU which happens around <t:1640289600:t> everyday!**",
      });
      await ssuChannel.send({
        content: `**The WVRP server is currently down, but stay tuned for the next SSU which happens around <t:1640289600:t> everyday!**`,
      });
      
    }

    if (subCommand === "extend") {
      var msgInterval = setInterval(async () => {
        const message = await reminderChannel.send({
          content: `|| <@949764872038670387> || \n\nMake sure to be posting the discord code in game! Here is a Copy & Paste link to it: \n\`\`\`:m Make sure to be in the communication server for a better role play experience! The dizzy is code ElkRP have fun!\`\`\``,
          fetchReply: true,
        });
        message.react(`✅`);
      }, 600000);
    }

    if (subCommand === "boost") {
      ssuChannel.send({ content: `We need a boost in the server!

      Come join us! 
      **Elk County Roleplay**
      *Server code:* **Elk**
      -=-  -=-
      
      https://www.roblox.com/games/2534724415/Emergency-Response-Liberty-County#
      `})
      interaction.reply(`Done!`)
    }

    if (subCommand === "poll") {
      const message = await pollChannel.send({
        content: `<:ECRPbadge:924111107512213564> __**| SSU Poll**__\n\nThe management team is considering hosting an SSU. Please react below if you believe you can make it!\n\n> *You are not required to show up if you react.*\n\n**10 Reactions to host an SSU!**\n\n{@here <@&886710022162239508> <@&883461913953054793>}`,
        fetchReply: true,
      });
      message.react(`924111107512213564`)
      interaction.reply(`Sent the poll and reacted successfully.`)
    }
  }
};