// 导航栏功能
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接关闭移动菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// 图片映射 - 使用相对路径指向项目文件夹中的图片
const imageMap = {
    '我': 'images/me.png',
    '关于我': 'images/about.png',
    '我的项目': 'images/projects.png',
    '软件资源': 'images/resources.png',
    '我的履历': 'images/cv.png',
    '友情链接': 'images/links.png',
    '个人简介': 'images/bio.png',
    '兴趣专长': 'images/skills.png',
    '思维方式': 'images/thinking.png',
    '三体宇宙': 'images/three-body.png',
    '病毒神教': 'images/virus-church.png',
    '思维迷宫': 'images/mind-maze.png',
    '微电影集': 'images/films.png',
    '设计素材': 'images/design.png',
    '代码库': 'images/code.png',
    '学习资料': 'images/learning.png',
    '教育背景': 'images/education.png',
    '技能树': 'images/skills-tree.png',
    '成就荣誉': 'images/awards.png',
    'GitHub': 'images/github.png',
    'Bilibili': 'images/bilibili.png',
    '个人博客': 'images/blog.png'
};

// 初始化ECharts实例
function initChart() {
    const chartDom = document.getElementById('chart-container');
    const myChart = echarts.init(chartDom, 'dark');
    
    // 图表配置
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            show: true,
            formatter: function (params) {
                return params.data.tooltip || params.data.name;
            }
        },
        legend: {
            show: true,
            data: ['关于我', '项目', '资源', '履历', '链接'],
            textStyle: {
                color: '#cfd8dc'
            },
            top: 10,
            right: 10,
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 10
        },
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 500,
        animationEasingUpdate: 'cubicInOut',
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 300,
                gravity: 0.1,
                edgeLength: 120,
                layoutAnimation: true
            },
            roam: true,
            zoom: 1,
            focusNodeAdjacency: true,
            draggable: true,
            symbol: function (params) {
                // 使用图片作为节点符号
                const imageUrl = imageMap[params.name] || 'images/default.png';
                return 'image://' + imageUrl;
            },
            symbolSize: function (val) {
                // 根据节点类型设置不同大小
                if (val[0] === '我') return 100; // 中心节点最大
                if (val[0] === '关于我' || val[0] === '我的项目' || val[0] === '软件资源' || 
                    val[0] === '我的履历' || val[0] === '友情链接') return 80; // 主类别节点
                return 60; // 叶子节点
            },
            symbolKeepAspect: true,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 8],
            edgeLabel: {
                show: false,
                fontSize: 12,
                formatter: '{c}'
            },
            label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: '#e0e0e0',
                fontSize: 14,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: [3, 5],
                borderRadius: 3
            },
            lineStyle: {
                width: 1.5,
                color: 'source',
                curveness: 0.3,
                opacity: 0.6
            },
            emphasis: {
                scale: true,
                focus: 'adjacency',
                lineStyle: {
                    width: 3,
                    opacity: 0.9
                },
                itemStyle: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(255, 255, 255, 0.8)'
                }
            },
            data: [
                // 中心节点 - 自己
                {
                    name: '我',
                    value: 100,
                    category: 0,
                    symbolSize: 100,
                    tooltip: '探索者 · 思想者 · 创造者'
                },
                
                // 关于我类别
                {
                    name: '关于我',
                    value: 30,
                    category: 0,
                    symbolSize: 80
                },
                
                // 项目类别
                {
                    name: '我的项目',
                    value: 30,
                    category: 1,
                    symbolSize: 80
                },
                
                // 资源类别
                {
                    name: '软件资源',
                    value: 30,
                    category: 2,
                    symbolSize: 80
                },
                
                // 履历类别
                {
                    name: '我的履历',
                    value: 30,
                    category: 3,
                    symbolSize: 80
                },
                
                // 外链类别
                {
                    name: '友情链接',
                    value: 30,
                    category: 4,
                    symbolSize: 80
                },
                
                // 关于我子节点
                {
                    name: '个人简介',
                    value: 15,
                    category: 0,
                    symbolSize: 60,
                    link: '/about'
                },
                {
                    name: '兴趣专长',
                    value: 15,
                    category: 0,
                    symbolSize: 60,
                    link: '/interests'
                },
                {
                    name: '思维方式',
                    value: 15,
                    category: 0,
                    symbolSize: 60,
                    link: '/thinking'
                },
                
                // 项目子节点
                {
                    name: '三体宇宙',
                    value: 15,
                    category: 1,
                    symbolSize: 60,
                    link: '/projects/three-body'
                },
                {
                    name: '病毒神教',
                    value: 15,
                    category: 1,
                    symbolSize: 60,
                    link: '/projects/virus-church'
                },
                {
                    name: '思维迷宫',
                    value: 15,
                    category: 1,
                    symbolSize: 60,
                    link: '/projects/mind-maze'
                },
                {
                    name: '微电影集',
                    value: 15,
                    category: 1,
                    symbolSize: 60,
                    link: '/projects/films'
                },
                
                // 资源子节点
                {
                    name: '设计素材',
                    value: 15,
                    category: 2,
                    symbolSize: 60,
                    link: '/resources/design'
                },
                {
                    name: '代码库',
                    value: 15,
                    category: 2,
                    symbolSize: 60,
                    link: '/resources/code'
                },
                {
                    name: '学习资料',
                    value: 15,
                    category: 2,
                    symbolSize: 60,
                    link: '/resources/learning'
                },
                
                // 履历子节点
                {
                    name: '教育背景',
                    value: 15,
                    category: 3,
                    symbolSize: 60,
                    link: '/cv/education'
                },
                {
                    name: '技能树',
                    value: 15,
                    category: 3,
                    symbolSize: 60,
                    link: '/cv/skills'
                },
                {
                    name: '成就荣誉',
                    value: 15,
                    category: 3,
                    symbolSize: 60,
                    link: '/cv/achievements'
                },
                
                // 外链子节点
                {
                    name: 'GitHub',
                    value: 15,
                    category: 4,
                    symbolSize: 60,
                    link: 'https://github.com'
                },
                {
                    name: 'Bilibili',
                    value: 15,
                    category: 4,
                    symbolSize: 60,
                    link: 'https://bilibili.com'
                },
                {
                    name: '个人博客',
                    value: 15,
                    category: 4,
                    symbolSize: 60,
                    link: '/blog'
                }
            ],
            links: [
                // 连接到中心节点
                { source: '我', target: '关于我' },
                { source: '我', target: '我的项目' },
                { source: '我', target: '软件资源' },
                { source: '我', target: '我的履历' },
                { source: '我', target: '友情链接' },
                
                // 关于我连接
                { source: '关于我', target: '个人简介' },
                { source: '关于我', target: '兴趣专长' },
                { source: '关于我', target: '思维方式' },
                
                // 项目连接
                { source: '我的项目', target: '三体宇宙' },
                { source: '我的项目', target: '病毒神教' },
                { source: '我的项目', target: '思维迷宫' },
                { source: '我的项目', target: '微电影集' },
                
                // 资源连接
                { source: '软件资源', target: '设计素材' },
                { source: '软件资源', target: '代码库' },
                { source: '软件资源', target: '学习资料' },
                
                // 履历连接
                { source: '我的履历', target: '教育背景' },
                { source: '我的履历', target: '技能树' },
                { source: '我的履历', target: '成就荣誉' },
                
                // 外链连接
                { source: '友情链接', target: 'GitHub' },
                { source: '友情链接', target: 'Bilibili' },
                { source: '友情链接', target: '个人博客' }
            ],
            categories: [
                { name: '关于我' },
                { name: '项目' },
                { name: '资源' },
                { name: '履历' },
                { name: '链接' }
            ],
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }]
    };
    
    // 应用配置
    myChart.setOption(option);
    
    // 节点点击事件处理
    myChart.on('click', function(params) {
        if (params.data && params.data.link) {
            // 内部链接直接跳转，外部链接在新窗口打开
            if (params.data.link.startsWith('http')) {
                window.open(params.data.link, '_blank');
            } else {
                window.location.href = params.data.link;
            }
        }
    });
    
    // 节点悬停事件 - 显示信息面板
    const infoPanel = document.createElement('div');
    infoPanel.className = 'node-info-panel';
    chartDom.appendChild(infoPanel);
    
    myChart.on('mouseover', function(params) {
        if (params.dataType === 'node' && params.data.tooltip) {
            infoPanel.innerHTML = `
                <h3><i class="fas fa-star"></i> ${params.data.name}</h3>
                <p>${params.data.tooltip}</p>
                ${params.data.link ? `<a href="${params.data.link}" class="node-link">探索详情 →</a>` : ''}
            `;
            infoPanel.classList.add('visible');
        }
    });
    
    myChart.on('mouseout', function() {
        infoPanel.classList.remove('visible');
    });
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        myChart.resize();
    });
    
    return myChart;
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function() {
    const chart = initChart();
    
    // 添加加载动画
    setTimeout(function() {
        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });
    }, 500);
});