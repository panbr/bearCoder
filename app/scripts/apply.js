/**
 * Apply
 */
class Apply {
    constructor() {
        this.formData = [];
        this._init();
    }

    _init() {
        // 提交表单
        $("#apply_submit").click( e => {
            e.preventDefault(); // 阻止默认行为
            this.formData = $("#contact_form").serializeArray();
            this.formData.push({'name': 'remark', 'value': '申请试听'});

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
                console.log('res: ', data);
            })
        })
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

}

$(function() {
    let apply = new Apply();
})
