export default async function handler(req, res) {
    const { user, msg, pcname, sv_ip, sv_name } = req.query;
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    const izinliAnahtarlar = ["16047513980263920565"];
    const isAuthorized = izinliAnahtarlar.includes(String(user).trim());
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // MODERN DISCORD EMBED YAPISI
    const discordPayload = {
        username: "MACHO SENTINEL v3.0",
        avatar_url: "https://i.imgur.com/8nNf9fK.png", // Şık bir bot resmi
        embeds: [{
            title: isAuthorized ? "🟢 SİSTEM ERİŞİMİ ONAYLANDI" : "🔴 YETKİSİZ ERİŞİM ENGELLENDİ",
            color: isAuthorized ? 0x2ECC71 : 0xFF0000,
            description: `**Kullanıcı:** \`${pcname || "Bilinmiyor"}\`\n**Durum:** ${isAuthorized ? "Lisans Doğrulandı" : "GEÇERSİZ LİSANS"}`,
            fields: [
                { name: "🔑 Kullanıcı Key", value: `\`${user || "N/A"}\``, inline: false },
                { name: "🌐 Kullanıcı IP", value: `\`${userIP}\``, inline: true },
                { name: "🖥️ Sunucu IP", value: `\`${sv_ip || "Local/Bilinmiyor"}\``, inline: true },
                { name: "🎮 Sunucu Adı", value: `\`${sv_name || "Bilinmiyor"}\``, inline: false },
                { name: "📝 İşlem/Eylem", value: `\`${msg || "Sorgu"}\``, inline: true },
                { name: "⏰ Zaman", value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
            ],
            footer: { text: "Macho Advanced Security • 2026", icon_url: "https://i.imgur.com/8nNf9fK.png" },
            thumbnail: { url: isAuthorized ? "https://i.imgur.com/S8WAnu8.png" : "https://i.imgur.com/AnuJ8W8.png" } // Başarı/Hata ikonları
        }]
    };

    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
    });

    return isAuthorized ? res.status(200).send("OK_ONAY_VERILDI") : res.status(200).send("Giris_Yasaktir");
}
