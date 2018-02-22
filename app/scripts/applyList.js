/**
 * applyList
 */
class ApplyList {
    constructor() {
        this._init();
    }

    _init() {

        $.get("/api/applyList", function(res){
            // console.log('res: ', res)
            let index = 1;
            for(let i=0; i<res.data.length; i++) {
                let item = res.data[i];
                let html = `<tr>
                                <td>${index}</td>
                                <td>${item.apply_name}</td>
                                <td>${item.grade}</td>
                                <td>${item.phone}</td>
                                <td>${item.message}</td>
                                <td>${item.create_time}</td>
                            </tr>`;
                $("#applyList > tbody").append(html);
                index ++;
            }
        })
    }
}


$(function() {
    let applyList = new ApplyList();
})