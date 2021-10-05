class Footer extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback(){
        this.innerHTML = `
            <footer>
                <hr>
                cole.takayama@gmail.com
            </footer>
        `;
    }
}



  customElements.define('footer-component', Footer);