import "./hello-world-button.scss";

class HelloWorldButtonSass {
  buttonClassList = "hello-world-button";

  render = () => {
    const body = document.querySelector("body");
    const button = document.createElement("button");
    button.innerHTML = "Hello World";
    button.classList.add(this.buttonClassList);
    button.onclick = () => {
      const p = document.createElement("p");
      p.innerHTML = "Hello World!";
      p.classList = "hello-world-text";
      body.appendChild(p);
    };
    body.appendChild(button);
  };
}

export default HelloWorldButtonSass;
