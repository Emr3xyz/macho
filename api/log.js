export default async function handler(req, res) {
    // URL parametrelerini al (user = auth_key, msg = eylem)
    const { user, msg } = req.query;
    
    // BURAYI DÜZENLE: Kendi Discord Webhook URL'ni tırnak içine yapıştır
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    // BURAYI DÜZENLE: İzin verdiğin Macho Key'leri bu listeye ekle
    const izinliAnahtarlar = [
        "16047513980263920565", 
        "TEST_KEY_123",
        "ARKADASININ_KEYI"
    ];

    // 1. Veri kontrolü
    if (!user || !msg) {
        return res.status(400).send("Eksik veri gonderildi.");
    }

    // 2. Lisans kontrolü
    const lisansliMi = izinliAnahtarlar.includes(user);
    const durumBasligi = lisansliMi ? "✅ Lisans Onaylandi" : "❌ Lisanssiz Giris Denemesi";
    const durumRengi = lisansliMi ? 5814783 : 15548997; // Yeşil veya Kırmızı

    // 3. Discord Mesaj Yapısı (Embed)
    const discordPayload = {
        embeds: [{
            title: durumBasligi,
            color: durumRengi,
            fields: [
                { name: "Kullanıcı Anahtarı", value: `\`${user}\``, inline: false },
                { name: "Yapılan İşlem", value: `**${msg}**`, inline: true },
                { name: "Erişim Durumu", value: lisansliMi ? "Erisim Verildi" : "Erisim Reddedildi", inline: true }
            ],
            footer: { text: "Macho Executor Auth System" },
            timestamp: new Date()
        }]
    };

    // 4. Discord'a Gönder
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });
    } catch (err) {
        console.error("Discord gonderim hatasi:", err);
    }

    // 5. Lua tarafına cevap dön
    if (!lisansliMi) {
        return res.status(403).send("Lisanssiz Kullanici!");
    }

    res.status(200).send("Onaylandi");
}

