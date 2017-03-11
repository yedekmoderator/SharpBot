const translate = require('google-translate-api');
const stripIndents = require('common-tags').stripIndents;

exports.run = (bot, msg, args) => {
    if (args.length < 2) {
        throw 'You must provide a language and some text to translate!';
    }

    var parsed = bot.utils.parseArgs(args, 'f:');

    let lang = parsed.leftover[0];
    let input = parsed.leftover.slice(1).join(' ');

    msg.edit(':arrows_counterclockwise: **Translating your Text...**').then(() => {
        translate(input, { from: parsed.options.f, to: lang }).then(res => {
            msg.delete();
            msg.channel.sendEmbed(
                bot.utils.embed('', stripIndents`
                **From:** __\`${parsed.options.f || '[auto]'}\`__
                **To:** __\`${lang}\`__

                **Input:**\n\`\`\`\n${input}\n\`\`\`
                **Output:**\n\`\`\`\n${res.text}\n\`\`\`
                `)
            );
        }).catch(msg.error);
    });
};

exports.info = {
    name: 'translate',
    usage: 'translate [-f <from>] <lang> <text>',
    description: 'Translate Your Language to any other Language you want.'
};