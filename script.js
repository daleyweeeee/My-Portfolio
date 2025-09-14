document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("darkModeToggle");

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = "Light Mode";
    }

    themeToggle.addEventListener("click", () => {
      console.log("Toggle button clicked!");
      
      document.body.classList.toggle("dark-mode");

      const isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

      if (isDarkMode) {
        themeToggle.textContent = "Light Mode";
        console.log("Switched to dark mode");
      } else {
        themeToggle.textContent = "Dark Mode";
        console.log("Switched to light mode");
      }
    });
  } else {
    console.log("⚠️ Dark mode button not found!");
  }

  const editBtn = document.getElementById("edit-about");
  const aboutText = document.getElementById("about-text");
  const aboutContent = document.getElementById("about-content");

  if (editBtn && aboutText) {
    let isEditing = false;
    let originalContent = aboutText.innerHTML;

    editBtn.addEventListener("click", () => {
      if (!isEditing) {
        aboutText.contentEditable = "true";
        aboutText.classList.add("editable");
        aboutText.focus();
        editBtn.textContent = "Save";
        editBtn.classList.add("saving");
        isEditing = true;
        
        aboutText.addEventListener("keydown", handleKeyDown);
        console.log("About section is now editable");
      } else {
        aboutText.contentEditable = "false";
        aboutText.classList.remove("editable");
        editBtn.textContent = "Edit";
        editBtn.classList.remove("saving");
        isEditing = false;
        
        aboutText.removeEventListener("keydown", handleKeyDown);
        
        showSaveConfirmation();
        console.log("About section changes saved");
      }
    });

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        aboutText.innerHTML = originalContent;
        aboutText.contentEditable = "false";
        aboutText.classList.remove("editable");
        editBtn.textContent = "Edit";
        editBtn.classList.remove("saving");
        isEditing = false;
        aboutText.removeEventListener("keydown", handleKeyDown);
        console.log("Editing cancelled");
      } else if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault();
        aboutText.contentEditable = "false";
        aboutText.classList.remove("editable");
        editBtn.textContent = "Edit";
        editBtn.classList.remove("saving");
        isEditing = false;
        aboutText.removeEventListener("keydown", handleKeyDown);
        showSaveConfirmation();
        console.log("Changes saved with Ctrl+Enter");
      }
    }

    function showSaveConfirmation() {
      const confirmation = document.createElement('div');
      confirmation.textContent = '✅ Changes saved!';
      confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--brand);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-3d);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
      `;
      
      document.body.appendChild(confirmation);
      
      setTimeout(() => {
        confirmation.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
          if (confirmation.parentNode) {
            confirmation.parentNode.removeChild(confirmation);
          }
        }, 300);
      }, 3000);
    }
  } else {
    console.log("⚠️ Edit button or about section not found!");
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
