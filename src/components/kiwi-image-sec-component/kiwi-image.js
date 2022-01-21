import Yumi from './yumi.png';
import './style.scss';

class Yumiimage {
  render () {
    const img = document.createElement('img');
    img.src = Yumi;
    img.alt = 'Yumi';
    img.classList.add('yumi-image');

    const bodyDomElement = document.querySelector('body');
    bodyDomElement.appendChild(img);
  }
}

export default Yumiimage;