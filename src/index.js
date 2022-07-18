import App from "./App";
import Memory from "./Memory";
import Item from "./Item";
import "./style.css"
import "normalize.css"
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faAlignJustify, fas } from "@fortawesome/free-solid-svg-icons";

library.add(faAlignJustify)

const content = document.getElementById("content")


const Display = (() => {
    let DEFAULT = true
    
    const displayApp = () => {
        const state = JSON.parse(Memory.load("appState"))
        const appState = state ? state : App.stringify() 
        console.log(appState);
        const toggleMenu = () => {
            const menu = document.getElementById("project-menu")
            menu.classList.toggle("hide")
        }
        content.textContent = ""
        
        const app = document.createElement("div")
        app.classList.add("app")
        createProjectMenu(app, appState)
      
        const navbar = createNavbar(toggleMenu)
        content.appendChild(navbar)
        content.appendChild(app)
    }

    const createNavbar = (toggleMenu) => {
        const navbar = document.createElement("nav")
        navbar.classList.add("navbar")
        const navbarList = document.createElement("ul")
        navbarList.classList.add("navbar--list")
        const showProjects = document.createElement("div")
        showProjects.innerHTML = icon({prefix:'fas', iconName:"align-justify"}).html
        showProjects.addEventListener("click", toggleMenu);
        navbarList.append(showProjects)
        const heading = document.createElement("h4")
        heading.textContent = "To Do List App"
        navbarList.append(heading)
        navbar.append(navbarList)

        return navbar
    }

    const createProjectMenu = (container, appState) => {
        const projectMenu = document.createElement("div")
        projectMenu.classList.add("project-menu")
        projectMenu.id = "project-menu"
        const heading = document.createElement("h4")
        heading.textContent = "Projects"
        projectMenu.appendChild(heading)
        const items = createProjectMenuItems(container, appState)
        projectMenu.appendChild(items)

        const button = document.createElement("button")
        button.textContent = "Add Project"
        button.addEventListener("click",  showProjectForm)
        projectMenu.appendChild(button)
        
      
        
        container.appendChild(projectMenu)

        function showProjectForm() {
            const addProject = addProjectForm(button);
            button.classList.toggle("hide")
            projectMenu.appendChild(addProject);

            
        }
    }

    const addProjectForm = (button) => {
        const form = document.createElement("form")
        const p = document.createElement("p")
        p.textContent = "Enter project name"
        const input = document.createElement("input")
        console.log(input.value);
        form.appendChild(p)
        form.appendChild(input)
        const submit = document.createElement("button")
        submit.addEventListener("click",(e) => {e.preventDefault(); addProject(input.value)})
        submit.type = "submit"
        submit.textContent = "add"
        const cancel = document.createElement("button")
        cancel.textContent = "cancel"
        cancel.addEventListener("click",(e) => { e.preventDefault();resetForm()})
        form.appendChild(submit)
        form.appendChild(cancel)

        
        return form
        function resetForm () {
            button.classList.toggle("hide")
            form.classList.toggle("hide")
        }
        function addProject(name) {
            App.addProject(name)
            Memory.save()
            displayApp()
        }
    }


    const createProjectMenuItems = (app, appState) => {
        const items = document.createElement("div")
        if (DEFAULT) {
            showProjects(App.getProjects()[0].stringify(), app, App.getProjects()[0])
        }
        for (let i = 0; i < appState.length; i++) {
            const menuItem = createProjectMenuItem(appState[i], app, i)
            items.appendChild(menuItem)
        } 
        return items
    }

    const createProjectMenuItem = (project, app, index) => {
        const realProject = App.getProjects()[index]
        const item = document.createElement("div")
        const link = document.createElement("a")
        link.addEventListener("click", () => showProjects(project, app, realProject))
        item.classList.add("project-menu--item")
        link.textContent = `${project.name}`
        item.appendChild(link)
        return item
    }

    const showProjects = (project, container, realProject) => {
        DEFAULT = false
        console.log(realProject);
        
        const getAppDiv = document.getElementById("app-div")
        const appDiv = getAppDiv ? getAppDiv : document.createElement("div")
        appDiv.id = "app-div"
        appDiv.textContent = ""
        makeHeading()

        const add = document.createElement("button")
        add.textContent = "add Task"
        add.addEventListener("click", () => {
            createItemForm(project, appDiv, add)
            add.classList.toggle("hide")
        })
        appDiv.appendChild(add)

        const del = document.createElement("button")
        del.textContent = "delete Project"
        del.addEventListener("click",
         () => {
            console.log(App.getProjects());
            console.log(realProject);
            alert("Delete Project?")
            App.deleteProject(project.name)
            Memory.save()
            displayApp()
            })
        appDiv.appendChild(del)

        
        const getDiv = document.getElementById("items-container")
        const itemsContainer = getDiv ? getDiv : document.createElement("div")
        itemsContainer.id = "items-container"
        itemsContainer.textContent = ""
        for (let i = 0; i < project.items.length ; i++) {
            const itemCard = createItemCard(project.items[i], realProject, container)
            itemsContainer.appendChild(itemCard)
        }
        appDiv.appendChild(itemsContainer)
        container.appendChild(appDiv)

        function makeHeading() {
            const heading = document.createElement("h2");
            heading.textContent = "To Do List";
            appDiv.appendChild(heading);
        }

        function createItemForm(project, appDiv, button) {
            const form = document.createElement("form")
            form.classList.add("item-form")

            const heading = document.createElement("h3")
            heading.textContent = "Add Task"
            form.appendChild(heading)

            const nameField = document.createElement("div")
            const nameInput = document.createElement("input")
            const nameLabel = document.createElement("p")
            nameLabel.textContent = "Task name"
            nameField.appendChild(nameLabel)
            nameField.appendChild(nameInput)
            form.appendChild(nameField)

            const dateField = document.createElement("div")
            const dateInput = document.createElement("input")
            const dateLabel = document.createElement("p")
            dateInput.type = "date"
            dateLabel.textContent = "Due date"
            dateField.appendChild(dateLabel)
            dateField.appendChild(dateInput)
            form.appendChild(dateField)

            
            const descField = document.createElement("div")
            const descInput = document.createElement("input")
            const descLabel = document.createElement("p")
            descInput.type = "textarea"
            descLabel.textContent = "Description"
            descField.appendChild(descLabel)
            descField.appendChild(descInput)
            form.appendChild(descField)

            const add  = document.createElement("button")
            add.textContent = "Submit"
            add.addEventListener("click", (e) => {
                e.preventDefault()
                const newItem = Item(
                    nameInput.value,
                    dateInput.value,
                    descInput.value
                    )
                realProject.addItem(newItem)
                Memory.save()
                showProjects(realProject.stringify(), container, realProject)
            
            })

            const cancel = document.createElement("button")
            cancel.textContent = "cancel"
            cancel.addEventListener("click", (e) => {
                e.preventDefault()
                form.classList.toggle("hide")
                button.classList.toggle("hide")
            })


            form.appendChild(add)
            form.appendChild(cancel)

            appDiv.appendChild(form)

        } 
    }

    const createItemCard = (item, project, app) => {
        const realItem = project.getProjectItems().filter(it => it.getItemName() === item.name)

        const itemCard = document.createElement("div")
        itemCard.classList.add("item-card")

        const itemName = document.createElement("p")
        itemName.textContent = item.name
        itemName.classList.add("item-name")
        itemCard.appendChild(itemName)

        const itemDate = document.createElement("p")
        itemDate.textContent = `due date: ${item.due}`
        itemDate.classList.add("item-date")
        itemCard.appendChild(itemDate)

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        itemCard.appendChild(checkbox)

        const itemDesc = document.createElement("p")
        itemDesc.textContent = item.desc 
        itemDesc.classList.add("item-desc")
        itemCard.appendChild(itemDesc)

        const del = document.createElement("button")
        del.textContent = "delete task"
        del.addEventListener("click", () => {
            project.deleteItem(item.name)
            Memory.save()
            showProjects(project.stringify(), app, project)
        })

        const edit = document.createElement("button")
        edit.textContent = "edit task"
        edit.addEventListener("click", () => { 
            edit.classList.toggle("hide")
            updateItemForm(project, app, edit, item) 
        })

        itemCard.appendChild(del)
        itemCard.appendChild(edit)

        return itemCard
        function updateItemForm(project, appDiv, button, item) {
            const form = document.createElement("form")
            form.classList.add("item-form")

            const heading = document.createElement("h3")
            heading.textContent = "Edit Task"
            form.appendChild(heading)

            const nameField = document.createElement("div")
            const nameInput = document.createElement("input")
            const nameLabel = document.createElement("p")
            nameLabel.textContent = "Task name"
            nameField.appendChild(nameLabel)
            nameField.appendChild(nameInput)
            form.appendChild(nameField)

            const dateField = document.createElement("div")
            const dateInput = document.createElement("input")
            const dateLabel = document.createElement("p")
            dateInput.type = "date"
            dateLabel.textContent = "Due date"
            dateField.appendChild(dateLabel)
            dateField.appendChild(dateInput)
            form.appendChild(dateField)

            
            const descField = document.createElement("div")
            const descInput = document.createElement("input")
            const descLabel = document.createElement("p")
            descInput.type = "textarea"
            descLabel.textContent = "Description"
            descField.appendChild(descLabel)
            descField.appendChild(descInput)
            form.appendChild(descField)

            const add  = document.createElement("button")
            add.textContent = "Submit"
            add.addEventListener("click", (e) => {
                e.preventDefault()
                const newItem = Item(
                    nameInput.value,
                    dateInput.value,
                    descInput.value
                    )

                project.deleteItem(item.name)
                project.addItem(newItem)
                Memory.save()
                showProjects(project.stringify(), app, project)
                form.classList.toggle("hide")
                button.classList.toggle("hide")
            
            })

            const cancel = document.createElement("button")
            cancel.textContent = "cancel"
            cancel.addEventListener("click", (e) => {
                e.preventDefault()
                form.classList.toggle("hide")
                button.classList.toggle("hide")
            })


            form.appendChild(add)
            form.appendChild(cancel)

            appDiv.appendChild(form)
        }
    }


    
    return {displayApp}
})()

Display.displayApp()


