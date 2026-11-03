const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const now = () => new Date().toISOString();
const id = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;

function product(name, category, price, image, desc, featured=false) {
  return {id:id(),name,slug:slugify(name,{lower:true,strict:true}),category,price,oldPrice:Math.round(price*1.25),marketplace:'Shopee',affiliateUrl:'https://shopee.co.id/',images:[image],shortDescription:desc,description:desc,advantages:['Harga terjangkau','Mudah digunakan','Cocok untuk penggunaan sehari-hari'],suitableFor:['Pengguna umum'],usage:'Ikuti petunjuk penggunaan pada kemasan produk.',rating:4.8,soldLabel:'1RB+',isFeatured:featured,isActive:true,createdAt:now(),updatedAt:now(),clicks:0};
}

module.exports = async function seed(adminId, adminPassword) {
  const categories=[
    {id:id(),name:'Elektronik',slug:'elektronik',icon:'💻'},
    {id:id(),name:'Kesehatan',slug:'kesehatan',icon:'🩺'},
    {id:id(),name:'Perawatan & Kecantikan',slug:'perawatan-kecantikan',icon:'✨'},
    {id:id(),name:'Rumah Tangga',slug:'rumah-tangga',icon:'🏠'},
    {id:id(),name:'Fashion',slug:'fashion',icon:'👕'},
    {id:id(),name:'Otomotif',slug:'otomotif',icon:'🚗'}
  ];
  const products=[
    product('TWS Earphone Bluetooth 5.3','elektronik',89000,'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80','Earphone nirkabel ringkas dengan koneksi stabil dan baterai tahan lama.',true),
    product('Smart Watch Ultra Series','elektronik',199000,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80','Jam pintar untuk memantau aktivitas harian dan notifikasi.',true),
    product('Cream Kaki Pecah-Pecah','perawatan-kecantikan',29900,'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80','Krim perawatan kaki kering dengan tekstur ringan dan mudah meresap.',true),
    product('Rak Dapur Stainless 4 Tingkat','rumah-tangga',299000,'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80','Rak serbaguna untuk membuat dapur lebih rapi dan hemat ruang.',true),
    product('Power Bank 20000mAh','elektronik',129000,'https://images.unsplash.com/photo-1609592424824-6d54f3d5b52c?auto=format&fit=crop&w=900&q=80','Power bank kapasitas besar untuk menemani aktivitas harian.',true)
  ];
  const articles=[{id:id(),title:'5 Rekomendasi Produk Berguna untuk Aktivitas Harian',slug:'5-rekomendasi-produk-berguna-untuk-aktivitas-harian',excerpt:'Pilihan produk praktis yang membantu aktivitas menjadi lebih mudah.',content:'<p>Memilih produk sebaiknya berdasarkan kebutuhan, kualitas, harga, dan ulasan pembeli. Berikut rekomendasi produk yang dapat dipertimbangkan.</p><h2>Perhatikan kebutuhan utama</h2><p>Bandingkan fitur dan harga dari beberapa toko sebelum membeli.</p>',cover:products[0].images[0],category:'Tips Belanja',isPublished:true,publishedAt:now(),createdAt:now(),updatedAt:now()}];
  return {settings:{siteName:'TEMAN BELANJA',tagline:'Temukan Produk Terbaik, Harga Bersahabat',siteDescription:'Teman Belanja membantu Anda menemukan rekomendasi produk berguna, promo, dan ulasan singkat dari berbagai marketplace.',logoText:'TEMAN BELANJA',primaryColor:'#6d4aff',facebook:'',instagram:'',tiktok:'',whatsapp:'',affiliateDisclosure:'Beberapa tautan di situs ini merupakan tautan affiliate. Kami dapat menerima komisi tanpa menambah harga yang Anda bayar.'},users:[{id:id(),username:adminId,passwordHash:await bcrypt.hash(adminPassword,12),role:'superadmin',twoFactorEnabled:false,twoFactorSecret:null,createdAt:now(),lastLogin:null}],categories,products,articles,clicks:[],audit:[]};
};
