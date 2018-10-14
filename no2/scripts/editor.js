
class DrawRect {
    constructor(canvas) {
        this.canvas = canvas;
        let ctx = canvas.getContext('2d');
        this.originImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    _calPos(e) {
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left * (this.canvas.width / rect.width);
        let y = e.clientY - rect.top * (this.canvas.height / rect.height);;
        return [x, y];
    }

    _resetCanvas() {
        if (!this.canvas) {
            return;
        }
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(this.originImgData, 0, 0);
    }

    draw(callback) {
        if (!this.canvas) {
            return;
        }
        let canvas = this.canvas;
        let ctx = canvas.getContext('2d');
        canvas.onmousedown = (e) => {
            if (this.drawing) {
                return;
            }
            this.drawing = true;
            // 记录
            this.coordinates = this._calPos(e);
            console.log('开始画', this.coordinates);
            
            // 一边画
            canvas.onmousemove = (e) => {
                if (!this.drawing) return;
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.putImageData(this.originImgData, 0, 0);
                this._resetCanvas();
                let xy = this._calPos(e);
                const x = xy[0];
                const y = xy[1];
                let startX = this.coordinates[0] < x ? this.coordinates[0] : x;
                let startY = this.coordinates[1] < y ? this.coordinates[1] : y;
                const width = Math.abs(this.coordinates[0] - x);
                const height = Math.abs(this.coordinates[1] - y);
                ctx.beginPath();
                ctx.rect(startX, startY, width, height);
                console.log(`画 ${startX}, ${startY}, ${width}, ${height}`);
                ctx.stroke();
                ctx.closePath();
            }
            // 结束画啦
            canvas.onmouseup = (e) => {
                let xy = this._calPos(e);
                const x = xy[0];
                const y = xy[1];
                let startX = this.coordinates[0] < x ? this.coordinates[0] : x;
                let startY = this.coordinates[1] < y ? this.coordinates[1] : y;
                const width = Math.abs(this.coordinates[0] - x);
                const height = Math.abs(this.coordinates[1] - y);
                this.drawing = false;
                this.onmousemove = null;
                this._resetCanvas();
                ctx.save();
                ctx.strokeStyle = "white";
                ctx.strokeRect(startX, startY, width, height);
                ctx.restore();
                this.stop();
                callback([startX, startY, width, height]);
            }
        }
    }

    stop() {
        if (!this.canvas) return;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
        this.canvas.onmouseup = null;
    }
}


var canvas;
var canvasOption = {
    height: 500,
    width: 800
}

var picList;

var currentImage;

var buttons = [
    {
        name: '顺时针旋转90度',
        tooltip: '顺时针方向90度',
        fn: (e) => {
            console.log('旋转');
            if (!currentImage) {
                console.log('!currentImage');
                return;
            }

            let ctx = canvas.getContext('2d');

            // 先重置
            clearCanvasContent();

            // ctx.save();
            // 移动原点
            let x = canvas.width / 2;
            let y = canvas.height / 2;
            
            ctx.translate(x, y);
            ctx.rotate(90 * Math.PI / 180);
            ctx.translate(-x, -y);
            // console.log(currentImage);
            ctx.drawImage(
                currentImage, 
                (canvas.width - currentImage.width) / 2, 
                (canvas.height - currentImage.height) / 2,
                currentImage.width,
                currentImage.height
            );
            // ctx.restore();
        }
    },
    {
        name: '画框裁剪',
        fn: (e) => {
            console.log('画框裁剪');
            if (!canvas) {
                return;
            }
            let drawRect = new DrawRect(canvas);
            drawRect.draw((coordinates) => {
                console.log('画完回调啦', coordinates);
                let ctx = canvas.getContext('2d');
                let data = ctx.getImageData(...coordinates);
                clearCanvasContent();
                ctx.putImageData(data, coordinates[0], coordinates[1]);
            });
        }
    },
    {
        name: '反色',
        fn: (e) => {
            console.log('反色');
            pixelProcess(canvas, (data, i) => {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            });
        }
    },
    {
        name: '黑白',
        fn: (e) => {
            console.log('黑白');
            pixelProcess(canvas, (data, i) => {
                var red =  data[i];
                var green = data[i + 1];
                var blue = data[i + 2];
                var gray = 0.3 * red + 0.59 * green + 0.11 * blue;
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
            });
        }
    }
]

var MODE_SINGLE = 'single';
var MODE_MULTI = 'multi';
var mode = '';
var panels = {};    // 不同模式下的编辑器


var zr;

    
var pixelProcess = function(canvas, fn) {
    if (!canvas) {
        return;
    }
    let imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    var imageData_length = imageData.data.length / 4;
    // 解析之后进行算法运算
    for (var i = 0; i < imageData_length; i++) {
        fn(imageData.data, i * 4);
    }
    let ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
}

$(function() {
    initPicList();
    initEditor();
    initBackBtn();
    initRadios();
    initZrender();
})

var initPicList = function() {
    var list = $("#pic-list");
    var imgSrcs = [];
    let pre = 'http://47.106.233.50:8080/image/';

    for (let i = 1; i <= 7; i++) {
        imgSrcs.push(`${pre}${i}.jpg`);
    }

    console.log(imgSrcs);

    for (let i = 0; i < imgSrcs.length; i++) {
        let wrapper = $('<div></div>');
        let img = $(`<img/>`);
        img.attr("crossOrigin",'');
        img.attr("src", imgSrcs[i]);
        wrapper.addClass('img-item');
        // 图片点击事件
        img.click(function (e) { 
            e.preventDefault();
            let picSrc = e.currentTarget.src;
            console.log('selected', picSrc);
            changePic(picSrc);
        });
        wrapper.append(img);
        list.append(wrapper);
    }
}


var initEditor = function() {
    canvas = document.createElement('canvas');
    canvas.height = canvasOption.height;
    canvas.width = canvasOption.width;
    canvas.className = 'editor-canvas';
    // 保存初始状态
    canvas.getContext('2d').save();
    let ele = $('#editor');
    ele.append(canvas);

    let tools = createToolBar();
    ele.append(tools);

    panels[MODE_SINGLE] = ele;
    ele.hide();
}


var initBackBtn = function() {
    $('#back-btn').click(e => {
        clearCanvasContent();
        showList();
    });
}


var initRadios = function() {
    $('#single').click(function (e) { 
        // e.preventDefault();
        changeMode(MODE_SINGLE);
    });
    $('#multi').click(function (e) { 
        // e.preventDefault();
        changeMode(MODE_MULTI);
    });
}


var initZrender = function() {
    zr = zrender.init(document.getElementById('zrender'), canvasOption);
    let zrDiv = $('#zrender');
    zrDiv.css('width', canvasOption.width);
    zrDiv.css('heigth', canvasOption.heigth);
    panels[MODE_MULTI] = $('#multi-pic-editor');
    $('#reset-zrender-btn').click(function (e) { 
        e.preventDefault();
        zrender.dispose(zr);
        zr = zrender.init(document.getElementById('zrender'));
    });
    panels[MODE_MULTI].hide();
}

var changeMode = function(newVal) {
    console.log(newVal);
    if (mode === newVal) {
        return;
    }
    mode = newVal;
    for (let m in panels) {
        console.log(`${m} === ${mode}`);
        if (m === mode) {
            panels[m].show();
        } else {
            panels[m].hide();
        }
    }
}

var createToolBar = function() {
    let tools = $('<div></div>');
    tools.append($('<div>工具栏</div>'));
    tools.addClass('tools');
    // tools.css('top', canvas.offsetTop + 'px');
    for (let i = 0; i < buttons.length; i++) {
        let btn = $('<button></button>');
        btn.text(buttons[i].name);
        btn.click(buttons[i].fn);
        btn.addClass('default-button')
        tools.append(btn);
    }
    return tools;
}


var addPicFns = {
    [MODE_SINGLE]: (picSrc) => {
        if (!picSrc || !canvas) {
            console.log('!picSrc || !canvas');
            return;
        }
        // 重置
        clearCanvasContent();
    
        let image = new Image();
        image.src = picSrc;
        image.setAttribute("crossOrigin",'anonymous');
        let ctx = canvas.getContext('2d');
        ctx.restore();
    
        image.onload = function() {
            let width = 200;
            let height = width * image.naturalHeight / image.naturalWidth;
            image.width = width;
            image.height = height;
            let x = (canvas.width - image.width) / 2;
            let y = (canvas.height - image.height) / 2;
            console.log(x, y);
            ctx.drawImage(image, x, y, width, height);
            currentImage = image;
            ctx.save();
        }
    },
    [MODE_MULTI]: (picSrc) => {
        if (!picSrc || !zr) {
            console.log('!picSrc || !zr');
            return;
        }
        console.log(picSrc, mode);
        let img = new zrender.Image({
            style: {
                image: picSrc,
                x: 0,
                y: 0,
                width: 200,
                height: 300
            },
            draggable: true
        })
        zr.add(img);
    }
}

/**
 * 改变编辑图片
 */
var changePic = function(picSrc) {
    let fn = addPicFns[mode];
    if (fn) {
        fn(picSrc);
    }
}

var clearCanvasContent = function() {
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}