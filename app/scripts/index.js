/**
 * index
 */
class Index {
    constructor() {
        this.formData = [];
        this._init();
    }

    _init() {
        // 提交表单
        $("#apply_submit").click( e => {
            e.preventDefault(); // 阻止默认行为
            this.formData = $("#contact_form").serializeArray();
            this.formData.push({'name': 'remark', 'value': '留言'});

            // 验证
            if(!this._validate()) return;

            // 提交
            $.post("/api/application", this.formData, function(data, status, xhr) {
                notif({
                    type: "warning",
                    msg: "提交申请成功，我们将尽快给您安排课程！",
                    position: "center",
                    opacity: 0.8
                });
                setTimeout(() => {
                    location.reload();
                }, 3000);
                console.log('res: ', data)
            })
        })

        // 运行代码编译器
        $('#run').click(() => {
            this._run();
        });

        // ctrl + Enter
        $(document).keyup(event => { 
            if(event.ctrlKey && event.keyCode === 13) { 
                this._run();
            } 
        });
    }

    // 表单验证
    _validate() {
        // console.log("表单数据：", this.formData)

        let ret = true;
        for(let i=0; i<this.formData.length; i++) {
            let field = this.formData[i];
            if(field.name == 'grade' && field.value == '') {
                alert('请选择年级！');
                ret = false;
                break;
            }

            if(field.name == 'phone' && field.value == '') {
                alert('请输入电话号码！');
                ret = false;
                break;
            }
        }
        return ret;
    }

    _run() {
        let prog = document.getElementById("code").value;
        console.log("...", prog);
        let mypre = document.getElementById("output");
        mypre.innerHTML = '';
        Sk.pre = "output";
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
        Sk.configure({ output: this._outf, read: this._builtinRead });

        let mp = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, prog, true);
        });
        mp.then((mod) => {
            console.log('success');
        }, (err) => {
            mypre.innerHTML = err.toString();
            console.error(err.toString());
        });
    }

    _builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    _outf(text) { 
        let mypre = document.getElementById("output"); 
        mypre.innerHTML = mypre.innerHTML + text; 
    }

}

$(function() {
    let index = new Index();
})
