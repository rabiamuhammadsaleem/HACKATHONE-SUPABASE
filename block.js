import { supabase } from "./supabase.js";

const container = document.getElementById("container");
const allBtn = document.getElementById("allBtn");
const myBtn = document.getElementById("myBtn");

let currentUser = null;

// CHECK USER
const init = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) location.href = "index.html";
  currentUser = user;
  readAllBlocks();
};

init();

// ================= ALL BLOCKS =================
async function readAllBlocks() {
  setActive(allBtn);
  const { data } = await supabase.from("items").select("*").order("created_at", { ascending: false });
  renderBlocks(data, false);
}

// ================= MY BLOCKS =================
async function readMyBlocks() {
  setActive(myBtn);
  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  renderBlocks(data, true);
}

// ================= RENDER =================
function renderBlocks(data, isMy) {
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = `<p>No blocks found</p>`;
    return;
  }

  data.forEach(item => {
    container.innerHTML += `
      <div class="blog-card text-center">
        <h5>${item.title}</h5>
        <p>${item.description.slice(0, 80)}...</p>
         ${item.image_url ? `<img src="${item.image_url}" width="150">` : ""}


        ${
          isMy ? `
          <button onclick="editBlock('${item.id}')" class="btn btn-success btn-sm">Edit</button>
          <button onclick="deleteBlock('${item.id}')" class="btn btn-danger btn-sm">Delete</button>
          ` : ""
        }
      </div>
    `;
  });
}

// ================= DELETE =================
window.deleteBlock = async (id) => {
  const confirm = await Swal.fire({
    title: "Delete?",
    showCancelButton: true,
    confirmButtonText: "Yes"
  });

  if (confirm.isConfirmed) {
    await supabase.from("items").delete().eq("id", id);
    readMyBlocks();
  }
};

// ================= EDIT =================
window.editBlock = async (id) => {
  const { value } = await Swal.fire({
    title: "Update Block",
    html: `
      <input id="t" class="swal2-input" placeholder="Title">
      <textarea id="d" class="swal2-textarea" placeholder="Description"></textarea>
    `,
    preConfirm: () => ({
      title: document.getElementById("t").value,
      description: document.getElementById("d").value
    })
  });

  if (value) {
    await supabase.from("items").update(value).eq("id", id);
    readMyBlocks();
  }
};

// ================= NAV EVENTS =================
allBtn.onclick = readAllBlocks;
myBtn.onclick = readMyBlocks;

function setActive(btn) {
  allBtn.classList.remove("active");
  myBtn.classList.remove("active");
  btn.classList.add("active");
}
