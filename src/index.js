import App from "./App";
import "./style.css"
import "normalize.css"
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faAlignJustify, fas } from "@fortawesome/free-solid-svg-icons";
import { sub } from "date-fns";
import { ca } from "date-fns/locale";

library.add(faAlignJustify)

const content = document.getElementById("content")



console.log(App.getProjects());



const Display = (() => {
    const displayApp = () => {
        const toggleMenu = () => {
            const menu = document.getElementById("project-menu")
            menu.classList.toggle("hide")
        }
        
        
        const app = document.createElement("div")
        app.classList.add("app")
        createProjectMenu(app)
      
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

    const createProjectMenu = (container) => {
        const projectMenu = document.createElement("div")
        projectMenu.classList.add("project-menu")
        projectMenu.id = "project-menu"
        const heading = document.createElement("h4")
        heading.textContent = "Projects"
        projectMenu.appendChild(heading)
        const items = createProjectMenuItems(container)
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
            displayApp()
        }
    }


    const createProjectMenuItems = (app) => {
        const items = document.createElement("div")
        for (let i = 0; i < App.getProjects().length; i++) {
            const menuItem = createProjectMenuItem(App.getProjects()[i], app)
            items.appendChild(menuItem)
        } 
        return items
    }

    const createProjectMenuItem = (project, app) => {
        const item = document.createElement("div")
        const link = document.createElement("a")
        console.log(project.getProjectName());
        link.addEventListener("click", () => showProjects(project, app))
        item.classList.add("project-menu--item")
        link.textContent = `${project.getProjectName()}`
        item.appendChild(link)
        return item
    }

    const showProjects = (project, container) => {
        const getAppDiv = document.getElementById("app-div")
        const appDiv = getAppDiv ? getAppDiv : document.createElement("div")
        appDiv.id = "app-div"
        if (!getAppDiv) {
            makeHeading()
        }

        const getDiv = document.getElementById("items-container")
        const itemsContainer = getDiv ? getDiv : document.createElement("div")
        itemsContainer.id = "items-container"
        itemsContainer.textContent = ""
        for (let i = 0; i < project.getProjectItems().length ; i++) {
            const itemCard = createItemCard(project.getProjectItems()[i])
            itemsContainer.appendChild(itemCard)
        }
        appDiv.appendChild(itemsContainer)
        container.appendChild(appDiv)

        function makeHeading() {
            const heading = document.createElement("h2");
            heading.textContent = "To Do List";
            appDiv.appendChild(heading);
        }
    }

    const createItemCard = (item) => {
        const itemCard = document.createElement("div")
        itemCard.classList.add("item-card")

        const itemName = document.createElement("p")
        itemName.textContent = item.getItemName()
        itemName.classList.add("item-name")
        itemCard.appendChild(itemName)

        const itemDate = document.createElement("p")
        itemDate.textContent = `due date: ${item.getItemDate()}`
        itemDate.classList.add("item-date")
        itemCard.appendChild(itemDate)

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        itemCard.appendChild(checkbox)

        const itemDesc = document.createElement("p")
        itemDesc.textContent = item.getItemDesc()
        itemDesc.classList.add("item-desc")
        itemCard.appendChild(itemDesc)
        return itemCard
    }


    
    return {displayApp}
})()

Display.displayApp()
