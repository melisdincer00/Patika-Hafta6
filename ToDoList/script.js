// Görevleri localStorage’a kaydet
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// localStorage’dan görevleri al
function loadTasks() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

// Görev ekleme (Ekle butonu)
function newElement() {
  const taskInput = document.querySelector("#task");     // input alanı
  const taskValue = taskInput.value.trim();              // boşlukları sil
  const list = document.querySelector("#list");          // liste alanı

  if (taskValue === "") {
    $("#errorToast").toast("show");                      // boşsa uyarı
    return;
  }

  const tasks = loadTasks();                             // görevleri al
  tasks.push({ text: taskValue, completed: false });     // yeni görev ekle
  saveTasks(tasks);                                      // kaydet

  const li = createListItem(taskValue, false);           // görsel olarak ekle
  list.appendChild(li);
  taskInput.value = "";                                  // input'u temizle

  $("#successToast").toast("show");                      // bildirim göster
}

// Tek bir görev satırı oluştur
function createListItem(taskText, isCompleted) {
  const li = document.createElement("li");               // <li> oluştur

  const checkbox = document.createElement("input");      // checkbox
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = isCompleted;                        // işaretli mi

  const spanText = document.createElement("span");       // görev metni
  spanText.className = "task-text";
  spanText.textContent = taskText;
  if (isCompleted) {
    spanText.classList.add("checked");                   // kırmızı çizgi
  }

  const closeBtn = document.createElement("span");       // silme butonu
  closeBtn.className = "close";
  closeBtn.textContent = "×";

  // Görev silme
  closeBtn.addEventListener("click", () => {
    li.remove();                                         // ekrandan sil

    const updatedTasks = loadTasks().filter((t) => t.text !== taskText); // listeden çıkar
    saveTasks(updatedTasks);                             // localStorage’ı güncelle
  });

  // Checkbox ile tamamlandı işareti
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      spanText.classList.add("checked");
    } else {
      spanText.classList.remove("checked");
    }

    // Check durumunu güncelle
    const updatedTasks = loadTasks().map((t) =>
      t.text === taskText ? { ...t, completed: checkbox.checked } : t
    );
    saveTasks(updatedTasks);
  });

  li.appendChild(checkbox);      // sırayla ekle
  li.appendChild(spanText);
  li.appendChild(closeBtn);

  return li;
}

// Sayfa açıldığında görevleri yükle
window.onload = function () {
  const list = document.querySelector("#list");
  const tasks = loadTasks();    // kayıtlı görevleri al

  tasks.forEach((task) => {
    const li = createListItem(task.text, task.completed); // satır olarak oluştur
    list.appendChild(li);                                 // ekle
  });
};
