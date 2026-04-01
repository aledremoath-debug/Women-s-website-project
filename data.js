// ===== PRODUCT DATA =====
const CATEGORIES = [
    { id: 'dresses', name: 'فساتين', icon: '👗', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop' },
    { id: 'jalabiyas', name: 'جلابيات', icon: '✨', img: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&h=500&fit=crop' },
    { id: 'abayas', name: 'عبايات', icon: '🧕', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop' },
    { id: 'accessories', name: 'إكسسوارات', icon: '💎', img: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6c4?w=400&h=500&fit=crop' },
    { id: 'shoes', name: 'أحذية', icon: '👠', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop' },
    { id: 'bags', name: 'شنط وحقائب', icon: '👜', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop' },
    { id: 'sets', name: 'اطقم نسائية', icon: '👚', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop' },
    { id: 'girls', name: 'فساتين بناتي', icon: '🎀', img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop' },
];

const FILTERS_CONFIG = {
    dresses: [
        { key: 'neckType', title: 'نوع الرقبة', type: 'chips', options: ['ياقة دائرية', 'ياقة مربعة', 'ياقة عالية', 'ياقة V', 'ياقة قارب'] },
        { key: 'fabric', title: 'القماش', type: 'chips', options: ['ميكادو', 'تفتة', 'جازار', 'باربي', 'جورجيت', 'حرير', 'شيفون', 'ستان'] },
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'وردي', hex: '#FFB6C1' }, { name: 'أسود', hex: '#000' }, { name: 'أبيض', hex: '#fff' }, { name: 'فوشي', hex: '#FF1493' }, { name: 'بيج', hex: '#F5DEB3' }, { name: 'أحمر', hex: '#DC143C' }, { name: 'ذهبي', hex: '#DAA520' }, { name: 'كحلي', hex: '#000080' }] },
        { key: 'length', title: 'طول الفستان', type: 'chips', options: ['هاي لو', 'قصير', 'متوسط', 'طويل'] },
        { key: 'design', title: 'تصميم الفستان', type: 'chips', options: ['حورية البحر', 'قصة مستقيمة', 'واسع', 'ضيق', 'A-Line'] },
        { key: 'sleeves', title: 'نوع الأكمام', type: 'chips', options: ['أكمام كب', 'أكتاف مكشوفة', 'أكمام طويلة', 'بدون أكمام', 'أكمام قصيرة'] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
    jalabiyas: [
        { key: 'subType', title: 'النوع', type: 'chips', options: ['فخمة', 'ناعمة', 'قفطان', 'رمضانية'] },
        { key: 'fabric', title: 'القماش', type: 'chips', options: ['حرير', 'شيفون', 'ستان', 'كريب', 'مخمل'] },
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'كحلي', hex: '#000080' }, { name: 'أسود', hex: '#000' }, { name: 'بنفسجي', hex: '#800080' }, { name: 'بيج', hex: '#F5DEB3' }, { name: 'عنابي', hex: '#800000' }, { name: 'ذهبي', hex: '#DAA520' }] },
        { key: 'length', title: 'الطول', type: 'chips', options: ['قصير', 'متوسط', 'طويل'] },
        { key: 'embroidery', title: 'التطريز', type: 'chips', options: ['تطريز يدوي', 'تطريز آلي', 'بدون تطريز'] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
    abayas: [
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'أسود', hex: '#000' }, { name: 'كحلي', hex: '#000080' }, { name: 'بني', hex: '#8B4513' }, { name: 'بنفسجي', hex: '#800080' }, { name: 'رمادي', hex: '#808080' }] },
        { key: 'embroideryType', title: 'نوع التطريز', type: 'chips', options: ['ذهبي', 'فضي', 'ملون', 'بدون'] },
        { key: 'fabric', title: 'القماش', type: 'chips', options: ['كريب', 'شيفون', 'نيدل', 'حرير'] },
        { key: 'withScarf', title: 'مع طرحة', type: 'chips', options: ['نعم', 'لا'] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
    accessories: [
        { key: 'subType', title: 'النوع', type: 'chips', options: ['أطقم', 'أساور', 'ساعات', 'إكسسوارات شعر', 'أقراط', 'تيجان', 'قلادات'] },
        { key: 'metal', title: 'المعدن', type: 'chips', options: ['ذهبي', 'فضي', 'روز قولد'] },
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'ذهبي', hex: '#DAA520' }, { name: 'فضي', hex: '#C0C0C0' }, { name: 'روز', hex: '#FFB6C1' }, { name: 'متعدد', hex: 'linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcb77)' }] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
    shoes: [
        { key: 'heelType', title: 'نوع الكعب', type: 'chips', options: ['عالي', 'متوسط', 'منخفض', 'فلات'] },
        { key: 'size', title: 'المقاس', type: 'chips', options: ['36', '37', '38', '39', '40', '41'] },
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'أسود', hex: '#000' }, { name: 'بيج', hex: '#F5DEB3' }, { name: 'أبيض', hex: '#fff' }, { name: 'ذهبي', hex: '#DAA520' }, { name: 'فضي', hex: '#C0C0C0' }] },
        { key: 'design', title: 'التصميم', type: 'chips', options: ['مدبب', 'مفتوح', 'مغلق', 'شبكي'] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
    bags: [
        { key: 'subType', title: 'النوع', type: 'chips', options: ['سهرة', 'ناعمة', 'كتف', 'يد', 'كروس'] },
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'أسود', hex: '#000' }, { name: 'بيج', hex: '#F5DEB3' }, { name: 'ذهبي', hex: '#DAA520' }, { name: 'فضي', hex: '#C0C0C0' }, { name: 'أبيض', hex: '#fff' }] },
        { key: 'bagSize', title: 'الحجم', type: 'chips', options: ['صغير', 'متوسط', 'كبير'] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
    sets: [
        { key: 'setSize', title: 'المقاس', type: 'chips', options: ['S', 'M', 'L', 'XL', 'XXL'] },
        { key: 'fabric', title: 'القماش', type: 'chips', options: ['قطن', 'بوليستر', 'حرير', 'كتان'] },
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'أسود', hex: '#000' }, { name: 'أبيض', hex: '#fff' }, { name: 'بيج', hex: '#F5DEB3' }, { name: 'وردي', hex: '#FFB6C1' }] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
    girls: [
        { key: 'ageGroup', title: 'الفئة العمرية', type: 'chips', options: ['2-4 سنوات', '5-7 سنوات', '8-10 سنوات', '11-14 سنة'] },
        { key: 'color', title: 'اللون', type: 'colors', options: [{ name: 'وردي', hex: '#FFB6C1' }, { name: 'أبيض', hex: '#fff' }, { name: 'أزرق', hex: '#87CEEB' }, { name: 'أحمر', hex: '#DC143C' }] },
        { key: 'price', title: 'السعر', type: 'price' }, { key: 'sale', title: '', type: 'sale' }
    ],
};

// Generate sample products
const IMG_BASE = 'https://images.unsplash.com/photo-';
const DRESS_IMGS = [
    IMG_BASE + '1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    IMG_BASE + '1566174053879-31528523f8ae?w=400&h=500&fit=crop',
    IMG_BASE + '1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
    IMG_BASE + '1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
    IMG_BASE + '1562137369-1a1a0bc66744?w=400&h=500&fit=crop',
    IMG_BASE + '1539008835657-9e4ed21f40e0?w=400&h=500&fit=crop',
    IMG_BASE + '1596783074918-c84cb06531ca?w=400&h=500&fit=crop',
    IMG_BASE + '1583391733956-6c78276477e2?w=400&h=500&fit=crop',
];
const ACC_IMGS = [
    IMG_BASE + '1515562141589-67f0d569b6c4?w=400&h=500&fit=crop',
    IMG_BASE + '1611085583191-a3b181a88401?w=400&h=500&fit=crop',
    IMG_BASE + '1573408301185-9146fe634ad0?w=400&h=500&fit=crop',
    IMG_BASE + '1535632066927-ab7c9ab60908?w=400&h=500&fit=crop',
];
const SHOE_IMGS = [
    IMG_BASE + '1543163521-1bf539c55dd2?w=400&h=500&fit=crop',
    IMG_BASE + '1518049362265-d5ef880be5ab?w=400&h=500&fit=crop',
    IMG_BASE + '1596703930067-3f4bdc0a0c85?w=400&h=500&fit=crop',
];
const BAG_IMGS = [
    IMG_BASE + '1584917865442-de89df76afd3?w=400&h=500&fit=crop',
    IMG_BASE + '1548036328-c11636160093?w=400&h=500&fit=crop',
    IMG_BASE + '1590874103328-eac38a683ce7?w=400&h=500&fit=crop',
];

function rnd(a) { return a[Math.floor(Math.random() * a.length)] }
function rndPrice(min, max) { return Math.round((Math.random() * (max - min) + min) / 5) * 5 }

const PRODUCTS = [];
let pid = 1;

// Dresses
const dressNames = ['فستان سهرة أنيق بتطريز ذهبي', 'فستان ناعم بقصة حورية البحر', 'فستان مناسبات بياقة V', 'فستان طويل بأكمام شيفون', 'فستان قصير بتصميم عصري', 'فستان مخملي فاخر', 'فستان مشجر بألوان ربيعية', 'فستان خطوبة ناعم بدانتيل', 'فستان ملكة بتطريز كريستال', 'فستان سهرة أسود كلاسيكي', 'فستان وردي بفيونكة', 'فستان كحلي بتفاصيل فضية'];
dressNames.forEach((n, i) => {
    const op = rndPrice(199, 899), sale = Math.random() > .6, sp = sale ? rndPrice(99, op - 50) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'dresses', price: op, salePrice: sp, img: DRESS_IMGS[i % DRESS_IMGS.length], imgs: [DRESS_IMGS[i % DRESS_IMGS.length], DRESS_IMGS[(i + 1) % DRESS_IMGS.length]],
        rating: +(3.5 + Math.random() * 1.5).toFixed(1), reviews: Math.floor(Math.random() * 200 + 10), isNew: i < 4, isBestseller: i < 6,
        sizes: ['S', 'M', 'L', 'XL'], colors: ['#000', '#FFB6C1', '#F5DEB3', '#DC143C'],
        desc: 'فستان نسائي فاخر بتصميم عصري وخامة عالية الجودة. مناسب للسهرات والمناسبات الخاصة.',
        filters: { neckType: rnd(['ياقة دائرية', 'ياقة مربعة', 'ياقة V']), fabric: rnd(['ميكادو', 'تفتة', 'شيفون']), length: rnd(['قصير', 'متوسط', 'طويل']), design: rnd(['حورية البحر', 'واسع', 'ضيق']), sleeves: rnd(['أكمام طويلة', 'بدون أكمام', 'أكمام كب']) }
    });
});

// Jalabiyas
const jalNames = ['جلابية فخمة بتطريز ذهبي', 'جلابية ناعمة بقصة واسعة', 'قفطان مغربي فاخر', 'جلابية رمضانية بألوان هادئة', 'جلابية حريرية بتفاصيل يدوية', 'جلابية ستان بتطريز جانبي', 'جلابية كريب أنيقة', 'جلابية مخملية فخمة'];
jalNames.forEach((n, i) => {
    const op = rndPrice(249, 799), sale = Math.random() > .6, sp = sale ? rndPrice(149, op - 50) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'jalabiyas', price: op, salePrice: sp, img: DRESS_IMGS[(i + 3) % DRESS_IMGS.length], imgs: [DRESS_IMGS[(i + 3) % DRESS_IMGS.length], DRESS_IMGS[(i + 4) % DRESS_IMGS.length]],
        rating: +(3.5 + Math.random() * 1.5).toFixed(1), reviews: Math.floor(Math.random() * 150 + 10), isNew: i < 3, isBestseller: i < 4,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['#000080', '#000', '#800000', '#F5DEB3'],
        desc: 'جلابية نسائية فاخرة بتصميم شرقي أصيل وخامة ممتازة.',
        filters: { subType: rnd(['فخمة', 'ناعمة', 'قفطان']), fabric: rnd(['حرير', 'شيفون', 'ستان', 'كريب']), length: rnd(['متوسط', 'طويل']), embroidery: rnd(['تطريز يدوي', 'تطريز آلي', 'بدون']) }
    });
});

// Abayas
const abNames = ['عباية سوداء بتطريز ذهبي', 'عباية كحلي بطرحة', 'عباية بنية بتصميم هندسي', 'عباية سوداء بتطريز بيج', 'عباية بنفسجية أنيقة', 'عباية سوداء فاخرة بنقوش'];
abNames.forEach((n, i) => {
    const op = rndPrice(299, 699), sale = Math.random() > .7, sp = sale ? rndPrice(199, op - 50) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'abayas', price: op, salePrice: sp, img: DRESS_IMGS[(i + 5) % DRESS_IMGS.length], imgs: [DRESS_IMGS[(i + 5) % DRESS_IMGS.length]],
        rating: +(4 + Math.random() * 1).toFixed(1), reviews: Math.floor(Math.random() * 100 + 20), isNew: i < 2, isBestseller: i < 3,
        sizes: ['52', '54', '56', '58', '60'], colors: ['#000', '#000080', '#8B4513', '#800080'],
        desc: 'عباية نسائية أنيقة بخامة فاخرة وتطريز راقي.',
        filters: { embroideryType: rnd(['ذهبي', 'فضي', 'ملون']), fabric: rnd(['كريب', 'شيفون', 'نيدل']), withScarf: rnd(['نعم', 'لا']) }
    });
});

// Accessories
const accNames = ['طقم إكسسوارات ذهبي فاخر', 'سوار نسائي بتصميم عصري', 'ساعة نسائية أنيقة', 'إكسسوار شعر كريستال', 'أقراط لؤلؤ طبيعي', 'تاج عروس فاخر', 'قلادة ذهبية بتعليقة', 'طقم فضي بأحجار كريمة'];
accNames.forEach((n, i) => {
    const op = rndPrice(49, 399), sale = Math.random() > .6, sp = sale ? rndPrice(29, op - 20) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'accessories', price: op, salePrice: sp, img: ACC_IMGS[i % ACC_IMGS.length], imgs: [ACC_IMGS[i % ACC_IMGS.length]],
        rating: +(4 + Math.random() * 1).toFixed(1), reviews: Math.floor(Math.random() * 300 + 20), isNew: i < 3, isBestseller: i < 4,
        sizes: [], colors: ['#DAA520', '#C0C0C0', '#FFB6C1'],
        desc: 'إكسسوار نسائي فاخر بتصميم فريد وجودة عالية.',
        filters: { subType: rnd(['أطقم', 'أساور', 'ساعات', 'أقراط', 'تيجان']), metal: rnd(['ذهبي', 'فضي', 'روز قولد']) }
    });
});

// Shoes
const shoeNames = ['حذاء نسائي بكعب عالي أنيق', 'حذاء مدبب بتصميم كلاسيكي', 'حذاء بكعب متوسط مريح', 'حذاء فلات بتفاصيل ذهبية', 'حذاء سهرة لامع', 'حذاء بتصميم شبكي أنيق'];
shoeNames.forEach((n, i) => {
    const op = rndPrice(99, 349), sale = Math.random() > .6, sp = sale ? rndPrice(59, op - 30) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'shoes', price: op, salePrice: sp, img: SHOE_IMGS[i % SHOE_IMGS.length], imgs: [SHOE_IMGS[i % SHOE_IMGS.length]],
        rating: +(3.5 + Math.random() * 1.5).toFixed(1), reviews: Math.floor(Math.random() * 150 + 10), isNew: i < 2, isBestseller: i < 3,
        sizes: ['36', '37', '38', '39', '40', '41'], colors: ['#000', '#F5DEB3', '#fff', '#DAA520'],
        desc: 'حذاء نسائي أنيق بتصميم عصري وراحة فائقة.',
        filters: { heelType: rnd(['عالي', 'متوسط', 'فلات']), design: rnd(['مدبب', 'مفتوح', 'مغلق']) }
    });
});

// Bags
const bagNames = ['حقيبة سهرة ذهبية فاخرة', 'شنطة كتف بتصميم أنيق', 'حقيبة يد جلد طبيعي', 'شنطة كروس عصرية', 'حقيبة ناعمة بسلسلة ذهبية', 'حقيبة مناسبات مطرزة'];
bagNames.forEach((n, i) => {
    const op = rndPrice(79, 449), sale = Math.random() > .6, sp = sale ? rndPrice(49, op - 30) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'bags', price: op, salePrice: sp, img: BAG_IMGS[i % BAG_IMGS.length], imgs: [BAG_IMGS[i % BAG_IMGS.length]],
        rating: +(4 + Math.random() * 1).toFixed(1), reviews: Math.floor(Math.random() * 100 + 10), isNew: i < 2, isBestseller: i < 3,
        sizes: [], colors: ['#000', '#F5DEB3', '#DAA520', '#C0C0C0'],
        desc: 'حقيبة نسائية أنيقة بتصميم فاخر وخامة متينة.',
        filters: { subType: rnd(['سهرة', 'كتف', 'يد', 'كروس']), bagSize: rnd(['صغير', 'متوسط', 'كبير']) }
    });
});

// Sets & Girls
['اطقم بلوزة وبنطلون أنيق', 'طقم نسائي رسمي', 'طقم كاجوال عصري', 'طقم رياضي أنيق'].forEach((n, i) => {
    const op = rndPrice(149, 499), sale = Math.random() > .5, sp = sale ? rndPrice(99, op - 40) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'sets', price: op, salePrice: sp, img: DRESS_IMGS[(i + 2) % DRESS_IMGS.length], imgs: [DRESS_IMGS[(i + 2) % DRESS_IMGS.length]],
        rating: +(3.5 + Math.random() * 1.5).toFixed(1), reviews: Math.floor(Math.random() * 80 + 10), isNew: i < 2, isBestseller: i < 2,
        sizes: ['S', 'M', 'L', 'XL'], colors: ['#000', '#fff', '#F5DEB3'], desc: 'طقم نسائي أنيق بتصميم عصري وخامة مريحة.', filters: { setSize: rnd(['S', 'M', 'L']), fabric: rnd(['قطن', 'بوليستر']) }
    });
});
['فستان بناتي وردي بفيونكة', 'فستان بناتي أبيض للمناسبات', 'فستان بناتي أزرق ناعم', 'فستان بناتي أحمر فاخر'].forEach((n, i) => {
    const op = rndPrice(89, 299), sale = Math.random() > .5, sp = sale ? rndPrice(49, op - 30) : null;
    PRODUCTS.push({
        id: pid++, name: n, category: 'girls', price: op, salePrice: sp, img: DRESS_IMGS[(i + 6) % DRESS_IMGS.length], imgs: [DRESS_IMGS[(i + 6) % DRESS_IMGS.length]],
        rating: +(4 + Math.random() * 1).toFixed(1), reviews: Math.floor(Math.random() * 60 + 5), isNew: i < 2, isBestseller: i < 2,
        sizes: ['2-4', '5-7', '8-10', '11-14'], colors: ['#FFB6C1', '#fff', '#87CEEB', '#DC143C'], desc: 'فستان بناتي جميل بتصميم مميز وخامة مريحة.', filters: { ageGroup: rnd(['2-4 سنوات', '5-7 سنوات', '8-10 سنوات']) }
    });
});

const HERO_SLIDES = [
    { badge: 'تشكيلة جديدة 2026', title: 'أناقتك تبدأ <span>من هنا</span>', desc: 'اكتشفي أحدث تشكيلات الفساتين والجلابيات بتصاميم فريدة وخامات فاخرة تليق بأناقتك', img: DRESS_IMGS[0] },
    { badge: 'خصم يصل 50%', title: 'عروض <span>لا تُقاوم</span>', desc: 'تسوّقي الآن واستمتعي بخصومات مذهلة على تشكيلة واسعة من الأزياء والإكسسوارات', img: DRESS_IMGS[2] },
    { badge: 'جلابيات رمضان', title: 'استعدي لـ<span>رمضان</span> ✨', desc: 'مجموعة حصرية من أفخم الجلابيات والقفاطين لإطلالة ساحرة في رمضان', img: DRESS_IMGS[4] },
];

const TESTIMONIALS = [
    { name: 'سارة العبدالله', text: 'تجربة تسوق رائعة! الفستان وصل بسرعة والجودة ممتازة جداً. سأطلب مرة أخرى بالتأكيد 💕', rating: 5, date: 'قبل أسبوع' },
    { name: 'نورة الحربي', text: 'أحب تشكيلة الجلابيات عندهم، تصاميم فريدة وأسعار معقولة. خدمة العملاء مميزة أيضاً!', rating: 5, date: 'قبل أسبوعين' },
    { name: 'هند الشمري', text: 'طلبت عباية وإكسسوارات، الجودة فاقت توقعاتي. التغليف راقي والتوصيل سريع ❤️', rating: 4, date: 'قبل شهر' },
    { name: 'ريم القحطاني', text: 'المتجر المفضل عندي للأحذية والشنط. كل مرة ألقى شي يعجبني. شكراً أناقتي!', rating: 5, date: 'قبل 3 أسابيع' },
    { name: 'لمى العتيبي', text: 'فساتين البناتي عندهم خيالية! بنتي انبسطت كثير بفستان العيد 🎀', rating: 5, date: 'قبل شهر' },
    { name: 'أمل الدوسري', text: 'خدمة ممتازة وسرعة في التوصيل. الأسعار مناسبة مقارنة بالجودة العالية', rating: 4, date: 'قبل أسبوعين' },
];

const INFO_PAGES = {
    about: { title: 'من نحن', content: `<h2>من نحن</h2><p>أناقتي هو متجر إلكتروني سعودي متخصص في الأزياء النسائية الفاخرة. تأسس عام 2024 بهدف تقديم أحدث صيحات الموضة للمرأة العربية بجودة استثنائية وأسعار منافسة.</p><h3>رؤيتنا</h3><p>أن نكون الوجهة الأولى للمرأة العربية في عالم الأزياء والأناقة، ونقدم تجربة تسوق فريدة ومميزة.</p><h3>قيمنا</h3><ul><li>الجودة العالية في جميع منتجاتنا</li><li>خدمة عملاء متميزة على مدار الساعة</li><li>أسعار عادلة ومنافسة</li><li>التجديد المستمر في التصاميم والموديلات</li></ul>` },
    contact: { title: 'تواصلي معنا', content: `<h2>تواصلي معنا</h2><p>نحن هنا لخدمتك! تواصلي معنا عبر أي من القنوات التالية:</p><h3>معلومات التواصل</h3><ul><li>📧 البريد الإلكتروني: info@anaqati.com</li><li>📱 واتساب: +966 50 000 0000</li><li>📞 هاتف: +966 11 000 0000</li><li>📍 الرياض، المملكة العربية السعودية</li></ul><h3>ساعات العمل</h3><p>السبت - الخميس: 9 صباحاً - 11 مساءً<br>الجمعة: 2 ظهراً - 11 مساءً</p>` },
    faq: { title: 'الأسئلة الشائعة', content: `<h2>الأسئلة الشائعة</h2><h3>كيف أختار المقاس المناسب؟</h3><p>يمكنك الاطلاع على جدول المقاسات في صفحة كل منتج. ننصح بأخذ قياساتك ومقارنتها بالجدول.</p><h3>كم مدة التوصيل؟</h3><p>داخل الرياض: 1-2 يوم عمل. باقي المناطق: 3-5 أيام عمل.</p><h3>هل يمكنني الإرجاع؟</h3><p>نعم، يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام بشرط أن يكون بحالته الأصلية.</p><h3>ما طرق الدفع المتاحة؟</h3><p>نقبل: مدى، فيزا، ماستركارد، Apple Pay، الدفع عند الاستلام.</p><h3>هل المنتجات أصلية؟</h3><p>نعم، جميع المنتجات أصلية 100% ونضمن جودتها.</p>` },
    return: { title: 'سياسة الإرجاع', content: `<h2>سياسة الإرجاع والاستبدال</h2><h3>شروط الإرجاع</h3><ul><li>يمكن إرجاع المنتج خلال 14 يوم من تاريخ الاستلام</li><li>يجب أن يكون المنتج بحالته الأصلية مع جميع العلامات</li><li>يجب إرفاق الفاتورة الأصلية</li><li>المنتجات الداخلية والإكسسوارات الشخصية غير قابلة للإرجاع</li></ul><h3>خطوات الإرجاع</h3><ul><li>تواصلي مع خدمة العملاء عبر الواتساب</li><li>سنرسل لك رابط شركة الشحن لاستلام المنتج</li><li>سيتم استرجاع المبلغ خلال 5-7 أيام عمل</li></ul>` },
    privacy: { title: 'سياسة الخصوصية', content: `<h2>سياسة الخصوصية</h2><p>نلتزم في أناقتي بحماية خصوصية عملائنا.</p><h3>البيانات التي نجمعها</h3><ul><li>الاسم ومعلومات التواصل</li><li>عنوان الشحن</li><li>تاريخ الطلبات</li></ul><h3>كيف نستخدم بياناتك</h3><ul><li>معالجة وتوصيل الطلبات</li><li>إرسال العروض والتحديثات (بموافقتك)</li><li>تحسين تجربة التسوق</li></ul><p>لن نشارك بياناتك مع أي طرف ثالث بدون موافقتك.</p>` },
    terms: { title: 'الشروط والأحكام', content: `<h2>الشروط والأحكام</h2><h3>الطلبات</h3><p>بإتمام الطلب فإنك توافقين على هذه الشروط. جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة.</p><h3>الشحن</h3><p>نوفر شحن مجاني للطلبات فوق 299 ريال. مدة التوصيل 2-5 أيام عمل.</p><h3>الدفع</h3><p>نقبل جميع وسائل الدفع الرئيسية. جميع المعاملات مشفرة وآمنة.</p>` },
    shipping: { title: 'سياسة الشحن', content: `<h2>سياسة الشحن والتوصيل</h2><h3>مناطق التوصيل</h3><p>نوصل لجميع مناطق المملكة العربية السعودية.</p><h3>مدة التوصيل</h3><ul><li>الرياض: 1-2 يوم عمل</li><li>المنطقة الوسطى: 2-3 أيام عمل</li><li>باقي المناطق: 3-5 أيام عمل</li></ul><h3>رسوم الشحن</h3><ul><li>مجاني للطلبات فوق 299 ريال</li><li>25 ريال للطلبات أقل من 299 ريال</li></ul>` },
};
