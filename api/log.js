export default async function handler(req, res) {
    const { user, msg, pcname } = req.query;
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    // LİSANS LİSTESİ
    const izinliAnahtarlar = [
        "16047513980263920565" // Kendi keyin
    ];

    const isAuthorized = izinliAnahtarlar.includes(String(user).trim());

    // DISCORD LOGLAMA
    const discordPayload = {
        username: "MACHO AUTH SYSTEM",
        embeds: [{
            title: isAuthorized ? "✅ ERİŞİM ONAYLANDI" : "❌ YETKİSİZ GİRİŞ",
            color: isAuthorized ? 0x2ECC71 : 0xE74C3C,
            fields: [
                { name: "🔑 Key", value: `\`${user || "Bilinmiyor"}\``, inline: true },
                { name: "🖥️ PC", value: `\`${pcname || "Bilinmiyor"}\``, inline: true },
                { name: "📝 İşlem", value: `**${msg || "Sorgu"}**`, inline: false }
            ],
            timestamp: new Date()
        }]
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });
    } catch (e) {}

    // LUA'NIN BEKLEDİĞİ YANITLAR
    if (isAuthorized) {
        return res.status(200).send("OK_ONAY_VERILDI");
    } else {
        return res.status(200).send("Giris_Yasaktir");
    }
}
