export default async function handler(req, res) {
    const { user, msg, pcname } = req.query;
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    // 1. LİSANS LİSTESİ (Sadece senin keyin olsun, boşluk bırakma)
    const izinliAnahtarlar = [
        "16047513980263920565"
    ];

    // 2. KONTROL MANTIĞI
    // includes metodu listede var mı diye bakar.
    const isAuthorized = izinliAnahtarlar.includes(String(user).trim());

    // 3. DISCORD LOGLAMA
    const discordPayload = {
        username: "MACHO AUTH",
        embeds: [{
            title: isAuthorized ? "✅ ONAYLANDI" : "❌ REDDEDİLDİ",
            color: isAuthorized ? 0x2ECC71 : 0xE74C3C,
            fields: [
                { name: "🔑 Key", value: `\`${user}\``, inline: true },
                { name: "🖥️ PC", value: `\`${pcname || "Bilinmiyor"}\``, inline: true }
            ],
            timestamp: new Date()
        }]
    };

    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
    });

    // 4. LUA'YA CEVAP (BURASI ÇOK KRİTİK)
    if (isAuthorized) {
        return res.status(200).send("OK_ONAY_VERILDI");
    } else {
        // Eğer burası çalışıyorsa key listede yoktur
        return res.status(200).send("Lisanssiz Kullanici!"); 
    }
}
