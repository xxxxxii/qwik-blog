/*事件监听绑定 - on方法：
 * 添加事件监听
 * @param ele         <DOMObject> 添加事件的DOM元素
 * @param type        <string>    事件类型（不带on）
 * @param fn          <function>  事件处理函数
 * @param [isCapture] <boolean>   可选参数，是否捕获，true代表捕获，false代表冒泡，默认为false
 */
export function on(ele: any, type: string, fn: Function, isCapture: boolean) {
  // 如果参数没有传，默认值为false
  if (isCapture === undefined) isCapture = false;
  if (ele.attachEvent) {
    // IE
    ele.attachEvent('on' + type, fn);
  } else {
    ele.addEventListener(type, fn, isCapture);
  }
}
/*解绑事件 - off方法：
 * 移出事件监听
 * @param ele         <DOMObject> 添加事件的DOM元素
 * @param type        <string>    事件类型（不带on）
 * @param fn          <function>  事件处理函数
 * @param [isCapture] <boolean>   可选参数，是否捕获，true代表捕获，false代表冒泡，默认为false
 */
export function off(ele: any, type: string, fn: Function, isCapture: boolean) {
  // 如果参数没有传，默认值为false
  if (isCapture === undefined) isCapture = false;
  if (ele.detachEvent) {
    ele.detachEvent('on' + type, fn);
  } else {
    ele.removeEventListener(type, fn, isCapture);
  }
}

// export  function on(Box:HTMLElement,'mousedown',function(e:HTMLElement){
//     e = e || window.event// 获取事件对象
//     var BoxX = e.offsetX// 获取鼠标点击时到div的顶部和左边的距离
//     var BoxY = e.offsetY
//     function move(e){
//         e = e || window.event
//         var left = e.clientX - BoxX
//         var top = e.clientY - BoxY
//         Box.style.left = left + 'px'
//         Box.style.top = top + 'px'
//         //限制左上角边缘距离
//         if(left<=0){
//             left=0;
//         }
//         Box.style.left = left + "px"
//         if(top<=0){
//             top=0
//         }
//         Box.style.top = top + "px"
//         //限制右下角边缘距离
//         var maxL = window.innerWidth - Box.offsetWidth;
//         var maxT = window.innerHeight - Box.offsetHeight;
//         if(left>=maxL){
//             left = maxL;
//         }
//         Box.style.left = left + "px"
//         if(top>=maxT){
//             top = maxT;
//         }
//         Box.style.top = top + "px"
//     }
//     on(document,'mousemove',move)
//     // up抬起时，解除监听
//     on(document,'mouseup',function(){
//         off(document,'mousemove',move)
//     })
//     // 避免全选文字造成的bug，在这里阻止默认行为
//     if (e.preventDefault) {
//         e.preventDefault()
//     } else {
//         return false
//     }
// })
