export default async function handler(req, res) {
    const { user, msg, pcname } = req.query;
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    // LİSANS LİSTESİ
    const izinliAnahtarlar = [
        "16047513980263920565" // Senin anahtarın
    ];

    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const isAuthorized = izinliAnahtarlar.includes(user);

    // DISCORD GÖRÜNÜMÜ
    const discordPayload = {
        username: "MACHO AUTH SYSTEM",
        embeds: [{
            title: isAuthorized ? "✅ ERİŞİM ONAYLANDI" : "❌ YETKİSİZ GİRİŞ",
            color: isAuthorized ? 0x2ECC71 : 0xE74C3C,
            fields: [
                { name: "🔑 Key", value: `\`${user || "Bilinmiyor"}\``, inline: true },
                { name: "🖥️ PC Adı", value: `\`${pcname || "Bilinmiyor"}\``, inline: true },
                { name: "🌐 IP", value: `\`${userIP}\``, inline: false },
                { name: "📝 İşlem", value: `**${msg || "Sorgu"}**`, inline: true }
            ],
            footer: { text: "Macho Advanced Protection" },
            timestamp: new Date()
        }]
    };

    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
    });

    if (isAuthorized) {
        return res.status(200).send("OK_ONAY_VERILDI");
    } else {
        return res.status(200).send("Giris_Yasaktir");
    }
}
