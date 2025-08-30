// 星空背景实现
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

// 设置canvas大小为窗口尺寸
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 初始化窗口大小
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 创建星星
const stars = [];
const starCount = 300;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.05 + 0.01;
        this.alpha = Math.random();
        this.direction = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.twinkleDirection = 1;
    }
    
    update() {
        // 移动星星
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
        
        // 边界检查
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // 闪烁效果
        this.alpha += this.twinkleSpeed * this.twinkleDirection;
        if (this.alpha >= 1) {
            this.alpha = 1;
            this.twinkleDirection = -1;
        } else if (this.alpha <= 0.3) {
            this.alpha = 0.3;
            this.twinkleDirection = 1;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
    }
}

// 初始化星星
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制渐变背景
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(10, 10, 20, 0.8)');
    gradient.addColorStop(1, 'rgba(5, 5, 15, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 更新并绘制星星
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// 添加一些随机流星效果
setInterval(() => {
    if (Math.random() > 0.7) {
        createMeteor();
    }
}, 5000);

function createMeteor() {
    const x = Math.random() * canvas.width;
    const y = 0;
    const length = 100 + Math.random() * 50;
    const speed = 5 + Math.random() * 3;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 8;
    
    let progress = 0;
    
    function drawMeteor() {
        if (progress > length) return;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + progress * Math.cos(angle),
            y + progress * Math.sin(angle)
        );
        ctx.strokeStyle = `rgba(79, 195, 247, ${1 - progress/length})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        progress += speed;
        requestAnimationFrame(drawMeteor);
    }
    
    drawMeteor();
}