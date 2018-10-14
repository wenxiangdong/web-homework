export class DrawRect {
    constructor(canvas) {
        this.canvas = canvas;
        let ctx = canvas.getContext('2d');
        this.originImgData = ctx.getImageData(0, 0, width, height);
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
            this.coordinates = [];
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            this.coordinates[0] = x;
            this.coordinates[1] = y;

            const width = canvas.width;
            const height = canvas.height; 
            // 一边画
            canvas.onmousemove = (e) => {
                if (!this.drawing) return;
                ctx.clearRect(0, 0, width, height);
                ctx.putImageData(this.originImgData, 0, 0);
                const x = e.clientX - canvas.offsetLeft;
                const y = e.clientY - canvas.offsetTop;
                let startX = this.coordinates[0] < x ? this.coordinates[0] : x;
                let startY = this.coordinates[1] < x ? this.coordinates[1] : y;
                const width = Math.abs(this.coordinates[0] - x);
                const height = Math.abs(this.coordinates[1] - y);
                ctx.beginPath();
                ctx.rect(startX, startY, width, height);
                console.log(`画 ${startX}, ${startY}, ${width}, ${height}`);
                ctx.stroke();
                ctx.endPath();
            }
            // 结束画啦
            canvas.onmouseup = (e) => {
                const x = e.clientX - canvas.offsetLeft;
                const y = e.clientY - canvas.offsetTop;
                let startX = this.coordinates[0] < x ? this.coordinates[0] : x;
                let startY = this.coordinates[1] < x ? this.coordinates[1] : y;
                const width = Math.abs(this.coordinates[0] - x);
                const height = Math.abs(this.coordinates[1] - y);
                this.drawing = false;
                this.onmousemove = null;
                callback([startX, startY, width, height]);
            }
        }
    }

    stop() {
        if (!this.canvas) return;
        this.canvas.onmousedown = null;
        this.canvas.onmousemove = null;
        this.onmouseup = null;
    }
}