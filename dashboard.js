// import { supabase } from "./supabase.js";

// // check user session
// const { data: { user } } = await supabase.auth.getUser();

// if (!user) {
//   window.location.href = "index.html";
// } else {
//   loadProfile(user.id);
// }
 
// let editId = null;
// async function loadProfile(userId) {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("user_id", userId)
//     .single();

//   if (error) {
//     // profile nahi hai to create karo
//     await supabase.from("profiles").insert({
//       user_id: userId,
//       name: "User"
//     });

//     document.getElementById("user-name").innerText = "User";
//   } else {
//     document.getElementById("user-name").innerText =
//       data.name || "User";
//   }
// }



// // logout
// window.logout = async () => {
//   await supabase.auth.signOut();
//   window.location.href = "index.html";
// };
// loadItems();

// // ADD ITEM

// // window.addItem = async () => {
// //   const title = document.getElementById("title").value;
// //   const description = document.getElementById("description").value;
// //   const imageFile = document.getElementById("image").files[0];

// //    window.location.href = "block.html";

// //   const { data: { user } } = await supabase.auth.getUser();

// //   let imageUrl = null;

// //   // IMAGE UPLOAD
// //   if (imageFile) {
// //     const fileName = `${user.id}-${Date.now()}-${imageFile.name}`;

// //     const { error } = await supabase.storage
// //       .from("images")
// //       .upload(fileName, imageFile);

// //     if (!error) {
// //       const { data } = supabase.storage
// //         .from("images")
// //         .getPublicUrl(fileName);

// //       imageUrl = data.publicUrl;
// //     }
// //   }

// //   // CREATE or UPDATE
// //   if (editId) {
// //     await supabase
// //       .from("items")
// //       .update({
// //         title,
// //         description,
// //         image_url: imageUrl
// //       })
// //       .eq("id", editId)
// //       .eq("user_id", user.id);

// //     editId = null;
// //   } else {
// //     await supabase.from("items").insert({
// //       title,
// //       description,
// //       image_url: imageUrl,
// //       user_id: user.id
// //     });
// //   }

// //   document.getElementById("title").value = "";
// //   document.getElementById("description").value = "";
// //   document.getElementById("image").value = "";

// //   loadItems();
// // };



// // // LOAD ITEMS
// // async function loadItems() {
// //   const { data: { user } } = await supabase.auth.getUser();

// //   const { data } = await supabase
// //     .from("items")
// //     .select("*")
// //     .eq("user_id", user.id)
// //     .order("created_at", { ascending: false });

// //   const container = document.getElementById("items");
// //   container.innerHTML = "";

// //   data.forEach(item => {
// //     const div = document.createElement("div");


// // div.innerHTML = `
// //   <p><b>${item.title}</b></p>
// //   <p>${item.description}</p>

// //   ${item.image_url ? `<img src="${item.image_url}" width="150">` : ""}

// //   <br>
// //   <button onclick="startEdit(
// //     '${item.id}',
// //     '${item.title}',
// //     '${item.description}'
// //   )">Edit</button>

// //   <button onclick="deleteItem('${item.id}')">Delete</button>
// //   <hr>
// // `;




// //     container.appendChild(div);
// //   });
// // }


// // // start edit
// // window.startEdit = (id, title, description) => {
// //   document.getElementById("title").value = title;
// //   document.getElementById("description").value = description;
// //   editId = id;
// // };
// // // DELETE ITEM
// // window.deleteItem = async (id) => {
// //   await supabase.from("items").delete().eq("id", id);
// //   loadItems();
// // };

// window.addItem = async () => {
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;
//   const imageFile = document.getElementById("image").files[0];

//   const { data: { user } } = await supabase.auth.getUser();

//   let imageUrl = null;

//   // IMAGE UPLOAD
//   if (imageFile) {
//     const fileName = `${user.id}-${Date.now()}-${imageFile.name}`;

//     const { error } = await supabase.storage
//       .from("images")
//       .upload(fileName, imageFile);

//     if (!error) {
//       const { data } = supabase.storage
//         .from("images")
//         .getPublicUrl(fileName);

//       imageUrl = data.publicUrl;
//     }
//   }

//   // CREATE or UPDATE
//   if (editId) {
//     await supabase
//       .from("items")
//       .update({
//         title,
//         description,
//         image_url: imageUrl
//       })
//       .eq("id", editId)
//       .eq("user_id", user.id);

//     editId = null;
//   } else {
//     await supabase.from("items").insert({
//       title,
//       description,
//       image_url: imageUrl,
//       user_id: user.id
//     });
//   }

//   // FORM CLEAR
//   document.getElementById("title").value = "";
//   document.getElementById("description").value = "";
//   document.getElementById("image").value = "";

//   // ✅ AB REDIRECT (BILKUL END PAR)
//   window.location.href = "block.html";
// };

import { supabase } from "./supabase.js";

// check user
const { data: { user } } = await supabase.auth.getUser();
if (!user) window.location.href = "index.html";

// ADD ITEM
window.addItem = async () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imageFile = document.getElementById("image").files[0];

  let imageUrl = null;

  if (imageFile) {
    const fileName = `${user.id}-${Date.now()}-${imageFile.name}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, imageFile);

    if (!error) {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }
  }

  await supabase.from("items").insert({
    title,
    description,
    image_url: imageUrl,
    user_id: user.id
  });

  // ✅ redirect AFTER insert
  window.location.href = "block.html";
};

