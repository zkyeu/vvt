import { info } from "console";

/*
 * @Author: your name
 * @Date: 2021-12-30 20:37:51
 * @LastEditTime: 2021-12-30 20:46:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vvt/src/utils/editorOption.js
 */
export default {
  // debug: info,
    theme: 'snow',
    // placeholder: 'Compose an epic...',
    modules: {
      toolbar: [
        { header: [1, 2, 3, 4, 5, 6, false] },
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'image',
        'clean',
        { align: [] },
        // { font: [] },
        { color: [] },
        { background: [] },
        'blockquote',
        'code-block',
        { list: 'ordered' },
        { list: 'bullet' },
        { script: 'sub' },
        { script: 'super' },
        { indent: '-1' },
        { indent: '+1' },
        { direction: 'rtl' },
      ],
    }
};