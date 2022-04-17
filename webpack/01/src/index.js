import helloWorld from './hellow_worls';
// 导入图片。类似js文件一样导入
import ingSrc from './assets/1.png';

// 引入css
import './style.css';

helloWorld();

const img = document.createElement('img');
img.src = ingSrc;
document.body.appendChild(img);

// 创建一个div
const block = document.createElement('div');
block.style.cssText = 'width: 100px; height: 100px';
block.classList.add('.bg_block');
document.body.appendChild(block);