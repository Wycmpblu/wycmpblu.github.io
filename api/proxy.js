export default async function handler(req, res) {
   // Разрешаем GitHub Pages и любые источники
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

   // Preflight
   if (req.method === "OPTIONS") return res.status(200).end();

   try {
      const upstream = await fetch("https://arz-market.moon.wh1teend.dev/api/getArizonaMarkets");
      const data = await upstream.json();
      res.status(200).json(data);
   } catch (err) {
      res.status(502).json({ error: err.message });
   }
}
