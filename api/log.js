export default async function handler(req, res) {
    const { user, msg, server, pcname } = req.query;
    
    // 1. AYARLAR: Kendi Webhook URL'ni buraya yapıştır
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    // 2. LİSANS LİSTESİ: İzin verdiğin keyleri buraya ekle
    const izinliAnahtarlar = [
        "16047513980263920565", // Senin Keyin
        "TEST_999"
    ];

    // Kullanıcı IP'sini al (Vercel üzerinden)
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // 3. GÜVENLİK KONTROLÜ
    if (!user) {
        return res.status(400).send("Gecersiz_Sorgu");
    }

    const isAuthorized = izinliAnahtarlar.includes(user);
    const statusTitle = isAuthorized ? "✅ ERİŞİM ONAYLANDI" : "❌ YETKİSİZ GİRİŞ DENEMESİ";
    const statusColor = isAuthorized ? 0x2ECC71 : 0xE74C3C; // Yeşil : Kırmızı

    // 4. DISCORD EMBED YAPISI (Zengin Görünüm)
    const discordPayload = {
        username: "MACHO SİSTEM KONTROL",
        avatar_url: "https://i.imgur.com/8nNf9fK.png",
        embeds: [{
            title: statusTitle,
            color: statusColor,
            description: `**Kullanıcı Bilgileri ve Sistem Durumu**`,
            fields: [
                { name: "🔑 Lisans Anahtarı", value: `\`${user}\``, inline: false },
                { name: "🌐 Kullanıcı IP", value: `\`${userIP}\``, inline: true },
                { name: "🖥️ Bilgisayar Adı", value: `\`${pcname || "Bilinmiyor"}\``, inline: true },
                { name: "🎮 Sunucu Durumu", value: `\`${server || "FiveM Bağlantısı"}\``, inline: false },
                { name: "📝 Yapılan İşlem", value: `**${msg || "Sistem Sorgusu"}**`, inline: true },
                { name: "⏰ Zaman", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
            ],
            footer: { text: "Macho Advanced Auth v2.0 | Vercel Serverless" },
            timestamp: new Date()
        }]
    };

    // 5. DISCORD'A GÖNDER
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });
    } catch (err) {
        console.error("Discord hatası:", err);
    }

    // 6. LUA TARAFINA CEVAP DÖN
    if (isAuthorized) {
        return res.status(200).send("OK_ONAY_VERILDI");
    } else {
        return res.status(200).send("Giris_Yasaktir");
    }
}


