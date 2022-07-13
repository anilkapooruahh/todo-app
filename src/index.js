import App from "./App";
import "./style.css"
import "normalize.css"
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faAlignJustify, fas } from "@fortawesome/free-solid-svg-icons";

library.add(faAlignJustify)

const content = document.getElementById("content")



console.log(App.getProjects());



const Display = (() => {
    const displayApp = () => {
        const toggleMenu = () => {
            const menu = document.getElementById("project-menu")
            menu ?
            menu.parentNode.removeChild(menu) :
            createProjectMenu(app)
        }
        
        
        const app = document.createElement("div")
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
        const items = createProjectMenuItems()
        projectMenu.appendChild(items)

        container.appendChild(projectMenu)
    }

    const createProjectMenuItems = () => {
        const items = document.createElement("div")
        for (let i = 0; i < App.getProjects().length; i++) {
            const menuItem = createProjectMenuItem(App.getProjects()[i])
            items.appendChild(menuItem)
        } 
        return items
    }

    const createProjectMenuItem = (project) => {
        const item = document.createElement("div")
        const link = document.createElement("a")
        console.log(project.getProjectName());
        item.classList.add("project-menu--item")
        link.textContent = `${project.getProjectName()}`
        item.appendChild(link)
        return item
    }
    
    return {displayApp}
})()

Display.displayApp()
