class Header extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback(){
        this.innerHTML = `
            <header>
                <nav class = "navbar">
                    <input type="checkbox">
                    <span></span>
                    <span></span>
                    <span></span>
                    <div id = "menu">
                        <a href="index.html"><b>Cole Takayama</b></a>
                        <a href="hobbies.html">hobbies</a>
                        <a href="projects.html">projects</a>
                        <a href="contact.html">contact</a>
                    </div>

                </nav>
            </header>
        `;
    }
}



  customElements.define('header-component', Header);