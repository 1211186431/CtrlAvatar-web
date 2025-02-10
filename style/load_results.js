document.addEventListener('DOMContentLoaded', function() {
    const tupleContainer = document.querySelector('.tuple-container');

    // 远程加载 JSON 数据
    fetch('./data/example_list.json')
        .then(response => response.json())
        .then(jsonData => {
            generateTuples(jsonData);
        })
        .catch(error => console.error('Error loading JSON:', error));

    // 生成动态 .tuple 结构
    function generateTuples(jsonData) {
        jsonData.forEach((item, index) => {
            const tuple = document.createElement('div');
            tuple.classList.add('tuple');

            // 左侧图片
            const imgItem = document.createElement('div');
            imgItem.classList.add('tuple-item');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = `Input ${index + 1}`;
            imgItem.appendChild(img);

            // 右侧 3D 模型
            const modelItem = document.createElement('div');
            modelItem.classList.add('tuple-item');

            // 3D 按钮
            const loadButton = document.createElement('button');
            loadButton.classList.add('load-model');
            loadButton.setAttribute('data-model-src', item.model);
            loadButton.textContent = '3D';

            // 3D 视图（初始隐藏）
            const modelViewer = document.createElement('model-viewer');
            modelViewer.id = `model${index + 1}`;
            modelViewer.setAttribute('shadow-intensity', '1');
            modelViewer.setAttribute('environment-image', './data/snow_field_puresky_1k.hdr');
            modelViewer.setAttribute('skybox-image', './data/snow_field_puresky_1k.hdr');
            modelViewer.setAttribute('orientation', '0deg 0deg 0deg');
            modelViewer.setAttribute('field-of-view', '30deg');
            modelViewer.setAttribute('min-field-of-view', '10deg');
            modelViewer.setAttribute('max-field-of-view', '60deg');
            modelViewer.setAttribute('camera-controls', '');
            modelViewer.setAttribute('touch-action', 'pan-y');
            modelViewer.style = 'background: linear-gradient(#fcfaff, #fafcff); overflow-x: hidden; display: none;';

            modelItem.appendChild(loadButton);
            modelItem.appendChild(modelViewer);

            // 组装 tuple
            tuple.appendChild(imgItem);
            tuple.appendChild(modelItem);
            tupleContainer.appendChild(tuple);
        });

        // 监听所有 "3D" 按钮，点击后加载对应的模型
        document.querySelectorAll('.load-model').forEach(button => {
            button.addEventListener('click', function() {
                const modelSrc = this.getAttribute('data-model-src');
                const modelItem = this.parentElement;
                const modelViewer = modelItem.querySelector('model-viewer');

                // 设置 3D 模型路径
                modelViewer.setAttribute('src', modelSrc);

                // 显示 model-viewer，隐藏按钮
                modelViewer.style.display = 'block';
                this.style.display = 'none';
            });
        });
    }
});
