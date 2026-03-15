import Link from "next/link";

export default function SalesContractPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Mesafeli Satış Sözleşmesi</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Taraflar</h2>
          <p>İşbu sözleşme, RobotikAI (Satıcı) ile ürünü satın alan kullanıcı (Alıcı) arasında, Alıcı'nın elektronik ortamda verdiği sipariş üzerine akdedilmiştir.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Sözleşmenin Konusu</h2>
          <p>İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait internet sitesi üzerinden siparişini verdiği, nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Teslimat ve Ödeme</h2>
          <p>Ürün bedeli ödendikten sonra, Satıcı ürünü Alıcı'nın belirlediği adrese teslim etmekle yükümlüdür. Dijital eğitim paketlerinde teslimat, kullanıcı hesabına tanımlama veya e-posta yoluyla anlık olarak gerçekleşir.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Cayma Hakkı</h2>
          <p>Alıcı, dijital içerik veya anında ifa edilen hizmetler kapsamına girmeyen fiziksel ürünlerde, teslim tarihinden itibaren 14 gün içinde cayma hakkına sahiptir. Dijital ürünlerde kurulum veya içerik erişimi sağlandığı durumlarda cayma hakkı yönetmelik gereği sınırlıdır.</p>
        </section>
      </div>
      <div className="mt-12">
        <Link href="/cart" className="text-sky-600 hover:underline">← Sepete Dön</Link>
      </div>
    </div>
  );
}
