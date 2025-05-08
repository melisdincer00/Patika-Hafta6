// Menü dizisi: Her yemek bir nesne olarak tanımlanır
const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 10.99,
    img: "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
    desc: "Spicy rice cakes, serving with fish cake.",
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 7.99,
    img: "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    desc: "Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg.",
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img: "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
    desc: "Boiling vegetables, serving with special hot sauce",
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/3E4C2DED-D0F9-45CD-B476-8BA54E533AD9/Derivates/d17260c9-bc36-4fb0-bbf1-3b4b8427be74.jpg",
    desc: "Dan dan noodle, serving with green onion",
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img: "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
    desc: "Yangzhou style fried rice, serving with bean and pickles",
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img: "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
    desc: "Rice Sandwich, serving with soy sauce",
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: "Korea",
    price: 15.99,
    img: "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
    desc: "Black bean sauce noodle, serving with green onion",
  },
  {
    id: 8,
    title: "Ma Yi Shang Shu",
    category: "China",
    price: 12.99,
    img: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
    desc: "Hot pepper sauce noodle, serving with soy bean and onion",
  },
  {
    id: 9,
    title: "Doroyaki",
    category: "Japan",
    price: 3.99,
    img: "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
    desc: "Red bean paste dessert, serving with honey.",
  },
];

// DOM'daki gerekli HTML öğelerini seçiyoruz
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// Sayfa yüklendiğinde menü ve butonlar gösterilsin
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

// Menü öğelerini HTML'e yerleştiren fonksiyon
function displayMenuItems(menuItems) {
  // Her yemek için bir HTML bloğu oluşturur
  const displayMenu = menuItems.map(function (item) {
    return `
      <div class="menu-items col-lg-6 col-sm-12">
        <img src="${item.img}" alt="${item.title}" class="photo" />
        <div class="menu-info">
          <div class="menu-title">
            <h4>${item.title}</h4>
            <h4 class="price">${item.price.toFixed(2)}₺</h4>
          </div>
          <div class="menu-text">
            ${item.desc}
          </div>
        </div>
      </div>`;
  }).join(""); // Dizi elemanlarını tek string'e çevir

  // HTML içine yaz
  sectionCenter.innerHTML = displayMenu;
}

// Kategori butonlarını dinamik olarak oluştur
function displayMenuButtons() {
  // Kategori isimlerini reduce ile çıkarır
  const categories = menu.reduce(function (values, item) {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  }, ["All"]); // Başta "All" (Tümü) eklenir

  // Buton HTML'lerini oluştur
  const categoryBtns = categories.map(function (category) {
    return `<button class="btn btn-outline-dark btn-item" data-id="${category}">${category}</button>`;
  }).join("");

  btnContainer.innerHTML = categoryBtns;

  // Her butona tıklama olayı tanımla
  const filterBtns = document.querySelectorAll(".btn-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      // "All" seçilmişse tüm menüyü göster
      const menuCategory = category === "All"
        ? menu
        : menu.filter(function (menuItem) {
            return menuItem.category === category;
          });

      // Filtrelenmiş menüyü göster
      displayMenuItems(menuCategory);
    });
  });
}
