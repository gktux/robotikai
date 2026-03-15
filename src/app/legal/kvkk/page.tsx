import Link from "next/link";

export default function KvkkPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">KVKK Aydınlatma Metni</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Veri Sorumlusu</h2>
          <p>RobotikAI olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, ürün ve hizmetlerimizden faydalanan kişiler dahil, RobotikAI ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu’na uygun olarak işlenerek, muhafaza edilmesine büyük önem vermekteyiz.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Kişisel Verilerin Toplanması, İşlenmesi ve İşleme Amaçları</h2>
          <p>Kişisel verileriniz, RobotikAI tarafından sunulan ürün ve hizmetlerin tarafınıza sunulabilmesi, siparişlerinizin ulaştırılması ve satış sonrası destek hizmetlerinin yürütülmesi amaçlarıyla işlenmektedir.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
          <p>Toplanan kişisel verileriniz; siparişlerinizin teslimatı için kargo şirketlerine ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşlarına aktarılabilecektir.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Kişisel Veri Sahibinin Hakları</h2>
          <p>KVKK’nın 11. maddesi uyarınca veri sahipleri; verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme ve düzeltilmesini isteme haklarına sahiptir.</p>
        </section>
      </div>
      <div className="mt-12">
        <Link href="/cart" className="text-sky-600 hover:underline">← Sepete Dön</Link>
      </div>
    </div>
  );
}
