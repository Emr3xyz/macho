export default async function handler(req, res) {
    const { user, msg } = req.query;
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    if (!user || !msg) {
        return res.status(400).send("Eksik veri");
    }

    const discordPayload = {
        embeds: [{
            title: "Macho Executor Log",
            color: 5814783,
            fields: [
                { name: "Kullanıcı Key", value: `\`${user}\``, inline: true },
                { name: "Eylem", value: msg, inline: true }
            ],
            timestamp: new Date()
        }]
    };

    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
    });

    res.status(200).send("Log gonderildi");
}