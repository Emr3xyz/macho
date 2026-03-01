export default async function handler(req, res) {
    const { user, msg, pcname } = req.query;
    const webhookUrl = "https://discord.com/api/webhooks/1477690925999460472/1Ch7qrNSlcDX7Kh6YJFVaroeekfOzvJ_p0NuHW3CO4MivWrzfdZv7_yCSt9lc8Q9Z-Wq";

    // LİSANS LİSTESİ
    const izinliAnahtarlar = [
        "160475139802639205651" // Kendi keyin
    ];

    // EĞER TARAYICIDAN (USER PARAMETRESİ OLMADAN) GİRİLİRSE LİSTEYİ GÖSTER
    if (!user) {
        return res.status(200).json({
            durum: "Sistem Aktif",
            izinli_liste: izinliAnahtarlar,
            mesaj: "Sorgu baslatmak icin ?user=KEY ekleyin."
        });
    }

    const isAuthorized = izinliAnahtarlar.includes(String(user).trim());

    // DISCORD LOGLAMA (Embed yapısı)
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "MACHO AUTH",
                embeds: [{
                    title: isAuthorized ? "✅ ONAY" : "❌ RED",
                    color: isAuthorized ? 0x2ECC71 : 0xE74C3C,
                    fields: [
                        { name: "Key", value: `\`${user}\``, inline: true },
                        { name: "İşlem", value: `${msg || "Sorgu"}`, inline: true }
                    ],
                    timestamp: new Date()
                }]
            })
        });
    } catch (e) {}

    // LUA YANITI
    if (isAuthorized) {
        return res.status(200).send("OK_ONAY_VERILDI");
    } else {
        return res.status(200).send("Giris_Yasaktir");
    }
}

