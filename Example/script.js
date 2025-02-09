let categories = [
    {
      title: "Personal",
      img: "personal.png",
    },
    {
      title: "Work",
      img: "work.png",
    },
    {
      title: "Shopping",
      img: "shopping.png",
    },
    {
      title: "Health",
      img: "health.png",
    },
    {
      title: "Education",
      img: "study.png",
    },
    {
      title: "Finance",
      img: "finance.png",
    },
  ];
  
  let tasks = [
    {
      id: 1,
      task: "Go to market",
      category: "Shopping",
      completed: false,
    },
    {
      id: 2,
      task: "Read a chapter of a book",
      category: "Personal",
      completed: false,
    },
    {
      id: 3,
      task: "Prepare presentation for meeting",
      category: "Work",
      completed: false,
    },
    {
      id: 4,
      task: "Take a 30-minute walk",
      category: "Health",
      completed: false,
    },
    {
      id: 5,
      task: "Watch an educational video online",
      category: "Education",
      completed: false,
    },
    {
      id: 6,
      task: "Review monthly budget",
      category: "Finance",
      completed: false,
    },
    {
      id: 7,
      task: "Buy groceries for the week",
      category: "Shopping",
      completed: false,
    },
    {
      id: 8,
      task: "Write in a journal",
      category: "Personal",
      completed: false,
    },
    {
      id: 9,
      task: "Send follow-up emails",
      category: "Work",
      completed: false,
    },
    {
      id: 10,
      task: "Try a new healthy recipe",
      category: "Health",
      completed: false,
    },
    {
      id: 11,
      task: "Read an article about a new topic",
      category: "Education",
      completed: false,
    },
    {
      id: 12,
      task: "Set up automatic bill payments",
      category: "Finance",
      completed: false,
    },
    // Additional tasks for each category
    {
      id: 13,
      task: "Buy new clothes",
      category: "Shopping",
      completed: false,
    },
    {
      id: 14,
      task: "Meditate for 10 minutes",
      category: "Personal",
      completed: false,
    },
    {
      id: 15,
      task: "Prepare agenda for team meeting",
      category: "Work",
      completed: false,
    },
    {
      id: 16,
      task: "Try a new recipe for lunch",
      category: "Health",
      completed: false,
    },
    {
      id: 17,
      task: "Learn a new language online",
      category: "Education",
      completed: false,
    },
    {
      id: 18,
      task: "Read about history",
      category: "Education",
      completed: false,
    },
    // Add more tasks for each category as desired
  ];
  
  // Define functions
  const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
  const getLocal = () => {
    const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
    if (tasksLocal) {
      tasks = tasksLocal;
    }
  };
  
  const toggleScreen = () => {
    screenWrapper.classList.toggle("show-category");
  };
  
  const updateTotals = () => {
    const categoryTasks = tasks.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    numTasks.innerHTML = `${categoryTasks.length} Tasks`;
    totalTasks.innerHTML = tasks.length;
  };
  
  const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
      const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === category.title.toLowerCase()
      );
      const div = document.createElement("div");
      div.classList.add("category");
      div.addEventListener("click", () => {
        screenWrapper.classList.toggle("show-category");
        selectedCategory = category;
        updateTotals();
        categoryTitle.innerHTML = category.title;
        categoryImg.src = `images/${category.img}`;
        renderTasks();
      });
  
      div.innerHTML = `
                    <div class="left">
                  <img src="images/${category.img}"
                   alt="${category.title}"
                    />
                  <div class="content">
                    <h1>${category.title}</h1>
                    <p>${categoryTasks.length} Tasks</p>
                  </div>
                </div>
                <div class="options">
                  <div class="toggle-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                  </div>
                </div>
      `;
  
      categoriesContainer.appendChild(div);
    });
  };
  
  const renderTasks = () => {
    tasksContainer.innerHTML = "";
    const categoryTasks = tasks.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    if (categoryTasks.length === 0) {
      tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
    } else {
      categoryTasks.forEach((task) => {
        const div = document.createElement("div");
        div.classList.add("task-wrapper");
        const label = document.createElement("label");
        label.classList.add("task");
        label.setAttribute("for", task.id);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = task.id;
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          const index = tasks.findIndex((t) => t.id === task.id);
          tasks[index].completed = !tasks[index].completed;
          saveLocal();
        });
        div.innerHTML = `
                <div class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>
                `;
        label.innerHTML = `
                <span class="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                    </svg>
                </span>
                <p>${task.task}</p>
          `;
        label.prepend(checkbox);
        div.prepend(label);
        tasksContainer.appendChild(div);
  
        const deleteBtn = div.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
          const index = tasks.findIndex((t) => t.id === task.id);
          tasks.splice(index, 1);
          saveLocal();
          renderTasks();
        });
      });
  
      renderCategories();
      updateTotals();
    }
  };
  
  const toggleAddTaskForm = () => {
    addTaskWrapper.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
  };
  
  const addTask = (e) => {
    e.preventDefault();
    const task = taskInput.value;
    const category = categorySelect.value;
  
    if (task === "") {
      alert("Please enter a task");
    } else {
      const newTask = {
        id: tasks.length + 1,
        task,
        category,
        completed: false,
      };
      taskInput.value = "";
      tasks.push(newTask);
      saveLocal();
      toggleAddTaskForm();
      renderTasks();
    }
  };
  
  // Initialize variables and DOM elements
  let selectedCategory = categories[0];
  const categoriesContainer = document.querySelector(".categories");
  const screenWrapper = document.querySelector(".wrapper");
  const menuBtn = document.querySelector(".menu-btn");
  const backBtn = document.querySelector(".back-btn");
  const tasksContainer = document.querySelector(".tasks");
  const numTasks = document.getElementById("num-tasks");
  const categoryTitle = document.getElementById("category-title");
  const categoryImg = document.getElementById("category-img");
  const categorySelect = document.getElementById("category-select");
  const addTaskWrapper = document.querySelector(".add-task");
  const addTaskBtn = document.querySelector(".add-task-btn");
  const taskInput = document.getElementById("task-input");
  const blackBackdrop = document.querySelector(".black-backdrop");
  const addBtn = document.querySelector(".add-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const totalTasks = document.getElementById("total-tasks");
  
  // Attach event listeners
  menuBtn.addEventListener("click", toggleScreen);
  backBtn.addEventListener("click", toggleScreen);
  addTaskBtn.addEventListener("click", toggleAddTaskForm);
  blackBackdrop.addEventListener("click", toggleAddTaskForm);
  addBtn.addEventListener("click", addTask);
  cancelBtn.addEventListener("click", toggleAddTaskForm);
  
  // Render initial state
  getLocal();
  renderTasks();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });