import "./heading.scss";

class Heading {
  render(compoName) {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");
    h1.innerHTML = "Webpack is awesome! in " + compoName + " page.";
    body.appendChild(h1);
  }
}

export default Heading;
